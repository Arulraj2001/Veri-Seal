'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  X,
  FileText,
  FileDown,
  Layers,
  Combine,
  Unlock,
  Camera,
  Image as ImageIcon,
  UserSquare2,
  PenTool,
  Scan,
  Palette,
  Video,
  MessageCircle,
  QrCode,
  Barcode,
  Globe,
  ShieldCheck,
  SearchCode,
  MapPin,
  ArrowRightLeft,
  Share2,
  Braces,
  FileCode2,
  Database,
  BookOpen,
  Binary,
  Code,
  Volume2,
  Pilcrow,
  CaseUpper,
  AlignLeft,
  Eraser,
  KeyRound,
  Clock,
  Ruler,
  Coins,
  Fingerprint,
  Calculator,
  CreditCard,
  Printer,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  TOOLS_CATALOG,
  TOOL_CATEGORIES,
  ToolItem,
  searchTools,
} from '@/lib/tools-data';
import { AdSlot } from '@/components/ads/AdSlot';

const ICON_MAP: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
  UserSquare2: <UserSquare2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
  FileDown: <FileDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
  ImageIcon: <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  Code: <Code className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  Globe: <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  AlignLeft: <AlignLeft className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
  QrCode: <QrCode className="w-4 h-4 text-green-600 dark:text-green-400" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
  Calculator: <Calculator className="w-4 h-4 text-violet-600 dark:text-violet-400" />,
  Printer: <Printer className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />,
};

const POPULAR_TOOLS_CONFIG = [
  {
    id: 'pdf-compressor-master',
    name: 'Master PDF Compressor',
    slug: '/tools/pdf-compressor',
    tag: 'PDF',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    icon: FileDown,
  },
  {
    id: 'compress-pdf-200kb',
    name: 'Compress PDF 200KB',
    slug: '/tools/compress-pdf-to-200kb',
    tag: 'PDF',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    icon: FileDown,
  },
  {
    id: 'ssc-photo-resizer',
    name: 'SSC Photo Resizer',
    slug: '/tools/ssc-photo-signature-resizer',
    tag: 'IMAGE',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    icon: Camera,
    logo: '/logos/ssc.png',
  },
  {
    id: 'tnpsc-photo-resizer',
    name: 'TNPSC Photo Resizer',
    slug: '/tools/tnpsc-photo-signature-resizer',
    tag: 'IMAGE',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    icon: Camera,
    logo: '/logos/tnpsc.svg',
  },
  {
    id: 'qr-code-generator-studio',
    name: 'Free QR Code Generator',
    slug: '/tools/qr-code-generator',
    tag: 'QR',
    tagColor: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800',
    icon: QrCode,
  },
  {
    id: 'whatsapp-link-generator-tool',
    name: 'WhatsApp Link Generator',
    slug: '/tools/whatsapp-link-generator',
    tag: 'URL',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    icon: MessageCircle,
  },
  {
    id: 'json-formatter-master',
    name: 'JSON Formatter',
    slug: '/tools/json-formatter',
    tag: 'CODE',
    tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800',
    icon: Braces,
  },
  {
    id: 'password-generator-tool',
    name: 'Password Generator',
    slug: '/tools/password-generator',
    tag: 'SECURITY',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    icon: KeyRound,
  },
];

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

  const activeCategoryMeta = TOOL_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="w-full space-y-8">
      {/* Search & Option A Category Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-5">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 135+ tools by name, exam (UPSC, SSC, TNPSC, RRB, GATE), or file size (200KB, 50KB)..."
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Option A: Category Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-full font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-md shadow-slate-900/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>All Tools</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeCategory === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {categoryCounts.all}
            </span>
          </button>

          {TOOL_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2.5 rounded-full font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {ICON_MAP[cat.iconName]}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Status Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <span>
            Showing <strong>{filteredTools.length}</strong> of{' '}
            <strong>{TOOLS_CATALOG.length}</strong> 100% Free Tools
          </span>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={resetAll}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Reset to All Tools</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Popular Shelf Ribbon (Active when not searching) */}
      {!searchQuery && activeCategory === 'all' && (
        <div className="bg-gradient-to-r from-emerald-50/70 via-slate-50 to-indigo-50/70 dark:from-slate-900/90 dark:via-slate-900 dark:to-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Popular Quick Access Tools
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
              Instant In-Browser Execution • Zero Upload Privacy
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {POPULAR_TOOLS_CONFIG.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.id}
                  href={p.slug}
                  className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-2.5 flex flex-col justify-between hover:border-emerald-500 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700/80 flex items-center justify-center shrink-0">
                      {p.logo ? (
                        <Image src={p.logo} alt="" width={16} height={16} className="w-4 h-4 object-contain" />
                      ) : (
                        <Icon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                      )}
                    </div>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border ${p.tagColor}`}>
                      {p.tag}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1 transition-colors">
                    {p.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Tools Listing Display */}
      {filteredTools.length === 0 ? (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">No matching tools found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
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
        /* Grouped Segregated Layout by 11 Categories */
        <div className="space-y-12">
          {TOOL_CATEGORIES.map((category) => {
            const categoryTools = TOOLS_CATALOG.filter(
              (t) => t.category === category.id
            );
            if (categoryTools.length === 0) return null;

            return (
              <section key={category.id} className="space-y-4">
                {/* Category Section Header */}
                <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {ICON_MAP[category.iconName]}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {category.label}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{category.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full shrink-0">
                    {categoryTools.length} Tools
                  </span>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* Flat Grid for Filtered Tab or Searched Results */
        <div className="space-y-4">
          {activeCategoryMeta && !searchQuery && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {ICON_MAP[activeCategoryMeta.iconName]}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {activeCategoryMeta.label}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeCategoryMeta.description}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full shrink-0">
                {filteredTools.length} Tools
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
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
    iconBoxClass: string;
    hoverBorder: string;
    watermarkColor: string;
    WatermarkIcon: React.ElementType;
  }
> = {
  exam_photos: {
    badgeClass: 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    iconBoxClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    hoverBorder: 'hover:border-amber-500/70 hover:shadow-amber-500/10',
    watermarkColor: 'text-amber-700 dark:text-amber-400',
    WatermarkIcon: Camera,
  },
  passport_visa: {
    badgeClass: 'bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    iconBoxClass: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800',
    hoverBorder: 'hover:border-sky-500/70 hover:shadow-sky-500/10',
    watermarkColor: 'text-sky-700 dark:text-sky-400',
    WatermarkIcon: UserSquare2,
  },
  pdf_tools: {
    badgeClass: 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    iconBoxClass: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    hoverBorder: 'hover:border-rose-500/70 hover:shadow-rose-500/10',
    watermarkColor: 'text-rose-700 dark:text-rose-400',
    WatermarkIcon: FileDown,
  },
  media_studio: {
    badgeClass: 'bg-purple-50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    iconBoxClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
    hoverBorder: 'hover:border-purple-500/70 hover:shadow-purple-500/10',
    watermarkColor: 'text-purple-700 dark:text-purple-400',
    WatermarkIcon: ImageIcon,
  },
  developer_code: {
    badgeClass: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    iconBoxClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    hoverBorder: 'hover:border-emerald-500/70 hover:shadow-emerald-500/10',
    watermarkColor: 'text-emerald-700 dark:text-emerald-400',
    WatermarkIcon: Code,
  },
  network_webmaster: {
    badgeClass: 'bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    iconBoxClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    hoverBorder: 'hover:border-blue-500/70 hover:shadow-blue-500/10',
    watermarkColor: 'text-blue-700 dark:text-blue-400',
    WatermarkIcon: Globe,
  },
  text_speech: {
    badgeClass: 'bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    iconBoxClass: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border border-teal-200 dark:border-teal-800',
    hoverBorder: 'hover:border-teal-500/70 hover:shadow-teal-500/10',
    watermarkColor: 'text-teal-700 dark:text-teal-400',
    WatermarkIcon: AlignLeft,
  },
  communication_qr: {
    badgeClass: 'bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-300 border-green-200 dark:border-green-800',
    iconBoxClass: 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300 border border-green-200 dark:border-green-800',
    hoverBorder: 'hover:border-green-500/70 hover:shadow-green-500/10',
    watermarkColor: 'text-green-700 dark:text-green-400',
    WatermarkIcon: QrCode,
  },
  security_identity: {
    badgeClass: 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    iconBoxClass: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800',
    hoverBorder: 'hover:border-indigo-500/70 hover:shadow-indigo-500/10',
    watermarkColor: 'text-indigo-700 dark:text-indigo-400',
    WatermarkIcon: ShieldCheck,
  },
  calculators_finance: {
    badgeClass: 'bg-violet-50 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    iconBoxClass: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border border-violet-200 dark:border-violet-800',
    hoverBorder: 'hover:border-violet-500/70 hover:shadow-violet-500/10',
    watermarkColor: 'text-violet-700 dark:text-violet-400',
    WatermarkIcon: Calculator,
  },
  print_cybercafe: {
    badgeClass: 'bg-fuchsia-50 text-fuchsia-800 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800',
    iconBoxClass: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800',
    hoverBorder: 'hover:border-fuchsia-500/70 hover:shadow-fuchsia-500/10',
    watermarkColor: 'text-fuchsia-700 dark:text-fuchsia-400',
    WatermarkIcon: Printer,
  },
};

const FORMAT_TAG_STYLES: Record<string, string> = {
  PDF: 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
  IMAGE: 'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  CODE: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  URL: 'bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  TEXT: 'bg-teal-50 text-teal-700 border-teal-200/80 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
  QR: 'bg-green-50 text-green-700 border-green-200/80 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800',
  SECURITY: 'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
  CALC: 'bg-violet-50 text-violet-700 border-violet-200/80 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800',
  PRINT: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/80 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:border-fuchsia-800',
};

/** Returns the exact matching closed-related Lucide SVG icon for every individual tool */
function getToolWatermarkIcon(tool: ToolItem): React.ElementType {
  const id = tool.id.toLowerCase();
  const slug = tool.slug.toLowerCase();

  // QR Code
  if (id.includes('qr-code') || slug.includes('qr-code')) return QrCode;

  // Barcode
  if (id.includes('barcode') || slug.includes('barcode')) return Barcode;

  // WhatsApp
  if (id.includes('whatsapp') || slug.includes('whatsapp')) return MessageCircle;

  // YouTube
  if (id.includes('youtube') || slug.includes('youtube')) return Video;

  // Color tools
  if (id.includes('color') || slug.includes('color')) return Palette;

  // Signatures
  if (id.includes('signature') || slug.includes('signature') || id.includes('sign-') || id.includes('attest')) return PenTool;

  // Passports & Visas
  if (id.includes('passport') || id.includes('visa') || id.includes('stamp-size') || id.includes('face-align') || id.includes('attire')) return UserSquare2;

  // Scanner & OCR
  if (id.includes('scanner') || id.includes('declaration')) return Scan;

  // Unlock PDF
  if (id.includes('unlock') || slug.includes('unlock')) return Unlock;

  // ID Cards & KYC
  if (id.includes('pvc') || id.includes('card') || id.includes('aadhaar')) return CreditCard;

  // Marksheet, Certificates & Resume
  if (id.includes('marksheet') || id.includes('certificate') || id.includes('pstm') || id.includes('resume')) return Award;

  // Image Transcoding & Converters
  if (id.includes('image-converter') || id.includes('png-to') || id.includes('webp-to') || id.includes('jpg-to') || id.includes('heic-to')) return Layers;

  // Image Optimizer & KB sizing
  if (id.includes('image-optimizer') || id.includes('compress-image')) return ImageIcon;

  // PDF Merge / Combine
  if (id.includes('merge') || id.includes('joiner') || id.includes('image-to-pdf') || id.includes('pdf-to-image')) return Combine;

  // PDF Compressors
  if (id.includes('compress-pdf') || id.includes('pdf-compressor')) return FileDown;

  // Network & Domains
  if (id.includes('dns') || slug.includes('dns')) return Globe;
  if (id.includes('ssl') || slug.includes('ssl')) return ShieldCheck;
  if (id.includes('whois') || slug.includes('whois')) return SearchCode;
  if (id.includes('ip-lookup') || slug.includes('ip-lookup')) return MapPin;
  if (id.includes('http-headers') || id.includes('redirect')) return ArrowRightLeft;
  if (id.includes('meta-tags') || slug.includes('meta-tags')) return Share2;

  // Code & Formats
  if (id.includes('json') || slug.includes('json')) return Braces;
  if (id.includes('minifier') || slug.includes('minifier')) return FileCode2;
  if (id.includes('sql') || slug.includes('sql')) return Database;
  if (id.includes('markdown') || slug.includes('markdown')) return BookOpen;
  if (id.includes('base64') || slug.includes('base64')) return Binary;
  if (id.includes('url-encode') || id.includes('html-entity')) return Code;

  // Text, Speech, Security
  if (id.includes('text-to-speech') || slug.includes('text-to-speech')) return Volume2;
  if (id.includes('lorem-ipsum') || slug.includes('lorem-ipsum')) return Pilcrow;
  if (id.includes('case-converter') || slug.includes('case-converter')) return CaseUpper;
  if (id.includes('word-counter') || slug.includes('word-counter')) return AlignLeft;
  if (id.includes('text-cleaner') || id.includes('remove-line-breaks')) return Eraser;
  if (id.includes('password') || slug.includes('password')) return KeyRound;

  // Math, Converters & Time
  if (id.includes('timestamp') || slug.includes('timestamp')) return Clock;
  if (id.includes('unit-converter') || slug.includes('unit-converter')) return Ruler;
  if (id.includes('number-to-words') || slug.includes('number-to-words')) return Coins;
  if (id.includes('hash-generator') || slug.includes('hash-generator')) return Binary;
  if (id.includes('uuid-generator') || slug.includes('uuid-generator')) return Fingerprint;

  // Calculators
  if (id.includes('calculator') || id.includes('tax') || id.includes('salary') || id.includes('cutoff')) return Calculator;

  // Fallback by category
  const style = CATEGORY_STYLES[tool.category];
  return style?.WatermarkIcon || FileText;
}

// Maximum 2 to 3 flagship cards per logo/category receive a watermark; rest have clean backgrounds
const WATERMARK_ELIGIBLE_TOOL_IDS = new Set<string>([
  // Official Recruitment Flagship Tools
  'ssc-photo-resizer',
  'upsc-photo-resizer',
  'tnpsc-photo-resizer',
  'tnpsc-otr-compliance-kit',
  'rrb-photo-resizer',
  'ibps-photo-resizer',
  'neet-photo-resizer',
  'mask-aadhaar-tool',
  'driving-license-card-merger',
  'affidavit-generator',
  'income-tax-calculator-2025-26',

  // Select 2-3 Flagship Cards for Key Utility Categories
  'pdf-compressor-master',
  'compress-pdf-200kb',
  'merge-marksheets-pdf',
  'passport-photo-maker-tool',
  'passport-white-background',
  'compress-image-exact-kb',
  'change-image-dpi-tool',
  'youtube-thumbnail-downloader-tool',
  'json-formatter-master',
  'base64-encode-tool',
  'dns-lookup-tool',
  'ssl-lookup-tool',
  'text-to-speech-tool',
  'word-counter-tool',
  'qr-code-generator-studio',
  'whatsapp-link-generator-tool',
  'password-generator-tool',
  'digital-signature-verifier',
  'salary-slip-generator',
  'a4-multi-card-sheet',
  'pvc-id-card-maker',
  'passport-photo-sheet-maker',
  'handwritten-declaration-scanner',
]);

/** Individual Compact Tool Card with 36x36px Avatar Box, Format Tag, and Selective Watermark */
function ToolCard({ tool }: { tool: ToolItem }) {
  const style = CATEGORY_STYLES[tool.category] || CATEGORY_STYLES.pdf_tools;
  const WatermarkIcon = getToolWatermarkIcon(tool);
  const formatTag = tool.formatTag || 'TOOL';
  const formatTagStyle = FORMAT_TAG_STYLES[formatTag] || FORMAT_TAG_STYLES.PDF;
  const hasWatermark = WATERMARK_ELIGIBLE_TOOL_IDS.has(tool.id);

  return (
    <Link
      href={tool.slug}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${style.hoverBorder} overflow-hidden min-h-[165px]`}
    >
      {/* Selective Watermark: only 2-3 flagship cards per logo, clean on others */}
      {hasWatermark && tool.authorityLogo ? (
        <div className="absolute -bottom-3 -right-3 w-24 h-24 pointer-events-none flex items-center justify-center transition-all duration-300 z-0">
          <Image
            src={tool.authorityLogo}
            alt={tool.authorityName || tool.name}
            width={96}
            height={96}
            className="w-full h-full object-contain opacity-50 dark:opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-85 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300 drop-shadow-xs"
          />
        </div>
      ) : hasWatermark ? (
        <div
          className={`absolute -bottom-4 -right-4 w-24 h-24 pointer-events-none opacity-50 dark:opacity-50 group-hover:opacity-80 group-hover:scale-105 group-hover:-rotate-6 transition-all duration-300 ${style.watermarkColor} flex items-center justify-center z-0`}
        >
          <WatermarkIcon className="w-full h-full stroke-[1.2]" />
        </div>
      ) : null}

      <div className="relative z-10 space-y-2">
        {/* Top Bar: 36x36px Avatar Box + Category Badge (Left), Format Tag + Official Promo Badge (Right) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* 36x36px Tool Icon Avatar Box */}
            {tool.authorityLogo ? (
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 p-1 shrink-0 flex items-center justify-center shadow-xs">
                <Image
                  src={tool.authorityLogo}
                  alt={tool.authorityName || 'Authority'}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className={`w-9 h-9 rounded-xl ${style.iconBoxClass} shrink-0 flex items-center justify-center shadow-xs`}>
                <WatermarkIcon className="w-4.5 h-4.5" />
              </div>
            )}

            {/* Category / Authority Badge */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border truncate max-w-[130px] sm:max-w-[160px] ${style.badgeClass}`}
              title={tool.authorityName || tool.categoryLabel}
            >
              {tool.authorityName ? tool.authorityName : tool.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Format Indicator Pill */}
            <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded border ${formatTagStyle}`}>
              {formatTag}
            </span>
            {/* Optional Promo Badge */}
            {tool.badge && (
              <span className="text-[9px] font-black uppercase tracking-wider bg-slate-900 text-white dark:bg-slate-800 dark:text-amber-400 border border-slate-800 dark:border-amber-500/30 px-1.5 py-0.5 rounded shrink-0 hidden sm:inline-block">
                {tool.badge}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-1">
          {tool.name}
        </h3>

        {/* 1-Line Truncated Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-1">
          {tool.shortDesc}
        </p>

        {/* Compact Exam / Feature Tags */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {tool.examTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-md"
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

      {/* Bottom Balanced CTA Bar */}
      <div className="relative z-10 pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>In-RAM Privacy</span>
        </span>
        <span className="font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Use Tool</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
