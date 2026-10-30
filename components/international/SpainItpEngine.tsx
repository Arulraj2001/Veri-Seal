'use client';

import * as React from 'react';
import { calculateItpCompraventaSpain, ITP_RATES_BY_COMUNIDAD } from '@/lib/international/spain-tax';
import type { ItpCalculationResult } from '@/lib/international/spain-tax';
import { Building2, Percent, FileCheck, CheckCircle2 } from 'lucide-react';

export function SpainItpEngine() {
  const [precio, setPrecio] = React.useState<number>(220000);
  const [esObraNueva, setEsObraNueva] = React.useState<boolean>(false);
  const [comunidad, setComunidad] = React.useState<string>('madrid');

  const result: ItpCalculationResult = React.useMemo(() => {
    return calculateItpCompraventaSpain({
      precioCompra: precio,
      esObraNueva,
      comunidadAutonoma: comunidad,
    });
  }, [precio, esObraNueva, comunidad]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Tipo de Vivienda Toggle */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Tipo de Inmueble
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEsObraNueva(false)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  !esObraNueva
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Segunda Mano (ITP)
              </button>
              <button
                type="button"
                onClick={() => setEsObraNueva(true)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  esObraNueva
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Obra Nueva (IVA + AJD)
              </button>
            </div>
          </div>

          {/* Precio de Compraventa */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="precio-inmueble" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Precio de Compra Escriturado
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {precio.toLocaleString('es-ES')} €
              </div>
            </div>
            <input
              id="precio-inmueble"
              type="range"
              min={60000}
              max={800000}
              step={5000}
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
          </div>

          {/* Comunidad Autónoma */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label htmlFor="comunidad-select" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Comunidad Autónoma de Ubicación
            </label>
            <select
              id="comunidad-select"
              value={comunidad}
              onChange={(e) => setComunidad(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              {Object.entries(ITP_RATES_BY_COMUNIDAD).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name} (ITP: {val.itpRate}% / AJD: {val.ajdRate}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Gastos e Impuestos Adicionales
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Añadir al precio
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.totalGastosEImpuestos.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Desembolso total necesario:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.costeTotalAdquisicion.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>{result.impuestoPrincipalNombre}:</span>
                <span className="font-mono font-bold text-orange-400">
                  {result.impuestoPrincipalImporte.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Aranceles de Notaría (RD 1426/1989):</span>
                <span className="font-mono font-bold text-slate-200">
                  {result.gastosNotaria.toLocaleString('es-ES')} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Inscripción en Registro de la Propiedad (RD 1427/1989):</span>
                <span className="font-mono font-bold text-slate-200">
                  {result.gastosRegistro.toLocaleString('es-ES')} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Gestoría y Tasación bancaria estimada:</span>
                <span className="font-mono font-bold text-slate-200">
                  {(result.gastosGestoria + result.gastosTasacion).toLocaleString('es-ES')} €
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Regla general del 10% al 12%:</strong>
              <p className="text-emerald-800 leading-relaxed">
                En España se recomienda disponer de entre un <strong>10% y un 12% adicional</strong> al precio de compra de la vivienda para cubrir los tributos y aranceles legales vinculados a la escritura pública.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
