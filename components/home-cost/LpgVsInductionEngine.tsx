'use client';

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { calculateLpgVsInduction } from '@/lib/home-cost/calculations';

export default function LpgVsInductionEngine() {
  const [hoursCookingPerDay, setHoursCookingPerDay] = useState<number>(1.8);
  const [lpgPrice, setLpgPrice] = useState<number>(850);
  const [electricityTariff, setElectricityTariff] = useState<number>(7.5);

  const comp = useMemo(() => {
    return calculateLpgVsInduction({
      hoursCookingPerDay,
      lpgPrice,
      electricityTariff,
    });
  }, [hoursCookingPerDay, lpgPrice, electricityTariff]);

  const handleAffiliateClick = () => {
    const query = encodeURIComponent('induction cooktop 2000w prestige philips pigeon');
    window.open(`https://www.amazon.in/s?k=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Parameter Inputs */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Flame className="w-5 h-5 text-amber-500" />
          <span>Cooking Usage &amp; Fuel Pricing</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Daily Cooking Time (Hours/Day)
            </label>
            <input
              type="number"
              step={0.2}
              min={0.5}
              max={8}
              value={hoursCookingPerDay}
              onChange={(e) => setHoursCookingPerDay(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500 mt-1.5">Sum of breakfast, lunch, and dinner stove time.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              14.2 kg LPG Cylinder Price (₹)
            </label>
            <input
              type="number"
              min={600}
              max={1500}
              value={lpgPrice}
              onChange={(e) => setLpgPrice(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500 mt-1.5">Subsidized / domestic retail cylinder rate.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Electricity Tariff Rate (₹/Unit)
            </label>
            <input
              type="number"
              step={0.5}
              min={2}
              max={20}
              value={electricityTariff}
              onChange={(e) => setElectricityTariff(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500 mt-1.5">Average rate per kWh in your home.</p>
          </div>
        </div>
      </div>

      {/* Head to Head Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LPG Column */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              LPG Gas Cylinder
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">60% Thermal Transfer</span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            ₹{comp.monthlyLpgCost.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500"> / month</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consumes ~{comp.cylindersPerMonth} cylinder(s) monthly. Around 40% of the gas flame heat escapes around the vessel into the ambient kitchen.
          </p>
          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
            Annual Fuel Spend: <strong className="text-slate-900">₹{(comp.monthlyLpgCost * 12).toLocaleString('en-IN')}/yr</strong>
          </div>
        </div>

        {/* Induction Column */}
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 border border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" />
              1800W Induction Cooktop
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
              84% THERMAL EFFICIENCY
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-700">
            ₹{comp.monthlyInductionCost.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500"> / month</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consumes {comp.monthlyInductionUnits} units monthly. Electromagnetic energy heats the pan directly with zero open flame and zero hot kitchen sweat.
          </p>
          <div className="pt-3 border-t border-emerald-100 text-xs text-emerald-800 font-medium">
            Annual Power Spend: <strong className="text-emerald-700 font-bold">₹{(comp.monthlyInductionCost * 12).toLocaleString('en-IN')}/yr</strong>
          </div>
        </div>
      </div>

      {/* Decision Summary Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
            Kitchen Decision Verdict
          </span>
          <h4 className="text-lg font-extrabold text-slate-900">
            Induction Boils 50% Faster with Zero Ambient Kitchen Heat
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            While monthly operating costs between LPG and electricity are closely comparable (₹{comp.monthlyLpgCost} vs ₹{comp.monthlyInductionCost}), pairing induction with a rooftop solar system makes your cooking 100% free forever.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAffiliateClick}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 shrink-0 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>View 2000W Induction Stoves on Amazon</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
