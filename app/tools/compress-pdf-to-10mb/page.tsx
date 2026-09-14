import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Info,
  Archive,
  FileCheck,
  FileText,
} from 'lucide-react';
import { UniversalPdfCompressor } from '@/components/tools/UniversalPdfCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF to 10MB Online Free | Annual Reports & Blueprints | Kagazo',
  description:
    'Compress massive PDF documents strictly under 10MB online free. Optimized for 100MB+ annual financial reports, scanned book archives, and engineering drawings. 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-10mb',
  },
  openGraph: {
    title: 'Compress PDF to 10MB Online Free | Kagazo',
    description:
      'Compress 50MB–250MB scanned books and annual reports strictly under 10MB without losing vector clarity. 100% in-browser RAM privacy.',
    url: 'https://kagazo.in/tools/compress-pdf-to-10mb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PORTALS_10MB = [
  {
    authority: 'Stock Exchanges & SEBI Gateways (BSE / NSE)',
    documents: 'Annual Corporate Reports & Audited Accounts',
    maxLimit: 'Strictly < 10.0 MB per filing',
    safeTarget: '9.2 MB',
    notes: 'Mandatory standard for public disclosures and shareholder communication.',
  },
  {
    authority: 'Government e-Tender Gateways (Central & State)',
    documents: 'Full Detailed Project Reports (DPR) & EPC Bids',
    maxLimit: '10 MB per tender package',
    safeTarget: '9.0 MB',
    notes: 'Eliminates bid upload timeouts during peak tender deadline submission hours.',
  },
  {
    authority: 'Digital Library & University Archives',
    documents: 'Scanned Historical Books & Manuscripts',
    maxLimit: '10 MB to 20 MB',
    safeTarget: '9.5 MB',
    notes: 'Preserves antique font ligatures and high-resolution plate illustrations.',
  },
  {
    authority: 'Municipal Town Planning & Development Authorities',
    documents: 'Architectural Blueprints & Structural Drawings',
    maxLimit: 'Strictly < 10 MB per building plan',
    safeTarget: '8.8 MB',
    notes: 'CAD vector layers and scale rulers remain clear for approval engineers.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Heavy Document',
    desc: 'Select or drag-and-drop your 50MB–250MB scanned book, annual report, or architectural PDF.',
  },
  {
    step: 2,
    title: '10 MB Target Ceiling Engaged',
    desc: 'The tool defaults to an exact 10000 KB ceiling, targeting a safe 8.8–9.4 MB landing zone.',
  },
  {
    step: 3,
    title: 'Review Page Previews',
    desc: 'Inspect document pages and exclude any unwanted blank filler sheets.',
  },
  {
    step: 4,
    title: 'In-Memory Stream Optimization',
    desc: 'Click Compress. Scanned pages are recompressed while engineering schematics stay vector.',
  },
  {
    step: 5,
    title: 'Download Optimized PDF',
    desc: 'Inspect technical drawings in the clarity loupe, then download your verified PDF.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Gateway Abort on Files > 10MB',
    title: 'BSE / NSE Disclosure Server Rejection',
    desc: 'Stock exchange portals abort disclosures measuring 10.1 MB. Kagazo targets 9.2 MB to guarantee seamless shareholder filings.',
  },
  {
    badge: 'Error: Blurred CAD Vector Blueprints',
    title: 'Loss of Measurement Scale on Drawings',
    desc: 'Low-quality compressors blur structural dimensions and architectural rulers. Kagazo leaves vector lines untouched.',
  },
  {
    badge: 'Error: Browser Tab Memory Exhaustion',
    title: 'Crashing on 200MB Historical Scans',
    desc: 'Processing massive scanned volumes can exceed tab memory limits. Kagazo sequences page downsampling to prevent crashes.',
  },
  {
    badge: 'Error: Dropped Hyperlinks & Bookmarks',
    title: 'Loss of Table of Contents Navigation',
    desc: 'Re-encoding long reports often destroys internal PDF chapter links. Kagazo maintains internal navigation anchors.',
  },
];

const FAQS = [
  {
    question: 'Why do stock exchanges and tender portals mandate a 10MB PDF ceiling?',
    answer:
      'Portals like BSE, NSE, and national e-tender systems host millions of annual reports and detailed project proposals. A 10 MB limit prevents server overload while ensuring that shareholder reports remain easily downloadable on home and mobile connections.',
  },
  {
    question: 'How many pages can a 10MB PDF accommodate without quality loss?',
    answer:
      'With Kagazo, a 10 MB PDF can easily hold between 150 and 400 pages of text, audited financial statements, and illustrations while preserving 200+ DPI print sharpness.',
  },
  {
    question: 'Will architectural blueprints and CAD drawings remain sharp at 10MB?',
    answer:
      'Yes. Kagazo separates vector CAD layers from raster photography, ensuring building layouts, scale dimensions, and engineer stamps print razor-sharp.',
  },
  {
    question: 'Can I compress a 200MB scanned book to under 10MB?',
    answer:
      'Yes. By applying adaptive DCT quantization and removing redundant image overhead across all pages, Kagazo can compress scanned volumes up to 250MB down to under 10MB.',
  },
  {
    question: 'Are my confidential corporate filings or municipal blueprints safe?',
    answer:
      '100% confidential. All processing occurs in volatile client-side browser RAM. Your corporate financial statements and building plans are never uploaded to any remote server.',
  },
  {
    question: 'Can I remove unnecessary pages before compressing?',
    answer:
      'Yes! Click on any page thumbnail to exclude it from the final compiled PDF, immediately saving file size without degrading visual resolution on active pages.',
  },
  {
    question: 'Does Kagazo add any watermark or banner to my compressed PDF?',
    answer:
      'Zero watermarks. The output PDF is completely clean and identical in layout to your original document.',
  },
  {
    question: 'Will table of contents links and bookmarks remain intact?',
    answer:
      'Yes. Kagazo preserves internal PDF catalog structures, keeping bookmarks and hyperlinks functional across PDF readers.',
  },
  {
    question: 'Does this tool work on desktop workstations and laptops?',
    answer:
      'Yes. Kagazo runs on any modern browser across Windows, macOS, Linux, and ChromeOS with hardware acceleration.',
  },
  {
    question: 'Is there any fee or daily file limit on Kagazo?',
    answer:
      'No. Kagazo is 100% free and unlimited for all corporations, government contractors, students, and professionals.',
  },
];

export default function CompressPdfTo10MbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF to 10MB Online Free',
        url: 'https://kagazo.in/tools/compress-pdf-to-10mb',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress PDF documents strictly under 10MB online free for annual reports and blueprints.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 10MB in 5 Steps',
        description:
          'Step-by-step instructions to compress heavy corporate reports and engineering blueprints strictly under 10MB.',
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
            name: 'Compress PDF to 10MB',
            item: 'https://kagazo.in/tools/compress-pdf-to-10mb',
          },
        ],
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
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Compress PDF to 10MB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Heavy Annual Reports &amp; Engineering Blueprint Preset</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">10MB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Reduce heavy 50MB–250MB annual reports, scanned book archives, and municipal engineering blueprints strictly <strong>under 10MB</strong>. Preserves CAD vector layers and full-page typography with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Archive className="w-4 h-4 text-primary" /> Multi-Page Heavy Archive Engine
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Compression
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalPdfCompressor
              initialTargetKb={10000}
              isFixedTarget={true}
              toolHeading="Compress PDF to Under 10 MB"
              toolSubheading="Shrink heavy annual reports, scanned archives, and blueprints strictly under 10000 KB with vector precision."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Heavy Document Processing
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Tuned for Corporate Annual Reports &amp; CAD Schematics
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Large volumes containing scanned legal deeds, audited balance sheets, or municipal engineering blueprints can easily surpass 100MB. Kagazo compresses raster backdrops while keeping vector drawings and typography crisp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Archive className="w-4 h-4" /> 9.2 MB Target Used
                  </span>
                  <p className="text-xs text-text-main/70">
                    Provides a comfortable cushion beneath 10 MB for stock exchange and tender servers.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> CAD Drawing Precision
                  </span>
                  <p className="text-xs text-text-main/70">
                    Preserves scale dimensions and fine line weights on architectural blueprints.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Confidentiality Guaranteed
                  </span>
                  <p className="text-xs text-text-main/70">
                    Corporate filings processed in volatile RAM. Zero server persistence.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Portal Limits Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Major Gateways Requiring Under 10 MB PDF Filings
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications from stock exchanges, tender boards, and digital archives.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  10 MB Limits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Authority / Portal</th>
                      <th className="py-3 px-3">Applicable Documents</th>
                      <th className="py-3 px-3">Maximum Limit</th>
                      <th className="py-3 px-3">Kagazo Safe Target</th>
                      <th className="py-3 px-3">Key Upload Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {PORTALS_10MB.map((portal, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{portal.authority}</td>
                        <td className="py-3 px-3 text-text-main/70">{portal.documents}</td>
                        <td className="py-3 px-3 font-mono text-xs text-rose-600 font-bold">{portal.maxLimit}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{portal.safeTarget}</td>
                        <td className="py-3 px-3 text-xs text-text-main/60">{portal.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Corporate Filing Tip:</strong> For annual reports with high photographic density, compress images while retaining vector typography so financial tables print with crisp contrast.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress a PDF to 10MB in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">{s.title}</h3>
                    <p className="text-xs text-text-main/75 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common 10 MB PDF Compression Errors and How Kagazo Fixes Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/80 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deep 10 FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (10 MB PDF Compression)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights covering stock exchange filings, municipal drawings, and book archives.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-black">Q{idx + 1}.</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/80 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-4">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related PDF Presets
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-pdf-to-5mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 5MB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-2mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 2MB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-1mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 1MB
                </Link>
                <Link
                  href="/tools/pdf-compressor"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Master PDF Compressor
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
