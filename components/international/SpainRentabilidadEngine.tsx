'use client';

import * as React from 'react';
import { calculateRentabilidadAlquilerSpain } from '@/lib/international/spain-tax';
import type { RentabilidadAlquilerResult } from '@/lib/international/spain-tax';
import { TrendingUp, Percent, Building, CheckCircle2 } from 'lucide-react';

export function SpainRentabilidadEngine() {
  const [precio, setPrecio] = React.useState<number>(180000);
  const [gastosCompra, setGastosCompra] = React.useState<number>(20000);
  const [alquilerMensual, setAlquilerMensual] = React.useState<number>(850);
  const [comunidadAnual, setComunidadAnual] = React.useState<number>(720);
  const [ibiAnual, setIbiAnual] = React.useState<number>(380);
  const [segurosAnuales, setSegurosAnuales] = React.useState<number>(350);

  const result: RentabilidadAlquilerResult = React.useMemo(() => {
    return calculateRentabilidadAlquilerSpain({
      precioInmueble: precio,
      gastosCompraventaYReforma: gastosCompra,
      alquilerMensualPrevisto: alquilerMensual,
      gastosComunidadAnuales: comunidadAnual,
      ibiAnual,
      segurosAnuales,
    });
  }, [precio, gastosCompra, alquilerMensual, comunidadAnual, ibiAnual, segurosAnuales]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Precio y Gastos Iniciales */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label htmlFor="precio-inversion" className="font-bold text-slate-700 block mb-1">Precio Vivienda (€):</label>
              <input
                id="precio-inversion"
                type="number"
                step={5000}
                value={precio}
                onChange={(e) => setPrecio(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label htmlFor="gastos-reforma" className="font-bold text-slate-700 block mb-1">Gastos ITP y Reforma (€):</label>
              <input
                id="gastos-reforma"
                type="number"
                step={1000}
                value={gastosCompra}
                onChange={(e) => setGastosCompra(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Renta Alquiler Mensual */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="alquiler-mensual-previsto" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Alquiler Mensual Previsto
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {alquilerMensual.toLocaleString('es-ES')} € / mes
              </div>
            </div>
            <input
              id="alquiler-mensual-previsto"
              type="range"
              min={300}
              max={3000}
              step={25}
              value={alquilerMensual}
              onChange={(e) => setAlquilerMensual(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
          </div>

          {/* Gastos Fijos de Mantenimiento Anuales */}
          <div className="pt-2 border-t border-slate-100 space-y-3 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              Gastos Operativos Anuales (Deducibles)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="comunidad-anual" className="font-semibold text-slate-600 block mb-1">Comunidad / año:</label>
                <input
                  id="comunidad-anual"
                  type="number"
                  value={comunidadAnual}
                  onChange={(e) => setComunidadAnual(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs font-bold text-slate-900"
                />
              </div>
              <div>
                <label htmlFor="ibi-anual" className="font-semibold text-slate-600 block mb-1">IBI anual:</label>
                <input
                  id="ibi-anual"
                  type="number"
                  value={ibiAnual}
                  onChange={(e) => setIbiAnual(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs font-bold text-slate-900"
                />
              </div>
              <div>
                <label htmlFor="seguros-anuales" className="font-semibold text-slate-600 block mb-1">Seguros / año:</label>
                <input
                  id="seguros-anuales"
                  type="number"
                  value={segurosAnuales}
                  onChange={(e) => setSegurosAnuales(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Rentabilidad Neta Anual (ROE Real)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Beneficio Limpio
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span className="text-emerald-400">{result.rentabilidadNetaPercent}%</span>
                <span className="text-slate-400 text-lg sm:text-xl font-normal font-sans">
                  (Bruta: {result.rentabilidadBrutaPercent}%)
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Beneficio neto en bolsillo:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.beneficioNetoAnual.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € / año
                </strong>{' '}
                ({Math.round((result.beneficioNetoAnual / 12) * 100) / 100} €/mes)
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Inversión total realizada (Compra + Gastos):</span>
                <span className="font-mono font-bold text-slate-100">
                  {result.inversionTotal.toLocaleString('es-ES')} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Ingresos brutos anuales de alquiler:</span>
                <span className="font-mono font-bold text-orange-400">
                  {result.ingresosAnualesBrutos.toLocaleString('es-ES')} € / año
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Gastos fijos anuales descontados:</span>
                <span className="font-mono font-bold text-slate-400">
                  -{result.gastosAnualesOperativos.toLocaleString('es-ES')} € / año
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Reducción fiscal del 50% en el IRPF:</strong>
              <p className="text-emerald-800 leading-relaxed">
                Al declarar los rendimientos del capital inmobiliario por arrendamiento de vivienda habitual, los particulares disfrutan de una <strong>reducción del 50% en el IRPF</strong> sobre el rendimiento neto según el artículo 23.2 de la Ley del IRPF.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
