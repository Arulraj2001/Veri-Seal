import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { CalculadoraRescisaoCltClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Rescisão de Contrato CLT 2026 : Demissão, Multa FGTS e Aviso Prévio | Kagazo Brasil',
  description:
    'Simule com precisão o cálculo de rescisão do contrato de trabalho CLT: aviso prévio proporcional (Lei 12.506/11), 13º e férias com 1/3, saldo de salário e multa de 40% ou 20% do FGTS.',
  keywords: [
    'calculadora de rescisao clt 2026',
    'calculo exato rescisao contrato de trabalho',
    'simulador demissao sem justa causa multa fgts',
    'aviso previo proporcional lei 12506 2011',
    'ferias vencidas e proporcionais um terco clt',
    'acordo mutuo demissao art 484 a clt',
    'prazo pagamento rescisao 10 dias art 477',
    'valor liquido a receber termo rescisao trct',
  ],
  alternates: {
    canonical: `${SITE_URL}/br/calculadora-rescisao-clt`,
    languages: {
      'pt-BR': `${SITE_URL}/br/calculadora-rescisao-clt`,
      'pt': `${SITE_URL}/br/calculadora-rescisao-clt`,
      'x-default': `${SITE_URL}/br/calculadora-rescisao-clt`,
    },
  },
  openGraph: {
    title: 'Calculadora de Rescisão de Contrato CLT 2026 | Kagazo Brasil',
    description:
      'Simulador completo de rescisão trabalhista conforme a CLT e Reforma Trabalhista: aviso prévio, férias, 13º e FGTS.',
    url: `${SITE_URL}/br/calculadora-rescisao-clt`,
    locale: 'pt_BR',
    siteName: 'Kagazo Brasil',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Qual é o prazo legal para a empresa pagar as verbas rescisórias?',
    answer:
      'Conforme o Artigo 477, § 6º da CLT (com redação unificada pela Reforma Trabalhista - Lei nº 13.467/2017), o pagamento de todas as verbas rescisórias deve ser efetuado em até 10 (dez) dias corridos a contar do término do contrato de trabalho, independentemente de o aviso prévio ter sido trabalhado, indenizado ou dispensado. O descumprimento sujeita a empresa à multa equivalente a um salário mensal do empregado (Art. 477, § 8º).',
  },
  {
    question: 'Como funciona o cálculo do Aviso Prévio Proporcional (Lei 12.506/2011)?',
    answer:
      'A Lei nº 12.506/2011 garante um aviso prévio básico de 30 dias para empregados com até 1 ano completo de serviço na mesma empresa. A cada ano completo adicional trabalhado, acrescentam-se 3 dias ao aviso, até o teto máximo de 90 dias (alcançado com 20 anos de vínculo). O período do aviso prévio indenizado integra o tempo de serviço para todos os efeitos legais, projetando a data de saída para cálculo de férias e 13º proporcional.',
  },
  {
    question: 'Quais são os direitos na Demissão por Acordo Mútuo (Art. 484-A da CLT)?',
    answer:
      'Na rescisão por acordo consensual, o trabalhador recebe: 1) Metade do aviso prévio (50%), se indenizado; 2) Multa de 20% sobre o saldo do FGTS (em vez de 40%); 3) Direito de sacar até 80% do saldo total depositado na conta vinculada do FGTS; 4) Pagamento integral do saldo de salário, 13º e férias (+1/3). O trabalhador, contudo, não tem direito ao benefício do Seguro-Desemprego.',
  },
  {
    question: 'O empregado demitido por Justa Causa perde quais direitos?',
    answer:
      'Na dispensa com justa causa fundamentada no Artigo 482 da CLT (improbidade, desídia, insubordinação, etc.), o trabalhador perde o direito ao aviso prévio, ao 13º proporcional, às férias proporcionais, à multa de 40% do FGTS, ao saque do saldo do FGTS e às guias do seguro-desemprego. Ele recebe estritamente o saldo de salário dos dias trabalhados no mês e as férias vencidas simples ou em dobro acrescidas do terço constitucional.',
  },
];

export default function CalculadoraRescisaoCltPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Rescisão Trabalhista CLT Brasil',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/br/calculadora-rescisao-clt`,
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
          'Simulador trabalhista completo para cálculo de rescisão CLT, aviso prévio proporcional e multa rescisória do FGTS.',
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
            name: 'Calculadora de Rescisão CLT',
            item: `${SITE_URL}/br/calculadora-rescisao-clt`,
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
            <span className="text-slate-200 font-medium">Calculadora de Rescisão CLT</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Art. 477 CLT, Lei 12.506/2011 & Reforma Trabalhista</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Calculadora de Rescisão de Contrato CLT <br className="hidden sm:inline" />
              <span className="text-emerald-400">Demissão, Férias, 13º e Multa de 40% do FGTS</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Calcule as verbas rescisórias devidas no término do contrato individual de trabalho. Simulador completo abrangendo demissão sem justa causa, pedido de demissão, demissão por acordo mútuo (Art. 484-A) e justa causa com projeção do aviso prévio proporcional.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Resumo Trabalhista: Direitos Rescisórios Conforme a Modalidade de Saída
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Na <strong>dispensa sem justa causa</strong>, o empregado faz jus ao saldo de salário, aviso prévio proporcional (30 a 90 dias pela Lei 12.506/11), 13º salário e férias proporcionais com 1/3 constitucional, saque integral do saldo do FGTS acrescido da <strong>multa rescisória de 40%</strong> e guias do seguro-desemprego. No <strong>acordo mútuo (Art. 484-A)</strong>, a multa do FGTS é de 20%, o saque é limitado a 80% do saldo e o aviso prévio indenizado é pago pela metade. O prazo legal de quitação é de até <strong>10 dias corridos</strong> após o término contratual.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <CalculadoraRescisaoCltClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Guia Completo das Verbas Rescisórias na Legislação Brasileira
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. O Aviso Prévio Proporcional e sua Projeção: Lei nº 12.506/2011
              </h3>
              <p>
                A Lei Federal nº 12.506 regulamentou o inciso XXI do Artigo 7º da Constituição Federal, fixando a proporcionalidade do aviso prévio em razão do tempo de serviço:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Período Base:</strong> 30 (trinta) dias de aviso prévio para os trabalhadores que possuem até 1 (um) ano completo de vínculo na mesma empresa.
                </li>
                <li>
                  <strong>Acréscimo Anual:</strong> São acrescidos 3 (três) dias para cada ano de serviço completo prestado ao mesmo empregador, até o limite de 60 dias de acréscimo, totalizando até 90 dias de aviso prévio.
                </li>
                <li>
                  <strong>Efeitos da Projeção (OJ 82 da SDI-1 do TST):</strong> A data de saída anotada na Carteira de Trabalho Digital deve corresponder ao término do prazo do aviso prévio, ainda que indenizado. Essa projeção integra o contrato de trabalho para todos os fins, influenciando o cálculo de mais 1/12 avos de férias e de 13º salário se a contagem atingir 15 dias ou mais.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Prazos e Sanções da Reforma Trabalhista: Art. 477 da CLT
              </h3>
              <p>
                A Lei nº 13.467/2017 unificou os prazos de pagamento das verbas rescisórias. O empregador dispõe de <strong>10 (dez) dias corridos</strong>, contados a partir do término do contrato de trabalho, para disponibilizar os valores ao empregado e entregar a documentação comprobatória da rescisão aos órgãos competentes. A inobservância desse prazo sujeita a empresa ao pagamento da multa estipulada no § 8º do Art. 477, equivalente ao valor de um salário nominal integral do trabalhador.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Multa Rescisória do FGTS e Guias de Seguro-Desemprego
              </h3>
              <p>
                A indenização compensatória de 40% sobre o montante de todos os depósitos realizados na conta vinculada do FGTS durante a vigência do contrato de trabalho é um direito fundamental do empregado dispensado sem justa causa (Art. 18, § 1º da Lei 8.036/1990). O cálculo da multa incide inclusive sobre os depósitos que já tenham sido eventualmente sacados pelo trabalhador durante o contrato para compra de casa própria ou em situações de calamidade pública.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Perguntas Frequentes sobre Rescisão de Contrato CLT
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
