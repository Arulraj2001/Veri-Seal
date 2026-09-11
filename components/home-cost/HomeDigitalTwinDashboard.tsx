'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Home,
  Zap,
  Droplets,
  Flame,
  Wrench,
  Sparkles,
  Plus,
  Trash2,
  Settings2,
  RefreshCw,
  TrendingDown,
  Building,
  ShieldCheck,
} from 'lucide-react';
import {
  HouseholdApplianceItem,
  IndianStateId,
  WhatIfSimulationAdjustments,
} from '@/lib/home-cost/types';
import { ALL_INDIAN_STATES, INDIAN_STATE_TARIFFS } from '@/lib/home-cost/tariffs';
import { APPLIANCES_DATABASE, PRESET_HOMES } from '@/lib/home-cost/appliances-db';
import {
  calculateHouseholdBill,
  simulateWhatIfSavings,
} from '@/lib/home-cost/calculations';
import { generateHomeRecommendations } from '@/lib/home-cost/recommendations';
import ApplianceBreakdownChart from './ApplianceBreakdownChart';
import WhatIfSimulator from './WhatIfSimulator';
import AiAdvisorCard from './AiAdvisorCard';

const STORAGE_KEY = 'veriseal_home_twin_v1';

export default function HomeDigitalTwinDashboard() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset_2bhk_chennai');
  const [selectedState, setSelectedState] = useState<IndianStateId>('tamil_nadu');
  const [familyMembers, setFamilyMembers] = useState<number>(3);
  const [appliances, setAppliances] = useState<HouseholdApplianceItem[]>(
    PRESET_HOMES[1].appliances
  );

  // New Appliance Selector Modal / Dropdown
  const [selectedNewApplianceId, setSelectedNewApplianceId] = useState<string>(
    APPLIANCES_DATABASE[0].id
  );

  // What If Adjustments
  const [whatIfAdjustments, setWhatIfAdjustments] = useState<WhatIfSimulationAdjustments>({
    acHoursReduction: 1,
    acTempIncreaseDegrees: 2,
    fansSwitchedToBldc: 2,
    fridgeReplacedTo5Star: false,
    solarCapacityKw: 0,
    geyserSwitchedToSolar: false,
  });

  // 1. Load persisted profile on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.appliances && Array.isArray(parsed.appliances)) {
          setAppliances(parsed.appliances);
          setSelectedState(parsed.state || 'tamil_nadu');
          setFamilyMembers(parsed.familyMembers || 3);
          setSelectedPresetId('custom');
        }
      }
    } catch {
      // fallback to initial state
    }
  }, []);

  // 2. Persist profile changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          appliances,
          state: selectedState,
          familyMembers,
        })
      );
    } catch {
      // ignore quota errors
    }
  }, [appliances, selectedState, familyMembers]);

  // Handle Preset Switching
  const handlePresetChange = (presetId: string) => {
    const preset = PRESET_HOMES.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPresetId(preset.id);
      setSelectedState(preset.state);
      setFamilyMembers(preset.familyMembers);
      setAppliances(preset.appliances);
    }
  };

  // Add Appliance to Inventory
  const handleAddAppliance = () => {
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
    setSelectedPresetId('custom');
  };

  // Remove Appliance
  const handleRemoveAppliance = (instanceId: string) => {
    setAppliances((prev) => prev.filter((a) => a.instanceId !== instanceId));
    setSelectedPresetId('custom');
  };

  // Update Appliance Field
  const handleUpdateAppliance = (instanceId: string, field: keyof HouseholdApplianceItem, value: any) => {
    setAppliances((prev) =>
      prev.map((a) => (a.instanceId === instanceId ? { ...a, [field]: value } : a))
    );
    setSelectedPresetId('custom');
  };

  // Calculations
  const electricityBreakdown = useMemo(() => {
    return calculateHouseholdBill(appliances, selectedState);
  }, [appliances, selectedState]);

  // Estimated Water Consumption (IS 1172: 135 L / person / day)
  const waterLitresPerDay = familyMembers * 135;

  // Estimated Cooking Gas (1 x 14.2 kg LPG Cylinder ~ ₹850-950 per month)
  const lpgMonthlyCost = familyMembers >= 4 ? 980 : 850;

  // Total Combined Living Cost
  const totalLivingCost = electricityBreakdown.monthlyBill + lpgMonthlyCost;

  // What-If Simulation Result
  const whatIfResults = useMemo(() => {
    return simulateWhatIfSavings(appliances, selectedState, whatIfAdjustments);
  }, [appliances, selectedState, whatIfAdjustments]);

  // AI Recommendation Engine
  const aiRecommendations = useMemo(() => {
    return generateHomeRecommendations(appliances, electricityBreakdown, selectedState);
  }, [appliances, electricityBreakdown, selectedState]);

  return (
    <div className="space-y-8">
      {/* 1. Header Preset & State Selector Ribbon */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Select Household Template or Customize
            </span>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-600" />
              <span>Digital Twin Configuration</span>
            </h3>
          </div>

          {/* State Tariff Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              Electricity Board:
            </span>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value as IndianStateId);
                setSelectedPresetId('custom');
              }}
              className="bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {ALL_INDIAN_STATES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preset Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {PRESET_HOMES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetChange(preset.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedPresetId === preset.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700'
              }`}
            >
              {preset.title}
            </button>
          ))}
          {selectedPresetId === 'custom' && (
            <span className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Customized Profile (Saved)
            </span>
          )}
        </div>

        {/* State Tariff Note Banner */}
        <div className="flex items-center gap-2 text-xs text-slate-700 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
          <Building className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Active Tariff: <strong className="text-slate-900 font-bold">{INDIAN_STATE_TARIFFS[selectedState]?.discomName}</strong> &bull; {INDIAN_STATE_TARIFFS[selectedState]?.notes}
          </span>
        </div>
      </div>

      {/* 2. Unified Monthly Household Operating Cost Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Electricity */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-700">⚡ Electricity</span>
            <span className="text-[10px] text-sky-700 font-extrabold bg-sky-50 px-1.5 py-0.5 rounded">{electricityBreakdown.monthlyUnits} Units</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            ₹{electricityBreakdown.monthlyBill.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            @ ₹{electricityBreakdown.effectiveRatePerUnit}/unit effective
          </span>
        </div>

        {/* Card 2: Water */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-700">💧 Water</span>
            <span className="text-[10px] text-teal-700 font-extrabold bg-teal-50 px-1.5 py-0.5 rounded">{familyMembers} Persons</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {waterLitresPerDay} <span className="text-xs font-normal text-slate-500">L/day</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Overhead tank: {waterLitresPerDay > 500 ? '1,000 L' : '500 L'}
          </span>
        </div>

        {/* Card 3: LPG Gas */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-700">🔥 LPG Cylinder</span>
            <span className="text-[10px] text-amber-700 font-extrabold bg-amber-50 px-1.5 py-0.5 rounded">14.2 kg</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            ₹{lpgMonthlyCost}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            ~1 cylinder / month
          </span>
        </div>

        {/* Card 4: Total Combined Operating Cost */}
        <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50 border border-emerald-300 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold">💰 Combined Living Cost</span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-100/80 px-1.5 py-0.5 rounded">Monthly</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700">
            ₹{totalLivingCost.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-600 mt-1 block font-medium">
            ₹{(totalLivingCost * 12).toLocaleString('en-IN')} / year
          </span>
        </div>
      </div>

      {/* 3. Recharts Dynamic Visual Breakdown */}
      <ApplianceBreakdownChart breakdown={electricityBreakdown} />

      {/* 4. "What If?" Interactive Simulator */}
      <WhatIfSimulator
        adjustments={whatIfAdjustments}
        onChange={setWhatIfAdjustments}
        savingsResult={whatIfResults}
      />

      {/* 5. AI Recommendations Roadmap */}
      <AiAdvisorCard recommendations={aiRecommendations} />

      {/* 6. Appliance Inventory Manager */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Appliance Inventory ({appliances.length} Items)</h3>
            <p className="text-xs text-slate-500">
              Customize quantity, wattage, and runtime hours to match your exact home setup.
            </p>
          </div>

          {/* Add Appliance Form */}
          <div className="flex items-center gap-2">
            <select
              value={selectedNewApplianceId}
              onChange={(e) => setSelectedNewApplianceId(e.target.value)}
              className="bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
            >
              {APPLIANCES_DATABASE.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.defaultWattage}W)
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddAppliance}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Appliances Table / Grid */}
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
          {appliances.map((item) => (
            <div
              key={item.instanceId}
              className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="font-bold text-slate-900 min-w-[200px]">
                {item.customName || item.applianceId}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {/* Quantity */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 text-[11px] font-semibold">Qty:</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateAppliance(item.instanceId, 'quantity', Number(e.target.value))
                    }
                    className="w-12 bg-white border border-slate-200 rounded px-2 py-1 text-center text-slate-900 font-bold"
                  />
                </div>

                {/* Wattage */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 text-[11px] font-semibold">Watts:</span>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={item.wattage}
                    onChange={(e) =>
                      handleUpdateAppliance(item.instanceId, 'wattage', Number(e.target.value))
                    }
                    className="w-16 bg-white border border-slate-200 rounded px-2 py-1 text-center text-slate-900 font-bold"
                  />
                </div>

                {/* Daily Hours */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 text-[11px] font-semibold">Hrs/day:</span>
                  <input
                    type="number"
                    min={0.1}
                    max={24}
                    step={0.5}
                    value={item.dailyHours}
                    onChange={(e) =>
                      handleUpdateAppliance(item.instanceId, 'dailyHours', Number(e.target.value))
                    }
                    className="w-14 bg-white border border-slate-200 rounded px-2 py-1 text-center text-slate-900 font-bold"
                  />
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemoveAppliance(item.instanceId)}
                  className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                  title="Remove appliance"
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
