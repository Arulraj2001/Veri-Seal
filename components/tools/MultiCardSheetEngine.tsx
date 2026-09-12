'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Printer,
  Download,
  Scissors,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  CreditCard,
  Sliders,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Eye,
  ShieldCheck,
  Zap,
  Copy,
  Info,
  ChevronDown,
  Check,
  FileText,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface CardSlot {
  id: string;
  label: string;
  frontFile: File | null;
  frontUrl: string | null;
  frontImg: HTMLImageElement | null;
  backFile: File | null;
  backUrl: string | null;
  backImg: HTMLImageElement | null;
  isSingleSided: boolean;
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
      pos += c.length;
    }
  }

  return new Blob([merged.buffer as ArrayBuffer], { type: 'application/pdf' });
}

export default function MultiCardSheetEngine() {
  const [cards, setCards] = useState<CardSlot[]>([
    {
      id: 'card-1',
      label: 'Card 1 (e.g. Aadhaar)',
      frontFile: null,
      frontUrl: null,
      frontImg: null,
      backFile: null,
      backUrl: null,
      backImg: null,
      isSingleSided: false,
    },
  ]);

  const [activeCardId, setActiveCardId] = useState<string>('card-1');
  const [paperFormat, setPaperFormat] = useState<'a4' | '4x6'>('a4');
  const [layoutStyle, setLayoutStyle] = useState<'fold_side_by_side' | 'grid_pairs'>('fold_side_by_side');
  const [laminationGutterMm, setLaminationGutterMm] = useState<number>(3); // 3mm safe thermal pouch margin
  const [includeCutGuides, setIncludeCutGuides] = useState<boolean>(true);
  const [includeCornerRadius, setIncludeCornerRadius] = useState<boolean>(true);
  const [enhanceContrast, setEnhanceContrast] = useState<boolean>(false);
  const [cardScaleFactor, setCardScaleFactor] = useState<number>(100); // 95% to 105% fine calibration

  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [zoomPreview, setZoomPreview] = useState<number>(1);

  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);

  // Add new card slot (up to 5 cards max)
  const handleAddCard = () => {
    if (cards.length >= 5) return;
    const newIndex = cards.length + 1;
    const newId = `card-${Date.now()}`;
    const defaultLabels = [
      'Card 1 (Aadhaar)',
      'Card 2 (PAN Card)',
      'Card 3 (Voter ID)',
      'Card 4 (Driving License)',
      'Card 5 (College / Health Card)',
    ];
    const newCard: CardSlot = {
      id: newId,
      label: defaultLabels[newIndex - 1] || `Card ${newIndex}`,
      frontFile: null,
      frontUrl: null,
      frontImg: null,
      backFile: null,
      backUrl: null,
      backImg: null,
      isSingleSided: false,
    };
    setCards([...cards, newCard]);
    setActiveCardId(newId);
  };

  // Remove card slot
  const handleRemoveCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (cards.length <= 1) return;
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    if (activeCardId === id) {
      setActiveCardId(updated[0].id);
    }
  };

  // Upload Front Image
  const handleFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setCards((prev) =>
        prev.map((c) =>
          c.id === activeCardId
            ? { ...c, frontFile: file, frontUrl: url, frontImg: img }
            : c
        )
      );
    };
    img.src = url;
  };

  // Upload Back Image
  const handleBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setCards((prev) =>
        prev.map((c) =>
          c.id === activeCardId
            ? { ...c, backFile: file, backUrl: url, backImg: img }
            : c
        )
      );
    };
    img.src = url;
  };

  // Duplicate front to back
  const handleDuplicateFrontToBack = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId && c.frontImg) {
          return {
            ...c,
            backFile: c.frontFile,
            backUrl: c.frontUrl,
            backImg: c.frontImg,
            isSingleSided: false,
          };
        }
        return c;
      })
    );
  };

  // Toggle single-sided mode
  const handleToggleSingleSided = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isSingleSided: !c.isSingleSided } : c))
    );
  };

  // Active Card helper
  const activeCard = cards.find((c) => c.id === activeCardId) || cards[0];
  const hasAnyCard = cards.some((c) => c.frontImg !== null);

  // Core 300 DPI Canvas Rendering Engine
  const renderA4Sheet = useCallback(() => {
    if (!hasAnyCard) {
      setRenderedImageUrl(null);
      return;
    }

    setIsRendering(true);

    try {
      const dpi = 300;
      // CR-80 card physical dimensions: 85.60 mm x 53.98 mm
      const baseCardWPx = Math.round((85.60 / 25.4) * dpi); // ~1011 px
      const baseCardHPx = Math.round((53.98 / 25.4) * dpi); // ~638 px

      // Fine calibration scaling factor (e.g. 100% = 1.0)
      const scale = cardScaleFactor / 100;
      const cardWPx = Math.round(baseCardWPx * scale);
      const cardHPx = Math.round(baseCardHPx * scale);

      // Sheet dimensions
      const sheetWPx =
        paperFormat === 'a4'
          ? Math.round((210 / 25.4) * dpi) // 2480 px
          : Math.round((101.6 / 25.4) * dpi); // 1200 px (4x6)
      const sheetHPx =
        paperFormat === 'a4'
          ? Math.round((297 / 25.4) * dpi) // 3508 px
          : Math.round((152.4 / 25.4) * dpi); // 1800 px (4x6)

      const gutterPx = Math.round((laminationGutterMm / 25.4) * dpi);
      const radiusPx = Math.round((3.18 / 25.4) * dpi * scale); // 3.18 mm CR-80 corner radius

      const canvas = document.createElement('canvas');
      canvas.width = sheetWPx;
      canvas.height = sheetHPx;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      // Pure white glossy paper background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, sheetWPx, sheetHPx);

      // Function to render a single card side
      const drawCardSide = (
        img: HTMLImageElement | null,
        x: number,
        y: number,
        label: string,
        sideTag: 'FRONT' | 'BACK'
      ) => {
        ctx.save();

        if (img) {
          // Rounded corner clipping if enabled
          if (includeCornerRadius) {
            ctx.beginPath();
            ctx.moveTo(x + radiusPx, y);
            ctx.lineTo(x + cardWPx - radiusPx, y);
            ctx.quadraticCurveTo(x + cardWPx, y, x + cardWPx, y + radiusPx);
            ctx.lineTo(x + cardWPx, y + cardHPx - radiusPx);
            ctx.quadraticCurveTo(x + cardWPx, y + cardHPx, x + cardWPx - radiusPx, y + cardHPx);
            ctx.lineTo(x + radiusPx, y + cardHPx);
            ctx.quadraticCurveTo(x, y + cardHPx, x, y + cardHPx - radiusPx);
            ctx.lineTo(x, y + radiusPx);
            ctx.quadraticCurveTo(x, y, x + radiusPx, y);
            ctx.closePath();
            ctx.clip();
          }

          // Xerox / Contrast enhancement filter
          if (enhanceContrast) {
            ctx.filter = 'contrast(1.15) brightness(1.04) saturate(1.05)';
          }

          ctx.drawImage(img, x, y, cardWPx, cardHPx);
          ctx.restore();
        } else {
          // Empty slot placeholder
          ctx.restore();
          ctx.strokeStyle = '#CBD5E1';
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 8]);
          ctx.strokeRect(x, y, cardWPx, cardHPx);
          ctx.setLineDash([]);

          ctx.fillStyle = '#94A3B8';
          ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`+ Empty ${sideTag} (${label})`, x + cardWPx / 2, y + cardHPx / 2);
        }

        // Outer scissor cutting guide line
        if (includeCutGuides) {
          ctx.strokeStyle = '#0F172A';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, cardWPx, cardHPx);

          // Scissor corner ticks
          const tickLen = Math.round((4 / 25.4) * dpi);
          ctx.strokeStyle = '#94A3B8';
          ctx.lineWidth = 1.5;

          // Top-left
          ctx.beginPath();
          ctx.moveTo(x - tickLen, y);
          ctx.lineTo(x, y);
          ctx.lineTo(x, y - tickLen);
          ctx.stroke();

          // Top-right
          ctx.beginPath();
          ctx.moveTo(x + cardWPx + tickLen, y);
          ctx.lineTo(x + cardWPx, y);
          ctx.lineTo(x + cardWPx, y - tickLen);
          ctx.stroke();

          // Bottom-left
          ctx.beginPath();
          ctx.moveTo(x - tickLen, y + cardHPx);
          ctx.lineTo(x, y + cardHPx);
          ctx.lineTo(x, y + cardHPx + tickLen);
          ctx.stroke();

          // Bottom-right
          ctx.beginPath();
          ctx.moveTo(x + cardWPx + tickLen, y + cardHPx);
          ctx.lineTo(x + cardWPx, y + cardHPx);
          ctx.lineTo(x + cardWPx, y + cardHPx + tickLen);
          ctx.stroke();
        }
      };

      // Header watermark for professional CSC operators (very subtle header outside printable margin)
      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(
        `Kagazo Cyber Cafe Pro — A4 Gang Sheet Studio (300 DPI • CR-80 ISO 7810 Standard: 85.60 × 53.98 mm • Pouch Gutter: ${laminationGutterMm}mm)`,
        Math.round((12 / 25.4) * dpi),
        Math.round((8 / 25.4) * dpi)
      );

      // Layout logic for A4 Sheet (fits up to 5 cards = 10 sides)
      if (paperFormat === 'a4') {
        const activeCardsList = cards.filter((c) => c.frontImg !== null);
        const cardSlotsToRender = activeCardsList.length > 0 ? activeCardsList : [cards[0]];

        if (layoutStyle === 'fold_side_by_side') {
          // Layout 1: Front and Back side-by-side on each row (up to 5 rows)
          // Row height: cardHPx + gutter
          const pairWidth = cardWPx * 2 + gutterPx;
          const startX = Math.round((sheetWPx - pairWidth) / 2);
          const totalRows = Math.min(5, cardSlotsToRender.length);

          const availableHeight = sheetHPx - Math.round((24 / 25.4) * dpi);
          const rowSpacing = Math.min(
            cardHPx + Math.round((8 / 25.4) * dpi),
            Math.floor(availableHeight / Math.max(1, totalRows))
          );
          const startY = Math.round((16 / 25.4) * dpi);

          cardSlotsToRender.slice(0, 5).forEach((card, idx) => {
            const currentY = startY + idx * rowSpacing;
            const frontX = startX;
            const backX = startX + cardWPx + gutterPx;

            // Draw Front
            drawCardSide(card.frontImg, frontX, currentY, card.label, 'FRONT');

            // Draw Back or duplicate if single-sided
            const effectiveBackImg = card.isSingleSided ? card.frontImg : card.backImg;
            drawCardSide(effectiveBackImg, backX, currentY, card.label, 'BACK');

            // Center folding dashed line between front and back
            if (includeCutGuides) {
              const foldX = frontX + cardWPx + gutterPx / 2;
              ctx.strokeStyle = '#94A3B8';
              ctx.lineWidth = 1.5;
              ctx.setLineDash([8, 8]);
              ctx.beginPath();
              ctx.moveTo(foldX, currentY - 6);
              ctx.lineTo(foldX, currentY + cardHPx + 6);
              ctx.stroke();
              ctx.setLineDash([]);

              // Folding scissor icon label
              ctx.fillStyle = '#64748B';
              ctx.font = '14px sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('✂ Fold Here', foldX, currentY - 10);
            }
          });
        } else {
          // Layout 2: 2-Column Grid (Column 1 = All Fronts, Column 2 = All Backs)
          const colGap = Math.round((14 / 25.4) * dpi);
          const totalColW = cardWPx * 2 + colGap;
          const col1X = Math.round((sheetWPx - totalColW) / 2);
          const col2X = col1X + cardWPx + colGap;
          const rowH = cardHPx + Math.round((6 / 25.4) * dpi);
          const startY = Math.round((16 / 25.4) * dpi);

          cardSlotsToRender.slice(0, 5).forEach((card, idx) => {
            const y = startY + idx * rowH;
            drawCardSide(card.frontImg, col1X, y, `${card.label} Front`, 'FRONT');
            const effectiveBackImg = card.isSingleSided ? card.frontImg : card.backImg;
            drawCardSide(effectiveBackImg, col2X, y, `${card.label} Back`, 'BACK');
          });
        }
      } else {
        // 4x6" Sheet Layout (1 Card: Front & Back top-to-bottom or 2 small cards)
        const cardX = Math.round((sheetWPx - cardWPx) / 2);
        const startY = Math.round((15 / 25.4) * dpi);
        const gap = Math.round((10 / 25.4) * dpi);

        const firstCard = cards[0];
        drawCardSide(firstCard.frontImg, cardX, startY, firstCard.label, 'FRONT');

        const effectiveBackImg = firstCard.isSingleSided ? firstCard.frontImg : firstCard.backImg;
        drawCardSide(effectiveBackImg, cardX, startY + cardHPx + gap, firstCard.label, 'BACK');

        if (includeCutGuides) {
          const foldY = startY + cardHPx + gap / 2;
          ctx.strokeStyle = '#94A3B8';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([8, 8]);
          ctx.beginPath();
          ctx.moveTo(cardX - 10, foldY);
          ctx.lineTo(cardX + cardWPx + 10, foldY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      setRenderedImageUrl(canvas.toDataURL('image/jpeg', 0.96));
    } catch (err) {
      console.error('Canvas render error:', err);
    } finally {
      setIsRendering(false);
    }
  }, [
    cards,
    hasAnyCard,
    paperFormat,
    layoutStyle,
    laminationGutterMm,
    includeCutGuides,
    includeCornerRadius,
    enhanceContrast,
    cardScaleFactor,
  ]);

  useEffect(() => {
    renderA4Sheet();
  }, [renderA4Sheet]);

  // 1-Click Hardware Print with Native @page CSS
  const handlePrint = () => {
    if (!renderedImageUrl) return;
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Please allow popups to open the print dialog.');
      return;
    }
    const pageCssSize = paperFormat === 'a4' ? 'A4 portrait' : '4in 6in portrait';
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Kagazo Multi-Card Gang Sheet 300 DPI</title>
          <style>
            @page {
              size: ${pageCssSize};
              margin: 0 !important;
            }
            @media print {
              html, body {
                width: 100%;
                height: 100%;
                margin: 0 !important;
                padding: 0 !important;
                background: #FFFFFF !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
              }
            }
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0;
              background-color: #F8FAFC;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <img src="${renderedImageUrl}" alt="A4 Gang Sheet" />
        </body>
      </html>
    `);
    printWin.document.close();
  };

  // Download 300 DPI High-Res JPG
  const handleDownloadJpg = () => {
    if (!renderedImageUrl) return;
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    link.download = `kagazo_multicard_a4_sheet_300dpi.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Print-Ready Vector A4 PDF
  const handleDownloadPdf = () => {
    if (!renderedImageUrl) return;
    const widthMm = paperFormat === 'a4' ? 210 : 101.6;
    const heightMm = paperFormat === 'a4' ? 297 : 152.4;
    const dpi = 300;
    const imgW = Math.round((widthMm / 25.4) * dpi);
    const imgH = Math.round((heightMm / 25.4) * dpi);

    const pdfBlob = createPdfFromJpeg(renderedImageUrl, widthMm, heightMm, imgW, imgH);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `kagazo_multicard_a4_sheet_print_ready.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Engine Container */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top Dark Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Multi-Card A4 Gang Sheet Studio
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  5-IN-1 CYBER CAFE PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically tile up to 5 Front &amp; Back ID cards onto A4 glossy paper at exact CR-80 wallet dimensions (85.60 × 53.98 mm).
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={!renderedImageUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>1-Click Print</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={!renderedImageUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Studio Body Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (5 cols): Multi-Card Slots & Uploads */}
          <div className="lg:col-span-5 space-y-6">
            {/* Slot Tabs */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Card Slots ({cards.length}/5)</span>
                </span>
                {cards.length < 5 && (
                  <button
                    onClick={handleAddCard}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Card</span>
                  </button>
                )}
              </div>

              {/* Slot Selector Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cards.map((card, idx) => {
                  const isActive = card.id === activeCardId;
                  const isReady = card.frontImg !== null;
                  return (
                    <div
                      key={card.id}
                      onClick={() => setActiveCardId(card.id)}
                      className={`relative p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="min-w-0 flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-lg text-[11px] font-extrabold flex items-center justify-center shrink-0 ${
                            isReady
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {card.label}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {card.frontImg ? (card.backImg ? 'Front + Back' : 'Front Only') : 'No images yet'}
                          </p>
                        </div>
                      </div>

                      {cards.length > 1 && (
                        <button
                          onClick={(e) => handleRemoveCard(card.id, e)}
                          title="Remove Card Slot"
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Card Configuration Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Editing {activeCard.label}
                  </span>
                </div>
                <button
                  onClick={() => handleToggleSingleSided(activeCard.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                    activeCard.isSingleSided
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-white text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {activeCard.isSingleSided ? 'Single-Sided (Front Mirrored)' : 'Dual-Sided Mode'}
                </button>
              </div>

              {/* Upload Dropzones: Front & Back */}
              <div className="grid grid-cols-2 gap-3">
                {/* Front Side */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>Front Side</span>
                    {activeCard.frontImg && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                  </span>

                  <input
                    type="file"
                    ref={frontFileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFrontUpload}
                    className="hidden"
                  />

                  <div
                    onClick={() => frontFileInputRef.current?.click()}
                    className={`h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all ${
                      activeCard.frontUrl
                        ? 'border-emerald-400 bg-white dark:bg-slate-900'
                        : 'border-slate-300 dark:border-slate-600 hover:border-emerald-400 bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    {activeCard.frontUrl ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={activeCard.frontUrl}
                          alt="Card Front"
                          className="max-h-full max-w-full object-contain rounded-md"
                        />
                        <div className="absolute inset-0 bg-slate-900/50 opacity-0 hover:opacity-100 rounded-md flex items-center justify-center text-white text-[11px] font-bold transition-opacity">
                          Replace Front
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Upload Front
                        </span>
                        <span className="text-[10px] text-slate-400 block">JPG, PNG</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Back Side */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>Back Side</span>
                    {activeCard.backImg && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                  </span>

                  <input
                    type="file"
                    ref={backFileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleBackUpload}
                    className="hidden"
                  />

                  {activeCard.isSingleSided ? (
                    <div className="h-36 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/30 flex flex-col items-center justify-center p-3 text-center">
                      <Copy className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Front Auto-Mirrored
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        Prints identical back
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={() => backFileInputRef.current?.click()}
                      className={`h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all ${
                        activeCard.backUrl
                          ? 'border-emerald-400 bg-white dark:bg-slate-900'
                          : 'border-slate-300 dark:border-slate-600 hover:border-emerald-400 bg-white dark:bg-slate-900/60'
                      }`}
                    >
                      {activeCard.backUrl ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img
                            src={activeCard.backUrl}
                            alt="Card Back"
                            className="max-h-full max-w-full object-contain rounded-md"
                          />
                          <div className="absolute inset-0 bg-slate-900/50 opacity-0 hover:opacity-100 rounded-md flex items-center justify-center text-white text-[11px] font-bold transition-opacity">
                            Replace Back
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                            Upload Back
                          </span>
                          <span className="text-[10px] text-slate-400 block">JPG, PNG</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Helper Button */}
              {activeCard.frontImg && !activeCard.backImg && !activeCard.isSingleSided && (
                <button
                  onClick={() => handleDuplicateFrontToBack(activeCard.id)}
                  className="w-full py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Duplicate Front as Back Side</span>
                </button>
              )}
            </div>

            {/* Print & Calibration Controls */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                <span>Print &amp; Lamination Controls</span>
              </span>

              {/* Layout Arrangement & Paper */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
                    Paper Size
                  </label>
                  <select
                    value={paperFormat}
                    onChange={(e) => setPaperFormat(e.target.value as 'a4' | '4x6')}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="a4">A4 Sheet (210×297mm) — 5 Cards</option>
                    <option value="4x6">4×6 Inch Photo Paper — 1 Card</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
                    Arrangement
                  </label>
                  <select
                    value={layoutStyle}
                    onChange={(e) =>
                      setLayoutStyle(e.target.value as 'fold_side_by_side' | 'grid_pairs')
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="fold_side_by_side">Side-by-Side (1-Fold Pouch)</option>
                    <option value="grid_pairs">2-Column Table Grid</option>
                  </select>
                </div>
              </div>

              {/* Lamination Gutter Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Thermal Pouch Lamination Gutter
                  </span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    {laminationGutterMm} mm margin
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={8}
                  step={0.5}
                  value={laminationGutterMm}
                  onChange={(e) => setLaminationGutterMm(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 leading-tight">
                  Prevents pouch edge peeling when cutting laminated ID cards with standard 65×95mm heat pouches.
                </p>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <label className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-slate-400" />
                    <span>Cutting Dash Guides &amp; Fold Marks</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={includeCutGuides}
                    onChange={(e) => setIncludeCutGuides(e.target.checked)}
                    className="rounded accent-emerald-500 h-4 w-4"
                  />
                </label>

                <label className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    <span>3.18mm Rounded Corners (CR-80)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={includeCornerRadius}
                    onChange={(e) => setIncludeCornerRadius(e.target.checked)}
                    className="rounded accent-emerald-500 h-4 w-4"
                  />
                </label>

                <label className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Xerox Auto-Contrast &amp; Shadow Filter</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={enhanceContrast}
                    onChange={(e) => setEnhanceContrast(e.target.checked)}
                    className="rounded accent-emerald-500 h-4 w-4"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Live 300 DPI A4 Canvas Sheet Preview */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Sheet View Toolbar */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Interactive 300 DPI Sheet Preview</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                  {paperFormat === 'a4' ? '2480 × 3508 PX (A4)' : '1200 × 1800 PX (4×6)'}
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setZoomPreview((z) => Math.max(0.6, z - 0.15))}
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold w-12 text-center text-slate-700 dark:text-slate-300">
                  {Math.round(zoomPreview * 100)}%
                </span>
                <button
                  onClick={() => setZoomPreview((z) => Math.min(2.0, z + 0.15))}
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomPreview(1)}
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 ml-1"
                  title="Reset Zoom"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Sheet Viewport */}
            <div className="w-full flex-1 min-h-[560px] bg-slate-100 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 flex items-center justify-center overflow-auto shadow-inner">
              {renderedImageUrl ? (
                <div
                  style={{
                    transform: `scale(${zoomPreview})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="shadow-2xl rounded-sm border border-slate-300 bg-white"
                >
                  <img
                    src={renderedImageUrl}
                    alt="A4 Sheet Preview"
                    className="max-w-[420px] sm:max-w-[500px] h-auto block select-none"
                  />
                </div>
              ) : (
                <div className="text-center max-w-sm space-y-3 p-6">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Sheet Ready For Card Placement
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Upload the Front side of Card 1 on the left to start tiling cards onto this A4 photo sheet.
                  </p>
                  <button
                    onClick={() => frontFileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Card 1 Front</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Export Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>100% In-Browser RAM Security</span>
                    <span className="text-[10px] text-emerald-400 font-mono">0 Bytes Uploaded</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Citizen identity cards never leave your local device.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadJpg}
                  disabled={!renderedImageUrl}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>300 DPI JPG</span>
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={!renderedImageUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Print-Ready A4 PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Partner Slot (Ostrune) */}
      <AdSlot slot="in_content" />
    </div>
  );
}
