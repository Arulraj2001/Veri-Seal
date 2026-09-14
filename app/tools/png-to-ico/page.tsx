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
  Globe2,
  Code2,
  Layers,
  Copy,
} from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PNG to ICO Favicon Generator Online Free (16x16, 32x32, 48x48) | Kagazo',
  description:
    'Convert PNG images to genuine multi-resolution Windows Favicon .ico files online for free. Automatically packages 16x16, 32x32, and 48x48 frames into a single binary with transparent alpha preservation and 100% browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/png-to-ico',
  },
  openGraph: {
    title: 'PNG to ICO Favicon Generator Online Free | Kagazo',
    description:
      'Generate multi-resolution 16x16, 32x32, 48x48 Windows Favicon ICO files with transparent alpha channels.',
    url: 'https://kagazo.in/tools/png-to-ico',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNG to ICO Favicon Generator Online Free | Kagazo',
    description:
      'Generate true multi-resolution binary favicon.ico files with transparent alpha channels in your browser.',
  },
};

const ICO_FRAME_SPECS = [
  {
    dimension: '16 × 16 px',
    bitDepth: '32-bit RGBA (8-bit alpha)',
    platformTarget: 'Browser tabs, bookmark menus, URL history entries',
    importance: 'Critical (Most frequently viewed icon on the web)',
  },
  {
    dimension: '32 × 32 px',
    bitDepth: '32-bit RGBA (8-bit alpha)',
    platformTarget: 'Windows taskbar pinned items, Safari Reading List, new tab shortcuts',
    importance: 'Essential (Prevents blurry scaling on desktop taskbars)',
  },
  {
    dimension: '48 × 48 px',
    bitDepth: '32-bit RGBA (8-bit alpha)',
    platformTarget: 'Windows desktop shortcuts, File Explorer medium/large icon view',
    importance: 'Recommended (Crisp high-DPI desktop display representation)',
  },
  {
    dimension: 'Binary Header',
    bitDepth: 'ICONDIR + ICONDIRENTRY',
    platformTarget: 'Microsoft Windows Shell and standard web browsers',
    importance: 'Standards-compliant single-file multi-resolution payload',
  },
];

const FAQS = [
  {
    question: 'Why does a modern website need a multi-resolution favicon.ico instead of just a PNG?',
    answer:
      'Different operating systems and web browsers render site icons at varying screen pixel densities. A single PNG file often scales poorly, leading to blurry edges or jagged lines on desktop taskbars. A genuine multi-resolution favicon.ico encapsulates 16×16, 32×32, and 48×48 frames in one binary package, allowing browsers and Windows to automatically select the optimal raster without downsampling distortion.',
  },
  {
    question: 'How do I install the generated favicon.ico on my website or web app?',
    answer:
      'Place the generated favicon.ico file in the root directory of your website (e.g. public/favicon.ico in Next.js or the root folder in WordPress and Apache). Then add the standard HTML tag inside your <head>: `<link rel="icon" href="/favicon.ico" sizes="any" />`. Modern browsers will detect and cache the multi-frame icon automatically.',
  },
  {
    question: 'Does this converter preserve transparent backgrounds from my original PNG?',
    answer:
      'Yes, 100%. Kagazo generates 32-bit RGBA frames that preserve the full 8-bit alpha transparency channel. Semi-transparent gradients, curved logo borders, and drop shadows will composite seamlessly against dark or light browser tabs without unsightly white halos or black boxes.',
  },
  {
    question: 'How does Kagazo create a genuine multi-resolution ICO file compared to other tools?',
    answer:
      'Many low-quality online tools simply rename a `.png` file to `.ico`, which breaks Windows shortcut parsing and causes legacy browser display bugs. Kagazo builds a true binary Microsoft Windows Icon (`ICONDIR`) data structure directly in memory, embedding discrete PNG and BMP bitstreams for each resolution target according to official Microsoft specification.',
  },
  {
    question: 'Are my brand logos or artwork stored on Kagazo servers?',
    answer:
      'No. The entire icon compilation process executes directly inside your browser’s volatile memory using typed binary arrays (`Uint8Array` and `DataView`). No logos, images, or assets are ever uploaded to any external server or cloud database, guaranteeing complete intellectual property protection.',
  },
];

export default function PngToIcoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo PNG to ICO Favicon Generator Online Free',
        url: 'https://kagazo.in/tools/png-to-ico',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Convert PNG images to genuine multi-resolution Windows Favicon .ico files online with 16x16, 32x32, and 48x48 frames and in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate a Multi-Resolution Favicon.ico from PNG',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Transparent PNG Logo',
            text: 'Drag and drop your square PNG logo (recommended 512×512 px) into the converter.',
          },
          {
            '@type': 'HowToStep',
            name: 'Binary Multi-Frame Compilation',
            text: 'The engine downsamples the image to 16×16, 32×32, and 48×48 frames and compiles a standard Windows ICONDIR payload.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Favicon.ico',
            text: 'Download the compiled favicon.ico file ready for immediate deployment to your website root.',
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
            name: 'PNG to ICO Favicon Generator',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">PNG to ICO</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Multi-Resolution Windows &amp; Web Favicon Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            PNG to ICO Favicon Generator Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert PNG logos into genuine multi-resolution <strong>favicon.ico</strong> files. Automatically embeds 16×16, 32×32, and 48×48 frames with full 32-bit alpha transparency.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Layers className="w-4 h-4 text-primary" /> Bundled 16×16, 32×32, 48×48
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Globe2 className="w-4 h-4 text-primary" /> Browser &amp; Windows Compatible
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine
              initialSourceFormat="png"
              initialTargetFormat="ico"
              fixedTargetFormat={true}
              toolHeading="Convert PNG to Favicon ICO"
              toolSubheading="Upload a square PNG image (ideally 512×512) to compile a genuine multi-resolution favicon.ico."
            />

            <AdSlot slot="post_download" />

            {/* Frame Specification Matrix */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Embedded Multi-Resolution Frame Architecture
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  How Kagazo compiles true multi-frame binary .ico structures for razor-sharp cross-platform rendering.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/60">
                      <th className="py-3 px-4 font-bold text-text-main">Frame Size</th>
                      <th className="py-3 px-4 font-bold text-text-main">Color Depth</th>
                      <th className="py-3 px-4 font-bold text-primary">Target Platform &amp; Surface</th>
                      <th className="py-3 px-4 font-bold text-emerald-700">Display Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {ICO_FRAME_SPECS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-text-main">{row.dimension}</td>
                        <td className="py-3.5 px-4 text-text-main/80">{row.bitDepth}</td>
                        <td className="py-3.5 px-4 font-medium text-primary">{row.platformTarget}</td>
                        <td className="py-3.5 px-4 text-emerald-700 font-medium">{row.importance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Implementation Code Snippet Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Website Implementation &amp; HTML Head Setup
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Standard implementation snippet for Next.js, React, HTML5, and WordPress.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-darker space-y-3 font-mono text-xs text-text-main">
                <div className="flex items-center justify-between text-[11px] text-text-main/60 font-sans border-b border-surface-darker pb-2">
                  <span>HTML &lt;head&gt; Tag</span>
                  <span className="text-primary font-semibold">Standard Modern Favicon</span>
                </div>
                <pre className="overflow-x-auto py-2 text-text-main leading-relaxed">
                  {`<!-- Place favicon.ico in your root /public folder -->\n<link rel="icon" href="/favicon.ico" sizes="any" />`}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">📁 Root Deployment</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Search engine web crawlers (Googlebot, Bingbot) automatically request <code>/favicon.ico</code> from the domain root. Placing your compiled file in root ensures fast indexing.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🎨 Crisp Transparency</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Full 8-bit alpha preservation guarantees your logo will look immaculate in both dark mode and light mode browser chrome.
                  </p>
                </div>
              </div>
            </section>

            {/* Step-by-Step Workflow */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-primary" />
                  How to Create a Favicon.ico from PNG in 3 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Generate standards-compliant multi-resolution website icons instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Upload Square PNG</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Select a high-resolution square PNG logo (512×512 or 256×256 pixels works best).
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Binary Compilation</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    The engine automatically downsamples and packages 16px, 32px, and 48px frames into an ICO stream.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-sm text-text-main">Download &amp; Deploy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Save your genuine favicon.ico file and drop it into your website root directory.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions About Favicon ICO Files
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Everything you need to know about Windows icon headers, browser rendering, and deployment.
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
                <Link href="/tools/image-optimizer" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  Image Optimizer
                </Link>
                <Link href="/tools/remove-background" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-semibold text-text-main hover:text-primary transition-colors">
                  Remove Background
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Client Privacy Guarantee</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Favicon binary compilation executes 100% inside your browser memory. Zero brand assets are uploaded to any server.
              </p>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
