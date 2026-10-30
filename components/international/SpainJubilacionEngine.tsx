'use client';

import * as React from 'react';
import { calculateJubilacionSpain } from '@/lib/international/spain-tax';
import type { JubilacionCalculationResult } from '@/lib/international/spain-tax';
import { Award, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export function SpainJubilacionEngine() {
  const [base, setBase] = React.useState<number>(2400);
  const [anios, setAnios] = React.useState<number>(36);
  const [meses, setMeses] = React.useState<number>(6);
  const [edad, setEdad] = React.useState<number>(65);

  const result: JubilacionCalculationResult = React.useMemo(() => {
    return calculateJubilacionSpain({
      baseReguladoraMedia: base,
      aniosCotizados: anios,
      mesesCotizados: meses,
      edadActual: edad,
    });
  }, [base, anios, meses, edad]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Base Reguladora Media */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="base-reguladora" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Base Reguladora Estimada (Media últimos 25 años)
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {base.toLocaleString('es-ES')} € / mes
              </div>
            </div>
            <input
              id="base-reguladora"
              type="range"
              min={1100}
              max={4400}
              step={50}
              value={base}
              onChange={(e) => setBase(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 block">
              Suma de las bases de cotización de los últimos 300 meses dividida entre 350.
            </span>
          </div>

          {/* Tiempo Total Cotizado */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Tiempo Total Cotizado a la Seguridad Social
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Años cotizados:</span>
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
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Meses extra:</span>
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
            <div className="text-[11px] text-slate-500 font-mono">
              Total cotizado: {anios} años y {meses} meses ({anios * 12 + meses} meses)
            </div>
          </div>

          {/* Edad actual del solicitante */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="edad-actual" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Tu Edad Actual
              </label>
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                {edad} años
              </span>
            </div>
            <input
              id="edad-actual"
              type="range"
              min={55}
              max={70}
              step={1}
              value={edad}
              onChange={(e) => setEdad(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Pensión Bruta Estimada
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                14 Pagas Anuales
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.pensionMensualBruta.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€/mes</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Pensión bruta total anual:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.pensionAnualBruta.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € (14 pagas)
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Porcentaje legal reconocido:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {result.porcentajeAplicable}% de la base reguladora
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Edad ordinaria de jubilación legal (2026):</span>
                <span className="font-mono font-bold text-orange-400">
                  {result.edadJubilacionOrdinaria}
                </span>
              </div>
              {result.aniosFaltantesParaMaximo > 0 && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Tiempo para alcanzar el 100% de pensión:</span>
                  <span className="font-mono text-slate-400">
                    {result.aniosFaltantesParaMaximo} años adicionales
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Requisitos mínimos info badge */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Regulación 2026 de la Seguridad Social:</strong>
              <p className="text-emerald-800 leading-relaxed">
                Para jubilarse a los 65 años con el 100% de la pensión en 2026 se exige acreditar al menos <strong>38 años y 3 meses cotizados</strong>. Quienes no alcancen dicha carrera de cotización deberán esperar a los <strong>66 años y 8 meses</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
