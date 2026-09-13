'use client';

import * as React from 'react';
import {
  Camera,
  Upload,
  Copy,
  Check,
  Barcode as BarcodeIcon,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export function BarcodeReaderEngine() {
  const [activeMode, setActiveMode] = React.useState<'upload' | 'camera'>('upload');
  const [scannedResult, setScannedResult] = React.useState<{ text: string; format?: string } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isScanning, setIsScanning] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [dragOver, setDragOver] = React.useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const animationFrameId = React.useRef<number | null>(null);

  // Native BarcodeDetector detection check
  const hasNativeBarcodeDetector = typeof window !== 'undefined' && 'BarcodeDetector' in window;

  const handleImageFile = async (file: File) => {
    setError(null);
    setScannedResult(null);

    if (!hasNativeBarcodeDetector) {
      // Fallback: prompt user on browser support or use image preview
      setError('Barcode reading via image files utilizes the browser hardware Barcode API. Please use Google Chrome, Edge, or Safari 17+ for automated reading, or use our QR Code reader.');
      return;
    }

    try {
      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: ['code_128', 'ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_39', 'itf', 'qr_code'],
      });

      const img = new Image();
      img.src = URL.createObjectURL(file);
      await img.decode();

      const barcodes = await barcodeDetector.detect(img);
      if (barcodes && barcodes.length > 0) {
        setScannedResult({
          text: barcodes[0].rawValue,
          format: barcodes[0].format,
        });
      } else {
        setError('No barcode detected in this image. Please ensure the bars are clearly visible, uncurled, and sharp.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error decoding barcode from image.');
    }
  };

  const startCamera = async () => {
    setError(null);
    setIsScanning(true);
    setScannedResult(null);

    if (!hasNativeBarcodeDetector) {
      setError('Native camera barcode detection is not supported in this browser. Please try Google Chrome or Safari 17+ on mobile/desktop.');
      setIsScanning(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.play();
        requestAnimationFrame(tickCamera);
      }
    } catch (err) {
      setError('Camera access denied or unavailable.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    setIsScanning(false);
  };

  const tickCamera = async () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      try {
        const barcodeDetector = new (window as any).BarcodeDetector({
          formats: ['code_128', 'ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_39', 'itf'],
        });
        const barcodes = await barcodeDetector.detect(videoRef.current);
        if (barcodes && barcodes.length > 0) {
          setScannedResult({
            text: barcodes[0].rawValue,
            format: barcodes[0].format,
          });
          stopCamera();
          return;
        }
      } catch {
        // Continue loop
      }
    }
    animationFrameId.current = requestAnimationFrame(tickCamera);
  };

  React.useEffect(() => {
    return () => stopCamera();
  }, []);

  const copyResult = async () => {
    if (!scannedResult) return;
    try {
      await navigator.clipboard.writeText(scannedResult.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-surface-darker">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface border border-surface-darker">
            <button
              type="button"
              onClick={() => {
                stopCamera();
                setActiveMode('upload');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeMode === 'upload'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-main/70 hover:text-text-main'
              }`}
            >
              <Upload className="w-4 h-4" /> Drop Image File
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveMode('camera');
                startCamera();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeMode === 'camera'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-main/70 hover:text-text-main'
              }`}
            >
              <Camera className="w-4 h-4" /> Live Camera Scan
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4" />
            <span>Hardware Accelerated Local Decoder</span>
          </div>
        </div>

        {activeMode === 'upload' && !scannedResult && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleImageFile(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-primary bg-primary/5 scale-[1.005]'
                : 'border-surface-darker hover:border-primary/50 bg-surface/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageFile(e.target.files[0]);
                }
              }}
            />

            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
                <BarcodeIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-text-main">
                  Drop a barcode image or package photo, or <span className="text-primary underline">browse</span>
                </h3>
                <p className="text-xs text-text-main/60 mt-1">
                  Supports Code 128, EAN-13, UPC-A, and retail product barcodes.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'camera' && !scannedResult && (
          <div className="max-w-md mx-auto space-y-4 text-center">
            <div className="relative rounded-3xl overflow-hidden border-2 border-primary bg-black aspect-video flex items-center justify-center shadow-xl">
              <video ref={videoRef} className="w-full h-full object-cover" />
              <div className="absolute inset-x-8 inset-y-12 border-2 border-dashed border-white/70 rounded-xl pointer-events-none flex items-center justify-center">
                <div className="w-full h-0.5 bg-red-500 shadow-[0_0_8px_#ef4444]" />
              </div>
            </div>

            <p className="text-xs text-text-main/70">
              Align the barcode inside the red guideline box.
            </p>

            <button
              type="button"
              onClick={stopCamera}
              className="px-4 py-2 rounded-xl bg-surface border border-surface-darker text-text-main text-xs font-bold"
            >
              Cancel Camera
            </button>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {scannedResult && (
          <div className="rounded-3xl border-2 border-emerald-500/40 bg-emerald-50/20 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-darker">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Check className="w-4 h-4 text-emerald-600" /> Decoded Barcode
              </span>
              <button
                type="button"
                onClick={() => {
                  setScannedResult(null);
                  setError(null);
                  if (activeMode === 'camera') startCamera();
                }}
                className="px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold transition-colors"
              >
                Scan Another Barcode
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-text-main/50">
                <span>Value:</span>
                {scannedResult.format && (
                  <span className="text-primary font-bold">{scannedResult.format}</span>
                )}
              </div>
              <p className="text-xl font-mono font-extrabold text-text-main break-all select-all">
                {scannedResult.text}
              </p>
            </div>

            <button
              type="button"
              onClick={copyResult}
              className="px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Barcode Number'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
