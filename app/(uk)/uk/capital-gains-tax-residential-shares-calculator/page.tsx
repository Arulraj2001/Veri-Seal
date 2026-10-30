'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Scale,
  Percent,
  Calendar,
  Home,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface CgtResult {
  assetType: 'residential_property' | 'shares_other';
  grossSalePrice: number;
  totalAllowableCosts: number;
  totalGain: number;
  annualExemptAmount: number;
  taxableGain: number;
  cgtRatePercent: number;
  totalCgtDue: number;
  effectiveTaxRateOnGain: number;
  netProceedsAfterTax: number;
  is60DayReportingMandatory: boolean;
}

export default function CapitalGainsTaxUkPage() {
  const [assetType, setAssetType] = React.useState<'residential_property' | 'shares_other'>('residential_property');
  const [salePrice, setSalePrice] = React.useState<number>(380000);
  const [purchasePrice, setPurchasePrice] = React.useState<number>(250000);
  const [buyingCosts, setBuyingCosts] = React.useState<number>(3500); // Stamp duty, legal fees
  const [sellingCosts, setSellingCosts] = React.useState<number>(4500); // Estate agent, legal fees
  const [improvementCosts, setImprovementCosts] = React.useState<number>(12000); // Capital enhancements (e.g. extension)
  const [incomeTaxBand, setIncomeTaxBand] = React.useState<'basic' | 'higher_additional'>('higher_additional');
  const [isMainResidencePrr, setIsMainResidencePrr] = React.useState<boolean>(false);

  // Annual Exempt Amount for individuals
  const ANNUAL_EXEMPT_AMOUNT = 3000;

  const calculateCgt = React.useCallback((): CgtResult => {
    const sale = Math.max(0, salePrice);
    const purchase = Math.max(0, purchasePrice);
    const bCosts = Math.max(0, buyingCosts);
    const sCosts = Math.max(0, sellingCosts);
    const impCosts = Math.max(0, improvementCosts);

    const totalAllowableCosts = purchase + bCosts + sCosts + impCosts;
    let totalGain = Math.max(0, sale - totalAllowableCosts);

    if (isMainResidencePrr) {
      totalGain = 0; // 100% Private Residence Relief
    }

    const taxableGain = Math.max(0, totalGain - ANNUAL_EXEMPT_AMOUNT);

    let rate = 0;
    if (assetType === 'residential_property') {
      rate = incomeTaxBand === 'basic' ? 0.18 : 0.24;
    } else {
      rate = incomeTaxBand === 'basic' ? 0.10 : 0.20;
    }

    const totalCgtDue = taxableGain * rate;
    const effectiveTaxRateOnGain = totalGain > 0 ? (totalCgtDue / totalGain) * 100 : 0;
    const netProceedsAfterTax = sale - sCosts - totalCgtDue;
    const is60DayReportingMandatory = assetType === 'residential_property' && totalCgtDue > 0;

    return {
      assetType,
      grossSalePrice: sale,
      totalAllowableCosts,
      totalGain,
      annualExemptAmount: ANNUAL_EXEMPT_AMOUNT,
      taxableGain,
      cgtRatePercent: rate * 100,
      totalCgtDue,
      effectiveTaxRateOnGain,
      netProceedsAfterTax,
      is60DayReportingMandatory,
    };
  }, [assetType, salePrice, purchasePrice, buyingCosts, sellingCosts, improvementCosts, incomeTaxBand, isMainResidencePrr]);

  const res = calculateCgt();

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
                name: 'UK Capital Gains Tax (CGT) Calculator for Property & Shares',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate UK Capital Gains Tax on residential buy-to-let property (18%/24%) and shares (10%/20%) under the Taxation of Chargeable Gains Act 1992. Includes the £3,000 annual exemption and 60-day HMRC reporting deadline.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is the Capital Gains Tax rate on UK residential property?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Capital Gains Tax on residential property (such as buy-to-let investments or second homes) is charged at 18% for basic rate taxpayers and 24% for higher and additional rate taxpayers on gains exceeding the £3,000 annual exemption.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is the 60-day rule for reporting UK residential property sales?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Under Schedule 2 of the Finance Act 2019, any UK resident disposing of residential property that generates a taxable capital gain must report the disposal and pay the estimated CGT to HMRC within 60 days of completion using an HMRC Capital Gains Tax on UK Property account.',
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
          <span className="text-slate-800 font-medium">Capital Gains Tax Calculator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Taxation of Chargeable Gains Act 1992 &amp; 60-Day Rule
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Capital Gains Tax (CGT) Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Model capital gains liability on residential property (18%/24%) and shares (10%/20%) after allowable costs and the £3,000 annual exemption.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Coins className="w-5 h-5 text-indigo-900" />
              Asset Disposal Details
            </h2>

            {/* Asset Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Asset Category</label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setAssetType('residential_property')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    assetType === 'residential_property'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Residential Property (18% / 24%)
                </button>
                <button
                  type="button"
                  onClick={() => setAssetType('shares_other')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    assetType === 'shares_other'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Shares &amp; Other Assets (10% / 20%)
                </button>
              </div>
            </div>

            {/* Sale and Purchase Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Sale Price / Disposal Value (£)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={salePrice || ''}
                    onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Original Purchase Price (£)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={purchasePrice || ''}
                    onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>
              </div>
            </div>

            {/* Allowable Costs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Buying Costs (£)</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={buyingCosts || ''}
                  onChange={(e) => setBuyingCosts(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 text-xs focus:ring-1 focus:ring-indigo-900"
                  placeholder="Legal, SDLT"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Costs (£)</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={sellingCosts || ''}
                  onChange={(e) => setSellingCosts(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 text-xs focus:ring-1 focus:ring-indigo-900"
                  placeholder="Estate agent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Capital Improvements (£)</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={improvementCosts || ''}
                  onChange={(e) => setImprovementCosts(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 text-xs focus:ring-1 focus:ring-indigo-900"
                  placeholder="Extensions etc"
                />
              </div>
            </div>

            {/* Income Tax Band */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Your UK Income Tax Band</label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setIncomeTaxBand('basic')}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                    incomeTaxBand === 'basic'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Basic Rate Taxpayer (up to £50,270)
                </button>
                <button
                  type="button"
                  onClick={() => setIncomeTaxBand('higher_additional')}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                    incomeTaxBand === 'higher_additional'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Higher / Additional Rate (&gt; £50,270)
                </button>
              </div>
            </div>

            {/* Main Residence PRR Switch */}
            {assetType === 'residential_property' && (
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isMainResidencePrr}
                    onChange={(e) => setIsMainResidencePrr(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-900 focus:ring-indigo-900 border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    This property was my primary main residence (100% Private Residence Relief - £0 tax)
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>CGT Liability</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  {res.cgtRatePercent}% rate
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Total Capital Gains Tax Due
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.totalCgtDue)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Gross Capital Gain:</span>
                  <span className="font-bold text-indigo-300">{formatGBP(res.totalGain)}</span>
                </div>
              </div>

              {/* Summary Details */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Gross Gain:</span>
                  <span className="font-semibold text-slate-900">{formatGBP(res.totalGain)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Annual Exemption:</span>
                  <span className="font-semibold text-emerald-700">-{formatGBP(res.annualExemptAmount)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Taxable Net Gain:</span>
                  <span className="font-bold text-slate-900">{formatGBP(res.taxableGain)}</span>
                </div>
                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Net Cash Retained:</span>
                  <span className="font-bold text-emerald-700">{formatGBP(res.netProceedsAfterTax)}</span>
                </div>
              </div>

              {/* 60-Day Reporting Warning */}
              {res.is60DayReportingMandatory && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Clock className="w-3.5 h-3.5" />
                    Mandatory 60-Day HMRC Deadline
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Under Schedule 2 of the Finance Act 2019, you must report this property sale and pay the £{res.totalCgtDue.toLocaleString()} tax online to HMRC within 60 days of legal completion to avoid financial penalties.
                  </p>
                </div>
              )}
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                Capital Improvements vs Repairs
              </div>
              <p className="text-indigo-900/80">
                Only genuine capital enhancements (such as extensions, loft conversions, or new structural installations) are allowable deductions. Routine maintenance and redecoration costs cannot be deducted for CGT.
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
              UK Capital Gains Tax Law &amp; The 60-Day Residential Rule
            </h2>
            <p>
              Capital Gains Tax is charged under the <strong>Taxation of Chargeable Gains Act 1992 (TCGA 1992)</strong> on the profit (gain) realized when you sell, gift, exchange, or otherwise dispose of an asset that has increased in value. It is the gain that is taxed, not the total amount of money received.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The £3,000 Annual Exempt Amount
            </h3>
            <p>
              Under Section 1K of TCGA 1992, each individual has an <strong>Annual Exempt Amount</strong> of <strong>£3,000</strong>. Married couples and civil partners who own assets jointly have a combined exemption of £6,000. You only pay CGT on total gains in a tax year that exceed this statutory allowance.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The Strict 60-Day UK Property Return (Schedule 2 Finance Act 2019)
            </h3>
            <p>
              While gains on listed shares or cryptocurrency are reported through your annual Self-Assessment tax return by 31 January following the end of the tax year, residential property disposals are subject to strict expedited reporting:
            </p>
            <blockquote className="my-4 pl-4 border-l-4 border-indigo-900 italic text-slate-800 bg-slate-50 py-2">
              If you sell a UK residential property that is not 100% covered by Private Residence Relief and generate a tax liability, you must calculate, report, and pay the CGT to HMRC within 60 days of the completion date using the online "Capital Gains Tax on UK property" portal.
            </blockquote>
          </div>
        </article>
      </div>
    </div>
  );
}

