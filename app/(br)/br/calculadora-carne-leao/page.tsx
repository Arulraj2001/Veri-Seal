import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculadoraCarneLeaoClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Carnê-Leão 2026 | IRPF Autônomo e Dedução de Livro Caixa',
  description:
    'Calcule o imposto mensal do Carnê-Leão (código DARF 0190) para autônomos, médicos, psicólogos, advogados e aluguéis. Deduções oficiais de Livro Caixa, INSS e dependentes segundo o RIR/2018.',
  keywords: [
    'calculadora carne leao 2026',
    'simulador irpf autonomo darf 0190',
    'deducoes livro caixa carne leao',
    'tabela irpf carne leao receita federal',
    'multa isolada 50 carne leao atraso',
    'art 104 rir despesas dedutiveis'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculadora-carne-leao',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculadora-carne-leao',
      'pt': 'https://kagazo.in/br/calculadora-carne-leao',
      'x-default': 'https://kagazo.in/br/calculadora-carne-leao',
    },
  },
  openGraph: {
    title: 'Calculadora de Carnê-Leão 2026 | Simulação IRPF Autônomo Oficial',
    description:
      'Calcule com exatidão o valor do DARF mensal 0190 e descubra a economia real proporcionada pela escrituração do Livro Caixa.',
    url: 'https://kagazo.in/br/calculadora-carne-leao',
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
      'name': 'Calculadora de Carnê-Leão 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador tributário do recolhimento mensal obrigatório do Carnê-Leão para pessoas físicas que recebem de outras pessoas físicas ou do exterior.',
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
          'name': 'Carnê-Leão e Autônomos',
          'item': 'https://kagazo.in/br/calculadora-carne-leao',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Quem é obrigado a pagar o Carnê-Leão mensalmente?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Qualquer pessoa física residente fiscal no Brasil que receba rendimentos tributáveis de outra pessoa física (como honorários de médicos, dentistas, psicólogos, advogados, terapeutas e corretores), pensão alimentícia judicial, rendimentos de aluguéis ou ganhos auferidos no exterior.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Qual é o prazo limite para pagamento do DARF do Carnê-Leão?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O imposto calculado no Carnê-Leão (DARF código 0190) deve ser pago até o último dia útil do mês subsequente àquele em que os rendimentos foram efetivamente recebidos.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Posso deixar para recolher o imposto somente no ajuste anual em abril?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. O recolhimento do Carnê-Leão é uma obrigação tributária mensal estrita. Não recolher o imposto no mês devido e lançar tudo somente na Declaração Anual de Ajuste sujeita o contribuinte à cobrança de multa isolada de 50% sobre o valor não antecipado, além de juros pela taxa Selic.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que pode ser deduzido no Livro Caixa do profissional autônomo?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Conforme o Artigo 104 do Regulamento do Imposto de Renda (RIR/2018), são dedutíveis: aluguel, condomínio e IPTU do imóvel de trabalho, contas de consumo (água, luz, telefone e internet comercial), salários e encargos trabalhistas de funcionários (como recepcionista), despesas com material de consumo e taxas de conselho profissional.',
          },
        },
      ],
    },
  ],
};

export default function CalculadoraCarneLeaoPage() {
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
            <span className="text-slate-200">Carnê-Leão e Autônomos</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              Tributação Federal • Decreto 9.580/2018 (RIR/18) & DARF 0190
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de Carnê-Leão e IRPF Autônomo 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Simule o DARF mensal para honorários autônomos, aluguéis e receitas do exterior. Calcule a economia do Livro Caixa digital e deduções de INSS e dependentes.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra Legal do Carnê-Leão:</p>
              <p>
                O Carnê-Leão é o recolhimento mensal compulsório de rendimentos recebidos de PF ou do exterior, pago via DARF 0190 até o último dia útil do mês seguinte. As despesas operacionais escrituradas no Livro Caixa (Art. 104 do RIR/2018) abatem legalmente a base tributável. O não recolhimento tempestivo gera multa isolada de 50%.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CalculadoraCarneLeaoClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Guia Tributário do Carnê-Leão: Obrigatoriedade, Livro Caixa e Cruzamento e-CAC
            </h2>

            <p>
              O instituto da tributação antecipada mensal, denominado popularmente no Brasil como <strong>Carnê-Leão</strong>, encontra-se disciplinado nos <strong>Artigos 118 a 122 do Decreto nº 9.580/2018 (Regulamento do Imposto sobre a Renda - RIR/2018)</strong> e em Instruções Normativas da Secretaria Especial da Receita Federal do Brasil (RFB). O objetivo do mecanismo é garantir que o contribuinte pessoa física que não sofre retenção periódica na fonte recolha o imposto de renda no mesmo período de competência em que o numerário ingressou em seu patrimônio.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. Quem Está Sujeito ao Carnê-Leão Obrigatório</h3>
            <p>
              Estão sob a égide compulsória do Carnê-Leão:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Profissionais Liberais e Autônomos:</strong> Médicos, dentistas, psicólogos, fonoaudiólogos, fisioterapeutas, advogados, contadores, arquitetos, corretores e engenheiros que prestem serviços diretamente a clientes pessoas físicas;</li>
              <li><strong>Proprietários Locadores:</strong> Pessoas físicas que recebam aluguéis residenciais ou comerciais pagos diretamente por inquilinos pessoas físicas;</li>
              <li><strong>Recebimento de Pensão Alimentícia Judicial:</strong> Alimentandos que recebam importâncias a título de pensão judicial de pessoas físicas;</li>
              <li><strong>Rendimentos do Exterior:</strong> Salários, dividendos, remunerações de trabalho remoto para fora do país e royalties recebidos de fontes sediadas fora do território brasileiro.</li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">2. A Sistemática do Livro Caixa Digital (Art. 104 RIR/2018)</h3>
            <p>
              A legislação confere ao profissional autônomo o privilégio fiscal de escriturar suas despesas operacionais no <strong>Livro Caixa</strong>, deduzindo-as integralmente da receita bruta auferida no mês antes de aplicar a tabela progressiva do imposto:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Categoria de Despesa</th>
                    <th className="p-2">Dedutível?</th>
                    <th className="p-2">Requisitos e Fundamento Legal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-white">Aluguel, Luz, Água e IPTU do Consultório</td>
                    <td className="p-2 font-semibold text-emerald-400">Sim</td>
                    <td className="p-2">Indispensáveis à prestação dos serviços. No caso de home office, a jurisprudência fiscal admite até 1/5 (20%) das despesas da residência caso o local seja exclusivo de atendimento.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Folha de Salários e Encargos da Secretária</td>
                    <td className="p-2 font-semibold text-emerald-400">Sim</td>
                    <td className="p-2">Salário em carteira, 13º salário, férias, FGTS e cota patronal de INSS de auxiliares com vínculo formal.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Anuidade do CRM, OAB, CRO ou CRP</td>
                    <td className="p-2 font-semibold text-emerald-400">Sim</td>
                    <td className="p-2">Contribuições estatutárias compulsórias exigidas pelos respectivos conselhos de classe profissional.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-white">Aquisição de Computadores ou Aparelhos</td>
                    <td className="p-2 font-semibold text-rose-400">Não</td>
                    <td className="p-2">Bens de capital e ativo imobilizado não constituem despesa de custeio corrente, sendo vedada sua dedução no Livro Caixa.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">3. Deduções Pessoais: INSS e Dependentes</h3>
            <p>
              Além das despesas do Livro Caixa, o autônomo pode deduzir:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Previdência Social Oficial (GPS):</strong> A contribuição para o INSS como Contribuinte Individual recolhida no mês abatida em sua integralidade;</li>
              <li><strong>Dependentes Econômicos:</strong> A quantia fixa legal de <strong>R$ 189,59 por dependente</strong> cadastrado;</li>
              <li><strong>Pensão Alimentícia Homologada:</strong> A totalidade das parcelas pagas em cumprimento de decisão judicial ou escritura pública.</li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">4. A Penalidade da Multa Isolada de 50%</h3>
            <p>
              Um dos equívocos mais custosos cometidos por autônomos é postergar o pagamento do Carnê-Leão para o mês de abril do ano seguinte. A Receita Federal cruza os dados bancários (via e-Financeira) e os recibos emitidos na DMED (Declaração de Serviços Médicos e de Saúde) e Dmed/Cartórios.
            </p>
            <p>
              A ausência de recolhimento no prazo (último dia útil do mês seguinte) tipifica falta funcional sujeita à <strong>multa isolada de 50%</strong> sobre o valor do tributo não antecipado, mesmo que o contribuinte venha a incluir o valor na Declaração de Ajuste Anual.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre o Carnê-Leão
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Como gerar a guia DARF do Carnê-Leão para pagamento?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  O programa instalado no computador foi descontinuado pela Receita Federal. O Carnê-Leão é hoje 100% web, acessado diretamente no Centro Virtual de Atendimento (Portal e-CAC) com sua conta Gov.br (nível Prata ou Ouro). O sistema calcula os dados informados e gera a guia DARF com código de barras e QR Code Pix sob o código de receita 0190.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O que acontece se as despesas do Livro Caixa forem maiores que a receita no mês?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  O imposto do mês será zero e o saldo excedente de despesas de Livro Caixa pode ser legalmente transportado para ser compensado nos meses seguintes do mesmo ano-calendário. Todavia, eventual saldo credor de despesas remanescente em 31 de dezembro não pode ser transportado para o ano seguinte.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Médicos e dentistas precisam informar o CPF de cada paciente atendido?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Desde a Instrução Normativa RFB nº 1.531/2014, profissionais da área da saúde (médicos, odontólogos, psicólogos, fisioterapeutas e fonoaudiólogos) são obrigados a individualizar no Carnê-Leão o CPF de cada paciente responsável pelo pagamento de cada consulta ou procedimento clínico realizado.
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
