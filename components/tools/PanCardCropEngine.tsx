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
  Eye,
  RefreshCw,
  Crop,
  Layers,
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

type PanMode = 'photo' | 'signature' | 'kit';

export function PanCardCropEngine() {
  const [activeMode, setActiveMode] = React.useState<PanMode>('kit');

  // Photo state (213x213 @ 300 DPI, 10-30 KB)
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [photoResultBlob, setPhotoResultBlob] = React.useState<Blob | null>(null);
  const [photoResultUrl, setPhotoResultUrl] = React.useState<string | null>(null);
  const [photoResultSizeKb, setPhotoResultSizeKb] = React.useState<number>(0);
  const [photoZoom, setPhotoZoom] = React.useState<number>(1);
  const [photoRotation, setPhotoRotation] = React.useState<number>(0);
  const [photoBrightness, setPhotoBrightness] = React.useState<number>(0);
  const [photoContrast, setPhotoContrast] = React.useState<number>(10);
  const [isProcessingPhoto, setIsProcessingPhoto] = React.useState<boolean>(false);

  // Signature state (400x200 @ 600 DPI, 10-60 KB)
  const [sigFile, setSigFile] = React.useState<File | null>(null);
  const [sigPreview, setSigPreview] = React.useState<string | null>(null);
  const [sigResultBlob, setSigResultBlob] = React.useState<Blob | null>(null);
  const [sigResultUrl, setSigResultUrl] = React.useState<string | null>(null);
  const [sigResultSizeKb, setSigResultSizeKb] = React.useState<number>(0);
  const [sigZoom, setSigZoom] = React.useState<number>(1);
  const [sigRotation, setSigRotation] = React.useState<number>(0);
  const [sigInkBoost, setSigInkBoost] = React.useState<boolean>(true);
  const [sigDensity, setSigDensity] = React.useState<number>(65);
  const [isProcessingSig, setIsProcessingSig] = React.useState<boolean>(false);

  const [isZippingKit, setIsZippingKit] = React.useState<boolean>(false);

  // Clean up Object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      if (photoResultUrl) URL.revokeObjectURL(photoResultUrl);
      if (sigPreview) URL.revokeObjectURL(sigPreview);
      if (sigResultUrl) URL.revokeObjectURL(sigResultUrl);
    };
  }, []);

  // Process PAN Photo (213x213 @ 300 DPI < 30 KB)
  const processPanPhoto = async () => {
    if (!photoPreview) return;
    setIsProcessingPhoto(true);

    try {
      const img = new Image();
      img.src = photoPreview;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = 213;
      canvas.height = 213;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((photoRotation * Math.PI) / 180);
      ctx.scale(photoZoom, photoZoom);

      // Center crop square
      const minDim = Math.min(img.naturalWidth, img.naturalHeight);
      const sx = (img.naturalWidth - minDim) / 2;
      const sy = (img.naturalHeight - minDim) / 2;

      ctx.drawImage(img, sx, sy, minDim, minDim, -106.5, -106.5, 213, 213);
      ctx.restore();

      // Apply light contrast and brightness
      applyColorAdjustments(ctx, 213, 213, photoBrightness, photoContrast, false);

      // Quantize between 15 KB and 28 KB (strict ceiling < 30 KB)
      const { bytes } = await binarySearchJpeg(canvas, 18, 28, 300);

      // Ensure 300 DPI JFIF injection
      let finalBytes = injectJfifDpi(bytes, 300);

      // Ensure minimum 10 KB
      if (finalBytes.length < 10 * 1024) {
        finalBytes = padJpegToMinBytes(finalBytes, 15 * 1024);
      }

      const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: 'image/jpeg' });
      if (photoResultUrl) URL.revokeObjectURL(photoResultUrl);
      const url = URL.createObjectURL(blob);

      setPhotoResultBlob(blob);
      setPhotoResultUrl(url);
      setPhotoResultSizeKb(Math.round((blob.size / 1024) * 10) / 10);
    } catch (err) {
      console.error('Photo processing failed', err);
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  // Process PAN Signature (400x200 @ 600 DPI < 60 KB)
  const processPanSignature = async () => {
    if (!sigPreview) return;
    setIsProcessingSig(true);

    try {
      const img = new Image();
      img.src = sigPreview;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load signature.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

      // Background default pure white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 400, 200);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((sigRotation * Math.PI) / 180);
      ctx.scale(sigZoom, sigZoom);

      // Center aspect-fit 2:1
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const targetAspect = 400 / 200;

      let drawW = 380;
      let drawH = drawW / imgAspect;
      if (drawH > 180) {
        drawH = 180;
        drawW = drawH * imgAspect;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      // Apply B&W ink booster if toggled
      if (sigInkBoost) {
        applyOtsuSignatureInk(ctx, 400, 200, sigDensity);
      } else {
        applyColorAdjustments(ctx, 400, 200, 10, 40, true);
      }

      // Quantize between 20 KB and 55 KB (strictly < 60 KB)
      const { bytes } = await binarySearchJpeg(canvas, 25, 55, 600);

      // Inject 600 DPI JFIF header (NSDL/UTIITSL requirement)
      let finalBytes = injectJfifDpi(bytes, 600);

      // Guarantee minimum 10 KB
      if (finalBytes.length < 10 * 1024) {
        finalBytes = padJpegToMinBytes(finalBytes, 20 * 1024);
      }

      const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: 'image/jpeg' });
      if (sigResultUrl) URL.revokeObjectURL(sigResultUrl);
      const url = URL.createObjectURL(blob);

      setSigResultBlob(blob);
      setSigResultUrl(url);
      setSigResultSizeKb(Math.round((blob.size / 1024) * 10) / 10);
    } catch (err) {
      console.error('Signature processing failed', err);
    } finally {
      setIsProcessingSig(false);
    }
  };

  // Trigger processing whenever photo settings change
  React.useEffect(() => {
    if (photoPreview) {
      processPanPhoto();
    }
  }, [photoPreview, photoZoom, photoRotation, photoBrightness, photoContrast]);

  // Trigger processing whenever signature settings change
  React.useEffect(() => {
    if (sigPreview) {
      processPanSignature();
    }
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
    a.download = `PAN_PHOTO_213x213_300DPI_${photoResultSizeKb}KB.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadSignature = () => {
    if (!sigResultBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(sigResultBlob);
    a.download = `PAN_SIGNATURE_400x200_600DPI_${sigResultSizeKb}KB.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadCompleteKit = async () => {
    if (!photoResultBlob || !sigResultBlob || isZippingKit) return;
    setIsZippingKit(true);

    try {
      const JSZipModule = await import('jszip');
      const JSZip = JSZipModule.default;
      const zip = new JSZip();

      zip.file('PAN_PHOTO_213x213_300DPI.jpg', photoResultBlob);
      zip.file('PAN_SIGNATURE_400x200_600DPI.jpg', sigResultBlob);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipBlob);
      a.download = `PAN_CARD_COMPLETE_KIT_NSDL_UTIITSL_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to create complete PAN kit ZIP', err);
    } finally {
      setIsZippingKit(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-7">
      {/* Header & Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            NSDL &amp; UTIITSL PAN Card Resizer Studio
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Strict 213×213 px (300 DPI, &lt;30KB) photo and 400×200 px (600 DPI, &lt;60KB) signature formatting.
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
            Photo (213×213)
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
            Signature (400×200)
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Uploads & Fine Adjustment Sliders (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: PAN PHOTO */}
          {(activeMode === 'kit' || activeMode === 'photo') && (
            <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" />
                  <span className="text-xs font-extrabold text-text-main uppercase tracking-wider">
                    1. Passport Photo (213 × 213 px @ 300 DPI)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md border border-primary/20">
                  Target: 15–28 KB
                </span>
              </div>

              {!photoPreview ? (
                <label className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-white hover:bg-primary-light/10 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-text-main">
                    Upload Applicant Photograph
                  </span>
                  <span className="text-[11px] text-text-main/60 mt-0.5">
                    Phone selfie or studio scan (JPG, PNG, WebP)
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
                        min="-40"
                        max="40"
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

          {/* SECTION 2: PAN SIGNATURE */}
          {(activeMode === 'kit' || activeMode === 'signature') && (
            <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-primary" />
                  <span className="text-xs font-extrabold text-text-main uppercase tracking-wider">
                    2. Signature Scan (400 × 200 px @ 600 DPI)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md border border-primary/20">
                  Target: 25–55 KB
                </span>
              </div>

              {!sigPreview ? (
                <label className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-white hover:bg-primary-light/10 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-text-main">
                    Upload Signature Image
                  </span>
                  <span className="text-[11px] text-text-main/60 mt-0.5">
                    Phone photo of signature on white paper
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

                  {/* Ink Booster Controls */}
                  <div className="p-3 bg-surface/60 rounded-xl border border-surface-darker/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-text-main">
                        <input
                          type="checkbox"
                          checked={sigInkBoost}
                          onChange={(e) => setSigInkBoost(e.target.checked)}
                          className="accent-primary rounded"
                        />
                        <span>B&amp;W Ink Clarity Booster (Removes Paper Shadows)</span>
                      </label>
                    </div>

                    {sigInkBoost && (
                      <div className="pt-1 space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-text-main/70">
                          <span>Ink Darkness Density:</span>
                          <span className="font-mono font-bold text-primary">{sigDensity}%</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="90"
                          step="5"
                          value={sigDensity}
                          onChange={(e) => setSigDensity(Number(e.target.value))}
                          className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                        />
                      </div>
                    )}
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

        {/* Right Column: Live Sticky Compliance Radar & 1-Click Downloads (lg:col-span-5) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
          {/* Live Output Cards */}
          <div className="bg-surface/50 rounded-2xl border border-surface-darker/80 p-4 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-text-main flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Live Compliance Verification
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                NSDL &amp; UTIITSL Ready
              </span>
            </div>

            {/* Photo Output Preview */}
            {(activeMode === 'kit' || activeMode === 'photo') && (
              <div className="p-3 bg-white rounded-xl border border-surface-darker space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-text-main">Passport Photo Preview</span>
                  {photoResultBlob && (
                    <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {photoResultSizeKb} KB (Pass: &lt;30 KB)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-[106px] h-[106px] bg-surface rounded-lg border-2 border-primary/40 overflow-hidden flex items-center justify-center shrink-0 shadow-2xs relative">
                    {photoResultUrl ? (
                      <img
                        src={photoResultUrl}
                        alt="213x213 PAN Card Photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-text-main/40 text-center px-1">
                        Upload photo above
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>213 × 213 Pixels</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>300 DPI Embedded</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Strictly &lt; 30 KB</span>
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
                  <span className="text-text-main">Signature Preview</span>
                  {sigResultBlob && (
                    <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {sigResultSizeKb} KB (Pass: &lt;60 KB)
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="w-full h-24 bg-white rounded-lg border-2 border-primary/40 overflow-hidden flex items-center justify-center shadow-2xs">
                    {sigResultUrl ? (
                      <img
                        src={sigResultUrl}
                        alt="400x200 PAN Card Signature"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-text-main/40 text-center">
                        Upload signature above
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> 400 × 200 px @ 600 DPI
                      </div>
                      <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> Strictly &lt; 60 KB
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
                  disabled={!photoResultBlob || !sigResultBlob || isZippingKit}
                  className={cn(
                    'w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all',
                    !photoResultBlob || !sigResultBlob || isZippingKit
                      ? 'bg-primary/40 cursor-not-allowed'
                      : 'bg-primary hover:bg-[#c74a08] active:scale-[0.99]'
                  )}
                >
                  {isZippingKit ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Building Complete Kit ZIP...</span>
                    </>
                  ) : (
                    <>
                      <FileArchive className="w-4 h-4" />
                      <span>
                        Download Complete PAN Kit (Photo + Signature ZIP)
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* CSC & Cyber Cafe Share Action */}
          <WhatsAppShare
            message="Resize PAN Card Photo to 213x213 (300 DPI) & Signature to 400x200 (600 DPI) free with Kagazo: https://kagazo.in/tools/pan-card-photo-signature-resizer"
          />

          {/* Sovereign Security Stamp */}
          <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-extrabold text-text-main">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% In-Browser RAM Security</span>
            </div>
            <p className="text-[11px] text-text-main/70 leading-relaxed">
              PAN card biometrics and signatures are processed exclusively in your device&apos;s volatile RAM. No images are saved or uploaded to external servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
