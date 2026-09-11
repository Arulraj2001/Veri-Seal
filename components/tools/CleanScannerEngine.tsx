'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  RotateCw,
  Sun,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cleanDocumentScan, CleanScannerResponse, CleanScannerOptions } from '@/lib/api';

export default function CleanScannerEngine() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<CleanScannerOptions['mode']>('magic_color');
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [brightness, setBrightness] = useState<number>(1.0);
  const [contrast, setContrast] = useState<number>(1.0);
  const [targetKb, setTargetKb] = useState<number | undefined>(200);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CleanScannerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
    setResult(null);
    setError(null);
  };

  const handleRotate = () => {
    setRotation((prev) => {
      if (prev === 0) return 90;
      if (prev === 90) return 180;
      if (prev === 180) return 270;
      return 0;
    });
  };

  const handleProcess = async () => {
    if (!selectedFile) {
      setError('Please upload a document photo or PDF first.');
      return;
    }

    setIsLoading(true);
    setProgress(20);
    setError(null);

    try {
      const res = await cleanDocumentScan(selectedFile, {
        mode,
        rotation,
        brightness,
        contrast,
        targetKb,
        outputType: 'both',
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to clean document scan.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownloadImage = () => {
    if (!result?.image_base64) return;
    const link = document.createElement('a');
    link.href = result.image_base64;
    link.download = `cleaned_document_${mode}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPdf = () => {
    if (!result?.pdf_base64) return;
    const link = document.createElement('a');
    link.href = result.pdf_base64;
    link.download = `cleaned_document_${mode}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setRotation(0);
    setBrightness(1.0);
    setContrast(1.0);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-surface-darker/60 shadow-xl p-6 sm:p-8">
      {!result ? (
        <div className="space-y-6">
          {/* File Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) {
                const file = e.dataTransfer.files[0];
                setSelectedFile(file);
                if (file.type.startsWith('image/')) {
                  setPreviewUrl(URL.createObjectURL(file));
                }
                setResult(null);
                setError(null);
              }
            }}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-emerald-50/40 hover:bg-emerald-50/70 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
            />
            {previewUrl ? (
              <div className="flex flex-col items-center">
                <div
                  className="w-36 h-48 rounded-xl shadow-md border-2 border-white overflow-hidden mb-3 transition-transform duration-300"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <img
                    src={previewUrl}
                    alt="Upload Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-bold text-slate-800">{selectedFile?.name}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Click to change document</p>
              </div>
            ) : selectedFile ? (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-slate-800">{selectedFile.name}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Click to replace file</p>
              </div>
            ) : (
              <div>
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  Upload Marksheet, Certificate or Xerox Photo
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Snap a picture with your phone. We eliminate desk shadows, remove yellow bulb tints, and boost ink contrast.
                </p>
              </div>
            )}
          </div>

          {/* Scanner Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Enhancement Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'magic_color',
                  title: 'Magic Color Scan',
                  desc: 'White paper background, keeps color seals & blue/red ink sharp',
                  badge: 'Recommended',
                },
                {
                  id: 'xerox_bw',
                  title: 'High-Contrast Xerox (B&W)',
                  desc: 'Pure black text on pure white paper, eliminates all shadows & creases',
                  badge: 'Photocopy Fix',
                },
                {
                  id: 'greyscale',
                  title: 'Clean Greyscale',
                  desc: 'Crisp monochrome tones for official portal uploads',
                  badge: null,
                },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id as any)}
                  className={`p-3 text-left rounded-2xl border transition-all relative ${
                    mode === m.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  {m.badge && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                      {m.badge}
                    </span>
                  )}
                  <p className="text-xs font-bold text-slate-800">{m.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Controls: Rotation & Target KB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Document Orientation
              </label>
              <button
                type="button"
                onClick={handleRotate}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCw className="w-4 h-4 text-emerald-600" />
                <span>Rotate 90° Clockwise (Current: {rotation}°)</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Target Maximum File Size
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: '< 200KB', val: 200 },
                  { label: '< 300KB', val: 300 },
                  { label: '< 500KB', val: 500 },
                  { label: 'Original', val: undefined },
                ].map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setTargetKb(t.val)}
                    className={`py-2 px-2 text-[11px] font-semibold rounded-xl border transition-all ${
                      targetKb === t.val
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleProcess}
            disabled={!selectedFile || isLoading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Cleaning Shadows & Enhancing ({progress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Clean & Binarize Document Scan</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Result State */
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
              <Sparkles className="w-4 h-4" />
              Document Cleaned & Enhanced
            </span>
            <h3 className="text-2xl font-bold text-slate-800">
              Crisp Scan Ready ({result.output_size_kb} KB)
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Shadows and yellow tints removed. Resolution: {result.width_px} × {result.height_px} px. Ready for portal upload or A4 print.
            </p>
          </div>

          {/* Document Preview */}
          {result.preview_base64 && (
            <div className="max-w-sm mx-auto border border-slate-200 rounded-2xl p-2 bg-slate-50 shadow-inner">
              <img
                src={result.preview_base64}
                alt="Cleaned Document"
                className="w-full h-auto rounded-xl shadow border border-slate-200 max-h-96 object-contain mx-auto"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                Cleaned Preview • High Text Contrast Guaranteed
              </p>
            </div>
          )}

          {/* Download Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {result.pdf_base64 && (
              <button
                onClick={handleDownloadPdf}
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                <span>Download Clean A4 PDF</span>
              </button>
            )}

            <button
              onClick={handleDownloadImage}
              className="py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Download Clean JPEG ({result.output_size_kb} KB)</span>
            </button>

            <button
              onClick={reset}
              className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
            >
              Scan Another Document
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% In-Memory RAM Processing • Scans never saved to disk</span>
          </div>
        </div>
      )}
    </div>
  );
}
