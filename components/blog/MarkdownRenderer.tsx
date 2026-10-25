'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import {
  Info,
  Sparkles,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  Layers,
  Quote,
  Check,
  Copy,
  TableProperties,
} from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

// Target Indian government document phrases to automatically link to dedicated SEO landing pages
const DOC_SEO_MAPPINGS: { phrase: string; url: string }[] = [
  { phrase: 'e-Aadhaar', url: '/verify-aadhaar-pdf' },
  { phrase: 'Aadhaar PDF', url: '/verify-aadhaar-pdf' },
  { phrase: 'Community Certificate', url: '/verify-community-certificate-tamil-nadu' },
  { phrase: 'Nativity Certificate', url: '/verify-nativity-certificate-tamil-nadu' },
  { phrase: 'Income Certificate', url: '/verify-income-certificate-tamil-nadu' },
  { phrase: 'PAN Card', url: '/verify-pan-card-digital-signature' },
  { phrase: 'e-PAN', url: '/verify-pan-card-digital-signature' },
  { phrase: 'DigiLocker', url: '/verify-digilocker-pdf' },
  { phrase: 'EPFO UAN', url: '/verify-epfo-uan-member-passbook' },
  { phrase: 'ITR-V', url: '/verify-income-tax-itr-v-acknowledgement' },
];

function autoLinkDocMentions(markdown: string): string {
  if (!markdown) return '';

  // Split by code blocks to avoid mutating code blocks
  const parts = markdown.split(/(```[\s\S]*?```)/g);

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith('```')) continue;

    for (const item of DOC_SEO_MAPPINGS) {
      const regex = new RegExp(
        `(?<!\\[)\\b(${item.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?!\\]|\\([^)]*\\))`,
        'i'
      );
      parts[i] = parts[i].replace(regex, `[$1](${item.url})`);
    }
  }

  return parts.join('');
}

// Helper to extract plain text recursively from React nodes
function extractNodeText(node: React.ReactNode): string {
  if (!node) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractNodeText).join('');
  if (React.isValidElement(node) && (node.props as any)?.children) {
    return extractNodeText((node.props as any).children);
  }
  return '';
}

// Helper to strip alert marker like [!NOTE] from initial text
function stripAlertMarker(node: React.ReactNode): React.ReactNode {
  if (typeof node === 'string') {
    return node.replace(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, '');
  }
  if (Array.isArray(node)) {
    return node.map((child, idx) => (idx === 0 ? stripAlertMarker(child) : child));
  }
  if (React.isValidElement(node) && (node.props as any)?.children) {
    return React.cloneElement(node, {
      ...(node.props as any),
      children: stripAlertMarker((node.props as any).children),
    });
  }
  return node;
}

// Callout Card Component
function CalloutCard({
  type,
  children,
}: {
  type: 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION';
  children: React.ReactNode;
}) {
  const configs = {
    NOTE: {
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
      label: 'Specification Note',
      badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border-blue-200',
      wrapperClass:
        'bg-gradient-to-br from-blue-50/90 via-blue-50/40 to-white dark:from-blue-950/30 dark:via-blue-950/15 dark:to-surface border-blue-200/90 dark:border-blue-800/50 border-l-blue-600 dark:border-l-blue-400 text-blue-950 dark:text-blue-100',
    },
    TIP: {
      icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
      label: 'Operational Pro-Tip',
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-200',
      wrapperClass:
        'bg-gradient-to-br from-emerald-50/90 via-emerald-50/40 to-white dark:from-emerald-950/30 dark:via-emerald-950/15 dark:to-surface border-emerald-200/90 dark:border-emerald-800/50 border-l-emerald-600 dark:border-l-emerald-400 text-emerald-950 dark:text-emerald-100',
    },
    IMPORTANT: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
      label: 'Mandatory Compliance Rule',
      badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 border-amber-200',
      wrapperClass:
        'bg-gradient-to-br from-amber-50/90 via-amber-50/40 to-white dark:from-amber-950/30 dark:via-amber-950/15 dark:to-surface border-amber-200/90 dark:border-amber-800/50 border-l-amber-600 dark:border-l-amber-400 text-amber-950 dark:text-amber-100',
    },
    WARNING: {
      icon: <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />,
      label: 'Critical Rejection Warning',
      badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200 border-orange-200',
      wrapperClass:
        'bg-gradient-to-br from-orange-50/90 via-orange-50/40 to-white dark:from-orange-950/30 dark:via-orange-950/15 dark:to-surface border-orange-200/90 dark:border-orange-800/50 border-l-orange-600 dark:border-l-orange-400 text-orange-950 dark:text-orange-100',
    },
    CAUTION: {
      icon: <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />,
      label: 'Strict Form Precaution',
      badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 border-rose-200',
      wrapperClass:
        'bg-gradient-to-br from-rose-50/90 via-rose-50/40 to-white dark:from-rose-950/30 dark:via-rose-950/15 dark:to-surface border-rose-200/90 dark:border-rose-800/50 border-l-rose-600 dark:border-l-rose-400 text-rose-950 dark:text-rose-100',
    },
  };

  const c = configs[type];
  const cleanedChildren = stripAlertMarker(children);

  return (
    <div
      className={`my-8 p-5 sm:p-6 rounded-2xl border border-l-4 shadow-xs not-prose transition-all ${c.wrapperClass}`}
    >
      <div className="flex items-center gap-2.5 mb-3">
        {c.icon}
        <span
          className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${c.badgeClass}`}
        >
          {c.label}
        </span>
      </div>
      <div className="text-sm sm:text-base leading-relaxed space-y-2 font-normal [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-5">
        {cleanedChildren}
      </div>
    </div>
  );
}

// Smart Table Cell Formatter: Wraps technical values like 1200x1800 px, 300 DPI, #FFFFFF in clean monospace badges
function formatTableCellContent(children: React.ReactNode): React.ReactNode {
  if (typeof children !== 'string') return children;

  const text = children.trim();
  // Check if cell is an exact technical value or dimension
  const isTechMetric =
    /^(\d+(\.\d+)?\s*(x|×)\s*\d+(\.\d+)?\s*(px|mm|cm)?)$/i.test(text) ||
    /^(\d+(\.\d+)?\s*(DPI|px|KB|MB|mm|cm|GSM))$/i.test(text) ||
    /^(#[0-9A-Fa-f]{3,8})$/.test(text) ||
    /^(\d+\s*(x|×)\s*\d+\s*(Grid|Matrix))$/i.test(text) ||
    /^(\d+\s*Photos\s*Total)$/i.test(text);

  if (isTechMetric) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-xs font-bold bg-surface text-text-main border border-surface-darker shadow-2xs whitespace-nowrap">
        {text}
      </span>
    );
  }

  return children;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = React.useMemo(() => autoLinkDocMentions(content), [content]);

  // Helper to generate slug ID for headings
  const slugify = (text: string) => {
    return String(text)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-black prose-headings:text-text-main prose-headings:tracking-tight prose-p:text-text-main/80 prose-p:leading-relaxed prose-a:text-primary prose-a:font-bold hover:prose-a:underline prose-strong:text-text-main prose-strong:font-black prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-xs prose-pre:bg-[#1E1E1E] prose-pre:text-white prose-pre:rounded-2xl prose-pre:p-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ children, ...props }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h2
                id={id}
                className="text-2xl sm:text-3xl font-black mt-12 mb-5 scroll-mt-24 border-b border-surface-darker pb-3 text-text-main flex items-center justify-between group"
                {...props}
              >
                <span>{children}</span>
                <a
                  href={`#${id}`}
                  className="opacity-0 group-hover:opacity-100 text-text-main/30 hover:text-primary transition-opacity text-base ml-2 shrink-0"
                  aria-label="Link to section"
                >
                  #
                </a>
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h3
                id={id}
                className="text-xl sm:text-2xl font-bold mt-9 mb-4 scroll-mt-24 text-text-main"
                {...props}
              >
                {children}
              </h3>
            );
          },
          p: ({ children }) => {
            const text = extractNodeText(children);

            // 1. Detect raw unquoted GitHub Alerts e.g. [!NOTE], [!TIP]
            const alertMatch = text.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
            if (alertMatch) {
              const type = alertMatch[1].toUpperCase() as
                | 'NOTE'
                | 'TIP'
                | 'IMPORTANT'
                | 'WARNING'
                | 'CAUTION';
              return <CalloutCard type={type}>{children}</CalloutCard>;
            }

            // 2. Detect GEO Answer Capsules: "Answer Capsule:" or bolded first sentences
            if (text.includes('Answer Capsule:') || text.startsWith('Key Takeaways')) {
              return (
                <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-surface/40 border-l-4 border-emerald-500 border-y border-r border-emerald-500/20 shadow-xs not-prose">
                  <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Direct Answer Capsule (Executive Summary)</span>
                  </div>
                  <div className="text-base sm:text-lg leading-relaxed text-text-main font-medium">
                    {children}
                  </div>
                </div>
              );
            }

            return <p className="mb-5 text-base sm:text-lg leading-relaxed text-text-main/80">{children}</p>;
          },
          blockquote: ({ children }) => {
            const text = extractNodeText(children);

            // Check if blockquote is a GitHub Alert e.g. > [!NOTE]
            const alertMatch = text.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
            if (alertMatch) {
              const type = alertMatch[1].toUpperCase() as
                | 'NOTE'
                | 'TIP'
                | 'IMPORTANT'
                | 'WARNING'
                | 'CAUTION';
              return <CalloutCard type={type}>{children}</CalloutCard>;
            }

            // Standard styled blockquote
            return (
              <blockquote className="my-6 p-5 sm:p-6 rounded-2xl bg-surface/60 border-l-4 border-primary border-y border-r border-surface-darker/60 text-text-main/90 shadow-2xs not-prose">
                <div className="flex gap-3">
                  <Quote className="w-5 h-5 text-primary shrink-0 opacity-80 mt-0.5" />
                  <div className="text-base sm:text-lg italic leading-relaxed space-y-2">{children}</div>
                </div>
              </blockquote>
            );
          },
          table: ({ children }) => {
            return (
              <div className="my-8 rounded-2xl border border-surface-darker/80 bg-white dark:bg-surface/30 shadow-xs overflow-hidden not-prose">
                {/* Modern Table Top Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-surface/80 border-b border-surface-darker/70 text-xs font-bold text-text-main/80">
                  <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-black text-text-main/70">
                    <TableProperties className="w-4 h-4 text-primary" />
                    <span>Technical Calibration & Specifications Matrix</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-text-main/50 bg-surface px-2.5 py-0.5 rounded-full border border-surface-darker">
                    <span>← Scroll table horizontally →</span>
                  </span>
                </div>

                {/* Horizontal Scrolling Table Container */}
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="min-w-full text-left text-sm border-collapse divide-y divide-surface-darker/60">
                    {children}
                  </table>
                </div>
              </div>
            );
          },
          thead: ({ children, ...props }) => (
            <thead
              className="bg-gradient-to-r from-surface via-surface/90 to-surface border-b border-surface-darker/80"
              {...props}
            >
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-4 py-3.5 text-xs font-black uppercase tracking-wider text-text-main border-r border-surface-darker/40 last:border-r-0 whitespace-nowrap bg-surface-darker/20"
              {...props}
            >
              {children}
            </th>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-surface-darker/40" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr
              className="border-b border-surface-darker/30 even:bg-surface/15 hover:bg-primary/[0.04] transition-colors group"
              {...props}
            >
              {children}
            </tr>
          ),
          td: ({ children, ...props }) => {
            return (
              <td
                className="px-4 py-3.5 text-sm text-text-main/85 leading-relaxed border-r border-surface-darker/20 last:border-r-0 align-top"
                {...props}
              >
                {formatTableCellContent(children)}
              </td>
            );
          },
          ul: ({ children }) => {
            return (
              <ul className="list-disc list-outside pl-6 space-y-2 mb-6 text-text-main/80 text-base marker:text-primary">
                {children}
              </ul>
            );
          },
          ol: ({ children }) => {
            return (
              <ol className="list-decimal list-outside pl-6 space-y-2 mb-6 text-text-main/80 text-base marker:text-primary font-medium">
                {children}
              </ol>
            );
          },
          li: ({ children }) => {
            return <li className="leading-relaxed font-normal">{children}</li>;
          },
          a: ({ href, children }) => {
            const isInternal =
              href &&
              (href.startsWith('/') ||
                href.startsWith('https://kagazo.in') ||
                href.startsWith('http://localhost'));

            const isGovPortal = href && /\.gov\.in/i.test(href);

            if (isInternal) {
              return (
                <Link
                  href={href}
                  className="text-primary hover:text-primary-hover font-bold underline decoration-primary/30 hover:decoration-primary transition-colors inline-flex items-baseline gap-0.5"
                >
                  {children}
                </Link>
              );
            }

            if (isGovPortal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors text-xs not-prose"
                  title="Verified Government Portal Link"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{children}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                </a>
              );
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover font-bold underline decoration-primary/30 hover:decoration-primary transition-colors inline-flex items-baseline gap-0.5"
              >
                <span>{children}</span>
                <ExternalLink className="w-3 h-3 opacity-50 inline shrink-0 self-center" />
              </a>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
