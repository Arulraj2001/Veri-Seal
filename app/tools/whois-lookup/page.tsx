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
import { WhoisLookupEngine } from '@/components/tools/WhoisLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free WHOIS Domain Lookup & RDAP Checker Online | Kagazo',
  description: 'Perform official ICANN WHOIS and RDAP domain lookups online for free. Check domain ownership, registration dates, expiration countdowns, nameservers, and EPP transfer status with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/whois-lookup',
  },
  openGraph: {
    title: 'Free WHOIS Domain Lookup & RDAP Checker Online | Kagazo',
    description: 'Perform official ICANN WHOIS and RDAP domain lookups online for free. Check domain ownership, registration dates, expiration countdowns, nameservers, and EPP transfer status with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/whois-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free WHOIS Domain Lookup & RDAP Checker Online | Kagazo',
    description: 'Perform official ICANN WHOIS and RDAP domain lookups online for free. Check domain ownership, registration dates, expiration countdowns, nameservers, and EPP transfer status with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Target Domain Name",
    "desc": "Type or paste the domain name you want to look up (e.g. example.com, google.com, or yourdomain.in)."
  },
  {
    "step": 2,
    "title": "Query Authoritative Registry",
    "desc": "The lookup engine connects to the responsible TLD registry and accredited registrar."
  },
  {
    "step": 3,
    "title": "Review Critical Dates",
    "desc": "Check original creation date, last updated date, and upcoming renewal/expiration timestamp."
  },
  {
    "step": 4,
    "title": "Inspect Registrar & Nameservers",
    "desc": "Identify the sponsoring registrar (GoDaddy, Namecheap, Cloudflare) and active nameserver delegation."
  },
  {
    "step": 5,
    "title": "Check Transfer Lock Security",
    "desc": "Verify that EPP transfer locks (clientTransferProhibited) are active to protect against domain theft."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "DOMAIN EXPIRATION",
    "title": "Missing Domain Expiration Deadlines",
    "desc": "Allowing a domain to lapse enters it into expensive Redemption Grace Periods ($100+ fees) or public drop-catch auctions. Always enable auto-renewal."
  },
  {
    "badge": "TRANSFER LOCKED",
    "title": "Attempting Domain Transfer While Locked",
    "desc": "Registrar transfers will fail if the domain has clientTransferProhibited enabled or was registered/transferred within the last 60 days (ICANN 60-day rule)."
  },
  {
    "badge": "UNVERIFIED EMAIL",
    "title": "Ignoring ICANN Registrant Email Verification",
    "desc": "Failing to verify your registrant email address within 15 days of registration triggers an automatic clientHold status, suspending the domain."
  },
  {
    "badge": "WHOIS PRIVACY GAP",
    "title": "Exposing Personal Contact Information Publicly",
    "desc": "Registering domains without WHOIS Privacy Protection exposes your personal phone number, home address, and email to telemarketers and spammers."
  }
];

const FAQS = [
  {
    "question": "What is WHOIS and what information does it provide?",
    "answer": "WHOIS is a query and response protocol (RFC 3912) used to query databases that store the registered users or assignees of an internet domain name, IP address block, or autonomous system. It reveals registrar name, creation date, expiration date, nameservers, and status codes."
  },
  {
    "question": "What is RDAP and how does it improve upon WHOIS?",
    "answer": "RDAP (Registration Data Access Protocol) is the modern IETF and ICANN replacement for legacy port 43 WHOIS. It uses RESTful JSON responses over HTTPS, provides internationalization support, standardizes error codes, and supports granular role-based access control for privacy."
  },
  {
    "question": "Why is personal contact information marked \"Redacted for Privacy\"?",
    "answer": "Following privacy regulations like the European Union GDPR and California CCPA, ICANN adopted an Interim Specification requiring registrars to redact personal registrant data (names, physical addresses, phone numbers, personal emails) from public WHOIS outputs."
  },
  {
    "question": "What are EPP domain status codes?",
    "answer": "EPP (Extensible Provisioning Protocol) status codes indicate the operational state of a domain name at the registry. Standard codes include `ok` (normal active state), `clientTransferProhibited` (locked against unauthorized transfer), and `clientHold` (suspended by registrar)."
  },
  {
    "question": "What happens when a domain expires?",
    "answer": "The domain enters a standardized lifecycle: 1. Auto-Renew Grace Period (0-45 days, renewable at standard price); 2. Redemption Grace Period (30 days, high recovery fee required); 3. Pending Delete (5 days, cannot be recovered); 4. Dropped back into the public pool for re-registration."
  },
  {
    "question": "What is the ICANN 60-day transfer lock rule?",
    "answer": "Under ICANN policy, a domain name cannot be transferred between different registrars within 60 days of initial registration, a previous registrar transfer, or certain major registrant contact detail updates."
  },
  {
    "question": "How does domain age affect search engine optimization (SEO)?",
    "answer": "While Google has stated that domain age itself is not a direct ranking factor, older domains typically have more historical backlinks, established trust, and continuous indexation, making it easier to rank compared to brand new domains."
  },
  {
    "question": "How can I find out which registrar holds a domain name?",
    "answer": "Run a query on our tool. The \"Registrar\" field identifies the exact accredited organization (e.g. Cloudflare, GoDaddy, Namecheap, Google Domains / Squarespace) managing the domain registration."
  },
  {
    "question": "Can I hide my personal information on my domains?",
    "answer": "Yes. Most reputable domain registrars provide free WHOIS Privacy Protection (or proxy services) that replaces your personal contact details with the registrar proxy information."
  },
  {
    "question": "Are my WHOIS domain lookups logged or monitored?",
    "answer": "No. Our WHOIS/RDAP lookup tool executes queries on demand within your active browser session without logging, recording, or sharing your domain queries."
  }
];

export default function WhoisLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'WHOIS Domain Lookup & RDAP Inspector',
        url: 'https://kagazo.in/tools/whois-lookup',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Perform official ICANN WHOIS and RDAP domain lookups online for free. Check domain ownership, registration dates, expiration countdowns, nameservers, and EPP transfer status with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Check Domain WHOIS & Registration Records',
        description: 'Step-by-step verified workflow instructions for WHOIS Domain Lookup & RDAP Inspector.',
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
            name: 'WHOIS Domain Lookup & RDAP Inspector',
            item: 'https://kagazo.in/tools/whois-lookup',
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
          <span className="text-primary font-bold">WHOIS Domain Lookup & RDAP Inspector</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>ICANN & RDAP Registry Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free WHOIS Lookup & </span>
            <span className="text-primary">Domain RDAP Inspector</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Perform official ICANN WHOIS and RDAP domain lookups online for free. Check domain ownership, registration dates, expiration countdowns, nameservers, and EPP transfer status with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <WhoisLookupEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Dual WHOIS & Modern RDAP Query Architecture
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Queries both legacy port 43 WHOIS servers and modern RESTful RDAP endpoints to deliver structured, standardized domain data.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> EPP Transfer Status Decoder
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Decodes critical Extensible Provisioning Protocol (EPP) status codes like clientTransferProhibited and serverDeleteProhibited.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Expiration Countdown & Domain Lifecycle Monitoring
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Computes exact domain age and calculates days remaining until expiration to safeguard against accidental domain loss.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    WHOIS & Registration Data Access Protocol (RDAP) Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative networking standards, protocol RFCs, and infrastructure specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  ICANN & IETF RFC 7480 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Registry Field</th><th className="py-2.5 px-3 font-bold">Standard Protocol</th><th className="py-2.5 px-3 font-bold">Data Source</th><th className="py-2.5 px-3 font-bold">Administrative Significance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Domain Registrar</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ICANN Registrar Directory</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Authoritative TLD Registry</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Identifies sponsoring registrar managing the domain</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Creation Date</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO 8601 Timestamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Registry Database Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Determines exact domain age for trust and branding</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Expiration Date</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO 8601 Timestamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Registry Database Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Monitors renewal deadlines to prevent domain drop</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Updated Date</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO 8601 Timestamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Registry Database Record</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Tracks recent DNS, nameserver, or contact modifications</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Domain Status (EPP)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 5731 Status Codes</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Registry Lock Flags</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">e.g., clientTransferProhibited prevents hijacking</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Authoritative Nameservers</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Host Object Delegation</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Root TLD Zone Files</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Shows which DNS provider manages active DNS records</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Check Domain WHOIS & Registration Records
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
                  Common Domain Registration Traps & Best Practices
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
                WHOIS Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    ICANN & IETF RFC 7480 RDAP
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Coverage</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Global gTLDs, ccTLDs, nTLDs
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Dates</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Created, Updated, Expiration
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Security</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    EPP Status Code Decoder
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
