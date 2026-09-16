import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Camera,
  PenTool,
  HelpCircle,
  EyeOff,
  Sparkles,
  Calculator,
  Sliders,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'காகஸோ — அரசு ஆவணங்கள் & PDF சரிபார்ப்பு | இலவச இணைய கருவிகள்',
  description:
    'ஆதார் அட்டை, சாதி சான்றிதழ், வருமான சான்றிதழ், டிஜிலாக்கர் PDF டிஜிட்டல் கையொப்ப சரிபார்ப்பு மற்றும் TNPSC, TNEB தேர்வுக்கான புகைப்பட & கையொப்ப அளவு குறைக்கும் இலவச இணையக் கருவிகள். 100% பாதுகாப்பானது.',
  alternates: {
    canonical: `${SITE_URL}/ta`,
    languages: {
      'ta-IN': `${SITE_URL}/ta`,
      'en': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'காகஸோ — அரசு ஆவணங்கள் & PDF சரிபார்ப்பு | இலவச இணைய கருவிகள்',
    description:
      'தமிழ்நாடு மற்றும் மத்திய அரசு தேர்வுகளுக்கான புகைப்பட & கையொப்ப அளவு மாற்றி, ஆதார் மாஸ்கிங், PDF கையொப்ப சரிபார்ப்பு. 100% இலவசம்.',
    url: `${SITE_URL}/ta`,
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
    type: 'website',
  },
};

const FEATURED_TAMIL_TOOLS = [
  {
    title: 'TNPSC புகைப்படம் & கையொப்பம் மாற்றி',
    desc: 'TNPSC OTR விதிமுறைப்படி பெயர் மற்றும் தேதி உள்ள புகைப்படம் (20-50KB) மற்றும் கையொப்பம் (10-20KB) உருவாக்கலாம்.',
    href: '/ta/tools/tnpsc-photo-signature-resizer',
    icon: PenTool,
    badge: 'TNPSC OTR 2026',
  },
  {
    title: 'புகைப்படம் 20KB குறைப்பான்',
    desc: 'ஆன்லைன் விண்ணப்பங்களுக்கான கையொப்பம் மற்றும் புகைப்படங்களை துல்லியமாக 10KB முதல் 20KB வரை மாற்றும் கருவி.',
    href: '/ta/tools/compress-image-to-20kb',
    icon: Sliders,
    badge: '10–20 KB துல்லியம்',
  },
  {
    title: 'புகைப்படம் 50KB குறைப்பான்',
    desc: 'TNEB, e-Sevai மற்றும் அரசு தேர்வுகளுக்கான புகைப்படங்களை தரம் குறையாமல் 20KB முதல் 50KB வரை மாற்றவும்.',
    href: '/ta/tools/compress-image-to-50kb',
    icon: Camera,
    badge: '20–50 KB',
  },
  {
    title: 'ஆதார் அட்டை எண் மறைப்பான் (Mask Aadhaar)',
    desc: 'ஆதார் அட்டையின் முதல் 8 எண்களை மறைத்து, கடைசி 4 எண்களை மட்டும் காட்டும் UIDAI அங்கீகரித்த முறை.',
    href: '/ta/tools/mask-aadhaar',
    icon: EyeOff,
    badge: '100% தனிநபர் பாதுகாப்பு',
  },
  {
    title: 'TNEA கட்-ஆஃப் கால்குலேட்டர்',
    desc: 'அண்ணா பல்கலைக்கழக பொறியியல் கலந்தாய்வுக்கான கணிதம், இயற்பியல், வேதியியல் மதிப்பெண்களை வைத்து 200-க்கு கணக்கிடலாம்.',
    href: '/ta/tools/tnea-cutoff-calculator',
    icon: Calculator,
    badge: 'அண்ணா பல்கலை சூத்திரம்',
  },
  {
    title: 'அரசு PDF டிஜிட்டல் கையொப்ப சரிபார்ப்பு',
    desc: 'மஞ்சள் கேள்விக்குறியை நீக்கி பச்சை நிற டிக் மார்க் கொண்டு வரும் வேகமான டிஜிட்டல் சான்றிதழ் சரிபார்ப்பு.',
    href: '/#upload-zone',
    icon: ShieldCheck,
    badge: 'e-Aadhaar / e-Sevai',
  },
];

const TAMIL_FAQS = [
  {
    q: 'காகஸோ தளத்தில் ஆவணங்களை பதிவேற்றுவது பாதுகாப்பானதா?',
    a: 'ஆம், 100% பாதுகாப்பானது. உங்கள் ஆவணங்கள் எந்த சர்வரிலும் சேமிக்கப்படுவதில்லை. அனைத்தும் உங்கள் பிரவுசரின் மெமரியிலேயே (In-Browser RAM) பிராசஸ் செய்யப்பட்டு உடனடியாக அழிக்கப்படுகிறது.',
  },
  {
    q: 'TNPSC தேர்விற்கு புகைப்படம் மற்றும் கையொப்பத்தின் அளவு என்னவாக இருக்க வேண்டும்?',
    a: 'TNPSC OTR விதிமுறைகளின்படி புகைப்படம் 20KB முதல் 50KB வரையிலும் (3.5 × 4.5 cm அளவிலும், விண்ணப்பதாரர் பெயர் மற்றும் புகைப்படம் எடுத்த தேதியுடன்), கையொப்பம் 10KB முதல் 20KB வரையிலும் (6.0 × 2.0 cm) இருக்க வேண்டும்.',
  },
  {
    q: 'இங்கு கருவிகளைப் பயன்படுத்த கட்டணம் செலுத்த வேண்டுமா அல்லது பதிவு செய்ய வேண்டுமா?',
    a: 'இல்லை. காகஸோவில் உள்ள அனைத்து கருவிகளும் முற்றிலும் இலவசம். எந்தவித பதிவோ (Sign-up) அல்லது கட்டணமோ தேவையில்லை.',
  },
  {
    q: 'மொபைல் போனில் இந்த கருவிகளைப் பயன்படுத்த முடியுமா?',
    a: 'நிச்சயமாக. ஆண்ட்ராய்டு மற்றும் ஐபோன் இரண்டிலும் காகஸோ தளத்தை எந்த செயலியும் (App) தரவிறக்கம் செய்யாமல் நேரடியாகப் பயன்படுத்தலாம்.',
  },
];

export default function TamilHomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TAMIL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>தமிழ்நாடு அரசு &amp; மத்திய அரசு தேர்வு கருவிகள்</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight leading-tight">
            அரசு ஆவணங்கள் &amp; தேர்வுக்கான <span className="text-primary">இலவச இணையக் கருவிகள்</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/75 leading-relaxed">
            TNPSC, SSC, TNEB தேர்வுகளுக்கான புகைப்பட அளவு குறைப்பான், ஆதார் அட்டை மாஸ்கிங் மற்றும் டிஜிட்டல் சான்றிதழ் சரிபார்ப்பு. 100% இலவசம், பதிவேற்றம் இல்லை.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/ta/tools"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-hover transition-all"
            >
              <span>அனைத்து தமிழ் கருவிகள்</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ta/tools/tnpsc-photo-signature-resizer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-surface border border-surface-darker text-text-main font-bold text-sm hover:border-primary/40 transition-all"
            >
              <span>TNPSC ரீசைசர்</span>
            </Link>
          </div>
        </section>

        {/* Ad Placement */}
        <AdSlot slot="in_content" />

        {/* Featured Tools Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-text-main">
              பிரபலமான தமிழ் பயன்பாட்டுக் கருவிகள்
            </h2>
            <p className="text-sm text-text-main/70">
              தமிழ்நாடு மாணவர்களுக்காகவும் பொதுமக்களுக்காகவும் பிரத்யேகமாக வடிவமைக்கப்பட்டது.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {FEATURED_TAMIL_TOOLS.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={idx}
                  href={tool.href}
                  className="p-6 rounded-3xl bg-white border border-surface-darker shadow-card hover:border-primary/40 hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-surface border border-surface-darker text-text-main/70">
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-text-main group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-primary pt-2">
                    <span>பயன்படுத்துக</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Security & Privacy Pillars */}
        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-surface-darker space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>பாதுகாப்பு உத்தரவாதம்</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              உங்கள் ஆவணங்கள் எப்போதும் உங்கள் கையில் மட்டுமே
            </h2>
            <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed">
              காகஸோ எந்த ஒரு பயனர் கோப்பையும் சேமிப்பதோ அல்லது பிறருடன் பகிர்வதோ இல்லை. அனைத்து வேலைகளும் நேரடியாக உங்கள் சாதனத்திலேயே நடைபெறுகிறது.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="font-bold text-xs text-text-main">0% தரவு சேமிப்பு</h4>
              <p className="text-[11px] text-text-main/70">கோப்புகள் பிரவுசரின் மெமரியிலேயே அழிக்கப்படுகின்றன.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="font-bold text-xs text-text-main">வாட்டர்மார்க் இல்லை</h4>
              <p className="text-[11px] text-text-main/70">அரசு தளங்களில் நிராகரிக்கப்படாத சுத்தமான முடிவு.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="font-bold text-xs text-text-main">அதிவேக இயக்கம்</h4>
              <p className="text-[11px] text-text-main/70">மொபைலிலும் நொடிகளில் செயல்படும் நவீன கட்டமைப்பு.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)
            </h2>
            <p className="text-xs sm:text-sm text-text-main/70">
              காகஸோ தமிழ் இணையக் கருவிகள் பற்றிய தெளிவான பதில்கள்.
            </p>
          </div>

          <div className="divide-y divide-surface-darker">
            {TAMIL_FAQS.map((faq, idx) => (
              <div key={idx} className="py-4 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-main">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
