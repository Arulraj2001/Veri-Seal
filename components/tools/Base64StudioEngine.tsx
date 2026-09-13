'use client';

import * as React from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  Upload,
  Image as ImageIcon,
  FileText,
  Trash2,
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface Base64StudioEngineProps {
  initialMode?: 'encode' | 'decode';
}

export function Base64StudioEngine({ initialMode = 'encode' }: Base64StudioEngineProps) {
  const [mode, setMode] = React.useState<'encode' | 'decode'>(initialMode);
  const [input, setInput] = React.useState('Hello, World! Welcome to Kagazo Sovereign Tools.');
  const [output, setOutput] = React.useState('');
  const [urlSafe, setUrlSafe] = React.useState(false);
  const [fileMime, setFileMime] = React.useState<string | null>(null);
  const [previewUri, setPreviewUri] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [copiedDataUri, setCopiedDataUri] = React.useState(false);

  // Encode / Decode effect
  React.useEffect(() => {
    setError(null);
    if (!input) {
      setOutput('');
      setPreviewUri(null);
      return;
    }

    try {
      if (mode === 'encode') {
        // UTF-8 safe encode
        const bytes = new TextEncoder().encode(input);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        let b64 = btoa(binary);
        if (urlSafe) {
          b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        setOutput(b64);
        setPreviewUri(null);
      } else {
        // Decode mode
        let normalized = input.trim();
        if (urlSafe || normalized.includes('-') || normalized.includes('_')) {
          normalized = normalized.replace(/-/g, '+').replace(/_/g, '/');
          while (normalized.length % 4 !== 0) {
            normalized += '=';
          }
        }
        const binary = atob(normalized);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const decodedText = new TextDecoder().decode(bytes);
        setOutput(decodedText);

        // Check if output or input was an image
        if (input.startsWith('data:image/') || fileMime?.startsWith('image/')) {
          setPreviewUri(input.startsWith('data:') ? input : `data:image/png;base64,${input}`);
        } else {
          setPreviewUri(null);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Malformed Base64 string for decoding');
      setOutput('');
    }
  }, [input, mode, urlSafe, fileMime]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileMime(file.type);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (mode === 'encode') {
        // Extract raw base64 without data URI prefix
        const base64Index = result.indexOf(';base64,');
        if (base64Index !== -1) {
          const rawB64 = result.substring(base64Index + 8);
          setInput(rawB64);
          setPreviewUri(result);
        } else {
          setInput(result);
        }
      } else {
        setInput(result);
      }
    };
    reader.readAsDataURL(file);
  };

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

  const handleCopyDataUri = () => {
    const mime = fileMime || 'text/plain';
    const dataUri = `data:${mime};base64,${output}`;
    navigator.clipboard.writeText(dataUri);
    setCopiedDataUri(true);
    setTimeout(() => setCopiedDataUri(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Configuration & Action Toolbar */}
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
              Encode to Base64
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'decode' ? 'bg-[#E6570B] text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Decode from Base64
            </button>
          </div>

          {/* URL Safe Toggle */}
          <label className="flex items-center gap-2 cursor-pointer bg-[#1A1C24] border border-[#2E313D] rounded-xl px-3 py-1.5 text-xs text-gray-300 select-none">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="accent-[#E6570B] rounded cursor-pointer"
            />
            <span>URL-Safe (- and _)</span>
          </label>

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
          {/* File Upload Button */}
          <label className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white rounded-xl text-xs font-medium cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-[#E6570B]" />
            <span>Upload File</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#E6570B]/20 transition-all disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {mode === 'encode' && output && (
            <button
              onClick={handleCopyDataUri}
              className="px-3 py-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-xs text-gray-300 hover:text-white rounded-xl transition-colors whitespace-nowrap"
              title="Copy as data URI string"
            >
              {copiedDataUri ? 'Copied URI' : 'Data URI'}
            </button>
          )}

          <button
            onClick={handleDownload}
            disabled={!output}
            className="p-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl transition-colors disabled:opacity-50"
            title="Download output file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-400">Decoding Error</h4>
            <p className="text-xs text-red-300/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Dual Side-by-Side Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Pane */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-gray-300">
              {mode === 'encode' ? 'Raw Input (Plain Text / File)' : 'Base64 Input'}
            </span>
            <span className="text-gray-500">{new Blob([input]).size} bytes</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Type or paste plain text string...'
                : 'Paste valid Base64 string to decode...'
            }
            spellCheck={false}
            className="w-full h-80 p-4 bg-[#0E0F14] text-gray-200 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
          />
        </div>

        {/* Output Pane */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[#E6570B]">
              {mode === 'encode' ? 'Base64 Encoded Result' : 'Decoded Plain Text'}
            </span>
            <span className="text-gray-500">{new Blob([output]).size} bytes</span>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            spellCheck={false}
            className="w-full h-80 p-4 bg-[#0E0F14] text-gray-100 font-mono text-xs leading-relaxed resize-y focus:outline-none"
          />
        </div>
      </div>

      {/* Visual Image Preview if Base64 is an image */}
      {previewUri && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 border-b border-[#262833] pb-2 text-xs font-semibold text-white">
            <ImageIcon className="w-4 h-4 text-[#E6570B]" />
            <span>Decoded Image Preview</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-[#0E0F14] rounded-xl border border-[#262833]">
            <img src={previewUri} alt="Base64 preview" className="max-h-64 object-contain rounded-lg shadow" />
          </div>
        </div>
      )}
    </div>
  );
}
