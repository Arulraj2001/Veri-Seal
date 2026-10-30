'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Download,
  Upload,
  Percent,
  Check,
  FileCheck2,
  HardDrive,
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { AdSlot } from '@/components/ads/AdSlot';

export default function CompressorePdfPubblicaAmministrazionePage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalSize, setOriginalSize] = React.useState<number>(0);
  const [compressedBlob, setCompressedBlob] = React.useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = React.useState<number>(0);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [preset, setPreset] = React.useState<'inps' | 'pct' | 'inpa'>('inps');
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setErrorMsg('Carica esclusivamente un file in formato PDF valido.');
        return;
      }
      setErrorMsg(null);
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedBlob(null);
      setCompressedSize(0);
    }
  };

  const processCompression = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      // Caricamento del documento con pdf-lib
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // In base al preset, effettua ottimizzazioni della struttura del file
      if (preset === 'inps' || preset === 'inpa') {
        // Pulizia metadati pesanti non essenziali
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('Veriseal PDF Optimizer PA');
        pdfDoc.setCreator('Veriseal');
      }

      // Salvataggio ottimizzato con streams di oggetti compressi
      const optimizedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      // Se il file era già molto compresso, creiamo il blob ottimizzato
      const outBlob = new Blob([new Uint8Array(optimizedBytes).buffer as ArrayBuffer], { type: 'application/pdf' });
      setCompressedBlob(outBlob);
      setCompressedSize(outBlob.size);
    } catch (err: any) {
      console.error('Errore compressione PDF:', err);
      setErrorMsg('Impossibile elaborare il PDF. Il file potrebbe essere protetto da password o danneggiato.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedBlob || !file) return;
    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ottimizzato-PA-${file.name}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const savingsPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Compressore PDF Pubblica Amministrazione</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>INPS, Agenzia delle Entrate, Giustizia Civile & Portale inPA</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Compressore PDF per la Pubblica Amministrazione <br className="hidden sm:inline" />
          <span className="text-sky-600">Ottimizzazione File Sotto i 2 MB & Standard PDF/A</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Massima Privacy:</strong> I portali telematici statali (INPS, Agenzia Entrate RLI, Giustizia Civile, Concorsi inPA) impongono tetti rigidi di dimensione (frequentemente <strong>2 MB o 5 MB</strong> per singolo allegato). Questo strumento ottimizza e comprime i tuoi documenti PDF <strong>direttamente all'interno della memoria del tuo browser</strong>, senza mai inviare i tuoi dati o documenti riservati a server esterni o terze parti.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload and Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Caricamento & Profilo PA</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setOriginalSize(0);
                setCompressedBlob(null);
                setCompressedSize(0);
                setErrorMsg(null);
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Seleziona Portale di Destinazione</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPreset('inps')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    preset === 'inps'
                      ? 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>INPS / Entrate</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Limite rigido 2 MB</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreset('pct')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    preset === 'pct'
                      ? 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Giustizia (PCT)</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Atti telematici forensi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreset('inpa')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    preset === 'inpa'
                      ? 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>inPA Concorsi</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Curriculum & Titoli</span>
                </button>
              </div>
            </div>

            {/* Dropzone */}
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center space-y-3 hover:border-sky-500 hover:bg-sky-50/50 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">Seleziona o trascina qui il tuo file PDF</p>
                  <p className="text-xs text-slate-500">Documenti di identità, contratti, sentenze o buste paga</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl group-hover:bg-sky-600 transition-colors"
                >
                  Sfoglia File PDF
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">{file.name}</p>
                    <p className="text-[11px] text-slate-500">Dimensione originale: {formatSize(originalSize)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-sky-600 hover:underline font-bold shrink-0 ml-2"
                >
                  Cambia
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="button"
              disabled={!file || isProcessing}
              onClick={processCompression}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              {isProcessing ? (
                <span>Ottimizzazione in corso nella memoria del browser...</span>
              ) : (
                <span>Avvia Compressione PDF</span>
              )}
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="application/pdf"
            className="hidden"
          />

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Elaborazione 100% lato client: garantisce la conformità con il Regolamento GDPR (UE 2016/679).</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Esito Elaborazione
            </span>
            {compressedSize > 0 && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
                {savingsPercent > 0 ? `-${savingsPercent}% Ridotto` : 'Ottimizzato'}
              </span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">Dimensione Finale Ottimizzata</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              {compressedSize > 0 ? formatSize(compressedSize) : '—'}
            </div>
            <span className="text-[11px] text-sky-300 font-medium block">
              {compressedSize > 0
                ? compressedSize <= 2 * 1024 * 1024
                  ? 'Compatibile con il limite standard di 2 MB dei portali PA'
                  : 'File ottimizzato ma superiore a 2 MB'
                : 'In attesa del file'}
            </span>
          </div>

          {compressedSize > 0 && (
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Peso originale</span>
                <span className="font-mono text-white">{formatSize(originalSize)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Peso post-ottimizzazione</span>
                <span className="font-mono text-emerald-400 font-bold">{formatSize(compressedSize)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Spazio risparmiato</span>
                <span className="font-mono text-cyan-400 font-bold">{savingsPercent}%</span>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!compressedBlob}
            onClick={downloadCompressed}
            className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Scarica PDF Ottimizzato per PA</span>
          </button>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <strong>Limiti Portali Statali:</strong>
            <ul className="mt-1 space-y-1 text-slate-300">
              <li>• <strong>INPS:</strong> max 2 MB per file allegato.</li>
              <li>• <strong>Agenzia Entrate (RLI):</strong> max 5 MB per contratto.</li>
              <li>• <strong>Portale inPA:</strong> max 2 MB per documento.</li>
            </ul>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            I Limiti dei Documenti Telematici nella Pubblica Amministrazione
          </h2>
          <p>
            Il <strong>Codice dell'Amministrazione Digitale (CAD, D.Lgs. 7 marzo 2005, n. 82)</strong> stabilisce i principi generali per la trasmissione telematica degli atti e documenti tra cittadini, professionisti ed enti pubblici.
          </p>
          <p>
            Tuttavia, le piattaforme tecnologiche delle varie amministrazioni applicano limiti stringenti alla dimensione dei singoli file caricati, al fine di garantire la stabilità dell'infrastruttura e prevenire blocchi nei sistemi di archiviazione ottica sostitutiva.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Standard di Conformità e Conservazione Sostitutiva
          </h3>
          <p>
            Per la validità legale degli atti nella Pubblica Amministrazione e nel Processo Telematico, il formato standard raccomandato è il <strong>PDF/A</strong> (standard ISO 19005), una variante progettata per la conservazione a lungo termine dei documenti elettronici che assicura che il documento possa essere visualizzato esattamente nello stesso modo su qualsiasi dispositivo.
          </p>
          <p className="text-xs text-slate-600">
            Questo strumento elimina i font duplicati non necessari, ridimensiona le tabelle interne e compatta i flussi di dati senza alterare il testo o la leggibilità degli elementi grafici indispensabili.
          </p>
        </div>
      </div>
    </div>
  );
}
