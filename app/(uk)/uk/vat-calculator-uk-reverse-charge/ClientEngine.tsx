'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
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
  Copy,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface VatResult {
  netAmount: number;
  vatRatePercent: number;
  vatAmount: number;
  grossAmount: number;
  isReverseCharge: boolean;
  reverseChargeNotice: string;
}

export default function VatUkPage() {
  const [calculationMode, setCalculationMode] = React.useState<'add' | 'remove'>('add');
  const [amount, setAmount] = React.useState<number>(1000);
  const [vatRate, setVatRate] = React.useState<'standard' | 'reduced' | 'zero' | 'reverse_charge_20' | 'reverse_charge_5'>('standard');
  const [copied, setCopiado] = React.useState<boolean>(false);

  const calculateVat = React.useCallback((): VatResult => {
    const raw = Math.max(0, amount);
    let rate = 0.20;
    let isReverse = false;

    if (vatRate === 'standard') {
      rate = 0.20;
    } else if (vatRate === 'reduced') {
      rate = 0.05;
    } else if (vatRate === 'zero') {
      rate = 0.00;
    } else if (vatRate === 'reverse_charge_20') {
      rate = 0.20;
      isReverse = true;
    } else if (vatRate === 'reverse_charge_5') {
      rate = 0.05;
      isReverse = true;
    }

    let net = 0;
    let vat = 0;
    let gross = 0;

    if (calculationMode === 'add') {
      net = raw;
      vat = isReverse ? 0 : net * rate;
      gross = net + vat;
    } else {
      gross = raw;
      if (isReverse || rate === 0) {
        net = gross;
        vat = 0;
      } else {
        net = gross / (1 + rate);
        vat = gross - net;
      }
    }

    const reverseChargeNotice = isReverse
      ? `Reverse charge: VAT Act 1994 Section 55A applies. Customer to pay the VAT to HMRC at ${(rate * 100).toFixed(0)}% (VAT amount of £${(net * rate).toFixed(2)} to be accounted for by the contractor on their VAT Return).`
      : '';

    return {
      netAmount: net,
      vatRatePercent: rate * 100,
      vatAmount: isReverse ? net * rate : vat,
      grossAmount: gross,
      isReverseCharge: isReverse,
      reverseChargeNotice,
    };
  }, [calculationMode, amount, vatRate]);

  const res = calculateVat();

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 }).format(val);

  const copyNotice = () => {
    if (res.reverseChargeNotice) {
      navigator.clipboard.writeText(res.reverseChargeNotice);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

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
                name: 'UK VAT & Domestic Reverse Charge Calculator (Value Added Tax Act 1994)',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate UK Value Added Tax (VAT) at Standard 20%, Reduced 5%, and Zero 0% rates, with support for the Construction Industry Scheme (CIS) Domestic Reverse Charge under Section 55A VATA 1994.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is the UK VAT Domestic Reverse Charge for construction services?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Under Section 55A of the Value Added Tax Act 1994, the domestic reverse charge applies to supplies of building and construction services reported under the Construction Industry Scheme (CIS). The subcontractor does not charge or receive VAT; instead, the customer (contractor) accounts for the output VAT on their own VAT Return.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What mandatory text must appear on a VAT reverse charge invoice?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'HMRC regulations state that the invoice must clearly state that the reverse charge applies and state the amount of VAT due or the rate of VAT. For example: "Reverse charge: VAT Act 1994 Section 55A applies. Customer to pay the VAT to HMRC."',
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
          <span className="text-slate-800 font-medium">UK VAT &amp; Domestic Reverse Charge</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Percent className="w-3.5 h-3.5" />
            Value Added Tax Act 1994 &amp; Section 55A
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            UK VAT &amp; Reverse Charge Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Add or remove UK VAT at 20%, 5%, or 0%, and generate compliant CIS domestic reverse charge invoice wording.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Coins className="w-5 h-5 text-indigo-900" />
              VAT Parameters
            </h2>

            {/* Calculation Mode */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Operation</label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setCalculationMode('add')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    calculationMode === 'add'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Add VAT to Net Amount
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationMode('remove')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    calculationMode === 'remove'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Extract / Remove VAT from Gross
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {calculationMode === 'add' ? 'Net Amount (£)' : 'Gross Amount Including VAT (£)'}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={amount || ''}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>

            {/* VAT Rate Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Statutory VAT Rate</label>
              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => setVatRate('standard')}
                  className={`w-full p-2.5 rounded-xl border text-left font-medium transition ${
                    vatRate === 'standard'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Standard Rate (20%) — Most goods and services
                </button>
                <button
                  type="button"
                  onClick={() => setVatRate('reduced')}
                  className={`w-full p-2.5 rounded-xl border text-left font-medium transition ${
                    vatRate === 'reduced'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Reduced Rate (5%) — Domestic energy, energy-saving materials
                </button>
                <button
                  type="button"
                  onClick={() => setVatRate('zero')}
                  className={`w-full p-2.5 rounded-xl border text-left font-medium transition ${
                    vatRate === 'zero'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Zero Rate (0%) — Books, children&apos;s clothes, basic food
                </button>
                <button
                  type="button"
                  onClick={() => setVatRate('reverse_charge_20')}
                  className={`w-full p-2.5 rounded-xl border text-left font-medium transition ${
                    vatRate === 'reverse_charge_20'
                      ? 'border-indigo-900 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  CIS Domestic Reverse Charge (20%) — Construction Subcontractors
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>VAT Breakdown</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  {res.isReverseCharge ? 'Reverse Charge' : `${res.vatRatePercent.toFixed(0)}% Rate`}
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  {res.isReverseCharge ? 'Invoice Payable by Contractor' : 'Total Gross Payable'}
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {res.isReverseCharge ? formatGBP(res.netAmount) : formatGBP(res.grossAmount)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>VAT Component:</span>
                  <span className="font-bold text-indigo-300">{formatGBP(res.vatAmount)}</span>
                </div>
              </div>

              {/* Summary Details */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Net Amount:</span>
                  <span className="font-semibold text-slate-900">{formatGBP(res.netAmount)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">VAT Rate:</span>
                  <span className="font-semibold text-slate-900">{res.vatRatePercent.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">VAT Due:</span>
                  <span className="font-bold text-indigo-900">{formatGBP(res.vatAmount)}</span>
                </div>
                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Gross (incl. VAT):</span>
                  <span className="font-bold text-slate-900">{formatGBP(res.grossAmount)}</span>
                </div>
              </div>

              {/* Reverse Charge Copy Box */}
              {res.isReverseCharge && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Mandatory Invoice Notice:</span>
                    <button
                      type="button"
                      onClick={copyNotice}
                      className="flex items-center gap-1 text-[11px] font-bold text-indigo-900 hover:underline"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="font-mono text-[11px] text-slate-700 leading-relaxed bg-white p-2 rounded-lg border border-slate-200">
                    {res.reverseChargeNotice}
                  </p>
                </div>
              )}
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                HMRC Notice 700 &amp; Section 55A
              </div>
              <p className="text-indigo-900/80">
                When the domestic reverse charge applies, the customer accounts for the VAT to HMRC directly on their VAT return, rather than paying the VAT to the subcontractor.
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
              UK Value Added Tax (VAT) Law &amp; Construction Domestic Reverse Charge
            </h2>
            <p>
              Value Added Tax in the United Kingdom is governed by the <strong>Value Added Tax Act 1994 (VATA 1994)</strong> and secondary regulations enacted under statutory instruments. A taxable person whose VAT taxable turnover exceeds the registration threshold (currently £90,000) is legally mandated to register for VAT with HMRC, charge VAT on supplies, and submit quarterly digital returns via Making Tax Digital (MTD).
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              How the CIS Domestic Reverse Charge Operates (s.55A VATA 1994)
            </h3>
            <p>
              Introduced under Section 55A of VATA 1994 to counter carousel fraud and missing-trader supply chain fraud in construction, the domestic reverse charge fundamentally changes who pays the VAT to HMRC:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Scope:</strong> Applies to standard and reduced-rate supplies of building services that are also subject to reporting under the Construction Industry Scheme (CIS).
              </li>
              <li>
                <strong>Invoicing:</strong> The subcontractor issues an invoice showing the net supply amount, specifies the applicable VAT rate (20% or 5%), but <em>does not charge or collect</em> the VAT sum from the main contractor.
              </li>
              <li>
                <strong>Customer Accounting:</strong> The contractor reports both the input tax and the output tax on their own VAT return.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

