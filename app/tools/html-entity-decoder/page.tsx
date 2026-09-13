import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Code2,
  FileCheck,
} from 'lucide-react';
import { HtmlEntityEngine } from '@/components/tools/HtmlEntityEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free HTML Entity Decoder Online | Convert &amp; &lt; &gt; to Text | Kagazo',
  description:
    'Decode HTML entities (&lt;, &gt;, &amp;, &quot;, &#39;) back into standard symbols and characters online. Fast, secure, and 100% in-browser execution with zero tracking.',
  alternates: {
    canonical: 'https://kagazo.in/tools/html-entity-decoder',
  },
  openGraph: {
    title: 'Free HTML Entity Decoder Online | Kagazo',
    description: 'Convert named, decimal, and hex HTML entities back into plain characters.',
    url: 'https://kagazo.in/tools/html-entity-decoder',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function HtmlEntityDecoderPage() {
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
          <span className="text-primary font-bold">HTML Entity Decoder</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-700 shadow-2xs">
            <Code2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Named, Decimal & Hexadecimal Entity Decoder</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            HTML Entity Decoder & Unescaper
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert encoded HTML entities (`&amp;`, `&lt;`, `&gt;`, `&quot;`) back into raw readable text. 
            Handles <strong>named, decimal (`&amp;#38;`), and hexadecimal (`&amp;#x26;`)</strong> formats automatically.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Code2 className="w-4 h-4 text-primary" /> Auto Format Detection
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-emerald-600" /> Instant Real-Time Conversion
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HtmlEntityEngine initialMode="decode" />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Security Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/html-entity-encoder"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Entity Encoder
                </Link>
                <Link
                  href="/tools/url-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Decoder
                </Link>
                <Link
                  href="/tools/base64-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Decoder
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
