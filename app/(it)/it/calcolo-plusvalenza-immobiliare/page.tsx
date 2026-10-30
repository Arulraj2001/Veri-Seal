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
  FileText,
  AlertCircle,
  Coins,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface PlusvalenzaResult {
  prezzoVendita: number;
  prezzoAcquisto: number;
  speseDeducibiliTotali: number;
  plusvalenzaLorda: number;
  esenteAbitazionePrincipale: boolean;
  esenteSuccessione: boolean;
  plusvalenzaTassabile: number;
  impostaSostitutiva26: number;
  impostaIrpefOrdinariaStima: number;
  nettoInTasca: number;
}

export default function CalcoloPlusvalenzaImmobiliarePage() {
  const [prezzoVendita, setPrezzoVendita] = React.useState<number>(240000);
  const [prezzoAcquisto, setPrezzoAcquisto] = React.useState<number>(180000);
  const [speseRistrutturazione, setSpeseRistrutturazione] = React.useState<number>(15000);
  const [speseNotariliAcquisto, setSpeseNotariliAcquisto] = React.useState<number>(4500);
  const [imposteRegistroIvaPagate, setImposteRegistroIvaPagate] = React.useState<number>(3600);
  const [anniPossesso, setAnniPossesso] = React.useState<number>(3);
  const [abitazionePrincipaleMaggioranza, setAbitazionePrincipaleMaggioranza] = React.useState<boolean>(false);
  const [acquisitoPerSuccessione, setAcquisitoPerSuccessione] = React.useState<boolean>(false);

  const calcolaPlusvalenza = React.useCallback((): PlusvalenzaResult => {
    const safeVendita = Math.max(0, prezzoVendita);
    const safeAcquisto = Math.max(0, prezzoAcquisto);

    const speseDeducibiliTotali =
      Math.max(0, speseRistrutturazione) +
      Math.max(0, speseNotariliAcquisto) +
      Math.max(0, imposteRegistroIvaPagate);

    const plusvalenzaLorda = Math.max(0, safeVendita - (safeAcquisto + speseDeducibiliTotali));

    // Esenzioni di legge Art. 67 TUIR:
    // 1. Possesso superiore a 5 anni -> esente
    // 2. Abitazione principale per più del 50% del tempo -> esente
    // 3. Immobile pervenuto per successione mortis causa -> esente
    const superati5Anni = anniPossesso >= 5;
    const esenteAbitazione = abitazionePrincipaleMaggioranza;
    const esenteSuccessione = acquisitoPerSuccessione;

    const isEsente = superati5Anni || esenteAbitazione || esenteSuccessione;
    const plusvalenzaTassabile = isEsente ? 0 : plusvalenzaLorda;

    // Imposta sostitutiva del 26% (Legge 266/2005)
    const impostaSostitutiva26 = plusvalenzaTassabile * 0.26;
    // Stima IRPEF ordinaria (scaglione medio 35%)
    const impostaIrpefOrdinariaStima = plusvalenzaTassabile * 0.35;

    const nettoInTasca = safeVendita - impostaSostitutiva26;

    return {
      prezzoVendita: safeVendita,
      prezzoAcquisto: safeAcquisto,
      speseDeducibiliTotali,
      plusvalenzaLorda,
      esenteAbitazionePrincipale: esenteAbitazione || superati5Anni,
      esenteSuccessione,
      plusvalenzaTassabile,
      impostaSostitutiva26,
      impostaIrpefOrdinariaStima,
      nettoInTasca,
    };
  }, [
    prezzoVendita,
    prezzoAcquisto,
    speseRistrutturazione,
    speseNotariliAcquisto,
    imposteRegistroIvaPagate,
    anniPossesso,
    abitazionePrincipaleMaggioranza,
    acquisitoPerSuccessione,
  ]);

  const res = calcolaPlusvalenza();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Plusvalenza Cessione Immobile</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Art. 67 TUIR & Imposta Sostitutiva 26% dal Notaio</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Plusvalenza Cessione Immobile <br className="hidden sm:inline" />
          <span className="text-sky-600">Vendita entro 5 Anni & Tassazione al 26%</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Giuridica Diretta:</strong> La vendita di un immobile prima di <strong>5 anni</strong> dall'acquisto genera una plusvalenza tassabile se il prezzo di vendita supera il prezzo di acquisto incrementato dei costi deducibili (ristrutturazioni con fattura, parcella notarile di acquisto, imposte di registro e provvigione agenzia). Il venditore può scegliere tra l'<strong>imposta sostitutiva del 26%</strong> versata direttamente al Notaio o l'inserimento nel reddito complessivo IRPEF. La vendita è <strong>totalmente esente</strong> se l'immobile è stato prima casa per oltre la metà del periodo o se è stato ereditato.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Importi e Spese Deducibili</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setPrezzoVendita(240000);
                setPrezzoAcquisto(180000);
                setSpeseRistrutturazione(15000);
                setSpeseNotariliAcquisto(4500);
                setImposteRegistroIvaPagate(3600);
                setAnniPossesso(3);
                setAbitazionePrincipaleMaggioranza(false);
                setAcquisitoPerSuccessione(false);
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Prezzi Vendita e Acquisto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Prezzo di Vendita Effettivo (€)</label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={prezzoVendita || ''}
                  onChange={(e) => setPrezzoVendita(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Prezzo di Acquisto Iniziale (€)</label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={prezzoAcquisto || ''}
                  onChange={(e) => setPrezzoAcquisto(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Spese Deducibili */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Spese di Ristrutturazione Documentate (€)</label>
              <input
                type="number"
                min={0}
                step={1000}
                value={speseRistrutturazione}
                onChange={(e) => setSpeseRistrutturazione(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Spese Notarili all'Acquisto (€)</label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={speseNotariliAcquisto}
                  onChange={(e) => setSpeseNotariliAcquisto(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Imposte Pagate al Rogito (€)</label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={imposteRegistroIvaPagate}
                  onChange={(e) => setImposteRegistroIvaPagate(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Condizioni di Esenzione */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-900 block">Condizioni di Esenzione Legale (Art. 67 TUIR)</span>
              
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={abitazionePrincipaleMaggioranza}
                  onChange={(e) => setAbitazionePrincipaleMaggioranza(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded accent-sky-600 mt-0.5"
                />
                <div>
                  <strong>Abitazione Principale:</strong> È stata adibita a dimora abituale per più della metà del periodo di possesso (ESENZIONE TOTALE).
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={acquisitoPerSuccessione}
                  onChange={(e) => setAcquisitoPerSuccessione(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded accent-sky-600 mt-0.5"
                />
                <div>
                  <strong>Immobile Ereditato:</strong> Pervenuto per successione ereditaria (ESENZIONE TOTALE).
                </div>
              </label>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo conforme alla disciplina dell'Art. 67, comma 1, lett. b), del D.P.R. 917/1986.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Imposta Sostitutiva 26%
            </span>
          </div>

          {res.plusvalenzaTassabile === 0 ? (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-lg font-black text-white">Nessuna Imposta Dovuta</div>
              <p className="text-xs text-slate-300">
                La cessione beneficia dell'esenzione di legge (abitazione principale o successione) oppure non ha generato plusvalenza.
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
                <span className="text-xs text-sky-200 font-medium">Imposta Sostitutiva 26% da Versare al Notaio</span>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                  € {res.impostaSostitutiva26.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-sky-300 font-medium block">
                  Plusvalenza Netta Tassabile: € {res.plusvalenzaTassabile.toLocaleString('it-IT')}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>Guadagno Lordo (Vendita &minus; Acquisto)</span>
                  <span className="font-mono text-white">€ {(res.prezzoVendita - res.prezzoAcquisto).toLocaleString('it-IT')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-emerald-400">
                  <span>Spese Deducibili e Ristrutturazioni</span>
                  <span className="font-mono">- € {res.speseDeducibiliTotali.toLocaleString('it-IT')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>Opzione IRPEF Ordinaria (Stima al 35%)</span>
                  <span className="font-mono text-rose-400">€ {res.impostaIrpefOrdinariaStima.toLocaleString('it-IT')}</span>
                </div>
              </div>
            </>
          )}

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <strong>Opzione Fiscale in Atto:</strong> L'imposta sostitutiva del 26% viene richiesta formalmente al Notaio durante il rogito notarile di vendita, evitando l'inclusione del guadagno nella dichiarazione dei redditi.
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          La Tassazione della Plusvalenza Immobiliare in Italia
        </h2>
        <p>
          Il legislatore fiscale italiano considera la vendita di un immobile entro i 5 anni dal suo acquisto come un'operazione potenzialmente speculativa. Per questo motivo, l'eventuale guadagno economico realizzato costituisce un "reddito diverso" assoggettato a tassazione ai sensi dell'Art. 67 del TUIR.
        </p>
      </div>
    </div>
  );
}
