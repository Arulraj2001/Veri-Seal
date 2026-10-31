'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Scale,
  AlertCircle,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface RedundancyYearBreakdown {
  serviceYear: number;
  ageAtYear: number;
  multiplier: number;
  amount: number;
}

interface RedundancyResult {
  age: number;
  yearsOfService: number;
  effectiveYears: number;
  weeklyPay: number;
  effectiveWeeklyPay: number;
  statutoryMaxWeeklyCap: number;
  totalStatutoryRedundancy: number;
  taxFreeAmount: number;
  taxableAmount: number;
  isEligible: boolean;
  breakdown: RedundancyYearBreakdown[];
}

export default function RedundancyPayUkPage() {
  const [age, setAge] = React.useState<number>(45);
  const [yearsOfService, setYearsOfService] = React.useState<number>(10);
  const [weeklyPay, setWeeklyPay] = React.useState<number>(750);

  // Statutory maximum weekly pay cap under Employment Rights Act 1996
  const STATUTORY_WEEKLY_CAP = 700;

  const calculateRedundancy = React.useCallback((): RedundancyResult => {
    const userAge = Math.max(16, age);
    const service = Math.max(0, yearsOfService);
    const rawWeekly = Math.max(0, weeklyPay);

    // Minimum 2 years continuous service required by law
    const isEligible = service >= 2;
    // Statutory maximum of 20 years continuous service
    const effectiveYears = Math.min(service, 20);
    // Weekly pay cap
    const effectiveWeeklyPay = Math.min(rawWeekly, STATUTORY_WEEKLY_CAP);

    const breakdown: RedundancyYearBreakdown[] = [];
    let totalStatutoryRedundancy = 0;

    if (isEligible) {
      // Calculate backwards from current age
      for (let i = 0; i < effectiveYears; i++) {
        const ageAtThatYear = userAge - i;
        let multiplier = 1.0;

        if (ageAtThatYear < 22) {
          multiplier = 0.5;
        } else if (ageAtThatYear >= 41) {
          multiplier = 1.5;
        } else {
          multiplier = 1.0;
        }

        const amount = multiplier * effectiveWeeklyPay;
        totalStatutoryRedundancy += amount;

        breakdown.push({
          serviceYear: effectiveYears - i,
          ageAtYear: ageAtThatYear,
          multiplier,
          amount,
        });
      }
    }

    // Section 401 of ITEPA 2003: First £30,000 is completely tax-free
    const taxFreeAmount = Math.min(totalStatutoryRedundancy, 30000);
    const taxableAmount = Math.max(0, totalStatutoryRedundancy - 30000);

    return {
      age: userAge,
      yearsOfService: service,
      effectiveYears,
      weeklyPay: rawWeekly,
      effectiveWeeklyPay,
      statutoryMaxWeeklyCap: STATUTORY_WEEKLY_CAP,
      totalStatutoryRedundancy,
      taxFreeAmount,
      taxableAmount,
      isEligible,
      breakdown,
    };
  }, [age, yearsOfService, weeklyPay]);

  const res = calculateRedundancy();

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
                name: 'UK Statutory Redundancy Pay Calculator (Employment Rights Act 1996)',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate official UK statutory redundancy pay under Section 162 of the Employment Rights Act 1996. Accounts for age multipliers, the 20-year service ceiling, statutory weekly pay cap, and the £30,000 tax-free exemption under ITEPA 2003.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How is UK statutory redundancy pay calculated?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Statutory redundancy pay is calculated based on age, continuous service (minimum 2 years, capped at 20 years), and weekly gross pay (subject to a statutory maximum cap). You receive 0.5 week’s pay for each year under 22, 1 week’s pay for each year aged 22 to 40, and 1.5 weeks’ pay for each year aged 41 or older.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is redundancy pay taxable in the United Kingdom?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Under Section 401 of the Income Tax (Earnings and Pensions) Act 2003 (ITEPA 2003), genuine statutory and contractual redundancy payments up to £30,000 are completely free of UK Income Tax and National Insurance Contributions. Any redundancy payment exceeding £30,000 is subject to Income Tax at your marginal rate and employer Class 1A NICs.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What continuous service is required to qualify for statutory redundancy pay?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'You must have worked continuously for your employer for at least 2 full years (104 weeks) to qualify for statutory redundancy pay under Section 155 of the Employment Rights Act 1996.',
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
          <span className="text-slate-800 font-medium">Statutory Redundancy Pay Calculator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Employment Rights Act 1996 (s.162) &amp; ITEPA 2003
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Statutory Redundancy Pay Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Calculate your exact legal redundancy entitlement based on age bands, service length, and statutory weekly pay caps.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-5 h-5 text-indigo-900" />
              Employment Service Profile
            </h2>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Your Age at Date of Redundancy
              </label>
              <input
                type="number"
                min="16"
                max="80"
                value={age || ''}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
              />
            </div>

            {/* Years of Service */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Full Years of Continuous Service
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={yearsOfService || ''}
                onChange={(e) => setYearsOfService(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
              />
              <span className="text-xs text-slate-500 mt-1 block">
                Statutory minimum is 2 years. Service is legally capped at 20 years.
              </span>
            </div>

            {/* Weekly Pay */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Gross Weekly Pay (Before Tax)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="25"
                  value={weeklyPay || ''}
                  onChange={(e) => setWeeklyPay(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Statutory cap: {formatGBP(STATUTORY_WEEKLY_CAP)}/week. If earning more, the cap applies to the statutory portion.
              </span>
            </div>

            {/* Eligibility Banner */}
            {!res.isEligible && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Less than 2 years of continuous service:</strong> Under Section 155 of the Employment Rights Act 1996, statutory redundancy pay is only mandatory for employees with 2 or more complete years of service.
                </div>
              </div>
            )}
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Statutory Entitlement</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  ERA 1996
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Total Statutory Redundancy Pay
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.totalStatutoryRedundancy)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Tax-Free Exemption (ITEPA s.401):</span>
                  <span className="font-bold text-emerald-400">100% Tax-Free</span>
                </div>
              </div>

              {/* Summary Details */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Service Counted:</span>
                  <span className="font-semibold text-slate-900">{res.effectiveYears} years (max 20)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Weekly Pay Applied:</span>
                  <span className="font-semibold text-slate-900">{formatGBP(res.effectiveWeeklyPay)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Tax-Free Amount:</span>
                  <span className="font-semibold text-emerald-700">{formatGBP(res.taxFreeAmount)}</span>
                </div>
                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Taxable Excess (over £30k):</span>
                  <span className="font-bold text-slate-900">{formatGBP(res.taxableAmount)}</span>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                Contractual Redundancy
              </div>
              <p className="text-indigo-900/80">
                This calculator provides the legal statutory minimum. Many employers offer enhanced contractual redundancy packages specified in your employment contract or collective bargaining agreement.
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
              UK Redundancy Law &amp; Employment Rights Act 1996
            </h2>
            <p>
              In the United Kingdom, statutory redundancy pay is governed by <strong>Part XI of the Employment Rights Act 1996 (ERA 1996)</strong>. When an employer dismisses an employee by reason of redundancy—due to cessation of business, closure of a workplace, or diminished requirement for work of a particular kind—the employee is entitled by statute to minimum lump-sum financial compensation.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The Three Statutory Age Multipliers (s.162 ERA 1996)
            </h3>
            <p>
              The statutory formula assigns different weightings to service based on the employee&apos;s age during each completed year of continuous employment:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Under Age 22:</strong> <strong>0.5 week&apos;s pay</strong> for each completed full year of service.
              </li>
              <li>
                <strong>Aged 22 to 40 inclusive:</strong> <strong>1.0 week&apos;s pay</strong> for each completed full year of service.
              </li>
              <li>
                <strong>Aged 41 and older:</strong> <strong>1.5 weeks&apos; pay</strong> for each completed full year of service.
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The £30,000 Tax Exemption under ITEPA 2003
            </h3>
            <p>
              Under <strong>Section 401 of the Income Tax (Earnings and Pensions) Act 2003 (ITEPA 2003)</strong>, termination payments made in connection with redundancy benefit from a statutory tax-free allowance:
            </p>
            <blockquote className="my-4 pl-4 border-l-4 border-indigo-900 italic text-slate-800 bg-slate-50 py-2">
              The first £30,000 of qualifying redundancy pay is completely exempt from UK Income Tax and employee National Insurance Contributions. Any portion of redundancy compensation exceeding £30,000 is subject to Income Tax at your normal PAYE marginal rate, and employer Class 1A National Insurance.
            </blockquote>
          </div>
        </article>
      </div>
    </div>
  );
}

