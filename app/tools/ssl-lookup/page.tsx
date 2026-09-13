import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Calendar,
  Layers,
  FileCheck,
  Award,
} from 'lucide-react';
import { SslLookupEngine } from '@/components/tools/SslLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free SSL Certificate Checker & Expiry Countdown | Inspect TLS 1.3 & SANs | Kagazo',
  description:
    'Test domain SSL/TLS certificate validity, issuer, SANs (Subject Alternative Names), expiration countdown, and negotiated cipher suites. Never let an SSL certificate expire unnoticed.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ssl-lookup',
  },
  openGraph: {
    title: 'Free SSL Certificate Checker & Expiration Countdown | Kagazo',
    description: 'Verify domain SSL/TLS certificates, expiry days countdown, SAN domains, and cipher suites.',
    url: 'https://kagazo.in/tools/ssl-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do I know if my SSL certificate is valid and trusted?',
    answer:
      'Kagazo connects directly to port 443 of your web server and performs a full TLS handshake. If the certificate is issued by an approved root Certificate Authority (CA) and has not expired, it reports "SSL Valid & Trusted".',
  },
  {
    question: 'What are Subject Alternative Names (SANs)?',
    answer:
      'SANs allow a single SSL certificate to secure multiple domain names and subdomains (e.g., example.com, www.example.com, api.example.com) under one unified encryption certificate.',
  },
  {
    question: 'What happens when an SSL certificate expires?',
    answer:
      'When an SSL certificate expires, web browsers display a severe security barrier (e.g., "Your connection is not private" or "SEC_ERROR_EXPIRED_CERTIFICATE"), which blocks users from visiting your website and damages search engine rankings.',
  },
  {
    question: 'Which TLS version is the most secure today?',
    answer:
      'TLS 1.3 is the latest, fastest, and most secure transport protocol. It removes legacy vulnerable ciphers and completes cryptographic handshakes in just 1 round trip (1-RTT). TLS 1.2 remains widely supported and secure.',
  },
];

export default function SslLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'SSL Certificate Checker & Expiry Monitor',
        url: 'https://kagazo.in/tools/ssl-lookup',
        applicationCategory: 'SecurityApplication',
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
        name: 'How to check SSL certificate expiration and validity',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Domain',
            text: 'Enter any website hostname (e.g., stripe.com or app.example.com).',
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect TLS Handshake',
            text: 'Click Inspect SSL to connect to port 443 and retrieve the x509 certificate.',
          },
          {
            '@type': 'HowToStep',
            name: 'Review Expiry & SANs',
            text: 'Check remaining days until expiration, issuer authority, and multi-domain SANs.',
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
          <span className="text-primary font-bold">SSL Lookup</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-700 shadow-2xs">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Port 443 TLS Handshake • Real-Time x509 Inspection</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            SSL Certificate Checker & Expiry Monitor
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Verify SSL/TLS certificate health instantly. Check <strong>days until expiration</strong>, certificate authority (CA), cipher suites, and protected Subject Alternative Names (SANs).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Root CA Chain Verification
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Calendar className="w-4 h-4 text-primary" /> Expiration Countdown
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Layers className="w-4 h-4 text-blue-600" /> TLS 1.3 & Cipher Audit
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SslLookupEngine />

            {/* Educational Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Key Components of an SSL/TLS Certificate
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  Every secure HTTPS transaction relies on cryptographic validation. Here is what our inspector checks:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Expiry Countdown (Days Left)
                  </span>
                  <p className="leading-relaxed">
                    Most modern certificates (like Let’s Encrypt or Google Trust Services) expire every 90 days. Tracking remaining days prevents downtime.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Multi-Domain SANs
                  </span>
                  <p className="leading-relaxed">
                    Subject Alternative Names list all wildcards and alternative subdomains covered by this same cryptographic public key.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" /> Certificate Authority (CA) Chain
                  </span>
                  <p className="leading-relaxed">
                    Verifies that the certificate traces back to a trusted root authority pre-installed in operating system trust stores.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Cryptographic Cipher Suite
                  </span>
                  <p className="leading-relaxed">
                    Inspects symmetric encryption (e.g. AES-GCM or ChaCha20-Poly1305) and key exchange algorithms negotiated during the handshake.
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
                Related Security Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/dns-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  DNS Record Lookup
                </Link>
                <Link
                  href="/tools/whois-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  WHOIS Domain Lookup
                </Link>
                <Link
                  href="/tools/http-headers-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTTP Headers & Redirects
                </Link>
                <Link
                  href="/tools/ip-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  IP Geolocation & ASN
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Zero Storage</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Inspections are performed live in RAM without caching hostnames.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
