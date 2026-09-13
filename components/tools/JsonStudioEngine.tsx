'use client';

import * as React from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  AlertCircle,
  CheckCircle2,
  Minimize2,
  Maximize2,
  ArrowUpDown,
  FileCode2,
  Trash2,
  FileJson,
  Eye,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

interface JsonStudioEngineProps {
  initialMode?: 'format' | 'validate' | 'beautify';
}

const SAMPLE_JSON = `{
  "site": "Kagazo Tools",
  "version": 2.4,
  "features": ["100% In-Browser Privacy", "Instant Compression", "Zero Server Storage"],
  "security": {
    "tls": "1.3",
    "encrypted": true,
    "rating": 5
  },
  "stats": {
    "totalTools": 100,
    "activeUsers": 45000
  }
}`;

export function JsonStudioEngine({ initialMode = 'format' }: JsonStudioEngineProps) {
  const [input, setInput] = React.useState(SAMPLE_JSON);
  const [indent, setIndent] = React.useState<number>(2);
  const [parsedData, setParsedData] = React.useState<any>(null);
  const [errorInfo, setErrorInfo] = React.useState<{ line: number; col: number; message: string } | null>(null);
  const [viewMode, setViewMode] = React.useState<'code' | 'tree'>('code');
  const [copied, setCopied] = React.useState(false);

  // Validate and parse JSON whenever input changes
  React.useEffect(() => {
    if (!input.trim()) {
      setParsedData(null);
      setErrorInfo(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setErrorInfo(null);
    } catch (err: any) {
      setParsedData(null);
      // Attempt to extract line and column from error message
      const msg = err.message || 'Invalid JSON syntax';
      let line = 1;
      let col = 1;

      const posMatch = msg.match(/position (\d+)/i) || msg.match(/at (\d+)/i);
      if (posMatch) {
        const charIndex = parseInt(posMatch[1], 10);
        const textBefore = input.substring(0, charIndex);
        const lines = textBefore.split('\n');
        line = lines.length;
        col = lines[lines.length - 1].length + 1;
      }

      setErrorInfo({ line, col, message: msg });
    }
  }, [input]);

  const handleFormat = () => {
    if (!parsedData) return;
    setInput(JSON.stringify(parsedData, null, indent));
  };

  const handleMinify = () => {
    if (!parsedData) return;
    setInput(JSON.stringify(parsedData));
  };

  const handleSortKeys = () => {
    if (!parsedData) return;
    const sortObject = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) return obj;
      if (Array.isArray(obj)) return obj.map(sortObject);
      return Object.keys(obj)
        .sort()
        .reduce((res: any, key: string) => {
          res[key] = sortObject(obj[key]);
          return res;
        }, {});
    };

    const sorted = sortObject(parsedData);
    setInput(JSON.stringify(sorted, null, indent));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
  };

  const originalBytes = new Blob([input]).size;
  const minifiedBytes = parsedData ? new Blob([JSON.stringify(parsedData)]).size : originalBytes;
  const savingsPct = originalBytes > 0 ? Math.max(0, Math.round(((originalBytes - minifiedBytes) / originalBytes) * 100)) : 0;

  return (
    <div className="w-full space-y-6">
      {/* Action Toolbar Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleFormat}
            disabled={!parsedData}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#E6570B]/20 transition-all disabled:opacity-40"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Beautify</span>
          </button>
          <button
            onClick={handleMinify}
            disabled={!parsedData}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl text-xs font-medium transition-colors disabled:opacity-40"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>
          <button
            onClick={handleSortKeys}
            disabled={!parsedData}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl text-xs font-medium transition-colors disabled:opacity-40"
            title="Sort object keys alphabetically"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort Keys</span>
          </button>

          <div className="h-4 w-px bg-[#262833] mx-1 hidden sm:block" />

          {/* Indent Selector */}
          <div className="flex items-center gap-1 bg-[#1A1C24] border border-[#2E313D] rounded-xl px-2 py-1">
            <span className="text-[11px] text-gray-400 pl-1">Indent:</span>
            {[2, 4].map((spaces) => (
              <button
                key={spaces}
                onClick={() => setIndent(spaces)}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors ${
                  indent === spaces ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {spaces}s
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#1A1C24] p-1 rounded-xl border border-[#2E313D]">
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'code' ? 'bg-[#2E313D] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setViewMode('tree')}
              disabled={!parsedData}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all disabled:opacity-40 ${
                viewMode === 'tree' ? 'bg-[#2E313D] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tree View</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={!parsedData}
            className="p-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl transition-colors disabled:opacity-40"
            title="Download JSON file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 bg-[#1A1C24] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#2E313D] rounded-xl transition-colors"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Validation Status Indicator Banner */}
      {errorInfo ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-red-400">Invalid JSON Syntax</h4>
              <span className="text-xs font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                Line {errorInfo.line}, Column {errorInfo.col}
              </span>
            </div>
            <p className="text-xs text-red-300/80 mt-1 font-mono">{errorInfo.message}</p>
          </div>
        </div>
      ) : parsedData ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-400">
              Valid JSON Structure &bull; RFC 8259 Compliant
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
            <span>Size: {originalBytes} bytes</span>
            {savingsPct > 0 && (
              <span className="text-[#E6570B] font-bold">Minifies -{savingsPct}%</span>
            )}
          </div>
        </div>
      ) : null}

      {/* Editor & Tree View Area */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4 text-[#E6570B]" />
            <span className="font-mono text-gray-300">JSON Studio Workspace</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLoadSample}
              className="text-[#E6570B] hover:underline text-xs"
            >
              Load Sample JSON
            </button>
            <span>{input.split('\n').length} Lines</span>
          </div>
        </div>

        {viewMode === 'code' ? (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type raw JSON data here..."
            spellCheck={false}
            className="w-full h-[460px] p-4 bg-[#0E0F14] text-gray-100 font-mono text-xs sm:text-sm leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B] selection:bg-[#E6570B]/30"
          />
        ) : (
          <div className="h-[460px] p-4 bg-[#0E0F14] overflow-auto font-mono text-xs text-gray-200">
            <JsonTreeViewer data={parsedData} />
          </div>
        )}
      </div>
    </div>
  );
}

// Collapsible JSON Tree Component
function JsonTreeViewer({ data, name }: { data: any; name?: string }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const isObject = typeof data === 'object' && data !== null;
  const isArray = Array.isArray(data);

  if (!isObject) {
    let color = 'text-green-400';
    if (typeof data === 'number') color = 'text-blue-400';
    if (typeof data === 'boolean') color = 'text-purple-400';
    if (data === null) color = 'text-gray-500';

    return (
      <div className="pl-4 py-0.5">
        {name && <span className="text-[#E6570B] font-semibold">{`"${name}": `}</span>}
        <span className={color}>
          {typeof data === 'string' ? `"${data}"` : String(data)}
        </span>
      </div>
    );
  }

  const keys = Object.keys(data);

  return (
    <div className="pl-3 py-0.5">
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-1 cursor-pointer hover:bg-white/5 rounded px-1 -ml-1 transition-colors select-none"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        )}
        {name && <span className="text-[#E6570B] font-semibold">{`"${name}": `}</span>}
        <span className="text-gray-400">
          {isArray ? `Array[${keys.length}]` : `Object{${keys.length}}`}
        </span>
      </div>

      {!collapsed && (
        <div className="border-l border-[#262833] ml-2 pl-2">
          {keys.map((key) => (
            <JsonTreeViewer key={key} data={data[key]} name={isArray ? undefined : key} />
          ))}
        </div>
      )}
    </div>
  );
}
