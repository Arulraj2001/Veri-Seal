'use client';

import React, { useState, useMemo } from 'react';
import {
  Tag,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
  Info,
  Layers,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { calculateProductPricing } from '@/lib/business-os/calculations';
import { INDIAN_MARKETPLACES } from '@/lib/business-os/platforms';
import { IndianMarketplaceId } from '@/lib/business-os/types';

export default function ProductPricingEngine() {
  const [costPrice, setCostPrice] = useState<number>(400);
  const [packagingCost, setPackagingCost] = useState<number>(20);
  const [shippingCharge, setShippingCharge] = useState<number>(60);
  const [marketplaceId, setMarketplaceId] = useState<IndianMarketplaceId>('amazon_easy_ship');
  const [desiredProfitRupees, setDesiredProfitRupees] = useState<number>(100);

  const pricing = useMemo(() => {
    return calculateProductPricing({
      costPrice,
      packagingCost,
      shippingCharge,
      marketplaceId,
      desiredProfitRupees,
      gstRatePercent: 18,
    });
  }, [costPrice, packagingCost, shippingCharge, marketplaceId, desiredProfitRupees]);

  const platform = INDIAN_MARKETPLACES[marketplaceId];

  const handleAffiliateClick = () => {
    window.open('https://www.shiprocket.in/?utm_source=kagazo&utm_medium=pricing_tool', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Platform Selector Tabs */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Sales Channel / Marketplace Fee Preset
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {(Object.keys(INDIAN_MARKETPLACES) as IndianMarketplaceId[]).map((key) => {
            const p = INDIAN_MARKETPLACES[key];
            const isSelected = marketplaceId === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMarketplaceId(key)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full block w-fit mb-2 ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {p.badge}
                </span>
                <div className={`text-xs font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-900'}`}>
                  {p.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Platform Note */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
          <span>
            <strong>{platform.name}:</strong> {platform.tagline} &bull; {platform.rtoPolicyNote}
          </span>
        </div>
      </div>

      {/* Inputs Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Unit Manufacturing / Purchase Cost
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              step={10}
              value={costPrice}
              onChange={(e) => setCostPrice(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400 font-bold">₹</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Wholesale price per single piece.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Packaging &amp; Labeling Cost
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              step={5}
              value={packagingCost}
              onChange={(e) => setPackagingCost(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400 font-bold">₹</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Box, bubble wrap, poly mailer, tape.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Courier / Shipping Cost
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              step={10}
              value={shippingCharge}
              onChange={(e) => setShippingCharge(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400 font-bold">₹</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Weight slab charge (e.g. ₹50–₹80 for 500g).</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Desired In-Pocket Profit (₹)
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              step={10}
              value={desiredProfitRupees}
              onChange={(e) => setDesiredProfitRupees(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400 font-bold">₹ Net</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Clean profit after paying all fees.</p>
        </div>
      </div>

      {/* Output Recommended Price Banner */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-emerald-50/40 border border-indigo-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-100 pb-5">
          <div>
            <span className="text-xs font-extrabold text-indigo-800 uppercase tracking-wider block">
              Recommended Retail Price
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                ₹{pricing.recommendedSellingPrice}
              </span>
              <span className="text-xs text-slate-500 font-bold">Listing Price to Customer</span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-slate-500 font-medium block">Net Profit Margin</span>
            <span className="text-3xl font-black text-emerald-700">
              {pricing.netMarginPercent}%
            </span>
          </div>
        </div>

        {/* Breakdown of Every Rupee Customer Pays */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium block">Product Cost</span>
            <div className="text-lg font-black text-slate-900">₹{pricing.costPrice}</div>
            <span className="text-[10px] text-slate-400">Purchased from vendor</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium block">Packaging &amp; Shipping</span>
            <div className="text-lg font-black text-slate-900">₹{pricing.packagingCost + pricing.shippingCharge}</div>
            <span className="text-[10px] text-slate-400">Logistics fulfillment</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium block">Marketplace Cut</span>
            <div className="text-lg font-black text-slate-900">₹{pricing.marketplaceCommission}</div>
            <span className="text-[10px] text-slate-400">Referral + closing fee</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium block">Payment Gateway</span>
            <div className="text-lg font-black text-slate-900">₹{pricing.paymentGatewayFee}</div>
            <span className="text-[10px] text-slate-400">MDR transaction fee</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1 shadow-xs">
            <span className="text-[11px] text-emerald-800 font-bold block">Your Net Profit</span>
            <div className="text-lg font-black text-emerald-700">₹{pricing.netProfit}</div>
            <span className="text-[10px] text-emerald-700 font-medium">Clear cash retained</span>
          </div>
        </div>

        {/* Tip & Shipping Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-600">
            <strong>Pro Seller Tip:</strong> {platform.affiliateTip}
          </span>
          <button
            type="button"
            onClick={handleAffiliateClick}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Compare Courier Rates on Shiprocket</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
