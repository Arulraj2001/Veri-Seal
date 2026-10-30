'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Clock,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  TrendingUp,
  Moon,
  Sun,
  Scale,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface HorasExtrasResult {
  valorHoraNormal: number;
  divisorJornada: number;
  valorHora50: number;
  totalExtras50: number;
  valorHora100: number;
  totalExtras100: number;
  totalHorasExtrasBruto: number;
  horasNoturnasConvertidas: number;
  totalAdicionalNoturno: number;
  reflexoDsr: number;
  formulaDsrExplicada: string;
  totalGeralReceber: number;
}

export default function CalculoHorasExtrasDsrPage() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(3300);
  const [jornadaSemanal, setJornadaSemanal] = React.useState<number>(44); // 44h -> 220 divisor
  const [qtdHoras50, setQtdHoras50] = React.useState<number>(20);
  const [qtdHoras100, setQtdHoras100] = React.useState<number>(8);
  const [qtdHorasNoturnas, setQtdHorasNoturnas] = React.useState<number>(0);
  const [diasUteisMes, setDiasUteisMes] = React.useState<number>(25);
  const [domingosEFeriados, setDomingosEFeriados] = React.useState<number>(5);

  const calcolaHoras = React.useCallback((): HorasExtrasResult => {
    const salario = Math.max(0, salarioBruto);

    // Divisor padrão CLT (Art. 64 CLT)
    // 44h semanais -> 220
    // 40h semanais -> 200
    // 36h semanais -> 180
    // 30h semanais -> 150
    let divisorJornada = 220;
    if (jornadaSemanal === 40) divisorJornada = 200;
    else if (jornadaSemanal === 36) divisorJornada = 180;
    else if (jornadaSemanal === 30) divisorJornada = 150;
    else divisorJornada = 220;

    const valorHoraNormal = salario / divisorJornada;

    // Horas Extras 50% (dias úteis normais - Art. 7º XVI CF/88)
    const valorHora50 = valorHoraNormal * 1.5;
    const totalExtras50 = valorHora50 * Math.max(0, qtdHoras50);

    // Horas Extras 100% (domingos e feriados civis/religiosos - Lei 605/49)
    const valorHora100 = valorHoraNormal * 2.0;
    const totalExtras100 = valorHora100 * Math.max(0, qtdHoras100);

    const totalHorasExtrasBruto = totalExtras50 + totalExtras100;

    // Adicional Noturno (Art. 73 CLT: 20% com redução da hora noturna para 52m30s = fator 1.142857)
    const horasNoturnasConvertidas = Math.max(0, qtdHorasNoturnas) * (60 / 52.5);
    const totalAdicionalNoturno = horasNoturnasConvertidas * valorHoraNormal * 0.2;

    // Reflexo no DSR (Descanso Semanal Remunerado - Súmula 172 TST e Lei 605/49)
    // Fórmula oficial: (Total em R$ das horas extras e noturnas / Dias Úteis) * Domingos e Feriados
    const baseParaDsr = totalHorasExtrasBruto + totalAdicionalNoturno;
    const diasUteisSafe = Math.max(1, diasUteisMes);
    const domingosSafe = Math.max(0, domingosEFeriados);

    const reflexoDsr = (baseParaDsr / diasUteisSafe) * domingosSafe;
    const formulaDsrExplicada = `(R$ ${baseParaDsr.toFixed(2)} ÷ ${diasUteisSafe} dias úteis) × ${domingosSafe} domingos/feriados = R$ ${reflexoDsr.toFixed(2)}`;

    const totalGeralReceber = totalHorasExtrasBruto + totalAdicionalNoturno + reflexoDsr;

    return {
      valorHoraNormal,
      divisorJornada,
      valorHora50,
      totalExtras50,
      valorHora100,
      totalExtras100,
      totalHorasExtrasBruto,
      horasNoturnasConvertidas,
      totalAdicionalNoturno,
      reflexoDsr,
      formulaDsrExplicada,
      totalGeralReceber,
    };
  }, [salarioBruto, jornadaSemanal, qtdHoras50, qtdHoras100, qtdHorasNoturnas, diasUteisMes, domingosEFeriados]);

  const res = calcolaHoras();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Horas Extras e DSR</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Art. 59 e 73 da CLT, Súmula 172 do TST & Lei 605/1949</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Cálculo de Horas Extras e Reflexo no DSR <br className="hidden sm:inline" />
          <span className="text-emerald-600">Adicional de 50%, 100% e Hora Noturna Reduzida</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Trabalhista Direta:</strong> A hora extraordinária trabalhada em dias úteis tem acréscimo legal mínimo de <strong>50%</strong> (Art. 7º XVI da CF/88), enquanto horas em domingos e feriados têm adicional de <strong>100%</strong>. Conforme a <strong>Súmula nº 172 do TST</strong>, as horas extras habituais geram <strong>reflexo obrigatório no Descanso Semanal Remunerado (DSR)</strong>, calculado dividindo o total das horas extras pelos dias úteis do mês e multiplicando pelo número de domingos e feriados.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Jornada & Apuração de Horas</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSalarioBruto(3300);
                setJornadaSemanal(44);
                setQtdHoras50(20);
                setQtdHoras100(8);
                setQtdHorasNoturnas(0);
                setDiasUteisMes(25);
                setDomingosEFeriados(5);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Salário Base & Divisor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                  <span>Salário Bruto (R$)</span>
                  <span className="font-mono text-emerald-700">R$ {salarioBruto.toLocaleString('pt-BR')}</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={salarioBruto || ''}
                  onChange={(e) => setSalarioBruto(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                  placeholder="Ex. 3300.00"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Jornada de Trabalho Semanal</span>
                  <span className="text-emerald-700 font-bold font-mono">Divisor {res.divisorJornada}</span>
                </label>
                <select
                  value={jornadaSemanal}
                  onChange={(e) => setJornadaSemanal(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value={44}>44 horas semanais (Divisor 220 CLT Padrão)</option>
                  <option value={40}>40 horas semanais (Divisor 200)</option>
                  <option value={36}>36 horas semanais (Divisor 180 - Turnos)</option>
                  <option value={30}>30 horas semanais (Divisor 150)</option>
                </select>
              </div>
            </div>

            {/* Horas Extras 50% e 100% */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Horas Extras 50% (Dias Úteis)</span>
                  <span className="text-slate-400 font-mono">R$ {res.valorHora50.toFixed(2)}/h</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={qtdHoras50}
                  onChange={(e) => setQtdHoras50(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Horas Extras 100% (Domingos/Feriados)</span>
                  <span className="text-slate-400 font-mono">R$ {res.valorHora100.toFixed(2)}/h</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={qtdHoras100}
                  onChange={(e) => setQtdHoras100(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Adicional Noturno */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex justify-between">
                <span>Horas Noturnas Trabalhadas (22h às 5h)</span>
                <span className="text-slate-400 font-normal">Hora ficta 52m30s + 20%</span>
              </label>
              <input
                type="number"
                min={0}
                step={1}
                value={qtdHorasNoturnas}
                onChange={(e) => setQtdHorasNoturnas(Math.max(0, Number(e.target.value)))}
                placeholder="0"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Calendário do Mês para DSR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Dias Úteis no Mês (Seg a Sáb)</label>
                <input
                  type="number"
                  min={1}
                  max={27}
                  value={diasUteisMes}
                  onChange={(e) => setDiasUteisMes(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Domingos e Feriados no Mês</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={domingosEFeriados}
                  onChange={(e) => setDomingosEFeriados(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Valor da hora base apurado: R$ {res.valorHoraNormal.toFixed(2)} por hora contratual.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Total Adicional a Receber
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              Com Reflexo DSR
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Acréscimo Bruto no Holerite</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              R$ {res.totalGeralReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
              Total de Horas Extras + DSR Súmula 172
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Horas Extras 50% ({qtdHoras50}h a R$ {res.valorHora50.toFixed(2)})</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.totalExtras50.toFixed(2)}</span>
            </div>
            {res.totalExtras100 > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Horas Extras 100% ({qtdHoras100}h a R$ {res.valorHora100.toFixed(2)})</span>
                <span className="font-mono text-emerald-400 font-bold">+ R$ {res.totalExtras100.toFixed(2)}</span>
              </div>
            )}
            {res.totalAdicionalNoturno > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Adicional Noturno 20% ({qtdHorasNoturnas}h noturnas)</span>
                <span className="font-mono text-cyan-400 font-bold">+ R$ {res.totalAdicionalNoturno.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Reflexo no DSR (Súmula 172 TST)</span>
              <span className="font-mono text-amber-400 font-bold">+ R$ {res.reflexoDsr.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Fórmula de Reflexo no DSR Aplicada:</strong>
            <p className="font-mono text-emerald-300 text-[10px] break-all">{res.formulaDsrExplicada}</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            A Disciplina Legal das Horas Extras e do DSR na CLT
          </h2>
          <p>
            A jornada padrão de trabalho prevista no <strong>Artigo 7º, inciso XIII da Constituição Federal</strong> e no <strong>Artigo 58 da CLT</strong> é de até <strong>8 horas diárias e 44 horas semanais</strong>. Qualquer trabalho executado além dos limites contratuais ordinários qualifica-se como serviço extraordinário.
          </p>
          <p>
            O Artigo 59 da CLT limita a prestação de horas extras ao máximo de <strong>2 (duas) horas suplementares por dia</strong>, mediante acordo individual, convenção ou acordo coletivo de trabalho.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Súmula nº 172 do TST: Por que o DSR Deve Ser Pago?
          </h3>
          <p>
            O <strong>Descanso Semanal Remunerado (DSR / RSR)</strong>, disciplinado pela <strong>Lei nº 605/1949</strong>, é o direito ao repouso preferencialmente aos domingos sem perda da remuneração diária.
          </p>
          <p>
            A jurisprudência do Tribunal Superior do Trabalho consolidou na <strong>Súmula 172</strong> que o trabalhador que cumpre horas extras habituais durante a semana sofre desgaste superior ao ordinário, fazendo jus à repercussão financeira proporcional dessas horas extras sobre os domingos e feriados em que descansa.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Adicional Noturno e a Hora Noturna Ficta (Art. 73 CLT)
          </h3>
          <p>
            No trabalho urbano, considera-se noturno aquele realizado entre as <strong>22h de um dia e as 5h do dia seguinte</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              <strong>Adicional de 20%:</strong> A remuneração da hora noturna tem um acréscimo legal de pelo menos 20% sobre a hora diurna.
            </li>
            <li>
              <strong>Redução Ficta do Tempo:</strong> A hora noturna não dura 60 minutos, mas sim <strong>52 minutos e 30 segundos</strong> (fator de equivalência de 1,142857). Sete horas de relógio trabalhadas no período noturno equivalem legalmente a 8 horas trabalhadas.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

