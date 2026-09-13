import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Network,
  RotateCcw,
  Server,
  FileCheck,
} from 'lucide-react';
import { IpLookupEngine } from '@/components/tools/IpLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Reverse IP Lookup Tool | Resolve IP to Hostname & PTR Records | Kagazo',
  description:
    'Find hostnames and PTR records associated with any IP address. Essential for email deliverability diagnostics, server verification, and cyber security investigation.',
  alternates: {
    canonical: 'https://kagazo.in/tools/reverse-ip-lookup',
  },
  openGraph: {
    title: 'Free Reverse IP Lookup Tool | Kagazo',
    description: 'Resolve IP addresses to domain hostnames and PTR records instantly.',
    url: 'https://kagazo.in/tools/reverse-ip-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is a Reverse IP Lookup and how does it work?',
    answer:
      'A Reverse IP lookup queries the DNS system for PTR (Pointer) records in reverse order (e.g. 8.8.8.8 queries 8.8.8.8.in-addr.arpa) to discover the registered hostname assigned to that IP address.',
  },
  {
    question: 'Why is reverse DNS critical for email deliverability?',
    answer:
      'Spam filters (like Gmail and Outlook) verify that the sending mail server’s IP address has a valid PTR record matching its Forward DNS (FCrDNS). Missing or mismatched reverse DNS often causes legitimate emails to be rejected or marked as spam.',
  },
  {
    question: 'Can all IP addresses be resolved in reverse DNS?',
    answer:
      'No. PTR records must be explicitly created by the organization or ISP that owns the IP address subnet. If the network provider has not configured a PTR record, the reverse lookup will return empty.',
  },
  {
    question: 'How do I configure Reverse DNS for my server?',
    answer:
      'Contact your cloud hosting provider (e.g., AWS, DigitalOcean, Hetzner, Linode) or ISP. Most providers offer a control panel setting to specify a PTR record matching your mail domain (e.g., mail.yourdomain.com).',
  },
];

export default function ReverseIpLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Reverse IP & Hostname Resolver',
        url: 'https://kagazo.in/tools/reverse-ip-lookup',
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
        name: 'How to perform a reverse IP lookup',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter IP Address',
            text: 'Enter an IPv4 or IPv6 address into the search input.',
          },
          {
            '@type': 'HowToStep',
            name: 'Resolve PTR Records',
            text: 'Click Lookup IP to query reverse DNS in-addr.arpa zones.',
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect Hostname & ISP',
            text: 'Review the canonical hostname, ASN, ISP provider, and geolocation results.',
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
          <span className="text-primary font-bold">Reverse IP Lookup</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-semibold text-blue-700 shadow-2xs">
            <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
            <span>PTR Record Resolution • Forward-Confirmed Reverse DNS (FCrDNS)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Reverse IP Lookup & Hostname Resolver
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Resolve any IP address backward to its <strong>canonical hostname and PTR records</strong>. Verify mail server authenticity and inspect network ISP details.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Mail Server FCrDNS
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Server className="w-4 h-4 text-primary" /> PTR Pointer Discovery
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-blue-600" /> Instant Real-Time Lookup
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <IpLookupEngine initialMode="reverse" />

            {/* Guide Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  Why Reverse DNS (rDNS) is Essential
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  While standard DNS maps a domain name to an IP, reverse DNS goes the opposite direction:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Spam Defense Verification
                  </span>
                  <p className="leading-relaxed">
                    Most major mail servers will drop or spam-quarantine messages from SMTP servers that lack matching forward and reverse DNS records.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Network Troubleshooting
                  </span>
                  <p className="leading-relaxed">
                    Traceroute and ping utilities rely on reverse DNS to display intelligible router and hop hostnames along network pathways.
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
                Related IP Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/ip-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Forward IP & Geolocation
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
                <span>Zero Logging</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Reverse lookups are executed purely on-demand with no historical logging.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
