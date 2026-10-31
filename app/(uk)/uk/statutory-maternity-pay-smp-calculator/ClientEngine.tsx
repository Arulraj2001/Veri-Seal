'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
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
  Baby,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface SmpResult {
  awe: number;
  first6WeeksRate: number;
  first6WeeksTotal: number;
  remaining33WeeksRate: number;
  remaining33WeeksTotal: number;
  totalSmp39Weeks: number;
  standardWeeklyCap: number;
  isEligible: boolean;
  employerRecoveryAmount: number;
  recoveryPercentage: number;
}

export default function StatutoryMaternityPayUkPage() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = React.useState<number>(650);
  const [isSmallEmployer, setIsSmallEmployer] = React.useState<boolean>(true); // Small Employers' Relief (103%)
  const [has26WeeksService, setHas26WeeksService] = React.useState<boolean>(true);

  // Statutory standard weekly rate (indexed annually by UK Department for Work and Pensions)
  const STATUTORY_STANDARD_RATE = 184.03;
  // Lower Earnings Limit (LEL) for eligibility
  const LOWER_EARNINGS_LIMIT = 123.00;

  const calculateSmp = React.useCallback((): SmpResult => {
    const awe = Math.max(0, averageWeeklyEarnings);
    const isEligible = has26WeeksService && awe >= LOWER_EARNINGS_LIMIT;

    if (!isEligible) {
      return {
        awe,
        first6WeeksRate: 0,
        first6WeeksTotal: 0,
        remaining33WeeksRate: 0,
        remaining33WeeksTotal: 0,
        totalSmp39Weeks: 0,
        standardWeeklyCap: STATUTORY_STANDARD_RATE,
        isEligible: false,
        employerRecoveryAmount: 0,
        recoveryPercentage: isSmallEmployer ? 103 : 92,
      };
    }

    // First 6 weeks: 90% of AWE (no statutory cap)
    const first6WeeksRate = awe * 0.90;
    const first6WeeksTotal = first6WeeksRate * 6;

    // Remaining 33 weeks: lower of statutory rate (£184.03) or 90% of AWE
    const remaining33WeeksRate = Math.min(STATUTORY_STANDARD_RATE, awe * 0.90);
    const remaining33WeeksTotal = remaining33WeeksRate * 33;

    const totalSmp39Weeks = first6WeeksTotal + remaining33WeeksTotal;

    // Employer Recovery: Small Employers' Relief = 103% (includes 3% compensation for NICs); Standard = 92%
    const recoveryPct = isSmallEmployer ? 1.03 : 0.92;
    const employerRecoveryAmount = totalSmp39Weeks * recoveryPct;

    return {
      awe,
      first6WeeksRate,
      first6WeeksTotal,
      remaining33WeeksRate,
      remaining33WeeksTotal,
      totalSmp39Weeks,
      standardWeeklyCap: STATUTORY_STANDARD_RATE,
      isEligible: true,
      employerRecoveryAmount,
      recoveryPercentage: isSmallEmployer ? 103 : 92,
    };
  }, [averageWeeklyEarnings, isSmallEmployer, has26WeeksService]);

  const res = calculateSmp();

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
                name: 'UK Statutory Maternity Pay (SMP) Calculator',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate 39 weeks of UK Statutory Maternity Pay (SMP) under the Social Security Contributions and Benefits Act 1992. Covers 6 weeks @ 90% average earnings, 33 weeks standard rate, and Small Employers’ Relief (103% recovery).',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How is Statutory Maternity Pay (SMP) calculated in the UK?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'SMP is paid for up to 39 weeks. For the first 6 weeks, you receive 90% of your average weekly earnings (AWE) with no upper limit. For the next 33 weeks, you receive either the statutory standard weekly rate (£184.03) or 90% of your AWE, whichever is lower.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What continuous employment test applies to SMP eligibility?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'To qualify for SMP, an employee must have worked continuously for the same employer for at least 26 weeks leading into the "qualifying week" (the 15th week before the expected week of childbirth) and earn at least the Lower Earnings Limit (£123/week).',
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
          <span className="text-slate-800 font-medium">Statutory Maternity Pay (SMP) Estimator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Baby className="w-3.5 h-3.5" />
            Social Security Contributions and Benefits Act 1992
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Statutory Maternity Pay (SMP) Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Estimate 39 weeks of maternity pay: 6 weeks @ 90% uncapped earnings plus 33 weeks statutory standard allowance.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-indigo-900" />
              Earnings &amp; Employment Period
            </h2>

            {/* Average Weekly Earnings */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Average Weekly Earnings (AWE) in 8-Week Relevant Period
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="25"
                  value={averageWeeklyEarnings || ''}
                  onChange={(e) => setAverageWeeklyEarnings(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Gross earnings before tax calculated over the 8 weeks ending with the qualifying week. Must be at least £123/week.
              </span>
            </div>

            {/* Continuous Employment Check */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={has26WeeksService}
                  onChange={(e) => setHas26WeeksService(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-900 focus:ring-indigo-900 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Continuous employment for at least 26 weeks up to the 15th week before the due date
                </span>
              </label>
            </div>

            {/* Small Employers' Relief */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSmallEmployer}
                  onChange={(e) => setIsSmallEmployer(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-900 focus:ring-indigo-900 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Qualify for Small Employers&apos; Relief (103% HMRC recovery if Class 1 NICs &le; £45k)
                </span>
              </label>
            </div>

            {/* Ineligibility Warning */}
            {!res.isEligible && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Not eligible for Statutory Maternity Pay:</strong> Either continuous service was under 26 weeks or weekly earnings were below the Lower Earnings Limit (£123.00). You may qualify for <strong>Maternity Allowance</strong> from Jobcentre Plus.
                </div>
              </div>
            )}
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Total 39-Week SMP</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  39 Weeks
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Total Statutory Maternity Pay
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.totalSmp39Weeks)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>HMRC Employer Recovery:</span>
                  <span className="font-bold text-indigo-300">
                    {formatGBP(res.employerRecoveryAmount)} ({res.recoveryPercentage}%)
                  </span>
                </div>
              </div>

              {/* Two-Stage Breakdown */}
              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900">Weeks 1 to 6 (Higher Rate):</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Weekly rate (90% uncapped):</span>
                    <span className="font-semibold text-slate-900">{formatGBP(res.first6WeeksRate)}/wk</span>
                  </div>
                  <div className="flex justify-between text-indigo-900 font-bold">
                    <span>Subtotal 6 weeks:</span>
                    <span>{formatGBP(res.first6WeeksTotal)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900">Weeks 7 to 39 (Standard Rate):</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Weekly rate:</span>
                    <span className="font-semibold text-slate-900">{formatGBP(res.remaining33WeeksRate)}/wk</span>
                  </div>
                  <div className="flex justify-between text-indigo-900 font-bold">
                    <span>Subtotal 33 weeks:</span>
                    <span>{formatGBP(res.remaining33WeeksTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                PAYE &amp; NICs Deduction Notice
              </div>
              <p className="text-indigo-900/80">
                Statutory Maternity Pay is treated as earnings. Your employer will deduct PAYE Income Tax and Class 1 National Insurance Contributions through payroll as normal.
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
              UK Statutory Maternity Pay (SMP) Rules &amp; Framework
            </h2>
            <p>
              Statutory Maternity Pay is governed by the <strong>Social Security Contributions and Benefits Act 1992</strong> and the <strong>Statutory Maternity Pay (General) Regulations 1986</strong>. It provides vital income replacement for employed mothers taking time off work leading up to and following the birth of a child.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The 39-Week Statutory Structure Explained
            </h3>
            <p>
              SMP is paid for a statutory duration of up to 39 consecutive weeks:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Stage 1 (First 6 Weeks):</strong> Paid at <strong>90% of your Average Weekly Earnings (AWE)</strong>. Crucially, there is no statutory financial ceiling on this amount; high earners receive 90% of their actual normal weekly earnings.
              </li>
              <li>
                <strong>Stage 2 (Remaining 33 Weeks):</strong> Paid at whichever is lower: the statutory standard weekly rate (<strong>£184.03</strong>) or 90% of your AWE.
              </li>
              <li>
                <strong>Remaining 13 Weeks:</strong> An employee is entitled to 52 weeks of Statutory Maternity Leave, but the final 13 weeks are unpaid by statute (unless enhanced maternity pay is provided contractually).
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Employer Recovery of SMP from HMRC
            </h3>
            <p>
              Employers fund the upfront payment of SMP through payroll and then recover the funds directly from HMRC by reducing their monthly PAYE/NICs liability remittance:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Standard Recovery Rate:</strong> Larger employers recover <strong>92%</strong> of the total SMP paid.
              </li>
              <li>
                <strong>Small Employers&apos; Relief (SER):</strong> Employers whose total Class 1 National Insurance liability was £45,000 or less in the previous tax year recover <strong>100% of the SMP plus an extra 3%</strong> (total 103%) as statutory compensation for national insurance costs.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

