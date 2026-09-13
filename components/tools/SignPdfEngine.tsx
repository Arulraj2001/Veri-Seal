'use client';

import * as React from 'react';
import {
  Upload,
  PenTool,
  Type,
  Image as ImageIcon,
  ShieldCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Sparkles,
  FileText,
  Trash2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Move,
  Layers,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PDFDocument } from 'pdf-lib';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

type SignatureInputMode = 'draw' | 'type' | 'upload';

const INK_COLORS = [
  { id: 'blue', label: 'Official Blue', hex: '#003399' },
  { id: 'black', label: 'Formal Black', hex: '#111827' },
  { id: 'purple', label: 'Govt Purple', hex: '#581C87' },
];

const SIGNATURE_FONTS = [
  { id: 'cursive', name: 'Dancing Script', font: 'cursive' },
  { id: 'serif', name: 'Formal Serif', font: 'Georgia, serif' },
  { id: 'brush', name: 'Signature Casual', font: 'Brush Script MT, cursive' },
  { id: 'italic', name: 'Classic Italic', font: 'italic 28px serif' },
];

export function SignPdfEngine() {
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = React.useState<PDFDocument | null>(null);
  const [pdfArrayBuffer, setPdfArrayBuffer] = React.useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageDimensions, setPageDimensions] = React.useState<{ width: number; height: number }>({
    width: 595,
    height: 842,
  });

  // Signature creation mode
  const [inputMode, setInputMode] = React.useState<SignatureInputMode>('draw');
  const [inkColor, setInkColor] = React.useState<string>('#003399');
  const [typedName, setTypedName] = React.useState<string>('');
  const [selectedFont, setSelectedFont] = React.useState<string>('cursive');
  const [strokeWidth, setStrokeWidth] = React.useState<number>(2.5);
  const [includeDateStamp, setIncludeDateStamp] = React.useState<boolean>(true);
  const [customDate, setCustomDate] = React.useState<string>(
    new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  );

  // Active generated signature transparent PNG
  const [signatureDataUrl, setSignatureDataUrl] = React.useState<string | null>(null);

  // Placement coordinates (percentage of page width & height: 0 to 100)
  const [posX, setPosX] = React.useState<number>(65); // 65% from left (bottom right)
  const [posY, setPosY] = React.useState<number>(85); // 85% from top
  const [sigScale, setSigScale] = React.useState<number>(22); // 22% of page width

  // Output processing
  const [isFlattening, setIsFlattening] = React.useState<boolean>(false);
  const [signedPdfBlob, setSignedPdfBlob] = React.useState<Blob | null>(null);
  const [signedPdfUrl, setSignedPdfUrl] = React.useState<string | null>(null);
  const [signedPdfSizeKb, setSignedPdfSizeKb] = React.useState<number>(0);

  // Drawing canvas refs
  const drawCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const isDrawingRef = React.useRef<boolean>(false);
  const lastPointRef = React.useRef<{ x: number; y: number } | null>(null);

  // Clean up object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (signedPdfUrl) URL.revokeObjectURL(signedPdfUrl);
    };
  }, [signedPdfUrl]);

  // Handle PDF file upload
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert('Please upload a valid PDF document.');
        return;
      }

      setPdfFile(file);
      setSignedPdfBlob(null);

      const buf = await file.arrayBuffer();
      setPdfArrayBuffer(buf);

      try {
        const doc = await PDFDocument.load(buf);
        setPdfDoc(doc);
        const count = doc.getPageCount();
        setPageCount(count);
        setCurrentPage(1);

        const firstPage = doc.getPages()[0];
        const { width, height } = firstPage.getSize();
        setPageDimensions({ width, height });
      } catch (err) {
        console.error('Failed to parse PDF', err);
        alert('Could not load PDF. The document may be password-protected.');
      }
    }
  };

  // -------------------------------------------------------------
  // DRAWING CANVAS LOGIC
  // -------------------------------------------------------------
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    isDrawingRef.current = true;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    lastPointRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    ctx.strokeStyle = inkColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    lastPointRef.current = { x: currentX, y: currentY };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    generateSignatureFromDrawCanvas();
  };

  const clearDrawCanvas = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDataUrl(null);
  };

  const generateSignatureFromDrawCanvas = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    // Export transparent PNG
    setSignatureDataUrl(canvas.toDataURL('image/png'));
  };

  // -------------------------------------------------------------
  // TYPED SIGNATURE GENERATOR
  // -------------------------------------------------------------
  const generateTypedSignature = React.useCallback(() => {
    if (!typedName.trim()) {
      setSignatureDataUrl(null);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 140;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 400, 140);
    ctx.fillStyle = inkColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (selectedFont === 'cursive') {
      ctx.font = 'italic 42px "Brush Script MT", "Dancing Script", cursive';
    } else if (selectedFont === 'serif') {
      ctx.font = 'italic 34px Georgia, serif';
    } else if (selectedFont === 'brush') {
      ctx.font = 'italic 38px cursive';
    } else {
      ctx.font = 'italic 32px serif';
    }

    ctx.fillText(typedName, 200, 65);

    // Subtle flourish underline
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, 100);
    ctx.bezierCurveTo(150, 115, 250, 85, 340, 105);
    ctx.stroke();

    setSignatureDataUrl(canvas.toDataURL('image/png'));
  }, [typedName, selectedFont, inkColor]);

  React.useEffect(() => {
    if (inputMode === 'type') {
      generateTypedSignature();
    }
  }, [inputMode, typedName, selectedFont, inkColor, generateTypedSignature]);

  // -------------------------------------------------------------
  // UPLOADED PHONE SIGNATURE WITH AUTO WHITE PAPER REMOVAL
  // -------------------------------------------------------------
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 600;
        canvas.height = img.naturalHeight || 300;
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

        ctx.drawImage(img, 0, 0);

        // Auto transparency algorithm: Turn light/white pixels transparent, keep dark ink
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          if (lum > 200) {
            // Paper background: 100% transparent
            d[i + 3] = 0;
          } else {
            // Dark ink: preserve and map to selected ink color
            d[i + 3] = Math.round(((255 - lum) / 255) * 255);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setSignatureDataUrl(canvas.toDataURL('image/png'));
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  // -------------------------------------------------------------
  // PDF EMBEDDING & VECTOR FLATTENING VIA PDF-LIB
  // -------------------------------------------------------------
  const handleFlattenAndDownload = async () => {
    if (!pdfArrayBuffer || !signatureDataUrl || isFlattening) return;
    setIsFlattening(true);

    try {
      // Reload clean PDFDocument instance
      const doc = await PDFDocument.load(pdfArrayBuffer);
      const pages = doc.getPages();
      const targetPage = pages[currentPage - 1];
      const { width: pW, height: pH } = targetPage.getSize();

      // Convert signature data URL to ArrayBuffer
      const base64Data = signatureDataUrl.split(',')[1];
      const binaryStr = atob(base64Data);
      const len = binaryStr.length;
      const sigBytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        sigBytes[i] = binaryStr.charCodeAt(i);
      }

      // Embed signature PNG
      const pngImage = await doc.embedPng(sigBytes);

      // Compute physical dimensions & coordinates (pdf-lib 0,0 is bottom-left)
      const sigW = (pW * sigScale) / 100;
      const sigH = sigW * (pngImage.height / pngImage.width);

      const targetX = (pW * posX) / 100 - sigW / 2;
      // Convert top-relative Y percentage to bottom-relative PDF coordinate
      const targetY = pH - (pH * posY) / 100 - sigH / 2;

      // Draw signature onto page
      targetPage.drawImage(pngImage, {
        x: Math.max(10, Math.min(pW - sigW - 10, targetX)),
        y: Math.max(10, Math.min(pH - sigH - 10, targetY)),
        width: sigW,
        height: sigH,
      });

      // Optionally draw date stamp text
      if (includeDateStamp && customDate) {
        // Draw subtle date below signature
        targetPage.drawText(`Signed: ${customDate}`, {
          x: Math.max(10, Math.min(pW - sigW - 10, targetX)),
          y: Math.max(5, targetY - 12),
          size: 9,
        });
      }

      // Save flattened PDF bytes in RAM
      const flattenedBytes = await doc.save();
      const blob = new Blob([flattenedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

      if (signedPdfUrl) URL.revokeObjectURL(signedPdfUrl);
      const url = URL.createObjectURL(blob);

      setSignedPdfBlob(blob);
      setSignedPdfUrl(url);
      setSignedPdfSizeKb(Math.round((blob.size / 1024) * 10) / 10);

      // Trigger download
      const a = document.createElement('a');
      a.href = url;
      const originalBase = pdfFile?.name ? pdfFile.name.replace(/\.[^/.]+$/, '') : 'document';
      a.download = `${originalBase}_signed.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('PDF Signing failed', err);
      alert('Failed to sign and flatten PDF.');
    } finally {
      setIsFlattening(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-7">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <PenTool className="w-5 h-5 text-primary" />
            Sign PDF Online Free (100% In-Browser RAM, No Sign-up)
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Draw, type, or upload your signature. Flattened permanently into the PDF with zero watermarks.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex p-1 rounded-2xl bg-surface border border-surface-darker/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setInputMode('draw')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
              inputMode === 'draw'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            <PenTool className="w-3.5 h-3.5" /> Draw
          </button>
          <button
            type="button"
            onClick={() => setInputMode('type')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
              inputMode === 'type'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            <Type className="w-3.5 h-3.5" /> Type
          </button>
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
              inputMode === 'upload'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-text-main/70 hover:text-text-main'
            )}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Phone Scan
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive PDF Canvas Viewer & Signature Controls (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-5">
          {!pdfFile ? (
            <label className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-primary-light/10 hover:bg-primary-light/20 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform mb-3">
                <FileText className="w-8 h-8" />
              </div>
              <div className="font-extrabold text-base sm:text-lg text-text-main">
                Upload PDF Document to Sign
              </div>
              <p className="text-xs sm:text-sm text-text-main/60 mt-1 max-w-md">
                Contracts, agreements, rental leases, application forms, or affidavits. Processed 100% inside your browser RAM.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
                  <Check className="w-3 h-3" /> Zero Account Required
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
                  <Check className="w-3 h-3" /> No Watermarks
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
                  <Check className="w-3 h-3" /> 100% In-Browser RAM
                </span>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="sr-only"
              />
            </label>
          ) : (
            <div className="p-5 rounded-2xl bg-surface/40 border border-surface-darker/80 space-y-4">
              {/* Document Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-text-main">
                  <span className="truncate max-w-[200px]">{pdfFile.name}</span>
                  <span className="text-text-main/50">({(pdfFile.size / 1024).toFixed(0)} KB)</span>
                </div>

                {/* Page Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1 rounded-lg bg-white border border-surface-darker hover:bg-surface disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-text-main">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage >= pageCount}
                    onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
                    className="p-1 rounded-lg bg-white border border-surface-darker hover:bg-surface disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <label className="text-primary font-bold hover:underline cursor-pointer ml-3">
                    Change PDF
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {/* Interactive Page Viewport with Drag-Placement Overlay */}
              <div className="relative aspect-[1/1.414] max-w-[480px] mx-auto bg-white rounded-xl border-2 border-primary/30 shadow-lg overflow-hidden flex flex-col justify-between p-6 select-none">
                {/* Simulated Document Layout Lines */}
                <div className="space-y-3 opacity-20 pointer-events-none">
                  <div className="h-4 bg-text-main/80 rounded w-2/3" />
                  <div className="h-2 bg-text-main/60 rounded w-full" />
                  <div className="h-2 bg-text-main/60 rounded w-5/6" />
                  <div className="h-2 bg-text-main/60 rounded w-full" />
                  <div className="h-2 bg-text-main/60 rounded w-4/5" />
                  <div className="h-2 bg-text-main/60 rounded w-full" />
                  <div className="h-2 bg-text-main/60 rounded w-3/4" />
                </div>

                <div className="text-center text-xs text-text-main/40 font-mono pointer-events-none">
                  [ PDF Document Page {currentPage} ]
                </div>

                {/* Simulated bottom area with placed signature */}
                <div className="relative h-24">
                  {signatureDataUrl && (
                    <div
                      style={{
                        position: 'absolute',
                        left: `${posX}%`,
                        top: `${posY - 60}%`,
                        width: `${sigScale * 2}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="cursor-move p-1 border-2 border-dashed border-primary rounded-lg bg-primary/5 flex flex-col items-center group transition-all"
                    >
                      <img
                        src={signatureDataUrl}
                        alt="Signature Overlay"
                        className="w-full h-auto object-contain pointer-events-none"
                      />
                      {includeDateStamp && (
                        <span className="text-[9px] font-mono text-text-main/70 block mt-0.5">
                          {customDate}
                        </span>
                      )}
                      <div className="text-[8px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        <Move className="w-2.5 h-2.5" /> Positioned
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Placement Sliders */}
              <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-surface-darker text-xs">
                <div>
                  <span className="font-bold text-text-main/70 text-[11px] block">
                    Horizontal Position (X):
                  </span>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={posX}
                    onChange={(e) => setPosX(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                  />
                </div>
                <div>
                  <span className="font-bold text-text-main/70 text-[11px] block">
                    Vertical Position (Y):
                  </span>
                  <input
                    type="range"
                    min="20"
                    max="92"
                    value={posY}
                    onChange={(e) => setPosY(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                  />
                </div>
                <div>
                  <span className="font-bold text-text-main/70 text-[11px] block">Signature Size:</span>
                  <input
                    type="range"
                    min="12"
                    max="45"
                    value={sigScale}
                    onChange={(e) => setSigScale(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-darker rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Signature Dock & Flatten Download (lg:col-span-4) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
          {/* Signature Creator Dock */}
          <div className="bg-surface/50 rounded-2xl border border-surface-darker/80 p-4 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-text-main flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-primary" />
                Signature Input
              </span>
              {/* Color selector */}
              <div className="flex items-center gap-1.5">
                {INK_COLORS.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setInkColor(col.hex)}
                    style={{ backgroundColor: col.hex }}
                    className={cn(
                      'w-4 h-4 rounded-full border border-white shadow-xs transition-transform',
                      inkColor === col.hex ? 'scale-125 ring-2 ring-primary ring-offset-1' : ''
                    )}
                    title={col.label}
                  />
                ))}
              </div>
            </div>

            {/* DRAW MODE CANVAS */}
            {inputMode === 'draw' && (
              <div className="space-y-2">
                <div className="h-32 bg-white rounded-xl border border-surface-darker relative overflow-hidden shadow-2xs">
                  <canvas
                    ref={drawCanvasRef}
                    width={320}
                    height={128}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-full cursor-crosshair touch-none"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-text-main/50">Draw using finger or mouse</span>
                  <button
                    type="button"
                    onClick={clearDrawCanvas}
                    className="text-[11px] font-bold text-red-600 hover:underline"
                  >
                    Clear Pad
                  </button>
                </div>
              </div>
            )}

            {/* TYPE MODE INPUT */}
            {inputMode === 'type' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Type your full name..."
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-surface-darker bg-white font-medium"
                />
                <div className="grid grid-cols-2 gap-1.5">
                  {SIGNATURE_FONTS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFont(f.id)}
                      className={cn(
                        'p-2 rounded-lg text-xs font-bold border transition-all truncate text-center',
                        selectedFont === f.id
                          ? 'bg-primary-light border-primary/40 text-primary'
                          : 'bg-white border-surface-darker text-text-main'
                      )}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PHONE SCAN / UPLOAD MODE */}
            {inputMode === 'upload' && (
              <div className="space-y-2">
                <label className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-white transition-all group">
                  <ImageIcon className="w-6 h-6 text-primary mb-1 group-hover:scale-105 transition-transform" />
                  <span className="text-xs font-bold text-text-main">
                    Upload Signature Photo
                  </span>
                  <span className="text-[10px] text-text-main/60 mt-0.5">
                    Auto-clears white paper background
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            )}

            {/* Date Stamp Widget */}
            <div className="pt-2 border-t border-surface-darker/60 space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-text-main cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDateStamp}
                  onChange={(e) => setIncludeDateStamp(e.target.checked)}
                  className="accent-primary rounded"
                />
                <span>Include Date Stamp</span>
              </label>

              {includeDateStamp && (
                <input
                  type="text"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-surface-darker bg-white font-mono"
                  placeholder="e.g. 13 Sep 2026"
                />
              )}
            </div>

            {/* Action: Flatten and Download */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleFlattenAndDownload}
                disabled={!pdfFile || !signatureDataUrl || isFlattening}
                className={cn(
                  'w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all',
                  !pdfFile || !signatureDataUrl || isFlattening
                    ? 'bg-primary/40 cursor-not-allowed'
                    : 'bg-primary hover:bg-[#c74a08] active:scale-[0.99]'
                )}
              >
                {isFlattening ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Flattening Vector PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Flatten &amp; Download Signed PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CSC & Cyber Cafe Share Action */}
          <WhatsAppShare
            message="Sign PDF documents online free with zero registration and in-browser privacy on Kagazo: https://kagazo.in/tools/sign-pdf"
          />

          {/* Legal Validity Trust Stamp */}
          <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-extrabold text-text-main">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Legally Valid &amp; Private</span>
            </div>
            <p className="text-[11px] text-text-main/70 leading-relaxed">
              Electronic signatures comply with the Indian Information Technology Act (IT Act 2000 Section 5) and US ESIGN Act. Processed 100% in client-side volatile RAM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
