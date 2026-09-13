'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Copy, 
  Check, 
  FileCode, 
  Upload, 
  X, 
  KeyRound, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

// Pure JavaScript RFC 1321 compliant MD5 implementation for client-side execution
function md5(string: string | Uint8Array): string {
  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }

  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }

  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }

  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function add32(a: number, b: number) {
    return (a + b) & 0xffffffff;
  }

  const bytes: number[] = typeof string === 'string'
    ? Array.from(new TextEncoder().encode(string))
    : Array.from(string);

  const n = bytes.length;
  const state = [1732584193, -271733879, -1732584194, 271733878];
  let i: number;
  for (i = 64; i <= n; i += 64) {
    const chunk: number[] = [];
    for (let j = 0; j < 16; j++) {
      const idx = i - 64 + j * 4;
      chunk[j] = bytes[idx] | (bytes[idx + 1] << 8) | (bytes[idx + 2] << 16) | (bytes[idx + 3] << 24);
    }
    md5cycle(state, chunk);
  }

  const tail = bytes.slice(i - 64);
  const tailChunk: number[] = new Array(16).fill(0);
  for (let j = 0; j < tail.length; j++) {
    tailChunk[Math.floor(j / 4)] |= tail[j] << ((j % 4) * 8);
  }
  tailChunk[Math.floor(tail.length / 4)] |= 0x80 << ((tail.length % 4) * 8);

  if (tail.length > 55) {
    md5cycle(state, tailChunk);
    tailChunk.fill(0);
  }

  tailChunk[14] = n * 8;
  tailChunk[15] = Math.floor((n * 8) / 0x100000000);
  md5cycle(state, tailChunk);

  let hex = '';
  for (let j = 0; j < 4; j++) {
    for (let k = 0; k < 4; k++) {
      const b = (state[j] >>> (k * 8)) & 0xff;
      hex += b.toString(16).padStart(2, '0');
    }
  }
  return hex;
}

interface HashOutputs {
  sha256: string;
  sha512: string;
  sha384: string;
  sha1: string;
  md5: string;
}

export function HashGeneratorEngine() {
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [textInput, setTextInput] = useState<string>('Hello Kagazo');
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const [hashes, setHashes] = useState<HashOutputs>({
    sha256: '',
    sha512: '',
    sha384: '',
    sha1: '',
    md5: ''
  });
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [casing, setCasing] = useState<'lower' | 'upper'>('lower');
  const [compareHash, setCompareHash] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute hashes from byte buffer
  const computeAllHashes = async (bytes: Uint8Array) => {
    setIsComputing(true);
    try {
      // Web Crypto API for SHA family
      const bufSource = bytes as unknown as BufferSource;
      const [sha256Buf, sha512Buf, sha384Buf, sha1Buf] = await Promise.all([
        crypto.subtle.digest('SHA-256', bufSource),
        crypto.subtle.digest('SHA-512', bufSource),
        crypto.subtle.digest('SHA-384', bufSource),
        crypto.subtle.digest('SHA-1', bufSource),
      ]);

      const bufToHex = (buf: ArrayBuffer) =>
        Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

      const md5Hex = md5(bytes);

      setHashes({
        sha256: bufToHex(sha256Buf),
        sha512: bufToHex(sha512Buf),
        sha384: bufToHex(sha384Buf),
        sha1: bufToHex(sha1Buf),
        md5: md5Hex,
      });
    } catch (e) {
      console.error('Hash computation error', e);
    } finally {
      setIsComputing(false);
    }
  };

  // Live text update
  useEffect(() => {
    if (inputMode === 'text') {
      const bytes = new TextEncoder().encode(textInput);
      computeAllHashes(bytes);
    }
  }, [textInput, inputMode]);

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileInfo({ name: file.name, size: file.size });
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result instanceof ArrayBuffer) {
        const bytes = new Uint8Array(ev.target.result);
        computeAllHashes(bytes);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const copyToClipboard = (text: string, key: string) => {
    const output = casing === 'upper' ? text.toUpperCase() : text.toLowerCase();
    navigator.clipboard.writeText(output);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Check if compareHash matches any generated hash
  const matchResult = compareHash.trim()
    ? Object.entries(hashes).find(
        ([, val]) => val.toLowerCase() === compareHash.trim().toLowerCase()
      )
    : null;

  const displayVal = (raw: string) => (casing === 'upper' ? raw.toUpperCase() : raw.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Studio Header / Mode Selector */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Mode Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-950 border border-zinc-800">
            <button
              onClick={() => setInputMode('text')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                inputMode === 'text'
                  ? 'bg-[#E6570B] text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              Text String
            </button>
            <button
              onClick={() => setInputMode('file')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                inputMode === 'file'
                  ? 'bg-[#E6570B] text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              File Checksum
            </button>
          </div>

          {/* Casing Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Format:</span>
            <button
              onClick={() => setCasing('lower')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                casing === 'lower'
                  ? 'bg-[#E6570B] text-white font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              lowercase
            </button>
            <button
              onClick={() => setCasing('upper')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                casing === 'upper'
                  ? 'bg-[#E6570B] text-white font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              UPPERCASE
            </button>
          </div>
        </div>

        {/* Input Area */}
        {inputMode === 'text' ? (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Enter String to Hash
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type or paste any text..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-[#E6570B] resize-none"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Upload File for Integrity Checksum
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 hover:border-[#E6570B]/60 bg-zinc-950/60 p-8 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors text-center group"
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-zinc-500 group-hover:text-[#E6570B] mb-2 transition-colors" />
              <p className="text-sm font-semibold text-zinc-200">
                Click or drag file here to compute cryptographic hash
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Zero uploads — entire calculation executes locally in your browser memory
              </p>
            </div>

            {fileInfo && (
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-zinc-200">{fileInfo.name}</span>
                  <span className="text-zinc-500 font-mono">
                    ({(fileInfo.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFileInfo(null);
                    setHashes({ sha256: '', sha512: '', sha384: '', sha1: '', md5: '' });
                  }}
                  className="text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Generated Hashes List */}
      <div className="space-y-3">
        {[
          { key: 'sha256', label: 'SHA-256 (Most Common)', desc: '256-bit cryptographic standard (Bitcoin, TLS, Linux packages)' },
          { key: 'md5', label: 'MD5', desc: '128-bit legacy checksum used for basic file integrity checks' },
          { key: 'sha512', label: 'SHA-512', desc: '512-bit military grade cryptographic hashing algorithm' },
          { key: 'sha384', label: 'SHA-384', desc: '384-bit NSA Suite B standard hash' },
          { key: 'sha1', label: 'SHA-1', desc: '160-bit legacy digest (Git commits, legacy certificates)' },
        ].map((algo) => {
          const rawHash = hashes[algo.key as keyof HashOutputs];
          const val = displayVal(rawHash);
          const isCopied = copiedKey === algo.key;

          return (
            <div
              key={algo.key}
              className="p-4 sm:p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="text-xs font-bold text-zinc-200">{algo.label}</span>
                  <span className="text-[11px] text-zinc-500 sm:ml-2 block sm:inline">{algo.desc}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(rawHash, algo.key)}
                  disabled={!rawHash || isComputing}
                  className="self-end sm:self-auto px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-[#E6570B] text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-[#E6570B] break-all select-all">
                {isComputing ? (
                  <span className="text-zinc-600 animate-pulse">Computing hash...</span>
                ) : (
                  val || <span className="text-zinc-700">Enter input above...</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Checksum Verifier & Matcher */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#E6570B]/10 text-[#E6570B]">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Verify & Match Checksum</h3>
            <p className="text-xs text-zinc-400">
              Paste an expected hash from a software provider to verify genuine integrity
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={compareHash}
            onChange={(e) => setCompareHash(e.target.value)}
            placeholder="Paste expected SHA256 / MD5 hash to test..."
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-[#E6570B]"
          />
          {compareHash && (
            <button
              onClick={() => setCompareHash('')}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs rounded-xl"
            >
              Clear
            </button>
          )}
        </div>

        {compareHash.trim() && (
          <div>
            {matchResult ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-3 text-xs text-emerald-300">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block font-semibold">100% Exact Match Verified!</strong>
                  Your input matches the computed <span className="uppercase font-mono font-bold">{matchResult[0]}</span> hash. File is authentic and untampered.
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-center gap-3 text-xs text-rose-300">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <strong className="block font-semibold">No Hash Match Found</strong>
                  The pasted checksum does not match any of the generated SHA-256, SHA-512, or MD5 signatures.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HashGeneratorEngine;
