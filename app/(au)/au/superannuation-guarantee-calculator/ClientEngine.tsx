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
  AlertTriangle,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function SuperannuationGuaranteeCalculatorPage() {
  const [ordinaryEarnings, setOrdinaryEarnings] = React.useState<number>(95000);
  const [calculationPeriod, setCalculationPeriod] = React.useState<'annual' | 'quarterly'>('annual');
  const [salarySacrifice, setSalarySacrifice] = React.useState<number>(5000);
  const [currentSuperBalance, setCurrentSuperBalance] = React.useState<number>(140000);

  // Statutory Rates FY 2025/26 and 2026/27
  const SG_RATE = 0.12; // 12.0% terminal legislated rate
  const QUARTERLY_MAX_BASE = 65070; // Maximum Super Contribution Base per quarter
  const ANNUAL_MAX_BASE = QUARTERLY_MAX_BASE * 4; // $260,280
  const CONCESSIONAL_CAP = 30000; // Annual concessional contribution limit

  const results = React.useMemo(() => {
    const annualEarnings = calculationPeriod === 'quarterly' ? ordinaryEarnings * 4 : ordinaryEarnings;
    const quarterlyEarnings = annualEarnings / 4;

    // Capping at Maximum Super Contribution Base
    const cappedQuarterlyEarnings = Math.min(quarterlyEarnings, QUARTERLY_MAX_BASE);
    const quarterlySG = cappedQuarterlyEarnings * SG_RATE;
    const annualMandatorySG = quarterlySG * 4;

    const totalConcessional = annualMandatorySG + salarySacrifice;
    const capRemaining = Math.max(0, CONCESSIONAL_CAP - totalConcessional);
    const isOverCap = totalConcessional > CONCESSIONAL_CAP;
    const excessConcessional = Math.max(0, totalConcessional - CONCESSIONAL_CAP);

    // SGC Penalty Estimation if employer missed statutory payment deadline (28 days after quarter end)
    // SGC includes total salary including overtime + 10% interest + $20 admin fee
    const nominalInterest = (quarterlySG * 0.10) * (60 / 365); // approx 60 days late
    const sgcQuarterlyLiability = quarterlySG + nominalInterest + 20;

    return {
      annualEarnings,
      quarterlyEarnings,
      quarterlySG,
      annualMandatorySG,
      monthlySG: annualMandatorySG / 12,
      totalConcessional,
      capRemaining,
      isOverCap,
      excessConcessional,
      isCappedAtMaxBase: annualEarnings > ANNUAL_MAX_BASE,
      sgcQuarterlyLiability,
    };
  }, [ordinaryEarnings, calculationPeriod, salarySacrifice]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Superannuation Guarantee (12%) & Concessional Cap Calculator 2026/27',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian employer Superannuation Guarantee (SG) calculator calibrated to the 12.0% statutory rate, maximum contribution base, and $30,000 concessional cap.',
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
        <span className="text-slate-900 font-bold">Superannuation Guarantee 12%</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Calculator className="w-3.5 h-3.5" />
          <span>Superannuation Guarantee (Administration) Act 1992</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Superannuation Guarantee (12.0%) &amp; Concessional Cap Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Statutory superannuation tool compliant with the legislated 12.0% SG rate, Ordinary Time Earnings (OTE) rules, quarterly maximum contribution base ($65,070/quarter), and the $30,000 annual concessional contributions cap.
        </p>
      </div>

      {/* Tool Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900">Earnings &amp; Contributions</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Rate: 12.0%
            </span>
          </div>

          {/* Period Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Salary Calculation Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCalculationPeriod('annual')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  calculationPeriod === 'annual'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Annual Salary
              </button>
              <button
                type="button"
                onClick={() => setCalculationPeriod('quarterly')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  calculationPeriod === 'quarterly'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Quarterly Earnings
              </button>
            </div>
          </div>

          {/* Ordinary Time Earnings Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{calculationPeriod === 'annual' ? 'Annual OTE Base ($ AUD)' : 'Quarterly OTE Base ($ AUD)'}</span>
              <span className="text-xs text-amber-800 font-mono">${ordinaryEarnings.toLocaleString()}</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={ordinaryEarnings}
                onChange={(e) => setOrdinaryEarnings(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-slate-900 font-bold text-base"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Ordinary Time Earnings include basic salary, shift loadings, and commissions. Overtime hours are excluded.
            </p>
          </div>

          {/* Salary Sacrifice Pre-Tax Voluntary */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Annual Salary Sacrifice (Pre-Tax Super)</span>
              <span className="text-xs text-amber-800 font-mono">${salarySacrifice.toLocaleString()}</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                step="500"
                value={salarySacrifice}
                onChange={(e) => setSalarySacrifice(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-slate-900 font-bold text-base"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Statutory Due Dates:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Super contributions must be cleared into the employee&apos;s super fund by the 28th day following the end of each quarter (28 Oct, 28 Jan, 28 Apr, 28 Jul).
            </p>
          </div>
        </div>

        {/* Calculation Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Contribution Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Mandatory Employer Super (12.0%)
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                Per Quarter: ${Math.round(results.quarterlySG).toLocaleString()}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.annualMandatorySG).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">/year</span>
              </div>
              <p className="text-xs text-slate-400">
                Monthly Equivalent: ${Math.round(results.monthlySG).toLocaleString()} AUD
              </p>
            </div>

            {results.isCappedAtMaxBase && (
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  Earnings exceed the Maximum Super Contribution Base ($65,070/qtr). Statutory SG is capped at $7,808.40/quarter.
                </span>
              </div>
            )}
          </div>

          {/* Concessional Cap Analysis Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
                Concessional Contributions Cap ($30,000 Limit)
              </h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                results.isOverCap ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {results.isOverCap ? 'Over Cap' : 'Within Cap'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Total Concessional (SG + Salary Sacrifice):</span>
                <span className="font-mono text-slate-900">${Math.round(results.totalConcessional).toLocaleString()} / $30,000</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    results.isOverCap ? 'bg-rose-500' : 'bg-amber-600'
                  }`}
                  style={{ width: `${Math.min(100, (results.totalConcessional / CONCESSIONAL_CAP) * 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Cap Headroom Remaining</div>
                <div className="text-base font-black text-emerald-700 mt-0.5">
                  ${Math.round(results.capRemaining).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Excess Over Cap</div>
                <div className={`text-base font-black mt-0.5 ${results.isOverCap ? 'text-rose-600' : 'text-slate-400'}`}>
                  ${Math.round(results.excessConcessional).toLocaleString()}
                </div>
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
            Superannuation Guarantee (Administration) Act 1992 Legal Framework
          </h2>
          <p>
            The Superannuation Guarantee (Administration) Act 1992 mandates that all Australian employers make regular superannuation contributions on behalf of eligible employees into a complying superannuation fund or retirement savings account. As of 1 July 2025, the statutory rate finalized its legislative trajectory to 12.0% of the employee&apos;s Ordinary Time Earnings (OTE).
          </p>
          <p>
            OTE includes ordinary hours worked, commission, allowances, shift loadings, and paid leave (annual, personal/carer&apos;s leave, and long service leave). Overtime hours worked beyond standard award or contractual hours are strictly excluded from the SG calculation base.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Maximum Super Contribution Base (MCB)
          </h2>
          <p>
            Under section 19(4) of the Act, an employer is not statutorily required to provide super guarantee support for that part of an employee&apos;s earnings above the Maximum Contribution Base (MCB). For the 2025/26 and 2026/27 financial years, this threshold is indexed to $65,070 per quarter ($260,280 per annum). Any earnings in excess of this quarterly ceiling do not attract mandatory 12% superannuation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Concessional Contributions Cap &amp; Division 293 Tax
          </h2>
          <p>
            Concessional contributions—which include employer mandatory SG, salary sacrifice contributions, and personal deductible contributions—are taxed at the concessionary rate of 15% inside the super fund. The annual general concessional cap is $30,000. Contributions exceeding $30,000 are added back to the taxpayer&apos;s personal assessable income and taxed at marginal income tax rates, less a 15% tax offset. Furthermore, individuals whose combined income and concessional contributions exceed $250,000 are subject to an additional 15% Division 293 tax on the excess amount.
          </p>
        </section>
      </article>
    </div>
  );
}

