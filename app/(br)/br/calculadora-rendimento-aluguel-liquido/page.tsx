import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculadoraRendimentoAluguelClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Rendimento Líquido de Aluguel 2026 | Cap Rate Real e Carnê-Leão',
  description:
    'Calcule a rentabilidade líquida real (Cap Rate líquido) de um imóvel alugado após taxa de imobiliária, imposto de renda Carnê-Leão (Art. 31 Lei 7.713/88), IPTU e vacância.',
  keywords: [
    'calculadora rendimento aluguel liquido',
    'cap rate real imovel alugado',
    'calculo carne leao aluguel 2026',
    'deducao taxa imobiliaria imposto de renda',
    'rentabilidade liquida locacao residencial',
    'art 31 lei 7713 88 aluguel'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculadora-rendimento-aluguel-liquido',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculadora-rendimento-aluguel-liquido',
      'pt': 'https://kagazo.in/br/calculadora-rendimento-aluguel-liquido',
      'x-default': 'https://kagazo.in/br/calculadora-rendimento-aluguel-liquido',
    },
  },
  openGraph: {
    title: 'Calculadora de Rendimento Líquido de Aluguel 2026 | Cap Rate Real',
    description:
      'Descubra quanto realmente sobra no seu bolso todo mês com seu imóvel alugado, deduzindo impostos federais e taxas administrativas.',
    url: 'https://kagazo.in/br/calculadora-rendimento-aluguel-liquido',
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
      'name': 'Calculadora de Rendimento Líquido de Aluguel 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'FinanceApplication',
      'description': 'Simulador financeiro e tributário de rentabilidade líquida de aluguéis residenciais e comerciais com abatimento de custos fiscais e operacionais.',
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
          'name': 'Rendimento Líquido de Aluguel',
          'item': 'https://kagazo.in/br/calculadora-rendimento-aluguel-liquido',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'A comissão paga à imobiliária pode ser deduzida do Imposto de Renda?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Sim. Conforme o Artigo 31 da Lei nº 7.713/1988 e a Instrução Normativa da Receita Federal, a comissão de administração ou intermediação paga à imobiliária ou ao corretor de imóveis pode ser deduzida integralmente do rendimento bruto da locação para efeito de cálculo do Carnê-Leão.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Qual é a diferença entre Cap Rate Bruto e Cap Rate Líquido?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O Cap Rate Bruto é a divisão direta da soma dos 12 aluguéis anuais pelo valor de mercado do imóvel. Já o Cap Rate Líquido desconta a taxa de administração da imobiliária (8% a 10%), o Imposto de Renda (Carnê-Leão até 27,5%), IPTU e cotas condominiais na vacância, refletindo o dinheiro que de fato entra no bolso do investidor.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quando o inquilino é uma empresa (CNPJ), quem recolhe o imposto de renda?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Quando o locatário for Pessoa Jurídica, a fonte pagadora (empresa) é obrigada por lei a realizar a retenção do Imposto de Renda na Fonte (IRRF - Código DARF 3208) sobre a tabela progressiva e repassar ao proprietário apenas o valor líquido, fornecendo o Informe de Rendimentos anual.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Despesas com reformas no imóvel podem ser abatidas no Carnê-Leão?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. Reformas, reparos e ampliações não são dedutíveis mensalmente no Carnê-Leão. No entanto, se devidamente comprovadas por notas fiscais idôneas, podem ser incorporadas ao custo de aquisição do imóvel na Declaração Anual de Ajuste para reduzir o ganho de capital em caso de futura venda.',
          },
        },
      ],
    },
  ],
};

export default function RendimentoAluguelLiquidoPage() {
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
            <span className="text-slate-200">Rendimento Líquido de Aluguel</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Building className="w-3.5 h-3.5" />
              Mercado Imobiliário • Cap Rate Real & Lei 7.713/1988 Art. 31
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de Rendimento Líquido de Aluguel 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Descubra quanto realmente sobra no seu bolso após taxa de administração imobiliária, imposto de renda Carnê-Leão mensal, IPTU anual e previsão de vacância contratual.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra de Ouro da Rentabilidade Imobiliária:</p>
              <p>
                O Cap Rate líquido real costuma ser entre 25% e 40% inferior ao yield bruto anunciado. Pela legislação tributária brasileira (Art. 31 da Lei nº 7.713/1988), a comissão da imobiliária e o IPTU arcados pelo proprietário reduzem legalmente a base tributável do Carnê-Leão.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CalculadoraRendimentoAluguelClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Manual Financeiro e Fiscal da Locação Imobiliária no Brasil
            </h2>

            <p>
              A aquisição de ativos imobiliários com foco em renda passiva é um dos pilares mais tradicionais da formação patrimonial no Brasil. Entretanto, a rentabilidade aparente (expressa pelo valor nominal do aluguel dividido pelo valor venal do imóvel) raramente corresponde ao retorno financeiro efetivo. O investidor diligente precisa dominar as variáveis operacionais e fiscais que compõem o <strong>Cap Rate Líquido (Capitalization Rate)</strong>.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. A Diferença Fundamental: Yield Bruto vs. Cap Rate Líquido</h3>
            <p>
              A análise da rentabilidade divide-se em duas óticas matemáticas indispensáveis:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Rental Yield Bruto:</strong> Fórmula simples: <code>(Aluguel Mensal × 12) ÷ Valor de Mercado do Imóvel</code>. Exemplo: um aluguel de R$ 2.500 sobre imóvel de R$ 500.000 resulta em 6,00% ao ano nominal.
              </li>
              <li>
                <strong>Cap Rate Líquido Real:</strong> Desconta do fluxo de caixa todas as despesas indispensáveis à manutenção e gestão da renda: taxa de administração imobiliária (8% a 10%), retenções de IRPF Carnê-Leão (alíquotas progressivas de até 27,5%), condomínio e IPTU suportados em meses de vacância e custos de publicidade e reformas periódicas.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">2. Deduções Legais Permitidas pelo Fisco (Art. 31 da Lei nº 7.713/1988)</h3>
            <p>
              A Receita Federal do Brasil permite a dedução expressa de determinadas despesas antes da aplicação da tabela progressiva do imposto de renda mensal (Carnê-Leão Web). Conforme o Artigo 31 da Lei Federal nº 7.713/1988 e o Regulamento do Imposto sobre a Renda (RIR):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Despesa da Locação</th>
                    <th className="p-2">Dedutível do IRPF?</th>
                    <th className="p-2">Condição Legal Obrigatória</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-white">Comissão da Imobiliária / Corretor</td>
                    <td className="p-2 font-semibold text-emerald-400">Sim (100%)</td>
                    <td className="p-2">Desde que comprovada por recibo ou nota fiscal de prestação de serviços emitida pela administradora.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">IPTU e Taxas Municipais do Imóvel</td>
                    <td className="p-2 font-semibold text-emerald-400">Sim</td>
                    <td className="p-2">Apenas quando suportados financeiramente pelo locador (não repassados ao inquilino).</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Taxas de Condomínio Ordinárias</td>
                    <td className="p-2 font-semibold text-emerald-400">Sim</td>
                    <td className="p-2">Apenas as cotas ordinárias pagas pelo proprietário durante os períodos de vacância ou desocupação.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Reformas e Benfeitorias</td>
                    <td className="p-2 font-semibold text-rose-400">Não (no Carnê-Leão)</td>
                    <td className="p-2">Não dedutíveis mensalmente. Podem apenas somar ao custo de aquisição na Declaração Anual.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">3. Carnê-Leão (PF) versus Retenção na Fonte (PJ)</h3>
            <p>
              A sistemática de recolhimento tributário varia conforme a personalidade jurídica do inquilino:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Inquilino Pessoa Física:</strong> O locador é obrigado a acessar o Portal e-CAC da Receita Federal (Carnê-Leão Web), registrar o rendimento recebido, informar as deduções do Art. 31 e emitir o <strong>DARF sob o código 0190</strong>, cujo vencimento ocorre no último dia útil do mês subsequente.
              </li>
              <li>
                <strong>Inquilino Pessoa Jurídica (Empresa):</strong> O recolhimento tributário é de responsabilidade exclusiva da fonte pagadora. A empresa inquilina retém o <strong>IRRF (DARF 3208)</strong> diretamente na fonte e efetua o pagamento ao locador já pelo valor líquido.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">4. Vacância e Custo de Oportunidade</h3>
            <p>
              O tempo médio em que um imóvel permanece desocupado entre contratos sucessivos no Brasil gira em torno de 1 a 3 meses a cada ciclo bienal ou trienal. Durante a vacância, o investidor não apenas deixa de auferir receita, como passa a arcar integralmente com as despesas de taxa condominial e IPTU. Por isso, a simulação prudencial deve sempre prever ao menos 0,5 mês de vacância por ano para apuração do fluxo de caixa descontado real.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Rendimento de Aluguel
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O que acontece se eu não declarar o aluguel recebido no Carnê-Leão?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  As imobiliárias e administradoras são legalmente obrigadas a enviar anualmente à Receita Federal a declaração DIMOB (Declaração de Informações sobre Atividades Imobiliárias). Havendo divergência ou omissão de rendimentos por parte do locador, o CPF cai automaticamente na malha fina, sujeito a cobrança do imposto devido com multa de mora de até 75% mais juros pela taxa Selic.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Vale a pena abrir uma holding imobiliária familiar (PJ) para receber aluguéis?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Geralmente sim para proprietários com receita de locação mensal relevante. Na Pessoa Física, a alíquota marginal atinge 27,5% no Carnê-Leão. Em uma pessoa jurídica optante pelo Lucro Presumido, a tributação federal unificada (IRPJ, CSLL, PIS e COFINS) sobre a receita de locação gira em torno de 11,33% a 14,53%, gerando economia tributária substancial a partir de volumes acima de R$ 8.000 a R$ 10.000 mensais.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Como comprovar as deduções de IPTU e taxas perante a Receita Federal?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Basta manter guardados os comprovantes bancários de pagamento do IPTU e do condomínio vinculados à matrícula do imóvel pelo prazo prescricional de 5 anos, acompanhados do contrato de locação demonstrando a assunção do encargo pelo proprietário.
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
