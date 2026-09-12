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
} from 'lucide-react';
import TnMarksheetCompressorEngine from '@/components/tools/TnMarksheetCompressorEngine';

export const metadata: Metadata = {
  title: 'TN 10th (SSLC) & 12th (HSC) Marksheet PDF Compressor (<200KB) | TNEA & TNPSC',
  description:
    'Compress Tamil Nadu SSLC (10th) and HSC (12th) marksheets to strictly between 100KB and 200KB. State Board seal and QR code clarity shield. Dual-side front & back merge for TNEA, TNGASA, and TNPSC. 100% In-RAM privacy.',
  alternates: {
    canonical: 'https://veriseal.in/tools/tn-marksheet-compressor',
  },
  openGraph: {
    title: 'TN Marksheet to PDF Compressor (<200KB) | VeriSeal',
    description:
      'Compress Tamil Nadu 10th & 12th marksheets strictly between 100KB and 200KB without blur for TNEA, TNPSC, and college admission.',
    url: 'https://veriseal.in/tools/tn-marksheet-compressor',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do Tamil Nadu portals reject marksheets that are under 100 KB?',
    answer:
      'Portals like TNEA (Tamil Nadu Engineering Admissions) and TNPSC enforce a minimum threshold (typically 100 KB) because overly compressed PDFs under 100 KB often turn subject marks, student registration numbers, and official signatures illegible. VeriSeal calibrates compression strictly within the 100 KB – 200 KB safe target zone.',
  },
  {
    question: 'How do I combine the front marks table and back side of my marksheet?',
    answer:
      'Simply check the "Include Back Side" box. You can upload both the front marks scan and back instruction page. VeriSeal automatically combines them onto a single A4 page or a multi-page PDF while keeping the total file size below 200 KB.',
  },
  {
    question: 'Will the State Board hologram, round seal, and QR code remain readable?',
    answer:
      'Yes. Our intelligent TN Seal & Marks Table Contrast Shield isolates fine black text and official stamps, darkening them while compressing blank white margins, ensuring total scannability during document verification.',
  },
  {
    question: 'Can I add self-attestation to my marksheet PDF?',
    answer:
      'Yes. Enable the "Add Self-Attestation Footer" toggle and enter your name. VeriSeal will stamp an official "TRUE COPY ATTESTED" banner with today’s date and signature line at the bottom of the A4 page.',
  },
];

export default function TnMarksheetCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tamil Nadu Marksheet to PDF Compressor',
    url: 'https://veriseal.in/tools/tn-marksheet-compressor',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Compresses Tamil Nadu 10th and 12th state board marksheets strictly between 100KB and 200KB for TNEA, TNPSC, and college admissions.',
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-foreground pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">TN Marksheet PDF Compressor</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>TNEA • TNPSC • TNGASA 100KB – 200KB Safe Zone Guaranteed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            TN 10th (SSLC) &amp; 12th (HSC) Marksheet PDF Compressor
          </h1>

          <p className="text-sm sm:text-base text-text-main/70 leading-relaxed max-w-2xl mx-auto">
            Compress your Tamil Nadu State Board marksheet to strictly between 100KB and 200KB. State government seal protection, camera shadow removal, and dual-side front &amp; back merger.
          </p>
        </div>

        {/* Engine */}
        <TnMarksheetCompressorEngine />

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
              <p className="text-xs text-text-main/60">
                Guidelines for marksheet verification and college upload compliance
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
      </div>
    </div>
  );
}
