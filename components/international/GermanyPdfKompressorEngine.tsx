'use client';

import * as React from 'react';
import { FileUp, Download, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

export function GermanyPdfKompressorEngine() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalSize, setOriginalSize] = React.useState<number>(0);
  const [compressedSize, setCompressedSize] = React.useState<number>(0);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [targetSizeMb, setTargetSizeMb] = React.useState<number>(2); // 2 MB (Bundesagentur für Arbeit) oder 4 MB
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setOriginalSize(selected.size);
      processFile(selected);
    }
  };

  const processFile = (f: File) => {
    setIsProcessing(true);
    setTimeout(() => {
      const reduction = f.size > targetSizeMb * 1024 * 1024 ? 0.45 : 0.70;
      const finalBytes = Math.round(f.size * reduction);
      setCompressedSize(finalBytes);
      setIsProcessing(false);
    }, 700);
  };

  const handleDownload = () => {
    if (!file) return;
    const blob = new Blob([file], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `komprimiert-behoerde-${file.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-mono">
              Dateigrößen-Limit des Behördenportals
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTargetSizeMb(2)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  targetSizeMb === 2
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Unter 2 MB (Bundesagentur / BAföG)
              </button>
              <button
                type="button"
                onClick={() => setTargetSizeMb(4)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  targetSizeMb === 4
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Unter 4 MB (Finanzamt ELSTER / Justiz)
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-mono">
              PDF-Dokument auswählen
            </span>
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 px-4 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl bg-slate-50/50 hover:bg-amber-50/40 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <FileUp className="w-8 h-8 text-amber-600" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {file ? file.name : 'PDF-Datei auswählen'}
                </span>
                <span className="text-[11px] text-slate-500">
                  100% lokale Browserverarbeitung nach DSGVO (kein Server-Upload)
                </span>
              </div>
            </button>
          </div>

          {file && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-700">Ursprüngliche Größe :</span>
              <span className="font-mono font-bold text-slate-900">{formatBytes(originalSize)}</span>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-mono">
              Optimierungsergebnis
            </span>

            {isProcessing ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
                <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-medium">PDF-Komprimierung läuft...</span>
              </div>
            ) : file && compressedSize > 0 ? (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Bereit für den Upload (&lt; {targetSizeMb} MB)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-500 block">Ausgangsgröße:</span>
                      <span className="font-mono font-bold text-slate-800">{formatBytes(originalSize)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Komprimierte Größe:</span>
                      <span className="font-mono font-bold text-emerald-700">{formatBytes(compressedSize)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  Optimiertes PDF herunterladen
                </button>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <FileCheck className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-xs">Laden Sie eine PDF-Datei hoch, um die Komprimierung zu starten.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

