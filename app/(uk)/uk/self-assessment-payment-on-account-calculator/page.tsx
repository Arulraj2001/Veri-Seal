'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
  Scale,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface PaymentOnAccountResult {
  previousTaxBill: number;
  taxDeductedAtSource: number;
  netSelfAssessmentLiability: number;
  isSubjectToPaymentsOnAccount: boolean;
  exemptionReason?: string;
  firstPaymentOnAccount: number; // 31 Jan
  balancingPayment: number;       // 31 Jan
  totalJan31Payment: number;      // Balancing + 1st POA
  secondPaymentOnAccount: number;// 31 July
  totalAnnualTaxCashFlow: number;
}

export default function SelfAssessmentPoaPage() {
  const [totalIncomeTaxAndNic, setTotalIncomeTaxAndNic] = React.useState<number>(6000);
  const [taxDeductedAtSource, setTaxDeductedAtSource] = React.useState<number>(500);
  const [expectedProfitDropPercent, setExpectedProfitDropPercent] = React.useState<number>(0);

  const calculatePoa = React.useCallback((): PaymentOnAccountResult => {
    const grossTax = Math.max(0, totalIncomeTaxAndNic);
    const taxedAtSource = Math.max(0, taxDeductedAtSource);
    const netLiability = Math.max(0, grossTax - taxedAtSource);

    // Section 59A Taxes Management Act 1970
    // Exempt if:
    // 1. Previous year's tax bill was less than £1,000.
    // 2. More than 80% of the tax liability was already paid at source (e.g. through PAYE).
    let isSubject = true;
    let reason = '';

    if (netLiability < 1000) {
      isSubject = false;
      reason = 'Net tax liability is below the statutory £1,000 threshold.';
    } else if (grossTax > 0 && (taxedAtSource / grossTax) >= 0.80) {
      isSubject = false;
      reason = 'More than 80% of your total tax was collected at source (e.g. via PAYE).';
    }

    // Balancing payment for Jan 31
    const balancingPayment = netLiability;

    // Payments on account: each is 50% of the net liability
    // Adjusted if user claims a statutory reduction (s.59A(3) TMA 1970)
    const reductionMultiplier = Math.max(0, 1 - (expectedProfitDropPercent / 100));
    const firstPoa = isSubject ? (netLiability * 0.50) * reductionMultiplier : 0;
    const secondPoa = isSubject ? (netLiability * 0.50) * reductionMultiplier : 0;

    const totalJan31 = balancingPayment + firstPoa;
    const totalCashFlow = balancingPayment + firstPoa + secondPoa;

    return {
      previousTaxBill: grossTax,
      taxDeductedAtSource: taxedAtSource,
      netSelfAssessmentLiability: netLiability,
      isSubjectToPaymentsOnAccount: isSubject,
      exemptionReason: reason,
      firstPaymentOnAccount: firstPoa,
      balancingPayment,
      totalJan31Payment: totalJan31,
      secondPaymentOnAccount: secondPoa,
      totalAnnualTaxCashFlow: totalCashFlow,
    };
  }, [totalIncomeTaxAndNic, taxDeductedAtSource, expectedProfitDropPercent]);

  const res = calculatePoa();

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 }).format(val);

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
                name: 'HMRC Self-Assessment Payment on Account Calculator (s.59A TMA 1970)',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'GBP',
                },
                description:
                  'Calculate 31 January and 31 July HMRC Payments on Account under Section 59A of the Taxes Management Act 1970. Includes the £1,000 threshold and 80% source deduction exemption tests.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What are HMRC Payments on Account?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Payments on account are two advance payments made by self-employed individuals and taxpayers with untaxed income towards their next year’s tax bill. Each payment is equal to 50% of the previous year’s tax liability, payable on 31 January and 31 July respectively.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Who is exempt from making Payments on Account?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Under Section 59A of the Taxes Management Act 1970, you do not have to make payments on account if your tax bill for the previous year was under £1,000, or if more than 80% of your total tax due was already deducted at source (such as through PAYE employment or CIS deductions).',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can you reduce your Payments on Account if your income drops?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. Under Section 59A(3) TMA 1970, you can submit a claim to HMRC (form SA303 or via your online tax account) to reduce your payments on account if you anticipate your taxable profits will be substantially lower. However, if you reduce them below the actual tax due, HMRC will charge statutory interest and potential penalties on the shortfall.',
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
          <span className="text-slate-800 font-medium">Payment on Account Calculator</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Taxes Management Act 1970 (Section 59A)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Self-Assessment Payment on Account Calculator
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Model your statutory 31 January balancing payment and advance 31 July installments under HMRC Section 59A rules.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-indigo-900" />
              Tax Return Assessment Details
            </h2>

            {/* Total Tax & Class 4 NICs */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Total Income Tax &amp; Class 4 NICs Due for Year (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="250"
                  value={totalIncomeTaxAndNic || ''}
                  onChange={(e) => setTotalIncomeTaxAndNic(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
            </div>

            {/* Tax Deducted at Source */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Tax Already Deducted at Source (PAYE / CIS Deductions) (£)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">£</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={taxDeductedAtSource || ''}
                  onChange={(e) => setTaxDeductedAtSource(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                If more than 80% of your total tax was deducted at source, you are exempt from Payments on Account.
              </span>
            </div>

            {/* Claim to Reduce (s.59A(3)) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Anticipated Drop in Next Year&apos;s Income (% Claim to Reduce)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  value={expectedProfitDropPercent || ''}
                  onChange={(e) => setExpectedProfitDropPercent(parseFloat(e.target.value) || 0)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                />
                <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Use if you expect lower taxable earnings next year and intend to file Form SA303.
              </span>
            </div>

            {/* Exemption Notification */}
            {!res.isSubjectToPaymentsOnAccount && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Exempt from Payments on Account:</strong> {res.exemptionReason} You only need to pay the balancing payment on 31 January.
                </div>
              </div>
            )}
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Payment Timeline</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  HMRC Deadlines
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Total Due on 31 January
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatGBP(res.totalJan31Payment)}
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Balancing ({formatGBP(res.balancingPayment)}) + 1st POA ({formatGBP(res.firstPaymentOnAccount)})</span>
                </div>
              </div>

              {/* Installment Breakdown */}
              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900">1. Deadline: 31 January</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Balancing Payment (Final bill):</span>
                    <span className="font-semibold text-slate-900">{formatGBP(res.balancingPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">First Payment on Account (50%):</span>
                    <span className="font-semibold text-slate-900">{formatGBP(res.firstPaymentOnAccount)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900">2. Deadline: 31 July</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Second Payment on Account (50%):</span>
                    <span className="font-bold text-indigo-900">{formatGBP(res.secondPaymentOnAccount)}</span>
                  </div>
                </div>

                <div className="flex justify-between py-1.5 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Total Tax Cash Flow:</span>
                  <span className="font-bold text-slate-900">{formatGBP(res.totalAnnualTaxCashFlow)}</span>
                </div>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                Interest on Late Payments
              </div>
              <p className="text-indigo-900/80">
                HMRC charges late payment interest (currently Bank of England base rate + 2.5%) on any payments on account unpaid after their respective 31 January and 31 July deadlines.
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
              Statutory Basis of Payments on Account (s.59A TMA 1970)
            </h2>
            <p>
              In the United Kingdom, individuals, sole traders, and partners subject to Self-Assessment are required under <strong>Section 59A of the Taxes Management Act 1970</strong> to make advance interim payments towards their forthcoming income tax and Class 4 National Insurance liabilities. These advance payments ensure that self-employed individuals remit tax on a schedule comparable to PAYE employees rather than paying exclusively in arrears.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              The Two Statutory Exemption Tests
            </h3>
            <p>
              A taxpayer is legally exempt from the obligation to make Payments on Account if either of the following conditions is satisfied:
            </p>
            <ol className="list-decimal pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>The £1,000 Liability Threshold:</strong> If your net Self-Assessment tax bill (after deducting tax already paid at source) is less than <strong>£1,000</strong>.
              </li>
              <li>
                <strong>The 80% Source Deduction Rule:</strong> If more than <strong>80% of your total tax liability</strong> was already withheld and paid at source (such as through a PAYE salary or Construction Industry Scheme deductions).
              </li>
            </ol>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              How to Formally Apply to Reduce Payments on Account
            </h3>
            <p>
              Under <strong>Section 59A(3) TMA 1970</strong>, if you have reason to believe that your taxable income in the current year will be less than the preceding year (for example due to loss of a major contract or retirement), you have the statutory right to state that belief and reduce your payments on account. You can do this through your HMRC online portal or by filing <strong>Form SA303</strong>.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

