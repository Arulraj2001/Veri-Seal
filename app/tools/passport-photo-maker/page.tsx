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
  CheckCircle2,
  Printer,
  FileCheck,
  AlertTriangle,
  Globe2,
  Sparkles,
  Layers,
  Scissors,
} from 'lucide-react';
import { PassportPhotoStudioEngine } from '@/components/tools/PassportPhotoStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Passport Photo Maker Online Free (35×45mm & 2×2") | 4×6 Print Sheet | Kagazo',
  description:
    'Create official passport size photos online free for Indian Passport (35x45 mm, 300 DPI), US Visa (2x2"), UK & Schengen. 8-photo 4x6" print sheet, 100% free RAM privacy.',
  keywords: [
    'passport photo maker online free',
    'indian passport photo size 35x45 mm online',
    'passport size photo maker with 4x6 print sheet',
    'us visa photo maker 2x2 online free',
    'passport seva photo resizer 20 to 50 kb',
    'schengen visa photo 35x45 free',
    'uk passport photo hmpo 35x45 online',
    'passport photo background to white free',
    'create 8 passport photos on 4x6 sheet free',
    'passport photo maker at home mobile',
    'canadian passport photo 50x70 online',
    'official biometric passport photo creator',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/passport-photo-maker',
  },
  openGraph: {
    title: 'Passport Photo Maker Online Free (35×45mm & 2×2") | Kagazo',
    description:
      'Generate compliant 35x45mm Indian passport & international visa photos at 300 DPI with printable 4x6 sheet. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/passport-photo-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passport Photo Maker Online Free (35×45mm & 2×2") | Kagazo',
    description:
      'Create official 35x45mm Indian passport & 2x2" visa photos with printable 4x6 sheets. 100% free in-browser RAM privacy.',
  },
};

const COUNTRY_SPECS = [
  {
    country: 'Indian Passport (Passport Seva / MEA)',
    dims: '35 mm × 45 mm (413 × 531 px)',
    faceRatio: '70%–80% (25 mm to 35 mm)',
    bg: 'Pure Plain White',
    onlineSize: '20 KB to 50 KB (300 DPI)',
    route: '/tools/passport-photo-maker',
  },
  {
    country: 'United States (Passport / DS-160 / DV Lottery)',
    dims: '2" × 2" (51 × 51 mm / 600 × 600 px)',
    faceRatio: '50%–69% (1" to 1 3/8")',
    bg: 'Plain White or Off-White',
    onlineSize: '10 KB to 240 KB (300 DPI)',
    route: '/tools/us-passport-photo',
  },
  {
    country: 'United Kingdom (HMPO / British Visa)',
    dims: '35 mm × 45 mm (413 × 531 px)',
    faceRatio: '29 mm to 34 mm (Crown to Chin)',
    bg: 'Light Grey or Plain Cream',
    onlineSize: '50 KB to 10 MB (300 DPI)',
    route: '/tools/uk-passport-photo',
  },
  {
    country: 'Schengen Visa (France, Germany, 29 EU States)',
    dims: '35 mm × 45 mm (413 × 531 px)',
    faceRatio: '70%–80% (32 mm to 36 mm)',
    bg: 'Uniform Light Grey / Neutral',
    onlineSize: '30 KB to 150 KB (300 DPI)',
    route: '/tools/schengen-visa-photo',
  },
  {
    country: 'Canada (Passport / PR Card / Express Entry)',
    dims: '50 mm × 70 mm (591 × 827 px)',
    faceRatio: '31 mm to 36 mm (Chin to Crown)',
    bg: 'Pure White or Light-Coloured',
    onlineSize: '60 KB to 4 MB (300 DPI)',
    route: '/tools/canadian-passport-photo',
  },
  {
    country: 'Australia (Passport / eVisitor Visa)',
    dims: '35 mm × 45 mm (413 × 531 px)',
    faceRatio: '32 mm to 36 mm (Chin to Crown)',
    bg: 'Plain White or Light Grey',
    onlineSize: 'Max 2 MB (300 DPI)',
    route: '/tools/passport-photo-maker',
  },
];

const FAQS = [
  {
    question: 'What are the official photo requirements for Indian Passport (Passport Seva Kendra)?',
    answer:
      'For Indian passport applications through Passport Seva Kendra (PSK) or overseas missions (VFS / BLS), the photograph must measure 35 × 45 mm (width × height) at 300 DPI (413 × 531 pixels). The background must be pure plain white with zero shadows or borders, and the face must occupy 70% to 80% of the picture height (25 mm to 35 mm from chin to crown of head).',
  },
  {
    question: 'How does printing a 4×6" photo sheet save money at local studios or print kiosks?',
    answer:
      'Photo studios and cyber cafes typically charge ₹80 to ₹150 for 8 passport photos. When you download Kagazo’s printable 4×6" sheet (tiling 8 identical 35×45 mm photos with scissor cutting lines), you can print it as a standard 4×6" glossy photo print at any local digital studio or photo kiosk for just ₹5 to ₹10, saving over 90% of the cost!',
  },
  {
    question: 'Can I take a compliant passport photo with my smartphone at home?',
    answer:
      'Yes! Stand 3 to 4 feet away from a plain white or light wall in bright, even daylight. Look straight into the camera lens with a neutral expression and mouth closed. Avoid selfies as wide-angle front phone lenses distort facial features. Upload the photo to Kagazo, align your face within the biometric guide, and download.',
  },
  {
    question: 'Are eyeglasses allowed in passport and visa photos?',
    answer:
      'Under current MEA India, U.S. Department of State, and international ICAO rules, eyeglasses and spectacles are strictly prohibited in passport photos to prevent flash reflection and eye obstruction. Only medically certified exemptions signed by a physician are accepted.',
  },
  {
    question: 'Can I add Candidate Name and Date of Photo (DOP) for exam portal uploads?',
    answer:
      'Yes! Many recruitment bodies (UPSC, SSC, State Police, Railway RRB) mandate that the applicant name and date the photo was taken (DOP) be printed on a clear white strip at the bottom of the photo. Simply toggle the "Add Name & Date Strip" option in the studio controls.',
  },
  {
    question: 'Can I smile in my passport photo?',
    answer:
      'Consular authorities mandate a neutral facial expression with both eyes open, looking directly into the camera, and mouth closed. Smiling that shows teeth, squinting, or frowning causes automated biometric facial matching errors at airport e-Gates.',
  },
  {
    question: 'What clothing should I wear for a passport photo?',
    answer:
      'Wear dark, everyday clothing (such as a navy blue, black, or dark grey collared shirt) that contrasts sharply against the white background. Avoid white shirts (which blend into the background), uniforms, camouflage, and low-cut tops.',
  },
  {
    question: 'Are religious head coverings like turbans or hijabs allowed?',
    answer:
      'Yes, religious headgear is permitted if worn daily for religious beliefs, provided the face from the bottom of the chin to the top of the forehead and both facial edges remain completely visible without shadows.',
  },
  {
    question: 'Can I create visa photos for the US, UK, Schengen, and Canada using this tool?',
    answer:
      'Yes! Kagazo includes a multi-country preset switcher. You can switch to US Visa / DS-160 (2×2 inch, 600×600 px), UK Passport (35×45 mm, light grey background), Schengen Visa (35×45 mm, 70–80% face ratio), Canadian Passport / PR (50×70 mm), Australia, or Singapore with 1 click.',
  },
  {
    question: 'Are my biometric photos uploaded or stored on your servers?',
    answer:
      'Never. Kagazo guarantees 100% In-Browser Sovereign Privacy. Every crop, aspect ratio recalculation, DPI header injection, and sheet generation executes entirely within your browser’s local volatile RAM memory. Zero bytes leave your device.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Capture Frontal Portrait",
    "desc": "Take a well-lit photo against a plain light wall looking straight into the camera."
  },
  {
    "step": 2,
    "title": "Select Country Standard",
    "desc": "Choose Indian Passport (35x45 mm), US Visa (2x2 in), UK, Schengen, or Canada."
  },
  {
    "step": 3,
    "title": "Align Biometric Caliper",
    "desc": "Position your crown and chin inside the 70%\u201380% biometric guideline calipers."
  },
  {
    "step": 4,
    "title": "Instant 300 DPI Injection",
    "desc": "Our engine embeds 300 DPI binary JFIF headers in client-side browser RAM."
  },
  {
    "step": 5,
    "title": "Download Photo or 4x6\" Sheet",
    "desc": "Save verified digital JPEG or download the 8-photo 4x6\" sheet for \u20b95 printing."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Rejection: Face Proportion Out of Bounds",
    "title": "Head Coverage Below 70% or Above 80%",
    "desc": "MEA India and ICAO mandate 25mm to 35mm head height. Kagazo calipers enforce exact framing."
  },
  {
    "badge": "Rejection: Shadows on Background",
    "title": "Dark Wall Gradients or Ear Shadows",
    "desc": "Passport Seva Kendra mandates plain white background with zero shadows or patterns."
  },
  {
    "badge": "Rejection: Eyeglasses & Reflections",
    "title": "Glasses Prohibited by Consular Guidelines",
    "desc": "Wearing spectacles triggers automated refusal due to lens glare and iris blockage."
  },
  {
    "badge": "Rejection: Low Resolution 72 DPI File",
    "title": "Browser Default 72 DPI Header Rejected",
    "desc": "Embassy scanners require true 300 DPI. Kagazo writes 0x012C density markers."
  }
];

export default function PassportPhotoMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Passport Photo Maker Online Free',
        url: 'https://kagazo.in/tools/passport-photo-maker',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Official 35x45mm Indian passport photo maker and international visa photo creator with 300 DPI JFIF output and printable 4x6 sheets.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Make an Official Passport Photo Online in 5 Steps',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kagazo.in/tools' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Passport Photo Maker',
            item: 'https://kagazo.in/tools/passport-photo-maker',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Passport Photo Maker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>ICAO Doc 9303 &amp; Passport Seva Kendra Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Passport Photo Maker </span>
            <span className="text-primary">Online Free (35×45mm &amp; 2×2&quot;)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Create biometric passport photos for <strong>Passport Seva Kendra (35×45 mm)</strong>,{' '}
            <strong>US Visa (2×2&quot;)</strong>, <strong>UK</strong>, <strong>Canada</strong>, and{' '}
            <strong>Schengen</strong>. Automatically injects 300 DPI JFIF headers, enforces face
            alignment guidelines, and generates printable 4×6&quot; sheets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-primary" /> MEA Passport Seva Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Printer className="w-4 h-4 text-primary" /> Printable 4×6&quot; 8-Photo Card
            </span>
          </div>
        </header>

        {/* Studio Grid (Main Engine + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Engine */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PassportPhotoStudioEngine
              defaultCountryId="india-passport"
              toolHeading="Passport &amp; Visa Photo Studio"
              toolSubheading="Upload your selfie or camera portrait to crop to official 35×45mm or 2×2 inch dimensions with 300 DPI print sheets."
            />

            {/* Post Download Ad Slot */}
            <AdSlot slot="post_download" />

            
            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Consular Studio Presets
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Official MEA India, US Visa &amp; International ICAO Standards
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Over 30% of online visa and passport applications are rejected due to incorrect aspect ratios, shadows, or invalid DPI metadata. Kagazo enforces exact millimeter framing with in-browser RAM privacy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> True 300 DPI JFIF
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Embeds authentic 0x012C density tags into JPEG binary headers to clear automated consular scanners.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 4×6" Printable Sheets
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Tiles 8 identical passport photos with millimeter cut guides to print at any kiosk for ₹5.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your biometric facial photograph is processed purely in local device RAM with zero cloud uploads.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Official Passport Photo Specifications Cheatsheet
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for online government portals and physical application centers.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Authority / Country</th>
                      <th className="p-3.5">Dimensions</th>
                      <th className="p-3.5">Resolution</th>
                      <th className="p-3.5">Background</th>
                      <th className="p-3.5">Head Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">India (Passport Seva Kendra)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">Plain White</td>
                      <td className="p-3.5">60%–70% of frame</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">US Visa (DS-160 / USCIS)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        2 × 2 in (600×600 px)
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">White / Off-White</td>
                      <td className="p-3.5">50%–69% of frame</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">United Kingdom (HM Passport)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">Light Grey / Cream</td>
                      <td className="p-3.5">29–34 mm (64%–75%)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Schengen Visa (Europe)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">Light Grey / White</td>
                      <td className="p-3.5">70%–80% of frame</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Canada (IRCC Passport &amp; PR)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">50 × 70 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">Plain White</td>
                      <td className="p-3.5">31–36 mm (44%–51%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            

            
            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Make an Official Passport Photo Online in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for guaranteed consular acceptance:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{step.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Common Passport Photo Rejections and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common passport photo mistakes that trigger application rejection:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about passport photos, print sheets, and portal rules.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                    <h3 className="text-sm font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-mono text-xs mt-0.5">0{index + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/75 pl-5 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar Rail (xl:col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4">
            {/* Quick Actions Rail */}
            <div className="bg-white rounded-2xl border border-surface-darker p-3 shadow-card space-y-2">
              <span className="text-[10px] font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Photo Studios
              </span>

              <div className="space-y-1">
                <Link
                  href="/tools/passport-white-background"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      White Background
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    White
                  </span>
                </Link>

                <Link
                  href="/tools/remove-background"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Full-HD Background Remover
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    4K
                  </span>
                </Link>

                <Link
                  href="/tools/uscis-photo-checker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      USCIS Photo Checker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    US
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change Image DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    DPI
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Sheet Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    4×6&quot;
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Your biometric photographs are cropped and processed exclusively in client-side volatile
                RAM. Never stored or logged.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 300 DPI JFIF
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 35×45 mm / 2×2&quot;
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
