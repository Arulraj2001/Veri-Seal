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
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { ImageToPdfEngine } from '@/components/tools/ImageToPdfEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Image to PDF Converter under 300KB Free | State PSC & Court Forms | Kagazo',
  description: 'Convert marksheet photos and certificates directly to PDF strictly under 300 KB online free. 1-click in-memory conversion with Xerox ink boost and A4 formatting.',
  alternates: {
    canonical: 'https://kagazo.in/tools/image-to-pdf-300kb',
  },
  openGraph: {
    title: 'Image to PDF Converter under 300KB Free | State PSC & Court Forms | Kagazo',
    description: 'Convert marksheet photos and certificates directly to PDF strictly under 300 KB online free. 1-click in-memory conversion with Xerox ink boost and A4 formatting.',
    url: 'https://kagazo.in/tools/image-to-pdf-300kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "UPSC ORA Portal",
    "docType": "Degree & Category Proof Photos",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "240 KB",
    "notes": "Ensures university crest and registrar signature are clearly visible."
  },
  {
    "authority": "State PSC (BPSC, MPSC, RPSC, WBPSC)",
    "docType": "Marksheets & Domicile Certificates",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "250 KB",
    "notes": "Strict compliance with state gazette notification guidelines."
  },
  {
    "authority": "High Court & Judicial Recruitments",
    "docType": "Affidavits, Bar Enrollment & Experience",
    "officialLimit": "Strict 300 KB Ceiling",
    "targetUsed": "260 KB",
    "notes": "Notary public stamps and advocate signatures must be verified."
  },
  {
    "authority": "Central University Admissions",
    "docType": "Consolidated Grade Sheets & Migration",
    "officialLimit": "300 KB per Document",
    "targetUsed": "250 KB",
    "notes": "Multi-semester tabular marks must remain completely legible."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Photo Scans",
    "desc": "Select one or more photos of your degree, marksheet, or legal affidavit."
  },
  {
    "step": 2,
    "title": "Apply Document Filter",
    "desc": "Choose Xerox Ink Boost or High Contrast to whiten paper and remove room shadows."
  },
  {
    "step": 3,
    "title": "Align to Standard A4",
    "desc": "The engine positions each photo neatly on an A4 sheet with clean margins."
  },
  {
    "step": 4,
    "title": "Lock 300 KB Limit",
    "desc": "Our engine compresses internal raster streams to ensure total size is under 300 KB."
  },
  {
    "step": 5,
    "title": "Download Compliant PDF",
    "desc": "Verify readability with the built-in zoom loupe and download your compliant PDF."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: 301 KB Portal Rejection",
    "title": "Exceeding 300 KB Maximum Limit",
    "desc": "Online recruitment servers block files that exceed 300 KB. Kagazo targets 250 KB for safety."
  },
  {
    "badge": "Error: Washed-Out Rubber Stamp",
    "title": "Notary Seal Ink Disappearing in Grayscale",
    "desc": "Lossy grayscale filters erase blue notary ink. Kagazo uses adaptive chroma preservation."
  },
  {
    "badge": "Error: Skewed Document Perspective",
    "title": "Angled Phone Camera Distortion",
    "desc": "Taking photos at an angle causes distorted text. Kagazo straightens document borders."
  },
  {
    "badge": "Error: Multi-Page Size Explosion",
    "title": "Adding Second Page Pushing Size Over 300 KB",
    "desc": "Generic tools double the file size on 2-page scans. Kagazo dynamically rebalances compression."
  }
];

const FAQS = [
  {
    "question": "Which exams require certificate PDFs under 300 KB?",
    "answer": "Several State Public Service Commissions (such as BPSC, MPSC, RPSC, KPSC, WBPSC), High Court recruitment portals, and central universities mandate caste certificates, educational marksheets, and domicile proofs to be uploaded as PDFs under 300 KB."
  },
  {
    "question": "Can I combine Front and Back pages into a single 300 KB PDF?",
    "answer": "Yes! Upload both Front and Back photos of your diploma or degree certificate. Kagazo combines them into a multi-page A4 PDF while ensuring the combined file size stays strictly below 300 KB."
  },
  {
    "question": "Will text and stamps remain clear after compression to 300 KB?",
    "answer": "300 KB allows higher visual resolution than 200 KB. Kagazo preserves high-contrast text edges, university seals, and signatures with crisp readability."
  },
  {
    "question": "Is this conversion safe and private?",
    "answer": "Yes. Conversion happens in ephemeral volatile memory (RAM). Files are never written to server disk or stored in any database."
  },
  {
    "question": "Can I convert photos taken in dim room lighting?",
    "answer": "Yes. Kagazo includes a built-in Shadow Removal and Whitening filter that corrects yellow incandescent tints and removes mobile camera shadows."
  },
  {
    "question": "What image file formats are supported?",
    "answer": "You can upload JPG, PNG, WEBP, and Apple HEIC photos from any smartphone or scanner."
  },
  {
    "question": "Does Kagazo place any watermark on the PDF?",
    "answer": "No. Every PDF generated by Kagazo is 100% clean and watermark-free."
  },
  {
    "question": "How many photos can I convert into one PDF?",
    "answer": "You can upload and merge up to 20 pages into a single document while keeping the total file size under 300 KB."
  },
  {
    "question": "Can I download the PDF directly to my smartphone?",
    "answer": "Yes. The tool works natively on mobile browsers including Safari on iPhone and Chrome on Android."
  },
  {
    "question": "Is this tool completely free to use?",
    "answer": "Yes. There are no fees, subscriptions, or hidden charges."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Image to PDF Converter under 300KB Free | State PSC & Court Forms | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/image-to-pdf-300kb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Convert marksheet photos and certificates directly to PDF strictly under 300 KB online free. 1-click in-memory conversion with Xerox ink boost and A4 formatting.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Image to PDF Under 300KB in 5 Steps',
        description: 'Step-by-step workflow to generate a verified 300 KB PDF from photos:',
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
            name: 'Image to PDF 300KB',
            item: 'https://kagazo.in/tools/image-to-pdf-300kb',
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
          <span className="text-primary font-bold truncate">Image to PDF 300KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official State PSC & Judicial Gateway Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Convert Image to PDF </span>
            <span className="text-primary">Under 300KB Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert smartphone photos of certificates, affidavits, and marksheets directly into an A4 PDF strictly under 300 KB. Optimized for State PSCs, High Courts, and university portals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> State PSC • UPSC ORA • Court Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageToPdfEngine initialTargetKb={300} />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  300 KB Judicial & PSC Standard
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  High-Fidelity Document Assembly with Paper Whitening
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                State recruitment commissions and judicial registries require 300 KB PDFs to maintain forensic clarity on notary stamps and court seals. Kagazo enhances contrast and keeps total size strictly under 300 KB.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strict 300 KB Ceiling
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Safe 220–260 KB operating target guarantees upload clearance on all portals.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Notary & Seal Protection
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    High-resolution edge preserving filters protect round rubber stamps and red seals.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Confidential affidavits and educational records never touch cloud servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Official 300 KB Portal Requirements & Verification Criteria
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Upload limits enforced across prominent state public service commissions and courts:
                </p>
              </div>

              <div className="overflow-x-auto border border-surface-darker rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface border-b border-surface-darker text-text-main font-bold">
                    <tr>
                      <th className="p-3 sm:p-4">Authority / System</th>
                      <th className="p-3 sm:p-4">Document Type</th>
                      <th className="p-3 sm:p-4">Portal Limit</th>
                      <th className="p-3 sm:p-4">Calibrated Target</th>
                      <th className="p-3 sm:p-4">Processing Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {SPEC_ROWS.map((r, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="p-3 sm:p-4 font-bold text-primary">{r.authority}</td>
                        <td className="p-3 sm:p-4">{r.docType}</td>
                        <td className="p-3 sm:p-4 font-semibold">{r.officialLimit}</td>
                        <td className="p-3 sm:p-4 font-mono text-emerald-700">{r.targetUsed}</td>
                        <td className="p-3 sm:p-4 text-text-main/80">{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Technical Advisory:</strong> Recruitment portals will reject PDF documents converted from mobile photos if background shadows obscure serial numbers or signatures.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert Image to PDF Under 300KB in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for guaranteed portal compliance:
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
                  Common Document Conversion Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common conversion mistakes that cause portal upload rejections:
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
                  Authoritative answers regarding format conversions, document quality, and portal standards:
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
                  Related Tools
                </h3>
                <div className="flex flex-col gap-2 text-xs">
                  <Link href="/tools/image-to-pdf-200kb" className="text-primary hover:underline font-medium">
                    Image to PDF 200KB
                  </Link>
                  <Link href="/tools/compress-pdf-to-300kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 300KB
                  </Link>
                  <Link href="/tools/upsc-pdf-compressor" className="text-primary hover:underline font-medium">
                    UPSC PDF Compressor
                  </Link>
                  <Link href="/tools/clean-document-scanner" className="text-primary hover:underline font-medium">
                    Clean Document Scanner
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
