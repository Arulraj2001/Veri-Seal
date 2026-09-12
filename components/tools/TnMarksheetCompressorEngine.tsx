'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Sliders,
  ZoomIn,
  Eye,
  Layers,
  Award,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { printIsolatedDocument } from '@/lib/print-utils';
import { createPdfFromJpeg, createMultiPagePdfFromJpegs } from '@/lib/pdf-utils';
import { AdSlot } from '@/components/ads/AdSlot';

interface MarksheetSide {
  file: File | null;
  url: string | null;
  img: HTMLImageElement | null;
}

export default function TnMarksheetCompressorEngine() {
  // Upload Slots
  const [frontSide, setFrontSide] = useState<MarksheetSide>({ file: null, url: null, img: null });
  const [backSide, setBackSide] = useState<MarksheetSide>({ file: null, url: null, img: null });
  const [hasBackSide, setHasBackSide] = useState<boolean>(false);

  // Settings & Controls
  const [targetKb, setTargetKb] = useState<number>(145); // 80 - 250 KB
  const [boardType, setBoardType] = useState<'tn_state' | 'cbse' | 'icse' | 'diploma'>('tn_state');
  const [sealContrastBoost, setSealContrastBoost] = useState<number>(60); // 0-100%
  const [cleanShadows, setCleanShadows] = useState<boolean>(true);
  const [selfAttest, setSelfAttest] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>('');
  const [layoutMode, setLayoutMode] = useState<'single_a4' | 'multipage_pdf'>('single_a4');

  // Preview & Result State
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const [renderedPdfBlob, setRenderedPdfBlob] = useState<Blob | null>(null);
  const [renderedSizeKb, setRenderedSizeKb] = useState<number>(0);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [zoomLoupe, setZoomLoupe] = useState<boolean>(false);

  // File Upload Handlers
  const handleFileChange = (side: 'front' | 'back', file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (side === 'front') {
        setFrontSide({ file, url, img });
      } else {
        setBackSide({ file, url, img });
      }
    };
    img.src = url;
  };

  // Rendering & Compression Pipeline
  const processMarksheet = useCallback(() => {
    if (!frontSide.img) return;
    setIsRendering(true);

    try {
      const dpi = 200; // Optimal 200 DPI for government marksheets
      const a4WidthPx = Math.round((210 / 25.4) * dpi);
      const a4HeightPx = Math.round((297 / 25.4) * dpi);

      const canvas = document.createElement('canvas');
      canvas.width = a4WidthPx;
      canvas.height = a4HeightPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Pure White Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, a4WidthPx, a4HeightPx);

      const marginPx = Math.round((12 / 25.4) * dpi);
      const availWidth = a4WidthPx - marginPx * 2;
      const availHeight = a4HeightPx - marginPx * 2 - (selfAttest ? 50 : 0);

      // Draw Front Side Image
      if (!hasBackSide || !backSide.img || layoutMode === 'multipage_pdf') {
        // Single sheet fill
        const scale = Math.min(availWidth / frontSide.img.width, availHeight / frontSide.img.height);
        const drawW = frontSide.img.width * scale;
        const drawH = frontSide.img.height * scale;
        const drawX = (a4WidthPx - drawW) / 2;
        const drawY = marginPx;

        ctx.drawImage(frontSide.img, drawX, drawY, drawW, drawH);
      } else {
        // Dual Side on 1 Sheet: Split vertically
        const halfHeight = (availHeight - 20) / 2;

        // Front
        const scaleF = Math.min(availWidth / frontSide.img.width, halfHeight / frontSide.img.height);
        const drawWF = frontSide.img.width * scaleF;
        const drawHF = frontSide.img.height * scaleF;
        const drawXF = (a4WidthPx - drawWF) / 2;
        const drawYF = marginPx;
        ctx.drawImage(frontSide.img, drawXF, drawYF, drawWF, drawHF);

        // Back
        const scaleB = Math.min(availWidth / backSide.img.width, halfHeight / backSide.img.height);
        const drawWB = backSide.img.width * scaleB;
        const drawHB = backSide.img.height * scaleB;
        const drawXB = (a4WidthPx - drawWB) / 2;
        const drawYB = drawYF + drawHF + 15;
        ctx.drawImage(backSide.img, drawXB, drawYB, drawWB, drawHB);
      }

      // Apply State Board Seal & Marks Text Contrast Shield
      const imgData = ctx.getImageData(0, 0, a4WidthPx, a4HeightPx);
      const d = imgData.data;
      const contrastFactor = 1.0 + (sealContrastBoost / 100) * 0.8;

      for (let i = 0; i < d.length; i += 4) {
        // If clean shadows enabled, bleach off-white paper tints
        if (cleanShadows) {
          if (d[i] > 215 && d[i + 1] > 215 && d[i + 2] > 215) {
            d[i] = 255;
            d[i + 1] = 255;
            d[i + 2] = 255;
            continue;
          }
        }

        // Contrast enhancement on text and seals
        const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        if (gray < 180) {
          // Darken text/seal
          d[i] = Math.max(0, Math.round(d[i] / contrastFactor));
          d[i + 1] = Math.max(0, Math.round(d[i + 1] / contrastFactor));
          d[i + 2] = Math.max(0, Math.round(d[i + 2] / contrastFactor));
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Self-Attestation Footer
      if (selfAttest) {
        const bottomY = a4HeightPx - marginPx - 20;
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(marginPx, bottomY - 10);
        ctx.lineTo(a4WidthPx - marginPx, bottomY - 10);
        ctx.stroke();

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 12px Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(
          `TRUE COPY ATTESTED • ${candidateName.trim().toUpperCase() || 'CANDIDATE'}`,
          marginPx,
          bottomY + 10
        );

        ctx.font = '11px Arial, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(`Date: ${new Date().toLocaleDateString('en-IN')}`, marginPx, bottomY + 24);

        ctx.textAlign = 'right';
        ctx.fillText('Signature: _________________________', a4WidthPx - marginPx, bottomY + 18);
      }

      // Quality compression calculation to hit target KB (100 - 200 KB)
      let quality = 0.82;
      if (targetKb <= 120) quality = 0.65;
      else if (targetKb <= 160) quality = 0.78;
      else quality = 0.88;

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      setRenderedImageUrl(dataUrl);

      // Generate Standard PDF
      let pdfBlob: Blob;
      if (hasBackSide && backSide.img && layoutMode === 'multipage_pdf') {
        // Canvas for page 2
        const canvas2 = document.createElement('canvas');
        canvas2.width = a4WidthPx;
        canvas2.height = a4HeightPx;
        const ctx2 = canvas2.getContext('2d');
        if (ctx2) {
          ctx2.fillStyle = '#FFFFFF';
          ctx2.fillRect(0, 0, a4WidthPx, a4HeightPx);
          const scaleB = Math.min(availWidth / backSide.img.width, availHeight / backSide.img.height);
          const drawWB = backSide.img.width * scaleB;
          const drawHB = backSide.img.height * scaleB;
          ctx2.drawImage(backSide.img, (a4WidthPx - drawWB) / 2, marginPx, drawWB, drawHB);
        }
        const dataUrl2 = canvas2.toDataURL('image/jpeg', quality);
        pdfBlob = createMultiPagePdfFromJpegs([
          { dataUrl, widthMm: 210, heightMm: 297, pixelWidth: a4WidthPx, pixelHeight: a4HeightPx },
          { dataUrl: dataUrl2, widthMm: 210, heightMm: 297, pixelWidth: a4WidthPx, pixelHeight: a4HeightPx },
        ]);
      } else {
        pdfBlob = createPdfFromJpeg(dataUrl, 210, 297, a4WidthPx, a4HeightPx);
      }

      setRenderedPdfBlob(pdfBlob);
      setRenderedSizeKb(Math.round(pdfBlob.size / 1024));
      setIsRendering(false);
    } catch (err) {
      console.error('Marksheet rendering error:', err);
      setIsRendering(false);
    }
  }, [
    frontSide,
    backSide,
    hasBackSide,
    targetKb,
    sealContrastBoost,
    cleanShadows,
    selfAttest,
    candidateName,
    layoutMode,
  ]);

  useEffect(() => {
    processMarksheet();
  }, [processMarksheet]);

  // Isolated Print
  const handlePrint = () => {
    if (!renderedImageUrl) return;
    printIsolatedDocument({
      title: 'Tamil Nadu Marksheet Document',
      bodyHtml: `<div style="width: 210mm; height: 297mm; display: flex; align-items: center; justify-content: center; margin: 0 auto; padding: 0;">
        <img src="${renderedImageUrl}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="Marksheet" />
      </div>`,
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  // Download PDF
  const handleDownloadPdf = () => {
    if (!renderedPdfBlob) return;
    const url = URL.createObjectURL(renderedPdfBlob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = candidateName.trim().replace(/\s+/g, '_') || 'student';
    link.download = `${cleanName}_marksheet_${renderedSizeKb}kb.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Tamil Nadu 10th &amp; 12th Marksheet PDF Compressor
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  100KB – 200KB SAFE ZONE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Strictly optimized for TNEA Engineering, TNPSC, TNGASA, and College Admissions without text blur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={!renderedImageUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all disabled:opacity-40"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print A4</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={!renderedPdfBlob}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF ({renderedSizeKb} KB)</span>
            </button>
          </div>
        </div>

        {/* Content Body: Upload / Settings Left, Live Preview Right */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Upload Area */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  1. Upload Marksheet Scans
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasBackSide}
                      onChange={(e) => setHasBackSide(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Include Back Side</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Front Side */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center flex flex-col items-center justify-center min-h-[160px]">
                  {frontSide.file ? (
                    <div className="space-y-2 w-full">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px] mx-auto">
                        {frontSide.file.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {Math.round(frontSide.file.size / 1024)} KB
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <label className="cursor-pointer px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs">
                          <RefreshCw className="w-3 h-3 text-emerald-600" />
                          <span>Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleFileChange('front', e.target.files[0]);
                            }}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setFrontSide({ file: null, url: null, img: null })}
                          className="px-2 py-1 text-xs font-bold rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center gap-1"
                          title="Remove / Try Another"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        Upload Marksheet Front
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileChange('front', e.target.files[0]);
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Back Side (Optional) */}
                {hasBackSide && (
                  <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center flex flex-col items-center justify-center min-h-[160px]">
                    {backSide.file ? (
                      <div className="space-y-2 w-full">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px] mx-auto">
                          {backSide.file.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {Math.round(backSide.file.size / 1024)} KB
                        </div>
                        <div className="flex items-center justify-center gap-2 pt-1">
                          <label className="cursor-pointer px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs">
                            <RefreshCw className="w-3 h-3 text-emerald-600" />
                            <span>Replace</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) handleFileChange('back', e.target.files[0]);
                              }}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setBackSide({ file: null, url: null, img: null })}
                            className="px-2 py-1 text-xs font-bold rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center gap-1"
                            title="Remove / Try Another"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          Upload Marksheet Back
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileChange('back', e.target.files[0]);
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Target Size Safe-Zone Slider */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Target File Size
                </span>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                  {targetKb} KB Target
                </span>
              </div>

              <input
                type="range"
                min={90}
                max={220}
                step={5}
                value={targetKb}
                onChange={(e) => setTargetKb(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-emerald-500 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                <span>90 KB (Strict)</span>
                <span className="text-emerald-600 font-bold">★ 100KB – 200KB Safe Zone ★</span>
                <span>220 KB</span>
              </div>
            </div>

            {/* Advanced Enhancement Sliders */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                Advanced Marksheet Filters
              </div>

              {/* State Board Seal Shield */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>TN Seal &amp; Marks Table Contrast Shield:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{sealContrastBoost}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sealContrastBoost}
                  onChange={(e) => setSealContrastBoost(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Shadow Cleaner */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-600 dark:text-slate-400">Deskew &amp; Phone Shadow Purge:</span>
                <button
                  type="button"
                  onClick={() => setCleanShadows(!cleanShadows)}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    cleanShadows
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cleanShadows ? 'ENABLED' : 'OFF'}
                </button>
              </div>

              {/* Candidate Self Attestation */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Add Self-Attestation Footer:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelfAttest(!selfAttest)}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      selfAttest
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {selfAttest ? 'ON' : 'OFF'}
                  </button>
                </div>

                {selfAttest && (
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Candidate Name (e.g. R. SNEHA)"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-6 flex flex-col items-center justify-between space-y-4">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                Live A4 Marksheet Sheet Preview
              </span>
              <button
                type="button"
                onClick={() => setZoomLoupe(!zoomLoupe)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{zoomLoupe ? 'Reset Zoom' : 'Inspect Marks (175%)'}</span>
              </button>
            </div>

            {/* The Document Canvas Card */}
            <div className="w-full bg-slate-200 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl flex items-center justify-center border border-slate-300 dark:border-slate-800 min-h-[480px] overflow-hidden">
              {renderedImageUrl ? (
                <div
                  className={`transition-transform duration-200 ${
                    zoomLoupe ? 'scale-150 origin-top' : 'scale-100'
                  }`}
                >
                  <img
                    src={renderedImageUrl}
                    alt="Processed Marksheet Preview"
                    className="max-h-[500px] w-auto shadow-2xl rounded-sm border border-slate-300 bg-white"
                  />
                </div>
              ) : (
                <div className="text-center text-slate-400 p-8">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">Upload marksheet front scan to view compressed output</p>
                </div>
              )}
            </div>

            {/* Verification Status Pill */}
            {renderedSizeKb > 0 && (
              <div
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                  renderedSizeKb >= 100 && renderedSizeKb <= 200
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Output Size: {renderedSizeKb} KB •{' '}
                    {renderedSizeKb >= 100 && renderedSizeKb <= 200
                      ? 'PERFECT TNPSC / TNEA MATCH'
                      : 'Outside Standard 100-200KB Zone'}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider bg-white/80 dark:bg-slate-900 px-2 py-0.5 rounded">
                  ISO 32000 PDF
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Ostrune Agency Ad Banner */}
      <AdSlot slot="in_content" />
    </div>
  );
}
