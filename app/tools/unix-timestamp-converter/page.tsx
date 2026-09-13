import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Clock,
  Calendar,
  Globe,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { TimestampConverterEngine } from '@/components/tools/TimestampConverterEngine';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter | Epoch to Human Date & Time | Kagazo',
  description:
    'Free online Unix timestamp converter. Convert epoch seconds and milliseconds to UTC and local human-readable dates. Real-time live epoch ticker and relative time calculator.',
  alternates: {
    canonical: 'https://kagazo.in/tools/unix-timestamp-converter',
  },
  openGraph: {
    title: 'Unix Timestamp Converter | Epoch to Human Date | Kagazo',
    description: 'Convert Unix epoch timestamps to human dates and vice-versa in real time with UTC and local timezone support.',
    url: 'https://kagazo.in/tools/unix-timestamp-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function UnixTimestampConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Unix Timestamp & Epoch Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Convert Unix epoch timestamps to human readable dates, ISO 8601, and local timezones instantly.',
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Unix Timestamp Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>Developer Epoch & ISO 8601 Date Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Unix Timestamp Converter
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert epoch timestamps (seconds & milliseconds) to human-readable dates and vice-versa. Includes live ticker, timezone display, and relative token expiry calculation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Globe className="w-4 h-4 text-primary" /> UTC & Local Timezones
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-amber-500" /> Instant Live Conversion
            </span>
          </div>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <TimestampConverterEngine />

            {/* Educational Guide */}
            <article className="prose prose-sm max-w-none bg-surface/60 border border-surface-darker rounded-2xl p-6 sm:p-8 space-y-6 text-text-main/90">
              <h2 className="text-xl font-bold text-text-main border-b border-surface-darker pb-3">
                Understanding Unix Epoch Time
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> What is Unix Time?
                  </h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Unix time (also known as Epoch or POSIX time) counts the number of seconds that have elapsed since <strong>00:00:00 UTC on January 1, 1970</strong> (the Unix epoch), minus leap seconds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> Seconds vs Milliseconds
                  </h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Unix systems, Python, and PHP typically store timestamps as <strong>10-digit seconds</strong> (e.g. <code>1715000000</code>), while JavaScript (<code>Date.now()</code>) and Java use <strong>13-digit milliseconds</strong>.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-text-main pt-4">Frequently Asked Questions</h3>
              <div className="space-y-4 not-prose">
                <div className="p-4 rounded-xl bg-surface border border-surface-darker">
                  <h4 className="text-xs font-bold text-text-main mb-1">What is the Year 2038 problem (Y2038)?</h4>
                  <p className="text-xs text-text-main/70">
                    On January 19, 2038 at 03:14:07 UTC, 32-bit signed integers will overflow. Modern 64-bit operating systems and databases use 64-bit integers, preventing overflow for hundreds of billions of years.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-surface-darker">
                  <h4 className="text-xs font-bold text-text-main mb-1">Does this converter send date information to any server?</h4>
                  <p className="text-xs text-text-main/70">
                    No. All time calculations execute entirely in your web browser RAM using native JavaScript date APIs.
                  </p>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Developer Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/unit-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Unit Converter Matrix
                </Link>
                <Link
                  href="/tools/hash-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Hash Generator
                </Link>
                <Link
                  href="/tools/uuid-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  UUID v4 Generator
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Studio
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-4 space-y-2 text-center">
              <Lock className="w-5 h-5 text-primary mx-auto" />
              <div className="text-xs font-bold text-text-main">Client-Side Verification</div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Zero network requests. Safe for confidential server logs, auth tokens, and session cookies.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
