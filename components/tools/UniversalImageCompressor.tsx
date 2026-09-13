'use client';

import * as React from 'react';
import {
  Upload,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  ZoomIn,
  ShieldCheck,
  RefreshCw,
  Trash2,
  Sliders,
  Crop,
  Lock,
  ArrowRight,
  FileCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { processImageClient, type ProcessImageResult } from '@/lib/image-engine';
import { ImageStudioViewport, type CropState, type StudioEdits } from './studio/ImageStudioViewport';
import { AdSlot } from '@/components/ads/AdSlot';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

export interface UniversalImageCompressorProps {
  initialTargetKb?: number;
  isFixedTarget?: boolean;
  toolHeading?: string;
  toolSubheading?: string;
  targetKeywords?: string[];
  onDownloadSuccess?: () => void;
}

export function UniversalImageCompressor({
  initialTargetKb = 100,
  isFixedTarget = false,
  toolHeading,
  toolSubheading,
  onDownloadSuccess,
}: UniversalImageCompressorProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);

  // Target KB configuration
  const [targetKb, setTargetKb] = React.useState<number>(initialTargetKb);
  const [showCropStudio, setShowCropStudio] = React.useState<boolean>(false);
  const [cropRect, setCropRect] = React.useState<CropState | undefined>(undefined);
  const [studioEdits, setStudioEdits] = React.useState<StudioEdits>({
    rotationDeg: 0,
    flipHorizontal: false,
    flipVertical: false,
    brightness: 0,
    contrast: 0,
    grayscale: false,
  });

  // Processing state
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [result, setResult] = React.useState<ProcessImageResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isHoverZoom, setIsHoverZoom] = React.useState<boolean>(false);

  const presets = [50, 100, 200, 500, 1000];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setResult(null);
      setError(null);
      setShowCropStudio(false);
      const url = URL.createObjectURL(selected);
      setFilePreview(url);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setProgress(20);
    setError(null);

    try {
      // Safe bracket: targetKb * 0.90 to targetKb
      const minKb = Math.max(5, Math.round(targetKb * 0.85));
      const maxKb = targetKb;

      const res = await processImageClient(file, {
        targetMinKb: minKb,
        targetMaxKb: maxKb,
        cropRect: showCropStudio ? cropRect : undefined,
        rotationDeg: showCropStudio ? studioEdits.rotationDeg : 0,
        flipHorizontal: showCropStudio ? studioEdits.flipHorizontal : false,
        flipVertical: showCropStudio ? studioEdits.flipVertical : false,
        brightness: showCropStudio ? studioEdits.brightness : 0,
        contrast: showCropStudio ? studioEdits.contrast : 0,
        grayscale: showCropStudio ? studioEdits.grayscale : false,
        dpi: 300,
        maintainAspectRatio: true,
        filterMode: 'unsharp_sharp',
        onProgress: (p) => setProgress(p),
      });

      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to compress image. Please try again.');
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.dataUrl;
    const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, '') : 'compressed';
    a.download = `${baseName}_${result.sizeKb}kb.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (onDownloadSuccess) {
      onDownloadSuccess();
    }
  };

  const originalKb = file ? Math.round((file.size / 1024) * 10) / 10 : 0;
  const reductionPercent =
    result && originalKb > 0
      ? Math.round(Math.max(0, (1 - result.sizeKb / originalKb) * 100))
      : 0;

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {toolHeading || `Compress Image to Exact ${targetKb}KB`}
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            {toolSubheading ||
              `Reduces file size strictly under ${targetKb}KB without blurry distortion or quality loss.`}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Private (On-Device)
          </span>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="space-y-4">
        {!filePreview ? (
          <label
            htmlFor="universal-upload"
            className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-primary-light/10 hover:bg-primary-light/20 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform mb-3 shadow-2xs">
              <Upload className="w-7 h-7" />
            </div>
            <div className="font-extrabold text-base text-text-main">
              Upload Image to Compress
            </div>
            <p className="text-xs sm:text-sm text-text-main/60 mt-1 max-w-md">
              Drag &amp; drop any JPG, PNG, WEBP, or smartphone camera photo. High-speed client-side compression.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
              Up to 30MB • Instant Processing
            </span>
            <input
              id="universal-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-surface/60 rounded-2xl border border-surface-darker gap-4">
            <div className="flex items-center gap-3">
              <img
                src={filePreview}
                alt="Source preview"
                className="w-16 h-16 object-contain bg-white rounded-xl border border-surface-darker p-1"
              />
              <div>
                <div className="font-extrabold text-sm text-text-main max-w-[220px] sm:max-w-xs truncate">
                  {file?.name}
                </div>
                <div className="text-xs text-text-main/60">
                  Original Size:{' '}
                  <span className="font-bold text-text-main">{originalKb} KB</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowCropStudio(!showCropStudio)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors',
                  showCropStudio
                    ? 'border-primary bg-primary text-white'
                    : 'border-surface-darker bg-white hover:bg-surface text-text-main'
                )}
              >
                <Crop className="w-3.5 h-3.5" />
                <span>{showCropStudio ? 'Close Studio' : 'Crop & Edit Studio'}</span>
              </button>

              <label
                htmlFor="universal-replace"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-xs font-bold text-primary transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
                <input
                  id="universal-replace"
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
                  setResult(null);
                  setShowCropStudio(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loaded File Workspace */}
      {file && (
        <div className="space-y-6">
          {/* Optional Crop & Edit Studio Viewport (collapsible at top) */}
          {showCropStudio && filePreview && (
            <div className="p-4 bg-surface/30 rounded-3xl border border-surface-darker space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
                  <Crop className="w-3.5 h-3.5 text-primary" />
                  Interactive Free-Size Crop, Rotation &amp; Color Studio
                </span>
                <button
                  type="button"
                  onClick={() => setShowCropStudio(false)}
                  className="text-xs font-bold text-text-main/60 hover:text-text-main px-2 py-1 rounded-lg hover:bg-surface cursor-pointer"
                >
                  ✕ Close Studio
                </button>
              </div>
              <ImageStudioViewport
                imageSrc={filePreview}
                overlayType="grid"
                defaultAspectRatio="free"
                onCropChange={(crop, _rot, edits) => {
                  setCropRect(crop);
                  setStudioEdits(edits);
                }}
              />
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* 2-Column Desktop Split: Controls on Left, Live Output on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Compression Controls & Sliders (6 cols on lg / xl) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-primary" />
                    Target Output File Size
                  </span>
                  <span className="text-sm font-black text-primary font-mono bg-primary-light px-3 py-0.5 rounded-full">
                    Max {targetKb} KB
                  </span>
                </div>

                {/* Quick Preset Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-text-main/60 mr-1">Quick Targets:</span>
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTargetKb(preset)}
                      className={cn(
                        'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
                        targetKb === preset
                          ? 'bg-primary text-white shadow-2xs'
                          : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                      )}
                    >
                      {preset >= 1000 ? `${preset / 1000} MB` : `${preset} KB`}
                    </button>
                  ))}
                </div>

                {/* Continuous Target Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-text-main/60 font-semibold">
                    <span>Ultra Compact (20 KB)</span>
                    <span>Balanced (200 KB)</span>
                    <span>High Detail (2 MB)</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="2000"
                    step="10"
                    value={targetKb}
                    onChange={(e) => setTargetKb(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Process Button */}
                <button
                  type="button"
                  disabled={processing}
                  onClick={handleProcess}
                  className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Optimizing to &le;{targetKb}KB...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Compress Image to Under {targetKb} KB</span>
                    </>
                  )}
                </button>
              </div>

              {/* Specs Validation Badges (if result ready) */}
              {result && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 bg-white rounded-xl border border-surface-darker text-center">
                    <span className="text-[10px] text-text-main/50 uppercase font-bold block">Size Cap</span>
                    <span className="text-xs font-black text-emerald-600">&le; {targetKb} KB</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-surface-darker text-center">
                    <span className="text-[10px] text-text-main/50 uppercase font-bold block">Resolution</span>
                    <span className="text-xs font-black text-text-main font-mono">{result.widthPx}x{result.heightPx}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-surface-darker text-center">
                    <span className="text-[10px] text-text-main/50 uppercase font-bold block">Density</span>
                    <span className="text-xs font-black text-text-main font-mono">{result.dpi} DPI</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-surface-darker text-center">
                    <span className="text-[10px] text-text-main/50 uppercase font-bold block">Saved</span>
                    <span className="text-xs font-black text-primary font-mono">-{reductionPercent}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Live Output Studio & Actions (6 cols, sticky on desktop) */}
            <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
              {result ? (
                <div className="p-5 rounded-3xl bg-surface/50 border-2 border-emerald-500/40 shadow-card space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-surface-darker">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-xs font-black text-text-main block">Compression Verified</span>
                        <span className="text-[11px] text-text-main/60 block">
                          Target: &le;{targetKb} KB • {reductionPercent}% reduction
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-text-main/50 uppercase font-bold block">Output</span>
                      <span className="text-base font-black text-primary font-mono">{result.sizeKb} KB</span>
                    </div>
                  </div>

                  {/* Visual Preview */}
                  <div className="p-3 bg-white rounded-2xl border border-surface-darker space-y-2 text-center relative">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider px-1">
                      <span className="text-primary font-black flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Live Result ({result.sizeKb} KB)
                      </span>
                      <span className="text-text-main/50 font-mono">
                        {result.widthPx}x{result.heightPx}px @ {result.dpi}DPI
                      </span>
                    </div>
                    <div
                      onMouseEnter={() => setIsHoverZoom(true)}
                      onMouseLeave={() => setIsHoverZoom(false)}
                      className="h-52 flex items-center justify-center bg-surface/30 rounded-xl overflow-hidden p-2 relative group cursor-zoom-in"
                    >
                      <img
                        src={result.dataUrl}
                        alt="Compressed output"
                        className={cn(
                          'max-h-full max-w-full object-contain transition-transform duration-200',
                          isHoverZoom && 'scale-150'
                        )}
                      />
                      {!isHoverZoom && (
                        <span className="absolute bottom-2 right-2 p-1 rounded-lg bg-white/80 backdrop-blur-xs text-[10px] font-semibold text-text-main/70 flex items-center gap-1">
                          <ZoomIn className="w-3 h-3 text-primary" /> Hover Zoom
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Compressed Image ({result.sizeKb} KB)</span>
                    </button>

                    <WhatsAppShare
                      message={`I just compressed an image to exactly ${result.sizeKb}KB using Kagazo's free online compressor! Check it out:`}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-surface/30 border-2 border-dashed border-surface-darker text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-primary/50 mx-auto animate-pulse" />
                  <span className="text-xs font-bold text-text-main block">Ready to Compress</span>
                  <span className="text-[11px] text-text-main/60 block">
                    Choose target file size on the left and click compress to inspect the live preview here.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ad Slot */}
      <div className="pt-2">
        <AdSlot slot="post_download" />
      </div>
    </div>
  );
}
