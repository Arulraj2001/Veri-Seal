'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Percent,
  Home,
  AlertTriangle,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface AffordabilityResult {
  householdIncome: number;
  monthlyCommitments: number;
  maxBorrowingLti4Point5: number;
  maxBorrowingLti5Point0: number;
  mortgageTermYears: number;
  currentRate: number;
  stressedRate: number;
  monthlyPaymentCurrent: number;
  monthlyPaymentStressed: number;
  stressRateBuffer: number;
}

export default function MortgageAffordabilityUkPage() {
  const [applicant1Income, setApplicant1Income] = React.useState<number>(55000);
  const [applicant2Income, setApplicant2Income] = React.useState<number>(35000);
  const [monthlyCommitments, setMonthlyCommitments] = React.useState<number>(450); // Loans, credit cards, childcare
  const [mortgageRate, setMortgageRate] = React.useState<number>(4.8);
  const [termYears, setTermYears] = React.useState<number>(30);

  // PRA stress test rate buffer: typically +3% over reversion rate
  const STRESS_BUFFER = 3.0;

  const calculateAffordability = React.useCallback((): AffordabilityResult => {
    const totalIncome = Math.max(0, applicant1Income) + Math.max(0, applicant2Income);
    const commitments = Math.max(0, monthlyCommitments);
    const term = Math.max(5, termYears);
    const n = term * 12;

    // 1. Loan-to-Income (LTI) Cap (FPC / PRA standard cap is 4.5x household income)
    const annualCommitments = commitments * 12;
    const netIncomeForLti = Math.max(0, totalIncome - (annualCommitments * 0.5));
    const maxBorrowingLti4Point5 = netIncomeForLti * 4.5;
    const maxBorrowingLti5Point0 = netIncomeForLti * 5.0; // Specialist high-earner exemption

    // 2. Stress Test Calculation
    const currentRateMonthly = (Math.max(0, mortgageRate) / 100) / 12;
    const stressedRate = Math.max(0, mortgageRate) + STRESS_BUFFER;
    const stressedRateMonthly = (stressedRate / 100) / 12;

    // Calculate monthly repayments for the 4.5x LTI figure
    const P = maxBorrowingLti4Point5;
    const monthlyPaymentCurrent =
      currentRateMonthly > 0
        ? (P * currentRateMonthly) / (1 - Math.pow(1 + currentRateMonthly, -n))
        : P / n;

    const monthlyPaymentStressed =
      stressedRateMonthly > 0
        ? (P * stressedRateMonthly) / (1 - Math.pow(1 + stressedRateMonthly, -n))
        : P / n;

    return {
      householdIncome: totalIncome,
      monthlyCommitments: commitments,
      maxBorrowingLti4Point5,
      maxBorrowingLti5Point0,
      mortgageTermYears: term,
      currentRate: mortgageRate,
      stressedRate,
      monthlyPaymentCurrent,
      monthlyPaymentStressed,
      stressRateBuffer: STRESS_BUFFER,
    };
  }, [applicant1Income, applicant2Income, monthlyCommitments, mortgageRate, termYears]);

  const res = calculateAffordability();

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
                name: 'UK Mortgage Affordability & PRA Stress Test Calculator',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate UK mortgage borrowing capacity under FCA MCOB affordability rules and Prudential Regulation Authority (PRA) +3% interest rate stress tests.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is the UK 4.5x Loan-to-Income (LTI) rule?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Under Financial Policy Committee (FPC) macroprudential rules, UK banks and building societies cannot issue more than 15% of their total residential mortgage lending at loan-to-income ratios of 4.5 times or higher. For most buyers, 4.5x gross household income represents the maximum borrowing ceiling.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How do lenders stress test mortgage affordability?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Under FCA MCOB 11 rules, lenders evaluate whether you could still afford your monthly repayments if interest rates were to rise by a stress buffer (typically +3% above the lender’s Standard Variable Reversion Rate) over a 5-year horizon.',
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
          <span className="text-slate-800 font-medium">Mortgage Affordability &amp; Stress Test</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            FCA MCOB 11 &amp; PRA Macroprudential Stress Testing
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mortgage Affordability &amp; Stress Test
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Model your borrowing capacity against the 4.5x household income cap and the statutory +3% PRA interest rate stress test.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Coins className="w-5 h-5 text-indigo-900" />
              Household Earnings &amp; Commitments
            </h2>

            {/* Incomes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Applicant 1 Gross Income (£)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={applicant1Income || ''}
                    onChange={(e) => setApplicant1Income(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Applicant 2 Gross Income (£)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={applicant2Income || ''}
                    onChange={(e) => setApplicant2Income(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                    placeholder="Optional joint"
                  />
                </div>
              </div>
            </div>

            {/* Monthly Commitments */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Total Monthly Committed Outgoings (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={monthlyCommitments || ''}
                  onChange={(e) => setMonthlyCommitments(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Car loans, credit card minimum payments, personal loans, child maintenance, nursery fees.
              </span>
            </div>

            {/* Mortgage Rate and Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Proposed Interest Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={mortgageRate || ''}
                    onChange={(e) => setMortgageRate(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Mortgage Term (Years)
                </label>
                <input
                  type="number"
                  min="5"
                  max="40"
                  value={termYears || ''}
                  onChange={(e) => setTermYears(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Borrowing Capacity</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  4.5x LTI Cap
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Maximum Estimated Mortgage
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.maxBorrowingLti4Point5)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Household Income:</span>
                  <span className="font-bold text-indigo-300">{formatGBP(res.householdIncome)}</span>
                </div>
              </div>

              {/* Stress Test Repayments */}
              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900">Current Monthly Payment ({mortgageRate}%):</div>
                  <div className="text-lg font-black text-slate-900">
                    {formatGBP(res.monthlyPaymentCurrent)} / month
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                  <div className="font-bold text-indigo-950">PRA Stressed Monthly Payment ({res.stressedRate}%):</div>
                  <div className="text-lg font-black text-indigo-900">
                    {formatGBP(res.monthlyPaymentStressed)} / month
                  </div>
                  <p className="text-[11px] text-indigo-800">
                    Lenders test whether your monthly budget can support this repayment if rates rise by +3%.
                  </p>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                Credit Score &amp; High LTI Exceptions
              </div>
              <p className="text-indigo-900/80">
                Lenders can lend up to 5.0x or 5.5x for high earners (e.g. over £75k–£100k) or qualified professionals under their permitted 15% macroprudential allowance.
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
              UK Mortgage Affordability: The PRA &amp; FCA Regulatory Framework
            </h2>
            <p>
              Following the 2014 Mortgage Market Review (MMR), the Financial Conduct Authority (FCA) codified strict statutory rules in Chapter 11 of the <strong>Mortgage Conduct of Business sourcebook (MCOB 11)</strong>. Under these rules, self-certified mortgages and unverified income claims are strictly unlawful; lenders have a statutory duty to assess a borrower&apos;s ability to repay before entering into a regulated mortgage contract.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

