import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Calculator, FileText, CheckCircle2 } from 'lucide-react';
import { CalculadoraSalarioLiquidoCltClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Salário Líquido CLT 2026 : Tabela INSS, IRRF e Desconto Simplificado | Kagazo Brasil',
  description:
    'Calcule seu salário líquido exato em 2026 conforme a CLT. Dedução progressiva do INSS (7,5% a 14%), cálculo automático do IRRF com desconto simplificado de R$ 564,80 e vale-transporte.',
  keywords: [
    'calculadora salario liquido clt 2026',
    'calculo desconto inss progressivo faixas',
    'tabela irrf 2026 desconto simplificado 564',
    'quanto sobra do salario bruto clt holerite',
    'deducao dependente imposto de renda 189',
    'desconto vale transporte 6 porcento clt',
    'simulador contracheque liquido brasil',
    'recolhimento fgts 8 porcento empresa',
  ],
  alternates: {
    canonical: `${SITE_URL}/br/calculadora-salario-liquido-clt`,
    languages: {
      'pt-BR': `${SITE_URL}/br/calculadora-salario-liquido-clt`,
      'pt': `${SITE_URL}/br/calculadora-salario-liquido-clt`,
      'x-default': `${SITE_URL}/br/calculadora-salario-liquido-clt`,
    },
  },
  openGraph: {
    title: 'Calculadora de Salário Líquido CLT 2026 | Kagazo Brasil',
    description:
      'Simulador trabalhista oficial do salário líquido: faixas progressivas do INSS, IRRF da Receita Federal e comparativo de deduções.',
    url: `${SITE_URL}/br/calculadora-salario-liquido-clt`,
    locale: 'pt_BR',
    siteName: 'Kagazo Brasil',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Como funciona o cálculo progressivo do INSS em 2026?',
    answer:
      'Desde a Reforma da Previdência (Emenda Constitucional nº 103/2019), o desconto do INSS não é mais aplicado como uma alíquota única sobre todo o salário. Ele é apurado progressivamente por faixas salariais: 7,5% sobre a fatia até o salário mínimo (R$ 1.412,00); 9% sobre o valor entre R$ 1.412,01 e R$ 2.666,68; 12% entre R$ 2.666,69 e R$ 4.000,03; e 14% sobre a parcela entre R$ 4.000,04 até o Teto Máximo do RGPS (R$ 7.786,02). O valor que ultrapassa o teto não sofre mais desconto.',
  },
  {
    question: 'O que é o Desconto Simplificado Mensal de R$ 564,80 no IRRF?',
    answer:
      'Instituído pela Lei nº 14.663/2023, o desconto simplificado mensal permite que o trabalhador opte por uma dedução padrão fixa de R$ 564,80 direto da base de cálculo do Imposto de Renda Retido na Fonte, substituindo as deduções legais tradicionais (INSS + R$ 189,59 por dependente + pensão). O empregador ou nossa ferramenta compara as duas opções e aplica automaticamente a que gerar o menor imposto para o trabalhador.',
  },
  {
    question: 'O empregador pode descontar mais de 6% pelo Vale-Transporte?',
    answer:
      'Não. A Lei nº 7.418/1985 estabelece expressamente que o empregador só pode descontar no máximo até 6% do salário básico do empregado (excluídos adicionais, comissões ou gratificações) a título de vale-transporte. Caso o custo real das passagens utilizadas seja inferior a 6% do salário, o desconto deve ser limitado ao valor real das passagens.',
  },
  {
    question: 'O depósito de FGTS de 8% é descontado do meu salário?',
    answer:
      'Não. O Fundo de Garantia do Tempo de Serviço (FGTS - Lei nº 8.036/1990) é uma obrigação estritamente patronal. A empresa deve depositar mensalmente o equivalente a 8% do salário bruto do empregado em conta vinculada na Caixa Econômica Federal. Esse valor nunca deve ser subtraído do holerite do funcionário.',
  },
];

export default function CalculadoraSalarioLiquidoCltPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Salário Líquido CLT Brasil 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/br/calculadora-salario-liquido-clt`,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'BRL',
        },
        provider: {
          '@type': 'Organization',
          name: 'Kagazo Brasil',
          url: `${SITE_URL}/br`,
        },
        description:
          'Calcule o salário líquido exato após dedução progressiva do INSS, IRRF com dedução simplificada e vale-transporte.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Brasil',
            item: `${SITE_URL}/br`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Salário Líquido CLT',
            item: `${SITE_URL}/br/calculadora-salario-liquido-clt`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Breadcrumb Visual */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center space-x-2">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/br" className="hover:text-emerald-400 transition-colors">Brasil</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Salário Líquido CLT</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLT, Portaria Interministerial MPS/MF & Tabela IRRF 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Calculadora de Salário Líquido CLT 2026 <br className="hidden sm:inline" />
              <span className="text-emerald-400">Desconto Progressivo do INSS, IRRF e Holerite</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Descubra quanto você vai receber na conta corrente a partir do salário bruto registrado em carteira de trabalho. O simulador calcula o desconto progressivo por faixas do INSS, compara as deduções legais com o desconto simplificado da Receita Federal e apura vale-transporte e pensão.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Resumo Trabalhista: Composição do Salário Líquido no Brasil
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  O <strong>salário líquido CLT</strong> resulta da subtração compulsória da contribuição ao <strong>INSS (7,5% a 14% progressivo)</strong> e do <strong>IRRF (até 27,5%)</strong> sobre a base tributável, aplicando a dedução de R$ 189,59 por dependente ou o <strong>desconto simplificado de R$ 564,80</strong> (o que for mais benéfico ao trabalhador). Além disso, podem incidir o vale-transporte (máx. 6%) e descontos autorizados de plano de saúde. O FGTS (8%) é pago pela empresa e não reduz o salário líquido.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <CalculadoraSalarioLiquidoCltClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Fundamentos Jurídicos e Trabalhistas da Remuneração CLT
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. O Princípio da Intangibilidade Salarial: Art. 462 da CLT
              </h3>
              <p>
                O Artigo 462 do Decreto-Lei nº 5.452/1943 (Consolidação das Leis do Trabalho) consagra o princípio da intangibilidade do salário, vedando ao empregador efetuar qualquer desconto nos salários do empregado, salvo quando este resultar de adiantamentos, de dispositivos expressos de lei (como INSS e IRRF) ou de convenção coletiva de trabalho devidamente homologada.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. A Sistemática de Alíquotas Progressivas do INSS (EC 103/2019)
              </h3>
              <p>
                Com a promulgação da Reforma da Previdência Social, o modelo anterior de alíquotas estáticas (8%, 9% e 11% sobre o salário integral) foi substituído pelo cálculo progressivo, no qual cada alíquota incide apenas sobre a respectiva fatia salarial:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>1ª Faixa (7,5%):</strong> Incide sobre a parcela salarial até o valor do salário mínimo nacional (R$ 1.412,00).
                </li>
                <li>
                  <strong>2ª Faixa (9,0%):</strong> Incide sobre a diferença salarial entre R$ 1.412,01 e R$ 2.666,68.
                </li>
                <li>
                  <strong>3ª Faixa (12,0%):</strong> Incide sobre a diferença entre R$ 2.666,69 e R$ 4.000,03.
                </li>
                <li>
                  <strong>4ª Faixa (14,0%):</strong> Incide sobre a parcela entre R$ 4.000,04 e o Teto do Regime Geral de Previdência Social (R$ 7.786,02).
                </li>
              </ul>
              <p>
                Essa fórmula assegura maior justiça distributiva: a <em>alíquota efetiva</em> de desconto é sempre inferior à alíquota nominal máxima da faixa em que o salário se enquadra.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. O Desconto Simplificado da Receita Federal (Lei 14.663/2023)
              </h3>
              <p>
                Para mitigar a defasagem histórica da tabela do Imposto de Renda da Pessoa Física, a legislação brasileira criou a sistemática da <strong>Dedução Simplificada de R$ 564,80</strong>. O cálculo do IRRF na fonte é estruturado em duas etapas comparativas automáticas:
              </p>
              <p>
                Primeiro, calculam-se as deduções legais cabíveis: a contribuição previdenciária descontada no mês, o valor de R$ 189,59 para cada dependente comprovado e o montante integral de pensão alimentícia judicial. Em seguida, compara-se o total dessas deduções com a quantia fixa de R$ 564,80. Aplica-se compulsoriamente a dedução que propiciar o menor valor de imposto a ser recolhido pelo trabalhador, preservando o poder de compra da remuneração líquida.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Perguntas Frequentes sobre Salário Líquido CLT
              </h2>
            </div>
            <div className="divide-y divide-slate-700/60">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-base font-medium text-slate-100">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Ad Contextual */}
          <div className="my-6">
            <AdSlot slot="post_download" context="legal" />
          </div>
        </div>
      </div>
    </>
  );
}
