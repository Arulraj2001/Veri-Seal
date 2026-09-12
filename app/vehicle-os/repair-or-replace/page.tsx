'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Car,
  TrendingDown,
  Sparkles,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function RepairOrReplacePage() {
  const [vehicleAgeYears, setVehicleAgeYears] = React.useState<number>(8);
  const [repairEstimate, setRepairEstimate] = React.useState<number>(85000);
  const [currentCarValue, setCurrentCarValue] = React.useState<number>(320000);
  const [replacementCarPrice, setReplacementCarPrice] = React.useState<number>(1050000);
  const [analysisHorizonYears, setAnalysisHorizonYears] = React.useState<number>(2);

  // Financial model:
  // Option A: Repair & Keep
  // Cost = Immediate Repair + Expected Future Maintenance (~₹25,000/yr) + Ongoing Deprec (~₹25,000/yr)
  const optionARepairCost =
    repairEstimate +
    analysisHorizonYears * 28000 + // future expected upkeep
    analysisHorizonYears * 22000; // further depreciation

  // Option B: Sell & Replace
  // Down payment gap + EMI loan interest on new car + higher insurance difference (~₹18,000/yr)
  // Minus slight fuel economy benefit (~₹12,000/yr)
  const newLoanPrincipal = Math.max(0, replacementCarPrice - currentCarValue);
  const newCarInterest2Yrs = Math.round(newLoanPrincipal * 0.095 * analysisHorizonYears);
  const insuranceDelta2Yrs = analysisHorizonYears * 18000;
  const newCarDepreciation2Yrs = Math.round(replacementCarPrice * 0.22); // ~22% in first 2 yrs
  const fuelSavingsNewCar2Yrs = analysisHorizonYears * 12000;

  const optionBReplaceCost =
    newCarInterest2Yrs + insuranceDelta2Yrs + newCarDepreciation2Yrs - fuelSavingsNewCar2Yrs;

  const repairIsCheaper = optionARepairCost < optionBReplaceCost;
  const financialDelta = Math.abs(optionARepairCost - optionBReplaceCost);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Repair or Replace Decision Engine' },
        ]}
      />
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            Critical Crossroads
          </span>
          <span className="text-xs font-semibold text-slate-500">Capital Allocation Sizer</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          “Repair or Replace?” — Financial Decision Engine
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Facing a massive repair estimate (e.g. clutch, engine overhaul, suspension, or gearbox)? This engine compares the true financial drain of repairing vs purchasing a replacement vehicle over a 1 to 3 year horizon.
        </p>
      </div>

      {/* Grid: Inputs Left, Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Wrench className="w-4 h-4 text-amber-600" />
              <span>Repair &amp; Vehicle Economics</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Age (Years)</label>
                <input
                  type="number"
                  value={vehicleAgeYears}
                  onChange={(e) => setVehicleAgeYears(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Repair Estimate (₹)</label>
                <input
                  type="number"
                  value={repairEstimate}
                  onChange={(e) => setRepairEstimate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Vehicle Market Value (₹)</label>
                <input
                  type="number"
                  value={currentCarValue}
                  onChange={(e) => setCurrentCarValue(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Replacement Car Price (₹)</label>
                <input
                  type="number"
                  value={replacementCarPrice}
                  onChange={(e) => setReplacementCarPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Analysis Horizon (Years)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setAnalysisHorizonYears(yr)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                        analysisHorizonYears === yr
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {yr} Year{yr > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Decision Recommendation
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {repairIsCheaper ? '🛠️ Repairing Appears Cheaper' : '🚗 Replacing Appears Smarter'}
              </h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {repairIsCheaper
                ? `Under these financial assumptions, repairing your vehicle saves approximately ₹${financialDelta.toLocaleString('en-IN')} over the next ${analysisHorizonYears} years compared to the steep depreciation and loan interest of a new car.`
                : `Because your repair bill is ~${Math.round((repairEstimate / currentCarValue) * 100)}% of the vehicle's market value, sinking money into it is uneconomical. Upgrading to a newer vehicle with fresh warranty makes more financial sense.`}
            </p>

            {/* Side-by-side cost breakdown */}
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex justify-between items-center">
                <span className="font-sans text-slate-700">Option A: Repair &amp; Keep</span>
                <span className="font-black text-slate-900">₹{optionARepairCost.toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex justify-between items-center">
                <span className="font-sans text-slate-700">Option B: Sell &amp; Replace</span>
                <span className="font-black text-slate-900">₹{optionBReplaceCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* The 50% Rule of Thumb */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs space-y-1.5 text-amber-900">
              <div className="font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>The Golden 50% Rule of Thumb:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                If an immediate repair bill exceeds <strong>50% of the vehicle's market value</strong>, automobile economists recommend selling rather than repairing, as older vehicles experience cascading failures in adjacent components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
