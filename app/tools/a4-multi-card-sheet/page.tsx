import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Printer,
  CreditCard,
  FileCheck2,
  Scissors,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import MultiCardSheetEngine from '@/components/tools/MultiCardSheetEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Multi-Card A4 Gang Sheet Studio (5-in-1 ID Print) | 300 DPI CR-80',
  description:
    'Tile 1 to 5 Front & Back ID cards (Aadhaar, PAN, Voter, Driving License) onto a single A4 glossy sheet at exact CR-80 wallet dimensions (85.60 × 53.98 mm). Instant 1-click 300 DPI print and vector PDF for Epson & Canon printers.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/a4-multi-card-sheet',
  },
  openGraph: {
    title: 'Multi-Card A4 Gang Sheet Studio (5-in-1 ID Cards) | Kagazo',
    description:
      'Zero-Photoshop A4 gang sheet maker for cyber cafes & CSC centres. Print 5 dual-sided ID cards with cutting lines & lamination gutters at 300 DPI.',
    url: 'https://Kagazo.in/tools/a4-multi-card-sheet',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const CARD_SPECS = [
  { name: 'Aadhaar Card (e-Aadhaar Cutout)', widthMm: '85.60 mm', heightMm: '53.98 mm', standard: 'CR-80 ISO 7810' },
  { name: 'Permanent Account Number (PAN)', widthMm: '85.60 mm', heightMm: '53.98 mm', standard: 'NSDL / UTI Standard' },
  { name: 'Voter ID (EPIC Smart Card)', widthMm: '85.60 mm', heightMm: '53.98 mm', standard: 'ECI CR-80' },
  { name: 'Smart Driving License (DL)', widthMm: '85.60 mm', heightMm: '53.98 mm', standard: 'MoRTH Standard' },
  { name: 'Ayushman Bharat (PM-JAY)', widthMm: '85.60 mm', heightMm: '53.98 mm', standard: 'NHA Smart Card' },
];

const FAQS = [
  {
    question: 'How many ID cards fit on a single A4 photo sheet?',
    answer:
      'A single standard A4 sheet (210 × 297 mm) can comfortably fit up to 5 dual-sided ID cards (a total of 10 sides: 5 fronts and 5 backs) side-by-side or stacked in a 2-column grid, with generous 3mm margins for thermal lamination cutting.',
  },
  {
    question: 'What printer settings should I use for 100% exact card dimensions?',
    answer:
      'In your printer dialog or Adobe Acrobat print settings, ensure "Page Scaling" is set to "Actual Size" or "100% Scale". Never select "Fit to Printable Area" or "Shrink to Fit", as this will shrink your cards by 3-5%. Select "Photo Quality Glossy Paper" and "High Quality (300 DPI)".',
  },
  {
    question: 'What is the purpose of the Thermal Pouch Lamination Gutter?',
    answer:
      'When cutting printed cards with scissors or rotary trimmers to insert into standard 65 × 95 mm lamination pouches, the 3mm gutter provides an essential plastic margin around the paper. This ensures the heat pouch creates a watertight, tamper-proof seal that will not peel over time.',
  },
  {
    question: 'Can I print single-sided cards or duplicate front as back?',
    answer:
      'Yes. Toggle "Single-Sided Mode" on any card slot to automatically duplicate the front side or skip the back, making it seamless for single-sided e-Aadhaar cuts or student IDs.',
  },
  {
    question: 'Are uploaded Aadhaar or PAN card scans uploaded to your cloud servers?',
    answer:
      'No! Kagazo performs 100% of the image cropping, layout calculation, and 300 DPI canvas rendering strictly in your local browser’s RAM. Not a single byte of your citizen identity documents is transmitted over the internet or saved to disk.',
  },
];

export default function MultiCardSheetPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Multi-Card A4 Gang Sheet Studio',
        url: 'https://Kagazo.in/tools/a4-multi-card-sheet',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Tile up to 5 dual-sided ID cards on a single A4 sheet at 300 DPI with cutting guides and lamination margins.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Print 5 ID Cards on One A4 Sheet at Exact 300 DPI',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Add Card Slots',
            text: 'Add 1 to 5 card slots for your Aadhaar, PAN, Voter, or Driving License cards.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Front & Back Images',
            text: 'Upload phone photos or scanned images for the front and back of each card.',
          },
          {
            '@type': 'HowToStep',
            name: 'Calibrate Lamination Gutter & Guides',
            text: 'Adjust the thermal pouch gutter margin (2-5mm) and enable dashed cutting guides.',
          },
          {
            '@type': 'HowToStep',
            name: '1-Click Direct Print or PDF Export',
            text: 'Click 1-Click Print at 100% scale or download the print-ready 300 DPI vector A4 PDF.',
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
      {/* Ambient glow */}
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
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">A4 Multi-Card Gang Sheet Studio</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero-Photoshop Cyber Cafe &amp; CSC VLE Lab</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Multi-Card A4 Gang Sheet Studio (5-in-1 ID Print)
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Automatically arrange, calibrate, and print up to 5 Front &amp; Back ID cards (Aadhaar, PAN, Voter ID, Driving License) onto a single A4 photo sheet. Formatted to exact CR-80 plastic card dimensions (85.60 × 53.98 mm) at 300 DPI with cutting marks and thermal pouch margins.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Client-Side Privacy Guarantee:</strong> Your customer identity cards (Aadhaar, PAN, Voter) are processed completely inside your browser RAM. Never stored, never logged, and zero bandwidth uploaded to cloud servers.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <MultiCardSheetEngine />

            {/* CSC VLE Standard Specifications Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-foreground">
                    Official Indian ID Card Dimensions Cheatsheet
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                  ISO/IEC 7810 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <th className="py-2.5 px-3 font-bold">Document Type</th>
                      <th className="py-2.5 px-3 font-bold">Width (mm)</th>
                      <th className="py-2.5 px-3 font-bold">Height (mm)</th>
                      <th className="py-2.5 px-3 font-bold">Standard Spec</th>
                      <th className="py-2.5 px-3 font-bold">Lamination Pouch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    {CARD_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{spec.name}</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-semibold">{spec.widthMm}</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">{spec.heightMm}</td>
                        <td className="py-2.5 px-3 text-slate-500">{spec.standard}</td>
                        <td className="py-2.5 px-3 font-medium text-emerald-600">65 × 95 mm (250 Micron)</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                  >
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
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Epson &amp; Canon Print Calibration</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Print Scaling: 100% (Actual)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Crucial: Never select &quot;Fit to Page&quot;. Maintain 100% scale for exact credit-card wallet fit.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Recommended Paper: 210+ GSM</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Use 210 GSM or 240 GSM Premium Glossy Photo Paper for rigid, professional smart card feel.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Lamination Pouch: 250 Micron</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Standard 65×95mm 250 micron hot thermal lamination pouches seal flawlessly with our 3mm gutter.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Cyber Cafe Pro Tools</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/pvc-id-card-maker"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    Epson L805 PVC Tray Studio
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-emerald-600" />
                    Passport Photo 4×6 Sheet
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    Digital Self-Attest PDF
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/handwritten-declaration-scanner"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Exam Declaration Scanner
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Ad Space (Ostrune Exclusive) */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
