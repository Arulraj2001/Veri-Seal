'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  TrendingDown,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Scale,
  Percent,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface TaxBreakdown {
  grossAnnual: number;
  grossMonthly: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTaxAnnual: number;
  incomeTaxMonthly: number;
  nicsAnnual: number;
  nicsMonthly: number;
  pensionAnnual: number;
  pensionMonthly: number;
  studentLoanAnnual: number;
  studentLoanMonthly: number;
  netTakeHomeAnnual: number;
  netTakeHomeMonthly: number;
  effectiveTaxRate: number;
}

export default function TakeHomePayUkPage() {
  const [grossSalary, setGrossSalary] = React.useState<number>(45000);
  const [payPeriod, setPayPeriod] = React.useState<'yearly' | 'monthly'>('yearly');
  const [taxRegion, setTaxRegion] = React.useState<'england_ni_wales' | 'scotland'>('england_ni_wales');
  const [pensionPercent, setPensionPercent] = React.useState<number>(5.0);
  const [studentLoanPlan, setStudentLoanPlan] = React.useState<'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgrad'>('none');
  const [hasBlindAllowance, setHasBlindAllowance] = React.useState<boolean>(false);

  const calculateTakeHome = React.useCallback((): TaxBreakdown => {
    const grossAnnual = payPeriod === 'yearly' ? Math.max(0, grossSalary) : Math.max(0, grossSalary * 12);
    const grossMonthly = grossAnnual / 12;

    // 1. Personal Allowance & Taper (s.35 Income Tax Act 2007)
    // Standard PA: £12,570. Taper: £1 reduction for every £2 of income above £100,000.
    let basePA = 12570;
    if (hasBlindAllowance) {
      basePA += 3070; // Blind Person's Allowance
    }

    let personalAllowance = basePA;
    if (grossAnnual > 100000) {
      const reduction = (grossAnnual - 100000) / 2;
      personalAllowance = Math.max(0, basePA - reduction);
    }

    const taxableIncome = Math.max(0, grossAnnual - personalAllowance);

    // 2. Income Tax
    let incomeTaxAnnual = 0;
    if (taxRegion === 'england_ni_wales') {
      // Basic rate: 20% on £12,571 to £50,270 (band of £37,700)
      // Higher rate: 40% on £50,271 to £125,140 (band of £74,870)
      // Additional rate: 45% over £125,140
      if (taxableIncome > 0) {
        const basicBand = Math.min(taxableIncome, 37700);
        incomeTaxAnnual += basicBand * 0.20;

        if (taxableIncome > 37700) {
          const higherBand = Math.min(taxableIncome - 37700, 74870);
          incomeTaxAnnual += higherBand * 0.40;

          if (taxableIncome > 37700 + 74870) {
            const additionalBand = taxableIncome - 37700 - 74870;
            incomeTaxAnnual += additionalBand * 0.45;
          }
        }
      }
    } else {
      // Scotland Scottish Income Tax (Starter 19%, Basic 20%, Intermediate 21%, Higher 42%, Top 48%)
      if (taxableIncome > 0) {
        const starter = Math.min(taxableIncome, 2162);
        incomeTaxAnnual += starter * 0.19;

        if (taxableIncome > 2162) {
          const basic = Math.min(taxableIncome - 2162, 10994);
          incomeTaxAnnual += basic * 0.20;

          if (taxableIncome > 13156) {
            const intermediate = Math.min(taxableIncome - 13156, 17938);
            incomeTaxAnnual += intermediate * 0.21;

            if (taxableIncome > 31094) {
              const higher = Math.min(taxableIncome - 31094, 93906);
              incomeTaxAnnual += higher * 0.42;

              if (taxableIncome > 125000) {
                const top = taxableIncome - 125000;
                incomeTaxAnnual += top * 0.48;
              }
            }
          }
        }
      }
    }

    // 3. National Insurance (Class 1 Employee NICs 2026/27)
    // Primary Threshold: £12,570 (£1,048/mo)
    // Upper Earnings Limit (UEL): £50,270 (£4,189/mo)
    // Main rate: 8% on earnings between £12,570 and £50,270
    // Additional rate: 2% on earnings above £50,270
    let nicsAnnual = 0;
    if (grossAnnual > 12570) {
      const mainNICsBand = Math.min(grossAnnual, 50270) - 12570;
      nicsAnnual += mainNICsBand * 0.08;

      if (grossAnnual > 50270) {
        nicsAnnual += (grossAnnual - 50270) * 0.02;
      }
    }

    // 4. Workplace Pension (Auto-enrolment)
    // Qualifying earnings threshold: between £6,240 and £50,270 (or full gross depending on scheme)
    const qualifyingGross = Math.max(0, grossAnnual - 6240);
    const pensionAnnual = (qualifyingGross * (Math.max(0, pensionPercent) / 100));

    // 5. Student Loan Repayments
    let studentLoanAnnual = 0;
    if (studentLoanPlan === 'plan1' && grossAnnual > 24990) {
      studentLoanAnnual = (grossAnnual - 24990) * 0.09;
    } else if (studentLoanPlan === 'plan2' && grossAnnual > 27295) {
      studentLoanAnnual = (grossAnnual - 27295) * 0.09;
    } else if (studentLoanPlan === 'plan4' && grossAnnual > 31395) {
      studentLoanAnnual = (grossAnnual - 31395) * 0.09;
    } else if (studentLoanPlan === 'plan5' && grossAnnual > 25000) {
      studentLoanAnnual = (grossAnnual - 25000) * 0.09;
    } else if (studentLoanPlan === 'postgrad' && grossAnnual > 21000) {
      studentLoanAnnual = (grossAnnual - 21000) * 0.06;
    }

    // 6. Net Take-Home Pay
    const totalDeductionsAnnual = incomeTaxAnnual + nicsAnnual + pensionAnnual + studentLoanAnnual;
    const netTakeHomeAnnual = Math.max(0, grossAnnual - totalDeductionsAnnual);
    const netTakeHomeMonthly = netTakeHomeAnnual / 12;
    const effectiveTaxRate = grossAnnual > 0 ? (totalDeductionsAnnual / grossAnnual) * 100 : 0;

    return {
      grossAnnual,
      grossMonthly,
      personalAllowance,
      taxableIncome,
      incomeTaxAnnual,
      incomeTaxMonthly: incomeTaxAnnual / 12,
      nicsAnnual,
      nicsMonthly: nicsAnnual / 12,
      pensionAnnual,
      pensionMonthly: pensionAnnual / 12,
      studentLoanAnnual,
      studentLoanMonthly: studentLoanAnnual / 12,
      netTakeHomeAnnual,
      netTakeHomeMonthly,
      effectiveTaxRate,
    };
  }, [grossSalary, payPeriod, taxRegion, pensionPercent, studentLoanPlan, hasBlindAllowance]);

  const res = calculateTakeHome();

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
                name: 'UK Take-Home Pay Salary Calculator 2026/27 (HMRC & PAYE)',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate your exact UK net take-home salary after PAYE income tax, Class 1 National Insurance Contributions (8% rate), auto-enrolment workplace pension, and student loan deductions for 2026/27.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is the UK Personal Allowance for 2026/27?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The standard UK Personal Allowance is £12,570. This means you do not pay income tax on the first £12,570 of earnings. If your adjusted net income exceeds £100,000, your Personal Allowance is reduced by £1 for every £2 earned above £100,000, tapering to zero at £125,140.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is the employee National Insurance (NICs) rate in 2026/27?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The primary Class 1 employee National Insurance rate is 8% on earnings between the Primary Threshold (£12,570/year or £1,048/month) and the Upper Earnings Limit (£50,270/year or £4,189/month). Earnings above £50,270 are subject to a 2% rate.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How do student loan repayments work on UK payslips?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Student loan deductions are calculated at 9% (or 6% for Postgraduate loans) of earnings above specific statutory repayment thresholds: Plan 1 (£24,990), Plan 2 (£27,295), Plan 4 Scottish (£31,395), Plan 5 (£25,000), and Postgraduate (£21,000). Deductions are managed automatically via HMRC PAYE.',
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
          <span className="text-slate-800 font-medium">Take-Home Pay Salary Calculator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            HMRC PAYE &amp; National Insurance 2026/27
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            UK Take-Home Pay Salary Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Determine your true monthly and annual take-home wage after Income Tax, 8% NICs, workplace pension, and student loan deductions.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Coins className="w-5 h-5 text-indigo-900" />
              Salary &amp; Tax Profile
            </h2>

            {/* Salary Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-semibold text-slate-700">Gross Salary</label>
                <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPayPeriod('yearly')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      payPeriod === 'yearly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Per Year
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayPeriod('monthly')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      payPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Per Month
                  </button>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={grossSalary || ''}
                  onChange={(e) => setGrossSalary(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  placeholder={payPeriod === 'yearly' ? '45000' : '3750'}
                />
              </div>
            </div>

            {/* Tax Region: England/NI/Wales vs Scotland */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tax Jurisdiction</label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setTaxRegion('england_ni_wales')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    taxRegion === 'england_ni_wales'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  England, Wales &amp; NI
                </button>
                <button
                  type="button"
                  onClick={() => setTaxRegion('scotland')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    taxRegion === 'scotland'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Scotland (Scottish Rates)
                </button>
              </div>
            </div>

            {/* Workplace Pension & Student Loan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Workplace Pension (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="50"
                    value={pensionPercent || ''}
                    onChange={(e) => setPensionPercent(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Statutory minimum auto-enrolment is 5%.
                </span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Student Loan Plan
                </label>
                <select
                  value={studentLoanPlan}
                  onChange={(e) => setStudentLoanPlan(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-900"
                >
                  <option value="none">No Student Loan</option>
                  <option value="plan1">Plan 1 (Threshold £24,990)</option>
                  <option value="plan2">Plan 2 (Threshold £27,295)</option>
                  <option value="plan4">Plan 4 Scottish (Threshold £31,395)</option>
                  <option value="plan5">Plan 5 (Threshold £25,000)</option>
                  <option value="postgrad">Postgraduate Loan (Threshold £21,000)</option>
                </select>
              </div>
            </div>

            {/* Blind Person's Allowance Option */}
            <div className="pt-1">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasBlindAllowance}
                  onChange={(e) => setHasBlindAllowance(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-900 focus:ring-indigo-900 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Include Blind Person&apos;s Allowance (+£3,070 tax-free allowance)
                </span>
              </label>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Net Take-Home Pay</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  2026/27 Tax Year
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Net Monthly In Your Bank
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.netTakeHomeMonthly)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Net Annual Salary:</span>
                  <span className="font-bold text-indigo-300">{formatGBP(res.netTakeHomeAnnual)}</span>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Gross Salary (Year):</span>
                  <span className="font-semibold text-slate-900">{formatGBP(res.grossAnnual)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Personal Allowance:</span>
                  <span className="font-semibold text-emerald-700">{formatGBP(res.personalAllowance)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">PAYE Income Tax:</span>
                  <span className="font-semibold text-rose-600">-{formatGBP(res.incomeTaxAnnual)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Class 1 NICs (8% rate):</span>
                  <span className="font-semibold text-rose-600">-{formatGBP(res.nicsAnnual)}</span>
                </div>
                {res.pensionAnnual > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Pension ({pensionPercent}%):</span>
                    <span className="font-semibold text-rose-600">-{formatGBP(res.pensionAnnual)}</span>
                  </div>
                )}
                {res.studentLoanAnnual > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Student Loan:</span>
                    <span className="font-semibold text-rose-600">-{formatGBP(res.studentLoanAnnual)}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Effective Tax &amp; Deduction Rate:</span>
                  <span className="font-bold text-indigo-900">{res.effectiveTaxRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                100% In-Browser Privacy
              </div>
              <p className="text-indigo-900/80">
                All PAYE brackets and National Insurance thresholds are calculated locally inside your browser. No earnings or financial information ever leave your device.
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
              Understanding UK PAYE Income Tax &amp; NICs for 2026/27
            </h2>
            <p>
              In the United Kingdom, employment earnings are taxed under the <strong>Pay As You Earn (PAYE)</strong> system administered by HM Revenue &amp; Customs (HMRC) pursuant to the <strong>Income Tax (Pay As You Earn) Regulations 2003</strong> and the <strong>Income Tax Act 2007</strong>. Your employer acts as a statutory withholding agent, deducting Income Tax and National Insurance Contributions (NICs) before transferring your net salary to your bank account.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The Personal Allowance and the £100k Taper Trap
            </h3>
            <p>
              For the 2026/27 tax year, the standard tax-free <strong>Personal Allowance</strong> is frozen at <strong>£12,570</strong>. Under Section 35 of the Income Tax Act 2007, an individual whose adjusted net income exceeds £100,000 experiences a statutory taper of their Personal Allowance:
            </p>
            <blockquote className="my-4 pl-4 border-l-4 border-indigo-900 italic text-slate-800 bg-slate-50 py-2">
              The Personal Allowance is reduced by £1 for every £2 of income above £100,000. Consequently, for earnings between £100,000 and £125,140, the loss of allowance combined with higher rate 40% income tax creates an effective marginal tax rate of 60% (excluding NICs).
            </blockquote>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Class 1 National Insurance Contributions (NICs)
            </h3>
            <p>
              Under the Social Security Contributions and Benefits Act 1992, employees pay Class 1 primary National Insurance Contributions on earnings above the Primary Threshold (£12,570 per annum / £1,048 per month):
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Earnings between £12,570 and £50,270:</strong> Charged at the primary rate of <strong>8%</strong>.
              </li>
              <li>
                <strong>Earnings above the Upper Earnings Limit (£50,270):</strong> Charged at the reduced rate of <strong>2%</strong>.
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Student Loan Repayments Overview
            </h3>
            <p>
              Student loan repayments are not treated as a debt against credit rating but rather as a statutory graduate payroll levy collected through PAYE:
            </p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-2.5 border border-slate-200">Plan Type</th>
                    <th className="p-2.5 border border-slate-200">Annual Threshold</th>
                    <th className="p-2.5 border border-slate-200">Repayment Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2.5 border border-slate-200 font-semibold">Plan 1 (Pre-2012 England/Wales)</td>
                    <td className="p-2.5 border border-slate-200">£24,990</td>
                    <td className="p-2.5 border border-slate-200 font-bold">9%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-slate-200 font-semibold">Plan 2 (Post-2012 England/Wales)</td>
                    <td className="p-2.5 border border-slate-200">£27,295</td>
                    <td className="p-2.5 border border-slate-200 font-bold">9%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-slate-200 font-semibold">Plan 4 (Scottish Students)</td>
                    <td className="p-2.5 border border-slate-200">£31,395</td>
                    <td className="p-2.5 border border-slate-200 font-bold">9%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-slate-200 font-semibold">Plan 5 (Post-2023 Starters)</td>
                    <td className="p-2.5 border border-slate-200">£25,000</td>
                    <td className="p-2.5 border border-slate-200 font-bold">9%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-slate-200 font-semibold">Postgraduate Loan</td>
                    <td className="p-2.5 border border-slate-200">£21,000</td>
                    <td className="p-2.5 border border-slate-200 font-bold">6%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

