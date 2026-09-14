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
  title: 'PNG to JPG Converter Online Free | Pure White Matte & Fast | Kagazo',
  description:
    'Convert PNG images to high-quality JPG format online free. Automatic pure white background matte leveling, adjustable compression quality, batch processing, and 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/png-to-jpg',
  },
  openGraph: {
    title: 'PNG to JPG Converter Online Free | Kagazo',
    description:
      'Convert PNG to JPG instantly with automatic transparent-to-white background handling, custom quality control, and zero server uploads.',
    url: 'https://kagazo.in/tools/png-to-jpg',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FORMAT_COMPARISON = [
  {
    feature: 'Compression Architecture',
    png: 'Lossless DEFLATE (LZ77 + Huffman coding)',
    jpg: 'Lossy DCT (Discrete Cosine Transform)',
    advantage: 'JPG achieves 50% to 80% smaller file sizes for photos',
  },
  {
    feature: 'Alpha Channel Handling',
    png: 'Supports full 8-bit alpha transparency',
    jpg: 'No alpha channel (Solid background required)',
    advantage: 'Kagazo automatically applies clean pure white matte (#FFFFFF)',
  },
  {
    feature: 'File Size Efficiency',
    png: 'Heavy file size for detailed photographic imagery',
    jpg: 'Highly compact, adjustable quality sliders (80–100%)',
    advantage: 'Drastically speeds up upload time on online portal forms',
  },
  {
    feature: 'Portal Compatibility',
    png: 'Frequently rejected by Indian and US exam portals',
    jpg: '100% accepted across SSC, UPSC, TNPSC, and visa portals',
    advantage: 'Guaranteed compliance with strict government upload guidelines',
  },
];

const FAQS = [
  {
    question: 'How does Kagazo prevent black backgrounds when converting transparent PNG to JPG?',
    answer:
      'The JPEG format has no native concept of transparency. When basic converters strip the alpha channel, transparent pixels default to solid black (RGB 0,0,0). Kagazo automatically composites transparent pixels against a calibrated pure white background (#FFFFFF) before encoding, ensuring your logos and signatures appear crisp on a clean white surface.',
  },
  {
    question: 'Why do government and recruitment portals strictly reject PNG files?',
    answer:
      'Portals like SSC, UPSC, IBPS, and State PSCs use legacy document verification databases optimized exclusively for JPEG binaries. Submitting a PNG—even if manually renamed with a `.jpg` extension—fails server-side MIME type header validation and triggers an immediate upload rejection error.',
  },
  {
    question: 'How much smaller will my file be after converting from PNG to JPG?',
    answer:
      'For photographic imagery, portraits, and scanned documents, converting from PNG to JPG typically reduces file size by 60% to 85%. For example, a heavy 4 MB PNG photo usually converts into an optimized 400–700 KB JPG at high 92% quality.',
  },
  {
    question: 'Can I choose the output JPEG quality level?',
    answer:
      'Yes. Kagazo provides an interactive quality slider ranging from 70% (maximum compression) to 100% (highest fidelity). The default setting of 92% provides the optimal balance between visual clarity and compact file size.',
  },
  {
    question: 'How can I convert a transparent signature PNG for an exam application?',
    answer:
      'Upload your signature PNG directly. Kagazo automatically renders it on a solid white canvas and outputs a portal-compliant JPEG file. You can then use our "Compress Image to 20KB" tool if strict byte limits apply.',
  },
  {
    question: 'Can I convert multiple PNG files at once in batch?',
    answer:
      'Yes. Drag and drop multiple PNG files simultaneously. The engine processes them in parallel using browser web workers, allowing you to download all converted JPGs in seconds.',
  },
  {
    question: 'Are my confidential document scans or photos uploaded to any server?',
    answer:
      'Never. Kagazo performs all image decoding, alpha compositing, and JPEG encoding 100% client-side inside your browser’s volatile memory. Your files never travel across the internet.',
  },
  {
    question: 'Does converting PNG to JPG introduce noticeable compression artifacts?',
    answer:
      'At our default 92% quality setting, lossy compression artifacts are virtually invisible to the human eye. Fine facial details, printed text, and handwriting remain crisp and clear.',
  },
  {
    question: 'Does this converter work on mobile phones (iPhone and Android)?',
    answer:
      'Yes. The tool is fully responsive and runs smoothly inside mobile Safari, Chrome, and Samsung Internet with full touch-friendly drag-and-drop support.',
  },
  {
    question: 'Is this PNG to JPG converter completely free with zero watermarks?',
    answer:
      'Yes, 100% free with no registration, no subscription fees, no watermarks, and no conversion limits.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload PNG Images',
    desc: 'Select or drag-and-drop your PNG graphics, transparent cutouts, or photo scans into the uploader.',
  },
  {
    step: 2,
    title: 'Automatic Pure White Matte',
    desc: 'The engine automatically composites transparent background pixels against a pure white (#FFFFFF) matte.',
  },
  {
    step: 3,
    title: 'Tune JPEG Quality Slider',
    desc: 'Adjust the compression quality slider (default 92%) to balance file size against visual sharpness.',
  },
  {
    step: 4,
    title: 'Instant In-Memory Encoding',
    desc: 'The client-side engine encodes a standards-compliant JFIF JPEG binary in local device RAM.',
  },
  {
    step: 5,
    title: 'Download Portal-Ready JPG',
    desc: 'Download your converted JPEG files ready for instant submission to government and employment portals.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Black Background Behind Logos',
    title: 'Raw Transparency Stripping',
    desc: 'Converting PNG to JPG without a background matte renders transparent areas pitch black. Kagazo automatically adds a clean pure white (#FFFFFF) backdrop.',
  },
  {
    badge: 'Error: "File format not supported (PNG)"',
    title: 'Uploading PNG to JPEG-Only Portals',
    desc: 'Exam portals like SSC and UPSC reject PNG files. Renaming the extension fails validation. Kagazo exports genuine JFIF standard JPEG binaries.',
  },
  {
    badge: 'Error: Blurry Text on Low-Quality JPG',
    title: 'Over-Compressing Text Graphics',
    desc: 'Setting quality too low causes ringing noise around letters. Kagazo defaults to 92% quality to keep text and fine signature strokes sharp.',
  },
  {
    badge: 'Error: Gray Fringe Around Transparent Edges',
    title: 'Unpremultiplied Alpha Blending',
    desc: 'Rough matting leaves dark outlines around cutouts. Kagazo uses premultiplied alpha compositing to ensure clean, seamless edge blending.',
  },
];

export default function PngToJpgPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PNG to JPG Converter Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/png-to-jpg',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Convert PNG images to high-quality JPG format online free with pure white matte background handling and 100% in-browser privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PNG to JPG Online in 5 Steps',
        description:
          'Step-by-step instructions to convert PNG images to JPG format with white matte transparency handling.',
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
            name: 'PNG to JPG',
            item: 'https://kagazo.in/tools/png-to-jpg',
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
          <span className="text-primary font-bold">PNG to JPG</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Alpha Flattening &amp; Compression Engine (PNG to JPG)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>PNG to JPG </span>
            <span className="text-primary">Converter Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert PNG graphics to <strong>JPG format</strong> with automatic pure white (#FFFFFF) background matte leveling. Slash file sizes by 50–80% with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine initialTargetFormat="jpg" />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Clean Alpha Flattening
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Eliminating Black Transparency Artifacts in JPEG Conversions
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Because JPEG files do not support transparency, naive converters render transparent cutouts with solid black boxes. Kagazo blends transparent pixels onto pure white (#FFFFFF), producing clean, portal-compliant documents.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Palette className="w-4 h-4" /> Pure White Matte
                  </span>
                  <p className="text-xs text-text-main/70">
                    Replaces transparent alpha channels with solid white (#FFFFFF) for portal compliance.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> 50–80% Smaller Files
                  </span>
                  <p className="text-xs text-text-main/70">
                    Slashes heavy PNG byte bloat into lightweight, fast-loading JPEG binaries.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    All conversion executes in local device RAM. Sensitive files are never sent across the web.
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
                    PNG vs. JPG Format Comparison Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Architectural comparison of compression efficiency, alpha channels, and portal compliance.
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
                      <th className="py-3 px-3">Comparison Metric</th>
                      <th className="py-3 px-3">PNG Format</th>
                      <th className="py-3 px-3">JPG / JPEG Format</th>
                      <th className="py-3 px-3">Conversion Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {FORMAT_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.feature}</td>
                        <td className="py-3 px-3 text-xs text-text-main/80">{row.png}</td>
                        <td className="py-3 px-3 font-medium text-emerald-700">{row.jpg}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Portal Rule:</strong> Government exam portals mandate JPG files. Converting signatures and ID photos from PNG to JPG ensures strict server-side MIME type compliance.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Convert PNG to JPG in 5 Steps
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
                Common PNG to JPG Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (PNG to JPG Conversion)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical insights on alpha matting, quality calibration, and portal submission.
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
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP Converter
                </Link>
                <Link
                  href="/tools/compress-image-to-20kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress to 20KB
                </Link>
                <Link
                  href="/tools/image-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Converter Matrix
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
                Images are converted locally in device RAM. No private photos or graphics are ever sent to remote servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
