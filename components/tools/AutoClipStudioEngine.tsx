'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Video,
  Play,
  Pause,
  RotateCw,
  Smartphone,
  Monitor,
  Square,
  Sliders,
  Type,
  FileSpreadsheet,
  CheckCircle2,
  Volume2,
  Maximize2,
  Eye,
  Radio,
  ArrowRight,
  Layers,
  Wand2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutoClipStudioEngineProps {
  className?: string;
}

type AspectRatio = '9:16' | '16:9' | '1:1';
type StylePreset = 'mrbeast' | 'hormozi' | 'karaoke' | 'abdaal';

interface DemoScene {
  text: string[];
  activeWordIndex: number;
  bgGradient: string;
  badge: string;
}

export function AutoClipStudioEngine({ className }: AutoClipStudioEngineProps) {
  const [activeTab, setActiveTab] = React.useState<'output' | 'original' | 'batch'>('output');
  const [aspectRatio, setAspectRatio] = React.useState<AspectRatio>('9:16');
  const [stylePreset, setStylePreset] = React.useState<StylePreset>('mrbeast');
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [showSafeZone, setShowSafeZone] = React.useState(true);
  const [currentWordIdx, setCurrentWordIdx] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);

  const sampleWords = [
    'HOW',
    'TOP',
    'CREATORS',
    'AUTOMATE',
    'VIRAL',
    'SHORTS',
    'IN',
    'SECONDS',
    'WITH',
    'AUTOCLIP',
  ];

  // Simulated word-by-word kinetic animation loop
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % sampleWords.length);
    }, 450);
    return () => clearInterval(interval);
  }, [isPlaying, sampleWords.length]);

  return (
    <div
      className={cn(
        'w-full rounded-3xl border border-surface-darker/80 bg-slate-950 text-white shadow-2xl overflow-hidden transition-all',
        className
      )}
    >
      {/* Studio Top Control Bar */}
      <div className="px-4 sm:px-6 py-4 bg-[#0d121f] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-primary/25 shrink-0">
            <Video className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                AutoClip Studio
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-mono font-bold">
                  v2.0
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Cloud Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Audio-Synced Automated Video Editing &bull; 9:16 Shorts &bull; 16:9 Widescreen
            </p>
          </div>
        </div>

        {/* Right: Primary Launch Button */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://autoclipaitool.ai.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-hover hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-primary/25 transition-all group"
          >
            <span>Launch Live Studio</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Showcase Sub-Navigation Tabs */}
      <div className="px-4 sm:px-6 py-2.5 bg-[#090d16] border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('output')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
              activeTab === 'output'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Video Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('original')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
              activeTab === 'original'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Original Studio Workspace</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('batch')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
              activeTab === 'batch'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            )}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Bulk CSV Automation</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
          Official URL: <strong className="text-slate-300 font-mono">autoclipaitool.ai.studio</strong>
        </span>
      </div>

      {/* TAB 1: INTERACTIVE OUTPUT GENERATOR */}
      {activeTab === 'output' && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {/* Aspect Ratio Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Ratio:
              </span>
              <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all',
                    aspectRatio === '9:16'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Smartphone className="w-3 h-3" />
                  9:16 Shorts
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all',
                    aspectRatio === '16:9'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Monitor className="w-3 h-3" />
                  16:9 Cinema
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('1:1')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all',
                    aspectRatio === '1:1'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Square className="w-3 h-3" />
                  1:1 Square
                </button>
              </div>
            </div>

            {/* Kinetic Caption Preset Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Preset:
              </span>
              <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setStylePreset('mrbeast')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
                    stylePreset === 'mrbeast'
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  MrBeast Viral
                </button>
                <button
                  type="button"
                  onClick={() => setStylePreset('hormozi')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
                    stylePreset === 'hormozi'
                      ? 'bg-emerald-400 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  Hormozi Punch
                </button>
                <button
                  type="button"
                  onClick={() => setStylePreset('karaoke')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
                    stylePreset === 'karaoke'
                      ? 'bg-primary text-white font-black'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  Karaoke Sync
                </button>
                <button
                  type="button"
                  onClick={() => setStylePreset('abdaal')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
                    stylePreset === 'abdaal'
                      ? 'bg-indigo-400 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  Ali Abdaal
                </button>
              </div>
            </div>

            {/* Safe Zone Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSafeZone(!showSafeZone)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5',
                  showSafeZone
                    ? 'bg-primary/20 text-primary border-primary/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                )}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Safe Zones {showSafeZone ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Video Preview Canvas Stage */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 py-2">
            {/* The Dynamic Player Frame */}
            <div
              className={cn(
                'relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl transition-all duration-300 flex flex-col items-center justify-center',
                aspectRatio === '9:16' && 'w-[300px] sm:w-[340px] h-[540px] sm:h-[600px]',
                aspectRatio === '16:9' && 'w-full max-w-[620px] h-[348px]',
                aspectRatio === '1:1' && 'w-[340px] sm:w-[420px] h-[340px] sm:h-[420px]'
              )}
            >
              {/* Animated Scene Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/60 to-slate-900 z-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-60 h-60 bg-primary/25 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
              </div>

              {/* TikTok / Shorts UI Safe Zone Overlay */}
              {showSafeZone && aspectRatio === '9:16' && (
                <div className="absolute inset-0 z-10 pointer-events-none border-x-2 border-dashed border-red-500/25">
                  {/* Top Bar Indicator */}
                  <div className="absolute top-3 left-4 right-4 flex justify-between text-[9px] font-mono text-red-400/60 uppercase">
                    <span>Shorts / Reel Safe Top</span>
                    <span>HD 1080p</span>
                  </div>

                  {/* Right Social Action Buttons Simulation */}
                  <div className="absolute right-3 bottom-24 flex flex-col items-center gap-3 text-[10px] text-white/50">
                    <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                      ❤️
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                      💬
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                      ↗️
                    </div>
                  </div>

                  {/* Bottom Caption Safe Zone */}
                  <div className="absolute bottom-3 left-4 text-[9px] font-mono text-red-400/60">
                    Avoid bottom 180px for captions
                  </div>
                </div>
              )}

              {/* Center Kinetic Animated Captions */}
              <div className="relative z-20 px-6 text-center max-w-[90%]">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-4 border border-white/10">
                  ⚡ AutoClip Beat-Sync
                </div>

                {/* Animated Word Highlight Display */}
                <div className="flex flex-wrap items-center justify-center gap-2 py-2">
                  {sampleWords.map((word, i) => {
                    const isActive = i === currentWordIdx;
                    return (
                      <span
                        key={i}
                        className={cn(
                          'transition-all duration-150 inline-block',
                          stylePreset === 'mrbeast' &&
                            (isActive
                              ? 'text-amber-300 scale-125 font-black text-2xl sm:text-3xl drop-shadow-[0_4px_12px_rgba(251,191,36,0.6)] rotate-[-2deg]'
                              : 'text-white font-extrabold text-lg sm:text-xl opacity-70'),
                          stylePreset === 'hormozi' &&
                            (isActive
                              ? 'bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-md font-black text-xl sm:text-2xl scale-110 shadow-lg'
                              : 'text-white font-extrabold text-base sm:text-lg opacity-70 uppercase'),
                          stylePreset === 'karaoke' &&
                            (isActive
                              ? 'text-primary scale-120 font-black text-2xl sm:text-3xl underline decoration-primary decoration-4'
                              : 'text-slate-400 font-bold text-lg sm:text-xl'),
                          stylePreset === 'abdaal' &&
                            (isActive
                              ? 'bg-indigo-300/30 text-indigo-200 px-2.5 py-0.5 rounded-lg border border-indigo-400/40 font-bold text-xl scale-110'
                              : 'text-slate-300 font-medium text-base sm:text-lg')
                        )}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-4 text-[11px] text-slate-400 font-mono flex items-center justify-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-primary" />
                  <span>Audio Sync: 128 BPM &bull; 0.04s Cadence</span>
                </div>
              </div>

              {/* Bottom Scrubber & Player Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-md p-3 border-t border-slate-800 z-20 flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 rounded-lg bg-primary hover:bg-primary-hover flex items-center justify-center text-white"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>

                {/* Animated Simulated Waveform */}
                <div className="flex-1 flex items-center gap-1 h-5 px-2 bg-slate-900 rounded-lg overflow-hidden">
                  {Array.from({ length: 28 }).map((_, idx) => {
                    const heightPercent = 20 + ((idx * 17 + currentWordIdx * 12) % 75);
                    return (
                      <span
                        key={idx}
                        className={cn(
                          'w-1 rounded-full transition-all duration-200',
                          idx <= currentWordIdx * 2.8 ? 'bg-primary' : 'bg-slate-700'
                        )}
                        style={{ height: `${heightPercent}%` }}
                      />
                    );
                  })}
                </div>

                <span className="font-mono text-[10px] text-slate-400">00:04 / 00:15</span>
              </div>
            </div>

            {/* Sidebar Details / Presets Summary */}
            <div className="space-y-4 max-w-sm">
              <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <Wand2 className="w-4 h-4" />
                  AutoClip Generation Pipeline
                </div>
                <h4 className="text-base font-extrabold text-white">
                  Real Output Rendered in 1 Click
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This demo reflects the real AutoClip Studio algorithm. When you upload your voiceover script at{' '}
                  <strong className="text-slate-200">autoclipaitool.ai.studio</strong>, the AI aligns syllables to visual hooks and renders full HD clips with zero watermarks.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Word-by-word kinetic subtitle typography</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Audio transient detection for beat-matched cuts</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1080p high-bitrate MP4 export without watermark</span>
                </div>
              </div>

              <a
                href="https://autoclipaitool.ai.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-extrabold shadow-lg shadow-primary/20 transition-all group"
              >
                <span>Open AutoClip Studio to Edit Videos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORIGINAL STUDIO WORKSPACE (REAL SCREENSHOT) */}
      {activeTab === 'original' && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                Original AutoClip Studio Workspace Interface
              </h3>
              <p className="text-xs text-slate-400">
                Production multi-track timeline, scene alignment wizard, and style controls captured directly from the live application.
              </p>
            </div>

            <a
              href="https://autoclipaitool.ai.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all shrink-0"
            >
              <span>Launch Studio App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* High-Fidelity Workspace Screenshot Display */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl group">
            <div className="relative aspect-[16/9] w-full max-h-[640px]">
              <Image
                src="/images/autoclip-studio-workspace.png"
                alt="AutoClip Studio AI Video Automation Workspace Interface"
                fill
                className="object-contain object-top"
                priority
              />
            </div>

            {/* Bottom Overlay Label */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                Live Engine at autoclipaitool.ai.studio
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Click Launch Studio App above to edit timelines directly
              </span>
            </div>
          </div>

          {/* Key Workspace Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0e1424] border border-slate-800 space-y-1">
              <strong className="text-xs text-white block">1. Multi-Track Timeline</strong>
              <p className="text-[11px] text-slate-400">
                Independent tracks for scenes, voiceover audio, captions, and background music (BGM).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0e1424] border border-slate-800 space-y-1">
              <strong className="text-xs text-white block">2. 4-Step Studio Pipeline</strong>
              <p className="text-[11px] text-slate-400">
                1-click script + media + voiceover alignment with sample demo templates.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0e1424] border border-slate-800 space-y-1">
              <strong className="text-xs text-white block">3. Creator Presets</strong>
              <p className="text-[11px] text-slate-400">
                Built-in MrBeast, Hormozi, Karaoke, and Ali Abdaal visual caption presets.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BULK CSV SPREADSHEET AUTOMATION */}
      {activeTab === 'batch' && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                Bulk CSV Batch Generation Demonstration
              </h3>
              <p className="text-xs text-slate-400">
                How AutoClip Studio automates 50+ video variations from a single spreadsheet file.
              </p>
            </div>

            <a
              href="https://autoclipaitool.ai.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-sm transition-all shrink-0"
            >
              <span>Try Bulk Mode</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Sample Batch Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0e1424]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-semibold">
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-3">Video Title / Hook</th>
                  <th className="py-3 px-3">Aspect Ratio</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Preset</th>
                  <th className="py-3 px-3">Render Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono text-[11px]">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3 px-3 text-slate-500">01</td>
                  <td className="py-3 px-3 font-sans font-bold text-white">
                    3 Secrets to Viral AI Shorts in 2026
                  </td>
                  <td className="py-3 px-3 text-primary">9:16 Vertical</td>
                  <td className="py-3 px-3">34s</td>
                  <td className="py-3 px-3 text-amber-400">MrBeast</td>
                  <td className="py-3 px-3 text-emerald-400 font-sans font-semibold">
                    ✓ 1080p Export Ready
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3 px-3 text-slate-500">02</td>
                  <td className="py-3 px-3 font-sans font-bold text-white">
                    Why Audio-Sync Multiplies Video Retention
                  </td>
                  <td className="py-3 px-3 text-primary">9:16 Vertical</td>
                  <td className="py-3 px-3">48s</td>
                  <td className="py-3 px-3 text-emerald-400">Hormozi</td>
                  <td className="py-3 px-3 text-emerald-400 font-sans font-semibold">
                    ✓ 1080p Export Ready
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3 px-3 text-slate-500">03</td>
                  <td className="py-3 px-3 font-sans font-bold text-white">
                    Stop Wasting 5 Hours in Premiere Pro
                  </td>
                  <td className="py-3 px-3 text-indigo-400">16:9 Cinema</td>
                  <td className="py-3 px-3">59s</td>
                  <td className="py-3 px-3 text-primary">Karaoke</td>
                  <td className="py-3 px-3 text-emerald-400 font-sans font-semibold">
                    ✓ 1080p Export Ready
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3 px-3 text-slate-500">04</td>
                  <td className="py-3 px-3 font-sans font-bold text-white">
                    How Bulk CSV Generates 30 Reels in 5 Minutes
                  </td>
                  <td className="py-3 px-3 text-primary">9:16 Vertical</td>
                  <td className="py-3 px-3">28s</td>
                  <td className="py-3 px-3 text-indigo-400">Abdaal</td>
                  <td className="py-3 px-3 text-emerald-400 font-sans font-semibold">
                    ✓ 1080p Export Ready
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Studio Footer Micro-Bar */}
      <div className="px-4 sm:px-6 py-3 bg-[#0d121f] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Server Uploads &bull; Direct Secure Studio Sandbox &bull; No Watermark</span>
        </div>

        <a
          href="https://autoclipaitool.ai.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-hover font-bold flex items-center gap-1 transition-colors"
        >
          <span>Open autoclipaitool.ai.studio</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
