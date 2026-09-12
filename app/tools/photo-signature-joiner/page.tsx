import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import PhotoSignatureJoinerEngine from '@/components/tools/PhotoSignatureJoinerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Combined Photo & Signature Slip Maker | MP PEB, UPSSSC, Kerala PSC',
  description:
    'Join Passport Photo, Signature, and Declaration into a single official application slip for MP PEB / Vyapam (400x500px, <100KB), UPSSSC, Rajasthan RSMSSB, and Kerala PSC with Name & Date (DOP) strips. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/photo-signature-joiner',
  },
  openGraph: {
    title: 'Free Combined Photo & Signature Slip Maker | Kagazo',
    description:
      'Combine passport photo and signature into a single image slip for MP Vyapam, UPSSSC, and state recruitment portals.',
    url: 'https://Kagazo.in/tools/photo-signature-joiner',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Which exams require a combined single photo and signature slip?',
    answer:
      'Madhya Pradesh Professional Examination Board (MP PEB / Vyapam), Uttar Pradesh Subordinate Services (UPSSSC), Rajasthan RSMSSB, and Kerala PSC require a single composite image file containing candidate photo, signature, and in some cases handwritten declaration text.',
  },
  {
    question: 'What are the exact dimensions for MP PEB (Vyapam) template slips?',
    answer:
      'MP PEB specifies an image width of 400 pixels and height of 500 pixels strictly under 100 KB in JPEG format. The top section holds the photograph, the middle holds the signature, and the bottom holds the handwritten self-declaration.',
  },
  {
    question: 'Can I add my Name and Date of Photo (DOP) on the slip?',
    answer:
      'Yes! You can enter your candidate name and date of photo in the text fields, and our engine automatically stamps an official white banner strip directly below your photo.',
  },
  {
    question: 'Is my photo or signature stored on your server?',
    answer:
      'No. The composition, scaling, and compression occur strictly inside temporary computer memory (RAM) and are deleted immediately upon completion.',
  },
];

export default function PhotoSignatureJoinerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Combined Photo & Signature Slip Maker',
        url: 'https://Kagazo.in/tools/photo-signature-joiner',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Join passport photo and signature into a single composite slip for MP PEB, UPSSSC, and Kerala PSC.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Combine Photo and Signature into Single Box for MP PEB and UPSSSC',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Photo & Signature',
            text: 'Upload your passport photo in slot 1 and signature in slot 2.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Exam Preset',
            text: 'Choose MP PEB (400x500px), UPSSSC (350x500px), or Kerala PSC.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Composite Slip',
            text: 'Click Create Combined Slip and download your verified JPEG.',
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
          <span className="text-primary font-bold truncate">Photo & Signature Slip Maker</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>MP Vyapam, UPSSSC & Kerala PSC Layout</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Combined Photo & Signature Slip Maker
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Combine your passport photo, signature, and optional handwritten declaration into a single official template box for MP PEB / Vyapam (400×500 px, &lt;100KB), UPSSSC, and Kerala PSC with Name & Date of Photo (DOP) strips.
              </p>
            </div>

            {/* In-Memory Privacy */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-Memory RAM Privacy:</strong> Your photos and signatures are assembled exclusively in computer RAM memory. Zero images are saved or archived on our servers.
              </span>
            </div>

            {/* Core Tool Engine */}
            <PhotoSignatureJoinerEngine />

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
                <span>Supported State Exam Formats</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">MP PEB / Vyapam (ESB MP)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">400 × 500 px • &lt; 100 KB • Photo + Sign + Declaration</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">UPSSSC PET & Lekhpal</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">350 × 500 px • &lt; 50 KB • Name under signature</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Kerala PSC Thulasi Profile</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">300 × 400 px • &lt; 40 KB • Name & Date under photo</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Related Exam Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/signature-cleaner-extractor"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>Black Ink Signature Extractor</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>Passport Photo Sheet Maker</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/tools/thumb-impression-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>Left Thumb Impression Enhancer</span>
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
