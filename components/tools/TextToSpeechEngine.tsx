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
  Radio,
} from 'lucide-react';

const SAMPLE_SCRIPTS = [
  {
    title: 'Customer Support Welcome',
    text: 'Hello and welcome to our customer support center. All our client operations execute with complete zero-trust privacy. How may we assist your team today?',
  },
  {
    title: 'Product Announcement',
    text: 'We are thrilled to unveil our latest release featuring instant in-browser compression, zero latency execution, and full compliance with web standards.',
  },
  {
    title: 'Audiobook Narration',
    text: 'The evening mist settled quietly over the valley as the lone traveler reached the crossroads, looking up at the distant beacon glowing softly against the dusk.',
  },
];

export function TextToSpeechEngine() {
  const [text, setText] = React.useState(SAMPLE_SCRIPTS[0].text);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = React.useState<string>('');
  const [rate, setRate] = React.useState<number>(1);
  const [pitch, setPitch] = React.useState<number>(1);
  const [volume, setVolume] = React.useState<number>(1);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Load available system voices
  React.useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
      if (available.length > 0 && !selectedVoice) {
        // Default to first English voice or first voice
        const defaultVoice =
          available.find((v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.default)) ||
          available[0];
        setSelectedVoice(defaultVoice.name);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();

    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      const voiceObj = voices.find((v) => v.name === selectedVoice);
      if (voiceObj) utterance.voice = voiceObj;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (typeof window === 'undefined') return;
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
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

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="w-full space-y-6">
      {/* Speech Audio Control Center */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262833] pb-4">
          <div className="flex items-center gap-3">
            {!isSpeaking ? (
              <button
                onClick={handleSpeak}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#E6570B]/25 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Voice</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={handleSpeak}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-600/25 transition-all"
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
          </div>

          {/* Visual Audio Waveform Animation when Speaking */}
          <div className="flex items-center gap-1.5 h-8 px-4 bg-[#0E0F14] border border-[#262833] rounded-xl self-start sm:self-auto">
            <span className="text-[11px] font-mono text-gray-400 mr-2">
              {isSpeaking && !isPaused ? 'Speaking...' : isPaused ? 'Paused' : 'Ready'}
            </span>
            {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isSpeaking && !isPaused ? 'bg-[#E6570B] animate-pulse' : 'bg-[#2E313D]'
                }`}
                style={{
                  height: isSpeaking && !isPaused ? `${h * 22}px` : '4px',
                  animationDelay: `${i * 120}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Voice Selector & Audio Parameter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Voice Dropdown */}
          <div className="space-y-1.5">
            <label className="text-gray-400 flex items-center gap-1 font-medium">
              <Languages className="w-3.5 h-3.5 text-[#E6570B]" />
              <span>Voice / Accent</span>
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#E6570B] truncate cursor-pointer"
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name} className="bg-[#1A1C24] text-xs">
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Speed / Rate */}
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
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-[#E6570B] cursor-pointer"
            />
          </div>

          {/* Pitch */}
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
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full accent-[#E6570B] cursor-pointer"
            />
          </div>

          {/* Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-[#E6570B]" /> Volume
              </span>
              <span className="font-mono text-white">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-[#E6570B] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Script Textarea Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#161822] border-b border-[#262833] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-400">Sample Scripts:</span>
            {SAMPLE_SCRIPTS.map((script) => (
              <button
                key={script.title}
                onClick={() => {
                  handleStop();
                  setText(script.text);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
              >
                {script.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-gray-400 font-mono text-[11px] self-end sm:self-auto">
            <span>{wordCount} Words</span>
            <span>&bull;</span>
            <span>{charCount} Characters</span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-[#1A1C24] hover:bg-[#252836] text-gray-300 hover:text-white transition-colors"
              title="Copy text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste the speech text you wish to convert to realistic voice..."
          className="w-full h-64 p-5 bg-[#0E0F14] text-gray-100 font-sans text-sm sm:text-base leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
        />
      </div>
    </div>
  );
}
