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
} from 'lucide-react';
import { PdfCompressorEngine } from '@/components/tools/PdfCompressorEngine';
import { TOOL_CONFIGS } from '@/components/tools/tool-configs';
import { AdSlot } from '@/components/ads/AdSlot';

const config = TOOL_CONFIGS['compress-pdf-to-200kb'];

export const metadata: Metadata = {
  title: 'Compress PDF to 200KB Online Free | TNPSC & SSC Gateway | Kagazo',
  description:
    'Compress PDF certificates and marksheets strictly under 200 KB online free. Auto-calibrated for TNPSC, SSC CGL/CHSL, and university portals. 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-200kb',
  },
  openGraph: {
    title: 'Compress PDF to 200KB Online Free | Kagazo',
    description:
      'Compress PDF documents to strictly under 200 KB without losing seal clarity or text sharpness. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/compress-pdf-to-200kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PORTALS_200KB = [
  {
    exam: 'TNPSC OTR (Group 1, 2, 4, VAO)',
    posts: 'SSLC / HSC Marksheets & Community Proof',
    requiredRange: '100 KB to 200 KB',
    targetUsed: '180 KB',
    notes: 'Strict enforcement: Files over 200 KB or under 100 KB are blocked by the portal.',
  },
  {
    exam: 'SSC CGL / CHSL / MTS / GD',
    posts: 'Educational Certificates & Caste Proofs',
    requiredRange: '50 KB to 200 KB',
    targetUsed: '180 KB',
    notes: 'Must maintain clear visibility of serial numbers and issuing authority signatures.',
  },
  {
    exam: 'TNEA Engineering Admissions',
    posts: '10th & 12th Standard Marksheets',
    requiredRange: '100 KB to 200 KB',
    targetUsed: '185 KB',
    notes: 'Requires dual-side marks table and official school rubber stamp clarity.',
  },
  {
    exam: 'GATE & JAM IIT Admisssions',
    posts: 'Degree Certificates & Category Proofs',
    requiredRange: '10 KB to 200 KB',
    targetUsed: '175 KB',
    notes: 'High-speed verification through GOAPS application servers.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Certificate or Marksheet',
    desc: 'Select or drag-and-drop your single or multi-page PDF document into the workspace.',
  },
  {
    step: 2,
    title: '200 KB Standard Target Active',
    desc: 'The tool locks an exact 200 KB ceiling, targeting a safe 175–190 KB sweet spot.',
  },
  {
    step: 3,
    title: 'Inspect & Select Pages',
    desc: 'Preview all pages. Exclude any non-mandatory cover sheets or blank instruction pages.',
  },
  {
    step: 4,
    title: 'In-Memory Stream Optimization',
    desc: 'Click Compress. Embedded scanned images are downsampled to 150–200 DPI while fonts stay vector.',
  },
  {
    step: 5,
    title: 'Download Compliant PDF',
    desc: 'Verify stamp legibility via the high-resolution clarity loupe and download your verified PDF.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Under-100 KB Boundary Rejection',
    title: 'TNPSC Rejects Overly Compressed Files',
    desc: 'TNPSC strictly rejects files under 100 KB to prevent unreadable low-res scans. Kagazo carefully preserves file density between 150 KB and 195 KB.',
  },
  {
    badge: 'Error: 201 KB File Size Exceeded',
    title: 'Marginal Boundary Failure on SSC Server',
    desc: 'Files measuring even 200.5 KB trigger immediate portal rejections. Kagazo enforces a strict 180 KB target with built-in safety margins.',
  },
  {
    badge: 'Error: Illegible Marksheet Serial Number',
    title: 'Over-Compression Erasing Crucial Digits',
    desc: 'Generic tools blur student roll numbers and marks grids. Kagazo isolates high-frequency text zones to preserve numerical clarity.',
  },
  {
    badge: 'Error: Distorted Dual-Sided Scan',
    title: 'Front & Back Pages Rendered at Uneven Scales',
    desc: 'Combining marksheet front and back scans often results in mismatched aspect ratios. Kagazo standardizes all pages to uniform A4 dimensions.',
  },
];

const FAQS = [
  {
    question: 'Why is 200KB the most common PDF upload limit across Indian exams?',
    answer:
      'Major recruitment commissions like TNPSC and SSC standardise on a 200 KB maximum limit (and 100 KB minimum for TNPSC) to balance high-speed server uploads with document readability, ensuring certificates can be verified without manual magnifying tools.',
  },
  {
    question: 'How do I ensure my marksheet stays between 100 KB and 200 KB for TNPSC?',
    answer:
      'Kagazo automatically targets 180 KB for the 200 KB preset, keeping your file well above the 100 KB rejection threshold while safely below the 200 KB ceiling.',
  },
  {
    question: 'Will official rubber stamps, holograms, and signatures remain legible at 200 KB?',
    answer:
      'Yes. Kagazo retains 150–200 DPI resolution on graphic stamps while compressing blank paper backgrounds, ensuring university seals, registrar signatures, and holograms remain sharp.',
  },
  {
    question: 'Can I compress both the front and back side of a marksheet into one 200 KB PDF?',
    answer:
      'Yes! Upload your 2-page PDF document. The engine compresses both pages concurrently, ensuring the total combined file size stays under 200 KB.',
  },
  {
    question: 'Are my educational certificates uploaded to any third-party server?',
    answer:
      'Never. Kagazo operates 100% in your local browser memory buffer. No files or educational records are ever transmitted across the internet.',
  },
  {
    question: 'Does Kagazo inject any watermark or logo into the compressed PDF?',
    answer:
      'No. The generated PDF is completely clean with zero watermarks, brand stamps, or altered metadata.',
  },
  {
    question: 'What image formats can I convert and compress to 200 KB PDF?',
    answer:
      'You can upload existing PDF documents, or use our dedicated "Image to PDF 200KB" tool to convert smartphone JPG, PNG, and HEIC photos directly into a 200 KB PDF.',
  },
  {
    question: 'How does Kagazo handle mobile scanner shadows on certificates?',
    answer:
      'Kagazo normalizes background paper luminance, turning yellowish smartphone shadows into clean flatbed white while sharpening black printed text.',
  },
  {
    question: 'Can I use this tool for court e-filing and legal documents?',
    answer:
      'Yes. High courts and district courts frequently mandate 200 KB to 2 MB PDF filings. Kagazo outputs standard ISO 32000 compliant PDFs accepted by legal portals.',
  },
  {
    question: 'Is there any fee or daily file limit on Kagazo?',
    answer:
      'No. Kagazo is 100% free and unlimited for all candidates, educational institutions, and Cyber Cafe operators.',
  },
];

export default function CompressPdfTo200KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF to 200KB Online Free',
        url: 'https://kagazo.in/tools/compress-pdf-to-200kb',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress PDF documents strictly under 200 KB online free with in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 200KB in 5 Steps',
        description:
          'Step-by-step instructions to compress government exam certificates strictly under 200 KB.',
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
            name: 'Compress PDF to 200KB',
            item: 'https://kagazo.in/tools/compress-pdf-to-200kb',
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
          <span className="text-primary font-bold truncate">Compress PDF to 200KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official 200 KB Government Gateway Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">200KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress PDF certificates and marksheets strictly <strong>under 200 KB</strong>. Calibrated for TNPSC OTR (100–200 KB), SSC CGL/CHSL, TNEA, and GATE with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> TNPSC 100–200 KB Sweet Spot
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
                  Gold Standard Portal Preset
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Tuned for TNPSC OTR &amp; Central SSC Application Gateways
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Thousands of applicants face registration rejection because their marksheet scans exceed 200 KB or drop below 100 KB. Kagazo guarantees exact compliance within the 175–190 KB sweet spot while maintaining razor-sharp text clarity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 180 KB Target Used
                  </span>
                  <p className="text-xs text-text-main/70">
                    Sits safely in the 100–200 KB envelope required by Tamil Nadu and Central recruitment portals.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Seal &amp; Stamp Preservation
                  </span>
                  <p className="text-xs text-text-main/70">
                    Isolates official university stamps and signatures to prevent loss of document authenticity.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Certificates processed in RAM and never written to disk. Zero data retention.
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
                    Major Portals Requiring Under 200 KB PDF Scans
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications verified against latest recruitment notifications.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  200 KB Limits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Examination Authority</th>
                      <th className="py-3 px-3">Applicable Documents</th>
                      <th className="py-3 px-3">Mandatory Size Range</th>
                      <th className="py-3 px-3">Kagazo Safe Target</th>
                      <th className="py-3 px-3">Key Upload Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {PORTALS_200KB.map((portal, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{portal.exam}</td>
                        <td className="py-3 px-3 text-text-main/70">{portal.posts}</td>
                        <td className="py-3 px-3 font-mono text-xs text-rose-600 font-bold">{portal.requiredRange}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{portal.targetUsed}</td>
                        <td className="py-3 px-3 text-xs text-text-main/60">{portal.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>TNPSC Critical Rule:</strong> The TNPSC One Time Registration (OTR) server strictly blocks documents under 100 KB as well as documents over 200 KB. Kagazo default 180 KB target guarantees acceptance.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress a PDF to 200KB in 5 Steps
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
                Common 200 KB PDF Compression Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (200 KB PDF Compression)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights covering TNPSC OTR, SSC recruitment certificates, and seal legibility.
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
                  href="/tools/tnpsc-pdf-compressor"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  TNPSC PDF Compressor
                </Link>
                <Link
                  href="/tools/ssc-pdf-compressor"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSC PDF Compressor
                </Link>
                <Link
                  href="/tools/compress-pdf-to-100kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 100KB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-300kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 300KB
                </Link>
                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image to PDF (200KB)
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
