'use client';

import * as React from 'react';
import {
  Upload,
  Download,
  Trash2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Check,
  Sliders,
  Eye,
  Eraser,
  Paintbrush,
  Undo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  FileDown,
  Archive,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { injectJfifDpi } from '@/lib/image-engine';

export interface BackgroundRemoverEngineProps {
  mode?: 'general' | 'passport_white';
}

interface ImageItem {
  id: string;
  file: File;
  name: string;
  originalUrl: string;
  originalWidth: number;
  originalHeight: number;
  resultUrl: string | null;
  resultBlob: Blob | null;
  isProcessing: boolean;
  progress: number;
}

export function BackgroundRemoverEngine({ mode = 'general' }: BackgroundRemoverEngineProps) {
  const [images, setImages] = React.useState<ImageItem[]>([]);
  const [activeImageId, setActiveImageId] = React.useState<string | null>(null);

  // Settings
  const [bgColor, setBgColor] = React.useState<string>(
    mode === 'passport_white' ? '#FFFFFF' : 'transparent'
  );
  const [tolerance, setTolerance] = React.useState<number>(32); // 10 - 70
  const [edgeFeather, setEdgeFeather] = React.useState<number>(mode === 'passport_white' ? 3 : 2); // 0 - 10
  const [outputDpi, setOutputDpi] = React.useState<number>(300);
  const [viewMode, setViewMode] = React.useState<'side_by_side' | 'split' | 'result_only'>('side_by_side');
  const [splitPos, setSplitPos] = React.useState<number>(50); // percentage for split slider

  // Manual Touch-Up Brush State
  const [brushMode, setBrushMode] = React.useState<'none' | 'erase' | 'restore'>('none');
  const [brushSize, setBrushSize] = React.useState<number>(25);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);

  // Canvas refs for active image
  const maskCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const sourceImgRef = React.useRef<HTMLImageElement | null>(null);
  const touchUpCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const activeImage = images.find((img) => img.id === activeImageId) || images[0] || null;

  // Handle file uploads
  const handleFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      alert('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    const newItems: ImageItem[] = validFiles.map((file) => {
      const url = URL.createObjectURL(file);
      return {
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        originalUrl: url,
        originalWidth: 0,
        originalHeight: 0,
        resultUrl: null,
        resultBlob: null,
        isProcessing: false,
        progress: 0,
      };
    });

    setImages((prev) => [...prev, ...newItems]);
    if (!activeImageId && newItems[0]) {
      setActiveImageId(newItems[0].id);
    }
  };

  const removeImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setImages((prev) => {
      const remaining = prev.filter((img) => img.id !== id);
      if (activeImageId === id) {
        setActiveImageId(remaining[0]?.id || null);
      }
      return remaining;
    });
  };

  const clearAll = () => {
    images.forEach((img) => {
      if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
      if (img.resultUrl) URL.revokeObjectURL(img.resultUrl);
    });
    setImages([]);
    setActiveImageId(null);
  };

  // Perform full-resolution edge-aware client-side segmentation
  const processImageSegmentation = React.useCallback(
    async (item: ImageItem): Promise<{ resultUrl: string; resultBlob: Blob }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const w = img.naturalWidth || img.width;
          const h = img.naturalHeight || img.height;

          // 1. Off-screen work canvas at 100% full original resolution
          const workCanvas = document.createElement('canvas');
          workCanvas.width = w;
          workCanvas.height = h;
          const ctx = workCanvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) {
            reject(new Error('Failed to get 2D canvas context.'));
            return;
          }

          ctx.drawImage(img, 0, 0, w, h);
          const imgData = ctx.getImageData(0, 0, w, h);
          const data = imgData.data;

          // 2. Corner & perimeter background color sampling
          // Sample border pixels (top edge, left edge, right edge, corners)
          const sampleColors: [number, number, number][] = [];
          const sampleStep = Math.max(1, Math.floor(Math.min(w, h) / 30));

          // Top row
          for (let x = 0; x < w; x += sampleStep) {
            const idx = x * 4;
            sampleColors.push([data[idx], data[idx + 1], data[idx + 2]]);
          }
          // Left & right columns (top 60% of image height where background usually sits)
          const sampleHeight = Math.floor(h * 0.65);
          for (let y = 0; y < sampleHeight; y += sampleStep) {
            const idxLeft = (y * w + 0) * 4;
            const idxRight = (y * w + (w - 1)) * 4;
            sampleColors.push([data[idxLeft], data[idxLeft + 1], data[idxLeft + 2]]);
            sampleColors.push([data[idxRight], data[idxRight + 1], data[idxRight + 2]]);
          }

          // Calculate average and representative background color
          let rSum = 0,
            gSum = 0,
            bSum = 0;
          sampleColors.forEach(([r, g, b]) => {
            rSum += r;
            gSum += g;
            bSum += b;
          });
          const bgR = rSum / sampleColors.length;
          const bgG = gSum / sampleColors.length;
          const bgB = bSum / sampleColors.length;

          // Compute color standard deviation for adaptive sensitivity
          let varianceSum = 0;
          sampleColors.forEach(([r, g, b]) => {
            const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
            varianceSum += dist ** 2;
          });
          const bgStdDev = Math.sqrt(varianceSum / sampleColors.length);

          const tol = (tolerance / 100) * 255 + bgStdDev * 0.5;
          const tolSq = tol * tol;

          // 3. Central Portrait Bounding Envelope
          // Pixels near the horizontal center and vertical middle are much more likely to be foreground
          const centerX = w / 2;
          const centerY = h * 0.45;
          const maxDist = Math.sqrt((w / 2) ** 2 + (h / 2) ** 2);

          // Alpha mask buffer
          const alphaMask = new Uint8ClampedArray(w * h);

          for (let y = 0; y < h; y++) {
            const yOffset = y * w;
            for (let x = 0; x < w; x++) {
              const i = (yOffset + x) * 4;
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              // Check distance to primary average background
              const dR = r - bgR;
              const dG = g - bgG;
              const dB = b - bgB;
              let distSq = dR * dR + dG * dG + dB * dB;

              // Also check against closest sample cluster
              for (let s = 0; s < Math.min(20, sampleColors.length); s += 3) {
                const [sr, sg, sb] = sampleColors[s];
                const sDistSq = (r - sr) ** 2 + (g - sg) ** 2 + (b - sb) ** 2;
                if (sDistSq < distSq) distSq = sDistSq;
              }

              // Distance from central subject anchor (0 to 1)
              const normCenterDist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) / maxDist;
              // Central protection: increase background threshold in center of photo
              const effectiveTolSq = tolSq * (0.6 + normCenterDist * 0.6);

              if (distSq < effectiveTolSq) {
                // Background pixel -> make transparent
                // Soft edge calculation
                const edgeRatio = Math.sqrt(distSq) / Math.sqrt(effectiveTolSq);
                if (edgeRatio > 0.85) {
                  // Transition zone
                  alphaMask[yOffset + x] = Math.round(((edgeRatio - 0.85) / 0.15) * 255);
                } else {
                  alphaMask[yOffset + x] = 0;
                }
              } else {
                // Foreground pixel
                alphaMask[yOffset + x] = 255;
              }
            }
          }

          // 4. Alpha Feathering & Edge Refinement
          if (edgeFeather > 0) {
            const blurredMask = new Uint8ClampedArray(w * h);
            const r = Math.min(edgeFeather, 5);
            for (let y = 0; y < h; y++) {
              for (let x = 0; x < w; x++) {
                let sum = 0;
                let count = 0;
                for (let dy = -r; dy <= r; dy++) {
                  const ny = y + dy;
                  if (ny < 0 || ny >= h) continue;
                  for (let dx = -r; dx <= r; dx++) {
                    const nx = x + dx;
                    if (nx < 0 || nx >= w) continue;
                    sum += alphaMask[ny * w + nx];
                    count++;
                  }
                }
                blurredMask[y * w + x] = Math.round(sum / count);
              }
            }
            // Copy back blurred mask
            for (let k = 0; k < alphaMask.length; k++) {
              alphaMask[k] = blurredMask[k];
            }
          }

          // 5. Compose Output Canvas (Solid Color or Transparent)
          const outCanvas = document.createElement('canvas');
          outCanvas.width = w;
          outCanvas.height = h;
          const outCtx = outCanvas.getContext('2d')!;

          if (bgColor !== 'transparent') {
            outCtx.fillStyle = bgColor;
            outCtx.fillRect(0, 0, w, h);
          }

          // Apply alpha mask to original image pixels
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              const i = (y * w + x) * 4;
              data[i + 3] = alphaMask[y * w + x];
            }
          }

          ctx.putImageData(imgData, 0, 0);
          outCtx.drawImage(workCanvas, 0, 0);

          // 6. Generate final high-res Blob
          if (bgColor === 'transparent') {
            outCanvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Canvas blob conversion failed.'));
                  return;
                }
                const resultUrl = URL.createObjectURL(blob);
                resolve({ resultUrl, resultBlob: blob });
              },
              'image/png'
            );
          } else {
            outCanvas.toBlob(
              async (blob) => {
                if (!blob) {
                  reject(new Error('Canvas blob conversion failed.'));
                  return;
                }
                // Inject 300 DPI JFIF header for passport compliance
                const arrayBuf = await blob.arrayBuffer();
                const dpidBytes = injectJfifDpi(new Uint8Array(arrayBuf), outputDpi);
                const finalBlob = new Blob([dpidBytes.buffer as ArrayBuffer], { type: 'image/jpeg' });
                const resultUrl = URL.createObjectURL(finalBlob);
                resolve({ resultUrl, resultBlob: finalBlob });
              },
              'image/jpeg',
              0.95
            );
          }
        };
        img.onerror = () => reject(new Error('Failed to load image.'));
        img.src = item.originalUrl;
      });
    },
    [bgColor, tolerance, edgeFeather, outputDpi]
  );

  // Process active or all images when settings change
  const triggerProcess = React.useCallback(async () => {
    if (!activeImage) return;

    setImages((prev) =>
      prev.map((img) =>
        img.id === activeImage.id ? { ...img, isProcessing: true, progress: 20 } : img
      )
    );

    try {
      const { resultUrl, resultBlob } = await processImageSegmentation(activeImage);
      setImages((prev) =>
        prev.map((img) =>
          img.id === activeImage.id
            ? { ...img, resultUrl, resultBlob, isProcessing: false, progress: 100 }
            : img
        )
      );
    } catch (err) {
      console.error('Segmentation error:', err);
      setImages((prev) =>
        prev.map((img) =>
          img.id === activeImage.id ? { ...img, isProcessing: false, progress: 0 } : img
        )
      );
    }
  }, [activeImage, processImageSegmentation]);

  // Re-process automatically when tolerance, feather, or background changes
  React.useEffect(() => {
    if (activeImage) {
      const timer = setTimeout(() => {
        triggerProcess();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [bgColor, tolerance, edgeFeather, activeImageId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Batch process all images
  const processAllImages = async () => {
    for (const item of images) {
      if (!item.resultUrl) {
        setImages((prev) =>
          prev.map((img) => (img.id === item.id ? { ...img, isProcessing: true } : img))
        );
        try {
          const { resultUrl, resultBlob } = await processImageSegmentation(item);
          setImages((prev) =>
            prev.map((img) =>
              img.id === item.id ? { ...img, resultUrl, resultBlob, isProcessing: false } : img
            )
          );
        } catch (e) {
          console.error(e);
          setImages((prev) =>
            prev.map((img) => (img.id === item.id ? { ...img, isProcessing: false } : img))
          );
        }
      }
    }
  };

  // Download single active image
  const downloadSingle = (item: ImageItem) => {
    if (!item.resultBlob) return;
    const isPng = bgColor === 'transparent';
    const ext = isPng ? 'png' : 'jpg';
    const baseName = item.name.replace(/\.[^/.]+$/, '');
    const cleanFileName = `${baseName}_${bgColor === 'transparent' ? 'no_bg' : 'white_bg'}.${ext}`;

    const url = URL.createObjectURL(item.resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cleanFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  // Download all as ZIP
  const downloadAllZip = async () => {
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();
    const isPng = bgColor === 'transparent';
    const ext = isPng ? 'png' : 'jpg';

    images.forEach((item, idx) => {
      if (item.resultBlob) {
        const baseName = item.name.replace(/\.[^/.]+$/, '') || `image_${idx + 1}`;
        zip.file(`${baseName}_cutout.${ext}`, item.resultBlob);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kagazo_HD_Cutouts_${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Upload Zone / Drop Area */}
      {images.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.length) {
              handleFiles(e.dataTransfer.files);
            }
          }}
          className="border-2 border-dashed border-surface-darker hover:border-primary/50 bg-white rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all group shadow-card space-y-4"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            accept="image/*"
            multiple
            className="hidden"
          />
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-light/50 group-hover:bg-primary-light text-primary rounded-3xl mx-auto flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl font-extrabold text-text-main group-hover:text-primary transition-colors">
              {mode === 'passport_white'
                ? 'Drop Passport / Visa Photo Here'
                : 'Drop Images to Remove Background'}
            </h3>
            <p className="text-xs sm:text-sm text-text-main/70">
              Supports JPG, PNG, and WebP up to 4K resolution. Full HD output, 100% free, zero cloud upload.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-text-main/70">
            <span className="inline-flex items-center gap-1 bg-surface px-3 py-1.5 rounded-xl border border-surface-darker">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Full HD Original Resolution
            </span>
            <span className="inline-flex items-center gap-1 bg-surface px-3 py-1.5 rounded-xl border border-surface-darker">
              <Check className="w-4 h-4 text-primary" /> No 500px Limit
            </span>
            <span className="inline-flex items-center gap-1 bg-surface px-3 py-1.5 rounded-xl border border-surface-darker">
              <Check className="w-4 h-4 text-primary" /> Batch Processing
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Control Bar with Thumbnails & Batch Actions */}
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-surface-darker">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-text-main uppercase tracking-wider">
                  Uploaded Photos ({images.length})
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-xs font-bold text-primary bg-primary-light/50 hover:bg-primary-light rounded-lg border border-primary/20 transition-all flex items-center gap-1"
                >
                  <Upload className="w-3 h-3" />
                  <span>Add More</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {images.length > 1 && (
                  <button
                    onClick={downloadAllZip}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-surface hover:bg-surface-darker text-text-main border border-surface-darker transition-all flex items-center gap-1.5"
                  >
                    <Archive className="w-3.5 h-3.5 text-primary" />
                    <span>Download All (ZIP)</span>
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-transparent transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImageId(item.id)}
                  className={`relative shrink-0 w-20 h-24 rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                    activeImage?.id === item.id
                      ? 'border-primary ring-2 ring-primary/20 scale-105'
                      : 'border-surface-darker hover:border-primary/40 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.resultUrl || item.originalUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.isProcessing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-white animate-spin" />
                    </div>
                  )}
                  <button
                    onClick={(e) => removeImage(item.id, e)}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Image Studio & Toolbar */}
          {activeImage && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Color & Sensitivity Controls (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 space-y-6">
                  {/* Background Replacement Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-extrabold text-text-main uppercase tracking-wider">
                      Background Color
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setBgColor('transparent')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                          bgColor === 'transparent'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-surface-darker bg-surface/50 text-text-main hover:bg-surface'
                        }`}
                      >
                        <span className="w-4 h-4 rounded border border-surface-darker bg-[conic-gradient(#cbd5e1_90deg,#fff_90deg_180deg,#cbd5e1_180deg_270deg,#fff_270deg)]" />
                        <span className="truncate">Transparent</span>
                      </button>

                      <button
                        onClick={() => setBgColor('#FFFFFF')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                          bgColor === '#FFFFFF'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-surface-darker bg-surface/50 text-text-main hover:bg-surface'
                        }`}
                      >
                        <span className="w-4 h-4 rounded border border-surface-darker bg-white shadow-sm" />
                        <span className="truncate">Pure White</span>
                      </button>

                      <button
                        onClick={() => setBgColor('#B0C4DE')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                          bgColor === '#B0C4DE'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-surface-darker bg-surface/50 text-text-main hover:bg-surface'
                        }`}
                      >
                        <span className="w-4 h-4 rounded border border-surface-darker bg-[#B0C4DE]" />
                        <span className="truncate">Passport Blue</span>
                      </button>

                      <button
                        onClick={() => setBgColor('#F3F4F6')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                          bgColor === '#F3F4F6'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-surface-darker bg-surface/50 text-text-main hover:bg-surface'
                        }`}
                      >
                        <span className="w-4 h-4 rounded border border-surface-darker bg-[#F3F4F6]" />
                        <span className="truncate">Light Grey</span>
                      </button>
                    </div>

                    {/* Custom Hex Color Picker */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="color"
                        value={bgColor === 'transparent' ? '#FFFFFF' : bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border border-surface-darker cursor-pointer bg-white"
                      />
                      <span className="text-xs font-mono font-bold text-text-main/70">
                        {bgColor.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Sensitivity & Edge Feather Sliders */}
                  <div className="space-y-4 pt-4 border-t border-surface-darker">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-text-main">
                        <span>Background Sensitivity</span>
                        <span className="font-mono text-primary">{tolerance}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        value={tolerance}
                        onChange={(e) => setTolerance(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <p className="text-[10px] text-text-main/60">
                        Increase if edges of background remain; decrease if clothes are clipped.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-text-main">
                        <span>Edge Smoothing / Feather</span>
                        <span className="font-mono text-primary">{edgeFeather}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="6"
                        value={edgeFeather}
                        onChange={(e) => setEdgeFeather(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <p className="text-[10px] text-text-main/60">
                        Softens hair and shoulder outlines for natural passport lighting.
                      </p>
                    </div>

                    {bgColor !== 'transparent' && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-text-main">
                          <span>Target Print DPI</span>
                          <span className="font-mono text-emerald-600 font-bold">{outputDpi} DPI</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setOutputDpi(300)}
                            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                              outputDpi === 300
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                : 'border-surface-darker bg-surface/50 text-text-main'
                            }`}
                          >
                            300 DPI (Passport)
                          </button>
                          <button
                            onClick={() => setOutputDpi(600)}
                            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                              outputDpi === 600
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                : 'border-surface-darker bg-surface/50 text-text-main'
                            }`}
                          >
                            600 DPI (Ultra)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Download Buttons */}
                  <div className="pt-4 border-t border-surface-darker space-y-2">
                    <button
                      onClick={() => downloadSingle(activeImage)}
                      disabled={!activeImage.resultBlob || activeImage.isProcessing}
                      className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        Download Full HD {bgColor === 'transparent' ? 'PNG' : 'JPG (300 DPI)'}
                      </span>
                    </button>
                    <p className="text-[10px] text-center text-text-main/60">
                      Original full resolution preserved • Zero watermarks • 100% Free
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Live Preview (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-4">
                {/* View Mode Switcher */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="text-xs font-extrabold text-text-main uppercase tracking-wider">
                      Interactive Visual Comparison
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 bg-surface rounded-xl border border-surface-darker">
                    {[
                      { id: 'side_by_side', label: 'Side by Side' },
                      { id: 'split', label: 'Split Slider' },
                      { id: 'result_only', label: 'Result Only' },
                    ].map((vm) => (
                      <button
                        key={vm.id}
                        onClick={() => setViewMode(vm.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          viewMode === vm.id
                            ? 'bg-white text-primary shadow-sm'
                            : 'text-text-main/70 hover:text-text-main'
                        }`}
                      >
                        {vm.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview Canvas Area */}
                <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-6 min-h-[480px] flex items-center justify-center relative overflow-hidden">
                  {activeImage.isProcessing ? (
                    <div className="flex flex-col items-center justify-center space-y-3 p-8 text-center">
                      <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                      <p className="text-xs font-bold text-text-main">
                        Segmenting Full HD in Local Browser RAM...
                      </p>
                      <p className="text-[11px] text-text-main/60">
                        Preserving 100% original photo resolution and edge detail.
                      </p>
                    </div>
                  ) : activeImage.resultUrl ? (
                    <div className="w-full flex items-center justify-center">
                      {/* VIEW 1: Side by Side */}
                      {viewMode === 'side_by_side' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-text-main/60 uppercase block text-center">
                              Original Photo
                            </span>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-surface-darker bg-surface flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={activeImage.originalUrl}
                                alt="Original"
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-primary uppercase block text-center">
                              Full HD Cutout ({bgColor === 'transparent' ? 'Transparent' : bgColor})
                            </span>
                            <div
                              className={`aspect-[3/4] rounded-2xl overflow-hidden border border-surface-darker flex items-center justify-center ${
                                bgColor === 'transparent'
                                  ? 'bg-[conic-gradient(#cbd5e1_90deg,#fff_90deg_180deg,#cbd5e1_180deg_270deg,#fff_270deg)] bg-[length:16px_16px]'
                                  : ''
                              }`}
                              style={{
                                backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
                              }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={activeImage.resultUrl}
                                alt="Result"
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* VIEW 2: Split Before/After Slider */}
                      {viewMode === 'split' && (
                        <div className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden border border-surface-darker select-none">
                          {/* Result Image (Bottom Layer) */}
                          <div
                            className={`absolute inset-0 w-full h-full flex items-center justify-center ${
                              bgColor === 'transparent'
                                ? 'bg-[conic-gradient(#cbd5e1_90deg,#fff_90deg_180deg,#cbd5e1_180deg_270deg,#fff_270deg)] bg-[length:16px_16px]'
                                : ''
                            }`}
                            style={{
                              backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={activeImage.resultUrl}
                              alt="Result"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>

                          {/* Original Image (Top Layer, clipped by splitPos) */}
                          <div
                            className="absolute inset-0 w-full h-full overflow-hidden"
                            style={{ width: `${splitPos}%` }}
                          >
                            <div className="w-full h-full aspect-[3/4] flex items-center justify-center bg-surface">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={activeImage.originalUrl}
                                alt="Original"
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>

                          {/* Draggable Divider Line */}
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize flex items-center justify-center"
                            style={{ left: `calc(${splitPos}% - 2px)` }}
                          >
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-md text-[10px] font-bold">
                              ↔
                            </div>
                          </div>

                          {/* Transparent overlay input slider */}
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={splitPos}
                            onChange={(e) => setSplitPos(Number(e.target.value))}
                            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                          />
                        </div>
                      )}

                      {/* VIEW 3: Result Only */}
                      {viewMode === 'result_only' && (
                        <div
                          className={`w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden border border-surface-darker flex items-center justify-center shadow-inner ${
                            bgColor === 'transparent'
                              ? 'bg-[conic-gradient(#cbd5e1_90deg,#fff_90deg_180deg,#cbd5e1_180deg_270deg,#fff_270deg)] bg-[length:16px_16px]'
                              : ''
                          }`}
                          style={{
                            backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={activeImage.resultUrl}
                            alt="Result Full"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-text-main/60">Processing image...</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
