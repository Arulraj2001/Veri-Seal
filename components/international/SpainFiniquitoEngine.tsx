'use client';

import * as React from 'react';
import { calculateFiniquitoSpain } from '@/lib/international/spain-tax';
import type { FiniquitoCalculationInput, FiniquitoCalculationResult } from '@/lib/international/spain-tax';
import { Briefcase, AlertCircle, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function SpainFiniquitoEngine() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(2200);
  const [pagasExtrasProrrateadas, setPagasExtrasProrrateadas] = React.useState<boolean>(true);
  const [anios, setAnios] = React.useState<number>(3);
  const [meses, setMeses] = React.useState<number>(4);
  const [vacacionesPendientes, setVacacionesPendientes] = React.useState<number>(5);
  const [tipoDespido, setTipoDespido] = React.useState<FiniquitoCalculationInput['tipoDespido']>('improcedente');

  const result: FiniquitoCalculationResult = React.useMemo(() => {
    return calculateFiniquitoSpain({
      salarioMensualBruto: salarioBruto,
      pagasExtrasIncluidas: pagasExtrasProrrateadas,
      aniosTrabajados: anios,
      mesesTrabajados: meses,
      diasVacacionesPendientes: vacacionesPendientes,
      tipoDespido,
    });
  }, [salarioBruto, pagasExtrasProrrateadas, anios, meses, vacacionesPendientes, tipoDespido]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Tipo de Despido / Causa de Extinción */}
          <div className="space-y-2">
            <label htmlFor="tipo-despido" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Tipo de Despido o Extinción de Contrato
            </label>
            <select
              id="tipo-despido"
              value={tipoDespido}
              onChange={(e) => setTipoDespido(e.target.value as FiniquitoCalculationInput['tipoDespido'])}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="improcedente">Despido Improcedente (33 días/año — Máx. 24 meses)</option>
              <option value="objetivo">Despido Objetivo (Causas económicas/técnicas — 20 días/año — Máx. 12 meses)</option>
              <option value="fin_contrato_temporal">Fin de Contrato Temporal / Obra (12 días/año)</option>
              <option value="baja_voluntaria">Baja Voluntaria o Dimisión (Solo finiquito, sin indemnización)</option>
            </select>
          </div>

          {/* Salario Mensual Bruto */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="salario-mensual-bruto" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Salario Mensual Bruto
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {salarioBruto.toLocaleString('es-ES')} € / mes
              </div>
            </div>
            <input
              id="salario-mensual-bruto"
              type="range"
              min={1000}
              max={8000}
              step={50}
              value={salarioBruto}
              onChange={(e) => setSalarioBruto(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pagasExtrasProrrateadas}
                  onChange={(e) => setPagasExtrasProrrateadas(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-0"
                />
                <span>Pagas extras prorrateadas en nómina (12 pagas al año)</span>
              </label>
            </div>
          </div>

          {/* Antigüedad en la empresa */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Tiempo Trabajado en la Empresa
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Años completos:</span>
                <input
                  type="number"
                  min={0}
                  max={45}
                  value={anios}
                  onChange={(e) => setAnios(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900"
                />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Meses adicionales:</span>
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={meses}
                  onChange={(e) => setMeses(Math.min(11, Math.max(0, Number(e.target.value))))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Días de vacaciones devengadas no disfrutadas */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="dias-vacaciones" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Días de Vacaciones Pendientes
              </label>
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                {vacacionesPendientes} días
              </span>
            </div>
            <input
              id="dias-vacaciones"
              type="range"
              min={0}
              max={30}
              step={1}
              value={vacacionesPendientes}
              onChange={(e) => setVacacionesPendientes(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Liquidación Total Estimada (Finiquito + Indemnización)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Estatuto de los Trabajadores
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.totalFiniquitoBruto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Salario diario computado:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.salarioDiario.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €/día
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Indemnización legal por despido ({result.diasIndemnizacionPorAnio} días/año):</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {result.indemnizacionTotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Días indemnizados computados:</span>
                <span className="font-mono font-bold text-slate-200">
                  {result.indemnizacionDias} días
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Vacaciones pendientes no disfrutadas ({vacacionesPendientes} días):</span>
                <span className="font-mono font-bold text-amber-300">
                  {result.importeVacacionesNoDisfrutadas.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Normativa:</span> {result.normativaAplicada}
              </div>
            </div>
          </div>

          {/* Exención Fiscal IRPF Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Exención fiscal de la indemnización por despido:</strong>
              <p className="text-emerald-800 leading-relaxed">
                Según el artículo 7.e de la Ley del IRPF, la indemnización legal por despido (hasta los límites obligatorios del Estatuto de los Trabajadores) está <strong>100% exenta de IRPF</strong> hasta un máximo de 180.000 €. Las vacaciones no disfrutadas sí tributan y cotizan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

