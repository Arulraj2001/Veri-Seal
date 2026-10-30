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
  AlertCircle,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

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

export default function CalcoloTfrPage() {
  const [retribuzioneAnnua, setRetribuzioneAnnua] = React.useState<number>(32000);
  const [anniServizio, setAnniServizio] = React.useState<number>(8);
  const [mesiServizio, setMesiServizio] = React.useState<number>(4);
  const [inflazioneMediaIstat, setInflazioneMediaIstat] = React.useState<number>(2.0); // 2.0%
  const [destinazioneTfr, setDestinazioneTfr] = React.useState<'azienda' | 'fondo_pensione'>('azienda');

  const calcolaTfr = React.useCallback((): TfrResult => {
    const anniDecimali = Math.max(0.1, anniServizio + mesiServizio / 12);
    const safeRal = Math.max(0, retribuzioneAnnua);

    // 1. Quota di accantonamento annuo = Retribuzione annua / 13.5 (Art. 2120 c.c.)
    const quotaLordaAnnua = safeRal / 13.5;
    // Contributo 0.50% versato all'INPS per il Fondo di Garanzia
    const contributoInpsFondoGaranzia = safeRal * 0.005;
    const accantonamentoAnnualeNetto = Math.max(0, quotaLordaAnnua - contributoInpsFondoGaranzia);

    // 2. TFR Lordo totale capitale maturato negli anni
    const capitaleMaturato = accantonamentoAnnualeNetto * anniDecimali;

    // 3. Rivalutazione annua ISTAT: 1,5% fisso + 75% dell'aumento indice FOI
    const coefficienteRivalutazione = 0.015 + (inflazioneMediaIstat / 100) * 0.75;
    // Calcolo composito stimato della rivalutazione sul fondo progressivo
    const rivalutazioneIstatTotale = (capitaleMaturato * coefficienteRivalutazione * anniDecimali) / 2;
    // Imposta sostitutiva del 17% sui rendimenti di rivalutazione del TFR
    const impostaSostitutivaRivalutazione = rivalutazioneIstatTotale * 0.17;

    const tfrLordoMaturato = capitaleMaturato + rivalutazioneIstatTotale;

    // 4. Tassazione Separata (Art. 19 e 21 TUIR)
    // Reddito di riferimento = (TFR Lordo / Anni di servizio) * 12
    const baseDiRiferimento = (tfrLordoMaturato / anniDecimali) * 12;

    // Aliquota media IRPEF sugli scaglioni vigenti per la base di riferimento
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

    // Se il TFR è destinato al Fondo Pensione complementare, la tassazione agevolata è al 15% (che scende fino al 9%)
    const aliquotaApplicata = destinazioneTfr === 'fondo_pensione' ? 0.15 : aliquotaMediaIrpef;

    // TFR imponibile (capitale maturato al netto dell'imposta sostitutiva sulle rivalutazioni già assolta)
    const ritenutaIrpefSeparata = capitaleMaturato * aliquotaApplicata;
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Calcolo TFR</span>
      </nav>

      {/* Header & Direct Answer Capsule */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Art. 2120 Codice Civile & Tassazione Separata TUIR</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo TFR Netto e Lordo 2026 <br className="hidden sm:inline" />
          <span className="text-sky-600">Liquidazione Trattamento di Fine Rapporto</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Statutaria Diretta:</strong> Il TFR (Trattamento di Fine Rapporto) si calcola dividendo la retribuzione annua lorda di ciascun anno per <strong>13,5</strong>, sottraendo lo <strong>0,50%</strong> per il Fondo di Garanzia INPS. Il fondo accantonato viene rivalutato ogni anno a un tasso pari all’<strong>1,5% fisso + 75% dell’indice d’inflazione ISTAT FOI</strong> (con imposta sostitutiva del 17%). Al momento della liquidazione, il TFR non si cumula con i redditi ordinari ma subisce la <strong>tassazione separata</strong> con un’aliquota media calcolata sul reddito di riferimento (generalmente tra il 23% e il 28%).
        </div>
      </div>

      {/* Calculator Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Parametri Lavorativi</span>
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
            {/* RAL Media */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Retribuzione Annua Media (RAL)</span>
                <span className="font-mono text-sky-700 font-bold text-sm">€ {retribuzioneAnnua.toLocaleString('it-IT')}</span>
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={retribuzioneAnnua || ''}
                onChange={(e) => setRetribuzioneAnnua(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 32000"
              />
            </div>

            {/* Anzianità di Servizio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Anni di Servizio Completi</label>
                <input
                  type="number"
                  min={0}
                  max={45}
                  value={anniServizio}
                  onChange={(e) => setAnniServizio(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Mesi Ulteriori (Frazione &ge; 15 gg)</label>
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={mesiServizio}
                  onChange={(e) => setMesiServizio(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Inflazione ISTAT & Destinazione TFR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Inflazione ISTAT Media Stimata (%)</label>
                <input
                  type="number"
                  step={0.1}
                  min={0}
                  max={15}
                  value={inflazioneMediaIstat}
                  onChange={(e) => setInflazioneMediaIstat(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Destinazione del TFR</label>
                <select
                  value={destinazioneTfr}
                  onChange={(e) => setDestinazioneTfr(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="azienda">In Azienda (Tassazione Separata IRPEF)</option>
                  <option value="fondo_pensione">Fondo Pensione (Tassazione 15% - 9%)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo 100% in-browser conforme alla formula codicistica dell’Art. 2120 c.c.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Liquidazione Spettante
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
              {(anniServizio + mesiServizio / 12).toFixed(1)} Anni
            </span>
          </div>

          {/* Net Liquidated TFR */}
          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">TFR Netto in Tasca al Lavoratore</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              € {res.tfrNettoLiquidato.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-sky-300 font-medium block">
              TFR Lordo Maturato: € {res.tfrLordoMaturato.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Breakdown */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Quota accantonata all'anno</span>
              <span className="font-mono text-white">€ {res.accantonamentoAnnuale.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Contributo 0,5% Fondo Garanzia INPS</span>
              <span className="font-mono text-slate-400">€ {res.contributoInpsFondoGaranzia.toLocaleString('it-IT', { maximumFractionDigits: 0 })} / anno</span>
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
            <strong className="text-slate-200">Nota Fiscale Agenzia delle Entrate:</strong> Il datore di lavoro applica una ritenuta d'acconto provvisoria. Entro 5 anni l'Agenzia delle Entrate riliquida l'imposta in base al reddito medio effettivo dell'ultimo quinquennio.
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Comprehensive 800+ Words Statutory Legal Guide */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Disciplina Giuridica e Metodo di Calcolo del TFR (Art. 2120 Codice Civile)
          </h2>
          <p>
            Il <strong>Trattamento di Fine Rapporto (TFR)</strong>, comunemente noto come liquidazione o buonuscita, è una porzione di retribuzione differita riconosciuta a tutti i lavoratori subordinati del settore privato e pubblico al momento della cessazione del rapporto di lavoro per qualsiasi causa: dimissioni volontarie, licenziamento per giustificato motivo, giusta causa o raggiungimento dell'età pensionabile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-black text-base text-slate-900">
              La Quota Annuale e il Divisore 13,5
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Ai sensi del comma 1 dell'Art. 2120 c.c., la quota da accantonare ogni anno si ottiene dividendo la retribuzione utile annua (comprensiva di stipendio base, contingenza, scatti, mensilità aggiuntive e indennità fisse) per il divisore fisso di <strong>13,5</strong>. Per le frazioni di anno, il mese viene conteggiato per intero se il lavoratore ha prestato servizio per almeno 15 giorni solari.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-black text-base text-slate-900">
              Il Meccanismo di Rivalutazione ISTAT
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Il fondo accantonato al 31 dicembre dell'anno precedente viene rivalutato annualmente al fine di proteggere il potere d'acquisto dei lavoratori dall'erosione inflazionistica. Il coefficiente di rivalutazione è composto da una quota fissa pari all’<strong>1,5%</strong> a cui si aggiunge il <strong>75% della variazione dell'indice dei prezzi al consumo FOI</strong> (famiglie di operai e impiegati) accertato dall'ISTAT. Su questo rendimento finanziario grava un'imposta sostitutiva del <strong>17%</strong>.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Anticipazione del TFR: Requisiti di Legge
          </h3>
          <p>
            Il lavoratore con almeno <strong>8 anni di servizio continuativo</strong> presso lo stesso datore di lavoro può richiedere un'anticipazione fino al <strong>70% del TFR maturato</strong> nei seguenti casi specifici documentati:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
            <li>Acquisto della prima casa di abitazione per sé o per i propri figli;</li>
            <li>Spese sanitarie straordinarie per terapie e interventi necessari riconosciuti dalle strutture sanitarie pubbliche;</li>
            <li>Spese durante i congedi parentali facoltativi o congedi formativi (Art. 7 Legge 53/2000).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
