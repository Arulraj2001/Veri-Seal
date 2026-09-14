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
  Layers,
  ArrowDownCircle,
} from 'lucide-react';
import { PdfCompressorEngine } from '@/components/tools/PdfCompressorEngine';
import { TOOL_CONFIGS } from '@/components/tools/tool-configs';
import { AdSlot } from '@/components/ads/AdSlot';

const config = TOOL_CONFIGS['pdf-compressor'];

export const metadata: Metadata = {
  title: 'Compress PDF Online Free | Exact KB Reducer & File Shrinker | Kagazo',
  description:
    'Compress PDF files to any target size (100KB, 200KB, 500KB, 1MB) online free. Retain razor-sharp text and official rubber stamps. 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/pdf-compressor',
  },
  openGraph: {
    title: 'Compress PDF Online Free | Kagazo',
    description:
      'Compress PDF documents to custom KB sizes without losing seal clarity or text sharpness. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/pdf-compressor',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    target: '100 KB - 200 KB',
    useCase: 'TNPSC OTR, State PSC Marksheets, Caste Proofs',
    compressionMode: 'Strict Ceilings + DPI Downsampling',
    recommendation: 'Ensures files never fall below 100KB or exceed 200KB limit.',
  },
  {
    target: '300 KB - 500 KB',
    useCase: 'UPSC ORA, GATE, University Admissions, Resumes',
    compressionMode: 'Balanced Raster Compression + Font Preservation',
    recommendation: 'Preserves high-resolution signatures and official watermarks.',
  },
  {
    target: '1 MB - 2 MB',
    useCase: 'High Court e-Filing, Passport Seva, MCA ROC Documents',
    compressionMode: 'Vector Stream Optimization + JBIG2 Clean',
    recommendation: 'Retains evidentiary typography for multi-page judicial briefs.',
  },
  {
    target: 'Custom / Extreme',
    useCase: 'Email Attachments, WhatsApp Sharing, Cloud Archival',
    compressionMode: 'Aggressive Color Quantization (72-150 DPI)',
    recommendation: 'Maximum weight reduction while keeping letter text completely readable.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload PDF Document',
    desc: 'Drag and drop your single or multi-page PDF into the processing workspace or select from device.',
  },
  {
    step: 2,
    title: 'Choose Target Size or Mode',
    desc: 'Select from popular presets (100KB, 200KB, 500KB, 1MB) or use the custom slider to define your exact size.',
  },
  {
    step: 3,
    title: 'Page Inspection & Exclusion',
    desc: 'Review page previews. Exclude blank backsheets, instruction folios, or redundant pages if needed.',
  },
  {
    step: 4,
    title: 'In-Memory Stream Optimization',
    desc: 'Click Compress. Embedded images are resampled while vector typography and forms remain intact in RAM.',
  },
  {
    step: 5,
    title: 'Instant Download & Verification',
    desc: 'Verify file size and zoom into official rubber stamps using the preview loupe before instant download.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Blurred Rubber Stamp / Signature',
    title: 'Generic Aggressive Rasterization Blurring Seals',
    desc: 'Crude online tools rasterize the entire PDF into a blurry low-res image. Kagazo separates text and vector streams to preserve high-contrast signatures.',
  },
  {
    badge: 'Error: Under-100 KB Boundary Rejection',
    title: 'File Too Small for State Recruitment Portals',
    desc: 'Portals like TNPSC reject PDFs smaller than 100 KB. Kagazo features calibrated floor guards that maintain document density within the acceptable range.',
  },
  {
    badge: 'Error: Incompatible PDF Form Encoding',
    title: 'Corrupted Fillable Form Fields After Compression',
    desc: 'Traditional tools strip XFA and AcroForm dictionaries, making forms unreadable. Kagazo flattens and validates structure without breaking document hierarchy.',
  },
  {
    badge: 'Error: Cloud Privacy & Data Leak Risks',
    title: 'Sensitive Marksheets Stored on External Servers',
    desc: 'Most cloud compressors save documents on remote servers. Kagazo processes 100% in local browser WebAssembly with zero data leaving your machine.',
  },
];

const FAQS = [
  {
    question: 'How does Kagazo compress PDF files without sacrificing text readability?',
    answer:
      'Kagazo uses intelligent stream-level parsing. Instead of flattening your document into a low-grade picture, it leaves font dictionaries and vector curves untouched while downsampling embedded scanner photos and background noise, keeping typography pin-sharp.',
  },
  {
    question: 'Can I compress a PDF to an exact KB size like 150KB or 200KB?',
    answer:
      'Yes. You can select one of our dedicated portal presets or enter a custom target KB. The engine dynamically calculates the optimal JPEG/WebP quality factor and DPI to match your target within a narrow 5% tolerance.',
  },
  {
    question: 'Are my private government IDs and tax documents safe with Kagazo?',
    answer:
      'Completely secure. Kagazo executes all compression algorithms directly inside your web browser via WebAssembly. Your files are never uploaded to any remote server or stored in the cloud.',
  },
  {
    question: 'Why did another compressor make my official stamp and signature unreadable?',
    answer:
      'Many generic tools apply uniform lossy compression across the entire page, degrading fine lines. Kagazo preserves high-contrast edge details so registrar signatures, university stamps, and QR codes remain fully legible.',
  },
  {
    question: 'What is the maximum file size I can upload for compression?',
    answer:
      'You can upload PDF files up to 100 MB directly into the browser. Multi-page documents containing dozens of pages are processed smoothly without server timeouts.',
  },
  {
    question: 'Does Kagazo add any watermark or Kagazo logo to my compressed PDF?',
    answer:
      'Never. All compressed files are 100% clean with zero watermarks, brand stamps, or modified author metadata.',
  },
  {
    question: 'Can I remove blank or unnecessary pages before compressing?',
    answer:
      'Yes. Our interactive page preview allows you to select, reorder, or exclude individual pages prior to compression, saving substantial file weight instantly.',
  },
  {
    question: 'Will hyperlinks and bookmarks in my PDF remain functional after compression?',
    answer:
      'Yes. Document outline trees, internal chapter bookmarks, and external web hyperlinks are safely preserved during the optimization process.',
  },
  {
    question: 'Which compression level is best for government job applications in India?',
    answer:
      'For UPSC and SSC, 100KB to 300KB is optimal. For TNPSC OTR, target between 150KB and 190KB (strictly above 100KB and below 200KB). For court filings, 1MB to 2MB is standard.',
  },
  {
    question: 'Can I compress password-protected PDF files?',
    answer:
      'You must first unlock the PDF using our free "Unlock PDF" tool by entering the known password, after which you can compress it to your desired file size.',
  },
];

export default function MasterPdfCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/pdf-compressor',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress PDF documents to any target KB size online free with in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF in 5 Steps',
        description:
          'Step-by-step guide to compress and shrink PDF documents to custom KB sizes without losing quality.',
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
            name: 'PDF Compressor',
            item: 'https://kagazo.in/tools/pdf-compressor',
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
          <span className="text-primary font-bold truncate">PDF Compressor</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Universal In-Browser PDF Compression Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Reduce PDF file size to custom targets (100KB, 200KB, 500KB, 1MB) with surgical precision. Preserves stamp clarity, text sharpness, and formatting with <strong>100% in-browser RAM privacy</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Sliders className="w-4 h-4 text-primary" /> Exact KB Target Control
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
                  Intelligent Hybrid Compression
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Vector Preservation with Adaptive Raster Optimization
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Standard compressors destroy resolution by converting entire documents into low-grade JPEGs. Kagazo uses hybrid stream decomposition: text and vector lines remain perfectly scalable at infinite zoom, while embedded high-resolution scanner images are compressed using Lanczos resampling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Precise KB Dialing
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Target exact file sizes required by government gateways without tedious trial and error.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Cloud Upload
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Documents are parsed directly in your device memory buffer for 100% confidential processing.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Page Support
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Compress lengthy marksheets, contracts, and transcripts with individual page inspection.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Recommended Compression Targets &amp; Portal Standards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Select the appropriate target size based on your specific application authority requirements:
                </p>
              </div>

              <div className="overflow-x-auto border border-surface-darker rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface border-b border-surface-darker text-text-main font-bold">
                    <tr>
                      <th className="p-3 sm:p-4">Target Band</th>
                      <th className="p-3 sm:p-4">Primary Use Cases</th>
                      <th className="p-3 sm:p-4">Compression Strategy</th>
                      <th className="p-3 sm:p-4">Compliance Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {SPEC_ROWS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="p-3 sm:p-4 font-bold text-primary">{row.target}</td>
                        <td className="p-3 sm:p-4">{row.useCase}</td>
                        <td className="p-3 sm:p-4 font-medium">{row.compressionMode}</td>
                        <td className="p-3 sm:p-4 text-text-main/80">{row.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Notice on Portal Ceilings:</strong> Most Indian state and central recruitment portals reject files that exceed their declared limit by even a single byte. Kagazo automatically incorporates a safety margin (e.g., 185 KB for a 200 KB ceiling) to ensure guaranteed server acceptance.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Compress a PDF in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow these simple steps to shrink your PDF file size while maintaining pristine document clarity:
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
                  Common PDF Compression Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Prevent document rejections caused by common PDF optimization mistakes:
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
                  Authoritative answers regarding PDF compression, security, and portal compatibility:
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
                  <Link href="/tools/compress-pdf-to-100kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 100KB
                  </Link>
                  <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 200KB (TNPSC)
                  </Link>
                  <Link href="/tools/compress-pdf-to-500kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 500KB
                  </Link>
                  <Link href="/tools/compress-pdf-to-1mb" className="text-primary hover:underline font-medium">
                    Compress PDF to 1MB
                  </Link>
                  <Link href="/tools/image-to-pdf-200kb" className="text-primary hover:underline font-medium">
                    Image to PDF 200KB
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
