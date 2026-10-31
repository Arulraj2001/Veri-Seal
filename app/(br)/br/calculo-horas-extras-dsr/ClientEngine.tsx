'use client';

import * as React from 'react';
import {
  Clock,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

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

export function CalculoHorasExtrasDsrClient() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(3300);
  const [jornadaSemanal, setJornadaSemanal] = React.useState<number>(44);
  const [qtdHoras50, setQtdHoras50] = React.useState<number>(20);
  const [qtdHoras100, setQtdHoras100] = React.useState<number>(8);
  const [qtdHorasNoturnas, setQtdHorasNoturnas] = React.useState<number>(0);
  const [diasUteisMes, setDiasUteisMes] = React.useState<number>(25);
  const [domingosEFeriados, setDomingosEFeriados] = React.useState<number>(5);

  const calcolaHoras = React.useCallback((): HorasExtrasResult => {
    const salario = Math.max(0, salarioBruto);

    let divisorJornada = 220;
    if (jornadaSemanal === 40) divisorJornada = 200;
    else if (jornadaSemanal === 36) divisorJornada = 180;
    else if (jornadaSemanal === 30) divisorJornada = 150;
    else divisorJornada = 220;

    const valorHoraNormal = salario / divisorJornada;

    const valorHora50 = valorHoraNormal * 1.5;
    const totalExtras50 = valorHora50 * Math.max(0, qtdHoras50);

    const valorHora100 = valorHoraNormal * 2.0;
    const totalExtras100 = valorHora100 * Math.max(0, qtdHoras100);

    const totalHorasExtrasBruto = totalExtras50 + totalExtras100;

    const horasNoturnasConvertidas = Math.max(0, qtdHorasNoturnas) * (60 / 52.5);
    const totalAdicionalNoturno = horasNoturnasConvertidas * valorHoraNormal * 0.2;

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-slate-800/60 p-6 sm:p-7 rounded-2xl border border-slate-700/60 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-100 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-emerald-400" />
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
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Salário Base & Divisor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Salário Bruto Contratual (R$)</span>
                <span className="font-mono text-emerald-400">R$ {salarioBruto.toLocaleString('pt-BR')}</span>
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={salarioBruto || ''}
                onChange={(e) => setSalarioBruto(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-white transition-all font-mono"
                placeholder="Ex. 3300.00"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Jornada Semanal</span>
                <span className="text-emerald-400 font-bold font-mono">Divisor {res.divisorJornada}</span>
              </label>
              <select
                value={jornadaSemanal}
                onChange={(e) => setJornadaSemanal(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Horas Extras 50% (Dias Úteis)</span>
                <span className="text-slate-400 font-mono">R$ {res.valorHora50.toFixed(2)}/h</span>
              </label>
              <input
                type="number"
                min={0}
                step={1}
                value={qtdHoras50}
                onChange={(e) => setQtdHoras50(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Horas Extras 100% (Domingos/Feriados)</span>
                <span className="text-slate-400 font-mono">R$ {res.valorHora100.toFixed(2)}/h</span>
              </label>
              <input
                type="number"
                min={0}
                step={1}
                value={qtdHoras100}
                onChange={(e) => setQtdHoras100(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>
          </div>

          {/* Adicional Noturno */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Horas Noturnas Trabalhadas (22h às 5h)</span>
              <span className="text-slate-400 font-normal">Hora reduzida 52m30s + 20%</span>
            </label>
            <input
              type="number"
              min={0}
              step={1}
              value={qtdHorasNoturnas}
              onChange={(e) => setQtdHorasNoturnas(Math.max(0, Number(e.target.value)))}
              placeholder="0"
              className="w-full px-4 py-2 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
            />
          </div>

          {/* Calendário do Mês para DSR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Dias Úteis no Mês (Seg a Sáb)</label>
              <input
                type="number"
                min={1}
                max={27}
                value={diasUteisMes}
                onChange={(e) => setDiasUteisMes(Math.max(1, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Domingos e Feriados no Mês</label>
              <input
                type="number"
                min={0}
                max={10}
                value={domingosEFeriados}
                onChange={(e) => setDomingosEFeriados(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Valor hora-base apurado: R$ {res.valorHoraNormal.toFixed(2)} por hora contratual.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Total Adicional a Receber
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            Com Reflexo DSR
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-300 font-medium">Acréscimo Bruto no Holerite</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.totalGeralReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block">
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
  );
}

