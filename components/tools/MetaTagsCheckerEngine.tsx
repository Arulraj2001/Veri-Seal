'use client';

import * as React from 'react';
import {
  Search,
  Globe,
  Share2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Eye,
  Layers,
  Smartphone,
  Laptop,
} from 'lucide-react';

interface MetaData {
  url: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  author: string;
  viewport: string;
  favicon: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
    site: string;
  };
  audit: Array<{
    criterion: string;
    status: 'optimal' | 'warning' | 'error';
    message: string;
  }>;
}

const SAMPLE_URLS = ['stripe.com', 'github.com', 'vercel.com', 'wikipedia.org'];

export function MetaTagsCheckerEngine() {
  const [url, setUrl] = React.useState('stripe.com');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<MetaData | null>(null);
  const [previewTab, setPreviewTab] = React.useState<'serp' | 'og' | 'twitter'>('serp');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const fetchMeta = React.useCallback(async (targetUrl: string) => {
    if (!targetUrl.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tools/meta-tags?url=${encodeURIComponent(targetUrl.trim())}`);
      const resJson = await res.json();

      if (!resJson.success) {
        setError(resJson.error || 'Failed to inspect meta tags');
        setData(null);
      } else {
        setData(resJson.data);
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchMeta(url);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMeta(url);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
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
              placeholder="e.g. example.com or https://stripe.com"
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
                <span>Analyze Meta Tags</span>
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
                fetchMeta(sample);
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
            <h4 className="text-sm font-semibold text-red-400">Meta Tags Inspection Error</h4>
            <p className="text-xs text-red-300/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-12 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#E6570B]/30 border-t-[#E6570B] rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400">Parsing HTML document metadata, OG tags, and Twitter cards...</p>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-6">
          {/* SEO Health Audit Checklist */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262833] pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">SEO Meta Audit Checklist</h4>
              </div>
              <span className="text-xs text-gray-400">
                {data.audit.filter((a) => a.status === 'optimal').length} of {data.audit.length} Optimal
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {data.audit.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#161822] border border-[#262833] flex items-start gap-2.5">
                  {item.status === 'optimal' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : item.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold text-white">{item.criterion}</span>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SERP & Social Previews Card */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#262833] pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Live Search & Social Previews</h4>
              </div>

              <div className="flex items-center gap-1.5 bg-[#161822] p-1 rounded-xl border border-[#262833]">
                <button
                  onClick={() => setPreviewTab('serp')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    previewTab === 'serp'
                      ? 'bg-[#E6570B] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Google SERP
                </button>
                <button
                  onClick={() => setPreviewTab('og')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    previewTab === 'og'
                      ? 'bg-[#E6570B] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Facebook / OpenGraph
                </button>
                <button
                  onClick={() => setPreviewTab('twitter')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    previewTab === 'twitter'
                      ? 'bg-[#E6570B] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Twitter / X Card
                </button>
              </div>
            </div>

            {/* Google SERP Preview */}
            {previewTab === 'serp' && (
              <div className="p-4 sm:p-5 rounded-xl bg-[#202124] border border-[#303134] max-w-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden shrink-0">
                    {data.favicon ? (
                      <img src={data.favicon} alt="" className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      <Globe className="w-2.5 h-2.5 text-gray-300" />
                    )}
                  </div>
                  <div className="flex flex-col text-xs leading-tight overflow-hidden">
                    <span className="text-[#dadce0] font-medium truncate">{new URL(data.url).hostname}</span>
                    <span className="text-[#9aa0a6] text-[11px] truncate">{data.canonical || data.url}</span>
                  </div>
                </div>
                <h3 className="text-[#8ab4f8] text-base hover:underline cursor-pointer font-medium leading-snug">
                  {data.title || 'Untitled Web Page'}
                </h3>
                <p className="text-[#bdc1c6] text-xs leading-relaxed mt-1 line-clamp-2">
                  {data.description || 'No meta description provided for this web page.'}
                </p>
              </div>
            )}

            {/* Open Graph Preview */}
            {previewTab === 'og' && (
              <div className="rounded-xl overflow-hidden border border-[#2E313D] max-w-lg bg-[#181A24]">
                {data.openGraph.image ? (
                  <img
                    src={data.openGraph.image}
                    alt={data.openGraph.title}
                    className="w-full h-48 object-cover bg-[#12141A]"
                  />
                ) : (
                  <div className="w-full h-40 bg-[#12141A] flex items-center justify-center text-xs text-gray-500">
                    No og:image specified
                  </div>
                )}
                <div className="p-4 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-mono">
                    {data.openGraph.siteName || new URL(data.url).hostname}
                  </span>
                  <h4 className="text-sm font-semibold text-white line-clamp-1">{data.openGraph.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{data.openGraph.description}</p>
                </div>
              </div>
            )}

            {/* Twitter / X Preview */}
            {previewTab === 'twitter' && (
              <div className="rounded-2xl overflow-hidden border border-[#2E313D] max-w-lg bg-[#161822]">
                {data.twitter.image ? (
                  <img
                    src={data.twitter.image}
                    alt={data.twitter.title}
                    className="w-full h-48 object-cover bg-[#12141A]"
                  />
                ) : (
                  <div className="w-full h-40 bg-[#12141A] flex items-center justify-center text-xs text-gray-500">
                    No twitter:image specified
                  </div>
                )}
                <div className="p-4 space-y-1">
                  <span className="text-[11px] text-gray-400 font-mono">
                    {data.twitter.site ? `@${data.twitter.site}` : new URL(data.url).hostname}
                  </span>
                  <h4 className="text-sm font-semibold text-white line-clamp-1">{data.twitter.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{data.twitter.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Full Meta Tags Table */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-4 border-b border-[#262833]">
              <h4 className="text-sm font-semibold text-white">Extracted Meta Properties</h4>
            </div>

            <div className="divide-y divide-[#262833] text-xs">
              {[
                { label: 'Page Title', val: data.title, key: 'title' },
                { label: 'Meta Description', val: data.description, key: 'description' },
                { label: 'Canonical Link', val: data.canonical, key: 'canonical' },
                { label: 'Robots Directive', val: data.robots, key: 'robots' },
                { label: 'Keywords', val: data.keywords, key: 'keywords' },
                { label: 'Author', val: data.author, key: 'author' },
                { label: 'Viewport', val: data.viewport, key: 'viewport' },
                { label: 'og:title', val: data.openGraph.title, key: 'og:title' },
                { label: 'og:description', val: data.openGraph.description, key: 'og:description' },
                { label: 'og:image', val: data.openGraph.image, key: 'og:image' },
                { label: 'twitter:card', val: data.twitter.card, key: 'twitter:card' },
              ].map((item) => (
                <div key={item.key} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#161822] transition-colors">
                  <div className="sm:w-1/4">
                    <span className="font-mono text-gray-400">{item.label}</span>
                  </div>
                  <div className="flex-1 font-mono text-gray-200 break-all pr-2">
                    {item.val || <span className="text-gray-600 italic">Not set</span>}
                  </div>
                  {item.val && (
                    <button
                      onClick={() => handleCopy(item.val, item.key)}
                      className="p-1.5 rounded-lg bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] text-gray-400 hover:text-white transition-colors self-end sm:self-auto shrink-0"
                      title={`Copy ${item.label}`}
                    >
                      {copiedKey === item.key ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
