'use client';

import * as React from 'react';
import {
  Upload,
  Download,
  ArrowRightLeft,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Archive,
  Layers,
  Sparkles,
  FileCode,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import JSZip from 'jszip';

export type SupportedImageFormat =
  | 'png'
  | 'jpg'
  | 'webp'
  | 'ico'
  | 'bmp'
  | 'gif'
  | 'svg';

export interface ConvertedItem {
  id: string;
  file: File;
  name: string;
  sourceFormat: string;
  targetFormat: SupportedImageFormat;
  originalSize: number;
  previewUrl: string;
  convertedBlob: Blob | null;
  convertedUrl: string | null;
  convertedSize: number | null;
  status: 'pending' | 'processing' | 'done' | 'error';
  errorMessage?: string;
}

interface ImageConverterMatrixEngineProps {
  initialSourceFormat?: SupportedImageFormat;
  initialTargetFormat?: SupportedImageFormat;
  fixedTargetFormat?: boolean;
  toolHeading?: string;
  toolSubheading?: string;
}

/**
 * Generate a true multi-resolution Windows .ico binary containing 16x16, 32x32, and 48x48 PNG frames.
 */
async function generateMultiResIco(img: HTMLImageElement): Promise<Blob> {
  const sizes = [16, 32, 48];
  const pngBuffers: Uint8Array[] = [];

  for (const sz of sizes) {
    const canvas = document.createElement('canvas');
    canvas.width = sz;
    canvas.height = sz;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D unavailable');

    // Draw scaled
    ctx.drawImage(img, 0, 0, sz, sz);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Canvas PNG export failed'))), 'image/png');
    });

    const ab = await blob.arrayBuffer();
    pngBuffers.push(new Uint8Array(ab));
  }

  // Calculate total header & data size
  const numImages = sizes.length;
  const headerSize = 6 + 16 * numImages;
  const totalDataSize = pngBuffers.reduce((sum, b) => sum + b.byteLength, 0);
  const icoBuffer = new Uint8Array(headerSize + totalDataSize);
  const view = new DataView(icoBuffer.buffer);

  // ICONDIR Header (6 bytes)
  view.setUint16(0, 0, true); // Reserved (0)
  view.setUint16(2, 1, true); // Type (1 for icon)
  view.setUint16(4, numImages, true); // Number of images

  let currentOffset = headerSize;

  // ICONDIRENTRY entries (16 bytes per image)
  for (let i = 0; i < numImages; i++) {
    const entryOffset = 6 + i * 16;
    const sz = sizes[i];
    const dataLen = pngBuffers[i].byteLength;

    view.setUint8(entryOffset + 0, sz === 256 ? 0 : sz); // Width
    view.setUint8(entryOffset + 1, sz === 256 ? 0 : sz); // Height
    view.setUint8(entryOffset + 2, 0); // Color count
    view.setUint8(entryOffset + 3, 0); // Reserved
    view.setUint16(entryOffset + 4, 1, true); // Planes
    view.setUint16(entryOffset + 6, 32, true); // Bit count (32-bit RGBA)
    view.setUint32(entryOffset + 8, dataLen, true); // Bytes in resource
    view.setUint32(entryOffset + 12, currentOffset, true); // Image offset

    // Copy PNG bytes into ICO payload
    icoBuffer.set(pngBuffers[i], currentOffset);
    currentOffset += dataLen;
  }

  return new Blob([icoBuffer], { type: 'image/x-icon' });
}

export function ImageConverterMatrixEngine({
  initialSourceFormat = 'png',
  initialTargetFormat = 'jpg',
  fixedTargetFormat = false,
  toolHeading,
  toolSubheading,
}: ImageConverterMatrixEngineProps) {
  const [targetFormat, setTargetFormat] = React.useState<SupportedImageFormat>(initialTargetFormat);
  const [sourceFormatFilter, setSourceFormatFilter] = React.useState<string>(initialSourceFormat);
  const [files, setFiles] = React.useState<ConvertedItem[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [quality, setQuality] = React.useState<number>(90);
  const [isProcessingAll, setIsProcessingAll] = React.useState<boolean>(false);
  const [isZipping, setIsZipping] = React.useState<boolean>(false);
  const [dragOver, setDragOver] = React.useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Convert a single file
  const convertSingle = React.useCallback(
    async (item: ConvertedItem, outFmt: SupportedImageFormat, q: number): Promise<{ blob: Blob; url: string; size: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = async () => {
          try {
            // Special handling for ICO (generate multi-resolution 16, 32, 48 bundle)
            if (outFmt === 'ico') {
              const icoBlob = await generateMultiResIco(img);
              const url = URL.createObjectURL(icoBlob);
              resolve({ blob: icoBlob, url, size: icoBlob.size });
              return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas context not available');

            // Fill white background for non-alpha formats (JPG, BMP)
            if (outFmt === 'jpg' || outFmt === 'bmp') {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            let mime = 'image/jpeg';
            if (outFmt === 'png') mime = 'image/png';
            else if (outFmt === 'webp') mime = 'image/webp';
            else if (outFmt === 'gif') mime = 'image/gif';
            else if (outFmt === 'bmp') mime = 'image/bmp';

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Conversion to blob failed'));
                  return;
                }
                const url = URL.createObjectURL(blob);
                resolve({ blob, url, size: blob.size });
              },
              mime,
              outFmt === 'png' ? undefined : q / 100
            );
          } catch (err) {
            reject(err);
          }
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = item.previewUrl;
      });
    },
    []
  );

  const handleFiles = (incoming: FileList | File[]) => {
    const valid = Array.from(incoming).filter((f) =>
      f.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|avif|bmp|gif|svg)$/i.test(f.name)
    );
    if (valid.length === 0) return;

    const newItems: ConvertedItem[] = valid.map((f) => {
      const ext = f.name.split('.').pop()?.toLowerCase() || 'img';
      return {
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        name: f.name,
        sourceFormat: ext,
        targetFormat,
        originalSize: f.size,
        previewUrl: URL.createObjectURL(f),
        convertedBlob: null,
        convertedUrl: null,
        convertedSize: null,
        status: 'pending',
      };
    });

    setFiles((prev) => [...prev, ...newItems]);
    if (!selectedId && newItems.length > 0) {
      setSelectedId(newItems[0].id);
    }
  };

  const processAll = React.useCallback(async () => {
    if (files.length === 0) return;
    setIsProcessingAll(true);

    const updated = [...files];
    for (let i = 0; i < updated.length; i++) {
      const item = updated[i];
      updated[i] = { ...item, status: 'processing' };
      setFiles([...updated]);

      try {
        const res = await convertSingle(item, targetFormat, quality);
        updated[i] = {
          ...item,
          status: 'done',
          targetFormat,
          convertedBlob: res.blob,
          convertedUrl: res.url,
          convertedSize: res.size,
        };
      } catch (err) {
        updated[i] = {
          ...item,
          status: 'error',
          errorMessage: err instanceof Error ? err.message : 'Conversion failed',
        };
      }
      setFiles([...updated]);
    }
    setIsProcessingAll(false);
  }, [files, targetFormat, quality, convertSingle]);

  const downloadItem = (item: ConvertedItem) => {
    if (!item.convertedUrl) return;
    const a = document.createElement('a');
    a.href = item.convertedUrl;
    const base = item.name.replace(/\.[^/.]+$/, '');
    a.download = `${base}.${item.targetFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAllZip = async () => {
    const done = files.filter((f) => f.convertedBlob && f.status === 'done');
    if (done.length === 0) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      done.forEach((item) => {
        if (!item.convertedBlob) return;
        const base = item.name.replace(/\.[^/.]+$/, '');
        zip.file(`${base}.${item.targetFormat}`, item.convertedBlob);
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `kagazo-${targetFormat}-converted-images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
    } finally {
      setIsZipping(false);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (selectedId === id) {
        setSelectedId(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
  };

  const clearAll = () => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.previewUrl);
      if (f.convertedUrl) URL.revokeObjectURL(f.convertedUrl);
    });
    setFiles([]);
    setSelectedId(null);
  };

  React.useEffect(() => {
    if (files.length > 0 && files.some((f) => f.status === 'done')) {
      const t = setTimeout(() => {
        processAll();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [targetFormat, quality]);

  const selectedFile = files.find((f) => f.id === selectedId) || files[0] || null;

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-primary bg-primary/5 scale-[1.005]'
            : 'border-surface-darker hover:border-primary/50 bg-white shadow-card'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />

        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
            <ArrowRightLeft className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-text-main">
              {toolHeading || `Convert Images to ${targetFormat.toUpperCase()}`}
            </h3>
            <p className="text-xs sm:text-sm text-text-main/70">
              {toolSubheading ||
                `Drag & drop your files here, or click to browse. Instant in-browser conversion.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-text-main/60 pt-1">
            <span className="bg-surface px-2.5 py-1 rounded-lg border border-surface-darker">
              🔒 100% In-Browser RAM
            </span>
            <span className="bg-surface px-2.5 py-1 rounded-lg border border-surface-darker">
              ⚡ High Resolution &amp; Alpha Preservation
            </span>
            <span className="bg-surface px-2.5 py-1 rounded-lg border border-surface-darker">
              📦 Batch ZIP Export
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
                <ArrowRightLeft className="w-5 h-5 text-primary" />
                <h4 className="text-base font-bold text-text-main">Conversion Settings</h4>
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
                  onClick={processAll}
                  disabled={isProcessingAll}
                  className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isProcessingAll ? 'animate-spin' : ''}`} />
                  {isProcessingAll ? 'Converting...' : 'Convert All Now'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Target Format Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main flex items-center justify-between">
                  <span>Target Format</span>
                  <span className="text-[10px] text-primary uppercase font-mono font-bold">
                    .{targetFormat}
                  </span>
                </label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as SupportedImageFormat)}
                  disabled={fixedTargetFormat}
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                >
                  <option value="jpg">JPG / JPEG (Universal Standard)</option>
                  <option value="png">PNG (Lossless Transparent)</option>
                  <option value="webp">WebP (Modern High-Compression)</option>
                  <option value="ico">ICO (16x16, 32x32, 48x48 Multi-Res Favicon)</option>
                  <option value="bmp">BMP (Standard Windows Bitmap)</option>
                  <option value="gif">GIF (Web Graphics)</option>
                </select>
              </div>

              {/* Quality Slider (for lossy formats) */}
              {targetFormat !== 'png' && targetFormat !== 'ico' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-text-main">
                    <span>Export Quality</span>
                    <span className="font-mono text-primary bg-primary-light px-2 py-0.5 rounded text-[11px]">
                      {quality}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-text-main/50 font-mono">
                    <span>Smaller Size</span>
                    <span>Crisp Quality</span>
                  </div>
                </div>
              )}

              {/* Target Details Badge */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main">Format Specification</label>
                <div className="bg-surface border border-surface-darker rounded-xl p-2.5 text-xs text-text-main/80 space-y-1">
                  {targetFormat === 'ico' && (
                    <p className="text-[11px] text-emerald-700 font-bold">
                      ✓ Bundles 16×16, 32×32, and 48×48 frames into a true binary `.ico` file.
                    </p>
                  )}
                  {targetFormat === 'png' && (
                    <p className="text-[11px] text-emerald-700 font-bold">
                      ✓ Lossless alpha transparency channel preserved.
                    </p>
                  )}
                  {targetFormat === 'jpg' && (
                    <p className="text-[11px] text-emerald-700 font-bold">
                      ✓ Pure white background automatic leveling for transparent inputs.
                    </p>
                  )}
                  {targetFormat === 'webp' && (
                    <p className="text-[11px] text-emerald-700 font-bold">
                      ✓ Next-gen web performance standard, 30%+ smaller than JPEG.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Batch Queue */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <h4 className="text-xs sm:text-sm font-bold text-text-main">
                    Conversion Queue ({files.length})
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
                  const isSelected = item.id === selectedId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
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
                            <span className="uppercase">{item.sourceFormat}</span>
                            <span>➔</span>
                            <span className="uppercase text-primary font-bold">{item.targetFormat}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.status === 'done' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
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

          {/* Selected File Details & Download */}
          <div className="lg:col-span-8 space-y-4">
            {selectedFile && (
              <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-darker">
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-text-main truncate">
                      {selectedFile.name}
                    </h4>
                    <p className="text-xs text-text-main/60">
                      Converting from .{selectedFile.sourceFormat} to .{selectedFile.targetFormat}
                    </p>
                  </div>

                  {selectedFile.status === 'done' && (
                    <button
                      type="button"
                      onClick={() => downloadItem(selectedFile)}
                      className="px-4 py-2 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
                    >
                      <Download className="w-4 h-4" /> Download .{selectedFile.targetFormat.toUpperCase()}
                    </button>
                  )}
                </div>

                {/* Side by Side Preview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Source Card */}
                  <div className="rounded-2xl border border-surface-darker bg-surface/40 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-text-main">
                      <span>Source ({selectedFile.sourceFormat.toUpperCase()})</span>
                      <span className="font-mono text-text-main/70">
                        {formatSize(selectedFile.originalSize)}
                      </span>
                    </div>

                    <div className="aspect-video bg-neutral-900/5 rounded-xl border border-surface-darker flex items-center justify-center overflow-hidden p-2">
                      <img
                        src={selectedFile.previewUrl}
                        alt="Source preview"
                        className="max-h-full max-w-full object-contain rounded"
                      />
                    </div>
                  </div>

                  {/* Converted Card */}
                  <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-text-main">
                      <span className="flex items-center gap-1.5 text-primary">
                        <Sparkles className="w-3.5 h-3.5" /> Output (
                        {selectedFile.targetFormat.toUpperCase()})
                      </span>
                      {selectedFile.convertedSize && (
                        <span className="font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                          {formatSize(selectedFile.convertedSize)}
                        </span>
                      )}
                    </div>

                    <div className="aspect-video bg-neutral-900/5 rounded-xl border border-primary/20 flex items-center justify-center overflow-hidden p-2">
                      {selectedFile.status === 'processing' ? (
                        <div className="text-center space-y-2">
                          <RefreshCw className="w-6 h-6 text-primary animate-spin mx-auto" />
                          <p className="text-xs text-primary font-bold">Converting in memory...</p>
                        </div>
                      ) : selectedFile.convertedUrl ? (
                        <img
                          src={selectedFile.convertedUrl}
                          alt="Converted preview"
                          className="max-h-full max-w-full object-contain rounded"
                        />
                      ) : (
                        <p className="text-xs text-text-main/50">
                          Click &quot;Convert All Now&quot; to render
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {selectedFile.status === 'done' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Ready! Converted successfully to high-definition .{selectedFile.targetFormat.toUpperCase()} with 100% in-browser RAM privacy.
                    </span>
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
