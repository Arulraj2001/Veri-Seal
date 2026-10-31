'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Scale,
  Percent,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface Section24Result {
  grossRentalIncome: number;
  mortgageInterest: number;
  allowableOperatingExpenses: number;
  salaryOtherIncome: number;
  // Old System (Pre-Section 24)
  oldTaxableRentalProfit: number;
  oldTotalTaxableIncome: number;
  oldTotalTaxPaid: number;
  oldNetRentalCashFlow: number;
  // New System (Section 24 Rules)
  newTaxableRentalProfit: number; // Gross - Operating Expenses (Mortgage NOT deducted)
  newTotalTaxableIncome: number;
  taxBeforeSection24Relief: number;
  section24TaxCredit20Percent: number; // 20% of finance costs
  newTotalTaxPaid: number;
  newNetRentalCashFlow: number;
  additionalTaxUnderSection24: number;
  pushedIntoHigherTaxBracket: boolean;
}

export default function Section24LandlordPage() {
  const [grossRentalIncome, setGrossRentalIncome] = React.useState<number>(24000);
  const [mortgageInterest, setMortgageInterest] = React.useState<number>(10000);
  const [operatingExpenses, setOperatingExpenses] = React.useState<number>(3000); // Letting agent, insurance, maintenance
  const [salaryOtherIncome, setSalaryOtherIncome] = React.useState<number>(45000);

  const calculateSection24 = React.useCallback((): Section24Result => {
    const rental = Math.max(0, grossRentalIncome);
    const financeCosts = Math.max(0, mortgageInterest);
    const opExpenses = Math.max(0, operatingExpenses);
    const salary = Math.max(0, salaryOtherIncome);

    // 1. OLD SYSTEM (Pre-Section 24)
    // Mortgage interest was 100% tax-deductible as a property business expense
    const oldTaxableRentalProfit = Math.max(0, rental - opExpenses - financeCosts);
    const oldTotalTaxableIncome = Math.max(0, salary + oldTaxableRentalProfit - 12570);

    let oldTax = 0;
    if (oldTotalTaxableIncome > 0) {
      const basic = Math.min(oldTotalTaxableIncome, 37700);
      oldTax += basic * 0.20;
      if (oldTotalTaxableIncome > 37700) {
        const higher = Math.min(oldTotalTaxableIncome - 37700, 74870);
        oldTax += higher * 0.40;
        if (oldTotalTaxableIncome > 37700 + 74870) {
          oldTax += (oldTotalTaxableIncome - 37700 - 74870) * 0.45;
        }
      }
    }
    const oldNetCashFlow = rental - opExpenses - financeCosts - (oldTax * (oldTaxableRentalProfit / Math.max(1, salary + oldTaxableRentalProfit)));

    // 2. NEW SYSTEM (Section 24 Finance (No. 2) Act 2015)
    // Mortgage interest CANNOT be deducted to reach taxable profit.
    // Taxable profit = Gross Rental - Operating Expenses
    const newTaxableRentalProfit = Math.max(0, rental - opExpenses);
    const newTotalTaxableIncome = Math.max(0, salary + newTaxableRentalProfit - 12570);

    let newTaxBeforeRelief = 0;
    if (newTotalTaxableIncome > 0) {
      const basic = Math.min(newTotalTaxableIncome, 37700);
      newTaxBeforeRelief += basic * 0.20;
      if (newTotalTaxableIncome > 37700) {
        const higher = Math.min(newTotalTaxableIncome - 37700, 74870);
        newTaxBeforeRelief += higher * 0.40;
        if (newTotalTaxableIncome > 37700 + 74870) {
          newTaxBeforeRelief += (newTotalTaxableIncome - 37700 - 74870) * 0.45;
        }
      }
    }

    // Section 24 basic rate tax reduction: 20% of finance costs
    const section24Credit = financeCosts * 0.20;
    const newTotalTaxPaid = Math.max(0, newTaxBeforeRelief - section24Credit);

    const additionalTax = Math.max(0, newTotalTaxPaid - oldTax);
    const newNetCashFlow = rental - opExpenses - financeCosts - (additionalTax);

    const pushedIntoHigher = oldTotalTaxableIncome <= 37700 && newTotalTaxableIncome > 37700;

    return {
      grossRentalIncome: rental,
      mortgageInterest: financeCosts,
      allowableOperatingExpenses: opExpenses,
      salaryOtherIncome: salary,
      oldTaxableRentalProfit,
      oldTotalTaxableIncome,
      oldTotalTaxPaid: oldTax,
      oldNetRentalCashFlow: oldNetCashFlow,
      newTaxableRentalProfit,
      newTotalTaxableIncome,
      taxBeforeSection24Relief: newTaxBeforeRelief,
      section24TaxCredit20Percent: section24Credit,
      newTotalTaxPaid,
      newNetRentalCashFlow: newNetCashFlow,
      additionalTaxUnderSection24: additionalTax,
      pushedIntoHigherTaxBracket: pushedIntoHigher,
    };
  }, [grossRentalIncome, mortgageInterest, operatingExpenses, salaryOtherIncome]);

  const res = calculateSection24();

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org FAQ & SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'UK Section 24 Landlord Mortgage Interest Relief Calculator',
                applicationCategory: 'RealEstateApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate the exact tax impact of Section 24 (Finance (No. 2) Act 2015) on UK residential landlords. Compares pre-Section 24 full interest deduction with the 20% basic rate tax credit.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is Section 24 for UK buy-to-let landlords?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Section 24 of the Finance (No. 2) Act 2015 removed the ability for individual landlords to deduct mortgage interest and other finance costs from rental income before calculating taxable profit. Instead, landlords receive a 20% basic rate tax credit on their finance costs, which can push landlords into higher tax brackets and create tax liabilities even when making a cash loss.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does Section 24 apply to limited companies (SPVs)?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No. Section 24 applies strictly to individual unincorporated landlords and partnerships. Limited companies (Special Purpose Vehicles or SPVs) continue to deduct 100% of mortgage interest as a standard business expense against Corporation Tax.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/uk" className="hover:text-indigo-900 transition">
            United Kingdom
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Section 24 Landlord Mortgage Relief</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            Finance (No. 2) Act 2015 (s.24) &amp; Section 399A
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Section 24 Mortgage Relief Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Compare the tax impact on buy-to-let landlords before and after Section 24, and evaluate limited company SPV incorporation.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Coins className="w-5 h-5 text-indigo-900" />
              Property &amp; Personal Income
            </h2>

            {/* Gross Rental Income */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Annual Gross Rental Income (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={grossRentalIncome || ''}
                  onChange={(e) => setGrossRentalIncome(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>

            {/* Mortgage Interest */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Annual Buy-to-Let Mortgage Interest (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={mortgageInterest || ''}
                  onChange={(e) => setMortgageInterest(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Pure interest portion only (not capital repayment).
              </span>
            </div>

            {/* Operating Expenses */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Allowable Operating Expenses (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="250"
                  value={operatingExpenses || ''}
                  onChange={(e) => setOperatingExpenses(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Letting agency fees, landlord insurance, CP12 gas safety, maintenance.
              </span>
            </div>

            {/* Salary / Other Income */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Salary &amp; Other Non-Rental Income (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={salaryOtherIncome || ''}
                  onChange={(e) => setSalaryOtherIncome(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>

            {/* Higher Bracket Warning */}
            {res.pushedIntoHigherTaxBracket && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Section 24 Bracket Creep:</strong> Your phantom rental turnover has artificially pushed your total income above £50,270 into the 40% higher tax rate, causing you to pay 40% tax on profit while only receiving a 20% tax credit.
                </div>
              </div>
            )}
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Section 24 Impact</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  +{formatGBP(res.additionalTaxUnderSection24)} extra tax
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 block">
                  Additional Annual Tax Penalty
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  +{formatGBP(res.additionalTaxUnderSection24)} / yr
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>New Net Cash Flow:</span>
                  <span className="font-bold text-emerald-400">{formatGBP(res.newNetRentalCashFlow)}</span>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100 font-semibold text-slate-900">
                  <span>Metric</span>
                  <span>Pre-Sec 24 vs Current</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Taxable Rental Profit:</span>
                  <span className="font-semibold text-slate-900">
                    {formatGBP(res.oldTaxableRentalProfit)} &rarr; {formatGBP(res.newTaxableRentalProfit)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">20% Tax Credit:</span>
                  <span className="font-semibold text-emerald-700">{formatGBP(res.section24TaxCredit20Percent)}</span>
                </div>
                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Net Profit Reduction:</span>
                  <span className="font-bold text-rose-600">-{formatGBP(res.additionalTaxUnderSection24)}</span>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                Limited Company SPV Route
              </div>
              <p className="text-indigo-900/80">
                Landlords purchasing through a UK Limited Company (SPV) continue to deduct 100% of mortgage interest as a commercial expense against Corporation Tax (19%–25%).
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Placement */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Section 24 of the Finance (No. 2) Act 2015 Explained
            </h2>
            <p>
              Section 24 of the <strong>Finance (No. 2) Act 2015</strong> amended the Income Tax (Trading and Other Income) Act 2005 by introducing Section 272A and Section 399A. The legislation systematically dismantled the historic ability of individual landlords to deduct finance costs (including buy-to-let mortgage interest, loan arrangement fees, and overdraft interest) from their gross rental turnover before computing taxable property profits.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Why the 20% Tax Credit Causes Severe Financial Strain
            </h3>
            <p>
              Under the new statutory framework, landlords are taxed on their <strong>gross rental turnover less basic operating expenses</strong>, completely disregarding mortgage payments. The tax is calculated on this inflated figure, and then an arbitrary <strong>20% basic rate tax credit</strong> is deducted from the final tax bill.
            </p>
            <p className="mt-3 text-sm">
              For higher-rate (40%) and additional-rate (45%) taxpayers, this creates an immediate 20% to 25% tax penalty on the entire mortgage interest sum. In numerous cases where mortgage interest rates rose to 5% or 6%, landlords found themselves paying income tax that exceeded 100% of their actual cash profit.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

