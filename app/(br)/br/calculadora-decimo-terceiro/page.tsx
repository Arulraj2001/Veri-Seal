import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Gift, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculadoraDecimoTerceiroClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora do Décimo Terceiro Salário 2026 | 1ª e 2ª Parcelas Líquidas',
  description:
    'Calcule o 13º salário com exatidão: simule a 1ª parcela (sem descontos até 30/nov) e a 2ª parcela (com INSS e IRRF até 20/dez), proporcionalidade de avos e média de horas extras.',
  keywords: [
    'calculadora decimo terceiro 2026',
    'calculo 13 salario liquido clt',
    'primeira parcela decimo terceiro',
    'segunda parcela decimo terceiro descontos',
    'lei 4090 62 gratificacao natalina',
    'prazo pagamento decimo terceiro'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculadora-decimo-terceiro',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculadora-decimo-terceiro',
      'pt': 'https://kagazo.in/br/calculadora-decimo-terceiro',
      'x-default': 'https://kagazo.in/br/calculadora-decimo-terceiro',
    },
  },
  openGraph: {
    title: 'Calculadora de Décimo Terceiro Salário 2026 | Simulação CLT Oficial',
    description:
      'Descubra quanto você vai receber na 1ª e 2ª parcelas do 13º salário com dedução oficial de INSS e IRRF retidos na fonte.',
    url: 'https://kagazo.in/br/calculadora-decimo-terceiro',
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
      'name': 'Calculadora de Décimo Terceiro Salário 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador trabalhista da Gratificação Natalina (13º salário) segundo as Leis 4.090/62 e 4.749/65, com apuração de 1ª e 2ª parcelas e tributação exclusiva.',
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
          'name': 'Décimo Terceiro Salário',
          'item': 'https://kagazo.in/br/calculadora-decimo-terceiro',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Quais são as datas limites para o pagamento do 13º salário?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Pela Lei nº 4.749/1965, a 1ª parcela deve ser quitada entre 1º de fevereiro e 30 de novembro de cada ano (ou por ocasião das férias, se solicitado em janeiro). A 2ª parcela deve ser paga obrigatoriamente até o dia 20 de dezembro.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Por que a 1ª parcela não tem descontos e a 2ª parcela vem com valor menor?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A legislação estabelece que a 1ª parcela corresponde a um adiantamento puro de 50% do salário bruto devido. A apuração tributária (INSS e IRRF) incide de forma definitiva sobre o valor total do 13º e é descontada integralmente na 2ª parcela, razão pela qual o valor líquido de dezembro é sempre substancialmente menor.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quantos dias no mês preciso trabalhar para garantir o direito a 1/12 avos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Conforme o Artigo 1º, § 2º da Lei nº 4.090/1962, a fração igual ou superior a 15 (quinze) dias trabalhados no mês civil confere o direito a 1/12 avos da gratificação natalina.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O 13º salário é somado aos rendimentos mensais na declaração do IRPF?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Não. O 13º salário é sujeito à tributação exclusiva na fonte. O imposto retido em dezembro é definitivo e não pode ser restituído nem gera cobrança adicional na Declaração de Ajuste Anual.',
          },
        },
      ],
    },
  ],
};

export default function CalculadoraDecimoTerceiroPage() {
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
            <span className="text-slate-200">Décimo Terceiro Salário</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Gift className="w-3.5 h-3.5" />
              Gratificação Natalina • Lei 4.090/1962 & Lei 4.749/1965
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora do Décimo Terceiro Salário 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Simule detalhadamente o valor líquido das duas parcelas do 13º salário, considerando a proporcionalidade de meses trabalhados, médias salariais e alíquotas oficiais de INSS e IRRF retidas na fonte.
            </p>

            {/* Answer Capsule (GEO Optimization) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Regra de Ouro do 13º Salário no Brasil:</p>
              <p>
                A primeira parcela (50% do bruto) é paga até 30 de novembro sem nenhum desconto previdenciário ou tributário. A segunda parcela é paga até 20 de dezembro e suporta a totalidade das deduções de INSS progressivo e IRRF sobre a soma total da gratificação natalina.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CalculadoraDecimoTerceiroClient />

          {/* Middle In-Content Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Guia Completo da Gratificação Natalina: Prazos, Frações e Deduções Fiscais
            </h2>

            <p>
              A Gratificação de Natal, consagrada no vocabulário nacional como <strong>13º Salário</strong>, foi introduzida no ordenamento jurídico brasileiro pela Lei nº 4.090, sancionada em 13 de julho de 1962, e complementada pela Lei nº 4.749/1965 e Decreto nº 57.155/1965. Trata-se de uma obrigação legal irrenunciável devida a todos os trabalhadores urbanos, rurais e domésticos regidos pela Consolidação das Leis do Trabalho (CLT).
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. A Regra dos 15 Dias e a Proporcionalidade de Avos</h3>
            <p>
              O direito à gratificação integral (12/12 avos) é adquirido quando o trabalhador mantém vínculo empregatício ininterrupto ao longo de todo o ano civil (de 1º de janeiro a 31 de dezembro). Caso tenha sido admitido no curso do ano ou tenha sofrido rescisão, a remuneração é proporcional:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Fração Igual ou Superior a 15 Dias (Art. 1º, § 2º Lei 4.090/62):</strong> Cada mês em que o colaborador trabalhou pelo menos 15 dias confere o direito a 1/12 (um doze avos) do salário devido em dezembro.
              </li>
              <li>
                <strong>Trabalho Inferior a 15 Dias:</strong> Caso o empregado seja admitido no dia 18 de um mês com 30 dias, por exemplo, ele terá laborado apenas 13 dias naquele mês, não perfazendo a fração legal para aquele mês específico.
              </li>
              <li>
                <strong>Faltas Injustificadas no Mês:</strong> Se as faltas injustificadas no decorrer de um mesmo mês civil somarem mais de 15 dias, o colaborador perderá o avo correspondente àquele período de apuração.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">2. Divisão Obrigatória em Duas Parcelas</h3>
            <p>
              A Lei nº 4.749/1965 veda expressamente o pagamento do 13º salário em parcela única no mês de dezembro, instituindo um cronograma bipartido de desembolso:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Parcela</th>
                    <th className="p-2">Prazo Limite de Quitação</th>
                    <th className="p-2">Composição e Descontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2 font-semibold text-emerald-400">1ª Parcela (Adiantamento)</td>
                    <td className="p-2">Entre 01/fev e 30/nov</td>
                    <td className="p-2">Exatamente 50% do valor apurado. <strong>Sem nenhum desconto</strong> de INSS ou IRRF. FGTS (8%) é recolhido pelo empregador.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-cyan-400">2ª Parcela (Quitação)</td>
                    <td className="p-2">Até 20 de dezembro</td>
                    <td className="p-2">Valor bruto total menos a 1ª parcela adiantada, subtraídos os descontos integrais de INSS e IRRF da totalidade do benefício.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">3. Integração de Variáveis e Médias Salariais (Súmula 45 TST)</h3>
            <p>
              A base de cálculo da gratificação natalina não se restringe ao salário base fixado em carteira. Conforme a <strong>Súmula nº 45 do TST</strong>, a remuneração de serviço suplementar, habitualmente prestado, integra o cálculo da gratificação natalina.
            </p>
            <p>
              Portanto, todas as parcelas de natureza contraprestativa habitual integram a média duodecimal apurada entre janeiro e novembro (com ajuste complementar em janeiro seguinte para apuração das variáveis de dezembro):
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Média das horas extras prestadas ao longo do período;</li>
              <li>Média do adicional noturno e das horas noturnas reduzidas;</li>
              <li>Adicionais de insalubridade e de periculosidade contratuais;</li>
              <li>Comissões, percentagens e gratificações de função habituais.</li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">4. Tributação Exclusiva na Fonte e Multas por Descumprimento</h3>
            <p>
              O Decreto nº 9.580/2018 (Regulamento do Imposto sobre a Renda) e a legislação da Previdência Social consolidam que a gratificação natalina sofre retenção tributária com caráter <strong>exclusivo na fonte</strong>. O valor recolhido no dia 20 de dezembro encerra a obrigação tributária do empregado perante o Fisco quanto a essa receita, não se sujeitando a compensação de deduções na apuração anual ordinária.
            </p>
            <p>
              O descumprimento dos prazos de quitação estipulados sujeita a empresa a auto de infração lavrado pela fiscalização do Ministério do Trabalho e Emprego (MTE), gerando multa administrativa por empregado prejudicado, sem prejuízo de incidência de juros e correção monetária.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre o 13º Salário
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>A empresa pode pagar o 13º salário em uma única parcela em dezembro?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Não. A Lei nº 4.749/1965 estabelece taxativamente a obrigatoriedade do adiantamento da 1ª parcela até 30 de novembro. O pagamento integral em cota única somente em dezembro constitui infração administrativa trabalhista e sujeita o empregador a autuação pelos auditores fiscais do MTE.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Quem foi demitido por justa causa tem direito ao 13º salário proporcional?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Não. O Artigo 3º da Lei nº 4.090/1962 estabelece expressamente que a demissão decorrente de falta grave com justa causa (Art. 482 da CLT) acarreta a perda total do direito ao recebimento do 13º salário proporcional. No entanto, qualquer outro tipo de desligamento (sem justa causa, pedido de demissão, término de contrato a termo ou rescisão indireta) preserva integralmente o direito ao recebimento dos avos proporcionais.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O empregado afastado por auxílio-doença recebe o 13º de quem?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Durante os primeiros 15 dias de afastamento médico, a responsabilidade do pagamento proporcional do 13º cabe ao empregador. A partir do 16º dia, quando tem início o benefício do INSS (auxílio por incapacidade temporária), a responsabilidade pelo pagamento proporcional da gratificação natalina correspondente àquele período de afastamento é transferida à Previdência Social através do Abono Anual previdenciário.
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
