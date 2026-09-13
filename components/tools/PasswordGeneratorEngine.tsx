'use client';

import * as React from 'react';
import {
  KeyRound,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Lock,
  Sliders,
  Sparkles,
} from 'lucide-react';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = 'l1IO0';

export function PasswordGeneratorEngine() {
  const [length, setLength] = React.useState<number>(16);
  const [useUpper, setUseUpper] = React.useState<boolean>(true);
  const [useLower, setUseLower] = React.useState<boolean>(true);
  const [useNumbers, setUseNumbers] = React.useState<boolean>(true);
  const [useSymbols, setUseSymbols] = React.useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = React.useState<boolean>(true);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [passwords, setPasswords] = React.useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState<boolean>(false);

  const generatePasswords = React.useCallback(() => {
    let pool = '';
    if (useUpper) pool += UPPERCASE;
    if (useLower) pool += LOWERCASE;
    if (useNumbers) pool += NUMBERS;
    if (useSymbols) pool += SYMBOLS;

    if (excludeAmbiguous) {
      pool = pool
        .split('')
        .filter((c) => !AMBIGUOUS.includes(c))
        .join('');
    }

    if (!pool) {
      setPasswords(['Please select at least one character type.']);
      return;
    }

    const list: string[] = [];
    const poolLength = pool.length;

    for (let q = 0; q < quantity; q++) {
      const randomValues = new Uint32Array(length);
      window.crypto.getRandomValues(randomValues);

      let pwd = '';
      for (let i = 0; i < length; i++) {
        pwd += pool[randomValues[i] % poolLength];
      }
      list.push(pwd);
    }

    setPasswords(list);
  }, [length, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous, quantity]);

  React.useEffect(() => {
    generatePasswords();
  }, [generatePasswords]);

  // Compute password strength & entropy for the primary password
  const strengthInfo = React.useMemo(() => {
    let poolSize = 0;
    if (useUpper) poolSize += 26;
    if (useLower) poolSize += 26;
    if (useNumbers) poolSize += 10;
    if (useSymbols) poolSize += 28;

    const entropy = Math.round(length * Math.log2(poolSize || 1));

    let score = 'Weak';
    let color = 'text-red-400 bg-red-500/10 border-red-500/30';
    let crackTime = 'A few seconds';

    if (entropy >= 80) {
      score = 'Very Strong';
      color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      crackTime = 'Trillions of Years';
    } else if (entropy >= 60) {
      score = 'Strong';
      color = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      crackTime = 'Centuries';
    } else if (entropy >= 45) {
      score = 'Fair';
      color = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      crackTime = 'A few days';
    }

    return { entropy, score, color, crackTime };
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const handleCopySingle = (pwd: string, index: number) => {
    navigator.clipboard.writeText(pwd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(passwords.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Primary Password Hero Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0E0F14] border border-[#262833] p-4 rounded-xl">
          <span className="font-mono text-lg sm:text-2xl font-bold text-white break-all tracking-wide select-all">
            {passwords[0] || 'Generating...'}
          </span>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => handleCopySingle(passwords[0], 0)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#E6570B]/25 transition-all"
            >
              {copiedIndex === 0 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedIndex === 0 ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={generatePasswords}
              className="p-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors"
              title="Regenerate password"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security Strength Badge & Entropy */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Strength:</span>
            <span className={`px-2.5 py-0.5 rounded-lg border font-bold ${strengthInfo.color}`}>
              {strengthInfo.score}
            </span>
            <span className="text-gray-500 font-mono">({strengthInfo.entropy} Bits Entropy)</span>
          </div>
          <div className="text-gray-400">
            Estimated Crack Time: <span className="text-emerald-400 font-medium">{strengthInfo.crackTime}</span>
          </div>
        </div>
      </div>

      {/* Generator Configuration Options */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 shadow-xl space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-gray-300">
            <span>Password Length</span>
            <span className="font-mono text-[#E6570B] text-sm">{length} Characters</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full accent-[#E6570B] cursor-pointer"
          />
        </div>

        {/* Character Rules Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2.5 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>A-Z (Uppercase)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2.5 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>a-z (Lowercase)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2.5 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>0-9 (Numbers)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2.5 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>!@#$ (Symbols)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-2.5 text-gray-300 select-none hover:text-white">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Avoid (l, 1, I, O, 0)</span>
          </label>
        </div>

        {/* Bulk Quantity Selector */}
        <div className="flex items-center justify-between pt-2 border-t border-[#262833] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Generate in Bulk:</span>
            {[1, 5, 10, 25].map((q) => (
              <button
                key={q}
                onClick={() => setQuantity(q)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  quantity === q ? 'bg-[#E6570B] text-white' : 'bg-[#1A1C24] text-gray-400 hover:text-white'
                }`}
              >
                {q}x
              </button>
            ))}
          </div>

          {quantity > 1 && (
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1 text-[#E6570B] hover:underline"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'All Copied' : 'Copy All'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Bulk Passwords List */}
      {quantity > 1 && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3 bg-[#161822] border-b border-[#262833] text-xs font-semibold text-white">
            Generated Passwords Batch ({passwords.length})
          </div>
          <div className="divide-y divide-[#262833]">
            {passwords.map((pwd, idx) => (
              <div
                key={idx}
                className="p-3.5 px-5 flex items-center justify-between gap-3 hover:bg-[#161822] transition-colors"
              >
                <span className="font-mono text-sm text-gray-200 truncate">{pwd}</span>
                <button
                  onClick={() => handleCopySingle(pwd, idx)}
                  className="p-1.5 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-400 hover:text-white transition-colors shrink-0"
                  title="Copy password"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
