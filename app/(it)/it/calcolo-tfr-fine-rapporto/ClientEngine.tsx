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

interface TfrResult {
  retribuzioneAnnuaMedia: number;
  anniServizio: number;
  mesiServizio: number;
  accantonamentoAnnuale: number;
  contributoInpsFondoGaranzia: number;
  tfrLordoMaturato: number;
  rivalutazioneIstatTotale: number;
  impostaSostitutivaRivalutazione: number;
  baseDiRiferimento: number;
  aliquotaMediaIrpef: number;
  ritenutaIrpefSeparata: number;
  tfrNettoLiquidato: number;
}

export function CalcoloTfrClient() {
  const [retribuzioneAnnua, setRetribuzioneAnnua] = React.useState<number>(32000);
  const [anniServizio, setAnniServizio] = React.useState<number>(8);
  const [mesiServizio, setMesiServizio] = React.useState<number>(4);
  const [inflazioneMediaIstat, setInflazioneMediaIstat] = React.useState<number>(2.0);
  const [destinazioneTfr, setDestinazioneTfr] = React.useState<'azienda' | 'fondo_pensione'>('azienda');

  const calcolaTfr = React.useCallback((): TfrResult => {
    const anniDecimali = Math.max(0.1, anniServizio + mesiServizio / 12);
    const safeRal = Math.max(0, retribuzioneAnnua);

    const quotaLordaAnnua = safeRal / 13.5;
    const contributoInpsFondoGaranzia = safeRal * 0.005;
    const accantonamentoAnnualeNetto = Math.max(0, quotaLordaAnnua - contributoInpsFondoGaranzia);

    const capitaleMaturato = accantonamentoAnnualeNetto * anniDecimali;

    const coefficienteRivalutazione = 0.015 + (inflazioneMediaIstat / 100) * 0.75;
    const rivalutazioneIstatTotale = (capitaleMaturato * coefficienteRivalutazione * anniDecimali) / 2;
    const impostaSostitutivaRivalutazione = rivalutazioneIstatTotale * 0.17;

    const tfrLordoMaturato = capitaleMaturato + rivalutazioneIstatTotale;

    const baseDiRiferimento = (tfrLordoMaturato / anniDecimali) * 12;

    let aliquotaMediaIrpef = 0.23;
    if (baseDiRiferimento <= 28000) {
      aliquotaMediaIrpef = 0.23;
    } else if (baseDiRiferimento <= 50000) {
      const imposta = 28000 * 0.23 + (baseDiRiferimento - 28000) * 0.35;
      aliquotaMediaIrpef = imposta / baseDiRiferimento;
    } else {
      const imposta = 28000 * 0.23 + 22000 * 0.35 + (baseDiRiferimento - 50000) * 0.43;
      aliquotaMediaIrpef = imposta / baseDiRiferimento;
    }

    const aliquotaApplicata = destinazioneTfr === 'fondo_pensione' ? 0.15 : aliquotaMediaIrpef;
    const ritenutaIrpefSeparata = tfrLordoMaturato * aliquotaApplicata;
    const tfrNettoLiquidato = tfrLordoMaturato - ritenutaIrpefSeparata - impostaSostitutivaRivalutazione;

    return {
      retribuzioneAnnuaMedia: safeRal,
      anniServizio,
      mesiServizio,
      accantonamentoAnnuale: accantonamentoAnnualeNetto,
      contributoInpsFondoGaranzia,
      tfrLordoMaturato,
      rivalutazioneIstatTotale,
      impostaSostitutivaRivalutazione,
      baseDiRiferimento,
      aliquotaMediaIrpef: aliquotaApplicata * 100,
      ritenutaIrpefSeparata,
      tfrNettoLiquidato,
    };
  }, [retribuzioneAnnua, anniServizio, mesiServizio, inflazioneMediaIstat, destinazioneTfr]);

  const res = calcolaTfr();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Dati del Rapporto di Lavoro</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setRetribuzioneAnnua(32000);
              setAnniServizio(8);
              setMesiServizio(4);
              setInflazioneMediaIstat(2.0);
              setDestinazioneTfr('azienda');
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
              <span>Retribuzione Annua Lorda Media (RAL)</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {retribuzioneAnnua.toLocaleString('it-IT')}</span>
            </label>
            <input
              type="number"
              min={0}
              step={1000}
              value={retribuzioneAnnua || ''}
              onChange={(e) => setRetribuzioneAnnua(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-900 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Anni di Servizio</label>
              <input
                type="number"
                min={0}
                max={45}
                value={anniServizio}
                onChange={(e) => setAnniServizio(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Mesi Aggiuntivi (&ge;15 gg)</label>
              <input
                type="number"
                min={0}
                max={11}
                value={mesiServizio}
                onChange={(e) => setMesiServizio(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Destinazione TFR</label>
              <select
                value={destinazioneTfr}
                onChange={(e) => setDestinazioneTfr(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="azienda">In Azienda (Tassazione Separata IRPEF)</option>
                <option value="fondo_pensione">Fondo Pensione (Tassazione 15% - 9%)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Inflazione Media ISTAT FOI</label>
              <select
                value={inflazioneMediaIstat}
                onChange={(e) => setInflazioneMediaIstat(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value={1.5}>1,5% annuo (Moderata)</option>
                <option value={2.0}>2,0% annuo (Media BCE)</option>
                <option value={3.5}>3,5% annuo (Elevata)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Output Summary */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Liquidazione Spettante
          </span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
            Art. 2120 c.c.
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-slate-900 border border-emerald-800/40 space-y-1 text-center">
          <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">
            TFR Netto Liquidato
          </span>
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white py-1">
            € {res.tfrNettoLiquidato.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-400 font-mono">
            TFR Lordo Maturato: € {res.tfrLordoMaturato.toLocaleString('it-IT', { maximumFractionDigits: 0 })}
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Accantonamento Netto Annuo</span>
            <span className="font-mono text-white font-bold">€ {res.accantonamentoAnnuale.toLocaleString('it-IT', { maximumFractionDigits: 0 })} / anno</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Rivalutazione ISTAT cumulata</span>
            <span className="font-mono text-emerald-400">+ € {res.rivalutazioneIstatTotale.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Imposta sost. 17% su rivalutazione</span>
            <span className="font-mono text-rose-400">- € {res.impostaSostitutivaRivalutazione.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Aliquota Media Fiscale Applicata</span>
            <span className="font-mono font-bold text-amber-400">{res.aliquotaMediaIrpef.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300">
            <span>Ritenuta IRPEF Tassazione Separata</span>
            <span className="font-mono font-bold text-rose-400">- € {res.ritenutaIrpefSeparata.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong className="text-slate-200">Nota Fiscale Agenzia delle Entrate:</strong> Il datore di lavoro applica una ritenuta d&apos;acconto provvisoria. Entro 5 anni l&apos;Agenzia delle Entrate riliquida l&apos;imposta in base al reddito medio effettivo dell&apos;ultimo quinquennio.
        </div>
      </div>
    </div>
  );
}

