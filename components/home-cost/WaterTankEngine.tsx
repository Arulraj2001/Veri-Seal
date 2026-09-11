'use client';

import React, { useState, useMemo } from 'react';
import {
  Droplets,
  Building,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { calculateWaterTank } from '@/lib/home-cost/calculations';

export default function WaterTankEngine() {
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [bufferDays, setBufferDays] = useState<number>(2);
  const [hasGardenOrCars, setHasGardenOrCars] = useState<boolean>(true);

  const tank = useMemo(() => {
    return calculateWaterTank({
      familyMembers,
      bathrooms,
      bufferDays,
      hasGardenOrCars,
    });
  }, [familyMembers, bathrooms, bufferDays, hasGardenOrCars]);

  const handleAffiliateClick = () => {
    const query = encodeURIComponent(`water tank ${tank.recommendedOverhead} litres sintex plastek 4 layer`);
    window.open(`https://www.amazon.in/s?k=${query}&tag=veriseal-21`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Configuration Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Droplets className="w-5 h-5 text-teal-600" />
          <span>Household Water Demand &amp; Buffer Parameters (IS 1172)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Family Members */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Family Members Living in House
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={15}
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-teal-500 transition-colors"
              />
              <span className="text-xs text-slate-400 font-medium">People</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">Standard Indian household average: 3–5.</p>
          </div>

          {/* Backup Days Buffer */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Municipal Supply Backup Buffer
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setBufferDays(d)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    bufferDays === d
                      ? 'bg-teal-50 border-teal-400 text-teal-800 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {d} {d === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">Protects during municipal pipeline maintenance.</p>
          </div>

          {/* Garden / Car Wash Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Garden Watering &amp; Car Washing
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHasGardenOrCars(true)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  hasGardenOrCars
                    ? 'bg-teal-50 border-teal-400 text-teal-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Yes (+40 L/head)
              </button>
              <button
                type="button"
                onClick={() => setHasGardenOrCars(false)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  !hasGardenOrCars
                    ? 'bg-teal-50 border-teal-400 text-teal-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Standard Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Daily Water Consumption</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {tank.dailyHouseholdLitres.toLocaleString('en-IN')} <span className="text-sm font-semibold text-slate-400">Litres</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {tank.dailyLpcd} Litres per person per day (IS 1172)
          </span>
        </div>

        <div className="bg-white border border-teal-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-teal-700 font-bold block">Recommended Overhead Tank</span>
          <div className="text-3xl font-black text-teal-600 mt-1">
            {tank.recommendedOverhead.toLocaleString('en-IN')} <span className="text-sm font-semibold text-slate-400">Litres</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Rooftop Loft Tank capacity
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Recommended Underground Sump</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {tank.recommendedSump.toLocaleString('en-IN')} <span className="text-sm font-semibold text-slate-400">Litres</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Ground-level storage reservoir
          </span>
        </div>
      </div>

      {/* Buying Guide Card */}
      <div className="bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/30 border border-teal-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wider block">
            Plumbing Installation Recommendation
          </span>
          <h4 className="text-lg font-extrabold text-slate-900">
            Install a {tank.recommendedOverhead} Litres 4-Layer UV-Stabilized Overhead Tank
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Multi-layer food-grade plastic tanks prevent algae formation and keep water cooler by 10°C during hot Indian summers. A 1 HP monoblock pump fills this tank in ~45 minutes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAffiliateClick}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 shrink-0 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>View 4-Layer Water Tanks on Amazon</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
