'use client';

import React, { useState, useMemo } from 'react';
import {
  Sun,
  Sparkles,
  TrendingUp,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import { calculateSolarEconomics } from '@/lib/home-cost/calculations';

export default function SolarPaybackEngine() {
  const [monthlyUnits, setMonthlyUnits] = useState<number>(380);
  const [roofAreaSqFt, setRoofAreaSqFt] = useState<number>(350);
  const [tariffPerUnit, setTariffPerUnit] = useState<number>(8.0);
  const [desiredOffsetPercent, setDesiredOffsetPercent] = useState<number>(90);

  const solar = useMemo(() => {
    return calculateSolarEconomics({
      monthlyUnits,
      monthlyBill: Math.round(monthlyUnits * tariffPerUnit),
      roofAreaSqFt,
      tariffPerUnit,
      desiredOffsetPercent,
    });
  }, [monthlyUnits, roofAreaSqFt, tariffPerUnit, desiredOffsetPercent]);

  const handleAffiliateClick = () => {
    const query = encodeURIComponent(`rooftop solar panel installation tata power luminous ${solar.recommendedKw}kw`);
    window.open(`https://www.amazon.in/s?k=${query}&tag=veriseal-21`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Inputs Configuration */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Sun className="w-5 h-5 text-amber-500" />
          <span>Home Rooftop Solar Specifications &amp; Roof Dimensions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Monthly Units */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Monthly Consumption (Units)
            </label>
            <div className="relative">
              <input
                type="number"
                min={50}
                max={5000}
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <span className="absolute right-4 top-3 text-xs text-slate-400 font-medium">kWh</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">Check your average summer bill.</p>
          </div>

          {/* Roof Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Shadow-Free Roof Area
            </label>
            <div className="relative">
              <input
                type="number"
                min={50}
                max={5000}
                value={roofAreaSqFt}
                onChange={(e) => setRoofAreaSqFt(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <span className="absolute right-4 top-3 text-xs text-slate-400 font-medium">sq ft</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">~90–100 sq ft required per 1 kW.</p>
          </div>

          {/* Electricity Tariff */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Average Tariff Rate (₹/unit)
            </label>
            <div className="relative">
              <input
                type="number"
                step={0.5}
                min={2}
                max={20}
                value={tariffPerUnit}
                onChange={(e) => setTariffPerUnit(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <span className="absolute right-4 top-3 text-xs text-slate-400 font-medium">₹/unit</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">Higher slab rate in your state.</p>
          </div>

          {/* Desired Offset */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Target Bill Offset %
            </label>
            <select
              value={desiredOffsetPercent}
              onChange={(e) => setDesiredOffsetPercent(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            >
              <option value={75}>75% (Substantial Offset)</option>
              <option value={90}>90% (Near Zero Bill)</option>
              <option value={100}>100% (Full Net Zero)</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1.5">Desired solar coverage level.</p>
          </div>
        </div>
      </div>

      {/* Recommended System Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-amber-50/80 to-white border border-amber-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-amber-800 font-bold block">Recommended Solar Size</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {solar.recommendedKw} <span className="text-sm font-semibold text-slate-500">kWp</span>
          </div>
          <span className="text-xs text-slate-600 mt-1 block font-medium">
            {solar.panelsCount} High-Efficiency Mono PERC Panels
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Monthly Generation</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            ~{solar.monthlyGeneration} <span className="text-sm font-semibold text-slate-400">units</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            ~{solar.annualGeneration.toLocaleString('en-IN')} units / year
          </span>
        </div>

        <div className="bg-gradient-to-br from-sky-50/80 to-white border border-sky-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-sky-800 font-bold block">PM Surya Ghar Subsidy</span>
          <div className="text-3xl font-black text-sky-600 mt-1">
            ₹{solar.centralSubsidy.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">
            Direct Central Govt DBT
          </span>
        </div>

        <div className="bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-emerald-800 font-bold block">Annual Electricity Savings</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            ₹{solar.annualSavings.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Every year for 25+ years
          </span>
        </div>
      </div>

      {/* Financial Investment & Payback Card */}
      <div className="bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/30 border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block">
              25-Year Commercial Return
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Rooftop Solar Financial Payback Timeline
            </h3>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-slate-500 block font-medium">Full Break-Even Payback</span>
            <span className="text-2xl font-black text-amber-600">
              ~{solar.paybackYears} Years
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-2 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">Gross Estimated Cost</span>
            <div className="text-2xl font-black text-slate-900">
              ₹{solar.grossCost.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Includes solar panels, on-grid inverter, mounting structure, bi-directional net meter, and installation.
            </p>
          </div>

          <div className="bg-white border border-sky-200/90 rounded-2xl p-5 space-y-2 shadow-xs">
            <span className="text-xs text-sky-700 font-bold">Net Cost (After Subsidy)</span>
            <div className="text-2xl font-black text-sky-600">
              ₹{solar.netCost.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              You only pay this net amount after receiving ₹{solar.centralSubsidy.toLocaleString('en-IN')} directly into your bank account.
            </p>
          </div>

          <div className="bg-white border border-emerald-200/90 rounded-2xl p-5 space-y-2 shadow-xs">
            <span className="text-xs text-emerald-700 font-bold">25-Year Net Profit</span>
            <div className="text-2xl font-black text-emerald-600">
              ₹{solar.lifetime25YearSavings.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Solar panels carry a 25-year performance warranty. After recovering costs in {solar.paybackYears} years, you generate free electricity for 21+ years.
            </p>
          </div>
        </div>

        {/* Affiliate Action */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleAffiliateClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Get Verified Rooftop Solar Quotes</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
