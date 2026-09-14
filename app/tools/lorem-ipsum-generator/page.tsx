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
import { LoremIpsumEngine } from '@/components/tools/LoremIpsumEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Lorem Ipsum Generator (Paragraphs, Words & HTML Tags) | Kagazo',
  description: 'Generate custom placeholder dummy text for web design, Figma, and print layouts. Choose paragraphs, sentences, or word counts with optional HTML p tag wrapping and 100% client-side execution.',
  alternates: {
    canonical: 'https://kagazo.in/tools/lorem-ipsum-generator',
  },
  openGraph: {
    title: 'Free Lorem Ipsum Generator (Paragraphs, Words & HTML Tags) | Kagazo',
    description: 'Generate custom placeholder dummy text for web design, Figma, and print layouts. Choose paragraphs, sentences, or word counts with optional HTML p tag wrapping and 100% client-side execution.',
    url: 'https://kagazo.in/tools/lorem-ipsum-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lorem Ipsum Generator (Paragraphs, Words & HTML Tags) | Kagazo',
    description: 'Generate custom placeholder dummy text for web design, Figma, and print layouts. Choose paragraphs, sentences, or word counts with optional HTML p tag wrapping and 100% client-side execution.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Quantity Metric",
    "desc": "Choose how you want to measure your placeholder text: Paragraphs, Sentences, or Words."
  },
  {
    "step": 2,
    "title": "Set Target Amount",
    "desc": "Enter the desired number of units (e.g., 3 paragraphs, 5 sentences, or 150 words)."
  },
  {
    "step": 3,
    "title": "Configure Opening Clause",
    "desc": "Toggle whether to begin the first sentence with the classic \"Lorem ipsum dolor sit amet...\" phrase."
  },
  {
    "step": 4,
    "title": "Choose Output Format",
    "desc": "Select Plain Text for design tools (Figma, Canva) or HTML Markup with paragraph tags for web development."
  },
  {
    "step": 5,
    "title": "Copy Generated Text",
    "desc": "Click \"Copy to Clipboard\" to paste your dummy text directly into your design canvas or code editor."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "PRODUCTION ACCIDENT",
    "title": "Leaving Dummy Text on Live Websites",
    "desc": "Launching websites without replacing placeholder text damages brand credibility and harms SEO. Always search your codebase for \"Lorem ipsum\" before deployment."
  },
  {
    "badge": "FORMAT MISMATCH",
    "title": "Pasting Plain Text into HTML Codebases",
    "desc": "Pasting raw multi-paragraph plain text into HTML templates collapses into one big paragraph. Use our HTML paragraph tag wrap toggle to preserve structure."
  },
  {
    "badge": "UNREALISTIC LENGTH",
    "title": "Using Insufficient Text in Mockups",
    "desc": "Testing cards and modal dialogs with only 5 words hides potential text overflow bugs. Always test minimum and maximum text thresholds."
  },
  {
    "badge": "FONT TESTING TRAP",
    "title": "Ignoring Number & Punctuation Glyphs",
    "desc": "Standard Lorem Ipsum lacks currency symbols, numbers, and modern punctuation. Supplement dummy text with numbers when testing custom web fonts."
  }
];

const FAQS = [
  {
    "question": "What is Lorem Ipsum and where does it originate?",
    "answer": "Lorem Ipsum is standard dummy placeholder text used by the printing and typesetting industry since the 1500s. Its passages originate from sections 1.10.32 and 1.10.33 of Marcus Tullius Cicero's 45 BC philosophical treatise \"De finibus bonorum et malorum\" (On the Extremes of Good and Evil)."
  },
  {
    "question": "Why do designers use Lorem Ipsum instead of real English text?",
    "answer": "When reviewing design mockups, readable English text distracts clients and team members from evaluating layout composition, typography balance, and white space. Because Latin is unfamiliar, viewers focus purely on visual hierarchy rather than reading the content."
  },
  {
    "question": "What does \"Lorem ipsum dolor sit amet\" actually mean in English?",
    "answer": "The phrase is a modified passage from Cicero. The Latin \"dolorem ipsum\" translates roughly to \"pain itself\" (as in \"Nor is there anyone who loves, pursues, or desires pain itself, simply because it is pain\"). However, centuries of typesetting variations have rendered modern Lorem Ipsum into pleasant-sounding nonsense words without coherent meaning."
  },
  {
    "question": "Can I generate HTML paragraph tags around the dummy text?",
    "answer": "Yes. Select the \"HTML Markup\" option. The generator wraps each generated paragraph inside opening and closing paragraph tags, making it effortless to paste into HTML files, WordPress, or React JSX components."
  },
  {
    "question": "How many words are in an average paragraph of Lorem Ipsum?",
    "answer": "An average paragraph of Lorem Ipsum typically contains between 70 and 100 words, structured into 4 to 6 natural-length sentences that mimic standard European editorial formatting."
  },
  {
    "question": "Can I generate dummy text by word count for UI buttons and cards?",
    "answer": "Yes. Switch the count mode to \"Words\" and input exact values (such as 3 words for a button label, or 25 words for a product card summary)."
  },
  {
    "question": "Does using Lorem Ipsum on a website hurt SEO?",
    "answer": "On private staging environments and Figma mockups, Lorem Ipsum has no SEO impact. However, if a website is published live to search engines with Lorem Ipsum still present, Google flags the pages as thin or low-quality content. Replace all dummy text before indexing."
  },
  {
    "question": "Does this generator work offline without an internet connection?",
    "answer": "Yes. The entire classical Latin vocabulary dictionary and paragraph compilation engine run 100% client-side in your browser JavaScript memory, working seamlessly even when disconnected from the internet."
  },
  {
    "question": "Is there any fee or subscription required to use this tool?",
    "answer": "No. Our Lorem Ipsum Generator is 100% free with unlimited generation for designers, developers, and agency teams."
  },
  {
    "question": "Is any data or text saved on your server?",
    "answer": "None whatsoever. The generation algorithm executes entirely in your browser RAM. No records, IP logs, or generated text strings are transmitted to or stored on our servers."
  }
];

export default function LoremIpsumGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Lorem Ipsum Dummy Text Generator',
        url: 'https://kagazo.in/tools/lorem-ipsum-generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate custom placeholder dummy text for web design, Figma, and print layouts. Choose paragraphs, sentences, or word counts with optional HTML p tag wrapping and 100% client-side execution.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate Custom Lorem Ipsum Placeholder Text',
        description: 'Step-by-step verified workflow instructions for Lorem Ipsum Dummy Text Generator.',
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
            name: 'Lorem Ipsum Dummy Text Generator',
            item: 'https://kagazo.in/tools/lorem-ipsum-generator',
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
          <span className="text-primary font-bold">Lorem Ipsum Dummy Text Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Cicero 45 BC Classical Latin Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Lorem Ipsum Generator </span>
            <span className="text-primary">Design Dummy Text Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate custom placeholder dummy text for web design, Figma, and print layouts. Choose paragraphs, sentences, or word counts with optional HTML p tag wrapping and 100% client-side execution.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <LoremIpsumEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Authentic Classical Latin Corpus
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Derived from Cicero's 45 BC philosophical treatise, providing an authentic, non-repetitive linguistic balance for modern typography.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Rich HTML Tag Wrapping
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instantly wrap generated paragraphs in HTML paragraph tags or bullet lists, ready to paste directly into frontend templates and CMS editors.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Granular Output Sizing
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generate exact counts by paragraphs, sentences, or individual words to perfectly fit wireframes, button labels, and hero sections.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Lorem Ipsum Corpus Specifications & Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative typography standards, computational parameters, and formatting specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Classical Latin Typography Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">Standard Specification</th><th className="py-2.5 px-3 font-bold">Design Application</th><th className="py-2.5 px-3 font-bold">Implementation Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Corpus Source</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cicero (45 BC) "De finibus bonorum et malorum"</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Typesetting placeholder literature</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Sections 1.10.32 and 1.10.33 authentic text</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Quantity Metric</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Paragraphs, Sentences, Words, Byte Length</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">UI mockups, cards, blog article previews</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Configurable from 1 word to 100+ paragraphs</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">HTML Formatting</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Wrap with paragraph tags or list items</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CMS rich text and frontend HTML templates</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Selectable plain text or HTML markup export</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Initial Clause</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Lorem ipsum dolor sit amet, consectetur...</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Traditional typography header standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Toggleable standard opening sentence</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Letter Frequency</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Balanced Latin character distribution</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Visual layout testing without distraction</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Natural average word length (5.2 characters)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Performance</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Sub-10ms instantaneous synthesis</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Local browser memory generation</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero API latency and zero cloud tracking</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate Custom Lorem Ipsum Placeholder Text
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
                  Common Placeholder Text Pitfalls & Best Practices
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
                Lorem Ipsum Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Source</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Cicero (45 BC) Treatise
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Units</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Paragraphs, Sentences, Words
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">HTML Tags</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Plain Text & Paragraph Wrap
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Speed</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Sub-10ms Instant Generation
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
