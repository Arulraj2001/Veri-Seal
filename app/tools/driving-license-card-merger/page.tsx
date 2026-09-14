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
import CardMergerEngine from '@/components/tools/CardMergerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Driving License Front & Back Merger to Single Page PDF (Under 200KB) | Parivahan Sarathi | Kagazo',
  description: 'Merge smart card Driving License front and back onto a single page PDF under 200KB for Parivahan Sarathi, RTO renewals, insurance claims, and vehicle rentals. High contrast, crisp chip detail, and 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/driving-license-card-merger',
  },
  openGraph: {
    title: 'Driving License Front & Back Merger to Single Page PDF (Under 200KB) | Parivahan Sarathi | Kagazo',
    description: 'Merge smart card Driving License front and back onto a single page PDF under 200KB for Parivahan Sarathi, RTO renewals, insurance claims, and vehicle rentals. High contrast, crisp chip detail, and 100% client-side privacy.',
    url: 'https://kagazo.in/tools/driving-license-card-merger',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driving License Front & Back Merger to Single Page PDF (Under 200KB) | Parivahan Sarathi | Kagazo',
    description: 'Merge smart card Driving License front and back onto a single page PDF under 200KB for Parivahan Sarathi, RTO renewals, insurance claims, and vehicle rentals. High contrast, crisp chip detail, and 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Front Side of DL",
    "desc": "Upload front image showing your photograph, digital signature, DL number, date of birth, and validity dates."
  },
  {
    "step": 2,
    "title": "Upload Back Side of DL",
    "desc": "Upload back image displaying authorized vehicle categories (MCWG, LMV), permanent address, and RTO authority code."
  },
  {
    "step": 3,
    "title": "Select Sheet Layout",
    "desc": "Choose Side-by-Side (Horizontal Xerox style) or Top-Bottom Stacked format with optional card borders."
  },
  {
    "step": 4,
    "title": "Optimize Compression & Size",
    "desc": "Ensure target file size is set to Under 200KB to guarantee instant acceptance on Parivahan Sarathi."
  },
  {
    "step": 5,
    "title": "Download Single-Page PDF",
    "desc": "Export your merged document ready to upload to RTO service portals, motor insurance claim desks, or car rental platforms."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "SARATHI ERROR #1",
    "title": "Uploading Front Side Only",
    "desc": "RTO portals require verification of vehicle class endorsements (LMV, MCWG, TRANS) located exclusively on the back side. Submitting only front causes application rejection."
  },
  {
    "badge": "FILE OVER 200KB",
    "title": "Exceeding 200KB Portal Attachment Size",
    "desc": "Parivahan Sarathi server refuses file attachments exceeding 200KB. Use our automated slider to compress the unified sheet down to 150KB."
  },
  {
    "badge": "HOLOGRAPHIC FLASH GLARE",
    "title": "Camera Flash Glare Blinding DL Number",
    "desc": "Smart card optical holograms reflect camera flash directly into the lens, obscuring the DL number. Take photo under diffused overhead room lighting."
  },
  {
    "badge": "INCORRECT ORIENTATION",
    "title": "Back Side Uploaded Inverted / Sideways",
    "desc": "Uploading upside-down or sideways images prevents automated OCR verification by RTO systems. Use our 90-degree rotate tool before merging."
  }
];

const FAQS = [
  {
    "question": "Why do I need to merge both sides of my Driving License onto one PDF?",
    "answer": "The Parivahan Sarathi online portal, State RTO web portals, and vehicle insurance companies only allocate a single upload field for \"Proof of Driving License\". Both the front (identity & validity) and back (vehicle classes & endorsements) must be present on that single file."
  },
  {
    "question": "What is the maximum allowed file size on Parivahan Sarathi?",
    "answer": "Parivahan Sarathi typically enforces a strict maximum file size of 200 KB (or 500 KB in certain state RTO instances) for PDF and JPEG uploads. Our merger guarantees output files between 120KB and 180KB."
  },
  {
    "question": "Can I use this merged PDF for motor insurance claims?",
    "answer": "Yes. Leading insurance providers (Digit, Acko, ICICI Lombard, Bajaj Allianz, New India Assurance) require a clear single-page document showing both sides of the driver's license during accident and third-party claims."
  },
  {
    "question": "What vehicle class endorsements are shown on the back side?",
    "answer": "The back side lists vehicle entitlement categories such as MCWOG (Motorcycle Without Gear), MCWG (Motorcycle With Gear), LMV (Light Motor Vehicle - Cars), LMV-TR, or TRANS (Commercial Transport), along with their authorization dates."
  },
  {
    "question": "Is it safe to merge my Driving License on this tool?",
    "answer": "Yes. Your document images are processed entirely in client-side browser memory (RAM). Nothing is uploaded, saved, or analyzed on any external cloud server."
  },
  {
    "question": "Can I merge an older laminated paper DL or only new Smart Cards?",
    "answer": "You can merge any driving license format\u2014including newer microprocessor smart cards, digital Sarathi mParivahan/DigiLocker screenshots, or older booklet-style paper licenses."
  },
  {
    "question": "Can I download the output as an image instead of a PDF?",
    "answer": "Yes. In addition to a single-page PDF, you can export the merged canvas as a high-resolution JPEG or PNG file under 200KB."
  },
  {
    "question": "Will this document be accepted by self-drive car rental companies?",
    "answer": "Yes. Self-drive car rental services (Zoomcar, Revv, Myles) and airport rental agencies accept this single-sheet document for quick digital KYC onboarding."
  },
  {
    "question": "How do I ensure the DL number and chip details remain sharp?",
    "answer": "Keep the resolution set to 200 or 300 DPI and enable the contrast boost toggle. This preserves sharp edges around embossed text, the smart chip, and barcode strips."
  },
  {
    "question": "Can I print this single-page PDF on regular paper?",
    "answer": "Yes. The document is formatted for standard A4 paper. Printing at 100% scale yields exact 1:1 true-size replicas of your smart card suitable for offline submission."
  }
];

export default function DrivingLicenseCardMergerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Driving License Front & Back Merger',
        url: 'https://kagazo.in/tools/driving-license-card-merger',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Merge smart card Driving License front and back onto a single page PDF under 200KB for Parivahan Sarathi, RTO renewals, insurance claims, and vehicle rentals. High contrast, crisp chip detail, and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Merge Driving License Front & Back into One PDF',
        description: 'Step-by-step verified workflow instructions for Driving License Front & Back Merger.',
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
            name: 'Driving License Front & Back Merger',
            item: 'https://kagazo.in/tools/driving-license-card-merger',
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
          <span className="text-primary font-bold">Driving License Front & Back Merger</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Parivahan Sarathi & RTO Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Driving License Front & Back </span>
            <span className="text-primary">Single Page PDF (Under 200KB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Merge smart card Driving License front and back onto a single page PDF under 200KB for Parivahan Sarathi, RTO renewals, insurance claims, and vehicle rentals. High contrast, crisp chip detail, and 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <CardMergerEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Parivahan Sarathi Calibrated
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Pre-configured to satisfy Ministry of Road Transport and Highways (MoRTH) upload limits for license renewals and address changes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Smart Chip & QR Contrast Retention
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Adaptive edge enhancement highlights metallic chip contacts, optical holograms, and 2D barcode lines without dark pixel clipping.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Instant Client-Side Compilation
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Combines smart card photos in under 500 milliseconds directly inside browser memory without sending private credentials to servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Parivahan Sarathi & Smart Card DL Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative paper standards, print dimensions, and regulatory compliance thresholds:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  MoRTH Smart Card Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">Official Standard</th><th className="py-2.5 px-3 font-bold">Parivahan Upload Limit</th><th className="py-2.5 px-3 font-bold">Verification Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Smart Card Format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO/IEC 7816 Microprocessor Card</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CR-80 Standard (85.6 x 53.98 mm)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Optical smart chip & QR code visible</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">File Format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Portable Document Format (PDF)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Single-page PDF or JPEG</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Multi-page attachments rejected</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Maximum File Size</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Under 200 KB (or 500 KB)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strict 200 KB cap on Sarathi RTO</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Optimal file weight: 120 KB - 180 KB</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Front Information</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Name, DL No, Photo, Validity, DOB</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Clear portrait and blood group</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Must match Sarathi database records</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Back Information</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Vehicle Classes (MCWG, LMV, HGMV)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Endorsement dates & emergency contact</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Address and issuing authority stamp</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Visual Clarity</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">200 - 300 DPI Native Contrast</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero lens blur on dates & badge no.</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High-contrast monochrome or full color</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Merge Driving License Front & Back into One PDF
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
                  Common Driving License Upload Errors & Fixes
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
                Driving License Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    MoRTH Smart Card (CR-80)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Target Size</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Strictly Under 200 KB (Sarathi)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Resolution</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    200 - 300 DPI Clear Raster
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Sides Merged</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Front (Photo) + Back (Class)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Security</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% In-RAM Local Execution
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
