import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  FileText,
  DollarSign,
  Building2,
} from 'lucide-react';
import IncomeTaxCalculatorEngine from '@/components/tools/IncomeTaxCalculatorEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Income Tax Calculator FY 2025–26 (AY 2026–27) | New vs Old Regime',
  description:
    'Calculate income tax for FY 2025-26 (Assessment Year 2026-27). Compare New vs Old Tax Regime with ₹75,000 standard deduction, revised Union Budget slabs, and Section 87A zero-tax rebate up to ₹7.75 Lakhs.',
  alternates: {
    canonical: 'https://veriseal.in/tools/income-tax-calculator-2025-26',
  },
  openGraph: {
    title: 'Income Tax Calculator FY 2025-26 (New vs Old Regime) | VeriSeal',
    description:
      'Compare New vs Old Tax Regime with revised budget slabs & ₹75k standard deduction.',
    url: 'https://veriseal.in/tools/income-tax-calculator-2025-26',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const NEW_REGIME_SLABS = [
  { slab: 'Up to ₹3,00,000', rate: 'NIL (0%)' },
  { slab: '₹3,00,001 to ₹7,00,000', rate: '5%' },
  { slab: '₹7,00,001 to ₹10,00,000', rate: '10%' },
  { slab: '₹10,00,001 to ₹12,00,000', rate: '15%' },
  { slab: '₹12,00,001 to ₹15,00,000', rate: '20%' },
  { slab: 'Above ₹15,00,000', rate: '30%' },
];

const FAQS = [
  {
    question: 'What is the maximum salary with zero tax in the New Tax Regime for FY 2025-26?',
    answer:
      'Under the revised New Tax Regime, a salaried individual pays ZERO tax up to a gross income of ₹7,75,000. This is achieved by combining the ₹75,000 Standard Deduction with the Section 87A full tax rebate for taxable incomes up to ₹7,00,000.',
  },
  {
    question: 'Should I choose the New Tax Regime or the Old Tax Regime?',
    answer:
      'The New Tax Regime is mathematically better for most individuals unless your total Chapter VI-A deductions (Section 80C, 80D, HRA exemption, and home loan interest) exceed ₹3,75,000 to ₹4,25,000. Our calculator automatically computes both side-by-side and tells you your exact rupee savings.',
  },
  {
    question: 'What is the increased standard deduction for salaried employees?',
    answer:
      'The standard deduction for salaried taxpayers under the New Tax Regime was officially raised from ₹50,000 to ₹75,000, providing an immediate tax relief of up to ₹17,500.',
  },
  {
    question: 'Are my salary numbers or tax calculations stored anywhere?',
    answer:
      'Never. All calculations run strictly in client-side JavaScript inside your browser. No income or financial data is ever sent across the network.',
  },
];

export default function IncomeTaxCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'VeriSeal Income Tax Calculator FY 2025-26',
        url: 'https://veriseal.in/tools/income-tax-calculator-2025-26',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Calculate income tax for FY 2025-26 and compare New vs Old Tax Regime with Union Budget slabs.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compare New vs Old Tax Regime',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Gross Salary',
            text: 'Input your annual gross salaried income and any other sources.',
          },
          {
            '@type': 'HowToStep',
            name: 'Input Deductions for Old Regime',
            text: 'Provide Section 80C, 80D, and HRA exemption figures.',
          },
          {
            '@type': 'HowToStep',
            name: 'Compare Net Tax Savings',
            text: 'View side-by-side tax computations and print your personalized tax plan.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Calculators', href: '/tools' },
            { label: 'Income Tax Calculator FY 2025–26' },
          ]}
          showHomeIcon
        />

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Union Budget Revised Tax Slabs &amp; ₹75,000 Standard Deduction</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Income Tax Calculator FY 2025–26 (AY 2026–27)
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Compare the <strong>New Tax Regime vs Old Tax Regime</strong> side-by-side with updated Union Budget tax slabs, ₹75,000 standard deduction, and Section 87A zero-tax rebate up to ₹7.75 Lakhs gross income.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero Cloud Storage:</strong> Your salary details, tax deductions, and financial figures are computed 100% locally in browser RAM. Zero financial data is ever logged.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <IncomeTaxCalculatorEngine />

            {/* New Regime Slabs Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-foreground">
                    New Tax Regime Slabs (FY 2025–26)
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Default Regime
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <th className="py-2.5 px-3 font-bold">Annual Taxable Income Slab</th>
                      <th className="py-2.5 px-3 font-bold">Income Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    {NEW_REGIME_SLABS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{item.slab}</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          {item.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                  >
                    <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                      <span className="text-emerald-600 font-extrabold">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (32%) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tax Planning Tips */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Tax Planning Insights</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Zero Tax Up to ₹7.75 Lakhs</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    With ₹75k Standard Deduction + Sec 87A rebate, no tax is payable on salary up to ₹7,75,000 under New Regime.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Breakeven Point: ~₹3.75L</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    If your total deductions (80C + 80D + HRA) are below ₹3.75L, New Regime almost always saves you more tax.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Related Financial Tools</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/salary-slip-generator"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Salary Slip Generator
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/home-cost/electricity-bill-calculator"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    Electricity Bill Calculator
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/gst-number-verifier"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    GST Number Verifier
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Ad Space (Ostrune Exclusive) */}
            <AdSlot slot="sidebar" />
          </div>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/income-tax-fy25-calculator" />
      </div>
    </div>
  );
}
