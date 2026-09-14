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
import { HeicConverterEngine } from '@/components/tools/HeicConverterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Convert Apple HEIC to PDF Online Free | Batch iPhone Converter | Kagazo',
  description: 'Convert iPhone and iPad .HEIC photos directly into a single, high-resolution A4 PDF document online free. 100% private in-browser RAM conversion with zero server uploads.',
  alternates: {
    canonical: 'https://kagazo.in/tools/heic-to-pdf',
  },
  openGraph: {
    title: 'Convert Apple HEIC to PDF Online Free | Batch iPhone Converter | Kagazo',
    description: 'Convert iPhone and iPad .HEIC photos directly into a single, high-resolution A4 PDF document online free. 100% private in-browser RAM conversion with zero server uploads.',
    url: 'https://kagazo.in/tools/heic-to-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "Indian Government Portals (UPSC/SSC/TNPSC)",
    "docType": "Certificate & Marksheet Uploads",
    "officialLimit": "PDF / JPG Only (HEIC Blocked)",
    "targetUsed": "Standard A4 PDF",
    "notes": "Native .HEIC files trigger invalid format errors on all portals."
  },
  {
    "authority": "Corporate Expense & HR Gateways",
    "docType": "Invoice & Reimbursement Receipts",
    "officialLimit": "A4 Multi-Page PDF",
    "targetUsed": "Compiled Multi-Page PDF",
    "notes": "Consolidates multiple single receipts into one cohesive document."
  },
  {
    "authority": "Legal & Court Registries",
    "docType": "Evidence Exhibits & Photos",
    "officialLimit": "Archival PDF/A Format",
    "targetUsed": "High-Res PDF",
    "notes": "Preserves original photo metadata and high-DPI image quality."
  },
  {
    "authority": "University Admissions",
    "docType": "Diplomas & High School Certificates",
    "officialLimit": "PDF under 1MB - 2MB",
    "targetUsed": "Optimized PDF",
    "notes": "Ensures easy readability for evaluators without format issues."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload HEIC Photos",
    "desc": "Select one or more .heic photos from your iPhone photo library or Mac/PC."
  },
  {
    "step": 2,
    "title": "Select A4 PDF Target",
    "desc": "Choose the PDF output tab to compile photos into a multi-page document."
  },
  {
    "step": 3,
    "title": "Review Page Sequence",
    "desc": "Reorder photo thumbnails so receipts or certificate pages appear in correct order."
  },
  {
    "step": 4,
    "title": "In-Memory Conversion",
    "desc": "Click Convert All. WebAssembly decodes HEIC bytes directly in your browser RAM."
  },
  {
    "step": 5,
    "title": "Download Unified PDF",
    "desc": "Download your compiled A4 PDF document instantly with zero watermarks."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Unsupported HEIC Extension",
    "title": "Portal Rejecting .HEIC Files",
    "desc": "Indian portals strictly reject .HEIC files. Converting to standard PDF solves this instantly."
  },
  {
    "badge": "Error: Clipped Photo Borders on Print",
    "title": "Photos Cut Off When Printed",
    "desc": "Raw photos lack print margins. Kagazo automatically adds 10mm print-safe margins on A4."
  },
  {
    "badge": "Error: Massive File Size on iPhone Photos",
    "title": "12MP Camera Photos Exceeding Limits",
    "desc": "iPhone photos average 3-5MB each. Kagazo balances resolution to keep total file size reasonable."
  },
  {
    "badge": "Error: Cloud Privacy Concerns",
    "title": "Uploading Personal Photos to Unknown Servers",
    "desc": "Many online converters store photos. Kagazo processes 100% locally with zero uploads."
  }
];

const FAQS = [
  {
    "question": "How do I convert multiple iPhone HEIC photos into a single PDF?",
    "answer": "Drag and drop all your .heic photos into the Kagazo dropzone above. Ensure the \"A4 PDF\" format tab is selected, then click \"Convert All\". Our client-side engine decodes each photo and assembles them into a multi-page A4 PDF."
  },
  {
    "question": "Are my personal iPhone photos or documents uploaded to any remote server?",
    "answer": "No. Your documents and photos never leave your device. All HEIC decompression and PDF page assembly run 100% locally inside your browser\u2019s memory using WebAssembly. Zero files are stored or uploaded."
  },
  {
    "question": "Will my photos fit properly on standard A4 paper when printed?",
    "answer": "Yes. Our engine automatically calculates the exact aspect ratio of each photo and centers it with standard 10mm margins on A4 paper dimensions (210mm \u00d7 297mm). This guarantees that neither text nor edges are clipped."
  },
  {
    "question": "What is the file size limit for converting HEIC to PDF?",
    "answer": "Because all processing takes place locally in your device RAM, there are no artificial file size caps. You can easily merge up to 50 high-resolution iPhone camera photos into a unified PDF document."
  },
  {
    "question": "Can I also download the converted photos as separate JPG files?",
    "answer": "Yes! If you need individual image files instead of a combined PDF, you can switch to the JPG tab and download high-resolution JPEG files."
  },
  {
    "question": "Why does my government portal reject .HEIC photos?",
    "answer": "Government portal servers were built to accept standard MIME types like image/jpeg and application/pdf. They do not have native decoders for Apple\u2019s proprietary HEIF container, resulting in format errors."
  },
  {
    "question": "Does this tool work on Windows PCs and Android devices?",
    "answer": "Yes. You can open and convert HEIC photos transferred from an iPhone on any Windows, Mac, Linux, Android, or ChromeOS browser."
  },
  {
    "question": "Does Kagazo add any watermark or logo to the PDF?",
    "answer": "No. Every PDF generated is 100% clean and watermark-free."
  },
  {
    "question": "How fast is the conversion process?",
    "answer": "Because files are not uploaded to a remote server over the internet, conversion happens almost instantaneously using your device CPU."
  },
  {
    "question": "Can I convert live photos and portrait mode shots?",
    "answer": "Yes. The still image component of Live Photos and Portrait Mode photos are decoded seamlessly."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Convert Apple HEIC to PDF Online Free | Batch iPhone Converter | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/heic-to-pdf',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Convert iPhone and iPad .HEIC photos directly into a single, high-resolution A4 PDF document online free. 100% private in-browser RAM conversion with zero server uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert iPhone HEIC to PDF in 5 Steps',
        description: 'Convert your Apple iPhone photos into an A4 PDF document in seconds:',
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
            name: 'HEIC to PDF Converter',
            item: 'https://kagazo.in/tools/heic-to-pdf',
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
          <span className="text-primary font-bold truncate">HEIC to PDF Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Multi-Page A4 PDF Compiler • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Convert Apple HEIC to </span>
            <span className="text-primary">PDF Document Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Merge multiple iPhone receipts, scanned certificate photos, and documents directly into a print-ready A4 PDF. Zero cloud uploads, zero watermarks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> iPhone & iPad HEIC Compatible
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <HeicConverterEngine defaultFormat="pdf" toolHeading="Apple HEIC to A4 PDF Converter Studio" toolSubheading="Upload iPhone photos. Each photo is decoded and centered on an A4 page inside your browser's memory." />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Client-Side HEIC Decoding
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Direct In-Browser HEIC Decompression & A4 PDF Layout
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Government and corporate portals do not accept Apple .HEIC format photos. Kagazo decodes HEIC containers directly in browser memory using WebAssembly and compiles them into standard A4 PDF pages.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> True In-Browser Decoding
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Uses libheif compiled to WebAssembly to decompress Apple HEIC files locally.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> A4 Centering & Margins
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically centers iPhone photos with standard 10mm margins for printing.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Private Processing
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your photos never travel over the network or get stored on remote servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Apple HEIC vs. Standard PDF Portal Compatibility
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Technical differences between iOS native capture and government portal requirements:
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
                  <strong>Technical Advisory:</strong> Most application portals will display "Invalid File Format" if you attempt to upload raw .HEIC photos taken on an iPhone.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert iPhone HEIC to PDF in 5 Steps
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
                  <Link href="/tools/pdf-to-image" className="text-primary hover:underline font-medium">
                    PDF to Image Converter
                  </Link>
                  <Link href="/tools/clean-document-scanner" className="text-primary hover:underline font-medium">
                    Clean Document Scanner
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
