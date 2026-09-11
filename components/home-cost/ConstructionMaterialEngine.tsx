'use client';

import React, { useState, useMemo } from 'react';
import {
  Building2,
  Layers,
  Coins,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function ConstructionMaterialEngine() {
  const [builtUpAreaSqFt, setBuiltUpAreaSqFt] = useState<number>(1000);
  const [grade, setGrade] = useState<'economy' | 'standard' | 'premium'>('standard');
  const [wallType, setWallType] = useState<'aac_blocks' | 'red_bricks'>('aac_blocks');

  const estimates = useMemo(() => {
    // Standard Civil Engineering Quantity Thumb Rules in India:
    const cementBags = Math.round(builtUpAreaSqFt * 0.4);
    const cementCost = cementBags * 380; // ~₹380/bag

    const steelKg = Math.round(builtUpAreaSqFt * 3.8);
    const steelCost = Math.round(steelKg * 68); // ~₹68/kg

    const sandCuFt = Math.round(builtUpAreaSqFt * 1.75);
    const sandCost = Math.round(sandCuFt * 55); // ~₹55/cu ft

    const aggregateCuFt = Math.round(builtUpAreaSqFt * 1.35);
    const aggregateCost = Math.round(aggregateCuFt * 42); // ~₹42/cu ft

    const bricksCount = wallType === 'red_bricks' ? Math.round(builtUpAreaSqFt * 18) : Math.round(builtUpAreaSqFt * 1.25);
    const masonryCost = wallType === 'red_bricks' ? bricksCount * 11 : bricksCount * 65;

    const rates = {
      economy: 1550,
      standard: 1850,
      premium: 2350,
    };
    const totalTurnkeyBudget = builtUpAreaSqFt * rates[grade];

    return {
      cementBags,
      cementCost,
      steelKg,
      steelCost,
      sandCuFt,
      sandCost,
      aggregateCuFt,
      aggregateCost,
      bricksCount,
      masonryCost,
      totalTurnkeyBudget,
      ratePerSqFt: rates[grade],
    };
  }, [builtUpAreaSqFt, grade, wallType]);

  const handleAffiliateClick = () => {
    const query = encodeURIComponent('bosch power drill angle grinder construction tools');
    window.open(`https://www.amazon.in/s?k=${query}&tag=veriseal-21`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Parameters */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Building2 className="w-5 h-5 text-emerald-600" />
          <span>Building Area &amp; Structural Specifications</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Total Built-Up Area (sq ft)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step={50}
                min={100}
                max={25000}
                value={builtUpAreaSqFt}
                onChange={(e) => setBuiltUpAreaSqFt(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <span className="text-xs text-slate-400 whitespace-nowrap font-medium">sq ft</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">E.g. 1000 sq ft for a standard single-floor 2BHK.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Construction Specification Grade
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as any)}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold cursor-pointer"
            >
              <option value="economy">Economy (Basic Finishes ~₹1,550/sq ft)</option>
              <option value="standard">Standard (Vitrified Tiles, Teak Door ~₹1,850/sq ft)</option>
              <option value="premium">Premium / Luxury (Granite, Italian Marble ~₹2,350/sq ft)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Wall Masonry Material
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setWallType('aac_blocks')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  wallType === 'aac_blocks'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                AAC Blocks (Modern)
              </button>
              <button
                type="button"
                onClick={() => setWallType('red_bricks')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  wallType === 'red_bricks'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Red Clay Bricks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Cement */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Cement (50 kg)</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {estimates.cementBags.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-400">bags</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
            ₹{estimates.cementCost.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Steel */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold block">TMT Steel (Fe 550)</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {estimates.steelKg.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-400">kg</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
            ₹{estimates.steelCost.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Sand */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold block">M-Sand / Plaster Sand</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {estimates.sandCuFt.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-400">cu ft</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
            ₹{estimates.sandCost.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Aggregate */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Coarse Aggregate</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {estimates.aggregateCuFt.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-400">cu ft</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
            ₹{estimates.aggregateCost.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Bricks/Blocks */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold block">
            {wallType === 'aac_blocks' ? 'AAC Light Blocks' : 'Red Clay Bricks'}
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {estimates.bricksCount.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-400">units</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
            ₹{estimates.masonryCost.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Turnkey Budget Overview */}
      <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 border border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
            Complete Turnkey Construction Cost
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            ₹{(estimates.totalTurnkeyBudget / 100000).toFixed(2)} Lakhs
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Covers structure, civil masonry, electrical conduit rough-in, plumbing, plastering, flooring, and painting at ₹{estimates.ratePerSqFt}/sq ft for {builtUpAreaSqFt} sq ft.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAffiliateClick}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 shrink-0 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>Explore Professional Tools &amp; Hardware</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
