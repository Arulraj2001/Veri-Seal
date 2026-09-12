import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileText,
  Sparkles,
} from 'lucide-react';
import CardMergerEngine from '@/components/tools/CardMergerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Driving License Front & Back Merger to Single Page PDF (<200KB) | Parivahan Sarathi',
  description:
    'Merge Front and Back sides of smart card Driving License (DL) or Vehicle RC onto a single A4 page PDF strictly under 200KB for Parivahan Sarathi, State RTOs, FASTag KYC, and Passport Seva. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/driving-license-card-merger',
  },
  openGraph: {
    title: 'Free Driving License Front & Back Merger to PDF (<200KB) | Kagazo',
    description:
      'Combine both sides of smart card DL onto a single A4 page strictly under 200KB for Parivahan Sarathi uploads.',
    url: 'https://Kagazo.in/tools/driving-license-card-merger',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why does Parivahan Sarathi require both sides of the DL in a single PDF?',
    answer:
      'The Ministry of Road Transport and Highways (MoRTH) Sarathi portal only allows uploading one single document file per slot. The Front side contains your photo and license number, while the Back side contains vehicle class endorsements (MCWG, LMV) and validity dates.',
  },
  {
    question: 'What is the maximum file size allowed on Parivahan Sarathi for DL uploads?',
    answer:
      'The Parivahan Sarathi portal enforces a strict maximum file size of 200 KB in PDF or JPEG format. Our engine automatically compresses your merged A4 sheet strictly under this threshold.',
  },
  {
    question: 'Can I use this tool for Vehicle Registration Certificates (RC) and PAN cards?',
    answer:
      'Yes! All Indian smart cards follow the ISO/IEC 7810 ID-1 CR-80 standard. This tool works perfectly for Driving Licenses, Vehicle RC smart cards, Voter ID (EPIC), and PAN cards.',
  },
  {
    question: 'Are my Driving License details or photos saved on Kagazo servers?',
    answer:
      'Never. All card merging and compression operations are conducted strictly in temporary computer memory (RAM) and immediately purged after download.',
  },
];

export default function CardMergerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Driving License Front & Back Merger',
        url: 'https://Kagazo.in/tools/driving-license-card-merger',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Combine Front and Back sides of smart card driving licenses onto a single A4 PDF strictly under 200KB for Parivahan Sarathi.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Merge Front and Back of Driving License into Single PDF under 200KB',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Front & Back Photos',
            text: 'Take phone photos of the Front and Back sides of your smart card DL.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select A4 Layout',
            text: 'Choose Vertical Stack (standard) or Side-by-Side.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Parivahan PDF (<200KB)',
            text: 'Download your single-page PDF guaranteed under 200KB ready for portal upload.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Exam Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Driving License Card Merger</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Parivahan Sarathi & RTO Utility</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Driving License Front & Back Merger to Single PDF (&lt;200KB)
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Combine the Front and Back sides of your smart card Driving License (DL) or Vehicle RC onto a single A4 page PDF strictly under 200KB for Parivahan Sarathi, State RTOs, FASTag, and Passport Seva.
              </p>
            </div>

            {/* In-Memory Privacy */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-Memory RAM Processing:</strong> Your Driving License and Vehicle RC documents are processed strictly in volatile RAM memory. Zero files are stored on our servers.
              </span>
            </div>

            {/* Core Tool Engine */}
            <CardMergerEngine />

            {/* FAQ Accordion */}
            <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                      <span className="text-emerald-600 font-extrabold">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (32%) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Portal Specification Rules</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Parivahan Sarathi (MoRTH)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Strictly &lt; 200 KB • Single Page PDF / JPG</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">FASTag & Bank KYC</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Both Front & Back clearly visible with vehicle number</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Passport Seva Kendra (PSK)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Address proof copy with date endorsement</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Related Document Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/clean-document-scanner"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>Clean Document Scanner & Binarizer</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/tools/mask-aadhaar"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>Mask Aadhaar (8 Digits)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>Compress PDF to 200KB</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
