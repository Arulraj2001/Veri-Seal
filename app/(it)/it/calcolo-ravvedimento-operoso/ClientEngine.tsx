'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  Calendar,
  ShieldCheck,
} from 'lucide-react';

interface RavvedimentoResult {
  impostaDovuta: number;
  giorniRitardo: number;
  tipologiaRavvedimento: string;
  percentualeSanzione: number;
  sanzioneRidotta: number;
  interessiLegali: number;
  totaleVersamentoF24: number;
}

export function CalcoloRavvedimentoClient() {
  const [imposta, setImposta] = React.useState<number>(1200);
  const [dataScadenza, setDataScadenza] = React.useState<string>('2026-06-16');
  const [dataPagamento, setDataPagamento] = React.useState<string>('2026-07-20');
  const [tassoInteresseLegale, setTassoInteresseLegale] = React.useState<number>(2.0);

  const calcolaRavvedimento = React.useCallback((): RavvedimentoResult => {
    const safeImposta = Math.max(0, imposta);
    const dScadenza = new Date(dataScadenza);
    const dPagamento = new Date(dataPagamento);

    const diffTime = dPagamento.getTime() - dScadenza.getTime();
    const giorniRitardo = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    let tipologia = 'Ravvedimento Sprint (entro 14 giorni)';
    let percentualeSanzione = 0.1 * giorniRitardo;

    if (giorniRitardo === 0) {
      tipologia = 'Nessun ritardo (scadenza rispettata)';
      percentualeSanzione = 0;
    } else if (giorniRitardo <= 14) {
      tipologia = 'Ravvedimento Sprint (entro 14 giorni)';
      percentualeSanzione = 0.1 * giorniRitardo;
    } else if (giorniRitardo <= 30) {
      tipologia = 'Ravvedimento Breve (dal 15° al 30° giorno)';
      percentualeSanzione = 1.5;
    } else if (giorniRitardo <= 90) {
      tipologia = 'Ravvedimento Medio / Intermedio (entro 90 giorni)';
      percentualeSanzione = 1.67;
    } else if (giorniRitardo <= 365) {
      tipologia = 'Ravvedimento Lungo (entro 1 anno)';
      percentualeSanzione = 3.75;
    } else if (giorniRitardo <= 730) {
      tipologia = 'Ravvedimento Biennale (entro 2 anni)';
      percentualeSanzione = 4.29;
    } else {
      tipologia = 'Ravvedimento Ultrabiennale (oltre 2 anni)';
      percentualeSanzione = 5.0;
    }

    const sanzioneRidotta = safeImposta * (percentualeSanzione / 100);
    const interessiLegali = (safeImposta * tassoInteresseLegale * giorniRitardo) / 36500;
    const totaleVersamentoF24 = safeImposta + sanzioneRidotta + interessiLegali;

    return {
      impostaDovuta: safeImposta,
      giorniRitardo,
      tipologiaRavvedimento: tipologia,
      percentualeSanzione,
      sanzioneRidotta,
      interessiLegali,
      totaleVersamentoF24,
    };
  }, [imposta, dataScadenza, dataPagamento, tassoInteresseLegale]);

  const res = calcolaRavvedimento();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Parametri Tributo Omesso</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setImposta(1200);
              setDataScadenza('2026-06-16');
              setDataPagamento('2026-07-20');
              setTassoInteresseLegale(2.0);
            }}
            className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reimposta</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Importo Tributo da Sanare (€)</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {imposta.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={50}
                value={imposta || ''}
                onChange={(e) => setImposta(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 1200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                <span>Data di Scadenza Originaria</span>
              </label>
              <input
                type="date"
                value={dataScadenza}
                onChange={(e) => setDataScadenza(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Data di Effettivo Pagamento</span>
              </label>
              <input
                type="date"
                value={dataPagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Saggio di Interesse Legale Annuo (%)</span>
              <span className="font-mono text-sky-700 font-bold">{tassoInteresseLegale}%</span>
            </label>
            <input
              type="number"
              step={0.1}
              value={tassoInteresseLegale}
              onChange={(e) => setTassoInteresseLegale(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Calcolo conforme alla circolare n. 42/E dell’Agenzia delle Entrate.</span>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Totale da Versare con F24
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
            {res.giorniRitardo} Giorni
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
          <span className="text-xs text-sky-200 font-medium">Importo Totale Complessivo</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            € {res.totaleVersamentoF24.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-sky-300 font-medium block">
            {res.tipologiaRavvedimento}
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Tributo base omesso</span>
            <span className="font-mono text-white">€ {res.impostaDovuta.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Sanzione ridotta ({res.percentualeSanzione.toFixed(2)}%)</span>
            <span className="font-mono text-amber-400">€ {res.sanzioneRidotta.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Interessi legali ({res.giorniRitardo} giorni)</span>
            <span className="font-mono text-emerald-400">€ {res.interessiLegali.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong>Codici Tributo F24:</strong> Nel modello F24 vanno compilate tre righe distinte: 1) Codice originario del tributo, 2) Codice tributo sanzione (es. 8901, 8911 o 8918 per IMU), 3) Codice tributo interessi (es. 1989 o 1991).
        </div>
      </div>
    </div>
  );
}

