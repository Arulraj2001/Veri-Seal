import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  Link2,
  FileCheck,
  Globe2,
} from 'lucide-react';
import { UtmLinkGeneratorEngine } from '@/components/tools/UtmLinkGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'UTM Link Generator Online Free - Google Analytics 4 (GA4) Builder | Kagazo',
  description:
    'Easily create trackable Google Analytics 4 (GA4) campaign URLs with utm_source, utm_medium, utm_campaign, utm_term, and utm_content. Generates instant campaign QR codes with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/utm-link-generator',
  },
  openGraph: {
    title: 'UTM Link Generator Online Free | Kagazo',
    description: 'Create trackable GA4 campaign URLs with automatic lowercase sanitation and instant QR codes.',
    url: 'https://kagazo.in/tools/utm-link-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are UTM parameters and why are they essential for marketing?',
    answer:
      'UTM (Urchin Tracking Module) parameters are tags appended to a URL that allow analytics platforms like Google Analytics 4 (GA4) to accurately report which marketing campaign, ad, social post, or email newsletter drove visitors to your site.',
  },
  {
    question: 'What is the difference between utm_source and utm_medium?',
    answer:
      'utm_source identifies the platform or website sending traffic (e.g. "google", "newsletter", "instagram"). utm_medium describes the channel type or marketing vehicle (e.g. "cpc" for paid search, "email" for broadcasts, "social" for organic posts).',
  },
  {
    question: 'Why does Kagazo automatically lowercase UTM parameters?',
    answer:
      'Google Analytics treats "Facebook" and "facebook" as two separate traffic sources. Automatically standardizing all parameters to lowercase prevents split reporting in your marketing dashboards.',
  },
];

export default function UtmLinkGeneratorPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">UTM Link Generator</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Link2 className="w-4 h-4 text-primary shrink-0" />
            <span>Google Analytics 4 (GA4) Standard • Campaign Builder</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            UTM Link Generator Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Build accurate, trackable URLs for digital ad campaigns, social posts, and email newsletters.
            Enforces clean lowercase formatting and generates instant QR codes for print flyers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-primary" /> GA4 Standardized
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant Campaign QR Code
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UtmLinkGeneratorEngine />

            <AdSlot slot="post_download" />

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

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Marketing Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/whatsapp-link-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  WhatsApp Link Generator
                </Link>
                <Link
                  href="/tools/mailto-link-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Mailto Link Generator
                </Link>
                <Link
                  href="/tools/paypal-link-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  PayPal Link Generator
                </Link>
                <Link
                  href="/tools/qr-code-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  QR Code Generator
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
