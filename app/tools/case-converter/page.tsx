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
import { CaseConverterEngine } from '@/components/tools/CaseConverterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Text Case Converter Online (Title Case, camelCase, snake_case) | Kagazo',
  description: 'Convert text between Title Case, sentence case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case, and kebab-case online. 100% free with smart grammar capitalization and zero server storage.',
  alternates: {
    canonical: 'https://kagazo.in/tools/case-converter',
  },
  openGraph: {
    title: 'Free Text Case Converter Online (Title Case, camelCase, snake_case) | Kagazo',
    description: 'Convert text between Title Case, sentence case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case, and kebab-case online. 100% free with smart grammar capitalization and zero server storage.',
    url: 'https://kagazo.in/tools/case-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Case Converter Online (Title Case, camelCase, snake_case) | Kagazo',
    description: 'Convert text between Title Case, sentence case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case, and kebab-case online. 100% free with smart grammar capitalization and zero server storage.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Paste or Type Text",
    "desc": "Enter or paste your text into the input workspace from code editors, documents, or spreadsheets."
  },
  {
    "step": 2,
    "title": "Select Target Case",
    "desc": "Choose your desired format: Title Case, sentence case, camelCase, snake_case, kebab-case, or UPPERCASE."
  },
  {
    "step": 3,
    "title": "Instant Algorithmic Conversion",
    "desc": "The engine applies Unicode-aware case-folding rules in under 10 milliseconds across paragraphs of text."
  },
  {
    "step": 4,
    "title": "Inspect Character & Word Stats",
    "desc": "Review real-time character counts, word totals, and line metrics updated dynamically below the editor."
  },
  {
    "step": 5,
    "title": "Copy Formatted Text",
    "desc": "Click \"Copy to Clipboard\" to paste the cleaned, formatted text directly into your IDE, CMS, or publication."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "HEADLINE ERROR",
    "title": "Capitalizing Short Prepositions in Titles",
    "desc": "Manual capitalizations frequently capitalize words like \"in\", \"of\", \"and\", \"the\", and \"with\". Smart Title Case keeps them lowercase according to AP guidelines."
  },
  {
    "badge": "SYNTAX VIOLATION",
    "title": "Leaving Spaces in Database Column Names",
    "desc": "Pasting spaced text into database schemas causes SQL syntax errors. Use snake_case or kebab-case to ensure safe identifier compliance."
  },
  {
    "badge": "ALL-CAPS ACCIDENT",
    "title": "Accidental Caps Lock While Drafting",
    "desc": "Typing with Caps Lock accidentally turned on ruins long paragraphs. Convert directly to sentence case with a single click without re-typing."
  },
  {
    "badge": "CODE CASING BREAK",
    "title": "Inconsistent camelCase vs PascalCase in Codebases",
    "desc": "Mixing variable naming styles leads to linter warnings and runtime bugs. Standardize class names to PascalCase and variables to camelCase."
  }
];

const FAQS = [
  {
    "question": "What is the difference between Title Case and sentence case?",
    "answer": "Title Case capitalizes the first letter of principal words (nouns, verbs, adjectives, adverbs) while keeping short conjunctions, articles, and prepositions lowercase (e.g., \"The Life of Pi\"). Sentence case only capitalizes the very first letter of each sentence and proper nouns (e.g., \"The life of Pi is an interesting story.\")."
  },
  {
    "question": "What are camelCase and PascalCase used for?",
    "answer": "In computer programming, camelCase starts with a lowercase letter and capitalizes each subsequent word (e.g., `calculateTotalPrice`), standard for JavaScript, TypeScript, and Java variables. PascalCase capitalizes the first letter of every word (e.g., `PaymentController`), standard for classes and React components."
  },
  {
    "question": "What is the difference between snake_case and kebab-case?",
    "answer": "Both formats are all-lowercase, but snake_case separates words with underscores (`user_profile_id`), which is standard in Python, Ruby, and SQL databases. Kebab-case separates words with hyphens (`user-profile-card`), which is standard in web URLs, CSS class names, and package names."
  },
  {
    "question": "Does this tool support international Unicode characters?",
    "answer": "Yes. Our converter uses full Unicode case-folding algorithms, properly handling accented Latin letters (\u00e9/\u00c9, \u00f1/\u00d1), German umlauts and eszett (\u00e4/\u00c4, \u00df/SS), and multilingual scripts without character corruption."
  },
  {
    "question": "How does Title Case handle small words like \"and\", \"of\", and \"the\"?",
    "answer": "Our Title Case algorithm follows Associated Press (AP) and Chicago Manual of Style guidelines: articles (a, an, the), coordinating conjunctions (and, but, for, nor, or, so, yet), and prepositions under four letters (in, on, at, by, of, to, up) remain lowercase unless they are the first or last word of the title."
  },
  {
    "question": "Can I fix an entire paragraph accidentally typed in ALL CAPS?",
    "answer": "Yes. Paste your all-caps text into the converter and click \"sentence case\". The engine automatically lowercases the text and re-capitalizes the first letter of every sentence following periods, exclamation marks, and question marks."
  },
  {
    "question": "Is there a limit on how much text I can convert at once?",
    "answer": "There is no strict character limit. The tool processes entire articles, essays, and code files containing tens of thousands of words in fractions of a second."
  },
  {
    "question": "Can I convert text into URL-friendly slugs for my website?",
    "answer": "Yes. The kebab-case option strips special punctuation, replaces whitespace with hyphens, and converts text to lowercase, creating clean, SEO-friendly URL slugs for blog posts and product pages."
  },
  {
    "question": "Is my text private and secure when using this tool?",
    "answer": "Yes, 100% private. All text transformations occur strictly inside your local browser memory using client-side JavaScript. No text, code snippets, or documents are ever sent across the network or stored on any server."
  },
  {
    "question": "Is this tool free to use for commercial projects?",
    "answer": "Yes. Our Text Case Converter is completely free for personal, commercial, and developer use with no account registration or licensing restrictions."
  }
];

export default function CaseConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Text Case Converter Online',
        url: 'https://kagazo.in/tools/case-converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Convert text between Title Case, sentence case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case, and kebab-case online. 100% free with smart grammar capitalization and zero server storage.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Text Case Styles Online',
        description: 'Step-by-step verified workflow instructions for Text Case Converter Online.',
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
            name: 'Text Case Converter Online',
            item: 'https://kagazo.in/tools/case-converter',
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
          <span className="text-primary font-bold">Text Case Converter Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Full Unicode Case-Folding Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Online Case Converter </span>
            <span className="text-primary">Title, Camel, Snake & Kebab</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert text between Title Case, sentence case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case, and kebab-case online. 100% free with smart grammar capitalization and zero server storage.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <CaseConverterEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Universal Casing Engine
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instant transformation between 10+ casing conventions: Title Case, sentence case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case, and kebab-case.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Smart Headline Grammar
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Applies verified AP and Chicago style capitalization rules, keeping short prepositions, conjunctions, and articles properly formatted.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-RAM Client Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    All text manipulations occur strictly within your web browser memory. No articles, code snippets, or confidential documents are ever sent to servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Text Casing Standards & Programming Conventions
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative typography standards, computational parameters, and formatting specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Unicode Case Folding Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Case Format</th><th className="py-2.5 px-3 font-bold">Syntax Example</th><th className="py-2.5 px-3 font-bold">Standard Application</th><th className="py-2.5 px-3 font-bold">Formatting Rule</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Title Case (AP / Chicago)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">The Quick Brown Fox Jumps</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Book titles, headlines, blog articles</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Capitalizes major words; keeps articles/prepositions lowercase</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">sentence case</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">The quick brown fox jumps.</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard prose, emails, documentation</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Capitalizes the first letter of each sentence and proper nouns</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">camelCase</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">theQuickBrownFoxJumps</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">JavaScript, TypeScript variables & functions</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">First word lowercase; uppercase initial letter of following words</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PascalCase</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">TheQuickBrownFoxJumps</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">C#, Java classes, React components</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Capitalizes the initial letter of every single word</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">snake_case</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">the_quick_brown_fox_jumps</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Python variables, SQL column names</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Lowercase words joined with underscore delimiters</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">kebab-case / slug</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">the-quick-brown-fox-jumps</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Clean SEO URLs, CSS classes, git branches</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Lowercase words joined with hyphen delimiters</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert Text Case Styles Online
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
                  Common Text Casing Errors & Practical Solutions
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
                Case Converter Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Unicode Case Folding
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Formats</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Title, Sentence, Camel, Snake
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Rules</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    AP & Chicago Headline Style
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Latency</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Sub-10ms Instant In-Memory
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
