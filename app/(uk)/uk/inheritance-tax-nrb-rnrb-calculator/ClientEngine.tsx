'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Percent,
  Home,
  AlertTriangle,
  Heart,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface IhtResult {
  totalEstateValue: number;
  homeValueInEstate: number;
  nrbAvailable: number;
  rnrbAvailable: number;
  totalTaxFreeAllowance: number;
  taxableEstate: number;
  ihtRatePercent: number;
  totalIhtDue: number;
  effectiveTaxRate: number;
  netEstateToBeneficiaries: number;
  hasSpousalTransfer: boolean;
  isRnrbTapered: boolean;
  rnrbTaperReduction: number;
}

export default function InheritanceTaxUkPage() {
  const [estateValue, setEstateValue] = React.useState<number>(850000);
  const [homeValue, setHomeValue] = React.useState<number>(450000);
  const [leavingHomeToDescendants, setLeavingHomeToDescendants] = React.useState<boolean>(true);
  const [transferSpousalAllowances, setTransferSpousalAllowances] = React.useState<boolean>(true);
  const [charityGiftPercent, setCharityGiftPercent] = React.useState<number>(0);

  const calculateIht = React.useCallback((): IhtResult => {
    const estate = Math.max(0, estateValue);
    const home = Math.max(0, homeValue);

    // 1. Nil-Rate Band (NRB): £325,000 per person
    const nrbPerPerson = 325000;
    const nrbAvailable = transferSpousalAllowances ? nrbPerPerson * 2 : nrbPerPerson;

    // 2. Residence Nil-Rate Band (RNRB): up to £175,000 per person
    // Only available if leaving residence to direct descendants (children, grandchildren)
    let baseRnrb = 0;
    if (leavingHomeToDescendants) {
      const maxRnrbPerPerson = 175000;
      const totalMaxRnrb = transferSpousalAllowances ? maxRnrbPerPerson * 2 : maxRnrbPerPerson;
      // Limited by actual home value
      baseRnrb = Math.min(home, totalMaxRnrb);
    }

    // RNRB Tapering: £1 lost for every £2 estate exceeds £2,000,000 (s.8D IHTA 1984)
    let rnrbTaperReduction = 0;
    let isRnrbTapered = false;
    if (estate > 2000000 && baseRnrb > 0) {
      isRnrbTapered = true;
      rnrbTaperReduction = (estate - 2000000) / 2;
    }

    const rnrbAvailable = Math.max(0, baseRnrb - rnrbTaperReduction);
    const totalTaxFreeAllowance = nrbAvailable + rnrbAvailable;

    const taxableEstate = Math.max(0, estate - totalTaxFreeAllowance);

    // Rate: 36% if 10%+ gifted to charity (Sch 1A IHTA 1984), else 40%
    const qualifiesCharityReducedRate = charityGiftPercent >= 10;
    const ihtRate = qualifiesCharityReducedRate ? 0.36 : 0.40;

    const totalIhtDue = taxableEstate * ihtRate;
    const effectiveTaxRate = estate > 0 ? (totalIhtDue / estate) * 100 : 0;
    const netEstateToBeneficiaries = Math.max(0, estate - totalIhtDue);

    return {
      totalEstateValue: estate,
      homeValueInEstate: home,
      nrbAvailable,
      rnrbAvailable,
      totalTaxFreeAllowance,
      taxableEstate,
      ihtRatePercent: ihtRate * 100,
      totalIhtDue,
      effectiveTaxRate,
      netEstateToBeneficiaries,
      hasSpousalTransfer: transferSpousalAllowances,
      isRnrbTapered,
      rnrbTaperReduction,
    };
  }, [estateValue, homeValue, leavingHomeToDescendants, transferSpousalAllowances, charityGiftPercent]);

  const res = calculateIht();

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

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
                name: 'UK Inheritance Tax (IHT) Calculator with NRB & RNRB',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate UK Inheritance Tax under the Inheritance Tax Act 1984. Models the £325,000 Nil-Rate Band, £175,000 Residence Nil-Rate Band, spousal transfer allowance (up to £1M tax-free), £2M taper rules, and the 36% charitable gift rate.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How can a married couple in the UK pass on up to £1,000,000 tax-free?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Each individual has a £325,000 Nil-Rate Band and a £175,000 Residence Nil-Rate Band (if leaving the main home to children or grandchildren). Under Section 8A of the Inheritance Tax Act 1984, any unused allowances transfer 100% to the surviving spouse or civil partner, allowing a married couple to pass on an estate of up to £1,000,000 completely free of Inheritance Tax.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'When does the £2 million Inheritance Tax taper threshold apply?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Under Section 8D of the Inheritance Tax Act 1984, if the net value of an estate exceeds £2,000,000 before reliefs, the Residence Nil-Rate Band is tapered by £1 for every £2 of excess value, disappearing entirely for estates over £2.35M for individuals or £2.7M for married couples.',
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
          <span className="text-slate-800 font-medium">Inheritance Tax (IHT) Estimator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            Inheritance Tax Act 1984 &amp; Finance (No. 2) Act 2015
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Inheritance Tax (IHT) Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Model estate tax liability with Nil-Rate Band (£325k), Residence Nil-Rate Band (£175k), spousal transfers (up to £1M), and £2M taper rules.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Coins className="w-5 h-5 text-indigo-900" />
              Estate Valuation &amp; Reliefs
            </h2>

            {/* Total Estate Value */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Total Net Estate Value (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={estateValue || ''}
                  onChange={(e) => setEstateValue(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Total value of all property, cash, investments, and personal assets minus debts and funeral costs.
              </span>
            </div>

            {/* Home Value */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Value of Main Residence Included in Estate (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={homeValue || ''}
                  onChange={(e) => setHomeValue(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>

            {/* Spousal Transfer Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={transferSpousalAllowances}
                  onChange={(e) => setTransferSpousalAllowances(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-900 focus:ring-indigo-900 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Transfer 100% of deceased spouse / civil partner&apos;s unused allowances (doubles threshold to up to £1,000,000)
                </span>
              </label>
            </div>

            {/* Descendants Toggle */}
            <div className="pt-1">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={leavingHomeToDescendants}
                  onChange={(e) => setLeavingHomeToDescendants(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-900 focus:ring-indigo-900 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Main residence is passed to direct descendants (children, grandchildren, adopted children) for RNRB
                </span>
              </label>
            </div>

            {/* Charitable Gift */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Charitable Bequest (% of Net Estate)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={charityGiftPercent || ''}
                  onChange={(e) => setCharityGiftPercent(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 font-medium text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
                <span className="absolute right-3.5 top-2.5 text-slate-400 font-semibold text-xs">%</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Donating 10% or more to charity reduces the standard IHT rate from 40% to 36% (Sch 1A IHTA 1984).
              </span>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Tax Assessment</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  {res.ihtRatePercent}% Rate
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Total Inheritance Tax Due
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.totalIhtDue)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Net Passed to Heirs:</span>
                  <span className="font-bold text-emerald-400">{formatGBP(res.netEstateToBeneficiaries)}</span>
                </div>
              </div>

              {/* Allowance Breakdown */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Nil-Rate Band (NRB):</span>
                  <span className="font-semibold text-emerald-700">{formatGBP(res.nrbAvailable)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Residence Nil-Rate Band (RNRB):</span>
                  <span className="font-semibold text-emerald-700">{formatGBP(res.rnrbAvailable)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Total Tax-Free Allowance:</span>
                  <span className="font-bold text-slate-900">{formatGBP(res.totalTaxFreeAllowance)}</span>
                </div>
                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Taxable Estate Portion:</span>
                  <span className="font-bold text-rose-600">{formatGBP(res.taxableEstate)}</span>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                HMRC 6-Month Payment Deadline
              </div>
              <p className="text-indigo-900/80">
                Inheritance Tax must be paid within 6 months after the end of the month in which the person died. Interest is charged on any outstanding balance thereafter.
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
              UK Inheritance Tax (IHT) Law &amp; Spousal Allowances
            </h2>
            <p>
              Inheritance Tax in the United Kingdom is governed by the <strong>Inheritance Tax Act 1984 (IHTA 1984)</strong>. It is a death levy charged at a flat rate of 40% on the value of a deceased person&apos;s estate (including property, cash, investments, and gifts made within 7 years of death) that exceeds available statutory nil-rate allowances.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The £1,000,000 Threshold for Married Couples
            </h3>
            <p>
              When a person dies and leaves their entire estate to their surviving legally married spouse or civil partner, the transfer is 100% exempt from IHT under Section 18 of IHTA 1984 (spousal exemption), and none of their nil-rate bands are consumed. Under Section 8A:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                The surviving partner inherits 100% of the deceased spouse&apos;s unused £325,000 Nil-Rate Band, giving the survivor a total <strong>£650,000 NRB</strong>.
              </li>
              <li>
                They also inherit 100% of the unused £175,000 Residence Nil-Rate Band, yielding an additional <strong>£350,000 RNRB</strong> when leaving a qualifying family home to children or grandchildren.
              </li>
              <li>
                This creates the celebrated <strong>£1,000,000 tax-free estate threshold</strong> for UK families.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

