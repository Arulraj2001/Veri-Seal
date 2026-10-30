'use client';

import * as React from 'react';
import { Fuel, Users, Navigation, CheckCircle2 } from 'lucide-react';

export function SpainGasolinaEngine() {
  const [distancia, setDistancia] = React.useState<number>(350);
  const [esIdaYVuelta, setEsIdaYVuelta] = React.useState<boolean>(true);
  const [consumo, setConsumo] = React.useState<number>(6.2); // Litros a los 100km
  const [precioLitro, setPrecioLitro] = React.useState<number>(1.62); // €/litro
  const [peajes, setPeajes] = React.useState<number>(12);
  const [pasajeros, setPasajeros] = React.useState<number>(3);

  const kmTotales = esIdaYVuelta ? distancia * 2 : distancia;
  const litrosTotales = Math.round(((kmTotales * consumo) / 100) * 100) / 100;
  const costeCombustible = Math.round(litrosTotales * precioLitro * 100) / 100;
  const costeTotalViaje = Math.round((costeCombustible + peajes) * 100) / 100;
  const costePorPersona = Math.round((costeTotalViaje / Math.max(pasajeros, 1)) * 100) / 100;

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Distancia Km */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="distancia-km" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Distancia del Trayecto (Solo Ida)
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {distancia} km
              </div>
            </div>
            <input
              id="distancia-km"
              type="range"
              min={20}
              max={1200}
              step={10}
              value={distancia}
              onChange={(e) => setDistancia(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={esIdaYVuelta}
                onChange={(e) => setEsIdaYVuelta(e.target.checked)}
                className="rounded text-orange-600 focus:ring-0"
              />
              <span>Viaje de Ida y Vuelta ({kmTotales} km en total)</span>
            </label>
          </div>

          {/* Consumo Medio y Precio del Combustible */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <label htmlFor="consumo-100km" className="font-bold text-slate-700 block mb-1">Consumo Medio (L/100km):</label>
              <input
                id="consumo-100km"
                type="number"
                step={0.1}
                value={consumo}
                onChange={(e) => setConsumo(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label htmlFor="precio-litro" className="font-bold text-slate-700 block mb-1">Precio Gasolina/Diésel (€/L):</label>
              <input
                id="precio-litro"
                type="number"
                step={0.01}
                value={precioLitro}
                onChange={(e) => setPrecioLitro(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Peajes y Pasajeros */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <label htmlFor="peajes-input" className="font-bold text-slate-700 block mb-1">Peajes de Autopista (€):</label>
              <input
                id="peajes-input"
                type="number"
                value={peajes}
                onChange={(e) => setPeajes(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label htmlFor="pasajeros-input" className="font-bold text-slate-700 block mb-1">Número de Pasajeros:</label>
              <input
                id="pasajeros-input"
                type="number"
                min={1}
                max={9}
                value={pasajeros}
                onChange={(e) => setPasajeros(Math.max(1, Number(e.target.value)))}
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
                Coste por Pasajero (Dividir Gastos)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {pasajeros} Personas
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span className="text-emerald-400">{costePorPersona.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€ / persona</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Coste total del viaje:{' '}
                <strong className="text-slate-200 font-mono">
                  {costeTotalViaje.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </strong>{' '}
                ({kmTotales} km)
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Litros totales de combustible consumidos:</span>
                <span className="font-mono font-bold text-slate-100">
                  {litrosTotales} Litros
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Gasto solo en combustible ({precioLitro} €/L):</span>
                <span className="font-mono font-bold text-orange-400">
                  {costeCombustible.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Gasto en peajes y aparcamiento:</span>
                <span className="font-mono font-bold text-slate-200">
                  {peajes.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Compensación por kilometraje en empresas (IRPF):</strong>
              <p className="text-emerald-800 leading-relaxed">
                Si utilizas tu vehículo particular para desplazamientos laborales de la empresa, el Ministerio de Hacienda fija la indemnización exenta de IRPF en <strong>0,26 € por kilómetro recorrido</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
