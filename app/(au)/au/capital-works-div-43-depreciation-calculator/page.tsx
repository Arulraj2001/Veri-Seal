'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  FileText,
  ArrowRight,
  Sparkles,
  Info,
  DollarSign,
  TrendingDown,
  CheckCircle2,
  Clock,
  HelpCircle,
  Percent,
  Calendar,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function CapitalWorksDiv43CalculatorPage() {
  const [constructionCost, setConstructionCost] = React.useState<number>(380000);
  const [constructionYear, setConstructionYear] = React.useState<number>(2016);
  const [holdingYears, setHoldingYears] = React.useState<number>(5);
  const [marginalTaxRate, setMarginalTaxRate] = React.useState<number>(39); // 37% + 2% Medicare

  // Statutory Rate under ITAA 1997 Div 43: 2.5% p.a. over 40 years
  const WRITE_OFF_RATE = 0.025;
  const STATUTORY_LIFESPAN = 40;

  const results = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const buildingAge = Math.max(0, currentYear - constructionYear);
    const yearsRemaining = Math.max(0, STATUTORY_LIFESPAN - buildingAge);

    const annualDeduction = yearsRemaining > 0 ? constructionCost * WRITE_OFF_RATE : 0;
    const totalDeductionsHeld = annualDeduction * holdingYears;
    const annualTaxSavings = annualDeduction * (marginalTaxRate / 100);
    const totalTaxSavings = totalDeductionsHeld * (marginalTaxRate / 100);

    return {
      buildingAge,
      yearsRemaining,
      annualDeduction,
      totalDeductionsHeld,
      annualTaxSavings,
      totalTaxSavings,
      isExpired: yearsRemaining === 0,
    };
  }, [constructionCost, constructionYear, holdingYears, marginalTaxRate]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian Division 43 Capital Works Depreciation Calculator',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian property depreciation calculator under ITAA 1997 Division 43. Calculate statutory 2.5% p.a. 40-year capital works building write-offs and tax savings.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/au" className="hover:text-amber-800 transition-colors">Australia Suite</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Division 43 Depreciation</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Building2 className="w-3.5 h-3.5" />
          <span>ITAA 1997 Division 43 Capital Works</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Division 43 Capital Works Building Depreciation Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Calculate the statutory 2.5% per annum building structural depreciation allowance over 40 years under Income Tax Assessment Act 1997 Division 43 and assess the CGT cost base adjustment impact.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Building Construction Data</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              2.5% p.a.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Historical Construction Cost ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${constructionCost.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="50000"
              step="10000"
              value={constructionCost}
              onChange={(e) => setConstructionCost(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
            <p className="text-[11px] text-slate-500">
              Original construction cost as estimated by an Australian registered Quantity Surveyor (TR 97/25).
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Construction Completion Year</span>
              <span className="text-xs text-amber-800 font-mono">{constructionYear}</span>
            </label>
            <input
              type="number"
              min="1992"
              max={new Date().getFullYear()}
              value={constructionYear}
              onChange={(e) => setConstructionYear(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-900 text-xs"
            />
            <p className="text-[11px] text-slate-500">
              Residential property must have commenced construction after 26 February 1992 to qualify for 2.5% write-off.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Anticipated Holding Period (Years)</span>
              <span className="text-xs text-amber-800 font-mono">{holdingYears} Years</span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={holdingYears}
              onChange={(e) => setHoldingYears(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Investor Marginal Tax Bracket</label>
            <select
              value={marginalTaxRate}
              onChange={(e) => setMarginalTaxRate(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs bg-white"
            >
              <option value={18}>18% (16% + 2% Medicare)</option>
              <option value={32}>32% (30% + 2% Medicare)</option>
              <option value={39}>39% (37% + 2% Medicare)</option>
              <option value={47}>47% (45% + 2% Medicare)</option>
            </select>
          </div>
        </div>

        {/* Calculation Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Annual Tax Deductible Write-Off
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                {results.yearsRemaining} Years Remaining (40-Yr Life)
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.annualDeduction).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">/year non-cash</span>
              </div>
              <p className="text-xs text-slate-400">
                Annual cash tax refund returned by ATO: <span className="font-bold text-emerald-400">+${Math.round(results.annualTaxSavings).toLocaleString()} AUD</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Cumulative {holdingYears}-Yr Deductions</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  ${Math.round(results.totalDeductionsHeld).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Total Cash Tax Savings</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  ${Math.round(results.totalTaxSavings).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              CGT Cost Base Recapture Alert (Section 110-45)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you sell this property, the <strong>${Math.round(results.totalDeductionsHeld).toLocaleString()}</strong> in Division 43 deductions you claimed must be subtracted from your asset&apos;s cost base, which increases the gross capital gain. However, because individual investors receive the 50% CGT discount on assets held &gt; 12 months, you effectively trade a 100% deduction today against a 50% taxed gain tomorrow!
            </p>
          </div>
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Division 43 vs Division 40 Statutory Distinction
          </h2>
          <p>
            The Income Tax Assessment Act 1997 bifurcates property depreciation into two distinct statutory categories:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Division 43 (Capital Works):</strong> Covers the structural core of the building—walls, slabs, roofs, and fixed tiling. It writes off over a 40-year statutory timeframe at 2.5% per annum based on historical construction expenditure. Unlike plant equipment, Division 43 entitlements transfer unconditionally to subsequent buyers.</li>
            <li><strong>Division 40 (Plant &amp; Equipment):</strong> Covers removable mechanical assets (hot water systems, air conditioners, carpets). Following the Treasury Laws Amendment (Housing Tax Integrity) Act 2017, second-hand residential plant assets can no longer be depreciated by subsequent purchasers.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}

