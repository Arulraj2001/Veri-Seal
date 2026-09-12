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
  MapPin,
  ExternalLink,
} from 'lucide-react';
import GstinVerifierEngine from '@/components/tools/GstinVerifierEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'GST Number (GSTIN) Instant Verifier & Taxpayer Lookup | Free MOD 36',
  description:
    'Mathematically verify 15-digit Indian GST numbers online for free. Decode state codes, embedded business PAN, and entity registration numbers with official MOD 36 checksum calculation to detect fake GST bills.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/gst-number-verifier',
  },
  openGraph: {
    title: 'Free GST Number (GSTIN) Verifier | Kagazo',
    description:
      'Verify Indian GSTIN numbers, decode State & PAN, and validate MOD 36 checksum instantly.',
    url: 'https://Kagazo.in/tools/gst-number-verifier',
    siteName: 'Kagazo',
    type: 'website',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('GST Number (GSTIN) Instant Verifier')}&subtitle=${encodeURIComponent('Taxpayer Lookup & Free ISO/IEC 7064 MOD 36 Checksum')}&type=tool`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const POPULAR_STATE_CODES = [
  { code: '33', state: 'Tamil Nadu', region: 'South' },
  { code: '27', state: 'Maharashtra', region: 'West' },
  { code: '29', state: 'Karnataka', region: 'South' },
  { code: '07', state: 'Delhi', region: 'North' },
  { code: '24', state: 'Gujarat', region: 'West' },
  { code: '09', state: 'Uttar Pradesh', region: 'North' },
  { code: '36', state: 'Telangana', region: 'South' },
  { code: '37', state: 'Andhra Pradesh', region: 'South' },
  { code: '32', state: 'Kerala', region: 'South' },
  { code: '19', state: 'West Bengal', region: 'East' },
];

const FAQS = [
  {
    question: 'How do I know if a GST number on an invoice is genuine or fake?',
    answer:
      'A valid GSTIN must strictly follow the 15-character statutory format: 2 state digits + 10 PAN characters + 1 entity count + "Z" + 1 MOD 36 checksum character. Fake or forged GST numbers almost always fail the mathematical ISO/IEC 7064 MOD 36 algorithm. Kagazo computes this check instantly in your browser.',
  },
  {
    question: 'What is the consequence of accepting a fake GST invoice?',
    answer:
      'If you pay GST to a vendor holding an invalid or cancelled GSTIN, the Goods and Services Tax Network (GSTN) will deny your Input Tax Credit (ITC) under Section 16(2) of the CGST Act. You may also face penalty interest up to 18% per annum.',
  },
  {
    question: 'What information is embedded inside a 15-digit GSTIN?',
    answer:
      'The first 2 digits represent the State Code (e.g., 33 for Tamil Nadu). The next 10 characters (digits 3 to 12) represent the Permanent Account Number (PAN) of the taxpayer. The 13th character represents the number of business vertical registrations in that state. The 14th character is always "Z" by default, and the 15th is an error-detecting checksum.',
  },
  {
    question: 'Is any searched GSTIN stored or tracked by Kagazo?',
    answer:
      'No. All validation algorithms, state mappings, and checksum calculations execute strictly in client-side JavaScript inside your browser. No taxpayer or vendor numbers are logged on our servers.',
  },
];

export default function GstinVerifierPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo GST Number (GSTIN) Instant Verifier',
        url: 'https://Kagazo.in/tools/gst-number-verifier',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Validate 15-digit Indian GST numbers, decode State and PAN details, and check MOD 36 checksum.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Check if a GST Number is Valid',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter 15-Digit GSTIN',
            text: 'Type or paste the 15-character GST number printed on your invoice or bill.',
          },
          {
            '@type': 'HowToStep',
            name: 'Verify Checksum & State',
            text: 'Inspect the computed MOD 36 checksum and verify that the registered State matches your vendor.',
          },
          {
            '@type': 'HowToStep',
            name: 'Check Live Portal Status',
            text: 'Click Official GST Portal to inspect active filing history and return compliance.',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Verification Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">GSTIN Verifier</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>GST Council &amp; GSTN ISO/IEC 7064 Standard</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                GST Number (GSTIN) Instant Verifier
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Validate 15-digit Indian GST numbers, decode registered State and business PAN details, and mathematically verify the official <strong>MOD 36 error-detection checksum</strong> to prevent fake invoice fraud and protect your Input Tax Credit (ITC).
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Client-Side Algorithm Privacy:</strong> All GSTIN checks run directly inside your browser. No searched vendor numbers or invoice data are logged on our servers.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <GstinVerifierEngine />

            {/* State Code Reference Cheatsheet */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-foreground">
                    Indian GST State Code Reference Table
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                  State Prefix
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {POPULAR_STATE_CODES.map((item) => (
                  <div
                    key={item.code}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 text-center"
                  >
                    <span className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400 block">
                      {item.code}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                      {item.state}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.region} India
                    </span>
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
            {/* Input Tax Credit Card */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Input Tax Credit (ITC) Protection</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Verify Before Invoice Payment</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Never release payment on handwritten or unverified GST invoices without verifying the 15-digit GSTIN.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">GSTR-2B Matching</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Ensure vendor files GSTR-1 on time so the invoice reflects in your monthly GSTR-2B auto-drafted statement.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Related Verification Tools</span>
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
                  href="/tools/affidavit-generator"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Bilingual Affidavit Generator
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/mask-aadhaar"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Official Masked Aadhaar Redactor
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Ad Space (Ostrune Exclusive) */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
