'use client';

import * as React from 'react';
import {
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sliders,
  Sparkles,
  Zap,
  ZoomIn,
  Trash2,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { convertImagesToPdf, type ImageToPdfResponse } from '@/lib/api';

interface ImageToPdfEngineProps {
  initialTargetKb?: number;
  onDownloadSuccess?: () => void;
}

export function ImageToPdfEngine({
  initialTargetKb = 200,
  onDownloadSuccess,
}: ImageToPdfEngineProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [targetKb, setTargetKb] = React.useState<number>(initialTargetKb);
  const [preset, setPreset] = React.useState<'color' | 'greyscale' | 'xerox'>('color');
  const [pageFormat, setPageFormat] = React.useState<'A4' | 'fit_image'>('A4');

  const [processing, setProcessing] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [result, setResult] = React.useState<ImageToPdfResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isHoverZoom, setIsHoverZoom] = React.useState<boolean>(false);

  const handleFilesSelected = (newFiles: FileList | File[]) => {
    const valid = Array.from(newFiles).filter((f) =>
      f.type.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(f.name)
    );
    if (!valid.length) return;

    const combined = [...files, ...valid].slice(0, 10);
    setFiles(combined);
    setResult(null);
    setError(null);

    const urls = combined.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const handleRemoveFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    setPreviews(updated.map((f) => URL.createObjectURL(f)));
    setResult(null);
  };

  const handleConvert = async () => {
    if (!files.length) return;
    setProcessing(true);
    setProgress(20);
    setError(null);

    try {
      const res = await convertImagesToPdf(files, {
        targetKb,
        preset,
        pageFormat,
        onProgress: (p) => setProgress(p),
      });
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to convert images to PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.pdf_base64;
    a.download = `marksheet_converted_${result.output_size_kb}kb.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (onDownloadSuccess) {
      onDownloadSuccess();
    }
  };

  const totalInputSizeKb = files.reduce((acc, f) => acc + f.size / 1024, 0);

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
      {/* Engine Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            1-Click Marksheet Image to PDF Converter
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Convert smartphone marksheets and certificates directly into a crisp PDF guaranteed under {targetKb} KB.
          </p>
        </div>

        {/* Quick Size Presets */}
        <div className="inline-flex p-1 rounded-2xl bg-surface border border-surface-darker/80 self-start sm:self-auto">
          {[100, 200, 300, 500].map((kb) => (
            <button
              key={kb}
              type="button"
              onClick={() => {
                setTargetKb(kb);
                setResult(null);
              }}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                targetKb === kb
                  ? 'bg-primary text-white shadow-2xs'
                  : 'text-text-main/70 hover:text-text-main'
              )}
            >
              &lt; {kb}KB
            </button>
          ))}
        </div>
      </div>

      {/* Upload Dropzone */}
      {!files.length ? (
        <label
          htmlFor="img2pdf-upload"
          className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer bg-primary-light/10 hover:bg-primary-light/20 transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform mb-3">
            <Upload className="w-7 h-7" />
          </div>
          <div className="font-extrabold text-base text-text-main">
            Upload Marksheet or Certificate Photos
          </div>
          <p className="text-xs sm:text-sm text-text-main/60 mt-1 max-w-md">
            Drag &amp; drop 1 or more images (e.g. Front &amp; Back pages). Directly converted and compressed to under {targetKb} KB in memory.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
            JPG, JPEG, PNG, WEBP (Multi-image supported)
          </span>
          <input
            id="img2pdf-upload"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={(e) => e.target.files && handleFilesSelected(e.target.files)}
            className="sr-only"
          />
        </label>
      ) : (
        <div className="space-y-4">
          {/* Thumbnails grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {files.map((file, i) => (
              <div
                key={i}
                className="p-2.5 bg-surface/50 rounded-2xl border border-surface-darker relative group space-y-1 text-center"
              >
                <div className="h-28 flex items-center justify-center bg-white rounded-xl overflow-hidden p-1 border border-surface-darker">
                  <img
                    src={previews[i]}
                    alt={`Page ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-[11px] font-bold text-text-main truncate">{file.name}</div>
                <div className="text-[10px] text-text-main/60">
                  Page {i + 1} • {(file.size / 1024).toFixed(0)} KB
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(i)}
                  className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-red-500 text-white shadow-xs hover:bg-red-600 transition-colors"
                  title="Remove page"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Add More Button */}
            {files.length < 10 && (
              <label className="h-40 border-2 border-dashed border-surface-darker hover:border-primary/50 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer bg-surface/30 hover:bg-primary-light/10 transition-all">
                <Plus className="w-6 h-6 text-primary mb-1" />
                <span className="text-xs font-bold text-text-main">Add Page</span>
                <span className="text-[10px] text-text-main/50">Front/Back</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={(e) => e.target.files && handleFilesSelected(e.target.files)}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-text-main/60 px-1">
            <span>
              Total Upload: <strong className="text-text-main">{files.length} Image(s)</strong> ({totalInputSizeKb.toFixed(1)} KB)
            </span>
            <button
              type="button"
              onClick={() => {
                setFiles([]);
                setPreviews([]);
                setResult(null);
              }}
              className="text-primary font-bold hover:underline"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Conversion Options */}
      {files.length > 0 && (
        <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              PDF Optimization Settings
            </span>
            <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
              Target: &lt; {targetKb} KB
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preset Toggle */}
            <div className="space-y-1.5">
              <label className="block font-bold text-text-main">Color &amp; Clarity Filter</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'color', label: 'Original Color' },
                  { id: 'xerox', label: 'Xerox Ink Boost' },
                  { id: 'greyscale', label: 'Grayscale' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPreset(opt.id as any)}
                    className={cn(
                      'py-2 px-2.5 rounded-xl font-bold border transition-all text-center',
                      preset === opt.id
                        ? 'bg-primary text-white border-primary shadow-2xs'
                        : 'bg-white text-text-main/80 border-surface-darker hover:border-primary/40'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Format Toggle */}
            <div className="space-y-1.5">
              <label className="block font-bold text-text-main">Page Sizing</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'A4', label: 'Standard A4 Sheet' },
                  { id: 'fit_image', label: 'Fit Exact Photo' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPageFormat(opt.id as any)}
                    className={cn(
                      'py-2 px-2.5 rounded-xl font-bold border transition-all text-center',
                      pageFormat === opt.id
                        ? 'bg-primary text-white border-primary shadow-2xs'
                        : 'bg-white text-text-main/80 border-surface-darker hover:border-primary/40'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            disabled={processing}
            onClick={handleConvert}
            className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Converting &amp; Compressing to &lt; {targetKb} KB...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Convert to PDF Guaranteed &lt; {targetKb} KB</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Output Results Card */}
      {result && (
        <div className="p-6 rounded-3xl bg-surface/50 border border-emerald-500/30 shadow-card space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-base text-text-main flex items-center gap-2">
                  <span>PDF Conversion Complete</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                    PASSED
                  </span>
                </h3>
                <p className="text-xs text-text-main/60">
                  Strictly under {result.target_kb} KB. Ready for instant upload to recruitment portals.
                </p>
              </div>
            </div>

            <div className="text-right self-start sm:self-auto">
              <span className="text-xs text-text-main/60 block">Output PDF Size</span>
              <span className="text-lg font-black text-primary font-mono">
                {result.output_size_kb} KB
              </span>
            </div>
          </div>

          {/* Thumbnail & Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-surface-darker space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-main/50 block">
                Source Images ({result.input_size_kb} KB total)
              </span>
              <div className="h-44 flex items-center justify-center bg-surface/40 rounded-xl overflow-hidden p-2">
                <img
                  src={previews[0]}
                  alt="Page 1 source"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-primary/40 space-y-2 text-center relative">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-primary font-black flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Generated PDF ({result.output_size_kb} KB)
                </span>
                <span className="text-text-main/50 font-mono">
                  {result.total_pages} Page(s) • {result.page_format}
                </span>
              </div>
              <div
                onMouseEnter={() => setIsHoverZoom(true)}
                onMouseLeave={() => setIsHoverZoom(false)}
                className="h-44 flex items-center justify-center bg-surface/40 rounded-xl overflow-hidden p-2 relative group cursor-zoom-in"
              >
                <img
                  src={result.preview_base64}
                  alt="PDF Page 1 preview"
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

          {/* Download Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF ({result.output_size_kb} KB)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
