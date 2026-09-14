import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Smartphone,
  CheckCircle2,
  FileCheck,
  Award,
  Layers,
  Sliders,
  Sparkles,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { HeicConverterEngine } from '@/components/tools/HeicConverterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free HEIC to JPG Converter Online | Convert iPhone Photos | Kagazo',
  description:
    'Convert iPhone HEIC photos to JPG format online free. Batch convert Apple high-efficiency images in your browser with zero cloud uploads, original EXIF retention, and 100% privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/heic-to-jpg',
  },
  openGraph: {
    title: 'Free HEIC to JPG Converter Online | Kagazo',
    description:
      'Convert Apple HEIC photos to universal JPG format in your browser. 100% private, zero server uploads.',
    url: 'https://kagazo.in/tools/heic-to-jpg',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why does my iPhone take photos in HEIC format instead of JPG?',
    answer:
      'Apple adopted High Efficiency Image Coding (HEIC/HEIF) in iOS 11 because it uses modern H.265 (HEVC) compression algorithms. HEIC compresses images to roughly half the file size of an equivalent JPEG while supporting 16-bit color depth, saving significant storage space on iPhones and iPads.',
  },
  {
    question: 'Why do government portals and Windows PCs reject HEIC photos?',
    answer:
      'Most recruitment portals, university admission forms, and legacy Windows software only recognize the decades-old JPEG standard. They lack internal HEVC decoder licenses and reject `.heic` extensions immediately with "Invalid file format" errors.',
  },
  {
    question: 'How does Kagazo convert HEIC photos without uploading them to cloud servers?',
    answer:
      'Kagazo embeds a high-performance WebAssembly (Wasm) libheif decoder directly inside your web browser. When you drop an image into the tool, your device’s local CPU decodes the HEVC bitstream and re-encodes it into standard JPEG in local RAM with zero network latency.',
  },
  {
    question: 'Does this converter preserve my photo capture date and camera settings?',
    answer:
      'Yes. Kagazo extracts the original EXIF metadata block—including shutter speed, ISO, aperture, focal length, and timestamp—and embeds it cleanly into the newly generated JPEG JFIF segment.',
  },
  {
    question: 'Can I convert multiple HEIC photos at the same time in batch?',
    answer:
      'Yes. You can select multiple HEIC files simultaneously. The tool will process them in parallel in your browser and provide individual download buttons or a unified download option.',
  },
  {
    question: 'Will converting HEIC to JPG decrease the visual sharpness of my photos?',
    answer:
      'No perceptible difference. Kagazo exports JPEGs at a high 92–95% quality profile with 4:4:4 chroma sampling, ensuring skin tones, landscape colors, and fine facial details remain sharp.',
  },
  {
    question: 'How does Kagazo handle Apple Display P3 wide color gamut photos?',
    answer:
      'iPhone cameras capture in wide Display P3 color. If converted incorrectly, photos look dull on standard monitors. Kagazo maps the color profile accurately into standard sRGB, ensuring colors pop naturally across all screens.',
  },
  {
    question: 'Do I need to install any software or pay for Windows HEVC video extensions?',
    answer:
      'None! Microsoft charges $0.99 for the HEVC video extension on Windows 10/11. Kagazo is 100% free, runs directly in your web browser, and requires zero software installation.',
  },
  {
    question: 'Are my personal iPhone photos safe from cloud leaks?',
    answer:
      'Yes, 100%. All decoding and transcoding happen entirely inside your local device RAM. Your photos never travel across the internet or touch any server database.',
  },
  {
    question: 'Is this HEIC to JPG converter completely free?',
    answer:
      'Yes. Kagazo offers unlimited free conversions with zero watermarks, no account registration, and no file size paywalls.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload iPhone HEIC Photos',
    desc: 'Drag and drop your .heic or .heif photos directly from your iPhone, Mac, or PC into the uploader.',
  },
  {
    step: 2,
    title: 'Instant WebAssembly Decoding',
    desc: 'The in-browser Wasm engine extracts the raw HEVC image frames in volatile device memory.',
  },
  {
    step: 3,
    title: 'Color & EXIF Normalization',
    desc: 'The tool maps Apple Display P3 colors to universal sRGB while retaining original camera timestamps.',
  },
  {
    step: 4,
    title: 'High-Fidelity JPEG Encoding',
    desc: 'Frames are re-encoded into standards-compliant JPEG files optimized for portal and print compatibility.',
  },
  {
    step: 5,
    title: 'Download Universal JPG',
    desc: 'Download your converted JPEG files instantly with zero watermarks, ready for any portal or application.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "Unsupported file extension (.heic)"',
    title: 'Application Portal Rejection',
    desc: 'Government and bank portals fail to open HEIC files. Kagazo converts your iPhone snapshots into universal standard JPEGs that upload effortlessly.',
  },
  {
    badge: 'Error: Dull / Washed Out Colors on Windows',
    title: 'Display P3 to sRGB Color Mismatch',
    desc: 'Apple uses wide Display P3 color gamut. Basic converters fail to translate color profiles. Kagazo accurately preserves vibrant contrast in sRGB.',
  },
  {
    badge: 'Error: Lost Photo Timestamps & Dates',
    title: 'Stripped EXIF Metadata During Conversion',
    desc: 'Many web converters wipe photo capture dates. Kagazo preserves your original camera EXIF tags so photo timelines stay intact.',
  },
  {
    badge: 'Error: Paid Windows Extension Prompts',
    title: 'Microsoft Store $0.99 HEVC Paywall',
    desc: 'Windows 10/11 defaults to prompting for paid codec extensions. Kagazo decodes HEIC for free inside your browser without extra downloads.',
  },
];

export default function HeicToJpgPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Free HEIC to JPG Converter Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/heic-to-jpg',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Convert Apple iPhone HEIC photos to universal JPG format in browser with zero server uploads and 100% privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert HEIC to JPG Online in 5 Steps',
        description:
          'Step-by-step instructions to convert iPhone HEIC photos to JPG format.',
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
            name: 'HEIC to JPG',
            item: 'https://kagazo.in/tools/heic-to-jpg',
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
          <span className="text-primary font-bold">HEIC to JPG</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Apple High-Efficiency Image Converter (HEIC to JPEG)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free HEIC to </span>
            <span className="text-primary">JPG Converter Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert iPhone HEIC photos to universal <strong>JPG format</strong> online free. Zero cloud uploads, original EXIF retention, sRGB color accuracy, and 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HeicConverterEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Local Transcoding Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Convert Apple HEIC Photos in Volatile RAM Without Server Uploads
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                iPhone camera photos in HEIC format cannot be uploaded to most government or corporate portals. Kagazo runs a compiled WebAssembly decoder locally on your computer or phone to convert images instantly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> Native iPhone Support
                  </span>
                  <p className="text-xs text-text-main/70">
                    Directly decodes .heic and .heif photos captured on all iOS devices from iPhone 7 to iPhone 16.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4" /> Full EXIF Preservation
                  </span>
                  <p className="text-xs text-text-main/70">
                    Transfers camera timestamps, orientation, and exposure metadata cleanly into the output JPEG.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    No private photos are sent over the network. Conversion executes purely in device memory.
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
                    Apple HEIC vs. Standard JPEG Format Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Comparison of compression efficiency, compatibility, and application support.
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
                      <th className="py-3 px-3">Feature / Parameter</th>
                      <th className="py-3 px-3">Apple HEIC (HEIF)</th>
                      <th className="py-3 px-3">Standard JPEG (JPG)</th>
                      <th className="py-3 px-3">Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Universal Compatibility</td>
                      <td className="py-3 px-3 text-rose-600 font-medium">Limited (Apple ecosystem)</td>
                      <td className="py-3 px-3 font-bold text-emerald-700">100% Universal</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">JPG works on all portals &amp; OS</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Compression Standard</td>
                      <td className="py-3 px-3 font-mono text-xs text-primary font-bold">HEVC / H.265</td>
                      <td className="py-3 px-3 font-mono text-xs text-amber-700">Discrete Cosine (DCT)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">HEIC is 50% smaller on disk</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Color Bit Depth</td>
                      <td className="py-3 px-3 font-medium text-text-main">Up to 16-bit color</td>
                      <td className="py-3 px-3 font-medium text-text-main">8-bit color per channel</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">JPG standardizes web colors</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Government Portal Acceptance</td>
                      <td className="py-3 px-3 text-rose-600 font-bold">0% (Strictly rejected)</td>
                      <td className="py-3 px-3 font-bold text-emerald-700">100% Mandatory</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Conversion required for exam forms</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Online Submission Notice:</strong> Do not simply rename a `.heic` file to `.jpg`. Portals read internal binary magic bytes and will reject renamed files. Always use a genuine transcoder like Kagazo.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Convert HEIC to JPG in 5 Steps
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
                Common HEIC Conversion Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (HEIC to JPG Conversion)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive answers on iPhone photography, HEIC decoding, and cross-platform compatibility.
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
                  href="/tools/compress-image-to-50kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 50KB
                </Link>
                <Link
                  href="/tools/jpg-to-png"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JPG to PNG Converter
                </Link>
                <Link
                  href="/tools/change-image-dpi"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Change Image DPI
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
                Photos are decoded locally using client-side WebAssembly. No personal iPhone images are ever stored or uploaded.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
