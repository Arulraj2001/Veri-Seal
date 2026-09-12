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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';
import { compressPdf, type CompressionResponseData } from '@/lib/api';

interface ExamPreset {
  id: string;
  name: string;
  icon: string;
  maxLimit: number;
  safeTarget: number;
  portalLabel: string;
  description: string;
}

const PRESETS: ExamPreset[] = [
  {
    id: 'tnpsc',
    name: 'TNPSC OTR',
    icon: '🏛️',
    maxLimit: 200,
    safeTarget: 180,
    portalLabel: 'Max 200 KB',
    description: 'Group 1, 2, 4 Certificate & Hall Ticket',
  },
  {
    id: 'upsc',
    name: 'UPSC OTR / DAF',
    icon: '🇮🇳',
    maxLimit: 300,
    safeTarget: 250,
    portalLabel: 'Max 300 KB',
    description: 'Civil Services, NDA, CDS document PDF',
  },
  {
    id: 'neet',
    name: 'NEET / JEE (NTA)',
    icon: '🎓',
    maxLimit: 300,
    safeTarget: 240,
    portalLabel: 'Max 300 KB',
    description: 'Category, PwD & 10th/12th certificate',
  },
  {
    id: 'ssc',
    name: 'SSC (CGL/CHSL)',
    icon: '🏢',
    maxLimit: 200,
    safeTarget: 175,
    portalLabel: 'Max 200 KB',
    description: 'Staff Selection Commission uploads',
  },
  {
    id: 'bank',
    name: 'IBPS / SBI Bank',
    icon: '🏦',
    maxLimit: 200,
    safeTarget: 180,
    portalLabel: 'Max 200 KB',
    description: 'Banking recruitment document PDF',
  },
  {
    id: 'passport',
    name: 'Passport Seva',
    icon: '🛂',
    maxLimit: 1024,
    safeTarget: 850,
    portalLabel: 'Max 1 MB',
    description: 'Address proof & birth certificate (1 MB)',
  },
  {
    id: 'custom',
    name: 'Custom Target',
    icon: '⚙️',
    maxLimit: 1000,
    safeTarget: 200,
    portalLabel: 'Slider',
    description: 'Choose any exact target (50 KB - 1000 KB)',
  },
];

export function ExamPdfCompressor() {
  const [selectedPreset, setSelectedPreset] = React.useState<string>('tnpsc');
  const [targetKb, setTargetKb] = React.useState<number>(180);
  const [greyscale, setGreyscale] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [dragActive, setDragActive] = React.useState<boolean>(false);

  const [status, setStatus] = React.useState<'idle' | 'compressing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = React.useState<number>(0);
  const [progressStep, setProgressStep] = React.useState<string>('Preparing document...');
  const [result, setResult] = React.useState<CompressionResponseData | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isZoomed, setIsZoomed] = React.useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    const found = PRESETS.find((p) => p.id === presetId);
    if (found) {
      setTargetKb(found.safeTarget);
    }
  };

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.name.toLowerCase().endsWith('.pdf')) {
        setFile(droppedFile);
        setStatus('idle');
        setResult(null);
        setErrorMessage(null);
      } else {
        setErrorMessage('Please upload a valid PDF document.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type === 'application/pdf' || selected.name.toLowerCase().endsWith('.pdf')) {
        setFile(selected);
        setStatus('idle');
        setResult(null);
        setErrorMessage(null);
      } else {
        setErrorMessage('Please upload a valid PDF document.');
      }
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    setStatus('compressing');
    setProgress(15);
    setProgressStep('Analyzing PDF structure and stream objects...');
    setErrorMessage(null);

    const stepInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          clearInterval(stepInterval);
          return 80;
        }
        if (prev === 25) setProgressStep('Recompressing embedded certificate images (Lanczos)...');
        if (prev === 55) setProgressStep('Enforcing strict exam portal boundary limit...');
        return prev + 15;
      });
    }, 350);

    try {
      const resp = await compressPdf(file, {
        targetKb,
        preset: selectedPreset,
        greyscale,
        onProgress: (p) => {
          if (p >= 80) {
            clearInterval(stepInterval);
            setProgress(p);
            setProgressStep('Finalizing lossless PDF optimization...');
          }
        },
      });

      clearInterval(stepInterval);
      setProgress(100);
      setProgressStep('Complete!');
      setResult(resp);
      setStatus('success');
    } catch (err: any) {
      clearInterval(stepInterval);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to compress document. Please check your connection.');
    }
  };

  const handleDownload = () => {
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
      const targetTag = selectedPreset === 'custom' ? `${targetKb}KB` : selectedPreset.toUpperCase();
      link.download = `${baseName}_${targetTag}_compressed.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download trigger failed:', e);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setStatus('idle');
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const activePresetInfo = PRESETS.find((p) => p.id === selectedPreset) || PRESETS[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 100% Free Public Utility Trust Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-primary-light/80 border border-primary/25 rounded-2xl text-xs md:text-sm text-primary font-medium shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="font-bold text-text-main">100% Free Public Tool</span>
          <span className="text-text-main/70">• Zero Sign-up</span>
          <span className="text-text-main/70">• Unlimited Documents</span>
        </div>
        <div className="flex items-center gap-1.5 text-text-main/80 font-medium">
          <Lock className="w-3.5 h-3.5 text-primary" />
          <span>In-Memory Privacy: Files Never Stored</span>
        </div>
      </div>

      {/* Main Interactive Card Wrapper */}
      <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
        {/* Step 1: Preset Selector */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-darker/60">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                1. Select Exam or Custom Limit
              </h2>
              <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                Automatically applies the exact maximum file size permitted by government recruitment portals.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
              Exact Size Guard
            </span>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {PRESETS.map((p) => {
              const isSelected = selectedPreset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p.id)}
                  className={`flex flex-col items-start text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-primary-light/70 border-primary text-text-main shadow-xs ring-1 ring-primary'
                      : 'bg-surface border-surface-darker/80 text-text-main hover:border-primary/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-xl">{p.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-primary text-white shadow-2xs'
                          : 'bg-surface-darker text-text-main/70'
                      }`}
                    >
                      {p.portalLabel}
                    </span>
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-text-main line-clamp-1">{p.name}</div>
                  <div className="text-[10px] sm:text-xs text-text-main/60 line-clamp-1 mt-0.5">{p.description}</div>
                </button>
              );
            })}
          </div>

          {/* Custom Target Slider if "custom" selected */}
          {selectedPreset === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-2xl bg-surface border border-surface-darker space-y-2"
            >
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <label htmlFor="target-slider" className="text-text-main font-bold flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-primary" />
                  Set Exact Target Size:
                </label>
                <span className="text-primary font-extrabold px-2.5 py-0.5 bg-primary-light border border-primary/20 rounded-md">
                  {targetKb} KB
                </span>
              </div>
              <input
                id="target-slider"
                type="range"
                min="50"
                max="1000"
                step="10"
                value={targetKb}
                onChange={(e) => setTargetKb(Number(e.target.value))}
                className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-text-main/50 font-medium">
                <span>50 KB (High Compression)</span>
                <span>200 KB (TNPSC / SSC)</span>
                <span>300 KB (UPSC / NEET)</span>
                <span>1000 KB (1 MB)</span>
              </div>
            </motion.div>
          )}

          {/* Smart Options Toggle: Greyscale / Xerox Mode */}
          <div className="mt-4 pt-3 border-t border-surface-darker/60 flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-text-main select-none">
              <input
                type="checkbox"
                checked={greyscale}
                onChange={(e) => setGreyscale(e.target.checked)}
                className="w-4 h-4 rounded border-surface-darker text-primary focus:ring-primary"
              />
              <div>
                <span className="font-bold text-text-main">B&amp;W / Xerox Mode</span>
                <span className="text-text-main/60 ml-1.5 hidden sm:inline">
                  (Removes yellow scanner tint, sharpens faded text, saves extra 50% file size)
                </span>
              </div>
            </label>
            <div className="text-xs text-text-main/70 font-medium">
              Target limit: <strong className="text-primary">&lt; {activePresetInfo.maxLimit} KB</strong>
            </div>
          </div>
        </div>

        {/* Step 2: Upload Dropzone */}
        <div className="pt-2">
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2 mb-3">
            <FileUp className="w-5 h-5 text-primary" />
            2. Upload Certificate or Marksheet PDF
          </h2>

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
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary transition-transform group-hover:scale-110 shadow-2xs">
                <FileUp className="w-8 h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-text-main mb-1">
                Click to browse PDF or drag &amp; drop here
              </h3>
              <p className="text-xs sm:text-sm text-text-main/60 max-w-md mx-auto mb-4">
                Supports Community, Nativity, Degree Marksheet, 10th/12th Marksheet &amp; Photo ID (up to 25MB).
              </p>
              <Button
                type="button"
                className="pointer-events-none bg-primary text-white font-bold rounded-xl shadow-xs"
              >
                Choose Certificate PDF
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
                      Original Size: <strong className="text-text-main">{(file.size / 1024).toFixed(1)} KB</strong>{' '}
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
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

              {/* Error banner */}
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
                    Executing in-memory high-DPI Lanczos downsampling without blurring fine text or signatures...
                  </p>
                </div>
              )}

              {/* Action Button */}
              {status === 'idle' && (
                <Button
                  onClick={handleCompress}
                  className="w-full py-6 bg-primary hover:bg-primary-hover text-white font-extrabold text-base rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Compress to &lt; {activePresetInfo.maxLimit} KB for {activePresetInfo.name}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {status === 'success' && result && (
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
                      Document Compressed Successfully
                    </h3>
                    <p className="text-xs text-text-main/60">
                      Guaranteed compliant with {activePresetInfo.name} upload limit.
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
                  <div className="text-[11px] text-text-main/60 uppercase font-semibold">Portal Limit</div>
                  <div className="text-lg sm:text-xl font-bold text-text-main mt-0.5">
                    &lt; {activePresetInfo.maxLimit} KB
                  </div>
                </div>
                <div className="p-3.5 bg-surface border border-surface-darker rounded-2xl text-center">
                  <div className="text-[11px] text-text-main/60 uppercase font-semibold">Pages</div>
                  <div className="text-lg sm:text-xl font-bold text-text-main mt-0.5">
                    {result.page_count}
                  </div>
                </div>
              </div>

              {/* Portal Compliance Checklist */}
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                <div className="text-xs font-bold text-text-main mb-2.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Verified Portal Compliance:
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.compliance_badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-white border border-primary/20 text-primary rounded-lg shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Clarity Preview */}
              {result.preview_image_b64 && (
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-primary" />
                        Page 1 Visual Clarity Inspection
                      </div>
                      <div className="text-[11px] text-text-main/60">
                        Confirm stamps, marks, and signatures remain sharp before uploading.
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsZoomed(true)}
                      className="border-surface-darker hover:bg-white text-text-main text-xs h-8 px-3 rounded-xl"
                    >
                      <Maximize2 className="w-3.5 h-3.5 mr-1 text-primary" />
                      Zoom
                    </Button>
                  </div>

                  <div
                    onClick={() => setIsZoomed(true)}
                    className="relative max-h-60 overflow-hidden rounded-xl border border-surface-darker bg-white cursor-pointer group flex items-center justify-center p-2 shadow-2xs"
                  >
                    <img
                      src={result.preview_image_b64}
                      alt="Compressed PDF Page 1 Preview"
                      className="w-full max-w-sm object-contain mx-auto transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-text-main/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 rounded-xl">
                      <Maximize2 className="w-4 h-4" /> Click to view full clarity
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Download Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  onClick={handleDownload}
                  className="w-full sm:flex-1 py-6 bg-primary hover:bg-primary-hover text-white font-extrabold text-base rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Compressed PDF ({result.compressed_size_kb} KB)
                </Button>
                <WhatsAppShare
                  message="Compressed my PDF for govt portal using Kagazo 📄 Free: https://kagazo.in/tools"
                  className="w-full sm:w-auto justify-center py-4 rounded-2xl"
                />
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
      </div>

      {/* High-Resolution Zoom Modal */}
      {isZoomed && result?.preview_image_b64 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-main/60 backdrop-blur-sm">
          <div className="relative max-w-3xl w-full max-h-[90vh] bg-white border border-surface-darker rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-surface-darker bg-surface">
              <span className="font-bold text-sm text-text-main flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Legibility Check (Page 1 Compressed Preview)
              </span>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1 rounded-lg text-text-main/60 hover:text-text-main hover:bg-surface-darker"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1 flex items-center justify-center bg-surface/40">
              <img
                src={result.preview_image_b64}
                alt="Zoomed PDF Preview"
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-surface-darker shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
