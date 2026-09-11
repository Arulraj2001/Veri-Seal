'use client';

import React, { useState, useMemo } from 'react';
import {
  Percent,
  TrendingDown,
  AlertTriangle,
  Flame,
  ShieldAlert,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { calculateDiscountImpact } from '@/lib/business-os/calculations';

export default function DiscountProfitCrashEngine() {
  const [originalPrice, setOriginalPrice] = useState<number>(1499);
  const [unitCost, setUnitCost] = useState<number>(750);
  const [proposedDiscountPercent, setProposedDiscountPercent] = useState<number>(20);
  const [monthlyUnitsSold, setMonthlyUnitsSold] = useState<number>(100);

  const results = useMemo(() => {
    return calculateDiscountImpact({
      originalPrice,
      unitCost,
      proposedDiscountPercent,
      monthlyUnitsSold,
    });
  }, [originalPrice, unitCost, proposedDiscountPercent, monthlyUnitsSold]);

  const discountChips = [5, 10, 15, 20, 25, 30, 40, 50];

  return (
    <div className="space-y-8">
      {/* Top Banner Alert */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-100/80 rounded-2xl text-amber-700 mt-0.5 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              The Indian SMB Discount Trap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Customers love a 20% discount, but you don&apos;t lose 20% profit—you often lose over 50% of your real margin. See the mathematical truth below.
            </p>
          </div>
        </div>
        <div className="bg-white/90 border border-amber-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">Profit Slashing</div>
          <div className="text-xl font-black text-rose-600">
            -{results.profitReductionPercent}%
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Percent className="w-5 h-5 text-indigo-600" />
              <span>Unit Economics & Discount Slider</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">Live Simulator</span>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Current Selling Price (MRP or List Price)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="10"
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. 1499"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Unit Direct Cost (Product COGS + Direct Packaging)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={unitCost || ''}
                  onChange={(e) => setUnitCost(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. 750"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Your direct cost stays identical even when you cut prices.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Current Monthly Units Sold
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={monthlyUnitsSold || ''}
                  onChange={(e) => setMonthlyUnitsSold(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. 100"
                />
              </div>
            </div>

            {/* Discount Selector Slider & Chips */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-800">
                  Proposed Discount Percentage
                </label>
                <span className="text-sm font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                  {proposedDiscountPercent}% OFF
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={proposedDiscountPercent}
                onChange={(e) => setProposedDiscountPercent(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {discountChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setProposedDiscountPercent(chip)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      proposedDiscountPercent === chip
                        ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    {chip}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Form: The Crash Reality */}
        <div className="lg:col-span-6 space-y-6">
          {/* Shock Comparison Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-rose-600" />
              <span>Before vs After Discount Crash</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Original Price
                </span>
                <div className="text-lg font-black text-slate-900">
                  ₹{results.originalPrice.toLocaleString('en-IN')}
                </div>
                <div className="pt-2 border-t border-slate-200/70 text-xs text-slate-600">
                  Profit per unit:{' '}
                  <span className="font-extrabold text-emerald-600">
                    ₹{results.originalUnitProfit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* After */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 text-center space-y-2">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                  {proposedDiscountPercent}% Discounted
                </span>
                <div className="text-lg font-black text-rose-700">
                  ₹{results.discountedPrice.toLocaleString('en-IN')}
                </div>
                <div className="pt-2 border-t border-rose-200/70 text-xs text-slate-600">
                  Profit per unit:{' '}
                  <span className="font-extrabold text-rose-600">
                    ₹{results.discountedUnitProfit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Impact Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm">
                <span className="text-slate-600 font-medium">Profit Lost Per Unit</span>
                <span className="font-extrabold text-rose-600">
                  -₹{results.discountRupees.toLocaleString('en-IN')} ({results.profitReductionPercent}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm">
                <span className="text-slate-600 font-medium">Monthly Profit (Same 100 Units)</span>
                <div className="text-right">
                  <span className="font-bold text-slate-400 line-through text-xs mr-2">
                    ₹{results.originalMonthlyProfit.toLocaleString('en-IN')}
                  </span>
                  <span className="font-extrabold text-rose-700">
                    ₹{results.discountedMonthlyProfitSameVolume.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Required Volume Multiplier Callout */}
            <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <Package className="w-5 h-5 text-indigo-700 shrink-0" />
                <h4 className="text-sm font-extrabold text-indigo-950">
                  Volume Needed Just to Stay Equal:
                </h4>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-900 tracking-tight">
                {results.requiredVolumeMultiplier}x Sales Volume
              </div>
              <p className="text-xs text-indigo-800 leading-relaxed">
                To take home the exact same ₹{results.originalMonthlyProfit.toLocaleString('en-IN')} profit, you must pack, ship, and deliver{' '}
                <span className="font-extrabold underline">
                  {results.requiredAdditionalUnits} more units
                </span>{' '}
                every month! (Total {monthlyUnitsSold + results.requiredAdditionalUnits} units).
              </p>
            </div>
          </div>

          {/* Warning Diagnostic Advice */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-5 shadow-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <span className="font-extrabold block text-amber-950 mb-1">Expert Pricing Advice</span>
              {results.warningInsight}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
