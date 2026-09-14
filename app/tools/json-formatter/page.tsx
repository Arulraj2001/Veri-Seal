import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Code,
  FileJson,
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
  TreeDeciduous,
} from 'lucide-react';
import { JsonStudioEngine } from '@/components/tools/JsonStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free JSON Formatter, Validator & Beautifier Online | Kagazo',
  description:
    'Format, validate, beautify, and minify JSON data online with 100% client-side RAM privacy. Features collapsible tree viewer, line-by-line syntax error coordinates, key sorting, and RFC 8259 compliance.',
  alternates: {
    canonical: 'https://kagazo.in/tools/json-formatter',
  },
  openGraph: {
    title: 'Free JSON Formatter, Validator & Beautifier Online | Kagazo',
    description:
      'Format, validate, and beautify JSON with interactive collapsible tree views and zero server uploads.',
    url: 'https://kagazo.in/tools/json-formatter',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter & Validator Online | Kagazo',
    description:
      'Beautify, validate, and debug JSON payloads with instant error coordinates and 100% in-browser privacy.',
  },
};

const JSON_SPEC_COMPARISON = [
  {
    feature: 'String Quotes',
    standardJson: 'Strict double quotes only ("key": "value")',
    json5: 'Single and double quotes allowed',
    yaml: 'Quotes optional for most strings',
    rule: 'RFC 8259 mandates double quotes for interoperability',
  },
  {
    feature: 'Trailing Commas',
    standardJson: 'Forbidden (causes SyntaxError)',
    json5: 'Allowed on arrays and objects',
    yaml: 'Not applicable (indentation based)',
    rule: 'Must be stripped before passing to standard parsers',
  },
  {
    feature: 'Comments Support',
    standardJson: 'Not supported (No // or /* */)',
    json5: 'Single-line & multi-line comments',
    yaml: 'Full comment support with #',
    rule: 'JSON is strictly data interchange, not configuration',
  },
  {
    feature: 'Key Quotation',
    standardJson: 'Mandatory double quotes for all keys',
    json5: 'Unquoted identifiers permitted',
    yaml: 'Unquoted keys standard',
    rule: 'Prevents collision with reserved programming keywords',
  },
  {
    feature: 'Numerical Types',
    standardJson: 'Decimals, negative, and scientific (e.g. 1e10)',
    json5: 'Hexadecimal, leading/trailing decimals',
    yaml: 'Hex, octal, binary, and floats',
    rule: 'NaN and Infinity are invalid in standard JSON',
  },
];

const FAQS = [
  {
    question: 'Is my confidential JSON data uploaded to remote servers or logged anywhere?',
    answer:
      'Never. Kagazo processes all JSON parsing, formatting, beautifying, and minification 100% locally inside your browser’s volatile JavaScript memory (V8 engine). No payloads, authentication tokens, API credentials, or customer records are ever transmitted across external network connections.',
  },
  {
    question: 'How does Kagazo detect and highlight JSON syntax errors?',
    answer:
      'When an invalid JSON string is supplied, our syntax engine calculates the exact character byte offset where parsing failed and converts it into precise line and column coordinates. It clearly explains whether the fault was caused by a missing comma, unquoted key, or unclosed curly brace.',
  },
  {
    question: 'Can I sort JSON object keys alphabetically?',
    answer:
      'Yes. Simply toggle the "Sort Keys" option. The engine recursively traverses your entire object hierarchy and re-orders properties alphabetically from A to Z, making Git diffs, API payload comparisons, and code reviews effortless.',
  },
  {
    question: 'What is the practical difference between 2-space and 4-space indentation?',
    answer:
      '2-space indentation is the modern web industry standard recommended by Google and Airbnb style guides because it preserves screen real estate in deeply nested structures. 4-space indentation is traditionally favored in Python, Java, and C# environments for enhanced visual separation.',
  },
  {
    question: 'Can this tool minify JSON for production API requests?',
    answer:
      'Yes. Clicking the "Minify" button strips all unnecessary indentation, space characters, and carriage returns, reducing payload transfer size by up to 30% to 50% for high-speed network transmission and storage efficiency.',
  },
  {
    question: 'Why does JSON strictly disallow trailing commas?',
    answer:
      'The ECMAScript JSON specification (RFC 8259) prohibits trailing commas after the last key-value pair or array element to ensure unambiguous deserialization across diverse programming languages like C, Java, and Go that allocate fixed-size array buffers.',
  },
  {
    question: 'How does Kagazo handle huge JSON files exceeding 50 MB?',
    answer:
      'Because all processing is client-side, execution speed depends on your local device RAM. Kagazo uses optimized typed string buffers and incremental parsing algorithms, allowing you to format payloads up to 100 MB smoothly without browser freeze.',
  },
  {
    question: 'Can I convert formatted JSON into an interactive collapsible tree?',
    answer:
      'Yes. The built-in Tree Viewer provides interactive collapsible parent nodes, type-color coding (strings, numbers, booleans, nulls), child element count badges, and node path breadcrumbs for fast data structure navigation.',
  },
  {
    question: 'Why does my valid JavaScript object fail validation in JSON?',
    answer:
      'JavaScript objects permit unquoted keys, single-quoted strings, trailing commas, and function properties. Standard JSON is a strict subset of JavaScript literals requiring double-quoted keys and strings, and prohibits functions, undefined values, or comments.',
  },
  {
    question: 'Can I download the beautified output as a formatted .json file?',
    answer:
      'Yes. Clicking "Download JSON" automatically generates an RFC-compliant .json file with UTF-8 encoding and triggers an instant browser download without uploading a single byte to our servers.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Paste or Upload Raw JSON',
    desc: 'Paste your unformatted JSON payload, API response, or drag and drop a .json document directly into the editor.',
  },
  {
    step: 2,
    title: 'Select Indentation Standard',
    desc: 'Choose 2-space indentation (modern web standard), 4-space (enterprise standard), or tab characters.',
  },
  {
    step: 3,
    title: 'Sort Keys & Tree Mode (Optional)',
    desc: 'Toggle Alphabetical Key Sorting to standardize object keys across nested levels for clean Git diff comparisons.',
  },
  {
    step: 4,
    title: 'Instant Syntax Validation',
    desc: 'If syntax errors exist, inspect the exact line and column indicator highlighting missing commas or quotes.',
  },
  {
    step: 5,
    title: 'Copy or Download Formatted File',
    desc: 'Copy the beautified JSON with one click or download the formatted .json file for production deployment.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Unexpected token , in JSON at position X',
    title: 'Forbidden Trailing Commas',
    desc: 'Placing a comma after the final array item or object key (e.g., {"a": 1,}) violates RFC 8259. Kagazo pinpoints the exact character offset so you can delete trailing commas instantly.',
  },
  {
    badge: 'Error: Expected property name or \'}\' in JSON',
    title: 'Single Quotes or Unquoted Keys',
    desc: 'JavaScript allows {\'name\': \'Alex\'} or {name: "Alex"}, but JSON strictly mandates double quotes: {"name": "Alex"}. Our debugger highlights unquoted identifiers immediately.',
  },
  {
    badge: 'Error: Unexpected token < in JSON at position 0',
    title: 'HTML Error Page Ingestion',
    desc: 'This occurs when an API endpoint returns an HTML 404/500 error page (starting with <!DOCTYPE html>) instead of valid JSON. Our validator detects HTML tags and explains the API routing failure.',
  },
  {
    badge: 'Error: Bad control character in string literal',
    title: 'Unescaped Newlines & Tabs',
    desc: 'Literal line breaks inside string values must be escaped as \\n and tabs as \\t. Kagazo identifies unescaped control codes and suggests appropriate backslash escape sequences.',
  },
];

export default function JsonFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo JSON Formatter, Validator & Beautifier',
        url: 'https://kagazo.in/tools/json-formatter',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Format, validate, beautify, and minify JSON data online with 100% client-side RAM privacy. Features collapsible tree viewer, line-by-line syntax error coordinates, key sorting, and RFC 8259 compliance.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Format and Validate JSON Online',
        description:
          'Step-by-step instructions to beautify, sort, validate, and minify JSON data online.',
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
            name: 'JSON Formatter',
            item: 'https://kagazo.in/tools/json-formatter',
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
          <span className="text-primary font-bold">JSON Formatter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC 8259 Standards Compliant &bull; 100% In-Browser Memory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free JSON Formatter, </span>
            <span className="text-primary">Validator &amp; Beautifier</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Format, validate, beautify, and minify JSON data online with instant line and column error coordinates. 
            Interactive collapsible tree viewer, recursive key sorting, and zero server upload privacy.
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
                  Engineering Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Why Developers Rely on Kagazo JSON Studio
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Most online formatters upload your sensitive API keys, customer databases, and auth tokens to third-party servers. Kagazo processes all parsing inside your browser's local V8 JavaScript memory with zero external requests.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Multi-Indentation Standards
                  </span>
                  <p className="text-xs text-text-main/70">
                    Switch between 2-space (Google/Airbnb), 4-space (Java/Python), tab characters, or ultra-dense minified code.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <TreeDeciduous className="w-4 h-4" /> Interactive Tree &amp; Sorting
                  </span>
                  <p className="text-xs text-text-main/70">
                    Explore deep hierarchies with collapsible nodes, data-type badges, and recursive alphabetical key sorting.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% Client-Side Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Confidential payloads stay in local RAM. Zero cookies, zero databases, and zero tracking scripts.
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
                    RFC 8259 Specification &amp; Comparison Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Technical standards differentiating standard JSON from JSON5 and YAML.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  IETF Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Syntax Feature</th>
                      <th className="py-3 px-3">Standard JSON (RFC 8259)</th>
                      <th className="py-3 px-3">JSON5 Extension</th>
                      <th className="py-3 px-3">YAML Spec</th>
                      <th className="py-3 px-3">Interoperability Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {JSON_SPEC_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.feature}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{row.standardJson}</td>
                        <td className="py-3 px-3 text-xs">{row.json5}</td>
                        <td className="py-3 px-3 text-xs">{row.yaml}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.rule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Strict Standards Notice:</strong> While relaxed parsers allow comments and single quotes, RFC 8259 requires strict compliance for interoperability across microservices, REST APIs, and GraphQL gateways.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Format and Validate JSON in 5 Steps
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
                Common JSON Syntax Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (JSON Studio &amp; Standards)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive technical insights regarding JSON standards, memory privacy, and debugging.
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
                  href="/tools/json-validator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Validator
                </Link>
                <Link
                  href="/tools/json-beautifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Beautifier
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
                  href="/tools/base64-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Encoder
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
