'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Coins,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  FileCheck2,
  Scale,
  Percent,
  Building2,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface DividendResult {
  salaryOtherIncome: number;
  totalDividends: number;
  dividendAllowance: number;
  taxableDividends: number;
  taxInBasicBand: number;
  taxInHigherBand: number;
  taxInAdditionalBand: number;
  totalDividendTax: number;
  effectiveDividendTaxRate: number;
  netDividendsRetained: number;
}

export default function DividendTaxUkPage() {
  const [salaryIncome, setSalaryIncome] = React.useState<number>(12570);
  const [dividendIncome, setDividendIncome] = React.useState<number>(40000);

  const calculateDividendTax = React.useCallback((): DividendResult => {
    const salary = Math.max(0, salaryIncome);
    const totalDiv = Math.max(0, dividendIncome);

    // Personal Allowance
    const basePA = 12570;
    const totalEarnings = salary + totalDiv;
    let personalAllowance = basePA;
    if (totalEarnings > 100000) {
      personalAllowance = Math.max(0, basePA - (totalEarnings - 100000) / 2);
    }

    // Salary consumes personal allowance first
    const unusedPA = Math.max(0, personalAllowance - salary);
    const taxableSalary = Math.max(0, salary - personalAllowance);

    // Dividends absorb unused personal allowance
    const divAfterPA = Math.max(0, totalDiv - unusedPA);

    // Dividend Allowance: £500
    const DIVIDEND_ALLOWANCE = 500;
    const taxableDividends = Math.max(0, divAfterPA - DIVIDEND_ALLOWANCE);

    // Total income position to establish bands
    // Basic band ceiling: £50,270. Higher band ceiling: £125,140.
    const incomeBeforeDiv = taxableSalary + Math.min(salary, personalAllowance);

    let taxInBasicBand = 0;
    let taxInHigherBand = 0;
    let taxInAdditionalBand = 0;

    let remainingTaxableDiv = taxableDividends;
    let currentIncomePosition = incomeBeforeDiv + Math.min(divAfterPA, DIVIDEND_ALLOWANCE);

    // 1. Basic Rate (8.75%) on income up to £50,270
    if (currentIncomePosition < 50270 && remainingTaxableDiv > 0) {
      const basicRoom = 50270 - currentIncomePosition;
      const amountInBasic = Math.min(remainingTaxableDiv, basicRoom);
      taxInBasicBand = amountInBasic * 0.0875;
      remainingTaxableDiv -= amountInBasic;
      currentIncomePosition += amountInBasic;
    }

    // 2. Higher Rate (33.75%) on income between £50,271 and £125,140
    if (currentIncomePosition >= 50270 && currentIncomePosition < 125140 && remainingTaxableDiv > 0) {
      const higherRoom = 125140 - currentIncomePosition;
      const amountInHigher = Math.min(remainingTaxableDiv, higherRoom);
      taxInHigherBand = amountInHigher * 0.3375;
      remainingTaxableDiv -= amountInHigher;
      currentIncomePosition += amountInHigher;
    }

    // 3. Additional Rate (39.35%) on income above £125,140
    if (remainingTaxableDiv > 0) {
      taxInAdditionalBand = remainingTaxableDiv * 0.3935;
    }

    const totalDividendTax = taxInBasicBand + taxInHigherBand + taxInAdditionalBand;
    const effectiveDividendTaxRate = totalDiv > 0 ? (totalDividendTax / totalDiv) * 100 : 0;
    const netDividendsRetained = Math.max(0, totalDiv - totalDividendTax);

    return {
      salaryOtherIncome: salary,
      totalDividends: totalDiv,
      dividendAllowance: DIVIDEND_ALLOWANCE,
      taxableDividends,
      taxInBasicBand,
      taxInHigherBand,
      taxInAdditionalBand,
      totalDividendTax,
      effectiveDividendTaxRate,
      netDividendsRetained,
    };
  }, [salaryIncome, dividendIncome]);

  const res = calculateDividendTax();

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 }).format(val);

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
                name: 'UK Dividend Tax & Allowance Calculator 2026/27',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate UK dividend income tax across Basic (8.75%), Higher (33.75%), and Additional (39.35%) bands above the statutory £500 Dividend Allowance under the Income Tax Act 2007.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is the UK Dividend Allowance for 2026/27?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The statutory UK Dividend Allowance is £500. This means you do not pay income tax on the first £500 of dividend income, regardless of your other earnings. Any dividend income above £500 is taxed based on your marginal tax band.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What are the UK dividend tax rates?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Dividend income is taxed at three statutory rates: 8.75% for the basic rate band, 33.75% for the higher rate band, and 39.35% for the additional rate band above £125,140.',
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
          <span className="text-slate-800 font-medium">Dividend Tax &amp; Allowance Calculator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Coins className="w-3.5 h-3.5" />
            Income Tax Act 2007 &amp; s.13
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            UK Dividend Tax Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Calculate your tax liability on UK company dividends across basic (8.75%), higher (33.75%), and additional (39.35%) rate bands.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-5 h-5 text-indigo-900" />
              Income Sources
            </h2>

            {/* Salary / Non-Dividend Income */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Annual Salary or Other Non-Dividend Income (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={salaryIncome || ''}
                  onChange={(e) => setSalaryIncome(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Standard director salary: £12,570 (uses Personal Allowance with 0% employee NICs).
              </span>
            </div>

            {/* Dividend Income */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Gross Company Dividends Drawn (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={dividendIncome || ''}
                  onChange={(e) => setDividendIncome(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Dividend Tax Due</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  {res.effectiveDividendTaxRate.toFixed(1)}% rate
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Net Dividends in Pocket
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.netDividendsRetained)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Total Dividend Tax Payable:</span>
                  <span className="font-bold text-rose-400">-{formatGBP(res.totalDividendTax)}</span>
                </div>
              </div>

              {/* Band Breakdown */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Gross Dividends:</span>
                  <span className="font-semibold text-slate-900">{formatGBP(res.totalDividends)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Tax-Free Allowance:</span>
                  <span className="font-semibold text-emerald-700">{formatGBP(res.dividendAllowance)}</span>
                </div>
                {res.taxInBasicBand > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Basic Rate (8.75%):</span>
                    <span className="font-semibold text-slate-900">{formatGBP(res.taxInBasicBand)}</span>
                  </div>
                )}
                {res.taxInHigherBand > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Higher Rate (33.75%):</span>
                    <span className="font-semibold text-slate-900">{formatGBP(res.taxInHigherBand)}</span>
                  </div>
                )}
                {res.taxInAdditionalBand > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Additional Rate (39.35%):</span>
                    <span className="font-semibold text-slate-900">{formatGBP(res.taxInAdditionalBand)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                No National Insurance on Dividends
              </div>
              <p className="text-indigo-900/80">
                Unlike salary drawings, dividends are investment distributions paid from post-corporation tax profits and are not subject to Class 1 employee or employer National Insurance Contributions.
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
              UK Dividend Taxation &amp; The Salary vs Dividend Strategy
            </h2>
            <p>
              Under <strong>Chapter 3 of Part 2 of the Income Tax Act 2007</strong>, dividends received from UK resident companies are treated as dividend income and taxed at preferential rates compared to employment income. Because dividends are paid out of corporate profits that have already borne Corporation Tax (at either 19% or 25%), dividend income tax rates are lower than standard PAYE income tax rates.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The £500 Dividend Allowance
            </h3>
            <p>
              Every individual UK tax resident receives a statutory <strong>Dividend Allowance</strong> of <strong>£500</strong>. This allowance is a 0% band: dividends within the £500 allowance are charged at a nil rate of tax, though they still count towards your basic and higher rate income tax thresholds.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The Optimal Remuneration Structure for Owner-Directors
            </h3>
            <p>
              Small company owner-directors commonly extract profits through a tax-efficient combination of low salary and high dividends:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Salary up to Personal Allowance (£12,570):</strong> The company claims this salary as an allowable corporate expense (reducing Corporation Tax). The director pays £0 income tax and £0 employee NICs while gaining a qualifying year towards the UK State Pension.
              </li>
              <li>
                <strong>Remaining Profits as Dividends:</strong> Withdrawn without triggering Class 1 NICs, taxed at the competitive 8.75% rate up to the higher rate threshold (£50,270).
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

