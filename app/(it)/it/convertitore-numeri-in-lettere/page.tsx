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
  Copy,
  Check,
  Coins,
  BookOpen,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

// Dizionari linguistici per conversione numerica in lettere italiana continua
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
      // Elisione vocale prima di uno e otto (es. ventuno, quarantotto)
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

  // Miliardi
  const miliardi = Math.floor(n / 1000000000);
  n %= 1000000000;
  if (miliardi === 1) {
    res += 'unmiliardo';
  } else if (miliardi > 1) {
    res += convertNumberToItalianWords(miliardi) + 'miliardi';
  }

  // Milioni
  const milioni = Math.floor(n / 1000000);
  n %= 1000000;
  if (milioni === 1) {
    res += 'unmilione';
  } else if (milioni > 1) {
    res += convertNumberToItalianWords(milioni) + 'milioni';
  }

  // Mila
  const mila = Math.floor(n / 1000);
  n %= 1000;
  if (mila === 1) {
    res += 'mille';
  } else if (mila > 1) {
    res += convertUnder1000(mila) + 'mila';
  }

  // Centinaia, decine, unita
  if (n > 0) {
    res += convertUnder1000(n);
  }

  return res;
}

export default function ConvertitoreNumeriInLetterePage() {
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
  const formatoSoloNumero = interaInLettere;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Convertitore Numeri in Lettere</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Art. 9 R.D. 1736/1933 (Legge Assegno) & Prassi Notarile L. 89/1913</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Convertitore Numeri in Lettere per Assegni e Contratti <br className="hidden sm:inline" />
          <span className="text-sky-600">Trascrizione Giuridica Continua Senza Spazi</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Regola Giuridica Fondamentale:</strong> Ai sensi dell'<strong>Articolo 9 del Regio Decreto 1736/1933</strong>, in caso di discordanza tra la cifra in numeri e la somma scritta in lettere su un assegno bancario o circolare, <strong>prevale sempre la somma scritta in lettere</strong>. Negli assegni la dicitura va scritta in forma continua senza spazi, con i centesimi separati da una barra (es. <em>tremilaquattrocentocinquanta/50</em>).
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Importo da Trascrivere</span>
            </div>
            <button
              type="button"
              onClick={() => setValoreInput('3450.50')}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                <span>Cifra Numerica (€)</span>
                <span className="font-mono text-sky-700 font-bold">
                  € {numFloat.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </label>
              <input
                type="text"
                value={valoreInput}
                onChange={(e) => setValoreInput(e.target.value)}
                placeholder="Es. 3450.50"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-base font-bold text-slate-900 transition-all font-mono"
              />
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['120.00', '1500.00', '3250.75', '10000.00', '125000.00'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setValoreInput(val)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 transition-colors"
                >
                  € {val}
                </button>
              ))}
            </div>

            {/* Fac-simile Assegno */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-amber-200/80 pb-2">
                <span className="font-bold tracking-wider uppercase text-[10px] text-amber-800">
                  Fac-Simile Assegno Bancario (Art. 9 R.D. 1736/33)
                </span>
                <span className="font-bold bg-white px-2 py-0.5 rounded border border-amber-300 text-slate-900">
                  € **{numFloat.toFixed(2)}**
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-amber-700 uppercase block font-sans font-bold">
                  A vista pagate per questo assegno bancario l'importo di Euro:
                </span>
                <div className="bg-white p-2.5 rounded-xl border border-amber-200 text-slate-950 font-bold text-xs sm:text-sm break-all">
                  {formatoAssegno}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Regole Giuridiche sulla Compilazione degli Assegni e Contratti
          </h2>
          <p>
            Nella redazione dei titoli di credito (assegno bancario, assegno circolare, vaglia cambiario) e degli atti pubblici notarili disciplinati dalla <strong>Legge 16 febbraio 1913, n. 89</strong>, la corretta trascrizione degli importi in lettere è un requisito essenziale di validità e certezza.
          </p>
          <p>
            La regola cardinale stabilita dal legislatore all'<strong>Articolo 9 del Regio Decreto 1736/1933</strong> tutela la sicurezza dei traffici giuridici: se l'importo indicato in cifre differisce da quello trascritto in lettere, la banca o l'autorità giudiziaria considererà vincolante ed esecutiva unicamente la cifra trascritta in lettere per esteso.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Convenzione di Scrittura Continua
          </h3>
          <p>
            Per evitare l'interpolazione o l'aggiunta dolosa di parole tra i termini (es. inserire la parola "cento" prima di "mila"), la prassi bancaria e notarile italiana impone che la dicitura sia redatta in un'<strong>unica parola continua priva di spazi bianchi</strong> (es. <em>duemilacinquecento/00</em>).
          </p>
          <p className="text-xs text-slate-600">
            I decimali vanno sempre indicati dopo la barra obliqua anche qualora siano nulli (es. <em>/00</em>), per impedire qualsiasi successiva alterazione delle quote centesimali.
          </p>
        </div>
      </div>
    </div>
  );
}
