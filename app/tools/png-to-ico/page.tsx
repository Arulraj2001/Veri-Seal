import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Zap, Lock, Sparkles, Globe2, FileCheck } from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PNG to ICO Favicon Generator Online Free (16x16, 32x32, 48x48) | Kagazo',
  description:
    'Convert PNG images to genuine multi-resolution Windows Favicon .ico files online for free. Automatically bundles 16x16, 32x32, and 48x48 icon frames into a single binary with transparent alpha preservation.',
  alternates: {
    canonical: 'https://kagazo.in/tools/png-to-ico',
  },
  openGraph: {
    title: 'PNG to ICO Favicon Generator Online Free | Kagazo',
    description: 'Generate multi-resolution 16x16, 32x32, 48x48 Windows Favicon ICO files with transparent alpha channels.',
    url: 'https://kagazo.in/tools/png-to-ico',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why does a website need a multi-resolution favicon.ico file?',
    answer:
      'Different platforms request different icon dimensions. Browser tabs typically display 16×16 px, bookmark bars and Windows taskbars require 32×32 px, and high-DPI desktop shortcuts need 48×48 px. Kagazo bundles all three sizes into a single binary .ico file so your site looks sharp everywhere.',
  },
  {
    question: 'How do I add the generated favicon.ico to my website?',
    answer:
      'Place the downloaded favicon.ico in your website root directory (public/ folder in Next.js or root in WordPress/Apache) and add `<link rel="icon" href="/favicon.ico" sizes="any" />` to your HTML `<head>`.',
  },
  {
    question: 'Does this tool preserve transparent backgrounds in icons?',
    answer:
      'Yes. Kagazo generates 32-bit RGBA frames with full 8-bit alpha channel transparency, ensuring clean edges without jagged backgrounds.',
  },
];

export default function PngToIcoPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">PNG to ICO</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Multi-Resolution Windows &amp; Web Favicon Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            PNG to ICO Favicon Generator
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto">
            Convert PNG logos and artwork into compliant multi-size <strong>favicon.ico</strong> files.
            Automatically embeds 16×16, 32×32, and 48×48 frames in a single binary with alpha transparency.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine
              initialSourceFormat="png"
              initialTargetFormat="ico"
              fixedTargetFormat={true}
              toolHeading="Generate Favicon ICO from PNG"
              toolSubheading="Upload a square PNG image (ideally 512×512 or 256×256) to build your favicon.ico bundle."
            />

            <AdSlot slot="post_download" />

            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Favicon HTML Implementation Code
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Copy this standard snippet into your website HTML &lt;head&gt; section.
                </p>
              </div>

              <div className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 font-mono text-xs overflow-x-auto">
                <pre>{`<!-- Favicon Standard Implementation -->
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" type="image/x-icon" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`}</pre>
              </div>
            </section>
          </main>

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Tools</span>
              <div className="space-y-1.5">
                <Link href="/tools/image-optimizer" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  Image Optimizer
                </Link>
                <Link href="/tools/png-to-webp" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  PNG to WebP
                </Link>
                <Link href="/tools/image-converter" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  Universal Converter
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
