'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  RotateCw,
  Download,
  RefreshCw,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { mergeIdCards, CardMergerResponse, CardMergerOptions } from '@/lib/api';
import PreFlightComplianceCard from './PreFlightComplianceCard';

export default function CardMergerEngine() {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [frontRotation, setFrontRotation] = useState<number>(0);
  const [backRotation, setBackRotation] = useState<number>(0);
  const [layout, setLayout] = useState<CardMergerOptions['layout']>('stacked');
  const [targetKb, setTargetKb] = useState<number>(200);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CardMergerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setFrontFile(file);
    setFrontPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setBackFile(file);
    setBackPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!frontFile || !backFile) {
      setError('Please upload both Front and Back photos of your Driving License / RC Card.');
      return;
    }

    setIsLoading(true);
    setProgress(20);
    setError(null);

    try {
      const res = await mergeIdCards(frontFile, backFile, {
        layout,
        frontRotation,
        backRotation,
        targetKb,
        outputFormat: 'both',
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to merge smart card sides.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownloadPdf = () => {
    if (!result?.pdf_base64) return;
    const link = document.createElement('a');
    link.href = result.pdf_base64;
    link.download = `driving_license_single_page_${targetKb}kb.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadImage = () => {
    if (!result?.image_base64) return;
    const link = document.createElement('a');
    link.href = result.image_base64;
    link.download = `driving_license_merged_a4.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Upload Dual Dropzone */}
      <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 shadow-sm">
        <input
          type="file"
          ref={frontInputRef}
          onChange={handleFrontChange}
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
        />
        <input
          type="file"
          ref={backInputRef}
          onChange={handleBackChange}
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Front Side Upload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>1. FRONT SIDE (முன்பக்கம்)</span>
              </span>
              {frontPreview && (
                <button
                  onClick={() => setFrontRotation((p) => (p === 270 ? 0 : p + 90))}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[11px] font-bold text-slate-600 inline-flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Rotate</span>
                </button>
              )}
            </div>

            {!frontPreview ? (
              <div
                onClick={() => frontInputRef.current?.click()}
                className="h-44 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all group"
              >
                <Upload className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-xs text-slate-800">Upload Front Side</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Photo, DL Number & Name</div>
              </div>
            ) : (
              <div
                onClick={() => frontInputRef.current?.click()}
                className="h-44 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 relative cursor-pointer group"
              >
                <img
                  src={frontPreview}
                  alt="Front Side"
                  style={{ transform: `rotate(${frontRotation}deg)` }}
                  className="max-h-full max-w-full object-contain rounded shadow-2xs"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity rounded-2xl">
                  Click to Replace Front
                </div>
              </div>
            )}
          </div>

          {/* Back Side Upload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>2. BACK SIDE (பின்பக்கம்)</span>
              </span>
              {backPreview && (
                <button
                  onClick={() => setBackRotation((p) => (p === 270 ? 0 : p + 90))}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[11px] font-bold text-slate-600 inline-flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Rotate</span>
                </button>
              )}
            </div>

            {!backPreview ? (
              <div
                onClick={() => backInputRef.current?.click()}
                className="h-44 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all group"
              >
                <Upload className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-xs text-slate-800">Upload Back Side</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Vehicle Classes, Address & QR</div>
              </div>
            ) : (
              <div
                onClick={() => backInputRef.current?.click()}
                className="h-44 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 relative cursor-pointer group"
              >
                <img
                  src={backPreview}
                  alt="Back Side"
                  style={{ transform: `rotate(${backRotation}deg)` }}
                  className="max-h-full max-w-full object-contain rounded shadow-2xs"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity rounded-2xl">
                  Click to Replace Back
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                A4 Page Card Layout
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setLayout('stacked')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    layout === 'stacked'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="font-bold">Stacked Vertical</div>
                  <div className={`text-[10px] ${layout === 'stacked' ? 'text-emerald-100' : 'text-slate-500'}`}>
                    Top & Bottom (Standard)
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setLayout('side_by_side')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    layout === 'side_by_side'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="font-bold">Side by Side</div>
                  <div className={`text-[10px] ${layout === 'side_by_side' ? 'text-emerald-100' : 'text-slate-500'}`}>
                    Left & Right (Compact)
                  </div>
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Parivahan Target Size Limit</span>
                <span className="text-emerald-600 font-extrabold">&lt; {targetKb} KB</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[100, 200, 300].map((kb) => (
                  <button
                    key={kb}
                    type="button"
                    onClick={() => setTargetKb(kb)}
                    className={`py-2 px-3 rounded-xl border font-bold transition-all ${
                      targetKb === kb
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    &lt; {kb} KB {kb === 200 && '★ Sarathi'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleProcess}
            disabled={isLoading || !frontFile || !backFile}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Aligning & Compressing to &lt;{targetKb}KB...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Merge Both Sides into 1 Page</span>
              </>
            )}
          </button>

          {result && (
            <div className="flex items-center gap-3">
              {result.pdf_base64 && (
                <button
                  onClick={handleDownloadPdf}
                  className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Download Parivahan PDF (&lt;{result.target_kb}KB)</span>
                </button>
              )}
              {result.image_base64 && (
                <button
                  onClick={handleDownloadImage}
                  className="px-4 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JPG</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Result Preview & Compliance */}
      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-darker/60">
              <div className="font-bold text-sm text-slate-800">
                Single-Page A4 Preview (Parivahan Ready)
              </div>
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {result.output_size_kb} KB • Strictly under {result.target_kb} KB Limit
              </div>
            </div>
            <div className="max-w-md mx-auto bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-inner">
              <img
                src={result.image_base64}
                alt="Merged Driving License"
                className="w-full h-auto rounded-lg shadow-sm border border-slate-200"
              />
            </div>
          </div>

          <PreFlightComplianceCard
            portalName="Parivahan Sarathi / RTO Portal"
            fileSizeKb={result.output_size_kb}
            minKbTarget={10}
            maxKbTarget={result.target_kb}
            widthPx={result.width_px}
            heightPx={result.height_px}
            format="PDF & JPEG"
          />
        </div>
      )}
    </div>
  );
}
