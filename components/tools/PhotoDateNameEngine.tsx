'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Download,
  RefreshCw,
  Sparkles,
  Calendar,
  User,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Type,
  Printer,
  Camera,
} from 'lucide-react';

export default function PhotoDateNameEngine() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  // Form Inputs
  const [candidateName, setCandidateName] = useState<string>('RAHUL SHARMA');
  const [dateOfPhoto, setDateOfPhoto] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [prefixType, setPrefixType] = useState<'DOP' | 'DATE' | 'NONE'>('DOP');
  const [stripStyle, setStripStyle] = useState<'white_bg' | 'black_bg' | 'transparent'>('white_bg');
  const [fontSize, setFontSize] = useState<number>(16);
  const [stripHeightPct, setStripHeightPct] = useState<number>(18); // 15-25% of photo height

  // Output format preset
  const [aspectPreset, setAspectPreset] = useState<'35x45' | 'square' | 'original'>('35x45');

  // Zoom & Pan
  const [zoom, setZoom] = useState<number>(1.0);
  const [panY, setPanY] = useState<number>(0);

  const [renderedUrl, setRenderedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate 90-day compliance
  const isDateValid = (() => {
    if (!dateOfPhoto) return true;
    const photoDate = new Date(dateOfPhoto);
    const today = new Date();
    const diffTime = today.getTime() - photoDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 90;
  })();

  const daysAgo = (() => {
    if (!dateOfPhoto) return 0;
    const photoDate = new Date(dateOfPhoto);
    const today = new Date();
    const diffTime = today.getTime() - photoDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  })();

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
    img.onload = () => {
      setImageObj(img);
      setZoom(1.0);
      setPanY(0);
    };
    img.src = URL.createObjectURL(file);
  };

  // Format date display
  const formatDateDisplay = (isoDate: string) => {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    const [yyyy, mm, dd] = parts;
    const dateStr = `${dd}.${mm}.${yyyy}`;
    if (prefixType === 'DOP') return `DOP: ${dateStr}`;
    if (prefixType === 'DATE') return `DATE: ${dateStr}`;
    return dateStr;
  };

  const renderStampedPhoto = useCallback(() => {
    if (!imageObj) return;

    let targetW = 413; // 35mm @ 300 DPI
    let targetH = 531; // 45mm @ 300 DPI

    if (aspectPreset === 'square') {
      targetW = 450;
      targetH = 450;
    } else if (aspectPreset === 'original') {
      targetW = imageObj.width;
      targetH = imageObj.height;
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw base cropped photo
    const imgAspect = imageObj.width / imageObj.height;
    const targetAspect = targetW / targetH;

    let sWidth = imageObj.width;
    let sHeight = imageObj.height;
    let sX = 0;
    let sY = 0;

    if (imgAspect > targetAspect) {
      sWidth = imageObj.height * targetAspect;
      sX = (imageObj.width - sWidth) / 2;
    } else {
      sHeight = imageObj.width / targetAspect;
      sY = (imageObj.height - sHeight) / 2;
    }

    const effW = sWidth / zoom;
    const effH = sHeight / zoom;
    const effX = sX + (sWidth - effW) / 2;
    const effY = Math.max(
      0,
      Math.min(
        imageObj.height - effH,
        sY + (sHeight - effH) / 2 + panY * (sHeight / 200)
      )
    );

    ctx.drawImage(imageObj, effX, effY, effW, effH, 0, 0, targetW, targetH);

    // Draw Bottom Banner Strip
    const bannerH = Math.round(targetH * (stripHeightPct / 100));
    const bannerY = targetH - bannerH;

    if (stripStyle === 'white_bg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, bannerY, targetW, bannerH);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, bannerY);
      ctx.lineTo(targetW, bannerY);
      ctx.stroke();
    } else if (stripStyle === 'black_bg') {
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, bannerY, targetW, bannerH);
    } else {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.fillRect(0, bannerY, targetW, bannerH);
    }

    // Text rendering
    const textColor = stripStyle === 'white_bg' ? '#0F172A' : '#FFFFFF';
    const subColor = stripStyle === 'white_bg' ? '#475569' : '#E2E8F0';

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const calculatedFontSize = Math.max(13, Math.round(bannerH * (fontSize / 45)));
    ctx.font = `bold ${calculatedFontSize}px sans-serif`;
    ctx.fillStyle = textColor;

    const formattedDate = formatDateDisplay(dateOfPhoto);

    if (candidateName && formattedDate) {
      ctx.fillText(
        candidateName.toUpperCase(),
        targetW / 2,
        bannerY + bannerH * 0.32
      );
      ctx.font = `600 ${Math.round(calculatedFontSize * 0.85)}px sans-serif`;
      ctx.fillStyle = subColor;
      ctx.fillText(
        formattedDate,
        targetW / 2,
        bannerY + bannerH * 0.72
      );
    } else if (candidateName) {
      ctx.fillText(
        candidateName.toUpperCase(),
        targetW / 2,
        bannerY + bannerH / 2
      );
    } else if (formattedDate) {
      ctx.fillText(
        formattedDate,
        targetW / 2,
        bannerY + bannerH / 2
      );
    }

    // Outer border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, targetW, targetH);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setRenderedUrl(dataUrl);
  }, [
    imageObj,
    candidateName,
    dateOfPhoto,
    prefixType,
    stripStyle,
    fontSize,
    stripHeightPct,
    aspectPreset,
    zoom,
    panY,
  ]);

  useEffect(() => {
    if (imageObj) {
      renderStampedPhoto();
    }
  }, [imageObj, renderStampedPhoto]);

  const handleDownload = () => {
    if (!renderedUrl) return;
    const link = document.createElement('a');
    link.href = renderedUrl;
    link.download = `exam_photo_dop_${candidateName.replace(/\s+/g, '_') || 'candidate'}_300dpi.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-surface-darker/70 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>Exam Photo Name &amp; Date (DOP) Stamper</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                SSC &amp; UPSC COMPLIANT
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Print official Date of Photo and Candidate Name with real-time 90-day validity verification.
            </p>
          </div>
        </div>

        {/* 90-Day Validity Badge */}
        <div className="flex items-center gap-2 text-xs">
          {isDateValid ? (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Valid for SSC/UPSC ({daysAgo}d ago)</span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Photo Date Exceeds 90-Day Limit!</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {!imageObj ? (
          /* File Upload State */
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) {
                const file = e.dataTransfer.files[0];
                if (file.type.startsWith('image/')) {
                  setSelectedFile(file);
                  const img = new Image();
                  img.onload = () => setImageObj(img);
                  img.src = URL.createObjectURL(file);
                }
              }
            }}
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
                Upload Candidate Passport Photo
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Drop your photo here to stamp your full name and Date of Photograph (DOP) at the bottom without covering your chin.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Required for SSC CGL, CHSL, MTS, UPSC Civil Services &amp; Police Exams</span>
            </div>
          </div>
        ) : (
          /* Editor Dual Panel */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Text Fields */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1. Candidate Details &amp; Date</span>
                </label>

                <div className="space-y-2.5">
                  <div>
                    <span className="block text-[11px] font-bold text-slate-600 mb-1">
                      Full Name (Auto-Capitalized)
                    </span>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value.toUpperCase())}
                      placeholder="e.g. RAHUL SHARMA"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Date Prefix:</span>
                    <div className="flex items-center gap-1">
                      {(['DOP', 'DATE', 'NONE'] as const).map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setPrefixType(pref)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                            prefixType === pref
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          {pref === 'DOP' ? 'DOP: Date' : pref === 'DATE' ? 'DATE: Date' : 'Just Date'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Strip Banner Styling */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2. Bottom Strip Styling</span>
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'white_bg', label: 'White Strip', desc: 'Standard SSC' },
                    { id: 'black_bg', label: 'Dark Strip', desc: 'High Contrast' },
                    { id: 'transparent', label: 'Overlay', desc: 'Subtle Tag' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setStripStyle(style.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        stripStyle === style.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{style.label}</div>
                      <div className="text-[10px] text-slate-500">{style.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Strip Height (Coverage)</span>
                    <span className="font-mono font-bold">{stripHeightPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="25"
                    step="1"
                    value={stripHeightPct}
                    onChange={(e) => setStripHeightPct(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              {/* Face Alignment (Pan & Zoom so chin stays above strip) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                    <span>3. Adjust Face (Keep Chin Clear)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1.0);
                      setPanY(0);
                    }}
                    className="text-[11px] text-emerald-700 hover:underline font-bold"
                  >
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Face Zoom</span>
                      <span className="font-mono">{Math.round(zoom * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.6"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Move Face Up</span>
                      <span className="font-mono">{panY}</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      step="1"
                      value={panY}
                      onChange={(e) => setPanY(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Replace Photo Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace Photograph</span>
              </button>
            </div>

            {/* Right Live Preview & Download (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span>Stamped Preview</span>
                  <span className="text-emerald-700 font-bold lowercase">
                    35×45 mm • 300 DPI
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Official SSC CGL / UPSC Format
                </span>
              </div>

              {/* Canvas Preview Container */}
              <div className="relative bg-slate-200/70 p-6 rounded-3xl border border-slate-300/80 shadow-inner flex items-center justify-center overflow-hidden min-h-[440px]">
                {renderedUrl ? (
                  <div className="relative shadow-2xl rounded-sm border-2 border-white bg-white overflow-hidden">
                    <img
                      src={renderedUrl}
                      alt="Candidate Photo with DOP Stamp"
                      className="w-64 h-auto object-contain block select-none"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400 py-16">
                    <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
                    <span className="text-xs font-bold">Rendering Stamped Photo...</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Stamped Exam Photo (300 DPI JPG)</span>
                </button>
              </div>

              {/* Official SSC Exam Rule Notice */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold">Official SSC &amp; UPSC Notification Warning:</div>
                  <div className="text-amber-900/90 leading-relaxed">
                    "Photographs must not be more than three months old from the date of the publication of the Notice of Examination. The date on which the photograph has been taken must be clearly printed on the photograph. Applications without such date will be rejected."
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
