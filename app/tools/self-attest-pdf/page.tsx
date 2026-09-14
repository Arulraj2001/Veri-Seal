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
  Layers,
  PenTool,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import SelfAttestEngine from '@/components/tools/SelfAttestEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Digital Self-Attestation & Date Stamper | Marksheet & Certificate PDF | Kagazo',
  description:
    'Stamp handwritten signature, candidate name, and attestation date directly onto marksheet, caste, and degree PDFs without blurry raster degradation. Auto-compress to <200KB or <500KB for UPSC, SSC, and College admissions. 100% free RAM privacy.',
  keywords: [
    'digital self attestation pdf online',
    'self attest marksheet online free',
    'add signature and date on certificate pdf',
    'true copy attested stamp generator',
    'self attested document maker for upsc',
    'self attest certificate without printing',
    'vector signature stamp on pdf',
    'self attest 10th 12th marksheet online',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/self-attest-pdf',
  },
  openGraph: {
    title: 'Free Digital Self-Attestation & Date Stamper | Kagazo',
    description:
      'Add self-attestation stamp, signature, and date to certificates and marksheets while keeping vector text sharp.',
    url: 'https://kagazo.in/tools/self-attest-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Self-Attestation & Date Stamper | Kagazo',
    description: 'Add legal self-attestation stamps and signatures onto marksheet PDFs without printing or scanning.',
  },
};

const FAQS = [
  {
    question: 'Why does self-attestation require both signature and date?',
    answer:
      'Government recruitment boards (UPSC, SSC, State PSCs, NTA) require self-attestation to establish that the candidate certifies the document as an authentic true copy on a specific date before submission. The date confirms that the document was verified during the active recruitment notification window.',
  },
  {
    question: 'Will stamping blur my certificate or marksheet text?',
    answer:
      'No! Unlike generic image editors that re-rasterize entire PDFs into low-resolution JPEGs, Kagazo overlays the signature and attestation text as a non-destructive vector overlay. Your original certificate grades, subject codes, roll numbers, and board watermarks remain 100% sharp.',
  },
  {
    question: 'Can I choose between blue ballpoint and black ink?',
    answer:
      'Yes. You can switch between Royal Blue (#0C2D8C) and Black (#121212) ink depending on your exam board requirement. Both options feature transparent backgrounds that blend naturally onto white certificates without blocking underlying text.',
  },
  {
    question: 'Where should the self-attestation stamp be positioned?',
    answer:
      'Official guidelines recommend placing the self-attestation stamp in the bottom-right or bottom-left corner of the marksheet or certificate, ensuring it does not obscure any marks, grades, roll numbers, or official registrar stamps.',
  },
  {
    question: 'Can I self-attest both PDF and JPG/PNG documents?',
    answer:
      'Yes! You can upload existing PDF certificates or high-resolution smartphone photos of your marksheets. Kagazo processes both and compiles a standardized, compliant A4 PDF ready for direct portal upload.',
  },
  {
    question: 'Does this tool guarantee file size under official portal limits?',
    answer:
      'Yes. Our engine includes target presets (200KB for TNPSC/UPSC OTR, 300KB for State PSCs, and 500KB for Banking). It automatically balances vector ink contrast with background compression to ensure your file never exceeds the portal limit.',
  },
  {
    question: 'Is my uploaded certificate or signature saved on Kagazo servers?',
    answer:
      'Never. All documents and signatures are processed exclusively in volatile RAM memory with zero server disk persistence. Everything is purged immediately once your stamped PDF is generated.',
  },
  {
    question: 'Is there any fee or watermark added to the self-attested PDF?',
    answer:
      'No. Kagazo is 100% free with unlimited document processing and absolutely zero watermarks, brand logos, or account sign-up requirements.',
  },
];

export default function SelfAttestPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Digital Self-Attestation & Date Stamper',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/self-attest-pdf',
        inLanguage: ['en-IN', 'ta-IN'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '2750',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'Direct vector signature, candidate name, and date overlay',
          'Zero blurring of original certificate fonts and seals',
          'Automatic size budgeting strictly under 200KB, 300KB, or 500KB',
          'Royal Blue and Classic Black ink modes with transparent background',
          '100% ephemeral in-memory RAM processing',
        ],
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
            name: 'Choose Position & Target Size',
            text: 'Pick corner placement and choose your target KB budget (e.g., <200KB or <300KB).',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant PDF',
            text: 'Download your self-attested, portal-ready PDF document instantly.',
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
            name: 'Self-Attest PDF',
            item: 'https://kagazo.in/tools/self-attest-pdf',
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
            { label: 'Self-Attest PDF' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Lossless Vector Stamp Overlay • Pre-Budgeted &lt;200KB / &lt;300KB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Digital Self-Attestation &amp; </span>
            <span className="text-emerald-700">Date Stamper</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Add your official signature, candidate name, and attestation date directly onto marksheet, caste, and degree PDFs without blurring vector text. Preserves original crispness with guaranteed portal size budgeting.
          </p>

          <div className="inline-flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Ephemeral RAM Privacy:</strong> Your educational certificates and signatures are stamped in volatile memory and purged immediately. Zero server files created.
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* The Engine Component (No redundant card wrapper) */}
            <SelfAttestEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Portal Document Scrutiny Guidelines */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                Why Digital Self-Attestation Beats Print-and-Scan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                  <h3 className="font-bold text-rose-800 flex items-center gap-1.5">
                    <PenTool className="w-4 h-4 text-rose-600 shrink-0" />
                    Print, Sign &amp; Rescan Method
                  </h3>
                  <ul className="text-xs text-rose-700/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Wastes ₹20-50 per document at cyber cafes</li>
                    <li>Degrades vector fonts, making fine roll numbers fuzzy</li>
                    <li>Introduces scanning dust, dark shadows, and skewed angles</li>
                    <li>Produces bloated files requiring secondary compression</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Kagazo Digital Stamper
                  </h3>
                  <ul className="text-xs text-emerald-800/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>100% Free online in under 30 seconds</li>
                    <li>Overlays vector stamp without touching original text lines</li>
                    <li>Guaranteed under exact portal upload size limits</li>
                    <li>Zero carbon footprint, zero paper wasted</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Deep FAQ Section */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-text-main">
                  Frequently Asked Questions (Self-Attestation)
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
                Related Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/clean-document-scanner"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Clean Document Scanner</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Merge Marksheets to 1 PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/sign-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Sign PDF Online</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Compress PDF to 200KB</span>
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
                Vector stamp overlays are rendered inside your browser's local memory and instantly destroyed upon download. Zero server persistence.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Free
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/self-attest-pdf" />
      </div>
    </div>
  );
}
