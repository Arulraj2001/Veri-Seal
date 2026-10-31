import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculadoraSimplesNacionalClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora do Simples Nacional 2026 | Alíquota Efetiva e Fator R',
  description:
    'Calcule a alíquota efetiva do Simples Nacional e a guia DAS pelos Anexos I, II, III, IV e V. Simulação com RBT12 e enquadramento automático do Fator R (28%) conforme a LC 123/2006.',
  keywords: [
    'calculadora simples nacional 2026',
    'aliquota efetiva simples nacional',
    'calculo fator r anexo 3 e 5',
    'formula simples nacional rbt12',
    'tabela simples nacional anexos',
    'pgdas d calculo guia das'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculadora-simples-nacional',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculadora-simples-nacional',
      'pt': 'https://kagazo.in/br/calculadora-simples-nacional',
      'x-default': 'https://kagazo.in/br/calculadora-simples-nacional',
    },
  },
  openGraph: {
    title: 'Calculadora de Alíquota Efetiva do Simples Nacional 2026',
    description:
      'Descubra a alíquota real do DAS da sua empresa com a fórmula oficial da Lei Complementar nº 123/2006 e cálculo do Fator R.',
    url: 'https://kagazo.in/br/calculadora-simples-nacional',
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
      'name': 'Calculadora do Simples Nacional 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador tributário da alíquota efetiva e do Documento de Arrecadação do Simples Nacional (DAS) conforme a LC 123/06 e LC 155/16.',
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
          'name': 'Simples Nacional e Fator R',
          'item': 'https://kagazo.in/br/calculadora-simples-nacional',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Como funciona a fórmula da alíquota efetiva do Simples Nacional?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A Lei Complementar nº 155/2016 aboliu as alíquotas fixas e instituiu a fórmula progressiva: Alíquota Efetiva = [(RBT12 × Alíquota Nominal da Faixa) - Parcela a Deduzir] ÷ RBT12, onde RBT12 é a Receita Bruta Total acumulada nos 12 meses anteriores.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que é o Fator R e como ele reduz os impostos no Simples Nacional?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O Fator R é a divisão da folha de pagamento dos últimos 12 meses (incluindo pró-labore e encargos) pela receita bruta do mesmo período. Se o índice for igual ou superior a 28% (0,28), atividades sujeitas ao Anexo V (com alíquota inicial de 15,5%) migram automaticamente para o Anexo III (com alíquota inicial de apenas 6,0%), gerando grande economia tributária.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quais atividades podem se beneficiar da regra do Fator R?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Atividades intelectuais, científicas, técnicas e de tecnologia da informação — tais como desenvolvimento de software, consultoria, perícia, jornalismo, publicidade, engenharia, arquitetura, odontologia e medicina.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que acontece quando a empresa ultrapassa o sublimite de R$ 3,6 milhões?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O teto global do Simples Nacional é de R$ 4,8 milhões anuais. Todavia, se a empresa ultrapassar o sublimite estadual de R$ 3,6 milhões em receita acumulada, ela continua no Simples para os tributos federais (IRPJ, CSLL, PIS, COFINS e CPP), mas passa a recolher o ICMS ou ISS por fora do DAS, no regime normal estadual/municipal.',
          },
        },
      ],
    },
  ],
};

export default function CalculadoraSimplesNacionalPage() {
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
            <span className="text-slate-200">Simples Nacional e Fator R</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Layers className="w-3.5 h-3.5" />
              Tributação Empresarial • LC 123/2006 & LC 155/2016
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora do Simples Nacional 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Simule a alíquota efetiva progressiva do DAS para os Anexos I a V, apuração de RBT12 e enquadramento automático no Fator R (redução do Anexo V para o Anexo III).
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra de Ouro do Simples Nacional:</p>
              <p>
                A tributação não é uma taxa fixa por faixa, mas uma alíquota efetiva obtida pela fórmula legal: [(RBT12 × Alíquota Nominal) - Parcela a Deduzir] ÷ RBT12. Empresas de serviços intelectuais com folha de pagamento igual ou superior a 28% do faturamento (Fator R) são tributadas pelas alíquotas reduzidas do Anexo III (a partir de 6%).
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CalculadoraSimplesNacionalClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Manual Legal do Simples Nacional: Anexos, Alíquotas Efetivas e o Fator R
            </h2>

            <p>
              O <strong>Simples Nacional</strong> é o regime tributário simplificado e favorecido instituído pela <strong>Lei Complementar nº 123 de 14 de dezembro de 2006 (Estatuto Nacional da Microempresa e da Empresa de Pequeno Porte)</strong>. Ele unifica em uma única guia mensal (o DAS) oito tributos federais, estaduais e municipais: IRPJ, CSLL, PIS, COFINS, IPI, CPP (Previdência Patronal), ICMS e ISS.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. A Transição da LC 155/2016 e a Fórmula da Alíquota Efetiva</h3>
            <p>
              Historicamente, as empresas eram enquadradas em tabelas estáticas onde a ultrapassagem de um único centavo de faturamento gerava aumento imediato e retroativo de tributação sobre toda a receita. A <strong>Lei Complementar nº 155/2016</strong> remodelou a mecânica do regime, adotando a fórmula matemática de alíquota efetiva proporcional:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 font-mono text-xs sm:text-sm">
              Alíquota Efetiva = [(RBT12 &times; Alíquota Nominal da Faixa) &minus; Parcela a Deduzir] &divide; RBT12
            </div>
            <p>
              Dessa forma, a alíquota cresce de maneira estritamente linear e contínua conforme o faturamento anual avança entre as faixas, eliminando distorções de planejamento tributário.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">2. Estrutura dos 5 Anexos da Lei Complementar nº 123/2006</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Anexo</th>
                    <th className="p-2">Segmento Econômico</th>
                    <th className="p-2">Alíquota Inicial</th>
                    <th className="p-2">Alíquota Máxima</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-emerald-400">Anexo I</td>
                    <td className="p-2">Comércio em geral (varejo, atacado, e-commerce)</td>
                    <td className="p-2 font-mono text-white">4,00%</td>
                    <td className="p-2 font-mono text-slate-300">19,00%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-emerald-400">Anexo II</td>
                    <td className="p-2">Indústria e transformação de bens</td>
                    <td className="p-2 font-mono text-white">4,50%</td>
                    <td className="p-2 font-mono text-slate-300">30,00%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-emerald-400">Anexo III</td>
                    <td className="p-2">Serviços gerais, manutenção, agências, instalações e serviços do Fator R</td>
                    <td className="p-2 font-mono text-white">6,00%</td>
                    <td className="p-2 font-mono text-slate-300">33,00%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-emerald-400">Anexo IV</td>
                    <td className="p-2">Construção civil, advocacia, vigilância e conservação (CPP recolhida à parte)</td>
                    <td className="p-2 font-mono text-white">4,50%</td>
                    <td className="p-2 font-mono text-slate-300">33,00%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-emerald-400">Anexo V</td>
                    <td className="p-2">Tecnologia da informação, consultoria, engenharia, medicina (sem atingir Fator R)</td>
                    <td className="p-2 font-mono text-white">15,50%</td>
                    <td className="p-2 font-mono text-slate-300">30,50%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">3. A Regra do Fator R (Art. 18, § 5º-M da LC 123/2006)</h3>
            <p>
              O Fator R representa um estímulo legal à geração de empregos formais e à distribuição de remuneração aos sócios:
            </p>
            <blockquote className="my-3 pl-4 border-l-4 border-emerald-500 italic text-slate-300 bg-slate-900/60 p-3 rounded-r-lg">
              Fator R = Total da Folha de Salários dos últimos 12 meses (FS12) &divide; Receita Bruta dos últimos 12 meses (RBT12)
            </blockquote>
            <p>
              Se a razão for <strong>igual ou superior a 0,28 (28%)</strong>, a atividade intelectual originalmente sujeita à pesada tributação do Anexo V (alíquota inicial de 15,5%) passa a ser tributada no <strong>Anexo III (alíquota inicial de apenas 6,0%)</strong>.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">4. Sublimites Estaduais de ICMS e ISS</h3>
            <p>
              Embora o limite global do Simples Nacional seja de <strong>R$ 4.800.000,00 anuais</strong>, os estados e o Distrito Federal aplicam um <strong>sublimite de R$ 3.600.000,00</strong> para efeito de recolhimento do ICMS e do ISS. Se a empresa faturar acima desse valor acumulado nos 12 meses, a arrecadação do tributo estadual e municipal deixa de integrar o DAS e passa a ser apurada nas guias normais da Fazenda Estadual ou Prefeitura.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre o Simples Nacional
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O pró-labore dos sócios entra na conta do Fator R?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. O valor bruto do pró-labore retirado pelos sócios, somado à contribuição previdenciária patronal recolhida sobre ele, integra formalmente a base da folha de salários dos últimos 12 meses (FS12), sendo uma das formas mais eficientes utilizadas por empresas de tecnologia e consultoria unipessoais para atingir a marca de 28% e permanecer no Anexo III.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Qual o prazo para pagamento mensal da guia DAS?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  O Documento de Arrecadação do Simples Nacional (DAS) vence impreterivelmente no dia 20 do mês subsequente ao mês em que houver sido auferida a receita bruta faturada. Caso o dia 20 recaia em final de semana ou feriado bancário, o vencimento é prorrogado para o primeiro dia útil seguinte.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Por que o Anexo IV não tem a Contribuição Previdenciária Patronal no DAS?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Por expressa previsão do Artigo 18, § 5º-C da LC 123/2006, as empresas do Anexo IV (construção civil, limpeza, vigilância e advocacia) não têm a cota patronal de 20% do INSS embutida na guia unificada do DAS. A contribuição previdenciária patronal deve ser recolhida de forma convencional na folha de pagamento via DCTFWeb/eSocial.
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
