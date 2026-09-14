import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Info,
  Sliders,
  Scale,
  Banknote,
  Calculator,
  GraduationCap,
  Award,
  FileCheck2,
  Clock,
  Globe,
  Code2,
  Ruler,
  Coins,
  Heart,
  FileText,
  FileSpreadsheet,
  TrendingUp,
  Building2,
  Languages,
  PenTool,
  Search,
  Fingerprint,
} from 'lucide-react';
import PhotoSheetEngine from '@/components/tools/PhotoSheetEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Passport Photo Sheet Maker Online Free (4x6" & A4) | Kagazo',
  description: 'Generate printable passport photo sheets on 4x6" (6-8 photos) and A4 paper (30-36 photos) online for free. Exact 35x45mm and 2x2" dimensions with cutting crop marks at 300 DPI.',
  alternates: {
    canonical: 'https://kagazo.in/tools/passport-photo-sheet-maker',
  },
  openGraph: {
    title: 'Passport Photo Sheet Maker Online Free (4x6" & A4) | Kagazo',
    description: 'Generate printable passport photo sheets on 4x6" (6-8 photos) and A4 paper (30-36 photos) online for free. Exact 35x45mm and 2x2" dimensions with cutting crop marks at 300 DPI.',
    url: 'https://kagazo.in/tools/passport-photo-sheet-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passport Photo Sheet Maker Online Free (4x6" & A4) | Kagazo',
    description: 'Generate printable passport photo sheets on 4x6" (6-8 photos) and A4 paper (30-36 photos) online for free. Exact 35x45mm and 2x2" dimensions with cutting crop marks at 300 DPI.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Your Photograph",
    "desc": "Upload a front-facing portrait with a clean white or off-white background, neutral expression, and both ears visible."
  },
  {
    "step": 2,
    "title": "Select Photo Size Preset",
    "desc": "Choose your target standard: Indian Passport (35x45mm), US Visa (2x2\" / 51x51mm), or Stamp Size (20x25mm)."
  },
  {
    "step": 3,
    "title": "Choose Paper Sheet Format",
    "desc": "Select 4x6\" (Postcard 10x15cm, most economical for local labs) or standard A4 paper for large quantity batches."
  },
  {
    "step": 4,
    "title": "Customize Borders & Spacing",
    "desc": "Toggle cutting guidelines on or off, and adjust inter-photo padding margins to suit your paper cutting tools."
  },
  {
    "step": 5,
    "title": "Download Print-Ready Sheet",
    "desc": "Export at 300 DPI in high-definition JPEG or PDF format, and print on glossy or matte photo paper at 100% scale."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "PRINTER SCALING ERROR",
    "title": "Enabling \"Fit Picture to Frame\" in Windows",
    "desc": "Windows Photo Viewer automatically checks \"Fit Picture to Frame\", stretching photos and altering biometric head measurements. Always uncheck this box before printing."
  },
  {
    "badge": "WRONG PAPER FINISH",
    "title": "Printing on Normal 80 GSM Copier Paper",
    "desc": "Govt passport offices reject photos printed on ordinary document paper. Always print on 180 to 250 GSM glossy, satin, or semi-gloss photo paper."
  },
  {
    "badge": "RESOLUTION LOSS",
    "title": "Exporting Below 300 DPI",
    "desc": "Printing at 72 or 150 DPI produces visible dot matrix artifacts and jagged edges along facial contours. Our engine enforces strict 300 DPI output."
  },
  {
    "badge": "BACKGROUND TINT",
    "title": "Using Photos with Shadows or Colored Walls",
    "desc": "Passport agencies mandate pure white or uniform light gray backgrounds. Ensure proper lighting behind your head before generating the print sheet."
  }
];

const FAQS = [
  {
    "question": "How much money can I save by printing my own passport photo sheet?",
    "answer": "Traditional photo studios typically charge between \u20b980 and \u20b9150 for a set of 8 passport photos. By generating a 4x6\" sheet with our free tool and printing it at a local photo studio or medical store photo kiosk, the cost is typically just \u20b95 to \u20b910 per print."
  },
  {
    "question": "How many 35x45mm passport photos fit onto a 4x6\" paper sheet?",
    "answer": "A standard 4x6 inch (10x15 cm) photo sheet accommodates either 6 photos (with generous spacing) or 8 photos (in a 2x4 grid) while maintaining exact 35x45mm physical dimensions."
  },
  {
    "question": "How do I print the sheet without altering the photo sizes?",
    "answer": "In your printer settings, set Paper Size to 4x6 in (10x15 cm) or A4, set Page Sizing to \"100%\" or \"Actual Size\", and ensure options like \"Fit to Printable Area\" or \"Shrink to Fit\" are disabled."
  },
  {
    "question": "What type of photo paper should I use?",
    "answer": "Use 200 GSM to 260 GSM Premium Glossy or Semi-Gloss (Satin/Luster) inkjet photo paper. Avoid thin plain copier paper, which absorbs ink and turns limp."
  },
  {
    "question": "Can I make a 2x2 inch sheet for US Visa and DS-160?",
    "answer": "Yes. Select the US Visa (2x2\" / 51x51 mm) preset. On a 4x6\" sheet, it arranges 2 photos side-by-side with official ICAO head height proportions."
  },
  {
    "question": "Are cutting guidelines included on the downloaded sheet?",
    "answer": "Yes. Thin 0.5pt cutting guide borders delineate each photo, making it easy to slice them with a pair of household scissors or a rotary photo trimmer."
  },
  {
    "question": "Does this tool store or upload my photo to any server?",
    "answer": "No. All photo tiling, aspect ratio adjustments, and 300 DPI canvas rendering occur strictly within your web browser memory. Your personal photo never leaves your device."
  },
  {
    "question": "Can I take my photo with a smartphone camera?",
    "answer": "Yes. Stand 4-5 feet away from a white wall in good daylight, hold the camera at eye level, keep a neutral facial expression with your mouth closed, and upload the photo directly."
  },
  {
    "question": "Can I print this sheet at commercial stores like Walgreens, Boots, or local cyber cafes?",
    "answer": "Yes. Save the downloaded 4x6\" JPEG to your smartphone or a USB flash drive. Local cyber cafes, photo studios, or pharmacy print kiosks can print it instantly as a standard postcard print."
  },
  {
    "question": "How many photos fit on an A4 sheet for school or bulk organization use?",
    "answer": "An A4 sheet can hold up to 32 or 36 standard 35x45mm passport photos, making it ideal for schools, coaching centers, sports academies, and corporate HR departments."
  }
];

export default function PassportPhotoSheetMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Passport Photo Sheet Maker Online',
        url: 'https://kagazo.in/tools/passport-photo-sheet-maker',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate printable passport photo sheets on 4x6" (6-8 photos) and A4 paper (30-36 photos) online for free. Exact 35x45mm and 2x2" dimensions with cutting crop marks at 300 DPI.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create Printable Passport Photo Sheets',
        description: 'Step-by-step verified workflow instructions for Passport Photo Sheet Maker Online.',
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
            name: 'Passport Photo Sheet Maker Online',
            item: 'https://kagazo.in/tools/passport-photo-sheet-maker',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">Passport Photo Sheet Maker Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Commercial Photo Lab Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Passport Photo Sheet Maker </span>
            <span className="text-primary">Online Free (4x6" & A4)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate printable passport photo sheets on 4x6" (6-8 photos) and A4 paper (30-36 photos) online for free. Exact 35x45mm and 2x2" dimensions with cutting crop marks at 300 DPI.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <PhotoSheetEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Print Production &amp; Cyber Cafe Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Huge Printing Cost Savings
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Stop paying ₹100-₹150 for 8 studio photos. Print an 8-photo 4x6" sheet at any local photo lab or studio kiosk for just ₹5 to ₹10.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> ICAO 9303 Calibrated Dimensions
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Pre-programmed with verified dimensions for Indian Passport (35x45mm), US Visa (51x51mm / 2x2"), and Schengen Visa with correct head height ratios.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Precision Scissor Cutting Guides
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Includes subtle 0.5pt gray border guidelines and corner tick marks for rapid, straight cuts using standard scissors or rolling paper trimmers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    International Passport Photo Sheet Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative paper standards, print dimensions, and regulatory compliance thresholds:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  ICAO 9303 Biometric Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Paper Size</th><th className="py-2.5 px-3 font-bold">Photo Standard</th><th className="py-2.5 px-3 font-bold">Photos per Sheet</th><th className="py-2.5 px-3 font-bold">Recommended Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">4 x 6 Inches (Postcard / 10x15cm)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">35 x 45 mm (India, UK, Schengen)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">6 or 8 Photos per Sheet</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Instant printing at local photo labs (under ₹10)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">4 x 6 Inches (Postcard / 10x15cm)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2 x 2 Inches / 51x51 mm (US, OIC)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2 or 4 Photos per Sheet</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">US Visa, DS-160, and Canadian Visa</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">5 x 7 Inches (Cabinet Size)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">35 x 45 mm (Standard Passport)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">12 to 15 Photos per Sheet</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cost-effective medium batch printing</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">A4 Sheet (210 x 297 mm)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">35 x 45 mm (Standard Passport)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">30 to 36 Photos per Sheet</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Bulk family, school, or employee badge sets</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">A4 Sheet (210 x 297 mm)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2 x 2 Inches / 51x51 mm</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">12 Photos per Sheet</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Bulk US Visa application batches</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Print Resolution</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">300 DPI Native CMYK/sRGB</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1200 x 1800 px (4x6) / 2480x3508 px (A4)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Razor-sharp facial features and skin tone fidelity</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Create Printable Passport Photo Sheets
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and verified results:
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
                  Common Passport Sheet Printing Errors & Fixes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common paper feed errors, scaling mistakes, and upload rejections:
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

            {/* Strict 10 Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Comprehensive technical, print lab, and operational answers
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  10 Questions Answered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Key Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Photo Sheet Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Resolution</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    300 DPI Native Canvas
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Sheet Formats</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    4x6" (8 photos) / A4 (36)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Presets</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    35x45mm & 2x2" (US Visa)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Cutting Guides</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    0.5 pt Hairline Borders
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% In-RAM Local Processing
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>
              <div className="space-y-1.5">
                <Link
                  href="/tools/a4-multi-card-sheet"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      A4 Multi-Card Sheet
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    A4 Gang
                  </span>
                </Link>
                <Link
                  href="/tools/pvc-id-card-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PVC ID Card Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    CR-80
                  </span>
                </Link>
                <Link
                  href="/tools/aadhaar-front-back-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Aadhaar Front & Back PDF
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Aadhaar
                  </span>
                </Link>
                <Link
                  href="/tools/aadhaar-pan-kyc-merge"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Aadhaar PAN KYC Merge
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    KYC
                  </span>
                </Link>
                <Link
                  href="/tools/driving-license-card-merger"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Driving License Merger
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    DL
                  </span>
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-3 space-y-1.5 text-text-main/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Lock className="w-3.5 h-3.5" />
                <span>100% In-RAM Privacy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-main/70">
                All image cropping, formatting, and high-DPI document rendering occur strictly inside your device browser memory. Zero identity cards or photo scans are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
