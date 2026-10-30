'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Percent,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
  Building,
  Coins,
  CheckCircle2,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

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

export default function RendimentoAluguelLiquidoPage() {
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
      benchmarkCdi: 10.5, // Média Selic/CDI de referência
    };
  }, [valorImovel, aluguelMensal, taxaAdminPercent, iptuProprietario, mesesVacanciaAno, condominioMensal, calcularIrpf]);

  const res = calcularYield();

  const formatarBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org FAQ & SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'Calculadora de Rendimento Líquido de Aluguel e Cap Rate Real',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'BRL',
                },
                description:
                  'Calcule a rentabilidade líquida real de um imóvel alugado deduzindo taxa de imobiliária, imposto de renda Carnê-Leão (Art. 31 Lei 7.713/88), IPTU e vacância.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'O que pode ser deduzido do aluguel para não pagar imposto de renda?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Segundo o Art. 31 da Lei Federal nº 7.713/1988 e o Regulamento do Imposto de Renda (RIR), o proprietário pode deduzir do rendimento bruto da locação: a taxa de administração da imobiliária ou corretor, os tributos municipais como o IPTU (caso pagos pelo proprietário sem repasse), despesas condominiais pagas no período de vacância e taxa de cobrança de boletos.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Qual é o Cap Rate médio de imóveis residenciais no Brasil?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No Brasil, o Cap Rate bruto de imóveis residenciais gira historicamente entre 4,5% e 6,5% ao ano. Já o Cap Rate líquido real (descontando comissão imobiliária de 8-10%, imposto de renda Carnê-Leão e despesas de vacância) situa-se frequentemente entre 3,2% e 4,8% ao ano, somando-se à valorização patrimonial do imóvel ao longo do tempo.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/br" className="hover:text-emerald-700 transition">
            Brasil
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Rendimento Líquido de Aluguel</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Cap Rate Real & Art. 31 Lei 7.713/1988
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculadora de Rendimento Líquido de Aluguel
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Descubra o ganho real líquido do seu imóvel após comissão da imobiliária, imposto de renda Carnê-Leão, IPTU e custos de vacância.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building className="w-5 h-5 text-emerald-600" />
              Dados do Imóvel e da Locação
            </h2>

            {/* Valor de Mercado do Imóvel */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
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
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Aluguel Bruto Mensal */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
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
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Taxa de Imobiliária e IRPF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Taxa da Imobiliária (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    value={taxaAdminPercent || ''}
                    onChange={(e) => setTaxaAdminPercent(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Praxe: 8% a 10% do aluguel.
                </span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Vacância Estimada (Meses/ano)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="12"
                  value={mesesVacanciaAno || ''}
                  onChange={(e) => setMesesVacanciaAno(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Média: 0.5 a 1 mês a cada troca.
                </span>
              </div>
            </div>

            {/* Condomínio e IPTU */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
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
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Custo pago pelo dono na vacância.
                </span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
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
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
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
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span className="text-sm font-semibold text-slate-800">
                  Deduzir Imposto de Renda Mensal (Carnê-Leão Pessoa Física)
                </span>
              </label>
            </div>
          </div>

          {/* Results Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Rentabilidade Real (Cap Rate)</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Líquido Real
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-0.5">
                    Receita Líquida Mensal no Bolso
                  </span>
                  <div className="text-3xl font-black tracking-tight text-white">
                    {formatarBRL(res.receitaLiquidaMensal)}
                  </div>
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Cap Rate Líquido Anual:</span>
                  <span className="font-bold text-emerald-400 text-base">
                    {res.yieldLiquidoAnual.toFixed(2)}% a.a.
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Yield Bruto Nominal:</span>
                  <span>{res.yieldBrutoAnual.toFixed(2)}% a.a.</span>
                </div>
              </div>

              {/* Detalhamento das Deduções */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Aluguel Bruto Anual:</span>
                  <span className="font-semibold text-slate-900">{formatarBRL(res.aluguelBrutoAnual)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Taxa Imobiliária ({taxaAdminPercent}%):</span>
                  <span className="font-semibold text-rose-600">-{formatarBRL(res.taxaImobiliariaAnual)}</span>
                </div>
                {calcularIrpf && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Carnê-Leão IRPF Anual:</span>
                    <span className="font-semibold text-rose-600">-{formatarBRL(res.irpfCarneLeaoAnual)}</span>
                  </div>
                )}
                {res.condominioVacanciaAnual > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Condomínio na Vacância:</span>
                    <span className="font-semibold text-rose-600">-{formatarBRL(res.condominioVacanciaAnual)}</span>
                  </div>
                )}
                {res.iptuAnualProprietario > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">IPTU Anual:</span>
                    <span className="font-semibold text-rose-600">-{formatarBRL(res.iptuAnualProprietario)}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Total Líquido Anual:</span>
                  <span className="font-black text-emerald-700 text-sm">{formatarBRL(res.receitaLiquidaAnual)}</span>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-emerald-50/70 border border-emerald-100 text-emerald-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Dedução Legal Conforme Lei 7.713/88
              </div>
              <p className="text-emerald-800">
                A comissão de intermediação ou administração imobiliária é legalmente dedutível da base de cálculo do Carnê-Leão, reduzindo o valor líquido que você deve repassar à Receita Federal todo mês.
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Placement */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Como Calcular a Rentabilidade Real de um Imóvel Alugado
            </h2>
            <p>
              Investir em imóveis para renda de locação é uma das mais tradicionais estratégias patrimoniais do investidor brasileiro. Todavia, um erro comum cometido por proprietários iniciantes é confundir a <strong>rentabilidade bruta (Gross Rental Yield)</strong> com a <strong>rentabilidade líquida real (Net Cap Rate)</strong>.
            </p>
            <p className="mt-3">
              Enquanto o yield bruto considera apenas a divisão aritmética do aluguel anual pelo valor do imóvel, o resultado no mundo real é profundamente impactado pela comissão de administração da imobiliária (usualmente entre 8% e 10%), pelo imposto de renda mensal apurado via Carnê-Leão (cujas alíquotas marginais chegam a 27,5%), pelas taxas de condomínio e IPTU suportadas durante os meses de vacância e pelas manutenções extraordinárias prediais.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Deduções Autorizadas pela Legislação Tributária (Art. 31 da Lei nº 7.713/1988)
            </h3>
            <p>
              Muitos proprietários pagam mais imposto de renda do que deveriam por desconhecerem as deduções fiscais expressamente admitidas pela Receita Federal do Brasil. De acordo com o Art. 31 da Lei Federal nº 7.713/1988 e o Regulamento do Imposto de Renda (RIR), podem ser deduzidos do valor do aluguel bruto:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong>Comissão da Administradora ou Corretor de Imóveis:</strong> Todo o valor pago à imobiliária pela cobrança e administração mensal do imóvel é 100% dedutível da base de cálculo do imposto no mês do recebimento.
              </li>
              <li>
                <strong>Impostos e Taxas Incidentes sobre o Imóvel:</strong> O IPTU (Imposto Predial e Territorial Urbano) e taxas municipais pagas pelo proprietário durante o período de locação, caso o ônus não tenha sido transferido ao inquilino.
              </li>
              <li>
                <strong>Despesas de Condomínio:</strong> Despesas condominiais ordinárias efetivamente pagas pelo proprietário quando o imóvel não estiver ocupado ou quando absorvidas por contrato.
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              O Papel do Carnê-Leão e a Retenção na Fonte por Pessoa Jurídica
            </h3>
            <p>
              O regime de recolhimento tributário depende diretamente da natureza jurídica do locatário (quem assina o contrato de aluguel como inquilino):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Locatário Pessoa Física</h4>
                <p className="text-xs text-slate-600">
                  O proprietário é responsável por preencher o sistema <strong>Carnê-Leão Web</strong> da Receita Federal e emitir o DARF com o código de receita <strong>0190</strong>, pagando o imposto devido até o último dia útil do mês seguinte ao do recebimento.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Locatário Pessoa Jurídica</h4>
                <p className="text-xs text-slate-600">
                  Quando o inquilino é uma empresa (CNPJ), a própria empresa é obrigada por lei a reter o IRRF na fonte (código DARF 3208) e repassar ao proprietário apenas o valor líquido, fornecendo o Comprovante de Rendimentos Anual para a DIRPF.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

