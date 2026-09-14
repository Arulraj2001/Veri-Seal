import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Layers,
  Award,
  HelpCircle,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  Lock,
} from 'lucide-react';
import MarksheetMergeEngine from '@/components/tools/MarksheetMergeEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Merge Marksheets to Single PDF Online Free (<500KB or <1MB) | Kagazo',
  description:
    'Combine 1 to 12 semester marksheets, provisional degree, and consolidated certificates into one single PDF strictly under 500KB or 1MB for UPSC, SSC, and TNPSC portal document verification.',
  keywords: [
    'merge marksheets to single pdf',
    'combine semester marksheets into one pdf',
    'marksheet to pdf under 500kb',
    'merge degree marksheets under 1mb',
    'combine marksheets for upsc daf',
    'merge marksheets for ssc document verification',
    'tnpsc marksheet merge pdf',
    'combine photos of marksheets to pdf',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/merge-marksheets-pdf',
  },
  openGraph: {
    title: 'Merge Marksheets into Single PDF Under 500KB / 1MB | Kagazo',
    description:
      'Multi-marksheet budget optimizer. Combines degree and semester certificates into 1 compliant PDF with sharp text and zero watermark.',
    url: 'https://kagazo.in/tools/merge-marksheets-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge Marksheets to Single PDF (<500KB or <1MB) | Kagazo',
    description: 'Combine multiple semester marksheets into a single compliant PDF strictly under portal size ceilings.',
  },
};

const FAQS = [
  {
    question: 'Why do recruitment portals require all marksheets in a SINGLE PDF?',
    answer:
      'State PSCs (TNPSC, UPPSC, BPSC), Staff Selection Commission (SSC), UPSC, and Banking exams (IBPS/SBI) provide only ONE file upload slot under "Educational Qualification" or "Graduation Proof". Candidates must combine all 6 to 8 semester marksheets, provisional certificate, and degree certificate into a single continuous PDF file.',
  },
  {
    question: 'Why do other online PDF merger tools fail on government portals?',
    answer:
      'Standard online PDF mergers simply concatenate pages without dynamic byte budget compression. A 6-semester document often ends up at 4MB to 8MB, causing portals with strict 500KB or 1MB limits to reject the upload. Kagazo uses a dynamic byte-budget optimizer that allocates optimal compression per page so the final PDF is guaranteed under your target limit while keeping marks and serial numbers crisp.',
  },
  {
    question: 'Can I upload photos of my marksheets taken with a mobile camera?',
    answer:
      'Yes! You can upload JPG, PNG, or existing PDF scans. Our built-in Xerox Clean filter automatically removes desk shadows, compensates for uneven camera lighting, and boosts ink contrast so small font subjects and grades remain 100% legible during verification.',
  },
  {
    question: 'In what chronological order should semester marksheets be arranged?',
    answer:
      'Recruitment scrutiny committees prefer chronological order: Semester 1 marksheet first, followed sequentially by Semesters 2 through 8, ending with the Consolidated Marksheet and Provisional or Degree Certificate. You can easily drag or use the up/down arrows to reorder pages before compiling.',
  },
  {
    question: 'Will the State Board or University seal, holograms, and signatures remain sharp?',
    answer:
      'Yes. Our compressor separates black high-contrast vector text lines from background textures. It prevents over-compression of official registrar stamps, holograms, and signatures while trimming empty margins to stay under budget.',
  },
  {
    question: 'What is the maximum number of marksheet pages I can merge at once?',
    answer:
      'You can merge up to 15 semester marksheets or degree certificates in a single batch. Even for a 4-year engineering degree with 8 semesters plus provisional certificate, Kagazo compiles everything seamlessly.',
  },
  {
    question: 'Are my confidential educational certificates and roll numbers safe on Kagazo?',
    answer:
      '100% safe. All file processing occurs inside volatile RAM memory. Kagazo never saves your marksheets, roll numbers, or university certificates to any disk, cloud storage, or database. Everything is purged immediately upon download.',
  },
  {
    question: 'Is this multi-marksheet merger free with zero watermarks?',
    answer:
      'Yes. Kagazo is 100% free with unlimited document processing and absolutely zero watermarks, brand logos, or account sign-up requirements.',
  },
];

const PORTAL_RULES = [
  {
    portal: 'UPSC Civil Services / ORA',
    docType: 'Degree / Marksheet PDF',
    maxSize: '300 KB - 1000 KB (1 MB)',
    notes: 'Single continuous PDF containing degree & marksheets in chronological order.',
  },
  {
    portal: 'TNPSC One Time Registration (OTR)',
    docType: 'Consolidated Marksheet',
    maxSize: 'Strictly 200 KB - 500 KB',
    notes: '200 DPI greyscale or color scan, clear university seal and controller sign.',
  },
  {
    portal: 'SSC CGL / CHSL / MTS',
    docType: 'Graduation Certificates',
    maxSize: '500 KB - 1000 KB',
    notes: 'Must show candidate name, roll number, and date of result declaration.',
  },
  {
    portal: 'IBPS PO / Clerk / RRB',
    docType: 'Semester-wise Marksheets',
    maxSize: 'Strictly 500 KB or 1000 KB',
    notes: 'Combined single PDF file for document verification round.',
  },
];

export default function MergeMarksheetsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Multi-Marksheet to Single PDF Budget Optimizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/merge-marksheets-pdf',
        inLanguage: ['en-IN', 'ta-IN'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '2840',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'Combines 1 to 15 semester marksheets into a single continuous PDF',
          'Strict target budget guarantee (<500 KB or <1 MB)',
          'Zero watermarks and 100% in-memory RAM processing',
          'Mobile phone camera shadow removal and Xerox ink boost',
          'Meets UPSC, SSC CGL, TNPSC, and Banking document scrutiny standards',
        ],
        description:
          'Combine 1 to 12 semester marksheets into a single PDF strictly under 500KB or 1MB for exam portal uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Merge Semester Marksheets into 1 Single PDF',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Marksheets',
            text: 'Select your semester marksheets, consolidated certificate, or degree photo/PDF files.',
          },
          {
            '@type': 'HowToStep',
            name: 'Arrange in Chronological Order',
            text: 'Use the up/down arrows to sequence pages from Semester 1 through your final degree.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Size Budget & Color Mode',
            text: 'Choose your target limit (under 500KB or 1MB) and apply optional Xerox contrast filter.',
          },
          {
            '@type': 'HowToStep',
            name: 'Compile and Download',
            text: 'Click Merge Marksheets and download your unified, verified document PDF instantly.',
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
            name: 'Merge Marksheets to PDF',
            item: 'https://kagazo.in/tools/merge-marksheets-pdf',
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
            { label: 'Merge Marksheets into 1 PDF' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Multi-Semester Marksheets &amp; Degree Merger • Under 500KB / 1MB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Merge All Semester Marksheets into </span>
            <span className="text-emerald-700">1 Single PDF</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            UPSC, SSC, TNPSC, and Banking recruitment portals provide only a single document upload slot with strict limits (&lt;500KB or &lt;1MB). Upload 1 to 15 marksheet photos or PDFs — our dynamic byte-budget optimizer combines them into a single, perfectly legible document.
          </p>

          <div className="inline-flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Client-Safe RAM Processing:</strong> Marksheet scans and roll numbers are processed solely in temporary RAM memory and automatically destroyed. Zero storage, zero watermarks.
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* The Engine Component (No redundant card wrapper) */}
            <MarksheetMergeEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Why Standard Mergers Fail vs Kagazo */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                Why Standard Online PDF Mergers Fail for Marksheets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                  <h3 className="font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Standard Online PDF Mergers
                  </h3>
                  <ul className="text-xs text-rose-700/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Blindly concatenates files without size budget control</li>
                    <li>6 marksheet scans balloon to 5MB - 12MB</li>
                    <li>Government portal rejects with "File exceeds 500KB limit"</li>
                    <li>Forces you to pay for Pro / Premium to compress pages</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Kagazo Budget Optimizer
                  </h3>
                  <ul className="text-xs text-emerald-800/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Calculates optimal byte budget per semester page</li>
                    <li>Guaranteed strictly under user target (&lt;500KB, &lt;1MB)</li>
                    <li>Built-in Xerox Ink Boost cleans desk shadows</li>
                    <li>100% Free Forever with zero watermarks or signups</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Official Portal Marksheet Upload Rules */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    Government Portal Marksheet Upload Rules (2025–2026)
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications enforced by central and state recruitment portals.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto shrink-0">
                  Updated Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker/60 bg-surface/50 text-text-main/70 font-semibold">
                      <th className="py-3 px-3">Exam / Authority</th>
                      <th className="py-3 px-3">Document Requirement</th>
                      <th className="py-3 px-3">File Limit</th>
                      <th className="py-3 px-3">Verification Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/40 text-text-main">
                    {PORTAL_RULES.map((rule, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-emerald-700">{rule.portal}</td>
                        <td className="py-3 px-3">{rule.docType}</td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-800 bg-emerald-50/60 rounded">
                          {rule.maxSize}
                        </td>
                        <td className="py-3 px-3 text-text-main/60">{rule.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Deep FAQ Section */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-text-main">
                  Frequently Asked Questions (Marksheet PDF Merger)
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
                Essential Exam Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/unlock-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Unlock e-Aadhaar &amp; PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/clean-document-scanner"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Clean Document Scanner</span>
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
                  href="/tools/tn-marksheet-compressor"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">TN 10th/12th Marksheet</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Compress PDF to 200KB</span>
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
                <span>100% Client-Side RAM Shield</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Marksheet images and generated PDFs are compiled purely inside your local browser memory. No documents are transmitted to remote servers.
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
        <RelatedTools currentSlug="/tools/merge-marksheets-pdf" />
      </div>
    </div>
  );
}
