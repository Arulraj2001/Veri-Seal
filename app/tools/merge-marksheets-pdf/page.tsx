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
import MarksheetMergeEngine from '@/components/tools/MarksheetMergeEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Merge Marksheets to Single PDF Online Free (<500KB or <1MB) | Kagazo',
  description: 'Combine multiple semester marksheets, 10th & 12th certificates, and degree proofs into one unified PDF strictly under 500KB or 1MB online free. 100% private in-browser.',
  alternates: {
    canonical: 'https://kagazo.in/tools/merge-marksheets-pdf',
  },
  openGraph: {
    title: 'Merge Marksheets to Single PDF Online Free (<500KB or <1MB) | Kagazo',
    description: 'Combine multiple semester marksheets, 10th & 12th certificates, and degree proofs into one unified PDF strictly under 500KB or 1MB online free. 100% private in-browser.',
    url: 'https://kagazo.in/tools/merge-marksheets-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "TCS / Infosys / Wipro Onboarding",
    "docType": "All Semester Marksheets (1 to 8)",
    "officialLimit": "Single PDF under 2 MB",
    "targetUsed": "1.2 MB - 1.6 MB",
    "notes": "Consolidated chronological order required; all passing credits visible."
  },
  {
    "authority": "Foreign University Admissions (WES)",
    "docType": "Undergraduate Transcripts & Degree",
    "officialLimit": "Single PDF under 5 MB",
    "targetUsed": "2.5 MB - 4.0 MB",
    "notes": "University controller of exams signature and seal must remain sharp."
  },
  {
    "authority": "State PSC Recruitment Portals",
    "docType": "Essential Educational Qualifications",
    "officialLimit": "Single PDF under 500 KB",
    "targetUsed": "420 KB",
    "notes": "Combines 10th, 12th, and Degree into one compliant file."
  },
  {
    "authority": "Passport Seva & Visa Portals",
    "docType": "Educational Attestation Bundle",
    "officialLimit": "Single PDF under 1 MB",
    "targetUsed": "850 KB",
    "notes": "High-resolution text and official university seals required."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Marksheet Files",
    "desc": "Select individual PDF marksheets or photos of your semester grade sheets."
  },
  {
    "step": 2,
    "title": "Arrange Chronological Order",
    "desc": "Drag thumbnails to sequence Semester 1 through 8 or 10th, 12th, and Degree."
  },
  {
    "step": 3,
    "title": "Select Size Target",
    "desc": "Choose your portal ceiling: Under 500 KB, Under 1 MB, or Under 2 MB."
  },
  {
    "step": 4,
    "title": "In-Memory Stream Assembly",
    "desc": "The engine merges PDF streams and compresses raster images evenly across pages."
  },
  {
    "step": 5,
    "title": "Download Consolidated PDF",
    "desc": "Inspect all pages with our multi-page previewer and download in 1 click."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: File Size Limit Exceeded",
    "title": "Combined 8-Semester File Over 5 MB",
    "desc": "Merging uncompressed PDFs creates huge files. Kagazo downsamples images to match limits."
  },
  {
    "badge": "Error: Disordered Semester Sequence",
    "title": "Mark Sheets Uploaded Out of Order",
    "desc": "Scrutiny officers reject disorganized files. Kagazo makes visual reordering effortless."
  },
  {
    "badge": "Error: Uneven Page Orientations",
    "title": "Landscape & Portrait Pages Mixed Inconsistently",
    "desc": "Rotating phone scans causes sideways pages. Kagazo standardizes orientation."
  },
  {
    "badge": "Error: Low-Quality Illegible Grades",
    "title": "Aggressive Compression Blurring Subject Marks",
    "desc": "Generic compressors blur marks tables. Kagazo protects tabular text clarity."
  }
];

const FAQS = [
  {
    "question": "Why do job and university portals require all marksheets in a single PDF?",
    "answer": "Most application portals (including TCS, Infosys, and international universities) have only one single file upload button for academic records. Merging them into a single chronological PDF ensures all qualifications can be reviewed without missing pages."
  },
  {
    "question": "Can I merge both PDF files and JPG photos of marksheets together?",
    "answer": "Yes! Kagazo accepts both existing PDF documents and image files (JPG, PNG, HEIC). The engine converts photos to standard A4 pages and merges them with your existing PDFs seamlessly."
  },
  {
    "question": "How do I ensure the merged marksheet PDF stays under 500 KB or 1 MB?",
    "answer": "Simply select your desired target preset (Under 500 KB, Under 1 MB, or Under 2 MB). Our engine dynamically calculates compression ratios per page to ensure the final document strictly respects the chosen limit."
  },
  {
    "question": "Are my academic records safe and private?",
    "answer": "100% secure. Processing takes place entirely within your browser memory (RAM) using client-side WebAssembly. No certificates or student data are ever uploaded to cloud servers."
  },
  {
    "question": "Can I reorder marksheets after uploading them?",
    "answer": "Yes. You can drag and drop file cards to arrange semesters in chronological order (e.g., Sem 1, Sem 2, Sem 3...) before merging."
  },
  {
    "question": "Will official university rubber stamps and signatures remain clear?",
    "answer": "Yes. Kagazo isolates high-frequency line art to protect university seals, registrar signatures, and grade points from compression blurring."
  },
  {
    "question": "How many marksheets can I merge into one document?",
    "answer": "You can merge up to 30 individual marksheet files or certificates simultaneously without performance degradation."
  },
  {
    "question": "Does Kagazo add any watermark to the merged PDF?",
    "answer": "Never. The generated document is completely clean with zero watermarks, brand stamps, or modified metadata."
  },
  {
    "question": "Can I merge marksheets directly from my smartphone?",
    "answer": "Yes. The tool is fully responsive and functions smoothly on mobile browsers including Safari on iPhone and Chrome on Android."
  },
  {
    "question": "What should I do if some pages are rotated sideways?",
    "answer": "You can use the built-in rotate buttons on each page card to ensure all certificates and marksheets are oriented vertically in portrait mode."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Merge Marksheets to Single PDF Online Free (<500KB or <1MB) | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/merge-marksheets-pdf',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Combine multiple semester marksheets, 10th & 12th certificates, and degree proofs into one unified PDF strictly under 500KB or 1MB online free. 100% private in-browser.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Merge Marksheets into a Single PDF in 5 Steps',
        description: 'Consolidate multiple marksheet files into a single compliant document:',
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
            name: 'Merge Marksheets PDF',
            item: 'https://kagazo.in/tools/merge-marksheets-pdf',
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
          <span className="text-primary font-bold truncate">Merge Marksheets PDF</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Multi-Semester Marksheet & Degree Consolidator • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Merge Marksheets to </span>
            <span className="text-primary">Single PDF (Under 500KB or 1MB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Combine all your semester grade cards, diplomas, 10th & 12th marksheets, and consolidated transcripts into a single, print-ready PDF strictly under 500KB or 1MB. 100% private in-browser processing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> University & Visa Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <MarksheetMergeEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Multi-Semester Consolidation Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Stream-Level Page Balancing with Strict Upload Targets
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                University admission portals and employment verification servers only allow a single PDF attachment for all academic transcripts. Kagazo combines multiple marksheets while enforcing strict file size ceilings.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strict Ceiling Controls
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Preset limits for 500 KB, 1 MB, or 2 MB ensure guaranteed portal upload acceptance.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Drag & Drop Reordering
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Arrange chronological semester sheets effortlessly with visual drag-and-drop cards.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Academic grades and university registration numbers never touch cloud servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Consolidated Marksheet Upload Rules Across Major Gateways
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verification guidelines for multi-page transcript submissions:
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
                  <strong>Technical Advisory:</strong> Portals will reject applications if marksheets are uploaded in random chronological order or exceed single-attachment size caps.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Merge Marksheets into a Single PDF in 5 Steps
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
                  <Link href="/tools/tn-marksheet-compressor" className="text-primary hover:underline font-medium">
                    TN Marksheet Compressor
                  </Link>
                  <Link href="/tools/compress-pdf-to-500kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 500KB
                  </Link>
                  <Link href="/tools/compress-pdf-to-1mb" className="text-primary hover:underline font-medium">
                    Compress PDF to 1MB
                  </Link>
                  <Link href="/tools/self-attest-pdf" className="text-primary hover:underline font-medium">
                    Self-Attest PDF Tool
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
