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
  title: 'Free Reverse IP Lookup Online (Find Co-Hosted Domains & PTR) | Kagazo',
  description: 'Discover all websites co-hosted on the same server IP address online for free. Verify DNS PTR records, evaluate shared hosting neighborhood risks, and inspect server infrastructure with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/reverse-ip-lookup',
  },
  openGraph: {
    title: 'Free Reverse IP Lookup Online (Find Co-Hosted Domains & PTR) | Kagazo',
    description: 'Discover all websites co-hosted on the same server IP address online for free. Verify DNS PTR records, evaluate shared hosting neighborhood risks, and inspect server infrastructure with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/reverse-ip-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Reverse IP Lookup Online (Find Co-Hosted Domains & PTR) | Kagazo',
    description: 'Discover all websites co-hosted on the same server IP address online for free. Verify DNS PTR records, evaluate shared hosting neighborhood risks, and inspect server infrastructure with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Domain or Server IP",
    "desc": "Enter any target IPv4 address, IPv6 address, or domain name you want to investigate."
  },
  {
    "step": 2,
    "title": "Execute Reverse Lookup",
    "desc": "The engine performs PTR reverse DNS queries and cross-checks virtual host directories."
  },
  {
    "step": 3,
    "title": "Inspect Canonical Hostname",
    "desc": "Review the official reverse pointer (PTR) hostname assigned to the IP by the hosting provider."
  },
  {
    "step": 4,
    "title": "Review Co-Hosted Domains",
    "desc": "Explore the list of co-hosted domains sharing the server infrastructure."
  },
  {
    "step": 5,
    "title": "Evaluate Server Reputation",
    "desc": "Assess whether neighbor domains present blacklisting or shared hosting security risks."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "CDN PROXY CONFUSION",
    "title": "Running Lookups on Cloudflare / CDN IPs",
    "desc": "Querying a domain protected by Cloudflare or Fastly returns CDN edge IPs shared by millions of unrelated websites. Lookup the origin IP instead."
  },
  {
    "badge": "SHARED HOSTING PANIC",
    "title": "Assuming Co-Hosted Sites Share Ownership",
    "desc": "Standard shared hosting accounts (GoDaddy, Bluehost) place hundreds of unrelated customer sites on one IP address. Co-hosting does not imply common ownership."
  },
  {
    "badge": "EMAIL SPAM BLOCK",
    "title": "Missing PTR Records on Outbound Mail Servers",
    "desc": "Sending emails from an IP without a matching PTR record triggers immediate spam rejection by Gmail and Outlook. Ensure FCrDNS is configured."
  },
  {
    "badge": "STALE VHOST DATA",
    "title": "Relying on Outdated DNS Historical Caches",
    "desc": "Domains that recently switched servers may still appear in historical passive DNS databases. Always verify active A records."
  }
];

const FAQS = [
  {
    "question": "What is a Reverse IP lookup?",
    "answer": "A Reverse IP lookup takes a numeric IP address and resolves it to its associated hostnames. It serves two purposes: resolving the official reverse DNS pointer (PTR record) assigned by the network operator, and finding other virtual host websites hosted on that same web server."
  },
  {
    "question": "What is a PTR record and why is it important for email?",
    "answer": "A PTR (Pointer) record resolves an IP address to a domain name (the opposite of an A record). Major email providers (like Gmail, Outlook, and Yahoo) require all sending mail servers to have a valid PTR record matching their hostname to prevent spam."
  },
  {
    "question": "What does Forward-Confirmed reverse DNS (FCrDNS) mean?",
    "answer": "FCrDNS is an email authentication check where an IP resolves via PTR to a hostname, and that hostname subsequently resolves via A record back to the exact same IP address, creating a verified two-way cryptographic loop."
  },
  {
    "question": "What is shared hosting versus a dedicated IP address?",
    "answer": "In shared hosting, dozens or hundreds of different websites share a single server and IP address. A dedicated IP address is assigned exclusively to one domain or customer, providing isolation and reputation stability."
  },
  {
    "question": "Can bad neighbor domains on a shared IP hurt my search rankings?",
    "answer": "Google has confirmed that sharing an IP address with spammy websites on standard shared hosting does not directly hurt your individual SEO rankings, as long as your own content and links are clean. However, an IP-level firewall ban can block server traffic."
  },
  {
    "question": "Why does a reverse lookup on my domain show Cloudflare or AWS?",
    "answer": "If your website uses a Content Delivery Network (CDN) or cloud reverse proxy like Cloudflare, your public DNS points to the CDN edge proxy rather than your actual physical web server."
  },
  {
    "question": "How many websites can be hosted on a single IP address?",
    "answer": "Through HTTP/1.1 Name-Based Virtual Hosting (SNI), a single web server IP address can host hundreds or thousands of separate domains."
  },
  {
    "question": "How do I set up a PTR record for my own server?",
    "answer": "PTR records cannot be created in your domain registrar DNS zone. Because the IP address belongs to your hosting provider or ISP, PTR records must be configured in your hosting control panel (e.g., DigitalOcean, AWS, Linode) or by submitting a ticket to your ISP."
  },
  {
    "question": "Can I reverse lookup IPv6 addresses?",
    "answer": "Yes. Our tool resolves both IPv4 (via `in-addr.arpa`) and IPv6 (via `ip6.arpa`) address spaces."
  },
  {
    "question": "Are my reverse IP lookups private?",
    "answer": "Yes. All lookups are executed in real time within your active browser session without logging or sharing your search queries."
  }
];

export default function ReverseIpLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Reverse IP Lookup & Host Neighborhood Finder',
        url: 'https://kagazo.in/tools/reverse-ip-lookup',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Discover all websites co-hosted on the same server IP address online for free. Verify DNS PTR records, evaluate shared hosting neighborhood risks, and inspect server infrastructure with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Perform Reverse IP Lookups & Find Co-Hosted Sites',
        description: 'Step-by-step verified workflow instructions for Reverse IP Lookup & Host Neighborhood Finder.',
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
            name: 'Reverse IP Lookup & Host Neighborhood Finder',
            item: 'https://kagazo.in/tools/reverse-ip-lookup',
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
          <span className="text-primary font-bold">Reverse IP Lookup & Host Neighborhood Finder</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>PTR & Virtual Host Discovery Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Reverse IP Lookup & </span>
            <span className="text-primary">Host Neighborhood Finder</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Discover all websites co-hosted on the same server IP address online for free. Verify DNS PTR records, evaluate shared hosting neighborhood risks, and inspect server infrastructure with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <IpLookupEngine initialMode="reverse" />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Deep Virtual Host Neighborhood Discovery
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Uncovers other websites and domains hosted on the identical web server IP address, revealing shared hosting density.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Authoritative PTR Record Validation
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Performs true in-addr.arpa reverse DNS queries to confirm whether mail servers and hostnames satisfy FCrDNS standards.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Client-Side In-RAM Execution
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Queries are processed directly in browser memory without tracking your target investigations or domain research.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Reverse DNS (PTR) & Virtual Host Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative networking standards, protocol RFCs, and infrastructure specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  IETF RFC 1035 PTR Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Discovery Metric</th><th className="py-2.5 px-3 font-bold">Standard Protocol</th><th className="py-2.5 px-3 font-bold">Resolution Mechanism</th><th className="py-2.5 px-3 font-bold">Technical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Pointer Record (PTR)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 1035 / RFC 2317</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">in-addr.arpa (IPv4) & ip6.arpa (IPv6)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Authoritative reverse mapping of IP to hostname</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Virtual Host (vHost)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 9112 Host Header</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Multi-tenant HTTP/1.1 virtual hosting</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Identifies co-hosted domains sharing single IP</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Server Hosting Type</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Infrastructure Fingerprint</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">BGP ASN & subnet allocation mapping</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Classifies shared hosting, dedicated, or cloud proxy</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Email Deliverability</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">FCrDNS Verification</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Forward-Confirmed Reverse DNS check</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Prevents mail servers from flagging IP as spam</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Neighborhood Safety</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Reputation Aggregate</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cross-domain threat intelligence</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Detects spam, malware, or phishing neighbors</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Execution Latency</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Sub-150ms Query Stream</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Direct DoH and PTR query pipeline</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rapid server infrastructure discovery</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Perform Reverse IP Lookups & Find Co-Hosted Sites
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
                  Common Reverse IP Misconceptions & Traps
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
                Reverse IP Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Resolution</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    PTR Record in-addr.arpa
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Scope</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    vHost Shared Host Discovery
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Mail Check</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    FCrDNS Delivery Validation
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Stack</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    IPv4 & IPv6 Supported
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
