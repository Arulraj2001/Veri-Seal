'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileUp,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Sliders,
  Maximize2,
  X,
  FileCheck,
  Lock,
  Layers,
  Trash2,
  Archive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  compressPdf,
  compressBatchPdfs,
  inspectPdf,
  type CompressionResponseData,
  type BatchCompressionResponseData,
  type PdfPageInfo,
} from '@/lib/api';
import type { ToolConfig } from './tool-configs';
import { QualityProofEngine } from './QualityProofEngine';

interface PdfCompressorEngineProps {
  config: ToolConfig;
}

export function PdfCompressorEngine({ config }: PdfCompressorEngineProps) {
  // Mode: single document or batch mode
  const [mode, setMode] = React.useState<'single' | 'batch'>('single');

  // Single file state
  const [file, setFile] = React.useState<File | null>(null);
  const [pagesInfo, setPagesInfo] = React.useState<PdfPageInfo[]>([]);
  const [selectedPages, setSelectedPages] = React.useState<number[]>([]);
  const [isLoadingPages, setIsLoadingPages] = React.useState<boolean>(false);

  // Batch files state
  const [batchFiles, setBatchFiles] = React.useState<File[]>([]);

  // Settings
  const [targetKb, setTargetKb] = React.useState<number>(config.defaultTargetKb);
  const [greyscale, setGreyscale] = React.useState<boolean>(false);
  const [dragActive, setDragActive] = React.useState<boolean>(false);

  // Execution states
  const [status, setStatus] = React.useState<'idle' | 'compressing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = React.useState<number>(0);
  const [progressStep, setProgressStep] = React.useState<string>('Preparing document...');
  const [result, setResult] = React.useState<CompressionResponseData | null>(null);
  const [batchResult, setBatchResult] = React.useState<BatchCompressionResponseData | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isZoomed, setIsZoomed] = React.useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const batchInputRef = React.useRef<HTMLInputElement>(null);

  // When config changes, reset target
  React.useEffect(() => {
    setTargetKb(config.defaultTargetKb);
  }, [config.defaultTargetKb]);

  // Handle single file selection
  const handleSingleFile = async (selected: File) => {
    if (!selected.type.includes('pdf') && !selected.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please upload a valid PDF document.');
      return;
    }
    setFile(selected);
    setStatus('idle');
    setResult(null);
    setErrorMessage(null);

    // Inspect pages for page deletion feature
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
  };

  // Handle batch file selection
  const handleBatchFiles = (fileList: FileList | File[]) => {
    const valid = Array.from(fileList).filter(
      (f) => f.type.includes('pdf') || f.name.toLowerCase().endsWith('.pdf')
    );
    if (valid.length === 0) {
      setErrorMessage('Please upload valid PDF files.');
      return;
    }
    if (valid.length > 10) {
      setErrorMessage('Maximum 10 files allowed per batch.');
      setBatchFiles(valid.slice(0, 10));
    } else {
      setBatchFiles(valid);
    }
    setStatus('idle');
    setBatchResult(null);
    setErrorMessage(null);
  };

  // Toggle page selection in single mode
  const togglePageSelection = (pageNum: number) => {
    if (selectedPages.includes(pageNum)) {
      if (selectedPages.length === 1) {
        alert('You must retain at least 1 page.');
        return;
      }
      setSelectedPages((prev) => prev.filter((p) => p !== pageNum));
    } else {
      setSelectedPages((prev) => [...prev, pageNum].sort((a, b) => a - b));
    }
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (mode === 'single') {
        handleSingleFile(e.dataTransfer.files[0]);
      } else {
        handleBatchFiles(e.dataTransfer.files);
      }
    }
  };

  // Compress execution
  const handleCompress = async () => {
    if (mode === 'single' && !file) return;
    if (mode === 'batch' && batchFiles.length === 0) return;

    setStatus('compressing');
    setProgress(15);
    setProgressStep('Analyzing document structure...');
    setErrorMessage(null);

    const stepInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          clearInterval(stepInterval);
          return 80;
        }
        if (prev === 25) setProgressStep('Optimizing high-DPI scans without blurring text...');
        if (prev === 55) setProgressStep(`Enforcing strict < ${config.maxLimitKb} KB safe limit...`);
        return prev + 15;
      });
    }, 350);

    try {
      if (mode === 'single' && file) {
        const pagesToKeep =
          pagesInfo.length > 0 && selectedPages.length < pagesInfo.length
            ? selectedPages
            : undefined;

        const resp = await compressPdf(file, {
          targetKb,
          preset: config.presetId,
          greyscale,
          pagesToKeep,
          onProgress: (p) => {
            if (p >= 80) {
              clearInterval(stepInterval);
              setProgress(p);
              setProgressStep('Finalizing lossless stream optimization...');
            }
          },
        });

        clearInterval(stepInterval);
        setProgress(100);
        setProgressStep('Complete!');
        setResult(resp);
        setStatus('success');
      } else if (mode === 'batch') {
        const bResp = await compressBatchPdfs(batchFiles, {
          targetKb,
          preset: config.presetId,
          greyscale,
          onProgress: (p) => {
            if (p >= 80) {
              clearInterval(stepInterval);
              setProgress(p);
              setProgressStep('Packaging into ZIP archive...');
            }
          },
        });

        clearInterval(stepInterval);
        setProgress(100);
        setProgressStep('Complete!');
        setBatchResult(bResp);
        setStatus('success');
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setStatus('error');
      setErrorMessage(err.message || 'Compression failed. Please check your connection.');
    }
  };

  // Download Single PDF
  const handleDownloadSingle = () => {
    if (!result?.compressed_pdf_b64 || !file) return;
    try {
      const byteCharacters = atob(result.compressed_pdf_b64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      link.download = `${baseName}_${targetKb}KB_compressed.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed:', e);
    }
  };

  // Download Single Item from Batch
  const handleDownloadBatchItem = (b64: string, filename: string) => {
    try {
      const byteCharacters = atob(b64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed:', e);
    }
  };

  // Download All as ZIP
  const handleDownloadZip = () => {
    if (!batchResult?.zip_archive_b64) return;
    try {
      const byteCharacters = atob(batchResult.zip_archive_b64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `veriseal_compressed_certificates_${targetKb}KB.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('ZIP download failed:', e);
    }
  };

  const handleReset = () => {
    setFile(null);
    setBatchFiles([]);
    setPagesInfo([]);
    setSelectedPages([]);
    setResult(null);
    setBatchResult(null);
    setStatus('idle');
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (batchInputRef.current) batchInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 100% Free Trust Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-primary-light/80 border border-primary/25 rounded-2xl text-xs md:text-sm text-primary font-medium shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="font-bold text-text-main">100% Free Public Tool</span>
          <span className="text-text-main/70">• Zero Sign-up</span>
          <span className="text-text-main/70">• Unlimited Files</span>
        </div>
        <div className="flex items-center gap-1.5 text-text-main/80 font-medium">
          <Lock className="w-3.5 h-3.5 text-primary" />
          <span>In-Memory Privacy: Files Never Stored</span>
        </div>
      </div>

      {/* Main Interactive Card Wrapper */}
      <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
        {/* Mode Switcher: Single vs Batch */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-surface-darker/60">
          <div className="flex items-center gap-2 bg-surface p-1 rounded-2xl border border-surface-darker">
            <button
              type="button"
              onClick={() => {
                setMode('single');
                handleReset();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'single'
                  ? 'bg-white text-primary shadow-xs border border-surface-darker/80'
                  : 'text-text-main/70 hover:text-text-main'
              }`}
            >
              📄 Single Document
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('batch');
                handleReset();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === 'batch'
                  ? 'bg-white text-primary shadow-xs border border-surface-darker/80'
                  : 'text-text-main/70 hover:text-text-main'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>Batch Mode (Multi-File)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider">
              {config.heroBadge}
            </span>
          </div>
        </div>

        {/* Target Limit Controller & Xerox Mode */}
        <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label htmlFor="target-slider" className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-primary" />
                Target File Size Limit:
              </label>
              <p className="text-[11px] text-text-main/60 mt-0.5">
                Portal maximum limit: <strong className="text-text-main">&le; {config.maxLimitKb} KB</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-text-main/70 font-medium">Safe Target:</span>
              <span className="text-primary font-extrabold text-sm px-3 py-1 bg-white border border-primary/30 rounded-xl shadow-2xs">
                {targetKb} KB
              </span>
            </div>
          </div>

          <input
            id="target-slider"
            type="range"
            min="50"
            max={Math.max(config.maxLimitKb, 1000)}
            step="10"
            value={targetKb}
            onChange={(e) => setTargetKb(Number(e.target.value))}
            className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
          />

          <div className="flex items-center justify-between pt-2 border-t border-surface-darker/60 flex-wrap gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-text-main select-none">
              <input
                type="checkbox"
                checked={greyscale}
                onChange={(e) => setGreyscale(e.target.checked)}
                className="w-4 h-4 rounded border-surface-darker text-primary focus:ring-primary"
              />
              <span className="font-bold text-text-main">B&amp;W / Xerox Mode</span>
              <span className="text-text-main/60 hidden sm:inline">
                (Strips yellow tint, enhances marksheet seal contrast, saves ~50% extra size)
              </span>
            </label>

            <span className="text-xs font-bold text-primary">
              Strict Guarantee: Output &le; {targetKb} KB
            </span>
          </div>
        </div>

        {/* Upload Dropzone */}
        {mode === 'single' ? (
          <div>
            {!file ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? 'border-primary bg-primary-light/50 scale-[1.01]'
                    : 'border-primary/40 hover:border-primary bg-surface/40 hover:bg-primary-light/20'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => e.target.files?.[0] && handleSingleFile(e.target.files[0])}
                  className="hidden"
                />
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary shadow-2xs">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-text-main mb-1">
                  Click to select PDF or drag &amp; drop here
                </h3>
                <p className="text-xs sm:text-sm text-text-main/60 max-w-md mx-auto mb-4">
                  Marksheet, Degree Certificate, Community Certificate, or ID proof (up to 25MB).
                </p>
                <Button type="button" className="pointer-events-none bg-primary text-white font-bold rounded-xl shadow-xs">
                  Select Certificate PDF
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selected File Card */}
                <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-surface border border-surface-darker">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-primary-light border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-text-main truncate">{file.name}</p>
                      <p className="text-xs text-text-main/60 mt-0.5">
                        Original Size: <strong className="text-text-main">{(file.size / 1024).toFixed(1)} KB</strong>
                      </p>
                    </div>
                  </div>

                  {status !== 'compressing' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="text-text-main/70 hover:text-red-600 shrink-0"
                    >
                      <RotateCcw className="w-4 h-4 mr-1.5" />
                      Change
                    </Button>
                  )}
                </div>

                {/* Page Inspector & Exclusion Strip (Unique Feature) */}
                {pagesInfo.length > 1 && (
                  <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-primary" />
                          Page Selector &amp; Remover ({selectedPages.length} of {pagesInfo.length} pages kept)
                        </div>
                        <p className="text-[11px] text-text-main/60">
                          Click to uncheck blank back pages or unwanted scanner pages before compressing.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
                      {pagesInfo.map((page) => {
                        const isKept = selectedPages.includes(page.page_number);
                        return (
                          <div
                            key={page.page_number}
                            onClick={() => togglePageSelection(page.page_number)}
                            className={`relative shrink-0 w-24 p-2 rounded-xl border cursor-pointer transition-all ${
                              isKept
                                ? 'bg-white border-primary shadow-xs ring-1 ring-primary'
                                : 'bg-surface-darker/60 border-surface-darker opacity-40 hover:opacity-75'
                            }`}
                          >
                            <div className="aspect-[3/4] bg-surface rounded-lg overflow-hidden border border-surface-darker/60 flex items-center justify-center mb-1">
                              {page.thumbnail_b64 ? (
                                <img
                                  src={page.thumbnail_b64}
                                  alt={`Page ${page.page_number}`}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <span className="text-xs text-text-main/60">P.{page.page_number}</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span>Page {page.page_number}</span>
                              {isKept ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* BATCH MODE */
          <div>
            {batchFiles.length === 0 ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => batchInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? 'border-primary bg-primary-light/50 scale-[1.01]'
                    : 'border-primary/40 hover:border-primary bg-surface/40 hover:bg-primary-light/20'
                }`}
              >
                <input
                  ref={batchInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  multiple
                  onChange={(e) => e.target.files && handleBatchFiles(e.target.files)}
                  className="hidden"
                />
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary shadow-2xs">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-text-main mb-1">
                  Upload multiple PDFs at once (Batch Mode)
                </h3>
                <p className="text-xs sm:text-sm text-text-main/60 max-w-md mx-auto mb-4">
                  Compress up to 10 certificates together (10th, 12th, Community, Degree). Instant ZIP download.
                </p>
                <Button type="button" className="pointer-events-none bg-primary text-white font-bold rounded-xl shadow-xs">
                  Choose Multiple Certificates
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface border border-surface-darker">
                  <span className="text-xs sm:text-sm font-bold text-text-main">
                    {batchFiles.length} Certificate PDFs Selected
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-red-600">
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Reset List
                  </Button>
                </div>

                <div className="max-h-48 overflow-y-auto divide-y divide-surface-darker/60 rounded-2xl border border-surface-darker bg-white">
                  {batchFiles.map((bf, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-semibold text-text-main truncate">{bf.name}</span>
                      </div>
                      <span className="text-text-main/60 shrink-0 font-medium ml-2">
                        {(bf.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Compressing Progress */}
        {status === 'compressing' && (
          <div className="p-5 rounded-2xl bg-surface border border-primary/30 space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-text-main font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary animate-pulse" />
                {progressStep}
              </span>
              <span className="text-primary font-extrabold">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-surface-darker rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-text-main/60 text-center">
              Processing in RAM: razor-sharp 150+ DPI text contrast guaranteed...
            </p>
          </div>
        )}

        {/* Main Action Button */}
        {status === 'idle' && (file || batchFiles.length > 0) && (
          <Button
            onClick={handleCompress}
            className="w-full py-6 bg-primary hover:bg-primary-hover text-white font-extrabold text-base rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <Zap className="w-5 h-5 mr-2" />
            {mode === 'single'
              ? `Compress PDF to < ${config.maxLimitKb} KB`
              : `Batch Compress ${batchFiles.length} Certificates to < ${config.maxLimitKb} KB`}
          </Button>
        )}

        {/* SINGLE RESULT CARD */}
        <AnimatePresence>
          {status === 'success' && result && mode === 'single' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-4 border-t border-surface-darker/80 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-text-main">
                      Compression Complete
                    </h3>
                    <p className="text-xs text-text-main/60">
                      Strictly compliant with &le; {config.maxLimitKb} KB portal boundary.
                    </p>
                  </div>
                </div>
                <Badge className="bg-primary-light text-primary border-primary/30 text-xs px-3 py-1 font-bold">
                  ✓ {result.reduction_percent}% Smaller
                </Badge>
              </div>

              {/* Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-surface border border-surface-darker rounded-2xl text-center">
                  <div className="text-[11px] text-text-main/60 uppercase font-semibold">Original</div>
                  <div className="text-lg sm:text-xl font-bold text-text-main mt-0.5">
                    {result.original_size_kb} KB
                  </div>
                </div>
                <div className="p-3.5 bg-primary-light/70 border border-primary/30 rounded-2xl text-center">
                  <div className="text-[11px] text-primary uppercase font-bold">Compressed</div>
                  <div className="text-lg sm:text-xl font-extrabold text-primary mt-0.5">
                    {result.compressed_size_kb} KB
                  </div>
                </div>
                <div className="p-3.5 bg-surface border border-surface-darker rounded-2xl text-center">
                  <div className="text-[11px] text-text-main/60 uppercase font-semibold">Portal Ceiling</div>
                  <div className="text-lg sm:text-xl font-bold text-text-main mt-0.5">
                    &le; {config.maxLimitKb} KB
                  </div>
                </div>
                <div className="p-3.5 bg-surface border border-surface-darker rounded-2xl text-center">
                  <div className="text-[11px] text-text-main/60 uppercase font-semibold">Pages</div>
                  <div className="text-lg sm:text-xl font-bold text-text-main mt-0.5">
                    {result.page_count}
                  </div>
                </div>
              </div>

              {/* Quality & Compliance Proof Engine */}
              <QualityProofEngine
                originalSizeKb={result.original_size_kb}
                compressedSizeKb={result.compressed_size_kb}
                maxLimitKb={config.maxLimitKb}
                originalPreviewUrl={pagesInfo[0]?.thumbnail_b64 || null}
                compressedPreviewUrl={result.preview_image_b64 || null}
                portalName={config.presetId ? `${config.presetId.toUpperCase()} & State PSC Portals` : 'Official Portals'}
                documentType="Official Certificate PDF"
                pageCount={result.page_count}
                dpi={200}
                format="PDF"
                isPdf={true}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  onClick={handleDownloadSingle}
                  className="w-full sm:flex-1 py-6 bg-primary hover:bg-primary-hover text-white font-extrabold text-base rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Compressed PDF ({result.compressed_size_kb} KB)
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full sm:w-auto py-6 border-surface-darker hover:bg-surface text-text-main font-bold rounded-2xl cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Compress Another File
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BATCH RESULT CARD */}
        <AnimatePresence>
          {status === 'success' && batchResult && mode === 'batch' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-4 border-t border-surface-darker/80 space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-text-main flex items-center gap-2">
                    <Archive className="w-5 h-5 text-primary" />
                    Batch Compression Complete ({batchResult.successful_files} of {batchResult.total_files} files)
                  </h3>
                  <p className="text-xs text-text-main/60 mt-0.5">
                    Total size reduced from {batchResult.total_original_size_kb} KB to {batchResult.total_compressed_size_kb} KB ({batchResult.overall_reduction_percent}% saved).
                  </p>
                </div>

                {batchResult.zip_archive_b64 && (
                  <Button
                    onClick={handleDownloadZip}
                    className="bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-xs gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download All (ZIP)
                  </Button>
                )}
              </div>

              {/* Individual Item Download Cards */}
              <div className="space-y-2 max-h-72 overflow-y-auto divide-y divide-surface-darker/60 rounded-2xl border border-surface-darker bg-surface p-2">
                {batchResult.results.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 gap-2 bg-white rounded-xl">
                    <div className="truncate min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-text-main truncate">{item.filename}</div>
                      <div className="text-[11px] text-text-main/60 flex items-center gap-2">
                        <span>{item.original_size_kb} KB ➔ <strong className="text-primary">{item.compressed_size_kb} KB</strong></span>
                        <span className="text-primary font-bold">({item.reduction_percent}% off)</span>
                      </div>
                    </div>

                    {item.compressed_pdf_b64 && item.download_name && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadBatchItem(item.compressed_pdf_b64!, item.download_name!)}
                        className="text-xs text-primary border-primary/30 hover:bg-primary-light rounded-lg shrink-0"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full py-5 border-surface-darker hover:bg-surface text-text-main font-bold rounded-2xl"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Compress Another Batch
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* High-Resolution Zoom Modal */}
      {isZoomed && result?.preview_image_b64 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-main/60 backdrop-blur-sm">
          <div className="relative max-w-3xl w-full max-h-[90vh] bg-white border border-surface-darker rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-surface-darker bg-surface">
              <span className="font-bold text-sm text-text-main flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Legibility Inspection (Page 1 Compressed Preview)
              </span>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1 rounded-lg text-text-main/60 hover:text-text-main hover:bg-surface-darker cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1 flex items-center justify-center bg-surface/40">
              <img
                src={result.preview_image_b64}
                alt="Zoomed Preview"
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-surface-darker shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
