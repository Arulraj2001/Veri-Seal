'use client';

import * as React from 'react';
import {
  Code2,
  Copy,
  Check,
  ArrowUpDown,
  Trash2,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface HtmlEntityEngineProps {
  initialMode?: 'encode' | 'decode';
}

const NAMED_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '¢': '&cent;',
  '£': '&pound;',
  '¥': '&yen;',
  '€': '&euro;',
  '©': '&copy;',
  '®': '&reg;',
};

const REVERSE_NAMED: Record<string, string> = Object.entries(NAMED_ENTITIES).reduce(
  (acc, [char, entity]) => {
    acc[entity] = char;
    return acc;
  },
  {} as Record<string, string>
);

export function HtmlEntityEngine({ initialMode = 'encode' }: HtmlEntityEngineProps) {
  const [mode, setMode] = React.useState<'encode' | 'decode'>(initialMode);
  const [input, setInput] = React.useState('<script>alert("Kagazo Sovereign Security");</script> & "special" characters © 2026');
  const [output, setOutput] = React.useState('');
  const [format, setFormat] = React.useState<'named' | 'decimal' | 'hex'>('named');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    if (mode === 'encode') {
      if (format === 'named') {
        const encoded = input.replace(/[&<>"'¢£¥€©®]/g, (ch) => NAMED_ENTITIES[ch] || ch);
        setOutput(encoded);
      } else if (format === 'decimal') {
        const encoded = input
          .split('')
          .map((ch) => (ch.charCodeAt(0) > 127 || /[&<>"']/.test(ch) ? `&#${ch.charCodeAt(0)};` : ch))
          .join('');
        setOutput(encoded);
      } else {
        const encoded = input
          .split('')
          .map((ch) =>
            ch.charCodeAt(0) > 127 || /[&<>"']/.test(ch)
              ? `&#x${ch.charCodeAt(0).toString(16).toUpperCase()};`
              : ch
          )
          .join('');
        setOutput(encoded);
      }
    } else {
      // Decode
      let decoded = input;
      // Named
      decoded = decoded
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&cent;/g, '¢')
        .replace(/&pound;/g, '£')
        .replace(/&yen;/g, '¥')
        .replace(/&euro;/g, '€')
        .replace(/&copy;/g, '©')
        .replace(/&reg;/g, '®');

      // Decimal
      decoded = decoded.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
      // Hex
      decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      );

      setOutput(decoded);
    }
  }, [input, mode, format]);

  const handleSwap = () => {
    if (!output) return;
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Action Toolbar */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1 bg-[#1A1C24] p-1 rounded-xl border border-[#2E313D]">
            <button
              onClick={() => setMode('encode')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'encode' ? 'bg-[#E6570B] text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Encode Entities
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'decode' ? 'bg-[#E6570B] text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Decode Entities
            </button>
          </div>

          {mode === 'encode' && (
            <div className="flex items-center gap-1 bg-[#1A1C24] border border-[#2E313D] rounded-xl p-1 text-xs">
              <button
                onClick={() => setFormat('named')}
                className={`px-2.5 py-0.5 rounded-lg font-medium transition-colors ${
                  format === 'named' ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Named (&amp;lt;)
              </button>
              <button
                onClick={() => setFormat('decimal')}
                className={`px-2.5 py-0.5 rounded-lg font-medium transition-colors ${
                  format === 'decimal' ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Decimal (&#60;)
              </button>
              <button
                onClick={() => setFormat('hex')}
                className={`px-2.5 py-0.5 rounded-lg font-medium transition-colors ${
                  format === 'hex' ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Hex (&#x3C;)
              </button>
            </div>
          )}

          <button
            onClick={handleSwap}
            disabled={!output}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl text-xs transition-colors disabled:opacity-40"
            title="Swap input and output"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Swap</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#E6570B]/20 transition-all disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={() => setInput('')}
            className="p-2 bg-[#1A1C24] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#2E313D] rounded-xl transition-colors"
            title="Clear"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dual Side-by-Side Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-gray-300">
              {mode === 'encode' ? 'Raw HTML / Text' : 'Encoded Entities String'}
            </span>
            <span className="text-gray-500">{input.length} Chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste HTML markup..."
            spellCheck={false}
            className="w-full h-64 p-4 bg-[#0E0F14] text-gray-200 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
          />
        </div>

        {/* Output */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[#E6570B]">
              {mode === 'encode' ? 'Escaped HTML Entities' : 'Decoded HTML String'}
            </span>
            <span className="text-gray-500">{output.length} Chars</span>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            spellCheck={false}
            className="w-full h-64 p-4 bg-[#0E0F14] text-gray-100 font-mono text-xs leading-relaxed resize-y focus:outline-none"
          />
        </div>
      </div>

      {/* XSS Sanitization Showcase */}
      {mode === 'encode' && output && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>XSS Safe HTML Rendering Simulation</span>
          </div>
          <p className="text-[11px] text-gray-400">
            Because special characters like &lt; and &gt; are converted into safe HTML entities, browsers render this snippet as harmless text rather than executing malicious scripts:
          </p>
          <div className="p-3 bg-[#0E0F14] border border-[#262833] rounded-xl text-xs font-mono text-gray-300">
            {input}
          </div>
        </div>
      )}
    </div>
  );
}
