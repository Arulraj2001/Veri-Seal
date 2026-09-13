import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Smartphone,
  CheckCircle2,
  FileImage,
  FileText,
  Sliders,
  Sparkles,
  FilePlus2,
} from 'lucide-react';
import { HeicConverterEngine } from '@/components/tools/HeicConverterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Convert Apple HEIC to PDF Online Free (Batch & 100% Private) | Kagazo',
  description:
    'Convert iPhone and iPad .HEIC photos directly into a single, high-resolution A4 PDF document online free. 100% private in-browser RAM conversion with zero server uploads.',
  alternates: {
    canonical: 'https://kagazo.in/tools/heic-to-pdf',
  },
  openGraph: {
    title: 'Convert Apple HEIC to PDF Online Free | Kagazo',
    description:
      'Combine multiple Apple iPhone .HEIC photos into a unified A4 PDF document in client-side RAM. Instant download, zero cloud uploads.',
    url: 'https://kagazo.in/tools/heic-to-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do I convert multiple iPhone HEIC photos into a single PDF?',
    answer:
      'Simply drag and drop all your .heic photos into the Kagazo dropzone above. Ensure the "A4 PDF" format tab is selected, then click "Convert All". Our client-side engine will decode each photo and assemble them into a multi-page A4 PDF ready for instant download.',
  },
  {
    question: 'Are my personal iPhone photos or documents uploaded to any remote server?',
    answer:
      'No. Your documents and photos never leave your device. All HEIC decompression and PDF page assembly run 100% locally inside your browser’s memory using WebAssembly and jsPDF. Zero files are stored or uploaded.',
  },
  {
    question: 'Will my photos fit properly on standard A4 paper when printed?',
    answer:
      'Yes. Our engine automatically calculates the exact aspect ratio of each photo and centers it with standard 10mm margins on A4 paper dimensions (210mm × 297mm). This guarantees that neither text nor edges are clipped when printed or submitted.',
  },
  {
    question: 'What is the file size limit for converting HEIC to PDF?',
    answer:
      'Because all processing takes place locally in your device RAM, there are no artificial file size caps. You can easily merge up to 50 high-resolution iPhone camera photos into a unified PDF document.',
  },
  {
    question: 'Can I also download the converted photos as separate JPG files?',
    answer:
      'Yes! You can switch the format selector pill from "A4 PDF" to "JPG" at any time to download the photos as individual high-res JPEGs or as a single bundled ZIP archive.',
  },
];

export default function HeicToPdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Apple HEIC to A4 PDF Converter',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/heic-to-pdf',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Convert multiple Apple iPhone and iPad HEIC photos into a unified A4 PDF document online free directly in browser RAM.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Apple HEIC Photos into a Single PDF Document',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload iPhone HEIC Photos',
            text: 'Select or drag-and-drop .heic images from your iPhone or Mac.',
          },
          {
            '@type': 'HowToStep',
            name: 'Verify Page Order & Settings',
            text: 'Preview thumbnail order and ensure A4 PDF format is selected.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Merged PDF',
            text: 'Click Convert All and download your combined A4 PDF document instantly.',
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
          <span className="text-primary font-bold">HEIC to PDF Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Multi-Page A4 PDF Compiler • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Convert Apple HEIC to </span>
            <span className="text-primary">PDF Document Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Merge multiple iPhone receipts, scanned certificate photos, and documents directly into a print-ready A4 PDF. Zero cloud uploads, zero watermarks.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column (col-span-9 / col-span-10) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HeicConverterEngine
              defaultFormat="pdf"
              toolHeading="Apple HEIC to A4 PDF Converter Studio"
              toolSubheading="Upload iPhone photos. Each photo is decoded and centered on an A4 page inside your browser's memory."
            />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Explanatory Guide Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FilePlus2 className="w-5 h-5 text-primary" />
                  Why Convert iPhone HEIC Photos to an A4 PDF Document?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Save time and pass strict government portal upload requirements effortlessly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    Job &amp; Exam Portals
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Most government portals (UPSC, SSC, TNPSC, NSDL) strictly prohibit .HEIC files and require multi-page documents to be combined into a single PDF.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    Standard A4 Alignment
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Kagazo automatically scales and centers each photo to standard international A4 dimensions (210 × 297 mm) with uniform margins so it prints perfectly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    Complete Confidentiality
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Financial statements, identity proofs, and academic certificates remain 100% private in your device RAM without being sent to external clouds.
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
                  Frequently asked questions about compiling iPhone HEIC photos into PDF files.
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
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/heic-to-jpg"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      HEIC to JPG
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    JPG
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
                  href="/tools/compress-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    PDF
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
                    KB Target
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
                Photos are compiled directly into a PDF inside browser RAM using jsPDF. Your sensitive documents never touch any external server.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Zero Server Upload
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Instant Download
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
