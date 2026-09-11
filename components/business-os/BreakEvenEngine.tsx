'use client';

import React, { useState, useMemo } from 'react';
import {
  Target,
  Calendar,
  Building,
  TrendingUp,
  Receipt,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { calculateBreakEven } from '@/lib/business-os/calculations';

export default function BreakEvenEngine() {
  // Fixed costs breakdown
  const [shopRent, setShopRent] = useState<number>(18000);
  const [staffSalaries, setStaffSalaries] = useState<number>(22000);
  const [utilitiesWifi, setUtilitiesWifi] = useState<number>(4500);
  const [loanEmiOrSaaS, setLoanEmiOrSaaS] = useState<number>(3500);
  const [otherFixedOverhead, setOtherFixedOverhead] = useState<number>(2000);

  // Per order unit economics
  const [averageSellingPrice, setAverageSellingPrice] = useState<number>(1200);
  const [productCostPerOrder, setProductCostPerOrder] = useState<number>(550);
  const [packagingAndDeliveryPerOrder, setPackagingAndDeliveryPerOrder] = useState<number>(130);

  const totalMonthlyFixedCosts = useMemo(() => {
    return shopRent + staffSalaries + utilitiesWifi + loanEmiOrSaaS + otherFixedOverhead;
  }, [shopRent, staffSalaries, utilitiesWifi, loanEmiOrSaaS, otherFixedOverhead]);

  const totalCostPerOrder = useMemo(() => {
    return productCostPerOrder + packagingAndDeliveryPerOrder;
  }, [productCostPerOrder, packagingAndDeliveryPerOrder]);

  const results = useMemo(() => {
    return calculateBreakEven({
      monthlyFixedCosts: totalMonthlyFixedCosts,
      averageSellingPrice,
      averageCostPerOrder: totalCostPerOrder,
    });
  }, [totalMonthlyFixedCosts, averageSellingPrice, totalCostPerOrder]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-indigo-100 rounded-2xl text-indigo-700 mt-0.5 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Break-Even & Survival Volume Target
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Know the exact day of the month and number of orders after which your business stops paying bills and starts pocketing true profit.
            </p>
          </div>
        </div>
        <div className="bg-white/90 border border-indigo-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Contribution Margin</div>
          <div className="text-xl font-black text-indigo-700">
            {results.contributionMarginPercent}%
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Fixed Overheads */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <span>Monthly Fixed Costs (Must Pay)</span>
              </h3>
              <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                ₹{totalMonthlyFixedCosts.toLocaleString('en-IN')}/mo
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Shop / Godown / Office Rent
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={shopRent || ''}
                    onChange={(e) => setShopRent(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 18000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Staff Salaries & Helper Wages
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={staffSalaries || ''}
                    onChange={(e) => setStaffSalaries(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 22000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Electricity & Wi-Fi
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={utilitiesWifi || ''}
                      onChange={(e) => setUtilitiesWifi(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      placeholder="e.g. 4500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Loan EMI / Software
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={loanEmiOrSaaS || ''}
                      onChange={(e) => setLoanEmiOrSaaS(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      placeholder="e.g. 3500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Other Fixed Overheads (CA fees, Trade license, Municipal tax)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={otherFixedOverhead || ''}
                    onChange={(e) => setOtherFixedOverhead(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 2000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Unit Order Economics */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-indigo-600" />
                <span>Per-Order Unit Economics</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Average Order Selling Price (AOV)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="1"
                    value={averageSellingPrice || ''}
                    onChange={(e) => setAverageSellingPrice(Math.max(1, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 1200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Product COGS / order
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={productCostPerOrder || ''}
                      onChange={(e) => setProductCostPerOrder(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      placeholder="e.g. 550"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Packaging & Shipping
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={packagingAndDeliveryPerOrder || ''}
                      onChange={(e) => setPackagingAndDeliveryPerOrder(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      placeholder="e.g. 130"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output Break-Even Dashboard */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Your Zero-Profit Survival Threshold
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Break-Even Operational Reality
              </h3>
            </div>

            {/* Big Numbers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-50/70 border border-indigo-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                  Monthly Sales Needed
                </span>
                <div className="text-2xl font-black text-indigo-950">
                  ₹{results.breakEvenMonthlyRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-indigo-800">
                  Exact revenue required to cover 100% of bills
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Daily Orders Needed
                </span>
                <div className="text-2xl font-black text-emerald-950">
                  {results.breakEvenDailyOrders} Orders / day
                </div>
                <p className="text-[11px] text-emerald-800">
                  Assuming 26 operational business days/mo
                </p>
              </div>
            </div>

            {/* Detailed Unit Margins */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm">
                <span className="text-slate-600 font-medium">Gross Margin per Order</span>
                <span className="font-extrabold text-slate-900">
                  ₹{results.contributionMarginRupees.toLocaleString('en-IN')} ({results.contributionMarginPercent}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm">
                <span className="text-slate-600 font-medium">Total Orders to Clear Fixed Costs</span>
                <span className="font-extrabold text-indigo-700">
                  {results.breakEvenMonthlyOrders} orders / month
                </span>
              </div>
            </div>

            {/* Milestone Insight */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-700" />
                <h4 className="text-sm font-extrabold text-amber-950">The Owner&apos;s Payday Rule</h4>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Orders 1 through <span className="font-extrabold">{results.breakEvenMonthlyOrders}</span> pay your landlord, staff, and electric company. Starting from order{' '}
                <span className="font-black text-emerald-700">#{results.breakEvenMonthlyOrders + 1}</span>, every rupee of contribution margin (₹{results.contributionMarginRupees}/order) stays in your personal bank account!
              </p>
            </div>
          </div>

          {/* Actionable Levers to lower break-even */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900">
              3 Ways to Lower Your Break-Even Target:
            </h4>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Increase Average Order Value:</strong> Add upsells or combo packs. If your AOV rises from ₹1,200 to ₹1,500, you need 20% fewer orders to pay fixed bills.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Negotiate Bulk Packaging:</strong> Direct raw material purchase can save ₹30–₹50 per parcel, widening your contribution margin immediately.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Audit Redundant Fixed Costs:</strong> Cancel unused SaaS subscriptions or renegotiate space allocation to reduce monthly fixed overhead.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
