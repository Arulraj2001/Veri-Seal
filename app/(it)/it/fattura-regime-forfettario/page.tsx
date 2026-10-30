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
  Download,
  Copy,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

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

export default function FatturaForfettarioPage() {
  const [compenso, setCompenso] = React.useState<number>(2500);
  const [includiRivalsaInps, setIncludiRivalsaInps] = React.useState<boolean>(true);
  const [coefficienteAteco, setCoefficienteAteco] = React.useState<number>(78); // 78% professionisti / informatica
  const [aliquotaFiscale, setAliquotaFiscale] = React.useState<number>(5); // 5% nuova attività, o 15% standard
  const [addebitoMarcaBollo, setAddebitoMarcaBollo] = React.useState<boolean>(true);
  const [contributiInpsVersatiAnno, setContributiInpsVersatiAnno] = React.useState<number>(300);
  const [copiedWording, setCopiedWording] = React.useState<boolean>(false);

  const calcolaFattura = React.useCallback((): ForfettarioResult => {
    const safeCompenso = Math.max(0, compenso);

    // 1. Rivalsa INPS Gestione Separata 4% (facoltativa ma standard per professionisti)
    const rivalsaInps = includiRivalsaInps ? safeCompenso * 0.04 : 0;
    const totaleImponibileOperazione = safeCompenso + rivalsaInps;

    // Marca da bollo 2,00 € obbligatoria se importo supera 77,47 €
    const marcaDaBolloDovuta = totaleImponibileOperazione > 77.47;
    const marcaDaBolloInFattura = (marcaDaBolloDovuta && addebitoMarcaBollo) ? 2.0 : 0;

    const totaleFattura = totaleImponibileOperazione + marcaDaBolloInFattura;

    // 2. Calcolo Fiscale & Contributivo Annuo Proporzionato
    const coefficienteDecimale = coefficienteAteco / 100;
    const redditoLordoForfettario = totaleImponibileOperazione * coefficienteDecimale;

    // I contributi previdenziali effettivamente versati nell'anno sono interamente deducibili dal reddito forfettario
    const imponibileImpostaSostitutiva = Math.max(0, redditoLordoForfettario - contributiInpsVersatiAnno);

    // Imposta sostitutiva al 5% (primi 5 anni di nuova attività) o 15% ordinaria
    const impostaSostitutiva = imponibileImpostaSostitutiva * (aliquotaFiscale / 100);

    // Contributo INPS Gestione Separata (aliquota 26.07% sull'imponibile forfettario)
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Fattura Regime Forfettario</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Legge 190/2014 & Aliquota 5% o 15% (Fino a 85.000 €)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Fattura Regime Forfettario 2026 <br className="hidden sm:inline" />
          <span className="text-sky-600">Simulatore Tasse, Rivalsa INPS e Netto in Tasca</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Fiscale Diretta:</strong> Nel Regime Forfettario la fattura non applica IVA né ritenuta d'acconto. I professionisti possono aggiungere la <strong>rivalsa INPS del 4%</strong> al compenso pattuito. Se l'importo totale supera <strong>77,47 €</strong>, è obbligatorio applicare l'imposta di bollo di <strong>2,00 €</strong>. Il reddito imponibile non si calcola sui costi reali ma applicando il <strong>coefficiente di redditività ATECO</strong> (es. 78% per freelance e consulenti), sul quale si versa l'imposta sostitutiva del <strong>5%</strong> (primi 5 anni) o del <strong>15%</strong> oltre alla Gestione Separata INPS.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Dati della Fattura</span>
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
            {/* Compenso pattuito */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Compenso Lordo Pattuito</span>
                <span className="font-mono text-sky-700 font-bold text-sm">€ {compenso.toLocaleString('it-IT')}</span>
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={compenso || ''}
                onChange={(e) => setCompenso(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 2500"
              />
            </div>

            {/* Rivalsa INPS e Marca da Bollo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="p-3.5 rounded-xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={includiRivalsaInps}
                  onChange={(e) => setIncludiRivalsaInps(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded accent-sky-600"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Rivalsa INPS 4%</div>
                  <div className="text-slate-500 text-[11px]">Addebita il 4% al committente</div>
                </div>
              </label>

              <label className="p-3.5 rounded-xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={addebitoMarcaBollo}
                  onChange={(e) => setAddebitoMarcaBollo(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded accent-sky-600"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Rivalsa Bollo 2€</div>
                  <div className="text-slate-500 text-[11px]">Addebita marca da bollo al cliente</div>
                </div>
              </label>
            </div>

            {/* Codice ATECO & Aliquota Fiscale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Settore / Coefficiente ATECO</label>
                <select
                  value={coefficienteAteco}
                  onChange={(e) => setCoefficienteAteco(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value={78}>Professionisti, IT, Freelance (78%)</option>
                  <option value={67}>Servizi, Grafica, Comunicazione (67%)</option>
                  <option value={40}>Commercio, Negozi fisici / online (40%)</option>
                  <option value={86}>Costruzioni, Edilizia (86%)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Imposta Sostitutiva</label>
                <select
                  value={aliquotaFiscale}
                  onChange={(e) => setAliquotaFiscale(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value={5}>5% (Nuova Partita IVA - Primi 5 Anni)</option>
                  <option value={15}>15% (Aliquota Ordinaria Forfettario)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Legal Wording Box with Copy Button */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>Dicitura Obbligatoria in Fattura Elettronica</span>
              </span>
              <button
                type="button"
                onClick={handleCopyWording}
                className="text-[11px] font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedWording ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWording ? 'Copiato!' : 'Copia Dicitura'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-600 font-mono leading-relaxed border-t border-slate-200 pt-2">
              {dicituraDiLegge}
            </p>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Riepilogo Fattura & Tasse
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
              Forfettario {aliquotaFiscale}%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">Totale Fattura Emessa (da incassare)</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              € {res.totaleFattura.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-400 font-bold block">
              Guadagno Netto Reale: € {res.guadagnoNettoEffettivo.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({res.percentualeNetta.toFixed(1)}%)
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
            <strong>Fatturazione Elettronica:</strong> Dal 1° gennaio 2024 tutti i forfettari hanno l'obbligo di inviare la fattura tramite il Sistema di Interscambio (SdI) dell'Agenzia delle Entrate in formato XML.
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Legal Guide for AdSense */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Guida al Regime Forfettario 2026: Requisiti e Limite di 85.000 €
          </h2>
          <p>
            Il <strong>Regime Forfettario</strong> (disciplinato dalla Legge 190/2014) rappresenta il regime fiscale agevolato naturale per le persone fisiche che esercitano un'attività d'impresa, arte o professione in forma individuale in Italia. Con la Legge di Bilancio, la soglia massima di compensi o ricavi incassati nell'anno solare è fissata a <strong>85.000 euro</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-black text-base text-slate-900">I Vantaggi di Non Applicare l'IVA</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Chi opera in regime forfettario non addebita l'IVA in fattura e non la detrae sugli acquisti. Questo costituisce un enorme vantaggio competitivo verso clienti privati e consumatori finali (B2C), consentendo di formulare prezzi finali più bassi del 22% rispetto a chi opera in regime ordinario.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-black text-base text-slate-900">Aliquota Start-Up al 5% per 5 Anni</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              L'imposta sostitutiva si riduce al <strong>5% per i primi cinque anni</strong> di attività se il contribuente non ha esercitato un'attività analoga nei tre anni precedenti e se la nuova attività non costituisce una mera prosecuzione di un lavoro dipendente svolto in precedenza.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
