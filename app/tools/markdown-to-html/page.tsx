import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  FileCode,
  FileCheck,
  Eye,
  Sparkles,
} from 'lucide-react';
import { MarkdownStudioEngine } from '@/components/tools/MarkdownStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Markdown to HTML Converter Online | Live GFM Preview & Export | Kagazo',
  description:
    'Convert Markdown to clean, semantic HTML code online. Features live split-pane preview, GitHub Flavored Markdown (tables, checklists, syntax highlighting), and instant HTML file download.',
  alternates: {
    canonical: 'https://kagazo.in/tools/markdown-to-html',
  },
  openGraph: {
    title: 'Free Markdown to HTML Converter Online | Kagazo',
    description: 'Convert GitHub Flavored Markdown to HTML with live preview and code export.',
    url: 'https://kagazo.in/tools/markdown-to-html',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Does this converter support GitHub Flavored Markdown (GFM)?',
    answer:
      'Yes! Kagazo fully supports GFM extensions including markdown tables, strikethrough (`~~text~~`), autolinked URLs, and interactive task checklists (`- [x]`).',
  },
  {
    question: 'Can I copy the raw HTML output to paste into my CMS or blog?',
    answer:
      'Yes. Toggle to the "Raw HTML" tab and click "Copy HTML" to instantly paste clean, semantic HTML directly into WordPress, Webflow, Shopify, or static site generators.',
  },
  {
    question: 'Is my document text saved on any server?',
    answer:
      'No. The markdown rendering and AST HTML conversion execute 100% locally in your browser memory with zero tracking.',
  },
];

export default function MarkdownToHtmlPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Markdown to HTML Studio',
        url: 'https://kagazo.in/tools/markdown-to-html',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Markdown to HTML</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-700 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>GitHub Flavored Markdown (GFM) Studio • Instant Live Preview</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Markdown to HTML Converter & Editor
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Write or paste markdown and convert it to clean, semantic HTML in real time. 
            Features <strong>GFM tables, task checklists, code blocks</strong>, and 1-click HTML download.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Eye className="w-4 h-4 text-primary" /> Side-by-Side Live Preview
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCode className="w-4 h-4 text-blue-600" /> Clean HTML Export
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <MarkdownStudioEngine />

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
                Related Formatting Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Formatter
                </Link>
                <Link
                  href="/tools/sql-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  SQL Formatter
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
