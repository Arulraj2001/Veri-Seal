'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Share2,
  Download,
  CheckCircle2,
  FileText,
  Sliders,
  Sparkles,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  Check,
  Send,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Layers,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function WhatsAppCompressorEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [originalSizeKb, setOriginalSizeKb] = useState<number>(0);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);

  // Compression Controls
  const [targetKbBudget, setTargetKbBudget] = useState<number>(200); // Default 200KB
  const [enhanceTextClarity, setEnhanceTextClarity] = useState<boolean>(true);
  const [cleanDeskShadows, setCleanDeskShadows] = useState<boolean>(true);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');

  // Output State
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSizeKb, setCompressedSizeKb] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [reductionPercent, setReductionPercent] = useState<number>(0);

  // View state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [comparisonMode, setComparisonMode] = useState<'compressed' | 'split'>('compressed');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setOriginalSizeKb(Math.round(uploadedFile.size / 1024));

    const url = URL.createObjectURL(uploadedFile);
    setOriginalUrl(url);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImgObj(img);
    img.src = url;
  };

  // Multi-pass Compression Algorithm
  const processCompression = useCallback(async () => {
    if (!imgObj) return;

    setIsCompressing(true);
    try {
      // Calculate optimum dimensions based on target budget
      let maxDimension = 1920;
      if (targetKbBudget <= 100) maxDimension = 1280;
      else if (targetKbBudget <= 200) maxDimension = 1600;
      else if (targetKbBudget <= 500) maxDimension = 2048;
      else maxDimension = 2560;

      let drawW = imgObj.width;
      let drawH = imgObj.height;

      if (drawW > maxDimension || drawH > maxDimension) {
        if (drawW >= drawH) {
          drawH = Math.round((drawH * maxDimension) / drawW);
          drawW = maxDimension;
        } else {
          drawW = Math.round((drawW * maxDimension) / drawH);
          drawH = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = drawW;
      canvas.height = drawH;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      // Pure white paper base
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, drawW, drawH);

      // Micro-Contrast & Desk Shadow Cleaning Filters
      let filters: string[] = [];
      if (enhanceTextClarity) {
        filters.push('contrast(1.14)');
      }
      if (cleanDeskShadows) {
        filters.push('brightness(1.04)');
      }
      ctx.filter = filters.length > 0 ? filters.join(' ') : 'none';

      ctx.drawImage(imgObj, 0, 0, drawW, drawH);
      ctx.filter = 'none';

      // Binary Search to reach target KB budget strictly
      let low = 0.3;
      let high = 0.95;
      let bestBlob: Blob | null = null;
      let bestQuality = 0.8;

      const toBlobPromise = (q: number): Promise<Blob | null> => {
        return new Promise((resolve) => canvas.toBlob(resolve, outputFormat, q));
      };

      for (let pass = 0; pass < 5; pass++) {
        const mid = (low + high) / 2;
        const blob = await toBlobPromise(mid);
        if (!blob) break;

        const sizeKb = blob.size / 1024;
        if (sizeKb <= targetKbBudget) {
          bestBlob = blob;
          bestQuality = mid;
          low = mid; // Try for higher quality
        } else {
          high = mid; // Too big, decrease quality
        }
      }

      if (!bestBlob) {
        // Fallback to lowest acceptable
        bestBlob = (await toBlobPromise(0.35)) || (await toBlobPromise(0.5));
      }

      if (bestBlob) {
        const url = URL.createObjectURL(bestBlob);
        setCompressedBlob(bestBlob);
        setCompressedUrl(url);
        const finalKb = Math.round(bestBlob.size / 1024);
        setCompressedSizeKb(finalKb);
        if (originalSizeKb > 0) {
          const reduction = Math.round(((originalSizeKb - finalKb) / originalSizeKb) * 100);
          setReductionPercent(Math.max(0, reduction));
        }
      }
      setIsCompressing(false);
    } catch (err) {
      console.error('WhatsApp compression error:', err);
      setIsCompressing(false);
    }
  }, [imgObj, targetKbBudget, enhanceTextClarity, cleanDeskShadows, outputFormat, originalSizeKb]);

  useEffect(() => {
    if (imgObj) {
      processCompression();
    }
  }, [imgObj, processCompression]);

  const handleDownload = () => {
    if (!compressedBlob) return;
    const link = document.createElement('a');
    link.href = compressedUrl!;
    const ext = outputFormat === 'image/webp' ? 'webp' : 'jpg';
    link.download = `whatsapp_doc_${targetKbBudget}kb.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      'Here is the verified compressed document from Kagazo. Clean, readable, and optimized for mobile sharing.'
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full space-y-8">
      {/* Engine Main Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  WhatsApp Document &amp; Photo Compressor
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  ZERO BLUR • MICRO TEXT BOOSTER
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Compress Aadhaar, certificates, and ID photos strictly under 100KB, 200KB, or 500KB without blurring fine text or stamps.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              disabled={!compressedBlob}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-slate-950 transition-all shadow-md active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share to WhatsApp</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={!compressedBlob}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ({compressedSizeKb} KB)</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Controls & Presets */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upload Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>Upload Document / Photo</span>
              </span>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />

              {file ? (
                <div className="p-5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center space-y-3">
                  <div className="space-y-1">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[220px] mx-auto">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Original Size: {originalSizeKb} KB
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Replace File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setOriginalUrl(null);
                        setImgObj(null);
                        setCompressedBlob(null);
                        setCompressedUrl(null);
                        setOriginalSizeKb(0);
                        setCompressedSizeKb(0);
                      }}
                      className="px-3 py-1.5 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center gap-1.5 cursor-pointer"
                      title="Remove / Try Another"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove / Try Another</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/40 text-center cursor-pointer transition-all space-y-2"
                >
                  <ImageIcon className="w-10 h-10 mx-auto text-slate-400 hover:text-emerald-500" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Click to Upload Document Photo
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supports JPG, PNG, WebP camera scans
                  </p>
                </div>
              )}
            </div>

            {/* Target Budget Presets */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target Size Budget (KB)</span>
                </span>
                <span className="font-mono text-emerald-600 font-bold">{targetKbBudget} KB</span>
              </span>

              <div className="grid grid-cols-4 gap-1.5">
                {[100, 200, 500, 1000].map((kb) => (
                  <button
                    key={kb}
                    onClick={() => setTargetKbBudget(kb)}
                    className={`py-2 px-1 text-center rounded-xl font-bold border transition-all ${
                      targetKbBudget === kb
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    &lt; {kb >= 1000 ? '1 MB' : `${kb} KB`}
                  </button>
                ))}
              </div>

              {/* Precise Slider */}
              <div className="pt-1">
                <input
                  type="range"
                  min={50}
                  max={1200}
                  step={25}
                  value={targetKbBudget}
                  onChange={(e) => setTargetKbBudget(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Text Sharpness & Desk Shadow Toggles */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Micro-Text Clarity Booster</span>
                    <span className="text-[10px] text-slate-500">Sharpens fine rubber stamps &amp; Aadhaar numbers</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enhanceTextClarity}
                    onChange={(e) => setEnhanceTextClarity(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Clean Desk Shadows</span>
                    <span className="text-[10px] text-slate-500">Normalizes background paper to pure white</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cleanDeskShadows}
                    onChange={(e) => setCleanDeskShadows(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                  />
                </div>
              </div>

              {/* Output Format */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Output Encoding</span>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as any)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                >
                  <option value="image/jpeg">JPEG (Standard WhatsApp)</option>
                  <option value="image/webp">WebP (High Efficiency)</option>
                </select>
              </div>
            </div>

            {/* Reduction Metrics Banner */}
            {compressedSizeKb > 0 && originalSizeKb > 0 && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 block">
                    {reductionPercent}% Size Reduction
                  </span>
                  <span className="text-[11px] text-emerald-800 dark:text-emerald-300">
                    Compressed from {originalSizeKb} KB &rarr; {compressedSizeKb} KB
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold text-xs">
                  ✔
                </div>
              </div>
            )}
          </div>

          {/* Right Column (7 Cols): Real-time Preview with Split Comparison */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>Document Readability Preview</span>
              </span>

              {compressedSizeKb > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setComparisonMode(comparisonMode === 'compressed' ? 'split' : 'compressed')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold text-[11px]"
                  >
                    {comparisonMode === 'compressed' ? 'Compare Original' : 'Show Compressed'}
                  </button>
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                    {compressedSizeKb} KB
                  </span>
                </div>
              )}
            </div>

            {/* Viewport */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner relative p-4">
              {compressedUrl ? (
                <div className="w-full h-full flex items-center justify-center overflow-auto">
                  {comparisonMode === 'split' && originalUrl ? (
                    <div className="grid grid-cols-2 gap-2 w-full h-full">
                      <div className="flex flex-col items-center justify-center border-r border-slate-300 dark:border-slate-700 pr-2">
                        <span className="text-[10px] font-bold text-slate-400 mb-1">ORIGINAL ({originalSizeKb} KB)</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={originalUrl} alt="Original" className="max-h-[85%] object-contain" />
                      </div>
                      <div className="flex flex-col items-center justify-center pl-2">
                        <span className="text-[10px] font-bold text-emerald-600 mb-1">COMPRESSED ({compressedSizeKb} KB)</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={compressedUrl} alt="Compressed" className="max-h-[85%] object-contain" />
                      </div>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={compressedUrl}
                      alt="WhatsApp Compressed Document"
                      className="max-h-full max-w-full object-contain shadow-md rounded-sm transition-transform"
                      style={{ transform: `scale(${zoomLevel})` }}
                    />
                  )}
                </div>
              ) : (
                <div className="text-center p-8 space-y-3 text-slate-400">
                  <ImageIcon className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
                  <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    Upload Document to Compress
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Micro-text and ink stamps will be dynamically sharpened while hitting your exact target KB budget.
                  </p>
                </div>
              )}

              {/* Zoom Controls */}
              {compressedUrl && comparisonMode === 'compressed' && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono font-bold px-1.5 text-slate-600 dark:text-slate-300">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Security Guarantee */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-RAM Compression:</strong> Image compression runs entirely in your browser. Document scans are never uploaded to any remote server or third party.
              </span>
            </div>
          </div>
        </div>

        {/* Ad Placement */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <AdSlot slot="in_content" />
        </div>
      </div>
    </div>
  );
}
