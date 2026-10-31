'use client';

import * as React from 'react';
import {
  Camera,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Download,
  Upload,
  ZoomIn,
  Move,
  FileCheck,
} from 'lucide-react';

export function FotoTesseraCieClient() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [zoom, setZoom] = React.useState<number>(1);
  const [offsetX, setOffsetX] = React.useState<number>(0);
  const [offsetY, setOffsetY] = React.useState<number>(0);
  const [brightness, setBrightness] = React.useState<number>(100);
  const [contrast, setContrast] = React.useState<number>(100);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Dimensioni CIE / ICAO a 300 DPI: 35x45 mm -> 413x531 px
  const PHOTO_WIDTH = 413;
  const PHOTO_HEIGHT = 531;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setZoom(1);
        setOffsetX(0);
        setOffsetY(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawPhoto = React.useCallback(
    (targetCanvas: HTMLCanvasElement, drawOverlay: boolean = false) => {
      if (!imageSrc) return;
      const ctx = targetCanvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, targetCanvas.width, targetCanvas.height);

        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

        const aspectTarget = targetCanvas.width / targetCanvas.height;
        const aspectImg = img.width / img.height;

        let renderW = targetCanvas.width;
        let renderH = targetCanvas.height;

        if (aspectImg > aspectTarget) {
          renderH = targetCanvas.height * zoom;
          renderW = renderH * aspectImg;
        } else {
          renderW = targetCanvas.width * zoom;
          renderH = renderW / aspectImg;
        }

        const posX = (targetCanvas.width - renderW) / 2 + offsetX;
        const posY = (targetCanvas.height - renderH) / 2 + offsetY;

        ctx.drawImage(img, posX, posY, renderW, renderH);
        ctx.filter = 'none';

        if (drawOverlay) {
          ctx.strokeStyle = 'rgba(2, 132, 199, 0.7)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);

          ctx.beginPath();
          ctx.ellipse(
            targetCanvas.width / 2,
            targetCanvas.height * 0.46,
            targetCanvas.width * 0.28,
            targetCanvas.height * 0.32,
            0,
            0,
            2 * Math.PI
          );
          ctx.stroke();

          ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
          ctx.beginPath();
          ctx.moveTo(targetCanvas.width * 0.2, targetCanvas.height * 0.44);
          ctx.lineTo(targetCanvas.width * 0.8, targetCanvas.height * 0.44);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
          ctx.beginPath();
          ctx.moveTo(targetCanvas.width * 0.28, targetCanvas.height * 0.74);
          ctx.lineTo(targetCanvas.width * 0.72, targetCanvas.height * 0.74);
          ctx.stroke();

          ctx.setLineDash([]);
        }
      };
    },
    [imageSrc, zoom, offsetX, offsetY, brightness, contrast]
  );

  React.useEffect(() => {
    if (previewCanvasRef.current) {
      drawPhoto(previewCanvasRef.current, true);
    }
  }, [drawPhoto]);

  const downloadSinglePhoto = () => {
    if (!canvasRef.current || !imageSrc) return;
    const canvas = canvasRef.current;
    canvas.width = PHOTO_WIDTH;
    canvas.height = PHOTO_HEIGHT;
    drawPhoto(canvas, false);

    setTimeout(() => {
      const link = document.createElement('a');
      link.download = 'fototessera-cie-35x45mm.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    }, 100);
  };

  const downloadPrintSheet = () => {
    if (!imageSrc) return;
    const printCanvas = document.createElement('canvas');
    printCanvas.width = 1800;
    printCanvas.height = 1200;
    const ctx = printCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, printCanvas.width, printCanvas.height);

    const single = document.createElement('canvas');
    single.width = PHOTO_WIDTH;
    single.height = PHOTO_HEIGHT;
    drawPhoto(single, false);

    setTimeout(() => {
      const startX = 350;
      const startY = 60;
      const gapX = 120;
      const gapY = 80;

      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
          const x = startX + c * (PHOTO_WIDTH + gapX);
          const y = startY + r * (PHOTO_HEIGHT + gapY);

          ctx.drawImage(single, x, y, PHOTO_WIDTH, PHOTO_HEIGHT);

          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1;
          ctx.setLineDash([6, 6]);
          ctx.strokeRect(x, y, PHOTO_WIDTH, PHOTO_HEIGHT);
        }
      }

      ctx.setLineDash([]);
      ctx.fillStyle = '#64748b';
      ctx.font = '24px sans-serif';
      ctx.fillText('Formato Ufficiale CIE / Passaporto 35x45 mm - Stampa su carta fotografica 10x15 cm', 260, 1140);

      const link = document.createElement('a');
      link.download = 'foglio-stampa-4-foto-cie-10x15cm.jpg';
      link.href = printCanvas.toDataURL('image/jpeg', 0.95);
      link.click();
    }, 150);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor & Canvas Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <Camera className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Inquadratura & Guida Biometrica</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setImageSrc(null);
              setZoom(1);
              setOffsetX(0);
              setOffsetY(0);
              setBrightness(100);
              setContrast(100);
            }}
            className="text-xs text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Azzera</span>
          </button>
        </div>

        {!imageSrc ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-10 text-center space-y-4 hover:border-sky-500 hover:bg-sky-50/50 dark:hover:bg-slate-900/50 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-2xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Seleziona o trascina qui una tua foto</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Formati supportati: JPG, PNG, WEBP (fino a 15 MB)</p>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-slate-900 dark:bg-sky-600 text-white text-xs font-bold rounded-xl group-hover:bg-sky-600 dark:group-hover:bg-sky-500 transition-colors"
            >
              Carica Foto da Dispositivo
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Preview Canvas with Guides */}
            <div className="flex justify-center">
              <div className="relative border-4 border-slate-900 dark:border-slate-600 rounded-2xl overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-900 cursor-move">
                <canvas
                  ref={previewCanvasRef}
                  width={PHOTO_WIDTH}
                  height={PHOTO_HEIGHT}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="max-h-[380px] w-auto block select-none"
                />
                <div className="absolute top-2 left-2 bg-slate-900/80 text-[10px] text-white px-2 py-0.5 rounded font-mono">
                  35×45 mm @ 300 DPI
                </div>
              </div>
            </div>

            {/* Adjustments */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Zoom Ingrandimento</span>
                  </span>
                  <span className="font-mono text-sky-700 dark:text-sky-400">{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.5}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>Luminosità</span>
                    <span className="font-mono text-sky-700 dark:text-sky-400">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={140}
                    step={2}
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>Contrasto</span>
                    <span className="font-mono text-sky-700 dark:text-sky-400">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min={70}
                    max={130}
                    step={2}
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>

              <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-100 dark:border-sky-800/40 flex items-center gap-2 text-xs text-sky-800 dark:text-sky-200">
                <Move className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Trascina l&apos;immagine col mouse o tocco per allineare il viso all&apos;ovale e gli occhi alla linea rossa.</span>
              </div>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />

        <canvas ref={canvasRef} className="hidden" />

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Nessun dato o foto viene inviato a server esterni: elaborazione protetta e confinata al tuo dispositivo.</span>
        </div>
      </div>

      {/* Download Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Esportazione & Stampa
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            300 DPI Alta Qualità
          </span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            disabled={!imageSrc}
            onClick={downloadSinglePhoto}
            className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Scarica Singola Foto (35×45 mm / 413×531 px)</span>
          </button>

          <button
            type="button"
            disabled={!imageSrc}
            onClick={downloadPrintSheet}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer shadow-sm"
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Scarica Foglio Stampa 10×15 cm (4 Fototessere)</span>
          </button>
        </div>

        <div className="space-y-2 text-xs border-t border-slate-800/80 pt-4 text-slate-300">
          <strong className="text-white block text-[11px] uppercase tracking-wider">
            Checklist Requisiti Ufficiali Polizia di Stato:
          </strong>
          <ul className="space-y-1.5 text-[11px] text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sfondo chiaro e uniforme (bianco o grigio perla).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sguardo rivolto dritto all&apos;obiettivo, bocca chiusa.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Nessun copricapo (salvo motivi religiosi con viso scoperto).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Niente riflessi sulle lenti degli occhiali, occhi visibili.</span>
            </li>
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong>Consiglio di Stampa:</strong> Quando stampi il foglio 10×15 cm presso un chiosco o su stampante fotografica domestica, seleziona l&apos;opzione <em>&quot;Dimensioni reali / 100%&quot;</em> e disattiva <em>&quot;Adatta alla pagina&quot;</em> per preservare al millimetro le dimensioni esatte di 35×45 mm.
        </div>
      </div>
    </div>
  );
}

