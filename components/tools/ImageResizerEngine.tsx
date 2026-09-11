'use client';

import * as React from 'react';
import {
  Upload,
  Camera,
  PenTool,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  Zap,
  ZoomIn,
  ShieldCheck,
  Calendar,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { resizeImage, type ImageResizeResponse } from '@/lib/api';

export interface CustomPreset {
  id: string;
  label: string;
  minKb: number;
  maxKb: number;
  widthCm?: number;
  heightCm?: number;
  widthPx?: number;
  heightPx?: number;
  isPhoto?: boolean;
  isXerox?: boolean;
}

interface ImageResizerEngineProps {
  initialMode?: string;
  examName?: string;
  customPresets?: CustomPreset[];
  onDownloadSuccess?: () => void;
}

export function ImageResizerEngine({
  initialMode,
  examName = 'TNPSC / UPSC / SSC',
  customPresets,
  onDownloadSuccess,
}: ImageResizerEngineProps) {
  const defaultMode = initialMode || (customPresets && customPresets.length > 0 ? customPresets[0].id : 'signature');
  const [mode, setMode] = React.useState<string>(defaultMode);
  const [file, setFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);

  // Configuration parameters
  const initialPreset = customPresets?.find((p) => p.id === defaultMode);
  const [targetMinKb, setTargetMinKb] = React.useState<number>(initialPreset?.minKb ?? (defaultMode === 'photo' ? 20 : 10));
  const [targetMaxKb, setTargetMaxKb] = React.useState<number>(initialPreset?.maxKb ?? (defaultMode === 'photo' ? 50 : 20));
  const [widthCm, setWidthCm] = React.useState<number | undefined>(initialPreset?.widthCm ?? (defaultMode === 'photo' ? 3.5 : 3.5));
  const [heightCm, setHeightCm] = React.useState<number | undefined>(initialPreset?.heightCm ?? (defaultMode === 'photo' ? 4.5 : 1.5));
  const [widthPx, setWidthPx] = React.useState<number | undefined>(initialPreset?.widthPx);
  const [heightPx, setHeightPx] = React.useState<number | undefined>(initialPreset?.heightPx);
  const [addNameDate, setAddNameDate] = React.useState<boolean>(initialPreset?.isPhoto ?? (defaultMode === 'photo'));
  const [candidateName, setCandidateName] = React.useState<string>('S. ARULRAJ');
  const [dateOfPhoto, setDateOfPhoto] = React.useState<string>('11-09-2026');
  const [xeroxFilter, setXeroxFilter] = React.useState<boolean>(initialPreset?.isXerox ?? (defaultMode === 'signature'));

  // Processing state
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [result, setResult] = React.useState<ImageResizeResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isHoverZoom, setIsHoverZoom] = React.useState<boolean>(false);

  // Switch preset mode defaults
  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    setResult(null);

    const foundPreset = customPresets?.find((p) => p.id === newMode);
    if (foundPreset) {
      setTargetMinKb(foundPreset.minKb);
      setTargetMaxKb(foundPreset.maxKb);
      setWidthCm(foundPreset.widthCm);
      setHeightCm(foundPreset.heightCm);
      setWidthPx(foundPreset.widthPx);
      setHeightPx(foundPreset.heightPx);
      setAddNameDate(Boolean(foundPreset.isPhoto));
      setXeroxFilter(Boolean(foundPreset.isXerox));
      return;
    }

    if (newMode === 'photo') {
      setTargetMinKb(20);
      setTargetMaxKb(50);
      setWidthCm(3.5);
      setHeightCm(4.5);
      setWidthPx(undefined);
      setHeightPx(undefined);
      setAddNameDate(true);
      setXeroxFilter(false);
    } else if (newMode === 'signature') {
      setTargetMinKb(10);
      setTargetMaxKb(20);
      setWidthCm(3.5);
      setHeightCm(1.5);
      setWidthPx(undefined);
      setHeightPx(undefined);
      setAddNameDate(false);
      setXeroxFilter(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setResult(null);
      setError(null);
      const url = URL.createObjectURL(selected);
      setFilePreview(url);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setProgress(15);
    setError(null);

    try {
      const res = await resizeImage(file, {
        targetMinKb,
        targetMaxKb,
        widthCm,
        heightCm,
        widthPx,
        heightPx,
        dpi: 300,
        maintainAspectRatio: true,
        addNameDate: addNameDate,
        candidateName,
        dateOfPhoto,
        xeroxFilter: xeroxFilter,
        onProgress: (p) => setProgress(p),
      });
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to process image. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.data_base64;
    const cleanMode = mode.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const prefix = cleanMode.includes('photo')
      ? 'photo_verified'
      : cleanMode.includes('sign')
      ? 'signature_verified'
      : `${cleanMode}_verified`;
    a.download = `${prefix}_${result.output_size_kb}kb.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (onDownloadSuccess) {
      onDownloadSuccess();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
      {/* Top Preset Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Bi-Directional Auto-Enhance Engine
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Guarantees files strictly meet {examName} upload limits. Padded if &lt; {targetMinKb}KB, capped if &gt; {targetMaxKb}KB.
          </p>
        </div>

        <div className="inline-flex flex-wrap p-1 rounded-2xl bg-surface border border-surface-darker/80 self-start sm:self-auto gap-1">
          {customPresets && customPresets.length > 0 ? (
            customPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleModeChange(preset.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  mode === preset.id
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-text-main/70 hover:text-text-main'
                )}
              >
                {preset.isPhoto ? <Camera className="w-3.5 h-3.5" /> : <PenTool className="w-3.5 h-3.5" />}
                <span>{preset.label}</span>
              </button>
            ))
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleModeChange('signature')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  mode === 'signature'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-text-main/70 hover:text-text-main'
                )}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Signature (10-20KB)</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('photo')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  mode === 'photo'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-text-main/70 hover:text-text-main'
                )}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photo (20-50KB)</span>
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => handleModeChange('custom')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
              mode === 'custom'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Custom</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="space-y-4">
        {!filePreview ? (
          <label
            htmlFor="image-upload"
            className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer bg-primary-light/10 hover:bg-primary-light/20 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform mb-3">
              <Upload className="w-7 h-7" />
            </div>
            <div className="font-extrabold text-base text-text-main">
              Upload {mode === 'photo' ? 'Candidate Photograph' : 'Candidate Signature'}
            </div>
            <p className="text-xs sm:text-sm text-text-main/60 mt-1 max-w-md">
              Drag &amp; drop your scanned image or smartphone capture. Auto-enhances and strictly formats for official portal compliance.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
              JPG, JPEG, PNG, WEBP (Up to 25MB)
            </span>
            <input
              id="image-upload"
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
                alt="Uploaded source"
                className="w-16 h-16 object-contain bg-white rounded-xl border border-surface-darker p-1"
              />
              <div>
                <div className="font-extrabold text-sm text-text-main max-w-[240px] sm:max-w-xs truncate">
                  {file?.name}
                </div>
                <div className="text-xs text-text-main/60">
                  Original Size: <span className="font-bold text-text-main">{file ? (file.size / 1024).toFixed(1) : 0} KB</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setFilePreview(null);
                setResult(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-darker bg-white hover:bg-surface text-xs font-bold text-text-main transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change Image</span>
            </button>
          </div>
        )}
      </div>

      {/* Mode Specific Controls */}
      {file && (
        <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              Portal Compliance Parameters
            </span>
            <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
              Safe Bracket: {targetMinKb} KB – {targetMaxKb} KB
            </span>
          </div>

          {/* Photo Mode Options: Name & Date Stamp */}
          {mode === 'photo' && (
            <div className="space-y-3 pt-1 border-t border-surface-darker/60">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addNameDate}
                  onChange={(e) => setAddNameDate(e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
                <span className="text-xs font-bold text-text-main">
                  Add Name &amp; Date of Photo (DOP) Strip Mandated by TNPSC / UPSC / SSC
                </span>
              </label>

              {addNameDate && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6">
                  <div>
                    <label className="block text-[11px] font-bold text-text-main/70 mb-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-primary" /> Candidate Full Name (Capital Letters)
                    </label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="ARULRAJ S"
                      className="w-full px-3 py-1.5 bg-white border border-surface-darker rounded-xl text-xs font-bold text-text-main"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-text-main/70 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" /> Date of Photo Taken (DD-MM-YYYY)
                    </label>
                    <input
                      type="text"
                      value={dateOfPhoto}
                      onChange={(e) => setDateOfPhoto(e.target.value)}
                      placeholder="11-09-2026"
                      className="w-full px-3 py-1.5 bg-white border border-surface-darker rounded-xl text-xs font-bold text-text-main"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Signature Mode Options: Xerox Ink Boost */}
          {mode === 'signature' && (
            <div className="pt-1 border-t border-surface-darker/60">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={xeroxFilter}
                  onChange={(e) => setXeroxFilter(e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
                <span className="text-xs font-bold text-text-main">
                  Xerox Ink Boost (Eliminate smartphone camera shadows and enhance faint pen strokes)
                </span>
              </label>
            </div>
          )}

          {/* Custom Sliders (If Custom Mode) */}
          {mode === 'custom' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-surface-darker/60 text-xs">
              <div>
                <label className="block font-bold text-text-main/70 mb-1">Min Target (KB)</label>
                <input
                  type="number"
                  value={targetMinKb}
                  onChange={(e) => setTargetMinKb(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-surface-darker rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-text-main/70 mb-1">Max Target (KB)</label>
                <input
                  type="number"
                  value={targetMaxKb}
                  onChange={(e) => setTargetMaxKb(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-surface-darker rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-text-main/70 mb-1">Width (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={widthCm}
                  onChange={(e) => setWidthCm(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-surface-darker rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-text-main/70 mb-1">Height (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-surface-darker rounded-xl font-bold"
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            disabled={processing}
            onClick={handleProcess}
            className="w-full py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Auto-Enhancing &amp; Padding to Safe Bracket...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>
                  Resize &amp; Guarantee {targetMinKb}KB – {targetMaxKb}KB
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Card */}
      {result && (
        <div className="p-6 rounded-3xl bg-surface/50 border border-emerald-500/30 shadow-card space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-base text-text-main flex items-center gap-2">
                  <span>Portal Compliance Verified</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                    PASSED
                  </span>
                </h3>
                <p className="text-xs text-text-main/60">
                  Ready to upload directly to government recruitment portal without rejection.
                </p>
              </div>
            </div>

            <div className="text-right self-start sm:self-auto">
              <span className="text-xs text-text-main/60 block">Output File Size</span>
              <span className="text-lg font-black text-primary font-mono">
                {result.output_size_kb} KB
              </span>
            </div>
          </div>

          {/* Side by Side Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Original */}
            <div className="p-4 bg-white rounded-2xl border border-surface-darker space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-main/50 block">
                Source Upload ({result.input_size_kb} KB)
              </span>
              <div className="h-40 flex items-center justify-center bg-surface/40 rounded-xl overflow-hidden p-2">
                <img
                  src={filePreview || ''}
                  alt="Original preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Enhanced & Verified */}
            <div className="p-4 bg-white rounded-2xl border-2 border-primary/40 space-y-2 text-center relative">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-primary font-black flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Enhanced ({result.output_size_kb} KB)
                </span>
                <span className="text-text-main/50 font-mono">
                  {result.width_px}x{result.height_px}px @ {result.dpi}DPI
                </span>
              </div>
              <div
                onMouseEnter={() => setIsHoverZoom(true)}
                onMouseLeave={() => setIsHoverZoom(false)}
                className="h-40 flex items-center justify-center bg-surface/40 rounded-xl overflow-hidden p-2 relative group cursor-zoom-in"
              >
                <img
                  src={result.data_base64}
                  alt="Enhanced output"
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
          </div>

          {/* Download Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Download className="w-5 h-5" />
              <span>Download Verified {mode === 'photo' ? 'Photo' : 'Signature'} ({result.output_size_kb} KB)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
