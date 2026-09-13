import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  ArrowRight,
  Layers,
  FileCheck,
  Search,
} from 'lucide-react';
import { HttpHeadersTracerEngine } from '@/components/tools/HttpHeadersTracerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free URL Redirect Checker & 301/302 Chain Tracer Tool | Kagazo',
  description:
    'Trace URL redirect chains step-by-step. Detect 301 permanent redirects, 302 temporary redirects, meta refresh, infinite redirect loops, and preserve SEO PageRank link equity.',
  alternates: {
    canonical: 'https://kagazo.in/tools/url-redirect-checker',
  },
  openGraph: {
    title: 'Free URL Redirect Checker & 301/302 Chain Tracer | Kagazo',
    description: 'Trace hop-by-hop HTTP redirects, detect redirect loops, and audit status codes.',
    url: 'https://kagazo.in/tools/url-redirect-checker',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is a redirect chain and why does it hurt SEO?',
    answer:
      'A redirect chain happens when there are multiple redirects between the initial URL and the final landing destination (e.g. Page A -> Page B -> Page C). Chains slow down page speed, waste crawl budget, and can dilute up to 15% of SEO link equity (PageRank).',
  },
  {
    question: 'What is the difference between a 301 and 302 redirect?',
    answer:
      'A 301 redirect signals a permanent move, instructing search engines to transfer rankings and backlinks to the new destination. A 302 redirect signals a temporary change, meaning search engines keep indexing the original URL.',
  },
  {
    question: 'How do I identify an infinite redirect loop?',
    answer:
      'A redirect loop occurs when URL A redirects to URL B, and URL B redirects back to URL A (or via intermediate hops). Kagazo automatically halts tracing and alerts you if a loop is detected.',
  },
  {
    question: 'Should I redirect HTTP to HTTPS?',
    answer:
      'Yes. Best practice for web security and SEO is a single 301 permanent redirect from http://example.com and http://www.example.com directly to your canonical https:// version.',
  },
];

export default function UrlRedirectCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'URL Redirect Checker & 301 Chain Tracer',
        url: 'https://kagazo.in/tools/url-redirect-checker',
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
        name: 'How to trace URL redirects and detect redirect chains',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Starting URL',
            text: 'Enter the short URL or domain you want to trace.',
          },
          {
            '@type': 'HowToStep',
            name: 'Trace Redirect Path',
            text: 'Click Trace Redirects to capture each individual HTTP hop without auto-following.',
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect Status Codes',
            text: 'Review the full chain of status codes (301, 302, 307, 200 OK) and latency per hop.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">URL Redirect Checker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs sm:text-sm font-semibold text-amber-700 shadow-2xs">
            <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Hop-by-Hop Trace • 301, 302, 307 & 308 Status Auditor</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            URL Redirect Checker & Chain Tracer
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Trace the entire pathway of any shortened or redirected URL. Diagnose <strong>redirect chains, status codes (301 vs 302)</strong>, and eliminate latency bottlenecks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Layers className="w-4 h-4 text-amber-600" /> Multi-Hop Visualization
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Latency per Hop
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> SEO Link Equity Audit
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HttpHeadersTracerEngine mode="redirect" />

            {/* Guide Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  Common HTTP Redirect Status Codes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  Understanding what each HTTP status code tells web crawlers and browsers:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> 301 Moved Permanently
                  </span>
                  <p className="leading-relaxed">
                    The gold standard for permanent domain or URL migrations. Passes full PageRank link authority to the target URL.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> 302 Found (Temporary)
                  </span>
                  <p className="leading-relaxed">
                    Used for temporary maintenance or geo-targeting. Search engines do not transfer link equity to the destination.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> 307 Temporary Redirect
                  </span>
                  <p className="leading-relaxed">
                    Guarantees the HTTP method (e.g. POST) is not changed to GET when redirected, standard in modern REST APIs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> 308 Permanent Redirect
                  </span>
                  <p className="leading-relaxed">
                    The permanent counterpart to 307. Guarantees that the HTTP request method remains unaltered across the redirect.
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
                Related SEO Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/http-headers-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTTP Headers Lookup
                </Link>
                <Link
                  href="/tools/meta-tags-checker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Meta Tags & OG Checker
                </Link>
                <Link
                  href="/tools/ssl-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSL Certificate Lookup
                </Link>
                <Link
                  href="/tools/dns-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  DNS Record Lookup
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Redirect Loop Defense</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Detects cyclic redirects up to 10 hops before browser timeout occurs.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
