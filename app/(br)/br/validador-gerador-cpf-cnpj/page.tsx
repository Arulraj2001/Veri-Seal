import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Binary, ShieldCheck, HelpCircle } from 'lucide-react';
import { ValidadorGeradorCpfCnpjClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Validador e Gerador de CPF e CNPJ | Algoritmo Módulo 11 Receita Federal',
  description:
    'Validação instantânea e gerador de CPF e CNPJ válidos para testes de software com o algoritmo oficial Módulo 11 da Receita Federal do Brasil e novo padrão alfanumérico.',
  alternates: {
    canonical: 'https://kagazo.in/br/validador-gerador-cpf-cnpj',
    languages: {
      'pt-BR': 'https://kagazo.in/br/validador-gerador-cpf-cnpj',
      'pt': 'https://kagazo.in/br/validador-gerador-cpf-cnpj',
      'x-default': 'https://kagazo.in/br/validador-gerador-cpf-cnpj',
    },
  },
  openGraph: {
    title: 'Validador e Gerador de CPF / CNPJ Oficial - Módulo 11 RFB',
    description:
      'Validação matemática e gerador de documentos de teste conforme as instruções normativas da Receita Federal.',
    url: 'https://kagazo.in/br/validador-gerador-cpf-cnpj',
    siteName: 'Kagazo Brasil',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Validador e Gerador de CPF e CNPJ - Módulo 11',
    description:
      'Valide e gere números de CPF e CNPJ para testes em conformidade com o algoritmo Módulo 11.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Validador e Gerador de CPF e CNPJ da Receita Federal (Módulo 11)',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      url: 'https://kagazo.in/br/validador-gerador-cpf-cnpj',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'BRL',
      },
      description:
        'Validação e geração oficial de CPF e CNPJ de teste com algoritmo Módulo 11 da Receita Federal do Brasil. Execução 100% no navegador sem envio de dados a servidores externos.',
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
          name: 'Validador & Gerador CPF/CNPJ',
          item: 'https://kagazo.in/br/validador-gerador-cpf-cnpj',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Como funciona o algoritmo matemático de validação do CPF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O Cadastro de Pessoas Físicas (CPF) é constituído por 11 dígitos: 9 dígitos base e 2 dígitos verificadores (DV). O primeiro DV é obtido multiplicando os 9 dígitos por pesos decrescentes de 10 a 2; soma-se o produto, multiplica-se por 10 e divide-se por 11 (resto da divisão). O segundo DV repete o cálculo aplicando pesos de 11 a 2 sobre os 10 primeiros dígitos (já incluindo o primeiro DV). Se o resto for 10 ou 11, o dígito passa a ser 0.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que muda com a chegada do CNPJ Alfanumérico da Receita Federal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Instituído pela Instrução Normativa RFB nº 2.229/2024, o novo modelo de CNPJ mantém os 14 caracteres, porém as primeiras 12 posições passam a aceitar letras maiúsculas (de A a Z) e números, expandindo drasticamente a capacidade para mais de 1 trilhão de combinações. As duas últimas posições continuam estritamente numéricas, calculadas pelo algoritmo Módulo 11 adaptado à tabela ASCII.',
          },
        },
        {
          '@type': 'Question',
          name: 'Para que serve a geração de CPFs e CNPJs nesta ferramenta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A geração atende exclusivamente a desenvolvedores de software, analistas de qualidade (QA), engenheiros de dados e auditores fiscais que precisam de números matematicamente consistentes para testes de carga, homologação de ERPs, checagem de regras de checkout de e-commerce e formulários web. Nenhum número gerado possui vínculo direto com cidadãos reais ou dados de sigilo fiscal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual o crime tipificado pelo uso fraudulento de dados de terceiros?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Utilizar CPFs ou CNPJs falsos ou pertencentes a terceiros para obter vantagem ilícita, abrir contas ou formalizar compras configura crime de Falsidade Ideológica (Art. 299 do Código Penal), com pena de reclusão de 1 a 5 anos e multa, e eventualmente Falsa Identidade (Art. 307) ou Estelionato (Art. 171).',
          },
        },
      ],
    },
  ],
};

export default function ValidadorGeradorCpfCnpjPage() {
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
          <span className="text-slate-800 font-medium">Validador & Gerador de CPF / CNPJ</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Binary className="w-3.5 h-3.5" />
            Receita Federal do Brasil • Algoritmo Oficial Módulo 11
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Validador e Gerador de CPF e CNPJ
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Validação matemática imediata e geração de documentos com dígitos verificadores oficiais para testes de sistemas corporativos, ERPs e e-commerce.
          </p>
        </div>

        {/* Answer Capsule (GEO & AEO Citation Hook) */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 mb-8 shadow-sm">
          <h2 className="text-sm font-semibold text-emerald-900 uppercase tracking-wide mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Estrutura Oficial de Validação de Documentos Fiscais no Brasil
          </h2>
          <p className="text-sm text-emerald-950 leading-relaxed">
            A autenticidade formal de um <strong>CPF (11 dígitos)</strong> ou de um <strong>CNPJ (14 caracteres)</strong> depende do cálculo dos dois <strong>Dígitos Verificadores (DVs)</strong> pelo algoritmo de <strong>Módulo 11</strong> da Receita Federal. O teste verifica a coerência aritmética dos dígitos e barra fraudes de digitação em milissegundos sem consultar servidores governamentais ou expor a privacidade do titular.
          </p>
        </div>

        {/* Client Engine */}
        <ValidadorGeradorCpfCnpjClient />

        {/* In-Content Statutory Ad Slot */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              A Estrutura Matemática dos Documentos da Receita Federal do Brasil
            </h2>
            <p>
              O <strong>Cadastro de Pessoas Físicas (CPF)</strong> e o <strong>Cadastro Nacional da Pessoa Jurídica (CNPJ)</strong> são os pilares de identificação fiscal e mercantil no Brasil, criados originalmente pelo <strong>Decreto-Lei nº 401/1968</strong> e regulamentados atualmente pela <strong>Instrução Normativa RFB nº 2.119/2022</strong>.
            </p>
            <p className="mt-3">
              Para evitar erros de digitação em guias de recolhimento (DARF, GPS, DAS), em transferências bancárias do Sistema Financeiro Nacional (Pix, TED, DOC) e na transmissão de Notas Fiscais Eletrônicas (NF-e, NFS-e, NFC-e), a Receita Federal implementou um sistema aritmético universal denominado <strong>Algoritmo Módulo 11</strong> para apurar os dois últimos dígitos verificadores de cada registro.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Passo a Passo Matemático do Cálculo do Dígito Verificador do CPF
            </h3>
            <p>
              O CPF é composto por uma matriz de 11 algarismos decimais no formato <code>ABC.DEF.GHI-JK</code>, onde:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Dígitos 1 a 8 (ABCDEFGH):</strong> O número-base sequencial atribuído ao contribuinte no momento de sua inscrição cadastral.
              </li>
              <li>
                <strong>Dígito 9 (I):</strong> Indica a Região Fiscal de origem da emissão originária (ex: 1 para DF/GO/MT/MS/TO; 2 para AC/AM/AP/PA/RO/RR; 3 para CE/MA/PI; 4 para AL/PB/PE/RN; 5 para BA/SE; 6 para MG; 7 para ES/RJ; 8 para SP; 9 para PR/SC; 0 para RS).
              </li>
              <li>
                <strong>Dígito 10 (J - Primeiro Dígito Verificador):</strong> Multiplica-se cada um dos 9 primeiros algarismos pelos fatores decrescentes de 10 a 2. Soma-se o resultado das 9 multiplicações. Em seguida, multiplica-se o total por 10 e divide-se pelo divisor fixo 11. O resto dessa operação define o primeiro DV. Caso o resto resulte em 10 ou 11, o algarismo é convertido convencionalmente para 0.
              </li>
              <li>
                <strong>Dígito 11 (K - Segundo Dígito Verificador):</strong> Toma-se a sequência agora de 10 algarismos (os 9 base mais o primeiro DV recém-apurado). Multiplica-se cada um pelos fatores decrescentes de 11 a 2. Efetua-se a soma, multiplica-se por 10 e divide-se novamente por 11. O resto obtido estipula o segundo DV.
              </li>
            </ul>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-4 text-xs font-mono text-slate-700 leading-relaxed">
              Exemplo: Para o CPF 111.444.777-XX:<br />
              Soma 1 = (1×10)+(1×9)+(1×8)+(4×7)+(4×6)+(4×5)+(7×4)+(7×3)+(7×2) = 146<br />
              Resto 1 = (146 × 10) % 11 = 1460 % 11 = 8. Logo, o 1º DV é 3 (ou fórmula direta: DV = 11 - (Soma % 11)).
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              A Regra de Validação do CNPJ Tradicional (14 Dígitos)
            </h3>
            <p>
              O número de inscrição no Cadastro Nacional da Pessoa Jurídica adota o padrão <code>XX.XXX.XXX/0001-YY</code>, sendo formado por 8 dígitos de raiz empresarial, 4 dígitos de sucursal ou filial (comumente <code>0001</code> para a matriz societária) e 2 dígitos verificadores finais.
            </p>
            <p className="mt-3">
              A ponderação do CNPJ difere do CPF porque a série de multiplicadores reinicia após o número 9:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Pesos do 1º Dígito do CNPJ</h4>
                <p className="font-mono text-xs text-slate-600 mb-2">5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2</p>
                <p className="text-slate-600 text-xs">
                  Aplica-se o vetor de pesos sobre os 12 primeiros dígitos. O resto da divisão por 11 determina o DV: se for menor que 2, o dígito é 0; caso contrário, subtrai-se o resto de 11 (<code>11 - resto</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Pesos do 2º Dígito do CNPJ</h4>
                <p className="font-mono text-xs text-slate-600 mb-2">6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2</p>
                <p className="text-slate-600 text-xs">
                  Aplica-se sobre os 13 dígitos antecedentes (incluindo o primeiro DV encontrado). A mesma regra de resto inferior a 2 define o algarismo final do registro.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              A Revolução do CNPJ Alfanumérico (Instrução Normativa RFB nº 2.229/2024)
            </h3>
            <p>
              Diante do expressivo crescimento do empreendedorismo no território nacional — com mais de 22 milhões de empresas ativas e milhões de registros de MEIs —, as combinações estritamente numéricas da raiz de 8 dígitos do CNPJ aproximaram-se de seu esgotamento estatístico.
            </p>
            <p className="mt-3">
              Para resolver esse desafio estrutural sem romper com a interoperabilidade das bases de dados legadas, a Receita Federal publicou a <strong>Instrução Normativa RFB nº 2.229/2024</strong>, instituindo o <strong>CNPJ Alfanumérico</strong>:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Extensão de 14 caracteres mantida:</strong> A máscara e o comprimento total do documento permanecem idênticos (<code>XX.XXX.XXX/XXXX-XX</code>), assegurando que formulários e layouts de banco de dados não quebrem o limite de caracteres.
              </li>
              <li>
                <strong>Posições 1 a 12 alfanuméricas:</strong> As posições da raiz e da filial passam a admitir letras maiúsculas (de <code>A</code> a <code>Z</code>) ou números decimais (de <code>0</code> a <code>9</code>), gerando uma capacidade combinatorial de mais de 1 trilhão de empresas possíveis.
              </li>
              <li>
                <strong>Dígitos Verificadores estritamente numéricos (Posições 13 e 14):</strong> Os dois últimos caracteres continuarão sendo algarismos decimais, calculados pelo algoritmo Módulo 11 com base na conversão dos caracteres alfanuméricos pelo seu valor ordinal na tabela ASCII subtraído de uma constante padronizada da RFB.
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Uso Ético e Conformidade Jurídica (Art. 299 e 307 do Código Penal)
            </h3>
            <p>
              É imperioso destacar que esta ferramenta computacional foi desenvolvida estritamente para propósitos de engenharia de software, testes de integração de API, homologação de formulários e desenvolvimento de testes automatizados unitários em ambientes de Sandbox.
            </p>
            <p className="mt-3 text-sm">
              A utilização indevida de dados identificadores de terceiros ou a criação deliberada de dados fictícios com a finalidade de fraudar credores, burlar sistemas de proteção ao crédito (Serasa, SPC), obter empréstimos financeiros ou forjar contratos civis constitui ilícito penal grave tipificado como:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Falsidade Ideológica (Artigo 299 do Código Penal):</strong> Pena de reclusão de 1 a 5 anos e multa;</li>
              <li><strong>Falsa Identidade (Artigo 307 do Código Penal):</strong> Pena de detenção de 3 meses a 1 ano ou multa;</li>
              <li><strong>Estelionato Eletrônico e Fraude Digital (Artigo 171, § 2º-A do CP):</strong> Pena de reclusão de 4 a 8 anos e multa.</li>
            </ul>
          </div>
        </article>

        {/* Perguntas Frequentes (FAQ) Accordion */}
        <section className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Perguntas Frequentes sobre CPF, CNPJ e Módulo 11
          </h2>

          <div className="space-y-4">
            <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-slate-900">
                <span>Por que números de CPF como 111.111.111-11 são inválidos se o cálculo do dígito bate?</span>
                <span className="shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 sm:p-2 group-open:-rotate-180 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                As sequências com todos os dígitos idênticos (000.000.000-00, 111.111.111-11 até 999.999.999-99) passam artificialmente em certas fórmulas puras de Módulo 11 em virtude de propriedades de simetria modular. No entanto, a Receita Federal do Brasil desclassificou explicitamente todas essas sequências por norma cadastral expressa, classificando-as como nulas de pleno direito para impedir fraudes grosseiras em sistemas cadastrais.
              </p>
            </details>

            <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-slate-900">
                <span>Um CPF matematicamente válido significa que a pessoa existe na base da Receita?</span>
                <span className="shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 sm:p-2 group-open:-rotate-180 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Não. A validação realizada aqui afere a integridade matemática e a consistência lógica dos dígitos verificadores (DVs) do documento, o que prova que a sequência é matematicamente autêntica e aceita por formulários. Contudo, saber se tal documento foi efetivamente emitido e encontra-se na situação cadastral "Regular", "Pendente de Regularização", "Suspensa" ou "Cancelada" exige consulta direta à base de dados oficial protegida do Serpro ou da Receita Federal mediante convênio ou certificado digital.
              </p>
            </details>

            <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-slate-900">
                <span>Como o novo CNPJ alfanumérico afetará os sistemas de cobrança e bancos de dados legados?</span>
                <span className="shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 sm:p-2 group-open:-rotate-180 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Bancos de dados que armazenavam o CNPJ como campo numérico (ex: <code>BIGINT</code> ou <code>NUMERIC</code>) precisarão ser migrados obrigatoriamente para campos de texto como <code>VARCHAR(14)</code>. Além disso, rotinas de validação de formulários que utilizavam expressões regulares restritivas a dígitos (<code>/^[0-9]{14}$/</code>) deverão ser atualizadas para aceitar caracteres alfanuméricos (<code>/^[A-Z0-9]{12}[0-9]{2}$/</code>) preservando a integridade das regras do algoritmo de módulo 11 adaptado.
              </p>
            </details>

            <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-slate-900">
                <span>Os dados digitados nesta ferramenta são enviados para algum servidor?</span>
                <span className="shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 sm:p-2 group-open:-rotate-180 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Absolutamente não. A execução do código de validação e geração é realizada 100% de forma local no seu navegador web (Client-Side JavaScript). Nenhuma informação, número ou documento digitado é transmitido por telemetria, armazenado em logs ou compartilhado com bancos de dados de terceiros, garantindo estrita aderência à Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
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
