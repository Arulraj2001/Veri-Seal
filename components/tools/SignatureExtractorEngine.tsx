'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  RotateCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  PenTool,
  Check,
} from 'lucide-react';
import {
  extractSignature,
  SignatureExtractorResponse,
  SignatureExtractorOptions,
} from '@/lib/api';
import PreFlightComplianceCard from './PreFlightComplianceCard';

export default function SignatureExtractorEngine() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [inkMode, setInkMode] = useState<SignatureExtractorOptions['inkMode']>('pure_black');
  const [removeLines, setRemoveLines] = useState<boolean>(true);
  const [lineSensitivity, setLineSensitivity] = useState<number>(1.0);
  const [autoCrop, setAutoCrop] = useState<boolean>(true);
  const [targetPreset, setTargetPreset] = useState<SignatureExtractorOptions['targetPreset']>('ssc');
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SignatureExtractorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev === 270 ? 0 : prev + 90));
  };

  const handleProcess = async () => {
    if (!selectedFile) {
      setError('Please upload a signature photo first.');
      return;
    }

    setIsLoading(true);
    setProgress(20);
    setError(null);

    try {
      const res = await extractSignature(selectedFile, {
        inkMode,
        removeLines,
        lineSensitivity,
        autoCrop,
        targetPreset,
        rotation,
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to extract signature.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!result?.image_base64) return;
    const link = document.createElement('a');
    link.href = result.image_base64;
    link.download = `signature_${targetPreset}_official.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 shadow-sm">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
        />

        {!previewUrl ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-10 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <PenTool className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Upload Signature Photo or Phone Scan
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5">
              Works even on lined notebook paper, faint blue ink, or shadowed camera photos.
              Auto-converts to dense black ink with pure white background.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors">
              <Upload className="w-4 h-4" />
              <span>Choose Signature Image</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-darker/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-800 truncate max-w-[200px] sm:max-w-md">
                    {selectedFile?.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {(selectedFile?.size ? selectedFile.size / 1024 : 0).toFixed(1)} KB Original
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRotate}
                  className="px-3 py-1.5 rounded-xl border border-surface-darker/70 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                  title="Rotate 90 degrees"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl border border-surface-darker/70 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Change File</span>
                </button>
              </div>
            </div>

            {/* Side by Side Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Preview */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span>1. Original Phone Photo</span>
                </div>
                <div className="h-44 sm:h-52 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-3 relative">
                  <img
                    src={previewUrl}
                    alt="Original"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              {/* Enhanced Clean Result Preview */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center justify-between">
                  <span>2. Official Clean Signature</span>
                  {result && (
                    <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {result.width_px}×{result.height_px} px • {result.output_size_kb} KB
                    </span>
                  )}
                </div>
                <div className="h-44 sm:h-52 bg-white rounded-2xl border-2 border-emerald-500/40 overflow-hidden flex items-center justify-center p-3 relative shadow-inner">
                  {isLoading ? (
                    <div className="text-center space-y-2">
                      <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                      <p className="text-xs font-bold text-slate-700">
                        Eliminating Lines & Remapping Ink ({progress}%)
                      </p>
                    </div>
                  ) : result?.image_base64 ? (
                    <img
                      src={result.image_base64}
                      alt="Clean Signature"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-slate-400 text-xs">
                      Click "Extract Clean Signature" to process
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tuning Controls */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-5">
              {/* Preset Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Target Government Exam Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'ssc', label: 'SSC CGL / CHSL', sub: '140×60 (10–20KB)' },
                    { id: 'upsc', label: 'UPSC Civil Services', sub: '350×350 (20–50KB)' },
                    { id: 'ibps', label: 'IBPS / Bank PO', sub: '140×60 (10–20KB)' },
                    { id: 'tnpsc', label: 'TNPSC Group 1/2/4', sub: '200×60 (10–20KB)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setTargetPreset(p.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        targetPreset === p.id
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold">{p.label}</div>
                      <div className={`text-[10px] ${targetPreset === p.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {p.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ink Mode Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Ink Color Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'pure_black', label: 'Dense Black', color: 'bg-black text-white' },
                      { id: 'deep_navy', label: 'Deep Navy', color: 'bg-blue-900 text-white' },
                      { id: 'original', label: 'Original Ink', color: 'bg-slate-200 text-slate-800' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setInkMode(mode.id as any)}
                        className={`p-2 rounded-xl text-xs font-bold border text-center transition-all ${
                          inkMode === mode.id
                            ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-100'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-col justify-center space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={removeLines}
                      onChange={(e) => setRemoveLines(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      Remove Ruled Notebook Lines
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoCrop}
                      onChange={(e) => setAutoCrop(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      Auto-Crop to Signature Stroke Boundary
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={handleProcess}
                disabled={isLoading}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Cleaning Signature...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Extract Clean Official Signature</span>
                  </>
                )}
              </button>

              {result?.image_base64 && (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Clean Signature (JPG)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pre-Flight Scorecard */}
      {result && (
        <PreFlightComplianceCard
          portalName={
            targetPreset === 'ssc'
              ? 'Staff Selection Commission (SSC)'
              : targetPreset === 'upsc'
              ? 'Union Public Service Commission (UPSC)'
              : targetPreset === 'ibps'
              ? 'IBPS / Bank PO'
              : 'Government Exam Portal'
          }
          fileSizeKb={result.output_size_kb}
          minKbTarget={result.min_kb_target}
          maxKbTarget={result.max_kb_target}
          widthPx={result.width_px}
          heightPx={result.height_px}
          targetWidth={result.width_px}
          targetHeight={result.height_px}
          dpi={result.dpi}
          colorSpace={result.color_space}
          format={result.format}
        />
      )}
    </div>
  );
}
