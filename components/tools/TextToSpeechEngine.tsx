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
  Clock,
  Mic,
  Zap,
  FastForward,
  Rewind,
  Music2,
  CheckCircle2,
} from 'lucide-react';
import {
  POPULAR_NEURAL_VOICES,
  SAMPLE_SCRIPTS,
  SITUATION_PRESETS,
  type NeuralVoice,
  type SituationPreset,
} from '@/lib/tts-constants';
import { enhancePunctuationAndCadence } from '@/lib/smart-punctuation';

export function TextToSpeechEngine() {
  const [text, setText] = React.useState(SAMPLE_SCRIPTS[0].text);
  const [selectedNeuralVoice, setSelectedNeuralVoice] = React.useState<string>(POPULAR_NEURAL_VOICES[0].id);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  // Situation / Tone Preset
  const [activePreset, setActivePreset] = React.useState<string | null>(null);

  // Audio parameters
  const [rate, setRate] = React.useState<number>(1);
  const [pitch, setPitch] = React.useState<number>(1);
  const [volume, setVolume] = React.useState<number>(1);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState<number>(1);

  // Playback states
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = React.useState(false);

  // Studio Audio Player element & state
  const [audioDuration, setAudioDuration] = React.useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = React.useState<number>(0);
  const [audioBlobUrl, setAudioBlobUrl] = React.useState<string | null>(null);
  const [generatedParamsKey, setGeneratedParamsKey] = React.useState<string>('');

  // Voice audition preview state
  const [previewingVoiceId, setPreviewingVoiceId] = React.useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = React.useState(false);

  // Karaoke teleprompter word tracking
  const [activeWordStart, setActiveWordStart] = React.useState<number | null>(null);
  const [activeWordLength, setActiveWordLength] = React.useState<number>(0);

  // UI modes & notifications
  const [viewMode, setViewMode] = React.useState<'editor' | 'karaoke'>('editor');
  const [copied, setCopied] = React.useState(false);
  const [cleanedToast, setCleanedToast] = React.useState(false);
  const [enhancedToast, setEnhancedToast] = React.useState(false);
  const [pauseToast, setPauseToast] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const activeWordRef = React.useRef<HTMLSpanElement>(null);
  const studioAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const previewAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);

  const textRef = React.useRef(text);
  React.useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Invalidate audio cache whenever text, voice, rate, or pitch change
  const currentParamsKey = `${text.trim()}__${selectedNeuralVoice}__${rate}__${pitch}__${volume}`;

  // Initialize main Studio Audio element on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const audio = new Audio();
    studioAudioRef.current = audio;

    const previewAudio = new Audio();
    previewAudioRef.current = previewAudio;

    audio.onloadedmetadata = () => {
      setAudioDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setAudioCurrentTime(audio.currentTime);
      const currentText = textRef.current;
      if (audio.duration > 0 && currentText.length > 0) {
        const progress = audio.currentTime / audio.duration;
        const charIndex = Math.min(currentText.length - 1, Math.floor(progress * currentText.length));
        const nextSpace = currentText.indexOf(' ', charIndex);
        const wordEnd = nextSpace === -1 ? currentText.length : nextSpace;
        const lastSpace = currentText.lastIndexOf(' ', charIndex);
        const wordStart = lastSpace === -1 ? 0 : lastSpace + 1;
        setActiveWordStart(wordStart);
        setActiveWordLength(Math.max(1, wordEnd - wordStart));
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWordStart(null);
      setActiveWordLength(0);
    };

    audio.onerror = () => {
      if (audio.src && audio.src !== window.location.href && !audio.src.endsWith('/')) {
        setIsPlaying(false);
        setIsPaused(false);
        setIsLoadingAudio(false);
      }
    };

    previewAudio.onended = () => {
      setPreviewingVoiceId(null);
      setIsLoadingPreview(false);
    };

    previewAudio.onerror = () => {
      setPreviewingVoiceId(null);
      setIsLoadingPreview(false);
    };

    return () => {
      audio.pause();
      audio.src = '';
      previewAudio.pause();
      previewAudio.src = '';
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, []);

  // Update volume and playback speed on changes
  React.useEffect(() => {
    if (studioAudioRef.current) {
      studioAudioRef.current.volume = isMuted ? 0 : volume;
      studioAudioRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, isMuted, playbackSpeed]);

  // Clean up object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
    };
  }, [audioBlobUrl]);

  // Auto-scroll to active word in karaoke view
  React.useEffect(() => {
    if (viewMode === 'karaoke' && activeWordRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeWordStart, viewMode]);

  // Autoplay unlock helper
  const unlockAudioContext = () => {
    if (typeof window !== 'undefined') {
      if (!audioContextRef.current) {
        audioContextRef.current = new (
          window.AudioContext ||
          (window as any).webkitAudioContext
        )();
      }
      audioContextRef.current.resume().catch(() => {});
    }
  };

  // Main synthesis helper
  const fetchStudioAudio = async (textToSynthesize: string, voiceId: string, customRate = rate, customPitch = pitch, customVolume = volume) => {
    const response = await fetch('/api/tools/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: textToSynthesize,
        voice: voiceId,
        rate: customRate,
        pitch: customPitch,
        volume: customVolume,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server synthesis returned HTTP ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return new Blob([arrayBuffer], { type: 'audio/mpeg' });
  };

  // Main Play / Resume Handler
  const handlePlay = async () => {
    if (!text.trim()) return;

    // Stop voice audition preview if playing
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      setPreviewingVoiceId(null);
    }

    // If currently paused, resume immediately
    if (isPaused && studioAudioRef.current) {
      studioAudioRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    handleStop();
    unlockAudioContext();

    // If matching audio buffer already cached, play in 0ms!
    if (audioBlobUrl && generatedParamsKey === currentParamsKey && studioAudioRef.current) {
      studioAudioRef.current.currentTime = 0;
      studioAudioRef.current.volume = isMuted ? 0 : volume;
      studioAudioRef.current.playbackRate = playbackSpeed;
      studioAudioRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    // Synthesize fresh Studio Neural Voice
    setIsLoadingAudio(true);
    setDownloadError(null);

    try {
      const audioBlob = await fetchStudioAudio(text.trim(), selectedNeuralVoice, rate, pitch, volume);
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
      const newUrl = URL.createObjectURL(audioBlob);
      setAudioBlobUrl(newUrl);
      setGeneratedParamsKey(currentParamsKey);

      const audio = studioAudioRef.current;
      if (audio) {
        audio.src = newUrl;
        audio.volume = isMuted ? 0 : volume;
        audio.playbackRate = playbackSpeed;
        await audio.play();
        setIsPlaying(true);
        setIsPaused(false);
      }
    } catch (err: any) {
      console.error('Studio TTS fetch error:', err);
      setDownloadError(err.message || 'Could not connect to Studio Voice service. Please try again.');
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const handlePause = () => {
    if (studioAudioRef.current) {
      studioAudioRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setActiveWordStart(null);
    setActiveWordLength(0);

    if (studioAudioRef.current) {
      studioAudioRef.current.pause();
      studioAudioRef.current.currentTime = 0;
    }
  };

  const handleSkipTime = (seconds: number) => {
    if (studioAudioRef.current) {
      const newTime = Math.max(0, Math.min(audioDuration, studioAudioRef.current.currentTime + seconds));
      studioAudioRef.current.currentTime = newTime;
      setAudioCurrentTime(newTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setAudioCurrentTime(targetTime);
    if (studioAudioRef.current) {
      studioAudioRef.current.currentTime = targetTime;
    }
  };

  // Instant 0ms or Fresh MP3 Export
  const handleDownloadMp3 = async () => {
    if (!text.trim()) return;

    // If audio already synthesized with matching params, download in 0ms!
    if (audioBlobUrl && generatedParamsKey === currentParamsKey) {
      triggerDownload(audioBlobUrl);
      return;
    }

    setIsLoadingAudio(true);
    setDownloadError(null);

    try {
      const audioBlob = await fetchStudioAudio(text.trim(), selectedNeuralVoice, rate, pitch, volume);
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
      const newUrl = URL.createObjectURL(audioBlob);
      setAudioBlobUrl(newUrl);
      setGeneratedParamsKey(currentParamsKey);
      triggerDownload(newUrl);
    } catch (err: any) {
      setDownloadError(err.message || 'Failed to download MP3.');
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const triggerDownload = (url: string) => {
    const selectedVoiceObj = POPULAR_NEURAL_VOICES.find((v) => v.id === selectedNeuralVoice);
    const voiceTag = selectedVoiceObj ? selectedVoiceObj.name.split(' ')[0].toLowerCase() : 'studio';
    const link = document.createElement('a');
    link.href = url;
    link.download = `kagazo-tts-${voiceTag}-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Audition Voice Sample
  const handleAuditionVoice = async (voice: NeuralVoice, e: React.MouseEvent) => {
    e.stopPropagation();
    unlockAudioContext();

    // If already playing this voice's preview, stop it
    if (previewingVoiceId === voice.id && previewAudioRef.current) {
      previewAudioRef.current.pause();
      setPreviewingVoiceId(null);
      return;
    }

    // Stop workspace playback if active
    if (isPlaying) {
      handlePause();
    }

    setPreviewingVoiceId(voice.id);
    setIsLoadingPreview(true);

    try {
      const blob = await fetchStudioAudio(voice.sampleText, voice.id, 1, 1, 1);
      const url = URL.createObjectURL(blob);
      if (previewAudioRef.current) {
        previewAudioRef.current.src = url;
        await previewAudioRef.current.play();
      }
    } catch (err) {
      console.error('Preview error:', err);
      setPreviewingVoiceId(null);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  // Situation / Tone Preset selector
  const handleSelectPreset = (preset: SituationPreset) => {
    handleStop();
    setActivePreset(preset.id);
    setRate(preset.rate);
    setPitch(preset.pitch);
  };

  // Smart Punctuation & Breath Enhancer
  const handleSmartPunctuation = () => {
    if (!text.trim()) return;
    const enhanced = enhancePunctuationAndCadence(text);
    setText(enhanced);
    handleStop();
    setEnhancedToast(true);
    setTimeout(() => setEnhancedToast(false), 2500);
  };

  // Insert Natural Pause (`... `)
  const handleInsertPause = () => {
    handleStop();
    const pauseMarker = '... ';
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart || text.length;
      const end = textarea.selectionEnd || text.length;
      const updated = text.slice(0, start) + pauseMarker + text.slice(end);
      setText(updated);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + pauseMarker.length, start + pauseMarker.length);
      }, 50);
    } else {
      setText((prev) => prev + pauseMarker);
    }
    setPauseToast(true);
    setTimeout(() => setPauseToast(false), 2000);
  };

  // Clean PDF Line Breaks
  const handleCleanLineBreaks = () => {
    if (!text.trim()) return;
    const cleaned = text
      .split(/\r?\n\r?\n/)
      .map((para) => para.replace(/\r?\n+/g, ' ').replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join('\n\n');
    setText(cleaned);
    handleStop();
    setCleanedToast(true);
    setTimeout(() => setCleanedToast(false), 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetSettings = () => {
    handleStop();
    setActivePreset(null);
    setRate(1);
    setPitch(1);
    setVolume(1);
    setPlaybackSpeed(1);
    setIsMuted(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        handleStop();
        setText(content.slice(0, 6000));
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
        setText(content.slice(0, 6000));
      }
    };
    reader.readAsText(file);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const estimatedSeconds = Math.round((wordCount / (150 * (rate || 1))) * 60);
  const estimatedMin = Math.floor(estimatedSeconds / 60);
  const estimatedSec = estimatedSeconds % 60;
  const listenDurationStr =
    estimatedMin > 0 ? `${estimatedMin}m ${estimatedSec}s listen` : `${estimatedSec}s listen`;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Filter voices by category
  const filteredVoices = POPULAR_NEURAL_VOICES.filter((voice) => {
    if (selectedCategory === 'All') return true;
    return voice.category === selectedCategory;
  });

  const selectedVoiceObj = POPULAR_NEURAL_VOICES.find((v) => v.id === selectedNeuralVoice) || POPULAR_NEURAL_VOICES[0];

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
          className="bg-[#E6570B] text-white px-2 py-0.5 rounded-md font-bold shadow-lg shadow-[#E6570B]/50 transition-all inline-block scale-105 ring-2 ring-white/30"
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
        {/* Statistics & Quality Badge */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1C24] border border-[#2E313D] text-gray-300 font-medium">
            <FileText className="w-3.5 h-3.5 text-[#E6570B]" />
            <span>{wordCount} Words</span>
            <span className="text-gray-600">&bull;</span>
            <span className={charCount > 6000 ? 'text-rose-400 font-bold' : ''}>
              {charCount} / 6,000 Chars
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1C24] border border-[#2E313D] text-gray-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{listenDurationStr}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 font-semibold">
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            <span>Studio Neural HD</span>
            <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded font-mono">24kHz 96kbps</span>
          </div>
        </div>

        {/* Action Buttons: Smart Punctuation, Insert Pause, Clean PDF Breaks, Import, Copy, Clear */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.csv,.json"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Smart Punctuation & Breath Enhancer */}
          <button
            onClick={handleSmartPunctuation}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600/20 to-orange-600/20 hover:from-amber-600/30 hover:to-orange-600/30 border border-amber-500/40 text-amber-300 hover:text-white rounded-xl transition-all font-semibold"
            title="Expand abbreviations and add natural breathing commas"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{enhancedToast ? 'Tone Enhanced!' : 'Smart Punctuation'}</span>
          </button>

          {/* Insert Natural Pause Button */}
          <button
            onClick={handleInsertPause}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors font-medium"
            title="Insert a natural breathing pause (...)"
          >
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{pauseToast ? 'Pause Added (...)' : '+ Pause (...) '}</span>
          </button>

          {/* Clean PDF Wraps */}
          <button
            onClick={handleCleanLineBreaks}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors font-medium"
            title="Clean broken PDF line wraps into smooth paragraphs"
          >
            <Wand2 className="w-3.5 h-3.5 text-gray-400" />
            <span>{cleanedToast ? 'Breaks Cleaned!' : 'Clean PDF Wraps'}</span>
          </button>

          {/* Import File */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors font-medium"
            title="Import text or script file (.txt, .md, .csv)"
          >
            <Upload className="w-3.5 h-3.5 text-[#E6570B]" />
            <span>Import</span>
          </button>

          {/* Copy Script */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors font-medium"
            title="Copy script text to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Clear Workspace */}
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

      {/* Voice Selection Studio & Audition Carousel */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262833] pb-3">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-sm text-gray-100">Broadcast Neural Voices</span>
            <span className="text-[11px] text-gray-500 font-mono">({POPULAR_NEURAL_VOICES.length} available)</span>
          </div>

          {/* Language / Region Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#0E0F14] p-1 rounded-xl border border-[#262833] text-xs">
            {['All', 'English', 'Indian', 'European', 'Global'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-all font-medium ${
                  selectedCategory === cat
                    ? 'bg-[#E6570B] text-white shadow-sm font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Cards Grid with 1-Click Audition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredVoices.map((voice) => {
            const isSelected = selectedNeuralVoice === voice.id;
            const isAuditioning = previewingVoiceId === voice.id;

            return (
              <div
                key={voice.id}
                onClick={() => {
                  handleStop();
                  setSelectedNeuralVoice(voice.id);
                }}
                className={`group relative p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-emerald-950/50 to-[#12141A] border-emerald-500 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-950/30'
                    : 'bg-[#161822] hover:bg-[#1C1E2B] border-[#262833] text-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{voice.flag}</span>
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-emerald-300' : 'text-gray-200'}`}>
                        {voice.name}
                      </span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#0E0F14] border border-[#2E313D] text-[10px]">
                      {voice.gender}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{voice.locale}</span>
                  </div>
                </div>

                {/* Audition Button */}
                <button
                  type="button"
                  onClick={(e) => handleAuditionVoice(voice, e)}
                  className={`mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all border ${
                    isAuditioning
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md animate-pulse'
                      : 'bg-[#0E0F14] hover:bg-emerald-900/30 hover:border-emerald-600/50 text-gray-300 hover:text-emerald-300 border-[#2E313D]'
                  }`}
                  title={`Audition sample voice for ${voice.name}`}
                >
                  {isAuditioning && isLoadingPreview ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin text-white" />
                      <span>Loading Sample...</span>
                    </>
                  ) : isAuditioning ? (
                    <>
                      <Square className="w-3 h-3 fill-white" />
                      <span>Stop Audition</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current text-emerald-400" />
                      <span>Audition Voice</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Situation & Mood Tone Presets */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 shadow-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1.5 font-semibold text-gray-200">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Speaking Tone & Situation Presets</span>
          </span>
          <span className="text-[11px] text-gray-500">Auto-tunes pacing and pitch curves for your context</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SITUATION_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                    : 'bg-[#161822] hover:bg-[#1C1E2B] border-[#262833] text-gray-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">{preset.icon}</span>
                  <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                    {preset.name}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 line-clamp-1">{preset.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Production SaaS Audio Player Bar & Master Controls */}
      <div className="bg-gradient-to-b from-[#161822] to-[#12141A] border border-[#262833] rounded-2xl p-5 shadow-2xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                disabled={!text.trim() || isLoadingAudio}
                className="flex items-center gap-2.5 px-6 py-3 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-sm font-bold shadow-xl shadow-[#E6570B]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isLoadingAudio ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Connecting Neural Stream...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isPaused ? 'Resume Play' : 'Play Live Voice'}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2.5 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold shadow-xl shadow-amber-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Audio</span>
              </button>
            )}

            {/* Skip -5s */}
            <button
              onClick={() => handleSkipTime(-5)}
              disabled={!audioDuration}
              className="p-3 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors disabled:opacity-30"
              title="Skip backward 5 seconds"
            >
              <Rewind className="w-4 h-4" />
            </button>

            {/* Skip +5s */}
            <button
              onClick={() => handleSkipTime(5)}
              disabled={!audioDuration}
              className="p-3 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors disabled:opacity-30"
              title="Skip forward 5 seconds"
            >
              <FastForward className="w-4 h-4" />
            </button>

            {/* Stop */}
            <button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className="flex items-center gap-1.5 px-4 py-3 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-30"
              title="Stop audio playback"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>

            {/* Instant 0ms MP3 Download */}
            <button
              onClick={handleDownloadMp3}
              disabled={isLoadingAudio || !text.trim()}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              title="Download broadcast 24kHz MP3 audio file"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Studio MP3</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                24kHz HD
              </span>
            </button>
          </div>

          {/* Active Status & Waveform Visualizer */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="flex items-center gap-2 h-10 px-4 bg-[#0E0F14] border border-[#262833] rounded-xl">
              <span className="text-xs font-mono text-gray-300">
                {isLoadingAudio
                  ? 'Synthesizing...'
                  : isPlaying
                  ? 'Playing Studio Audio'
                  : isPaused
                  ? 'Audio Paused'
                  : audioBlobUrl
                  ? 'Ready in Memory'
                  : 'Studio Ready'}
              </span>
              <div className="flex items-center gap-1 ml-2">
                {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3, 0.7].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlaying
                        ? 'bg-emerald-400 animate-pulse'
                        : isLoadingAudio
                        ? 'bg-amber-400 animate-bounce'
                        : 'bg-[#2E313D]'
                    }`}
                    style={{
                      height: isPlaying ? `${h * 24}px` : isLoadingAudio ? `${h * 16}px` : '4px',
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Scrubber Timeline */}
        <div className="bg-[#0E0F14] border border-[#262833] rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span className="text-emerald-400 font-semibold">{formatSeconds(audioCurrentTime)}</span>
            <span className="text-gray-500 font-sans text-[11px] truncate max-w-xs">
              Voice: {selectedVoiceObj.name} ({selectedVoiceObj.gender}) &bull; {selectedVoiceObj.locale}
            </span>
            <span>{formatSeconds(audioDuration)}</span>
          </div>

          <input
            type="range"
            min="0"
            max={audioDuration || 1}
            step="0.05"
            value={audioCurrentTime}
            onChange={handleSeek}
            disabled={!audioDuration}
            className="w-full h-2 bg-[#1A1C24] rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-40"
          />
        </div>

        {/* Secondary Controls: Speed Pills, Vocal Tuning, Volume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-1">
          {/* Playback Speed Pills */}
          <div className="space-y-1.5">
            <label className="text-gray-400 font-medium flex items-center justify-between">
              <span>Player Speed</span>
              <span className="font-mono text-white">{playbackSpeed}x</span>
            </label>
            <div className="flex items-center justify-between gap-1 pt-1">
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2.5 py-1.5 text-xs rounded-lg font-mono transition-all ${
                    playbackSpeed === spd
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'bg-[#1A1C24] text-gray-400 hover:text-white border border-[#2E313D]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Voice Synthesis Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#E6570B]" /> Voice Rate
              </span>
              <span className="font-mono text-white">{rate}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={rate}
              onChange={(e) => {
                handleStop();
                setActivePreset(null);
                setRate(parseFloat(e.target.value));
              }}
              className="w-full accent-[#E6570B] cursor-pointer mt-1"
            />
          </div>

          {/* Voice Pitch Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#E6570B]" /> Pitch
              </span>
              <span className="font-mono text-white">{pitch}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={pitch}
              onChange={(e) => {
                handleStop();
                setActivePreset(null);
                setPitch(parseFloat(e.target.value));
              }}
              className="w-full accent-[#E6570B] cursor-pointer mt-1"
            />
          </div>

          {/* Volume Control with Mute & Reset */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-gray-400 font-medium">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-1 hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>{isMuted ? 'Muted' : 'Volume'}</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetSettings}
                  className="text-[10px] text-gray-500 hover:text-gray-300 underline flex items-center gap-0.5"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Reset
                </button>
                <span className="font-mono text-white">
                  {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (isMuted) setIsMuted(false);
              }}
              className="w-full accent-emerald-500 cursor-pointer mt-1"
            />
          </div>
        </div>

        {/* Error Alert */}
        {downloadError && (
          <div className="flex items-center justify-between p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl text-rose-300 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{downloadError}</span>
            </div>
            <button
              onClick={() => setDownloadError(null)}
              className="px-2 py-1 bg-rose-900/60 hover:bg-rose-900 rounded-lg text-[11px] font-semibold text-white"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Script Workspace & Live Karaoke Teleprompter */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
        {/* Workspace Sub-header */}
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

          {/* View Mode Toggle: Editor vs Karaoke Teleprompter */}
          <div className="flex items-center gap-1 bg-[#0E0F14] p-1 rounded-xl border border-[#262833]">
            <button
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'editor'
                  ? 'bg-[#E6570B] text-white shadow-sm font-semibold'
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
                  ? 'bg-[#E6570B] text-white shadow-sm font-semibold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Karaoke Teleprompter</span>
              {isPlaying && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            </button>
          </div>
        </div>

        {/* Text Workspace */}
        {viewMode === 'editor' ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
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
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (isPlaying) handleStop();
              }}
              placeholder="Type, paste, or drop your script, video narration, article, or dialogue here (up to 6,000 characters)..."
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

        {/* Footer Info Banner */}
        <div className="px-5 py-3 bg-[#161822] border-t border-[#262833] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E6570B]" />
            <span>
              Real-time 24kHz Studio Neural Audio &bull; Use &quot;Smart Punctuation&quot; or &quot;+ Pause&quot; to shape vocal cadence
            </span>
          </div>
          <span className="text-gray-500 font-mono">24kHz 96kbps &bull; 0ms Instant Replay &bull; Royalty-Free</span>
        </div>
      </div>
    </div>
  );
}
