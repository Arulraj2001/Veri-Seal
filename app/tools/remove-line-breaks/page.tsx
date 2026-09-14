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
  Type,
  AlignLeft,
  Volume2,
  Hash,
  Scissors,
  Check,
} from 'lucide-react';
import { TextCleanerEngine } from '@/components/tools/TextCleanerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Remove Line Breaks Online Free (Fix PDF Copy & Format Paragraphs) | Kagazo',
  description: 'Remove unwanted line breaks from PDF copied text, emails, and scanned documents online for free. Reconstruct flowing paragraphs, preserve double line breaks, and normalize whitespace with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/remove-line-breaks',
  },
  openGraph: {
    title: 'Remove Line Breaks Online Free (Fix PDF Copy & Format Paragraphs) | Kagazo',
    description: 'Remove unwanted line breaks from PDF copied text, emails, and scanned documents online for free. Reconstruct flowing paragraphs, preserve double line breaks, and normalize whitespace with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/remove-line-breaks',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Line Breaks Online Free (Fix PDF Copy & Format Paragraphs) | Kagazo',
    description: 'Remove unwanted line breaks from PDF copied text, emails, and scanned documents online for free. Reconstruct flowing paragraphs, preserve double line breaks, and normalize whitespace with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Paste Fragmented Text",
    "desc": "Paste jagged text copied from a PDF document, email thread, or OCR scan into the editor."
  },
  {
    "step": 2,
    "title": "Select Formatting Mode",
    "desc": "Choose \"Remove all line breaks\" for single-line flow, or \"Preserve paragraphs\" to maintain double-line structure."
  },
  {
    "step": 3,
    "title": "Configure Whitespace Rules",
    "desc": "Toggle options to collapse multiple spaces and remove leading or trailing line whitespace."
  },
  {
    "step": 4,
    "title": "Instant Algorithmic Flow",
    "desc": "The engine executes regex line reconstruction across your entire text in under 15 milliseconds."
  },
  {
    "step": 5,
    "title": "Copy Clean Flowing Text",
    "desc": "Click \"Copy to Clipboard\" to paste beautifully formatted text into Google Docs, Word, or your CMS."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "WALL OF TEXT",
    "title": "Removing All Breaks on Multi-Page Documents",
    "desc": "Selecting \"Remove all line breaks\" on an entire essay merges every paragraph into a single giant block. Use \"Preserve paragraphs\" instead."
  },
  {
    "badge": "HYPHEN SPLIT",
    "title": "Leaving Hyphenated Words from Narrow Columns",
    "desc": "PDF texts often break words across lines with hyphens (e.g. \"com- / puter\"). Clean up hyphenated word boundaries during line joining."
  },
  {
    "badge": "DOUBLE SPACING",
    "title": "Retaining Spaces Before Line Breaks",
    "desc": "Lines ending with spaces create ugly double spaces when merged. Our engine automatically trims line-end spaces before joining."
  },
  {
    "badge": "CODE INDENTATION LOSS",
    "title": "Running Code Snippets Through Line Removers",
    "desc": "Applying line break removal to programming code destroys indentation and syntax. Line break removal is intended for natural language prose."
  }
];

const FAQS = [
  {
    "question": "Why does text copied from PDF files contain unwanted line breaks?",
    "answer": "PDFs are visual layout files rather than flowing text documents. PDF viewers represent text in rigid visual bounding boxes with hard line breaks at the end of each physical column line. When you copy this text, those visual line breaks are copied into your clipboard as literal newline characters."
  },
  {
    "question": "How does \"Preserve Paragraphs\" mode work?",
    "answer": "Our algorithm searches for double line breaks (`\\n\\n` or `\\r\\n\\r\\n`), which signify intentional paragraph transitions. It temporarily protects these paragraph boundaries, converts all single hard line breaks within paragraphs into standard single spaces, and then restores the paragraph breaks."
  },
  {
    "question": "What is the difference between Windows CRLF and Unix LF line endings?",
    "answer": "Windows uses a two-character Carriage Return and Line Feed sequence (`\\r\\n`) to end lines, whereas Unix, Linux, and macOS use a single Line Feed character (`\\n`). Our engine normalizes all line ending conventions automatically before processing."
  },
  {
    "question": "Can I use this tool to clean up scanned OCR book text?",
    "answer": "Yes. Optical Character Recognition (OCR) software frequently introduces arbitrary hard line breaks to match the printed book page width. This tool removes those breaks, transforming the scan into continuous, editable prose."
  },
  {
    "question": "Will this remove bullet points or numbered lists?",
    "answer": "If you choose \"Remove all line breaks\", lists will be flattened into a single line. If you want to keep separate list items, use \"Preserve paragraphs\" or ensure each list item is separated by a double line break."
  },
  {
    "question": "Can I process long manuscripts or university dissertations?",
    "answer": "Yes. The engine runs locally in your browser memory and can process documents containing over 100,000 words in less than a second without lagging."
  },
  {
    "question": "How does this tool handle extra spaces between words?",
    "answer": "It automatically collapses multiple consecutive spaces (such as double spaces after periods) into clean, single spaces while removing leading and trailing whitespace from the edges."
  },
  {
    "question": "Does this tool work on mobile devices?",
    "answer": "Yes. It works seamlessly on Safari on iOS, Chrome on Android, and all modern mobile web browsers without installing any apps."
  },
  {
    "question": "Is my pasted text stored or read by anyone?",
    "answer": "No. All processing happens 100% inside your browser RAM. Your confidential legal briefs, essays, and personal writings are never transmitted to any external server."
  },
  {
    "question": "Can I copy the formatted text with keyboard shortcuts?",
    "answer": "Yes. Once processed, click the \"Copy to Clipboard\" button or click inside the result box and press Ctrl+A followed by Ctrl+C (Cmd+A and Cmd+C on Mac)."
  }
];

export default function RemoveLineBreaksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Line Break Remover & Paragraph Formatter',
        url: 'https://kagazo.in/tools/remove-line-breaks',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Remove unwanted line breaks from PDF copied text, emails, and scanned documents online for free. Reconstruct flowing paragraphs, preserve double line breaks, and normalize whitespace with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Remove Line Breaks from PDF & Jagged Text',
        description: 'Step-by-step verified workflow instructions for Line Break Remover & Paragraph Formatter.',
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
            name: 'Line Break Remover & Paragraph Formatter',
            item: 'https://kagazo.in/tools/remove-line-breaks',
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
          <span className="text-primary font-bold">Line Break Remover & Paragraph Formatter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>CRLF & Unicode Normalization Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Remove Line Breaks </span>
            <span className="text-primary">Text Flow & Paragraph Formatter</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Remove unwanted line breaks from PDF copied text, emails, and scanned documents online for free. Reconstruct flowing paragraphs, preserve double line breaks, and normalize whitespace with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <TextCleanerEngine initialAction="linebreaks" />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Linguistic Standards
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Smart Paragraph Preservation
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Distinguishes between artificial single-line PDF wraps and intentional double-line paragraph breaks, keeping your essay structure intact.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> PDF Copy Wrap Repair
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Seamlessly repairs jagged, hyphenated, and narrow-column text copied from PDF research papers, e-books, and academic journals.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-RAM Local Execution
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your text is processed entirely inside your browser memory using high-speed regex. No confidential drafts or documents are ever uploaded.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Line Break & Whitespace Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative typography standards, computational parameters, and formatting specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Unicode & Line Break Architecture
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Line Break Type</th><th className="py-2.5 px-3 font-bold">Escape Sequence</th><th className="py-2.5 px-3 font-bold">Operating System / Source</th><th className="py-2.5 px-3 font-bold">Handling Rule</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CRLF (Carriage Return + Line Feed)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">\r\n (0x0D 0x0A)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Windows operating system standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Normalized to standard single space or paragraph gap</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">LF (Line Feed)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">\n (0x0A)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Unix, Linux, macOS, modern web standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Collapsed within paragraphs; preserved across double breaks</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CR (Carriage Return)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">\r (0x0D)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Classic Mac OS and legacy mainframe files</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Normalized to standard line breaks before processing</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PDF Column Line Breaks</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Hard line breaks at column width</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Copied text from PDF viewers (Acrobat/Chrome)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Re-joined into continuous sentences with single space</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Double Line Breaks</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">\n\n or \r\n\r\n</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Intentional paragraph separation</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Preserved in "Keep Paragraphs" mode</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Trailing Whitespace</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Spaces before line endings</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Source code, word processor exports</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Stripped to prevent unnatural double spacing</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Remove Line Breaks from PDF & Jagged Text
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
                  Common Text Copying Pitfalls & Practical Fixes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common formatting errors, syntax bugs, and readability pitfalls:
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
                    Comprehensive technical, typographical, and operational answers
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
                Line Break Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Engine</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Regex Stream Processing
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Supported Endings</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    CRLF, LF, CR Universal
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Modes</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Remove All / Keep Paragraphs
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Whitespace</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Auto-Collapse Double Spaces
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
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
                  href="/tools/text-cleaner"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Text Cleaner
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Sanitize
                  </span>
                </Link>
                <Link
                  href="/tools/case-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Case Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Casing
                  </span>
                </Link>
                <Link
                  href="/tools/word-counter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Word Counter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Analytics
                  </span>
                </Link>
                <Link
                  href="/tools/lorem-ipsum-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Lorem Ipsum Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Dummy
                  </span>
                </Link>
                <Link
                  href="/tools/text-to-speech"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Text to Speech
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Voice
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
                All text transformations, character counts, and speech syntheses occur strictly inside your device browser memory. Zero articles or confidential documents are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
