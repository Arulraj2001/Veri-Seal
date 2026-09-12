import * as React from 'react';
import Link from 'next/link';
import { Globe, ArrowRight } from 'lucide-react';

interface LanguageSwitcherProps {
  currentSlug: string;
  hasTamilVersion?: boolean;
  hasHindiVersion?: boolean;
  englishSlug?: string;
}

export function LanguageSwitcher({
  currentSlug,
  hasTamilVersion,
  hasHindiVersion,
  englishSlug,
}: LanguageSwitcherProps) {
  const isTamil = currentSlug.endsWith('-tamil');
  const isHindi = currentSlug.endsWith('-hindi');

  // If viewing Tamil or Hindi version, provide link back to English
  if (isTamil) {
    const enSlug = englishSlug || currentSlug.replace(/-tamil$/, '');
    return (
      <div className="inline-flex items-center gap-2 p-1.5 px-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
        <Globe className="w-3.5 h-3.5 text-blue-600" />
        <span>Also available in English:</span>
        <Link
          href={`/blog/${enSlug}`}
          className="inline-flex items-center gap-1 text-primary hover:underline font-black"
        >
          <span>Read in English</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  if (isHindi) {
    const enSlug = englishSlug || currentSlug.replace(/-hindi$/, '');
    return (
      <div className="inline-flex items-center gap-2 p-1.5 px-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold shadow-2xs">
        <Globe className="w-3.5 h-3.5 text-purple-600" />
        <span>Also available in English:</span>
        <Link
          href={`/blog/${enSlug}`}
          className="inline-flex items-center gap-1 text-primary hover:underline font-black"
        >
          <span>Read in English</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  // English version: show buttons to Tamil / Hindi if they exist
  const alternateLinks = [];
  if (hasTamilVersion) {
    alternateLinks.push({
      label: 'தமிழில் படிக்க',
      href: `/blog/${currentSlug}-tamil`,
      color: 'bg-amber-50 border-amber-200 text-amber-900',
    });
  }
  if (hasHindiVersion) {
    alternateLinks.push({
      label: 'हिंदी में पढ़ें',
      href: `/blog/${currentSlug}-hindi`,
      color: 'bg-purple-50 border-purple-200 text-purple-900',
    });
  }

  if (alternateLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="text-[11px] font-bold text-text-main/60 flex items-center gap-1">
        <Globe className="w-3 h-3 text-primary" />
        <span>Read in other languages:</span>
      </span>
      {alternateLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl border text-xs font-bold transition-transform hover:scale-105 shadow-2xs ${link.color}`}
        >
          <span>{link.label}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      ))}
    </div>
  );
}
