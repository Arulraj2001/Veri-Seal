'use client';

import * as React from 'react';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Video,
  Layers,
  HelpCircle,
  Radio,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutoClipStudioEngineProps {
  className?: string;
}

export function AutoClipStudioEngine({ className }: AutoClipStudioEngineProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [iframeKey, setIframeKey] = React.useState(0);
  const [showGuide, setShowGuide] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [iframeKey]);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full transition-all duration-300',
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#0B0F19] p-3 sm:p-5 flex flex-col h-screen'
          : 'relative rounded-3xl border border-surface-darker/80 bg-white shadow-card overflow-hidden',
        className
      )}
    >
      {/* Studio Header Toolbar */}
      <div
        className={cn(
          'px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b transition-colors',
          isFullscreen
            ? 'bg-[#111625] border-slate-800 text-white rounded-t-2xl'
            : 'bg-slate-900 border-slate-800 text-white rounded-t-3xl'
        )}
      >
        {/* Left: Branding & Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white shadow-md shadow-primary/20 shrink-0">
            <Video className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                AutoClip Studio
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-mono font-bold tracking-normal">
                  v2.0
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Cloud Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Audio-Synced Automated Scene Editing &bull; 9:16 Vertical Shorts &bull; 16:9 Widescreen
            </p>
          </div>
        </div>

        {/* Right: Studio Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Guide Toggle */}
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-all"
            title="Studio Shortcuts &amp; Tips"
          >
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span className="hidden md:inline">Quick Tips</span>
          </button>

          {/* Refresh Frame */}
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-all group"
            title="Reload Studio Frame"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden md:inline">Reload</span>
          </button>

          {/* Fullscreen Expand Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen Studio'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-primary" />
                <span className="hidden md:inline">Expand Canvas</span>
              </>
            )}
          </button>

          {/* Popout Link */}
          <a
            href="https://autoclipaitool.ai.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-extrabold shadow-sm transition-all"
            title="Open in Dedicated Browser Window"
          >
            <span className="hidden sm:inline">Open in Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Optional Quick Tips Dropdown Panel */}
      {showGuide && (
        <div className="bg-[#111625] border-b border-slate-800 px-4 sm:px-6 py-4 text-slate-300 text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">1. Import Audio or Script</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Upload MP3 voiceovers or paste script text to automatically generate beat-matched cuts and subtitle markers.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">2. Pick Aspect Ratio</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Switch between 9:16 for Reels/Shorts/TikTok and 16:9 for YouTube widescreen without re-editing transitions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">3. Fullscreen Editing</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Click Expand Canvas above to maximize your timeline workspace across your entire display.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Studio Frame Container */}
      <div
        className={cn(
          'relative w-full bg-[#0B0F19] overflow-hidden',
          isFullscreen
            ? 'flex-1'
            : 'h-[660px] sm:h-[760px] md:h-[820px] lg:h-[880px] xl:h-[920px]'
        )}
      >
        {/* Loading Skeleton & Progress Pulse */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-[#0B0F19] flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary/30 to-indigo-500/30 border border-primary/40 flex items-center justify-center animate-pulse">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -inset-2 rounded-3xl bg-primary/20 blur-xl -z-10 animate-ping opacity-30" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              Initializing AutoClip Studio Engine...
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              Loading multi-aspect video timeline, audio-sync models, and scene automation canvas in your secure sandbox.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>Connecting to autoclipaitool.ai.studio CDN</span>
            </div>

            <button
              type="button"
              onClick={() => setIsLoading(false)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-2xs"
            >
              Skip to Canvas &rarr;
            </button>
          </div>
        )}

        {/* Embedded Production Studio Frame */}
        <iframe
          key={iframeKey}
          src="https://autoclipaitool.ai.studio/"
          title="AutoClip Studio AI Video Automation Workspace"
          className="w-full h-full border-0 relative z-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; camera; microphone; display-capture"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Studio Micro-Status Bar */}
      <div
        className={cn(
          'px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium border-t transition-colors',
          isFullscreen
            ? 'bg-[#111625] border-slate-800 text-slate-400 rounded-b-2xl'
            : 'bg-slate-900 border-slate-800 text-slate-400 rounded-b-3xl'
        )}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero Server Uploads &bull; Direct Secure Studio Sandbox &bull; No Watermark</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span className="hidden sm:inline">
            Official Platform:{' '}
            <a
              href="https://autoclipaitool.ai.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              autoclipaitool.ai.studio
            </a>
          </span>
          <span className="inline-flex items-center gap-1 text-slate-400">
            <Radio className="w-3 h-3 text-emerald-400" />
            GPU Acceleration Ready
          </span>
        </div>
      </div>
    </div>
  );
}
