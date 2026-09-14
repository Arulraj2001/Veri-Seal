import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Scissors,
  CheckCircle2,
  Sparkles,
  Camera,
  Shirt,
  FileCheck,
  Globe2,
  AlertTriangle,
} from 'lucide-react';
import FormalAttireEngine from '@/components/tools/FormalAttireEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Formal Suit & Attire Changer for Passport Photo | Free Online | Kagazo',
  description:
    'Add formal suits, blazers, neckties, and collared shirts to your passport photo, CV, or exam application. 1-click snap, no Photoshop skills, 100% free RAM privacy.',
  keywords: [
    'formal suit changer for passport photo online free',
    'passport photo coat tie editor free online',
    'change clothes to formal suit for passport photo',
    'blazer suit overlay for resume photo free',
    'formal dress photo editor online no watermark',
    'upsc exam photo formal suit editor',
    'passport photo coat tie maker free',
    'add tie and suit to photo online free',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/formal-attire-changer',
  },
  openGraph: {
    title: 'Formal Suit & Attire Changer for Passport Photo | Free Online | Kagazo',
    description:
      'Add formal dark suits, blazers, and ties to casual selfies for UPSC, SSC, and Passport applications in 1 click.',
    url: 'https://kagazo.in/tools/formal-attire-changer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formal Suit & Attire Changer for Passport Photo | Free Online | Kagazo',
    description:
      'Transform casual selfies into professional formal portraits with dark suits, ties, and blazers. 100% free in-browser privacy.',
  },
};

const ATTIRE_STANDARDS = [
  {
    purpose: 'Indian Passport (Passport Seva Kendra)',
    recommendedAttire: 'Dark collared shirt, blazer, or suit with tie',
    avoidAttire: 'White shirts (blend into background), round-neck t-shirts',
  },
  {
    purpose: 'Government Recruitment (UPSC, SSC, State PSC)',
    recommendedAttire: 'Formal dark suit with tie or collared formal shirt',
    avoidAttire: 'Hoodies, graphic tees, sportswear, low-cut tops',
  },
  {
    purpose: 'US Visa (DS-160) & European Schengen Visa',
    recommendedAttire: 'Smart business attire or dark collared shirt',
    avoidAttire: 'Uniforms, camouflage clothing, high-collar turtle-necks',
  },
  {
    purpose: 'Corporate Resumes & LinkedIn Headshots',
    recommendedAttire: 'Executive tailored blazer, suit jacket, or silk tie',
    avoidAttire: 'Casual selfies, party wear, excessive jewelry',
  },
];

const FAQS = [
  {
    question: 'Why is formal attire recommended for passport and exam photos?',
    answer:
      'While basic civilian clothing is technically permitted, recruitment boards (UPSC, SSC, State PSCs) and corporate recruiters expect professional, collared attire. Round-neck t-shirts and hoodies can create an unprofessional impression during interview shortlisting.',
  },
  {
    question: 'How do I align the suit overlay with my neck?',
    answer:
      'Upload your photo, select your preferred suit or blazer from the wardrobe catalog, and use the zoom, move, and rotate handles to snap the suit collar directly under your chin.',
  },
  {
    question: 'Does the suit changer work for women’s formal wear?',
    answer:
      'Yes! The catalog includes women’s tailored executive blazers, formal blouses, and collared shirts in neutral corporate colors (navy, charcoal, black).',
  },
  {
    question: 'Can I use this photo for my US Visa or Indian Passport?',
    answer:
      'Yes. As long as your face, ears, and neck are clearly visible with a neutral expression and compliant white background, wearing a formal suit overlay conforms to all consular guidelines.',
  },
  {
    question: 'Does Kagazo leave a watermark on the formal portrait?',
    answer:
      'Never. All downloads are 100% free with zero watermarks and full original resolution.',
  },
  {
    question: 'What should I wear in the original photo for best results?',
    answer:
      'Wear a simple collarless t-shirt or V-neck so that your neck and collarbone are open. This makes aligning the formal suit collar effortless and clean.',
  },
  {
    question: 'Can I use this tool for LinkedIn and resume headshots?',
    answer:
      'Absolutely. Over 40% of our users use this tool to create executive headshots for LinkedIn profiles, resume CVs, and company ID badges.',
  },
  {
    question: 'Can I print the resulting photo on a 4×6" passport card?',
    answer:
      'Yes. After applying your suit, take the image into our Passport Photo Maker to generate an 8-photo 4×6" print sheet.',
  },
  {
    question: 'Are any photos stored on Kagazo servers?',
    answer:
      'Never. All processing happens 100% inside your local device RAM. No images leave your device.',
  },
  {
    question: 'Is this tool free on mobile phones?',
    answer:
      'Yes. The interface is optimized for touchscreen mobile browsers, allowing smooth drag-and-scale adjustments on iOS and Android.',
  },
];

export default function FormalAttireChangerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Formal Suit & Attire Changer for Passport Photo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/formal-attire-changer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Add formal dark suits, blazers, and ties to casual selfies for UPSC, SSC, and Passport applications in 1 click.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Add a Formal Suit to Your Passport Photo',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Casual Portrait',
            text: 'Upload a clear selfie or portrait wearing a collarless shirt.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Suit Style',
            text: 'Pick from dark navy business suits, blazers, or formal collared shirts.',
          },
          {
            '@type': 'HowToStep',
            name: 'Align Neckline and Collar',
            text: 'Drag and scale the suit handles to snap the collar right below your chin.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Studio Portrait',
            text: 'Export the high-resolution formal portrait ready for passport or exam upload.',
          },
        ],
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
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Passport & Visa Photo Lab',
            item: 'https://kagazo.in/tools/passport-photo-maker',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Formal Attire Changer',
            item: 'https://kagazo.in/tools/formal-attire-changer',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/40" />
          <Link href="/tools" className="hover:text-primary transition-colors">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/40" />
          <Link
            href="/tools/passport-photo-maker"
            className="hover:text-primary transition-colors"
          >
            Passport & Visa Photo Lab
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/40" />
          <span className="font-semibold text-text-main">Formal Attire Changer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-extrabold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Passport & Exam Approved</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Formal Suit & Attire Changer </span>
            <span className="text-primary">(for Passport Photo & CV)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Transform casual selfies, t-shirts, and hoodies into professional studio portraits by adding
            dark business suits, tailored blazers, neckties, and formal collared shirts. Perfect for
            Indian Passport, UPSC, SSC, banking exams, and professional resumes with zero Photoshop skills required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Men & Women Wardrobe
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              1-Click Collar Snap
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Zero Photoshop Skills
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <Lock className="w-3.5 h-3.5 text-primary" />
              100% In-Browser RAM Privacy
            </span>
          </div>
        </header>

        {/* Main Grid: Tool Engine (9 cols) + Quick Info Sidebar (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Container */}
            <FormalAttireEngine />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                Why Add Formal Attire on Kagazo?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Executive Wardrobe Library</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Selection of dark executive suits, neckties, blazers, and collared shirts calibrated for
                    official headshots.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-3">
                    Snap
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Precision Neckline Snapping</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Intuitive controls to adjust shoulder width, collar height, and angle to match your posture
                    seamlessly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-3">
                    Match
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Natural Shadow Blending</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Realistic fabric textures and collar shading blend naturally onto your neck without sticker
                    cutouts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-3">
                    UPSC
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Exam & Passport Compliant</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Complies with UPSC, SSC, IBPS, and consular portal recommendations for dark collared
                    attire.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-3">
                    0s
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Zero Photoshop Needed</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Achieve professional studio headshot results in 30 seconds directly inside your web browser.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-3">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your photos and biometric headshots are processed entirely inside volatile RAM with zero
                    cloud uploads.
                  </p>
                </div>
              </div>
            </section>

            {/* Dress Code Comparison Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-primary" />
                    Official Photo Dress Code Standards by Portal
                  </h2>
                  <p className="text-sm text-text-main/70 mt-1">
                    Recommended clothing choices for passports, visas, and recruitment examinations.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                  Dress Guidelines
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-4">Portal / Purpose</th>
                      <th className="py-3 px-4">Recommended Attire</th>
                      <th className="py-3 px-4">Attire to Avoid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {ATTIRE_STANDARDS.map((std, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-text-main whitespace-nowrap">
                          {std.purpose}
                        </td>
                        <td className="py-3 px-4 font-medium text-emerald-700">{std.recommendedAttire}</td>
                        <td className="py-3 px-4 text-text-main/70">{std.avoidAttire}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step-by-Step Instructions */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <Camera className="w-6 h-6 text-primary" />
                Step-by-Step: How to Add a Formal Suit to Your Portrait
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Upload Portrait</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Upload a front-facing photo wearing a collarless shirt or t-shirt for clean neck alignment.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Pick Suit Style</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Select from executive navy suits, formal blazers, collared dress shirts, or ties.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Adjust Scale & Neck</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Use handles to scale the shoulders and position the collar right under your chin line.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Balance Colors</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Fine-tune brightness and contrast to match your head lighting with the suit fabric.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      5
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Download Portrait</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Save the formal portrait in high-resolution 300 DPI JPEG format with zero watermarks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      6
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Tile on 4×6&quot; Sheet</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Open our Passport Photo Maker to print 8 physical copies of your new formal photo for ₹5.
                  </p>
                </div>
              </div>
            </section>

            {/* Quality & Alignment Troubleshooting */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Tips for Achieving a Seamless, Realistic Suit Fit
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Tip 1: Wear a Collarless T-Shirt
                  </h3>
                  <p className="text-xs text-blue-800/80 leading-relaxed">
                    If your original photo has a high collar, it may poke out behind the suit lapels. Wear a simple round neck or scoop neck for easiest alignment.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Tip 2: Match Shoulder Width
                  </h3>
                  <p className="text-xs text-blue-800/80 leading-relaxed">
                    Do not make the suit shoulders wider than your natural build. Keep suit width aligned with your actual torso proportion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Tip 3: Straight Upright Posture
                  </h3>
                  <p className="text-xs text-blue-800/80 leading-relaxed">
                    Take your portrait facing straight into the camera. Avoid leaning or tilting sideways for the most natural suit drape.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  Frequently Asked Questions (Formal Suit Changer)
                </h2>
                <p className="text-sm text-text-main/70 mt-1">
                  Everything you need to know about changing attire for passports, resumes, and exams.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 space-y-2">
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

          {/* Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6">
            {/* Quick Actions Rail */}
            <div className="bg-white rounded-3xl border border-surface-darker p-4 sm:p-5 shadow-card space-y-3">
              <span className="text-xs font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Photo Tools
              </span>

              <div className="space-y-1.5">
                <Link
                  href="/tools/passport-white-background"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      White Background
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    White
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Photo Maker
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45
                  </span>
                </Link>

                <Link
                  href="/tools/biometric-face-aligner"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Biometric Face Aligner
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    70–80%
                  </span>
                </Link>

                <Link
                  href="/tools/uscis-photo-checker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      USCIS Photo Checker
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    600px
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Sheet Maker
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    4×6&quot;
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign RAM Privacy Box */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-xs text-text-main/70 leading-relaxed">
                Suit overlays and image composition execute entirely within browser RAM. Zero photos are
                stored or uploaded.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Studio Wardrobe
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Vector Snapping
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Zero Watermarks
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
