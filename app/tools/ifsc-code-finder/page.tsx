import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  FileText,
  CreditCard,
  Building,
} from 'lucide-react';
import IfscFinderEngine from '@/components/tools/IfscFinderEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'IFSC Code Finder & Bank Branch Search | RBI NEFT, RTGS & IMPS',
  description:
    'Search and find IFSC codes, MICR codes, branch addresses, and contact numbers for all Indian banks (State Bank of India, Indian Bank, Canara, HDFC, ICICI, PNB). Fast 1-click copy for exam forms and online money transfers.',
  alternates: {
    canonical: 'https://veriseal.in/tools/ifsc-code-finder',
  },
  openGraph: {
    title: 'Free IFSC Code & Bank Branch Finder | VeriSeal',
    description:
      'Find IFSC and MICR codes for Indian banks with branch address and 1-click copy.',
    url: 'https://veriseal.in/tools/ifsc-code-finder',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const POPULAR_BANKS = [
  { name: 'State Bank of India (SBI)', prefix: 'SBIN', branches: '24,000+ Branches' },
  { name: 'Indian Bank', prefix: 'IDIB', branches: '6,000+ Branches' },
  { name: 'Canara Bank', prefix: 'CNRB', branches: '9,500+ Branches' },
  { name: 'HDFC Bank', prefix: 'HDFC', branches: '8,000+ Branches' },
  { name: 'Indian Overseas Bank (IOB)', prefix: 'IOBA', branches: '3,200+ Branches' },
  { name: 'Punjab National Bank (PNB)', prefix: 'PUNB', branches: '10,000+ Branches' },
];

const FAQS = [
  {
    question: 'What is an IFSC Code and what do the 11 characters mean?',
    answer:
      'The Indian Financial System Code (IFSC) is an 11-character alphanumeric code assigned by the Reserve Bank of India (RBI). The first 4 alphabetic characters represent the bank name (e.g. `SBIN` for SBI). The 5th character is always `0` (reserved for future use). The remaining 6 characters identify the specific branch code.',
  },
  {
    question: 'What is the difference between an IFSC Code and a MICR Code?',
    answer:
      'An IFSC code is used for electronic money transfers (NEFT, RTGS, IMPS, UPI). A MICR code (Magnetic Ink Character Recognition) is a 9-digit code printed at the bottom of bank cheques used for clearing physical paper cheques through RBI clearing houses.',
  },
  {
    question: 'Can I find an IFSC code if I only have the branch location?',
    answer:
      'Yes! Switch to "Browse by Bank & State" mode on VeriSeal. Select your bank, state, and city to immediately discover your branch’s active IFSC, MICR, and office address.',
  },
  {
    question: 'Are my searched bank account details or IFSC lookups stored?',
    answer:
      'No. VeriSeal queries client-side databases. Zero search queries or banking lookups are logged on our servers.',
  },
];

export default function IfscFinderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'VeriSeal IFSC Code & Bank Branch Finder',
        url: 'https://veriseal.in/tools/ifsc-code-finder',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Find IFSC codes, MICR codes, and branch addresses for all Indian banks with 1-click copy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Find an IFSC Code Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter IFSC or Select Bank',
            text: 'Type your 11-character IFSC code or select your bank and state.',
          },
          {
            '@type': 'HowToStep',
            name: 'View Branch Details',
            text: 'Inspect branch address, MICR number, and city location.',
          },
          {
            '@type': 'HowToStep',
            name: '1-Click Copy',
            text: 'Copy the IFSC code directly to clipboard for exam application or netbanking transfer.',
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
            { label: 'Tools', href: '/tools' },
            { label: 'IFSC Code Finder' },
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
                <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Reserve Bank of India (RBI) National Settlement Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                IFSC Code &amp; Bank Branch Finder
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Search and find 11-character IFSC codes, 9-digit MICR numbers, branch addresses, and contact phone numbers for all Indian banks. Instant 1-click copy for exam applications, scholarship forms, and online money transfers.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero-Tracking Search:</strong> Your searched bank branches, account codes, and IFSC keys are processed completely in local memory. Zero searches are recorded on servers.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <IfscFinderEngine />

            {/* Popular Banks Cheatsheet */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <Building className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-foreground">
                    Major Indian Banks IFSC Prefix Reference
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                  National Directory
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {POPULAR_BANKS.map((bank) => (
                  <div
                    key={bank.prefix}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-1"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                      {bank.name}
                    </span>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {bank.prefix}•••••••
                      </span>
                      <span className="text-slate-400">{bank.branches}</span>
                    </div>
                  </div>
                ))}
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
            {/* NEFT / RTGS Transfer Rules */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>RBI Settlement Timings</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">NEFT &amp; RTGS: 24×7×365</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Operating 24 hours a day, including weekends and bank holidays.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Exact IFSC Required</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Funds are credited purely based on account number and IFSC key.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Related Banking Tools</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/aadhaar-pan-kyc-merge"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    Aadhaar + PAN Single PDF KYC
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
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
                  href="/tools/income-tax-calculator-2025-26"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    Income Tax Calculator FY 25-26
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
        <RelatedTools currentSlug="/tools/ifsc-code-finder" />
      </div>
    </div>
  );
}
