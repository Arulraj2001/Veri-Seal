import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Award,
  HelpCircle,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import BiometricFaceEngine from '@/components/tools/BiometricFaceEngine';

export const metadata: Metadata = {
  title: 'ICAO Biometric Passport Face & Head Aligner Online | VeriSeal',
  description:
    'Align face and head height strictly within 70%–80% biometric boundary for Indian Passport Seva, US Visa (DS-160), and Schengen visas. Prevents embassy photo rejections.',
  alternates: {
    canonical: 'https://veriseal.in/tools/biometric-face-aligner',
  },
  openGraph: {
    title: 'Biometric Passport Face Aligner (70-80% Head Rule) | VeriSeal',
    description:
      'Ensure your passport and visa photo complies with ICAO 9303 biometric head height and eye-line guidelines.',
    url: 'https://veriseal.in/tools/biometric-face-aligner',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is the ICAO 70%–80% biometric head height rule?',
    answer:
      'According to the International Civil Aviation Organization (ICAO Doc 9303) and Indian Passport Seva, the distance from the bottom of the chin to the top of the head (crown) must occupy between 70% and 80% of the total photograph height (typically 32mm to 36mm on a 45mm photo).',
  },
  {
    question: 'Why are photos without biometric alignment rejected by US Visa & Schengen consulates?',
    answer:
      'Automated facial recognition systems at immigration e-gates require precise eye coordinates and facial geometry. Photos taken too far away (small face) or too close (cropped hair/chin) will fail machine verification.',
  },
  {
    question: 'Can I fix the tilt in my head?',
    answer:
      'Yes. Our tool includes a Straighten Head Tilt slider that allows you to level your eye baseline horizontally to match the biometric crosshair guidelines.',
  },
  {
    question: 'What background color should I choose for Indian Passport and US Visa?',
    answer:
      'Indian Passport Seva and US Visa (DS-160) both require a plain white or light off-white background with zero patterns, textures, or cast shadows.',
  },
];

export default function BiometricFaceAlignerPage() {
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
            name: 'VeriSeal ICAO Biometric Passport Face Aligner',
            url: 'https://veriseal.in/tools/biometric-face-aligner',
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
          <span className="text-primary font-bold">Biometric Face Aligner</span>
        </nav>

        {/* Page Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>ICAO 9303 Standard • 70%–80% Head Rule • 100% Free Forever</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            ICAO Biometric Passport Face &amp; Head Aligner
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            Eliminate passport and visa rejection risks. Align your facial crown, eye baseline, and chin within the strict 70%–80% biometric box mandated by MEA India, US Embassy, and Schengen consulates.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">70%–80% Face Ratio</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Biometric box overlay ensures crown-to-chin distance meets official international norms.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Multi-Country Presets</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Pre-calibrated for Indian Passport, US Visa 2"×2", Schengen, and PAN Card.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Zero Server Uploads</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Align and export strictly in local browser RAM memory with zero tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Master Interactive Engine */}
        <BiometricFaceEngine />

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
