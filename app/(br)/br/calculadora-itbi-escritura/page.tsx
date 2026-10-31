import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculadoraItbiEscrituraClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de ITBI e Escritura 2026 | Custos de Cartório e Desconto SFH',
  description:
    'Simule os custos reais para registrar um imóvel no Brasil: ITBI municipal (Tema 1113 STJ), escritura pública no Tabelionato e registro no RGI com 50% de desconto pelo SFH.',
  keywords: [
    'calculadora itbi e escritura',
    'custos cartorio compra imovel',
    'tema 1113 stj itbi valor venal',
    'desconto 50 registro sfh art 290',
    'quanto custa passar imovel para o nome',
    'taxa itbi sao paulo rio'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculadora-itbi-escritura',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculadora-itbi-escritura',
      'pt': 'https://kagazo.in/br/calculadora-itbi-escritura',
      'x-default': 'https://kagazo.in/br/calculadora-itbi-escritura',
    },
  },
  openGraph: {
    title: 'Calculadora de ITBI e Custos de Cartório de Imóvel 2026',
    description:
      'Descubra o valor exato dos impostos municipais e emolumentos de cartório para registrar sua casa ou apartamento.',
    url: 'https://kagazo.in/br/calculadora-itbi-escritura',
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
      'name': 'Calculadora de ITBI e Custos de Cartório 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador jurídico de custos de transferência imobiliária no Brasil, abrangendo ITBI, escritura e desconto de registro pelo SFH.',
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
          'name': 'ITBI e Custos de Cartório',
          'item': 'https://kagazo.in/br/calculadora-itbi-escritura',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'A prefeitura pode cobrar o ITBI com base no valor venal de referência?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. O Superior Tribunal de Justiça (STJ), no julgamento do Tema Repetitivo 1113 (REsp 1.937.821/SP), fixou a tese vinculante de que o ITBI deve ser calculado sobre o valor real da transação declarado pelo contribuinte em condições normais de mercado. É ilegal o arbitramento prévio unilateral da base de cálculo por valores de referência municipais.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quem compra imóvel financiado precisa pagar escritura pública no cartório de notas?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. O contrato de financiamento imobiliário firmado com a instituição financeira (alienação fiduciária pelo SFH ou SFI) possui, por expressa disposição da Lei nº 4.380/1964 e da Lei nº 9.514/1997, força de escritura pública, sendo levado diretamente ao Cartório de Registro de Imóveis (RGI).',
          },
        },
        {
          '@type': 'Question',
          'name': 'Como funciona o desconto de 50% no registro do primeiro imóvel?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O Artigo 290 da Lei de Registros Públicos (Lei nº 6.015/1973) assegura a redução de 50% nos emolumentos cartorários de registro e averbação para a primeira aquisição de imóvel residencial financiada no âmbito do Sistema Financeiro da Habitação (SFH). Para ter o benefício, basta firmar declaração de próprio punho ao cartório.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Em que momento da compra do imóvel o ITBI deve ser pago?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O Supremo Tribunal Federal (STF), no julgamento do Tema 1124 (ARE 1.294.969), definiu que o fato gerador do ITBI ocorre somente com a efetiva transferência da propriedade imobiliária mediante registro no RGI. No entanto, as legislações municipais e os cartórios exigem o comprovante de recolhimento da guia de ITBI como condição prévia para protocolar e lavrar o registro.',
          },
        },
      ],
    },
  ],
};

export default function CalculadoraItbiEscrituraPage() {
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
            <span className="text-slate-200">ITBI e Custos de Cartório</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Building2 className="w-3.5 h-3.5" />
              Direito Notarial e Registral • Tema 1113 STJ & Lei 6.015/1973
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de ITBI e Custos de Cartório de Imóvel 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Simule detalhadamente o imposto municipal de ITBI, escritura pública no Tabelionato de Notas e registro no RGI com aplicação do desconto legal de 50% pelo SFH.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra de Custos Notariais na Aquisição Imobiliária:</p>
              <p>
                Os custos totais de legalização giram entre 4% e 6% do valor da transação. Pela jurisprudência vinculante do STJ (Tema 1113), o ITBI deve incidir sobre o valor real do negócio pactuado. Compras financiadas pelo SFH dispensam escritura pública e contam com 50% de desconto no registro em cartório (Art. 290 da Lei 6.015/73).
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CalculadoraItbiEscrituraClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Guia Completo da Transferência Imobiliária: Impostos, Emolumentos e Direitos do Comprador
            </h2>

            <p>
              No ordenamento jurídico brasileiro, a transmissão onerosa de propriedade imobiliária entre vivos não se aperfeiçoa com a assinatura do contrato particular de compra e venda nem com o pagamento integral do preço pactuado. O <strong>Artigo 1.245 do Código Civil Brasileiro</strong> consagrou o princípio registral do <em>"quem não registra não é dono"</em>, estipulando que a propriedade imobiliária somente se transfere formalmente mediante o registro do título translativo no competente Cartório de Registro de Imóveis (RGI).
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. O ITBI Municipal e a Revolução do Tema 1113 do STJ</h3>
            <p>
              O <strong>Imposto sobre a Transmissão de Bens Imóveis (ITBI)</strong> é um tributo de competência municipal previsto no Artigo 156, inciso II da Constituição Federal de 1988. Sua alíquota varia entre 2% e 3% na imensa maioria das capitais e municípios brasileiros.
            </p>
            <p>
              Durante décadas, as Secretarias Municipais de Fazenda cobraram o imposto utilizando tabelas arbitrárias denominadas "Valor Venal de Referência" (frequentemente 30% a 50% superiores ao preço real pago no negócio). Em março de 2022, o <strong>Superior Tribunal de Justiça (STJ)</strong>, ao julgar o Recurso Especial repetitivo 1.937.821/SP (Tema 1113), fixou três teses com efeito vinculante nacional:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A base de cálculo do ITBI é o valor do imóvel transmitido em condições normais de mercado, não se vinculando à base do IPTU;</li>
              <li>O preço declarado pelo contribuinte na escritura goza de presunção de veracidade e boa-fé perante o Fisco;</li>
              <li>É expressamente vedado ao município arbitrar previamente a base de cálculo do imposto com respaldo em valores de referência unilaterais.</li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">2. Escritura Pública: Quando é Obrigatória e Quando é Dispensada?</h3>
            <p>
              O Código Civil (Artigo 108) impõe a <strong>Escritura Pública lavrada em Tabelionato de Notas</strong> como instrumento essencial para a validade dos negócios imobiliários de valor superior a 30 salários mínimos efetuados com pagamento à vista ou parcelamento direto com o vendedor.
            </p>
            <p>
              <strong>A Exceção Legal dos Financiamentos Bancários:</strong> O Artigo 61, § 5º da Lei nº 4.380/1964 e o Artigo 38 da Lei nº 9.514/1997 estabelecem que os contratos de alienação fiduciária emitidos por bancos (Caixa Econômica, Itaú, Bradesco, etc.) possuem legalmente <em>força de escritura pública</em>. O comprador financiado economiza 100% dos custos com o Tabelionato de Notas, levando o contrato bancário impresso diretamente ao RGI.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">3. Desconto Legal de 50% no Registro pelo SFH (Art. 290 da Lei nº 6.015/1973)</h3>
            <p>
              Poucos mutuários conhecem a proteção conferida pelo <strong>Artigo 290 da Lei de Registros Públicos</strong>:
            </p>
            <blockquote className="my-3 pl-4 border-l-4 border-emerald-500 italic text-slate-300 bg-slate-900/60 p-3 rounded-r-lg">
              "Os emolumentos devidos pelos atos de aquisição de imóveis financiados pelo Sistema Financeiro da Habitação para fins residenciais, quando se tratar de primeira aquisição do mutuário, serão reduzidos em 50% (cinquenta por cento)."
            </blockquote>
            <p>
              Para usufruir da redução legal na hora de protocolar o registro no cartório, basta preencher uma declaração simples atestando sob as penas da lei que aquela é a primeira residência própria adquirida com financiamento do SFH.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">4. Inclusão dos Custos no Financiamento Imobiliário</h3>
            <p>
              A regulamentação do Conselho Monetário Nacional (CMN) e as políticas de crédito dos principais bancos autorizam que até <strong>5% do saldo financiado</strong> seja utilizado especificamente para a quitação das guias de ITBI e dos emolumentos notariais e registrais, aliviando o desembolso financeiro imediato dos adquirentes no ato da assinatura.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre ITBI e Escritura
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Se a prefeitura cobrar o ITBI pelo valor de referência, o que devo fazer?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  O contribuinte pode formular impugnação administrativa anexando a cópia do contrato de compra e venda e citando expressamente o Tema 1113 do STJ. Caso a prefeitura recuse a emissão da guia pelo valor pactuado, é cabível impetrar Mandado de Segurança com pedido de liminar na Vara da Fazenda Pública para garantir o pagamento sobre a base correta.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Quem paga o ITBI: o comprador ou o vendedor?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Salvo convenção expressa em contrário firmada em contrato particular, as leis municipais determinam que o sujeito passivo (contribuinte responsável) do ITBI é o adquirente (comprador) do imóvel. O Artigo 490 do Código Civil corrobora que as despesas de escritura e registro correm habitualmente por conta do comprador.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Existe isenção de ITBI para programas como o Minha Casa Minha Vida?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Diversos municípios brasileiros concedem isenção integral ou alíquotas substancialmente reduzidas (por exemplo, 0,5% a 1%) para imóveis de interesse social enquadrados na Faixa 1 e Faixa 2 do Programa Minha Casa Minha Vida (MCMV), visando facilitar o acesso à habitação popular.
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
