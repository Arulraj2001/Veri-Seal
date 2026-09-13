import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Zap, Lock, Sparkles } from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'WebP to PNG Converter Online Free - Keep Transparency | Kagazo',
  description:
    'Convert WebP images to universal PNG format online for free. Retain full alpha transparency, unpack web images for Photoshop/editing software, and download with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/webp-to-png',
  },
  openGraph: {
    title: 'WebP to PNG Converter Online Free | Kagazo',
    description: 'Convert WebP to PNG format with full transparency preservation and zero server uploads.',
    url: 'https://kagazo.in/tools/webp-to-png',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function WebpToPngPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">WebP to PNG</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Lossless WebP to PNG Extraction</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            WebP to PNG Converter Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto">
            Convert downloaded WebP graphics into standard PNG format compatible with older image editors, Photoshop, and desktop viewers.
          </p>
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
          </main>

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Converters</span>
              <div className="space-y-1.5">
                <Link href="/tools/png-to-webp" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  PNG to WebP
                </Link>
                <Link href="/tools/png-to-jpg" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  PNG to JPG
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
