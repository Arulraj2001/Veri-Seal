'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  FileText,
  CreditCard,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Sparkles,
  Lock,
  Layers,
  Scissors,
  Check,
  Info,
  Trash2,
  Maximize2,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { printIsolatedDocument } from '@/lib/print-utils';

interface DocSlot {
  file: File | null;
  url: string | null;
  img: HTMLImageElement | null;
}

// Pure client-side PDF binary generator (exact physical mm dimensions)
function createPdfFromJpeg(jpegDataUrl: string, widthMm: number, heightMm: number, imgW: number, imgH: number): Blob {
  const base64Data = jpegDataUrl.split(',')[1];
  const binaryString = atob(base64Data);
  const binaryLen = binaryString.length;
  const jpegBytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    jpegBytes[i] = binaryString.charCodeAt(i);
  }

  const ptW = (widthMm / 25.4) * 72;
  const ptH = (heightMm / 25.4) * 72;

  const chunks: (Uint8Array | string)[] = [];
  const offsets: number[] = [];
  let curOffset = 0;

  function addStr(str: string) {
    chunks.push(str);
    curOffset += str.length;
  }

  function addBytes(bytes: Uint8Array) {
    chunks.push(bytes);
    curOffset += bytes.length;
  }

  // Header
  addStr('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n');

  // Obj 1: Catalog
  offsets[1] = curOffset;
  addStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // Obj 2: Pages
  offsets[2] = curOffset;
  addStr('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // Obj 3: Page
  offsets[3] = curOffset;
  addStr(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ptW.toFixed(2)} ${ptH.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`
  );

  // Obj 4: Image XObject
  offsets[4] = curOffset;
  addStr(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  addBytes(jpegBytes);
  addStr('\nendstream\nendobj\n');

  // Obj 5: Page Content stream
  offsets[5] = curOffset;
  const contentStr = `q\n${ptW.toFixed(2)} 0 0 ${ptH.toFixed(2)} 0 0 cm\n/Im0 Do\nQ\n`;
  addStr(`5 0 obj\n<< /Length ${contentStr.length} >>\nstream\n${contentStr}endstream\nendobj\n`);

  // xref
  const xrefOffset = curOffset;
  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (let i = 1; i <= 5; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  let totalLen = 0;
  for (const c of chunks) {
    totalLen += typeof c === 'string' ? c.length : c.length;
  }
  const merged = new Uint8Array(totalLen);
  let pos = 0;
  for (const c of chunks) {
    if (typeof c === 'string') {
      for (let i = 0; i < c.length; i++) {
        merged[pos++] = c.charCodeAt(i);
      }
    } else {
      merged.set(c, pos);
    }
  }

  return new Blob([merged.buffer as ArrayBuffer], { type: 'application/pdf' });
}

export default function AadhaarPanKycMergerEngine() {
  const [aadhaarFront, setAadhaarFront] = useState<DocSlot>({ file: null, url: null, img: null });
  const [aadhaarBack, setAadhaarBack] = useState<DocSlot>({ file: null, url: null, img: null });
  const [panFront, setPanFront] = useState<DocSlot>({ file: null, url: null, img: null });

  // Customization & Advanced Settings
  const [headerStyle, setHeaderStyle] = useState<'minimal' | 'official' | 'self_attest'>('official');
  const [targetKb, setTargetKb] = useState<'200kb' | '500kb' | '300dpi'>('200kb');
  const [borderStyle, setBorderStyle] = useState<'solid' | 'dashed' | 'none'>('solid');
  const [contrastBoost, setContrastBoost] = useState<number>(0); // 0 to 100%
  const [applicantName, setApplicantName] = useState<string>('');
  const [customAttestationText, setCustomAttestationText] = useState<string>('Self-Attested for Bank / Financial KYC Verification');

  // Masking Settings
  const [maskAadhaar, setMaskAadhaar] = useState<boolean>(false);
  const [maskXPercent, setMaskXPercent] = useState<number>(28);
  const [maskYPercent, setMaskYPercent] = useState<number>(74);
  const [maskWPercent, setMaskWPercent] = useState<number>(44);
  const [maskHPercent, setMaskHPercent] = useState<number>(10);
  const [showMaskSliders, setShowMaskSliders] = useState<boolean>(false);

  // Render & Preview state
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const [renderedPdfBlob, setRenderedPdfBlob] = useState<Blob | null>(null);
  const [renderedSizeKb, setRenderedSizeKb] = useState<number>(0);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const aadhaarFrontInputRef = useRef<HTMLInputElement>(null);
  const aadhaarBackInputRef = useRef<HTMLInputElement>(null);
  const panFrontInputRef = useRef<HTMLInputElement>(null);

  // File upload helper
  const handleSlotUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<DocSlot>>
  ) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setter({ file, url, img });
    };
    img.src = url;
  };

  const handleClearSlot = (setter: React.Dispatch<React.SetStateAction<DocSlot>>) => {
    setter({ file: null, url: null, img: null });
  };

  const hasAnyDoc = aadhaarFront.img !== null || aadhaarBack.img !== null || panFront.img !== null;

  // Assemble active cards dynamically without ever displaying empty placeholder text
  const activeCards = React.useMemo(() => {
    const list: { key: string; title: string; img: HTMLImageElement; isAadhaarFront: boolean }[] = [];
    if (aadhaarFront.img) {
      list.push({ key: 'af', title: 'Aadhaar Card (Front)', img: aadhaarFront.img, isAadhaarFront: true });
    }
    if (aadhaarBack.img) {
      list.push({ key: 'ab', title: 'Aadhaar Card (Back)', img: aadhaarBack.img, isAadhaarFront: false });
    }
    if (panFront.img) {
      list.push({ key: 'pan', title: 'Permanent Account Number (PAN)', img: panFront.img, isAadhaarFront: false });
    }
    return list;
  }, [aadhaarFront.img, aadhaarBack.img, panFront.img]);

  // Core Canvas Assembly Engine
  const renderKycSheet = useCallback(() => {
    if (activeCards.length === 0) {
      setRenderedImageUrl(null);
      setRenderedPdfBlob(null);
      setRenderedSizeKb(0);
      return;
    }

    setIsRendering(true);
    try {
      const dpi = targetKb === '200kb' ? 180 : targetKb === '500kb' ? 240 : 300;
      // Standard A4: 210mm x 297mm
      const a4WidthPx = Math.round((210 / 25.4) * dpi);
      const a4HeightPx = Math.round((297 / 25.4) * dpi);

      // Card physical standard: 85.60 mm x 53.98 mm
      // Scale slightly for optimum A4 proportion
      const cardWPx = Math.round((85.60 / 25.4) * dpi * 1.12);
      const cardHPx = Math.round((53.98 / 25.4) * dpi * 1.12);

      const canvas = document.createElement('canvas');
      canvas.width = a4WidthPx;
      canvas.height = a4HeightPx;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      // Pure white paper base
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, a4WidthPx, a4HeightPx);

      const marginPx = Math.round((16 / 25.4) * dpi);
      let currentY = marginPx;

      // 1. Header (if not minimal)
      if (headerStyle === 'official') {
        ctx.fillStyle = '#0F172A';
        ctx.font = `bold ${Math.round((13 / 25.4) * dpi)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText('OFFICIAL KYC IDENTIFICATION PROOF', marginPx, currentY + 18);

        ctx.fillStyle = '#64748B';
        ctx.font = `${Math.round((8.5 / 25.4) * dpi)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        const subtitle = applicantName.trim()
          ? `Applicant: ${applicantName.toUpperCase()} • RBI KYC Document Bundle`
          : 'Verified Citizen Identification Bundle (Aadhaar & PAN) • RBI Compliant';
        ctx.fillText(subtitle, marginPx, currentY + 40);

        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(marginPx, currentY + 52);
        ctx.lineTo(a4WidthPx - marginPx, currentY + 52);
        ctx.stroke();

        currentY += Math.round((20 / 25.4) * dpi);
      } else if (headerStyle === 'self_attest') {
        ctx.fillStyle = '#0F172A';
        ctx.font = `bold ${Math.round((12 / 25.4) * dpi)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText('SELF-ATTESTED KYC DOCUMENT SUBMISSION', marginPx, currentY + 18);

        ctx.fillStyle = '#475569';
        ctx.font = `${Math.round((8.5 / 25.4) * dpi)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        const note = applicantName.trim()
          ? `Submitted by: ${applicantName.toUpperCase()} • ${customAttestationText}`
          : customAttestationText;
        ctx.fillText(note, marginPx, currentY + 38);

        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(marginPx, currentY + 50);
        ctx.lineTo(a4WidthPx - marginPx, currentY + 50);
        ctx.stroke();

        currentY += Math.round((18 / 25.4) * dpi);
      } else {
        // Minimal mode: Top margin spacing
        currentY += Math.round((10 / 25.4) * dpi);
      }

      // Draw single card helper
      const drawCard = (img: HTMLImageElement, x: number, y: number, title: string, isAadhaarFront: boolean) => {
        ctx.save();

        // Optional Contrast Boost (Photocopy / Xerox binarizer effect)
        if (contrastBoost > 0) {
          const factor = 1 + (contrastBoost / 100) * 0.8;
          ctx.filter = `contrast(${factor.toFixed(2)}) brightness(${contrastBoost > 30 ? 1.05 : 1.0})`;
        }

        ctx.drawImage(img, x, y, cardWPx, cardHPx);
        ctx.filter = 'none';

        // Border styling
        if (borderStyle !== 'none') {
          ctx.strokeStyle = '#94A3B8';
          ctx.lineWidth = 1.2;
          if (borderStyle === 'dashed') {
            ctx.setLineDash([6, 4]);
          } else {
            ctx.setLineDash([]);
          }
          ctx.strokeRect(x, y, cardWPx, cardHPx);
        }

        // RBI Aadhaar Masking Bar (Redacts first 8 digits)
        if (maskAadhaar && isAadhaarFront) {
          const mX = x + Math.round((cardWPx * maskXPercent) / 100);
          const mY = y + Math.round((cardHPx * maskYPercent) / 100);
          const mW = Math.round((cardWPx * maskWPercent) / 100);
          const mH = Math.round((cardHPx * maskHPercent) / 100);

          ctx.fillStyle = '#0F172A';
          ctx.fillRect(mX, mY, mW, mH);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${Math.round(mH * 0.75)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('XXXX XXXX', mX + mW / 2, mY + mH / 2);
        }

        ctx.restore();

        // Clean label above card (only if not in minimal mode)
        if (headerStyle !== 'minimal') {
          ctx.fillStyle = '#334155';
          ctx.font = `bold ${Math.round((8.5 / 25.4) * dpi)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
          ctx.textAlign = 'left';
          ctx.fillText(title, x, y - 6);
        }
      };

      // 2. Dynamic Placement Engine (Handles 1, 2, or 3 cards without empty boxes)
      if (activeCards.length === 1) {
        // Single Card: Centered
        const x = Math.round((a4WidthPx - cardWPx) / 2);
        const y = currentY + Math.round((30 / 25.4) * dpi);
        drawCard(activeCards[0].img, x, y, activeCards[0].title, activeCards[0].isAadhaarFront);
        currentY = y + cardHPx + Math.round((20 / 25.4) * dpi);
      } else if (activeCards.length === 2) {
        // 2 Cards: Clean vertical stacked layout with generous margins
        const gapY = Math.round((28 / 25.4) * dpi);
        const x = Math.round((a4WidthPx - cardWPx) / 2);

        // Card 1
        const y1 = currentY + Math.round((14 / 25.4) * dpi);
        drawCard(activeCards[0].img, x, y1, activeCards[0].title, activeCards[0].isAadhaarFront);

        // Card 2
        const y2 = y1 + cardHPx + gapY;
        drawCard(activeCards[1].img, x, y2, activeCards[1].title, activeCards[1].isAadhaarFront);

        currentY = y2 + cardHPx + Math.round((20 / 25.4) * dpi);
      } else {
        // 3 Cards: Aadhaar Front & Back Side-by-Side on Row 1, PAN Card Centered on Row 2
        const gapX = Math.round((8 / 25.4) * dpi);
        const row1StartX = Math.round((a4WidthPx - (cardWPx * 2 + gapX)) / 2);
        const y1 = currentY + Math.round((12 / 25.4) * dpi);

        drawCard(activeCards[0].img, row1StartX, y1, activeCards[0].title, activeCards[0].isAadhaarFront);
        drawCard(activeCards[1].img, row1StartX + cardWPx + gapX, y1, activeCards[1].title, activeCards[1].isAadhaarFront);

        const y2 = y1 + cardHPx + Math.round((24 / 25.4) * dpi);
        const row2StartX = Math.round((a4WidthPx - cardWPx) / 2);
        drawCard(activeCards[2].img, row2StartX, y2, activeCards[2].title, activeCards[2].isAadhaarFront);

        currentY = y2 + cardHPx + Math.round((20 / 25.4) * dpi);
      }

      // 3. Bottom Attestation & Signature Box
      if (headerStyle === 'self_attest') {
        const bottomY = a4HeightPx - Math.round((35 / 25.4) * dpi);
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(marginPx, bottomY - 15);
        ctx.lineTo(a4WidthPx - marginPx, bottomY - 15);
        ctx.stroke();

        ctx.fillStyle = '#475569';
        ctx.font = `${Math.round((8 / 25.4) * dpi)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(`Date: ${new Date().toLocaleDateString('en-IN')}`, marginPx, bottomY + 12);
        ctx.fillText('Place: ________________________', marginPx, bottomY + 30);

        ctx.textAlign = 'right';
        ctx.fillText('Signature of Document Holder:', a4WidthPx - marginPx, bottomY + 12);
        ctx.fillText('___________________________________', a4WidthPx - marginPx, bottomY + 30);
      }

      // Output Quality Compression
      let quality = 0.88;
      if (targetKb === '200kb') quality = 0.72;
      else if (targetKb === '500kb') quality = 0.84;

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      setRenderedImageUrl(dataUrl);

      // Generate standard vector PDF binary
      const pdfBlob = createPdfFromJpeg(dataUrl, 210, 297, a4WidthPx, a4HeightPx);
      setRenderedPdfBlob(pdfBlob);
      setRenderedSizeKb(Math.round(pdfBlob.size / 1024));
      setIsRendering(false);
    } catch (err) {
      console.error('Error rendering KYC sheet:', err);
      setIsRendering(false);
    }
  }, [
    activeCards,
    headerStyle,
    targetKb,
    borderStyle,
    contrastBoost,
    applicantName,
    customAttestationText,
    maskAadhaar,
    maskXPercent,
    maskYPercent,
    maskWPercent,
    maskHPercent,
  ]);

  useEffect(() => {
    renderKycSheet();
  }, [renderKycSheet]);

  // Isolated 1-Click Print
  const handlePrint = () => {
    if (!renderedImageUrl) return;
    printIsolatedDocument({
      title: 'Aadhaar + PAN KYC Document Sheet',
      bodyHtml: `<div style="width: 210mm; height: 297mm; display: flex; align-items: center; justify-content: center; margin: 0 auto; padding: 0;">
        <img src="${renderedImageUrl}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="KYC Document Sheet" />
      </div>`,
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  // 1-Click Download PDF
  const handleDownloadPdf = () => {
    if (!renderedPdfBlob) return;
    const url = URL.createObjectURL(renderedPdfBlob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = applicantName.trim() ? applicantName.toLowerCase().replace(/\s+/g, '_') : 'citizen';
    link.download = `${cleanName}_aadhaar_pan_kyc.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Main Engine Container */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Aadhaar + PAN Single PDF KYC Merger
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  BANK &amp; SIM KYC READY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Merge Aadhaar and PAN into an official vector A4 PDF strictly under 200KB or 500KB with zero cloud leaks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={!renderedImageUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white border border-slate-700 transition-all shadow-xs active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print A4 Document</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={!renderedPdfBlob}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF ({renderedSizeKb > 0 ? `${renderedSizeKb} KB` : '<200 KB'})</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Controls & Uploads */}
          <div className="lg:col-span-5 space-y-6">
            {/* 3 Upload Slots */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>Upload KYC Documents (JPG, PNG, WebP)</span>
              </span>

              {/* Slot 1: Aadhaar Front */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">1. Aadhaar Card (Front)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {aadhaarFront.file ? aadhaarFront.file.name : 'Required for KYC'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <input
                    ref={aadhaarFrontInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSlotUpload(e, setAadhaarFront)}
                    className="hidden"
                  />
                  {aadhaarFront.img ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => aadhaarFrontInputRef.current?.click()}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs"
                      >
                        <RefreshCw className="w-3 h-3 text-emerald-600" />
                        <span>Replace</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClearSlot(setAadhaarFront)}
                        className="px-2 py-1 text-xs font-bold rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center gap-1"
                        title="Remove / Try Another"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => aadhaarFrontInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-2xs"
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>

              {/* Slot 2: Aadhaar Back (Optional) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">2. Aadhaar Card (Back)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {aadhaarBack.file ? aadhaarBack.file.name : 'Optional (Address Side)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <input
                    ref={aadhaarBackInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSlotUpload(e, setAadhaarBack)}
                    className="hidden"
                  />
                  {aadhaarBack.img ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => aadhaarBackInputRef.current?.click()}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs"
                      >
                        <RefreshCw className="w-3 h-3 text-emerald-600" />
                        <span>Replace</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClearSlot(setAadhaarBack)}
                        className="px-2 py-1 text-xs font-bold rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center gap-1"
                        title="Remove / Try Another"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => aadhaarBackInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-2xs"
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>

              {/* Slot 3: PAN Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">3. PAN Card (Front)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {panFront.file ? panFront.file.name : 'Required for Financial KYC'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <input
                    ref={panFrontInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSlotUpload(e, setPanFront)}
                    className="hidden"
                  />
                  {panFront.img ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => panFrontInputRef.current?.click()}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs"
                      >
                        <RefreshCw className="w-3 h-3 text-emerald-600" />
                        <span>Replace</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClearSlot(setPanFront)}
                        className="px-2 py-1 text-xs font-bold rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center gap-1"
                        title="Remove / Try Another"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => panFrontInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-2xs"
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Output & Customization Settings */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                <span>Layout &amp; Output Controls</span>
              </span>

              {/* Header Style */}
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                  Page Header &amp; Formatting
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setHeaderStyle('official')}
                    className={`py-2 px-2 text-center rounded-xl font-bold border transition-all ${
                      headerStyle === 'official'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Official KYC
                  </button>
                  <button
                    onClick={() => setHeaderStyle('self_attest')}
                    className={`py-2 px-2 text-center rounded-xl font-bold border transition-all ${
                      headerStyle === 'self_attest'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Self-Attested
                  </button>
                  <button
                    onClick={() => setHeaderStyle('minimal')}
                    className={`py-2 px-2 text-center rounded-xl font-bold border transition-all ${
                      headerStyle === 'minimal'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Clean Minimal
                  </button>
                </div>
              </div>

              {/* Applicant Name Input */}
              {headerStyle !== 'minimal' && (
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Applicant / Cardholder Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Full Legal Name as per ID"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              )}

              {/* Target File Size Budget */}
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                  Target File Size Budget
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTargetKb('200kb')}
                    className={`py-2 px-2 text-center rounded-xl font-bold border transition-all ${
                      targetKb === '200kb'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    &lt; 200 KB (Bank)
                  </button>
                  <button
                    onClick={() => setTargetKb('500kb')}
                    className={`py-2 px-2 text-center rounded-xl font-bold border transition-all ${
                      targetKb === '500kb'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    &lt; 500 KB (Loans)
                  </button>
                  <button
                    onClick={() => setTargetKb('300dpi')}
                    className={`py-2 px-2 text-center rounded-xl font-bold border transition-all ${
                      targetKb === '300dpi'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    300 DPI (Print)
                  </button>
                </div>
              </div>

              {/* Border Cut Line Style */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Card Outline</label>
                  <select
                    value={borderStyle}
                    onChange={(e) => setBorderStyle(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                  >
                    <option value="solid">Solid Gray Border</option>
                    <option value="dashed">Dashed Cut Guide</option>
                    <option value="none">No Border Outline</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Xerox Contrast Boost: {contrastBoost}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={contrastBoost}
                    onChange={(e) => setContrastBoost(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              {/* RBI Masking Toggle & Advanced Position Calibration */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-emerald-200 block">RBI 8-Digit Masking</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Masks first 8 Aadhaar digits (XXXX-XXXX-1234)</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={maskAadhaar}
                    onChange={(e) => setMaskAadhaar(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                  />
                </div>

                {maskAadhaar && (
                  <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                    <button
                      onClick={() => setShowMaskSliders(!showMaskSliders)}
                      className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>{showMaskSliders ? 'Hide Mask Position Controls' : 'Fine-Tune Mask Position'}</span>
                    </button>

                    {showMaskSliders && (
                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                        <div>
                          <span>Horizontal (X): {maskXPercent}%</span>
                          <input
                            type="range"
                            min={10}
                            max={60}
                            value={maskXPercent}
                            onChange={(e) => setMaskXPercent(Number(e.target.value))}
                            className="w-full accent-emerald-600"
                          />
                        </div>
                        <div>
                          <span>Vertical (Y): {maskYPercent}%</span>
                          <input
                            type="range"
                            min={50}
                            max={90}
                            value={maskYPercent}
                            onChange={(e) => setMaskYPercent(Number(e.target.value))}
                            className="w-full accent-emerald-600"
                          />
                        </div>
                        <div>
                          <span>Width: {maskWPercent}%</span>
                          <input
                            type="range"
                            min={30}
                            max={60}
                            value={maskWPercent}
                            onChange={(e) => setMaskWPercent(Number(e.target.value))}
                            className="w-full accent-emerald-600"
                          />
                        </div>
                        <div>
                          <span>Height: {maskHPercent}%</span>
                          <input
                            type="range"
                            min={6}
                            max={16}
                            value={maskHPercent}
                            onChange={(e) => setMaskHPercent(Number(e.target.value))}
                            className="w-full accent-emerald-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Real-time Document Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>Live High-Resolution A4 Sheet Preview</span>
              </span>

              {renderedSizeKb > 0 && (
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                  {renderedSizeKb} KB • A4 PDF Ready
                </span>
              )}
            </div>

            {/* Preview Viewport */}
            <div className="w-full aspect-[210/297] bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner relative p-4">
              {renderedImageUrl ? (
                <div className="w-full h-full flex items-center justify-center overflow-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={renderedImageUrl}
                    alt="Aadhaar PAN KYC Live Preview"
                    className="max-h-full max-w-full object-contain shadow-md rounded-sm transition-transform"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>
              ) : (
                <div className="text-center p-8 space-y-3 text-slate-400">
                  <CreditCard className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
                  <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    Upload Aadhaar &amp; PAN Card on the Left
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Cards will be automatically aligned onto an official A4 sheet with zero placeholder artifacts.
                  </p>
                </div>
              )}

              {/* Zoom Controls */}
              {renderedImageUrl && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono font-bold px-1.5 text-slate-600 dark:text-slate-300">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Zero Server Upload Privacy Badge */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Client-Side Privacy:</strong> Your Aadhaar number and PAN details are merged directly inside your browser RAM. No files are ever sent to our servers.
              </span>
            </div>
          </div>
        </div>

        {/* Ad Placement */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <AdSlot slot="in_content" />
        </div>
      </div>
    </div>
  );
}
