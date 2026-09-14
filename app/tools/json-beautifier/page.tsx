import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Code,
  FileCheck,
  CheckCircle2,
  HelpCircle,
  Terminal,
  Activity,
  ArrowRightLeft,
  Copy,
  AlertTriangle,
  Info,
  Sliders,
  Sparkles,
  AlignLeft,
} from 'lucide-react';
import { JsonStudioEngine } from '@/components/tools/JsonStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free JSON Beautifier & Pretty Printer Online | Kagazo',
  description:
    'Beautify and pretty-print JSON with 2-space, 4-space, or tab indentation. Features recursive key sorting, interactive tree inspection, and 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/json-beautifier',
  },
  openGraph: {
    title: 'Free JSON Beautifier & Pretty Printer Online | Kagazo',
    description:
      'Pretty-print ugly or minified JSON strings into clean, readable hierarchies with key sorting and zero server uploads.',
    url: 'https://kagazo.in/tools/json-beautifier',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Beautifier & Pretty Printer | Kagazo',
    description:
      'Beautify, indent, and format JSON payloads instantly in client-side RAM with 100% privacy.',
  },
};

const JSON_INDENT_STANDARDS = [
  {
    standard: '2 Spaces',
    indentString: '  ',
    adoptedBy: 'Google, Airbnb, React, Node.js community',
    bestFor: 'Deeply nested payloads, API docs, web applications',
    lineEfficiency: 'High: Conserves horizontal screen space',
  },
  {
    standard: '4 Spaces',
    indentString: '    ',
    adoptedBy: 'Python (PEP 8), Java, Microsoft, PHP',
    bestFor: 'Backend configurations, microservices, local logging',
    lineEfficiency: 'Medium: Emphasizes structural blocks',
  },
  {
    standard: 'Tab Characters',
    indentString: '\\t',
    adoptedBy: 'Linux kernel style, Go language standards',
    bestFor: 'Configurable developer display widths in IDEs',
    lineEfficiency: 'Customizable per editor settings',
  },
  {
    standard: 'Minified (0 Spaces)',
    indentString: 'None',
    adoptedBy: 'Production CDN assets, high-speed REST APIs',
    bestFor: 'Minimizing network transfer size and payload weight',
    lineEfficiency: 'Maximum density (1-line output)',
  },
];

const FAQS = [
  {
    question: 'Why should I beautify JSON instead of leaving it minified?',
    answer:
      'Minified JSON compresses all data onto a single unreadable line. Beautifying it with structured indentation restores nested visual hierarchies, making it readable during debugging, code reviews, and API testing.',
  },
  {
    question: 'How does alphabetical key sorting help in version control?',
    answer:
      'When two developers or microservices generate JSON objects, keys often appear in arbitrary order. Sorting keys alphabetically recursively organizes properties from A to Z, eliminating false differences in Git diffs and pull requests.',
  },
  {
    question: 'Does beautifying JSON change the actual underlying data values?',
    answer:
      'No. Beautifying only inserts whitespace and newline tokens outside of string literals. Data types, numeric precision, boolean flags, null values, and string contents remain 100% identical.',
  },
  {
    question: 'Are my confidential client payloads or database records uploaded to your servers?',
    answer:
      'Never. Kagazo runs all formatting algorithms 100% locally inside your browser volatile memory. Zero JSON payloads are ever transmitted over external networks or logged.',
  },
  {
    question: 'Can I switch back to minified JSON with a single click?',
    answer:
      'Yes. Clicking the "Minify" button strips all indentation spaces and carriage returns, reducing file size by 30% to 50% for production API transmission.',
  },
  {
    question: 'What is the standard indentation recommended for JSON?',
    answer:
      'Modern web industry guidelines (including Google, Airbnb, and Prettier) recommend 2 spaces for JSON. It prevents horizontal scroll fatigue in deeply nested objects while maintaining readability.',
  },
  {
    question: 'Can I pretty-print malformed JSON containing syntax errors?',
    answer:
      'No. A parser must first validate syntactic structure before it can understand object boundaries. Kagazo highlights the exact line and column of any syntax fault so you can fix it before beautifying.',
  },
  {
    question: 'How does this beautifier handle Unicode characters and international text?',
    answer:
      'Kagazo fully supports UTF-8 multi-byte encoding. Accented letters, Cyrillic, Arabic, Chinese, Japanese, and emojis remain perfectly intact without escaping to hex escape sequences.',
  },
  {
    question: 'Can I collapse and expand nested objects in a tree view?',
    answer:
      'Yes. Toggle to Tree View mode to interactively collapse or expand object keys, inspect property data types, and copy specific node paths.',
  },
  {
    question: 'Can I download the beautified JSON directly to my machine?',
    answer:
      'Yes. Click "Download JSON" to export the formatted payload as a .json file with UTF-8 encoding without any watermarks or registration.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Paste Ugly or Minified JSON',
    desc: 'Paste single-line JSON, messy API logs, or upload a .json file directly into the input editor.',
  },
  {
    step: 2,
    title: 'Select Indentation Spacing',
    desc: 'Choose 2 spaces (web standard), 4 spaces (backend standard), or tab characters.',
  },
  {
    step: 3,
    title: 'Enable Key Sorting (Optional)',
    desc: 'Check "Sort Keys" to recursively order object keys alphabetically for consistent Git diff comparisons.',
  },
  {
    step: 4,
    title: 'Format & Inspect Tree',
    desc: 'Click Beautify to render clean hierarchical indentation or switch to the interactive tree view.',
  },
  {
    step: 5,
    title: 'Copy Formatted JSON Output',
    desc: 'Copy the beautified JSON to clipboard with 1 click or download the ready-to-use .json document.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Unexpected token , in JSON at position X',
    title: 'Trailing Commas After Final Property',
    desc: 'Trailing commas after the last key-value pair violate RFC 8259. Kagazo pinpoints the exact character offset so you can delete the extraneous comma before beautifying.',
  },
  {
    badge: 'Error: Expected double-quoted property name',
    title: 'Single-Quoted or Unquoted Keys',
    desc: 'JavaScript allows unquoted keys like {id: 1}, but JSON strictly requires double quotes: {"id": 1}. Enclose all object property keys in standard double quotation marks.',
  },
  {
    badge: 'Error: Bad control character in string literal',
    title: 'Unescaped Line Breaks in Strings',
    desc: 'Raw newlines inside text strings must be escaped as \\n. Unescaped carriage returns crash the parser before beautification can occur.',
  },
  {
    badge: 'Error: Unexpected end of JSON input',
    title: 'Truncated Payload or Unclosed Brackets',
    desc: 'Indicates the JSON string is missing closing curly braces (}) or square brackets (]). Verify that all nested structures are properly closed.',
  },
];

export default function JsonBeautifierPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo JSON Beautifier & Pretty Printer',
        url: 'https://kagazo.in/tools/json-beautifier',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Beautify and pretty-print JSON with 2-space, 4-space, or tab indentation. Features recursive key sorting, interactive tree inspection, and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Beautify and Pretty-Print JSON Online',
        description:
          'Step-by-step instructions to beautify minified JSON, sort keys alphabetically, and inspect hierarchies.',
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
            name: 'Developer Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'JSON Beautifier',
            item: 'https://kagazo.in/tools/json-beautifier',
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
          <span className="text-primary font-bold">JSON Beautifier</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Smart Pretty-Printer &bull; 2-Space, 4-Space &amp; Tab Indentation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free JSON Beautifier &amp; </span>
            <span className="text-primary">Pretty Printer Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Beautify and pretty-print ugly or minified JSON strings into clean, readable hierarchies. 
            Features recursive alphabetical key sorting, collapsible tree viewer, and 100% in-browser RAM privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <JsonStudioEngine />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Code Readability
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Visual Structure Designed for Clean Debugging
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Minified single-line API logs make finding bugs nearly impossible. Kagazo reconstructs hierarchical indentation with industry-standard rules, making payload analysis effortless.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <AlignLeft className="w-4 h-4" /> Multi-Indentation Controls
                  </span>
                  <p className="text-xs text-text-main/70">
                    Format with 2 spaces (web standard), 4 spaces (backend standard), or tab characters based on your team's style guide.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Alphabetical Key Sorting
                  </span>
                  <p className="text-xs text-text-main/70">
                    Sort keys alphabetically at all nesting depths to eliminate noisy differences in Git pull requests.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Zero Server Exposure
                  </span>
                  <p className="text-xs text-text-main/70">
                    All formatting occurs strictly in client memory. No company payloads or customer databases are ever transmitted.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    JSON Indentation Standards &amp; Use-Case Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Detailed comparison of indentation standards across software ecosystems.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Formatting Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Standard</th>
                      <th className="py-3 px-3">Indent String</th>
                      <th className="py-3 px-3">Adopted By</th>
                      <th className="py-3 px-3">Recommended Use Case</th>
                      <th className="py-3 px-3">Line Efficiency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {JSON_INDENT_STANDARDS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.standard}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{row.indentString}</td>
                        <td className="py-3 px-3 text-xs">{row.adoptedBy}</td>
                        <td className="py-3 px-3 text-xs">{row.bestFor}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.lineEfficiency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Git Best Practice:</strong> Always sort keys alphabetically when committing sample payloads or mock API responses to prevent false git diff conflicts.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Beautify and Pretty-Print JSON in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">{s.title}</h3>
                    <p className="text-xs text-text-main/75 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common JSON Formatting Errors and How Kagazo Fixes Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/80 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deep 10 FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (JSON Beautifier &amp; Standards)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical answers regarding indentation, formatting standards, and payload handling.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-black">Q{idx + 1}.</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/80 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Developer Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Formatter
                </Link>
                <Link
                  href="/tools/json-validator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Validator
                </Link>
                <Link
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
                </Link>
                <Link
                  href="/tools/sql-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  SQL Formatter
                </Link>
                <Link
                  href="/tools/markdown-to-html"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Markdown to HTML
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
