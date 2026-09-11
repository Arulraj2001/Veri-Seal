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
  Fingerprint,
  ShieldCheck,
} from 'lucide-react';
import {
  enhanceThumbImpression,
  ThumbImpressionResponse,
  ThumbImpressionOptions,
} from '@/lib/api';
import PreFlightComplianceCard from './PreFlightComplianceCard';

export default function ThumbImpressionEngine() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [portalPreset, setPortalPreset] = useState<ThumbImpressionOptions['portalPreset']>('ibps');
  const [ridgeSharpness, setRidgeSharpness] = useState<number>(1.1);
  const [inkDensity, setInkDensity] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ThumbImpressionResponse | null>(null);
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
      setError('Please upload a thumb impression photo first.');
      return;
    }

    setIsLoading(true);
    setProgress(25);
    setError(null);

    try {
      const res = await enhanceThumbImpression(selectedFile, {
        portalPreset,
        ridgeSharpness,
        inkDensity,
        rotation,
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to enhance thumb impression.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!result?.image_base64) return;
    const link = document.createElement('a');
    link.href = result.image_base64;
    link.download = `thumb_impression_${portalPreset}_240x240.jpg`;
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
              <Fingerprint className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Upload Left Thumb Impression (LTI) Photo
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5">
              Sharpens faint friction ridges, cleans smudges, and budgets strictly to 20KB–50KB
              at 240×240 px for IBPS, SBI, and Railway recruitment.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors">
              <Upload className="w-4 h-4" />
              <span>Choose Thumb Photo</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-darker/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Fingerprint className="w-5 h-5" />
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

            {/* Side-by-Side Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  1. Original Phone Capture
                </div>
                <div className="h-48 sm:h-56 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={previewUrl}
                    alt="Original Thumb"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              {/* Enhanced Result */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center justify-between">
                  <span>2. Enhanced Friction Ridges</span>
                  {result && (
                    <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {result.width_px}×{result.height_px} px • {result.output_size_kb} KB
                    </span>
                  )}
                </div>
                <div className="h-48 sm:h-56 bg-white rounded-2xl border-2 border-emerald-500/40 overflow-hidden flex items-center justify-center p-3 relative shadow-inner">
                  {isLoading ? (
                    <div className="text-center space-y-2">
                      <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                      <p className="text-xs font-bold text-slate-700">
                        Sharpening Papillary Ridges ({progress}%)
                      </p>
                    </div>
                  ) : result?.image_base64 ? (
                    <img
                      src={result.image_base64}
                      alt="Enhanced Thumb"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-slate-400 text-xs">
                      Click "Enhance Thumb Impression" to process
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-5">
              {/* Preset */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Target Recruitment Portal
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'ibps', label: 'IBPS PO & Clerk', sub: '240×240 (20–50KB)' },
                    { id: 'rrb', label: 'Railway RRB', sub: '240×240 (20–50KB)' },
                    { id: 'ssc', label: 'SSC Recruitment', sub: '240×240 (20–50KB)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPortalPreset(p.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        portalPreset === p.id
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold">{p.label}</div>
                      <div className={`text-[10px] ${portalPreset === p.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {p.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Ridge Sharpness</span>
                    <span className="text-emerald-600 font-extrabold">{ridgeSharpness}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.5"
                    step="0.1"
                    value={ridgeSharpness}
                    onChange={(e) => setRidgeSharpness(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Ink Density</span>
                    <span className="text-emerald-600 font-extrabold">{inkDensity}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.4"
                    step="0.1"
                    value={inkDensity}
                    onChange={(e) => setInkDensity(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
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
                    <span>Processing Thumb Ridges...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Enhance Thumb Impression</span>
                  </>
                )}
              </button>

              {result?.image_base64 && (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Clean Thumb (JPG)</span>
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
            portalPreset === 'ibps'
              ? 'IBPS Recruitment Portal'
              : portalPreset === 'rrb'
              ? 'Railway RRB Online'
              : 'Staff Selection Commission (SSC)'
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
