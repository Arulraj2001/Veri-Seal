'use client';

import * as React from 'react';
import {
  Upload,
  AlertTriangle,
  CheckCircle2,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Search,
  Activity,
  FileText,
  Sliders,
  ArrowRight,
  RefreshCw,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { binarySearchJpeg, padJpegToMinBytes, injectJfifDpi, applyColorAdjustments } from '@/lib/image-engine';
import { ExamSocialShareBar } from '@/components/tools/ExamSocialShareBar';

export interface PortalPreset {
  id: string;
  name: string;
  category: 'Photo' | 'Signature' | 'Certificate';
  minKb: number;
  maxKb: number;
  widthPx?: number;
  heightPx?: number;
  aspectRatio?: number; // width / height
  description: string;
  sampleError: string;
}

export const PORTAL_PRESETS: PortalPreset[] = [
  {
    id: 'tnpsc_sig',
    name: 'TNPSC OTR — Specimen Signature',
    category: 'Signature',
    minKb: 10,
    maxKb: 20,
    widthPx: 400,
    heightPx: 133,
    aspectRatio: 3 / 1,
    description: 'Strict 10 KB to 20 KB floor/ceiling. Portal rejects any signature below 10 KB.',
    sampleError: 'File size must be between 10 KB and 20 KB only',
  },
  {
    id: 'tnpsc_photo',
    name: 'TNPSC OTR — Applicant Photo',
    category: 'Photo',
    minKb: 20,
    maxKb: 50,
    widthPx: 413,
    heightPx: 531,
    aspectRatio: 3.5 / 4.5,
    description: '3.5×4.5 cm @ 300 DPI, strictly 20 KB to 50 KB.',
    sampleError: 'Photograph size should be between 20 KB and 50 KB',
  },
  {
    id: 'ssc_sig',
    name: 'SSC CGL / CHSL — Signature',
    category: 'Signature',
    minKb: 10,
    maxKb: 20,
    widthPx: 280,
    heightPx: 140,
    aspectRatio: 4 / 2,
    description: '4.0×2.0 cm, strictly 10 KB to 20 KB in black ink.',
    sampleError: 'Signature size must be between 10 KB and 20 KB',
  },
  {
    id: 'ssc_photo',
    name: 'SSC CGL / CHSL — Photo',
    category: 'Photo',
    minKb: 20,
    maxKb: 50,
    widthPx: 350,
    heightPx: 450,
    aspectRatio: 3.5 / 4.5,
    description: '3.5×4.5 cm with plain background, 20 KB to 50 KB.',
    sampleError: 'Photo width and height must be between 100x120 and 240x320 pixels',
  },
  {
    id: 'upsc_photo_sig',
    name: 'UPSC CSE / OTR — Photo & Signature',
    category: 'Photo',
    minKb: 20,
    maxKb: 300,
    widthPx: 550,
    heightPx: 550,
    aspectRatio: 1,
    description: 'Square 350×350 to 1000×1000 px, strictly 20 KB to 300 KB.',
    sampleError: 'The pixel dimensions of photograph should be between 350x350 to 1000x1000',
  },
  {
    id: 'ibps_sig',
    name: 'IBPS PO / Clerk — Signature',
    category: 'Signature',
    minKb: 10,
    maxKb: 20,
    widthPx: 280,
    heightPx: 140,
    aspectRatio: 2,
    description: 'Strictly 10 KB to 20 KB in black ink on white paper.',
    sampleError: 'The size of the signature image file should be between 10 KB - 20 KB',
  },
  {
    id: 'ibps_thumb',
    name: 'IBPS PO / Clerk — Left Thumb',
    category: 'Signature',
    minKb: 20,
    maxKb: 50,
    widthPx: 350,
    heightPx: 350,
    aspectRatio: 1,
    description: 'Strictly 20 KB to 50 KB on white paper with blue/black ink.',
    sampleError: 'Thumb impression size must be between 20 KB and 50 KB',
  },
  {
    id: 'ibps_decl',
    name: 'IBPS PO / Clerk — Handwritten Declaration',
    category: 'Certificate',
    minKb: 50,
    maxKb: 100,
    widthPx: 800,
    heightPx: 400,
    aspectRatio: 2,
    description: 'Strictly 50 KB to 100 KB in English with black ink.',
    sampleError: 'Handwritten declaration file size must be 50 KB to 100 KB',
  },
  {
    id: 'parivahan_sig',
    name: 'Parivahan Sarathi DL — Photo / Signature',
    category: 'Signature',
    minKb: 10,
    maxKb: 20,
    widthPx: 350,
    heightPx: 150,
    aspectRatio: 35 / 15,
    description: 'Strictly 10 KB to 20 KB for Driving Licence and Learner Licence.',
    sampleError: 'Photo / Signature size should be between 10 KB to 20 KB',
  },
  {
    id: 'cert_200kb',
    name: 'State PSC / e-District — Certificate PDF',
    category: 'Certificate',
    minKb: 50,
    maxKb: 200,
    description: 'Supporting documents must not exceed 200 KB.',
    sampleError: 'Document file size exceeds 200 KB limit',
  },
];

interface DiagnosisResult {
  hasDefect: boolean;
  defects: string[];
  remedyText: string;
}

export default function UploadErrorDoctorEngine() {
  const [selectedPresetId, setSelectedPresetId] = React.useState<string>('tnpsc_sig');
  const [errorSearchInput, setErrorSearchInput] = React.useState<string>('');

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = React.useState<string | null>(null);
  const [fileSizeKb, setFileSizeKb] = React.useState<number>(0);
  const [fileWidth, setFileWidth] = React.useState<number>(0);
  const [fileHeight, setFileHeight] = React.useState<number>(0);

  const [diagnosis, setDiagnosis] = React.useState<DiagnosisResult | null>(null);
  const [isCuring, setIsCuring] = React.useState<boolean>(false);
  const [curedBlob, setCuredBlob] = React.useState<Blob | null>(null);
  const [curedDataUrl, setCuredDataUrl] = React.useState<string | null>(null);
  const [curedSizeKb, setCuredSizeKb] = React.useState<number>(0);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const currentPreset = React.useMemo(() => {
    return PORTAL_PRESETS.find((p) => p.id === selectedPresetId) || PORTAL_PRESETS[0];
  }, [selectedPresetId]);

  // Auto-Detect Preset from Pasted Error Message
  React.useEffect(() => {
    if (!errorSearchInput.trim()) return;
    const query = errorSearchInput.toLowerCase();

    // Check for explicit portal names or error keywords
    if (query.includes('tnpsc') || (query.includes('10') && query.includes('20') && query.includes('signature'))) {
      setSelectedPresetId('tnpsc_sig');
    } else if (query.includes('ssc') && query.includes('signature')) {
      setSelectedPresetId('ssc_sig');
    } else if (query.includes('ssc') || query.includes('100x120') || query.includes('240x320')) {
      setSelectedPresetId('ssc_photo');
    } else if (query.includes('upsc') || query.includes('350x350') || query.includes('1000x1000')) {
      setSelectedPresetId('upsc_photo_sig');
    } else if (query.includes('declaration') || query.includes('50') && query.includes('100')) {
      setSelectedPresetId('ibps_decl');
    } else if (query.includes('thumb')) {
      setSelectedPresetId('ibps_thumb');
    } else if (query.includes('sarathi') || query.includes('parivahan')) {
      setSelectedPresetId('parivahan_sig');
    } else if (query.includes('200') || query.includes('pdf')) {
      setSelectedPresetId('cert_200kb');
    }
  }, [errorSearchInput]);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setCuredBlob(null);
    setCuredDataUrl(null);

    const sizeKb = Math.round((file.size / 1024) * 10) / 10;
    setFileSizeKb(sizeKb);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFileDataUrl(url);

      const img = new Image();
      img.onload = () => {
        setFileWidth(img.width);
        setFileHeight(img.height);
        diagnoseDefect(sizeKb, img.width, img.height, currentPreset);
      };
      img.src = url;
    } else {
      // PDF or other
      setFileDataUrl(null);
      setFileWidth(0);
      setFileHeight(0);
      diagnoseDefect(sizeKb, 0, 0, currentPreset);
    }
  };

  // Diagnose File Defect against Target Preset
  const diagnoseDefect = (sizeKb: number, width: number, height: number, preset: PortalPreset) => {
    const defects: string[] = [];

    if (sizeKb < preset.minKb) {
      defects.push(`File is undersized (${sizeKb} KB). Portal rejects files under ${preset.minKb} KB.`);
    } else if (sizeKb > preset.maxKb) {
      defects.push(`File is oversized (${sizeKb} KB). Portal maximum ceiling is ${preset.maxKb} KB.`);
    }

    if (preset.widthPx && preset.heightPx && width > 0 && height > 0) {
      const currentRatio = width / height;
      const targetRatio = (preset.widthPx / preset.heightPx);
      if (Math.abs(currentRatio - targetRatio) > 0.3) {
        defects.push(`Aspect ratio mismatch (${width}×${height} px). Portal expects calibrated ${preset.category.toLowerCase()} proportions.`);
      }
    }

    const hasDefect = defects.length > 0;
    const remedyText = hasDefect
      ? `Click "Cure & Fix File" to automatically calibrate pixel bounds, enhance contrast, and lock size to strictly between ${preset.minKb} KB and ${preset.maxKb} KB.`
      : `File is already fully compliant with ${preset.name}!`;

    setDiagnosis({
      hasDefect,
      defects,
      remedyText,
    });
  };

  // Re-diagnose when preset changes
  React.useEffect(() => {
    if (uploadedFile) {
      diagnoseDefect(fileSizeKb, fileWidth, fileHeight, currentPreset);
    }
  }, [currentPreset]);

  // Cure Action Handler
  const handleCureFile = async () => {
    if (!uploadedFile) return;

    setIsCuring(true);
    try {
      if (uploadedFile.type.startsWith('image/')) {
        const img = new Image();
        const objectUrl = URL.createObjectURL(uploadedFile);
        img.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Failed to load image'));
        });

        const targetW = currentPreset.widthPx || (currentPreset.category === 'Signature' ? 350 : 400);
        const targetH = currentPreset.heightPx || (currentPreset.category === 'Signature' ? 140 : 500);

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetW, targetH);

        // Aspect fit with clean margins
        const pad = currentPreset.category === 'Signature' ? 8 : 0;
        const availW = targetW - pad * 2;
        const availH = targetH - pad * 2;
        const scale = Math.min(availW / img.width, availH / img.height);
        const renderW = img.width * scale;
        const renderH = img.height * scale;
        const offsetX = (targetW - renderW) / 2;
        const offsetY = (targetH - renderH) / 2;

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

        // Enhance contrast for signatures
        if (currentPreset.category === 'Signature') {
          applyColorAdjustments(ctx, targetW, targetH, 10, 40, false);
        }

        // Quality optimization to target window
        const { bytes, sizeKb } = await binarySearchJpeg(canvas, currentPreset.minKb, currentPreset.maxKb, 300);

        // Safe lossless padding if below minimum
        const targetMinBytes = (currentPreset.minKb + (currentPreset.maxKb - currentPreset.minKb) * 0.3) * 1024;
        const paddedBytes = padJpegToMinBytes(bytes, targetMinBytes);
        const finalJfifBytes = injectJfifDpi(paddedBytes, 300);

        const safeBlob = new Blob([finalJfifBytes as unknown as BlobPart], { type: 'image/jpeg' });
        const finalSizeKb = Math.round((safeBlob.size / 1024) * 10) / 10;
        const curedUrl = URL.createObjectURL(safeBlob);
        URL.revokeObjectURL(objectUrl);

        setCuredBlob(safeBlob);
        setCuredDataUrl(curedUrl);
        setCuredSizeKb(finalSizeKb);

        // Trigger celebratory confetti
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.7 },
        });
      }
    } catch (err) {
      console.error('Curing error:', err);
    } finally {
      setIsCuring(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setFileDataUrl(null);
    setFileSizeKb(0);
    setFileWidth(0);
    setFileHeight(0);
    setDiagnosis(null);
    setCuredBlob(null);
    setCuredDataUrl(null);
    setCuredSizeKb(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Search / Diagnosis Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary-light/40 to-primary/10 border border-primary/20 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
                <span>Upload Error Doctor &amp; Reverse Diagnoser</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  AI Cure Engine
                </span>
              </h2>
              <p className="text-xs text-text-main/70">
                Paste the error message you received from SSC, UPSC, TNPSC, or IBPS, or pick your target portal.
              </p>
            </div>
          </div>

          {uploadedFile && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-text-main/80 bg-surface hover:bg-surface-darker border border-surface-darker rounded-xl transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Search / Paste Error Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-text-main/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Paste your portal error (e.g., 'File size less than 10 KB' or 'Dimensions must be 100x120')..."
            value={errorSearchInput}
            onChange={(e) => setErrorSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-surface rounded-2xl border border-surface-darker focus:outline-none focus:border-primary text-text-main shadow-inner"
          />
        </div>

        {/* Portal Presets Selector Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {PORTAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPresetId === preset.id
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-surface hover:bg-surface-darker text-text-main/80 border border-surface-darker'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagnostic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Upload & File Info Card (5 Cols) */}
        <div className="lg:col-span-5 bg-surface rounded-3xl border border-surface-darker p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-main/70">
              1. Upload Rejected File
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-darker text-primary">
              Target: {currentPreset.minKb}–{currentPreset.maxKb} KB
            </span>
          </div>

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-surface-darker hover:border-primary/60 bg-surface-darker/30 rounded-2xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[220px]"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileUpload}
            />

            {fileDataUrl ? (
              <div className="space-y-2">
                <img
                  src={fileDataUrl}
                  alt="Uploaded File Preview"
                  className="max-h-36 max-w-full object-contain mx-auto rounded-lg shadow-sm"
                />
                <div className="text-[11px] font-mono text-text-main/80">
                  {fileWidth}×{fileHeight} px • {fileSizeKb} KB
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-text-main">Drop Rejected Photo or Signature</div>
                <div className="text-[10px] text-text-main/60">JPEG, PNG, or PDF file</div>
              </div>
            )}
          </div>

          {/* Current Preset Rules Summary */}
          <div className="p-3.5 rounded-2xl bg-surface-darker/60 border border-surface-darker space-y-1.5 text-xs">
            <div className="font-bold text-text-main flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              <span>{currentPreset.name}</span>
            </div>
            <p className="text-[11px] text-text-main/70 leading-relaxed">
              {currentPreset.description}
            </p>
          </div>
        </div>

        {/* Right Doctor Diagnosis & Cure Card (7 Cols) */}
        <div className="lg:col-span-7 bg-surface rounded-3xl border border-surface-darker p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-surface-darker pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-main">
                  2. Clinical Defect Diagnosis
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-text-main/60">
                Real-Time Parser
              </span>
            </div>

            {/* Diagnosis Report */}
            {diagnosis ? (
              <div className="space-y-3">
                {diagnosis.hasDefect ? (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Defects Diagnosed ({diagnosis.defects.length})</span>
                    </div>
                    <ul className="space-y-1 list-disc list-inside text-text-main/80 text-[11px]">
                      {diagnosis.defects.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>File is already 100% compliant with this portal!</span>
                  </div>
                )}

                <p className="text-xs text-text-main/70 leading-relaxed">
                  {diagnosis.remedyText}
                </p>
              </div>
            ) : (
              <div className="py-10 text-center text-xs text-text-main/50 space-y-2">
                <FileText className="w-8 h-8 mx-auto opacity-40" />
                <div>Upload your file on the left to begin automatic defect diagnosis.</div>
              </div>
            )}

            {/* Cured Preview Box (If already cured) */}
            {curedDataUrl && (
              <div className="p-4 rounded-2xl bg-emerald-500/5 border-2 border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cured &amp; Verified File Output</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {curedSizeKb} KB (Compliant!)
                  </span>
                </div>

                <div className="max-h-36 overflow-hidden flex items-center justify-center bg-white p-2 rounded-xl border border-surface-darker">
                  <img
                    src={curedDataUrl}
                    alt="Cured Compliant File"
                    className="max-h-32 object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Master Cure & Download Buttons */}
          <div className="space-y-2 pt-4">
            {curedBlob ? (
              <>
                <a
                  href={curedDataUrl!}
                download={`cured_${currentPreset.id}_compliant.jpg`}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
              >
                <Download className="w-4 h-4" />
                <span>Download Cured File ({curedSizeKb} KB)</span>
              </a>
              {/* Telegram & WhatsApp Aspirant Community Sharing */}
              <ExamSocialShareBar
                toolName="Upload Error Doctor"
                examName={currentPreset.name}
              />
            </>
            ) : (
              <button
                onClick={handleCureFile}
                disabled={!uploadedFile || isCuring}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  uploadedFile && !isCuring
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:scale-[1.01]'
                    : 'bg-surface-darker text-text-main/40 cursor-not-allowed border border-surface-darker'
                }`}
              >
                {isCuring ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Curing Defect &amp; Compressing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Cure &amp; Fix File in 1-Click</span>
                  </>
                )}
              </button>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-main/60 pt-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>100% In-RAM Browser Execution. Identity files are never stored remotely.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
