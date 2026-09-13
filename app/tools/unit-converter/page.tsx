import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Ruler,
  ArrowRightLeft,
  Scale,
  Thermometer,
  HardDrive,
  Gauge,
  Lock
} from 'lucide-react';
import { UnitConverterEngine } from '@/components/tools/UnitConverterEngine';

export const metadata: Metadata = {
  title: 'Free Unit Converter Online | Length, Weight, Temperature & Data | Kagazo',
  description:
    'Convert units instantly online across length, weight/mass, temperature, digital storage (1024 binary bytes), speed, area, and time with live bi-directional precision.',
  alternates: {
    canonical: 'https://kagazo.in/tools/unit-converter',
  },
  openGraph: {
    title: 'Free Unit Converter Online | Kagazo',
    description: 'Instant bi-directional unit conversion for length, mass, temperature, bytes, speed, and time.',
    url: 'https://kagazo.in/tools/unit-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function UnitConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Unit Converter Studio',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Universal unit converter supporting metric and imperial units across length, weight, data storage, and temperature.',
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
          <span className="text-primary font-bold">Unit Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Ruler className="w-4 h-4 text-primary shrink-0" />
            <span>Universal Multi-Category Measurement Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Universal Unit Converter Matrix
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert metric and imperial units with live bi-directional calculation. Covers length, weight, temperature, digital data (bytes to TB), speed, and area.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Client-Side Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ArrowRightLeft className="w-4 h-4 text-primary" /> Live Bi-Directional
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <HardDrive className="w-4 h-4 text-blue-600" /> Binary 1024 Storage
            </span>
          </div>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UnitConverterEngine />

            {/* Educational Guide */}
            <article className="prose prose-sm max-w-none bg-surface/60 border border-surface-darker rounded-2xl p-6 sm:p-8 space-y-6 text-text-main/90">
              <h2 className="text-xl font-bold text-text-main border-b border-surface-darker pb-3">
                Metric & Imperial Measurement Standards
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-xs font-bold text-text-main flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-primary" /> Distance Standards
                  </h3>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    1 Meter equals precisely 3.28084 feet or 39.3701 inches. 1 Kilometer equals 0.621371 miles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-xs font-bold text-text-main flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-blue-500" /> Binary Data Units
                  </h3>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    In computer science and RAM, 1 KB = 1024 Bytes, 1 MB = 1024 KB, and 1 GB = 1024 MB.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-xs font-bold text-text-main flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-rose-500" /> Temperature Formulations
                  </h3>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    °F = (°C × 9/5) + 32, and Kelvin = °C + 273.15. Absolute zero is 0 K or -273.15 °C.
                  </p>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Math & Data Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/unix-timestamp-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Unix Timestamp Converter
                </Link>
                <Link
                  href="/tools/number-to-words-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Number to Words
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
                  UUID Generator
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-4 space-y-2 text-center">
              <Lock className="w-5 h-5 text-primary mx-auto" />
              <div className="text-xs font-bold text-text-main">Client-Side Calculation</div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Computations execute instantaneously in browser memory. No data sent to any server.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
