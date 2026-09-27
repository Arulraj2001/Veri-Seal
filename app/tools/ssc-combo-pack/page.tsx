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
  title: 'SSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP | Kagazo',
  description:
    '1-Click all-in-one SSC recruitment application bundle maker. Auto-format Photo (20–50 KB), lock Signature (10–20 KB), and compress Category Certificate under 300 KB for SSC CGL, CHSL, MTS & GD. Export single ZIP archive free.',
  keywords: [
    'ssc combo pack photo signature certificate',
    'ssc cgl 3 in 1 upload bundle zip',
    'ssc chsl live photo signature converter',
    'ssc signature 10 to 20 kb resizer',
    'ssc category certificate pdf compressor under 300kb',
    'ssc mts photo signature editor online free',
    'ssc gd constable document pack zip',
    'staff selection commission document upload maker',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/ssc-combo-pack',
    languages: {
      'en': 'https://kagazo.in/tools/ssc-combo-pack',
      'x-default': 'https://kagazo.in/tools/ssc-combo-pack',
    },
  },
  openGraph: {
    title: 'SSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP | Kagazo',
    description:
      'All-in-one SSC upload preparer: Photo (20–50 KB), anti-rejection Signature (10–20 KB), and Certificate (<300 KB). Download in 1-Click ZIP.',
    url: 'https://kagazo.in/tools/ssc-combo-pack',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP | Kagazo',
    description:
      'Prepare all mandatory SSC recruitment uploads in 1-Click: Compliant Photo, 10–20 KB Signature, and PDF Certificate under 300 KB. 100% in-browser privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    name: 'Enter Candidate Name & Date of Photo (Optional)',
    text: 'Type your full name and the recent capture date if required by your specific SSC notification or regional exam guidelines.',
  },
  {
    name: 'Upload Photo, Signature & Category Proof',
    text: 'Drag and drop your raw passport portrait, cropped signature, and OBC/EWS/SC/ST/10th certificate into the designated upload cards.',
  },
  {
    name: 'Verify Real-Time Compliance Badges',
    text: 'Kagazo automatically crops and optimizes each file to official SSC specifications (Photo: 20–50 KB, Signature: 10–20 KB, Certificate: <300 KB).',
  },
  {
    name: 'Download 1-Click Application Bundle ZIP',
    text: 'Click the Download Application Bundle button to export a single compressed ZIP file containing all compliant documents ready for instant upload on ssc.gov.in.',
  },
];

const FAQS = [
  {
    question: 'What are the official SSC photo and signature specifications for 2026?',
    answer:
      'Under official Staff Selection Commission (SSC) guidelines: (1) Photograph: 3.5 cm width × 4.5 cm height, file size strictly between 20 KB and 50 KB, JPEG format, with plain light/white background and both ears visible. (2) Specimen Signature: 4.0 cm width × 2.0 cm height, file size strictly between 10 KB and 20 KB in black ink. (3) Category / Educational Certificates: PDF format strictly between 100 KB and 300 KB.',
  },
  {
    question: 'Why does the SSC portal reject signatures saying "File size must be 10–20 KB"?',
    answer:
      'The SSC portal has an automated strict floor of 10 KB and ceiling of 20 KB. Standard cropping tools often reduce signatures to 5–8 KB. Kagazo solves this by applying high-chroma 300 DPI sampling and lossless comment padding, guaranteeing your file always stays within the 12–18 KB compliant range.',
  },
  {
    question: 'Are spectacles and caps allowed in SSC application photos?',
    answer:
      'No! SSC strictly rejects photos where candidates are wearing spectacles, sunglasses, caps, or hats. Both eyes, ears, and full facial contour must be clearly visible against a plain background without shadows.',
  },
  {
    question: 'Is my data secure when using the SSC Combo Pack generator?',
    answer:
      'Yes. Kagazo operates with 100% client-side zero-storage privacy. All cropping, contrast adjustments, PDF generation, and ZIP bundling happen inside your web browser RAM memory. No identity documents or personal photos are sent to remote servers.',
  },
];

export default function SscComboPackPage() {
  const structuredData = buildToolStructuredData({
    name: 'SSC 3-in-1 Combo Pack Maker',
    description:
      '1-Click All-in-One SSC application bundle maker. Auto-format Photo (20–50 KB), lock Signature (10–20 KB), and compress Category Certificate under 300 KB for SSC CGL, CHSL, MTS & GD. Export single ZIP archive free.',
    url: 'https://kagazo.in/tools/ssc-combo-pack',
    applicationCategory: 'EducationalApplication',
    howToTitle: 'How to Prepare SSC Exam Documents in 1 Click',
    howToDescription:
      'Step-by-step workflow to format, compress, and download all mandatory SSC recruitment assets in a single ZIP package.',
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
            { label: 'SSC 3-in-1 Combo Pack' },
          ]}
          suppressSchema
        />

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Archive className="w-3.5 h-3.5" />
            <span>Staff Selection Commission (SSC) Suite</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            SSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP
          </h1>

          <p className="text-sm sm:text-base text-text-main/70">
            One workspace for all your SSC CGL, CHSL, MTS &amp; GD Constable uploads. Format your Photo (20–50 KB), Anti-Rejection Signature (10–20 KB), and Certificate (&lt;300 KB) in seconds.
          </p>
        </div>

        {/* Answer Capsule for GEO Search Dominance */}
        <AnswerCapsule
          title="SSC Document Upload Rules (2026 Summary)"
          answer="Staff Selection Commission (SSC) portals strictly mandate three uploads: (1) Photograph: 3.5×4.5 cm (20–50 KB) in JPEG format with plain white/light background and zero headwear; (2) Specimen Signature: 4.0×2.0 cm (10–20 KB) in black ink; and (3) Category / Matriculation Certificate: PDF format strictly between 100 KB and 300 KB."
          officialSourceUrl="https://ssc.gov.in"
          officialSourceName="Staff Selection Commission Notice of Examination 2026"
          portal="SSC Application"
        />

        {/* Top Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Core Interactive Tool Engine */}
        <div className="bg-surface/50 border border-surface-darker rounded-3xl p-4 sm:p-8 shadow-sm">
          <ExamComboPackEngine portal="ssc" />
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
                <span>SSC Official Document Specification Matrix</span>
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
                      <td className="p-3 font-mono">3.5 × 4.5 cm (350×450 px)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">20 KB – 50 KB</td>
                      <td className="p-3">Plain light background, face 80% coverage, no spectacles/cap.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Specimen Signature</td>
                      <td className="p-3 font-mono">4.0 × 2.0 cm (240×120 px)</td>
                      <td className="p-3 font-mono text-amber-600 dark:text-amber-400 font-bold">10 KB – 20 KB</td>
                      <td className="p-3">Must not fall below 10 KB or exceed 20 KB. Black ink preferred.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Category Certificate</td>
                      <td className="p-3 font-mono">A4 Document (PDF)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">100 KB – 300 KB</td>
                      <td className="p-3">OBC-NCL, EWS, SC/ST, or Matriculation certificate clearly legible.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How-To Walkthrough */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>How to Use the SSC 3-in-1 Combo Pack Generator</span>
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
                <span>Frequently Asked Questions (SSC Uploads)</span>
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/60">Official Portal Links</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="https://ssc.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-darker/50 hover:bg-surface-darker text-text-main font-medium transition-colors"
                  >
                    <span>SSC Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://ssc.gov.in/candidate-portal/one-time-registration/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-darker/50 hover:bg-surface-darker text-text-main font-medium transition-colors"
                  >
                    <span>SSC OTR Registration</span>
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                  </a>
                </li>
              </ul>
            </div>

            <AdSlot slot="sidebar" />

            {/* In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-4 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Cloud Retention Guarantee</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                All photos, signatures, and certificates are processed strictly inside your device browser memory. Files are never transmitted or stored on any external server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
