'use client';

import * as React from 'react';
import {
  Download,
  Upload,
  Grid,
} from 'lucide-react';

export function Foto3x4DocumentosClient() {
  const [imagemSrc, setImagemSrc] = React.useState<string | null>(null);
  const [zoom, setZoom] = React.useState<number>(1);
  const [posicaoX, setPosicaoX] = React.useState<number>(0);
  const [posicaoY, setPosicaoY] = React.useState<number>(0);
  const [formato, setFormato] = React.useState<'3x4' | '5x7' | 'folha10x15'>('3x4');

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = React.useRef<HTMLImageElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setImagemSrc(src);
        setZoom(1);
        setPosicaoX(0);
        setPosicaoY(0);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => {
          imageObjRef.current = img;
          renderCanvas();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageObjRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (formato === '3x4') {
      canvas.width = 354;
      canvas.height = 472;
    } else if (formato === '5x7') {
      canvas.width = 591;
      canvas.height = 827;
    } else {
      canvas.width = 1200;
      canvas.height = 1800;
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (formato === 'folha10x15') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 354;
      tempCanvas.height = 472;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, 354, 472);
        const drawW = 354 * zoom;
        const drawH = (img.height / img.width) * drawW;
        const x = (354 - drawW) / 2 + posicaoX;
        const y = (472 - drawH) / 2 + posicaoY;
        tempCtx.drawImage(img, x, y, drawW, drawH);

        const cols = 2;
        const rows = 3;
        const startX = 140;
        const startY = 120;
        const gapX = 80;
        const gapY = 80;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const posX = startX + c * (354 + gapX);
            const posY = startY + r * (472 + gapY);
            ctx.drawImage(tempCanvas, posX, posY);

            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = 1;
            ctx.strokeRect(posX, posY, 354, 472);
          }
        }
      }
    } else {
      const drawW = canvas.width * zoom;
      const drawH = (img.height / img.width) * drawW;
      const x = (canvas.width - drawW) / 2 + posicaoX;
      const y = (canvas.height - drawH) / 2 + posicaoY;
      ctx.drawImage(img, x, y, drawW, drawH);
    }
  }, [zoom, posicaoX, posicaoY, formato]);

  React.useEffect(() => {
    if (imagemSrc && imageObjRef.current) {
      renderCanvas();
    }
  }, [renderCanvas, imagemSrc, zoom, posicaoX, posicaoY, formato]);

  const baixarFoto = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `foto-${formato}-documentos.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 mb-8 space-y-6">
      {/* Format Selector Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFormato('3x4')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${
              formato === '3x4'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
            }`}
          >
            Foto 3x4 cm (RG / CIN / CNH)
          </button>
          <button
            type="button"
            onClick={() => setFormato('5x7')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${
              formato === '5x7'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
            }`}
          >
            Foto 5x7 cm (Passaporte / Vistos)
          </button>
          <button
            type="button"
            onClick={() => setFormato('folha10x15')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              formato === 'folha10x15'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Folha 10x15 cm (6 Fotos com Linha de Corte)
          </button>
        </div>

        {imagemSrc && (
          <button
            type="button"
            onClick={baixarFoto}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Baixar Imagem Pronta
          </button>
        )}
      </div>

      {/* Upload Area or Canvas Editor */}
      {!imagemSrc ? (
        <label className="border-2 border-dashed border-slate-600 hover:border-emerald-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition bg-slate-900/50 hover:bg-emerald-950/20">
          <Upload className="w-10 h-10 text-emerald-400 mb-3" />
          <span className="font-bold text-white text-sm mb-1">
            Selecione uma foto do seu dispositivo
          </span>
          <span className="text-xs text-slate-400 text-center max-w-sm">
            Formatos aceitos: JPG, PNG ou WebP. Dica: use uma foto com iluminação frontal uniforme e fundo claro. Processamento 100% no seu navegador.
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Canvas Preview */}
          <div className="md:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden relative">
            <canvas
              ref={canvasRef}
              className="max-h-[420px] max-w-full shadow-md rounded border border-slate-600 bg-white"
            />
          </div>

          {/* Adjustment Controls */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-700 pb-2">
              Ajustes de Enquadramento
            </h3>

            {/* Zoom */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Zoom Facial</span>
                <span className="font-mono text-emerald-400">{zoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Posição Vertical */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Posição Vertical (Cima / Baixo)</span>
                <span className="font-mono text-emerald-400">{posicaoY}px</span>
              </div>
              <input
                type="range"
                min="-200"
                max="200"
                step="5"
                value={posicaoY}
                onChange={(e) => setPosicaoY(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Posição Horizontal */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Posição Horizontal (Esquerda / Direita)</span>
                <span className="font-mono text-emerald-400">{posicaoX}px</span>
              </div>
              <input
                type="range"
                min="-200"
                max="200"
                step="5"
                value={posicaoX}
                onChange={(e) => setPosicaoX(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Reset & Trocar Foto */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setPosicaoX(0);
                  setPosicaoY(0);
                }}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-600 bg-slate-900 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
                Resetar Ajustes
              </button>
              <label className="flex-1 py-2 px-3 rounded-xl border border-slate-600 bg-slate-900 text-xs font-semibold text-slate-300 hover:bg-slate-800 text-center cursor-pointer transition">
                Trocar Foto
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

