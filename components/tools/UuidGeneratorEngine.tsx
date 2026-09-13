'use client';

import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Sliders, 
  FileText,
  Sparkles
} from 'lucide-react';

function generateSingleUuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback RFC 4122 compliant CSPRNG v4 generator
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  buf[6] = (buf[6] & 0x0f) | 0x40; // Version 4
  buf[8] = (buf[8] & 0x3f) | 0x80; // Variant 10xx

  const hex: string[] = [];
  for (let i = 0; i < 16; i++) {
    hex.push(buf[i].toString(16).padStart(2, '0'));
  }

  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
}

export function UuidGeneratorEngine() {
  const [quantity, setQuantity] = useState<number>(5);
  const [useHyphens, setUseHyphens] = useState<boolean>(true);
  const [useUppercase, setUseUppercase] = useState<boolean>(false);
  const [useBraces, setUseBraces] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const formatUuid = (raw: string, hyphens: boolean, upper: boolean, braces: boolean): string => {
    let res = hyphens ? raw : raw.replace(/-/g, '');
    res = upper ? res.toUpperCase() : res.toLowerCase();
    if (braces) res = `{${res}}`;
    return res;
  };

  const handleGenerate = (count = quantity) => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generateSingleUuid());
    }
    setUuids(list);
  };

  useEffect(() => {
    handleGenerate(5);
  }, []);

  const formattedUuids = uuids.map((u) => formatUuid(u, useHyphens, useUppercase, useBraces));

  const copyAll = () => {
    navigator.clipboard.writeText(formattedUuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copySingle = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const downloadAsTxt = () => {
    const blob = new Blob([formattedUuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsJson = () => {
    const blob = new Blob([JSON.stringify(formattedUuids, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Configuration Controls Studio */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#E6570B]/10 text-[#E6570B]">
              <Fingerprint className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100">UUID / GUID Generator (Version 4)</h2>
              <p className="text-xs text-zinc-400">Cryptographically secure, RFC 4122 compliant unique identifiers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGenerate(quantity)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#E6570B] hover:bg-[#d04e0a] text-white flex items-center gap-2 shadow-lg shadow-[#E6570B]/20 transition-all active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Generate New
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-800">
          {/* Quantity */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Quantity (1 to 100)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => {
                const count = Math.min(100, Math.max(1, parseInt(e.target.value) || 1));
                setQuantity(count);
                handleGenerate(count);
              }}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono font-medium text-zinc-200 focus:outline-none focus:border-[#E6570B]"
            />
          </div>

          {/* Hyphens */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={useHyphens}
                onChange={(e) => setUseHyphens(e.target.checked)}
                className="w-4 h-4 rounded text-[#E6570B] focus:ring-[#E6570B] bg-zinc-950 border-zinc-700"
              />
              <span className="text-xs text-zinc-300 font-medium">Standard Hyphens</span>
            </label>
          </div>

          {/* Uppercase */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={(e) => setUseUppercase(e.target.checked)}
                className="w-4 h-4 rounded text-[#E6570B] focus:ring-[#E6570B] bg-zinc-950 border-zinc-700"
              />
              <span className="text-xs text-zinc-300 font-medium">UPPERCASE (GUID)</span>
            </label>
          </div>

          {/* Braces */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={useBraces}
                onChange={(e) => setUseBraces(e.target.checked)}
                className="w-4 h-4 rounded text-[#E6570B] focus:ring-[#E6570B] bg-zinc-950 border-zinc-700"
              />
              <span className="text-xs text-zinc-300 font-medium">Enclose in Braces &#123;&#125;</span>
            </label>
          </div>
        </div>
      </div>

      {/* UUIDs Display List */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Generated UUIDs ({formattedUuids.length})
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={copyAll}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedAll ? 'All Copied' : 'Copy All'}
            </button>
            <button
              onClick={downloadAsTxt}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              .TXT
            </button>
            <button
              onClick={downloadAsJson}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              .JSON
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {formattedUuids.map((uuid, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 flex items-center justify-between gap-3 group transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[11px] font-mono text-zinc-600 w-6 text-right shrink-0">
                  {idx + 1}.
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-100 select-all truncate group-hover:text-[#E6570B] transition-colors">
                  {uuid}
                </span>
              </div>

              <button
                onClick={() => copySingle(uuid, idx)}
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 shrink-0 transition-colors"
                title="Copy UUID"
              >
                {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UuidGeneratorEngine;
