import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  FileCheck,
  Building,
  Scale,
  CheckCircle2,
} from 'lucide-react';
import { UniversalPdfCompressor } from '@/components/tools/UniversalPdfCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF to 2MB Online Free | Government & Legal Portals | Kagazo',
  description:
    'Compress any PDF file strictly under 2MB online free. Optimize multi-page legal documents, court filings, and official portal annexures without losing text clarity. 100% private.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-2mb',
  },
  openGraph: {
    title: 'Compress PDF to 2MB Online Free | Kagazo',
    description:
      'Reduce PDF documents strictly under 2MB for official e-filing and recruitment portals. High-speed, in-memory processing.',
    url: 'https://kagazo.in/tools/compress-pdf-to-2mb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do legal and corporate portals enforce a 2MB limit on PDFs?',
    answer:
      'Court e-filing systems, government procurement portals, and corporate registrar websites mandate a 2MB maximum per attachment to ensure database integrity and rapid server verification across thousands of daily filings.',
  },
  {
    question: 'Will digital signatures or stamps remain valid after 2MB compression?',
    answer:
      'Kagazo preserves vector paths, line art, and typography while compressing embedded raster images. For DSC cryptographic signatures, we recommend compressing before signing, or verifying signature integrity with our Digital Signature Verifier.',
  },
  {
    question: 'Can I compress 10 to 50 page PDFs down to 2MB?',
    answer:
      'Yes! Kagazo uses Pikepdf stream deduplication and progressive image recompression. If your document has dozens of high-res image scans, toggling "Greyscale Conversion" will drop file weight by an extra 35–50% to comfortably meet the 2MB limit.',
  },
  {
    question: 'Is my data secure when compressing legal contracts?',
    answer:
      '100% secure. Processing runs entirely in volatile RAM memory. Zero files are saved on disk or exposed to any third party.',
  },
  {
    question: 'Which portals require files strictly under 2MB?',
    answer:
      'Supreme Court & High Court e-filing portals, MCA (Ministry of Corporate Affairs) company incorporation forms, GeM (Government e-Marketplace) tender bids, and university thesis submissions universally enforce a 2MB attachment limit.',
  },
  {
    question: 'Can I delete annexures or blank exhibit pages before compressing to 2MB?',
    answer:
      'Yes! Use the built-in Page Selector to preview and exclude any unnecessary pages, immediately freeing up byte budget for your critical petition or contract clauses.',
  },
  {
    question: 'Will high-resolution CAD drawings and charts remain legible?',
    answer:
      'Yes. At 2MB, architectural blueprints and data charts retain sharp line definition, avoiding the blurred edges common on generic compression tools.',
  },
  {
    question: 'Is there any fee or watermark added to the 2MB PDF?',
    answer:
      'Kagazo is 100% free with unlimited usage and zero watermarks, keeping all legal filings clean and formal.',
  },
];

export default function CompressPdfTo2MbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Compress PDF to 2MB Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-pdf-to-2mb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress any PDF strictly under 2MB online free. Perfect for court e-filing, legal contracts, and corporate registrations.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 2MB Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your PDF File',
            text: 'Choose your multi-page legal or corporate PDF document.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic 2MB Ceiling Optimization',
            text: 'Kagazo compresses internal streams to land safely under 2000KB.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Verified Document',
            text: 'Download your optimized, portal-ready PDF file.',
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
          <span className="text-primary font-bold">Compress PDF to 2MB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Target Ceiling: Max 2 MB (2000 KB)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">2MB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress heavy multi-page documents strictly under 2MB for court e-filing, government portals, and university submissions without loss of text quality.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (75% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalPdfCompressor
              initialTargetKb={2000}
              isFixedTarget={true}
              toolHeading="Compress PDF to Under 2 MB"
              toolSubheading="Optimized for court e-filing, legal contracts, tender submissions, and university portals."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Common 2MB PDF Use Cases */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Where 2MB PDF Limits Are Mandated
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Court &amp; Legal e-Filing</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    High Court and District Court e-filing portals limit petition annexures and affidavits to 2MB per document.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Tenders &amp; Procurement</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Government e-Procurement portals require technical bids and audited balance sheets strictly under 2MB.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Corporate Registrations</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    MCA filings, GST registrations, and trademark submissions enforce 2MB caps on multi-page attachments.
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
                  Frequently Asked Questions (2MB PDF Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Answers to common questions about compressing PDF documents to 2MB.
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

          {/* Compact Sticky Right Sidebar Rail (25% Width) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix - High Density Single-Line List */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Other PDF Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-pdf-to-1mb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 1MB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    1 MB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-5mb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 5MB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    5 MB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-10mb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 10MB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    10 MB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-500kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 500KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    500 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 200KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    200 KB
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sleek In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Memory Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Documents are processed in volatile memory and immediately wiped. No copies saved to permanent storage.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">✓ Zero Server Upload</span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">✓ Instant Speed</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
