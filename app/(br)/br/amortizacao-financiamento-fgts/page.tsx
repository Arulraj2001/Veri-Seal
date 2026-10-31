import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Banknote, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { AmortizacaoFinanciamentoFgtsClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Simulador de Amortização com FGTS 2026 | Reduzir Prazo vs Parcela',
  description:
    'Simule a amortização do financiamento imobiliário com FGTS ou recursos próprios (SAC e Price). Compare a redução de prazo (máxima economia de juros) versus redução da parcela mensal.',
  keywords: [
    'simulador amortizacao fgts 2026',
    'amortizar financiamento habitacional caixa',
    'amortizar prazo ou parcela fgts',
    'regras uso fgts amortizacao sfh',
    'resolucao ccfgts 994 2021',
    'economia de juros amortizacao sac'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/amortizacao-financiamento-fgts',
    languages: {
      'pt-BR': 'https://kagazo.in/br/amortizacao-financiamento-fgts',
      'pt': 'https://kagazo.in/br/amortizacao-financiamento-fgts',
      'x-default': 'https://kagazo.in/br/amortizacao-financiamento-fgts',
    },
  },
  openGraph: {
    title: 'Simulador de Amortização de Financiamento Imobiliário com FGTS',
    description:
      'Descubra quantos anos e milhares de reais em juros você pode economizar ao abater o saldo devedor do imóvel com seu FGTS.',
    url: 'https://kagazo.in/br/amortizacao-financiamento-fgts',
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
      'name': 'Simulador de Amortização com FGTS 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'FinanceApplication',
      'description': 'Simulador de amortização extraordinária de financiamento habitacional pelo SFH com comparação de redução de prazo e de parcela.',
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
          'name': 'Amortização com FGTS',
          'item': 'https://kagazo.in/br/amortizacao-financiamento-fgts',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'O que vale mais a pena: amortizar reduzindo o prazo ou o valor da parcela?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Financeiramente, a redução de prazo é imensamente superior, pois expurga diretamente parcelas do final do contrato onde a incidência de juros compostos é máxima, gerando economia que chega a ser o dobro ou triplo da redução de parcela. Já a redução de parcela é recomendada apenas para famílias que precisam de alívio emergencial no fluxo de caixa mensal.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quais são as regras para usar o FGTS na amortização do financiamento?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O mutuário deve ter ao menos 3 anos de trabalho sob o regime do FGTS, o imóvel deve estar financiado pelo SFH com valor de avaliação de até R$ 1,5 milhão, o comprador não pode possuir outro imóvel residencial no mesmo município e deve ser respeitado o intervalo mínimo de 2 anos entre cada amortização de saldo devedor.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Posso usar o FGTS para quitar parcelas atrasadas do financiamento?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Sim. As regras do Conselho Curador do FGTS autorizam o uso do saldo para pagamento de até 3 (três) parcelas em atraso de contratos habitacionais do SFH, evitando a execução da garantia fiduciária e o leilão extrajudicial do imóvel.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quem financiou pelo SFI pode usar o saldo do FGTS para amortizar?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Desde a Resolução CCFGTS nº 994/2021, foi autorizada a utilização do FGTS para amortização ou liquidação de financiamentos contratados fora do SFH (no Sistema de Financiamento Imobiliário - SFI), desde que o imóvel e o mutuário atendam aos mesmos limites de valor de até R$ 1.500.000,00 e demais requisitos do SFH.',
          },
        },
      ],
    },
  ],
};

export default function AmortizacaoFgtsPage() {
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
            <span className="text-slate-200">Amortização com FGTS</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Banknote className="w-3.5 h-3.5" />
              Crédito Habitacional • Lei 8.036/1990 Art. 20 & Resolução CCFGTS 994/2021
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Simulador de Amortização de Financiamento com FGTS 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Compare o impacto financeiro de amortizar o saldo devedor com FGTS ou recursos próprios: elimine anos de juros compostos reduzindo o prazo ou reduza o valor da prestação mensal.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra Estratégica da Amortização Habitacional:</p>
              <p>
                A redução de prazo abate diretamente parcelas vincendas do final do financiamento, eliminando os juros compostos que incidiriam durante décadas. O FGTS pode ser utilizado a cada 2 anos para amortizar saldo devedor de imóveis de até R$ 1.500.000,00 no âmbito do SFH (Lei 8.036/90).
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <AmortizacaoFinanciamentoFgtsClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Manual Legal e Financeiro da Amortização Imobiliária com FGTS
            </h2>

            <p>
              O direito à utilização do saldo da conta vinculada do Fundo de Garantia do Tempo de Serviço (FGTS) para a amortização de financiamentos habitacionais é assegurado pelo <strong>Artigo 20, inciso VII da Lei Federal nº 8.036/1990</strong> e detalhado pelas instruções normativas do Conselho Curador do FGTS (CCFGTS). O mecanismo representa a forma mais poderosa à disposição do trabalhador brasileiro para se livrar do endividamento imobiliário de longo prazo e preservar seu patrimônio.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. As Três Modalidades de Uso do FGTS no Crédito Habitacional</h3>
            <p>
              O titular da conta vinculada pode utilizar seu saldo em três situações contratuais distintas:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Amortização Extraordinária do Saldo Devedor:</strong> Pagamento de quantia representativa do capital principal, recalculando-se o contrato para menos meses de vigência (redução de prazo) ou para mensalidade menor (redução de parcela);
              </li>
              <li>
                <strong>Liquidação Total Antecipada:</strong> Quitação de 100% do saldo remanescente, com cancelamento da alienação fiduciária e baixa da hipoteca no RGI;
              </li>
              <li>
                <strong>Abatimento de até 80% das Prestações:</strong> Uso do FGTS para custear até 80% do valor de 12 parcelas mensais sucessivas, aliviando o fluxo de caixa familiar durante um ano inteiro.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">2. Requisitos Legais do Mutuário e do Imóvel</h3>
            <p>
              O agente financeiro operador (Caixa, Itaú, Bradesco, Santander, etc.) exige o cumprimento rigoroso dos seguintes requisitos do SFH:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Critério Legal</th>
                    <th className="p-2">Regra Vigente</th>
                    <th className="p-2">Fundamento Legal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-white">Tempo de Contribuição ao FGTS</td>
                    <td className="p-2 font-semibold text-emerald-400">Mínimo de 3 anos</td>
                    <td className="p-2">Consecutivos ou não, na mesma ou em empresas distintas</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Intervalo entre Amortizações</td>
                    <td className="p-2 font-semibold text-amber-400">2 anos (24 meses)</td>
                    <td className="p-2">Para amortizar o saldo; para abater parcelas mensais, intervalo anual</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Teto de Avaliação do Imóvel</td>
                    <td className="p-2 font-semibold text-cyan-400">Até R$ 1.500.000,00</td>
                    <td className="p-2">Resolução CMN nº 4.676 e Resolução CCFGTS nº 994/2021</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Propriedade no Mesmo Município</td>
                    <td className="p-2 font-semibold text-rose-400">Vedado</td>
                    <td className="p-2">Não pode ser dono de outro imóvel residencial na mesma comarca ou região metropolitana</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">3. Por Que Reduzir Prazo Gera Muito Mais Economia que Reduzir Parcela?</h3>
            <p>
              Nos contratos imobiliários (tanto na Tabela SAC quanto na Tabela Price), os juros mensais são calculados multiplicando-se a taxa pactuada pelo saldo devedor remanescente.
            </p>
            <p>
              Quando o mutuário escolhe <strong>reduzir a prestação</strong>, o prazo é mantido em 300 ou 360 meses. O saldo cai, mas os juros continuarão sendo cobrados por mais 25 ou 30 anos.
            </p>
            <p>
              Por outro lado, ao escolher <strong>reduzir o prazo</strong>, a prestação mensal permanece semelhante e cada amortização elimina meses futuros do contrato. Como os juros do final do financiamento deixam de existir, o mutuário poupa dezenas ou centenas de milhares de reais em juros que jamais serão faturados pelo banco.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">4. Abertura para Financiamentos do SFI (Resolução CCFGTS 994/2021)</h3>
            <p>
              Desde agosto de 2021, os trabalhadores com imóveis adquiridos fora do SFH (enquadrados no Sistema de Financiamento Imobiliário - SFI) também conquistaram o direito de utilizar o saldo do FGTS para amortizar ou liquidar seus contratos, desde que o imóvel tenha sido avaliado em até R$ 1,5 milhão e o mutuário cumpra as exigências pessoais do fundo.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Amortização com FGTS
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Posso amortizar o financiamento com FGTS e dinheiro próprio ao mesmo tempo?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Você pode realizar uma amortização extraordinária mista: utilizar o saldo liberado da sua conta do FGTS e complementar com qualquer montante que possua guardado em conta corrente ou investimentos. Ambos abaterão o saldo devedor principal no mesmo ato.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O banco pode cobrar tarifa para fazer a amortização com dinheiro próprio?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Não. A Resolução nº 3.516/2007 do Conselho Monetário Nacional (CMN) proíbe expressamente a cobrança de qualquer tarifa ou taxa de liquidação antecipada ou amortização extraordinária de crédito com recursos próprios do cliente. No caso do FGTS, há apenas uma tarifa administrativa padronizada pelo agente operador do fundo.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Cônjuges podem somar seus saldos de FGTS para amortizar o mesmo imóvel?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Desde que ambos figurem como proponentes ou coobrigados no contrato de financiamento habitacional, os saldos das contas do FGTS de marido e mulher (ou companheiros em união estável) podem ser somados para amortizar ou quitar o imóvel familiar.
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
