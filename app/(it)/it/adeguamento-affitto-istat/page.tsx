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
  Copy,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface AdeguamentoResult {
  canoneAttuale: number;
  percentualeIstatFoi: number;
  quotaApplicabilePercentuale: number;
  variazionePercentualeEffettiva: number;
  aumentoMensile: number;
  nuovoCanoneMensile: number;
  aumentoAnnuale: number;
  nuovoCanoneAnnuale: number;
  bloccoCedolareSecca: boolean;
}

export default function AdeguamentoAffittoIstatPage() {
  const [canoneMensile, setCanoneMensile] = React.useState<number>(850);
  const [variazioneIstat, setVariazioneIstat] = React.useState<number>(1.8); // 1.8% variazione FOI annuale recente
  const [tipoContratto, setTipoContratto] = React.useState<'libero_100' | 'concordato_75' | 'commerciale_75'>('libero_100');
  const [regimeFiscale, setRegimeFiscale] = React.useState<'ordinario' | 'cedolare_secca'>('ordinario');
  const [copiedLetter, setCopiedLetter] = React.useState<boolean>(false);

  const calcolaAdeguamento = React.useCallback((): AdeguamentoResult => {
    const safeCanone = Math.max(0, canoneMensile);
    const bloccoCedolareSecca = regimeFiscale === 'cedolare_secca';

    if (bloccoCedolareSecca) {
      return {
        canoneAttuale: safeCanone,
        percentualeIstatFoi: variazioneIstat,
        quotaApplicabilePercentuale: 0,
        variazionePercentualeEffettiva: 0,
        aumentoMensile: 0,
        nuovoCanoneMensile: safeCanone,
        aumentoAnnuale: 0,
        nuovoCanoneAnnuale: safeCanone * 12,
        bloccoCedolareSecca: true,
      };
    }

    const quotaApplicabile = tipoContratto === 'libero_100' ? 1.0 : 0.75;
    const variazionePercentualeEffettiva = variazioneIstat * quotaApplicabile;

    const aumentoMensile = safeCanone * (variazionePercentualeEffettiva / 100);
    const nuovoCanoneMensile = safeCanone + aumentoMensile;

    const aumentoAnnuale = aumentoMensile * 12;
    const nuovoCanoneAnnuale = nuovoCanoneMensile * 12;

    return {
      canoneAttuale: safeCanone,
      percentualeIstatFoi: variazioneIstat,
      quotaApplicabilePercentuale: quotaApplicabile * 100,
      variazionePercentualeEffettiva,
      aumentoMensile,
      nuovoCanoneMensile,
      aumentoAnnuale,
      nuovoCanoneAnnuale,
      bloccoCedolareSecca: false,
    };
  }, [canoneMensile, variazioneIstat, tipoContratto, regimeFiscale]);

  const res = calcolaAdeguamento();

  const letteraFacsimile = `Raccomandata A/R o PEC
Oggetto: Comunicazione di aggiornamento del canone di locazione per variazione ISTAT
Gentile Inquilino,
in relazione al contratto di locazione dell'immobile di nostra proprietà sito in [Indirizzo], Le comunichiamo che, ai sensi dell'apposita clausola contrattuale, a decorrere dal mese di [Mese Prossimo], il canone mensile di locazione viene adeguato in base alla variazione dell'indice dei prezzi al consumo FOI accertato dall'ISTAT (${res.percentualeIstatFoi}% con applicazione al ${res.quotaApplicabilePercentuale}%).
Il nuovo canone mensile è pertanto rideterminato in € ${res.nuovoCanoneMensile.toFixed(2)} (con un incremento mensile di € ${res.aumentoMensile.toFixed(2)}).
Distinti saluti.`;

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(letteraFacsimile);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Adeguamento Affitto ISTAT</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Indice ISTAT FOI (Famiglie Operai e Impiegati) Legge 431/1998</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Adeguamento Canone Affitto ISTAT 2026 <br className="hidden sm:inline" />
          <span className="text-sky-600">Calcolo Indice FOI 100% o 75% & Lettera per Inquilino</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Giuridica Diretta:</strong> L’adeguamento ISTAT del canone di locazione si calcola moltiplicando il canone mensile in corso per la variazione percentuale annua dell’<strong>indice FOI</strong> (senza tabacchi). Nei contratti liberi 4+4 si applica generalmente il <strong>100%</strong> dell'indice, mentre nei contratti a canone concordato (3+2) e commerciali (6+6) il limite massimo di legge è il <strong>75%</strong>. Se il proprietario ha optato per il regime della <strong>Cedolare Secca</strong>, qualsiasi aggiornamento del canone è nullo per legge.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Parametri Contrattuali</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCanoneMensile(850);
                setVariazioneIstat(1.8);
                setTipoContratto('libero_100');
                setRegimeFiscale('ordinario');
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Canone attuale e Indice ISTAT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Canone Mensile Attuale (€)</label>
                <input
                  type="number"
                  min={0}
                  step={20}
                  value={canoneMensile || ''}
                  onChange={(e) => setCanoneMensile(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Variazione Annuale ISTAT FOI (%)</label>
                <input
                  type="number"
                  step={0.1}
                  value={variazioneIstat}
                  onChange={(e) => setVariazioneIstat(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Tipologia Contratto e Regime Fiscale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Tipo di Contratto di Locazione</label>
                <select
                  value={tipoContratto}
                  onChange={(e) => setTipoContratto(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="libero_100">Contratto Libero 4+4 (100% ISTAT)</option>
                  <option value="concordato_75">Canone Concordato 3+2 (75% ISTAT)</option>
                  <option value="commerciale_75">Locazione Commerciale 6+6 (75% ISTAT)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Regime Fiscale del Locatore</label>
                <select
                  value={regimeFiscale}
                  onChange={(e) => setRegimeFiscale(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="ordinario">Regime Ordinario IRPEF (Adeguamento Consentito)</option>
                  <option value="cedolare_secca">Cedolare Secca (Adeguamento VIETATO)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Facsimile Lettera */}
          {!res.bloccoCedolareSecca && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-600" />
                  <span>Modello Lettera di Richiesta Adeguamento per Inquilino</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyLetter}
                  className="text-[11px] font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedLetter ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLetter ? 'Copiata!' : 'Copia Lettera'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-600 font-mono leading-relaxed border-t border-slate-200 pt-2 whitespace-pre-line">
                {letteraFacsimile}
              </p>
            </div>
          )}
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Esito Rideterminazione
            </span>
          </div>

          {res.bloccoCedolareSecca ? (
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/40 space-y-2 text-center">
              <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
              <div className="text-base font-black text-white">Aggiornamento Non Applicabile</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chi sceglie il regime fiscale della <strong>Cedolare Secca</strong> rinuncia espressamente per legge (Art. 3, comma 11, D.Lgs. 23/2011) a qualsiasi aggiornamento ISTAT del canone.
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
                <span className="text-xs text-sky-200 font-medium">Nuovo Canone Mensile da Richiedere</span>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                  € {res.nuovoCanoneMensile.toFixed(2)}
                </div>
                <span className="text-[11px] text-emerald-400 font-bold block">
                  Aumento Mensile: +€ {res.aumentoMensile.toFixed(2)} (+{res.variazionePercentualeEffettiva.toFixed(2)}%)
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>Canone Annuale Attuale</span>
                  <span className="font-mono text-white">€ {(res.canoneAttuale * 12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>Nuovo Canone Annuale Rideterminato</span>
                  <span className="font-mono font-bold text-white">€ {res.nuovoCanoneAnnuale.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>Incremento Annuale Complessivo</span>
                  <span className="font-mono text-emerald-400">+ € {res.aumentoAnnuale.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <strong>Decorrenza Giuridica:</strong> L'aumento non scatta in automatico. È indispensabile inviare una comunicazione formale (lettera raccomandata A/R o PEC) all'inquilino. Non possono essere richiesti arretrati retroattivi.
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          La Clausola di Adeguamento ISTAT nei Contratti di Locazione
        </h2>
        <p>
          L'adeguamento del canone di locazione è la facoltà riconosciuta al locatore di aggiornare l'importo mensile dell'affitto per adeguarlo al costo della vita rilevato dall'Istituto Nazionale di Statistica (ISTAT) attraverso l'indice FOI per le famiglie di operai e impiegati.
        </p>
      </div>
    </div>
  );
}
