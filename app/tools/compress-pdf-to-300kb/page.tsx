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

const config = TOOL_CONFIGS['compress-pdf-to-300kb'];

export const metadata: Metadata = {
  title: 'Compress PDF to 300KB Online Free | UPSC DAF & NEET Preset | Kagazo',
  description:
    'Compress PDF documents strictly under 300 KB online free. Auto-calibrated for UPSC Civil Services DAF, NTA NEET, and JEE certificate uploads. 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-300kb',
  },
  openGraph: {
    title: 'Compress PDF to 300KB Online Free | Kagazo',
    description:
      'Compress PDF documents strictly under 300 KB for UPSC and NTA portal uploads without quality loss. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/compress-pdf-to-300kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PORTALS_300KB = [
  {
    exam: 'UPSC Civil Services (IAS / IPS / IFS)',
    posts: 'Detailed Application Form (DAF I & II)',
    requiredRange: '20 KB to 300 KB',
    targetUsed: '250 KB',
    notes: 'Mandatory for age proof, educational degrees, and OBC/EWS/PwD certificates.',
  },
  {
    exam: 'NTA NEET UG / PG',
    posts: 'Category & PwD Verification Certificates',
    requiredRange: '50 KB to 300 KB',
    targetUsed: '250 KB',
    notes: 'Medical board and reservation documents must retain clear issuing officer signatures.',
  },
  {
    exam: 'NTA JEE Main & Advanced',
    posts: 'Class 10 & 12 Board Marksheets',
    requiredRange: '50 KB to 300 KB',
    targetUsed: '260 KB',
    notes: 'Centralized seat allocation (JoSAA) document verification standard.',
  },
  {
    exam: 'UPSC Combined Defense Services (CDS)',
    posts: 'Service & Educational Documents',
    requiredRange: '20 KB to 300 KB',
    targetUsed: '240 KB',
    notes: 'Standardized online recruitment application (ORA) document limit.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload PDF Document',
    desc: 'Select or drag-and-drop your degree certificate, marksheets, or caste proof PDF.',
  },
  {
    step: 2,
    title: '300 KB Target Limit Active',
    desc: 'The tool defaults to a strict 300 KB ceiling, targeting a safe 240–265 KB landing zone.',
  },
  {
    step: 3,
    title: 'Review Pages & Content',
    desc: 'Inspect page thumbnails to ensure all necessary pages are included in proper sequence.',
  },
  {
    step: 4,
    title: 'In-Memory Stream Optimization',
    desc: 'Click Compress. Embedded scans are optimized at 200 DPI while preserving text and seal contrast.',
  },
  {
    step: 5,
    title: 'Download UPSC-Ready PDF',
    desc: 'Inspect fine print in the clarity loupe preview, then download your verified PDF for portal upload.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: File Exceeds 300.0 KB',
    title: 'Upload Rejected by UPSC DAF Server',
    desc: 'The UPSC server strictly rejects files that exceed 300.0 KB by even a single byte. Kagazo targets 250 KB to guarantee effortless portal acceptance.',
  },
  {
    badge: 'Error: Illegible Official Signatures',
    title: 'Faint Competent Authority Stamp',
    desc: 'Revenue officer or Tehsildar seals on EWS and caste certificates become blurry when over-compressed. Kagazo preserves high-contrast edge definitions.',
  },
  {
    badge: 'Error: Distorted Multi-Page Orientation',
    title: 'Landscape Pages Disoriented in PDF',
    desc: 'Scanned marksheets with mixed orientations confuse automated verification engines. Kagazo maintains individual page orientation ratios intact.',
  },
  {
    badge: 'Error: Loss of Searchable OCR Text',
    title: 'Rasterizing Text Leading to Low Searchability',
    desc: 'Low-quality compressors convert text to flat images. Kagazo preserves native digital text streams for OCR-enabled verification.',
  },
];

const FAQS = [
  {
    question: 'Why does UPSC enforce a strict 300 KB limit for DAF document uploads?',
    answer:
      'The Union Public Service Commission (UPSC) processes comprehensive Detailed Application Forms (DAF) containing graduation degrees, caste certificates, and age proofs for thousands of candidates. A 300 KB ceiling ensures fast transmission and clear long-term archival across government records.',
  },
  {
    question: 'Can I compress a 5-page graduation marksheet to under 300 KB?',
    answer:
      'Yes. Our adaptive bisection engine balances resolution evenly across all 5 pages, ensuring the complete multi-page document compresses safely below 300 KB without dropping below 150 DPI text legibility.',
  },
  {
    question: 'Will government revenue officer seals and digital signatures remain readable?',
    answer:
      'Yes. Kagazo applies edge-preserving quantization that isolates dark ink stamps from white background paper, maintaining clear contrast on official Tehsildar seals and signatures.',
  },
  {
    question: 'Does this tool support NTA NEET and JEE Main certificate uploads?',
    answer:
      'Yes. Both NEET and JEE Main application portals mandate category, citizenship, and PwD certificates in PDF format strictly between 50 KB and 300 KB, exactly matching our 300 KB preset.',
  },
  {
    question: 'Are my confidential identity proofs or degrees uploaded to any server?',
    answer:
      'Never. Kagazo runs 100% inside your browser volatile memory. No document files or personal candidate records are ever transmitted across the network.',
  },
  {
    question: 'What is the ideal target size to aim for when the limit is 300 KB?',
    answer:
      'We recommend aiming between 230 KB and 270 KB. This provides the highest possible visual clarity while maintaining a safe 30 KB buffer beneath the 300 KB hard limit.',
  },
  {
    question: 'Can I convert phone camera photos of my degree into a 300 KB PDF?',
    answer:
      'Yes! Use our companion tool "Image to PDF 300KB" to convert single or multiple smartphone photos into an official A4 PDF under 300 KB.',
  },
  {
    question: 'Does Kagazo add any watermark or banner to my compressed PDF?',
    answer:
      'Zero watermarks. The output PDF is completely clean and identical in layout to your original document.',
  },
  {
    question: 'Can I compress password-protected PDFs to 300 KB?',
    answer:
      'You must first remove the password using our free "Unlock PDF" tool before compressing the document to under 300 KB.',
  },
  {
    question: 'Is there any fee or daily limit for compressing PDFs on Kagazo?',
    answer:
      'No. Kagazo is 100% free and unlimited for all students, candidates, and Cyber Cafe operators.',
  },
];

export default function CompressPdfTo300KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF to 300KB Online Free',
        url: 'https://kagazo.in/tools/compress-pdf-to-300kb',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress PDF documents strictly under 300 KB online free for UPSC DAF and NEET uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 300KB in 5 Steps',
        description:
          'Step-by-step instructions to compress degree certificates and category proofs strictly under 300 KB.',
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
            name: 'Compress PDF to 300KB',
            item: 'https://kagazo.in/tools/compress-pdf-to-300kb',
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
          <span className="text-primary font-bold truncate">Compress PDF to 300KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>UPSC DAF &amp; NTA NEET 300 KB Portal Preset</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">300KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress PDF certificates and degrees strictly <strong>under 300 KB</strong>. Calibrated for UPSC Civil Services DAF, NTA NEET, JEE Main, and GATE with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> UPSC DAF 20–300 KB Range
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
                  National Examination Preset
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Engineered for UPSC DAF &amp; Central Entrance Gateways
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                UPSC and NTA servers strictly mandate PDF documents under 300 KB. Kagazo ensures that multi-page academic transcripts, Tehsildar category proofs, and disability certificates remain compliant while preserving essential issuing authority signatures.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 250 KB Target Used
                  </span>
                  <p className="text-xs text-text-main/70">
                    Provides a comfortable 50 KB buffer below the 300 KB ceiling to prevent upload errors.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Multi-Page Balance
                  </span>
                  <p className="text-xs text-text-main/70">
                    Distributes quantization evenly across multi-page semester grade cards.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Documents are processed exclusively in RAM without being uploaded to remote servers.
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
                    Major Portals Requiring Under 300 KB PDF Uploads
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications from UPSC, NTA, and central examination boards.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  300 KB Limits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Examination Authority</th>
                      <th className="py-3 px-3">Applicable Documents</th>
                      <th className="py-3 px-3">Mandatory Size Range</th>
                      <th className="py-3 px-3">Kagazo Safe Target</th>
                      <th className="py-3 px-3">Key Upload Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {PORTALS_300KB.map((portal, idx) => (
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
                  <strong>UPSC DAF Reminder:</strong> Scanned certificates must be clear and legible. Before submitting on <code className="font-mono font-bold">upsconline.nic.in</code>, verify that the issuing authority signature and official seal are visible.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress a PDF to 300KB in 5 Steps
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
                Common 300 KB PDF Compression Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (300 KB PDF Compression)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive guidance covering UPSC DAF submissions, NEET category certificates, and multi-page documents.
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
                  href="/tools/upsc-pdf-compressor"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  UPSC PDF Compressor
                </Link>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 200KB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-500kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 500KB
                </Link>
                <Link
                  href="/tools/image-to-pdf-300kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image to PDF (300KB)
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
