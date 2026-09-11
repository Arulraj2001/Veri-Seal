'use client';

import React, { useState, useMemo } from 'react';
import {
  Clock,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Banknote,
  Receipt,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { calculateCashFlowRunway } from '@/lib/business-os/calculations';

export default function CashFlowSurvivalEngine() {
  const [currentCashInBank, setCurrentCashInBank] = useState<number>(180000);
  const [pendingReceivablesDue30Days, setPendingReceivablesDue30Days] = useState<number>(45000);
  const [expectedMonthlySales, setExpectedMonthlySales] = useState<number>(160000);
  const [monthlyFixedOutflows, setMonthlyFixedOutflows] = useState<number>(55000);
  const [monthlyVendorPurchases, setMonthlyVendorPurchases] = useState<number>(115000);
  const [monthlyLoanEmi, setMonthlyLoanEmi] = useState<number>(8000);

  const results = useMemo(() => {
    return calculateCashFlowRunway({
      currentCashInBank,
      pendingReceivablesDue30Days,
      expectedMonthlySales,
      monthlyFixedOutflows,
      monthlyVendorPurchases,
      monthlyLoanEmi,
    });
  }, [
    currentCashInBank,
    pendingReceivablesDue30Days,
    expectedMonthlySales,
    monthlyFixedOutflows,
    monthlyVendorPurchases,
    monthlyLoanEmi,
  ]);

  return (
    <div className="space-y-8">
      {/* Top Banner Alert depending on survivalStatus */}
      <div
        className={`border rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
          results.survivalStatus === 'critical'
            ? 'bg-rose-50/90 border-rose-200 text-rose-950'
            : results.survivalStatus === 'moderate'
            ? 'bg-amber-50/90 border-amber-200 text-amber-950'
            : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`p-2.5 rounded-2xl shrink-0 mt-0.5 ${
              results.survivalStatus === 'critical'
                ? 'bg-rose-100 text-rose-700'
                : results.survivalStatus === 'moderate'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {results.survivalStatus === 'critical' ? (
              <ShieldAlert className="w-5 h-5" />
            ) : results.survivalStatus === 'moderate' ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <ShieldCheck className="w-5 h-5" />
            )}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Cash-Flow Survival Runway
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Profit on paper doesn&apos;t pay suppliers. Cash in the bank does. Track when your account will run empty if collections slow down.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-slate-200 px-5 py-2.5 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {results.survivalStatus === 'healthy' ? 'Cash Flow Status' : 'Survival Runway'}
          </div>
          <div
            className={`text-xl font-black ${
              results.survivalStatus === 'critical'
                ? 'text-rose-600'
                : results.survivalStatus === 'moderate'
                ? 'text-amber-600'
                : 'text-emerald-600'
            }`}
          >
            {results.survivalStatus === 'healthy'
              ? 'Surplus (Safe)'
              : `${results.daysUntilCashCrunch} Days (${results.runwayMonths} mo)`}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Cash In & Cash Out */}
        <div className="lg:col-span-6 space-y-6">
          {/* Liquidity / Cash Available */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span>Available Cash & Collections</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ₹{results.totalAvailableLiquidity.toLocaleString('en-IN')} Liquidity
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Current Liquid Cash (Bank Balance + Drawer)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={currentCashInBank || ''}
                    onChange={(e) => setCurrentCashInBank(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 180000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pending Udhaar / Receivables Due within 30 Days
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={pendingReceivablesDue30Days || ''}
                    onChange={(e) => setPendingReceivablesDue30Days(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 45000"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Only count realistic payments you expect to collect this month.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Expected Monthly Inflow from New Sales
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={expectedMonthlySales || ''}
                    onChange={(e) => setExpectedMonthlySales(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 160000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cash Outflows */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-rose-600" />
                <span>Monthly Cash Outflows</span>
              </h3>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                ₹{results.totalMonthlyCashOutflow.toLocaleString('en-IN')}/mo
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Fixed Expenses (Rent + Salaries + Electric)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={monthlyFixedOutflows || ''}
                    onChange={(e) => setMonthlyFixedOutflows(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 55000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Vendor Restocking & Inventory Purchases
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={monthlyVendorPurchases || ''}
                    onChange={(e) => setMonthlyVendorPurchases(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 115000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Business Loan EMIs & Machinery Payments
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={monthlyLoanEmi || ''}
                    onChange={(e) => setMonthlyLoanEmi(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 8000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Cash Reserve Diagnostic
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Net Monthly Burn vs Surplus
              </h3>
            </div>

            {/* Inflow vs Outflow Metric */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Monthly Net Cash Drift
                </span>
                <div
                  className={`text-2xl font-black ${
                    results.monthlyNetCashBurnOrSurplus >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {results.monthlyNetCashBurnOrSurplus >= 0 ? '+' : ''}₹{results.monthlyNetCashBurnOrSurplus.toLocaleString('en-IN')}/mo
                </div>
                <p className="text-[11px] text-slate-500">
                  {results.monthlyNetCashBurnOrSurplus >= 0 ? 'Cash flow positive operation' : 'Monthly cash drain'}
                </p>
              </div>

              <div
                className={`border rounded-2xl p-4.5 space-y-1 ${
                  results.survivalStatus === 'critical'
                    ? 'bg-rose-50 border-rose-200'
                    : results.survivalStatus === 'moderate'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-emerald-50 border-emerald-200'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider block text-slate-600">
                  Days of Cash Left
                </span>
                <div
                  className={`text-2xl font-black ${
                    results.survivalStatus === 'critical'
                      ? 'text-rose-700'
                      : results.survivalStatus === 'moderate'
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}
                >
                  {results.survivalStatus === 'healthy' ? 'Infinite (Safe)' : `${results.daysUntilCashCrunch} Days`}
                </div>
                <p className="text-[11px] text-slate-600">
                  {results.survivalStatus === 'healthy'
                    ? 'Monthly sales cover all outflows'
                    : `Zero cash on ${new Date(Date.now() + results.daysUntilCashCrunch * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`}
                </p>
              </div>
            </div>

            {/* Diagnostic Message */}
            <div
              className={`p-4.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                results.survivalStatus === 'critical'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : results.survivalStatus === 'moderate'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <div className="font-extrabold mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Diagnostic Notice</span>
              </div>
              {results.urgencyWarning}
            </div>

            {/* Urgent Survival Action Plan */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Emergency Cash Conservation Checklist:
              </h4>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Collect All Pending Udhaar Today</strong>
                    Send polite WhatsApp reminders with quick UPI payment links to every debtor. Even recovering 40% of receivables adds ₹{Math.round(pendingReceivablesDue30Days * 0.4).toLocaleString('en-IN')} instant liquidity.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Pause Restocking Non-Core Inventory</strong>
                    Freeze new orders for slow-moving items. Run a clearance flash sale on existing stock to convert locked capital directly into bank balance.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Renegotiate Vendor Credit Terms</strong>
                    Request trusted suppliers for an extra 10–14 days credit buffer on current invoices to keep working capital protected.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
