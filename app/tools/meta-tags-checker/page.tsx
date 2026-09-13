import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Globe2,
  Share2,
  FileCheck,
  Eye,
} from 'lucide-react';
import { MetaTagsCheckerEngine } from '@/components/tools/MetaTagsCheckerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Meta Tags Checker & Social Preview Simulator | Google SERP, OG & Twitter | Kagazo',
  description:
    'Inspect HTML meta tags, title length, meta descriptions, Open Graph (OG) tags, Twitter cards, canonical URLs, and preview live Google SERP search results.',
  alternates: {
    canonical: 'https://kagazo.in/tools/meta-tags-checker',
  },
  openGraph: {
    title: 'Free Meta Tags Checker & Social Preview Simulator | Kagazo',
    description: 'Inspect meta tags, OpenGraph images, Twitter cards, and Google SERP snippets.',
    url: 'https://kagazo.in/tools/meta-tags-checker',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is the optimal character length for a page title?',
    answer:
      'Search engines like Google generally truncate page titles longer than 60 characters (or ~600 pixels). The optimal length is between 50 and 60 characters to ensure your full brand and keywords are displayed without being clipped.',
  },
  {
    question: 'How long should a meta description be?',
    answer:
      'The ideal meta description length is 120 to 160 characters. Descriptions longer than 160 characters are typically truncated by Google with an ellipsis (...), while descriptions under 100 characters often underutilize valuable SERP real estate.',
  },
  {
    question: 'Why are Open Graph (og:) tags important?',
    answer:
      'Open Graph tags determine how your webpage looks when shared across social networks like Facebook, LinkedIn, Twitter, Slack, and WhatsApp. Without valid og:image and og:title tags, links will appear as plain text without preview thumbnails.',
  },
  {
    question: 'What is a canonical tag and why does it prevent SEO penalties?',
    answer:
      'A canonical link tag (<link rel="canonical" href="...">) indicates to search engines which URL represents the master, primary version of a webpage. It prevents duplicate content dilution when pages can be reached through multiple parameters (e.g. ?ref= or ?sort=).',
  },
];

export default function MetaTagsCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Meta Tags Checker & SERP Simulator',
        url: 'https://kagazo.in/tools/meta-tags-checker',
        applicationCategory: 'SEOApplication',
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
        name: 'How to check and optimize meta tags for SEO',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Web URL',
            text: 'Type your webpage URL into the input field.',
          },
          {
            '@type': 'HowToStep',
            name: 'Analyze Metadata',
            text: 'Click Analyze Meta Tags to parse title, description, robots, and OpenGraph tags.',
          },
          {
            '@type': 'HowToStep',
            name: 'Preview Search & Social Cards',
            text: 'Toggle between Google SERP preview, Facebook OpenGraph, and Twitter Card simulators.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">Meta Tags Checker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Eye className="w-4 h-4 text-primary shrink-0" />
            <span>Google SERP Preview • Open Graph & Twitter Social Card Simulator</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Meta Tags Checker & Social Preview
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Inspect SEO meta tags and preview how your website appears on <strong>Google search results, Facebook, and Twitter/X</strong>. Optimize title lengths and canonical links.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Eye className="w-4 h-4 text-emerald-600" /> Google SERP Simulator
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Share2 className="w-4 h-4 text-primary" /> Open Graph & Twitter Card
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Canonical & Robots Audit
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <MetaTagsCheckerEngine />

            {/* Guide Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Key Meta Elements for High Search Click-Through Rates (CTR)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                  Crafting high-converting snippets requires adhering to search engine and social media standards:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-main/80">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Title Tag (50–60 Characters)
                  </span>
                  <p className="leading-relaxed">
                    The primary headline displayed in search results and browser tabs. Place your most critical target keyword at the front of the title.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Meta Description (120–160 Chars)
                  </span>
                  <p className="leading-relaxed">
                    The summary text underneath the title in search engines. Include a clear call-to-action (CTA) to encourage searchers to click.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" /> og:image (1200x630 Pixels)
                  </span>
                  <p className="leading-relaxed">
                    The recommended standard for Facebook and Twitter summary_large_image cards is 1200x630 (1.91:1 ratio) with a file size under 5MB.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <span className="font-bold text-text-main text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Canonical URL Link
                  </span>
                  <p className="leading-relaxed">
                    Tells search engines the authoritative URL to rank, consolidating link signals and avoiding duplicate content penalties.
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
                  href="/tools/url-redirect-checker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Redirect Checker
                </Link>
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
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Live Crawler</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Crawls public metadata on-demand with realistic search engine bot headers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
