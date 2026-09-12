'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, ArrowRight, X, Command } from 'lucide-react';
import { TOOLS_CATALOG, ToolItem } from '@/lib/tools-data';

export function HomeHeroSearch() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Global shortcut (Ctrl+K, Cmd+K, or /) to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to dismiss dropdown
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter tools based on query
  const filteredTools = React.useMemo(() => {
    if (!query.trim()) {
      // Return top priority featured tools when empty
      return TOOLS_CATALOG.filter((t) => t.featuredInNav).slice(0, 6);
    }
    const cleanQ = query.toLowerCase().trim();
    return TOOLS_CATALOG.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(cleanQ) ||
        tool.shortDesc.toLowerCase().includes(cleanQ) ||
        tool.categoryLabel.toLowerCase().includes(cleanQ) ||
        tool.examTags.some((tag) => tag.toLowerCase().includes(cleanQ))
      );
    }).slice(0, 8);
  }, [query]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        router.push(filteredTools[selectedIndex].slug);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto my-6 z-30">
      {/* Search Input Box */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-amber-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all opacity-70" />
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-surface-darker/90 dark:border-slate-800 rounded-2xl shadow-lg shadow-black/5 hover:border-primary/50 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all px-4 py-2.5 sm:py-3.5">
          <Search className="w-5 h-5 text-primary shrink-0 mr-3" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search 56+ tools (e.g. UPSC, TNPSC OTR, A4 Gang Sheet, Mask Aadhaar)..."
            className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-text-main dark:text-white placeholder:text-text-main/40 dark:placeholder:text-slate-500 font-medium"
          />

          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-surface dark:bg-slate-800 border border-surface-darker dark:border-slate-700 text-[11px] font-bold text-slate-400 tracking-wider">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-surface-darker dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 text-left divide-y divide-surface-darker/60 dark:divide-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2.5 bg-surface/60 dark:bg-slate-800/60 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-4">
            <span>{query ? `Search Results (${filteredTools.length})` : 'Popular Quick Tools'}</span>
            <span className="text-[10px] font-normal normal-case">Use ↑ ↓ and Enter to open</span>
          </div>

          <div className="max-h-[360px] overflow-y-auto p-1.5 space-y-1">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <Link
                    key={tool.id}
                    href={tool.slug}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-primary-light/70 dark:bg-primary/20 text-primary'
                        : 'hover:bg-surface dark:hover:bg-slate-800/80 text-text-main dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-surface-darker dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold truncate">{tool.name}</span>
                          {tool.badge && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-text-main/60 dark:text-slate-400 truncate mt-0.5">
                          {tool.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface dark:bg-slate-800 text-slate-500">
                        {tool.categoryLabel}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-xs">
                No direct tool match found for &quot;{query}&quot;. Try searching for <strong>UPSC</strong>, <strong>TNPSC</strong>, <strong>A4 Sheet</strong>, or <strong>PDF</strong>.
              </div>
            )}
          </div>

          <div className="p-3 bg-surface/40 dark:bg-slate-900/80 text-center">
            <Link
              href="/tools"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <span>Explore All 56+ Free Sovereign Tools Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
