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
  Gauge,
  Layers,
  Globe2,
} from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PNG to WebP Converter Online Free - Ultra Compressed & Lossless | Kagazo',
  description:
    'Convert PNG images to next-generation Google WebP format online for free. Maintain full alpha transparency, reduce file sizes by up to 80%, boost Core Web Vitals (LCP), with 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/png-to-webp',
  },
  openGraph: {
    title: 'PNG to WebP Converter Online Free - Ultra Compressed | Kagazo',
    description:
      'Convert PNG to WebP format with full alpha transparency and 80% file size reduction. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/png-to-webp',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNG to WebP Converter Online Free | Kagazo',
    description:
      'Supercharge web performance by converting heavy PNGs to ultra-lightweight WebP files with full transparency retention.',
  },
};

const FORMAT_COMPARISON = [
  {
    feature: 'Compression Technology',
    png: 'DEFLATE (LZ77 dictionary + Huffman)',
    webp: 'VP8 intra-frame predictive coding & VP8L entropy',
    advantage: 'WebP achieves 26% to 80% higher compression efficiency',
  },
  {
    feature: 'Alpha Transparency',
    png: 'Supported (8-bit alpha channel)',
    webp: 'Supported (Full lossless alpha with minimal byte overhead)',
    advantage: 'WebP maintains transparent backgrounds at a fraction of PNG size',
  },
  {
    feature: 'Impact on Core Web Vitals (LCP)',
    png: 'Heavy payloads often trigger high LCP penalties on mobile',
    webp: 'Drastically accelerates Largest Contentful Paint (LCP) scores',
    advantage: 'Directly boosts Google SEO rankings & PageSpeed Insights score',
  },
  {
    feature: 'Animation Support',
    png: 'Requires APNG (Limited support in old tooling)',
    webp: 'Native animated WebP with 24-bit color and alpha channel',
    advantage: 'Lighter and higher fidelity than legacy animated GIFs',
  },
  {
    feature: 'Browser Compatibility',
    png: '100% Universal (Legacy browsers & all OS)',
    webp: '97.5%+ Global support (Chrome, Safari 14+, Firefox, Edge)',
    advantage: 'Standard production format for all modern websites & apps',
  },
];

const FAQS = [
  {
    question: 'How does WebP achieve smaller file sizes than PNG without losing quality?',
    answer:
      'WebP was engineered by Google specifically for modern web delivery. Lossless WebP uses predictive coding that computes each pixel value based on neighboring pixels, encoding only the mathematical difference (residual). Combined with color space transformations and local color cache tables, WebP files are typically 26% to 35% smaller than the most aggressively compressed PNGs at identical pixel perfection.',
  },
  {
    question: 'Does converting PNG to WebP keep my transparent background?',
    answer:
      'Yes, absolutely. Unlike JPEG, the WebP specification natively supports full 8-bit alpha channel transparency. Converting transparent PNG logos, icons, cutouts, and product graphics to WebP preserves transparent backgrounds seamlessly while cutting download sizes substantially.',
  },
  {
    question: 'How does using WebP improve my website SEO and Google PageSpeed score?',
    answer:
      'Google uses Core Web Vitals as an official search ranking signal. Largest Contentful Paint (LCP) measures how fast the main visual content of a webpage loads. Replacing heavy PNG banners and hero images with lightweight WebP reduces network transfer payloads by up to 80%, directly improving your Lighthouse performance score and search engine rankings.',
  },
  {
    question: 'Are my uploaded images kept secure and private?',
    answer:
      'Yes. Kagazo operates exclusively inside your browser’s volatile RAM memory using native HTML5 Canvas and WebP encoders. Your files are never transferred over the internet to remote servers, meaning sensitive screenshots, company designs, and personal photos remain 100% private on your machine.',
  },
  {
    question: 'Can I batch convert multiple PNG images into WebP at once?',
    answer:
      'Yes. You can drag and drop dozens of PNG files into the workspace simultaneously. Kagazo processes each image concurrently on background threads and allows you to download them individually or save all converted WebP graphics in a single ZIP bundle with one click.',
  },
];

export default function PngToWebpPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo PNG to WebP Converter Online Free',
        url: 'https://kagazo.in/tools/png-to-webp',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Convert PNG images to lightweight WebP format with full alpha transparency preservation, batch processing, and in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PNG Images to WebP Format Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload PNG Files',
            text: 'Drag and drop PNG images into the converter workspace.',
          },
          {
            '@type': 'HowToStep',
            name: 'Client-Side WebP Encoding',
            text: 'The browser engine translates the bitmap into Google WebP with optimal predictive coding and alpha preservation.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download WebP Files',
            text: 'Download individual WebP graphics or export all files in a single ZIP archive.',
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
            name: 'PNG to WebP Converter',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">PNG to WebP</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>High-Speed WebP Performance Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            PNG to WebP Converter Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert heavy PNG files into ultra-fast Google WebP images. Shrink file sizes by up to 80% while retaining full alpha transparency and sharp edge definition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Layers className="w-4 h-4 text-primary" /> Full Transparency Preserved
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Gauge className="w-4 h-4 text-primary" /> Core Web Vitals Accelerated
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine
              initialSourceFormat="png"
              initialTargetFormat="webp"
              fixedTargetFormat={true}
              toolHeading="Convert PNG to WebP"
              toolSubheading="Upload PNG files to convert to Google WebP format with full transparency preservation."
            />

            <AdSlot slot="post_download" />

            {/* Technical Specification Matrix */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                  Format Comparison: PNG vs Next-Gen WebP
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Why web developers and SEO specialists are migrating static PNG assets to WebP.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/60">
                      <th className="py-3 px-4 font-bold text-text-main">Metric / Feature</th>
                      <th className="py-3 px-4 font-bold text-text-main">PNG (Legacy Standard)</th>
                      <th className="py-3 px-4 font-bold text-primary">WebP (Modern Standard)</th>
                      <th className="py-3 px-4 font-bold text-emerald-700">Real-World Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {FORMAT_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-text-main">{row.feature}</td>
                        <td className="py-3.5 px-4 text-text-main/80">{row.png}</td>
                        <td className="py-3.5 px-4 font-medium text-primary">{row.webp}</td>
                        <td className="py-3.5 px-4 text-emerald-700 font-medium">{row.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Performance & Core Web Vitals Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-primary" />
                  Accelerating Core Web Vitals &amp; PageSpeed with WebP
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  How next-generation image encoding eliminates bandwidth bottlenecks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">⚡ Faster LCP (Load Speed)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Hero banners compressed to WebP download up to 3× faster on mobile cellular networks, lowering Largest Contentful Paint.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">📉 70% Bandwidth Savings</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Drastically decreases cloud egress and CDN transfer bills while providing lightning-quick experiences for visitors on data limits.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🔍 Higher Google Rankings</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Google rewards websites that deliver modern image formats with higher PageSpeed scores and enhanced mobile search visibility.
                  </p>
                </div>
              </div>
            </section>

            {/* Step-by-Step Workflow */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-primary" />
                  How to Convert PNG to WebP in 3 Simple Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Instant client-side encoding with zero software installations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Drop PNG Images</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Select one or multiple PNG graphics from your storage drive or clipboard.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-sm text-text-main">In-Memory Encoding</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    The engine compresses files using browser hardware acceleration while preserving transparency.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Export WebP or ZIP</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Save individual WebP files or click Download All as ZIP for batch processing.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions About PNG to WebP
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Clear answers about compression algorithms, transparency support, and SEO benefits.
                </p>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-surface border border-surface-darker space-y-2">
                    <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-xs text-text-main/80 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Converters</span>
              <div className="space-y-1.5">
                <Link href="/tools/webp-to-png" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  WebP to PNG
                </Link>
                <Link href="/tools/png-to-jpg" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  PNG to JPG
                </Link>
                <Link href="/tools/jpg-to-png" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  JPG to PNG
                </Link>
                <Link href="/tools/png-to-ico" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  PNG to Favicon ICO
                </Link>
                <Link href="/tools/image-optimizer" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  Image Optimizer
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Client Privacy Guarantee</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Your images are processed 100% inside your browser memory. No files are ever sent to external cloud servers.
              </p>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
