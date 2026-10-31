import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CompressorPdfPjeClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Compressor de PDF para PJe e Tribunais 2026 | TRT, TRF, TJ e STJ',
  description:
    'Comprima petições e anexos para os limites do PJe (3MB na Justiça do Trabalho, 5MB na Federal e 10MB nos TJs). Processamento 100% no navegador com sigilo advocatício e conformidade com a Resolução CNJ nº 185/2013.',
  keywords: [
    'compressor pdf pje online gratis',
    'diminuir tamanho pdf trt 3mb',
    'otimizar pdf projudi e saj 5mb',
    'resolucao cnj 185 2013 peticionamento',
    'comprimir peticao inicial sigilo oab',
    'pdf a 1b pje tribunais'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/compressor-pdf-pje-tribunais',
    languages: {
      'pt-BR': 'https://kagazo.in/br/compressor-pdf-pje-tribunais',
      'pt': 'https://kagazo.in/br/compressor-pdf-pje-tribunais',
      'x-default': 'https://kagazo.in/br/compressor-pdf-pje-tribunais',
    },
  },
  openGraph: {
    title: 'Compressor de PDF para o PJe e Tribunais de Justiça 2026',
    description:
      'Reduza o tamanho de petições e documentos jurídicos para peticionamento eletrônico sem perda de legibilidade e com sigilo total.',
    url: 'https://kagazo.in/br/compressor-pdf-pje-tribunais',
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
      'name': 'Compressor de PDF para PJe e Tribunais 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Ferramenta jurídica de otimização estrutural de PDFs para peticionamento eletrônico nos limites de 3MB, 5MB e 10MB dos tribunais brasileiros.',
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
          'name': 'Compressor PDF PJe',
          'item': 'https://kagazo.in/br/compressor-pdf-pje-tribunais',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Qual é o tamanho máximo de arquivo aceito pelo PJe nos tribunais?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A Resolução CNJ nº 185/2013 e os atos normativos de cada ramo do Judiciário estipulam tetos distintos: na Justiça do Trabalho (TRT e TST) o limite rígido é de 3,0 MB por arquivo; na Justiça Federal (TRF) o teto comum é de 5,0 MB; e na Justiça Estadual (sistemas e-SAJ, Projudi e TJ) o limite varia entre 5,0 MB e 10,0 MB por anexo.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Os documentos confidenciais do meu cliente são enviados para algum servidor?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. Em estrita observância ao sigilo profissional resguardado pelo Artigo 7º, inciso XIX da Lei nº 8.906/1994 (Estatuto da OAB) e à LGPD (Lei nº 13.709/2018), todo o processamento de compressão e reestruturação do PDF é executado localmente na memória do seu navegador. Nenhum arquivo ou metadado transita por servidores remotos.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que é o padrão PDF/A exigido pelo Judiciário?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O padrão PDF/A (ISO 19005-1) é uma variante especializada do formato PDF voltada para a preservação documental de longo prazo. Ele exige fontes embutidas e ausência de scripts executáveis, garantindo que a petição e os documentos processuais possam ser abertos e lidos com exata fidelidade visual décadas após o protocolo.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Como dividir um PDF que mesmo comprimido ultrapassou o limite do PJe?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Quando o volume de provas documentais for muito extenso (por exemplo, centenas de notas fiscais ou laudos periciais), o advogado deve fracionar os arquivos e nomear os anexos de forma sequencial no PJe (exemplo: "Documento 01 - Parte 1 de 3", "Documento 01 - Parte 2 de 3"), em estrita consonância com o Artigo 13 da Resolução CNJ nº 185/2013.',
          },
        },
      ],
    },
  ],
};

export default function CompressorPdfPjePage() {
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
            <span className="text-slate-200">Compressor PDF PJe</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Scale className="w-3.5 h-3.5" />
              Processo Judicial Eletrônico • Resolução CNJ nº 185/2013 & Lei 11.419/2006
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Compressor de PDF para PJe e Tribunais de Justiça
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Otimize petições e anexos para os limites do PJe (3MB no TRT, 5MB no TRF e 10MB nos TJs) com preservação de nitidez e sigilo advocatício 100% no seu navegador.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regras Oficiais do Peticionamento Eletrônico:</p>
              <p>
                Os sistemas judiciais rejeitam uploads que superem 3MB (TRT/Trabalho), 5MB (TRF/Federal) e 10MB (TJs/Estadual). A otimização desta plataforma atua diretamente na recompressão de objetos internos do PDF sem enviar seus arquivos pela internet, resguardando o sigilo da OAB e da LGPD.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CompressorPdfPjeClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Normas Técnicas de Peticionamento e Envio de Documentos no Judiciário Brasileiro
            </h2>

            <p>
              A informatização do processo judicial brasileiro foi instituída no plano federal pela <strong>Lei nº 11.419, de 19 de dezembro de 2006</strong>. Em 2013, o Conselho Nacional de Justiça uniformizou a arquitetura nacional de tramitação processual através da <strong>Resolução CNJ nº 185/2013</strong>, implementando o sistema nacional do <strong>Processo Judicial Eletrônico (PJe)</strong>.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. Por Que os Tribunais Impõem Limites Rígidos de Tamanho em Megabytes?</h3>
            <p>
              Os tribunais brasileiros processam diariamente milhões de novos atos processuais. Para evitar o colapso dos bancos de dados, ataques de negação de serviço e lentidão extrema na abertura dos autos digitais por magistrados e servidores, os sistemas possuem travas técnicas inflexíveis. Uma petição de 3,01 MB será <em>automaticamente rejeitada</em> pelo gateway do PJe da Justiça do Trabalho, gerando risco iminente de preclusão e intempestividade processual.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Ramo da Justiça</th>
                    <th className="p-2">Sistema Predominante</th>
                    <th className="p-2">Limite Máximo por Arquivo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-white">Justiça do Trabalho (TRTs e TST)</td>
                    <td className="p-2">PJe-JT</td>
                    <td className="p-2 font-mono text-emerald-400 font-bold">Até 3,0 MB por arquivo</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Justiça Federal (TRF1 a TRF6)</td>
                    <td className="p-2">PJe / e-Proc</td>
                    <td className="p-2 font-mono text-emerald-400 font-bold">Até 5,0 MB por arquivo</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Justiça Estadual (TJs de SP, RJ, MG, etc.)</td>
                    <td className="p-2">e-SAJ / Projudi / PJe</td>
                    <td className="p-2 font-mono text-cyan-400 font-bold">De 5,0 MB a 10,0 MB por arquivo</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Tribunais Superiores (STJ e STF)</td>
                    <td className="p-2">Portal STJ / STF Digital</td>
                    <td className="p-2 font-mono text-cyan-400 font-bold">Até 10,0 MB por documento</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">2. O Padrão Arquivístico PDF/A (ISO 19005-1)</h3>
            <p>
              O Artigo 12 da Resolução CNJ nº 185/2013 recomenda expressamente que os documentos digitalizados devam ser gravados no formato <strong>PDF/A</strong>. Diferentemente do PDF comum (que pode referenciar fontes externas instaladas no sistema operacional ou incorporar códigos dinâmicos), o PDF/A é autocontido: todas as fontes tipográficas, paletas de cores e metadados estruturais encontram-se embutidos no próprio arquivo, garantindo legibilidade imutável para os próximos 50 ou 100 anos.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">3. Sigilo Profissional da Advocacia e Conformidade com a LGPD</h3>
            <p>
              O Artigo 7º, inciso XIX da Lei Federal nº 8.906/1994 (Estatuto da OAB) e o Código de Ética e Disciplina da OAB consagram o dever de sigilo inviolável sobre documentos, dados financeiros e informações íntimas confiadas pelo cliente ao patrono da causa.
            </p>
            <p>
              Muitos escritórios violam involuntariamente a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) ao submeter petições com extratos bancários, dados médicos ou depoimentos sensíveis a sites genéricos de compressão em nuvem, cujos servidores estão situados no exterior. O motor desta ferramenta opera com <strong>WebAssembly diretamente na memória local</strong> do dispositivo do operador do direito, sem tráfego de pacotes externos.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">4. Boas Práticas de Fracionamento de Peças Complexas</h3>
            <p>
              Caso uma petição com farto conjunto probatório documental (como perícias de engenharia ou centenas de contratos sociais) supere o limite mesmo após compressão:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fracione o arquivo em volumes contíguos de até 2,8 MB para garantir margem de segurança no upload;</li>
              <li>Nomeie os anexos no sistema exatamente pelo conteúdo e sequência (exemplo: "Contestação - Petição Principal", "Doc. 01 - Procuração e Custas", "Doc. 02 - Laudo Pericial - Parte 1 de 2");</li>
              <li>Evite caracteres especiais, acentos e espaços excessivos no nome do arquivo físico para prevenir erros de codificação no Java do tribunal.</li>
            </ul>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Compressão para o PJe
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>A compressão reduz a legibilidade dos textos e assinaturas da petição?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Não. A otimização atua na reestruturação e compressão de fluxos de objetos repetitivos (object streams) e na limpeza de metadados invisíveis acumulados por editores como o Word. Os textos vetoriais, tipografias e assinaturas digitais preservam 100% de sua nitidez original de leitura.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Qual a resolução de DPI ideal para digitalizar documentos em papel para o PJe?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  A Resolução CNJ nº 185/2013 orienta que documentos em preto e branco sejam escaneados na resolução de 200 a 300 DPI (pontos por polegada). Digitalizações em resoluções exageradas (como 600 ou 1200 DPI) tornam o arquivo excessivamente pesado sem ganho perceptível de legibilidade para o juiz.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O que fazer se o sistema do tribunal cair próximo ao encerramento do prazo fatal?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  O Artigo 10, § 2º da Lei nº 11.419/2006 estabelece que se o sistema do Poder Judiciário se tornar indisponível por motivo técnico no dia do vencimento do prazo, o prazo fica automaticamente prorrogado para o primeiro dia útil seguinte à retomada do funcionamento. É prudente salvar a tela com o relatório oficial de indisponibilidade técnica emitido pelo tribunal.
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
