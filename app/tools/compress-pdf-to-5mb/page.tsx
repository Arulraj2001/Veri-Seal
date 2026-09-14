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
  GraduationCap,
  FileCheck,
  FileText,
} from 'lucide-react';
import { UniversalPdfCompressor } from '@/components/tools/UniversalPdfCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF to 5MB Online Free | PhD Thesis & GeM Tenders | Kagazo',
  description:
    'Compress heavy PDF documents strictly under 5MB online free. Optimized for PhD dissertations, Shodhganga uploads, GeM tender proposals, and architectural portfolios. 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-5mb',
  },
  openGraph: {
    title: 'Compress PDF to 5MB Online Free | Kagazo',
    description:
      'Compress 50MB–200MB thesis and tender documents strictly under 5MB without losing high-resolution diagrams. 100% in-browser RAM privacy.',
    url: 'https://kagazo.in/tools/compress-pdf-to-5mb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PORTALS_5MB = [
  {
    authority: 'Shodhganga (INFLIBNET / UGC)',
    documents: 'PhD Theses & Doctoral Dissertations',
    maxLimit: 'Strictly < 5.0 MB per chapter/thesis',
    safeTarget: '4.6 MB',
    notes: 'Mandatory standard for university academic research repository uploads.',
  },
  {
    authority: 'Government e-Marketplace (GeM)',
    documents: 'Technical Tenders & Vendor Catalogs',
    maxLimit: '5 MB per attachment file',
    safeTarget: '4.5 MB',
    notes: 'Ensures immediate procurement bid validation without server timeouts.',
  },
  {
    authority: 'Design & Architecture Portfolios (AICTE / COA)',
    documents: 'Creative Portfolios & Engineering Blueprints',
    maxLimit: '5 MB to 10 MB',
    safeTarget: '4.7 MB',
    notes: 'Preserves CAD vector line weights and full-color architectural renders.',
  },
  {
    authority: 'International Journal Submissions (IEEE / Elsevier)',
    documents: 'Manuscripts & Supplementary Data Files',
    maxLimit: '5 MB per PDF upload',
    safeTarget: '4.6 MB',
    notes: 'Peer-review systems require high-definition mathematical charts and graphs.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Heavy PDF',
    desc: 'Select or drag-and-drop your 20MB–100MB dissertation, tender, or portfolio PDF.',
  },
  {
    step: 2,
    title: '5 MB Target Ceiling Engaged',
    desc: 'The tool locks an exact 5000 KB ceiling, targeting a safe 4.4–4.7 MB landing zone.',
  },
  {
    step: 3,
    title: 'Review Chapter Pages',
    desc: 'Inspect page thumbnails to ensure high-resolution figures and charts are intact.',
  },
  {
    step: 4,
    title: 'In-Memory Stream Optimization',
    desc: 'Click Compress. Embedded photos are optimized while vector schematics remain sharp.',
  },
  {
    step: 5,
    title: 'Download Optimized PDF',
    desc: 'Inspect technical charts in the clarity loupe, then download your verified PDF.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Shodhganga 5MB Gateway Reject',
    title: '5.2 MB PhD Chapter Upload Failure',
    desc: 'Shodhganga aborts uploads exceeding 5000 KB. Kagazo targets 4.6 MB to ensure seamless university repository approval.',
  },
  {
    badge: 'Error: Blurry Engineering Schematics',
    title: 'Rasterizing CAD Lines & Vector Blueprints',
    desc: 'Low-quality compressors turn thin architectural lines into blurry artifacts. Kagazo retains vector strokes untouched.',
  },
  {
    badge: 'Error: Corrupted Mathematical Formulas',
    title: 'Equation Font Rendering Glitches',
    desc: 'LaTeX equation glyphs distort during aggressive downsampling. Kagazo preserves TrueType and Type 1 math font streams.',
  },
  {
    badge: 'Error: Out-of-Memory Browser Crash',
    title: 'Loading Uncompressed 150MB Theses',
    desc: 'Heavy 150MB image-rich dissertations can crash mobile browsers. Kagazo sequences page downsampling in chunks.',
  },
];

const FAQS = [
  {
    question: 'Why does Shodhganga enforce a strict 5MB limit for PhD thesis uploads?',
    answer:
      'Shodhganga (the UGC electronic thesis repository) archives doctoral research from across India. Enforcing a 5 MB limit per chapter guarantees that academic researchers worldwide can download and read research papers smoothly even on low-bandwidth networks.',
  },
  {
    question: 'How does Kagazo compress a 100-page thesis to under 5MB without blurring figures?',
    answer:
      'Kagazo separates text and equation streams from raster photography. Mathematical equations, charts, and vector diagrams are losslessly preserved, while embedded camera photos and scans are optimized with high-efficiency DCT quantization.',
  },
  {
    question: 'Will high-resolution microscopic images and graphs remain clear at 5MB?',
    answer:
      'Yes. The 5MB preset targets 200–250 DPI on raster figures, which provides sufficient clarity for scientific peer review while comfortably meeting the 5000 KB ceiling.',
  },
  {
    question: 'Does this 5MB tool work for GeM government tender bid submissions?',
    answer:
      'Yes. The Government e-Marketplace (GeM) portal strictly caps technical bid document uploads at 5 MB. Our engine ensures your proposal remains compliant without upload lag.',
  },
  {
    question: 'Are my unpublished research findings or proprietary patents uploaded to any cloud?',
    answer:
      'Never. Kagazo processes 100% of your data inside your browser RAM. Your unpublished doctoral research, patents, and business bids are completely confidential and never transmitted over the internet.',
  },
  {
    question: 'Can I remove blank pages or redundant cover sheets before compressing?',
    answer:
      'Yes! Click on any page thumbnail to exclude it from the final compiled PDF, immediately saving file size without degrading visual resolution on active pages.',
  },
  {
    question: 'Does Kagazo add any watermark or banner to my thesis PDF?',
    answer:
      'Zero watermarks. The output PDF is completely clean and identical in formatting to your original academic manuscript.',
  },
  {
    question: 'Can I compress individual chapters separately or the entire thesis at once?',
    answer:
      'Both! You can compress individual chapter PDFs (e.g. Chapter 1 under 5MB) or compile multi-chapter volumes into a single 5MB master document.',
  },
  {
    question: 'Does this tool work on desktop workstations and laptops?',
    answer:
      'Yes. Kagazo runs on any modern browser across Windows, macOS, Linux, and ChromeOS with hardware acceleration.',
  },
  {
    question: 'Is there any fee or daily file limit on Kagazo?',
    answer:
      'No. Kagazo is 100% free and unlimited for all researchers, university faculties, students, and businesses.',
  },
];

export default function CompressPdfTo5MbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF to 5MB Online Free',
        url: 'https://kagazo.in/tools/compress-pdf-to-5mb',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress PDF documents strictly under 5MB online free for PhD thesis and GeM tender uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 5MB in 5 Steps',
        description:
          'Step-by-step instructions to compress doctoral dissertations and tender bids strictly under 5MB.',
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
            name: 'Compress PDF to 5MB',
            item: 'https://kagazo.in/tools/compress-pdf-to-5mb',
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
          <span className="text-primary font-bold truncate">Compress PDF to 5MB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>PhD Thesis &amp; GeM Tender Proposal Preset</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">5MB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress heavy academic dissertations, Shodhganga research papers, GeM tenders, and architectural portfolios strictly <strong>under 5MB</strong>. Zero blur on figures, graphs, and mathematical formulas with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <GraduationCap className="w-4 h-4 text-primary" /> Shodhganga 5MB Standard
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
              initialTargetKb={5000}
              isFixedTarget={true}
              toolHeading="Compress PDF to Under 5 MB"
              toolSubheading="Shrink doctoral dissertations, tender proposals, and portfolios strictly under 5000 KB with vector clarity preservation."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Academic &amp; Enterprise Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Tuned for Shodhganga Theses &amp; GeM Procurement Portals
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Academic dissertations and procurement proposals can easily exceed 50MB when high-resolution diagrams and scanned appendixes are included. Kagazo preserves mathematical typography and vector charts while locking files under 5MB.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" /> Shodhganga Approved
                  </span>
                  <p className="text-xs text-text-main/70">
                    Guarantees a safe 4.6 MB target to avoid thesis upload rejections.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Vector Chart Sharpness
                  </span>
                  <p className="text-xs text-text-main/70">
                    Leaves microscopic charts, CAD schematics, and LaTeX equations crisp.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Research Data Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Unpublished research processed in volatile RAM. Zero server storage.
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
                    Major Gateways Requiring Under 5 MB PDF Submissions
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications from UGC Shodhganga, GeM, and academic publishers.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  5 MB Limits
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
                    {PORTALS_5MB.map((portal, idx) => (
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
                  <strong>Thesis Submission Advice:</strong> Ensure all figure captions and references remain clearly legible. Compress chapters individually or as a single volume strictly below 5000 KB.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress a PDF to 5MB in 5 Steps
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
                Common 5 MB PDF Compression Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (5 MB PDF Compression)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Essential advice on doctoral dissertations, GeM procurement bids, and mathematical chart clarity.
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
                  href="/tools/compress-pdf-to-2mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 2MB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-10mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 10MB
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
