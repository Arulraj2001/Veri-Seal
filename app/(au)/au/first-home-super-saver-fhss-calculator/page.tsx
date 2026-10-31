'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
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
  Coins,
  PiggyBank,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function FhssCalculatorPage() {
  const [annualContribution, setAnnualContribution] = React.useState<number>(15000);
  const [yearsSaving, setYearsSaving] = React.useState<number>(3);
  const [isCouple, setIsCouple] = React.useState<boolean>(false);
  const [marginalTaxRate, setMarginalTaxRate] = React.useState<number>(39); // 37% + 2% Medicare
  const [sicEarningsRate, setSicEarningsRate] = React.useState<number>(8.2); // Deemed SIC rate

  // Statutory FHSS Caps
  const ANNUAL_CAP_PER_PERSON = 15000;
  const TOTAL_CAP_PER_PERSON = 50000;

  const results = React.useMemo(() => {
    const peopleMultiplier = isCouple ? 2 : 1;
    const effectiveAnnualContribution = Math.min(ANNUAL_CAP_PER_PERSON * peopleMultiplier, annualContribution * peopleMultiplier);
    const rawTotal = effectiveAnnualContribution * yearsSaving;
    const cappedTotalContributions = Math.min(TOTAL_CAP_PER_PERSON * peopleMultiplier, rawTotal);

    // Concessional contributions suffer 15% super fund entry tax
    // 85% is eligible for release under the FHSS Act
    const releasedPrincipal = cappedTotalContributions * 0.85;

    // Compound deemed SIC associated earnings over the period (approximate mid-period accumulation)
    const averageBalance = releasedPrincipal / 2;
    const totalDeemedEarnings = averageBalance * (sicEarningsRate / 100) * yearsSaving;

    const totalReleaseBeforeTax = releasedPrincipal + totalDeemedEarnings;

    // Tax on release: Marginal tax rate minus 30% tax offset
    const effectiveReleaseTaxRate = Math.max(0, (marginalTaxRate - 30) / 100);
    const releaseTaxWithheld = totalReleaseBeforeTax * effectiveReleaseTaxRate;
    const netDepositReleased = totalReleaseBeforeTax - releaseTaxWithheld;

    // Tax savings vs saving in a standard bank savings account
    // In bank: taxed at marginal rate (39%) vs in super: taxed at 15% => 24% tax arbitrage
    const taxArbitrageSavings = cappedTotalContributions * ((marginalTaxRate - 15) / 100);
    const earningsArbitrage = totalDeemedEarnings * 0.35; // Better return than taxed bank interest
    const totalDepositBoost = taxArbitrageSavings + earningsArbitrage;

    return {
      cappedTotalContributions,
      releasedPrincipal,
      totalDeemedEarnings,
      totalReleaseBeforeTax,
      releaseTaxWithheld,
      netDepositReleased,
      totalDepositBoost,
      maxCap: TOTAL_CAP_PER_PERSON * peopleMultiplier,
    };
  }, [annualContribution, yearsSaving, isCouple, marginalTaxRate, sicEarningsRate]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian First Home Super Saver Scheme (FHSS) Calculator',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian First Home Super Saver (FHSS) calculator. Calculate $50k individual ($100k couple) voluntary contributions, 15% tax savings, deemed SIC associated earnings, and net deposit release.',
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
        <span className="text-slate-900 font-bold">First Home Super Saver (FHSS)</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <PiggyBank className="w-3.5 h-3.5" />
          <span>Treasury First Home Super Saver Scheme (FHSS)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          First Home Super Saver Scheme (FHSS) Maximum Release Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Quantify the tax-advantaged home deposit release under the legislated $50,000 individual ($100,000 couple) FHSS rules, compute deemed ATO Shortfall Interest Charge (SIC) earnings, and calculate your total deposit boost over bank savings.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Voluntary Savings Strategy</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Cap: ${results.maxCap.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Buying Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsCouple(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  !isCouple ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Single Buyer ($50k Cap)
              </button>
              <button
                type="button"
                onClick={() => setIsCouple(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  isCouple ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Couple ($100k Combined)
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Annual Salary Sacrifice / Voluntary Super ($ AUD / person)</span>
              <span className="text-xs text-amber-800 font-mono">${annualContribution.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="1000"
              max={15000}
              step="1000"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Math.min(15000, Math.max(0, Number(e.target.value))))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
            <p className="text-[11px] text-slate-500">Statutory limit is strictly $15,000 per person per financial year.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Years of Voluntary Contributions</span>
              <span className="text-xs text-amber-800 font-mono">{yearsSaving} Years</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={yearsSaving}
              onChange={(e) => setYearsSaving(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Marginal Tax Bracket</label>
            <select
              value={marginalTaxRate}
              onChange={(e) => setMarginalTaxRate(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs bg-white"
            >
              <option value={18}>18% (16% + 2% Medicare)</option>
              <option value={32}>32% (30% + 2% Medicare)</option>
              <option value={39}>39% (37% + 2% Medicare)</option>
              <option value={47}>47% (45% + 2% Medicare)</option>
            </select>
          </div>
        </div>

        {/* Calculation Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Net Deposit Released Into Bank
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                ATO Determination
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.netDepositReleased).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD Net</span>
              </div>
              <p className="text-xs text-slate-400">
                Gross Release (Principal + Deemed Earnings): ${Math.round(results.totalReleaseBeforeTax).toLocaleString()} AUD
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Total Deposit Boost (vs Bank)</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                  +${Math.round(results.totalDepositBoost).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Deemed SIC Associated Earnings</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  +${Math.round(results.totalDeemedEarnings).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Critical FHSS Statutory Sequencing Rule
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>CRITICAL WARNING:</strong> You MUST apply for and receive an official <strong>FHSS Determination from the ATO</strong> before signing any contract to purchase or construct a home. If you sign a contract before requesting a determination, you are permanently barred from releasing your funds under the scheme!
            </p>
          </div>
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            First Home Super Saver Scheme (FHSS) Overview
          </h2>
          <p>
            Enacted by the Commonwealth Parliament, the First Home Super Saver Scheme allows first home buyers to save for their deposit inside the tax-concessional superannuation environment. Individuals can make voluntary concessional (pre-tax) and non-concessional (after-tax) contributions of up to $15,000 per financial year, up to an aggregate lifetime limit of $50,000 per person ($100,000 for couples).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Associated Earnings and 30% Tax Offset
          </h2>
          <p>
            When funds are released, the ATO credits deemed associated earnings calculated using the 90-day Bank Bill rate plus three percentage points (the Shortfall Interest Charge rate), compounding daily. Concessional contributions and earnings are released with a 30% statutory tax offset against your marginal tax rate.
          </p>
        </section>
      </article>
    </div>
  );
}

