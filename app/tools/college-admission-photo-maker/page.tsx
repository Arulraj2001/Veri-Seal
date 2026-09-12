import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Camera,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Scissors,
  Printer,
} from 'lucide-react';
import CollegePhotoStudioEngine from '@/components/tools/CollegePhotoStudioEngine';

export const metadata: Metadata = {
  title: 'College Admission & Exam Photo Sheet Studio | 4x6" & A4 Prints',
  description:
    'Generate 4x6" (8 photos), Combo (Passport + Stamp size), or A4 30-copy photo sheets online free. Studio white background normalizer, candidate name & DOP strip, and dashed cut guides at 300 DPI for college admissions and exams.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/college-admission-photo-maker',
  },
  openGraph: {
    title: 'College Admission & Exam Photo Sheet Studio | Kagazo',
    description:
      'Turn 1 selfie into a 4x6" 8-photo sheet or combo passport + stamp sheet. Print at any studio for ₹5 instead of ₹120.',
    url: 'https://Kagazo.in/tools/college-admission-photo-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How does this tool save me ₹100+ compared to photo studios?',
    answer:
      'Traditional photo studios charge ₹100 to ₹150 for 8 passport photos. With Kagazo, you upload 1 smartphone photo, customize your name/DOP banner, download a high-resolution 300 DPI 4x6" sheet, and print it at any local color printer or studio as a standard 4x6" photo print for only ₹5 to ₹10!',
  },
  {
    question: 'What is a "Combo Sheet"?',
    answer:
      'College freshmen and exam aspirants need both 3.5×4.5cm Passport Photos (for application forms and identity cards) and 2.0×2.5cm Stamp Size Photos (for bus passes, library tickets, and laboratory record books). Our Combo Sheet layout neatly arranges 6 Passport photos and 5 Stamp size photos on a single 4x6" card.',
  },
  {
    question: 'Can I change the background to Studio White or Light Blue?',
    answer:
      'Yes! Choose between Studio Crisp White, Clean Light Blue, or Off-White to match your specific college or examination portal background specification.',
  },
  {
    question: 'Are there cut guide lines for easy cutting?',
    answer:
      'Yes. When enabled, Kagazo renders subtle 0.5pt dashed scissors cut lines between photos so you can slice them cleanly with a pair of scissors or paper cutter.',
  },
];

export default function CollegePhotoMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'College Admission & Exam Photo Sheet Studio',
    url: 'https://Kagazo.in/tools/college-admission-photo-maker',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Generate 4x6 inch (8 photos), Combo (Passport + Stamp size), or A4 sheets at 300 DPI for college admissions and government exams.',
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
          <span className="text-primary font-bold">College Photo Studio</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-fuchsia-50 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
            <span>300 DPI Photo Lab • 4x6&quot; &amp; A4 Sheets • Save ₹120</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            College Admission &amp; Exam Photo Sheet Studio
          </h1>

          <p className="text-sm sm:text-base text-text-main/70 leading-relaxed max-w-2xl mx-auto">
            Convert 1 smartphone selfie into a professional 4x6&quot; (8 photos), Combo (Passport + Stamp size), or A4 sheet with customizable Name &amp; Date banner and cut guidelines.
          </p>
        </div>

        {/* Engine */}
        <CollegePhotoStudioEngine />

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
              <p className="text-xs text-text-main/60">
                Tips on printing passport and stamp size photos cost-effectively
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
