'use client';

import * as React from 'react';
import { Type, AlignLeft, Clock, Copy, Check } from 'lucide-react';

export function SpainWordCounterEngine() {
  const [text, setText] = React.useState<string>(
    'El artículo 35 del Estatuto de los Trabajadores en España regula las horas extraordinarias y su compensación económica o en tiempo de descanso equivalente.'
  );
  const [copied, setCopied] = React.useState<boolean>(false);

  const stats = React.useMemo(() => {
    const trimmed = text.trim();
    const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = wordsArray.length;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter(Boolean).length : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return {
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      readingTimeMinutes,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Input Column */}
        <div className="lg:col-span-7 space-y-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Escribe o pega tu texto:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setText('')}
                className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Introduce el texto que deseas analizar..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-sans leading-relaxed"
          />
        </div>

        {/* Real-time Metrics Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Métricas del Texto
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Tiempo Real
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                <span className="text-xs text-slate-400 block font-semibold">Palabras</span>
                <span className="text-3xl font-black font-mono text-white mt-1 block">
                  {stats.words.toLocaleString('es-ES')}
                </span>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                <span className="text-xs text-slate-400 block font-semibold">Caracteres</span>
                <span className="text-3xl font-black font-mono text-orange-400 mt-1 block">
                  {stats.characters.toLocaleString('es-ES')}
                </span>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Caracteres sin espacios:</span>
                <span className="font-mono font-bold text-slate-100">
                  {stats.charactersNoSpaces.toLocaleString('es-ES')}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Párrafos redactados:</span>
                <span className="font-mono font-bold text-slate-100">{stats.paragraphs}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Tiempo de lectura estimado:</span>
                <span className="font-mono font-bold text-emerald-400">
                  ~{stats.readingTimeMinutes} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
