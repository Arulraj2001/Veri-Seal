'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  Percent,
  AlertTriangle,
  CheckCircle2,
  Coins,
  ShieldCheck,
  TrendingDown,
  Info,
  Car,
  Sparkles,
} from 'lucide-react';
import { calculateEMI } from '@/lib/vehicle-os/calculations';
import { VEHICLE_PRESETS, getVehicleById } from '@/lib/vehicle-os/vehicles-db';

export default function AffordabilityCheckerPage() {
  const [selectedPresetId, setSelectedPresetId] = React.useState<string>('maruti-brezza-petrol');
  const [monthlyTakeHomeIncome, setMonthlyTakeHomeIncome] = React.useState<number>(110000);
  const [existingDebtEMIs, setExistingDebtEMIs] = React.useState<number>(15000); // Home loan, personal loan
  const [targetSavingsPercent, setTargetSavingsPercent] = React.useState<number>(20); // 20% savings

  const [onRoadPrice, setOnRoadPrice] = React.useState<number>(1340000);
  const [downPayment, setDownPayment] = React.useState<number>(300000);
  const [interestRate, setInterestRate] = React.useState<number>(9.5);
  const [tenureYears, setTenureYears] = React.useState<number>(5);

  const [monthlyRunningKm, setMonthlyRunningKm] = React.useState<number>(1100);
  const [fuelEfficiency, setFuelEfficiency] = React.useState<number>(15.5);
  const [monthlyParkingTolls, setMonthlyParkingTolls] = React.useState<number>(2000);

  const handlePresetSelect = (id: string) => {
    setSelectedPresetId(id);
    const p = getVehicleById(id);
    if (!p) return;
    setOnRoadPrice(p.onRoadPrice);
    setDownPayment(Math.round(p.onRoadPrice * 0.25));
    setFuelEfficiency(p.expectedMileage);
  };

  // Calculations
  const loanPrincipal = Math.max(0, onRoadPrice - downPayment);
  const vehicleEMI = calculateEMI(loanPrincipal, interestRate, tenureYears);
  const monthlyFuel = Math.round((monthlyRunningKm / (fuelEfficiency || 15)) * 102);
  const monthlyInsuranceAndService = Math.round((28000 + 9000) / 12);
  const trueMonthlyCost = vehicleEMI + monthlyFuel + monthlyInsuranceAndService + monthlyParkingTolls;

  // The 20/4/10 Rule and Indian Financial Health guidelines
  // Recommended maximum vehicle spend: 20% of net monthly take-home income
  const recommendedMaxCost = Math.round(monthlyTakeHomeIncome * 0.20);
  const disposableAfterDebtAndSavings = Math.max(
    0,
    monthlyTakeHomeIncome - existingDebtEMIs - (monthlyTakeHomeIncome * (targetSavingsPercent / 100))
  );

  const isStretch = trueMonthlyCost > recommendedMaxCost;
  const isDangerous = trueMonthlyCost > disposableAfterDebtAndSavings;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Vehicle Affordability Checker' },
        ]}
      />
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            Consumer Protection
          </span>
          <span className="text-xs font-semibold text-slate-500">True Household Budget Stress Tester</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Vehicle Affordability Checker — Can I Realistically Afford This Car?
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Banks only approve loans based on gross salary. They don't account for your fuel bills, insurance, tyre wear, parking, or long-term wealth savings. This engine calculates your True Monthly Outflow vs safe income thresholds.
        </p>

        {/* Preset Selector */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 shrink-0">
            Select Car / Bike:
          </label>
          <select
            value={selectedPresetId}
            onChange={(e) => handlePresetSelect(e.target.value)}
            className="w-full sm:w-80 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900"
          >
            {VEHICLE_PRESETS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} (₹{(v.onRoadPrice / 100000).toFixed(1)}L)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Inputs Left, Verdict Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Coins className="w-4 h-4 text-amber-600" />
              <span>Income &amp; Financial Obligations</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Take-Home In-Hand (₹)
                </label>
                <input
                  type="number"
                  value={monthlyTakeHomeIncome}
                  onChange={(e) => setMonthlyTakeHomeIncome(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Existing Other EMIs / Debts (₹)
                </label>
                <input
                  type="number"
                  value={existingDebtEMIs}
                  onChange={(e) => setExistingDebtEMIs(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Savings Rate (% of salary)
                </label>
                <input
                  type="number"
                  value={targetSavingsPercent}
                  onChange={(e) => setTargetSavingsPercent(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Planned Down Payment (₹)
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3 pt-2">
              <Car className="w-4 h-4 text-amber-600" />
              <span>Vehicle Loan &amp; Operation Specs</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle On-Road (₹)</label>
                <input
                  type="number"
                  value={onRoadPrice}
                  onChange={(e) => setOnRoadPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Loan Tenure</label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                >
                  <option value={3}>3 Years (Recommended)</option>
                  <option value={5}>5 Years (Standard)</option>
                  <option value={7}>7 Years (High Interest Load)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly km Planned</label>
                <input
                  type="number"
                  value={monthlyRunningKm}
                  onChange={(e) => setMonthlyRunningKm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parking &amp; Tolls / Month (₹)</label>
                <input
                  type="number"
                  value={monthlyParkingTolls}
                  onChange={(e) => setMonthlyParkingTolls(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Affordability Diagnosis
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {isDangerous
                  ? '🚨 Severe Budget Overload'
                  : isStretch
                  ? '⚠️ Budget Stretch Alert'
                  : '✅ Comfortably Affordable'}
              </h2>
            </div>

            {/* Financial Reality Sizer */}
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-600 font-sans">Vehicle EMI:</span>
                <span className="font-bold text-slate-900">₹{vehicleEMI.toLocaleString('en-IN')} / mo</span>
              </div>

              <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 flex justify-between items-center">
                <span className="text-amber-900 font-sans font-bold">True Monthly Vehicle Outflow:</span>
                <span className="font-black text-amber-700 text-sm">
                  ₹{trueMonthlyCost.toLocaleString('en-IN')} / mo
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 flex justify-between items-center text-slate-600 font-sans">
                <span>Safe Limit (20% of In-Hand):</span>
                <span className="font-bold text-slate-900">₹{recommendedMaxCost.toLocaleString('en-IN')} / mo</span>
              </div>
            </div>

            {/* Breakdown of True Monthly Cost */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-600">
              <span className="font-bold text-slate-900">Where Your Monthly Vehicle Money Goes:</span>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>• Loan EMI:</span>
                  <span>₹{vehicleEMI.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>• Fuel / Energy:</span>
                  <span>₹{monthlyFuel.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>• Insurance &amp; PMS Reserve:</span>
                  <span>₹{monthlyInsuranceAndService.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>• Parking &amp; FASTag:</span>
                  <span>₹{monthlyParkingTolls.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Advice */}
            <div className="text-xs text-slate-700 leading-relaxed font-medium">
              {isStretch ? (
                <div className="bg-red-50 border border-red-200 p-3.5 rounded-2xl text-red-800 space-y-1">
                  <div className="font-bold">⚠️ Financial Stress Alert:</div>
                  <p>
                    This vehicle will consume <strong>{Math.round((trueMonthlyCost / monthlyTakeHomeIncome) * 100)}%</strong> of your take-home salary. Financial planners recommend keeping total transport under 20%. Consider a higher down payment or a 1-tier lower vehicle model.
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-emerald-800 space-y-1">
                  <div className="font-bold">✅ Healthy Financial Buffer:</div>
                  <p>
                    This vehicle represents only <strong>{Math.round((trueMonthlyCost / monthlyTakeHomeIncome) * 100)}%</strong> of your monthly take-home salary, leaving your emergency savings and life goals uncompromised.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
