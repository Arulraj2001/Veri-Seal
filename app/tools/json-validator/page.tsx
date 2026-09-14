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
  Bug,
} from 'lucide-react';
import { JsonStudioEngine } from '@/components/tools/JsonStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free JSON Validator & Syntax Debugger Online | Kagazo',
  description:
    'Validate JSON payloads against strict RFC 8259 specifications. Get instant line and column error coordinates, actionable syntax fixes, and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/json-validator',
  },
  openGraph: {
    title: 'Free JSON Validator & Syntax Debugger Online | Kagazo',
    description:
      'Validate JSON data with exact character offsets, visual error highlights, and zero server logging.',
    url: 'https://kagazo.in/tools/json-validator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Validator & Syntax Debugger | Kagazo',
    description:
      'Pinpoint JSON syntax errors with precise line/column coordinates in client-side RAM with 100% privacy.',
  },
};

const JSON_ERROR_MATRIX = [
  {
    signature: 'Unexpected token } in JSON at position X',
    snippet: '{"items": [1, 2, 3,]}',
    rootCause: 'Trailing comma before closing bracket or brace',
    remediation: 'Remove trailing comma after the final value',
  },
  {
    signature: 'Unexpected token \' in JSON at position X',
    snippet: '{\'name\': \'Kagazo\'}',
    rootCause: 'Single quotes used instead of double quotes',
    remediation: 'Replace all single quotes with strict double quotes (")',
  },
  {
    signature: 'Unexpected end of JSON input',
    snippet: '{"user": {"id": 101}',
    rootCause: 'Unclosed object brace or array bracket',
    remediation: 'Balance curly braces and square brackets at EOF',
  },
  {
    signature: 'Expected double-quoted property name',
    snippet: '{status: "success"}',
    rootCause: 'Unquoted object property keys',
    remediation: 'Wrap all key names in mandatory double quotes',
  },
  {
    signature: 'Unexpected number in JSON at position X',
    snippet: '{"val": 0123}',
    rootCause: 'Leading zero in numeric decimal value',
    remediation: 'Strip leading zeroes (RFC 8259 forbids octal literals)',
  },
];

const FAQS = [
  {
    question: 'How does Kagazo detect the exact line and column of a JSON syntax error?',
    answer:
      'When JSON.parse fails, it reports a character byte offset. Our validation engine scans the input string up to that index, calculating line breaks (\\n) and column character counts to generate human-readable line and column coordinates.',
  },
  {
    question: 'Why does my JSON work in Node.js or Python but fail standard JSON validation?',
    answer:
      'Many runtime environments and libraries (such as Python’s ast.literal_eval or Node.js eval) are lenient and tolerate single quotes, comments, or trailing commas. Standard JSON (RFC 8259) is strictly uniform across all programming environments and forbids relaxed formatting.',
  },
  {
    question: 'What is the maximum JSON payload size I can validate in Kagazo?',
    answer:
      'Because all processing occurs in your browser’s volatile JavaScript memory without network upload bottlenecks, you can validate payloads up to 100 MB smoothly depending on your machine’s RAM.',
  },
  {
    question: 'Is my confidential API data or customer database uploaded to your servers?',
    answer:
      'Never. Kagazo guarantees 100% in-browser client-side execution. Zero payloads, headers, tokens, or personal identifiers are ever transmitted across the internet or logged.',
  },
  {
    question: 'Can this validator auto-repair common syntax errors?',
    answer:
      'While the validator highlights the exact cause and coordinates of the fault, standard practice recommends reviewing the fix before production deployment. Our Error Matrix provides exact drop-in solutions.',
  },
  {
    question: 'Does this tool validate JSON Schema (Draft 4, 7, 2020-12)?',
    answer:
      'This tool validates syntactic conformance against the IETF RFC 8259 specification. For structural schema validation against JSON Schema definitions, ensure your payload is syntactically valid first.',
  },
  {
    question: 'Why does "Unexpected token < in JSON at position 0" occur in web apps?',
    answer:
      'This occurs when an API call expects JSON but receives an HTML error response (such as a 404 Not Found or 502 Bad Gateway page starting with <!DOCTYPE html>). The validator detects this and explains the server response mismatch.',
  },
  {
    question: 'Can I validate JSON files directly from my local filesystem?',
    answer:
      'Yes. Drag and drop any .json file into the editor. The browser reads the file locally via the FileReader API without uploading it over the network.',
  },
  {
    question: 'What does "Bad control character in string literal" mean?',
    answer:
      'RFC 8259 mandates that all ASCII control characters (U+0000 through U+001F, such as raw unescaped line breaks or tabs) inside string literals must be escaped with a backslash (\\n, \\t, \\r).',
  },
  {
    question: 'Can I format and beautify the JSON immediately after validating it?',
    answer:
      'Yes. Once the JSON passes validation, click "Format" to pretty-print with 2-space or 4-space indentation, or click "Minify" to strip all whitespace for high-speed API payloads.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input JSON Payload',
    desc: 'Paste your raw JSON string, webhook body, or upload a .json document directly into the editor.',
  },
  {
    step: 2,
    title: 'Automated RFC 8259 Linting',
    desc: 'The engine scans syntax tokens in real-time, verifying matching braces, quotes, and value types.',
  },
  {
    step: 3,
    title: 'Inspect Error Coordinates',
    desc: 'If invalid, review the exact Line and Column coordinate badge pointing directly to the fault.',
  },
  {
    step: 4,
    title: 'Apply Remediation Fix',
    desc: 'Use the Error Diagnostics table to repair trailing commas, unquoted keys, or mismatched braces.',
  },
  {
    step: 5,
    title: 'Copy Verified JSON Output',
    desc: 'Copy the verified, compliant JSON or export the beautified document directly to your codebase.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Unexpected token } in JSON at position X',
    title: 'Trailing Commas in Objects & Arrays',
    desc: 'Caused by placing a comma after the final property. RFC 8259 strictly requires terminating values without trailing commas. Delete the comma before the closing brace or bracket.',
  },
  {
    badge: 'Error: Expected double-quoted property name',
    title: 'Unquoted Object Key Names',
    desc: 'Occurs when writing JavaScript object literals (e.g., {id: 1}) instead of JSON. All keys must be enclosed in double quotation marks ({"id": 1}).',
  },
  {
    badge: 'Error: Unexpected token \' in JSON',
    title: 'Single-Quoted String Literals',
    desc: 'JSON does not support single quotes (\'value\'). Replace all single quotes around strings and keys with standard double quotes (").',
  },
  {
    badge: 'Error: Unexpected end of JSON input',
    title: 'Unclosed Brackets or Braces',
    desc: 'Indicates the payload was truncated or an opening bracket ([) or brace ({) lacks its closing pair. Ensure all nested blocks are properly terminated.',
  },
];

export default function JsonValidatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo JSON Validator & Syntax Debugger',
        url: 'https://kagazo.in/tools/json-validator',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Validate JSON payloads against strict RFC 8259 specifications. Get instant line and column error coordinates, actionable syntax fixes, and 100% in-browser privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Validate and Debug JSON Online',
        description:
          'Step-by-step instructions to validate JSON syntax, detect line/column coordinates, and fix errors.',
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
            name: 'JSON Validator',
            item: 'https://kagazo.in/tools/json-validator',
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
          <span className="text-primary font-bold">JSON Validator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC 8259 Diagnostic Engine &bull; Line &amp; Column Error Coordinates</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free JSON Validator &amp; </span>
            <span className="text-primary">Syntax Debugger Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Validate JSON payloads against strict RFC 8259 specifications. Get instant line and column error coordinates, actionable syntax fixes, and 100% in-browser RAM privacy.
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
                  Real-Time Precision
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Instant Syntax Diagnostics with Zero Server Logging
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Debugging malformed JSON in API responses can take hours of manual inspection. Kagazo pinpoints the exact byte position, line number, and column offset with actionable error explanations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Bug className="w-4 h-4" /> Coordinate Offset Locator
                  </span>
                  <p className="text-xs text-text-main/70">
                    Calculates line and column numbers immediately from byte offsets so you jump directly to the error.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Strict RFC 8259 Rules
                  </span>
                  <p className="text-xs text-text-main/70">
                    Flags trailing commas, unquoted keys, single quotes, and unescaped characters before deployment.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Memory
                  </span>
                  <p className="text-xs text-text-main/70">
                    Your production payloads and user data never leave your computer. 100% safe for enterprise secrets.
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
                    JSON Error Diagnostics &amp; Resolution Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Common browser error signatures, root causes, and verified code fixes.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Syntax Diagnostics
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Browser Error Signature</th>
                      <th className="py-3 px-3">Sample Broken Snippet</th>
                      <th className="py-3 px-3">Root Cause</th>
                      <th className="py-3 px-3">Remediation / Fix</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {JSON_ERROR_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-rose-600 font-mono text-xs">{row.signature}</td>
                        <td className="py-3 px-3 font-mono text-xs text-text-main bg-surface rounded">{row.snippet}</td>
                        <td className="py-3 px-3 text-xs">{row.rootCause}</td>
                        <td className="py-3 px-3 text-xs font-semibold text-emerald-700">{row.remediation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Debugging Tip:</strong> When fixing an error at a reported line, inspect the character immediately preceding it—parsers often fail on the next character when a comma or quote is omitted.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Validate and Debug JSON in 5 Steps
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
                Common JSON Validation Failures and How Kagazo Fixes Them
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
                  Frequently Asked Questions (JSON Validation &amp; Debugging)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Authoritative answers regarding JSON validation specifications and error resolution.
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
                  href="/tools/url-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Decoder
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
