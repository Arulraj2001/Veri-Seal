import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculadoraPrazosCpcClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Prazos Processuais CPC 2026 | Contagem em Dias Úteis',
  description:
    'Calcule prazos processuais em dias úteis pelo Novo CPC (Lei nº 13.105/15). Aplicação das regras de disponibilização e publicação no DJe (Art. 224), recesso forense (Art. 220) e prazos em dobro.',
  keywords: [
    'calculadora de prazos processuais cpc',
    'contagem prazo dias uteis novo cpc',
    'art 224 cpc disponibilizacao publicacao dje',
    'recesso forense 20 de dezembro 20 de janeiro',
    'prazo contestacao apelacao 15 dias uteis',
    'prazo em dobro fazenda publica art 183'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculadora-prazos-processuais-cpc',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculadora-prazos-processuais-cpc',
      'pt': 'https://kagazo.in/br/calculadora-prazos-processuais-cpc',
      'x-default': 'https://kagazo.in/br/calculadora-prazos-processuais-cpc',
    },
  },
  openGraph: {
    title: 'Calculadora de Prazos Processuais Novo CPC 2015 em Dias Úteis',
    description:
      'Descubra a data fatal exata (termo ad quem) de petições, recursos e contestações conforme o CPC/2015, com exclusão do primeiro dia e suspensão no recesso.',
    url: 'https://kagazo.in/br/calculadora-prazos-processuais-cpc',
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
      'name': 'Calculadora de Prazos Processuais CPC 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'LegalApplication',
      'description': 'Simulador jurídico de contagem de prazos processuais em dias úteis segundo os artigos 219, 220 e 224 da Lei nº 13.105/2015 (CPC).',
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
          'name': 'Prazos Processuais CPC',
          'item': 'https://kagazo.in/br/calculadora-prazos-processuais-cpc',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Como funciona a regra dos 3 dias (Disponibilização, Publicação e Início)?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Pelo Artigo 224 do CPC e Lei nº 11.419/2006: 1) Data da Disponibilização é o dia em que o despacho/acórdão aparece no Diário Eletrônico; 2) Data da Publicação é o primeiro dia útil seguinte ao da disponibilização; 3) Início da Contagem (dies a quo) é o primeiro dia útil posterior à data considerada da publicação.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que é o recesso forense do Artigo 220 do CPC?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O Artigo 220 do CPC suspende o curso de todos os prazos processuais civis, audiências e sessões de julgamento entre os dias 20 de dezembro e 20 de janeiro (inclusive). Os prazos não recomeçam do zero: eles ficam congelados e voltam a correr de onde pararam no dia 21 de janeiro (se for dia útil).',
          },
        },
        {
          '@type': 'Question',
          'name': 'Como comprovar feriado local para não perder o prazo do recurso?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Conforme o Artigo 1.003, § 6º do CPC e jurisprudência vinculante da Corte Especial do STJ, a ocorrência de feriado local ou suspensão de expediente forense no tribunal de origem deve ser comprovada obrigatoriamente pelo recorrente no ato de interposição do recurso, mediante juntada de cópia da lei municipal ou portaria do tribunal.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quem tem direito a prazo em dobro no Código de Processo Civil?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Têm direito a prazo em dobro para todas as manifestações processuais: a Fazenda Pública (União, Estados, Municípios e autarquias - Art. 183), a Defensoria Pública (Art. 186), o Ministério Público (Art. 180) e litisconsortes com advogados diferentes de escritórios distintos quando os autos forem físicos (Art. 229).',
          },
        },
      ],
    },
  ],
};

export default function CalculadoraPrazosCpcPage() {
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
            <span className="text-slate-200">Prazos Processuais CPC</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Scale className="w-3.5 h-3.5" />
              Direito Processual Civil • Lei nº 13.105/2015 Art. 219, 220 e 224
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de Prazos Processuais CPC 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Contagem de prazos em dias úteis com exclusão do dia de início, regras do DJe (disponibilização vs publicação), recesso de fim de ano (20/dez a 20/jan) e prazos em dobro.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra de Contagem de Prazos no CPC/2015:</p>
              <p>
                Os prazos processuais civis contam-se exclusivamente em dias úteis (Art. 219). Publicado no DJe, o primeiro dia útil seguinte é a data considerada da publicação, e a contagem se inicia no dia útil subsequente. O recesso forense (20/dez a 20/jan) suspende todos os prazos em curso (Art. 220).
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CalculadoraPrazosCpcClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Manual Legal da Contagem de Prazos Processuais no Brasil
            </h2>

            <p>
              A publicação da <strong>Lei Federal nº 13.105, de 16 de março de 2015 (Código de Processo Civil)</strong> consagrou uma transformação histórica na rotina da advocacia nacional ao adotar a regra geral de contagem de prazos processuais estritamente em <strong>dias úteis (Artigo 219)</strong>, superando o antigo regime de dias corridos do CPC/1973.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. A Dinâmica da Intimação pelo DJe: Três Dias Distintos</h3>
            <p>
              Nas comunicações de atos processuais praticadas por meio do Diário da Justiça Eletrônico (DJe), o advogado deve observar a sequência cronológica imposta pelo <strong>Artigo 224 do CPC</strong> e pelo <strong>Artigo 4º da Lei nº 11.419/2006</strong>:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>Data da Disponibilização:</strong> É a data em que a edição do Diário Eletrônico é veiculada na internet. Essa data não conta para nenhum efeito de prazo;
              </li>
              <li>
                <strong>Data da Publicação Oficial (Art. 224, § 2º):</strong> Considera-se como data da publicação o primeiro dia útil seguinte ao da disponibilização da informação;
              </li>
              <li>
                <strong>Início da Contagem do Prazo (Art. 224, § 3º):</strong> A contagem do prazo processual (dies a quo) terá início no primeiro dia útil que seguir ao dia considerado como o da publicação.
              </li>
            </ol>

            <h3 className="text-lg font-semibold text-emerald-400">2. Suspensão dos Prazos no Recesso Forense (Art. 220 do CPC)</h3>
            <p>
              O Artigo 220 do CPC estipulou o recesso forense obrigatório:
            </p>
            <blockquote className="my-3 pl-4 border-l-4 border-emerald-500 italic text-slate-300 bg-slate-900/60 p-3 rounded-r-lg">
              "Art. 220. Suspende-se o curso do prazo processual nos dias compreendidos entre 20 de dezembro e 20 de janeiro, inclusive."
            </blockquote>
            <p>
              Durante esse intervalo de 32 dias corridos, não se realizam audiências nem sessões de julgamento nos tribunais. Tratando-se de <em>suspensão</em> (e não de interrupção), o prazo que estava correndo em dezembro para de ser contado e retoma a sua marcha no primeiro dia útil após 20 de janeiro exatamente do ponto onde parou.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">3. Prerrogativas de Prazo em Dobro</h3>
            <p>
              O CPC confere o benefício do prazo em dobro para manifestação processual a determinados entes públicos e situações processuais:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Beneficiário</th>
                    <th className="p-2">Artigo do CPC</th>
                    <th className="p-2">Regra Aplicável</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-white">Fazenda Pública (União, Estados, Municípios)</td>
                    <td className="p-2">Artigo 183</td>
                    <td className="p-2 text-emerald-400 font-semibold">Prazo em dobro para todas as manifestações</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Defensoria Pública</td>
                    <td className="p-2">Artigo 186</td>
                    <td className="p-2 text-emerald-400 font-semibold">Prazo em dobro para todas as manifestações</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Ministério Público</td>
                    <td className="p-2">Artigo 180</td>
                    <td className="p-2 text-emerald-400 font-semibold">Prazo em dobro para interpor recursos e petições</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Litisconsortes com Procuradores Diferentes</td>
                    <td className="p-2">Artigo 229</td>
                    <td className="p-2 text-amber-400 font-semibold">Prazo em dobro somente se os autos forem em papel físico</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">4. Comprovação de Feriado Local (Art. 1.003, § 6º do CPC)</h3>
            <p>
              O STJ pacificou no Tema Repetitivo e em súmulas que feriados estaduais, municipais (como aniversários de cidades ou padroeiros) e fechamento antecipado de expediente forense <strong>não são presumidos pelo tribunal superior</strong>. O advogado deve juntar a certidão da portaria local no momento exato do protocolo do recurso sob pena de deserção ou intempestividade insanável.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Prazos Processuais
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Prazos no Juizado Especial Cível (JEC) também são contados em dias úteis?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. A Lei Federal nº 13.728/2018 inseriu o Artigo 12-A na Lei nº 9.099/1995 (Lei dos Juizados Especiais), estabelecendo expressamente que na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Prazos na Justiça do Trabalho (CLT) seguem a regra de dias úteis?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Com a entrada em vigor da Reforma Trabalhista (Lei nº 13.467/2017), o Artigo 775 da CLT passou a prever expressamente que os prazos processuais na Justiça do Trabalho são contados exclusivamente em dias úteis, com exclusão do dia do começo e inclusão do dia do vencimento.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Se o prazo terminar em feriado ou fim de semana, quando ele vence?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Conforme o Artigo 224, § 1º do CPC, se o dia do vencimento cair em sábado, domingo, feriado ou dia em que o expediente forense for encerrado antes ou iniciado depois da hora normal, o prazo considera-se prorrogado automaticamente até o primeiro dia útil subsequente.
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
