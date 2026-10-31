'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Car,
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
  Zap,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function FbtCarCalculatorPage() {
  const [method, setMethod] = React.useState<'statutory' | 'operating' | 'ev'>('statutory');
  const [carBaseValue, setCarBaseValue] = React.useState<number>(55000);
  const [heldOver4Years, setHeldOver4Years] = React.useState<boolean>(false);
  const [daysAvailable, setDaysAvailable] = React.useState<number>(365);
  const [recipientContribution, setRecipientContribution] = React.useState<number>(0);

  // Operating Cost Mode
  const [annualRunningCosts, setAnnualRunningCosts] = React.useState<number>(12000); // fuel, insurance, rego, repairs, deemed interest
  const [privateUsePercentage, setPrivateUsePercentage] = React.useState<number>(40);

  // Statutory Rates FBTAA 1986
  const FBT_RATE = 0.47; // 47%
  const TYPE_1_GROSS_UP = 2.0802; // When GST credit claimed
  const STATUTORY_FRACTION = 0.20; // 20% flat rate

  const results = React.useMemo(() => {
    if (method === 'ev') {
      return {
        taxableValue: 0,
        grossedUpValue: 0,
        fbtPayable: 0,
        isEvExempt: true,
        optimalContribution: 0,
      };
    }

    let taxableValue = 0;

    if (method === 'statutory') {
      // 1/3 discount if car owned > 4 full FBT years
      const adjustedBaseValue = heldOver4Years ? carBaseValue * (2 / 3) : carBaseValue;
      const baseStatutoryValue = (adjustedBaseValue * STATUTORY_FRACTION * daysAvailable) / 365;
      taxableValue = Math.max(0, baseStatutoryValue - recipientContribution);
    } else {
      // Operating Cost Method: Total costs * Private % - Contribution
      const privatePortion = annualRunningCosts * (privateUsePercentage / 100);
      taxableValue = Math.max(0, privatePortion - recipientContribution);
    }

    const grossedUpValue = taxableValue * TYPE_1_GROSS_UP;
    const fbtPayable = grossedUpValue * FBT_RATE;
    const optimalContribution = taxableValue; // Contributing after-tax eliminates FBT

    return {
      taxableValue,
      grossedUpValue,
      fbtPayable,
      isEvExempt: false,
      optimalContribution,
    };
  }, [method, carBaseValue, heldOver4Years, daysAvailable, recipientContribution, annualRunningCosts, privateUsePercentage]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian FBT Car Fringe Benefit Calculator (FBTAA 1986)',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian Fringe Benefits Tax (FBT) car calculator under FBTAA 1986. Calculate Statutory Formula (20%), Operating Cost logbook method, and EV discount exemptions.',
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
        <span className="text-slate-900 font-bold">FBT Car Fringe Benefit</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Car className="w-3.5 h-3.5" />
          <span>Fringe Benefits Tax Assessment Act 1986</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          FBT Car Fringe Benefit Calculator (Statutory Formula &amp; Operating Cost)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Compute employer Fringe Benefits Tax liabilities on company passenger vehicles under the 20% statutory formula, evaluate logbook operating costs, and assess the Electric Vehicle (EV) zero-FBT exemption.
        </p>
      </div>

      {/* Method Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setMethod('statutory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            method === 'statutory'
              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Statutory Formula Method (20%)
        </button>
        <button
          type="button"
          onClick={() => setMethod('operating')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            method === 'operating'
              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Operating Cost Method (Logbook)
        </button>
        <button
          type="button"
          onClick={() => setMethod('ev')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
            method === 'ev'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Electric Vehicle (EV) Exemption</span>
        </button>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Vehicle &amp; Use Details</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              FBT Rate: 47%
            </span>
          </div>

          {method !== 'operating' ? (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Car Cost Base ($ AUD)</span>
                  <span className="text-xs text-amber-800 font-mono">${carBaseValue.toLocaleString()}</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="2000"
                  value={carBaseValue}
                  onChange={(e) => setCarBaseValue(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
                />
                <p className="text-[11px] text-slate-500">
                  Includes purchase price, GST, dealer delivery and accessories. Excludes stamp duty and registration.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Car Held Over 4 Full FBT Years?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHeldOver4Years(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      !heldOver4Years ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    No (Full Base)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeldOver4Years(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      heldOver4Years ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Yes (1/3 Base Discount)
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Days Available for Private Use</span>
                  <span className="text-xs text-amber-800 font-mono">{daysAvailable} Days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={daysAvailable}
                  onChange={(e) => setDaysAvailable(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Total Annual Operating Costs ($ AUD)</span>
                  <span className="text-xs text-amber-800 font-mono">${annualRunningCosts.toLocaleString()}</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={annualRunningCosts}
                  onChange={(e) => setAnnualRunningCosts(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
                />
                <p className="text-[11px] text-slate-500">Includes fuel, maintenance, registration, insurance, and deemed interest/depreciation.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Logbook Private Use Percentage (%)</span>
                  <span className="text-xs text-amber-800 font-mono">{privateUsePercentage}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={privateUsePercentage}
                  onChange={(e) => setPrivateUsePercentage(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>
            </>
          )}

          {/* Recipient Contribution */}
          {method !== 'ev' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Employee Post-Tax Contribution ($ AUD)</span>
                <span className="text-xs text-amber-800 font-mono">${recipientContribution.toLocaleString()}</span>
              </label>
              <input
                type="number"
                min="0"
                step="500"
                value={recipientContribution}
                onChange={(e) => setRecipientContribution(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-900 text-xs"
              />
              <p className="text-[11px] text-slate-500">
                Employee after-tax cash contributions dollar-for-dollar reduce taxable FBT value.
              </p>
            </div>
          )}
        </div>

        {/* Calculation Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Net FBT Liability (Employer Payable)
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                Type 1 Gross-Up (2.0802)
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.fbtPayable).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD FBT</span>
              </div>
              <p className="text-xs text-slate-400">
                {results.isEvExempt
                  ? 'Eligible Electric Vehicle under LCT threshold: 100% Exempt from FBT.'
                  : `Base Taxable Fringe Benefit Value: $${Math.round(results.taxableValue).toLocaleString()} AUD`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Taxable Value</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  ${Math.round(results.taxableValue).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Grossed-Up Value</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  ${Math.round(results.grossedUpValue).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              FBT Optimization Strategy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By contributing <strong>${Math.round(results.optimalContribution).toLocaleString()}</strong> in post-tax cash as an employee recipient payment, the taxable value drops to $0, eliminating the entire ${Math.round(results.fbtPayable).toLocaleString()} FBT liability.
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
            Fringe Benefits Tax Assessment Act 1986: Car Fringe Benefits
          </h2>
          <p>
            A car fringe benefit arises when an employer makes a car available for the private use of an employee (or their associate), including garaging the vehicle at the employee&apos;s residence overnight. The FBT year runs from 1 April to 31 March, and the statutory tax rate is 47%.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Electric Car Discount Act 2022
          </h2>
          <p>
            To accelerate zero-emission vehicle adoption, the Federal Government enacted the Treasury Laws Amendment (Electric Car Discount) Act 2022. Eligible battery electric vehicles (BEVs) and hydrogen fuel cell electric vehicles first held and used on or after 1 July 2022 are completely exempt from FBT, provided the retail price at first purchase was beneath the fuel-efficient Luxury Car Tax (LCT) threshold ($91,387+).
          </p>
        </section>
      </article>
    </div>
  );
}

