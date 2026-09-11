'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  Download,
  RefreshCw,
  CreditCard,
  Printer,
  FileText,
  AlertCircle,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { generatePvcCardSheet, PvcCardResponse, PvcCardOptions } from '@/lib/api';

export default function PvcCardStudioEngine() {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [trayFormat, setTrayFormat] = useState<PvcCardOptions['trayFormat']>('epson_tray');
  const [includeCuttingGuides, setIncludeCuttingGuides] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<PvcCardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setFrontFile(file);
    setFrontPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setBackFile(file);
    setBackPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleProcess = async () => {
    if (!frontFile || !backFile) {
      setError('Please upload both Front and Back sides of your ID Card.');
      return;
    }

    setIsLoading(true);
    setProgress(25);
    setError(null);

    try {
      const res = await generatePvcCardSheet(frontFile, backFile, {
        trayFormat,
        includeCuttingGuides,
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to generate PVC card tray.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownloadPdf = () => {
    if (!result?.pdf_base64) return;
    const link = document.createElement('a');
    link.href = result.pdf_base64;
    link.download = `pvc_card_${trayFormat}_300dpi.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadImage = () => {
    if (!result?.image_base64) return;
    const link = document.createElement('a');
    link.href = result.image_base64;
    link.download = `pvc_card_${trayFormat}_300dpi.jpg`;
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
          accept="image/*,application/pdf"
          className="hidden"
        />
        <input
          type="file"
          ref={backInputRef}
          onChange={handleBackChange}
          accept="image/*,application/pdf"
          className="hidden"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Front Side */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>1. Front Side (Aadhaar / Voter ID / PAN)</span>
            </label>
            {!frontPreview ? (
              <div
                onClick={() => frontInputRef.current?.click()}
                className="h-44 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all group"
              >
                <Upload className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-xs text-slate-800">Upload Front Card</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Photo, Name & ID Number</div>
              </div>
            ) : (
              <div
                onClick={() => frontInputRef.current?.click()}
                className="h-44 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 cursor-pointer relative group"
              >
                <img src={frontPreview} alt="Front" className="max-h-full max-w-full object-contain rounded shadow-2xs" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity rounded-2xl">
                  Replace Front Side
                </div>
              </div>
            )}
          </div>

          {/* Back Side */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>2. Back Side (Address / QR Code)</span>
            </label>
            {!backPreview ? (
              <div
                onClick={() => backInputRef.current?.click()}
                className="h-44 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all group"
              >
                <Upload className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-xs text-slate-800">Upload Back Card</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Address, QR & Validity</div>
              </div>
            ) : (
              <div
                onClick={() => backInputRef.current?.click()}
                className="h-44 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 cursor-pointer relative group"
              >
                <img src={backPreview} alt="Back" className="max-h-full max-w-full object-contain rounded shadow-2xs" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity rounded-2xl">
                  Replace Back Side
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
                Printer Tray Format
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTrayFormat('epson_tray')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    trayFormat === 'epson_tray'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold">Epson L805 Tray</div>
                  <div className={`text-[10px] ${trayFormat === 'epson_tray' ? 'text-emerald-100' : 'text-slate-500'}`}>
                    Direct Inkjet Dual-Card Tray
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setTrayFormat('a4_sheet')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    trayFormat === 'a4_sheet'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold">A4 Photo Sheet</div>
                  <div className={`text-[10px] ${trayFormat === 'a4_sheet' ? 'text-emerald-100' : 'text-slate-500'}`}>
                    For Thermal Lamination Pouch
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeCuttingGuides}
                  onChange={(e) => setIncludeCuttingGuides(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span className="text-xs font-bold text-slate-700">
                  Include 1px Precision Cutting &amp; Alignment Borders
                </span>
              </label>
              <p className="text-[11px] text-slate-500 mt-1 pl-6">
                Standard CR-80 card geometry (85.60 mm × 53.98 mm) at 300 DPI.
              </p>
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
                <span>Generating 300 DPI Tray Layout ({progress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Print-Ready PVC Tray</span>
              </>
            )}
          </button>

          {result && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPdf}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>Download Print PDF (300 DPI)</span>
              </button>
              <button
                onClick={handleDownloadImage}
                className="px-4 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download JPG</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-surface-darker/60">
            <div>
              <div className="font-bold text-sm text-slate-800">
                Print Tray Layout Preview (300 DPI High-Definition)
              </div>
              <div className="text-xs text-slate-500">
                Exact alignment for {result.tray_format === 'epson_tray' ? 'Epson L805 / Canon PVC Tray' : 'Standard A4 Sheet'}
              </div>
            </div>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {result.width_px} × {result.height_px} px • 300 DPI
            </div>
          </div>

          <div className="max-w-md mx-auto bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-inner">
            <img
              src={result.image_base64}
              alt="PVC Tray Layout"
              className="w-full h-auto rounded-lg shadow-sm border border-slate-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}
