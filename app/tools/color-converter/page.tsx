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
  FileCheck,
  Globe2,
} from 'lucide-react';
import { ColorPickerEngine } from '@/components/tools/ColorPickerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Color Converter Online Free - HEX, RGB, HSL, HSV, CMYK | Kagazo',
  description:
    'Convert colors between HEX, HEXA, RGB, RGBA, HSL, HSLA, HSV, and CMYK formats online for free. Instant 1-click CSS copying and WCAG accessibility contrast ratio testing.',
  alternates: {
    canonical: 'https://kagazo.in/tools/color-converter',
  },
  openGraph: {
    title: 'Color Converter Online Free | Kagazo',
    description: 'Convert HEX to RGB, RGB to HSL, CMYK and HSV in real-time with CSS export and contrast scores.',
    url: 'https://kagazo.in/tools/color-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function ColorConverterPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Color Converter</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Multi-Model Color Conversion Matrix</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            Color Converter Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto">
            Convert color codes across 8 universal standards: <strong>HEX, RGB, HSL, HSV, and CMYK</strong>.
            Copy ready-to-use CSS declarations and test contrast ratios for WCAG AA/AAA compliance.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ColorPickerEngine defaultHex="#003366" />
            <AdSlot slot="post_download" />
          </main>

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Tools</span>
              <div className="space-y-1.5">
                <Link href="/tools/color-picker" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  Color Picker &amp; Palette
                </Link>
                <Link href="/tools/image-optimizer" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  Image Optimizer
                </Link>
                <Link href="/tools/signature-generator" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  Signature Generator
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
