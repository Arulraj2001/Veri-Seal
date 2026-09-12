import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Award,
  HelpCircle,
  Scissors,
  CheckCircle2,
  Sparkles,
  Camera,
  Shirt,
} from 'lucide-react';
import FormalAttireEngine from '@/components/tools/FormalAttireEngine';

export const metadata: Metadata = {
  title: 'Instant Formal Suit & Blazer Changer for Passport Photo | Kagazo',
  description:
    'Change casual clothes into formal dark blazers, suits, neckties, and collared shirts online free for passport photos and exam forms. Zero Photoshop skills required.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/formal-attire-changer',
  },
  openGraph: {
    title: 'Formal Suit & Attire Changer for Passport Photo Online | Kagazo',
    description:
      'Add formal dark suits, blazers, and ties to casual selfies for UPSC, SSC, and Passport applications in 1 click.',
    url: 'https://Kagazo.in/tools/formal-attire-changer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do government exams and passport offices prefer formal attire?',
    answer:
      'Official guidelines from SSC, UPSC, IBPS, and the Ministry of External Affairs mandate that passport and admit card photographs have clear contrast against the background with professional presentation. Round-neck T-shirts and hooded sweatshirts are frequently flagged during document verification (DV).',
  },
  {
    question: 'How does Kagazo fit the suit over my casual clothes?',
    answer:
      'Kagazo uses an interactive vector-snapping canvas that accurately positions realistic formal suit lapels, necklines, and ties over your neck and shoulders. You can fine-tune the neckline position, scale, and horizontal centering in real-time.',
  },
  {
    question: 'Are my private photos stored or uploaded to any server?',
    answer:
      'No. The suit fitting, positioning, and 300 DPI image rendering are executed 100% inside your browser’s local RAM memory using HTML5 Canvas. Your photos never leave your device.',
  },
  {
    question: 'Can I print this photo as a 4x6" passport photo sheet?',
    answer:
      'Yes! After downloading your formal passport photo, open our free "Cyber Cafe Passport Photo Sheet Maker" to tile 8 copies onto a 4x6" card for a ₹5 local print.',
  },
];

export default function FormalAttireChangerPage() {
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
            name: 'Kagazo Formal Suit & Attire Changer',
            url: 'https://Kagazo.in/tools/formal-attire-changer',
            applicationCategory: 'PhotoEditorApplication',
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
          <span className="text-primary font-bold">Formal Attire &amp; Suit Changer</span>
        </nav>

        {/* Page Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Studio Pro Tool • Zero Photoshop • 100% Free Forever</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Instant Formal Suit &amp; Attire Changer for Passport Photos
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            Took a selfie in a T-shirt? No problem. Instantly overlay men’s dark suits with ties or women’s executive blazers over your neckline without expensive Photoshop software.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Men &amp; Women Formal Styles</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Navy blue suits with silk ties, charcoal black blazers, and sky blue office collared shirts.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Exact 35×45mm @ 300 DPI</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Pre-calibrated to official Indian Passport Seva, UPSC CSE, SSC CGL, and IBPS specifications.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">100% In-Browser Privacy</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Photos are rendered strictly in local browser RAM. No servers, no signups, no watermarks.
              </p>
            </div>
          </div>
        </div>

        {/* Master Interactive Engine */}
        <FormalAttireEngine />

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
