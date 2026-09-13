import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Layers,
  FileCheck,
  CheckCircle2,
  Server,
} from 'lucide-react';
import { HttpHeadersTracerEngine } from '@/components/tools/HttpHeadersTracerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free HTTP Headers Checker & Security Audit Tool | Kagazo',
  description:
    'Inspect all HTTP response headers, status codes, server latency, and security headers (HSTS, CSP, X-Frame-Options, Permissions-Policy) for any URL.',
  alternates: {
    canonical: 'https://kagazo.in/tools/http-headers-lookup',
  },
  openGraph: {
    title: 'Free HTTP Headers Checker & Security Audit | Kagazo',
    description: 'Inspect HTTP response headers, status codes, and security headers audit.',
    url: 'https://kagazo.in/tools/http-headers-lookup',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are HTTP headers and why do they matter?',
    answer:
      'HTTP response headers are metadata transmitted by a web server alongside requested HTML content. They define caching rules (Cache-Control), content types (Content-Type), server technology, and critical browser security policies.',
  },
  {
    question: 'What is HSTS (Strict-Transport-Security)?',
    answer:
      'HSTS forces web browsers to interact with your website exclusively over secure HTTPS connections, preventing SSL-stripping and man-in-the-middle attacks.',
  },
  {
    question: 'What is a Content Security Policy (CSP)?',
    answer:
      'A Content Security Policy restricts the resources (such as JavaScript, CSS, Images, and Fonts) that the browser is allowed to load for a given page, drastically reducing the risk of Cross-Site Scripting (XSS) attacks.',
  },
  {
    question: 'Why should I hide "Server" or "X-Powered-By" headers?',
    answer:
      'Disclosing exact web server versions (e.g. Apache/2.4.41 or Express/4.17.1) helps malicious bots target known vulnerabilities specific to that version. Suppressing these headers is considered a defense-in-depth best practice.',
  },
];

export default function HttpHeadersLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'HTTP Headers Inspector & Security Audit',
        url: 'https://kagazo.in/tools/http-headers-lookup',
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
        name: 'How to inspect HTTP response headers and security posture',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Web URL',
            text: 'Type any URL (e.g., https://example.com) into the input bar.',
          },
          {
            '@type': 'HowToStep',
            name: 'Fetch Headers',
            text: 'Click Inspect Headers to send a HEAD/GET request and capture HTTP metadata.',
          },
          {
            '@type': 'HowToStep',
            name: 'Review Security Audit',
            text: 'Inspect the Security Score, HSTS, CSP, and X-Frame-Options status.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">HTTP Headers Lookup</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs sm:text-sm font-semibold text-purple-700 shadow-2xs">
            <Layers className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Real-Time HTTP Response Analysis • Security Posture Audit</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            HTTP Headers Checker & Security Auditor
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Inspect all HTTP response headers sent by any web server. Evaluate <strong>HSTS, CSP, X-Frame-Options</strong>, and server latency with a comprehensive security scorecard.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Security Scorecard
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Latency Benchmarks
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Server className="w-4 h-4 text-purple-600" /> cURL Command Export
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HttpHeadersTracerEngine mode="headers" />

            {/* Guide Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Crucial HTTP Security Headers Explained
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  Modern web standards mandate key headers to harden websites against common attack vectors:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Strict-Transport-Security (HSTS)
                  </span>
                  <p className="leading-relaxed">
                    Instructs browsers to never load the site using insecure HTTP and automatically converts all attempts to secure HTTPS.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> X-Frame-Options
                  </span>
                  <p className="leading-relaxed">
                    Protects your visitors against clickjacking by determining whether a page can be loaded inside an `&lt;iframe&gt;`, `&lt;frame&gt;`, or `&lt;object&gt;`.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Content-Security-Policy (CSP)
                  </span>
                  <p className="leading-relaxed">
                    Restricts which scripts, styles, and images can execute, blocking malicious cross-site scripting and unauthorized data exfiltration.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" /> X-Content-Type-Options: nosniff
                  </span>
                  <p className="leading-relaxed">
                    Prevents browsers from MIME-type sniffing a response away from the declared content-type, blocking script execution disguised as images.
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
                Related Webmaster Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/url-redirect-checker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Redirect Checker
                </Link>
                <Link
                  href="/tools/ssl-lookup"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSL Certificate Lookup
                </Link>
                <Link
                  href="/tools/meta-tags-checker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Meta Tags & OG Checker
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
                <span>Non-Intrusive</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Inspection requests are non-intrusive HEAD/GET queries respecting robot conventions.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
