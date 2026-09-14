import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Cpu,
  CheckCircle2,
  FileCheck,
  Award,
  Layers,
  Sliders,
  Sparkles,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { ImageOptimizerEngine } from '@/components/tools/ImageOptimizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Image Optimizer Online | Lossless Compression & Web Speed | Kagazo',
  description:
    'Optimize images for web performance online free. Compress JPG, PNG, and WebP assets with smart quantization, lossless metadata stripping, and zero server logging.',
  alternates: {
    canonical: 'https://kagazo.in/tools/image-optimizer',
  },
  openGraph: {
    title: 'Free Image Optimizer Online | Kagazo',
    description:
      'Compress and optimize web images for maximum page speed and SEO. 100% in-browser processing.',
    url: 'https://kagazo.in/tools/image-optimizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is image optimization and how does it improve website speed?',
    answer:
      'Image optimization is the process of reducing image file size (bytes) without visibly reducing visual sharpness. Compressed images download faster over mobile networks, drastically improving Google Core Web Vitals (Largest Contentful Paint - LCP), boosting search engine rankings, and reducing server bandwidth costs.',
  },
  {
    question: 'What is the difference between lossless and lossy image optimization?',
    answer:
      'Lossless optimization strips non-essential metadata (EXIF tags, color profiles, comments) and compresses pixel tables without altering a single pixel value. Lossy optimization applies perceptual quantization to remove microscopic color nuances imperceptible to the human eye, slashing file size by 60–85%.',
  },
  {
    question: 'Does this tool support converting images to WebP format?',
    answer:
      'Yes. WebP provides superior compression algorithms developed by Google, delivering 25–35% smaller file sizes than equivalent JPEGs. Kagazo allows 1-click optimization to WebP for modern web publishing.',
  },
  {
    question: 'How does Kagazo optimize PNG graphics and transparent logos?',
    answer:
      'Our engine applies adaptive color palette quantization (converting 32-bit RGBA to optimized 8-bit indexed PNG with alpha transparency) and advanced Deflate compression, reducing PNG file sizes by up to 70% while keeping sharp vector lines and transparent backgrounds intact.',
  },
  {
    question: 'Does optimizing an image strip private EXIF camera metadata?',
    answer:
      'Yes. EXIF tags containing GPS coordinates, camera serial numbers, and thumbnail caches are stripped automatically, protecting your privacy while saving significant byte budget.',
  },
  {
    question: 'Can I optimize multiple website assets simultaneously in batch?',
    answer:
      'Yes. Drag and drop multiple images at once. Kagazo processes your files concurrently in local browser memory using multi-threaded web workers.',
  },
  {
    question: 'Are my company assets or proprietary graphics uploaded to any server?',
    answer:
      'Never. 100% of the optimization algorithms run client-side inside your browser. No files, designs, or logos are ever sent across the network.',
  },
  {
    question: 'How does Kagazo compare to TinyPNG or ImageOptim?',
    answer:
      'Unlike TinyPNG—which enforces cloud file limits and charges for API usage—Kagazo runs directly on your device CPU/GPU. There are zero upload queues, zero file size limits, zero subscription costs, and complete offline privacy.',
  },
  {
    question: 'Will optimized images look clear on high-DPI Retina displays?',
    answer:
      'Yes. By preserving high-frequency edge contrast while trimming uniform color redundancy, optimized images remain razor-sharp on 4K monitors and Apple Retina screens.',
  },
  {
    question: 'Is this image optimizer completely free with zero watermarks?',
    answer:
      'Yes, 100% free forever. No watermarks, no account registration, and no daily compression caps.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Web Images',
    desc: 'Select or drag-and-drop your web assets, blog photos, or logos (JPG, PNG, WEBP, SVG supported).',
  },
  {
    step: 2,
    title: 'Select Optimization Mode',
    desc: 'Choose Lossless for pixel-perfect preservation, or Balanced / Aggressive for maximum page speed.',
  },
  {
    step: 3,
    title: 'In-Memory Perceptual Tuning',
    desc: 'The engine strips EXIF metadata and optimizes quantization tables locally in browser RAM.',
  },
  {
    step: 4,
    title: 'Inspect Savings & Quality Loupe',
    desc: 'Review the byte reduction percentage and compare original vs optimized output side-by-side.',
  },
  {
    step: 5,
    title: 'Download Optimized Assets',
    desc: 'Download your web-optimized images ready for deployment on WordPress, Next.js, or Shopify.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "Core Web Vitals LCP Failure"',
    title: 'Serving Uncompressed Hero Banners',
    desc: 'Serving 4 MB camera photos as website banners damages Google SEO rankings. Kagazo compresses banners under 400 KB for near-instant page loading.',
  },
  {
    badge: 'Error: Gradient Banding Artifacts',
    title: 'Excessive Quantization Thresholds',
    desc: 'Over-compressing gradients creates stepped color bands. Kagazo uses error-diffusion dithering to ensure smooth sky and shadow transitions.',
  },
  {
    badge: 'Error: Bloated 32-Bit PNG Files',
    title: 'Uncompressed Alpha Transparency Channels',
    desc: 'Simple logos saved as 32-bit RGBA are unnecessarily large. Kagazo quantizes palettes to 8-bit with alpha, saving 70% without quality loss.',
  },
  {
    badge: 'Error: EXIF Metadata Overhead',
    title: 'Hidden GPS & Thumbnail Bloat',
    desc: 'Camera images carry 200–500 KB of hidden EXIF tags. Kagazo strips non-visual metadata to dedicate every byte to actual image pixels.',
  },
];

export default function ImageOptimizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Free Image Optimizer Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/image-optimizer',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Optimize JPG, PNG, and WebP images for web speed and SEO performance online free with 100% in-browser privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Optimize Images for Web Online in 5 Steps',
        description:
          'Step-by-step instructions to optimize and compress web images for Core Web Vitals.',
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
            name: 'Image Optimizer',
            item: 'https://kagazo.in/tools/image-optimizer',
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
          <span className="text-primary font-bold">Image Optimizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Next-Gen Web Image Compressor (WebP, JPG, PNG)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Image Optimizer &amp; </span>
            <span className="text-primary">Web Speed Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Optimize JPG, PNG, and WebP assets with smart quantization and lossless metadata stripping. Boost <strong>Core Web Vitals</strong> and SEO speed with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageOptimizerEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Core Web Vitals Acceleration
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Perceptual Lossless Optimization in Volatile RAM
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Slow page loads hurt conversions and Google search rankings. Kagazo compresses website graphics by up to 80% without introducing visible blur or color degradation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> LCP Speed Boost
                  </span>
                  <p className="text-xs text-text-main/70">
                    Reduces Largest Contentful Paint (LCP) load times to help pages pass Google Core Web Vitals.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> WebP Transcoding
                  </span>
                  <p className="text-xs text-text-main/70">
                    Converts bulky PNG and JPEG graphics into modern, high-efficiency WebP files with 1 click.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Optimization algorithms execute in local device RAM. Proprietary company assets are never uploaded.
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
                    Web Format Optimization &amp; Compression Benchmarks
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Average file size reduction across formats and target applications.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Optimization Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Asset Type / Format</th>
                      <th className="py-3 px-3">Average Reduction</th>
                      <th className="py-3 px-3">Optimization Technique</th>
                      <th className="py-3 px-3">Target Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Photographs (JPEG)</td>
                      <td className="py-3 px-3 font-bold text-primary">60% – 80% Smaller</td>
                      <td className="py-3 px-3 text-xs">Perceptual DCT quantization</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Hero banners &amp; blog articles</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Logos &amp; Graphics (PNG)</td>
                      <td className="py-3 px-3 font-bold text-primary">50% – 70% Smaller</td>
                      <td className="py-3 px-3 text-xs">8-bit indexed alpha palette</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Brand assets &amp; UI icons</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Modern Web (WebP)</td>
                      <td className="py-3 px-3 font-bold text-primary">70% – 85% Smaller</td>
                      <td className="py-3 px-3 text-xs">Predictive block coding</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Modern responsive websites</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Vector Icons (SVG)</td>
                      <td className="py-3 px-3 font-bold text-primary">40% – 60% Smaller</td>
                      <td className="py-3 px-3 text-xs">XML metadata stripping</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Web design systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Performance Tip:</strong> Converting images to WebP can improve mobile loading speed by over 30%, which is heavily rewarded by Google’s page ranking algorithms.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Optimize Images in 5 Steps
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
                Common Web Optimization Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (Image Optimization &amp; SEO)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights on Core Web Vitals, WebP compression, and web performance.
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
                Related Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-image-to-100kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 100KB
                </Link>
                <Link
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP Converter
                </Link>
                <Link
                  href="/tools/compress-image-to-1mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 1MB
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
                Images are optimized locally in browser RAM. No proprietary graphics or logos are ever sent to remote servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
