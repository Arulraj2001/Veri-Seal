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
  FileArchive,
  FileText,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { HeicConverterEngine } from '@/components/tools/HeicConverterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Apple HEIC to JPG Converter Online Free (Batch & 100% Private) | Kagazo',
  description:
    'Convert Apple iPhone & iPad .HEIC photos to high-quality JPG or PNG instantly in your browser. Batch convert up to 50 files, download as 1-click ZIP, 100% private with zero server uploads.',
  alternates: {
    canonical: 'https://kagazo.in/tools/heic-to-jpg',
  },
  openGraph: {
    title: 'Apple HEIC to JPG Converter Online Free | Kagazo',
    description:
      'Batch convert Apple iPhone .HEIC photos to universal JPG or PNG in browser RAM. Zero server uploads, instant 1-click ZIP download.',
    url: 'https://kagazo.in/tools/heic-to-jpg',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why does my iPhone take photos in HEIC format instead of JPG?',
    answer:
      'Starting with iOS 11, Apple adopted the High Efficiency Image Container (HEIC) standard based on HEVC video compression. HEIC photos take up roughly 50% less internal storage than traditional JPEGs while preserving 16-bit dynamic range. However, most government job portals, exam application sites, and Windows systems reject .heic files.',
  },
  {
    question: 'Are my private photos uploaded to your server during conversion?',
    answer:
      'No. Unlike conventional online converters (such as CloudConvert or iLovePDF) that upload your photos to remote cloud servers, Kagazo uses client-side WebAssembly. All HEIC decoding, color-space mapping, and JPEG quantization execute 100% inside your device’s volatile RAM. Zero bytes are ever sent across the internet.',
  },
  {
    question: 'Can I convert multiple iPhone photos at once?',
    answer:
      'Yes! You can drag and drop up to 50 Apple HEIC photos simultaneously. Our batch engine processes them smoothly and lets you download all converted JPGs in a single organized ZIP archive with one click.',
  },
  {
    question: 'Can I convert my iPhone HEIC photos directly into a PDF document?',
    answer:
      'Yes. Simply toggle the output format to "A4 PDF". The engine will automatically compile your photos into a single, clean A4 PDF document ideal for submitting homework, receipts, and government records.',
  },
  {
    question: 'How can I make my iPhone camera shoot in JPG by default?',
    answer:
      'On your iPhone, open Settings > Camera > Formats and select "Most Compatible" instead of "High Efficiency". This instructs iOS to save future photos directly as universal JPEG files.',
  },
];

export default function HeicToJpgPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Apple HEIC to JPG Converter Studio',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/heic-to-jpg',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Batch convert Apple iPhone HEIC and HEIF photos to high-quality JPG or PNG images directly in browser RAM with zero server uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Apple HEIC Photos to JPG Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload iPhone HEIC Photos',
            text: 'Drag and drop one or multiple .heic files from your iPhone, Mac, or PC into the converter dropzone.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Output Format and Quality',
            text: 'Select JPG, PNG, or A4 PDF, and adjust the quality slider to your desired balance of file size and visual sharpness.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Converted Files',
            text: 'Preview converted photos instantly and download individually or as a single combined ZIP archive.',
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
          <span className="text-primary font-bold">HEIC to JPG Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>100% In-Browser Private • Zero Cloud Uploads</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Convert Apple HEIC to </span>
            <span className="text-primary">JPG / PNG / PDF Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Easily open and convert iPhone and iPad .HEIC photos into universal JPGs. Batch process up to 50 photos in local RAM with 1-click ZIP or merged PDF export.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column (col-span-9 / col-span-10) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HeicConverterEngine
              defaultFormat="jpg"
              toolHeading="Apple HEIC to JPG / PNG Converter Studio"
              toolSubheading="Upload Apple .heic or .heif photos. Decoded instantly in client-side RAM with zero server upload."
            />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Feature Comparison Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Why Kagazo HEIC Converter Outperforms Cloud Converters
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Compare client-side WebAssembly against commercial cloud converters.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Feature</th>
                      <th className="p-3.5 text-primary">Kagazo HEIC Studio</th>
                      <th className="p-3.5 text-text-main/60">CloudConvert / ILovePDF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">Privacy &amp; Security</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50">
                        100% In-Browser RAM (Zero server upload)
                      </td>
                      <td className="p-3.5 text-text-main/60">Uploaded &amp; stored on cloud servers</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Batch Conversion Limit</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50">
                        Up to 50 Photos Free
                      </td>
                      <td className="p-3.5 text-text-main/60">Limited to 2–5 files without paid pass</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Batch Download</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50">
                        Instant 1-Click ZIP or Merged PDF
                      </td>
                      <td className="p-3.5 text-text-main/60">Individual download or paywalled ZIP</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Conversion Speed</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50">
                        Zero Upload Queue (WASM Engine)
                      </td>
                      <td className="p-3.5 text-text-main/60">Subject to server queue &amp; upload bandwidth</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Watermarks or Ads in Photo</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50">
                        None (100% Clean)
                      </td>
                      <td className="p-3.5 text-text-main/60">Often watermarked on free tier</td>
                    </tr>
                  </tbody>
                </table>
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
                  Everything you need to know about Apple HEIC photos and format conversion.
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
                  href="/tools/heic-to-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      HEIC to PDF
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    PDF
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-exact-kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Exact KB Compressor
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    Image
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change DPI (300)
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    DPI
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
                    Merge
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
                Your iPhone photos are decoded locally using client-side WebAssembly. Files never touch any cloud server.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Zero Server Upload
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Instant WebAssembly
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
