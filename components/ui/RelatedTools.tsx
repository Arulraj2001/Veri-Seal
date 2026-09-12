import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import { getRelatedTools } from '@/lib/related-tools';

interface RelatedToolsProps {
  currentSlug: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function RelatedTools({
  currentSlug,
  title = 'Related Tools & Complementary Utilities',
  subtitle = 'Candidates and applicants also frequently use these tools for their document preparation.',
  className = '',
}: RelatedToolsProps) {
  const tools = getRelatedTools(currentSlug);

  if (!tools || tools.length === 0) {
    return null;
  }

  return (
    <section aria-label="Related Tools" className={`w-full py-10 mt-12 border-t border-slate-200 dark:border-slate-800/80 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Recommended Workflow Tools</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              {subtitle}
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors whitespace-nowrap"
          >
            <span>Browse all 50+ tools</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.slug}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {tool.authorityLogo ? (
                      <div className="relative w-6 h-6 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 p-0.5">
                        <Image
                          src={tool.authorityLogo}
                          alt=""
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                      {tool.category}
                    </span>
                  </div>

                  {tool.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shrink-0">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Use Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedTools;
