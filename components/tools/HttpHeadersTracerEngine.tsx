'use client';

import * as React from 'react';
import {
  Search,
  Globe,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Copy,
  Check,
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface HopInfo {
  hop: number;
  url: string;
  statusCode: number;
  statusText: string;
  latencyMs: number;
  headers: Record<string, string>;
  redirectUrl?: string;
}

interface SecurityAuditItem {
  header: string;
  present?: boolean;
  detected?: string | null;
  value?: string | null;
  status: 'pass' | 'warning' | 'fail' | 'info';
  recommendation: string;
}

interface HeaderData {
  initialUrl: string;
  finalUrl: string;
  totalHops: number;
  hops: HopInfo[];
  securityScore: number;
  securityAudit: {
    hsts: SecurityAuditItem;
    xFrameOptions: SecurityAuditItem;
    xContentTypeOptions: SecurityAuditItem;
    csp: SecurityAuditItem;
    referrerPolicy: SecurityAuditItem;
    permissionsPolicy: SecurityAuditItem;
    serverLeakage: SecurityAuditItem;
  };
}

const SAMPLE_URLS = ['google.com', 'http://github.com', 'cloudflare.com', 'http://httpstat.us/301'];

interface HttpHeadersTracerEngineProps {
  mode?: 'headers' | 'redirect';
}

export function HttpHeadersTracerEngine({ mode = 'headers' }: HttpHeadersTracerEngineProps) {
  const [url, setUrl] = React.useState('http://github.com');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<HeaderData | null>(null);
  const [activeHopIndex, setActiveHopIndex] = React.useState(0);
  const [headerSearch, setHeaderSearch] = React.useState('');
  const [copiedCurl, setCopiedCurl] = React.useState(false);

  const fetchHeaders = React.useCallback(async (targetUrl: string) => {
    if (!targetUrl.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tools/http-headers?url=${encodeURIComponent(targetUrl.trim())}`);
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to inspect HTTP headers');
        setResult(null);
      } else {
        setResult(data.data);
        setActiveHopIndex(data.data.hops.length - 1);
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchHeaders(url);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHeaders(url);
  };

  const handleCopyCurl = () => {
    if (!result) return;
    const currentHop = result.hops[activeHopIndex];
    let curl = `curl -I "${currentHop.url}"\n\nHTTP Response:\nStatus: ${currentHop.statusCode} ${currentHop.statusText}\n`;
    Object.entries(currentHop.headers).forEach(([k, v]) => {
      curl += `${k}: ${v}\n`;
    });
    navigator.clipboard.writeText(curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const activeHop = result?.hops[activeHopIndex];
  const filteredHeaders = React.useMemo(() => {
    if (!activeHop?.headers) return [];
    return Object.entries(activeHop.headers).filter(([key, val]) =>
      key.toLowerCase().includes(headerSearch.toLowerCase()) ||
      val.toLowerCase().includes(headerSearch.toLowerCase())
    );
  }, [activeHop, headerSearch]);

  const getStatusBadge = (code: number) => {
    if (code >= 200 && code < 300) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (code >= 300 && code < 400) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    if (code >= 400 && code < 500) return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    return 'bg-red-500/10 text-red-400 border-red-500/30';
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Input Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 sm:p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. example.com or http://short.link"
              className="w-full bg-[#1A1C24] border border-[#2E313D] rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#E6570B] focus:ring-1 focus:ring-[#E6570B] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#E6570B] hover:bg-[#d04e0a] text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-[#E6570B]/20 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{mode === 'redirect' ? 'Trace Redirects' : 'Inspect Headers'}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span>Quick samples:</span>
          {SAMPLE_URLS.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setUrl(sample);
                fetchHeaders(sample);
              }}
              className="px-2 py-0.5 rounded-md bg-[#1A1C24] border border-[#2E313D] hover:border-[#E6570B] hover:text-[#E6570B] transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-400">Inspection Failed</h4>
            <p className="text-xs text-red-300/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-12 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#E6570B]/30 border-t-[#E6570B] rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400">Tracing HTTP hops and analyzing response headers...</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6">
          {/* Redirect Chain / Hop Sequence */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262833] pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">
                  Redirect Chain ({result.totalHops} {result.totalHops === 1 ? 'Hop' : 'Hops'})
                </h4>
              </div>
              <span className="text-xs text-gray-400">Click hop to view its individual headers</span>
            </div>

            <div className="space-y-3">
              {result.hops.map((hop, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveHopIndex(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeHopIndex === idx
                      ? 'bg-[#1A1C24] border-[#E6570B] ring-1 ring-[#E6570B]'
                      : 'bg-[#151720] border-[#262833] hover:border-[#383C4D]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#262833] text-[11px] font-bold text-gray-300 flex items-center justify-center shrink-0">
                        {hop.hop}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded border text-[11px] font-mono font-bold ${getStatusBadge(
                          hop.statusCode
                        )}`}
                      >
                        {hop.statusCode} {hop.statusText}
                      </span>
                      <span className="text-xs font-mono text-gray-200 truncate max-w-[280px] sm:max-w-md" title={hop.url}>
                        {hop.url}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400 self-end sm:self-auto">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {hop.latencyMs} ms
                      </span>
                    </div>
                  </div>

                  {hop.redirectUrl && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#E6570B] pl-9">
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-gray-400">Redirects to:</span>
                      <span className="font-mono truncate">{hop.redirectUrl}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security Headers Audit Card */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262833] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Security Headers Audit</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Security Score:</span>
                <span
                  className={`text-sm font-bold px-2 py-0.5 rounded ${
                    result.securityScore >= 70
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : result.securityScore >= 40
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {result.securityScore} / 100
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {Object.entries(result.securityAudit).map(([key, item]) => {
                const isPass = item.status === 'pass';
                const isWarn = item.status === 'warning' || item.status === 'info';
                return (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-[#161822] border border-[#262833] flex items-start gap-2.5"
                  >
                    {isPass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : isWarn ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold text-white truncate">{item.header}</span>
                        <span
                          className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            isPass
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : isWarn
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1">{item.recommendation}</p>
                      {item.value && (
                        <p className="text-[10px] font-mono text-gray-300 mt-1 bg-[#12141A] p-1 rounded truncate">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Hop Detailed Headers Table */}
          {activeHop && (
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-[#262833] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">
                    Hop #{activeHop.hop} Headers ({Object.keys(activeHop.headers).length})
                  </h4>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-48">
                    <input
                      type="text"
                      placeholder="Filter header name..."
                      value={headerSearch}
                      onChange={(e) => setHeaderSearch(e.target.value)}
                      className="w-full bg-[#1A1C24] border border-[#2E313D] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E6570B]"
                    />
                  </div>
                  <button
                    onClick={handleCopyCurl}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1C24] border border-[#2E313D] hover:border-gray-500 rounded-lg text-xs text-gray-300 font-medium transition-colors whitespace-nowrap"
                  >
                    {copiedCurl ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCurl ? 'Copied' : 'cURL'}</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#262833] text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-[#161822]">
                      <th className="py-2.5 px-4 w-1/3">Header Name</th>
                      <th className="py-2.5 px-4">Header Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262833] text-xs">
                    {filteredHeaders.map(([k, v]) => (
                      <tr key={k} className="hover:bg-[#181A24] transition-colors">
                        <td className="py-2.5 px-4 font-mono text-[11px] text-[#E6570B] font-medium whitespace-nowrap align-top">
                          {k}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-[11px] text-gray-200 break-all">
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
