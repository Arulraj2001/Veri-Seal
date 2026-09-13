import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Globe2,
  Calendar,
  Building,
  FileCheck,
  Search,
} from 'lucide-react';
import { WhoisLookupEngine } from '@/components/tools/WhoisLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free WHOIS Lookup & Domain Age Checker | ICANN RDAP Records | Kagazo',
  description:
    'Lookup authoritative WHOIS and RDAP records for any domain name. Check registrar details, registration and expiration dates, domain age in years/months, and nameserver delegation.',
  alternates: {
    canonical: 'https://kagazo.in/tools/whois-lookup',
  },
  openGraph: {
    title: 'Free WHOIS Lookup & Domain Age Checker | Kagazo',
    description: 'Query ICANN RDAP registry records, registrar info, expiration dates, and domain age.',
    url: 'https://kagazo.in/tools/whois-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is RDAP and how is it different from legacy WHOIS?',
    answer:
      'RDAP (Registration Data Access Protocol) is ICANN’s modern standard replacing legacy port 43 WHOIS. It returns structured, machine-readable JSON data with standardized error codes and privacy compliance under GDPR.',
  },
  {
    question: 'Why does domain age matter for SEO and trust?',
    answer:
      'Search engines like Google consider domain longevity when evaluating trust and authority. Older domains that have maintained active registrations without penalty history are viewed as more established than freshly registered domains.',
  },
  {
    question: 'Why is registrant personal contact info hidden?',
    answer:
      'Due to international privacy regulations such as GDPR and CCPA, most registrars redact personal names, phone numbers, and physical addresses by default using proxy/privacy protection services.',
  },
  {
    question: 'What does "clientTransferProhibited" status mean?',
    answer:
      'It is an ICANN security status code set by the domain registrar to prevent unauthorized or fraudulent transfer requests to another registrar (also known as registrar lock).',
  },
];

export default function WhoisLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'WHOIS & RDAP Domain Inspector',
        url: 'https://kagazo.in/tools/whois-lookup',
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
        name: 'How to check domain registration details and age',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Domain Name',
            text: 'Type any top-level domain or address (e.g. apple.com or github.com) into the search box.',
          },
          {
            '@type': 'HowToStep',
            name: 'Query RDAP Registry',
            text: 'Click Lookup WHOIS to query authoritative ICANN bootstrap servers.',
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect Domain Age & Expiry',
            text: 'Review registrar name, domain age in years/months, renewal dates, and delegated nameservers.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">WHOIS Lookup</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs sm:text-sm font-semibold text-orange-700 shadow-2xs">
            <Globe2 className="w-4 h-4 text-orange-600 shrink-0" />
            <span>ICANN RDAP Bootstrap • RFC 7480 Standard</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            WHOIS Lookup & Domain Age Checker
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Inspect authoritative domain registration records. Check <strong>exact domain age</strong>, registrar IANA credentials, expiration timeline, and nameserver delegation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> RDAP Compliance
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Calendar className="w-4 h-4 text-primary" /> Exact Age in Years & Months
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Building className="w-4 h-4 text-blue-600" /> Registrar & IANA ID
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <WhoisLookupEngine />

            {/* Guide Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Understanding the Domain Registration Lifecycle
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  Every registered internet domain passes through strict ICANN lifecycle phases:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> 1. Active Period
                  </span>
                  <p className="leading-relaxed">
                    The domain is registered and fully resolving DNS records to websites and mail servers for 1 to 10 years.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> 2. Grace Period (0–45 Days)
                  </span>
                  <p className="leading-relaxed">
                    If expired, the original owner can typically renew the domain at standard rates before it enters redemption.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> 3. Pending Deletion
                  </span>
                  <p className="leading-relaxed">
                    After redemption (30 days), the registry releases the domain back into the public pool for re-registration.
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
                Related Domain Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/dns-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  DNS Record Lookup
                </Link>
                <Link
                  href="/tools/ssl-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSL Certificate Lookup
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
                <span>Private & Secure</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                RDAP searches are routed directly through authoritative registries with no search logging.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
