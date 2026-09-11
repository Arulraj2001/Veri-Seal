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
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <Sun className="w-5 h-5 text-yellow-400" />
          <span>Home Rooftop Solar Specifications &amp; Roof Dimensions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Monthly Units */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Monthly Consumption (Units)
            </label>
            <div className="relative">
              <input
                type="number"
                min={50}
                max={5000}
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-yellow-400"
              />
              <span className="absolute right-4 top-3 text-xs text-slate-500">kWh</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Check your average summer bill.</p>
          </div>

          {/* Roof Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Shadow-Free Roof Area
            </label>
            <div className="relative">
              <input
                type="number"
                min={50}
                max={5000}
                value={roofAreaSqFt}
                onChange={(e) => setRoofAreaSqFt(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-yellow-400"
              />
              <span className="absolute right-4 top-3 text-xs text-slate-500">sq ft</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">~90–100 sq ft required per 1 kW.</p>
          </div>

          {/* Electricity Tariff */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
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
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-yellow-400"
              />
              <span className="absolute right-4 top-3 text-xs text-slate-500">₹/unit</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Higher slab rate in your state.</p>
          </div>

          {/* Desired Offset */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Target Bill Offset %
            </label>
            <select
              value={desiredOffsetPercent}
              onChange={(e) => setDesiredOffsetPercent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-yellow-400"
            >
              <option value={75}>75% (Substantial Offset)</option>
              <option value={90}>90% (Near Zero Bill)</option>
              <option value={100}>100% (Full Net Zero)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommended System Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-slate-900/70 border border-yellow-500/40 rounded-2xl p-5">
          <span className="text-xs text-yellow-400 font-bold block">Recommended Solar Size</span>
          <div className="text-3xl font-black text-white mt-1">
            {solar.recommendedKw} <span className="text-sm font-normal text-slate-400">kWp</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            {solar.panelsCount} High-Efficiency Mono PERC Panels
          </span>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Monthly Generation</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            ~{solar.monthlyGeneration} <span className="text-sm font-normal text-slate-400">units</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            ~{solar.annualGeneration.toLocaleString('en-IN')} units / year
          </span>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">PM Surya Ghar Subsidy</span>
          <div className="text-3xl font-black text-sky-400 mt-1">
            ₹{solar.centralSubsidy.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-400 mt-1 block">
            Direct Central Govt DBT
          </span>
        </div>

        <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-5">
          <span className="text-xs text-emerald-400 font-bold block">Annual Electricity Savings</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            ₹{solar.annualSavings.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Every year for 25+ years
          </span>
        </div>
      </div>

      {/* Financial Investment & Payback Card */}
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-yellow-950/20 border border-yellow-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">
              25-Year Commercial Return
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">
              Rooftop Solar Financial Payback Timeline
            </h3>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Full Break-Even Payback</span>
            <span className="text-2xl font-black text-yellow-400">
              ~{solar.paybackYears} Years
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Gross Estimated Cost</span>
            <div className="text-2xl font-black text-white">
              ₹{solar.grossCost.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-400">
              Includes solar panels, on-grid inverter, mounting structure, bi-directional net meter, and installation.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <span className="text-xs text-sky-400 font-semibold">Net Cost (After Subsidy)</span>
            <div className="text-2xl font-black text-sky-400">
              ₹{solar.netCost.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-400">
              You only pay this net amount after receiving ₹{solar.centralSubsidy.toLocaleString('en-IN')} directly into your bank account.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <span className="text-xs text-emerald-400 font-semibold">25-Year Net Profit</span>
            <div className="text-2xl font-black text-emerald-400">
              ₹{solar.lifetime25YearSavings.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-300">
              Solar panels carry a 25-year performance warranty. After recovering costs in {solar.paybackYears} years, you generate free electricity for 21+ years.
            </p>
          </div>
        </div>

        {/* Affiliate Action */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleAffiliateClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shadow-lg shadow-yellow-400/20 transition-all active:scale-[0.99]"
          >
            <span>Get Verified Rooftop Solar Quotes</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
