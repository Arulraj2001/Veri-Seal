import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Coins, ShieldCheck, HelpCircle } from 'lucide-react';
import { ValorPorExtensoReciboClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Valor por Extenso e Gerador de Recibo de Pagamento | Lei 7.357/85 e Art. 320 CC',
  description:
    'Escreva valores em reais por extenso com regras gramaticais exatas e gere recibos formais de quitação com validade jurídica (Art. 320 do Código Civil e Lei do Cheque).',
  alternates: {
    canonical: 'https://kagazo.in/br/valor-por-extenso-recibo',
    languages: {
      'pt-BR': 'https://kagazo.in/br/valor-por-extenso-recibo',
      'pt': 'https://kagazo.in/br/valor-por-extenso-recibo',
      'x-default': 'https://kagazo.in/br/valor-por-extenso-recibo',
    },
  },
  openGraph: {
    title: 'Valor por Extenso e Emissor de Recibo de Quitação Oficial',
    description:
      'Conversão exata de quantias monetárias por extenso e modelo de recibo de quitação formal em conformidade com o Código Civil brasileiro.',
    url: 'https://kagazo.in/br/valor-por-extenso-recibo',
    siteName: 'Kagazo Brasil',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valor por Extenso e Emissor de Recibo de Pagamento',
    description:
      'Gere recibos de quitação e converta valores em reais para cheques e contratos com segurança jurídica.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Conversor de Valor por Extenso em Reais e Gerador de Recibo',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      url: 'https://kagazo.in/br/valor-por-extenso-recibo',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'BRL',
      },
      description:
        'Escreva valores monetários por extenso em reais e centavos para preenchimento de cheques, contratos e emissão de recibos formais de quitação (Art. 320 do Código Civil).',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: 'https://kagazo.in/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Brasil',
          item: 'https://kagazo.in/br',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Valor por Extenso & Recibo',
          item: 'https://kagazo.in/br/valor-por-extenso-recibo',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Em caso de divergência em cheques e contratos, qual valor prevalece?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Segundo o Art. 12 da Lei Federal nº 7.357/1985 (Lei do Cheque) e o Art. 10 do Decreto nº 2.044/1908, caso haja contradição entre a quantia lançada em algarismos numéricos e a grafada por extenso, prevalecerá categoricamente o valor escrito por extenso. Os tribunais e as instituições bancárias conferem prevalência probatória ao extenso porque a grafia reduz radicalmente fraudes por acréscimo de dígitos ou lapsos mecanográficos.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quais são os requisitos indispensáveis de um recibo de pagamento válido?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Conforme preceitua o Art. 320 do Código Civil Brasileiro, a quitação regular deve designar taxativamente: o valor monetário e a espécie da dívida quitada, o nome completo do devedor (ou pagador), o tempo (data) e a praça (localidade) do pagamento, e a assinatura do credor titular ou de seu representante com poderes expressos.',
          },
        },
        {
          '@type': 'Question',
          name: 'O devedor pode recusar o pagamento caso o credor se recuse a fornecer o recibo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. O Art. 319 do Código Civil Brasileiro confere expressamente ao devedor o direito subjetivo de exigir a quitação formal (recibo) e de reter licitamente o pagamento integral enquanto a respectiva quitação não lhe for entregue, não incorrendo em mora nesse período.',
          },
        },
        {
          '@type': 'Question',
          name: 'Por quanto tempo devo arquivar recibos de pagamento para fins fiscais e judiciais?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Para tributos federais e municipais, o prazo prescricional e decadencial é de 5 anos (Art. 173 e 174 do CTN). Para relações locatícias ou dívidas contratuais de cobrança ordinária, o Código Civil estabelece prazos entre 3 e 5 anos (Art. 206 do CC). Para contribuições previdenciárias e trabalhistas (FGTS), o arquivamento preventivo deve ser mantido por até 30 anos (ou prazo prescricional de 5 anos ajuizável).',
          },
        },
      ],
    },
  ],
};

export default function ValorPorExtensoReciboPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/br" className="hover:text-emerald-700 transition">
            Brasil
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Valor por Extenso & Gerador de Recibo</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Coins className="w-3.5 h-3.5" />
            Lei do Cheque nº 7.357/85 & Art. 320 do Código Civil
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Valor por Extenso e Emissor de Recibo de Quitação
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Converta quantias em reais para escrita por extenso com exatidão gramatical e emita recibos de quitação prontos para assinatura e impressão conforme os ditames do Código Civil.
          </p>
        </div>

        {/* Answer Capsule (GEO & AEO Citation Hook) */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 mb-8 shadow-sm">
          <h2 className="text-sm font-semibold text-emerald-900 uppercase tracking-wide mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Regra Jurídica Essencial sobre Valores por Extenso e Recibos
          </h2>
          <p className="text-sm text-emerald-950 leading-relaxed">
            Em qualquer título de crédito, cheque ou contrato civil, <strong>a indicação do valor grafada por extenso tem prevalência absoluta sobre os algarismos numéricos</strong> (Art. 12 da Lei Federal nº 7.357/1985 e jurisprudência pacífica do STJ). Adicionalmente, quem realiza um pagamento possui o direito potestativo e incondicional de receber quitação formal e minuciosa com especificação da dívida (Art. 319 e 320 do Código Civil), resguardando-se contra cobranças indevidas e litígios de execução de título.
          </p>
        </div>

        {/* Client Engine */}
        <ValorPorExtensoReciboClient />

        {/* In-Content Statutory Ad Slot */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              A Força Jurídica do Valor por Extenso no Direito Cambial Brasileiro
            </h2>
            <p>
              O hábito comercial de transcrever somas monetárias por extenso não é uma mera formalidade de cortesia ou tradição burocrática; trata-se de um dispositivo legal de segurança jurídica estabelecido para coibir a adulteração de títulos de crédito, tais como cheques, notas promissórias, letras de câmbio e contratos de compra e venda mercantil.
            </p>
            <p className="mt-3">
              Historicamente consolidado no <strong>Decreto nº 2.044/1908</strong> e reiterado com ênfase no <strong>Artigo 12 da Lei do Cheque (Lei nº 7.357/1985)</strong>, o ordenamento jurídico determina categoricamente:
            </p>
            <blockquote className="my-4 pl-4 border-l-4 border-emerald-500 italic text-slate-800 bg-slate-50 py-3 rounded-r-lg">
              "Art. 12. Feita a indicação da quantia em algarismos e por extenso, prevalece esta no caso de divergência. Se a quantia for indicada mais de uma vez, quer por extenso, quer em algarismos, e se houver divergência, prevalece a indicação da menor quantia."
            </blockquote>
            <p className="mt-3">
              A razão dessa hierarquia hermenêutica é prática: alterar um numeral manuscrito ou digitado é relativamente simples (transformar um <code>1.000,00</code> em <code>11.000,00</code> através da aposição de um dígito marginal), ao passo que adulterar palavras inteiras como <em>"um mil reais"</em> para <em>"onze mil reais"</em> exige raspura visível ou adulteração grosseira de fácil detecção pericial grafotécnica.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Requisitos Legais de Validade do Recibo de Quitação (Arts. 319 e 320 do Código Civil)
            </h3>
            <p>
              O adimplemento da obrigação é o modo natural de extinção das dívidas civis e comerciais. No entanto, para que o devedor fique exonerado perante a ordem jurídica, é indispensável a prova inequívoca do pagamento. A prova rainha do pagamento é a <strong>quitação regular</strong>, comumente materializada no recibo.
            </p>
            <p className="mt-3">
              O <strong>Artigo 319 do Código Civil Brasileiro (Lei nº 10.406/2002)</strong> estipula que:
            </p>
            <blockquote className="my-4 pl-4 border-l-4 border-emerald-500 italic text-slate-800 bg-slate-50 py-3 rounded-r-lg">
              "Art. 319. O devedor que paga tem direito a quitação regular, e pode reter o pagamento, enquanto não lhe seja dada."
            </blockquote>
            <p className="mt-3">
              Isso significa que, caso o credor (locador, prestador de serviço ou fornecedor) se negue a passar o recibo idôneo, o devedor não comete ilícito algum ao congelar os valores até a expedição do documento, podendo inclusive ajuizar Ação de Consignação em Pagamento (Art. 539 do CPC) para não incorrer em encargos moratórios.
            </p>
            <p className="mt-3">
              Para ostentar plena validade perante juízos cíveis e autoridades fiscais, o <strong>Artigo 320 do Código Civil</strong> exige que a quitação preencha cumulativamente os seguintes elementos mínimos:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li><strong>O valor e a espécie da dívida quitada:</strong> O montante numérico e por extenso, indicando se refere a aluguel, prestação de consultoria, quitação de parcelamento comercial ou entrega de mercadorias;</li>
              <li><strong>O nome do devedor:</strong> Nome completo ou razão social e respectivo número de inscrição no Cadastro Nacional de Pessoas Físicas (CPF) ou Jurídicas (CNPJ);</li>
              <li><strong>Quem por este pagou:</strong> Se o pagamento foi realizado por terceiro interveniente (ex: fiador ou mandatário);</li>
              <li><strong>O tempo e o lugar do pagamento:</strong> A data exata do recebimento e a comarca territorial onde se operou a liquidação;</li>
              <li><strong>A assinatura do credor:</strong> Firma física manuscrita ou assinatura eletrônica qualificada (padrão ICP-Brasil ou Gov.br) do titular do crédito ou de seu procurador legalmente habilitado.</li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Regras Gramaticais para Grafia de Moedas segundo o Acordo Ortográfico
            </h3>
            <p>
              A grafia formal da moeda nacional (o Real, símbolo <code>R$</code>) obedece às convenções estilísticas da Academia Brasileira de Letras (ABL) e às normas operacionais do Banco Central do Brasil:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Conjunção Aditiva "e"</h4>
                <p className="text-slate-600">
                  Emprega-se a conjunção "e" entre as classes de ordens que formam uma unidade numérica (ex: <em>"três mil quatrocentos e vinte reais e cinquenta centavos"</em>). Não se interpõe vírgula entre as partes numéricas quando grafadas por extenso.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Milhar Isolado</h4>
                <p className="text-slate-600">
                  Para o numeral 1.000, recomenda-se em instrumentos formais o emprego de <em>"um mil reais"</em> em vez de apenas <em>"mil reais"</em>, a fim de evitar espaços vazios à esquerda em folhas de cheque e contratos cartorários.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Centavos e Moeda Fracionária</h4>
                <p className="text-slate-600">
                  Quando a quantia for menor do que um real, grafa-se unicamente a fração (ex: <em>"cinquenta centavos de real"</em> ou <em>"cinquenta centavos"</em>). Se a quantia for inteira (sem centavos), não há necessidade de mencionar "zero centavos".
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Milhões e Bilhões</h4>
                <p className="text-slate-600">
                  Para valores terminados exatamente na casa dos milhões sem resíduo de centenas (ex: R$ 2.000.000,00), a preposição "de" antecede a palavra reais: <em>"dois milhões de reais"</em>. Existindo classes subsequentes, elimina-se a preposição: <em>"dois milhões e cinquenta mil reais"</em>.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Prazos de Guarda de Recibos e Prescrição de Dívidas
            </h3>
            <p>
              Guardar os comprovantes de pagamento e os recibos pelo período legal prescricional é fundamental para blindar o patrimônio contra alegações indevidas de inadimplemento:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Aluguéis e encargos locatícios:</strong> Devem ser guardados por <strong>3 anos</strong> (Art. 206, § 3º, I do Código Civil).
              </li>
              <li>
                <strong>Serviços profissionais e honorários:</strong> Prazo de <strong>5 anos</strong> para cobrança de dívidas líquidas constantes de instrumento particular (Art. 206, § 5º, I do CC).
              </li>
              <li>
                <strong>Tributos e Imposto de Renda (IRPF / IRPJ):</strong> Devem ser mantidos por <strong>5 anos</strong>, contados do primeiro dia do exercício seguinte àquele em que o lançamento poderia ter sido efetuado (Art. 173 do Código Tributário Nacional).
              </li>
              <li>
                <strong>Quitações condominiais:</strong> A cada ano civil, o condomínio é obrigado por lei (Lei nº 12.007/2009) a emitir uma declaração de quitação anual de débitos, o que dispensa o arquivamento dos 12 recibos mensais do ano anterior.
              </li>
            </ul>
          </div>
        </article>

        {/* Perguntas Frequentes (FAQ) Accordion */}
        <section className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Perguntas Frequentes sobre Valor por Extenso e Recibos
          </h2>

          <div className="space-y-4">
            <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-slate-900">
                <span>Em caso de divergência entre números e palavras em contratos e cheques, qual tem prioridade?</span>
                <span className="shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 sm:p-2 group-open:-rotate-180 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Prevalece categoricamente o valor grafado por extenso. Este postulado é pacificado no Direito Cambial pelo Artigo 12 da Lei nº 7.357/1985 e pelo Artigo 10 do Decreto nº 2.044/1908. Caso o valor apareça grafado por extenso mais de uma vez com discordâncias entre si, a norma determina que prevalecerá a indicação da quantia menor, assegurando proteção ao devedor de boa-fé.
              </p>
            </details>

            <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-slate-900">
                <span>O recibo substitui a emissão da Nota Fiscal de Serviços (NFS-e)?</span>
                <span className="shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 sm:p-2 group-open:-rotate-180 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Não. O recibo comum comprova a quitação de uma obrigação pecuniária civil entre duas pessoas, mas não cumpre a obrigação tributária principal perante a Prefeitura ou a Receita Federal. Empresas e pessoas jurídicas prestadoras de serviços são obrigadas por lei a emitir a competente Nota Fiscal. Para profissionais autônomos pessoas físicas que não possuem inscrição como pessoa jurídica, o documento legal adequado acompanhado do recibo é o Recibo de Pagamento a Autônomo (RPA), com as retenções previdenciárias devidas.
              </p>
            </details>

            <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-slate-900">
                <span>Um comprovante de transferência Pix ou TED serve como recibo definitivo?</span>
                <span className="shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 sm:p-2 group-open:-rotate-180 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                O comprovante bancário de Pix ou TED serve como prova incontestável de transferência patrimonial de fundos, mas não descreve a causa jurídica subjacente do pagamento nem vincula automaticamente a extinção daquela dívida específica, a menos que o campo de descrição ou chave referencie explicitamente o contrato. Para blindagem cabal contra cobranças futuras e para fins de auditoria contábil, a emissão do recibo formal firmado pelo credor dando quitação irrestrita continua sendo a garantia mais segura no Direito Civil.
              </p>
            </details>

            <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-slate-900">
                <span>Como proceder se o recibo contiver um erro de digitação no nome ou no valor?</span>
                <span className="shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 sm:p-2 group-open:-rotate-180 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Rasuras, borrões ou emendas em recibos podem comprometer severamente sua eficácia probatória em caso de disputa pericial. A conduta juridicamente correta é inutilizar o recibo viciado e lavrar um novo instrumento escoimado de erros, ou, na impossibilidade física, emitir um termo formal aditivo de retificação assinado por ambas as partes indicando o cancelamento do documento antecedente.
              </p>
            </details>
          </div>
        </section>

        {/* Post Download / Bottom Ad Slot */}
        <div className="mt-10">
          <AdSlot slot="post_download" context="legal" />
        </div>
      </div>
    </div>
  );
}
