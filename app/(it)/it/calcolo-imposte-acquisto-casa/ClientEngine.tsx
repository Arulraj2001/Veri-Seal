'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  FileText,
  Coins,
  ShieldCheck,
} from 'lucide-react';

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

export function CalcoloImposteAcquistoCasaClient() {
  const [prezzo, setPrezzo] = React.useState<number>(200000);
  const [rendita, setRendita] = React.useState<number>(600);
  const [tipoVenditore, setTipoVenditore] = React.useState<'privato' | 'costruttore'>('privato');
  const [tipoImmobile, setTipoImmobile] = React.useState<'prima_casa' | 'seconda_casa'>('prima_casa');
  const [importoMutuo, setImportoMutuo] = React.useState<number>(150000);
  const [intermediazioneAgenzia, setIntermediazioneAgenzia] = React.useState<boolean>(true);

  const calcolaImposte = React.useCallback((): ImposteAcquistoResult => {
    const safePrezzo = Math.max(0, prezzo);
    const safeRendita = Math.max(0, rendita);

    const moltiplicatorePrezzoValore = tipoImmobile === 'prima_casa' ? 110 : 120;
    const valoreCatastalePrezzoValore = safeRendita * 1.05 * moltiplicatorePrezzoValore;

    let impostaRegistro = 0;
    let impostaIva = 0;
    let impostaIpotecaria = 50;
    let impostaCatastale = 50;

    if (tipoVenditore === 'privato') {
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
      if (tipoImmobile === 'prima_casa') {
        impostaIva = safePrezzo * 0.04;
      } else {
        impostaIva = safePrezzo * 0.10;
      }
      impostaRegistro = 200;
      impostaIpotecaria = 200;
      impostaCatastale = 200;
    }

    const aliquotaMutuo = tipoImmobile === 'prima_casa' ? 0.0025 : 0.02;
    const impostaMutuo = importoMutuo * aliquotaMutuo;

    const onorarioNotaioStimato = safePrezzo > 0 ? 1500 + safePrezzo * 0.005 : 0;
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Parametri Compravendita</span>
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
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Prezzo di Acquisto Pattuito (Rogito)</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {prezzo.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={5000}
                value={prezzo || ''}
                onChange={(e) => setPrezzo(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 200000"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Rendita Catastale non rivalutata</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {rendita.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={10}
                value={rendita || ''}
                onChange={(e) => setRendita(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 600"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Serve per determinare la base imponibile agevolata col sistema del &quot;Prezzo-Valore&quot;.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Venditore</label>
              <select
                value={tipoVenditore}
                onChange={(e) => setTipoVenditore(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="privato">Da Privato (Imposta di Registro)</option>
                <option value="costruttore">Da Impresa Costruttrice (Soggetto a IVA)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Tipologia Acquisto</label>
              <select
                value={tipoImmobile}
                onChange={(e) => setTipoImmobile(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="prima_casa">Prima Casa (Agevolata 2% / IVA 4%)</option>
                <option value="seconda_casa">Seconda Casa (Ordinaria 9% / IVA 10%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Importo Mutuo Richiesto</label>
              <input
                type="number"
                min={0}
                step={5000}
                value={importoMutuo || ''}
                onChange={(e) => setImportoMutuo(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={intermediazioneAgenzia}
                  onChange={(e) => setIntermediazioneAgenzia(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Includi Provvigione Agenzia (3%+IVA)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Esborso Totale Stimato
          </span>
          <span className="text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-800/50">
            Prezzo + Spese
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-950/60 to-slate-900 border border-sky-800/40 space-y-1 text-center">
          <span className="text-xs text-sky-200 font-bold uppercase tracking-wider">
            Totale Spese Accessorie
          </span>
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white py-1">
            € {res.totaleSpeseAccessorie.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-300 font-mono">
            Costo Complessivo: € {res.costoTotaleAcquisto.toLocaleString('it-IT', { maximumFractionDigits: 0 })}
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
              <span>IVA sull&apos;Acquisto ({tipoImmobile === 'prima_casa' ? '4%' : '10%'})</span>
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
          <strong>Vantaggio del Prezzo-Valore:</strong> Permette di calcolare l&apos;imposta di registro su una base imponibile di € {res.valoreCatastalePrezzoValore.toLocaleString('it-IT', { maximumFractionDigits: 0 })} invece che sul prezzo effettivo di € {res.prezzoDichiarato.toLocaleString('it-IT')}.
        </div>
      </div>
    </div>
  );
}

