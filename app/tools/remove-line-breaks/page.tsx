import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Scissors,
  FileCheck,
} from 'lucide-react';
import { TextCleanerEngine } from '@/components/tools/TextCleanerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Line Break Remover Online | Strip Newlines & Paragraph Breaks | Kagazo',
  description:
    'Remove unwanted line breaks, newlines, and hard paragraph wraps from PDF copies and scanned text online. Converts multi-line text into a single cohesive paragraph with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/remove-line-breaks',
  },
  openGraph: {
    title: 'Free Line Break Remover Online | Kagazo',
    description: 'Strip hard line breaks and newlines from copied text and PDFs.',
    url: 'https://kagazo.in/tools/remove-line-breaks',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function RemoveLineBreaksPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Remove Line Breaks</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-700 shadow-2xs">
            <Scissors className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>PDF & Hard Wrap Formatter</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Line Break Remover
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Eliminate unwanted hard line breaks and carriage returns from copied PDF text, emails, and OCR scans. 
            Rejoin broken sentences into <strong>fluent paragraphs</strong> instantly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Scissors className="w-4 h-4 text-primary" /> Perfect for Copied PDFs
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-emerald-600" /> Instant 1-Click Copy
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <TextCleanerEngine initialAction="linebreaks" />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Text Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/text-cleaner"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Text Cleaner
                </Link>
                <Link
                  href="/tools/word-counter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Word Counter
                </Link>
                <Link
                  href="/tools/case-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Case Converter
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
