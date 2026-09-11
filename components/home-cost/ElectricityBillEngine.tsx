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
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* State Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              State Electricity Board
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value as IndianStateId)}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
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
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Sanctioned Load (kW)
            </label>
            <select
              value={sanctionedLoadKw}
              onChange={(e) => setSanctionedLoadKw(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
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
            <label className="block text-xs font-bold text-slate-700 mb-2">
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
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors truncate text-left cursor-pointer"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State Tariff Summary Alert */}
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-slate-700">
          <Building className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong className="text-slate-900">{INDIAN_STATE_TARIFFS[selectedState]?.discomName}:</strong> Fixed charge: ₹{INDIAN_STATE_TARIFFS[selectedState]?.fixedMonthlyChargePerKw}/kW &bull; {INDIAN_STATE_TARIFFS[selectedState]?.notes}
          </span>
        </div>
      </div>

      {/* High-Level Output Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 block font-medium">Estimated Monthly Units</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {breakdown.monthlyUnits} <span className="text-sm font-semibold text-slate-400">kWh</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            ~{(breakdown.monthlyUnits / 30).toFixed(1)} units/day
          </span>
        </div>

        <div className="bg-white border border-emerald-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-emerald-700 block font-bold">Estimated Monthly Bill</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            ₹{breakdown.monthlyBill.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            ₹{breakdown.energyCharges} energy + ₹{breakdown.fixedCharges} fixed load
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 block font-medium">Effective Tariff Rate</span>
          <div className="text-3xl font-black text-sky-600 mt-1">
            ₹{breakdown.effectiveRatePerUnit} <span className="text-sm font-semibold text-slate-400">/ unit</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Annual: ₹{breakdown.annualBill.toLocaleString('en-IN')}/year
          </span>
        </div>
      </div>

      {/* Visual Charts */}
      <ApplianceBreakdownChart breakdown={breakdown} />

      {/* Tariff Slab Table Breakdown */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600" />
          <span>Detailed Slab-by-Slab Calculation</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
              <tr>
                <th className="p-3">Slab Range</th>
                <th className="p-3">Units in Slab</th>
                <th className="p-3">Rate / Unit</th>
                <th className="p-3 text-right">Cost (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {billDetails.slabDetails.map((slab, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">{slab.slabRange}</td>
                  <td className="p-3 text-slate-600">{slab.unitsInSlab} units</td>
                  <td className="p-3 text-slate-600">₹{slab.rate.toFixed(2)}</td>
                  <td className="p-3 text-right font-bold text-emerald-700">₹{slab.cost}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold">
                <td className="p-3 text-slate-900" colSpan={3}>Fixed Monthly Demand Charges ({sanctionedLoadKw} kW)</td>
                <td className="p-3 text-right text-slate-900">₹{billDetails.fixedCharges}</td>
              </tr>
              <tr className="bg-emerald-50 text-sm font-black border-t-2 border-emerald-300">
                <td className="p-3 text-emerald-900" colSpan={3}>Total Monthly Bill</td>
                <td className="p-3 text-right text-emerald-700">₹{billDetails.totalBill.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Appliance Editor */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Your Appliance Load Inventory</h4>
            <p className="text-xs text-slate-500">Add or edit appliances to see your bill change in real-time.</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedNewApplianceId}
              onChange={(e) => setSelectedNewApplianceId(e.target.value)}
              className="bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
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
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
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
              className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <span className="font-bold text-slate-900 min-w-[200px]">{item.customName}</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-slate-500 font-medium">
                  <span>Qty:</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={item.quantity}
                    onChange={(e) => handleUpdate(item.instanceId, 'quantity', Number(e.target.value))}
                    className="w-12 bg-white border border-slate-200 rounded px-2 py-1 text-center text-slate-900 font-bold"
                  />
                </div>
                <div className="flex items-center gap-1 text-slate-500 font-medium">
                  <span>Watts:</span>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={item.wattage}
                    onChange={(e) => handleUpdate(item.instanceId, 'wattage', Number(e.target.value))}
                    className="w-16 bg-white border border-slate-200 rounded px-2 py-1 text-center text-slate-900 font-bold"
                  />
                </div>
                <div className="flex items-center gap-1 text-slate-500 font-medium">
                  <span>Hrs/day:</span>
                  <input
                    type="number"
                    min={0.1}
                    max={24}
                    step={0.5}
                    value={item.dailyHours}
                    onChange={(e) => handleUpdate(item.instanceId, 'dailyHours', Number(e.target.value))}
                    className="w-14 bg-white border border-slate-200 rounded px-2 py-1 text-center text-slate-900 font-bold"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item.instanceId)}
                  className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
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
