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
import MultiCardSheetEngine from '@/components/tools/MultiCardSheetEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Multi-Card A4 Gang Sheet Studio (5-in-1 ID Print) | 300 DPI CR-80 | Kagazo',
  description: 'Print up to 10 standard CR-80 ID cards (Aadhaar, PAN, Voter, Driving License) on a single A4 photo sheet. 300 DPI ultra-HD rasterization with calibrated cutting guides for cyber cafes and print studios.',
  alternates: {
    canonical: 'https://kagazo.in/tools/a4-multi-card-sheet',
  },
  openGraph: {
    title: 'Multi-Card A4 Gang Sheet Studio (5-in-1 ID Print) | 300 DPI CR-80 | Kagazo',
    description: 'Print up to 10 standard CR-80 ID cards (Aadhaar, PAN, Voter, Driving License) on a single A4 photo sheet. 300 DPI ultra-HD rasterization with calibrated cutting guides for cyber cafes and print studios.',
    url: 'https://kagazo.in/tools/a4-multi-card-sheet',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-Card A4 Gang Sheet Studio (5-in-1 ID Print) | 300 DPI CR-80 | Kagazo',
    description: 'Print up to 10 standard CR-80 ID cards (Aadhaar, PAN, Voter, Driving License) on a single A4 photo sheet. 300 DPI ultra-HD rasterization with calibrated cutting guides for cyber cafes and print studios.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Identity Cards",
    "desc": "Upload front and back images of Aadhaar, PAN, Voter IDs, School Badges, or Driving Licenses in JPG, PNG, or WebP format."
  },
  {
    "step": 2,
    "title": "Configure Gang Layout",
    "desc": "Select card arrangement: 5 cards (single column with notes) or 10 cards (2x5 compact grid) to match your workflow."
  },
  {
    "step": 3,
    "title": "Adjust Alignment & Margins",
    "desc": "Fine-tune card margins, inter-card gutter spacing, and verify that all micro-text and barcodes remain inside the safe zone."
  },
  {
    "step": 4,
    "title": "Toggle Cutting Lines",
    "desc": "Enable high-contrast corner crop marks and cutting borders to guide clean, straight edge cuts after printing."
  },
  {
    "step": 5,
    "title": "Download 300 DPI Print PDF",
    "desc": "Export your ready-to-print vector PDF or high-resolution JPEG, and print at 100% scale (no scaling) on your photo printer."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "CRITICAL SCALING ERROR",
    "title": "Printer Scaling Set to \"Fit to Page\"",
    "desc": "Enabling \"Fit to Page\" or \"Shrink to Fit\" shrinks CR-80 cards by 5-8%, making them invalid for plastic pouches. Always select \"Actual Size\" or 100% Scale in printer dialog."
  },
  {
    "badge": "IMAGE RESOLUTION DROP",
    "title": "Uploading Low-DPI Smartphone Thumbnails",
    "desc": "WhatsApp-compressed images result in illegible Aadhaar numbers and broken QR codes. Use high-resolution scans or original PDF exports before ganging."
  },
  {
    "badge": "ORIENTATION MISMATCH",
    "title": "Duplex Flip on Short Edge vs Long Edge",
    "desc": "Two-sided printing with wrong flip settings prints the back side upside down. For A4 portrait ID sheets, select \"Flip on Long Edge\" in duplex properties."
  },
  {
    "badge": "PAPER JAM / THICKNESS",
    "title": "Feeding Incorrect Paper Weight Setting",
    "desc": "Heavy 250 GSM photo paper fed under \"Plain Paper\" profile causes head strikes and ink smudging. Set printer media type to \"Heavy Photo Paper\" or \"Glossy Film\"."
  }
];

const FAQS = [
  {
    "question": "What are the exact dimensions of a CR-80 standard card?",
    "answer": "Under ISO/IEC 7810 ID-1 standard, CR-80 cards measure exactly 85.60 mm in width by 53.98 mm in height (3.375 x 2.125 inches) with a corner radius of 3.18 mm. This is the official size used for Aadhaar PVC, PAN cards, Driving Licenses, Voter IDs, and banking credit cards."
  },
  {
    "question": "How many ID cards can fit onto a single A4 sheet?",
    "answer": "A single A4 sheet (210 x 297 mm) can comfortably fit up to 10 standard CR-80 cards arranged in a 2-column by 5-row grid, leaving adequate 3mm gutters for cutting and edge registration marks."
  },
  {
    "question": "How do I prevent my printer from shrinking the cards during printing?",
    "answer": "In your operating system or PDF reader print dialog (e.g., Adobe Acrobat, Google Chrome, Epson Print), locate Page Scaling or Page Sizing options and select \"Actual Size\" or set Custom Scale strictly to 100%. Never select \"Fit\", \"Shrink oversized pages\", or \"Scale to fit printable area\"."
  },
  {
    "question": "What paper thickness is recommended for ID card printing?",
    "answer": "For professional card lamination, we recommend 180 to 250 GSM Cast Coated Glossy or Semi-Gloss photo paper. For direct pouch lamination without thick plastic cores, 200 GSM inkjet photo paper provides superior rigidity and optical clarity."
  },
  {
    "question": "Will the barcodes and QR codes on Aadhaar and PAN remain readable?",
    "answer": "Yes. Our rendering engine processes your uploaded images at a pristine 300 DPI native raster resolution, preserving crisp binary contrast so handheld 2D QR scanners and smartphone verification apps scan them instantly."
  },
  {
    "question": "Can I print front and back sides together on the same sheet?",
    "answer": "Yes. You can upload front and back pairs side-by-side or stacked in 5 pairs per sheet. When printed and laminated, you simply fold or place them back-to-back inside the lamination pouch for an authentic two-sided card."
  },
  {
    "question": "Does this tool upload my customer ID cards to remote servers?",
    "answer": "No. Multi-Card A4 Gang Sheet Studio operates 100% client-side in your local browser RAM using HTML5 Canvas and WebAssembly. No identity photos, document scans, or personal records are ever transmitted over the network."
  },
  {
    "question": "Which photo printers work best for A4 gang printing?",
    "answer": "Standard continuous ink supply system (CISS) photo printers such as Epson EcoTank L805, L850, L8050, L3250, Canon Pixma G570, G670, and HP Smart Tank printers provide exceptional color fidelity and low per-sheet printing costs."
  },
  {
    "question": "What is the purpose of the cutting marks included on the sheet?",
    "answer": "The fine 0.5pt corner guidelines show the exact bounding perimeter of each CR-80 card. Aligning your metal safety ruler or paper trimmer with these marks guarantees perfectly straight, uniform card dimensions without measuring."
  },
  {
    "question": "Can I print school student IDs or employee badges with this tool?",
    "answer": "Yes. Any badge conforming to the CR-80 format (landscape or portrait) can be arranged into the gang sheet for high-volume classroom, factory, or corporate credential printing."
  }
];

export default function MultiCardSheetPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Multi-Card A4 Gang Sheet Studio',
        url: 'https://kagazo.in/tools/a4-multi-card-sheet',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Print up to 10 standard CR-80 ID cards (Aadhaar, PAN, Voter, Driving License) on a single A4 photo sheet. 300 DPI ultra-HD rasterization with calibrated cutting guides for cyber cafes and print studios.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate Multi-Card A4 Gang Sheets',
        description: 'Step-by-step verified workflow instructions for Multi-Card A4 Gang Sheet Studio.',
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
            name: 'Multi-Card A4 Gang Sheet Studio',
            item: 'https://kagazo.in/tools/a4-multi-card-sheet',
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
          <span className="text-primary font-bold">Multi-Card A4 Gang Sheet Studio</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>CSC & Cyber Cafe Production Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Multi-Card A4 Gang Sheet </span>
            <span className="text-primary">300 DPI Print Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Print up to 10 standard CR-80 ID cards (Aadhaar, PAN, Voter, Driving License) on a single A4 photo sheet. 300 DPI ultra-HD rasterization with calibrated cutting guides for cyber cafes and print studios.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <MultiCardSheetEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Zero-Waste Gang Printing
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Maximize paper yield by combining up to 10 identity cards on a single A4 photo paper sheet, reducing printing costs by over 80%.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 300 DPI Hairline Precision
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Hardware-accelerated client-side canvas rendering guarantees 1:1 true-size CR-80 output without blurry interpolation or edge clipping.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Calibrated Cutting Guides
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Integrated 0.5pt dashed cutting marks and center registration lines allow effortless manual scissors or stack paper guillotine slicing.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    A4 Gang Sheet & CR-80 Printing Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative paper standards, print dimensions, and regulatory compliance thresholds:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  ISO/IEC 7810 ID-1 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">Official Standard</th><th className="py-2.5 px-3 font-bold">Cyber Cafe Specification</th><th className="py-2.5 px-3 font-bold">Notes & Tolerance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Card Dimensions</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">85.60 mm x 53.98 mm</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CR-80 Standard Credit Card Size</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">±0.1 mm precision cutting allowance</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Paper Sheet Format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">210 mm x 297 mm</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">International ISO A4 Standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Available in 180-260 GSM Glossy/Matte</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Grid Capacity</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2 Columns x 5 Rows</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Up to 10 Cards per Single A4 Page</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">5 Front/Back pairs or 10 unique IDs</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Print Resolution</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">300 DPI Standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2480 x 3508 Pixels (A4 Canvas)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Razor-sharp barcode & micro-text reproduction</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cutting Guidelines</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">0.5 pt Fine Hairline</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Corner Crop & Edge Registration Marks</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Prevents scissors/guillotine misalignment</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Color Space</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">sRGB / Calibrated CMYK</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">32-Bit Deep Color Pipeline</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rich blacks and natural skin tones</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate Multi-Card A4 Gang Sheets
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
                  Common A4 ID Gang Printing Mistakes & Fixes
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
                A4 Gang Specifications
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    ISO/IEC 7810 ID-1 (CR-80)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Canvas Size</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    210 x 297 mm (300 DPI)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Max Cards</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    10 Cards (2x5 Gang Grid)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Cutting Marks</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    0.5 pt Precision Hairlines
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Security</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% Client-Side In-RAM
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
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Photo Sheet
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Photos
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
