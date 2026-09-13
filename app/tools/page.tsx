import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Award,
  HelpCircle,
  FileText,
  Lock,
  Printer,
  CheckCircle2,
  ArrowRight,
  UserSquare2,
  Camera,
  FileDown,
  Code,
  Globe,
  QrCode,
  Calculator,
  Check,
  Info,
} from 'lucide-react';
import ToolsDirectory from '@/components/tools/ToolsDirectory';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: '135+ Free Online Tools Directory | Exam Photo Resizers, PDF Compressors & Dev Studio | Kagazo',
  description:
    'Explore 135+ 100% free in-browser tools with zero server uploads and in-RAM privacy. Pre-calibrated photo resizers (UPSC, SSC, TNPSC, RRB), strict PDF compressors (100KB, 200KB, 1MB), passport photo makers, JSON formatter, QR generator, and tax calculators. Zero watermarks, no signups.',
  keywords: [
    'free online tools directory',
    'ssc photo resizer 20 to 50 kb',
    'compress pdf to 200kb for tnpsc otr',
    'upsc civil services photo and signature resizer with name and date',
    'rrb railway photo resizer 320x240',
    'neet ug postcard photo maker 4x6',
    'merge marksheets to single pdf under 1mb',
    '4x6 passport photo sheet maker online free',
    'free qr code generator with logo',
    'client side json formatter and validator',
    'income tax calculator fy 2025 26 new vs old regime',
    'masked aadhaar card generator online',
    'free ats resume builder single page pdf',
    'cyber cafe exam application tools',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools',
  },
  openGraph: {
    title: '135+ Free Online Tools Directory | Exam Photo Resizers, PDF Compressors & Dev Studio',
    description:
      'Explore 135+ sovereign, client-side tools for Indian exam applicants, student document verification, cyber cafes, and developers. 100% in-RAM privacy, zero uploads, zero watermarks.',
    url: 'https://kagazo.in/tools',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '135+ Free Online Tools Directory | Kagazo',
    description:
      '100% free in-browser tools for UPSC, SSC, TNPSC, PDF compression to 200KB, passport sheets, and developer code formatting. Zero uploads.',
  },
};

const FAQS = [
  {
    question: 'Why do government job portals (UPSC, SSC, TNPSC, RRB) reject uploaded photos and signatures?',
    answer:
      'Recruitment portals use strict automated server validation scripts. Rejections almost always happen due to three factors: (1) File size violations—e.g., uploading a 52KB photo when the portal strictly caps uploads at 50KB; (2) Incorrect pixel dimensions or aspect ratios—e.g., uploading 200×200px when the portal expects 350×350px or 3.5×4.5cm; and (3) Missing mandatory metadata—such as candidate name and Date of Photo (DOP) printed on the lower strip within 10 days of the notification. Kagazo auto-pads undersized scans and strictly enforces KB caps to guarantee 100% portal acceptance.',
  },
  {
    question: 'How does Kagazo compress certificate PDFs to strictly 200KB or 100KB without blurring roll numbers?',
    answer:
      'Unlike generic online compressors that indiscriminately reduce raster image resolution until text becomes illegible, Kagazo utilizes advanced client-side WebAssembly rendering. It isolates background scan grain, optimizes embedded fonts, cleans Xerox noise, and applies targeted quantization. This ensures critical educational details—such as University roll numbers, subject marks, and Controller of Examinations signatures—remain crisp and legible even under 200KB and 100KB caps.',
  },
  {
    question: 'Is my personal data, marksheet, or Aadhaar number uploaded or saved on Kagazo servers?',
    answer:
      'No. Kagazo operates on a strict zero-upload, zero-persistence privacy architecture. All compression, image resizing, format conversions, and PDF decryptions execute locally inside your web browser’s volatile computer RAM memory using HTML5 Canvas, WebAssembly, and FileReader APIs. Your files are never transmitted to external cloud servers or stored in databases. When you close the tab, all file memory is instantly purged.',
  },
  {
    question: 'Can I add candidate name and Date of Photo (DOP) on UPSC, SSC, and TNPSC exam photos?',
    answer:
      'Yes. Our specialized recruitment resizers (including UPSC Photo Resizer, SSC Photo Resizer, and TNPSC Photo Resizer) include dedicated DOP text banner engines. You can type the applicant’s name and select the exact photo capture date, which is dynamically rendered onto a compliant white bottom strip conforming to official notification guidelines.',
  },
  {
    question: 'How do cyber cafe and CSC operators print 8 passport photos on a single 4×6 inch sheet?',
    answer:
      'Using our Cyber Cafe Passport Photo Sheet Maker, operators upload a single portrait photo and select the standard 4×6 inch (10×15 cm) photo paper layout. The tool instantly generates a ready-to-print gang sheet with 8 perfectly aligned 3.5×4.5cm passport photos, complete with thin cutting borders and proper margins for Epson, Canon, and HP photo inkjet printers.',
  },
  {
    question: 'Can I merge multiple semester marksheets into a single PDF under 1MB or 2MB?',
    answer:
      'Yes. The Multi-Marksheet to Single PDF Merger allows students and graduates to upload all semester grade cards, degree certificates, and provisional diplomas. It re-orders pages, compresses high-resolution camera scans, and produces a single unified PDF strictly under 1MB or 2MB, which is mandatory for UPSC ORA, State PSC, and corporate job portals.',
  },
  {
    question: 'Are the developer tools (JSON Formatter, Code Minifiers, Base64) safe for proprietary source code?',
    answer:
      '100% safe. Because every developer utility on Kagazo runs purely client-side via JavaScript in your local browser sandbox, zero lines of source code, API keys, JSON payloads, or database SQL queries ever leave your computer. You can safely format internal production JSON without risking proprietary data leaks.',
  },
  {
    question: 'Does Kagazo work on Android and iOS mobile phones without installing any app?',
    answer:
      'Yes! All 135+ tools are fully responsive progressive web utilities that run seamlessly in Chrome, Safari, Firefox, and Edge on Android phones, iPhones, tablets, and desktop computers. You can take a photo directly with your phone camera, resize it to 20KB–50KB, and download the finished file in seconds without downloading third-party APKs or apps.',
  },
];

const EXAM_SPECIFICATIONS_TABLE = [
  {
    portal: 'Staff Selection Commission (SSC)',
    exams: 'CGL, CHSL, MTS, GD Constable, CPO',
    photoSpec: '20 KB – 50 KB | 3.5 × 4.5 cm (100×120 px to 200×240 px) | White/Light BG',
    signSpec: '10 KB – 20 KB | 4.0 × 2.0 cm (140×60 px) | Black/Dark Blue Ink',
    specialNote: 'Spectacles, caps, and tilted faces strictly prohibited.',
  },
  {
    portal: 'Union Public Service Commission (UPSC)',
    exams: 'Civil Services (CSE), NDA, CDS, CMS, IES, EPFO',
    photoSpec: '20 KB – 300 KB | 350 × 350 px to 1000 × 1000 px | Name & DOP Strip',
    signSpec: '20 KB – 300 KB | 350 × 350 px to 1000 × 1000 px | Clear White BG',
    specialNote: 'Date of Photo must not be older than 10 days from notification.',
  },
  {
    portal: 'Tamil Nadu Public Service Commission (TNPSC)',
    exams: 'Group 1, Group 2/2A, Group 4, VAO, Combined Technical',
    photoSpec: '20 KB – 50 KB | 3.5 × 4.5 cm | Candidate Name & DOP Banner',
    signSpec: '10 KB – 20 KB | 6.0 × 2.0 cm | Blue or Black Ink',
    specialNote: 'All educational certificate PDFs strictly under 200 KB for OTR.',
  },
  {
    portal: 'Railway Recruitment Boards (RRB)',
    exams: 'NTPC, Group D, ALP, Technician, JE',
    photoSpec: '20 KB – 50 KB | 320 × 240 px | Crisp Frontal Portrait',
    signSpec: '10 KB – 40 KB | 160 × 120 px | Running Handwriting',
    specialNote: 'Capital/block letter signatures are automatically disqualified.',
  },
  {
    portal: 'National Testing Agency (NTA)',
    exams: 'NEET UG, JEE Main, CUET, UGC NET',
    photoSpec: '10 KB – 200 KB (Passport) & 4×6 in (Postcard) | 80% Face Coverage',
    signSpec: '4 KB – 30 KB | 3.5 × 1.5 cm | Black Ink on White Paper',
    specialNote: 'Ears must be clearly visible against pure white background.',
  },
  {
    portal: 'Banking Personnel Selection (IBPS & SBI)',
    exams: 'PO, Clerk, SO, RRB Office Assistant',
    photoSpec: '20 KB – 50 KB | 200 × 230 px | True Color Portrait',
    signSpec: '10 KB – 20 KB | 140 × 60 px | Black Ink Pen Only',
    specialNote: 'Requires Handwritten Declaration (50–100 KB in black ink).',
  },
];

export default function ToolsDirectoryPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-foreground pt-20 sm:pt-22 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data: CollectionPage + ItemList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': 'https://kagazo.in/tools#collection',
                url: 'https://kagazo.in/tools',
                name: 'Kagazo 135+ Free Online Tools Directory | Exam Resizers, PDF Compressors & Dev Studio',
                description:
                  'Complete directory of 135+ free in-browser tools. Signature extractor, PDF compressors (100KB, 200KB, 1MB), photo resizers for UPSC, SSC, NEET, RRB, GATE, passport sheets, and developer code formatters. 100% client-side RAM privacy.',
                isPartOf: {
                  '@type': 'WebSite',
                  '@id': 'https://kagazo.in/#website',
                  name: 'Kagazo',
                  url: 'https://kagazo.in',
                },
              },
              {
                '@type': 'ItemList',
                '@id': 'https://kagazo.in/tools#itemlist',
                name: 'Top Flagship Tools on Kagazo',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Master PDF Compressor',
                    url: 'https://kagazo.in/tools/pdf-compressor',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Compress PDF to 200KB',
                    url: 'https://kagazo.in/tools/compress-pdf-to-200kb',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'SSC Photo & Signature Resizer',
                    url: 'https://kagazo.in/tools/ssc-photo-signature-resizer',
                  },
                  {
                    '@type': 'ListItem',
                    position: 4,
                    name: 'UPSC Photo & Signature Resizer',
                    url: 'https://kagazo.in/tools/upsc-photo-signature-resizer',
                  },
                  {
                    '@type': 'ListItem',
                    position: 5,
                    name: 'TNPSC Photo & Signature Resizer',
                    url: 'https://kagazo.in/tools/tnpsc-photo-signature-resizer',
                  },
                  {
                    '@type': 'ListItem',
                    position: 6,
                    name: 'Free QR Code Generator',
                    url: 'https://kagazo.in/tools/qr-code-generator',
                  },
                  {
                    '@type': 'ListItem',
                    position: 7,
                    name: 'JSON Formatter, Validator & Beautifier',
                    url: 'https://kagazo.in/tools/json-formatter',
                  },
                  {
                    '@type': 'ListItem',
                    position: 8,
                    name: 'Income Tax Calculator FY 2025–26',
                    url: 'https://kagazo.in/tools/income-tax-calculator-2025-26',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://kagazo.in/tools#faq',
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
          }),
        }}
      />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="-mt-1 sm:-mt-2">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Exam & Document Tools Directory' },
            ]}
            showHomeIcon
          />
        </div>

        {/* Page Header Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>135+ Free Public Utilities • 100% In-RAM Privacy • Zero Watermarks • Zero Signups</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.18]">
            All-in-One Online Tools Directory for{' '}
            <span className="font-serif italic font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">
              Exams
            </span>
            ,{' '}
            <span className="font-serif italic font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent inline-block">
              Documents
            </span>{' '}
            <span className="font-sans text-slate-400 dark:text-slate-500 font-normal">&amp;</span>{' '}
            <span className="font-serif italic font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent inline-block">
              Developers
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            High-precision client-safe utilities engineered for UPSC, SSC, TNPSC, RRB, IBPS, NEET aspirants, cyber cafes, and developers. Compress PDFs under strict 100KB/200KB limits, add candidate DOP banners, format passport gang sheets, and minify code—100% in your browser RAM.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span><strong>135+</strong> Free Utilities</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span><strong>11</strong> Granular Suites</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span><strong>0 KB</strong> Cloud Uploads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span><strong>100%</strong> Free Forever</span>
            </div>
          </div>
        </div>

        {/* 4 Sovereign Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">100% In-RAM Privacy</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Files process locally via WebAssembly. Purged instantly on tab close. Zero cloud storage.
              </p>
            </div>
          </div>

          <div className="p-4.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Exact Official Specs</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Pre-calibrated for TNPSC (200KB OTR), UPSC (350px DOP), SSC (20-50KB), and RRB (320px).
              </p>
            </div>
          </div>

          <div className="p-4.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Zero Watermarks</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                No paywalls, no forced branding, and no mandatory account sign-ups. 100% clean outputs.
              </p>
            </div>
          </div>

          <div className="p-4.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-700 dark:text-fuchsia-400 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Cyber Cafe Ready</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                4×6 passport sheets (8 prints), 5-in-1 A4 gang sheets, and Epson L805 PVC tray layouts.
              </p>
            </div>
          </div>
        </div>

        {/* Master Interactive Tools Directory Component */}
        <ToolsDirectory />

        {/* ------------------------------------------------------------- */}
        {/* On-Page SEO Section 1: Official Portal Specification Radar */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Recruitment Portal Standards</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Indian Competitive Exam Photo &amp; Signature Standards (2025–2026)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm sm:text-right">
              Calibrated to official notifications from UPSC, SSC, TNPSC, NTA, IBPS, and Railway RRB.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold bg-slate-50 dark:bg-slate-800/60">
                  <th className="py-3 px-3.5 rounded-l-xl">Recruitment Portal</th>
                  <th className="py-3 px-3.5">Major Exams</th>
                  <th className="py-3 px-3.5">Photo Requirements</th>
                  <th className="py-3 px-3.5">Signature Requirements</th>
                  <th className="py-3 px-3.5 rounded-r-xl">Critical Disqualification Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {EXAM_SPECIFICATIONS_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {row.portal}
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                      {row.exams}
                    </td>
                    <td className="py-3 px-3.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                      {row.photoSpec}
                    </td>
                    <td className="py-3 px-3.5 text-indigo-700 dark:text-indigo-400 font-semibold">
                      {row.signSpec}
                    </td>
                    <td className="py-3 px-3.5 text-slate-500 dark:text-slate-400">
                      {row.specialNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* On-Page SEO Section 2: Why Choose In-Browser WebAssembly */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Sovereign Privacy Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Kagazo Client-Side Processing is Safer Than Traditional Cloud Converters
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Most generic PDF converters and photo resizers upload your sensitive documents (such as Aadhaar cards, caste certificates, college marksheets, and signatures) to overseas cloud servers where files are stored temporarily or indefinitely. Kagazo fundamentally rejects this architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                <span>Kagazo Local In-RAM Processing</span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Zero Server Uploads:</strong> Files remain on your device. Zero bytes leave your browser RAM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Instant Zero-Latency Execution:</strong> No waiting for remote server upload or download queues.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Complete Data Sovereignty:</strong> Complies with IT Act and Digital Personal Data Protection (DPDP) principles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Unrestricted Free Usage:</strong> No daily file caps, no paywalls, and no forced watermark logos.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
                <span className="w-4.5 h-4.5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-black">✕</span>
                <span>Traditional Cloud Document SaaS Tools</span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5 shrink-0">•</span>
                  <span><strong>Cloud Storage Risk:</strong> Private marksheet and identity documents uploaded to remote third-party servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5 shrink-0">•</span>
                  <span><strong>Severe Usage Limits:</strong> Often restricts users to 2 free files per day before displaying subscription paywalls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5 shrink-0">•</span>
                  <span><strong>Forced Brand Watermarks:</strong> Injects unwanted logo stamps on your official government documents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5 shrink-0">•</span>
                  <span><strong>Slow Upload/Download Queues:</strong> Dependent on server load and internet bandwidth for large PDF files.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* On-Page SEO Section 3: The 11 Sovereign Tool Suites Overview */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Comprehensive Public Infrastructure</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              11 Purpose-Built Tool Suites for Everyday Productivity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore our structured directory engineered to replace paid subscriptions, complex graphic editors, and bloated desktop software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs">
                <Camera className="w-4 h-4" />
                <span>Exam &amp; Recruitment Photos</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Bi-directional image padding, signature cleanups, and automatic Date-of-Photo (DOP) strips for SSC, UPSC, TNPSC, RRB, and state PSC exams.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold text-xs">
                <UserSquare2 className="w-4 h-4" />
                <span>Passport &amp; Visa Photo Lab</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                ICAO biometric standards, background whitening, suit and formal attire changer, and exact 35×45mm / 2×2 inch sizing for 50+ international visas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
                <FileDown className="w-4 h-4" />
                <span>PDF Utilities &amp; Compressors</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Compress PDF certificates strictly to 200KB, 100KB, 300KB, and 1MB. Merge multi-semester marksheets and unlock password-protected e-Aadhaar PDFs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-xs">
                <FileText className="w-4 h-4" />
                <span>Image &amp; Media Studio</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Compress photos to exact KB limits (20KB, 50KB, 100KB), change DPI to 300/600 DPI, convert WebP, PNG, JPG, and HEIC, and extract YouTube thumbnails.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                <Code className="w-4 h-4" />
                <span>Developer &amp; Code Studio</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Client-safe JSON formatter and validator, HTML/CSS/JS code minifiers, SQL beautifier, Markdown-to-HTML, and Base64/URL encoders.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-xs">
                <Globe className="w-4 h-4" />
                <span>Network &amp; Webmaster Health</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                DNS records lookup, SSL certificate expiry monitor, WHOIS domain age checker, IP geolocation, and HTTP response headers inspector.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-xs">
                <FileText className="w-4 h-4" />
                <span>Text, Speech &amp; Content</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                In-browser text-to-speech voice generator, word and character statistical counter, case converters, line-break removers, and Lorem Ipsum generators.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-xs">
                <QrCode className="w-4 h-4" />
                <span>Communication &amp; QR Lab</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate high-resolution QR codes with custom logos, Code 128/EAN barcodes, WhatsApp click-to-chat links, and UTM campaign tracking URLs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Security, Hash &amp; Identity</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                CSPRNG password generator, SHA-256 and MD5 cryptographic hashers, UUID v4 generator, DSC signature verifier, and Aadhaar number redactor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-violet-700 dark:text-violet-400 font-bold text-xs">
                <Calculator className="w-4 h-4" />
                <span>Calculators &amp; Finance</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Income Tax Calculator FY 2025–26 (New vs Old regime), in-hand monthly salary breakdown, TNEA cutoff normalizer, and Unix timestamp converters.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-2 text-fuchsia-700 dark:text-fuchsia-400 font-bold text-xs">
                <Printer className="w-4 h-4" />
                <span>Print, PVC &amp; Cyber Cafe Lab</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                5-in-1 A4 ID gang sheets, Epson L805 PVC card tray alignment, 4×6 photo sheets, DL front-and-back merger, and fast WhatsApp document print optimizer.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* FAQ Section with Visual Accordion Styling */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-4">
            <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Everything you need to know about processing exam documents, privacy, and free tools.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="space-y-2 p-4.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80"
              >
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Bottom CTA Bookmark Banner */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-emerald-700/20">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Bookmark Kagazo (Ctrl + D) for Fast Free Access
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Always 100% free, zero watermarks, and zero file uploads. Used daily by competitive exam aspirants, cyber cafe operators, and students across India.
            </p>
          </div>
          <Link
            href="/tools/pdf-compressor"
            className="px-6 py-3 rounded-xl bg-white text-emerald-900 font-bold text-xs shadow-md hover:bg-emerald-50 transition-colors inline-flex items-center gap-2 shrink-0"
          >
            <span>Try Master PDF Compressor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
