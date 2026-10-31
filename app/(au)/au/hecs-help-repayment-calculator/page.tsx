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
  GraduationCap,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function HecsHelpCalculatorPage() {
  const [currentDebt, setCurrentDebt] = React.useState<number>(32000);
  const [taxableSalary, setTaxableSalary] = React.useState<number>(85000);
  const [netRentalLoss, setNetRentalLoss] = React.useState<number>(0); // Negative gearing add-back
  const [reportableSuper, setReportableSuper] = React.useState<number>(0);
  const [estimatedIndexation, setEstimatedIndexation] = React.useState<number>(3.2); // WPI/CPI capped indexation

  const results = React.useMemo(() => {
    // Repayment Income (RI) under HESA 2003
    const repaymentIncome = taxableSalary + netRentalLoss + reportableSuper;

    // Statutory tiered rates
    let repaymentRate = 0;
    if (repaymentIncome >= 159664) repaymentRate = 0.10;
    else if (repaymentIncome >= 150626) repaymentRate = 0.095;
    else if (repaymentIncome >= 142100) repaymentRate = 0.09;
    else if (repaymentIncome >= 134057) repaymentRate = 0.085;
    else if (repaymentIncome >= 126469) repaymentRate = 0.08;
    else if (repaymentIncome >= 119310) repaymentRate = 0.075;
    else if (repaymentIncome >= 112557) repaymentRate = 0.07;
    else if (repaymentIncome >= 106186) repaymentRate = 0.065;
    else if (repaymentIncome >= 100175) repaymentRate = 0.06;
    else if (repaymentIncome >= 94505) repaymentRate = 0.055;
    else if (repaymentIncome >= 89156) repaymentRate = 0.05;
    else if (repaymentIncome >= 84109) repaymentRate = 0.045;
    else if (repaymentIncome >= 79348) repaymentRate = 0.04;
    else if (repaymentIncome >= 74857) repaymentRate = 0.035;
    else if (repaymentIncome >= 70620) repaymentRate = 0.03;
    else if (repaymentIncome >= 66623) repaymentRate = 0.025;
    else if (repaymentIncome >= 62852) repaymentRate = 0.02;
    else if (repaymentIncome >= 54435) repaymentRate = 0.01;

    const annualCompulsoryRepayment = Math.min(currentDebt, repaymentIncome * repaymentRate);
    const indexationCost = currentDebt * (estimatedIndexation / 100);
    const netDebtAfterYear = Math.max(0, currentDebt + indexationCost - annualCompulsoryRepayment);

    // Payoff time estimate (assuming steady repayment)
    const netAnnualPrincipalReduction = annualCompulsoryRepayment - indexationCost;
    const estimatedYearsToPayoff = netAnnualPrincipalReduction > 0
      ? Math.ceil(currentDebt / netAnnualPrincipalReduction)
      : 99; // Never if indexation outpaces repayment

    return {
      repaymentIncome,
      repaymentRate,
      repaymentRatePct: repaymentRate * 100,
      annualCompulsoryRepayment,
      monthlyRepayment: annualCompulsoryRepayment / 12,
      fortnightlyRepayment: annualCompulsoryRepayment / 26,
      indexationCost,
      netDebtAfterYear,
      estimatedYearsToPayoff,
      willClearDebt: netAnnualPrincipalReduction > 0,
    };
  }, [currentDebt, taxableSalary, netRentalLoss, reportableSuper, estimatedIndexation]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian HECS / HELP Compulsory Repayment Calculator 2026/27',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian HECS-HELP compulsory loan repayment calculator calibrated to Higher Education Support Act 2003 statutory thresholds, WPI/CPI indexation caps, and repayment income rules.',
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
        <span className="text-slate-900 font-bold">HECS / HELP Repayment Tool</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Higher Education Support Act 2003 (HESA)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          HECS / HELP Compulsory Repayment &amp; Indexation Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Determine compulsory HECS-HELP debt withholding under statutory Repayment Income (RI) thresholds ($54,435+), assess indexation capped at the lower of CPI or WPI, and forecast debt amortization.
        </p>
      </div>

      {/* Tool Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Debt &amp; Repayment Income</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              HESA 2003
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Current Outstanding HECS Debt ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${currentDebt.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={currentDebt}
              onChange={(e) => setCurrentDebt(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Annual Taxable Salary ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${taxableSalary.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={taxableSalary}
              onChange={(e) => setTaxableSalary(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Net Investment / Rental Loss (Add-Back)</label>
            <input
              type="number"
              min="0"
              step="500"
              value={netRentalLoss}
              onChange={(e) => setNetRentalLoss(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
            />
            <p className="text-[11px] text-slate-500">
              Negative gearing rental losses are added back to compute Repayment Income (RI).
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Annual Indexation Rate (% Lower of CPI/WPI)</span>
              <span className="text-xs text-amber-800 font-mono">{estimatedIndexation}%</span>
            </label>
            <input
              type="range"
              min="1.5"
              max="6.0"
              step="0.1"
              value={estimatedIndexation}
              onChange={(e) => setEstimatedIndexation(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>
        </div>

        {/* Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Compulsory Annual Repayment
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                Rate: {results.repaymentRatePct.toFixed(1)}% of RI
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.annualCompulsoryRepayment).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">/year</span>
              </div>
              <p className="text-xs text-slate-400">
                Statutory Repayment Income: ${Math.round(results.repaymentIncome).toLocaleString()} AUD
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Monthly Pay Deduction</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  ${Math.round(results.monthlyRepayment).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Fortnightly Deduction</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  ${Math.round(results.fortnightlyRepayment).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Estimated Payoff</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                  {results.willClearDebt ? `${results.estimatedYearsToPayoff} yrs` : 'Growing'}
                </div>
              </div>
            </div>
          </div>

          {/* Indexation vs Repayment Breakdown */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Annual Loan Dynamics (Indexation vs Withholding)
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Starting HECS/HELP Loan Balance</span>
                <span className="font-mono font-bold text-slate-900">${currentDebt.toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between text-rose-600">
                <span>Annual Indexation Charge (+{estimatedIndexation}%)</span>
                <span className="font-mono font-bold">+${Math.round(results.indexationCost).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between text-emerald-700">
                <span>Less: Compulsory Repayment Withheld</span>
                <span className="font-mono font-bold">-${Math.round(results.annualCompulsoryRepayment).toLocaleString()}</span>
              </div>
              <div className="py-3 flex justify-between font-black text-sm text-slate-950 border-t-2 border-slate-200">
                <span>Projected Year-End Balance</span>
                <span className="font-mono text-amber-800">${Math.round(results.netDebtAfterYear).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Copy */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Higher Education Support Act 2003 Repayment Mechanics
          </h2>
          <p>
            HECS-HELP debts do not accrue standard commercial interest; instead, they are subject to statutory indexation on 1 June each year under Section 140-10 of the Higher Education Support Act 2003. Following legislative reforms recommended in the Australian Universities Accord, indexation is permanently capped at whichever is lower between the Consumer Price Index (CPI) and the Wage Price Index (WPI), shielding graduates from inflation spikes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Repayment Income (RI) Definition
          </h2>
          <p>
            Your HECS repayment obligation is evaluated on your statutory Repayment Income (RI), which is broader than your base taxable wage. Under Section 154-5, RI equals:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Taxable income</li>
            <li>Total net investment loss (including negative gearing property write-offs)</li>
            <li>Reportable fringe benefits amounts</li>
            <li>Reportable employer superannuation contributions (voluntary salary sacrifice)</li>
            <li>Exempt foreign employment income</li>
          </ul>
        </section>
      </article>
    </div>
  );
}

