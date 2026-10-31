'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  FileText,
  AlertCircle,
  Copy,
} from 'lucide-react';

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

export function AdeguamentoAffittoIstatClient() {
  const [canoneMensile, setCanoneMensile] = React.useState<number>(850);
  const [variazioneIstat, setVariazioneIstat] = React.useState<number>(1.8);
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Parametri della Locazione</span>
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
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Canone Mensile Attuale</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {canoneMensile.toLocaleString('it-IT')} / mese</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={50}
                value={canoneMensile || ''}
                onChange={(e) => setCanoneMensile(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 850"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Tipologia Contratto</label>
              <select
                value={tipoContratto}
                onChange={(e) => setTipoContratto(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="libero_100">Canone Libero 4+4 (100% Indice FOI)</option>
                <option value="concordato_75">Canone Concordato 3+2 (Max 75% FOI)</option>
                <option value="commerciale_75">Uso Commerciale 6+6 (Max 75% FOI)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Regime Fiscale Scelto</label>
              <select
                value={regimeFiscale}
                onChange={(e) => setRegimeFiscale(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="ordinario">Regime IRPEF Ordinario (Adeguamento Consentito)</option>
                <option value="cedolare_secca">Cedolare Secca (Blocco di Legge)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Variazione Percentuale Annuale Indice ISTAT FOI (%)</span>
              <span className="font-mono text-sky-700 font-bold">{variazioneIstat.toFixed(1)}%</span>
            </label>
            <input
              type="number"
              step={0.1}
              value={variazioneIstat}
              onChange={(e) => setVariazioneIstat(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
            />
            <p className="text-[11px] text-slate-500">
              Dato mensile pubblicato in Gazzetta Ufficiale dall&apos;ISTAT per le famiglie di operai e impiegati al netto dei tabacchi.
            </p>
          </div>

          {!res.bloccoCedolareSecca && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
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
          <strong>Decorrenza Giuridica:</strong> L&apos;aumento non scatta in automatico. È indispensabile inviare una comunicazione formale (lettera raccomandata A/R o PEC) all&apos;inquilino. Non possono essere richiesti arretrati retroattivi.
        </div>
      </div>
    </div>
  );
}

