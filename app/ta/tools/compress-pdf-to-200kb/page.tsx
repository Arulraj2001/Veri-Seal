import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Info,
  Sliders,
  FileCheck,
  FileText,
} from 'lucide-react';
import { PdfCompressorEngine } from '@/components/tools/PdfCompressorEngine';
import { TOOL_CONFIGS } from '@/components/tools/tool-configs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { JsonLd } from '@/components/seo/JsonLd';

const config = TOOL_CONFIGS['compress-pdf-to-200kb'];

export const metadata: Metadata = {
  title: 'PDF-ஐ 200KB-க்குள் சுருக்குவது எப்படி | TNPSC & அரசு தேர்வு போர்ட்டல் | காகஸோ',
  description:
    'சாதி சான்றிதழ், பத்தாம் வகுப்பு மதிப்பெண் பட்டியல் மற்றும் அரசு தேர்வு ஆவணங்களை எழுத்து மங்காமல் துல்லியமாக 200 KB-க்குள் சுருக்கும் இலவச தமிழ் இணையக் கருவி. 100% பிரவுசர் பாதுகாப்பு.',
  keywords: [
    'சாதி சான்றிதழ் 200kb குறைப்பது எப்படி',
    'pdf 200kb குறைக்கும் முறை',
    'tnpsc சான்றிதழ் 200kb சுருக்குவது எப்படி',
    'compress pdf to 200kb tamil',
    'pdf size reducer 200kb online free tamil',
    'டிஎன்பிஎஸ்சி சான்றிதழ் சுருக்கும் கருவி',
  ],
  alternates: {
    canonical: 'https://kagazo.in/ta/tools/compress-pdf-to-200kb',
    languages: {
      'ta-IN': 'https://kagazo.in/ta/tools/compress-pdf-to-200kb',
      en: 'https://kagazo.in/tools/compress-pdf-to-200kb',
      'x-default': 'https://kagazo.in/tools/compress-pdf-to-200kb',
    },
  },
  openGraph: {
    title: 'PDF-ஐ 200KB-க்குள் சுருக்குவது எப்படி | காகஸோ',
    description:
      'அரசு சான்றிதழ்கள் மற்றும் மதிப்பெண் பட்டியல்களை எழுத்து மற்றும் முத்திரை மங்காமல் 200 KB-க்குள் இலவசமாக சுருக்குங்கள்.',
    url: 'https://kagazo.in/ta/tools/compress-pdf-to-200kb',
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF-ஐ 200KB-க்குள் சுருக்கும் தமிழ் இணையக் கருவி | காகஸோ',
    description:
      'TNPSC, SSC, மற்றும் கல்லூரி சேர்க்கைக்கான சான்றிதழ்களை 200KB-க்குள் மாற்றும் பாதுகாப்பான கருவி.',
  },
};

const HOW_TO_STEPS = [
  {
    name: 'PDF சான்றிதழை தேர்ந்தெடுக்கவும்',
    text: 'உங்கள் சாதி சான்றிதழ், மதிப்பெண் பட்டியல் அல்லது அடையாள அட்டை PDF கோப்பை உள்ளிடவும்.',
  },
  {
    name: '200 KB சுருக்க அளவை தேர்வு செய்யவும்',
    text: 'கருவி தானாகவே TNPSC மற்றும் அரசு தேர்வுகளுக்கான 100KB–200KB வரம்பிற்குள் அளவை பூட்டுகிறது.',
  },
  {
    name: 'சுருக்கு பட்டனை அழுத்தவும்',
    text: 'காகஸோ உங்கள் ஆவணத்தின் அரசு முத்திரை மற்றும் கையொப்பம் மங்காதவாறு உயர்தர அல்காரிதம் மூலம் சுருக்குகிறது.',
  },
  {
    name: 'சரிபார்த்து பதிவிறக்கவும்',
    text: 'அளவு 200 KB-க்கு கீழ் இருப்பதை சரிபார்த்து உடனே பதிவிறக்கம் செய்து அரசு போர்ட்டலில் பதிவேற்றலாம்.',
  },
];

const FAQS = [
  {
    question: 'சாதி சான்றிதழை 200 KB-க்குள் சுருக்கும் போது QR கோட் மற்றும் டிஜிட்டல் கையொப்பம் மங்குமா?',
    answer:
      'மங்காது. காகஸோ அரசு சான்றிதழ்களின் டிஜிட்டல் கையொப்பம், அசல் சீல் மற்றும் QR குறியீட்டின் தெளிவைப் பாதுகாக்கும் ஸ்மார்ட் வெக்டர் அல்காரிதத்தை பயன்படுத்துகிறது. எனவே அரசு அதிகாரிகள் சரிபார்க்கும் போது எந்தவித சிக்கலும் ஏற்படாது.',
  },
  {
    question: 'TNPSC தேர்வில் 200KB-க்கு மேல் PDF பதிவேற்றினால் என்ன ஆகும்?',
    answer:
      'TNPSC இணையதளம் 200 KB-க்கு அதிகமான கோப்புகளை உடனடியாக நிராகரிக்கும் ("File size exceeds 200 KB"). இதனால் விண்ணப்பம் சமர்ப்பிக்கப்படாமல் போக வாய்ப்புள்ளது. காகஸோ மூலம் சுருக்கி எளிதாக பதிவேற்றலாம்.',
  },
  {
    question: 'எனது தனிப்பட்ட ஆவணங்கள் பாதுகாப்பானதா?',
    answer:
      'முற்றிலும் பாதுகாப்பானது. காகஸோ எந்த ஒரு கோப்பையும் சர்வரில் பதிவேற்றாமல் உங்கள் கம்ப்யூட்டர் அல்லது செல்போன் பிரவுசரிலேயே பிராசஸ் செய்கிறது. உங்கள் தனிநபர் தகவல்கள் 100% பாதுகாப்பாக இருக்கும்.',
  },
];

export default function CompressPdf200KbTamilPage() {
  const structuredData = buildToolStructuredData({
    name: 'PDF 200KB சுருக்கும் கருவி (தமிழ்)',
    description:
      'சாதி சான்றிதழ் மற்றும் மதிப்பெண் பட்டியல்களை எழுத்து மங்காமல் துல்லியமாக 200 KB-க்குள் சுருக்கும் இலவச தமிழ் இணையக் கருவி.',
    url: 'https://kagazo.in/ta/tools/compress-pdf-to-200kb',
    applicationCategory: 'UtilityApplication',
    howToTitle: 'PDF கோப்பை 200KB-க்குள் சுருக்குவது எப்படி?',
    howToDescription:
      'அரசு தேர்வுகள் மற்றும் கல்லூரி பதிவிற்கான சான்றிதழ்களை 4 எளிய படிகளில் சுருக்குங்கள்.',
    howToSteps: HOW_TO_STEPS,
    faqs: FAQS,
  });

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <JsonLd data={structuredData} />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'முகப்பு', href: '/ta' },
            { label: 'கருவிகள்', href: '/ta/tools' },
            { label: 'PDF 200KB சுருக்குதல்' },
          ]}
          suppressSchema
        />

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>அரசுத் தேர்வு சான்றிதழ் பிரத்யேக கருவி</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            PDF-ஐ 200KB-க்குள் சுருக்குவது எப்படி (இலவசம்)
          </h1>

          <p className="text-sm sm:text-base text-text-main/70">
            TNPSC OTR, SSC, மற்றும் கல்லூரி சேர்க்கை போர்ட்டல்களுக்கு தேவையான சாதி சான்றிதழ் மற்றும் மதிப்பெண் பட்டியல்களை எழுத்து மற்றும் சீல் மங்காமல் துல்லியமாக 200 KB-க்குள் சுருக்குங்கள்.
          </p>
        </div>

        {/* Answer Capsule for GEO Search Dominance */}
        <AnswerCapsule
          title="PDF-ஐ 200KB-க்குள் குறைக்கும் முறை (சுருக்கம்)"
          answer="அரசு வேலை வாய்ப்பு போர்ட்டல்கள் (TNPSC, SSC) மற்றும் கல்லூரி சேர்க்கைகளில் சான்றிதழ்கள் strictly 100 KB முதல் 200 KB-க்குள் இருக்க வேண்டும். காகஸோ தளத்தில் உங்கள் PDF சான்றிதழை பதிவேற்றி, 200 KB டார்கெட்டை தேர்வு செய்தால், அரசு முத்திரை மற்றும் கையொப்பத்தின் தரம் குறையாமல் நொடிகளில் துல்லியமான அளவில் பதிவிறக்கம் செய்து கொள்ளலாம்."
          officialSourceUrl="https://www.tnpsc.gov.in"
          officialSourceName="TNPSC சான்றிதழ் வழிகாட்டுதல்கள் 2026"
          portal="அரசு தேர்வுகள் போர்ட்டல்"
        />

        {/* Top Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Core Interactive Tool Engine */}
        <div className="bg-surface/50 border border-surface-darker rounded-3xl p-4 sm:p-8 shadow-sm">
          <PdfCompressorEngine config={config} />
        </div>

        {/* Middle Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Explanatory & FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Step-by-Step Guide Section */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>சான்றிதழை சுருக்கும் எளிய படிகள்</span>
              </h2>

              <div className="space-y-4">
                {HOW_TO_STEPS.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-main">{step.name}</h3>
                      <p className="text-xs text-text-main/70 mt-1 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive FAQ Section */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span>அடிக்கடி கேட்கப்படும் கேள்விகள்</span>
              </h2>

              <div className="space-y-4 divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                    <h3 className="text-xs sm:text-sm font-bold text-text-main">{faq.question}</h3>
                    <p className="text-xs text-text-main/70 mt-1.5 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Portal Links & Privacy Guarantee */}
          <div className="space-y-6">
            {/* Zero-Server Security Promise */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% பிரவுசர் பாதுகாப்பு உத்தரவாதம்</span>
              </div>
              <p className="text-xs text-text-main/70 leading-relaxed">
                உங்கள் சாதி சான்றிதழ்கள் மற்றும் மதிப்பெண் பட்டியல்கள் சர்வர்களுக்கு அனுப்பப்படாமல் உங்கள் பிரவுசர் மெமரியிலேயே சுருக்கப்படுகிறது. எந்த தரவும் சேமிக்கப்படாது.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
