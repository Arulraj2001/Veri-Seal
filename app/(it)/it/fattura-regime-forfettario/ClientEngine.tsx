'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
} from 'lucide-react';

interface ForfettarioResult {
  importoCompenso: number;
  rivalsaInps: number;
  totaleFattura: number;
  marcaDaBolloDovuta: boolean;
  coefficienteRedditivita: number;
  redditoLordoForfettario: number;
  contributiInpsDeducibili: number;
  imponibileImpostaSostitutiva: number;
  aliquotaImpostaSostitutiva: number;
  impostaSostitutiva: number;
  totaleTasseContributi: number;
  guadagnoNettoEffettivo: number;
  percentualeNetta: number;
}

export function FatturaForfettarioClient() {
  const [compenso, setCompenso] = React.useState<number>(2500);
  const [includiRivalsaInps, setIncludiRivalsaInps] = React.useState<boolean>(true);
  const [coefficienteAteco, setCoefficienteAteco] = React.useState<number>(78);
  const [aliquotaFiscale, setAliquotaFiscale] = React.useState<number>(5);
  const [addebitoMarcaBollo, setAddebitoMarcaBollo] = React.useState<boolean>(true);
  const [contributiInpsVersatiAnno, setContributiInpsVersatiAnno] = React.useState<number>(300);
  const [copiedWording, setCopiedWording] = React.useState<boolean>(false);

  const calcolaFattura = React.useCallback((): ForfettarioResult => {
    const safeCompenso = Math.max(0, compenso);

    const rivalsaInps = includiRivalsaInps ? safeCompenso * 0.04 : 0;
    const totaleImponibileOperazione = safeCompenso + rivalsaInps;

    const marcaDaBolloDovuta = totaleImponibileOperazione > 77.47;
    const marcaDaBolloInFattura = (marcaDaBolloDovuta && addebitoMarcaBollo) ? 2.0 : 0;

    const totaleFattura = totaleImponibileOperazione + marcaDaBolloInFattura;

    const coefficienteDecimale = coefficienteAteco / 100;
    const redditoLordoForfettario = totaleImponibileOperazione * coefficienteDecimale;

    const imponibileImpostaSostitutiva = Math.max(0, redditoLordoForfettario - contributiInpsVersatiAnno);
    const impostaSostitutiva = imponibileImpostaSostitutiva * (aliquotaFiscale / 100);
    const inpsGestioneSeparata = redditoLordoForfettario * 0.2607;

    const totaleTasseContributi = impostaSostitutiva + inpsGestioneSeparata;
    const guadagnoNettoEffettivo = totaleFattura - totaleTasseContributi - (marcaDaBolloDovuta ? 2.0 : 0);
    const percentualeNetta = totaleFattura > 0 ? (guadagnoNettoEffettivo / totaleFattura) * 100 : 0;

    return {
      importoCompenso: safeCompenso,
      rivalsaInps,
      totaleFattura,
      marcaDaBolloDovuta,
      coefficienteRedditivita: coefficienteAteco,
      redditoLordoForfettario,
      contributiInpsDeducibili: contributiInpsVersatiAnno,
      imponibileImpostaSostitutiva,
      aliquotaImpostaSostitutiva: aliquotaFiscale,
      impostaSostitutiva,
      totaleTasseContributi,
      guadagnoNettoEffettivo,
      percentualeNetta,
    };
  }, [compenso, includiRivalsaInps, coefficienteAteco, aliquotaFiscale, addebitoMarcaBollo, contributiInpsVersatiAnno]);

  const res = calcolaFattura();

  const dicituraDiLegge = `Operazione effettuata ai sensi dell'art. 1, commi da 54 a 89, della Legge n. 190/2014 e successive modificazioni. Regime forfettario. Si richiede la non applicazione della ritenuta alla fonte a titolo d'acconto ai sensi del comma 67 dell'art. 1 della Legge n. 190/2014. Imposta di bollo da 2,00 euro assolta sull'originale per importi superiori a 77,47 euro.`;

  const handleCopyWording = () => {
    navigator.clipboard.writeText(dicituraDiLegge);
    setCopiedWording(true);
    setTimeout(() => setCopiedWording(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters Form */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Parametri Fattura Forfettaria</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCompenso(2500);
              setIncludiRivalsaInps(true);
              setCoefficienteAteco(78);
              setAliquotaFiscale(5);
              setAddebitoMarcaBollo(true);
              setContributiInpsVersatiAnno(300);
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
              <span>Importo Compenso Lordo Pattuito</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {compenso.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={100}
                value={compenso || ''}
                onChange={(e) => setCompenso(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 2500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Coefficiente di Redditività ATECO</label>
              <select
                value={coefficienteAteco}
                onChange={(e) => setCoefficienteAteco(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value={78}>78% - Professionisti, IT, Consulenti</option>
                <option value={67}>67% - Altre attività economiche / Servizi</option>
                <option value={40}>40% - Commercio al dettaglio e ingrosso</option>
                <option value={86}>86% - Costruzioni e attività immobiliari</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Aliquota Imposta Sostitutiva</label>
              <select
                value={aliquotaFiscale}
                onChange={(e) => setAliquotaFiscale(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value={5}>5% - Nuova Attività Start-Up (Primi 5 anni)</option>
                <option value={15}>15% - Aliquota Ordinaria a Regime</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800 hover:bg-slate-100">
              <input
                type="checkbox"
                checked={includiRivalsaInps}
                onChange={(e) => setIncludiRivalsaInps(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Rivalsa INPS 4% in fattura</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800 hover:bg-slate-100">
              <input
                type="checkbox"
                checked={addebitoMarcaBollo}
                onChange={(e) => setAddebitoMarcaBollo(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Addebita Marca da Bollo 2€</span>
            </label>
          </div>

          {/* Legal statement box */}
          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-950">Dicitura Obbligatoria in Fattura Elettronica:</span>
              <button
                type="button"
                onClick={handleCopyWording}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedWording ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWording ? 'Copiata!' : 'Copia Dicitura'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-mono">
              {dicituraDiLegge}
            </p>
          </div>
        </div>
      </div>

      {/* Output Summary */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Importo Totale Fattura
          </span>
          <span className="text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-800/50">
            Nessuna IVA (0%)
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-950/60 to-slate-900 border border-sky-800/40 space-y-1 text-center">
          <span className="text-xs text-sky-200 font-bold uppercase tracking-wider">
            Totale da Richiedere al Cliente
          </span>
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white py-1">
            € {res.totaleFattura.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            Guadagno Netto Stimato: € {res.guadagnoNettoEffettivo.toLocaleString('it-IT', { maximumFractionDigits: 0 })} ({res.percentualeNetta.toFixed(1)}%)
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Compenso Base</span>
            <span className="font-mono text-white">€ {res.importoCompenso.toLocaleString('it-IT')}</span>
          </div>
          {res.rivalsaInps > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Rivalsa INPS 4% (a carico cliente)</span>
              <span className="font-mono text-emerald-400">+ € {res.rivalsaInps.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          {res.marcaDaBolloDovuta && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Marca da bollo (supera 77,47 €)</span>
              <span className="font-mono text-white">€ 2,00</span>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Reddito Imponibile Fiscale ({coefficienteAteco}%)</span>
            <span className="font-mono text-white">€ {res.redditoLordoForfettario.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Imposta Sostitutiva ({aliquotaFiscale}%)</span>
            <span className="font-mono text-rose-400">- € {res.impostaSostitutiva.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Contributi INPS Gestione Separata (26,07%)</span>
            <span className="font-mono text-rose-400">- € {(res.redditoLordoForfettario * 0.2607).toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300">
            <span>Pressione Fiscale e Previdenziale Totale</span>
            <span className="font-mono font-bold text-amber-400">
              {((res.totaleTasseContributi / res.totaleFattura) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong>Fatturazione Elettronica:</strong> Dal 1° gennaio 2024 tutti i forfettari hanno l&apos;obbligo di inviare la fattura tramite il Sistema di Interscambio (SdI) dell&apos;Agenzia delle Entrate in formato XML.
        </div>
      </div>
    </div>
  );
}

