'use client';

import * as React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Search,
  Calendar,
  Clock,
  Copy,
  Check,
  Globe,
  Award,
  Layers,
  FileCheck,
  AlertTriangle,
} from 'lucide-react';

interface SslData {
  host: string;
  port: number;
  authorized: boolean;
  authorizationError: string | null;
  subject: {
    CN: string;
    O?: string;
    C?: string;
  };
  issuer: {
    CN: string;
    O?: string;
    C?: string;
  };
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  isExpired: boolean;
  serialNumber: string;
  fingerprint256: string;
  subjectAltNames: string[];
  protocol: string;
  cipher: {
    name: string;
    version: string;
  };
}

const SAMPLE_DOMAINS = ['stripe.com', 'google.com', 'github.com', 'cloudflare.com'];

export function SslLookupEngine() {
  const [domain, setDomain] = React.useState('stripe.com');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sslData, setSslData] = React.useState<SslData | null>(null);
  const [copiedSummary, setCopiedSummary] = React.useState(false);

  const fetchSsl = React.useCallback(async (targetDomain: string) => {
    if (!targetDomain.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tools/ssl-lookup?domain=${encodeURIComponent(targetDomain)}`);
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to inspect SSL certificate');
        setSslData(null);
      } else {
        setSslData(data.data);
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
      setSslData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSsl(domain);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSsl(domain);
  };

  const handleCopySummary = () => {
    if (!sslData) return;
    const summary = `SSL Certificate Report for ${sslData.host}:
Status: ${sslData.authorized && !sslData.isExpired ? 'Valid & Trusted' : 'Warning/Invalid'}
Common Name: ${sslData.subject.CN}
Issuer: ${sslData.issuer.O || sslData.issuer.CN}
Valid From: ${new Date(sslData.validFrom).toLocaleDateString()}
Valid To: ${new Date(sslData.validTo).toLocaleDateString()} (${sslData.daysRemaining} days remaining)
Protocol: ${sslData.protocol}
Cipher: ${sslData.cipher.name}`;
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
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. stripe.com or sub.example.com"
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
                <span>Inspect SSL</span>
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
                fetchSsl(sample);
              }}
              className="px-2 py-0.5 rounded-md bg-[#1A1C24] border border-[#2E313D] hover:border-[#E6570B] hover:text-[#E6570B] transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-400">SSL Inspection Failed</h4>
            <p className="text-xs text-red-300/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-12 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#E6570B]/30 border-t-[#E6570B] rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400">Connecting to port 443 and performing TLS handshake...</p>
        </div>
      )}

      {sslData && !loading && (
        <div className="space-y-6">
          {/* Certificate Health Hero Banner */}
          <div
            className={`border rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              sslData.authorized && !sslData.isExpired
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-start sm:items-center gap-4">
              <div
                className={`p-3.5 rounded-xl ${
                  sslData.authorized && !sslData.isExpired
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {sslData.authorized && !sslData.isExpired ? (
                  <ShieldCheck className="w-8 h-8" />
                ) : (
                  <ShieldAlert className="w-8 h-8" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{sslData.host}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      sslData.authorized && !sslData.isExpired
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {sslData.authorized && !sslData.isExpired ? 'SSL Valid & Trusted' : 'Invalid / Untrusted'}
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Issued by{' '}
                  <span className="text-white font-medium">{sslData.issuer.O || sslData.issuer.CN}</span> &bull;{' '}
                  {sslData.protocol} ({sslData.cipher.name})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#262833]/50">
              <div className="text-right">
                <span className="text-[11px] text-gray-400">Validity Lifetime</span>
                <p
                  className={`text-base font-bold ${
                    sslData.daysRemaining > 30 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {sslData.daysRemaining > 0
                    ? `${sslData.daysRemaining} Days Left`
                    : 'Expired'}
                </p>
              </div>
              <button
                onClick={handleCopySummary}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1C24] hover:bg-[#252836] border border-[#2E313D] rounded-xl text-xs text-white transition-colors"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Certificate Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject / Owner Information */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#262833] pb-3">
                <Globe className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Subject (Domain Owner)</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Common Name (CN)</span>
                  <span className="text-white font-mono">{sslData.subject.CN || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Organization (O)</span>
                  <span className="text-white">{sslData.subject.O || 'Not Disclosed (Domain Validated)'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Country (C)</span>
                  <span className="text-white">{sslData.subject.C || 'Global'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Handshake Port</span>
                  <span className="text-white font-mono">TCP {sslData.port}</span>
                </div>
              </div>
            </div>

            {/* Issuer / Authority Information */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#262833] pb-3">
                <Award className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Issuer (Certificate Authority)</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Authority CN</span>
                  <span className="text-white font-mono">{sslData.issuer.CN || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Organization</span>
                  <span className="text-white">{sslData.issuer.O || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Country</span>
                  <span className="text-white">{sslData.issuer.C || 'Global'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Serial Number</span>
                  <span className="text-white font-mono truncate max-w-[200px]" title={sslData.serialNumber}>
                    {sslData.serialNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Validity Timeline */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#262833] pb-3">
                <Calendar className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Validity Timeline</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Activation Date</span>
                  <span className="text-white">{new Date(sslData.validFrom).toUTCString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Expiration Date</span>
                  <span className="text-white">{new Date(sslData.validTo).toUTCString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Days Remaining</span>
                  <span className="text-emerald-400 font-bold">{sslData.daysRemaining} Days</span>
                </div>
              </div>
            </div>

            {/* Cryptography & Cipher Suite */}
            <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#262833] pb-3">
                <Layers className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Encryption & Cipher</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Negotiated Protocol</span>
                  <span className="text-emerald-400 font-mono font-bold">{sslData.protocol}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E202B]">
                  <span className="text-gray-400">Cipher Suite</span>
                  <span className="text-white font-mono text-[11px] truncate max-w-[200px]" title={sslData.cipher.name}>
                    {sslData.cipher.name}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">SHA-256 Fingerprint</span>
                  <span className="text-white font-mono text-[10px] truncate max-w-[180px]" title={sslData.fingerprint256}>
                    {sslData.fingerprint256}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Alternative Names (SANs) */}
          <div className="bg-[#12141A] border border-[#262833] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#262833] pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#E6570B]" />
                <h4 className="text-sm font-semibold text-white">Subject Alternative Names (SANs)</h4>
              </div>
              <span className="text-xs text-gray-400">{sslData.subjectAltNames.length} Domains Protected</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {sslData.subjectAltNames.map((san) => (
                <span
                  key={san}
                  className="px-2.5 py-1 rounded-lg bg-[#1A1C24] border border-[#2E313D] text-[11px] font-mono text-gray-300"
                >
                  {san}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
