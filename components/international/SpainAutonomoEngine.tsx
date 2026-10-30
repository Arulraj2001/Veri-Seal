'use client';

import * as React from 'react';
import { calculateAutonomoSpain } from '@/lib/international/spain-tax';
import type { AutonomoCalculationResult } from '@/lib/international/spain-tax';
import { ShieldCheck, TrendingDown, HelpCircle, ArrowRight } from 'lucide-react';

export function SpainAutonomoEngine() {
  const [ingresos, setIngresos] = React.useState<number>(36000);
  const [gastos, setGastos] = React.useState<number>(6000);
  const [retencion, setRetencion] = React.useState<7 | 15>(15);
  const [tarifaPlana, setTarifaPlana] = React.useState<boolean>(false);

  const result: AutonomoCalculationResult = React.useMemo(() => {
    return calculateAutonomoSpain({
      ingresosAnuales: ingresos,
      gastosDeducibles: gastos,
      retencionFacturaPercent: retencion,
      esTarifaPlana: tarifaPlana,
    });
  }, [ingresos, gastos, retencion, tarifaPlana]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Facturación Anual */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="ingresos-autonomo" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Ingresos Brutos Facturados (Sin IVA)
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {ingresos.toLocaleString('es-ES')} €/año
              </div>
            </div>
            <input
              id="ingresos-autonomo"
              type="range"
              min={10000}
              max={120000}
              step={1000}
              value={ingresos}
              onChange={(e) => setIngresos(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
          </div>

          {/* Gastos Deducibles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="gastos-autonomo" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Gastos Deducibles de Actividad
              </label>
              <div className="font-mono text-sm font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl">
                {gastos.toLocaleString('es-ES')} €/año
              </div>
            </div>
            <input
              id="gastos-autonomo"
              type="range"
              min={0}
              max={50000}
              step={500}
              value={gastos}
              onChange={(e) => setGastos(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600 focus:outline-none"
            />
          </div>

          {/* Tarifa Plana Toggle */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={tarifaPlana}
                onChange={(e) => setTarifaPlana(e.target.checked)}
                className="rounded text-orange-600 focus:ring-0"
              />
              <span>Tarifa Plana (86€/mes)</span>
            </label>

            <div>
              <label htmlFor="retencion-autonomo" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Retención IRPF en Factura
              </label>
              <select
                id="retencion-autonomo"
                value={retencion}
                onChange={(e) => setRetencion(Number(e.target.value) as 7 | 15)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
              >
                <option value={15}>15% (General)</option>
                <option value={7}>7% (Nuevos autónomos primeros 3 años)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ingreso Limpio en Bolsillo
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Líquido Real
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.ingresoLimpioMensualMedio.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€/mes</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Total anual limpio:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.ingresoLimpioEnBolsilloAnual.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Cuota mensual Seguridad Social:</span>
                <span className="font-mono font-bold text-blue-400">
                  {result.tramoCuotaMensual} €/mes ({result.cuotaSeguridadSocialAnual} €/año)
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Pago trimestral IRPF (Modelo 130 estimado):</span>
                <span className="font-mono font-bold text-orange-400">
                  {result.pagoFraccionadoTrimestral.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €/trimestre
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Retenciones ya soportadas en facturas:</span>
                <span className="font-mono font-bold text-slate-400">
                  {result.retencionesSoportadasFacturas.toLocaleString('es-ES')} €
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
