'use client';

import * as React from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  Trash2,
  Sparkles,
  Zap,
  ArrowRight,
  FileType,
  FileCode,
} from 'lucide-react';

type MinifyLanguage = 'html' | 'css' | 'js';

interface HtmlCssJsMinifierEngineProps {
  defaultLanguage?: MinifyLanguage;
}

const SAMPLES: Record<MinifyLanguage, string> = {
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Character encoding and viewport -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>   Kagazo High Performance Web App   </title>
    <style>
      /* Embedded reset styles */
      body {
        margin: 0;
        font-family: sans-serif;
        background-color: #ffffff;
      }
    </style>
  </head>
  <body>
    <!-- Main page header -->
    <header class="hero-section">
      <h1>Welcome to VeriSeal Studio</h1>
      <p>Zero-latency private client utilities.</p>
    </header>
  </body>
</html>`,
  css: `/* Global CSS Stylesheet */
:root {
  --primary-color: #e6570b;
  --background-dark: #12141a;
  --spacing-base: 16px;
}

/* Base Body Styles */
body {
  margin: 0px 0px 0px 0px;
  padding: 0px;
  background-color: #ffffff;
  color: #333333;
  line-height: 1.5;
}

/* Card Container with Hover Animation */
.card-container {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  transition: all 0.3s ease-in-out;
}

.card-container:hover {
  transform: translateY(-4px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.08);
}`,
  js: `// Mathematical calculation utility
function calculateDiscount(originalPrice, discountPercentage) {
  /* Validate parameters before computing */
  if (typeof originalPrice !== 'number' || typeof discountPercentage !== 'number') {
    throw new Error('Invalid numeric parameters');
  }

  // Calculate savings amount
  const discountAmount = originalPrice * (discountPercentage / 100);
  const finalPrice = originalPrice - discountAmount;

  console.log("Discount computed successfully: " + finalPrice);
  return finalPrice;
}

// Example invocation
const finalTotal = calculateDiscount(250, 15);`,
};

export function HtmlCssJsMinifierEngine({ defaultLanguage = 'html' }: HtmlCssJsMinifierEngineProps) {
  const [language, setLanguage] = React.useState<MinifyLanguage>(defaultLanguage);
  const [input, setInput] = React.useState(SAMPLES[defaultLanguage]);
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  // Minification algorithm
  const minifyCode = React.useCallback((code: string, lang: MinifyLanguage): string => {
    if (!code.trim()) return '';

    if (lang === 'html') {
      let res = code;
      // Remove HTML comments
      res = res.replace(/<!--[\s\S]*?-->/g, '');
      // Collapse whitespace between tags
      res = res.replace(/>\s+</g, '><');
      // Collapse multiple whitespace into single space
      res = res.replace(/\s{2,}/g, ' ');
      return res.trim();
    }

    if (lang === 'css') {
      let res = code;
      // Strip CSS comments
      res = res.replace(/\/\*[\s\S]*?\*\//g, '');
      // Collapse whitespace around punctuation
      res = res.replace(/\s*([\{\}\:\;\,\>])\s*/g, '$1');
      // Strip trailing semicolons before closing brace
      res = res.replace(/;}/g, '}');
      // Zero units (e.g. 0px -> 0)
      res = res.replace(/(\b0)(px|em|rem|%|in|cm|mm|pt|pc)\b/g, '$1');
      // Shorthand hex colors (#ffffff -> #fff)
      res = res.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3\b/g, '#$1$2$3');
      return res.trim();
    }

    if (lang === 'js') {
      let res = code;
      // Remove multi-line comments
      res = res.replace(/\/\*[\s\S]*?\*\//g, '');
      // Remove single-line comments (preserving URLs like https://)
      res = res.split('\n').map(line => {
        const commentIdx = line.indexOf('//');
        if (commentIdx !== -1) {
          // Check if it's inside quotes or part of http://
          const prevChar = line[commentIdx - 1];
          if (prevChar !== ':' && prevChar !== '"' && prevChar !== "'") {
            return line.substring(0, commentIdx);
          }
        }
        return line;
      }).join('\n');
      // Collapse whitespace around operators
      res = res.replace(/\s*([=+\-*/%&|!<>?:;,{}()\[\]])\s*/g, '$1');
      // Collapse multiple newlines/spaces
      res = res.replace(/\s+/g, ' ');
      return res.trim();
    }

    return code;
  }, []);

  React.useEffect(() => {
    setOutput(minifyCode(input, language));
  }, [input, language, minifyCode]);

  const handleLanguageChange = (lang: MinifyLanguage) => {
    setLanguage(lang);
    setInput(SAMPLES[lang]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions: Record<MinifyLanguage, string> = {
      html: 'min.html',
      css: 'min.css',
      js: 'min.js',
    };
    const mimeTypes: Record<MinifyLanguage, string> = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
    };

    const blob = new Blob([output], { type: mimeTypes[language] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bundle.${extensions[language]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputBytes = new Blob([input]).size;
  const outputBytes = new Blob([output]).size;
  const savingsBytes = Math.max(0, inputBytes - outputBytes);
  const savingsPct = inputBytes > 0 ? Math.round((savingsBytes / inputBytes) * 100) : 0;

  return (
    <div className="w-full space-y-6">
      {/* Language Selector & Toolbar */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-1.5 bg-[#1A1C24] p-1 rounded-xl border border-[#2E313D]">
          <button
            onClick={() => handleLanguageChange('html')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              language === 'html' ? 'bg-[#E6570B] text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            HTML Minifier
          </button>
          <button
            onClick={() => handleLanguageChange('css')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              language === 'css' ? 'bg-[#E6570B] text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            CSS Minifier
          </button>
          <button
            onClick={() => handleLanguageChange('js')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              language === 'js' ? 'bg-[#E6570B] text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            JavaScript Minifier
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-[#E6570B]/20 disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Minified'}</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={!output}
            className="p-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl transition-colors disabled:opacity-50"
            title="Download minified file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setInput('')}
            className="p-2 bg-[#1A1C24] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#2E313D] rounded-xl transition-colors"
            title="Clear code"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#12141A] border border-[#262833] rounded-xl p-3">
          <span className="text-gray-400 text-xs">Original Size</span>
          <p className="text-lg font-bold text-white mt-0.5">{inputBytes.toLocaleString()} B</p>
        </div>
        <div className="bg-[#12141A] border border-[#262833] rounded-xl p-3">
          <span className="text-gray-400 text-xs">Minified Size</span>
          <p className="text-lg font-bold text-emerald-400 mt-0.5">{outputBytes.toLocaleString()} B</p>
        </div>
        <div className="bg-[#12141A] border border-[#262833] rounded-xl p-3">
          <span className="text-gray-400 text-xs">Bytes Saved</span>
          <p className="text-lg font-bold text-[#E6570B] mt-0.5">-{savingsBytes.toLocaleString()} B</p>
        </div>
        <div className="bg-[#12141A] border border-[#262833] rounded-xl p-3">
          <span className="text-gray-400 text-xs">Reduction</span>
          <p className="text-lg font-bold text-cyan-400 mt-0.5">{savingsPct}% Smaller</p>
        </div>
      </div>

      {/* Dual Side-by-Side Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Source Code */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-gray-300">Original {language.toUpperCase()} Source</span>
            <button
              onClick={() => setInput(SAMPLES[language])}
              className="text-[#E6570B] hover:underline text-xs"
            >
              Reset Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your raw ${language.toUpperCase()} code here...`}
            spellCheck={false}
            className="w-full h-96 p-4 bg-[#0E0F14] text-gray-200 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
          />
        </div>

        {/* Minified Output */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-emerald-400">Compressed Output</span>
            <span className="font-mono text-gray-500">1 Line &bull; Production Ready</span>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Minified output will appear here in real time..."
            spellCheck={false}
            className="w-full h-96 p-4 bg-[#0E0F14] text-emerald-300/90 font-mono text-xs leading-relaxed resize-y focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
