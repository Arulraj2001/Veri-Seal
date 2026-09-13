import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Zap, Lock, Sparkles } from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter Online Free - Lossless & Crisp | Kagazo',
  description:
    'Convert JPG/JPEG images to high-resolution lossless PNG format online for free. In-browser client privacy, crisp graphics, and batch download.',
  alternates: {
    canonical: 'https://kagazo.in/tools/jpg-to-png',
  },
  openGraph: {
    title: 'JPG to PNG Converter Online Free | Kagazo',
    description: 'Convert JPG to PNG format with lossless precision and 100% in-browser privacy.',
    url: 'https://kagazo.in/tools/jpg-to-png',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function JpgToPngPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">JPG to PNG</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Lossless 24-bit PNG Image Converter</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            JPG to PNG Converter Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto">
            Convert compressed JPG and JPEG files to crisp, uncompressed PNG format with lossless clarity and zero server uploads.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageConverterMatrixEngine
              initialSourceFormat="jpg"
              initialTargetFormat="png"
              fixedTargetFormat={true}
              toolHeading="Convert JPG to PNG"
              toolSubheading="Upload JPG or JPEG images to convert to lossless PNG format."
            />
            <AdSlot slot="post_download" />
          </main>

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Converters</span>
              <div className="space-y-1.5">
                <Link href="/tools/png-to-jpg" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  PNG to JPG
                </Link>
                <Link href="/tools/webp-to-png" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  WebP to PNG
                </Link>
                <Link href="/tools/png-to-ico" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  PNG to Favicon ICO
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
