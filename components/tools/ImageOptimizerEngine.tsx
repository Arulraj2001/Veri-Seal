'use client';

import * as React from 'react';
import {
  Upload,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  Settings2,
  Sliders,
  Sparkles,
  ShieldCheck,
  Archive,
  RefreshCw,
  Eye,
  FileText,
  Layers,
  ArrowRight,
} from 'lucide-react';
import JSZip from 'jszip';

export interface OptimizedFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  previewUrl: string;
  optimizedBlob: Blob | null;
  optimizedUrl: string | null;
  optimizedSize: number | null;
  optimizedWidth: number | null;
  optimizedHeight: number | null;
  compressionRatio: number | null;
  format: 'image/webp' | 'image/jpeg' | 'image/png' | 'image/avif';
  status: 'pending' | 'processing' | 'done' | 'error';
  errorMessage?: string;
}

export function ImageOptimizerEngine() {
  const [files, setFiles] = React.useState<OptimizedFile[]>([]);
  const [selectedFileId, setSelectedFileId] = React.useState<string | null>(null);
  const [format, setFormat] = React.useState<'auto' | 'image/webp' | 'image/jpeg' | 'image/png' | 'image/avif'>('image/webp');
  const [quality, setQuality] = React.useState<number>(80);
  const [stripExif, setStripExif] = React.useState<boolean>(true);
  const [resizePercent, setResizePercent] = React.useState<number>(100);
  const [targetKb, setTargetKb] = React.useState<string>('');
  const [isProcessingAll, setIsProcessingAll] = React.useState<boolean>(false);
  const [isZipping, setIsZipping] = React.useState<boolean>(false);
  const [dragOver, setDragOver] = React.useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Format file size nicely
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Process a single image file through canvas
  const processImage = React.useCallback(
    async (
      item: OptimizedFile,
      targetFormat: 'image/webp' | 'image/jpeg' | 'image/png' | 'image/avif',
      qualityVal: number,
      scalePct: number,
      maxKb?: number
    ): Promise<{
      blob: Blob;
      url: string;
      size: number;
      width: number;
      height: number;
      ratio: number;
    }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = async () => {
          try {
            const canvas = document.createElement('canvas');
            const scale = scalePct / 100;
            const targetW = Math.max(1, Math.round(img.naturalWidth * scale));
            const targetH = Math.max(1, Math.round(img.naturalHeight * scale));

            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              reject(new Error('Canvas 2D context unavailable'));
              return;
            }

            // If output format doesn't support alpha transparency (e.g. JPEG), paint white background
            if (targetFormat === 'image/jpeg') {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, targetW, targetH);
            }

            ctx.drawImage(img, 0, 0, targetW, targetH);

            // Determine MIME type
            let outMime = targetFormat;
            if (outMime === 'image/avif') {
              // Fallback to webp if browser canvas doesn't encode AVIF yet
              const testCanvas = document.createElement('canvas');
              if (!testCanvas.toDataURL('image/avif').startsWith('data:image/avif')) {
                outMime = 'image/webp';
              }
            }

            // Function to export canvas at given quality
            const exportBlob = (q: number): Promise<Blob> => {
              return new Promise((res, rej) => {
                canvas.toBlob(
                  (b) => {
                    if (b) res(b);
                    else rej(new Error('Canvas toBlob failed'));
                  },
                  outMime,
                  q
                );
              });
            };

            let finalBlob: Blob;

            // Target size mode with binary search bisection
            if (maxKb && maxKb > 0 && outMime !== 'image/png') {
              const targetBytes = maxKb * 1024;
              let lowQ = 0.05;
              let highQ = 0.98;
              let bestBlob = await exportBlob(0.8);

              for (let i = 0; i < 7; i++) {
                const midQ = (lowQ + highQ) / 2;
                const testBlob = await exportBlob(midQ);
                if (testBlob.size <= targetBytes) {
                  bestBlob = testBlob;
                  lowQ = midQ; // Try to get higher quality still under target
                } else {
                  highQ = midQ; // File is too big, reduce quality
                }
              }
              finalBlob = bestBlob;
            } else {
              // Standard quality slider
              const qParam = outMime === 'image/png' ? undefined : qualityVal / 100;
              finalBlob = await exportBlob(qParam || 0.8);
            }

            const url = URL.createObjectURL(finalBlob);
            const ratio = Math.max(0, Math.round(((item.originalSize - finalBlob.size) / item.originalSize) * 100));

            resolve({
              blob: finalBlob,
              url,
              size: finalBlob.size,
              width: targetW,
              height: targetH,
              ratio,
            });
          } catch (err) {
            reject(err);
          }
        };

        img.onerror = () => reject(new Error('Failed to load image in browser'));
        img.src = item.previewUrl;
      });
    },
    []
  );

  // Handle incoming files
  const handleFiles = (incoming: FileList | File[]) => {
    const validImageFiles = Array.from(incoming).filter((f) =>
      f.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|avif|bmp|gif)$/i.test(f.name)
    );

    if (validImageFiles.length === 0) return;

    const newItems: OptimizedFile[] = validImageFiles.map((f) => {
      const url = URL.createObjectURL(f);
      return {
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        name: f.name,
        originalSize: f.size,
        originalWidth: 0,
        originalHeight: 0,
        previewUrl: url,
        optimizedBlob: null,
        optimizedUrl: null,
        optimizedSize: null,
        optimizedWidth: null,
        optimizedHeight: null,
        compressionRatio: null,
        format: format === 'auto' ? 'image/webp' : format,
        status: 'pending',
      };
    });

    setFiles((prev) => [...prev, ...newItems]);
    if (!selectedFileId && newItems.length > 0) {
      setSelectedFileId(newItems[0].id);
    }
  };

  // Batch process all files
  const processAllFiles = React.useCallback(async () => {
    if (files.length === 0) return;
    setIsProcessingAll(true);

    const maxKbVal = targetKb ? parseFloat(targetKb) : undefined;

    const updated = [...files];

    for (let i = 0; i < updated.length; i++) {
      const item = updated[i];
      let targetFormat: 'image/webp' | 'image/jpeg' | 'image/png' | 'image/avif' = 'image/webp';

      if (format === 'auto') {
        // Auto chooses WebP for photo compression
        targetFormat = item.file.type === 'image/png' ? 'image/png' : 'image/webp';
      } else {
        targetFormat = format;
      }

      updated[i] = { ...item, status: 'processing' };
      setFiles([...updated]);

      try {
        const res = await processImage(item, targetFormat, quality, resizePercent, maxKbVal);
        updated[i] = {
          ...item,
          status: 'done',
          optimizedBlob: res.blob,
          optimizedUrl: res.url,
          optimizedSize: res.size,
          optimizedWidth: res.width,
          optimizedHeight: res.height,
          compressionRatio: res.ratio,
          format: targetFormat,
        };
      } catch (err) {
        updated[i] = {
          ...item,
          status: 'error',
          errorMessage: err instanceof Error ? err.message : 'Processing failed',
        };
      }
      setFiles([...updated]);
    }

    setIsProcessingAll(false);
  }, [files, format, quality, resizePercent, targetKb, processImage]);

  // Download single item
  const downloadItem = (item: OptimizedFile) => {
    if (!item.optimizedUrl || !item.optimizedBlob) return;
    const a = document.createElement('a');
    a.href = item.optimizedUrl;

    const ext =
      item.format === 'image/webp'
        ? 'webp'
        : item.format === 'image/avif'
        ? 'avif'
        : item.format === 'image/png'
        ? 'png'
        : 'jpg';

    const baseName = item.name.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}-optimized.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download all as ZIP
  const downloadAllZip = async () => {
    const doneItems = files.filter((f) => f.optimizedBlob && f.status === 'done');
    if (doneItems.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();

      doneItems.forEach((item) => {
        if (!item.optimizedBlob) return;
        const ext =
          item.format === 'image/webp'
            ? 'webp'
            : item.format === 'image/avif'
            ? 'avif'
            : item.format === 'image/png'
            ? 'png'
            : 'jpg';
        const baseName = item.name.replace(/\.[^/.]+$/, '');
        zip.file(`${baseName}-optimized.${ext}`, item.optimizedBlob);
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipBlob);
      a.download = `kagazo-optimized-images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (selectedFileId === id) {
        setSelectedFileId(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
  };

  const clearAll = () => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.previewUrl);
      if (f.optimizedUrl) URL.revokeObjectURL(f.optimizedUrl);
    });
    setFiles([]);
    setSelectedFileId(null);
  };

  const selectedFile = files.find((f) => f.id === selectedFileId) || files[0] || null;

  // Auto trigger process on settings change if files already uploaded
  React.useEffect(() => {
    if (files.length > 0 && files.some((f) => f.status === 'done')) {
      const timer = setTimeout(() => {
        processAllFiles();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [quality, format, resizePercent, targetKb]);

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
          }
        }}
        className={`relative rounded-3xl border-2 border-dashed transition-all p-8 sm:p-12 text-center cursor-pointer ${
          dragOver
            ? 'border-primary bg-primary/5 scale-[1.005]'
            : 'border-surface-darker hover:border-primary/50 bg-white shadow-card'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif,image/bmp,image/gif"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              handleFiles(e.target.files);
            }
          }}
        />

        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
            <Upload className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-text-main">
              Drop your images here, or <span className="text-primary underline">browse</span>
            </h3>
            <p className="text-xs sm:text-sm text-text-main/70">
              Supports JPEG, PNG, WebP, AVIF, BMP, GIF. Batch upload up to 50 photos.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-text-main/60 pt-1">
            <span className="bg-surface px-2.5 py-1 rounded-lg border border-surface-darker">
              ⚡ WebP &amp; AVIF Ultra Compress
            </span>
            <span className="bg-surface px-2.5 py-1 rounded-lg border border-surface-darker">
              🔒 100% In-Browser Privacy
            </span>
            <span className="bg-surface px-2.5 py-1 rounded-lg border border-surface-darker">
              📦 ZIP Export
            </span>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Bar */}
          <div className="lg:col-span-12 bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-darker">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                <h4 className="text-base font-bold text-text-main">Optimization Engine Parameters</h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
                <button
                  type="button"
                  onClick={processAllFiles}
                  disabled={isProcessingAll}
                  className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isProcessingAll ? 'animate-spin' : ''}`} />
                  {isProcessingAll ? 'Processing...' : 'Re-Compress All'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Output Format */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main flex items-center justify-between">
                  <span>Output Format</span>
                  <span className="text-[10px] text-primary uppercase font-mono">
                    {format === 'auto' ? 'Auto Smart' : format.split('/')[1]}
                  </span>
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="image/webp">WebP (Recommended - Smallest)</option>
                  <option value="image/jpeg">JPEG (Universal Compatibility)</option>
                  <option value="image/png">PNG (Lossless &amp; Transparent)</option>
                  <option value="image/avif">AVIF (Next-Gen High Quality)</option>
                  <option value="auto">Auto (Match Source &amp; Optimize)</option>
                </select>
              </div>

              {/* Quality Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-text-main">
                  <span>Compression Quality</span>
                  <span className="font-mono text-primary bg-primary-light px-2 py-0.5 rounded text-[11px]">
                    {quality}%
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-text-main/50 font-mono">
                  <span>Smallest Size (5%)</span>
                  <span>High Quality (100%)</span>
                </div>
              </div>

              {/* Target File Size (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main flex items-center justify-between">
                  <span>Target Max KB (Optional)</span>
                  <span className="text-[10px] text-text-main/50">Auto-Bisection</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g. 100, 200, 500"
                    value={targetKb}
                    onChange={(e) => setTargetKb(e.target.value)}
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs font-mono font-semibold rounded-xl px-3 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-2.5 text-[11px] font-bold text-text-main/40 pointer-events-none">
                    KB
                  </span>
                </div>
              </div>

              {/* Resize Scale */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main flex items-center justify-between">
                  <span>Resize Dimensions</span>
                  <span className="text-[10px] font-mono text-primary font-bold">{resizePercent}%</span>
                </label>
                <select
                  value={resizePercent}
                  onChange={(e) => setResizePercent(Number(e.target.value))}
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={100}>Original Dimensions (100%)</option>
                  <option value={80}>Scale 80% Width/Height</option>
                  <option value={50}>Scale 50% (Half Dimensions)</option>
                  <option value={25}>Scale 25% (Quarter Dimensions)</option>
                </select>
              </div>
            </div>

            {/* Quick Action Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-text-main/60 font-medium">Quick Presets:</span>
              <button
                type="button"
                onClick={() => {
                  setQuality(80);
                  setFormat('image/webp');
                  setTargetKb('');
                  setResizePercent(100);
                }}
                className="px-2.5 py-1 rounded-lg bg-surface border border-surface-darker hover:border-primary text-text-main font-semibold text-[11px] transition-colors"
              >
                🌐 Web Best (WebP 80%)
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuality(60);
                  setFormat('image/jpeg');
                  setTargetKb('200');
                  setResizePercent(100);
                }}
                className="px-2.5 py-1 rounded-lg bg-surface border border-surface-darker hover:border-primary text-text-main font-semibold text-[11px] transition-colors"
              >
                📋 Portal 200KB Max
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuality(95);
                  setFormat('image/png');
                  setTargetKb('');
                  setResizePercent(100);
                }}
                className="px-2.5 py-1 rounded-lg bg-surface border border-surface-darker hover:border-primary text-text-main font-semibold text-[11px] transition-colors"
              >
                ✨ Lossless Crisp (PNG)
              </button>
            </div>
          </div>

          {/* Batch Files Queue */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <h4 className="text-xs sm:text-sm font-bold text-text-main">
                    Batch Queue ({files.length})
                  </h4>
                </div>

                {files.filter((f) => f.status === 'done').length > 1 && (
                  <button
                    type="button"
                    onClick={downloadAllZip}
                    disabled={isZipping}
                    className="px-3 py-1 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    {isZipping ? 'Zipping...' : 'Download ZIP'}
                  </button>
                )}
              </div>

              <div className="max-h-[440px] overflow-y-auto space-y-2 pr-1">
                {files.map((item) => {
                  const isSelected = item.id === selectedFileId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedFileId(item.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-primary bg-primary-light/40 shadow-sm'
                          : 'border-surface-darker hover:border-primary/40 bg-surface/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-surface-darker shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-text-main truncate max-w-[130px] sm:max-w-[180px]">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-text-main/60 font-mono">
                            <span>{formatSize(item.originalSize)}</span>
                            {item.optimizedSize && (
                              <>
                                <span>➔</span>
                                <span className="text-emerald-600 font-bold">
                                  {formatSize(item.optimizedSize)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.compressionRatio !== null && item.compressionRatio > 0 && (
                          <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            -{item.compressionRatio}%
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(item.id);
                          }}
                          className="p-1.5 rounded-lg text-text-main/40 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected File Before/After Preview Studio */}
          <div className="lg:col-span-8 space-y-4">
            {selectedFile && (
              <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-darker">
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-text-main truncate">
                      {selectedFile.name}
                    </h4>
                    <p className="text-xs text-text-main/60">
                      Live comparison preview &amp; format conversion details
                    </p>
                  </div>

                  {selectedFile.status === 'done' && (
                    <button
                      type="button"
                      onClick={() => downloadItem(selectedFile)}
                      className="px-4 py-2 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
                    >
                      <Download className="w-4 h-4" /> Download Optimized Image
                    </button>
                  )}
                </div>

                {/* Side by Side Preview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Original Image Card */}
                  <div className="rounded-2xl border border-surface-darker bg-surface/40 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-text-main">
                      <span>Original Image</span>
                      <span className="font-mono text-text-main/70">
                        {formatSize(selectedFile.originalSize)}
                      </span>
                    </div>

                    <div className="aspect-video bg-neutral-900/5 rounded-xl border border-surface-darker flex items-center justify-center overflow-hidden p-2">
                      <img
                        src={selectedFile.previewUrl}
                        alt="Original preview"
                        className="max-h-full max-w-full object-contain rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-text-main/60 pt-1">
                      <span>Format: {selectedFile.file.type.split('/')[1]?.toUpperCase() || 'IMG'}</span>
                      <span>Source File</span>
                    </div>
                  </div>

                  {/* Optimized Image Card */}
                  <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs font-bold text-text-main">
                      <span className="flex items-center gap-1.5 text-primary">
                        <Sparkles className="w-3.5 h-3.5" /> Optimized Output
                      </span>
                      {selectedFile.optimizedSize && (
                        <span className="font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                          {formatSize(selectedFile.optimizedSize)}
                        </span>
                      )}
                    </div>

                    <div className="aspect-video bg-neutral-900/5 rounded-xl border border-primary/20 flex items-center justify-center overflow-hidden p-2 relative">
                      {selectedFile.status === 'processing' ? (
                        <div className="text-center space-y-2">
                          <RefreshCw className="w-6 h-6 text-primary animate-spin mx-auto" />
                          <p className="text-xs text-primary font-bold">Compressing in memory...</p>
                        </div>
                      ) : selectedFile.optimizedUrl ? (
                        <img
                          src={selectedFile.optimizedUrl}
                          alt="Optimized preview"
                          className="max-h-full max-w-full object-contain rounded"
                        />
                      ) : (
                        <p className="text-xs text-text-main/50">Click &quot;Re-Compress All&quot; to render</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-text-main/70 pt-1">
                      <span className="font-bold text-primary">
                        {selectedFile.format.split('/')[1]?.toUpperCase()}
                      </span>
                      {selectedFile.compressionRatio !== null && (
                        <span className="text-emerald-700 font-bold">
                          Saved {selectedFile.compressionRatio}% of file size!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metrics Stats Banner */}
                {selectedFile.optimizedSize && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>
                        Successfully reduced from {formatSize(selectedFile.originalSize)} to{' '}
                        {formatSize(selectedFile.optimizedSize)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-emerald-900 font-bold">
                      <span>Net Savings: {formatSize(selectedFile.originalSize - selectedFile.optimizedSize)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
