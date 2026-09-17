'use client';

import * as React from 'react';
import {
  Crop,
  Maximize2,
  Check,
  X,
  RotateCw,
  Sliders,
  Sparkles,
  Loader2,
  Move,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type AspectRatioMode = 'free' | '16:9' | '4:3' | '1:1' | 'full';

interface FeaturedImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onApplyCrop: (blob: Blob, meta: { width: number; height: number; sizeKb: number }) => Promise<void>;
}

export function FeaturedImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onApplyCrop,
}: FeaturedImageCropModalProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const [aspectMode, setAspectMode] = React.useState<AspectRatioMode>('free');
  const [rotationDeg, setRotationDeg] = React.useState<number>(0);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);

  // Rendered image display box inside the container
  const [imgDisplaySize, setImgDisplaySize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Crop rectangle in pixels relative to rendered image
  const [crop, setCrop] = React.useState<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Drag state
  const dragState = React.useRef<{
    isDragging: boolean;
    handle: string | null; // 'box_move' | 'nw' | 'ne' | 'se' | 'sw' | 'n' | 's' | 'w' | 'e'
    startX: number;
    startY: number;
    initialCrop: { x: number; y: number; width: number; height: number };
  }>({
    isDragging: false,
    handle: null,
    startX: 0,
    startY: 0,
    initialCrop: { x: 0, y: 0, width: 0, height: 0 },
  });

  // Calculate displayed image size & initialize default crop
  const updateLayout = React.useCallback(() => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);

    if (w > 0 && h > 0) {
      setImgDisplaySize({ width: w, height: h });
      setCrop((prev) => {
        // If crop hasn't been set yet or out of bounds, set default 16:9 or 85% centered box
        if (prev.width === 0 || prev.height === 0 || prev.width > w || prev.height > h) {
          const defaultW = Math.round(w * 0.88);
          let defaultH = Math.round(defaultW / (16 / 9));
          if (defaultH > h * 0.9) {
            defaultH = Math.round(h * 0.88);
          }
          const defaultX = Math.round((w - defaultW) / 2);
          const defaultY = Math.round((h - defaultH) / 2);
          return { x: Math.max(0, defaultX), y: Math.max(0, defaultY), width: defaultW, height: defaultH };
        }
        return prev;
      });
      setImageLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      setImageLoaded(false);
      setRotationDeg(0);
      setAspectMode('free');
      return;
    }

    const timer = setTimeout(() => {
      updateLayout();
    }, 80);

    window.addEventListener('resize', updateLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateLayout);
    };
  }, [isOpen, imageSrc, rotationDeg, updateLayout]);

  // Apply preset ratio
  const handleSelectPreset = (mode: AspectRatioMode) => {
    setAspectMode(mode);
    if (!imgDisplaySize.width || !imgDisplaySize.height) return;

    const w = imgDisplaySize.width;
    const h = imgDisplaySize.height;

    if (mode === 'full') {
      setCrop({ x: 0, y: 0, width: w, height: h });
      return;
    }

    let ratio: number | null = null;
    if (mode === '16:9') ratio = 16 / 9;
    if (mode === '4:3') ratio = 4 / 3;
    if (mode === '1:1') ratio = 1 / 1;

    if (ratio) {
      let targetW = Math.round(w * 0.9);
      let targetH = Math.round(targetW / ratio);
      if (targetH > h * 0.9) {
        targetH = Math.round(h * 0.9);
        targetW = Math.round(targetH * ratio);
      }
      const x = Math.max(0, Math.round((w - targetW) / 2));
      const y = Math.max(0, Math.round((h - targetH) / 2));
      setCrop({ x, y, width: targetW, height: targetH });
    }
  };

  // Drag interaction handlers
  const handlePointerDown = (handle: string, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    dragState.current = {
      isDragging: true,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialCrop: { ...crop },
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging || !dragState.current.handle) return;
    e.preventDefault();

    const { handle, startX, startY, initialCrop } = dragState.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    const maxW = imgDisplaySize.width;
    const maxH = imgDisplaySize.height;
    if (maxW === 0 || maxH === 0) return;

    let { x, y, width, height } = initialCrop;

    if (handle === 'box_move') {
      x = Math.max(0, Math.min(maxW - width, initialCrop.x + deltaX));
      y = Math.max(0, Math.min(maxH - height, initialCrop.y + deltaY));
      setCrop({ x, y, width, height });
      return;
    }

    // Ratio locking
    let targetRatio: number | null = null;
    if (aspectMode === '16:9') targetRatio = 16 / 9;
    if (aspectMode === '4:3') targetRatio = 4 / 3;
    if (aspectMode === '1:1') targetRatio = 1 / 1;

    // Corner / Edge Resizing
    if (handle.includes('e')) {
      width = Math.max(40, Math.min(maxW - x, initialCrop.width + deltaX));
      if (targetRatio) {
        height = Math.round(width / targetRatio);
        if (y + height > maxH) {
          height = maxH - y;
          width = Math.round(height * targetRatio);
        }
      }
    }
    if (handle.includes('s')) {
      height = Math.max(40, Math.min(maxH - y, initialCrop.height + deltaY));
      if (targetRatio) {
        width = Math.round(height * targetRatio);
        if (x + width > maxW) {
          width = maxW - x;
          height = Math.round(width / targetRatio);
        }
      }
    }
    if (handle.includes('w')) {
      const potentialW = Math.max(40, initialCrop.width - deltaX);
      if (initialCrop.x + deltaX >= 0 && potentialW <= maxW) {
        width = potentialW;
        x = initialCrop.x + (initialCrop.width - width);
        if (targetRatio) {
          height = Math.round(width / targetRatio);
          if (y + height > maxH) {
            height = maxH - y;
            width = Math.round(height * targetRatio);
            x = initialCrop.x + (initialCrop.width - width);
          }
        }
      }
    }
    if (handle.includes('n')) {
      const potentialH = Math.max(40, initialCrop.height - deltaY);
      if (initialCrop.y + deltaY >= 0 && potentialH <= maxH) {
        height = potentialH;
        y = initialCrop.y + (initialCrop.height - height);
        if (targetRatio) {
          width = Math.round(height * targetRatio);
          if (x + width > maxW) {
            width = maxW - x;
            height = Math.round(width / targetRatio);
            y = initialCrop.y + (initialCrop.height - height);
          }
        }
      }
    }

    setCrop({
      x: Math.max(0, Math.min(maxW - width, x)),
      y: Math.max(0, Math.min(maxH - height, y)),
      width: Math.max(40, Math.min(maxW, width)),
      height: Math.max(40, Math.min(maxH, height)),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragState.current.isDragging) {
      dragState.current.isDragging = false;
      dragState.current.handle = null;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Rotate image clockwise by 90 degrees
  const handleRotate = () => {
    setRotationDeg((prev) => (prev + 90) % 360);
    // Reset crop to recalculate on new dimensions
    setCrop({ x: 0, y: 0, width: 0, height: 0 });
  };

  // Perform canvas crop and trigger onApplyCrop
  const handleApply = async () => {
    if (!imgRef.current || imgDisplaySize.width === 0 || imgDisplaySize.height === 0) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image for cropping.'));
        img.src = imageSrc;
      });

      // 1. Handle source rotation if any
      const srcCanvas = document.createElement('canvas');
      const srcCtx = srcCanvas.getContext('2d');
      if (!srcCtx) throw new Error('Canvas not supported');

      const isRotated90or270 = rotationDeg === 90 || rotationDeg === 270;
      srcCanvas.width = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
      srcCanvas.height = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

      srcCtx.translate(srcCanvas.width / 2, srcCanvas.height / 2);
      srcCtx.rotate((rotationDeg * Math.PI) / 180);
      srcCtx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

      // 2. Scale factors from display coordinates to actual pixel dimensions
      const scaleX = srcCanvas.width / imgDisplaySize.width;
      const scaleY = srcCanvas.height / imgDisplaySize.height;

      const cropX = Math.max(0, Math.round(crop.x * scaleX));
      const cropY = Math.max(0, Math.round(crop.y * scaleY));
      const cropW = Math.max(10, Math.min(srcCanvas.width - cropX, Math.round(crop.width * scaleX)));
      const cropH = Math.max(10, Math.min(srcCanvas.height - cropY, Math.round(crop.height * scaleY)));

      // 3. Output canvas with max width 1200px for blog cards
      const maxOutW = 1200;
      let outW = cropW;
      let outH = cropH;
      if (outW > maxOutW) {
        const factor = maxOutW / outW;
        outW = maxOutW;
        outH = Math.round(cropH * factor);
      }

      const outCanvas = document.createElement('canvas');
      outCanvas.width = outW;
      outCanvas.height = outH;
      const outCtx = outCanvas.getContext('2d');
      if (!outCtx) throw new Error('Failed to create canvas context.');

      outCtx.imageSmoothingEnabled = true;
      outCtx.imageSmoothingQuality = 'high';

      // Clean dark editorial fill
      outCtx.fillStyle = '#0F172A';
      outCtx.fillRect(0, 0, outW, outH);

      outCtx.drawImage(
        srcCanvas,
        cropX,
        cropY,
        cropW,
        cropH,
        0,
        0,
        outW,
        outH
      );

      // Export as WebP
      const blob = await new Promise<Blob>((resolve, reject) => {
        outCanvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Failed to export cropped image.'))),
          'image/webp',
          0.86
        );
      });

      const sizeKb = Math.round(blob.size / 1024);
      await onApplyCrop(blob, { width: outW, height: outH, sizeKb });
      onClose();
    } catch (err: any) {
      console.error('Cropping error:', err);
      alert(err.message || 'Failed to crop image.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  // Compute live aspect ratio label
  const currentRatio = crop.height > 0 ? (crop.width / crop.height).toFixed(2) : '1.77';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col text-white my-auto max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/20 text-primary border border-primary/30">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2 text-white">
                <span>Interactive Image Cropper &amp; Card Fit</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Drag handles to crop free size, or select 16:9 to fit blog cards perfectly.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Aspect Presets & Transforms */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-slate-950/40 border-b border-slate-800 text-xs">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Crop Ratio:</span>
            <button
              type="button"
              onClick={() => handleSelectPreset('free')}
              className={cn(
                'px-3 py-1 rounded-xl font-bold transition-all cursor-pointer',
                aspectMode === 'free'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              )}
            >
              ✨ Free Size
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('16:9')}
              className={cn(
                'px-3 py-1 rounded-xl font-bold transition-all cursor-pointer',
                aspectMode === '16:9'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              )}
            >
              16:9 (Blog Card Fit)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('4:3')}
              className={cn(
                'px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer',
                aspectMode === '4:3'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              )}
            >
              4:3
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('1:1')}
              className={cn(
                'px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer',
                aspectMode === '1:1'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              )}
            >
              1:1 Square
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('full')}
              className={cn(
                'px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer',
                aspectMode === 'full'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              )}
            >
              Full Image
            </button>
          </div>

          {/* Quick Rotate */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRotate}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white font-bold transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-primary" />
              <span>Rotate 90°</span>
            </button>
          </div>
        </div>

        {/* Viewport Canvas Area */}
        <div
          ref={containerRef}
          className="relative flex-1 min-h-[340px] max-h-[58vh] bg-slate-950 p-4 flex items-center justify-center select-none overflow-hidden touch-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Subtle Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Image & Interactive Crop Wrapper */}
          <div
            className="relative inline-block"
            style={{
              transform: `rotate(${rotationDeg}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop source"
              onLoad={updateLayout}
              className="max-h-[50vh] max-w-full object-contain block rounded-lg shadow-2xl pointer-events-none"
            />

            {/* Interactive Crop Box (Positioned exactly over rendered image) */}
            {imageLoaded && imgDisplaySize.width > 0 && crop.width > 0 && (
              <div
                style={{
                  left: `${crop.x}px`,
                  top: `${crop.y}px`,
                  width: `${crop.width}px`,
                  height: `${crop.height}px`,
                }}
                className="absolute border-2 border-primary shadow-[0_0_0_9999px_rgba(15,23,42,0.72)] rounded-lg cursor-move flex items-center justify-center pointer-events-auto touch-none"
                onPointerDown={(e) => handlePointerDown('box_move', e)}
              >
                {/* 3x3 Rule of Thirds Grid Overlay */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-30">
                  <div className="border-r border-b border-white/80" />
                  <div className="border-r border-b border-white/80" />
                  <div className="border-b border-white/80" />
                  <div className="border-r border-b border-white/80" />
                  <div className="border-r border-b border-white/80" />
                  <div className="border-b border-white/80" />
                  <div className="border-r border-white/80" />
                  <div className="border-r border-white/80" />
                  <div />
                </div>

                {/* Center Move Icon Indicator */}
                <div className="pointer-events-none opacity-40 group-hover:opacity-70 text-white flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  <Move className="w-3 h-3" />
                  <span>Drag Box</span>
                </div>

                {/* 4 Corner Handles */}
                <div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md cursor-nwse-resize"
                  onPointerDown={(e) => handlePointerDown('nw', e)}
                />
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md cursor-nesw-resize"
                  onPointerDown={(e) => handlePointerDown('ne', e)}
                />
                <div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md cursor-nesw-resize"
                  onPointerDown={(e) => handlePointerDown('sw', e)}
                />
                <div
                  className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md cursor-nwse-resize"
                  onPointerDown={(e) => handlePointerDown('se', e)}
                />

                {/* 4 Edge Handles */}
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-white rounded-full shadow cursor-ns-resize"
                  onPointerDown={(e) => handlePointerDown('n', e)}
                />
                <div
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-white rounded-full shadow cursor-ns-resize"
                  onPointerDown={(e) => handlePointerDown('s', e)}
                />
                <div
                  className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-6 bg-white rounded-full shadow cursor-ew-resize"
                  onPointerDown={(e) => handlePointerDown('w', e)}
                />
                <div
                  className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-6 bg-white rounded-full shadow cursor-ew-resize"
                  onPointerDown={(e) => handlePointerDown('e', e)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 bg-slate-950/80 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="font-mono text-[11px] bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-slate-200">
              Ratio: <strong className="text-primary">{aspectMode === 'free' ? `Free (${currentRatio}:1)` : aspectMode}</strong>
            </span>
            <span className="text-slate-400 text-[11px]">
              {aspectMode === '16:9'
                ? '✨ Fitted for 16:9 Blog Cards (1200×675 px)'
                : 'Free custom crop. Outputs sharp WebP.'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              type="button"
              disabled={isProcessing}
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleApply}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cropping &amp; Optimizing...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Apply Crop &amp; Upload</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
