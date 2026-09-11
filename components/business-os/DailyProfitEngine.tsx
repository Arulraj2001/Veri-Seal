'use client';

import React, { useState, useMemo } from 'react';
import {
  Wallet,
  Coins,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Receipt,
  AlertCircle,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { calculateDailyProfit } from '@/lib/business-os/calculations';
import { BUSINESS_PRESETS } from '@/lib/business-os/presets';
import RupeeBreakdownBar from './RupeeBreakdownBar';

export default function DailyProfitEngine() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('kirana_retail');

  // Daily inputs
  const [cashSales, setCashSales] = useState<number>(7500);
  const [upiSales, setUpiSales] = useState<number>(9800);
  const [creditSales, setCreditSales] = useState<number>(2200);

  const [productCost, setProductCost] = useState<number>(12800);
  const [staffDailyWages, setStaffDailyWages] = useState<number>(700);
  const [rentDailyAlloc, setRentDailyAlloc] = useState<number>(650);
  const [utilityDailyAlloc, setUtilityDailyAlloc] = useState<number>(250);
  const [packagingCost, setPackagingCost] = useState<number>(150);
  const [deliveryCost, setDeliveryCost] = useState<number>(100);
  const [otherExpenses, setOtherExpenses] = useState<number>(150);

  const handleApplyPreset = (presetId: string) => {
    const p = BUSINESS_PRESETS.find((item) => item.id === presetId);
    if (!p) return;
    setSelectedPresetId(p.id);
    setCashSales(p.defaultDailySales.cashSales);
    setUpiSales(p.defaultDailySales.upiSales);
    setCreditSales(p.defaultDailySales.creditSales);
    setProductCost(p.defaultDailySales.productCost);
    setStaffDailyWages(p.defaultDailySales.staffDailyWages);
    setRentDailyAlloc(p.defaultDailySales.rentDailyAlloc);
    setUtilityDailyAlloc(p.defaultDailySales.utilityDailyAlloc);
    setPackagingCost(p.defaultDailySales.packagingCost);
    setDeliveryCost(p.defaultDailySales.deliveryCost);
    setOtherExpenses(p.defaultDailySales.otherExpenses);
  };

  const results = useMemo(() => {
    return calculateDailyProfit({
      cashSales,
      upiSales,
      creditSales,
      productCost,
      staffDailyWages,
      rentDailyAlloc,
      utilityDailyAlloc,
      packagingCost,
      deliveryCost,
      otherExpenses,
    });
  }, [
    cashSales,
    upiSales,
    creditSales,
    productCost,
    staffDailyWages,
    rentDailyAlloc,
    utilityDailyAlloc,
    packagingCost,
    deliveryCost,
    otherExpenses,
  ]);

  return (
    <div className="space-y-8">
      {/* Preset Quick-Selector */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Business Profile Template
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {BUSINESS_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleApplyPreset(p.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                selectedPresetId === p.id
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calculation Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Revenue Inflows */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600" />
              <span>Today&apos;s Sales Inflows</span>
            </h3>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              ₹{results.totalSales.toLocaleString('en-IN')} Total
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Cash Sales Received (Drawer)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={cashSales}
                  onChange={(e) => setCashSales(Number(e.target.value))}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <span className="absolute right-4 top-3 text-xs text-slate-400 font-semibold">₹ Cash</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                UPI / QR / Card Payments
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={upiSales}
                  onChange={(e) => setUpiSales(Number(e.target.value))}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <span className="absolute right-4 top-3 text-xs text-slate-400 font-semibold">₹ UPI</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Customer Credit (Udhaar / Khata)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={creditSales}
                  onChange={(e) => setCreditSales(Number(e.target.value))}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <span className="absolute right-4 top-3 text-xs text-slate-400 font-semibold">₹ Credit</span>
              </div>
              <p className="text-[11px] text-amber-700 mt-1 font-medium">
                Uncollected revenue: Product left your shop, but money is pending.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Costs & Daily Overheads */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-indigo-600" />
              <span>Direct Costs &amp; Daily Expenses</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">
              ₹{(results.productCost + results.totalExpenses).toLocaleString('en-IN')} Outflows
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Product Cost (Wholesale COGS)
              </label>
              <input
                type="number"
                min={0}
                value={productCost}
                onChange={(e) => setProductCost(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Staff Daily Wages / Helper
              </label>
              <input
                type="number"
                min={0}
                value={staffDailyWages}
                onChange={(e) => setStaffDailyWages(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Daily Rent Allocation
              </label>
              <input
                type="number"
                min={0}
                value={rentDailyAlloc}
                onChange={(e) => setRentDailyAlloc(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Electricity &amp; Internet
              </label>
              <input
                type="number"
                min={0}
                value={utilityDailyAlloc}
                onChange={(e) => setUtilityDailyAlloc(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Packaging Materials &amp; Bags
              </label>
              <input
                type="number"
                min={0}
                value={packagingCost}
                onChange={(e) => setPackagingCost(Number(e.target.value))}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Delivery / Logistics / Other
              </label>
              <input
                type="number"
                min={0}
                value={deliveryCost + otherExpenses}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDeliveryCost(Math.round(val / 2));
                  setOtherExpenses(Math.round(val / 2));
                }}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Output Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Gross Profit</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            ₹{results.grossProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-indigo-700 font-semibold mt-1 block">
            {results.grossMarginPercent}% Gross Margin
          </span>
        </div>

        <div className="bg-white border border-emerald-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-emerald-800 font-bold block">Net Estimated Profit</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">
            ₹{results.netEstimatedProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block font-medium">
            After paying staff, rent &amp; bills
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Net Profit Margin</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {results.netMarginPercent}%
          </div>
          <span className="text-xs text-slate-500 mt-1 block font-medium">
            Real cash retained in pocket
          </span>
        </div>

        <div className="bg-white border border-amber-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-amber-800 font-bold block">Uncollected Udhaar</span>
          <div className="text-3xl font-black text-amber-700 mt-1">
            ₹{results.uncollectedCredit.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block font-medium">
            Pending collection from buyers
          </span>
        </div>
      </div>

      {/* Killer Feature: Rupee Breakdown Bar */}
      <RupeeBreakdownBar items={results.rupeeBreakdown} totalSales={results.totalSales} />
    </div>
  );
}
