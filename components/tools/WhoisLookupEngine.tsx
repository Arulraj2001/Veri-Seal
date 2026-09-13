'use client';

import * as React from 'react';
import {
  Globe,
  Search,
  Calendar,
  Clock,
  Shield,
  Server,
  Building,
  Copy,
  Check,
  Code,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface WhoisData {
  domain: string;
  handle: string | null;
  registrar: string;
  ianaId: string | null;
  registeredOn: string | null;
  expiresOn: string | null;
  updatedOn: string | null;
  domainAge: string | null;
  status: string[];
  nameservers: string[];
  raw: any;
}

const SAMPLE_DOMAINS = ['apple.com', 'google.com', 'github.com', 'microsoft.com'];

export function WhoisLookupEngine() {
  const [domain, setDomain] = React.useState('apple.com');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [whoisData, setWhoisData] = React.useState<WhoisData | null>(null);
  const [showRaw, setShowRaw] = React.useState(false);
  const [copiedSummary, setCopiedSummary] = React.useState(false);

  const fetchWhois = React.useCallback(async (targetDomain: string) => {
    if (!targetDomain.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tools/whois-lookup?domain=${encodeURIComponent(targetDomain)}`);
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Domain registration records not found');
        setWhoisData(null);
      } else {
        setWhoisData(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch WHOIS/RDAP records');
      setWhoisData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchWhois(domain);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWhois(domain);
  };

  const handleCopySummary = () => {
    if (!whoisData) return;
    const summary = `WHOIS Report for ${whoisData.domain}:
Registrar: ${whoisData.registrar} (IANA ID: ${whoisData.ianaId || 'N/A'})
Domain Age: ${whoisData.domainAge || 'N/A'}
Registered On: ${whoisData.registeredOn ? new Date(whoisData.registeredOn).toLocaleDateString() : 'N/A'}
Expires On: ${whoisData.expiresOn ? new Date(whoisData.expiresOn).toLocaleDateString() : 'N/A'}
Updated On: ${whoisData.updatedOn ? new Date(whoisData.updatedOn).toLocaleDateString() : 'N/A'}
Nameservers: ${whoisData.nameservers.join(', ')}`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Bar Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-4 sm:p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. example.com or brand.org"
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
                <span>Lookup WHOIS</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span>Quick samples:</span>
          {SAMPLE_DOMAINS.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setDomain(sample);
                fetchWhois(sample);
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
            <h4 className="text-sm font-semibold text-red-400">WHOIS Lookup Error</h4>
            <p className="text-xs text-red-300/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-12 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#E6570B]/30 border-t-[#E6570B] rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400">Querying ICANN authoritative RDAP registry servers...</p>
        </div>
      )}

      {whoisData && !loading && (
        <div className="space-y-6">
          {/* Domain Overview Hero */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3.5 rounded-xl bg-[#E6570B]/10 text-[#E6570B]">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{whoisData.domain}</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Registered
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Registrar: <span className="text-white font-medium">{whoisData.registrar}</span>
                  {whoisData.ianaId && ` (IANA: ${whoisData.ianaId})`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#262833]/50">
              {whoisData.domainAge && (
                <div className="text-right">
                  <span className="text-[11px] text-gray-400">Domain Age</span>
                  <p className="text-base font-bold text-[#E6570B]">{whoisData.domainAge}</p>
                </div>
              )}
              <button
                onClick={handleCopySummary}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] rounded-xl text-xs text-white transition-colors"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Registrar Information */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#262833] pb-3">
                <Building className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Registrar Information</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Registrar Name</span>
                  <span className="text-white font-medium">{whoisData.registrar}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">IANA ID</span>
                  <span className="text-white font-mono">{whoisData.ianaId || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Registry Handle</span>
                  <span className="text-white font-mono text-[11px]">{whoisData.handle || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Protocol Service</span>
                  <span className="text-emerald-400 font-mono">ICANN RDAP / RFC 7480</span>
                </div>
              </div>
            </div>

            {/* Lifecycle Dates */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#262833] pb-3">
                <Calendar className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Important Lifecycle Dates</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Registered On</span>
                  <span className="text-white">
                    {whoisData.registeredOn ? new Date(whoisData.registeredOn).toUTCString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Expires On</span>
                  <span className="text-white font-semibold text-[#E6570B]">
                    {whoisData.expiresOn ? new Date(whoisData.expiresOn).toUTCString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="text-white">
                    {whoisData.updatedOn ? new Date(whoisData.updatedOn).toUTCString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Nameservers */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#262833] pb-3">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#E6570B]" />
                  <h4 className="text-sm font-semibold text-white">Delegated Nameservers</h4>
                </div>
                <span className="text-xs text-gray-400">{whoisData.nameservers.length} Servers</span>
              </div>
              <div className="space-y-1.5 pt-1">
                {whoisData.nameservers.length > 0 ? (
                  whoisData.nameservers.map((ns, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[#1A1C24] border border-[#2E313D] text-xs font-mono text-gray-200"
                    >
                      {ns}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic">No nameserver records reported in RDAP payload</p>
                )}
              </div>
            </div>

            {/* Domain Status Flags */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#262833] pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#E6570B]" />
                  <h4 className="text-sm font-semibold text-white">ICANN Status Codes</h4>
                </div>
                <span className="text-xs text-gray-400">{whoisData.status.length} Flags</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {whoisData.status.map((st, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#1A1C24] border border-[#2E313D] text-[11px] font-mono text-gray-300"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Raw JSON View Toggle */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="w-full px-5 py-3.5 text-left text-xs font-medium text-gray-400 hover:text-white flex items-center justify-between hover:bg-[#181A24] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#E6570B]" />
                <span>{showRaw ? 'Hide Raw RDAP/WHOIS JSON' : 'View Raw RDAP/WHOIS JSON'}</span>
              </div>
              <span className="text-[11px] text-[#E6570B]">{showRaw ? 'Collapse' : 'Expand'}</span>
            </button>
            {showRaw && (
              <div className="p-4 bg-[#0E0F14] border-t border-[#262833] overflow-x-auto max-h-96 text-[11px] font-mono text-gray-300">
                <pre>{JSON.stringify(whoisData.raw, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
