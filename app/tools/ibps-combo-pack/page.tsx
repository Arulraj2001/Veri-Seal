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
  title: 'IBPS & SBI Bank 3-in-1 Combo Pack: Photo, Signature & Declaration ZIP | Kagazo',
  description:
    '1-Click all-in-one IBPS PO, Clerk, SO, RRB & SBI Banking application bundle maker. Auto-resize Photo (20–50 KB), lock Signature (10–20 KB), and compress Declaration/Certificate under 200 KB. Export single ZIP archive free.',
  keywords: [
    'ibps combo pack photo signature declaration',
    'ibps po photo signature resizer online',
    'ibps clerk handwritten declaration pdf compressor',
    'sbi po photo signature dimensions resizer',
    'ibps signature 10 to 20 kb compressor',
    'ibps thumb impression photo resizer',
    'banking exam document bundle zip maker',
    'ibps in photo upload tool free',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/ibps-combo-pack',
    languages: {
      en: 'https://kagazo.in/tools/ibps-combo-pack',
      'x-default': 'https://kagazo.in/tools/ibps-combo-pack',
    },
  },
  openGraph: {
    title: 'IBPS & SBI Bank 3-in-1 Combo Pack: Photo, Signature & Declaration ZIP | Kagazo',
    description:
      'All-in-one Banking upload preparer: Photo (20–50 KB), anti-rejection Signature (10–20 KB), and Declaration/Certificate (<200 KB). Download in 1-Click ZIP.',
    url: 'https://kagazo.in/tools/ibps-combo-pack',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBPS & SBI Bank 3-in-1 Combo Pack: Photo, Signature & Declaration ZIP | Kagazo',
    description:
      'Prepare all mandatory IBPS & SBI recruitment uploads in 1-Click: 20–50 KB Photo, 10–20 KB Signature, and PDF Declaration under 200 KB. 100% in-browser privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    name: 'Check Candidate Name & Date Details',
    text: 'Ensure candidate details match your matriculation records. For Banking portals, clean white backgrounds are mandatory.',
  },
  {
    name: 'Upload Photo, Signature & Declaration/Certificate',
    text: 'Drag and drop your passport photograph, signature (or left thumb impression), and handwritten declaration or caste certificate.',
  },
  {
    name: 'Verify Real-Time Compliance Badges',
    text: 'Kagazo automatically verifies dimensions and file size bounds (Photo: 20–50 KB, Signature: 10–20 KB, Declaration PDF: <200 KB).',
  },
  {
    name: 'Download 1-Click Application Bundle ZIP',
    text: 'Click the Download Application Bundle button to export a single ZIP archive containing all compliant files ready for instant upload on ibps.in or sbi.co.in.',
  },
];

const FAQS = [
  {
    question: 'What are the exact photo and signature rules for IBPS & SBI exams 2026?',
    answer:
      'The Institute of Banking Personnel Selection (IBPS) and State Bank of India (SBI) mandate: (1) Photograph: 200×230 px (3.5×4.5 cm), file size strictly between 20 KB and 50 KB with white or light background. (2) Signature / Left Thumb Impression (LTI): 140×60 px, black ink on white paper, strictly between 10 KB and 20 KB. Signatures in CAPITAL LETTERS are not accepted. (3) Handwritten Declaration: Black ink on white paper, file size strictly between 50 KB and 200 KB (JPG or PDF).',
  },
  {
    question: 'Why does IBPS reject signatures uploaded in Capital Letters?',
    answer:
      'IBPS rules specifically state that signatures in CAPITAL LETTERS will not be accepted as a valid signature, as they are easily forgeable. Ensure you sign in running cursive script with black ink before uploading.',
  },
  {
    question: 'Can I use this tool for Left Thumb Impression (LTI) as well?',
    answer:
      'Yes! The signature processing slot can also be used for your Left Thumb Impression (LTI). It calibrates ink contrast and maintains the strict 10 KB to 20 KB size window mandated by IBPS and SBI.',
  },
  {
    question: 'Are my private banking documents stored on Kagazo servers?',
    answer:
      'Never. Kagazo processes all photos, signatures, and certificates entirely inside your browser’s RAM memory. Zero bytes are uploaded to remote servers, safeguarding your personal data in full compliance with the DPDP Act 2023.',
  },
];

export default function IbpsComboPackPage() {
  const structuredData = buildToolStructuredData({
    name: 'IBPS & SBI Banking 3-in-1 Combo Pack Maker',
    description:
      '1-Click All-in-One IBPS PO, Clerk & SBI Bank application bundle maker. Auto-resize Photo (20–50 KB), lock Signature (10–20 KB), and compress Declaration/Certificate under 200 KB. Export single ZIP archive free.',
    url: 'https://kagazo.in/tools/ibps-combo-pack',
    applicationCategory: 'EducationalApplication',
    howToTitle: 'How to Prepare IBPS Banking Documents in 1 Click',
    howToDescription:
      'Step-by-step workflow to format, compress, and download all mandatory IBPS & SBI recruitment assets in a single ZIP package.',
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
            { label: 'IBPS Banking 3-in-1 Combo Pack' },
          ]}
          suppressSchema
        />

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Archive className="w-3.5 h-3.5" />
            <span>IBPS &amp; SBI Banking Recruitment Suite</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            IBPS &amp; SBI Bank 3-in-1 Combo Pack: Photo, Signature &amp; Declaration ZIP
          </h1>

          <p className="text-sm sm:text-base text-text-main/70">
            Stop resizing files one by one. Prepare your Banking Photo (20–50 KB), Running Signature (10–20 KB), and Handwritten Declaration/Certificate (&lt;200 KB) in a single unified workspace.
          </p>
        </div>

        {/* Answer Capsule for GEO Search Dominance */}
        <AnswerCapsule
          title="IBPS Banking Document Upload Rules (2026 Summary)"
          answer="IBPS &amp; SBI Banking portals mandate three uploads: (1) Photograph: 200×230 px (20–50 KB) with white or light background; (2) Specimen Signature / LTI: 140×60 px (10–20 KB) in black ink (running handwriting only, no capital letters); and (3) Handwritten Declaration / Certificate: PDF or JPG format strictly between 50 KB and 200 KB."
          officialSourceUrl="https://www.ibps.in"
          officialSourceName="IBPS Common Recruitment Process (CRP) Guidelines"
          portal="IBPS Banking"
        />

        {/* Top Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Core Interactive Tool Engine */}
        <div className="bg-surface/50 border border-surface-darker rounded-3xl p-4 sm:p-8 shadow-sm">
          <ExamComboPackEngine portal="ibps" />
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
                <span>IBPS &amp; SBI Official Specification Matrix</span>
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
                      <td className="p-3 font-mono">200 × 230 px</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">20 KB – 50 KB</td>
                      <td className="p-3">Light or white background. Neutral expression, face covering 75% area.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Signature / LTI</td>
                      <td className="p-3 font-mono">140 × 60 px</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">10 KB – 20 KB</td>
                      <td className="p-3">Black ink on clean white sheet. Running cursive script (no capital letters).</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Declaration / Caste PDF</td>
                      <td className="p-3 font-mono">Clean A4 PDF</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">50 KB – 200 KB</td>
                      <td className="p-3">Handwritten declaration or Category / Marksheet certificate in PDF.</td>
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
                <span>Frequently Asked Questions (Banking Aspirant Helpdesk)</span>
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
                <span>Official Banking Portals</span>
              </div>
              <p className="text-xs text-text-main/70">
                Upload your generated application files directly on the official banking portal:
              </p>
              <a
                href="https://www.ibps.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-darker/60 hover:bg-surface-darker text-xs font-bold text-primary transition-all group"
              >
                <span>ibps.in (Official IBPS Portal)</span>
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
                Your handwritten declaration, banking specimen signature, and photographs are processed exclusively inside your browser&apos;s WebAssembly engine. No server logging, no cloud storage.
              </p>
            </div>

            {/* Related Exam Tools */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5">
              <RelatedTools currentSlug="ibps-combo-pack" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
