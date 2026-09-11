'use client';

import React from 'react';
import { Sliders, Sparkles, TrendingDown, Sun, Wind, Thermometer, ShieldCheck } from 'lucide-react';
import { WhatIfSimulationAdjustments } from '@/lib/home-cost/types';

interface Props {
  adjustments: WhatIfSimulationAdjustments;
  onChange: (newAdj: WhatIfSimulationAdjustments) => void;
  savingsResult: {
    baselineBill: number;
    simulatedBill: number;
    monthlySavings: number;
    annualSavings: number;
    savingsHighlights: string[];
  };
}

export default function WhatIfSimulator({ adjustments, onChange, savingsResult }: Props) {
  const handleUpdate = (field: keyof WhatIfSimulationAdjustments, value: any) => {
    onChange({
      ...adjustments,
      [field]: value,
    });
  };

  const percentageSaved = savingsResult.baselineBill > 0
    ? Math.min(100, Math.round((savingsResult.monthlySavings / savingsResult.baselineBill) * 100))
    : 0;

  return (
    <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Decision Simulator</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            “What If?” Home Cost Reduction Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Slide the controls below to see instant live savings before spending a single rupee.
          </p>
        </div>

        {/* Live Savings Callout Card */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-right shrink-0">
          <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
            Potential Savings
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
            ₹{savingsResult.monthlySavings.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-300">/mo</span>
          </div>
          <span className="text-xs font-bold text-white block mt-0.5">
            ₹{savingsResult.annualSavings.toLocaleString('en-IN')}<span className="text-[10px] text-slate-400 font-normal"> saved every year</span>
          </span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Slider 1: AC Hours Reduction */}
        <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-sky-400" />
              Reduce AC Usage
            </label>
            <span className="text-xs font-black text-sky-400 px-2 py-0.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
              {adjustments.acHoursReduction} hrs/day
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={6}
            step={1}
            value={adjustments.acHoursReduction}
            onChange={(e) => handleUpdate('acHoursReduction', Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <p className="text-[11px] text-slate-400">
            E.g. turn off AC 1-2 hours early in the morning using a sleep timer.
          </p>
        </div>

        {/* Slider 2: AC Set Temperature Increase */}
        <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-amber-400" />
              Increase AC Temp
            </label>
            <span className="text-xs font-black text-amber-400 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              +{adjustments.acTempIncreaseDegrees}°C higher
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={4}
            step={1}
            value={adjustments.acTempIncreaseDegrees}
            onChange={(e) => handleUpdate('acTempIncreaseDegrees', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <p className="text-[11px] text-slate-400">
            Setting AC to 24°C or 25°C instead of 20°C saves ~6% electricity per °C.
          </p>
        </div>

        {/* Slider 3: BLDC Fans */}
        <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Switch to 28W BLDC Fans
            </label>
            <span className="text-xs font-black text-emerald-400 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              {adjustments.fansSwitchedToBldc} fan(s)
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={6}
            step={1}
            value={adjustments.fansSwitchedToBldc}
            onChange={(e) => handleUpdate('fansSwitchedToBldc', Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <p className="text-[11px] text-slate-400">
            Replaces standard 75W ceiling fans with 28W BLDC motors (saves 63%).
          </p>
        </div>

        {/* Slider 4: Rooftop Solar kW */}
        <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-yellow-400" />
              Add Rooftop Solar
            </label>
            <span className="text-xs font-black text-yellow-400 px-2 py-0.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              {adjustments.solarCapacityKw} kW Solar
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={adjustments.solarCapacityKw}
            onChange={(e) => handleUpdate('solarCapacityKw', Number(e.target.value))}
            className="w-full accent-yellow-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <p className="text-[11px] text-slate-400">
            Generates ~125 units/month per kW with PM Surya Ghar subsidy.
          </p>
        </div>

        {/* Toggle 5: Old Fridge Upgrade */}
        <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between gap-3">
          <div>
            <label className="text-xs font-bold text-white block">
              Replace Old Refrigerator
            </label>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Upgrade &gt;8-yr fridge to 5-Star Smart Inverter
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleUpdate('fridgeReplacedTo5Star', !adjustments.fridgeReplacedTo5Star)}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
              adjustments.fridgeReplacedTo5Star ? 'bg-emerald-500' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                adjustments.fridgeReplacedTo5Star ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Toggle 6: Solar Water Heater */}
        <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between gap-3">
          <div>
            <label className="text-xs font-bold text-white block">
              Solar Water Heater
            </label>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Replace 2000W electric geyser with solar thermal
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleUpdate('geyserSwitchedToSolar', !adjustments.geyserSwitchedToSolar)}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
              adjustments.geyserSwitchedToSolar ? 'bg-emerald-500' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                adjustments.geyserSwitchedToSolar ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Dynamic Summary Bar */}
      <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-300 font-semibold">
              Monthly Bill: <span className="line-through text-slate-500">₹{savingsResult.baselineBill.toLocaleString('en-IN')}</span> &rarr; <span className="text-emerald-400 font-bold text-sm">₹{savingsResult.simulatedBill.toLocaleString('en-IN')}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Reduction: <strong className="text-white">{percentageSaved}%</strong> of your entire household power bill eliminated.
            </div>
          </div>
        </div>

        {/* Reset button if any change */}
        {(adjustments.acHoursReduction > 0 ||
          adjustments.acTempIncreaseDegrees > 0 ||
          adjustments.fansSwitchedToBldc > 0 ||
          adjustments.fridgeReplacedTo5Star ||
          adjustments.solarCapacityKw > 0 ||
          adjustments.geyserSwitchedToSolar) && (
          <button
            type="button"
            onClick={() =>
              onChange({
                acHoursReduction: 0,
                acTempIncreaseDegrees: 0,
                fansSwitchedToBldc: 0,
                fridgeReplacedTo5Star: false,
                solarCapacityKw: 0,
                geyserSwitchedToSolar: false,
              })
            }
            className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors shrink-0"
          >
            Reset Simulator
          </button>
        )}
      </div>
    </div>
  );
}
