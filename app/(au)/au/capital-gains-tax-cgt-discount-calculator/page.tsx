'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Building2,
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
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function CapitalGainsTaxCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = React.useState<number>(550000);
  const [salePrice, setSalePrice] = React.useState<number>(850000);
  const [purchaseCosts, setPurchaseCosts] = React.useState<number>(25000); // stamp duty, legals
  const [capitalImprovements, setCapitalImprovements] = React.useState<number>(30000); // renovations
  const [sellingCosts, setSellingCosts] = React.useState<number>(20000); // agent commission, marketing
  const [heldOver12Months, setHeldOver12Months] = React.useState<boolean>(true);
  const [entityType, setEntityType] = React.useState<'individual' | 'super' | 'company'>('individual');
  const [carriedForwardLosses, setCarriedForwardLosses] = React.useState<number>(5000);
  const [marginalTaxRate, setMarginalTaxRate] = React.useState<number>(32); // 30% + 2% Medicare

  const results = React.useMemo(() => {
    const totalCostBase = purchasePrice + purchaseCosts + capitalImprovements + sellingCosts;
    const grossGain = salePrice - totalCostBase;

    if (grossGain <= 0) {
      return {
        totalCostBase,
        grossGain,
        isLoss: true,
        capitalLoss: Math.abs(grossGain),
        netTaxableGain: 0,
        discountApplied: 0,
        discountPercentage: 0,
        estimatedTax: 0,
        netCashProceeds: salePrice - totalCostBase,
      };
    }

    // Offset capital losses before applying CGT discount (ITAA 1997 s.115-25)
    const gainAfterLosses = Math.max(0, grossGain - carriedForwardLosses);

    // Determine discount percentage
    let discountRate = 0;
    if (heldOver12Months) {
      if (entityType === 'individual') discountRate = 0.50; // 50% discount
      else if (entityType === 'super') discountRate = 0.3333; // 33.33% discount
      else discountRate = 0; // 0% for companies
    }

    const discountApplied = gainAfterLosses * discountRate;
    const netTaxableGain = gainAfterLosses - discountApplied;
    const estimatedTax = netTaxableGain * (marginalTaxRate / 100);
    const netCashRetained = grossGain - estimatedTax;

    return {
      totalCostBase,
      grossGain,
      isLoss: false,
      capitalLoss: 0,
      gainAfterLosses,
      discountRate,
      discountPercentage: discountRate * 100,
      discountApplied,
      netTaxableGain,
      estimatedTax,
      netCashRetained,
    };
  }, [purchasePrice, salePrice, purchaseCosts, capitalImprovements, sellingCosts, heldOver12Months, entityType, carriedForwardLosses, marginalTaxRate]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian Capital Gains Tax (CGT) & 50% Discount Calculator',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian Capital Gains Tax (CGT) discount calculator under ITAA 1997 Subdivision 115-A. Calculate 50% individual discount, cost base elements, and net tax payable.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/au" className="hover:text-amber-800 transition-colors">Australia Suite</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">50% CGT Discount Calculator</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Calculator className="w-3.5 h-3.5" />
          <span>ITAA 1997 Subdivision 115-A</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Australian Capital Gains Tax (50% CGT Discount) Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Evaluate statutory capital gains on real property, shares, and managed funds under the Income Tax Assessment Act 1997 with full 5-element cost base adjustments, capital loss offsets, and the 50% general discount.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Asset &amp; Cost Base Parameters</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Subdiv 115-A
            </span>
          </div>

          {/* Asset Sale Proceeds */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Gross Sale Proceeds ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${salePrice.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={salePrice}
              onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
          </div>

          {/* Original Purchase Price */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Original Purchase Price ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${purchasePrice.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
            />
          </div>

          {/* Cost Base Additions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Acquisition Costs (Duty/Legal)</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={purchaseCosts}
                onChange={(e) => setPurchaseCosts(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Capital Improvements</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={capitalImprovements}
                onChange={(e) => setCapitalImprovements(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Selling Costs (Agent / Legal / Adv)</label>
            <input
              type="number"
              min="0"
              step="1000"
              value={sellingCosts}
              onChange={(e) => setSellingCosts(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
            />
          </div>

          {/* 12 Month Rule Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Holding Period (12-Month Rule)</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHeldOver12Months(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  heldOver12Months
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                12 Months or More
              </button>
              <button
                type="button"
                onClick={() => setHeldOver12Months(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  !heldOver12Months
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Under 12 Months
              </button>
            </div>
          </div>

          {/* Entity Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Tax Entity</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setEntityType('individual')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border ${
                  entityType === 'individual' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Individual (50%)
              </button>
              <button
                type="button"
                onClick={() => setEntityType('super')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border ${
                  entityType === 'super' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                SMSF (33.3%)
              </button>
              <button
                type="button"
                onClick={() => setEntityType('company')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border ${
                  entityType === 'company' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Company (0%)
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Net Taxable Gain Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Taxable Capital Gain (Assessable)
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                Discount: {results.discountPercentage.toFixed(1)}%
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.netTaxableGain).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD</span>
              </div>
              <p className="text-xs text-slate-400">
                Gross Capital Profit: ${Math.round(results.grossGain).toLocaleString()} AUD
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Tax Savings from 50% Discount</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                  ${Math.round(results.discountApplied * (marginalTaxRate / 100)).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Estimated Tax Payable</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  ${Math.round(results.estimatedTax).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Statutory Cost Base &amp; Gain Breakdown
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Total Statutory Cost Base (5 Elements)</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(results.totalCostBase).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Gross Capital Profit</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(results.grossGain).toLocaleString()}</span>
              </div>
              {carriedForwardLosses > 0 && (
                <div className="py-2.5 flex justify-between text-blue-700">
                  <span>Less: Prior-Year Capital Losses Applied</span>
                  <span className="font-mono font-bold">-${carriedForwardLosses.toLocaleString()}</span>
                </div>
              )}
              {results.discountApplied > 0 && (
                <div className="py-2.5 flex justify-between text-emerald-700">
                  <span>Less: CGT Discount ({results.discountPercentage}%)</span>
                  <span className="font-mono font-bold">-${Math.round(results.discountApplied).toLocaleString()}</span>
                </div>
              )}
              <div className="py-3 flex justify-between font-black text-sm text-slate-950 border-t-2 border-slate-200">
                <span>Net Capital Gain Added to Tax Return</span>
                <span className="font-mono text-amber-700">${Math.round(results.netTaxableGain).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guide */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Income Tax Assessment Act 1997: Subdivision 115-A CGT Discount
          </h2>
          <p>
            In Australia, capital gains are not taxed as a separate flat-rate transaction; instead, your net capital gain is integrated into your assessable income and taxed at your marginal personal tax rate. To encourage long-term productive investment and offset inflationary bracket creep, Subdivision 115-A of the ITAA 1997 allows a statutory 50% discount for Australian resident individuals and trusts who hold an asset for at least 12 months.
          </p>
          <p>
            The 12-month period runs strictly between the date of the acquisition contract and the date of the disposal contract (the date the contract for sale is entered into, not the delayed settlement date).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Order of Application: Losses Must Precede the Discount
          </h2>
          <p>
            A common taxpayer misconception is that capital losses are offset after halving the gain. Section 115-25 mandates the statutory sequence of calculation:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Calculate your capital gain for each CGT asset.</li>
            <li>Apply any current-year capital losses.</li>
            <li>Apply any unapplied net capital losses from previous financial years.</li>
            <li>Only on the remaining net balance do you apply the 50% discount (or 33.33% for super funds).</li>
          </ol>
        </section>
      </article>
    </div>
  );
}

