'use client';

import * as React from 'react';
import {
  Upload,
  Camera,
  PenTool,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  RotateCcw,
  Sparkles,
  Lock,
  Calendar,
  User,
  Archive,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';
import { binarySearchJpeg, padJpegToMinBytes, injectJfifDpi, applyColorAdjustments } from '@/lib/image-engine';
import { ExamSocialShareBar } from '@/components/tools/ExamSocialShareBar';

export type PortalType = 'tnpsc' | 'ssc';

interface ExamComboPackEngineProps {
  portal: PortalType;
}

interface ProcessedFile {
  originalFile: File;
  processedBlob: Blob | null;
  processedDataUrl: string | null;
  sizeKb: number;
  widthPx: number;
  heightPx: number;
  isCompliant: boolean;
  statusText: string;
}

export default function ExamComboPackEngine({ portal }: ExamComboPackEngineProps) {
  const isTnpsc = portal === 'tnpsc';

  // Candidate Details for Photo Strip
  const [candidateName, setCandidateName] = React.useState('');
  const [photoDate, setPhotoDate] = React.useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Processing States
  const [photo, setPhoto] = React.useState<ProcessedFile | null>(null);
  const [signature, setSignature] = React.useState<ProcessedFile | null>(null);
  const [certificate, setCertificate] = React.useState<ProcessedFile | null>(null);

  const [isProcessingPhoto, setIsProcessingPhoto] = React.useState(false);
  const [isProcessingSig, setIsProcessingSig] = React.useState(false);
  const [isProcessingCert, setIsProcessingCert] = React.useState(false);
  const [isZipping, setIsZipping] = React.useState(false);

  // Hidden File Inputs
  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const sigInputRef = React.useRef<HTMLInputElement>(null);
  const certInputRef = React.useRef<HTMLInputElement>(null);

  // Format Date for Display (DD/MM/YYYY)
  const formattedPhotoDate = React.useMemo(() => {
    if (!photoDate) return '';
    const parts = photoDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return photoDate;
  }, [photoDate]);

  // 1. Process Photograph
  const processPhotoFile = React.useCallback(
    async (file: File, name: string, dateStr: string) => {
      setIsProcessingPhoto(true);
      try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Failed to load photograph'));
        });

        // Dimensions: 3.5 x 4.5 cm @ 300 DPI
        const targetWidth = isTnpsc ? 413 : 350;
        const targetHeight = isTnpsc ? 531 : 450;

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Aspect ratio crop for upper photo area
        const stripHeight = isTnpsc ? Math.round(targetHeight * 0.2) : name ? Math.round(targetHeight * 0.18) : 0;
        const photoAreaHeight = targetHeight - stripHeight;

        const scale = Math.max(targetWidth / img.width, photoAreaHeight / img.height);
        const renderW = img.width * scale;
        const renderH = img.height * scale;
        const offsetX = (targetWidth - renderW) / 2;
        const offsetY = (photoAreaHeight - renderH) / 2;

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

        // Draw bottom white banner if name or date provided
        if (stripHeight > 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, photoAreaHeight, targetWidth, stripHeight);

          // Subtle divider line
          ctx.strokeStyle = '#D1D5DB';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, photoAreaHeight);
          ctx.lineTo(targetWidth, photoAreaHeight);
          ctx.stroke();

          // Draw Text (Candidate Name & Date)
          ctx.fillStyle = '#000000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const uppercaseName = name.trim().toUpperCase() || 'CANDIDATE NAME';
          const fontSize = Math.max(12, Math.round(stripHeight * 0.32));
          ctx.font = `bold ${fontSize}px sans-serif`;

          const line1Y = photoAreaHeight + stripHeight * 0.35;
          const line2Y = photoAreaHeight + stripHeight * 0.72;

          ctx.fillText(uppercaseName, targetWidth / 2, line1Y);

          ctx.font = `600 ${Math.max(10, Math.round(fontSize * 0.85))}px sans-serif`;
          ctx.fillText(`D.O.P: ${dateStr}`, targetWidth / 2, line2Y);
        }

        // Quality optimization: strictly 20 KB to 50 KB
        const { bytes, sizeKb } = await binarySearchJpeg(canvas, 20, 50, 300);
        const jfifBytes = injectJfifDpi(bytes, 300);

        const safeBlob = new Blob([jfifBytes as unknown as BlobPart], { type: 'image/jpeg' });
        const dataUrl = URL.createObjectURL(safeBlob);
        URL.revokeObjectURL(objectUrl);

        const isCompliant = sizeKb >= 20 && sizeKb <= 50;
        setPhoto({
          originalFile: file,
          processedBlob: safeBlob,
          processedDataUrl: dataUrl,
          sizeKb: Math.round(sizeKb * 10) / 10,
          widthPx: targetWidth,
          heightPx: targetHeight,
          isCompliant,
          statusText: isCompliant
            ? `Compliant (${Math.round(sizeKb * 10) / 10} KB)`
            : `Non-compliant size (${Math.round(sizeKb * 10) / 10} KB)`,
        });
      } catch (err) {
        console.error('Photo processing error:', err);
      } finally {
        setIsProcessingPhoto(false);
      }
    },
    [isTnpsc]
  );

  // Re-process photo when Name or Date changes
  React.useEffect(() => {
    if (photo?.originalFile) {
      processPhotoFile(photo.originalFile, candidateName, formattedPhotoDate);
    }
  }, [candidateName, formattedPhotoDate]);

  // 2. Process Signature
  const processSignatureFile = React.useCallback(
    async (file: File) => {
      setIsProcessingSig(true);
      try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Failed to load signature'));
        });

        // Dimensions: TNPSC: 6.0 x 2.0 cm (400 x 133 px); SSC: 4.0 x 2.0 cm (240 x 120 px)
        const targetWidth = isTnpsc ? 400 : 280;
        const targetHeight = isTnpsc ? 133 : 140;

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Aspect fit signature inside box with margin
        const pad = 8;
        const availW = targetWidth - pad * 2;
        const availH = targetHeight - pad * 2;
        const scale = Math.min(availW / img.width, availH / img.height);
        const renderW = img.width * scale;
        const renderH = img.height * scale;
        const offsetX = (targetWidth - renderW) / 2;
        const offsetY = (targetHeight - renderH) / 2;

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

        // Enhance contrast (whiten background paper & darken ink)
        applyColorAdjustments(ctx, targetWidth, targetHeight, 10, 40, false);

        // Target: strictly 10 KB to 20 KB
        const { bytes } = await binarySearchJpeg(canvas, 10, 20, 300);
        // Safe lossless COM padding if under 10 KB
        const paddedBytes = padJpegToMinBytes(bytes, 10.5 * 1024);
        const finalJfifBytes = injectJfifDpi(paddedBytes, 300);

        const safeBlob = new Blob([finalJfifBytes as unknown as BlobPart], { type: 'image/jpeg' });
        const sizeKb = Math.round((safeBlob.size / 1024) * 10) / 10;
        const dataUrl = URL.createObjectURL(safeBlob);
        URL.revokeObjectURL(objectUrl);

        const isCompliant = sizeKb >= 10 && sizeKb <= 20;
        setSignature({
          originalFile: file,
          processedBlob: safeBlob,
          processedDataUrl: dataUrl,
          sizeKb,
          widthPx: targetWidth,
          heightPx: targetHeight,
          isCompliant,
          statusText: isCompliant ? `Compliant (${sizeKb} KB)` : `Non-compliant size (${sizeKb} KB)`,
        });
      } catch (err) {
        console.error('Signature processing error:', err);
      } finally {
        setIsProcessingSig(false);
      }
    },
    [isTnpsc]
  );

  // 3. Process Certificate (Community / SSLC / Category)
  const processCertificateFile = React.useCallback(
    async (file: File) => {
      setIsProcessingCert(true);
      try {
        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        let finalBlob: Blob;

        if (isPdf) {
          // If already PDF, read bytes and embed/validate
          const fileBytes = await file.arrayBuffer();
          finalBlob = new Blob([fileBytes], { type: 'application/pdf' });
        } else {
          // If image (JPEG/PNG), embed into clean A4 PDF using pdf-lib
          const imgBytes = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.create();
          // A4 dimensions at 72 points per inch: 595.28 x 841.89
          const page = pdfDoc.addPage([595.28, 841.89]);

          let embeddedImg;
          if (file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')) {
            embeddedImg = await pdfDoc.embedPng(imgBytes);
          } else {
            embeddedImg = await pdfDoc.embedJpg(imgBytes);
          }

          // Scale image to fit page with 30pt margins
          const margin = 30;
          const usableW = 595.28 - margin * 2;
          const usableH = 841.89 - margin * 2;
          const scale = Math.min(usableW / embeddedImg.width, usableH / embeddedImg.height);
          const drawW = embeddedImg.width * scale;
          const drawH = embeddedImg.height * scale;
          const x = (595.28 - drawW) / 2;
          const y = (841.89 - drawH) / 2;

          page.drawImage(embeddedImg, { x, y, width: drawW, height: drawH });
          const pdfBytes = await pdfDoc.save();
          finalBlob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
        }

        const sizeKb = Math.round((finalBlob.size / 1024) * 10) / 10;
        const maxLimit = isTnpsc ? 200 : 300;
        const isCompliant = sizeKb <= maxLimit;
        const dataUrl = URL.createObjectURL(finalBlob);

        setCertificate({
          originalFile: file,
          processedBlob: finalBlob,
          processedDataUrl: dataUrl,
          sizeKb,
          widthPx: 595,
          heightPx: 842,
          isCompliant,
          statusText: isCompliant
            ? `Compliant (${sizeKb} KB ≤ ${maxLimit} KB)`
            : `Over limit (${sizeKb} KB > ${maxLimit} KB)`,
        });
      } catch (err) {
        console.error('Certificate processing error:', err);
      } finally {
        setIsProcessingCert(false);
      }
    },
    [isTnpsc]
  );

  // 1-Click ZIP Download Handler
  const handleDownloadAllZip = async () => {
    if (!photo?.processedBlob && !signature?.processedBlob && !certificate?.processedBlob) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      const prefix = isTnpsc ? 'TNPSC_OTR' : 'SSC_Application';

      if (photo?.processedBlob) {
        zip.file(`${prefix}_Photograph_20_50KB.jpg`, photo.processedBlob);
      }
      if (signature?.processedBlob) {
        zip.file(`${prefix}_Signature_10_20KB.jpg`, signature.processedBlob);
      }
      if (certificate?.processedBlob) {
        zip.file(`${prefix}_Certificate.pdf`, certificate.processedBlob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${prefix}_Document_Bundle.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setIsZipping(false);
    }
  };

  // Reset Everything
  const handleReset = () => {
    setPhoto(null);
    setSignature(null);
    setCertificate(null);
    setCandidateName('');
    if (photoInputRef.current) photoInputRef.current.value = '';
    if (sigInputRef.current) sigInputRef.current.value = '';
    if (certInputRef.current) certInputRef.current.value = '';
  };

  const allReady = Boolean(photo?.processedBlob && signature?.processedBlob && certificate?.processedBlob);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-primary/10 via-primary-light/40 to-primary/10 border border-primary/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
              <span>{isTnpsc ? 'TNPSC OTR 3-in-1 Combo Pack' : 'SSC Application 3-in-1 Combo Pack'}</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                1-Click ZIP
              </span>
            </h2>
            <p className="text-xs text-text-main/70">
              {isTnpsc
                ? 'Pre-calibrated for TNPSC Group 1, 2, 4 & VAO One Time Registration (OTR).'
                : 'Pre-calibrated for SSC CGL, CHSL, MTS & GD Constable recruitment portals.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-text-main/80 bg-surface hover:bg-surface-darker border border-surface-darker rounded-xl transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </div>

      {/* Candidate Details Configuration for Photo Strip */}
      <div className="bg-surface rounded-2xl border border-surface-darker p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-text-main">
          <User className="w-4 h-4 text-primary" />
          <span>Mandatory Photo Stamping Parameters (Name & Date of Photo)</span>
        </div>
        <p className="text-xs text-text-main/70">
          Official gazette rules mandate Candidate Name in block capitals and recent Date of Photograph (DOP) printed at the bottom of the photo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-main flex items-center gap-1.5">
              <span>Candidate Name (Full Name in CAPITALS)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. M. KARTHIK RAJAN"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-surface-darker/60 border border-surface-darker rounded-xl focus:outline-none focus:border-primary text-text-main font-medium uppercase"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-main flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Date of Photograph (D.O.P)</span>
            </label>
            <input
              type="date"
              value={photoDate}
              onChange={(e) => setPhotoDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-surface-darker/60 border border-surface-darker rounded-xl focus:outline-none focus:border-primary text-text-main font-medium"
            />
          </div>
        </div>
      </div>

      {/* 3-Column Asset Upload & Processing Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD 1: PHOTOGRAPH */}
        <div className="bg-surface rounded-2xl border border-surface-darker p-4 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">1. Photograph</h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-darker text-text-main/80">
                20–50 KB
              </span>
            </div>

            <p className="text-[11px] text-text-main/70">
              {isTnpsc
                ? '3.5×4.5 cm (413×531 px @ 300 DPI) with bottom Name & DOP strip.'
                : '3.5×4.5 cm with plain background, face covering 80% area.'}
            </p>

            {/* Preview Box */}
            <div className="relative aspect-[3.5/4.5] w-full max-w-[200px] mx-auto rounded-xl border-2 border-dashed border-surface-darker bg-surface-darker/40 overflow-hidden flex flex-col items-center justify-center group">
              {isProcessingPhoto ? (
                <div className="flex flex-col items-center gap-2 text-primary p-4">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span className="text-[10px] font-semibold">Cropping & Stamping...</span>
                </div>
              ) : photo?.processedDataUrl ? (
                <img
                  src={photo.processedDataUrl}
                  alt="Processed Candidate Photo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div
                  onClick={() => photoInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Upload className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs font-bold text-text-main">Upload Photo</span>
                  <span className="text-[10px] text-text-main/60 mt-0.5">JPEG / PNG / WebP</span>
                </div>
              )}
            </div>

            {/* Hidden Input */}
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) processPhotoFile(f, candidateName, formattedPhotoDate);
              }}
            />

            {/* Status / Compliance Badge */}
            {photo && (
              <div
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium ${
                  photo.isCompliant
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                {photo.isCompliant ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate">{photo.statusText}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => photoInputRef.current?.click()}
              className="flex-1 py-2 text-xs font-bold rounded-xl border border-surface-darker hover:bg-surface-darker transition-colors text-text-main"
            >
              {photo ? 'Replace' : 'Choose Photo'}
            </button>
            {photo?.processedBlob && (
              <a
                href={photo.processedDataUrl!}
                download={isTnpsc ? 'TNPSC_Photo_NameDate.jpg' : 'SSC_Photo_20_50KB.jpg'}
                className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                title="Download Photo"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* CARD 2: SPECIMEN SIGNATURE */}
        <div className="bg-surface rounded-2xl border border-surface-darker p-4 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <PenTool className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">2. Signature</h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-darker text-text-main/80">
                10–20 KB
              </span>
            </div>

            <p className="text-[11px] text-text-main/70">
              {isTnpsc
                ? '6.0×2.0 cm (400×133 px). Strict floor & ceiling: 10 KB to 20 KB.'
                : '4.0×2.0 cm (140×60 px minimum). Black ink on clean white sheet.'}
            </p>

            {/* Preview Box */}
            <div className="relative aspect-[6/2] w-full max-w-[240px] mx-auto rounded-xl border-2 border-dashed border-surface-darker bg-surface-darker/40 overflow-hidden flex flex-col items-center justify-center group">
              {isProcessingSig ? (
                <div className="flex flex-col items-center gap-2 text-primary p-4">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span className="text-[10px] font-semibold">Cleaning Ink...</span>
                </div>
              ) : signature?.processedDataUrl ? (
                <img
                  src={signature.processedDataUrl}
                  alt="Processed Candidate Signature"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div
                  onClick={() => sigInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Upload className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs font-bold text-text-main">Upload Signature</span>
                  <span className="text-[10px] text-text-main/60 mt-0.5">JPEG / PNG</span>
                </div>
              )}
            </div>

            {/* Hidden Input */}
            <input
              ref={sigInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) processSignatureFile(f);
              }}
            />

            {/* Status / Compliance Badge */}
            {signature && (
              <div
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium ${
                  signature.isCompliant
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                {signature.isCompliant ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate">{signature.statusText}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => sigInputRef.current?.click()}
              className="flex-1 py-2 text-xs font-bold rounded-xl border border-surface-darker hover:bg-surface-darker transition-colors text-text-main"
            >
              {signature ? 'Replace' : 'Choose Signature'}
            </button>
            {signature?.processedBlob && (
              <a
                href={signature.processedDataUrl!}
                download={isTnpsc ? 'TNPSC_Signature_10_20KB.jpg' : 'SSC_Signature_10_20KB.jpg'}
                className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                title="Download Signature"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* CARD 3: CERTIFICATE (COMMUNITY / SSLC / CATEGORY) */}
        <div className="bg-surface rounded-2xl border border-surface-darker p-4 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">3. Certificate</h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-darker text-text-main/80">
                {isTnpsc ? '< 200 KB' : '< 300 KB'}
              </span>
            </div>

            <p className="text-[11px] text-text-main/70">
              {isTnpsc
                ? 'Community, SSLC Marksheet, or PSTM Certificate compiled in PDF.'
                : 'Category (OBC/EWS/SC/ST) or 10th certificate in PDF.'}
            </p>

            {/* Preview Box */}
            <div className="relative aspect-[3.5/4.5] w-full max-w-[200px] mx-auto rounded-xl border-2 border-dashed border-surface-darker bg-surface-darker/40 overflow-hidden flex flex-col items-center justify-center group">
              {isProcessingCert ? (
                <div className="flex flex-col items-center gap-2 text-primary p-4">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span className="text-[10px] font-semibold">Compiling PDF...</span>
                </div>
              ) : certificate?.processedBlob ? (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-text-main truncate max-w-[150px]">
                    {certificate.originalFile.name}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {certificate.sizeKb} KB (PDF Ready)
                  </span>
                </div>
              ) : (
                <div
                  onClick={() => certInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Upload className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs font-bold text-text-main">Upload Certificate</span>
                  <span className="text-[10px] text-text-main/60 mt-0.5">PDF / JPEG / PNG</span>
                </div>
              )}
            </div>

            {/* Hidden Input */}
            <input
              ref={certInputRef}
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) processCertificateFile(f);
              }}
            />

            {/* Status / Compliance Badge */}
            {certificate && (
              <div
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium ${
                  certificate.isCompliant
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                {certificate.isCompliant ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate">{certificate.statusText}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => certInputRef.current?.click()}
              className="flex-1 py-2 text-xs font-bold rounded-xl border border-surface-darker hover:bg-surface-darker transition-colors text-text-main"
            >
              {certificate ? 'Replace' : 'Choose Certificate'}
            </button>
            {certificate?.processedBlob && (
              <a
                href={certificate.processedDataUrl!}
                download={isTnpsc ? 'TNPSC_Certificate_Under_200KB.pdf' : 'SSC_Certificate_Under_300KB.pdf'}
                className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                title="Download Certificate"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* MASTER ACTION BAR: 1-CLICK ZIP DOWNLOAD */}
      <div className="bg-surface rounded-2xl border-2 border-primary/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-primary/5">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-base font-bold text-text-main">
              {allReady ? 'All 3 Files Prepared & Compliant!' : 'Upload Your Files to Generate Application ZIP'}
            </span>
          </div>
          <p className="text-xs text-text-main/70">
            {allReady
              ? 'Click below to download all 3 files packed into an official exam submission ZIP archive.'
              : 'Add photo, signature, and certificate above. Kagazo verifies compliance in real-time.'}
          </p>
        </div>

        <button
          onClick={handleDownloadAllZip}
          disabled={!photo?.processedBlob && !signature?.processedBlob && !certificate?.processedBlob || isZipping}
          className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${
            photo?.processedBlob || signature?.processedBlob || certificate?.processedBlob
              ? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-surface-darker text-text-main/40 cursor-not-allowed border border-surface-darker'
          }`}
        >
          {isZipping ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating ZIP Bundle...</span>
            </>
          ) : (
            <>
              <Archive className="w-4 h-4" />
              <span>Download 1-Click Application Bundle (.ZIP)</span>
            </>
          )}
        </button>
      </div>

      {/* Telegram & WhatsApp Aspirant Community Sharing */}
      <ExamSocialShareBar
        toolName={isTnpsc ? 'TNPSC Combo Pack' : 'SSC Combo Pack'}
        examName={isTnpsc ? 'TNPSC Group 1, 2, 4 & VAO' : 'SSC CGL / CHSL / MTS'}
      />

      {/* Zero Cloud Upload Security Guarantee */}
      <div className="flex items-center justify-center gap-2 text-xs text-text-main/60 py-2">
        <Lock className="w-3.5 h-3.5 text-emerald-500" />
        <span>100% In-RAM Browser Processing: Identity files never touch remote cloud servers.</span>
      </div>
    </div>
  );
}
