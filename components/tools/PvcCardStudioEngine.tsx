'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Scissors,
  Award,
} from 'lucide-react';

export default function PvcCardStudioEngine() {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontImg, setFrontImg] = useState<HTMLImageElement | null>(null);
  const [backImg, setBackImg] = useState<HTMLImageElement | null>(null);

  const [layoutMode, setLayoutMode] = useState<'pouch_4x6' | 'epson_tray' | 'a4_batch'>('pouch_4x6');
  const [includeCutGuides, setIncludeCutGuides] = useState<boolean>(true);
  const [cornerRounder, setCornerRounder] = useState<boolean>(true);
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setFrontFile(file);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setFrontImg(img);
    img.src = URL.createObjectURL(file);
  };

  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setBackFile(file);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setBackImg(img);
    img.src = URL.createObjectURL(file);
  };

  const renderPvcSheet = useCallback(() => {
    if (!frontImg || !backImg) return;

    const dpi = 300;
    // CR-80 card physical dimensions: 85.60 mm x 53.98 mm
    const cardWPx = Math.round((85.60 / 25.4) * dpi); // 1011 px
    const cardHPx = Math.round((53.98 / 25.4) * dpi); // 638 px

    let sheetWPx = 0;
    let sheetHPx = 0;

    if (layoutMode === 'pouch_4x6') {
      // 4x6" card landscape: 152.4 mm x 101.6 mm = 1800 x 1200 px @ 300 DPI
      sheetWPx = Math.round((152.4 / 25.4) * dpi);
      sheetHPx = Math.round((101.6 / 25.4) * dpi);
    } else if (layoutMode === 'epson_tray') {
      // Epson standard tray: 140 mm x 210 mm
      sheetWPx = Math.round((140 / 25.4) * dpi);
      sheetHPx = Math.round((210 / 25.4) * dpi);
    } else {
      // A4 portrait: 210 mm x 297 mm
      sheetWPx = Math.round((210 / 25.4) * dpi);
      sheetHPx = Math.round((297 / 25.4) * dpi);
    }

    const canvas = document.createElement('canvas');
    canvas.width = sheetWPx;
    canvas.height = sheetHPx;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white paper background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetWPx, sheetHPx);

    const renderCard = (img: HTMLImageElement, x: number, y: number) => {
      ctx.save();
      if (cornerRounder) {
        const radius = Math.round((3.18 / 25.4) * dpi); // 3.18 mm corner radius
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + cardWPx - radius, y);
        ctx.quadraticCurveTo(x + cardWPx, y, x + cardWPx, y + radius);
        ctx.lineTo(x + cardWPx, y + cardHPx - radius);
        ctx.quadraticCurveTo(x + cardWPx, y + cardHPx, x + cardWPx - radius, y + cardHPx);
        ctx.lineTo(x + radius, y + cardHPx);
        ctx.quadraticCurveTo(x, y + cardHPx, x, y + cardHPx - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(img, x, y, cardWPx, cardHPx);
      ctx.restore();

      // Outer border
      if (includeCutGuides) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cardWPx, cardHPx);
      }
    };

    if (layoutMode === 'pouch_4x6') {
      // Side-by-side or Top-to-Bottom fold layout on 4x6"
      // On 152.4 mm width, two 85.6mm cards don't fit side-by-side (171.2mm > 152.4mm).
      // So on 4x6" card (101.6mm x 152.4mm portrait), we place Front on Top and Back Below with fold line!
      const cardX = Math.round((sheetWPx - cardWPx) / 2);
      const gapY = Math.round((sheetHPx - 2 * cardHPx) / 3);

      const frontY = gapY;
      const backY = gapY * 2 + cardHPx;

      renderCard(frontImg, cardX, frontY);
      renderCard(backImg, cardX, backY);

      // Scissor folding centerline guide
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      const foldY = gapY + cardHPx + gapY / 2;
      ctx.beginPath();
      ctx.moveTo(20, foldY);
      ctx.lineTo(sheetWPx - 20, foldY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✂ Cut along outline • Fold along center dashed line for 65×95mm lamination pouch', sheetWPx / 2, foldY - 8);
    } else {
      // Epson tray layout (Slot 1 & Slot 2)
      const slotX = Math.round((sheetWPx - cardWPx) / 2);
      const slot1Y = Math.round((30 / 25.4) * dpi);
      const slot2Y = slot1Y + cardHPx + Math.round((20 / 25.4) * dpi);

      renderCard(frontImg, slotX, slot1Y);
      renderCard(backImg, slotX, slot2Y);
    }

    setRenderedImageUrl(canvas.toDataURL('image/jpeg', 0.95));
  }, [frontImg, backImg, layoutMode, includeCutGuides, cornerRounder]);

  useEffect(() => {
    if (frontImg && backImg) {
      renderPvcSheet();
    }
  }, [frontImg, backImg, renderPvcSheet]);

  const handlePrint = () => {
    if (!renderedImageUrl) return;
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Please allow popups to open the print dialog.');
      return;
    }
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print PVC Smart ID Card - VeriSeal</title>
          <style>
            @page { size: auto; margin: 0mm; }
            @media print {
              html, body { width: 100%; height: 100%; margin: 0 !important; padding: 0 !important; }
              img { width: 100%; height: 100%; object-fit: contain; display: block; }
            }
            body { display: flex; align-items: center; justify-content: center; background-color: #f8fafc; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <img src="${renderedImageUrl}" alt="PVC Card Sheet" />
        </body>
      </html>
    `);
    printWin.document.close();
  };

  const handleDownload = () => {
    if (!renderedImageUrl) return;
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    link.download = `pvc_smart_card_${layoutMode}_300dpi.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-surface-darker/70 shadow-xl overflow-hidden">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>Dual-Sided PVC Smart ID Card Studio</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                CR-80 ISO STANDARD
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Format Front &amp; Back Aadhaar, PAN, and Voter cards into exact 85.6×53.98mm plastic card dimensions.
            </p>
          </div>
        </div>

        {/* Layout Selector */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setLayoutMode('pouch_4x6')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              layoutMode === 'pouch_4x6'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            4×6" Lamination Pouch
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode('epson_tray')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              layoutMode === 'epson_tray'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Epson L805 PVC Tray
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Upload Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Front Card Dropzone */}
          <div
            onClick={() => frontInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-6 text-center cursor-pointer transition-all bg-emerald-50/20 hover:bg-emerald-50/50 group"
          >
            <input
              type="file"
              ref={frontInputRef}
              onChange={handleFrontChange}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
            {frontImg ? (
              <div className="space-y-2">
                <img
                  src={frontImg.src}
                  alt="Front Side Preview"
                  className="w-full h-36 object-contain rounded-xl border border-slate-200 bg-white shadow-xs"
                />
                <p className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Front Side Loaded ({frontFile?.name.slice(0, 15)}...)</span>
                </p>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-800">1. Upload FRONT of ID Card</h3>
                <p className="text-xs text-slate-500">Aadhaar, PAN, Voter, DL, or College ID</p>
              </div>
            )}
          </div>

          {/* Back Card Dropzone */}
          <div
            onClick={() => backInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-6 text-center cursor-pointer transition-all bg-emerald-50/20 hover:bg-emerald-50/50 group"
          >
            <input
              type="file"
              ref={backInputRef}
              onChange={handleBackChange}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
            {backImg ? (
              <div className="space-y-2">
                <img
                  src={backImg.src}
                  alt="Back Side Preview"
                  className="w-full h-36 object-contain rounded-xl border border-slate-200 bg-white shadow-xs"
                />
                <p className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Back Side Loaded ({backFile?.name.slice(0, 15)}...)</span>
                </p>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-800">2. Upload BACK of ID Card</h3>
                <p className="text-xs text-slate-500">Address side, QR code, or barcode</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview & Actions when both cards uploaded */}
        {frontImg && backImg && (
          <div className="pt-4 border-t border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span>Print-Ready Tray Output (300 DPI)</span>
                <span className="text-emerald-700 font-bold lowercase">
                  CR-80: 85.60 × 53.98 mm
                </span>
              </span>
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={cornerRounder}
                    onChange={(e) => setCornerRounder(e.target.checked)}
                    className="w-3.5 h-3.5 accent-emerald-600 rounded"
                  />
                  <span>Simulate Rounded Corners</span>
                </label>
              </div>
            </div>

            <div className="relative bg-slate-200/70 p-6 rounded-3xl border border-slate-300/80 shadow-inner flex items-center justify-center overflow-hidden min-h-[420px]">
              {renderedImageUrl ? (
                <div className="relative shadow-2xl rounded-sm border-2 border-white bg-white overflow-hidden max-h-[460px]">
                  <img
                    src={renderedImageUrl}
                    alt="PVC Card Sheet Output"
                    className="max-h-[460px] w-auto object-contain block select-none"
                  />
                </div>
              ) : (
                <div className="text-xs font-bold text-slate-400">Rendering 300 DPI Card Layout...</div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-5 h-5" />
                <span>1-Click Direct Print</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download Print-Ready 300 DPI JPG</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
