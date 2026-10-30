'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Landmark,
  CreditCard,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

// Tabella Banche Italiane note tramite codice ABI
const BANCHE_ABI: Record<string, string> = {
  '01005': 'BNL - BNP Paribas',
  '01030': 'Banca Monte dei Paschi di Siena',
  '02008': 'UniCredit S.p.A.',
  '03002': 'Banca di Credito Cooperativo',
  '03069': 'Intesa Sanpaolo S.p.A.',
  '03111': 'UBI Banca (Intesa Sanpaolo)',
  '03138': 'Banca Reale',
  '03268': 'FinecoBank S.p.A.',
  '03015': 'CheBanca! / Mediobanca Premier',
  '03296': 'Banca Farmafactoring',
  '03475': 'Poste Italiane S.p.A. (BancoPosta)',
  '03032': 'Credito Emiliano (Credem)',
  '03062': 'Mediolanum S.p.A.',
  '03359': 'Banca Progetto',
  '03395': 'Banca Sella S.p.A.',
  '03440': 'Banca Sistema',
  '05034': 'Banco BPM S.p.A.',
  '05387': 'BPER Banca S.p.A.',
  '05696': 'Banca Popolare di Sondrio',
  '03608': 'Widiba (MPS)',
  '03634': 'Illimity Bank',
  '03681': 'Revolut Bank UAB (Filiale Italiana)',
  '03698': 'BBVA Sucursal en España (Filiale Italiana)',
};

// Algoritmo CIN Italiano (Associazione Bancaria Italiana)
const DISPARI: Record<string, number> = {
  '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
  A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18,
  N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23,
};

const PARI: Record<string, number> = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10, L: 11, M: 12,
  N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25,
};

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function calcolaCinItaliano(bban22: string): string {
  let somma = 0;
  for (let i = 0; i < bban22.length; i++) {
    const char = bban22[i].toUpperCase();
    if ((i + 1) % 2 !== 0) {
      somma += DISPARI[char] ?? 0;
    } else {
      somma += PARI[char] ?? 0;
    }
  }
  const resto = somma % 26;
  return ALFABETO[resto];
}

// Controllo Modulo 97-10 (ISO 7064)
function verificaMod97(ibanStr: string): boolean {
  const rearranged = ibanStr.slice(4) + ibanStr.slice(0, 4);
  let numericStr = '';
  for (let i = 0; i < rearranged.length; i++) {
    const code = rearranged.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      numericStr += (code - 55).toString();
    } else {
      numericStr += rearranged[i];
    }
  }

  // Esecuzione algoritmo di modulo a pezzi per evitare overflow
  let remainder = 0;
  for (let i = 0; i < numericStr.length; i += 7) {
    const block = remainder.toString() + numericStr.substring(i, i + 7);
    remainder = parseInt(block, 10) % 97;
  }
  return remainder === 1;
}

export default function ValidatoreIbanBancarioItaliaPage() {
  const [ibanInput, setIbanInput] = React.useState<string>('IT60X0542811101000000123456');
  const [copied, setCopied] = React.useState<boolean>(false);

  const cleanIban = ibanInput.replace(/\s+/g, '').toUpperCase();

  const analisi = React.useMemo(() => {
    if (!cleanIban) {
      return {
        lunghezzaOk: false,
        formatoOk: false,
        mod97Ok: false,
        cinOk: false,
        valido: false,
        paese: '',
        abi: '',
        cab: '',
        conto: '',
        banca: '',
        cinCalcolato: '',
        cinPresente: '',
      };
    }

    const paese = cleanIban.substring(0, 2);
    const lunghezzaOk = cleanIban.length === 27; // Lunghezza standard Italia
    const formatoRegex = /^[A-Z]{2}[0-9]{2}[A-Z][0-9]{10}[A-Z0-9]{12}$/;
    const formatoOk = formatoRegex.test(cleanIban);

    const mod97Ok = verificaMod97(cleanIban);

    let cinOk = false;
    let abi = '';
    let cab = '';
    let conto = '';
    let cinPresente = '';
    let cinCalcolato = '';
    let banca = '';

    if (cleanIban.length >= 27 && paese === 'IT') {
      cinPresente = cleanIban.charAt(4);
      abi = cleanIban.substring(5, 10);
      cab = cleanIban.substring(10, 15);
      conto = cleanIban.substring(15, 27);
      const bban22 = cleanIban.substring(5, 27);
      cinCalcolato = calcolaCinItaliano(bban22);
      cinOk = cinPresente === cinCalcolato;
      banca = BANCHE_ABI[abi] || 'Istituto di Credito Censito ABI';
    }

    const valido = paese === 'IT' ? lunghezzaOk && formatoOk && mod97Ok && cinOk : mod97Ok;

    return {
      lunghezzaOk,
      formatoOk,
      mod97Ok,
      cinOk,
      valido,
      paese,
      abi,
      cab,
      conto,
      banca,
      cinCalcolato,
      cinPresente,
    };
  }, [cleanIban]);

  const formattedIban = cleanIban.replace(/(.{4})/g, '$1 ').trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedIban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Validatore IBAN Bancario</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>ISO 13616, ISO 7064 & Regole Associazione Bancaria Italiana (ABI)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Validatore IBAN Bancario Italiano <br className="hidden sm:inline" />
          <span className="text-sky-600">Verifica Algoritmo Mod 97-10, Carattere CIN & Banca ABI</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Tecnica Diretta:</strong> L'IBAN italiano è composto da <strong>27 caratteri alfanumerici</strong>: codice paese (IT), due cifre di controllo internazionali (calcolate con algoritmo <em>ISO 7064 Modulo 97-10</em>), il carattere <strong>CIN</strong> (carattere di controllo interno BBAN), 5 cifre di codice <strong>ABI</strong> dell'istituto di credito, 5 cifre di <strong>CAB</strong> dello sportello e 12 caratteri per il conto corrente. Questo strumento valida in tempo reale la correttezza matematica di tutte le componenti.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-sky-600" />
              <span>Inserimento Coordinate Bancarie</span>
            </div>
            <button
              type="button"
              onClick={() => setIbanInput('IT60X0542811101000000123456')}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Esempio Valido</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                <span>Codice IBAN (27 caratteri per l'Italia)</span>
                <span className="font-mono text-sky-700 font-bold">{cleanIban.length} / 27</span>
              </label>
              <input
                type="text"
                value={ibanInput}
                onChange={(e) => setIbanInput(e.target.value)}
                placeholder="Es. IT60X0542811101000000123456"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-mono font-bold text-slate-900 uppercase tracking-wider transition-all"
              />
            </div>

            {/* Visual Block Representation */}
            {cleanIban.length >= 27 && cleanIban.startsWith('IT') && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Scomposizione Strutturale dell'IBAN:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-sans">Paese & Cifre</span>
                    <span className="font-bold text-slate-800">{cleanIban.substring(0, 4)}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-sans">CIN</span>
                    <span className="font-bold text-sky-700">{analisi.cinPresente}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-sans">Codice ABI</span>
                    <span className="font-bold text-slate-800">{analisi.abi}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-sans">Codice CAB</span>
                    <span className="font-bold text-slate-800">{analisi.cab}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 block font-sans">Numero Conto</span>
                    <span className="font-bold text-slate-800 truncate block">{analisi.conto}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Nessuna informazione bancaria viene registrata o salvata: elaborazione locale al 100%.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Esito Verifica Matematica
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md font-mono ${
                analisi.valido
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {analisi.valido ? 'IBAN Ufficialmente Valido' : 'Codice Non Conforme'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-2">
            <span className="text-xs text-sky-200 font-medium">IBAN Formattato (SEPA)</span>
            <div className="text-base sm:text-lg font-mono font-bold text-white break-all tracking-wider">
              {formattedIban || '—'}
            </div>
            {analisi.banca && (
              <div className="flex items-center gap-2 text-xs text-emerald-300 pt-1 border-t border-sky-800/50">
                <Landmark className="w-4 h-4 shrink-0" />
                <span className="font-medium">{analisi.banca}</span>
              </div>
            )}
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Lunghezza corretta (27 caratteri)</span>
              <span className={`font-mono font-bold ${analisi.lunghezzaOk ? 'text-emerald-400' : 'text-rose-400'}`}>
                {analisi.lunghezzaOk ? 'Superato' : 'Fallito'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Algoritmo ISO 7064 Modulo 97-10</span>
              <span className={`font-mono font-bold ${analisi.mod97Ok ? 'text-emerald-400' : 'text-rose-400'}`}>
                {analisi.mod97Ok ? 'Superato' : 'Fallito'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Verifica Carattere CIN (ABI)</span>
              <span className={`font-mono font-bold ${analisi.cinOk ? 'text-emerald-400' : 'text-rose-400'}`}>
                {analisi.cinOk ? `Valido (${analisi.cinPresente})` : `Errato (atteso ${analisi.cinCalcolato})`}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={!cleanIban}
            onClick={handleCopy}
            className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'IBAN Copiato negli Appunti!' : 'Copia IBAN Formattato'}</span>
          </button>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            La Struttura dell'IBAN in Italia e l'Algoritmo di Controllo
          </h2>
          <p>
            L'<strong>International Bank Account Number (IBAN)</strong> è lo standard internazionale (ISO 13616) creato dal Comitato Europeo per gli Standard Bancari (ECBS) e recepito nel sistema SEPA con il <strong>Regolamento UE n. 260/2012</strong> per rendere i bonifici e gli addebiti diretti europei sicuri, rapidi ed esenti da errori di digitazione.
          </p>
          <p>
            In Italia l'IBAN ha una lunghezza fissa di <strong>27 caratteri</strong> ed è composto da due parti distinte:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              <strong>Prefisso Internazionale (4 caratteri):</strong> Composto dal codice nazione a due lettere (<strong>IT</strong>) e da due cifre numeriche di controllo generate secondo lo standard matematico <em>ISO 7064 Modulo 97-10</em>.
            </li>
            <li>
              <strong>Codice BBAN Nazionale (23 caratteri):</strong> Composto da 1 carattere di controllo interno alfabetico (<strong>CIN</strong>), 5 cifre di codice <strong>ABI</strong> identificativo della banca emittente, 5 cifre di codice <strong>CAB</strong> identificativo della filiale bancaria e 12 caratteri del conto corrente.
            </li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Come Funziona il Doppio Controllo Algoritmico
          </h3>
          <p>
            A differenza di altri paesi europei che utilizzano un solo algoritmo di controllo, il sistema bancario italiano dispone di un doppio livello di verifica:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">1. Controllo CIN (Pesi Pari / Dispari)</strong>
              <p className="text-slate-600">
                Il CIN garantisce che i 22 caratteri successivi (ABI, CAB, Conto) non contengano errori di battitura o inversione di cifre mediante la tabella di conversione pesata dell'ABI.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">2. Modulo 97-10 Internazionale</strong>
              <p className="text-slate-600">
                Sposta i primi 4 caratteri in fondo, converte le lettere in valori numerici (A=10, B=11... Z=35) ed esegue la divisione intera per 97: il resto finale deve risultare esattamente 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
