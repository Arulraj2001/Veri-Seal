'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';

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
      // Regex that matches phrase when not already inside a markdown link or heading
      // Matches phrase not preceded by '[' and not followed by ']' or ']('
      const regex = new RegExp(`(?<!\\[)\\b(${item.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?!\\]|\\([^)]*\\))`, 'i');
      parts[i] = parts[i].replace(regex, `[$1](${item.url})`);
    }
  }

  return parts.join('');
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
    <div className="prose prose-neutral max-w-none prose-headings:font-black prose-headings:text-text-main prose-headings:tracking-tight prose-p:text-text-main/80 prose-p:leading-relaxed prose-a:text-primary prose-a:font-bold hover:prose-a:underline prose-strong:text-text-main prose-strong:font-black prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-xs prose-pre:bg-[#1E1E1E] prose-pre:text-white prose-pre:rounded-2xl prose-pre:p-4 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface/50 prose-blockquote:p-4 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-text-main/90 prose-table:border prose-table:border-surface-darker prose-th:bg-surface prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-surface-darker">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ children, ...props }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h2 id={id} className="text-2xl sm:text-3xl font-black mt-10 mb-4 scroll-mt-24 border-b border-surface-darker pb-2" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h3 id={id} className="text-xl sm:text-2xl font-bold mt-8 mb-3 scroll-mt-24 text-text-main" {...props}>
                {children}
              </h3>
            );
          },
          p: ({ children }) => {
            return <p className="mb-5 text-base sm:text-lg leading-relaxed text-text-main/80">{children}</p>;
          },
          ul: ({ children }) => {
            return <ul className="list-disc list-outside pl-6 space-y-2 mb-6 text-text-main/80 text-base">{children}</ul>;
          },
          ol: ({ children }) => {
            return <ol className="list-decimal list-outside pl-6 space-y-2 mb-6 text-text-main/80 text-base">{children}</ol>;
          },
          li: ({ children }) => {
            return <li className="leading-relaxed">{children}</li>;
          },
          table: ({ children }) => {
            return (
              <div className="overflow-x-auto my-6 rounded-2xl border border-surface-darker shadow-xs">
                <table className="min-w-full divide-y divide-surface-darker text-sm text-left">{children}</table>
              </div>
            );
          },
          a: ({ href, children }) => {
            if (href && (href.startsWith('/') || href.startsWith('https://veriseal.in'))) {
              return (
                <Link href={href} className="text-primary hover:text-primary-hover font-bold underline decoration-primary/30 hover:decoration-primary">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover font-bold underline decoration-primary/30 hover:decoration-primary"
              >
                {children}
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
