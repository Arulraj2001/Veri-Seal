'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Scale,
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
  Calendar,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function UnfairDismissalCheckerPage() {
  const [annualEarnings, setAnnualEarnings] = React.useState<number>(145000);
  const [awardCovered, setAwardCovered] = React.useState<boolean>(false);
  const [monthsOfService, setMonthsOfService] = React.useState<number>(14);
  const [isSmallBusiness, setIsSmallBusiness] = React.useState<boolean>(false);
  const [daysSinceDismissal, setDaysSinceDismissal] = React.useState<number>(7);

  // Statutory High Income Threshold (Fair Work Commission indexed benchmark)
  const HIGH_INCOME_THRESHOLD = 175000;

  const assessment = React.useMemo(() => {
    // 1. Minimum Employment Period (s.383)
    const requiredMonths = isSmallBusiness ? 12 : 6;
    const meetsServicePeriod = monthsOfService >= requiredMonths;

    // 2. High Income Threshold (s.382)
    const isBelowThreshold = annualEarnings <= HIGH_INCOME_THRESHOLD;
    const isJurisdictionEligible = meetsServicePeriod && (isBelowThreshold || awardCovered);

    // 3. 21-Day Deadline (s.394)
    const daysRemaining = Math.max(0, 21 - daysSinceDismissal);
    const isDeadlineExpired = daysSinceDismissal > 21;

    let verdict = '';
    let verdictColor = '';

    if (!meetsServicePeriod) {
      verdict = 'Ineligible: Minimum Employment Period Not Met';
      verdictColor = 'text-rose-600';
    } else if (isDeadlineExpired) {
      verdict = 'Time Barred: 21-Day FWC Lodgment Deadline Passed';
      verdictColor = 'text-rose-600';
    } else if (isJurisdictionEligible) {
      verdict = 'Eligible to Lodge Unfair Dismissal Claim with FWC';
      verdictColor = 'text-emerald-700';
    } else {
      verdict = 'Excluded by High Income Threshold (s.382 FWA)';
      verdictColor = 'text-amber-700';
    }

    return {
      requiredMonths,
      meetsServicePeriod,
      isBelowThreshold,
      isJurisdictionEligible,
      daysRemaining,
      isDeadlineExpired,
      verdict,
      verdictColor,
      differenceFromThreshold: Math.abs(annualEarnings - HIGH_INCOME_THRESHOLD),
    };
  }, [annualEarnings, awardCovered, monthsOfService, isSmallBusiness, daysSinceDismissal]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fair Work Unfair Dismissal High Income Threshold Checker 2026/27',
    operatingSystem: 'All',
    applicationCategory: 'LegalApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Check Fair Work Commission unfair dismissal eligibility under Fair Work Act 2009 s.382 high income threshold, s.383 minimum qualifying periods, and 21-day lodgment deadline.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/au" className="hover:text-amber-800 transition-colors">Australia Suite</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Unfair Dismissal Eligibility</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Scale className="w-3.5 h-3.5" />
          <span>Fair Work Act 2009 Section 382</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Unfair Dismissal High Income Threshold &amp; Eligibility Checker
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Verify whether you are legally protected from unfair dismissal under Section 382 of the Fair Work Act 2009 based on the indexed High Income Threshold ($175,000+), Modern Award coverage, minimum service requirements, and the strict 21-day lodgment window.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Employment &amp; Salary Profile</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Threshold: $175,000
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Annual Earnings (Excl. Super)</span>
              <span className="text-xs text-amber-800 font-mono">${annualEarnings.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={annualEarnings}
              onChange={(e) => setAnnualEarnings(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
            <p className="text-[11px] text-slate-500">
              Includes basic wage, agreed non-monetary perks (car), and salary sacrifice. Excludes employer 12% super.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Modern Award or Enterprise Agreement</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAwardCovered(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  !awardCovered
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Award Free (Contract)
              </button>
              <button
                type="button"
                onClick={() => setAwardCovered(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  awardCovered
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Award / EBA Covered
              </button>
            </div>
            {awardCovered && (
              <p className="text-[11px] text-emerald-700 font-bold">
                Award-covered employees can claim unfair dismissal REGARDLESS of earnings above $175,000!
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Employer Size</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsSmallBusiness(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  !isSmallBusiness ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                15+ Staff (6 Mo Service)
              </button>
              <button
                type="button"
                onClick={() => setIsSmallBusiness(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  isSmallBusiness ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                &lt; 15 Staff (12 Mo Service)
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Continuous Service (Months)</span>
              <span className="text-xs text-amber-800 font-mono">{monthsOfService} Months</span>
            </label>
            <input
              type="range"
              min="1"
              max="60"
              value={monthsOfService}
              onChange={(e) => setMonthsOfService(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Days Elapsed Since Dismissal</span>
              <span className="text-xs text-amber-800 font-mono">{daysSinceDismissal} Days</span>
            </label>
            <input
              type="number"
              min="0"
              max="60"
              value={daysSinceDismissal}
              onChange={(e) => setDaysSinceDismissal(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-900 text-xs"
            />
          </div>
        </div>

        {/* Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                FWC Jurisdiction Assessment
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                assessment.isJurisdictionEligible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {assessment.isJurisdictionEligible ? 'Eligible' : 'Ineligible'}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${
                assessment.isJurisdictionEligible ? 'text-emerald-400' : 'text-amber-300'
              }`}>
                {assessment.verdict}
              </h3>
              <p className="text-xs text-slate-300">
                {assessment.isBelowThreshold
                  ? `Annual earnings are $${assessment.differenceFromThreshold.toLocaleString()} below the $175,000 threshold.`
                  : awardCovered
                    ? `Earnings exceed threshold, but modern award coverage preserves FWC jurisdiction.`
                    : `Earnings exceed $175,000 without modern award coverage.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">21-Day Lodgment Window</div>
                <div className={`text-base sm:text-lg font-black mt-1 ${
                  assessment.isDeadlineExpired ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {assessment.isDeadlineExpired ? 'Expired' : `${assessment.daysRemaining} Days Left`}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Service Requirement</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                  {assessment.meetsServicePeriod ? 'Satisfied' : `Need ${assessment.requiredMonths} Mo`}
                </div>
              </div>
            </div>
          </div>

          {/* Legal Recourse Guide Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Alternative Legal Recourses
            </h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">General Protections (General Protections / Adverse Action - Form F8)</div>
                <p className="mt-1 text-slate-600">
                  Unlike unfair dismissal, General Protections claims under Part 3-1 of the Fair Work Act have <strong>NO high income threshold</strong> and require no minimum employment period. If terminated due to exercising a workplace right, temporary illness, or discrimination, a Form F8 can still be filed.
                </p>
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
            Fair Work Act 2009 Section 382 Jurisdictional Gateway
          </h2>
          <p>
            An employee is protected from unfair dismissal only if they satisfy Section 382 of the Fair Work Act 2009. The statutory gateway requires that:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The employee has completed the minimum employment period (6 months for standard employers, 12 months for small business employers with under 15 staff).</li>
            <li>The employee is either covered by a Modern Award or an Enterprise Agreement, OR their annual rate of earnings does not exceed the statutory High Income Threshold ($175,000+).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            What Constitutes &apos;Earnings&apos; Under Section 332
          </h2>
          <p>
            Under Section 332 of the Act, earnings include wages, amounts dealt with on the employee&apos;s behalf (such as salary sacrifice), and the agreed monetary value of non-monetary benefits (e.g., private use of a company motor vehicle or company-provided laptop). Crucially, discretionary bonuses that are not contractually guaranteed and statutory employer superannuation contributions do not count toward the High Income Threshold.
          </p>
        </section>
      </article>
    </div>
  );
}

