import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Layers,
  Lock,
} from 'lucide-react';
import AadhaarFrontBackMergerEngine from '@/components/tools/AadhaarFrontBackMergerEngine';

export const metadata: Metadata = {
  title: 'Aadhaar Front and Back on Single Page PDF (<200KB) | Online Free',
  description:
    'Combine Front and Back sides of your Aadhaar card onto a single A4 page or PDF strictly under 200KB. 1-click UIDAI 8-digit masking, photocopy Xerox ink saver mode, and self-attestation box. 100% In-RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/aadhaar-front-back-pdf',
  },
  openGraph: {
    title: 'Aadhaar Front & Back Single Page PDF Merger (<200KB) | Kagazo',
    description:
      'Merge Aadhaar Front and Back onto 1 clean A4 sheet with UIDAI masking and Xerox mode.',
    url: 'https://Kagazo.in/tools/aadhaar-front-back-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do organizations ask for Aadhaar Front and Back on a single page?',
    answer:
      'Banks, schools, telecom companies, and government portals require both identity proof (photo, name, date of birth, gender on front) and address proof (father/husband name, postal address, QR code on back). Combining both sides on one page eliminates the need to upload multiple files and guarantees acceptance.',
  },
  {
    question: 'What is the purpose of the 8-digit UIDAI mask?',
    answer:
      'Under UIDAI regulations and RBI guidelines, individuals should share masked Aadhaar copies where the first 8 digits are obscured (XXXX-XXXX-1234). This safeguards against identity theft while maintaining complete legal validity for e-KYC and SIM card verification.',
  },
  {
    question: 'How does Photocopy Xerox Mode help?',
    answer:
      'If you need to print a physical copy or submit a photocopy, Photocopy Xerox Mode converts the color card scan into an ultra-sharp monochrome printout, eliminating smartphone camera shadows, reducing yellow bulb glare, and saving 90% of printer ink.',
  },
  {
    question: 'Does this tool upload my Aadhaar card to any database?',
    answer:
      'No. The canvas merging and PDF generation operate 100% inside your computer’s local browser RAM memory. Zero bytes leave your device.',
  },
];

export default function AadhaarFrontBackPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Aadhaar Front and Back Single Page PDF Merger',
    url: 'https://Kagazo.in/tools/aadhaar-front-back-pdf',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Combines front and back of Aadhaar card onto a single A4 page or PDF strictly under 200KB with UIDAI masking and photocopy Xerox mode.',
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
          <span className="text-primary font-bold">Aadhaar Front + Back PDF</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>100% Free • Single A4 Page • UIDAI Masking • &lt;200KB Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Aadhaar Front and Back on Single Page PDF
          </h1>

          <p className="text-sm sm:text-base text-text-main/70 leading-relaxed max-w-2xl mx-auto">
            Merge both sides of your Aadhaar card onto a single A4 sheet or compliant PDF strictly under 200KB. Features vertical stack, side-by-side, wallet card cutout, and photocopy Xerox mode.
          </p>
        </div>

        {/* Engine */}
        <AadhaarFrontBackMergerEngine />

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
              <p className="text-xs text-text-main/60">
                Security and formatting guidelines for Aadhaar card submissions
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
