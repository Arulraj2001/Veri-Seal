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
  AlertCircle,
  FileText,
  Calendar,
  Coins,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface ImuResult {
  renditaCatastale: number;
  valoreCatastaleRivalutato: number;
  categoria: string;
  moltiplicatore: number;
  aliquotaApplicata: number;
  esentePrimaCasa: boolean;
  imuLordaAnnua: number;
  detrazionePrimaCasa: number;
  imuNettaAnnua: number;
  accontoGiugno: number;
  saldoDicembre: number;
  codiceTributoF24: string;
}

export default function CalcoloImuF24Page() {
  const [rendita, setRendita] = React.useState<number>(650);
  const [categoria, setCategoria] = React.useState<string>('A2_A7');
  const [destinazione, setDestinazione] = React.useState<'seconda_casa' | 'prima_casa_lusso' | 'prima_casa_ordinaria' | 'locato'>('seconda_casa');
  const [aliquotaPerMille, setAliquotaPerMille] = React.useState<number>(10.6); // 10.6 per mille (1.06%) standard comune
  const [percentualePossesso, setPercentualePossesso] = React.useState<number>(100);
  const [mesiPossesso, setMesiPossesso] = React.useState<number>(12);

  const calcolaImu = React.useCallback((): ImuResult => {
    const safeRendita = Math.max(0, rendita);

    // 1. Moltiplicatore in base alla categoria catastale
    let moltiplicatore = 160;
    if (categoria === 'A10') moltiplicatore = 80;
    else if (categoria === 'C1') moltiplicatore = 55;
    else if (categoria === 'D') moltiplicatore = 65;
    else if (categoria === 'B_C3') moltiplicatore = 140;

    // 2. Base imponibile = Rendita catastale * 1.05 (rivalutazione 5%) * moltiplicatore
    const valoreCatastaleRivalutato = safeRendita * 1.05 * moltiplicatore;

    // 3. Esenzione Prima Casa ordinaria (A/2, A/3, A/4, A/5, A/6, A/7)
    const esentePrimaCasa = destinazione === 'prima_casa_ordinaria' && categoria === 'A2_A7';

    if (esentePrimaCasa) {
      return {
        renditaCatastale: safeRendita,
        valoreCatastaleRivalutato,
        categoria,
        moltiplicatore,
        aliquotaApplicata: 0,
        esentePrimaCasa: true,
        imuLordaAnnua: 0,
        detrazionePrimaCasa: 0,
        imuNettaAnnua: 0,
        accontoGiugno: 0,
        saldoDicembre: 0,
        codiceTributoF24: 'ESENTE',
      };
    }

    // Aliquota decimale (per mille / 1000)
    const aliquotaDecimale = (aliquotaPerMille / 1000);

    // IMU lorda teorica annuale
    const imuTeorica100 = valoreCatastaleRivalutato * aliquotaDecimale;

    // Detrazione abitazione principale di lusso (A/1, A/8, A/9): fissa 200 euro
    const detrazionePrimaCasa = destinazione === 'prima_casa_lusso' ? 200 : 0;

    // Quota possesso e mesi
    const fattorePossesso = (percentualePossesso / 100) * (mesiPossesso / 12);

    const imuNettaAnnua = Math.max(0, (imuTeorica100 - detrazionePrimaCasa) * fattorePossesso);

    // Ripartizione acconto 50% e saldo 50%
    const accontoGiugno = imuNettaAnnua / 2;
    const saldoDicembre = imuNettaAnnua / 2;

    let codiceTributoF24 = '3918'; // Altri fabbricati
    if (destinazione === 'prima_casa_lusso') codiceTributoF24 = '3912';

    return {
      renditaCatastale: safeRendita,
      valoreCatastaleRivalutato,
      categoria,
      moltiplicatore,
      aliquotaApplicata: aliquotaPerMille,
      esentePrimaCasa: false,
      imuLordaAnnua: imuTeorica100 * fattorePossesso,
      detrazionePrimaCasa,
      imuNettaAnnua,
      accontoGiugno,
      saldoDicembre,
      codiceTributoF24,
    };
  }, [rendita, categoria, destinazione, aliquotaPerMille, percentualePossesso, mesiPossesso]);

  const res = calcolaImu();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Calcolo IMU F24</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Legge 160/2019 & Scadenze F24 16 Giugno / 16 Dicembre</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo IMU 2026 e Dati Modello F24 <br className="hidden sm:inline" />
          <span className="text-sky-600">Simulatore Rendita Catastale e Acconto/Saldo</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Fiscale Diretta:</strong> L’IMU per gli immobili diversi dall’abitazione principale si calcola rivalutando la rendita catastale del <strong>5%</strong> e moltiplicandola per il coefficiente di categoria (<strong>160 per abitazioni</strong> e pertinenze C/2, C/6). Sulla base imponibile ottenuta si applica l'aliquota comunale deliberata (standard <strong>10,6 per mille</strong> o 1,06%). Il pagamento avviene tramite Modello F24 con codice tributo <strong>3918</strong> in due rate: <strong>Acconto del 50% entro il 16 giugno</strong> e <strong>Saldo entro il 16 dicembre</strong>. L'abitazione principale non di lusso è totalmente esente.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Parametri Catastali dell'Immobile</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setRendita(650);
                setCategoria('A2_A7');
                setDestinazione('seconda_casa');
                setAliquotaPerMille(10.6);
                setPercentualePossesso(100);
                setMesiPossesso(12);
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Rendita Catastale */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Rendita Catastale da Visura</span>
                <span className="font-mono text-sky-700 font-bold text-sm">€ {rendita.toLocaleString('it-IT')}</span>
              </label>
              <input
                type="number"
                min={0}
                step={10}
                value={rendita || ''}
                onChange={(e) => setRendita(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 650"
              />
            </div>

            {/* Destinazione e Categoria */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Tipologia / Destinazione d'Uso</label>
                <select
                  value={destinazione}
                  onChange={(e) => setDestinazione(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="seconda_casa">Seconda Casa / A Disposizione</option>
                  <option value="locato">Immobile Locato ad Inquilino</option>
                  <option value="prima_casa_ordinaria">Prima Casa Non di Lusso (ESENTE)</option>
                  <option value="prima_casa_lusso">Abitazione di Lusso (A/1, A/8, A/9)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Categoria Catastale</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="A2_A7">Abitazioni e Pertinenze C/2, C/6 (Moltiplicatore 160)</option>
                  <option value="A10">Uffici e Studi Privati A/10 (Moltiplicatore 80)</option>
                  <option value="C1">Negozi e Botteghe C/1 (Moltiplicatore 55)</option>
                  <option value="D">Capannoni, Immobili Produttivi D (Moltiplicatore 65)</option>
                  <option value="B_C3">Laboratori, Magazzini B, C/3 (Moltiplicatore 140)</option>
                </select>
              </div>
            </div>

            {/* Aliquota Comunale, Quota e Mesi */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Aliquota Deliberata (‰)</label>
                <input
                  type="number"
                  step={0.1}
                  min={0}
                  max={12}
                  value={aliquotaPerMille}
                  onChange={(e) => setAliquotaPerMille(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Possesso (%)</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={percentualePossesso}
                  onChange={(e) => setPercentualePossesso(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Mesi di Possesso</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={mesiPossesso}
                  onChange={(e) => setMesiPossesso(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo conforme alla Legge 27 dicembre 2019, n. 160 e istruzioni F24.</span>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Imposta Dovuta 2026
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
              F24: {res.codiceTributoF24}
            </span>
          </div>

          {res.esentePrimaCasa ? (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-lg font-black text-white">Abitazione Principale Esente</div>
              <p className="text-xs text-slate-300">
                L’immobile in categoria A/2-A/7 adibito a residenza anagrafica e dimora abituale non paga IMU.
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
                <span className="text-xs text-sky-200 font-medium">IMU Totale Netta Annuale</span>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                  € {res.imuNettaAnnua.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-sky-300 font-medium block">
                  Valore Catastale Imponibile: € {res.valoreCatastaleRivalutato.toLocaleString('it-IT', { maximumFractionDigits: 0 })}
                </span>
              </div>

              {/* Ripartizione F24 */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Acconto (16 Giugno)</span>
                  <div className="font-mono text-white font-bold text-base">
                    € {res.accontoGiugno.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Saldo (16 Dicembre)</span>
                  <div className="font-mono text-white font-bold text-base">
                    € {res.saldoDicembre.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                <div className="flex justify-between text-slate-300">
                  <span>Rendita Catastale rivalutata (+5%)</span>
                  <span className="font-mono text-white">€ {(res.renditaCatastale * 1.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Moltiplicatore Catastale</span>
                  <span className="font-mono text-white">&times; {res.moltiplicatore}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Aliquota applicata</span>
                  <span className="font-mono text-amber-400">{res.aliquotaApplicata.toFixed(1)} ‰</span>
                </div>
              </div>
            </>
          )}

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <strong>Compilazione Modello F24:</strong> Sezione "IMU e altri tributi locali". Indicare il codice catastale del Comune (4 caratteri), barrare "Acc" o "Sal", numero immobili (1) e l'importo a debito.
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Guida al Calcolo dell'IMU: Regole, Esenzioni e Scadenze
        </h2>
        <p>
          L'Imposta Municipale Propria (IMU) è il tributo locale dovuto per il possesso di fabbricati, aree fabbricabili e terreni agricoli situati nel territorio dello Stato italiano. L'imposta è disciplinata dalla Legge di Bilancio 2020 (Legge 160/2019) che ha unificato IMU e TASI in un unico tributo patrimoniale.
        </p>
      </div>
    </div>
  );
}
