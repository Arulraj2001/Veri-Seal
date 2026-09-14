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

const config = TOOL_CONFIGS['ssc-pdf-compressor'];

export const metadata: Metadata = {
  title: 'SSC PDF Compressor | CGL, CHSL, MTS & GD Certificate Tool | Kagazo',
  description: 'Compress educational certificates and caste proofs strictly between 50KB and 200KB for SSC CGL, CHSL, MTS, and GD Constable. 100% private in-browser.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ssc-pdf-compressor',
  },
  openGraph: {
    title: 'SSC PDF Compressor | CGL, CHSL, MTS & GD Certificate Tool | Kagazo',
    description: 'Compress educational certificates and caste proofs strictly between 50KB and 200KB for SSC CGL, CHSL, MTS, and GD Constable. 100% private in-browser.',
    url: 'https://kagazo.in/tools/ssc-pdf-compressor',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "SSC CGL Tier 1 & 2",
    "docType": "Graduation Degree & Marksheets",
    "officialLimit": "50 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Degree serial number and university seal must be visible."
  },
  {
    "authority": "SSC CHSL 10+2",
    "docType": "Higher Secondary Certificate",
    "officialLimit": "50 KB to 200 KB",
    "targetUsed": "175 KB",
    "notes": "Roll number and subject marks table must be readable."
  },
  {
    "authority": "SSC MTS / Havaldar",
    "docType": "Matriculation (10th) Certificate",
    "officialLimit": "50 KB to 200 KB",
    "targetUsed": "170 KB",
    "notes": "Date of birth and board issuing authority signature required."
  },
  {
    "authority": "SSC CPO / GD Constable",
    "docType": "Caste / Category & Domicile Certificates",
    "officialLimit": "50 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Tehsildar / SDM rubber stamp and dispatch number must be sharp."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload SSC Document",
    "desc": "Select your 10th, 12th, degree marksheet, or category certificate PDF."
  },
  {
    "step": 2,
    "title": "200 KB Ceiling Locked",
    "desc": "The engine locks a 200 KB ceiling with a safe 160\u2013180 KB operating zone for SSC portals."
  },
  {
    "step": 3,
    "title": "Inspect Page Layout",
    "desc": "Review thumbnails. Deselect any blank back sheets or cover notices to save space."
  },
  {
    "step": 4,
    "title": "In-Memory Stream Optimization",
    "desc": "Click Compress. Scanned images are calibrated to 150 DPI while keeping text sharp."
  },
  {
    "step": 5,
    "title": "Download Verified PDF",
    "desc": "Confirm file size is under 200 KB and inspect serial numbers before instant download."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: 201 KB File Rejected",
    "title": "SSC Portal Upload Size Exceeded",
    "desc": "SSC servers reject files over 200 KB instantly. Kagazo targets 175 KB with safety buffers."
  },
  {
    "badge": "Error: Blurry Marksheet Roll Number",
    "title": "Over-Compression Erasing Roll Digits",
    "desc": "Crude compressors pixelate tabular numbers. Kagazo separates text streams to protect numerical clarity."
  },
  {
    "badge": "Error: Washed-Out Tehsildar Stamp",
    "title": "Lossy Compression Fading Ink Seals",
    "desc": "Low-quality tools wash out blue stamp ink. Kagazo uses edge-preserving chroma downsampling."
  },
  {
    "badge": "Error: Under-50 KB Low-Res Scan",
    "title": "Portal Scrutiny Committee Rejection",
    "desc": "Files below 50 KB are often rejected for poor legibility. Kagazo maintains document density above 100 KB."
  }
];

const FAQS = [
  {
    "question": "What is the PDF file size limit for SSC online applications?",
    "answer": "Staff Selection Commission (SSC) portals mandate that uploaded educational and category certificates must be between 50 KB and 200 KB. Kagazo locks in a safe 175 KB target."
  },
  {
    "question": "Will my roll number and marks table remain legible after compression?",
    "answer": "Yes. Kagazo isolates high-frequency tabular text zones, ensuring roll numbers, marks, and grades remain crisp and clear for document verification."
  },
  {
    "question": "Can I compress both sides of a marksheet into one 200 KB PDF for SSC?",
    "answer": "Yes! Upload the 2-page PDF. The engine compresses both pages evenly, keeping the total document size safely below the 200 KB ceiling."
  },
  {
    "question": "Does this tool work for SSC CGL, CHSL, MTS, CPO, and GD Constable?",
    "answer": "Yes. All examinations conducted by the Staff Selection Commission follow these exact document upload specifications."
  },
  {
    "question": "Are my personal certificates uploaded to any external server?",
    "answer": "Never. Kagazo processes all PDF documents locally in your browser memory via WebAssembly. Zero files are uploaded or stored remotely."
  },
  {
    "question": "Does Kagazo add any watermark or logo to the SSC PDF?",
    "answer": "No. The generated PDF is completely clean with zero watermarks, brand stamps, or alterations."
  },
  {
    "question": "Can I compress documents directly from my mobile phone?",
    "answer": "Yes. The tool runs smoothly on Android and iOS browsers without requiring any app installation."
  },
  {
    "question": "How does Kagazo handle official government rubber stamps?",
    "answer": "Kagazo retains high edge contrast on round rubber stamps, signatures, and seals so verification officers can validate authenticity."
  },
  {
    "question": "What should I do if my scanned document is over 5 MB?",
    "answer": "Upload the file directly into Kagazo. Our engine downsamples the heavy scan to 150 DPI, bringing it safely under 200 KB in seconds."
  },
  {
    "question": "Can I compress OBC Non-Creamy Layer, SC/ST, and EWS certificates with this tool?",
    "answer": "Yes. All central format caste and income certificates issued by competent authorities can be compressed with full stamp clarity."
  }
];

export default function ExamPdfCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'SSC PDF Compressor | CGL, CHSL, MTS & GD Certificate Tool | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/ssc-pdf-compressor',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Compress educational certificates and caste proofs strictly between 50KB and 200KB for SSC CGL, CHSL, MTS, and GD Constable. 100% private in-browser.',
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
            name: 'SSC PDF Compressor',
            item: 'https://kagazo.in/tools/ssc-pdf-compressor',
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
          <span className="text-primary font-bold truncate">SSC PDF Compressor</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official SSC 50 KB to 200 KB Portal Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>SSC </span>
            <span className="text-primary">PDF Compressor</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress matriculation, 10+2, degree marksheets, and category certificates strictly under 200KB for SSC online portals with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <GraduationCap className="w-4 h-4 text-primary" /> CGL • CHSL • MTS • GD Calibrated
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
                  SSC Gateway Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Calibrated for Staff Selection Commission Application Servers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                SSC application servers enforce a strict 200 KB maximum ceiling. Kagazo locks in a safe 160–180 KB zone with high-contrast text and stamp preservation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strict 200 KB Ceiling
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Guarantees documents never cross the SSC portal rejection limit.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Roll Number & Marks Clarity
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Preserves fine tabular numbers with edge-preserving filtering.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Academic and caste certificates never leave your personal computer.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  SSC Application Document Upload Specifications & Ceilings
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official constraints enforced across Staff Selection Commission examinations:
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
                  <strong>Official Rejection Warning:</strong> SSC servers immediately reject files exceeding 200 KB. Verify that your document is within the safe 160–180 KB band.
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
                <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                  Compress PDF to 200KB
                </Link>
                <Link href="/tools/government-exam-pdf-compressor" className="text-primary hover:underline font-medium">
                  Government Exam PDF Compressor
                </Link>
                <Link href="/tools/tnpsc-pdf-compressor" className="text-primary hover:underline font-medium">
                  TNPSC PDF Compressor
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
