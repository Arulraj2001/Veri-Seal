import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Camera,
  PenTool,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Sliders,
  Sparkles,
  Info,
  Activity,
  ExternalLink,
} from 'lucide-react';
import UploadErrorDoctorEngine from '@/components/tools/UploadErrorDoctorEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Upload Error Fixer & Reverse Doctor Online Free | SSC, UPSC, TNPSC | Kagazo',
  description:
    'Paste any portal upload rejection error or select SSC, UPSC, TNPSC, or IBPS. Kagazo automatically diagnoses file defects and generates a 100% compliant photo, signature, or PDF in 1 click.',
  keywords: [
    'upload error fixer online free',
    'fix tnpsc file size less than 10 kb',
    'fix ssc photo dimensions error 100x120',
    'portal upload error solver',
    'upsc signature dimension error fix',
    'ibps handwritten declaration size fixer',
    'govt exam upload rejected fix',
    'how to fix signature size 10 to 20 kb error',
    'parivahan upload error solution',
    'edistrict certificate exceeds 200kb error fix',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/upload-error-fixer',
    languages: {
      'en': 'https://kagazo.in/tools/upload-error-fixer',
      'x-default': 'https://kagazo.in/tools/upload-error-fixer',
    },
  },
  openGraph: {
    title: 'Upload Error Fixer & Reverse Doctor Online Free | Kagazo',
    description:
      'Instantly fix government exam document rejection errors for SSC, UPSC, TNPSC, and IBPS. Smart AI defect diagnosis and 1-click compliant curing.',
    url: 'https://kagazo.in/tools/upload-error-fixer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upload Error Fixer & Reverse Doctor | SSC & UPSC | Kagazo',
    description:
      'Diagnose and cure government portal document upload errors in 1 click. Zero server upload, 100% browser privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    name: 'Paste Error Message or Select Target Portal',
    text: 'Paste the exact error message displayed by the government portal (e.g., "File size less than 10 KB") or choose your target recruitment board.',
  },
  {
    name: 'Drop Rejected Photo, Signature or PDF',
    text: 'Upload the exact file that was rejected by the portal. Kagazo inspects byte size, pixel dimensions, and aspect ratio in real time.',
  },
  {
    name: 'Review Automatic Clinical Diagnosis',
    text: 'Read the instant diagnosis detailing why the server rejected the file (undersized, oversized, aspect ratio mismatch, or lack of metadata padding).',
  },
  {
    name: 'Click "Cure & Fix File" to Download',
    text: 'Click the Cure button. Kagazo applies progressive downsampling and lossless byte-padding to output a 100% compliant file ready for immediate upload.',
  },
];

const FAQS = [
  {
    question: 'How do I fix the "Signature file size is less than 10 KB" error on TNPSC and SSC?',
    answer:
      'Most standard cropping software removes background metadata, compressing small signature crops down to 4–8 KB. Because government servers strictly reject files below 10 KB, Kagazo injects standard RFC-compliant JPEG COM (0xFFFE) comment markers to securely pad file bytes into the 12–18 KB compliant range without distorting the visual signature.',
  },
  {
    question: 'Why does the portal say "Dimensions must be between 100×120 and 240×320 pixels"?',
    answer:
      'Portals like SSC enforce strict bounding box limits. If your camera photo is 4000×3000 pixels or cropped to a widescreen rectangle, the server rejects it. Kagazo resamples the image using progressive mipmapping to fit precisely within the portal’s pixel boundaries.',
  },
  {
    question: 'How do I fix "Document file size exceeds 200 KB" on e-Sevai or State PSC portals?',
    answer:
      'When multi-page certificates are scanned at 300 DPI full-color, files frequently reach 2–5 MB. Kagazo applies adaptive grayscale thresholding and WebAssembly stream compression to lock your certificate PDF safely between 140 KB and 190 KB.',
  },
  {
    question: 'What is the UPSC "Photograph must not be more than 10 days old" rule?',
    answer:
      'Under the latest UPSC OTR guidelines, the photograph must have been captured within 10 days of the application window opening. Candidate Name and Date of Photograph (DOP) must be legibly stamped on the lower 20% white bar. Kagazo’s preset automatically stamps and validates this DOP window.',
  },
];

export default function UploadErrorFixerPage() {
  const structuredData = buildToolStructuredData({
    name: 'Upload Error Doctor & Reverse Diagnoser',
    description:
      'Paste any portal upload rejection error or select SSC, UPSC, TNPSC, or IBPS. Kagazo automatically diagnoses file defects and generates a 100% compliant photo, signature, or PDF in 1 click.',
    url: 'https://kagazo.in/tools/upload-error-fixer',
    applicationCategory: 'UtilitiesApplication',
    howToTitle: 'How to Fix Government Exam Document Upload Errors',
    howToDescription:
      'Step-by-step method to diagnose rejected government exam photos, signatures, and certificates and cure them into compliant files in 1 click.',
    howToSteps: HOW_TO_STEPS,
    faqs: FAQS,
  });

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <JsonLd data={structuredData} />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Upload Error Fixer' },
          ]}
          suppressSchema
        />

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            <span>Reverse Defect Diagnosis &amp; Cure Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            Government Exam Upload Error Doctor &amp; Fixer
          </h1>

          <p className="text-sm sm:text-base text-text-main/70">
            Got rejected by TNPSC, SSC, UPSC, or IBPS? Paste your error message or drop your rejected file below. Kagazo diagnoses the exact defect and cures it in 1 click.
          </p>
        </div>

        {/* Answer Capsule for Search Dominance */}
        <AnswerCapsule
          title="How to Fix Govt Exam Portal Upload Errors (2026 Summary)"
          answer="Government exam portal upload rejections typically stem from three causes: (1) Undersized signature error (less than 10 KB) on TNPSC and SSC, solved via lossless JPEG comment padding; (2) Oversized camera photo error (>50 KB or >300 KB), solved via 7-step binary search quality compression; and (3) Invalid pixel dimensions (e.g. 100x120 or 350x350 px), cured via high-DPI canvas mipmapping. Kagazo diagnoses and fixes all errors in 1 click."
          officialSourceUrl="https://ssc.gov.in"
          officialSourceName="All India Recruitment Upload Specifications"
          portal="All India Portal Doctor"
        />

        {/* Top Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Core Interactive Tool Engine */}
        <div className="bg-surface/50 border border-surface-darker rounded-3xl p-4 sm:p-8 shadow-sm">
          <UploadErrorDoctorEngine />
        </div>

        {/* Middle Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Two-Column Explanatory & Error Matrix Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Common Error Catalog Table */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                <span>Common Portal Upload Rejections &amp; Automated Cures</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface-darker/50 text-text-main/80 font-bold">
                      <th className="p-3">Reported Error Message</th>
                      <th className="p-3">Target Portal</th>
                      <th className="p-3">Clinical Root Cause</th>
                      <th className="p-3">Kagazo Automated Cure</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr>
                      <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">"File size less than 10 KB"</td>
                      <td className="p-3 font-mono">TNPSC / SSC / IBPS</td>
                      <td className="p-3">Cropped signature file fell below strict 10 KB server floor.</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Injects safe JPEG COM padding to 14–18 KB.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">"Dimensions must be 100x120 to 240x320"</td>
                      <td className="p-3 font-mono">SSC CGL / CHSL</td>
                      <td className="p-3">Raw photo exceeds allowed bounding box dimensions.</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Resamples photo to 3.5×4.5 cm with aspect lock.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">"File exceeds 200 KB limit"</td>
                      <td className="p-3 font-mono">TNeGA / TNPSC / State PSC</td>
                      <td className="p-3">Multi-page Xerox scan uncompressed at 300 DPI.</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Applies monochrome thresholding under 190 KB.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">"Dimensions must be 350x350 to 1000x1000"</td>
                      <td className="p-3 font-mono">UPSC Civil Services / NDA</td>
                      <td className="p-3">Non-square aspect ratio or wrong pixel density.</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Calibrates to 550×550 px 300 DPI square.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How-To Walkthrough */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>How the Reverse Diagnosis Engine Works</span>
              </h2>

              <ol className="space-y-4 text-xs sm:text-sm text-text-main/80 list-decimal list-inside">
                {HOW_TO_STEPS.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <strong className="text-text-main font-semibold">{step.name}:</strong> {step.text}
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span>Frequently Asked Questions (Upload Errors)</span>
              </h2>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-surface-darker pb-3 space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-text-main">{faq.question}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/60">Featured Exam Tools</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/tools/tnpsc-combo-pack"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-darker/50 hover:bg-surface-darker text-text-main font-medium transition-colors"
                  >
                    <span>TNPSC 3-in-1 Combo Pack</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/ssc-combo-pack"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-darker/50 hover:bg-surface-darker text-text-main font-medium transition-colors"
                  >
                    <span>SSC 3-in-1 Combo Pack</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/photo-date-name-stamper"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-darker/50 hover:bg-surface-darker text-text-main font-medium transition-colors"
                  >
                    <span>UPSC &amp; SSC Photo Name Stamper</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/compress-pdf-to-200kb"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-darker/50 hover:bg-surface-darker text-text-main font-medium transition-colors"
                  >
                    <span>Compress PDF to 200KB</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                </li>
              </ul>
            </div>

            <AdSlot slot="sidebar" />

            {/* In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-4 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Server Upload Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                All defect analysis and file repairing execute purely inside your device browser RAM memory. Zero images or certificates are stored on external cloud servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
