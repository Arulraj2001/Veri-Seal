'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Sparkles,
  FileText,
  RotateCcw,
  CheckCircle2,
  Clock,
  Coins,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

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

export default function CalcoloStraordinariPage() {
  const [stipendioMensileLordo, setStipendioMensileLordo] = React.useState<number>(2200);
  const [ccnl, setCcnl] = React.useState<'commercio' | 'metalmeccanico' | 'terziario'>('commercio');
  const [tipoStraordinario, setTipoStraordinario] = React.useState<'diurno' | 'festivo' | 'notturno' | 'notturno_festivo'>('diurno');
  const [oreSvolte, setOreSvolte] = React.useState<number>(18);

  const divisoriOrari: Record<string, number> = {
    commercio: 168,
    metalmeccanico: 173,
    terziario: 168,
  };

  // Maggiorazioni percentuali CCNL
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

    // Contributo INPS dipendente 9.19%
    const contributiInpsDipendente = compensoLordoTotale * 0.0919;
    // Ritenuta IRPEF marginale stimata media 23%
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Calcolo Straordinari</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>D.Lgs. 66/2003 & Maggiorazioni CCNL Commercio / Metalmeccanici</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Straordinari e Maggiorazioni CCNL <br className="hidden sm:inline" />
          <span className="text-sky-600">Tariffa Oraria, Compenso Lordo e Netto in Busta</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Istituzionale Diretta:</strong> La retribuzione per lavoro straordinario si ottiene determinando prima la tariffa oraria base (Stipendio mensile diviso per il divisore contrattuale: <strong>168 per Commercio/Terziario</strong> e <strong>173 per Metalmeccanici</strong>) e applicando poi la percentuale di maggiorazione prevista dal CCNL (dal <strong>+15%</strong> per feriale diurno fino al <strong>+65%</strong> per notturno festivo). Dal lordo si deducono i contributi INPS (9,19%) e l'IRPEF marginale.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Dati Contrattuali</span>
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
            {/* Stipendio Lordo Mensile */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Stipendio Mensile Lordo di Riferimento</span>
                <span className="font-mono text-sky-700 font-bold text-sm">€ {stipendioMensileLordo.toLocaleString('it-IT')}</span>
              </label>
              <input
                type="number"
                min={0}
                step={50}
                value={stipendioMensileLordo || ''}
                onChange={(e) => setStipendioMensileLordo(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 2200"
              />
            </div>

            {/* CCNL e Ore Svolte */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Contratto Collettivo (CCNL)</label>
                <select
                  value={ccnl}
                  onChange={(e) => setCcnl(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="commercio">CCNL Commercio & Terziario (Divisore 168)</option>
                  <option value="metalmeccanico">CCNL Metalmeccanici Industria (Divisore 173)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Ore di Straordinario Svolte</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={oreSvolte}
                  onChange={(e) => setOreSvolte(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Fascia Oraria / Tipologia */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Tipologia di Lavoro Straordinario</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'diurno', label: 'Diurno Feriale' },
                  { id: 'festivo', label: 'Festivo / Domenica' },
                  { id: 'notturno', label: 'Notturno (22-06)' },
                  { id: 'notturno_festivo', label: 'Notturno Festivo' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTipoStraordinario(item.id as any)}
                    className={`p-2.5 rounded-xl font-bold border transition-all text-left cursor-pointer ${
                      tipoStraordinario === item.id
                        ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[10px] opacity-80">
                      +{maggiorazioniPercentuali[ccnl][item.id]}%
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo conforme all'Art. 2108 c.c. e al tetto legale annuo di 250 ore (D.Lgs. 66/2003).</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Conteggio Ore Straordinarie
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
              +{res.percentualeMaggiorazione}%
            </span>
          </div>

          {/* Net Result */}
          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">Compenso Netto Aggiuntivo in Busta</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              € {res.compensoNettoInBusta.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-sky-300 font-medium block">
              Compenso Lordo Totale: € {res.compensoLordoTotale.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Breakdown */}
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

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Disciplina e Limiti del Lavoro Straordinario in Italia
        </h2>
        <p>
          Il lavoro straordinario è la prestazione lavorativa svolta oltre il normale orario di lavoro settimanale fissato dalla legge in 40 ore (Art. 3 D.Lgs. 66/2003). La legge stabilisce che il ricorso al lavoro straordinario deve essere contenuto e utilizzato solo per esigenze tecniche e organizzative eccezionali e indifferibili.
        </p>
      </div>
    </div>
  );
}
