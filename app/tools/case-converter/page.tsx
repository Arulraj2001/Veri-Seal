import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Type,
  FileCheck,
} from 'lucide-react';
import { CaseConverterEngine } from '@/components/tools/CaseConverterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Case Converter Online | UPPERCASE, lowercase, Title, camelCase, snake_case | Kagazo',
  description:
    'Convert text between 10+ casing styles online: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, CONSTANT_CASE, and kebab-case with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/case-converter',
  },
  openGraph: {
    title: 'Free Case Converter Online | Kagazo',
    description: 'Convert text between UPPERCASE, lowercase, camelCase, snake_case, and Title Case.',
    url: 'https://kagazo.in/tools/case-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function CaseConverterPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Case Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Type className="w-4 h-4 text-primary shrink-0" />
            <span>10-in-1 Casing & String Transformation Suite</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Case Converter & String Transformer
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert text case instantly. Seamlessly transform between <strong>UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case</strong> with zero server uploads.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Type className="w-4 h-4 text-primary" /> 10 Formats Supported
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-blue-600" /> Instant 1-Click Copy
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <CaseConverterEngine />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Text Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/word-counter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Word Counter
                </Link>
                <Link
                  href="/tools/text-cleaner"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Text Cleaner
                </Link>
                <Link
                  href="/tools/lorem-ipsum-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Lorem Ipsum
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
