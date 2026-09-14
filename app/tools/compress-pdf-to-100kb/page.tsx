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
  Sliders,
  FileCheck,
  FileText,
} from 'lucide-react';
import { PdfCompressorEngine } from '@/components/tools/PdfCompressorEngine';
import { TOOL_CONFIGS } from '@/components/tools/tool-configs';
import { AdSlot } from '@/components/ads/AdSlot';

const config = TOOL_CONFIGS['compress-pdf-to-100kb'];

export const metadata: Metadata = {
  title: 'Compress PDF to 100KB Online Free | Strict Ceiling Guarantee | Kagazo',
  description:
    'Compress PDF documents strictly under 100 KB online free. Ideal for IBPS handwritten declarations, state PSC certificates, and scholarship portals. 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-100kb',
  },
  openGraph: {
    title: 'Compress PDF to 100KB Online Free | Kagazo',
    description:
      'Compress PDF documents to strictly under 100 KB with text sharpness preservation. Zero server disk retention.',
    url: 'https://kagazo.in/tools/compress-pdf-to-100kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PORTALS_100KB = [
  {
    exam: 'IBPS PO / Clerk / RRB',
    posts: 'Handwritten Declaration & Left Thumb',
    requiredRange: '50 KB to 100 KB',
    targetUsed: '85 KB',
    notes: 'Strict upper limit of 100 KB. Files > 100 KB are immediately blocked by portal.',
  },
  {
    exam: 'State Scholarship Portals (NSP / SSP)',
    posts: 'Income, Caste & Bonafide Certificates',
    requiredRange: 'Strictly < 100 KB',
    targetUsed: '90 KB',
    notes: 'Uploads must remain readable by automated OCR verification engines.',
  },
  {
    exam: 'Railway Recruitment Cell (RRC)',
    posts: 'Apprentice & Trade Certificates',
    requiredRange: '50 KB to 100 KB',
    targetUsed: '80 KB',
    notes: 'Preserves seal contrast while aggressively compressing page margins.',
  },
  {
    exam: 'High Court & District Court Clerks',
    posts: 'Educational Testimonials',
    requiredRange: 'Strictly < 100 KB',
    targetUsed: '85 KB',
    notes: 'Mandatory single-page A4 PDF submission format.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload PDF Document',
    desc: 'Select or drag-and-drop your marksheet, declaration, or certificate PDF into the upload zone.',
  },
  {
    step: 2,
    title: 'Strict 100 KB Limit Engaged',
    desc: 'The tool defaults to an exact 100 KB ceiling, targeting a safe 85–92 KB landing zone.',
  },
  {
    step: 3,
    title: 'Inspect Page Previews',
    desc: 'Review document pages and optionally deselect any blank or irrelevant pages.',
  },
  {
    step: 4,
    title: 'In-Memory Stream Quantization',
    desc: 'Click Compress. Adaptive DCT downsampling strips redundant image bloat while keeping text readable.',
  },
  {
    step: 5,
    title: 'Download Portal-Ready PDF',
    desc: 'Inspect the clarity loupe preview to verify seal readability, then download your compliant PDF.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: File Exceeds 100.0 KB',
    title: '101 KB Upload Rejection on Banking Servers',
    desc: 'IBPS and recruitment portals automatically block files measuring 100.2 KB. Kagazo targets the safe 85–92 KB range to prevent boundary rejections.',
  },
  {
    badge: 'Error: Blurry Handwritten Declaration',
    title: 'Faint Blue Ink Becoming Unreadable',
    desc: 'Over-compression causes handwritten cursive text to fade. Kagazo enhances black and blue stroke contrast during quantization.',
  },
  {
    badge: 'Error: Multi-Page Size Overflow',
    title: 'Combining 3 Pages Exceeding 100 KB',
    desc: 'Fitting multiple scanned pages under 100 KB requires deeper compression. Kagazo applies greyscale normalization to fit up to 3 pages safely under 100 KB.',
  },
  {
    badge: 'Error: Browser Memory Hang',
    title: 'Uploading 30MB High-Res Scanner PDFs',
    desc: 'Heavy 600 DPI scanner outputs can strain browser RAM. Kagazo sequences page downsampling in chunks to prevent mobile browser crashes.',
  },
];

const FAQS = [
  {
    question: 'How does Kagazo compress a PDF to under 100KB without making it blurry?',
    answer:
      'Kagazo utilizes stream-level bisection. It leaves vector text, fonts, and table lines completely uncompressed while downsampling background raster image streams using edge-aware Lanczos interpolation. This ensures official stamps and text remain crisp even at aggressive 100 KB thresholds.',
  },
  {
    question: 'Can I compress a multi-page PDF to strictly under 100 KB?',
    answer:
      'Yes, for 1 to 3 pages. For multi-page documents, enable "Greyscale Mode" to discard heavy chrominance data, enabling all pages to fit within 100 KB while preserving essential text legibility.',
  },
  {
    question: 'Why does IBPS strictly require handwritten declarations under 100 KB?',
    answer:
      'The Institute of Banking Personnel Selection (IBPS) server architecture processes tens of thousands of applicants simultaneously. Enforcing a 50–100 KB envelope guarantees instant upload speeds and database stability across low-bandwidth rural testing centers.',
  },
  {
    question: 'Will my bank statement or certificate data be uploaded to external servers?',
    answer:
      'Never. Kagazo processes 100% of your data inside your local browser memory buffers. No document files, citizen metadata, or images are ever transmitted over the network.',
  },
  {
    question: 'What should I do if my compressed file is still 105 KB?',
    answer:
      'If your document contains high-density color graphics, toggle on the "Greyscale Mode" checkbox or deselect non-essential blank pages. This immediately drops the file size by an extra 20–35 KB.',
  },
  {
    question: 'Does this 100 KB compressor work on mobile phones?',
    answer:
      'Yes. Kagazo is fully responsive and runs smoothly inside mobile Chrome, Safari, and Firefox on Android and iOS devices without requiring app installations.',
  },
  {
    question: 'Can I compress password-protected PDF files to 100 KB?',
    answer:
      'You must first unlock the PDF using our free "Unlock PDF" tool to strip the encryption header, after which you can compress it to under 100 KB.',
  },
  {
    question: 'Will government portal automated scanners accept the compressed PDF?',
    answer:
      'Yes. Kagazo produces standard ISO 32000-compliant PDF files containing valid font dictionaries and JFIF metadata markers recognized by TCS iON, NIC, CDAC, and NTA portals.',
  },
  {
    question: 'Does Kagazo add any watermark or footer to the 100 KB PDF?',
    answer:
      'No. All outputs are 100% clean and watermark-free, ensuring your official documents look strictly professional for recruitment submissions.',
  },
  {
    question: 'Is there any fee or daily file limit for 100 KB compression?',
    answer:
      'No. Kagazo is completely free and unlimited for all applicants, students, and Cyber Cafe operators.',
  },
];

export default function CompressPdfTo100KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF to 100KB Online Free',
        url: 'https://kagazo.in/tools/compress-pdf-to-100kb',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress PDF documents strictly under 100 KB online free with in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 100KB in 5 Steps',
        description:
          'Step-by-step instructions to compress single and multi-page certificates strictly under 100 KB.',
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
            name: 'Compress PDF to 100KB',
            item: 'https://kagazo.in/tools/compress-pdf-to-100kb',
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
          <span className="text-primary font-bold truncate">Compress PDF to 100KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Strict 100 KB Ceiling &amp; Zero Watermarks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">100KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress PDF documents strictly <strong>under 100 KB</strong> without losing text sharpness or official seal clarity. Calibrated for IBPS handwritten declarations, state scholarships, and legal filings.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> Strict &lt; 100 KB Guarantee
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Compression
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PdfCompressorEngine config={config} />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  High-Precision 100 KB Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Engineered for Strict 100 KB Recruitment &amp; Scholarship Portals
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Portals like IBPS and State PSCs reject any upload over 100.0 KB. Kagazo uses adaptive bisection to lock your final file size comfortably between 80 KB and 95 KB, ensuring immediate acceptance without compromising stamp readability.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 85–95 KB Safe Target
                  </span>
                  <p className="text-xs text-text-main/70">
                    Calculates a safe safety cushion beneath 100 KB to eliminate boundary rejects.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Stroke Contrast Boost
                  </span>
                  <p className="text-xs text-text-main/70">
                    Darkens blue and black pen strokes for handwritten declarations and signatures.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Certificates processed in RAM and never written to disk. Zero retention.
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
                    Portals Mandating Strict 100 KB Upload Ceilings
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official recruitment and scholarship document specifications.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  100 KB Limits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Examination / Portal</th>
                      <th className="py-3 px-3">Applicable Documents</th>
                      <th className="py-3 px-3">Strict Size Ceiling</th>
                      <th className="py-3 px-3">Kagazo Safe Target</th>
                      <th className="py-3 px-3">Key Upload Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {PORTALS_100KB.map((portal, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{portal.exam}</td>
                        <td className="py-3 px-3 text-text-main/70">{portal.posts}</td>
                        <td className="py-3 px-3 font-mono text-xs text-rose-600 font-bold">{portal.requiredRange}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{portal.targetUsed}</td>
                        <td className="py-3 px-3 text-xs text-text-main/60">{portal.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Banking Portal Alert:</strong> IBPS application servers will automatically abort uploads that measure 100.1 KB. Always ensure your final file stays strictly below 100 KB.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress a PDF to 100KB in 5 Steps
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
                Common 100 KB PDF Compression Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (100 KB PDF Compression)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical answers covering banking declarations, state scholarship uploads, and OCR quality.
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
                  href="/tools/pdf-compressor"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Master PDF Compressor
                </Link>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 200KB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-300kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 300KB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-500kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 500KB
                </Link>
                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image to PDF (200KB)
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
