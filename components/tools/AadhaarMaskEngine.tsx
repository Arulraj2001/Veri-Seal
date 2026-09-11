'use client';

import * as React from 'react';
import {
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  Zap,
  Eye,
  Lock,
  Scissors,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { maskAadhaar, type MaskAadhaarResponse } from '@/lib/api';

interface AadhaarMaskEngineProps {
  onDownloadSuccess?: () => void;
}

export function AadhaarMaskEngine({ onDownloadSuccess }: AadhaarMaskEngineProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [maskFirst8, setMaskFirst8] = React.useState<boolean>(true);
  const [maskQr, setMaskQr] = React.useState<boolean>(false);

  const [processing, setProcessing] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [result, setResult] = React.useState<MaskAadhaarResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setResult(null);
      setError(null);
    }
  };

  const handleMask = async () => {
    if (!file) return;
    setProcessing(true);
    setProgress(20);
    setError(null);

    try {
      const res = await maskAadhaar(file, {
        maskFirst8,
        maskQr,
        onProgress: (p) => setProgress(p),
      });
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to mask Aadhaar document. If your PDF is encrypted, unlock it first.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !result.data_base64) return;
    const a = document.createElement('a');
    a.href = result.data_base64;
    const isPdf = result.file_type === 'pdf';
    const ext = isPdf ? 'pdf' : 'jpg';
    const cleanName = file?.name.replace(/\.[^/.]+$/, '') || 'aadhaar';
    a.download = `${cleanName}_masked_official.${ext}`;
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
            <ShieldCheck className="w-5 h-5 text-primary" />
            Official Masked Aadhaar Redactor
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Permanently conceals the first 8 digits (XXXX-XXXX-1234) for UIDAI and RBI KYC compliance.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold self-start sm:self-auto">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>RBI &amp; UIDAI Compliant</span>
        </div>
      </div>

      {/* Upload Zone */}
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-surface-darker hover:border-primary/50 bg-surface/50 hover:bg-surface rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer group"
          onClick={() => document.getElementById('aadhaar-mask-input')?.click()}
        >
          <input
            id="aadhaar-mask-input"
            type="file"
            accept=".pdf,application/pdf,image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-text-main mb-1">
            Upload Aadhaar Card (PDF or Image)
          </h3>
          <p className="text-xs sm:text-sm text-text-main/60 max-w-sm mx-auto">
            Drag and drop your e-Aadhaar PDF or scanned phone photo (JPEG/PNG up to 25 MB).
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Selected File Box */}
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
                  {(file.size / 1024).toFixed(1)} KB &bull; {file.type || 'Document'}
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
              <span>Change File</span>
            </button>
          </div>

          {/* Masking Options */}
          {!result && (
            <div className="p-4 sm:p-5 rounded-2xl bg-surface/60 border border-surface-darker space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider block">
                Redaction Configuration
              </span>

              <div className="space-y-2.5">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-surface-darker cursor-pointer hover:border-primary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={maskFirst8}
                    onChange={(e) => setMaskFirst8(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-text-main block">
                      Mask First 8 Digits (XXXX-XXXX-1234)
                    </span>
                    <span className="text-[11px] text-text-main/60 block">
                      Permanently wipes the first 8 digits so only the authorized last 4 digits remain visible.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-surface-darker cursor-pointer hover:border-primary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={maskQr}
                    onChange={(e) => setMaskQr(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-text-main block">
                      Censor Digital QR Code (Optional)
                    </span>
                    <span className="text-[11px] text-text-main/60 block">
                      Blocks the biometric QR code which contains demographic Aadhaar data.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Mask Action Button */}
          {!result && (
            <button
              type="button"
              disabled={processing}
              onClick={handleMask}
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
                  <span>Sanitizing Aadhaar Data in RAM ({progress}%)...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Generate Official Masked Aadhaar (100% Free)</span>
                </>
              )}
            </button>
          )}

          {/* Success Result View */}
          {result && (
            <div className="p-5 sm:p-6 rounded-3xl bg-primary-light/30 border border-primary/20 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-primary/20">
                <div className="flex items-center gap-2.5 text-primary">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-text-main">
                      Masked Aadhaar Generated Successfully!
                    </h3>
                    <p className="text-xs text-text-main/70">
                      {result.redactions_applied} privacy redactions applied &bull; Underlying text stream purged
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all self-start sm:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Masked {result.file_type.toUpperCase()}</span>
                </button>
              </div>

              {/* Preview Thumbnail */}
              {result.preview_base64 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-text-main flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    Sanitized Preview
                  </span>
                  <div className="rounded-2xl border border-surface-darker bg-white p-3 flex items-center justify-center max-h-[400px] overflow-hidden">
                    <img
                      src={result.preview_base64}
                      alt="Masked Aadhaar Preview"
                      className="max-h-[380px] object-contain rounded-lg shadow-2xs"
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
