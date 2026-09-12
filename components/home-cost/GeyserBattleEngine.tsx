'use client';

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Sun,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { calculateGeyserComparison } from '@/lib/home-cost/calculations';

export default function GeyserBattleEngine() {
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [bathsPerDay, setBathsPerDay] = useState<number>(1);
  const [electricityTariff, setElectricityTariff] = useState<number>(7.5);
  const [lpgCylinderPrice, setLpgCylinderPrice] = useState<number>(850);

  const geyser = useMemo(() => {
    return calculateGeyserComparison({
      familyMembers,
      bathsPerDay,
      electricityTariff,
      lpgCylinderPrice,
    });
  }, [familyMembers, bathsPerDay, electricityTariff, lpgCylinderPrice]);

  const handleAffiliateClick = (type: 'solar' | 'electric') => {
    const query = type === 'solar'
      ? 'solar water heater 150 lpd racold supreme'
      : '5 star storage water geyser 15 litre 25 litre crompton havells';
    window.open(`https://www.amazon.in/s?k=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Parameters */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Flame className="w-5 h-5 text-amber-500" />
          <span>Hot Water Usage &amp; Fuel Price Parameters</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Family Members
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={familyMembers}
              onChange={(e) => setFamilyMembers(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Baths per Person / Day
            </label>
            <select
              value={bathsPerDay}
              onChange={(e) => setBathsPerDay(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
            >
              <option value={1}>1 Hot Bath / Day</option>
              <option value={2}>2 Hot Baths / Day (Morning + Evening)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Electricity Tariff (₹/unit)
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
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              LPG Cylinder Price (₹)
            </label>
            <input
              type="number"
              min={600}
              max={1500}
              value={lpgCylinderPrice}
              onChange={(e) => setLpgCylinderPrice(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 3-Way Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Electric Geyser */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-700 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-600" />
              Electric Storage Geyser
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">2000W Element</span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            ₹{geyser.annualCostElectric.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/year</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Convenient, fast heating, but creates heavy peak electrical load during winter mornings.
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            Monthly Running: <strong className="text-slate-900">₹{Math.round(geyser.annualCostElectric / 12)}/mo</strong>
          </div>
        </div>

        {/* Gas Geyser */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              LPG Gas Geyser
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Instant Burner</span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            ₹{geyser.annualCostGas.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/year</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Lower operational cost than electric, but requires bathroom chimney ventilation and LPG cylinder plumbing.
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            Monthly Running: <strong className="text-slate-900">₹{Math.round(geyser.annualCostGas / 12)}/mo</strong>
          </div>
        </div>

        {/* Solar Water Heater */}
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 border border-emerald-300 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-emerald-600" />
              Solar Water Heater (150L)
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              WINNER
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-700">
            ₹{geyser.annualCostSolar.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/year</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Free solar energy for 300+ sunny days. Saves <strong className="text-slate-900">₹{geyser.annualSavingsSolar.toLocaleString('en-IN')} every year</strong>.
          </p>
          <div className="pt-2 border-t border-emerald-100 text-xs text-emerald-800 font-medium">
            Full Payback: <strong className="text-emerald-700 font-bold">~{geyser.solarPaybackYears} Years</strong>
          </div>
        </div>
      </div>

      {/* Decision Summary */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
            Long-Term Recommendation
          </span>
          <h4 className="text-lg font-extrabold text-slate-900">
            Install a 150 LPD Rooftop Solar Water Heater for Independent Houses
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            For independent homes, a solar water heater eliminates 85% of water heating costs. For apartments where roof access is restricted, upgrade to a BEE 5-Star Storage Geyser with high polyurethane foam (PUF) insulation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleAffiliateClick('solar')}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>View Solar Water Heaters</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
