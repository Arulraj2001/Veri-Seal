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
  QrCode,
  Award,
} from 'lucide-react';
import TnEsevaiCertificateEngine from '@/components/tools/TnEsevaiCertificateEngine';

export const metadata: Metadata = {
  title: 'TN e-Sevai Revenue Certificate PDF Optimizer (<200KB) | Community & Nativity',
  description:
    'Optimize Tamil Nadu revenue certificates (Community, Nativity, Income, First Graduate) to strictly under 200KB. Protects Tahsildar digital signature QR code and barcode clarity. 100% In-RAM privacy.',
  alternates: {
    canonical: 'https://veriseal.in/tools/tn-esevai-certificate-prep',
  },
  openGraph: {
    title: 'TN e-Sevai Revenue Certificate PDF Optimizer (<200KB) | VeriSeal',
    description:
      'Compress Community, Nativity, and First Graduate certificates under 200KB with QR code sharpness lock for government portals.',
    url: 'https://veriseal.in/tools/tn-esevai-certificate-prep',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do Tamil Nadu portals reject e-Sevai certificates?',
    answer:
      'Downloaded certificates from tnesevai.tn.gov.in or scanned photocopies often exceed 2MB to 5MB, which exceeds the strict 200KB limit on TNPSC, TNEA, and college application portals. Conversely, generic compression tools blur the Tahsildar digital signature QR code, leading to automatic rejection by portal verification bots.',
  },
  {
    question: 'How does this tool preserve the Tahsildar DSC QR code?',
    answer:
      'Our intelligent QR Code & Seal Sharpener filter applies adaptive contrast thresholding specifically to the cryptographic 2D barcode and digital signature block, ensuring the certificate serial number remains instant-scannable while aggressively compressing blank paper backgrounds.',
  },
  {
    question: 'Which Tamil Nadu revenue certificates are supported?',
    answer:
      'All certificates issued by the Revenue and Disaster Management Department via e-Sevai, including Community Certificate, Nativity Certificate, Income Certificate, First Graduate Certificate, Legal Heir Certificate, and Residence Certificate.',
  },
  {
    question: 'Is my personal revenue certificate uploaded to your server?',
    answer:
      'No. Processing executes 100% inside your computer’s local browser memory (RAM). Zero bytes are saved or transmitted to any server.',
  },
];

export default function TnEsevaiCertificatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TN e-Sevai Revenue Certificate PDF Optimizer',
    url: 'https://veriseal.in/tools/tn-esevai-certificate-prep',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Optimizes Tamil Nadu revenue certificates (Community, Nativity, Income, First Graduate) strictly under 200KB with QR code sharpness lock.',
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
          <span className="text-primary font-bold">TN e-Sevai Certificate Optimizer</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Community • Nativity • Income • First Graduate &lt; 200KB Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            TN e-Sevai Revenue Certificate PDF Optimizer
          </h1>

          <p className="text-sm sm:text-base text-text-main/70 leading-relaxed max-w-2xl mx-auto">
            Compress your digitally signed revenue certificates strictly under 200KB for TNPSC, TNEA, and college admissions with Tahsildar QR code sharpness lock and background shadow removal.
          </p>
        </div>

        {/* Engine */}
        <TnEsevaiCertificateEngine />

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
              <p className="text-xs text-text-main/60">
                Official specifications for Tamil Nadu revenue certificate uploads
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
