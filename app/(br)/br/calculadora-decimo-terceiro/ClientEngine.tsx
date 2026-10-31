'use client';

import * as React from 'react';
import {
  Gift,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface DecimoTerceiroResult {
  salarioBaseCalculo: number;
  mesesTrabalhados: number;
  decimoBrutoTotal: number;
  primeiraParcelaBruta: number;
  primeiraParcelaLiquida: number;
  segundaParcelaBruta: number;
  inssTotalDecimo: number;
  irrfTotalDecimo: number;
  segundaParcelaLiquida: number;
  totalLiquidoRecebido: number;
  prazosPagamento: { parcela1: string; parcela2: string };
}

export function CalculadoraDecimoTerceiroClient() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(4200);
  const [mediaHorasExtras, setMediaHorasExtras] = React.useState<number>(300);
  const [mesesTrabalhados, setMesesTrabalhados] = React.useState<number>(12);
  const [dependentes, setDependentes] = React.useState<number>(1);
  const [pensaoAlimenticia, setPensaoAlimenticia] = React.useState<number>(0);

  const calcola13 = React.useCallback((): DecimoTerceiroResult => {
    const salario = Math.max(0, salarioBruto);
    const mediaAdicionais = Math.max(0, mediaHorasExtras);
    const salarioBase = salario + mediaAdicionais;
    const meses = Math.min(12, Math.max(1, mesesTrabalhados));

    const decimoBrutoTotal = (salarioBase / 12) * meses;

    // 1ª Parcela: 50% bruto sem qualquer desconto (Art. 2º Lei 4.749/65)
    const primeiraParcelaBruta = decimoBrutoTotal * 0.5;
    const primeiraParcelaLiquida = primeiraParcelaBruta;

    // 2ª Parcela: Valor total menos adiantamento da 1ª parcela
    const segundaParcelaBruta = decimoBrutoTotal - primeiraParcelaBruta;

    // Tributação exclusiva na fonte sobre o valor TOTAL do 13º salário (INSS progressivo)
    let inss = 0;
    const f1 = 1412.0;
    const f2 = 2666.68;
    const f3 = 4000.03;
    const teto = 7786.02;

    if (decimoBrutoTotal <= f1) inss = decimoBrutoTotal * 0.075;
    else if (decimoBrutoTotal <= f2) inss = f1 * 0.075 + (decimoBrutoTotal - f1) * 0.09;
    else if (decimoBrutoTotal <= f3) inss = f1 * 0.075 + (f2 - f1) * 0.09 + (decimoBrutoTotal - f2) * 0.12;
    else if (decimoBrutoTotal <= teto)
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (decimoBrutoTotal - f3) * 0.14;
    else inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (teto - f3) * 0.14;

    const baseIrrf = Math.max(0, decimoBrutoTotal - inss - dependentes * 189.59 - pensaoAlimenticia);
    let irrf = 0;
    if (baseIrrf <= 2259.2) irrf = 0;
    else if (baseIrrf <= 2826.65) irrf = baseIrrf * 0.075 - 169.44;
    else if (baseIrrf <= 3751.05) irrf = baseIrrf * 0.15 - 381.44;
    else if (baseIrrf <= 4664.68) irrf = baseIrrf * 0.225 - 662.77;
    else irrf = baseIrrf * 0.275 - 896.0;
    irrf = Math.max(0, irrf);

    const segundaParcelaLiquida = Math.max(0, segundaParcelaBruta - inss - irrf);
    const totalLiquidoRecebido = primeiraParcelaLiquida + segundaParcelaLiquida;

    const prazosPagamento = {
      parcela1: 'Paga entre 1º de fevereiro e 30 de novembro (Lei 4.749/65)',
      parcela2: 'Paga impreterivelmente até o dia 20 de dezembro de cada ano',
    };

    return {
      salarioBaseCalculo: salarioBase,
      mesesTrabalhados: meses,
      decimoBrutoTotal,
      primeiraParcelaBruta,
      primeiraParcelaLiquida,
      segundaParcelaBruta,
      inssTotalDecimo: inss,
      irrfTotalDecimo: irrf,
      segundaParcelaLiquida,
      totalLiquidoRecebido,
      prazosPagamento,
    };
  }, [salarioBruto, mediaHorasExtras, mesesTrabalhados, dependentes, pensaoAlimenticia]);

  const res = calcola13();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-slate-800/60 p-6 sm:p-7 rounded-2xl border border-slate-700/60 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-100 uppercase tracking-wider">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span>Dados Salariais & Período</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSalarioBruto(4200);
              setMediaHorasExtras(300);
              setMesesTrabalhados(12);
              setDependentes(1);
              setPensaoAlimenticia(0);
            }}
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Salário Base */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Salário Bruto Contratual (R$)</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">
                R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </label>
            <input
              type="number"
              min={0}
              step={100}
              value={salarioBruto || ''}
              onChange={(e) => setSalarioBruto(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-white transition-all font-mono"
              placeholder="Ex. 4200.00"
            />
          </div>

          {/* Média Horas Extras & Meses Trabalhados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Média de Horas Extras / Adicionais (R$)</span>
                <span className="text-slate-400 font-normal">Súmula 45 TST</span>
              </label>
              <input
                type="number"
                min={0}
                step={50}
                value={mediaHorasExtras || ''}
                onChange={(e) => setMediaHorasExtras(Number(e.target.value))}
                placeholder="0,00"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Meses Trabalhados no Ano</span>
                <span className="text-emerald-400 font-bold font-mono">{mesesTrabalhados}/12 avos</span>
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={mesesTrabalhados}
                onChange={(e) => setMesesTrabalhados(Math.min(12, Math.max(1, Number(e.target.value))))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>
          </div>

          {/* Dependentes & Pensão */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Dependentes IRRF</label>
              <input
                type="number"
                min={0}
                max={10}
                value={dependentes}
                onChange={(e) => setDependentes(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Pensão Alimentícia (R$)</label>
              <input
                type="number"
                min={0}
                step={50}
                value={pensaoAlimenticia || ''}
                onChange={(e) => setPensaoAlimenticia(Number(e.target.value))}
                placeholder="0,00"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Tributação exclusiva na fonte conforme Lei 4.090/62: descontos ocorrem unicamente na 2ª parcela.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Total Líquido do 13º Salário
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            2 Parcelas
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-300 font-medium">Valor Total Líquido (1ª + 2ª)</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.totalLiquidoRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block">
            Valor bruto integral apurado: R$ {res.decimoBrutoTotal.toFixed(2)}
          </span>
        </div>

        {/* Cards das 2 Parcelas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
              1ª Parcela (Até 30/Nov)
            </span>
            <div className="text-lg font-black font-mono text-emerald-400">
              R$ {res.primeiraParcelaLiquida.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-400 block">50% bruto sem descontos</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
              2ª Parcela (Até 20/Dez)
            </span>
            <div className="text-lg font-black font-mono text-cyan-400">
              R$ {res.segundaParcelaLiquida.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-400 block">Líquida pós INSS e IRRF</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Desconto INSS (Tributação exclusiva 13º)</span>
            <span className="font-mono text-rose-400 font-bold">- R$ {res.inssTotalDecimo.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Desconto IRRF (Tributação exclusiva 13º)</span>
            <span className="font-mono text-rose-400 font-bold">- R$ {res.irrfTotalDecimo.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <strong className="text-slate-300 block">Calendário Oficial de Pagamento:</strong>
          <ul className="space-y-1">
            <li>• <strong>1ª Parcela:</strong> {res.prazosPagamento.parcela1}.</li>
            <li>• <strong>2ª Parcela:</strong> {res.prazosPagamento.parcela2}.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

