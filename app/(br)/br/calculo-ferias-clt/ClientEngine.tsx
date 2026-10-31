'use client';

import * as React from 'react';
import {
  Palmtree,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface FeriasResult {
  diasDireito: number;
  diasGozados: number;
  diasAbono: number;
  valorDiasGozados: number;
  tercoConstitucionalGozo: number;
  totalGozoBruto: number;
  valorAbonoPecuniario: number;
  tercoAbonoPecuniario: number;
  totalAbonoIsento: number;
  adiantamento13Salario: number;
  descontoInssFerias: number;
  descontoIrrfFerias: number;
  totalLiquidoFerias: number;
  prazoPagamentoTexto: string;
}

export function CalculoFeriasCltClient() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(4000);
  const [diasDescanso, setDiasDescanso] = React.useState<number>(20);
  const [vender10Dias, setVender10Dias] = React.useState<boolean>(true);
  const [adiantar13, setAdiantar13] = React.useState<boolean>(false);
  const [faltasInjustificadas, setFaltasInjustificadas] = React.useState<number>(0);
  const [dependentes, setDependentes] = React.useState<number>(0);

  const calcolaFerias = React.useCallback((): FeriasResult => {
    const salario = Math.max(0, salarioBruto);
    const valorDia = salario / 30;

    let diasDireito = 30;
    if (faltasInjustificadas <= 5) diasDireito = 30;
    else if (faltasInjustificadas <= 14) diasDireito = 24;
    else if (faltasInjustificadas <= 23) diasDireito = 18;
    else if (faltasInjustificadas <= 32) diasDireito = 12;
    else diasDireito = 0;

    const diasAbono = vender10Dias ? Math.min(10, Math.floor(diasDireito / 3)) : 0;
    const diasGozados = Math.max(0, diasDireito - diasAbono);

    const valorDiasGozados = valorDia * diasGozados;
    const tercoConstitucionalGozo = valorDiasGozados / 3;
    const totalGozoBruto = valorDiasGozados + tercoConstitucionalGozo;

    const valorAbonoPecuniario = valorDia * diasAbono;
    const tercoAbonoPecuniario = valorAbonoPecuniario / 3;
    const totalAbonoIsento = valorAbonoPecuniario + tercoAbonoPecuniario;

    const adiantamento13Salario = adiantar13 ? salario * 0.5 : 0;

    let inss = 0;
    const f1 = 1412.0;
    const f2 = 2666.68;
    const f3 = 4000.03;
    const teto = 7786.02;

    if (totalGozoBruto <= f1) inss = totalGozoBruto * 0.075;
    else if (totalGozoBruto <= f2) inss = f1 * 0.075 + (totalGozoBruto - f1) * 0.09;
    else if (totalGozoBruto <= f3) inss = f1 * 0.075 + (f2 - f1) * 0.09 + (totalGozoBruto - f2) * 0.12;
    else if (totalGozoBruto <= teto)
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (totalGozoBruto - f3) * 0.14;
    else inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (teto - f3) * 0.14;

    const baseIrrf = Math.max(0, totalGozoBruto - inss - dependentes * 189.59);
    let irrf = 0;
    if (baseIrrf <= 2259.2) irrf = 0;
    else if (baseIrrf <= 2826.65) irrf = baseIrrf * 0.075 - 169.44;
    else if (baseIrrf <= 3751.05) irrf = baseIrrf * 0.15 - 381.44;
    else if (baseIrrf <= 4664.68) irrf = baseIrrf * 0.225 - 662.77;
    else irrf = baseIrrf * 0.275 - 896.0;
    irrf = Math.max(0, irrf);

    const totalLiquidoFerias =
      totalGozoBruto - inss - irrf + totalAbonoIsento + adiantamento13Salario;

    const prazoPagamentoTexto =
      'O pagamento da remuneração das férias e do abono deve ser efetuado até 2 (dois) dias antes do início do período de gozo (Artigo 145 da CLT).';

    return {
      diasDireito,
      diasGozados,
      diasAbono,
      valorDiasGozados,
      tercoConstitucionalGozo,
      totalGozoBruto,
      valorAbonoPecuniario,
      tercoAbonoPecuniario,
      totalAbonoIsento,
      adiantamento13Salario,
      descontoInssFerias: inss,
      descontoIrrfFerias: irrf,
      totalLiquidoFerias,
      prazoPagamentoTexto,
    };
  }, [salarioBruto, diasDescanso, vender10Dias, adiantar13, faltasInjustificadas, dependentes]);

  const res = calcolaFerias();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <Palmtree className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Configuração das Férias</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSalarioBruto(4000);
              setDiasDescanso(20);
              setVender10Dias(true);
              setAdiantar13(false);
              setFaltasInjustificadas(0);
              setDependentes(0);
            }}
            className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Salário Base */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Salário Bruto Mensal (R$)</span>
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
              placeholder="Ex. 4000.00"
            />
          </div>

          {/* Venda de Dias (Abono) e Adiantamento 13º */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={vender10Dias}
                onChange={(e) => setVender10Dias(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <div className="text-xs text-slate-800 dark:text-slate-200">
                <strong className="block text-slate-900 dark:text-white">Vender 10 dias de férias (Abono Pecuniário Art. 143 CLT)</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Goza 20 dias de descanso e recebe 10 dias em dinheiro com 1/3, isentos de imposto.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={adiantar13}
                onChange={(e) => setAdiantar13(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <div className="text-xs text-slate-800 dark:text-slate-200">
                <strong className="block text-slate-900 dark:text-white">Adiantar 1ª Parcela do 13º Salário (50%)</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Solicitado em janeiro ou conforme convenção coletiva, sem desconto de INSS.</span>
              </div>
            </label>
          </div>

          {/* Faltas Injustificadas e Dependentes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                <span>Faltas Injustificadas no Ano</span>
                <span className="text-slate-400 font-normal">Art. 130 CLT</span>
              </label>
              <input
                type="number"
                min={0}
                max={35}
                value={faltasInjustificadas}
                onChange={(e) => setFaltasInjustificadas(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Dependentes IRRF</label>
              <input
                type="number"
                min={0}
                max={10}
                value={dependentes}
                onChange={(e) => setDependentes(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>O abono pecuniário não sofre retenção de encargos trabalhistas conforme Súmulas 125 e 136 do STJ.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Total Líquido de Férias
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            {res.diasGozados} Dias de Descanso
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-200 font-medium">Valor Líquido a Receber</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.totalLiquidoFerias.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-300 font-medium block">
            {res.diasAbono > 0 ? `Inclui ${res.diasAbono} dias de abono pecuniário isento` : 'Férias integrais de 30 dias'}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Remuneração Dias Gozados ({res.diasGozados} dias)</span>
            <span className="font-mono text-white">R$ {res.valorDiasGozados.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Terço Constitucional (1/3 sobre gozo)</span>
            <span className="font-mono text-white">+ R$ {res.tercoConstitucionalGozo.toFixed(2)}</span>
          </div>
          {res.totalAbonoIsento > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Abono Pecuniário ({res.diasAbono} dias + 1/3)</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.totalAbonoIsento.toFixed(2)}</span>
            </div>
          )}
          {res.adiantamento13Salario > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Adiantamento 1ª Parcela 13º (50%)</span>
              <span className="font-mono text-cyan-400 font-bold">+ R$ {res.adiantamento13Salario.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Desconto INSS Férias</span>
            <span className="font-mono text-rose-400 font-bold">- R$ {res.descontoInssFerias.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Desconto IRRF Férias</span>
            <span className="font-mono text-rose-400 font-bold">- R$ {res.descontoIrrfFerias.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-300 block">Prazo Legal de Pagamento (Art. 145 CLT):</strong>
          <p>{res.prazoPagamentoTexto}</p>
        </div>
      </div>
    </div>
  );
}

