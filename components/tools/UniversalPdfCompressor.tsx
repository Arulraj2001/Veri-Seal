'use client';

import * as React from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
  Trash2,
  Sliders,
  Lock,
  Layers,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  compressPdf,
  inspectPdf,
  type CompressionResponseData,
  type PdfPageInfo,
} from '@/lib/api';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

export interface UniversalPdfCompressorProps {
  initialTargetKb?: number;
  isFixedTarget?: boolean;
  toolHeading?: string;
  toolSubheading?: string;
  onDownloadSuccess?: () => void;
}

export function UniversalPdfCompressor({
  initialTargetKb = 1000, // 1 MB default
  isFixedTarget = false,
  toolHeading,
  toolSubheading,
  onDownloadSuccess,
}: UniversalPdfCompressorProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [targetKb, setTargetKb] = React.useState<number>(initialTargetKb);
  const [greyscale, setGreyscale] = React.useState<boolean>(false);

  // Page management
  const [pagesInfo, setPagesInfo] = React.useState<PdfPageInfo[]>([]);
  const [selectedPages, setSelectedPages] = React.useState<number[]>([]);
  const [isLoadingPages, setIsLoadingPages] = React.useState<boolean>(false);
  const [showPageSelector, setShowPageSelector] = React.useState<boolean>(false);

  // Execution state
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [progressStep, setProgressStep] = React.useState<string>('Preparing document...');
  const [result, setResult] = React.useState<CompressionResponseData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const presets = [500, 1000, 2000, 5000, 10000];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.type.includes('pdf') && !selected.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a valid PDF document.');
        return;
      }

      setFile(selected);
      setResult(null);
      setError(null);
      setShowPageSelector(false);

      // Inspect pages
      setIsLoadingPages(true);
      try {
        const pages = await inspectPdf(selected);
        setPagesInfo(pages);
        setSelectedPages(pages.map((p) => p.page_number));
      } catch {
        setPagesInfo([]);
      } finally {
        setIsLoadingPages(false);
      }
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setProgress(15);
    setProgressStep('Analyzing PDF streams and structure...');
    setError(null);

    try {
      const pagesToKeep =
        selectedPages.length < pagesInfo.length && selectedPages.length > 0
          ? selectedPages
          : undefined;

      const res = await compressPdf(file, {
        targetKb,
        preset: 'custom',
        greyscale,
        pagesToKeep,
        onProgress: (p) => {
          setProgress(p);
          if (p > 50) setProgressStep('Recompressing embedded images with Lanczos...');
          if (p > 85) setProgressStep('Finalizing stream compression and xref table...');
        },
      });

      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to compress PDF. Please try again.');
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!result?.compressed_pdf_b64) return;
    const a = document.createElement('a');
    a.href = `data:application/pdf;base64,${result.compressed_pdf_b64}`;
    const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, '') : 'document';
    a.download = `${baseName}_${result.compressed_size_kb}kb.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (onDownloadSuccess) {
      onDownloadSuccess();
    }
  };

  const togglePageSelection = (pageNum: number) => {
    setSelectedPages((prev) => {
      if (prev.includes(pageNum)) {
        if (prev.length === 1) return prev; // Keep at least one page
        return prev.filter((p) => p !== pageNum);
      }
      return [...prev, pageNum].sort((a, b) => a - b);
    });
  };

  const originalKb = file ? Math.round((file.size / 1024) * 10) / 10 : 0;
  const originalMb = Math.round((originalKb / 1024) * 100) / 100;
  const targetMb = Math.round((targetKb / 1024) * 10) / 10;

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {toolHeading || `Compress PDF to Under ${targetMb >= 1 ? `${targetMb}MB` : `${targetKb}KB`}`}
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            {toolSubheading ||
              `Smart in-memory PDF stream optimization strictly under ${targetKb}KB without losing text clarity.`}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            In-Memory Compression
          </span>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="space-y-4">
        {!file ? (
          <label
            htmlFor="pdf-upload"
            className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-primary-light/10 hover:bg-primary-light/20 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform mb-3 shadow-2xs">
              <FileText className="w-7 h-7" />
            </div>
            <div className="font-extrabold text-base text-text-main">
              Upload PDF Document
            </div>
            <p className="text-xs sm:text-sm text-text-main/60 mt-1 max-w-md">
              Drag &amp; drop any PDF file. Fast stream deduplication and image recompression.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
              PDF Files Up to 50MB
            </span>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-surface/60 rounded-2xl border border-surface-darker gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-text-main max-w-[220px] sm:max-w-xs truncate">
                  {file.name}
                </div>
                <div className="text-xs text-text-main/60 flex items-center gap-2">
                  <span>Size: <strong className="text-text-main">{originalMb >= 1 ? `${originalMb} MB` : `${originalKb} KB`}</strong></span>
                  {pagesInfo.length > 0 && (
                    <span>• Pages: <strong className="text-text-main">{pagesInfo.length}</strong></span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {pagesInfo.length > 1 && (
                <button
                  type="button"
                  onClick={() => setShowPageSelector(!showPageSelector)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors',
                    showPageSelector
                      ? 'border-primary bg-primary text-white'
                      : 'border-surface-darker bg-white hover:bg-surface text-text-main'
                  )}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{showPageSelector ? 'Done Pages' : 'Select Pages'}</span>
                </button>
              )}

              <label
                htmlFor="pdf-replace"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-xs font-bold text-primary transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
                <input
                  id="pdf-replace"
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setResult(null);
                  setPagesInfo([]);
                  setSelectedPages([]);
                  setShowPageSelector(false);
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
          {/* Page Selector Grid (Collapsible at top) */}
          {showPageSelector && pagesInfo.length > 1 && (
            <div className="p-4 bg-surface/40 rounded-3xl border border-surface-darker space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  Retain / Exclude Pages Before Compressing
                </span>
                <span className="text-[11px] font-bold text-text-main/60">
                  Selected {selectedPages.length} of {pagesInfo.length} pages
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-1">
                {pagesInfo.map((p) => {
                  const isSelected = selectedPages.includes(p.page_number);
                  return (
                    <button
                      key={p.page_number}
                      type="button"
                      onClick={() => togglePageSelection(p.page_number)}
                      className={cn(
                        'p-2 rounded-2xl border text-center transition-all relative overflow-hidden group',
                        isSelected
                          ? 'border-primary bg-white shadow-2xs'
                          : 'border-surface-darker bg-surface/50 opacity-40 hover:opacity-75'
                      )}
                    >
                      <div className="h-28 bg-surface rounded-xl overflow-hidden flex items-center justify-center p-1 mb-1.5">
                        {p.thumbnail_b64 ? (
                          <img
                            src={p.thumbnail_b64}
                            alt={`Page ${p.page_number}`}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <FileText className="w-8 h-8 text-text-main/30" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-text-main block">
                        Page {p.page_number}
                      </span>
                      <div
                        className={cn(
                          'absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                          isSelected
                            ? 'bg-primary text-white shadow-xs'
                            : 'bg-slate-300 text-white'
                        )}
                      >
                        {isSelected ? '✓' : '✕'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* 2-Column Desktop Split: Controls on Left, Live Result on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Compression Controls & Sliders (6 cols on lg / xl) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-primary" />
                    Target File Size Cap
                  </span>
                  <span className="text-sm font-black text-primary font-mono bg-primary-light px-3 py-0.5 rounded-full">
                    Max {targetKb >= 1000 ? `${(targetKb / 1000).toFixed(1)} MB` : `${targetKb} KB`}
                  </span>
                </div>

                {/* Preset Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-text-main/60 mr-1">Common Targets:</span>
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

                {/* Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-text-main/60 font-semibold">
                    <span>Compact (100 KB)</span>
                    <span>Email Standard (1 MB)</span>
                    <span>Large PDF (10 MB)</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={targetKb}
                    onChange={(e) => setTargetKb(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Greyscale Mode Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-surface-darker">
                  <div className="space-y-0.5 pr-2">
                    <span className="text-xs font-bold text-text-main block">
                      Greyscale (Black &amp; White) Conversion
                    </span>
                    <span className="text-[11px] text-text-main/60 block">
                      Strips color channels to squeeze scans 40% smaller.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={greyscale}
                    onChange={(e) => setGreyscale(e.target.checked)}
                    className="w-4 h-4 rounded text-primary accent-primary cursor-pointer shrink-0"
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
                      <span>{progressStep}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>
                        Compress PDF to Under {targetKb >= 1000 ? `${targetKb / 1000} MB` : `${targetKb} KB`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Live Status & Output Studio (6 cols, sticky on lg / xl) */}
            <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
              {result ? (
                <div className="p-6 rounded-3xl bg-surface/50 border border-emerald-500/30 shadow-card space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-surface-darker">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="font-extrabold text-base text-text-main flex items-center gap-2">
                          <span>PDF Compression Verified</span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                            PASS
                          </span>
                        </h3>
                        <p className="text-xs text-text-main/60">
                          Target: &le;{targetKb} KB • Result: {result.compressed_size_kb} KB
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-text-main/60 block">Resulting Size</span>
                      <span className="text-xl font-black text-primary font-mono">
                        {result.compressed_size_kb >= 1000
                          ? `${(result.compressed_size_kb / 1024).toFixed(2)} MB`
                          : `${result.compressed_size_kb} KB`}
                      </span>
                    </div>
                  </div>

                  {/* Stat Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="p-2.5 bg-white rounded-xl border border-surface-darker text-center">
                      <span className="text-[10px] text-text-main/50 uppercase font-bold block">Original</span>
                      <span className="text-xs font-black text-text-main font-mono">
                        {result.original_size_kb >= 1000
                          ? `${(result.original_size_kb / 1024).toFixed(2)} MB`
                          : `${result.original_size_kb} KB`}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-surface-darker text-center">
                      <span className="text-[10px] text-text-main/50 uppercase font-bold block">Compressed</span>
                      <span className="text-xs font-black text-emerald-600 font-mono">
                        {result.compressed_size_kb >= 1000
                          ? `${(result.compressed_size_kb / 1024).toFixed(2)} MB`
                          : `${result.compressed_size_kb} KB`}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-surface-darker text-center">
                      <span className="text-[10px] text-text-main/50 uppercase font-bold block">Saved</span>
                      <span className="text-xs font-black text-primary font-mono">-{result.reduction_percent}%</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-surface-darker text-center">
                      <span className="text-[10px] text-text-main/50 uppercase font-bold block">Pages</span>
                      <span className="text-xs font-black text-text-main font-mono">{result.page_count}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Compressed PDF</span>
                    </button>

                    <WhatsAppShare
                      message={`I just compressed a PDF to ${result.compressed_size_kb}KB using Kagazo's free online compressor! Check it out:`}
                    />
                  </div>
                </div>
              ) : (
                /* Ready State Document Card */
                <div className="p-6 rounded-3xl bg-surface/30 border border-surface-darker shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-primary" />
                      Document Ready
                    </span>
                    <span className="text-[11px] font-mono font-bold text-text-main/60 bg-surface px-2.5 py-0.5 rounded-full border border-surface-darker">
                      {originalMb >= 1 ? `${originalMb} MB` : `${originalKb} KB`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-surface-darker">
                    {pagesInfo.length > 0 && pagesInfo[0]?.thumbnail_b64 ? (
                      <img
                        src={pagesInfo[0].thumbnail_b64}
                        alt="Page 1 preview"
                        className="w-14 h-18 object-contain bg-surface rounded-lg border border-surface-darker p-1"
                      />
                    ) : (
                      <div className="w-14 h-18 bg-red-50 text-red-500 rounded-lg border border-red-200 flex items-center justify-center font-bold text-xs">
                        PDF
                      </div>
                    )}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="text-xs font-bold text-text-main truncate">
                        {file.name}
                      </div>
                      <div className="text-[11px] text-text-main/60">
                        {pagesInfo.length > 0 ? `${pagesInfo.length} pages loaded` : 'PDF document ready'}
                      </div>
                      <div className="text-[11px] font-bold text-primary">
                        Target Cap: &le; {targetKb >= 1000 ? `${(targetKb / 1000).toFixed(1)} MB` : `${targetKb} KB`}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 text-[11px] text-emerald-800 space-y-1">
                    <span className="font-bold block flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      In-Memory Pipeline Active
                    </span>
                    <p className="text-emerald-900/80 leading-relaxed">
                      Click the &quot;Compress PDF&quot; button on the left to initiate client-side stream deduplication and recompression.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
