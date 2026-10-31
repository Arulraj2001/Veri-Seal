'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
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
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function AustralianGstCalculatorPage() {
  const [calculationMode, setCalculationMode] = React.useState<'add' | 'remove' | 'bas'>('add');
  const [amount, setAmount] = React.useState<number>(1000);

  // BAS Mode State
  const [grossSales, setGrossSales] = React.useState<number>(45000);
  const [gstFreeSales, setGstFreeSales] = React.useState<number>(5000);
  const [businessPurchases, setBusinessPurchases] = React.useState<number>(18000);

  // Calculations
  const simpleGst = React.useMemo(() => {
    if (calculationMode === 'add') {
      const gstAmount = amount * 0.10;
      const totalInclusive = amount + gstAmount;
      return {
        exclusive: amount,
        gst: gstAmount,
        inclusive: totalInclusive,
      };
    } else {
      // Removing GST: GST is 1/11th of total inclusive price
      const gstAmount = amount / 11;
      const totalExclusive = amount - gstAmount;
      return {
        exclusive: totalExclusive,
        gst: gstAmount,
        inclusive: amount,
      };
    }
  }, [amount, calculationMode]);

  const basSummary = React.useMemo(() => {
    const taxableSales = Math.max(0, grossSales - gstFreeSales);
    const gstCollected1A = taxableSales / 11;
    const gstPaid1B = businessPurchases / 11;
    const netGst = gstCollected1A - gstPaid1B;

    return {
      grossSales,
      gstFreeSales,
      taxableSales,
      gstCollected1A,
      gstPaid1B,
      netGst,
      isPayable: netGst >= 0,
    };
  }, [grossSales, gstFreeSales, businessPurchases]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian GST 10% & BAS Activity Statement Calculator',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian GST calculator under the A New Tax System (Goods and Services Tax) Act 1999. Calculate 10% GST addition, 1/11th removal, and quarterly BAS net refunds/payables.',
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
        <span className="text-slate-900 font-bold">Australian GST &amp; BAS Tool</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Calculator className="w-3.5 h-3.5" />
          <span>A New Tax System (GST) Act 1999</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Australian GST 10% &amp; Business Activity Statement (BAS) Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Calculate 10% Goods and Services Tax additions, 1/11th GST removals from inclusive invoices, and quarterly BAS 1A vs 1B reconciliation for ATO compliance.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setCalculationMode('add')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            calculationMode === 'add'
              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Add 10% GST (Exclusive &rarr; Inclusive)
        </button>
        <button
          type="button"
          onClick={() => setCalculationMode('remove')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            calculationMode === 'remove'
              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Remove 1/11th GST (Inclusive &rarr; Exclusive)
        </button>
        <button
          type="button"
          onClick={() => setCalculationMode('bas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            calculationMode === 'bas'
              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Quarterly BAS Reconciliation (1A vs 1B)
        </button>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {calculationMode !== 'bas' ? (
          <>
            {/* Simple Calculation Inputs */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-base font-black text-slate-900">
                  {calculationMode === 'add' ? 'GST-Exclusive Amount' : 'GST-Inclusive Amount'}
                </h2>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  10.0% Statutory
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Enter Price ($ AUD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-slate-900 font-bold text-base"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900">ATO Statutory Rule:</span>
                <p>
                  When quoting prices to Australian consumers (B2C), the displayed price must always include GST under the Australian Consumer Law (ACL).
                </p>
              </div>
            </div>

            {/* Simple Outputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    {calculationMode === 'add' ? 'Total Price (Inc. GST)' : 'Net Amount (Ex. GST)'}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                    GST Portion: ${simpleGst.gst.toFixed(2)}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  ${(calculationMode === 'add' ? simpleGst.inclusive : simpleGst.exclusive).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-center">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">GST Exclusive</div>
                    <div className="text-base sm:text-lg font-black text-white mt-1">
                      ${simpleGst.exclusive.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">GST Payable (10%)</div>
                    <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                      ${simpleGst.gst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* BAS Mode Grid */
          <>
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-slate-900">Quarterly Figures (AUD)</h2>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  Quarterly BAS
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Total Gross Sales (G1)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={grossSales}
                  onChange={(e) => setGrossSales(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">GST-Free / Export Sales (G3/G4)</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={gstFreeSales}
                  onChange={(e) => setGstFreeSales(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Gross Business Purchases (G11)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={businessPurchases}
                  onChange={(e) => setBusinessPurchases(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Net GST Position (Label 1A minus 1B)
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    basSummary.isPayable ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {basSummary.isPayable ? 'Payable to ATO' : 'ATO Refund'}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  ${Math.abs(Math.round(basSummary.netGst)).toLocaleString()}
                  <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">
                    {basSummary.isPayable ? 'AUD to Pay' : 'AUD Refund'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">1A: GST on Sales</div>
                    <div className="text-base sm:text-lg font-black text-rose-400 mt-1">
                      ${Math.round(basSummary.gstCollected1A).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">1B: GST on Purchases</div>
                    <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                      ${Math.round(basSummary.gstPaid1B).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guide */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Australian GST Statutory Architecture (GST Act 1999)
          </h2>
          <p>
            Introduced on 1 July 2000, Australia&apos;s Goods and Services Tax is a broad-based consumption tax of 10% levied on most supplies of goods, services, and intangibles. An enterprise must register for GST when its current or projected GST turnover reaches or exceeds $75,000 ($150,000 for non-profit organizations), or immediately upon commencing taxi, limousine, or ride-sourcing operations (e.g., Uber), irrespective of turnover.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            GST-Free vs Input Taxed Supplies Distinction
          </h2>
          <p>
            The statutory distinction between &apos;GST-free&apos; and &apos;input taxed&apos; supplies is critical for Australian enterprise accounting:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>GST-Free Supplies (Division 38):</strong> No GST is charged on the sale, yet the business retains the legal entitlement to claim input tax credits on business purchases incurred in making the supply (e.g., basic foodstuffs, medical services, prescription medications, education).
            </li>
            <li>
              <strong>Input Taxed Supplies (Division 40):</strong> No GST is charged on the supply (e.g., residential rent, financial supplies, loans), but the enterprise is legally prohibited from claiming input tax credits on the purchases related to those supplies.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

