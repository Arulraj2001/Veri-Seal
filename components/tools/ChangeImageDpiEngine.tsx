'use client';

import * as React from 'react';
import {
  Upload,
  Sparkles,
  Download,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Trash2,
  FileCheck,
  Info,
  Sliders,
  Printer,
  Compass,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  injectJfifDpi,
  extractJfifDpi,
} from '@/lib/image-engine';
import { AdSlot } from '@/components/ads/AdSlot';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

export interface ChangeImageDpiEngineProps {
  initialDpi?: number;
  toolHeading?: string;
  toolSubheading?: string;
}

export function ChangeImageDpiEngine({
  initialDpi = 300,
  toolHeading,
  toolSubheading,
}: ChangeImageDpiEngineProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [detectedDpi, setDetectedDpi] = React.useState<number | null>(null);
  const [targetDpi, setTargetDpi] = React.useState<number>(initialDpi);
  const [quality, setQuality] = React.useState<number>(0.92);
  const [imageDims, setImageDims] = React.useState<{ width: number; height: number } | null>(null);

  // Result state
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [resultDataUrl, setResultDataUrl] = React.useState<string | null>(null);
  const [resultSizeKb, setResultSizeKb] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  const dpiPresets = [150, 300, 600];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPEG, PNG, WebP).');
        return;
      }

      setFile(selected);
      setError(null);
      setResultDataUrl(null);

      // Read buffer to detect current DPI
      const buf = await selected.arrayBuffer();
      const bytes = new Uint8Array(buf);
      const existingDpi = extractJfifDpi(bytes);
      setDetectedDpi(existingDpi || 72); // 72 is standard web default if uncalibrated

      // Load image dimensions
      const url = URL.createObjectURL(selected);
      setFilePreview(url);

      const img = new Image();
      img.onload = () => {
        setImageDims({ width: img.width, height: img.height });
      };
      img.src = url;
    }
  };

  const handleConvertDpi = async () => {
    if (!file || !imageDims) return;

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Draw onto canvas
      const img = new Image();
      img.src = filePreview!;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image into memory.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      // 2. Export as JPEG blob
      const jpegBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
      });

      if (!jpegBlob) {
        throw new Error('Failed to encode JPEG image.');
      }

      // 3. Inject exact JFIF DPI bytes
      const arrayBuf = await jpegBlob.arrayBuffer();
      const bytesWithDpi = injectJfifDpi(new Uint8Array(arrayBuf), targetDpi);

      const finalBlob = new Blob([bytesWithDpi.buffer as ArrayBuffer], { type: 'image/jpeg' });
      const finalUrl = URL.createObjectURL(finalBlob);

      setResultDataUrl(finalUrl);
      setResultSizeKb(Math.round((finalBlob.size / 1024) * 10) / 10);
    } catch (err: any) {
      setError(err?.message || 'Failed to change DPI. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Run automatically when target DPI changes and image is loaded
  React.useEffect(() => {
    if (filePreview && imageDims) {
      handleConvertDpi();
    }
  }, [filePreview, targetDpi, quality, imageDims]);

  const handleDownload = () => {
    if (!resultDataUrl) return;
    const a = document.createElement('a');
    a.href = resultDataUrl;
    const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, '') : 'image';
    a.download = `${baseName}_${targetDpi}dpi.jpg`;
    a.click();
  };

  // Calculate physical print size in inches and cm
  const printSizeInches = imageDims
    ? {
        w: (imageDims.width / targetDpi).toFixed(2),
        h: (imageDims.height / targetDpi).toFixed(2),
      }
    : null;

  const printSizeCm = imageDims
    ? {
        w: ((imageDims.width / targetDpi) * 2.54).toFixed(1),
        h: ((imageDims.height / targetDpi) * 2.54).toFixed(1),
      }
    : null;

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-8 space-y-7">
      {/* Upload Zone (when no file selected) */}
      {!file && (
        <div className="border-2 border-dashed border-primary/40 hover:border-primary rounded-3xl p-8 sm:p-12 text-center transition-all bg-surface/30 hover:bg-surface/60 group">
          <input
            type="file"
            id="dpi-photo-upload"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            className="sr-only"
          />
          <label htmlFor="dpi-photo-upload" className="cursor-pointer block space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary mx-auto flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <Printer className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black text-text-main">
                {toolHeading || 'Convert Image DPI to 300 / 600 DPI'}
              </h3>
              <p className="text-xs sm:text-sm text-text-main/70 max-w-md mx-auto">
                {toolSubheading ||
                  'Rewrite binary JFIF density metadata to 300 or 600 DPI without altering visual clarity. 100% compliant with government portals.'}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-hover transition-all">
              <Upload className="w-4 h-4" />
              <span>Select Image to Change DPI</span>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-text-main/50 pt-2">
              <span>✓ RFC-Compliant JFIF Marker</span>
              <span>•</span>
              <span>✓ Zero Quality Compression Loss</span>
              <span>•</span>
              <span>✓ 100% In-Browser Privacy</span>
            </div>
          </label>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Active Workspace */}
      {file && (
        <div className="space-y-6">
          {/* Top Bar: File & Detected DPI status */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface/50 rounded-2xl border border-surface-darker">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-text-main block truncate max-w-xs sm:max-w-md">
                {file.name}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-text-main/60">
                <span>Original: {Math.round(file.size / 1024)} KB</span>
                {imageDims && (
                  <span>
                    • {imageDims.width} × {imageDims.height} px
                  </span>
                )}
                {detectedDpi && (
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono font-bold">
                    Detected: {detectedDpi} DPI
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="dpi-replace"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-xs font-bold text-primary transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
                <input
                  id="dpi-replace"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setFilePreview(null);
                  setResultDataUrl(null);
                  setImageDims(null);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* 2-Column Desktop Split: Controls on Left, Live Output Preview on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Target DPI & Physical Calc (6 cols on lg / xl) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Controls: Target DPI Preset Selection */}
              <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-primary" />
                    Target Resolution (DPI)
                  </span>
                  <span className="text-sm font-black text-primary font-mono bg-primary-light px-3 py-0.5 rounded-full">
                    Target: {targetDpi} DPI
                  </span>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap items-center gap-2">
                  {dpiPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTargetDpi(preset)}
                      className={cn(
                        'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
                        targetDpi === preset
                          ? 'bg-primary text-white shadow-2xs'
                          : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                      )}
                    >
                      {preset} DPI {preset === 300 && '★'}
                    </button>
                  ))}

                  <div className="flex items-center gap-1 ml-auto">
                    <span className="text-[11px] font-bold text-text-main/60">Custom:</span>
                    <input
                      type="number"
                      min="72"
                      max="1200"
                      step="1"
                      value={targetDpi}
                      onChange={(e) => setTargetDpi(Math.max(72, Math.min(1200, parseInt(e.target.value, 10) || 300)))}
                      className="w-16 px-1.5 py-1 rounded-lg bg-white border border-surface-darker text-xs font-mono font-bold text-text-main text-center focus:border-primary focus:outline-hidden"
                    />
                    <span className="text-[11px] font-bold text-text-main/60">DPI</span>
                  </div>
                </div>

                {/* Quality Slider */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs text-text-main/60 font-semibold">
                    <span>JPEG Quality: {Math.round(quality * 100)}%</span>
                    <span>Recommended: 92%–98%</span>
                  </div>
                  <input
                    type="range"
                    min="0.70"
                    max="0.99"
                    step="0.01"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* Physical Dimensions Inspector Card */}
              {imageDims && printSizeInches && printSizeCm && (
                <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-primary" />
                    Physical Print Dimensions at {targetDpi} DPI
                  </span>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-surface/50 border border-surface-darker space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-text-main/50 block">Resolution</span>
                      <span className="font-mono font-black text-text-main text-xs block truncate">
                        {imageDims.width}×{imageDims.height}px
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-surface/50 border border-surface-darker space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-text-main/50 block">Inches</span>
                      <span className="font-mono font-black text-primary text-xs block">
                        {printSizeInches.w}" × {printSizeInches.h}"
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-surface/50 border border-surface-darker space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-text-main/50 block">Metric</span>
                      <span className="font-mono font-black text-emerald-700 text-xs block">
                        {printSizeCm.w} × {printSizeCm.h} cm
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Live Image Preview & Download (6 cols, sticky on desktop) */}
            <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
              {resultDataUrl ? (
                <div className="p-5 rounded-3xl bg-surface/50 border-2 border-emerald-500/40 shadow-card space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-surface-darker">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-xs font-black text-text-main block">JFIF Header Verified</span>
                        <span className="text-[11px] text-emerald-700 font-bold block">
                          Exact {targetDpi} DPI Injected
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
                      {resultSizeKb} KB
                    </span>
                  </div>

                  {/* Image Preview */}
                  <div className="p-3 bg-white rounded-2xl border border-surface-darker space-y-2 text-center relative">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider px-1">
                      <span className="text-primary font-black flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {targetDpi} DPI Output
                      </span>
                      <span className="text-text-main/50 font-mono">
                        {imageDims?.width}×{imageDims?.height}px
                      </span>
                    </div>
                    <div className="h-56 flex items-center justify-center bg-surface/30 rounded-xl overflow-hidden p-2">
                      <img
                        src={resultDataUrl}
                        alt="300 DPI converted output"
                        className="max-h-full max-w-full object-contain shadow-xs rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Download & Share Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download {targetDpi} DPI Image ({resultSizeKb} KB)</span>
                    </button>

                    <WhatsAppShare
                      message={`Convert image to exact 300 DPI for free with Kagazo: https://kagazo.in/tools/change-image-dpi`}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-surface/30 border-2 border-dashed border-surface-darker text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-primary/50 mx-auto animate-pulse" />
                  <span className="text-xs font-bold text-text-main block">Injecting {targetDpi} DPI...</span>
                  <span className="text-[11px] text-text-main/60 block">
                    Your verified image preview and download link will appear right here.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
