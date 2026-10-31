'use client';

import * as React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface DissidioResult {
  salarioAnterior: number;
  percentualReajusteTotal: number;
  novoSalario: number;
  aumentoMensal: number;
  mesesAtraso: number;
  diferencaSalarioRetroativo: number;
  reflexoFeriasRetroativo: number;
  reflexoDecimoRetroativo: number;
  totalRetroativoReceber: number;
  fgtsComplementar: number;
}

export function CalculadoraDissidioSalarialClient() {
  const [salarioAnterior, setSalarioAnterior] = React.useState<number>(3600);
  const [indiceInflacao, setIndiceInflacao] = React.useState<number>(4.8);
  const [aumentoReal, setAumentoReal] = React.useState<number>(1.2);
  const [mesesAtraso, setMesesAtraso] = React.useState<number>(3);
  const [incluirFerias13, setIncluirFerias13] = React.useState<boolean>(true);

  const calcolaDissidio = React.useCallback((): DissidioResult => {
    const salario = Math.max(0, salarioAnterior);
    const inflacao = Math.max(0, indiceInflacao);
    const ganho = Math.max(0, aumentoReal);

    const percentualTotal = inflacao + ganho;
    const aumentoMensal = salario * (percentualTotal / 100);
    const novoSalario = salario + aumentoMensal;

    const meses = Math.max(0, mesesAtraso);
    const diferencaSalarioRetroativo = aumentoMensal * meses;

    let reflexoFerias = 0;
    let reflexo13 = 0;

    if (incluirFerias13 && meses > 0) {
      reflexo13 = (aumentoMensal / 12) * meses;
      reflexoFerias = ((aumentoMensal / 12) * meses) * (4 / 3);
    }

    const totalRetroativoReceber =
      diferencaSalarioRetroativo + reflexoFerias + reflexo13;

    const fgtsComplementar = totalRetroativoReceber * 0.08;

    return {
      salarioAnterior: salario,
      percentualReajusteTotal: percentualTotal,
      novoSalario,
      aumentoMensal,
      mesesAtraso: meses,
      diferencaSalarioRetroativo,
      reflexoFeriasRetroativo: reflexoFerias,
      reflexoDecimoRetroativo: reflexo13,
      totalRetroativoReceber,
      fgtsComplementar,
    };
  }, [salarioAnterior, indiceInflacao, aumentoReal, mesesAtraso, incluirFerias13]);

  const res = calcolaDissidio();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-slate-800/60 p-6 sm:p-7 rounded-2xl border border-slate-700/60 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-100 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Salário & Índices de Reajuste</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSalarioAnterior(3600);
              setIndiceInflacao(4.8);
              setAumentoReal(1.2);
              setMesesAtraso(3);
              setIncluirFerias13(true);
            }}
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Salário Anterior */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Salário Anterior ao Reajuste (R$)</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">
                R$ {salarioAnterior.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </label>
            <input
              type="number"
              min={0}
              step={100}
              value={salarioAnterior || ''}
              onChange={(e) => setSalarioAnterior(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-white transition-all font-mono"
              placeholder="Ex. 3600.00"
            />
          </div>

          {/* Índices: Inflação + Ganho Real */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Índice de Inflação (% INPC/IPCA)</span>
                <span className="font-mono text-emerald-400">{indiceInflacao}%</span>
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={indiceInflacao}
                onChange={(e) => setIndiceInflacao(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Ganho Real Acima da Inflação (%)</span>
                <span className="font-mono text-emerald-400">+{aumentoReal}%</span>
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={aumentoReal}
                onChange={(e) => setAumentoReal(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>
          </div>

          {/* Retroatividade */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Meses de Retroatividade (Atraso na Homologação)</span>
              <span className="font-mono text-emerald-400 font-bold">{mesesAtraso} meses acumulados</span>
            </label>
            <input
              type="number"
              min={0}
              max={24}
              value={mesesAtraso}
              onChange={(e) => setMesesAtraso(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
            />
            <span className="text-[11px] text-slate-400 block">
              Exemplo: Data-base em maio, homologação da CCT em agosto = 3 meses de retroativo.
            </span>
          </div>

          {/* Incluir reflexos em férias e 13º */}
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-700 cursor-pointer hover:bg-slate-800/70 transition-colors">
            <input
              type="checkbox"
              checked={incluirFerias13}
              onChange={(e) => setIncluirFerias13(e.target.checked)}
              className="w-4 h-4 text-emerald-500 rounded border-slate-600 bg-slate-900 focus:ring-emerald-500"
            />
            <span className="text-xs text-slate-200 font-medium">
              Calcular <strong>reflexos proporcionais sobre Férias (+1/3) e 13º Salário</strong> do período de atraso
            </span>
          </label>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Reajuste total apurado: +{res.percentualReajusteTotal.toFixed(2)}% sobre a remuneração-base.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Novo Salário Reajustado
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            +{res.percentualReajusteTotal.toFixed(2)}%
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-300 font-medium">Novo Salário Mensal</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.novoSalario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block">
            Aumento de +R$ {res.aumentoMensal.toFixed(2)} em cada mês subsequente
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Salário Original Anterior</span>
            <span className="font-mono text-white">R$ {res.salarioAnterior.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Diferença Salarial Retroativa ({res.mesesAtraso} meses)</span>
            <span className="font-mono text-emerald-400 font-bold">R$ {res.diferencaSalarioRetroativo.toFixed(2)}</span>
          </div>
          {res.reflexoFeriasRetroativo > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Reflexo em Férias + 1/3</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.reflexoFeriasRetroativo.toFixed(2)}</span>
            </div>
          )}
          {res.reflexoDecimoRetroativo > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Reflexo em 13º Salário</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.reflexoDecimoRetroativo.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-1.5 pt-2 border-t border-slate-800 text-white font-bold">
            <span>Total Retroativo Bruto a Receber</span>
            <span className="font-mono text-cyan-300 font-black text-sm">
              R$ {res.totalRetroativoReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between py-1 text-slate-400">
            <span>Depósito FGTS Complementar 8%</span>
            <span className="font-mono text-emerald-400">R$ {res.fgtsComplementar.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-300 block">Artigo 9º da Lei nº 7.238/1984:</strong>
          <p>
            O empregado dispensado sem justa causa no período de 30 dias que antecede a data-base sindical tem direito a uma indenização adicional equivalente a um salário mensal integral.
          </p>
        </div>
      </div>
    </div>
  );
}

