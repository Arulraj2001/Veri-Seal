import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  ArrowRightLeft,
  FileCheck,
  Globe2,
  Archive,
} from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Image Converter Online Free - Convert PNG, JPG, WebP, ICO, BMP, GIF | Kagazo',
  description:
    'Convert images online for free between PNG, JPG, WebP, ICO, BMP, and GIF. Generate real multi-resolution Favicon ICO files, batch convert photos, and download as ZIP with 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/image-converter',
  },
  openGraph: {
    title: 'Image Converter Online Free - Convert PNG, JPG, WebP, ICO | Kagazo',
    description:
      'Universal image format converter. Convert PNG to JPG, WebP to PNG, PNG to Favicon ICO, and more with 100% client privacy.',
    url: 'https://kagazo.in/tools/image-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What image formats can I convert using Kagazo?',
    answer:
      'You can convert between PNG, JPG/JPEG, WebP, ICO (multi-res 16x16, 32x32, 48x48 Favicon), BMP, and GIF. All conversions run directly in your browser without uploading to any server.',
  },
  {
    question: 'How does Kagazo create a genuine multi-resolution ICO Favicon file?',
    answer:
      'Unlike generic online tools that merely rename a PNG file to .ico, Kagazo constructs a real binary ICONDIR structure containing 16×16, 32×32, and 48×48 pixel frames in a single file. This ensures crisp rendering on Windows taskbars, desktop shortcuts, and browser tabs.',
  },
  {
    question: 'What happens to transparency when converting transparent PNG to JPG?',
    answer:
      'Since the JPEG format does not support alpha transparency, Kagazo automatically paints a clean, solid white background behind your transparent artwork, ensuring your subject remains sharp without black artifact halos.',
  },
  {
    question: 'Can I batch convert multiple photos at once?',
    answer:
      'Yes! You can drag and drop dozens of images simultaneously. You can download individual converted files or click "Download ZIP" to download everything in a single archive.',
  },
  {
    question: 'Is my data private and secure?',
    answer:
      '100%. Every conversion runs entirely in your local browser’s memory (RAM). Zero bytes are transmitted to external servers, making it 100% safe for confidential documents, IDs, and personal photos.',
  },
];

export default function ImageConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Image Converter Online Free',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/image-converter',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Universal online image converter supporting PNG, JPG, WebP, Favicon ICO, BMP, and GIF with batch download and client privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Images Online for Free',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your Image Files',
            text: 'Drag and drop single or multiple image files into the converter workspace.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Output Format',
            text: 'Choose your desired target format: JPG, PNG, WebP, ICO (Favicon), BMP, or GIF.',
          },
          {
            '@type': 'HowToStep',
            name: 'Convert in Browser',
            text: 'Click Convert All to transform all images instantly in local memory.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Converted Images',
            text: 'Download individual files or export the entire batch as a ZIP archive.',
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
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Image Converter',
            item: 'https://kagazo.in/tools/image-converter',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
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
          <span className="text-primary font-bold">Image Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Universal Image Format Converter • Multi-Res Favicon Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Universal Image Converter Online
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert photos and graphics between <strong>PNG, JPG, WebP, ICO, BMP, and GIF</strong>.
            Preserve transparency, bundle multi-resolution favicons, and batch export with zero server uploads.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant Client Conversion
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Archive className="w-4 h-4 text-primary" /> Multi-File ZIP Download
            </span>
          </div>
        </header>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine
              initialSourceFormat="png"
              initialTargetFormat="jpg"
              toolHeading="Universal Image Converter Workspace"
              toolSubheading="Upload PNG, JPG, WebP, GIF, or BMP files to convert to any format with batch support."
            />

            <AdSlot slot="post_download" />

            {/* Popular Conversion Pairs Quick Links */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                  Popular Image Conversion Formats
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Dedicated high-speed conversion pathways optimized for specific web and design workflows.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { title: 'PNG to JPG', href: '/tools/png-to-jpg', badge: 'Popular' },
                  { title: 'JPG to PNG', href: '/tools/jpg-to-png', badge: 'Lossless' },
                  { title: 'PNG to WebP', href: '/tools/png-to-webp', badge: 'Web Best' },
                  { title: 'WebP to PNG', href: '/tools/webp-to-png', badge: 'Alpha' },
                  { title: 'PNG to ICO', href: '/tools/png-to-ico', badge: 'Favicon' },
                  { title: 'HEIC to JPG', href: '/tools/heic-to-jpg', badge: 'iPhone' },
                  { title: 'Image Optimizer', href: '/tools/image-optimizer', badge: 'Compress' },
                  { title: 'Exact KB Resizer', href: '/tools/compress-image-exact-kb', badge: 'Portals' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="p-3.5 rounded-2xl bg-surface hover:bg-primary-light/40 border border-surface-darker hover:border-primary/40 transition-all flex flex-col justify-between gap-2 group"
                  >
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                      {item.badge}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQs Accordion */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical answers regarding image conversion, quality, and security.
                </p>
              </div>

              <div className="divide-y divide-surface-darker/70">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group py-4 first:pt-0 last:pb-0">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-text-main group-hover:text-primary transition-colors">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed pl-2 border-l-2 border-primary/30">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                  Converters
                </span>
                <span className="text-[10px] bg-primary-light text-primary font-bold px-1.5 py-0.5 rounded">
                  Fast
                </span>
              </div>

              <div className="space-y-1.5">
                <Link
                  href="/tools/png-to-jpg"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <span className="text-[11px] font-bold text-text-main group-hover:text-primary truncate">
                    PNG to JPG
                  </span>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    JPG
                  </span>
                </Link>

                <Link
                  href="/tools/jpg-to-png"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <span className="text-[11px] font-bold text-text-main group-hover:text-primary truncate">
                    JPG to PNG
                  </span>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    PNG
                  </span>
                </Link>

                <Link
                  href="/tools/png-to-webp"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <span className="text-[11px] font-bold text-text-main group-hover:text-primary truncate">
                    PNG to WebP
                  </span>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    WebP
                  </span>
                </Link>

                <Link
                  href="/tools/png-to-ico"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <span className="text-[11px] font-bold text-text-main group-hover:text-primary truncate">
                    PNG to ICO Favicon
                  </span>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    ICO
                  </span>
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Files are converted inside local browser volatile RAM. No server transmission or storage.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
