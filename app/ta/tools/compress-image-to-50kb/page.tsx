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

export const metadata: Metadata = {
  title: 'புகைப்படம் 50KB வரை குறைப்பான் | 20-50 KB பாஸ்போர்ட் போட்டோ | காகஸோ',
  description:
    'TNPSC, TNEB, தமிழ்நாடு e-Sevai மற்றும் அரசு தேர்வுகளுக்கான பாஸ்போர்ட் அளவிலான புகைப்படங்களை 20 KB முதல் 50 KB வரை தரம் குறையாமல் ஆன்லைனில் இலவசமாக அமுக்கவும்.',
  alternates: {
    canonical: `${SITE_URL}/ta/tools/compress-image-to-50kb`,
    languages: {
      'ta-IN': `${SITE_URL}/ta/tools/compress-image-to-50kb`,
      'en': `${SITE_URL}/tools/compress-image-to-50kb`,
      'x-default': `${SITE_URL}/tools/compress-image-to-50kb`,
    },
  },
  openGraph: {
    title: 'புகைப்படம் 50KB வரை குறைப்பான் (20–50 KB) | காகஸோ',
    description:
      'TNEB, e-Sevai மற்றும் TNPSC விண்ணப்பங்களுக்கான பாஸ்போர்ட் புகைப்படங்களை 20KB முதல் 50KB வரை மாற்றும் தமிழ் இணையக் கருவி.',
    url: `${SITE_URL}/ta/tools/compress-image-to-50kb`,
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
    type: 'website',
  },
};

const PRESETS_50KB: CustomPreset[] = [
  {
    id: 'photo',
    label: 'பாஸ்போர்ட் புகைப்படம் (20-50KB)',
    minKb: 20,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'tneb_esevai',
    label: 'TNEB / e-Sevai புகைப்படம் (30-50KB)',
    minKb: 30,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
];

const FAQS_50KB = [
  {
    question: 'மொபைல் கேமராவில் எடுத்த பெரிய படத்தை 50 KB-க்குள் கொண்டுவர முடியுமா?',
    answer:
      'நிச்சயமாக. உங்கள் மொபைல் போனில் எடுக்கப்பட்ட 5MB அல்லது 10MB அளவிலான பெரிய புகைப்படங்களையும், முகம் மங்கலாகாமல் (Blur ஆகாமல்) தெளிவாக 20KB முதல் 50KB-க்குள் காகஸோ சுருக்கித் தரும்.',
  },
  {
    question: 'TNEB மற்றும் e-Sevai போர்ட்டல்களில் 50 KB புகைப்படம் எதற்காக கேட்கப்படுகிறது?',
    answer:
      'புதிய மின் இணைப்பு, மின் கட்டண பெயர் மாற்றம், சாதி சான்றிதழ், இருப்பிட சான்றிதழ் மற்றும் வருமான சான்றிதழ் போன்ற அரசு இணையதளங்களில் 50 KB-க்கு அதிகமான கோப்புகளை பதிவேற்ற முடியாது.',
  },
  {
    question: 'புகைப்படத்தை மாற்றும்போது அதன் பரிமாணங்கள் (Dimensions) மாறுமா?',
    answer:
      'இல்லை. அதிகாரப்பூர்வ 3.5 × 4.5 செ.மீ (பாஸ்போர்ட் அளவு) விகிதம் மாற்றப்படாமல் சரியாக பாதுகாக்கப்படுகிறது.',
  },
];

export default function CompressImageTo50kbTamilPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_50KB.map((f) => ({
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
          <span className="text-text-main font-bold">50KB குறைப்பான்</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>20 KB – 50 KB பாஸ்போர்ட் போட்டோ அளவு</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight">
            புகைப்படம் <span className="text-primary">50KB வரை குறைப்பான்</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
            TNEB, e-Sevai, TNPSC, SSC போன்ற அனைத்து அரசு மற்றும் தேர்வு இணையதளங்களுக்காகவும் தரம் குறையாமல் 50KB-க்குள் மாற்றும் ஆன்லைன் கருவி.
          </p>
        </div>

        {/* Interactive Engine (Top 30%) */}
        <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-8">
          <ImageResizerEngine
            initialMode="photo"
            examName="TNEB / TNPSC / e-Sevai"
            customPresets={PRESETS_50KB}
          />
        </div>

        {/* AdSlot */}
        <AdSlot slot="in_content" />

        {/* Requirements & FAQs (Bottom 70%) */}
        <div className="space-y-10">
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              50 KB வரை அனுமதிக்கும் முக்கிய அரசு சேவைகள்
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1">
                <h3 className="text-xs font-bold text-text-main">TNEB மின் இணைப்பு &amp; பெயர் மாற்றம்</h3>
                <p className="text-xs text-text-main/70">விண்ணப்பதாரர் புகைப்படம் அதிகபட்சம் 50 KB-க்குள் இருக்க வேண்டும்.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1">
                <h3 className="text-xs font-bold text-text-main">TN e-Sevai சான்றிதழ்கள்</h3>
                <p className="text-xs text-text-main/70">சாதி, வருமானம், பிறப்பு சான்றிதழ் விண்ணப்பங்களுக்கான போட்டோ.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1">
                <h3 className="text-xs font-bold text-text-main">TNPSC குரூப் 1, 2, 4 OTR</h3>
                <p className="text-xs text-text-main/70">20 KB முதல் 50 KB-க்குள் பெயர் மற்றும் தேதியுடன் கூடிய புகைப்படம்.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1">
                <h3 className="text-xs font-bold text-text-main">SSC &amp; மத்திய அரசு தேர்வுகள்</h3>
                <p className="text-xs text-text-main/70">CGL, CHSL, MTS தேர்வுகளுக்கான பாஸ்போர்ட் புகைப்படம்.</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                அடிக்கடி கேட்கப்படும் கேள்விகள் (50 KB போட்டோ)
              </h2>
            </div>
            <div className="divide-y divide-surface-darker">
              {FAQS_50KB.map((faq, idx) => (
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
