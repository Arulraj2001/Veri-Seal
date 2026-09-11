import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileCheck2,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Printer,
  Layers,
  CreditCard,
  PenTool,
} from 'lucide-react';
import SelfAttestEngine from '@/components/tools/SelfAttestEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Digital Self-Attestation & Date Stamper | Marksheet & Certificate PDF',
  description:
    'Stamp handwritten signature, candidate name, and attestation date directly onto marksheet, caste, and degree PDFs without blurry raster degradation. Auto-compress to <200KB or <500KB for UPSC, SSC, and College admissions. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://veriseal.in/tools/self-attest-pdf',
  },
  openGraph: {
    title: 'Free Digital Self-Attestation & Date Stamper | VeriSeal',
    description:
      'Add self-attestation stamp, signature, and date to certificates and marksheets while keeping vector text sharp.',
    url: 'https://veriseal.in/tools/self-attest-pdf',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why does self-attestation require both signature and date?',
    answer:
      'Government recruitment boards (UPSC, SSC, State PSCs) require self-attestation to establish that the candidate certifies the document as an authentic true copy on a specific date before submission.',
  },
  {
    question: 'Will stamping blur my certificate or marksheet text?',
    answer:
      'No! Unlike generic image editors that re-rasterize PDFs into low-resolution JPEGs, VeriSeal overlays the stamp layer directly onto the existing PDF vector structure. Your grades, roll numbers, and board watermarks stay razor sharp.',
  },
  {
    question: 'Can I choose between blue ballpoint and black ink?',
    answer:
      'Yes. You can switch between Royal Blue (#0C2D8C) and Black (#121212) ink depending on your board requirement. Both options feature transparent backgrounds that blend naturally onto white certificates.',
  },
  {
    question: 'Is my uploaded certificate or marksheet saved on VeriSeal servers?',
    answer:
      'Never. All documents and signatures are processed exclusively in volatile RAM memory with zero server disk persistence. Everything is purged immediately once your stamped PDF is generated.',
  },
];

export default function SelfAttestPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'VeriSeal Digital Self-Attestation & Date Stamper',
        url: 'https://veriseal.in/tools/self-attest-pdf',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Stamp candidate signature, name, and date onto marksheets and certificates with strict KB budgeting.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Digitally Self-Attest Marksheets & Certificates for Online Forms',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Document PDF or Image',
            text: 'Upload your 10th/12th marksheet, degree certificate, or caste certificate.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Signature & Enter Details',
            text: 'Upload your signature image and enter your official candidate name and attestation date.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Position & Download PDF',
            text: 'Pick bottom right or left corner placement and download your self-attested PDF.',
          },
        ],
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
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Exam Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Self-Attest PDF</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lossless Vector Stamp Overlay</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Digital Self-Attestation & Date Stamper
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Add your official signature, candidate name, and attestation date directly onto marksheet, caste, and degree PDFs without blurring vector text. Preserves original crispness with guaranteed portal size budgeting.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Ephemeral RAM Privacy:</strong> Your educational certificates and signatures are stamped in volatile memory and purged immediately. Zero server files created.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <SelfAttestEngine />

            {/* FAQ Accordion */}
            <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                      <span className="text-emerald-600 font-extrabold">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (32%) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Value Pillar Card */}
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Portal Document Acceptance</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">UPSC / State PSC Portals</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Certificates strictly budgeted under 200 KB or 300 KB.</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">College & University Admissions</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Mandatory self-attested marksheets with legible roll numbers.</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Vector Text Preservation</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Zero pixelation of original certificate fonts and seals.</div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Related Verification Tools</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/signature-cleaner-extractor"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-emerald-600" />
                    Clean Signature Extractor
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/batch-photo-resizer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    Bulk Batch Photo Resizer
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/pvc-id-card-maker"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    PVC Smart Card Studio
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Ad Space */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
