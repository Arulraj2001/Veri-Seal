import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { CalculadoraDasMeiClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora DAS MEI 2026 : Valor Mensal, Tabela INSS, ICMS, ISS e Limite Anual | Kagazo Brasil',
  description:
    'Calcule o valor exato da guia DAS MEI em 2026 segundo a Lei Complementar 123/2006. Valores para Comércio, Serviços, MEI Caminhoneiro (LC 188/21) e monitoramento do limite de R$ 81.000.',
  keywords: [
    'calculadora das mei 2026',
    'valor guia mensal mei comercio servicos',
    'quanto custa mei por mes 2026',
    'limite faturamento anual mei 81 mil',
    'recolhimento inss mei 5 porcento salario minimo',
    'mei caminhoneiro 12 porcento lc 188 2021',
    'vencimento boleto das dia 20 portal empreendedor',
    'desenquadramento mei excesso faturamento 20 porcento',
  ],
  alternates: {
    canonical: `${SITE_URL}/br/calculadora-das-mei`,
    languages: {
      'pt-BR': `${SITE_URL}/br/calculadora-das-mei`,
      'pt': `${SITE_URL}/br/calculadora-das-mei`,
      'x-default': `${SITE_URL}/br/calculadora-das-mei`,
    },
  },
  openGraph: {
    title: 'Calculadora DAS MEI 2026 | Kagazo Brasil',
    description:
      'Simulador tributário oficial do MEI: valores mensais do DAS para todas as atividades, Previdência e teto de faturamento.',
    url: `${SITE_URL}/br/calculadora-das-mei`,
    locale: 'pt_BR',
    siteName: 'Kagazo Brasil',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Qual é o valor da guia DAS do MEI em 2026 e quando vence?',
    answer:
      'A guia DAS (Documento de Arrecadação do Simples Nacional) vence todo dia 20 de cada mês (ou no primeiro dia útil subsequente). O valor é composto por: 5% do Salário Mínimo nacional a título de contribuição previdenciária ao INSS, somado a R$ 1,00 de ICMS (se atuar no comércio ou indústria) e/ou R$ 5,00 de ISS (se for prestador de serviços). Para o MEI Caminhoneiro, a alíquota previdenciária é de 12% do salário mínimo.',
  },
  {
    question: 'Qual é o teto máximo de faturamento anual do MEI?',
    answer:
      'O limite geral de receita bruta anual para o Microempreendedor Individual é de R$ 81.000,00 por ano-calendário (equivalente a uma média mensal de R$ 6.750,00). Para empresas abertas durante o ano, o limite é proporcional aos meses de atividade. Já para o MEI Caminhoneiro (LC 188/2021), o teto de faturamento anual é de R$ 251.600,00.',
  },
  {
    question: 'O que acontece se o MEI faturar mais do que o limite permitido?',
    answer:
      'Se o faturamento ultrapassar o teto em até 20% (até R$ 97.200,00), o MEI recolhe o DAS normalmente até o fim do ano e, em janeiro seguinte, recolhe uma guia DAS complementar sobre o excesso, migrando para Microempresa (ME) no Simples Nacional. Se o faturamento ultrapassar mais de 20% do teto, o desenquadramento é retroativo a janeiro do mesmo ano (ou data de abertura), com tributação sobre todas as receitas pelo Simples Nacional.',
  },
  {
    question: 'O pagamento do DAS garante quais benefícios previdenciários do INSS?',
    answer:
      'O recolhimento do DAS assegura ao MEI: aposentadoria por idade (62 anos para mulheres e 65 anos para homens, com 15 anos de carência); auxílio por incapacidade temporária (auxílio-doença); salário-maternidade (com carência de 10 meses de contribuição); e, para seus dependentes legais, pensão por morte e auxílio-reclusão.',
  },
];

export default function CalculadoraDasMeiPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora DAS MEI Brasil 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/br/calculadora-das-mei`,
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
          'Calcule o valor da guia mensal DAS para MEI (Comércio, Serviços e Caminhoneiro) e monitore o teto de faturamento anual.',
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
            name: 'Calculadora DAS MEI',
            item: `${SITE_URL}/br/calculadora-das-mei`,
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
            <span className="text-slate-200 font-medium">DAS MEI 2026</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lei Complementar 123/2006, LC 188/2021 & Portal do Empreendedor</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Calculadora DAS MEI 2026 Atualizada <br className="hidden sm:inline" />
              <span className="text-emerald-400">Valor da Guia Mensal, ICMS, ISS e Limite Anual</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Consulte os valores oficiais da guia unificada DAS do Microempreendedor Individual. Apuração de INSS, ICMS e ISS para comércio, prestação de serviços e MEI caminhoneiro, com termômetro de faturamento anual contra o teto de R$ 81.000,00.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Resumo Tributário: Composição da Contribuição do MEI
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  O <strong>Microempreendedor Individual (MEI)</strong> recolhe mensalmente o <strong>DAS</strong> com vencimento todo <strong>dia 20</strong>. A guia inclui a contribuição previdenciária de <strong>5% do salário mínimo</strong> (R$ 70,60 para SM de R$ 1.412,00 ou 12% para MEI Caminhoneiro), mais <strong>R$ 1,00 de ICMS</strong> estadual e/ou <strong>R$ 5,00 de ISS</strong> municipal. O teto de faturamento é de <strong>R$ 81.000,00 anuais</strong> (R$ 251.600,00 para caminhoneiros), assegurando cobertura integral de benefícios previdenciários do INSS.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <CalculadoraDasMeiClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Regime Jurídico e Tributário do Microempreendedor Individual
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. O Sistema SIMEI e a Lei Complementar nº 123/2006
              </h3>
              <p>
                O regime do MEI foi introduzido pela Lei Complementar nº 128/2008 no âmbito do Estatuto Nacional da Microempresa e Empresa de Pequeno Porte (Lei Complementar nº 123/2006), criando o <strong>Sistema de Recolhimento em Valores Fixos Mensais dos Tributos abrangidos pelo Simples Nacional (SIMEI)</strong>. O modelo desburocratizou o recolhimento tributário ao dispensar a escrituração contábil complexa e unificar impostos federais, estaduais e municipais em uma única guia de arrecadação bancária.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. A Natureza Híbrida do DAS: Tributos e Seguridade Social
              </h3>
              <p>
                A arrecadação do DAS não possui natureza estritamente tributária fiscal, integrando recursos de seguridade social e de receita compartilhada:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contribuição Previdenciária ao INSS (5% do SM):</strong> Destinada ao custeio do Regime Geral de Previdência Social, atribuindo ao empresário a condição de segurado contribuinte individual com direito a auxílio-doença, salário-maternidade e aposentadoria por idade.
                </li>
                <li>
                  <strong>Imposto Sobre Circulação de Mercadorias (ICMS - R$ 1,00):</strong> Cota fixa repassada ao Estado da federação onde o MEI está domiciliado para atividades comerciais, fabris ou industriais.
                </li>
                <li>
                  <strong>Imposto Sobre Serviços de Qualquer Natureza (ISS - R$ 5,00):</strong> Cota fixa creditada ao Município de localização do estabelecimento para todas as atividades de prestação de serviços.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. A Disciplina do MEI Caminhoneiro (Lei Complementar nº 188/2021)
              </h3>
              <p>
                Diante das peculiaridades econômicas do transporte autônomo de cargas, a Lei Complementar nº 188/2021 instituiu a modalidade especial do MEI Caminhoneiro. Em razão dos elevados custos operacionais de combustível e manutenção veicular, o teto de receita bruta foi elevado para <strong>R$ 251.600,00 anuais</strong>, e a alíquota previdenciária fixada em <strong>12% do salário mínimo</strong>, resguardando os mesmos direitos protetivos aos transportadores autônomos.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Perguntas Frequentes sobre a Guia DAS MEI
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
