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
  title: 'TNPSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP Maker | Kagazo',
  description:
    '1-Click all-in-one TNPSC application bundle maker. Auto-stamp Candidate Name & Date on Photo (20–50 KB), lock Signature (10–20 KB), and compress Certificate under 200 KB. Export single ZIP archive free.',
  keywords: [
    'tnpsc combo pack photo signature certificate',
    'tnpsc all in one upload bundle zip maker',
    'tnpsc otr photo signature community certificate resizer',
    'tnpsc group 4 3 in 1 upload tool',
    'tnpsc group 2 otr document pack free download',
    'tnpsc photo name date stamp and signature joiner',
    'tnpsc certificate pdf compressor under 200kb online',
    'tamil nadu psc otr 1 click zip download',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/tnpsc-combo-pack',
    languages: {
      'ta-IN': 'https://kagazo.in/ta/tools/tnpsc-photo-signature-resizer',
      'en': 'https://kagazo.in/tools/tnpsc-combo-pack',
      'x-default': 'https://kagazo.in/tools/tnpsc-combo-pack',
    },
  },
  openGraph: {
    title: 'TNPSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP Maker | Kagazo',
    description:
      'All-in-one TNPSC upload preparer: Photo with Name/DOP strip (20–50 KB), anti-rejection Signature (10–20 KB), and Certificate (<200 KB). Download in 1-Click ZIP.',
    url: 'https://kagazo.in/tools/tnpsc-combo-pack',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TNPSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP | Kagazo',
    description:
      'Prepare all mandatory TNPSC OTR uploads in 1-Click: Stamped Photo, 10–20 KB Signature, and PDF Certificate under 200 KB. 100% in-browser privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    name: 'Enter Candidate Name & Date of Photo',
    text: 'Type your full name in capital letters and choose the date the photograph was captured (must be within 3 months of application).',
  },
  {
    name: 'Upload Photo, Signature & Certificate',
    text: 'Drag and drop your raw passport photo, scanned signature slip, and community or marksheet certificate into the designated upload cards.',
  },
  {
    name: 'Verify Real-Time Compliance Badges',
    text: 'Kagazo automatically crops, stamps, and calibrates each file to official TNPSC specifications (Photo: 20–50 KB, Signature: 10–20 KB, Certificate: <200 KB).',
  },
  {
    name: 'Download 1-Click Application Bundle ZIP',
    text: 'Click the Download Application Bundle button to export a single compressed ZIP file containing all compliant documents ready for instant submission on tnpsc.gov.in.',
  },
];

const FAQS = [
  {
    question: 'What are the exact file size and dimension rules for TNPSC OTR 2026?',
    answer:
      'The Tamil Nadu Public Service Commission (TNPSC) mandates: (1) Photograph: 3.5 cm × 4.5 cm (413 × 531 px @ 300 DPI), file size strictly between 20 KB and 50 KB, with bottom white strip containing Candidate Name in capital letters and Date of Photograph (DOP). (2) Specimen Signature: 6.0 cm × 2.0 cm (400 × 133 px), file size strictly between 10 KB and 20 KB. (3) Certificates: Standalone PDF format strictly between 100 KB and 200 KB.',
  },
  {
    question: 'How does Kagazo prevent the "Signature size less than 10 KB" error?',
    answer:
      'When small signatures are cropped, standard software compresses them down to 4–8 KB, causing immediate rejection on the TNPSC server. Kagazo applies 300 DPI high-chroma sampling and safe lossless JPEG COM metadata padding, ensuring every output lands safely within the 12–18 KB compliant range.',
  },
  {
    question: 'Can I upload my Community Certificate or 10th Marksheet as an image?',
    answer:
      'Yes! While TNPSC requires certificates strictly in PDF format under 200 KB, you can upload a JPEG/PNG camera scan into Kagazo. Our in-browser PDF compiler instantly packages the image into a clean, high-contrast A4 PDF optimized under 200 KB.',
  },
  {
    question: 'Are my personal certificates and photo uploaded to any external server?',
    answer:
      'No. In compliance with the Digital Personal Data Protection (DPDP) Act 2023, Kagazo executes all image cropping, text stamping, PDF compilation, and ZIP packaging entirely within your device browser RAM memory. Zero files are uploaded or stored remotely.',
  },
];

export default function TnpscComboPackPage() {
  const structuredData = buildToolStructuredData({
    name: 'TNPSC 3-in-1 Combo Pack Maker',
    description:
      '1-Click All-in-One TNPSC application bundle maker. Auto-stamp Candidate Name & Date on Photo (20–50 KB), lock Signature (10–20 KB), and compress Certificate under 200 KB. Export single ZIP archive free.',
    url: 'https://kagazo.in/tools/tnpsc-combo-pack',
    applicationCategory: 'EducationalApplication',
    howToTitle: 'How to Prepare TNPSC OTR Documents in 1 Click',
    howToDescription:
      'Step-by-step workflow to format, stamp, compress, and download all mandatory TNPSC OTR assets in a single ZIP package.',
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
            { label: 'TNPSC 3-in-1 Combo Pack' },
          ]}
          suppressSchema
        />

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Archive className="w-3.5 h-3.5" />
            <span>TNPSC One Time Registration (OTR) Suite</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            TNPSC 3-in-1 Combo Pack: Photo, Signature & Certificate ZIP
          </h1>

          <p className="text-sm sm:text-base text-text-main/70">
            Stop resizing files one by one. Prepare your Stamped Photo (20–50 KB), Anti-Rejection Signature (10–20 KB), and PDF Certificate (&lt;200 KB) in a single unified workspace.
          </p>
        </div>

        {/* Answer Capsule for GEO Search Dominance */}
        <AnswerCapsule
          title="TNPSC OTR Document Upload Rules (2026 Summary)"
          answer="TNPSC One Time Registration (OTR) strictly mandates three uploads: (1) Photograph: 3.5×4.5 cm (20–50 KB) with bottom white strip containing Candidate Name in capital letters and recent Date of Photograph (DOP); (2) Specimen Signature: 6.0×2.0 cm (10–20 KB) in dark blue or black ink; and (3) Certificates (SSLC / Community / PSTM): PDF format strictly between 100 KB and 200 KB."
          officialSourceUrl="https://www.tnpsc.gov.in"
          officialSourceName="TNPSC Instructions to Applicants 2026"
          portal="TNPSC OTR"
        />

        {/* Top Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Core Interactive Tool Engine */}
        <div className="bg-surface/50 border border-surface-darker rounded-3xl p-4 sm:p-8 shadow-sm">
          <ExamComboPackEngine portal="tnpsc" />
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
                <span>TNPSC OTR Official Specification Matrix</span>
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
                      <td className="p-3 font-mono">3.5 × 4.5 cm (413×531 px)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">20 KB – 50 KB</td>
                      <td className="p-3">Candidate name in capital letters and recent DOP strip at bottom.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Specimen Signature</td>
                      <td className="p-3 font-mono">6.0 × 2.0 cm (400×133 px)</td>
                      <td className="p-3 font-mono text-amber-600 dark:text-amber-400 font-bold">10 KB – 20 KB</td>
                      <td className="p-3">Must not fall below 10 KB or exceed 20 KB. Blue or black ink.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">Community / SSLC Proof</td>
                      <td className="p-3 font-mono">A4 Document (PDF)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">100 KB – 200 KB</td>
                      <td className="p-3">Scannable Deputy Tahsildar QR barcode & certificate serial.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How-To Walkthrough */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>How to Use the TNPSC 3-in-1 Combo Pack Generator</span>
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
                <span>Frequently Asked Questions (TNPSC OTR Uploads)</span>
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
                    href="https://www.tnpsc.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-darker/50 hover:bg-surface-darker text-text-main font-medium transition-colors"
                  >
                    <span>TNPSC Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://apply.tnpscexams.in/otr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-darker/50 hover:bg-surface-darker text-text-main font-medium transition-colors"
                  >
                    <span>TNPSC OTR Registration Gateway</span>
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
