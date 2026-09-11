'use client';

import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { calculateMinimumOrderValue } from '@/lib/business-os/operational-helpers';

export default function MinimumOrderValueEngine() {
  const [averageProductCostPercent, setAverageProductCostPercent] = useState<number>(45);
  const [fixedPackagingCost, setFixedPackagingCost] = useState<number>(35);
  const [fixedCourierFreight, setFixedCourierFreight] = useState<number>(70);
  const [desiredNetProfitPerOrder, setDesiredNetProfitPerOrder] = useState<number>(180);

  // Test cart value
  const [testCartValue, setTestCartValue] = useState<number>(499);

  const result = useMemo(() => {
    return calculateMinimumOrderValue({
      averageProductCostPercent,
      fixedPackagingCost,
      fixedCourierFreight,
      desiredNetProfitPerOrder,
    });
  }, [
    averageProductCostPercent,
    fixedPackagingCost,
    fixedCourierFreight,
    desiredNetProfitPerOrder,
  ]);

  // Test simulation
  const testProfit = useMemo(() => {
    const cogs = testCartValue * (averageProductCostPercent / 100);
    const totalCost = cogs + fixedPackagingCost + fixedCourierFreight;
    const profit = testCartValue - totalCost;
    const marginPct = testCartValue > 0 ? Number(((profit / testCartValue) * 100).toFixed(1)) : 0;
    return {
      cogs,
      totalCost,
      profit: Math.round(profit),
      marginPct,
      isProfitable: profit > 0,
    };
  }, [testCartValue, averageProductCostPercent, fixedPackagingCost, fixedCourierFreight]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-700 mt-0.5 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Minimum Order Value (MOV) &amp; Free Shipping Sizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Stop offering free shipping on ₹299 orders that lose money. Calculate the exact minimum cart threshold required for profitable delivery.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-emerald-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Target Free Delivery Cart</div>
          <div className="text-xl font-black text-emerald-700">
            ₹{result.recommendedMov.toLocaleString('en-IN')}+
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <span>Fixed Fulfillment Overheads</span>
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Product Cost Percentage (COGS % of Selling Price)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="90"
                  value={averageProductCostPercent || ''}
                  onChange={(e) => setAverageProductCostPercent(Math.max(10, Math.min(90, Number(e.target.value))))}
                  className="w-full pr-7 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-xs">%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Packaging Box &amp; Tape
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={fixedPackagingCost || ''}
                    onChange={(e) => setFixedPackagingCost(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Forward Courier Freight
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={fixedCourierFreight || ''}
                    onChange={(e) => setFixedCourierFreight(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Desired Net Profit Per Order in Your Pocket
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={desiredNetProfitPerOrder || ''}
                  onChange={(e) => setDesiredNetProfitPerOrder(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: Target Sizing */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Free Shipping Policy Sizer
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Your Profitable Cart Thresholds
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Zero-Profit Break-Even
                </span>
                <div className="text-2xl font-black text-slate-900">
                  ₹{result.breakEvenOrderValue}
                </div>
                <p className="text-[11px] text-slate-500">
                  Orders below ₹{result.breakEvenOrderValue} produce an outright loss if shipped free
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Recommended MOV
                </span>
                <div className="text-2xl font-black text-emerald-950">
                  ₹{result.recommendedMov}
                </div>
                <p className="text-[11px] text-emerald-800">
                  Guarantees your ₹{desiredNetProfitPerOrder} target net profit
                </p>
              </div>
            </div>

            {/* Test Simulator */}
            <div className="p-4.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Test Any Customer Cart Value:
                </label>
                <div className="w-28 relative">
                  <span className="absolute left-2.5 top-1.5 text-slate-400 font-bold text-xs">₹</span>
                  <input
                    type="number"
                    value={testCartValue || ''}
                    onChange={(e) => setTestCartValue(Number(e.target.value))}
                    className="w-full pl-6 pr-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-black text-right"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Product COGS ({averageProductCostPercent}%):</span>
                  <span className="font-bold text-slate-800">₹{Math.round(testProfit.cogs)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Packaging + Courier Freight:</span>
                  <span className="font-bold text-slate-800">₹{result.totalFixedOrderExpense}</span>
                </div>
                <div className="flex justify-between font-black border-t border-slate-200 pt-1.5">
                  <span>Your Net In-Hand Profit:</span>
                  <span className={testProfit.isProfitable ? 'text-emerald-700' : 'text-rose-600'}>
                    {testProfit.profit >= 0 ? '+' : ''}₹{testProfit.profit} ({testProfit.marginPct}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
