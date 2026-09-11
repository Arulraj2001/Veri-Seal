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
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { convertPdfToImages, type PdfToImageResponse, type PdfPageImage } from '@/lib/api';

interface PdfToImageEngineProps {
  onDownloadSuccess?: () => void;
}

export function PdfToImageEngine({ onDownloadSuccess }: PdfToImageEngineProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [dpi, setDpi] = React.useState<number>(300);
  const [format, setFormat] = React.useState<'jpeg' | 'png'>('jpeg');
  const [xeroxFilter, setXeroxFilter] = React.useState<boolean>(false);
  const [capSize, setCapSize] = React.useState<boolean>(false);
  const [targetMaxKb, setTargetMaxKb] = React.useState<number>(200);

  const [processing, setProcessing] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [result, setResult] = React.useState<PdfToImageResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [activePreviewPage, setActivePreviewPage] = React.useState<number>(1);
  const [isHoverZoom, setIsHoverZoom] = React.useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a valid PDF document.');
        return;
      }
      setFile(selected);
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      if (!selected.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a valid PDF document.');
        return;
      }
      setFile(selected);
      setResult(null);
      setError(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setProgress(15);
    setError(null);

    try {
      const res = await convertPdfToImages(file, {
        dpi,
        imageFormat: format,
        xeroxFilter,
        targetMaxKb: capSize ? targetMaxKb : undefined,
        onProgress: (p) => setProgress(p),
      });
      setResult(res);
      setActivePreviewPage(1);
    } catch (err: any) {
      setError(err?.message || 'Failed to extract images from PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownloadPage = (page: PdfPageImage) => {
    const a = document.createElement('a');
    a.href = page.data_base64;
    const ext = page.mime_type.includes('png') ? 'png' : 'jpg';
    const baseName = file?.name.replace(/\.[^/.]+$/, '') || 'document';
    a.download = `${baseName}_page_${page.page_number}_${dpi}dpi.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (onDownloadSuccess) {
      onDownloadSuccess();
    }
  };

  const handleDownloadAll = () => {
    if (!result) return;
    result.pages.forEach((page, idx) => {
      setTimeout(() => {
        handleDownloadPage(page);
      }, idx * 250);
    });
  };

  const activePageData = result?.pages.find((p) => p.page_number === activePreviewPage) || result?.pages[0];

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            PDF to High-Resolution Image (300 DPI)
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Extracts crisp 300 DPI JPEG or PNG images from e-Aadhaar, admit cards, and PDF certificates.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-2xl bg-surface border border-surface-darker/80 self-start sm:self-auto gap-1">
          <button
            type="button"
            onClick={() => setFormat('jpeg')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
              format === 'jpeg'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            JPEG (Exam Portals)
          </button>
          <button
            type="button"
            onClick={() => setFormat('png')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
              format === 'png'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            PNG (Crisp Lossless)
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-surface-darker hover:border-primary/50 bg-surface/50 hover:bg-surface rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer group"
          onClick={() => document.getElementById('pdf-to-img-input')?.click()}
        >
          <input
            id="pdf-to-img-input"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-text-main mb-1">
            Click to upload or drag &amp; drop PDF
          </h3>
          <p className="text-xs sm:text-sm text-text-main/60 max-w-sm mx-auto">
            Upload e-Aadhaar, college marksheets, admit cards, or any PDF (Up to 25 MB).
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-surface border border-surface-darker gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-text-main truncate max-w-xs sm:max-w-md">
                  {file.name}
                </p>
                <p className="text-xs text-text-main/60">
                  {(file.size / 1024).toFixed(1)} KB &bull; Ready for 300 DPI conversion
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setResult(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-darker text-xs font-semibold text-text-main/70 hover:text-red-600 hover:border-red-200 transition-all self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change PDF</span>
            </button>
          </div>

          {/* Configuration Settings Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface/40 border border-surface-darker/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-main/70">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              <span>Conversion Resolution &amp; Output Quality</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* DPI Selector */}
              <div>
                <label className="text-xs font-semibold text-text-main block mb-1.5">
                  Resolution (DPI)
                </label>
                <select
                  value={dpi}
                  onChange={(e) => setDpi(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-surface-darker text-xs font-semibold text-text-main focus:outline-none focus:border-primary"
                >
                  <option value={300}>300 DPI (Exam Scan Standard)</option>
                  <option value={200}>200 DPI (Balanced)</option>
                  <option value={150}>150 DPI (Compact)</option>
                </select>
              </div>

              {/* Xerox Ink Boost Toggle */}
              <div className="sm:col-span-2 flex flex-col justify-end">
                <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-surface-darker cursor-pointer hover:border-primary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={xeroxFilter}
                    onChange={(e) => setXeroxFilter(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-text-main block">
                      Xerox Contrast Boost
                    </span>
                    <span className="text-[11px] text-text-main/60 block">
                      Whiten gray scanned background &amp; darken faint text
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Optional Size Ceiling */}
            <div className="pt-2 border-t border-surface-darker/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={capSize}
                  onChange={(e) => setCapSize(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <span className="text-xs font-semibold text-text-main">
                  Cap each image under specific KB (e.g. &lt; 200 KB)
                </span>
              </label>

              {capSize && (
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <input
                    type="number"
                    min={50}
                    max={1000}
                    step={25}
                    value={targetMaxKb}
                    onChange={(e) => setTargetMaxKb(Number(e.target.value))}
                    className="w-24 px-2.5 py-1 rounded-lg bg-white border border-surface-darker text-xs font-bold text-primary focus:outline-none focus:border-primary text-center"
                  />
                  <span className="text-xs font-medium text-text-main/60">KB per page</span>
                </div>
              )}
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={processing}
              onClick={handleProcess}
              className={cn(
                'w-full py-3 px-6 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg',
                processing
                  ? 'bg-primary/60 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-hover active:scale-[0.99]'
              )}
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Converting PDF to 300 DPI Images ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Extract 300 DPI Images Now (100% Free)</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Conversion Result View */}
      {result && result.pages.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-surface-darker/80">
          {/* Success Banner */}
          <div className="p-4 rounded-2xl bg-primary-light/40 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-primary">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-text-main">
                  Successfully converted {result.converted_pages_count} of {result.total_pdf_pages} pages at {result.dpi} DPI
                </p>
                <p className="text-[11px] text-text-main/70">
                  Standard {result.format.toUpperCase()} format &bull; 100% in-memory processing
                </p>
              </div>
            </div>

            {result.pages.length > 1 && (
              <button
                type="button"
                onClick={handleDownloadAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shrink-0 self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download All Pages</span>
              </button>
            )}
          </div>

          {/* Page Selector Tabs if multi-page */}
          {result.pages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-text-main/70 shrink-0">Select Page:</span>
              {result.pages.map((p) => (
                <button
                  key={p.page_number}
                  type="button"
                  onClick={() => setActivePreviewPage(p.page_number)}
                  className={cn(
                    'px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0',
                    activePreviewPage === p.page_number
                      ? 'bg-primary text-white shadow-2xs'
                      : 'bg-surface border border-surface-darker text-text-main/70 hover:text-text-main'
                  )}
                >
                  Page {p.page_number} ({p.size_kb} KB)
                </button>
              ))}
            </div>
          )}

          {/* Active Page Preview with Loupe */}
          {activePageData && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-bold text-text-main">
                    Page {activePageData.page_number} &bull; {activePageData.width_px} × {activePageData.height_px} px &bull; {activePageData.size_kb} KB
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsHoverZoom(!isHoverZoom)}
                    className={cn(
                      'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all',
                      isHoverZoom
                        ? 'bg-primary-light border-primary/40 text-primary'
                        : 'bg-surface border-surface-darker text-text-main/70 hover:text-text-main'
                    )}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Clarity Zoom {isHoverZoom ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadPage(activePageData)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Page {activePageData.page_number}</span>
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative rounded-2xl border border-surface-darker bg-surface/30 p-2 sm:p-4 overflow-hidden flex items-center justify-center min-h-[300px] max-h-[600px]">
                <img
                  src={activePageData.data_base64}
                  alt={`Converted Page ${activePageData.page_number}`}
                  className={cn(
                    'max-w-full max-h-[550px] object-contain rounded-lg shadow-sm transition-transform duration-200 cursor-crosshair',
                    isHoverZoom && 'hover:scale-150'
                  )}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
