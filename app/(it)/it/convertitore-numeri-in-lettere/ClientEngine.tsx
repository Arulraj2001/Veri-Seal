'use client';

import * as React from 'react';
import {
  FileText,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react';

const UNITA = ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'];
const DIECI_DICIANNOVE = [
  'dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove',
];
const DECINE = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];

function convertUnder1000(n: number): string {
  let str = '';
  const centinaia = Math.floor(n / 100);
  const restoCentinaia = n % 100;

  if (centinaia > 0) {
    if (centinaia === 1) {
      str += 'cento';
    } else {
      str += UNITA[centinaia] + 'cento';
    }
  }

  if (restoCentinaia >= 10 && restoCentinaia < 20) {
    str += DIECI_DICIANNOVE[restoCentinaia - 10];
  } else {
    const d = Math.floor(restoCentinaia / 10);
    const u = restoCentinaia % 10;
    if (d > 0) {
      let decinaStr = DECINE[d];
      if (u === 1 || u === 8) {
        decinaStr = decinaStr.slice(0, -1);
      }
      str += decinaStr;
    }
    if (u > 0) {
      str += UNITA[u];
    }
  }

  return str;
}

function convertNumberToItalianWords(num: number): string {
  if (num === 0) return 'zero';
  if (num < 0) return 'meno ' + convertNumberToItalianWords(Math.abs(num));

  let n = Math.floor(num);
  let res = '';

  const miliardi = Math.floor(n / 1000000000);
  n %= 1000000000;
  if (miliardi === 1) {
    res += 'unmiliardo';
  } else if (miliardi > 1) {
    res += convertNumberToItalianWords(miliardi) + 'miliardi';
  }

  const milioni = Math.floor(n / 1000000);
  n %= 1000000;
  if (milioni === 1) {
    res += 'unmilione';
  } else if (milioni > 1) {
    res += convertNumberToItalianWords(milioni) + 'milioni';
  }

  const mila = Math.floor(n / 1000);
  n %= 1000;
  if (mila === 1) {
    res += 'mille';
  } else if (mila > 1) {
    res += convertUnder1000(mila) + 'mila';
  }

  if (n > 0) {
    res += convertUnder1000(n);
  }

  return res;
}

export function ConvertitoreNumeriInLettereClient() {
  const [valoreInput, setValoreInput] = React.useState<string>('3450.50');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const numFloat = parseFloat(valoreInput.replace(',', '.')) || 0;
  const parteIntera = Math.floor(Math.abs(numFloat));
  const parteDecimale = Math.round((Math.abs(numFloat) - parteIntera) * 100);

  const interaInLettere = convertNumberToItalianWords(parteIntera);
  const decimaleInLettere = convertNumberToItalianWords(parteDecimale);

  const formatoAssegno = `${interaInLettere}/${String(parteDecimale).padStart(2, '0')}`;
  const formatoAssegnoMaiuscolo = formatoAssegno.toUpperCase();
  const formatoAttoNotarile = `${interaInLettere} euro e ${decimaleInLettere} centesimi`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Importo da Trascrivere</span>
          </div>
          <button
            type="button"
            onClick={() => setValoreInput('3450.50')}
            className="text-xs text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reimposta</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex justify-between">
              <span>Cifra Numerica (€)</span>
              <span className="font-mono text-sky-700 dark:text-sky-400 font-bold">
                € {numFloat.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </label>
            <input
              type="text"
              value={valoreInput}
              onChange={(e) => setValoreInput(e.target.value)}
              placeholder="Es. 3450.50"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 text-base font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-all font-mono"
            />
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 pt-1">
            {['120.00', '1500.00', '3250.75', '10000.00', '125000.00'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setValoreInput(val)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 transition-colors"
              >
                € {val}
              </button>
            ))}
          </div>

          {/* Fac-simile Assegno */}
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-amber-200/80 dark:border-amber-800/80 pb-2">
              <span className="font-bold tracking-wider uppercase text-[10px] text-amber-800 dark:text-amber-300">
                Fac-Simile Assegno Bancario (Art. 9 R.D. 1736/33)
              </span>
              <span className="font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700 text-slate-900 dark:text-white">
                € **{numFloat.toFixed(2)}**
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-amber-700 dark:text-amber-400 uppercase block font-sans font-bold">
                A vista pagate per questo assegno bancario l&apos;importo di Euro:
              </span>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-slate-950 dark:text-white font-bold text-xs sm:text-sm break-all">
                {formatoAssegno}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Rispetta rigorosamente le elisioni vocaliche della lingua italiana (trentuno, quarantotto).</span>
        </div>
      </div>

      {/* Formats Output Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Formati Giuridici Disponibili
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
            Un-click Copy
          </span>
        </div>

        <div className="space-y-3">
          {/* Formato 1: Assegno minuscolo */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>1. Formato Assegno (Standard ABI)</span>
              <button
                type="button"
                onClick={() => handleCopy(formatoAssegno, 'assegno')}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'assegno' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'assegno' ? 'Copiato' : 'Copia'}</span>
              </button>
            </div>
            <p className="font-mono text-xs sm:text-sm text-emerald-300 font-bold break-all">
              {formatoAssegno}
            </p>
          </div>

          {/* Formato 2: Assegno MAIUSCOLO */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>2. Formato Assegno Maiuscolo</span>
              <button
                type="button"
                onClick={() => handleCopy(formatoAssegnoMaiuscolo, 'maiuscolo')}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'maiuscolo' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'maiuscolo' ? 'Copiato' : 'Copia'}</span>
              </button>
            </div>
            <p className="font-mono text-xs sm:text-sm text-sky-300 font-bold break-all">
              {formatoAssegnoMaiuscolo}
            </p>
          </div>

          {/* Formato 3: Atto Notarile / Legale */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>3. Rogito Notarile & Contratti</span>
              <button
                type="button"
                onClick={() => handleCopy(formatoAttoNotarile, 'notarile')}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'notarile' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'notarile' ? 'Copiato' : 'Copia'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-amber-300 font-medium">
              {formatoAttoNotarile}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

