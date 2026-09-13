import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  PenTool,
  CheckCircle2,
  FileCheck,
  FileText,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { SignPdfEngine } from '@/components/tools/SignPdfEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Sign PDF Online Free (No Sign-up, No Watermarks & 100% Private) | Kagazo',
  description:
    'Sign PDF documents online free with zero account sign-up. Draw your signature, type in elegant script, or scan paper signatures with phone. 100% private in-browser RAM flattening.',
  alternates: {
    canonical: 'https://kagazo.in/tools/sign-pdf',
  },
  openGraph: {
    title: 'Sign PDF Online Free (No Account Required) | Kagazo',
    description:
      'Draw, type, or upload signatures to any PDF. Permanent vector flattening, zero cloud storage, legally valid under IT Act & ESIGN.',
    url: 'https://kagazo.in/tools/sign-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Are electronic signatures created on Kagazo legally valid?',
    answer:
      'Yes. Electronic signatures created by drawing or embedding your signature onto documents are legally recognized in India under the Information Technology Act (IT Act 2000 Section 5) and in the United States under the ESIGN Act (Electronic Signatures in Global and National Commerce Act), as well as the Uniform Electronic Transactions Act (UETA).',
  },
  {
    question: 'Are my confidential contracts or legal documents uploaded to your servers?',
    answer:
      'Never. Kagazo processes PDF documents and signatures 100% inside your web browser’s volatile RAM using client-side JavaScript (pdf-lib). Zero bytes leave your device, meaning confidential business agreements, tax forms, and rental contracts remain completely private.',
  },
  {
    question: 'Can I upload a smartphone photo of my signature on paper?',
    answer:
      'Yes! Choose the "Phone Scan" tab and upload a picture of your signature taken on white paper. Kagazo’s thresholding engine automatically removes shadows and paper texture, converting it into a clean, transparent ink signature that blends naturally onto the document.',
  },
  {
    question: 'Is there a limit on how many PDFs I can sign, or are there hidden watermarks?',
    answer:
      'There are zero limits, zero paywalls, and zero watermarks. While commercial platforms like Smallpdf and DocuSign limit free users to 1 document or slap large branding across your pages, Kagazo is completely free and unwatermarked.',
  },
  {
    question: 'Can I choose which page of a multi-page PDF document to sign?',
    answer:
      'Yes. Our document navigation toolbar allows you to jump to any page (e.g. Page 3 of 10) and place your signature, date stamp, or initials at the exact line or box required.',
  },
];

export default function SignPdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Sign PDF Online Free',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/sign-pdf',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Sign PDF documents online free with draw, type, and phone scan modes. In-browser RAM vector flattening with zero server uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Sign a PDF Online Without Account Registration',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload PDF Document',
            text: 'Drag and drop your PDF agreement, form, or contract into the signer workspace.',
          },
          {
            '@type': 'HowToStep',
            name: 'Create Your Signature',
            text: 'Draw using mouse/finger, type in cursive script, or upload a photo of your paper signature.',
          },
          {
            '@type': 'HowToStep',
            name: 'Position and Flatten',
            text: 'Select your target page, drag signature into position, and download your signed PDF instantly.',
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
          <span className="text-primary font-bold">Sign PDF Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>100% In-Browser RAM Privacy • Zero Account Sign-up</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Sign PDF Online </span>
            <span className="text-primary">Free &amp; Private</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Draw, type, or upload your signature. Position anywhere on any page and permanently flatten vector ink into your PDF. Zero watermarks, zero document limits.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column (col-span-9 / col-span-10) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SignPdfEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Legal Framework Explanatory Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Legal Framework &amp; Data Confidentiality
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  How Kagazo complies with international electronic document legislation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    IT Act 2000 (India)
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Under Section 5 of India’s Information Technology Act, electronic signatures carry legal authentication for non-notarized contracts and affidavits.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    US ESIGN &amp; UETA
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Complies with the Electronic Signatures in Global and National Commerce Act. Signatures flattened in PDF bytes are legally binding.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    Zero Data Retention
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Unlike cloud signing platforms, Kagazo never stores your documents or signature assets. Everything is wiped the moment you close the tab.
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
                  Frequently asked questions about signing PDF files online.
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
                  href="/tools/pdf-compressor"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PDF Compressor
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    PDF
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to 200KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    200 KB
                  </span>
                </Link>

                <Link
                  href="/tools/image-to-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Image to PDF
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    A4 PDF
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    300 DPI
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
                PDF vector flattening takes place directly in client-side memory via pdf-lib. Documents never touch any cloud server.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Zero Sign-up
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Zero Watermarks
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
