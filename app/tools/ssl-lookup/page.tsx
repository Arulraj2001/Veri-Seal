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
import { SslLookupEngine } from '@/components/tools/SslLookupEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free SSL Certificate Checker & TLS Validator Online | Kagazo',
  description: 'Check and verify SSL/TLS certificates online for free. Inspect X.509 certificate chains, expiration dates, Certificate Authority (CA) issuers, SAN wildcards, and cipher suites with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ssl-lookup',
  },
  openGraph: {
    title: 'Free SSL Certificate Checker & TLS Validator Online | Kagazo',
    description: 'Check and verify SSL/TLS certificates online for free. Inspect X.509 certificate chains, expiration dates, Certificate Authority (CA) issuers, SAN wildcards, and cipher suites with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/ssl-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SSL Certificate Checker & TLS Validator Online | Kagazo',
    description: 'Check and verify SSL/TLS certificates online for free. Inspect X.509 certificate chains, expiration dates, Certificate Authority (CA) issuers, SAN wildcards, and cipher suites with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Target Hostname",
    "desc": "Type or paste the domain or subdomain you want to verify (e.g. example.com or app.example.com)."
  },
  {
    "step": 2,
    "title": "Initiate TLS Handshake",
    "desc": "The analyzer establishes an encrypted TLS handshake on port 443 with the target server."
  },
  {
    "step": 3,
    "title": "Extract Certificate Chain",
    "desc": "The engine downloads and parses the leaf, intermediate, and root X.509 public certificates."
  },
  {
    "step": 4,
    "title": "Review Issuer & Expiration",
    "desc": "Verify the Certificate Authority (Let's Encrypt, DigiCert, Cloudflare), issue date, and days remaining."
  },
  {
    "step": 5,
    "title": "Check SANs & Cipher Strength",
    "desc": "Confirm that all required subdomains are listed in SAN extensions and that modern TLS 1.3 ciphers are supported."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "BROWSER WARNING",
    "title": "Expired SSL Certificate Downtime",
    "desc": "Allowing an SSL certificate to expire triggers full-screen \"Your connection is not private\" browser warnings. Set automated auto-renewal alerts."
  },
  {
    "badge": "CHAIN BREAK",
    "title": "Missing Intermediate Certificate Chain",
    "desc": "Installing only the leaf certificate without the CA bundle causes handshake failures on mobile devices. Always install fullchain.pem."
  },
  {
    "badge": "HOSTNAME MISMATCH",
    "title": "Subdomain Missing from SAN List",
    "desc": "Accessing a subdomain (like api.example.com) not listed in the certificate Subject Alternative Names triggers NET::ERR_CERT_COMMON_NAME_INVALID."
  },
  {
    "badge": "OBSOLETE PROTOCOL",
    "title": "Enabling Deprecated TLS 1.0 or 1.1",
    "desc": "Legacy protocols with known vulnerabilities (BEAST, POODLE) are blocked by modern browsers. Enforce TLS 1.2 and TLS 1.3 exclusively."
  }
];

const FAQS = [
  {
    "question": "How does an SSL/TLS certificate work?",
    "answer": "An SSL/TLS certificate is an X.509 digital document that binds a cryptographic public key to a domain identity. During the TLS handshake, the web server proves ownership of the private key, allowing the browser and server to establish an encrypted, tamper-proof session."
  },
  {
    "question": "What is the difference between an SSL certificate and a TLS certificate?",
    "answer": "SSL (Secure Sockets Layer) was the original encryption protocol created by Netscape in the 1990s. TLS (Transport Layer Security) is the modern, upgraded IETF standard that replaced SSL. Although modern certificates use TLS, the industry continues to colloquially call them \"SSL certificates\"."
  },
  {
    "question": "What is a Certificate Authority (CA)?",
    "answer": "A Certificate Authority (like Let's Encrypt, DigiCert, Sectigo, or GlobalSign) is a trusted third-party organization audited under WebTrust standards that verifies domain ownership and digitally signs public certificates so web browsers trust them."
  },
  {
    "question": "What are DV, OV, and EV certificates?",
    "answer": "Domain Validated (DV) certificates verify only domain ownership and are issued automatically. Organization Validated (OV) certificates verify the legal existence of the organization. Extended Validation (EV) certificates require rigorous corporate identity and legal verification."
  },
  {
    "question": "What is a Wildcard SSL certificate?",
    "answer": "A Wildcard certificate uses an asterisk in the Subject Alternative Name (e.g., `*.example.com`) to secure an unlimited number of first-level subdomains (like `blog.example.com`, `shop.example.com`, and `app.example.com`) under a single certificate."
  },
  {
    "question": "What is an intermediate certificate and why is it required?",
    "answer": "Root Certificate Authorities keep their private keys offline in secure vaults. Instead of signing leaf certificates directly, Root CAs sign Intermediate CAs, which sign end-user certificates. Web servers must send this intermediate chain so browsers can trace trust back to the root."
  },
  {
    "question": "Why are certificates limited to 398 days maximum validity?",
    "answer": "The CA/Browser Forum mandated a maximum lifespan of 398 days (approx. 13 months) for all public SSL certificates to improve cryptographic agility and reduce the window of vulnerability from compromised private keys."
  },
  {
    "question": "What causes the \"Your connection is not private\" error?",
    "answer": "This error occurs when a browser cannot verify the certificate. Common causes include an expired certificate, a hostname mismatch (domain not in SANs), an incomplete intermediate certificate chain, or an untrusted self-signed certificate."
  },
  {
    "question": "What is the difference between RSA and ECC (ECDSA) keys?",
    "answer": "RSA is the traditional cryptographic algorithm requiring 2048 or 4096-bit keys. ECC (Elliptic Curve Cryptography) achieves equivalent or superior security with smaller 256-bit keys, resulting in faster TLS handshakes and reduced CPU overhead."
  },
  {
    "question": "Is this SSL certificate checker free and private?",
    "answer": "Yes. Our tool is 100% free with unlimited checks. No target hostnames, certificate data, or diagnostic reports are logged or stored on our servers."
  }
];

export default function SslLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'SSL Certificate Checker & TLS Analyzer',
        url: 'https://kagazo.in/tools/ssl-lookup',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Check and verify SSL/TLS certificates online for free. Inspect X.509 certificate chains, expiration dates, Certificate Authority (CA) issuers, SAN wildcards, and cipher suites with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Check & Verify SSL/TLS Certificates Online',
        description: 'Step-by-step verified workflow instructions for SSL Certificate Checker & TLS Analyzer.',
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
            name: 'SSL Certificate Checker & TLS Analyzer',
            item: 'https://kagazo.in/tools/ssl-lookup',
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
          <span className="text-primary font-bold">SSL Certificate Checker & TLS Analyzer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>X.509 & TLS 1.3 Encryption Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>SSL Certificate Checker & </span>
            <span className="text-primary">TLS Security Inspector</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Check and verify SSL/TLS certificates online for free. Inspect X.509 certificate chains, expiration dates, Certificate Authority (CA) issuers, SAN wildcards, and cipher suites with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <SslLookupEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Complete X.509 Certificate Chain Validation
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Verifies the complete trust hierarchy: End-Entity leaf certificate, Intermediate CA, and Root Certificate Authority.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Real-Time Expiration Countdown
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Calculates the exact days remaining until certificate expiration, helping administrators prevent catastrophic SSL downtime.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Subject Alternative Name (SAN) Mapping
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Inspects all authorized domain names and wildcards covered by the certificate to avoid hostname mismatch errors.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    X.509 Public Key Certificate & TLS Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative networking standards, protocol RFCs, and infrastructure specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  IETF RFC 5280 & RFC 8446 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Certificate Attribute</th><th className="py-2.5 px-3 font-bold">Standard Specification</th><th className="py-2.5 px-3 font-bold">Verification Threshold</th><th className="py-2.5 px-3 font-bold">Security Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Public Key Standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ITU-T X.509 v3 / RFC 5280</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cryptographic signature verification</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Authenticates domain identity and public key</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">TLS Protocol Version</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">TLS 1.3 (RFC 8446) / TLS 1.2</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Deprecated: SSL 3.0, TLS 1.0, TLS 1.1</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Guarantees modern forward-secret encryption</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Public Key Algorithm</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RSA 2048/4096-bit or ECDSA P-256</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Minimum 2048-bit RSA key length</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Asymmetric key exchange encryption strength</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Certificate Authority</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Trusted Root Store (Mozilla / Google)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">WebTrust / CA/Browser Forum audited</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Validates trusted issuer signature chain</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Subject Alternative Names</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SAN Extension (RFC 5280)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Explicit FQDN and wildcard (*.domain)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Validates authorized subdomains</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Validity Duration</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Maximum 398 Days (CA/B Forum)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Real-time expiration countdown</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Prevents expired certificate browser warnings</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Check & Verify SSL/TLS Certificates Online
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
                  Common SSL/TLS Certificate Errors & Solutions
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
                SSL Checker Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    ITU-T X.509 v3 / RFC 5280
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Protocols</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    TLS 1.3 & TLS 1.2
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Ciphers</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    RSA 2048+ & ECDSA P-256
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Validation</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Full CA Chain & SANs
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
