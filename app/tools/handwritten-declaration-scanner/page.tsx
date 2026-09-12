import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PenTool,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Camera,
  Scissors,
} from 'lucide-react';
import HandwrittenDeclarationEngine from '@/components/tools/HandwrittenDeclarationEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'IBPS & SBI Handwritten Declaration Scanner & Resizer (50KB–100KB)',
  description:
    'Purge blue ruled notebook lines, whiten camera shadows, and strictly lock declaration file size between 50KB and 100KB for IBPS PO, Clerk, SBI, and Railway RRB 2026. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/handwritten-declaration-scanner',
  },
  openGraph: {
    title: 'Exam Handwritten Declaration Scanner (50KB–100KB) | Kagazo',
    description:
      'Eliminate ruled lines and lock image strictly between 50KB and 100KB for IBPS, SBI, and Railway recruitment portals.',
    url: 'https://Kagazo.in/tools/handwritten-declaration-scanner',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const DECLARATION_RULES = [
  { rule: 'Mandatory Black Ink', desc: 'IBPS & SBI strictly require black ink on white paper. Blue ink or pencil declarations are rejected by TCS iON document filters.' },
  { rule: 'No CAPITAL / Block Letters', desc: 'Writing the whole declaration in CAPITAL LETTERS will cause automatic application rejection. Write in normal cursive/running handwriting.' },
  { rule: '50 KB to 100 KB Strict Boundary', desc: 'The upload portal throws an error if file is 49KB or 101KB. Kagazo automatically locks your image inside the safe 65KB-85KB zone.' },
  { rule: 'Plain White Unlined Paper', desc: 'Ruled notebook lines confuse biometric character analyzers. Our AI filter strips horizontal blue lines automatically.' },
];

const FAQS = [
  {
    question: 'What is the exact official text for the IBPS Handwritten Declaration 2026?',
    answer:
      'The official text specified in the IBPS PO/Clerk notification is: "I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required."',
  },
  {
    question: 'Why was my handwritten declaration rejected for file size?',
    answer:
      'Banking portals (IBPS, SBI, RRB) enforce both a floor limit and a ceiling limit: the file must be strictly between 50 KB and 100 KB. Ordinary photo resizers often compress images down to 30KB or leave them above 120KB. Kagazo uses an intelligent padding and compression engine to guarantee your image is locked between 50KB and 100KB.',
  },
  {
    question: 'Can I write the declaration in CAPITAL / BLOCK letters?',
    answer:
      'NO! The official notification explicitly states: "The applicant has to write the declaration in English clearly in their running handwriting; if it is written and uploaded by anybody else or in CAPITAL LETTERS, it will be considered invalid and rejected."',
  },
  {
    question: 'How does Kagazo remove notebook ruled lines?',
    answer:
      'Our intelligent client-side canvas algorithm analyzes color channel differentials. Because notebook ruling lines consist of cyan/light-blue inks while candidate writing is black or dark, the filter neutralizes the blue frequency and normalizes paper luminance to 255 pure white without touching your handwritten strokes.',
  },
  {
    question: 'Is my handwritten biometric signature or declaration uploaded to any server?',
    answer:
      'Never. All processing happens entirely inside your local device RAM. Your biometric handwriting is never transmitted across the network, saved in cookies, or stored on servers.',
  },
];

export default function HandwrittenDeclarationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Exam Handwritten Declaration Scanner & Resizer',
        url: 'https://Kagazo.in/tools/handwritten-declaration-scanner',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Remove notebook ruling lines and format handwritten self-declarations strictly between 50KB and 100KB for IBPS and SBI exams.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Scan and Resize Handwritten Declaration for IBPS & SBI',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select Exam Notification Preset',
            text: 'Choose IBPS PO/Clerk, SBI, or Railway RRB preset.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Draw On Screen',
            text: 'Upload a phone snapshot of your handwritten paper or use the touchscreen biometric pad.',
          },
          {
            '@type': 'HowToStep',
            name: 'Remove Ruled Lines & Shadows',
            text: 'Enable AI ruling line removal to eliminate horizontal notebook lines.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 50KB–100KB Compliant JPG',
            text: 'Download the verified image guaranteed to comply with TCS iON upload rules.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold truncate">Handwritten Declaration Scanner</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <PenTool className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Official IBPS &amp; SBI Recruitment 2026 Standards</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Exam Handwritten Declaration Scanner &amp; Resizer
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Purge notebook ruled lines, eliminate room shadows, and strictly lock file size between <strong>50 KB and 100 KB</strong>. Built specifically for IBPS PO, IBPS Clerk, SBI, and Railway recruitment portals.
              </p>
            </div>

            {/* Privacy Guarantee */}
            <div className="flex items-center gap-3 p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-xs text-indigo-950 dark:text-indigo-200 font-medium">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>
                <strong>Zero-Upload Privacy:</strong> Your biometric handwriting never touches any cloud server. All binarization, ruled-line elimination, and compression happen 100% inside your browser memory.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <HandwrittenDeclarationEngine />

            {/* Crucial Notification Rules Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-foreground">
                    Crucial IBPS &amp; SBI Declaration Guidelines
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
                  Avoid Rejection
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DECLARATION_RULES.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{rule.rule}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                      {rule.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                  >
                    <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                      <span className="text-indigo-600 font-extrabold">Q:</span>
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
            {/* Quick Presets Pillar Card */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>TCS iON Portal Criteria</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Strict 50 KB Minimum</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Images under 50KB throw error: &quot;Declaration size must be between 50KB and 100KB&quot;.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Strict 100 KB Maximum</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Images over 100KB are rejected instantly. Our optimizer locks files at ~75KB.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Aspect Ratio: 2:1 Landscape</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Recommended resolution is 800 × 400 px for optimal portal thumbnail display.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Related Exam Utilities</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/specifications"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    40+ Exam Specifications Radar
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/a4-multi-card-sheet"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-indigo-600" />
                    A4 Multi-Card Gang Sheet
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    Compress PDF to 200KB
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/photo-date-name-stamper"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-indigo-600" />
                    Candidate Name &amp; DOP Stamper
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
