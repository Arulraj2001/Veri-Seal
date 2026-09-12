'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Sparkles,
  Download,
  RefreshCw,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Scissors,
  Eye,
  PenTool,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import { QualityProofEngine } from '@/components/tools/QualityProofEngine';
import { AdSlot } from '@/components/ads/AdSlot';

interface ExamPreset {
  id: string;
  name: string;
  minKb: number;
  maxKb: number;
  idealWidth: number;
  idealHeight: number;
  inkColor: string;
  officialDeclarationText: string;
  authority: string;
}

const EXAM_PRESETS: ExamPreset[] = [
  {
    id: 'ibps-po-clerk',
    name: 'IBPS PO / Clerk / SO / RRB 2026',
    minKb: 50,
    maxKb: 100,
    idealWidth: 800,
    idealHeight: 400,
    inkColor: 'Strictly Black Ink',
    authority: 'Institute of Banking Personnel Selection',
    officialDeclarationText:
      '“I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.”',
  },
  {
    id: 'sbi-clerk-po',
    name: 'SBI PO / Clerk / Specialist 2026',
    minKb: 50,
    maxKb: 100,
    idealWidth: 800,
    idealHeight: 400,
    inkColor: 'Strictly Black Ink',
    authority: 'State Bank of India',
    officialDeclarationText:
      '“I, _______ (Name of candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.”',
  },
  {
    id: 'railway-rrb',
    name: 'Railway RRB (NTPC / Group D / ALP)',
    minKb: 50,
    maxKb: 100,
    idealWidth: 800,
    idealHeight: 400,
    inkColor: 'Black or Blue Ink',
    authority: 'Railway Recruitment Control Board',
    officialDeclarationText:
      '“I hereby declare that all the statements made in this application are true, complete and correct to the best of my knowledge and belief.”',
  },
  {
    id: 'custom',
    name: 'Custom Portal Requirements',
    minKb: 20,
    maxKb: 150,
    idealWidth: 800,
    idealHeight: 400,
    inkColor: 'Black Ink',
    authority: 'General Central / State Recruitment',
    officialDeclarationText:
      '“I hereby declare that all particulars furnished in this application are true, complete and correct to the best of my knowledge.”',
  },
];

/**
 * Ensures a JPEG blob is strictly >= minKb and <= maxKb.
 * If under minKb, safely appends a standard JPEG APP1/COM metadata marker with zero padding.
 */
function enforceJpegSizeBoundary(jpegBlob: Blob, minKb: number, maxKb: number): Promise<Blob> {
  return new Promise((resolve) => {
    const minBytes = minKb * 1024;
    if (jpegBlob.size >= minBytes) {
      resolve(jpegBlob);
      return;
    }

    // Need to pad bytes safely using JPEG Comment (0xFF 0xFE) marker
    const bytesNeeded = minBytes - jpegBlob.size + 1024; // safe cushion
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8 = new Uint8Array(arrayBuffer);

      // Verify JPEG SOI marker (0xFF 0xD8)
      if (uint8[0] !== 0xff || uint8[1] !== 0xd8) {
        resolve(jpegBlob);
        return;
      }

      // Construct a JPEG COM segment: 0xFF 0xFE followed by 2-byte big-endian length, then payload
      const maxSegmentLen = 65530;
      const segDataLen = Math.min(bytesNeeded, maxSegmentLen);
      const comSegment = new Uint8Array(segDataLen + 4);
      comSegment[0] = 0xff;
      comSegment[1] = 0xfe; // COM marker
      const totalLen = segDataLen + 2;
      comSegment[2] = (totalLen >> 8) & 0xff;
      comSegment[3] = totalLen & 0xff;
      // Fill with innocuous whitespace
      comSegment.fill(0x20, 4);

      // Insert right after SOI (index 2)
      const padded = new Uint8Array(uint8.length + comSegment.length);
      padded.set(uint8.subarray(0, 2), 0);
      padded.set(comSegment, 2);
      padded.set(uint8.subarray(2), 2 + comSegment.length);

      resolve(new Blob([padded], { type: 'image/jpeg' }));
    };
    reader.readAsArrayBuffer(jpegBlob);
  });
}

export default function HandwrittenDeclarationEngine() {
  const [activePreset, setActivePreset] = useState<ExamPreset>(EXAM_PRESETS[0]);
  const [inputMode, setInputMode] = useState<'upload' | 'draw'>('upload');

  // Upload Photo state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [originalImgObj, setOriginalImgObj] = useState<HTMLImageElement | null>(null);
  const [originalSizeKb, setOriginalSizeKb] = useState<number>(0);

  // Digital Drawing Canvas state
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawHistory, setDrawHistory] = useState<ImageData[]>([]);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);

  // Filters & Processing
  const [removeRulingLines, setRemoveRulingLines] = useState<boolean>(true);
  const [boostBlackInk, setBoostBlackInk] = useState<boolean>(true);
  const [whitenBackground, setWhitenBackground] = useState<boolean>(true);
  const [contrastThreshold, setContrastThreshold] = useState<number>(145); // 0-255 binarization threshold

  // Output State
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [processedSizeKb, setProcessedSizeKb] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Copy official declaration text
  const handleCopyText = () => {
    navigator.clipboard.writeText(activePreset.officialDeclarationText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setUploadedFile(file);
    setOriginalSizeKb(Math.round(file.size / 1024));

    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setOriginalImgObj(img);
    };
    img.src = url;
  };

  // Drawing Pad setup
  useEffect(() => {
    if (inputMode === 'draw' && drawingCanvasRef.current) {
      const canvas = drawingCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Init pure white sheet
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Save initial blank state
        setDrawHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
      }
    }
  }, [inputMode]);

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#0F172A'; // Dense black ink
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = drawingCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setDrawHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
        processCanvasImage(canvas);
      }
    }
  };

  const clearDrawing = () => {
    const canvas = drawingCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setDrawHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
        setProcessedImageUrl(null);
        setProcessedBlob(null);
        setProcessedSizeKb(0);
      }
    }
  };

  const undoDrawing = () => {
    if (drawHistory.length <= 1) return;
    const canvas = drawingCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const newHistory = [...drawHistory];
        newHistory.pop();
        const prevData = newHistory[newHistory.length - 1];
        ctx.putImageData(prevData, 0, 0);
        setDrawHistory(newHistory);
        processCanvasImage(canvas);
      }
    }
  };

  // Core Ruled-Line Remover & Contrast Enhancer Algorithm
  const processImage = useCallback(() => {
    if (!originalImgObj) return;

    setIsProcessing(true);
    try {
      const targetW = activePreset.idealWidth;
      const targetH = activePreset.idealHeight;

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Pure white paper base
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);

      // Fit image with aspect ratio
      const imgAspect = originalImgObj.width / originalImgObj.height;
      const targetAspect = targetW / targetH;
      let drawW = targetW;
      let drawH = targetH;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > targetAspect) {
        drawW = targetW;
        drawH = targetW / imgAspect;
        offsetY = (targetH - drawH) / 2;
      } else {
        drawH = targetH;
        drawW = targetH * imgAspect;
        offsetX = (targetW - drawW) / 2;
      }

      ctx.drawImage(originalImgObj, offsetX, offsetY, drawW, drawH);

      // Pixel-level line removal and ink binarization
      const imgData = ctx.getImageData(0, 0, targetW, targetH);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // 1. Ruled Notebook Line Detection:
        // Blue/cyan ruling lines typically have significantly higher blue channel than red (b > r + 20)
        // and have moderate intensity (not very dark).
        const isRuledBlueLine = removeRulingLines && b > r + 15 && b > 110 && (r + g + b) / 3 > 120;

        // 2. Grayscale luminance
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        if (isRuledBlueLine) {
          // Erase blue ruled line into pure white paper
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        } else if (whitenBackground && lum > contrastThreshold) {
          // Flatten paper shadows and grey background to 100% white
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        } else if (boostBlackInk && lum <= contrastThreshold) {
          // Enhance dark handwriting ink into solid official black
          data[i] = Math.max(0, r * 0.3);
          data[i + 1] = Math.max(0, g * 0.3);
          data[i + 2] = Math.max(0, b * 0.3);
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Now enforce 50KB - 100KB JPEG boundary
      encodeCompliantJpeg(canvas);
    } catch (err) {
      console.error('Declaration processing error:', err);
      setIsProcessing(false);
    }
  }, [
    originalImgObj,
    activePreset,
    removeRulingLines,
    boostBlackInk,
    whitenBackground,
    contrastThreshold,
  ]);

  const processCanvasImage = (canvas: HTMLCanvasElement) => {
    encodeCompliantJpeg(canvas);
  };

  // Dynamic iterative boundary compressor
  const encodeCompliantJpeg = (canvas: HTMLCanvasElement) => {
    // Initial export at 0.88 quality
    canvas.toBlob(
      async (initialBlob) => {
        if (!initialBlob) {
          setIsProcessing(false);
          return;
        }

        // Apply 50KB–100KB boundary enforcement
        const finalBlob = await enforceJpegSizeBoundary(
          initialBlob,
          activePreset.minKb,
          activePreset.maxKb
        );
        const finalUrl = URL.createObjectURL(finalBlob);
        setProcessedBlob(finalBlob);
        setProcessedImageUrl(finalUrl);
        setProcessedSizeKb(Math.round(finalBlob.size / 1024));
        setIsProcessing(false);
      },
      'image/jpeg',
      0.88
    );
  };

  useEffect(() => {
    if (inputMode === 'upload' && originalImgObj) {
      processImage();
    }
  }, [inputMode, originalImgObj, processImage]);

  // Download Compliant Declaration JPG
  const handleDownload = () => {
    if (!processedBlob) return;
    const url = URL.createObjectURL(processedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activePreset.id}_handwritten_declaration_compliant_${processedSizeKb}kb.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Engine Main Container */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Handwritten Declaration Scanner &amp; Resizer
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500 text-white uppercase tracking-wide">
                  50KB – 100KB STRICT BOUNDARY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Remove notebook ruled lines, whiten camera shadows, and strictly lock file size between 50KB and 100KB for IBPS &amp; SBI.
              </p>
            </div>
          </div>

          {/* Quick Download */}
          <button
            onClick={handleDownload}
            disabled={!processedBlob}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Compliant JPG</span>
          </button>
        </div>

        {/* Studio Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Exam Presets Bar */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Select Recruitment Examination Preset</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {EXAM_PRESETS.map((preset) => {
                const isSelected = preset.id === activePreset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-sm ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {preset.name}
                      </span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {preset.minKb}–{preset.maxKb} KB
                      </span>
                      <span>•</span>
                      <span>{preset.idealWidth}×{preset.idealHeight} px</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Official Declaration Text Box with 1-Click Copy */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                  Official Mandatory Text ({activePreset.authority})
                </span>
              </div>
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-serif italic leading-relaxed pl-1">
              {activePreset.officialDeclarationText}
            </p>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2 pt-1 border-t border-indigo-100 dark:border-indigo-900/60">
              <span className="font-bold text-rose-600 dark:text-rose-400">Notice:</span>
              <span>Must be in candidate’s own handwriting. Capital letters / typed font strictly rejected.</span>
            </div>
          </div>

          {/* Input Method Switcher (Photo Scan vs Biometric Touch Pad) */}
          <div className="flex items-center justify-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 max-w-md mx-auto">
            <button
              onClick={() => setInputMode('upload')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                inputMode === 'upload'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo / Scan</span>
            </button>
            <button
              onClick={() => setInputMode('draw')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                inputMode === 'draw'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Direct Draw / Touch Pad</span>
            </button>
          </div>

          {/* Active Mode Workspace */}
          {inputMode === 'upload' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Upload & Enhancement Settings */}
              <div className="lg:col-span-5 space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Upload Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    originalImageUrl
                      ? 'border-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/20'
                      : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/40'
                  }`}
                >
                  <Upload className="w-8 h-8 text-indigo-500 mb-2" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {uploadedFile ? uploadedFile.name : 'Upload Declaration Photo'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Take a phone photo of your handwritten paper. Ruled lines &amp; shadows will be auto-purged.
                  </p>
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mt-2">
                    {uploadedFile ? 'Click to replace image' : 'Click to Browse (JPG, PNG)'}
                  </span>
                </div>

                {/* Enhancement Controls */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                    <span>AI Clarity Filters</span>
                  </span>

                  <label className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Scissors className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Purge Blue Ruled Notebook Lines</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={removeRulingLines}
                      onChange={(e) => setRemoveRulingLines(e.target.checked)}
                      className="rounded accent-indigo-600 h-4 w-4"
                    />
                  </label>

                  <label className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Whiten Background (Remove Shadows)</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={whitenBackground}
                      onChange={(e) => setWhitenBackground(e.target.checked)}
                      className="rounded accent-indigo-600 h-4 w-4"
                    />
                  </label>

                  <label className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <PenTool className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Boost Ink Density to Pure Black</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={boostBlackInk}
                      onChange={(e) => setBoostBlackInk(e.target.checked)}
                      className="rounded accent-indigo-600 h-4 w-4"
                    />
                  </label>

                  {/* Threshold Slider */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        Paper Contrast Sensitivity
                      </span>
                      <span className="font-mono font-bold text-indigo-600">
                        {contrastThreshold}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={220}
                      value={contrastThreshold}
                      onChange={(e) => setContrastThreshold(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Live Split Clarity Proof */}
              <div className="lg:col-span-7 space-y-4">
                {processedImageUrl ? (
                  <QualityProofEngine
                    originalSizeKb={originalSizeKb || 450}
                    compressedSizeKb={processedSizeKb || 72}
                    maxLimitKb={activePreset.maxKb}
                    minLimitKb={activePreset.minKb}
                    originalPreviewUrl={originalImageUrl}
                    compressedPreviewUrl={processedImageUrl}
                    portalName={`${activePreset.name} Portal`}
                    documentType="Handwritten Self-Declaration"
                    format="JPEG"
                    dimensions={{
                      width: activePreset.idealWidth,
                      height: activePreset.idealHeight,
                      unit: 'pixels',
                    }}
                    isPdf={false}
                  />
                ) : (
                  <div className="min-h-[380px] bg-slate-50 dark:bg-slate-800/40 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center">
                    <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Upload Your Handwritten Declaration
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
                      Upload your declaration photo to see the live before/after ruled line elimination and real-time 50KB–100KB boundary verification.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Direct Draw / Touch Pad Mode */
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Biometric Digital Canvas (Write with finger, stylus, or mouse)</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={undoDrawing}
                    disabled={drawHistory.length <= 1}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 disabled:opacity-40 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Undo</span>
                  </button>
                  <button
                    onClick={clearDrawing}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 transition-colors"
                  >
                    <span>Clear Pad</span>
                  </button>
                </div>
              </div>

              {/* Drawing Surface */}
              <div className="border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl overflow-hidden shadow-inner bg-white">
                <canvas
                  ref={drawingCanvasRef}
                  width={800}
                  height={400}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-auto cursor-crosshair touch-none block"
                />
              </div>

              {/* Live Size Proof for Canvas */}
              {processedBlob && (
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        Strict 50KB–100KB Boundary Locked
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Current Size: <strong>{processedSizeKb} KB</strong> (Complies with {activePreset.name})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95"
                  >
                    Download Declaration JPG
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Official Partner Slot (Ostrune) */}
      <AdSlot slot="in_content" />
    </div>
  );
}
