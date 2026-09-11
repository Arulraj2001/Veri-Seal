import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Award,
  HelpCircle,
} from 'lucide-react';
import StampPhotoEngine from '@/components/tools/StampPhotoEngine';

export const metadata: Metadata = {
  title: 'Stamp Size Photo Maker (20x25mm) & NEET Postcard (4x6") | VeriSeal',
  description:
    'Tile 16 to 24 stamp size photos (2x2.5cm) on 4x6" card for railway passes, college forms, or generate 4x6" NTA NEET UG postcard photos with candidate name, roll number, and DOP.',
  alternates: {
    canonical: 'https://veriseal.in/tools/stamp-size-photo-maker',
  },
  openGraph: {
    title: 'Stamp Size & NEET Postcard Photo Maker Online Free | VeriSeal',
    description:
      'Print 16 stamp size photos or 4x6 NEET admit card postcard photos for ₹5 at your local lab.',
    url: 'https://veriseal.in/tools/stamp-size-photo-maker',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is the exact physical size of a Stamp Size photo in India?',
    answer:
      'The official physical dimension of a stamp-size photograph in India is 2.0 cm × 2.5 cm (20 mm × 25 mm). It is widely required for railway monthly season tickets (MST), state transport bus passes, school student IDs, and library cards.',
  },
  {
    question: 'How many stamp size photos fit on a single 4x6" photo card?',
    answer:
      'Up to 16 stamp photos (4 columns × 4 rows) fit easily on standard 4×6" (4R) photo paper with comfortable scissor cutting margins. Printing this sheet at any photo lab costs only ₹5 to ₹10.',
  },
  {
    question: 'What is the NTA NEET UG Postcard photo rule?',
    answer:
      'The National Testing Agency (NTA) mandates that NEET UG aspirants carry a 4" × 6" (10 × 15 cm) color postcard-sized photograph with white background, candidate name, application/roll number, and date of photo printed at the bottom for examination hall physical verification.',
  },
];

export default function StampSizePhotoPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'VeriSeal Stamp Size & NEET Postcard Photo Maker',
            url: 'https://veriseal.in/tools/stamp-size-photo-maker',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools Directory
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Stamp Size &amp; NEET Postcard Maker</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>20×25mm Stamp &amp; 4×6" NEET Postcard • 300 DPI Lab Print • 100% Free</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Stamp Size &amp; NEET Postcard Photo Studio
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            Generate 16 stamp-size photos (2.0×2.5cm) on a 4×6" sheet for college IDs and railway passes, or format 4×6" NTA NEET UG admit card postcards in 1 click.
          </p>
        </div>

        <StampPhotoEngine />

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
