'use client';

import React, { useState, useMemo } from 'react';
import {
  BatteryCharging,
  Zap,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { calculateInverterAndBattery } from '@/lib/home-cost/calculations';

export default function InverterBatteryEngine() {
  const [fansCount, setFansCount] = useState<number>(3);
  const [lightsCount, setLightsCount] = useState<number>(5);
  const [tvsCount, setTvsCount] = useState<number>(1);
  const [wifiCount, setWifiCount] = useState<number>(1);
  const [fridgeIncluded, setFridgeIncluded] = useState<boolean>(true);
  const [acIncluded, setAcIncluded] = useState<boolean>(false);
  const [requiredBackupHours, setRequiredBackupHours] = useState<number>(4);
  const [batteryType, setBatteryType] = useState<'tubular' | 'lithium'>('tubular');

  const sizing = useMemo(() => {
    return calculateInverterAndBattery({
      fansCount,
      lightsCount,
      tvsCount,
      wifiCount,
      fridgeIncluded,
      acIncluded,
      requiredBackupHours,
      batteryType,
    });
  }, [
    fansCount,
    lightsCount,
    tvsCount,
    wifiCount,
    fridgeIncluded,
    acIncluded,
    requiredBackupHours,
    batteryType,
  ]);

  const handleAffiliateClick = () => {
    const query = encodeURIComponent(`pure sine wave inverter ${sizing.recommendedKva}kva ${sizing.recommendedBatteryAh}ah battery luminous microtek`);
    window.open(`https://www.amazon.in/s?k=${query}&tag=veriseal-21`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Load Selection Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <BatteryCharging className="w-5 h-5 text-emerald-400" />
          <span>Appliance Power Outage Load Configuration</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Fans */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs font-semibold text-slate-300 block mb-1">Ceiling Fans (75W)</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={10}
                value={fansCount}
                onChange={(e) => setFansCount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              />
              <span className="text-xs text-slate-400">Fans</span>
            </div>
          </div>

          {/* Lights */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs font-semibold text-slate-300 block mb-1">LED Lights (15W)</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={20}
                value={lightsCount}
                onChange={(e) => setLightsCount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              />
              <span className="text-xs text-slate-400">Bulbs</span>
            </div>
          </div>

          {/* TV */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs font-semibold text-slate-300 block mb-1">Smart TVs (95W)</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={4}
                value={tvsCount}
                onChange={(e) => setTvsCount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              />
              <span className="text-xs text-slate-400">TVs</span>
            </div>
          </div>

          {/* WiFi */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs font-semibold text-slate-300 block mb-1">WiFi Router (12W)</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={4}
                value={wifiCount}
                onChange={(e) => setWifiCount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              />
              <span className="text-xs text-slate-400">Units</span>
            </div>
          </div>
        </div>

        {/* Heavy Load Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Refrigerator (120W average)</span>
              <p className="text-[11px] text-slate-400">Keeps food cold during extended blackouts.</p>
            </div>
            <button
              type="button"
              onClick={() => setFridgeIncluded(!fridgeIncluded)}
              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                fridgeIncluded ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  fridgeIncluded ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">1.5 Ton Inverter AC (1100W)</span>
              <p className="text-[11px] text-slate-400">Requires minimum 2.5 kVA / 24V inverter.</p>
            </div>
            <button
              type="button"
              onClick={() => setAcIncluded(!acIncluded)}
              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                acIncluded ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  acIncluded ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Backup Duration & Battery Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800/80">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
              <span>Required Power Backup Duration</span>
              <span className="text-emerald-400 font-bold">{requiredBackupHours} Hours</span>
            </div>
            <input
              type="range"
              min={2}
              max={10}
              step={1}
              value={requiredBackupHours}
              onChange={(e) => setRequiredBackupHours(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">Typical power cuts in India range between 2 and 4 hours.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Battery Technology Choice
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBatteryType('tubular')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  batteryType === 'tubular'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Tubular Lead-Acid (75% DoD)
              </button>
              <button
                type="button"
                onClick={() => setBatteryType('lithium')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  batteryType === 'lithium'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Lithium LiFePO4 (90% DoD)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sizing Recommendations Output */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Total Running Wattage</span>
          <div className="text-3xl font-black text-white mt-1">
            {sizing.totalWatts} <span className="text-sm font-normal text-slate-400">Watts</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Connected active load
          </span>
        </div>

        <div className="bg-slate-900/70 border border-sky-500/30 rounded-2xl p-5">
          <span className="text-xs text-sky-400 font-bold block">Recommended Inverter Capacity</span>
          <div className="text-3xl font-black text-sky-400 mt-1">
            {sizing.recommendedKva} <span className="text-sm font-normal text-slate-400">kVA</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            {sizing.inverterCapacityVa} VA Pure Sine Wave ({sizing.systemVoltage}V)
          </span>
        </div>

        <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-5">
          <span className="text-xs text-emerald-400 font-bold block">Recommended Battery Bank</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            {sizing.recommendedBatteryAh} <span className="text-sm font-normal text-slate-400">Ah</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            {sizing.batteryCount} × {sizing.recommendedBatteryAh}Ah ({batteryType === 'lithium' ? 'Lithium' : 'Tubular'})
          </span>
        </div>
      </div>

      {/* Buying Advice Card */}
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            System Match Recommendation
          </span>
          <h4 className="text-lg font-bold text-white">
            {sizing.recommendedKva} kVA Pure Sine Wave Inverter + {sizing.batteryCount} × {sizing.recommendedBatteryAh} Ah Battery
          </h4>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Guarantees a true {requiredBackupHours} hours of uninterrupted backup for your {sizing.totalWatts}W load without tripping or dangerous voltage sag. Pure Sine Wave protects sensitive laptop and fridge motherboards.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAffiliateClick}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 shrink-0 transition-all active:scale-[0.99]"
        >
          <span>View Verified Combos on Amazon</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
