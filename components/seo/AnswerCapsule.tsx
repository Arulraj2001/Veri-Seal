import * as React from 'react';
import { Zap, ExternalLink, ShieldCheck } from 'lucide-react';

export interface AnswerCapsuleProps {
  title?: string;
  badge?: string;
  portal?: string;
  answer: string | React.ReactNode;
  officialSourceUrl?: string;
  officialSourceName?: string;
  className?: string;
  lang?: 'en' | 'ta';
}

/**
 * AnswerCapsule Component ("Rule of 45 Words" Protocol for GEO / Generative Engine Optimization).
 * Formatted specifically for Google AI Overviews, Perplexity, and ChatGPT Search to scrape
 * and quote as the definitive direct answer.
 */
export function AnswerCapsule({
  title,
  badge,
  portal,
  answer,
  officialSourceUrl,
  officialSourceName,
  className = '',
  lang = 'en',
}: AnswerCapsuleProps) {
  const isTamil = lang === 'ta';
  const defaultBadge = badge || (isTamil ? 'அதிகாரப்பூர்வ நேரடி விடை' : 'Direct Answer & Portal Rule');
  const defaultTitle = title || (isTamil ? 'விரைவு விடை & விதிமுறைகள்' : 'Quick Answer');

  return (
    <aside
      aria-label={defaultBadge}
      className={`my-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-5 sm:p-6 shadow-sm ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{defaultBadge}</span>
          {portal && <span className="opacity-60">• {portal}</span>}
        </div>

        {officialSourceUrl && (
          <a
            href={officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 text-xs text-amber-900/70 hover:text-amber-900 font-medium underline underline-offset-2 transition-colors"
          >
            <span>{officialSourceName || (isTamil ? 'அரசு ஆவணம்' : 'Official Gazette / Portal')}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <div className="text-text-main font-semibold text-sm sm:text-base leading-relaxed">
        {typeof answer === 'string' ? (
          <p className="font-medium text-text-main/90">
            <strong className="font-extrabold text-text-main">{answer}</strong>
          </p>
        ) : (
          answer
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-text-main/60">
        <span className="flex items-center gap-1 text-emerald-800 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          {isTamil
            ? '100% சாதன நினைவகத்தில் (In-RAM) செயலாக்கம் • கோப்புகள் பதிவேற்றப்படுவதில்லை'
            : '100% In-Browser Volatile RAM • Files Never Uploaded to Servers'}
        </span>
        <span className="font-semibold text-amber-800/80">Kagazo Sovereign Standard</span>
      </div>
    </aside>
  );
}
