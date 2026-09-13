import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Code,
  FileCheck,
  Upload,
} from 'lucide-react';
import { Base64StudioEngine } from '@/components/tools/Base64StudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Base64 Encoder Online | Text & File to Base64 Converter | Kagazo',
  description:
    'Convert text, strings, and binary files (PNG, JPG, PDF) to Base64 format online. Includes UTF-8 multi-byte support, URL-safe Base64 mode, and data URI generation.',
  alternates: {
    canonical: 'https://kagazo.in/tools/base64-encode',
  },
  openGraph: {
    title: 'Free Base64 Encoder Online | Kagazo',
    description: 'Encode text and files to Base64 with URL-safe mode and data URI generation.',
    url: 'https://kagazo.in/tools/base64-encode',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How does Base64 encoding work?',
    answer:
      'Base64 is a binary-to-text encoding scheme that translates binary data into a sequence of 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It represents 6 bits of data per character, resulting in approximately a 33% size increase.',
  },
  {
    question: 'What is URL-Safe Base64?',
    answer:
      'Standard Base64 uses `+` and `/`, which have special meanings in URL query strings and path segments. URL-safe Base64 replaces `+` with `-` and `/` with `_`, stripping trailing `=` padding characters.',
  },
  {
    question: 'Does this tool support emojis and non-English text?',
    answer:
      'Yes. Our engine uses UTF-8 TextEncoder bytes rather than legacy 8-bit ASCII atob/btoa, guaranteeing full support for emojis (🎉), Arabic, Chinese, and European accented letters.',
  },
];

export default function Base64EncodePage() {
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
          <span className="text-primary font-bold">Base64 Encoder</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Code className="w-4 h-4 text-primary shrink-0" />
            <span>RFC 4648 UTF-8 Compliant Base64 Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Base64 Encoder & Data URI Generator
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Encode plain text, emojis, and binary files into Base64 format. 
            Supports <strong>URL-Safe encoding and inline CSS/HTML Data URIs</strong> with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Upload className="w-4 h-4 text-primary" /> File Dropzone Support
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-blue-600" /> URL-Safe Mode
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <Base64StudioEngine initialMode="encode" />

            {/* FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="divide-y divide-surface-darker/70">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group py-4 first:pt-0 last:pb-0">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-text-main group-hover:text-primary transition-colors">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed pl-2 border-l-2 border-primary/30">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Encoding Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/base64-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Decoder
                </Link>
                <Link
                  href="/tools/url-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Encoder
                </Link>
                <Link
                  href="/tools/html-entity-encoder"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Entity Encoder
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
