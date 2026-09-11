'use client';

import React from 'react';
import {
  Sparkles,
  ArrowUpRight,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { UpgradeRecommendation } from '@/lib/home-cost/types';

interface Props {
  recommendations: UpgradeRecommendation[];
}

export default function AiAdvisorCard({ recommendations }: Props) {
  if (recommendations.length === 0) {
    return null;
  }

  const handleAffiliateClick = (query: string) => {
    const encoded = encodeURIComponent(query);
    window.open(`https://www.amazon.in/s?k=${encoded}&tag=veriseal-21`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Decision Intelligence</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Prioritized Home Upgrades &amp; Savings Roadmap
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by return-on-investment (ROI) and payback velocity.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-500 block font-medium">5-Year Net Wealth Gain</span>
          <span className="text-xl font-black text-emerald-700">
            ₹{recommendations.reduce((sum, r) => sum + r.fiveYearNetProfit, 0).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          return (
            <div
              key={rec.id}
              className="bg-slate-50 hover:bg-slate-100/60 border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-5 transition-all duration-200 space-y-4 group shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        rec.impactLabel === 'HIGH IMPACT'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : rec.impactLabel === 'LOW HANGING FRUIT'
                          ? 'bg-sky-100 text-sky-800 border-sky-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      {rec.impactLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">• {rec.category}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {rec.title}
                  </h4>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs text-slate-500 block font-medium">Saves</span>
                  <span className="text-base font-black text-emerald-700">
                    ₹{rec.annualSaving.toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-normal">/year</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {rec.description}
              </p>

              {/* Financial Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Est. Investment</span>
                  <span className="font-bold text-slate-900">
                    {rec.estimatedInvestment === 0 ? '₹0 (Free)' : `₹${rec.estimatedInvestment.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Monthly Savings</span>
                  <span className="font-bold text-emerald-700">
                    ₹{rec.monthlySaving.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Break-even Payback</span>
                  <span className="font-bold text-sky-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {rec.paybackMonths === 0 ? 'Immediate' : `${(rec.paybackMonths / 12).toFixed(1)} Years`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">5-Yr Net Profit</span>
                  <span className="font-bold text-purple-700 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    ₹{rec.fiveYearNetProfit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Affiliate Action Button */}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => handleAffiliateClick(rec.affiliateSearchQuery)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white text-xs font-bold border border-emerald-200 hover:border-emerald-600 transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-xs"
                >
                  <span>{rec.affiliateCtaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
