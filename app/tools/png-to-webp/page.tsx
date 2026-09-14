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
  title: 'PNG to WebP Converter Online Free | Transparent & Fast | Kagazo',
  description:
    'Convert PNG images to WebP format online free. Reduce image size by 25–45% while preserving full alpha transparency and crisp lines with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/png-to-webp',
  },
  openGraph: {
    title: 'PNG to WebP Converter Online Free | Kagazo',
    description:
      'Convert PNG to WebP format with full alpha transparency preservation and zero server uploads.',
    url: 'https://kagazo.in/tools/png-to-webp',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const WEBP_SPEC_MATRIX = [
  {
    parameter: 'Compression Architecture',
    png: 'Deflate algorithm (LZ77 + Huffman)',
    webp: 'VP8 / VP8L predictive coding',
    benefit: 'WebP is 26% to 45% smaller than PNG',
  },
  {
    parameter: 'Alpha Channel Support',
    png: 'Full 8-bit alpha transparency',
    webp: 'Full 8-bit lossless alpha channel',
    benefit: 'Seamless transparent cutouts for logos and icons',
  },
  {
    parameter: 'Web & Browser Support',
    png: '100% (Universal legacy)',
    webp: '97%+ across all modern browsers',
    benefit: 'Supported by Chrome, Safari, Edge, and Firefox',
  },
  {
    parameter: 'SEO & Page Speed Impact',
    png: 'Heavy payload penalizes mobile LCP',
    webp: 'Recommended by Google PageSpeed Insights',
    benefit: 'Significantly improves Core Web Vitals performance',
  },
];

const FAQS = [
  {
    question: 'Why should I convert my website PNG images to WebP format?',
    answer:
      'WebP is a modern image format developed by Google that provides superior lossless and lossy compression for web assets. Converting PNGs to WebP reduces file size by 25% to 45% while retaining transparent backgrounds, dramatically speeding up webpage load times and boosting Google SEO rankings.',
  },
  {
    question: 'Does converting PNG to WebP preserve transparent backgrounds?',
    answer:
      'Yes, 100%. WebP includes native support for an 8-bit alpha transparency channel just like PNG. Transparent logos, product cutouts, and UI badges retain their transparent backdrops without any black fringing or color degradation.',
  },
  {
    question: 'Will converting PNG to WebP cause any loss of image sharpness?',
    answer:
      'No. When converted in lossless mode, WebP reconstructs pixel values bit-for-bit with zero fidelity loss. For photographic images, even balanced lossy WebP retains sharp vector-like edges and color gradients.',
  },
  {
    question: 'Are WebP images supported across all modern web browsers?',
    answer:
      'Yes. Over 97% of all global web browsers—including Google Chrome, Apple Safari (iOS & macOS), Mozilla Firefox, Microsoft Edge, and Opera—fully support WebP natively.',
  },
  {
    question: 'Can I convert multiple PNG files to WebP simultaneously?',
    answer:
      'Yes. Drag and drop multiple PNG files into Kagazo. Our engine processes your files concurrently in local device RAM using multi-threaded web workers, allowing instant batch downloads.',
  },
  {
    question: 'Does this tool upload my company graphics or logos to any server?',
    answer:
      'Never. 100% of the WebP encoding algorithms execute client-side inside your browser’s volatile memory. Your private graphics, logos, and UI designs never leave your computer.',
  },
  {
    question: 'Can I upload WebP images to WordPress and Shopify stores?',
    answer:
      'Yes. WordPress (version 5.8+) and Shopify natively support WebP uploads in media libraries, automatically serving them to visitors for maximum page speed.',
  },
  {
    question: 'How does Kagazo compare to command-line cwebp or plugins?',
    answer:
      'Kagazo brings the power of native libwebp compiled to WebAssembly directly to your browser UI. You get professional-grade compression with visual controls without needing to install terminal tools or heavy CMS plugins.',
  },
  {
    question: 'Does this converter work on mobile phones and tablets?',
    answer:
      'Yes. The interface is fully responsive and optimized for mobile touchscreens, running seamlessly on Android and iOS browsers.',
  },
  {
    question: 'Is this PNG to WebP converter completely free with zero watermarks?',
    answer:
      'Yes, 100% free forever with no watermarks, no account registration, and no file conversion limits.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload PNG Assets',
    desc: 'Select or drag-and-drop your PNG logos, graphics, or transparent cutouts into the uploader.',
  },
  {
    step: 2,
    title: 'Select WebP Target Format',
    desc: 'The engine defaults to WebP with automatic alpha channel preservation enabled.',
  },
  {
    step: 3,
    title: 'Adjust Compression Level',
    desc: 'Choose between lossless predictive coding or balanced lossy compression for extra byte savings.',
  },
  {
    step: 4,
    title: 'In-Memory WebP Encoding',
    desc: 'The browser transcodes pixels directly into compact WebP bitstreams in local device RAM.',
  },
  {
    step: 5,
    title: 'Download Optimized WebP',
    desc: 'Download your lightweight WebP assets ready for instant deployment to WordPress, Shopify, or Next.js.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Slow Core Web Vitals / LCP',
    title: 'Serving Uncompressed PNG Assets',
    desc: 'Heavy PNG graphics delay page rendering on mobile networks. Converting to WebP saves 25–45% in bytes, boosting Google PageSpeed scores.',
  },
  {
    badge: 'Error: Lost Transparency During Conversion',
    title: 'Using Low-Grade JPEG Fallback',
    desc: 'Converting to JPEG strips alpha channels. WebP supports full 8-bit alpha transparency, preserving clean background cutouts.',
  },
  {
    badge: 'Error: Color Space Shift on Icons',
    title: 'Improper Color Profile Conversion',
    desc: 'Basic encoders distort brand colors. Kagazo preserves standard sRGB color gamuts so brand logos display with exact color accuracy.',
  },
  {
    badge: 'Error: Browser Freezing on Large Batches',
    title: 'Main-Thread Blocking Operations',
    desc: 'Processing 50 images in browser threads can cause freezing. Kagazo offloads encoding to background web workers for smooth performance.',
  },
];

export default function PngToWebpPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PNG to WebP Converter Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/png-to-webp',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Convert PNG images to WebP format online free with transparency preservation and 100% in-browser privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PNG to WebP Online in 5 Steps',
        description:
          'Step-by-step instructions to convert PNG graphics to modern WebP format.',
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
            name: 'PNG to WebP',
            item: 'https://kagazo.in/tools/png-to-webp',
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
          <span className="text-primary font-bold">PNG to WebP</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Next-Gen Web Image Transcoder (PNG to WebP)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>PNG to WebP </span>
            <span className="text-primary">Converter Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert PNG images to <strong>WebP format</strong> online free. Squeeze file size by 25–45% while preserving full alpha transparency and sharp vector lines with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine initialTargetFormat="webp" />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Next-Gen Web Efficiency
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Full Alpha Transparency Preservation with Maximum Byte Savings
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Serving raw PNG graphics on websites slows down mobile browsing. WebP delivers equivalent transparent cutouts at a fraction of the byte size, accelerating Google PageSpeed scores.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> 100% Alpha Intact
                  </span>
                  <p className="text-xs text-text-main/70">
                    Transparent backgrounds remain flawless without black boxes or halo edge fringes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> Core Web Vitals Ready
                  </span>
                  <p className="text-xs text-text-main/70">
                    Slashes payload sizes to help pages pass Google Largest Contentful Paint benchmarks.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Transcoding executes in device RAM. Proprietary graphics are never uploaded.
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
                    PNG vs. WebP Technical Comparison Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Architectural comparison of compression efficiency, transparency support, and browser adoption.
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
                      <th className="py-3 px-3">Metric</th>
                      <th className="py-3 px-3">PNG Format</th>
                      <th className="py-3 px-3">WebP Format</th>
                      <th className="py-3 px-3">Web Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {WEBP_SPEC_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.parameter}</td>
                        <td className="py-3 px-3 text-xs text-text-main/80">{row.png}</td>
                        <td className="py-3 px-3 font-medium text-emerald-700">{row.webp}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>CMS Tip:</strong> Modern CMS platforms like WordPress (5.8+) and Shopify accept WebP files directly, automatically serving them to visitors for faster load speeds.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Convert PNG to WebP in 5 Steps
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
                Common PNG to WebP Conversion Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (PNG to WebP Conversion)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical insights on WebP compression, transparency, and browser compatibility.
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
                  href="/tools/webp-to-png"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  WebP to PNG Converter
                </Link>
                <Link
                  href="/tools/png-to-jpg"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to JPG Converter
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
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
                Images are converted locally using client-side WebAssembly. No files are ever saved or transmitted to cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
