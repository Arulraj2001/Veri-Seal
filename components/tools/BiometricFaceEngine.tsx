'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Download,
  RefreshCw,
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Eye,
  EyeOff,
  Maximize2,
  RotateCw,
  AlertCircle,
  HelpCircle,
  Camera,
} from 'lucide-react';

interface BiometricStandard {
  id: string;
  name: string;
  country: string;
  widthMm: number;
  heightMm: number;
  faceMinPct: number;
  faceMaxPct: number;
  eyeLevelMinMm: number;
  eyeLevelMaxMm: number;
  badge: string;
}

const STANDARDS: BiometricStandard[] = [
  {
    id: 'india_passport',
    name: 'Indian Passport & Aadhaar',
    country: 'India',
    widthMm: 35,
    heightMm: 45,
    faceMinPct: 70,
    faceMaxPct: 80,
    eyeLevelMinMm: 28,
    eyeLevelMaxMm: 33,
    badge: 'Official MEA / ICAO',
  },
  {
    id: 'us_visa',
    name: 'US Visa & OCI Card (2" × 2")',
    country: 'United States',
    widthMm: 50.8,
    heightMm: 50.8,
    faceMinPct: 50,
    faceMaxPct: 69,
    eyeLevelMinMm: 28,
    eyeLevelMaxMm: 35,
    badge: 'DS-160 Compliant',
  },
  {
    id: 'schengen_visa',
    name: 'Schengen European Visa',
    country: 'Europe',
    widthMm: 35,
    heightMm: 45,
    faceMinPct: 70,
    faceMaxPct: 80,
    eyeLevelMinMm: 29,
    eyeLevelMaxMm: 34,
    badge: 'Consulate Ready',
  },
  {
    id: 'pan_card',
    name: 'Indian PAN Card (UTI / NSDL)',
    country: 'India',
    widthMm: 25,
    heightMm: 35,
    faceMinPct: 65,
    faceMaxPct: 75,
    eyeLevelMinMm: 20,
    eyeLevelMaxMm: 26,
    badge: 'Income Tax Dept',
  },
];

export default function BiometricFaceEngine() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [selectedStandardId, setSelectedStandardId] = useState<string>('india_passport');

  // Canvas adjustments
  const [zoom, setZoom] = useState<number>(1.0);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);

  // Background tint
  const [bgColor, setBgColor] = useState<string>('transparent');

  // Guidelines toggle
  const [showGuides, setShowGuides] = useState<boolean>(true);

  const [renderedUrl, setRenderedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeStandard = STANDARDS.find((s) => s.id === selectedStandardId) || STANDARDS[0];

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
      setPanX(0);
      setPanY(0);
      setRotation(0);
    };
    img.src = URL.createObjectURL(file);
  };

  const renderBiometricPhoto = useCallback(() => {
    if (!imageObj) return;

    // Calculate canvas size at 300 DPI
    const dpi = 300;
    const targetW = Math.round((activeStandard.widthMm / 25.4) * dpi);
    const targetH = Math.round((activeStandard.heightMm / 25.4) * dpi);

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background
    if (bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, targetW, targetH);
    } else {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
    }

    ctx.save();
    // Center transformations
    ctx.translate(targetW / 2 + panX, targetH / 2 + panY);
    if (rotation !== 0) {
      ctx.rotate((rotation * Math.PI) / 180);
    }

    // Fit image
    const imgAspect = imageObj.width / imageObj.height;
    const targetAspect = targetW / targetH;

    let baseW = targetW;
    let baseH = targetH;

    if (imgAspect > targetAspect) {
      baseH = targetH;
      baseW = targetH * imgAspect;
    } else {
      baseW = targetW;
      baseH = targetW / imgAspect;
    }

    const drawW = baseW * zoom;
    const drawH = baseH * zoom;

    ctx.drawImage(imageObj, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Clean outer 1px border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, targetW, targetH);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setRenderedUrl(dataUrl);
  }, [imageObj, activeStandard, zoom, panX, panY, rotation, bgColor]);

  useEffect(() => {
    if (imageObj) {
      renderBiometricPhoto();
    }
  }, [imageObj, renderBiometricPhoto]);

  const handleDownload = () => {
    if (!renderedUrl) return;
    const link = document.createElement('a');
    link.href = renderedUrl;
    link.download = `biometric_photo_${activeStandard.id}_300dpi.jpg`;
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
            <Maximize2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>ICAO Biometric Passport Face &amp; Head Aligner</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                ICAO 9303 COMPLIANT
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Align crown to chin strictly within 70%–80% biometric boundary to prevent visa rejections.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setShowGuides(!showGuides)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              showGuides
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {showGuides ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showGuides ? 'Biometric Box Active' : 'Guides Hidden'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {!imageObj ? (
          /* Upload State */
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
                Upload Portrait for Biometric Alignment
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Use our official ICAO 9303 alignment template to ensure your face height is between 70% and 80% without manual ruler guesswork.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Supports Indian Passport Seva, US Visa (DS-160), Schengen &amp; OCI Cards</span>
            </div>
          </div>
        ) : (
          /* Dual-Pane Editor */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Standard Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>1. Choose Passport / Visa Standard</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {STANDARDS.map((std) => (
                    <button
                      key={std.id}
                      type="button"
                      onClick={() => setSelectedStandardId(std.id)}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex items-center justify-between ${
                        selectedStandardId === std.id
                          ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <span>{std.name}</span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {std.faceMinPct}–{std.faceMaxPct}% Face
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {std.widthMm} × {std.heightMm} mm • {std.badge}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedStandardId === std.id
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {selectedStandardId === std.id && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Head & Eye Position Controls */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2. Fit Head into Green Biometric Box</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1.0);
                      setPanX(0);
                      setPanY(0);
                      setRotation(0);
                    }}
                    className="text-[11px] text-emerald-700 hover:underline font-bold"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Face Scale (Match Crown &amp; Chin)</span>
                    <span className="font-mono font-bold">{Math.round(zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="2.0"
                    step="0.02"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Vertical Pan</span>
                      <span className="font-mono">{panY}</span>
                    </div>
                    <input
                      type="range"
                      min="-80"
                      max="80"
                      value={panY}
                      onChange={(e) => setPanY(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Horizontal Pan</span>
                      <span className="font-mono">{panX}</span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      value={panX}
                      onChange={(e) => setPanX(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3 h-3" />
                      <span>Straighten Head Tilt</span>
                    </span>
                    <span className="font-mono font-bold">{rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-15"
                    max="15"
                    step="0.5"
                    value={rotation}
                    onChange={(e) => setRotation(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              {/* Background Tint Selector */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  3. Studio Background Preset
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'transparent', label: 'Original', color: '#CBD5E1' },
                    { id: '#FFFFFF', label: 'Pure White', color: '#FFFFFF' },
                    { id: '#6BA4FF', label: 'Sky Blue', color: '#6BA4FF' },
                    { id: '#F1F5F9', label: 'Off-White', color: '#F1F5F9' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setBgColor(bg.id)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        bgColor === bg.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-slate-300 mx-auto mb-1"
                        style={{ backgroundColor: bg.color }}
                      />
                      <div className="text-[10px] font-bold">{bg.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Replace Photo Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Upload Different Photo</span>
              </button>
            </div>

            {/* Right Live Preview & Download (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span>Biometric Target ({activeStandard.name})</span>
                  <span className="text-emerald-700 font-bold lowercase">
                    {activeStandard.widthMm}×{activeStandard.heightMm} mm
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  300 DPI Lab Resolution
                </span>
              </div>

              {/* Live Preview Container with Biometric Box Overlay */}
              <div className="relative bg-slate-200/70 p-6 rounded-3xl border border-slate-300/80 shadow-inner flex items-center justify-center overflow-hidden min-h-[440px]">
                {renderedUrl ? (
                  <div className="relative shadow-2xl rounded-sm border-2 border-white bg-white overflow-hidden">
                    <img
                      src={renderedUrl}
                      alt="Biometric Passport Photo"
                      className="w-64 h-auto object-contain block select-none"
                    />

                    {/* Official ICAO 9303 Translucent Biometric Overlay Box */}
                    {showGuides && (
                      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3">
                        {/* Crown Hair Boundary Guide */}
                        <div className="border-b-2 border-dashed border-emerald-500/80 bg-emerald-500/10 py-1 px-1.5 text-[9px] font-black text-emerald-900 uppercase tracking-wider rounded-xs">
                          ▲ Crown Limit (Top of Head)
                        </div>

                        {/* Center Facial Crosshairs & Eye Level Line */}
                        <div className="relative w-full border-b border-dotted border-blue-500 py-1 flex items-center justify-between text-[9px] font-bold text-blue-900 bg-blue-500/10 px-1.5 rounded-xs">
                          <span>◀ Eye Baseline</span>
                          <span>Eye Baseline ▶</span>
                        </div>

                        {/* Chin Boundary Guide (70% - 80% facial height) */}
                        <div className="border-t-2 border-dashed border-emerald-500/80 bg-emerald-500/10 py-1 px-1.5 text-[9px] font-black text-emerald-900 uppercase tracking-wider rounded-xs">
                          ▼ Chin Limit (70%–80% Coverage)
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400 py-16">
                    <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
                    <span className="text-xs font-bold">Aligning Biometrics...</span>
                  </div>
                )}
              </div>

              {/* Biometric Checklist */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ICAO 9303 Compliance Checklist:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Face height occupies 70% to 80%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Eyes aligned with blue dotted line</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Both ears &amp; shoulders visible</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Exported strictly at 300 DPI</span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Biometric Passport Photo (300 DPI)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
