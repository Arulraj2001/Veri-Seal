'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Coins,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Gift,
  TrendingUp,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface DecimoTerceiroResult {
  salarioBaseCalculo: number;
  mesesTrabalhados: number;
  decimoBrutoTotal: number;
  primeiraParcelaBruta: number;
  primeiraParcelaLiquida: number; // sem descontos
  segundaParcelaBruta: number;
  inssTotalDecimo: number;
  irrfTotalDecimo: number;
  segundaParcelaLiquida: number;
  totalLiquidoRecebido: number;
  prazosPagamento: { parcela1: string; parcela2: string };
}

export default function CalculadoraDecimoTerceiroPage() {
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

    // Valor Bruto Total proporcional aos meses trabalhados (Art. 1º Lei 4.090/62)
    const decimoBrutoTotal = (salarioBase / 12) * meses;

    // 1ª Parcela: 50% bruto sem qualquer desconto (Art. 2º Lei 4.749/65)
    const primeiraParcelaBruta = decimoBrutoTotal * 0.5;
    const primeiraParcelaLiquida = primeiraParcelaBruta;

    // 2ª Parcela: Valor total menos adiantamento da 1ª parcela
    const segundaParcelaBruta = decimoBrutoTotal - primeiraParcelaBruta;

    // Tributação exclusiva na fonte sobre o valor TOTAL do 13º salário (INSS e IRRF)
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

    // Na 2ª parcela desconta-se o INSS e o IRRF calculados sobre o total
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Décimo Terceiro Salário (13º)</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Lei 4.090/1962, Lei 4.749/1965 & Súmula 45 do TST (Médias)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calculadora do Décimo Terceiro Salário (13º) <br className="hidden sm:inline" />
          <span className="text-emerald-600">Previsão da 1ª e 2ª Parcelas com INSS e IRRF</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Trabalhista Direta:</strong> A <strong>Gratificação de Natal (13º salário)</strong> é devida a todo empregado CLT na proporção de <strong>1/12 avos por mês trabalhado</strong> (fração de 15 dias conta como mês integral). A <strong>1ª parcela</strong> (50% do valor) é paga até <strong>30 de novembro</strong> sem qualquer desconto de INSS ou imposto de renda. A <strong>2ª parcela</strong> é paga até <strong>20 de dezembro</strong>, momento em que incidem os descontos oficiais de INSS e IRRF sobre o valor total.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Gift className="w-4 h-4 text-emerald-600" />
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
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Salário Base */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Salário Bruto Contratual (R$)</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={salarioBruto || ''}
                onChange={(e) => setSalarioBruto(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                placeholder="Ex. 4200.00"
              />
            </div>

            {/* Média Horas Extras & Meses Trabalhados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Meses Trabalhados no Ano</span>
                  <span className="text-emerald-700 font-bold font-mono">{mesesTrabalhados}/12 avos</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={mesesTrabalhados}
                  onChange={(e) => setMesesTrabalhados(Math.min(12, Math.max(1, Number(e.target.value))))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Dependentes & Pensão */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Dependentes IRRF</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={dependentes}
                  onChange={(e) => setDependentes(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Pensão Alimentícia (R$)</label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={pensaoAlimenticia || ''}
                  onChange={(e) => setPensaoAlimenticia(Number(e.target.value))}
                  placeholder="0,00"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>O 13º salário tem tributação exclusiva e definitiva na fonte, não se misturando com a remuneração mensal ordinária de dezembro.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Total Líquido do 13º Salário
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              2 Parcelas
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Valor Total Líquido (1ª + 2ª)</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              R$ {res.totalLiquidoRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
              Valor bruto integral apurado: R$ {res.decimoBrutoTotal.toFixed(2)}
            </span>
          </div>

          {/* Cards das 2 Parcelas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                1ª Parcela (Até 30/Nov)
              </span>
              <div className="text-lg font-black font-mono text-emerald-400">
                R$ {res.primeiraParcelaLiquida.toFixed(2)}
              </div>
              <span className="text-[10px] text-slate-400 block">50% bruto sem descontos</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
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

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            A Lei do Décimo Terceiro Salário no Brasil (Lei nº 4.090/1962)
          </h2>
          <p>
            A Gratificação Natalina para os Trabalhadores, popularmente conhecida como <strong>13º Salário</strong>, foi instituída pela <strong>Lei nº 4.090 de 13 de julho de 1962</strong> e posteriormente regulamentada pela <strong>Lei nº 4.749/1965</strong>.
          </p>
          <p>
            Trata-se de um benefício compulsório devido a todo empregado que trabalhe sob o regime da CLT, servidores públicos e aposentados ou pensionistas do INSS.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Regra dos 15 Dias e Proporcionalidade de Avos
          </h3>
          <p>
            O cálculo do 13º baseia-se na contagem dos meses em que o empregado trabalhou no ano calendário:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              <strong>Fração Igual ou Superior a 15 Dias:</strong> O Artigo 1º, § 2º da Lei 4.090/1962 estabelece que a fração igual ou superior a 15 (quinze) dias de trabalho no mês é considerada como mês integral (1/12 avos).
            </li>
            <li>
              <strong>Impacto de Faltas Injustificadas:</strong> Se no decorrer de um mês o trabalhador faltar sem justificativa legal por mais de 15 dias, ele perde o direito ao avo daquele mês específico.
            </li>
            <li>
              <strong>Integração de Horas Extras e Adicionais (Súmula 45 TST):</strong> A remuneração base não se limita ao salário fixo: deve incluir a média anual de horas extras, adicional noturno, adicional de periculosidade ou insalubridade e comissões recebidas.
            </li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Tributação Exclusiva na Fonte
          </h3>
          <p>
            A incidência tributária do 13º salário possui uma característica jurídica singular: os descontos de <strong>INSS e IRRF são exclusivos na fonte</strong>. Isso significa que na Declaração Anual de Ajuste do IRPF o valor do 13º não se soma aos rendimentos tributáveis mensais ordinários para fins de mudança de faixa na declaração, sendo tributado de forma definitiva no pagamento de dezembro.
          </p>
        </div>
      </div>
    </div>
  );
}

