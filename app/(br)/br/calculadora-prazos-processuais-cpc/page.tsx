'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  ShieldCheck,
  RotateCcw,
  Clock,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface DiaContagem {
  data: Date;
  dataStr: string;
  diaSemana: string;
  tipo: 'util' | 'fim_de_semana' | 'feriado' | 'recesso' | 'inicio';
  descricao: string;
  numeroDiaUtil?: number;
}

interface PrazoResult {
  dataDisponibilizacao: Date;
  dataPublicacaoEfetiva: Date;
  dataInicioContagem: Date;
  dataTermoFatal: Date;
  diasCorridosTotais: number;
  diasUteisTotais: number;
  cronologia: DiaContagem[];
}

// Feriados Nacionais Fixos no Brasil
const FERIADOS_FIXOS = [
  { mes: 0, dia: 1, nome: 'Confraternização Universal' },
  { mes: 3, dia: 21, nome: 'Tiradentes' },
  { mes: 4, dia: 1, nome: 'Dia do Trabalhador' },
  { mes: 8, dia: 7, nome: 'Independência do Brasil' },
  { mes: 9, dia: 12, nome: 'Nossa Senhora Aparecida' },
  { mes: 10, dia: 2, nome: 'Finados' },
  { mes: 10, dia: 15, nome: 'Proclamação da República' },
  { mes: 10, dia: 20, nome: 'Dia da Consciência Negra (Lei 14.759/23)' },
  { mes: 11, dia: 25, nome: 'Natal' },
];

function ehDiaRecessoForense(d: Date): boolean {
  // Art. 220 CPC: 20 de dezembro a 20 de janeiro
  const mes = d.getMonth();
  const dia = d.getDate();
  if (mes === 11 && dia >= 20) return true;
  if (mes === 0 && dia <= 20) return true;
  return false;
}

function ehFeriadoNacional(d: Date): string | null {
  const mes = d.getMonth();
  const dia = d.getDate();
  const achou = FERIADOS_FIXOS.find((f) => f.mes === mes && f.dia === dia);
  return achou ? achou.nome : null;
}

function ehFimDeSemana(d: Date): boolean {
  const diaSemana = d.getDay();
  return diaSemana === 0 || diaSemana === 6; // Domingo = 0, Sábado = 6
}

function ehDiaUtil(d: Date): boolean {
  if (ehFimDeSemana(d)) return false;
  if (ehFeriadoNacional(d)) return false;
  if (ehDiaRecessoForense(d)) return false;
  return true;
}

export default function CalculadoraPrazosCpcPage() {
  const hoje = new Date().toISOString().split('T')[0];
  const [dataDisponibilizacao, setDataDisponibilizacao] = React.useState<string>(hoje);
  const [prazoDias, setPrazoDias] = React.useState<number>(15);
  const [tipoParte, setTipoParte] = React.useState<'comum' | 'dobro'>('comum'); // Fazenda/Defensoria Art. 183/186

  const prazosComuns = [
    { label: '15 dias (Apelação / Contestação)', dias: 15 },
    { label: '5 dias (Embargos de Declaração)', dias: 5 },
    { label: '10 dias (Agravo de Instrumento)', dias: 10 },
    { label: '8 dias (Recurso Trabalhista)', dias: 8 },
  ];

  const calcularPrazo = React.useCallback((): PrazoResult => {
    const dataDisp = new Date(`${dataDisponibilizacao}T12:00:00`);
    const diasAlvo = tipoParte === 'dobro' ? prazoDias * 2 : prazoDias;

    // 1. Data de Publicação Oficial (Art. 224 §2º CPC): primeiro dia útil subsequente
    let curr = new Date(dataDisp);
    curr.setDate(curr.getDate() + 1);
    while (!ehDiaUtil(curr)) {
      curr.setDate(curr.getDate() + 1);
    }
    const dataPub = new Date(curr);

    // 2. Data de Início da Contagem (Art. 224 §3º CPC): primeiro dia útil após a publicação
    curr.setDate(curr.getDate() + 1);
    while (!ehDiaUtil(curr)) {
      curr.setDate(curr.getDate() + 1);
    }
    const dataInicio = new Date(curr);

    // 3. Contagem dos dias úteis
    const cronologia: DiaContagem[] = [];
    let diasContados = 0;
    let dataCursor = new Date(dataInicio);

    while (diasContados < diasAlvo) {
      const dataStr = dataCursor.toLocaleDateString('pt-BR');
      const diaSemanaNome = dataCursor.toLocaleDateString('pt-BR', { weekday: 'short' });
      const feriadoNome = ehFeriadoNacional(dataCursor);
      const recesso = ehDiaRecessoForense(dataCursor);
      const fds = ehFimDeSemana(dataCursor);

      if (recesso) {
        cronologia.push({
          data: new Date(dataCursor),
          dataStr,
          diaSemana: diaSemanaNome,
          tipo: 'recesso',
          descricao: 'Suspensão: Recesso Forense (Art. 220 CPC)',
        });
      } else if (feriadoNome) {
        cronologia.push({
          data: new Date(dataCursor),
          dataStr,
          diaSemana: diaSemanaNome,
          tipo: 'feriado',
          descricao: `Feriado Nacional: ${feriadoNome}`,
        });
      } else if (fds) {
        cronologia.push({
          data: new Date(dataCursor),
          dataStr,
          diaSemana: diaSemanaNome,
          tipo: 'fim_de_semana',
          descricao: 'Fim de semana (Art. 219 CPC)',
        });
      } else {
        diasContados++;
        cronologia.push({
          data: new Date(dataCursor),
          dataStr,
          diaSemana: diaSemanaNome,
          tipo: 'util',
          descricao: `Dia útil processual`,
          numeroDiaUtil: diasContados,
        });
      }

      if (diasContados < diasAlvo) {
        dataCursor.setDate(dataCursor.getDate() + 1);
      }
    }

    const dataTermoFatal = new Date(dataCursor);
    const diferencaMs = dataTermoFatal.getTime() - dataDisp.getTime();
    const diasCorridosTotais = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    return {
      dataDisponibilizacao: dataDisp,
      dataPublicacaoEfetiva: dataPub,
      dataInicioContagem: dataInicio,
      dataTermoFatal,
      diasCorridosTotais,
      diasUteisTotais: diasAlvo,
      cronologia,
    };
  }, [dataDisponibilizacao, prazoDias, tipoParte]);

  const res = calcularPrazo();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org FAQ & SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'Calculadora de Prazos Processuais Novo CPC 2015 em Dias Úteis',
                applicationCategory: 'LegalApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'BRL',
                },
                description:
                  'Contagem de prazos processuais em dias úteis conforme Art. 219, Art. 224 e Art. 220 do CPC/2015. Exclusão do dia de início, recesso forense e feriados nacionais.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Como se inicia a contagem de um prazo no Novo CPC?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Conforme o Art. 224 do CPC/2015, exclui-se o dia do começo e inclui-se o do vencimento. Quando a intimação ocorre via Diário da Justiça Eletrônico (DJe), considera-se data da publicação o primeiro dia útil seguinte ao da disponibilização, e o prazo começa a correr no primeiro dia útil subsequente à publicação.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'O que é o recesso forense do Art. 220 do CPC?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'O Art. 220 do Código de Processo Civil determina que suspende-se o curso do prazo processual nos dias compreendidos entre 20 de dezembro e 20 de janeiro inclusive. Durante esse período, não se realizam audiências nem julgamentos colegiados.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/br" className="hover:text-emerald-700 transition">
            Brasil
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Calculadora de Prazos Processuais CPC</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            Novo CPC (Lei nº 13.105/15) • Art. 219 & 220
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculadora de Prazos Processuais CPC
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Contagem em dias úteis com exclusão do dia de início, recesso de final de ano (20/dez a 20/jan) e regras do DJe.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Parâmetros da Intimação
            </h2>

            {/* Data de Disponibilização no DJe */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Data de Disponibilização no DJe / Portal
              </label>
              <input
                type="date"
                value={dataDisponibilizacao}
                onChange={(e) => setDataDisponibilizacao(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-500 mt-1 block">
                Data em que a publicação apareceu na edição eletrônica do diário.
              </span>
            </div>

            {/* Atalhos de Prazos Comuns */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Prazos Frequentes do CPC
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {prazosComuns.map((item) => (
                  <button
                    key={item.dias}
                    type="button"
                    onClick={() => setPrazoDias(item.dias)}
                    className={`p-2.5 rounded-xl border text-left font-medium transition ${
                      prazoDias === item.dias
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Dias Customizados */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Quantidade de Dias de Prazo
              </label>
              <input
                type="number"
                min="1"
                max="180"
                value={prazoDias || ''}
                onChange={(e) => setPrazoDias(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Prerrogativa de Prazo em Dobro */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Prerrogativa Especial de Prazo
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setTipoParte('comum')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    tipoParte === 'comum'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Advocacia Privada (Prazo Simples)
                </button>
                <button
                  type="button"
                  onClick={() => setTipoParte('dobro')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    tipoParte === 'dobro'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Fazenda / Defensoria / MP (Prazo em Dobro)
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Vencimento do Prazo</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {res.diasUteisTotais} dias úteis
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block">
                  Data Limite Fatal (Dies Ad Quem)
                </span>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white capitalize">
                  {res.dataTermoFatal.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Duração total corrida:</span>
                  <span className="font-bold text-emerald-400">{res.diasCorridosTotais} dias corridos</span>
                </div>
              </div>

              {/* Marcos Processuais */}
              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Disponibilização no DJe:</span>
                  <span className="font-semibold text-slate-900">
                    {res.dataDisponibilizacao.toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Publicação Efetiva (Art. 224 §2º):</span>
                  <span className="font-semibold text-slate-900">
                    {res.dataPublicacaoEfetiva.toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Início da Contagem (Art. 224 §3º):</span>
                  <span className="font-semibold text-emerald-700 font-bold">
                    {res.dataInicioContagem.toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Contagem de Dias:</span>
                  <span className="font-semibold text-slate-900">Estritamente dias úteis (Art. 219)</span>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-emerald-50/70 border border-emerald-100 text-emerald-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Segurança nos Prazos
              </div>
              <p className="text-emerald-800">
                Verifique sempre feriados locais, emendas de feriado ou portarias de suspensão de expediente baixadas pela presidência do seu tribunal específico.
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Placement */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              A Revolução dos Prazos em Dias Úteis no CPC/2015
            </h2>
            <p>
              Uma das maiores conquistas da advocacia com a promulgação da <strong>Lei Federal nº 13.105/2015 (Código de Processo Civil)</strong> foi a instituição da contagem de prazos em <strong>dias úteis (Art. 219)</strong>, pondo fim à desgastante contagem em dias corridos do revogado CPC de 1973.
            </p>
            <blockquote className="my-4 pl-4 border-l-4 border-emerald-500 italic text-slate-800 bg-slate-50 py-2">
              "Art. 219. Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único. O disposto neste artigo aplica-se somente aos prazos processuais."
            </blockquote>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              A Regra dos Três Dias: Disponibilização, Publicação e Início
            </h3>
            <p>
              Quando a intimação se opera pelo Diário da Justiça Eletrônico (DJe), aplica-se a disciplina do Art. 224 do CPC e da Lei 11.419/2006:
            </p>
            <ol className="list-decimal pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Dia 1 (Disponibilização):</strong> Dia em que a decisão é veiculada no portal eletrônico do tribunal.
              </li>
              <li>
                <strong>Dia 2 (Publicação Oficial):</strong> Considera-se como data da publicação o primeiro dia útil seguinte ao da disponibilização.
              </li>
              <li>
                <strong>Dia 3 (Início da Contagem - Dies a Quo):</strong> A contagem do prazo tem início no primeiro dia útil que se seguir ao dia considerado da publicação.
              </li>
            </ol>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Recesso Forense e Férias dos Advogados (Art. 220 CPC)
            </h3>
            <p>
              O Art. 220 garante a suspensão do curso de todos os prazos processuais, da realização de audiências e das sessões de julgamento entre <strong>20 de dezembro e 20 de janeiro</strong>, inclusive. Os prazos que já estavam em curso são paralisados no dia 19 de dezembro e voltam a correr de onde pararam no dia 21 de janeiro (se for dia útil).
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

