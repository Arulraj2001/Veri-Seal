'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Building,
  HelpCircle,
} from 'lucide-react';
import { BUSINESS_PRESETS } from '@/lib/business-os/presets';

export default function AiAdvisorEngine() {
  const [businessType, setBusinessType] = useState<string>('kirana_retail');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(380000);
  const [currentNetMargin, setCurrentNetMargin] = useState<number>(7.5);
  const [coreHeadache, setCoreHeadache] = useState<
    'cash_crunch' | 'marketplace_fees' | 'unpaid_udhaar' | 'dead_stock' | 'discount_pressure'
  >('unpaid_udhaar');

  const advice = useMemo(() => {
    switch (coreHeadache) {
      case 'unpaid_udhaar':
        return {
          title: 'Unpaid Customer Udhaar & Liquidity Choke',
          severity: 'HIGH RISK',
          rootCause:
            'Informal credit without a strict 14-day limit silently freezes your working capital. When customer khata exceeds 15% of monthly revenue, your ability to pay wholesalers in cash for 3% cash discounts is destroyed.',
          actionItems: [
            'Send non-awkward WhatsApp payment reminders with instant UPI QR links to all balances older than 14 days.',
            'Institute a "Max ₹1,500 Udhaar Cap" per customer family—no new credit until the previous balance clears.',
            'Offer a 2% spot discount for immediate UPI/Cash settlements.',
          ],
          potentialAnnualImpact: Math.round(monthlyRevenue * 0.12 * 0.4),
        };

      case 'marketplace_fees':
        return {
          title: 'Marketplace Commission Stacking & Fee Bleed',
          severity: 'CRITICAL MARGIN',
          rootCause:
            'Amazon and Flipkart category referral fees (8–18%), closing fees (₹15–₹45), shipping slabs, and 18% GST on fees consume 28%–35% of your customer billing, leaving razor-thin margins.',
          actionItems: [
            'Slip a VIP thank-you card into every parcel offering 10% off their next order if placed directly on your WhatsApp.',
            'Move repeat consumable or staple purchases entirely to direct WhatsApp UPI checkout.',
            'Re-verify volumetric box sizes to ensure you are not paying the 1kg shipping slab for a 450g product.',
          ],
          potentialAnnualImpact: Math.round(monthlyRevenue * 0.15 * 0.25 * 12),
        };

      case 'dead_stock':
        return {
          title: 'Trapped Working Capital in Stale Inventory',
          severity: 'CASH OBSTRUCTION',
          rootCause:
            'Inventory sitting on shelves for >90 days is decaying in value while holding liquid cash hostage. Stale inventory forces you to borrow or delay rent.',
          actionItems: [
            'Launch a 48-Hour Weekend WhatsApp Flash Clearance Sale at 10% above purchase cost.',
            'Bundle slow-moving items as "Complimentary Festive Gifts" on orders above ₹1,499 to elevate basket size.',
            'Negotiate vendor stock return or credit swap for high-velocity fast-moving goods.',
          ],
          potentialAnnualImpact: Math.round(monthlyRevenue * 0.18),
        };

      case 'discount_pressure':
        return {
          title: 'Margin Erosion from Chronic Price Discounting',
          severity: 'PROFIT CRASH',
          rootCause:
            'Discounting selling prices by 15%–20% cuts your net in-pocket profit by 50% or more because your product purchase costs never decrease.',
          actionItems: [
            'Replace price slashing with High-Perceived-Value bonuses (e.g. Free sample pouch, gift box packaging).',
            'Introduce tiered quantity pricing (e.g. 1 unit at ₹799, 2 units at ₹1,399).',
            'Set a Minimum Order Value threshold of ₹899 for free shipping.',
          ],
          potentialAnnualImpact: Math.round(monthlyRevenue * 0.08 * 12),
        };

      case 'cash_crunch':
      default:
        return {
          title: 'Month-End Working Capital Mismatch',
          severity: 'CRITICAL SURVIVAL',
          rootCause:
            'Your monthly fixed outflows (rent, staff, GST) happen on fixed dates (1st, 7th, 20th), while sales collections trickle in unevenly, creating severe temporary deficits.',
          actionItems: [
            'Maintain a 30-Day Cash Calendar and request suppliers for 21-day credit cycles.',
            'Reserve 15% of every single daily UPI inflow into a separate tax & rent sweep-in account.',
            'Freeze non-essential capital purchases until cash runway exceeds 60 days.',
          ],
          potentialAnnualImpact: Math.round(monthlyRevenue * 0.06 * 12),
        };
    }
  }, [coreHeadache, monthlyRevenue]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/60 border border-indigo-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-indigo-100 rounded-2xl text-indigo-700 mt-0.5 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              AI Business Diagnostic &amp; Margin Advisor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Heuristic financial intelligence analyzing your turnover, margins, and operational bottlenecks to deliver high-ROI weekly action items.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-indigo-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Potential Annual Gain</div>
          <div className="text-xl font-black text-emerald-600">
            +₹{advice.potentialAnnualImpact.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Current Business Profile</span>
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Business Industry</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                {BUSINESS_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Monthly Turnover / Revenue
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="10000"
                  value={monthlyRevenue || ''}
                  onChange={(e) => setMonthlyRevenue(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Current Estimated Net Margin %
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentNetMargin || ''}
                  onChange={(e) => setCurrentNetMargin(Number(e.target.value))}
                  className="w-full pr-7 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-xs">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1.5 uppercase tracking-wider">
                Biggest Financial Headache Today:
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'unpaid_udhaar', label: 'Unpaid Customer Udhaar (>30 Days)' },
                  { id: 'marketplace_fees', label: 'Marketplace Commissions & Courier RTO' },
                  { id: 'dead_stock', label: 'Stuck Working Capital in Dead Stock' },
                  { id: 'discount_pressure', label: 'Customers Asking for Heavy Discounts' },
                  { id: 'cash_crunch', label: 'Month-End Rent & Salary Cash Crunch' },
                ].map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setCoreHeadache(h.id as any)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer ${
                      coreHeadache === h.id
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: Diagnostic & Weekly Levers */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 uppercase">
                  {advice.severity}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {advice.title}
                </h3>
              </div>
            </div>

            {/* Root Cause */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs text-slate-600 leading-relaxed">
              <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block">
                Diagnostic Root Cause:
              </span>
              <p>{advice.rootCause}</p>
            </div>

            {/* 3 High-ROI Weekly Levers */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Implement These 3 Action Items This Week:
              </h4>

              <div className="space-y-2.5">
                {advice.actionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-start gap-2.5 text-xs text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
