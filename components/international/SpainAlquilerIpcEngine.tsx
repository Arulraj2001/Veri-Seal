'use client';

import * as React from 'react';
import { calculateActualizacionAlquilerIpcSpain } from '@/lib/international/spain-tax';
import type { AlquilerIpcResult } from '@/lib/international/spain-tax';
import { Home, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function SpainAlquilerIpcEngine() {
  const [renta, setRenta] = React.useState<number>(850);
  const [porcentaje, setPorcentaje] = React.useState<number>(3.0);

  const result: AlquilerIpcResult = React.useMemo(() => {
    return calculateActualizacionAlquilerIpcSpain({
      rentaMensualActual: renta,
      porcentajeActualizacion: porcentaje,
    });
  }, [renta, porcentaje]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Renta Actual */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="renta-actual" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Renta Mensual Actual del Alquiler
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {renta.toLocaleString('es-ES')} € / mes
              </div>
            </div>
            <input
              id="renta-actual"
              type="range"
              min={300}
              max={3500}
              step={25}
              value={renta}
              onChange={(e) => setRenta(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
          </div>

          {/* Porcentaje de Actualización */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="porcentaje-actualizacion" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Porcentaje de Actualización Anual
              </label>
              <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200/60">
                {porcentaje}%
              </span>
            </div>
            <input
              id="porcentaje-actualizacion"
              type="range"
              min={0.5}
              max={6.0}
              step={0.1}
              value={porcentaje}
              onChange={(e) => setPorcentaje(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Tope Ley de Vivienda 2026: <strong>3,0%</strong></span>
              <button
                type="button"
                onClick={() => setPorcentaje(3.0)}
                className="text-orange-700 font-bold hover:underline"
              >
                Fijar al tope legal (3%)
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Nueva Renta Mensual Actualizada
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Ley 12/2023
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.nuevaRentaMensual.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€ / mes</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Incremento mensual:{' '}
                <strong className="text-slate-200 font-mono">
                  +{result.incrementoMensual.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €/mes
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Renta anterior al ajuste:</span>
                <span className="font-mono font-bold text-slate-200">
                  {result.rentaActual.toLocaleString('es-ES')} € / mes
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Incremento acumulado en el año (12 meses):</span>
                <span className="font-mono font-bold text-orange-400">
                  +{result.incrementoAnual.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € / año
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Conformidad con el tope legal:</span>
                <span className={`font-mono font-bold ${result.esSuperiorAlTopeLegal ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {result.esSuperiorAlTopeLegal ? 'Supera el tope legal del 3% ✕' : 'Dentro del tope legal del 3% ✓'}
                </span>
              </div>
            </div>
          </div>

          {result.esSuperiorAlTopeLegal ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold">Aviso sobre el tope legal de actualización:</strong>
                <p className="text-rose-800 leading-relaxed">
                  La Ley por el Derecho a la Vivienda fija un <strong>límite máximo legal del 3%</strong> para la actualización de rentas de alquiler de vivienda habitual, salvo pacto expreso inferior entre arrendador y arrendatario.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold">Notificación previa obligatoria:</strong>
                <p className="text-emerald-800 leading-relaxed">
                  El arrendador debe comunicar la subida por escrito al inquilino con <strong>al menos un mes de antelación</strong> a la fecha en que deba surtir efecto en la mensualidad correspondiente.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
