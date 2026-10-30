'use client';

import * as React from 'react';
import { Camera, Download, Printer, ShieldCheck, RefreshCw } from 'lucide-react';

export function GermanyPassfotoEngine() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [scale, setScale] = React.useState<number>(1);
  const [positionX, setPositionX] = React.useState<number>(0);
  const [positionY, setPositionY] = React.useState<number>(0);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setScale(1);
        setPositionX(0);
        setPositionY(0);
      };
      reader.readAsDataURL(file);
    }
  };

  // Render photo on single canvas (35x45mm @ 300 DPI = 413x531 px)
  React.useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const aspect = img.width / img.height;
      let drawW = canvas.width * scale;
      let drawH = drawW / aspect;

      const drawX = (canvas.width - drawW) / 2 + positionX;
      const drawY = (canvas.height - drawH) / 2 + positionY;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };
  }, [imageSrc, scale, positionX, positionY]);

  // Generate 10x15cm (4x6 inch) 6-photo print sheet
  const handleDownloadSheet = () => {
    if (!canvasRef.current || !gridCanvasRef.current) return;
    const singleCanvas = canvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    const gridCtx = gridCanvas.getContext('2d');
    if (!gridCtx) return;

    // 10x15 cm @ 300 DPI = 1800 x 1200 px
    gridCanvas.width = 1800;
    gridCanvas.height = 1200;

    gridCtx.fillStyle = '#FFFFFF';
    gridCtx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

    // Draw 6 photos arranged in a 3x2 grid with cutting guides
    const photoW = 413;
    const photoH = 531;
    const gapX = 90;
    const gapY = 50;
    const startX = (gridCanvas.width - (3 * photoW + 2 * gapX)) / 2;
    const startY = (gridCanvas.height - (2 * photoH + 1 * gapY)) / 2;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const x = startX + col * (photoW + gapX);
        const y = startY + row * (photoH + gapY);

        gridCtx.drawImage(singleCanvas, x, y, photoW, photoH);

        // Cutting border
        gridCtx.strokeStyle = '#D1D5DB';
        gridCtx.lineWidth = 1;
        gridCtx.strokeRect(x, y, photoW, photoH);
      }
    }

    const link = document.createElement('a');
    link.download = 'passbild-schablone-10x15cm-bundesdruckerei.jpg';
    link.href = gridCanvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const handleDownloadSingle = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'biometrisches-passbild-35x45mm.jpg';
    link.href = canvasRef.current.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-6 h-6 text-amber-600" />
                Porträtfoto hochladen &amp; anpassen
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Entspricht der offiziellen Fotomustertafel der Bundesdruckerei und des Bundesministeriums des Innern (35×45 mm).
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {!imageSrc ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-10 text-center cursor-pointer bg-slate-50/50 hover:bg-amber-50/30 transition-all space-y-3"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Camera className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-sm text-slate-900 block">
                    Klicken Sie hier, um ein Porträtfoto auszuwählen
                  </span>
                  <span className="text-xs text-slate-500 block">
                    JPG, PNG oder WEBP. Heller, einfarbiger Hintergrund empfohlen.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Anderes Foto wählen
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setScale(1);
                      setPositionX(0);
                      setPositionY(0);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Zentrierung zurücksetzen
                  </button>
                </div>

                {/* Sliders for Zoom and Alignment */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                      <span>Zoom / Bildgröße</span>
                      <span>{scale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                      <span>Horizontale Position</span>
                      <span>{positionX} px</span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="2"
                      value={positionX}
                      onChange={(e) => setPositionX(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                      <span>Vertikale Position</span>
                      <span>{positionY} px</span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="2"
                      value={positionY}
                      onChange={(e) => setPositionY(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Download Actions */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadSheet}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    6er-Druckbogen (10×15 cm) herunterladen
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadSingle}
                    className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Einzelbild (35×45 mm)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col items-center space-y-4">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Biometrische Passbild-Schablone (35 × 45 mm)
            </span>

            {/* Photo Container with Biometric Mask Overlay */}
            <div className="relative border-2 border-slate-300 rounded-lg overflow-hidden shadow-inner bg-slate-100 w-[245px] h-[315px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={413}
                height={531}
                className="w-full h-full object-cover"
              />

              {/* Official Biometric Mask Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-[155px] h-[215px] border-2 border-dashed border-amber-500/70 rounded-[50%/55%] -mt-2"></div>
                <div className="w-full border-t border-dashed border-red-500/40 absolute top-[44%]"></div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1 text-center max-w-xs">
              <p className="font-semibold text-slate-700">Bundesdruckerei Kriterien :</p>
              <p>• Gesichtshöhe muss zwischen 32 mm und 36 mm (70–80%) liegen.</p>
              <p>• Frontalaufnahme, neutraler Gesichtsausdruck, Mund geschlossen.</p>
              <p>• Hellgrauer oder cremefarbener, gleichmäßig ausgeleuchteter Hintergrund.</p>
            </div>
          </div>
        </div>
      </div>

      <canvas ref={gridCanvasRef} className="hidden" />
    </div>
  );
}

