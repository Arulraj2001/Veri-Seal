import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { CalculoHorasExtrasDsrClient } from './ClientEngine';

export const metadata: Metadata = {
  title: 'Cálculo de Horas Extras e DSR 2026 | Adicional de 50%, 100% e Noturno',
  description:
    'Calcule horas extras de 50% e 100%, adicional noturno (hora reduzida 52m30s) e reflexo exato no DSR (Súmula 172 do TST). Simulador trabalhista oficial atualizado para 2026.',
  keywords: [
    'calculo horas extras clt',
    'simulador horas extras 50 e 100',
    'reflexo dsr sumula 172 tst',
    'calculo adicional noturno clt',
    'divisor jornada 220 200 clt',
    'nova oj 394 tst dsr horas extras'
  ],
  alternates: {
    canonical: 'https://kagazo.in/br/calculo-horas-extras-dsr',
    languages: {
      'pt-BR': 'https://kagazo.in/br/calculo-horas-extras-dsr',
      'pt': 'https://kagazo.in/br/calculo-horas-extras-dsr',
      'x-default': 'https://kagazo.in/br/calculo-horas-extras-dsr',
    },
  },
  openGraph: {
    title: 'Cálculo de Horas Extras e Reflexo no DSR 2026 | Simulador Trabalhista CLT',
    description:
      'Calcule com precisão matemática suas horas extras a 50% e 100%, hora noturna ficta e reflexos no descanso semanal remunerado.',
    url: 'https://kagazo.in/br/calculo-horas-extras-dsr',
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
      'name': 'Calculadora de Horas Extras e DSR 2026',
      'operatingSystem': 'All',
      'applicationCategory': 'BusinessApplication',
      'description': 'Simulador jurídico de horas extras a 50%, 100%, adicional noturno e reflexo no DSR segundo a Súmula 172 do TST e a CLT.',
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
          'name': 'Horas Extras e DSR',
          'item': 'https://kagazo.in/br/calculo-horas-extras-dsr',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Qual é o percentual mínimo da hora extra pela legislação brasileira?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O artigo 7º, inciso XVI da Constituição Federal estipula que a hora extraordinária deve ser remunerada com no mínimo 50% de acréscimo sobre o valor da hora normal em dias úteis. Em domingos e feriados não compensados, a remuneração é de 100% (em dobro), conforme a Lei nº 605/1949.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Como funciona a fórmula oficial de cálculo do DSR sobre horas extras?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Conforme a Súmula 172 do TST e a Lei nº 605/1949, a fórmula oficial é: (Valor Total das Horas Extras do Mês ÷ Número de Dias Úteis) × Número de Domingos e Feriados do Mês. Sábados são considerados dias úteis para fins de divisão do DSR, salvo disposição contrária em convenção coletiva.',
          },
        },
        {
          '@type': 'Question',
          'name': 'O que mudou com a nova redação da OJ 394 da SDI-1 do TST?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O Pleno do Tribunal Superior do Trabalho alterou a redação da OJ 394 em março de 2023. Ficou pacificado que a majoração do valor do DSR decorrente da integração das horas extras habituais repercute, sim, no cálculo de férias, 13º salário, aviso prévio e FGTS, sem configurar bis in idem para os cálculos a partir da data de modulação.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Como funciona a redução da hora noturna na CLT?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'O artigo 73, § 1º da CLT determina que a hora noturna urbana (trabalhada entre 22h e 5h) é computada como tendo 52 minutos e 30 segundos (hora ficta), além de receber um adicional salarial mínimo de 20% sobre a hora diurna.',
          },
        },
      ],
    },
  ],
};

export default function CalculoHorasExtrasDsrPage() {
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
            <span className="text-slate-200">Horas Extras e DSR</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Clock className="w-3.5 h-3.5" />
              Consolidação das Leis do Trabalho • Art. 59 e 73 CLT • Súmula 172 TST
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de Horas Extras e Reflexo no DSR 2026
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Simule o valor exato a receber por horas suplementares a 50%, 100%, adicional noturno com redução ficta e apuração do reflexo no descanso semanal remunerado.
            </p>

            {/* Answer Capsule (GEO) */}
            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-lg text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">Resposta Imediata sobre Horas Extras e DSR:</p>
              <p>
                O valor da hora regular é obtido dividindo o salário contratual pelo divisor da jornada (220 para 44h semanais). Horas em dias úteis recebem 50% de adicional e domingos/feriados 100%. Por força da Súmula 172 do TST, as horas extras habituais obrigatoriamente refletem sobre o DSR através da fórmula: (Total das Extras ÷ Dias Úteis) × Domingos e Feriados.
              </p>
            </div>
          </header>

          {/* Interactive Client Engine */}
          <CalculoHorasExtrasDsrClient />

          {/* Middle Ad */}
          <AdSlot slot="in_content" context="legal" />

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Manual Legal das Horas Suplementares: Divisores, Adicionais e Jurisprudência
            </h2>

            <p>
              A jornada normal de trabalho fixada pela Constituição da República Federativa do Brasil de 1988 (Art. 7º, XIII) possui limite máximo de 8 horas diárias e 44 horas semanais. O labor prestado além dessa baliza horária constitui serviço extraordinário, regido pelo Artigo 59 da CLT e acompanhado de expressiva jurisprudência protetiva emanada do Tribunal Superior do Trabalho (TST).
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">1. Como Identificar o Divisor Salarial Correto</h3>
            <p>
              O divisor salarial é o coeficiente aritmético utilizado para transformar o salário mensal do empregado no valor de uma hora individual de trabalho:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Jornada de 44 horas semanais:</strong> Divisor <strong>220</strong> (44h ÷ 6 dias úteis × 30 dias do mês comercial).</li>
              <li><strong>Jornada de 40 horas semanais:</strong> Divisor <strong>200</strong> (40h ÷ 6 dias úteis × 30 dias).</li>
              <li><strong>Jornada de 36 horas semanais:</strong> Divisor <strong>180</strong> (frequente em regime de turnos ininterruptos de revezamento).</li>
              <li><strong>Jornada de 30 horas semanais:</strong> Divisor <strong>150</strong> (comum em contratos bancários ou de teleatendimento).</li>
            </ul>

            <h3 className="text-lg font-semibold text-emerald-400">2. Percentuais Legais e Normas Coletivas (50% e 100%)</h3>
            <p>
              A legislação federal prevê pisos percentuais inegociáveis para a remuneração das horas suplementares:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-600 bg-slate-900/50 text-slate-200">
                    <th className="p-2">Tipo de Hora Extra</th>
                    <th className="p-2">Adicional Mínimo</th>
                    <th className="p-2">Fundamento Legal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="p-2">Dias úteis ordinários (Seg a Sáb)</td>
                    <td className="p-2 font-semibold text-emerald-400">+50% (Valor × 1,5)</td>
                    <td className="p-2">Art. 7º, XVI da CF/88 e Art. 59, § 1º CLT</td>
                  </tr>
                  <tr>
                    <td className="p-2">Domingos e Feriados não compensados</td>
                    <td className="p-2 font-semibold text-amber-400">+100% (Valor × 2,0)</td>
                    <td className="p-2">Art. 9º da Lei nº 605/1949 e Súmula 146 TST</td>
                  </tr>
                  <tr>
                    <td className="p-2">Horas Noturnas (22h às 5h)</td>
                    <td className="p-2 font-semibold text-cyan-400">+20% cumulativo</td>
                    <td className="p-2">Art. 73 da CLT (cumula com os 50% ou 100%)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-emerald-400">3. A Mecânica do DSR e a Histórica Mudança da OJ 394 TST</h3>
            <p>
              O Descanso Semanal Remunerado (DSR) é previsto pela Lei nº 605/1949. O trabalhador mensalista já tem seus repousos semanais remunerados embutidos no salário de 30 dias. Porém, ao prestar horas extras nos dias úteis, o trabalhador aumenta sua produção e o seu cansaço semanal.
            </p>
            <p>
              Por esse motivo, a <strong>Súmula nº 172 do TST</strong> impõe que <em>"Computam-se no cálculo do repouso remunerado as horas extraordinárias habitualmente prestadas"</em>.
            </p>
            <p>
              <strong>Impacto do Julgamento do TST (IRR-10169-57.2013.5.05.0024):</strong> Durante anos, a OJ 394 vedava a soma do DSR majorado pelas horas extras na base de cálculo de férias, 13º e FGTS (alegando repetição indevida de cálculos). Em decisão paradigmática de 2023, o Tribunal Pleno reverteu seu entendimento: o DSR sobre horas extras agora <strong>repercute expressamente</strong> nas parcelas contratuais e rescisórias para o período posterior à modulação dos efeitos.
            </p>

            <h3 className="text-lg font-semibold text-emerald-400">4. Trabalho Noturno Urbano e a Redução Ficta (Art. 73 CLT)</h3>
            <p>
              No trabalho urbano compreendido entre 22:00 horas e 05:00 horas, o legislador consagrou o instituto da hora noturna reduzida. Cada hora noturna de relógio é contabilizada legalmente como 52 minutos e 30 segundos. Na prática, uma hora cheia de 60 minutos trabalhada à noite corresponde a aproximadamente <strong>1,14285 horas pagas</strong>, além do adicional de 20%.
            </p>
          </article>

          {/* FAQ Accordion Section */}
          <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Perguntas Frequentes sobre Horas Extras e DSR
            </h2>
            <div className="space-y-3 text-sm">
              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>O sábado é considerado dia útil para a fórmula de DSR?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. De acordo com a jurisprudência dominante do TST e a Lei 605/1949, o sábado é dia útil não trabalhado (dia útil remunerado). Portanto, ele entra no divisor de dias úteis da fórmula, exceto quando houver previsão expressa contrária em Acordo ou Convenção Coletiva de Trabalho classificando o sábado como dia de repouso semanal remunerado (comum em categorias bancárias).
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Horas extras eventuais geram direito ao DSR?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Sim. Mesmo que a prestação ocorra em semanas isoladas do mês, todas as horas extras realizadas no respectivo período de apuração geram o correspondente reflexo pecuniário no DSR daquele mesmo mês. A habitualidade é requisito para a integração em verbas futuras (férias e 13º), mas o DSR do mês é devido sempre.
                </p>
              </details>

              <details className="group bg-slate-900/60 p-4 rounded-lg border border-slate-700/40">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  <span>Banco de horas anula o pagamento de horas extras a 50%?</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm">
                  Se houver regime válido de banco de horas (individual até 6 meses ou coletivo até 1 ano, conforme Art. 59, § 2º e § 5º da CLT), as horas excedentes podem ser compensadas com folgas. No entanto, se o saldo positivo não for integralmente compensado no prazo limite estipulado, as horas remanescentes devem ser quitadas em dinheiro com o adicional legal de 50% ou superior.
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
