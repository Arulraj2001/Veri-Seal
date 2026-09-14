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

const config = TOOL_CONFIGS['compress-pdf-to-500kb'];

export const metadata: Metadata = {
  title: 'Compress PDF to 500KB Online Free | High-Clarity Multi-Page | Kagazo',
  description:
    'Compress PDF documents strictly under 500 KB online free. Ideal for EPFO passbooks, university marksheets, bank statements, and visa affidavits. 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-pdf-to-500kb',
  },
  openGraph: {
    title: 'Compress PDF to 500KB Online Free | Kagazo',
    description:
      'Compress PDF documents strictly under 500 KB while retaining crystal-clear table numbers and bank stamps. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/compress-pdf-to-500kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PORTALS_500KB = [
  {
    exam: 'EPFO Unified Member Portal',
    posts: 'Bank Passbook & Cancelled Cheque Uploads',
    requiredRange: '100 KB to 500 KB',
    targetUsed: '450 KB',
    notes: 'Mandatory limit for PF claim settlements. Account numbers and IFSC must remain readable.',
  },
  {
    exam: 'International Visa Applications (VFS / BLS)',
    posts: 'Bank Statements & Employment Contracts',
    requiredRange: 'Strictly < 500 KB',
    targetUsed: '450 KB',
    notes: 'Consular upload gateways enforce 500 KB ceiling for supporting affidavits.',
  },
  {
    exam: 'State Bar Council & Legal Portals',
    posts: 'Advocate Enrollment & Case Affidavits',
    requiredRange: 'Strictly < 500 KB',
    targetUsed: '460 KB',
    notes: 'Preserves digital notary seals and court stamp legibility.',
  },
  {
    exam: 'University Convocation & Degree Portals',
    posts: 'Consolidated Grade Sheets & Transcripts',
    requiredRange: 'Strictly < 500 KB',
    targetUsed: '450 KB',
    notes: 'Multi-page transcripts must fit within single document boundary.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Multi-Page PDF',
    desc: 'Select or drag-and-drop your bank passbook, contract, or academic marksheet PDF.',
  },
  {
    step: 2,
    title: '500 KB Target Limit Active',
    desc: 'The tool defaults to a strict 500 KB ceiling, targeting a safe 420–470 KB landing zone.',
  },
  {
    step: 3,
    title: 'Review Page Previews',
    desc: 'Inspect thumbnail previews of every page. Exclude any non-essential blank pages.',
  },
  {
    step: 4,
    title: 'In-Memory Stream Optimization',
    desc: 'Click Compress. Embedded images are optimized at 200–250 DPI while keeping typography vector.',
  },
  {
    step: 5,
    title: 'Download Optimized PDF',
    desc: 'Inspect financial and tabular numbers in the clarity loupe, then download the verified PDF.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: File Exceeds 500.0 KB',
    title: 'EPFO Portal Rejecting Cancelled Cheque',
    desc: 'EPFO claim processing aborts if the bank passbook PDF exceeds 500 KB. Kagazo targets 450 KB to ensure seamless claim processing.',
  },
  {
    badge: 'Error: Unreadable IFSC / Account Number',
    title: 'Blurry Bank Statement Rejecting Claims',
    desc: 'Aggressive compression blurs critical financial digits. Kagazo applies numerical edge-enhancement to preserve financial legibility.',
  },
  {
    badge: 'Error: Missing Notary / Seal Stamp',
    title: 'Faint Legal Affidavits in Court Portals',
    desc: 'Scanned notary seals fade during naive JPEG re-encoding. Kagazo isolates stamp inks to maintain high contrast.',
  },
  {
    badge: 'Error: Slow Mobile Upload Timeout',
    title: '15MB Scans Causing Network Disconnects',
    desc: 'Uploading uncompressed 15MB scans over 4G connections causes timeouts. Kagazo shrinks files down to under 500 KB in 2 seconds.',
  },
];

const FAQS = [
  {
    question: 'Why is 500 KB the standard limit for EPFO passbook and cheque uploads?',
    answer:
      'The Employees Provident Fund Organisation (EPFO) portal strictly caps bank passbook and cancelled cheque uploads between 100 KB and 500 KB. Files outside this range are rejected by the server to prevent claim processing delays.',
  },
  {
    question: 'How does Kagazo ensure account numbers and IFSC codes remain readable at 500 KB?',
    answer:
      'Kagazo preserves vector typography and applies contrast enhancement to numeric regions, ensuring bank account details, IFSC codes, and account holder names remain 100% legible for automated PF claim verification.',
  },
  {
    question: 'Can I compress a 10-page document to under 500 KB?',
    answer:
      'Yes! Our bisection optimizer distributes compression ratios across all 10 pages, ensuring that the combined file size lands safely beneath 500 KB while maintaining 150 DPI readability.',
  },
  {
    question: 'Does this 500 KB compressor work for international visa applications?',
    answer:
      'Yes. Consular visa portals like VFS Global, TLScontact, and BLS International often enforce a 500 KB limit for individual financial affidavits and employment letters.',
  },
  {
    question: 'Are my confidential bank statements or salary slips uploaded to any server?',
    answer:
      'Never. Kagazo runs 100% client-side in browser RAM memory. No financial records, account numbers, or citizen documents are ever transmitted across the internet.',
  },
  {
    question: 'Can I remove blank pages before compressing the PDF to 500 KB?',
    answer:
      'Yes! Click on any page thumbnail to exclude it from the final compiled PDF, immediately saving file size without degrading visual quality on active pages.',
  },
  {
    question: 'Does Kagazo add any watermark or branding to my compressed PDF?',
    answer:
      'Zero watermarks. The output PDF is completely clean and professional, ready for official legal and governmental submissions.',
  },
  {
    question: 'Will digital signatures (DSC) remain valid after 500 KB compression?',
    answer:
      'Modifying PDF streams will break cryptographic hashes of existing digital signatures. Always compress your document first, then apply your token digital signature.',
  },
  {
    question: 'Can I compress scanned land deeds and municipal tax receipts to 500 KB?',
    answer:
      'Yes. Kagazo handles large legal documents, optimizing color paper backgrounds to crisp white while darkening text for maximum clarity.',
  },
  {
    question: 'Is there any fee or daily file limit on Kagazo?',
    answer:
      'No. Kagazo is 100% free and unlimited for all applicants, citizens, and business professionals.',
  },
];

export default function CompressPdfTo500KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF to 500KB Online Free',
        url: 'https://kagazo.in/tools/compress-pdf-to-500kb',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress PDF documents strictly under 500 KB online free for EPFO and visa uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a PDF to 500KB in 5 Steps',
        description:
          'Step-by-step instructions to compress bank passbooks, contracts, and multi-page transcripts strictly under 500 KB.',
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
            name: 'Compress PDF to 500KB',
            item: 'https://kagazo.in/tools/compress-pdf-to-500kb',
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
          <span className="text-primary font-bold truncate">Compress PDF to 500KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>High-Fidelity Multi-Page Certificate Preset</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF to </span>
            <span className="text-primary">500KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress PDF documents strictly <strong>under 500 KB</strong> without losing text sharpness or table formatting. Calibrated for EPFO passbooks, university transcripts, and visa affidavits with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> EPFO 100–500 KB Safe Limit
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
                  Financial &amp; Legal Standard
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Tuned for EPFO Passbooks &amp; Multi-Page Legal Documents
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Whether filing online PF claims or uploading commercial affidavits, documents must balance strict 500 KB ceilings with total legibility. Kagazo preserves crisp numbers, financial figures, and official notary stamps.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 450 KB Target Used
                  </span>
                  <p className="text-xs text-text-main/70">
                    Guarantees a safe 50 KB cushion beneath the 500 KB limit for instant gateway acceptance.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Bank Account Clarity
                  </span>
                  <p className="text-xs text-text-main/70">
                    Keeps financial digits, IFSC codes, and passbook seals clear for OCR scanning.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Financial records processed in RAM and never written to disk. Zero data retention.
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
                    Major Portals Requiring Under 500 KB PDF Scans
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications from EPFO, consular visa portals, and universities.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  500 KB Limits
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
                    {PORTALS_500KB.map((portal, idx) => (
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
                  <strong>EPFO Claim Notice:</strong> Ensure the bank account number, IFSC code, and branch stamp are clearly legible in the cancelled cheque or passbook scan to avoid rejection by the field office.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress a PDF to 500KB in 5 Steps
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
                Common 500 KB PDF Compression Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (500 KB PDF Compression)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical guidance covering EPFO claim passbooks, international visa affidavits, and multi-page transcripts.
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
                  href="/tools/epfo-passbook-photo-resizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  EPFO Passbook Resizer
                </Link>
                <Link
                  href="/tools/compress-pdf-to-300kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 300KB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 200KB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-1mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 1MB
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
