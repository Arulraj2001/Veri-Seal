'use client';

import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Copy, 
  Check, 
  RotateCcw, 
  Coins, 
  Sparkles,
  IndianRupee,
  DollarSign
} from 'lucide-react';

const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

// Helper to convert 1..999 to English words
function convertThreeDigits(num: number): string {
  let str = '';
  if (num >= 100) {
    str += ONES[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  if (num >= 20) {
    str += TENS[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + ONES[num % 10] : '');
  } else if (num > 0) {
    str += ONES[num];
  }
  return str.trim();
}

// International System: Millions, Billions, Trillions
function convertInternational(num: number): string {
  if (num === 0) return 'Zero';
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion'];
  let words: string[] = [];
  let scaleIdx = 0;

  while (num > 0 && scaleIdx < scales.length) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      const chunkStr = convertThreeDigits(chunk);
      const scaleStr = scales[scaleIdx] ? ' ' + scales[scaleIdx] : '';
      words.unshift(chunkStr + scaleStr);
    }
    num = Math.floor(num / 1000);
    scaleIdx++;
  }

  return words.join(' ').trim();
}

// Indian Numbering System: Thousands, Lakhs, Crores, Arabs
function convertIndian(num: number): string {
  if (num === 0) return 'Zero';

  let words: string[] = [];

  // Hundred and below (last 3 digits)
  const lastThree = num % 1000;
  if (lastThree !== 0) {
    words.unshift(convertThreeDigits(lastThree));
  }
  num = Math.floor(num / 1000);

  // Thousands (2 digits)
  const thousands = num % 100;
  if (thousands !== 0) {
    words.unshift(convertThreeDigits(thousands) + ' Thousand');
  }
  num = Math.floor(num / 100);

  // Lakhs (2 digits)
  const lakhs = num % 100;
  if (lakhs !== 0) {
    words.unshift(convertThreeDigits(lakhs) + ' Lakh');
  }
  num = Math.floor(num / 100);

  // Crores (2 digits or more)
  const crores = num % 100;
  if (crores !== 0) {
    words.unshift(convertThreeDigits(crores) + ' Crore');
  }
  num = Math.floor(num / 100);

  // Arabs (2 digits or more)
  if (num > 0) {
    words.unshift(convertThreeDigits(num) + ' Arab');
  }

  return words.join(' ').trim();
}

type SystemScale = 'indian' | 'international';
type CurrencyType = 'none' | 'inr' | 'usd' | 'eur' | 'gbp';
type CasingType = 'title' | 'upper' | 'lower' | 'sentence';

export function NumberToWordsEngine() {
  const [inputNumber, setInputNumber] = useState<string>('250000');
  const [scale, setScale] = useState<SystemScale>('indian');
  const [currency, setCurrency] = useState<CurrencyType>('inr');
  const [casing, setCasing] = useState<CasingType>('title');
  const [includeOnly, setIncludeOnly] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const resultWords = useMemo(() => {
    const clean = inputNumber.trim().replace(/,/g, '');
    if (!clean) return '';

    const parts = clean.split('.');
    const integerPartStr = parts[0];
    const decimalPartStr = parts.length > 1 ? parts[1].slice(0, 2) : null;

    const intNum = parseInt(integerPartStr, 10);
    if (isNaN(intNum)) return 'Invalid number';

    // Negative numbers
    const isNegative = intNum < 0;
    const absInt = Math.abs(intNum);

    const baseWords = scale === 'indian' ? convertIndian(absInt) : convertInternational(absInt);

    let finalWords = isNegative ? 'Negative ' + baseWords : baseWords;

    // Decimals
    let decimalWords = '';
    if (decimalPartStr && parseInt(decimalPartStr, 10) > 0) {
      const decNum = parseInt(decimalPartStr.padEnd(2, '0'), 10);
      decimalWords = scale === 'indian' ? convertIndian(decNum) : convertInternational(decNum);
    }

    // Currency wrapping
    if (currency === 'inr') {
      if (decimalWords) {
        finalWords = `Rupees ${finalWords} and ${decimalWords} Paise`;
      } else {
        finalWords = `Rupees ${finalWords}`;
      }
    } else if (currency === 'usd') {
      if (decimalWords) {
        finalWords = `${finalWords} Dollars and ${decimalWords} Cents`;
      } else {
        finalWords = `${finalWords} Dollars`;
      }
    } else if (currency === 'eur') {
      if (decimalWords) {
        finalWords = `${finalWords} Euros and ${decimalWords} Cents`;
      } else {
        finalWords = `${finalWords} Euros`;
      }
    } else if (currency === 'gbp') {
      if (decimalWords) {
        finalWords = `${finalWords} Pounds and ${decimalWords} Pence`;
      } else {
        finalWords = `${finalWords} Pounds`;
      }
    } else {
      if (decimalWords) {
        finalWords = `${finalWords} point ${decimalWords}`;
      }
    }

    if (includeOnly && currency !== 'none') {
      finalWords += ' Only';
    }

    // Apply casing
    switch (casing) {
      case 'upper':
        return finalWords.toUpperCase();
      case 'lower':
        return finalWords.toLowerCase();
      case 'sentence':
        return finalWords.charAt(0).toUpperCase() + finalWords.slice(1).toLowerCase();
      case 'title':
      default:
        return finalWords;
    }
  }, [inputNumber, scale, currency, casing, includeOnly]);

  const copyToClipboard = () => {
    if (!resultWords) return;
    navigator.clipboard.writeText(resultWords);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: '₹10,000', val: '10000' },
    { label: '₹50,000', val: '50000' },
    { label: '₹2.5 Lakh', val: '250000' },
    { label: '₹10 Lakh', val: '1000000' },
    { label: '₹1 Crore', val: '10000000' },
    { label: '₹12,450.50', val: '12450.50' },
  ];

  return (
    <div className="space-y-8">
      {/* Input & Settings Studio */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Enter Amount or Number
            </label>
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-zinc-500 mr-1">Presets:</span>
              {presets.map((p) => (
                <button
                  key={p.val}
                  onClick={() => setInputNumber(p.val)}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            placeholder="e.g. 250000 or 1599.99"
            className="w-full px-5 py-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-2xl sm:text-3xl font-bold text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-[#E6570B]"
          />
        </div>

        {/* Configuration Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-zinc-800">
          {/* Numbering Scale */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Numbering Scale</label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value as SystemScale)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-200 focus:outline-none focus:border-[#E6570B]"
            >
              <option value="indian">Indian (Lakhs & Crores)</option>
              <option value="international">International (Millions & Billions)</option>
            </select>
          </div>

          {/* Currency Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Currency Mode</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyType)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-200 focus:outline-none focus:border-[#E6570B]"
            >
              <option value="inr">INR (Rupees & Paise)</option>
              <option value="usd">USD (Dollars & Cents)</option>
              <option value="eur">EUR (Euros & Cents)</option>
              <option value="gbp">GBP (Pounds & Pence)</option>
              <option value="none">Plain Number (No Currency)</option>
            </select>
          </div>

          {/* Casing Style */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Text Casing</label>
            <select
              value={casing}
              onChange={(e) => setCasing(e.target.value as CasingType)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-200 focus:outline-none focus:border-[#E6570B]"
            >
              <option value="title">Title Case (e.g. Two Lakh)</option>
              <option value="upper">UPPERCASE (CHEQUE STYLE)</option>
              <option value="sentence">Sentence case</option>
              <option value="lower">lowercase</option>
            </select>
          </div>

          {/* Cheque 'Only' suffix toggle */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={includeOnly}
                onChange={(e) => setIncludeOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#E6570B] focus:ring-[#E6570B] bg-zinc-950 border-zinc-700"
              />
              <span className="text-xs text-zinc-300 font-medium">Add &quot;Only&quot; (Cheque writing)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Generated Result Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#E6570B]/10 text-[#E6570B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Words in English
            </span>
          </div>

          <button
            onClick={copyToClipboard}
            disabled={!resultWords}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#E6570B] hover:bg-[#d04e0a] text-white flex items-center gap-1.5 shadow-lg shadow-[#E6570B]/20 transition-all disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Words'}
          </button>
        </div>

        <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 min-h-[100px] flex items-center">
          <p className="font-sans text-xl sm:text-2xl font-bold text-zinc-100 leading-relaxed select-all">
            {resultWords || <span className="text-zinc-600 font-normal text-base">Enter a number above to see words...</span>}
          </p>
        </div>

        {/* Banking / Formal Cheque Advice Banner */}
        <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-xs text-zinc-400 flex items-start gap-3">
          <FileSpreadsheet className="w-4 h-4 text-[#E6570B] shrink-0 mt-0.5" />
          <div>
            <strong className="text-zinc-200">Legal Cheque Writing & Invoice Tip:</strong> Always start the words line on a bank cheque without leaving leading blank space, and append &quot;Only&quot; at the end to prevent unauthorized alterations.
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberToWordsEngine;
