'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  FileText,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

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

export function CalcoloPlusvalenzaImmobiliareClient() {
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

    const superati5Anni = anniPossesso >= 5;
    const esenteAbitazione = abitazionePrincipaleMaggioranza;
    const esenteSuccessione = acquisitoPerSuccessione;

    const isEsente = superati5Anni || esenteAbitazione || esenteSuccessione;
    const plusvalenzaTassabile = isEsente ? 0 : plusvalenzaLorda;

    const impostaSostitutiva26 = plusvalenzaTassabile * 0.26;
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Valori Economici Compravendita</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Prezzo di Vendita Attuale (€)</label>
              <input
                type="number"
                min={0}
                step={5000}
                value={prezzoVendita || ''}
                onChange={(e) => setPrezzoVendita(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
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
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Ristrutturazioni documentate</label>
              <input
                type="number"
                min={0}
                step={1000}
                value={speseRistrutturazione || ''}
                onChange={(e) => setSpeseRistrutturazione(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Parcella Notaio Acquisto</label>
              <input
                type="number"
                min={0}
                step={500}
                value={speseNotariliAcquisto || ''}
                onChange={(e) => setSpeseNotariliAcquisto(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Imposte Pagate al Rogito</label>
              <input
                type="number"
                min={0}
                step={500}
                value={imposteRegistroIvaPagate || ''}
                onChange={(e) => setImposteRegistroIvaPagate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Anni di Possesso dell&apos;Immobile</span>
              <span className="font-mono text-sky-700 font-bold">{anniPossesso} anni</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={anniPossesso}
              onChange={(e) => setAnniPossesso(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 anno</span>
              <span className="text-amber-600 font-bold">5 anni (Soglia Esenzione)</span>
              <span>10+ anni</span>
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800 hover:bg-slate-100">
              <input
                type="checkbox"
                checked={abitazionePrincipaleMaggioranza}
                onChange={(e) => setAbitazionePrincipaleMaggioranza(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <span>È stata abitazione principale per più del 50% del periodo di possesso (Esente)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800 hover:bg-slate-100">
              <input
                type="checkbox"
                checked={acquisitoPerSuccessione}
                onChange={(e) => setAcquisitoPerSuccessione(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Immobile pervenuto tramite eredità / successione ereditaria (Esente)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Column */}
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
              La cessione beneficia dell&apos;esenzione di legge (abitazione principale o successione) oppure non ha generato plusvalenza.
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
          <strong>Opzione Fiscale in Atto:</strong> L&apos;imposta sostitutiva del 26% viene richiesta formalmente al Notaio durante il rogito notarile di vendita, evitando l&apos;inclusione del guadagno nella dichiarazione dei redditi.
        </div>
      </div>
    </div>
  );
}

