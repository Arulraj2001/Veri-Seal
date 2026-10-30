'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  User,
  Building2,
  Calendar,
  MapPin,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface DecodedCf {
  dataNascita: string;
  sesso: 'Maschio' | 'Femmina';
  codiceComune: string;
  omocodiaRilevata: boolean;
}

export default function VerificaPartitaIvaCfPage() {
  const [valoreInput, setValoreInput] = React.useState<string>('RSSMRA80A01H501U');
  const [tipoVerifica, setTipoVerifica] = React.useState<'cf' | 'piva'>('cf');

  // Algoritmo Ufficiale Controllo Partita IVA (11 cifre, Modulo 10)
  const validaPartitaIva = (piva: string): { isValid: boolean; motivo: string } => {
    const clean = piva.trim();
    if (!/^[0-9]{11}$/.test(clean)) {
      return { isValid: false, motivo: 'La Partita IVA deve essere composta esattamente da 11 cifre numeriche.' };
    }

    let s = 0;
    for (let i = 0; i < 11; i++) {
      const n = parseInt(clean[i], 10);
      if (i % 2 === 0) {
        // Posizione dispari (1°, 3°, 5°...)
        s += n;
      } else {
        // Posizione pari (2°, 4°, 6°...): raddoppio
        const r = n * 2;
        s += r > 9 ? r - 9 : r;
      }
    }

    if (s % 10 === 0) {
      return { isValid: true, motivo: 'Partita IVA formalmente valida secondo l’algoritmo dell’Agenzia delle Entrate.' };
    } else {
      return { isValid: false, motivo: 'Cifra di controllo non valida: la Partita IVA non rispetta l’algoritmo di Luhn ministeriale.' };
    }
  };

  // Tabella caratteri per Codice Fiscale (D.M. 23/12/1976)
  const tabDispari: Record<string, number> = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
    'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
    'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
    'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23,
  };

  const tabPari: Record<string, number> = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
    'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
    'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25,
  };

  const mesiMap: Record<string, string> = {
    A: 'Gennaio', B: 'Febbraio', C: 'Marzo', D: 'Aprile', E: 'Maggio', H: 'Giugno',
    L: 'Luglio', M: 'Agosto', P: 'Settembre', R: 'Ottobre', S: 'Novembre', T: 'Dicembre',
  };

  const validaCodiceFiscale = (cf: string): { isValid: boolean; motivo: string; dati?: DecodedCf } => {
    const clean = cf.trim().toUpperCase();
    if (clean.length !== 16) {
      return { isValid: false, motivo: 'Il Codice Fiscale deve contenere esattamente 16 caratteri alfanumerici.' };
    }

    // Calcolo del carattere di controllo (16° carattere)
    let somma = 0;
    for (let i = 0; i < 15; i++) {
      const char = clean[i];
      if (i % 2 === 0) {
        // Posizione dispari (1°, 3°, 5°...)
        somma += tabDispari[char] ?? 0;
      } else {
        // Posizione pari (2°, 4°, 6°...)
        somma += tabPari[char] ?? 0;
      }
    }

    const checkCharExpected = String.fromCharCode(65 + (somma % 26));
    const checkCharActual = clean[15];

    if (checkCharExpected !== checkCharActual) {
      return {
        isValid: false,
        motivo: `Carattere di controllo errato: atteso "${checkCharExpected}", trovato "${checkCharActual}".`,
      };
    }

    // Decodifica dati anagrafici
    const anno2Digit = clean.substring(6, 8);
    const meseChar = clean[8];
    let giornoInt = parseInt(clean.substring(9, 11), 10);
    let sesso: 'Maschio' | 'Femmina' = 'Maschio';

    if (giornoInt > 40) {
      sesso = 'Femmina';
      giornoInt -= 40;
    }

    const codiceComune = clean.substring(11, 15);
    const meseNome = mesiMap[meseChar] || 'Mese ' + meseChar;

    return {
      isValid: true,
      motivo: 'Codice Fiscale formalmente corretto e conforme al D.M. 23/12/1976.',
      dati: {
        dataNascita: `${giornoInt} ${meseNome} (anno di nascita '..${anno2Digit}')`,
        sesso,
        codiceComune,
        omocodiaRilevata: /[L-V]/.test(clean.substring(9, 11)),
      },
    };
  };

  const esitoPiva = validaPartitaIva(valoreInput);
  const esitoCf = validaCodiceFiscale(valoreInput);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Verifica Partita IVA & CF</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Algoritmi Ufficiali Ministero Finanze & Agenzia delle Entrate</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Verifica Partita IVA e Codice Fiscale <br className="hidden sm:inline" />
          <span className="text-sky-600">Validatore di Controllo e Decodifica Anagrafica</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Diretta:</strong> Il validatore esegue in tempo reale l'algoritmo matematico ufficiale di controllo: il <strong>Modulo 10 di Luhn</strong> per le Partite IVA (11 cifre) e la <strong>tabella di congruenza alfanumerica</strong> (D.M. 23/12/1976) per il Codice Fiscale (16 caratteri), estraendo sesso, data di nascita e codice catastale del comune di nascita. 100% nel browser senza interrogazioni di rete esterne.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Inserisci Codice</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setTipoVerifica('cf');
                  setValoreInput('RSSMRA80A01H501U');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  tipoVerifica === 'cf' ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Codice Fiscale
              </button>
              <button
                type="button"
                onClick={() => {
                  setTipoVerifica('piva');
                  setValoreInput('00743110157');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  tipoVerifica === 'piva' ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Partita IVA
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                {tipoVerifica === 'cf' ? 'Codice Fiscale (16 Caratteri)' : 'Partita IVA (11 Cifre)'}
              </label>
              <input
                type="text"
                maxLength={tipoVerifica === 'cf' ? 16 : 11}
                value={valoreInput}
                onChange={(e) => setValoreInput(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-base font-mono font-bold text-slate-900 tracking-wider transition-all uppercase"
                placeholder={tipoVerifica === 'cf' ? 'RSSMRA80A01H501U' : '00743110157'}
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Nessun dato viene salvato o trasmesso: verifica logica algoritmica 100% privata in memoria locale.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Esito Validazione Formale
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md font-mono ${
              (tipoVerifica === 'cf' ? esitoCf.isValid : esitoPiva.isValid)
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-rose-500/20 text-rose-300'
            }`}>
              {(tipoVerifica === 'cf' ? esitoCf.isValid : esitoPiva.isValid) ? 'VALIDO' : 'NON VALIDO'}
            </span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-2 ${
            (tipoVerifica === 'cf' ? esitoCf.isValid : esitoPiva.isValid)
              ? 'bg-emerald-950/40 border-emerald-800/40'
              : 'bg-rose-950/40 border-rose-800/40'
          }`}>
            <div className="flex items-center gap-2">
              {(tipoVerifica === 'cf' ? esitoCf.isValid : esitoPiva.isValid) ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              )}
              <span className="text-sm font-bold text-white">
                {(tipoVerifica === 'cf' ? esitoCf.isValid : esitoPiva.isValid)
                  ? 'Codice Matematicamente Valido'
                  : 'Errore nel Codice Inserito'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tipoVerifica === 'cf' ? esitoCf.motivo : esitoPiva.motivo}
            </p>
          </div>

          {/* Decoded CF Info */}
          {tipoVerifica === 'cf' && esitoCf.isValid && esitoCf.dati && (
            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-sky-400" /> Data di Nascita:</span>
                <span className="font-mono text-white font-bold">{esitoCf.dati.dataNascita}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-sky-400" /> Sesso:</span>
                <span className="font-mono text-white font-bold">{esitoCf.dati.sesso}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-300">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-400" /> Codice Catastale Comune:</span>
                <span className="font-mono font-bold text-emerald-400">{esitoCf.dati.codiceComune}</span>
              </div>
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <strong>Nota di Conformità:</strong> Il test verifica l'integrità logica dei caratteri di controllo. Per verificare l'effettiva esistenza attiva all'Anagrafe Tributaria consultare il portale dell'Agenzia delle Entrate o il sistema europeo VIES.
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          La Struttura del Codice Fiscale e della Partita IVA in Italia
        </h2>
        <p>
          Il Codice Fiscale italiano fu introdotto con il D.P.R. 605/1973 per identificare ai fini fiscali le persone fisiche. Si compone di 16 caratteri: 3 per il cognome, 3 per il nome, 2 cifre per l'anno di nascita, 1 lettera per il mese, 2 cifre per il giorno e sesso, 4 caratteri alfanumerici per il codice catastale del comune di nascita e l'ultimo carattere di controllo calcolato tramite algoritmo matematico.
        </p>
      </div>
    </div>
  );
}
