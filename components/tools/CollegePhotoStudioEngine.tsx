'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  Scissors,
  Sliders,
  Grid,
  Calendar,
  User,
  Palette,
  Eye,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { printIsolatedDocument } from '@/lib/print-utils';
import { AdSlot } from '@/components/ads/AdSlot';

type SheetType = '4x6_passport_8' | '4x6_combo' | 'a4_batch_32' | 'single_passport';

export default function CollegePhotoStudioEngine() {
  // Upload State
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);

  // Customization Controls
  const [candidateName, setCandidateName] = useState<string>('');
  const [photoDate, setPhotoDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showDopBanner, setShowDopBanner] = useState<boolean>(true);
  const [sheetType, setSheetType] = useState<SheetType>('4x6_combo');
  const [bgColor, setBgColor] = useState<'white' | 'light_blue' | 'light_gray'>('white');
  const [showCutGuides, setShowCutGuides] = useState<boolean>(true);

  // Result States
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  // Handle Photo Upload
  const handleUpload = (file: File) => {
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setImgObj(img);
    img.src = url;
  };

  // Format DOP date
  const formatDop = (iso: string) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  // Canvas Sheet Generation Pipeline
  const renderStudioSheet = useCallback(() => {
    if (!imgObj) return;
    setIsRendering(true);

    try {
      const dpi = 300; // Professional studio 300 DPI
      const canvas = document.createElement('canvas');

      let sheetWidthPx = 0;
      let sheetHeightPx = 0;

      if (sheetType === 'single_passport') {
        // 3.5cm x 4.5cm
        sheetWidthPx = Math.round((35 / 25.4) * dpi);
        sheetHeightPx = Math.round((45 / 25.4) * dpi);
      } else if (sheetType === 'a4_batch_32') {
        // A4 Paper: 210mm x 297mm
        sheetWidthPx = Math.round((210 / 25.4) * dpi);
        sheetHeightPx = Math.round((297 / 25.4) * dpi);
      } else {
        // 4" x 6" Photo Paper: 101.6mm x 152.4mm
        sheetWidthPx = Math.round((152.4 / 25.4) * dpi); // 6 inches wide (1800 px)
        sheetHeightPx = Math.round((101.6 / 25.4) * dpi); // 4 inches high (1200 px)
      }

      canvas.width = sheetWidthPx;
      canvas.height = sheetHeightPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill Paper with Pure White
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, sheetWidthPx, sheetHeightPx);

      // Single Passport Cell Helper (3.5cm x 4.5cm)
      const passportWPx = Math.round((35 / 25.4) * dpi); // ~413 px
      const passportHPx = Math.round((45 / 25.4) * dpi); // ~531 px

      // Single Stamp Cell Helper (2.0cm x 2.5cm)
      const stampWPx = Math.round((20 / 25.4) * dpi); // ~236 px
      const stampHPx = Math.round((25 / 25.4) * dpi); // ~295 px

      const drawPhotoUnit = (
        x: number,
        y: number,
        w: number,
        h: number,
        includeBanner: boolean
      ) => {
        // Background Tint
        let bgHex = '#FFFFFF';
        if (bgColor === 'light_blue') bgHex = '#E0F2FE';
        else if (bgColor === 'light_gray') bgHex = '#F1F5F9';

        ctx.fillStyle = bgHex;
        ctx.fillRect(x, y, w, h);

        const bannerH = includeBanner ? Math.round(h * 0.2) : 0;
        const photoH = h - bannerH;

        // Cover Crop
        const scale = Math.max(w / imgObj.width, photoH / imgObj.height);
        const drawW = imgObj.width * scale;
        const drawH = imgObj.height * scale;
        const offsetX = x + (w - drawW) / 2;
        const offsetY = y + (photoH - drawH) / 2;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, photoH);
        ctx.clip();
        ctx.drawImage(imgObj, offsetX, offsetY, drawW, drawH);
        ctx.restore();

        // White DOP Banner at bottom
        if (includeBanner) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(x, y + photoH, w, bannerH);

          ctx.strokeStyle = '#CBD5E1';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y + photoH);
          ctx.lineTo(x + w, y + photoH);
          ctx.stroke();

          ctx.fillStyle = '#0F172A';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const upperName = candidateName.trim().toUpperCase() || 'CANDIDATE';
          const dopText = `D.O.P: ${formatDop(photoDate)}`;

          ctx.font = `bold ${Math.round(bannerH * 0.35)}px Arial, sans-serif`;
          ctx.fillText(upperName, x + w / 2, y + photoH + bannerH * 0.35);

          ctx.font = `600 ${Math.round(bannerH * 0.3)}px Arial, sans-serif`;
          ctx.fillText(dopText, x + w / 2, y + photoH + bannerH * 0.75);
        }

        // Cut Guides / Border
        if (showCutGuides) {
          ctx.strokeStyle = '#94A3B8';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(x, y, w, h);
          ctx.setLineDash([]);
        }
      };

      // Layout Arrangements
      if (sheetType === 'single_passport') {
        drawPhotoUnit(0, 0, sheetWidthPx, sheetHeightPx, showDopBanner);
      } else if (sheetType === '4x6_passport_8') {
        // 4 Columns x 2 Rows = 8 Passport Photos
        const gapX = Math.round((1800 - passportWPx * 4) / 5);
        const gapY = Math.round((1200 - passportHPx * 2) / 3);

        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 4; c++) {
            const x = gapX + c * (passportWPx + gapX);
            const y = gapY + r * (passportHPx + gapY);
            drawPhotoUnit(x, y, passportWPx, passportHPx, showDopBanner);
          }
        }
      } else if (sheetType === '4x6_combo') {
        // 4x6" Combo: 6 Passport Photos (top 2 rows, 3 cols) + 4 Stamp Photos (bottom row)
        const pGapX = Math.round((1800 - passportWPx * 3) / 4);
        const pGapY = 40;

        // Row 1 & 2: 6 Passport photos
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 3; c++) {
            const x = pGapX + c * (passportWPx + pGapX);
            const y = pGapY + r * (passportHPx + 20);
            drawPhotoUnit(x, y, passportWPx, passportHPx, showDopBanner);
          }
        }

        // Row 3: 4 Stamp Size photos on the right or bottom
        const stampY = pGapY + 2 * (passportHPx + 20) + 10;
        const sGapX = Math.round((1800 - stampWPx * 5) / 6);
        for (let c = 0; c < 5; c++) {
          const x = sGapX + c * (stampWPx + sGapX);
          if (stampY + stampHPx <= sheetHeightPx) {
            drawPhotoUnit(x, stampY, stampWPx, stampHPx, false);
          }
        }
      } else if (sheetType === 'a4_batch_32') {
        // A4: 5 Cols x 6 Rows = 30 Photos
        const cols = 5;
        const rows = 6;
        const gapX = Math.round((sheetWidthPx - passportWPx * cols) / (cols + 1));
        const gapY = Math.round((sheetHeightPx - passportHPx * rows) / (rows + 1));

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = gapX + c * (passportWPx + gapX);
            const y = gapY + r * (passportHPx + gapY);
            drawPhotoUnit(x, y, passportWPx, passportHPx, showDopBanner);
          }
        }
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setRenderedImageUrl(dataUrl);
      setIsRendering(false);
    } catch (err) {
      console.error('Photo studio render error:', err);
      setIsRendering(false);
    }
  }, [
    imgObj,
    candidateName,
    photoDate,
    showDopBanner,
    sheetType,
    bgColor,
    showCutGuides,
  ]);

  useEffect(() => {
    renderStudioSheet();
  }, [renderStudioSheet]);

  // Isolated Print for 4x6" or A4
  const handlePrint = () => {
    if (!renderedImageUrl) return;
    const is4x6 = sheetType === '4x6_passport_8' || sheetType === '4x6_combo';

    printIsolatedDocument({
      title: 'College Admission Photo Sheet',
      bodyHtml: `<div style="width: ${is4x6 ? '6in' : '210mm'}; height: ${is4x6 ? '4in' : '297mm'}; margin: 0 auto; padding: 0; display: flex; align-items: center; justify-content: center;">
        <img src="${renderedImageUrl}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="Photo Sheet" />
      </div>`,
      pageSize: is4x6 ? '4x6' : 'A4',
      orientation: is4x6 ? 'landscape' : 'portrait',
    });
  };

  // Download JPEG at 300 DPI
  const handleDownload = () => {
    if (!renderedImageUrl) return;
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    const cleanName = candidateName.trim().replace(/\s+/g, '_') || 'student';
    link.download = `${cleanName}_photo_sheet_300dpi.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  College Admission &amp; Exam Photo Sheet Studio
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-fuchsia-500 text-slate-950 uppercase tracking-wide">
                  300 DPI PHOTO LAB
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Generate 4x6&quot; (8 photos), Combo (Passport + Stamp size), or A4 sheets. Print at any studio for ₹5 instead of ₹120.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={!renderedImageUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all disabled:opacity-40"
            >
              <Printer className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Print Sheet</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!renderedImageUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-md shadow-fuchsia-600/20 transition-all disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 300 DPI JPEG</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Upload Area */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Upload Portrait Photo
              </label>

              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center flex flex-col items-center justify-center min-h-[140px]">
                {photoFile ? (
                  <div className="space-y-2 w-full">
                    <CheckCircle2 className="w-7 h-7 text-fuchsia-500 mx-auto" />
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px] mx-auto">
                      {photoFile.name}
                    </div>
                    <span className="text-[10px] text-fuchsia-600 font-bold uppercase block">Ready to Tile</span>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <label className="cursor-pointer px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs">
                        <RefreshCw className="w-3 h-3 text-fuchsia-600" />
                        <span>Replace</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleUpload(e.target.files[0]);
                          }}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoFile(null);
                          setImgObj(null);
                          setRenderedImageUrl(null);
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
                    <span className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400">
                      Upload Selfie or Studio Photo
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">JPEG, PNG up to 15MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleUpload(e.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Sheet Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Print Format &amp; Paper Size
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: '4x6_combo', label: '4x6" Combo Sheet', sub: '6 Passport + 5 Stamp Size' },
                  { id: '4x6_passport_8', label: '4x6" Standard', sub: '8 Passport Photos' },
                  { id: 'a4_batch_32', label: 'A4 Photo Sheet', sub: '30 Passport Photos' },
                  { id: 'single_passport', label: 'Single 3.5×4.5cm', sub: '1 Single Photo File' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSheetType(item.id as SheetType)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                      sheetType === item.id
                        ? 'bg-fuchsia-50 dark:bg-fuchsia-950/60 border-fuchsia-500 text-fuchsia-700 dark:text-fuchsia-300'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Name & Date of Photo (DOP) Strip */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Name &amp; Date of Photo (DOP) Banner
                </span>
                <button
                  type="button"
                  onClick={() => setShowDopBanner(!showDopBanner)}
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    showDopBanner
                      ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {showDopBanner ? 'ON' : 'OFF'}
                </button>
              </div>

              {showDopBanner && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Student Name</label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value.toUpperCase())}
                      placeholder="e.g. Student Full Name"
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 uppercase focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Date of Photo</label>
                    <input
                      type="date"
                      value={photoDate}
                      onChange={(e) => setPhotoDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Studio Background & Cut Guides */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Studio Styling &amp; Cut Guides
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Background Color:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBgColor('white')}
                    className={`w-6 h-6 rounded-full border-2 bg-white ${
                      bgColor === 'white' ? 'border-fuchsia-500 ring-2 ring-fuchsia-300' : 'border-slate-300'
                    }`}
                    title="Studio White"
                  />
                  <button
                    type="button"
                    onClick={() => setBgColor('light_blue')}
                    className={`w-6 h-6 rounded-full border-2 bg-sky-100 ${
                      bgColor === 'light_blue' ? 'border-fuchsia-500 ring-2 ring-fuchsia-300' : 'border-slate-300'
                    }`}
                    title="Passport Light Blue"
                  />
                  <button
                    type="button"
                    onClick={() => setBgColor('light_gray')}
                    className={`w-6 h-6 rounded-full border-2 bg-slate-100 ${
                      bgColor === 'light_gray' ? 'border-fuchsia-500 ring-2 ring-fuchsia-300' : 'border-slate-300'
                    }`}
                    title="Off-White"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-fuchsia-600" />
                  Dashed Scissors Cut Guides:
                </span>
                <button
                  type="button"
                  onClick={() => setShowCutGuides(!showCutGuides)}
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    showCutGuides
                      ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {showCutGuides ? 'ENABLED' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview Right */}
          <div className="lg:col-span-6 flex flex-col items-center justify-between space-y-4">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-fuchsia-600" />
                Live 300 DPI Photo Sheet Preview
              </span>
              <span className="text-[10px] font-bold text-fuchsia-700 bg-fuchsia-50 dark:bg-fuchsia-950/60 px-2 py-0.5 rounded">
                EPSON / CANON READY
              </span>
            </div>

            {/* Document Canvas Card */}
            <div className="w-full bg-slate-200 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl flex items-center justify-center border border-slate-300 dark:border-slate-800 min-h-[480px]">
              {renderedImageUrl ? (
                <img
                  src={renderedImageUrl}
                  alt="Photo Sheet Preview"
                  className="max-h-[500px] w-auto shadow-2xl rounded-sm border border-slate-300 bg-white"
                />
              ) : (
                <div className="text-center text-slate-400 p-8">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">Upload photo to view tiled sheet preview</p>
                </div>
              )}
            </div>

            <div className="w-full p-3 rounded-xl border border-fuchsia-200 dark:border-fuchsia-800 bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-900 dark:text-fuchsia-200 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-600" />
                <span>Format: 300 DPI • Print directly on Glossy Photo Paper</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider bg-white/80 dark:bg-slate-900 px-2 py-0.5 rounded">
                SAVE ₹120
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Ostrune Agency Ad Banner */}
      <AdSlot slot="in_content" />
    </div>
  );
}
