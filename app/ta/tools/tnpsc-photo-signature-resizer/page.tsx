import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Camera,
  PenTool,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'TNPSC புகைப்படம் & கையொப்பம் அளவு மாற்றி | OTR 2026 போர்ட்டல் | காகஸோ',
  description:
    'TNPSC குரூப் 1, 2, 4, VAO தேர்வுகளுக்கான OTR விதிமுறைப்படி பெயர் மற்றும் தேதியுடன் கூடிய புகைப்படம் (20-50KB) மற்றும் கையொப்பம் (10-20KB) இலவசமாக மாற்றும் தமிழ் இணையக் கருவி.',
  alternates: {
    canonical: `${SITE_URL}/ta/tools/tnpsc-photo-signature-resizer`,
    languages: {
      'ta-IN': `${SITE_URL}/ta/tools/tnpsc-photo-signature-resizer`,
      'en': `${SITE_URL}/tools/tnpsc-photo-signature-resizer`,
      'x-default': `${SITE_URL}/tools/tnpsc-photo-signature-resizer`,
    },
  },
  openGraph: {
    title: 'TNPSC புகைப்படம் & கையொப்பம் அளவு மாற்றி | காகஸோ',
    description:
      'TNPSC OTR போர்ட்டலில் நிராகரிக்கப்படாத வகையில் பெயர் & தேதியுடன் புகைப்படம் மற்றும் கையொப்பத்தை நொடிகளில் மாற்றலாம்.',
    url: `${SITE_URL}/ta/tools/tnpsc-photo-signature-resizer`,
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
    type: 'website',
  },
};

const TNPSC_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'TNPSC புகைப்படம் (20–50 KB, 3.5×4.5 cm, பெயர் & தேதி ஸ்ட்ரிப்)',
    minKb: 20,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'TNPSC கையொப்பம் (10–20 KB, 6.0×2.0 cm)',
    minKb: 10,
    maxKb: 20,
    widthCm: 6.0,
    heightCm: 2.0,
    isXerox: true,
  },
];

const TNPSC_FAQS = [
  {
    question: 'TNPSC தேர்வில் புகைப்படம் நிராகரிக்கப்படாமல் இருக்க என்ன விதிகளை பின்பற்ற வேண்டும்?',
    answer:
      'புகைப்படத்தின் அளவு 20KB முதல் 50KB-க்குள் இருக்க வேண்டும். அதன் அகலம் 3.5 செ.மீ மற்றும் உயரம் 4.5 செ.மீ ஆக இருக்க வேண்டும். மிக முக்கியமாக, புகைப்படத்தின் கீழ் பகுதியில் விண்ணப்பதாரர் பெயர் மற்றும் புகைப்படம் எடுக்கப்பட்ட தேதி (Date of Photograph) வெள்ளை பின்னணியில் தெளிவாக அச்சிடப்பட்டிருக்க வேண்டும்.',
  },
  {
    question: 'TNPSC கையொப்பத்திற்கான சரியான அளவுகள் என்ன?',
    answer:
      'கையொப்பத்தின் அளவு 10KB முதல் 20KB-க்குள் மட்டுமே இருக்க வேண்டும். பரிமாணங்கள் 6.0 செ.மீ அகலம் மற்றும் 2.0 செ.மீ உயரம் இருக்க வேண்டும். கையொப்பம் நீல அல்லது கருப்பு மையினால் வெள்ளை காகிதத்தில் இடப்பட்டிருக்க வேண்டும்.',
  },
  {
    question: 'மொபைலில் எடுத்த படத்தில் பெயர் மற்றும் தேதியை காகஸோ தானாக சேர்க்குமா?',
    answer:
      'ஆம். நமது கருவியில் உங்கள் பெயரை மற்றும் தேதியை உள்ளிட்டால், அதுவே தானாக புகைப்படத்தின் அடியில் அதிகாரப்பூர்வ ஸ்ட்ரிப்பை உருவாக்கி சரியான கேபி அளவில் வழங்கிவிடும்.',
  },
];

export default function TnpscPhotoResizerTamilPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TNPSC_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/ta" className="hover:text-primary transition-colors">முகப்பு</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/ta/tools" className="hover:text-primary transition-colors">கருவிகள்</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-bold">TNPSC ரீசைசர்</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>TNPSC OTR 2026 அதிகாரப்பூர்வ விதிமுறைகள்</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight">
            TNPSC புகைப்படம் &amp; கையொப்பம் <span className="text-primary">அளவு மாற்றி</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
            குரூப் 1, குரூப் 2, குரூப் 4 மற்றும் VAO விண்ணப்பங்களுக்கான புகைப்படம் (20–50KB) மற்றும் கையொப்பம் (10–20KB) உடனடியாக தயார் செய்யவும்.
          </p>
        </div>

        {/* Engine (Top 30%) */}
        <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-8">
          <ImageResizerEngine
            initialMode="photo"
            examName="TNPSC OTR"
            customPresets={TNPSC_PRESETS}
          />
        </div>

        {/* AdSlot */}
        <AdSlot slot="in_content" />

        {/* Requirements & FAQs (Bottom 70%) */}
        <div className="space-y-10">
          {/* Rules Table */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              TNPSC அதிகாரப்பூர்வ பரிமாணங்கள் &amp; அளவுகள்
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                    <th className="py-3 px-3">ஆவணம்</th>
                    <th className="py-3 px-3">அனுமதிக்கப்பட்ட KB</th>
                    <th className="py-3 px-3">பரிமாணம் (செ.மீ)</th>
                    <th className="py-3 px-3">சிறப்பு விதிகள்</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-darker text-text-main/80">
                  <tr>
                    <td className="py-3 px-3 font-semibold">பாஸ்போர்ட் புகைப்படம்</td>
                    <td className="py-3 px-3 font-bold text-primary">20.0 KB – 50.0 KB</td>
                    <td className="py-3 px-3 text-emerald-700">3.5 cm × 4.5 cm</td>
                    <td className="py-3 px-3">பெயர் &amp; புகைப்படம் எடுத்த தேதி கட்டாயம்</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">கையொப்பம் (Signature)</td>
                    <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB</td>
                    <td className="py-3 px-3 text-emerald-700">6.0 cm × 2.0 cm</td>
                    <td className="py-3 px-3">வெள்ளை காகிதத்தில் நீலம்/கருப்பு மை</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Rejection Reasons */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2 text-amber-700">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              விண்ணப்பம் நிராகரிக்கப்படுவதற்கான முக்கிய காரணங்கள்
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                <h3 className="text-xs font-bold text-amber-900">தேதி இல்லாத படம்</h3>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  புகைப்படத்தின் அடியில் பெயர் மற்றும் தேதி (DOP) இல்லையெனில் OTR போர்ட்டலில் விண்ணப்பம் நிராகரிக்கப்படும்.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                <h3 className="text-xs font-bold text-amber-900">10KB-க்கு கீழ் கையொப்பம்</h3>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  கையொப்பம் 9.9 KB ஆக இருந்தாலும் "File size too small" என்று போர்ட்டல் ஏற்காது.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                <h3 className="text-xs font-bold text-amber-900">தவறான பரிமாணம்</h3>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  சென்டிமீட்டர் அளவு மாறினால் அட்மிட் கார்டில் புகைப்படம் சிதைந்து வர வாய்ப்புள்ளது.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                அடிக்கடி கேட்கப்படும் கேள்விகள் (TNPSC OTR)
              </h2>
            </div>
            <div className="divide-y divide-surface-darker">
              {TNPSC_FAQS.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-text-main">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
