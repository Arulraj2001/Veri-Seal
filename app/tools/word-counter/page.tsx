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
import { WordCounterEngine } from '@/components/tools/WordCounterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Word Counter Online (Words, Characters, Reading Time & Readability) | Kagazo',
  description: 'Count words, characters (with and without spaces), sentences, paragraphs, and reading time online for free. Features real-time Flesch Reading Ease scoring and keyword density analysis with 100% privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/word-counter',
  },
  openGraph: {
    title: 'Free Word Counter Online (Words, Characters, Reading Time & Readability) | Kagazo',
    description: 'Count words, characters (with and without spaces), sentences, paragraphs, and reading time online for free. Features real-time Flesch Reading Ease scoring and keyword density analysis with 100% privacy.',
    url: 'https://kagazo.in/tools/word-counter',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Word Counter Online (Words, Characters, Reading Time & Readability) | Kagazo',
    description: 'Count words, characters (with and without spaces), sentences, paragraphs, and reading time online for free. Features real-time Flesch Reading Ease scoring and keyword density analysis with 100% privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Paste or Type Content",
    "desc": "Enter or paste your text into the word counter editor from Word, Google Docs, or your CMS."
  },
  {
    "step": 2,
    "title": "Observe Live Statistics",
    "desc": "Watch word, character, sentence, and paragraph counts update instantly in real-time as you edit."
  },
  {
    "step": 3,
    "title": "Check Reading & Speaking Times",
    "desc": "View estimated silent reading duration and spoken speech delivery time for speech rehearsals."
  },
  {
    "step": 4,
    "title": "Analyze Readability Score",
    "desc": "Review your Flesch Reading Ease score to ensure the text complexity matches your target audience."
  },
  {
    "step": 5,
    "title": "Inspect Keyword Density",
    "desc": "Review the top keyword frequency table to ensure healthy 1-2% density without search engine over-optimization."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "LIMIT EXCEEDED",
    "title": "Exceeding Social Media Character Caps",
    "desc": "Platforms truncate text: X/Twitter caps posts at 280 characters, Instagram bios cap at 150 characters, and Google meta descriptions cap at 160 characters."
  },
  {
    "badge": "KEYWORD STUFFING",
    "title": "Exceeding 3% Keyword Density",
    "desc": "Repeating keywords too frequently triggers search engine spam penalties. Keep target keyword density between 1% and 2.5%."
  },
  {
    "badge": "READABILITY DROP",
    "title": "Flesch Reading Ease Below 50 on Consumer Web",
    "desc": "Low readability scores indicate overly long sentences and complex syllables, increasing visitor bounce rates. Aim for a score of 60 to 70."
  },
  {
    "badge": "WORD MISCOUNT",
    "title": "Counting Hyphenated Words Inconsistently",
    "desc": "Different word processors treat hyphenated words differently. Our tool follows standard typographical counting conventions."
  }
];

const FAQS = [
  {
    "question": "How does this word counter calculate words accurately?",
    "answer": "Our counter uses Unicode-aware word boundary regular expressions that match contiguous sequences of alphabetic and alphanumeric characters. It avoids common counting errors caused by extra whitespace, non-breaking spaces, or trailing punctuation marks."
  },
  {
    "question": "What is the difference between characters with spaces and without spaces?",
    "answer": "\"Characters with spaces\" counts every keystroke including letters, numbers, punctuation, and whitespace gaps. \"Characters without spaces\" counts only visible printed characters. Academic essay requirements, book publishers, and translation agencies often specify whether character counts include spaces."
  },
  {
    "question": "What are the official character limits for popular social media platforms?",
    "answer": "Key social media character limits: X (Twitter) free tier = 280 characters; Instagram captions = 2,200 characters (bio = 150 characters); LinkedIn post = 3,000 characters; Google SEO Meta Description = 155 to 160 characters; Title Tag = 55 to 60 characters."
  },
  {
    "question": "How is estimated reading time calculated?",
    "answer": "Reading time is calculated using the widely accepted scientific average of 200 to 250 words per minute (WPM) for adult silent reading. Our engine divides total word count by 225 WPM to provide a natural read-time estimate for blog and article headers."
  },
  {
    "question": "How is speaking time calculated for presentations and speeches?",
    "answer": "Speaking time is calculated using an average presentation pace of 130 to 150 words per minute (WPM). Speaking is significantly slower than silent reading due to natural pauses, emphasis, and articulation."
  },
  {
    "question": "What does the Flesch Reading Ease score mean?",
    "answer": "The Flesch Reading Ease formula measures text readability on a 0 to 100 scale based on average sentence length and syllable count per word. A score of 90-100 is easily understood by an 11-year-old; 60-70 is standard conversational English (ideal for consumer websites); and scores below 30 indicate dense academic or legal text."
  },
  {
    "question": "What is optimal keyword density for SEO content?",
    "answer": "Optimal keyword density for search engine optimization is generally between 1.0% and 2.5%. Going above 3% can trigger search engine over-optimization (keyword stuffing) penalties."
  },
  {
    "question": "Does this word counter support non-English languages?",
    "answer": "Yes. It supports all languages utilizing spaces or standard punctuation, including Spanish, French, German, Russian, Arabic, and Hindi."
  },
  {
    "question": "Is my text stored or saved when I paste it into the counter?",
    "answer": "No. The word counter operates 100% locally inside your web browser RAM. No text, articles, or word count metrics are ever transmitted to or stored on our servers."
  },
  {
    "question": "Is there a limit on how long my document can be?",
    "answer": "No. You can paste and analyze complete books, academic theses, and long transcripts containing over 100,000 words without lag."
  }
];

export default function WordCounterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Word Counter & Text Readability Analyzer',
        url: 'https://kagazo.in/tools/word-counter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Count words, characters (with and without spaces), sentences, paragraphs, and reading time online for free. Features real-time Flesch Reading Ease scoring and keyword density analysis with 100% privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Count Words & Analyze Text Readability',
        description: 'Step-by-step verified workflow instructions for Word Counter & Text Readability Analyzer.',
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
            name: 'Word Counter & Text Readability Analyzer',
            item: 'https://kagazo.in/tools/word-counter',
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
          <span className="text-primary font-bold">Word Counter & Text Readability Analyzer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Unicode Word Boundary & Flesch-Kincaid Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Online Word Counter & </span>
            <span className="text-primary">Character Readability Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Count words, characters (with and without spaces), sentences, paragraphs, and reading time online for free. Features real-time Flesch Reading Ease scoring and keyword density analysis with 100% privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <WordCounterEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Comprehensive Metric Dashboard
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Real-time calculation of words, characters (with/without spaces), sentences, paragraphs, syllables, and average word length.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Reading & Speaking Time Estimates
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Calculates precise reading time (based on 225 WPM) and speaking presentation time (based on 130 WPM) for public speakers and podcasters.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Readability & Keyword Density
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Evaluates Flesch Reading Ease scores and highlights top recurring keywords to prevent keyword stuffing and optimize SEO readability.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Text Analytics & Readability Formula Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative typography standards, computational parameters, and formatting specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Flesch-Kincaid & WPM Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Metric</th><th className="py-2.5 px-3 font-bold">Standard Formula / Rule</th><th className="py-2.5 px-3 font-bold">Industry Benchmark</th><th className="py-2.5 px-3 font-bold">Target Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Word Count</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Unicode word boundary regex (Letter classes)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Exact tokenization</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Essays, articles, blog posts, academic papers</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Character Count</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">String length (with and without spaces)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Exact UTF-16 code units</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Social media limits (X/Twitter, LinkedIn, Meta)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Estimated Reading Time</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Total words / 225 words per minute (WPM)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">200 to 250 WPM average reading speed</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Article read-time badges and blog headers</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Estimated Speaking Time</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Total words / 130 words per minute (WPM)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">130 to 150 WPM presentation pace</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Public speeches, YouTube scripts, presentations</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Flesch Reading Ease</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">206.835 - 1.015(total words/sentences) - 84.6(syllables/words)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Score 60-70 = Plain English (8th-9th grade)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Web copy, customer documentation, news articles</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Keyword Density</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">(Keyword occurrences / Total words) * 100</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1% to 2.5% healthy keyword density</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Search engine optimization (SEO) content optimization</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Count Words & Analyze Text Readability
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
                  Common Writing Length Errors & Optimization Tips
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
                Word Counter Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Engine</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Unicode Boundary Tokenizer
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Reading Pace</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    225 Words Per Minute
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Speaking Pace</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    130 Words Per Minute
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Readability</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Flesch-Kincaid Formula
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
