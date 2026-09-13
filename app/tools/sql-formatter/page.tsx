import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Database,
  FileCheck,
  Maximize2,
} from 'lucide-react';
import { SqlFormatterEngine } from '@/components/tools/SqlFormatterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free SQL Formatter & Query Beautifier Online | PostgreSQL, MySQL, SQLite | Kagazo',
  description:
    'Format and beautify complex SQL queries online. Supports PostgreSQL, MySQL, SQLite, MariaDB, BigQuery, and Transact-SQL with custom uppercase keywords and indentation.',
  alternates: {
    canonical: 'https://kagazo.in/tools/sql-formatter',
  },
  openGraph: {
    title: 'Free SQL Formatter & Query Beautifier | Kagazo',
    description: 'Format and beautify SQL queries with multi-dialect support and custom keyword casing.',
    url: 'https://kagazo.in/tools/sql-formatter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Which SQL dialects are supported?',
    answer:
      'Kagazo supports all leading relational database dialects: Standard ANSI SQL, PostgreSQL, MySQL, SQLite, MariaDB, Google BigQuery, and Microsoft Transact-SQL (T-SQL).',
  },
  {
    question: 'Can I force all SQL keywords to UPPERCASE?',
    answer:
      'Yes! Choose the "UPPER" keyword option to automatically capitalize all clauses and commands like SELECT, FROM, WHERE, GROUP BY, ORDER BY, and JOIN.',
  },
  {
    question: 'Are my proprietary database schemas or queries kept private?',
    answer:
      'Yes, 100%. All SQL query parsing and AST formatting execute strictly in client-side RAM within your browser. No queries or table schemas are transmitted to our servers.',
  },
];

export default function SqlFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'SQL Formatter & Query Beautifier',
        url: 'https://kagazo.in/tools/sql-formatter',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">SQL Formatter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs sm:text-sm font-semibold text-indigo-700 shadow-2xs">
            <Database className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Multi-Dialect AST Query Beautifier</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            SQL Formatter & Query Beautifier
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Beautify complex database queries with ease. Format <strong>CTEs, nested subqueries, window functions, and multi-table JOINs</strong> across PostgreSQL, MySQL, SQLite, and BigQuery.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Database className="w-4 h-4 text-primary" /> Multi-Dialect Parser
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Maximize2 className="w-4 h-4 text-indigo-600" /> UPPERCASE Keywords
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SqlFormatterEngine />

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
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Formatter
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
          </aside>
        </div>
      </div>
    </div>
  );
}
