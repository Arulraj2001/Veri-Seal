'use client';

import * as React from 'react';
import {
  Home,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface FinanciamentoResult {
  valorFinanciado: number;
  prazoMeses: number;
  taxaMensalEfetiva: number;
  primeiraParcelaSac: number;
  ultimaParcelaSac: number;
  totalJurosSac: number;
  totalGeralSac: number;
  rendaMinimaSac: number;
  parcelaPrice: number;
  totalJurosPrice: number;
  totalGeralPrice: number;
  rendaMinimaPrice: number;
  economiaJurosSacVsPrice: number;
}

export function SimuladorFinanciamentoSacPriceClient() {
  const [valorImovel, setValorImovel] = React.useState<number>(400000);
  const [valorEntrada, setValorEntrada] = React.useState<number>(80000);
  const [prazoAnos, setPrazoAnos] = React.useState<number>(30);
  const [taxaJurosAnual, setTaxaJurosAnual] = React.useState<number>(9.99);

  const calcolaFinanciamento = React.useCallback((): FinanciamentoResult => {
    const imovel = Math.max(0, valorImovel);
    const entrada = Math.max(0, Math.min(imovel, valorEntrada));
    const financiado = imovel - entrada;
    const n = Math.max(12, prazoAnos * 12);

    const iAno = taxaJurosAnual / 100;
    const iMes = Math.pow(1 + iAno, 1 / 12) - 1;

    // SAC
    const amortizacaoConstante = financiado / n;
    const jurosPrimeiroMesSac = financiado * iMes;
    const primeiraParcelaSac = amortizacaoConstante + jurosPrimeiroMesSac;
    const ultimaParcelaSac = amortizacaoConstante + (amortizacaoConstante * iMes);
    const totalJurosSac = (n * (jurosPrimeiroMesSac + amortizacaoConstante * iMes)) / 2;
    const totalGeralSac = financiado + totalJurosSac;
    const rendaMinimaSac = primeiraParcelaSac / 0.3;

    // Price
    let parcelaPrice = 0;
    if (iMes > 0) {
      parcelaPrice = financiado * (iMes / (1 - Math.pow(1 + iMes, -n)));
    } else {
      parcelaPrice = financiado / n;
    }
    const totalGeralPrice = parcelaPrice * n;
    const totalJurosPrice = Math.max(0, totalGeralPrice - financiado);
    const rendaMinimaPrice = parcelaPrice / 0.3;

    const economiaJurosSacVsPrice = Math.max(0, totalJurosPrice - totalJurosSac);

    return {
      valorFinanciado: financiado,
      prazoMeses: n,
      taxaMensalEfetiva: iMes * 100,
      primeiraParcelaSac,
      ultimaParcelaSac,
      totalJurosSac,
      totalGeralSac,
      rendaMinimaSac,
      parcelaPrice,
      totalJurosPrice,
      totalGeralPrice,
      rendaMinimaPrice,
      economiaJurosSacVsPrice,
    };
  }, [valorImovel, valorEntrada, prazoAnos, taxaJurosAnual]);

  const res = calcolaFinanciamento();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Valores & Prazos do Imóvel</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setValorImovel(400000);
              setValorEntrada(80000);
              setPrazoAnos(30);
              setTaxaJurosAnual(9.99);
            }}
            className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Valor do Imóvel & Entrada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex justify-between">
                <span>Valor do Imóvel (R$)</span>
              </label>
              <input
                type="number"
                min={50000}
                step={10000}
                value={valorImovel || ''}
                onChange={(e) => setValorImovel(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-all font-mono"
                placeholder="Ex. 400000"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex justify-between">
                <span>Valor da Entrada (R$)</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-normal font-mono">
                  {valorImovel > 0 ? ((valorEntrada / valorImovel) * 100).toFixed(0) : 0}%
                </span>
              </label>
              <input
                type="number"
                min={0}
                step={5000}
                value={valorEntrada || ''}
                onChange={(e) => setValorEntrada(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-all font-mono"
                placeholder="Ex. 80000"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/40 flex justify-between text-xs font-mono font-bold text-emerald-950 dark:text-emerald-200">
            <span>Valor Efetivo a Financiar:</span>
            <span>R$ {res.valorFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>

          {/* Prazo e Taxa de Juros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                <span>Prazo de Financiamento</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">{res.prazoMeses} meses</span>
              </label>
              <select
                value={prazoAnos}
                onChange={(e) => setPrazoAnos(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value={35}>35 anos (420 parcelas mensais - Caixa máx)</option>
                <option value={30}>30 anos (360 parcelas mensais)</option>
                <option value={25}>25 anos (300 parcelas mensais)</option>
                <option value={20}>20 anos (240 parcelas mensais)</option>
                <option value={15}>15 anos (180 parcelas mensais)</option>
                <option value={10}>10 anos (120 parcelas mensais)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                <span>Taxa Nominal de Juros (% a.a.)</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{res.taxaMensalEfetiva.toFixed(3)}% ao mês</span>
              </label>
              <input
                type="number"
                min={5}
                max={25}
                step={0.1}
                value={taxaJurosAnual}
                onChange={(e) => setTaxaJurosAnual(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Fórmula de juros compostos exponencial compatível com os simuladores habitacionais do SFH.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Economia Escolhendo SAC
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            Juros Menores
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-200 font-medium">Economia Total de Juros no SAC</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-400">
            R$ {res.economiaJurosSacVsPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-200 font-medium block">
            Diferença líquida de juros pagos ao longo dos {prazoAnos} anos
          </span>
        </div>

        {/* Cards Comparativos Lado a Lado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Coluna SAC */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-800/60 space-y-2">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block">
              Sistema SAC
            </span>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>1ª Parcela:</span>
                <span className="font-mono text-white font-bold">R$ {res.primeiraParcelaSac.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Última Parcela:</span>
                <span className="font-mono text-emerald-400">R$ {res.ultimaParcelaSac.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span>Total Juros:</span>
                <span className="font-mono text-emerald-300">R$ {res.totalJurosSac.toFixed(0)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                <span>Renda Mínima:</span>
                <span className="font-mono text-slate-300">R$ {res.rendaMinimaSac.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Coluna Price */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] block">
              Tabela Price
            </span>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Parcela Fixa:</span>
                <span className="font-mono text-white font-bold">R$ {res.parcelaPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Última Parcela:</span>
                <span className="font-mono text-amber-400">R$ {res.parcelaPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span>Total Juros:</span>
                <span className="font-mono text-rose-400 font-bold">R$ {res.totalJurosPrice.toFixed(0)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                <span>Renda Mínima:</span>
                <span className="font-mono text-slate-300">R$ {res.rendaMinimaPrice.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-300 block">Regra do Comprometimento de Renda:</strong>
          <p>Pelas diretrizes do SFH e Banco Central, a primeira prestação habitacional não pode exceder <strong>30% da renda bruta familiar</strong> comprovada dos proponentes.</p>
        </div>
      </div>
    </div>
  );
}

