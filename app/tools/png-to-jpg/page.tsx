import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Zap, Lock, Sparkles, FileCheck, Globe2 } from 'lucide-react';
import { ImageConverterMatrixEngine } from '@/components/tools/ImageConverterMatrixEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PNG to JPG Converter Online Free - High Quality & Fast | Kagazo',
  description:
    'Convert PNG images to JPG format online for free with white background leveling and custom compression quality. 100% in-browser RAM privacy and batch download.',
  alternates: {
    canonical: 'https://kagazo.in/tools/png-to-jpg',
  },
  openGraph: {
    title: 'PNG to JPG Converter Online Free | Kagazo',
    description: 'Convert PNG to JPG instantly with white background handling and 100% client privacy.',
    url: 'https://kagazo.in/tools/png-to-jpg',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why does my transparent PNG get a white background when converted to JPG?',
    answer:
      'The JPEG standard does not support transparent alpha channels. Kagazo seamlessly fills transparent areas with clean pure white (#FFFFFF), preventing black artifacts or ruined graphics.',
  },
  {
    question: 'Will converting PNG to JPG decrease the file size?',
    answer:
      'Yes, in most cases photography and complex graphics stored as PNG will shrink by 50% to 80% when converted to optimized JPG.',
  },
  {
    question: 'Are my converted photos kept private?',
    answer:
      'Yes. Kagazo runs 100% inside your browser’s volatile RAM. Your images never touch any server or cloud database.',
  },
];

export default function PngToJpgPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">PNG to JPG</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>High-Fidelity PNG to JPEG Converter</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            PNG to JPG Converter Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto">
            Convert PNG images to high-quality JPG format with automatic pure-white background leveling,
            custom quality controls, and batch download.
          </p>
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
          </main>

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Converters</span>
              <div className="space-y-1.5">
                <Link href="/tools/jpg-to-png" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  JPG to PNG
                </Link>
                <Link href="/tools/png-to-webp" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  PNG to WebP
                </Link>
                <Link href="/tools/png-to-ico" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  PNG to Favicon ICO
                </Link>
                <Link href="/tools/image-optimizer" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  Image Optimizer
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
