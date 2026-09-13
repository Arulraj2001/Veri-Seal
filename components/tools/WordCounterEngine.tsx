'use client';

import * as React from 'react';
import {
  FileText,
  Copy,
  Check,
  Clock,
  Mic,
  TrendingUp,
  BarChart2,
  Trash2,
} from 'lucide-react';

const SAMPLE_TEXT = `VeriSeal and Kagazo engineer sovereign developer utilities with uncompromising client-side privacy. Every tool operates in local memory without transmitting sensitive document data across the wire.

By executing intensive operations in browser RAM, users gain zero-latency feedback, infinite throughput, and robust protection against remote data breaches. Welcome to the future of high-performance web tooling.`;

export function WordCounterEngine() {
  const [text, setText] = React.useState(SAMPLE_TEXT);
  const [copied, setCopied] = React.useState(false);

  // Computed metrics
  const metrics = React.useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        words: 0,
        characters: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        keywords: [],
      };
    }

    const wordsArray = raw.match(/\b[a-zA-Z0-9_\u00C0-\u017F'-]+\b/g) || [];
    const words = wordsArray.length;
    const characters = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = (raw.match(/[.!?]+(?:\s|$)/g) || []).length || (words > 0 ? 1 : 0);
    const paragraphs = raw.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Reading time (200 words per minute)
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
    // Speaking time (130 words per minute)
    const speakingTimeMinutes = Math.max(1, Math.ceil(words / 130));

    // Keyword density
    const freqMap: Record<string, number> = {};
    const stopWords = new Set(['the', 'and', 'to', 'of', 'a', 'in', 'is', 'that', 'for', 'it', 'as', 'was', 'with', 'on', 'by']);
    wordsArray.forEach((w) => {
      const lower = w.toLowerCase();
      if (lower.length > 2 && !stopWords.has(lower)) {
        freqMap[lower] = (freqMap[lower] || 0) + 1;
      }
    });

    const keywords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / words) * 100).toFixed(1),
      }));

    return {
      words,
      characters,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes: words > 0 ? readingTimeMinutes : 0,
      speakingTimeMinutes: words > 0 ? speakingTimeMinutes : 0,
      keywords,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 text-center">
          <span className="text-gray-400 text-xs">Words</span>
          <p className="text-2xl font-bold text-white mt-0.5">{metrics.words.toLocaleString()}</p>
        </div>
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 text-center">
          <span className="text-gray-400 text-xs">Characters</span>
          <p className="text-2xl font-bold text-[#E6570B] mt-0.5">{metrics.characters.toLocaleString()}</p>
        </div>
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 text-center">
          <span className="text-gray-400 text-xs">No Spaces</span>
          <p className="text-2xl font-bold text-white mt-0.5">{metrics.charsNoSpaces.toLocaleString()}</p>
        </div>
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 text-center">
          <span className="text-gray-400 text-xs">Sentences</span>
          <p className="text-2xl font-bold text-white mt-0.5">{metrics.sentences}</p>
        </div>
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 text-center">
          <span className="text-gray-400 text-xs flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" /> Reading
          </span>
          <p className="text-xl font-bold text-emerald-400 mt-1">~{metrics.readingTimeMinutes} min</p>
        </div>
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 text-center">
          <span className="text-gray-400 text-xs flex items-center justify-center gap-1">
            <Mic className="w-3 h-3 text-blue-400" /> Speaking
          </span>
          <p className="text-xl font-bold text-blue-400 mt-1">~{metrics.speakingTimeMinutes} min</p>
        </div>
      </div>

      {/* Editor Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-3 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#E6570B]" />
            <span className="font-mono text-gray-200">Text Content Workspace</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-lg text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => setText('')}
              className="p-1 bg-[#1A1C24] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#2E313D] rounded-lg transition-colors"
              title="Clear"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text here to view real-time statistics..."
          className="w-full h-72 p-5 bg-[#0E0F14] text-gray-100 font-sans text-sm sm:text-base leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
        />
      </div>

      {/* Keyword Density Table */}
      {metrics.keywords.length > 0 && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3.5 border-b border-[#262833] flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#E6570B]" />
            <h4 className="text-xs font-semibold text-white">Top Keyword Density Analysis</h4>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {metrics.keywords.map((kw) => (
              <div key={kw.word} className="p-3 rounded-xl bg-[#161822] border border-[#262833]">
                <span className="font-mono font-bold text-white capitalize">{kw.word}</span>
                <div className="flex justify-between items-center text-gray-400 mt-1">
                  <span>{kw.count} times</span>
                  <span className="text-[#E6570B] font-semibold">{kw.density}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
