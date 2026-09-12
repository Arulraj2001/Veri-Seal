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
  School,
  Building,
} from 'lucide-react';
import PstmCertificateEngine from '@/components/tools/PstmCertificateEngine';

export const metadata: Metadata = {
  title: 'Official PSTM Certificate Generator (G.O. Ms. No. 82) | 20% TNPSC Quota',
  description:
    'Generate official bilingual (Tamil & English) Persons Studied in Tamil Medium (PSTM) certificate format as prescribed by Tamil Nadu G.O. (Ms.) No. 82. Pre-printed school letterhead margin clearance, multi-school periods, and isolated A4 legal print.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/pstm-certificate-generator',
  },
  openGraph: {
    title: 'Official PSTM Certificate Generator (G.O. Ms. No. 82) | Kagazo',
    description:
      'Generate authorized Tamil Nadu PSTM certificate format in Tamil & English for 20% TNPSC government job reservation.',
    url: 'https://Kagazo.in/tools/pstm-certificate-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is the PSTM reservation and who is eligible?',
    answer:
      'Under the Tamil Nadu Appointment on Preferential Basis in the Services under the State of Persons Studied in Tamil Medium Act, 20% of all direct recruitment vacancies in state government jobs (TNPSC Group 1, Group 2, Group 4, VAO, Police SI, TRB) are horizontally reserved for candidates who studied throughout their prescribed educational qualifications in Tamil medium.',
  },
  {
    question: 'What is G.O. (Ms.) No. 82 and why is this format mandatory?',
    answer:
      'G.O. (Ms.) No. 82, Human Resources Management (S) Department, dated 16.08.2021, prescribes the mandatory bilingual statutory format for PSTM certificates. TNPSC strictly rejects certificates issued in older or self-drafted formats without the bilingual clauses and admission register cross-reference.',
  },
  {
    question: 'I studied in multiple schools. How do I get PSTM certificates?',
    answer:
      'If you studied 1st to 5th in a Primary School and 6th to 10th in a Higher Secondary School, you must obtain separate PSTM certificates from each school’s Headmaster covering those specific academic years. Our tool allows you to add multiple study rows or print separate certificates easily.',
  },
  {
    question: 'Can I print this certificate directly onto our school letterhead?',
    answer:
      'Yes! Use the "Pre-Printed School Letterhead Clearance" slider (1.0 to 4.0 inches) to create exact blank top margin clearance so your certificate prints perfectly below the pre-printed school header without overlapping.',
  },
];

export default function PstmCertificatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Official PSTM Certificate Generator (G.O. Ms. No. 82)',
    url: 'https://Kagazo.in/tools/pstm-certificate-generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Official statutory generator for Persons Studied in Tamil Medium (PSTM) certificate in Tamil & English as mandated by Tamil Nadu G.O. Ms. No. 82 for 20% TNPSC quota.',
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
          <span className="text-primary font-bold">PSTM Certificate Generator</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Tamil Nadu G.O. (Ms.) No. 82 Authorized Bilingual Format</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Official PSTM Certificate Generator (Tamil &amp; English)
          </h1>

          <p className="text-sm sm:text-base text-text-main/70 leading-relaxed max-w-2xl mx-auto">
            Generate your official Persons Studied in Tamil Medium certificate for 20% TNPSC horizontal reservation. School letterhead clearance, multi-school support, and clean legal printout.
          </p>
        </div>

        {/* Engine */}
        <PstmCertificateEngine />

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
              <p className="text-xs text-text-main/60">
                Statutory guidelines on PSTM certificates and government verification
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
