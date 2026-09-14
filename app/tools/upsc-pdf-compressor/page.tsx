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
  GraduationCap,
} from 'lucide-react';
import { PdfCompressorEngine } from '@/components/tools/PdfCompressorEngine';
import { TOOL_CONFIGS } from '@/components/tools/tool-configs';
import { AdSlot } from '@/components/ads/AdSlot';

const config = TOOL_CONFIGS['upsc-pdf-compressor'];

export const metadata: Metadata = {
  title: 'UPSC PDF Compressor | Civil Services, CDS & NDA Document Tool | Kagazo',
  description: 'Compress educational certificates and category proofs strictly under 300KB for UPSC Civil Services, ORA, NDA, and CDS portals. 100% private in-browser.',
  alternates: {
    canonical: 'https://kagazo.in/tools/upsc-pdf-compressor',
  },
  openGraph: {
    title: 'UPSC PDF Compressor | Civil Services, CDS & NDA Document Tool | Kagazo',
    description: 'Compress educational certificates and category proofs strictly under 300KB for UPSC Civil Services, ORA, NDA, and CDS portals. 100% private in-browser.',
    url: 'https://kagazo.in/tools/upsc-pdf-compressor',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "UPSC Civil Services (CSE)",
    "docType": "Matriculation (DOB) Certificate",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "220 KB",
    "notes": "Birth date, student name, and board secretary signature must be clear."
  },
  {
    "authority": "UPSC ORA Portal",
    "docType": "Degree / Provisional Certificate",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "220 KB",
    "notes": "University registrar signature and degree classification must be visible."
  },
  {
    "authority": "UPSC NDA / CDS / AFCAT",
    "docType": "Category & Disability Proofs",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "210 KB",
    "notes": "Central government format caste/EWS certificate with competent authority seal."
  },
  {
    "authority": "UPSC Engineering Services (ESE)",
    "docType": "Detailed Application Form (DAF) Annexures",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "240 KB",
    "notes": "Multi-page document uploads require uniform page dimension scaling."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload UPSC Document",
    "desc": "Select your matriculation certificate, degree, or category proof PDF."
  },
  {
    "step": 2,
    "title": "300 KB Ceiling Active",
    "desc": "The engine locks a 300 KB ceiling with a safe 200\u2013250 KB target for UPSC ORA."
  },
  {
    "step": 3,
    "title": "Inspect Document Pages",
    "desc": "Review preview thumbnails. Exclude any non-mandatory instructions or blank folios."
  },
  {
    "step": 4,
    "title": "In-Memory Stream Optimization",
    "desc": "Click Compress. Scanned images are optimized while keeping text vector lines sharp."
  },
  {
    "step": 5,
    "title": "Download Compliant PDF",
    "desc": "Check that file size is under 300 KB and inspect signatures before instant download."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: 301 KB ORA Portal Rejection",
    "title": "Exceeding 300 KB Ceiling on UPSC Server",
    "desc": "Files measuring 300.5 KB are rejected by the UPSC ORA portal. Kagazo enforces a safe 220 KB target."
  },
  {
    "badge": "Error: Unreadable Date of Birth",
    "title": "Pixelated Matriculation Certificate",
    "desc": "Over-compression blurs date-of-birth numerals on 10th certificates. Kagazo preserves numeric typography."
  },
  {
    "badge": "Error: Washed-Out University Seal",
    "title": "Lossy Compression Fading Red & Blue Wax Seals",
    "desc": "Crude algorithms destroy color saturation in seals. Kagazo retains authentic chromatic accuracy."
  },
  {
    "badge": "Error: Multi-Page Aspect Ratio Mismatch",
    "title": "Uneven Scaling in DAF Document Annexures",
    "desc": "Combining mixed-size scans creates awkward aspect ratios. Kagazo standardizes all pages to A4."
  }
];

const FAQS = [
  {
    "question": "What is the PDF file size limit for UPSC Civil Services and ORA applications?",
    "answer": "The UPSC Online Recruitment Application (ORA) and Civil Services DAF portals mandate that uploaded document PDFs must be between 100 KB and 300 KB (some forms permit 20 KB to 300 KB). Kagazo locks in a safe 220 KB target."
  },
  {
    "question": "Will my matriculation certificate date of birth remain clear after compression?",
    "answer": "Yes. Kagazo isolates high-frequency text zones so that dates, student names, and board secretary signatures remain crisp and legible for scrutiny committees."
  },
  {
    "question": "Can I compress my degree certificate and consolidated marksheet together?",
    "answer": "Yes! Upload the combined multi-page PDF. The engine optimizes both pages evenly to stay comfortably under the 300 KB ceiling."
  },
  {
    "question": "Does this tool support OBC Non-Creamy Layer and EWS certificates for UPSC?",
    "answer": "Yes. All central government format category proofs, issuing authority seals, and signature blocks are preserved with high contrast."
  },
  {
    "question": "Are my confidential educational credentials uploaded to any server?",
    "answer": "Never. Kagazo processes all PDF documents locally in your browser memory via WebAssembly. Zero files are uploaded or stored remotely."
  },
  {
    "question": "Does Kagazo add any watermark or logo to the UPSC PDF?",
    "answer": "No. The generated PDF is completely clean with zero watermarks, brand stamps, or alterations."
  },
  {
    "question": "Can I compress documents directly on my smartphone?",
    "answer": "Yes. The tool runs smoothly on Android and iOS mobile browsers without requiring any app download."
  },
  {
    "question": "How does Kagazo handle color saturation in university seals?",
    "answer": "Kagazo retains native color gamut coordinates so that colored governmental watermarks, embossed logos, and multi-color university crests remain vibrant."
  },
  {
    "question": "What should I do if my scanned document is 10 MB?",
    "answer": "Upload the file directly. Our engine downsamples the heavy embedded scan to 150\u2013200 DPI, bringing it safely under 300 KB in seconds."
  },
  {
    "question": "Does this tool work for UPSC NDA, CDS, CAPF, and Engineering Services (ESE)?",
    "answer": "Yes. All exams administered by the Union Public Service Commission adhere to these document upload standards."
  }
];

export default function ExamPdfCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'UPSC PDF Compressor | Civil Services, CDS & NDA Document Tool | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/upsc-pdf-compressor',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Compress educational certificates and category proofs strictly under 300KB for UPSC Civil Services, ORA, NDA, and CDS portals. 100% private in-browser.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Exam PDF in 5 Steps',
        description: 'Official step-by-step workflow to prepare certificates and marksheets for government exam portals.',
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
            name: 'UPSC PDF Compressor',
            item: 'https://kagazo.in/tools/upsc-pdf-compressor',
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
          <span className="text-primary font-bold truncate">UPSC PDF Compressor</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official UPSC ORA & DAF 300 KB Portal Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>UPSC </span>
            <span className="text-primary">PDF Compressor</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress matriculation certificates, degree proofs, and category documents strictly under 300KB for UPSC ORA and DAF with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <GraduationCap className="w-4 h-4 text-primary" /> Civil Services • CDS • NDA Calibrated
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
                  UPSC Gateway Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Calibrated for Union Public Service Commission ORA & DAF Servers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                UPSC servers enforce a strict 300 KB maximum ceiling. Kagazo locks in a safe 200–250 KB zone with high-contrast text and stamp preservation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strict 300 KB Ceiling
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Guarantees documents never cross the UPSC ORA rejection limit.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> DOB & Roll Number Clarity
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Preserves matriculation certificate details with edge-preserving filtering.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Academic and category proofs never leave your personal computer.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  UPSC Application Document Upload Specifications & Ceilings
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official constraints enforced across UPSC examination and online recruitment portals:
                </p>
              </div>

              <div className="overflow-x-auto border border-surface-darker rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface border-b border-surface-darker text-text-main font-bold">
                    <tr>
                      <th className="p-3 sm:p-4">Commission / Exam</th>
                      <th className="p-3 sm:p-4">Document Type</th>
                      <th className="p-3 sm:p-4">Portal Limit</th>
                      <th className="p-3 sm:p-4">Calibrated Target</th>
                      <th className="p-3 sm:p-4">Technical Compliance</th>
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
                  <strong>Official Rejection Warning:</strong> UPSC ORA servers immediately reject files exceeding 300 KB. Ensure your document is within the safe 200–250 KB band.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Compress Exam PDF in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified workflow to ensure instant acceptance on recruitment gateways:
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
                  Common Recruitment Portal Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Critical failure points prevented by our automated validation engine:
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
                  Verified answers regarding exam portal requirements, document security, and file formatting:
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
                  Related Exam Tools
                </h3>
                <div className="flex flex-col gap-2 text-xs">
                <Link href="/tools/government-exam-pdf-compressor" className="text-primary hover:underline font-medium">
                  Government Exam PDF Compressor
                </Link>
                <Link href="/tools/compress-pdf-to-300kb" className="text-primary hover:underline font-medium">
                  Compress PDF to 300KB
                </Link>
                <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                  Compress PDF to 200KB
                </Link>
                <Link href="/tools/merge-marksheets-pdf" className="text-primary hover:underline font-medium">
                  Merge Marksheets PDF
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
