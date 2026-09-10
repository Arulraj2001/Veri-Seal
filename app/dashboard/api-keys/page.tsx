'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  KeyRound,
  Plus,
  Copy,
  Check,
  Trash2,
  ShieldCheck,
  AlertCircle,
  Terminal,
  Code2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApiKeyRecord {
  id: string;
  key: string;
  name: string;
  daily_limit: number;
  usage_today: number;
  usage_total: number;
  status: 'active' | 'revoked';
  created_at: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = React.useState<ApiKeyRecord[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [copiedKeyId, setCopiedKeyId] = React.useState<string | null>(null);
  const [showNewModal, setShowNewModal] = React.useState<boolean>(false);
  const [newKeyName, setNewKeyName] = React.useState<string>('');
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [revealedKey, setRevealedKey] = React.useState<string | null>(null);

  // Fetch keys from API
  React.useEffect(() => {
    async function loadKeys() {
      try {
        const res = await fetch('/api/api-keys');
        if (res.ok) {
          const json = await res.json();
          if (json.keys) {
            setKeys(json.keys);
          }
        }
      } catch (err) {
        console.debug('Failed to load api keys:', err);
      } finally {
        setLoading(false);
      }
    }
    loadKeys();
  }, []);

  const handleCopy = (id: string, keyText: string) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName.trim() || 'Production API Key' }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setKeys((prev) => [json.key, ...prev]);
        setRevealedKey(json.key.key);
        setNewKeyName('');
      }
    } catch (err) {
      console.error('Failed to generate key:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this API key? All applications using it will immediately receive 401 Unauthorized.')) {
      return;
    }

    try {
      const res = await fetch(`/api/api-keys?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setKeys((prev) =>
          prev.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k))
        );
      }
    } catch (err) {
      console.error('Failed to revoke key:', err);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
              Developer API Keys
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-light text-primary text-[11px] font-bold">
              Business Tier
            </span>
          </div>
          <p className="text-xs sm:text-sm text-text-main/70 mt-1">
            Programmatically verify government PDF signatures via REST API using standard bearer authentication
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setRevealedKey(null);
            setShowNewModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Key</span>
        </button>
      </div>

      {/* New Key Generation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-surface-darker rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary-light text-primary">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-text-main">
                  {revealedKey ? 'API Key Generated' : 'Create New API Key'}
                </h3>
                <p className="text-xs text-text-main/60">
                  {revealedKey ? 'Copy your key now. It will not be shown again.' : 'Label your key to track usage.'}
                </p>
              </div>
            </div>

            {revealedKey ? (
              <div className="space-y-4 pt-2">
                <div className="p-3 bg-surface rounded-xl border border-surface-darker font-mono text-xs text-text-main break-all flex items-center justify-between gap-2">
                  <span>{revealedKey}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('new', revealedKey)}
                    className="p-1.5 rounded-lg bg-white border border-surface-darker text-primary hover:bg-primary-light transition-colors shrink-0"
                  >
                    {copiedKeyId === 'new' ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-[11px] text-warning font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Store this secret key securely in your environment variables.</span>
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setShowNewModal(false);
                    setRevealedKey(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleGenerateKey} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-text-main mb-1">
                    Key Name / Environment
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Backend Production Server"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : 'Create Key'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Existing Keys Table */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
        <div className="pb-4 border-b border-surface-darker">
          <h2 className="text-base font-black text-text-main">Active Credentials</h2>
          <p className="text-xs text-text-main/60 mt-0.5">
            Keys authorized to perform synchronous cryptographic verifications against /verify
          </p>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Secret Token</th>
                <th className="py-3 px-3">Usage Today</th>
                <th className="py-3 px-3">Total Usage</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-darker/50 font-medium">
              {keys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-text-main/50 text-xs">
                    No active API keys found. Click &quot;Generate New Key&quot; to begin.
                  </td>
                </tr>
              ) : (
                keys.map((k) => {
                  const isRevoked = k.status === 'revoked';
                  const masked = `${k.key.substring(0, 10)}••••••••••••••••${k.key.substring(k.key.length - 4)}`;

                  return (
                    <tr key={k.id} className={cn('hover:bg-surface/40 transition-colors', isRevoked && 'opacity-60')}>
                      <td className="py-3.5 px-3 font-bold text-text-main whitespace-nowrap">
                        {k.name}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-text-main/70 whitespace-nowrap">
                        {masked}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-bold text-text-main">{k.usage_today}</span>
                        <span className="text-text-main/40"> / {k.daily_limit}</span>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-text-main whitespace-nowrap">
                        {k.usage_total.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {isRevoked ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-light text-error text-[10px] font-bold uppercase">
                            Revoked
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success-light text-success text-[10px] font-bold uppercase">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap space-x-1">
                        {!isRevoked && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleCopy(k.id, k.key)}
                              className="p-1.5 rounded-lg border border-surface-darker hover:bg-primary-light hover:text-primary transition-colors text-text-main/70"
                              title="Copy API Key"
                            >
                              {copiedKeyId === k.id ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRevokeKey(k.id)}
                              className="p-1.5 rounded-lg border border-surface-darker hover:bg-error-light hover:text-error transition-colors text-text-main/70"
                              title="Revoke Key"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Snippet Example */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-text-main">
          <Terminal className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-black">API Integration Example (cURL)</h3>
        </div>

        <div className="bg-text-main text-white p-4 rounded-2xl font-mono text-xs overflow-x-auto">
          <code>
            curl -X POST &quot;https://veriseal.in/verify&quot; \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer vs_live_your_api_key_here&quot; \<br />
            &nbsp;&nbsp;-F &quot;file=@/path/to/certificate.pdf&quot;
          </code>
        </div>
      </div>
    </div>
  );
}
