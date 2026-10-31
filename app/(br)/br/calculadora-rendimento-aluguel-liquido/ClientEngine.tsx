'use client';

import * as React from 'react';
import {
  Building,
  ShieldCheck,
} from 'lucide-react';

interface YieldResult {
  valorImovel: number;
  aluguelBrutoMensal: number;
  aluguelBrutoAnual: number;
  taxaImobiliariaMensal: number;
  taxaImobiliariaAnual: number;
  iptuAnualProprietario: number;
  condominioVacanciaAnual: number;
  aluguelTributavelMensal: number;
  irpfCarneLeaoMensal: number;
  irpfCarneLeaoAnual: number;
  receitaLiquidaMensal: number;
  receitaLiquidaAnual: number;
  yieldBrutoAnual: number;
  yieldLiquidoAnual: number;
  benchmarkCdi: number;
}

export function CalculadoraRendimentoAluguelClient() {
  const [valorImovel, setValorImovel] = React.useState<number>(500000);
  const [aluguelMensal, setAluguelMensal] = React.useState<number>(2500);
  const [taxaAdminPercent, setTaxaAdminPercent] = React.useState<number>(8.0);
  const [iptuProprietario, setIptuProprietario] = React.useState<number>(0);
  const [mesesVacanciaAno, setMesesVacanciaAno] = React.useState<number>(0.5);
  const [condominioMensal, setCondominioMensal] = React.useState<number>(450);
  const [calcularIrpf, setCalcularIrpf] = React.useState<boolean>(true);

  const calcularYield = React.useCallback((): YieldResult => {
    const imovel = Math.max(1, valorImovel);
    const aluguel = Math.max(0, aluguelMensal);
    const taxaAdminPct = Math.max(0, taxaAdminPercent) / 100;
    const taxaImobMensal = aluguel * taxaAdminPct;
    const taxaImobAnual = taxaImobMensal * 12;

    const aluguelBrutoAnual = aluguel * 12;
    const iptuAnual = Math.max(0, iptuProprietario);
    const vacanciaMeses = Math.max(0, mesesVacanciaAno);
    const condVacanciaAnual = condominioMensal * vacanciaMeses;

    // Conforme Art. 31 da Lei 7.713/1988:
    // Podem ser deduzidos do aluguel bruto para fins de IRPF: comissão da imobiliária e impostos/taxas pagos pelo locador
    const baseCalculoIrpf = Math.max(0, aluguel - taxaImobMensal - (iptuAnual / 12));

    // Cálculo progressivo simplificado do Carnê-Leão (Tabela IRPF 2026)
    let irpfMensal = 0;
    if (calcularIrpf) {
      if (baseCalculoIrpf <= 2259.20) {
        irpfMensal = 0;
      } else if (baseCalculoIrpf <= 2826.65) {
        irpfMensal = baseCalculoIrpf * 0.075 - 169.44;
      } else if (baseCalculoIrpf <= 3751.05) {
        irpfMensal = baseCalculoIrpf * 0.15 - 381.44;
      } else if (baseCalculoIrpf <= 4664.68) {
        irpfMensal = baseCalculoIrpf * 0.225 - 662.77;
      } else {
        irpfMensal = baseCalculoIrpf * 0.275 - 896.00;
      }
      irpfMensal = Math.max(0, irpfMensal);
    }

    const irpfAnual = irpfMensal * 12;

    // Perda de receita por vacância (meses sem receber aluguel)
    const perdaVacanciaReceita = aluguel * vacanciaMeses;

    // Receita Líquida Anual
    const receitaLiquidaAnual = Math.max(
      0,
      aluguelBrutoAnual - taxaImobAnual - iptuAnual - condVacanciaAnual - irpfAnual - perdaVacanciaReceita
    );
    const receitaLiquidaMensal = receitaLiquidaAnual / 12;

    const yieldBrutoAnual = (aluguelBrutoAnual / imovel) * 100;
    const yieldLiquidoAnual = (receitaLiquidaAnual / imovel) * 100;

    return {
      valorImovel: imovel,
      aluguelBrutoMensal: aluguel,
      aluguelBrutoAnual,
      taxaImobiliariaMensal: taxaImobMensal,
      taxaImobiliariaAnual: taxaImobAnual,
      iptuAnualProprietario: iptuAnual,
      condominioVacanciaAnual: condVacanciaAnual,
      aluguelTributavelMensal: baseCalculoIrpf,
      irpfCarneLeaoMensal: irpfMensal,
      irpfCarneLeaoAnual: irpfAnual,
      receitaLiquidaMensal,
      receitaLiquidaAnual,
      yieldBrutoAnual,
      yieldLiquidoAnual,
      benchmarkCdi: 10.5,
    };
  }, [valorImovel, aluguelMensal, taxaAdminPercent, iptuProprietario, mesesVacanciaAno, condominioMensal, calcularIrpf]);

  const res = calcularYield();

  const formatarBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Controls Column */}
      <div className="md:col-span-7 bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 space-y-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
          <Building className="w-5 h-5 text-emerald-400" />
          Dados do Imóvel e da Locação
        </h2>

        {/* Valor de Mercado do Imóvel */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Valor de Mercado do Imóvel (R$)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">R$</span>
            <input
              type="number"
              min="50000"
              step="10000"
              value={valorImovel || ''}
              onChange={(e) => setValorImovel(parseFloat(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* Aluguel Bruto Mensal */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Aluguel Bruto Mensal Cobrado (R$)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">R$</span>
            <input
              type="number"
              min="100"
              step="100"
              value={aluguelMensal || ''}
              onChange={(e) => setAluguelMensal(parseFloat(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* Taxa de Imobiliária e Vacância */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Taxa da Imobiliária (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                value={taxaAdminPercent || ''}
                onChange={(e) => setTaxaAdminPercent(parseFloat(e.target.value) || 0)}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Praxe: 8% a 10% do aluguel.
            </span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Vacância Estimada (Meses/ano)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="12"
              value={mesesVacanciaAno || ''}
              onChange={(e) => setMesesVacanciaAno(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Média: 0.5 a 1 mês a cada troca.
            </span>
          </div>
        </div>

        {/* Condomínio e IPTU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Condomínio Mensal (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-xs">R$</span>
              <input
                type="number"
                min="0"
                step="50"
                value={condominioMensal || ''}
                onChange={(e) => setCondominioMensal(parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Custo pago pelo dono na vacância.
            </span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              IPTU Anual Pago pelo Dono (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-xs">R$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={iptuProprietario || ''}
                onChange={(e) => setIptuProprietario(parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Se o inquilino pagar tudo, digite 0.
            </span>
          </div>
        </div>

        {/* Switch IRPF Carnê-Leão */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={calcularIrpf}
              onChange={(e) => setCalcularIrpf(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 border-slate-600 bg-slate-900"
            />
            <span className="text-sm font-semibold text-slate-200">
              Deduzir Imposto de Renda Mensal (Carnê-Leão Pessoa Física)
            </span>
          </label>
        </div>
      </div>

      {/* Results Column */}
      <div className="md:col-span-5 space-y-6">
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60">
          <h2 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-700 flex items-center justify-between">
            <span>Rentabilidade Real (Cap Rate)</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              Líquido Real
            </span>
          </h2>

          <div className="p-4 rounded-xl bg-slate-950 text-white mb-5 space-y-3 border border-slate-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-0.5">
                Receita Líquida Mensal no Bolso
              </span>
              <div className="text-3xl font-black tracking-tight text-white font-mono">
                {formatarBRL(res.receitaLiquidaMensal)}
              </div>
            </div>
            <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
              <span>Cap Rate Líquido Anual:</span>
              <span className="font-bold text-emerald-400 text-base font-mono">
                {res.yieldLiquidoAnual.toFixed(2)}% a.a.
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Yield Bruto Nominal:</span>
              <span className="font-mono">{res.yieldBrutoAnual.toFixed(2)}% a.a.</span>
            </div>
          </div>

          {/* Detalhamento das Deduções */}
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-700">
              <span className="text-slate-400">Aluguel Bruto Anual:</span>
              <span className="font-semibold text-white font-mono">{formatarBRL(res.aluguelBrutoAnual)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-700">
              <span className="text-slate-400">Taxa Imobiliária ({taxaAdminPercent}%):</span>
              <span className="font-semibold text-rose-400 font-mono">-{formatarBRL(res.taxaImobiliariaAnual)}</span>
            </div>
            {calcularIrpf && (
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Carnê-Leão IRPF Anual:</span>
                <span className="font-semibold text-rose-400 font-mono">-{formatarBRL(res.irpfCarneLeaoAnual)}</span>
              </div>
            )}
            {res.condominioVacanciaAnual > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Condomínio na Vacância:</span>
                <span className="font-semibold text-rose-400 font-mono">-{formatarBRL(res.condominioVacanciaAnual)}</span>
              </div>
            )}
            {res.iptuAnualProprietario > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">IPTU Anual:</span>
                <span className="font-semibold text-rose-400 font-mono">-{formatarBRL(res.iptuAnualProprietario)}</span>
              </div>
            )}
            <div className="flex justify-between py-1.5 pt-2 border-t border-slate-700">
              <span className="font-bold text-white">Total Líquido Anual:</span>
              <span className="font-black text-emerald-400 text-sm font-mono">{formatarBRL(res.receitaLiquidaAnual)}</span>
            </div>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="rounded-2xl p-5 bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-xs space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Dedução Legal Conforme Lei 7.713/88
          </div>
          <p className="text-slate-300">
            A comissão de intermediação ou administração imobiliária é legalmente dedutível da base de cálculo do Carnê-Leão, reduzindo o valor líquido do DARF apurado perante a Receita Federal.
          </p>
        </div>
      </div>
    </div>
  );
}

