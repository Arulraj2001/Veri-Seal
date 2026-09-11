'use client';

import React, { useState, useMemo } from 'react';
import {
  Truck,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Package,
  TrendingDown,
  TrendingUp,
  Receipt,
  HelpCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { calculateDeliveryProfit } from '@/lib/business-os/calculations';

export default function DeliveryProfitEngine() {
  const [averageOrderValue, setAverageOrderValue] = useState<number>(899);
  const [productCost, setProductCost] = useState<number>(320);
  const [packagingCost, setPackagingCost] = useState<number>(35);
  const [forwardCourierFee, setForwardCourierFee] = useState<number>(65);
  const [rtoReturnCourierFee, setRtoReturnCourierFee] = useState<number>(60);
  const [rtoFailureRatePercent, setRtoFailureRatePercent] = useState<number>(20);
  const [paymentGatewayPercent, setPaymentGatewayPercent] = useState<number>(2.0);

  const results = useMemo(() => {
    return calculateDeliveryProfit({
      averageOrderValue,
      productCost,
      packagingCost,
      forwardCourierFee,
      rtoReturnCourierFee,
      rtoFailureRatePercent,
      paymentGatewayPercent,
    });
  }, [
    averageOrderValue,
    productCost,
    packagingCost,
    forwardCourierFee,
    rtoReturnCourierFee,
    rtoFailureRatePercent,
    paymentGatewayPercent,
  ]);

  const rtoChips = [5, 10, 15, 20, 25, 30, 35];

  // If order returns (RTO), owner loses forward + return + packaging with 0 rupee earned
  const deadLossPerRto = forwardCourierFee + rtoReturnCourierFee + packagingCost;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-indigo-100 rounded-2xl text-indigo-700 mt-0.5 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Courier Delivery & RTO Bleed Sizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Indian Cash-on-Delivery (COD) orders often suffer 20%–30% Return to Origin (RTO). If you don&apos;t factor reverse courier and damaged packaging, your e-commerce business bleeds cash secretly.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-indigo-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Net Margin / Delivered</div>
          <div className={`text-xl font-black ${results.isProfitable ? 'text-emerald-700' : 'text-rose-600'}`}>
            {results.effectiveMarginPercent}%
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Order & Courier Costs */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              <span>Order Economics & Shipping Slabs</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">500g Courier Basis</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Average Selling Price (AOV charged to customer)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="50"
                  value={averageOrderValue || ''}
                  onChange={(e) => setAverageOrderValue(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. 899"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Product COGS (Cost)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={productCost || ''}
                    onChange={(e) => setProductCost(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 320"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Packaging (Box/Tape/Flyer)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={packagingCost || ''}
                    onChange={(e) => setPackagingCost(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 35"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Forward Shipping Freight
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={forwardCourierFee || ''}
                    onChange={(e) => setForwardCourierFee(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 65"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Delhivery/Shiprocket 500g</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Return (RTO) Courier Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={rtoReturnCourierFee || ''}
                    onChange={(e) => setRtoReturnCourierFee(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. 60"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Reverse logistics freight</p>
              </div>
            </div>

            {/* RTO Rate Slider & Chips */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Expected RTO / Return Failure Rate</span>
                </label>
                <span className="text-sm font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                  {rtoFailureRatePercent}% Orders Return
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={rtoFailureRatePercent}
                onChange={(e) => setRtoFailureRatePercent(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              <div className="flex flex-wrap items-center gap-2">
                {rtoChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setRtoFailureRatePercent(chip)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      rtoFailureRatePercent === chip
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

        {/* Right Output: True Profit Reality */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Delivered Order Economics
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Net Profit After Absorbing RTO
              </h3>
            </div>

            {/* Profit Score Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  True Profit / Delivered Order
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                  ₹{results.netDeliveredOrderProfit.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-emerald-800">
                  Margin: {results.effectiveMarginPercent}% of AOV
                </p>
              </div>

              <div className="bg-rose-50/70 border border-rose-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                  Hidden RTO Tax / Order
                </span>
                <div className="text-2xl sm:text-3xl font-black text-rose-700">
                  ₹{results.costOfRtoPerOrderSpread}
                </div>
                <p className="text-[11px] text-rose-700">
                  Every parcel carries this return overhead
                </p>
              </div>
            </div>

            {/* Contrast Box: Delivered vs Returned */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                The Pain of 1 Single RTO Parcel:
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a customer rejects a COD parcel at the doorstep, you earn <strong className="text-rose-600">₹0</strong>, but you still pay forward courier (₹{forwardCourierFee}) + reverse courier (₹{rtoReturnCourierFee}) + destroyed box (₹{packagingCost}). That is an outright lost cash bleed of <strong className="text-rose-600">₹{deadLossPerRto} out of your pocket</strong>.
              </p>
            </div>

            {/* Diagnostic Alert */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4.5 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold block text-amber-950 mb-0.5">RTO Impact Analysis</span>
                {results.rtoBleedWarning}
              </div>
            </div>

            {/* 3 Steps to cut RTO by 50% */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                3 Ways Indian Brands Cut RTO Bleed:
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Prepaid UPI Incentive:</strong> Offer ₹50 off or a free gift for instant UPI payments. Prepaid orders have a near 0% doorstep rejection rate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">WhatsApp Dispatch Confirmation:</strong> Send an automated WhatsApp bot prompt asking the buyer to confirm their house address and pincode before shipping.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Aggregated Logistics:</strong> Compare Delhivery, BlueDart, and Shadowfax via Shiprocket or Pickrr to select the highest delivery-success courier for each specific pincode.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
