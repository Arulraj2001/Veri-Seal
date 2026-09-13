import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Printer,
  CheckCircle2,
  FileCheck,
  Award,
  Layers,
} from 'lucide-react';
import { ChangeImageDpiEngine } from '@/components/tools/ChangeImageDpiEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Change Image DPI Online Free (300 / 600 DPI) | Kagazo',
  description:
    'Convert image resolution to 300 DPI or 600 DPI online free. Rewrite JFIF binary metadata tags without quality loss. Guaranteed compliance for passport photos, exam portals, and print labs.',
  alternates: {
    canonical: 'https://kagazo.in/tools/change-image-dpi',
  },
  openGraph: {
    title: 'Change Image DPI Online Free (300 / 600 DPI) | Kagazo',
    description:
      'Change image DPI to exact 300 or 600 DPI in your browser. 100% private, RFC-compliant JFIF metadata rewriting.',
    url: 'https://kagazo.in/tools/change-image-dpi',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What does changing DPI actually do to an image?',
    answer:
      'DPI (Dots Per Inch) is a metadata tag inside the image file (JFIF APP0 marker) that instructs printers and portal verification engines how many pixels to render per linear inch. Changing the DPI from 72 to 300 sets this tag to 300 dots per inch without altering or degrading your actual image pixel data.',
  },
  {
    question: 'Why do government exam and passport portals reject 72 DPI images?',
    answer:
      'Standard web images and smartphone screenshots are automatically saved with a default 72 or 96 DPI metadata tag. Official government portals (like UPSC, SSC, US Visa DS-160, and Passport Seva) scan the binary JFIF header and reject files that fail to declare 300 DPI or 200 DPI resolution.',
  },
  {
    question: 'Does changing DPI from 72 to 300 increase my file size?',
    answer:
      'No. Because Kagazo rewrites the internal JFIF density bytes (`0xFFE0`) directly rather than artificially upscaling blank pixels, your image sharpness is preserved without unnecessarily inflating your file size.',
  },
  {
    question: 'Which DPI should I choose for print versus web submissions?',
    answer:
      'Choose 300 DPI for all official passport photos, visa applications, government hall tickets, and photo lab prints. Choose 600 DPI for high-definition archival scans, fine biometric finger impressions, and legal evidence.',
  },
];

export default function ChangeImageDpiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Change Image DPI Online Free (300 / 600 DPI)',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/change-image-dpi',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Convert any image to 300 DPI or 600 DPI online free. RFC-compliant JFIF density marker injection with zero loss.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Change Image DPI to 300 Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your Image',
            text: 'Select your photo, scan, or graphic (JPEG, PNG, WebP).',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose 300 or 600 DPI',
            text: 'Select 300 DPI for official passport and portal submissions.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Verified 300 DPI Image',
            text: 'Download the converted JPEG with verified JFIF header.',
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
          <span className="text-primary font-bold">Change Image DPI</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>JFIF Density Standard • 300 / 600 DPI Converter</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Change Image DPI to </span>
            <span className="text-primary">300 DPI Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert image resolution from 72 DPI to 300 or 600 DPI without quality loss. Binary JFIF density marker rewriting for passport photos, exam portals, and print labs.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (75% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ChangeImageDpiEngine
              initialDpi={300}
              toolHeading="Convert Image DPI to 300 / 600 DPI"
              toolSubheading="Upload your image to inspect current resolution and convert to 300 DPI for official portal compliance."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Why 300 DPI Matters */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <Printer className="w-5 h-5 text-primary" />
                Why 300 DPI Is Required Everywhere
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Passports &amp; Visas</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    U.S. Dept of State, UK HM Passport Office, and Schengen portals automatically reject images lacking 300 DPI headers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Exam Portals (UPSC/SSC)</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Recruitment verification servers check metadata density. 300 DPI ensures crisp printing on candidate hall tickets.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <Printer className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Professional Printing</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Commercial photo kiosks (CVS, Walgreens, Boots) print at 300 DPI to avoid pixelated or blurry paper photos.
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
                  Frequently Asked Questions (Image DPI Converter)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about image DPI and resolution.
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
                Related Precision Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/us-passport-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-sm shrink-0">🇺🇸</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      US Passport Photo
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    300 DPI
                  </span>
                </Link>

                <Link
                  href="/tools/uk-passport-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-sm shrink-0">🇬🇧</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UK Passport Photo
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
                      Compress to KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Exact KB
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Photo Sheet Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    4×6 &amp; A4
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
                Images are converted directly in your browser's private memory. Zero copies stored on permanent disks.
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
