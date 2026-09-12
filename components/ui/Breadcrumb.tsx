import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export function Breadcrumb({
  items,
  className = '',
  showHomeIcon = false,
}: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  const baseUrl = SITE_URL || 'https://veriseal.in';

  // Generate Schema.org BreadcrumbList JSON-LD
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const itemUrl = item.href
        ? item.href.startsWith('http')
          ? item.href
          : `${baseUrl}${item.href.startsWith('/') ? '' : '/'}${item.href}`
        : undefined;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(itemUrl ? { item: itemUrl } : {}),
      };
    }),
  };

  return (
    <>
      {/* Embedded BreadcrumbList JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />

      {/* Visual Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className={`w-full ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const isFirst = idx === 0;

            return (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400/60 dark:text-slate-600 shrink-0" />
                )}
                {isLast || !item.href ? (
                  <span
                    className="text-slate-900 dark:text-white font-semibold truncate max-w-[220px] sm:max-w-sm md:max-w-md"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    {isFirst && showHomeIcon && <Home className="w-3.5 h-3.5" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumb;
