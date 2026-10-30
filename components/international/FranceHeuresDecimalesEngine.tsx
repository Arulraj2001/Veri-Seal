'use client';

import * as React from 'react';
import { convertHoursMinutesToDecimal, convertDecimalToHoursMinutes } from '@/lib/international/france-tax';
import { Clock, ArrowRightLeft, Copy, Check } from 'lucide-react';

export function FranceHeuresDecimalesEngine() {
  const [heures, setHeures] = React.useState<number>(37);
  const [minutes, setMinutes] = React.useState<number>(30);
  const [decimalInput, setDecimalInput] = React.useState<number>(37.5);
  const [mode, setMode] = React.useState<'hm_to_dec' | 'dec_to_hm'>('hm_to_dec');

  const decimalResult = React.useMemo(() => {
    return convertHoursMinutesToDecimal(heures, minutes);
  }, [heures, minutes]);

  const hmResult = React.useMemo(() => {
    return convertDecimalToHoursMinutes(decimalInput);
  }, [decimalInput]);

  return (
    <div className="space-y-8">
      {/* Switcher */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Conversion Heures:Minutes &harr; Heures Décimales (Centièmes)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Indispensable pour la paie, la facturation horaire et les déclarations de temps de travail.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md">
          <button
            type="button"
            onClick={() => setMode('hm_to_dec')}
            className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
              mode === 'hm_to_dec'
                ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Heures:Minutes &rarr; Décimales
          </button>
          <button
            type="button"
            onClick={() => setMode('dec_to_hm')}
            className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
              mode === 'dec_to_hm'
                ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Décimales &rarr; Heures:Minutes
          </button>
        </div>

        {mode === 'hm_to_dec' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Heures
              </label>
              <input
                type="number"
                min="0"
                value={heures}
                onChange={(e) => setHeures(Math.max(Number(e.target.value), 0))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Minutes
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(Math.min(Number(e.target.value), 59), 0))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2 pt-2 max-w-sm">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Heures décimales (ex: 37.75)
            </label>
            <input
              type="number"
              min="0"
              step="0.25"
              value={decimalInput}
              onChange={(e) => setDecimalInput(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
        )}
      </div>

      {/* Result Display */}
      <div className="p-8 rounded-3xl bg-blue-600 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Résultat de la conversion
          </span>
          <div className="text-4xl sm:text-5xl font-black font-mono">
            {mode === 'hm_to_dec' ? `${decimalResult.toFixed(2)} h` : hmResult.affichage}
          </div>
          <p className="text-xs text-blue-100">
            {mode === 'hm_to_dec'
              ? `${heures} heures et ${minutes} minutes = ${decimalResult} heures décimales`
              : `${decimalInput} heures décimales = ${hmResult.heures} heures et ${hmResult.minutes} minutes`}
          </p>
        </div>
      </div>
    </div>
  );
}
