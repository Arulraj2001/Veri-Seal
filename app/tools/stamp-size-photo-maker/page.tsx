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
  FileCheck,
  Printer,
  Sparkles,
  AlertTriangle,
  Globe2,
  Layers,
  Scissors,
} from 'lucide-react';
import StampPhotoEngine from '@/components/tools/StampPhotoEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Stamp Size Photo Maker (20×25mm) & NEET 4×6" Postcard | Kagazo',
  description:
    'Create 20x25 mm stamp size photos (16 on 4x6" card) for college/railway passes, or format 4x6" NTA NEET UG admit card postcards with name/DOP. 100% free RAM privacy.',
  keywords: [
    'stamp size photo maker online free 20x25 mm',
    'stamp size photo sheet 16 copies 4x6 print',
    'stamp size photo dimensions in cm and inches',
    'neet 4x6 postcard photo size maker with name and date',
    'railway pass stamp size photo maker free',
    'stamp size photo in pixels 300 dpi',
    'nta neet admit card postcard photo print proforma',
    'college admission stamp size photo combo sheet',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/stamp-size-photo-maker',
  },
  openGraph: {
    title: 'Stamp Size Photo Maker (20×25mm) & NEET 4×6" Postcard | Kagazo',
    description:
      'Print 16 stamp size photos or 4x6" NEET admit card postcard photos for ₹5 at your local lab. 100% free in-browser privacy.',
    url: 'https://kagazo.in/tools/stamp-size-photo-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stamp Size Photo Maker (20×25mm) & NEET 4×6" Postcard | Kagazo',
    description:
      'Generate 16 stamp size photos on a 4x6" card for ₹5 or format NEET UG admit card postcards with candidate name & date.',
  },
};

const PHOTO_FORMAT_SPECS = [
  {
    format: 'Stamp Size Photo (India Standard)',
    dimensions: '20 mm × 25 mm (2.0 × 2.5 cm / 0.8 × 1.0 in)',
    resolution: '236 × 295 px @ 300 DPI',
    typicalUses: 'Railway MST passes, college student IDs, library cards, pension books',
    sheetCapacity: '16 to 24 photos on standard 4×6" card',
  },
  {
    format: 'NTA NEET UG Postcard Photo',
    dimensions: '4" × 6" inches (10.16 × 15.24 cm / 100 × 150 mm)',
    resolution: '1200 × 1800 px @ 300 DPI',
    typicalUses: 'NEET UG examination hall admit card verification annexure',
    sheetCapacity: '1 full 4×6" photo card with Name, Roll No & Date strip',
  },
  {
    format: 'Standard Passport Size Photo',
    dimensions: '35 mm × 45 mm (3.5 × 4.5 cm / 1.38 × 1.77 in)',
    resolution: '413 × 531 px @ 300 DPI',
    typicalUses: 'Passport Seva Kendra, UPSC, SSC, banking exams, visas',
    sheetCapacity: '8 photos on standard 4×6" card',
  },
];

const FAQS = [
  {
    question: 'What is the exact size of a stamp size photo in India?',
    answer:
      'A standard stamp size photo in India measures 20 mm × 25 mm (2.0 cm × 2.5 cm), or approximately 0.8 × 1.0 inches. In digital pixels at 300 DPI, it measures 236 × 295 pixels.',
  },
  {
    question: 'What is the difference between passport size and stamp size photos?',
    answer:
      'A passport size photo measures 35 mm × 45 mm (3.5 × 4.5 cm) and is used for legal travel documents and central government exams. A stamp size photo is much smaller (20 mm × 25 mm) and is used for college IDs, library cards, and railway passes.',
  },
  {
    question: 'How do I print 16 stamp photos for just ₹5?',
    answer:
      'Download Kagazo’s 16-photo 4×6" sheet. Transfer the JPEG to a pendrive or send it to your local digital studio or print kiosk (such as Kodak Express or local cyber cafes) and order a standard 4×6" photo print for ₹5 to ₹10. Cut the 16 photos along the dashed lines.',
  },
  {
    question: 'What is the NEET UG 4×6" postcard photo requirement?',
    answer:
      'NTA NEET UG mandates that every candidate carry a large 4" × 6" (postcard size) photograph with candidate name and date of photograph stamped at the bottom to the examination hall for affixing onto the admit card proforma.',
  },
  {
    question: 'Can I add my Candidate Name and Roll Number on the NEET postcard?',
    answer:
      'Yes! Toggle the "NEET Postcard Proforma" option in the studio controls, enter your full name, roll number, and date of photograph, and the engine will embed the official white bottom banner automatically.',
  },
  {
    question: 'Can I use stamp size photos for government recruitment exams like SSC or UPSC?',
    answer:
      'No. Central exams (SSC, UPSC, RRB) strictly require standard 35 × 45 mm passport photos. Stamp size photos are only accepted on college passes, library registers, and railway season tickets.',
  },
  {
    question: 'What background is required for stamp size photos?',
    answer:
      'A clean, plain white or light off-white background is recommended for maximum clarity on miniature ID card prints.',
  },
  {
    question: 'Does Kagazo downsample image quality when tiling 16 photos?',
    answer:
      'Never. Each of the 16 tiled cells is rendered at full 300 DPI resolution to ensure razor-sharp edges when printed on glossy photo paper.',
  },
  {
    question: 'Can I create a mix of passport and stamp photos on one sheet?',
    answer:
      'Yes! Visit our College Admission Photo Sheet Studio (/tools/college-admission-photo-maker) to create combo sheets containing both passport and stamp photos together.',
  },
  {
    question: 'Are my photographs uploaded to any cloud server?',
    answer:
      'Never. All processing happens 100% in your local browser’s volatile RAM. Zero bytes are uploaded to our servers.',
  },
];

export default function StampSizePhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Stamp Size Photo Maker & NEET Postcard Studio',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/stamp-size-photo-maker',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Tile 16 stamp size photos (20x25 mm) on a 4x6" sheet or format 4x6" NTA NEET UG admit card postcards with name/DOP banners.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Print 16 Stamp Size Photos on a 4x6" Sheet',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Portrait',
            text: 'Select your photo. Kagazo loads the image into local browser memory.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Stamp Size Mode',
            text: 'Select 20x25 mm Stamp Photo or NEET 4x6 Postcard mode.',
          },
          {
            '@type': 'HowToStep',
            name: 'Optional Name & DOP Banner',
            text: 'For NEET, enter candidate name, roll number, and date to generate bottom banner.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 4x6" Print Sheet',
            text: 'Download the 16-photo grid with dashed cutting lines at 300 DPI.',
          },
          {
            '@type': 'HowToStep',
            name: 'Print at Local Studio for ₹5',
            text: 'Order a standard 4x6" glossy print at any lab and cut along the guide lines.',
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
            name: 'Stamp Size Photo Maker',
            item: 'https://kagazo.in/tools/stamp-size-photo-maker',
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
          <Link
            href="/tools/passport-photo-maker"
            className="hover:text-primary transition-colors font-medium"
          >
            Passport &amp; Visa Photo Lab
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Stamp Size Photo Maker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-xs sm:text-sm font-extrabold text-emerald-800 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>16 on 4×6&quot; for ₹5 • 20 × 25 mm &amp; NEET 4×6&quot; Postcard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Stamp Size Photo Maker </span>
            <span className="text-primary">(20×25mm) &amp; NEET Postcard</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Generate official <strong>20 × 25 mm (2 × 2.5 cm)</strong> stamp size photos tiled into a 16-photo 4×6&quot;
            sheet for college IDs and railway passes, or format mandatory <strong>4&quot; × 6&quot; NTA NEET UG</strong>{' '}
            postcard admit card prints with candidate name, roll number, and date stamping.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 16 on 4×6&quot; Sheet
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> NTA NEET 4×6&quot; Postcard Mode
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Lock className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
          </div>
        </header>

        {/* Studio Grid (Main Engine + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Container */}
            <StampPhotoEngine />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Why Create Stamp Size &amp; NEET Photos on Kagazo?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Engineered specifically for Indian institutional guidelines, photo studios, and student budgets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-2.5">
                    16
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">16 Stamp Photos on 4×6&quot;</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically tiles 16 identical stamp photos with scissor cut lines—save ₹100 compared
                    to studio rates.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-2.5">
                    NEET
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">NTA NEET 4×6&quot; Postcard</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Formats your postcard portrait with the mandatory white bottom banner containing Name,
                    Roll No, and Date.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-2.5">
                    20×25
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Standard 20 × 25 mm Lock</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Pre-set dimensions matching Indian Railways (MST tickets), college admission forms, and
                    library passes.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-2.5">
                    ₹5
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Print for ₹5 at Any Lab</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Order a single standard 4×6&quot; photo print at any local digital lab or photo shop for
                    just ₹5 to ₹10.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-2.5">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Delivers ultra-crisp lab print density without blurring or pixelation on glossy photo paper.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-2.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    All photo tiling and sheet generation executes locally in device memory. Zero server uploads.
                  </p>
                </div>
              </div>
            </section>

            {/* Format Specifications Comparison Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Indian Photo Size Comparison (Stamp vs Passport vs NEET Postcard)
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                    Physical dimensions, resolutions, and sheet yields at a glance.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
                  Format Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-3.5">Photo Format</th>
                      <th className="py-3 px-3.5">Physical Dimensions</th>
                      <th className="py-3 px-3.5">Pixel Resolution (300 DPI)</th>
                      <th className="py-3 px-3.5">Typical Application Uses</th>
                      <th className="py-3 px-3.5">Sheet Yield (4×6&quot;)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {PHOTO_FORMAT_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3.5 font-semibold text-text-main whitespace-nowrap">
                          {spec.format}
                        </td>
                        <td className="py-3 px-3.5 font-medium text-emerald-700">{spec.dimensions}</td>
                        <td className="py-3 px-3.5 font-mono text-text-main/80">{spec.resolution}</td>
                        <td className="py-3 px-3.5 text-text-main/70">{spec.typicalUses}</td>
                        <td className="py-3 px-3.5 font-semibold text-primary">{spec.sheetCapacity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step-by-Step Instructions */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Step-by-Step: How to Make Stamp Size &amp; NEET Postcard Photos
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Follow these simple steps to generate print-ready photo cards in seconds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Upload Photo</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Select your front-facing portrait. Image loads in local memory with zero server transfer.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Choose Format</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Select Stamp Size (20×25 mm) or NEET 4×6 Postcard from the mode selector.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Align Face Center</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Scale and pan your face inside the framing guide so eyes and chin are well positioned.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      4
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Name &amp; DOP Banner</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    For NEET UG, enter candidate name, roll number, and date to generate the official bottom strip.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      5
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Download Sheet</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Download the 16-photo 4×6&quot; sheet (or single NEET postcard JPEG) at true 300 DPI.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      6
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Print at Lab for ₹5</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Take the sheet to any local studio or print kiosk. Request a 4×6&quot; print and cut with scissors.
                  </p>
                </div>
              </div>
            </section>

            {/* Application Notes & Troubleshooting */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Important Application Guidelines for Stamp &amp; NEET Photos
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Keep these official rules in mind to avoid rejection during verification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-1.5">
                  <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    NEET Exam Hall Verification
                  </h3>
                  <p className="text-xs text-emerald-800/80 leading-relaxed">
                    The 4×6&quot; postcard photo must be identical to the passport photo uploaded in your NEET application. The invigilator signs across the postcard in the exam hall.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-1.5">
                  <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Railway Pass (MST) Rules
                  </h3>
                  <p className="text-xs text-blue-800/80 leading-relaxed">
                    Indian Railways ticketing counters require 20 × 25 mm stamp size photos. Affix one to the railway identity card and have it counter-stamped by the booking clerk.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/60 space-y-1.5">
                  <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    Combo Sheets for College
                  </h3>
                  <p className="text-xs text-purple-800/80 leading-relaxed">
                    If your college admission requires both passport and stamp photos, use our College Admission Studio to get 4 passport + 8 stamp photos on one ₹5 card.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (Stamp Size &amp; NEET Postcard)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Everything you need to know about stamp size photos, NEET 4×6&quot; postcards, and print sheet savings.
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

          {/* Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6">
            {/* Quick Actions Rail */}
            <div className="bg-white rounded-3xl border border-surface-darker p-4 sm:p-5 shadow-card space-y-3">
              <span className="text-[10px] font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Photo Tools
              </span>

              <div className="space-y-1.5">
                <Link
                  href="/tools/college-admission-photo-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      College Combo Studio
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    Combo
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
              <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-xs text-text-main/70 leading-normal">
                Photo tiling and NEET postcard rendering execute exclusively in local volatile memory. Zero
                files are uploaded to external servers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 16 on 4×6&quot; Card
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ NEET Postcard
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
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
