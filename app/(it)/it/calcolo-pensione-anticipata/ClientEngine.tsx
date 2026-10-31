'use client';

import * as React from 'react';
import {
  Calculator,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface PensioneResult {
  etaAttuale: number;
  anniContributi: number;
  sesso: 'M' | 'F';
  settore: 'privato' | 'pubblico' | 'autonomo';
  idoneoVecchiaia: boolean;
  mancanoAnniVecchiaia: number;
  idoneoAnticipataOrdinaria: boolean;
  mancanoAnniAnticipata: number;
  idoneoQuota103: boolean;
  mancanoAnniQuota103: number;
  mancanoEtaQuota103: number;
  tettoMassimoQuota103: number;
  finestraMobileMesi: number;
  primaDecorrenzaUtile: string;
}

export function CalcoloPensioneAnticipataClient() {
  const [eta, setEta] = React.useState<number>(61);
  const [anniContributi, setAnniContributi] = React.useState<number>(40);
  const [sesso, setSesso] = React.useState<'M' | 'F'>('M');
  const [settore, setSettore] = React.useState<'privato' | 'pubblico' | 'autonomo'>('privato');

  const calcolaPensione = React.useCallback((): PensioneResult => {
    // 1. Pensione di Vecchiaia Ordinaria: 67 anni di età e 20 anni di contributi
    const idoneoVecchiaia = eta >= 67 && anniContributi >= 20;
    const mancanoAnniVecchiaia = Math.max(0, 67 - eta);

    // 2. Pensione Anticipata Ordinaria (Legge Fornero):
    // Uomini: 42 anni e 10 mesi (42.83 anni)
    // Donne: 41 anni e 10 mesi (41.83 anni)
    const sogliaContributivaAnticipata = sesso === 'M' ? 42 + 10 / 12 : 41 + 10 / 12;
    const idoneoAnticipataOrdinaria = anniContributi >= sogliaContributivaAnticipata;
    const mancanoAnniAnticipata = Math.max(0, sogliaContributivaAnticipata - anniContributi);

    // 3. Quota 103 (Pensione Flessibile):
    // Almeno 62 anni di età E almeno 41 anni di contributi
    const idoneoQuota103 = eta >= 62 && anniContributi >= 41;
    const mancanoAnniQuota103 = Math.max(0, 41 - anniContributi);
    const mancanoEtaQuota103 = Math.max(0, 62 - eta);

    // Tetto massimo Quota 103: 4 volte il trattamento minimo INPS (~598,61 € * 4 = ~2.394 € lordi mensili)
    const tettoMassimoQuota103 = 2394.44;

    // Finestra mobile: 7 mesi per privati, 9 mesi per pubblici
    const finestraMobileMesi = settore === 'pubblico' ? 9 : 7;

    // Stima prima decorrenza utile
    let primaDecorrenzaUtile = 'In corso di maturazione';
    if (idoneoQuota103) {
      primaDecorrenzaUtile = `Immediata (previa finestra di ${finestraMobileMesi} mesi)`;
    } else if (idoneoAnticipataOrdinaria) {
      primaDecorrenzaUtile = 'Immediata (finestra mobile 3 mesi)';
    } else if (idoneoVecchiaia) {
      primaDecorrenzaUtile = 'Immediata (dal primo giorno del mese successivo al compimento)';
    } else {
      const minAnniMancanti = Math.min(
        mancanoAnniVecchiaia,
        mancanoAnniAnticipata,
        Math.max(mancanoAnniQuota103, mancanoEtaQuota103)
      );
      const annoStima = new Date().getFullYear() + Math.ceil(minAnniMancanti);
      primaDecorrenzaUtile = `Stimata intorno all'anno ${annoStima}`;
    }

    return {
      etaAttuale: eta,
      anniContributi,
      sesso,
      settore,
      idoneoVecchiaia,
      mancanoAnniVecchiaia,
      idoneoAnticipataOrdinaria,
      mancanoAnniAnticipata,
      idoneoQuota103,
      mancanoAnniQuota103,
      mancanoEtaQuota103,
      tettoMassimoQuota103,
      finestraMobileMesi,
      primaDecorrenzaUtile,
    };
  }, [eta, anniContributi, sesso, settore]);

  const res = calcolaPensione();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Dati Anagrafici e Contributivi</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEta(61);
              setAnniContributi(40);
              setSesso('M');
              setSettore('privato');
            }}
            className="text-xs text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reimposta</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Età e Contributi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Età Anagrafica Attuale</label>
              <input
                type="number"
                min={50}
                max={75}
                value={eta}
                onChange={(e) => setEta(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Anni di Contributi Versati</label>
              <input
                type="number"
                min={10}
                max={50}
                value={anniContributi}
                onChange={(e) => setAnniContributi(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950"
              />
            </div>
          </div>

          {/* Sesso & Settore */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Genere / Sesso</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSesso('M')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    sesso === 'M'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Uomo (M)
                </button>
                <button
                  type="button"
                  onClick={() => setSesso('F')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    sesso === 'F'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Donna (F)
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Settore di Lavoro</label>
              <select
                value={settore}
                onChange={(e) => setSettore(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950"
              >
                <option value="privato">Dipendente Settore Privato (Finestra 7 Mesi)</option>
                <option value="pubblico">Dipendente Pubblico (Finestra 9 Mesi)</option>
                <option value="autonomo">Lavoratore Autonomo / Commerciante</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Valutazione preventiva basata sui requisiti di legge vigenti per il 2026.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Esito Compatibilità Previdenziale
          </span>
        </div>

        {/* Primary Result Banner */}
        <div
          className={`p-4 rounded-2xl border space-y-1 ${
            res.idoneoQuota103 || res.idoneoAnticipataOrdinaria || res.idoneoVecchiaia
              ? 'bg-emerald-950/40 border-emerald-800/40'
              : 'bg-amber-950/40 border-amber-800/40'
          }`}
        >
          <span className="text-xs font-medium text-slate-300">Prima Decorrenza Utile Stimata</span>
          <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white">
            {res.primaDecorrenzaUtile}
          </div>
        </div>

        {/* Detailed Options Comparison */}
        <div className="space-y-3 text-xs">
          {/* Quota 103 Status */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between items-center font-bold">
              <span className="text-white">1. Quota 103 (62 anni + 41 anni)</span>
              <span className={res.idoneoQuota103 ? 'text-emerald-400' : 'text-amber-400'}>
                {res.idoneoQuota103 ? 'REQUISITO SODDISFATTO' : 'NON ANCORA IDONEO'}
              </span>
            </div>
            {!res.idoneoQuota103 && (
              <div className="text-slate-400 text-[11px]">
                Mancano: {res.mancanoEtaQuota103 > 0 ? `${res.mancanoEtaQuota103.toFixed(1)} anni di età` : ''}{' '}
                {res.mancanoAnniQuota103 > 0 ? `${res.mancanoAnniQuota103.toFixed(1)} anni di contributi` : ''}
              </div>
            )}
          </div>

          {/* Anticipata Ordinaria Status */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between items-center font-bold">
              <span className="text-white">2. Anticipata Ordinaria Fornero</span>
              <span className={res.idoneoAnticipataOrdinaria ? 'text-emerald-400' : 'text-slate-400'}>
                {res.idoneoAnticipataOrdinaria ? 'REQUISITO SODDISFATTO' : 'IN MATURAZIONE'}
              </span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Richiesti {sesso === 'M' ? '42a 10m' : '41a 10m'} di contributi. Mancano: {res.mancanoAnniAnticipata.toFixed(1)} anni.
            </div>
          </div>

          {/* Vecchiaia Ordinaria Status */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between items-center font-bold">
              <span className="text-white">3. Pensione di Vecchiaia (67 anni)</span>
              <span className={res.idoneoVecchiaia ? 'text-emerald-400' : 'text-slate-400'}>
                {res.idoneoVecchiaia ? 'RAGGIUNTA' : `${res.mancanoAnniVecchiaia} anni al compimento`}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-200">Paletti Stringenti di Quota 103:</strong> Chi accede a Quota 103 subisce il ricalcolo interamente contributivo della pensione e non può cumulare la pensione con redditi da lavoro dipendente fino al compimento dei 67 anni (ammesso solo lavoro autonomo occasionale nel limite di 5.000 € lordi annui).
        </div>
      </div>
    </div>
  );
}

