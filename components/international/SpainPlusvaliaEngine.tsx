'use client';

import * as React from 'react';
import { calculatePlusvaliaMunicipalSpain } from '@/lib/international/spain-tax';
import type { PlusvaliaResult } from '@/lib/international/spain-tax';
import { Scale, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export function SpainPlusvaliaEngine() {
  const [suelo, setSuelo] = React.useState<number>(45000);
  const [compra, setCompra] = React.useState<number>(160000);
  const [venta, setVenta] = React.useState<number>(210000);
  const [anios, setAnios] = React.useState<number>(8);
  const [tipoMunicipio, setTipoMunicipio] = React.useState<number>(30);

  const result: PlusvaliaResult = React.useMemo(() => {
    return calculatePlusvaliaMunicipalSpain({
      valorCatastralSuelo: suelo,
      precioAdquisicionOriginal: compra,
      precioVentaTransmision: venta,
      aniosTenencia: anios,
      tipoGravamenMunicipio: tipoMunicipio,
    });
  }, [suelo, compra, venta, anios, tipoMunicipio]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Valor Catastral del Suelo */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="suelo-plusvalia" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Valor Catastral del Suelo (del recibo del IBI)
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {suelo.toLocaleString('es-ES')} €
              </div>
            </div>
            <input
              id="suelo-plusvalia"
              type="range"
              min={10000}
              max={250000}
              step={1000}
              value={suelo}
              onChange={(e) => setSuelo(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
          </div>

          {/* Precios Compra y Venta */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <label htmlFor="compra-input" className="font-bold text-slate-700 block mb-1">Precio Compra Original:</label>
              <input
                id="compra-input"
                type="number"
                step={1000}
                value={compra}
                onChange={(e) => setCompra(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label htmlFor="venta-input" className="font-bold text-slate-700 block mb-1">Precio Venta / Transmisión:</label>
              <input
                id="venta-input"
                type="number"
                step={1000}
                value={venta}
                onChange={(e) => setVenta(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Años de Tenencia y Tipo del Ayuntamiento */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <label htmlFor="anios-plusvalia" className="font-bold text-slate-700 block mb-1">Años de Tenencia (1 a 20):</label>
              <input
                id="anios-plusvalia"
                type="number"
                min={1}
                max={20}
                value={anios}
                onChange={(e) => setAnios(Math.min(20, Math.max(1, Number(e.target.value))))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label htmlFor="tipo-municipio" className="font-bold text-slate-700 block mb-1">Tipo Ayuntamiento (% máx. 30):</label>
              <input
                id="tipo-municipio"
                type="number"
                min={1}
                max={30}
                value={tipoMunicipio}
                onChange={(e) => setTipoMunicipio(Math.min(30, Math.max(1, Number(e.target.value))))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Impuesto de Plusvalía Óptimo a Pagar
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                RD-ley 26/2021
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.cuotaOptimaFinal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Método más ventajoso legalmente:{' '}
                <strong className="text-emerald-400 font-mono uppercase">
                  {result.metodoRecomendado === 'exento_perdida'
                    ? 'Totalmente Exento por Pérdidas'
                    : result.metodoRecomendado === 'objetivo'
                    ? 'Método Objetivo (Coeficiente)'
                    : 'Método Real (Ganancia Patrimonial)'}
                </strong>
              </div>
            </div>

            {/* Comparison of the 2 legal calculation methods */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Cuota según Método Objetivo (Coeficiente {result.coeficienteObjetivoAplicado}):</span>
                <span className="font-mono font-bold text-slate-100">
                  {result.cuotaMetodoObjetivo.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Cuota según Método Real (Plusvalía efectiva):</span>
                <span className="font-mono font-bold text-slate-100">
                  {result.cuotaMetodoReal.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 pt-1 font-bold">
                <span>Ahorro legal al elegir el método menor:</span>
                <span className="font-mono">
                  {Math.abs(result.cuotaMetodoObjetivo - result.cuotaMetodoReal).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Derecho de opción del contribuyente:</strong>
              <p className="text-emerald-800 leading-relaxed">
                El Tribunal Constitucional y la reforma del IIVTNU establecen que el contribuyente tiene el derecho legal expreso de tributar por el método que arroje la <strong>menor cuantía tributaria</strong>, o no tributar en caso de minusvalía probada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
