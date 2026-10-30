'use client';

import * as React from 'react';
import { Tag, TrendingDown, CheckCircle2, Percent } from 'lucide-react';

export function SpainDescuentosEngine() {
  const [precioOriginal, setPrecioOriginal] = React.useState<number>(89.99);
  const [descuento, setDescuento] = React.useState<number>(30);
  const [descuentoAdicional, setDescuentoAdicional] = React.useState<number>(0);

  const calculos = React.useMemo(() => {
    const orig = Math.max(precioOriginal, 0);
    const primerAhorro = orig * (descuento / 100);
    const primerPrecio = orig - primerAhorro;

    const segundoAhorro = primerPrecio * (descuentoAdicional / 100);
    const precioFinal = Math.max(primerPrecio - segundoAhorro, 0);

    const ahorroTotal = Math.max(orig - precioFinal, 0);
    const porcentajeEfectivoTotal = orig > 0 ? Math.round((ahorroTotal / orig) * 1000) / 10 : 0;

    return {
      precioFinal: Math.round(precioFinal * 100) / 100,
      ahorroTotal: Math.round(ahorroTotal * 100) / 100,
      porcentajeEfectivoTotal,
    };
  }, [precioOriginal, descuento, descuentoAdicional]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Precio Original */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="precio-original-producto" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Precio Original del Producto (€)
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {precioOriginal.toFixed(2)} €
              </div>
            </div>
            <input
              id="precio-original-producto"
              type="number"
              step={0.5}
              min={1}
              value={precioOriginal}
              onChange={(e) => setPrecioOriginal(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-base font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Porcentaje de Descuento Principal */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="descuento-principal" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Descuento Aplicado (%)
              </label>
              <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200/60">
                {descuento}%
              </span>
            </div>
            <input
              id="descuento-principal"
              type="range"
              min={5}
              max={90}
              step={5}
              value={descuento}
              onChange={(e) => setDescuento(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {[10, 20, 30, 40, 50, 70].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDescuento(d)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 cursor-pointer"
                >
                  -{d}%
                </button>
              ))}
            </div>
          </div>

          {/* Descuento Adicional Acumulable */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="descuento-adicional" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Descuento Extra o Cupón Acumulable (%)
              </label>
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                +{descuentoAdicional}%
              </span>
            </div>
            <input
              id="descuento-adicional"
              type="range"
              min={0}
              max={50}
              step={5}
              value={descuentoAdicional}
              onChange={(e) => setDescuentoAdicional(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Precio Final Rebajado
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ahorras -{calculos.porcentajeEfectivoTotal}%
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span className="text-emerald-400">{calculos.precioFinal.toFixed(2)}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Precio anterior:{' '}
                <span className="line-through text-slate-500 font-mono">{precioOriginal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Dinero total que te ahorras:</span>
                <span className="font-mono font-bold text-emerald-400 text-base">
                  -{calculos.ahorroTotal.toFixed(2)} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Porcentaje real de rebaja aplicado:</span>
                <span className="font-mono font-bold text-slate-100">
                  {calculos.porcentajeEfectivoTotal}% de descuento
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Ley de Comercio Minorista (Rebajas en España):</strong>
              <p className="text-emerald-800 leading-relaxed">
                Los establecimientos comerciales deben mostrar obligatoriamente el <strong>precio anterior tachado</strong> junto al nuevo precio rebajado o el porcentaje de reducción en todos los artículos en promoción.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

