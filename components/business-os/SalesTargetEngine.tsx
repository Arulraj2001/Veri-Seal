'use client';

import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Target,
  Calendar,
  Sparkles,
  TrendingUp,
  Receipt,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { calculateSalesTarget } from '@/lib/business-os/calculations';

export default function SalesTargetEngine() {
  const [desiredMonthlyNetProfit, setDesiredMonthlyNetProfit] = useState<number>(100000);
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState<number>(45000);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(1400);
  const [variableCostPercentOfAov, setVariableCostPercentOfAov] = useState<number>(52);
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = useState<number>(26);

  const profitGoalPresets = [50000, 100000, 200000, 300000, 500000];

  const results = useMemo(() => {
    return calculateSalesTarget({
      desiredMonthlyNetProfit,
      monthlyFixedCosts,
      averageOrderValue,
      variableCostPercentOfAov,
      workingDaysPerMonth,
    });
  }, [
    desiredMonthlyNetProfit,
    monthlyFixedCosts,
    averageOrderValue,
    variableCostPercentOfAov,
    workingDaysPerMonth,
  ]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-700 mt-0.5 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Reverse-Engineered Net Profit Targeter
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Don&apos;t just guess your sales target. Start from your dream in-pocket monthly salary (e.g. ₹1 Lakh) and let math calculate your exact daily order quota.
            </p>
          </div>
        </div>
        <div className="bg-white/90 border border-emerald-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Target Net In-Pocket</div>
          <div className="text-xl font-black text-emerald-700">
            ₹{desiredMonthlyNetProfit.toLocaleString('en-IN')}/mo
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Define Your Income Target & Costs</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">Step-by-step</span>
          </div>

          <div className="space-y-5">
            {/* Target Net Profit Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Desired Clean Net Profit (Your Take-Home Pay)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                {profitGoalPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDesiredMonthlyNetProfit(preset)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      desiredMonthlyNetProfit === preset
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    ₹{preset >= 100000 ? `${preset / 100000}L` : `${preset / 1000}k`}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="10000"
                  value={desiredMonthlyNetProfit || ''}
                  onChange={(e) => setDesiredMonthlyNetProfit(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="Custom Net Target (e.g. 150000)"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Total Monthly Fixed Overheads (Rent + Staff + Bills)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={monthlyFixedCosts || ''}
                  onChange={(e) => setMonthlyFixedCosts(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. 45000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Average Order Value / Ticket Size (AOV)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="1"
                  value={averageOrderValue || ''}
                  onChange={(e) => setAverageOrderValue(Math.max(1, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. 1400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Direct Costs (% of AOV)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="95"
                    value={variableCostPercentOfAov || ''}
                    onChange={(e) => setVariableCostPercentOfAov(Math.max(5, Math.min(95, Number(e.target.value))))}
                    className="w-full pr-7 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 52"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">COGS + packing</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Working Days / Month
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="15"
                    max="31"
                    value={workingDaysPerMonth || ''}
                    onChange={(e) => setWorkingDaysPerMonth(Math.max(15, Math.min(31, Number(e.target.value))))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 26"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Usually 26 for retail</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Reverse Math Blueprint
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Your Daily Execution Quota
              </h3>
            </div>

            {/* Quota Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Daily Sales Required
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                  ₹{results.requiredDailySales.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-emerald-800">
                  Total turnover needed each day
                </p>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                  Daily Order Volume
                </span>
                <div className="text-2xl sm:text-3xl font-black text-indigo-950">
                  {results.requiredDailyOrders} Orders / day
                </div>
                <p className="text-[11px] text-indigo-800">
                  At average ticket of ₹{averageOrderValue.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Monthly Rollup Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm">
                <span className="text-slate-600 font-medium">Monthly Gross Turnover Target</span>
                <span className="font-extrabold text-slate-900">
                  ₹{results.requiredMonthlyRevenue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm">
                <span className="text-slate-600 font-medium">Total Monthly Orders to Fulfill</span>
                <span className="font-extrabold text-indigo-700">
                  {results.requiredMonthlyOrders} parcels / orders
                </span>
              </div>
            </div>

            {/* The Revenue Allocation Stack */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Where that ₹{results.requiredMonthlyRevenue.toLocaleString('en-IN')} Monthly Revenue Goes:
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>1. Product Costs & Packaging ({variableCostPercentOfAov}%)</span>
                  <span className="font-bold text-slate-800">
                    ₹{Math.round(results.requiredMonthlyRevenue * (variableCostPercentOfAov / 100)).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>2. Shop Rent, Staff Salaries & Bills</span>
                  <span className="font-bold text-slate-800">
                    ₹{monthlyFixedCosts.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-emerald-700 font-black border-t border-slate-200 pt-1.5">
                  <span>3. Clean Cash in Your Pocket</span>
                  <span>₹{desiredMonthlyNetProfit.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Strategic Insight */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4.5 text-xs text-emerald-900 leading-relaxed">
              <span className="font-extrabold block text-emerald-950 mb-1">Execution Roadmap</span>
              {results.insight}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
