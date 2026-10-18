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
  Sliders,
  Sparkles,
  Info,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';

export const metadata: Metadata = {
  title: 'Photo & Signature Compressor to 20KB (போட்டோ 20KB குறைப்பான்) — TNPSC, SSC Free | Kagazo',
  description:
    'Compress photo and signature to strictly 10KB–20KB online free for TNPSC, SSC & govt exams. TNPSC மற்றும் அரசு தேர்வுகளுக்கான போட்டோ, கையொப்பம் 20KB அளவுக்கு உடனே மாற்றவும். 100% Free.',
  keywords: [
    'photo compressor to 20kb',
    'photo size reducer 20kb',
    'signature resize 10 to 20 kb',
    '20 kb photo size',
    'tnpsc photo size eppadi mathurathu',
    'signature size kuraippathu eppadi',
    'tnpsc signature less than 10kb error fix tamil',
    'signature compress 20kb',
    'ssc signature 10 to 20 kb tamil',
    'upsc signature 20kb resizer',
    'போட்டோ 20kb',
    'கையொப்பம் அளவு குறைப்பான்',
  ],
  alternates: {
    canonical: `${SITE_URL}/ta/tools/compress-image-to-20kb`,
    languages: {
      'ta-IN': `${SITE_URL}/ta/tools/compress-image-to-20kb`,
      'en': `${SITE_URL}/tools/compress-image-to-20kb`,
      'x-default': `${SITE_URL}/tools/compress-image-to-20kb`,
    },
  },
  openGraph: {
    title: 'புகைப்படம் & கையொப்பம் 20KB வரை குறைப்பான் (10–20 KB) | காகஸோ',
    description:
      'அரசு தேர்வு இணையதளங்களில் நிராகரிக்கப்படாத வகையில் துல்லியமாக 10 KB முதல் 20 KB-க்குள் புகைப்படம் மற்றும் கையொப்பத்தை மாற்றும் தமிழ் கருவி.',
    url: `${SITE_URL}/ta/tools/compress-image-to-20kb`,
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
    type: 'website',
  },
};

const PRESETS_20KB: CustomPreset[] = [
  {
    id: 'signature',
    label: 'கையொப்பம் (10-20KB)',
    minKb: 10,
    maxKb: 20,
    widthCm: 4.0,
    heightCm: 2.0,
    isXerox: true,
  },
  {
    id: 'photo',
    label: 'சிறு புகைப்படம் (15-20KB)',
    minKb: 15,
    maxKb: 20,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'thumb',
    label: 'கைரேகை (10-20KB)',
    minKb: 10,
    maxKb: 20,
    isXerox: true,
  },
];

const FAQS_20KB = [
  {
    question: 'TNPSC photo size eppadi mathurathu? Signature size kuraippathu eppadi?',
    answer:
      'TNPSC OTR போர்ட்டலில் கையொப்பம் 10KB முதல் 20KB வரை மட்டுமே அனுமதிக்கப்படும். காகஸோவில் உங்கள் மொபைல் கையொப்பப் படத்தை பதிவேற்றி "கையொப்பம் (10-20KB)" பிரிசெட்டைத் தேர்ந்தெடுக்கவும். உங்கள் படம் தானாக 12 முதல் 18 KB அளவுக்குள் துல்லியமாக சுருக்கப்படும்.',
  },
  {
    question: 'TNPSC signature less than 10kb error fix tamil: எதனால் இந்த பிழை வருகிறது?',
    answer:
      'சாதாரண ஆன்லைன் கம்ப்ரசர்கள் அல்லது வாட்ஸ்அப் வழியாக அனுப்பப்படும் படங்கள் 4 முதல் 8 KB ஆக அளவுக்கு அதிகமாக சுருங்கிவிடும். இதனால் போர்ட்டல் "File size less than 10 KB" என நிராகரிக்கும். காகஸோ இரண்டு வழிகளிலும் அளவீடு செய்து சரியாக 10–20 KB எல்லைக்குள் நிலைநிறுத்துகிறது.',
  },
  {
    question: '20 KB அளவிற்கு சுருக்கும்போது கையொப்பம் தெளிவாகத் தெரியுமா?',
    answer:
      'ஆம். காகஸோ மென்பொருள் பேப்பரின் பின்னணியை சுத்தமான வெள்ளை நிறமாகவும் (#FFFFFF), மை எழுத்துக்களை அடர் நிறமாகவும் மாற்றி தெளிவான ஹை-கான்ட்ராஸ்ட் வெளியீட்டை வழங்குகிறது.',
  },
  {
    question: 'எந்தெந்த தேர்வுகளுக்கு 10-20 KB கையொப்பம் தேவைப்படுகிறது?',
    answer:
      'TNPSC (குரூப் 1, 2, 4 OTR), UPSC (Civil Services), SSC (CGL, CHSL, MTS), IBPS வங்கி தேர்வுகள் மற்றும் தமிழ்நாடு காவல்துறை (TNUSRB SI & Constable) விண்ணப்பங்களுக்கு 10-20 KB கையொப்பம் கட்டாயமாகும்.',
  },
  {
    question: 'மொபைல் போனில் எடுத்த கையொப்பத்தை இதில் மாற்ற முடியுமா?',
    answer:
      'தாராளமாக மாற்றலாம். வெள்ளைத்தாளில் நீல அல்லது கருப்பு மையினால் கையொப்பமிட்டு மொபைல் கேமராவில் படம் பிடித்து இதில் பதிவேற்றினால், அதுவே கிராப் செய்து தேவையான அளவிற்கு மாற்றிக் கொடுக்கும்.',
  },
];

export default function CompressImageTo20kbTamilPage() {
  const structuredData = buildToolStructuredData({
    name: 'புகைப்படம் & கையொப்பம் 20KB அளவு குறைப்பான் (10–20 KB)',
    description:
      'TNPSC, SSC, UPSC அரசு தேர்வுகளுக்கான கையொப்பம் மற்றும் புகைப்படங்களை துல்லியமாக 10 KB முதல் 20 KB-க்குள் இலவசமாக மாற்றும் தமிழ் இணையக் கருவி.',
    url: `${SITE_URL}/ta/tools/compress-image-to-20kb`,
    howToTitle: 'கையொப்பம் மற்றும் புகைப்படத்தை 10-20 KB-க்குள் சுருக்குவது எப்படி?',
    howToDescription:
      '3 எளிய படிகளில் தர இழப்பின்றி 10-20 KB அளவுக்கு மாற்றுங்கள்.',
    howToSteps: [
      {
        step: 1,
        title: 'படத்தை தேர்ந்தெடுக்கவும்',
        desc: 'உங்கள் மொபைல் அல்லது கணினியிலிருந்து கையொப்பப் படத்தை பதிவேற்றவும்.',
      },
      {
        step: 2,
        title: '10–20 KB பிரிசெட்டை தேர்வு செய்யவும்',
        desc: 'கையொப்பம் (10-20KB) பிரிசெட்டை தேர்வு செய்து தேவைப்பட்டால் கிராப் செய்யவும்.',
      },
      {
        step: 3,
        title: 'பதிவிறக்கவும்',
        desc: 'நொடிகளில் சரியான அளவில் தரவிறக்கம் செய்து நேரடியாக அரசு தளத்தில் பதிவேற்றலாம்.',
      },
    ],
    faqs: FAQS_20KB,
    breadcrumbs: [
      { name: 'முகப்பு', url: `${SITE_URL}/ta` },
      { name: 'கருவிகள்', url: `${SITE_URL}/ta/tools` },
      { name: '20KB குறைப்பான்', url: `${SITE_URL}/ta/tools/compress-image-to-20kb` },
    ],
  });

  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <JsonLd data={structuredData} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/ta" className="hover:text-primary transition-colors">முகப்பு</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/ta/tools" className="hover:text-primary transition-colors">கருவிகள்</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-bold">20KB குறைப்பான்</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>துல்லியமான 10 KB – 20 KB தானியங்கி அளவு</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight">
            புகைப்படம் &amp; கையொப்பம் <span className="text-primary">20KB அளவு குறைப்பான்</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
            அரசு வேலை விண்ணப்பங்களுக்காக பிரத்யேகமாக வடிவமைக்கப்பட்டது. 10KB-க்கு குறைவாகவோ அல்லது 20KB-க்கு அதிகமாகவோ போகாமல் துல்லியமாக மாற்றும்.
          </p>
        </div>

        {/* GEO Rule of 45 Words Answer Capsule */}
        <AnswerCapsule
          lang="ta"
          title="டிஜிட்டல் உடனடி சுருக்கம்: கையொப்பம் 10–20 KB அளவு குறைப்பது எப்படி?"
          badge="அரசு தேர்வு நேரடி விடை"
          portal="TNPSC OTR & SSC CGL / CHSL"
          officialSourceName="TNPSC OTR Guidelines 2026"
          officialSourceUrl="https://apply.tnpscexams.in"
          answer="TNPSC OTR மற்றும் SSC தேர்வுகளுக்கு கையொப்பத்தின் அளவு துல்லியமாக 10 KB முதல் 20 KB வரை (பரிமாணம்: 6.0×2.0 cm அல்லது 4.0×2.0 cm) இருக்க வேண்டும். காகஸோ உங்கள் மொபைல் கையொப்பத்தை வாட்டர்மார்க் மற்றும் தர இழப்பின்றி, சுத்தமான வெள்ளை பின்னணியுடன் உங்கள் பிரவுசரிலேயே 15 KB-ல் நொடிகளில் இலவசமாக மாற்றித் தருகிறது."
        />

        {/* Interactive Engine (Top 30%) */}
        <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-8">
          <ImageResizerEngine
            initialMode="signature"
            examName="TNPSC / SSC / UPSC"
            customPresets={PRESETS_20KB}
          />
        </div>

        {/* AdSlot */}
        <AdSlot slot="in_content" />

        {/* Editorial Content (Bottom 70%) */}
        <div className="space-y-10">
          {/* Requirements Table */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              அரசு தேர்வு வாரியங்களின் 10–20 KB தேவைகள்
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                    <th className="py-3 px-3">தேர்வு வாரியம்</th>
                    <th className="py-3 px-3">ஆவண வகை</th>
                    <th className="py-3 px-3">அனுமதிக்கப்பட்ட அளவு</th>
                    <th className="py-3 px-3">பரிமாணங்கள்</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-darker text-text-main/80">
                  <tr>
                    <td className="py-3 px-3 font-semibold">TNPSC (Group 1, 2, 4 OTR)</td>
                    <td className="py-3 px-3">கையொப்பம் (Signature)</td>
                    <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB</td>
                    <td className="py-3 px-3 text-emerald-700">6.0 cm × 2.0 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">SSC (CGL, CHSL, MTS)</td>
                    <td className="py-3 px-3">கையொப்பம்</td>
                    <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB</td>
                    <td className="py-3 px-3 text-emerald-700">4.0 cm × 2.0 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">UPSC (Civil Services)</td>
                    <td className="py-3 px-3">கையொப்பம் &amp; சிறு புகைப்படம்</td>
                    <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB</td>
                    <td className="py-3 px-3 text-emerald-700">350 × 350 px</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">IBPS வங்கி தேர்வுகள்</td>
                    <td className="py-3 px-3">கையொப்பம் &amp; இடது கைரேகை</td>
                    <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB</td>
                    <td className="py-3 px-3 text-emerald-700">140 × 60 px</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to use */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              பயன்படுத்துவது எப்படி? (3 எளிய படிகள்)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-2">1</div>
                <h3 className="text-xs font-bold text-text-main">படத்தை தேர்ந்தெடுக்கவும்</h3>
                <p className="text-xs text-text-main/70">உங்கள் மொபைல் அல்லது கணினியிலிருந்து கையொப்பப் படத்தை பதிவேற்றவும்.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-2">2</div>
                <h3 className="text-xs font-bold text-text-main">அளவை தேர்வு செய்யவும்</h3>
                <p className="text-xs text-text-main/70">10-20KB பிரிசெட்டை தேர்வு செய்து தேவைப்பட்டால் கிராப் செய்யவும்.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-2">3</div>
                <h3 className="text-xs font-bold text-text-main">பதிவிறக்கவும்</h3>
                <p className="text-xs text-text-main/70">நொடிகளில் சரியான அளவில் தரவிறக்கம் செய்து நேரடியாக அரசு தளத்தில் பதிவேற்றலாம்.</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs &amp; பிழை திருத்தங்கள்)
              </h2>
            </div>
            <div className="divide-y divide-surface-darker">
              {FAQS_20KB.map((faq, idx) => (
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
