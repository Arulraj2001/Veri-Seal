'use client';

import * as React from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sliders,
  Code,
  List,
} from 'lucide-react';

type GenType = 'paragraphs' | 'sentences' | 'words' | 'lists';

const LATIN_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
  'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum', 'curabitur', 'pretium', 'tincidunt', 'lacus', 'nulla',
  'gravida', 'orci', 'a', 'odio', 'nullam', 'varius', 'turpis', 'et', 'commodo', 'pharetra',
  'est', 'eros', 'bibendum', 'elit', 'nec', 'luctus', 'magna', 'felis', 'sollicitudin', 'mauris'
];

export function LoremIpsumEngine() {
  const [type, setType] = React.useState<GenType>('paragraphs');
  const [count, setCount] = React.useState<number>(3);
  const [startWithLorem, setStartWithLorem] = React.useState(true);
  const [htmlTags, setHtmlTags] = React.useState(false);
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generateLorem = React.useCallback(() => {
    const getRandomWord = () => LATIN_WORDS[Math.floor(Math.random() * LATIN_WORDS.length)];

    const generateSentence = (minWords = 8, maxWords = 16) => {
      const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
      const words: string[] = [];
      for (let i = 0; i < len; i++) {
        words.push(getRandomWord());
      }
      const sentence = words.join(' ');
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    };

    const generateParagraph = (minSentences = 4, maxSentences = 7) => {
      const len = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
      const sentences: string[] = [];
      for (let i = 0; i < len; i++) {
        sentences.push(generateSentence());
      }
      return sentences.join(' ');
    };

    let result = '';

    if (type === 'paragraphs') {
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        let p = generateParagraph();
        if (i === 0 && startWithLorem) {
          p = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' + p;
        }
        paras.push(htmlTags ? `<p>${p}</p>` : p);
      }
      result = paras.join('\n\n');
    } else if (type === 'sentences') {
      const sents: string[] = [];
      for (let i = 0; i < count; i++) {
        let s = generateSentence();
        if (i === 0 && startWithLorem) {
          s = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        }
        sents.push(htmlTags ? `<p>${s}</p>` : s);
      }
      result = sents.join(' ');
    } else if (type === 'words') {
      const words: string[] = [];
      if (startWithLorem && count >= 5) {
        words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
        for (let i = 5; i < count; i++) {
          words.push(getRandomWord());
        }
      } else {
        for (let i = 0; i < count; i++) {
          words.push(getRandomWord());
        }
      }
      result = words.join(' ');
    } else if (type === 'lists') {
      const items: string[] = [];
      for (let i = 0; i < count; i++) {
        const itemText = generateSentence(4, 9).replace(/\.$/, '');
        items.push(htmlTags ? `  <li>${itemText}</li>` : `• ${itemText}`);
      }
      result = htmlTags ? `<ul>\n${items.join('\n')}\n</ul>` : items.join('\n');
    }

    setOutput(result);
  }, [type, count, startWithLorem, htmlTags]);

  React.useEffect(() => {
    generateLorem();
  }, [generateLorem]);

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
    a.download = 'lorem-ipsum.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;

  return (
    <div className="w-full space-y-6">
      {/* Configuration Toolbar */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#262833] pb-4">
          {/* Generation Type Tabs */}
          <div className="flex items-center gap-1 bg-[#1A1C24] p-1 rounded-xl border border-[#2E313D]">
            {(['paragraphs', 'sentences', 'words', 'lists'] as GenType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  type === t ? 'bg-[#E6570B] text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#E6570B]/20 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl transition-colors"
              title="Download text file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={generateLorem}
              className="p-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl transition-colors"
              title="Regenerate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sliders & Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Quantity Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-gray-400 font-medium">
              <span className="capitalize">Quantity of {type}</span>
              <span className="font-mono text-[#E6570B] font-bold text-sm">{count}</span>
            </div>
            <input
              type="range"
              min={1}
              max={type === 'words' ? 250 : 25}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-full accent-[#E6570B] cursor-pointer"
            />
          </div>

          {/* Start with Lorem Toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-4 py-3 select-none text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Start with "Lorem ipsum..."</span>
          </label>

          {/* HTML Tags Toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-4 py-3 select-none text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={htmlTags}
              onChange={(e) => setHtmlTags(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>Wrap with HTML tags ({'<p>'}, {'<li>'})</span>
          </label>
        </div>
      </div>

      {/* Generated Output Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-3 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#E6570B]" />
            <span className="font-mono text-gray-200">Generated Dummy Text</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>{wordCount} Words</span>
            <span>&bull;</span>
            <span>{charCount} Characters</span>
          </div>
        </div>

        <textarea
          value={output}
          readOnly
          className="w-full h-80 p-5 bg-[#0E0F14] text-gray-200 font-serif sm:font-sans text-sm sm:text-base leading-relaxed resize-y focus:outline-none"
        />
      </div>
    </div>
  );
}
