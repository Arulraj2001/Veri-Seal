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
} from 'lucide-react';
import { TimestampConverterEngine } from '@/components/tools/TimestampConverterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter | Epoch to Human Date & Time | Kagazo',
  description: 'Free online Unix timestamp converter. Convert epoch seconds, milliseconds, and microseconds to UTC and local human-readable dates. Real-time live epoch clock, ISO 8601, and timezone offset calculator. 100% private in-RAM.',
  alternates: {
    canonical: 'https://kagazo.in/tools/unix-timestamp-converter',
  },
  openGraph: {
    title: 'Unix Timestamp Converter | Epoch to Human Date & Time | Kagazo',
    description: 'Free online Unix timestamp converter. Convert epoch seconds, milliseconds, and microseconds to UTC and local human-readable dates. Real-time live epoch clock, ISO 8601, and timezone offset calculator. 100% private in-RAM.',
    url: 'https://kagazo.in/tools/unix-timestamp-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unix Timestamp Converter | Epoch to Human Date & Time | Kagazo',
    description: 'Free online Unix timestamp converter. Convert epoch seconds, milliseconds, and microseconds to UTC and local human-readable dates. Real-time live epoch clock, ISO 8601, and timezone offset calculator. 100% private in-RAM.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Paste Timestamp or Date",
    "desc": "Enter an epoch integer (10 or 13 digits) or select a human calendar date from the date picker."
  },
  {
    "step": 2,
    "title": "Auto-Detect Precision",
    "desc": "Kagazo automatically identifies whether your number is in seconds, milliseconds, or microseconds."
  },
  {
    "step": 3,
    "title": "Select Target Timezone",
    "desc": "Toggle between UTC/GMT, your local browser timezone, Indian Standard Time (IST), or US timezones."
  },
  {
    "step": 4,
    "title": "View Multi-Format Output",
    "desc": "Inspect formatted calendar dates, relative time (e.g. 2 hours ago), ISO 8601, and RFC 2822 strings."
  },
  {
    "step": 5,
    "title": "Copy Code Snippets",
    "desc": "1-click copy language-specific code snippets for Python, Node.js, Go, PHP, and SQL queries."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: 10 vs 13 Digit Confusion",
    "title": "Passing Seconds to a Millisecond Parser",
    "desc": "Passing a 10-digit timestamp (seconds) into JavaScript new Date(timestamp) returns dates in 1970 because JS expects 13 digits (milliseconds). Kagazo auto-scales values to avoid off-by-millennium bugs."
  },
  {
    "badge": "Error: Timezone Offset Blindness",
    "title": "Assuming Epoch Time Varies by Location",
    "desc": "Unix timestamp is identical worldwide: the exact seconds elapsed since 1970-01-01 00:00:00 UTC. The difference lies only in the local timezone representation added during display."
  },
  {
    "badge": "Error: Year 2038 Problem (Y2038)",
    "title": "32-Bit Signed Integer Overflow",
    "desc": "On 2038-01-19 03:14:07 UTC, 32-bit signed integers overflow to negative values (-2147483648), resetting dates to 1901. Modern systems must adopt 64-bit integer timestamp architectures."
  },
  {
    "badge": "Error: Daylight Saving Time (DST) Shift",
    "title": "Hardcoding Fixed 3600-Second Day Offsets",
    "desc": "Assuming every day has 86,400 seconds breaks during Daylight Saving Time transition days (which have 82,800 or 90,000 seconds). Always use calendar-aware timezone libraries."
  }
];

const FAQS = [
  {
    "question": "What is a Unix timestamp (Epoch time)?",
    "answer": "Unix timestamp (also known as Epoch time or POSIX time) is the number of seconds that have elapsed since Thursday, January 1, 1970 at 00:00:00 Coordinated Universal Time (UTC), not counting leap seconds."
  },
  {
    "question": "How can I tell if a timestamp is in seconds or milliseconds?",
    "answer": "Standard timestamps in seconds are 10 digits long (e.g. 1742035200 represents year 2025). Timestamps in milliseconds are 13 digits long (e.g. 1742035200000). Microseconds are 16 digits and nanoseconds are 19 digits."
  },
  {
    "question": "What is the Year 2038 Problem (Y2038)?",
    "answer": "Legacy systems storing Unix timestamps as 32-bit signed integers will overflow on January 19, 2038 at 03:14:07 UTC when the integer exceeds 2,147,483,647. Modern 64-bit systems will not overflow for another 292 billion years."
  },
  {
    "question": "How do I convert a Unix timestamp to human date in JavaScript?",
    "answer": "In JavaScript, multiply seconds by 1000: new Date(timestamp * 1000).toISOString() or new Date(timestamp * 1000).toLocaleString() for local time."
  },
  {
    "question": "How do I convert a Unix timestamp to human date in Python?",
    "answer": "In Python: from datetime import datetime, timezone; dt = datetime.fromtimestamp(timestamp, tz=timezone.utc); print(dt.isoformat())."
  },
  {
    "question": "How do I get the current Unix timestamp in SQL?",
    "answer": "In PostgreSQL: EXTRACT(EPOCH FROM NOW()); In MySQL: UNIX_TIMESTAMP(); In SQLite: unixepoch(); In SQL Server: DATEDIFF(s, \"1970-01-01\", GETUTCDATE())."
  },
  {
    "question": "Does Unix timestamp change based on timezones?",
    "answer": "No. Unix timestamp is fundamentally timezone-independent and universal. A single epoch timestamp represents the exact same physical moment anywhere on Earth, while local clocks display different local offsets."
  },
  {
    "question": "What is ISO 8601 date format and why is it preferred?",
    "answer": "ISO 8601 (e.g. 2026-03-15T14:30:00Z) is the international standard for date and time representation. It eliminates date ambiguity (DD/MM vs MM/DD) and sorts alphabetically in chronological order."
  },
  {
    "question": "Is this Unix converter private and secure?",
    "answer": "Yes. All parsing, conversions, and code generation occur 100% client-side inside your browser JavaScript runtime. Zero timestamps or queries are transmitted over network connections."
  },
  {
    "question": "How can I convert negative Unix timestamps?",
    "answer": "Negative Unix timestamps represent dates prior to January 1, 1970. For example, -31536000 corresponds to January 1, 1969 00:00:00 UTC. Kagazo supports both positive and negative epoch integers."
  }
];

export default function UnixTimestampConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Unix Timestamp Converter',
        url: 'https://kagazo.in/tools/unix-timestamp-converter',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Free online Unix timestamp converter. Convert epoch seconds, milliseconds, and microseconds to UTC and local human-readable dates. Real-time live epoch clock, ISO 8601, and timezone offset calculator. 100% private in-RAM.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Unix Timestamps in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Unix Timestamp Converter.',
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
            name: 'Unix Timestamp Converter',
            item: 'https://kagazo.in/tools/unix-timestamp-converter',
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
          <span className="text-primary font-bold">Unix Timestamp Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Seconds, Milliseconds & ISO 8601 • Live Epoch Ticker</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Universal Unix Timestamp & </span>
            <span className="text-primary">Epoch Converter Matrix</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Free online Unix timestamp converter. Convert epoch seconds, milliseconds, and microseconds to UTC and local human-readable dates. Real-time live epoch clock, ISO 8601, and timezone offset calculator. 100% private in-RAM.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <TimestampConverterEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Live Epoch Ticker
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Real-time tick display of current Unix epoch time in seconds, milliseconds, and microseconds.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Timezone Matrix
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instant simultaneous conversion across UTC, GMT, Indian Standard Time (IST), EST, PST, and local browser time.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Multi-Language Snippets
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Copy ready-to-use timestamp conversion code for JavaScript, Python, Go, PHP, Java, and SQL.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Unix Epoch Timestamp Precision & Representation Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  POSIX Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Precision Level</th><th className="py-2.5 px-3 font-bold">Digit Length</th><th className="py-2.5 px-3 font-bold">Example Timestamp</th><th className="py-2.5 px-3 font-bold">Common Industry Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Seconds (s)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">10 digits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1742035200</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard Unix time, Linux system logs, JWT tokens (exp, iat), HTTP headers</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Milliseconds (ms)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">13 digits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1742035200000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">JavaScript Date.now(), Java System.currentTimeMillis(), MongoDB ObjectId</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Microseconds (us)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">16 digits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1742035200000000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PostgreSQL TIMESTAMP, Python datetime, high-performance tracing (Jaeger)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Nanoseconds (ns)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">19 digits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1742035200000000000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Go time.Now().UnixNano(), Linux kernel timers, high-frequency trading (HFT)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO 8601 Format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">String</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2026-03-15T12:00:00Z</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">REST APIs, JSON payloads, OpenAPI specifications, cloud databases</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 2822 Format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">String</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Sun, 15 Mar 2026 12:00:00 +0000</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Email headers, RSS/Atom feeds, legacy HTTP protocol headers</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert Unix Timestamps in 5 Steps
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
                  Common Epoch Conversion Errors & Developer Bugs
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
                Epoch Reference
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard Epoch</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Seconds elapsed since Jan 1, 1970 00:00:00 UTC.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Auto-Detection</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Identifies 10-digit (s) vs 13-digit (ms) precision.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Code Generator</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Instant snippets for JS, Python, Go, and SQL.
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
                  href="/tools/unit-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Universal Unit Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Utility
                  </span>
                </Link>
                <Link
                  href="/tools/number-to-words-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Number to Words Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Finance
                  </span>
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      JSON Formatter & Validator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Code
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
                All calculations and document drafting occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
