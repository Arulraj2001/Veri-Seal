import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Camera,
  PenTool,
  Fingerprint,
} from 'lucide-react';
import TnpscOtrComplianceKitEngine from '@/components/tools/TnpscOtrComplianceKitEngine';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'TNPSC OTR Photo, Signature & Thumb Compliance Kit | Group 1, 2, 4 & VAO',
  description:
    'Complete TNPSC One Time Registration (OTR) bundle maker. Generate Photo with Name & Date (20-50KB), Signature strictly 10-20KB (anti-rejection safe), and Left Thumb Impression (10-50KB). 100% free RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/tnpsc-otr-compliance-kit',
  },
  openGraph: {
    title: 'TNPSC OTR Photo, Signature & Thumb Compliance Kit | Kagazo',
    description:
      'All-in-one TNPSC OTR upload preparer: Photo with Name/DOP, Signature 10-20KB guarantee, and Biometric Thumb.',
    url: 'https://Kagazo.in/tools/tnpsc-otr-compliance-kit',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const TNPSC_RULES = [
  { item: 'Applicant Photograph', dims: '3.5 cm × 4.5 cm (413×531 px)', size: '20 KB – 50 KB', requirement: 'White strip at bottom with Name in Capitals + DOP within 3 months' },
  { item: 'Specimen Signature', dims: '3.5 cm × 1.5 cm (413×177 px)', size: '10 KB – 20 KB', requirement: 'Blue or Black ink on white sheet. Portal rejects <10KB strictly' },
  { item: 'Left Thumb Impression', dims: '3.0 cm × 3.0 cm (354×354 px)', size: '10 KB – 50 KB', requirement: 'Clear biometric friction ridges without ink smudges' },
  { item: 'Certificate PDF Uploads', dims: 'Standard A4 Size', size: '100 KB – 200 KB', requirement: 'SSLC marksheet, Community, and PSTM certificates' },
];

const FAQS = [
  {
    question: 'Why does the TNPSC portal reject signatures saying "File size less than 10 KB"?',
    answer:
      'When candidates crop a small signature to 3.5cm × 1.5cm, standard compressors reduce the file to 4–7 KB. The TNPSC OTR server algorithm strictly rejects any upload below 10 KB. Kagazo solves this by applying 300 DPI high-chroma sampling and safe JFIF padding to guarantee the output is strictly between 12 KB and 18 KB.',
  },
  {
    question: 'Is it mandatory to print the Candidate Name and Date of Photograph (DOP)?',
    answer:
      'Yes! According to official TNPSC Instructions to Applicants, the photograph must have a clear white rectangular strip at the bottom containing the candidate full name in capital block letters and the date on which the photograph was taken.',
  },
  {
    question: 'Can I download all 3 processed files together?',
    answer:
      'Yes. You can click "Download All 3 Files" to get your compliant photo, signature, and left thumb impression sequentially named, or download each file individually.',
  },
  {
    question: 'Does Kagazo store or send my photo and signature to any server?',
    answer:
      'Never. All processing happens 100% in your local browser’s volatile RAM memory using client-side HTML5 canvas. No files or personal identity assets are ever uploaded to any server.',
  },
];

export default function TnpscOtrComplianceKitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TNPSC OTR Photo, Signature & Thumb Compliance Kit',
    url: 'https://Kagazo.in/tools/tnpsc-otr-compliance-kit',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'All-in-one compliance tool for TNPSC One Time Registration (OTR). Prepares photo with name/date banner, signature 10-20KB, and left thumb impression.',
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-foreground pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'TNPSC OTR Compliance Kit' },
          ]}
          showHomeIcon
        />

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>100% Free TNPSC OTR Suite • Zero Cyber Cafe Fees</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            TNPSC OTR Photo, Signature &amp; Thumb Compliance Kit
          </h1>

          <p className="text-sm sm:text-base text-text-main/70 leading-relaxed max-w-2xl mx-auto">
            Prepare all 3 mandatory One Time Registration uploads in one place. Guaranteed 20–50KB photo with name/date strip, 10–20KB signature lock, and sharp thumb impression.
          </p>
        </div>

        {/* The Interactive Engine */}
        <TnpscOtrComplianceKitEngine />

        {/* Official TNPSC Portal Specifications Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Official TNPSC OTR Biometric Specifications (2026 Guidelines)
              </h3>
              <p className="text-xs text-text-main/60">
                Extracted directly from Tamil Nadu Public Service Commission Instructions to Applicants
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5 font-bold text-slate-900 dark:text-slate-100">Upload Component</th>
                  <th className="p-3.5 font-bold text-slate-900 dark:text-slate-100">Official Dimensions</th>
                  <th className="p-3.5 font-bold text-slate-900 dark:text-slate-100">Strict File Size Range</th>
                  <th className="p-3.5 font-bold text-slate-900 dark:text-slate-100">Mandatory Portal Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {TNPSC_RULES.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-slate-100">{rule.item}</td>
                    <td className="p-3.5">{rule.dims}</td>
                    <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">{rule.size}</td>
                    <td className="p-3.5 text-slate-500 dark:text-slate-400">{rule.requirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
              <p className="text-xs text-text-main/60">
                Common questions about TNPSC OTR uploads and error resolution
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-sm font-bold text-foreground flex items-start gap-2">
                  <span className="text-primary font-black">Q.</span>
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-text-main/70 leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/tnpsc-otr-compliance-kit" />
      </div>
    </div>
  );
}
