import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Building2,
  CheckCircle2,
  FileCheck,
  CreditCard,
  AlertTriangle,
} from 'lucide-react';
import { EpfoResizerEngine } from '@/components/tools/EpfoResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'EPFO Passbook & Cancelled Cheque Resizer Under 500 KB Online Free | Kagazo',
  description:
    'Resize bank passbook and cancelled cheque photos strictly under 500 KB for EPFO Unified Member Portal PF withdrawal claims. Automatic clarity filter ensures IFSC and account numbers are razor sharp.',
  alternates: {
    canonical: 'https://kagazo.in/tools/epfo-passbook-photo-resizer',
  },
  openGraph: {
    title: 'EPFO Passbook & Cancelled Cheque Resizer (<500 KB) Online Free | Kagazo',
    description:
      'Zero claim rejections: Compress and sharpen bank passbook or cancelled cheque leaf strictly under 500 KB for EPFO Member e-Sewa.',
    url: 'https://kagazo.in/tools/epfo-passbook-photo-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why does the EPFO portal reject cancelled cheques with "Image Not Clear / Name Not Legible"?',
    answer:
      'Over 35% of EPFO online claim rejections occur because smartphone photos of cheques are compressed too aggressively, blurring the pre-printed account holder name, account number, or bank IFSC code. Kagazo applies an adaptive text-contrast filter that sharpens printed bank details while compressing the file safely below the 500 KB ceiling.',
  },
  {
    question: 'What is the exact file size limit for EPFO Member Portal claim uploads?',
    answer:
      'The EPFO Member e-Sewa portal (Form 19, 31, 10C) strictly mandates that the uploaded cancelled cheque or bank passbook front page must be in JPEG or JPG format and strictly less than or equal to 500 KB. Files larger than 500 KB cannot be submitted.',
  },
  {
    question: 'Does the cancelled cheque need to have my name pre-printed?',
    answer:
      'Yes. As per current EPFO guidelines, a cancelled cheque MUST have the member’s name, bank account number, and IFSC code pre-printed on the cheque leaf. If your cheque book does not have your name pre-printed, submit the front page of your bank passbook with bank stamp/signature instead.',
  },
  {
    question: 'Can I upload a bank passbook front page instead of a cheque?',
    answer:
      'Yes. The EPFO portal accepts either a cancelled cheque leaf OR the first page of your bank passbook clearly showing the member name, account number, IFSC code, and branch address with official bank attestation.',
  },
  {
    question: 'Are my private banking documents uploaded to your servers?',
    answer:
      'No. Your financial documents never leave your browser. All contrast enhancements and JPEG compression execute 100% locally in your device’s volatile RAM. Zero bytes are stored or uploaded.',
  },
];

export default function EpfoPassbookResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'EPFO Passbook & Cancelled Cheque Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/epfo-passbook-photo-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Resize bank passbook and cancelled cheque scans strictly under 500 KB with text sharpness enhancement for EPFO PF claims.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Cheque or Passbook for EPFO PF Claim',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Cheque or Passbook Photo',
            text: 'Select or drag your cancelled cheque leaf or passbook front page photo.',
          },
          {
            '@type': 'HowToStep',
            name: 'Enable Bank Text Clarity Booster',
            text: 'Verify that the pre-printed account holder name, account number, and IFSC code are dark and crisp.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Verified Document (<500 KB)',
            text: 'Download the optimized JPEG file guaranteed to pass EPFO Member e-Sewa verification.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <span className="text-primary font-bold">EPFO Passbook Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>EPFO Unified Member Portal • Form 19, 31 &amp; 10C Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>EPFO Passbook &amp; Cheque </span>
            <span className="text-primary">Resizer Under 500 KB</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Optimize bank passbook front pages and cancelled cheques strictly under 500 KB with text sharpness enhancement. Guaranteed zero rejection on EPFO Unified Portal.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column (col-span-9 / col-span-10) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <EpfoResizerEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Rejection Prevention Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Top 3 Reasons EPFO Rejects Bank Cheque Uploads
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow these guidelines to ensure your online PF withdrawal claim is settled without delay.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block">
                    1. Name Not Pre-Printed
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    If your cheque leaf does not have your name pre-printed by the bank, EPFO field officers reject the claim. Use the passbook front page instead.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block">
                    2. Blurry IFSC Code
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Extreme file compression causes the 11-digit IFSC code to blur. Kagazo’s clarity booster keeps letters and digits 100% legible.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    3. File Size Exceeds 500 KB
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Camera scans over 500 KB trigger an immediate upload error. Kagazo locks the final size safely between 380 KB and 480 KB.
                  </p>
                </div>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about uploading bank proof for EPFO PF claims.
                </p>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl bg-surface/50 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-5 font-bold text-text-main text-xs sm:text-sm cursor-pointer list-none select-none">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-2" />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/40 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail (col-span-3 / col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/sarathi-driving-licence-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Sarathi DL Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    MoRTH
                  </span>
                </Link>

                <Link
                  href="/tools/pan-card-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PAN Card Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    213×213
                  </span>
                </Link>

                <Link
                  href="/tools/aadhaar-pan-kyc-merge"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Aadhaar + PAN KYC
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    KYC PDF
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-500kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to 500KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    500 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-exact-kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Exact KB Tool
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    KB Limit
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Your bank details and cheques are processed strictly in your device volatile memory. No documents are uploaded to any server.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Bank Clarity Locked
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ &lt; 500 KB Verified
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
