'use client';

import * as React from 'react';
import { Camera, Download, Printer, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export function SpainFotoCarnetEngine() {
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

  // Render photo on single canvas (32x26mm @ 300 DPI = 378x307 px)
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

  // Generate 10x15cm (4x6 inch) 8-photo print sheet
  const handleDownloadSheet = () => {
    if (!canvasRef.current || !gridCanvasRef.current) return;
    const singleCanvas = canvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    const gridCtx = gridCanvas.getContext('2d');
    if (!gridCtx) return;

    // 10x15 cm @ 300 DPI = 1200 x 1800 px
    gridCanvas.width = 1800;
    gridCanvas.height = 1200;

    gridCtx.fillStyle = '#FFFFFF';
    gridCtx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

    // Draw 8 photos arranged in a 4x2 grid with cutting guides
    const photoW = 307;
    const photoH = 378;
    const gapX = 80;
    const gapY = 80;
    const startX = (gridCanvas.width - (4 * photoW + 3 * gapX)) / 2;
    const startY = (gridCanvas.height - (2 * photoH + 1 * gapY)) / 2;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
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
    link.download = 'plantilla-fotos-carnet-dni-10x15cm.jpg';
    link.href = gridCanvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Sube tu foto de frente
            </span>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 px-6 border-2 border-dashed border-orange-300 hover:border-orange-500 rounded-2xl bg-orange-50/50 hover:bg-orange-50 text-orange-700 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Camera className="w-6 h-6 text-orange-600" />
              <span className="text-xs sm:text-sm font-bold">
                {imageSrc ? 'Cambiar fotografía seleccionada' : 'Seleccionar fotografía desde tu dispositivo'}
              </span>
              <span className="text-[11px] text-slate-500">
                Fondo blanco liso, mirada al frente y sin gafas oscuras
              </span>
            </button>
          </div>

          {imageSrc && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              {/* Zoom Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <label htmlFor="zoom-slider">Ajuste de Zoom:</label>
                  <span className="font-mono">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  id="zoom-slider"
                  type="range"
                  min={0.5}
                  max={2.5}
                  step={0.05}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
                />
              </div>

              {/* Posición Vertical Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <label htmlFor="posicion-vertical-slider">Alinear Altura (Cabeza/Barbilla):</label>
                  <span className="font-mono">{positionY} px</span>
                </div>
                <input
                  id="posicion-vertical-slider"
                  type="range"
                  min={-150}
                  max={150}
                  step={2}
                  value={positionY}
                  onChange={(e) => setPositionY(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
                />
              </div>

              {/* Posición Horizontal Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <label htmlFor="posicion-horizontal-slider">Centrar Rostro:</label>
                  <span className="font-mono">{positionX} px</span>
                </div>
                <input
                  id="posicion-horizontal-slider"
                  type="range"
                  min={-100}
                  max={100}
                  step={2}
                  value={positionX}
                  onChange={(e) => setPositionX(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider">
                Medida Oficial DNI / Pasaporte España
              </span>
              <span className="font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                32 × 26 mm (300 DPI)
              </span>
            </div>

            {/* Single Photo Canvas with police oval face guide */}
            <div className="relative border-2 border-orange-500/80 rounded-xl overflow-hidden shadow-2xl bg-white w-[260px] h-[320px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={307}
                height={378}
                className="w-full h-full object-contain"
              />
              {!imageSrc && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs p-4 text-center">
                  <Camera className="w-8 h-8 mb-2 opacity-50" />
                  <span>Sube una foto para encuadrarla aquí</span>
                </div>
              )}
            </div>

            {/* Hidden sheet canvas for 10x15 print export */}
            <canvas ref={gridCanvasRef} className="hidden" />

            {/* Actions */}
            {imageSrc && (
              <div className="w-full pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleDownloadSheet}
                  className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Plantilla de 8 Fotos (10×15 cm)</span>
                </button>
              </div>
            )}
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Normativa del Ministerio del Interior (Policía Nacional):</strong>
              <p className="text-emerald-800 leading-relaxed">
                La fotografía para el DNI debe ser reciente, en color, con fondo blanco y liso, tomada de frente con la cabeza descubierta y sin gafas de cristales oscuros o cualquier prenda que impida la identificación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
