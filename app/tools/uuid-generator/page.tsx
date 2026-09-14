import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Info,
  Sliders,
  Scale,
  Banknote,
  Calculator,
  GraduationCap,
  Award,
  FileCheck2,
  Clock,
  Globe,
  Code2,
  Ruler,
  Coins,
  Heart,
  FileText,
  FileSpreadsheet,
  TrendingUp,
  Building2,
  Languages,
  PenTool,
  Search,
  Fingerprint,
} from 'lucide-react';
import { UuidGeneratorEngine } from '@/components/tools/UuidGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'UUID / GUID v4 Generator Online (Bulk Batch Export) | Kagazo',
  description: 'Generate cryptographically secure RFC 4122 Version 4 UUIDs (Universally Unique Identifiers) and GUIDs online. Bulk generate up to 500 UUIDs instantly with configurable hyphens, uppercase, braces, and JSON export. 100% private in-RAM.',
  alternates: {
    canonical: 'https://kagazo.in/tools/uuid-generator',
  },
  openGraph: {
    title: 'UUID / GUID v4 Generator Online (Bulk Batch Export) | Kagazo',
    description: 'Generate cryptographically secure RFC 4122 Version 4 UUIDs (Universally Unique Identifiers) and GUIDs online. Bulk generate up to 500 UUIDs instantly with configurable hyphens, uppercase, braces, and JSON export. 100% private in-RAM.',
    url: 'https://kagazo.in/tools/uuid-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID / GUID v4 Generator Online (Bulk Batch Export) | Kagazo',
    description: 'Generate cryptographically secure RFC 4122 Version 4 UUIDs (Universally Unique Identifiers) and GUIDs online. Bulk generate up to 500 UUIDs instantly with configurable hyphens, uppercase, braces, and JSON export. 100% private in-RAM.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Quantity",
    "desc": "Choose single UUID generation or bulk generation (up to 500 identifiers in a batch)."
  },
  {
    "step": 2,
    "title": "Choose Case Formatting",
    "desc": "Toggle between standard lowercase (recommended) or uppercase for legacy Windows GUIDs."
  },
  {
    "step": 3,
    "title": "Configure Hyphens & Braces",
    "desc": "Include standard 8-4-4-4-12 hyphens, strip hyphens for clean 32-char hex, or wrap in curly braces {}."
  },
  {
    "step": 4,
    "title": "Instant Generation",
    "desc": "Click Generate to execute hardware-accelerated cryptographically secure generation."
  },
  {
    "step": 5,
    "title": "Copy or Export File",
    "desc": "1-click copy clean plain text, download formatted .txt file, or export as a JSON array."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Storing UUID as 36-Byte Strings",
    "title": "Wasting 2.25x Database Storage",
    "desc": "Storing UUIDs as VARCHAR(36) consumes 36 bytes per row plus index overhead. High-performance databases (Postgres, MySQL 8+) should store UUIDs as native 16-byte binary(16) or uuid data types."
  },
  {
    "badge": "Error: Stripping Hyphens Unchecked",
    "title": "Incompatible Formatting for Third-Party APIs",
    "desc": "Many strict parsers (Java UUID.fromString(), Python uuid.UUID) expect canonical 8-4-4-4-12 hyphenated strings. Verify whether downstream APIs accept raw 32-character hex."
  },
  {
    "badge": "Error: Index Fragmentation with Random UUIDv4",
    "title": "B-Tree Cache Thrashing in High-Volume Tables",
    "desc": "Because UUIDv4 is completely random, inserts scatter across index pages, causing frequent disk page splits. For tables with millions of daily inserts, adopt time-ordered UUIDv7 or ULID."
  },
  {
    "badge": "Error: Using Math.random() for Generation",
    "title": "Predictable Collisions in High-Concurrency APIs",
    "desc": "Standard JavaScript Math.random() is not cryptographically secure and repeats seeds in multi-threaded containers. Always use crypto.randomUUID() based on hardware entropy."
  }
];

const FAQS = [
  {
    "question": "What is a UUID / GUID and what does it stand for?",
    "answer": "UUID stands for Universally Unique Identifier (standardized by the Open Software Foundation and IETF RFC 4122). GUID stands for Globally Unique Identifier, Microsoft implementation of the identical 128-bit specification. They are functionally equivalent."
  },
  {
    "question": "What is the probability of two UUID v4 identifiers colliding?",
    "answer": "A Version 4 UUID contains 122 bits of pure randomness. The probability of generating a duplicate is approximately 1 in 2.71 quintillion (2.71 x 10^18). To have a 50% chance of a single collision, you would need to generate 1 billion UUIDs per second for 85 consecutive years."
  },
  {
    "question": "How can I identify the version of a UUID from its string?",
    "answer": "Inspect the first character of the third segment (e.g. xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx). The character \"M\" defines the version: \"4\" for UUIDv4, \"1\" for UUIDv1, \"7\" for UUIDv7. The character \"N\" indicates the variant (typically 8, 9, a, or b for RFC 4122)."
  },
  {
    "question": "Why are UUIDs better than auto-incrementing integer IDs?",
    "answer": "Auto-incrementing integer IDs (1, 2, 3...) leak sensitive business metrics (e.g., exposing total order volume via order ID URLs), are vulnerable to scraping attacks, and cause severe primary key collisions when merging distributed databases or sharding across microservices."
  },
  {
    "question": "Are generated UUIDs tracked or stored on Kagazo servers?",
    "answer": "No. All UUIDs are generated 100% locally in your web browser using crypto.randomUUID() and client-side JavaScript loops. Zero identifiers are transmitted or logged on external servers."
  },
  {
    "question": "What is the difference between UUIDv4 and UUIDv7?",
    "answer": "UUIDv4 is completely random (122 random bits). UUIDv7 combines a 48-bit Unix epoch millisecond timestamp with 74 random bits. This allows UUIDv7 to sort chronologically, preventing B-tree index fragmentation in database engines."
  },
  {
    "question": "Can I generate UUIDs in bulk for database seeding?",
    "answer": "Yes. You can generate up to 500 UUIDs per batch, configure formatting (uppercase, lowercase, no hyphens, braces), and export them as plain text, CSV, or a structured JSON array for database seeding."
  },
  {
    "question": "How do I generate a UUIDv4 in JavaScript / Node.js?",
    "answer": "In modern browsers and Node.js v14.17+: const id = crypto.randomUUID(); It requires zero external dependencies and runs with native hardware entropy."
  },
  {
    "question": "How do I generate a UUIDv4 in Python?",
    "answer": "In Python standard library: import uuid; id = str(uuid.uuid4())."
  },
  {
    "question": "What is the canonical format of a UUID?",
    "answer": "The canonical RFC 4122 format is a 36-character string consisting of 32 hexadecimal digits displayed in 5 groups separated by hyphens: 8-4-4-4-12 (e.g. 550e8400-e29b-41d4-a716-446655440000)."
  }
];

export default function UuidGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'UUID / GUID v4 Generator',
        url: 'https://kagazo.in/tools/uuid-generator',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate cryptographically secure RFC 4122 Version 4 UUIDs (Universally Unique Identifiers) and GUIDs online. Bulk generate up to 500 UUIDs instantly with configurable hyphens, uppercase, braces, and JSON export. 100% private in-RAM.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate UUIDs in 5 Steps',
        description: 'Step-by-step verified workflow instructions for UUID / GUID v4 Generator.',
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
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'UUID / GUID v4 Generator',
            item: 'https://kagazo.in/tools/uuid-generator',
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

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">UUID / GUID v4 Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>122 Bits CSPRNG Randomness • Bulk Batch Export</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>RFC 4122 UUID & GUID v4 Generator </span>
            <span className="text-primary">Batch Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate cryptographically secure RFC 4122 Version 4 UUIDs (Universally Unique Identifiers) and GUIDs online. Bulk generate up to 500 UUIDs instantly with configurable hyphens, uppercase, braces, and JSON export. 100% private in-RAM.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <UuidGeneratorEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Compliance Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> CSPRNG Randomness
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generated using crypto.randomUUID() and hardware entropy pools, guaranteeing zero predictable PRNG sequences.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Bulk Batch Generation
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instantly create up to 500 unique identifiers in a single millisecond with customizable delimiters.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Developer Formats
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Export with or without hyphens, curly braces (GUID), UPPERCASE, lowercase, or structured JSON array.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    RFC 4122 Universally Unique Identifier (UUID) Version Architecture
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  IETF RFC 4122 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">UUID Version</th><th className="py-2.5 px-3 font-bold">Generation Mechanism</th><th className="py-2.5 px-3 font-bold">Collision Probability</th><th className="py-2.5 px-3 font-bold">Primary Industry Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Version 4 (UUIDv4)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">122 bits of CSPRNG hardware randomness</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1 in 2.71 x 10^18 (Virtually Impossible)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Database primary keys, distributed systems, REST APIs</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Version 1 (UUIDv1)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Timestamp (60-bit) + Node MAC address</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High safety, but leaks hardware MAC address</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Legacy systems, single-node sequential clustering</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Version 7 (UUIDv7)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Unix Epoch Timestamp (48-bit) + Randomness</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Virtually zero collision; sorts chronologically</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Modern time-ordered database B-Trees (PostgreSQL, MySQL)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Version 5 (UUIDv5)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SHA-1 hashing of namespace + unique string</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Deterministic; same input yields same UUID</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Consistent entity mapping across distributed databases</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Canonical Format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">32 Hexadecimal digits in 8-4-4-4-12 pattern</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">e.g. 123e4567-e89b-12d3-a456-426614174000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard 36-character string representation</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Memory Size</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">128 Bits total (16 Bytes binary)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Stored as binary(16) or uuid type in SQL</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High-efficiency database indexing and foreign keys</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate UUIDs in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and verified results:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{step.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Common UUID Architecture Mistakes & Database Pitfalls
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common formatting errors, legal omissions, and calculation pitfalls:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Strict 10 Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Comprehensive technical, legal, and operational answers
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  10 Questions Answered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Key Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                UUID Criteria
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">RFC 4122 v4</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    122 bits of cryptographic hardware randomness.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Bulk Export</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Generate up to 500 UUIDs per batch in 1 click.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Zero Tracking</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% client-side crypto.randomUUID() execution.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>
              <div className="space-y-1.5">
                <Link
                  href="/tools/hash-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Cryptographic Hash Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Crypto
                  </span>
                </Link>
                <Link
                  href="/tools/password-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Strong Password Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Security
                  </span>
                </Link>
                <Link
                  href="/tools/unix-timestamp-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Unix Timestamp Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Epoch
                  </span>
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-3 space-y-1.5 text-text-main/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Lock className="w-3.5 h-3.5" />
                <span>100% In-RAM Privacy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-main/70">
                All calculations and security operations occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
