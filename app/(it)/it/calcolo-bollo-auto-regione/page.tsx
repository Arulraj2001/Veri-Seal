'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Car,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  Gauge,
  Calendar,
  Building,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

const REGIONI_TARIFFARI: Record<string, { nome: string; coeffMult: number; scontoDomiciliazione: number }> = {
  nazionale: { nome: 'Tariffa Nazionale Base (D.P.R. 39/53)', coeffMult: 1.0, scontoDomiciliazione: 0 },
  lombardia: { nome: 'Lombardia (Sconto 15% Domiciliazione)', coeffMult: 1.0, scontoDomiciliazione: 0.15 },
  lazio: { nome: 'Lazio (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
  campania: { nome: 'Campania (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
  piemonte: { nome: 'Piemonte (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
  veneto: { nome: 'Veneto (Tariffa Ordinaria)', coeffMult: 1.0, scontoDomiciliazione: 0 },
  emilia_romagna: { nome: 'Emilia-Romagna (Tariffa Ordinaria)', coeffMult: 1.0, scontoDomiciliazione: 0 },
  toscana: { nome: 'Toscana (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
  sicilia: { nome: 'Sicilia (Tariffa Ordinaria)', coeffMult: 1.0, scontoDomiciliazione: 0 },
  puglia: { nome: 'Puglia (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
};

interface BolloResult {
  kwEffettivi: number;
  cvEquivalenti: number;
  bolloOrdinarioBase: number;
  scontoApplicato: number;
  bolloOrdinarioFinale: number;
  superbolloDovuto: number;
  totaleComplessivo: number;
  kwSuperbollo: number;
  aliquotaSuperbolloKw: number;
}

export default function CalcoloBolloAutoRegionePage() {
  const [potenzaInput, setPotenzaInput] = React.useState<number>(110);
  const [unitaPotenza, setUnitaPotenza] = React.useState<'kw' | 'cv'>('kw');
  const [classeEuro, setClasseEuro] = React.useState<string>('euro6');
  const [regione, setRegione] = React.useState<string>('lombardia');
  const [alimentazione, setAlimentazione] = React.useState<'termica' | 'ibrida' | 'elettrica' | 'gpl_metano'>('termica');
  const [annoImmatricolazione, setAnnoImmatricolazione] = React.useState<number>(2023);
  const [domiciliazioneAttiva, setDomiciliazioneAttiva] = React.useState<boolean>(true);

  const calcolaBollo = React.useCallback((): BolloResult => {
    // 1 kW = 1.35962 CV -> CV / 1.35962 = kW
    const safeInput = Math.max(0, potenzaInput);
    const kwEffettivi = unitaPotenza === 'kw' ? safeInput : safeInput / 1.35962;
    const cvEquivalenti = unitaPotenza === 'cv' ? safeInput : safeInput * 1.35962;

    // Se elettrica pura, esenzione totale primi 5 anni (in Lombardia e Piemonte esenzione perenne)
    if (alimentazione === 'elettrica') {
      return {
        kwEffettivi,
        cvEquivalenti,
        bolloOrdinarioBase: 0,
        scontoApplicato: 0,
        bolloOrdinarioFinale: 0,
        superbolloDovuto: 0,
        totaleComplessivo: 0,
        kwSuperbollo: 0,
        aliquotaSuperbolloKw: 0,
      };
    }

    // Tariffe base per kW
    let tariffaFino100 = 2.58;
    let tariffaOltre100 = 3.87;

    switch (classeEuro) {
      case 'euro6':
      case 'euro5':
      case 'euro4':
        tariffaFino100 = 2.58;
        tariffaOltre100 = 3.87;
        break;
      case 'euro3':
        tariffaFino100 = 2.70;
        tariffaOltre100 = 4.05;
        break;
      case 'euro2':
        tariffaFino100 = 2.80;
        tariffaOltre100 = 4.20;
        break;
      case 'euro1':
        tariffaFino100 = 2.90;
        tariffaOltre100 = 4.35;
        break;
      case 'euro0':
      default:
        tariffaFino100 = 3.00;
        tariffaOltre100 = 4.50;
        break;
    }

    // Riduzione 75% per GPL/Metano nativo
    if (alimentazione === 'gpl_metano') {
      tariffaFino100 *= 0.25;
      tariffaOltre100 *= 0.25;
    }

    const regConfig = REGIONI_TARIFFARI[regione] || REGIONI_TARIFFARI.nazionale;

    let bolloLordo = 0;
    if (kwEffettivi <= 100) {
      bolloLordo = kwEffettivi * tariffaFino100 * regConfig.coeffMult;
    } else {
      bolloLordo =
        (100 * tariffaFino100 + (kwEffettivi - 100) * tariffaOltre100) * regConfig.coeffMult;
    }

    // Sconto domiciliazione bancaria
    const scontoApplicato =
      domiciliazioneAttiva && regConfig.scontoDomiciliazione > 0
        ? bolloLordo * regConfig.scontoDomiciliazione
        : 0;

    const bolloOrdinarioFinale = Math.max(0, bolloLordo - scontoApplicato);

    // Calcolo Superbollo Art. 23 D.L. 201/2011 (20€ per ogni kW eccedente 185 kW)
    let superbolloDovuto = 0;
    let kwSuperbollo = 0;
    let aliquotaSuperbolloKw = 20;

    if (kwEffettivi > 185) {
      kwSuperbollo = Math.ceil(kwEffettivi - 185);
      const annoCorrente = 2026;
      const anniVeicolo = Math.max(0, annoCorrente - annoImmatricolazione);

      if (anniVeicolo > 20) {
        aliquotaSuperbolloKw = 0; // Esente oltre 20 anni
      } else if (anniVeicolo > 15) {
        aliquotaSuperbolloKw = 3.0; // 15% di 20€
      } else if (anniVeicolo > 10) {
        aliquotaSuperbolloKw = 6.0; // 30% di 20€
      } else if (anniVeicolo > 5) {
        aliquotaSuperbolloKw = 12.0; // 60% di 20€
      } else {
        aliquotaSuperbolloKw = 20.0; // Intero
      }

      superbolloDovuto = kwSuperbollo * aliquotaSuperbolloKw;
    }

    const totaleComplessivo = bolloOrdinarioFinale + superbolloDovuto;

    return {
      kwEffettivi,
      cvEquivalenti,
      bolloOrdinarioBase: bolloLordo,
      scontoApplicato,
      bolloOrdinarioFinale,
      superbolloDovuto,
      totaleComplessivo,
      kwSuperbollo,
      aliquotaSuperbolloKw,
    };
  }, [
    potenzaInput,
    unitaPotenza,
    classeEuro,
    regione,
    alimentazione,
    annoImmatricolazione,
    domiciliazioneAttiva,
  ]);

  const res = calcolaBollo();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Calcolo Bollo Auto & Superbollo</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>D.P.R. 39/1953, D.L. 201/2011 (Superbollo) & Delibere Regionali</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Bollo Auto e Superbollo Regionale <br className="hidden sm:inline" />
          <span className="text-sky-600">Tariffa per kW/CV, Classe Euro ed Esenzioni</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Tributaria Diretta:</strong> Il <strong>Bollo Auto</strong> è una tassa di possesso regionale calcolata sulla base della potenza del motore (in <strong>kW</strong> o cavalli vapore CV) e della classe ecologica Euro. Per potenze superiori a <strong>185 kW (252 CV)</strong> scatta inoltre il <strong>Superbollo erariale</strong> (Art. 23 D.L. 201/2011) pari a 20 € per ogni chilowatt eccedente, che si riduce al 60% dopo 5 anni, al 30% dopo 10 anni, al 15% dopo 15 anni e si azzera dopo 20 anni.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Car className="w-4 h-4 text-sky-600" />
              <span>Specifiche del Veicolo</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setPotenzaInput(110);
                setUnitaPotenza('kw');
                setClasseEuro('euro6');
                setRegione('lombardia');
                setAlimentazione('termica');
                setAnnoImmatricolazione(2023);
                setDomiciliazioneAttiva(true);
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Potenza in kW o CV */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Potenza Motore ({unitaPotenza.toUpperCase()})
                </label>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setUnitaPotenza('kw')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      unitaPotenza === 'kw' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    kW
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitaPotenza('cv')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      unitaPotenza === 'cv' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    CV (Cavalli)
                  </button>
                </div>
              </div>
              <input
                type="number"
                min={1}
                step={5}
                value={potenzaInput || ''}
                onChange={(e) => setPotenzaInput(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder={unitaPotenza === 'kw' ? 'Es. 110 kW' : 'Es. 150 CV'}
              />
              <span className="text-[11px] text-slate-500 block font-mono">
                {res.kwEffettivi.toFixed(1)} kW corrispondono a {res.cvEquivalenti.toFixed(1)} CV
              </span>
            </div>

            {/* Regione di Residenza */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Regione di Residenza Intestatario</label>
              <select
                value={regione}
                onChange={(e) => setRegione(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {Object.entries(REGIONI_TARIFFARI).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Classe Euro & Alimentazione */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Classe Ambientale Euro</label>
                <select
                  value={classeEuro}
                  onChange={(e) => setClasseEuro(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="euro6">Euro 6 / Euro 6d</option>
                  <option value="euro5">Euro 5</option>
                  <option value="euro4">Euro 4</option>
                  <option value="euro3">Euro 3</option>
                  <option value="euro2">Euro 2</option>
                  <option value="euro1">Euro 1</option>
                  <option value="euro0">Euro 0</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Tipo Alimentazione</label>
                <select
                  value={alimentazione}
                  onChange={(e) => setAlimentazione(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="termica">Benzina / Gasolio (Termica ordinaria)</option>
                  <option value="ibrida">Ibrida (Mild / Full / Plug-in)</option>
                  <option value="gpl_metano">GPL / Metano (Impianto monovalente/bivalente)</option>
                  <option value="elettrica">100% Elettrica (BEV - Esenzione)</option>
                </select>
              </div>
            </div>

            {/* Anno Immatricolazione (per Superbollo) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Anno di Prima Immatricolazione</label>
              <input
                type="number"
                min={1990}
                max={2026}
                value={annoImmatricolazione}
                onChange={(e) => setAnnoImmatricolazione(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            {/* Domiciliazione bancaria Lombardia */}
            {regione === 'lombardia' && (
              <label className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-sky-200 cursor-pointer hover:bg-sky-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={domiciliazioneAttiva}
                  onChange={(e) => setDomiciliazioneAttiva(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                />
                <span className="text-xs text-sky-950 font-medium">
                  Applica <strong>sconto del 15% per domiciliazione bancaria SDD</strong> (Regione Lombardia)
                </span>
              </label>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo aggiornato con le delibere tariffarie regionali e scaglioni di anzianità del Superbollo.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Totale Tassa Automobilistica
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
              Annuale 2026
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">Importo Totale Dovuto</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              € {res.totaleComplessivo.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-sky-300 font-medium block">
              {res.superbolloDovuto > 0
                ? `Include € ${res.superbolloDovuto.toFixed(2)} di Superbollo Erariale`
                : 'Nessun Superbollo dovuto (sotto la soglia di 185 kW)'}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Bollo regionale lordo</span>
              <span className="font-mono text-white">€ {res.bolloOrdinarioBase.toFixed(2)}</span>
            </div>
            {res.scontoApplicato > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Sconto domiciliazione bancaria (-15%)</span>
                <span className="font-mono text-emerald-400 font-bold">- € {res.scontoApplicato.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Bollo regionale netto</span>
              <span className="font-mono text-sky-300 font-bold">€ {res.bolloOrdinarioFinale.toFixed(2)}</span>
            </div>
            {res.superbolloDovuto > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Superbollo ({res.kwSuperbollo} kW eccedenti × {res.aliquotaSuperbolloKw}€)</span>
                <span className="font-mono text-amber-400 font-bold">+ € {res.superbolloDovuto.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Scadenza e Modalità di Pagamento:</strong>
            <p>Il bollo si versa entro l'ultimo giorno del mese successivo a quello di scadenza (canali PagoPA, ACI, tabaccherie o home banking). Il Superbollo si versa all'Erario con Modello F24 (Codice tributo 3364).</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Guida alla Tassa Automobilistica Regionale e al Superbollo
          </h2>
          <p>
            La tassa automobilistica (comunemente denominata <strong>Bollo Auto</strong>) è un'imposta di proprietà disciplinata dal <strong>Testo Unico delle Leggi sulle Tasse Automobilistiche (D.P.R. n. 39/1953)</strong> e attribuita alle Regioni a statuto ordinario e a statuto speciale ai sensi dell'Articolo 17 della Legge 449/1997.
          </p>
          <p>
            Il tributo è dovuto da chiunque risulti intestatario del veicolo al Pubblico Registro Automobilistico (PRA) all'ultimo giorno utile per il pagamento.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Come Funziona il Superbollo (Art. 23 D.L. 201/2011)
          </h3>
          <p>
            Introdotto con la manovra "Salva Italia", il Superbollo colpisce le autovetture e gli autoveicoli per il trasporto promiscuo di persone e cose con potenza superiore a <strong>185 chilowatt (252 CV)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              <strong>Importo Base:</strong> 20,00 € per ciascun kW eccedente la soglia dei 185 kW per le autovetture fino a 5 anni di età dalla data di immatricolazione.
            </li>
            <li>
              <strong>Abbattimento per Anzianità:</strong> Dopo 5 anni la tariffa scende a <strong>12,00 €/kW</strong> (60%); dopo 10 anni si riduce a <strong>6,00 €/kW</strong> (30%); dopo 15 anni a <strong>3,00 €/kW</strong> (15%) e dopo 20 anni si azzera del tutto.
            </li>
            <li>
              <strong>Versamento con Modello F24:</strong> A differenza del bollo regionale che si paga tramite PagoPA, il superbollo è un'addizionale erariale e va versato all'Agenzia delle Entrate tramite Modello F24 "Elementi Identificativi" (codice tributo <strong>3364</strong>, codice ente o regione e targa del veicolo).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
