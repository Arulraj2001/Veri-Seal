'use client';

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Building,
  Plus,
  Trash2,
  TrendingDown,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { HouseholdApplianceItem, IndianStateId } from '@/lib/home-cost/types';
import { ALL_INDIAN_STATES, INDIAN_STATE_TARIFFS, calculateStateBill } from '@/lib/home-cost/tariffs';
import { APPLIANCES_DATABASE, PRESET_HOMES } from '@/lib/home-cost/appliances-db';
import { calculateHouseholdBill } from '@/lib/home-cost/calculations';
import ApplianceBreakdownChart from './ApplianceBreakdownChart';

export default function ElectricityBillEngine() {
  const [selectedState, setSelectedState] = useState<IndianStateId>('tamil_nadu');
  const [sanctionedLoadKw, setSanctionedLoadKw] = useState<number>(3);
  const [appliances, setAppliances] = useState<HouseholdApplianceItem[]>(
    PRESET_HOMES[1].appliances
  );
  const [selectedNewApplianceId, setSelectedNewApplianceId] = useState<string>(
    APPLIANCES_DATABASE[0].id
  );

  const breakdown = useMemo(() => {
    return calculateHouseholdBill(appliances, selectedState, sanctionedLoadKw);
  }, [appliances, selectedState, sanctionedLoadKw]);

  const billDetails = useMemo(() => {
    return calculateStateBill(breakdown.monthlyUnits, selectedState, sanctionedLoadKw);
  }, [breakdown.monthlyUnits, selectedState, sanctionedLoadKw]);

  const handleAdd = () => {
    const def = APPLIANCES_DATABASE.find((a) => a.id === selectedNewApplianceId);
    if (!def) return;
    const newItem: HouseholdApplianceItem = {
      instanceId: `app_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      applianceId: def.id,
      customName: def.name,
      quantity: 1,
      wattage: def.defaultWattage,
      dailyHours: def.typicalDailyHours,
      category: def.category,
    };
    setAppliances((prev) => [...prev, newItem]);
  };

  const handleRemove = (instanceId: string) => {
    setAppliances((prev) => prev.filter((a) => a.instanceId !== instanceId));
  };

  const handleUpdate = (instanceId: string, field: keyof HouseholdApplianceItem, val: any) => {
    setAppliances((prev) =>
      prev.map((a) => (a.instanceId === instanceId ? { ...a, [field]: val } : a))
    );
  };

  return (
    <div className="space-y-8">
      {/* Configuration Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* State Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              State Electricity Board
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value as IndianStateId)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {ALL_INDIAN_STATES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sanctioned Load (kW) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Sanctioned Load (kW)
            </label>
            <select
              value={sanctionedLoadKw}
              onChange={(e) => setSanctionedLoadKw(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value={1}>1 kW (Small 1BHK / Lights & Fans)</option>
              <option value={2}>2 kW (2BHK / 1 AC)</option>
              <option value={3}>3 kW (Standard 2-3 BHK / 1-2 ACs)</option>
              <option value={5}>5 kW (3-4 BHK / Multiple ACs)</option>
              <option value={7}>7 kW+ (Luxury Villa / 3+ ACs)</option>
            </select>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Quick House Template
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_HOMES.slice(0, 2).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setAppliances(p.appliances);
                    setSelectedState(p.state);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors truncate text-left"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State Tariff Summary Alert */}
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <Building className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>{INDIAN_STATE_TARIFFS[selectedState]?.discomName}:</strong> Fixed charge: ₹{INDIAN_STATE_TARIFFS[selectedState]?.fixedMonthlyChargePerKw}/kW &bull; {INDIAN_STATE_TARIFFS[selectedState]?.notes}
          </span>
        </div>
      </div>

      {/* High-Level Output Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 block font-medium">Estimated Monthly Units</span>
          <div className="text-3xl font-black text-white mt-1">
            {breakdown.monthlyUnits} <span className="text-sm font-normal text-slate-400">kWh</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            ~{(breakdown.monthlyUnits / 30).toFixed(1)} units/day
          </span>
        </div>

        <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-5">
          <span className="text-xs text-emerald-400 block font-bold">Estimated Monthly Bill</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            ₹{breakdown.monthlyBill.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            ₹{breakdown.energyCharges} energy + ₹{breakdown.fixedCharges} fixed load
          </span>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 block font-medium">Effective Tariff Rate</span>
          <div className="text-3xl font-black text-sky-400 mt-1">
            ₹{breakdown.effectiveRatePerUnit} <span className="text-sm font-normal text-slate-400">/ unit</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Annual: ₹{breakdown.annualBill.toLocaleString('en-IN')}/year
          </span>
        </div>
      </div>

      {/* Visual Charts */}
      <ApplianceBreakdownChart breakdown={breakdown} />

      {/* Tariff Slab Table Breakdown */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Detailed Slab-by-Slab Calculation</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Slab Range</th>
                <th className="p-3">Units in Slab</th>
                <th className="p-3">Rate / Unit</th>
                <th className="p-3 text-right">Cost (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {billDetails.slabDetails.map((slab, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40">
                  <td className="p-3 font-medium text-white">{slab.slabRange}</td>
                  <td className="p-3 text-slate-300">{slab.unitsInSlab} units</td>
                  <td className="p-3 text-slate-300">₹{slab.rate.toFixed(2)}</td>
                  <td className="p-3 text-right font-bold text-emerald-400">₹{slab.cost}</td>
                </tr>
              ))}
              <tr className="bg-slate-950/80 font-bold">
                <td className="p-3 text-white" colSpan={3}>Fixed Monthly Demand Charges ({sanctionedLoadKw} kW)</td>
                <td className="p-3 text-right text-white">₹{billDetails.fixedCharges}</td>
              </tr>
              <tr className="bg-emerald-950/30 text-sm font-extrabold border-t-2 border-emerald-500/40">
                <td className="p-3 text-emerald-300" colSpan={3}>Total Monthly Bill</td>
                <td className="p-3 text-right text-emerald-400">₹{billDetails.totalBill.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Appliance Editor */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h4 className="text-sm font-bold text-white">Your Appliance Load Inventory</h4>
            <p className="text-xs text-slate-400">Add or edit appliances to see your bill change in real-time.</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedNewApplianceId}
              onChange={(e) => setSelectedNewApplianceId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              {APPLIANCES_DATABASE.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.defaultWattage}W)
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {appliances.map((item) => (
            <div
              key={item.instanceId}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <span className="font-semibold text-white min-w-[200px]">{item.customName}</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-slate-400">
                  <span>Qty:</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={item.quantity}
                    onChange={(e) => handleUpdate(item.instanceId, 'quantity', Number(e.target.value))}
                    className="w-12 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-white"
                  />
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <span>Watts:</span>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={item.wattage}
                    onChange={(e) => handleUpdate(item.instanceId, 'wattage', Number(e.target.value))}
                    className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-white"
                  />
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <span>Hrs/day:</span>
                  <input
                    type="number"
                    min={0.1}
                    max={24}
                    step={0.5}
                    value={item.dailyHours}
                    onChange={(e) => handleUpdate(item.instanceId, 'dailyHours', Number(e.target.value))}
                    className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item.instanceId)}
                  className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
