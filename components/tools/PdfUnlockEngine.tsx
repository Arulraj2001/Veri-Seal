'use client';

import * as React from 'react';
import {
  Upload,
  FileText,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  Zap,
  ShieldCheck,
  Eye,
  EyeOff,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { unlockPdf, type UnlockPdfResponse } from '@/lib/api';

interface PdfUnlockEngineProps {
  onDownloadSuccess?: () => void;
}

export function PdfUnlockEngine({ onDownloadSuccess }: PdfUnlockEngineProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [mode, setMode] = React.useState<'aadhaar' | 'custom'>('aadhaar');

  // Aadhaar specific inputs
  const [namePrefix, setNamePrefix] = React.useState<string>('');
  const [birthYear, setBirthYear] = React.useState<string>('');

  // Custom password input
  const [customPassword, setCustomPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // Status
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [result, setResult] = React.useState<UnlockPdfResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

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

  const constructedPassword =
    mode === 'aadhaar'
      ? `${namePrefix.trim().toUpperCase().slice(0, 4)}${birthYear.trim().slice(0, 4)}`
      : customPassword;

  const handleUnlock = async () => {
    if (!file) return;

    if (mode === 'aadhaar') {
      if (namePrefix.trim().length < 2) {
        setError('Please enter the first 4 letters of the candidate name as printed on Aadhaar.');
        return;
      }
      if (birthYear.trim().length !== 4 || isNaN(Number(birthYear))) {
        setError('Please enter a valid 4-digit birth year (e.g. 1999 or 2002).');
        return;
      }
    } else {
      if (!customPassword) {
        setError('Please enter the PDF password.');
        return;
      }
    }

    setProcessing(true);
    setProgress(20);
    setError(null);

    try {
      const res = await unlockPdf(file, {
        password: mode === 'custom' ? customPassword : constructedPassword,
        namePrefix: mode === 'aadhaar' ? namePrefix : undefined,
        birthYear: mode === 'aadhaar' ? birthYear : undefined,
        onProgress: (p) => setProgress(p),
      });

      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to unlock PDF. Please verify your password and try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !result.pdf_base64) return;
    const a = document.createElement('a');
    a.href = result.pdf_base64;
    const cleanName = file?.name.replace(/\.[^/.]+$/, '') || 'document';
    a.download = `${cleanName}_unlocked_verified.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (onDownloadSuccess) {
      onDownloadSuccess();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <Unlock className="w-5 h-5 text-primary" />
            e-Aadhaar &amp; PDF Password Remover
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Permanently removes PDF password encryption so recruitment portals accept your upload without errors.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="inline-flex p-1 rounded-2xl bg-surface border border-surface-darker/80 self-start sm:self-auto gap-1">
          <button
            type="button"
            onClick={() => setMode('aadhaar')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
              mode === 'aadhaar'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            e-Aadhaar 1-Click
          </button>
          <button
            type="button"
            onClick={() => setMode('custom')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
              mode === 'custom'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            Custom Password
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-surface-darker hover:border-primary/50 bg-surface/50 hover:bg-surface rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer group"
          onClick={() => document.getElementById('unlock-pdf-input')?.click()}
        >
          <input
            id="unlock-pdf-input"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-text-main mb-1">
            Upload Password-Protected PDF
          </h3>
          <p className="text-xs sm:text-sm text-text-main/60 max-w-sm mx-auto">
            Upload your e-Aadhaar, Form 16, bank statement, or salary slip PDF (Up to 25 MB).
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Selected File Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-surface border border-surface-darker gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-text-main truncate max-w-xs sm:max-w-md">
                  {file.name}
                </p>
                <p className="text-xs text-text-main/60">
                  {(file.size / 1024).toFixed(1)} KB &bull; Encrypted PDF
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setResult(null);
                setError(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-darker text-xs font-semibold text-text-main/70 hover:text-red-600 hover:border-red-200 transition-all self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change PDF</span>
            </button>
          </div>

          {/* Password Input Block */}
          {!result && (
            <div className="p-5 rounded-2xl bg-surface/60 border border-surface-darker space-y-4">
              {mode === 'aadhaar' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      Official UIDAI e-Aadhaar Password Builder
                    </span>
                    <span className="text-[11px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-md">
                      Format: NAME + YEAR
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-text-main block mb-1">
                        First 4 Letters of Name (Capital)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="e.g. SURE"
                        value={namePrefix}
                        onChange={(e) => setNamePrefix(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-surface-darker text-xs font-mono font-bold tracking-widest text-text-main focus:outline-none focus:border-primary uppercase"
                      />
                      <span className="text-[10px] text-text-main/50 mt-0.5 block">
                        First 4 letters as printed on Aadhaar card
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-text-main block mb-1">
                        Year of Birth (YYYY)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="e.g. 1998"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-surface-darker text-xs font-mono font-bold tracking-widest text-text-main focus:outline-none focus:border-primary"
                      />
                      <span className="text-[10px] text-text-main/50 mt-0.5 block">
                        4-digit birth year (e.g. 2002)
                      </span>
                    </div>
                  </div>

                  {constructedPassword && (
                    <div className="p-2.5 rounded-xl bg-white border border-surface-darker flex items-center justify-between text-xs">
                      <span className="text-text-main/60">Constructed Password:</span>
                      <span className="font-mono font-bold text-primary tracking-wider">
                        {constructedPassword}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-main block">
                    Enter PDF Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Type password..."
                      value={customPassword}
                      onChange={(e) => setCustomPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 rounded-xl bg-white border border-surface-darker text-xs font-mono text-text-main focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-main/50 hover:text-text-main"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Unlock Action Button */}
          {!result && (
            <button
              type="button"
              disabled={processing}
              onClick={handleUnlock}
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
                  <span>Decrypting PDF in RAM ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Remove Password &amp; Unlock PDF (100% Free)</span>
                </>
              )}
            </button>
          )}

          {/* Success Result View */}
          {result && result.is_unlocked && (
            <div className="p-5 sm:p-6 rounded-3xl bg-primary-light/30 border border-primary/20 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-primary/20">
                <div className="flex items-center gap-2.5 text-primary">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-text-main">
                      PDF Successfully Unlocked &amp; Decrypted!
                    </h3>
                    <p className="text-xs text-text-main/70">
                      Encryption permanently removed &bull; Ready for UPSC, SSC &amp; TNPSC upload
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all self-start sm:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Unlocked PDF</span>
                </button>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-white border border-surface-darker">
                  <span className="text-[11px] text-text-main/60 block">Status</span>
                  <span className="font-bold text-primary">Decrypted (Free)</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-surface-darker">
                  <span className="text-[11px] text-text-main/60 block">Pages</span>
                  <span className="font-bold text-text-main">{result.total_pages} Pages</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-surface-darker">
                  <span className="text-[11px] text-text-main/60 block">Encrypted Size</span>
                  <span className="font-bold text-text-main">{result.input_size_kb} KB</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-surface-darker">
                  <span className="text-[11px] text-text-main/60 block">Unlocked Size</span>
                  <span className="font-bold text-primary">{result.output_size_kb} KB</span>
                </div>
              </div>

              {/* Page 1 Preview if available */}
              {result.preview_base64 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-text-main flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    Unlocked Document Preview (Page 1)
                  </span>
                  <div className="rounded-2xl border border-surface-darker bg-white p-3 flex items-center justify-center max-h-[350px] overflow-hidden">
                    <img
                      src={result.preview_base64}
                      alt="Unlocked Document Preview"
                      className="max-h-[330px] object-contain rounded-lg shadow-2xs"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
