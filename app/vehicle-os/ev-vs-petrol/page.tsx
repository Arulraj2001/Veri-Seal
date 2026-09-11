'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Zap,
  TrendingDown,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Fuel,
  Coins,
} from 'lucide-react';
import { calculateEvVsPetrol } from '@/lib/vehicle-os/calculations';
import { EvVsPetrolInputs, EvVsPetrolResult } from '@/lib/vehicle-os/types';
import { AffiliateRecommendationBox } from '@/components/vehicle-os/AffiliateRecommendationBox';
import { getAffiliatesByCategory } from '@/lib/vehicle-os/affiliate-config';

export default function EvVsPetrolBreakEvenPage() {
  const [inputs, setInputs] = React.useState<EvVsPetrolInputs>({
    petrolCarPrice: 1320000, // Tata Nexon Creative
    evCarPrice: 1790000, // Tata Nexon.ev Empowered
    monthlyKm: 1200,
    petrolPrice: 102,
    petrolMileage: 14.2,
    electricityTariffPerUnit: 7.5, // Indian domestic state DISCOM slab
    evEfficiencyKmPerKwh: 7.2, // ~138 Wh/km
    homeChargingPercent: 80,
    publicChargingTariffPerUnit: 22.0, // Commercial DC fast charger
    annualPetrolMaintenance: 9500,
    annualEvMaintenance: 4500,
    ownershipYears: 5,
  });

  const result: EvVsPetrolResult = React.useMemo(() => {
    return calculateEvVsPetrol(inputs);
  }, [inputs]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
            ⚡ Deep Decision Engine #3
          </span>
          <span className="text-xs font-semibold text-slate-500">Amortization &amp; Tariff Intelligence</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          EV vs Petrol Break-Even — At Your Driving Pattern, When Does EV Become Cheaper?
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Electric vehicles carry a substantial initial price premium. This engine models your exact daily driving distance, home DISCOM electricity tariffs, public DC fast charging ratios, and maintenance savings to determine the exact month you recover the upfront price gap.
        </p>
      </div>

      {/* Grid: Inputs Left, Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>Purchase Price &amp; Driving Commute</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Petrol Vehicle On-Road (₹)</label>
                <input
                  type="number"
                  value={inputs.petrolCarPrice}
                  onChange={(e) => setInputs({ ...inputs, petrolCarPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Equivalent EV On-Road (₹)</label>
                <input
                  type="number"
                  value={inputs.evCarPrice}
                  onChange={(e) => setInputs({ ...inputs, evCarPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Driving Distance (km)</label>
                <input
                  type="number"
                  value={inputs.monthlyKm}
                  onChange={(e) => setInputs({ ...inputs, monthlyKm: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Petrol Real Mileage (km/L)</label>
                <input
                  type="number"
                  step="0.5"
                  value={inputs.petrolMileage}
                  onChange={(e) => setInputs({ ...inputs, petrolMileage: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3 pt-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Electricity Tariffs &amp; Charging Mix</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">EV Real Efficiency (km / kWh)</label>
                <input
                  type="number"
                  step="0.2"
                  value={inputs.evEfficiencyKmPerKwh}
                  onChange={(e) => setInputs({ ...inputs, evEfficiencyKmPerKwh: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Tiago EV: 8.5, Nexon.ev: 7.2 km/kWh</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Home Electricity Tariff (₹ / unit)</label>
                <input
                  type="number"
                  step="0.5"
                  value={inputs.electricityTariffPerUnit}
                  onChange={(e) => setInputs({ ...inputs, electricityTariffPerUnit: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">State domestic slab (₹6 - ₹9)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Home vs Public Charging Ratio</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={inputs.homeChargingPercent}
                    onChange={(e) => setInputs({ ...inputs, homeChargingPercent: parseInt(e.target.value) })}
                    className="w-full accent-emerald-600"
                  />
                  <span className="text-xs font-mono font-bold text-emerald-700 shrink-0">
                    {inputs.homeChargingPercent}% Home
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Public DC Fast Charge Rate (₹/kWh)</label>
                <input
                  type="number"
                  value={inputs.publicChargingTariffPerUnit}
                  onChange={(e) => setInputs({ ...inputs, publicChargingTariffPerUnit: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Highway stations (₹18 - ₹24)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Break-Even Verdict
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {result.breakEvenMonths <= 60
                  ? `Break-even in ~${result.breakEvenMonths} Months`
                  : 'Break-even > 5 Years'}
              </h2>
            </div>

            {/* Output cards */}
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-600">EV Upfront Price Premium:</span>
                <span className="font-bold text-slate-900">+₹{(result.upfrontPriceDifference / 100000).toFixed(2)} Lakh</span>
              </div>

              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 flex justify-between items-center">
                <span className="text-emerald-900 font-bold">Monthly Operational Savings:</span>
                <span className="font-black text-emerald-700 text-sm">
                  +₹{result.totalMonthlySavings.toLocaleString('en-IN')} / mo
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 space-y-1.5 text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Monthly Petrol Bill:</span>
                  <span className="text-slate-900">₹{result.monthlyPetrolFuelCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly EV Electricity Bill:</span>
                  <span className="text-emerald-700 font-bold">₹{result.monthlyEvEnergyCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Maintenance Delta:</span>
                  <span className="text-emerald-700 font-bold">+₹{result.monthlyMaintenanceSavings.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-1">
                <div className="text-[10px] text-slate-400 font-sans font-bold uppercase">5-Year Net Cash In Pocket</div>
                <div className="text-2xl font-black text-emerald-400">
                  {result.fiveYearNetSavings >= 0 ? '+' : ''}₹{result.fiveYearNetSavings.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  After completely recovering the ₹{(result.upfrontPriceDifference / 100000).toFixed(1)}L price gap
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed font-medium">
              {result.recommendation}
            </div>

            {/* Environmental Metric */}
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Net Clean Air Impact: <strong>{result.co2SavedKgPerYear.toLocaleString('en-IN')} kg of CO₂</strong> saved per year.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Affiliate Box */}
      <AffiliateRecommendationBox
        deals={getAffiliatesByCategory('ev-charger')}
        title="Planning to Buy an EV? Certified Home AC Wallbox Chargers"
        contextHint="Fast 7.4kW Type-2 chargers with automatic overnight scheduling and MCB earth leakage protection:"
      />
    </div>
  );
}
