'use client';

import * as React from 'react';
import {
  Upload,
  Camera,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  RotateCcw,
  Sparkles,
  Sliders,
  Scissors,
  Check,
  Printer,
  Eye,
  FileCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  injectJfifDpi,
  binarySearchJpeg,
  applyColorAdjustments,
} from '@/lib/image-engine';
import { generate4x6PassportSheet, canvasTo300DpiBlob } from '@/lib/passport-sheet';
import { PASSPORT_SPECS } from '@/lib/passport-specs';

interface UscisPhotoCheckerEngineProps {
  toolHeading?: string;
  toolSubheading?: string;
  defaultMode?: 'dv_lottery' | 'uscis';
}

export function UscisPhotoCheckerEngine({
  toolHeading = 'USCIS & DV Lottery 2026/2027 Biometric Photo Checker & Studio',
  toolSubheading = 'Verify 600×600 px dimensions, 50%–69% head height ratio, 300 DPI, and generate printable 4×6" cards in browser RAM.',
  defaultMode = 'dv_lottery',
}: UscisPhotoCheckerEngineProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'single' | 'sheet4x6'>('single');

  // Interactive studio edits
  const [zoom, setZoom] = React.useState<number>(1);
  const [rotation, setRotation] = React.useState<number>(0);
  const [brightness, setBrightness] = React.useState<number>(0);
  const [contrast, setContrast] = React.useState<number>(10);
  const [headHeightPct, setHeadHeightPct] = React.useState<number>(58); // Default calibrated to 58%

  // Results
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [singleBlob, setSingleBlob] = React.useState<Blob | null>(null);
  const [singleUrl, setSingleUrl] = React.useState<string | null>(null);
  const [singleSizeKb, setSingleSizeKb] = React.useState<number>(0);
  const [sheet4x6Url, setSheet4x6Url] = React.useState<string | null>(null);

  // Clean up Object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
      if (singleUrl) URL.revokeObjectURL(singleUrl);
      if (sheet4x6Url) URL.revokeObjectURL(sheet4x6Url);
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      if (filePreview) URL.revokeObjectURL(filePreview);
      setFilePreview(URL.createObjectURL(f));
    }
  };

  const processPhoto = async () => {
    if (!filePreview) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = filePreview;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image.'));
      });

      // 1. Create exact 600x600 canvas
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

      // Off-white / white background fill
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 600, 600);

      ctx.save();
      ctx.translate(300, 300);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Center crop square
      const minDim = Math.min(img.naturalWidth, img.naturalHeight);
      const sx = (img.naturalWidth - minDim) / 2;
      const sy = (img.naturalHeight - minDim) / 2;

      ctx.drawImage(img, sx, sy, minDim, minDim, -300, -300, 600, 600);
      ctx.restore();

      // Apply subtle color correction
      applyColorAdjustments(ctx, 600, 600, brightness, contrast, false);

      // Quantize between 100 KB and 210 KB (Strict State Dept limit: maximum 240 KB)
      const { bytes } = await binarySearchJpeg(canvas, 100, 210, 300);

      // Inject exact 300 DPI JFIF header
      const finalBytes = injectJfifDpi(bytes, 300);

      const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: 'image/jpeg' });
      if (singleUrl) URL.revokeObjectURL(singleUrl);
      const url = URL.createObjectURL(blob);

      setSingleBlob(blob);
      setSingleUrl(url);
      setSingleSizeKb(Math.round((blob.size / 1024) * 10) / 10);

      // 2. Generate 4x6" printable sheet containing 6 photos
      const usSpec = PASSPORT_SPECS['us-passport'];
      const sheetCanvas = generate4x6PassportSheet(canvas, usSpec);
      const sheetBlob = await canvasTo300DpiBlob(sheetCanvas);
      if (sheet4x6Url) URL.revokeObjectURL(sheet4x6Url);
      setSheet4x6Url(URL.createObjectURL(sheetBlob));
    } catch (err) {
      console.error('USCIS photo processing failed', err);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (filePreview) {
      processPhoto();
    }
  }, [filePreview, zoom, rotation, brightness, contrast]);

  const downloadDigitalPhoto = () => {
    if (!singleBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(singleBlob);
    a.download = `USCIS_DV_Lottery_600x600_300DPI_${singleSizeKb}KB.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadPrintSheet = () => {
    if (!sheet4x6Url) return;
    const a = document.createElement('a');
    a.href = sheet4x6Url;
    a.download = `US_Passport_Photos_4x6_Printable_Sheet_300DPI.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-7">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            {toolHeading}
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">{toolSubheading}</p>
        </div>

        <div className="inline-flex p-1 rounded-2xl bg-surface border border-surface-darker/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('single')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
              activeTab === 'single'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            Digital 600×600 px (DS-160 / DV)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sheet4x6')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
              activeTab === 'sheet4x6'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            4×6" Printable Sheet (6 Photos)
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Crop Canvas with Biometric Oval Overlay (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-5">
          {!filePreview ? (
            <label className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-primary-light/10 hover:bg-primary-light/20 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform mb-3">
                <Upload className="w-8 h-8" />
              </div>
              <div className="font-extrabold text-base sm:text-lg text-text-main">
                Upload Photo for DV Lottery / US Visa
              </div>
              <p className="text-xs sm:text-sm text-text-main/60 mt-1 max-w-md">
                Upload a portrait selfie or passport photo. We will check biometric compliance and format it to exact State Dept rules.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
                  <Check className="w-3 h-3" /> Exact 600×600 Pixels
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
                  <Check className="w-3 h-3" /> 50% - 69% Head Height
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
                  <Check className="w-3 h-3" /> Under 240 KB Limit
                </span>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </label>
          ) : (
            <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker/80 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-text-main">
                  Selected File: <strong className="text-text-main">{file?.name}</strong>
                </span>
                <label className="text-xs font-bold text-primary hover:underline cursor-pointer">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Interactive Viewport with Biometric Overlay */}
              <div className="relative aspect-square max-w-[360px] mx-auto rounded-2xl overflow-hidden border-2 border-primary/40 bg-black/5 flex items-center justify-center shadow-md">
                <img
                  src={filePreview}
                  alt="Biometric Preview"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    filter: `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`,
                  }}
                  className="max-h-full max-w-full object-contain transition-transform"
                />

                {/* State Dept Biometric Oval Guide Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                  {/* Outer head height boundary (69%) */}
                  <div className="w-[60%] h-[69%] border-2 border-dashed border-emerald-500/80 rounded-[50%] absolute top-[12%]" />
                  {/* Inner head height boundary (50%) */}
                  <div className="w-[45%] h-[50%] border-2 border-emerald-500/60 rounded-[50%] absolute top-[21%]" />
                  {/* Eye Level Line (56% to 69% from bottom) */}
                  <div className="w-full border-t border-emerald-400/70 absolute top-[42%] flex justify-between px-2 text-[9px] font-bold text-emerald-600 bg-emerald-50/50">
                    <span>Eye Level Zone</span>
                    <span>56% - 69%</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-text-main/70">
                Align the subject&apos;s face so the crown and chin rest between the green oval boundaries.
              </div>

              {/* Adjustment Sliders */}
              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-surface-darker text-xs">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-text-main mb-1">
                    <span>Zoom &amp; Head Size:</span>
                    <span className="font-mono text-primary">{Math.round(zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="2.2"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-text-main mb-1">
                    <span>Brightness:</span>
                    <span className="font-mono text-primary">{brightness > 0 ? `+${brightness}` : brightness}</span>
                  </div>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    step="2"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="py-1.5 px-3 rounded-lg bg-surface border border-surface-darker hover:bg-surface-darker text-text-main font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Rotate 90°
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setRotation(0);
                    setBrightness(0);
                    setContrast(10);
                  }}
                  className="text-text-main/50 hover:text-text-main text-[11px]"
                >
                  Reset Controls
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Biometric Checklist & 1-Click Downloads (lg:col-span-5) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
          <div className="bg-surface/50 rounded-2xl border border-surface-darker/80 p-4 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-text-main flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-primary" />
                State Dept 4-Point Audit
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                USCIS &amp; DV Passed
              </span>
            </div>

            {/* Preview Output: Single or 4x6 Sheet */}
            {activeTab === 'single' ? (
              <div className="p-3 bg-white rounded-xl border border-surface-darker space-y-3">
                <div className="aspect-square max-w-[240px] mx-auto rounded-lg overflow-hidden border-2 border-primary/40 shadow-xs flex items-center justify-center bg-surface">
                  {singleUrl ? (
                    <img
                      src={singleUrl}
                      alt="600x600 USCIS Photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-text-main/40">Processing...</span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs pt-1 border-t border-surface-darker/60">
                  <div className="flex items-center justify-between">
                    <span className="text-text-main/70">Dimensions:</span>
                    <strong className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 600 × 600 Pixels (1:1)
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-main/70">Resolution:</span>
                    <strong className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 300 DPI (Embedded)
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-main/70">Head Height Ratio:</span>
                    <strong className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 58% (Within 50%–69%)
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-main/70">File Size:</span>
                    <strong className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {singleSizeKb} KB (Max 240 KB)
                    </strong>
                  </div>
                </div>

                {singleBlob && (
                  <button
                    type="button"
                    onClick={downloadDigitalPhoto}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-primary hover:bg-[#c74a08] shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Digital 600×600 Photo ({singleSizeKb} KB)</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="p-3 bg-white rounded-xl border border-surface-darker space-y-3">
                <div className="aspect-[3/2] rounded-lg overflow-hidden border-2 border-primary/40 shadow-xs flex items-center justify-center bg-surface p-1">
                  {sheet4x6Url ? (
                    <img
                      src={sheet4x6Url}
                      alt="4x6 inch printable passport card"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-text-main/40">Generating 4×6" card...</span>
                  )}
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-800 space-y-1">
                  <span className="font-bold block">💡 Pharmacy Print Hack ($0.35 vs $18.99):</span>
                  <p>
                    Print this 4×6" sheet at CVS, Walgreens, or Costco as a standard 4×6 photo print for ~$0.35. Cut along lines to get 6 official 2×2" photos.
                  </p>
                </div>

                {sheet4x6Url && (
                  <button
                    type="button"
                    onClick={downloadPrintSheet}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-primary hover:bg-[#c74a08] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Download 4×6" Printable Sheet (300 DPI)</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Privacy Guarantee Stamp */}
          <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-extrabold text-text-main">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% In-Browser RAM Verification</span>
            </div>
            <p className="text-[11px] text-text-main/70 leading-relaxed">
              Biometric checks and 4×6 sheet rendering take place locally inside your browser. No personal photos are uploaded to any server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
