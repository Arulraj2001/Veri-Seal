'use client';

import * as React from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Sun,
  Contrast,
  Sliders,
  Crop,
  Sparkles,
  RefreshCw,
  Eye,
  Check,
  Maximize2,
  Compass,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CropState {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StudioEdits {
  rotationDeg: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  grayscale: boolean;
}

export type AspectRatioPreset = 'free' | 'original' | '1:1' | '3.5:4.5' | '4:3' | '16:9' | '7:2';

export interface ImageStudioViewportProps {
  imageSrc: string;
  defaultAspectRatio?: AspectRatioPreset;
  overlayType?: 'passport' | 'signature' | 'grid' | 'none';
  onCropChange?: (crop: CropState, totalRotation: number, edits: StudioEdits) => void;
  className?: string;
}

export function ImageStudioViewport({
  imageSrc,
  defaultAspectRatio = 'free',
  overlayType = 'passport',
  onCropChange,
  className,
}: ImageStudioViewportProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  // Active Tool Tab
  const [activeTab, setActiveTab] = React.useState<'crop' | 'transform' | 'adjust'>('crop');

  // Aspect Ratio & Crop
  const [aspectPreset, setAspectPreset] = React.useState<AspectRatioPreset>(defaultAspectRatio);
  const [cropBox, setCropBox] = React.useState<{ x: number; y: number; w: number; h: number }>({
    x: 10,
    y: 10,
    w: 80,
    h: 80,
  }); // percentages 0 - 100

  // Zoom & Pan
  const [zoom, setZoom] = React.useState<number>(1);
  const [pan, setPan] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Transforms
  const [rotationStep, setRotationStep] = React.useState<number>(0); // 0, 90, 180, 270
  const [straightenAngle, setStraightenAngle] = React.useState<number>(0); // -45 to +45
  const [flipH, setFlipH] = React.useState<boolean>(false);
  const [flipV, setFlipV] = React.useState<boolean>(false);

  // Adjustments
  const [brightness, setBrightness] = React.useState<number>(0); // -50 to 50
  const [contrast, setContrast] = React.useState<number>(0); // -50 to 50
  const [grayscale, setGrayscale] = React.useState<boolean>(false);

  // Guide Overlays
  const [activeOverlay, setActiveOverlay] = React.useState<'passport' | 'signature' | 'grid' | 'none'>(
    overlayType
  );
  const [showGuides, setShowGuides] = React.useState<boolean>(true);

  // Drag interaction state
  type DragMode = 'pan' | 'box_move' | 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w';
  const [dragMode, setDragMode] = React.useState<DragMode | null>(null);
  const [dragStartPos, setDragStartPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialCropBox, setInitialCropBox] = React.useState<{ x: number; y: number; w: number; h: number }>({
    x: 10,
    y: 10,
    w: 80,
    h: 80,
  });

  const totalRotation = (rotationStep + straightenAngle) % 360;

  // Compute aspect ratio value from preset
  const getNumericRatio = React.useCallback((): number | null => {
    if (aspectPreset === 'free') return null;
    if (aspectPreset === '1:1') return 1;
    if (aspectPreset === '3.5:4.5') return 3.5 / 4.5;
    if (aspectPreset === '4:3') return 4 / 3;
    if (aspectPreset === '16:9') return 16 / 9;
    if (aspectPreset === '7:2') return 7 / 2;
    if (aspectPreset === 'original' && imageRef.current) {
      return (imageRef.current.naturalWidth || 1) / (imageRef.current.naturalHeight || 1);
    }
    return null;
  }, [aspectPreset]);

  // Adjust cropBox when aspect ratio preset changes
  React.useEffect(() => {
    const ratio = getNumericRatio();
    if (!ratio) return;

    setCropBox((prev) => {
      let newW = prev.w;
      let newH = newW / ratio;

      if (newH > 90) {
        newH = 80;
        newW = newH * ratio;
      }
      if (newW > 90) {
        newW = 80;
        newH = newW / ratio;
      }

      const newX = Math.max(2, Math.min(98 - newW, 50 - newW / 2));
      const newY = Math.max(2, Math.min(98 - newH, 50 - newH / 2));

      return { x: newX, y: newY, w: newW, h: newH };
    });
  }, [aspectPreset, getNumericRatio]);

  // Notify parent of crop change
  const notifyChanges = React.useCallback(() => {
    if (!imageRef.current) return;
    const naturalW = imageRef.current.naturalWidth;
    const naturalH = imageRef.current.naturalHeight;
    if (!naturalW || !naturalH) return;

    // Convert crop percentage to natural pixel coordinates
    const cropX = Math.round((cropBox.x / 100) * naturalW);
    const cropY = Math.round((cropBox.y / 100) * naturalH);
    const cropW = Math.max(10, Math.round((cropBox.w / 100) * naturalW));
    const cropH = Math.max(10, Math.round((cropBox.h / 100) * naturalH));

    const edits: StudioEdits = {
      rotationDeg: totalRotation,
      flipHorizontal: flipH,
      flipVertical: flipV,
      brightness,
      contrast,
      grayscale,
    };

    onCropChange?.(
      {
        x: Math.max(0, Math.min(naturalW - cropW, cropX)),
        y: Math.max(0, Math.min(naturalH - cropH, cropY)),
        width: cropW,
        height: cropH,
      },
      totalRotation,
      edits
    );
  }, [cropBox, totalRotation, flipH, flipV, brightness, contrast, grayscale, onCropChange]);

  React.useEffect(() => {
    notifyChanges();
  }, [notifyChanges]);

  // Pointer drag handling for handles and crop box
  const startDrag = (mode: DragMode, e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDragMode(mode);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setInitialCropBox({ ...cropBox });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragMode || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStartPos.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartPos.y) / rect.height) * 100;

    const ratio = getNumericRatio();

    setCropBox(() => {
      let { x, y, w, h } = initialCropBox;

      if (dragMode === 'box_move') {
        x = Math.max(0, Math.min(100 - w, x + deltaX));
        y = Math.max(0, Math.min(100 - h, y + deltaY));
        return { x, y, w, h };
      }

      // Handle corner and edge resizes
      if (dragMode.includes('e')) {
        w = Math.max(10, Math.min(100 - x, initialCropBox.w + deltaX));
        if (ratio) h = w / ratio;
      }
      if (dragMode.includes('s')) {
        h = Math.max(10, Math.min(100 - y, initialCropBox.h + deltaY));
        if (ratio) w = h * ratio;
      }
      if (dragMode.includes('w')) {
        const potentialW = Math.max(10, initialCropBox.w - deltaX);
        if (initialCropBox.x + deltaX >= 0) {
          w = potentialW;
          x = initialCropBox.x + (initialCropBox.w - w);
          if (ratio) h = w / ratio;
        }
      }
      if (dragMode.includes('n')) {
        const potentialH = Math.max(10, initialCropBox.h - deltaY);
        if (initialCropBox.y + deltaY >= 0) {
          h = potentialH;
          y = initialCropBox.y + (initialCropBox.h - h);
          if (ratio) w = h * ratio;
        }
      }

      // Clamp bounds
      w = Math.min(w, 100 - x);
      h = Math.min(h, 100 - y);

      return { x, y, w, h };
    });
  };

  const stopDrag = () => {
    setDragMode(null);
  };

  const handleResetAll = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotationStep(0);
    setStraightenAngle(0);
    setFlipH(false);
    setFlipV(false);
    setBrightness(0);
    setContrast(0);
    setGrayscale(false);
    setAspectPreset(defaultAspectRatio);
    setCropBox({ x: 10, y: 10, w: 80, h: 80 });
  };

  const handleAutoEnhance = () => {
    setBrightness(5);
    setContrast(15);
  };

  return (
    <div className={cn('space-y-4 select-none', className)}>
      {/* Studio Viewport */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        className="relative w-full h-[360px] sm:h-[420px] bg-slate-950 rounded-3xl overflow-hidden border border-surface-darker shadow-inner flex items-center justify-center touch-none group"
      >
        {/* Subtle Backdrop Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Scaled & Filtered Image Container */}
        <div
          className="transition-transform duration-75 will-change-transform flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${totalRotation}deg) scaleX(${
              flipH ? -1 : 1
            }) scaleY(${flipV ? -1 : 1})`,
            filter: `brightness(${100 + brightness}%) contrast(${100 + contrast}%) ${
              grayscale ? 'grayscale(100%)' : ''
            }`,
          }}
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Studio preview"
            onLoad={notifyChanges}
            className="max-w-none max-h-[300px] sm:max-h-[360px] object-contain rounded-lg shadow-2xl pointer-events-none"
          />
        </div>

        {/* Interactive Crop Box Overlay */}
        <div
          style={{
            left: `${cropBox.x}%`,
            top: `${cropBox.y}%`,
            width: `${cropBox.w}%`,
            height: `${cropBox.h}%`,
          }}
          className="absolute border-2 border-primary shadow-[0_0_0_9999px_rgba(15,23,42,0.72)] rounded-xl pointer-events-auto cursor-move flex items-center justify-center"
          onPointerDown={(e) => startDrag('box_move', e)}
        >
          {/* 3x3 Rule of Thirds Grid inside crop area */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-25">
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-white" />
            <div className="border-r border-white" />
            <div />
          </div>

          {/* Biometric Passport Guide Overlay */}
          {showGuides && activeOverlay === 'passport' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50 group-hover:opacity-85 transition-opacity">
              <div className="w-[60%] h-[72%] rounded-[50%] border border-dashed border-white flex flex-col items-center justify-center">
                <div className="w-full h-[1px] bg-white/70 -mt-4 relative">
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-widest text-white uppercase">
                    Eye Level
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-white mt-1 uppercase tracking-wider">
                Align Face
              </span>
            </div>
          )}

          {/* Signature Box Guide Overlay */}
          {showGuides && activeOverlay === 'signature' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50 group-hover:opacity-85 transition-opacity">
              <div className="w-[85%] h-[60%] border border-dashed border-white rounded flex items-center justify-center">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Signature Box
                </span>
              </div>
            </div>
          )}

          {/* 8 Drag & Resize Handles */}
          {/* Corner Handles */}
          <div
            onPointerDown={(e) => startDrag('nw', e)}
            className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-white border-2 border-primary cursor-nwse-resize shadow-md hover:scale-125 transition-transform"
          />
          <div
            onPointerDown={(e) => startDrag('ne', e)}
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white border-2 border-primary cursor-nesw-resize shadow-md hover:scale-125 transition-transform"
          />
          <div
            onPointerDown={(e) => startDrag('sw', e)}
            className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-white border-2 border-primary cursor-nesw-resize shadow-md hover:scale-125 transition-transform"
          />
          <div
            onPointerDown={(e) => startDrag('se', e)}
            className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-white border-2 border-primary cursor-nwse-resize shadow-md hover:scale-125 transition-transform"
          />

          {/* Edge Middle Handles */}
          <div
            onPointerDown={(e) => startDrag('n', e)}
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full bg-white border border-primary cursor-ns-resize shadow-sm hover:scale-110 transition-transform"
          />
          <div
            onPointerDown={(e) => startDrag('s', e)}
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full bg-white border border-primary cursor-ns-resize shadow-sm hover:scale-110 transition-transform"
          />
          <div
            onPointerDown={(e) => startDrag('w', e)}
            className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-6 rounded-full bg-white border border-primary cursor-ew-resize shadow-sm hover:scale-110 transition-transform"
          />
          <div
            onPointerDown={(e) => startDrag('e', e)}
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-6 rounded-full bg-white border border-primary cursor-ew-resize shadow-sm hover:scale-110 transition-transform"
          />
        </div>

        {/* Top Viewport Floating Information Tag */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-200 border border-white/10 flex items-center gap-1.5 pointer-events-none">
          <Maximize2 className="w-3 h-3 text-primary" />
          <span>Drag box to move • Drag corner handles to resize</span>
        </div>

        {/* Guide Selector Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setActiveOverlay('passport')}
            className={cn(
              'px-2 py-1 rounded-xl text-[10px] font-bold transition-all',
              activeOverlay === 'passport'
                ? 'bg-primary text-white'
                : 'text-slate-400 hover:text-white'
            )}
            title="Passport face oval guide"
          >
            Passport
          </button>
          <button
            type="button"
            onClick={() => setActiveOverlay('signature')}
            className={cn(
              'px-2 py-1 rounded-xl text-[10px] font-bold transition-all',
              activeOverlay === 'signature'
                ? 'bg-primary text-white'
                : 'text-slate-400 hover:text-white'
            )}
            title="Signature framing guide"
          >
            Signature
          </button>
          <button
            type="button"
            onClick={() => setActiveOverlay('none')}
            className={cn(
              'px-2 py-1 rounded-xl text-[10px] font-bold transition-all',
              activeOverlay === 'none'
                ? 'bg-primary text-white'
                : 'text-slate-400 hover:text-white'
            )}
          >
            Clean
          </button>
        </div>
      </div>

      {/* Studio Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-surface/70 rounded-2xl border border-surface-darker">
        <button
          type="button"
          onClick={() => setActiveTab('crop')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-extrabold transition-all',
            activeTab === 'crop'
              ? 'bg-primary text-white shadow-2xs'
              : 'text-text-main/70 hover:text-text-main'
          )}
        >
          <Crop className="w-3.5 h-3.5" />
          <span>Crop &amp; Aspect Ratio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('transform')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-extrabold transition-all',
            activeTab === 'transform'
              ? 'bg-primary text-white shadow-2xs'
              : 'text-text-main/70 hover:text-text-main'
          )}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Rotate &amp; Flip</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('adjust')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-extrabold transition-all',
            activeTab === 'adjust'
              ? 'bg-primary text-white shadow-2xs'
              : 'text-text-main/70 hover:text-text-main'
          )}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Adjust &amp; Color</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-4 bg-surface/40 rounded-2xl border border-surface-darker space-y-4">
        {/* Tab 1: Crop & Aspect Ratio */}
        {activeTab === 'crop' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-main flex items-center gap-1.5">
                <Crop className="w-3.5 h-3.5 text-primary" />
                Aspect Ratio Presets
              </span>
              <span className="text-[11px] font-extrabold text-primary uppercase">
                {aspectPreset === 'free' ? 'Free Size (Custom Box)' : aspectPreset}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setAspectPreset('free')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  aspectPreset === 'free'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                )}
              >
                ✨ Free Size (Unconstrained)
              </button>

              <button
                type="button"
                onClick={() => setAspectPreset('3.5:4.5')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  aspectPreset === '3.5:4.5'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                )}
              >
                Passport (3.5×4.5 cm)
              </button>

              <button
                type="button"
                onClick={() => setAspectPreset('1:1')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  aspectPreset === '1:1'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                )}
              >
                1:1 (Square / 2×2 in)
              </button>

              <button
                type="button"
                onClick={() => setAspectPreset('7:2')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  aspectPreset === '7:2'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                )}
              >
                Signature (7:2 Banner)
              </button>

              <button
                type="button"
                onClick={() => setAspectPreset('4:3')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  aspectPreset === '4:3'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                )}
              >
                4:3 Photo
              </button>

              <button
                type="button"
                onClick={() => setAspectPreset('16:9')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  aspectPreset === '16:9'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                )}
              >
                16:9 Widescreen
              </button>

              <button
                type="button"
                onClick={() => setAspectPreset('original')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                  aspectPreset === 'original'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-white border border-surface-darker text-text-main/70 hover:text-text-main'
                )}
              >
                Original Image
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Transform (Rotate, Flip, Straighten) */}
        {activeTab === 'transform' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Rotate & Flip Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setRotationStep((r) => (r + 270) % 360)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-surface-darker text-xs font-bold text-text-main hover:bg-surface transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-primary" />
                <span>Rotate 90° Left</span>
              </button>

              <button
                type="button"
                onClick={() => setRotationStep((r) => (r + 90) % 360)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-surface-darker text-xs font-bold text-text-main hover:bg-surface transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5 text-primary" />
                <span>Rotate 90° Right</span>
              </button>

              <button
                type="button"
                onClick={() => setFlipH(!flipH)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all',
                  flipH
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-surface-darker text-text-main hover:bg-surface'
                )}
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
                <span>Flip Horizontal</span>
              </button>

              <button
                type="button"
                onClick={() => setFlipV(!flipV)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all',
                  flipV
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-surface-darker text-text-main hover:bg-surface'
                )}
              >
                <FlipVertical className="w-3.5 h-3.5" />
                <span>Flip Vertical</span>
              </button>
            </div>

            {/* Fine Straighten Slider (-45 to +45) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-text-main/70">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-primary" />
                  Fine Angle Straighten / Deskew
                </span>
                <span className="font-mono text-primary font-black">
                  {straightenAngle > 0 ? `+${straightenAngle}°` : `${straightenAngle}°`}
                </span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                step="0.5"
                value={straightenAngle}
                onChange={(e) => setStraightenAngle(parseFloat(e.target.value))}
                className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Adjust & Color */}
        {activeTab === 'adjust' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-surface-darker/60">
              <button
                type="button"
                onClick={handleAutoEnhance}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-light border border-primary/30 text-primary text-xs font-extrabold hover:bg-primary-light/80 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Enhance Color</span>
              </button>

              <button
                type="button"
                onClick={() => setGrayscale(!grayscale)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all',
                  grayscale
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white border-surface-darker text-text-main hover:bg-surface'
                )}
              >
                <span>Grayscale (B&amp;W Document)</span>
              </button>
            </div>

            {/* Brightness Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-text-main/70">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-primary" />
                  Brightness
                </span>
                <span className="font-mono text-text-main font-bold">
                  {brightness > 0 ? `+${brightness}%` : `${brightness}%`}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Contrast Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-text-main/70">
                <span className="flex items-center gap-1.5">
                  <Contrast className="w-3.5 h-3.5 text-primary" />
                  Contrast
                </span>
                <span className="font-mono text-text-main font-bold">
                  {contrast > 0 ? `+${contrast}%` : `${contrast}%`}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        )}

        {/* Global Bottom Actions: Zoom & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-surface-darker/60">
          {/* Zoom Slider */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              className="p-1 rounded-lg border border-surface-darker bg-white text-text-main hover:bg-surface"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
              className="p-1 rounded-lg border border-surface-darker bg-white text-text-main hover:bg-surface"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-text-main/60 w-10 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Reset All */}
          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-darker bg-white hover:bg-surface text-xs font-bold text-text-main/70 hover:text-text-main transition-colors ml-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Edits</span>
          </button>
        </div>
      </div>
    </div>
  );
}
