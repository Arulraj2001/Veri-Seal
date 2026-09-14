import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Camera,
  Image as ImageIcon,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  Info,
} from 'lucide-react';
import { UniversalImageCompressor } from '@/components/tools/UniversalImageCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress Image to 1MB Online Free | High-Resolution Photo Optimizer | Kagazo',
  description:
    'Compress large photos and DSLR images to strictly under 1MB online free. Shrink 10MB–25MB images without quality loss. Zero watermark, 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-image-to-1mb',
  },
  openGraph: {
    title: 'Compress Image to 1MB Online Free | Kagazo',
    description:
      'Shrink large photos, high-res portraits, and DSLR exports to strictly under 1MB without losing sharpness.',
    url: 'https://kagazo.in/tools/compress-image-to-1mb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How does Kagazo compress 10MB–25MB photos to under 1MB without visible quality loss?',
    answer:
      'High-resolution smartphone and DSLR cameras capture excessive high-frequency noise and uncompressed EXIF metadata. Kagazo uses intelligent perceptual quantization and chroma subsampling to eliminate imperceptible data redundancy while preserving high-contrast edge sharpness, facial details, and color fidelity.',
  },
  {
    question: 'Why do email clients and web portals enforce a 1MB file size limit?',
    answer:
      'Large email attachments cause server timeouts and bounce-backs. Real estate MLS listings, job application portals, and web CMS platforms enforce a 1MB ceiling to ensure fast webpage loading and prevent database storage inflation on cloud servers.',
  },
  {
    question: 'Can I print photos that have been compressed to 1MB?',
    answer:
      'Yes. For standard 4x6 inch or 5x7 inch prints, a 1MB JPEG file contains more than enough pixel density and color depth for lab-grade photographic printing without visible grain or pixelation.',
  },
  {
    question: 'What is the difference between compressing to 1MB as JPG versus WEBP?',
    answer:
      'JPEG offers universal compatibility across all operating systems, legacy software, and web portals. WEBP achieves approximately 25–35% better compression efficiency at identical visual quality, making it ideal for modern website publishing.',
  },
  {
    question: 'Does this tool strip EXIF camera metadata to reduce file size?',
    answer:
      'Yes. Modern smartphone cameras store several hundred kilobytes of EXIF metadata—including GPS coordinates, lens serial numbers, exposure tables, and embedded thumbnail previews. Stripping this data frees up byte budget for higher image quality while protecting your location privacy.',
  },
  {
    question: 'Can I compress 48MP or 108MP mobile camera photos to 1MB?',
    answer:
      'Yes. Kagazo handles ultra-high-resolution images effortlessly. If a 108MP file cannot fit under 1MB under optimal JPEG quality, the engine intelligently scales down resolution while maintaining the exact original aspect ratio.',
  },
  {
    question: 'Will compressing an artwork or graphic design introduce color banding?',
    answer:
      'No. Kagazo preserves smooth color gradients and high bit-depth color transitions, preventing the ugly posterization or stepped color banding often seen with basic online compressors.',
  },
  {
    question: 'Are my high-resolution personal or commercial photos uploaded to cloud servers?',
    answer:
      'Never. Kagazo processes 100% of your images locally in your browser volatile memory using HTML5 Canvas and typed memory arrays. Your private photos never leave your device.',
  },
  {
    question: 'How fast does the in-browser 1MB compressor process large files?',
    answer:
      'Because all processing is hardware-accelerated on your local device CPU/GPU, even 20MB photos are optimized in under 2 seconds without waiting for slow cloud uploads or network roundtrips.',
  },
  {
    question: 'Can I use this tool for web design and website performance optimization?',
    answer:
      'Yes. Optimizing hero banners and blog cover photos under 1MB dramatically improves Google Core Web Vitals (LCP scores), reduces bounce rates, and cuts CDN bandwidth costs.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload High-Resolution Photo',
    desc: 'Select or drag-and-drop your camera photo, DSLR export, or graphic design (JPG, PNG, WEBP, HEIC supported).',
  },
  {
    step: 2,
    title: 'Confirm 1 MB (1024 KB) Target',
    desc: 'The tool defaults to a strict 1 MB ceiling, ideal for email attachments and web CMS uploads.',
  },
  {
    step: 3,
    title: 'Perceptual Quality Optimization',
    desc: 'The engine strips redundant EXIF metadata and optimizes quantization tables to maximize visual fidelity.',
  },
  {
    step: 4,
    title: 'Inspect High-DPI Detail Preview',
    desc: 'Zoom in with our clarity loupe preview to verify that fine textures, hair, and background gradients remain sharp.',
  },
  {
    step: 5,
    title: 'Download Optimized Image',
    desc: 'Download your 1MB photo instantly with zero watermarks, ready for email, printing, or web publishing.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "Attachment exceeds 1 MB limit"',
    title: 'Email Server Attachment Rejection',
    desc: 'Many corporate mail servers reject messages with attachments over 1 MB. Kagazo compresses your image to 850–950 KB to ensure guaranteed email delivery.',
  },
  {
    badge: 'Error: Blurred Fine Textures & Foliage',
    title: 'Aggressive Subsampling Artifacts',
    desc: 'Cheap compressors wash out fine foliage, fabric textures, and hair. Kagazo uses adaptive edge protection to preserve natural photographic textures.',
  },
  {
    badge: 'Error: EXIF Metadata Overhead',
    title: 'Hidden GPS & Thumbnail Bloat',
    desc: 'Camera raw exports often contain 1–2 MB of hidden EXIF tags and thumbnails. Kagazo strips non-essential metadata to allocate all byte budget to image pixels.',
  },
  {
    badge: 'Error: Color Space Washing Out (CMYK)',
    title: 'Print Profile Mismatch on Web',
    desc: 'DSLR photos exported in Adobe RGB or CMYK appear dull on web browsers. Kagazo converts images to standard sRGB for vibrant, accurate web colors.',
  },
];

export default function CompressImageTo1MbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress Image to 1MB Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-image-to-1mb',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Compress high-resolution photos and DSLR images to strictly under 1MB online free with zero watermark.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Image to 1 MB Online in 5 Steps',
        description:
          'Step-by-step instructions to compress photos and large images under 1 MB.',
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
            name: 'Compress Image to 1MB',
            item: 'https://kagazo.in/tools/compress-image-to-1mb',
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
          <span className="text-primary font-bold">Compress Image to 1MB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>High-Resolution Photo Optimizer (Under 1 MB)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress Image to </span>
            <span className="text-primary">1MB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Shrink 5MB–25MB DSLR and smartphone photos strictly <strong>under 1 MB</strong> while retaining maximum clarity. Ideal for email attachments, MLS listings, and website performance.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalImageCompressor
              initialTargetKb={1024}
              isFixedTarget={true}
              toolHeading="Compress Image to Strictly Under 1 MB"
              toolSubheading="Shrink 5MB-25MB DSLR and smartphone photos under 1 MB while retaining maximum clarity."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Perceptual Optimization
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Studio-Quality 1MB Compression in Volatile Device RAM
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Shrinking heavy 10MB–25MB photos often results in muddy colors and blurry details. Kagazo uses adaptive discrete cosine transforms to reduce file size by 90%+ while keeping fine details razor-sharp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Camera className="w-4 h-4" /> DSLR &amp; Phone Ready
                  </span>
                  <p className="text-xs text-text-main/70">
                    Effortlessly optimizes 48MP, 64MP, and 108MP camera photos down to compliant 1MB files.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" /> sRGB Color Accuracy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Preserves vivid color gamuts and prevents washed-out tones on modern web displays.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    High-resolution photos process in local RAM. Private photos are never uploaded to remote servers.
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
                    1MB Image Optimization Matrix &amp; Platform Guidelines
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Recommended file sizes and standards across common publishing platforms.
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
                      <th className="py-3 px-3">Publishing Channel</th>
                      <th className="py-3 px-3">Recommended Limit</th>
                      <th className="py-3 px-3">Ideal Resolution</th>
                      <th className="py-3 px-3">Primary Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Email Newsletters / Attachments</td>
                      <td className="py-3 px-3 font-bold text-primary">&lt; 1024 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">1200 × 800 px</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Guaranteed inbox delivery</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Real Estate MLS Portals</td>
                      <td className="py-3 px-3 font-bold text-primary">&lt; 1 MB per photo</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">1920 × 1080 px</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Fast property gallery viewing</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Web CMS Hero Banners</td>
                      <td className="py-3 px-3 font-bold text-primary">500 KB – 1 MB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">2560 × 1440 px</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Top Core Web Vitals (LCP) score</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Digital Photo Printing (4x6)</td>
                      <td className="py-3 px-3 font-bold text-primary">800 KB – 1 MB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">1800 × 1200 px (300 DPI)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Crisp photographic prints</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>1024 KB Target:</strong> 1 Megabyte equals exactly 1024 Kilobytes. Kagazo calibrates the output to ~920–980 KB to guarantee it never breaches the 1MB ceiling.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress Image to 1 MB in 5 Steps
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
                Common 1 MB Optimization Pitfalls and How Kagazo Fixes Them
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
                  Frequently Asked Questions (1 MB Image Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical insights on high-resolution image compression and web performance.
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
                Related Compressors
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-image-exact-kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress to Exact KB
                </Link>
                <Link
                  href="/tools/compress-image-to-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 200KB
                </Link>
                <Link
                  href="/tools/compress-image-to-100kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 100KB
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
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
                Photos are compressed locally in device memory. High-resolution images are never stored or tracked.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
