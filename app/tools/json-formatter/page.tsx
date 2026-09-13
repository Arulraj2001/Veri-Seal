import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Code,
  FileJson,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';
import { JsonStudioEngine } from '@/components/tools/JsonStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free JSON Formatter, Validator & Beautifier Online | Kagazo',
  description:
    'Format, validate, and beautify JSON data online with 100% in-browser RAM privacy. Features line-by-line syntax error pinpointing, collapsible tree viewer, and RFC 8259 compliance.',
  alternates: {
    canonical: 'https://kagazo.in/tools/json-formatter',
  },
  openGraph: {
    title: 'Free JSON Formatter, Validator & Beautifier | Kagazo',
    description: 'Format, validate, and beautify JSON with interactive tree view and zero server uploads.',
    url: 'https://kagazo.in/tools/json-formatter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Is my confidential JSON data uploaded to remote servers?',
    answer:
      'Never. Kagazo processes all JSON parsing, formatting, and validation 100% locally in your browser’s JavaScript V8 engine memory. No payloads are ever transmitted across network connections.',
  },
  {
    question: 'How does Kagazo detect JSON syntax errors?',
    answer:
      'When an invalid JSON string is supplied, our parser calculates the exact byte offset and maps it to line and column coordinates, highlighting missing brackets, trailing commas, or unquoted keys.',
  },
  {
    question: 'Can I sort JSON object keys alphabetically?',
    answer:
      'Yes! Use the "Sort Keys" feature to recursively sort all object keys from A to Z, making diffing and version comparisons effortless.',
  },
  {
    question: 'What is the difference between 2-space and 4-space indentation?',
    answer:
      '2-space indentation is the modern standard used by JavaScript, TypeScript, and Google style guides to maintain readability in deeply nested objects. 4-space is common in Python and Java environments.',
  },
];

export default function JsonFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'JSON Formatter & Tree Inspector',
        url: 'https://kagazo.in/tools/json-formatter',
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
        '@type': 'HowTo',
        name: 'How to format and validate JSON data online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Paste JSON',
            text: 'Paste raw, minified, or unformatted JSON text into the workspace editor.',
          },
          {
            '@type': 'HowToStep',
            name: 'Beautify or Minify',
            text: 'Click Beautify to apply clean indentation or Minify to strip all whitespace.',
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect Tree View',
            text: 'Toggle Tree View to explore complex nested objects with collapsible nodes.',
          },
        ],
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">JSON Formatter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <FileJson className="w-4 h-4 text-primary shrink-0" />
            <span>RFC 8259 Standard • 100% In-Browser Memory Privacy</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            JSON Formatter, Validator & Beautifier
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Beautify, validate, and minify JSON payloads instantly. Detect <strong>exact syntax errors by line and column</strong>, sort keys alphabetically, and inspect collapsible tree nodes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Client-Side RAM
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Zero Server Latency
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Code className="w-4 h-4 text-blue-600" /> Interactive Tree View
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <JsonStudioEngine initialMode="format" />

            {/* Guide Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-primary" />
                  Understanding JSON Standards and Best Practices
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  JSON (JavaScript Object Notation) is the ubiquitous data interchange format for modern APIs:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Strict Double Quotes
                  </span>
                  <p className="leading-relaxed">
                    Unlike JavaScript object literals, RFC 8259 requires that all string values and object property keys be enclosed in double quotes (`"key": "value"`).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> No Trailing Commas
                  </span>
                  <p className="leading-relaxed">
                    Standard JSON parsers reject trailing commas after the final element in an array or object. Our validator instantly flags these errors.
                  </p>
                </div>
              </div>
            </section>

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
                Related Developer Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/json-validator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Validator
                </Link>
                <Link
                  href="/tools/json-beautifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Beautifier
                </Link>
                <Link
                  href="/tools/sql-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  SQL Formatter
                </Link>
                <Link
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
                </Link>
                <Link
                  href="/tools/base64-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Studio
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Zero Server Uploads</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Formatted completely in client-side RAM with zero network traffic.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
