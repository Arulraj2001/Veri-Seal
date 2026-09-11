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

  const whatIfResults = useMemo(() => {
    return simulateWhatIfSavings(appliances, selectedState, whatIfAdjustments);
  }, [appliances, selectedState, whatIfAdjustments]);

  const aiRecommendations = useMemo(() => {
    return generateHomeRecommendations(appliances, electricityBreakdown, selectedState);
  }, [appliances, electricityBreakdown, selectedState]);

  // Combined Household Living Cost
  const waterLitresPerDay = familyMembers * 135;
  const lpgMonthlyCost = 850; // 1 cylinder
  const maintenanceCost = 1200;
  const totalLivingCost = electricityBreakdown.monthlyBill + lpgMonthlyCost + maintenanceCost;

  return (
    <div className="space-y-10">
      {/* 1. Preset Header Selector Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Select Household Template or Customize
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-400" />
              <span>Digital Twin Configuration</span>
            </h3>
          </div>

          {/* State Tariff Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              Electricity Board:
            </span>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value as IndianStateId);
                setSelectedPresetId('custom');
              }}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500 transition-colors"
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
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPresetId === preset.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {preset.title}
            </button>
          ))}
          {selectedPresetId === 'custom' && (
            <span className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Customized Profile (Saved)
            </span>
          )}
        </div>

        {/* State Tariff Note Banner */}
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <Building className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Active Tariff: <strong className="text-white">{INDIAN_STATE_TARIFFS[selectedState]?.discomName}</strong> &bull; {INDIAN_STATE_TARIFFS[selectedState]?.notes}
          </span>
        </div>
      </div>

      {/* 2. Unified Monthly Household Operating Cost Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Electricity */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">⚡ Electricity</span>
            <span className="text-[10px] text-sky-400 font-bold">{electricityBreakdown.monthlyUnits} Units</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            ₹{electricityBreakdown.monthlyBill.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            @ ₹{electricityBreakdown.effectiveRatePerUnit}/unit effective
          </span>
        </div>

        {/* Card 2: Water */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">💧 Water</span>
            <span className="text-[10px] text-teal-400 font-bold">{familyMembers} Persons</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {waterLitresPerDay} <span className="text-xs font-normal text-slate-400">L/day</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Overhead tank: {waterLitresPerDay > 500 ? '1,000 L' : '500 L'}
          </span>
        </div>

        {/* Card 3: LPG Gas */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">🔥 LPG Cylinder</span>
            <span className="text-[10px] text-amber-400 font-bold">14.2 kg</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            ₹{lpgMonthlyCost}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            ~1 cylinder / month
          </span>
        </div>

        {/* Card 4: Total Combined Operating Cost */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-bold">💰 Combined Living Cost</span>
            <span className="text-[10px] uppercase tracking-wider font-bold">Monthly</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">
            ₹{totalLivingCost.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-300/80 mt-1 block">
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
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-lg font-bold text-white">Appliance Inventory ({appliances.length} Items)</h3>
            <p className="text-xs text-slate-400">
              Customize quantity, wattage, and runtime hours to match your exact home setup.
            </p>
          </div>

          {/* Add Appliance Form */}
          <div className="flex items-center gap-2">
            <select
              value={selectedNewApplianceId}
              onChange={(e) => setSelectedNewApplianceId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shrink-0"
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
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="font-semibold text-white min-w-[200px]">
                {item.customName || item.applianceId}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {/* Quantity */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Qty:</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateAppliance(item.instanceId, 'quantity', Number(e.target.value))
                    }
                    className="w-12 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-white"
                  />
                </div>

                {/* Wattage */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Watts:</span>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={item.wattage}
                    onChange={(e) =>
                      handleUpdateAppliance(item.instanceId, 'wattage', Number(e.target.value))
                    }
                    className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-white"
                  />
                </div>

                {/* Daily Hours */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Hrs/day:</span>
                  <input
                    type="number"
                    min={0.1}
                    max={24}
                    step={0.5}
                    value={item.dailyHours}
                    onChange={(e) =>
                      handleUpdateAppliance(item.instanceId, 'dailyHours', Number(e.target.value))
                    }
                    className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-white"
                  />
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemoveAppliance(item.instanceId)}
                  className="text-slate-500 hover:text-red-400 p-1 transition-colors"
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
