'use client';

import * as React from 'react';
import {
  Upload,
  Camera,
  PenTool,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  Zap,
  Sliders,
  ShieldCheck,
  FileArchive,
  Car,
  FileCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  injectJfifDpi,
  binarySearchJpeg,
  applyColorAdjustments,
  applyOtsuSignatureInk,
  padJpegToMinBytes,
} from '@/lib/image-engine';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

type SarathiMode = 'kit' | 'photo' | 'signature';

export function SarathiResizerEngine() {
  const [activeMode, setActiveMode] = React.useState<SarathiMode>('kit');

  // Photo state (35x45 mm, 413x531 px @ 300 DPI, 20-50 KB)
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [photoResultBlob, setPhotoResultBlob] = React.useState<Blob | null>(null);
  const [photoResultUrl, setPhotoResultUrl] = React.useState<string | null>(null);
  const [photoResultSizeKb, setPhotoResultSizeKb] = React.useState<number>(0);
  const [photoZoom, setPhotoZoom] = React.useState<number>(1);
  const [photoRotation, setPhotoRotation] = React.useState<number>(0);
  const [photoBrightness, setPhotoBrightness] = React.useState<number>(0);
  const [photoContrast, setPhotoContrast] = React.useState<number>(10);

  // Signature state (20x50 mm, 591x236 px @ 300 DPI, 10-20 KB)
  const [sigFile, setSigFile] = React.useState<File | null>(null);
  const [sigPreview, setSigPreview] = React.useState<string | null>(null);
  const [sigResultBlob, setSigResultBlob] = React.useState<Blob | null>(null);
  const [sigResultUrl, setSigResultUrl] = React.useState<string | null>(null);
  const [sigResultSizeKb, setSigResultSizeKb] = React.useState<number>(0);
  const [sigZoom, setSigZoom] = React.useState<number>(1);
  const [sigRotation, setSigRotation] = React.useState<number>(0);
  const [sigInkBoost, setSigInkBoost] = React.useState<boolean>(true);
  const [sigDensity, setSigDensity] = React.useState<number>(65);

  const [isZipping, setIsZipping] = React.useState<boolean>(false);

  // Clean up object URLs
  React.useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      if (photoResultUrl) URL.revokeObjectURL(photoResultUrl);
      if (sigPreview) URL.revokeObjectURL(sigPreview);
      if (sigResultUrl) URL.revokeObjectURL(sigResultUrl);
    };
  }, []);

  // Process Sarathi Photo (35x45 mm => 413x531 px @ 300 DPI, 20-50 KB)
  const processPhoto = async () => {
    if (!photoPreview) return;

    try {
      const img = new Image();
      img.src = photoPreview;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = 413;
      canvas.height = 531;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 413, 531);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((photoRotation * Math.PI) / 180);
      ctx.scale(photoZoom, photoZoom);

      const targetAspect = 413 / 531;
      const imgAspect = img.naturalWidth / img.naturalHeight;

      let drawW = 413;
      let drawH = 531;
      if (imgAspect > targetAspect) {
        drawW = drawH * imgAspect;
      } else {
        drawH = drawW / imgAspect;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      applyColorAdjustments(ctx, 413, 531, photoBrightness, photoContrast, false);

      // Quantize to between 25 KB and 45 KB (strict Sarathi limit: 20–50 KB)
      const { bytes } = await binarySearchJpeg(canvas, 25, 48, 300);
      let finalBytes = injectJfifDpi(bytes, 300);

      // Ensure min 21 KB
      if (finalBytes.length < 21 * 1024) {
        finalBytes = padJpegToMinBytes(finalBytes, 25 * 1024);
      }

      const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: 'image/jpeg' });
      if (photoResultUrl) URL.revokeObjectURL(photoResultUrl);
      const url = URL.createObjectURL(blob);

      setPhotoResultBlob(blob);
      setPhotoResultUrl(url);
      setPhotoResultSizeKb(Math.round((blob.size / 1024) * 10) / 10);
    } catch (err) {
      console.error('Sarathi photo process failed', err);
    }
  };

  // Process Sarathi Signature (20x50 mm => 591x236 px @ 300 DPI, 10-20 KB)
  const processSignature = async () => {
    if (!sigPreview) return;

    try {
      const img = new Image();
      img.src = sigPreview;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load signature.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = 591;
      canvas.height = 236;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 591, 236);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((sigRotation * Math.PI) / 180);
      ctx.scale(sigZoom, sigZoom);

      const targetAspect = 591 / 236;
      const imgAspect = img.naturalWidth / img.naturalHeight;

      let drawW = 550;
      let drawH = drawW / imgAspect;
      if (drawH > 210) {
        drawH = 210;
        drawW = drawH * imgAspect;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      if (sigInkBoost) {
        applyOtsuSignatureInk(ctx, 591, 236, sigDensity);
      } else {
        applyColorAdjustments(ctx, 591, 236, 10, 40, true);
      }

      // Quantize to strictly 12 KB to 19 KB (Sarathi limit: 10–20 KB)
      const { bytes } = await binarySearchJpeg(canvas, 12, 19, 300);
      let finalBytes = injectJfifDpi(bytes, 300);

      // Ensure min 11 KB
      if (finalBytes.length < 11 * 1024) {
        finalBytes = padJpegToMinBytes(finalBytes, 14 * 1024);
      }

      const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: 'image/jpeg' });
      if (sigResultUrl) URL.revokeObjectURL(sigResultUrl);
      const url = URL.createObjectURL(blob);

      setSigResultBlob(blob);
      setSigResultUrl(url);
      setSigResultSizeKb(Math.round((blob.size / 1024) * 10) / 10);
    } catch (err) {
      console.error('Sarathi signature process failed', err);
    }
  };

  React.useEffect(() => {
    if (photoPreview) processPhoto();
  }, [photoPreview, photoZoom, photoRotation, photoBrightness, photoContrast]);

  React.useEffect(() => {
    if (sigPreview) processSignature();
  }, [sigPreview, sigZoom, sigRotation, sigInkBoost, sigDensity]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setPhotoFile(f);
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(URL.createObjectURL(f));
    }
  };

  const handleSigUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setSigFile(f);
      if (sigPreview) URL.revokeObjectURL(sigPreview);
      setSigPreview(URL.createObjectURL(f));
    }
  };

  const downloadPhoto = () => {
    if (!photoResultBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(photoResultBlob);
    a.download = `SARATHI_DL_PHOTO_35x45mm_${photoResultSizeKb}KB.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadSignature = () => {
    if (!sigResultBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(sigResultBlob);
    a.download = `SARATHI_DL_SIGNATURE_20x50mm_${sigResultSizeKb}KB.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadCompleteKit = async () => {
    if (!photoResultBlob || !sigResultBlob || isZipping) return;
    setIsZipping(true);

    try {
      const JSZipModule = await import('jszip');
      const JSZip = JSZipModule.default;
      const zip = new JSZip();

      zip.file('SARATHI_PHOTO_35x45mm.jpg', photoResultBlob);
      zip.file('SARATHI_SIGNATURE_20x50mm.jpg', sigResultBlob);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipBlob);
      a.download = `SARATHI_PARIVAHAN_COMPLETE_KIT_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('ZIP creation failed', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-7">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            Sarathi Parivahan Driving Licence Resizer Studio
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Photo (35×45 mm, 20–50 KB) &amp; Signature (20×50 mm, 10–20 KB) formatted to Parivahan 4.0 standards.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-2xl bg-surface border border-surface-darker/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveMode('kit')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
              activeMode === 'kit'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            Complete Kit (Both)
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('photo')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
              activeMode === 'photo'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            Photo (35×45mm)
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('signature')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
              activeMode === 'signature'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            Signature (20×50mm)
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Uploads & Controls (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: PHOTO */}
          {(activeMode === 'kit' || activeMode === 'photo') && (
            <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" />
                  <span className="text-xs font-extrabold text-text-main uppercase tracking-wider">
                    1. Driving Licence Photo (35 × 45 mm)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md border border-primary/20">
                  Target: 25–48 KB
                </span>
              </div>

              {!photoPreview ? (
                <label className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-white hover:bg-primary-light/10 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-text-main">
                    Upload Applicant Photo
                  </span>
                  <span className="text-[11px] text-text-main/60 mt-0.5">
                    Recent passport photograph (JPG, PNG)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="sr-only"
                  />
                </label>
              ) : (
                <div className="space-y-3 bg-white p-4 rounded-xl border border-surface-darker">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-text-main truncate max-w-[200px]">
                      {photoFile?.name}
                    </span>
                    <label className="text-xs font-bold text-primary hover:underline cursor-pointer">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="font-bold text-text-main/70 text-[11px] block">
                        Zoom &amp; Fit:
                      </span>
                      <input
                        type="range"
                        min="0.8"
                        max="2"
                        step="0.05"
                        value={photoZoom}
                        onChange={(e) => setPhotoZoom(Number(e.target.value))}
                        className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-text-main/70 text-[11px] block">
                        Brightness:
                      </span>
                      <input
                        type="range"
                        min="-30"
                        max="30"
                        step="2"
                        value={photoBrightness}
                        onChange={(e) => setPhotoBrightness(Number(e.target.value))}
                        className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setPhotoRotation((r) => (r + 90) % 360)}
                      className="text-[11px] font-bold text-text-main/70 hover:text-text-main flex items-center gap-1 bg-surface px-2.5 py-1 rounded-lg border border-surface-darker"
                    >
                      <RotateCcw className="w-3 h-3" /> Rotate 90°
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoZoom(1);
                        setPhotoRotation(0);
                        setPhotoBrightness(0);
                        setPhotoContrast(10);
                      }}
                      className="text-[11px] text-text-main/50 hover:text-text-main"
                    >
                      Reset Adjustments
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: SIGNATURE */}
          {(activeMode === 'kit' || activeMode === 'signature') && (
            <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-primary" />
                  <span className="text-xs font-extrabold text-text-main uppercase tracking-wider">
                    2. Driving Licence Signature (20 × 50 mm)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md border border-primary/20">
                  Target: 11–19 KB
                </span>
              </div>

              {!sigPreview ? (
                <label className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-white hover:bg-primary-light/10 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-text-main">
                    Upload Signature Photo
                  </span>
                  <span className="text-[11px] text-text-main/60 mt-0.5">
                    Dark black or blue ink on plain white paper
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSigUpload}
                    className="sr-only"
                  />
                </label>
              ) : (
                <div className="space-y-3 bg-white p-4 rounded-xl border border-surface-darker">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-text-main truncate max-w-[200px]">
                      {sigFile?.name}
                    </span>
                    <label className="text-xs font-bold text-primary hover:underline cursor-pointer">
                      Change Signature
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSigUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {/* B&W ink booster */}
                  <div className="p-3 bg-surface/60 rounded-xl border border-surface-darker/80 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-text-main">
                      <input
                        type="checkbox"
                        checked={sigInkBoost}
                        onChange={(e) => setSigInkBoost(e.target.checked)}
                        className="accent-primary rounded"
                      />
                      <span>B&amp;W Ink Clarity Booster (Removes Yellow Cast &amp; Shadows)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="font-bold text-text-main/70 text-[11px] block">
                        Signature Scale:
                      </span>
                      <input
                        type="range"
                        min="0.7"
                        max="1.8"
                        step="0.05"
                        value={sigZoom}
                        onChange={(e) => setSigZoom(Number(e.target.value))}
                        className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-text-main/70 text-[11px] block">Rotate:</span>
                      <button
                        type="button"
                        onClick={() => setSigRotation((r) => (r + 90) % 360)}
                        className="text-[11px] font-bold text-text-main/70 hover:text-text-main flex items-center gap-1 bg-surface px-2.5 py-1 rounded-lg border border-surface-darker w-full justify-center"
                      >
                        <RotateCcw className="w-3 h-3" /> Rotate 90°
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Live Sticky Compliance Radar (lg:col-span-5) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
          <div className="bg-surface/50 rounded-2xl border border-surface-darker/80 p-4 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-text-main flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Parivahan 4.0 Compliance
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                MoRTH Ready
              </span>
            </div>

            {/* Photo Output Preview */}
            {(activeMode === 'kit' || activeMode === 'photo') && (
              <div className="p-3 bg-white rounded-xl border border-surface-darker space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-text-main">Driving Licence Photo</span>
                  {photoResultBlob && (
                    <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {photoResultSizeKb} KB (Pass: 20–50 KB)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-[88px] h-[113px] bg-surface rounded-lg border-2 border-primary/40 overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                    {photoResultUrl ? (
                      <img
                        src={photoResultUrl}
                        alt="35x45mm Sarathi DL Photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-text-main/40 text-center px-1">
                        Upload photo
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 35 × 45 mm (413×531 px)
                    </div>
                    <div className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 300 DPI Embedded
                    </div>
                    <div className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 20 KB – 50 KB Compliant
                    </div>

                    {photoResultBlob && (
                      <button
                        type="button"
                        onClick={downloadPhoto}
                        className="mt-2 py-1.5 px-3 rounded-lg bg-primary hover:bg-[#c74a08] text-white text-[11px] font-extrabold flex items-center gap-1 transition-all"
                      >
                        <Download className="w-3 h-3" /> Download Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Signature Output Preview */}
            {(activeMode === 'kit' || activeMode === 'signature') && (
              <div className="p-3 bg-white rounded-xl border border-surface-darker space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-text-main">Driving Licence Signature</span>
                  {sigResultBlob && (
                    <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {sigResultSizeKb} KB (Pass: 10–20 KB)
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="w-full h-20 bg-white rounded-lg border-2 border-primary/40 overflow-hidden flex items-center justify-center shadow-2xs">
                    {sigResultUrl ? (
                      <img
                        src={sigResultUrl}
                        alt="20x50mm Sarathi DL Signature"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-text-main/40 text-center">
                        Upload signature
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> 20 × 50 mm @ 300 DPI
                      </div>
                      <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> 10 KB – 20 KB Compliant
                      </div>
                    </div>

                    {sigResultBlob && (
                      <button
                        type="button"
                        onClick={downloadSignature}
                        className="py-1.5 px-3 rounded-lg bg-primary hover:bg-[#c74a08] text-white text-[11px] font-extrabold flex items-center gap-1 transition-all"
                      >
                        <Download className="w-3 h-3" /> Download Signature
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Complete Kit 1-Click ZIP Download */}
            {activeMode === 'kit' && (
              <div className="pt-2 border-t border-surface-darker/60">
                <button
                  type="button"
                  onClick={downloadCompleteKit}
                  disabled={!photoResultBlob || !sigResultBlob || isZipping}
                  className={cn(
                    'w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all',
                    !photoResultBlob || !sigResultBlob || isZipping
                      ? 'bg-primary/40 cursor-not-allowed'
                      : 'bg-primary hover:bg-[#c74a08] active:scale-[0.99]'
                  )}
                >
                  {isZipping ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Building Sarathi Kit ZIP...</span>
                    </>
                  ) : (
                    <>
                      <FileArchive className="w-4 h-4" />
                      <span>Download Complete Sarathi Kit (Photo + Signature ZIP)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <WhatsAppShare
            message="Resize Driving Licence Photo (35x45mm, 20-50KB) & Signature (20x50mm, 10-20KB) for Sarathi Parivahan free on Kagazo: https://kagazo.in/tools/sarathi-driving-licence-photo-signature-resizer"
          />

          <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-extrabold text-text-main">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% In-Browser Privacy</span>
            </div>
            <p className="text-[11px] text-text-main/70 leading-relaxed">
              Processed directly in client-side RAM. No photo or signature assets are uploaded to any server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
