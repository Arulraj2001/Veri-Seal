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
  FileCheck2,
  HelpCircle,
  CheckCircle2,
  FileImage,
  Download,
  Layers,
  Palette,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Image Converter Online | Convert JPG, PNG, WebP, ICO | Kagazo',
  description:
    'Convert images between JPG, PNG, WebP, and ICO formats online free. Fast batch processing, custom quality sliders, transparency matte controls, and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/image-converter',
  },
  openGraph: {
    title: 'Free Image Converter Online | Kagazo',
    description:
      'Universal image converter matrix for JPG, PNG, WebP, and ICO formats with zero cloud uploads.',
    url: 'https://kagazo.in/tools/image-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FORMAT_MATRIX = [
  {
    format: 'JPEG (JPG)',
    bestFor: 'Photos, camera snaps, exam submissions',
    transparency: 'No (Solid background required)',
    compression: 'Lossy DCT (50–80% smaller)',
  },
  {
    format: 'PNG',
    bestFor: 'Logos, vector icons, graphics with text',
    transparency: 'Yes (Full 8-bit alpha channel)',
    compression: 'Lossless DEFLATE (Pixel-perfect)',
  },
  {
    format: 'WebP',
    bestFor: 'Modern websites, Core Web Vitals, speed',
    transparency: 'Yes (Lossy & lossless alpha)',
    compression: 'Modern predictive coding (25–35% smaller than JPG)',
  },
  {
    format: 'ICO',
    bestFor: 'Website favicons, Windows desktop shortcuts',
    transparency: 'Yes (Multi-resolution container)',
    compression: 'Multi-frame container (16x16 to 256x256)',
  },
];

const FAQS = [
  {
    question: 'Which image formats does Kagazo support for conversion?',
    answer:
      'Kagazo converts bi-directionally across all major web and system image formats, including JPEG (JPG), PNG, WebP, ICO, and HEIC. You can convert between any combination with custom quality controls and format-specific settings.',
  },
  {
    question: 'What happens to transparent backgrounds when converting PNG to JPG?',
    answer:
      'Because the JPEG format does not support alpha transparency channels, transparent areas must be filled with a solid color. Kagazo automatically blends transparent pixels onto a pure white (#FFFFFF) background matte, preventing the ugly solid black backgrounds produced by basic converters.',
  },
  {
    question: 'Can I convert multiple images simultaneously in batch mode?',
    answer:
      'Yes. You can drag and drop dozens of images at once. Kagazo processes your files in parallel using multi-threaded browser web workers, allowing 1-click batch downloads with zero server delays.',
  },
  {
    question: 'How do I create a website favicon using this tool?',
    answer:
      'Select "ICO" as your target format and upload a square logo or icon. Kagazo packs multiple standard favicon resolutions (16x16, 32x32, 48x48) into a unified `favicon.ico` binary file ready for immediate website deployment.',
  },
  {
    question: 'Will converting between formats reduce the visual quality of my images?',
    answer:
      'Converting to lossless formats like PNG preserves 100% of pixel fidelity. When converting to lossy formats like JPG or WebP, Kagazo lets you adjust the quality slider (defaulting to a crisp 90–95%), ensuring high visual sharpness without unnecessary file bloat.',
  },
  {
    question: 'Can I convert mobile phone photos (iPhone HEIC or Android JPG)?',
    answer:
      'Yes. Upload photos directly from any smartphone. Kagazo normalizes mobile color spaces and exports universally compatible files ready for upload to portals or sharing on messaging apps.',
  },
  {
    question: 'Are my private photos and graphics uploaded to any cloud server?',
    answer:
      'Never. 100% of the image transcoding algorithms run client-side inside your browser’s volatile memory using HTML5 Canvas and WebAssembly. No files are ever saved or transmitted across external networks.',
  },
  {
    question: 'Does Kagazo add any watermarks or branding to converted images?',
    answer:
      'No. All exported files are 100% clean, watermark-free, and suitable for official government applications, e-commerce stores, and professional design projects.',
  },
  {
    question: 'How fast is in-browser image conversion compared to cloud converters?',
    answer:
      'Because files do not need to be uploaded to a remote server and downloaded again, conversion happens instantly on your device hardware, making it up to 10x faster than cloud-based alternatives.',
  },
  {
    question: 'Is this multi-format image converter completely free to use?',
    answer:
      'Yes, 100% free forever. No subscriptions, no credits, no registrations, and no daily conversion limits.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Source Images',
    desc: 'Select or drag-and-drop your images in any format (JPG, PNG, WebP, HEIC, ICO supported).',
  },
  {
    step: 2,
    title: 'Select Desired Target Format',
    desc: 'Choose your desired output format (JPG, PNG, WebP, or ICO) from the format switcher tabs.',
  },
  {
    step: 3,
    title: 'Configure Quality & Alpha Matte',
    desc: 'Adjust the compression quality slider and choose matte background colors for transparent files.',
  },
  {
    step: 4,
    title: 'Instant In-Memory Transcoding',
    desc: 'The client-side engine converts pixels and packages metadata in volatile device RAM.',
  },
  {
    step: 5,
    title: 'Download Converted Assets',
    desc: 'Download your converted images individually or in batch with zero watermarks or file size restrictions.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Black Background on PNG to JPG',
    title: 'Missing Alpha Matte Channel',
    desc: 'JPEG lacks transparency, causing raw convertors to render transparent pixels black. Kagazo automatically replaces transparency with pure white (#FFFFFF).',
  },
  {
    badge: 'Error: Distorted Website Favicon (.ico)',
    title: 'Non-Square Source Dimensions',
    desc: 'Uploading rectangular images to ICO causes horizontal squashing. Ensure your source logo is square (1:1 aspect ratio) for clean favicon rendering.',
  },
  {
    badge: 'Error: Browser Freezing on Bulk Uploads',
    title: 'Memory Exhaustion on Massive Files',
    desc: 'Converting 50 heavy camera files at once can strain memory. Kagazo queues processing through background web workers to keep your browser responsive.',
  },
  {
    badge: 'Error: Color Shift on Social Media',
    title: 'Display P3 / CMYK Incompatibility',
    desc: 'Images saved in CMYK or Display P3 look dull on web portals. Kagazo normalizes color profiles to standard sRGB for consistent vibrant colors.',
  },
];

export default function ImageConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Free Image Converter Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/image-converter',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Convert images between JPG, PNG, WebP, and ICO formats online free with 100% in-browser privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Images Online in 5 Steps',
        description:
          'Step-by-step instructions to convert image formats with quality and transparency controls.',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Universal Multi-Format Image Converter Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Image Converter &amp; </span>
            <span className="text-primary">Format Matrix Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert images between <strong>JPG</strong>, <strong>PNG</strong>, <strong>WebP</strong>, and <strong>ICO</strong> formats with automatic white matte background handling and 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Universal Transcoding
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  High-Speed In-Browser Image Conversion Across All Formats
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Different platforms require different image formats: government forms require JPG, logos require PNG, and modern websites require WebP. Kagazo converts between them smoothly with zero server uploads.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ArrowRightLeft className="w-4 h-4" /> Multi-Format Matrix
                  </span>
                  <p className="text-xs text-text-main/70">
                    Seamlessly convert between JPG, PNG, WebP, and multi-resolution ICO favicons in 1 click.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Palette className="w-4 h-4" /> Smart White Matte
                  </span>
                  <p className="text-xs text-text-main/70">
                    Automatically fills transparent backgrounds with pure white (#FFFFFF) when converting to JPEG.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    All conversion algorithms run in local RAM. Private photos and brand assets are never transmitted.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Image Format Characteristics &amp; Compatibility Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Comparison of compression efficiency, transparency support, and ideal use cases.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Format Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Format</th>
                      <th className="py-3 px-3">Best Suited For</th>
                      <th className="py-3 px-3">Transparency (Alpha)</th>
                      <th className="py-3 px-3">Compression Architecture</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {FORMAT_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.format}</td>
                        <td className="py-3 px-3 text-xs text-text-main/80">{row.bestFor}</td>
                        <td className="py-3 px-3 font-medium text-emerald-700">{row.transparency}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.compression}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Conversion Tip:</strong> When converting images for government portal uploads (SSC, UPSC, TNPSC), select <strong>JPG</strong> to ensure compliance with strict portal validators.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Convert Images in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">{s.title}</h3>
                    <p className="text-xs text-text-main/75 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common Image Conversion Errors and How Kagazo Fixes Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/80 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deep 10 FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (Image Converter Matrix)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights on format compatibility, transparency preservation, and batch conversion.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-black">Q{idx + 1}.</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/80 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-4">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Converters
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/jpg-to-png"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JPG to PNG Converter
                </Link>
                <Link
                  href="/tools/png-to-jpg"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to JPG Converter
                </Link>
                <Link
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP Converter
                </Link>
                <Link
                  href="/tools/png-to-ico"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to ICO Favicon
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Memory RAM Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Images are converted locally using client-side WebAssembly. No files are ever saved or transmitted to cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
