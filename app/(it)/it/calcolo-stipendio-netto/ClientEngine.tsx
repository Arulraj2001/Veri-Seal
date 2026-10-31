'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface StipendioResult {
  ral: number;
  mensilita: number;
  inpsDipendente: number;
  imponibileIrpef: number;
  irpefLorda: number;
  detrazioniLavoro: number;
  detrazioniFigli: number;
  irpefNetta: number;
  addizionaleRegionale: number;
  addizionaleComunale: number;
  trattamentoIntegrativo: number;
  nettoAnnuale: number;
  nettoMensile: number;
  costoAziendaleTotale: number;
  aliquotaMedia: number;
}

export function CalcoloStipendioNettoClient() {
  const [ral, setRal] = React.useState<number>(30000);
  const [mensilita, setMensilita] = React.useState<number>(13);
  const [regione, setRegione] = React.useState<string>('lombardia');
  const [figliACarico, setFigliACarico] = React.useState<number>(0);
  const [contratto, setContratto] = React.useState<'indeterminato' | 'determinato' | 'apprendistato'>('indeterminato');

  const aliquoteRegionali: Record<string, number> = {
    lombardia: 0.0123,
    lazio: 0.0333,
    campania: 0.0203,
    veneto: 0.0123,
    piemonte: 0.0162,
    emilia_romagna: 0.0133,
    toscana: 0.0142,
    sicilia: 0.0123,
    puglia: 0.0133,
    liguria: 0.0123,
  };

  const calcolaStipendio = React.useCallback((): StipendioResult => {
    const safeRal = Math.max(0, ral);

    // 1. Quota contributi previdenziali INPS a carico dipendente
    const aliquotaInps = contratto === 'apprendistato' ? 0.0584 : 0.0919;
    const inpsDipendente = safeRal * aliquotaInps;

    // 2. Imponibile Fiscale IRPEF
    const imponibileIrpef = Math.max(0, safeRal - inpsDipendente);

    // 3. IRPEF Lorda 2026 - Riforma D.Lgs. 216/2023 (3 Scaglioni)
    let irpefLorda = 0;
    if (imponibileIrpef <= 28000) {
      irpefLorda = imponibileIrpef * 0.23;
    } else if (imponibileIrpef <= 50000) {
      irpefLorda = 28000 * 0.23 + (imponibileIrpef - 28000) * 0.35;
    } else {
      irpefLorda = 28000 * 0.23 + 22000 * 0.35 + (imponibileIrpef - 50000) * 0.43;
    }

    // 4. Detrazioni per Lavoro Dipendente (Art. 13 TUIR)
    let detrazioniLavoro = 0;
    if (imponibileIrpef <= 15000) {
      detrazioniLavoro = 1955;
    } else if (imponibileIrpef <= 28000) {
      detrazioniLavoro = 1910 + 1190 * ((28000 - imponibileIrpef) / 13000);
    } else if (imponibileIrpef <= 50000) {
      detrazioniLavoro = 1910 * ((50000 - imponibileIrpef) / 22000);
    } else {
      detrazioniLavoro = 0;
    }

    const detrazioniFigli = figliACarico * 475;
    const totaleDetrazioni = Math.min(irpefLorda, detrazioniLavoro + detrazioniFigli);
    const irpefNetta = Math.max(0, irpefLorda - totaleDetrazioni);

    // 5. Addizionali Regionale e Comunale
    const aliquotaReg = aliquoteRegionali[regione] || 0.0123;
    const addizionaleRegionale = imponibileIrpef * aliquotaReg;
    const addizionaleComunale = imponibileIrpef * 0.008;

    // 6. Trattamento Integrativo
    let trattamentoIntegrativo = 0;
    if (imponibileIrpef > 8500 && imponibileIrpef <= 15000) {
      trattamentoIntegrativo = 1200;
    }

    // 7. Calcolo Finale Netto Annuale e Mensile
    const totaleImposte = irpefNetta + addizionaleRegionale + addizionaleComunale;
    const nettoAnnuale = safeRal - inpsDipendente - totaleImposte + trattamentoIntegrativo;
    const nettoMensile = nettoAnnuale / mensilita;

    const costoAziendaleTotale = safeRal * 1.30;
    const aliquotaMedia = safeRal > 0 ? ((totaleImposte + inpsDipendente) / safeRal) * 100 : 0;

    return {
      ral: safeRal,
      mensilita,
      inpsDipendente,
      imponibileIrpef,
      irpefLorda,
      detrazioniLavoro,
      detrazioniFigli,
      irpefNetta,
      addizionaleRegionale,
      addizionaleComunale,
      trattamentoIntegrativo,
      nettoAnnuale,
      nettoMensile,
      costoAziendaleTotale,
      aliquotaMedia,
    };
  }, [ral, mensilita, regione, figliACarico, contratto]);

  const risultato = calcolaStipendio();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Parametri di Retribuzione</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setRal(30000);
              setMensilita(13);
              setRegione('lombardia');
              setFigliACarico(0);
              setContratto('indeterminato');
            }}
            className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reimposta</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* RAL Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Retribuzione Annua Lorda (RAL)</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {ral.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={500}
                value={ral || ''}
                onChange={(e) => setRal(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 30000"
              />
            </div>
            <input
              type="range"
              min={10000}
              max={120000}
              step={1000}
              value={ral}
              onChange={(e) => setRal(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono">
              <span>10.000 €</span>
              <span>40.000 €</span>
              <span>80.000 €</span>
              <span>120.000 €</span>
            </div>
          </div>

          {/* Mensilità & Tipologia Contratto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Numero Mensilità</label>
              <div className="grid grid-cols-2 gap-2">
                {[13, 14].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMensilita(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      mensilita === m
                        ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m} Mensilità
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Tipo Contratto</label>
              <select
                value={contratto}
                onChange={(e) => setContratto(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                <option value="indeterminato">Tempo Indeterminato (INPS 9,19%)</option>
                <option value="determinato">Tempo Determinato (INPS 9,19%)</option>
                <option value="apprendistato">Apprendistato (INPS 5,84%)</option>
              </select>
            </div>
          </div>

          {/* Regione e Figli a Carico */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Regione di Residenza</label>
              <select
                value={regione}
                onChange={(e) => setRegione(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                <option value="lombardia">Lombardia (1,23%)</option>
                <option value="lazio">Lazio (3,33%)</option>
                <option value="campania">Campania (2,03%)</option>
                <option value="veneto">Veneto (1,23%)</option>
                <option value="piemonte">Piemonte (1,62%)</option>
                <option value="emilia_romagna">Emilia-Romagna (1,33%)</option>
                <option value="toscana">Toscana (1,42%)</option>
                <option value="sicilia">Sicilia (1,23%)</option>
                <option value="puglia">Puglia (1,33%)</option>
                <option value="liguria">Liguria (1,23%)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Figli a Carico (&ge; 21 anni)</label>
              <select
                value={figliACarico}
                onChange={(e) => setFigliACarico(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                <option value={0}>0 figli a carico</option>
                <option value={1}>1 figlio</option>
                <option value={2}>2 figli</option>
                <option value={3}>3 o più figli</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Output Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Riepilogo Busta Paga Netta
          </span>
          <span className="text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-800/50">
            {mensilita} Mensilità
          </span>
        </div>

        {/* Big Net Result */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-950/60 to-slate-900 border border-sky-800/40 space-y-1 text-center">
          <span className="text-xs text-sky-200 font-bold uppercase tracking-wider">
            Stipendio Netto Mensile
          </span>
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white py-1">
            € {risultato.nettoMensile.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Netto Annuo Complessivo: € {risultato.nettoAnnuale.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Retribuzione Annua Lorda (RAL)</span>
            <span className="font-mono text-white font-bold">€ {risultato.ral.toLocaleString('it-IT')}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Contributi INPS c/dipendente</span>
            <span className="font-mono text-rose-400">- € {risultato.inpsDipendente.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Imponibile Fiscale IRPEF</span>
            <span className="font-mono text-white">€ {risultato.imponibileIrpef.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>IRPEF Netta Annuale</span>
            <span className="font-mono text-rose-400">- € {risultato.irpefNetta.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Addizionale Regionale ({regione})</span>
            <span className="font-mono text-rose-400">- € {risultato.addizionaleRegionale.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Addizionale Comunale (0,8%)</span>
            <span className="font-mono text-rose-400">- € {risultato.addizionaleComunale.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          {risultato.trattamentoIntegrativo > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-emerald-400 font-bold">
              <span>Trattamento Integrativo (ex Bonus)</span>
              <span className="font-mono">+ € {risultato.trattamentoIntegrativo.toLocaleString('it-IT')}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-slate-200 font-bold">
            <span>Pressione Fiscale e Contributiva Totale</span>
            <span className="font-mono text-sky-400">{risultato.aliquotaMedia.toFixed(1)}%</span>
          </div>
        </div>

        {/* Costo Aziendale */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
          <span className="font-bold text-slate-200">Costo Aziendale Stimato (Costo Totale Impresa):</span>
          <div className="font-mono text-sky-400 font-bold text-sm">
            € {risultato.costoAziendaleTotale.toLocaleString('it-IT', { maximumFractionDigits: 0 })} / anno
          </div>
          <span>Include TFR maturando e contributi previdenziali a carico azienda (~30%).</span>
        </div>
      </div>
    </div>
  );
}

