import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { AadhaarMaskEngine } from '@/components/tools/AadhaarMaskEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'ஆதார் அட்டை எண் மறைப்பான் | முதல் 8 எண்கள் மாஸ்க் செய்தல் | காகஸோ',
  description:
    'UIDAI மற்றும் ரிசர்வ் வங்கி விதிகளின்படி ஆதார் அட்டையின் முதல் 8 எண்களை (XXXXXXXX) மறைத்து கடைசி 4 எண்களை மட்டும் காட்டும் இலவச இணையக் கருவி. 100% பிரவுசர் பாதுகாப்பு.',
  alternates: {
    canonical: `${SITE_URL}/ta/tools/mask-aadhaar`,
    languages: {
      'ta-IN': `${SITE_URL}/ta/tools/mask-aadhaar`,
      'en': `${SITE_URL}/tools/mask-aadhaar`,
      'x-default': `${SITE_URL}/tools/mask-aadhaar`,
    },
  },
  openGraph: {
    title: 'ஆதார் அட்டை எண் மறைப்பான் (Mask Aadhaar Online) | காகஸோ',
    description: 'ஹோட்டல், சிம் கார்டு வாங்கும்போது முழு ஆதாரை தராமல் முதல் 8 எண்களை மறைத்து பாதுகாப்பாக கொடுங்கள்.',
    url: `${SITE_URL}/ta/tools/mask-aadhaar`,
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
    type: 'website',
  },
};

const AADHAAR_FAQS = [
  {
    question: 'மாஸ்க் செய்யப்பட்ட ஆதார் (Masked Aadhaar) என்றால் என்ன? அது சட்டப்பூர்வமானதா?',
    answer:
      'ஆம், இது முற்றிலும் இந்திய அரசால் (UIDAI) அதிகாரப்பூர்வமாக அங்கீகரிக்கப்பட்டது. இதில் உங்கள் 12 இலக்க ஆதார் எண்ணின் முதல் 8 இலக்கங்கள் மறைக்கப்பட்டு (எ.கா: XXXX XXXX 1234), கடைசி 4 இலக்கங்கள் மட்டுமே தெரியும். இது உங்கள் தனிநபர் அடையாள திருட்டை (Identity Theft) தடுக்கிறது.',
  },
  {
    question: 'ஹோட்டல், பயணம் அல்லது சிம் கார்டு வாங்கும்போது மாஸ்க் செய்த ஆதாரை ஏற்கிறார்களா?',
    answer:
      'ரிசர்வ் வங்கி (RBI) மற்றும் UIDAI உத்தரவுப்படி அனைத்து தனியார் மற்றும் பொது நிறுவனங்களும் மாஸ்க் செய்யப்பட்ட ஆதாரை அதிகாரப்பூர்வ அடையாளச் சான்றாக ஏற்றுக்கொள்ள வேண்டும்.',
  },
  {
    question: 'எனது ஆதார் அட்டை காகஸோ சர்வரில் பதிவேற்றப்படுமா?',
    answer:
      'இல்லை. காகஸோ உங்கள் பிரவுசரின் மெமரியிலேயே (In-Browser RAM) அனைத்து எண்களையும் மறைக்கிறது. உங்கள் ஆதார் படம் எந்தவொரு சர்வரிலும் பதிவேற்றப்படுவதோ அல்லது சேமிக்கப்படுவதோ இல்லை.',
  },
];

export default function MaskAadhaarTamilPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AADHAAR_FAQS.map((f) => ({
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
          <span className="text-text-main font-bold">ஆதார் மறைப்பான்</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>UIDAI &amp; RBI அங்கீகரித்த பாதுகாப்பு முறை</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight">
            ஆதார் அட்டை <span className="text-primary">எண் மறைப்பான் (Mask Aadhaar)</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
            உங்கள் அடையாளத்தைப் பாதுகாக்கவும். முதல் 8 இலக்கங்களை (XXXXXXXX) மறைத்து, கடைசி 4 இலக்கங்களை மட்டும் காட்டும் அதிவேக இணையக் கருவி.
          </p>
        </div>

        {/* Engine (Top 30%) */}
        <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-8">
          <AadhaarMaskEngine />
        </div>

        {/* AdSlot */}
        <AdSlot slot="in_content" />

        {/* Information & FAQs (Bottom 70%) */}
        <div className="space-y-10">
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              முழு ஆதார் அட்டையை எங்கும் கொடுக்காதீர்கள்!
            </h2>
            <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed">
              சிம் கார்டு வாங்கும்போதோ, ஹோட்டல்களில் தங்கும்போதோ அல்லது தனியார் அலுவலகங்களிலோ உங்கள் முழு 12 இலக்க ஆதார் எண்ணை கொடுப்பது ஆபத்தானது. உங்கள் ஆதார் எண் தவறாகப் பயன்படுத்தப்படாமல் இருக்க UIDAI வழிகாட்டுதலின்படி <strong>Masked Aadhaar</strong> மட்டுமே பயன்படுத்த வேண்டும்.
            </p>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                அடிக்கடி கேட்கப்படும் கேள்விகள் (ஆதார் மாஸ்கிங்)
              </h2>
            </div>
            <div className="divide-y divide-surface-darker">
              {AADHAAR_FAQS.map((faq, idx) => (
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
