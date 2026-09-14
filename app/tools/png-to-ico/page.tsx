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
  title: 'PNG to ICO Converter Online Free | Multi-Size Favicon Maker | Kagazo',
  description:
    'Convert PNG images to ICO favicon format online free. Pack multi-resolution frames (16x16, 32x32, 48x48) with full alpha transparency for websites and Windows apps.',
  alternates: {
    canonical: 'https://kagazo.in/tools/png-to-ico',
  },
  openGraph: {
    title: 'PNG to ICO Converter Online Free | Kagazo',
    description:
      'Generate multi-size Windows and website favicon.ico files from PNG images with zero cloud uploads.',
    url: 'https://kagazo.in/tools/png-to-ico',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const ICO_RESOLUTION_MATRIX = [
  {
    dimensions: '16 × 16 px',
    useCase: 'Browser Tab Favicon & Bookmark Lists',
    significance: 'Standard micro-icon visible on web browser tabs',
  },
  {
    dimensions: '32 × 32 px',
    useCase: 'Browser Shortcut / Windows Taskbar',
    significance: 'High-DPI browser tabs and desktop shortcut pin menus',
  },
  {
    dimensions: '48 × 48 px',
    useCase: 'Windows Desktop Icon View',
    significance: 'Standard desktop icon view on Windows 10 and 11',
  },
  {
    dimensions: '64 × 64 to 256 × 256 px',
    useCase: 'High-DPI Retina & Large Desktop Icons',
    significance: 'Extra-large desktop icons and Windows Explorer previews',
  },
];

const FAQS = [
  {
    question: 'What is an ICO file and why is it needed for website favicons?',
    answer:
      'An ICO (Icon) file is an image container format developed by Microsoft that can store multiple bitmap images of varying resolutions (such as 16x16, 32x32, and 48x48 pixels) within a single file. Browsers load `favicon.ico` to display your site logo on browser tabs, bookmarks, and mobile home screen shortcuts.',
  },
  {
    question: 'Does this converter preserve transparent backgrounds in the generated ICO file?',
    answer:
      'Yes, 100%. Kagazo preserves the 8-bit alpha channel from your PNG file. Transparent logo cutouts remain completely transparent on browser tabs, avoiding ugly white or black border boxes.',
  },
  {
    question: 'What source image resolution is best for creating a favicon.ico?',
    answer:
      'Upload a square PNG image of at least 512x512 pixels. Starting with a high-resolution square graphic ensures that when the engine scales it down to 16x16, 32x32, and 48x48 pixels, edges and fine details remain crisp.',
  },
  {
    question: 'How do I add the downloaded favicon.ico to my website HTML?',
    answer:
      'Place `favicon.ico` in the root folder of your website and insert `<link rel="icon" href="/favicon.ico" sizes="any">` inside your HTML `<head>` section. Modern browsers will automatically detect and display it.',
  },
  {
    question: 'Can I use this tool to create Windows desktop application (.exe) icons?',
    answer:
      'Yes. Kagazo packs standard Windows icon structures (including 16x16, 32x32, and 48x48 frames), making the output `.ico` file fully compatible with Visual Studio, Electron, PyInstaller, and Windows shortcut properties.',
  },
  {
    question: 'What happens if my source PNG image is not a square (1:1 ratio)?',
    answer:
      'Favicons must be square. If you upload a rectangular image, basic converters squash it. Kagazo automatically fits your logo proportionally on a square transparent canvas to prevent distortion.',
  },
  {
    question: 'Why does my browser still show the old favicon after updating favicon.ico?',
    answer:
      'Web browsers cache favicons aggressively. To view your updated icon, clear your browser cache, perform a hard refresh (Ctrl+F5 or Cmd+Shift+R), or open your website in an Incognito / Private window.',
  },
  {
    question: 'Are my brand logos or icons uploaded to any server?',
    answer:
      'Never. 100% of the binary ICO packaging happens locally inside your browser memory using typed array buffers. No files are ever transmitted across external networks.',
  },
  {
    question: 'Does Kagazo add any watermarks to generated ICO files?',
    answer:
      'No. All generated favicons are 100% clean, professional, and ready for commercial production.',
  },
  {
    question: 'Is this PNG to ICO converter completely free?',
    answer:
      'Yes, 100% free forever with no account required, no subscription paywalls, and unlimited downloads.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Square PNG Logo',
    desc: 'Select or drag-and-drop your square brand logo or icon (preferably 512x512 PNG with transparency).',
  },
  {
    step: 2,
    title: 'Select Favicon Dimensions',
    desc: 'The engine automatically bundles standard 16x16, 32x32, and 48x48 pixel resolution frames.',
  },
  {
    step: 3,
    title: 'Preserve 8-Bit Alpha Transparency',
    desc: 'Transparent backgrounds are maintained without jagged edges or dark background clipping.',
  },
  {
    step: 4,
    title: 'Multi-Resolution Binary Packing',
    desc: 'The tool constructs a standard multi-frame Microsoft ICO binary container in browser RAM.',
  },
  {
    step: 5,
    title: 'Download Ready favicon.ico',
    desc: 'Download your multi-resolution `favicon.ico` file ready for instant deployment to your website or app.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Blurry Favicon on Retina Screens',
    title: 'Single 16x16 Frame Restriction',
    desc: 'Saving only a 16x16 frame causes severe pixelation on high-DPI screens. Kagazo packs multiple resolutions (16px, 32px, 48px) into one file.',
  },
  {
    badge: 'Error: Distorted / Squashed Icon',
    title: 'Non-Square Source Aspect Ratio',
    desc: 'Uploading wide banners squashes icons horizontally. Kagazo auto-fits non-square images proportionally onto a square transparent canvas.',
  },
  {
    badge: 'Error: Black Background Behind Logo',
    title: 'Improper Alpha Channel Conversion',
    desc: 'Basic tools drop transparency when writing ICO headers. Kagazo strictly preserves 32-bit RGBA channels for transparent icons.',
  },
  {
    badge: 'Error: Browser Caching Stale Favicons',
    title: 'Aggressive Browser Cache Retention',
    desc: 'Browsers cache favicons for weeks. Hard-refresh (Ctrl+F5) or test in an incognito window to inspect newly deployed icons.',
  },
];

export default function PngToIcoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PNG to ICO Converter Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/png-to-ico',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Convert PNG images to multi-size ICO favicon format online free with transparency preservation and 100% in-browser privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PNG to ICO Online in 5 Steps',
        description:
          'Step-by-step instructions to create multi-resolution favicon.ico files from PNG images.',
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
            name: 'PNG to ICO',
            item: 'https://kagazo.in/tools/png-to-ico',
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
          <span className="text-primary font-bold">PNG to ICO</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Multi-Resolution Windows &amp; Favicon Studio (PNG to ICO)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>PNG to ICO </span>
            <span className="text-primary">Converter Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert PNG images to <strong>ICO favicon format</strong> online free. Pack multi-resolution frames (16x16, 32x32, 48x48) with full alpha transparency for websites and Windows apps.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine initialTargetFormat="ico" />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Multi-Resolution Favicon Packing
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Professional Cross-Platform Icon Bundling in Browser RAM
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                A single 16x16 icon looks pixelated on Retina screens and Windows desktop shortcuts. Kagazo bundles multiple resolution layers into a unified binary container for flawless rendering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Multi-Size Packing
                  </span>
                  <p className="text-xs text-text-main/70">
                    Embeds 16x16, 32x32, and 48x48 frames in a single standard ICO container.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileImage className="w-4 h-4" /> 100% Alpha Support
                  </span>
                  <p className="text-xs text-text-main/70">
                    Transparent backgrounds remain crisp without black outlines or halo fringes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Favicon packing runs in local device RAM. Brand assets are never uploaded.
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
                    Standard ICO Resolution Matrix &amp; Usage
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Industry standard resolution layers bundled within Microsoft ICO containers.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  ICO Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Resolution Layer</th>
                      <th className="py-3 px-3">Primary Target</th>
                      <th className="py-3 px-3">Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {ICO_RESOLUTION_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.dimensions}</td>
                        <td className="py-3 px-3 text-xs text-text-main/80">{row.useCase}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.significance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Webmaster Tip:</strong> Name your downloaded file <code>favicon.ico</code> and place it in the root directory of your website for automatic browser discovery.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Convert PNG to ICO in 5 Steps
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
                Common Favicon Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (PNG to ICO Conversion)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical insights on favicon packing, multi-resolution containers, and installation.
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
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP Converter
                </Link>
                <Link
                  href="/tools/jpg-to-png"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JPG to PNG Converter
                </Link>
                <Link
                  href="/tools/png-to-jpg"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to JPG Converter
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
                Favicons are generated in local device RAM. No brand logos or icons are ever uploaded to cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
