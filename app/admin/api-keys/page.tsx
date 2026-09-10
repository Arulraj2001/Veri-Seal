'use client';

import * as React from 'react';
import {
  KeyRound,
  Plus,
  Eye,
  Trash2,
  Edit2,
  Copy,
  Check,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminApiKey {
  id: string;
  user_email: string;
  key: string;
  name: string;
  plan: string;
  daily_limit: number;
  usage_today: number;
  status: 'active' | 'revoked';
  created_at: string;
}

const initialKeys: AdminApiKey[] = [
  {
    id: 'k-1',
    user_email: 'csc.karthik@tnonline.in',
    key: 'vs_live_79a4e891b2c3d4e5f67890abcdef1234',
    name: 'Production Gateway',
    plan: 'business',
    daily_limit: 500,
    usage_today: 42,
    status: 'active',
    created_at: '2026-08-20T14:30:00Z',
  },
  {
    id: 'k-2',
    user_email: 'anand.advocate@court.in',
    key: 'vs_live_12c3d4e5f67890abcdef123479a4e891',
    name: 'Legal Chamber Sync Bot',
    plan: 'business',
    daily_limit: 500,
    usage_today: 18,
    status: 'active',
    created_at: '2026-08-25T10:15:00Z',
  },
  {
    id: 'k-3',
    user_email: 'samuel@veriseal.in',
    key: 'vs_live_99887766554433221100aabbccddeeff',
    name: 'Admin Telemetry Key',
    plan: 'business',
    daily_limit: 5000,
    usage_today: 120,
    status: 'active',
    created_at: '2026-08-01T09:00:00Z',
  },
  {
    id: 'k-4',
    user_email: 'test.revoked@developer.org',
    key: 'vs_live_00112233445566778899aabbccddeeff',
    name: 'Deprecated Testing Token',
    plan: 'business',
    daily_limit: 500,
    usage_today: 0,
    status: 'revoked',
    created_at: '2026-08-10T12:00:00Z',
  },
];

export default function AdminApiKeysPage() {
  const [keys, setKeys] = React.useState<AdminApiKey[]>(initialKeys);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Modals state
  const [viewKeyModal, setViewKeyModal] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [editLimitItem, setEditLimitItem] = React.useState<AdminApiKey | null>(null);
  const [newLimitVal, setNewLimitVal] = React.useState<number>(500);

  // Generate Key Modal
  const [showGenerateModal, setShowGenerateModal] = React.useState<boolean>(false);
  const [targetEmail, setTargetEmail] = React.useState<string>('');
  const [targetKeyName, setTargetKeyName] = React.useState<string>('Production REST API Key');
  const [targetLimit, setTargetLimit] = React.useState<number>(500);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveLimit = () => {
    if (!editLimitItem) return;
    setKeys((prev) =>
      prev.map((k) => (k.id === editLimitItem.id ? { ...k, daily_limit: newLimitVal } : k))
    );
    showToast(`Daily limit updated to ${newLimitVal} for ${editLimitItem.user_email}`);
    setEditLimitItem(null);
  };

  const handleRevoke = (k: AdminApiKey) => {
    if (!confirm(`Revoke API key for ${k.user_email}? This key will stop working immediately.`)) return;
    setKeys((prev) =>
      prev.map((item) => (item.id === k.id ? { ...item, status: 'revoked' as const } : item))
    );
    showToast(`API Key for ${k.user_email} has been revoked.`);
  };

  const handleGenerateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetEmail) return;

    const randomHex = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const newKeyString = `vs_live_${randomHex}`;

    const newRecord: AdminApiKey = {
      id: `k-${Date.now()}`,
      user_email: targetEmail.toLowerCase().trim(),
      key: newKeyString,
      name: targetKeyName,
      plan: 'business',
      daily_limit: targetLimit,
      usage_today: 0,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    setKeys((prev) => [newRecord, ...prev]);
    showToast(`API Key generated for ${targetEmail}`);
    setShowGenerateModal(false);
    setViewKeyModal(newKeyString);
    setTargetEmail('');
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-text-main text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
            Enterprise API Keys Management
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 mt-1">
            Issue, inspect, rate-limit, and revoke developer authentication tokens for programmatic PDF verification
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowGenerateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Key for User</span>
        </button>
      </div>

      {/* Keys Table */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface/50 border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">User Email</th>
                <th className="py-3 px-3">Token Name</th>
                <th className="py-3 px-3">Key (Masked)</th>
                <th className="py-3 px-3">Plan</th>
                <th className="py-3 px-3">Daily Limit</th>
                <th className="py-3 px-3">Usage Today</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-darker/50 font-medium">
              {keys.map((k) => {
                const masked = `${k.key.substring(0, 10)}••••••••••••••••${k.key.substring(k.key.length - 4)}`;
                const isRevoked = k.status === 'revoked';

                return (
                  <tr key={k.id} className={cn('hover:bg-surface/40 transition-colors', isRevoked && 'opacity-60')}>
                    <td className="py-3.5 px-3 font-bold text-text-main whitespace-nowrap">
                      {k.user_email}
                    </td>
                    <td className="py-3.5 px-3 text-text-main/80 whitespace-nowrap">
                      {k.name}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-text-main/70 whitespace-nowrap">
                      {masked}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-primary-light text-primary text-[10px] font-bold uppercase">
                        {k.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-text-main whitespace-nowrap">
                      {k.daily_limit} req/day
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-bold text-text-main">{k.usage_today}</span>
                      <span className="text-text-main/40"> / {k.daily_limit}</span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {isRevoked ? (
                        <span className="px-2 py-0.5 rounded-full bg-error-light text-error text-[10px] font-bold uppercase">
                          Revoked
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-success-light text-success text-[10px] font-bold uppercase">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right whitespace-nowrap space-x-1">
                      {/* View Full Key */}
                      <button
                        type="button"
                        onClick={() => setViewKeyModal(k.key)}
                        className="p-1.5 rounded-lg border border-surface-darker hover:bg-surface text-text-main/70"
                        title="View Full Token"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Limit */}
                      {!isRevoked && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditLimitItem(k);
                            setNewLimitVal(k.daily_limit);
                          }}
                          className="p-1.5 rounded-lg border border-surface-darker hover:bg-surface text-text-main/70"
                          title="Edit Daily Limit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Revoke */}
                      {!isRevoked && (
                        <button
                          type="button"
                          onClick={() => handleRevoke(k)}
                          className="p-1.5 rounded-lg border border-error/30 text-error hover:bg-error-light"
                          title="Revoke Token"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: VIEW FULL KEY */}
      {viewKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-text-main">Secret API Key Token</h3>
              <button
                type="button"
                onClick={() => setViewKeyModal(null)}
                className="p-1 rounded-lg text-text-main/50 hover:bg-surface"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-surface rounded-xl border border-surface-darker font-mono text-xs text-text-main break-all flex items-center justify-between gap-2">
              <span>{viewKeyModal}</span>
              <button
                type="button"
                onClick={() => handleCopyKey(viewKeyModal)}
                className="p-1.5 rounded-lg bg-white border border-surface-darker text-primary hover:bg-primary-light transition-colors shrink-0"
                title="Copy Key"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-[11px] text-text-main/60">
              Provide this key in the <code>Authorization: Bearer &lt;key&gt;</code> HTTP header when calling <code>POST /verify</code>.
            </p>

            <button
              type="button"
              onClick={() => setViewKeyModal(null)}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT LIMIT */}
      {editLimitItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-black text-text-main">Edit Daily Limit</h3>
            <p className="text-xs text-text-main/60">{editLimitItem.user_email}</p>

            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Daily Verification Quota (Requests / Day)
              </label>
              <input
                type="number"
                value={newLimitVal}
                onChange={(e) => setNewLimitVal(parseInt(e.target.value, 10) || 500)}
                className="w-full px-3 py-2 text-xs bg-surface border border-surface-darker rounded-xl text-text-main font-bold"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditLimitItem(null)}
                className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveLimit}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover"
              >
                Save Quota
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: GENERATE KEY FOR USER */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-text-main">Generate Key for Citizen / Enterprise</h3>

            <form onSubmit={handleGenerateNew} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-text-main mb-1">User Email</label>
                <input
                  type="email"
                  required
                  placeholder="enterprise@company.com"
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface border border-surface-darker rounded-xl text-text-main"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-main mb-1">Key Label / Environment</label>
                <input
                  type="text"
                  required
                  value={targetKeyName}
                  onChange={(e) => setTargetKeyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface border border-surface-darker rounded-xl text-text-main"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-main mb-1">Daily Limit</label>
                <input
                  type="number"
                  value={targetLimit}
                  onChange={(e) => setTargetLimit(parseInt(e.target.value, 10) || 500)}
                  className="w-full px-3 py-2 text-xs bg-surface border border-surface-darker rounded-xl text-text-main"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
