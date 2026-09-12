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
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PdfToImageEngine } from '@/components/tools/PdfToImageEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PDF to Image Converter (300 DPI) Online Free | Extract JPG from PDF | Kagazo',
  description:
    'Convert PDF documents, e-Aadhaar, admit cards, and marksheets into crisp 300 DPI JPEG or PNG images online free. 100% in-memory processing, zero watermark, instant page download.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/pdf-to-image',
  },
  openGraph: {
    title: 'PDF to Image Converter (300 DPI) Online Free | Kagazo',
    description:
      'Extract high-resolution 300 DPI images from any PDF document. Zero watermark, 100% RAM privacy.',
    url: 'https://Kagazo.in/tools/pdf-to-image',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do exam portals require 300 DPI images instead of PDFs?',
    answer:
      'Certain recruitment and admission portals (such as specific state police recruitments, teacher recruitment boards, and bank portals) only have image upload fields (JPG/JPEG) for identity cards and educational certificates, rejecting PDF files. Extracting at 300 DPI ensures all micro-text, serial numbers, and signatures remain 100% legible.',
  },
  {
    question: 'How do I convert my e-Aadhaar PDF into a JPG image?',
    answer:
      'Upload your e-Aadhaar PDF into the Kagazo upload box, select 300 DPI and JPEG format, and click "Extract 300 DPI Images". You can preview the extracted high-resolution image with our clarity loupe and download it immediately.',
  },
  {
    question: 'Will converting a multi-page PDF generate images for all pages?',
    answer:
      'Yes! Kagazo converts all pages of your PDF document. You can preview each page individually using the tab selector and download individual pages or batch-download all pages in one click.',
  },
  {
    question: 'Are my confidential identity PDFs stored on your server?',
    answer:
      'Never. Kagazo operates entirely in ephemeral volatile memory (RAM). Your PDF and the extracted images are immediately wiped once downloaded. We never save files to disk or databases.',
  },
];

export default function PdfToImagePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'PDF to Image Converter (300 DPI)',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://Kagazo.in/tools/pdf-to-image',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Convert PDF documents, e-Aadhaar, admit cards, and marksheets into high-resolution 300 DPI JPEG/PNG images online free.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PDF to 300 DPI JPEG Images Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload PDF Document',
            text: 'Select or drag & drop your PDF file (e-Aadhaar, marksheet, or certificate).',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Resolution & Format',
            text: 'Select 300 DPI and choose JPEG or PNG format.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Extracted Images',
            text: 'Preview with high-resolution clarity loupe and download verified image files.',
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
          <span className="text-primary font-bold">PDF to Image (300 DPI)</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>High-Resolution 300 DPI Extraction Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>PDF to Image Converter </span>
            <span className="text-primary">(300 DPI Online Free)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Extract razor-sharp 300 DPI JPEG or PNG images from e-Aadhaar, caste certificates, and marksheet PDFs. 
            Preserves official government stamps, holograms, and serial numbers with zero blur.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <PdfToImageEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Why 300 DPI Resolution Matters */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Why 300 DPI Resolution is Essential for Indian Exam Portals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block">
                    Standard Web Converters (72 DPI)
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Most free web tools render PDFs at default 72 DPI screen resolution. When uploaded to government portals, small serial numbers, QR codes, and sub-registrar signatures become pixelated and unreadable, causing application rejections.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    Kagazo Engine (300 DPI Official Scan)
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Kagazo renders pages at a full 2480 × 3509 pixels (standard 300 DPI print-ready resolution). Every watermark, signature stroke, and barcode remains tack-sharp.
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
                  Frequently Asked Questions (PDF to Image Converter)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about extracting high-resolution images from PDF files.
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
                Related Utilities
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Image to PDF (&lt; 200 KB)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Convert photos back into A4 PDF
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Image to 20KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Lock signatures in 10–20 KB range
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-image-to-50kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Image to 50KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Passport photos without facial distortion
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/government-exam-pdf-compressor"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Govt Exam PDF Compressor
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Compress PDFs to 100KB, 200KB, 300KB
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
                <span>100% Client &amp; RAM Privacy Shield</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your PDF and converted images are processed in volatile system memory and immediately destroyed after download. Never stored on disk or shared.
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
      </div>
    </div>
  );
}
