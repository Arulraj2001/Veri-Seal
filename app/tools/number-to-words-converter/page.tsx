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
import { NumberToWordsEngine } from '@/components/tools/NumberToWordsEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Number to Words Converter (Indian Rupees Lakhs/Crores & USD) | Kagazo',
  description: 'Free online number to words converter. Convert currency amounts to Indian Rupee format (Lakhs & Crores) and International Western format (Millions & Billions). Includes bank cheque writing format ("Rupees ... Only"), title case, and zero server logging.',
  alternates: {
    canonical: 'https://kagazo.in/tools/number-to-words-converter',
  },
  openGraph: {
    title: 'Number to Words Converter (Indian Rupees Lakhs/Crores & USD) | Kagazo',
    description: 'Free online number to words converter. Convert currency amounts to Indian Rupee format (Lakhs & Crores) and International Western format (Millions & Billions). Includes bank cheque writing format ("Rupees ... Only"), title case, and zero server logging.',
    url: 'https://kagazo.in/tools/number-to-words-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Number to Words Converter (Indian Rupees Lakhs/Crores & USD) | Kagazo',
    description: 'Free online number to words converter. Convert currency amounts to Indian Rupee format (Lakhs & Crores) and International Western format (Millions & Billions). Includes bank cheque writing format ("Rupees ... Only"), title case, and zero server logging.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Amount or Number",
    "desc": "Type any numerical digit string or currency figure (e.g. 75450 or 1250000.50)."
  },
  {
    "step": 2,
    "title": "Select Numbering System",
    "desc": "Choose Indian System (Lakhs & Crores) or International Western System (Millions & Billions)."
  },
  {
    "step": 3,
    "title": "Enable Cheque Wording",
    "desc": "Toggle Cheque Protection Mode to automatically prefix \"Rupees\" and append \"Only\"."
  },
  {
    "step": 4,
    "title": "Pick Letter Case Style",
    "desc": "Select Title Case (First Letter Capital), UPPERCASE (for bank drafts), or Sentence case."
  },
  {
    "step": 5,
    "title": "1-Click Copy Word String",
    "desc": "Copy the verified text directly into your cheque leaf, tax invoice, legal contract, or receipt."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Omitting the Word \"Only\"",
    "title": "Leaving Cheque Text Open to Fraudulent Suffixes",
    "desc": "Failing to write \"Only\" at the end of the amount in words allows malicious actors to append extra figures (e.g., changing \"Five Thousand\" to \"Five Thousand Five Hundred\"). Always append \"Only\"."
  },
  {
    "badge": "Error: Mismatch Between Figures & Words",
    "title": "Numeric Box Differing From Written Line",
    "desc": "Under Section 18 of the Negotiable Instruments Act, if the amount in words differs from the amount in figures, banks honor the amount in words or return the cheque. Kagazo guarantees exact arithmetic alignment."
  },
  {
    "badge": "Error: Western vs Indian Comma Confusion",
    "title": "Writing 1,000,000 as \"One Lakh\"",
    "desc": "Confusing international grouping (1,000,000 = 1 Million = 10 Lakhs) with Indian Lakhs (1,00,000) causes major accounting and contract errors. Ensure correct comma grouping."
  },
  {
    "badge": "Error: Misspelling Fractional Paise",
    "title": "Omitting Decimals or Writing Wrong Paise",
    "desc": "Writing \".50\" as \"Five Paise\" instead of \"Fifty Paise\" creates balance sheet discrepancies. Kagazo formats fractional cents and paise with exact grammatical precision."
  }
];

const FAQS = [
  {
    "question": "Why is it legally mandatory to write \"Only\" at the end of bank cheques?",
    "answer": "Writing \"Only\" at the end of the amount in words (e.g., \"Rupees Twenty-Five Thousand Only\") is a standard banking safeguard that prevents unauthorized individuals from adding words or zeroes to artificially inflate the cheque value."
  },
  {
    "question": "What happens if the amount in figures differs from the amount in words on a cheque?",
    "answer": "Under Section 18 of the Indian Negotiable Instruments Act, 1881, if there is a discrepancy between the amount stated in words and figures, the amount stated in words shall be the amount undertaken or ordered to be paid. However, banks may reject cheques with discrepancies to prevent fraud."
  },
  {
    "question": "How does the Indian numbering system differ from the International system?",
    "answer": "The Indian system groups the first three digits, then groups every two digits: Hundreds, Thousands, Lakhs (1,00,000), and Crores (1,00,00,000). The International system groups in triples: Thousands, Millions (1,000,000), and Billions (1,000,000,000). 1 Million equals 10 Lakhs; 10 Million equals 1 Crore."
  },
  {
    "question": "How are decimal amounts and paise formatted by this converter?",
    "answer": "Decimal amounts are automatically converted into paise or cents syntax. For example, 1450.75 becomes \"Rupees One Thousand Four Hundred Fifty and Seventy-Five Paise Only\"."
  },
  {
    "question": "What is the maximum number value this converter can handle?",
    "answer": "Kagazo can convert numbers up to 15 digits (up to 999 Kharab / Trillions), covering enterprise financial balances, corporate audit balances, and government budget figures without overflow."
  },
  {
    "question": "Can I export the converted text in all capital letters (UPPERCASE)?",
    "answer": "Yes. You can switch between Title Case (Rupees Fifty Thousand Only), UPPERCASE (RUPEES FIFTY THOUSAND ONLY for official drafts and invoices), and standard sentence case."
  },
  {
    "question": "Is this tool useful for GST invoice and accounting bill generation?",
    "answer": "Yes. Accountants and billing clerks use Kagazo to verify the \"Amount in Words\" line on GST tax invoices, delivery challans, promissory notes, and receipt vouchers."
  },
  {
    "question": "Is my financial data, salary, or transaction value recorded?",
    "answer": "No. Kagazo operates entirely client-side inside your browser RAM. Your numbers, currency figures, and generated text are never transmitted to cloud servers or stored in any database."
  },
  {
    "question": "Does this tool support international currencies like US Dollars, Euros, and Pounds?",
    "answer": "Yes. You can switch currency prefixes and suffixes to format amounts in US Dollars and Cents, British Pounds and Pence, Euros, or generic numbers without currency names."
  },
  {
    "question": "How do I handle hyphens in compound numbers like \"twenty-five\"?",
    "answer": "Kagazo follows standard English grammatical conventions, hyphenating compound numbers between 21 and 99 (e.g. \"twenty-one\", \"ninety-nine\") for formal legal and banking accuracy."
  }
];

export default function NumberToWordsConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Number to Words Converter',
        url: 'https://kagazo.in/tools/number-to-words-converter',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Free online number to words converter. Convert currency amounts to Indian Rupee format (Lakhs & Crores) and International Western format (Millions & Billions). Includes bank cheque writing format ("Rupees ... Only"), title case, and zero server logging.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Numbers to Words in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Number to Words Converter.',
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
            name: 'Number to Words Converter',
            item: 'https://kagazo.in/tools/number-to-words-converter',
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
          <span className="text-primary font-bold">Number to Words Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Indian Lakhs / Crores & Millions • Bank Cheque Wording</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Number to Words Converter & </span>
            <span className="text-primary">Cheque Legal Text Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Free online number to words converter. Convert currency amounts to Indian Rupee format (Lakhs & Crores) and International Western format (Millions & Billions). Includes bank cheque writing format ("Rupees ... Only"), title case, and zero server logging.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <NumberToWordsEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Bank Cheque Protection
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generates formal cheque writing syntax ("Rupees ... Only") to prevent unauthorized additions or alterations.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Dual Number Systems
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Convert seamlessly into Indian numbering (Lakhs, Crores, Arabs) or International Western format (Millions, Billions).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Client-Side Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    All financial figures, invoice totals, and cheque values are parsed locally in browser RAM without server calls.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Indian vs International Numbering System Hierarchy & Nomenclature
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Banking Syntax
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Numeric Value (Figures)</th><th className="py-2.5 px-3 font-bold">Indian Numbering System (Words)</th><th className="py-2.5 px-3 font-bold">International System (Words)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1,00,000 / 100,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">One Lakh Rupees Only</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">One Hundred Thousand Dollars</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">10,00,000 / 1,000,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Ten Lakh Rupees Only</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">One Million Dollars</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1,00,00,000 / 10,000,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">One Crore Rupees Only</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Ten Million Dollars</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">10,00,00,000 / 100,000,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Ten Crore Rupees Only</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">One Hundred Million Dollars</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1,00,00,00,000 / 1,000,000,000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">One Arab Rupees (One Hundred Crore)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">One Billion Dollars</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Paise / Cents Representation</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">and Fifty Paise Only</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">and Fifty Cents Only</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert Numbers to Words in 5 Steps
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
                  Common Cheque Writing Mistakes & Financial Rejections
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
                Cheque Wording
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Cheque Guard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Adds "Rupees" and "Only" to block fraudulent alterations.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Dual Standards</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Indian Lakhs & Crores + International Millions & Billions.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Audit Ready</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Supports UPPERCASE and Title Case formatting styles.
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
                  href="/tools/income-tax-calculator-2025-26"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Income Tax Calculator FY 2025-26
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Tax
                  </span>
                </Link>
                <Link
                  href="/tools/unit-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Universal Unit Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Utility
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
