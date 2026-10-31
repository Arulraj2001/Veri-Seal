import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Palmtree, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculoFeriasCltClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Férias CLT 2026 | 1/3 Constitucional, Abono e Descontos',
  description:
    'Calcule o valor exato das suas férias CLT em 2026. Simule salário base, 1/3 constitucional, venda de 10 dias (abono pecuniário), adiantamento de 13º e descontos oficiais de INSS e IRRF.',
  keywords: [
    'calculo ferias clt',
    'calculadora de ferias 2026',
    'simulador ferias 1 terco',
    'venda de ferias abono pecuniario',
    'desconto inss irrf ferias',
    'prazo pagamento ferias art 145 clt',
    'tabela faltas ferias art 130 clt'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculo-ferias-clt',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculo-ferias-clt',
      'pt': 'https://kagazo.in/br/calculo-ferias-clt',
      'x-default': 'https://kagazo.in/br/calculo-ferias-clt',
    },
  },
  openGraph: {
    title: 'Calculadora de Férias CLT 2026 | Simulação Oficial Completa',
    description:
      'Descubra quanto você vai receber de férias líquidas. Cálculo preciso de 1/3 constitucional, abono pecuniário isento e tabela de retenção INSS/IRRF 2026.',
    url: 'https://kagazo.in/br/calculo-ferias-clt',
    siteName: 'Kagazo Brasil',
    locale: 'pt_BR',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      'name': 'Calculadora de Férias CLT 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador jurídico e trabalhista das férias CLT com 1/3 constitucional, abono de 10 dias e deduções fiscais.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'BRL',
      },
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Início',
          'item': 'https://kagazo.in',
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Brasil',
          'item': 'https://kagazo.in/br',
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'Cálculo de Férias CLT',
          'item': 'https://kagazo.in/br/calculo-ferias-clt',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Qual é o prazo legal para o pagamento das férias pelo empregador?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'De acordo com o artigo 145 da Consolidação das Leis do Trabalho (CLT), a remuneração das férias e o abono pecuniário devem ser quitados integralmente até 2 (dois) dias antes do início do respectivo período de descanso do colaborador.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Como funciona a venda de 10 dias de férias (abono pecuniário)?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Conforme o artigo 143 da CLT, o trabalhador tem o direito de converter 1/3 do seu período de férias em dinheiro. Em um período padrão de 30 dias, é possível vender até 10 dias. Sobre o valor do abono pecuniário e seu respectivo terço constitucional NÃO incidem descontos de INSS nem de IRRF, conforme consolidado pelas Súmulas 125 e 136 do STJ.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Como as faltas injustificadas afetam os dias de férias?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O artigo 130 da CLT estabelece a escala de dias de gozo de férias no ano aquisitivo: até 5 faltas dá direito a 30 dias; de 6 a 14 faltas o direito cai para 24 dias; de 15 a 23 faltas cai para 18 dias; de 24 a 32 faltas dá direito a 12 dias. Com mais de 32 faltas injustificadas, o direito às férias é integralmente perdido.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O desconto de INSS e IRRF das férias é feito em conjunto com o salário normal?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. O cálculo de retenção na fonte do IRRF sobre férias é tributado de forma exclusiva e em separado do salário mensal comum, aplicando-se a tabela progressiva oficial sobre a soma dos dias de gozo e do terço constitucional.',
          },
        },
      ],
    },
  ],
};

export default function CalculoFeriasCltPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center space-x-2">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/br" className="hover:text-emerald-400 transition-colors">Brasil</Link>
            <span>/</span>
            <span className="text-slate-200">Cálculo de Férias CLT</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Palmtree className="w-3.5 h-3.5" />
              Legislação Trabalhista Brasileira • CLT Art. 129 a 145
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de Férias CLT 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Simule detalhadamente o valor líquido das férias, terço constitucional de 1/3, abono pecuniário isento, adiantamento de 13º salário e deduções de INSS e IRRF com base na tabela oficial.
            </p>

            {/* Answer Capsule (GEO Optimization) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra de Ouro do Cálculo de Férias CLT:</p>
              <p>
                O valor bruto é composto pela remuneração dos dias de descanso acrescida de 1/3 constitucional (Art. 7º, XVII da CF/88). Caso haja venda de até 10 dias (abono pecuniário), esse montante é 100% isento de INSS e Imposto de Renda. O pagamento legal deve ocorrer rigorosamente até 2 dias antes do descanso.
              </p>
            </div>
          </header>

          {/* Interactive Tool Client Engine */}
          <CalculoFeriasCltClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Guia Completo das Férias Trabalhistas (CLT): Direitos, Prazos e Cálculos
            </h2>

            <p>
              O direito às férias anuais remuneradas constitui uma garantia fundamental do trabalhador brasileiro, assegurada pelo artigo 7º, inciso XVII da Constituição Federal de 1988 e minuciosamente regulamentada pelos artigos 129 a 145 da Consolidação das Leis do Trabalho (CLT). O descanso anual tem por finalidade a recuperação física e mental do empregado após doze meses ininterruptos de dedicação laboral, configurando o chamado período aquisitivo.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. Período Aquisitivo vs. Período Concessivo</h3>
            <p>
              O vínculo de trabalho submete-se a dois ciclos temporais fundamentais para a concessão das férias:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Período Aquisitivo (Art. 130 CLT):</strong> Corresponde aos 12 meses de trabalho contados a partir da data de admissão do empregado, nos quais é conquistado o direito de descansar.
              </li>
              <li>
                <strong>Período Concessivo (Art. 134 CLT):</strong> Corresponde aos 12 meses subsequentes ao término do período aquisitivo, intervalo no qual o empregador é obrigado a conceder o descanso remunerado. Caso as férias não sejam usufruídas dentro desse prazo concessivo, o empregador deverá pagar a remuneração em dobro (Art. 137 da CLT).
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">2. Escala de Redução de Férias por Faltas Injustificadas</h3>
            <p>
              O artigo 130 da CLT disciplina que ausências injustificadas ao serviço durante o período aquisitivo penalizam diretamente a quantidade de dias de repouso aos quais o trabalhador terá direito:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Faltas Injustificadas no Período</th>
                    <th className="p-2">Dias de Férias Concedidos</th>
                    <th className="p-2">Redução</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2">Até 5 faltas</td>
                    <td className="p-2 font-semibold text-emerald-400">30 dias corridos</td>
                    <td className="p-2">Nenhuma perda</td>
                  </tr>
                  <tr>
                    <td className="p-2">De 6 a 14 faltas</td>
                    <td className="p-2 font-semibold text-amber-400">24 dias corridos</td>
                    <td className="p-2">Perda de 6 dias</td>
                  </tr>
                  <tr>
                    <td className="p-2">De 15 a 23 faltas</td>
                    <td className="p-2 font-semibold text-amber-400">18 dias corridos</td>
                    <td className="p-2">Perda de 12 dias</td>
                  </tr>
                  <tr>
                    <td className="p-2">De 24 a 32 faltas</td>
                    <td className="p-2 font-semibold text-red-400">12 dias corridos</td>
                    <td className="p-2">Perda de 18 dias</td>
                  </tr>
                  <tr>
                    <td className="p-2">Acima de 32 faltas</td>
                    <td className="p-2 font-semibold text-red-500">0 dias (Perda total)</td>
                    <td className="p-2">Perda do direito integral</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">3. Venda de Férias: Abono Pecuniário (Art. 143 CLT)</h3>
            <p>
              É faculdade exclusiva do trabalhador converter 1/3 do seu período de direito a férias em abono pecuniário (a popularmente chamada "venda de 10 dias"). O empregador não pode impor a venda, nem recusar a solicitação se requerida pelo funcionário até 15 dias antes do término do período aquisitivo.
            </p>
            <p>
              <strong>Vantagem Tributária:</strong> O abono pecuniário e seu respectivo 1/3 possuem caráter estritamente indenizatório. Em consonância com a jurisprudência pacificada pelas Súmulas 125 e 136 do Superior Tribunal de Justiça (STJ), sobre esses montantes <em>não há incidência de contribuição previdenciária (INSS) nem retenção de Imposto de Renda (IRRF)</em>.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">4. Prazo Improrrogável de Pagamento (Art. 145 CLT)</h3>
            <p>
              A legislação trabalhista impõe que a remuneração das férias deve ser disponibilizada ao trabalhador com pelo menos <strong>2 dias de antecedência</strong> do início do período de gozo. O descumprimento desse prazo acarreta infração trabalhista e gera passivo de penalidades administrativas e indenizações.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">5. Fracionamento das Férias após a Reforma Trabalhista</h3>
            <p>
              Desde a vigência da Lei nº 13.467/2017, havendo concordância mútua entre empregado e empregador, as férias de 30 dias podem ser usufruídas em até <strong>3 períodos</strong>, desde que:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Um dos períodos não seja inferior a 14 dias corridos;</li>
              <li>Nenhum dos demais períodos seja inferior a 5 dias corridos cada um;</li>
              <li>O início das férias não ocorra no período de dois dias que antecede feriado ou dia de repouso semanal remunerado (DSR).</li>
            </ul>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Cálculo de Férias CLT
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Posso pedir adiantamento da 1ª parcela do 13º salário nas férias?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. O artigo 2º, § 2º da Lei nº 4.749/1965 prevê que o empregado pode solicitar o adiantamento de 50% do 13º salário por ocasião das férias, desde que formule o pedido formalmente à empresa durante o mês de janeiro do ano correspondente.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Horas extras e comissões entram no cálculo das férias?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Conforme o artigo 142 da CLT e Súmula 151 do TST, todos os adicionais habituais — tais como horas extras, adicional noturno, insalubridade, periculosidade e comissões — são integrados pela sua média aritmética duodecimal na base de cálculo da remuneração das férias.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O que acontece se a empresa atrasar o pagamento das férias?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  O pagamento efetuado fora do prazo do artigo 145 da CLT (até 2 dias antes do início do descanso) desvirtua a finalidade do descanso remunerado e sujeita o empregador a autuações da fiscalização do trabalho, bem como à jurisprudência consolidada de reparação ao trabalhador.
                </p>
              </details>
            </div>
          </section>

          {/* Bottom Ad */}
          <AdSlot slot="post_download" context="legal" />
        </div>
      </div>
    </>
  );
}
