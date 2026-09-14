import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Sliders,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { UniversalImageCompressor } from '@/components/tools/UniversalImageCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress Image to Exact KB Online Free | Custom KB Target Compressor | Kagazo',
  description:
    'Compress any image to an exact custom KB size (e.g. 20 KB, 50 KB, 100 KB, 150 KB) online free. Precision binary search compression ensures strict portal compliance with zero watermark.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-image-exact-kb',
  },
  openGraph: {
    title: 'Compress Image to Exact KB Online Free | Kagazo',
    description:
      'Enter any exact target file size in KB and compress your image with byte-level accuracy.',
    url: 'https://kagazo.in/tools/compress-image-exact-kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How does the exact KB compressor hit precise file sizes?',
    answer:
      'Kagazo employs an iterative binary search compression engine running in local WebAssembly. By calculating the difference between current byte count and your target KB, it dynamically calibrates JPEG quantization matrices and chrominance tables until the output matches within 1–2% of your requested target size.',
  },
  {
    question: 'What happens if I choose a target KB that is too small for the image resolution?',
    answer:
      'If you request a 5 KB target for a high-resolution 4000x3000 photo, pure compression alone cannot reach the limit without extreme pixelation. Kagazo intelligently scales down the pixel dimensions proportionally to reach your exact KB limit while maintaining clean visual clarity.',
  },
  {
    question: 'Can I specify any arbitrary number of kilobytes (e.g., 37 KB or 125 KB)?',
    answer:
      'Yes! You can enter any custom integer value in kilobytes. Whether your application form specifies 30 KB, 75 KB, 150 KB, or 350 KB, Kagazo tunes the file to fit strictly within your boundary.',
  },
  {
    question: 'Does compressing to an exact KB alter the aspect ratio of the image?',
    answer:
      'Never. Kagazo strictly preserves the original geometric aspect ratio of your image. Your photos, signatures, and certificates will never appear stretched, squashed, or skewed.',
  },
  {
    question: 'Which image formats can I compress to exact KB?',
    answer:
      'You can upload JPG, PNG, WEBP, or HEIC files. The output is typically exported as a standards-compliant JPEG or WEBP to ensure maximum compression efficiency and compatibility with online portals.',
  },
  {
    question: 'How does Kagazo ensure the final file does not exceed the specified limit by even 1 KB?',
    answer:
      'Portal file validators reject anything even 1 byte over the limit (e.g., 50.1 KB is rejected on a 50 KB ceiling). Kagazo sets an internal safe ceiling at 97% of your target KB, ensuring that filesystem block size rounding never triggers an accidental rejection.',
  },
  {
    question: 'Can I use this tool for both photos and text-heavy document scans?',
    answer:
      'Yes. The engine automatically balances quantization tables depending on whether your image contains continuous photographic tones (faces, landscapes) or sharp contrast edges (signatures, text, marksheet numbers).',
  },
  {
    question: 'Are my documents or images uploaded to any remote server during exact KB calibration?',
    answer:
      'Never. 100% of the iterative compression loop executes inside your browser’s volatile JavaScript memory. Your files never travel across the network.',
  },
  {
    question: 'Is there any loss of metadata when compressing to exact KB?',
    answer:
      'Yes, non-essential EXIF metadata and thumbnails are stripped because they take up 50–500 KB of binary space. Stripping metadata allows the engine to dedicate almost all available bytes to visual image pixels.',
  },
  {
    question: 'Is the exact KB compressor completely free with unlimited downloads?',
    answer:
      'Yes, 100% free with no registration, no subscription fees, and no watermarks. Process as many files as you need.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Any Image File',
    desc: 'Select or drag-and-drop your photo, signature, or document scan (JPG, PNG, WEBP, HEIC supported).',
  },
  {
    step: 2,
    title: 'Enter Desired Target KB',
    desc: 'Type your exact target file size in kilobytes (e.g., 20, 50, 100, 150) or adjust using the precision slider.',
  },
  {
    step: 3,
    title: 'Precision Binary-Search Compression',
    desc: 'The engine iteratively calculates optimal quantization matrices to match your target file size in RAM.',
  },
  {
    step: 4,
    title: 'Real-Time Clarity Loupe Review',
    desc: 'Inspect the live preview with our interactive loupe to verify that clarity and exact KB metrics match your goal.',
  },
  {
    step: 5,
    title: 'Download Calibrated File',
    desc: 'Download your exact KB image instantly with zero watermarks, ready for guaranteed portal submission.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "File size exceeds portal limit by 1 KB"',
    title: 'Marginal Boundary Overflow',
    desc: 'Setting target to exactly 50 KB can result in 50.2 KB due to filesystem clusters. Kagazo targets 97% of target KB to prevent rejection.',
  },
  {
    badge: 'Error: Unrealistic Target Size vs Resolution',
    title: 'Demanding 5 KB for 40MP Images',
    desc: 'Shrinking 40 megapixels to 5 KB causes extreme degradation. Kagazo applies intelligent proportional downscaling to preserve readability.',
  },
  {
    badge: 'Error: Text Illegibility on Scanned Forms',
    title: 'Over-Compacted Text Documents',
    desc: 'Compressing text documents too low blurs roll numbers. Kagazo preserves stroke contrast so verification officers can inspect records.',
  },
  {
    badge: 'Error: Unsupported Format MIME Check',
    title: 'Uploading PNG to JPEG-Only Portals',
    desc: 'Many portals reject PNG files even if file size is compliant. Kagazo encodes compliant JFIF JPEG binaries for guaranteed portal acceptance.',
  },
];

export default function CompressImageExactKbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress Image to Exact KB Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-image-exact-kb',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Compress any image to custom exact KB size online free with precision binary search and zero watermark.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Image to Exact KB Online in 5 Steps',
        description:
          'Step-by-step instructions to compress any image to a custom exact KB target.',
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
            name: 'Compress Image to Exact KB',
            item: 'https://kagazo.in/tools/compress-image-exact-kb',
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
          <span className="text-primary font-bold">Compress Image to Exact KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Precision Target-Size Calibration Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress Image to </span>
            <span className="text-primary">Exact KB Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Enter any target file size in KB (e.g. 20 KB, 50 KB, 100 KB, 200 KB). Our precision binary-search engine locks your file to the exact byte limit with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalImageCompressor
              initialTargetKb={50}
              toolHeading="Compress Image to Custom Exact KB"
              toolSubheading="Enter any target file size in KB (e.g. 20 KB, 50 KB, 150 KB) for pixel-perfect binary calibration."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Custom Target Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Algorithmic Precision for Strict Application Requirements
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Different government, university, and employment portals enforce arbitrary file size ceilings. Kagazo lets you input any custom kilobyte target and hits it with precision.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Arbitrary Target KB
                  </span>
                  <p className="text-xs text-text-main/70">
                    Input any target between 5 KB and 5000 KB for custom upload portal compliance.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Zero Margin Overflow
                  </span>
                  <p className="text-xs text-text-main/70">
                    Calculates safe byte margins so your file never overshoots your limit by even 1 byte.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Iterative compression runs in client-side RAM. Sensitive files are never uploaded.
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
                    Target KB vs. Resolution &amp; Quality Calibration Guide
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Optimal target sizes and visual quality expectations across document types.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Target Guidelines
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Target Size Range</th>
                      <th className="py-3 px-3">Best Suited For</th>
                      <th className="py-3 px-3">Expected Quality</th>
                      <th className="py-3 px-3">Typical Dimensions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">10 KB – 20 KB</td>
                      <td className="py-3 px-3">Signatures &amp; Thumbprints</td>
                      <td className="py-3 px-3 font-bold text-primary">High (Contrast boosted)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">140×60 px to 400×200 px</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">20 KB – 50 KB</td>
                      <td className="py-3 px-3">Passport &amp; ID Photos</td>
                      <td className="py-3 px-3 font-bold text-primary">Very High (Clear facial features)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">3.5 × 4.5 cm (300×400 px)</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">50 KB – 100 KB</td>
                      <td className="py-3 px-3">Resume Headshots &amp; Avatars</td>
                      <td className="py-3 px-3 font-bold text-primary">Excellent (Studio portrait look)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">400×400 px to 600×600 px</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">100 KB – 200 KB</td>
                      <td className="py-3 px-3">Marksheets &amp; Certificates</td>
                      <td className="py-3 px-3 font-bold text-primary">Sharp (Legible small text)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">A4 Document at 150–200 DPI</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Precision Advice:</strong> Enter a target KB approximately 3–5% below your portal maximum (e.g., enter 48 KB for a 50 KB limit) to ensure safe acceptance across all server operating systems.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress Image to Exact KB in 5 Steps
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
                Common Exact KB Pitfalls and How Kagazo Fixes Them
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
                  Frequently Asked Questions (Exact KB Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Precision file size targeting, algorithmic calibration, and quality control.
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
                  href="/tools/compress-image-to-20kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 20KB
                </Link>
                <Link
                  href="/tools/compress-image-to-50kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 50KB
                </Link>
                <Link
                  href="/tools/compress-image-to-100kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 100KB
                </Link>
                <Link
                  href="/tools/compress-image-to-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 200KB
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
                Exact KB tuning is calculated entirely in browser volatile RAM. No images are ever uploaded or stored.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
