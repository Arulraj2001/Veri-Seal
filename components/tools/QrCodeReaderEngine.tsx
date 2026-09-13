'use client';

import * as React from 'react';
import {
  Camera,
  Upload,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Globe,
  Wifi,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import jsQR from 'jsqr';

export function QrCodeReaderEngine() {
  const [activeMode, setActiveMode] = React.useState<'upload' | 'camera'>('upload');
  const [scannedResult, setScannedResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isScanning, setIsScanning] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [dragOver, setDragOver] = React.useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const animationFrameId = React.useRef<number | null>(null);

  // Scan from image file via Canvas & jsQR
  const handleImageFile = (file: File) => {
    setError(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Canvas 2D context unavailable.');
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imgData.data, imgData.width, imgData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code && code.data) {
        setScannedResult(code.data);
      } else {
        // Retry with inversion
        const codeInverted = jsQR(imgData.data, imgData.width, imgData.height, {
          inversionAttempts: 'onlyInvert',
        });
        if (codeInverted && codeInverted.data) {
          setScannedResult(codeInverted.data);
        } else {
          setError('No valid QR code could be detected in this image. Please ensure the QR code is clearly visible and well-lit.');
        }
      }
    };
    img.onerror = () => setError('Failed to load image file.');
    img.src = URL.createObjectURL(file);
  };

  // Camera real-time scanner loop
  const startCamera = async () => {
    setError(null);
    setIsScanning(true);
    setScannedResult(null);

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
      console.error(err);
      setError('Camera access was denied or is not supported on this device.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    setIsScanning(false);
  };

  const tickCamera = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height);
        if (code && code.data) {
          setScannedResult(code.data);
          stopCamera();
          return;
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(tickCamera);
  };

  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const copyResult = async () => {
    if (!scannedResult) return;
    try {
      await navigator.clipboard.writeText(scannedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const isUrl = scannedResult && /^(https?:\/\/|www\.)/i.test(scannedResult);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-8 space-y-6">
        {/* Mode Switcher */}
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
              <Upload className="w-4 h-4" /> Upload Image / Screenshot
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
            <span>100% In-Browser Local Decoding</span>
          </div>
        </div>

        {/* Upload Mode Dropzone */}
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
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-text-main">
                  Drop a QR code image or screenshot here, or <span className="text-primary underline">browse</span>
                </h3>
                <p className="text-xs text-text-main/60 mt-1">
                  Supports PNG, JPG, WebP, SVG, and phone gallery screenshots.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Camera Scanner View */}
        {activeMode === 'camera' && !scannedResult && (
          <div className="max-w-md mx-auto space-y-4 text-center">
            <div className="relative rounded-3xl overflow-hidden border-2 border-primary bg-black aspect-square flex items-center justify-center shadow-xl">
              <video ref={videoRef} className="w-full h-full object-cover" />
              {/* Animated Target Scanning Frame */}
              <div className="absolute inset-8 border-2 border-dashed border-white/60 rounded-2xl pointer-events-none flex items-center justify-center animate-pulse">
                <div className="w-full h-0.5 bg-red-500 shadow-[0_0_8px_#ef4444]" />
              </div>
            </div>

            <p className="text-xs text-text-main/70">
              Point your camera steadily at any QR code to scan automatically.
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

        {/* Scan Result Card */}
        {scannedResult && (
          <div className="rounded-3xl border-2 border-emerald-500/40 bg-emerald-50/20 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-darker">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Check className="w-4 h-4 text-emerald-600" /> Successfully Decoded QR Code
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
                Scan Another QR
              </button>
            </div>

            {/* Decoded Output Box */}
            <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-2">
              <span className="text-[10px] font-mono uppercase text-text-main/50">Decoded Content:</span>
              <p className="text-sm font-mono font-bold text-text-main break-all leading-relaxed select-all">
                {scannedResult}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {isUrl && (
                <a
                  href={scannedResult.startsWith('http') ? scannedResult : `https://${scannedResult}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Globe className="w-4 h-4" /> Open Link in Browser <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                type="button"
                onClick={copyResult}
                className="px-4 py-2.5 rounded-2xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-text-main/60" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Decoded Text'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
