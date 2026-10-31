'use client';

import * as React from 'react';
import {
  Calculator,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface SalarioLiquidoResult {
  salarioBruto: number;
  inssDesconto: number;
  inssAliquotaEfetiva: number;
  baseCalculoIrrf: number;
  irrfDesconto: number;
  irrfAliquotaEfetiva: number;
  descontoValeTransporte: number;
  outrosDescontosTotal: number;
  salarioLiquido: number;
  fgtsEmpresa: number;
  aliquotaTotalDescontos: number;
  usouDescontoSimplificado: boolean;
}

export function CalculadoraSalarioLiquidoCltClient() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(4500);
  const [dependentes, setDependentes] = React.useState<number>(1);
  const [pensaoAlimenticia, setPensaoAlimenticia] = React.useState<number>(0);
  const [percentualVT, setPercentualVT] = React.useState<number>(0);
  const [outrosDescontos, setOutrosDescontos] = React.useState<number>(0);

  const calcolaSalario = React.useCallback((): SalarioLiquidoResult => {
    const bruto = Math.max(0, salarioBruto);

    // 1. Tabela Progressiva INSS 2026 (Portaria MPS/MF)
    let inss = 0;
    const f1 = 1412.0;
    const f2 = 2666.68;
    const f3 = 4000.03;
    const teto = 7786.02;

    if (bruto <= f1) {
      inss = bruto * 0.075;
    } else if (bruto <= f2) {
      inss = f1 * 0.075 + (bruto - f1) * 0.09;
    } else if (bruto <= f3) {
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (bruto - f2) * 0.12;
    } else if (bruto <= teto) {
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (bruto - f3) * 0.14;
    } else {
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (teto - f3) * 0.14;
    }

    const inssAliquotaEfetiva = bruto > 0 ? (inss / bruto) * 100 : 0;

    // 2. Base de Cálculo IRRF e Desconto Simplificado
    const deducaoDependentes = dependentes * 189.59;
    const deducoesLegais = inss + deducaoDependentes + pensaoAlimenticia;

    const descontoSimplificadoRF = 564.8;
    const usouDescontoSimplificado = descontoSimplificadoRF > deducoesLegais;

    let baseIrrf = 0;
    if (usouDescontoSimplificado) {
      baseIrrf = Math.max(0, bruto - descontoSimplificadoRF);
    } else {
      baseIrrf = Math.max(0, bruto - deducoesLegais);
    }

    let irrf = 0;
    if (baseIrrf <= 2259.2) {
      irrf = 0;
    } else if (baseIrrf <= 2826.65) {
      irrf = baseIrrf * 0.075 - 169.44;
    } else if (baseIrrf <= 3751.05) {
      irrf = baseIrrf * 0.15 - 381.44;
    } else if (baseIrrf <= 4664.68) {
      irrf = baseIrrf * 0.225 - 662.77;
    } else {
      irrf = baseIrrf * 0.275 - 896.0;
    }
    irrf = Math.max(0, irrf);
    const irrfAliquotaEfetiva = bruto > 0 ? (irrf / bruto) * 100 : 0;

    // 3. Vale Transporte (máximo 6% CLT)
    const descontoVT = bruto * (Math.min(6, Math.max(0, percentualVT)) / 100);

    // 4. Outros descontos e Pensão
    const outrosTotal = outrosDescontos + pensaoAlimenticia;

    // 5. Salário Líquido Final
    const totalDescontos = inss + irrf + descontoVT + outrosTotal;
    const salarioLiquido = Math.max(0, bruto - totalDescontos);
    const aliquotaTotalDescontos = bruto > 0 ? (totalDescontos / bruto) * 100 : 0;

    // 6. FGTS
    const fgtsEmpresa = bruto * 0.08;

    return {
      salarioBruto: bruto,
      inssDesconto: inss,
      inssAliquotaEfetiva,
      baseCalculoIrrf: baseIrrf,
      irrfDesconto: irrf,
      irrfAliquotaEfetiva,
      descontoValeTransporte: descontoVT,
      outrosDescontosTotal: outrosTotal,
      salarioLiquido,
      fgtsEmpresa,
      aliquotaTotalDescontos,
      usouDescontoSimplificado,
    };
  }, [salarioBruto, dependentes, pensaoAlimenticia, percentualVT, outrosDescontos]);

  const res = calcolaSalario();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Dados do Contracheque (Holerite)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSalarioBruto(4500);
              setDependentes(1);
              setPensaoAlimenticia(0);
              setPercentualVT(0);
              setOutrosDescontos(0);
            }}
            className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Salário Bruto */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Salário Bruto Registrado (R$)</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </label>
            <input
              type="number"
              min={0}
              step={100}
              value={salarioBruto || ''}
              onChange={(e) => setSalarioBruto(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-all font-mono"
              placeholder="Ex. 4500.00"
            />
          </div>

          {/* Dependentes & Pensão */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                <span>Número de Dependentes</span>
                <span className="text-slate-400 font-normal">R$ 189,59 cada</span>
              </label>
              <input
                type="number"
                min={0}
                max={15}
                value={dependentes}
                onChange={(e) => setDependentes(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Pensão Alimentícia (R$)</label>
              <input
                type="number"
                min={0}
                step={50}
                value={pensaoAlimenticia || ''}
                onChange={(e) => setPensaoAlimenticia(Number(e.target.value))}
                placeholder="0,00"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Vale Transporte & Outros Descontos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                <span>Vale-Transporte (%)</span>
                <span className="text-slate-400 font-normal">Máx. 6% CLT</span>
              </label>
              <select
                value={percentualVT}
                onChange={(e) => setPercentualVT(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value={0}>0% (Não optante / Empresa custeia)</option>
                <option value={2}>2%</option>
                <option value={4}>4%</option>
                <option value={6}>6% (Desconto padrão integral)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Plano de Saúde / Outros (R$)</label>
              <input
                type="number"
                min={0}
                step={20}
                value={outrosDescontos || ''}
                onChange={(e) => setOutrosDescontos(Number(e.target.value))}
                placeholder="0,00"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Cálculo automático comparativo entre deduções legais e o desconto simplificado da Receita Federal.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Salário Líquido Mensal
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            CLT 2026
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-200 font-medium">Valor Líquido a Receber</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.salarioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-300 font-medium block">
            {(100 - res.aliquotaTotalDescontos).toFixed(1)}% do salário bruto preservado
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Salário Bruto</span>
            <span className="font-mono text-white">R$ {res.salarioBruto.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Desconto INSS ({res.inssAliquotaEfetiva.toFixed(2)}% efetivo)</span>
            <span className="font-mono text-rose-400 font-bold">- R$ {res.inssDesconto.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Desconto IRRF ({res.irrfAliquotaEfetiva.toFixed(2)}% efetivo)</span>
            <span className="font-mono text-rose-400 font-bold">- R$ {res.irrfDesconto.toFixed(2)}</span>
          </div>
          {res.descontoValeTransporte > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Vale-Transporte ({percentualVT}%)</span>
              <span className="font-mono text-amber-400">- R$ {res.descontoValeTransporte.toFixed(2)}</span>
            </div>
          )}
          {res.outrosDescontosTotal > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Outros Descontos & Pensão</span>
              <span className="font-mono text-amber-400">- R$ {res.outrosDescontosTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 pt-2 border-t border-slate-800 text-slate-300">
            <span>Depósito FGTS 8% (Empresa recolhe)</span>
            <span className="font-mono text-emerald-400 font-bold">+ R$ {res.fgtsEmpresa.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-300 block">Opção Tributária Aplicada:</strong>
          <p>
            {res.usouDescontoSimplificado
              ? 'Aplicado o Desconto Simplificado da Receita Federal (R$ 564,80), que proporcionou menor imposto retido que as deduções legais.'
              : 'Aplicadas as Deduções Legais Tradicionais (INSS + dependentes + pensão), por serem mais vantajosas que o desconto simplificado.'}
          </p>
        </div>
      </div>
    </div>
  );
}

