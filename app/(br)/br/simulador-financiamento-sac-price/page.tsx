import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Home, FileText, CheckCircle2 } from 'lucide-react';
import { SimuladorFinanciamentoSacPriceClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simulador de Financiamento Habitacional 2026 : SAC vs Price, Parcelas e Juros | Kagazo Brasil',
  description:
    'Simule e compare financiamentos imobiliários entre Sistema SAC e Tabela Price. Cálculo da 1ª e última parcela, economia de juros, renda mínima exigida pelo SFH e regras da Caixa.',
  keywords: [
    'simulador financiamento imobiliario sac price 2026',
    'comparativo tabela sac e price caixa',
    'qual melhor sac ou price financiamento',
    'renda minima aprovacao financiamento sfh 30 porcento',
    'calculo primeira e ultima parcela sac decrescente',
    'juros totais financiamento habitacional 30 anos',
    'amortizacao constante saldo devedor banco central',
    'simulador casa propria entrada e parcelas',
  ],
  alternates: {
    canonical: `${SITE_URL}/br/simulador-financiamento-sac-price`,
    languages: {
      'pt-BR': `${SITE_URL}/br/simulador-financiamento-sac-price`,
      'pt': `${SITE_URL}/br/simulador-financiamento-sac-price`,
      'x-default': `${SITE_URL}/br/simulador-financiamento-sac-price`,
    },
  },
  openGraph: {
    title: 'Simulador de Financiamento Imobiliário SAC vs Price | Kagazo Brasil',
    description:
      'Compare as parcelas, custo total de juros e renda necessária entre a Tabela SAC e a Tabela Price.',
    url: `${SITE_URL}/br/simulador-financiamento-sac-price`,
    locale: 'pt_BR',
    siteName: 'Kagazo Brasil',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Qual é a principal diferença prática entre o Sistema SAC e a Tabela Price?',
    answer:
      'No Sistema de Amortização Constante (SAC), a amortização da dívida é fixa em todos os meses, fazendo com que as prestações sejam decrescentes (começam mais altas e diminuem até o fim do contrato), resultando em um total de juros consideravelmente menor. Na Tabela Price (Sistema Francês), as parcelas são fixas do início ao fim; a primeira parcela é mais baixa, o que facilita a comprovação de renda, mas o total pago em juros ao banco é significativamente maior.',
  },
  {
    question: 'Qual é a regra de comprometimento de renda familiar para aprovação no SFH?',
    answer:
      'Pelas normas regulamentares do Sistema Financeiro da Habitação (SFH) e resoluções do Banco Central do Brasil (Bacen), o valor da primeira prestação do financiamento imobiliário não pode comprometer mais do que 30% da renda bruta familiar mensal comprovada dos proponentes. Caso a prestação calculada supere 30%, o crédito habitacional é recusado pelo banco ou exige ampliação da entrada.',
  },
  {
    question: 'Por que o SAC é a opção mais recomendada para compra de imóveis?',
    answer:
      'Porque no SAC o saldo devedor principal é amortizado de forma acelerada desde o primeiro mês. Em um financiamento de 30 anos (360 meses), a economia total em juros pagos ao banco no SAC frequentemente ultrapassa dezenas ou centenas de milhares de reais em relação à Price, proporcionando maior segurança financeira caso ocorra redução de renda no futuro.',
  },
  {
    question: 'É vantajoso amortizar o financiamento com o FGTS?',
    answer:
      'Sim, extraordinariamente vantajoso. Ao utilizar o saldo do FGTS para amortizar o saldo devedor principal pelo Art. 20 da Lei nº 8.036/1990, o mutuário pode escolher entre reduzir o valor das parcelas mensais futuras ou diminuir o prazo total restante do contrato, economizando todos os juros que incidiriam sobre as parcelas eliminadas.',
  },
];

export default function SimuladorFinanciamentoSacPricePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Simulador de Financiamento Habitacional SAC vs Price',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/br/simulador-financiamento-sac-price`,
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
          'Simulador comparativo de parcelas, juros acumulados e renda mínima entre a Tabela SAC e a Tabela Price para crédito imobiliário.',
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
            name: 'Financiamento SAC vs Price',
            item: `${SITE_URL}/br/simulador-financiamento-sac-price`,
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
            <span className="text-slate-200 font-medium">Financiamento SAC vs Price</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sistema Financeiro da Habitação (SFH / SFI) & Regras da Caixa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Simulador de Financiamento Habitacional: SAC vs Price <br className="hidden sm:inline" />
              <span className="text-emerald-400">Comparativo de Parcelas, Juros Totais e Renda Mínima</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Compare lado a lado o custo real do financiamento imobiliário entre o Sistema de Amortização Constante (SAC) e a Tabela Price. Saiba o valor da prestação inicial e final, a economia líquida de juros e a renda bruta mensal necessária para aprovação bancária.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Resumo Financeiro: Sistema SAC versus Tabela Price
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  No <strong>Sistema SAC</strong>, as prestações são decrescentes e o valor amortizado da dívida é constante a cada mês, gerando uma <strong>economia de juros de 20% a 35%</strong> no custo total do contrato em comparação com a <strong>Tabela Price</strong>. A Price, por sua vez, oferece prestações iniciais mais baixas e constantes, exigindo menor comprovação de renda inicial pela regra de comprometimento máximo de <strong>30% da renda bruta familiar</strong> do SFH.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <SimuladorFinanciamentoSacPriceClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Estrutura Jurídica e Financeira do Crédito Imobiliário no Brasil
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. O Marco Regulatório do SFH e SFI (Lei 4.380/1964 e Lei 9.514/1997)
              </h3>
              <p>
                As operações de financiamento habitacional no Brasil dividem-se principalmente em duas modalidades jurídicas: o <strong>Sistema Financeiro da Habitação (SFH)</strong>, criado pela Lei nº 4.380/1964 com recursos subsidiados da poupança e do FGTS e teto regulatório de avaliação do imóvel, e o <strong>Sistema de Financiamento Imobiliário (SFI)</strong>, regido pela Lei nº 9.514/1997 que instituiu a alienação fiduciária em garantia de bem imóvel, trazendo maior segurança jurídica aos credores e agilizando a execução extrajudicial em caso de inadimplência.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Matemática Financeira dos Sistemas de Amortização
              </h3>
              <p>
                A composição das prestações mensais obedece a regras atuariais distintas:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Tabela SAC:</strong> A parcela mensal é formada pela amortização constante (Saldo Devedor / n) acrescida dos juros calculados sobre o saldo devedor do mês anterior. Como a amortização é imediata e constante, a base de cálculo dos juros diminui a cada 30 dias, gerando um fluxo de parcelas estritamente decrescente.
                </li>
                <li>
                  <strong>Tabela Price (Sistema Francês):</strong> As prestações são fixas ao longo do prazo. Nas primeiras parcelas, a fatia correspondente aos juros consome a maior parte do valor pago, destinando uma quantia ínfima ao abatimento da dívida principal. Apenas na segunda metade do contrato a amortização do capital passa a superar os juros.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. A Regra Prudencial do Comprometimento Máximo de Renda (30%)
              </h3>
              <p>
                O Conselho Monetário Nacional (CMN) e o Banco Central do Brasil determinam que as instituições financeiras (Caixa Econômica Federal, Banco do Brasil, Itaú, Bradesco e Santander) limitem a primeira prestação a no máximo <strong>30% da renda mensal bruta comprovada</strong> dos proponentes. Essa barreira prudencial visa prevenir o superendividamento das famílias brasileiras e preservar o orçamento doméstico essencial para moradia e subsistência.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Perguntas Frequentes sobre Financiamento SAC e Price
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
