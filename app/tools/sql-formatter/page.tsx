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
  CheckCircle2,
  HelpCircle,
  Terminal,
  Activity,
  ArrowRightLeft,
  Copy,
  AlertTriangle,
  Info,
  Sliders,
  Sparkles,
  Layers,
} from 'lucide-react';
import { SqlFormatterEngine } from '@/components/tools/SqlFormatterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free SQL Formatter & Query Beautifier Online | PostgreSQL, MySQL, T-SQL | Kagazo',
  description:
    'Format, beautify, and indent complex SQL queries online. Supports PostgreSQL, MySQL, SQLite, MariaDB, Google BigQuery, and Transact-SQL with customizable keyword capitalization, indentation, and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/sql-formatter',
  },
  openGraph: {
    title: 'Free SQL Formatter & Query Beautifier Online | Kagazo',
    description:
      'Format and beautify complex SQL queries online across PostgreSQL, MySQL, SQLite, MariaDB, and T-SQL dialects with zero server logging.',
    url: 'https://kagazo.in/tools/sql-formatter',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SQL Formatter & Beautifier | Kagazo',
    description:
      'Format and align SQL statements, CTEs, and JOINs instantly with 100% client-side memory privacy.',
  },
};

const SQL_DIALECT_COMPARISON = [
  {
    dialect: 'Standard ANSI SQL',
    identifierQuotes: 'Double quotes ("table_name")',
    stringConcat: 'Pipe operator (||)',
    paginationSyntax: 'FETCH FIRST n ROWS ONLY',
    bestFor: 'Generic enterprise DBMS & portable schema definitions',
  },
  {
    dialect: 'PostgreSQL',
    identifierQuotes: 'Double quotes ("column_name")',
    stringConcat: 'Pipe operator (||) or concat()',
    paginationSyntax: 'LIMIT n OFFSET m',
    bestFor: 'Modern ACID relational databases, JSONB querying, CTEs',
  },
  {
    dialect: 'MySQL & MariaDB',
    identifierQuotes: 'Backticks (`table_name`)',
    stringConcat: 'CONCAT(a, b)',
    paginationSyntax: 'LIMIT m, n or LIMIT n OFFSET m',
    bestFor: 'Web applications, WordPress, e-commerce, LAMP stacks',
  },
  {
    dialect: 'Microsoft T-SQL',
    identifierQuotes: 'Square brackets ([column_name])',
    stringConcat: 'Plus operator (+) or CONCAT()',
    paginationSyntax: 'TOP (n) or OFFSET m ROWS FETCH NEXT n',
    bestFor: 'Microsoft SQL Server, Azure SQL, Windows enterprise',
  },
  {
    dialect: 'Google BigQuery',
    identifierQuotes: 'Backticks (`dataset.table`)',
    stringConcat: 'CONCAT(str1, str2) or ||',
    paginationSyntax: 'LIMIT n',
    bestFor: 'Petabyte-scale analytics, data warehousing, OLAP reporting',
  },
];

const FAQS = [
  {
    question: 'Which SQL database dialects does Kagazo support?',
    answer:
      'Kagazo’s formatting engine supports all leading relational and cloud analytical database dialects, including standard ANSI SQL, PostgreSQL, MySQL, SQLite, MariaDB, Google BigQuery, and Microsoft Transact-SQL (T-SQL). Each dialect applies appropriate identifier quotation and syntax keyword formatting rules.',
  },
  {
    question: 'Can I force SQL keywords like SELECT and WHERE to UPPERCASE automatically?',
    answer:
      'Yes. You can toggle keyword capitalization between UPPERCASE, lowercase, or preserve existing case. Capitalizing primary clauses such as SELECT, FROM, JOIN, WHERE, GROUP BY, and HAVING adheres to established SQL style guidelines and vastly improves query legibility during code reviews.',
  },
  {
    question: 'Are my confidential database queries or proprietary schemas sent to external servers?',
    answer:
      'Never. Kagazo performs all SQL parsing, tokenization, and indentation formatting 100% locally inside your browser’s volatile JavaScript memory. No query text, column definitions, database credentials, or customer data are ever transmitted across external network connections.',
  },
  {
    question: 'Does this formatter support Common Table Expressions (CTEs) and nested subqueries?',
    answer:
      'Yes. Our engine cleanly formats complex multi-level queries including WITH clauses (Common Table Expressions), correlated subqueries, nested SELECT statements, and window functions (such as ROW_NUMBER() OVER (PARTITION BY ...)), applying consistent hierarchical indentation.',
  },
  {
    question: 'What indentation options are available for SQL formatting?',
    answer:
      'You can customize indentation between 2 spaces (ideal for wide queries and embedded application strings), 4 spaces (classic database admin standard), or tab characters. The formatter aligns JOIN conditions and WHERE clauses logically for quick scanning.',
  },
  {
    question: 'Can I format DDL statements like CREATE TABLE and ALTER TABLE?',
    answer:
      'Yes. DDL statements, constraint definitions, foreign key declarations, primary keys, and data types are aligned into readable vertical columns with indentation.',
  },
  {
    question: 'How does Kagazo handle SQL dialect-specific functions and operators?',
    answer:
      'When you select a dialect like PostgreSQL or BigQuery, the tokenizer recognizes custom keywords (like JSONB operators ->> or BigQuery QUALIFY clauses) without corrupting query structure.',
  },
  {
    question: 'Can I format stored procedures, triggers, or transaction blocks?',
    answer:
      'Yes. BEGIN, COMMIT, ROLLBACK, IF/ELSE statements, and transaction scopes are indented hierarchically to make complex procedural logic easy to trace.',
  },
  {
    question: 'Will formatting my SQL query affect its query execution plan (EXPLAIN)?',
    answer:
      'No. SQL database query planners parse SQL into an execution tree independent of formatting whitespace and line breaks. Beautified SQL executes with the exact same query plan and speed while being infinitely easier to maintain.',
  },
  {
    question: 'Can I download the formatted query as a .sql file?',
    answer:
      'Yes. Click "Download SQL" to export the beautified query as a clean .sql file ready for execution in DBeaver, pgAdmin, MySQL Workbench, or DataGrip.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Paste Raw SQL Query',
    desc: 'Paste your unformatted SQL query, complex join sequence, or database migration script into the editor.',
  },
  {
    step: 2,
    title: 'Select Database Dialect',
    desc: 'Choose your DBMS engine (PostgreSQL, MySQL, SQLite, T-SQL, or BigQuery) for dialect-specific syntax.',
  },
  {
    step: 3,
    title: 'Configure Keyword Casing',
    desc: 'Select UPPERCASE for industry-standard readability or choose lowercase depending on team style guides.',
  },
  {
    step: 4,
    title: 'Trigger Instant Formatting',
    desc: 'Click Format SQL to align clauses, indent subqueries, and structure JOIN conditions logically.',
  },
  {
    step: 5,
    title: 'Copy or Download .sql',
    desc: 'Copy the aligned SQL to your clipboard with 1 click or download the ready-to-run .sql file.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: CTE Comma Separation Missing',
    title: 'Chained WITH Clause Syntax Faults',
    desc: 'Common Table Expressions (CTEs) must separate definitions with commas (e.g., WITH a AS (...), b AS (...)). Kagazo formats multi-CTE queries to make missing separators instantly visible.',
  },
  {
    badge: 'Error: Mismatched Subquery Parentheses',
    title: 'Unbalanced Parentheses in Nested Joins',
    desc: 'Deeply nested subqueries often suffer from missing closing parentheses. Kagazo indents each subquery tier to expose parenthesis imbalances immediately.',
  },
  {
    badge: 'Error: Reserved Keyword Identifier Collision',
    title: 'Unquoted Column Names Clashing with Keywords',
    desc: 'Using reserved words (like "order" or "group") as column names causes parser failures unless escaped. The dialect matrix highlights correct quoting per DBMS.',
  },
  {
    badge: 'Error: Non-Sargable WHERE Conditions',
    title: 'Formatting Reveals Hidden Full-Table Scans',
    desc: 'Functions applied to indexed columns (e.g., WHERE YEAR(created_at) = 2026) prevent index usage. Formatting isolates WHERE predicates to help you rewrite them sargably.',
  },
];

export default function SqlFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo SQL Formatter & Query Beautifier',
        url: 'https://kagazo.in/tools/sql-formatter',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Format and beautify complex SQL queries across PostgreSQL, MySQL, SQLite, MariaDB, and T-SQL with customizable indentation and zero server logging.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Format and Beautify SQL Queries Online in 5 Steps',
        description:
          'Step-by-step instructions to format messy SQL strings into clean, readable, standardized database queries.',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
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
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Developer Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'SQL Formatter',
            item: 'https://kagazo.in/tools/sql-formatter',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">SQL Formatter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs sm:text-sm font-semibold text-sky-700 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Multi-Dialect SQL Parser &bull; PostgreSQL, MySQL &amp; T-SQL Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free SQL Formatter &amp; </span>
            <span className="text-sky-600">Query Beautifier Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Format, align, and beautify complex database queries. Supports <strong>PostgreSQL, MySQL, SQLite, T-SQL, and BigQuery</strong> with customizable uppercase keywords and zero server transmission.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <SqlFormatterEngine />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Query Optimization
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Engineered for High-Scale Enterprise Database Engineering
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Messy, unindented SQL slows down code reviews and leads to disastrous production mistakes. Kagazo formats joins, WHERE conditions, and CTEs into easily reviewable hierarchies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-sky-700 flex items-center gap-1.5">
                    <Database className="w-4 h-4" /> 7 Database Dialects
                  </span>
                  <p className="text-xs text-text-main/70">
                    Supports ANSI, PostgreSQL, MySQL, MariaDB, SQLite, BigQuery, and Microsoft T-SQL with correct quotation syntax.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-sky-700 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Uppercase Keywords &amp; CTEs
                  </span>
                  <p className="text-xs text-text-main/70">
                    Standardizes clauses (SELECT, JOIN, WHERE) into uppercase while cleanly formatting recursive WITH expressions.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-sky-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Zero Server Exposure
                  </span>
                  <p className="text-xs text-text-main/70">
                    Queries execute strictly in browser RAM. Proprietary schemas, table names, and customer columns remain 100% private.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-sky-600" />
                    SQL Dialect Syntax &amp; Feature Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Detailed comparison of formatting characteristics, identifier quotes, and pagination across DBMSs.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Dialect Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Dialect</th>
                      <th className="py-3 px-3">Identifier Quotes</th>
                      <th className="py-3 px-3">String Concatenation</th>
                      <th className="py-3 px-3">Pagination Syntax</th>
                      <th className="py-3 px-3">Primary Target &amp; Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {SQL_DIALECT_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.dialect}</td>
                        <td className="py-3 px-3 font-mono text-xs text-sky-700 font-bold">{row.identifierQuotes}</td>
                        <td className="py-3 px-3 font-mono text-xs text-indigo-700">{row.stringConcat}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700">{row.paginationSyntax}</td>
                        <td className="py-3 px-3 text-xs">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Production Tip:</strong> Formatting queries never changes execution plans, but it makes missing join indices and non-sargable WHERE clauses instantly visible during code reviews.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sky-600" />
                How to Format and Beautify SQL Queries in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">{s.title}</h3>
                    <p className="text-xs text-text-main/75 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common SQL Syntax Errors and How Kagazo Fixes Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/80 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deep 10 FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-sky-600" />
                  Frequently Asked Questions (SQL Formatting &amp; Optimization)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights into database dialect formatting, standards, and query safety.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-sky-600 font-black">Q{idx + 1}.</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/80 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Developer Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Formatter
                </Link>
                <Link
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
                </Link>
                <Link
                  href="/tools/markdown-to-html"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Markdown to HTML
                </Link>
                <Link
                  href="/tools/base64-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Encoder
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
