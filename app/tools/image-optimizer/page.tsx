import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  Sliders,
  FileCheck,
  Globe2,
  Archive,
} from 'lucide-react';
import { ImageOptimizerEngine } from '@/components/tools/ImageOptimizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Image Optimizer Online Free - Compress JPEG, WebP, PNG, AVIF | Kagazo',
  description:
    'Compress and optimize images online for free without losing quality. Convert to modern WebP & AVIF, strip Exif tags, resize dimensions, and batch download as ZIP with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/image-optimizer',
  },
  openGraph: {
    title: 'Image Optimizer Online Free - Compress JPEG, WebP, PNG, AVIF | Kagazo',
    description:
      'High-performance image compressor and optimizer. Reduce image size up to 90% without quality loss. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/image-optimizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How does Kagazo Image Optimizer compress images without losing visible quality?',
    answer:
      'Kagazo utilizes perceptual quantization and modern browser compression algorithms (WebP and AVIF). By discarding high-frequency pixel noise that is undetectable to the human eye while preserving sharp edges and color gradients, files can shrink by 70% to 90% with virtually zero perceptible quality loss.',
  },
  {
    question: 'Why should I convert my JPG and PNG images to WebP or AVIF?',
    answer:
      'WebP is supported by 97%+ of all modern web browsers and yields 25–35% smaller file sizes than traditional JPEG at comparable visual quality. AVIF offers even higher compression efficiency, drastically improving Google PageSpeed, Core Web Vitals, and mobile loading times.',
  },
  {
    question: 'Are my private photos uploaded to any external server or cloud?',
    answer:
      'Never. Kagazo guarantees 100% Sovereign In-Browser RAM Privacy. Every compression pass, resize transformation, and format conversion executes exclusively within your browser’s volatile memory via HTML5 Canvas and typed arrays. Zero bytes are transmitted to any server.',
  },
  {
    question: 'Can I compress images to an exact target file size, such as 100KB or 200KB?',
    answer:
      'Yes! Use the "Target Max KB" input to set a specific threshold (e.g. 200KB for government exam portals or SSC/UPSC uploads). The engine performs a multi-step binary bisection search to deliver the highest possible quality that strictly fits within your target limit.',
  },
  {
    question: 'Can I batch compress multiple images and download them as a single ZIP file?',
    answer:
      'Yes. You can drag and drop up to 50 images at once. The engine processes them in parallel and provides a 1-Click "Download All as ZIP" button powered by client-side JSZip.',
  },
];

export default function ImageOptimizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Image Optimizer Online Free',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/image-optimizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress and optimize JPEG, PNG, WebP, and AVIF images online with real-time before/after preview and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress and Optimize Images Online for Free',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your Images',
            text: 'Drag and drop single or multiple JPG, PNG, WebP, AVIF, or BMP files into the optimization box.',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Quality or Target File Size',
            text: 'Choose your desired compression quality slider (e.g., 80% WebP) or enter an exact target KB ceiling.',
          },
          {
            '@type': 'HowToStep',
            name: 'Preview Before and After',
            text: 'Inspect the live side-by-side preview to compare original file size with the compressed output.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download File or Batch ZIP',
            text: 'Download individual optimized files or export the entire batch as an organized ZIP archive with 1 click.',
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
          <span className="text-primary font-bold">Image Optimizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Next-Gen WebP, AVIF &amp; JPEG Compression Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Image Optimizer &amp; Compressor
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Compress and optimize your photos for web speed and portal compliance. Reduce file size up to{' '}
            <strong>90%</strong> without noticeable quality loss. Convert to WebP, resize dimensions, and batch
            export with 100% in-browser privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant Client-Side Processing
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Archive className="w-4 h-4 text-primary" /> Batch ZIP Archive Download
            </span>
          </div>
        </header>

        {/* Studio Grid (Main Engine + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Engine */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageOptimizerEngine />

            {/* Post Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Educational & Comparison Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Image Format Compression Efficiency Matrix
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Compare performance metrics across traditional and modern image codecs.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Format Codec</th>
                      <th className="p-3.5">Typical Compression</th>
                      <th className="p-3.5">Alpha Transparency</th>
                      <th className="p-3.5">Browser Support</th>
                      <th className="p-3.5">Best Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold text-primary">WebP</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700">65% – 85% reduction</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Yes (Lossy &amp; Lossless)</td>
                      <td className="p-3.5 font-semibold">97.8% (All Modern Browsers)</td>
                      <td className="p-3.5">High-speed websites, blogs, e-commerce</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-primary">AVIF</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700">75% – 92% reduction</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Yes (HDR &amp; 10/12-bit)</td>
                      <td className="p-3.5 font-semibold">93.4% (Chrome, Safari, Firefox)</td>
                      <td className="p-3.5">Hero headers, photography, modern PWAs</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">JPEG / JPG</td>
                      <td className="p-3.5 font-mono">40% – 60% reduction</td>
                      <td className="p-3.5 text-rose-500 font-bold">No</td>
                      <td className="p-3.5 font-semibold">100% Universal</td>
                      <td className="p-3.5">Government exam portals, print lab submission</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">PNG</td>
                      <td className="p-3.5 font-mono">10% – 30% reduction</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Yes (Lossless)</td>
                      <td className="p-3.5 font-semibold">100% Universal</td>
                      <td className="p-3.5">Logos, crisp typography, UI screenshots</td>
                    </tr>
                  </tbody>
                </table>
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
                  Everything you need to know about optimizing images with zero server risk.
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
                  Related Media Tools
                </span>
                <span className="text-[10px] bg-primary-light text-primary font-bold px-1.5 py-0.5 rounded">
                  Instant
                </span>
              </div>

              <div className="space-y-1.5">
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
                    KB
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Photo Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change Image DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    300 DPI
                  </span>
                </Link>

                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Image to PDF 200KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    PDF
                  </span>
                </Link>

                <Link
                  href="/tools/remove-background"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Remove Background
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    AI
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Your images are compressed strictly in your computer volatile RAM. No server uploads or tracking.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ WebP / AVIF
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Zero Cloud Cost
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
