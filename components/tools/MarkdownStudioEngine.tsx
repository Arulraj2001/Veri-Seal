'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Code,
  Copy,
  Check,
  Download,
  Trash2,
  Eye,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  CheckSquare,
  Table,
  Quote,
  Sparkles,
  FileCode,
} from 'lucide-react';

const SAMPLE_MARKDOWN = `# Project Specification: Kagazo Sovereign Platform

Welcome to the **Kagazo** high-performance developer suite. All operations run **100% in-browser** with zero server tracking.

## Core Pillars
1. **Privacy First**: Zero RAM data persistence on remote servers.
2. **Speed**: Sub-millisecond client execution.
3. **Reliability**: Compliant with RFC & W3C specifications.

### Feature Comparison

| Capability | Standard Web Apps | Kagazo Studio |
| :--- | :---: | :---: |
| Data Privacy | Uploads to Cloud | 100% In-Browser |
| Latency | 500ms - 2000ms | Instant (0ms) |
| File Limits | Strict Quotas | Unlimited Local RAM |

> "The sovereign developer toolset that puts privacy and speed back in your hands."

\`\`\`javascript
// Example Verification Hash
function computeSealHash(buffer) {
  return crypto.subtle.digest('SHA-256', buffer);
}
\`\`\`

- [x] Verified Cryptographic Handshake
- [x] Zero Link Decay
- [ ] Staging Rollout Complete
`;

export function MarkdownStudioEngine() {
  const [markdown, setMarkdown] = React.useState(SAMPLE_MARKDOWN);
  const [activeTab, setActiveTab] = React.useState<'rendered' | 'html'>('rendered');
  const [copiedHtml, setCopiedHtml] = React.useState(false);

  // Convert markdown to clean HTML string for the raw HTML tab
  const [htmlOutput, setHtmlOutput] = React.useState('');

  // Simple Markdown to HTML generator for the Raw HTML tab
  React.useEffect(() => {
    let raw = markdown;

    // Headers
    raw = raw.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    raw = raw.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    raw = raw.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold & Italic
    raw = raw.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    raw = raw.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Blockquotes
    raw = raw.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Code blocks
    raw = raw.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

    // Inline code
    raw = raw.replace(/`([^`]+)`/gim, '<code>$1</code>');

    // Links
    raw = raw.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

    // Unordered Lists
    raw = raw.replace(/^\- (.*$)/gim, '<li>$1</li>');

    // Paragraphs for remaining text blocks
    const lines = raw.split('\n');
    const formattedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<li') || trimmed.startsWith('|')) {
        return line;
      }
      return `<p>${line}</p>`;
    });

    setHtmlOutput(formattedLines.join('\n'));
  }, [markdown]);

  const insertSnippet = (prefix: string, suffix: string = '') => {
    setMarkdown((prev) => `${prev}\n${prefix}${suffix}`);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleDownloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exported Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1a1a1a; }
    pre { background: #f4f4f5; padding: 16px; border-radius: 8px; overflow-x: auto; }
    blockquote { border-left: 4px solid #e6570b; margin: 0; padding-left: 16px; color: #555; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background: #f9fafb; }
  </style>
</head>
<body>
${htmlOutput}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Markdown Toolbars & Controls */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        {/* Quick Markdown Inserts */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => insertSnippet('**Bold Text**')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertSnippet('*Italic Text*')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertSnippet('# Heading 1')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertSnippet('## Heading 2')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertSnippet('> Quote')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertSnippet('- List item')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertSnippet('1. Numbered item')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertSnippet('- [ ] Task list item')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Checklist"
          >
            <CheckSquare className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() =>
              insertSnippet(
                '| Header 1 | Header 2 |\n| :--- | :--- |\n| Cell 1 | Cell 2 |'
              )
            }
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Table"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertSnippet('```typescript\nconst greeting = "hello";\n```')}
            className="p-2 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-300 hover:text-white transition-colors"
            title="Code Block"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Export and Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#E6570B]/20 transition-all"
          >
            {copiedHtml ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedHtml ? 'Copied' : 'Copy HTML'}</span>
          </button>
          <button
            onClick={handleDownloadHtml}
            className="p-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl transition-colors"
            title="Download full HTML document"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMarkdown('')}
            className="p-2 bg-[#1A1C24] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#2E313D] rounded-xl transition-colors"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dual Side-by-Side Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Markdown Source Editor */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-gray-300">Markdown Source (GFM)</span>
            <button
              onClick={() => setMarkdown(SAMPLE_MARKDOWN)}
              className="text-[#E6570B] hover:underline text-xs"
            >
              Reset Sample
            </button>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            spellCheck={false}
            className="w-full h-[520px] p-4 bg-[#0E0F14] text-gray-200 font-mono text-xs sm:text-sm leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
          />
        </div>

        {/* Live Preview / Raw HTML Output */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="px-4 py-2 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1 bg-[#1A1C24] p-0.5 rounded-lg border border-[#2E313D]">
              <button
                onClick={() => setActiveTab('rendered')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'rendered' ? 'bg-[#2E313D] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Live Preview
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'html' ? 'bg-[#2E313D] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Raw HTML
              </button>
            </div>

            <span className="text-gray-500 font-mono text-[11px]">{markdown.split('\n').length} Lines</span>
          </div>

          <div className="flex-1 p-5 overflow-auto h-[520px] bg-[#0E0F14]">
            {activeTab === 'rendered' ? (
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-300 prose-headings:text-white prose-a:text-[#E6570B] prose-code:text-[#E6570B] prose-pre:bg-[#161822] prose-th:text-gray-200 prose-th:border-[#262833] prose-td:border-[#262833]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={htmlOutput}
                readOnly
                className="w-full h-full bg-transparent text-emerald-300 font-mono text-xs leading-relaxed resize-none focus:outline-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
