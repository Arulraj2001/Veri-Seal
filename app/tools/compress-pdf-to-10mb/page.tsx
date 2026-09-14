import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  FileSpreadsheet,
  BookOpen,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { UniversalPdfCompressor } from '@/components/tools/UniversalPdfCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF to 10MB Online Free | Large Reports & Portfolios | Kagazo',
  description:
    'Compress large PDF documents strictly under 10MB online free. Reduce heavy corporate annual reports, scanned book archives, engineering drawings, and tender packages. 100% private in-memory processing.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-10mb',
  },
  openGraph: {
    title: 'Compress PDF to 10MB Online Free | Kagazo',
    description:
      'Reduce heavy PDF files strictly under 10MB for cloud portals, enterprise uploads, and email links. Zero loss on vector charts.',
    url: 'https://kagazo.in/tools/compress-pdf-to-10mb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why compress a large PDF down to 10MB?',
    answer:
      'Many cloud services, enterprise HR systems, client portals, and collaboration platforms enforce a hard 10MB or 15MB file cap. Compressing 50MB–200MB PDFs to strictly under 10MB makes them shareable across Slack, Teams, and web portals without triggering upload rejections.',
  },
  {
    question: 'Will architectural blueprints, CAD diagrams, or financial spreadsheets stay legible?',
    answer:
      'Yes. Kagazo never rasterizes vector line work, text glyphs, or tabular data. Only bulky embedded photography and scanner raster layers are optimized using multi-step Lanczos resampling, preserving crisp vector lines and fine table borders.',
  },
  {
    question: 'How much compression can I achieve on a 100MB+ scanned book or catalog?',
    answer:
      'Scanned books and multi-page catalogs typically drop by 70% to 90% in size because default scanner software saves uncompressed bitmaps. By deduplicating repeated background objects and recompressing image streams with modern Huffman-encoded JPEG, Kagazo reliably reduces heavy 100MB+ documents to under 10MB.',
  },
  {
    question: 'Can I select and exclude specific pages before compressing?',
    answer:
      'Yes! Kagazo includes an interactive Page Selector. Simply click "Select Pages" after uploading your document to preview all pages and exclude redundant cover pages, index sheets, or blank pages.',
  },
  {
    question: 'Can I compress 100+ page annual reports or legal case files to 10MB?',
    answer:
      'Yes! Kagazo handles heavy multi-page documents (100–300+ pages) smoothly using streaming in-memory optimization without crashing your browser or exhausting RAM.',
  },
  {
    question: 'Are confidential enterprise audits, contracts, and blueprints secure?',
    answer:
      '100% private. All processing occurs in volatile system memory and files are destroyed immediately upon download. Zero server persistence or third-party sharing.',
  },
  {
    question: 'Can I compress multiple heavy files simultaneously?',
    answer:
      'Yes! Drop multiple PDF files into our batch compressor. Each document is optimized individually to strictly under 10MB and ready for instant download.',
  },
  {
    question: 'Is there any watermark or subscription requirement?',
    answer:
      'Zero watermarks and 100% free forever with unlimited document uploads.',
  },
];

export default function CompressPdfTo10MbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Compress PDF to 10MB Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-pdf-to-10mb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress heavy PDF files strictly under 10MB online free. Ideal for corporate reports, engineering drawings, and multi-page books.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 10MB Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your PDF Document',
            text: 'Select your heavy PDF document (up to 150MB).',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic 10MB Optimization',
            text: 'Kagazo compresses internal streams to land safely under 10000KB.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compact PDF',
            text: 'Download your optimized, shareable PDF document.',
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
          <span className="text-primary font-bold">Compress PDF to 10MB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Target Ceiling: Max 10 MB (10000 KB)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">10MB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Reduce heavy corporate reports, scanned book archives, and engineering drawings to strictly under 10MB. Fast, lossless vector clarity, 100% private.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalPdfCompressor
              initialTargetKb={10000}
              isFixedTarget={true}
              toolHeading="Compress PDF to Under 10 MB"
              toolSubheading="Optimized for corporate annual reports, scanned book collections, and heavy blueprint dossiers."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Popular 10MB PDF Use Cases */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Ideal Scenarios for 10MB PDF Optimization
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Corporate Annual Reports</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Investor presentations and multi-year audited financial dossiers packed with high-resolution charts brought safely under 10MB.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Scanned Books &amp; Manuals</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Heavy scanned textbooks, legal codices, and user manuals compressed from 150MB+ down to a light, readable 10MB file.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">CAD &amp; Construction Sets</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Multi-sheet construction blueprints and CAD schematics preserved with sharp vector lines and small raster footprints.
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
                  Frequently Asked Questions (10MB PDF Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Learn how Kagazo compresses large multi-page PDF documents to under 10MB.
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
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Other PDF Tools
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/compress-pdf-to-5mb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress PDF to 5MB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Standard for thesis &amp; e-tender submissions
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-pdf-to-2mb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress PDF to 2MB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Standard for court filings &amp; legal portals
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-pdf-to-1mb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress PDF to 1MB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Email attachment &amp; passport portal target
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Merge Marksheets to Single PDF
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Combine 1–12 semester sheets
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* In-Memory RAM Privacy */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% In-Memory RAM Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Documents are processed in volatile RAM memory. Zero copies are stored on permanent servers or shared.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Instant Speed
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
