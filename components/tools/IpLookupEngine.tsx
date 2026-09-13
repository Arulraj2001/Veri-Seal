'use client';

import * as React from 'react';
import {
  MapPin,
  Search,
  Globe,
  Radio,
  Copy,
  Check,
  Server,
  Compass,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Network,
} from 'lucide-react';

interface IpData {
  ip: string;
  query: string;
  hostname: string;
  reverseDns: string[];
  country: string;
  countryCode: string;
  region: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  organization: string;
  asn: string;
}

const SAMPLE_TARGETS = ['8.8.8.8', '1.1.1.1', 'github.com', 'wikipedia.org'];

interface IpLookupEngineProps {
  initialMode?: 'ip' | 'reverse';
}

export function IpLookupEngine({ initialMode = 'ip' }: IpLookupEngineProps) {
  const [query, setQuery] = React.useState('8.8.8.8');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [ipData, setIpData] = React.useState<IpData | null>(null);
  const [copiedIp, setCopiedIp] = React.useState(false);
  const [copiedAll, setCopiedAll] = React.useState(false);

  const fetchIp = React.useCallback(async (target: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = target.trim() ? `/api/tools/ip-lookup?ip=${encodeURIComponent(target.trim())}` : `/api/tools/ip-lookup`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to inspect IP address');
        setIpData(null);
      } else {
        setIpData(data.data);
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
      setIpData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchIp(query);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchIp(query);
  };

  const handleUseMyIp = () => {
    setQuery('');
    fetchIp('');
  };

  const handleCopyIp = () => {
    if (!ipData) return;
    navigator.clipboard.writeText(ipData.ip);
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const handleCopyAllJson = () => {
    if (!ipData) return;
    navigator.clipboard.writeText(JSON.stringify(ipData, null, 2));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Bar Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 sm:p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Network className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter IP (e.g. 8.8.8.8) or hostname (e.g. cloudflare.com)"
              className="w-full bg-[#1A1C24] border border-[#2E313D] rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#E6570B] focus:ring-1 focus:ring-[#E6570B] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleUseMyIp}
              className="px-4 py-3 bg-[#1A1C24] border border-[#2E313D] hover:border-[#E6570B] rounded-xl text-xs text-gray-300 hover:text-white font-medium transition-colors whitespace-nowrap"
            >
              My IP
            </button>
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
                  <span>Lookup IP</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span>Quick samples:</span>
          {SAMPLE_TARGETS.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setQuery(sample);
                fetchIp(sample);
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
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-400">IP Lookup Error</h4>
            <p className="text-xs text-red-300/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-12 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#E6570B]/30 border-t-[#E6570B] rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400">Querying IP BGP routing, ASN, and geo-location databases...</p>
        </div>
      )}

      {ipData && !loading && (
        <div className="space-y-6">
          {/* IP Hero Banner */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3.5 rounded-xl bg-[#E6570B]/10 text-[#E6570B]">
                <Radio className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold font-mono text-white">{ipData.ip}</h3>
                  <button
                    onClick={handleCopyIp}
                    className="p-1 rounded-md bg-[#1A1C24] hover:bg-[#262833] text-gray-400 hover:text-white transition-colors"
                    title="Copy IP address"
                  >
                    {copiedIp ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Location: <span className="text-white font-medium">{ipData.city}, {ipData.region}, {ipData.country}</span> ({ipData.countryCode})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#262833]/50">
              <div className="text-right">
                <span className="text-[11px] text-gray-400">ISP / Organization</span>
                <p className="text-sm font-semibold text-[#E6570B] truncate max-w-[200px]">{ipData.isp}</p>
              </div>
              <button
                onClick={handleCopyAllJson}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] rounded-xl text-xs text-white transition-colors"
              >
                {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAll ? 'Copied' : 'JSON'}</span>
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Geolocation Details */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#262833] pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E6570B]" />
                  <h4 className="text-sm font-semibold text-white">Geographic Location</h4>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${ipData.latitude},${ipData.longitude}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 text-[11px] text-[#E6570B] hover:underline"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Country</span>
                  <span className="text-white font-medium">{ipData.country} ({ipData.countryCode})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Region / State</span>
                  <span className="text-white">{ipData.region}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">City & Postal Code</span>
                  <span className="text-white">{ipData.city} {ipData.postalCode !== 'Unknown' ? `(${ipData.postalCode})` : ''}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Coordinates (Lat, Lon)</span>
                  <span className="text-white font-mono">{ipData.latitude.toFixed(4)}, {ipData.longitude.toFixed(4)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Timezone</span>
                  <span className="text-white font-mono">{ipData.timezone}</span>
                </div>
              </div>
            </div>

            {/* Network & Autonomous System (ASN) */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#262833] pb-3">
                <Server className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Network & Autonomous System</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">ISP Provider</span>
                  <span className="text-white font-medium">{ipData.isp}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Organization</span>
                  <span className="text-white">{ipData.organization}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">ASN (Autonomous System)</span>
                  <span className="text-[#E6570B] font-mono font-medium">{ipData.asn}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Primary Hostname</span>
                  <span className="text-white font-mono text-[11px] truncate max-w-[200px]" title={ipData.hostname}>
                    {ipData.hostname}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Reverse DNS PTR Records</span>
                  <span className="text-white font-mono text-[11px]">
                    {ipData.reverseDns.length > 0 ? ipData.reverseDns.join(', ') : 'None registered'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
