'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface StraordinariResult {
  pagaBaseOraria: number;
  oreTotali: number;
  tipoMaggiorazione: string;
  percentualeMaggiorazione: number;
  tariffaOrariaStraordinario: number;
  compensoLordoTotale: number;
  ritenutaFiscaleStimata: number;
  contributiInpsDipendente: number;
  compensoNettoInBusta: number;
}

export function CalcoloStraordinariClient() {
  const [stipendioMensileLordo, setStipendioMensileLordo] = React.useState<number>(2200);
  const [ccnl, setCcnl] = React.useState<'commercio' | 'metalmeccanico' | 'terziario'>('commercio');
  const [tipoStraordinario, setTipoStraordinario] = React.useState<'diurno' | 'festivo' | 'notturno' | 'notturno_festivo'>('diurno');
  const [oreSvolte, setOreSvolte] = React.useState<number>(18);

  const divisoriOrari: Record<string, number> = {
    commercio: 168,
    metalmeccanico: 173,
    terziario: 168,
  };

  const maggiorazioniPercentuali: Record<string, Record<string, number>> = {
    commercio: {
      diurno: 15,
      festivo: 30,
      notturno: 30,
      notturno_festivo: 50,
    },
    metalmeccanico: {
      diurno: 25,
      festivo: 50,
      notturno: 40,
      notturno_festivo: 65,
    },
    terziario: {
      diurno: 15,
      festivo: 30,
      notturno: 30,
      notturno_festivo: 50,
    },
  };

  const calcolaStraordinari = React.useCallback((): StraordinariResult => {
    const divisore = divisoriOrari[ccnl] || 168;
    const pagaBaseOraria = stipendioMensileLordo / divisore;

    const percMagg = maggiorazioniPercentuali[ccnl][tipoStraordinario] || 15;
    const tariffaOrariaStraordinario = pagaBaseOraria * (1 + percMagg / 100);

    const compensoLordoTotale = tariffaOrariaStraordinario * Math.max(0, oreSvolte);

    const contributiInpsDipendente = compensoLordoTotale * 0.0919;
    const ritenutaFiscaleStimata = (compensoLordoTotale - contributiInpsDipendente) * 0.23;

    const compensoNettoInBusta = compensoLordoTotale - contributiInpsDipendente - ritenutaFiscaleStimata;

    const etichetteTipo: Record<string, string> = {
      diurno: 'Straordinario Diurno Feriale',
      festivo: 'Straordinario Festivo / Domenicale',
      notturno: 'Straordinario Notturno Feriale',
      notturno_festivo: 'Straordinario Notturno e Festivo',
    };

    return {
      pagaBaseOraria,
      oreTotali: oreSvolte,
      tipoMaggiorazione: etichetteTipo[tipoStraordinario] || 'Straordinario',
      percentualeMaggiorazione: percMagg,
      tariffaOrariaStraordinario,
      compensoLordoTotale,
      ritenutaFiscaleStimata,
      contributiInpsDipendente,
      compensoNettoInBusta,
    };
  }, [stipendioMensileLordo, ccnl, tipoStraordinario, oreSvolte]);

  const res = calcolaStraordinari();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Parametri Contrattuali del Lavoratore</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setStipendioMensileLordo(2200);
              setCcnl('commercio');
              setTipoStraordinario('diurno');
              setOreSvolte(18);
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
              <span>Retribuzione Mensile Lorda Base (Busta Paga)</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {stipendioMensileLordo.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={50}
                value={stipendioMensileLordo || ''}
                onChange={(e) => setStipendioMensileLordo(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 2200"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Paga base + contingenza + elemento distinto retribuzione (EDR) + scatti di anzianità.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">CCNL di Riferimento</label>
              <select
                value={ccnl}
                onChange={(e) => setCcnl(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="commercio">Commercio &amp; Terziario Confcommercio (Divisore 168)</option>
                <option value="metalmeccanico">Metalmeccanico Industria Federmeccanica (Divisore 173)</option>
                <option value="terziario">Servizi &amp; Terziario Avanzato (Divisore 168)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Tipologia di Straordinario</label>
              <select
                value={tipoStraordinario}
                onChange={(e) => setTipoStraordinario(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="diurno">Diurno Feriale (oltre le 40h)</option>
                <option value="festivo">Festivo / Domenicale</option>
                <option value="notturno">Notturno Feriale (dalle 22:00 alle 06:00)</option>
                <option value="notturno_festivo">Notturno Festivo</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Ore di Straordinario Effettuate nel Mese</span>
              <span className="font-mono text-sky-700 font-bold">{oreSvolte} ore</span>
            </label>
            <input
              type="range"
              min={1}
              max={60}
              step={1}
              value={oreSvolte}
              onChange={(e) => setOreSvolte(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 ora</span>
              <span>20 ore</span>
              <span>40 ore</span>
              <span className="text-rose-600 font-bold">60 ore (Oltre Limite)</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo conforme al Decreto Legislativo 8 aprile 2003, n. 66 e CCNL.</span>
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Compenso Straordinari
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
            +{res.percentualeMaggiorazione}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
          <span className="text-xs text-sky-200 font-medium">Compenso Netto Aggiuntivo in Busta</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            € {res.compensoNettoInBusta.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-sky-300 font-medium block">
            Compenso Lordo Totale: € {res.compensoLordoTotale.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Paga oraria base ordinaria</span>
            <span className="font-mono text-white">€ {res.pagaBaseOraria.toFixed(2)} / ora</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Maggiorazione oraria (+{res.percentualeMaggiorazione}%)</span>
            <span className="font-mono text-emerald-400">€ {(res.tariffaOrariaStraordinario - res.pagaBaseOraria).toFixed(2)} / ora</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Tariffa oraria straordinario finale</span>
            <span className="font-mono font-bold text-white">€ {res.tariffaOrariaStraordinario.toFixed(2)} / ora</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Trattenuta previdenziale INPS (9,19%)</span>
            <span className="font-mono text-rose-400">- € {res.contributiInpsDipendente.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300">
            <span>Ritenuta IRPEF stimata (23%)</span>
            <span className="font-mono text-rose-400">- € {res.ritenutaFiscaleStimata.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong>Limite Annuale Legale:</strong> Il D.Lgs. 66/2003 fissa a 250 ore annue il limite massimo per lavoratore, salvo diversa previsione dei contratti collettivi nazionali (CCNL).
        </div>
      </div>
    </div>
  );
}

