import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Receipt, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { RetencaoImpostosNotaFiscalClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Retenção de Impostos em Nota Fiscal 2026 | CSRF 4,65% e IRRF',
  description:
    'Calcule as retenções federais na fonte sobre notas fiscais de serviços (NFS-e): CSRF 4,65% (DARF 5952), IRRF 1,5% (DARF 1708), ISS e INSS 11%. Regras oficiais da Lei 10.833/03 e Simples Nacional.',
  keywords: [
    'retencao de impostos nota fiscal',
    'calculo csrf 4 65 darf 5952',
    'retencao irrf 1 5 darf 1708',
    'retencao pis cofins csll servicos',
    'dispensa retencao simples nacional art 32',
    'limite 10 reais retencao lei 13137'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/retencao-impostos-nota-fiscal',
    languages: {
      'pt-BR': 'https://kagazo.in/br/retencao-impostos-nota-fiscal',
      'pt': 'https://kagazo.in/br/retencao-impostos-nota-fiscal',
      'x-default': 'https://kagazo.in/br/retencao-impostos-nota-fiscal',
    },
  },
  openGraph: {
    title: 'Calculadora de Retenção de Impostos em Nota Fiscal (PJ) 2026',
    description:
      'Simule o valor líquido da nota fiscal de serviços e a apuração das guias DARF federais de PIS, COFINS, CSLL e IRRF a serem recolhidas pelo tomador.',
    url: 'https://kagazo.in/br/retencao-impostos-nota-fiscal',
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
      'name': 'Calculadora de Retenção de Impostos em Nota Fiscal 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador tributário corporativo das retenções na fonte de CSRF (4,65%), IRRF (1,5% ou 1,0%), ISS e INSS sobre prestação de serviços.',
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
          'name': 'Retenção de Impostos em Nota Fiscal',
          'item': 'https://kagazo.in/br/retencao-impostos-nota-fiscal',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Quem é o responsável por recolher os impostos retidos na nota fiscal?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A responsabilidade pelo recolhimento das retenções na fonte é atribuída por lei à empresa tomadora (cliente contratante do serviço). A tomadora desconta os valores do pagamento feito ao prestador e recolhe os tributos em seu próprio nome mediante emissão de DARF ou guia municipal.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Prestadores do Simples Nacional sofrem retenção de PIS, COFINS e CSLL?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. O Artigo 32 da Lei nº 10.833/2003 e a Instrução Normativa RFB nº 459/2004 dispensam expressamente as empresas optantes pelo Simples Nacional da retenção na fonte da CSRF (4,65%) e do IRRF, mantendo-se apenas eventual retenção de ISS ou INSS se houver previsão em lei.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que diz a regra dos R$ 10,00 da Lei nº 13.137/2015?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A Lei nº 13.137/2015 revogou a antiga franquia de pagamentos de até R$ 5.000 no mês. Desde então, a retenção da CSRF (4,65%) deve ser realizada em qualquer nota fiscal, salvo se o valor do imposto calculado resultar em quantia igual ou inferior a R$ 10,00.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Qual o código DARF e a data de vencimento da retenção de CSRF?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A retenção conjunta da CSRF é recolhida sob o código DARF 5952. O prazo legal de vencimento é o último dia útil do segundo decêndio do mês subsequente àquele em que tiver ocorrido o pagamento à pessoa jurídica prestadora.',
          },
        },
      ],
    },
  ],
};

export default function RetencaoImpostosNotaFiscalPage() {
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
            <span className="text-slate-200">Retenção de Impostos em Nota Fiscal</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Receipt className="w-3.5 h-3.5" />
              Tributação Corporativa • Lei 10.833/2003 (CSRF 4,65%) & RIR/2018
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de Retenção de Impostos em Nota Fiscal (PJ) 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Calcule com precisão as retenções federais na fonte (CSRF 4,65%, IRRF 1,5%), ISSQN municipal e INSS 11% sobre prestação de serviços entre pessoas jurídicas.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra Legal de Retenções B2B:</p>
              <p>
                Em serviços profissionais prestados entre Pessoas Jurídicas (Lucro Presumido ou Real), o tomador retém 4,65% de CSRF (DARF 5952) e 1,5% de IRRF (DARF 1708), abatendo esses valores do pagamento do prestador. Prestadores do Simples Nacional são isentos de retenção federal (Art. 32 da Lei 10.833/03). Valores de imposto iguais ou inferiores a R$ 10,00 são dispensados.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <RetencaoImpostosNotaFiscalClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Manual Completo de Retenções Tributárias Federais e Municipais
            </h2>

            <p>
              O sistema tributário brasileiro atribui às empresas adquirentes de serviços de terceiros a condição de responsáveis tributárias por substituição na fonte pagadora. Em vez de permitir que o prestador receba o valor total faturado e depois recolha os tributos, o tomador do serviço é investido na obrigação imperativa de reter os tributos federais e municipais incidentes e recolhê-los diretamente aos cofres públicos.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. A Contribuição Social Retida na Fonte (CSRF 4,65%)</h3>
            <p>
              A <strong>Lei Federal nº 10.833, de 29 de dezembro de 2003 (Artigos 30 a 36)</strong> instituiu a retenção unificada das contribuições sociais na prestação de serviços profissionais entre pessoas jurídicas:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>PIS (Programa de Integração Social):</strong> Alíquota retida de <strong>0,65%</strong>;</li>
              <li><strong>COFINS (Contribuição para o Financiamento da Seguridade Social):</strong> Alíquota retida de <strong>3,00%</strong>;</li>
              <li><strong>CSLL (Contribuição Social sobre o Lucro Líquido):</strong> Alíquota retida de <strong>1,00%</strong>;</li>
              <li><strong>Alíquota Agregada CSRF:</strong> Totaliza <strong>4,65%</strong>, recolhida pelo tomador via <strong>DARF sob o código de receita 5952</strong>.</li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">2. O Fim da Antiga Franquia de R$ 5.000 (Lei nº 13.137/2015)</h3>
            <p>
              Até o ano de 2015, a retenção da CSRF somente ocorria se a soma dos pagamentos efetuados pela empresa tomadora ao mesmo prestador dentro do mês calendário ultrapassasse o montante de R$ 5.000,00.
            </p>
            <p>
              A <strong>Lei nº 13.137/2015</strong> extinguiu expressamente essa regra da soma mensal. A partir de então, a retenção passou a ocorrer em cada nota fiscal individualmente, aplicando-se unicamente a regra geral de corte de pequeno valor: <em>é dispensada a retenção de valor igual ou inferior a R$ 10,00 (dez reais)</em>.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">3. Imposto de Renda Retido na Fonte (IRRF - Art. 714 e 716 RIR/2018)</h3>
            <p>
              O Decreto nº 9.580/2018 (Regulamento do Imposto de Renda) exige a retenção do imposto de renda da pessoa jurídica prestadora conforme a natureza do serviço contratado:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Natureza da Prestação de Serviço</th>
                    <th className="p-2">Alíquota IRRF</th>
                    <th className="p-2">Código DARF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2">Serviços Profissionais Regulamentados (TI, consultoria, advocacia, contabilidade, medicina, engenharia)</td>
                    <td className="p-2 font-semibold text-emerald-400">1,50%</td>
                    <td className="p-2 font-mono text-cyan-300">DARF 1708</td>
                  </tr>
                  <tr>
                    <td className="p-2">Serviços de Limpeza, Conservação, Zeladoria e Segurança Privada</td>
                    <td className="p-2 font-semibold text-amber-400">1,00%</td>
                    <td className="p-2 font-mono text-cyan-300">DARF 1708</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">4. A Imunidade de Retenção do Simples Nacional</h3>
            <p>
              O <strong>Artigo 32 da Lei nº 10.833/2003</strong> e a <strong>Instrução Normativa RFB nº 459/2004</strong> asseguram às Microempresas (ME) e Empresas de Pequeno Porte (EPP) optantes pelo Simples Nacional a imunidade das retenções federais na fonte de PIS, COFINS, CSLL e IRRF. A razão jurídica é evidente: os tributos das empresas do Simples são arrecadados de forma consolidada e pré-determinada no Documento de Arrecadação do Simples Nacional (DAS).
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Retenção em Nota Fiscal
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O prestador pode abater os valores retidos no seu próprio imposto mensal?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Os tributos federais retidos na fonte pela empresa tomadora (IRRF e CSRF) configuram antecipação tributária do prestador. No momento de apurar a sua própria DCTFWeb e ECF mensal ou trimestral (no regime de Lucro Presumido ou Real), o prestador abate integralmente cada centavo retido pelos seus clientes, reduzindo o imposto a recolher.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O que é a retenção de 11% do INSS para cessão de mão de obra?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  O Artigo 31 da Lei nº 8.212/1991 estipula que empresas contratantes de serviços executados mediante cessão de mão de obra ou empreitada (como vigilância, limpeza, construção civil e portaria) devem reter 11% sobre o valor bruto da nota fiscal a título de antecipação previdenciária e recolher via guia DAE/DCTFWeb em favor da Seguridade Social.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Qual o comprovante que o tomador deve entregar ao prestador?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  A fonte pagadora tomadora do serviço deve fornecer anualmente ao prestador o <strong>Comprovante de Retenção de Rendimentos e Tributos</strong> (ou disponibilizar os dados declarados na EFD-Reinf / DIRF), servindo como lastro contábil idôneo perante as fiscalizações da Receita Federal.
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
