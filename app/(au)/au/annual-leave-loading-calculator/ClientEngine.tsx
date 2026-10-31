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
  Sun,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function AnnualLeaveLoadingCalculatorPage() {
  const [baseHourlyRate, setBaseHourlyRate] = React.useState<number>(38.50);
  const [weeklyHours, setWeeklyHours] = React.useState<number>(38);
  const [leaveDaysTaken, setLeaveDaysTaken] = React.useState<number>(20); // 4 standard working weeks (20 days)
  const [loadingRate, setLoadingRate] = React.useState<number>(17.5); // 17.5% standard
  const [isExitPayout, setIsExitPayout] = React.useState<boolean>(false);

  const results = React.useMemo(() => {
    const dailyHours = weeklyHours / 5;
    const totalLeaveHours = leaveDaysTaken * dailyHours;
    const baseLeavePay = totalLeaveHours * baseHourlyRate;
    const leaveLoadingAmount = baseLeavePay * (loadingRate / 100);
    const totalGrossLeavePay = baseLeavePay + leaveLoadingAmount;

    // Approximate withholding rate (~32%)
    const estimatedTax = totalGrossLeavePay * 0.32;
    const netTakeHome = totalGrossLeavePay - estimatedTax;

    return {
      dailyHours,
      totalLeaveHours,
      baseLeavePay,
      leaveLoadingAmount,
      totalGrossLeavePay,
      estimatedTax,
      netTakeHome,
    };
  }, [baseHourlyRate, weeklyHours, leaveDaysTaken, loadingRate]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian 17.5% Annual Leave Loading Calculator',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian annual leave loading calculator under Modern Awards and Fair Work Act 2009 s.90(2). Calculate 17.5% holiday loading and termination payout entitlements.',
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
        <span className="text-slate-900 font-bold">Annual Leave Loading (17.5%)</span>
      </nav>

      {/* Hero Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Sun className="w-3.5 h-3.5" />
          <span>Fair Work Modern Awards &amp; s.90(2) FWA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Annual Leave Loading (17.5%) &amp; Termination Payout Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Calculate statutory annual leave payments with 17.5% modern award leave loading, assess s.90(2) Fair Work termination pay rules, and forecast net holiday take-home pay.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Award &amp; Hours Parameters</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              17.5% Award
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Base Hourly Rate ($ AUD / hr)</span>
              <span className="text-xs text-amber-800 font-mono">${baseHourlyRate.toFixed(2)}/hr</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={baseHourlyRate}
              onChange={(e) => setBaseHourlyRate(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Ordinary Weekly Hours</span>
              <span className="text-xs text-amber-800 font-mono">{weeklyHours} hrs/wk</span>
            </label>
            <input
              type="number"
              min="10"
              max="60"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Leave Days Taken (or Accrued at Exit)</span>
              <span className="text-xs text-amber-800 font-mono">{leaveDaysTaken} days ({leaveDaysTaken / 5} weeks)</span>
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={leaveDaysTaken}
              onChange={(e) => setLeaveDaysTaken(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Leave Loading Rate (%)</span>
              <span className="text-xs text-amber-800 font-mono">{loadingRate}%</span>
            </label>
            <input
              type="number"
              min="0"
              max="35"
              step="0.5"
              value={loadingRate}
              onChange={(e) => setLoadingRate(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-900 text-xs"
            />
            <p className="text-[11px] text-slate-500">
              17.5% is the universal standard across Australian modern awards (e.g. Clerks, Retail, Hospitality).
            </p>
          </div>
        </div>

        {/* Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Gross Annual Leave Payment
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                {results.totalLeaveHours.toFixed(1)} Total Paid Hours
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.totalGrossLeavePay).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD Gross</span>
              </div>
              <p className="text-xs text-slate-400">
                Estimated Net in Hand: ~${Math.round(results.netTakeHome).toLocaleString()} AUD
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Base Leave Wages</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  ${Math.round(results.baseLeavePay).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">17.5% Loading Bonus</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  +${Math.round(results.leaveLoadingAmount).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Entitlement Calculation Details
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Standard Daily Hours</span>
                <span className="font-mono font-bold text-slate-900">{results.dailyHours.toFixed(1)} hrs/day</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Base Salary for {leaveDaysTaken} Days</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(results.baseLeavePay).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between text-amber-800">
                <span>17.5% Modern Award Loading</span>
                <span className="font-mono font-bold">+${Math.round(results.leaveLoadingAmount).toLocaleString()}</span>
              </div>
              <div className="py-3 flex justify-between font-black text-sm text-slate-950 border-t-2 border-slate-200">
                <span>Total Combined Leave Entitlement</span>
                <span className="font-mono text-amber-800">${Math.round(results.totalGrossLeavePay).toLocaleString()}</span>
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
            Historical Origin of 17.5% Leave Loading in Australian Industrial Law
          </h2>
          <p>
            In 1974, the Commonwealth Conciliation and Arbitration Commission introduced annual leave loading to ensure that workers were not financially disadvantaged while taking annual recreational leave. Because employees were unable to earn overtime, shift allowances, or weekend penalty rates while on holidays, the 17.5% loading (derived as approximately three weeks&apos; ordinary pay loaded across four weeks of annual leave) was introduced as standard award compensation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Section 90(2) Fair Work Act: Mandatory Loading on Termination
          </h2>
          <p>
            Under Section 90(2) of the Fair Work Act 2009, if an employee has accrued untaken annual leave when their employment ends, the employer must pay the employee the amount that would have been payable had the employee taken that period of leave. Following the landmark Federal Court precedent in <em>Centennial Northern Mining Services Pty Ltd v CFMEU [2015] FCA 136</em>, employers must pay annual leave loading on termination if the applicable Modern Award or Enterprise Agreement provides for loading when leave is taken during active employment.
          </p>
        </section>
      </article>
    </div>
  );
}

