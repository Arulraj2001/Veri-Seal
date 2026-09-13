import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Globe2,
  Server,
  FileCheck,
  Search,
} from 'lucide-react';
import { DnsLookupEngine } from '@/components/tools/DnsLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free DNS Lookup Tool | Check A, AAAA, MX, TXT, NS & CAA Records | Kagazo',
  description:
    'Perform instant authoritative DNS lookups with Cloudflare DoH. Inspect A, AAAA, CNAME, MX, TXT, NS, SOA, and CAA records with exact TTL and export to BIND zone files.',
  alternates: {
    canonical: 'https://kagazo.in/tools/dns-lookup',
  },
  openGraph: {
    title: 'Free DNS Lookup Tool | Check All DNS Records Instantly | Kagazo',
    description: 'Inspect domain DNS records (A, MX, TXT, NS, CAA) with real-time TTL and zone file export.',
    url: 'https://kagazo.in/tools/dns-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is a DNS Lookup and how does it work?',
    answer:
      'A DNS (Domain Name System) lookup queries authoritative nameservers to translate human-friendly domain names (e.g. example.com) into machine-readable IP addresses and routing configurations, such as mail exchangers (MX) and verification tokens (TXT).',
  },
  {
    question: 'What types of DNS records can I inspect?',
    answer:
      'Kagazo inspects all primary DNS record types: A (IPv4), AAAA (IPv6), CNAME (Canonical Name Aliases), MX (Mail Exchangers with priority), TXT (SPF, DKIM, site verification tokens), NS (Authoritative Name Servers), SOA (Start of Authority), and CAA (Certificate Authority Authorization).',
  },
  {
    question: 'What is TTL in DNS records?',
    answer:
      'TTL (Time to Live) is a numerical value in seconds that indicates how long resolvers and caching servers (like ISPs or public DNS providers) should cache the DNS record before requesting a fresh copy from the authoritative nameserver.',
  },
  {
    question: 'Why are my updated DNS records not showing immediately?',
    answer:
      'When you update DNS records at your registrar or hosting provider, previous records remain cached in intermediate resolvers worldwide until their TTL countdown expires. This propagation period usually takes between 5 minutes and 48 hours.',
  },
];

export default function DnsLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'DNS Lookup & Zone Inspector',
        url: 'https://kagazo.in/tools/dns-lookup',
        applicationCategory: 'NetworkingApplication',
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
        name: 'How to inspect DNS records for any domain',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Domain',
            text: 'Type any domain name or hostname (e.g., example.com or mail.google.com) into the search bar.',
          },
          {
            '@type': 'HowToStep',
            name: 'Filter by Record Type',
            text: 'Select ALL or click specific record filters like A, MX, TXT, or CAA to narrow your inspection.',
          },
          {
            '@type': 'HowToStep',
            name: 'Analyze or Export',
            text: 'Review host targets, TTL seconds, and copy individual values or export a standard BIND zone file.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">DNS Lookup</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-semibold text-blue-700 shadow-2xs">
            <Server className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Authoritative DNS Resolution • Cloudflare 1.1.1.1 DoH</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            DNS Record Lookup & Zone Inspector
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Query authoritative DNS root servers instantly. Inspect <strong>A, AAAA, MX, TXT, NS, SOA, and CAA</strong> records with live TTL values, JSON exports, and BIND zone formats.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> DNS over HTTPS (DoH)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Low-Latency Resolution
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Globe2 className="w-4 h-4 text-blue-600" /> All Standard Record Types
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <DnsLookupEngine />

            {/* Educational / Deep SEO Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Understanding Key DNS Record Types
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  The Domain Name System acts as the Internet’s phonebook. Here is a breakdown of why each record type matters:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> A & AAAA Records
                  </span>
                  <p className="leading-relaxed">
                    Point your domain to IPv4 (32-bit, e.g. 192.0.2.1) and IPv6 (128-bit, e.g. 2001:db8::1) web hosting server IP addresses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> MX (Mail Exchanger) Records
                  </span>
                  <p className="leading-relaxed">
                    Direct incoming emails to designated mail servers (e.g. Google Workspace, ProtonMail, Microsoft 365) with priority metrics.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" /> TXT Records (SPF & DKIM)
                  </span>
                  <p className="leading-relaxed">
                    Contain arbitrary text data critical for domain ownership verification, anti-spoofing SPF records, and DKIM cryptographic keys.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" /> CAA (Certificate Authority Authorization)
                  </span>
                  <p className="leading-relaxed">
                    Specifies which Certificate Authorities (like Let’s Encrypt or DigiCert) are allowed to issue SSL/TLS certificates for the domain.
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
                Related Network Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/ssl-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSL Certificate Lookup
                </Link>
                <Link
                  href="/tools/whois-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  WHOIS Domain Lookup
                </Link>
                <Link
                  href="/tools/ip-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  IP Geolocation & ASN
                </Link>
                <Link
                  href="/tools/http-headers-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTTP Headers & Redirects
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Encrypted DNS (DoH)</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Lookups are routed through Cloudflare 1.1.1.1 over TLS with zero log retention.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
