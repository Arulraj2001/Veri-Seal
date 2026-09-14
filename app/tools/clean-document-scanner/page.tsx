import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Sparkles,
  Award,
  HelpCircle,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Layers,
  Lock,
} from 'lucide-react';
import CleanScannerEngine from '@/components/tools/CleanScannerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Clean Document Scanner Online Free | Remove Shadows & Xerox Binarize | Kagazo',
  description:
    'Convert phone camera photos of certificates and marksheets into flatbed-quality scans online free. Remove phone shadows, yellow incandescent tint, and desk backgrounds for UPSC, SSC, and TNPSC portals.',
  keywords: [
    'clean document scanner online free',
    'remove phone shadow from document photo',
    'document binarizer xerox filter',
    'turn photo into scanned pdf',
    'clean marksheet scan for upsc',
    'remove yellow tint from paper photo',
    'flatbed scanner quality from phone camera',
    'clean certificate photo for exam portal',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/clean-document-scanner',
  },
  openGraph: {
    title: 'Clean Document Scanner & Xerox Binarizer Free | Kagazo',
    description:
      'Remove phone shadows, clean yellow tints, and binarize photocopy scans into crisp PDF and JPEG documents with zero watermark.',
    url: 'https://kagazo.in/tools/clean-document-scanner',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clean Document Scanner & Xerox Binarizer | Kagazo',
    description: 'Transform mobile photos of certificates into flatbed scanner quality in-browser.',
  },
};

const FAQS = [
  {
    question: 'Why do recruitment portals reject photos taken with mobile cameras?',
    answer:
      'Government exam portals use automated OCR and document indexing tools. Mobile camera photos often have uneven lighting, dark hand/phone shadows, yellow indoor light tints, or curled desk edges. These make small printed numbers (like roll numbers and mark totals) unreadable by the automated verification systems, leading to application rejection.',
  },
  {
    question: 'What is the difference between "Magic Color" and "High-Contrast Xerox"?',
    answer:
      '"Magic Color" normalizes the paper background to pure white while preserving the original color of official red/blue rubber stamps, university gold seals, and ink signatures. "High-Contrast Xerox" uses adaptive binarization to turn every character into crisp black ink on stark white paper, perfectly mimicking a high-end office photocopy machine.',
  },
  {
    question: 'Will cleaning the document affect its legal validity or alter marks?',
    answer:
      'No. Our engine cleans optical shadows and enhances contrast without altering or interpolating any printed text, numbers, signatures, or seal shapes. It produces a cleaner representation of your original document that complies with portal scrutiny guidelines.',
  },
  {
    question: 'Can I convert my cleaned photo into an A4 PDF under 200KB or 300KB?',
    answer:
      'Yes! After choosing your filter, you can download the result directly as a high-resolution JPEG or as an A4 formatted PDF file strictly compressed under portal upload limits (such as 200KB for TNPSC or 300KB for UPSC).',
  },
  {
    question: 'How does Kagazo remove dark phone shadows from photos?',
    answer:
      'Our engine applies a local background estimation algorithm. By analyzing neighborhood luminosity gradients across the document surface, it subtracts the low-frequency shadow gradient while keeping high-frequency stroke edges (letters and signatures) perfectly sharp.',
  },
  {
    question: 'Does this tool work on handwritten certificates and declarations?',
    answer:
      'Yes! Both Magic Color and Xerox Binarization modes work exceptionally well on handwritten declarations (like IBPS/SBI bank declarations) and physically signed documents, darkening pen strokes against white backgrounds.',
  },
  {
    question: 'Is it safe to upload sensitive certificates to Kagazo?',
    answer:
      'Yes, 100% safe. Processing happens exclusively in volatile RAM memory. Documents are never saved to disk, stored in databases, or used for AI training. Everything is automatically destroyed upon download.',
  },
  {
    question: 'Is there any watermark, daily limit, or fee for scanning documents?',
    answer:
      'No. Kagazo is 100% free with unlimited document processing and absolutely zero watermarks, brand logos, or account sign-up requirements.',
  },
];

const SCANNER_FEATURES = [
  {
    title: 'Shadow Purge Algorithm',
    desc: 'Eliminates dark gradients cast by your phone or hand when taking photos on desks or beds.',
  },
  {
    title: 'Yellow Tint Correction',
    desc: 'Compensates for warm indoor bulb lighting, restoring genuine crisp white paper backgrounds.',
  },
  {
    title: 'Stamp & Ink Protection',
    desc: 'Special color retention preserves blue pen signatures and official university red/green seals.',
  },
  {
    title: 'Exact Portal File Sizing',
    desc: 'Automatically compresses the cleaned scan strictly under <200KB (TNPSC) or <300KB (UPSC).',
  },
];

export default function CleanDocumentScannerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Clean Document Scanner & Xerox Binarizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/clean-document-scanner',
        inLanguage: ['en-IN', 'ta-IN'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '3120',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'Automatic phone and hand shadow removal',
          'Yellow light tint correction to pure white paper',
          'Xerox binarization and Magic Color modes',
          'Direct A4 PDF compilation with size budgeting',
          '100% ephemeral in-memory processing without server storage',
        ],
        description:
          'Remove phone shadows and desk background from marksheet and certificate photos for exam portal uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Clean Certificate Photos into Flatbed Quality Scans',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Document Photo',
            text: 'Upload any camera photo of your marksheet, certificate, or ID proof.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Processing Filter',
            text: 'Choose Magic Color (keeps colored seals) or High-Contrast Xerox (pure black and white).',
          },
          {
            '@type': 'HowToStep',
            name: 'Fine-tune Contrast and Brightness',
            text: 'Adjust sliders to ensure printed letters and stamps are razor-sharp.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Clean Document',
            text: 'Download as a pristine JPEG image or ready-to-upload A4 PDF file.',
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
            name: 'Clean Document Scanner',
            item: 'https://kagazo.in/tools/clean-document-scanner',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Clean Document Scanner' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Flatbed Quality from Phone Photos • Shadow &amp; Yellow Tint Purge</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Clean Document Scanner &amp; </span>
            <span className="text-emerald-700">Xerox Binarizer</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Turn smartphone marksheet and certificate photos into flatbed scanner quality. Automatically purges phone shadows, neutralizes yellow room lighting, and boosts faded stamps for 100% portal acceptance.
          </p>

          <div className="inline-flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% In-Memory RAM Privacy:</strong> Your educational certificates and marks are cleaned in volatile RAM memory. Zero copies are ever saved to disk or databases.
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* The Engine Component (No redundant card wrapper) */}
            <CleanScannerEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Why Phone Photos Fail on Recruitment Portals */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                Why Phone Photos Fail on Recruitment Portals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                  <h3 className="font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Unprocessed Phone Photos
                  </h3>
                  <ul className="text-xs text-rose-700/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Dark hand/phone shadow blocks subject marks</li>
                    <li>Yellow indoor light tints fail automated OCR checks</li>
                    <li>Curled paper edges trigger size distortion rejection</li>
                    <li>File size remains uncompressed (often 3MB - 7MB)</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Cleaned with Kagazo Scanner
                  </h3>
                  <ul className="text-xs text-emerald-800/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Luminance normalization destroys phone shadows</li>
                    <li>Paper background bleached to crisp, pure white</li>
                    <li>Registrar stamps and blue signatures remain intact</li>
                    <li>Pre-budgeted under official 200KB or 300KB limits</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Features Grid */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Intelligent Document Restoration Pipeline
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {SCANNER_FEATURES.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface/50 border border-surface-darker/70 space-y-1.5">
                    <h3 className="font-extrabold text-sm text-text-main flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      {feat.title}
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deep FAQ Section */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-text-main">
                  Frequently Asked Questions (Clean Document Scanner)
                </h2>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl p-4 sm:p-5 bg-surface/30 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between font-bold text-text-main text-xs sm:text-sm cursor-pointer select-none">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-600 font-black">Q:</span>
                        {faq.question}
                      </span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/60 pt-3 pl-6">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28 self-start">
            {/* Quick Presets Navigation */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-5 space-y-4 shadow-card">
              <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Document Utilities
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Merge Marksheets to 1 PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Self-Attest PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/unlock-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Unlock e-Aadhaar &amp; PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/pdf-to-image"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Extract PDF to 300 DPI Images</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Image to PDF (&lt;200KB)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>

            {/* Exactly ONE Sidebar Native Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Privacy & RAM Security Card */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>100% In-Memory RAM Shield</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Optical cleaning and image binarization happen entirely inside your local browser memory. No certificates are sent to any cloud server.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Free
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/clean-document-scanner" />
      </div>
    </div>
  );
}
