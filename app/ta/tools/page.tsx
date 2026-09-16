import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Search,
  PenTool,
  Camera,
  Sliders,
  FileText,
  Lock,
  ArrowRight,
  EyeOff,
  Calculator,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'தமிழ் இணையப் பயன்பாட்டுக் கருவிகள் பட்டியல் | TNPSC, PDF & புகைப்பட கருவிகள் | காகஸோ',
  description:
    '135+ க்கும் மேற்பட்ட இலவச தமிழ் இணைய கருவிகள். TNPSC, SSC தேர்வு புகைப்பட அளவு மாற்றி, 20KB/50KB புகைப்பட குறைப்பான், ஆதார் எண் மறைப்பான் மற்றும் TNEA கட்-ஆஃப் கால்குலேட்டர்.',
  alternates: {
    canonical: `${SITE_URL}/ta/tools`,
    languages: {
      'ta-IN': `${SITE_URL}/ta/tools`,
      'en': `${SITE_URL}/tools`,
      'x-default': `${SITE_URL}/tools`,
    },
  },
  openGraph: {
    title: 'தமிழ் இணையப் பயன்பாட்டுக் கருவிகள் பட்டியல் | காகஸோ',
    description: 'அரசு தேர்வுகள், மாணவர் ஆவணங்கள் மற்றும் புகைப்பட அளவு மாற்றிகளுக்கான முழுமையான தமிழ் கருவிகள் பட்டியல்.',
    url: `${SITE_URL}/ta/tools`,
    siteName: 'காகஸோ (Kagazo Tamil)',
    locale: 'ta_IN',
  },
};

const CATEGORIES = [
  {
    name: 'அரசு தேர்வுகள் & OTR கருவிகள்',
    description: 'TNPSC, UPSC, SSC மற்றும் வங்கித் தேர்வுகளுக்கான பிரத்யேக அளவுகள்.',
    tools: [
      {
        title: 'TNPSC புகைப்படம் & கையொப்பம் மாற்றி',
        desc: 'OTR விதிமுறைப்படி பெயர் & தேதி ஸ்ட்ரிப் கொண்ட புகைப்படம் (20-50KB) மற்றும் கையொப்பம் (10-20KB).',
        href: '/ta/tools/tnpsc-photo-signature-resizer',
        badge: 'முக்கியமானது',
      },
      {
        title: 'புகைப்படம் & கையொப்பம் 20KB வரை குறைப்பான்',
        desc: 'கையொப்பம் மற்றும் சிறு புகைப்படங்களை 10KB முதல் 20KB வரை துல்லியமாக அமுக்கும் கருவி.',
        href: '/ta/tools/compress-image-to-20kb',
        badge: '10–20 KB',
      },
      {
        title: 'புகைப்படம் 50KB வரை குறைப்பான்',
        desc: 'அரசு தேர்வு புகைப்படங்களை தரம் குறையாமல் 20KB முதல் 50KB வரை துல்லியமாக மாற்றலாம்.',
        href: '/ta/tools/compress-image-to-50kb',
        badge: '20–50 KB',
      },
      {
        title: 'புகைப்படம் & கையொப்ப இணைப்பு (Joiner)',
        desc: 'புகைப்படம் மற்றும் கையொப்பத்தை ஒரே படமாக இணைத்து பதிவேற்றும் வசதி.',
        href: '/tools/photo-signature-joiner',
        badge: 'ஒரே படம்',
      },
    ],
  },
  {
    name: 'சான்றிதழ் & அடையாள அட்டை கருவிகள்',
    description: 'ஆதார் பாதுகாப்பு மற்றும் அரசு சான்றிதழ் சரிபார்ப்பு.',
    tools: [
      {
        title: 'ஆதார் அட்டை எண் மறைப்பான் (Mask Aadhaar)',
        desc: 'முதல் 8 எண்களை மறைத்து கடைசி 4 எண்களை மட்டும் காட்டும் UIDAI அங்கீகரித்த முறை.',
        href: '/ta/tools/mask-aadhaar',
        badge: 'பாதுகாப்பு',
      },
      {
        title: 'டிஜிட்டல் கையொப்ப சரிபார்ப்பு (e-Aadhaar / e-Sevai)',
        desc: 'மஞ்சள் கேள்விக்குறியை நீக்கி அதிகாரப்பூர்வ பச்சை நிற டிக் மார்க் சரிபார்க்கும் என்ஜின்.',
        href: '/#upload-zone',
        badge: '100% In-RAM',
      },
      {
        title: 'TN e-Sevai சான்றிதழ் தயாரிப்பு',
        desc: 'வருமானம், சாதி, இருப்பிட சான்றிதழ் விண்ணப்பங்களுக்கான ஆவண அளவு தயாரிப்பு.',
        href: '/tools/tn-esevai-certificate-prep',
        badge: 'e-Sevai',
      },
      {
        title: 'PVC அடையாள அட்டை மேக்கர்',
        desc: 'ஆதார், பான் அட்டை அல்லது வாக்காளர் அட்டையை PVC அட்டை பிரிண்ட் செய்ய தயார் செய்தல்.',
        href: '/tools/pvc-id-card-maker',
        badge: 'A4 பிரிண்ட்',
      },
    ],
  },
  {
    name: 'கல்வி & மதிப்பெண் கால்குலேட்டர்கள்',
    description: 'கல்லூரி சேர்க்கை மற்றும் கட்-ஆஃப் கணக்கீடுகள்.',
    tools: [
      {
        title: 'TNEA பொறியியல் கட்-ஆஃப் கால்குலேட்டர்',
        desc: 'அண்ணா பல்கலைக்கழக கலந்தாய்விற்கான கணிதம், இயற்பியல், வேதியியல் கட்-ஆஃப் 200-க்கு கணக்கிடுதல்.',
        href: '/ta/tools/tnea-cutoff-calculator',
        badge: '2026 Updated',
      },
      {
        title: 'மார்க்ஷீட் PDF இணைப்பு (Merge Marksheets)',
        desc: 'பத்தாம் மற்றும் பன்னிரண்டாம் வகுப்பு மதிப்பெண் பட்டியல்களை ஒரே PDF-ஆக 1MB-க்குள் மாற்றுதல்.',
        href: '/tools/merge-marksheets-pdf',
        badge: '1MB-க்குள்',
      },
    ],
  },
];

export default function TamilToolsPage() {
  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>தமிழ் பயன்பாட்டுக் கருவிகள் கூடம்</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight">
            அனைத்து தமிழ் <span className="text-primary">இணைய கருவிகள்</span>
          </h1>
          <p className="text-sm sm:text-base text-text-main/70 leading-relaxed">
            அரசு தேர்வுகள், மாணவர் சேர்க்கை, அடையாள அட்டை பாதுகாப்பு மற்றும் PDF பணிகளுக்கான அதிவேக இலவச இணையக் கருவிகள்.
          </p>
        </div>

        {/* Ad Placement */}
        <AdSlot slot="in_content" />

        {/* Categories Loop */}
        <div className="space-y-12">
          {CATEGORIES.map((cat, idx) => (
            <section key={idx} className="space-y-4">
              <div className="border-b border-surface-darker pb-3">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  {cat.name}
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  {cat.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {cat.tools.map((tool, tIdx) => (
                  <Link
                    key={tIdx}
                    href={tool.href}
                    className="p-5 rounded-2xl bg-white border border-surface-darker shadow-card hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-light text-primary">
                          {tool.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-text-main/70 leading-relaxed line-clamp-3">
                        {tool.desc}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-primary pt-2 border-t border-surface-darker/60">
                      <span>தொடங்கு</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
