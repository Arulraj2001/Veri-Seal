'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  ShieldCheck,
  Building2,
  FileText,
  ArrowRight,
  Sparkles,
  Info,
  DollarSign,
  CheckCircle2,
  Clock,
  HelpCircle,
  Percent,
  Home,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function RentalYieldNegativeGearingCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = React.useState<number>(750000);
  const [weeklyRent, setWeeklyRent] = React.useState<number>(680);
  const [loanAmount, setLoanAmount] = React.useState<number>(600000);
  const [interestRate, setInterestRate] = React.useState<number>(6.2);
  const [annualOutgoings, setAnnualOutgoings] = React.useState<number>(6500); // council, strata, insurance, agent
  const [depreciationDeduction, setDepreciationDeduction] = React.useState<number>(7000); // Div 43 & 40 non-cash
  const [marginalTaxRate, setMarginalTaxRate] = React.useState<number>(39); // 37% + 2% Medicare

  const results = React.useMemo(() => {
    const annualRentalIncome = weeklyRent * 52;
    const annualMortgageInterest = loanAmount * (interestRate / 100);
    const totalCashOutgoings = annualMortgageInterest + annualOutgoings;
    const netCashFlowPreTax = annualRentalIncome - totalCashOutgoings;

    // Gross and Net Yields
    const grossYield = propertyPrice > 0 ? (annualRentalIncome / propertyPrice) * 100 : 0;
    const netYield = propertyPrice > 0 ? ((annualRentalIncome - annualOutgoings) / propertyPrice) * 100 : 0;

    // Section 8-1 ITAA 1997 Net Rental Position
    const totalTaxDeductions = totalCashOutgoings + depreciationDeduction;
    const netTaxableLoss = annualRentalIncome - totalTaxDeductions;
    const isNegativelyGeared = netTaxableLoss < 0;

    // Negative Gearing Tax Shield
    const taxShield = isNegativelyGeared ? Math.abs(netTaxableLoss) * (marginalTaxRate / 100) : 0;
    const netCashFlowPostTax = netCashFlowPreTax + taxShield;
    const weeklyHoldingCost = netCashFlowPostTax < 0 ? Math.abs(netCashFlowPostTax) / 52 : 0;

    return {
      annualRentalIncome,
      annualMortgageInterest,
      totalCashOutgoings,
      grossYield,
      netYield,
      totalTaxDeductions,
      netTaxableLoss,
      isNegativelyGeared,
      taxShield,
      netCashFlowPreTax,
      netCashFlowPostTax,
      weeklyHoldingCost,
    };
  }, [propertyPrice, weeklyRent, loanAmount, interestRate, annualOutgoings, depreciationDeduction, marginalTaxRate]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian Rental Yield & Negative Gearing Tax Shield Calculator',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian property investment calculator under ITAA 1997 s.8-1. Calculate gross and net rental yield, mortgage interest tax shields, and post-tax cash flows.',
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
        <span className="text-slate-900 font-bold">Negative Gearing &amp; Rental Yield</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Percent className="w-3.5 h-3.5" />
          <span>ITAA 1997 Section 8-1 General Deductions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Rental Yield &amp; Negative Gearing Tax Shield Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Simulate gross and net rental yields, quantify mortgage interest deductions and non-cash depreciation write-offs, and calculate your ATO annual tax refund shield.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Investment Property Data</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              s.8-1 ITAA
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Property Purchase Price ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${propertyPrice.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="100000"
              step="25000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Weekly Rental Income ($ / wk)</span>
              <span className="text-xs text-amber-800 font-mono">${weeklyRent}/wk</span>
            </label>
            <input
              type="number"
              min="0"
              step="10"
              value={weeklyRent}
              onChange={(e) => setWeeklyRent(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Mortgage Loan ($)</label>
              <input
                type="number"
                min="0"
                step="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Interest Rate (%)</label>
              <input
                type="number"
                min="1"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Annual Outgoings (Rates, Strata, Mgt, Ins)</label>
            <input
              type="number"
              min="0"
              step="500"
              value={annualOutgoings}
              onChange={(e) => setAnnualOutgoings(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Non-Cash Depreciation (Div 43 &amp; 40)</label>
            <input
              type="number"
              min="0"
              step="500"
              value={depreciationDeduction}
              onChange={(e) => setDepreciationDeduction(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Investor Marginal Tax Rate (%)</label>
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
                Annual ATO Tax Refund Shield
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                Gross Yield: {results.grossYield.toFixed(2)}% | Net: {results.netYield.toFixed(2)}%
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                +${Math.round(results.taxShield).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD Refund</span>
              </div>
              <p className="text-xs text-slate-400">
                Net Taxable Loss: -${Math.round(Math.abs(results.netTaxableLoss)).toLocaleString()} offset against your personal income
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Post-Tax Weekly Holding Cost</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  ${Math.round(results.weeklyHoldingCost)}/wk
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Annual Mortgage Interest</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  ${Math.round(results.annualMortgageInterest).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Cash Flow vs Tax Write-Off Reconciliation
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Gross Annual Rental Income</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(results.annualRentalIncome).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between text-rose-600">
                <span>Total Cash Expenses (Interest + Outgoings)</span>
                <span className="font-mono font-bold">-${Math.round(results.totalCashOutgoings).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between text-blue-700">
                <span>Non-Cash Depreciation Deduction (Div 43/40)</span>
                <span className="font-mono font-bold">-${Math.round(depreciationDeduction).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between text-emerald-700">
                <span>ATO Tax Shield Refund at {marginalTaxRate}% Rate</span>
                <span className="font-mono font-bold">+${Math.round(results.taxShield).toLocaleString()}</span>
              </div>
              <div className="py-3 flex justify-between font-black text-sm text-slate-950 border-t-2 border-slate-200">
                <span>Final Post-Tax Cash Position</span>
                <span className="font-mono text-slate-900">${Math.round(results.netCashFlowPostTax).toLocaleString()} AUD/yr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Section 8-1 Income Tax Assessment Act 1997 Framework
          </h2>
          <p>
            Under Australian tax law, negative gearing occurs when the deductible costs of owning an income-producing asset—such as mortgage interest, maintenance, property management, and depreciation—exceed the income generated by the asset. Section 8-1 of the ITAA 1997 permits this net loss to be offset against all other taxable income, including PAYG employment salary.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Cash vs Non-Cash Deductions
          </h2>
          <p>
            The profound financial advantage of Australian property investment lies in non-cash deductions. While interest and rates require actual cash outflow, building capital works write-offs under Division 43 (2.5% per annum) produce tax deductible losses without any physical bank transfer, dramatically increasing the investor&apos;s annual tax refund.
          </p>
        </section>
      </article>
    </div>
  );
}

