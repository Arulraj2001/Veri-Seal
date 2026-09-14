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
  Scale,
  FileCheck,
  FileText,
} from 'lucide-react';
import { UniversalPdfCompressor } from '@/components/tools/UniversalPdfCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF to 2MB Online Free | Court e-Filing & Legal Gateways | Kagazo',
  description:
    'Compress PDF documents strictly under 2MB online free. Optimized for High Court e-filing, e-Courts India, MCA corporate filings, and tenders. 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-2mb',
  },
  openGraph: {
    title: 'Compress PDF to 2MB Online Free | Kagazo',
    description:
      'Compress heavy legal petitions, affidavits, and case records strictly under 2MB for court e-filing. 100% in-browser RAM privacy.',
    url: 'https://kagazo.in/tools/compress-pdf-to-2mb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PORTALS_2MB = [
  {
    authority: 'Supreme Court & High Court e-Filing',
    documents: 'Petitions, Plaints, Case Paper Books',
    maxLimit: 'Strictly < 2.0 MB per document',
    safeTarget: '1.8 MB',
    notes: 'Mandatory standard for e-filing portals across Indian judicial forums.',
  },
  {
    authority: 'Ministry of Corporate Affairs (MCA21)',
    documents: 'ROC Annual Filings, Form AOC-4, MGT-7',
    maxLimit: '2 MB per PDF attachment',
    safeTarget: '1.85 MB',
    notes: 'Required for corporate secretarial compliance and balance sheet uploads.',
  },
  {
    authority: 'State e-Tender Portals (NIC / GeM)',
    documents: 'Technical Bid Documents & Financial Proofs',
    maxLimit: '2 MB to 5 MB',
    safeTarget: '1.8 MB',
    notes: 'Fast evaluation without gateway timeout on large vendor bid filings.',
  },
  {
    authority: 'USCIS & Global Consular Systems',
    documents: 'Form I-130 / I-485 Civil Documents',
    maxLimit: 'Strictly < 2 MB (2048 KB)',
    safeTarget: '1.9 MB',
    notes: 'Must preserve clear visibility of foreign notary stamps and seals.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Legal Document',
    desc: 'Select or drag-and-drop your legal petition, evidence affidavit, or corporate filing PDF.',
  },
  {
    step: 2,
    title: '2 MB Target Ceiling Engaged',
    desc: 'The tool defaults to an exact 2000 KB ceiling, targeting a safe 1.75–1.9 MB landing zone.',
  },
  {
    step: 3,
    title: 'Review Page Previews',
    desc: 'Inspect individual page previews to ensure proper case numbering and exhibit order.',
  },
  {
    step: 4,
    title: 'In-Memory Stream Optimization',
    desc: 'Click Compress. Scanned evidence photos are optimized while legal typography stays crisp.',
  },
  {
    step: 5,
    title: 'Download Court-Ready PDF',
    desc: 'Inspect notary seals in the clarity loupe, then download your verified PDF for e-filing.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Court Server Rejection > 2MB',
    title: 'Case Petition Aborting at 2.1 MB',
    desc: 'Judicial e-filing portals automatically reject any paper book exceeding 2048 KB. Kagazo targets 1.8 MB to ensure instant filing acceptance.',
  },
  {
    badge: 'Error: Blurred Notary Rubber Stamps',
    title: 'Loss of Legal Authenticity on Affidavits',
    desc: 'Naive compression destroys red and blue notary stamp details. Kagazo isolates stamp inks to preserve courtroom evidentiary clarity.',
  },
  {
    badge: 'Error: Broken Page Number Bookmarks',
    title: 'Disoriented Case Indexing',
    desc: 'Heavy document processing can strip internal PDF page references. Kagazo preserves standard document structure and bookmarks.',
  },
  {
    badge: 'Error: Memory Crash on 100-Page Briefs',
    title: 'Browser Overload on Lengthy Legal Bundles',
    desc: 'Compressing massive multi-page petitions can exhaust browser heap memory. Kagazo streams page downsampling in chunks to prevent crashes.',
  },
];

const FAQS = [
  {
    question: 'Why do Indian High Courts and e-Courts enforce a strict 2MB PDF limit?',
    answer:
      'Judicial e-filing portals (such as Supreme Court e-Filing and High Court portals) manage massive daily case dockets. Enforcing a 2 MB maximum per document ensures fast docket viewing by judges and attorneys while preventing storage congestion on judicial servers.',
  },
  {
    question: 'How many pages can I compress into a 2MB PDF while keeping text readable?',
    answer:
      'With Kagazo, you can comfortably compress 30 to 80 pages of text-heavy legal petitions, contracts, and court orders into a 2 MB PDF without losing 200+ DPI print sharpness.',
  },
  {
    question: 'Will notary stamps, advocate signatures, and court fee receipts remain clear?',
    answer:
      'Yes. Kagazo applies stroke-preserving quantization that isolates dark ink stamps from white background paper, maintaining clear contrast on official advocate signatures and court seals.',
  },
  {
    question: 'Does this 2MB tool comply with MCA21 ROC form attachments?',
    answer:
      'Yes. The Ministry of Corporate Affairs (MCA) portal mandates balance sheets, auditor reports, and directors reports under 2 MB for Form AOC-4 and MGT-7 filings, exactly matching our 2MB preset.',
  },
  {
    question: 'Are my confidential client litigation records or contracts uploaded to any cloud?',
    answer:
      'Never. Kagazo runs 100% inside your browser volatile memory. Client-attorney privileged documents and corporate contracts are never transmitted over the internet.',
  },
  {
    question: 'Can I remove blank pages or unwanted exhibits before compressing?',
    answer:
      'Yes! Click on any page thumbnail to exclude it from the final compiled PDF, immediately saving file size without degrading visual resolution on active pages.',
  },
  {
    question: 'Does Kagazo add any watermark or banner to my legal PDF?',
    answer:
      'Zero watermarks. The output PDF is completely clean and identical in layout to your original document, ready for immediate judicial filing.',
  },
  {
    question: 'Will digital signature tokens (Class 3 DSC) remain valid after 2MB compression?',
    answer:
      'Modifying internal PDF streams will break pre-existing cryptographic signature hashes. Always compress your petition to under 2 MB before signing it with your hardware cryptographic USB token.',
  },
  {
    question: 'Does this tool work on mobile tablets like iPads and Samsung Galaxy Tabs?',
    answer:
      'Yes. Kagazo is fully responsive and runs smoothly inside mobile browsers, allowing legal professionals to compress filings directly from courtrooms.',
  },
  {
    question: 'Is there any fee or daily file limit on Kagazo?',
    answer:
      'No. Kagazo is 100% free and unlimited for all advocates, law firms, chartered accountants, and citizens.',
  },
];

export default function CompressPdfTo2MbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF to 2MB Online Free',
        url: 'https://kagazo.in/tools/compress-pdf-to-2mb',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress PDF documents strictly under 2MB online free for court e-filing and MCA corporate filings.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 2MB in 5 Steps',
        description:
          'Step-by-step instructions to compress legal petitions and corporate filings strictly under 2MB.',
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
            name: 'Compress PDF to 2MB',
            item: 'https://kagazo.in/tools/compress-pdf-to-2mb',
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
          <span className="text-primary font-bold truncate">Compress PDF to 2MB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Court e-Filing &amp; Corporate MCA Preset</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">2MB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress heavy legal petitions, affidavits, case paper books, and MCA ROC filings strictly <strong>under 2MB</strong>. Preserves notary stamps, judicial seals, and vector typography with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Scale className="w-4 h-4 text-primary" /> Judicial e-Filing Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Compression
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalPdfCompressor
              initialTargetKb={2000}
              isFixedTarget={true}
              toolHeading="Compress PDF to Under 2 MB"
              toolSubheading="Shrink legal petitions, affidavits, and corporate documents strictly under 2000 KB with total seal clarity."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Judicial Standard Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Tuned for Supreme Court, High Courts &amp; MCA Portals
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Legal briefs and corporate filings frequently exceed 2MB when scanned evidence exhibits are attached. Kagazo compresses background textures while preserving vector typography and official notary stamps.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Scale className="w-4 h-4" /> Court Gateway Approved
                  </span>
                  <p className="text-xs text-text-main/70">
                    Guarantees a safe 1.8 MB target to avoid e-filing server timeouts.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Notary Stamp Clarity
                  </span>
                  <p className="text-xs text-text-main/70">
                    Isolates official seals and advocate signatures to maintain evidential authenticity.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Client Privilege Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Confidential litigation documents processed in RAM and never written to disk.
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
                    Major Gateways Requiring Under 2 MB PDF Filings
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications from High Courts, MCA, and government portals.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  2 MB Limits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Authority / Portal</th>
                      <th className="py-3 px-3">Applicable Documents</th>
                      <th className="py-3 px-3">Maximum Limit</th>
                      <th className="py-3 px-3">Kagazo Safe Target</th>
                      <th className="py-3 px-3">Key Upload Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {PORTALS_2MB.map((portal, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{portal.authority}</td>
                        <td className="py-3 px-3 text-text-main/70">{portal.documents}</td>
                        <td className="py-3 px-3 font-mono text-xs text-rose-600 font-bold">{portal.maxLimit}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{portal.safeTarget}</td>
                        <td className="py-3 px-3 text-xs text-text-main/60">{portal.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Judicial e-Filing Notice:</strong> Ensure all exhibits and annexures are arranged chronologically. Keep file sizes under 2 MB to prevent unexpected session timeouts during court upload.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress a PDF to 2MB in 5 Steps
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
                Common 2 MB PDF Compression Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (2 MB PDF Compression)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights covering court e-filing gateways, MCA corporate portals, and multi-page legal briefs.
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
                  href="/tools/compress-pdf-to-1mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 1MB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-5mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 5MB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-500kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 500KB
                </Link>
                <Link
                  href="/tools/sign-pdf"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Sign PDF Free
                </Link>
                <Link
                  href="/tools/pdf-compressor"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Master PDF Compressor
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
