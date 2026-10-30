'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar,
  Clock,
  Coins,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface PensioneResult {
  etaAttuale: number;
  anniContributi: number;
  sesso: 'M' | 'F';
  settore: 'privato' | 'pubblico' | 'autonomo';
  idoneoVecchiaia: boolean;
  mancanoAnniVecchiaia: number;
  idoneoAnticipataOrdinaria: boolean;
  mancanoAnniAnticipata: number;
  idoneoQuota103: boolean;
  mancanoAnniQuota103: number;
  mancanoEtaQuota103: number;
  tettoMassimoQuota103: number;
  finestraMobileMesi: number;
  primaDecorrenzaUtile: string;
}

export default function CalcoloPensioneAnticipataPage() {
  const [eta, setEta] = React.useState<number>(61);
  const [anniContributi, setAnniContributi] = React.useState<number>(40);
  const [sesso, setSesso] = React.useState<'M' | 'F'>('M');
  const [settore, setSettore] = React.useState<'privato' | 'pubblico' | 'autonomo'>('privato');

  const calcolaPensione = React.useCallback((): PensioneResult => {
    // 1. Pensione di Vecchiaia Ordinaria: 67 anni di età e 20 anni di contributi
    const idoneoVecchiaia = eta >= 67 && anniContributi >= 20;
    const mancanoAnniVecchiaia = Math.max(0, 67 - eta);

    // 2. Pensione Anticipata Ordinaria (Legge Fornero):
    // Uomini: 42 anni e 10 mesi (42.83 anni)
    // Donne: 41 anni e 10 mesi (41.83 anni)
    const sogliaContributivaAnticipata = sesso === 'M' ? 42 + 10 / 12 : 41 + 10 / 12;
    const idoneoAnticipataOrdinaria = anniContributi >= sogliaContributivaAnticipata;
    const mancanoAnniAnticipata = Math.max(0, sogliaContributivaAnticipata - anniContributi);

    // 3. Quota 103 (Pensione Flessibile):
    // Almeno 62 anni di età E almeno 41 anni di contributi
    const idoneoQuota103 = eta >= 62 && anniContributi >= 41;
    const mancanoAnniQuota103 = Math.max(0, 41 - anniContributi);
    const mancanoEtaQuota103 = Math.max(0, 62 - eta);

    // Tetto massimo Quota 103: 4 volte il trattamento minimo INPS (~598,61 € * 4 = ~2.394 € lordi mensili)
    const tettoMassimoQuota103 = 2394.44;

    // Finestra mobile: 7 mesi per privati, 9 mesi per pubblici
    const finestraMobileMesi = settore === 'pubblico' ? 9 : 7;

    // Stima prima decorrenza utile
    let primaDecorrenzaUtile = 'In corso di maturazione';
    if (idoneoQuota103) {
      primaDecorrenzaUtile = `Immediata (previa finestra di ${finestraMobileMesi} mesi)`;
    } else if (idoneoAnticipataOrdinaria) {
      primaDecorrenzaUtile = 'Immediata (finestra mobile 3 mesi)';
    } else if (idoneoVecchiaia) {
      primaDecorrenzaUtile = 'Immediata (dal primo giorno del mese successivo al compimento)';
    } else {
      const minAnniMancanti = Math.min(
        mancanoAnniVecchiaia,
        mancanoAnniAnticipata,
        Math.max(mancanoAnniQuota103, mancanoEtaQuota103)
      );
      const annoStima = new Date().getFullYear() + Math.ceil(minAnniMancanti);
      primaDecorrenzaUtile = `Stimata intorno all'anno ${annoStima}`;
    }

    return {
      etaAttuale: eta,
      anniContributi,
      sesso,
      settore,
      idoneoVecchiaia,
      mancanoAnniVecchiaia,
      idoneoAnticipataOrdinaria,
      mancanoAnniAnticipata,
      idoneoQuota103,
      mancanoAnniQuota103,
      mancanoEtaQuota103,
      tettoMassimoQuota103,
      finestraMobileMesi,
      primaDecorrenzaUtile,
    };
  }, [eta, anniContributi, sesso, settore]);

  const res = calcolaPensione();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Calcolo Pensione Anticipata</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>INPS 2026: Quota 103, Pensione Anticipata e Vecchiaia</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Pensione Anticipata & Quota 103 <br className="hidden sm:inline" />
          <span className="text-sky-600">Simulatore Requisiti Anagrafici e Contributivi</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Previdenziale Diretta:</strong> Per accedere a <strong>Quota 103</strong> nel 2026 occorrono almeno <strong>62 anni di età</strong> e <strong>41 anni di contributi</strong> versati. La prestazione viene calcolata interamente con il sistema contributivo e prevede un tetto massimo di erogazione pari a circa <strong>2.394 € lordi mensili</strong> fino ai 67 anni, con una finestra mobile di attesa di <strong>7 mesi per i privati</strong> e <strong>9 mesi per i dipendenti pubblici</strong>. In alternativa, la pensione anticipata ordinaria richiede 42 anni e 10 mesi di contributi (uomini) o 41 anni e 10 mesi (donne).
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Dati Anagrafici e Contributivi</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEta(61);
                setAnniContributi(40);
                setSesso('M');
                setSettore('privato');
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Età e Contributi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Età Anagrafica Attuale</label>
                <input
                  type="number"
                  min={50}
                  max={75}
                  value={eta}
                  onChange={(e) => setEta(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Anni di Contributi Versati</label>
                <input
                  type="number"
                  min={10}
                  max={50}
                  value={anniContributi}
                  onChange={(e) => setAnniContributi(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Sesso & Settore */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Genere / Sesso</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSesso('M')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      sesso === 'M' ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Uomo (M)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSesso('F')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      sesso === 'F' ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Donna (F)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Settore di Lavoro</label>
                <select
                  value={settore}
                  onChange={(e) => setSettore(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="privato">Dipendente Settore Privato (Finestra 7 Mesi)</option>
                  <option value="pubblico">Dipendente Pubblico (Finestra 9 Mesi)</option>
                  <option value="autonomo">Lavoratore Autonomo / Commerciante</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Valutazione preventiva basata sui requisiti di legge vigenti per il 2026.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Esito Compatibilità Previdenziale
            </span>
          </div>

          {/* Primary Result Banner */}
          <div className={`p-4 rounded-2xl border space-y-1 ${
            res.idoneoQuota103 || res.idoneoAnticipataOrdinaria || res.idoneoVecchiaia
              ? 'bg-emerald-950/40 border-emerald-800/40'
              : 'bg-amber-950/40 border-amber-800/40'
          }`}>
            <span className="text-xs font-medium text-slate-300">Prima Decorrenza Utile Stimata</span>
            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white">
              {res.primaDecorrenzaUtile}
            </div>
          </div>

          {/* Detailed Options Comparison */}
          <div className="space-y-3 text-xs">
            {/* Quota 103 Status */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center font-bold">
                <span className="text-white">1. Quota 103 (62 anni + 41 anni)</span>
                <span className={res.idoneoQuota103 ? 'text-emerald-400' : 'text-amber-400'}>
                  {res.idoneoQuota103 ? 'REQUISITO SODDISFATTO' : 'NON ANCORA IDONEO'}
                </span>
              </div>
              {!res.idoneoQuota103 && (
                <div className="text-slate-400 text-[11px]">
                  Mancano: {res.mancanoEtaQuota103 > 0 ? `${res.mancanoEtaQuota103.toFixed(1)} anni di età` : ''}{' '}
                  {res.mancanoAnniQuota103 > 0 ? `${res.mancanoAnniQuota103.toFixed(1)} anni di contributi` : ''}
                </div>
              )}
            </div>

            {/* Anticipata Ordinaria Status */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center font-bold">
                <span className="text-white">2. Anticipata Ordinaria Fornero</span>
                <span className={res.idoneoAnticipataOrdinaria ? 'text-emerald-400' : 'text-slate-400'}>
                  {res.idoneoAnticipataOrdinaria ? 'REQUISITO SODDISFATTO' : 'IN MATURAZIONE'}
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Richiesti {sesso === 'M' ? '42a 10m' : '41a 10m'} di contributi. Mancano: {res.mancanoAnniAnticipata.toFixed(1)} anni.
              </div>
            </div>

            {/* Vecchiaia Ordinaria Status */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center font-bold">
                <span className="text-white">3. Pensione di Vecchiaia (67 anni)</span>
                <span className={res.idoneoVecchiaia ? 'text-emerald-400' : 'text-slate-400'}>
                  {res.idoneoVecchiaia ? 'RAGGIUNTA' : `${res.mancanoAnniVecchiaia} anni al compimento`}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-200">Paletti Stringenti di Quota 103:</strong> Chi accede a Quota 103 subisce il ricalcolo interamente contributivo della pensione e non può cumulare la pensione con redditi da lavoro dipendente fino al compimento dei 67 anni (ammesso solo lavoro autonomo occasionale nel limite di 5.000 € lordi annui).
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content for AdSense Quality */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Canali di Uscita dal Mondo del Lavoro in Italia (2026)
          </h2>
          <p>
            Il sistema previdenziale italiano amministrato dall'INPS prevede diversi canali per l'accesso al pensionamento. La via maestra resta la <strong>pensione di vecchiaia</strong> ordinaria, ma per coloro che hanno iniziato a lavorare in giovane età o che desiderano anticipare l'uscita, la legge offre canali anticipati con regole, vincoli e penalizzazioni differenziate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-black text-base text-slate-900">Le Finestre Mobili di Decorrenza</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              La maturazione del diritto a pensione non coincide con la ricezione del primo assegno. La legge impone le cosiddette "finestre mobili", ossia periodi di differimento tra il perfezionamento dei requisiti e la decorrenza economica: 3 mesi per l'anticipata ordinaria, 7 mesi per i lavoratori privati in Quota 103, e 9 mesi per i dipendenti pubblici.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-black text-base text-slate-900">Il Divieto di Cumulo Reddituale</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Uno degli aspetti più delicati di Quota 103 è l'incumulabilità della pensione con qualsiasi reddito derivante da attività lavorativa (sia subordinata che autonoma professionale). L'unica eccezione tassativamente prevista è il lavoro autonomo occasionale senza partita IVA entro il tetto massimo di 5.000 euro lordi per anno solare.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
