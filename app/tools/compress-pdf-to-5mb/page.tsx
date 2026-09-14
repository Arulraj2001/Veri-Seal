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
  GraduationCap,
  Building2,
  FolderArchive,
  CheckCircle2,
} from 'lucide-react';
import { UniversalPdfCompressor } from '@/components/tools/UniversalPdfCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF to 5MB Online Free | Thesis, Tenders & Portals | Kagazo',
  description:
    'Compress any PDF file strictly under 5MB online free. Reduce heavy university dissertations, government tenders, medical dossiers, and architecture portfolios without losing image or text clarity. 100% private.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-5mb',
  },
  openGraph: {
    title: 'Compress PDF to 5MB Online Free | Kagazo',
    description:
      'Compress heavy PDF documents strictly under 5MB for academic repositories and government tender portals. Fast in-memory processing.',
    url: 'https://kagazo.in/tools/compress-pdf-to-5mb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do universities and tender portals enforce a 5MB limit on PDFs?',
    answer:
      'Academic repositories (like Shodhganga, ProQuest, and university submission portals) and government e-procurement systems (like GeM and state tender boards) mandate a 5MB maximum file size per annexure to ensure server stability and swift archiving of thousands of submissions.',
  },
  {
    question: 'Will high-resolution graphs, tables, and color diagrams remain sharp?',
    answer:
      'Yes. Kagazo separates vector charts and typography from raster backgrounds. Vector paths and text streams remain 100% lossless, while raster graphics undergo intelligent Lanczos downsampling to fit snugly under 5000KB without blurring critical academic data.',
  },
  {
    question: 'How do I compress a 50+ page dissertation or thesis down to 5MB?',
    answer:
      'Upload your multi-page PDF. Kagazo immediately analyzes stream sizes and recompresses embedded scanned images. If your document still exceeds 5MB due to hundreds of color photos, enabling our "Greyscale Conversion" toggle strips redundant color channels for an immediate 40% file size reduction.',
  },
  {
    question: 'Are sensitive research papers, patents, and medical records safe?',
    answer:
      'Completely secure. All processing runs in volatile RAM memory. Your files are never stored on permanent hard drives, shared with AI trainers, or accessible to anyone else.',
  },
  {
    question: 'Can I compress architecture portfolios and design lookbooks to 5MB?',
    answer:
      'Yes! Architecture and creative portfolios with rendering images can be compressed to strictly under 5MB for smooth email delivery to prospective employers and client pitches.',
  },
  {
    question: 'Can I remove unnecessary appendices or cover pages before compressing?',
    answer:
      'Yes! Use our built-in Page Selector to preview and exclude any unnecessary pages, immediately freeing up byte budget for your core research findings.',
  },
  {
    question: 'Can I compress multiple heavy documents in a single batch?',
    answer:
      'Yes! Drag and drop multiple thesis chapters or tender annexures simultaneously. Kagazo will optimize each file under the 5MB ceiling in parallel.',
  },
  {
    question: 'Is there any fee or watermark on the compressed 5MB document?',
    answer:
      'Kagazo is 100% free with unlimited document compression and zero watermarks.',
  },
];

export default function CompressPdfTo5MbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Compress PDF to 5MB Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-pdf-to-5mb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress heavy PDF documents strictly under 5MB online free. Optimized for university thesis submissions, government tenders, and architecture portfolios.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 5MB Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your PDF Document',
            text: 'Select your heavy thesis, portfolio, or tender PDF file (up to 100MB).',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic 5MB Ceiling Compression',
            text: 'Kagazo optimizes internal streams to land safely under 5000KB.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant Document',
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
          <span className="text-primary font-bold">Compress PDF to 5MB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Target Ceiling: Max 5 MB (5000 KB)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">5MB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Reduce multi-page PDFs to strictly under 5MB for academic thesis submissions, government e-tenders, and medical portfolios. Crystal clear diagrams and vector text.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (75% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalPdfCompressor
              initialTargetKb={5000}
              isFixedTarget={true}
              toolHeading="Compress PDF to Under 5 MB"
              toolSubheading="Optimized for university dissertations, government tender bids, and institutional archives."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Popular 5MB PDF Use Cases */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Where 5MB PDF Compression Is Crucial
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Dissertations &amp; PhD Thesis</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    University portals (Uni-Assist, Shodhganga, ProQuest) strictly cap dissertation uploads at 5MB per chapter or consolidated volume.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Government e-Tenders &amp; GeM</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Public works e-procurement portals enforce a hard 5MB limit for technical specifications, company profiles, and audited annexures.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <FolderArchive className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Design &amp; Arch Portfolios</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Architecture and creative design portfolios packed with renders easily exceed 80MB. Compress to 5MB for fast client sharing.
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
                  Frequently Asked Questions (5MB PDF Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear answers on compressing heavy multi-page documents to 5MB.
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
                  href="/tools/compress-pdf-to-10mb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 10MB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    10 MB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-2mb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 2MB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    2 MB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-1mb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 1MB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    1 MB
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
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Merge Marksheets
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    PDF
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
                Documents are processed in volatile RAM memory. Zero copies stored on servers or shared.
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
