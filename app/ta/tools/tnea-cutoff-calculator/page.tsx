import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Calculator,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Info,
} from 'lucide-react';
import TneaCutoffCalculatorEngine from '@/components/tools/TneaCutoffCalculatorEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';

export const metadata: Metadata = {
  title: 'TNEA பொறியியல் கட்-ஆஃப் கால்குலேட்டர் 2025–26 | அண்ணா பல்கலை 200 சூத்திரம் | காகஸோ',
  description:
    'அண்ணா பல்கலைக்கழக பொறியியல் சேர்க்கைக்கான TNEA கட்-ஆஃப் மதிப்பெண்ணை 200-க்கு உடனடியாக கணக்கிடுங்கள். கணிதம் + (இயற்பியல் / 2) + (வேதியியல் / 2). 7.5% அரசுப் பள்ளி இடஒதுக்கீடு வழிகாட்டி.',
  keywords: [
    'tnea engineering cutoff eppadi calculate seivathu',
    '7.5 reservation cutoff marks tamil',
    'anna university cutoff formula',
    'engineering cutoff marks calculation',
    '12th cutoff calculator tamil nadu',
    'tnea cutoff marks 2026',
    'பொறியியல் கட் ஆஃப் கணக்கீடு',
  ],
  alternates: {
    canonical: `${SITE_URL}/ta/tools/tnea-cutoff-calculator`,
    languages: {
      'ta-IN': `${SITE_URL}/ta/tools/tnea-cutoff-calculator`,
      'en': `${SITE_URL}/tools/tnea-cutoff-calculator`,
      'x-default': `${SITE_URL}/tools/tnea-cutoff-calculator`,
    },
  },
  openGraph: {
    title: 'TNEA பொறியியல் கட்-ஆஃப் கால்குலேட்டர் | காகஸோ',
    description:
      'தமிழ்நாடு பொறியியல் கலந்தாய்வு 200-க்கு உங்கள் கட்-ஆஃப் என்ன? உடனடியாக ஆன்லைனில் இலவசமாக கணக்கிடுங்கள்.',
    url: `${SITE_URL}/ta/tools/tnea-cutoff-calculator`,
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
    type: 'website',
  },
};

const TNEA_FAQS = [
  {
    question: 'TNEA engineering cutoff eppadi calculate seivathu? (Cutoff marks calculation tamil)',
    answer:
      'தமிழ்நாடு பொறியியல் சேர்க்கைக்கான (TNEA) கட்-ஆஃப் மொத்தம் 200 மதிப்பெண்களுக்கு கணக்கிடப்படுகிறது. அதிகாரப்பூர்வ சூத்திரம்: கணிதம் (100-க்கு) + [இயற்பியல் ÷ 2 (50-க்கு)] + [வேதியியல் ÷ 2 (50-க்கு)] = 200 மதிப்பெண்கள். காகஸோ கால்குலேட்டரில் உங்கள் மதிப்பெண்களை உள்ளிட்டவுடன் உடனடி கட்-ஆஃப் காட்டப்படும்.',
  },
  {
    question: '7.5 reservation cutoff marks tamil: அரசுப் பள்ளி மாணவர்களுக்கான கட்-ஆஃப் சலுகை என்ன?',
    answer:
      '6-ஆம் வகுப்பு முதல் 12-ஆம் வகுப்பு வரை தமிழ்நாடு அரசுப் பள்ளிகளில் பயின்ற மாணவர்களுக்கு பொறியியல், மருத்துவம் மற்றும் தொழிற்கல்வி படிப்புகளில் 7.5% சிறப்பு உள்ஒதுக்கீடு வழங்கப்படுகிறது. இவர்களுக்கு குறைந்த கட்-ஆஃப் மதிப்பெண்ணில் சிறந்த அரசு மற்றும் தன்னாட்சி கல்லூரிகள் கிடைப்பதுடன், கல்விக் கட்டணம், விடுதிக் கட்டணம் முழுவதையும் தமிழ்நாடு அரசே ஏற்கும்.',
  },
  {
    question: 'முதல் தலைமுறை பட்டதாரி (First Graduate) சலுகை பெறுவது எப்படி?',
    answer:
      'குடும்பத்தில் எவரும் இதுவரை பட்டப்படிப்பு படித்திருக்கவில்லை எனில், வட்டாட்சியர் அலுவலகம் (e-Sevai) மூலம் முதல் பட்டதாரி சான்றிதழ் பெற்று கலந்தாய்வின் போது சமர்ப்பித்தால் கல்விக் கட்டணத்தில் ஆண்டுக்கு ₹25,000 வரை அரசு உதவித்தொகை விலக்கு பெறலாம்.',
  },
];

export default function TneaCutoffCalculatorTamilPage() {
  const structuredData = buildToolStructuredData({
    name: 'TNEA பொறியியல் கட்-ஆஃப் கால்குலேட்டர் (அண்ணா பல்கலை 200 சூத்திரம்)',
    description:
      'அண்ணா பல்கலைக்கழக பொறியியல் சேர்க்கைக்கான TNEA கட்-ஆஃப் மதிப்பெண்ணை 200-க்கு உடனடியாக கணக்கிடுங்கள். கணிதம் + (இயற்பியல் / 2) + (வேதியியல் / 2).',
    url: `${SITE_URL}/ta/tools/tnea-cutoff-calculator`,
    howToTitle: 'TNEA கட்-ஆஃப் மதிப்பெண்ணை கணக்கிடுவது எப்படி?',
    howToDescription:
      'கணிதம், இயற்பியல், வேதியியல் மதிப்பெண்களை உள்ளிட்டு 200-க்கு கட்-ஆஃப் அறியுங்கள்.',
    howToSteps: [
      {
        step: 1,
        title: 'மதிப்பெண்களை உள்ளிடவும்',
        desc: '12-ஆம் வகுப்பு பொதுத்தேர்வில் கணிதம், இயற்பியல், வேதியியலில் பெற்ற மதிப்பெண்களை உள்ளிடவும்.',
      },
      {
        step: 2,
        title: 'இடஒதுக்கீடு பிரிவை தேர்ந்தெடுக்கவும்',
        desc: 'OC, BC, BCM, MBC, SC, SCA, ST அல்லது 7.5% அரசுப் பள்ளி உள் ஒதுக்கீட்டை தேர்வு செய்யவும்.',
      },
      {
        step: 3,
        title: 'கட்-ஆஃப் அறியவும்',
        desc: 'உங்கள் 200-க்கான துல்லியமான பொறியியல் கட்-ஆஃப் மதிப்பெண் உடனே கணக்கிடப்படும்.',
      },
    ],
    faqs: TNEA_FAQS,
    breadcrumbs: [
      { name: 'முகப்பு', url: `${SITE_URL}/ta` },
      { name: 'கருவிகள்', url: `${SITE_URL}/ta/tools` },
      { name: 'TNEA கட்-ஆஃப்', url: `${SITE_URL}/ta/tools/tnea-cutoff-calculator` },
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
          <span className="text-text-main font-bold">TNEA கட்-ஆஃப்</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>அண்ணா பல்கலைக்கழக அதிகாரப்பூர்வ 200 மதிப்பெண் முறை</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight">
            TNEA பொறியியல் <span className="text-primary">கட்-ஆஃப் கால்குலேட்டர்</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
            கணிதம், இயற்பியல், வேதியியல் மதிப்பெண்களை உள்ளிட்டு உங்கள் கலந்தாய்வு கட்-ஆஃப் மதிப்பெண்ணை நொடிகளில் கண்டறியவும்.
          </p>
        </div>

        {/* GEO Rule of 45 Words Answer Capsule */}
        <AnswerCapsule
          lang="ta"
          title="டிஜிட்டல் உடனடி சுருக்கம்: TNEA பொறியியல் கட்-ஆஃப் 200-க்கு கணக்கிடுவது எப்படி?"
          badge="அண்ணா பல்கலை அதிகாரப்பூர்வ சூத்திரம்"
          portal="DoTE Tamil Nadu & Anna University (TNEA 2026)"
          officialSourceName="TNEA Information Brochure"
          officialSourceUrl="https://www.tneaonline.org"
          answer="தமிழ்நாடு பொறியியல் சேர்க்கை (TNEA 2026) கட்-ஆஃப் அண்ணா பல்கலைக்கழகத்தின் அதிகாரப்பூர்வ சூத்திரப்படி கணக்கிடப்படுகிறது: கணிதம் (100) + [இயற்பியல் / 2 (50)] + [வேதியியல் / 2 (50)] = 200 மதிப்பெண்கள். 6–12 அரசுப் பள்ளியில் படித்த மாணவர்களுக்கு 7.5% சிறப்பு உள்ஒதுக்கீடு மற்றும் முழுக் கல்விக் கட்டண விலக்கு சலுகை உண்டு."
        />

        {/* Engine (Top 30%) */}
        <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-8">
          <TneaCutoffCalculatorEngine />
        </div>

        {/* AdSlot */}
        <AdSlot slot="in_content" />

        {/* Guidelines & FAQs (Bottom 70%) */}
        <div className="space-y-10">
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              கட்-ஆஃப் கணக்கிடும் முறை (சூத்திரம்)
            </h2>
            <div className="p-4 rounded-2xl bg-surface border border-surface-darker text-xs sm:text-sm space-y-2 leading-relaxed text-text-main/80">
              <p><strong>கட்-ஆஃப் (200) = கணிதம் + (இயற்பியல் ÷ 2) + (வேதியியல் ÷ 2)</strong></p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>கணிதம்: அதிகபட்சம் 100 மதிப்பெண்கள்</li>
                <li>இயற்பியல்: அதிகபட்சம் 50 மதிப்பெண்கள் (100-க்கு பெற்றதை 2-ஆல் வகுக்க வேண்டும்)</li>
                <li>வேதியியல்: அதிகபட்சம் 50 மதிப்பெண்கள் (100-க்கு பெற்றதை 2-ஆல் வகுக்க வேண்டும்)</li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                அடிக்கடி கேட்கப்படும் கேள்விகள் (TNEA &amp; Tanglish வழிகாட்டி)
              </h2>
            </div>
            <div className="divide-y divide-surface-darker">
              {TNEA_FAQS.map((faq, idx) => (
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
