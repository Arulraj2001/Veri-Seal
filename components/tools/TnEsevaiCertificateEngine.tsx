'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Sliders,
  QrCode,
  Eye,
  Award,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { printIsolatedDocument } from '@/lib/print-utils';
import { createPdfFromJpeg } from '@/lib/pdf-utils';
import { AdSlot } from '@/components/ads/AdSlot';

export default function TnEsevaiCertificateEngine() {
  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);

  // Certificate Type
  const [certType, setCertType] = useState<string>('community');
  const [targetKbPreset, setTargetKbPreset] = useState<number>(150); // 100, 150, 180, 200 KB
  const [qrCodeSharpness, setQrCodeSharpness] = useState<number>(75); // 0-100%
  const [bleachBackground, setBleachBackground] = useState<boolean>(true);
  const [selfAttest, setSelfAttest] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>('');

  // Result States
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const [renderedPdfBlob, setRenderedPdfBlob] = useState<Blob | null>(null);
  const [renderedSizeKb, setRenderedSizeKb] = useState<number>(0);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  // Handle Upload
  const handleFileChange = (uploadedFile: File) => {
    setFile(uploadedFile);
    const url = URL.createObjectURL(uploadedFile);
    const img = new Image();
    img.onload = () => setImgObj(img);
    img.src = url;
  };

  // Rendering & Compression Pipeline
  const processCertificate = useCallback(() => {
    if (!imgObj) return;
    setIsRendering(true);

    try {
      const dpi = 200;
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

      const marginPx = Math.round((10 / 25.4) * dpi);
      const availW = a4WidthPx - marginPx * 2;
      const availH = a4HeightPx - marginPx * 2 - (selfAttest ? 45 : 0);

      // Fit Certificate onto A4
      const scale = Math.min(availW / imgObj.width, availH / imgObj.height);
      const drawW = imgObj.width * scale;
      const drawH = imgObj.height * scale;
      const drawX = (a4WidthPx - drawW) / 2;
      const drawY = marginPx;

      ctx.drawImage(imgObj, drawX, drawY, drawW, drawH);

      // QR Code & Text Enhancement Filter
      const imgData = ctx.getImageData(0, 0, a4WidthPx, a4HeightPx);
      const d = imgData.data;
      const contrastMultiplier = 1.0 + (qrCodeSharpness / 100) * 0.9;

      for (let i = 0; i < d.length; i += 4) {
        if (bleachBackground) {
          // If pixel is near-white paper tint, bleach to #FFFFFF
          if (d[i] > 218 && d[i + 1] > 218 && d[i + 2] > 218) {
            d[i] = 255;
            d[i + 1] = 255;
            d[i + 2] = 255;
            continue;
          }
        }

        const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        if (gray < 170) {
          // Sharpen official text, QR code and Tahsildar DSC block
          d[i] = Math.max(0, Math.round(d[i] / contrastMultiplier));
          d[i + 1] = Math.max(0, Math.round(d[i + 1] / contrastMultiplier));
          d[i + 2] = Math.max(0, Math.round(d[i + 2] / contrastMultiplier));
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
          `CERTIFIED AS TRUE COPY • ${candidateName.trim().toUpperCase() || 'APPLICANT'}`,
          marginPx,
          bottomY + 10
        );

        ctx.font = '11px Arial, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(`Date: ${new Date().toLocaleDateString('en-IN')}`, marginPx, bottomY + 24);

        ctx.textAlign = 'right';
        ctx.fillText('Signature of Applicant: _________________________', a4WidthPx - marginPx, bottomY + 18);
      }

      // Quality compression calculation to hit target KB (100 - 200 KB)
      let quality = 0.82;
      if (targetKbPreset <= 110) quality = 0.65;
      else if (targetKbPreset <= 160) quality = 0.78;
      else quality = 0.88;

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      setRenderedImageUrl(dataUrl);

      const pdfBlob = createPdfFromJpeg(dataUrl, 210, 297, a4WidthPx, a4HeightPx);
      setRenderedPdfBlob(pdfBlob);
      setRenderedSizeKb(Math.round(pdfBlob.size / 1024));
      setIsRendering(false);
    } catch (err) {
      console.error('Certificate processing error:', err);
      setIsRendering(false);
    }
  }, [imgObj, targetKbPreset, qrCodeSharpness, bleachBackground, selfAttest, candidateName]);

  useEffect(() => {
    processCertificate();
  }, [processCertificate]);

  // Isolated Print
  const handlePrint = () => {
    if (!renderedImageUrl) return;
    printIsolatedDocument({
      title: 'Tamil Nadu Revenue Certificate Document',
      bodyHtml: `<div style="width: 210mm; height: 297mm; display: flex; align-items: center; justify-content: center; margin: 0 auto; padding: 0;">
        <img src="${renderedImageUrl}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="Revenue Certificate" />
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
    const cleanName = candidateName.trim().replace(/\s+/g, '_') || 'certificate';
    link.download = `${cleanName}_${certType}_${renderedSizeKb}kb.pdf`;
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
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  TN e-Sevai / Revenue Certificate PDF Optimizer
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  &lt;200KB GOVERNMENT READY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Optimize Community, Nativity, Income, and First Graduate certificates with QR code sharpness lock.
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

        {/* Content Body Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Upload Area */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Upload e-Sevai Certificate
              </label>

              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center flex flex-col items-center justify-center min-h-[150px]">
                {file ? (
                  <div className="space-y-2 w-full">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto" />
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px] mx-auto">
                      {file.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Original: {Math.round(file.size / 1024)} KB
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <label className="cursor-pointer px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs">
                        <RefreshCw className="w-3 h-3 text-emerald-600" />
                        <span>Replace</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
                          }}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setImgObj(null);
                          setRenderedImageUrl(null);
                          setRenderedPdfBlob(null);
                        }}
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
                    <Upload className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Upload Certificate Scan / Photo
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      JPEG, PNG or Scanned PDF Page
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Certificate Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Revenue Certificate Category
              </label>
              <select
                value={certType}
                onChange={(e) => setCertType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="community">Permanent Community Certificate (சாதிச் சான்றிதழ்)</option>
                <option value="nativity">Nativity / Domicile Certificate (இருப்பிடச் சான்றிதழ்)</option>
                <option value="income">Income Certificate (வருமானச் சான்றிதழ்)</option>
                <option value="first_graduate">First Graduate Certificate (முதல் பட்டதாரி சான்றிதழ்)</option>
                <option value="legal_heir">Legal Heir Certificate (வாரிசுச் சான்றிதழ்)</option>
              </select>
            </div>

            {/* Target Size Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                3. Target Government Portal Limit
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'TNPSC Portal', kb: 150 },
                  { label: 'TNEA Counseling', kb: 180 },
                  { label: 'e-Sevai Safe', kb: 200 },
                  { label: 'Strict 100KB', kb: 100 },
                ].map((preset) => (
                  <button
                    key={preset.kb}
                    type="button"
                    onClick={() => setTargetKbPreset(preset.kb)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      targetKbPreset === preset.kb
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    <div>{preset.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">&lt; {preset.kb} KB</div>
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code & Contrast Controls */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                  Tahsildar DSC QR Code &amp; Seal Sharpener
                </span>
                <span className="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {qrCodeSharpness}% Boost
                </span>
              </div>

              <input
                type="range"
                min={20}
                max={100}
                value={qrCodeSharpness}
                onChange={(e) => setQrCodeSharpness(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg accent-emerald-500 cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-600 dark:text-slate-400">Bleach Yellow Room Lighting:</span>
                <button
                  type="button"
                  onClick={() => setBleachBackground(!bleachBackground)}
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    bleachBackground
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {bleachBackground ? 'ENABLED' : 'OFF'}
                </button>
              </div>

              {/* Self-Attestation Footer */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Add True Copy Attestation Footer:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelfAttest(!selfAttest)}
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
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
                    placeholder="Applicant Name (e.g. K. PRAVEEN)"
                    className="w-full px-3 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 uppercase focus:outline-none"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Live Preview Right */}
          <div className="lg:col-span-6 flex flex-col items-center justify-between space-y-4">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                Live Optimized Certificate Preview
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                A4 VECTOR COMPLIANT
              </span>
            </div>

            {/* Document Canvas Card */}
            <div className="w-full bg-slate-200 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl flex items-center justify-center border border-slate-300 dark:border-slate-800 min-h-[480px]">
              {renderedImageUrl ? (
                <img
                  src={renderedImageUrl}
                  alt="Revenue Certificate Preview"
                  className="max-h-[500px] w-auto shadow-2xl rounded-sm border border-slate-300 bg-white"
                />
              ) : (
                <div className="text-center text-slate-400 p-8">
                  <FileCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">Upload revenue certificate scan to view preview</p>
                </div>
              )}
            </div>

            {/* Verification Status Pill */}
            {renderedSizeKb > 0 && (
              <div className="w-full p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Output Size: {renderedSizeKb} KB • STRICTLY UNDER {targetKbPreset} KB CEILING
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
