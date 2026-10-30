'use client';

import * as React from 'react';
import {
  calculateSpainSalary,
  AUTONOMOUS_COMMUNITIES_SPAIN,
  IRPF_BRACKETS_ESTATAL_2026,
} from '@/lib/international/spain-tax';
import type { SalaryCalculationResult } from '@/lib/international/types';
import {
  Calculator,
  ShieldCheck,
  ChevronRight,
  TrendingDown,
  Building2,
  Calendar,
  Users,
  Info,
} from 'lucide-react';

export function SpainSalaryEngine() {
  const [grossAnnual, setGrossAnnual] = React.useState<number>(30000);
  const [payFrequency, setPayFrequency] = React.useState<12 | 14>(14);
  const [autonomousCommunity, setAutonomousCommunity] = React.useState<string>('madrid');
  const [childrenCount, setChildrenCount] = React.useState<number>(0);
  const [age, setAge] = React.useState<number>(30);
  const [contractType, setContractType] = React.useState<'indefinido' | 'temporal'>('indefinido');

  // Compute live result
  const result: SalaryCalculationResult = React.useMemo(() => {
    return calculateSpainSalary({
      grossAnnualSalary: grossAnnual,
      payFrequency,
      autonomousCommunity,
      childrenCount,
      age,
      contractType,
    });
  }, [grossAnnual, payFrequency, autonomousCommunity, childrenCount, age, contractType]);

  const presetSalaries = [18000, 24000, 30000, 40000, 55000, 75000];

  return (
    <div className="space-y-8 select-none">
      {/* 2-Column Split: Controls on Left, Live Financial Waterfall on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs (6 Cols) */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Gross Salary Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="gross-salary"
                className="text-xs font-bold text-slate-900 uppercase tracking-wider"
              >
                Sueldo Bruto Anual
              </label>
              <div className="flex items-center gap-1 font-mono text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200/60">
                <span>{grossAnnual.toLocaleString('es-ES')}</span>
                <span>€</span>
              </div>
            </div>

            {/* Slider */}
            <input
              id="gross-salary"
              type="range"
              min={12000}
              max={150000}
              step={1000}
              value={grossAnnual}
              onChange={(e) => setGrossAnnual(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-slate-400 font-mono mr-1">Rápidos:</span>
              {presetSalaries.map((val) => (
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

          {/* Pay Frequency Toggle (12 vs 14 Pagas) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Número de Pagas al Año
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPayFrequency(12)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  payFrequency === 12
                    ? 'bg-orange-50/70 border-orange-400 text-orange-950 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">12 Pagas</div>
                <div className="text-[10px] text-slate-500">Sin pagas extras (prorrateadas)</div>
              </button>

              <button
                type="button"
                onClick={() => setPayFrequency(14)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  payFrequency === 14
                    ? 'bg-orange-50/70 border-orange-400 text-orange-950 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">14 Pagas (Estándar)</div>
                <div className="text-[10px] text-slate-500">Paga de verano y Navidad</div>
              </button>
            </div>
          </div>

          {/* Autonomous Community Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label
              htmlFor="autonomous-community"
              className="text-xs font-bold text-slate-900 uppercase tracking-wider block"
            >
              Comunidad Autónoma (IRPF Autonómico)
            </label>
            <select
              id="autonomous-community"
              value={autonomousCommunity}
              onChange={(e) => setAutonomousCommunity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            >
              {Object.entries(AUTONOMOUS_COMMUNITIES_SPAIN).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>

          {/* Secondary Personal Options (Children & Contract) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label
                htmlFor="children-count"
                className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1"
              >
                Hijos a Cargo
              </label>
              <select
                id="children-count"
                value={childrenCount}
                onChange={(e) => setChildrenCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
              >
                <option value={0}>Sin hijos</option>
                <option value={1}>1 hijo</option>
                <option value={2}>2 hijos</option>
                <option value={3}>3 o más hijos</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contract-type"
                className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1"
              >
                Tipo de Contrato
              </label>
              <select
                id="contract-type"
                value={contractType}
                onChange={(e) => setContractType(e.target.value as 'indefinido' | 'temporal')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
              >
                <option value="indefinido">Indefinido (General)</option>
                <option value="temporal">Temporal (+0.05% desempleo)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Results & Waterfall Bar (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Net Hero Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 relative overflow-hidden">
            {/* Top Stat */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sueldo Neto Líquido
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {result.takeHomePercent}% de tu bruto
              </span>
            </div>

            {/* Giant Monthly Net Output */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.netMonthly.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                <span className="text-orange-500 text-2xl sm:text-3xl font-sans">€/mes</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                En {payFrequency} pagas al año &middot; Total anual neto:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.netAnnual.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </strong>
              </div>
            </div>

            {/* Visual Waterfall Distribution Bar (Swiss-Fintech Taste) */}
            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  style={{ width: `${result.takeHomePercent}%` }}
                  className="bg-emerald-500 h-full transition-all duration-300"
                  title={`Neto: ${result.takeHomePercent}%`}
                />
                <div
                  style={{ width: `${result.effectiveTaxRatePercent}%` }}
                  className="bg-orange-500 h-full transition-all duration-300"
                  title={`IRPF: ${result.effectiveTaxRatePercent}%`}
                />
                <div
                  style={{ width: `${result.socialSecurityRatePercent}%` }}
                  className="bg-blue-500 h-full transition-all duration-300"
                  title={`Seguridad Social: ${result.socialSecurityRatePercent}%`}
                />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Neto: {result.takeHomePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span>IRPF: {result.effectiveTaxRatePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span>Seg. Social: {result.socialSecurityRatePercent}%</span>
                </div>
              </div>
            </div>

            {/* Statutory Details Box inside Dark Card */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Retención IRPF anual:</span>
                <span className="font-mono font-bold text-orange-400">
                  -{result.totalIncomeTax.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Cotización Seguridad Social anual:</span>
                <span className="font-mono font-bold text-blue-400">
                  -{result.totalSocialSecurityEmployee.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
