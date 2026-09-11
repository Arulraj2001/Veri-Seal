'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  PieChart,
  ShieldAlert,
  Coins,
  CheckCircle2,
} from 'lucide-react';
import { calculateRealProfit } from '@/lib/business-os/calculations';

export default function RealProfitLeakEngine() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(500000);
  const [productCostCogs, setProductCostCogs] = useState<number>(280000);
  const [marketplaceFees, setMarketplaceFees] = useState<number>(25000);
  const [deliveryCourierCharges, setDeliveryCourierCharges] = useState<number>(18000);
  const [packagingMaterials, setPackagingMaterials] = useState<number>(12000);
  const [staffSalaries, setStaffSalaries] = useState<number>(45000);
  const [shopOfficeRent, setShopOfficeRent] = useState<number>(20000);
  const [electricityUtilities, setElectricityUtilities] = useState<number>(8000);
  const [marketingAds, setMarketingAds] = useState<number>(17000);
  const [otherExpenses, setOtherExpenses] = useState<number>(5000);

  const profit = useMemo(() => {
    return calculateRealProfit({
      monthlyRevenue,
      productCostCogs,
      marketplaceFees,
      deliveryCourierCharges,
      packagingMaterials,
      staffSalaries,
      shopOfficeRent,
      electricityUtilities,
      marketingAds,
      gstAssumptionsPercent: 18,
      otherExpenses,
    });
  }, [
    monthlyRevenue,
    productCostCogs,
    marketplaceFees,
    deliveryCourierCharges,
    packagingMaterials,
    staffSalaries,
    shopOfficeRent,
    electricityUtilities,
    marketingAds,
    otherExpenses,
  ]);

  return (
    <div className="space-y-8">
      {/* Configuration Inputs */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-5 h-5 text-indigo-600" />
              <span>Monthly Business P&amp;L Statements</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your real monthly revenue and major expense heads to uncover hidden profit leaks.
            </p>
          </div>
          <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
            Turnover: ₹{monthlyRevenue.toLocaleString('en-IN')}/mo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly Revenue */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Total Monthly Revenue
            </label>
            <input
              type="number"
              step={10000}
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Product COGS */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Wholesale Product Cost (COGS)
            </label>
            <input
              type="number"
              step={5000}
              value={productCostCogs}
              onChange={(e) => setProductCostCogs(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Marketplace Fees */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Marketplace Commissions
            </label>
            <input
              type="number"
              step={1000}
              value={marketplaceFees}
              onChange={(e) => setMarketplaceFees(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Delivery & Logistics */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Courier &amp; Delivery Freight
            </label>
            <input
              type="number"
              step={1000}
              value={deliveryCourierCharges}
              onChange={(e) => setDeliveryCourierCharges(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Staff Salaries */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Staff Salaries &amp; Wages
            </label>
            <input
              type="number"
              step={2000}
              value={staffSalaries}
              onChange={(e) => setStaffSalaries(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Rent & Commercial Space */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Shop / Office / Warehouse Rent
            </label>
            <input
              type="number"
              step={2000}
              value={shopOfficeRent}
              onChange={(e) => setShopOfficeRent(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Electricity & Utilities */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Electricity &amp; Internet
            </label>
            <input
              type="number"
              step={500}
              value={electricityUtilities}
              onChange={(e) => setElectricityUtilities(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Marketing & Paid Ads */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Meta / Google Ad Spend
            </label>
            <input
              type="number"
              step={1000}
              value={marketingAds}
              onChange={(e) => setMarketingAds(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Packaging & Sundry */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Packaging &amp; Sundry Supplies
            </label>
            <input
              type="number"
              step={500}
              value={packagingMaterials + otherExpenses}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPackagingMaterials(Math.round(val * 0.7));
                setOtherExpenses(Math.round(val * 0.3));
              }}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Outputs Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Gross Profit</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            ₹{profit.grossProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-indigo-700 font-semibold mt-1 block">
            {profit.grossMarginPercent}% Gross Margin
          </span>
        </div>

        <div className="bg-white border border-emerald-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-emerald-800 font-bold block">Real Monthly Profit</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">
            ₹{profit.netEstimatedProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block font-medium">
            {profit.netMarginPercent}% Real Net Margin
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Annualized Net Income</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            ₹{profit.annualNetProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block font-medium">
            ₹{(profit.annualNetProfit / 100000).toFixed(1)} Lakhs / year
          </span>
        </div>
      </div>

      {/* Flagship: Profit Leak Detection Diagnostic */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <h4 className="text-base font-extrabold text-slate-900">
            Automated Profit Leak Diagnostic ({profit.topProfitLeaks.length} Identified)
          </h4>
        </div>

        {profit.topProfitLeaks.length === 0 ? (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Excellent cost controls! No single expense head exceeds dangerous commercial benchmarks.</span>
          </div>
        ) : (
          <div className="space-y-4">
            {profit.topProfitLeaks.map((leak, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                        leak.severity === 'high'
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      {leak.severity} PRIORITY LEAK
                    </span>
                    <h5 className="text-sm font-extrabold text-slate-900">
                      {leak.diagnosticTitle}
                    </h5>
                  </div>
                  <span className="text-xs font-black text-rose-700">
                    ₹{leak.monthlyAmount.toLocaleString('en-IN')}/mo ({leak.percentOfRevenue}% of turnover)
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {leak.recommendation}
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>Potential Annual Saving:</span>
                  <span>+₹{leak.potentialAnnualSaving.toLocaleString('en-IN')}/year</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
