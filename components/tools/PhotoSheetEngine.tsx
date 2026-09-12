'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Printer,
  Download,
  Scissors,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Grid,
  Calendar,
  User,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Sliders,
  Plus,
  Minus,
  Trash2,
  Maximize2,
  Check,
  Type,
  Eye,
  ZoomIn,
  Move,
  Info,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { printIsolatedDocument } from '@/lib/print-utils';

interface PhotoItem {
  id: string;
  file: File;
  previewUrl: string;
  imageObj: HTMLImageElement;
  copies: number;
  name?: string;
  dop?: string;
  zoom: number; // 1.0 to 2.5
  panY: number; // -50% to +50%
  panX: number; // -50% to +50%
}

const PHOTO_SIZES = [
  { id: '35x45', label: '3.5 × 4.5 cm — Indian Passport / Aadhaar ★', widthMm: 35, heightMm: 45 },
  { id: '50x50', label: '2 × 2 inch (51×51 mm) — US Visa / OCI / Canadian', widthMm: 50.8, heightMm: 50.8 },
  { id: '20x25', label: '2.0 × 2.5 cm — Stamp Size (College / Railway / Bank)', widthMm: 20, heightMm: 25 },
  { id: '25x35', label: '2.5 × 3.5 cm — Indian PAN Card (UTI / NSDL)', widthMm: 25, heightMm: 35 },
  { id: '35x45_schengen', label: '3.5 × 4.5 cm — Schengen European Visa', widthMm: 35, heightMm: 45 },
  { id: '35x35', label: '3.5 × 3.5 cm — SSC & State PSC Applications', widthMm: 35, heightMm: 35 },
  { id: '100x150', label: '4 × 6 inch (10×15 cm) — NEET UG Postcard', widthMm: 101.6, heightMm: 152.4 },
];

const PAPER_SIZES = [
  { id: '4R', label: '4R (4 × 6 inch)', wMm: 101.6, hMm: 152.4, desc: '₹5 Lab Print • 8 Photos' },
  { id: 'A4', label: 'A4 Sheet', wMm: 210, hMm: 297, desc: 'Cyber Cafe Bulk • 32 Photos' },
  { id: '5R', label: '5R (5 × 7 inch)', wMm: 127, hMm: 177.8, desc: 'Studio Print • 12 Photos' },
  { id: 'A5', label: 'A5 Sheet', wMm: 148, hMm: 210, desc: 'Half A4 • 16 Photos' },
];

const BG_SWATCHES = [
  { id: 'original', label: 'Original', color: 'transparent', border: '#CBD5E1' },
  { id: '#FFFFFF', label: 'Pure White', color: '#FFFFFF', border: '#94A3B8' },
  { id: '#E2E8F0', label: 'Light Grey', color: '#E2E8F0', border: '#CBD5E1' },
  { id: '#6BA4FF', label: 'Sky Blue', color: '#6BA4FF', border: '#2563EB' },
  { id: '#BBF7D0', label: 'Light Green', color: '#BBF7D0', border: '#16A34A' },
  { id: '#FECDD3', label: 'Soft Pink', color: '#FECDD3', border: '#E11D48' },
  { id: '#FEF08A', label: 'Light Yellow', color: '#FEF08A', border: '#CA8A04' },
];

const BORDER_SWATCHES = [
  { id: '#000000', label: 'Black', color: '#000000' },
  { id: '#FFFFFF', label: 'White', color: '#FFFFFF' },
  { id: '#2563EB', label: 'Blue', color: '#2563EB' },
  { id: '#64748B', label: 'Slate', color: '#64748B' },
  { id: '#DC2626', label: 'Red', color: '#DC2626' },
];

// Pure client-side PDF binary generator (exact physical mm dimensions)
function createPdfFromJpeg(jpegDataUrl: string, widthMm: number, heightMm: number, imgW: number, imgH: number): Blob {
  const base64Data = jpegDataUrl.split(',')[1];
  const binaryString = atob(base64Data);
  const binaryLen = binaryString.length;
  const jpegBytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    jpegBytes[i] = binaryString.charCodeAt(i);
  }

  const ptW = (widthMm / 25.4) * 72;
  const ptH = (heightMm / 25.4) * 72;

  const chunks: (Uint8Array | string)[] = [];
  const offsets: number[] = [];
  let curOffset = 0;

  function addStr(str: string) {
    chunks.push(str);
    curOffset += str.length;
  }

  function addBytes(bytes: Uint8Array) {
    chunks.push(bytes);
    curOffset += bytes.length;
  }

  // Header
  addStr('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n');

  // Obj 1: Catalog
  offsets[1] = curOffset;
  addStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // Obj 2: Pages
  offsets[2] = curOffset;
  addStr('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // Obj 3: Page
  offsets[3] = curOffset;
  addStr(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ptW.toFixed(2)} ${ptH.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`
  );

  // Obj 4: Image XObject
  offsets[4] = curOffset;
  addStr(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  addBytes(jpegBytes);
  addStr('\nendstream\nendobj\n');

  // Obj 5: Page Content stream
  offsets[5] = curOffset;
  const contentStr = `q\n${ptW.toFixed(2)} 0 0 ${ptH.toFixed(2)} 0 0 cm\n/Im0 Do\nQ\n`;
  addStr(`5 0 obj\n<< /Length ${contentStr.length} >>\nstream\n${contentStr}endstream\nendobj\n`);

  // xref
  const xrefOffset = curOffset;
  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (let i = 1; i <= 5; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  let totalLen = 0;
  for (const c of chunks) {
    totalLen += typeof c === 'string' ? c.length : c.length;
  }
  const merged = new Uint8Array(totalLen);
  let pos = 0;
  for (const c of chunks) {
    if (typeof c === 'string') {
      for (let i = 0; i < c.length; i++) {
        merged[pos++] = c.charCodeAt(i);
      }
    } else {
      merged.set(c, pos);
      pos += c.length;
    }
  }

  return new Blob([merged.buffer as ArrayBuffer], { type: 'application/pdf' });
}

export default function PhotoSheetEngine() {
  // Step 1: Photos List (Multi-Subject Support)
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // Step 2: Photo Settings
  const [selectedSizeId, setSelectedSizeId] = useState<string>('35x45');
  const [bgColor, setBgColor] = useState<string>('original');
  const [customBgColor, setCustomBgColor] = useState<string>('#FFFFFF');
  const [enableBorder, setEnableBorder] = useState<boolean>(true);
  const [borderWidthMm, setBorderWidthMm] = useState<number>(0.5);
  const [borderColor, setBorderColor] = useState<string>('#000000');
  const [customBorderColor, setCustomBorderColor] = useState<string>('#000000');
  
  // Text On Photo
  const [enableText, setEnableText] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>('');
  const [dateOfPhoto, setDateOfPhoto] = useState<string>(new Date().toISOString().split('T')[0]);

  // Adjustments (Filters)
  const [showAdjustments, setShowAdjustments] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);

  // Step 3: Print Layout
  const [paperSizeId, setPaperSizeId] = useState<string>('4R');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape'); // Default landscape for 4R 8-photo yield
  const [isManualGrid, setIsManualGrid] = useState<boolean>(false);
  const [manualRows, setManualRows] = useState<number>(2);
  const [manualCols, setManualCols] = useState<number>(4);
  const [gapMm, setGapMm] = useState<number>(2.5);
  const [noMargins, setNoMargins] = useState<boolean>(true);
  const [marginMm, setMarginMm] = useState<number>(0);
  const [scissorMarks, setScissorMarks] = useState<'ticks' | 'dashed' | 'none'>('ticks');
  const [autoFillSheet, setAutoFillSheet] = useState<boolean>(true);

  // Step 4: Output & DPI
  const [dpi, setDpi] = useState<72 | 150 | 300 | 600>(300);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);

  // Active Size & Paper details
  const activeSize = PHOTO_SIZES.find((s) => s.id === selectedSizeId) || PHOTO_SIZES[0];
  const activePaper = PAPER_SIZES.find((p) => p.id === paperSizeId) || PAPER_SIZES[0];

  // Paper Dimensions in Millimeters based on Orientation
  const paperWMm = orientation === 'portrait' ? Math.min(activePaper.wMm, activePaper.hMm) : Math.max(activePaper.wMm, activePaper.hMm);
  const paperHMm = orientation === 'portrait' ? Math.max(activePaper.wMm, activePaper.hMm) : Math.min(activePaper.wMm, activePaper.hMm);

  // Calculate Auto-Fit Grid
  const effectiveMargin = noMargins ? 0 : marginMm;
  const availW = paperWMm - 2 * effectiveMargin;
  const availH = paperHMm - 2 * effectiveMargin;

  const autoCols = Math.max(1, Math.floor((availW + gapMm) / (activeSize.widthMm + gapMm)));
  const autoRows = Math.max(1, Math.floor((availH + gapMm) / (activeSize.heightMm + gapMm)));

  const totalGridRows = isManualGrid ? manualRows : autoRows;
  const totalGridCols = isManualGrid ? manualCols : autoCols;
  const totalSlots = totalGridRows * totalGridCols;

  // Active Selected Photo (for zoom/pan fine tuning)
  const currentSelectedPhoto = photos.find((p) => p.id === activePhotoId) || photos[0];

  // Total allocated copies
  const totalAllocatedCopies = photos.reduce((acc, p) => acc + p.copies, 0);

  // Add Photo handler
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid JPG, PNG, or WebP image file.');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    const preview = URL.createObjectURL(file);
    img.onload = () => {
      const remainingSlots = Math.max(1, totalSlots - totalAllocatedCopies);
      const newPhoto: PhotoItem = {
        id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        file,
        previewUrl: preview,
        imageObj: img,
        copies: photos.length === 0 ? totalSlots : remainingSlots,
        zoom: 1.0,
        panY: -5, // slight upper bias to center face
        panX: 0,
      };
      setPhotos((prev) => [...prev, newPhoto]);
      setActivePhotoId(newPhoto.id);
    };
    img.src = preview;
    e.target.value = '';
  };

  // Replace existing photo handler
  const handleTriggerReplace = (id: string) => {
    setReplaceTargetId(id);
    replaceFileInputRef.current?.click();
  };

  const handleExecuteReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !replaceTargetId) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid JPG, PNG, or WebP image file.');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    const preview = URL.createObjectURL(file);
    img.onload = () => {
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === replaceTargetId
            ? {
                ...p,
                file,
                previewUrl: preview,
                imageObj: img,
              }
            : p
        )
      );
      setReplaceTargetId(null);
    };
    img.src = preview;
    e.target.value = '';
  };

  const updateCopies = (id: string, delta: number) => {
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, copies: Math.max(1, p.copies + delta) };
        }
        return p;
      })
    );
  };

  const updatePhotoPosition = (id: string, field: 'zoom' | 'panY' | 'panX', value: number) => {
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (activePhotoId === id) {
      setActivePhotoId(null);
    }
  };

  // Auto distribute copies evenly
  const autoDistributeCopies = () => {
    if (photos.length === 0) return;
    const perPhoto = Math.floor(totalSlots / photos.length);
    const remainder = totalSlots % photos.length;
    setPhotos((prev) =>
      prev.map((p, idx) => ({
        ...p,
        copies: perPhoto + (idx < remainder ? 1 : 0),
      }))
    );
  };

  // Render a Single High-Resolution Photo Canvas
  const renderSinglePhotoCanvas = (
    photo: PhotoItem,
    targetPxW: number,
    targetPxH: number,
    targetDpi: number
  ): HTMLCanvasElement => {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = targetPxW;
    pCanvas.height = targetPxH;
    const pCtx = pCanvas.getContext('2d');
    if (!pCtx) return pCanvas;

    // 1. Fill Chosen Background
    const selectedBg = bgColor === 'original' ? '#FFFFFF' : bgColor === 'custom' ? customBgColor : bgColor;
    pCtx.fillStyle = selectedBg;
    pCtx.fillRect(0, 0, targetPxW, targetPxH);

    // 2. Filter adjustments
    pCtx.save();
    pCtx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%) saturate(${100 + saturation}%)`;

    const img = photo.imageObj;
    const imgAspect = img.width / img.height;
    const photoAspect = targetPxW / targetPxH;

    // Base scale to cover
    let drawW: number;
    let drawH: number;
    if (imgAspect > photoAspect) {
      drawH = targetPxH;
      drawW = targetPxH * imgAspect;
    } else {
      drawW = targetPxW;
      drawH = targetPxW / imgAspect;
    }

    // Apply User Zoom
    const currentZoom = photo.zoom || 1.0;
    drawW *= currentZoom;
    drawH *= currentZoom;

    // Center + User Pan Offsets
    const panXPixels = ((photo.panX || 0) / 100) * targetPxW;
    const panYPixels = ((photo.panY || 0) / 100) * targetPxH;

    const drawX = (targetPxW - drawW) / 2 + panXPixels;
    const drawY = (targetPxH - drawH) / 2 + panYPixels;

    pCtx.drawImage(img, drawX, drawY, drawW, drawH);
    pCtx.restore();

    // 3. Optional Background Tint Flood (If non-original and user requested)
    if (bgColor !== 'original') {
      try {
        const imgData = pCtx.getImageData(0, 0, targetPxW, targetPxH);
        const data = imgData.data;
        // Parse target color
        const tc = selectedBg.startsWith('#')
          ? {
              r: parseInt(selectedBg.slice(1, 3), 16),
              g: parseInt(selectedBg.slice(3, 5), 16),
              b: parseInt(selectedBg.slice(5, 7), 16),
            }
          : { r: 255, g: 255, b: 255 };

        // Corner sampling for background replacement
        const cornerR = data[0];
        const cornerG = data[1];
        const cornerB = data[2];
        const isNearCorner = (r: number, g: number, b: number) =>
          Math.abs(r - cornerR) < 32 && Math.abs(g - cornerG) < 32 && Math.abs(b - cornerB) < 32;

        for (let i = 0; i < data.length; i += 4) {
          // If pixel is transparent or close to the sampled corner background
          if (data[i + 3] < 20 || (isNearCorner(data[i], data[i + 1], data[i + 2]) && data[i + 3] > 0)) {
            data[i] = tc.r;
            data[i + 1] = tc.g;
            data[i + 2] = tc.b;
            data[i + 3] = 255;
          }
        }
        pCtx.putImageData(imgData, 0, 0);
      } catch {
        // Fallback silently if canvas is tainted
      }
    }

    // 4. Candidate Name & DOP Strip if enabled
    if (enableText && (candidateName || dateOfPhoto)) {
      const bannerH = Math.round(targetPxH * 0.18);
      const bannerY = targetPxH - bannerH;

      pCtx.fillStyle = '#FFFFFF';
      pCtx.fillRect(0, bannerY, targetPxW, bannerH);
      pCtx.strokeStyle = '#CBD5E1';
      pCtx.lineWidth = 1;
      pCtx.beginPath();
      pCtx.moveTo(0, bannerY);
      pCtx.lineTo(targetPxW, bannerY);
      pCtx.stroke();

      pCtx.fillStyle = '#0F172A';
      pCtx.textAlign = 'center';
      pCtx.textBaseline = 'middle';
      const fSize = Math.max(12, Math.round(bannerH * 0.36));
      pCtx.font = `bold ${fSize}px sans-serif`;

      if (candidateName && dateOfPhoto) {
        pCtx.fillText(candidateName.toUpperCase(), targetPxW / 2, bannerY + bannerH * 0.32);
        pCtx.font = `600 ${Math.round(fSize * 0.85)}px sans-serif`;
        pCtx.fillStyle = '#475569';
        pCtx.fillText(`DOP: ${dateOfPhoto}`, targetPxW / 2, bannerY + bannerH * 0.72);
      } else if (candidateName) {
        pCtx.fillText(candidateName.toUpperCase(), targetPxW / 2, bannerY + bannerH / 2);
      } else if (dateOfPhoto) {
        pCtx.fillText(`DOP: ${dateOfPhoto}`, targetPxW / 2, bannerY + bannerH / 2);
      }
    }

    // 5. Border
    if (enableBorder) {
      const bWidthPx = Math.max(1, Math.round((borderWidthMm / 25.4) * targetDpi));
      pCtx.strokeStyle = borderColor === 'custom' ? customBorderColor : borderColor;
      pCtx.lineWidth = bWidthPx;
      pCtx.strokeRect(bWidthPx / 2, bWidthPx / 2, targetPxW - bWidthPx, targetPxH - bWidthPx);
    }

    return pCanvas;
  };

  // Render Master Sheet Canvas
  const renderMasterSheet = useCallback(() => {
    if (photos.length === 0) {
      setRenderedImageUrl(null);
      return;
    }

    setIsGenerating(true);

    const sheetPxW = Math.round((paperWMm / 25.4) * dpi);
    const sheetPxH = Math.round((paperHMm / 25.4) * dpi);

    const canvas = document.createElement('canvas');
    canvas.width = sheetPxW;
    canvas.height = sheetPxH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Fill Pure White Printable Sheet
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetPxW, sheetPxH);

    // Photo Dimensions in Pixels
    const photoPxW = Math.round((activeSize.widthMm / 25.4) * dpi);
    const photoPxH = Math.round((activeSize.heightMm / 25.4) * dpi);
    const gapPx = Math.round((gapMm / 25.4) * dpi);
    const marginPx = Math.round((effectiveMargin / 25.4) * dpi);

    // Center the Grid on the Sheet
    const totalGridWidthPx = totalGridCols * photoPxW + (totalGridCols - 1) * gapPx;
    const totalGridHeightPx = totalGridRows * photoPxH + (totalGridRows - 1) * gapPx;

    const startXPx = Math.max(marginPx, Math.round((sheetPxW - totalGridWidthPx) / 2));
    const startYPx = Math.max(marginPx, Math.round((sheetPxH - totalGridHeightPx) / 2));

    // Build photo queue based on user copies
    const photoQueue: PhotoItem[] = [];
    photos.forEach((item) => {
      for (let i = 0; i < item.copies; i++) {
        photoQueue.push(item);
      }
    });

    let queueIdx = 0;

    for (let r = 0; r < totalGridRows; r++) {
      for (let c = 0; c < totalGridCols; c++) {
        const slotX = startXPx + c * (photoPxW + gapPx);
        const slotY = startYPx + r * (photoPxH + gapPx);

        const hasAssignedPhoto = queueIdx < photoQueue.length;
        const currentPhoto = hasAssignedPhoto
          ? photoQueue[queueIdx]
          : autoFillSheet && photoQueue.length > 0
          ? photoQueue[queueIdx % photoQueue.length]
          : null;

        if (currentPhoto) {
          const pCanvas = renderSinglePhotoCanvas(currentPhoto, photoPxW, photoPxH, dpi);
          ctx.drawImage(pCanvas, slotX, slotY);

          // Scissor Cut Guides
          if (scissorMarks === 'dashed') {
            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(slotX, slotY, photoPxW, photoPxH);
            ctx.setLineDash([]);
          } else if (scissorMarks === 'ticks') {
            // Professional Corner Crop Ticks (outside photo boundary)
            ctx.strokeStyle = '#94A3B8';
            ctx.lineWidth = 1;
            const tickLen = Math.round((3 / 25.4) * dpi);

            // Top-Left
            ctx.beginPath();
            ctx.moveTo(slotX - tickLen, slotY);
            ctx.lineTo(slotX, slotY);
            ctx.moveTo(slotX, slotY - tickLen);
            ctx.lineTo(slotX, slotY);
            // Top-Right
            ctx.moveTo(slotX + photoPxW + tickLen, slotY);
            ctx.lineTo(slotX + photoPxW, slotY);
            ctx.moveTo(slotX + photoPxW, slotY - tickLen);
            ctx.lineTo(slotX + photoPxW, slotY);
            // Bottom-Left
            ctx.moveTo(slotX - tickLen, slotY + photoPxH);
            ctx.lineTo(slotX, slotY + photoPxH);
            ctx.moveTo(slotX, slotY + photoPxH + tickLen);
            ctx.lineTo(slotX, slotY + photoPxH);
            // Bottom-Right
            ctx.moveTo(slotX + photoPxW + tickLen, slotY + photoPxH);
            ctx.lineTo(slotX + photoPxW, slotY + photoPxH);
            ctx.moveTo(slotX + photoPxW, slotY + photoPxH + tickLen);
            ctx.lineTo(slotX + photoPxW, slotY + photoPxH);
            ctx.stroke();
          }
        } else {
          // Empty slot placeholder
          ctx.strokeStyle = '#E2E8F0';
          ctx.lineWidth = 1;
          ctx.setLineDash([6, 6]);
          ctx.strokeRect(slotX, slotY, photoPxW, photoPxH);
          ctx.setLineDash([]);

          ctx.fillStyle = '#CBD5E1';
          ctx.font = `${Math.max(10, Math.round(photoPxH * 0.08))}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('Empty Slot', slotX + photoPxW / 2, slotY + photoPxH / 2);
        }

        queueIdx++;
      }
    }

    // Discreet lab certification footer mark
    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(
      `Kagazo Studio • ${activePaper.id} (${paperWMm}×${paperHMm}mm) • ${dpi} DPI • 100% Actual Size Print`,
      sheetPxW - 20,
      sheetPxH - 12
    );

    const dataUrl = canvas.toDataURL('image/jpeg', 0.96);
    setRenderedImageUrl(dataUrl);
    setIsGenerating(false);
  }, [
    photos,
    paperWMm,
    paperHMm,
    activePaper,
    dpi,
    activeSize,
    gapMm,
    effectiveMargin,
    totalGridRows,
    totalGridCols,
    bgColor,
    customBgColor,
    enableBorder,
    borderWidthMm,
    borderColor,
    customBorderColor,
    enableText,
    candidateName,
    dateOfPhoto,
    brightness,
    contrast,
    saturation,
    scissorMarks,
    autoFillSheet,
  ]);

  useEffect(() => {
    renderMasterSheet();
  }, [renderMasterSheet]);

  // Download Exact 300 DPI Single Passport Photo
  const handleDownloadSingle = (photo: PhotoItem, format: 'jpeg' | 'png') => {
    const singlePxW = Math.round((activeSize.widthMm / 25.4) * dpi);
    const singlePxH = Math.round((activeSize.heightMm / 25.4) * dpi);
    const singleCanvas = renderSinglePhotoCanvas(photo, singlePxW, singlePxH, dpi);

    const mime = format === 'png' ? 'image/png' : 'image/jpeg';
    const singleUrl = singleCanvas.toDataURL(mime, 0.98);

    const link = document.createElement('a');
    link.href = singleUrl;
    link.download = `passport_photo_${activeSize.id}_${dpi}dpi.${format === 'png' ? 'png' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Full Sheet Image
  const handleDownloadSheet = (format: 'jpeg' | 'png') => {
    if (!renderedImageUrl) return;
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    link.download = `passport_sheet_${activePaper.id}_${dpi}dpi.${format === 'png' ? 'png' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Real Vector-Exact PDF
  const handleDownloadPdf = () => {
    if (!renderedImageUrl) return;
    const sheetPxW = Math.round((paperWMm / 25.4) * dpi);
    const sheetPxH = Math.round((paperHMm / 25.4) * dpi);

    const pdfBlob = createPdfFromJpeg(renderedImageUrl, paperWMm, paperHMm, sheetPxW, sheetPxH);
    const blobUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `passport_sheet_${activePaper.id}_300dpi.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  };

  // Direct Hardware Print with Exact 100% Size Locked
  const handlePrint = () => {
    if (!renderedImageUrl) return;
    const is4x6 = paperSizeId === '4R';
    printIsolatedDocument({
      title: 'Passport Photo Sheet - Kagazo Studio',
      bodyHtml: `<div style="width: ${paperWMm}mm; height: ${paperHMm}mm; margin: 0 auto; padding: 0; display: flex; align-items: center; justify-content: center; background: #ffffff;">
        <img src="${renderedImageUrl}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="Passport Photo Sheet Print" />
      </div>`,
      pageSize: is4x6 ? '4x6' : 'A4',
      orientation: orientation,
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Sovereign Studio Shell Container */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top Dark Header Bar */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Passport Photo Sheet Studio
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500 text-white uppercase tracking-wide">
                  300 DPI LAB PRINT READY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                4×6&quot; (8 photos for ₹5 lab print) &amp; A4 sheets (32 photos) with scissor ticks &amp; DOP text stamp.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              disabled={!renderedImageUrl || photos.length === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>1-Click Print</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={!renderedImageUrl || photos.length === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace Grid */}
        <div className="p-5 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ------------------------------------------------------------- */}
          {/* LEFT COLUMN: 4-Step Numbered Control Panel (7 cols)            */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAddPhoto}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
            <input
              type="file"
              ref={replaceFileInputRef}
              onChange={handleExecuteReplace}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />

            {/* ========================================================= */}
            {/* STEP 1: PHOTOS & SUBJECTS                                 */}
            {/* ========================================================= */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    PHOTOS &amp; SUBJECTS
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs border border-purple-200"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Add Photo</span>
                </button>
              </div>

          {/* Allocation Progress Bar */}
          {photos.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Sheet Slot Allocation</span>
                <span
                  className={`font-black font-mono ${
                    totalAllocatedCopies === totalSlots
                      ? 'text-emerald-700'
                      : totalAllocatedCopies > totalSlots
                      ? 'text-rose-600'
                      : 'text-amber-700'
                  }`}
                >
                  {totalAllocatedCopies} / {totalSlots} Slots Filled
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    totalAllocatedCopies === totalSlots
                      ? 'bg-emerald-500'
                      : totalAllocatedCopies > totalSlots
                      ? 'bg-rose-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (totalAllocatedCopies / totalSlots) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={autoDistributeCopies}
                  className="text-[11px] font-bold text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span>⚡ Auto-Distribute Evenly</span>
                </button>
                <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoFillSheet}
                    onChange={(e) => setAutoFillSheet(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-purple-600 accent-purple-600 cursor-pointer"
                  />
                  <span>Repeat to fill empty slots</span>
                </label>
              </div>
            </div>
          )}

          {/* Photo List */}
          <div className="space-y-3">
            {photos.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer bg-emerald-50/30 hover:bg-emerald-50/60 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-extrabold text-slate-800">Click to Upload Passport Photo</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Supports JPG, PNG, WebP • Print multiple family members on 1 sheet
                </p>
              </div>
            ) : (
              photos.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActivePhotoId(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activePhotoId === item.id
                      ? 'border-purple-500 bg-purple-50/40 ring-2 ring-purple-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.previewUrl}
                        alt={`Photo ${idx + 1}`}
                        className="w-12 h-14 object-cover rounded-xl border border-slate-300 shadow-2xs bg-white"
                      />
                      <div>
                        <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                          <span>Photo {idx + 1}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded-sm">
                            Subject {idx + 1}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 max-w-[140px] truncate">
                          {item.file.name}
                        </div>
                      </div>
                    </div>

                    {/* Copy Counter & Actions */}
                    <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateCopies(item.id, -1)}
                          className="px-2.5 py-1.5 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-1 font-mono font-bold text-xs text-slate-800 min-w-[28px] text-center">
                          {item.copies}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCopies(item.id, 1)}
                          className="px-2.5 py-1.5 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTriggerReplace(item.id)}
                        className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-2xs cursor-pointer transition-colors"
                        title="Replace this photo"
                      >
                        <RefreshCw className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        <span>Replace</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => removePhoto(item.id)}
                        className="px-2 py-1.5 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Remove Photo"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Per-Photo Position & Crop Sliders */}
                  <div
                    className="mt-3 pt-3 border-t border-slate-100/80 grid grid-cols-2 gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span className="flex items-center gap-1">
                          <ZoomIn className="w-3 h-3 text-purple-600" />
                          <span>Zoom</span>
                        </span>
                        <span className="font-mono text-purple-700">{item.zoom.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.8"
                        max="2.5"
                        step="0.05"
                        value={item.zoom}
                        onChange={(e) => updatePhotoPosition(item.id, 'zoom', parseFloat(e.target.value))}
                        className="w-full accent-purple-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span className="flex items-center gap-1">
                          <Move className="w-3 h-3 text-purple-600" />
                          <span>Vertical Pan</span>
                        </span>
                        <span className="font-mono text-purple-700">{item.panY > 0 ? `+${item.panY}%` : `${item.panY}%`}</span>
                      </div>
                      <input
                        type="range"
                        min="-40"
                        max="40"
                        step="1"
                        value={item.panY}
                        onChange={(e) => updatePhotoPosition(item.id, 'panY', parseInt(e.target.value))}
                        className="w-full accent-purple-600"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}

            {photos.length > 0 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-purple-500 rounded-2xl text-xs font-bold text-slate-600 hover:text-purple-700 bg-slate-50/50 hover:bg-purple-50/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Another Person / Photo (Tile multiple subjects on 1 sheet)</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* STEP 2: PHOTO SETTINGS                                    */}
        {/* ========================================================= */}
        <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
              2
            </span>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
              PHOTO SETTINGS &amp; DIMENSIONS
            </h3>
          </div>

          {/* Photo Size Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Photo Size Standard</label>
            <select
              value={selectedSizeId}
              onChange={(e) => setSelectedSizeId(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
            >
              {PHOTO_SIZES.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          {/* Background Color Swatches */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Background Color</label>
              <span className="text-[11px] text-slate-500 font-semibold">
                {bgColor === 'original' ? 'Original Photo' : 'Smart Studio Wash'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {BG_SWATCHES.map((swatch) => (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={() => setBgColor(swatch.id)}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer relative ${
                    bgColor === swatch.id ? 'ring-2 ring-purple-600 ring-offset-2 scale-110 shadow-xs' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: swatch.color === 'transparent' ? '#F8FAFC' : swatch.color,
                    borderColor: swatch.border,
                  }}
                  title={swatch.label}
                >
                  {bgColor === swatch.id && <Check className="w-4 h-4 text-slate-800 drop-shadow-xs" />}
                </button>
              ))}

              <label className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50">
                <input
                  type="color"
                  value={customBgColor}
                  onChange={(e) => {
                    setCustomBgColor(e.target.value);
                    setBgColor('custom');
                  }}
                  className="w-4 h-4 rounded border-0 cursor-pointer"
                />
                <span>Custom</span>
              </label>
            </div>
          </div>

          {/* Photo Border Controls */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Photo Border</label>
              <input
                type="checkbox"
                checked={enableBorder}
                onChange={(e) => setEnableBorder(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 accent-purple-600 cursor-pointer"
              />
            </div>

            {enableBorder && (
              <div className="space-y-3 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600 font-semibold">
                    <span>Width — {borderWidthMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.0"
                    step="0.1"
                    value={borderWidthMm}
                    onChange={(e) => setBorderWidthMm(parseFloat(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600">Border Color</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {BORDER_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.id}
                        type="button"
                        onClick={() => setBorderColor(swatch.id)}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          borderColor === swatch.id ? 'ring-2 ring-purple-600 ring-offset-2 scale-110' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: swatch.color }}
                        title={swatch.label}
                      >
                        {borderColor === swatch.id && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                    <label className="px-2 py-1 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50">
                      <input
                        type="color"
                        value={customBorderColor}
                        onChange={(e) => {
                          setCustomBorderColor(e.target.value);
                          setBorderColor('custom');
                        }}
                        className="w-4 h-4 rounded border-0 cursor-pointer"
                      />
                      <span>Custom</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Text on Photo (Name & Date of Photo) */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-purple-600" />
                <span>Text on Photo (Name &amp; DOP Banner)</span>
              </label>
              <input
                type="checkbox"
                checked={enableText}
                onChange={(e) => setEnableText(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 accent-purple-600 cursor-pointer"
              />
            </div>

            {enableText && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="block text-[11px] font-bold text-slate-600 mb-1">Candidate Name</span>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value.toUpperCase())}
                    placeholder="e.g. Full Name as per ID"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-600 mb-1">Date of Photo (DOP)</span>
                  <input
                    type="date"
                    value={dateOfPhoto}
                    onChange={(e) => setDateOfPhoto(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Adjustments (Expandable) */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAdjustments(!showAdjustments)}
              className="text-xs font-bold text-slate-700 hover:text-purple-700 flex items-center justify-between w-full cursor-pointer py-1"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-600" />
                <span>Adjustments (Brightness &amp; Contrast)</span>
              </span>
              <span className="text-[11px] font-mono">{showAdjustments ? '▲ Hide' : '▼ Expand'}</span>
            </button>

            {showAdjustments && (
              <div className="grid grid-cols-3 gap-3 pt-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600">Brightness ({brightness})</span>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600">Contrast ({contrast})</span>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600">Saturation ({saturation})</span>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={saturation}
                    onChange={(e) => setSaturation(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* STEP 3: PRINT LAYOUT & PAPER                              */}
        {/* ========================================================= */}
        <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
              3
            </span>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
              PRINT LAYOUT &amp; PAPER YIELD
            </h3>
          </div>

          {/* Paper Size Cards */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Select Paper Size</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PAPER_SIZES.map((pSize) => (
                <button
                  key={pSize.id}
                  type="button"
                  onClick={() => {
                    setPaperSizeId(pSize.id);
                    if (pSize.id === '4R') setOrientation('landscape'); // Maximize 8 photos
                    if (pSize.id === 'A4') setOrientation('portrait');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    paperSizeId === pSize.id
                      ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-600/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-black text-slate-800">{pSize.label}</div>
                  <div className="text-[10px] text-purple-700 font-bold mt-0.5">{pSize.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Orientation Cards */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Orientation</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrientation('portrait')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                  orientation === 'portrait'
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-600/20 text-purple-950 font-black'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold'
                }`}
              >
                <div className="w-5 h-7 border-2 border-current rounded-sm bg-current/10" />
                <span className="text-xs">Portrait (Vertical)</span>
              </button>

              <button
                type="button"
                onClick={() => setOrientation('landscape')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                  orientation === 'landscape'
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-600/20 text-purple-950 font-black'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold'
                }`}
              >
                <div className="w-7 h-5 border-2 border-current rounded-sm bg-current/10" />
                <span className="text-xs">Landscape (Horizontal ★)</span>
              </button>
            </div>
          </div>

          {/* Grid Layout Stats */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Total Printable Photos</label>
              <button
                type="button"
                onClick={() => setIsManualGrid(!isManualGrid)}
                className="text-[11px] font-bold text-purple-700 hover:underline cursor-pointer"
              >
                {isManualGrid ? 'Switch to Auto Fit' : 'Manual Rows × Cols'}
              </button>
            </div>

            {isManualGrid ? (
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500">Rows × Columns (manual)</span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={manualRows}
                    onChange={(e) => setManualRows(parseInt(e.target.value) || 1)}
                    className="w-20 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                  />
                  <span className="text-slate-400 font-bold">×</span>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={manualCols}
                    onChange={(e) => setManualCols(parseInt(e.target.value) || 1)}
                    className="w-20 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-sm font-black text-slate-800">{totalSlots} Photos on Sheet</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Layout: {totalGridRows} rows × {totalGridCols} cols • {paperWMm}×{paperHMm} mm
                  </p>
                </div>
                <div className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-lg">
                  Maximum Yield Locked
                </div>
              </div>
            )}
          </div>

          {/* Gap & Scissor Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-700 font-bold">
                <span>Gap Between Photos</span>
                <span className="font-mono text-purple-700">{gapMm} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.5"
                value={gapMm}
                onChange={(e) => setGapMm(parseFloat(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-bold block">Scissor Guidelines</label>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'ticks', label: 'Corner Ticks ★' },
                  { id: 'dashed', label: 'Dotted' },
                  { id: 'none', label: 'None' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setScissorMarks(opt.id as any)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      scissorMarks === opt.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STEP 4: GENERATE & DOWNLOAD                               */}
        {/* ========================================================= */}
        <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
              4
            </span>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
              GENERATE &amp; DOWNLOAD
            </h3>
          </div>

          {/* Output DPI Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Print Quality (DPI Resolution)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { dpiVal: 72, label: '72 DPI', sub: 'Screen' },
                { dpiVal: 150, label: '150 DPI', sub: 'Draft' },
                { dpiVal: 300, label: '300 DPI', sub: 'Lab Print ★' },
                { dpiVal: 600, label: '600 DPI', sub: 'Ultra High' },
              ].map((opt) => (
                <button
                  key={opt.dpiVal}
                  type="button"
                  onClick={() => setDpi(opt.dpiVal as any)}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    dpi === opt.dpiVal
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-slate-900/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-black">{opt.label}</div>
                  <div className="text-[10px] opacity-75">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={renderMasterSheet}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white font-black text-sm rounded-2xl transition-all shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>⚡ Refresh Print Sheet Canvas</span>
          </button>

          {/* Master Downloads */}
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                📄 FULL SHEET DOWNLOADS (300 DPI)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="py-3 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>↓ PDF Sheet</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadSheet('jpeg')}
                  className="py-3 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>↓ JPEG (Photo Lab)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadSheet('png')}
                  className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>↓ PNG (Lossless)</span>
                </button>
              </div>
            </div>

            {/* Individual Cropped Photo Downloads for Every Subject */}
            {photos.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                  📷 SINGLE CROPPED PASSPORT PHOTO ({activeSize.widthMm}×{activeSize.heightMm} MM)
                </span>
                <div className="space-y-2">
                  {photos.map((photo, idx) => (
                    <div
                      key={photo.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <img
                          src={photo.previewUrl}
                          alt="Thumb"
                          className="w-8 h-9 object-cover rounded border bg-white"
                        />
                        <span>Subject {idx + 1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDownloadSingle(photo, 'jpeg')}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                        >
                          ↓ JPG
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadSingle(photo, 'png')}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                        >
                          ↓ PNG
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Hardware Printer Trigger */}
            <button
              type="button"
              onClick={handlePrint}
              disabled={photos.length === 0}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>🖨️ Direct Hardware Print (Auto-Print at 100% Actual Size)</span>
            </button>
          </div>
        </div>

        {/* Official Agency Partner */}
        <AdSlot slot="post_download" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT COLUMN: Sticky Live Print Preview (5 cols)              */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
        <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Live Sheet Preview
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {photos.length === 0 ? 'No photo' : `${totalAllocatedCopies} / ${totalSlots} copies`}
              </span>
              <button
                type="button"
                onClick={handlePrint}
                disabled={photos.length === 0}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Printer className="w-3 h-3" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Preview Container */}
          <div className="relative bg-slate-200/50 dark:bg-slate-950/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-3 sm:p-4 flex items-center justify-center min-h-[300px] max-h-[460px] overflow-hidden">
            {renderedImageUrl ? (
              <div className="relative shadow-xl rounded-sm border border-slate-300 dark:border-slate-700 bg-white max-w-full max-h-[420px] overflow-hidden">
                <img
                  src={renderedImageUrl}
                  alt="Live Print Sheet Preview"
                  className="max-h-[420px] w-auto object-contain block select-none"
                />
              </div>
            ) : (
              <div className="text-center space-y-3 p-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-200/80 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Upload a photo to preview sheet.</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Preview updates live as you adjust zoom &amp; layout.</p>
                </div>
              </div>
            )}
          </div>

          {/* Specifications Card */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Paper Dimensions</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {paperWMm} × {paperHMm} mm ({activePaper.label})
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Single Photo Size</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {activeSize.widthMm} × {activeSize.heightMm} mm ({selectedSizeId})
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Resolution &amp; Yield</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {dpi} DPI • {totalSlots} Photos Yield
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Estimated Print Cost</span>
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                ₹5 to ₹10 at local photo lab (₹0.80/photo)
              </span>
            </div>
          </div>

          {/* Hardware Printer Safety Notice */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2 font-medium">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Important Printer Instruction:</span>
              <p className="mt-0.5 leading-tight text-amber-800 dark:text-amber-300">
                In print dialog, set scaling to <strong>Actual Size (100%)</strong>. Do not use &quot;Fit to Printable Area&quot;, which shrinks photos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
