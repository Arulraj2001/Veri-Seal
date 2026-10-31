'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Landmark,
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
  Home,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function LandTaxCalculatorPage() {
  const [unimprovedLandValue, setUnimprovedLandValue] = React.useState<number>(1250000);
  const [selectedState, setSelectedState] = React.useState<'nsw' | 'vic' | 'qld' | 'wa'>('nsw');
  const [isPprExempt, setIsPprExempt] = React.useState<boolean>(false);
  const [isForeignOwner, setIsForeignOwner] = React.useState<boolean>(false);
  const [isTrust, setIsTrust] = React.useState<boolean>(false);

  const results = React.useMemo(() => {
    if (isPprExempt) {
      return {
        baseLandTax: 0,
        surcharges: 0,
        totalLandTax: 0,
        isExempt: true,
      };
    }

    let baseLandTax = 0;
    let surcharges = 0;

    if (selectedState === 'nsw') {
      // NSW Land Tax Management Act 1956
      const threshold = 1075000;
      const premiumThreshold = 6571000;

      if (unimprovedLandValue > premiumThreshold) {
        baseLandTax = 88036 + (unimprovedLandValue - premiumThreshold) * 0.02;
      } else if (unimprovedLandValue > threshold) {
        baseLandTax = 100 + (unimprovedLandValue - threshold) * 0.016;
      }

      // Foreign owner surcharge in NSW: 4% flat on total unimproved value
      if (isForeignOwner) {
        surcharges += unimprovedLandValue * 0.04;
      }
    } else if (selectedState === 'vic') {
      // VIC Land Tax Act 2005 (Includes COVID Debt Levy from $50k)
      if (unimprovedLandValue > 3000000) {
        baseLandTax = 25025 + (unimprovedLandValue - 3000000) * 0.0255;
      } else if (unimprovedLandValue > 1800000) {
        baseLandTax = 11425 + (unimprovedLandValue - 1800000) * 0.0155;
      } else if (unimprovedLandValue > 1000000) {
        baseLandTax = 4625 + (unimprovedLandValue - 1000000) * 0.0085;
      } else if (unimprovedLandValue > 600000) {
        baseLandTax = 2225 + (unimprovedLandValue - 600000) * 0.006;
      } else if (unimprovedLandValue > 300000) {
        baseLandTax = 1325 + (unimprovedLandValue - 300000) * 0.003;
      } else if (unimprovedLandValue > 100000) {
        baseLandTax = 975 + (unimprovedLandValue - 100000) * 0.003;
      } else if (unimprovedLandValue > 50000) {
        baseLandTax = 500 + (unimprovedLandValue - 50000) * 0.001;
      }

      if (isForeignOwner) {
        surcharges += unimprovedLandValue * 0.04; // 4% Absentee owner surcharge
      }
    } else if (selectedState === 'qld') {
      // QLD Land Tax Act 2010 (Individual threshold $600k)
      const threshold = isTrust ? 350000 : 600000;
      if (unimprovedLandValue > 1000000) {
        baseLandTax = 4500 + (unimprovedLandValue - 1000000) * 0.0165;
      } else if (unimprovedLandValue > threshold) {
        baseLandTax = 500 + (unimprovedLandValue - threshold) * 0.01;
      }

      if (isForeignOwner) {
        surcharges += unimprovedLandValue * 0.02; // 2% foreign surcharge
      }
    } else {
      // WA Land Tax Assessment Act 2002 (Threshold $300k)
      if (unimprovedLandValue > 1000000) {
        baseLandTax = 2050 + (unimprovedLandValue - 1000000) * 0.009;
      } else if (unimprovedLandValue > 300000) {
        baseLandTax = 300 + (unimprovedLandValue - 300000) * 0.0025;
      }
    }

    const totalLandTax = baseLandTax + surcharges;

    return {
      baseLandTax,
      surcharges,
      totalLandTax,
      isExempt: false,
    };
  }, [unimprovedLandValue, selectedState, isPprExempt, isForeignOwner, isTrust]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian State Land Tax & Surcharge Calculator 2026/27',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian land tax calculator across NSW, Victoria, Queensland, and Western Australia. Compute unimproved land value brackets, PPR exemptions, and foreign owner surcharges.',
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
        <span className="text-slate-900 font-bold">State Land Tax Calculator</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Landmark className="w-3.5 h-3.5" />
          <span>State Revenue Offices (NSW / VIC / QLD / WA)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          State Land Tax &amp; Surcharge Calculator (NSW, VIC, QLD, WA)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Model annual state land tax liabilities based on the Valuer-General&apos;s unimproved site value, evaluate Principal Place of Residence (PPR) full exemptions, and calculate Victorian COVID debt levies and foreign owner surcharges.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Land Valuation Parameters</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded uppercase">
              {selectedState} Land Tax Act
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">State Revenue Jurisdiction</label>
            <div className="grid grid-cols-4 gap-2">
              {(['nsw', 'vic', 'qld', 'wa'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedState(st)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold uppercase border transition-all ${
                    selectedState === st
                      ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Unimproved Land Value ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${unimprovedLandValue.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="10000"
              step="25000"
              value={unimprovedLandValue}
              onChange={(e) => setUnimprovedLandValue(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
            <p className="text-[11px] text-slate-500">
              Assessed strictly on statutory land value (site value) excluding the house/building.
            </p>
          </div>

          {/* PPR Exemption Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Principal Place of Residence (PPR)?</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsPprExempt(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  !isPprExempt ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Investment / Commercial
              </button>
              <button
                type="button"
                onClick={() => setIsPprExempt(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  isPprExempt ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Primary Home (100% Exempt)
              </button>
            </div>
          </div>

          {/* Foreign Owner Surcharge */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Foreign / Absentee Owner Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsForeignOwner(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  !isForeignOwner ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Resident Owner
              </button>
              <button
                type="button"
                onClick={() => setIsForeignOwner(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  isForeignOwner ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Foreign / Absentee (+2-4%)
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Annual Land Tax Liability
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold uppercase">
                {selectedState} Assessment
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.totalLandTax).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD / year</span>
              </div>
              <p className="text-xs text-slate-400">
                {results.isExempt
                  ? 'Principal Place of Residence: 100% Statutorily Exempt from Land Tax.'
                  : `Assessed on $${unimprovedLandValue.toLocaleString()} unimproved land value.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Base Land Tax</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  ${Math.round(results.baseLandTax).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Surcharges / Levies</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  ${Math.round(results.surcharges).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              State Tax Framework Insights
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In Victoria, the COVID Debt Repayment Scheme reduced the general tax-free threshold from $300,000 down to $50,000, introducing a flat $500 to $975 levy plus variable rates on almost all Victorian residential investment properties.
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
            Australian Land Tax Fundamentals
          </h2>
          <p>
            Land tax is an annual tax paid by the owner of land as at midnight on 31 December (NSW, VIC) or 30 June (QLD, WA). It is levied on the taxable value of all taxable land owned, calculated by state Valuers-General based on unimproved site values.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Principal Place of Residence (PPR) Exemption
          </h2>
          <p>
            All Australian states provide a statutory exemption for land used and occupied by the owner as their principal place of residence (PPR). Only one home per person or domestic partnership can receive the exemption in any financial year.
          </p>
        </section>
      </article>
    </div>
  );
}

