'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  PenTool,
  Type,
  Upload,
  Download,
  RotateCcw,
  RotateCw,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  FileSignature,
  FileText,
  Sliders,
  Copy,
  Check,
} from 'lucide-react';

interface FontOption {
  name: string;
  family: string;
  googleFont: string;
}

const SIGNATURE_FONTS: FontOption[] = [
  { name: 'Executive Cursive', family: "'Great Vibes', cursive", googleFont: 'Great+Vibes' },
  { name: 'Modern Signature', family: "'Dancing Script', cursive", googleFont: 'Dancing+Script' },
  { name: 'Formal Calligraphy', family: "'Alex Brush', cursive", googleFont: 'Alex+Brush' },
  { name: 'Natural Pen', family: "'Caveat', cursive", googleFont: 'Caveat' },
  { name: 'Elegant Script', family: "'Allura', cursive", googleFont: 'Allura' },
  { name: 'Presidential Flow', family: "'Sacramento', cursive", googleFont: 'Sacramento' },
  { name: 'Fluid Fountain', family: "'Parisienne', cursive", googleFont: 'Parisienne' },
  { name: 'Casual Hand', family: "'Pacifico', cursive", googleFont: 'Pacifico' },
  { name: 'Classic Ink', family: "'Marck Script', cursive", googleFont: 'Marck+Script' },
  { name: 'Heritage Signature', family: "'Satisfy', cursive", googleFont: 'Satisfy' },
  { name: 'Vantage Quill', family: "'Herr Von Muellerhoff', cursive", googleFont: 'Herr+Von+Muellerhoff' },
  { name: 'Fine Point', family: "'Kristi', cursive", googleFont: 'Kristi' },
];

const INK_COLORS = [
  { label: 'Executive Black', hex: '#111827', class: 'bg-neutral-900' },
  { label: 'Royal Blue', hex: '#003366', class: 'bg-blue-900' },
  { label: 'Deep Navy', hex: '#0a192f', class: 'bg-slate-900' },
  { label: 'Dark Burgundy', hex: '#800020', class: 'bg-rose-950' },
  { label: 'Emerald Ink', hex: '#064e3b', class: 'bg-emerald-950' },
];

export function SignatureGeneratorEngine() {
  const [activeTab, setActiveTab] = React.useState<'type' | 'draw' | 'upload'>('type');
  const [nameInput, setNameInput] = React.useState<string>('Alex Morgan');
  const [selectedFont, setSelectedFont] = React.useState<FontOption>(SIGNATURE_FONTS[0]);
  const [inkColor, setInkColor] = React.useState<string>(INK_COLORS[0].hex);
  const [fontSize, setFontSize] = React.useState<number>(56);
  const [slantAngle, setSlantAngle] = React.useState<number>(0);
  const [strokeWeight, setStrokeWeight] = React.useState<number>(3);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Drawing mode state
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = React.useState<boolean>(false);
  const [history, setHistory] = React.useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(-1);
  const lastPointRef = React.useRef<{ x: number; y: number } | null>(null);

  // Upload/Scan mode state
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [threshold, setThreshold] = React.useState<number>(180);
  const [cleanedScanUrl, setCleanedScanUrl] = React.useState<string | null>(null);
  const uploadInputRef = React.useRef<HTMLInputElement | null>(null);

  // Dynamic Google Fonts loader
  React.useEffect(() => {
    const families = SIGNATURE_FONTS.map((f) => f.googleFont).join('&family=');
    const href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;

    let link = document.querySelector(`link[href*="fonts.googleapis.com/css2?family=Great+Vibes"]`);
    if (!link) {
      link = document.createElement('link');
      (link as HTMLLinkElement).rel = 'stylesheet';
      (link as HTMLLinkElement).href = href;
      document.head.appendChild(link);
    }
  }, []);

  // Initialize and handle drawing canvas
  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  };

  const saveHistoryState = () => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(data);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undoDraw = () => {
    if (historyIndex > 0) {
      const ctx = getCanvasContext();
      if (!ctx) return;
      const targetIndex = historyIndex - 1;
      ctx.putImageData(history[targetIndex], 0, 0);
      setHistoryIndex(targetIndex);
    } else if (historyIndex === 0) {
      clearCanvas();
    }
  };

  const redoDraw = () => {
    if (historyIndex < history.length - 1) {
      const ctx = getCanvasContext();
      if (!ctx) return;
      const targetIndex = historyIndex + 1;
      ctx.putImageData(history[targetIndex], 0, 0);
      setHistoryIndex(targetIndex);
    }
  };

  const clearCanvas = () => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    lastPointRef.current = { x, y };

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(x, y, strokeWeight / 2, 0, Math.PI * 2);
      ctx.fillStyle = inkColor;
      ctx.fill();
    }
  };

  const drawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPointRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.strokeStyle = inkColor;
    ctx.lineWidth = strokeWeight;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Midpoint smoothing
    const midX = (lastPointRef.current.x + x) / 2;
    const midY = (lastPointRef.current.y + y) / 2;

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.quadraticCurveTo(lastPointRef.current.x, lastPointRef.current.y, midX, midY);
    ctx.stroke();

    lastPointRef.current = { x, y };
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPointRef.current = null;
      saveHistoryState();
    }
  };

  // Upload signature & clean threshold processing
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploadedImage(url);
      processCleanSignature(url, threshold);
    }
  };

  const processCleanSignature = (imgUrl: string, thresh: number) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Extract ink and turn light paper background to transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        if (brightness > thresh) {
          data[i + 3] = 0; // Transparent
        } else {
          // Color ink with selected ink color
          const rgb = hexToRgb(inkColor);
          if (rgb) {
            data[i] = rgb.r;
            data[i + 1] = rgb.g;
            data[i + 2] = rgb.b;
          }
          data[i + 3] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setCleanedScanUrl(canvas.toDataURL('image/png'));
    };
    img.src = imgUrl;
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Export helper: creates trimmed, transparent high-res PNG
  const exportSignatureCanvas = (whiteBackground = false): HTMLCanvasElement => {
    const exportCanvas = document.createElement('canvas');
    const ctx = exportCanvas.getContext('2d');

    if (activeTab === 'type') {
      exportCanvas.width = 900;
      exportCanvas.height = 350;
      if (!ctx) return exportCanvas;

      if (whiteBackground) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      }

      ctx.fillStyle = inkColor;
      ctx.font = `${fontSize * 1.5}px ${selectedFont.family}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.save();
      ctx.translate(exportCanvas.width / 2, exportCanvas.height / 2);
      ctx.rotate((slantAngle * Math.PI) / 180);
      ctx.fillText(nameInput || 'Signature', 0, 0);
      ctx.restore();
    } else if (activeTab === 'draw' && canvasRef.current) {
      exportCanvas.width = canvasRef.current.width;
      exportCanvas.height = canvasRef.current.height;
      if (!ctx) return exportCanvas;

      if (whiteBackground) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      }
      ctx.drawImage(canvasRef.current, 0, 0);
    }

    return exportCanvas;
  };

  const downloadPNG = () => {
    const canvas = exportSignatureCanvas(false);
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `signature-transparent-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadJPEG = () => {
    const canvas = exportSignatureCanvas(true);
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpeg', 0.95);
    a.download = `signature-300dpi-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadSVG = () => {
    const text = nameInput || 'Signature';
    const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="800" height="300">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=${selectedFont.googleFont}&amp;display=swap');
    .sig { font-family: ${selectedFont.family}; font-size: ${fontSize * 1.3}px; fill: ${inkColor}; }
  </style>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" class="sig" transform="rotate(${slantAngle} 400 150)">${text}</text>
</svg>`.trim();

    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `signature-vector-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyToClipboard = async () => {
    const canvas = exportSignatureCanvas(false);
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Mode Switcher */}
      <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-darker">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface border border-surface-darker">
            <button
              type="button"
              onClick={() => setActiveTab('type')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'type'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-main/70 hover:text-text-main'
              }`}
            >
              <Type className="w-4 h-4" /> Type Signature
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('draw')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'draw'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-main/70 hover:text-text-main'
              }`}
            >
              <PenTool className="w-4 h-4" /> Draw Signature
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'upload'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-main/70 hover:text-text-main'
              }`}
            >
              <Upload className="w-4 h-4" /> Scan Paper Ink
            </button>
          </div>

          {/* Ink Color Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-main/60">Ink Color:</span>
            <div className="flex items-center gap-1.5">
              {INK_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  title={c.label}
                  onClick={() => setInkColor(c.hex)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${c.class} ${
                    inkColor === c.hex
                      ? 'border-primary scale-110 shadow-sm'
                      : 'border-white/60 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tab 1: Type Signature */}
        {activeTab === 'type' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-text-main">Your Full Name or Initials</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-surface border border-surface-darker text-text-main text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-text-main">
                  <span>Slant Angle</span>
                  <span className="font-mono text-primary">{slantAngle}°</span>
                </div>
                <input
                  type="range"
                  min={-15}
                  max={25}
                  value={slantAngle}
                  onChange={(e) => setSlantAngle(Number(e.target.value))}
                  className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary mt-2"
                />
              </div>
            </div>

            {/* Font Showcase Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main flex items-center justify-between">
                <span>Select Calligraphy Style ({SIGNATURE_FONTS.length} Handwriting Fonts)</span>
                <span className="text-[11px] font-bold text-primary">Live Click-to-Apply</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SIGNATURE_FONTS.map((f) => {
                  const isSelected = selectedFont.name === f.name;
                  return (
                    <div
                      key={f.name}
                      onClick={() => setSelectedFont(f)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-32 ${
                        isSelected
                          ? 'border-primary bg-primary-light/40 shadow-sm ring-2 ring-primary/20'
                          : 'border-surface-darker hover:border-primary/40 bg-surface/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-text-main/60 pb-1">
                        <span className="font-semibold">{f.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                      </div>

                      <div
                        style={{
                          fontFamily: f.family,
                          color: inkColor,
                          transform: `rotate(${slantAngle}deg)`,
                        }}
                        className="text-2xl text-center truncate py-2 select-none"
                      >
                        {nameInput || 'Signature'}
                      </div>

                      <span className="text-[9px] font-mono text-text-main/40 uppercase text-right">
                        300 DPI Ready
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Draw Signature */}
        {activeTab === 'draw' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <span className="font-bold text-text-main">Pen Weight:</span>
                <div className="flex items-center gap-1.5">
                  {[2, 3, 5, 8].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setStrokeWeight(w)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        strokeWeight === w
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface border-surface-darker text-text-main'
                      }`}
                    >
                      {w === 2 ? 'Fine' : w === 3 ? 'Medium' : w === 5 ? 'Bold' : 'Marker'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={undoDraw}
                  disabled={historyIndex <= 0}
                  className="p-2 rounded-xl border border-surface-darker bg-surface text-text-main hover:text-primary disabled:opacity-40 transition-colors"
                  title="Undo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={redoDraw}
                  disabled={historyIndex >= history.length - 1}
                  className="p-2 rounded-xl border border-surface-darker bg-surface text-text-main hover:text-primary disabled:opacity-40 transition-colors"
                  title="Redo"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            </div>

            {/* Drawing Canvas */}
            <div className="border-2 border-dashed border-surface-darker hover:border-primary/40 rounded-3xl bg-neutral-50/50 p-2 relative overflow-hidden">
              <canvas
                ref={canvasRef}
                width={800}
                height={300}
                onMouseDown={startDrawing}
                onMouseMove={drawMove}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={drawMove}
                onTouchEnd={stopDrawing}
                className="w-full h-64 sm:h-72 bg-white rounded-2xl shadow-inner cursor-crosshair touch-none"
              />

              {!hasDrawn && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-text-main/30 space-y-1">
                  <PenTool className="w-8 h-8 stroke-[1.5]" />
                  <p className="text-xs sm:text-sm font-semibold">Sign here with your finger or mouse</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Scan / Upload Signature */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div
              onClick={() => uploadInputRef.current?.click()}
              className="rounded-3xl border-2 border-dashed border-surface-darker hover:border-primary/50 bg-surface/30 p-8 text-center cursor-pointer space-y-3 transition-colors"
            >
              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                onChange={handleUploadFile}
                className="hidden"
              />
              <Upload className="w-10 h-10 text-primary mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-text-main">
                  Upload a photo of your handwritten signature
                </h4>
                <p className="text-xs text-text-main/60">
                  Take a photo of your signature on white paper. Our engine will strip paper shadows and
                  extract clean transparent ink.
                </p>
              </div>
            </div>

            {uploadedImage && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-main flex items-center justify-between">
                    <span>Background Removal Threshold</span>
                    <span className="font-mono text-primary">{threshold}</span>
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={240}
                    value={threshold}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setThreshold(val);
                      processCleanSignature(uploadedImage, val);
                    }}
                    className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-text-main/50">
                    <span>Keep Darker Ink</span>
                    <span>Aggressive Clean</span>
                  </div>
                </div>

                {cleanedScanUrl && (
                  <div className="p-4 rounded-2xl bg-neutral-900/5 border border-surface-darker flex items-center justify-center h-32">
                    <img
                      src={cleanedScanUrl}
                      alt="Extracted ink preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Master Signature Export Showcase & Actions Bar */}
        <div className="pt-4 border-t border-surface-darker space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-text-main flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Export Your Digital Signature
              </h4>
              <p className="text-xs text-text-main/60">
                Transparent PNG for contracts, Vector SVG for designers, and 300 DPI JPEG for bank portals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-text-main/60" />
                    <span>Copy PNG</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={downloadPNG}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" /> Download Transparent PNG
              </button>

              <button
                type="button"
                onClick={downloadSVG}
                className="px-3 py-2 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold transition-colors"
              >
                SVG Vector
              </button>

              <button
                type="button"
                onClick={downloadJPEG}
                className="px-3 py-2 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold transition-colors"
              >
                300 DPI JPEG
              </button>
            </div>
          </div>

          {/* Direct Hand-off to Sign PDF */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FileSignature className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-text-main">
                  Need to sign a PDF agreement or job offer letter right now?
                </p>
                <p className="text-[11px] text-text-main/70">
                  Open our interactive PDF Signer to place this signature on any page.
                </p>
              </div>
            </div>

            <Link
              href="/tools/sign-pdf"
              className="px-4 py-2 rounded-xl bg-white hover:bg-primary hover:text-white text-primary border border-primary/30 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              Sign PDF Now ➔
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
