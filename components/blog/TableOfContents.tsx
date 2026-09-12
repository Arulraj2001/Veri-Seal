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
  const [activeId, setActiveId] = React.useState<string>('');

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

  React.useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm sticky top-28 space-y-3">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-text-main pb-2 border-b border-surface-darker">
        <List className="w-4 h-4 text-primary" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
        {headings.map((h, i) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={`${h.id}-${i}`}
              href={`#${h.id}`}
              className={`group flex items-start gap-1.5 text-xs font-semibold transition-all py-1 px-2 rounded-xl leading-relaxed ${
                h.level === 3 ? 'pl-5' : ''
              } ${
                isActive
                  ? 'bg-primary/10 text-primary font-bold shadow-2xs'
                  : 'text-text-main/70 hover:text-primary hover:bg-surface'
              }`}
            >
              <ChevronRight
                className={`w-3 h-3 mt-0.5 shrink-0 transition-transform ${
                  isActive
                    ? 'text-primary translate-x-0.5'
                    : 'text-text-main/40 group-hover:text-primary'
                }`}
              />
              <span className="line-clamp-2">{h.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
