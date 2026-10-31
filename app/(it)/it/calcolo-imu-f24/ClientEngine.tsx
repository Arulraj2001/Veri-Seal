'use client';

import * as React from 'react';
import {
  Calculator,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Home,
} from 'lucide-react';

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

export function CalcoloImuClient() {
  const [rendita, setRendita] = React.useState<number>(650);
  const [categoria, setCategoria] = React.useState<string>('A2_A7');
  const [destinazione, setDestinazione] = React.useState<'seconda_casa' | 'prima_casa_lusso' | 'prima_casa_ordinaria' | 'locato'>('seconda_casa');
  const [aliquotaPerMille, setAliquotaPerMille] = React.useState<number>(10.6);
  const [percentualePossesso, setPercentualePossesso] = React.useState<number>(100);
  const [mesiPossesso, setMesiPossesso] = React.useState<number>(12);

  const calcolaImu = React.useCallback((): ImuResult => {
    const safeRendita = Math.max(0, rendita);

    let moltiplicatore = 160;
    if (categoria === 'A10') moltiplicatore = 80;
    else if (categoria === 'C1') moltiplicatore = 55;
    else if (categoria === 'D') moltiplicatore = 65;
    else if (categoria === 'B_C3') moltiplicatore = 140;

    const valoreCatastaleRivalutato = safeRendita * 1.05 * moltiplicatore;
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

    const aliquotaDecimale = (aliquotaPerMille / 1000);
    const imuTeorica100 = valoreCatastaleRivalutato * aliquotaDecimale;
    const detrazionePrimaCasa = destinazione === 'prima_casa_lusso' ? 200 : 0;
    const fattorePossesso = (percentualePossesso / 100) * (mesiPossesso / 12);
    const imuNettaAnnua = Math.max(0, (imuTeorica100 - detrazionePrimaCasa) * fattorePossesso);

    const accontoGiugno = imuNettaAnnua / 2;
    const saldoDicembre = imuNettaAnnua / 2;

    let codiceTributoF24 = '3918';
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Parametri Catastali e Fiscali</span>
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
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Rendita Catastale non rivalutata</span>
              <span className="font-mono text-sky-700 font-bold text-sm">€ {rendita.toLocaleString('it-IT')}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min={0}
                step={10}
                value={rendita || ''}
                onChange={(e) => setRendita(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 650"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Dato reperibile dalla visura catastale dell&apos;immobile (Quadro A o Dati di Classamento).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Categoria Catastale</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="A2_A7">A/2 - A/7 (Abitazioni ordinarie - molt. 160)</option>
                <option value="A10">A/10 (Uffici e studi privati - molt. 80)</option>
                <option value="C1">C/1 (Negozi e botteghe commerciali - molt. 55)</option>
                <option value="B_C3">C/2, C/6, C/7 (Garage, cantine, soffitte - molt. 160)</option>
                <option value="D">D (Capannoni industriali e alberghi - molt. 65)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Destinazione d&apos;Uso</label>
              <select
                value={destinazione}
                onChange={(e) => setDestinazione(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="seconda_casa">Seconda Casa / A disposizione</option>
                <option value="prima_casa_ordinaria">Prima Casa non di lusso (Esente)</option>
                <option value="prima_casa_lusso">Prima Casa di Lusso (A/1, A/8, A/9)</option>
                <option value="locato">Immobile Locato con canone concordato</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Aliquota Comunale (‰)</label>
              <input
                type="number"
                min={0}
                max={11.4}
                step={0.1}
                value={aliquotaPerMille}
                onChange={(e) => setAliquotaPerMille(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
              <span className="text-[10px] text-slate-400">Media naz.: 10,6‰</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Quota Possesso (%)</label>
              <input
                type="number"
                min={1}
                max={100}
                value={percentualePossesso}
                onChange={(e) => setPercentualePossesso(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
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
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Calcolo conforme alla Legge 27 dicembre 2019, n. 160 e istruzioni F24.</span>
        </div>
      </div>

      {/* Results Card */}
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
          <strong>Compilazione Modello F24:</strong> Sezione &quot;IMU e altri tributi locali&quot;. Indicare il codice catastale del Comune (4 caratteri), barrare &quot;Acc&quot; o &quot;Sal&quot;, numero immobili (1) e l&apos;importo a debito.
        </div>
      </div>
    </div>
  );
}

