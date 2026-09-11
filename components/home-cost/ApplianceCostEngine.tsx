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
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select an Appliance Preset
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {APPLIANCES_DATABASE.slice(0, 10).map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => handleSelectPreset(a.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                selectedApplianceId === a.id
                  ? 'bg-sky-50 border-sky-400 text-sky-800 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Adjusters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Appliance Wattage (Watts)
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={10000}
              value={wattage}
              onChange={(e) => setWattage(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-sky-500 transition-colors"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400 font-medium">Watts</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Check the sticker on the back of the device.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
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
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-sky-500 transition-colors"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400 font-medium">Hours</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
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
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-sky-500 transition-colors"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400 font-medium">₹/kWh</span>
          </div>
        </div>
      </div>

      {/* Primary Running Cost Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Daily Cost</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            ₹{cost.dailyCost}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {cost.dailyKwh} kWh / day
          </span>
        </div>

        <div className="bg-white border border-sky-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-sky-700 font-bold block">Monthly Running Cost</span>
          <div className="text-3xl font-black text-sky-600 mt-1">
            ₹{cost.monthlyCost.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {cost.monthlyKwh} kWh / month (30 days)
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Annual Electricity Bill</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            ₹{cost.annualCost.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {cost.annualKwh} kWh / year
          </span>
        </div>
      </div>

      {/* Energy-Saving Alternative Callout */}
      {selectedDef?.efficientAlternative && (
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 border border-emerald-200/90 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
              High-Efficiency Upgrade Available
            </span>
            <h4 className="text-base font-bold text-slate-900">
              {selectedDef.efficientAlternative.name}
            </h4>
            <p className="text-xs text-slate-600">
              {selectedDef.efficientAlternative.notes}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAffiliateClick}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            <span>View on Amazon India</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
