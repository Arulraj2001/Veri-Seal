'use client';

import * as React from 'react';
import {
  Scale,
  RotateCcw,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Copy,
  Check,
  Building,
  FileText,
} from 'lucide-react';

interface InteressiResult {
  capitale: number;
  giorniRitardo: number;
  tassoApplicato: number;
  quotaInteressi: number;
  speseForfettarie: number;
  totaleDovuto: number;
  formulaSpiegata: string;
}

export function CalcoloInteressiLegaliClient() {
  const [capitale, setCapitale] = React.useState<number>(5000);
  const [dataScadenza, setDataScadenza] = React.useState<string>('2026-01-15');
  const [dataPagamento, setDataPagamento] = React.useState<string>('2026-05-30');
  const [regime, setRegime] = React.useState<'commerciale_b2b' | 'agroalimentare' | 'legale_civile'>('commerciale_b2b');
  const [includeSpese40, setIncludeSpese40] = React.useState<boolean>(true);
  const [tassoCustom, setTassoCustom] = React.useState<number | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);

  const getTassoDefault = React.useCallback((): number => {
    switch (regime) {
      case 'commerciale_b2b':
        return 11.25;
      case 'agroalimentare':
        return 12.25;
      case 'legale_civile':
      default:
        return 2.0;
    }
  }, [regime]);

  const calcolaInteressi = React.useCallback((): InteressiResult => {
    const safeCapitale = Math.max(0, capitale);
    const dScadenza = new Date(dataScadenza);
    const dPagamento = new Date(dataPagamento);

    const diffTime = dPagamento.getTime() - dScadenza.getTime();
    const giorniRitardo = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    const tassoApplicato = tassoCustom !== null ? tassoCustom : getTassoDefault();

    const quotaInteressi = (safeCapitale * tassoApplicato * giorniRitardo) / 36500;

    const speseForfettarie = (includeSpese40 && regime !== 'legale_civile' && giorniRitardo > 0) ? 40 : 0;

    const totaleDovuto = safeCapitale + quotaInteressi + speseForfettarie;

    const formulaSpiegata = `(€ ${safeCapitale.toLocaleString('it-IT')} × ${tassoApplicato.toFixed(2)}% × ${giorniRitardo} gg) / 36.500`;

    return {
      capitale: safeCapitale,
      giorniRitardo,
      tassoApplicato,
      quotaInteressi,
      speseForfettarie,
      totaleDovuto,
      formulaSpiegata,
    };
  }, [capitale, dataScadenza, dataPagamento, regime, includeSpese40, tassoCustom, getTassoDefault]);

  const res = calcolaInteressi();

  const testoSollecito = `Raccomandata A/R o PEC
Oggetto: Costituzione in mora e sollecito formale di pagamento ex D.Lgs. 231/2002
Gentile Debitore,
con riferimento alla fattura n. [Numero] scaduta il ${dataScadenza} e tuttora insoluta per l'importo capitale di € ${res.capitale.toLocaleString('it-IT')},
Le intimiamo il saldo immediato entro 7 giorni delle seguenti somme maturate ai sensi di legge:
- Capitale insoluto: € ${res.capitale.toLocaleString('it-IT')}
- Interessi di mora ex D.Lgs. 231/2002 (${res.tassoApplicato}% per ${res.giorniRitardo} gg): € ${res.quotaInteressi.toFixed(2)}
${res.speseForfettarie > 0 ? `- Risarcimento forfettario spese di recupero (Art. 6 c. 2): € ${res.speseForfettarie.toFixed(2)}\n` : ''}
TOTALE DOVUTO: € ${res.totaleDovuto.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
In difetto di riscontro, procederemo giudizialmente con ricorso per decreto ingiuntivo provvisoriamente esecutivo.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(testoSollecito);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Scale className="w-4 h-4 text-sky-600" />
            <span>Parametri del Credito Insoluto</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCapitale(5000);
              setDataScadenza('2026-01-15');
              setDataPagamento('2026-05-30');
              setRegime('commerciale_b2b');
              setIncludeSpese40(true);
              setTassoCustom(null);
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
              <span>Capitale Fattura / Credito Scaduto (€)</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {capitale.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={100}
                value={capitale || ''}
                onChange={(e) => setCapitale(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 5000"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Regime Giuridico del Credito</label>
            <select
              value={regime}
              onChange={(e) => {
                setRegime(e.target.value as any);
                setTassoCustom(null);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
            >
              <option value="commerciale_b2b">Transazioni Commerciali B2B o verso P.A. (D.Lgs. 231/2002 - Tasso BCE + 8%)</option>
              <option value="agroalimentare">Cessione Prodotti Agroalimentari (D.Lgs. 198/2021 - Tasso BCE + 9%)</option>
              <option value="legale_civile">Interessi Legali Civilistici Generali (Art. 1284 Codice Civile)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                <span>Data di Scadenza Fattura</span>
              </label>
              <input
                type="date"
                value={dataScadenza}
                onChange={(e) => setDataScadenza(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Data Pagamento / Calcolo Mora</span>
              </label>
              <input
                type="date"
                value={dataPagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            {regime !== 'legale_civile' && (
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800 hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={includeSpese40}
                  onChange={(e) => setIncludeSpese40(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Addebita indennizzo forfettario di 40,00 € per spese di recupero (Art. 6 c. 2 D.Lgs. 231/2002)</span>
              </label>
            )}
          </div>

          {/* Facsimile Diffida Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>Fac-simile Lettera di Messa in Mora per Decreto Ingiuntivo</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiata!' : 'Copia Lettera'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-600 font-mono leading-relaxed border-t border-slate-200 pt-2 whitespace-pre-line">
              {testoSollecito}
            </p>
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Credito Complessivo Esigibile
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
            {res.giorniRitardo} gg di ritardo
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
          <span className="text-xs text-sky-200 font-medium">Totale Dovuto dal Debitore</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            € {res.totaleDovuto.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono font-bold block">
            Interessi Maturati: +€ {res.quotaInteressi.toFixed(2)} (al {res.tassoApplicato}%)
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Capitale Fattura Insoluta</span>
            <span className="font-mono text-white font-bold">€ {res.capitale.toLocaleString('it-IT')}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Saggio di Interesse Applicato</span>
            <span className="font-mono text-amber-400">{res.tassoApplicato.toFixed(2)}% annuo</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Quota Interessi di Mora</span>
            <span className="font-mono text-emerald-400">+ € {res.quotaInteressi.toFixed(2)}</span>
          </div>
          {res.speseForfettarie > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Indennizzo Spese Recupero Credito</span>
              <span className="font-mono text-emerald-400">+ € {res.speseForfettarie.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 text-slate-300">
            <span>Formula Convenzione ACT/365</span>
            <span className="font-mono text-[10px] text-slate-400">{res.formulaSpiegata}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong>Automatismo della Mora:</strong> Nei contratti commerciali ex D.Lgs. 231/2002 gli interessi decorrono automaticamente dal giorno successivo alla scadenza, senza necessità di formale costituzione in mora.
        </div>
      </div>
    </div>
  );
}
