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
  title: 'Free URL Redirect Checker & Hop Chain Tracer (301, 302, 307, 308) | Kagazo',
  description: 'Trace complete HTTP redirect chains (301, 302, 307, 308) hop-by-hop online. Detect infinite redirect loops, verify canonical SSL redirects, and audit SEO link equity pass-through with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/url-redirect-checker',
  },
  openGraph: {
    title: 'Free URL Redirect Checker & Hop Chain Tracer (301, 302, 307, 308) | Kagazo',
    description: 'Trace complete HTTP redirect chains (301, 302, 307, 308) hop-by-hop online. Detect infinite redirect loops, verify canonical SSL redirects, and audit SEO link equity pass-through with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/url-redirect-checker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free URL Redirect Checker & Hop Chain Tracer (301, 302, 307, 308) | Kagazo',
    description: 'Trace complete HTTP redirect chains (301, 302, 307, 308) hop-by-hop online. Detect infinite redirect loops, verify canonical SSL redirects, and audit SEO link equity pass-through with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Initial URL to Trace",
    "desc": "Type or paste the short link, legacy URL, or affiliate link into the tracer input field."
  },
  {
    "step": 2,
    "title": "Initiate Hop-by-Hop Probe",
    "desc": "The tracer executes sequential HTTP requests, following Location headers step-by-step."
  },
  {
    "step": 3,
    "title": "Inspect Status Codes",
    "desc": "Analyze each step in the chain: verify 301, 302, 307, 308 redirects and response headers."
  },
  {
    "step": 4,
    "title": "Verify Final Destination",
    "desc": "Confirm that the final landing page resolves with a clean 200 OK status code."
  },
  {
    "step": 5,
    "title": "Export Redirect Audit",
    "desc": "Copy the complete redirect chain path and timing breakdown for your developer or SEO audit report."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "CHAIN LATENCY",
    "title": "Excessive Multi-Hop Redirect Chains",
    "desc": "Chains with 3+ hops (http:// \u2192 http://www \u2192 https://www) add hundreds of milliseconds of latency. Consolidate into a single direct redirect."
  },
  {
    "badge": "LINK EQUITY LOSS",
    "title": "Using 302 Temporary Instead of 301 Permanent",
    "desc": "Temporary 302 redirects do not pass full search engine ranking power. For site migrations and URL structure updates, always use 301."
  },
  {
    "badge": "CRASH LOOP",
    "title": "Circular Redirect Loops (ERR_TOO_MANY_REDIRECTS)",
    "desc": "Misconfigured server rules routing Page A to Page B and Page B back to Page A crash browser sessions. Trace the loop to fix conflicting rewrite rules."
  },
  {
    "badge": "TRACKING LOSS",
    "title": "Dropping UTM Parameters During Redirection",
    "desc": "Redirects that strip URL query parameters erase marketing attribution in Google Analytics. Ensure server rewrite rules preserve query strings."
  }
];

const FAQS = [
  {
    "question": "What is a URL redirect and why is it used?",
    "answer": "A URL redirect is a web server technique that automatically forwards visitors and search engines from one URL to another. Redirects are used when changing domain names, updating URL structures, repairing broken 404 links, and canonicalizing HTTP to HTTPS."
  },
  {
    "question": "What is the difference between a 301 and a 302 redirect for SEO?",
    "answer": "A 301 redirect signals a permanent move and transfers full search engine ranking equity (PageRank) to the new destination URL. A 302 redirect signals a temporary move, instructing search engines to retain the original URL in search results without passing ranking authority."
  },
  {
    "question": "What is a redirect chain and why does it hurt website speed?",
    "answer": "A redirect chain occurs when there are multiple intermediate hops between the requested URL and the final destination (e.g., URL A redirects to B, which redirects to C, which redirects to D). Each hop requires a round-trip HTTP request, delaying page load speed and consuming crawler budget."
  },
  {
    "question": "How many redirects will Googlebot follow before dropping off?",
    "answer": "Googlebot will follow up to 5 redirect hops in a single crawl attempt. If a chain exceeds 5 hops, Googlebot flags a redirect error and abandons crawling, preventing the destination page from being indexed."
  },
  {
    "question": "What is a redirect loop and how does this tool detect it?",
    "answer": "A redirect loop occurs when two or more URLs continuously point to each other in an infinite cycle (e.g., URL A \u2192 URL B \u2192 URL A), triggering the browser error `ERR_TOO_MANY_REDIRECTS`. Our tool traces every step and flags duplicate URLs in the chain."
  },
  {
    "question": "What is the difference between a 301 and a 308 redirect?",
    "answer": "Both 301 and 308 represent permanent redirects. However, under RFC 9110, a 308 redirect strictly prohibits the user agent from changing the request method (e.g., a POST request must remain a POST request on the destination URL), whereas older browsers sometimes converted 301 POST requests to GET."
  },
  {
    "question": "Can this tool trace shortened links like bit.ly, t.co, or tinyurl?",
    "answer": "Yes. It safely traces shortened URLs without executing harmful client scripts, revealing the ultimate destination URL before you visit it in your browser."
  },
  {
    "question": "How do I set up a proper canonical redirect from HTTP to HTTPS?",
    "answer": "Configure your web server (Nginx, Apache, or Cloudflare) with a single 301 permanent redirect rule that captures all unencrypted HTTP traffic and routes it directly to the HTTPS equivalent in a single hop."
  },
  {
    "question": "What is canonicalization for www versus non-www domains?",
    "answer": "Search engines view `example.com` and `www.example.com` as two distinct websites. You must choose one canonical standard and implement a 301 redirect from the other to avoid duplicate content penalties."
  },
  {
    "question": "Is my URL lookup private and confidential?",
    "answer": "Yes. We do not store, log, or publish target URLs or redirect chains on our servers."
  }
];

export default function UrlRedirectCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'URL Redirect Checker & HTTP Hop Tracer',
        url: 'https://kagazo.in/tools/url-redirect-checker',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Trace complete HTTP redirect chains (301, 302, 307, 308) hop-by-hop online. Detect infinite redirect loops, verify canonical SSL redirects, and audit SEO link equity pass-through with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Trace URL Redirect Chains & Status Codes',
        description: 'Step-by-step verified workflow instructions for URL Redirect Checker & HTTP Hop Tracer.',
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
            name: 'URL Redirect Checker & HTTP Hop Tracer',
            item: 'https://kagazo.in/tools/url-redirect-checker',
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
          <span className="text-primary font-bold">URL Redirect Checker & HTTP Hop Tracer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>HTTP 3xx Status Code & Canonical Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>URL Redirect Checker & </span>
            <span className="text-primary">HTTP Hop Chain Tracer</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Trace complete HTTP redirect chains (301, 302, 307, 308) hop-by-hop online. Detect infinite redirect loops, verify canonical SSL redirects, and audit SEO link equity pass-through with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <HttpHeadersTracerEngine mode="redirect" />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Sequential Multi-Hop Visualization
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Visually traces every intermediate hop in the redirect path, highlighting exact status codes, destination headers, and server latencies.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 301 vs 302 SEO Equity Auditing
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Identifies improper temporary 302 redirects where permanent 301 redirects are required to preserve Google PageRank and link equity.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Infinite Loop & Error Detection
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Detects circular redirect loops (A → B → A) and broken intermediate links before they impact search rankings or user experience.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    HTTP Redirect Protocols & Status Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative networking standards, protocol RFCs, and infrastructure specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  IETF RFC 9110 Redirection Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Status Code</th><th className="py-2.5 px-3 font-bold">Standard Name</th><th className="py-2.5 px-3 font-bold">HTTP Method Retention</th><th className="py-2.5 px-3 font-bold">SEO & Practical Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">301</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Moved Permanently</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">May change POST to GET</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Transfers 99% of PageRank link equity to new URL</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">302</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Found (Temporary)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">May change POST to GET</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Temporary relocation; retains original URL in search index</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">307</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Temporary Redirect</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly guarantees same method</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Modern temporary redirect preserving POST body data</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">308</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Permanent Redirect</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly guarantees same method</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Modern permanent redirect preserving POST body data</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Meta Refresh</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">HTML Client Refresh</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Client-side timer redirect</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Executed by browser; slower and discouraged for SEO</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">200</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">OK (Destination)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Target content served</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Final resolving destination landing page</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Trace URL Redirect Chains & Status Codes
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
                  Common URL Redirection Mistakes & Fixes
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
                Redirect Tracer Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Status Codes</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    301, 302, 307, 308, 200
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Chain Limit</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Up to 10 Sequential Hops
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Diagnostics</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Loop & Latency Detection
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Protocol</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    RFC 9110 Redirection
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
