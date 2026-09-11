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
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Decision Intelligence</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Prioritized Home Upgrades &amp; Savings Roadmap
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked by return-on-investment (ROI) and payback velocity.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 block font-medium">5-Year Net Wealth Gain</span>
          <span className="text-lg font-black text-emerald-400">
            ₹{recommendations.reduce((sum, r) => sum + r.fiveYearNetProfit, 0).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isBehavior = rec.actionType === 'behavior';

          return (
            <div
              key={rec.id}
              className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 transition-all duration-200 space-y-4 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        rec.impactLabel === 'HIGH IMPACT'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : rec.impactLabel === 'LOW HANGING FRUIT'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {rec.impactLabel}
                    </span>
                    <span className="text-xs text-slate-500">• {rec.category}</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {rec.title}
                  </h4>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs text-slate-400 block">Saves</span>
                  <span className="text-base font-extrabold text-emerald-400">
                    ₹{rec.annualSaving.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-normal">/year</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {rec.description}
              </p>

              {/* Financial Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Est. Investment</span>
                  <span className="font-bold text-white">
                    {rec.estimatedInvestment === 0 ? '₹0 (Free)' : `₹${rec.estimatedInvestment.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Monthly Savings</span>
                  <span className="font-bold text-emerald-400">
                    ₹{rec.monthlySaving.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Break-even Payback</span>
                  <span className="font-bold text-sky-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {rec.paybackMonths === 0 ? 'Immediate' : `${(rec.paybackMonths / 12).toFixed(1)} Years`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">5-Yr Net Profit</span>
                  <span className="font-bold text-purple-400 flex items-center gap-1">
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 text-xs font-bold transition-all duration-200 active:scale-[0.99]"
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
