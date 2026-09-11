import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Award,
  HelpCircle,
  FileText,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageToPdfEngine } from '@/components/tools/ImageToPdfEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Image to PDF Converter under 300KB Free | State PSC & Court Forms | VeriSeal',
  description:
    'Convert marksheet photos and certificates directly to PDF strictly under 300 KB online free. 1-click in-memory conversion with Xerox ink boost and A4 formatting. Ideal for State PSCs, High Court recruitment, and university portals.',
  alternates: {
    canonical: 'https://veriseal.in/tools/image-to-pdf-300kb',
  },
  openGraph: {
    title: 'Image to PDF Converter under 300KB Online Free | VeriSeal',
    description:
      'Directly convert marksheet photos and certificates to PDF under 300 KB in 1 click. Zero watermark, 100% RAM privacy.',
    url: 'https://veriseal.in/tools/image-to-pdf-300kb',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Which exams require certificate PDFs under 300 KB?',
    answer:
      'Several State Public Service Commissions (such as BPSC, MPSC, RPSC, KPSC, WBPSC), High Court clerk and judicial recruitment portals, and central universities mandate caste certificates, educational marksheets, and domicile proofs to be uploaded as PDFs under 300 KB.',
  },
  {
    question: 'Can I combine Front and Back pages into a single 300 KB PDF?',
    answer:
      'Yes! Upload both Front and Back photos of your diploma or degree certificate. VeriSeal combines them into a multi-page A4 PDF while ensuring the combined file size stays strictly below 300 KB.',
  },
  {
    question: 'Will text and stamps remain clear after compression to 300 KB?',
    answer:
      '300 KB allows even higher visual resolution than 200 KB. VeriSeal preserves high-contrast text edges, university seals, and signatures with crisp readability.',
  },
  {
    question: 'Is this conversion safe and private?',
    answer:
      'Yes. Conversion happens in ephemeral volatile memory (RAM). Files are never written to server disk or kept in any database.',
  },
];

export default function ImageToPdf300KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Image to PDF Converter under 300KB',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://veriseal.in/tools/image-to-pdf-300kb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Convert marksheet photos, certificates, and ID cards directly to PDF strictly under 300 KB online free.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Image to PDF under 300 KB Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Certificate Images',
            text: 'Upload 1 or more images of your certificate or marksheet.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Color & Format',
            text: 'Choose color or Xerox Ink Boost and set target size under 300 KB.',
          },
          {
            '@type': 'HowToStep',
            name: '1-Click In-Memory Conversion',
            text: 'Click convert to generate an A4 formatted PDF strictly under 300 KB.',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools/government-exam-pdf-compressor" className="hover:text-primary transition-colors font-medium">
            Exam Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Image to PDF under 300KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>State PSC, High Court &amp; University Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Marksheet Image to </span>
            <span className="text-primary">PDF under 300KB</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert smartphone photos of Class 10/12 marksheets, degree certificates, and ID cards directly into standard A4 PDF files strictly under 300 KB in a single click.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageToPdfEngine initialTargetKb={300} />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Educational / Comparison Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Why Direct Image-to-PDF Conversion Beats Ordinary PDF Compressors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    Standard Tools (2-Step Nightmare)
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Candidates first convert photo to a 2 MB PDF, then use a second compressor tool which either fails or drops the file to a blurry 70 KB with illegible roll numbers.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    VeriSeal (1-Pass Direct Optimization)
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Calculates target image JPEG quantization directly during PDF page assembly. The result lands comfortably between 220 KB and 290 KB with sharp, readable stamps and text.
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
                  Frequently Asked Questions (Image to PDF under 300KB)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about converting photos to 300 KB PDFs.
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
                Related Conversion Tools
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Marksheet Image to PDF (&lt; 200 KB)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Standard TNPSC, UPSC &amp; SSC 200KB limit
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-pdf-to-300kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Existing PDF to 300KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Shrink large PDFs to 300KB
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
                      20–300 KB, 350×350 px, 10-day rule
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
                <span>100% In-Memory RAM Shield</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Marksheet photos and certificates are processed in volatile memory and destroyed immediately upon PDF download. Never written to permanent disk storage.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> 100% Free
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
