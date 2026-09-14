import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PenTool,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Lock,
  Scissors,
  Sliders,
  Award,
} from 'lucide-react';
import SignatureExtractorEngine from '@/components/tools/SignatureExtractorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Black Ink Signature Extractor & Enhancer | SSC, UPSC, IBPS | Kagazo',
  description:
    'Remove ruled notebook lines, eliminate shadows, and convert blue ballpoint ink to official dense India Black ink on pure white background for SSC, UPSC, IBPS, and RRB. Strict 10–20 KB auto-lock, zero uploads free.',
  keywords: [
    'remove lines from signature online free',
    'convert blue ink signature to black ink online',
    'signature background remover white background',
    'clean signature photo for ssc upsc',
    'black ink signature extractor free',
    'signature contrast enhancer for exam forms',
    'make signature dark black online',
    'ibps signature resize 10 to 20 kb black ink',
    'remove notebook lines from signature photo',
    'signature photo editor for government exams',
    'ssc signature resizer 140x60 black ink',
    'upsc signature resizer 350x350 free',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/signature-cleaner-extractor',
  },
  openGraph: {
    title: 'Black Ink Signature Extractor & Contrast Enhancer | Kagazo',
    description:
      'Remove notebook lines, whiten paper backgrounds, and convert blue ink to dense black for SSC, UPSC, and Bank PO recruitment forms. 100% free.',
    url: 'https://kagazo.in/tools/signature-cleaner-extractor',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Black Ink Signature Extractor & Contrast Enhancer | Kagazo',
    description:
      'Eliminate ruled notebook lines and convert blue ink to official black ink for SSC, UPSC, and IBPS exam uploads. Zero server uploads.',
  },
};

const FAQS = [
  {
    question: 'Why do SSC and UPSC portals reject signatures on lined notebook paper?',
    answer:
      'Recruitment portals use automated optical character recognition (OCR) and high-speed biometric signature matching algorithms during exam hall verification. Horizontal notebook lines intersect with cursive letters and cause automated scanning failures, leading to immediate rejection of the uploaded document.',
  },
  {
    question: 'Can I upload a signature written with a blue ballpoint pen?',
    answer:
      'Yes! While official guidelines mandate black ink, Kagazo mathematically isolates the blue and cyan pigment frequencies and remaps them into dense, official India Black ink (#111111 to #000000) on a pure #FFFFFF background while preserving your natural pen pressure variations.',
  },
  {
    question: 'What are the exact signature dimensions for SSC CGL and UPSC CSE?',
    answer:
      'SSC requires 140 × 60 pixels strictly between 10 KB and 20 KB in JPEG format. UPSC requires a square 350 × 350 pixels between 20 KB and 50 KB (up to 300 KB allowed). Kagazo provides 1-click presets that automatically apply these exact dimensions and byte constraints.',
  },
  {
    question: 'How does Kagazo remove notebook lines without damaging my signature?',
    answer:
      'Kagazo’s line-detection filter analyzes repetitive horizontal pixel structures characteristic of machine-ruled notebook paper. It isolates and subtracts these horizontal line frequencies while leaving continuous, irregular handwritten pen strokes completely intact.',
  },
  {
    question: 'Why do bank exam portals (IBPS and SBI) reject signatures written in CAPITAL LETTERS?',
    answer:
      'A signature must reflect your unique, authentic identity written in running/cursive handwriting. Writing your name in separate capital letters does not constitute a legally binding biometric specimen and is summarily disqualified by banking examination boards.',
  },
  {
    question: 'What is the required background color for government exam signatures?',
    answer:
      'The background must be pure white (#FFFFFF), completely free of gray shadows, yellowish room lighting tints, paper texture, or visible wood grain from the desk. Kagazo’s adaptive Otsu thresholding whitens the paper automatically.',
  },
  {
    question: 'Can I enhance a signature photographed in dim indoor lighting?',
    answer:
      'Yes. Smartphone cameras often capture yellowish paper tones and hand shadows in dim rooms. Kagazo analyzes local pixel luminance gradients, eliminates shadows, and boosts ink contrast to flatbed-scanner clarity.',
  },
  {
    question: 'What file format is accepted for signature uploads on recruitment portals?',
    answer:
      'Almost all Indian recruitment portals (SSC, UPSC, IBPS, RRB, NTA) mandate the JPEG/JPG format. Files in PNG, PDF, or WEBP format are rejected by portal upload validators. Kagazo strictly exports standards-compliant JPEG files.',
  },
  {
    question: 'Will enhancing my signature alter its legal validity?',
    answer:
      'No. Enhancing image contrast, removing background paper grain, and converting ink color does not modify the curvature, letter slant, pressure points, or unique characteristics of your signature.',
  },
  {
    question: 'Is my handwritten signature saved or stored on your servers?',
    answer:
      'Never. Kagazo processes all image transformations entirely inside your device’s volatile RAM via client-side HTML5 Canvas. Zero bytes leave your device, and all signature data is permanently erased the instant you close the browser tab.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Signature Photo",
    "desc": "Select phone camera snapshot of your signature on paper."
  },
  {
    "step": 2,
    "title": "Ruled Line Eraser Active",
    "desc": "Automatically detects and erases horizontal notebook lines behind ink."
  },
  {
    "step": 3,
    "title": "Blue-to-Black Conversion",
    "desc": "Converts faint blue ink into deep, rich black ink required by portals."
  },
  {
    "step": 4,
    "title": "Paper Whitening & Binarize",
    "desc": "Removes yellow lighting gradients and desk shadows completely."
  },
  {
    "step": 5,
    "title": "Download Pure Black Signature",
    "desc": "Download verified signature strictly under 20 KB with crisp strokes."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Ruled Notebook Lines Visible",
    "title": "Signature Disqualified by Portal OCR",
    "desc": "Signing on ruled paper interferes with automated verification. Kagazo erases lined patterns."
  },
  {
    "badge": "Error: Shadow Cast Across Signature",
    "title": "Mobile Camera Shadow Degrading Contrast",
    "desc": "Overhead phone shadows create dark patches. Kagazo normalizes paper luminance."
  },
  {
    "badge": "Error: Broken Incomplete Strokes",
    "title": "Over-Thresholding Erasing Fine Curves",
    "desc": "Crude binarizers break thin pen lines. Kagazo uses adaptive hysteresis filtering."
  },
  {
    "badge": "Error: Blue Ink Rejected by Portal",
    "title": "Exams Mandating Black Ink Only",
    "desc": "GATE, IBPS, and SSC require black ink. Kagazo converts blue ink to solid black."
  }
];

export default function SignatureExtractorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Black Ink Signature Extractor & Enhancer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/signature-cleaner-extractor',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Remove ruled notebook lines, eliminate background shadows, and convert blue ballpoint ink to dense official India Black ink for SSC, UPSC, and IBPS recruitment portals.',
        featureList: [
          'Ruled notebook line detection and subtraction',
          'Blue-to-black ink remapping algorithm',
          'Pure #FFFFFF background whitening via Otsu thresholding',
          'Pre-configured SSC (140x60), UPSC (350x350), and IBPS presets',
          'Strict 10–20 KB file size compression',
          '100% in-browser RAM privacy',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Clean and Extract Black Ink Signature from Paper Photos',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Signature Photo',
            text: 'Take a clear smartphone photo of your signature written on paper and upload it.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Line Removal or Ink Conversion',
            text: 'Enable "Remove Ruled Lines" for notebook paper, or "Convert Blue to Black" for blue ink pens.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Exam Preset',
            text: 'Click your target portal preset: SSC (140x60), UPSC (350x350), IBPS (140x60), or RRB (160x80).',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Official JPG',
            text: 'Download the enhanced black-on-white signature, formatted strictly within permissible KB limits.',
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
            name: 'Black Ink Signature Extractor',
            item: 'https://kagazo.in/tools/signature-cleaner-extractor',
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
          <span className="text-primary font-bold">Black Ink Signature Extractor</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Zero Ruled Line Rejections • Blue to India Black Conversion</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Black Ink Signature Extractor &amp; </span>
            <span className="text-primary">Contrast Enhancer</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Eliminate notebook ruled lines, purge yellow camera shadows, and convert faint or blue ballpoint ink to dense official India Black ink on pure white paper. Pre-configured for <strong>SSC (140×60 px), UPSC (350×350 px), IBPS, and Railway RRB</strong> application portals.
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ Ruled Notebook Line Eraser',
              '✓ Blue-to-Black Ink Converter',
              '✓ Pure #FFFFFF Background Whitener',
              '✓ Strict 10–20 KB Auto-Lock',
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
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Ruled Line Eraser</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Subtracts horizontal notebook lines without cutting off fine cursive pen flourishes.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Blue-to-Black Ink</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Remaps blue and purple ballpoint ink to dense India Black required by recruitment boards.
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
                Your legal handwritten signature is never stored or transmitted to external servers.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SignatureExtractorEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Specifications Cheatsheet */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Official Signature Rules Across Major Indian Recruitment Boards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for online signature uploads across national and state recruitment portals.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-surface text-text-main font-bold border-b border-surface-darker">
                      <th className="py-3 px-4">Recruitment Board</th>
                      <th className="py-3 px-4">Required Dimensions</th>
                      <th className="py-3 px-4">Permitted File Size</th>
                      <th className="py-3 px-4">Background Standard</th>
                      <th className="py-3 px-4">Mandatory Ink Color</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker font-medium text-text-main/80">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">SSC (CGL, CHSL, MTS)</td>
                      <td className="py-3 px-4 font-mono">140 × 60 pixels</td>
                      <td className="py-3 px-4 font-bold">10 KB to 20 KB</td>
                      <td className="py-3 px-4">Pure White, Unruled</td>
                      <td className="py-3 px-4 font-bold">Black Ink Pen</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">UPSC Civil Services / NDA</td>
                      <td className="py-3 px-4 font-mono">350 × 350 pixels (Square)</td>
                      <td className="py-3 px-4">20 KB to 50 KB (up to 300KB)</td>
                      <td className="py-3 px-4">Pure White, No Shadows</td>
                      <td className="py-3 px-4 font-bold">Black Ink Pen</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">IBPS &amp; SBI Banking</td>
                      <td className="py-3 px-4 font-mono">140 × 60 pixels</td>
                      <td className="py-3 px-4 font-bold">10 KB to 20 KB</td>
                      <td className="py-3 px-4">Pure White, Crisp Strokes</td>
                      <td className="py-3 px-4 font-bold">Black Ink Pen (Not CAPS)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">Railway RRB (NTPC, Group D)</td>
                      <td className="py-3 px-4 font-mono">160 × 80 pixels</td>
                      <td className="py-3 px-4">10 KB to 40 KB</td>
                      <td className="py-3 px-4">Clean White Paper</td>
                      <td className="py-3 px-4">Black or Blue Ink</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Rejection Warning:</strong> Signatures uploaded on lined notebook paper, with faint ballpoint ink, or written in BLOCK CAPITAL LETTERS are the leading cause of technical disqualification on IBPS, SSC, and Railway portals.
                </div>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Clean and Extract Signatures in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant recruitment portal compliance:
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
                  Common Signature Scanning Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common application mistakes that trigger instant portal rejection:
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

            {/* Real World Use Cases */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Recruitment Exam Signature Use Cases
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'SSC CGL, CHSL, MTS & GD',
                    desc: 'Extract and format signatures strictly to 140×60 pixels between 10 KB and 20 KB in black ink.',
                  },
                  {
                    title: 'UPSC Civil Services CSE & NDA',
                    desc: 'Crop signatures into 350×350 px square format with pure white background for UPSC ORA.',
                  },
                  {
                    title: 'IBPS PO, Clerk & SBI Bank Exams',
                    desc: 'Format cursive signatures strictly between 10 KB and 20 KB in black ink without capital letters.',
                  },
                  {
                    title: 'Railway RRB (NTPC, Group D, ALP)',
                    desc: 'Clean signatures to 160×80 px strictly under 40 KB for Indian Railway recruitment portals.',
                  },
                  {
                    title: 'TNPSC Group 1, 2 & 4 (OTR)',
                    desc: 'Format specimen signature to 6.0×2.0 cm strictly between 10 KB and 20 KB for One Time Registration.',
                  },
                  {
                    title: 'Court e-Filing & Legal Affidavits',
                    desc: 'Clean up handwritten signatures for insertion into legal contracts, affidavits, and job resumes.',
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
                Kagazo processes your handwritten legal signature exclusively inside your device’s volatile RAM memory using client-side HTML5 Canvas APIs. Zero signature images or personal biometrics are transmitted over the internet or logged in databases. When you close or refresh this tab, all processed data is permanently erased.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-primary">
                <span className="bg-white border border-primary/20 px-2.5 py-1 rounded-full">✓ No Server Persistence</span>
                <span className="bg-white border border-primary/20 px-2.5 py-1 rounded-full">✓ No AI Model Training</span>
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
                    10–20KB
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
                  href="/tools/handwritten-declaration-scanner"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      IBPS Declaration
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    50–100KB
                  </span>
                </Link>

                <Link
                  href="/tools/photo-date-name-stamper"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Photo Date Stamper
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    DOP
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to 20KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    20 KB
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
                Signatures are cleaned and enhanced strictly in client memory. Zero server uploads.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ SSC 140×60
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ UPSC 350×350
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

