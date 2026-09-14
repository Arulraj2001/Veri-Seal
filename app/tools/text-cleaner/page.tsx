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
  title: 'Free Text Cleaner Online (Strip Zero-Width Spaces, Quotes & HTML) | Kagazo',
  description: 'Sanitize text, strip hidden zero-width spaces, normalize smart quotes, remove duplicate blank lines, and strip HTML tags online. 100% free client-side Unicode sanitization with zero server storage.',
  alternates: {
    canonical: 'https://kagazo.in/tools/text-cleaner',
  },
  openGraph: {
    title: 'Free Text Cleaner Online (Strip Zero-Width Spaces, Quotes & HTML) | Kagazo',
    description: 'Sanitize text, strip hidden zero-width spaces, normalize smart quotes, remove duplicate blank lines, and strip HTML tags online. 100% free client-side Unicode sanitization with zero server storage.',
    url: 'https://kagazo.in/tools/text-cleaner',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Cleaner Online (Strip Zero-Width Spaces, Quotes & HTML) | Kagazo',
    description: 'Sanitize text, strip hidden zero-width spaces, normalize smart quotes, remove duplicate blank lines, and strip HTML tags online. 100% free client-side Unicode sanitization with zero server storage.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Paste Problematic Text",
    "desc": "Paste messy text copied from web pages, PDFs, emails, or chat logs into the input workspace."
  },
  {
    "step": 2,
    "title": "Select Cleaning Options",
    "desc": "Choose cleaning rules: Strip zero-width spaces, normalize smart quotes, remove duplicate spaces, or strip HTML tags."
  },
  {
    "step": 3,
    "title": "Execute Sanitization",
    "desc": "Click \"Clean Text\" to execute regex normalization rules across the entire document in under 10 milliseconds."
  },
  {
    "step": 4,
    "title": "Verify Character Reductions",
    "desc": "Compare before-and-after statistics to see exactly how many hidden characters and redundant spaces were purged."
  },
  {
    "step": 5,
    "title": "Copy Sanitized Text",
    "desc": "Click \"Copy to Clipboard\" to paste clean, error-free plain text into your code editor or database."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "INVISIBLE SYNTAX CRASH",
    "title": "Hidden Zero-Width Spaces in Code Snippets",
    "desc": "Copying code from blogs or tutorials often copies invisible \\u200B characters, causing confusing \"unexpected token\" compiler errors. Strip them instantly."
  },
  {
    "badge": "DATABASE ERROR",
    "title": "Curly Quotes in SQL Queries & JSON",
    "desc": "Word processors automatically replace straight quotes with curly quotes, causing JSON parse errors and SQL injection syntax failures."
  },
  {
    "badge": "NBSP WRAPPING BUG",
    "title": "Non-Breaking Spaces Breaking Mobile Layouts",
    "desc": "HTML &nbsp; entities prevent natural line wrapping, causing text to overflow mobile screens. Our tool converts them to standard breaking spaces."
  },
  {
    "badge": "HTML TAG LEAK",
    "title": "Pasting Rich Text into SMS or WhatsApp Blasts",
    "desc": "Copying formatted articles can leave stray HTML tags like <b> and <div> in plain text messages. Use HTML strip mode to extract pure text."
  }
];

const FAQS = [
  {
    "question": "What are zero-width spaces and why are they dangerous in programming?",
    "answer": "A zero-width space (`\\u200B`) is an invisible Unicode character that takes up zero horizontal pixels on a screen. When copied into programming code (JavaScript, Python, C++), the code appears completely normal to human eyes, but compilers and interpreters fail with cryptic syntax errors like \"Unexpected token ILLEGAL\" or \"Invalid character in identifier\"."
  },
  {
    "question": "How does this tool normalize curly quotes into straight quotes?",
    "answer": "Our sanitization pipeline scans for Unicode curly quotes (left double quote `\u201c`, right double quote `\u201d`, left single quote `\u2018`, and right single quote `\u2019`) and replaces them with standard ASCII straight quotes (`\"` and `'`), ensuring 100% compatibility with code interpreters and SQL databases."
  },
  {
    "question": "What is a non-breaking space (NBSP) and how is it converted?",
    "answer": "A non-breaking space (`\\u00A0` or `&nbsp;` in HTML) is a space character that prevents automatic line breaks between adjacent words. In plain text, it often creates layout bugs where text overflows container margins. Our cleaner converts all NBSPs into regular ASCII space characters."
  },
  {
    "question": "Can this tool remove duplicate blank lines from a text file?",
    "answer": "Yes. Enable the \"Remove Duplicate Empty Lines\" option. The engine replaces multi-line blank gaps with a single clean paragraph separator."
  },
  {
    "question": "Does this tool strip HTML tags without deleting the content?",
    "answer": "Yes. When HTML stripping is enabled, the tool removes all HTML/XML tags (like `<p>`, `<div class=\"...\">`, `<span>`, `<strong>`) while preserving the text inside them."
  },
  {
    "question": "How does this tool handle em-dashes and en-dashes?",
    "answer": "It detects typographer em-dashes (`\u2014`) and en-dashes (`\u2013`) and converts them into standard ASCII hyphens (`-`), which is required for URL slugs, programming variable identifiers, and legacy terminal systems."
  },
  {
    "question": "Can I clean a large 100,000-word book manuscript?",
    "answer": "Yes. Because the sanitization runs in local browser memory via compiled JavaScript regex, even massive multi-megabyte text documents are cleaned in less than a second."
  },
  {
    "question": "Can this tool remove emoji characters from text?",
    "answer": "Yes. You can toggle the \"Strip Emojis\" option to remove 4-byte Unicode emoji characters, leaving only alphanumeric characters, standard punctuation, and symbols."
  },
  {
    "question": "Is my text safe and private when using this cleaner?",
    "answer": "Completely safe. All cleaning and regex operations happen 100% locally inside your web browser RAM. No text, source code, or confidential documents are ever transmitted to any remote server."
  },
  {
    "question": "Can I use this tool on my iPhone or Android device?",
    "answer": "Yes. The interface is fully responsive and works smoothly on mobile Safari, Chrome, Samsung Internet, and desktop browsers."
  }
];

export default function TextCleanerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Text Cleaner & Whitespace Normalizer',
        url: 'https://kagazo.in/tools/text-cleaner',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Sanitize text, strip hidden zero-width spaces, normalize smart quotes, remove duplicate blank lines, and strip HTML tags online. 100% free client-side Unicode sanitization with zero server storage.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Clean & Sanitize Text Online',
        description: 'Step-by-step verified workflow instructions for Text Cleaner & Whitespace Normalizer.',
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
            name: 'Text Cleaner & Whitespace Normalizer',
            item: 'https://kagazo.in/tools/text-cleaner',
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
          <span className="text-primary font-bold">Text Cleaner & Whitespace Normalizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Zero-Width & Unicode Sanitization Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Online Text Cleaner & </span>
            <span className="text-primary">Whitespace Normalizer</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Sanitize text, strip hidden zero-width spaces, normalize smart quotes, remove duplicate blank lines, and strip HTML tags online. 100% free client-side Unicode sanitization with zero server storage.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <TextCleanerEngine initialAction="clean" />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Deep Zero-Width Character Stripping
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Detects and purges invisible zero-width spaces, non-joiners, and byte order marks that break compiler builds, JSON parsers, and database queries.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Smart Typography Normalization
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Converts curly quotes, slanted apostrophes, and stylized dashes into standard straight ASCII characters required by programming languages.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> HTML & Tag Stripping
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instantly strips raw HTML, XML, and markdown tags from rich-text copies while cleanly preserving the underlying human-readable text.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Text Sanitization & Character Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative typography standards, computational parameters, and formatting specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Unicode Sanitization Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Artifact Type</th><th className="py-2.5 px-3 font-bold">Unicode Codepoint</th><th className="py-2.5 px-3 font-bold">Common Problem</th><th className="py-2.5 px-3 font-bold">Sanitization Rule</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero-Width Space (ZWSP)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">\u200B (U+200B)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Invisible characters breaking code and queries</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Completely stripped from output text</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero-Width Joiner / Non-Joiner</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">\u200C / \u200D</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Unwanted emoji/script ligation markers</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cleanly removed in plain text mode</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Byte Order Mark (BOM)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">\uFEFF (U+FEFF)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Header artifacts breaking JSON and Python parsing</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Stripped from start and body of text</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Non-Breaking Space (NBSP)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">\u00A0 (U+00A0)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">HTML &nbsp; causing unexpected word wraps</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Converted to standard ASCII space (0x20)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Smart / Curly Quotes</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">“ ” ‘ ’ (U+2018 - U+201D)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Syntax errors in programming code & SQL</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Normalized to straight quotes (" and ')</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Em-Dash & En-Dash</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">— (U+2014) and – (U+2013)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Inconsistent typesetting in raw data</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Normalized to standard ASCII hyphens (-)</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Clean & Sanitize Text Online
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
                  Common Text Artifact Errors & Real-World Fixes
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
                Text Cleaner Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Sanitization</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Zero-Width Spaces & BOM
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Normalization</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Curly Quotes to Straight
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">HTML Strip</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Tags Removed, Text Preserved
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Whitespace</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    NBSP to Regular ASCII Space
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
                  href="/tools/remove-line-breaks"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Remove Line Breaks
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Format
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
