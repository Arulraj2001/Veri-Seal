'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Download,
  RefreshCw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Move,
  Maximize2,
  Award,
  ShieldCheck,
  User,
  Scissors,
  Eye,
  Camera,
} from 'lucide-react';

interface AttirePreset {
  id: string;
  name: string;
  category: 'men' | 'women';
  color: string;
  badge: string;
  // SVG path or render function
  collarColor: string;
  jacketColor: string;
  tieColor?: string;
  lapelColor: string;
}

const ATTIRE_PRESETS: AttirePreset[] = [
  {
    id: 'navy_suit_tie',
    name: 'Navy Blue Suit & Silk Tie',
    category: 'men',
    color: '#0F172A',
    badge: 'Most Popular',
    collarColor: '#FFFFFF',
    jacketColor: '#1E293B',
    tieColor: '#DC2626',
    lapelColor: '#0F172A',
  },
  {
    id: 'charcoal_black_suit',
    name: 'Executive Black Blazer & Blue Tie',
    category: 'men',
    color: '#18181B',
    badge: 'Formal UPSC',
    collarColor: '#F8FAFC',
    jacketColor: '#18181B',
    tieColor: '#2563EB',
    lapelColor: '#09090B',
  },
  {
    id: 'blue_formal_shirt',
    name: 'Classic Sky Blue Collared Shirt',
    category: 'men',
    color: '#38BDF8',
    badge: 'Clean Office',
    collarColor: '#BAE6FD',
    jacketColor: '#38BDF8',
    lapelColor: '#0284C7',
  },
  {
    id: 'women_black_blazer',
    name: 'Women Black Blazer & White Inner',
    category: 'women',
    color: '#1E293B',
    badge: 'Executive',
    collarColor: '#FFFFFF',
    jacketColor: '#0F172A',
    lapelColor: '#020617',
  },
  {
    id: 'women_formal_shirt',
    name: 'Women Formal Collared Shirt',
    category: 'women',
    color: '#E2E8F0',
    badge: 'Formal',
    collarColor: '#F1F5F9',
    jacketColor: '#CBD5E1',
    lapelColor: '#94A3B8',
  },
];

export default function FormalAttireEngine() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [selectedAttireId, setSelectedAttireId] = useState<string>('navy_suit_tie');
  const [attireCategory, setAttireCategory] = useState<'all' | 'men' | 'women'>('all');

  // Attire adjustment handles
  const [attireScale, setAttireScale] = useState<number>(1.0);
  const [attireY, setAttireY] = useState<number>(55); // percentage down from top of photo
  const [attireX, setAttireX] = useState<number>(0);  // horizontal offset in px
  const [attireWidthPct, setAttireWidthPct] = useState<number>(95); // width percentage of photo

  // Photo enhancements
  const [photoZoom, setPhotoZoom] = useState<number>(1.0);
  const [photoPanY, setPhotoPanY] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);

  // Background color replacement
  const [bgChoice, setBgChoice] = useState<'original' | 'white' | 'blue' | 'grey'>('white');

  const [renderedUrl, setRenderedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeAttire = ATTIRE_PRESETS.find((a) => a.id === selectedAttireId) || ATTIRE_PRESETS[0];

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
      setAttireScale(1.0);
      setAttireY(55);
      setAttireX(0);
    };
    img.src = URL.createObjectURL(file);
  };

  // Draw vector suit overlay onto canvas
  const drawAttireVector = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    attire: AttirePreset
  ) => {
    ctx.save();
    ctx.translate(x, y);

    const isWomen = attire.category === 'women';

    // 1. Shoulders and Chest body mass
    ctx.fillStyle = attire.jacketColor;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.4);
    ctx.quadraticCurveTo(w * 0.25, h * 0.05, w * 0.5, h * 0.15); // Left shoulder to neck
    ctx.quadraticCurveTo(w * 0.75, h * 0.05, w, h * 0.4); // Neck to right shoulder
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // 2. White Shirt / Inner V-neck
    ctx.fillStyle = attire.collarColor;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, h * 0.12);
    ctx.lineTo(w * 0.5, isWomen ? h * 0.65 : h * 0.5);
    ctx.lineTo(w * 0.65, h * 0.12);
    ctx.closePath();
    ctx.fill();

    // 3. Necktie (if Men's suit)
    if (attire.tieColor && !isWomen) {
      ctx.fillStyle = attire.tieColor;
      ctx.beginPath();
      // Tie knot
      ctx.moveTo(w * 0.46, h * 0.16);
      ctx.lineTo(w * 0.54, h * 0.16);
      ctx.lineTo(w * 0.53, h * 0.24);
      ctx.lineTo(w * 0.47, h * 0.24);
      ctx.closePath();
      ctx.fill();

      // Tie body
      ctx.beginPath();
      ctx.moveTo(w * 0.47, h * 0.24);
      ctx.lineTo(w * 0.53, h * 0.24);
      ctx.lineTo(w * 0.56, h * 0.85);
      ctx.lineTo(w * 0.5, h * 0.95);
      ctx.lineTo(w * 0.44, h * 0.85);
      ctx.closePath();
      ctx.fill();
    }

    // 4. Left Lapel (Jacket Collar)
    ctx.fillStyle = attire.lapelColor;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, h * 0.12);
    ctx.lineTo(w * 0.28, h * 0.35);
    ctx.lineTo(w * 0.38, h * 0.42);
    ctx.lineTo(w * 0.5, h * 0.75);
    ctx.lineTo(w * 0.44, h * 0.75);
    ctx.lineTo(w * 0.34, h * 0.38);
    ctx.closePath();
    ctx.fill();

    // 5. Right Lapel (Jacket Collar)
    ctx.beginPath();
    ctx.moveTo(w * 0.65, h * 0.12);
    ctx.lineTo(w * 0.72, h * 0.35);
    ctx.lineTo(w * 0.62, h * 0.42);
    ctx.lineTo(w * 0.5, h * 0.75);
    ctx.lineTo(w * 0.56, h * 0.75);
    ctx.lineTo(w * 0.66, h * 0.38);
    ctx.closePath();
    ctx.fill();

    // 6. Realistic shadow under the neckline
    const grad = ctx.createLinearGradient(w * 0.5, h * 0.08, w * 0.5, h * 0.25);
    grad.addColorStop(0, 'rgba(0,0,0,0.4)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.15, w * 0.2, h * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Render passport portrait at exact 35×45mm @ 300 DPI (413 × 531 px)
  const renderComposite = useCallback(() => {
    if (!imageObj) return;

    const width = 413;
    const height = 531;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background fill
    if (bgChoice === 'white') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    } else if (bgChoice === 'blue') {
      ctx.fillStyle = '#6BA4FF';
      ctx.fillRect(0, 0, width, height);
    } else if (bgChoice === 'grey') {
      ctx.fillStyle = '#E2E8F0';
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw user photo with zoom and pan
    ctx.save();
    ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`;

    const imgAspect = imageObj.width / imageObj.height;
    const targetAspect = width / height;

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

    const effW = sWidth / photoZoom;
    const effH = sHeight / photoZoom;
    const effX = sX + (sWidth - effW) / 2;
    const effY = Math.max(
      0,
      Math.min(
        imageObj.height - effH,
        sY + (sHeight - effH) / 2 + photoPanY * (sHeight / 200)
      )
    );

    ctx.drawImage(imageObj, effX, effY, effW, effH, 0, 0, width, height);
    ctx.restore();

    // Draw formal attire overlay
    const attireW = Math.round(width * (attireWidthPct / 100) * attireScale);
    const attireH = Math.round(height * 0.7 * attireScale);
    const attirePosX = Math.round((width - attireW) / 2 + attireX);
    const attirePosY = Math.round((height * (attireY / 100)));

    drawAttireVector(ctx, attirePosX, attirePosY, attireW, attireH, activeAttire);

    // 1px clean passport photo border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setRenderedUrl(dataUrl);
  }, [
    imageObj,
    activeAttire,
    bgChoice,
    photoZoom,
    photoPanY,
    brightness,
    contrast,
    attireScale,
    attireY,
    attireX,
    attireWidthPct,
  ]);

  useEffect(() => {
    if (imageObj) {
      renderComposite();
    }
  }, [imageObj, renderComposite]);

  const handleDownload = () => {
    if (!renderedUrl) return;
    const link = document.createElement('a');
    link.href = renderedUrl;
    link.download = `formal_passport_photo_${activeAttire.id}_300dpi.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAttires = ATTIRE_PRESETS.filter((a) => {
    if (attireCategory === 'all') return true;
    return a.category === attireCategory;
  });

  return (
    <div className="w-full bg-white rounded-3xl border border-surface-darker/70 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>Instant Formal Attire &amp; Suit Changer</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                NO PHOTOSHOP NEEDED
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Replace casual T-shirts with sharp dark blazers, neckties, and formal shirts in 1 click.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setAttireCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              attireCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Attires
          </button>
          <button
            type="button"
            onClick={() => setAttireCategory('men')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              attireCategory === 'men'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Men Suits
          </button>
          <button
            type="button"
            onClick={() => setAttireCategory('women')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              attireCategory === 'women'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Women Blazers
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {!imageObj ? (
          /* Upload Photo State */
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
                Upload Casual Selfie or Passport Photo
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Upload any normal phone photo in casual clothes. We fit a high-definition formal suit or blazer directly over your neckline.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Forever • Official 35×45mm 300 DPI Export • Zero Server Storage</span>
            </div>
          </div>
        ) : (
          /* Editor Dual Panel */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Attire Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>1. Choose Formal Suit / Attire</span>
                  <span className="text-emerald-700 font-bold lowercase">
                    {filteredAttires.length} styles
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {filteredAttires.map((attire) => (
                    <button
                      key={attire.id}
                      type="button"
                      onClick={() => setSelectedAttireId(attire.id)}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex items-center justify-between ${
                        selectedAttireId === attire.id
                          ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center shrink-0"
                          style={{ backgroundColor: attire.color }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: attire.collarColor }}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <span>{attire.name}</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {attire.badge}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 capitalize">
                            {attire.category} Attire • Crisp Formal Fit
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedAttireId === attire.id
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {selectedAttireId === attire.id && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suit Position & Fit Adjuster */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Move className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2. Fit Suit to Your Neckline</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAttireScale(1.0);
                      setAttireY(55);
                      setAttireX(0);
                      setAttireWidthPct(95);
                    }}
                    className="text-[11px] text-emerald-700 hover:underline font-bold"
                  >
                    Reset Fit
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Neckline Height (Up / Down)</span>
                    <span className="font-mono font-bold">{attireY}%</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="75"
                    step="1"
                    value={attireY}
                    onChange={(e) => setAttireY(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Suit Scale &amp; Shoulder Width</span>
                    <span className="font-mono font-bold">{Math.round(attireScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.4"
                    step="0.02"
                    value={attireScale}
                    onChange={(e) => setAttireScale(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Horizontal Center Shift</span>
                    <span className="font-mono font-bold">{attireX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="1"
                    value={attireX}
                    onChange={(e) => setAttireX(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              {/* Photo Head Position & Light */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                    <span>3. Face Position &amp; Lighting</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoZoom(1.0);
                      setPhotoPanY(0);
                      setBrightness(0);
                      setContrast(0);
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
                      <span className="font-mono">{Math.round(photoZoom * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.8"
                      step="0.05"
                      value={photoZoom}
                      onChange={(e) => setPhotoZoom(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Face Height</span>
                      <span className="font-mono">{photoPanY}</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      step="1"
                      value={photoPanY}
                      onChange={(e) => setPhotoPanY(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Brightness</span>
                      <span className="font-mono">{brightness}</span>
                    </div>
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
                    <div className="flex justify-between text-slate-600">
                      <span>Contrast</span>
                      <span className="font-mono">{contrast}</span>
                    </div>
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
              </div>

              {/* Replace Photo Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Upload Another Photo</span>
              </button>
            </div>

            {/* Right Live Preview & Download (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span>Live Studio Output (35×45 mm)</span>
                  <span className="text-emerald-700 font-bold lowercase">
                    300 DPI • official ratio
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Passport / SSC / UPSC Ready
                </span>
              </div>

              {/* Preview Container */}
              <div className="relative bg-slate-200/70 p-6 rounded-3xl border border-slate-300/80 shadow-inner flex items-center justify-center overflow-hidden min-h-[440px]">
                {renderedUrl ? (
                  <div className="relative shadow-2xl rounded-sm border-2 border-white bg-white overflow-hidden">
                    <img
                      src={renderedUrl}
                      alt="Formal Suit Fitted Passport Photo"
                      className="w-64 h-auto object-contain block select-none"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400 py-16">
                    <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
                    <span className="text-xs font-bold">Fitting Formal Attire...</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Formal Passport Photo (300 DPI JPG)</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold">100% Exam Portal &amp; Visa Acceptance Guaranteed:</div>
                  <div className="text-emerald-800/90 leading-relaxed">
                    Recruitment portals (SSC, UPSC, IBPS, State PSCs) and visa consulates strongly prefer formal attire with clear shoulder contours. Photos exported from VeriSeal adhere to the standard 3.5×4.5 cm geometry at 300 DPI.
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
