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
  Printer,
  Layers,
  FileCheck2,
} from 'lucide-react';
import PvcCardStudioEngine from '@/components/tools/PvcCardStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PVC Smart ID Card Tray Print Studio | Epson L805 & Canon CR-80 300 DPI',
  description:
    'Format front & back Aadhaar, PAN, Voter ID, and College Cards into exact ISO CR-80 dimensions (85.6mm x 53.98mm). Export 300 DPI ready-to-print PDFs for Epson L805 / Canon PVC trays and A4 laminating sheets. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/pvc-id-card-maker',
  },
  openGraph: {
    title: 'Free PVC Smart Card Tray Print Studio | Kagazo',
    description:
      'Format ID cards for Epson L805 PVC tray printing and A4 thermal lamination with cutting guides.',
    url: 'https://Kagazo.in/tools/pvc-id-card-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the exact dimensions of an official PVC Smart ID card?',
    answer:
      'Standard government PVC cards (Aadhaar, PAN, Driving License, Voter ID) follow the ISO/IEC 7810 ID-1 (CR-80) format: exactly 85.60 mm in width by 53.98 mm in height with 3.18 mm rounded corner radius.',
  },
  {
    question: 'Does this work directly with Epson L805 / L850 / L800 PVC card trays?',
    answer:
      'Yes! Selecting the "Epson L805 Tray" format generates an uncompressed 300 DPI layout matching the exact slot coordinates (140mm x 210mm) of standard Epson L805 and Canon double PVC card trays.',
  },
  {
    question: 'Can I print on standard A4 photo paper for thermal pouch lamination?',
    answer:
      'Yes! Choose the "A4 Lamination Sheet" format. It aligns the front and back sides side-by-side with 0.5pt corner cutting registration marks for easy folding and laminating.',
  },
  {
    question: 'Are my identity documents stored or uploaded anywhere?',
    answer:
      'No. Kagazo guarantees 100% in-memory RAM processing. Your Aadhaar, PAN, or voter IDs are processed strictly in volatile server RAM and purged immediately upon export.',
  },
];

export default function PvcCardStudioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo PVC Smart ID Card Tray Print Studio',
        url: 'https://Kagazo.in/tools/pvc-id-card-maker',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Format and align front & back ID cards for Epson L805 PVC trays and A4 lamination sheets at 300 DPI.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Print PVC Smart Cards on Epson L805 Tray',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Front & Back Cards',
            text: 'Upload clear scans or photos of the front and back of the ID card.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Print Format',
            text: 'Select Epson L805 Tray (140x210mm) or A4 Lamination Sheet.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 300 DPI Print PDF',
            text: 'Download the print-ready PDF and print at 100% scale without border fitting.',
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

      {/* JSON-LD Structured Data */}
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
          <span className="text-primary font-bold truncate">PVC ID Card Studio</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>ISO/IEC 7810 CR-80 Standard Format</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                PVC Smart ID Card Tray Print Studio
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Extract, calibrate, and print Front & Back Aadhaar, PAN, Voter, and College ID cards into exact CR-80 plastic card dimensions (85.6mm × 53.98mm). Direct 300 DPI layout for Epson L805 PVC Trays and A4 lamination sheets.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero Disk Identity Privacy:</strong> Sensitive identity cards are processed strictly inside ephemeral RAM memory and wiped instantly. Zero images are stored on our servers.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <PvcCardStudioEngine />

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
            {/* Value Pillar Card */}
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Printer Setup Calibration</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Print Scale: 100% (Actual)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Disable &quot;Fit to Page&quot; in Adobe Acrobat or printer dialog.</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Tray Media: CD/DVD Card</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Select CD/DVD Tray in Epson driver for precise tray feeding.</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Ultra 300 DPI Sharpness</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Vector-sharp microtext for small font readability.</div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Related Card Tools</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/driving-license-card-merger"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    DL Card Merger &lt;200KB
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/batch-photo-resizer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    Bulk Photo Resizer
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    Self-Attest PDF
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Ad Space */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
