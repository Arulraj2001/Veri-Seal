'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Users,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  Baby,
  Calendar,
  HeartHandshake,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface AssegnoBreakdown {
  totaleMensile: number;
  totaleAnnuo: number;
  quotaBaseFigli: number;
  maggiorazioneTerzoFiglio: number;
  maggiorazioneGenitoriLavoratori: number;
  maggiorazioneNeonato: number;
  maggiorazioneDisabilita: number;
  maggiorazioneNucleoNumeroso: number;
  fasciaIseeLabel: string;
}

export default function CalcoloAssegnoUnicoInpsPage() {
  const [isee, setIsee] = React.useState<number>(18000);
  const [senzaIsee, setSenzaIsee] = React.useState<boolean>(false);
  const [numFigliMinori, setNumFigliMinori] = React.useState<number>(2);
  const [numFigliNeonato, setNumFigliNeonato] = React.useState<number>(0);
  const [numFigli1820, setNumFigli1820] = React.useState<number>(0);
  const [entrambiGenitoriLavorano, setEntrambiGenitoriLavorano] = React.useState<boolean>(true);
  const [madreUnder21, setMadreUnder21] = React.useState<boolean>(false);
  const [figliDisabili, setFigliDisabili] = React.useState<number>(0);

  const calcolaAssegno = React.useCallback((): AssegnoBreakdown => {
    const iseeEffettivo = senzaIsee ? 50000 : Math.max(0, isee);

    // Parametri rivalutati INPS D.Lgs. 230/2021
    // ISEE Minimo: 17.090,61 € (quota max 199,40 €/mese per minore)
    // ISEE Massimo: 45.575,00 € (quota min 57,00 €/mese per minore)
    const iseeSogliaMin = 17090.61;
    const iseeSogliaMax = 45575.0;
    const quotaBaseMax = 199.4;
    const quotaBaseMin = 57.0;

    let quotaBaseSingoloMinore: number;
    let quotaBaseSingolo1820: number;

    if (iseeEffettivo <= iseeSogliaMin) {
      quotaBaseSingoloMinore = quotaBaseMax;
      quotaBaseSingolo1820 = 96.9;
    } else if (iseeEffettivo >= iseeSogliaMax) {
      quotaBaseSingoloMinore = quotaBaseMin;
      quotaBaseSingolo1820 = 28.5;
    } else {
      const p = (iseeEffettivo - iseeSogliaMin) / (iseeSogliaMax - iseeSogliaMin);
      quotaBaseSingoloMinore = quotaBaseMax - p * (quotaBaseMax - quotaBaseMin);
      quotaBaseSingolo1820 = 96.9 - p * (96.9 - 28.5);
    }

    const quotaBaseTotaleMinori = numFigliMinori * quotaBaseSingoloMinore;
    const quotaBaseTotale1820 = numFigli1820 * quotaBaseSingolo1820;
    const quotaBaseFigli = quotaBaseTotaleMinori + quotaBaseTotale1820;

    // Maggiorazione terzo figlio e successivi (dal 3° figlio in poi, max 96,90 € a min 17,10 €)
    let maggiorazioneTerzoFiglio = 0;
    const totaleFigli = numFigliMinori + numFigli1820;
    if (totaleFigli >= 3) {
      const figliOltreDue = totaleFigli - 2;
      let aggSingolo = 96.9;
      if (iseeEffettivo > iseeSogliaMin && iseeEffettivo < iseeSogliaMax) {
        const p = (iseeEffettivo - iseeSogliaMin) / (iseeSogliaMax - iseeSogliaMin);
        aggSingolo = 96.9 - p * (96.9 - 17.1);
      } else if (iseeEffettivo >= iseeSogliaMax) {
        aggSingolo = 17.1;
      }
      maggiorazioneTerzoFiglio = figliOltreDue * aggSingolo;
    }

    // Maggiorazione genitori entrambi lavoratori (max 34,10 € a figlio con ISEE min, azzerata sopra 45.575 €)
    let maggiorazioneGenitoriLavoratori = 0;
    if (entrambiGenitoriLavorano && iseeEffettivo < iseeSogliaMax) {
      let coeffGen = 34.1;
      if (iseeEffettivo > iseeSogliaMin) {
        const p = (iseeEffettivo - iseeSogliaMin) / (iseeSogliaMax - iseeSogliaMin);
        coeffGen = 34.1 * (1 - p);
      }
      maggiorazioneGenitoriLavoratori = (numFigliMinori + numFigli1820) * coeffGen;
    }

    // Maggiorazione primo anno di vita (+50% della quota base per ciascun neonato)
    const neonatiEffettivi = Math.min(numFigliMinori, numFigliNeonato);
    const maggiorazioneNeonato = neonatiEffettivi * (quotaBaseSingoloMinore * 0.5);

    // Maggiorazione figli con disabilità (media 100€ forfettaria media ponderata)
    const maggiorazioneDisabilita = figliDisabili * 105.0;

    // Maggiorazione forfettaria nucleo con 4 o più figli: 150 €/mese fissi
    const maggiorazioneNucleoNumeroso = totaleFigli >= 4 ? 150.0 : 0;

    // Maggiorazione madri under 21: 22,80 € per figlio
    const maggiorazioneUnder21 = madreUnder21 ? (numFigliMinori + numFigli1820) * 22.8 : 0;

    const totaleMensile =
      quotaBaseFigli +
      maggiorazioneTerzoFiglio +
      maggiorazioneGenitoriLavoratori +
      maggiorazioneNeonato +
      maggiorazioneDisabilita +
      maggiorazioneNucleoNumeroso +
      maggiorazioneUnder21;

    const totaleAnnuo = totaleMensile * 12;

    let fasciaIseeLabel = '';
    if (senzaIsee || iseeEffettivo >= iseeSogliaMax) {
      fasciaIseeLabel = 'ISEE oltre 45.575 € (Importo Minimo di Base)';
    } else if (iseeEffettivo <= iseeSogliaMin) {
      fasciaIseeLabel = 'ISEE fino a 17.090 € (Importo Massimo di Base)';
    } else {
      fasciaIseeLabel = `Fascia ISEE Ordinaria (${Math.round(iseeEffettivo).toLocaleString('it-IT')} €)`;
    }

    return {
      totaleMensile,
      totaleAnnuo,
      quotaBaseFigli,
      maggiorazioneTerzoFiglio,
      maggiorazioneGenitoriLavoratori,
      maggiorazioneNeonato,
      maggiorazioneDisabilita,
      maggiorazioneNucleoNumeroso,
      fasciaIseeLabel,
    };
  }, [
    isee,
    senzaIsee,
    numFigliMinori,
    numFigliNeonato,
    numFigli1820,
    entrambiGenitoriLavorano,
    madreUnder21,
    figliDisabili,
  ]);

  const res = calcolaAssegno();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Assegno Unico INPS</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>D.Lgs. 230/2021 & Tabelle Rivalutate INPS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Assegno Unico e Universale Figli <br className="hidden sm:inline" />
          <span className="text-sky-600">Importi Mensili INPS, Fasce ISEE e Maggiorazioni</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Previdenziale Diretta:</strong> L'<strong>Assegno Unico e Universale (AUU)</strong> è erogato dall'INPS per ciascun figlio a carico dal 7° mese di gravidanza fino ai 21 anni (senza limiti di età per figli disabili). L'importo varia da un massimo di <strong>199,40 €/mese per figlio</strong> (con ISEE fino a 17.090,61 €) a un minimo di <strong>57,00 €/mese</strong> per ISEE superiori a 45.575 € o in assenza di dichiarazione DSU, a cui si sommano le maggiorazioni per terzo figlio, entrambi i genitori lavoratori (+34,10 €) e neonati under 1 anno (+50%).
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Users className="w-4 h-4 text-sky-600" />
              <span>Dati Nucleo Familiare & ISEE</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsee(18000);
                setSenzaIsee(false);
                setNumFigliMinori(2);
                setNumFigliNeonato(0);
                setNumFigli1820(0);
                setEntrambiGenitoriLavorano(true);
                setMadreUnder21(false);
                setFigliDisabili(0);
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Valore ISEE */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Indicatore ISEE Ordinario o Minorenni (€)
                </label>
                <label className="text-xs text-slate-600 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={senzaIsee}
                    onChange={(e) => setSenzaIsee(e.target.checked)}
                    className="w-3.5 h-3.5 text-sky-600 rounded border-slate-300"
                  />
                  <span>Nessun ISEE / Oltre 45.575€</span>
                </label>
              </div>
              <input
                type="number"
                disabled={senzaIsee}
                step={500}
                min={0}
                value={senzaIsee ? '' : isee || ''}
                onChange={(e) => setIsee(Number(e.target.value))}
                placeholder={senzaIsee ? 'Importo minimo di legge applicato' : 'Es. 18000'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>

            {/* Numero Figli */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Figli Minori a Carico (0-17 anni)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={numFigliMinori}
                    onChange={(e) => setNumFigliMinori(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Figli Maggiorenni (18-20 anni)</label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  value={numFigli1820}
                  onChange={(e) => setNumFigli1820(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Condizioni Particolari & Maggiorazioni */}
            <div className="space-y-2.5 pt-2">
              <label className="text-xs font-bold text-slate-800 block">Condizioni Specifiche del Nucleo</label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-600 font-medium">Di cui neonati (sotto 1 anno):</span>
                  <input
                    type="number"
                    min={0}
                    max={numFigliMinori}
                    value={numFigliNeonato}
                    onChange={(e) => setNumFigliNeonato(Math.min(numFigliMinori, Math.max(0, Number(e.target.value))))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-600 font-medium">Figli con disabilità certificata:</span>
                  <input
                    type="number"
                    min={0}
                    max={numFigliMinori + numFigli1820}
                    value={figliDisabili}
                    onChange={(e) => setFigliDisabili(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                  <input
                    type="checkbox"
                    checked={entrambiGenitoriLavorano}
                    onChange={(e) => setEntrambiGenitoriLavorano(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <span className="text-xs text-slate-800 font-medium">
                    Entrambi i genitori titolari di <strong>reddito da lavoro</strong> (dipendente o autonomo)
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                  <input
                    type="checkbox"
                    checked={madreUnder21}
                    onChange={(e) => setMadreUnder21(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <span className="text-xs text-slate-800 font-medium">
                    Madre con età inferiore a 21 anni (+22,80 € per figlio)
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo secondo le tabelle dell'Osservatorio Nazionale Famiglia e circolari INPS.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Assegno Spettante
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
              INPS 2026
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">Importo Mensile Totale</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              € {res.totaleMensile.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-sky-300 font-medium block">
              € {res.totaleAnnuo.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} stimati all'anno
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Quota base figli</span>
              <span className="font-mono text-white">€ {res.quotaBaseFigli.toFixed(2)}/m</span>
            </div>
            {res.maggiorazioneTerzoFiglio > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Maggiorazione dal 3° figlio</span>
                <span className="font-mono text-amber-400 font-bold">+ € {res.maggiorazioneTerzoFiglio.toFixed(2)}/m</span>
              </div>
            )}
            {res.maggiorazioneGenitoriLavoratori > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Maggiorazione entrambi lavoratori</span>
                <span className="font-mono text-emerald-400 font-bold">+ € {res.maggiorazioneGenitoriLavoratori.toFixed(2)}/m</span>
              </div>
            )}
            {res.maggiorazioneNeonato > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Maggiorazione primo anno vita (+50%)</span>
                <span className="font-mono text-sky-400 font-bold">+ € {res.maggiorazioneNeonato.toFixed(2)}/m</span>
              </div>
            )}
            {res.maggiorazioneDisabilita > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Maggiorazione disabilità</span>
                <span className="font-mono text-violet-400 font-bold">+ € {res.maggiorazioneDisabilita.toFixed(2)}/m</span>
              </div>
            )}
            {res.maggiorazioneNucleoNumeroso > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Bonus forfettario 4+ figli</span>
                <span className="font-mono text-cyan-400 font-bold">+ € {res.maggiorazioneNucleoNumeroso.toFixed(2)}/m</span>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Classificazione ISEE:</strong>
            <p className="text-slate-300">{res.fasciaIseeLabel}</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Guida Statutaria all'Assegno Unico e Universale (D.Lgs. 230/2021)
          </h2>
          <p>
            L'<strong>Assegno Unico e Universale (AUU)</strong> è il beneficio economico continuativo a sostegno delle famiglie con figli a carico introdotto con il <strong>Decreto Legislativo 29 dicembre 2021, n. 230</strong>.
          </p>
          <p>
            Ha sostituito la quasi totalità delle precedenti agevolazioni per i nuclei familiari, tra cui le detrazioni fiscali IRPEF per figli a carico fino a 21 anni, l'Assegno per il Nucleo Familiare (ANF), il bonus bebè e il premio alla nascita.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Chi Ne Ha Diritto e Termini ISEE
          </h3>
          <p>
            L'assegno spetta per ogni figlio minorenne a carico e, per i nuovi nati, decorre a partire dal settimo mese di gravidanza. Spetta altresì per ciascun figlio maggiorenne fino al compimento dei <strong>21 anni di età</strong> a condizione che:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Frequenti un corso di formazione scolastica, professionale o di laurea;</li>
            <li>Svolga un tirocinio ovvero un'attività lavorativa con reddito complessivo inferiore a 8.000 euro annui;</li>
            <li>Sia registrato come disoccupato in cerca di lavoro presso un Centro per l'Impiego;</li>
            <li>Svolga il servizio civile universale.</li>
          </ul>
          <p className="text-xs text-slate-600">
            Per i <strong>figli con disabilità</strong> non è previsto alcun limite di età: l'assegno spetta a prescindere dal raggiungimento del 21° anno di età e senza riduzione degli importi.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Rinnovo Automatico e Scadenza DSU
          </h3>
          <p>
            Dal 2023 la domanda di Assegno Unico non va ripresentata ogni anno se già accolta dall'INPS: l'erogazione prosegue d'ufficio. Tuttavia, entro il <strong>28 o 29 febbraio</strong> di ciascun anno il nucleo deve presentare la nuova <strong>Dichiarazione Sostitutiva Unica (DSU)</strong> per il rinnovo dell'ISEE.
          </p>
          <p>
            In assenza di ISEE valido al 1° marzo, l'assegno viene ridotto all'importo minimo di legge (circa 57 € a figlio). Presentando la DSU entro il <strong>30 giugno</strong>, l'INPS accredita retroattivamente i conguagli maturati a partire da marzo.
          </p>
        </div>
      </div>
    </div>
  );
}
