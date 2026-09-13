'use client';

import * as React from 'react';
import {
  Type,
  Copy,
  Check,
  Trash2,
  Sparkles,
} from 'lucide-react';

const SAMPLE_TEXT = 'the quick BROWN fox jumps over the lazy dog! build sovereign high-performance web applications.';

export function CaseConverterEngine() {
  const [text, setText] = React.useState(SAMPLE_TEXT);
  const [copied, setCopied] = React.useState(false);

  const applyCase = (caseType: string) => {
    if (!text.trim()) return;

    let res = text;
    switch (caseType) {
      case 'upper':
        res = text.toUpperCase();
        break;
      case 'lower':
        res = text.toLowerCase();
        break;
      case 'title':
        res = text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        );
        break;
      case 'sentence':
        res = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'camel':
        res = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, (c) => c.toLowerCase());
        break;
      case 'pascal':
        res = text
          .toLowerCase()
          .replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case 'snake':
        res = text
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '');
        break;
      case 'constant':
        res = text
          .trim()
          .toUpperCase()
          .replace(/[^a-zA-Z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '');
        break;
      case 'kebab':
        res = text
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        break;
      case 'alternating':
        res = text
          .split('')
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join('');
        break;
      default:
        break;
    }
    setText(res);
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
      {/* Transformation Action Pills */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#262833] pb-3">
          <span className="text-xs font-semibold text-gray-300">Case Transformations:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#E6570B]/20 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={() => setText('')}
              className="p-1.5 bg-[#1A1C24] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#2E313D] rounded-xl transition-colors"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          <button
            onClick={() => applyCase('upper')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-bold transition-all text-center"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => applyCase('lower')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            lowercase
          </button>
          <button
            onClick={() => applyCase('title')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            Title Case
          </button>
          <button
            onClick={() => applyCase('sentence')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            Sentence case
          </button>
          <button
            onClick={() => applyCase('camel')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            camelCase
          </button>
          <button
            onClick={() => applyCase('pascal')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            PascalCase
          </button>
          <button
            onClick={() => applyCase('snake')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            snake_case
          </button>
          <button
            onClick={() => applyCase('constant')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            CONSTANT_CASE
          </button>
          <button
            onClick={() => applyCase('kebab')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            kebab-case
          </button>
          <button
            onClick={() => applyCase('alternating')}
            className="p-2.5 rounded-xl bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] hover:border-[#E6570B] text-white font-medium transition-all text-center"
          >
            aLtErNaTiNg
          </button>
        </div>
      </div>

      {/* Text Area Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-3 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
          <span className="font-mono text-gray-300">Text Workspace</span>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>{wordCount} Words</span>
            <span>&bull;</span>
            <span>{charCount} Characters</span>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to convert case..."
          className="w-full h-72 p-5 bg-[#0E0F14] text-gray-100 font-mono text-sm leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
        />
      </div>
    </div>
  );
}
