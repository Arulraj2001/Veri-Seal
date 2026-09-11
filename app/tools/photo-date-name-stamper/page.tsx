import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Calendar,
  Award,
  HelpCircle,
} from 'lucide-react';
import PhotoDateNameEngine from '@/components/tools/PhotoDateNameEngine';

export const metadata: Metadata = {
  title: 'Exam Photo Name & Date (DOP) Stamper Online Free | VeriSeal',
  description:
    'Add Candidate Name and Date of Photograph (DOP) on passport photos for SSC CGL, CHSL, MTS, UPSC Civil Services, and State Police recruitment portals with 90-day validity verification.',
  alternates: {
    canonical: 'https://veriseal.in/tools/photo-date-name-stamper',
  },
  openGraph: {
    title: 'Exam Photo Name & Date (DOP) Stamper | VeriSeal',
    description:
      'Online tool to print candidate name and photo date strip on passport photos for SSC and UPSC exams.',
    url: 'https://veriseal.in/tools/photo-date-name-stamper',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do SSC and UPSC require the Date of Photo (DOP) printed?',
    answer:
      'Recruitment boards mandate printed dates to ensure candidates upload recent photographs taken within 3 months (90 days) of the exam notification. Applications with missing dates or photos older than 90 days are summarily rejected during initial scrutiny.',
  },
  {
    question: 'Will the bottom name strip cover my chin or face?',
    answer:
      'No. Our tool provides interactive vertical pan and zoom sliders that allow you to adjust your face upward so the white banner sits neatly beneath your chin and collar without touching your facial features.',
  },
  {
    question: 'Can I choose between "DOP: DD.MM.YYYY" or just the date?',
    answer:
      'Yes! You can toggle between "DOP: Date", "DATE: Date", or just the raw date digits, and switch between a clean white background strip or high-contrast dark strip.',
  },
  {
    question: 'What is the standard photo size for SSC CGL and UPSC CSE?',
    answer:
      'The standard size is 3.5 cm width by 4.5 cm height (350×450 pixels or 413×531 pixels at 300 DPI) with file size strictly between 20 KB and 50 KB.',
  },
];

export default function PhotoDateNameStamperPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'VeriSeal Exam Photo Name & Date Stamper',
            url: 'https://veriseal.in/tools/photo-date-name-stamper',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools Directory
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Exam Photo Name &amp; Date Stamper</span>
        </nav>

        {/* Page Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Official SSC &amp; UPSC Standard • 90-Day Verification • 100% Free</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Exam Photo Name &amp; Date of Photo (DOP) Stamper
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            Avoid application rejection on SSC CGL, CHSL, MTS, and UPSC portals. Stamp your full candidate name and photo capture date onto a crisp bottom strip in 1 click without Photoshop.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">90-Day Validity Checker</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Real-time indicator checks if your photo date complies with the 3-month exam rule.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Zero Chin Coverage</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Vertical position slider ensures the strip never obscures your chin or collar.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">In-RAM Browser Privacy</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Zero server uploads. Your photo and name are processed strictly inside your browser memory.
              </p>
            </div>
          </div>
        </div>

        {/* Master Interactive Engine */}
        <PhotoDateNameEngine />

        {/* FAQs */}
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-foreground text-sm flex items-start gap-2">
                  <span className="text-emerald-600 font-extrabold">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed pl-5">
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
