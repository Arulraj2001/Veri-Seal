import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Info,
  Layers,
  Users,
  Download,
  Printer,
  Archive,
} from 'lucide-react';
import BatchResizerEngine from '@/components/tools/BatchResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Bulk Batch Photo Resizer & ZIP Downloader Online Free | Kagazo',
  description:
    'Resize and compress up to 50 applicant photos or signatures simultaneously. Zero server disk persistence with instant structured ZIP download pre-calibrated for SSC, UPSC, Banking, and State PSC portals.',
  alternates: {
    canonical: 'https://kagazo.in/tools/batch-photo-resizer',
  },
  openGraph: {
    title: 'Bulk Batch Photo Resizer & ZIP Downloader Online Free | Kagazo',
    description:
      'High-speed batch photo and signature resizer for Cyber Cafe and CSC operators. Process up to 50 applicant photos instantly with organized ZIP export.',
    url: 'https://kagazo.in/tools/batch-photo-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bulk Batch Photo Resizer & ZIP Downloader Online Free | Kagazo',
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

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Select Multiple Photos',
    desc: 'Drag and drop or select up to 50 applicant passport photos or signatures simultaneously from your counter workstation.',
  },
  {
    step: 2,
    title: 'Choose Exam Target Preset',
    desc: 'Select your target examination authority such as SSC, UPSC, Banking IBPS, State PSC, or specify custom millimetre dimensions.',
  },
  {
    step: 3,
    title: 'Review Batch Parameters',
    desc: 'Confirm the targeted KB limits, pixel aspect ratios, and whether files are portrait photographs or horizontal signatures.',
  },
  {
    step: 4,
    title: 'Parallel In-Browser Processing',
    desc: 'Click Process All. Hardware-accelerated canvas workers crop, compress, and inject 300 DPI JFIF headers into each file concurrently.',
  },
  {
    step: 5,
    title: 'Download Consolidated ZIP Archive',
    desc: 'Download the cleanly packaged ZIP file containing all compliant images with standardized candidate filenames ready for portal upload.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Slow Multi-File Upload',
    title: 'Bandwidth Bottlenecks on Slow Connections',
    desc: 'Traditional server tools upload each 10MB photo over internet connections, taking minutes. Kagazo processes all 50 files entirely in local browser RAM in 2 to 3 seconds with zero network latency.',
  },
  {
    badge: 'Error: Mixed Aspect Ratio Distortion',
    title: 'Stretched or Squashed Candidate Signatures',
    desc: 'Batch processing portrait photos and landscape signatures with the same preset causes terrible aspect ratio distortion. Kagazo enforces dedicated aspect profiles for photos versus signatures.',
  },
  {
    badge: 'Error: Disorganized Output Files',
    title: 'Scrambled File Names Causing Portal Mix-Ups',
    desc: 'Downloading 50 files named "IMG_3920.jpg" leads to disastrous mix-ups across different candidate application forms. Kagazo auto-indexes files with clear prefix tags and roll sequences inside the ZIP.',
  },
  {
    badge: 'Error: Browser Memory Exhaustion',
    title: 'Tab Crashes When Uploading 50 Camera RAWs',
    desc: 'Uploading 50 ultra-high-resolution smartphone captures can exceed browser heap limits. Kagazo sequences memory buffers and triggers immediate canvas garbage collection to prevent memory crashes.',
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
  {
    question: 'What should Cyber Cafe operators do if candidates bring different exam specifications?',
    answer:
      'We recommend grouping candidate files by examination type into separate folders before uploading. For example, process all SSC CGL applicants in one 30-second run, followed by IBPS Banking applicants in the next run. This guarantees uniform aspect ratios and compliant KB bounds.',
  },
  {
    question: 'How does client-side ZIP packaging work without uploading files to the cloud?',
    answer:
      'Kagazo utilizes JSZip running in an asynchronous Web Worker thread. Compressed image byte buffers are converted into compressed zip streams directly in browser memory and triggered as a single local file download via a blob URL.',
  },
  {
    question: 'What image formats are supported for bulk batch resizing?',
    answer:
      'Kagazo accepts JPG, JPEG, PNG, WEBP, and modern HEIC/HEIF camera photos from iPhones and Android devices. All outputs are converted into standardized, universally compatible baseline JPEG images required by government servers.',
  },
  {
    question: 'Why do recruitment portals reject bulk-edited photos from generic image editors?',
    answer:
      'Generic bulk desktop editors often strip essential metadata markers or save files as progressive JPEGs. Government servers mandate baseline sequential JPEGs with 300 DPI density tags and strict byte bounds between 20 KB and 50 KB, which Kagazo strictly enforces.',
  },
  {
    question: 'Is there any daily file limit or fee for processing batch applicant photos on Kagazo?',
    answer:
      'No. Kagazo is 100% free and unlimited for all users, including high-volume Cyber Cafe, CSC kiosk, and digital service center operators. You can process hundreds of candidate photos every day without creating an account or paying subscription fees.',
  },
];

export default function BatchResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Bulk Batch Photo Resizer & ZIP Downloader Online Free',
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
        name: 'How to Batch Resize Exam Photos in 5 Steps',
        description:
          'Step-by-step tutorial for Cyber Cafe operators to resize and compress multiple candidate exam photos into a single ZIP archive.',
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
            name: 'Bulk Batch Photo Resizer',
            item: 'https://kagazo.in/tools/batch-photo-resizer',
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
          <span className="text-primary font-bold truncate">Bulk Batch Photo Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
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

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <BatchResizerEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  High-Speed Bulk Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Why Cyber Cafes &amp; CSC Centers Choose Kagazo Bulk Resizer
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Counter operators process dozens of exam applicants during peak registration windows. Kagazo replaces repetitive single-photo editing with parallel in-memory batch compression and structured ZIP packaging.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> 50x Faster Parallelism
                  </span>
                  <p className="text-xs text-text-main/70">
                    Process 50 candidate files in 2 to 3 seconds with hardware-accelerated canvas threads.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Archive className="w-4 h-4" /> Structured ZIP Package
                  </span>
                  <p className="text-xs text-text-main/70">
                    Bundles all converted photos and signatures into a clean ZIP archive ready for immediate extraction.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Printer className="w-4 h-4" /> Embedded 300 DPI JFIF
                  </span>
                  <p className="text-xs text-text-main/70">
                    Every output file contains RFC-compliant binary density markers guaranteed to pass portal verification.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Exam Batch Specifications Reference */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-primary" />
                    Official Exam Batch Specifications Reference
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Standard upload limits applied automatically during parallel batch processing.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Exam Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Recruitment Authority</th>
                      <th className="py-3 px-3">Photo Dimension &amp; Size</th>
                      <th className="py-3 px-3">Signature Dimension &amp; Size</th>
                      <th className="py-3 px-3">ZIP Output Naming Pattern</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {BATCH_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{spec.exam}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{spec.photoSpec}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{spec.sigSpec}</td>
                        <td className="py-3 px-3 font-mono text-xs text-text-main/60">{spec.namingConvention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Counter Operator Recommendation:</strong> For best results, process candidate photos and candidate signatures in separate batches to preserve the respective 3.5:4.5 and 7:2 aspect ratios without cropping.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Batch Resize Exam Photos in 5 Steps
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
                Common Batch Processing Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (Bulk Batch Resizer)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Expert advice for Cyber Cafe operators, CSC centers, and multi-applicant batches.
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
                Related CSC Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  4×6&quot; Photo Sheet Maker
                </Link>
                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSC Photo &amp; Signature Resizer
                </Link>
                <Link
                  href="/tools/compress-image-to-50kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 50KB
                </Link>
                <Link
                  href="/tools/change-image-dpi"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Change Image DPI
                </Link>
                <Link
                  href="/tools/remove-background"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Remove Background
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
