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
  Calendar,
  Sparkles,
  AlertTriangle,
  Award,
  Sliders,
  Info,
} from 'lucide-react';
import PhotoDateNameEngine from '@/components/tools/PhotoDateNameEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Exam Photo Name & Date (DOP) Stamper Online Free | SSC & UPSC | Kagazo',
  description:
    'Stamp candidate name and official Date of Photograph (DOP) bottom banner on passport photos for SSC CGL, CHSL, MTS, UPSC Civil Services (10-day rule), and State Police. Chin-safe alignment, 20–50 KB compliant, zero uploads.',
  keywords: [
    'exam photo name and date stamper',
    'add name and date on photo online free',
    'dop on photo generator ssc upsc',
    'upsc photo name and date 10 days rule',
    'ssc cgl photo date name strip',
    'how to print name on passport photo free',
    'date of photograph stamper without photoshop',
    'tnpsc photo name and date strip maker',
    'police exam photo date stamper',
    'passport photo date stamp 2026',
    'exam photo dop strip online',
    'passport size photo name and date maker',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/photo-date-name-stamper',
  },
  openGraph: {
    title: 'Exam Photo Name & Date (DOP) Stamper Online Free | Kagazo',
    description:
      'Avoid rejection: Stamp candidate name & date of photo on passport photos for SSC, UPSC (10-day rule), and State PSCs. Chin-safe alignment, 100% free.',
    url: 'https://kagazo.in/tools/photo-date-name-stamper',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exam Photo Name & Date (DOP) Stamper | SSC & UPSC | Kagazo',
    description:
      'Add Candidate Name and Date of Photograph (DOP) on passport photos for SSC and UPSC. Chin-safe alignment, 20–50 KB compliant, no uploads.',
  },
};

const FAQS = [
  {
    question: 'Why do SSC, UPSC, and State PSCs mandate the Date of Photograph (DOP)?',
    answer:
      'Recruitment boards require the DOP printed directly on the photograph to ensure that applicants submit a recent portrait reflecting their current appearance. This prevents applicants from uploading outdated photos taken years prior, which leads to identity mismatches during exam hall biometric verification and document scrutiny.',
  },
  {
    question: 'What is the UPSC 10-day rule for candidate photographs?',
    answer:
      'Under the updated UPSC Online Recruitment Application (ORA) and OTR instructions, the uploaded photograph must not be more than 10 days old from the date the online application window opens. Both the candidate’s full name and the date on which the photograph was taken must be clearly printed at the bottom of the photograph.',
  },
  {
    question: 'What is the SSC 90-day (3-month) photo date rule?',
    answer:
      'For Staff Selection Commission exams (CGL, CHSL, MTS, GD, CPO), uploaded photographs must be taken not more than 3 months prior to the date of publication of the exam notification. Candidate name in CAPITAL LETTERS and Date of Photograph (DD.MM.YYYY) must be legibly printed on a white strip at the bottom of the photo.',
  },
  {
    question: 'Will the white name strip cover my chin or shirt collar?',
    answer:
      'No. Kagazo features an interactive vertical position slider and zoom control. This lets you position your portrait upward within the 3.5×4.5 cm frame so the bottom banner rests neatly beneath your collar without obscuring your chin or facial contours.',
  },
  {
    question: 'Should the candidate name be written in capital letters?',
    answer:
      'Yes. Official instructions from SSC, UPSC, and State PSCs explicitly recommend printing the candidate’s full name in BLOCK CAPITAL LETTERS, exactly matching the spelling on your 10th standard / Matriculation certificate.',
  },
  {
    question: 'Can I choose between "DOP: DD.MM.YYYY" or just the raw date digits?',
    answer:
      'Yes! Kagazo allows you to toggle between "DOP: DD.MM.YYYY", "DATE: DD/MM/YYYY", "DOP: DD-MM-YYYY", or raw numeric dates. You can also customize the background strip color between pure white (#FFFFFF) and high-contrast dark bars depending on your notification’s guidelines.',
  },
  {
    question: 'What is the official photo dimension and file size standard for stamped exam photos?',
    answer:
      'The standard dimensions are 3.5 cm width by 4.5 cm height (approx 350 × 450 px or 413 × 531 px at 300 DPI). The file size must remain strictly between 20 KB and 50 KB in JPEG/JPG format. Kagazo automatically compresses the output within this permissible boundary.',
  },
  {
    question: 'Can I use this tool for TNPSC One Time Registration (OTR)?',
    answer:
      'Yes. TNPSC OTR requires a white strip at the bottom containing candidate name and photo date. Kagazo’s preset matches the exact TNPSC 3.5×4.5 cm standard and locks file size between 20 KB and 50 KB.',
  },
  {
    question: 'What happens if the date on my photo is older than the allowed period?',
    answer:
      'Recruitment boards conduct automated date parsing and manual scrutiny. If the date printed on your photo is outside the prescribed window (e.g. older than 10 days for UPSC or 90 days for SSC), your application will be summarily rejected without an opportunity for correction.',
  },
  {
    question: 'Are my uploaded photos or personal names stored on your server?',
    answer:
      'Never. All typography rasterization, face panning, and JPEG compression take place 100% inside your browser’s volatile RAM via HTML5 Canvas. Zero bytes leave your device, and all image data is immediately erased when you close or refresh the page.',
  },
];

export default function PhotoDateNameStamperPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Exam Photo Name & Date (DOP) Stamper',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/photo-date-name-stamper',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Stamp candidate name and official Date of Photograph (DOP) bottom banner on passport photos for SSC, UPSC (10-day rule), and State Police exams. Chin-safe alignment, 20–50 KB compliant, zero uploads.',
        featureList: [
          'Candidate Name in Capital Letters bottom strip',
          'Official Date of Photograph (DOP) formatting',
          'UPSC 10-day & SSC 90-day validity presets',
          'Vertical pan and zoom slider to protect chin coverage',
          'Strict 20 KB – 50 KB compression at 300 DPI',
          '100% client-side memory privacy',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Add Name and Date of Photo (DOP) on Passport Photos',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Passport Photo',
            text: 'Select a clear front-facing passport photograph with a light background.',
          },
          {
            '@type': 'HowToStep',
            name: 'Enter Candidate Name & Date',
            text: 'Type your full name in capital letters and select the date of photograph (DOP).',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Face Position',
            text: 'Use the vertical positioning slider to ensure the white strip sits neatly below your chin.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Stamped Photo',
            text: 'Download the verified 300 DPI photo, automatically optimized between 20 KB and 50 KB.',
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kagazo.in/tools' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Exam Photo Name & Date Stamper',
            item: 'https://kagazo.in/tools/photo-date-name-stamper',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
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
          <span className="text-primary font-bold">Exam Photo Name &amp; Date Stamper</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official SSC &amp; UPSC 2026 Guidelines • 10-Day &amp; 90-Day Freshness</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Exam Photo Name &amp; Date </span>
            <span className="text-primary">(DOP)</span>
            <span> Stamper</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Stamp candidate name and official Date of Photograph (DOP) on passport photos for <strong>SSC CGL, CHSL, MTS, UPSC Civil Services (10-day rule)</strong>, and State Police portals. Features chin-safe vertical positioning, sharp vector typography, and automatic 20–50 KB size optimization.
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ UPSC 10-Day Rule Preset',
              '✓ SSC 90-Day Validity Check',
              '✓ Zero Chin Coverage Slider',
              '✓ Strict 20–50 KB Auto-Lock',
              '✓ 100% In-RAM Privacy',
            ].map((tag) => (
              <span
                key={tag}
                className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Freshness Verification</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Real-time indicator checks your photo date against UPSC 10-day and SSC 3-month exam rules.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Zero Chin Coverage</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Interactive vertical position slider ensures the strip never obscures your chin or collar.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">100% In-RAM Privacy</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Zero server uploads. Your photo, name, and date are processed strictly inside browser memory.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PhotoDateNameEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Specifications Cheatsheet */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Official Name &amp; Date Photo Rules Across Recruitment Boards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for online application uploads across central and state recruitment portals.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-surface text-text-main font-bold border-b border-surface-darker">
                      <th className="py-3 px-4">Recruitment Board</th>
                      <th className="py-3 px-4">Mandatory Date Rule</th>
                      <th className="py-3 px-4">Banner Requirement</th>
                      <th className="py-3 px-4">Allowed File Size</th>
                      <th className="py-3 px-4">Dimensions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker font-medium text-text-main/80">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">UPSC Civil Services / NDA</td>
                      <td className="py-3 px-4">Within 10 Days of Application Start</td>
                      <td className="py-3 px-4 font-bold">Name &amp; Date of Photo Printed</td>
                      <td className="py-3 px-4">20 KB to 300 KB</td>
                      <td className="py-3 px-4 font-mono">350×350 to 1000×1000 px</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">SSC (CGL, CHSL, MTS)</td>
                      <td className="py-3 px-4">Within 3 Months (90 Days)</td>
                      <td className="py-3 px-4 font-bold">Name in CAPS + Date of Photo</td>
                      <td className="py-3 px-4">20 KB to 50 KB</td>
                      <td className="py-3 px-4 font-mono">3.5 × 4.5 cm (350×450 px)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">TNPSC (OTR Portal)</td>
                      <td className="py-3 px-4">Within 3 Months of Notification</td>
                      <td className="py-3 px-4">Name + Date of Photo Strip</td>
                      <td className="py-3 px-4">20 KB to 50 KB</td>
                      <td className="py-3 px-4 font-mono">3.5 × 4.5 cm (130×170 px min)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">State Police (UP, Delhi, MP)</td>
                      <td className="py-3 px-4">Within 1 to 3 Months</td>
                      <td className="py-3 px-4">Candidate Name + DOP</td>
                      <td className="py-3 px-4">20 KB to 50 KB</td>
                      <td className="py-3 px-4 font-mono">35 × 45 mm (300 DPI)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Critical Application Warning:</strong> Submitting a photo without a printed date, or with a date older than the mandated freshness window (10 days for UPSC, 90 days for SSC), will result in automatic rejection during preliminary scrutiny without any opportunity for correction.
                </div>
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Step-by-Step: How to Add Name and Date to Your Passport Photo
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
                    Upload Passport Photograph
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Upload a clear front-facing portrait taken against a plain light background. Ensure both ears are visible, eyes look straight into the camera, and no glasses reflect flash glare.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
                    Enter Candidate Name in CAPS
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Type your full name in BLOCK CAPITAL LETTERS exactly as spelled on your 10th standard / Matriculation certificate. Avoid abbreviations unless present on official records.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">3</span>
                    Select Date of Photograph (DOP)
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Choose the date your photo was captured. Use the built-in validator to confirm it falls within the 10-day window for UPSC or 90-day window for SSC notifications.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">4</span>
                    Adjust Face Alignment &amp; Download
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Use the vertical slider to position your face upward so the white banner rests cleanly below your chin and collar. Click Download to receive your pre-compressed 20–50 KB photo.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Errors & Fixes */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common Portal Rejection Errors &amp; Exact Solutions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="font-bold text-xs text-red-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Error: "Photograph without Date of Photograph (DOP)"
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    <strong>Cause:</strong> Uploading a regular passport photo without candidate name and capture date strip on portals requiring explicit DOP verification.
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    <strong>Fix:</strong> Use Kagazo to automatically stamp your name and recent capture date onto a white bottom banner before uploading.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="font-bold text-xs text-red-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Error: "Date of photo is older than prescribed notification window"
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    <strong>Cause:</strong> Stamping a date older than 10 days for UPSC ORA or older than 3 months for SSC applications.
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    <strong>Fix:</strong> Select today's date or a date within the active application period using our 1-click validity presets.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="font-bold text-xs text-red-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Error: "Facial features or chin obscured by banner"
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    <strong>Cause:</strong> Fixed-height banners in simple photo editors cover the candidate's chin or mouth, causing facial recognition failure.
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    <strong>Fix:</strong> Use Kagazo's vertical pan slider to nudge your face upward, leaving ample margin between your chin and the banner.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="font-bold text-xs text-red-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Error: "Photo file size exceeds 50 KB"
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    <strong>Cause:</strong> Adding text in graphic editors exports uncompressed 200 KB – 1 MB files that exceed government portal ceilings.
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    <strong>Fix:</strong> Kagazo applies iterative binary search compression to ensure the final stamped JPEG stays strictly within 20 KB – 50 KB.
                  </p>
                </div>
              </div>
            </section>

            {/* Real World Use Cases */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Recruitment Exam Use Cases
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'UPSC Civil Services & NDA',
                    desc: 'Stamp name and recent date compliant with the strict 10-day freshness rule for ORA and OTR profiles.',
                  },
                  {
                    title: 'SSC CGL, CHSL, MTS & GD',
                    desc: 'Add candidate name in capital letters and DOP within 90 days for SSC examination dossiers.',
                  },
                  {
                    title: 'TNPSC Group 1, 2 & 4 (OTR)',
                    desc: 'Generate the mandatory 3.5×4.5 cm photo with white name and date strip for Tamil Nadu PSC OTR.',
                  },
                  {
                    title: 'State Police Recruitment',
                    desc: 'Compliant name and date stamping for UP Police, Delhi Police Constable, and MP Police Sub-Inspector.',
                  },
                  {
                    title: 'BPSC & UPPSC State PSCs',
                    desc: 'Format candidate portraits for Bihar PSC, Uttar Pradesh PSC, and MPPSC state civil service exams.',
                  },
                  {
                    title: 'Cyber Cafe & CSC Operators',
                    desc: 'Rapidly stamp and format customer application photos in 30 seconds without requiring Adobe Photoshop.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1">
                    <h3 className="text-xs font-bold text-text-main">{item.title}</h3>
                    <p className="text-[11px] text-text-main/70 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy & Security Architecture */}
            <section className="bg-gradient-to-br from-primary-light/40 via-surface to-surface rounded-3xl border border-primary/20 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Lock className="w-5 h-5" />
                <span>Zero Server Uploads: 100% In-Browser Privacy Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                Kagazo processes your passport photograph, full legal name, and capture dates exclusively inside your web browser’s volatile RAM. Using client-side HTML5 Canvas rendering, zero image data is transmitted over the internet or logged on cloud servers. When you close or refresh this tab, all processed data is permanently purged from memory.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-primary">
                <span className="bg-white border border-primary/20 px-2.5 py-1 rounded-full">✓ No Cloud Storage</span>
                <span className="bg-white border border-primary/20 px-2.5 py-1 rounded-full">✓ No Telemetry on Images</span>
                <span className="bg-white border border-primary/20 px-2.5 py-1 rounded-full">✓ Instant RAM Purge</span>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-surface-darker pb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main">Frequently Asked Questions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                    <h3 className="font-bold text-xs sm:text-sm text-text-main flex items-start gap-2">
                      <span className="text-primary font-black">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-5">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      SSC Photo &amp; Sig
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    20–50KB
                  </span>
                </Link>

                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UPSC Photo &amp; Sig
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    10-Day
                  </span>
                </Link>

                <Link
                  href="/tools/signature-cleaner-extractor"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Black Ink Sig Extractor
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    No Lines
                  </span>
                </Link>

                <Link
                  href="/tools/thumb-impression-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Thumb Impression
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    240×240
                  </span>
                </Link>

                <Link
                  href="/tools/tnpsc-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      TNPSC OTR Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    OTR Strip
                  </span>
                </Link>

                <Link
                  href="/tools/specifications"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      All Exam Radar
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    40+ Exams
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
                Photos, candidate names, and capture dates are rendered entirely in client memory. Zero cloud storage.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ SSC 90-Day
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ UPSC 10-Day
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

