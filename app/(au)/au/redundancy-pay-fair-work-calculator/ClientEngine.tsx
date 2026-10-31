'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Briefcase,
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

export default function RedundancyPayCalculatorPage() {
  const [weeklyPay, setWeeklyPay] = React.useState<number>(1800);
  const [completedYears, setCompletedYears] = React.useState<number>(6);
  const [employeeAge, setEmployeeAge] = React.useState<number>(46);
  const [isSmallBusiness, setIsSmallBusiness] = React.useState<boolean>(false);
  const [payInLieuOfNotice, setPayInLieuOfNotice] = React.useState<boolean>(true);

  // ATO Genuine Redundancy Limits (ITAA 1997 s.83-170 for 2025/26 - 2026/27)
  const TAX_FREE_BASE = 12524;
  const TAX_FREE_PER_YEAR = 6264;

  const results = React.useMemo(() => {
    // 1. Fair Work Act 2009 s.119 Redundancy Scale
    let redundancyWeeks = 0;
    if (!isSmallBusiness) {
      if (completedYears >= 10) redundancyWeeks = 12; // Statutory drop from 16 to 12 at 10+ yrs due to LSL
      else if (completedYears >= 9) redundancyWeeks = 16;
      else if (completedYears >= 8) redundancyWeeks = 14;
      else if (completedYears >= 7) redundancyWeeks = 13;
      else if (completedYears >= 6) redundancyWeeks = 11;
      else if (completedYears >= 5) redundancyWeeks = 10;
      else if (completedYears >= 4) redundancyWeeks = 8;
      else if (completedYears >= 3) redundancyWeeks = 7;
      else if (completedYears >= 2) redundancyWeeks = 6;
      else if (completedYears >= 1) redundancyWeeks = 4;
    }

    // 2. Minimum Notice Period (s.117 FWA)
    let noticeWeeks = 0;
    if (completedYears > 5) noticeWeeks = 4;
    else if (completedYears > 3) noticeWeeks = 3;
    else if (completedYears > 1) noticeWeeks = 2;
    else noticeWeeks = 1;

    // +1 week if over 45 years of age and at least 2 years continuous service
    if (employeeAge >= 45 && completedYears >= 2) {
      noticeWeeks += 1;
    }

    const redundancySeverance = redundancyWeeks * weeklyPay;
    const noticeSeverance = payInLieuOfNotice ? noticeWeeks * weeklyPay : 0;
    const totalGrossSeverance = redundancySeverance + noticeSeverance;

    // 3. ATO Tax-Free Redundancy Limit (s.83-170)
    const taxFreeLimit = TAX_FREE_BASE + (TAX_FREE_PER_YEAR * completedYears);
    const taxFreeAmount = Math.min(redundancySeverance, taxFreeLimit);
    const taxableEtp = Math.max(0, redundancySeverance - taxFreeLimit);

    // Concessional ETP tax rate (typically 17% or 32% depending on preservation age)
    const etpTax = taxableEtp * 0.32;
    // Notice pay is taxed as normal marginal withholding (~32%)
    const noticeTax = noticeSeverance * 0.32;
    const totalTaxWithheld = etpTax + noticeTax;
    const netTakeHomeSeverance = totalGrossSeverance - totalTaxWithheld;

    return {
      redundancyWeeks,
      noticeWeeks,
      redundancySeverance,
      noticeSeverance,
      totalGrossSeverance,
      taxFreeLimit,
      taxFreeAmount,
      taxableEtp,
      totalTaxWithheld,
      netTakeHomeSeverance,
    };
  }, [weeklyPay, completedYears, employeeAge, isSmallBusiness, payInLieuOfNotice]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fair Work Australian Statutory Redundancy Pay Calculator (s.119 NES)',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian redundancy calculator under Fair Work Act 2009 s.119 NES scales, small business employer exemptions, s.117 notice periods, and ITAA 1997 s.83-170 tax-free limits.',
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
        <span className="text-slate-900 font-bold">Statutory Redundancy Pay (s.119)</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Fair Work Act 2009 Section 119 (NES)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Statutory Redundancy Pay &amp; Tax-Free ETP Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Compute statutory redundancy severance under National Employment Standards (NES) continuous service tables, assess the small business exemption, and calculate the ATO tax-free genuine redundancy threshold under s.83-170.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Employment Parameters</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              NES s.119
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Weekly Base Rate of Pay ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${weeklyPay.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={weeklyPay}
              onChange={(e) => setWeeklyPay(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
            <p className="text-[11px] text-slate-500">Based on ordinary hours of work excluding bonuses and overtime.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Completed Continuous Service (Years)</span>
              <span className="text-xs text-amber-800 font-mono">{completedYears} Years</span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={completedYears}
              onChange={(e) => setCompletedYears(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Employee Age</span>
              <span className="text-xs text-amber-800 font-mono">{employeeAge} years</span>
            </label>
            <input
              type="number"
              min="16"
              max="75"
              value={employeeAge}
              onChange={(e) => setEmployeeAge(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-900 text-xs"
            />
          </div>

          {/* Small Business Exemption Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Employer Headcount Size</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsSmallBusiness(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  !isSmallBusiness
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                15+ Staff (NES Applies)
              </button>
              <button
                type="button"
                onClick={() => setIsSmallBusiness(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  isSmallBusiness
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                &lt; 15 Staff (Small Business)
              </button>
            </div>
            {isSmallBusiness && (
              <p className="text-[11px] text-rose-600 font-bold mt-1">
                Small business employers are exempt from statutory redundancy severance under s.121 FWA.
              </p>
            )}
          </div>
        </div>

        {/* Calculation Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Total Redundancy Payout (Severance + Notice)
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                {results.redundancyWeeks} Wks Severance + {results.noticeWeeks} Wks Notice
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.netTakeHomeSeverance).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD Net</span>
              </div>
              <p className="text-xs text-slate-400">
                Gross Severance Package: ${Math.round(results.totalGrossSeverance).toLocaleString()} AUD
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">100% Tax-Free Base (s.83-170)</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                  ${Math.round(results.taxFreeAmount).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Total Tax Withheld (ETP)</div>
                <div className="text-base sm:text-lg font-black text-rose-400 mt-1">
                  ${Math.round(results.totalTaxWithheld).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Statutory Entitlement Breakdown
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">s.119 Redundancy Severance ({results.redundancyWeeks} Weeks)</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(results.redundancySeverance).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">s.117 Notice Period in Lieu ({results.noticeWeeks} Weeks)</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(results.noticeSeverance).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between text-emerald-700">
                <span>ATO Tax-Free Genuine Redundancy Ceiling</span>
                <span className="font-mono font-bold">${Math.round(results.taxFreeLimit).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between text-slate-600">
                <span>Taxable Employment Termination Payment (ETP)</span>
                <span className="font-mono font-bold">${Math.round(results.taxableEtp).toLocaleString()}</span>
              </div>
              <div className="py-3 flex justify-between font-black text-sm text-slate-950 border-t-2 border-slate-200">
                <span>Estimated Net In-Pocket Severance</span>
                <span className="font-mono text-amber-800">${Math.round(results.netTakeHomeSeverance).toLocaleString()}</span>
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
            Fair Work Act 2009: Section 119 NES Redundancy Entitlement
          </h2>
          <p>
            Under Section 119 of the Fair Work Act 2009, an employee is entitled to redundancy pay when their employer terminates their employment because the employer no longer requires the job to be done by anyone (other than in cases of ordinary turnover), or because of the insolvency or bankruptcy of the employer.
          </p>
          <p>
            Noticeably, at 10 years of continuous service, the statutory entitlement drops from 16 weeks to 12 weeks. This intentional legislative mechanism in Section 119(2) recognizes that employees with 10 years of service accrue substantial long service leave (LSL) entitlements under state and territory legislation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Small Business Employer Exemption (Section 121)
          </h2>
          <p>
            Under Section 121(1)(b) of the Act, employers who employ fewer than 15 employees (including regular and systematic casuals, and staff across associated entities) at the time notice is given are completely exempt from the obligation to pay statutory NES redundancy pay.
          </p>
        </section>
      </article>
    </div>
  );
}

