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
  title: 'JPG to PNG Converter Online Free | Crisp Lossless Export | Kagazo',
  description:
    'Convert JPG images to high-quality PNG format online free. True lossless 24-bit RGB and 32-bit RGBA rasterization with zero compression artifacts and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/jpg-to-png',
  },
  openGraph: {
    title: 'JPG to PNG Converter Online Free | Kagazo',
    description:
      'Convert JPG to PNG format with pixel-perfect clarity, zero loss, and complete client-side security.',
    url: 'https://kagazo.in/tools/jpg-to-png',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const JPG_PNG_MATRIX = [
  {
    parameter: 'Compression Type',
    jpg: 'Lossy DCT compression',
    png: 'Lossless DEFLATE algorithm',
    benefit: 'PNG prevents generational artifact degradation on re-saves',
  },
  {
    parameter: 'Alpha Channel (Transparency)',
    jpg: 'Not supported (Always solid color)',
    png: 'Full 8-bit alpha transparency channel',
    benefit: 'PNG allows adding transparent cutouts and overlays',
  },
  {
    parameter: 'Text & Line Edge Crispness',
    jpg: 'Prone to ringing noise around high contrast edges',
    png: 'Razor-sharp pixel edges with zero ringing',
    benefit: 'Ideal for logos, screenshots, and typography graphics',
  },
  {
    parameter: 'Color Depth Support',
    jpg: '24-bit TrueColor (16.7 million colors)',
    png: '24-bit RGB or 32-bit RGBA (with alpha)',
    benefit: 'Universal rendering across modern graphic design software',
  },
];

const FAQS = [
  {
    question: 'Does converting JPG to PNG make the background transparent automatically?',
    answer:
      'No. Because JPEG files do not contain an alpha transparency channel, the background pixels (usually white or colored) are solid image data. Converting to PNG wraps that data in a PNG container. If you need to remove the background, use our dedicated Free Background Remover tool before exporting to PNG.',
  },
  {
    question: 'Why is the converted PNG file larger in size than the original JPG?',
    answer:
      'JPEG uses lossy compression that discards subtle color frequencies to achieve tiny file sizes. PNG is a lossless format (using the DEFLATE algorithm) designed to preserve every pixel exactly. As a result, saving uncompressed photographic data into a PNG container naturally increases file size.',
  },
  {
    question: 'When should I convert a JPG image to PNG format?',
    answer:
      'Convert to PNG when you plan to edit an image multiple times (to prevent generational JPEG compression artifacts), when you need to insert the graphic into vector design tools (Figma, Photoshop, Illustrator), or when preparing screenshots with sharp text and UI lines.',
  },
  {
    question: 'Can I convert multiple JPG photos to PNG at the same time?',
    answer:
      'Yes. Drag and drop multiple JPG files into Kagazo. Our engine processes your files concurrently in local device RAM and provides 1-click batch download options.',
  },
  {
    question: 'Will converting JPG to PNG improve the visual quality of a blurry photo?',
    answer:
      'Converting formats cannot recreate visual detail that was already discarded during original JPEG compression. However, PNG ensures that no further quality loss occurs during subsequent saves, edits, or transfers.',
  },
  {
    question: 'Does this converter strip EXIF camera metadata during conversion?',
    answer:
      'Yes, by default non-essential EXIF metadata is stripped to prevent unnecessary bloat, keeping your PNG output lean and protecting your location privacy.',
  },
  {
    question: 'Can I convert mobile camera photos and screenshots directly from my phone?',
    answer:
      'Yes. Kagazo runs smoothly inside mobile Safari, Chrome, and Samsung Internet. Select photos directly from your phone gallery for instant conversion.',
  },
  {
    question: 'Are my uploaded pictures stored on any remote cloud servers?',
    answer:
      'Never. Kagazo converts images 100% inside your browser’s volatile JavaScript memory. Your files never travel across external networks or touch any database.',
  },
  {
    question: 'Does Kagazo add any watermarks to converted PNG files?',
    answer:
      'No. All exported PNGs are 100% watermark-free, clean, and ready for commercial or personal use.',
  },
  {
    question: 'Is this JPG to PNG converter completely free?',
    answer:
      'Yes, 100% free forever with no account creation, no subscription plans, and no daily usage caps.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload JPG Photos',
    desc: 'Select or drag-and-drop your JPG/JPEG images from your computer or smartphone.',
  },
  {
    step: 2,
    title: 'Select PNG Output Format',
    desc: 'The engine sets PNG as target, ensuring lossless DEFLATE encoding for your assets.',
  },
  {
    step: 3,
    title: 'In-Memory Pixel Rasterization',
    desc: 'The browser decodes the JPEG bitstream and reconstructs 24-bit RGB pixel matrices in RAM.',
  },
  {
    step: 4,
    title: 'Inspect Quality & Details',
    desc: 'Review the live canvas preview to verify that contrast and colors match your source file perfectly.',
  },
  {
    step: 5,
    title: 'Download High-Clarity PNG',
    desc: 'Download your lossless PNG image instantly with zero watermarks or quality degradation.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Expecting Instant Transparency',
    title: 'Assuming JPG to PNG Removes Backgrounds',
    desc: 'JPGs have solid backgrounds. Converting to PNG preserves that solid background. Use our Background Remover first if you need transparent cutouts.',
  },
  {
    badge: 'Error: Surprise File Size Increase',
    title: 'Unavoidable Lossless Expansion',
    desc: 'PNG files are naturally 2x to 5x larger than JPGs because they do not discard data. This is normal and ensures zero generational loss.',
  },
  {
    badge: 'Error: Preserved Compression Artifacts',
    title: 'Expecting Low-Res JPGs to Magically Sharpen',
    desc: 'Converting formats cannot repair pre-existing compression blocks. Always use the highest resolution source JPG available.',
  },
  {
    badge: 'Error: Memory Exhaustion on 60MP Photos',
    title: 'Massive Raw Camera Files',
    desc: 'Decoding ultra-high-resolution files in older browsers can spike memory. Kagazo manages canvas buffers carefully to prevent tab crashes.',
  },
];

export default function JpgToPngPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'JPG to PNG Converter Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/jpg-to-png',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Convert JPG images to high-quality PNG format online free with lossless 24-bit rasterization and 100% in-browser privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert JPG to PNG Online in 5 Steps',
        description:
          'Step-by-step instructions to convert JPG photos to lossless PNG format.',
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
            name: 'JPG to PNG',
            item: 'https://kagazo.in/tools/jpg-to-png',
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
          <span className="text-primary font-bold">JPG to PNG</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>High-Fidelity Lossless Rasterization (JPG to PNG)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>JPG to PNG </span>
            <span className="text-primary">Converter Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert JPG photos to <strong>lossless PNG format</strong> online free. Eliminate compression degradation on future re-saves with true 24-bit color fidelity and 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine initialTargetFormat="png" />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Lossless Pixel Conversion
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Preventing Generational Quality Loss in Digital Editing
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Saving an image as JPEG repeatedly degrades quality with each export. Converting your source image to PNG locks pixels in a lossless container, ensuring your graphics remain crisp across future edits.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4" /> 24-Bit TrueColor
                  </span>
                  <p className="text-xs text-text-main/70">
                    Reconstructs full RGB color channels with zero bit-depth downsampling.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Design Software Ready
                  </span>
                  <p className="text-xs text-text-main/70">
                    Optimal format for importing into Photoshop, Canva, Figma, and vector software.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Rasterization executes in device RAM. No personal images are ever uploaded to cloud servers.
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
                    JPG vs. PNG Technical Specification Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Key architectural differences between lossy JPEG and lossless PNG formats.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Technical Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Parameter</th>
                      <th className="py-3 px-3">JPG / JPEG</th>
                      <th className="py-3 px-3">PNG</th>
                      <th className="py-3 px-3">Architectural Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {JPG_PNG_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.parameter}</td>
                        <td className="py-3 px-3 text-xs text-text-main/80">{row.jpg}</td>
                        <td className="py-3 px-3 font-medium text-emerald-700">{row.png}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Editing Tip:</strong> Always save master copies of your digital artwork and edited photos in PNG format to prevent lossy compression degradation during subsequent revisions.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Convert JPG to PNG in 5 Steps
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
                Common JPG to PNG Conversion Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (JPG to PNG Conversion)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Everything you need to know about lossless rasterization, file sizes, and color depth.
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
                  href="/tools/remove-background"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Remove Background
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
                Images are converted locally using browser WebAssembly. No files are ever uploaded or transmitted to external servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
