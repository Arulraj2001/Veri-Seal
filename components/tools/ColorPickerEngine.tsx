'use client';

import * as React from 'react';
import {
  Pipette,
  Copy,
  Check,
  Sparkles,
  Upload,
  Palette,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
  FileCode,
} from 'lucide-react';

interface ColorState {
  r: number;
  g: number;
  b: number;
  a: number; // 0 to 1
  h: number; // 0 to 360
  s: number; // 0 to 100
  v: number; // 0 to 100
}

export function ColorPickerEngine({ defaultHex = '#E6570B' }: { defaultHex?: string }) {
  const [color, setColor] = React.useState<ColorState>({
    r: 230,
    g: 87,
    b: 11,
    a: 1,
    h: 21,
    s: 95,
    v: 90,
  });

  const [copiedFormat, setCopiedFormat] = React.useState<string | null>(null);
  const [bgTestColor, setBgTestColor] = React.useState<string>('#FFFFFF');
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [paletteSwatches, setPaletteSwatches] = React.useState<string[]>([]);
  const [eyedropperColor, setEyedropperColor] = React.useState<string | null>(null);

  const imageCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const uploadInputRef = React.useRef<HTMLInputElement | null>(null);

  // Conversions
  const hex = React.useMemo(() => {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
  }, [color.r, color.g, color.b]);

  const hexa = React.useMemo(() => {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    const aHex = Math.round(color.a * 255).toString(16).padStart(2, '0');
    return `${hex}${aHex}`.toUpperCase();
  }, [hex, color.a]);

  const rgb = `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
  const rgba = `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a.toFixed(2)})`;

  // Calculate HSL
  const hsl = React.useMemo(() => {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }, [color.r, color.g, color.b]);

  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hslaString = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color.a.toFixed(2)})`;

  // Calculate CMYK
  const cmyk = React.useMemo(() => {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;
    const k = 1 - Math.max(r, g, b);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  }, [color.r, color.g, color.b]);

  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
  const hsvString = `hsv(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.v)}%)`;

  // Calculate Relative Luminance & WCAG Contrast Ratio
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const contrastRatio = React.useMemo(() => {
    const l1 = getLuminance(color.r, color.g, color.b);
    // Parse bg test color
    let bgR = 255,
      bgG = 255,
      bgB = 255;
    if (bgTestColor === '#000000') {
      bgR = 0;
      bgG = 0;
      bgB = 0;
    }
    const l2 = getLuminance(bgR, bgG, bgB);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  }, [color.r, color.g, color.b, bgTestColor]);

  // Update color from Hex input
  const handleHexChange = (val: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      const r = parseInt(val.slice(1, 3), 16);
      const g = parseInt(val.slice(3, 5), 16);
      const b = parseInt(val.slice(5, 7), 16);
      setColor((prev) => ({ ...prev, r, g, b }));
    }
  };

  // Copy helper
  const copyValue = async (val: string, formatId: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedFormat(formatId);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Upload image & extract palette
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploadedImage(url);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = imageCanvasRef.current;
        if (!canvas) return;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        // Simple dominant palette extraction via pixel sampling
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCounts: { [key: string]: number } = {};
        const step = Math.max(4, Math.floor(imgData.length / 4000));

        for (let i = 0; i < imgData.length; i += step * 4) {
          const r = Math.round(imgData[i] / 24) * 24;
          const g = Math.round(imgData[i + 1] / 24) * 24;
          const b = Math.round(imgData[i + 2] / 24) * 24;
          const a = imgData[i + 3];
          if (a > 128) {
            const hexKey = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
            colorCounts[hexKey] = (colorCounts[hexKey] || 0) + 1;
          }
        }

        const sorted = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([hexK]) => hexK);

        setPaletteSwatches(sorted);
      };
      img.src = url;
    }
  };

  // Eyedropper pick on uploaded image canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = imageCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    setColor((prev) => ({ ...prev, r, g, b }));
  };

  return (
    <div className="space-y-6">
      {/* Interactive Color Studio */}
      <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Large Color Swatch & Interactive Sliders */}
          <div className="lg:col-span-5 space-y-5">
            <div
              style={{ backgroundColor: rgba }}
              className="h-44 sm:h-52 rounded-3xl border-4 border-white shadow-card flex flex-col justify-end p-4 transition-colors relative overflow-hidden"
            >
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white/70">
                    Active Color
                  </span>
                  <p className="text-lg sm:text-xl font-mono font-extrabold">{hex}</p>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-white/90 bg-white/10 px-2.5 py-1 rounded-xl">
                  <span>A: {color.a.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* RGB Sliders */}
            <div className="space-y-3 bg-surface/50 rounded-2xl p-4 border border-surface-darker">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-text-main">
                  <span className="text-red-600">Red (R)</span>
                  <span className="font-mono">{color.r}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={color.r}
                  onChange={(e) => setColor((prev) => ({ ...prev, r: Number(e.target.value) }))}
                  className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-text-main">
                  <span className="text-emerald-600">Green (G)</span>
                  <span className="font-mono">{color.g}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={color.g}
                  onChange={(e) => setColor((prev) => ({ ...prev, g: Number(e.target.value) }))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-text-main">
                  <span className="text-blue-600">Blue (B)</span>
                  <span className="font-mono">{color.b}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={color.b}
                  onChange={(e) => setColor((prev) => ({ ...prev, b: Number(e.target.value) }))}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-text-main">
                  <span>Opacity / Alpha</span>
                  <span className="font-mono">{Math.round(color.a * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(color.a * 100)}
                  onChange={(e) =>
                    setColor((prev) => ({ ...prev, a: Number(e.target.value) / 100 }))
                  }
                  className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Real-time Multi-Format Output Matrix */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-sm font-bold text-text-main flex items-center gap-2 pb-1 border-b border-surface-darker">
              <Sparkles className="w-4 h-4 text-primary" />
              Converted Color Formats (1-Click Copy)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { label: 'HEX', val: hex, id: 'hex' },
                { label: 'HEXA', val: hexa, id: 'hexa' },
                { label: 'RGB', val: rgb, id: 'rgb' },
                { label: 'RGBA', val: rgba, id: 'rgba' },
                { label: 'HSL', val: hslString, id: 'hsl' },
                { label: 'HSLA', val: hslaString, id: 'hsla' },
                { label: 'HSV', val: hsvString, id: 'hsv' },
                { label: 'CMYK', val: cmykString, id: 'cmyk' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => copyValue(item.val, item.id)}
                  className="p-3 rounded-2xl bg-surface hover:bg-primary-light/40 border border-surface-darker hover:border-primary/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-mono font-bold text-primary uppercase">
                      {item.label}
                    </span>
                    <p className="text-xs font-mono font-extrabold text-text-main truncate">
                      {item.val}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="p-1.5 rounded-lg bg-white border border-surface-darker text-text-main/60 group-hover:text-primary transition-colors shrink-0"
                  >
                    {copiedFormat === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* CSS Snippet Generator */}
            <div className="p-3.5 rounded-2xl bg-neutral-900 text-neutral-100 font-mono text-xs space-y-1 mt-2">
              <div className="flex items-center justify-between pb-1 border-b border-neutral-800 text-[11px] text-neutral-400">
                <span>CSS Declarations</span>
                <button
                  type="button"
                  onClick={() =>
                    copyValue(
                      `color: ${hex};\nbackground-color: ${rgba};\nborder-color: ${hex};`,
                      'css'
                    )
                  }
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {copiedFormat === 'css' ? 'Copied!' : 'Copy CSS'}
                </button>
              </div>
              <p className="text-emerald-400">color: {hex};</p>
              <p className="text-neutral-300">background-color: {rgba};</p>
              <p className="text-amber-400">border-color: {hex};</p>
            </div>
          </div>
        </div>

        {/* WCAG 2.1 Contrast Checker */}
        <div className="p-5 rounded-3xl bg-surface/50 border border-surface-darker space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                WCAG 2.1 Accessibility Contrast Checker
              </h4>
              <p className="text-xs text-text-main/60">
                Verify readability for web accessibility guidelines (ADA &amp; Section 508 compliance).
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-text-main/70">Test Background:</span>
              <button
                type="button"
                onClick={() => setBgTestColor('#FFFFFF')}
                className={`px-3 py-1 rounded-lg border font-bold text-xs ${
                  bgTestColor === '#FFFFFF'
                    ? 'bg-white border-primary text-text-main shadow-xs'
                    : 'bg-surface border-surface-darker text-text-main/70'
                }`}
              >
                White
              </button>
              <button
                type="button"
                onClick={() => setBgTestColor('#000000')}
                className={`px-3 py-1 rounded-lg border font-bold text-xs ${
                  bgTestColor === '#000000'
                    ? 'bg-neutral-900 border-primary text-white shadow-xs'
                    : 'bg-surface border-surface-darker text-text-main/70'
                }`}
              >
                Black
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            {/* Contrast Score Box */}
            <div className="p-4 rounded-2xl bg-white border border-surface-darker text-center space-y-1 shadow-xs">
              <span className="text-[10px] font-mono text-text-main/60 uppercase">Contrast Ratio</span>
              <p className="text-2xl font-mono font-extrabold text-primary">
                {contrastRatio.toFixed(2)} : 1
              </p>
            </div>

            {/* Badges */}
            <div className="sm:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-surface-darker space-y-0.5">
                <span className="text-[10px] font-bold text-text-main/60">AA Normal (4.5:1)</span>
                <p className={`font-bold ${contrastRatio >= 4.5 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {contrastRatio >= 4.5 ? '✓ PASS' : '✕ FAIL'}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-surface-darker space-y-0.5">
                <span className="text-[10px] font-bold text-text-main/60">AA Large (3.0:1)</span>
                <p className={`font-bold ${contrastRatio >= 3.0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {contrastRatio >= 3.0 ? '✓ PASS' : '✕ FAIL'}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-surface-darker space-y-0.5">
                <span className="text-[10px] font-bold text-text-main/60">AAA Normal (7.0:1)</span>
                <p className={`font-bold ${contrastRatio >= 7.0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {contrastRatio >= 7.0 ? '✓ PASS' : '✕ FAIL'}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-surface-darker space-y-0.5">
                <span className="text-[10px] font-bold text-text-main/60">AAA Large (4.5:1)</span>
                <p className={`font-bold ${contrastRatio >= 4.5 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {contrastRatio >= 4.5 ? '✓ PASS' : '✕ FAIL'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Eyedropper & Palette Extractor */}
        <div className="p-5 rounded-3xl bg-surface/50 border border-surface-darker space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                Image Eyedropper &amp; Palette Extractor
              </h4>
              <p className="text-xs text-text-main/60">
                Upload any screenshot, photo, or brand logo to extract dominant colors and sample pixels.
              </p>
            </div>

            <button
              type="button"
              onClick={() => uploadInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-white hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5 text-primary" /> Upload Image
            </button>
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {uploadedImage && (
            <div className="space-y-4 pt-2">
              <div className="rounded-2xl border border-surface-darker overflow-hidden max-h-72 bg-neutral-900/5 flex items-center justify-center p-2 relative cursor-crosshair">
                <canvas
                  ref={imageCanvasRef}
                  onClick={handleCanvasClick}
                  className="max-h-64 max-w-full object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Extracted Swatches */}
              {paletteSwatches.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-text-main">
                    Dominant Image Palette Swatches:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {paletteSwatches.map((swatchHex) => (
                      <button
                        key={swatchHex}
                        type="button"
                        onClick={() => handleHexChange(swatchHex)}
                        style={{ backgroundColor: swatchHex }}
                        className="h-10 px-4 rounded-xl border border-black/10 text-xs font-mono font-bold text-white shadow-xs hover:scale-105 transition-transform flex items-center justify-center"
                      >
                        {swatchHex}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
