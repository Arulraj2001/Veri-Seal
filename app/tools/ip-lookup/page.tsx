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
import { IpLookupEngine } from '@/components/tools/IpLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free IP Lookup Online (IPv4 & IPv6 Geolocation, ISP, ASN) | Kagazo',
  description: 'Lookup any public IPv4 or IPv6 address online. Discover geographic location (country, city, coordinates), ISP organization, ASN network route, and reverse DNS hostname with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ip-lookup',
  },
  openGraph: {
    title: 'Free IP Lookup Online (IPv4 & IPv6 Geolocation, ISP, ASN) | Kagazo',
    description: 'Lookup any public IPv4 or IPv6 address online. Discover geographic location (country, city, coordinates), ISP organization, ASN network route, and reverse DNS hostname with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/ip-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free IP Lookup Online (IPv4 & IPv6 Geolocation, ISP, ASN) | Kagazo',
    description: 'Lookup any public IPv4 or IPv6 address online. Discover geographic location (country, city, coordinates), ISP organization, ASN network route, and reverse DNS hostname with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter IP Address or Hostname",
    "desc": "Enter any public IPv4 address, IPv6 address, or domain name (or leave empty to auto-detect your own IP)."
  },
  {
    "step": 2,
    "title": "Execute Intelligence Query",
    "desc": "The engine queries global BGP routing registries and verified GeoIP databases."
  },
  {
    "step": 3,
    "title": "Inspect Location & Map",
    "desc": "Review country, state/region, city, postal code, and coordinate latitude/longitude."
  },
  {
    "step": 4,
    "title": "Analyze ASN & ISP Provider",
    "desc": "Inspect the registered ISP organization name, ASN identifier, and network routing classification."
  },
  {
    "step": 5,
    "title": "Export Diagnostic Summary",
    "desc": "Copy the structured IP metadata to your clipboard or download as a JSON diagnostic report."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "PRIVATE IP ERROR",
    "title": "Searching Private / Local Subnet Addresses",
    "desc": "Addresses like 192.168.1.1, 10.0.0.1, or 127.0.0.1 are private RFC 1918 addresses that exist only inside your local LAN and have no public location."
  },
  {
    "badge": "ACCURACY TRAP",
    "title": "Expecting GPS Street-Level Accuracy",
    "desc": "IP geolocation identifies the ISP routing center or cell tower, not the exact physical room or street address. Accuracy is at metro-city level."
  },
  {
    "badge": "VPN MASKING",
    "title": "Assuming IP Matches Physical Human Location",
    "desc": "Users connecting through VPNs or proxy services will display the location of the VPN datacenter server rather than their physical residence."
  },
  {
    "badge": "OCTET OVERFLOW",
    "title": "Entering Invalid IPv4 Octets Above 255",
    "desc": "Each segment of an IPv4 address must be between 0 and 255. Entering numbers like 256.10.1.1 triggers address format errors."
  }
];

const FAQS = [
  {
    "question": "How does IP geolocation lookup work?",
    "answer": "IP geolocation matches your public IP address against aggregated databases from Regional Internet Registries (ARIN, RIPE, APNIC, LACNIC, AFRINIC), BGP routing announcements, and internet service provider routing records to identify geographical location, ISP, and network organization."
  },
  {
    "question": "What is the difference between a public and a private IP address?",
    "answer": "A public IP address is globally unique and routable across the public internet. A private IP address (such as `192.168.x.x`, `10.x.x.x`, or `172.16.x.x`) is reserved for internal local area networks (LANs) and cannot be routed across the internet."
  },
  {
    "question": "What is an Autonomous System Number (ASN)?",
    "answer": "An ASN is a globally unique number assigned by IANA to a network operator (such as an ISP, cloud provider, or university) that controls an independent routing domain using the Border Gateway Protocol (BGP). Examples include AS13335 (Cloudflare) and AS16509 (Amazon AWS)."
  },
  {
    "question": "Why does my IP lookup show a different city than where I live?",
    "answer": "Internet Service Providers (especially mobile cellular carriers like Jio, Airtel, Verizon, or AT&T) route customer traffic through regional aggregation centers. Your IP address reflects the location of the ISP routing gateway, which may be located in a nearby major city."
  },
  {
    "question": "What is the difference between IPv4 and IPv6?",
    "answer": "IPv4 uses 32-bit numeric addresses separated by periods (e.g., `192.0.2.1`), yielding approximately 4.3 billion addresses. IPv6 uses 128-bit hexadecimal addresses separated by colons (e.g., `2001:0db8:85a3::8a2e:0370:7334`), providing virtually unlimited unique addresses."
  },
  {
    "question": "Can an IP lookup tell if someone is using a VPN or proxy?",
    "answer": "Yes. Commercial VPNs and web proxies operate out of commercial datacenters (like DigitalOcean, AWS, or Linode) rather than residential broadband pools. ASN and ISP classifications identify datacenter hosting environments."
  },
  {
    "question": "What is reverse DNS (rDNS)?",
    "answer": "Reverse DNS resolves an IP address back to its associated hostname (using a PTR record). For example, resolving `8.8.8.8` returns `dns.google`."
  },
  {
    "question": "Can I find a person real name or street address from their IP?",
    "answer": "No. Due to privacy and security protections, IP geolocation data only indicates city, region, and ISP provider. Only an ISP with a legal court order can link an IP timestamp to a subscriber personal account."
  },
  {
    "question": "How do streaming services use IP addresses for geo-blocking?",
    "answer": "Streaming platforms check the country code associated with your public IP address against GeoIP databases. If your IP originates from an unauthorized country, content is blocked or localized."
  },
  {
    "question": "Does this tool store my personal IP address?",
    "answer": "No. Our IP Lookup tool processes lookups in real-time within your browser session. We do not store, log, or sell IP lookup histories or visitor search queries."
  }
];

export default function IpLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'IP Lookup & Geolocation Intelligence',
        url: 'https://kagazo.in/tools/ip-lookup',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Lookup any public IPv4 or IPv6 address online. Discover geographic location (country, city, coordinates), ISP organization, ASN network route, and reverse DNS hostname with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Perform IP Geolocation & ASN Lookups',
        description: 'Step-by-step verified workflow instructions for IP Lookup & Geolocation Intelligence.',
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
            name: 'IP Lookup & Geolocation Intelligence',
            item: 'https://kagazo.in/tools/ip-lookup',
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
          <span className="text-primary font-bold">IP Lookup & Geolocation Intelligence</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>IPv4 / IPv6 BGP & GeoIP Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free IP Lookup & </span>
            <span className="text-primary">Geolocation Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Lookup any public IPv4 or IPv6 address online. Discover geographic location (country, city, coordinates), ISP organization, ASN network route, and reverse DNS hostname with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <IpLookupEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Dual IPv4 & IPv6 Architecture
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Seamless resolution of legacy 32-bit IPv4 dotted-decimal addresses and modern 128-bit IPv6 hexadecimal addresses.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Deep ASN & BGP Routing Insights
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Extracts the underlying Autonomous System Number (ASN), BGP network prefix, and hosting infrastructure tier.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-RAM Local Execution
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    IP queries are processed directly in browser client memory without saving your personal browsing history or IP searches to remote servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    IP Architecture & Geolocation Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative networking standards, protocol RFCs, and infrastructure specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  BGP & GeoIP Intelligence Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Intelligence Layer</th><th className="py-2.5 px-3 font-bold">Standard Parameter</th><th className="py-2.5 px-3 font-bold">Data Source / Standard</th><th className="py-2.5 px-3 font-bold">Operational Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Network Addressing</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">IPv4 (32-bit) / IPv6 (128-bit)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">IANA / Regional Internet Registry (RIR)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Verifies public routable IP structure</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Geographical Location</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Country, Region, City, Postal Code</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Multi-source GeoIP coordinate mapping</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Regional localization and fraud prevention</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Autonomous System</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ASN (e.g. AS13335, AS16509)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">BGP Global Routing Table</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Identifies carrier and network routing tier</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Organization & ISP</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Internet Service Provider Name</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RIR Whois Database (ARIN, RIPE, APNIC)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Classifies residential, business, or datacenter IP</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Reverse Hostname</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PTR in-addr.arpa / ip6.arpa</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Reverse DNS Resolution</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Validates hostname ownership and mail server status</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Timezone & Coordinates</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Latitude, Longitude, IANA Timezone</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO 3166 & IANA Time Zone Database</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Local time calculation and coordinate plotting</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Perform IP Geolocation & ASN Lookups
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
                  Common IP Lookup Misconceptions & Errors
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
                IP Lookup Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    IPv4 & IPv6 Dual Stack
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Routing</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    BGP ASN & RIR Intelligence
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Mapping</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Country, City, Coordinates
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Reverse DNS</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    PTR Record Verification
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
                  href="/tools/reverse-ip-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Reverse IP Lookup
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    vHost
                  </span>
                </Link>
                <Link
                  href="/tools/dns-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      DNS Zone Lookup
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    DNS
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
