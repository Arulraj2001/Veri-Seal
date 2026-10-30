'use client';

import * as React from 'react';
import { calculateHipotecaSpain } from '@/lib/international/spain-tax';
import type { HipotecaCalculationResult } from '@/lib/international/spain-tax';
import { Home, Percent, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';

export function SpainHipotecaEngine() {
  const [capital, setCapital] = React.useState<number>(180000);
  const [plazo, setPlazo] = React.useState<number>(25);
  const [tipoInteres, setTipoInteres] = React.useState<number>(2.95);
  const [modalidad, setModalidad] = React.useState<'fijo' | 'variable'>('fijo');
  const [euribor, setEuribor] = React.useState<number>(2.25);
  const [diferencial, setDiferencial] = React.useState<number>(0.75);

  React.useEffect(() => {
    if (modalidad === 'variable') {
      setTipoInteres(Math.round((euribor + diferencial) * 100) / 100);
    }
  }, [modalidad, euribor, diferencial]);

  const result: HipotecaCalculationResult = React.useMemo(() => {
    return calculateHipotecaSpain({
      capitalPrestamo: capital,
      plazoAnios: plazo,
      tipoInteresAnualPorcentaje: tipoInteres,
    });
  }, [capital, plazo, tipoInteres]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Modalidad Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Tipo de Hipoteca
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModalidad('fijo')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  modalidad === 'fijo'
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Tipo Fijo
              </button>
              <button
                type="button"
                onClick={() => setModalidad('variable')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  modalidad === 'variable'
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Tipo Variable (Euríbor)
              </button>
            </div>
          </div>

          {/* Capital del Préstamo */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="capital-hipoteca" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Importe del Préstamo Hipotecario
              </label>
              <div className="font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                {capital.toLocaleString('es-ES')} €
              </div>
            </div>
            <input
              id="capital-hipoteca"
              type="range"
              min={50000}
              max={600000}
              step={5000}
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
          </div>

          {/* Plazo en Años */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="plazo-hipoteca" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Plazo de Amortización
              </label>
              <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-lg">
                {plazo} años ({plazo * 12} mensualidades)
              </span>
            </div>
            <input
              id="plazo-hipoteca"
              type="range"
              min={10}
              max={35}
              step={1}
              value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
          </div>

          {/* Tipo de Interés */}
          {modalidad === 'fijo' ? (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label htmlFor="interes-fijo" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Tipo de Interés Fijo Anual (TIN)
                </label>
                <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200/60">
                  {tipoInteres} %
                </span>
              </div>
              <input
                id="interes-fijo"
                type="range"
                min={1.0}
                max={6.0}
                step={0.05}
                value={tipoInteres}
                onChange={(e) => setTipoInteres(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
              />
            </div>
          ) : (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Euríbor Actual (%):</label>
                  <input
                    type="number"
                    step={0.01}
                    value={euribor}
                    onChange={(e) => setEuribor(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Diferencial Banco (%):</label>
                  <input
                    type="number"
                    step={0.05}
                    value={diferencial}
                    onChange={(e) => setDiferencial(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
                  />
                </div>
              </div>
              <div className="text-[11px] font-mono text-orange-700">
                TIN Total resultante: <strong>{tipoInteres}%</strong> (Euríbor {euribor}% + {diferencial}%)
              </div>
            </div>
          )}
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Cuota Mensual a Pagar al Banco
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Sistema Francés
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.cuotaMensual.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€ / mes</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Coste total del préstamo:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.totalAPagar.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Capital prestado devuelto:</span>
                <span className="font-mono font-bold text-slate-100">
                  {result.capitalFinanciado.toLocaleString('es-ES')} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Total intereses bancarios pagados:</span>
                <span className="font-mono font-bold text-orange-400">
                  {result.totalIntereses.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Sobrecoste de intereses sobre el capital:</span>
                <span className="font-mono font-bold text-slate-300">
                  +{result.porcentajeInteresesSobreCapital}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Ley 5/2019 de Contratos de Crédito Inmobiliario:</strong>
              <p className="text-emerald-800 leading-relaxed">
                El banco asume obligatoriamente los gastos de Notaría, Registro de la Propiedad, Gestoría y el Impuesto de Actos Jurídicos Documentados (AJD). El comprador únicamente abona la tasación del inmueble.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

