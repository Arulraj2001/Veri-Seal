'use client';

import React, { useState, useMemo } from 'react';
import {
  Coins,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { reconcileDailyRegisters } from '@/lib/business-os/operational-helpers';

export default function ReconciliationEngine() {
  const [openingCashFloat, setOpeningCashFloat] = useState<number>(2500);
  const [systemCashSales, setSystemCashSales] = useState<number>(14200);
  const [cashPaidOutForExpenses, setCashPaidOutForExpenses] = useState<number>(1150);
  const [physicalDrawerCashCount, setPhysicalDrawerCashCount] = useState<number>(15550);

  const [systemUpiSales, setSystemUpiSales] = useState<number>(18900);
  const [bankAppUpiReceived, setBankAppUpiReceived] = useState<number>(18900);

  const result = useMemo(() => {
    return reconcileDailyRegisters({
      date: new Date().toISOString().split('T')[0],
      openingCashFloat,
      systemCashSales,
      physicalDrawerCashCount,
      systemUpiSales,
      bankAppUpiReceived,
      cashPaidOutForExpenses,
    });
  }, [
    openingCashFloat,
    systemCashSales,
    physicalDrawerCashCount,
    systemUpiSales,
    bankAppUpiReceived,
    cashPaidOutForExpenses,
  ]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-700 mt-0.5 shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Evening Register Closing &amp; Cash Reconciliation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Close your shop books in 90 seconds. Tally physical drawer cash and verify that every PhonePe/GPay customer payment actually entered your bank account.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-emerald-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Cash Status</div>
          <div
            className={`text-xl font-black ${
              result.isCashBalanced
                ? 'text-emerald-700'
                : result.cashDiscrepancy < 0
                ? 'text-rose-600'
                : 'text-amber-700'
            }`}
          >
            {result.isCashBalanced
              ? 'Balanced (100%)'
              : result.cashDiscrepancy < 0
              ? `Shortage ₹${Math.abs(result.cashDiscrepancy)}`
              : `Surplus ₹${result.cashDiscrepancy}`}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cash Drawer */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600" />
              <span>Physical Cash Register (Till)</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">Drawer Closing</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Morning Opening Cash Float (Change in Drawer)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={openingCashFloat || ''}
                  onChange={(e) => setOpeningCashFloat(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Total Cash Sales Recorded Today
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={systemCashSales || ''}
                  onChange={(e) => setSystemCashSales(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Cash Paid Out for Petty Expenses (Milk, tea, staff advance)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={cashPaidOutForExpenses || ''}
                  onChange={(e) => setCashPaidOutForExpenses(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-extrabold text-indigo-900 mb-1.5">
                Tonight&apos;s Physical Cash Count in Drawer
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={physicalDrawerCashCount || ''}
                  onChange={(e) => setPhysicalDrawerCashCount(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 bg-indigo-50/60 border border-indigo-300 rounded-xl text-base font-black text-indigo-950 focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Reconciliation Diagnostic */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Expected Cash (Float + Sales - Outflows):</span>
                <span className="font-bold text-slate-800">
                  ₹{result.expectedCashInDrawer.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center font-extrabold border-t border-slate-200 pt-1.5">
                <span>Physical Tally Discrepancy:</span>
                <span
                  className={
                    result.isCashBalanced
                      ? 'text-emerald-700'
                      : result.cashDiscrepancy < 0
                      ? 'text-rose-600'
                      : 'text-amber-700'
                  }
                >
                  {result.cashDiscrepancy === 0
                    ? 'Exact Match (₹0 difference)'
                    : result.cashDiscrepancy < 0
                    ? `-₹${Math.abs(result.cashDiscrepancy)} Shortage`
                    : `+₹${result.cashDiscrepancy} Unaccounted Surplus`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Digital UPI Verification */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-indigo-600" />
              <span>Digital UPI Audit (PhonePe / GPay)</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">QR Settlements</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                System UPI Sales Billed to Customers
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={systemUpiSales || ''}
                  onChange={(e) => setSystemUpiSales(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Bank App UPI Credit Notifications Received
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={bankAppUpiReceived || ''}
                  onChange={(e) => setBankAppUpiReceived(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 bg-indigo-50/60 border border-indigo-300 rounded-xl text-base font-black text-indigo-950 focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            {/* UPI Discrepancy Status */}
            <div
              className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                result.isUpiBalanced
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/80 border-rose-200 text-rose-900'
              }`}
            >
              <div className="font-extrabold flex items-center gap-1.5">
                {result.isUpiBalanced ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                )}
                <span>
                  {result.isUpiBalanced
                    ? '100% UPI Transactions Verified'
                    : `UPI Discrepancy: ₹${Math.abs(result.upiDiscrepancy)}`}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {result.isUpiBalanced
                  ? 'Every single UPI rupee billed matches your merchant banking settlement.'
                  : 'A customer may have shown a fake screenshot or the transaction failed to settle. Check your PhonePe/GPay merchant soundbox logs.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
