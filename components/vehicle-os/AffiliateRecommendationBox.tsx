import * as React from 'react';
import { ExternalLink, Tag, ShieldCheck, Sparkles } from 'lucide-react';
import { AffiliateDeal } from '@/lib/vehicle-os/affiliate-config';

interface AffiliateRecommendationBoxProps {
  deals: AffiliateDeal[];
  title?: string;
  contextHint?: string;
}

export function AffiliateRecommendationBox({
  deals,
  title = 'Verified OEM & Aftermarket Replacement Deals',
  contextHint = 'Based on your vehicle analysis, here are the most price-competitive verified replacement options with doorstep installation:',
}: AffiliateRecommendationBoxProps) {
  if (!deals || deals.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 leading-tight flex items-center gap-1.5">
              <span>{title}</span>
            </h3>
            <span className="text-[11px] text-slate-600 font-medium">{contextHint}</span>
          </div>
        </div>

        <span className="self-start sm:self-auto text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/60 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-amber-700" />
          <span>India Verified</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white border border-slate-200/90 hover:border-amber-400/80 rounded-2xl p-4 flex flex-col justify-between transition-all hover:shadow-md group"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                  {deal.partnerName}
                </span>
                <span className="text-[9px] font-black uppercase tracking-tight text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  {deal.badge}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                  {deal.title}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{deal.description}</p>
              </div>

              {deal.discountOrDeal && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50/80 p-1.5 rounded-lg border border-amber-200/60">
                  <Tag className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>{deal.discountOrDeal}</span>
                </div>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100">
              <a
                href={deal.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors group-hover:shadow-sm"
              >
                <span>{deal.ctaText}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[10px] text-slate-500 italic pt-1 text-center sm:text-left">
        * VeriSeal curates independent, high-reputation automotive suppliers. Prices and exchange scrap discounts are updated weekly.
      </div>
    </div>
  );
}
