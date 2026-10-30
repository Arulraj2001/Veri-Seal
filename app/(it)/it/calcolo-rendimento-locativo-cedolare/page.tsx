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
  TrendingUp,
  Percent,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

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

export default function RendimentoLocativoPage() {
  const [valoreImmobile, setValoreImmobile] = React.useState<number>(180000);
  const [canoneMensile, setCanoneMensile] = React.useState<number>(800);
  const [tipoCedolare, setTipoCedolare] = React.useState<'libero_21' | 'concordato_10'>('libero_21');
  const [aliquotaIrpefOrdinaria, setAliquotaIrpefOrdinaria] = React.useState<number>(35);
  const [speseCondominioImuAnnue, setSpeseCondominioImuAnnue] = React.useState<number>(1200);
  const [mesiSfittoStimati, setMesiSfittoStimati] = React.useState<number>(0.5);

  const calcolaRendimento = React.useCallback((): RendimentoResult => {
    const safeValore = Math.max(1000, valoreImmobile);
    const safeCanone = Math.max(0, canoneMensile);

    // Canone effettivo tenuto conto dei mesi di sfitto annui stimati
    const mesiLocati = Math.max(0, 12 - mesiSfittoStimati);
    const canoneLordoAnnuo = safeCanone * mesiLocati;

    // Rendimento Lordo (Gross Cap Rate)
    const rendimentoLordoPercentuale = (canoneLordoAnnuo / safeValore) * 100;

    // 1. Tassazione Cedolare Secca (21% libero o 10% concordato)
    const aliquotaCedolare = tipoCedolare === 'concordato_10' ? 0.10 : 0.21;
    const tasseCedolare = canoneLordoAnnuo * aliquotaCedolare;

    // 2. Tassazione Ordinaria IRPEF (Deduzione forfettaria 5% art. 37 TUIR)
    const imponibileIrpef = canoneLordoAnnuo * 0.95;
    const impostaRegistroLocatore = (canoneLordoAnnuo * 0.02) / 2; // Metà a carico locatore
    const tasseOrdinaria = (imponibileIrpef * (aliquotaIrpefOrdinaria / 100)) + impostaRegistroLocatore;

    // Costi di gestione annui (IMU + condominio proprietario + manutenzioni)
    const costiGestioneAnnui = speseCondominioImuAnnue;

    // Netto finale in opzione Cedolare Secca
    const nettoAnnuoCedolare = canoneLordoAnnuo - tasseCedolare - costiGestioneAnnui;
    const nettoMensileCedolare = nettoAnnuoCedolare / 12;

    // Rendimento Netto (Net Cap Rate)
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Rendimento Locativo & Cedolare</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>D.Lgs. 23/2011 & Tassazione Cedolare Secca 21% / 10%</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Simulatore Rendimento Locativo Netto <br className="hidden sm:inline" />
          <span className="text-sky-600">e Confronto Cedolare Secca vs IRPEF 2026</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Fiscale Diretta:</strong> La <strong>Cedolare Secca al 21%</strong> (per contratti liberi 4+4) o al <strong>10%</strong> (per contratti a canone concordato 3+2 in comuni ad alta tensione abitativa) sostituisce IRPEF, addizionali regionali/comunali, imposta di registro e marche da bollo sul contratto. Per calcolare il rendimento netto reale (<em>Cap Rate</em>) occorre sottrarre dal canone annuo l'IMU, le spese condominiali e le imposte, rapportando il flusso netto al prezzo totale pagato per l'immobile.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Dati Investimento & Affitto</span>
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
            {/* Valore Immobile e Canone Mensile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Prezzo Immobile + Ristrutturazione (€)</label>
                <input
                  type="number"
                  min={1000}
                  step={5000}
                  value={valoreImmobile || ''}
                  onChange={(e) => setValoreImmobile(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Canone di Locazione Mensile (€)</label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={canoneMensile || ''}
                  onChange={(e) => setCanoneMensile(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Tipologia Cedolare e Spese di Gestione */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Aliquota Cedolare Secca</label>
                <select
                  value={tipoCedolare}
                  onChange={(e) => setTipoCedolare(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="libero_21">Canone Libero 4+4 (Cedolare 21%)</option>
                  <option value="concordato_10">Canone Concordato 3+2 (Cedolare Agevolata 10%)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Costi Annui di Gestione (IMU + Condom.)</label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={speseCondominioImuAnnue || ''}
                  onChange={(e) => setSpeseCondominioImuAnnue(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Mesi di Vacanza Locativa */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex justify-between">
                <span>Stima Sfitto / Vacanza Locativa Annuale</span>
                <span className="font-mono text-sky-700">{mesiSfittoStimati} Mesi / anno</span>
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

        {/* Results Column (5 cols) */}
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
            <strong className="text-slate-200">Verdetto Convenienza:</strong> {res.sceltaPiuConveniente}. La Cedolare Secca esonera inoltre dal pagamento dell'imposta di bollo e di registro alla stipula e alle proroghe.
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Cedolare Secca vs Regime Ordinario: Guida alla Scelta
        </h2>
        <p>
          La <strong>Cedolare Secca</strong> è un regime facoltativo di tassazione delle locazioni abitative per persone fisiche che non agiscono nell'esercizio di attività d'impresa. L'adesione a questo regime comporta la totale sostituzione dell'IRPEF e delle addizionali comunali e regionali sui canoni di locazione, oltre all'azzeramento dell'imposta di registro e dell'imposta di bollo sul contratto.
        </p>
      </div>
    </div>
  );
}
