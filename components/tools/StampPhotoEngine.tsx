'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Printer,
  Download,
  Scissors,
  CheckCircle2,
  Sparkles,
  Calendar,
  User,
  ShieldCheck,
  Sliders,
  Image as ImageIcon,
  Award,
} from 'lucide-react';

export default function StampPhotoEngine() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  // Preset Mode: Stamp Size vs NEET Postcard
  const [mode, setMode] = useState<'stamp_size' | 'neet_postcard'>('stamp_size');

  // Stamp format settings: 20x25mm
  const [stampCopies, setStampCopies] = useState<number>(16); // 16 photos on 4x6
  const [paperFormat, setPaperFormat] = useState<'4R' | 'A4'>('4R');

  // NEET Postcard settings: 4x6 inch (10x15 cm)
  const [candidateName, setCandidateName] = useState<string>('RAHUL SHARMA');
  const [dateOfPhoto, setDateOfPhoto] = useState<string>(new Date().toISOString().split('T')[0]);
  const [rollNumber, setRollNumber] = useState<string>('240410123456');

  // Adjustments
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [borderType, setBorderType] = useState<'dashed' | 'solid' | 'none'>('dashed');
  const [dpi, setDpi] = useState<300 | 600>(300);

  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG or PNG).');
      return;
    }
    setSelectedFile(file);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImageObj(img);
    img.src = URL.createObjectURL(file);
  };

  const renderPhoto = useCallback(() => {
    if (!imageObj) return;

    if (mode === 'neet_postcard') {
      // 4x6 inches at 300 DPI = 1200 x 1800 px (or 2400 x 3600 at 600 DPI)
      const widthPx = Math.round((101.6 / 25.4) * dpi);
      const heightPx = Math.round((152.4 / 25.4) * dpi);

      const canvas = document.createElement('canvas');
      canvas.width = widthPx;
      canvas.height = heightPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, widthPx, heightPx);

      // Draw photo with center crop
      ctx.save();
      ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`;

      const imgAspect = imageObj.width / imageObj.height;
      const targetAspect = widthPx / heightPx;

      let sW = imageObj.width;
      let sH = imageObj.height;
      let sX = 0;
      let sY = 0;

      if (imgAspect > targetAspect) {
        sW = imageObj.height * targetAspect;
        sX = (imageObj.width - sW) / 2;
      } else {
        sH = imageObj.width / targetAspect;
        sY = (imageObj.height - sH) / 2;
      }

      ctx.drawImage(imageObj, sX, sY, sW, sH, 0, 0, widthPx, heightPx);
      ctx.restore();

      // NTA NEET Mandatory Bottom Strip
      const bannerH = Math.round(heightPx * 0.12);
      const bannerY = heightPx - bannerH;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, bannerY, widthPx, bannerH);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, bannerY, widthPx, bannerH);

      ctx.fillStyle = '#0F172A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fontSize = Math.max(16, Math.round(bannerH * 0.35));
      ctx.font = `bold ${fontSize}px sans-serif`;

      ctx.fillText(
        `NAME: ${candidateName.toUpperCase()}  |  ROLL: ${rollNumber}`,
        widthPx / 2,
        bannerY + bannerH * 0.35
      );
      ctx.font = `600 ${Math.round(fontSize * 0.85)}px sans-serif`;
      ctx.fillStyle = '#475569';
      ctx.fillText(
        `DATE OF PHOTOGRAPH: ${dateOfPhoto}  (NTA NEET UG FORMAT)`,
        widthPx / 2,
        bannerY + bannerH * 0.72
      );

      // Clean border
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, widthPx, heightPx);

      setRenderedImageUrl(canvas.toDataURL('image/jpeg', 0.95));
    } else {
      // Stamp Size (20x25 mm) tiled on 4x6" card (16 photos: 4 cols x 4 rows)
      const sheetWPx = Math.round((101.6 / 25.4) * dpi);
      const sheetHPx = Math.round((152.4 / 25.4) * dpi);

      const canvas = document.createElement('canvas');
      canvas.width = sheetWPx;
      canvas.height = sheetHPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill white sheet
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, sheetWPx, sheetHPx);

      // Stamp photo size in pixels
      const stampWPx = Math.round((20 / 25.4) * dpi);
      const stampHPx = Math.round((25 / 25.4) * dpi);

      const cols = 4;
      const rows = 4;
      const totalPhotos = 16;

      const gapX = (sheetWPx - cols * stampWPx) / (cols + 1);
      const gapY = (sheetHPx - rows * stampHPx) / (rows + 1);

      // Single stamp canvas
      const sCanvas = document.createElement('canvas');
      sCanvas.width = stampWPx;
      sCanvas.height = stampHPx;
      const sCtx = sCanvas.getContext('2d');
      if (!sCtx) return;

      sCtx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`;
      const imgAspect = imageObj.width / imageObj.height;
      const targetAspect = stampWPx / stampHPx;

      let sW = imageObj.width;
      let sH = imageObj.height;
      let sX = 0;
      let sY = 0;

      if (imgAspect > targetAspect) {
        sW = imageObj.height * targetAspect;
        sX = (imageObj.width - sW) / 2;
      } else {
        sH = imageObj.width / targetAspect;
        sY = (imageObj.height - sH) / 2;
      }

      sCtx.drawImage(imageObj, sX, sY, sW, sH, 0, 0, stampWPx, stampHPx);

      // Stamp border
      if (borderType === 'solid') {
        sCtx.strokeStyle = '#000000';
        sCtx.lineWidth = 1;
        sCtx.strokeRect(0, 0, stampWPx, stampHPx);
      }

      // Tile onto master sheet
      let count = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (count >= stampCopies) break;

          const posX = Math.round(gapX + c * (stampWPx + gapX));
          const posY = Math.round(gapY + r * (stampHPx + gapY));

          ctx.drawImage(sCanvas, posX, posY);

          if (borderType === 'dashed') {
            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(posX, posY, stampWPx, stampHPx);
            ctx.setLineDash([]);
          }

          count++;
        }
      }

      // Metadata
      ctx.fillStyle = '#94A3B8';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(
        `Kagazo Studio • 16 Stamp Photos (20×25mm) • 4×6" 300 DPI • 100% Actual Size`,
        sheetWPx - 20,
        sheetHPx - 12
      );

      setRenderedImageUrl(canvas.toDataURL('image/jpeg', 0.95));
    }
  }, [imageObj, mode, stampCopies, candidateName, dateOfPhoto, rollNumber, brightness, contrast, borderType, dpi]);

  useEffect(() => {
    if (imageObj) {
      renderPhoto();
    }
  }, [imageObj, renderPhoto]);

  const handlePrint = () => {
    if (!renderedImageUrl) return;
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Please allow popups to open the print window.');
      return;
    }
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Stamp / NEET Postcard Photo - Kagazo Studio</title>
          <style>
            @page {
              size: 4in 6in;
              margin: 0mm;
            }
            @media print {
              html, body {
                width: 100%;
                height: 100%;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden;
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
              background-color: #f8fafc;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <img src="${renderedImageUrl}" alt="Print Sheet" />
        </body>
      </html>
    `);
    printWin.document.close();
  };

  const handleDownload = () => {
    if (!renderedImageUrl) return;
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    link.download = `kagazo_${mode}_300dpi.jpg`;
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
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>Stamp Size &amp; NEET Postcard Photo Studio</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                16 STAMPS FOR ₹5 PRINT
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Generate 20×25mm stamp photos for railway/college passes or 4×6" NTA NEET UG admit card postcards.
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMode('stamp_size')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              mode === 'stamp_size'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            20×25mm Stamp (16 Photos)
          </button>
          <button
            type="button"
            onClick={() => setMode('neet_postcard')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              mode === 'neet_postcard'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            NEET Postcard (4×6")
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {!imageObj ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-10 text-center cursor-pointer transition-all bg-emerald-50/30 hover:bg-emerald-50/70 group space-y-4"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Upload className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-800">
                Upload Candidate Photograph
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                {mode === 'stamp_size'
                  ? 'We automatically crop to 20×25mm stamp size and arrange 16 copies onto a 4×6" card.'
                  : 'We scale your photo to official 4×6" (10×15 cm) postcard size with candidate name, roll number, and DOP.'}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% In-RAM Privacy • Zero Watermarks • 300 DPI Lab Print Ready</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              {mode === 'stamp_size' ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    1. Stamp Photo Copies
                  </label>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
                    <span>Quantity: {stampCopies} Photos</span>
                    <span className="text-emerald-700 font-extrabold">Full 4×6 Card</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    step="4"
                    value={stampCopies}
                    onChange={(e) => setStampCopies(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <p className="text-[11px] text-slate-500">
                    Standard 20×25mm stamp photos for railway season tickets, college passbooks, and student union IDs.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    1. NTA NEET UG Postcard Details
                  </label>
                  <div className="space-y-2">
                    <div>
                      <span className="block text-[11px] font-bold text-slate-600 mb-1">
                        Candidate Name (ALL CAPS)
                      </span>
                      <input
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-600 mb-1">
                        NEET Application / Roll No.
                      </span>
                      <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-600 mb-1">
                        Date of Photograph (DOP)
                      </span>
                      <input
                        type="date"
                        value={dateOfPhoto}
                        onChange={(e) => setDateOfPhoto(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Lighting & Filters */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  2. Adjustments &amp; Borders
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-600 font-semibold">Brightness ({brightness})</span>
                    <input
                      type="range"
                      min="-25"
                      max="25"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-600 font-semibold">Contrast ({contrast})</span>
                    <input
                      type="range"
                      min="-25"
                      max="25"
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Cutting Lines:</span>
                  <div className="flex items-center gap-1">
                    {(['dashed', 'solid', 'none'] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBorderType(b)}
                        className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-colors ${
                          borderType === b
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Replace Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Another Photo</span>
              </button>
            </div>

            {/* Right Preview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span>Live Preview</span>
                  <span className="text-emerald-700 font-bold lowercase">
                    {mode === 'stamp_size' ? '16 Stamp Photos (20×25mm)' : '4×6" NEET Postcard'}
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">300 DPI Lab Print</span>
              </div>

              <div className="relative bg-slate-200/70 p-6 rounded-3xl border border-slate-300/80 shadow-inner flex items-center justify-center overflow-hidden min-h-[440px]">
                {renderedImageUrl ? (
                  <div className="relative shadow-2xl rounded-sm border-2 border-white bg-white overflow-hidden max-h-[480px]">
                    <img
                      src={renderedImageUrl}
                      alt="Output Sheet Preview"
                      className="max-h-[480px] w-auto object-contain block select-none"
                    />
                  </div>
                ) : (
                  <div className="text-xs font-bold text-slate-400">Rendering Sheet...</div>
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
                  <span>Download 300 DPI JPG</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
