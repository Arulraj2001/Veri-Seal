'use client';

import * as React from 'react';
import {
  Calendar,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

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
  return diaSemana === 0 || diaSemana === 6;
}

function ehDiaUtil(d: Date): boolean {
  if (ehFimDeSemana(d)) return false;
  if (ehFeriadoNacional(d)) return false;
  if (ehDiaRecessoForense(d)) return false;
  return true;
}

export function CalculadoraPrazosCpcClient() {
  const hoje = new Date().toISOString().split('T')[0];
  const [dataDisponibilizacao, setDataDisponibilizacao] = React.useState<string>(hoje);
  const [prazoDias, setPrazoDias] = React.useState<number>(15);
  const [tipoParte, setTipoParte] = React.useState<'comum' | 'dobro'>('comum');

  const prazosComuns = [
    { label: '15 dias (Apelação / Contestação)', dias: 15 },
    { label: '5 dias (Embargos de Declaração)', dias: 5 },
    { label: '10 dias (Agravo de Instrumento)', dias: 10 },
    { label: '8 dias (Recurso Trabalhista)', dias: 8 },
  ];

  const calcularPrazo = React.useCallback((): PrazoResult => {
    const dataDisp = new Date(`${dataDisponibilizacao}T12:00:00`);
    const diasAlvo = tipoParte === 'dobro' ? prazoDias * 2 : prazoDias;

    let curr = new Date(dataDisp);
    curr.setDate(curr.getDate() + 1);
    while (!ehDiaUtil(curr)) {
      curr.setDate(curr.getDate() + 1);
    }
    const dataPub = new Date(curr);

    curr.setDate(curr.getDate() + 1);
    while (!ehDiaUtil(curr)) {
      curr.setDate(curr.getDate() + 1);
    }
    const dataInicio = new Date(curr);

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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Controls Column */}
      <div className="md:col-span-7 bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 space-y-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Parâmetros da Intimação
        </h2>

        {/* Data de Disponibilização no DJe */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Data de Disponibilização no DJe / Portal
          </label>
          <input
            type="date"
            value={dataDisponibilizacao}
            onChange={(e) => setDataDisponibilizacao(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
          />
          <span className="text-xs text-slate-400 mt-1 block">
            Data em que a publicação apareceu na edição eletrônica do diário.
          </span>
        </div>

        {/* Atalhos de Prazos Comuns */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Prazos Frequentes do CPC
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {prazosComuns.map((item) => (
              <button
                key={item.dias}
                type="button"
                onClick={() => setPrazoDias(item.dias)}
                className={`p-2.5 rounded-xl border text-left font-medium transition cursor-pointer ${
                  prazoDias === item.dias
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold ring-1 ring-emerald-500'
                    : 'border-slate-700 hover:bg-slate-800 text-slate-300 bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Dias Customizados */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Quantidade de Dias de Prazo
          </label>
          <input
            type="number"
            min="1"
            max="180"
            value={prazoDias || ''}
            onChange={(e) => setPrazoDias(parseInt(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
          />
        </div>

        {/* Prerrogativa de Prazo em Dobro */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Prerrogativa Especial de Prazo
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setTipoParte('comum')}
              className={`p-3 rounded-xl border text-center font-semibold transition cursor-pointer ${
                tipoParte === 'comum'
                  ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-sm ring-1 ring-emerald-500'
                  : 'border-slate-700 text-slate-400 hover:bg-slate-800 bg-slate-900'
              }`}
            >
              Advocacia Privada (Prazo Simples)
            </button>
            <button
              type="button"
              onClick={() => setTipoParte('dobro')}
              className={`p-3 rounded-xl border text-center font-semibold transition cursor-pointer ${
                tipoParte === 'dobro'
                  ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-sm ring-1 ring-emerald-500'
                  : 'border-slate-700 text-slate-400 hover:bg-slate-800 bg-slate-900'
              }`}
            >
              Fazenda / Defensoria / MP (Prazo em Dobro)
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary Column */}
      <div className="md:col-span-5 space-y-6">
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60">
          <h2 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-700 flex items-center justify-between">
            <span>Vencimento do Prazo</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              {res.diasUteisTotais} dias úteis
            </span>
          </h2>

          <div className="p-4 rounded-xl bg-slate-950 text-white mb-5 space-y-2 border border-slate-800">
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
              <span className="font-bold text-emerald-400 font-mono">{res.diasCorridosTotais} dias corridos</span>
            </div>
          </div>

          {/* Marcos Processuais */}
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between py-1.5 border-b border-slate-700">
              <span className="text-slate-400">Disponibilização no DJe:</span>
              <span className="font-semibold text-white font-mono">
                {res.dataDisponibilizacao.toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700">
              <span className="text-slate-400">Publicação Oficial (Art. 224 §2º):</span>
              <span className="font-semibold text-white font-mono">
                {res.dataPublicacaoEfetiva.toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700">
              <span className="text-slate-400">Início da Contagem (Art. 224 §3º):</span>
              <span className="font-semibold text-emerald-400 font-bold font-mono">
                {res.dataInicioContagem.toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-300">
              <span className="text-slate-400">Contagem de Dias:</span>
              <span className="font-semibold text-white">Estritamente dias úteis (Art. 219)</span>
            </div>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="rounded-2xl p-5 bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-xs space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Segurança nos Prazos
          </div>
          <p className="text-slate-300">
            Feriados locais, municipais ou suspensões por portaria do tribunal devem ser comprovados pelo advogado no ato de interposição do recurso (Art. 1.003, § 6º do CPC).
          </p>
        </div>
      </div>
    </div>
  );
}

