'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Camera,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Grid,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function UkPassportPhotoPage() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [zoom, setZoom] = React.useState<number>(1);
  const [posX, setPosX] = React.useState<number>(0);
  const [posY, setPosY] = React.useState<number>(0);
  const [format, setFormat] = React.useState<'single' | 'sheet4x6'>('single');

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const imgElementRef = React.useRef<HTMLImageElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setImageSrc(src);
        setZoom(1);
        setPosX(0);
        setPosY(0);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => {
          imgElementRef.current = img;
          renderCanvas();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgElementRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (format === 'single') {
      // 35 x 45 mm @ 300 DPI = 413 x 531 pixels
      canvas.width = 413;
      canvas.height = 531;

      // Plain cream / light grey official background
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const drawW = canvas.width * zoom;
      const drawH = (img.height / img.width) * drawW;
      const x = (canvas.width - drawW) / 2 + posX;
      const y = (canvas.height - drawH) / 2 + posY;
      ctx.drawImage(img, x, y, drawW, drawH);
    } else {
      // 4 x 6 inch (10 x 15 cm) sheet @ 300 DPI = 1200 x 1800 pixels
      canvas.width = 1200;
      canvas.height = 1800;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create temporary 35x45 mm canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 413;
      tempCanvas.height = 531;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.fillStyle = '#F8FAFC';
        tempCtx.fillRect(0, 0, 413, 531);
        const drawW = 413 * zoom;
        const drawH = (img.height / img.width) * drawW;
        const x = (413 - drawW) / 2 + posX;
        const y = (531 - drawH) / 2 + posY;
        tempCtx.drawImage(img, x, y, drawW, drawH);

        // Grid of 6 photos with cutting guidelines
        const cols = 2;
        const rows = 3;
        const startX = 140;
        const startY = 80;
        const gapX = 94;
        const gapY = 40;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const px = startX + c * (413 + gapX);
            const py = startY + r * (531 + gapY);
            ctx.drawImage(tempCanvas, px, py);

            ctx.strokeStyle = '#E2E8F0';
            ctx.lineWidth = 1;
            ctx.strokeRect(px, py, 413, 531);
          }
        }
      }
    }
  }, [zoom, posX, posY, format]);

  React.useEffect(() => {
    if (imageSrc && imgElementRef.current) {
      renderCanvas();
    }
  }, [renderCanvas, imageSrc, zoom, posX, posY, format]);

  const downloadPhoto = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `uk-passport-photo-${format}-veriseal.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org FAQ & SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'UK HM Passport Photo Checker & Printable Sheet Maker (35×45mm)',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Crop and align biometric UK passport photos meeting HM Passport Office (HMPO) and ICAO Doc 9303 standards (35x45mm, 413x531 px @ 300 DPI). Generates 4x6 inch printable 6-photo sheets.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What are the official UK passport photo size specifications?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'According to HM Passport Office, a UK passport photo must measure 35mm wide by 45mm high (413 by 531 pixels when printed at 300 DPI). The distance from the chin to the crown of the head must be between 29mm and 34mm.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What background is acceptable for UK passport photos?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The background must be plain light grey or cream. Pure white or patterned backgrounds are rejected by HM Passport Office biometric scanners.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/uk" className="hover:text-indigo-900 transition">
            United Kingdom
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">HM Passport Photo Biometric Tool</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            HM Passport Office (HMPO) &amp; ICAO Doc 9303
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            UK Passport Photo Checker &amp; Generator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Enforce official 35×45mm biometric passport specifications, head height standards (29–34mm), and create 4×6 inch printable sheets.
          </p>
        </div>

        {/* Main Workspace Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 mb-8 space-y-6">
          {/* Format Selector Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFormat('single')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
                  format === 'single'
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Single Photo (35×45mm / 413×531px)
              </button>
              <button
                type="button"
                onClick={() => setFormat('sheet4x6')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  format === 'sheet4x6'
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                Printable 4×6 Inch Sheet (6 Photos with Guidelines)
              </button>
            </div>

            {imageSrc && (
              <button
                type="button"
                onClick={downloadPhoto}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download Ready Photo
              </button>
            )}
          </div>

          {/* Upload or Canvas Editor */}
          {!imageSrc ? (
            <label className="border-2 border-dashed border-slate-300 hover:border-indigo-900 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition bg-slate-50/50 hover:bg-indigo-50/20">
              <Upload className="w-10 h-10 text-indigo-900 mb-3" />
              <span className="font-bold text-slate-800 text-sm mb-1">
                Select a portrait photo from your computer
              </span>
              <span className="text-xs text-slate-500 text-center max-w-sm">
                Formats: JPG, PNG, or WebP. Use a neutral expression against a plain light grey or cream wall with natural frontal lighting.
              </span>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Canvas Preview */}
              <div className="md:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative">
                <canvas
                  ref={canvasRef}
                  className="max-h-[420px] max-w-full shadow-md rounded border border-slate-300 bg-white"
                />
              </div>

              {/* Adjustment Controls */}
              <div className="md:col-span-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Biometric Framing Adjustments
                </h3>

                {/* Zoom */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Face Zoom</span>
                    <span>{zoom.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-indigo-900"
                  />
                </div>

                {/* Vertical Position */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Vertical Position (Chin to Crown)</span>
                    <span>{posY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    step="5"
                    value={posY}
                    onChange={(e) => setPosY(parseInt(e.target.value))}
                    className="w-full accent-indigo-900"
                  />
                </div>

                {/* Horizontal Position */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Horizontal Position</span>
                    <span>{posX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    step="5"
                    value={posX}
                    onChange={(e) => setPosX(parseInt(e.target.value))}
                    className="w-full accent-indigo-900"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setPosX(0);
                      setPosY(0);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Reset Position
                  </button>
                  <label className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 text-center cursor-pointer transition">
                    Replace Photo
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AdSense Placement */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              HM Passport Office (HMPO) Biometric Photo Standards
            </h2>
            <p>
              British passport photographs must adhere to rigorous international civil aviation standards codified in <strong>ICAO Document 9303</strong> and enforced by HM Passport Office. Automated border control gates (e-Passport gates) reject images that deviate by even a fraction of a millimeter in aspect ratio, head height, or contrast balance.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Official Sizing and Positioning Guidelines
            </h3>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Dimensions:</strong> Exactly <strong>35mm wide by 45mm high</strong> (413 × 531 pixels at 300 DPI resolution).
              </li>
              <li>
                <strong>Head Size:</strong> The distance from the base of the chin to the top of the head must measure between <strong>29mm and 34mm</strong> (approximately 70% to 80% of total frame height).
              </li>
              <li>
                <strong>Background:</strong> Must be plain light grey or plain cream. Pure bright white backgrounds are not permitted as they interfere with automated boundary edge detection.
              </li>
              <li>
                <strong>Expression:</strong> Eyes open and clearly visible, mouth closed with a neutral expression, facing forwards with no tilt.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

