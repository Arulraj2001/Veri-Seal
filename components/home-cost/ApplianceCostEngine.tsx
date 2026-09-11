'use client';

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Clock,
  Coins,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { APPLIANCES_DATABASE } from '@/lib/home-cost/appliances-db';

export default function ApplianceCostEngine() {
  const [selectedApplianceId, setSelectedApplianceId] = useState<string>('ac_1_5_ton_3star');
  const [wattage, setWattage] = useState<number>(1200);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [tariff, setTariff] = useState<number>(7.5);

  const selectedDef = useMemo(() => {
    return APPLIANCES_DATABASE.find((a) => a.id === selectedApplianceId);
  }, [selectedApplianceId]);

  const handleSelectPreset = (id: string) => {
    const def = APPLIANCES_DATABASE.find((a) => a.id === id);
    if (!def) return;
    setSelectedApplianceId(id);
    setWattage(def.defaultWattage);
    setHoursPerDay(def.typicalDailyHours);
  };

  const cost = useMemo(() => {
    const dailyKwh = (wattage * hoursPerDay) / 1000.0;
    const monthlyKwh = dailyKwh * 30;
    const annualKwh = dailyKwh * 365;

    const dailyCost = Number((dailyKwh * tariff).toFixed(2));
    const monthlyCost = Math.round(monthlyKwh * tariff);
    const annualCost = Math.round(annualKwh * tariff);

    return {
      dailyKwh: Number(dailyKwh.toFixed(2)),
      monthlyKwh: Math.round(monthlyKwh),
      annualKwh: Math.round(annualKwh),
      dailyCost,
      monthlyCost,
      annualCost,
    };
  }, [wattage, hoursPerDay, tariff]);

  const handleAffiliateClick = () => {
    if (!selectedDef?.efficientAlternative) return;
    const query = encodeURIComponent(selectedDef.efficientAlternative.affiliateKeyword);
    window.open(`https://www.amazon.in/s?k=${query}&tag=veriseal-21`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Quick Appliance Pills */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Select an Appliance Preset
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {APPLIANCES_DATABASE.slice(0, 10).map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => handleSelectPreset(a.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedApplianceId === a.id
                  ? 'bg-sky-500/20 border-sky-500 text-sky-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Adjusters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Appliance Wattage (Watts)
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={10000}
              value={wattage}
              onChange={(e) => setWattage(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-sky-500"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-500">Watts</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Check the sticker on the back of the device.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Daily Usage (Hours/Day)
          </label>
          <div className="relative">
            <input
              type="number"
              step={0.5}
              min={0.1}
              max={24}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-sky-500"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-500">Hours</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Electricity Tariff (₹/Unit)
          </label>
          <div className="relative">
            <input
              type="number"
              step={0.5}
              min={1}
              max={25}
              value={tariff}
              onChange={(e) => setTariff(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-sky-500"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-500">₹/kWh</span>
          </div>
        </div>
      </div>

      {/* Primary Running Cost Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Daily Cost</span>
          <div className="text-3xl font-black text-white mt-1">
            ₹{cost.dailyCost}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {cost.dailyKwh} kWh / day
          </span>
        </div>

        <div className="bg-slate-900/70 border border-sky-500/30 rounded-2xl p-5">
          <span className="text-xs text-sky-400 font-bold block">Monthly Running Cost</span>
          <div className="text-3xl font-black text-sky-400 mt-1">
            ₹{cost.monthlyCost.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            {cost.monthlyKwh} kWh / month (30 days)
          </span>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Annual Electricity Bill</span>
          <div className="text-3xl font-black text-white mt-1">
            ₹{cost.annualCost.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {cost.annualKwh} kWh / year
          </span>
        </div>
      </div>

      {/* Energy-Saving Alternative Callout */}
      {selectedDef?.efficientAlternative && (
        <div className="bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              High-Efficiency Upgrade Available
            </span>
            <h4 className="text-base font-bold text-white">
              {selectedDef.efficientAlternative.name}
            </h4>
            <p className="text-xs text-slate-300">
              {selectedDef.efficientAlternative.notes}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAffiliateClick}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md active:scale-[0.99]"
          >
            <span>View on Amazon India</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
