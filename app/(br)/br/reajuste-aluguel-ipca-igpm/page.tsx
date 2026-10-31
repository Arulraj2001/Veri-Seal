import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { ReajusteAluguelClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Reajuste de Aluguel 2026 | IPCA, IGP-M e IVAR',
  description:
    'Calcule a correção anual do aluguel residencial ou comercial pelos índices IPCA (IBGE), IGP-M (FGV) ou IVAR. Regra de deflação pelo STJ e gerador de comunicado formal ao inquilino.',
  keywords: [
    'calculadora reajuste aluguel 2026',
    'reajuste de aluguel ipca',
    'reajuste de aluguel igpm fgv',
    'calculo reajuste lei do inquilinato',
    'indice ivar aluguel residencial',
    'comunicado reajuste aluguel modelo',
    'deflacao reajuste aluguel stj'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/reajuste-aluguel-ipca-igpm',
    languages: {
      'pt-BR': 'https://kagazo.in/br/reajuste-aluguel-ipca-igpm',
      'pt': 'https://kagazo.in/br/reajuste-aluguel-ipca-igpm',
      'x-default': 'https://kagazo.in/br/reajuste-aluguel-ipca-igpm',
    },
  },
  openGraph: {
    title: 'Calculadora de Reajuste de Aluguel 2026 | Simulador IPCA e IGP-M',
    description:
      'Atualize o valor locatício anual de acordo com a Lei nº 8.245/91 e o Plano Real. Gere automaticamente o comunicado formal de notificação ao inquilino.',
    url: 'https://kagazo.in/br/reajuste-aluguel-ipca-igpm',
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
      'name': 'Calculadora de Reajuste de Aluguel 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador oficial de atualização monetária de aluguéis residenciais e comerciais nos termos da Lei do Inquilinato (Lei nº 8.245/91).',
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
          'name': 'Reajuste de Aluguel',
          'item': 'https://kagazo.in/br/reajuste-aluguel-ipca-igpm',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Qual o índice oficial de reajuste de aluguel no Brasil?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A Lei nº 8.245/1991 (Lei do Inquilinato) não fixa um índice único obrigatório, apenas proíbe a vinculação ao salário mínimo ou a moedas estrangeiras. Historicamente, utilizava-se o IGP-M (FGV), mas a maioria dos contratos modernos migrou para o IPCA (IBGE) ou o IVAR (FGV) devido à maior estabilidade.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que acontece quando o índice de reajuste dá negativo (deflação)?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Conforme a jurisprudência dominante do Superior Tribunal de Justiça (STJ), a finalidade da correção monetária é preservar o valor real do contrato. Salvo cláusula expressa em contrário prevendo redução no caso de deflação, o valor do aluguel é mantido congelado (aplicação do reajuste zero).',
          },
        },
        {
          '@type': 'Question',
          'name': 'O proprietário pode reajustar o aluguel antes de completar 12 meses?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. O Artigo 28 da Lei Federal nº 9.069/1995 (Plano Real) estabelece a nulidade de pleno direito de cláusulas de periodicidade de reajuste inferior a um ano (12 meses) para locações imobiliárias.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quando cabe a Ação Revisional de Aluguel?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Após 3 anos de vigência ininterrupta do contrato ou do último acordo sobre o valor do aluguel, tanto o locador quanto o locatário podem propor a Ação Revisional judicial (Art. 19 da Lei nº 8.245/91) para ajustar o valor ao patamar de mercado.',
          },
        },
      ],
    },
  ],
};

export default function ReajusteAluguelPage() {
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
            <span className="text-slate-200">Reajuste de Aluguel</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              Direito Imobiliário • Lei do Inquilinato nº 8.245/91 & Lei 9.069/95
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de Reajuste de Aluguel 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Atualize o valor mensal da locação residencial ou comercial pelo acumulado de 12 meses do IPCA, IGP-M ou IVAR, aplique a regra jurídica de deflação e gere a notificação formal ao inquilino.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra Jurídica do Reajuste de Aluguel:</p>
              <p>
                O reajuste é estritamente anual (prazo mínimo de 12 meses, conforme Lei 9.069/95). Em caso de deflação (índice negativo), a jurisprudência do STJ determina a manutenção do valor atual (reajuste zero), salvo se houver cláusula expressa no contrato estipulando desconto nominal.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <ReajusteAluguelClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Manual Legal da Atualização Locatícia: Índices, Periodicidade e Jurisprudência
            </h2>

            <p>
              A atualização monetária dos contratos de locação predial urbana no Brasil é disciplinada pela <strong>Lei Federal nº 8.245, de 18 de outubro de 1991</strong> (conhecida como a Lei do Inquilinato), em consonância obrigatória com as regras de ordem pública da estabilização monetária nacional (<strong>Art. 28 da Lei nº 9.069/1995 - Plano Real</strong>).
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. A Periodicidade Anual Imperativa</h3>
            <p>
              O ordenamento jurídico brasileiro proíbe qualquer cláusula que estabeleça reajuste em periodicidade inferior a <strong>12 meses (um ano)</strong>. Conforme o Artigo 28 da Lei 9.069/95, estipulações contratuais que fixem reajustes semestrais ou trimestrais são <em>nulas de pleno direito</em>, ensejando a repetição de indébito de valores cobrados indevidamente.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">2. Confronto dos Principais Índices: IPCA, IGP-M e IVAR</h3>
            <p>
              A Lei do Inquilinato confere liberdade às partes para pactuar o indexador de atualização, impondo apenas duas vedações estritas: não se admite vincular o aluguel à variação do salário mínimo nem a moedas estrangeiras (dólar, euro).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Índice</th>
                    <th className="p-2">Órgão Emissor</th>
                    <th className="p-2">Características Principais</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-emerald-400">IPCA</td>
                    <td className="p-2">IBGE</td>
                    <td className="p-2">Índice oficial de inflação do Brasil. Mede o custo de vida de famílias de 1 a 40 salários mínimos. É o indexador mais equilibrado e recomendado por tribunais e órgãos de defesa do consumidor.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-amber-400">IGP-M</td>
                    <td className="p-2">FGV</td>
                    <td className="p-2">Historicamente tradicional. Composto por 60% de preços no atacado (IPA), o que o torna altamente suscetível ao câmbio do dólar e commodities mundiais, gerando descolamento do poder de compra local.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-cyan-400">IVAR</td>
                    <td className="p-2">FGV</td>
                    <td className="p-2">Índice especializado criado em 2022. Mede exclusivamente a evolução dos aluguéis residenciais reais contratados em capitais do país, refletindo a dinâmica real da oferta imobiliária.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">3. Tratamento da Deflação: Jurisprudência Consolidada do STJ</h3>
            <p>
              Quando a economia vivencia períodos de retração de preços e o acumulado de 12 meses resulta em percentual negativo, surge a dúvida: o aluguel deve diminuir?
            </p>
            <p>
              O <strong>Superior Tribunal de Justiça (STJ)</strong> assentou o princípio de que a finalidade da cláusula de atualização monetária é recompor o valor intrínseco da moeda, preservando o equilíbrio econômico-financeiro da relação locatícia.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Regra Geral (Piso Zero):</strong> Se o contrato nada dispuser sobre deflação, o valor contratual não sofre redução nominal, aplicando-se reajuste zero (o boleto permanece no mesmo valor do ano anterior).
              </li>
              <li>
                <strong>Exceção Contratual:</strong> O decréscimo nominal do valor locatício somente é admitido quando o contrato estipular expressamente a aplicação de variações negativas.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">4. Ação Revisional Judicial (Art. 19 da Lei nº 8.245/91)</h3>
            <p>
              Reajuste anual e <em>revisão de aluguel</em> são institutos jurídicos distintos:
            </p>
            <p>
              O reajuste preserva o valor monetário ao longo do tempo. Já a <strong>Ação Revisional</strong> pode ser ajuizada por qualquer das partes após 3 (três) anos de contrato ininterrupto, visando readequar o valor do aluguel caso ele tenha se descolado severamente do valor real de mercado praticado na região (por exemplo, valorização intensa do bairro decorrente de nova estação de metrô ou desvalorização por deterioração urbana).
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Reajuste de Aluguel
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>É necessário notificar o inquilino antes de cobrar o valor reajustado?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Embora o reajuste seja automático por força de contrato após 12 meses, as regras de boa-fé objetiva (Art. 422 do Código Civil) recomendam o envio de comunicação prévia com a memória de cálculo e indicação da fonte oficial do índice, concedendo tempo hábil para que o inquilino organize seu orçamento mensal.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>IPTU e taxa de condomínio também são reajustados pelo índice do aluguel?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Não. O índice pactuado no contrato (seja IPCA ou IGP-M) incide unicamente sobre o valor do aluguel líquido. As cotas condominiais e o IPTU seguem suas próprias apurações legais: a taxa de condomínio varia de acordo com a previsão orçamentária aprovada em assembleia geral de condôminos, e o IPTU segue o decreto anual da prefeitura municipal.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O locador e o inquilino podem combinar um índice diferente do que está no contrato?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Pelo princípio da autonomia da vontade, havendo anuência bilateral, as partes podem firmar termo aditivo ao contrato de locação substituindo o indexador (por exemplo, migrando do IGP-M para o IPCA) ou acordando um percentual fixo de concessão mútua.
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
