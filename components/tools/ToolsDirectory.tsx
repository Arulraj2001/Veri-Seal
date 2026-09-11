'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  FileText,
  Camera,
  Layers,
  ShieldCheck,
  Printer,
  CheckCircle2,
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
            <span>Show All 28 Tools</span>
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

/** Individual Tool Card */
function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link
      href={tool.slug}
      className="group bg-white rounded-3xl border border-surface-darker/70 hover:border-emerald-500/70 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
    >
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {tool.categoryLabel}
          </span>
          {tool.badge && (
            <span className="text-[10px] font-black uppercase tracking-wide bg-slate-900 text-white px-2 py-0.5 rounded-full">
              {tool.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {tool.shortDesc}
        </p>

        {/* Exam Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tool.examTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-slate-600 bg-slate-100 group-hover:bg-emerald-50/80 group-hover:text-emerald-800 px-2 py-0.5 rounded-md transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
          100% Free • No Signup
        </span>
        <span className="font-bold text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Open Tool</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
