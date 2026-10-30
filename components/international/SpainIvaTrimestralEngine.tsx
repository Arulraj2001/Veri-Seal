'use client';

import * as React from 'react';
import { calculateIvaTrimestralSpain } from '@/lib/international/spain-tax';
import type { IvaTrimestralResult } from '@/lib/international/spain-tax';
import { Receipt, Percent, CheckCircle2, TrendingDown } from 'lucide-react';

export function SpainIvaTrimestralEngine() {
  const [v21, setV21] = React.useState<number>(9500);
  const [v10, setV10] = React.useState<number>(0);
  const [v4, setV4] = React.useState<number>(0);
  const [g21, setG21] = React.useState<number>(3200);
  const [g10, setG10] = React.useState<number>(450);
  const [g4, setG4] = React.useState<number>(0);

  const result: IvaTrimestralResult = React.useMemo(() => {
    return calculateIvaTrimestralSpain({
      ventasGeneral21: v21,
      ventasReducido10: v10,
      ventasSuperreducido4: v4,
      gastosIvaSoportado21: g21,
      gastosIvaSoportado10: g10,
      gastosIvaSoportado4: g4,
    });
  }, [v21, v10, v4, g21, g10, g4]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Ingresos / Ventas con IVA */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Ventas / Ingresos del Trimestre (Bases sin IVA)
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label htmlFor="ventas-21" className="font-semibold text-slate-700 block mb-1">General (21%):</label>
                <input
                  id="ventas-21"
                  type="number"
                  value={v21}
                  onChange={(e) => setV21(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono font-bold text-slate-900 text-xs"
                />
              </div>
              <div>
                <label htmlFor="ventas-10" className="font-semibold text-slate-700 block mb-1">Reducido (10%):</label>
                <input
                  id="ventas-10"
                  type="number"
                  value={v10}
                  onChange={(e) => setV10(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono font-bold text-slate-900 text-xs"
                />
              </div>
              <div>
                <label htmlFor="ventas-4" className="font-semibold text-slate-700 block mb-1">Superred. (4%):</label>
                <input
                  id="ventas-4"
                  type="number"
                  value={v4}
                  onChange={(e) => setV4(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono font-bold text-slate-900 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Gastos con IVA Soportado */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Gastos Deducibles con Factura (Bases sin IVA)
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label htmlFor="gastos-21" className="font-semibold text-slate-700 block mb-1">General (21%):</label>
                <input
                  id="gastos-21"
                  type="number"
                  value={g21}
                  onChange={(e) => setG21(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono font-bold text-slate-900 text-xs"
                />
              </div>
              <div>
                <label htmlFor="gastos-10" className="font-semibold text-slate-700 block mb-1">Reducido (10%):</label>
                <input
                  id="gastos-10"
                  type="number"
                  value={g10}
                  onChange={(e) => setG10(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono font-bold text-slate-900 text-xs"
                />
              </div>
              <div>
                <label htmlFor="gastos-4" className="font-semibold text-slate-700 block mb-1">Superred. (4%):</label>
                <input
                  id="gastos-4"
                  type="number"
                  value={g4}
                  onChange={(e) => setG4(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono font-bold text-slate-900 text-xs"
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
                Resultado Liquidación Modelo 303
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                  result.esAIngresar
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {result.esAIngresar ? 'A Ingresar a Hacienda' : 'A Compensar / Devolver'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{Math.abs(result.resultadoModelo303).toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {result.esAIngresar
                  ? 'Importe a pagar a la Agencia Tributaria en el trimestre'
                  : 'Saldo a tu favor para compensar en siguientes trimestres'}
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Total IVA Repercutido (Cobrado a clientes):</span>
                <span className="font-mono font-bold text-slate-100">
                  +{result.totalIvaRepercutido.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Total IVA Soportado (Pagado en gastos deducibles):</span>
                <span className="font-mono font-bold text-emerald-400">
                  -{result.totalIvaSoportado.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Calendario del Modelo 303 de IVA:</strong>
              <p className="text-emerald-800 leading-relaxed">
                El Modelo 303 se presenta en cuatro plazos trimestrales: <strong>1T (1 al 20 de abril)</strong>, <strong>2T (1 al 20 de julio)</strong>, <strong>3T (1 al 20 de octubre)</strong> y <strong>4T (1 al 30 de enero del año siguiente)</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

