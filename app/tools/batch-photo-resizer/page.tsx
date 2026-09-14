import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Archive,
  Printer,
  FileCheck2,
  CheckCircle2,
  Users,
  Download,
} from 'lucide-react';
import BatchResizerEngine from '@/components/tools/BatchResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Bulk Batch Photo Resizer & ZIP Downloader | Cyber Cafe Multi-Applicant Hub | Kagazo',
  description:
    'Resize up to 50 candidate passport photos and signatures in 1 click for SSC, UPSC, and Banking exams. In-memory parallel batch compression with automatic structured ZIP download. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/batch-photo-resizer',
  },
  openGraph: {
    title: 'Free Bulk Batch Photo Resizer & ZIP Downloader | Kagazo',
    description:
      'High-speed batch photo and signature resizer for Cyber Cafe and CSC operators. Process up to 50 applicant photos instantly.',
    url: 'https://kagazo.in/tools/batch-photo-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Bulk Batch Photo Resizer & ZIP Downloader | Kagazo',
    description:
      'Resize up to 50 candidate photos and signatures simultaneously in volatile browser RAM with structured ZIP export.',
  },
};

const BATCH_SPECS = [
  {
    exam: 'SSC CGL / CHSL / MTS',
    photoSpec: '3.5 × 4.5 cm (20–50 KB, 300 DPI)',
    sigSpec: '4.0 × 2.0 cm (10–20 KB, 300 DPI)',
    namingConvention: 'candidate_name_ssc_photo.jpg',
  },
  {
    exam: 'UPSC Civil Services / NDA',
    photoSpec: '3.5 × 4.5 cm (20–300 KB, 300 DPI)',
    sigSpec: '3.5 × 1.5 cm (20–300 KB, 300 DPI)',
    namingConvention: 'candidate_name_upsc_photo.jpg',
  },
  {
    exam: 'IBPS PO / Clerk / SBI',
    photoSpec: '4.5 × 3.5 cm (20–50 KB, 300 DPI)',
    sigSpec: '140 × 60 px (10–20 KB, 300 DPI)',
    namingConvention: 'candidate_name_ibps_photo.jpg',
  },
  {
    exam: 'TNPSC OTR (Group 1, 2, 4)',
    photoSpec: '3.5 × 4.5 cm (20–50 KB with Name/DOP)',
    sigSpec: '3.5 × 1.5 cm (10–20 KB, 300 DPI)',
    namingConvention: 'candidate_name_tnpsc_photo.jpg',
  },
  {
    exam: 'Railway RRB NTPC / Group D',
    photoSpec: '320 × 240 px (20–50 KB, 300 DPI)',
    sigSpec: '160 × 80 px (10–40 KB, 300 DPI)',
    namingConvention: 'candidate_name_rrb_photo.jpg',
  },
];

const FAQS = [
  {
    question: 'How many files can I process simultaneously in a single batch?',
    answer:
      'You can upload, calibrate, and compress up to 50 candidate photos or signatures at once. The engine automatically processes each image in parallel through client-side HTML5 canvas worker threads and bundles them into a clean, organized ZIP archive in just 2 to 4 seconds.',
  },
  {
    question: 'Are applicant photos or signatures saved on Kagazo servers?',
    answer:
      'Never. Kagazo strictly operates with zero-cloud RAM processing. All files are loaded directly into browser memory buffers, processed client-side via hardware-accelerated WebAssembly and Canvas APIs, and purged immediately after the ZIP archive is generated. No citizen data is ever uploaded or stored.',
  },
  {
    question: 'Can I resize both photos and signatures together in one batch?',
    answer:
      'For optimum aspect ratio precision, we recommend running photographs in one batch under the Photo preset (e.g., 3.5 × 4.5 cm, 20–50 KB) and signatures in a second batch under the Signature preset (e.g., 140 × 60 px, 10–20 KB). This ensures that portrait and landscape aspect ratios are never distorted.',
  },
  {
    question: 'Does the ZIP download retain proper filenames for each candidate?',
    answer:
      'Yes! The engine appends the target specification code and index to each file (e.g., candidate1_ssc_photo.jpg, candidate2_ssc_photo.jpg) so Cyber Cafe and CSC operators can easily map processed files back to the respective candidate registration forms without administrative confusion.',
  },
  {
    question: 'Does this bulk tool inject required 300 DPI headers into the exported files?',
    answer:
      'Yes. Every processed image inside the downloaded ZIP file contains valid JFIF binary density markers (0x012C / 300 DPI). This eliminates common recruitment portal validation rejections that flag images lacking high-resolution camera metadata.',
  },
];

export default function BatchResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Bulk Batch Photo Resizer & ZIP Downloader',
        url: 'https://kagazo.in/tools/batch-photo-resizer',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Batch resize and compress up to 50 candidate passport photos and signatures in 1 click with ZIP archive download.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Batch Resize Exam Photos for Multiple Applicants',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select Multiple Photos',
            text: 'Choose up to 50 applicant passport photos or signature images from your local device storage.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Exam Preset',
            text: 'Pick target exam preset such as SSC, UPSC, IBPS, or Railway RRB to enforce strict byte and pixel boundaries.',
          },
          {
            '@type': 'HowToStep',
            name: 'Batch Process & Download ZIP',
            text: 'Click Process All and download the consolidated ZIP archive containing all compliant candidate photos ready for portal upload.',
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
            name: 'Bulk Batch Photo Resizer',
            item: 'https://kagazo.in/tools/batch-photo-resizer',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
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
          <span className="text-primary font-bold truncate">Bulk Batch Photo Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs sm:text-sm font-semibold shadow-2xs">
            <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Cyber Cafe &amp; CSC Multi-Applicant Production Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Bulk Batch Photo Resizer </span>
            <span className="text-primary">&amp; ZIP Downloader</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Resize, crop, and compress up to 50 applicant photos or signatures simultaneously. Zero server disk persistence with instant structured ZIP download pre-calibrated for SSC, UPSC, Banking, and State PSC portals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Users className="w-4 h-4 text-primary" /> Up to 50 Files Simultaneously
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Download className="w-4 h-4 text-primary" /> Instant 1-Click ZIP Export
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Primary Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Container */}
            <BatchResizerEngine />

            {/* Post-Download Native Sponsor AdSlot */}
            <AdSlot slot="post_download" />

            {/* Multi-Applicant Batch Standards Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-primary" />
                  Official Exam Batch Specifications Reference
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Standard upload limits applied automatically during parallel batch processing.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Recruitment Authority</th>
                      <th className="p-3.5">Photo Dimension &amp; Size</th>
                      <th className="p-3.5">Signature Dimension &amp; Size</th>
                      <th className="p-3.5">ZIP Output Format</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    {BATCH_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/30 transition-colors">
                        <td className="p-3.5 font-bold text-text-main">{spec.exam}</td>
                        <td className="p-3.5 font-mono text-emerald-700 font-bold">{spec.photoSpec}</td>
                        <td className="p-3.5 font-mono">{spec.sigSpec}</td>
                        <td className="p-3.5 font-mono text-text-main/70">{spec.namingConvention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Why Batch Processing Matters */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-600" />
                Why Cyber Cafes &amp; CSC Centers Choose Kagazo Bulk Resizer
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    50x
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Zero Single-Click Fatigue</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Process 50 candidates in 3 seconds. Stop uploading and downloading 50 individual photos one by one.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    ZIP
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Structured ZIP Archive</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instantly packs all compliant files into one clean ZIP file ready for extraction on counter workstations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    DPI
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Every file receives true binary DPI headers ensuring 100% acceptance on central government application servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg sm:text-xl font-bold text-text-main">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                    <h3 className="font-bold text-text-main text-sm flex items-start gap-2">
                      <span className="text-emerald-600 font-extrabold">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-text-main/80 leading-relaxed pl-5">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            {/* Quick Navigation / Related Tools */}
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related CSC Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  4×6&quot; Photo Sheet Maker
                </Link>
                <Link
                  href="/tools/pvc-id-card-maker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  PVC Smart Card Studio
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Digital Self-Attestation
                </Link>
                <Link
                  href="/tools/specifications"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Exam Spec Radar (40+ Exams)
                </Link>
              </div>
            </div>

            {/* Sidebar AdSlot */}
            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
