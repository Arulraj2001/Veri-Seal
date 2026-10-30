'use client';

import * as React from 'react';
import { calculateFranceSalary } from '@/lib/international/france-tax';
import type { SalaryCalculationResult } from '@/lib/international/types';

export function FranceSalaryEngine() {
  const [grossAnnual, setGrossAnnual] = React.useState<number>(38000);
  const [status, setStatus] = React.useState<'non_cadre' | 'cadre' | 'fonctionnaire'>('non_cadre');

  const result: SalaryCalculationResult = React.useMemo(() => {
    return calculateFranceSalary({
      grossAnnualSalary: grossAnnual,
      payFrequency: 12,
      employmentStatus: status,
    });
  }, [grossAnnual, status]);

  const presets = [24000, 32000, 38000, 45000, 60000, 85000];

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="gross-salary-fr" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Salaire Brut Annuel
              </label>
              <div className="flex items-center gap-1 font-mono text-sm font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200/60">
                <span>{grossAnnual.toLocaleString('fr-FR')}</span>
                <span>€</span>
              </div>
            </div>

            <input
              id="gross-salary-fr"
              type="range"
              min={15000}
              max={150000}
              step={1000}
              value={grossAnnual}
              onChange={(e) => setGrossAnnual(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
            />

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-slate-400 font-mono mr-1">Exemples:</span>
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setGrossAnnual(val)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                    grossAnnual === val
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {(val / 1000).toFixed(0)}k€
                </button>
              ))}
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Statut Professionnel
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('non_cadre')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  status === 'non_cadre'
                    ? 'bg-blue-50/70 border-blue-400 text-blue-950 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">Non-Cadre</div>
                <div className="text-[10px] text-slate-500">~22% cotisations</div>
              </button>

              <button
                type="button"
                onClick={() => setStatus('cadre')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  status === 'cadre'
                    ? 'bg-blue-50/70 border-blue-400 text-blue-950 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">Cadre</div>
                <div className="text-[10px] text-slate-500">~25% APEC/Prév.</div>
              </button>

              <button
                type="button"
                onClick={() => setStatus('fonctionnaire')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  status === 'fonctionnaire'
                    ? 'bg-blue-50/70 border-blue-400 text-blue-950 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">Public</div>
                <div className="text-[10px] text-slate-500">~15% Fonctionnaire</div>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Salaire Net Après Impôt
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {result.takeHomePercent}% du brut
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.netMonthly.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</span>
                <span className="text-blue-400 text-2xl sm:text-3xl font-sans">€/mois</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Salaire net annuel après prélèvement à la source :{' '}
                <strong className="text-slate-200 font-mono">
                  {result.netAnnual.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </strong>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${result.takeHomePercent}%` }} className="bg-emerald-500 h-full" />
                <div style={{ width: `${result.socialSecurityRatePercent}%` }} className="bg-blue-500 h-full" />
                <div style={{ width: `${result.effectiveTaxRatePercent}%` }} className="bg-orange-500 h-full" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Net : {result.takeHomePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span>Charges : {result.socialSecurityRatePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span>Impôt : {result.effectiveTaxRatePercent}%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Cotisations sociales (URSSAF / Retraite) :</span>
                <span className="font-mono font-bold text-blue-400">
                  -{result.totalSocialSecurityEmployee.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €/an
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Impôt sur le revenu estimé (prélèvement à la source) :</span>
                <span className="font-mono font-bold text-orange-400">
                  -{result.totalIncomeTax.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €/an
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
