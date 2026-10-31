import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculadoraDissidioSalarialClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Dissídio e Reajuste Salarial 2026 | Cálculo Retroativo CLT',
  description:
    'Calcule o reajuste salarial por dissídio coletivo ou Convenção Coletiva (CCT). Simule as diferenças salariais retroativas com reflexos em férias (+1/3), 13º salário e depósito de FGTS.',
  keywords: [
    'calculadora dissidio salarial 2026',
    'calculo reajuste cct clt',
    'salario retroativo dissidio data base',
    'reflexo dissidio ferias decimo terceiro',
    'art 9 lei 7238 84 trinta dias data base',
    'sistema mediador mte convencao coletiva'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculadora-dissidio-salarial',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculadora-dissidio-salarial',
      'pt': 'https://kagazo.in/br/calculadora-dissidio-salarial',
      'x-default': 'https://kagazo.in/br/calculadora-dissidio-salarial',
    },
  },
  openGraph: {
    title: 'Calculadora de Dissídio e Reajuste Salarial 2026 | CLT Oficial',
    description:
      'Simule o valor do novo salário reajustado e calcule todas as diferenças retroativas acumuladas desde a data-base da sua categoria.',
    url: 'https://kagazo.in/br/calculadora-dissidio-salarial',
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
      'name': 'Calculadora de Dissídio Salarial 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador trabalhista de reajuste salarial por Convenção Coletiva ou Acordo Coletivo de Trabalho com apuração de retroativos e reflexos.',
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
          'name': 'Dissídio Salarial',
          'item': 'https://kagazo.in/br/calculadora-dissidio-salarial',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'O que é a data-base de uma categoria profissional?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A data-base é o primeiro dia do mês em que expira a vigência da Convenção Coletiva anterior e no qual os sindicatos de trabalhadores e patronais renegociam os pisos salariais, cláusulas econômicas e sociais. Mesmo que a negociação demore meses para terminar, o reajuste negociado retroage financeiramente ao dia da data-base.',
          },
        },
        {
          '@type': 'Question',
          'name': 'A empresa é obrigada a pagar os meses retroativos com reflexos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Sim. Quando a CCT é homologada com atraso perante o Ministério do Trabalho e Emprego (MTE), o empregador deve calcular a diferença de cada salário pago a menor desde a data-base, acrescida dos reflexos proporcionais em férias gozadas ou vencidas, 13º salário e complemento de 8% do FGTS.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que prevê o Artigo 9º da Lei nº 7.238/1984 sobre demissão prévia?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O empregado dispensado sem justa causa nos 30 (trinta) dias que antecedem a data-base de sua categoria profissional tem direito a uma indenização compensatória especial equivalente a um salário mensal integral, visando coibir demissões oportunistas para burlar o reajuste.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Qual a diferença entre Dissídio Coletivo e Convenção Coletiva?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Convenção Coletiva de Trabalho (CCT) é o acordo negociado diretamente entre os sindicatos patronal e de empregados. Dissídio Coletivo é a ação judicial instaurada perante o Tribunal Regional do Trabalho (TRT) ou Tribunal Superior do Trabalho (TST) quando as partes não chegam a um acordo direto e solicitam que a Justiça do Trabalho fixe as normas por sentença normativa.',
          },
        },
      ],
    },
  ],
};

export default function CalculadoraDissidioSalarialPage() {
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
            <span className="text-slate-200">Dissídio Salarial</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              Direito Coletivo do Trabalho • CLT Art. 611 & Lei 7.238/1984
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de Dissídio e Reajuste Salarial 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Simule o novo salário com reajuste de inflação (INPC/IPCA) e aumento real. Calcule com precisão as diferenças salariais retroativas acumuladas e reflexos em férias, 13º e FGTS.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra Jurídica do Dissídio Retroativo:</p>
              <p>
                Os reajustes homologados em Convenção Coletiva retroagem sempre à data-base da categoria. O empregador deve pagar todas as diferenças de salários acumuladas nos meses de atraso da negociação, acompanhadas de reflexos em férias (+1/3), 13º salário e depósito complementar de 8% no FGTS.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CalculadoraDissidioSalarialClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Manual Legal das Negociações Coletivas e Reajustes Salariais na CLT
            </h2>

            <p>
              O direito à recomposição periódica do valor de compra dos salários é assegurado pela Constituição Federal de 1988 (Art. 7º, IV) e concretizado através das negociações coletivas reguladas pelos <strong>Artigos 611 a 625 da Consolidação das Leis do Trabalho (CLT)</strong>.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. A Data-Base e o Sistema Mediador do MTE</h3>
            <p>
              A <strong>data-base</strong> é a baliza temporal fixada em lei ou estatuto sindical para o início da vigência do novo instrumento coletivo (por exemplo, 1º de maio para metalúrgicos ou 1º de setembro para bancários).
            </p>
            <p>
              Com a extinção da ultratividade das normas coletivas pela Reforma Trabalhista (Art. 614, § 3º da CLT - Lei nº 13.467/2017), as cláusulas anteriores deixam de valer automaticamente no término da vigência se não houver renovação. No entanto, quando as partes finalmente celebram o novo instrumento e o depositam no <strong>Sistema Mediador do Ministério do Trabalho e Emprego (MTE)</strong>, o percentual de reajuste econômico pactuado produz <strong>efeitos jurídicos e patrimoniais retroativos</strong> ao primeiro dia da data-base.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">2. Composição do Reajuste: Inflação (INPC) + Ganho Real</h3>
            <p>
              Nas mesas de negociação salarial, o índice de aumento total é tradicionalmente composto por dois componentes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Recomposição Inflacionária (INPC/IBGE):</strong> Índice Nacional de Preços ao Consumidor acumulado nos 12 meses anteriores à data-base, que mede a perda de poder de compra de famílias que ganham até 5 salários mínimos;
              </li>
              <li>
                <strong>Aumento Real (Ganho de Produtividade):</strong> Percentual excedente conquistado pelos sindicatos que representa avanço real de poder aquisitivo acima da inflação oficial do período.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">3. Apuração das Diferenças Salariais e Reflexos Legais</h3>
            <p>
              A empresa que pagar os salários no valor antigo durante o período em que a negociação esteve pendente deve liquidar o passivo retroativo na primeira folha de pagamento seguinte ao registro da CCT:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Verba Trabalhista</th>
                    <th className="p-2">Impacto do Dissídio Retroativo</th>
                    <th className="p-2">Forma de Quitação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-white">Diferença de Salário Mensal</td>
                    <td className="p-2">Aumento mensal multiplicado pelo número de meses decorridos entre a data-base e a publicação</td>
                    <td className="p-2 text-emerald-400 font-semibold">Folha de pagamento complementar</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Férias Gozadas no Período</td>
                    <td className="p-2">Repercussão da diferença sobre os dias de férias acrescidos de 1/3 constitucional</td>
                    <td className="p-2 text-emerald-400 font-semibold">Crédito complementar</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">13º Salário (1ª ou 2ª parcela)</td>
                    <td className="p-2">Recálculo da gratificação com base no novo salário majorado de dezembro</td>
                    <td className="p-2 text-emerald-400 font-semibold">Complemento de 13º</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Depósito de FGTS (8%)</td>
                    <td className="p-2">Recolhimento obrigatório de 8% sobre a totalidade das diferenças salariais pagas</td>
                    <td className="p-2 text-cyan-400 font-mono">Guia GFIP / FGTS Digital</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">4. A Indenização Pré-Data-Base (Art. 9º da Lei nº 7.238/1984)</h3>
            <p>
              A legislação trabalhista pune com rigor a dispensa imotivada às vésperas do dissídio:
            </p>
            <blockquote className="my-3 pl-4 border-l-4 border-emerald-500 italic text-slate-300 bg-slate-900/60 p-3 rounded-r-lg">
              "O empregado dispensado, sem justa causa, no período de 30 (trinta) dias que antecede a data de sua correção salarial, terá direito à indenização adicional equivalente a um salário mensal." (Art. 9º da Lei nº 7.238/1984 e Súmula 182 do TST).
            </blockquote>
            <p>
              Ressalta-se que o aviso prévio, mesmo quando indenizado, projeta-se no tempo para todos os efeitos legais (Súmula 314 do TST), devendo a data do término do aviso ser considerada para a contagem do prazo de 30 dias.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Dissídio Salarial
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Quem pediu demissão ou foi demitido durante a negociação tem direito ao retroativo?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. O empregado cujo vínculo se extinguiu após a data-base tem direito à complementação de todas as verbas rescisórias (saldo de salário, aviso prévio, 13º e férias proporcionais). A empresa deve emitir um Termo de Rescisão Complementar quitando essas diferenças.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>A empresa pode parcelar o pagamento dos salários retroativos?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  A regra geral é o pagamento em parcela única na folha subsequente. No entanto, se a própria Convenção Coletiva contiver cláusula expressa autorizando o parcelamento das diferenças retroativas (por exemplo, em 2 ou 3 vezes), o parcelamento torna-se juridicamente válido.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Adiantamentos salariais espontâneos podem ser compensados no dissídio?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Conforme a Súmula nº 118 do TST, aumentos salariais concedidos pelo empregador no curso do ano a título de antecipação espontânea de dissídio podem ser compensados no momento da aplicação do percentual da CCT, exceto aumentos decorrentes de promoção ou equiparação salarial.
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
