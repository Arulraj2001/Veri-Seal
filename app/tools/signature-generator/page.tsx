import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  FileSignature,
  FileCheck,
  Globe2,
  PenTool,
} from 'lucide-react';
import { SignatureGeneratorEngine } from '@/components/tools/SignatureGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Signature Generator Online Free - Type, Draw & Download Transparent PNG | Kagazo',
  description:
    'Create authentic electronic signatures online for free. Choose from 12+ cursive calligraphy fonts, draw smooth ink strokes, or clean photo scans. Download transparent PNG, SVG vector, or 300 DPI JPEG with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/signature-generator',
  },
  openGraph: {
    title: 'Signature Generator Online Free - Type & Draw Signatures | Kagazo',
    description: 'Create and download transparent digital signatures in PNG, SVG, and JPEG format. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/signature-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Are digital signatures created with Kagazo legally valid for contracts and forms?',
    answer:
      'Yes. In most jurisdictions worldwide (including the US ESIGN Act, EU eIDAS regulation, and Indian IT Act 2000), electronic signatures created by typing or drawing are recognized as legally binding for standard agreements, NDAs, invoices, offer letters, and rental contracts when both parties intend to sign.',
  },
  {
    question: 'Why should I download a transparent PNG signature?',
    answer:
      'A transparent PNG allows your signature to be placed on top of document lines, colored backgrounds, or PDF forms without showing an ugly white rectangular box around your ink.',
  },
  {
    question: 'How does the "Scan Paper Ink" mode work?',
    answer:
      'If you have a handwritten signature on physical paper, take a photo with your phone and upload it. Kagazo automatically strips the shadows and paper fibers, converting the paper background into 100% transparent pixels while preserving the dark ink strokes.',
  },
  {
    question: 'Is my handwritten signature stored on your servers?',
    answer:
      'Never. Kagazo guarantees 100% sovereign in-browser privacy. Your canvas strokes, typed names, and scanned signature images are processed strictly in your device’s volatile RAM. No images are saved or transmitted to any server.',
  },
];

export default function SignatureGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Digital Signature Generator Online Free',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/signature-generator',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Create transparent digital signatures by typing in 12+ calligraphy fonts, drawing with smooth ink, or scanning paper signatures with 100% privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a Transparent Digital Signature Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose Your Mode',
            text: 'Select between Type Signature (calligraphy fonts), Draw Signature (finger or mouse), or Scan Paper Ink.',
          },
          {
            '@type': 'HowToStep',
            name: 'Customize Ink and Style',
            text: 'Pick your preferred ink color (Executive Black, Royal Blue, Burgundy) and adjust stroke weight or slant angle.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Transparent PNG or Vector SVG',
            text: 'Export your signature as a transparent PNG for PDFs and online forms or SVG for graphic design.',
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
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Signature Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Professional Calligraphy &amp; Ink Drawing Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Digital Signature Generator Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Create elegant handwritten electronic signatures for PDF documents, contracts, and job offer letters.
            Type in 12+ calligraphy fonts, draw with smooth Bézier curves, or extract ink from paper photos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <PenTool className="w-4 h-4 text-primary" /> Transparent PNG &amp; Vector SVG
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileSignature className="w-4 h-4 text-primary" /> Ready for PDF Signing
            </span>
          </div>
        </header>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SignatureGeneratorEngine />

            <AdSlot slot="post_download" />

            {/* Signature Use Cases Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Where Can You Use Your Kagazo Digital Signature?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Compliant formats for official, corporate, and personal document signing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold text-text-main">📄 PDF Agreements &amp; Leases</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Insert transparent PNG signatures directly into employment contracts, NDAs, lease agreements, and invoices.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold text-text-main">🏛️ Exam &amp; Government Portals</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download 300 DPI white JPEG signatures formatted to standard 10KB–50KB portal requirements for SSC, UPSC, and State PSCs.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold text-text-main">✉️ Email Sign-Offs &amp; Branding</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Embed a bespoke handwritten sign-off in your corporate Gmail or Outlook email signature footer.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs Accordion */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Legal compliance, security, and usage questions answered.
                </p>
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
                Document Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/sign-pdf"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Sign PDF Online
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Self-Attest PDF
                </Link>
                <Link
                  href="/tools/photo-signature-joiner"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Photo &amp; Signature Joiner
                </Link>
                <Link
                  href="/tools/signature-cleaner-extractor"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Signature Cleaner Extractor
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Signatures are drawn and generated in local volatile RAM. Never saved, logged, or uploaded.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
