import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  FileCheck2,
  Lock,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import AadhaarPanKycMergerEngine from '@/components/tools/AadhaarPanKycMergerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Aadhaar + PAN Single PDF KYC Merger (<200KB) | Bank & SIM KYC',
  description:
    'Combine Aadhaar card (front & back) and PAN card into a single A4 PDF strictly under 200KB or 500KB. 1-click RBI first-8-digit masking for SBI, HDFC, ICICI, and telecom SIM KYC. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://veriseal.in/tools/aadhaar-pan-kyc-merge',
  },
  openGraph: {
    title: 'Aadhaar + PAN Single PDF KYC Merger (<200KB) | VeriSeal',
    description:
      'Merge Aadhaar Front, Back, and PAN into one bank-compliant A4 PDF with optional RBI masking.',
    url: 'https://veriseal.in/tools/aadhaar-pan-kyc-merge',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const BANK_RULES = [
  { bank: 'State Bank of India (SBI Online)', requirement: 'Single PDF containing Aadhaar + PAN', limit: '< 200 KB' },
  { bank: 'HDFC Bank InstaAccount', requirement: 'Both documents on single page', limit: '< 500 KB' },
  { bank: 'ICICI Bank / iMobile KYC', requirement: 'Clear color scan with legible numbers', limit: '< 200 KB' },
  { bank: 'Telecom SIM / eSIM Activation', requirement: 'Aadhaar (front+back) & PAN proof', limit: '< 300 KB' },
  { bank: 'EPFO & UAN Member Portal', requirement: 'Consolidated KYC identity proof', limit: '< 500 KB' },
];

const FAQS = [
  {
    question: 'Why do banks require Aadhaar and PAN combined in a single PDF?',
    answer:
      'Most Indian online banking portals (SBI, HDFC, ICICI, Axis) and loan applications only have a single file upload slot titled "KYC Proof" or "Identity & Address Document". Combining both cards onto a single A4 page prevents application rejection and saves you from paying ₹50 at cyber cafes.',
  },
  {
    question: 'What is RBI Masked Aadhaar and should I enable it?',
    answer:
      'According to RBI Circular RBI/2018-19/190, regulated financial entities cannot accept unmasked physical copies of Aadhaar without customer consent. Enabling "Auto-Mask First 8 Digits" automatically covers the first 8 numbers into `XXXX-XXXX-1234` format while keeping the photograph and QR code intact for official legal KYC compliance.',
  },
  {
    question: 'How do I ensure the combined PDF stays strictly under 200 KB?',
    answer:
      'VeriSeal includes a dedicated "< 200 KB" preset. Our intelligent canvas compressor calibrates the JPEG compression matrix and removes bloated metadata so the final A4 PDF stays comfortably between 140 KB and 195 KB without sacrificing the legibility of micro-text or card numbers.',
  },
  {
    question: 'Are my sensitive Aadhaar and PAN numbers saved on your server?',
    answer:
      'Never. VeriSeal executes 100% of the image cropping, layout assembly, and vector PDF encoding directly inside your local browser’s RAM memory. Zero bytes are uploaded to our servers or stored in any database.',
  },
];

export default function AadhaarPanKycPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'VeriSeal Aadhaar + PAN Single PDF KYC Merger',
        url: 'https://veriseal.in/tools/aadhaar-pan-kyc-merge',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Merge Aadhaar Front, Back, and PAN into a single compliant A4 PDF strictly under 200KB or 500KB with RBI masking.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Combine Aadhaar and PAN into a Single PDF',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Aadhaar Card',
            text: 'Upload phone photos or scans of Aadhaar front and back sides.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload PAN Card',
            text: 'Upload the front side of your PAN card.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Target Size & Masking',
            text: 'Select < 200 KB or < 500 KB and enable RBI first-8-digit masking if required.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant PDF',
            text: 'Download the combined single-page A4 PDF ready for instant bank upload.',
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
            { label: 'Aadhaar + PAN Single PDF' },
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
                <CreditCard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Reserve Bank of India (RBI) KYC Standard Format</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Aadhaar + PAN Single PDF KYC Merger
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Combine your Aadhaar Card (Front &amp; Back) and PAN Card onto a single standard A4 page strictly under <strong>200 KB or 500 KB</strong>. Formatted specifically for online bank account opening, instant personal loans, and telecom SIM card KYC.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-Browser RAM Security:</strong> Your citizen identity numbers (Aadhaar &amp; PAN) are assembled directly inside your local computer memory. Zero data is sent to our servers.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <AadhaarPanKycMergerEngine />

            {/* Bank Portal Requirements Cheatsheet */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-foreground">
                    Bank &amp; Financial Portal KYC Standards
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                  2026 Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <th className="py-2.5 px-3 font-bold">Portal / Institution</th>
                      <th className="py-2.5 px-3 font-bold">Document Format</th>
                      <th className="py-2.5 px-3 font-bold">Mandatory Limit</th>
                      <th className="py-2.5 px-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    {BANK_RULES.map((rule, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{rule.bank}</span>
                        </td>
                        <td className="py-2.5 px-3">{rule.requirement}</td>
                        <td className="py-2.5 px-3 font-mono font-semibold text-emerald-600">
                          {rule.limit}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                            100% Pass
                          </span>
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
            {/* RBI Circular Pillar Card */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>RBI Master Direction Circular</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Section 16: Officially Valid Doc (OVD)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Aadhaar + PAN together satisfy both Proof of Identity (PoI) and Proof of Address (PoA).
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Aadhaar First-8-Digits Redaction</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Banks cannot insist on unmasked physical copies. Toggle &quot;Auto-Mask&quot; for complete legal safety.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Related KYC Tools</span>
              </h3>
              <div className="space-y-2">
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
                <Link
                  href="/tools/unlock-pdf"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    Unlock e-Aadhaar Password
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/a4-multi-card-sheet"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    5-in-1 Multi-Card A4 Gang Sheet
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/driving-license-card-merger"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    Driving License Front &amp; Back
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
        <RelatedTools currentSlug="/tools/aadhaar-pan-kyc-merge" />
      </div>
    </div>
  );
}
