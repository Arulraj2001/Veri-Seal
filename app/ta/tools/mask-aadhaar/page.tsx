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
import { JsonLd } from '@/components/seo/JsonLd';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';

export const metadata: Metadata = {
  title: 'ஆதார் அட்டை எண் மறைப்பான் | முதல் 8 எண்கள் மாஸ்க் செய்தல் | காகஸோ',
  description:
    'UIDAI மற்றும் ரிசர்வ் வங்கி விதிகளின்படி ஆதார் அட்டையின் முதல் 8 எண்களை (XXXXXXXX) மறைத்து கடைசி 4 எண்களை மட்டும் காட்டும் இலவச இணையக் கருவி. 100% பிரவுசர் பாதுகாப்பு.',
  keywords: [
    'aadhaar mask seivathu eppadi',
    'aadhaar number maraipathu eppadi',
    'masked aadhaar card download tamil',
    'aadhaar privacy mask online',
    'voter id aadhaar link seivathu eppadi',
    'mask aadhaar first 8 digits tamil',
    'ஆதார் எண் மறைப்பது எப்படி',
  ],
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
    question: 'Aadhaar mask seivathu eppadi? (Aadhaar number maraipathu eppadi?)',
    answer:
      'காகஸோ ஆதார் மாஸ்க் கருவியில் உங்கள் ஆதார் முன்/பின் பக்க புகைப்படத்தை பதிவேற்றுங்கள். எங்கள் கருவி தானாக அல்லது நீங்கள் விரும்பும் இடத்தில் கருப்பு ஸ்ட்ரிப் வைத்து முதல் 8 இலக்கங்களை (XXXX XXXX) முழுமையாக மறைத்து விடும். கடைசி 4 இலக்கங்கள் மட்டுமே தெரியும். இது உங்கள் மொபைல் ரேமிலேயே (RAM) நடப்பதால் எந்த சர்வரிலும் சேமிக்கப்படாது.',
  },
  {
    question: 'மாஸ்க் செய்யப்பட்ட ஆதார் (Masked Aadhaar) என்றால் என்ன? அது சட்டப்பூர்வமானதா?',
    answer:
      'ஆம், இது முற்றிலும் இந்திய அரசால் (UIDAI) அதிகாரப்பூர்வமாக அங்கீகரிக்கப்பட்டது (Section 28A). இதில் உங்கள் 12 இலக்க ஆதார் எண்ணின் முதல் 8 இலக்கங்கள் மறைக்கப்பட்டு (எ.கா: XXXX XXXX 1234), கடைசி 4 இலக்கங்கள் மட்டுமே தெரியும். இது வங்கி AePS பணமோசடி மற்றும் தனிநபர் அடையாள திருட்டை (Identity Theft) முற்றிலும் தடுக்கிறது.',
  },
  {
    question: 'ஹோட்டல், பயணம் அல்லது சிம் கார்டு வாங்கும்போது மாஸ்க் செய்த ஆதாரை ஏற்பார்களா?',
    answer:
      'ரிசர்வ் வங்கி (RBI KYC Master Direction 2026) மற்றும் UIDAI உத்தரவுப்படி அனைத்து தனியார் மற்றும் பொது நிறுவனங்களும் மாஸ்க் செய்யப்பட்ட ஆதாரை அதிகாரப்பூர்வ அடையாளச் சான்றாக ஏற்றுக்கொள்ள வேண்டும். முழு ஆதார் அட்டையை வாங்குவது தண்டனைக்குரிய குற்றமாகும்.',
  },
  {
    question: 'எனது ஆதார் அட்டை காகஸோ சர்வரில் பதிவேற்றப்படுமா?',
    answer:
      'இல்லை. காகஸோ உங்கள் பிரவுசரின் மெமரியிலேயே (In-Browser RAM) அனைத்து எண்களையும் மறைக்கிறது. உங்கள் ஆதார் படம் எந்தவொரு சர்வரிலும் பதிவேற்றப்படுவதோ, நெட்வொர்க்கில் அனுப்பப்படுவதோ அல்லது சேமிக்கப்படுவதோ இல்லை.',
  },
];

export default function MaskAadhaarTamilPage() {
  const structuredData = buildToolStructuredData({
    name: 'ஆதார் அட்டை எண் மறைப்பான் (Mask Aadhaar Online)',
    description:
      'UIDAI மற்றும் ரிசர்வ் வங்கி விதிகளின்படி ஆதார் அட்டையின் முதல் 8 எண்களை (XXXXXXXX) மறைத்து கடைசி 4 எண்களை மட்டும் காட்டும் இலவச இணையக் கருவி. 100% பிரவுசர் பாதுகாப்பு.',
    url: `${SITE_URL}/ta/tools/mask-aadhaar`,
    howToTitle: 'ஆதார் அட்டையின் முதல் 8 எண்களை மாஸ்க் செய்வது எப்படி?',
    howToDescription:
      '3 எளிய படிகளில் உங்கள் ஆதார் அடையாளத்தைப் பாதுகாப்பாக மாஸ்க் செய்யுங்கள்.',
    howToSteps: [
      {
        step: 1,
        title: 'ஆதார் அட்டையை பதிவேற்றவும்',
        desc: 'உங்கள் மொபைல் கேலரி அல்லது கணினியிலிருந்து ஆதார் அட்டையின் புகைப்படத்தை தேர்ந்தெடுக்கவும்.',
      },
      {
        step: 2,
        title: 'முதல் 8 எண்களை மறைக்கவும்',
        desc: 'தானியங்கி மாஸ்க் கருவி மூலம் முதல் 8 இலக்கங்களை (XXXXXXXX) கருப்பு ஸ்ட்ரிப் கொண்டு மறைக்கவும்.',
      },
      {
        step: 3,
        title: 'பாதுகாப்பான நகலை பதிவிறக்கவும்',
        desc: 'நொடிகளில் பாதுகாப்பான மாஸ்க் செய்யப்பட்ட ஆதாரை டவுன்லோட் செய்து எங்கும் தயக்கமின்றி வழங்கலாம்.',
      },
    ],
    faqs: AADHAAR_FAQS,
    breadcrumbs: [
      { name: 'முகப்பு', url: `${SITE_URL}/ta` },
      { name: 'கருவிகள்', url: `${SITE_URL}/ta/tools` },
      { name: 'ஆதார் மறைப்பான்', url: `${SITE_URL}/ta/tools/mask-aadhaar` },
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

        {/* GEO Rule of 45 Words Answer Capsule */}
        <AnswerCapsule
          lang="ta"
          title="டிஜிட்டல் உடனடி சுருக்கம்: ஆதார் அட்டை முதல் 8 எண்களை மாஸ்க் செய்வது எப்படி?"
          badge="அரசு பாதுகாப்பு நேரடி விடை"
          portal="UIDAI & Reserve Bank of India (RBI KYC 2026)"
          officialSourceName="UIDAI Masked Aadhaar Notification"
          officialSourceUrl="https://uidai.gov.in"
          answer="ரிசர்வ் வங்கி (RBI KYC 2026) மற்றும் UIDAI வழிகாட்டுதலின்படி தனியார் நிறுவனங்கள், ஹோட்டல்கள் மற்றும் பயண பதிவுகளுக்கு முழு ஆதார் அட்டையை வழங்குவது பாதுகாப்பற்றதாகும். காகஸோ ஆதார் மாஸ்க் கருவி மூலம் முதல் 8 எண்களை (XXXXXXXX) கருப்பு ஸ்ட்ரிப் கொண்டு மறைத்து, கடைசி 4 எண்களை மட்டும் உங்கள் பிரவுசரிலேயே 100% பாதுகாப்பாக உருவாக்கலாம்."
        />

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
                அடிக்கடி கேட்கப்படும் கேள்விகள் (ஆதார் மாஸ்கிங் &amp; தனிநபர் பாதுகாப்பு)
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
