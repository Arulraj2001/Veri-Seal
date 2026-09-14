import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  FileCode,
  FileCheck,
  Eye,
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
  BookOpen,
} from 'lucide-react';
import { MarkdownStudioEngine } from '@/components/tools/MarkdownStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Markdown to HTML Converter Online | Live GFM Preview & Export | Kagazo',
  description:
    'Convert Markdown to clean, semantic HTML markup online. Features live split-pane preview, GitHub Flavored Markdown (GFM tables, task lists, code blocks), syntax highlighting, and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/markdown-to-html',
  },
  openGraph: {
    title: 'Free Markdown to HTML Converter Online | Kagazo',
    description:
      'Convert GitHub Flavored Markdown to HTML with live preview, syntax highlighting, and instant HTML export.',
    url: 'https://kagazo.in/tools/markdown-to-html',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Markdown to HTML Converter | Kagazo',
    description:
      'Convert Markdown to semantic HTML with live preview, GFM tables, and 100% client-side memory privacy.',
  },
};

const MARKDOWN_SYNTAX_MATRIX = [
  {
    syntax: 'Headings (#, ##, ###)',
    markdown: '## Subheading Title',
    html: '<h2>Subheading Title</h2>',
    standard: 'CommonMark',
    semantics: 'SEO heading structure and document outline hierarchy',
  },
  {
    syntax: 'Emphasis (*bold*, _italic_)',
    markdown: '**Bold** & *Italic*',
    html: '<strong>Bold</strong> & <em>Italic</em>',
    standard: 'CommonMark',
    semantics: 'Semantic text emphasis and screen-reader accessibility',
  },
  {
    syntax: 'GFM Tables (| col |)',
    markdown: '| Name | Role |\\n|---|---|\\n| John | Admin |',
    html: '<table><thead>...</thead><tbody>...</tbody></table>',
    standard: 'GitHub Flavored (GFM)',
    semantics: 'Tabular data presentation with aligned columns',
  },
  {
    syntax: 'Fenced Code Blocks (```)',
    markdown: '```js\\nconst x = 10;\\n```',
    html: '<pre><code class="language-js">...</code></pre>',
    standard: 'CommonMark',
    semantics: 'Preserves monospace formatting, indentation, and syntax hooks',
  },
  {
    syntax: 'Task Checklists (- [x])',
    markdown: '- [x] Completed task\\n- [ ] Pending',
    html: '<ul class="contains-task-list"><li><input type="checkbox" checked />...</li></ul>',
    standard: 'GitHub Flavored (GFM)',
    semantics: 'Interactive task management and issue tracking lists',
  },
  {
    syntax: 'Blockquotes (>)',
    markdown: '> Verified quotation note',
    html: '<blockquote><p>Verified quotation note</p></blockquote>',
    standard: 'CommonMark',
    semantics: 'Cited editorial quotes, testimonials, and callouts',
  },
];

const FAQS = [
  {
    question: 'Does this converter support GitHub Flavored Markdown (GFM)?',
    answer:
      'Yes. Kagazo fully supports the GitHub Flavored Markdown (GFM) specification, including tables with column alignment, task lists with checkboxes (- [x]), strikethrough text (~~deleted~~), URL autolinking, and fenced code blocks with language identifiers for syntax highlighting.',
  },
  {
    question: 'Can I copy the raw HTML output to paste into my CMS or static blog?',
    answer:
      'Yes. Simply toggle to the "Raw HTML" view and click the "Copy HTML" button. The clean, semantic HTML output can be pasted directly into WordPress Gutenberg blocks, Ghost CMS, Webflow rich text editors, Shopify pages, or static site generators like Astro and Next.js.',
  },
  {
    question: 'Are my private documents, README files, or technical specs uploaded to remote servers?',
    answer:
      'Never. Kagazo renders all Markdown into DOM trees and HTML source strings 100% locally inside your browser’s volatile JavaScript memory using client-side AST parsers. Zero document text, product requirements, or confidential internal notes are ever uploaded or stored.',
  },
  {
    question: 'How does Kagazo sanitize HTML output against Cross-Site Scripting (XSS)?',
    answer:
      'When rendering live visual previews, our parser automatically sanitizes malicious tags such as unescaped <script>, <iframe>, or dangerous event handlers (onerror, onload). This guarantees safe visual rendering even when testing untrusted user-submitted Markdown inputs.',
  },
  {
    question: 'Can I download the converted output as an .html file?',
    answer:
      'Yes. Clicking the "Download HTML" button instantly packages the generated markup into a standards-compliant .html file containing UTF-8 encoding declarations, ready for web deployment or offline documentation archival.',
  },
  {
    question: 'How does line break handling work in CommonMark vs GFM?',
    answer:
      'In standard CommonMark, single line breaks are treated as spaces unless two trailing spaces or a backslash terminate the line. In GFM, hard line breaks can be enabled optionally to preserve prose formatting.',
  },
  {
    question: 'Can I convert Markdown tables directly to HTML <table> elements?',
    answer:
      'Yes. Our GFM engine translates table columns, header rows (<thead>), body rows (<tbody>), and alignment colons (:---, :---:, ---:) into semantic HTML table structures with appropriate CSS styling.',
  },
  {
    question: 'Does this converter preserve inline HTML tags written inside Markdown?',
    answer:
      'Yes. Standard HTML tags like <kbd>, <details>, <summary>, and custom spans are preserved while stripping dangerous script injection tags for safety.',
  },
  {
    question: 'Can I upload an entire README.md file directly?',
    answer:
      'Yes. Drag and drop any .md, .markdown, or .txt file into the editor. The file is read locally via the browser FileReader API with zero server uploads.',
  },
  {
    question: 'Does the converted HTML include CSS styles or is it clean semantic markup?',
    answer:
      'Kagazo produces 100% clean, unopinionated semantic HTML markup without bloated inline style tags, making it plug-and-play compatible with Tailwind CSS, Bootstrap, or custom stylesheets.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input Markdown Content',
    desc: 'Paste your Markdown text, README.md documentation, or write directly in the left editor pane.',
  },
  {
    step: 2,
    title: 'Format Tables & Checklists',
    desc: 'Use GFM syntax for tables, task lists (- [x]), blockquotes, and fenced code blocks (```js).',
  },
  {
    step: 3,
    title: 'Inspect Live Visual Preview',
    desc: 'Review the synchronized visual preview rendered in real-time in the right-hand panel.',
  },
  {
    step: 4,
    title: 'Switch to Raw HTML View',
    desc: 'Toggle to the Raw HTML tab to inspect semantic tags (h1, p, pre, code, table, blockquote).',
  },
  {
    step: 5,
    title: 'Copy or Download .html',
    desc: 'Copy the clean markup to your clipboard or download a complete standards-compliant .html file.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Broken Markdown Table Formatting',
    title: 'Missing Table Delimiter Rows',
    desc: 'GFM tables require a hyphen delimiter row (|---|---|) directly under the header. Omitting this row causes markdown to render as plain unaligned text. Ensure delimiter hyphens are present.',
  },
  {
    badge: 'Error: Unfenced Code Block Merging',
    title: 'Unclosed Backtick Fences (```)',
    desc: 'Forgetting to close a triple backtick code fence causes the remainder of the document to be treated as monospace code. Always close fences with matching ```.',
  },
  {
    badge: 'Error: Accidental Paragraph Collapsing',
    title: 'Single Line Breaks Not Creating Paragraphs',
    desc: 'In standard CommonMark, separating paragraphs requires an empty blank line. Single line breaks simply join lines with a space. Add an empty line between distinct paragraphs.',
  },
  {
    badge: 'Error: Unescaped Angle Brackets (< and >)',
    title: 'HTML Entity Collision in Text',
    desc: 'Using raw < or > characters in mathematical expressions can cause parsers to mistake them for HTML tags. Escape them as &lt; or wrap them in backticks (`<`).',
  },
];

export default function MarkdownToHtmlPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Markdown to HTML Studio',
        url: 'https://kagazo.in/tools/markdown-to-html',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Convert GitHub Flavored Markdown to semantic HTML online with split-pane live preview, code export, and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Markdown to Semantic HTML Online in 5 Steps',
        description:
          'Step-by-step instructions to convert Markdown syntax into clean HTML for websites, blogs, and documentation.',
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
            name: 'Markdown to HTML',
            item: 'https://kagazo.in/tools/markdown-to-html',
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

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">Markdown to HTML</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-700 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Split-Pane Markdown Studio &bull; Full GitHub Flavored Markdown (GFM)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Markdown to HTML </span>
            <span className="text-emerald-600">Converter &amp; Live Editor</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert <strong>GitHub Flavored Markdown (GFM)</strong> to clean, semantic HTML. Features real-time split-pane rendering, table generators, syntax highlighting, and zero server logging.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <MarkdownStudioEngine />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Semantic Web Publishing
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Bridging Developer Documentation and CMS Content
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Markdown allows engineers to write rich documentation without writing manual HTML tags. Kagazo transforms your plain text into pristine semantic HTML ready for WordPress, Webflow, Ghost, or static site generators.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> Live Split-Pane Preview
                  </span>
                  <p className="text-xs text-text-main/70">
                    See your rendered HTML output side-by-side with instantaneous AST updates as you type.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> GFM Tables &amp; Tasks
                  </span>
                  <p className="text-xs text-text-main/70">
                    Full support for GitHub Flavored Markdown including aligned tables, task checklists (- [x]), and code fences.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Zero Server Exposure
                  </span>
                  <p className="text-xs text-text-main/70">
                    All markdown AST rendering runs locally in browser RAM. Confidential specs and READMEs remain completely private.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Markdown Syntax to Semantic HTML Mapping Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Cross-reference between CommonMark / GFM syntax and generated semantic HTML elements.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Syntax Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Syntax Feature</th>
                      <th className="py-3 px-3">Markdown Notation</th>
                      <th className="py-3 px-3">Generated HTML Tag</th>
                      <th className="py-3 px-3">Standard Spec</th>
                      <th className="py-3 px-3">Semantic &amp; SEO Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {MARKDOWN_SYNTAX_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.syntax}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{row.markdown}</td>
                        <td className="py-3 px-3 font-mono text-xs text-sky-700">{row.html}</td>
                        <td className="py-3 px-3 text-xs font-semibold text-primary">{row.standard}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.semantics}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Accessibility &amp; SEO:</strong> Fenced code blocks produce semantic &lt;pre&gt;&lt;code&gt; structures with language classes compatible with Prism.js, Highlight.js, and screen readers.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                How to Convert Markdown to HTML in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
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
                Common Markdown Conversion Errors and How Kagazo Fixes Them
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
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  Frequently Asked Questions (Markdown to HTML &amp; GFM)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed technical answers regarding Markdown specifications, GFM extensions, and HTML output.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-emerald-600 font-black">Q{idx + 1}.</span>
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
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
                </Link>
                <Link
                  href="/tools/html-entity-encoder"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Entity Encoder
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Formatter
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
