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
  PenTool,
  Search,
  Fingerprint,
  Server,
  Network,
  Activity,
  Terminal,
  Layers,
  ArrowRightLeft,
} from 'lucide-react';
import { DnsLookupEngine } from '@/components/tools/DnsLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free DNS Lookup Online (A, AAAA, MX, TXT, CNAME, NS, CAA) | Kagazo',
  description: 'Query authoritative DNS records (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA) online via DNS-over-HTTPS. Inspect TTL values, email routing priorities, and DNSSEC signatures with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/dns-lookup',
  },
  openGraph: {
    title: 'Free DNS Lookup Online (A, AAAA, MX, TXT, CNAME, NS, CAA) | Kagazo',
    description: 'Query authoritative DNS records (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA) online via DNS-over-HTTPS. Inspect TTL values, email routing priorities, and DNSSEC signatures with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/dns-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free DNS Lookup Online (A, AAAA, MX, TXT, CNAME, NS, CAA) | Kagazo',
    description: 'Query authoritative DNS records (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA) online via DNS-over-HTTPS. Inspect TTL values, email routing priorities, and DNSSEC signatures with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Hostname or Domain",
    "desc": "Type or paste the root domain or subdomain you wish to inspect (e.g. example.com or mail.example.com)."
  },
  {
    "step": 2,
    "title": "Select Record Type Filter",
    "desc": "Choose a specific record type (A, MX, TXT, CNAME, CAA) or select \"ANY\" to fetch the complete active DNS zone."
  },
  {
    "step": 3,
    "title": "Execute DoH Resolution",
    "desc": "The engine dispatches encrypted queries to global authoritative nameservers in under 100 milliseconds."
  },
  {
    "step": 4,
    "title": "Inspect TTLs & Priorities",
    "desc": "Review parsed record values, TTL cache expiration counters, and mail server priority integers."
  },
  {
    "step": 5,
    "title": "Export DNS Zone Report",
    "desc": "Copy individual record strings or download the full diagnostic summary for DNS migration and debugging."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "CACHE DELAY",
    "title": "Ignoring TTL Cache Expiration Limits",
    "desc": "Modifying DNS records with an 86400-second (24-hour) TTL leaves old IP addresses cached worldwide. Lower TTLs to 300 seconds before migrations."
  },
  {
    "badge": "EMAIL FAILURE",
    "title": "Multiple Conflicting SPF TXT Records",
    "desc": "Publishing multiple \"v=spf1\" TXT records violates RFC 7208 and causes Gmail and Outlook to mark incoming emails as PermError (Spam)."
  },
  {
    "badge": "APEX COLLISION",
    "title": "Setting CNAME at Root Apex Domain",
    "desc": "RFC 1035 forbids CNAME records on the zone apex (example.com) because it conflicts with NS and SOA records. Use A/AAAA records or ALIAS/ANAME."
  },
  {
    "badge": "SSL BLOCKED",
    "title": "Missing or Restrictive CAA Records",
    "desc": "A CAA record specifying only DigiCert will block automated Let's Encrypt certificate renewal. Always add CAA records for all active CAs."
  }
];

const FAQS = [
  {
    "question": "How does DNS resolution work from root to authoritative servers?",
    "answer": "When you query a domain, your recursive resolver queries a Root Server (1 of 13 global clusters), which refers the request to the Top-Level Domain (TLD) nameservers (.com, .org, .in). The TLD nameserver refers to the domain authoritative nameservers (like Cloudflare or AWS Route 53), which provide the final IP address."
  },
  {
    "question": "What is TTL (Time-to-Live) and why does DNS propagation take time?",
    "answer": "TTL is an integer value in seconds indicating how long intermediate recursive resolvers and ISPs are permitted to cache a DNS record before requesting fresh data. If a record has a TTL of 3600 (1 hour), changes will take up to 60 minutes to propagate globally."
  },
  {
    "question": "What is the difference between an A record and a CNAME record?",
    "answer": "An A record points a hostname directly to a physical 32-bit IPv4 address (e.g., `example.com \u2192 93.184.216.34`). A CNAME (Canonical Name) record acts as an alias that points a hostname to another hostname (e.g., `www.example.com \u2192 example.com`)."
  },
  {
    "question": "How do MX record priority numbers work?",
    "answer": "MX (Mail Exchanger) priority numbers designate the order in which incoming mail servers should be contacted. Lower numbers have higher priority (e.g., priority 10 is tried before priority 20). If the primary server is unreachable, backup servers receive incoming emails."
  },
  {
    "question": "What are TXT records used for in email security?",
    "answer": "TXT records store machine-readable text used for domain verification and anti-spoofing email authentication frameworks: SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication, Reporting, and Conformance)."
  },
  {
    "question": "What is a CAA record and why is it important?",
    "answer": "A Certification Authority Authorization (CAA) record specifies which Certificate Authorities (like Let's Encrypt, DigiCert, or Sectigo) are allowed to issue SSL/TLS certificates for your domain, preventing unauthorized certificate generation."
  },
  {
    "question": "How can I flush my local computer DNS cache?",
    "answer": "On Windows, open Command Prompt as Administrator and run `ipconfig /flushdns`. On macOS, run `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` in Terminal. On Linux, restart systemd-resolved via `sudo systemd-resolve --flush-caches`."
  },
  {
    "question": "What is DNS-over-HTTPS (DoH)?",
    "answer": "DNS-over-HTTPS is a protocol standard (RFC 8484) that encrypts DNS queries via HTTPS on port 443 instead of plaintext UDP on port 53. This prevents eavesdropping, ISP manipulation, and public Wi-Fi man-in-the-middle attacks."
  },
  {
    "question": "What is DNSSEC and how does it protect my domain?",
    "answer": "DNSSEC (Domain Name System Security Extensions) adds cryptographic digital signatures (RRSIG) to DNS records. Resolvers verify these signatures against a chain of trust (DS and DNSKEY records), guaranteeing that query responses have not been tampered with."
  },
  {
    "question": "Are my domain lookup queries logged or tracked on Kagazo?",
    "answer": "No. Our DNS Lookup tool queries public DoH resolvers directly from browser client code. Zero domain queries, IP addresses, or diagnostic logs are recorded or stored on our servers."
  }
];

export default function DnsLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'DNS Lookup & Record Checker Online',
        url: 'https://kagazo.in/tools/dns-lookup',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Query authoritative DNS records (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA) online via DNS-over-HTTPS. Inspect TTL values, email routing priorities, and DNSSEC signatures with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Perform Authoritative DNS Record Lookups',
        description: 'Step-by-step verified workflow instructions for DNS Lookup & Record Checker Online.',
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
            name: 'DNS Lookup & Record Checker Online',
            item: 'https://kagazo.in/tools/dns-lookup',
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
          <span className="text-primary font-bold">DNS Lookup & Record Checker Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC 1035 & DNS-over-HTTPS (DoH) Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free DNS Lookup & </span>
            <span className="text-primary">Zone Record Inspector</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Query authoritative DNS records (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA) online via DNS-over-HTTPS. Inspect TTL values, email routing priorities, and DNSSEC signatures with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <DnsLookupEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Network Protocol Standards
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Complete Resource Record Matrix
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Comprehensive query support for A, AAAA, CNAME, MX, TXT (SPF/DKIM/DMARC), NS, SOA, and CAA security records.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> High-Speed DNS-over-HTTPS (DoH)
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Performs secure, encrypted DoH queries against Google (8.8.8.8) and Cloudflare (1.1.1.1) to bypass local ISP DNS cache poisoning.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Cryptographic DNSSEC Validation
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Validates authentic DNSSEC cryptographic signature chains (RRSIG, DS, and DNSKEY) to detect zone hijacking and spoofing.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    DNS Resource Record Types & Architecture
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative networking standards, protocol RFCs, and infrastructure specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  IETF RFC 1035 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Record Type</th><th className="py-2.5 px-3 font-bold">RFC Standard</th><th className="py-2.5 px-3 font-bold">Function & Purpose</th><th className="py-2.5 px-3 font-bold">Standard Syntax / Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">A Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 1035</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Maps hostname to 32-bit IPv4 address</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">example.com → 104.21.45.19</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">AAAA Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 3596</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Maps hostname to 128-bit IPv6 address</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">example.com → 2606:4700:3031::6815:2d13</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CNAME Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 1035</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Canonical alias pointing to another hostname</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">www.example.com → example.com</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">MX Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 1035 / 5321</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mail Exchanger server routing with priority</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">10 mail.example.com (Priority + Host)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">TXT Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 1035 / 7208</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Arbitrary text for SPF, DKIM, DMARC, verification</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">"v=spf1 include:_spf.google.com ~all"</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">NS Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 1035</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Delegates DNS zone to authoritative nameservers</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ns1.cloudflare.com, ns2.cloudflare.com</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CAA Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 6844</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Restricts which CAs may issue SSL certificates</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">0 issue "letsencrypt.org"</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Perform Authoritative DNS Record Lookups
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step diagnostic process for instant compliance and verified results:
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
                  Common DNS Misconfigurations & Troubleshooting
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common server misconfigurations, protocol errors, and network downtime:
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
                    Comprehensive technical, networking, and security answers
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
                DNS Lookup Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Protocol</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    RFC 1035 & RFC 8484 DoH
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Resolvers</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Google, Cloudflare, Quad9
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Records</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    A, AAAA, MX, TXT, NS, CAA
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Security</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Cryptographic DNSSEC Check
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% In-RAM Local Execution
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
                  href="/tools/http-headers-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      HTTP Headers Tracer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    HTTP
                  </span>
                </Link>
                <Link
                  href="/tools/ssl-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      SSL Certificate Checker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    TLS
                  </span>
                </Link>
                <Link
                  href="/tools/whois-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      WHOIS Domain Lookup
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    RDAP
                  </span>
                </Link>
                <Link
                  href="/tools/ip-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      IP Geolocation Lookup
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    IP
                  </span>
                </Link>
                <Link
                  href="/tools/url-redirect-checker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      URL Redirect Tracer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    301
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
                All network diagnostics, DNS queries, and header audits execute strictly inside your device browser memory. Zero target domains, IP records, or network payloads are logged on remote servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
