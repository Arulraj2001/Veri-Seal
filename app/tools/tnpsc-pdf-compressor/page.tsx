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

const config = TOOL_CONFIGS['tnpsc-pdf-compressor'];

export const metadata: Metadata = {
  title: 'TNPSC PDF Compressor | 100KB to 200KB OTR Marksheet Tool | Kagazo',
  description: 'Compress PDF marksheets and community certificates strictly between 100KB and 200KB for TNPSC OTR and online applications. 100% private in-browser.',
  alternates: {
    canonical: 'https://kagazo.in/tools/tnpsc-pdf-compressor',
  },
  openGraph: {
    title: 'TNPSC PDF Compressor | 100KB to 200KB OTR Marksheet Tool | Kagazo',
    description: 'Compress PDF marksheets and community certificates strictly between 100KB and 200KB for TNPSC OTR and online applications. 100% private in-browser.',
    url: 'https://kagazo.in/tools/tnpsc-pdf-compressor',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "TNPSC OTR Portal",
    "docType": "SSLC / 10th Standard Marksheet",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Mandatory date of birth proof; registration number must be razor sharp."
  },
  {
    "authority": "TNPSC OTR Portal",
    "docType": "HSC (+2) / Diploma Marksheet",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Both subject marks and passing certificate must be legible."
  },
  {
    "authority": "TNPSC Online Application",
    "docType": "Community Certificate (BC/MBC/SC/ST)",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "185 KB",
    "notes": "Issuing authority seal and digital QR barcode must scan successfully."
  },
  {
    "authority": "TNPSC Online Application",
    "docType": "PSTM Certificate (Tamil Medium)",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "175 KB",
    "notes": "Headmaster signature and school round seal must be sharp."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload TNPSC Document",
    "desc": "Select your SSLC, HSC, Community, or PSTM certificate PDF from your phone or PC."
  },
  {
    "step": 2,
    "title": "100KB\u2013200KB Lock Active",
    "desc": "The engine automatically targets the 175\u2013190 KB sweet spot for TNPSC OTR servers."
  },
  {
    "step": 3,
    "title": "Verify Page Layout",
    "desc": "Preview all pages. Exclude any non-mandatory blank back sheets or cover notices."
  },
  {
    "step": 4,
    "title": "In-Memory Stream Optimization",
    "desc": "Click Compress. Scanned documents are calibrated while preserving seal contrast."
  },
  {
    "step": 5,
    "title": "Download Verified PDF",
    "desc": "Check that the file size is between 100 KB and 200 KB, then download with 1 click."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Under-100 KB Floor Rejection",
    "title": "TNPSC OTR Rejects Small Files",
    "desc": "Files under 100 KB are rejected by TNPSC OTR to prevent unreadable scans. Kagazo enforces a strict 150\u2013190 KB safe zone."
  },
  {
    "badge": "Error: Exceeded 200 KB Limit",
    "title": "Immediate Upload Failure on OTR Portal",
    "desc": "A file of 201 KB cannot be uploaded to the TNPSC portal. Kagazo locks an 180 KB ceiling with safety margins."
  },
  {
    "badge": "Error: Illegible QR Code on Community Certificate",
    "title": "Blurred e-District Digital Signature",
    "desc": "Over-compression breaks QR codes on Tamil Nadu e-District certificates. Kagazo preserves digital signature blocks."
  },
  {
    "badge": "Error: Blurred SSLC Serial Number",
    "title": "Scrutiny Committee Rejecting Blurry Marksheet",
    "desc": "Low-quality compression erases fine serial numbers. Kagazo isolates high-frequency text zones."
  }
];

const FAQS = [
  {
    "question": "Why does TNPSC require PDF files to be strictly between 100 KB and 200 KB?",
    "answer": "TNPSC enforces both a 100 KB floor and a 200 KB ceiling to ensure that uploaded certificates are readable during document scrutiny without overwhelming server bandwidth."
  },
  {
    "question": "How do I ensure my TNPSC PDF stays between 100 KB and 200 KB?",
    "answer": "Kagazo automatically targets 180 KB for the TNPSC preset, ensuring your document stays comfortably above the 100 KB floor and safely below the 200 KB ceiling."
  },
  {
    "question": "Will my community certificate digital signature and QR code scan properly?",
    "answer": "Yes. Kagazo retains high edge contrast on e-District barcodes, QR codes, and digital signature stamps so scrutiny officers can verify authenticity."
  },
  {
    "question": "Can I compress both the front and back sides of an SSLC marksheet into one 200 KB PDF?",
    "answer": "Yes! Upload your 2-page PDF. The engine compresses both pages concurrently, ensuring the total combined file size stays under 200 KB."
  },
  {
    "question": "Can I compress PSTM (Persons Studied in Tamil Medium) certificates with this tool?",
    "answer": "Yes. PSTM certificates issued in prescribed proforma from schools and colleges can be compressed with full preservation of headmaster signatures and round seals."
  },
  {
    "question": "Are my marksheet and personal community certificates uploaded to any server?",
    "answer": "Never. All compression runs 100% in your local browser memory buffer. No document data is ever transmitted across the internet."
  },
  {
    "question": "Does Kagazo add any watermark or logo to the TNPSC PDF?",
    "answer": "No. The generated PDF is completely clean with zero watermarks, brand stamps, or modified metadata."
  },
  {
    "question": "What should I do if my scanned marksheet is 5 MB?",
    "answer": "Simply upload the 5 MB file. Kagazo automatically optimizes and downsamples the embedded image to bring it under the 200 KB threshold."
  },
  {
    "question": "Does this tool work for TNPSC Group 1, Group 2, Group 4, and VAO applications?",
    "answer": "Yes. All TNPSC recruitment examinations and OTR profile document updates follow this exact specification."
  },
  {
    "question": "Can I compress documents directly from my smartphone?",
    "answer": "Yes. The tool runs smoothly on Android and iOS browsers without requiring any third-party app installation."
  }
];

export default function ExamPdfCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'TNPSC PDF Compressor | 100KB to 200KB OTR Marksheet Tool | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/tnpsc-pdf-compressor',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Compress PDF marksheets and community certificates strictly between 100KB and 200KB for TNPSC OTR and online applications. 100% private in-browser.',
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
            name: 'TNPSC PDF Compressor',
            item: 'https://kagazo.in/tools/tnpsc-pdf-compressor',
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
          <span className="text-primary font-bold truncate">TNPSC PDF Compressor</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official TNPSC OTR 100 KB to 200 KB Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TNPSC </span>
            <span className="text-primary">PDF Compressor</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress SSLC, HSC marksheets, community, and PSTM certificates strictly between 100KB and 200KB for TNPSC OTR with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <GraduationCap className="w-4 h-4 text-primary" /> Group 1, 2, 4 & VAO Calibrated
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
                  TNPSC OTR Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Calibrated for Tamil Nadu Public Service Commission OTR Servers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                TNPSC servers enforce a strict 100 KB minimum floor and 200 KB maximum ceiling. Kagazo locks in the safe 175–190 KB zone with zero visual degradation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100KB–200KB Sweet Spot
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Guarantees files never fall below 100 KB or exceed 200 KB ceiling.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> QR & e-District Safe
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Maintains scannability of digital verification barcodes and signatures.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Academic and caste certificates are processed solely in local RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  TNPSC OTR Document Upload Specifications & Thresholds
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official constraints enforced by the TNPSC One Time Registration and application portal:
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
                  <strong>Official Rejection Warning:</strong> TNPSC rejects files under 100 KB or over 200 KB. Verify that your file is within this exact range before final submission.
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
                <Link href="/tools/tn-marksheet-compressor" className="text-primary hover:underline font-medium">
                  TN Marksheet Compressor
                </Link>
                <Link href="/tools/tn-esevai-certificate-prep" className="text-primary hover:underline font-medium">
                  TN eSevai Certificate Prep
                </Link>
                <Link href="/tools/merge-marksheets-pdf" className="text-primary hover:underline font-medium">
                  Merge Marksheets PDF
                </Link>
                <Link href="/tools/image-to-pdf-200kb" className="text-primary hover:underline font-medium">
                  Image to PDF 200KB
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
