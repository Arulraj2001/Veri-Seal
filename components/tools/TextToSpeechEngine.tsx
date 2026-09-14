'use client';

import * as React from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Sparkles,
  RotateCcw,
  Sliders,
  Languages,
  Copy,
  Check,
  Download,
  Upload,
  Wand2,
  Trash2,
  Loader2,
  FileText,
  Eye,
  Edit3,
  AlertCircle,
  Radio,
  Clock,
  Mic,
} from 'lucide-react';
import { POPULAR_NEURAL_VOICES, SAMPLE_SCRIPTS, type NeuralVoice } from '@/lib/tts-constants';

interface SentenceChunk {
  text: string;
  startOffset: number;
  endOffset: number;
}

export function TextToSpeechEngine() {
  const [text, setText] = React.useState(SAMPLE_SCRIPTS[0].text);
  const [browserVoices, setBrowserVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedBrowserVoice, setSelectedBrowserVoice] = React.useState<string>('');
  const [selectedNeuralVoice, setSelectedNeuralVoice] = React.useState<string>(POPULAR_NEURAL_VOICES[0].id);

  // Audio parameters
  const [rate, setRate] = React.useState<number>(1);
  const [pitch, setPitch] = React.useState<number>(1);
  const [volume, setVolume] = React.useState<number>(1);

  // Playback & highlighting states
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = React.useState(0);
  const [totalSentences, setTotalSentences] = React.useState(1);
  const [activeWordStart, setActiveWordStart] = React.useState<number | null>(null);
  const [activeWordLength, setActiveWordLength] = React.useState<number>(0);

  // UI modes
  const [viewMode, setViewMode] = React.useState<'editor' | 'karaoke'>('editor');
  const [copied, setCopied] = React.useState(false);
  const [cleanedToast, setCleanedToast] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  // MP3 Download states
  const [isDownloadingMp3, setIsDownloadingMp3] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState<string | null>(null);
  const [generatedAudioUrl, setGeneratedAudioUrl] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const activeWordRef = React.useRef<HTMLSpanElement>(null);
  const watchdogTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const currentChunkIndexRef = React.useRef(0);
  const chunksRef = React.useRef<SentenceChunk[]>([]);
  const isSpeakingRef = React.useRef(false);

  // Load available system browser voices
  React.useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setBrowserVoices(available);
      if (available.length > 0 && !selectedBrowserVoice) {
        const defaultVoice =
          available.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Google') || v.name.includes('Natural') || v.default)
          ) || available[0];
        setSelectedBrowserVoice(defaultVoice.name);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
      if (watchdogTimerRef.current) clearInterval(watchdogTimerRef.current);
    };
  }, [selectedBrowserVoice]);

  // Clean up object URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (generatedAudioUrl) {
        URL.revokeObjectURL(generatedAudioUrl);
      }
    };
  }, [generatedAudioUrl]);

  // Auto-scroll to active word in karaoke teleprompter view
  React.useEffect(() => {
    if (viewMode === 'karaoke' && activeWordRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeWordStart, viewMode]);

  // Helper to split text into natural sentences with character offsets
  const parseSentenceChunks = (sourceText: string): SentenceChunk[] => {
    const rawMatches = sourceText.match(/[^.!?\r\n]+(?:[.!?\r\n]+|$)/g);
    if (!rawMatches) return [{ text: sourceText, startOffset: 0, endOffset: sourceText.length }];

    const results: SentenceChunk[] = [];
    let currentOffset = 0;

    for (const match of rawMatches) {
      const trimmed = match.trim();
      if (trimmed.length > 0) {
        const start = sourceText.indexOf(match, currentOffset);
        results.push({
          text: trimmed,
          startOffset: start,
          endOffset: start + trimmed.length,
        });
        currentOffset = start + match.length;
      }
    }

    return results.length > 0 ? results : [{ text: sourceText, startOffset: 0, endOffset: sourceText.length }];
  };

  // Chrome 15s freeze fix watchdog timer
  const startWatchdog = () => {
    if (watchdogTimerRef.current) clearInterval(watchdogTimerRef.current);
    watchdogTimerRef.current = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    }, 10000);
  };

  const stopWatchdog = () => {
    if (watchdogTimerRef.current) {
      clearInterval(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
    }
  };

  const speakChunk = (chunkIndex: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!isSpeakingRef.current) return;

    const chunks = chunksRef.current;
    if (chunkIndex >= chunks.length) {
      handleStop();
      return;
    }

    currentChunkIndexRef.current = chunkIndex;
    setCurrentSentenceIndex(chunkIndex + 1);

    const chunk = chunks[chunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunk.text);

    if (selectedBrowserVoice) {
      const voiceObj = browserVoices.find((v) => v.name === selectedBrowserVoice);
      if (voiceObj) utterance.voice = voiceObj;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        const globalCharIndex = chunk.startOffset + e.charIndex;
        setActiveWordStart(globalCharIndex);
        setActiveWordLength(e.charLength || 5);
      }
    };

    utterance.onend = () => {
      if (!isSpeakingRef.current) return;
      if (chunkIndex + 1 < chunks.length) {
        speakChunk(chunkIndex + 1);
      } else {
        handleStop();
      }
    };

    utterance.onerror = (err) => {
      // Interrupted error occurs naturally when user clicks stop
      if (err.error !== 'interrupted' && err.error !== 'canceled') {
        console.error('TTS playback error:', err);
      }
      handleStop();
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      startWatchdog();
      return;
    }

    window.speechSynthesis.cancel();

    if (!text.trim()) return;

    const parsedChunks = parseSentenceChunks(text);
    chunksRef.current = parsedChunks;
    setTotalSentences(parsedChunks.length);
    currentChunkIndexRef.current = 0;
    setCurrentSentenceIndex(1);

    isSpeakingRef.current = true;
    setIsSpeaking(true);
    setIsPaused(false);
    startWatchdog();

    speakChunk(0);
  };

  const handlePause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      stopWatchdog();
    }
  };

  const handleStop = () => {
    if (typeof window === 'undefined') return;
    isSpeakingRef.current = false;
    stopWatchdog();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveWordStart(null);
    setActiveWordLength(0);
    setCurrentSentenceIndex(1);
  };

  const handleSpeedPill = (speed: number) => {
    setRate(speed);
    if (isSpeaking) {
      handleStop();
    }
  };

  const handleResetSettings = () => {
    setRate(1);
    setPitch(1);
    setVolume(1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clean broken line breaks from PDF copies
  const handleCleanLineBreaks = () => {
    if (!text.trim()) return;
    const cleaned = text
      .split(/\r?\n\r?\n/)
      .map((para) => para.replace(/\r?\n+/g, ' ').replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join('\n\n');
    setText(cleaned);
    setCleanedToast(true);
    setTimeout(() => setCleanedToast(false), 2500);
  };

  // File import handling (.txt, .md, .csv, .json)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        handleStop();
        setText(content.slice(0, 10000));
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        handleStop();
        setText(content.slice(0, 10000));
      }
    };
    reader.readAsText(file);
  };

  // Studio-grade MP3 synthesis & download
  const handleDownloadMp3 = async () => {
    if (!text.trim()) return;
    setIsDownloadingMp3(true);
    setDownloadError(null);

    try {
      const response = await fetch('/api/tools/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          voice: selectedNeuralVoice,
          rate: rate,
          pitch: pitch,
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || `Server synthesis failed (HTTP ${response.status})`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setGeneratedAudioUrl(url);

      // Trigger automatic browser download
      const link = document.createElement('a');
      link.href = url;
      link.download = `kagazo-speech-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error('MP3 download error:', err);
      setDownloadError(err.message || 'Failed to generate studio MP3. Please check your network and try again.');
    } finally {
      setIsDownloadingMp3(false);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  // Estimated reading duration based on 150 words/min divided by rate
  const estimatedSeconds = Math.round((wordCount / (150 * (rate || 1))) * 60);
  const estimatedMin = Math.floor(estimatedSeconds / 60);
  const estimatedSec = estimatedSeconds % 60;
  const listenDurationStr =
    estimatedMin > 0 ? `${estimatedMin}m ${estimatedSec}s listen` : `${estimatedSec}s listen`;

  // Render text for Karaoke View
  const renderKaraokeContent = () => {
    if (activeWordStart === null) {
      return <div className="text-gray-300 font-sans whitespace-pre-wrap leading-loose text-base">{text}</div>;
    }

    const before = text.slice(0, activeWordStart);
    const active = text.slice(activeWordStart, activeWordStart + activeWordLength);
    const after = text.slice(activeWordStart + activeWordLength);

    return (
      <div className="text-gray-300 font-sans whitespace-pre-wrap leading-loose text-base">
        <span>{before}</span>
        <span
          ref={activeWordRef}
          className="bg-[#E6570B] text-white px-1.5 py-0.5 rounded font-bold shadow-md shadow-[#E6570B]/40 transition-all inline-block scale-105"
        >
          {active}
        </span>
        <span>{after}</span>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Quick Actions Bar */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Statistics & Badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1C24] border border-[#2E313D] text-gray-300 font-medium">
            <FileText className="w-3.5 h-3.5 text-[#E6570B]" />
            <span>{wordCount} Words</span>
            <span className="text-gray-500">&bull;</span>
            <span>{charCount} Chars</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1C24] border border-[#2E313D] text-gray-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{listenDurationStr}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 font-medium text-[11px]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>Studio MP3 + Instant Preview</span>
          </div>
        </div>

        {/* Action Buttons: Import, Clean Line Breaks, Clear */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.csv,.json"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors font-medium"
            title="Import text or script file (.txt, .md, .csv)"
          >
            <Upload className="w-3.5 h-3.5 text-[#E6570B]" />
            <span>Import File</span>
          </button>

          <button
            onClick={handleCleanLineBreaks}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors font-medium"
            title="Clean broken PDF line breaks into smooth paragraphs"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{cleanedToast ? 'Line Breaks Cleaned!' : 'Clean PDF Breaks'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors font-medium"
            title="Copy script text to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => {
              handleStop();
              setText('');
            }}
            disabled={!text}
            className="p-1.5 rounded-xl bg-[#1A1C24] hover:bg-rose-950/40 hover:text-rose-400 border border-[#2E313D] text-gray-400 transition-colors disabled:opacity-30"
            title="Clear text"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Playback & Studio MP3 Control Center */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#262833] pb-5">
          {/* Primary Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {!isSpeaking ? (
              <button
                onClick={handleSpeak}
                disabled={!text.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#E6570B]/25 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Voice</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={handleSpeak}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-600/25 transition-all"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={handleStop}
              disabled={!isSpeaking && !isPaused}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-40"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>

            {/* Studio MP3 Download Button */}
            <button
              onClick={handleDownloadMp3}
              disabled={isDownloadingMp3 || !text.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
              title="Download studio-grade broadcast MP3 generated via neural synthesis"
            >
              {isDownloadingMp3 ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Studio MP3...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Studio MP3</span>
                  <span className="hidden sm:inline text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono font-normal">
                    24kHz HD
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Audio Waveform & Speech Chunk Progress Status */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            {isSpeaking && totalSentences > 1 && (
              <div className="px-3 py-1 bg-[#1A1C24] border border-[#2E313D] rounded-xl text-[11px] font-mono text-gray-300">
                Sentence {currentSentenceIndex} of {totalSentences}
              </div>
            )}

            <div className="flex items-center gap-1.5 h-8 px-4 bg-[#0E0F14] border border-[#262833] rounded-xl">
              <span className="text-[11px] font-mono text-gray-400 mr-2">
                {isSpeaking && !isPaused ? 'Speaking...' : isPaused ? 'Paused' : isDownloadingMp3 ? 'Synthesizing...' : 'Ready'}
              </span>
              {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isSpeaking && !isPaused
                      ? 'bg-[#E6570B] animate-pulse'
                      : isDownloadingMp3
                      ? 'bg-emerald-500 animate-bounce'
                      : 'bg-[#2E313D]'
                  }`}
                  style={{
                    height: isSpeaking && !isPaused ? `${h * 22}px` : isDownloadingMp3 ? `${h * 16}px` : '4px',
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Error Alert if MP3 Download Failed */}
        {downloadError && (
          <div className="flex items-center gap-2 p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{downloadError}</span>
          </div>
        )}

        {/* Generated MP3 Inline Player */}
        {generatedAudioUrl && (
          <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Studio MP3 Ready &bull; High Bitrate 24kHz
              </span>
              <a
                href={generatedAudioUrl}
                download={`kagazo-speech-${Date.now()}.mp3`}
                className="text-[11px] underline hover:text-emerald-300"
              >
                Download Again
              </a>
            </div>
            <audio controls src={generatedAudioUrl} className="w-full h-8" />
          </div>
        )}

        {/* Voice Selectors & Audio Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Studio MP3 Neural Voice */}
          <div className="space-y-1.5">
            <label className="text-gray-400 flex items-center justify-between font-medium">
              <span className="flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
                <span>Studio MP3 Voice</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Neural HD</span>
            </label>
            <select
              value={selectedNeuralVoice}
              onChange={(e) => setSelectedNeuralVoice(e.target.value)}
              className="w-full bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 truncate cursor-pointer"
            >
              {POPULAR_NEURAL_VOICES.map((v) => (
                <option key={v.id} value={v.id} className="bg-[#1A1C24] text-xs">
                  {v.flag} {v.name} ({v.gender})
                </option>
              ))}
            </select>
          </div>

          {/* Browser Preview Voice */}
          <div className="space-y-1.5">
            <label className="text-gray-400 flex items-center justify-between font-medium">
              <span className="flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-[#E6570B]" />
                <span>Browser Voice</span>
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Instant Preview</span>
            </label>
            <select
              value={selectedBrowserVoice}
              onChange={(e) => setSelectedBrowserVoice(e.target.value)}
              className="w-full bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#E6570B] truncate cursor-pointer"
            >
              {browserVoices.length === 0 && (
                <option value="">Default System Voice</option>
              )}
              {browserVoices.map((v) => (
                <option key={v.name} value={v.name} className="bg-[#1A1C24] text-xs">
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Speed / Rate & Speed Pills */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#E6570B]" /> Speed
              </span>
              <span className="font-mono text-white">{rate}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-[#E6570B] cursor-pointer"
            />
            {/* Quick Speed Selector Pills */}
            <div className="flex items-center justify-between gap-1 pt-0.5">
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedPill(s)}
                  className={`px-1.5 py-0.5 text-[10px] rounded font-mono transition-colors ${
                    rate === s
                      ? 'bg-[#E6570B] text-white font-bold'
                      : 'bg-[#1A1C24] text-gray-400 hover:text-white border border-[#2E313D]'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Pitch & Volume sliders */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#E6570B]" /> Pitch &bull; Vol
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetSettings}
                  className="text-[10px] text-gray-400 hover:text-white underline flex items-center gap-0.5"
                  title="Reset to 1.0x"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Reset
                </button>
                <span className="font-mono text-white">{pitch}x &bull; {Math.round(volume * 100)}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={pitch}
                title="Vocal Pitch"
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-[#E6570B] cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                title="Audio Volume"
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#E6570B] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Script Textarea Card & Karaoke Teleprompter View */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
        {/* Card Header with View Switcher & Sample Scripts */}
        <div className="p-4 bg-[#161822] border-b border-[#262833] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Sample Scripts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-400 font-medium">Quick Scripts:</span>
            {SAMPLE_SCRIPTS.map((script) => (
              <button
                key={script.title}
                onClick={() => {
                  handleStop();
                  setText(script.text);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors text-[11px]"
              >
                {script.title}
              </button>
            ))}
          </div>

          {/* Mode Tabs: Editor vs Live Karaoke Follower */}
          <div className="flex items-center gap-1 bg-[#0E0F14] p-1 rounded-xl border border-[#262833] self-start md:self-auto">
            <button
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'editor'
                  ? 'bg-[#E6570B] text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setViewMode('karaoke')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'karaoke'
                  ? 'bg-[#E6570B] text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Karaoke Follower</span>
              {isSpeaking && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            </button>
          </div>
        </div>

        {/* Workspace Body: Editor or Karaoke Highlighting */}
        {viewMode === 'editor' ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative transition-all ${
              isDragging ? 'ring-2 ring-[#E6570B] bg-[#E6570B]/5' : ''
            }`}
          >
            {isDragging && (
              <div className="absolute inset-0 bg-[#0E0F14]/90 z-10 flex flex-col items-center justify-center pointer-events-none text-white">
                <Upload className="w-8 h-8 text-[#E6570B] animate-bounce mb-2" />
                <p className="text-sm font-semibold">Drop document or script file here to load</p>
              </div>
            )}
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (isSpeaking) handleStop();
              }}
              placeholder="Type, paste, or drop your script, speech, article, or dialogue here (up to 6,000 characters for Studio MP3)..."
              className="w-full h-72 p-5 bg-[#0E0F14] text-gray-100 font-sans text-sm sm:text-base leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
            />
          </div>
        ) : (
          <div className="w-full h-72 p-6 bg-[#0E0F14] overflow-y-auto">
            {text.trim() ? (
              renderKaraokeContent()
            ) : (
              <div className="text-gray-500 italic text-center py-20">
                Please enter or paste text in Editor mode to activate the Live Karaoke Follower.
              </div>
            )}
          </div>
        )}

        {/* Footer info banner */}
        <div className="px-5 py-3 bg-[#161822] border-t border-[#262833] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E6570B]" />
            <span>
              Tip: Click &quot;Live Karaoke Follower&quot; while playing to follow the real-time glowing word teleprompter!
            </span>
          </div>
          <span className="text-gray-500">Auto-chunking active &bull; No 15s Chrome freeze</span>
        </div>
      </div>
    </div>
  );
}
