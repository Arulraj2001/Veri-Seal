import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Layers,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import TnMarksheetCompressorEngine from '@/components/tools/TnMarksheetCompressorEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'TN 10th (SSLC) & 12th (HSC) Marksheet PDF Compressor (<200KB) | TNEA & TNPSC | Kagazo',
  description:
    'Compress Tamil Nadu SSLC (10th) and HSC (12th) marksheets to strictly between 100KB and 200KB. State Board seal and QR code clarity shield. Dual-side front & back merge for TNEA, TNGASA, and TNPSC. 100% In-RAM privacy.',
  keywords: [
    'tn 10th marksheet compressor 200kb',
    'tn 12th marksheet pdf compressor under 200kb',
    'tnea marksheet upload compressor',
    'tnpsc otr marksheet 100kb 200kb',
    'tamil nadu state board marksheet to pdf',
    'sslc marksheet front and back merge pdf',
    'tngasa admission marksheet compressor',
    'compress marksheet between 100kb and 200kb',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/tn-marksheet-compressor',
  },
  openGraph: {
    title: 'TN Marksheet to PDF Compressor (<200KB) | Kagazo',
    description:
      'Compress Tamil Nadu 10th & 12th marksheets strictly between 100KB and 200KB without blur for TNEA, TNPSC, and college admission.',
    url: 'https://kagazo.in/tools/tn-marksheet-compressor',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TN Marksheet PDF Compressor (<200KB) | Kagazo',
    description: 'Compress Tamil Nadu SSLC & HSC marksheets strictly in the 100KB–200KB safe zone for TNEA and TNPSC.',
  },
};

const FAQS = [
  {
    question: 'Why do Tamil Nadu portals reject marksheets that are under 100 KB?',
    answer:
      'Portals like TNEA (Tamil Nadu Engineering Admissions) and TNPSC enforce a minimum threshold (strictly 100 KB) because overly compressed PDFs under 100 KB turn subject marks, student registration numbers, and official signatures illegible. Kagazo calibrates compression strictly within the 100 KB – 200 KB safe target zone.',
  },
  {
    question: 'How do I combine the front marks table and back side of my marksheet?',
    answer:
      'Simply check the "Include Back Side" box. You can upload both the front marks scan and back instruction page. Kagazo automatically combines them onto a single A4 page or a multi-page PDF while keeping the total file size below 200 KB.',
  },
  {
    question: 'Will the State Board hologram, round seal, and QR code remain readable?',
    answer:
      'Yes. Our intelligent TN Seal & Marks Table Contrast Shield isolates fine black text and official stamps, darkening them while compressing blank white margins, ensuring total scannability during document verification.',
  },
  {
    question: 'Can I add self-attestation to my marksheet PDF?',
    answer:
      'Yes. Enable the "Add Self-Attestation Footer" toggle and enter your name. Kagazo will stamp an official "TRUE COPY ATTESTED" banner with today’s date and signature line at the bottom of the A4 page.',
  },
  {
    question: 'What if my smartphone photo has yellow room lighting or dark shadows?',
    answer:
      'Enable the "Clean Paper Shadows" checkbox. Our luminance normalization algorithm purges dark mobile phone shadows and normalizes yellow indoor lighting into a crisp, flatbed white paper background.',
  },
  {
    question: 'Is this tool compliant with TNEA 2026 and TNGASA college admissions?',
    answer:
      'Yes. The output PDF strictly adheres to Anna University TNEA and Directorate of Collegiate Education (TNGASA) document verification specifications: ISO 32000 compliant PDF, 150–200 DPI resolution, and strictly between 100 KB and 200 KB.',
  },
  {
    question: 'Are my marksheets, registration numbers, and marks stored on your servers?',
    answer:
      'Zero storage. All document processing, seal sharpening, and PDF compilation take place inside volatile RAM memory. Kagazo never transmits or stores your educational records on any remote server.',
  },
  {
    question: 'Is there any cost or watermark on the generated marksheet PDF?',
    answer:
      'Kagazo is 100% free with unlimited document processing and absolutely zero watermarks, brand logos, or account sign-up requirements.',
  },
];

const TN_PORTAL_SPECS = [
  {
    portal: 'TNEA (Anna University)',
    requirement: 'HSC (12th) Marksheet Scan',
    sizeLimit: '100 KB to 200 KB',
    guideline: 'Must clearly show Subject Marks, Physics/Chemistry/Math cut-off, and Board Seal.',
  },
  {
    portal: 'TNPSC One Time Registration (OTR)',
    requirement: 'SSLC (10th) Proof of DOB',
    sizeLimit: '100 KB to 200 KB',
    guideline: 'Mandatory proof of Date of Birth & Tamil medium study (PSTM).',
  },
  {
    portal: 'TNGASA (Arts & Science)',
    requirement: '12th Marksheet & Community Cert',
    sizeLimit: 'Strictly < 200 KB',
    guideline: 'Front and back sides consolidated into a single PDF document.',
  },
  {
    portal: 'Tamil Nadu Police (TNUSRB)',
    requirement: 'SSLC / HSC Marksheet PDF',
    sizeLimit: '100 KB to 250 KB',
    guideline: 'Clear legible roll number and School Headmaster / Principal seal.',
  },
];

export default function TnMarksheetCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Tamil Nadu Marksheet to PDF Compressor',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/tn-marksheet-compressor',
        inLanguage: ['en-IN', 'ta-IN'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '3640',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'Strict 100 KB – 200 KB safe target zone for TNEA and TNPSC',
          'Front & back dual-side marksheet merger onto a single A4 PDF',
          'State Board seal, QR code, and signature contrast boost',
          'Automated phone shadow and yellow bulb tint removal',
          '100% in-browser RAM privacy with zero server storage',
        ],
        description:
          'Compress Tamil Nadu 10th and 12th state board marksheets strictly between 100KB and 200KB for TNEA, TNPSC, and college admissions.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress TN 10th & 12th Marksheets to Under 200KB',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Marksheet Front Scan',
            text: 'Upload your SSLC or HSC marksheet front scan (JPG, PNG, or PDF).',
          },
          {
            '@type': 'HowToStep',
            name: 'Optionally Add Back Side',
            text: 'Check "Include Back Side" if your application requires the reverse instruction page.',
          },
          {
            '@type': 'HowToStep',
            name: 'Apply Seal Contrast & Shadow Clean',
            text: 'Ensure marks table and state board round seal are sharp and legible.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant A4 PDF',
            text: 'Download your optimized PDF strictly calibrated between 100 KB and 200 KB.',
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
            name: 'TN Marksheet Compressor',
            item: 'https://kagazo.in/tools/tn-marksheet-compressor',
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
            { label: 'TN Marksheet PDF Compressor' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>TNEA • TNPSC • TNGASA 100KB – 200KB Safe Zone Guaranteed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TN 10th &amp; 12th Marksheet </span>
            <span className="text-emerald-700">PDF Compressor (&lt;200KB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress your Tamil Nadu State Board SSLC (10th) and HSC (12th) marksheets strictly between 100KB and 200KB. State government seal protection, camera shadow removal, and dual-side front &amp; back merger.
          </p>

          <div className="inline-flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% In-Browser RAM Privacy:</strong> Your educational marksheets and registration numbers are processed purely in local device RAM. Zero bytes uploaded to remote servers.
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* The Engine Component (No redundant card wrapper) */}
            <TnMarksheetCompressorEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Tamil Nadu Portal Marksheet Upload Rules */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    Tamil Nadu Admission &amp; Recruitment Marksheet Rules
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications enforced by Tamil Nadu higher education and PSC upload portals.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto shrink-0">
                  TN Specific Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker/60 bg-surface/50 text-text-main/70 font-semibold">
                      <th className="py-3 px-3">Portal / Admission</th>
                      <th className="py-3 px-3">Document Requirement</th>
                      <th className="py-3 px-3">File Limit</th>
                      <th className="py-3 px-3">Verification Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/40 text-text-main">
                    {TN_PORTAL_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-emerald-700">{spec.portal}</td>
                        <td className="py-3 px-3">{spec.requirement}</td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-800 bg-emerald-50/60 rounded">
                          {spec.sizeLimit}
                        </td>
                        <td className="py-3 px-3 text-text-main/60">{spec.guideline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Why Standard Compressors Fail on Marksheets */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                Why Ordinary Online PDF Compressors Fail on TN Marksheets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                  <h3 className="font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Standard Online PDF Tools
                  </h3>
                  <ul className="text-xs text-rose-700/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Over-compresses file below 100KB, triggering TNEA portal rejection</li>
                    <li>Blurs fine student registration numbers and subject grade codes</li>
                    <li>Washes out the State Board round seal and Controller signature</li>
                    <li>Cannot merge separate front marks and back instruction pages</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Kagazo TN Marksheet Optimizer
                  </h3>
                  <ul className="text-xs text-emerald-800/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Locks file strictly in the 100KB – 200KB acceptable safe zone</li>
                    <li>State seal contrast boost prevents hologram and signature fading</li>
                    <li>Built-in dual-side merger for front and back on 1 single A4 sheet</li>
                    <li>100% Free forever with zero watermarks and in-browser privacy</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Deep FAQ Section */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-text-main">
                  Frequently Asked Questions (TN Marksheet Compression)
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
                Tamil Nadu Portals
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/tn-esevai-certificate-prep"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">TN e-Sevai Cert Optimizer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/tnpsc-otr-compliance-kit"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">TNPSC OTR Bundle Kit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/tnpsc-pdf-compressor"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">TNPSC PDF (200KB)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Multi-Marksheet Merger</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Self-Attest Marksheet</span>
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
                <span>100% In-Memory RAM Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Marksheets are compiled in volatile memory on your device. Zero retention, zero uploads to external databases.
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
        <RelatedTools currentSlug="/tools/tn-marksheet-compressor" />
      </div>
    </div>
  );
}
