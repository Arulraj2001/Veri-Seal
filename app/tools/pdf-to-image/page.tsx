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
import { PdfToImageEngine } from '@/components/tools/PdfToImageEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PDF to Image Converter (300 DPI) Online Free | Extract JPG from PDF | Kagazo',
  description: 'Convert PDF documents, e-Aadhaar, admit cards, and marksheets into crisp 300 DPI JPEG or PNG images online free. 100% in-memory processing, zero watermark, instant page download.',
  alternates: {
    canonical: 'https://kagazo.in/tools/pdf-to-image',
  },
  openGraph: {
    title: 'PDF to Image Converter (300 DPI) Online Free | Extract JPG from PDF | Kagazo',
    description: 'Convert PDF documents, e-Aadhaar, admit cards, and marksheets into crisp 300 DPI JPEG or PNG images online free. 100% in-memory processing, zero watermark, instant page download.',
    url: 'https://kagazo.in/tools/pdf-to-image',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "Police & Uniformed Services",
    "docType": "Admit Card & ID Proof Images",
    "officialLimit": "JPEG / JPG under 500 KB",
    "targetUsed": "300 DPI High-Res",
    "notes": "Must clearly show candidate photo, barcode, and exam center details."
  },
  {
    "authority": "Bank Recruitment (IBPS/SBI)",
    "docType": "Handwritten Declaration & ID Proofs",
    "officialLimit": "JPG between 50 KB - 200 KB",
    "targetUsed": "300 DPI Clean Scan",
    "notes": "High contrast against white background is strictly enforced."
  },
  {
    "authority": "State Teacher Recruitment (TET)",
    "docType": "Degree Certificates & Domicile Proof",
    "officialLimit": "JPG under 300 KB",
    "targetUsed": "300 DPI Crisp Text",
    "notes": "Table of marks and total percentage must be easily verifiable."
  },
  {
    "authority": "Passport Seva & Visa Support",
    "docType": "Supporting Evidence Attachments",
    "officialLimit": "JPG / PNG under 1 MB",
    "targetUsed": "300 DPI Archival",
    "notes": "Embassy verification requires authentic ink color and stamp fidelity."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload PDF Document",
    "desc": "Drag and drop your single or multi-page PDF into the processing workspace."
  },
  {
    "step": 2,
    "title": "Choose 300 DPI Resolution",
    "desc": "Select 300 DPI for official scrutiny quality or 150 DPI for standard web uploads."
  },
  {
    "step": 3,
    "title": "Select Output Format",
    "desc": "Choose JPEG for government portals or PNG for graphics with transparent backgrounds."
  },
  {
    "step": 4,
    "title": "In-Memory Page Rendering",
    "desc": "Click Extract. The browser renders each page to a high-resolution canvas."
  },
  {
    "step": 5,
    "title": "Download Extracted Images",
    "desc": "Inspect using the hover zoom loupe and download individual pages or batch archive."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Low-DPI Blurry Serial Numbers",
    "title": "Blurry Roll Numbers on 72 DPI Export",
    "desc": "Standard PDF viewers export at screen resolution (72 DPI). Kagazo renders at true 300 DPI."
  },
  {
    "badge": "Error: Massive Uncompressed PNG Files",
    "title": "PNG Image Exceeding Upload Ceiling",
    "desc": "Uncompressed PNGs exceed 5 MB easily. Kagazo optimizes JPEG compression to stay within limits."
  },
  {
    "badge": "Error: Password-Protected PDF Failure",
    "title": "Locked e-Aadhaar Rendering Black Screen",
    "desc": "Password-protected PDFs fail to convert. Use our Unlock PDF tool first before extracting."
  },
  {
    "badge": "Error: Privacy Leaks on Cloud Servers",
    "title": "Uploading Identity Proofs to Untrusted Sites",
    "desc": "Most converters store files on remote disks. Kagazo processes 100% locally in browser RAM."
  }
];

const FAQS = [
  {
    "question": "Why do exam portals require 300 DPI images instead of PDFs?",
    "answer": "Certain recruitment and admission portals only have image upload fields (JPG/JPEG) for identity cards and educational certificates. Extracting at 300 DPI ensures all micro-text, serial numbers, and signatures remain 100% legible."
  },
  {
    "question": "How do I convert my e-Aadhaar PDF into a JPG image?",
    "answer": "Upload your e-Aadhaar PDF into the Kagazo upload box, select 300 DPI and JPEG format, and click \"Extract 300 DPI Images\". You can preview the extracted high-resolution image and download it immediately."
  },
  {
    "question": "Will converting a multi-page PDF generate images for all pages?",
    "answer": "Yes! Kagazo converts all pages of your PDF document. You can preview each page individually using the tab selector and download individual pages or batch-download all pages in one click."
  },
  {
    "question": "Are my confidential identity PDFs stored on your server?",
    "answer": "Never. Kagazo operates entirely in ephemeral volatile memory (RAM). Your PDF and the extracted images are immediately wiped once downloaded. We never save files to disk or databases."
  },
  {
    "question": "What is the difference between 150 DPI and 300 DPI?",
    "answer": "150 DPI is ideal for general web viewing and smaller file sizes (under 100 KB), while 300 DPI is the official print and archival standard required by government scrutiny committees."
  },
  {
    "question": "Can I extract images on my smartphone?",
    "answer": "Yes. Kagazo runs smoothly on mobile browsers including Safari on iPhone and Chrome on Android devices."
  },
  {
    "question": "Does Kagazo add any watermark or logo to the extracted images?",
    "answer": "No. All images are 100% clean and free of watermarks or brand overlays."
  },
  {
    "question": "Which image formats can I export?",
    "answer": "You can export pages as high-quality JPEG (.jpg) or lossless PNG (.png) files."
  },
  {
    "question": "Can I convert a 50-page PDF document?",
    "answer": "Yes. Kagazo handles large multi-page PDF documents efficiently in client-side memory without timing out."
  },
  {
    "question": "How do I convert password-protected PDFs?",
    "answer": "If your PDF is password-protected (like an e-Aadhaar), unlock it first using Kagazo\u2019s free \"Unlock PDF\" tool, then extract the images."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PDF to Image Converter (300 DPI) Online Free | Extract JPG from PDF | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/pdf-to-image',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Convert PDF documents, e-Aadhaar, admit cards, and marksheets into crisp 300 DPI JPEG or PNG images online free. 100% in-memory processing, zero watermark, instant page download.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PDF to 300 DPI Image in 5 Steps',
        description: 'Extract high-resolution images from any PDF in 5 simple steps:',
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
            name: 'PDF to Image (300 DPI)',
            item: 'https://kagazo.in/tools/pdf-to-image',
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
          <span className="text-primary font-bold truncate">PDF to Image (300 DPI)</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>High-Resolution 300 DPI Extraction Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Convert PDF to </span>
            <span className="text-primary">Image (300 DPI) Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Extract crystal-clear 300 DPI JPEG or PNG images from any PDF document. Ideal for exam portals that require image uploads of admit cards and marksheets. 100% private in-browser.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> 300 DPI Scrutiny Resolution
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PdfToImageEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Official 300 DPI Standard
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Lossless PDF Page Rasterization for Identity Documents
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Many recruitment portals require identity cards and certificates as standalone JPG/PNG images rather than PDFs. Kagazo renders vector and embedded raster streams at true 300 DPI for flawless verification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> True 300 DPI Resolution
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Maintains razor-sharp text on micro-fonts, serial numbers, and official signatures.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Page Extraction
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Extract individual pages or batch-download all pages in a single click.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Sensitive e-Aadhaar, voter IDs, and diplomas never leave your device memory.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Official Portal Image Resolution & Format Requirements
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Extraction standards across government recruitment and banking portals:
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
                  <strong>Technical Advisory:</strong> Extracting images at low resolution (72 or 96 DPI) causes blurriness on official rubber stamps, leading to portal rejection.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert PDF to 300 DPI Image in 5 Steps
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
                  <Link href="/tools/heic-to-pdf" className="text-primary hover:underline font-medium">
                    HEIC to PDF Converter
                  </Link>
                  <Link href="/tools/clean-document-scanner" className="text-primary hover:underline font-medium">
                    Clean Document Scanner
                  </Link>
                  <Link href="/tools/unlock-pdf" className="text-primary hover:underline font-medium">
                    Unlock PDF Tool
                  </Link>
                  <Link href="/tools/pdf-compressor" className="text-primary hover:underline font-medium">
                    Master PDF Compressor
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
