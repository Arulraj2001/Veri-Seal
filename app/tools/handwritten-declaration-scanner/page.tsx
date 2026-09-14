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
  AlertTriangle,
  Lock,
  Scissors,
  FileText,
  Camera,
  Layers,
  Sparkles,
} from 'lucide-react';
import HandwrittenDeclarationEngine from '@/components/tools/HandwrittenDeclarationEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'IBPS & SBI Handwritten Declaration Scanner (50KB–100KB) | Kagazo',
  description:
    'Resize and clean your IBPS PO/Clerk and SBI handwritten declaration strictly to 800×400 px (50 KB–100 KB). Remove notebook lines, whiten shadows, 100% free RAM privacy.',
  keywords: [
    'ibps handwritten declaration resize 50 to 100 kb',
    'sbi clerk handwritten declaration size 800x400',
    'ibps po declaration format in capital letters allowed or not',
    'handwritten declaration photo scanner for bank exam',
    'remove notebook lines from handwritten declaration online',
    'tcs ion handwritten declaration format 2026',
    'sbi po handwritten declaration white background',
    'bank exam declaration size compressor 50kb 100kb',
    'verbatim text for ibps clerk declaration',
    'running handwriting declaration scanner free',
    'ibps rrb scale 1 declaration size',
    'online declaration scanner for banking jobs',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/handwritten-declaration-scanner',
  },
  openGraph: {
    title: 'IBPS & SBI Handwritten Declaration Scanner (50KB–100KB) | Kagazo',
    description:
      'Purge notebook lines, whiten mobile camera shadows, and strictly lock declaration file size between 50 KB and 100 KB for IBPS, SBI, and RRB banking exams. 100% free.',
    url: 'https://kagazo.in/tools/handwritten-declaration-scanner',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBPS & SBI Handwritten Declaration Scanner (50KB–100KB) | Kagazo',
    description:
      'Resize handwritten declaration strictly between 50 KB and 100 KB at 800×400 px for IBPS PO, Clerk, and SBI recruitment. Zero cloud uploads.',
  },
};

const DECLARATION_RULES = [
  {
    item: 'Verbatim Official Text',
    spec: '"I, _____ (Name), hereby declare that all the information submitted by me..."',
    note: 'Must follow official notification text verbatim. Do not summarize or alter wording.',
  },
  {
    item: 'Mandatory Language',
    spec: 'English Only',
    note: 'Declarations written in Hindi or regional languages are summarily rejected by IBPS & SBI.',
  },
  {
    item: 'Handwriting Script',
    spec: 'Running / Cursive Handwriting',
    note: 'Writing in CAPITAL / BLOCK LETTERS results in immediate application disqualification.',
  },
  {
    item: 'Ink Color & Pen',
    spec: 'Black Ink Pen (Ballpoint or Gel)',
    note: 'Black ink is mandatory for TCS iON biometric scanning. Blue ink or pencil is rejected.',
  },
  {
    item: 'Paper Standard',
    spec: 'Clean White Unlined / Unruled Paper',
    note: 'Ruled notebook lines confuse biometric character analyzers. Kagazo filters out blue lines.',
  },
  {
    item: 'Pixel Dimensions',
    spec: '800 × 400 pixels (2:1 Landscape)',
    note: 'Exact aspect ratio enforced by portal upload validator for clear thumbnail rendering.',
  },
  {
    item: 'Permitted File Size',
    spec: 'Strictly 50 KB to 100 KB',
    note: 'Files under 50 KB or over 100 KB fail server-side validation. Kagazo locks at 65–85 KB.',
  },
  {
    item: 'Permitted File Format',
    spec: 'JPEG / JPG Only',
    note: 'PDF, PNG, or TIFF files cannot be uploaded to the banking declaration slot.',
  },
];

const FAQS = [
  {
    question: 'What is the exact official verbatim text for the IBPS Handwritten Declaration 2026?',
    answer:
      'The official text specified in the IBPS PO, Clerk, SO, and RRB notifications is: "I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required." Fill in your legal full name as registered in the application.',
  },
  {
    question: 'Why does the IBPS or SBI portal reject declarations smaller than 50 KB?',
    answer:
      'Banking recruitment portals managed by TCS iON enforce both a minimum floor (50 KB) and a maximum ceiling (100 KB). Scans below 50 KB suffer from heavy compression artifacts, blurring pen strokes and making handwriting unreadable for forensic human review. Kagazo utilizes smart padding to guarantee your file lands safely in the 65–85 KB compliant range.',
  },
  {
    question: 'Can I write the IBPS handwritten declaration in CAPITAL or BLOCK letters?',
    answer:
      'NO! The official IBPS guidelines explicitly state: "The applicant has to write the declaration in English clearly in their running handwriting; if it is written and uploaded by anybody else or in CAPITAL LETTERS, it will be considered invalid and rejected." You must write in standard sentence case with your normal cursive script.',
  },
  {
    question: 'Can someone else write the declaration for me if I have neat handwriting?',
    answer:
      'Never. The declaration must be written in the candidate\'s own handwriting. During document verification, interview stages, and joining formalities, banking officials compare physical handwriting samples against the uploaded declaration. Third-party handwriting constitutes biometric impersonation and leads to permanent debarment.',
  },
  {
    question: 'What is the exception for visually impaired candidates who cannot write?',
    answer:
      'Under official IBPS rules, visually impaired candidates who are unable to write may get the verbatim declaration typed, put their left thumb impression (LTI) below the typed text, and upload the resulting image within the standard 50 KB to 100 KB file size limits.',
  },
  {
    question: 'Can I write the declaration in Hindi or another regional language?',
    answer:
      'No. Even though recruitment exams like IBPS RRB are conducted in regional languages, the handwritten self-declaration clause must be written in English only. Submissions in Hindi, Tamil, Telugu, Marathi, or any other language are rejected.',
  },
  {
    question: 'How does Kagazo remove notebook ruled lines without damaging handwriting?',
    answer:
      'Our intelligent client-side canvas algorithm analyzes color channel differentials. Because notebook ruling lines consist of cyan and light-blue inks while candidate writing is dark black, the filter neutralizes the blue wavelength frequencies and normalizes the background to 255 pure white without thinning or distorting your pen strokes.',
  },
  {
    question: 'Can I write with a blue pen if I don\'t have a black pen?',
    answer:
      'Official IBPS and SBI guidelines explicitly specify black ink. Blue ink appears gray when processed by portal scanners and may fail automated density checks. If you have already written in blue ink, Kagazo\'s built-in ink conversion filter can safely transform blue strokes to crisp black before resizing.',
  },
  {
    question: 'What should I do if my declaration photo has room shadows or a yellow tint?',
    answer:
      'Photos taken under indoor incandescent light or with phone shadows across the paper often fail portal contrast verification. Kagazo applies automatic Otsu thresholding and background illumination normalization, turning murky paper into clean, high-contrast flatbed scanner white.',
  },
  {
    question: 'Is my handwritten biometric signature or declaration uploaded to any server?',
    answer:
      'Never. All processing happens entirely inside your local device volatile RAM memory. Your handwritten text is never transmitted across the network, stored in cookies, or uploaded to any cloud database.',
  },
];

export default function HandwrittenDeclarationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Kagazo IBPS & SBI Handwritten Declaration Scanner',
        url: 'https://kagazo.in/tools/handwritten-declaration-scanner',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Resize and format IBPS and SBI handwritten declarations strictly between 50 KB and 100 KB at 800x400 pixels with notebook line removal.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Scan and Resize Handwritten Declaration for IBPS & SBI',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Write Verbatim Declaration in Running Script',
            text: 'Write the official English statement on clean white unruled paper using a black ink pen in your natural cursive handwriting.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Draw On Biometric Pad',
            text: 'Upload a smartphone photo of your handwritten paper or use the on-screen touchscreen pad.',
          },
          {
            '@type': 'HowToStep',
            name: 'Eliminate Ruled Lines & Whiten Background',
            text: 'Enable AI ruling line removal to strip notebook lines and eliminate camera shadows.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 50KB–100KB Compliant JPG',
            text: 'Download the verified 800×400 px JPEG locked strictly between 50 KB and 100 KB for direct TCS iON upload.',
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
            name: 'Handwritten Declaration Scanner',
            item: 'https://kagazo.in/tools/handwritten-declaration-scanner',
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
          <span className="text-primary font-bold truncate">Handwritten Declaration Scanner</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <PenTool className="w-4 h-4 text-primary" />
            <span>Official IBPS &amp; SBI Recruitment 2026 Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>IBPS &amp; SBI Handwritten Declaration </span>
            <span className="text-primary">Scanner (50KB–100KB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Purge notebook ruled lines, eliminate room shadows, and strictly lock file size between <strong>50 KB and 100 KB</strong> at 800 × 400 pixels. Engineered specifically for <strong>IBPS PO, IBPS Clerk, SBI, and Railway</strong> recruitment gateways.
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ Strict 50 KB – 100 KB Window',
              '✓ 800 × 400 px Aspect Ratio',
              '✓ Ruled Line Subtraction Filter',
              '✓ Verbatim Official Text Guide',
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
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">50 KB – 100 KB Auto-Lock</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Guarantees output lands safely at 65–85 KB, eliminating floor and ceiling rejections.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Notebook Line Eraser</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Removes blue notebook ruling lines, preventing automated TCS iON OCR errors.
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
                Biometric handwriting is analyzed strictly in browser memory. Zero server uploads.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Core Interactive Tool Engine */}
            <HandwrittenDeclarationEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Verbatim Text Card with Alert */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="border-b border-surface-darker pb-4">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Official Verbatim Text for IBPS &amp; SBI Declaration (2026)
                </h2>
                <p className="text-xs text-text-main/60 mt-0.5">
                  Write this exact text in English on a plain sheet of unruled white paper with black ink
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface border-2 border-primary/20 space-y-3">
                <div className="text-xs uppercase font-mono font-bold tracking-wider text-primary">
                  Official Notification Verbatim Statement:
                </div>
                <blockquote className="text-sm sm:text-base font-serif italic text-text-main leading-relaxed bg-white p-4 rounded-xl border border-surface-darker">
                  &ldquo;I, ________ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.&rdquo;
                </blockquote>
                <p className="text-xs text-text-main/70">
                  <em>Replace &ldquo;________ (Name of the candidate)&rdquo; with your full name as entered in the application form. Do NOT write the parentheses or instructions.</em>
                </p>
              </div>

              {/* Warning Against Capital Letters */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Crucial Warning: Writing in CAPITAL / BLOCK Letters Disqualifies You!</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed pl-6">
                  Official IBPS and SBI notifications strictly declare: <em>&ldquo;Handwritten declaration in CAPITAL LETTERS will NOT be accepted.&rdquo;</em> You must write in your natural, flowing cursive handwriting using normal sentence capitalization.
                </p>
              </div>
            </section>

            {/* Official Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Official IBPS &amp; SBI Declaration Specifications Table
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Extracted from official IBPS PO/Clerk and SBI recruitment notifications
                  </p>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  TCS iON Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-surface border-b border-surface-darker text-text-main/70 uppercase text-[10px] tracking-wider">
                      <th className="p-3 font-bold">Requirement Parameter</th>
                      <th className="p-3 font-bold">Official Standard</th>
                      <th className="p-3 font-bold">Critical Portal Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {DECLARATION_RULES.map((rule, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="p-3 font-bold text-text-main">{rule.item}</td>
                        <td className="p-3 font-mono font-semibold text-primary">{rule.spec}</td>
                        <td className="p-3 text-text-main/70">{rule.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step-by-Step How-To */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="border-b border-surface-darker pb-4">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Step-by-Step: How to Prepare Your IBPS Declaration
                </h2>
                <p className="text-xs text-text-main/60 mt-0.5">
                  Follow these 5 simple steps for guaranteed first-time portal acceptance
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <span>Write on Clean White Paper</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Use a clean, unruled sheet of plain white A4 paper. Write the verbatim statement using a dark black ballpoint or gel pen in your natural running hand.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <span>Capture Clear Snapshot</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Take a clear, direct smartphone photo in bright daylight. Avoid casting hand or device shadows across the written lines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    <span>Upload &amp; Frame 800 × 400 px</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Upload your snapshot to Kagazo. Our engine automatically locks the official 2:1 landscape crop box (800 × 400 px).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      4
                    </span>
                    <span>Purge Lines &amp; Whiten Background</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    If you wrote on notebook paper, enable the Ruled Line Subtractor to dissolve blue lines and boost black ink contrast to pure flatbed white.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5 sm:col-span-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      5
                    </span>
                    <span>Download 50–100 KB Compliant JPEG</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Download the verified JPEG file locked between 65 KB and 85 KB, ready for direct, instant upload to the IBPS or SBI application portal.
                  </p>
                </div>
              </div>
            </section>

            {/* Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="border-b border-surface-darker pb-4">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Common Banking Declaration Upload Errors &amp; Fixes
                </h2>
                <p className="text-xs text-text-main/60 mt-0.5">
                  Troubleshooting common TCS iON upload validation failures
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="text-amber-600 font-extrabold">Error:</span>
                    <span>&quot;Handwritten declaration size should be between 50 KB and 100 KB&quot;</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                    <strong>The Cause:</strong> Basic online resizers aggressively compress text documents down to 25–40 KB, triggering an automatic server-side rejection.
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed pl-6">
                    <strong>Kagazo Fix:</strong> Our algorithm targets a 75 KB center point with high-chroma sampling, preventing the file from dropping below 50 KB or exceeding 100 KB.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="text-amber-600 font-extrabold">Error:</span>
                    <span>&quot;File format not supported / Must be JPG or JPEG&quot;</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                    <strong>The Cause:</strong> Many phone scanners save documents as PDF or PNG files.
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed pl-6">
                    <strong>Kagazo Fix:</strong> Kagazo encodes directly into standard baseline JPEG with 200 DPI metadata tags, accepted universally across all banking gateways.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions (IBPS &amp; SBI Declaration)
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Everything you need to know to avoid application cancellation
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Updated 2026
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
            {/* TCS iON Portal Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                TCS iON Criteria
              </h3>

              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Strict 50 KB Floor</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Files under 50 KB trigger error: &quot;Size must be between 50KB and 100KB&quot;.
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Strict 100 KB Ceiling</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Files over 100 KB are rejected. Kagazo locks output at ~75 KB.
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Aspect Ratio: 2:1</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    800 × 400 px resolution for optimal portal thumbnail display.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/ibps-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      IBPS Suite (All 4)
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    4-in-1
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
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 200KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    PDF
                  </span>
                </Link>

                <Link
                  href="/tools/specifications"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Exam Radar
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
                Biometric handwriting scans never leave your device. All processing occurs strictly in local browser memory.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 50–100 KB Lock
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Line Eraser
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

