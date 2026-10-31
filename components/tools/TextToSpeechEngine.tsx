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
  CheckCircle2,
  Search,
  Radio,
  HelpCircle,
  X,
  Layers,
} from 'lucide-react';
import {
  POPULAR_NEURAL_VOICES,
  SAMPLE_SCRIPTS,
  SITUATION_PRESETS,
  matchBrowserVoice,
  type NeuralVoice,
  type SituationPreset,
} from '@/lib/tts-constants';
import { enhancePunctuationAndCadence } from '@/lib/smart-punctuation';

export function TextToSpeechEngine() {
  const [text, setText] = React.useState(SAMPLE_SCRIPTS[0].text);
  const [selectedNeuralVoice, setSelectedNeuralVoice] = React.useState<string>(POPULAR_NEURAL_VOICES[0].id);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [voiceSearch, setVoiceSearch] = React.useState<string>('');

  // Browser SpeechSynthesis Voices
  const [browserVoices, setBrowserVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = React.useState<boolean>(true);
  const [activeVoiceName, setActiveVoiceName] = React.useState<string>('');
  const [useRawSystemVoice, setUseRawSystemVoice] = React.useState<boolean>(false);
  const [selectedSystemVoiceUri, setSelectedSystemVoiceUri] = React.useState<string>('');

  // Situation / Tone Preset
  const [activePreset, setActivePreset] = React.useState<string | null>(null);

  // Audio parameters
  const [rate, setRate] = React.useState<number>(1);
  const [pitch, setPitch] = React.useState<number>(1);
  const [volume, setVolume] = React.useState<number>(1);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);

  // Playback states
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [audioProgress, setAudioProgress] = React.useState<number>(0);
  const [elapsedTime, setElapsedTime] = React.useState<number>(0);

  // Voice audition preview state
  const [previewingVoiceId, setPreviewingVoiceId] = React.useState<string | null>(null);

  // Karaoke teleprompter word tracking
  const [activeWordStart, setActiveWordStart] = React.useState<number | null>(null);
  const [activeWordLength, setActiveWordLength] = React.useState<number>(0);

  // Audio Recording & Export state
  const [showRecordModal, setShowRecordModal] = React.useState<boolean>(false);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [recordMode, setRecordMode] = React.useState<'tab' | 'mic'>('tab');
  const [recordProgress, setRecordProgress] = React.useState<string>('');

  // UI modes & notifications
  const [viewMode, setViewMode] = React.useState<'editor' | 'karaoke'>('editor');
  const [copied, setCopied] = React.useState(false);
  const [cleanedToast, setCleanedToast] = React.useState(false);
  const [enhancedToast, setEnhancedToast] = React.useState(false);
  const [pauseToast, setPauseToast] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [statusError, setStatusError] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const activeWordRef = React.useRef<HTMLSpanElement>(null);
  const currentUtteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const watchdogRef = React.useRef<any>(null);
  const timerRef = React.useRef<any>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const recordStreamRef = React.useRef<MediaStream | null>(null);

  const textRef = React.useRef(text);
  React.useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Load and enumerate browser voices
  React.useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setBrowserVoices(v);
        // Find best match for default voice
        const matched = matchBrowserVoice(selectedNeuralVoice, v);
        if (matched) {
          setActiveVoiceName(matched.name);
          if (!selectedSystemVoiceUri) {
            setSelectedSystemVoiceUri(matched.voiceURI);
          }
        }
      }
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Polling retry for Safari & mobile browsers where voices load asynchronously
    const retryInterval = setInterval(() => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setBrowserVoices(v);
        clearInterval(retryInterval);
      }
    }, 400);

    return () => {
      clearInterval(retryInterval);
      if (watchdogRef.current) clearInterval(watchdogRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update active voice name when voice selection changes
  React.useEffect(() => {
    if (browserVoices.length > 0) {
      if (useRawSystemVoice && selectedSystemVoiceUri) {
        const found = browserVoices.find((v) => v.voiceURI === selectedSystemVoiceUri);
        if (found) setActiveVoiceName(found.name);
      } else {
        const matched = matchBrowserVoice(selectedNeuralVoice, browserVoices);
        if (matched) setActiveVoiceName(matched.name);
      }
    }
  }, [selectedNeuralVoice, browserVoices, useRawSystemVoice, selectedSystemVoiceUri]);

  // Auto-scroll the karaoke word into view
  React.useEffect(() => {
    if (viewMode === 'karaoke' && activeWordRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [activeWordStart, viewMode]);

  // Stop watchdog and reset timer
  const clearPlaybackTimers = () => {
    if (watchdogRef.current) {
      clearInterval(watchdogRef.current);
      watchdogRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Get active voice object
  const getResolvedVoice = (): SpeechSynthesisVoice | null => {
    if (browserVoices.length === 0) return null;
    if (useRawSystemVoice && selectedSystemVoiceUri) {
      const found = browserVoices.find((v) => v.voiceURI === selectedSystemVoiceUri);
      if (found) return found;
    }
    return matchBrowserVoice(selectedNeuralVoice, browserVoices);
  };

  // Main Stop Handler
  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    clearPlaybackTimers();
    setIsPlaying(false);
    setIsPaused(false);
    setActiveWordStart(null);
    setActiveWordLength(0);
    setAudioProgress(0);
    setElapsedTime(0);
    setPreviewingVoiceId(null);

    // If recording was in progress, stop it cleanly
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    if (recordStreamRef.current) {
      recordStreamRef.current.getTracks().forEach((track) => track.stop());
      recordStreamRef.current = null;
    }
    setIsRecording(false);
  };

  // Main Play / Resume Handler
  const handlePlay = () => {
    if (!text.trim()) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setStatusError('Web Speech API is not supported in this browser environment.');
      return;
    }

    // Stop audition if active
    if (previewingVoiceId) {
      window.speechSynthesis.cancel();
      setPreviewingVoiceId(null);
    }

    // If currently paused, resume immediately
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    // Cancel any running speech
    handleStop();
    setStatusError(null);

    const scriptText = text.trim();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    currentUtteranceRef.current = utterance;

    const voice = getResolvedVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = isMuted ? 0 : volume;

    // Word boundary tracking for Real-Time Karaoke Teleprompter
    utterance.onboundary = (event) => {
      if (event.name === 'word' || event.charIndex !== undefined) {
        const charIndex = event.charIndex;
        let charLength = event.charLength || 0;
        if (!charLength) {
          const sub = scriptText.slice(charIndex);
          const match = sub.match(/^[^\s,.;:!?\n]+/);
          charLength = match ? match[0].length : 5;
        }
        setActiveWordStart(charIndex);
        setActiveWordLength(charLength);

        // Update progress percentage
        if (scriptText.length > 0) {
          const pct = Math.min(100, Math.round((charIndex / scriptText.length) * 100));
          setAudioProgress(pct);
        }
      }
    };

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);

      // Start elapsed timer
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);

      // Chromium 15-second silent pause fix watchdog
      watchdogRef.current = setInterval(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
        }
      }, 10000);
    };

    utterance.onend = () => {
      clearPlaybackTimers();
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWordStart(null);
      setActiveWordLength(0);
      setAudioProgress(100);

      // Trigger recording completion if active
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
        }, 500);
      }
    };

    utterance.onerror = (err) => {
      if (err.error !== 'interrupted' && err.error !== 'canceled') {
        console.error('Speech synthesis error:', err.error);
        setStatusError(`Speech synthesis error: ${err.error}.`);
      }
      clearPlaybackTimers();
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWordStart(null);
      setActiveWordLength(0);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Main Pause Handler
  const handlePause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // Audition Sample Voice Preview
  const handleAuditionVoice = (voice: NeuralVoice, e: React.MouseEvent) => {
    e.stopPropagation();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // If currently auditioning this voice, stop it
    if (previewingVoiceId === voice.id) {
      window.speechSynthesis.cancel();
      setPreviewingVoiceId(null);
      return;
    }

    handleStop();
    setPreviewingVoiceId(voice.id);

    const sampleUtterance = new SpeechSynthesisUtterance(voice.sampleText);
    const resolved = matchBrowserVoice(voice.id, browserVoices);
    if (resolved) {
      sampleUtterance.voice = resolved;
      sampleUtterance.lang = resolved.lang;
    }

    sampleUtterance.rate = 1.0;
    sampleUtterance.pitch = 1.0;
    sampleUtterance.volume = isMuted ? 0 : volume;

    sampleUtterance.onend = () => {
      setPreviewingVoiceId(null);
    };

    sampleUtterance.onerror = () => {
      setPreviewingVoiceId(null);
    };

    window.speechSynthesis.speak(sampleUtterance);
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
        setText(content);
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
        setText(content);
      }
    };
    reader.readAsText(file);
  };

  // In-Browser Audio Recording & Export Workflow
  const startAudioExport = async (mode: 'tab' | 'mic') => {
    if (!text.trim()) return;
    setStatusError(null);
    setRecordProgress('Requesting audio stream...');

    try {
      let stream: MediaStream;

      if (mode === 'tab') {
        if (!navigator.mediaDevices?.getDisplayMedia) {
          throw new Error('Tab audio recording is not supported on this browser or mobile device. Please try microphone recording or standard browser playback.');
        }
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        // Ensure user enabled audio track
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0) {
          stream.getTracks().forEach((t) => t.stop());
          throw new Error('No audio detected. In the popup, make sure you selected "This Tab" and toggled "Also share tab audio".');
        }
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      recordStreamRef.current = stream;
      setShowRecordModal(false);
      setIsRecording(true);
      setRecordProgress('Recording studio narration...');

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(audioBlob);
        const link = document.createElement('a');
        link.href = url;
        const voiceObj = POPULAR_NEURAL_VOICES.find((v) => v.id === selectedNeuralVoice);
        const nameTag = voiceObj ? voiceObj.name.split(' ')[0].toLowerCase() : 'studio';
        link.download = `kagazo-voice-${nameTag}-${Date.now()}.webm`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        stream.getTracks().forEach((track) => track.stop());
        recordStreamRef.current = null;
        setIsRecording(false);
        setRecordProgress('');
      };

      recorder.start();

      // Begin playback
      handlePlay();
    } catch (err: any) {
      console.error('Audio recording failed:', err);
      setIsRecording(false);
      setRecordProgress('');
      if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
        setStatusError(err.message || 'Audio recording was cancelled or not permitted.');
      }
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const estimatedSeconds = Math.round((wordCount / (140 * (rate || 1))) * 60);
  const estimatedMin = Math.floor(estimatedSeconds / 60);
  const estimatedSec = estimatedSeconds % 60;
  const listenDurationStr =
    estimatedMin > 0 ? `${estimatedMin}m ${estimatedSec}s listen` : `${estimatedSec}s listen`;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Filter voices by category and live search query
  const filteredVoices = POPULAR_NEURAL_VOICES.filter((voice) => {
    const matchesCategory = selectedCategory === 'All' || voice.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!voiceSearch.trim()) return true;
    const q = voiceSearch.toLowerCase().trim();
    return (
      voice.name.toLowerCase().includes(q) ||
      voice.locale.toLowerCase().includes(q) ||
      voice.gender.toLowerCase().includes(q) ||
      voice.category.toLowerCase().includes(q)
    );
  });

  const selectedVoiceObj =
    POPULAR_NEURAL_VOICES.find((v) => v.id === selectedNeuralVoice) || POPULAR_NEURAL_VOICES[0];

  // Render text for Karaoke View
  const renderKaraokeContent = () => {
    if (activeWordStart === null) {
      return (
        <div className="text-gray-300 font-sans whitespace-pre-wrap leading-loose text-base">
          {text}
        </div>
      );
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
      {/* Unsupported Browser Alert */}
      {!isSupported && (
        <div className="p-4 bg-rose-950/60 border border-rose-800/80 rounded-2xl text-rose-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <strong className="block font-semibold">Web Speech API Not Detected</strong>
            <span>
              Your browser does not natively expose the W3C SpeechSynthesis API. Please use a modern version of Chrome, Edge, Safari, Firefox, or Opera.
            </span>
          </div>
        </div>
      )}

      {/* Top Quick Actions Bar */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Statistics & Quality Badge */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1C24] border border-[#2E313D] text-gray-300 font-medium">
            <FileText className="w-3.5 h-3.5 text-[#E6570B]" />
            <span>{wordCount} Words</span>
            <span className="text-gray-600">&bull;</span>
            <span>{charCount.toLocaleString()} Chars</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1C24] border border-[#2E313D] text-gray-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{listenDurationStr}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 font-semibold">
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Latency Speech</span>
            <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded font-mono">100% In-Browser</span>
          </div>
        </div>

        {/* Action Buttons: Smart Punctuation, Insert Pause, Clean PDF Breaks, Import, Copy, Clear */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.csv,.json,.doc,.docx"
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
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-gray-400" />
            )}
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#262833] pb-3">
          <div className="flex items-center gap-2 shrink-0">
            <Mic className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-sm text-gray-100">Broadcast &amp; Neural Voices</span>
            <span className="text-[11px] text-gray-500 font-mono">
              ({filteredVoices.length} curated &bull; {browserVoices.length} device voices detected)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Voice Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={voiceSearch}
                onChange={(e) => setVoiceSearch(e.target.value)}
                placeholder="Search voice, language (Hindi, Guy, Tamil)..."
                className="w-full bg-[#0E0F14] border border-[#2E313D] rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {voiceSearch && (
                <button
                  type="button"
                  onClick={() => setVoiceSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Language / Region Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#0E0F14] p-1 rounded-xl border border-[#262833] text-xs">
              {['All', 'English', 'Indian', 'European', 'Global'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setUseRawSystemVoice(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                    selectedCategory === cat && !useRawSystemVoice
                      ? 'bg-[#E6570B] text-white shadow-sm font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Voice Cards Grid with 1-Click Audition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredVoices.map((voice) => {
            const isSelected = selectedNeuralVoice === voice.id && !useRawSystemVoice;
            const isAuditioning = previewingVoiceId === voice.id;

            return (
              <div
                key={voice.id}
                onClick={() => {
                  handleStop();
                  setSelectedNeuralVoice(voice.id);
                  setUseRawSystemVoice(false);
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
                      <span
                        className={`text-xs font-bold truncate ${
                          isSelected ? 'text-emerald-300' : 'text-gray-200'
                        }`}
                      >
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
                  {isAuditioning ? (
                    <>
                      <Square className="w-3 h-3 fill-white" />
                      <span>Stop Sample</span>
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

        {/* All System Voices Dropdown Option */}
        {browserVoices.length > 0 && (
          <div className="pt-2 border-t border-[#262833] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>Direct System Voice Selector:</span>
            </div>
            <select
              value={useRawSystemVoice ? selectedSystemVoiceUri : ''}
              onChange={(e) => {
                const uri = e.target.value;
                if (uri) {
                  handleStop();
                  setSelectedSystemVoiceUri(uri);
                  setUseRawSystemVoice(true);
                  const found = browserVoices.find((v) => v.voiceURI === uri);
                  if (found) setActiveVoiceName(found.name);
                } else {
                  setUseRawSystemVoice(false);
                }
              }}
              className="bg-[#0E0F14] border border-[#2E313D] rounded-xl px-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-emerald-500 max-w-md truncate"
            >
              <option value="">-- Or choose from {browserVoices.length} system voices directly --</option>
              {browserVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Situation & Mood Tone Presets */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 shadow-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1.5 font-semibold text-gray-200">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Speaking Tone &amp; Situation Presets</span>
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
                  <span
                    className={`text-xs font-bold truncate ${
                      isSelected ? 'text-white' : 'text-gray-200'
                    }`}
                  >
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
                disabled={!text.trim()}
                className="flex items-center gap-2.5 px-6 py-3 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-sm font-bold shadow-xl shadow-[#E6570B]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isPaused ? 'Resume Play' : 'Play Live Voice'}</span>
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

            {/* Export & Download Audio Button */}
            <button
              onClick={() => setShowRecordModal(true)}
              disabled={!text.trim() || isRecording}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              title="Record and export audio file directly in your browser"
            >
              <Download className="w-4 h-4 text-white" />
              <span>{isRecording ? 'Recording Stream...' : 'Export Audio File'}</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                {isRecording ? 'LIVE' : 'HD'}
              </span>
            </button>
          </div>

          {/* Active Status & Waveform Visualizer */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="flex items-center gap-2 h-10 px-4 bg-[#0E0F14] border border-[#262833] rounded-xl">
              <span className="text-xs font-mono text-gray-300">
                {isRecording
                  ? recordProgress || 'Recording Audio...'
                  : isPlaying
                  ? 'Speaking Live'
                  : isPaused
                  ? 'Audio Paused'
                  : 'Engine Ready'}
              </span>
              <div className="flex items-center gap-1 ml-2">
                {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3, 0.7].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlaying
                        ? 'bg-emerald-400 animate-pulse'
                        : isRecording
                        ? 'bg-rose-400 animate-bounce'
                        : 'bg-[#2E313D]'
                    }`}
                    style={{
                      height: isPlaying ? `${h * 24}px` : isRecording ? `${h * 18}px` : '4px',
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Progress & Voice Indicator */}
        <div className="bg-[#0E0F14] border border-[#262833] rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span className="text-emerald-400 font-semibold">{formatSeconds(elapsedTime)}</span>
            <span className="text-gray-400 font-sans text-[11px] truncate max-w-sm">
              Voice: {activeVoiceName || selectedVoiceObj.name} &bull; {selectedVoiceObj.locale}
            </span>
            <span className="text-gray-400">{audioProgress}%</span>
          </div>

          <div className="w-full bg-[#1A1C24] h-2 rounded-lg overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-200"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        </div>

        {/* Secondary Controls: Speed Pills, Vocal Tuning, Volume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-1">
          {/* Quick Speed Pills */}
          <div className="space-y-1.5">
            <label className="text-gray-400 font-medium flex items-center justify-between">
              <span>Pacing Preset</span>
              <span className="font-mono text-white">{rate}x</span>
            </label>
            <div className="flex items-center justify-between gap-1 pt-1">
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    handleStop();
                    setActivePreset(null);
                    setRate(spd);
                  }}
                  className={`px-2 py-1.5 text-xs rounded-lg font-mono transition-all ${
                    rate === spd
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
        {statusError && (
          <div className="flex items-center justify-between p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl text-rose-300 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{statusError}</span>
            </div>
            <button
              onClick={() => setStatusError(null)}
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
              placeholder="Type, paste, or drop your script, video narration, article, or dialogue here..."
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
              Real-time In-Browser Speech Engine &bull; Zero Server Latency &bull; 100% Client-Side Privacy
            </span>
          </div>
          <span className="text-gray-500 font-mono">Unlimited Characters &bull; W3C Speech API</span>
        </div>
      </div>

      {/* Audio Export Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161822] border border-[#2E313D] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#2E313D] pb-3">
              <div className="flex items-center gap-2 text-white font-bold">
                <Download className="w-5 h-5 text-emerald-400" />
                <span>Export Audio Recording (.webm)</span>
              </div>
              <button
                onClick={() => setShowRecordModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Because this studio synthesizes audio directly on your device with 100% privacy, you can capture and download the high-definition audio file straight from your browser.
            </p>

            <div className="space-y-3">
              {/* Option 1: Direct Tab Audio Capture */}
              <div
                onClick={() => setRecordMode('tab')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  recordMode === 'tab'
                    ? 'bg-emerald-950/40 border-emerald-500 text-white'
                    : 'bg-[#12141A] border-[#262833] text-gray-300 hover:border-[#383B4A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    Pristine Tab Stream Capture (Recommended)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    Direct Digital
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  In the browser popup, select <strong>&quot;This Tab&quot;</strong> and enable <strong>&quot;Also share tab audio&quot;</strong>. The engine will speak and automatically save the file.
                </p>
              </div>

              {/* Option 2: Microphone Capture */}
              <div
                onClick={() => setRecordMode('mic')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  recordMode === 'mic'
                    ? 'bg-emerald-950/40 border-emerald-500 text-white'
                    : 'bg-[#12141A] border-[#262833] text-gray-300 hover:border-[#383B4A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold flex items-center gap-2">
                    <Mic className="w-4 h-4 text-amber-400" />
                    Microphone / Speaker Loopback
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                    Universal
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Records directly from your microphone or default audio input device. Ideal for mobile phones and tablets.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRecordModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => startAudioExport(recordMode)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Recording &amp; Play</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
