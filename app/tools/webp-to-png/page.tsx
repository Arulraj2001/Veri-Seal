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
  Monitor,
  Layers,
  Archive,
} from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'WebP to PNG Converter Online Free - Unpack & Keep Transparency | Kagazo',
  description:
    'Convert WebP images to universal lossless PNG format online for free. Retain full alpha transparency, unlock web photos for Photoshop, InDesign, and Word, with 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/webp-to-png',
  },
  openGraph: {
    title: 'WebP to PNG Converter Online Free | Kagazo',
    description:
      'Convert WebP to PNG format with full transparency preservation and zero server uploads. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/webp-to-png',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebP to PNG Converter Online Free | Kagazo',
    description:
      'Instantly unpack Google WebP graphics into standard transparent PNGs compatible with all legacy editors and desktop apps.',
  },
};

const FORMAT_COMPARISON = [
  {
    feature: 'Legacy App Compatibility',
    webp: 'Unsupported by legacy Adobe Photoshop, Word 2013, older CAD',
    png: 'Universally supported by 100% of graphic design & office software',
    advantage: 'PNG opens instantly in any desktop software or mobile viewer',
  },
  {
    feature: 'Transparency Channel',
    webp: 'VP8/VP8L alpha channel',
    png: 'Standard 8-bit / 16-bit RGBA alpha channel',
    advantage: 'Pixel-perfect transparent overlay compatibility in editing apps',
  },
  {
    feature: 'Color Bit Depth',
    webp: '8-bit per channel color representation',
    png: 'Supports up to 16-bit per channel (48-bit color depth)',
    advantage: 'Ideal master format for photo manipulation and layering',
  },
  {
    feature: 'Editing Degradation',
    webp: 'Lossy WebP degrades further upon repeated modifications',
    png: 'True lossless storage; pixels never degrade across re-saves',
    advantage: 'Freezes visual quality permanently during creative workflows',
  },
  {
    feature: 'Print Reproduction',
    webp: 'Incompatible with standard CMYK prepress software',
    png: 'Easily mapped and converted for digital printing and brochures',
    advantage: 'Ready for print publishing without format rejection errors',
  },
];

const FAQS = [
  {
    question: 'Why do older image editors and desktop apps fail to open WebP files?',
    answer:
      'WebP is a relatively modern format developed by Google that requires dedicated VP8/VP8L codec decoders. Legacy software packages—such as Adobe Photoshop CS6, Microsoft Office 2013, older versions of CorelDraw, and default Windows Photo Viewer—lack native WebP decoding libraries. Converting your downloaded WebP images to PNG restores 100% compatibility across all operating systems and creative suites.',
  },
  {
    question: 'Does converting WebP back to PNG restore original photo quality?',
    answer:
      'If the original WebP image was encoded using lossy compression, converting it to PNG will not magically restore high-frequency details discarded during that lossy step. However, saving the decompressed pixel matrix into PNG freezes the graphic permanently, preventing any subsequent compression loss when you edit, crop, annotate, or export the artwork.',
  },
  {
    question: 'Will converting WebP to PNG preserve transparent backgrounds?',
    answer:
      'Yes, absolutely. The conversion process preserves every pixel’s 8-bit alpha transparency channel. Cutouts, logos, icons, and transparent UI components maintain their exact transparent backgrounds without unwanted solid white or black borders.',
  },
  {
    question: 'Why does the converted PNG file often have a larger file size than the WebP?',
    answer:
      'WebP utilizes advanced intra-frame predictive compression that minimizes byte counts for web transmission. PNG uses standard DEFLATE compression to store complete, un-quantized pixel structures for lossless reproduction. The resulting larger file size is completely normal and ensures maximum editing fidelity across graphic design applications.',
  },
  {
    question: 'Are my converted images uploaded to Kagazo servers or stored anywhere?',
    answer:
      'No. All decoding and re-encoding procedures happen strictly within your local browser’s volatile memory (RAM) via HTML5 Canvas APIs. Zero image files or metadata are ever transmitted over the network or stored in databases, ensuring absolute confidentiality for confidential documents and proprietary graphics.',
  },
];

export default function WebpToPngPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo WebP to PNG Converter Online Free',
        url: 'https://kagazo.in/tools/webp-to-png',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Convert WebP images to universal lossless PNG format with transparency preservation, batch processing, and in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert WebP to PNG Online for Free',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload WebP Images',
            text: 'Drag and drop WebP images directly into the converter workspace.',
          },
          {
            '@type': 'HowToStep',
            name: 'Decompress to Lossless PNG',
            text: 'The browser decodes WebP frames into uncompressed RGBA pixel buffers and compiles clean PNG binaries.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download PNG Files',
            text: 'Download individual converted PNG files or export all images in a single ZIP package.',
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
            name: 'WebP to PNG Converter',
            item: 'https://kagazo.in/tools/webp-to-png',
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
          <span className="text-primary font-bold">WebP to PNG</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Lossless WebP to PNG Extraction</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            WebP to PNG Converter Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Unpack downloaded WebP graphics into standard lossless PNG format. Compatible with Photoshop, desktop image viewers, Word documents, and print software with 100% alpha transparency.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Layers className="w-4 h-4 text-primary" /> Alpha Transparency Preserved
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Monitor className="w-4 h-4 text-primary" /> Universal Software Compatibility
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine
              initialSourceFormat="webp"
              initialTargetFormat="png"
              fixedTargetFormat={true}
              toolHeading="Convert WebP to PNG"
              toolSubheading="Upload WebP images to convert to lossless transparent PNG format."
            />

            <AdSlot slot="post_download" />

            {/* Technical Specification Matrix */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                  Format Comparison: WebP vs Lossless PNG
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Understanding why unpacking WebP images into PNG is essential for creative editing and publishing.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/60">
                      <th className="py-3 px-4 font-bold text-text-main">Feature / Parameter</th>
                      <th className="py-3 px-4 font-bold text-text-main">WebP (Web Format)</th>
                      <th className="py-3 px-4 font-bold text-primary">PNG (Production Format)</th>
                      <th className="py-3 px-4 font-bold text-emerald-700">Conversion Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {FORMAT_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-text-main">{row.feature}</td>
                        <td className="py-3.5 px-4 text-text-main/80">{row.webp}</td>
                        <td className="py-3.5 px-4 font-medium text-primary">{row.png}</td>
                        <td className="py-3.5 px-4 text-emerald-700 font-medium">{row.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Software Compatibility & Workflow Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  Everywhere You Can Use Converted PNG Files
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Solve format incompatibility across popular desktop editors and publishing tools.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🎨 Adobe Creative Cloud</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Open graphics directly in Photoshop, Illustrator, and InDesign without missing plugin errors or color cast discrepancies.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">📄 Microsoft Office Suite</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Embed clean transparent logos and screenshots seamlessly into PowerPoint presentations, Word documents, and Excel sheets.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🖨️ Print &amp; Prepress</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Prepare digital assets for print shops, merchandise mockups, and corporate marketing collateral with zero compression noise.
                  </p>
                </div>
              </div>
            </section>

            {/* 3-Step Workflow */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-primary" />
                  3 Quick Steps to Convert WebP to PNG Online
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Instant client-side decoding with zero upload wait times.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Select WebP Files</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Drag and drop single or multiple WebP files directly into the converter.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Lossless Decompression</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    The engine unpacks the image raster buffer with 100% alpha transparency preservation.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Download PNGs or ZIP</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download each converted PNG individually or export all files as a single ZIP archive.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions About WebP to PNG
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Clear answers about software compatibility, file sizes, and transparency retention.
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
                <Link href="/tools/png-to-webp" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  PNG to WebP
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
                Images are converted directly inside your browser memory. No photos are ever uploaded to any cloud server.
              </p>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
