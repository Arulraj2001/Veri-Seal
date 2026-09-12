'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  X,
  FileText,
  Camera,
  Layers,
  ShieldCheck,
  Printer,
  CheckCircle2,
  CreditCard,
  Calculator,
  ArrowRight,
  Sparkles,
  Zap,
  Filter,
} from 'lucide-react';
import {
  TOOLS_CATALOG,
  TOOL_CATEGORIES,
  ToolItem,
  searchTools,
} from '@/lib/tools-data';
import { AdSlot } from '@/components/ads/AdSlot';

const ICON_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-4 h-4 text-emerald-600" />,
  Camera: <Camera className="w-4 h-4 text-emerald-600" />,
  Layers: <Layers className="w-4 h-4 text-emerald-600" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
  Printer: <Printer className="w-4 h-4 text-emerald-600" />,
  CheckCircle2: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  CreditCard: <CreditCard className="w-4 h-4 text-emerald-600" />,
  Calculator: <Calculator className="w-4 h-4 text-emerald-600" />,
};

export default function ToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filtered tools based on query & category
  const filteredTools = useMemo(() => {
    return searchTools(searchQuery, activeCategory);
  }, [searchQuery, activeCategory]);

  // Counts for each category pill
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: TOOLS_CATALOG.length,
    };
    TOOL_CATEGORIES.forEach((cat) => {
      counts[cat.id] = TOOLS_CATALOG.filter((t) => t.category === cat.id).length;
    });
    return counts;
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const resetAll = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="w-full space-y-10">
      {/* Search & Category Filter Header Bar */}
      <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-emerald-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by exam (UPSC, SSC, TNPSC, RRB, GATE), file limit (200KB, 50KB), or tool name..."
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-slate-50 border border-slate-200/90 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-full font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Tools</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {categoryCounts.all}
            </span>
          </button>

          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {ICON_MAP[cat.iconName]}
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {categoryCounts[cat.id] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Active Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong>{filteredTools.length}</strong> of{' '}
            <strong>{TOOLS_CATALOG.length}</strong> 100% Free Tools
          </span>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={resetAll}
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Tools Listing Display */}
      {filteredTools.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No matching tools found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn't find any tool matching "<strong>{searchQuery}</strong>". Try searching by broader exam names like UPSC, SSC, or file size limits like 200KB.
          </p>
          <button
            onClick={resetAll}
            className="py-2.5 px-6 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
          >
            <span>Show All {TOOLS_CATALOG.length} Tools</span>
          </button>
        </div>
      ) : activeCategory === 'all' && !searchQuery ? (
        /* Grouped Segregated Layout by Category */
        <div className="space-y-12">
          {TOOL_CATEGORIES.map((category) => {
            const categoryTools = TOOLS_CATALOG.filter(
              (t) => t.category === category.id
            );
            if (categoryTools.length === 0) return null;

            return (
              <section key={category.id} className="space-y-5">
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-surface-darker/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                      {ICON_MAP[category.iconName]}
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {category.label}
                      </h2>
                      <p className="text-xs text-slate-500">{category.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {categoryTools.length} Tools
                  </span>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* Flat Grid for Filtered / Searched Results */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {/* In-Content Ad Placement with Zero CLS */}
      <div className="pt-4">
        <AdSlot slot="in_content" />
      </div>
    </div>
  );
}

const CATEGORY_STYLES: Record<
  string,
  {
    badgeClass: string;
    hoverBorder: string;
    watermarkColor: string;
    WatermarkIcon: React.ElementType;
  }
> = {
  verify: {
    badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    hoverBorder: 'hover:border-emerald-500/70 hover:shadow-emerald-500/10',
    watermarkColor: 'text-emerald-700 dark:text-emerald-400',
    WatermarkIcon: ShieldCheck,
  },
  kyc_documents: {
    badgeClass: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    hoverBorder: 'hover:border-indigo-500/70 hover:shadow-indigo-500/10',
    watermarkColor: 'text-indigo-700 dark:text-indigo-400',
    WatermarkIcon: CreditCard,
  },
  photo_image: {
    badgeClass: 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    hoverBorder: 'hover:border-amber-500/70 hover:shadow-amber-500/10',
    watermarkColor: 'text-amber-700 dark:text-amber-400',
    WatermarkIcon: Camera,
  },
  pdf_tools: {
    badgeClass: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    hoverBorder: 'hover:border-cyan-500/70 hover:shadow-cyan-500/10',
    watermarkColor: 'text-cyan-700 dark:text-cyan-400',
    WatermarkIcon: FileText,
  },
  calculators: {
    badgeClass: 'bg-violet-50 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    hoverBorder: 'hover:border-violet-500/70 hover:shadow-violet-500/10',
    watermarkColor: 'text-violet-700 dark:text-violet-400',
    WatermarkIcon: Calculator,
  },
  print_share: {
    badgeClass: 'bg-fuchsia-50 text-fuchsia-800 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800',
    hoverBorder: 'hover:border-fuchsia-500/70 hover:shadow-fuchsia-500/10',
    watermarkColor: 'text-fuchsia-700 dark:text-fuchsia-400',
    WatermarkIcon: Printer,
  },
};

/** Individual Medium-Sized Tool Card with Authentic Authority Emblem & Hover Watermark */
function ToolCard({ tool }: { tool: ToolItem }) {
  const style = CATEGORY_STYLES[tool.category] || CATEGORY_STYLES.pdf_tools;
  const Watermark = style.WatermarkIcon;

  return (
    <Link
      href={tool.slug}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${style.hoverBorder} overflow-hidden min-h-[230px]`}
    >
      {/* Official Authority Emblem Watermark (Right Bottom Corner) */}
      {tool.authorityLogo ? (
        <div
          className="absolute -bottom-3 -right-3 w-28 h-28 pointer-events-none flex items-center justify-center transition-all duration-300 z-0"
        >
          <Image
            src={tool.authorityLogo}
            alt={tool.authorityName || tool.name}
            width={112}
            height={112}
            className="w-full h-full object-contain opacity-65 dark:opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 drop-shadow-sm"
          />
        </div>
      ) : (
        <div
          className={`absolute -bottom-4 -right-4 w-28 h-28 pointer-events-none opacity-60 dark:opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 ${style.watermarkColor} flex items-center justify-center z-0`}
        >
          <Watermark className="w-full h-full stroke-[1.2]" />
        </div>
      )}

      <div className="relative z-10 space-y-2.5">
        {/* Top Badges with Mini Emblem */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {tool.authorityLogo && (
              <div className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 shadow-sm border border-slate-200/90 dark:border-slate-700/80 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                <Image
                  src={tool.authorityLogo}
                  alt={tool.authorityName || 'Authority'}
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border truncate ${style.badgeClass}`}
              title={tool.authorityName || tool.categoryLabel}
            >
              {tool.authorityName ? tool.authorityName : tool.categoryLabel}
            </span>
          </div>
          {tool.badge && (
            <span className="text-[9px] font-black uppercase tracking-wider bg-slate-900 text-white dark:bg-slate-800 dark:text-amber-400 border border-slate-800 dark:border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
              {tool.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-1">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.shortDesc}
        </p>

        {/* Exam Tags */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {tool.examTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
          {tool.examTags.length > 3 && (
            <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 self-center">
              +{tool.examTags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom CTA Bar - Centered so bottom-right authority logo is completely visible */}
      <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center text-xs">
        <span className="font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center justify-center gap-1.5 px-4 py-1 rounded-full bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all shadow-sm">
          <span>Use Tool</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
