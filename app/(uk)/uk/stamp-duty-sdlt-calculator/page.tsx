'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  TrendingDown,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Scale,
  Percent,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface SdltBand {
  range: string;
  rate: number;
  taxableAmount: number;
  taxDue: number;
}

interface SdltResult {
  purchasePrice: number;
  buyerType: string;
  isNonUkResident: boolean;
  totalSdlt: number;
  effectiveRate: number;
  bands: SdltBand[];
}

export default function StampDutySdltPage() {
  const [purchasePrice, setPurchasePrice] = React.useState<number>(425000);
  const [buyerType, setBuyerType] = React.useState<'first_time' | 'moving_home' | 'additional_home'>('first_time');
  const [isNonUkResident, setIsNonUkResident] = React.useState<boolean>(false);

  const calculateSdlt = React.useCallback((): SdltResult => {
    const price = Math.max(0, purchasePrice);
    const surcharge = (buyerType === 'additional_home' ? 0.03 : 0) + (isNonUkResident ? 0.02 : 0);
    const bands: SdltBand[] = [];
    let totalSdlt = 0;

    // First-Time Buyer Relief (Finance Act 2003 Sch 6ZA)
    // Only applies if purchase price is £625,000 or less
    const qualifiesFtb = buyerType === 'first_time' && price <= 625000;

    if (qualifiesFtb) {
      // 0% on up to £425,000 (+ surcharges if any)
      const band1Max = 425000;
      const band1Amount = Math.min(price, band1Max);
      const band1Rate = 0 + surcharge;
      const band1Tax = band1Amount * band1Rate;
      bands.push({
        range: 'Up to £425,000 (First-Time Buyer)',
        rate: band1Rate * 100,
        taxableAmount: band1Amount,
        taxDue: band1Tax,
      });
      totalSdlt += band1Tax;

      // 5% on £425,001 to £625,000
      if (price > 425000) {
        const band2Amount = price - 425000;
        const band2Rate = 0.05 + surcharge;
        const band2Tax = band2Amount * band2Rate;
        bands.push({
          range: '£425,001 to £625,000',
          rate: band2Rate * 100,
          taxableAmount: band2Amount,
          taxDue: band2Tax,
        });
        totalSdlt += band2Tax;
      }
    } else {
      // Standard Residential Bands (or FTB purchasing above £625k where relief is lost)
      // Band 1: £0 to £250,000 @ 0% (+ surcharge)
      const b1Amount = Math.min(price, 250000);
      const b1Rate = 0 + surcharge;
      const b1Tax = b1Amount * b1Rate;
      bands.push({
        range: 'Up to £250,000',
        rate: b1Rate * 100,
        taxableAmount: b1Amount,
        taxDue: b1Tax,
      });
      totalSdlt += b1Tax;

      // Band 2: £250,001 to £925,000 @ 5% (+ surcharge)
      if (price > 250000) {
        const b2Amount = Math.min(price, 925000) - 250000;
        const b2Rate = 0.05 + surcharge;
        const b2Tax = b2Amount * b2Rate;
        bands.push({
          range: '£250,001 to £925,000',
          rate: b2Rate * 100,
          taxableAmount: b2Amount,
          taxDue: b2Tax,
        });
        totalSdlt += b2Tax;
      }

      // Band 3: £925,001 to £1,500,000 @ 10% (+ surcharge)
      if (price > 925000) {
        const b3Amount = Math.min(price, 1500000) - 925000;
        const b3Rate = 0.10 + surcharge;
        const b3Tax = b3Amount * b3Rate;
        bands.push({
          range: '£925,001 to £1,500,000',
          rate: b3Rate * 100,
          taxableAmount: b3Amount,
          taxDue: b3Tax,
        });
        totalSdlt += b3Tax;
      }

      // Band 4: Over £1,500,000 @ 12% (+ surcharge)
      if (price > 1500000) {
        const b4Amount = price - 1500000;
        const b4Rate = 0.12 + surcharge;
        const b4Tax = b4Amount * b4Rate;
        bands.push({
          range: 'Over £1,500,000',
          rate: b4Rate * 100,
          taxableAmount: b4Amount,
          taxDue: b4Tax,
        });
        totalSdlt += b4Tax;
      }
    }

    const effectiveRate = price > 0 ? (totalSdlt / price) * 100 : 0;

    return {
      purchasePrice: price,
      buyerType:
        buyerType === 'first_time'
          ? 'First-Time Buyer'
          : buyerType === 'moving_home'
            ? 'Home Mover (Only Property)'
            : 'Additional Property / Buy-to-Let',
      isNonUkResident,
      totalSdlt,
      effectiveRate,
      bands,
    };
  }, [purchasePrice, buyerType, isNonUkResident]);

  const res = calculateSdlt();

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
                name: 'Stamp Duty Land Tax (SDLT) Calculator 2026/27 (England & NI)',
                applicationCategory: 'RealEstateApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate official Stamp Duty Land Tax for residential property in England and Northern Ireland under the Finance Act 2003. Includes First-Time Buyer Relief, additional property surcharge (+3%), and non-UK resident surcharge (+2%).',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is the First-Time Buyer SDLT threshold?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'First-time buyers pay 0% Stamp Duty on the first £425,000 of the property purchase price and 5% on the portion between £425,001 and £625,000. If the purchase price exceeds £625,000, First-Time Buyer relief is entirely withdrawn and standard rates apply.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'When does the 3% higher rate SDLT surcharge apply?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Under Schedule 4ZA of the Finance Act 2003, purchasers who already own one or more residential properties and purchase an additional dwelling (such as a buy-to-let investment or second home) worth £40,000 or more are subject to an additional 3% SDLT surcharge across all tax bands.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is the statutory deadline to submit an SDLT return to HMRC?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Pursuant to Section 76 of the Finance Act 2003, an SDLT return (Form SDLT5) must be submitted and any tax due paid within 14 days of the effective date of the transaction (usually the date of completion), normally handled by your conveyancer.',
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
          <span className="text-slate-800 font-medium">Stamp Duty (SDLT) Calculator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            Finance Act 2003 &amp; England / Northern Ireland
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Stamp Duty Land Tax (SDLT) Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Calculate your exact Stamp Duty obligation with First-Time Buyer Relief, +3% buy-to-let surcharge, and +2% non-resident surcharge.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Coins className="w-5 h-5 text-indigo-900" />
              Property Transaction Details
            </h2>

            {/* Property Price */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Property Purchase Price (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={purchasePrice || ''}
                  onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  placeholder="425000"
                />
              </div>
            </div>

            {/* Buyer Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Purchaser Status
              </label>
              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => setBuyerType('first_time')}
                  className={`w-full p-3 rounded-xl border text-left font-medium transition ${
                    buyerType === 'first_time'
                      ? 'border-indigo-900 bg-indigo-50/80 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold">First-Time Buyer</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">0% up to £425k, 5% up to £625k (relief capped at £625k)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setBuyerType('moving_home')}
                  className={`w-full p-3 rounded-xl border text-left font-medium transition ${
                    buyerType === 'moving_home'
                      ? 'border-indigo-900 bg-indigo-50/80 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold">Home Mover (Only Residential Home)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Standard rates: 0% up to £250k, 5% on £250k–£925k</div>
                </button>
                <button
                  type="button"
                  onClick={() => setBuyerType('additional_home')}
                  className={`w-full p-3 rounded-xl border text-left font-medium transition ${
                    buyerType === 'additional_home'
                      ? 'border-indigo-900 bg-indigo-50/80 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold">Additional Property / Buy-to-Let / Second Home</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Includes +3% higher rates surcharge (Schedule 4ZA)</div>
                </button>
              </div>
            </div>

            {/* Non-UK Resident Surcharge */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isNonUkResident}
                  onChange={(e) => setIsNonUkResident(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-900 focus:ring-indigo-900 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Non-UK Resident (+2% additional SDLT surcharge under Schedule 9A)
                </span>
              </label>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Stamp Duty Summary</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  {res.effectiveRate.toFixed(2)}% effective
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Total Stamp Duty (SDLT) Due
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.totalSdlt)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Purchase Price:</span>
                  <span className="font-bold text-indigo-300">{formatGBP(res.purchasePrice)}</span>
                </div>
              </div>

              {/* Band Breakdown Table */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Tax Calculation by Band
                </h3>
                <div className="space-y-1.5 text-xs">
                  {res.bands.map((band, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-800">{band.range}</div>
                        <div className="text-[11px] text-slate-500">
                          {formatGBP(band.taxableAmount)} @ {band.rate.toFixed(1)}%
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">{formatGBP(band.taxDue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                HMRC Statutory Compliance
              </div>
              <p className="text-indigo-900/80">
                Calculations follow Section 55 of the Finance Act 2003 as amended. In Scotland, Land and Buildings Transaction Tax (LBTT) applies; in Wales, Land Transaction Tax (LTT) applies.
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
              The Statutory Mechanics of Stamp Duty Land Tax (SDLT)
            </h2>
            <p>
              Stamp Duty Land Tax (SDLT) is a progressive self-assessed tax levied on acquisitions of land and residential property in <strong>England and Northern Ireland</strong> under <strong>Part 4 of the Finance Act 2003</strong>. Rather than a flat slab system, SDLT is calculated as a 'slice' tax, where different marginal percentages apply strictly to portions of the consideration falling within statutory financial bands.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              First-Time Buyers&apos; Relief Rules (Schedule 6ZA)
            </h3>
            <p>
              To assist entry onto the housing ladder, Schedule 6ZA of the Finance Act 2003 provides relief for genuine first-time purchasers:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Threshold:</strong> 0% tax on the first <strong>£425,000</strong> of consideration, and 5% on the portion between £425,001 and £625,000.
              </li>
              <li>
                <strong>Hard Ceiling:</strong> If the purchase price exceeds <strong>£625,000</strong>, no relief is available whatsoever; the transaction defaults to standard home-mover rates (starting from £250,000).
              </li>
              <li>
                <strong>Condition Precedent:</strong> All joint purchasers must be first-time buyers who have never previously owned an interest in a residential property worldwide (including inherited dwellings).
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Higher Rates for Additional Dwellings (Schedule 4ZA)
            </h3>
            <p>
              An additional <strong>3% surcharge</strong> applies across all rate bands where an individual purchaser owns another residential property at the end of the day of transaction and is not replacing their main residence. If the purchaser sells their previous main residence within 36 months of completion, they can apply to HMRC for a full refund of the 3% surcharge.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              HMRC Statutory Filing Deadline &amp; Penalties
            </h3>
            <p>
              Under Section 76 of the Finance Act 2003, an SDLT return (Form SDLT5) must be submitted to HMRC and the full liability cleared within <strong>14 days of completion</strong>. Late filing triggers an automatic £100 fixed statutory penalty, rising to £200 after 3 months, plus statutory daily interest on the unpaid tax.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

