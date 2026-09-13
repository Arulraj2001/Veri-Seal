import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  FileType,
  FileCheck,
  Minimize2,
} from 'lucide-react';
import { HtmlCssJsMinifierEngine } from '@/components/tools/HtmlCssJsMinifierEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free CSS Minifier & Stylesheet Compressor Online | Kagazo',
  description:
    'Compress and minify CSS stylesheets online up to 40%. Strips CSS comments, shortens hex colors, removes trailing semicolons and zero-units with zero server upload privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/css-minifier',
  },
  openGraph: {
    title: 'Free CSS Minifier & Stylesheet Compressor | Kagazo',
    description: 'Compress CSS stylesheets in real time with color shortening and zero-unit removal.',
    url: 'https://kagazo.in/tools/css-minifier',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function CssMinifierPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">CSS Minifier</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-semibold text-blue-700 shadow-2xs">
            <FileType className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Modern CSS Parser & Stylesheet Compressor</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            CSS Minifier & Stylesheet Optimizer
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Compress CSS stylesheets for production. Strip <strong>comments, zero units (`0px` to `0`), and shorten hex colors</strong> to eliminate render-blocking stylesheet latency.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant Byte Counter
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Minimize2 className="w-4 h-4 text-blue-600" /> Color Shorthand Optimization
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HtmlCssJsMinifierEngine defaultLanguage="css" />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Code Minifiers
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
                </Link>
                <Link
                  href="/tools/js-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  JavaScript Minifier
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Formatter
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
