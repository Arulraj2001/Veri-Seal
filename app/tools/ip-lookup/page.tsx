import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Network,
  MapPin,
  Server,
  FileCheck,
} from 'lucide-react';
import { IpLookupEngine } from '@/components/tools/IpLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free IP Lookup & Geolocation Tool | Check ASN, ISP & Coordinates | Kagazo',
  description:
    'Find exact geographic location, country, city, ISP organization, Autonomous System Number (ASN), and reverse DNS hostname for any IPv4 or IPv6 address.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ip-lookup',
  },
  openGraph: {
    title: 'Free IP Lookup & Geolocation Tool | Kagazo',
    description: 'Lookup IP location, coordinates, ISP provider, and ASN details instantly.',
    url: 'https://kagazo.in/tools/ip-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How accurate is IP geolocation?',
    answer:
      'IP geolocation is typically 99% accurate at the country level and 80–90% accurate at the city/state level. It reflects the registration and routing points of the Internet Service Provider (ISP), rather than a specific physical street address (for user privacy).',
  },
  {
    question: 'What is an Autonomous System Number (ASN)?',
    answer:
      'An ASN is a unique global identifier assigned by regional internet registries (like ARIN or RIPE) to networks that control their own routing policies via BGP (Border Gateway Protocol). For example, AS15169 belongs to Google and AS13335 belongs to Cloudflare.',
  },
  {
    question: 'Can I check my own public IP address?',
    answer:
      'Yes! Simply click the "My IP" button, and Kagazo will immediately detect and analyze your current public IPv4/IPv6 connection.',
  },
  {
    question: 'What is Reverse DNS (rDNS)?',
    answer:
      'Reverse DNS looks up the domain name associated with an IP address using PTR (Pointer) records in the in-addr.arpa or ip6.arpa DNS zones. It is commonly used for anti-spam mail server verification.',
  },
];

export default function IpLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'IP Lookup & Geolocation Tool',
        url: 'https://kagazo.in/tools/ip-lookup',
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
        name: 'How to lookup IP address information and location',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter IP Address or Hostname',
            text: 'Type any IPv4 (e.g. 8.8.8.8), IPv6, or domain name into the input field.',
          },
          {
            '@type': 'HowToStep',
            name: 'Perform Lookup',
            text: 'Click Lookup IP or choose My IP to detect your current public connection.',
          },
          {
            '@type': 'HowToStep',
            name: 'View Geolocation & ASN Details',
            text: 'Review country, city, ISP name, ASN number, coordinates, and Google Maps pin.',
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
          <span className="text-primary font-bold">IP Lookup</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs sm:text-sm font-semibold text-indigo-700 shadow-2xs">
            <Network className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>BGP Routing • Autonomous System & ISP Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            IP Address Lookup & Geolocation
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Trace any IPv4 or IPv6 address worldwide. Uncover <strong>geographic location</strong>, ISP organization, Autonomous System Number (ASN), and reverse DNS hostnames.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <MapPin className="w-4 h-4 text-emerald-600" /> City & Country Geolocation
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Server className="w-4 h-4 text-primary" /> ASN & ISP Provider
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-indigo-600" /> Instant "My IP" Detection
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <IpLookupEngine />

            {/* Guide Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Network className="w-5 h-5 text-primary" />
                  Understanding IP Address Attributes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  Every device communicating on the internet operates through a structured addressing protocol:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" /> IPv4 vs IPv6
                  </span>
                  <p className="leading-relaxed">
                    IPv4 uses 32-bit addresses (e.g. 172.217.16.206), while IPv6 uses 128-bit hexadecimal notations (e.g. 2607:f8b0:4005:805::200e) providing 340 undecillion unique IP addresses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Autonomous Systems (ASN)
                  </span>
                  <p className="leading-relaxed">
                    An Autonomous System is a collection of connected Internet Protocol routing prefixes controlled by network operators (e.g., Telecom providers, AWS, Cloudflare).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" /> Reverse DNS (PTR)
                  </span>
                  <p className="leading-relaxed">
                    PTR records resolve an IP address backward to its designated domain name, essential for mail servers to avoid spam blacklists.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Geolocation Precision
                  </span>
                  <p className="leading-relaxed">
                    Location data is derived from regional IP allocation databases, ISP registration records, and network latency triangulations.
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
                Related IP & Network Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/reverse-ip-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Reverse IP Lookup
                </Link>
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
                  href="/tools/ssl-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSL Certificate Lookup
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Private Lookups</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                No search queries or IP addresses inspected are recorded on our servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
