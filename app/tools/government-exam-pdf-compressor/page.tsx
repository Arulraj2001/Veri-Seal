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

const config = TOOL_CONFIGS['government-exam-pdf-compressor'];

export const metadata: Metadata = {
  title: 'Government Exam PDF Compressor | Central & State Portal Standards | Kagazo',
  description: 'Compress educational certificates and marksheets for UPSC, SSC, IBPS, RRB, and State PSC portals. 100% compliant in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/government-exam-pdf-compressor',
  },
  openGraph: {
    title: 'Government Exam PDF Compressor | Central & State Portal Standards | Kagazo',
    description: 'Compress educational certificates and marksheets for UPSC, SSC, IBPS, RRB, and State PSC portals. 100% compliant in-browser RAM privacy.',
    url: 'https://kagazo.in/tools/government-exam-pdf-compressor',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "Union Public Service Commission (UPSC)",
    "docType": "Matriculation (DOB) & Degree Proofs",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "220 KB",
    "notes": "Requires high legibility of university seal, roll number, and signature."
  },
  {
    "authority": "Staff Selection Commission (SSC)",
    "docType": "Educational Qualifications & Category Proofs",
    "officialLimit": "50 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Strict enforcement: files over 200 KB blocked at upload stage."
  },
  {
    "authority": "TNPSC / State Public Service Commissions",
    "docType": "OTR Marksheets & Community Certificates",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "185 KB",
    "notes": "Files below 100 KB or above 200 KB will trigger immediate rejection."
  },
  {
    "authority": "Institute of Banking Personnel (IBPS)",
    "docType": "Handwritten Declarations & Category Proofs",
    "officialLimit": "100 KB to 500 KB",
    "targetUsed": "350 KB",
    "notes": "Clear contrast against white paper background is mandatory."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Exam Certificate",
    "desc": "Drag and drop your scanned degree, marksheet, or category proof PDF into the workspace."
  },
  {
    "step": 2,
    "title": "Select Commission Standard",
    "desc": "Choose the target preset matching your application portal (100\u2013200 KB or 100\u2013300 KB)."
  },
  {
    "step": 3,
    "title": "Inspect Page Previews",
    "desc": "Preview all document pages. Exclude any non-mandatory instruction pages or blank leaves."
  },
  {
    "step": 4,
    "title": "In-Memory Stream Optimization",
    "desc": "Click Compress. Scanned images are calibrated to 150\u2013200 DPI while text vectors remain intact."
  },
  {
    "step": 5,
    "title": "Download Compliant PDF",
    "desc": "Examine the file size and stamp sharpness using the high-resolution loupe before saving."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Under-100 KB Portal Rejection",
    "title": "File Compressed Below Portal Minimum",
    "desc": "Commissions like TNPSC reject files under 100 KB due to low-res legibility rules. Kagazo locks a 170\u2013190 KB sweet spot."
  },
  {
    "badge": "Error: Over-Limit 201 KB Rejection",
    "title": "Fractional Excess Causing Upload Failure",
    "desc": "Government servers block files that exceed stated limits by even 0.1 KB. Kagazo enforces strict safety ceilings."
  },
  {
    "badge": "Error: Illegible Official Signatures",
    "title": "Over-Quantization Blurring Gazetted Stamps",
    "desc": "Aggressive lossy compression destroys fine ink signatures. Kagazo preserves high-contrast edge curves."
  },
  {
    "badge": "Error: Security Certificate Stripping",
    "title": "Corrupted Metadata in PDF Scans",
    "desc": "Low-quality tools strip PDF compliance headers. Kagazo outputs standard ISO-compliant PDF 1.7 streams."
  }
];

const FAQS = [
  {
    "question": "What is the standard PDF file size limit for government exams in India?",
    "answer": "Most central and state commissions enforce limits between 100 KB and 300 KB. SSC standardizes on 50\u2013200 KB, TNPSC on strictly 100\u2013200 KB, and UPSC ORA on 100\u2013300 KB. Kagazo provides calibrated presets for all major commissions."
  },
  {
    "question": "Will official rubber stamps and gazetted officer signatures remain legible?",
    "answer": "Yes. Kagazo isolates high-frequency line art and stamp contours, preventing ink bleeding or blurriness while selectively compressing background paper texture."
  },
  {
    "question": "Why do some government portals reject PDFs that are too small?",
    "answer": "Commissions like TNPSC set a strict 100 KB minimum floor to prevent applicants from uploading heavily pixelated scans where roll numbers and grades cannot be verified by scrutiny committees."
  },
  {
    "question": "Can I combine and compress both sides of a marksheet into one PDF?",
    "answer": "Yes! Upload both pages into our workflow. The engine balances compression across both sheets to ensure the combined document stays within the prescribed limit."
  },
  {
    "question": "Are my confidential educational credentials uploaded to any server?",
    "answer": "Never. Kagazo processes all PDF documents locally in your browser memory via WebAssembly. Zero files are uploaded or stored remotely."
  },
  {
    "question": "Does Kagazo add any watermark or Kagazo logo to my compressed document?",
    "answer": "No. All documents generated by Kagazo are 100% clean with zero watermarks, brand stamps, or alterations."
  },
  {
    "question": "How can I verify that my PDF is ready for portal submission?",
    "answer": "After compression, check the exact output file size shown in kilobytes and use the built-in zoom loupe to confirm that all text, serial numbers, and signatures are crisp."
  },
  {
    "question": "Which image formats can I convert into compliant exam PDFs?",
    "answer": "You can convert JPG, PNG, and mobile HEIC scans into compliant PDF documents directly using our dedicated exam tools."
  },
  {
    "question": "Can I compress community, EWS, and disability certificates with this tool?",
    "answer": "Yes. The engine is optimized for all official certificates issued by Tehsildars, Revenue Authorities, and Medical Boards."
  },
  {
    "question": "Does this tool work on mobile devices?",
    "answer": "Yes. Kagazo works seamlessly in Chrome, Safari, and Firefox on both Android and iOS smartphones without requiring app installation."
  }
];

export default function ExamPdfCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Government Exam PDF Compressor | Central & State Portal Standards | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/government-exam-pdf-compressor',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Compress educational certificates and marksheets for UPSC, SSC, IBPS, RRB, and State PSC portals. 100% compliant in-browser RAM privacy.',
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
            name: 'Government Exam PDF Compressor',
            item: 'https://kagazo.in/tools/government-exam-pdf-compressor',
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
          <span className="text-primary font-bold truncate">Government Exam PDF Compressor</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official Central & State Portal Application Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Government Exam </span>
            <span className="text-primary">PDF Compressor</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress educational certificates, community proofs, and marksheets strictly to central and state portal limits (100KB–300KB). Zero server uploads.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <GraduationCap className="w-4 h-4 text-primary" /> UPSC • SSC • State PSC Compliant
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
                  Multi-Agency Gateway Standard
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Pre-Calibrated for Central & State Public Service Commissions
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Government recruitment application servers employ strict automated file checkers that reject non-compliant sizes. Kagazo guarantees exact compliance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Portal Presets
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Auto-configured for UPSC, SSC, IBPS, RRB, and State PSC thresholds.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Stamp & Signature Guard
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Isolates high-frequency text zones to preserve official seal legibility.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your academic and category certificates never touch external servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Official Commission PDF Size Limits & Verification Thresholds
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Current application server file constraints across prominent national recruitment bodies:
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
                  <strong>Official Rejection Warning:</strong> Application servers automatically reject files outside their stated range. Ensure your document is within bounds prior to fee payment.
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
                <Link href="/tools/tnpsc-pdf-compressor" className="text-primary hover:underline font-medium">
                  TNPSC PDF Compressor (100–200KB)
                </Link>
                <Link href="/tools/upsc-pdf-compressor" className="text-primary hover:underline font-medium">
                  UPSC PDF Compressor (100–300KB)
                </Link>
                <Link href="/tools/ssc-pdf-compressor" className="text-primary hover:underline font-medium">
                  SSC PDF Compressor (50–200KB)
                </Link>
                <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                  Compress PDF to 200KB
                </Link>
                <Link href="/tools/compress-pdf-to-300kb" className="text-primary hover:underline font-medium">
                  Compress PDF to 300KB
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
