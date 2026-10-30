import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Video,
  Layers,
  FileSpreadsheet,
  Smartphone,
  Monitor,
  Scissors,
  Sliders,
  Type,
  TrendingUp,
  Download,
  AlertCircle,
  Compass,
  ArrowRight,
  Info,
  Clock,
  ExternalLink,
  Check,
  X,
} from 'lucide-react';
import { AutoClipStudioEngine } from '@/components/tools/AutoClipStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'AutoClip Studio — Free AI Video Automation & Social Shorts Platform | Kagazo',
  description:
    'Generate viral 9:16 Shorts, Reels, and 16:9 YouTube videos automatically with audio-synced scene cuts, AI kinetic subtitles, and bulk spreadsheet workflows. 100% free with zero watermarks.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ai-video-automation',
  },
  openGraph: {
    title: 'AutoClip Studio — Free AI Video Automation & Social Shorts Platform | Kagazo',
    description:
      'Create high-retention short-form videos with audio-synced scene cuts, multi-aspect rendering (9:16 / 16:9), and bulk CSV automation. No watermarks.',
    url: 'https://kagazo.in/tools/ai-video-automation',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoClip Studio — Free AI Video Automation Platform | Kagazo',
    description:
      'Automate social media video creation with audio-synced cuts, 9:16 vertical rendering, and bulk CSV workflows with zero watermarks.',
  },
};

const ASPECT_RATIO_SPECS = [
  {
    format: 'Vertical Short-Form (9:16)',
    resolution: '1080 × 1920 px (Full HD)',
    platforms: 'YouTube Shorts, Instagram Reels, TikTok, Snap Spotlight',
    safeZone: 'Center 1080 × 1420 px (Avoid top & bottom UI overlays)',
    frameRate: '30 / 60 FPS',
  },
  {
    format: 'Widescreen Standard (16:9)',
    resolution: '1920 × 1080 px (1080p)',
    platforms: 'YouTube Long-Form, Vimeo, Twitter/X, TV, Desktop',
    safeZone: 'Full frame (5% title-safe margin on perimeter)',
    frameRate: '24 / 30 / 60 FPS',
  },
  {
    format: 'Square Feed (1:1)',
    resolution: '1080 × 1080 px',
    platforms: 'LinkedIn Feed, Instagram Grid, Facebook Desktop',
    safeZone: 'Center-weighted text hierarchy',
    frameRate: '30 FPS',
  },
  {
    format: 'Vertical Feed (4:5)',
    resolution: '1080 × 1350 px',
    platforms: 'Instagram Mobile Feed, Facebook In-Feed',
    safeZone: 'Maximized vertical mobile feed screen real estate',
    frameRate: '30 FPS',
  },
];

const COMPARISON_DATA = [
  {
    feature: 'Turnaround Time (10 Clips)',
    autoclip: '2 to 5 minutes (Automated)',
    premiere: '3 to 5 hours (Manual)',
    capcut: '45 to 90 minutes (Semi-Manual)',
  },
  {
    feature: 'Audio-Beat Scene Synchronization',
    autoclip: 'Instant Algorithmic Snap',
    premiere: 'Manual Waveform Keyframing',
    capcut: 'Basic Beat Detection Marker',
  },
  {
    feature: 'Multi-Aspect Rendering (9:16 & 16:9)',
    autoclip: '1-Click Adaptive Reframe',
    premiere: 'Separate Sequence Reformatting',
    capcut: 'Manual Canvas Crop',
  },
  {
    feature: 'Bulk CSV / Spreadsheet Batch Mode',
    autoclip: 'Native CSV Data Automation',
    premiere: 'Requires Custom ExtendScript/Plugins',
    capcut: 'Not Supported',
  },
  {
    feature: 'Hardware & GPU Dependency',
    autoclip: 'Cloud-Powered / Any Browser',
    premiere: 'Heavy Multi-Core CPU & Dedicated GPU',
    capcut: 'Local RAM & Storage Intensive',
  },
  {
    feature: 'Watermarks on Free Export',
    autoclip: 'Zero Watermarks (100% Clean)',
    premiere: 'Requires Paid Adobe Subscription',
    capcut: 'End screen / Pro template locks',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input Audio Voiceover or Text Script',
    desc: 'Upload your MP3/WAV speech track, record voice, or paste a script. AutoClip Studio automatically analyzes syllabic cadence, audio waveforms, and pauses to generate timestamp markers.',
  },
  {
    step: 2,
    title: 'Select Target Aspect Ratio & Visual Theme',
    desc: 'Choose 9:16 for Reels/Shorts/TikTok, 16:9 for YouTube widescreen, or 1:1 for social feeds. Select typography styling and color palettes suited to your content niche.',
  },
  {
    step: 3,
    title: 'Auto-Sync Visuals, B-Roll & Captions',
    desc: 'The intelligent scene engine matches royalty-free visual assets, transitions, and kinetic animated subtitles precisely to the spoken voiceover beats with millisecond accuracy.',
  },
  {
    step: 4,
    title: 'Export Full HD Video Without Watermarks',
    desc: 'Preview your synchronized timeline live. Once satisfied, render and download high-bitrate MP4 files with crisp audio ready for multi-channel social distribution.',
  },
];

const FAQS = [
  {
    question: 'What is AutoClip Studio and how does it automate video creation?',
    answer:
      'AutoClip Studio is a specialized AI video automation platform engineered for social content creators, agency managers, and educators. It automatically analyzes audio tracks, transcribes speech into kinetic synchronized subtitles, cuts B-roll footage on acoustic peaks, and renders vertical (9:16) or horizontal (16:9) video clips without manual frame-by-frame keyframing.',
  },
  {
    question: 'Are exported videos watermarked in the free version?',
    answer:
      'No. AutoClip Studio produces pristine, watermark-free MP4 video renders. Creators retain 100% commercial ownership of their exported assets, making it suitable for monetized YouTube channels, client deliverables, and paid social campaigns.',
  },
  {
    question: 'Can I generate multiple videos at once using a CSV spreadsheet?',
    answer:
      'Yes. AutoClip Studio features a dedicated Bulk Batch automation engine. By uploading a CSV spreadsheet containing video titles, voiceover scripts, or scene prompts, the engine systematically generates batches of unique clips simultaneously.',
  },
  {
    question: 'What aspect ratios are supported for social platforms?',
    answer:
      'AutoClip Studio supports all modern social aspect ratios: 9:16 Vertical (1080×1920) for YouTube Shorts, Instagram Reels, and TikTok; 16:9 Landscape (1920×1080) for YouTube desktop and TV; 1:1 Square (1080×1080) for LinkedIn and Instagram grids; and 4:5 Feed (1080×1350) for mobile social streams.',
  },
  {
    question: 'Do videos created with AutoClip Studio qualify for YouTube and TikTok monetization?',
    answer:
      'Yes. Videos created with authentic voiceovers, original narrative value, and synchronized pacing meet all YouTube Partner Program (YPP) and TikTok Creator Rewards guidelines for original, non-repetitive multimedia content.',
  },
  {
    question: 'Can I run AutoClip Studio on low-spec laptops or Chromebooks?',
    answer:
      'Yes. Because AutoClip Studio executes its heavy video rendering and audio synchronization in the cloud, you can run the studio directly from any modern web browser (Chrome, Edge, Firefox, Safari) on budget laptops, Macs, Chromebooks, or mobile tablets without overheating your machine.',
  },
];

export default function AiVideoAutomationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'AutoClip Studio AI Video Automation',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All Web Browsers',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Automated AI video creation platform for YouTube Shorts, Instagram Reels, and TikTok with audio-synced scene cuts, kinetic captions, and bulk CSV workflow.',
      },
      {
        '@type': 'WebApplication',
        name: 'AutoClip Studio on Kagazo',
        url: 'https://kagazo.in/tools/ai-video-automation',
        browserRequirements: 'Requires modern web browser with HTML5 and WebGL support',
        applicationSuite: 'Kagazo Creative Media Tools',
        featureList: [
          'Audio-Synced Scene Detection',
          'Multi-Aspect 9:16 Vertical & 16:9 Landscape',
          'Dynamic Kinetic Word-by-Word Subtitles',
          'Bulk CSV Spreadsheet Batch Generation',
          'Zero Watermark Full HD Exports',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Automate Short-Form Videos with AutoClip Studio',
        description: 'Step-by-step workflow to generate high-retention social videos with automated audio-sync.',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'AI Video Automation',
            item: 'https://kagazo.in/tools/ai-video-automation',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1880px] 2xl:max-w-[1920px] mx-auto space-y-8 px-2 sm:px-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60 px-1">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">AI Video Automation Studio</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>AI Short-Form Video Automation &bull; Audio-Synced Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>AutoClip Studio — </span>
            <span className="text-primary">Free AI Video Automation</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-text-main/90 mt-1">
              For Shorts, Reels &amp; 16:9 Videos
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-text-main/80 leading-relaxed font-normal max-w-3xl mx-auto">
            Create high-retention social videos in seconds with <strong>automated audio-sync scene cuts</strong>, kinetic dynamic subtitles, multi-aspect rendering (9:16 / 16:9), and bulk CSV workflows. Zero watermarks, 100% free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-white border border-surface-darker px-3 py-1.5 rounded-xl shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> No Watermarks
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-surface-darker px-3 py-1.5 rounded-xl shadow-2xs">
              <Smartphone className="w-4 h-4 text-primary" /> 9:16 Shorts &amp; Reels
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-surface-darker px-3 py-1.5 rounded-xl shadow-2xs">
              <Monitor className="w-4 h-4 text-indigo-600" /> 16:9 YouTube Widescreen
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-surface-darker px-3 py-1.5 rounded-xl shadow-2xs">
              <FileSpreadsheet className="w-4 h-4 text-amber-600" /> Bulk CSV Batch Mode
            </span>
          </div>
        </header>

        {/* 3-Column Responsive Layout: Left Ad Rail + Center Studio + Right Ad Rail */}
        <div className="flex flex-col xl:flex-row items-start justify-center gap-6">
          {/* ========================================================= */}
          {/* LEFT DESKTOP STICKY AD RAIL (Hidden on mobile / tablet)   */}
          {/* ========================================================= */}
          <aside
            aria-label="Sponsored Announcements and Page Navigation"
            className="hidden xl:block w-[280px] 2xl:w-[320px] shrink-0 sticky top-28 space-y-6"
          >
            {/* Direct Studio Launch Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                  Cloud Studio Active
                </span>
              </div>
              <h4 className="font-extrabold text-sm leading-snug">
                Ready to create audio-synced videos?
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Open AutoClip Studio in a new window with full GPU hardware acceleration and zero watermarks.
              </p>
              <a
                href="https://autoclipaitool.ai.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>Launch AutoClip Studio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Native Left Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Quick Page Jump Navigation Widget */}
            <div className="p-4 rounded-3xl bg-white border border-surface-darker shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-text-main/60">
                <Compass className="w-3.5 h-3.5 text-primary" />
                <span>On This Page</span>
              </div>
              <ul className="space-y-2 text-xs text-text-main/70 font-medium">
                <li>
                  <a href="#studio-engine" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Studio Canvas
                  </a>
                </li>
                <li>
                  <a href="#core-capabilities" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    Core Features
                  </a>
                </li>
                <li>
                  <a href="#aspect-ratios" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    Aspect Ratios
                  </a>
                </li>
                <li>
                  <a href="#comparison" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    Tool Comparison
                  </a>
                </li>
                <li>
                  <a href="#workflow" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    4-Step Workflow
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    Creator FAQs
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* CENTER MAIN APPLICATION & ON-PAGE CONTENT COLUMN          */}
          {/* ========================================================= */}
          <main className="flex-1 w-full max-w-5xl lg:max-w-6xl space-y-10 min-w-0">
            {/* Mobile Top AdSlot Fallback (Only on screens < xl) */}
            <div className="block xl:hidden">
              <AdSlot slot="mobile" />
            </div>

            {/* Embedded AutoClip Studio Engine */}
            <section id="studio-engine" aria-label="AutoClip Studio Interactive Workspace">
              <AutoClipStudioEngine />
            </section>

            {/* Mid-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* ========================================================= */}
            {/* SECTION 1: EXECUTIVE GEO ANSWER CAPSULE (AI OVERVIEWS)    */}
            {/* ========================================================= */}
            <section
              aria-label="Executive Overview"
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-primary/5 via-white to-surface border border-primary/20 shadow-card space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  GEO Executive Summary
                </span>
                <span className="text-xs text-text-main/50 font-semibold tracking-wide">
                  Verified Audio-Sync Automation
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                How AutoClip Studio Revolutionizes Short-Form Video Creation
              </h2>

              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Traditional video editing tools like Adobe Premiere Pro and DaVinci Resolve require manual audio keyframing, timeline slicing, subtitle alignment, and aspect ratio reformatting—averaging <strong>45 to 90 minutes per short</strong>. <strong>AutoClip Studio</strong> reduces this to under <strong>60 seconds</strong> through automated acoustic beat matching, phonetic speech-to-text subtitle generation, and dynamic 9:16 safe-zone framing directly in your browser.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
                <div className="p-3 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                  <div className="text-lg sm:text-xl font-extrabold text-primary">60 Sec</div>
                  <div className="text-[11px] text-text-main/60 font-semibold">Average Render</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-600">0% Mark</div>
                  <div className="text-[11px] text-text-main/60 font-semibold">No Watermark</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                  <div className="text-lg sm:text-xl font-extrabold text-indigo-600">9:16 &amp; 16:9</div>
                  <div className="text-[11px] text-text-main/60 font-semibold">Dual Ratios</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                  <div className="text-lg sm:text-xl font-extrabold text-amber-600">CSV Mode</div>
                  <div className="text-[11px] text-text-main/60 font-semibold">Bulk Automation</div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: 4-PILLAR CORE CAPABILITIES SHOWCASE           */}
            {/* ========================================================= */}
            <section id="core-capabilities" className="space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  Engine Capabilities
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Intelligent Automated Video Production Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Feature 1 */}
                <div className="p-5 rounded-3xl bg-white border border-surface-darker shadow-card space-y-2 hover:border-primary/40 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-text-main">
                    Audio-Synced Scene Detection &amp; Cutting
                  </h3>
                  <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                    AutoClip analyzes voiceover pitch dynamics, acoustic transients, and natural breath pauses to place cuts exactly where viewer attention peaks, preserving visual rhythm.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-5 rounded-3xl bg-white border border-surface-darker shadow-card space-y-2 hover:border-primary/40 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-text-main">
                    Universal Multi-Aspect Canvas (9:16 &amp; 16:9)
                  </h3>
                  <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                    Instantly toggle between vertical 9:16 for YouTube Shorts, Reels, and TikTok, or widescreen 16:9 for traditional YouTube desktop without repositioning assets manually.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="p-5 rounded-3xl bg-white border border-surface-darker shadow-card space-y-2 hover:border-primary/40 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-text-main">
                    Bulk CSV Spreadsheet Automation
                  </h3>
                  <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                    Upload spreadsheets containing multiple voice scripts, quotes, or product listings. The engine batches rendering in parallel, letting creators generate a month of shorts in one run.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="p-5 rounded-3xl bg-white border border-surface-darker shadow-card space-y-2 hover:border-primary/40 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Type className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-text-main">
                    Dynamic Kinetic Captions &amp; Safe-Zones
                  </h3>
                  <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                    Generate viral word-by-word highlighted subtitles calibrated inside vertical safe zones, ensuring TikTok buttons and Instagram captions never obscure key words.
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 3: ASPECT RATIO & TECHNICAL SPECIFICATION TABLE   */}
            {/* ========================================================= */}
            <section id="aspect-ratios" className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-primary" />
                    Social Video Aspect Ratio &amp; Dimension Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official video resolution benchmarks for multi-platform distribution.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  2026 Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Format / Ratio</th>
                      <th className="py-3 px-3">Pixel Dimensions</th>
                      <th className="py-3 px-3">Target Channels</th>
                      <th className="py-3 px-3">UI Safe Zone Notes</th>
                      <th className="py-3 px-3">FPS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {ASPECT_RATIO_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{spec.format}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{spec.resolution}</td>
                        <td className="py-3 px-3 text-xs text-text-main/85">{spec.platforms}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{spec.safeZone}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{spec.frameRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900 leading-relaxed">
                  <strong>Creator Safe Zone Tip:</strong> When formatting 9:16 vertical shorts, avoid placing primary hook text within 220 pixels of the bottom edge (where TikTok usernames and audio tickers render) or 150 pixels from the right rail (where like, comment, and share buttons float).
                </p>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 4: COMPARISON MATRIX: AUTOCLIP VS PREMIERE/CAPCUT */}
            {/* ========================================================= */}
            <section id="comparison" className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    AutoClip Studio vs Traditional Video Editors
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    How automated AI workflows compare against manual timeline editing software.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0 border border-emerald-200">
                  Feature Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Workflow Parameter</th>
                      <th className="py-3 px-3 text-primary font-bold">AutoClip Studio (AI)</th>
                      <th className="py-3 px-3">Adobe Premiere Pro</th>
                      <th className="py-3 px-3">CapCut Desktop</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {COMPARISON_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.feature}</td>
                        <td className="py-3 px-3 font-semibold text-primary bg-primary/5">{row.autoclip}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.premiere}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.capcut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 5: 4-STEP OPERATIONAL WALKTHROUGH                 */}
            {/* ========================================================= */}
            <section id="workflow" className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Automate Viral Short-Form Videos in 4 Steps
              </h2>
              <p className="text-xs sm:text-sm text-text-main/70">
                Follow this simple workflow inside the embedded studio canvas above to generate finished social videos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">{s.title}</h3>
                    <p className="text-xs text-text-main/75 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 6: FAQS ACCORDION (MATCHES FAQPAGE SCHEMA)        */}
            {/* ========================================================= */}
            <section id="faqs" className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Creator Knowledge Base
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Frequently Asked Questions (FAQs)
                </h2>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group py-4 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-text-main group-hover:text-primary transition-colors">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-2" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/75 leading-relaxed pl-2 border-l-2 border-primary/40">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 7: AUTHOR SIGNATURE & VERIFICATION                */}
            {/* ========================================================= */}
            <footer className="p-6 rounded-3xl bg-surface border border-surface-darker flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                  AR
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-text-main">
                    Arulraj &bull; Founder &amp; Lead Systems Engineer
                  </h4>
                  <p className="text-[11px] text-text-main/60">
                    Kagazo Platform Architecture &bull; Updated October 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
                Verified AdSense &amp; In-Browser Privacy Standard
              </div>
            </footer>
          </main>

          {/* ========================================================= */}
          {/* RIGHT DESKTOP STICKY AD RAIL (Hidden on mobile / tablet)  */}
          {/* ========================================================= */}
          <aside
            aria-label="Sponsored Announcements and Related Tools"
            className="hidden xl:block w-[280px] 2xl:w-[320px] shrink-0 sticky top-28 space-y-6"
          >
            {/* Native Right Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Related Creator Media Tools Card */}
            <div className="p-4 rounded-3xl bg-white border border-surface-darker shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-text-main/60">
                <Video className="w-3.5 h-3.5 text-primary" />
                <span>Media Tools</span>
              </div>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link
                    href="/tools/youtube-thumbnail-downloader"
                    className="group block hover:text-primary transition-colors"
                  >
                    <span className="font-bold text-text-main group-hover:text-primary block truncate">
                      YouTube Thumbnail HD
                    </span>
                    <span className="text-[11px] text-text-main/50 block">Grab 1080p covers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/batch-photo-resizer"
                    className="group block hover:text-primary transition-colors"
                  >
                    <span className="font-bold text-text-main group-hover:text-primary block truncate">
                      Batch Photo Resizer
                    </span>
                    <span className="text-[11px] text-text-main/50 block">Batch image scaler</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/compress-image-exact-kb"
                    className="group block hover:text-primary transition-colors"
                  >
                    <span className="font-bold text-text-main group-hover:text-primary block truncate">
                      Exact KB Compressor
                    </span>
                    <span className="text-[11px] text-text-main/50 block">Smart quality retain</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/change-image-dpi"
                    className="group block hover:text-primary transition-colors"
                  >
                    <span className="font-bold text-text-main group-hover:text-primary block truncate">
                      DPI Converter
                    </span>
                    <span className="text-[11px] text-text-main/50 block">300 DPI print prep</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
