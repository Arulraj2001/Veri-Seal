import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Fingerprint,
  RefreshCw,
  Lock,
  Download,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { UuidGeneratorEngine } from '@/components/tools/UuidGeneratorEngine';

export const metadata: Metadata = {
  title: 'Free UUID / GUID v4 Generator Online | Bulk RFC 4122 Generator | Kagazo',
  description:
    'Generate cryptographically secure UUID v4 (Universally Unique Identifiers) and Microsoft GUIDs online. Bulk generate up to 100 UUIDs with custom hyphens, braces, and uppercase formatting.',
  alternates: {
    canonical: 'https://kagazo.in/tools/uuid-generator',
  },
  openGraph: {
    title: 'Free UUID / GUID v4 Generator | Kagazo',
    description: 'Generate cryptographically secure UUID v4 and GUIDs online with bulk export and customizable formats.',
    url: 'https://kagazo.in/tools/uuid-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function UuidGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UUID / GUID Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'RFC 4122 compliant UUID v4 generator using CSPRNG for databases, distributed systems, and API keys.',
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
          <span className="text-primary font-bold">UUID Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Fingerprint className="w-4 h-4 text-primary shrink-0" />
            <span>RFC 4122 Compliant Random Identifier Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            UUID / GUID v4 Generator
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Generate cryptographically secure Version 4 UUIDs (Universally Unique Identifiers) powered by Web Cryptography CSPRNG. Export in bulk with custom casing, hyphens, and braces.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> CSPRNG Cryptographic Randomness
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Download className="w-4 h-4 text-primary" /> Bulk JSON / TXT Export
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-amber-500" /> RFC 4122 Strict Standard
            </span>
          </div>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UuidGeneratorEngine />

            {/* Educational Guide */}
            <article className="prose prose-sm max-w-none bg-surface/60 border border-surface-darker rounded-2xl p-6 sm:p-8 space-y-6 text-text-main/90">
              <h2 className="text-xl font-bold text-text-main border-b border-surface-darker pb-3">
                Everything You Need to Know About UUID v4
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-primary" /> What is a UUID v4?
                  </h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    A Version 4 UUID is a 128-bit number composed of 32 hexadecimal characters and 4 hyphens. 122 bits are cryptographically random, providing <strong>5.3 × 10<sup>36</sup></strong> unique combinations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Collision Probability
                  </h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    The chance of generating a duplicate UUID v4 is negligible. You would need to generate 1 billion UUIDs per second for 85 years to have a 50% probability of a single collision.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-text-main pt-4">UUID vs Microsoft GUID</h3>
              <p className="text-xs text-text-main/80 leading-relaxed">
                GUID (Globally Unique Identifier) is Microsoft&apos;s implementation of the UUID standard. They share the identical 128-bit format. Microsoft tools typically display GUIDs in uppercase with curly braces (e.g., <code>&#123;B7C2A9...&#125;</code>).
              </p>
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
                  href="/tools/hash-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Hash Generator
                </Link>
                <Link
                  href="/tools/password-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Password Generator
                </Link>
                <Link
                  href="/tools/unix-timestamp-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Timestamp Converter
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
              <div className="text-xs font-bold text-text-main">CSPRNG Entropy</div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Generated using your operating system&apos;s cryptographically secure pseudo-random number generator.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
