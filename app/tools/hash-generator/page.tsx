import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  KeyRound,
  FileCode,
  Lock,
  Upload,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { HashGeneratorEngine } from '@/components/tools/HashGeneratorEngine';

export const metadata: Metadata = {
  title: 'Free Hash Generator Online | SHA-256, SHA-512 & MD5 Checksum | Kagazo',
  description:
    'Generate SHA-256, SHA-512, SHA-384, SHA-1, and MD5 cryptographic hashes from text or files in real time. 100% in-browser Web Crypto API without uploading files.',
  alternates: {
    canonical: 'https://kagazo.in/tools/hash-generator',
  },
  openGraph: {
    title: 'Free Hash Generator Online | SHA-256 & MD5 | Kagazo',
    description: 'Generate SHA-256, SHA-512, and MD5 cryptographic hashes online with client-side file checksum verification.',
    url: 'https://kagazo.in/tools/hash-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function HashGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cryptographic Hash Generator & Checksum Verifier',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Cryptographic hash calculator for SHA256, SHA512, MD5, and file checksum matching with zero server transfers.',
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
          <span className="text-primary font-bold">Hash Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <KeyRound className="w-4 h-4 text-primary shrink-0" />
            <span>Cryptographic Hashing & File Integrity Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Cryptographic Hash Generator
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Generate cryptographic digests including <strong>SHA-256, SHA-512, MD5, SHA-384, and SHA-1</strong>. Compute checksums of files directly in browser RAM and verify matching signatures.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Web Crypto API (No Server Uploads)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Upload className="w-4 h-4 text-primary" /> File Integrity Checksum
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-amber-500" /> Real-Time Live Digest
            </span>
          </div>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HashGeneratorEngine />

            {/* Educational Guide */}
            <article className="prose prose-sm max-w-none bg-surface/60 border border-surface-darker rounded-2xl p-6 sm:p-8 space-y-6 text-text-main/90">
              <h2 className="text-xl font-bold text-text-main border-b border-surface-darker pb-3">
                Cryptographic Hashing Explained
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> SHA-256 (Standard)
                  </h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    SHA-256 produces a 256-bit (64 hex characters) one-way hash. It is mathematically collision-resistant and forms the security bedrock of SSL/TLS certificates and Bitcoin transactions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-amber-500" /> MD5 & SHA-1
                  </h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    MD5 produces a 128-bit (32 hex characters) digest. While collision vulnerabilities make it unsuitable for password storage, it remains widely used for software download checksums.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-text-main pt-4">How to Verify File Integrity</h3>
              <p className="text-xs text-text-main/80 leading-relaxed">
                When you download Linux ISOs or software releases, vendors provide a checksum (like a <code>SHA256SUMS</code> file). Upload your downloaded file into our tool and paste the vendor&apos;s hash in the Checksum Matcher to guarantee your file was not corrupted or injected with malware during download.
              </p>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Security Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/password-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Password Generator
                </Link>
                <Link
                  href="/tools/uuid-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  UUID v4 Generator
                </Link>
                <Link
                  href="/tools/base64-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Studio
                </Link>
                <Link
                  href="/tools/unix-timestamp-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Timestamp Converter
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-4 space-y-2 text-center">
              <Lock className="w-5 h-5 text-primary mx-auto" />
              <div className="text-xs font-bold text-text-main">100% In-RAM Cryptography</div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Utilizes the browser-native W3C Web Cryptography API. Zero bytes ever leave your machine.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
