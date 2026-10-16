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
  FileText,
  Sliders,
  Sparkles,
  Info,
  Archive,
  ExternalLink,
} from 'lucide-react';
import ExamComboPackEngine from '@/components/tools/ExamComboPackEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'TNPSC 3-in-1 காம்போ பேக்: புகைப்படம், கையொப்பம் & சான்றிதழ் ZIP | காகஸோ',
  description:
    'TNPSC குரூப் 1, 2, 4 மற்றும் VAO OTR போர்ட்டலுக்கான ஒரே கிளிக்கில் 3-இன்-1 ஆவண தொகுப்பு. பெயர் & தேதியுடன் புகைப்படம் (20-50KB), கையொப்பம் (10-20KB), மற்றும் சாதி சான்றிதழ் PDF (<200KB) அனைத்தும் ஒரே ZIP கோப்பாக இலவசமாக பதிவிறக்குங்கள்.',
  keywords: [
    'tnpsc combo pack photo signature certificate tamil',
    'டிஎன்பிஎஸ்சி போட்டோ சிக்னேச்சர் சான்றிதழ் ஒரே கிளிக்கில்',
    'tnpsc otr 3 in 1 zip download',
    'tnpsc group 4 photo signature resizer tamil',
    'சாதி சான்றிதழ் 200kb குறைப்பது எப்படி',
    'tnpsc photo name date stamp tamil tool',
    'tnpsc signature 10 to 20 kb tamil',
  ],
  alternates: {
    canonical: 'https://kagazo.in/ta/tools/tnpsc-combo-pack',
    languages: {
      'ta-IN': 'https://kagazo.in/ta/tools/tnpsc-combo-pack',
      en: 'https://kagazo.in/tools/tnpsc-combo-pack',
      'x-default': 'https://kagazo.in/tools/tnpsc-combo-pack',
    },
  },
  openGraph: {
    title: 'TNPSC 3-in-1 காம்போ பேக்: புகைப்படம், கையொப்பம் & சான்றிதழ் ZIP | காகஸோ',
    description:
      'TNPSC OTR பதிவிற்கான அனைத்து ஆவணங்களையும் நொடிகளில் தயார் செய்து 1-Click ZIP கோப்பாக பதிவிறக்கம் செய்யுங்கள். 100% பாதுகாப்பான தமிழ் இணையக் கருவி.',
    url: 'https://kagazo.in/ta/tools/tnpsc-combo-pack',
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TNPSC 3-in-1 காம்போ பேக் ZIP டவுன்லோடர் | காகஸோ',
    description:
      'பெயர்/தேதியுடன் புகைப்படம் (20-50KB), கையொப்பம் (10-20KB), சான்றிதழ் PDF (<200KB) - அனைத்தும் ஒரே ZIP ஃபைலில்.',
  },
};

const HOW_TO_STEPS = [
  {
    name: 'விண்ணப்பதாரர் பெயர் மற்றும் தேதி உள்ளிடவும்',
    text: 'உங்கள் முழுப்பெயரை ஆங்கில பெரிய எழுத்துக்களில் (CAPITALS) மற்றும் புகைப்படம் எடுத்த தேதியை உள்ளிடவும்.',
  },
  {
    name: 'புகைப்படம், கையொப்பம் & சான்றிதழை பதிவேற்றவும்',
    text: 'உங்கள் பாஸ்போர்ட் சைஸ் போட்டோ, வெள்ளை தாளில் இட்ட கையொப்பம் மற்றும் சாதி/மதிப்பெண் சான்றிதழை அந்தந்த கட்டங்களில் தேர்வு செய்யவும்.',
  },
  {
    name: 'தானியங்கி விதிமுறை சோதனையை சரிபார்க்கவும்',
    text: 'காகஸோ உடனடியாக TNPSC OTR விதிமுறைகளின்படி (போட்டோ: 20–50 KB, கையொப்பம்: 10–20 KB, PDF: <200 KB) சரிசெய்து பச்சைக் குறியீட்டை காட்டும்.',
  },
  {
    name: 'ஒரே கிளிக்கில் ZIP கோப்பாக பதிவிறக்கவும்',
    text: 'பதிவிறக்கு பட்டனை கிளிக் செய்து அனைத்து 3 ஆவணங்களையும் உள்ளடக்கிய ஒரே ZIP கோப்பை பெற்று நேரடியாக tnpsc.gov.in போர்ட்டலில் பதிவேற்றலாம்.',
  },
];

const FAQS = [
  {
    question: 'TNPSC OTR 2026-ன் அதிகாரப்பூர்வ ஆவண அளவுகள் என்னென்ன?',
    answer:
      'தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம் (TNPSC) வழிகாட்டுதலின்படி: (1) புகைப்படம்: 3.5×4.5 செ.மீ (413×531 px), அளவு 20 KB முதல் 50 KB-க்குள் இருக்க வேண்டும். அடியில் விண்ணப்பதாரர் பெயர் மற்றும் எடுத்த தேதி இருக்க வேண்டும். (2) கையொப்பம்: 6.0×2.0 செ.மீ (400×133 px), அளவு 10 KB முதல் 20 KB-க்குள் மட்டுமே இருக்க வேண்டும். (3) சான்றிதழ்: 100 KB முதல் 200 KB-க்குள் உள்ள தெளிவான PDF வடிவத்தில் இருக்க வேண்டும்.',
  },
  {
    question: 'மொபைலில் எடுத்த சாதி சான்றிதழ் படத்தை PDF ஆக மாற்றி 200KB-க்குள் சுருக்குமா?',
    answer:
      'ஆம்! உங்கள் சாதி சான்றிதழ், பத்தாம் வகுப்பு மதிப்பெண் பட்டியல் அல்லது PSTM சான்றிதழ் புகைப்படத்தை பதிவேற்றினால் போதும். காகஸோ தானாகவே அதை தெளிவான A4 PDF கோப்பாக மாற்றி 200 KB-க்குள் சுருக்கி தரும்.',
  },
  {
    question: 'எனது ஆவணங்கள் அல்லது கையொப்பம் காகஸோ சர்வரில் சேமிக்கப்படுமா?',
    answer:
      'ஒருபோதும் இல்லை. டிஜிட்டல் தனிநபர் தரவுப் பாதுகாப்பு சட்டம் (DPDP Act 2023) படி, உங்கள் ஆவணங்கள் எந்த சர்வர்க்கும் அனுப்பப்படாமல், முழுக்க முழுக்க உங்கள் மொபைல் அல்லது கம்ப்யூட்டர் பிரவுசர் RAM மெமரியிலேயே பிராசஸ் செய்யப்படுகிறது.',
  },
];

export default function TnpscComboPackTamilPage() {
  const structuredData = buildToolStructuredData({
    name: 'TNPSC 3-in-1 காம்போ பேக் மேக்கர் (OTR 2026)',
    description:
      'TNPSC குரூப் 1, 2, 4 மற்றும் VAO OTR போர்ட்டலுக்கான ஒரே கிளிக்கில் 3-இன்-1 ஆவண தொகுப்பு. பெயர் & தேதியுடன் புகைப்படம், கையொப்பம், மற்றும் சான்றிதழ் PDF அனைத்தும் ஒரே ZIP கோப்பாக இலவசமாக பதிவிறக்குங்கள்.',
    url: 'https://kagazo.in/ta/tools/tnpsc-combo-pack',
    applicationCategory: 'EducationalApplication',
    howToTitle: 'TNPSC OTR ஆவணங்களை ஒரே கிளிக்கில் தயார் செய்வது எப்படி?',
    howToDescription:
      'TNPSC தேர்வுக்கு தேவையான அனைத்து ஆவணங்களையும் சரியான அளவில் தயார் செய்யும் எளிய வழிமுறைகள்.',
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
            { label: 'TNPSC 3-in-1 காம்போ பேக்' },
          ]}
          suppressSchema
        />

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Archive className="w-3.5 h-3.5" />
            <span>TNPSC ஒருமுறை பதிவு (OTR) சிறப்பு தொகுப்பு</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            TNPSC 3-in-1 காம்போ பேக்: போட்டோ, கையொப்பம் &amp; சான்றிதழ் ZIP
          </h1>

          <p className="text-sm sm:text-base text-text-main/70">
            ஒவ்வொரு ஆவணத்தையும் தனித்தனியாக மாற்றி நேரத்தை வீணடிக்காதீர்கள். பெயர் மற்றும் தேதியுடன் போட்டோ (20–50 KB), கையொப்பம் (10–20 KB), மற்றும் சான்றிதழ் PDF (&lt;200 KB) மூன்றையும் ஒரே இடத்தில் தயார் செய்து ZIP ஃபைலாக பதிவிறக்குங்கள்.
          </p>
        </div>

        {/* Answer Capsule for GEO Search Dominance */}
        <AnswerCapsule
          title="TNPSC OTR ஆவண பதிவேற்ற அதிகாரப்பூர்வ விதிகள் (2026)"
          answer="TNPSC OTR போர்ட்டலில் மூன்று ஆவணங்கள் கட்டாயம்: (1) புகைப்படம்: 3.5×4.5 செ.மீ (20–50 KB) கீழ் பகுதியில் விண்ணப்பதாரர் பெயர் மற்றும் எடுத்த தேதி அச்சிடப்பட்டிருக்க வேண்டும்; (2) கையொப்பம்: 6.0×2.0 செ.மீ (10–20 KB) நீல அல்லது கருப்பு மையினால் இடப்பட்டிருக்க வேண்டும்; (3) சான்றிதழ்: 100 KB முதல் 200 KB வரையிலான தெளிவான PDF கோப்பாக இருக்க வேண்டும்."
          officialSourceUrl="https://www.tnpsc.gov.in"
          officialSourceName="TNPSC விண்ணப்பதாரர்களுக்கான அதிகாரப்பூர்வ வழிமுறைகள்"
          portal="TNPSC OTR"
        />

        {/* Top Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Core Interactive Tool Engine */}
        <div className="bg-surface/50 border border-surface-darker rounded-3xl p-4 sm:p-8 shadow-sm">
          <ExamComboPackEngine portal="tnpsc" />
        </div>

        {/* Middle Ad Slot */}
        <AdSlot slot="in_content" />

        {/* Two-Column Explanatory & FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Specification Matrix Table */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                <span>TNPSC OTR அதிகாரப்பூர்வ அளவுகோல் அட்டவணை</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface-darker/50 text-text-main/80 font-bold">
                      <th className="p-3">ஆவணம்</th>
                      <th className="p-3">பரிமாணங்கள்</th>
                      <th className="p-3">அனுமதிக்கப்பட்ட அளவு</th>
                      <th className="p-3">முக்கிய விதிகள்</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr>
                      <td className="p-3 font-semibold text-text-main">விண்ணப்பதாரர் புகைப்படம்</td>
                      <td className="p-3 font-mono">3.5 × 4.5 cm (413×531 px)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">20 KB – 50 KB</td>
                      <td className="p-3">கீழ் பகுதியில் பெயர் மற்றும் புகைப்படம் எடுத்த தேதி கட்டாயம்.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">மாதிரி கையொப்பம்</td>
                      <td className="p-3 font-mono">6.0 × 2.0 cm (400×133 px)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">10 KB – 20 KB</td>
                      <td className="p-3">வெள்ளை தாளில் நீலம்/கருப்பு மை. 10KB-க்கு கீழ் இருந்தால் நிராகரிக்கப்படும்.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-text-main">சாதி / மதிப்பெண் சான்றிதழ்</td>
                      <td className="p-3 font-mono">A4 PDF வடிவம்</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">100 KB – 200 KB</td>
                      <td className="p-3">அரசு முத்திரை மற்றும் கையொப்பம் தெளிவாக தெரிய வேண்டும்.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step-by-Step Guide Section */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>பயன்படுத்தும் எளிய வழிமுறைகள்</span>
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
                <span>அடிக்கடி கேட்கப்படும் கேள்விகள் (விண்ணப்பதாரர் உதவி மையம்)</span>
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
            {/* Official Portal Quick Link */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-text-main">
                <Info className="w-4 h-4 text-primary" />
                <span>அதிகாரப்பூர்வ TNPSC தளம்</span>
              </div>
              <p className="text-xs text-text-main/70">
                தயார் செய்யப்பட்ட கோப்புகளை தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணைய அதிகாரப்பூர்வ தளத்தில் பதிவேற்றலாம்:
              </p>
              <a
                href="https://www.tnpsc.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-darker/60 hover:bg-surface-darker text-xs font-bold text-primary transition-all group"
              >
                <span>tnpsc.gov.in (அதிகாரப்பூர்வ போர்ட்டல்)</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Zero-Server Security Promise */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% பிரவுசர் பாதுகாப்பு உத்தரவாதம்</span>
              </div>
              <p className="text-xs text-text-main/70 leading-relaxed">
                உங்கள் சான்றிதழ்கள், கையொப்பங்கள் மற்றும் புகைப்படங்கள் சர்வர்களுக்கு அனுப்பப்படாமல் உங்கள் பிரவுசர் மெமரியிலேயே பிராசஸ் செய்யப்படுகிறது. முழுமையான தனியுரிமை உறுதி செய்யப்பட்டுள்ளது.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
