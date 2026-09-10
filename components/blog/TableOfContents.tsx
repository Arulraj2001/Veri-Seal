'use client';

import * as React from 'react';
import { List, ChevronRight } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = React.useMemo(() => {
    const list: HeadingItem[] = [];
    const lines = content.split('\n');

    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim().replace(/[*_`]/g, '');
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        list.push({ id, text, level });
      }
    });

    return list;
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-surface/60 border border-surface-darker rounded-2xl p-5 mb-8">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-text-main/80 mb-3.5">
        <List className="w-4 h-4 text-primary" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1.5">
        {headings.map((h, i) => (
          <a
            key={`${h.id}-${i}`}
            href={`#${h.id}`}
            className={`group flex items-start gap-1.5 text-xs font-semibold hover:text-primary transition-colors py-0.5 ${
              h.level === 3 ? 'pl-4 text-text-main/70' : 'text-text-main'
            }`}
          >
            <ChevronRight className="w-3 h-3 text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 transition-transform mt-0.5 shrink-0" />
            <span>{h.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
