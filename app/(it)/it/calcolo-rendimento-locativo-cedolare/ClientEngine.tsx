'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

interface RendimentoResult {
  prezzoTotaleInvestimento: number;
  canoneLordoAnnuo: number;
  rendimentoLordoPercentuale: number;
  tasseCedolare: number;
  tasseOrdinaria: number;
  costiGestioneAnnui: number;
  nettoAnnuoCedolare: number;
  nettoMensileCedolare: number;
  rendimentoNettoPercentuale: number;
  sceltaPiuConveniente: string;
}

export function RendimentoLocativoClient() {
  const [valoreImmobile, setValoreImmobile] = React.useState<number>(180000);
  const [canoneMensile, setCanoneMensile] = React.useState<number>(800);
  const [tipoCedolare, setTipoCedolare] = React.useState<'libero_21' | 'concordato_10'>('libero_21');
  const [aliquotaIrpefOrdinaria, setAliquotaIrpefOrdinaria] = React.useState<number>(35);
  const [speseCondominioImuAnnue, setSpeseCondominioImuAnnue] = React.useState<number>(1200);
  const [mesiSfittoStimati, setMesiSfittoStimati] = React.useState<number>(0.5);

  const calcolaRendimento = React.useCallback((): RendimentoResult => {
    const safeValore = Math.max(1000, valoreImmobile);
    const safeCanone = Math.max(0, canoneMensile);

    const mesiLocati = Math.max(0, 12 - mesiSfittoStimati);
    const canoneLordoAnnuo = safeCanone * mesiLocati;

    const rendimentoLordoPercentuale = (canoneLordoAnnuo / safeValore) * 100;

    const aliquotaCedolare = tipoCedolare === 'concordato_10' ? 0.10 : 0.21;
    const tasseCedolare = canoneLordoAnnuo * aliquotaCedolare;

    const imponibileIrpef = canoneLordoAnnuo * 0.95;
    const impostaRegistroLocatore = (canoneLordoAnnuo * 0.02) / 2;
    const tasseOrdinaria = (imponibileIrpef * (aliquotaIrpefOrdinaria / 100)) + impostaRegistroLocatore;

    const costiGestioneAnnui = speseCondominioImuAnnue;

    const nettoAnnuoCedolare = canoneLordoAnnuo - tasseCedolare - costiGestioneAnnui;
    const nettoMensileCedolare = nettoAnnuoCedolare / 12;

    const rendimentoNettoPercentuale = (nettoAnnuoCedolare / safeValore) * 100;

    const convenienza = tasseCedolare < tasseOrdinaria
      ? `Cedolare Secca (Risparmio di € ${(tasseOrdinaria - tasseCedolare).toFixed(0)} all'anno)`
      : `Regime Ordinario (per chi ha molte detrazioni da recuperare)`;

    return {
      prezzoTotaleInvestimento: safeValore,
      canoneLordoAnnuo,
      rendimentoLordoPercentuale,
      tasseCedolare,
      tasseOrdinaria,
      costiGestioneAnnui,
      nettoAnnuoCedolare,
      nettoMensileCedolare,
      rendimentoNettoPercentuale,
      sceltaPiuConveniente: convenienza,
    };
  }, [valoreImmobile, canoneMensile, tipoCedolare, aliquotaIrpefOrdinaria, speseCondominioImuAnnue, mesiSfittoStimati]);

  const res = calcolaRendimento();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Parametri dell&apos;Investimento</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setValoreImmobile(180000);
              setCanoneMensile(800);
              setTipoCedolare('libero_21');
              setAliquotaIrpefOrdinaria(35);
              setSpeseCondominioImuAnnue(1200);
              setMesiSfittoStimati(0.5);
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
              <span>Costo Totale Acquisto / Valore Immobile</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {valoreImmobile.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={5000}
                value={valoreImmobile || ''}
                onChange={(e) => setValoreImmobile(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 180000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Canone Mensile Richiesto</label>
              <input
                type="number"
                min={0}
                step={50}
                value={canoneMensile || ''}
                onChange={(e) => setCanoneMensile(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Regime Cedolare Secca</label>
              <select
                value={tipoCedolare}
                onChange={(e) => setTipoCedolare(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="libero_21">Canone Libero 4+4 (Aliquota 21%)</option>
                <option value="concordato_10">Canone Concordato 3+2 (Aliquota 10%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Spese Fisse Annue (IMU + Condom.)</label>
              <input
                type="number"
                min={0}
                step={100}
                value={speseCondominioImuAnnue || ''}
                onChange={(e) => setSpeseCondominioImuAnnue(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Rischio Sfitto Annuo Stimato</span>
                <span className="font-mono text-sky-700 font-bold">{mesiSfittoStimati} mesi</span>
              </label>
              <input
                type="range"
                min={0}
                max={4}
                step={0.5}
                value={mesiSfittoStimati}
                onChange={(e) => setMesiSfittoStimati(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo conforme alla tassazione sostitutiva ex D.Lgs. 14 marzo 2011, n. 23.</span>
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Rendimento Netto (Cap Rate)
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            Netto: {res.rendimentoNettoPercentuale.toFixed(2)}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
          <span className="text-xs text-sky-200 font-medium">Incasso Netto Mensile Reale</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            € {res.nettoMensileCedolare.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-sky-300 font-medium block">
            Netto Annuo in Tasca: € {res.nettoAnnuoCedolare.toLocaleString('it-IT', { maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Canone Lordo Annuo Incassato</span>
            <span className="font-mono text-white">€ {res.canoneLordoAnnuo.toLocaleString('it-IT')}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Rendimento Lordo su Capitale</span>
            <span className="font-mono text-amber-400">{res.rendimentoLordoPercentuale.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Imposta Cedolare Secca ({tipoCedolare === 'concordato_10' ? '10%' : '21%'})</span>
            <span className="font-mono text-rose-400">- € {res.tasseCedolare.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Costi Annui di Gestione (IMU/Condominio)</span>
            <span className="font-mono text-rose-400">- € {res.costiGestioneAnnui.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong className="text-slate-200">Verdetto Convenienza:</strong> {res.sceltaPiuConveniente}. La Cedolare Secca esonera inoltre dal pagamento dell&apos;imposta di bollo e di registro alla stipula e alle proroghe.
        </div>
      </div>
    </div>
  );
}

