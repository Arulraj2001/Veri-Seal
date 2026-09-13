'use client';

import * as React from 'react';
import {
  Database,
  Copy,
  Check,
  Download,
  Trash2,
  Maximize2,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { format as formatSql, FormatOptionsWithLanguage } from 'sql-formatter';

const SAMPLE_SQL = `SELECT u.user_id, u.email, p.full_name, COUNT(o.order_id) AS total_orders, SUM(o.amount_usd) AS lifetime_spend
FROM users u
LEFT JOIN profiles p ON u.user_id = p.user_id
INNER JOIN orders o ON u.user_id = o.customer_id
WHERE u.status = 'ACTIVE' AND o.created_at >= '2024-01-01'
GROUP BY u.user_id, u.email, p.full_name
HAVING COUNT(o.order_id) > 2
ORDER BY lifetime_spend DESC
LIMIT 50;`;

type SqlLanguage = 'sql' | 'postgresql' | 'mysql' | 'sqlite' | 'mariadb' | 'bigquery' | 'tsql';

export function SqlFormatterEngine() {
  const [input, setInput] = React.useState(SAMPLE_SQL);
  const [output, setOutput] = React.useState('');
  const [dialect, setDialect] = React.useState<SqlLanguage>('sql');
  const [keywordCase, setKeywordCase] = React.useState<'upper' | 'lower' | 'preserve'>('upper');
  const [tabWidth, setTabWidth] = React.useState<number>(2);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      const formatted = formatSql(input, {
        language: dialect as any,
        keywordCase: keywordCase,
        tabWidth: tabWidth,
        useTabs: false,
      });
      setOutput(formatted);
    } catch {
      // If incomplete SQL, keep previous output or raw
      setOutput(input);
    }
  }, [input, dialect, keywordCase, tabWidth]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Configuration & Action Toolbar */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Dialect Selector */}
          <div className="flex items-center gap-1.5 bg-[#1A1C24] border border-[#2E313D] rounded-xl px-2.5 py-1 text-xs">
            <Database className="w-3.5 h-3.5 text-[#E6570B]" />
            <span className="text-gray-400">Dialect:</span>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as SqlLanguage)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="sql" className="bg-[#1A1C24]">Standard SQL</option>
              <option value="postgresql" className="bg-[#1A1C24]">PostgreSQL</option>
              <option value="mysql" className="bg-[#1A1C24]">MySQL</option>
              <option value="sqlite" className="bg-[#1A1C24]">SQLite</option>
              <option value="mariadb" className="bg-[#1A1C24]">MariaDB</option>
              <option value="bigquery" className="bg-[#1A1C24]">BigQuery</option>
              <option value="tsql" className="bg-[#1A1C24]">Transact-SQL</option>
            </select>
          </div>

          {/* Keyword Case */}
          <div className="flex items-center gap-1 bg-[#1A1C24] border border-[#2E313D] rounded-xl p-1 text-xs">
            <span className="text-gray-400 px-1.5">Keywords:</span>
            <button
              onClick={() => setKeywordCase('upper')}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                keywordCase === 'upper' ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              UPPER
            </button>
            <button
              onClick={() => setKeywordCase('lower')}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                keywordCase === 'lower' ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              lower
            </button>
          </div>

          {/* Indent Width */}
          <div className="flex items-center gap-1 bg-[#1A1C24] border border-[#2E313D] rounded-xl p-1 text-xs">
            <span className="text-gray-400 px-1.5">Indent:</span>
            {[2, 4].map((w) => (
              <button
                key={w}
                onClick={() => setTabWidth(w)}
                className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                  tabWidth === w ? 'bg-[#E6570B] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {w} spaces
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-[#E6570B]/20 disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Formatted'}</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={!output}
            className="p-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-white rounded-xl transition-colors disabled:opacity-50"
            title="Download SQL query"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setInput('')}
            className="p-2 bg-[#1A1C24] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#2E313D] rounded-xl transition-colors"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dual Side-by-Side Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Raw SQL Input */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-gray-300">Raw SQL Query</span>
            <button
              onClick={() => setInput(SAMPLE_SQL)}
              className="text-[#E6570B] hover:underline text-xs"
            >
              Reset Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted SQL query here..."
            spellCheck={false}
            className="w-full h-96 p-4 bg-[#0E0F14] text-gray-200 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#E6570B]"
          />
        </div>

        {/* Beautified SQL Output */}
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#161822] border-b border-[#262833] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[#E6570B]">Beautified & Formatted SQL</span>
            <span className="text-gray-500 text-[11px]">{output.split('\n').length} Lines</span>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted query appears here..."
            spellCheck={false}
            className="w-full h-96 p-4 bg-[#0E0F14] text-gray-100 font-mono text-xs leading-relaxed resize-y focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
