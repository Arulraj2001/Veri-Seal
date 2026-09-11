'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Printer,
  Download,
  Scissors,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Grid,
  Calendar,
  User,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Sliders,
  Plus,
  Minus,
  Trash2,
  Maximize2,
  Award,
  Check,
  Type,
  Eye,
} from 'lucide-react';

interface PhotoItem {
  id: string;
  file: File;
  previewUrl: string;
  imageObj: HTMLImageElement;
  copies: number;
  name?: string;
  dop?: string;
}

const PHOTO_SIZES = [
  { id: '35x45', label: '3.5 × 4.5 cm — Indian Passport / Aadhaar ★', widthMm: 35, heightMm: 45 },
  { id: '50x50', label: '2 × 2 inch (51×51 mm) — US Visa / OCI', widthMm: 50.8, heightMm: 50.8 },
  { id: '20x25', label: '2.0 × 2.5 cm — Stamp Size (Railway / College)', widthMm: 20, heightMm: 25 },
  { id: '25x35', label: '2.5 × 3.5 cm — Indian PAN Card (UTI / NSDL)', widthMm: 25, heightMm: 35 },
  { id: '35x45_schengen', label: '3.5 × 4.5 cm — Schengen European Visa', widthMm: 35, heightMm: 45 },
  { id: '100x150', label: '4 × 6 inch (10×15 cm) — NEET UG Postcard', widthMm: 101.6, heightMm: 152.4 },
];

const BG_SWATCHES = [
  { id: 'original', label: 'Original', color: 'transparent', border: '#CBD5E1' },
  { id: '#FFFFFF', label: 'Pure White', color: '#FFFFFF', border: '#CBD5E1' },
  { id: '#E2E8F0', label: 'Light Grey', color: '#E2E8F0', border: '#CBD5E1' },
  { id: '#6BA4FF', label: 'Sky Blue', color: '#6BA4FF', border: '#3B82F6' },
  { id: '#BBF7D0', label: 'Light Green', color: '#BBF7D0', border: '#22C55E' },
  { id: '#FECDD3', label: 'Soft Pink', color: '#FECDD3', border: '#F43F5E' },
  { id: '#FEF08A', label: 'Light Yellow', color: '#FEF08A', border: '#EAB308' },
];

const BORDER_SWATCHES = [
  { id: '#000000', label: 'Black', color: '#000000' },
  { id: '#FFFFFF', label: 'White', color: '#FFFFFF' },
  { id: '#2563EB', label: 'Blue', color: '#2563EB' },
  { id: '#DC2626', label: 'Red', color: '#DC2626' },
  { id: '#64748B', label: 'Slate', color: '#64748B' },
  { id: '#EA580C', label: 'Orange', color: '#EA580C' },
];

export default function PhotoSheetEngine() {
  // Step 1: Photos List (Multi-Subject Support!)
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 2: Photo Settings
  const [selectedSizeId, setSelectedSizeId] = useState<string>('35x45');
  const [bgColor, setBgColor] = useState<string>('original');
  const [customBgColor, setCustomBgColor] = useState<string>('#FFFFFF');
  const [enableBorder, setEnableBorder] = useState<boolean>(true);
  const [borderWidthMm, setBorderWidthMm] = useState<number>(0.5);
  const [borderColor, setBorderColor] = useState<string>('#000000');
  const [customBorderColor, setCustomBorderColor] = useState<string>('#000000');
  const [enableText, setEnableText] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>('RAHUL SHARMA');
  const [dateOfPhoto, setDateOfPhoto] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showAdjustments, setShowAdjustments] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);

  // Step 3: Print Layout
  const [paperSize, setPaperSize] = useState<'4R' | 'A4' | 'A5'>('4R');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isManualGrid, setIsManualGrid] = useState<boolean>(false);
  const [manualRows, setManualRows] = useState<number>(3);
  const [manualCols, setManualCols] = useState<number>(2);
  const [gapMm, setGapMm] = useState<number>(3.0);
  const [noMargins, setNoMargins] = useState<boolean>(true);
  const [marginMm, setMarginMm] = useState<number>(0);

  // Step 4: Output & DPI
  const [dpi, setDpi] = useState<72 | 150 | 300 | 600>(300);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);

  const activeSize = PHOTO_SIZES.find((s) => s.id === selectedSizeId) || PHOTO_SIZES[0];

  // Paper Dimensions in Millimeters
  const paperDimensionsMm = {
    '4R': orientation === 'portrait' ? { w: 101.6, h: 152.4 } : { w: 152.4, h: 101.6 },
    A4: orientation === 'portrait' ? { w: 210, h: 297 } : { w: 297, h: 210 },
    A5: orientation === 'portrait' ? { w: 148, h: 210 } : { w: 210, h: 148 },
  }[paperSize];

  // Calculate auto-fit rows and columns
  const effectiveMargin = noMargins ? 0 : marginMm;
  const availW = paperDimensionsMm.w - 2 * effectiveMargin;
  const availH = paperDimensionsMm.h - 2 * effectiveMargin;

  const autoCols = Math.max(1, Math.floor((availW + gapMm) / (activeSize.widthMm + gapMm)));
  const autoRows = Math.max(1, Math.floor((availH + gapMm) / (activeSize.heightMm + gapMm)));

  const totalGridRows = isManualGrid ? manualRows : autoRows;
  const totalGridCols = isManualGrid ? manualCols : autoCols;
  const totalSlots = totalGridRows * totalGridCols;

  // Total allocated copies
  const totalAllocatedCopies = photos.reduce((acc, p) => acc + p.copies, 0);

  // Add Photos handler
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG or PNG).');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    const preview = URL.createObjectURL(file);
    img.onload = () => {
      const newPhoto: PhotoItem = {
        id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        file,
        previewUrl: preview,
        imageObj: img,
        copies: photos.length === 0 ? totalSlots || 6 : 1,
      };
      setPhotos((prev) => [...prev, newPhoto]);
    };
    img.src = preview;
    e.target.value = '';
  };

  const updateCopies = (id: string, delta: number) => {
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, copies: Math.max(1, p.copies + delta) };
        }
        return p;
      })
    );
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Render the Master Print Sheet Canvas
  const renderMasterSheet = useCallback(() => {
    if (photos.length === 0) {
      setRenderedImageUrl(null);
      return;
    }

    setIsGenerating(true);

    const sheetWMm = paperDimensionsMm.w;
    const sheetHMm = paperDimensionsMm.h;

    // Pixel dimensions based on DPI
    const sheetPxW = Math.round((sheetWMm / 25.4) * dpi);
    const sheetPxH = Math.round((sheetHMm / 25.4) * dpi);

    const canvas = document.createElement('canvas');
    canvas.width = sheetPxW;
    canvas.height = sheetPxH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white paper
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetPxW, sheetPxH);

    // Photo Dimensions in Pixels
    const photoPxW = Math.round((activeSize.widthMm / 25.4) * dpi);
    const photoPxH = Math.round((activeSize.heightMm / 25.4) * dpi);
    const gapPx = Math.round((gapMm / 25.4) * dpi);
    const marginPx = Math.round((effectiveMargin / 25.4) * dpi);

    // Center the grid on the sheet
    const totalGridWidthPx = totalGridCols * photoPxW + (totalGridCols - 1) * gapPx;
    const totalGridHeightPx = totalGridRows * photoPxH + (totalGridRows - 1) * gapPx;

    const startXPx = Math.max(marginPx, Math.round((sheetPxW - totalGridWidthPx) / 2));
    const startYPx = Math.max(marginPx, Math.round((sheetPxH - totalGridHeightPx) / 2));

    // Flatten photos array based on copy counts
    const photoQueue: PhotoItem[] = [];
    photos.forEach((item) => {
      for (let i = 0; i < item.copies; i++) {
        photoQueue.push(item);
      }
    });

    let queueIndex = 0;

    for (let r = 0; r < totalGridRows; r++) {
      for (let c = 0; c < totalGridCols; c++) {
        const slotX = startXPx + c * (photoPxW + gapPx);
        const slotY = startYPx + r * (photoPxH + gapPx);

        // If we have photos in queue, render one
        const currentPhoto = photoQueue[queueIndex % photoQueue.length];
        if (currentPhoto && photos.length > 0) {
          // Prepare single photo canvas
          const pCanvas = document.createElement('canvas');
          pCanvas.width = photoPxW;
          pCanvas.height = photoPxH;
          const pCtx = pCanvas.getContext('2d');
          if (!pCtx) continue;

          // 1. Fill Background Color
          const activeBg = bgColor === 'original' ? '#FFFFFF' : bgColor === 'custom' ? customBgColor : bgColor;
          pCtx.fillStyle = activeBg;
          pCtx.fillRect(0, 0, photoPxW, photoPxH);

          // 2. Draw Image with Center-Crop and Filters
          pCtx.save();
          pCtx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%) saturate(${100 + saturation}%)`;

          const img = currentPhoto.imageObj;
          const imgAspect = img.width / img.height;
          const photoAspect = photoPxW / photoPxH;

          let sWidth = img.width;
          let sHeight = img.height;
          let sX = 0;
          let sY = 0;

          if (imgAspect > photoAspect) {
            sWidth = img.height * photoAspect;
            sX = (img.width - sWidth) / 2;
          } else {
            sHeight = img.width / photoAspect;
            sY = (img.height - sHeight) / 2;
          }

          pCtx.drawImage(img, sX, sY, sWidth, sHeight, 0, 0, photoPxW, photoPxH);
          pCtx.restore();

          // 3. Name & DOP Strip if enabled
          if (enableText && (candidateName || dateOfPhoto)) {
            const bannerH = Math.round(photoPxH * 0.18);
            const bannerY = photoPxH - bannerH;

            pCtx.fillStyle = '#FFFFFF';
            pCtx.fillRect(0, bannerY, photoPxW, bannerH);
            pCtx.strokeStyle = '#E2E8F0';
            pCtx.lineWidth = 1;
            pCtx.beginPath();
            pCtx.moveTo(0, bannerY);
            pCtx.lineTo(photoPxW, bannerY);
            pCtx.stroke();

            pCtx.fillStyle = '#0F172A';
            pCtx.textAlign = 'center';
            pCtx.textBaseline = 'middle';
            const fSize = Math.max(12, Math.round(bannerH * 0.36));
            pCtx.font = `bold ${fSize}px sans-serif`;

            if (candidateName && dateOfPhoto) {
              pCtx.fillText(candidateName.toUpperCase(), photoPxW / 2, bannerY + bannerH * 0.32);
              pCtx.font = `600 ${Math.round(fSize * 0.85)}px sans-serif`;
              pCtx.fillStyle = '#475569';
              pCtx.fillText(`DOP: ${dateOfPhoto}`, photoPxW / 2, bannerY + bannerH * 0.72);
            } else if (candidateName) {
              pCtx.fillText(candidateName.toUpperCase(), photoPxW / 2, bannerY + bannerH / 2);
            } else if (dateOfPhoto) {
              pCtx.fillText(`DOP: ${dateOfPhoto}`, photoPxW / 2, bannerY + bannerH / 2);
            }
          }

          // 4. Draw Border
          if (enableBorder) {
            const bWidthPx = Math.max(1, Math.round((borderWidthMm / 25.4) * dpi));
            pCtx.strokeStyle = borderColor === 'custom' ? customBorderColor : borderColor;
            pCtx.lineWidth = bWidthPx;
            pCtx.strokeRect(bWidthPx / 2, bWidthPx / 2, photoPxW - bWidthPx, photoPxH - bWidthPx);
          }

          // Paint onto master sheet
          ctx.drawImage(pCanvas, slotX, slotY);

          // 5. Scissor cutting tick guides around each photo
          ctx.strokeStyle = '#CBD5E1';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(slotX, slotY, photoPxW, photoPxH);
          ctx.setLineDash([]);
        }

        queueIndex++;
      }
    }

    // Sheet footer brand info
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(
      `VeriSeal Studio • ${paperSize} (${sheetWMm}×${sheetHMm}mm) • ${dpi} DPI • 100% Actual Size`,
      sheetPxW - 24,
      sheetPxH - 14
    );

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setRenderedImageUrl(dataUrl);
    setIsGenerating(false);
  }, [
    photos,
    paperDimensionsMm,
    paperSize,
    dpi,
    activeSize,
    gapMm,
    effectiveMargin,
    totalGridRows,
    totalGridCols,
    bgColor,
    customBgColor,
    enableBorder,
    borderWidthMm,
    borderColor,
    customBorderColor,
    enableText,
    candidateName,
    dateOfPhoto,
    brightness,
    contrast,
    saturation,
  ]);

  useEffect(() => {
    renderMasterSheet();
  }, [renderMasterSheet]);

  // Direct Browser Print
  const handlePrint = () => {
    if (!renderedImageUrl) return;
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Please allow popups to open the print dialog.');
      return;
    }

    const pageSize = `${paperDimensionsMm.w}mm ${paperDimensionsMm.h}mm`;
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Passport Photo Sheet - VeriSeal Studio</title>
          <style>
            @page {
              size: ${pageSize};
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
          <img src="${renderedImageUrl}" alt="Passport Photo Sheet Print" />
        </body>
      </html>
    `);
    printWin.document.close();
  };

  // Download Full Sheet Image
  const handleDownloadSheet = (format: 'jpeg' | 'png') => {
    if (!renderedImageUrl) return;
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    link.download = `passport_sheet_${paperSize}_${dpi}dpi.${format === 'png' ? 'png' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ------------------------------------------------------------- */}
      {/* LEFT COLUMN: 4-Step Numbered Control Panel (7 cols)            */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAddPhoto}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />

        {/* ========================================================= */}
        {/* STEP 1: PHOTOS                                            */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">
                PHOTOS
              </h2>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Photo</span>
            </button>
          </div>

          {/* Photo List */}
          <div className="space-y-3">
            {photos.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer bg-emerald-50/30 hover:bg-emerald-50/60 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-extrabold text-slate-800">Click to Upload Photo</p>
                <p className="text-xs text-slate-500 mt-0.5">Supports JPG, PNG, WebP • Up to multiple subjects on 1 sheet</p>
              </div>
            ) : (
              photos.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-purple-200/80 bg-purple-50/30 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.previewUrl}
                      alt={`Photo ${idx + 1}`}
                      className="w-12 h-14 object-cover rounded-xl border border-slate-300 shadow-2xs bg-white"
                    />
                    <div>
                      <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <span>Photo {idx + 1}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded-sm">
                          Subject {idx + 1}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.file.name.slice(0, 18)}...
                      </div>
                    </div>
                  </div>

                  {/* Copy Counter */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateCopies(item.id, -1)}
                        className="px-2.5 py-1.5 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-mono font-bold text-xs text-slate-800 min-w-[28px] text-center">
                        {item.copies}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCopies(item.id, 1)}
                        className="px-2.5 py-1.5 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold hidden sm:inline">copies</span>

                    <button
                      type="button"
                      onClick={() => removePhoto(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {photos.length > 0 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-purple-500 rounded-2xl text-xs font-bold text-slate-600 hover:text-purple-700 bg-slate-50/50 hover:bg-purple-50/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Another Photo (Print multiple people on 1 sheet)</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* STEP 2: PHOTO SETTINGS                                    */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
              2
            </span>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">
              PHOTO SETTINGS
            </h2>
          </div>

          {/* Photo Size Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Photo Size</label>
            <select
              value={selectedSizeId}
              onChange={(e) => setSelectedSizeId(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
            >
              {PHOTO_SIZES.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          {/* Background Color Swatches */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Background Color</label>
            <div className="flex flex-wrap items-center gap-2">
              {BG_SWATCHES.map((swatch) => (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={() => setBgColor(swatch.id)}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer relative ${
                    bgColor === swatch.id
                      ? 'ring-2 ring-purple-600 ring-offset-2 scale-110 shadow-xs'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: swatch.color === 'transparent' ? '#FFFFFF' : swatch.color,
                    borderColor: swatch.border,
                  }}
                  title={swatch.label}
                >
                  {bgColor === swatch.id && (
                    <Check className="w-4 h-4 text-slate-800 drop-shadow-xs" />
                  )}
                </button>
              ))}

              {/* Custom Hex */}
              <label className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50">
                <input
                  type="color"
                  value={customBgColor}
                  onChange={(e) => {
                    setCustomBgColor(e.target.value);
                    setBgColor('custom');
                  }}
                  className="w-4 h-4 rounded border-0 cursor-pointer"
                />
                <span>Custom</span>
              </label>
            </div>
          </div>

          {/* Photo Border Controls */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Photo Border</label>
              <input
                type="checkbox"
                checked={enableBorder}
                onChange={(e) => setEnableBorder(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 accent-purple-600 cursor-pointer"
              />
            </div>

            {enableBorder && (
              <div className="space-y-3 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600 font-semibold">
                    <span>Width — {borderWidthMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.0"
                    step="0.1"
                    value={borderWidthMm}
                    onChange={(e) => setBorderWidthMm(parseFloat(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600">Border Color</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {BORDER_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.id}
                        type="button"
                        onClick={() => setBorderColor(swatch.id)}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          borderColor === swatch.id
                            ? 'ring-2 ring-purple-600 ring-offset-2 scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: swatch.color }}
                        title={swatch.label}
                      >
                        {borderColor === swatch.id && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </button>
                    ))}
                    <label className="px-2 py-1 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50">
                      <input
                        type="color"
                        value={customBorderColor}
                        onChange={(e) => {
                          setCustomBorderColor(e.target.value);
                          setBorderColor('custom');
                        }}
                        className="w-4 h-4 rounded border-0 cursor-pointer"
                      />
                      <span>Custom</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Text on Photo (Name & Date of Photo) */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-purple-600" />
                <span>Text on Photo</span>
              </label>
              <input
                type="checkbox"
                checked={enableText}
                onChange={(e) => setEnableText(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 accent-purple-600 cursor-pointer"
              />
            </div>

            {enableText && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="block text-[11px] font-bold text-slate-600 mb-1">
                    Candidate Name
                  </span>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value.toUpperCase())}
                    placeholder="e.g. RAHUL SHARMA"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-600 mb-1">
                    Date of Photo (DOP)
                  </span>
                  <input
                    type="date"
                    value={dateOfPhoto}
                    onChange={(e) => setDateOfPhoto(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Adjustments (Expandable) */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAdjustments(!showAdjustments)}
              className="text-xs font-bold text-slate-700 hover:text-purple-700 flex items-center justify-between w-full cursor-pointer py-1"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-600" />
                <span>Adjustments (Brightness &amp; Contrast)</span>
              </span>
              <span className="text-[11px] font-mono">{showAdjustments ? '▲ Hide' : '▼ Expand'}</span>
            </button>

            {showAdjustments && (
              <div className="grid grid-cols-3 gap-3 pt-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600">Brightness ({brightness})</span>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600">Contrast ({contrast})</span>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600">Saturation ({saturation})</span>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={saturation}
                    onChange={(e) => setSaturation(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* STEP 3: PRINT LAYOUT                                      */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
              3
            </span>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">
              PRINT LAYOUT
            </h2>
          </div>

          {/* Paper Size Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Paper Size</label>
            <div className="flex items-center gap-2">
              {(['4R', 'A4', 'A5'] as const).map((pSize) => (
                <button
                  key={pSize}
                  type="button"
                  onClick={() => setPaperSize(pSize)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    paperSize === pSize
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {pSize === '4R' ? '4R (4x6 in)' : pSize}
                </button>
              ))}
            </div>
          </div>

          {/* Orientation Cards */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Orientation</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrientation('portrait')}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  orientation === 'portrait'
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-600/20 text-purple-950 font-black'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold'
                }`}
              >
                <div className="w-8 h-12 border-2 border-current rounded-md bg-current/10" />
                <span className="text-xs">Portrait ↑</span>
              </button>

              <button
                type="button"
                onClick={() => setOrientation('landscape')}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  orientation === 'landscape'
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-600/20 text-purple-950 font-black'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold'
                }`}
              >
                <div className="w-12 h-8 border-2 border-current rounded-md bg-current/10" />
                <span className="text-xs">Landscape ↔</span>
              </button>
            </div>
          </div>

          {/* Total Photos & Auto Fit */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Total Photos (auto-fits grid)</label>
              <button
                type="button"
                onClick={() => setIsManualGrid(!isManualGrid)}
                className="text-[11px] font-bold text-purple-700 hover:underline"
              >
                {isManualGrid ? 'Switch to Auto Fit' : 'Manual Rows × Cols'}
              </button>
            </div>

            {isManualGrid ? (
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500">Rows × Columns (manual)</span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={manualRows}
                    onChange={(e) => setManualRows(parseInt(e.target.value) || 1)}
                    className="w-20 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                  />
                  <span className="text-slate-400 font-bold">×</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={manualCols}
                    onChange={(e) => setManualCols(parseInt(e.target.value) || 1)}
                    className="w-20 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-xs font-black text-slate-800">{totalSlots} Photos</span>
                  <p className="text-[11px] text-slate-500">
                    Grid: {totalSlots} slots • {totalGridRows} rows × {totalGridCols} cols
                  </p>
                </div>
                <div className="px-2.5 py-1 bg-purple-100 text-purple-800 text-[10px] font-black rounded-lg">
                  Auto Fitted
                </div>
              </div>
            )}
          </div>

          {/* Gap Between Photos (mm) */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs text-slate-700 font-bold">
              <span>Gap Between Photos</span>
              <span className="font-mono text-purple-700">{gapMm} mm</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={gapMm}
              onChange={(e) => setGapMm(parseFloat(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          {/* Sheet Margins */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
              <span>Sheet Margins</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noMargins}
                  onChange={(e) => setNoMargins(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-purple-600 accent-purple-600 cursor-pointer"
                />
                <span className="text-[11px] font-semibold text-slate-500">No margins</span>
              </label>
            </div>
            {!noMargins && (
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={marginMm}
                onChange={(e) => setMarginMm(parseInt(e.target.value))}
                className="w-full accent-purple-600"
              />
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* STEP 4: GENERATE & DOWNLOAD                               */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
              4
            </span>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">
              GENERATE &amp; DOWNLOAD
            </h2>
          </div>

          {/* Output DPI Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Output DPI (Resolution)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { dpiVal: 72, label: '72 DPI', sub: 'Web/Screen' },
                { dpiVal: 150, label: '150 DPI', sub: 'Draft Print' },
                { dpiVal: 300, label: '300 DPI', sub: 'Print ★', highlight: true },
                { dpiVal: 600, label: '600 DPI', sub: 'Studio' },
              ].map((opt) => (
                <button
                  key={opt.dpiVal}
                  type="button"
                  onClick={() => setDpi(opt.dpiVal as any)}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    dpi === opt.dpiVal
                      ? 'bg-purple-950 text-white border-purple-950 shadow-md ring-2 ring-purple-900/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-black flex items-center justify-center gap-1">
                    <span>{opt.label}</span>
                  </div>
                  <div className="text-[10px] opacity-75">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Big Action Button: Generate Print Sheet */}
          <button
            type="button"
            onClick={renderMasterSheet}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>⚡ Generate Print Sheet</span>
          </button>

          {/* Download Buttons Section */}
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                📄 FULL PRINT SHEET
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadSheet('png')}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>↓ PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadSheet('jpeg')}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>↓ JPEG</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-3 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>↓ PDF / Print</span>
                </button>
              </div>
            </div>

            {/* Single Photo Downloads */}
            {photos.length > 0 && (
              <div>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                  📷 SINGLE PASSPORT PHOTO
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={photos[0].previewUrl}
                    download={`single_passport_photo_${activeSize.id}.png`}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>↓ PNG</span>
                  </a>
                  <a
                    href={photos[0].previewUrl}
                    download={`single_passport_photo_${activeSize.id}.jpg`}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>↓ JPEG</span>
                  </a>
                </div>
              </div>
            )}

            <p className="text-[11px] text-center text-slate-500 font-medium">
              🖨️ Set printer to <strong>Actual Size (100%)</strong> • No scaling
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT COLUMN: Sticky Live Print Preview (5 cols)              */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 shadow-xl space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Print Preview
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {photos.length === 0 ? 'No photo' : `${totalAllocatedCopies} / ${totalSlots} copies`}
              </span>
              <button
                type="button"
                onClick={handlePrint}
                disabled={photos.length === 0}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Preview Container */}
          <div className="relative bg-slate-100/80 rounded-2xl border border-slate-200/80 p-4 sm:p-6 flex items-center justify-center min-h-[380px] max-h-[500px] overflow-hidden">
            {renderedImageUrl ? (
              <div className="relative shadow-2xl rounded-sm border border-slate-300 bg-white max-w-full max-h-[440px] overflow-hidden">
                <img
                  src={renderedImageUrl}
                  alt="Live Print Sheet Preview"
                  className="max-h-[440px] w-auto object-contain block select-none"
                />
              </div>
            ) : (
              <div className="text-center space-y-3 p-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-200/80 text-slate-400 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Upload a photo to get started.</p>
                  <p className="text-[11px] text-slate-400">Preview updates live as you adjust settings.</p>
                </div>
              </div>
            )}
          </div>

          {/* Hardware Printer Safety Warning */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 flex items-center justify-center gap-1.5 font-bold text-center">
            <span>⚠️ Print at Actual Size (100%) • Do NOT scale to fit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
