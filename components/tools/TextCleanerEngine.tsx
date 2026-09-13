'use client';

import * as React from 'react';
import {
  Scissors,
  Copy,
  Check,
  Download,
  Trash2,
  Sparkles,
  RotateCcw,
  CheckSquare,
} from 'lucide-react';

interface TextCleanerEngineProps {
  initialAction?: 'clean' | 'linebreaks';
}

const SAMPLE_TEXT = `   This is an    example of messy, unformatted   text.   

It has multiple    unnecessary spaces,
extra blank lines,

and random punctuation: hello world!   
Also special symbols: 🚀 🌟 #web3.

	Let's clean it up completely.`;

export function TextCleanerEngine({ initialAction = 'clean' }: TextCleanerEngineProps) {
  const [input, setInput] = React.useState(SAMPLE_TEXT);
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  // Cleaner flags
  const [stripLineBreaks, setStripLineBreaks] = React.useState(initialAction === 'linebreaks');
  const [collapseBlankLines, setCollapseBlankLines] = React.useState(true);
  const [collapseSpaces, setCollapseSpaces] = React.useState(true);
  const [trimLines, setTrimLines] = React.useState(true);
  const [stripHtml, setStripHtml] = React.useState(false);
  const [stripPunctuation, setStripPunctuation] = React.useState(false);
  const [stripEmojis, setStripEmojis] = React.useState(false);

  React.useEffect(() => {
    let res = input;

    if (stripHtml) {
      res = res.replace(/<[^>]*>/g, '');
    }

    if (trimLines) {
      res = res
        .split('\n')
        .map((l) => l.trim())
        .join('\n');
    }

    if (collapseBlankLines) {
      res = res.replace(/\n{2,}/g, '\n\n');
    }

    if (collapseSpaces) {
      res = res.replace(/[ \t]{2,}/g, ' ');
    }

    if (stripEmojis) {
      res = res.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      );
    }

    if (stripPunctuation) {
      res = res.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>]/g, '');
    }

    if (stripLineBreaks) {
      res = res.replace(/[\r\n]+/g, ' ').trim();
    }

    setOutput(res);
  }, [
    input,
    stripLineBreaks,
    collapseBlankLines,
    collapseSpaces,
    trimLines,
    stripHtml,
    stripPunctuation,
    stripEmojis,
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Cleaning Options Toolbar */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#262833] pb-3">
          <span className="text-xs font-semibold text-gray-300">Cleaning Rules & Filters:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#E6570B]/20 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Output'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl transition-colors"
              title="Download text"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setInput('')}
              className="p-1.5 bg-[#1A1C24] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#2E313D] rounded-xl transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Toggle Checkboxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={stripLineBreaks}
              onChange={(e) => setStripLineBreaks(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Remove All Line Breaks</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={collapseSpaces}
              onChange={(e) => setCollapseSpaces(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Collapse Multiple Spaces</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={collapseBlankLines}
              onChange={(e) => setCollapseBlankLines(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Remove Extra Blank Lines</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Trim Leading & Trailing</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={stripHtml}
              onChange={(e) => setStripHtml(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Strip HTML Tags</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={stripPunctuation}
              onChange={(e) => setStripPunctuation(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Remove Punctuation</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={stripEmojis}
              onChange={(e) => setStripEmojis(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Remove Emojis</span>
          </label>
        </div>
      </div>

      {/* Dual Side-by-Side Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Source Text */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-gray-300">Original Text</span>
            <span>{input.length} Chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste messy text here..."
            className="w-full h-80 p-4 bg-[#0E0F14] text-gray-200 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
          />
        </div>

        {/* Cleaned Output */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[#E6570B]">Cleaned Result</span>
            <span className="text-gray-400 font-mono text-[11px]">{output.length} Chars</span>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Cleaned text appears here..."
            className="w-full h-80 p-4 bg-[#0E0F14] text-gray-100 font-mono text-xs leading-relaxed resize-y focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
