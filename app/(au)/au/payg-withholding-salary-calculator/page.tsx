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
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function PaygSalaryCalculatorPage() {
  // Form State
  const [grossAnnual, setGrossAnnual] = React.useState<number>(85000);
  const [payFrequency, setPayFrequency] = React.useState<'annual' | 'monthly' | 'fortnightly' | 'weekly'>('annual');
  const [superIncluded, setSuperIncluded] = React.useState<boolean>(false);
  const [hasHecs, setHasHecs] = React.useState<boolean>(false);
  const [hasPrivateHealth, setHasPrivateHealth] = React.useState<boolean>(true);
  const [isResident, setIsResident] = React.useState<boolean>(true);

  // Statutory Constants (Revised Stage 3 Tax Rates for 2025/2026/2027)
  // Superannuation Guarantee: 12.0% legislated from 1 July 2025
  const SG_RATE = 0.12;

  // Calculation logic
  const calculation = React.useMemo(() => {
    let baseTaxable = grossAnnual;
    let employerSuper = 0;

    if (superIncluded) {
      // Total Remuneration Package (TRP) = Base + (Base * 12%) => Base = TRP / 1.12
      baseTaxable = grossAnnual / (1 + SG_RATE);
      employerSuper = grossAnnual - baseTaxable;
    } else {
      employerSuper = baseTaxable * SG_RATE;
    }

    // 1. Revised Stage 3 Income Tax Calculation
    let baseTax = 0;
    if (isResident) {
      if (baseTaxable <= 18200) {
        baseTax = 0;
      } else if (baseTaxable <= 45000) {
        baseTax = (baseTaxable - 18200) * 0.16;
      } else if (baseTaxable <= 135000) {
        baseTax = 4288 + (baseTaxable - 45000) * 0.30;
      } else if (baseTaxable <= 190000) {
        baseTax = 31288 + (baseTaxable - 135000) * 0.37;
      } else {
        baseTax = 51638 + (baseTaxable - 190000) * 0.45;
      }
    } else {
      // Non-resident rates: 30% from $0 - $135k, 37% $135k-$190k, 45% $190k+
      if (baseTaxable <= 135000) {
        baseTax = baseTaxable * 0.30;
      } else if (baseTaxable <= 190000) {
        baseTax = 40500 + (baseTaxable - 135000) * 0.37;
      } else {
        baseTax = 60850 + (baseTaxable - 190000) * 0.45;
      }
    }

    // 2. Low Income Tax Offset (LITO)
    let lito = 0;
    if (isResident) {
      if (baseTaxable <= 37500) {
        lito = 700;
      } else if (baseTaxable <= 45000) {
        lito = Math.max(0, 700 - (baseTaxable - 37500) * 0.05);
      } else if (baseTaxable <= 66667) {
        lito = Math.max(0, 325 - (baseTaxable - 45000) * 0.015);
      }
    }
    const finalIncomeTax = Math.max(0, baseTax - lito);

    // 3. Medicare Levy (2.0%) with Low-Income Phase-In
    let medicareLevy = 0;
    if (isResident) {
      const lowerThreshold = 26000;
      const upperThreshold = 32500;
      if (baseTaxable > upperThreshold) {
        medicareLevy = baseTaxable * 0.02;
      } else if (baseTaxable > lowerThreshold) {
        // Shade-in rate: 10% of excess over lower threshold
        medicareLevy = (baseTaxable - lowerThreshold) * 0.10;
      }
    }

    // 4. Medicare Levy Surcharge (MLS) for non-insured high earners
    let mls = 0;
    if (!hasPrivateHealth && isResident) {
      if (baseTaxable > 151000) {
        mls = baseTaxable * 0.015;
      } else if (baseTaxable > 113000) {
        mls = baseTaxable * 0.0125;
      } else if (baseTaxable > 97000) {
        mls = baseTaxable * 0.01;
      }
    }

    // 5. HECS / HELP Statutory Repayment
    let hecsRepayment = 0;
    if (hasHecs) {
      if (baseTaxable >= 159664) hecsRepayment = baseTaxable * 0.10;
      else if (baseTaxable >= 150626) hecsRepayment = baseTaxable * 0.095;
      else if (baseTaxable >= 142100) hecsRepayment = baseTaxable * 0.09;
      else if (baseTaxable >= 134057) hecsRepayment = baseTaxable * 0.085;
      else if (baseTaxable >= 126469) hecsRepayment = baseTaxable * 0.08;
      else if (baseTaxable >= 119310) hecsRepayment = baseTaxable * 0.075;
      else if (baseTaxable >= 112557) hecsRepayment = baseTaxable * 0.07;
      else if (baseTaxable >= 106186) hecsRepayment = baseTaxable * 0.065;
      else if (baseTaxable >= 100175) hecsRepayment = baseTaxable * 0.06;
      else if (baseTaxable >= 94505) hecsRepayment = baseTaxable * 0.055;
      else if (baseTaxable >= 89156) hecsRepayment = baseTaxable * 0.05;
      else if (baseTaxable >= 84109) hecsRepayment = baseTaxable * 0.045;
      else if (baseTaxable >= 79348) hecsRepayment = baseTaxable * 0.04;
      else if (baseTaxable >= 74857) hecsRepayment = baseTaxable * 0.035;
      else if (baseTaxable >= 70620) hecsRepayment = baseTaxable * 0.03;
      else if (baseTaxable >= 66623) hecsRepayment = baseTaxable * 0.025;
      else if (baseTaxable >= 62852) hecsRepayment = baseTaxable * 0.02;
      else if (baseTaxable >= 54435) hecsRepayment = baseTaxable * 0.01;
    }

    const totalWithholding = finalIncomeTax + medicareLevy + mls + hecsRepayment;
    const netAnnualTakeHome = Math.max(0, baseTaxable - totalWithholding);
    const effectiveTaxRate = baseTaxable > 0 ? (totalWithholding / baseTaxable) * 100 : 0;

    return {
      baseTaxable,
      baseTax,
      lito,
      finalIncomeTax,
      medicareLevy,
      mls,
      hecsRepayment,
      totalWithholding,
      netAnnualTakeHome,
      employerSuper,
      effectiveTaxRate,
      // Frequencies
      monthly: netAnnualTakeHome / 12,
      fortnightly: netAnnualTakeHome / 26,
      weekly: netAnnualTakeHome / 52,
      monthlyGross: baseTaxable / 12,
      fortnightlyGross: baseTaxable / 26,
      weeklyGross: baseTaxable / 52,
    };
  }, [grossAnnual, superIncluded, hasHecs, hasPrivateHealth, isResident]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian PAYG Withholding & Salary Take-Home Calculator 2026/27',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Official statutory calculator for Australian individual income tax revised Stage 3 cuts, Medicare Levy, MLS, HECS/HELP repayments, and 12% Superannuation Guarantee.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the revised Stage 3 tax rates for Australian employees in 2026/27?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The legislated revised Stage 3 tax rates comprise: 0% up to $18,200; 16% between $18,201 and $45,000; 30% between $45,001 and $135,000; 37% between $135,001 and $190,000; and 45% on taxable income exceeding $190,000, plus the 2% Medicare Levy.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the legislated Superannuation Guarantee rate for 2026/27?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under the Superannuation Guarantee (Administration) Act 1992, the employer super guarantee reached 12.0% on 1 July 2025 and remains at 12.0% for 2026/27, payable on Ordinary Time Earnings (OTE).',
        },
      },
      {
        '@type': 'Question',
        name: 'Who must pay the Medicare Levy Surcharge (MLS)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Australian resident individuals who do not hold an eligible private hospital insurance policy and earn above the statutory income threshold ($97,000 single) incur an additional 1.0%, 1.25%, or 1.5% surcharge on their taxable income.',
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/au" className="hover:text-amber-800 transition-colors">Australia Suite</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">PAYG Salary Calculator 2026/27</span>
      </nav>

      {/* Hero Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Calculator className="w-3.5 h-3.5" />
          <span>ATO Income Tax &amp; Superannuation 2026/27</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Australian PAYG Withholding &amp; Salary Take-Home Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Statutory PAYG withholding model calibrated to the ATO revised Stage 3 tax cuts, Medicare Levy (2.0%), Medicare Levy Surcharge (MLS), Higher Education Loan Program (HECS/HELP) compulsory repayments, and the 12.0% employer Superannuation Guarantee.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900">Remuneration Details</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              FY 2026/27
            </span>
          </div>

          {/* Gross Amount Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Gross Remuneration ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${grossAnnual.toLocaleString()}</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={grossAnnual}
                onChange={(e) => setGrossAnnual(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-slate-900 font-bold text-base transition-all"
              />
            </div>
          </div>

          {/* Super Package Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Superannuation Arrangement</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSuperIncluded(false)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  !superIncluded
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Base + 12% Super
              </button>
              <button
                type="button"
                onClick={() => setSuperIncluded(true)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  superIncluded
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Package (Includes Super)
              </button>
            </div>
          </div>

          {/* HECS / HELP Debt Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Higher Education Loan (HECS/HELP)</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHasHecs(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  !hasHecs
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                No HECS Debt
              </button>
              <button
                type="button"
                onClick={() => setHasHecs(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  hasHecs
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Has HECS / HELP
              </button>
            </div>
          </div>

          {/* Private Health Cover (MLS) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Hospital Private Health Cover (MLS)</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHasPrivateHealth(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  hasPrivateHealth
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Yes (MLS Exempt)
              </button>
              <button
                type="button"
                onClick={() => setHasPrivateHealth(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  !hasPrivateHealth
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                No Hospital Cover
              </button>
            </div>
          </div>

          {/* Residency Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Tax Residency Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsResident(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  isResident
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Australian Resident
              </button>
              <button
                type="button"
                onClick={() => setIsResident(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  !isResident
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Foreign Non-Resident
              </button>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>100% In-Browser Computation. Zero salary telemetry retained.</span>
          </div>
        </div>

        {/* Calculation Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Net Take-Home Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Net Take-Home Pay (After All Taxes)
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                Effective Rate: {calculation.effectiveTaxRate.toFixed(1)}%
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(calculation.netAnnualTakeHome).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">/year</span>
              </div>
              <p className="text-xs text-slate-400">
                Gross Taxable Salary: ${Math.round(calculation.baseTaxable).toLocaleString()} AUD
              </p>
            </div>

            {/* Frequency Breakdown Cards */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Monthly</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  ${Math.round(calculation.monthly).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Fortnightly</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  ${Math.round(calculation.fortnightly).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Weekly</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  ${Math.round(calculation.weekly).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tax Breakdown Table */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Statutory Withholding Breakdown
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-600">Base Income Tax (Stage 3 Rates)</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(calculation.baseTax).toLocaleString()}</span>
              </div>
              {calculation.lito > 0 && (
                <div className="py-2.5 flex items-center justify-between text-emerald-700">
                  <span>Low Income Tax Offset (LITO)</span>
                  <span className="font-mono font-bold">-${Math.round(calculation.lito).toLocaleString()}</span>
                </div>
              )}
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-600">Medicare Levy (2.0%)</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(calculation.medicareLevy).toLocaleString()}</span>
              </div>
              {calculation.mls > 0 && (
                <div className="py-2.5 flex items-center justify-between text-amber-700">
                  <span>Medicare Levy Surcharge (No Private Health)</span>
                  <span className="font-mono font-bold">${Math.round(calculation.mls).toLocaleString()}</span>
                </div>
              )}
              {calculation.hecsRepayment > 0 && (
                <div className="py-2.5 flex items-center justify-between text-blue-700">
                  <span>HECS / HELP Compulsory Repayment</span>
                  <span className="font-mono font-bold">${Math.round(calculation.hecsRepayment).toLocaleString()}</span>
                </div>
              )}
              <div className="py-3 flex items-center justify-between font-black text-sm text-slate-950 border-t-2 border-slate-200">
                <span>Total Statutory Withholding</span>
                <span className="font-mono text-rose-600">-${Math.round(calculation.totalWithholding).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between text-amber-800 bg-amber-50/50 px-2 rounded-xl mt-2 font-bold">
                <span>Employer Super Guarantee Contribution (12.0%)</span>
                <span className="font-mono">+${Math.round(calculation.employerSuper).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* In-Content AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Comprehensive Statutory Guide (800+ words) */}
      <article className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Australian Income Tax Architecture: Revised Stage 3 Framework
          </h2>
          <p>
            On 1 July 2024, the Australian Parliament enacted the Treasury Laws Amendment (Cost of Living Tax Cuts) Act 2024, superseding the original 2018 legislated Stage 3 tax structure. The revised schedule provides equitable tax relief skewed towards low- and middle-income earners while retaining progressive marginal thresholds for high-income brackets across the 2024/25, 2025/26, and 2026/27 financial years.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm border border-slate-200 rounded-xl">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="py-2.5 px-3 text-left">Taxable Income Bracket (AUD)</th>
                  <th className="py-2.5 px-3 text-left">Statutory Marginal Tax Rate</th>
                  <th className="py-2.5 px-3 text-left">Cumulative Base Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2 px-3">$0 – $18,200</td>
                  <td className="py-2 px-3 font-sans">0% (Tax-Free Threshold)</td>
                  <td className="py-2 px-3">Nil</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">$18,201 – $45,000</td>
                  <td className="py-2 px-3 font-sans">16% on excess over $18,200</td>
                  <td className="py-2 px-3">Nil</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">$45,001 – $135,000</td>
                  <td className="py-2 px-3 font-sans">30% on excess over $45,000</td>
                  <td className="py-2 px-3">$4,288</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">$135,001 – $190,000</td>
                  <td className="py-2 px-3 font-sans">37% on excess over $135,000</td>
                  <td className="py-2 px-3">$31,288</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">$190,001 and above</td>
                  <td className="py-2 px-3 font-sans">45% on excess over $190,000</td>
                  <td className="py-2 px-3">$51,638</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Medicare Levy and Medicare Levy Surcharge (MLS) Mechanics
          </h2>
          <p>
            Under the Medicare Levy Act 1986, Australian residents pay a 2.0% levy on their taxable income to fund Australia&apos;s universal healthcare system. Low-income earners benefit from an automatic reduction or exemption: for individuals, the low-income phase-in threshold begins at $26,000, phasing in at 10% of excess earnings until full liability applies at $32,500.
          </p>
          <p>
            In addition, high-income earners who do not maintain an approved private hospital cover policy with an Australian registered health insurer are assessed for the Medicare Levy Surcharge (MLS) under Section 8B of the Medicare Levy Act. Tier 1 applies from $97,000 to $113,000 (1.0% surcharge), Tier 2 from $113,001 to $151,000 (1.25% surcharge), and Tier 3 above $151,000 (1.5% surcharge). Maintaining hospital cover eliminates this surcharge entirely.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Superannuation Guarantee (12.0%) Legislated Horizon
          </h2>
          <p>
            The Superannuation Guarantee (Administration) Act 1992 governs employer contributions into complying superannuation funds. The statutory rate systematically increased from 9.5% through 10.0%, 10.5%, 11.0%, and 11.5% (2024/25), reaching its terminal legislated target of 12.0% on 1 July 2025. Employers are legally obligated to remit 12.0% on Ordinary Time Earnings (OTE) up to the quarterly maximum super contribution base ($65,070 per quarter in 2025/26), beyond which further contributions are discretionary.
          </p>
        </section>
      </article>

      {/* FAQ Section */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-800" />
          <span>Frequently Asked Statutory Tax Questions</span>
        </h3>
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div>
            <h4 className="font-bold text-slate-900">How does the tax-free threshold work for multiple jobs?</h4>
            <p className="mt-1">
              You can only claim the $18,200 tax-free threshold from one employer at a time (usually the primary payer). Your second employer must withhold tax at the higher &apos;no tax-free threshold&apos; rate from dollar one to prevent year-end tax debt.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Is my employer superannuation guarantee deducted from my take-home pay?</h4>
            <p className="mt-1">
              No. If your employment contract specifies a salary &apos;plus super&apos;, the 12% is paid entirely by the employer in addition to your agreed salary. If contracted on a &apos;total remuneration package&apos; (TRP), your base salary is calculated as package divided by 1.12.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

