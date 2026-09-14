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
} from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PNG to JPG Converter Online Free - Pure White Matte & Fast | Kagazo',
  description:
    'Convert PNG images to high-quality JPG format online for free. Automatic pure white background matte leveling, adjustable compression quality, batch processing, and 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/png-to-jpg',
  },
  openGraph: {
    title: 'PNG to JPG Converter Online Free - Pure White Matte & Fast | Kagazo',
    description:
      'Convert PNG to JPG instantly with automatic transparent-to-white background handling, custom quality control, and zero server uploads.',
    url: 'https://kagazo.in/tools/png-to-jpg',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNG to JPG Converter Online Free | Kagazo',
    description:
      'Convert PNG graphics and photos to optimized JPG format with clean alpha flattening and instant batch export.',
  },
};

const FORMAT_COMPARISON = [
  {
    feature: 'Compression Type',
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
    jpg: 'Extremely lightweight and web-optimized',
    advantage: 'JPG dramatically speeds up web page load times & email attachments',
  },
  {
    feature: 'Color Encoding',
    png: 'RGB / RGBA up to 48-bit color depth',
    jpg: 'YCbCr with configurable chroma subsampling (4:2:0)',
    advantage: 'High perceptual quality with minimal storage footprint',
  },
  {
    feature: 'Portal Compatibility',
    png: 'Often rejected by government & exam portals (SSC, UPSC, TNPSC)',
    jpg: 'Universally accepted standard across all official systems',
    advantage: 'Guaranteed 100% submission compliance for official forms',
  },
];

const FAQS = [
  {
    question: 'Why does my transparent PNG get a white background when converted to JPG?',
    answer:
      'The international JPEG standard does not possess an alpha transparency channel; every pixel in a JPEG must contain explicit color data. When converting transparent or semi-transparent PNG images, Kagazo automatically paints a clean, high-contrast pure white (#FFFFFF) background matte beneath your artwork. This prevents the ugly black borders or corrupted dark boxes that inferior converters produce.',
  },
  {
    question: 'Will converting PNG to JPG decrease the file size of my image?',
    answer:
      'Yes, in the vast majority of photographic and complex graphic cases, converting from PNG to JPG will reduce your file size by 50% to 85%. While PNG stores pixel-by-pixel mathematical data without discarding any nuance, JPG uses lossy Discrete Cosine Transform compression to eliminate color frequencies invisible to the human eye, resulting in a drastically lighter file that uploads swiftly.',
  },
  {
    question: 'Can I choose the output quality of the converted JPG file?',
    answer:
      'Yes! Kagazo provides an interactive quality slider ranging from 10% to 100%. For standard digital use, website banners, and email attachments, a quality setting of 80% to 90% offers the sweet spot between tiny file size and crisp visual fidelity. If you are submitting photographs to government portals with strict maximum KB limits, you can lower the quality to meet exact thresholds.',
  },
  {
    question: 'Are my converted photos stored on Kagazo servers or databases?',
    answer:
      'No. Kagazo operates with complete sovereign client privacy. All file reading, canvas pixel rendering, alpha blending, and JPEG compression occur entirely inside your web browser’s volatile RAM memory. Your images are never uploaded to any remote server, saved to cloud storage, or tracked across sessions.',
  },
  {
    question: 'Can I batch convert multiple PNG files into JPG at the same time?',
    answer:
      'Yes. You can drag and drop dozens of PNG images simultaneously into the conversion workspace. Kagazo processes each image concurrently on background threads and lets you download individual JPG images or export the entire set in a single organized ZIP archive with one click.',
  },
];

export default function PngToJpgPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo PNG to JPG Converter Online Free',
        url: 'https://kagazo.in/tools/png-to-jpg',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Convert PNG images to high-quality JPG format with white background leveling, custom compression, and in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PNG Images to JPG Online for Free',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload PNG Images',
            text: 'Drag and drop one or multiple PNG graphics or photos into the conversion canvas.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic White Matte Flattening',
            text: 'The engine parses alpha channels and composites transparent regions onto clean #FFFFFF white.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download JPG Files',
            text: 'Download individual converted JPG files or download all files packaged in a single ZIP file.',
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
            name: 'PNG to JPG Converter',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">PNG to JPG</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>High-Fidelity PNG to JPEG Converter</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            PNG to JPG Converter Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert PNG graphics to lightweight, high-compatibility JPG images. Automatically blends transparent alpha channels onto a crisp pure white background with custom compression controls.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Palette className="w-4 h-4 text-primary" /> Automatic White Matte Fill
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant Batch ZIP Download
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine
              initialSourceFormat="png"
              initialTargetFormat="jpg"
              fixedTargetFormat={true}
              toolHeading="Convert PNG to JPG"
              toolSubheading="Upload transparent or solid PNG files to convert to standard JPG format."
            />

            <AdSlot slot="post_download" />

            {/* Technical Format Comparison Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                  Technical Comparison: PNG vs JPG Format Specifications
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed architectural differences between lossy JPEG and lossless PNG image encoding.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/60">
                      <th className="py-3 px-4 font-bold text-text-main">Feature / Parameter</th>
                      <th className="py-3 px-4 font-bold text-text-main">PNG (Source)</th>
                      <th className="py-3 px-4 font-bold text-primary">JPG / JPEG (Output)</th>
                      <th className="py-3 px-4 font-bold text-emerald-700">Conversion Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {FORMAT_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-text-main">{row.feature}</td>
                        <td className="py-3.5 px-4 text-text-main/80">{row.png}</td>
                        <td className="py-3.5 px-4 font-medium text-primary">{row.jpg}</td>
                        <td className="py-3.5 px-4 text-emerald-700 font-medium">{row.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Educational Alpha Flattening & Quality Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  How Kagazo Solves Transparent PNG to JPG Conversion
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Preventing black artifacts through automated 2D HTML5 canvas alpha compositing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">1</span>
                  <h3 className="font-bold text-sm text-text-main">White Canvas Layering</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Prior to drawing your PNG, the engine initializes an offscreen HTML5 canvas flood-filled with pure RGB(255, 255, 255).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">2</span>
                  <h3 className="font-bold text-sm text-text-main">Alpha Pixel Blending</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Semi-transparent drop shadows and anti-aliased edge pixels blend naturally into the white background with zero jagged halos.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">3</span>
                  <h3 className="font-bold text-sm text-text-main">Quantized JPEG Export</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    The composited image is encoded into standard JFIF/JPEG binary streams with optimal Huffman tables for lightning-fast delivery.
                  </p>
                </div>
              </div>
            </section>

            {/* How-To Walkthrough */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-primary" />
                  3 Simple Steps to Convert PNG to JPG Online
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Fast, browser-native conversion workflow with zero registration required.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Upload PNG Files</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Drop PNG images from your computer, tablet, or smartphone directly into the upload area.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Adjust Quality Slider</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Fine-tune the output compression quality percentage to match your target file size or visual requirement.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Instant JPG Export</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Click download to save single files or grab all converted images in one bundled ZIP archive.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions About PNG to JPG Conversion
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Everything you need to know about format compatibility, transparency handling, and compression artifacts.
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
                <Link href="/tools/jpg-to-png" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  JPG to PNG
                </Link>
                <Link href="/tools/png-to-webp" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  PNG to WebP
                </Link>
                <Link href="/tools/png-to-ico" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  PNG to Favicon ICO
                </Link>
                <Link href="/tools/image-optimizer" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  Image Optimizer
                </Link>
                <Link href="/tools/compress-image-to-50kb" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  Compress Image to 50KB
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Client Privacy Guarantee</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Images are converted directly in your browser memory. No photos are ever uploaded to any cloud server.
              </p>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
