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
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <Droplets className="w-5 h-5 text-teal-400" />
          <span>Household Water Demand &amp; Buffer Parameters (IS 1172)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Family Members */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Family Members Living in House
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={15}
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-teal-400"
              />
              <span className="text-xs text-slate-400">People</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">Standard Indian household average: 3–5.</p>
          </div>

          {/* Backup Days Buffer */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Municipal Supply Backup Buffer
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setBufferDays(d)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    bufferDays === d
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Garden Watering &amp; Car Washing
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHasGardenOrCars(true)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  hasGardenOrCars
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Yes (+40 L/head)
              </button>
              <button
                type="button"
                onClick={() => setHasGardenOrCars(false)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  !hasGardenOrCars
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
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
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Daily Water Consumption</span>
          <div className="text-3xl font-black text-white mt-1">
            {tank.dailyHouseholdLitres.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-400">Litres</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {tank.dailyLpcd} Litres per person per day (IS 1172)
          </span>
        </div>

        <div className="bg-slate-900/70 border border-teal-500/30 rounded-2xl p-5">
          <span className="text-xs text-teal-400 font-bold block">Recommended Overhead Tank</span>
          <div className="text-3xl font-black text-teal-400 mt-1">
            {tank.recommendedOverhead.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-400">Litres</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Rooftop Loft Tank capacity
          </span>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Recommended Underground Sump</span>
          <div className="text-3xl font-black text-white mt-1">
            {tank.recommendedSump.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-400">Litres</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Ground-level storage reservoir
          </span>
        </div>
      </div>

      {/* Buying Guide Card */}
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-teal-950/20 border border-teal-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
            Plumbing Installation Recommendation
          </span>
          <h4 className="text-lg font-bold text-white">
            Install a {tank.recommendedOverhead} Litres 4-Layer UV-Stabilized Overhead Tank
          </h4>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Multi-layer food-grade plastic tanks prevent algae formation and keep water cooler by 10°C during hot Indian summers. A 1 HP monoblock pump fills this tank in ~45 minutes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAffiliateClick}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 shrink-0 transition-all active:scale-[0.99]"
        >
          <span>View 4-Layer Water Tanks on Amazon</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
