import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Unlock,
  Award,
  HelpCircle,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PdfUnlockEngine } from '@/components/tools/PdfUnlockEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Unlock e-Aadhaar PDF Online Free | Remove Password from PDF | Kagazo',
  description:
    'Permanently remove password encryption from e-Aadhaar, Form 16, and bank statement PDFs online free. 100% in-memory processing. Prepare unencrypted PDFs for UPSC, SSC, and TNPSC upload portals.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/unlock-pdf',
  },
  openGraph: {
    title: 'Unlock e-Aadhaar PDF Online Free | Kagazo',
    description:
      'Remove password protection from e-Aadhaar and certificates. Zero watermark, 100% RAM privacy.',
    url: 'https://Kagazo.in/tools/unlock-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do government exam portals reject password-protected e-Aadhaar PDFs?',
    answer:
      'Recruitment portals (like UPSC, SSC, TNPSC, NTA, and IBPS) use automated servers to scan, index, and verify uploaded documents. Since automated server scripts cannot prompt for passwords, any encrypted or password-protected PDF is automatically rejected with an error like "File is encrypted or password-protected".',
  },
  {
    question: 'What is the default password for e-Aadhaar PDFs?',
    answer:
      'According to UIDAI guidelines, the default password for an e-Aadhaar PDF is an 8-character combination: The first 4 letters of your name in CAPITAL letters (as printed on your Aadhaar card) followed by your 4-digit Year of Birth (YYYY). For example, if your name is SURESH and birth year is 1998, your password is SURE1998.',
  },
  {
    question: 'Is it safe to unlock my e-Aadhaar PDF on Kagazo?',
    answer:
      'Yes, 100% safe. Kagazo processes your PDF exclusively in volatile RAM memory. Your document, password, and personal details are immediately wiped from memory after download. We never save your files to disk or databases.',
  },
  {
    question: 'Will unlocking the PDF affect its validity or digital signature?',
    answer:
      'No. The decrypted PDF retains all visual elements, barcodes, QR codes, and text content with complete clarity. It can be opened on any device, uploaded to any government portal, and printed without asking for a password.',
  },
];

export default function UnlockPdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Unlock e-Aadhaar & Encrypted PDF Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://Kagazo.in/tools/unlock-pdf',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Permanently remove password encryption from e-Aadhaar, Form 16, and bank statement PDFs online free.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Remove Password from e-Aadhaar PDF Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Encrypted PDF',
            text: 'Select your password-protected e-Aadhaar or document PDF.',
          },
          {
            '@type': 'HowToStep',
            name: 'Provide Password or e-Aadhaar Details',
            text: 'Enter the first 4 letters of candidate name and birth year (or custom password).',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Decrypted PDF',
            text: 'Download the unlocked PDF ready for instant upload on government exam portals.',
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
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
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
            { label: 'PDF Password Remover' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>100% In-Memory RAM Decryption &bull; Zero Storage</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Unlock e-Aadhaar &amp; </span>
            <span className="text-primary">PDF Password Remover</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Permanently decrypt password-protected e-Aadhaar cards, Form 16, and salary slips in a single click. 
            Produces a clean unencrypted PDF ready for direct upload to UPSC, SSC, and TNPSC portals.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <PdfUnlockEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Why Unlocked PDFs are Required */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Why Encrypted PDFs Fail on Government Portals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block">
                    The Problem
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    UIDAI locks every downloaded e-Aadhaar with 256-bit AES encryption. When you submit this file to UPSC, SSC, or bank portals, their automated validation servers cannot open it and immediately reject your application.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    The Kagazo Fix
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Kagazo authenticates your password and generates a completely decrypted PDF stream in RAM memory. The resulting file has zero password locks and uploads seamlessly on any portal.
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
                  Frequently Asked Questions (PDF Password Remover)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear answers about unlocking confidential identity PDFs.
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

          {/* Sticky Right Sidebar Rail (32% Width) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Identity Tools
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/pdf-to-image"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      PDF to Image (300 DPI)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Convert e-Aadhaar to crisp JPG
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Marksheet to PDF (&lt; 200 KB)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      1-click certificate to A4 PDF
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      SSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB guaranteed
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      UPSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–300 KB, 350×350 px
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* RAM Security & Privacy Shield */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Zero-Disk RAM Security</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your password and decrypted document are processed purely in ephemeral RAM memory and wiped immediately upon download. Never stored on server disks.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> 100% Free
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/pdf-password-remover" />
      </div>
    </div>
  );
}
