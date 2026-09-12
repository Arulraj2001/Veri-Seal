'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Sliders,
  Scissors,
  Layers,
  FileCheck,
  Eye,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { printIsolatedDocument } from '@/lib/print-utils';
import { createPdfFromJpeg } from '@/lib/pdf-utils';
import { AdSlot } from '@/components/ads/AdSlot';

interface CardSlot {
  file: File | null;
  url: string | null;
  img: HTMLImageElement | null;
}

export default function AadhaarFrontBackMergerEngine() {
  // Card Uploads
  const [frontCard, setFrontCard] = useState<CardSlot>({ file: null, url: null, img: null });
  const [backCard, setBackCard] = useState<CardSlot>({ file: null, url: null, img: null });

  // Customization & Layout Controls
  const [layoutMode, setLayoutMode] = useState<'stack' | 'side_by_side' | 'wallet_cutout'>('stack');
  const [maskAadhaar, setMaskAadhaar] = useState<boolean>(true);
  const [maskXPercent, setMaskXPercent] = useState<number>(20);
  const [maskYPercent, setMaskYPercent] = useState<number>(80);
  const [maskWPercent, setMaskWPercent] = useState<number>(45);
  const [maskHPercent, setMaskHPercent] = useState<number>(9);

  const [xeroxMonochrome, setXeroxMonochrome] = useState<boolean>(false);
  const [contrastBoost, setContrastBoost] = useState<number>(40); // 0 - 100%
  const [selfAttestation, setSelfAttestation] = useState<boolean>(true);
  const [applicantName, setApplicantName] = useState<string>('');
  const [kycPurpose, setKycPurpose] = useState<string>('Bank Account KYC / SIM Verification');
  const [targetKb, setTargetKb] = useState<'150kb' | '200kb' | '300kb'>('150kb');

  // Output States
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const [renderedPdfBlob, setRenderedPdfBlob] = useState<Blob | null>(null);
  const [renderedSizeKb, setRenderedSizeKb] = useState<number>(0);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  // File Upload Handlers
  const handleUpload = (side: 'front' | 'back', file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (side === 'front') setFrontCard({ file, url, img });
      else setBackCard({ file, url, img });
    };
    img.src = url;
  };

  // Canvas Rendering Pipeline
  const renderAadhaarSheet = useCallback(() => {
    if (!frontCard.img && !backCard.img) return;
    setIsRendering(true);

    try {
      const dpi = 200; // 200 DPI for fast crisp generation
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

      // Card Dimensions in px (Standard CR-80 card = 85.6mm x 53.98mm)
      // On A4 Xerox, cards are slightly scaled to ~95mm x 60mm for legibility
      const cardScale = layoutMode === 'wallet_cutout' ? 1.0 : 1.15;
      const cardWPx = Math.round(((85.6 * cardScale) / 25.4) * dpi);
      const cardHPx = Math.round(((53.98 * cardScale) / 25.4) * dpi);
      const marginPx = Math.round((16 / 25.4) * dpi);

      // Header on Sheet
      ctx.fillStyle = '#0F172A';
      ctx.font = `bold ${Math.round((11 / 25.4) * dpi)}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('GOVERNMENT OF INDIA • UNIQUE IDENTIFICATION AUTHORITY (UIDAI)', a4WidthPx / 2, marginPx + 15);

      ctx.fillStyle = '#64748B';
      ctx.font = `${Math.round((8 / 25.4) * dpi)}px Arial, sans-serif`;
      ctx.fillText('Official Aadhaar Card Front & Back Verification Copy', a4WidthPx / 2, marginPx + 32);

      let curY = marginPx + 60;

      // Draw Helper function for each card
      const drawCard = (img: HTMLImageElement | null, x: number, y: number, label: string, isFront: boolean) => {
        if (!img) return;

        // Card Border or cut guide
        if (layoutMode === 'wallet_cutout') {
          ctx.strokeStyle = '#94A3B8';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]); // Dashed scissors line
          ctx.strokeRect(x - 4, y - 4, cardWPx + 8, cardHPx + 8);
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = '#E2E8F0';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, cardWPx, cardHPx);
        }

        // Draw image
        ctx.drawImage(img, x, y, cardWPx, cardHPx);

        // Apply Xerox Monochrome or Contrast boost
        const cardImgData = ctx.getImageData(x, y, cardWPx, cardHPx);
        const d = cardImgData.data;
        const contrastFactor = 1.0 + (contrastBoost / 100) * 0.9;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;

          if (xeroxMonochrome) {
            // High contrast photocopy black/white
            const mono = gray < 165 ? 15 : 255;
            d[i] = mono;
            d[i + 1] = mono;
            d[i + 2] = mono;
          } else if (contrastBoost > 0) {
            let enhanced = (gray - 128) * contrastFactor + 128;
            if (enhanced < 0) enhanced = 0;
            if (enhanced > 255) enhanced = 255;
            d[i] = enhanced;
            d[i + 1] = enhanced;
            d[i + 2] = enhanced;
          }
        }
        ctx.putImageData(cardImgData, x, y);

        // UIDAI First 8-Digits Masking on Front Card
        if (isFront && maskAadhaar) {
          const mX = x + Math.round((cardWPx * maskXPercent) / 100);
          const mY = y + Math.round((cardHPx * maskYPercent) / 100);
          const mW = Math.round((cardWPx * maskWPercent) / 100);
          const mH = Math.round((cardHPx * maskHPercent) / 100);

          ctx.fillStyle = '#0F172A';
          ctx.fillRect(mX, mY, mW, mH);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${Math.round(mH * 0.7)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('XXXX XXXX', mX + mW / 2, mY + mH / 2);
        }

        // Label above card
        ctx.fillStyle = '#475569';
        ctx.font = `bold ${Math.round((8 / 25.4) * dpi)}px Arial, sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(label, x, y - 6);
      };

      // Placement based on layout mode
      if (layoutMode === 'stack') {
        // Vertical Stack: Front on top, Back on bottom
        const cardX = (a4WidthPx - cardWPx) / 2;
        const gapY = Math.round((28 / 25.4) * dpi);

        const y1 = curY + 20;
        drawCard(frontCard.img, cardX, y1, 'AADHAAR CARD (FRONT SIDE)', true);

        const y2 = y1 + cardHPx + gapY;
        drawCard(backCard.img, cardX, y2, 'AADHAAR CARD (BACK SIDE)', false);
      } else if (layoutMode === 'side_by_side') {
        // Side-by-side horizontal alignment
        const gapX = Math.round((10 / 25.4) * dpi);
        const totalW = cardWPx * 2 + gapX;
        const startX = (a4WidthPx - totalW) / 2;
        const y = curY + Math.round((30 / 25.4) * dpi);

        drawCard(frontCard.img, startX, y, 'FRONT SIDE', true);
        drawCard(backCard.img, startX + cardWPx + gapX, y, 'BACK SIDE', false);
      } else {
        // Wallet Cutout: Standard CR-80 cards with scissors cut guides
        const cardX = (a4WidthPx - cardWPx) / 2;
        const gapY = Math.round((20 / 25.4) * dpi);

        const y1 = curY + 20;
        drawCard(frontCard.img, cardX, y1, 'FRONT (CR-80 PLASTIC CARD)', true);

        const y2 = y1 + cardHPx + gapY;
        drawCard(backCard.img, cardX, y2, 'BACK (CR-80 PLASTIC CARD)', false);

        // Scissors icon indicator
        ctx.fillStyle = '#64748B';
        ctx.font = `${Math.round((7.5 / 25.4) * dpi)}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('✂ Cut along dashed guides for standard wallet card pouch', a4WidthPx / 2, y2 + cardHPx + 25);
      }

      // Self-Attestation Section at Bottom
      if (selfAttestation) {
        const bottomY = a4HeightPx - Math.round((42 / 25.4) * dpi);
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(marginPx, bottomY - 15);
        ctx.lineTo(a4WidthPx - marginPx, bottomY - 15);
        ctx.stroke();

        ctx.fillStyle = '#0F172A';
        ctx.font = `bold ${Math.round((8.5 / 25.4) * dpi)}px Arial, sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(
          `SELF-ATTESTED FOR: ${kycPurpose.toUpperCase()}`,
          marginPx,
          bottomY + 5
        );

        ctx.font = `${Math.round((8 / 25.4) * dpi)}px Arial, sans-serif`;
        ctx.fillStyle = '#475569';
        ctx.fillText(`Date: ${new Date().toLocaleDateString('en-IN')}`, marginPx, bottomY + 22);
        ctx.fillText(
          `Applicant Name: ${applicantName.trim().toUpperCase() || '________________________'}`,
          marginPx,
          bottomY + 38
        );

        ctx.textAlign = 'right';
        ctx.fillText('Signature of Aadhaar Holder:', a4WidthPx - marginPx, bottomY + 12);
        ctx.fillText('___________________________________', a4WidthPx - marginPx, bottomY + 32);
      }

      // Quality compression for target KB
      let quality = 0.82;
      if (targetKb === '150kb') quality = 0.72;
      else if (targetKb === '200kb') quality = 0.82;
      else quality = 0.9;

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      setRenderedImageUrl(dataUrl);

      const pdfBlob = createPdfFromJpeg(dataUrl, 210, 297, a4WidthPx, a4HeightPx);
      setRenderedPdfBlob(pdfBlob);
      setRenderedSizeKb(Math.round(pdfBlob.size / 1024));
      setIsRendering(false);
    } catch (err) {
      console.error('Aadhaar render error:', err);
      setIsRendering(false);
    }
  }, [
    frontCard,
    backCard,
    layoutMode,
    maskAadhaar,
    maskXPercent,
    maskYPercent,
    maskWPercent,
    maskHPercent,
    xeroxMonochrome,
    contrastBoost,
    selfAttestation,
    applicantName,
    kycPurpose,
    targetKb,
  ]);

  useEffect(() => {
    renderAadhaarSheet();
  }, [renderAadhaarSheet]);

  // Isolated Print
  const handlePrint = () => {
    if (!renderedImageUrl) return;
    printIsolatedDocument({
      title: 'Aadhaar Front & Back Single Page Copy',
      bodyHtml: `<div style="width: 210mm; height: 297mm; display: flex; align-items: center; justify-content: center; margin: 0 auto; padding: 0;">
        <img src="${renderedImageUrl}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="Aadhaar Front Back Copy" />
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
    const cleanName = applicantName.trim().replace(/\s+/g, '_') || 'citizen';
    link.download = `${cleanName}_aadhaar_front_back_${renderedSizeKb}kb.pdf`;
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
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Aadhaar Front + Back Single Page PDF Merger
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 uppercase tracking-wide">
                  &lt;200KB BANK KYC READY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Merge Front &amp; Back of Aadhaar onto 1 single A4 sheet with 8-digit masking and Xerox photocopy mode.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={!renderedImageUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all disabled:opacity-40"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print A4</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={!renderedPdfBlob}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF ({renderedSizeKb} KB)</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Upload Area */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Upload Aadhaar Scans
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Front Card */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center flex flex-col items-center justify-center min-h-[160px]">
                  {frontCard.file ? (
                    <div className="space-y-2 w-full">
                      <CheckCircle2 className="w-6 h-6 text-cyan-500 mx-auto" />
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[160px] mx-auto">
                        {frontCard.file.name}
                      </div>
                      <span className="text-[10px] text-cyan-600 font-bold uppercase block">Front Side Uploaded</span>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <label className="cursor-pointer px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs">
                          <RefreshCw className="w-3 h-3 text-cyan-600" />
                          <span>Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleUpload('front', e.target.files[0]);
                            }}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setFrontCard({ file: null, url: null, img: null })}
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
                      <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        Upload Aadhaar Front
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleUpload('front', e.target.files[0]);
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Back Card */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center flex flex-col items-center justify-center min-h-[160px]">
                  {backCard.file ? (
                    <div className="space-y-2 w-full">
                      <CheckCircle2 className="w-6 h-6 text-cyan-500 mx-auto" />
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[160px] mx-auto">
                        {backCard.file.name}
                      </div>
                      <span className="text-[10px] text-cyan-600 font-bold uppercase block">Back Side Uploaded</span>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <label className="cursor-pointer px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs">
                          <RefreshCw className="w-3 h-3 text-cyan-600" />
                          <span>Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleUpload('back', e.target.files[0]);
                            }}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setBackCard({ file: null, url: null, img: null })}
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
                      <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        Upload Aadhaar Back
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleUpload('back', e.target.files[0]);
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Layout Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Layout Arrangement
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setLayoutMode('stack')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    layoutMode === 'stack'
                      ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-700 dark:text-cyan-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <Layers className="w-4 h-4 mx-auto mb-1" />
                  Vertical Stack
                </button>

                <button
                  type="button"
                  onClick={() => setLayoutMode('side_by_side')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    layoutMode === 'side_by_side'
                      ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-700 dark:text-cyan-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  Side-by-Side
                </button>

                <button
                  type="button"
                  onClick={() => setLayoutMode('wallet_cutout')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    layoutMode === 'wallet_cutout'
                      ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-700 dark:text-cyan-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <Scissors className="w-4 h-4 mx-auto mb-1" />
                  Wallet Cutout
                </button>
              </div>
            </div>

            {/* UIDAI 8-digit Masking & Xerox Controls */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>UIDAI Security &amp; Contrast</span>
                <span className="text-[10px] text-cyan-600 font-extrabold">RBI COMPLIANT</span>
              </div>

              {/* Mask Toggle */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Mask First 8 Digits (XXXX-XXXX-1234):
                </span>
                <button
                  type="button"
                  onClick={() => setMaskAadhaar(!maskAadhaar)}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    maskAadhaar
                      ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {maskAadhaar ? 'MASKED' : 'OFF'}
                </button>
              </div>

              {/* Xerox Binarizer Toggle */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Photocopy Xerox Mode (Ink Saver):
                </span>
                <button
                  type="button"
                  onClick={() => setXeroxMonochrome(!xeroxMonochrome)}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    xeroxMonochrome
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {xeroxMonochrome ? 'MONOCHROME' : 'COLOR'}
                </button>
              </div>

              {/* Self-Attestation Footer */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Add Self-Attestation Box:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelfAttestation(!selfAttestation)}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      selfAttestation
                        ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {selfAttestation ? 'ON' : 'OFF'}
                  </button>
                </div>

                {selfAttestation && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Applicant Name"
                      className="px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 uppercase focus:outline-none"
                    />
                    <input
                      type="text"
                      value={kycPurpose}
                      onChange={(e) => setKycPurpose(e.target.value)}
                      placeholder="Purpose (e.g. Bank KYC)"
                      className="px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview Right */}
          <div className="lg:col-span-6 flex flex-col items-center justify-between space-y-4">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-600" />
                Live Single Page A4 Output Preview
              </span>
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded">
                CR-80 SIZING
              </span>
            </div>

            {/* Document Canvas Card */}
            <div className="w-full bg-slate-200 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl flex items-center justify-center border border-slate-300 dark:border-slate-800 min-h-[480px]">
              {renderedImageUrl ? (
                <img
                  src={renderedImageUrl}
                  alt="Aadhaar KYC Sheet Preview"
                  className="max-h-[500px] w-auto shadow-2xl rounded-sm border border-slate-300 bg-white"
                />
              ) : (
                <div className="text-center text-slate-400 p-8">
                  <CreditCard className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">Upload Front and Back scans of Aadhaar to preview</p>
                </div>
              )}
            </div>

            {/* Status Pill */}
            {renderedSizeKb > 0 && (
              <div className="w-full p-3 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  <span>Output Size: {renderedSizeKb} KB • STRICTLY UNDER 200KB LIMIT</span>
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
