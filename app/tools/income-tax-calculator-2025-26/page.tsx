import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Info,
  Sliders,
  Scale,
  Banknote,
  Calculator,
  GraduationCap,
  Award,
  FileCheck2,
  Clock,
  Globe,
  Code2,
  Ruler,
  Coins,
  Heart,
  FileText,
  FileSpreadsheet,
  TrendingUp,
  Building2,
  Languages,
} from 'lucide-react';
import IncomeTaxCalculatorEngine from '@/components/tools/IncomeTaxCalculatorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Income Tax Calculator FY 2025–26 (AY 2026–27) - New vs Old Regime | Kagazo',
  description: 'Free online Indian Income Tax Calculator for FY 2025–26 with Union Budget 2025 revised tax slabs. Compare New Tax Regime (Zero tax up to Rs 12.75 Lakhs with standard deduction) vs Old Tax Regime. Instant side-by-side analysis.',
  alternates: {
    canonical: 'https://kagazo.in/tools/income-tax-calculator-2025-26',
  },
  openGraph: {
    title: 'Income Tax Calculator FY 2025–26 (AY 2026–27) - New vs Old Regime | Kagazo',
    description: 'Free online Indian Income Tax Calculator for FY 2025–26 with Union Budget 2025 revised tax slabs. Compare New Tax Regime (Zero tax up to Rs 12.75 Lakhs with standard deduction) vs Old Tax Regime. Instant side-by-side analysis.',
    url: 'https://kagazo.in/tools/income-tax-calculator-2025-26',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Calculator FY 2025–26 (AY 2026–27) - New vs Old Regime | Kagazo',
    description: 'Free online Indian Income Tax Calculator for FY 2025–26 with Union Budget 2025 revised tax slabs. Compare New Tax Regime (Zero tax up to Rs 12.75 Lakhs with standard deduction) vs Old Tax Regime. Instant side-by-side analysis.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Taxpayer Category",
    "desc": "Choose Salaried Individual, Senior Citizen (60+ yrs), or Super Senior Citizen (80+ yrs)."
  },
  {
    "step": 2,
    "title": "Enter Gross Annual Income",
    "desc": "Provide your annual salary, business profits, rental income, interest, and capital gains."
  },
  {
    "step": 3,
    "title": "Claim Salary Exemptions",
    "desc": "Rs 75,000 Standard Deduction applies automatically for New Regime. Add HRA & LTA for Old Regime."
  },
  {
    "step": 4,
    "title": "Input Chapter VI-A Deductions",
    "desc": "Declare Section 80C (up to 1.5L), 80D Mediclaim, 80CCD(1B) NPS (50k), and Home Loan Interest (24b)."
  },
  {
    "step": 5,
    "title": "Compare and Choose Best Regime",
    "desc": "Review side-by-side tax liability with 4% Health & Education Cess and see exact regime savings."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Claiming 80C in New Regime",
    "title": "Expecting PF/ELSS Deductions Under New Slabs",
    "desc": "The New Tax Regime disallows Chapter VI-A deductions including Section 80C, 80D, and HRA. Only the Rs 75,000 Standard Deduction and Employer NPS (80CCD(2)) are eligible."
  },
  {
    "badge": "Error: Misunderstanding Rs 12.75L Rebate",
    "title": "Assuming Income Exceeding 12.75L Is Fully Tax-Free",
    "desc": "Under Section 87A rebate, tax is zero only if taxable income is up to Rs 12 Lakhs (or Rs 12.75L gross for salaried with Rs 75k standard deduction). Above this threshold, marginal relief applies."
  },
  {
    "badge": "Error: Forgetting Health & Education Cess",
    "title": "Omitting the 4% Cess on Computed Tax",
    "desc": "Budget calculations that overlook the mandatory 4% Health & Education Cess result in tax shortfalls and Section 234B/234C interest penalties."
  },
  {
    "badge": "Error: Miscalculating HRA Exemption",
    "title": "Claiming Entire Rent Paid as Exemption",
    "desc": "HRA exemption under Section 10(13A) is strictly the lowest of: actual HRA received, rent paid minus 10% of basic salary, or 50%/40% of basic salary."
  }
];

const FAQS = [
  {
    "question": "What is the revised zero-tax limit in Union Budget 2025 under the New Tax Regime?",
    "answer": "Under Union Budget 2025, salaried individuals with a gross annual income up to Rs 12,75,000 pay ZERO income tax. This consists of the Rs 75,000 standard deduction plus the Section 87A tax rebate on taxable income up to Rs 12,00,000."
  },
  {
    "question": "What is the Standard Deduction for salaried employees in FY 2025\u201326?",
    "answer": "The Standard Deduction for salaried employees and pensioners under the New Tax Regime is Rs 75,000 (hiked from Rs 50,000). Under the Old Tax Regime, it remains Rs 50,000."
  },
  {
    "question": "Which regime is better: New Tax Regime or Old Tax Regime?",
    "answer": "The New Tax Regime is superior for taxpayers with total deductions (80C, 80D, HRA, Home Loan) under Rs 3,75,000. If your combined deductions exceed Rs 4,00,000 to Rs 4,50,000, the Old Tax Regime may yield lower tax."
  },
  {
    "question": "Can I switch between the New and Old Tax Regimes every year?",
    "answer": "Salaried individuals without business income can freely switch between the New and Old Regimes each financial year while filing Form ITR-1 or ITR-2. Individuals with business/profession income can only switch once."
  },
  {
    "question": "Is Section 80C deduction (PPF, ELSS, LIC) available in the New Tax Regime?",
    "answer": "No. Section 80C, 80D (health insurance), and HRA exemptions are not permitted in the New Tax Regime. In exchange, tax slab rates are substantially lower."
  },
  {
    "question": "What deductions are still allowed under the New Tax Regime?",
    "answer": "Eligible deductions under the New Regime include: 1) Rs 75,000 Standard Deduction for salaried/pensioners, 2) Employer contribution to NPS under Section 80CCD(2) up to 14% of salary, and 3) Transport allowance for specially-abled persons."
  },
  {
    "question": "How does the Section 87A Marginal Relief work for income just above Rs 12 Lakhs?",
    "answer": "Marginal relief ensures that the tax payable on income marginally above Rs 12 Lakhs does not exceed the amount of income that exceeds Rs 12 Lakhs, preventing sudden tax jumps."
  },
  {
    "question": "Is my financial and salary data safe while using this calculator?",
    "answer": "Yes. Kagazo executes all calculations 100% client-side inside your browser memory. Zero salary details, investments, or personal financial metrics are transmitted over the web."
  },
  {
    "question": "What is the Health and Education Cess percentage?",
    "answer": "A mandatory 4% Health and Education Cess is added to the total computed income tax amount under both the New and Old Tax Regimes."
  },
  {
    "question": "Does this calculator support senior citizens and super senior citizens?",
    "answer": "Yes. Under the Old Tax Regime, basic exemption limits of Rs 3,00,000 (Senior Citizens 60-79 yrs) and Rs 5,00,000 (Super Senior Citizens 80+ yrs) are automatically factored into the calculation."
  }
];

export default function IncomeTaxCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Income Tax Calculator FY 2025–26',
        url: 'https://kagazo.in/tools/income-tax-calculator-2025-26',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Free online Indian Income Tax Calculator for FY 2025–26 with Union Budget 2025 revised tax slabs. Compare New Tax Regime (Zero tax up to Rs 12.75 Lakhs with standard deduction) vs Old Tax Regime. Instant side-by-side analysis.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your Income Tax in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Income Tax Calculator FY 2025–26.',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
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
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Income Tax Calculator FY 2025–26',
            item: 'https://kagazo.in/tools/income-tax-calculator-2025-26',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Income Tax Calculator FY 2025–26</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Budget 2025 Slabs • Zero Tax Up to Rs 12.75L</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Income Tax Calculator </span>
            <span className="text-primary">FY 2025–26 (AY 2026–27)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Free online Indian Income Tax Calculator for FY 2025–26 with Union Budget 2025 revised tax slabs. Compare New Tax Regime (Zero tax up to Rs 12.75 Lakhs with standard deduction) vs Old Tax Regime. Instant side-by-side analysis.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <IncomeTaxCalculatorEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Compliance Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Union Budget 2025 Slabs
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Pre-configured with revised New Tax Regime slabs: Rs 4L, 8L, 12L, 16L, 20L, 24L with Rs 75,000 Standard Deduction.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Side-by-Side Comparison
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Real-time simultaneous calculation comparing New Regime vs Old Regime (80C, 80D, HRA, Home Loan).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Client-Side Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your salary, business income, investments, and deductions are calculated in browser RAM with zero tracking.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Budget 2025 Revised New Tax Regime Slabs (FY 2025–26 / AY 2026–27)
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Official Finance Act
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Annual Total Income Slab</th><th className="py-2.5 px-3 font-bold">Income Tax Rate (New Regime)</th><th className="py-2.5 px-3 font-bold">Effective Tax Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Up to Rs 4,00,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">NIL (0%)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Completely tax-free basic exemption limit</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 4,00,001 to Rs 8,00,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">5%</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Tax on income between 4L and 8L (Max: Rs 20,000)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 8,00,001 to Rs 12,00,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">10%</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Tax on income between 8L and 12L (Max: Rs 40,000)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 12,00,001 to Rs 16,00,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">15%</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rebate u/s 87A ensures ZERO tax up to Rs 12.75L for salaried</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 16,00,001 to Rs 20,00,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">20%</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Tax on income between 16L and 20L (Max: Rs 80,000)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 20,00,001 to Rs 24,00,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">25%</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Tax on income between 20L and 24L (Max: Rs 1,00,000)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Above Rs 24,00,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">30%</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Flat 30% on income exceeding Rs 24 Lakhs + Cess (4%)</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Calculate Your Income Tax in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and verified results:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{step.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Common Tax Planning Pitfalls & Misconceptions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common formatting errors, legal omissions, and calculation pitfalls:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Strict 10 Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Comprehensive technical, legal, and operational answers
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  10 Questions Answered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Key Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Tax Guidelines
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Budget 2025 Slabs</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Revised slabs up to Rs 24 Lakhs with 87A rebate.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard Deduction</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Rs 75,000 for New Regime, Rs 50,000 for Old.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Private Math</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% in-browser RAM computation without storage.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>
              <div className="space-y-1.5">
                <Link
                  href="/tools/salary-slip-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Monthly Salary Slip Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Payroll
                  </span>
                </Link>
                <Link
                  href="/tools/epfo-passbook-photo-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      EPFO Passbook Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    EPF
                  </span>
                </Link>
                <Link
                  href="/tools/number-to-words-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Number to Words Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Finance
                  </span>
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-3 space-y-1.5 text-text-main/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Lock className="w-3.5 h-3.5" />
                <span>100% In-RAM Privacy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-main/70">
                All calculations and document drafting occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
