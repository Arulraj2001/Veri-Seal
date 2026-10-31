import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { Foto3x4DocumentosClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Gerador de Foto 3x4 Online 2026 | Documentos, CIN e Passaporte PF',
  description:
    'Crie e enquadre fotos 3x4 cm e 5x7 cm em alta resolução (300 DPI) para o novo RG (CIN), CNH e Passaporte da Polícia Federal (padrão ICAO Doc 9303). Gere folha 10x15 para imprimir.',
  keywords: [
    'gerador foto 3x4 online gratis',
    'foto 3x4 para imprimir 10x15',
    'foto 3x4 carteira de identidade nacional cin',
    'foto passaporte policia federal icao 9303',
    'dimensoes foto 3x4 300 dpi pixels',
    'foto 5x7 visto americano passaporte'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/foto-3x4-documentos-passaporte',
    languages: {
      'pt-BR': 'https://kagazo.in/br/foto-3x4-documentos-passaporte',
      'pt': 'https://kagazo.in/br/foto-3x4-documentos-passaporte',
      'x-default': 'https://kagazo.in/br/foto-3x4-documentos-passaporte',
    },
  },
  openGraph: {
    title: 'Gerador de Foto 3x4 e Passaporte Brasileiro Online (300 DPI)',
    description:
      'Enquadre perfeitamente sua foto 3x4 e 5x7 cm com fundo branco e proporção biométrica oficial. Exporte individualmente ou em grade para impressão 10x15 cm.',
    url: 'https://kagazo.in/br/foto-3x4-documentos-passaporte',
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
      'name': 'Gerador de Foto 3x4 para Documentos 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'MultimediaApplication',
      'description': 'Ferramenta biométrica online de recorte, enquadramento e preparação de fotos 3x4 cm e 5x7 cm a 300 DPI conforme padrão ICAO Doc 9303.',
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
          'name': 'Foto 3x4 para Documentos',
          'item': 'https://kagazo.in/br/foto-3x4-documentos-passaporte',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Quais são as dimensões em pixels de uma foto 3x4 a 300 DPI?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Uma foto 3x4 cm impressa na resolução fotográfica padrão de 300 DPI possui exatamente 354 pixels de largura por 472 pixels de altura. Já a foto 5x7 cm possui 591 pixels de largura por 827 pixels de altura.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quais são as regras biométricas para fotos da Carteira de Identidade Nacional (CIN)?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Conforme o Decreto nº 10.977/2022, a foto deve possuir fundo branco e liso, iluminação homogênea sem reflexos ou sombras, cabeça centralizada ocupando entre 70% e 80% da altura da foto, rosto frontal e olhos abertos sem óculos escuros ou adereços que cubram traços fisionômicos.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Minha foto é enviada para algum servidor externo?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. O processamento da imagem (recorte, dimensionamento a 300 DPI e montagem da grade na folha 10x15 cm) é executado 100% de forma local na memória do navegador do seu dispositivo através do Canvas HTML5, garantindo total privacidade biométrica.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Como imprimir as fotos 3x4 geradas na folha 10x15 cm?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Basta salvar o arquivo da folha 10x15 cm gerado pela ferramenta (que contém 6 fotos 3x4 com linhas de corte) e enviá-lo para impressão fotográfica avulsa no tamanho padrão 10x15 cm (4x6 polegadas) em qualquer laboratório fotográfico, quiosque de shopping ou farmácia.',
          },
        },
      ],
    },
  ],
};

export default function Foto3x4DocumentosPage() {
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
            <span className="text-slate-200">Foto 3x4 para Documentos</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Camera className="w-3.5 h-3.5" />
              Padrão Biométrico ICAO Doc 9303 • Decreto 10.977/2022 (CIN)
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Gerador de Foto 3x4 para Documentos e Passaporte
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Enquadre fotos nos padrões oficiais brasileiros para a nova Carteira de Identidade (CIN), CNH e Passaporte da Polícia Federal. Exporte em 300 DPI ou em cartela 10x15 cm para impressão.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra de Formato e Resolução Biometria Brasil:</p>
              <p>
                A foto 3x4 cm oficial deve possuir 354 &times; 472 pixels na resolução fotográfica de 300 DPI com fundo branco puro. A face deve ocupar entre 70% e 80% do quadro vertical (do queixo à ponta superior do cabelo). Processamento 100% privado no seu navegador.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <Foto3x4DocumentosClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Especificações Técnicas Oficiais da Fotografia para Documentos no Brasil
            </h2>

            <p>
              A fotografia impressa ou digital destinada a documentos de identificação civil no Brasil é submetida a exigências rigorosas de padronização biométrica, fundamentadas nas recomendações da <strong>Organização da Aviação Civil Internacional (ICAO - Documento 9303)</strong>, no <strong>Decreto Federal nº 10.977/2022</strong> (que regulamentou a nova Carteira de Identidade Nacional - CIN) e nas <strong>Resoluções do Conselho Nacional de Trânsito (CONTRAN)</strong> para a CNH.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. Tabela de Dimensões e Resoluções Gráficas (300 DPI)</h3>
            <p>
              Para que uma fotografia impressa possua nitidez aceita pelos scanners de captura dos órgãos estaduais e federais (Polícia Civil, Polícia Federal e DETRAN), ela deve ser gerada estritamente na densidade mínima de 300 pontos por polegada (DPI):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Formato Fotográfico</th>
                    <th className="p-2">Medida em Milímetros</th>
                    <th className="p-2">Tamanho em Pixels (300 DPI)</th>
                    <th className="p-2">Finalidade Principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-white">Foto 3x4 cm</td>
                    <td className="p-2">30 mm &times; 40 mm</td>
                    <td className="p-2 font-mono text-emerald-400 font-bold">354 &times; 472 pixels</td>
                    <td className="p-2">Carteira de Identidade Nacional (CIN), RG, CNH, Carteira Profissional (OAB/CRM)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Foto 5x7 cm</td>
                    <td className="p-2">50 mm &times; 70 mm</td>
                    <td className="p-2 font-mono text-emerald-400 font-bold">591 &times; 827 pixels</td>
                    <td className="p-2">Vistos consulares estrangeiros, certidões militares e passaporte internacional</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Folha 10x15 cm</td>
                    <td className="p-2">100 mm &times; 150 mm</td>
                    <td className="p-2 font-mono text-emerald-400 font-bold">1181 &times; 1772 pixels</td>
                    <td className="p-2">Cartela de impressão econômica contendo 6 fotos 3x4 com guias de corte</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">2. Enquadramento Biométrico e Expressão Facial</h3>
            <p>
              Os algoritmos de reconhecimento facial utilizados na emissão de documentos oficiais exigem rigor nos seguintes pontos:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Proporção da Cabeça:</strong> O rosto (da ponta do queixo ao topo do crânio) deve ocupar entre <strong>70% e 80%</strong> da altura vertical total da imagem;</li>
              <li><strong>Posição Frontal:</strong> O candidato deve estar rigorosamente voltado para a frente, com a linha dos olhos paralela ao eixo horizontal da foto (sem inclinação para os lados);</li>
              <li><strong>Expressão Neutra:</strong> Boca fechada, sem sorrisos evidentes e olhos bem abertos olhando diretamente para a câmera;</li>
              <li><strong>Iluminação e Fundo:</strong> Fundo branco puro e uniforme, livre de sombras no rosto ou no fundo e sem superexposição que queime traços da bochecha e nariz.</li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">3. Vedações e Acessórios</h3>
            <p>
              Os manuais da Polícia Federal e dos Institutos de Identificação determinam:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Óculos:</strong> Não são admitidos óculos com lentes escuras ou coloridas. Recomenda-se remover até mesmo óculos de grau caso a armação oculte parte das sobrancelhas ou cause reflexo nas lentes;</li>
              <li><strong>Cobertura de Cabeça:</strong> Chapéus, bonés, gorros e bandanas são proibidos. Coberturas religiosas (como véus, turbantes ou hijabs) são permitidas desde que deixem a totalidade da face (do queixo à testa e ambas as maçãs do rosto) plenamente visível.</li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">4. Economia Prática com a Cartela 10x15 cm</h3>
            <p>
              A impressão avulsa de um pacote de fotos 3x4 em lojas de fotografia costuma custar entre R$ 25,00 e R$ 45,00. Utilizando a opção <strong>Folha 10x15 cm</strong> desta plataforma, o usuário faz o download de um arquivo padronizado contendo 6 fotos 3x4 com linhas de corte cinza claro. Ao levar esse arquivo em um pen drive ou enviar por aplicativo para quiosques de revelação fotográfica digital ou farmácias, a impressão sai por aproximadamente R$ 1,50 a R$ 3,00, gerando economia superior a 90%.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Foto 3x4
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Qual o tipo de papel fotográfico recomendado para imprimir as fotos?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Recomenda-se papel fotográfico brilhante (glossy) ou semi-brilho (matte) de alta gramatura (mínimo de 180 g/m² a 230 g/m²). Papel sulfite comum não é aceito pelos postos do Poupatempo, Polícia Civil ou DETRAN.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Posso tirar a foto em casa com meu smartphone?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Posicione-se a cerca de 1,5 a 2 metros de distância de uma parede branca bem iluminada durante o dia (próximo a uma janela, com luz natural incidindo de frente sobre o rosto para evitar sombras abaixo do queixo e nariz). Em seguida, faça o upload na ferramenta para fazer o enquadramento exato e aplicar o fundo branco.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Bebês e crianças de colo precisam seguir as mesmas regras?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Para bebês e crianças de até 5 anos, os órgãos aceitam pequenas variações na expressão, mas a foto deve ter fundo branco puro, a criança deve estar acordada, com os olhos visíveis e sem mãos, brinquedos, chupetas ou corpos dos pais aparentes no enquadramento.
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
