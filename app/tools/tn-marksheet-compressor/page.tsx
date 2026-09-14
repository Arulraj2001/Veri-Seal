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
import TnMarksheetCompressorEngine from '@/components/tools/TnMarksheetCompressorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'TN 10th (SSLC) & 12th (HSC) Marksheet PDF Compressor (<200KB) | TNEA & TNPSC | Kagazo',
  description: 'Compress Tamil Nadu 10th SSLC and 12th HSC marksheet PDFs strictly between 100KB and 200KB online free. Dual-side front & back merge for TNEA and TNPSC OTR.',
  alternates: {
    canonical: 'https://kagazo.in/tools/tn-marksheet-compressor',
  },
  openGraph: {
    title: 'TN 10th (SSLC) & 12th (HSC) Marksheet PDF Compressor (<200KB) | TNEA & TNPSC | Kagazo',
    description: 'Compress Tamil Nadu 10th SSLC and 12th HSC marksheet PDFs strictly between 100KB and 200KB online free. Dual-side front & back merge for TNEA and TNPSC OTR.',
    url: 'https://kagazo.in/tools/tn-marksheet-compressor',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "TNEA Engineering Admissions",
    "docType": "10th & 12th Standard Marksheets",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Requires dual-side marks table and official school rubber stamp clarity."
  },
  {
    "authority": "TNPSC OTR Portal",
    "docType": "SSLC / HSC Marksheet & Community",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "185 KB",
    "notes": "Strict enforcement: Files over 200 KB or under 100 KB are blocked by server."
  },
  {
    "authority": "TN Medical Selection (MBBS/BDS)",
    "docType": "HSC Marksheet & NEET Score Card",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "220 KB",
    "notes": "Subject-wise physics, chemistry, and biology marks must be sharp."
  },
  {
    "authority": "TN Arts & Science Admissions (TNGASA)",
    "docType": "12th Marksheet & Transfer Certificate",
    "officialLimit": "Under 200 KB",
    "targetUsed": "175 KB",
    "notes": "High contrast against white background is strictly enforced."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Marksheet Photos or PDF",
    "desc": "Upload the Front and Back scans or PDF of your 10th SSLC or 12th HSC marksheet."
  },
  {
    "step": 2,
    "title": "TNEA / TNPSC Preset Active",
    "desc": "The engine locks a 100KB\u2013200KB safe target bracket (175\u2013190 KB sweet spot)."
  },
  {
    "step": 3,
    "title": "Verify Page Sequence",
    "desc": "Ensure the Front marks table appears as Page 1 and the Back side as Page 2."
  },
  {
    "step": 4,
    "title": "In-Memory Stream Optimization",
    "desc": "Click Compress. Scanned images are calibrated to 150\u2013200 DPI while text stays sharp."
  },
  {
    "step": 5,
    "title": "Download Verified PDF",
    "desc": "Inspect the file size and seal clarity before saving your TNEA/TNPSC compliant PDF."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Under-100 KB Portal Rejection",
    "title": "TNPSC Rejects Overly Compressed Files",
    "desc": "TNPSC strictly rejects files under 100 KB. Kagazo carefully preserves file density between 150 KB and 190 KB."
  },
  {
    "badge": "Error: 201 KB File Size Exceeded",
    "title": "Marginal Boundary Failure on TNEA Server",
    "desc": "Files measuring 200.5 KB trigger immediate portal rejection. Kagazo enforces a strict 180 KB target."
  },
  {
    "badge": "Error: Illegible Marksheet Serial Number",
    "title": "Over-Compression Erasing Crucial Digits",
    "desc": "Generic tools blur student roll numbers and marks grids. Kagazo preserves numerical clarity."
  },
  {
    "badge": "Error: Distorted Dual-Sided Scan",
    "title": "Front & Back Pages Rendered at Uneven Scales",
    "desc": "Combining marksheet front and back scans often creates mismatched scales. Kagazo standardizes to A4."
  }
];

const FAQS = [
  {
    "question": "Why do TNEA and TNPSC mandate marksheet PDFs strictly between 100 KB and 200 KB?",
    "answer": "Tamil Nadu portals enforce a strict minimum floor (100 KB) because overly compressed PDFs under 100 KB turn subject marks, student registration numbers, and official signatures illegible. The 200 KB ceiling prevents server overload during high-traffic counseling."
  },
  {
    "question": "Can I compress both Front and Back sides of my 10th or 12th marksheet into one 200 KB PDF?",
    "answer": "Yes! Upload photos or scans of both Front and Back sides. Kagazo combines them into a single two-page A4 PDF and ensures the combined size stays between 100 KB and 200 KB."
  },
  {
    "question": "Will my registration number and subject marks remain sharp?",
    "answer": "Yes. Kagazo isolates high-frequency tabular text zones, ensuring your registration number, marks, and passing year remain razor sharp for scrutiny committees."
  },
  {
    "question": "Does this tool work for CBSE and ICSE marksheets for Tamil Nadu counseling?",
    "answer": "Yes. While tuned for TNDGE State Board certificates, the tool works equally well for CBSE, ICSE, and diploma certificates submitted to TNEA or TNPSC."
  },
  {
    "question": "Are my academic records uploaded to any third-party server?",
    "answer": "Never. All operations execute 100% locally in your device browser RAM via WebAssembly. Zero files or student records are ever transmitted over the internet."
  },
  {
    "question": "Does Kagazo add any watermark or logo to the marksheet PDF?",
    "answer": "No. The generated PDF is completely clean with zero watermarks, brand stamps, or altered metadata."
  },
  {
    "question": "Can I compress documents directly on my smartphone?",
    "answer": "Yes. Kagazo runs smoothly on Android and iOS mobile browsers without requiring any app download."
  },
  {
    "question": "What should I do if my scanned marksheet is 8 MB?",
    "answer": "Upload the 8 MB file directly. Kagazo automatically downsamples the scan to 150\u2013200 DPI, bringing it into the 100\u2013200 KB safe zone in seconds."
  },
  {
    "question": "How does Kagazo handle school headmaster stamps and seal colors?",
    "answer": "Kagazo retains native color coordinates so that purple rubber stamps, blue signatures, and official government seals remain vibrant."
  },
  {
    "question": "Is this tool completely free for students?",
    "answer": "Yes. Kagazo is 100% free with no registration, subscriptions, or hidden charges for students and job seekers."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'TN 10th (SSLC) & 12th (HSC) Marksheet PDF Compressor (<200KB) | TNEA & TNPSC | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/tn-marksheet-compressor',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Compress Tamil Nadu 10th SSLC and 12th HSC marksheet PDFs strictly between 100KB and 200KB online free. Dual-side front & back merge for TNEA and TNPSC OTR.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress TN Marksheets in 5 Steps',
        description: 'Compress Tamil Nadu marksheet documents for state portal submission:',
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
            name: 'TN Marksheet Compressor',
            item: 'https://kagazo.in/tools/tn-marksheet-compressor',
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
          <span className="text-primary font-bold truncate">TN Marksheet Compressor</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Tamil Nadu State Board Standard • 100 KB to 200 KB • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TN 10th & 12th Marksheet </span>
            <span className="text-primary">PDF Compressor (Under 200KB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress Tamil Nadu State Board SSLC (10th) and HSC (12th) marksheet PDFs strictly between 100KB and 200KB. Calibrated for TNEA engineering admissions and TNPSC OTR with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> TNEA & TNPSC OTR Calibrated
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <TnMarksheetCompressorEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tamil Nadu State Board Preset
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Calibrated for TNDGE Marksheets & TNEA / TNPSC Servers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Tamil Nadu State Board marksheets feature intricate subject marks tables and official government rubber stamps that get ruined by generic compressors. Kagazo enforces the strict 100–200 KB bracket while preserving serial number clarity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100KB–200KB Sweet Spot
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Strict enforcement: Files never drop below 100 KB or exceed the 200 KB portal ceiling.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dual-Side Merging
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Combines Front and Back sheets into a single unified 200 KB PDF for TNEA and TNPSC.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Student registration numbers and marks data remain strictly on your local computer.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Tamil Nadu Education & Recruitment Portal Upload Limits
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official document constraints enforced across Tamil Nadu state gateways:
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
                  <strong>Technical Advisory:</strong> TNEA and TNPSC portals reject files under 100 KB as well as files over 200 KB. Your marksheet must be within this exact range.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Compress TN Marksheets in 5 Steps
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
                  <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 200KB
                  </Link>
                  <Link href="/tools/tnpsc-pdf-compressor" className="text-primary hover:underline font-medium">
                    TNPSC PDF Compressor
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
