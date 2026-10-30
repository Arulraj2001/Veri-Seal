'use client';

import * as React from 'react';
import { calculateHorasExtrasSpain } from '@/lib/international/spain-tax';
import type { HorasExtrasResult } from '@/lib/international/spain-tax';
import { Clock, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export function SpainHorasExtrasEngine() {
  const [salarioAnual, setSalarioAnual] = React.useState<number>(26000);
  const [horasConvenio, setHorasConvenio] = React.useState<number>(1780);
  const [horasOrdinarias, setHorasOrdinarias] = React.useState<number>(10);
  const [horasFestivas, setHorasFestivas] = React.useState<number>(4);

  const result: HorasExtrasResult = React.useMemo(() => {
    return calculateHorasExtrasSpain({
      salarioBrutoAnual: salarioAnual,
      horasConvenioAnuales: horasConvenio,
      horasExtrasOrdinarias: horasOrdinarias,
      horasExtrasFestivasONocturnas: horasFestivas,
    });
  }, [salarioAnual, horasConvenio, horasOrdinarias, horasFestivas]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Salario Bruto Anual */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="salario-anual-horas" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Salario Bruto Anual de Nómina
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {salarioAnual.toLocaleString('es-ES')} € / año
              </div>
            </div>
            <input
              id="salario-anual-horas"
              type="range"
              min={15000}
              max={70000}
              step={500}
              value={salarioAnual}
              onChange={(e) => setSalarioAnual(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
          </div>

          {/* Horas Anuales según Convenio */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="horas-convenio" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Jornada Laboral Anual según Convenio Colectivo
              </label>
              <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-lg">
                {horasConvenio} horas / año
              </span>
            </div>
            <input
              id="horas-convenio"
              type="range"
              min={1600}
              max={1826}
              step={10}
              value={horasConvenio}
              onChange={(e) => setHorasConvenio(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
            <div className="text-[11px] text-slate-500 font-mono">
              Precio hora ordinaria calculada: <strong>{result.precioHoraOrdinaria} € / hora</strong>
            </div>
          </div>

          {/* Horas Extras Realizadas */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="horas-extra-ordinarias" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Horas Extras Diurnas
              </label>
              <input
                id="horas-extra-ordinarias"
                type="number"
                min={0}
                max={80}
                value={horasOrdinarias}
                onChange={(e) => setHorasOrdinarias(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-500 block">Recargo supletorio legal: +75%</span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="horas-extra-festivas" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Horas Festivas / Noche
              </label>
              <input
                id="horas-extra-festivas"
                type="number"
                min={0}
                max={80}
                value={horasFestivas}
                onChange={(e) => setHorasFestivas(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-500 block">Recargo convenio: +100%</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Bruto a Cobrar en Nómina
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Art. 35 Estatuto Trabajadores
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.totalImporteExtras.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€ Brutos</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Total horas computadas: <strong className="text-slate-200 font-mono">{result.totalHorasExtras} horas</strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Precio hora extra ordinaria (+75%):</span>
                <span className="font-mono font-bold text-emerald-400">
                  {result.precioHoraExtraOrdinaria} € / hora
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Precio hora extra festiva/nocturna (+100%):</span>
                <span className="font-mono font-bold text-orange-400">
                  {result.precioHoraExtraFestiva} € / hora
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Tope máximo legal anual (80 horas):</span>
                <span className={`font-mono font-bold ${result.superaTopeLegal80Horas ? 'text-rose-400' : 'text-slate-300'}`}>
                  {result.superaTopeLegal80Horas ? 'Tope anual superado ✕' : 'Dentro del límite legal ✓'}
                </span>
              </div>
            </div>
          </div>

          {/* Legal Warning Badge */}
          {result.superaTopeLegal80Horas ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold">Límite anual superado:</strong>
                <p className="text-rose-800 leading-relaxed">
                  El artículo 35.2 del Estatuto de los Trabajadores prohíbe realizar más de <strong>80 horas extraordinarias al año</strong> (salvo las realizadas para prevenir o reparar siniestros o compensadas con descanso dentro de los 4 meses siguientes).
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold">Cotización de las horas extraordinarias:</strong>
                <p className="text-emerald-800 leading-relaxed">
                  Las horas extras cotizan a la Seguridad Social con un tipo específico adicional (4,70% por contingencias comunes a cargo del trabajador o 2,00% por fuerza mayor).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

