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
  Code2,
  CheckCircle2,
  FileImage,
  Download,
} from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter Online Free - Lossless & Crisp | Kagazo',
  description:
    'Convert JPG/JPEG images to high-resolution lossless PNG format online for free. In-browser client privacy, alpha transparency preparation, and instant batch download with zero watermarks.',
  alternates: {
    canonical: 'https://kagazo.in/tools/jpg-to-png',
  },
  openGraph: {
    title: 'JPG to PNG Converter Online Free - Lossless & Crisp | Kagazo',
    description:
      'Convert JPG images to uncompressed lossless 24-bit PNG format with 100% in-browser RAM privacy.',
    url: 'https://kagazo.in/tools/jpg-to-png',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPG to PNG Converter Online Free | Kagazo',
    description:
      'Convert JPG/JPEG to lossless PNG in browser RAM with crystal-clear edges and zero compression generation loss.',
  },
};

const FORMAT_COMPARISON = [
  {
    feature: 'Compression Algorithm',
    jpg: 'Lossy DCT (Discrete Cosine Transform)',
    png: 'Lossless DEFLATE (LZ77 + Huffman coding)',
    advantage: 'PNG prevents degradation upon multiple re-saves',
  },
  {
    feature: 'Alpha Transparency',
    jpg: 'Not Supported (Strictly solid background)',
    png: 'Supported (8-bit alpha channel, 256 levels of opacity)',
    advantage: 'PNG allows background removal and transparent overlays',
  },
  {
    feature: 'Edge Sharpness',
    jpg: 'Prone to high-contrast mosquito noise & ringing',
    png: 'Pixel-perfect razor sharpness for text and logos',
    advantage: 'Ideal for line art, screenshots, and text signatures',
  },
  {
    feature: 'Color Depth',
    jpg: '24-bit Truecolor (16.7M colors, 8-bit per channel)',
    png: 'Up to 48-bit Truecolor with 16-bit alpha channel',
    advantage: 'Broader gradient fidelity without banding',
  },
  {
    feature: 'Generation Loss',
    jpg: 'Loses visual data every time file is edited & re-saved',
    png: 'Zero generation loss; exact pixel values preserved forever',
    advantage: 'The standard master format for graphic design & archiving',
  },
];

const FAQS = [
  {
    question: 'Does converting JPG to PNG improve the image quality?',
    answer:
      'Converting an existing JPG to PNG will not restore details already discarded by lossy JPEG compression. However, saving the file as a lossless PNG freezes the image state permanently, preventing further generation loss, compression ringing, and block artifacts whenever you crop, edit, or re-save the file in graphic design software.',
  },
  {
    question: 'Why does a converted PNG file often have a larger file size than the original JPG?',
    answer:
      'PNG uses lossless compression (DEFLATE / LZ77) which stores exact mathematical pixel values without discarding high-frequency color variations. In contrast, JPG achieves smaller file sizes by discarding subtle color data that the human eye is less sensitive to via chroma subsampling (4:2:0). The larger PNG size guarantees 100% fidelity without compression artifacts.',
  },
  {
    question: 'Can I add a transparent background after converting JPG to PNG?',
    answer:
      'Yes! Since the standard JPEG format does not support an alpha transparency channel, converting to PNG is the essential first step before removing backgrounds. Once converted to PNG, you can use our Background Remover tool or any image editor to make the background completely transparent.',
  },
  {
    question: 'Are my converted images stored on Kagazo servers?',
    answer:
      'No. Kagazo processes all image decodes, canvas pixel rendering, and PNG encoding strictly inside your browser’s volatile RAM memory. No photos are ever uploaded to cloud servers, databases, or external storage buckets, ensuring complete citizen privacy.',
  },
  {
    question: 'Can I batch convert multiple JPG images into PNG at once?',
    answer:
      'Yes. You can drag and drop multiple JPG or JPEG files simultaneously. The engine converts each image in parallel and allows you to download them individually or as a single structured ZIP archive with one click.',
  },
];

export default function JpgToPngPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo JPG to PNG Converter Online Free',
        url: 'https://kagazo.in/tools/jpg-to-png',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Convert JPG images to high-resolution lossless PNG format with batch processing and in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert JPG Images to Lossless PNG Format',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload JPG Images',
            text: 'Drag and drop one or more JPG/JPEG images into the converter workspace.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic Lossless Encoding',
            text: 'The in-browser engine decodes the JPEG stream and reconstructs exact pixel matrices into uncompressed 24-bit PNG format.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download PNG Files',
            text: 'Download individual lossless PNG files or export all converted graphics in a single ZIP bundle.',
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
            name: 'JPG to PNG Converter',
            item: 'https://kagazo.in/tools/jpg-to-png',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
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
          <span className="text-primary font-bold">JPG to PNG</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Lossless 24-Bit PNG Image Converter</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>JPG to PNG Converter </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert compressed JPG and JPEG files to crisp, uncompressed 24-bit PNG format. Halt compression generation loss, prepare images for transparency editing, and enjoy 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Zero Generation Loss
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Download className="w-4 h-4 text-primary" /> Batch Multi-File Support
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine
              initialSourceFormat="jpg"
              initialTargetFormat="png"
              fixedTargetFormat={true}
              toolHeading="Convert JPG to Lossless PNG"
              toolSubheading="Upload JPG or JPEG images to reconstruct exact uncompressed pixel matrices in PNG format."
            />

            {/* Post-Download Native Sponsor AdSlot */}
            <AdSlot slot="post_download" />

            {/* JPG vs PNG Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileImage className="w-5 h-5 text-primary" />
                  JPG vs PNG Technical Architecture Comparison
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Key architectural distinctions between DCT lossy compression and DEFLATE lossless archiving.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Feature</th>
                      <th className="p-3.5">JPEG / JPG Format</th>
                      <th className="p-3.5">PNG Format</th>
                      <th className="p-3.5">Conversion Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    {FORMAT_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/30 transition-colors">
                        <td className="p-3.5 font-bold text-text-main">{row.feature}</td>
                        <td className="p-3.5 text-text-main/70">{row.jpg}</td>
                        <td className="p-3.5 font-mono text-primary font-bold">{row.png}</td>
                        <td className="p-3.5 text-emerald-700 font-semibold">{row.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Why Convert JPG to PNG Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-600" />
                Key Benefits of Converting JPG to PNG
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    0%
                  </div>
                  <h3 className="text-sm font-bold text-text-main">Halt Generation Loss</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    JPG re-compresses and degrades every time you save. PNG freezes pixel data losslessly for repeated editing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                    TXT
                  </div>
                  <h3 className="text-sm font-bold text-text-main">Clean Text &amp; Signatures</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Eliminates the fuzzy &quot;mosquito noise&quot; halo that surrounds high-contrast text and signature strokes in JPEG files.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center text-primary font-bold text-sm">
                    PNG
                  </div>
                  <h3 className="text-sm font-bold text-text-main">Alpha Channel Ready</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Unlocks 8-bit alpha transparency support, enabling background cutout for logos, stickers, and product photos.
                  </p>
                </div>
              </div>
            </section>

            {/* Deep FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-bold text-text-main">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                    <h3 className="font-bold text-text-main text-sm flex items-start gap-2">
                      <span className="text-primary font-extrabold">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-text-main/80 leading-relaxed pl-5">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Converters</span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/png-to-jpg"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to JPG Converter
                </Link>
                <Link
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP Converter
                </Link>
                <Link
                  href="/tools/webp-to-png"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  WebP to PNG Converter
                </Link>
                <Link
                  href="/tools/png-to-ico"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to Favicon ICO
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer Studio
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
