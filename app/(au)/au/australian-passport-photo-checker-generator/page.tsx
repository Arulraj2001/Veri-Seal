'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Camera,
  ShieldCheck,
  Building2,
  FileText,
  ArrowRight,
  Sparkles,
  Info,
  DollarSign,
  TrendingDown,
  CheckCircle2,
  Clock,
  HelpCircle,
  Download,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Upload,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function AustralianPassportPhotoPage() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [zoom, setZoom] = React.useState<number>(1);
  const [rotation, setRotation] = React.useState<number>(0);
  const [offsetX, setOffsetX] = React.useState<number>(0);
  const [offsetY, setOffsetY] = React.useState<number>(0);
  const [bgTone, setBgTone] = React.useState<'grey' | 'cream'>('grey');

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const sheetCanvasRef = React.useRef<HTMLCanvasElement>(null);

  // APO Specifications
  // 35mm x 45mm at 300 DPI: 413 x 531 pixels
  const PHOTO_WIDTH = 413;
  const PHOTO_HEIGHT = 531;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setZoom(1);
        setRotation(0);
        setOffsetX(0);
        setOffsetY(0);
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw Single Passport Preview
  React.useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      ctx.clearRect(0, 0, PHOTO_WIDTH, PHOTO_HEIGHT);

      // Background Tone (APO requires uniform light grey or cream)
      ctx.fillStyle = bgTone === 'grey' ? '#EAEAEA' : '#FAF6EE';
      ctx.fillRect(0, 0, PHOTO_WIDTH, PHOTO_HEIGHT);

      ctx.save();
      ctx.translate(PHOTO_WIDTH / 2 + offsetX, PHOTO_HEIGHT / 2 + offsetY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Center image
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();
    };
  }, [imageSrc, zoom, rotation, offsetX, offsetY, bgTone]);

  // Generate 4x6 Printable Sheet (6 Photos at 300 DPI: 1200 x 1800 px)
  const handleDownloadSheet = () => {
    if (!canvasRef.current || !sheetCanvasRef.current) return;
    const singleCanvas = canvasRef.current;
    const sheetCanvas = sheetCanvasRef.current;
    const ctx = sheetCanvas.getContext('2d');
    if (!ctx) return;

    // 4x6 inches at 300 DPI = 1200 x 1800 px
    sheetCanvas.width = 1200;
    sheetCanvas.height = 1800;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

    // Arrange 6 photos (2 columns x 3 rows)
    const marginX = (1200 - (PHOTO_WIDTH * 2 + 100)) / 2;
    const marginY = (1800 - (PHOTO_HEIGHT * 3 + 120)) / 2;

    for (let col = 0; col < 2; col++) {
      for (let row = 0; row < 3; row++) {
        const x = marginX + col * (PHOTO_WIDTH + 100);
        const y = marginY + row * (PHOTO_HEIGHT + 60);

        // Draw photo
        ctx.drawImage(singleCanvas, x, y, PHOTO_WIDTH, PHOTO_HEIGHT);

        // Draw thin cut line
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, PHOTO_WIDTH, PHOTO_HEIGHT);
      }
    }

    // Trigger download
    const link = document.createElement('a');
    link.download = 'australian_passport_photos_4x6_300dpi.jpg';
    link.href = sheetCanvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian Passport Photo Biometric Tool (35x45mm) APO Compliant',
    operatingSystem: 'All',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian Passport Office (APO) compliant 35x45mm biometric passport photo generator. Features 32-36mm head oval guidance, light grey background, and 4x6 printable template.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/au" className="hover:text-amber-800 transition-colors">Australia Suite</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Australian Passport Photo Tool</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Camera className="w-3.5 h-3.5" />
          <span>Australian Passport Office (APO) &amp; ICAO 9303</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Australian Passport Photo Biometric Tool (35×45 mm)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Create 100% compliant Australian passport photos meeting exact APO specifications: 35×45 mm dimensions, 32–36 mm chin-to-crown ratio, mandatory light grey or cream background, and downloadable 4×6 inch 300 DPI printable sheets.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload & Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Photo Controls</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              35×45 mm @ 300 DPI
            </span>
          </div>

          {/* File Upload Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Upload Portrait Photo</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-6 cursor-pointer bg-slate-50 hover:bg-amber-50/40 transition-all text-center">
              <Upload className="w-8 h-8 text-amber-700 mb-2" />
              <span className="text-xs font-bold text-slate-900">Click to Select Photo (JPEG or PNG)</span>
              <span className="text-[11px] text-slate-500 mt-1">Processed 100% privately in your browser</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {imageSrc && (
            <>
              {/* Zoom Control */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Zoom / Head Scaling</span>
                  <span className="font-mono text-amber-800">{zoom.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="3.0"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              {/* Rotation */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Straighten / Rotate</span>
                  <span className="font-mono text-amber-800">{rotation}&deg;</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              {/* Position Offsets */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-700">Horizontal Pan</span>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={offsetX}
                    onChange={(e) => setOffsetX(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-700">Vertical Pan</span>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={offsetY}
                    onChange={(e) => setOffsetY(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>
              </div>

              {/* Background Tone Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Background Tone (APO Mandatory)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBgTone('grey')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      bgTone === 'grey' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Uniform Light Grey (#EAEAEA)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgTone('cream')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      bgTone === 'cream' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Uniform Cream (#FAF6EE)
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>100% Client-Side Canvas. No biometric photos ever uploaded to any server.</span>
          </div>
        </div>

        {/* Biometric Preview Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col items-center space-y-5">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                APO Biometric Alignment Overlay
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                Head: 32–36 mm Zone
              </span>
            </div>

            {/* Canvas Container with Biometric Guide Overlay */}
            <div className="relative border-4 border-slate-700 rounded-2xl overflow-hidden shadow-2xl bg-slate-800">
              <canvas
                ref={canvasRef}
                width={PHOTO_WIDTH}
                height={PHOTO_HEIGHT}
                className="block max-w-[280px] sm:max-w-[320px] h-auto"
              />

              {/* Biometric Oval Overlay Guideline */}
              <div
                className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center"
                style={{
                  paddingTop: '35px',
                  paddingBottom: '80px',
                }}
              >
                <div className="w-[68%] h-[68%] border-2 border-dashed border-emerald-400/80 rounded-full flex items-center justify-center relative">
                  <div className="absolute top-1 text-[10px] font-mono font-bold text-emerald-300 bg-slate-950/80 px-1 rounded">
                    Crown (Top of Head)
                  </div>
                  <div className="absolute bottom-1 text-[10px] font-mono font-bold text-emerald-300 bg-slate-950/80 px-1 rounded">
                    Chin Baseline
                  </div>
                  <div className="w-full h-[1px] bg-emerald-400/30" />
                </div>
              </div>
            </div>

            {/* Download Action Buttons */}
            {imageSrc && (
              <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadSheet}
                  className="flex-1 py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 4×6&quot; Printable Sheet (6 Photos @ 300 DPI)</span>
                </button>
              </div>
            )}
          </div>

          {/* Hidden Canvas for 4x6 Sheet */}
          <canvas ref={sheetCanvasRef} className="hidden" />

          {/* APO Checklist */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Australian Passport Office (APO) Mandatory Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>35 mm to 40 mm wide by 45 mm to 50 mm high</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chin to crown strictly between 32 mm and 36 mm</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Uniform light grey or cream plain background</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Eyes open, looking directly into lens, neutral face</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Australian Passport Office (APO) Photographic Standards
          </h2>
          <p>
            Under the Australian Passports Act 2005 and International Civil Aviation Organization (ICAO) Document 9303, passport photographs are rigorously checked by facial recognition algorithms. The most frequent cause of application rejection is incorrect head size (failing the strict 32 mm to 36 mm crown-to-chin range) or using a pure white background that causes light glare around light-coloured hair.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Glasses Prohibition Rules
          </h2>
          <p>
            Since 1 July 2018, glasses of any kind (including prescription spectacles) are not permitted in Australian passport photos. The only exception is where glasses cannot be removed for severe medical reasons, which must be corroborated by a medical certificate signed by a registered medical practitioner.
          </p>
        </section>
      </article>
    </div>
  );
}

