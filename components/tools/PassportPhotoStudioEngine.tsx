'use client';

import * as React from 'react';
import {
  Upload,
  Camera,
  Sparkles,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Trash2,
  ChevronDown,
  Layers,
  FileCheck,
  Info,
  Sliders,
  Scissors,
  Globe,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PASSPORT_SPECS,
  ALL_PASSPORT_SPECS,
  PassportPhotoSpec,
  getPassportSpec,
} from '@/lib/passport-specs';
import {
  ImageStudioViewport,
  CropState,
  StudioEdits,
  AspectRatioPreset,
} from '@/components/tools/studio/ImageStudioViewport';
import {
  processImageClient,
  ProcessImageResult,
  injectJfifDpi,
} from '@/lib/image-engine';
import {
  generate4x6PassportSheet,
  generateA4PassportSheet,
  canvasTo300DpiBlob,
} from '@/lib/passport-sheet';
import { AdSlot } from '@/components/ads/AdSlot';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

export interface PassportPhotoStudioEngineProps {
  defaultCountryId?: string;
  toolHeading?: string;
  toolSubheading?: string;
}

export function PassportPhotoStudioEngine({
  defaultCountryId = 'us-passport',
  toolHeading,
  toolSubheading,
}: PassportPhotoStudioEngineProps) {
  const [selectedCountryId, setSelectedCountryId] = React.useState<string>(defaultCountryId);
  const spec: PassportPhotoSpec = getPassportSpec(selectedCountryId) || PASSPORT_SPECS['us-passport'];

  const [file, setFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [activeOutputTab, setActiveOutputTab] = React.useState<'single' | '4x6' | 'a4'>('single');

  // Studio edits state
  const [cropState, setCropState] = React.useState<CropState | null>(null);
  const [rotationDeg, setRotationDeg] = React.useState<number>(0);
  const [studioEdits, setStudioEdits] = React.useState<StudioEdits>({
    rotationDeg: 0,
    flipHorizontal: false,
    flipVertical: false,
    brightness: 0,
    contrast: 0,
    grayscale: false,
  });

  // Processing state
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [singleResult, setSingleResult] = React.useState<ProcessImageResult | null>(null);
  const [sheet4x6DataUrl, setSheet4x6DataUrl] = React.useState<string | null>(null);
  const [sheetA4DataUrl, setSheetA4DataUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Determine aspect ratio preset based on country spec
  const initialAspectRatioPreset: AspectRatioPreset = React.useMemo(() => {
    if (spec.widthMm === spec.heightMm) return '1:1';
    if (Math.abs(spec.widthMm / spec.heightMm - 35 / 45) < 0.05) return '3.5:4.5';
    return 'free';
  }, [spec]);

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPEG, PNG, WebP).');
        return;
      }
      setFile(selected);
      setError(null);
      setSingleResult(null);
      setSheet4x6DataUrl(null);
      setSheetA4DataUrl(null);

      const url = URL.createObjectURL(selected);
      setFilePreview(url);
    }
  };

  const handleCropChange = (crop: CropState, totalRotation: number, edits: StudioEdits) => {
    setCropState(crop);
    setRotationDeg(totalRotation);
    setStudioEdits(edits);
  };

  // Generate compliant photo and sheets
  const handleGenerateBiometricPhoto = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Process single biometric photo
      const res = await processImageClient(file, {
        targetWidthPx: spec.widthPx300Dpi,
        targetHeightPx: spec.heightPx300Dpi,
        targetMinKb: spec.minFileKb,
        targetMaxKb: spec.maxFileKb,
        dpi: spec.dpi,
        cropRect: cropState || undefined,
        rotationDeg: rotationDeg,
        flipHorizontal: studioEdits.flipHorizontal,
        flipVertical: studioEdits.flipVertical,
        brightness: studioEdits.brightness,
        contrast: studioEdits.contrast,
        grayscale: studioEdits.grayscale,
      });

      setSingleResult(res);

      // 2. Load result onto canvas to generate 4x6 and A4 sheets
      const singleImg = new Image();
      await new Promise<void>((resolve, reject) => {
        singleImg.onload = () => resolve();
        singleImg.onerror = () => reject(new Error('Failed to render processed photo onto sheet canvas.'));
        singleImg.src = res.dataUrl;
      });

      const singleCanvas = document.createElement('canvas');
      singleCanvas.width = res.widthPx;
      singleCanvas.height = res.heightPx;
      const sCtx = singleCanvas.getContext('2d')!;
      sCtx.drawImage(singleImg, 0, 0);

      // Generate 4x6 Sheet Canvas
      const sheet4x6Canvas = generate4x6PassportSheet(singleCanvas, spec, true);
      setSheet4x6DataUrl(sheet4x6Canvas.toDataURL('image/jpeg', 0.95));

      // Generate A4 Sheet Canvas
      const sheetA4Canvas = generateA4PassportSheet(singleCanvas, spec, true);
      setSheetA4DataUrl(sheetA4Canvas.toDataURL('image/jpeg', 0.95));
    } catch (err: any) {
      setError(err?.message || 'Failed to process biometric passport photo. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-generate on first upload or country change if crop is ready
  React.useEffect(() => {
    if (filePreview) {
      handleGenerateBiometricPhoto();
    }
  }, [filePreview, selectedCountryId]);

  // Download Single Photo
  const handleDownloadSingle = () => {
    if (!singleResult) return;
    const a = document.createElement('a');
    a.href = singleResult.dataUrl;
    const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, '') : 'passport_photo';
    a.download = `${baseName}_${spec.countryCode}_${spec.widthMm}x${spec.heightMm}mm_300dpi.jpg`;
    a.click();
  };

  // Download 4x6 Sheet
  const handleDownload4x6 = () => {
    if (!sheet4x6DataUrl) return;
    const a = document.createElement('a');
    a.href = sheet4x6DataUrl;
    a.download = `4x6_passport_sheet_${spec.countryCode}_${spec.id}.jpg`;
    a.click();
  };

  // Download A4 Sheet
  const handleDownloadA4 = () => {
    if (!sheetA4DataUrl) return;
    const a = document.createElement('a');
    a.href = sheetA4DataUrl;
    a.download = `A4_passport_sheet_${spec.countryCode}_${spec.id}.jpg`;
    a.click();
  };

  // Direct Print
  const handlePrintSheet = () => {
    const targetUrl = activeOutputTab === 'a4' ? sheetA4DataUrl : sheet4x6DataUrl;
    if (!targetUrl) return;

    const printWin = window.open('', '_blank');
    if (!printWin) return;

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${spec.country} Passport Photo Sheet - Print</title>
          <style>
            @page {
              size: ${activeOutputTab === 'a4' ? 'A4 portrait' : '4in 6in landscape'};
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #fff;
            }
            img {
              max-width: 100%;
              height: auto;
              display: block;
            }
          </style>
        </head>
        <body onload="window.print();window.close();">
          <img src="${targetUrl}" alt="Print Sheet" />
        </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-8 space-y-7">
      {/* Country Specification Selector Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface/60 border border-surface-darker space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary" />
            Select Destination Country &amp; Document Format
          </span>
          <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full self-start sm:self-auto">
            {spec.authorityPortal}
          </span>
        </div>

        {/* Country Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {ALL_PASSPORT_SPECS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedCountryId(s.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                selectedCountryId === s.id
                  ? 'bg-primary text-white shadow-2xs'
                  : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
              )}
            >
              <span>{s.flagEmoji}</span>
              <span>{s.country}</span>
              <span className="text-[10px] opacity-80">({s.widthMm}×{s.heightMm}mm)</span>
            </button>
          ))}
        </div>

        {/* Selected Country Active Rule Banner */}
        <div className="mt-2 p-3 rounded-xl bg-white border border-surface-darker flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-text-main">
            <span className="text-base">{spec.flagEmoji}</span>
            <span>{spec.title}</span>
            <span className="text-text-main/40 font-normal">|</span>
            <span className="text-text-main/70 font-mono text-[11px]">
              {spec.widthPx300Dpi}×{spec.heightPx300Dpi}px @ 300 DPI
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-bold">
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Head: {spec.headHeightPercentMin}%–{spec.headHeightPercentMax}%
            </span>
            <span className="text-primary bg-primary-light px-2 py-0.5 rounded-md border border-primary/20">
              Target: {spec.minFileKb}–{spec.maxFileKb} KB
            </span>
          </div>
        </div>
      </div>

      {/* Upload Zone (shown when no image selected) */}
      {!file && (
        <div className="border-2 border-dashed border-primary/40 hover:border-primary rounded-3xl p-8 sm:p-12 text-center transition-all bg-surface/30 hover:bg-surface/60 group">
          <input
            type="file"
            id="passport-photo-upload"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            className="sr-only"
          />
          <label htmlFor="passport-photo-upload" className="cursor-pointer block space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary mx-auto flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <Camera className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black text-text-main">
                {toolHeading || `Create Official ${spec.country} Passport Photo`}
              </h3>
              <p className="text-xs sm:text-sm text-text-main/70 max-w-md mx-auto">
                {toolSubheading ||
                  'Upload your camera selfie or scan. Our studio automatically crops to exact biometric standards at 300 DPI.'}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-hover transition-all">
              <Upload className="w-4 h-4" />
              <span>Upload Photo (Free)</span>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-text-main/50 pt-2">
              <span>✓ 100% In-Browser Privacy</span>
              <span>•</span>
              <span>✓ ICAO 9303 Compliant</span>
              <span>•</span>
              <span>✓ Printable 4×6" Sheet</span>
            </div>
          </label>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Interactive Studio Workspace (shown when photo is loaded) */}
      {file && filePreview && (
        <div className="space-y-6">
          {/* Top Bar: Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-darker">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-extrabold text-text-main">
                Biometric Studio Active: {spec.country} ({spec.widthMm}×{spec.heightMm} mm)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="passport-photo-replace"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-xs font-bold text-primary transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
                <input
                  id="passport-photo-replace"
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
                  setSingleResult(null);
                  setSheet4x6DataUrl(null);
                  setSheetA4DataUrl(null);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Side-by-Side 2-Column Desktop Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Interactive Viewport & Rules (7 cols on lg / xl) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 bg-surface/40 rounded-3xl border border-surface-darker space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-primary" />
                    Align Biometric Face Oval &amp; Crop
                  </span>
                  <span className="text-[11px] text-text-main/60">
                    Eyes on guide line, chin inside oval
                  </span>
                </div>

                <ImageStudioViewport
                  imageSrc={filePreview}
                  defaultAspectRatio={initialAspectRatioPreset}
                  overlayType="passport"
                  onCropChange={handleCropChange}
                />

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleGenerateBiometricPhoto}
                    disabled={isProcessing}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary-hover disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isProcessing ? 'Updating Standards...' : 'Apply Alignment & Update Output'}</span>
                  </button>
                </div>
              </div>

              {/* Compact Official Compliance Card */}
              <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-text-main">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Rules: {spec.authorityName}</span>
                  </span>
                  <span className="text-primary font-mono text-[11px]">{spec.widthPx300Dpi}×{spec.heightPx300Dpi}px @ 300 DPI</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-surface/50 border border-surface-darker">
                    <span className="text-[10px] text-text-main/50 uppercase font-bold block">Size</span>
                    <span className="font-bold text-text-main text-xs block">{spec.widthMm}×{spec.heightMm}mm</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface/50 border border-surface-darker">
                    <span className="text-[10px] text-text-main/50 uppercase font-bold block">Head Ratio</span>
                    <span className="font-bold text-emerald-700 text-xs block">{spec.headHeightPercentMin}–{spec.headHeightPercentMax}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface/50 border border-surface-darker">
                    <span className="text-[10px] text-text-main/50 uppercase font-bold block">Background</span>
                    <span className="font-bold text-text-main text-xs truncate block">{spec.backgroundColor}</span>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-text-main/70 pt-1 border-t border-surface-darker/60">
                  {spec.guidelines.slice(0, 4).map((g, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Live Output Studio (5 cols, sticky on lg / xl) */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              {singleResult ? (
                <div className="p-5 rounded-3xl bg-surface/50 border-2 border-primary/40 shadow-card space-y-4 animate-in fade-in duration-200">
                  {/* Output Tab Switcher */}
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-surface-darker">
                    <span className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-primary" />
                      Live Result
                    </span>
                    <span className="text-xs font-mono font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
                      {singleResult.sizeKb} KB • 300 DPI
                    </span>
                  </div>

                  {/* Tab Switcher Pills */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-surface-darker shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setActiveOutputTab('single')}
                      className={cn(
                        'flex-1 py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all',
                        activeOutputTab === 'single'
                          ? 'bg-primary text-white shadow-2xs'
                          : 'text-text-main/70 hover:text-text-main'
                      )}
                    >
                      Single Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveOutputTab('4x6')}
                      className={cn(
                        'flex-1 py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1',
                        activeOutputTab === '4x6'
                          ? 'bg-primary text-white shadow-2xs'
                          : 'text-text-main/70 hover:text-text-main'
                      )}
                    >
                      <Scissors className="w-3 h-3" />
                      <span>4×6" Sheet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveOutputTab('a4')}
                      className={cn(
                        'flex-1 py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all',
                        activeOutputTab === 'a4'
                          ? 'bg-primary text-white shadow-2xs'
                          : 'text-text-main/70 hover:text-text-main'
                      )}
                    >
                      A4 Sheet
                    </button>
                  </div>

                  {/* Preview Frame */}
                  <div className="bg-white rounded-2xl border border-surface-darker p-3 text-center space-y-3">
                    {activeOutputTab === 'single' && (
                      <div className="h-64 flex items-center justify-center bg-surface/30 rounded-xl overflow-hidden p-2">
                        <img
                          src={singleResult.dataUrl}
                          alt="Live Biometric Photo Output"
                          className="max-h-full max-w-full object-contain shadow-xs rounded-sm"
                        />
                      </div>
                    )}

                    {activeOutputTab === '4x6' && sheet4x6DataUrl && (
                      <div className="space-y-2">
                        <div className="h-64 flex items-center justify-center bg-surface/30 rounded-xl overflow-hidden p-2">
                          <img
                            src={sheet4x6DataUrl}
                            alt="Live 4x6 Sheet Output"
                            className="max-h-full max-w-full object-contain shadow-xs border border-surface-darker"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block">
                          Print for ~$0.35 / ₹5–₹10 at CVS/Walgreens/Lab
                        </span>
                      </div>
                    )}

                    {activeOutputTab === 'a4' && sheetA4DataUrl && (
                      <div className="h-64 flex items-center justify-center bg-surface/30 rounded-xl overflow-hidden p-2">
                        <img
                          src={sheetA4DataUrl}
                          alt="Live A4 Sheet Output"
                          className="max-h-full max-w-full object-contain shadow-xs border border-surface-darker"
                        />
                      </div>
                    )}

                    {/* Download & Print Actions */}
                    <div className="space-y-2 pt-1">
                      {activeOutputTab === 'single' ? (
                        <button
                          type="button"
                          onClick={handleDownloadSingle}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary-hover transition-all cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Biometric JPEG ({singleResult.sizeKb} KB)</span>
                        </button>
                      ) : activeOutputTab === '4x6' ? (
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={handleDownload4x6}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary-hover transition-all cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download 4×6" Print Sheet (300 DPI)</span>
                          </button>
                          <button
                            type="button"
                            onClick={handlePrintSheet}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-surface-darker text-text-main hover:bg-surface font-bold text-xs shadow-2xs transition-all cursor-pointer"
                          >
                            <Printer className="w-4 h-4 text-primary" />
                            <span>Print Directly (100% Scale)</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={handleDownloadA4}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary-hover transition-all cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download A4 Sheet (32 Copies)</span>
                          </button>
                          <button
                            type="button"
                            onClick={handlePrintSheet}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-surface-darker text-text-main hover:bg-surface font-bold text-xs shadow-2xs transition-all cursor-pointer"
                          >
                            <Printer className="w-4 h-4 text-primary" />
                            <span>Print A4 Sheet</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Share */}
                  <WhatsAppShare
                    message={`I created official ${spec.country} passport photos with a 4x6 print sheet for free on Kagazo! https://kagazo.in/tools/${spec.id}`}
                  />
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-surface/30 border-2 border-dashed border-surface-darker text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-primary/50 mx-auto animate-pulse" />
                  <span className="text-xs font-bold text-text-main block">Generating Biometric Output...</span>
                  <span className="text-[11px] text-text-main/60 block">
                    Your live compliant photo and 4×6 print sheet will appear right here.
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
