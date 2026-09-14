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
  Mail,
  Scale,
} from 'lucide-react';
import { UniversalPdfCompressor } from '@/components/tools/UniversalPdfCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF to 1MB Online Free | Safe for Email & Portals | Kagazo',
  description:
    'Compress any PDF file strictly under 1MB online free. Reduce heavy multi-page documents for email attachments, job applications, and university portals. 100% private in-browser.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-1mb',
  },
  openGraph: {
    title: 'Compress PDF to 1MB Online Free | Kagazo',
    description:
      'Compress PDF documents to strictly under 1MB without losing text sharpness or table formatting. In-memory processing.',
    url: 'https://kagazo.in/tools/compress-pdf-to-1mb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    authority: 'Corporate Email Gateways',
    format: 'Outlook / Gmail / Exchange Attachments',
    limit: 'Strict 1024 KB Threshold',
    kagazoTarget: '850 KB - 950 KB',
    guideline: 'Bypasses spam quarantine filters while preserving high-resolution print formatting.',
  },
  {
    authority: 'Passport Seva & Visa Portals',
    format: 'Address Proofs, Affidavits & Financials',
    limit: 'Maximum 1000 KB (1 MB)',
    kagazoTarget: '900 KB',
    guideline: 'Maintains bank verification stamps and notary public rubber stamps clearly.',
  },
  {
    authority: 'State & Central University Admissions',
    format: 'Multi-Semester Transcripts & Theses',
    limit: '1024 KB per Submission',
    kagazoTarget: '880 KB',
    guideline: 'Retains small-font grade tables, GPA calculations, and controller of exams signatures.',
  },
  {
    authority: 'Job Application & HR Portals (Workday/TCS)',
    format: 'Curriculum Vitae & Experience Letters',
    limit: '1000 KB File Ceiling',
    kagazoTarget: '800 KB - 920 KB',
    guideline: 'Ensures ATS parser compatibility while preserving typography and graphics.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Multi-Page PDF',
    desc: 'Select your resume, bank statements, or certificates from your device or drag into the dropzone.',
  },
  {
    step: 2,
    title: 'Lock 1MB Ceiling Target',
    desc: 'The engine automatically configures a strict 1000 KB ceiling with an 850–950 KB safe operating zone.',
  },
  {
    step: 3,
    title: 'Select Pages & Reorder',
    desc: 'Inspect page thumbnails. Deselect blank back covers or unnecessary instructions to save space instantly.',
  },
  {
    step: 4,
    title: 'Stream-Level Optimization',
    desc: 'Click Compress. Internal raster images are downsampled to 150 DPI while text vectors remain 100% intact.',
  },
  {
    step: 5,
    title: 'Download Optimized PDF',
    desc: 'Review the output file size and download your verified PDF ready for email attachment or portal submission.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: 1.05MB Boundary Rejection',
    title: 'Slightly Exceeding Portal 1024 KB Limit',
    desc: 'Most portals reject files at 1.01 MB immediately. Kagazo targets an 880 KB safe zone to ensure complete clearance under the 1MB cap.',
  },
  {
    badge: 'Error: Blurry Small Tabular Numbers',
    title: 'Marksheet Grade Table Numbers Pixelated',
    desc: 'Crude rasterization blurs fine grade numbers in transcripts. Kagazo separates text streams from image streams to protect tabular numbers.',
  },
  {
    badge: 'Error: Corrupted Bank Seal or Notary Stamp',
    title: 'Over-Quantized Circular Stamp Graphics',
    desc: 'Lossy compression can wash out blue and purple ink seals. Kagazo uses edge-preserving chroma downsampling to protect official marks.',
  },
  {
    badge: 'Error: Incompatible PDF Rendering',
    title: 'Older Portal Viewers Failing to Open PDF',
    desc: 'Advanced non-standard compression streams cause black screens on government portals. Kagazo writes standard PDF 1.6 / 1.7 streams.',
  },
];

const FAQS = [
  {
    question: 'How do I compress a PDF to strictly under 1MB for email?',
    answer:
      'Upload your PDF file into Kagazo’s compressor. Our engine automatically analyzes internal font tables, flattens redundant vector paths, and recompresses embedded images using Lanczos resampling to land comfortably below 1MB (typically 850KB–950KB).',
  },
  {
    question: 'Will text, tables, and scanned signatures remain clear at 1MB?',
    answer:
      'Yes. Kagazo separates text streams from raster image streams. Vector text and tabular fonts are losslessly preserved so your document prints razor-sharp, while only bulky background images are optimized.',
  },
  {
    question: 'Can I remove unnecessary pages before compressing?',
    answer:
      'Yes! Click the "Select Pages" button after uploading. You can preview all pages and click to exclude blank cover sheets, disclaimers, or redundant pages to instantly reduce the file size.',
  },
  {
    question: 'Are my confidential business contracts or tax documents safe?',
    answer:
      '100% secure. Processing is conducted in volatile in-memory storage directly inside your browser. Zero copies are stored on permanent disk or shared with any third party.',
  },
  {
    question: 'When should I use 1MB compression instead of 200KB or 300KB?',
    answer:
      'Use the 1MB preset for multi-page documents (5–20 pages) like employment resumes, annual financial reports, multi-semester grade transcripts, and legal agreements where maximum photographic detail and high DPI printing clarity are paramount.',
  },
  {
    question: 'Does this 1MB tool comply with Passport Seva and Visa portal limits?',
    answer:
      'Yes. The Passport Seva Kendra (PSK) portal and international visa portals (Schengen, UK VFS, US Consular) enforce a strict 1MB (1024KB) ceiling for address proofs and financial affidavits. Our engine ensures your file never crosses this boundary.',
  },
  {
    question: 'Can I compress multiple PDF documents to under 1MB simultaneously?',
    answer:
      'Yes! Drag and drop multiple PDF files into the batch upload zone. Each document is compressed individually to under 1MB and can be downloaded in 1 click.',
  },
  {
    question: 'Is there any watermark or file size limit for 1MB compression?',
    answer:
      'You can upload source PDFs up to 50MB completely free with zero watermarks and no mandatory account sign-up.',
  },
  {
    question: 'How does Kagazo handle color saturation in scanned certificates?',
    answer:
      'Kagazo retains native color gamut coordinates so that colored governmental watermarks, embossed logos, and multi-color university crests remain vibrant and authentic.',
  },
  {
    question: 'Can I view the compressed PDF before submitting it to an employer?',
    answer:
      'Yes, the embedded high-resolution previewer allows you to inspect page rendering, zoom into signatures, and check file size before saving.',
  },
];

export default function CompressPdfTo1MbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF to 1MB Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-pdf-to-1mb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress any PDF to strictly under 1MB online free. Perfect for email attachments, job applications, and university portals.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 1MB in 5 Steps',
        description:
          'Step-by-step instructions to compress large PDF documents strictly under 1MB.',
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
            name: 'Compress PDF to 1MB',
            item: 'https://kagazo.in/tools/compress-pdf-to-1mb',
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
          <span className="text-primary font-bold truncate">Compress PDF to 1MB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Universal 1MB Document &amp; Email Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">1MB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress heavy multi-page documents strictly <strong>under 1MB</strong>. Optimized for email attachments, Passport Seva, university transcripts, and HR portals with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Mail className="w-4 h-4 text-primary" /> Email Attachment Safe
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
              initialTargetKb={1000}
              isFixedTarget={true}
              toolHeading="Compress PDF to Under 1 MB"
              toolSubheading="Shrink multi-page certificates, portfolios, and job applications strictly under 1000 KB."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Premium Multi-Page Optimization
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  High-Capacity Compression with Zero Visual Artifacts
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                When documents contain multiple pages of color scans, generic tools blur fonts and create blotchy halos around text. Kagazo preserves crisp vector typography while compressing background texture, keeping multi-page portfolios under 1MB without losing high-resolution readability.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Guaranteed Under 1MB
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Strict ceiling enforcement ensures your file never crosses the 1000 KB / 1024 KB upload threshold.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vector Text Sharpness
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Embedded font dictionaries are preserved losslessly so letters print with razor precision.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Confidential contracts and financial disclosures never leave your device’s local memory.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Official 1MB Gateway Standards &amp; Acceptance Limits
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Authoritative parameters enforced across major email systems and document verification portals:
                </p>
              </div>

              <div className="overflow-x-auto border border-surface-darker rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface border-b border-surface-darker text-text-main font-bold">
                    <tr>
                      <th className="p-3 sm:p-4">Authority / Portal</th>
                      <th className="p-3 sm:p-4">Document Category</th>
                      <th className="p-3 sm:p-4">Official Limit</th>
                      <th className="p-3 sm:p-4">Target Band</th>
                      <th className="p-3 sm:p-4">Key Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {SPEC_ROWS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="p-3 sm:p-4 font-bold text-primary">{row.authority}</td>
                        <td className="p-3 sm:p-4">{row.format}</td>
                        <td className="p-3 sm:p-4 font-semibold">{row.limit}</td>
                        <td className="p-3 sm:p-4 font-mono text-emerald-700">{row.kagazoTarget}</td>
                        <td className="p-3 sm:p-4 text-text-main/80">{row.guideline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Email Attachment Safe Practice:</strong> Many enterprise mail firewalls block attachments nearing their limit due to base64 encoding overhead (+33% size expansion over SMTP). Compressing to 900 KB guarantees smooth transit across corporate email relays.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Compress a PDF to 1MB in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Step-by-step workflow to safely shrink multi-page documents under 1MB:
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
                  Common 1MB PDF Compression Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Prevent submission rejection and delivery failure with these best practices:
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

            {/* 10 Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Expert guidance on 1MB PDF compression, email compatibility, and privacy:
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-1.5">
                    <h3 className="text-sm font-bold text-text-main flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar (col-span-3 / col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6">
            <div className="sticky top-28 space-y-6">
              <AdSlot slot="sidebar" />

              <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/70">
                  Related PDF Tools
                </h3>
                <div className="flex flex-col gap-2 text-xs">
                  <Link href="/tools/compress-pdf-to-500kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 500KB
                  </Link>
                  <Link href="/tools/compress-pdf-to-2mb" className="text-primary hover:underline font-medium">
                    Compress PDF to 2MB
                  </Link>
                  <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 200KB (TNPSC)
                  </Link>
                  <Link href="/tools/pdf-compressor" className="text-primary hover:underline font-medium">
                    Master PDF Compressor
                  </Link>
                  <Link href="/tools/merge-marksheets-pdf" className="text-primary hover:underline font-medium">
                    Merge Marksheets PDF
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
