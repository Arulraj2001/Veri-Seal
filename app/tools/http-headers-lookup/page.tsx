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
import { HttpHeadersTracerEngine } from '@/components/tools/HttpHeadersTracerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free HTTP Headers Lookup & Response Code Checker | Kagazo',
  description: 'Inspect HTTP response headers, status codes (200, 301, 302, 404, 500), security headers (HSTS, CSP, X-Frame-Options), and cache policies online. 100% free webmaster diagnostic studio with zero server logging.',
  alternates: {
    canonical: 'https://kagazo.in/tools/http-headers-lookup',
  },
  openGraph: {
    title: 'Free HTTP Headers Lookup & Response Code Checker | Kagazo',
    description: 'Inspect HTTP response headers, status codes (200, 301, 302, 404, 500), security headers (HSTS, CSP, X-Frame-Options), and cache policies online. 100% free webmaster diagnostic studio with zero server logging.',
    url: 'https://kagazo.in/tools/http-headers-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free HTTP Headers Lookup & Response Code Checker | Kagazo',
    description: 'Inspect HTTP response headers, status codes (200, 301, 302, 404, 500), security headers (HSTS, CSP, X-Frame-Options), and cache policies online. 100% free webmaster diagnostic studio with zero server logging.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Target Webpage URL",
    "desc": "Type or paste the complete URL including protocol (e.g. https://example.com) into the address bar."
  },
  {
    "step": 2,
    "title": "Select HTTP Request Method",
    "desc": "Choose between HEAD request (inspect headers only) or GET request to examine payload headers."
  },
  {
    "step": 3,
    "title": "Transmit HTTP Probe",
    "desc": "The diagnostic engine connects to the remote server and performs full HTTP handshake negotiation."
  },
  {
    "step": 4,
    "title": "Analyze Security & Cache Rules",
    "desc": "Review color-coded security header compliance badges and CDN caching directive recommendations."
  },
  {
    "step": 5,
    "title": "Copy Raw Header Stream",
    "desc": "Copy the complete raw response header text to your clipboard for documentation, server auditing, or client reports."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "SSL-STRIP RISK",
    "title": "Missing Strict-Transport-Security (HSTS)",
    "desc": "Websites without HSTS permit initial plaintext HTTP requests that can be intercepted by man-in-the-middle attackers. Deploy HSTS with a 1-year max-age."
  },
  {
    "badge": "MIME CONFUSION",
    "title": "Missing X-Content-Type-Options Header",
    "desc": "Omitting \"X-Content-Type-Options: nosniff\" allows older browsers to execute uploaded images containing hidden JavaScript as scripts."
  },
  {
    "badge": "INFORMATION LEAK",
    "title": "Broadcasting Server Version Banners",
    "desc": "Headers like \"Server: Apache/2.4.41 (Ubuntu)\" or \"X-Powered-By: PHP/7.4\" advertise known software vulnerabilities to automated exploit scanners."
  },
  {
    "badge": "STALE ASSET BUG",
    "title": "Conflicting Cache-Control Directives",
    "desc": "Combining \"no-cache\" with \"max-age=31536000\" causes erratic caching behavior between browser caches and edge CDN nodes."
  }
];

const FAQS = [
  {
    "question": "What are HTTP response headers?",
    "answer": "HTTP response headers are metadata key-value pairs sent by a web server to a browser before the HTML content is delivered. They instruct the browser on document encoding, caching duration, cookie security, connection status, and security restrictions."
  },
  {
    "question": "What is the difference between an HTTP HEAD request and a GET request?",
    "answer": "A GET request asks the server for both the headers and the entire page body content (HTML, images, scripts). A HEAD request asks the server to return only the HTTP response headers without transmitting the body payload, saving bandwidth during diagnostic inspections."
  },
  {
    "question": "What does HTTP status code 301 vs 302 mean?",
    "answer": "HTTP 301 indicates \"Moved Permanently\", telling browsers and search engines that the URL has permanently relocated (passing 99% of SEO link equity). HTTP 302 indicates \"Found / Moved Temporarily\", telling search engines to keep indexing the original URL."
  },
  {
    "question": "Why is the Strict-Transport-Security (HSTS) header critical?",
    "answer": "HSTS forces modern web browsers to interact with your website exclusively over secure HTTPS connections, preventing SSL stripping attacks and eliminating the insecure initial redirect from http:// to https://."
  },
  {
    "question": "How does Content-Security-Policy (CSP) prevent Cross-Site Scripting (XSS)?",
    "answer": "CSP declares an explicit allowlist of trusted origins for scripts, styles, images, and frames. If an attacker injects a malicious script tag, the browser blocks execution because the script origin is not on the authorized CSP allowlist."
  },
  {
    "question": "What is the X-Frame-Options header and how does it prevent Clickjacking?",
    "answer": "X-Frame-Options instructs the browser whether the page can be rendered inside an iframe (`DENY` or `SAMEORIGIN`). This prevents malicious sites from overlaying invisible transparent frames over your site to steal user clicks."
  },
  {
    "question": "How does Cache-Control max-age work?",
    "answer": "The `max-age` directive specifies the maximum amount of time in seconds that an asset is considered fresh by the browser cache. For static versioned assets (e.g. bundle.v1.js), `max-age=31536000` (1 year) paired with `immutable` is standard practice."
  },
  {
    "question": "How can I tell if a website is using Gzip or Brotli compression?",
    "answer": "Inspect the `Content-Encoding` response header. If it returns `br`, the payload was compressed using Brotli; if `gzip`, standard gzip compression was used; if missing, uncompressed text was transferred."
  },
  {
    "question": "How do I detect which CDN is serving a website?",
    "answer": "Look for vendor-specific headers: Cloudflare (`cf-ray`, `server: cloudflare`), Fastly (`x-served-by`, `fastly-debug-digest`), AWS CloudFront (`x-amz-cf-id`), or Akamai (`x-akamai-transformed`)."
  },
  {
    "question": "Is this lookup tool private?",
    "answer": "Yes. We do not store or log your target URLs or header inspection outputs on our servers."
  }
];

export default function HttpHeadersLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'HTTP Headers Lookup & Response Inspector',
        url: 'https://kagazo.in/tools/http-headers-lookup',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Inspect HTTP response headers, status codes (200, 301, 302, 404, 500), security headers (HSTS, CSP, X-Frame-Options), and cache policies online. 100% free webmaster diagnostic studio with zero server logging.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Inspect HTTP Response Headers & Status Codes',
        description: 'Step-by-step verified workflow instructions for HTTP Headers Lookup & Response Inspector.',
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
            name: 'HTTP Headers Lookup & Response Inspector',
            item: 'https://kagazo.in/tools/http-headers-lookup',
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
          <span className="text-primary font-bold">HTTP Headers Lookup & Response Inspector</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC 9110 HTTP Architecture Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>HTTP Headers Lookup & </span>
            <span className="text-primary">Response Code Inspector</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Inspect HTTP response headers, status codes (200, 301, 302, 404, 500), security headers (HSTS, CSP, X-Frame-Options), and cache policies online. 100% free webmaster diagnostic studio with zero server logging.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <HttpHeadersTracerEngine mode="headers" />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Complete Security Header Audit
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Evaluates critical defenses including HSTS, Content-Security-Policy (CSP), X-Frame-Options, and Referrer-Policy with pass/fail scoring.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Deep Cache-Control Analysis
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Inspects browser max-age, CDN s-maxage, stale-while-revalidate directives, and ETag freshness validators to optimize web performance.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Edge & Origin Identification
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Detects reverse proxies, CDN edge servers (Cloudflare, Fastly, CloudFront, Akamai), and backend server banners.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    HTTP/1.1 & HTTP/2 Header Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative networking standards, protocol RFCs, and infrastructure specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  IETF RFC 9110 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Header Category</th><th className="py-2.5 px-3 font-bold">Standard Header Name</th><th className="py-2.5 px-3 font-bold">Security / Performance Function</th><th className="py-2.5 px-3 font-bold">Recommended Best Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Transport Security</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strict-Transport-Security</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Enforces encrypted HTTPS connections (HSTS)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">max-age=31536000; includeSubDomains; preload</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Content Security</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Content-Security-Policy</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Restricts script sources to stop XSS attacks</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">default-src 'self'; object-src 'none'</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Clickjacking Defense</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">X-Frame-Options</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Prevents embedding in hidden iframe overlays</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">DENY or SAMEORIGIN</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">MIME Sniffing</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">X-Content-Type-Options</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Forces browsers to honor declared MIME type</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">nosniff</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Referrer Policy</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Referrer-Policy</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Controls leakage of URLs in referer header</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">strict-origin-when-cross-origin</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cache Control</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cache-Control</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Defines browser and CDN caching policies</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">public, max-age=31536000, immutable (static assets)</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Inspect HTTP Response Headers & Status Codes
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
                  Common HTTP Header Vulnerabilities & Quick Fixes
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
                Headers Tracer Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    IETF RFC 9110 HTTP/1.1 & 2
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Methods</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    HEAD & GET Inspection
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Security Audit</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    HSTS, CSP, X-Frame, MIME
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">CDN Detection</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Cloudflare, Fastly, AWS
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
                  href="/tools/meta-tags-checker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Meta Tags Checker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    SEO
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
