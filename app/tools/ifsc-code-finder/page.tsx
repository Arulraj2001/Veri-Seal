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
  PenTool,
  Search,
  Fingerprint,
} from 'lucide-react';
import IfscFinderEngine from '@/components/tools/IfscFinderEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'IFSC Code & Bank Branch Finder Online (NEFT, RTGS, IMPS) | Kagazo',
  description: 'Find 11-character IFSC codes and branch details for all banks in India (SBI, HDFC, ICICI, PNB, Canara). Instant lookup by bank name, state, district, and branch. Verified for NEFT, RTGS, IMPS, and UPI wire transfers. 100% private.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ifsc-code-finder',
  },
  openGraph: {
    title: 'IFSC Code & Bank Branch Finder Online (NEFT, RTGS, IMPS) | Kagazo',
    description: 'Find 11-character IFSC codes and branch details for all banks in India (SBI, HDFC, ICICI, PNB, Canara). Instant lookup by bank name, state, district, and branch. Verified for NEFT, RTGS, IMPS, and UPI wire transfers. 100% private.',
    url: 'https://kagazo.in/tools/ifsc-code-finder',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IFSC Code & Bank Branch Finder Online (NEFT, RTGS, IMPS) | Kagazo',
    description: 'Find 11-character IFSC codes and branch details for all banks in India (SBI, HDFC, ICICI, PNB, Canara). Instant lookup by bank name, state, district, and branch. Verified for NEFT, RTGS, IMPS, and UPI wire transfers. 100% private.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Bank Name",
    "desc": "Choose from SBI, HDFC, ICICI, Punjab National Bank, Canara Bank, Bank of Baroda, and 200+ banks."
  },
  {
    "step": 2,
    "title": "Choose State & Territory",
    "desc": "Select the Indian state or Union Territory where the branch is physically located."
  },
  {
    "step": 3,
    "title": "Select District & Town",
    "desc": "Pick the target revenue district or metropolitan city jurisdiction."
  },
  {
    "step": 4,
    "title": "Select Branch Location",
    "desc": "Pick the exact branch name or locality address from the filtered dropdown list."
  },
  {
    "step": 5,
    "title": "Copy Verified IFSC Code",
    "desc": "1-click copy the 11-character IFSC code, MICR code, branch address, and contact phone numbers."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Letter \"O\" vs Number \"0\"",
    "title": "Typing Letter O as the 5th Character",
    "desc": "The 5th character of every valid IFSC is mathematically required to be the numeric zero (0). Typing the English letter \"O\" causes banking apps to reject the beneficiary code immediately."
  },
  {
    "badge": "Error: Post-Merger Legacy Codes",
    "title": "Using Old IFSC of Merged Banks",
    "desc": "Following major public sector bank mergers (e.g., Andhra Bank/Corporation Bank into Union Bank; Syndicate Bank into Canara Bank), legacy IFSC codes were permanently deactivated. Always use the updated anchor bank IFSC."
  },
  {
    "badge": "Error: Account & Branch Mismatch",
    "title": "Transposing Digits in Branch Code",
    "desc": "Entering a different branch IFSC under the same bank may still route the payment in core banking, but can cause multi-day reconciliation holds for RTGS and large enterprise transfers."
  },
  {
    "badge": "Error: Confusing IFSC with MICR",
    "title": "Pasting 9-Digit MICR into Wire Transfer Forms",
    "desc": "MICR is a 9-digit numeric code used solely for physical paper cheque sorting. Electronic transfers (NEFT/RTGS/IMPS) strictly require the 11-character alphanumeric IFSC."
  }
];

const FAQS = [
  {
    "question": "What is an IFSC code and why is it required?",
    "answer": "The Indian Financial System Code (IFSC) is an 11-character alphanumeric code assigned by the Reserve Bank of India (RBI) to uniquely identify every bank branch participating in electronic payment networks like NEFT, RTGS, IMPS, and UPI."
  },
  {
    "question": "What does the 5th character in an IFSC code mean?",
    "answer": "Under RBI specifications, the 5th character of every Indian IFSC code is permanently fixed as the number zero (\"0\"). It is reserved for future routing protocols and never contains an alphabetical letter."
  },
  {
    "question": "Where can I find the IFSC code on a bank cheque book?",
    "answer": "The IFSC code is printed prominently on the top-left or top-center portion of every bank cheque leaf, alongside the bank branch address and customer care contact numbers."
  },
  {
    "question": "What are the minimum and maximum transfer limits for NEFT, RTGS, and IMPS?",
    "answer": "NEFT has no minimum limit and operates 24x7 in half-hourly batches. RTGS has a minimum transfer requirement of Rs 2,00,000 for gross settlement. IMPS allows instant 24x7 transfers up to Rs 5,00,000 per transaction."
  },
  {
    "question": "What happened to IFSC codes of banks that merged in recent years?",
    "answer": "All legacy IFSC codes of merged banks (e.g., Allahabad Bank, Oriental Bank of Commerce, United Bank of India, Dena Bank, Vijaya Bank) were discontinued by RBI. Account holders must use the new assigned IFSC of their parent anchor bank."
  },
  {
    "question": "What is the difference between an IFSC code and a MICR code?",
    "answer": "IFSC is an 11-character alphanumeric code used for digital online fund transfers (NEFT/RTGS). MICR is a 9-digit numeric code printed with magnetic ink at the bottom of cheque leaves for optical cheque clearing."
  },
  {
    "question": "Is my bank search query or financial activity tracked on Kagazo?",
    "answer": "No. All branch lookups and database queries execute in client-side memory. No bank selections, searches, or account associations are logged or tracked on external servers."
  },
  {
    "question": "Can I initiate an international wire transfer using only an IFSC code?",
    "answer": "No. IFSC is strictly for domestic fund transfers within India. For international inward wire transfers from abroad, foreign banks require the SWIFT / BIC code of your Indian bank along with your account number."
  },
  {
    "question": "Can a single bank branch have multiple IFSC codes?",
    "answer": "Generally, each physical branch has exactly one primary IFSC. However, specialized administrative desks within the same building (such as Treasury, Forex, or Clearing Hubs) may carry separate assigned sub-codes."
  },
  {
    "question": "What happens if I enter the correct account number but the wrong IFSC code?",
    "answer": "Under RBI guidelines, credit is determined primarily by the beneficiary account number. However, if the IFSC belongs to a completely different bank, the transaction is rejected and refunded within 2 to 4 business hours."
  }
];

export default function IfscCodeFinderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'IFSC Code & Bank Branch Finder',
        url: 'https://kagazo.in/tools/ifsc-code-finder',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Find 11-character IFSC codes and branch details for all banks in India (SBI, HDFC, ICICI, PNB, Canara). Instant lookup by bank name, state, district, and branch. Verified for NEFT, RTGS, IMPS, and UPI wire transfers. 100% private.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Find Any Bank IFSC Code in 5 Steps',
        description: 'Step-by-step verified workflow instructions for IFSC Code & Bank Branch Finder.',
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
            name: 'IFSC Code & Bank Branch Finder',
            item: 'https://kagazo.in/tools/ifsc-code-finder',
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
          <span className="text-primary font-bold">IFSC Code & Bank Branch Finder</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>11-Character RBI Format • All Indian Banks & Branches</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>IFSC Code & Bank Branch Finder </span>
            <span className="text-primary">(NEFT, RTGS, IMPS & UPI)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Find 11-character IFSC codes and branch details for all banks in India (SBI, HDFC, ICICI, PNB, Canara). Instant lookup by bank name, state, district, and branch. Verified for NEFT, RTGS, IMPS, and UPI wire transfers. 100% private.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <IfscFinderEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> RBI 11-Character Standard
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Verified format compliance with the mandatory 5th-character zero rule across all scheduled commercial banks.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Cascading Drill-Down
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Rapid hierarchical search: Select Bank Name to State to District to Branch Location in under 5 seconds.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Client-Side Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your banking queries, branch searches, and wire transfer lookups are executed in local memory without server logging.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Reserve Bank of India (RBI) Bank Identification Code Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  RBI Transfer Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Code Identifier</th><th className="py-2.5 px-3 font-bold">Character Length & Structure</th><th className="py-2.5 px-3 font-bold">Transfer Protocol Supported</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">IFSC (Indian Financial System Code)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">11 alphanumeric characters (e.g. SBIN0001234)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">NEFT, RTGS, IMPS, and UPI routing</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Characters 1 to 4</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">4-letter alphabetical bank prefix (e.g. HDFC, ICIC)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Identifies the parent banking corporation</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Character 5</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Always the single digit "0" (Numeric Zero)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Reserved for future control and branch indexing</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Characters 6 to 11</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">6 alphanumeric characters defining exact branch</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Identifies the specific physical branch office</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">MICR (Magnetic Ink Character Recognition)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">9 numeric digits printed on cheque footer</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Automated cheque clearing through RBI ECS/CTS</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SWIFT / BIC Code</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">8 or 11 characters (e.g. SBININBBXXX)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">International overseas cross-border wire transfers</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Find Any Bank IFSC Code in 5 Steps
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
                  Common IFSC Wire Transfer Errors & Fund Delays
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
                IFSC Criteria
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">11-Char Format</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Bank (4) + 0 (1) + Branch Code (6).
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">200+ Banks</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    All scheduled commercial & rural banks in India.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Zero Tracking</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% private in-browser branch discovery.
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
                  href="/tools/gst-number-verifier"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      GST Number Verifier
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    GST
                  </span>
                </Link>
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
                All calculations and security operations occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
