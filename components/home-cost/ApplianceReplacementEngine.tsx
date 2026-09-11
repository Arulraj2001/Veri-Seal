'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Coins,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Award,
} from 'lucide-react';

interface PresetItem {
  id: string;
  name: string;
  oldAgeYears: number;
  oldAnnualUnits: number;
  newAnnualUnits: number;
  newPurchasePrice: number;
  annualMaintenanceSaving: number;
  affiliateSearchQuery: string;
}

const REPLACEMENT_PRESETS: PresetItem[] = [
  {
    id: 'fridge',
    name: '10-Year-Old Refrigerator &rarr; 5-Star Smart Inverter',
    oldAgeYears: 10,
    oldAnnualUnits: 550, // older non-inverter compressor
    newAnnualUnits: 210, // modern 5-star smart inverter
    newPurchasePrice: 28990,
    annualMaintenanceSaving: 1200, // gas refill / thermostat repair
    affiliateSearchQuery: '5 star double door inverter refrigerator samsung lg',
  },
  {
    id: 'fans_set',
    name: 'Set of 4 Conventional 75W Fans &rarr; 28W BLDC Fans',
    oldAgeYears: 8,
    oldAnnualUnits: 1530, // 4 fans * 75W * 14h * 365d
    newAnnualUnits: 570, // 4 fans * 28W * 14h * 365d
    newPurchasePrice: 11500, // 4 * ₹2,875
    annualMaintenanceSaving: 600, // capacitor replacements
    affiliateSearchQuery: 'atomberg bldc ceiling fan 28w remote',
  },
  {
    id: 'ac_old',
    name: '8-Year-Old Window/Split Non-Inverter AC &rarr; 5-Star AI Inverter',
    oldAgeYears: 8,
    oldAnnualUnits: 2650, // older fixed speed AC
    newAnnualUnits: 1350, // 5-star inverter
    newPurchasePrice: 43000,
    annualMaintenanceSaving: 2000, // coil leak repairs
    affiliateSearchQuery: '5 star 1.5 ton dual inverter ac daikin panasonic',
  },
  {
    id: 'geyser',
    name: 'Old 2000W Electric Geyser &rarr; 150L Solar Water Heater',
    oldAgeYears: 7,
    oldAnnualUnits: 1100,
    newAnnualUnits: 160, // 85% reduction
    newPurchasePrice: 26000,
    annualMaintenanceSaving: 800,
    affiliateSearchQuery: 'solar water heater 150 lpd racold supreme',
  },
];

export default function ApplianceReplacementEngine() {
  const [selectedPreset, setSelectedPreset] = useState<PresetItem>(REPLACEMENT_PRESETS[0]);
  const [oldAnnualUnits, setOldAnnualUnits] = useState<number>(selectedPreset.oldAnnualUnits);
  const [newAnnualUnits, setNewAnnualUnits] = useState<number>(selectedPreset.newAnnualUnits);
  const [newPrice, setNewPrice] = useState<number>(selectedPreset.newPurchasePrice);
  const [tariff, setTariff] = useState<number>(7.5);

  const handleSelectPreset = (preset: PresetItem) => {
    setSelectedPreset(preset);
    setOldAnnualUnits(preset.oldAnnualUnits);
    setNewAnnualUnits(preset.newAnnualUnits);
    setNewPrice(preset.newPurchasePrice);
  };

  const economics = useMemo(() => {
    const oldAnnualCost = Math.round(oldAnnualUnits * tariff);
    const newAnnualCost = Math.round(newAnnualUnits * tariff);
    const annualElectricitySaving = Math.max(0, oldAnnualCost - newAnnualCost);
    const totalAnnualSaving = annualElectricitySaving + selectedPreset.annualMaintenanceSaving;

    const paybackYears = totalAnnualSaving > 0 ? Number((newPrice / totalAnnualSaving).toFixed(1)) : 99;

    // 5-Year Total Cost of Ownership (TCO)
    const old5YearTco = (oldAnnualCost + selectedPreset.annualMaintenanceSaving) * 5;
    const new5YearTco = newPrice + (newAnnualCost * 5);
    const net5YearSavings = old5YearTco - new5YearTco;

    const verdict = paybackYears <= 4.0 ? 'STRONG BUY — PAYS FOR ITSELF RAPIDLY' : 'MODERATE PAYBACK';

    return {
      oldAnnualCost,
      newAnnualCost,
      annualElectricitySaving,
      totalAnnualSaving,
      paybackYears,
      old5YearTco,
      new5YearTco,
      net5YearSavings,
      verdict,
    };
  }, [oldAnnualUnits, newAnnualUnits, newPrice, tariff, selectedPreset]);

  const handleAffiliateClick = () => {
    const query = encodeURIComponent(selectedPreset.affiliateSearchQuery);
    window.open(`https://www.amazon.in/s?k=${query}&tag=veriseal-21`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Preset Selector */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Choose an Appliance to Evaluate for Replacement
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {REPLACEMENT_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                selectedPreset.id === p.id
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <div
                className={`text-xs font-bold ${
                  selectedPreset.id === p.id ? 'text-emerald-800' : 'text-slate-800'
                }`}
                dangerouslySetInnerHTML={{ __html: p.name }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Customization Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 text-xs shadow-xs">
        <div>
          <label className="block text-slate-700 font-bold mb-1.5">
            Old Appliance Consumption
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={oldAnnualUnits}
              onChange={(e) => setOldAnnualUnits(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
            />
            <span className="text-slate-400 font-medium">units/yr</span>
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1.5">
            New 5-Star Consumption
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={newAnnualUnits}
              onChange={(e) => setNewAnnualUnits(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
            />
            <span className="text-slate-400 font-medium">units/yr</span>
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1.5">
            New Appliance Purchase Price
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
            />
            <span className="text-slate-400 font-medium">₹</span>
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1.5">
            Electricity Rate (₹/unit)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              step={0.5}
              value={tariff}
              onChange={(e) => setTariff(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
            />
            <span className="text-slate-400 font-medium">₹/kWh</span>
          </div>
        </div>
      </div>

      {/* Decision Verdict Card */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30 border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
          <div>
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
              Financial Decision Verdict
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              New Appliance Pays for Itself in Approximately ~{economics.paybackYears} Years
            </h3>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-slate-500 block font-medium">5-Year Net Wealth Gain</span>
            <span className="text-2xl font-black text-emerald-700">
              ₹{economics.net5YearSavings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* 5-Year Total Cost of Ownership (TCO) Head-to-Head */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Option 1: Keep Old Appliance</span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Higher Bleed</span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              ₹{economics.old5YearTco.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500"> / 5-yr cost</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consumes ₹{economics.oldAnnualCost.toLocaleString('en-IN')}/year in electricity + ₹{selectedPreset.annualMaintenanceSaving}/year in frequent breakdowns and repairs.
            </p>
          </div>

          <div className="bg-white border border-emerald-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">Option 2: Replace with New 5-Star</span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                RECOMMENDED
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-700">
              ₹{economics.new5YearTco.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500"> / 5-yr cost</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Includes full ₹{newPrice.toLocaleString('en-IN')} purchase price. Saves ₹{economics.totalAnnualSaving.toLocaleString('en-IN')} every year in electricity and repairs.
            </p>
          </div>
        </div>

        {/* Affiliate Link Callout */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleAffiliateClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Check Recommended 5-Star Models on Amazon</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
