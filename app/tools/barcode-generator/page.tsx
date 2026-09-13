import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  Barcode as BarcodeIcon,
  FileCheck,
  Globe2,
} from 'lucide-react';
import { BarcodeGeneratorEngine } from '@/components/tools/BarcodeGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Barcode Generator Online Free - Code 128, EAN-13, UPC | Kagazo',
  description:
    'Generate customized 1D barcodes online for free. Supports Code 128, EAN-13, UPC-A, Code 39, and ITF-14. Download high-resolution print-ready 300 DPI PNG and vector SVG for retail and shipping labels with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/barcode-generator',
  },
  openGraph: {
    title: 'Barcode Generator Online Free - Code 128, EAN-13, UPC | Kagazo',
    description: 'Create print-ready retail and inventory barcodes in Code 128, EAN-13, and UPC with SVG/PNG download.',
    url: 'https://kagazo.in/tools/barcode-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is the difference between Code 128 and EAN-13 barcodes?',
    answer:
      'Code 128 is a highly flexible alphanumeric barcode widely used in logistics, shipping labels (FedEx, Amazon FBA, UPS), and internal warehouse tracking. EAN-13 is a fixed 13-digit numeric standard used on retail products sold in supermarkets and stores worldwide.',
  },
  {
    question: 'Can I print these barcodes using thermal barcode printers (Zebra, Dymo, Brother)?',
    answer:
      'Yes! Kagazo generates clean, high-contrast vector SVGs and 300 DPI PNGs designed specifically for 1:1 rasterization on 203 DPI and 300 DPI thermal label printers.',
  },
  {
    question: 'Are there any usage limits or royalties?',
    answer:
      'No. The generated barcodes are 100% free and open for personal, commercial, and retail use with zero royalties.',
  },
];

export default function BarcodeGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Barcode Generator Online Free',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/barcode-generator',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Create print-ready barcodes in Code 128, EAN-13, UPC-A, Code 39, and ITF-14 with SVG and PNG download.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate a Print-Ready Barcode Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select Symbology',
            text: 'Choose your desired barcode type: Code 128 (general purpose/shipping), EAN-13 (retail), or UPC.',
          },
          {
            '@type': 'HowToStep',
            name: 'Enter Numbers or Text',
            text: 'Type your product SKU, serial number, or retail GTIN.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download PNG or Vector SVG',
            text: 'Download the print-ready image for label stickers, packaging, or documents.',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Barcode Generator</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <BarcodeIcon className="w-4 h-4 text-primary shrink-0" />
            <span>Industrial &amp; Retail Symbologies • Code 128, EAN-13, UPC</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Barcode Generator Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Generate industrial and retail barcodes for shipping labels, inventory management, and product packaging. Download <strong>300 DPI PNG and Vector SVG</strong> with 100% in-browser privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Thermal Printer Ready (300 DPI)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-primary" /> Vector SVG &amp; PNG Export
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <BarcodeGeneratorEngine />

            <AdSlot slot="post_download" />

            {/* Symbology Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Standard Barcode Symbology Cheatsheet
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Select the correct symbology for your retail or industrial distribution requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">📦 Code 128 (Logistics &amp; FBA)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    High-density alphanumeric barcode. Supports all 128 ASCII characters. The global standard for Amazon FBA, courier tracking, and warehouse bins.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🏷️ EAN-13 (Global Retail Products)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    13-digit numbering standard used in retail stores across Europe, India, Asia, and Latin America for point-of-sale checkout scanners.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🇺🇸 UPC-A (North America Retail)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    12-digit standard primarily used across supermarkets, pharmacies, and department stores in the United States and Canada.
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

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Scanner Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/barcode-reader"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Barcode Reader &amp; Scanner
                </Link>
                <Link
                  href="/tools/qr-code-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  QR Code Generator
                </Link>
                <Link
                  href="/tools/qr-code-reader"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  QR Code Reader
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
                Inventory barcodes are created in local device memory. Never stored.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
