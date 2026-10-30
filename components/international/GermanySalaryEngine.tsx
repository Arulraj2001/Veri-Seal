'use client';

import * as React from 'react';
import { calculateGermanySalary } from '@/lib/international/germany-tax';
import type { SalaryCalculationResult } from '@/lib/international/types';

export function GermanySalaryEngine() {
  const [grossAnnual, setGrossAnnual] = React.useState<number>(50000);
  const [taxClass, setTaxClass] = React.useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [hasChildren, setHasChildren] = React.useState<boolean>(false);
  const [hasChurch, setHasChurch] = React.useState<boolean>(false);

  const result: SalaryCalculationResult = React.useMemo(() => {
    return calculateGermanySalary({
      grossAnnualSalary: grossAnnual,
      payFrequency: 12,
      taxClass,
      childrenCount: hasChildren ? 1 : 0,
      hasChurchTax: hasChurch,
    });
  }, [grossAnnual, taxClass, hasChildren, hasChurch]);

  const presets = [30000, 42000, 50000, 65000, 80000, 100000];

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="gross-salary-de" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Bruttogehalt pro Jahr
              </label>
              <div className="flex items-center gap-1 font-mono text-sm font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60">
                <span>{grossAnnual.toLocaleString('de-DE')}</span>
                <span>€</span>
              </div>
            </div>

            <input
              id="gross-salary-de"
              type="range"
              min={15000}
              max={150000}
              step={1000}
              value={grossAnnual}
              onChange={(e) => setGrossAnnual(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
            />

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-slate-400 font-mono mr-1">Schnellwahl:</span>
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

          {/* Steuerklasse Selection */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Steuerklasse
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((sk) => (
                <button
                  key={sk}
                  type="button"
                  onClick={() => setTaxClass(sk as 1 | 2 | 3 | 4 | 5 | 6)}
                  className={`py-2 rounded-xl border text-center transition-all cursor-pointer font-mono font-bold text-xs ${
                    taxClass === sk
                      ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Klasse {sk}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Checkboxes */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={hasChildren}
                onChange={(e) => setHasChildren(e.target.checked)}
                className="rounded text-amber-600 focus:ring-0"
              />
              <span>Mit Kind(ern)</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={hasChurch}
                onChange={(e) => setHasChurch(e.target.checked)}
                className="rounded text-amber-600 focus:ring-0"
              />
              <span>Kirchensteuer (9%)</span>
            </label>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Nettogehalt (Monatliche Auszahlung)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {result.takeHomePercent}% vom Brutto
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.netMonthly.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                <span className="text-amber-400 text-2xl sm:text-3xl font-sans">€/Monat</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Nettogehalt pro Jahr:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.netAnnual.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </strong>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${result.takeHomePercent}%` }} className="bg-emerald-500 h-full" />
                <div style={{ width: `${result.socialSecurityRatePercent}%` }} className="bg-blue-500 h-full" />
                <div style={{ width: `${result.effectiveTaxRatePercent}%` }} className="bg-amber-500 h-full" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Netto: {result.takeHomePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span>Sozial: {result.socialSecurityRatePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Steuer: {result.effectiveTaxRatePercent}%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Sozialabgaben (KV, RV, AV, PV):</span>
                <span className="font-mono font-bold text-blue-400">
                  -{result.totalSocialSecurityEmployee.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €/Jahr
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Lohnsteuer &amp; Solidaritätszuschlag:</span>
                <span className="font-mono font-bold text-amber-400">
                  -{result.totalIncomeTax.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €/Jahr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
