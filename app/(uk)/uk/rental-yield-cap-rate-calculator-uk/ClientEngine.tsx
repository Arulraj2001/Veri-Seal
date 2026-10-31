'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Percent,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Scale,
  Building,
  Home,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface YieldResult {
  propertyPrice: number;
  monthlyRent: number;
  annualGrossRent: number;
  lettingFeesAnnual: number;
  serviceChargeAndGroundRent: number;
  insuranceAndComplianceAnnual: number;
  maintenanceBufferAnnual: number;
  totalOperatingCosts: number;
  netAnnualRentalIncome: number;
  grossYieldPercent: number;
  netYieldCapRatePercent: number;
}

export default function RentalYieldUkPage() {
  const [propertyPrice, setPropertyPrice] = React.useState<number>(260000);
  const [monthlyRent, setMonthlyRent] = React.useState<number>(1400);
  const [lettingAgentFeePercent, setLettingAgentFeePercent] = React.useState<number>(10.0); // 10% + VAT
  const [serviceChargeGroundRent, setServiceChargeGroundRent] = React.useState<number>(1500); // Leasehold service charge
  const [insuranceAndCertificates, setInsuranceAndCertificates] = React.useState<number>(550); // Insurance, CP12 gas, EICR
  const [maintenancePercent, setMaintenancePercent] = React.useState<number>(5.0); // 5% of rent for repairs

  const calculateYield = React.useCallback((): YieldResult => {
    const price = Math.max(1, propertyPrice);
    const rent = Math.max(0, monthlyRent);
    const annualGross = rent * 12;

    // Letting agent fees (fee + 20% VAT)
    const lettingRateWithVat = (Math.max(0, lettingAgentFeePercent) / 100) * 1.20;
    const lettingFeesAnnual = annualGross * lettingRateWithVat;

    const leaseholdCosts = Math.max(0, serviceChargeGroundRent);
    const complianceCosts = Math.max(0, insuranceAndCertificates);
    const maintenanceCosts = annualGross * (Math.max(0, maintenancePercent) / 100);

    const totalCosts = lettingFeesAnnual + leaseholdCosts + complianceCosts + maintenanceCosts;
    const netAnnual = Math.max(0, annualGross - totalCosts);

    const grossYield = (annualGross / price) * 100;
    const netYield = (netAnnual / price) * 100;

    return {
      propertyPrice: price,
      monthlyRent: rent,
      annualGrossRent: annualGross,
      lettingFeesAnnual,
      serviceChargeAndGroundRent: leaseholdCosts,
      insuranceAndComplianceAnnual: complianceCosts,
      maintenanceBufferAnnual: maintenanceCosts,
      totalOperatingCosts: totalCosts,
      netAnnualRentalIncome: netAnnual,
      grossYieldPercent: grossYield,
      netYieldCapRatePercent: netYield,
    };
  }, [propertyPrice, monthlyRent, lettingAgentFeePercent, serviceChargeGroundRent, insuranceAndCertificates, maintenancePercent]);

  const res = calculateYield();

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
                name: 'UK Rental Yield & Net Cap Rate Calculator',
                applicationCategory: 'RealEstateApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate gross rental yield and true net cap rate for UK buy-to-let properties after deducting letting agent fees (including VAT), service charge, ground rent, EPC, and CP12 gas safety certification costs.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is a good rental yield in the UK?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'A gross rental yield between 6% and 8% is generally considered strong in the UK property market. Northern cities like Liverpool, Manchester, and Newcastle often deliver yields of 6.5% to 8.5%, while London and the South East typically yield between 3.5% and 5.0% due to higher capital property values.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is the difference between Gross Rental Yield and Net Rental Yield (Cap Rate)?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Gross rental yield only measures annual rent as a percentage of purchase price. Net rental yield (Cap Rate) deducts all essential operating outgoings: letting agency management fees (+20% VAT), leasehold service charges, ground rent, building insurance, statutory CP12 gas safety checks, EICR electrical certificates, and repairs.',
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
          <span className="text-slate-800 font-medium">Rental Yield &amp; Cap Rate Estimator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Percent className="w-3.5 h-3.5" />
            Buy-to-Let Cap Rate &amp; Net Yield Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            UK Rental Yield &amp; Cap Rate Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Calculate your true buy-to-let return after letting fees (+VAT), service charges, ground rent, and statutory safety compliance.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Home className="w-5 h-5 text-indigo-900" />
              Property &amp; Tenancy Parameters
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
                  value={propertyPrice || ''}
                  onChange={(e) => setPropertyPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>

            {/* Monthly Rent */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Expected Monthly Rent (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={monthlyRent || ''}
                  onChange={(e) => setMonthlyRent(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>

            {/* Letting Agent Fee and Maintenance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Letting Agent Fee (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={lettingAgentFeePercent || ''}
                    onChange={(e) => setLettingAgentFeePercent(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Typical: 8% to 12% (+20% VAT).
                </span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Maintenance Buffer (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={maintenancePercent || ''}
                    onChange={(e) => setMaintenancePercent(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Recommended: 5% of gross rent.
                </span>
              </div>
            </div>

            {/* Service Charge and Compliance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Service Charge &amp; Ground Rent (£/yr)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-xs">£</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={serviceChargeGroundRent || ''}
                    onChange={(e) => setServiceChargeGroundRent(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Leasehold flats annual fees.
                </span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Insurance &amp; Safety Checks (£/yr)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-xs">£</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={insuranceAndCertificates || ''}
                    onChange={(e) => setInsuranceAndCertificates(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  CP12 gas, EICR, building insurance.
                </span>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Yield Performance</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  Cap Rate
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Net Rental Yield (True Cap Rate)
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {res.netYieldCapRatePercent.toFixed(2)}% / yr
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Gross Rental Yield:</span>
                  <span className="font-bold text-indigo-300">{res.grossYieldPercent.toFixed(2)}%</span>
                </div>
              </div>

              {/* Summary Details */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Gross Rent (Annual):</span>
                  <span className="font-semibold text-slate-900">{formatGBP(res.annualGrossRent)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Letting Fees (incl. VAT):</span>
                  <span className="font-semibold text-rose-600">-{formatGBP(res.lettingFeesAnnual)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Service Charge &amp; Ground Rent:</span>
                  <span className="font-semibold text-rose-600">-{formatGBP(res.serviceChargeAndGroundRent)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Maintenance &amp; Compliance:</span>
                  <span className="font-semibold text-rose-600">-{formatGBP(res.insuranceAndComplianceAnnual + res.maintenanceBufferAnnual)}</span>
                </div>
                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Net Profit (Before Mortgage):</span>
                  <span className="font-bold text-emerald-700">{formatGBP(res.netAnnualRentalIncome)}</span>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                Statutory Safety Standards
              </div>
              <p className="text-indigo-900/80">
                UK landlords must hold a valid Gas Safety Certificate (CP12 renewed annually), an Electrical Installation Condition Report (EICR renewed every 5 years), and an Energy Performance Certificate (EPC minimum rating E, moving to C).
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
              UK Landlord Compliance &amp; Real Estate Cap Rates
            </h2>
            <p>
              In the United Kingdom, residential buy-to-let investments are heavily regulated under the <strong>Landlord and Tenant Act 1985</strong>, the <strong>Housing Act 2004</strong>, and the <strong>Deregulation Act 2015</strong>. Novice investors frequently calculate yields based strictly on gross rental figures, failing to account for leasehold encumbrances, letting agent commissions (which legally incur 20% VAT), and mandatory statutory safety audits.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

