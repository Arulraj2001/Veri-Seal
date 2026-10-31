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
  Landmark,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function StampDutyCalculatorPage() {
  const [propertyValue, setPropertyValue] = React.useState<number>(850000);
  const [selectedState, setSelectedState] = React.useState<'nsw' | 'vic' | 'qld' | 'wa'>('nsw');
  const [buyerType, setBuyerType] = React.useState<'fhb' | 'owner' | 'investor'>('fhb');
  const [isForeignBuyer, setIsForeignBuyer] = React.useState<boolean>(false);

  const results = React.useMemo(() => {
    let baseDuty = 0;
    let fhbDiscount = 0;
    let foreignSurchargeRate = 0;

    // 1. Calculate Base State Duty
    if (selectedState === 'nsw') {
      // NSW Duties Act 1997
      if (propertyValue <= 17000) baseDuty = propertyValue * 0.0125;
      else if (propertyValue <= 36000) baseDuty = 212 + (propertyValue - 17000) * 0.015;
      else if (propertyValue <= 93000) baseDuty = 497 + (propertyValue - 36000) * 0.0175;
      else if (propertyValue <= 351000) baseDuty = 1495 + (propertyValue - 93000) * 0.035;
      else if (propertyValue <= 1168000) baseDuty = 10525 + (propertyValue - 351000) * 0.045;
      else baseDuty = 47290 + (propertyValue - 1168000) * 0.055;

      // NSW First Home Buyers Assistance Scheme (FHBAS)
      if (buyerType === 'fhb') {
        if (propertyValue <= 800000) {
          fhbDiscount = baseDuty; // 100% exempt up to $800k
        } else if (propertyValue <= 1000000) {
          const discountRatio = (1000000 - propertyValue) / 200000;
          fhbDiscount = baseDuty * discountRatio;
        }
      }
      foreignSurchargeRate = 0.08; // 8%
    } else if (selectedState === 'vic') {
      // VIC Duties Act 2000
      if (propertyValue <= 25000) baseDuty = propertyValue * 0.014;
      else if (propertyValue <= 130000) baseDuty = 350 + (propertyValue - 25000) * 0.024;
      else if (propertyValue <= 960000) baseDuty = 2870 + (propertyValue - 130000) * 0.06;
      else baseDuty = propertyValue * 0.055;

      // VIC FHB Exemption
      if (buyerType === 'fhb') {
        if (propertyValue <= 600000) {
          fhbDiscount = baseDuty; // 100% exempt up to $600k
        } else if (propertyValue <= 750000) {
          const discountRatio = (750000 - propertyValue) / 150000;
          fhbDiscount = baseDuty * discountRatio;
        }
      }
      foreignSurchargeRate = 0.08; // 8%
    } else if (selectedState === 'qld') {
      // QLD Duties Act 2001
      if (propertyValue <= 5000) baseDuty = 0;
      else if (propertyValue <= 75000) baseDuty = (propertyValue - 5000) * 0.015;
      else if (propertyValue <= 540000) baseDuty = 1050 + (propertyValue - 75000) * 0.035;
      else if (propertyValue <= 1000000) baseDuty = 17325 + (propertyValue - 540000) * 0.045;
      else baseDuty = 38025 + (propertyValue - 1000000) * 0.0575;

      // QLD FHB Concession (Reformed to $700k exemption)
      if (buyerType === 'fhb') {
        if (propertyValue <= 700000) {
          fhbDiscount = baseDuty;
        } else if (propertyValue <= 800000) {
          const discountRatio = (800000 - propertyValue) / 100000;
          fhbDiscount = baseDuty * discountRatio;
        }
      }
      foreignSurchargeRate = 0.08;
    } else {
      // WA Duties Act 2008
      if (propertyValue <= 120000) baseDuty = propertyValue * 0.019;
      else if (propertyValue <= 150000) baseDuty = 2280 + (propertyValue - 120000) * 0.0285;
      else if (propertyValue <= 360000) baseDuty = 3135 + (propertyValue - 150000) * 0.038;
      else if (propertyValue <= 725000) baseDuty = 11115 + (propertyValue - 360000) * 0.0475;
      else baseDuty = 28453 + (propertyValue - 725000) * 0.0515;

      // WA FHB Concession
      if (buyerType === 'fhb') {
        if (propertyValue <= 450000) {
          fhbDiscount = baseDuty;
        } else if (propertyValue <= 600000) {
          const discountRatio = (600000 - propertyValue) / 150000;
          fhbDiscount = baseDuty * discountRatio;
        }
      }
      foreignSurchargeRate = 0.07; // 7% in WA
    }

    const netBaseDuty = Math.max(0, baseDuty - fhbDiscount);
    const foreignSurcharge = isForeignBuyer ? propertyValue * foreignSurchargeRate : 0;
    const totalGovernmentDuty = netBaseDuty + foreignSurcharge;

    return {
      baseDuty,
      fhbDiscount,
      netBaseDuty,
      foreignSurcharge,
      foreignSurchargeRate: foreignSurchargeRate * 100,
      totalGovernmentDuty,
    };
  }, [propertyValue, selectedState, buyerType, isForeignBuyer]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian State Stamp Duty & Transfer Duty Calculator 2026/27',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian state property transfer duty calculator for NSW, VIC, QLD, and WA. Calculate First Home Buyer concessions, investor rates, and foreign buyer surcharges.',
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
        <span className="text-slate-900 font-bold">State Stamp Duty Calculator</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Landmark className="w-3.5 h-3.5" />
          <span>State Revenue Offices (NSW / VIC / QLD / WA)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          State Stamp Duty (Transfer Duty) &amp; FHB Concession Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Accurate state conveyance transfer duty model covering New South Wales (FHBAS), Victoria, Queensland, and Western Australia with official first home buyer exemption thresholds and foreign purchaser duty surcharges.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Property &amp; Buyer Details</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded uppercase">
              {selectedState} Duties Act
            </span>
          </div>

          {/* State Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Jurisdiction (State / Territory)</label>
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

          {/* Purchase Price */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Property Purchase Price ($ AUD)</span>
              <span className="text-xs text-amber-800 font-mono">${propertyValue.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="10000"
              step="10000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 text-base"
            />
          </div>

          {/* Buyer Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Buyer Status</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBuyerType('fhb')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${
                  buyerType === 'fhb' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                First Home Buyer
              </button>
              <button
                type="button"
                onClick={() => setBuyerType('owner')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${
                  buyerType === 'owner' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Owner Occupier
              </button>
              <button
                type="button"
                onClick={() => setBuyerType('investor')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${
                  buyerType === 'investor' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Investor
              </button>
            </div>
          </div>

          {/* Foreign Buyer Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Foreign Purchaser Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsForeignBuyer(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  !isForeignBuyer ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Australian Citizen / PR
              </button>
              <button
                type="button"
                onClick={() => setIsForeignBuyer(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  isForeignBuyer ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Foreign Buyer (+7-8%)
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Total Government Transfer Duty Payable
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold uppercase">
                {selectedState} Revenue
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${Math.round(results.totalGovernmentDuty).toLocaleString()}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">AUD</span>
              </div>
              <p className="text-xs text-slate-400">
                Effective Duty Rate: {propertyValue > 0 ? ((results.totalGovernmentDuty / propertyValue) * 100).toFixed(2) : 0}% of purchase price
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">First Home Concession Savings</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                  -${Math.round(results.fhbDiscount).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Foreign Purchaser Surcharge</div>
                <div className="text-base sm:text-lg font-black text-rose-400 mt-1">
                  +${Math.round(results.foreignSurcharge).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Statutory Duty Breakdown
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Standard State Transfer Duty</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(results.baseDuty).toLocaleString()}</span>
              </div>
              {results.fhbDiscount > 0 && (
                <div className="py-2.5 flex justify-between text-emerald-700">
                  <span>First Home Buyer Assistance Exemption / Concession</span>
                  <span className="font-mono font-bold">-${Math.round(results.fhbDiscount).toLocaleString()}</span>
                </div>
              )}
              {results.foreignSurcharge > 0 && (
                <div className="py-2.5 flex justify-between text-rose-600">
                  <span>Foreign Acquirer Surcharge Duty ({results.foreignSurchargeRate}%)</span>
                  <span className="font-mono font-bold">+${Math.round(results.foreignSurcharge).toLocaleString()}</span>
                </div>
              )}
              <div className="py-3 flex justify-between font-black text-sm text-slate-950 border-t-2 border-slate-200">
                <span>Final Payable Transfer Duty</span>
                <span className="font-mono text-amber-800">${Math.round(results.totalGovernmentDuty).toLocaleString()} AUD</span>
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
            Australian State Property Transfer Duty Overview
          </h2>
          <p>
            Stamp duty (formally termed &apos;transfer duty&apos;) is a state-administered tax levied on the dutiable value of real property transactions. Each state and territory maintains independent progressive rate bands, exemption rules, and foreign buyer surcharges.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            First Home Buyer Concession Thresholds (2025/2026/2027)
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>New South Wales (FHBAS):</strong> 100% duty exemption up to $800,000; sliding-scale concession between $800,000 and $1,000,000.</li>
            <li><strong>Victoria:</strong> 100% duty exemption up to $600,000; sliding-scale concession between $600,000 and $750,000.</li>
            <li><strong>Queensland:</strong> Reformed full exemption threshold up to $700,000; concession phasing out up to $800,000.</li>
            <li><strong>Western Australia:</strong> Full exemption up to $450,000; concessional rate up to $600,000.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}

