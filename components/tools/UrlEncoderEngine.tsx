'use client';

import * as React from 'react';
import {
  Link2,
  Copy,
  Check,
  ArrowUpDown,
  Trash2,
  Table,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface UrlEncoderEngineProps {
  initialMode?: 'encode' | 'decode';
}

export function UrlEncoderEngine({ initialMode = 'encode' }: UrlEncoderEngineProps) {
  const [mode, setMode] = React.useState<'encode' | 'decode'>(initialMode);
  const [input, setInput] = React.useState('https://example.com/search?q=veriseal developer tools &category=web 3.0&ref=product hunt');
  const [output, setOutput] = React.useState('');
  const [encodeType, setEncodeType] = React.useState<'component' | 'uri'>('component');
  const [copied, setCopied] = React.useState(false);
  const [queryParams, setQueryParams] = React.useState<Array<{ key: string; value: string }>>([]);

  React.useEffect(() => {
    if (!input) {
      setOutput('');
      setQueryParams([]);
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded =
          encodeType === 'component'
            ? encodeURIComponent(input)
            : encodeURI(input);
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(input);
        setOutput(decoded);
      }
    } catch {
      setOutput(input);
    }

    // Try parsing URL query parameters for tabular breakdown
    try {
      let testUrl = input;
      if (!/^https?:\/\//i.test(testUrl)) {
        testUrl = 'http://dummy.domain/' + testUrl;
      }
      const parsedUrl = new URL(testUrl);
      const paramsList: Array<{ key: string; value: string }> = [];
      parsedUrl.searchParams.forEach((val, key) => {
        paramsList.push({ key, value: val });
      });
      setQueryParams(paramsList);
    } catch {
      setQueryParams([]);
    }
  }, [input, mode, encodeType]);

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
      {/* Controls & Action Toolbar */}
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
              URL Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'decode' ? 'bg-[#E6570B] text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              URL Decode
            </button>
          </div>

          {mode === 'encode' && (
            <div className="flex items-center gap-1 bg-[#1A1C24] border border-[#2E313D] rounded-xl p-1 text-xs">
              <button
                onClick={() => setEncodeType('component')}
                className={`px-2.5 py-0.5 rounded-lg font-medium transition-colors ${
                  encodeType === 'component' ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Encodes all characters including /, ?, &, :, ="
              >
                encodeURIComponent
              </button>
              <button
                onClick={() => setEncodeType('uri')}
                className={`px-2.5 py-0.5 rounded-lg font-medium transition-colors ${
                  encodeType === 'uri' ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Preserves URL protocol, domain, and path slashes"
              >
                encodeURI
              </button>
            </div>
          )}

          {/* Swap Button */}
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
              {mode === 'encode' ? 'Raw URL or String' : 'Encoded URL (%20...)'}
            </span>
            <span className="text-gray-500">{input.length} Chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Paste URL or query parameter string to percent-encode...'
                : 'Paste percent-encoded URL (e.g. %20 or %2F) to decode...'
            }
            spellCheck={false}
            className="w-full h-64 p-4 bg-[#0E0F14] text-gray-200 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
          />
        </div>

        {/* Output */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[#E6570B]">
              {mode === 'encode' ? 'Percent-Encoded Output' : 'Decoded URL String'}
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

      {/* Query String Parameter Breakdown Table */}
      {queryParams.length > 0 && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3.5 border-b border-[#262833] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-[#E6570B]" />
              <h4 className="text-xs font-semibold text-white">Parsed Query Parameters ({queryParams.length})</h4>
            </div>
            <span className="text-[11px] text-gray-400">Extracted from search string</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#262833] text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-[#161822]">
                  <th className="py-2.5 px-4">Parameter Key</th>
                  <th className="py-2.5 px-4">Decoded Value</th>
                  <th className="py-2.5 px-4">Percent-Encoded Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262833]">
                {queryParams.map((param, i) => (
                  <tr key={i} className="hover:bg-[#181A24] transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-[#E6570B]">{param.key}</td>
                    <td className="py-2.5 px-4 font-mono text-gray-200">{param.value}</td>
                    <td className="py-2.5 px-4 font-mono text-cyan-400">{encodeURIComponent(param.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
