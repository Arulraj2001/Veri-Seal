import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Camera,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Scissors,
  Printer,
  CheckCircle2,
  FileCheck,
  Lock,
  Globe2,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import CollegePhotoStudioEngine from '@/components/tools/CollegePhotoStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'College Admission Photo Sheet Studio (4×6" & A4 Prints) | Kagazo',
  description:
    'Generate 4x6" 8-photo sheets, Combo sheets (Passport + Stamp size), or A4 30-copy prints at 300 DPI with cut lines. Save over ₹120 on admission dossiers. 100% free.',
  keywords: [
    'college admission photo sheet maker 4x6 free',
    'passport and stamp size photo combo sheet online',
    '30 passport photos on a4 sheet online free',
    'print passport photos for college admission free',
    'save money on passport photos print sheet online',
    'tnea counseling passport photo sheet maker',
    'josaa admission photo stamp size combo sheet',
    'neet admit card and college combo photo generator',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/college-admission-photo-maker',
  },
  openGraph: {
    title: 'College Admission Photo Sheet Studio (4×6" & A4 Prints) | Kagazo',
    description:
      'Turn 1 selfie into a 4x6" 8-photo sheet or combo passport + stamp sheet. Print at any studio for ₹5 instead of ₹120.',
    url: 'https://kagazo.in/tools/college-admission-photo-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College Admission Photo Sheet Studio (4×6" & A4 Prints) | Kagazo',
    description:
      'Format 8-photo 4x6" cards, combo passport + stamp sheets, or bulk 30-copy A4 prints for ₹5 with 100% RAM privacy.',
  },
};

const SHEET_LAYOUTS = [
  {
    layoutName: 'College Combo Sheet (4×6" Card)',
    photoBreakdown: '4 Passport Photos (35×45 mm) + 8 Stamp Photos (20×25 mm)',
    bestFor: 'College admission dossiers, library cards & bus passes simultaneously',
    costAtLab: '₹5 to ₹10 (Saves ₹150+)',
  },
  {
    layoutName: 'Standard 8-Photo Sheet (4×6" Card)',
    photoBreakdown: '8 Identical Passport Photos (35×45 mm)',
    bestFor: 'Exam hall admit cards, counseling rounds, semester registrations',
    costAtLab: '₹5 to ₹10 (Saves ₹120+)',
  },
  {
    layoutName: 'Bulk 30-Photo Sheet (A4 Glossy Sheet)',
    photoBreakdown: '30 Identical Passport Photos (35×45 mm)',
    bestFor: 'Multi-college application rounds, scholarship kits & hostels',
    costAtLab: '₹15 to ₹25 (Saves ₹350+)',
  },
];

const FAQS = [
  {
    question: 'What is a Combo Photo Sheet?',
    answer:
      'A Combo Photo Sheet is an exclusive Kagazo layout that tiles 4 Passport Photos (35 × 45 mm) and 8 Stamp Photos (20 × 25 mm) together onto a single standard 4×6" photo card. It satisfies all college admission dossiers that demand both photo types without paying for two separate studio print batches.',
  },
  {
    question: 'How much money does printing a 4×6" sheet save?',
    answer:
      'Photo studios charge ₹80–₹120 for 8 passport photos and another ₹60 for stamp photos. Printing Kagazo’s pre-formatted 4×6" sheet at any local photo lab or digital kiosk costs just ₹5 to ₹10, saving over 90% of the cost.',
  },
  {
    question: 'How do I print the sheet at a local studio or pharmacy?',
    answer:
      'Save the downloaded JPEG file onto a phone or USB drive. Visit any photo studio, print shop, or kiosk (such as CVS, Walgreens, Boots, or local Indian photo labs) and request a standard 4×6 inch photo print on glossy paper.',
  },
  {
    question: 'Can I add my name and date of photo for college counseling?',
    answer:
      'Yes! Many state counseling portals (TNEA, JoSAA, NEET, KCET) request candidate name and date of photograph printed on photos. Toggle the Name & Date option in the studio to embed the official white strip.',
  },
  {
    question: 'What is the resolution of the generated sheets?',
    answer:
      'All sheets are rendered at a true 300 DPI density (1200 × 1800 pixels for a 4×6" card, 2480 × 3508 pixels for an A4 sheet) with embedded JFIF metadata to ensure laboratory-grade sharpness.',
  },
  {
    question: 'Are dashed scissor cutting lines included?',
    answer:
      'Yes. Every photo on the sheet is bordered by faint, high-contrast cutting guides to ensure clean, straight cuts without trimming into your facial portrait.',
  },
  {
    question: 'Can I print on ordinary A4 bond paper with a home printer?',
    answer:
      'While you can print on normal paper for draft forms, admissions boards require photos on glossy photo paper. Select the A4 layout and load 180–220 GSM glossy photo paper into your color inkjet printer.',
  },
  {
    question: 'Can I use these photos for competitive entrance exams?',
    answer:
      'Yes. The passport photos measure exactly 35 × 45 mm, compliant with JEE, NEET, CUET, and state university entrance examinations.',
  },
  {
    question: 'Does Kagazo watermark the downloaded sheets?',
    answer:
      'Never. All downloads are 100% watermark-free, full resolution, and completely free of charge.',
  },
  {
    question: 'Does Kagazo store or sell candidate photos?',
    answer:
      'Never. Kagazo operates with 100% Sovereign In-Browser Privacy. Every pixel is processed locally in your device RAM. Zero bytes are uploaded to external cloud servers.',
  },
];

export default function CollegePhotoMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'College Admission Photo Sheet Studio',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/college-admission-photo-maker',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Generate 4x6" 8-photo sheets, Combo sheets (Passport + Stamp size), or A4 30-copy prints at 300 DPI with cut lines for college admission dossiers.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a College Admission Photo Sheet',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Candidate Portrait',
            text: 'Upload a front-facing selfie or photo taken in bright daylight.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Sheet Layout',
            text: 'Choose Combo 4x6" (Passport + Stamp), 8-Passport 4x6", or Bulk A4 30-Photo.',
          },
          {
            '@type': 'HowToStep',
            name: 'Add Name & Date Banner',
            text: 'Optionally embed candidate name and date of photo for university counseling.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 300 DPI Sheet',
            text: 'Export the high-resolution JPEG gang sheet with scissor cut guides.',
          },
          {
            '@type': 'HowToStep',
            name: 'Print at Lab for ₹5',
            text: 'Order a standard 4x6" print at any lab and cut the photos with scissors.',
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
            name: 'College Admission Photo Sheet',
            item: 'https://kagazo.in/tools/college-admission-photo-maker',
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
          <span className="font-semibold text-text-main">College Admission Photo Sheet</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-extrabold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Save Over ₹120 per Set</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>College Admission Photo Sheet Studio </span>
            <span className="text-primary">(4×6&quot; & A4 Prints)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Turn a single smartphone portrait into an official 8-photo 4×6&quot; card, a Combo sheet
            (4 Passport + 8 Stamp photos), or an A4 30-copy gang sheet for college admissions, university
            counseling, and hostel dossiers. Features automated 300 DPI JFIF injection and dashed scissor cut lines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Passport + Stamp Combo Sheet
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              300 DPI Lab Print Sharpness
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Dashed Cut Margins
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
            <CollegePhotoStudioEngine />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                Why Make Admission Photo Sheets on Kagazo?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    Combo
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Passport + Stamp Combo</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Tiles 4 passport photos and 8 stamp photos on a single 4×6&quot; card for ₹5—saving over
                    ₹150 at cyber cafes.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-3">
                    8
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Standard 8-Photo 4×6&quot;</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Perfect 8-copy passport grid with thin cut lines for standard photo kiosk printing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-3">
                    A4
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Bulk A4 30-Photo Sheet</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Formats 30 high-resolution passport photos on an A4 sheet for multi-college application
                    rounds.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-3">
                    DOP
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Name & Date of Photo</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Embeds candidate name and capture date strip compliant with university admission verification
                    rules.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-3">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Delivers true lab print sharpness without pixelation on standard glossy photo paper.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-3">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Zero uploads. Your personal admission photographs are processed entirely inside volatile
                    RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Sheet Layouts Comparison Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-primary" />
                    Available Admission Sheet Layouts & Photo Yields
                  </h2>
                  <p className="text-sm text-text-main/70 mt-1">
                    Compare capacities, uses, and cost savings across sheet layouts.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                  300 DPI Grids
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-4">Layout Name</th>
                      <th className="py-3 px-4">Photo Breakdown</th>
                      <th className="py-3 px-4">Best Used For</th>
                      <th className="py-3 px-4">Approx Cost at Lab</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {SHEET_LAYOUTS.map((layout, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-text-main whitespace-nowrap">
                          {layout.layoutName}
                        </td>
                        <td className="py-3 px-4 font-medium text-emerald-700">{layout.photoBreakdown}</td>
                        <td className="py-3 px-4 text-text-main/70">{layout.bestFor}</td>
                        <td className="py-3 px-4 font-semibold text-primary">{layout.costAtLab}</td>
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
                Step-by-Step: How to Make Your College Admission Photo Sheet
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Upload Photo</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Upload a front-facing selfie or camera portrait with a neutral facial expression.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Pick Sheet Layout</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Select Combo 4×6&quot; (Passport + Stamp), 8-Passport 4×6&quot;, or Bulk A4 30-Photo sheet.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Name & DOP Strip</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Enter candidate full name and date to generate the official bottom verification strip.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Check White BG</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Verify the background is uniform white (#FFFFFF) with zero room clutter or shadows.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      5
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Download Sheet</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Download the 300 DPI printable JPEG with dashed cutting margins and zero watermarks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      6
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Print for ₹5</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Take the sheet to any local studio or print kiosk. Order a glossy print and cut with scissors.
                  </p>
                </div>
              </div>
            </section>

            {/* Admission Dossier Tips */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Admission Dossier Photo Checklist for Students
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Identity Card & Library Pass
                  </h3>
                  <p className="text-xs text-emerald-800/80 leading-relaxed">
                    Most Indian colleges require 2 stamp photos for library cards and 1 stamp photo for the student ID pass.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Admission Register & Hostel Form
                  </h3>
                  <p className="text-xs text-blue-800/80 leading-relaxed">
                    Admission forms and warden hostel dossiers require standard 35 × 45 mm passport photos. Keep at least 6 copies handy.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    Counseling Verification (DOP)
                  </h3>
                  <p className="text-xs text-purple-800/80 leading-relaxed">
                    For counseling (JoSAA, TNEA, NEET), having your candidate name and date of photo printed helps prevent physical document mix-ups.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  Frequently Asked Questions (College Admission Photo Sheets)
                </h2>
                <p className="text-sm text-text-main/70 mt-1">
                  Everything you need to know about combo sheets, kiosk printing, and university counseling requirements.
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
                  href="/tools/stamp-size-photo-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Stamp Size Photo Maker
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    20×25
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
                  href="/tools/formal-attire-changer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Formal Attire Changer
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    Suit
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
                Gang sheet tiling and photo formatting execute entirely in volatile device memory. Zero photos
                are uploaded to external cloud servers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Combo Sheets
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Bulk A4 30-Copy
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 300 DPI JFIF
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
