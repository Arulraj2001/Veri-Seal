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
  Archive,
  ExternalLink,
} from 'lucide-react';
import ExamComboPackEngine from '@/components/tools/ExamComboPackEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'UPSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP Maker | Kagazo',
  description:
    '1-Click all-in-one UPSC CSE, NDA, CDS & OTR application bundle maker. Auto-stamp Candidate Name & Date on Photo (20–300 KB), format Signature (20–300 KB), and compress PDF ID/Certificate under 300 KB. Export single ZIP archive free.',
  keywords: [
    'upsc combo pack photo signature certificate',
    'upsc otr photo and signature resizer',
    'upsc name date photo stamp online tool',
    'upsc civil services cse document bundle zip maker',
    'upsc signature 20kb to 300kb resizer',
    'upsc identity proof pdf compressor under 300kb',
    'upsconline nic in photo signature joiner',
    'upsc nda cds photo signature dimensions converter',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/upsc-combo-pack',
    languages: {
      en: 'https://kagazo.in/tools/upsc-combo-pack',
      'x-default': 'https://kagazo.in/tools/upsc-combo-pack',
    },
  },
  openGraph: {
    title: 'UPSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP Maker | Kagazo',
    description:
      'All-in-one UPSC upload preparer: Photo with Name/DOP strip (20–300 KB), anti-rejection Signature (20–300 KB), and Certificate/ID (<300 KB). Download in 1-Click ZIP.',
    url: 'https://kagazo.in/tools/upsc-combo-pack',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP | Kagazo',
    description:
      'Prepare all mandatory UPSC OTR uploads in 1-Click: Stamped Photo, 20–300 KB Signature, and PDF Certificate under 300 KB. 100% in-browser privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    name: 'Enter Candidate Name & Date of Photo (DOP)',
    text: 'Type your full name in capital letters and choose the date the photograph was captured (UPSC rules mandate the photo must not be older than 10 days before registration).',
  },
  {
    name: 'Upload Photo, Signature & Certificate',
    text: 'Drag and drop your passport photograph, scanned ink signature, and Photo ID proof (Aadhaar/Passport/Voter ID) or category certificate.',
  },
  {
    name: 'Verify Real-Time Compliance Badges',
    text: 'Kagazo automatically crops, stamps name/date, and calibrates each file to official UPSC bounds (Photo: 20–300 KB, Signature: 20–300 KB, Certificate PDF: 20–300 KB).',
  },
  {
    name: 'Download 1-Click Application Bundle ZIP',
    text: 'Click the Download Application Bundle button to export a single ZIP archive containing all compliant documents ready for instant submission on upsconline.nic.in.',
  },
];

const FAQS = [
  {
    question: 'What are the exact photo and signature rules for UPSC OTR 2026?',
    answer:
      'The Union Public Service Commission (UPSC) mandates: (1) Photograph: 350×450 px minimum (aspect 3.5×4.5 cm), file size strictly between 20 KB and 300 KB. The candidate’s face must cover 3/4th of the photo, with Candidate Name and Date of Photograph (DOP) stamped at the bottom. The photo must not be more than 10 days older than the application date. (2) Signature: 350×150 px minimum (aspect 3.5×1.5 cm), black ink on white paper, file size strictly between 20 KB and 300 KB. (3) Photo ID / Certificate: PDF format strictly between 20 KB and 300 KB.',
  },
  {
    question: 'Why does UPSC reject candidate photos without name and date?',
    answer:
      'In recent examination notices for Civil Services (CSE), NDA, and CDS, UPSC made it mandatory that applicant photographs must display the candidate’s full name and the date of capture at the bottom. Photos without name and date or with obscure dates face outright cancellation without appeal.',
  },
  {
    question: 'Can I upload my Aadhaar card or caste certificate as a photo?',
    answer:
      'No, UPSC portals reject image files (JPG/PNG) for identity proofs and certificates. Kagazo solves this by instantly converting your image into an official, single-page A4 PDF calibrated under 300 KB without uploading your private document to any external server.',
  },
  {
    question: 'Are my personal certificates and identity documents saved on Kagazo?',
    answer:
      'Never. Kagazo processes all photos, signatures, and PDF certificates in client-side WebAssembly RAM memory. No data is stored, cached, or transmitted to any third-party server or cloud bucket.',
  },
];

export default function UpscComboPackPage() {
  const structuredData = buildToolStructuredData({
    name: 'UPSC 3-in-1 Combo Pack Maker',
    description:
      '1-Click All-in-One UPSC application bundle maker. Auto-stamp Candidate Name & Date on Photo (20–300 KB), format Signature (20–300 KB), and compress Certificate under 300 KB. Export single ZIP archive free.',
    url: 'https://kagazo.in/tools/upsc-combo-pack',
    applicationCategory: 'EducationalApplication',
    howToTitle: 'How to Prepare UPSC OTR Documents in 1 Click',
    howToDescription:
      'Step-by-step workflow to format, stamp, compress, and download all mandatory UPSC OTR assets in a single ZIP package.',
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
            { label: 'UPSC 3-in-1 Combo Pack' },
          ]}
          suppressSchema
        />

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Archive className="w-3.5 h-3.5" />
            <span>UPSC One Time Registration (OTR) Suite</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            UPSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP
          </h1>

          <p className="text-sm sm:text-base text-text-main/70">
            Stop resizing files one by one. Prepare your Name & Date Stamped Photo (20–300 KB), Signature (20–300 KB), and PDF ID/Certificate (&lt;300 KB) in a single unified workspace.
          </p>
        </div>

        {/* Answer Capsule for GEO Search Dominance */}
        <AnswerCapsule
          title="UPSC OTR Document Upload Rules (2026 Summary)"
          answer="UPSC One Time Registration (OTR) strictly mandates three uploads: (1) Photograph: 350×450 px minimum (20–300 KB) with bottom white strip containing Candidate Name in capital letters and recent Date of Photograph (DOP, within 10 days); (2) Specimen Signature: 350×150 px (20–300 KB) in black ink; and (3) Photo ID / Category Certificate: Standalone PDF format strictly between 20 KB and 300 KB."
          officialSourceUrl="https://upsconline.nic.in"
          officialSourceName="UPSC Instructions to Applicants 2026"
          portal="UPSC OTR"
        />

        {/* Top Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Core Interactive Tool Engine */}
        <div className="bg-surface/50 border border-surface-darker rounded-3xl p-4 sm:p-8 shadow-sm">
          <ExamComboPackEngine portal="upsc" />
        </div>

        {/* Middle Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Two-Column Explanatory & FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Specification Matrix Table */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                <span>UPSC OTR Official Specification Matrix</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface-darker/50 text-text-main/80 font-bold">
                      <th className="p-3">Upload Item</th>
                      <th className="p-3">Dimensions / Format</th>
                      <th className="p-3">File Size Window</th>
                      <th className="p-3">Mandatory Requirements</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Applicant Photograph</td>
                      <td className="p-3 font-mono">350 × 450 px (min)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">20 KB – 300 KB</td>
                      <td className="p-3">Name & Date of Photograph strip at bottom. Face covering 3/4th area.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Candidate Signature</td>
                      <td className="p-3 font-mono">350 × 150 px (min)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">20 KB – 300 KB</td>
                      <td className="p-3">Black ink on clean white sheet. Centered and clear.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Photo ID / Category PDF</td>
                      <td className="p-3 font-mono">Clean A4 PDF</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">20 KB – 300 KB</td>
                      <td className="p-3">Aadhaar card / Voter ID / Passport / Category certificate in PDF.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step-by-Step Guide Section */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Step-by-Step 1-Click Generation Guide</span>
              </h2>

              <div className="space-y-4">
                {HOW_TO_STEPS.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-main">{step.name}</h3>
                      <p className="text-xs text-text-main/70 mt-1 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive FAQ Section */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span>Frequently Asked Questions (UPSC Aspirant Helpdesk)</span>
              </h2>

              <div className="space-y-4 divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                    <h3 className="text-xs sm:text-sm font-bold text-text-main">{faq.question}</h3>
                    <p className="text-xs text-text-main/70 mt-1.5 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Portal Links & Related Tools */}
          <div className="space-y-6">
            {/* Official Portal Quick Link */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-text-main">
                <Info className="w-4 h-4 text-primary" />
                <span>Official UPSC Portals</span>
              </div>
              <p className="text-xs text-text-main/70">
                Ensure you upload your generated files directly on the official Government portal:
              </p>
              <a
                href="https://upsconline.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-darker/60 hover:bg-surface-darker text-xs font-bold text-primary transition-all group"
              >
                <span>upsconline.nic.in (UPSC OTR)</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Zero-Server Security Promise */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero-Retention Cryptography</span>
              </div>
              <p className="text-xs text-text-main/70 leading-relaxed">
                Your government identity cards, signature slips, and passport photos are processed exclusively inside your browser&apos;s WebAssembly engine. No server logging, no cloud storage.
              </p>
            </div>

            {/* Related Exam Tools */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5">
              <RelatedTools currentSlug="upsc-combo-pack" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
