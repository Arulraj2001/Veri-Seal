'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Sparkles,
  Home,
  RotateCcw,
  CheckCircle2,
  FileText,
  Coins,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface ImposteAcquistoResult {
  prezzoDichiarato: number;
  valoreCatastalePrezzoValore: number;
  impostaRegistro: number;
  impostaIva: number;
  impostaIpotecaria: number;
  impostaCatastale: number;
  impostaMutuo: number;
  onorarioNotaioStimato: number;
  speseAgenziaStimate: number;
  totaleSpeseAccessorie: number;
  costoTotaleAcquisto: number;
}

export default function CalcoloImposteAcquistoCasaPage() {
  const [prezzo, setPrezzo] = React.useState<number>(200000);
  const [rendita, setRendita] = React.useState<number>(600);
  const [tipoVenditore, setTipoVenditore] = React.useState<'privato' | 'costruttore'>('privato');
  const [tipoImmobile, setTipoImmobile] = React.useState<'prima_casa' | 'seconda_casa'>('prima_casa');
  const [importoMutuo, setImportoMutuo] = React.useState<number>(150000);
  const [intermediazioneAgenzia, setIntermediazioneAgenzia] = React.useState<boolean>(true);

  const calcolaImposte = React.useCallback((): ImposteAcquistoResult => {
    const safePrezzo = Math.max(0, prezzo);
    const safeRendita = Math.max(0, rendita);

    // Calcolo "Prezzo-Valore" (D.P.R. 131/1986 art. 52)
    // Prima casa: rendita * 1.05 * 110 | Seconda casa: rendita * 1.05 * 120
    const moltiplicatorePrezzoValore = tipoImmobile === 'prima_casa' ? 110 : 120;
    const valoreCatastalePrezzoValore = safeRendita * 1.05 * moltiplicatorePrezzoValore;

    let impostaRegistro = 0;
    let impostaIva = 0;
    let impostaIpotecaria = 50;
    let impostaCatastale = 50;

    if (tipoVenditore === 'privato') {
      // Acquisto tra privati: si applica il prezzo-valore sul valore catastale
      const baseImponibile = valoreCatastalePrezzoValore > 0 ? valoreCatastalePrezzoValore : safePrezzo;
      if (tipoImmobile === 'prima_casa') {
        impostaRegistro = Math.max(1000, baseImponibile * 0.02);
      } else {
        impostaRegistro = Math.max(1000, baseImponibile * 0.09);
      }
      impostaIpotecaria = 50;
      impostaCatastale = 50;
      impostaIva = 0;
    } else {
      // Acquisto da impresa costruttrice con IVA (si applica sul prezzo di vendita pattuito)
      if (tipoImmobile === 'prima_casa') {
        impostaIva = safePrezzo * 0.04; // 4%
      } else {
        impostaIva = safePrezzo * 0.10; // 10%
      }
      impostaRegistro = 200;
      impostaIpotecaria = 200;
      impostaCatastale = 200;
    }

    // Imposta sostitutiva su mutuo bancario: 0.25% prima casa, 2.0% seconda casa
    const aliquotaMutuo = tipoImmobile === 'prima_casa' ? 0.0025 : 0.02;
    const impostaMutuo = importoMutuo * aliquotaMutuo;

    // Stima onorario notaio (acquisto + mutuo)
    const onorarioNotaioStimato = safePrezzo > 0 ? 1500 + safePrezzo * 0.005 : 0;

    // Provvigione agenzia immobiliare (media 3% + IVA 22% = 3.66%)
    const speseAgenziaStimate = intermediazioneAgenzia ? safePrezzo * 0.03 * 1.22 : 0;

    const totaleSpeseAccessorie =
      impostaRegistro +
      impostaIva +
      impostaIpotecaria +
      impostaCatastale +
      impostaMutuo +
      onorarioNotaioStimato +
      speseAgenziaStimate;

    const costoTotaleAcquisto = safePrezzo + totaleSpeseAccessorie;

    return {
      prezzoDichiarato: safePrezzo,
      valoreCatastalePrezzoValore,
      impostaRegistro,
      impostaIva,
      impostaIpotecaria,
      impostaCatastale,
      impostaMutuo,
      onorarioNotaioStimato,
      speseAgenziaStimate,
      totaleSpeseAccessorie,
      costoTotaleAcquisto,
    };
  }, [prezzo, rendita, tipoVenditore, tipoImmobile, importoMutuo, intermediazioneAgenzia]);

  const res = calcolaImposte();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Imposte Acquisto Casa</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Regola del Prezzo-Valore D.P.R. 131/1986 & Agevolazioni Prima Casa</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Imposte Acquisto Prima Casa e Rogito <br className="hidden sm:inline" />
          <span className="text-sky-600">Spese Notarili, Imposta di Registro, IVA e Agenzia</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Fiscale Diretta:</strong> Acquistando da privato come <strong>Prima Casa</strong>, l’imposta di registro è pari al <strong>2%</strong> (minimo 1.000 €) calcolata sul valore catastale rivalutato (non sul prezzo commerciale pattuito, grazie al sistema del <em>Prezzo-Valore</em>), oltre a 50 € di imposta ipotecaria e 50 € catastale. Se si acquista una <strong>Seconda Casa</strong> da privato, l'imposta di registro sale al <strong>9%</strong>. Acquistando da impresa costruttrice con IVA si versa il 4% (prima casa) o il 10% (seconda casa) sul prezzo di vendita.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Parametri di Compravendita</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setPrezzo(200000);
                setRendita(600);
                setTipoVenditore('privato');
                setTipoImmobile('prima_casa');
                setImportoMutuo(150000);
                setIntermediazioneAgenzia(true);
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Prezzo e Rendita Catastale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Prezzo di Acquisto Immobile (€)</label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={prezzo || ''}
                  onChange={(e) => setPrezzo(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Rendita Catastale Non Rivalutata (€)</label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={rendita || ''}
                  onChange={(e) => setRendita(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Venditore e Agevolazione */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Tipologia Venditore</label>
                <select
                  value={tipoVenditore}
                  onChange={(e) => setTipoVenditore(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="privato">Privato (Imposta Registro 2% o 9%)</option>
                  <option value="costruttore">Impresa Costruttrice (Con IVA 4% o 10%)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Destinazione Acquisto</label>
                <select
                  value={tipoImmobile}
                  onChange={(e) => setTipoImmobile(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="prima_casa">Prima Casa (Agevolata 2% / 4%)</option>
                  <option value="seconda_casa">Seconda Casa (Ordinaria 9% / 10%)</option>
                </select>
              </div>
            </div>

            {/* Mutuo e Agenzia */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Importo Mutuo Richiesto (€)</label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={importoMutuo || ''}
                  onChange={(e) => setImportoMutuo(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={intermediazioneAgenzia}
                    onChange={(e) => setIntermediazioneAgenzia(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded accent-sky-600"
                  />
                  <span>Includi provvigione agenzia (3% + IVA)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo conforme alla legge 23 dicembre 2005, n. 266 (Prezzo-Valore).</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Totale Spese Notarili & Fisco
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">Totale Spese Accessorie all'Acquisto</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              € {res.totaleSpeseAccessorie.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-sky-300 font-medium block">
              Budget Totale Necessario: € {res.costoTotaleAcquisto.toLocaleString('it-IT', { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {tipoVenditore === 'privato' ? (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Imposta di Registro ({tipoImmobile === 'prima_casa' ? '2%' : '9%'})</span>
                <span className="font-mono text-white">€ {res.impostaRegistro.toLocaleString('it-IT', { maximumFractionDigits: 2 })}</span>
              </div>
            ) : (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>IVA sull'Acquisto ({tipoImmobile === 'prima_casa' ? '4%' : '10%'})</span>
                <span className="font-mono text-white">€ {res.impostaIva.toLocaleString('it-IT', { maximumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Imposte Ipotecaria e Catastale</span>
              <span className="font-mono text-white">€ {(res.impostaIpotecaria + res.impostaCatastale).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Imposta Sostitutiva su Mutuo ({tipoImmobile === 'prima_casa' ? '0,25%' : '2%'})</span>
              <span className="font-mono text-white">€ {res.impostaMutuo.toLocaleString('it-IT', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Onorario Notaio Stimato (Compravendita + Mutuo)</span>
              <span className="font-mono text-white">€ {res.onorarioNotaioStimato.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
            </div>
            {intermediazioneAgenzia && (
              <div className="flex justify-between py-1 text-slate-300">
                <span>Provvigione Agenzia Immobiliare (3% + IVA)</span>
                <span className="font-mono text-white">€ {res.speseAgenziaStimate.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <strong>Vantaggio del Prezzo-Valore:</strong> Permette di calcolare l'imposta di registro su una base imponibile di € {res.valoreCatastalePrezzoValore.toLocaleString('it-IT', { maximumFractionDigits: 0 })} invece che sul prezzo effettivo di € {res.prezzoDichiarato.toLocaleString('it-IT')}.
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          La Regola del Prezzo-Valore e le Agevolazioni Prima Casa
        </h2>
        <p>
          Il sistema del <strong>Prezzo-Valore</strong> introdotto dalla legge finanziaria 2006 (Legge 266/2005) rappresenta un'importante tutela per chi acquista un immobile residenziale da un privato. Consente di liquidare l'imposta di registro non sul corrispettivo pattuito nell'atto di compravendita, bensì sul valore catastale dell'immobile, notevolmente inferiore rispetto ai valori di mercato.
        </p>
      </div>
    </div>
  );
}
