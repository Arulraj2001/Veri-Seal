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
  ZoomIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';
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
      link.download = `kagazo_compressed_certificates_${targetKb}KB.zip`;
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
    <div className="w-full space-y-6">
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

        {/* 2-Column Side-by-Side Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Target Limit Controller, Xerox Mode, Dropzone & Action Button (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
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
                    (Enhances seals, saves ~50% extra size)
                  </span>
                </label>

                <span className="text-xs font-bold text-primary">
                  Strict Guarantee: &le; {targetKb} KB
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
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 ${
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
                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary shadow-2xs">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-main mb-1">
                      Click to select PDF or drag &amp; drop
                    </h3>
                    <p className="text-xs text-text-main/60 max-w-sm mx-auto mb-3">
                      Marksheet, Degree Certificate, Community Certificate, or ID proof (up to 25MB).
                    </p>
                    <Button type="button" className="pointer-events-none bg-primary text-white font-bold rounded-xl text-xs shadow-xs">
                      Select Certificate PDF
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Selected File Card */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface border border-surface-darker">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-primary-light border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-xs sm:text-sm text-text-main truncate max-w-[200px] sm:max-w-xs">
                            {file.name}
                          </div>
                          <div className="text-[11px] text-text-main/60 flex items-center gap-2">
                            <span>Original: <strong className="text-text-main">{(file.size / 1024).toFixed(1)} KB</strong></span>
                            {pagesInfo.length > 0 && (
                              <span>• {pagesInfo.length} Page{pagesInfo.length > 1 ? 's' : ''}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-red-600 shrink-0">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Replace
                      </Button>
                    </div>

                    {/* Interactive Page Selection (Only if multi-page) */}
                    {pagesInfo.length > 1 && (
                      <div className="p-3.5 rounded-2xl border border-surface-darker bg-white space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-text-main flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-primary" />
                            Retain Selected Pages ({selectedPages.length}/{pagesInfo.length}):
                          </span>
                          <span className="text-[11px] text-text-main/60">Click to exclude blank pages</span>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                          {pagesInfo.map((p) => {
                            const isSelected = selectedPages.includes(p.page_number);
                            return (
                              <button
                                key={p.page_number}
                                type="button"
                                onClick={() => togglePageSelection(p.page_number)}
                                className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer relative ${
                                  isSelected
                                    ? 'border-primary bg-primary-light/30 shadow-2xs'
                                    : 'border-surface-darker bg-surface/50 opacity-50 hover:opacity-75'
                                }`}
                              >
                                {p.thumbnail_b64 ? (
                                  <div className="h-16 w-full flex items-center justify-center bg-white rounded-lg overflow-hidden border border-surface-darker/60 mb-1">
                                    <img
                                      src={p.thumbnail_b64}
                                      alt={`Page ${p.page_number}`}
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-16 w-full flex items-center justify-center bg-surface rounded-lg mb-1">
                                    <FileText className="w-5 h-5 text-text-main/40" />
                                  </div>
                                )}
                                <span className="text-[10px] font-bold text-text-main">
                                  Page {p.page_number}
                                </span>
                              </button>
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
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 ${
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
                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary shadow-2xs">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-main mb-1">
                      Upload multiple PDFs at once (Batch Mode)
                    </h3>
                    <p className="text-xs text-text-main/60 max-w-sm mx-auto mb-3">
                      Compress up to 10 certificates together. Instant ZIP download.
                    </p>
                    <Button type="button" className="pointer-events-none bg-primary text-white font-bold rounded-xl text-xs shadow-xs">
                      Choose Multiple Certificates
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-surface-darker">
                      <span className="text-xs font-bold text-text-main">
                        {batchFiles.length} Certificate PDFs Selected
                      </span>
                      <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-red-600">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Reset
                      </Button>
                    </div>

                    <div className="max-h-40 overflow-y-auto divide-y divide-surface-darker/60 rounded-2xl border border-surface-darker bg-white">
                      {batchFiles.map((bf, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 text-xs">
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
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
              <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Compressing Progress */}
            {status === 'compressing' && (
              <div className="p-4 rounded-2xl bg-surface border border-primary/30 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-main font-bold flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                    {progressStep}
                  </span>
                  <span className="text-primary font-extrabold">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-surface-darker rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-[11px] text-text-main/60 text-center">
                  Processing in RAM: razor-sharp 150+ DPI text contrast guaranteed...
                </p>
              </div>
            )}

            {/* Main Action Button */}
            {status === 'idle' && (file || batchFiles.length > 0) && (
              <Button
                onClick={handleCompress}
                className="w-full py-5 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 mr-2" />
                {mode === 'single'
                  ? `Compress PDF to < ${config.maxLimitKb} KB`
                  : `Batch Compress ${batchFiles.length} Certificates to < ${config.maxLimitKb} KB`}
              </Button>
            )}
          </div>

          {/* Right Column: Live Output Studio, Results & Actions (6 cols, sticky on desktop) */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            {/* SINGLE RESULT CARD */}
            {status === 'success' && result && mode === 'single' && (
              <div className="p-4 sm:p-5 rounded-3xl bg-surface/50 border-2 border-emerald-500/40 shadow-card space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-surface-darker">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-text-main block truncate">Compression Complete</span>
                      <span className="text-[10px] text-text-main/60 block truncate">
                        Target: &le; {config.maxLimitKb} KB
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-primary-light text-primary border-primary/30 text-[10px] px-2 py-0.5 font-bold shrink-0">
                    ✓ {result.reduction_percent}% Smaller
                  </Badge>
                </div>

                {/* Metric Grid */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div className="p-2 bg-white border border-surface-darker rounded-xl">
                    <div className="text-[9px] text-text-main/60 uppercase font-semibold">Original</div>
                    <div className="text-xs font-bold text-text-main mt-0.5">{result.original_size_kb} KB</div>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="text-[9px] text-emerald-700 uppercase font-bold">Output</div>
                    <div className="text-xs font-black text-emerald-700 mt-0.5">{result.compressed_size_kb} KB</div>
                  </div>
                  <div className="p-2 bg-white border border-surface-darker rounded-xl">
                    <div className="text-[9px] text-text-main/60 uppercase font-semibold">Pages</div>
                    <div className="text-xs font-bold text-text-main mt-0.5">{result.page_count}</div>
                  </div>
                </div>

                {/* Page 1 Inspection Preview */}
                {result.preview_image_b64 && (
                  <div className="p-2.5 bg-white rounded-2xl border border-surface-darker space-y-1 text-center">
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider px-1">
                      <span className="text-primary font-black flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Page 1 Clarity Inspection
                      </span>
                      <span className="text-text-main/50 font-mono">150+ DPI</span>
                    </div>
                    <div
                      onClick={() => setIsZoomed(true)}
                      className="h-44 flex items-center justify-center bg-surface/30 rounded-xl overflow-hidden p-1.5 cursor-zoom-in relative group"
                    >
                      <img
                        src={result.preview_image_b64}
                        alt="Page 1 inspection preview"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 right-1 p-0.5 px-1 rounded bg-white/80 backdrop-blur-xs text-[9px] font-semibold text-text-main/70 flex items-center gap-0.5">
                        <ZoomIn className="w-2.5 h-2.5 text-primary" /> Click Zoom
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <Button
                    onClick={handleDownloadSingle}
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Verified PDF ({result.compressed_size_kb} KB)
                  </Button>
                  <div className="flex items-center gap-2">
                    <WhatsAppShare
                      message="Compressed my PDF for govt portal using Kagazo 📄 Free: https://kagazo.in/tools"
                      className="flex-1 justify-center py-2.5 rounded-xl text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="border-surface-darker hover:bg-surface text-text-main text-xs rounded-xl"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* BATCH RESULT CARD */}
            {status === 'success' && batchResult && mode === 'batch' && (
              <div className="p-4 sm:p-5 rounded-3xl bg-surface/50 border-2 border-emerald-500/40 shadow-card space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-surface-darker">
                  <div>
                    <h3 className="text-xs font-black uppercase text-text-main flex items-center gap-1.5">
                      <Archive className="w-4 h-4 text-primary" />
                      Batch Complete ({batchResult.successful_files}/{batchResult.total_files})
                    </h3>
                    <p className="text-[10px] text-text-main/60 mt-0.5">
                      {batchResult.total_original_size_kb} KB ➔ {batchResult.total_compressed_size_kb} KB ({batchResult.overall_reduction_percent}% off)
                    </p>
                  </div>

                  {batchResult.zip_archive_b64 && (
                    <Button
                      onClick={handleDownloadZip}
                      size="sm"
                      className="bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs shadow-xs gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      ZIP
                    </Button>
                  )}
                </div>

                {/* Individual Item Download Cards */}
                <div className="space-y-1.5 max-h-56 overflow-y-auto divide-y divide-surface-darker/60 rounded-xl border border-surface-darker bg-white p-2">
                  {batchResult.results.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 gap-2 text-xs">
                      <div className="truncate min-w-0">
                        <div className="font-bold text-text-main truncate text-[11px]">{item.filename}</div>
                        <div className="text-[10px] text-text-main/60 flex items-center gap-1">
                          <span>{item.original_size_kb} KB ➔ <strong className="text-primary">{item.compressed_size_kb} KB</strong></span>
                        </div>
                      </div>

                      {item.compressed_pdf_b64 && item.download_name && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadBatchItem(item.compressed_pdf_b64!, item.download_name!)}
                          className="text-[10px] h-7 px-2 text-primary border-primary/30 hover:bg-primary-light rounded-lg shrink-0"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Get
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-1">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="w-full py-2.5 border-surface-darker hover:bg-surface text-text-main font-bold text-xs rounded-xl"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    Compress Another Batch
                  </Button>
                </div>
              </div>
            )}

            {/* Ready State Placeholder (shown when idle) */}
            {status !== 'success' && (
              <div className="p-6 rounded-3xl bg-surface/30 border-2 border-dashed border-surface-darker text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary mx-auto flex items-center justify-center shadow-2xs">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-text-main block">Document Compression Ready</span>
                  <span className="text-[11px] text-text-main/60 block mt-0.5">
                    Select your PDF certificate or marksheet on the left to view verified results and download here.
                  </span>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-surface-darker text-left space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-text-main font-semibold">
                    <span className="text-text-main/60">Strict Portal Limit:</span>
                    <span className="text-primary font-bold font-mono">&le; {config.maxLimitKb} KB</span>
                  </div>
                  <div className="flex items-center justify-between text-text-main font-semibold">
                    <span className="text-text-main/60">Current Target:</span>
                    <span className="font-mono font-bold text-text-main">{targetKb} KB</span>
                  </div>
                  <div className="flex items-center justify-between text-text-main font-semibold">
                    <span className="text-text-main/60">Clarity Guarantee:</span>
                    <span className="font-mono text-emerald-600 font-bold">150+ DPI Text &amp; Seals</span>
                  </div>
                  <div className="flex items-center justify-between text-text-main font-semibold">
                    <span className="text-text-main/60">In-Memory Privacy:</span>
                    <span className="text-emerald-600 font-bold">100% Client-Side RAM</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-Width QualityProofEngine Certificate Report below studio when result is ready */}
        {status === 'success' && result && mode === 'single' && (
          <div className="pt-4 border-t border-surface-darker/60 space-y-4 animate-in fade-in duration-300">
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
          </div>
        )}
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
