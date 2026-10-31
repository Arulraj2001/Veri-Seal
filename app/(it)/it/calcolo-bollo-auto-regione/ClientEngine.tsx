'use client';

import * as React from 'react';
import {
  Car,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

const REGIONI_TARIFFARI: Record<string, { nome: string; coeffMult: number; scontoDomiciliazione: number }> = {
  nazionale: { nome: 'Tariffa Nazionale Base (D.P.R. 39/53)', coeffMult: 1.0, scontoDomiciliazione: 0 },
  lombardia: { nome: 'Lombardia (Sconto 15% Domiciliazione)', coeffMult: 1.0, scontoDomiciliazione: 0.15 },
  lazio: { nome: 'Lazio (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
  campania: { nome: 'Campania (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
  piemonte: { nome: 'Piemonte (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
  veneto: { nome: 'Veneto (Tariffa Ordinaria)', coeffMult: 1.0, scontoDomiciliazione: 0 },
  emilia_romagna: { nome: 'Emilia-Romagna (Tariffa Ordinaria)', coeffMult: 1.0, scontoDomiciliazione: 0 },
  toscana: { nome: 'Toscana (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
  sicilia: { nome: 'Sicilia (Tariffa Ordinaria)', coeffMult: 1.0, scontoDomiciliazione: 0 },
  puglia: { nome: 'Puglia (+10% Addizionale Regionale)', coeffMult: 1.1, scontoDomiciliazione: 0 },
};

interface BolloResult {
  kwEffettivi: number;
  cvEquivalenti: number;
  bolloOrdinarioBase: number;
  scontoApplicato: number;
  bolloOrdinarioFinale: number;
  superbolloDovuto: number;
  totaleComplessivo: number;
  kwSuperbollo: number;
  aliquotaSuperbolloKw: number;
}

export function CalcoloBolloAutoRegioneClient() {
  const [potenzaInput, setPotenzaInput] = React.useState<number>(110);
  const [unitaPotenza, setUnitaPotenza] = React.useState<'kw' | 'cv'>('kw');
  const [classeEuro, setClasseEuro] = React.useState<string>('euro6');
  const [regione, setRegione] = React.useState<string>('lombardia');
  const [alimentazione, setAlimentazione] = React.useState<'termica' | 'ibrida' | 'elettrica' | 'gpl_metano'>('termica');
  const [annoImmatricolazione, setAnnoImmatricolazione] = React.useState<number>(2023);
  const [domiciliazioneAttiva, setDomiciliazioneAttiva] = React.useState<boolean>(true);

  const calcolaBollo = React.useCallback((): BolloResult => {
    const safeInput = Math.max(0, potenzaInput);
    const kwEffettivi = unitaPotenza === 'kw' ? safeInput : safeInput / 1.35962;
    const cvEquivalenti = unitaPotenza === 'cv' ? safeInput : safeInput * 1.35962;

    if (alimentazione === 'elettrica') {
      return {
        kwEffettivi,
        cvEquivalenti,
        bolloOrdinarioBase: 0,
        scontoApplicato: 0,
        bolloOrdinarioFinale: 0,
        superbolloDovuto: 0,
        totaleComplessivo: 0,
        kwSuperbollo: 0,
        aliquotaSuperbolloKw: 0,
      };
    }

    let tariffaFino100 = 2.58;
    let tariffaOltre100 = 3.87;

    switch (classeEuro) {
      case 'euro6':
      case 'euro5':
      case 'euro4':
        tariffaFino100 = 2.58;
        tariffaOltre100 = 3.87;
        break;
      case 'euro3':
        tariffaFino100 = 2.70;
        tariffaOltre100 = 4.05;
        break;
      case 'euro2':
        tariffaFino100 = 2.80;
        tariffaOltre100 = 4.20;
        break;
      case 'euro1':
        tariffaFino100 = 2.90;
        tariffaOltre100 = 4.35;
        break;
      case 'euro0':
      default:
        tariffaFino100 = 3.00;
        tariffaOltre100 = 4.50;
        break;
    }

    if (alimentazione === 'gpl_metano') {
      tariffaFino100 *= 0.25;
      tariffaOltre100 *= 0.25;
    }

    const regConfig = REGIONI_TARIFFARI[regione] || REGIONI_TARIFFARI.nazionale;

    let bolloLordo = 0;
    if (kwEffettivi <= 100) {
      bolloLordo = kwEffettivi * tariffaFino100 * regConfig.coeffMult;
    } else {
      bolloLordo =
        (100 * tariffaFino100 + (kwEffettivi - 100) * tariffaOltre100) * regConfig.coeffMult;
    }

    const scontoApplicato =
      domiciliazioneAttiva && regConfig.scontoDomiciliazione > 0
        ? bolloLordo * regConfig.scontoDomiciliazione
        : 0;

    const bolloOrdinarioFinale = Math.max(0, bolloLordo - scontoApplicato);

    let superbolloDovuto = 0;
    let kwSuperbollo = 0;
    let aliquotaSuperbolloKw = 20;

    if (kwEffettivi > 185) {
      kwSuperbollo = Math.ceil(kwEffettivi - 185);
      const annoCorrente = 2026;
      const anniVeicolo = Math.max(0, annoCorrente - annoImmatricolazione);

      if (anniVeicolo > 20) {
        aliquotaSuperbolloKw = 0;
      } else if (anniVeicolo > 15) {
        aliquotaSuperbolloKw = 3.0;
      } else if (anniVeicolo > 10) {
        aliquotaSuperbolloKw = 6.0;
      } else if (anniVeicolo > 5) {
        aliquotaSuperbolloKw = 12.0;
      } else {
        aliquotaSuperbolloKw = 20.0;
      }

      superbolloDovuto = kwSuperbollo * aliquotaSuperbolloKw;
    }

    const totaleComplessivo = bolloOrdinarioFinale + superbolloDovuto;

    return {
      kwEffettivi,
      cvEquivalenti,
      bolloOrdinarioBase: bolloLordo,
      scontoApplicato,
      bolloOrdinarioFinale,
      superbolloDovuto,
      totaleComplessivo,
      kwSuperbollo,
      aliquotaSuperbolloKw,
    };
  }, [
    potenzaInput,
    unitaPotenza,
    classeEuro,
    regione,
    alimentazione,
    annoImmatricolazione,
    domiciliazioneAttiva,
  ]);

  const res = calcolaBollo();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <Car className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Specifiche del Veicolo</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setPotenzaInput(110);
              setUnitaPotenza('kw');
              setClasseEuro('euro6');
              setRegione('lombardia');
              setAlimentazione('termica');
              setAnnoImmatricolazione(2023);
              setDomiciliazioneAttiva(true);
            }}
            className="text-xs text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reimposta</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Potenza in kW o CV */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Potenza Motore ({unitaPotenza.toUpperCase()})
              </label>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-0.5 rounded-lg text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUnitaPotenza('kw')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    unitaPotenza === 'kw' ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-2xs' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  kW
                </button>
                <button
                  type="button"
                  onClick={() => setUnitaPotenza('cv')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    unitaPotenza === 'cv' ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-2xs' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  CV (Cavalli)
                </button>
              </div>
            </div>
            <input
              type="number"
              min={1}
              step={5}
              value={potenzaInput || ''}
              onChange={(e) => setPotenzaInput(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-all"
              placeholder={unitaPotenza === 'kw' ? 'Es. 110 kW' : 'Es. 150 CV'}
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
              {res.kwEffettivi.toFixed(1)} kW corrispondono a {res.cvEquivalenti.toFixed(1)} CV
            </span>
          </div>

          {/* Regione di Residenza */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Regione di Residenza Intestatario</label>
            <select
              value={regione}
              onChange={(e) => setRegione(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              {Object.entries(REGIONI_TARIFFARI).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Classe Euro & Alimentazione */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Classe Ambientale Euro</label>
              <select
                value={classeEuro}
                onChange={(e) => setClasseEuro(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                <option value="euro6">Euro 6 / Euro 6d</option>
                <option value="euro5">Euro 5</option>
                <option value="euro4">Euro 4</option>
                <option value="euro3">Euro 3</option>
                <option value="euro2">Euro 2</option>
                <option value="euro1">Euro 1</option>
                <option value="euro0">Euro 0</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Tipo Alimentazione</label>
              <select
                value={alimentazione}
                onChange={(e) => setAlimentazione(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                <option value="termica">Benzina / Gasolio (Termica)</option>
                <option value="ibrida">Ibrida (Mild / Full / Plug-in)</option>
                <option value="gpl_metano">GPL / Metano (Impianto a gas)</option>
                <option value="elettrica">100% Elettrica (BEV - Esenzione)</option>
              </select>
            </div>
          </div>

          {/* Anno Immatricolazione */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Anno di Prima Immatricolazione</label>
            <input
              type="number"
              min={1990}
              max={2026}
              value={annoImmatricolazione}
              onChange={(e) => setAnnoImmatricolazione(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Domiciliazione bancaria */}
          {regione === 'lombardia' && (
            <label className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/40 cursor-pointer hover:bg-sky-100/70 transition-colors">
              <input
                type="checkbox"
                checked={domiciliazioneAttiva}
                onChange={(e) => setDomiciliazioneAttiva(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
              />
              <span className="text-xs text-sky-950 dark:text-sky-200 font-medium">
                Applica <strong>sconto del 15% per domiciliazione bancaria SDD</strong> (Regione Lombardia)
              </span>
            </label>
          )}
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Calcolo aggiornato con le delibere tariffarie regionali e scaglioni di anzianità del Superbollo.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Totale Tassa Automobilistica
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
            Annuale 2026
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
          <span className="text-xs text-sky-200 font-medium">Importo Totale Dovuto</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            € {res.totaleComplessivo.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-sky-300 font-medium block">
            {res.superbolloDovuto > 0
              ? `Include € ${res.superbolloDovuto.toFixed(2)} di Superbollo Erariale`
              : 'Nessun Superbollo dovuto (sotto la soglia di 185 kW)'}
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Bollo regionale lordo</span>
            <span className="font-mono text-white">€ {res.bolloOrdinarioBase.toFixed(2)}</span>
          </div>
          {res.scontoApplicato > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Sconto domiciliazione bancaria (-15%)</span>
              <span className="font-mono text-emerald-400 font-bold">- € {res.scontoApplicato.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Bollo regionale netto</span>
            <span className="font-mono text-sky-300 font-bold">€ {res.bolloOrdinarioFinale.toFixed(2)}</span>
          </div>
          {res.superbolloDovuto > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Superbollo ({res.kwSuperbollo} kW eccedenti × {res.aliquotaSuperbolloKw}€)</span>
              <span className="font-mono text-amber-400 font-bold">+ € {res.superbolloDovuto.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-300 block">Scadenza e Modalità di Pagamento:</strong>
          <p>Il bollo si versa entro l&apos;ultimo giorno del mese successivo a quello di scadenza (canali PagoPA, ACI o home banking). Il Superbollo si versa all&apos;Erario con Modello F24 (Codice tributo 3364).</p>
        </div>
      </div>
    </div>
  );
}

