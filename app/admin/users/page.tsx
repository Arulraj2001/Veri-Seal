'use client';

import * as React from 'react';
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  ShieldAlert,
  UserX,
  UserCheck,
  RotateCcw,
  TrendingUp,
  X,
  CheckCircle2,
  Clock,
  KeyRound,
  FileCheck2,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'business';
  role: 'user' | 'admin';
  banned: boolean;
  joined: string;
  verifications: number;
  last_active: string;
  verification_count_today: number;
}

interface UserDetailPayload {
  user: AdminUser;
  verifications: Array<{ id: string; doc_type: string; status: string; date: string }>;
  payments: Array<{ id: string; plan: string; amount: number; status: string; date: string }>;
  api_keys: Array<{ key: string; name: string; status: string }>;
}

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [search, setSearch] = React.useState<string>('');
  const [planFilter, setPlanFilter] = React.useState<string>('all');
  const [sortField, setSortField] = React.useState<string>('joined');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Modals / Drawers State
  const [selectedUserDetails, setSelectedUserDetails] = React.useState<UserDetailPayload | null>(null);
  const [loadingDetails, setLoadingDetails] = React.useState<boolean>(false);
  const [upgradeUser, setUpgradeUser] = React.useState<AdminUser | null>(null);
  const [selectedPlanUpgrade, setSelectedPlanUpgrade] = React.useState<'pro' | 'business'>('pro');
  const [downgradeUser, setDowngradeUser] = React.useState<AdminUser | null>(null);
  const [banUserConfirm, setBanUserConfirm] = React.useState<AdminUser | null>(null);

  const [proPrice, setProPrice] = React.useState<number>(199);
  const [businessPrice, setBusinessPrice] = React.useState<number>(2499);

  React.useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.pro_price) setProPrice(Number(data.pro_price));
        if (data.business_price) setBusinessPrice(Number(data.business_price));
      })
      .catch((err) => console.debug('Failed to fetch settings for users page:', err));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadUsers = async () => {
    try {
      const url = new URL('/api/admin/users', window.location.origin);
      if (search) url.searchParams.set('search', search);
      if (planFilter !== 'all') url.searchParams.set('plan', planFilter);
      if (sortField) url.searchParams.set('sort', sortField);

      const res = await fetch(url.toString());
      if (res.ok) {
        const json = await res.json();
        setUsers(json.users || []);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadUsers();
  }, [search, planFilter, sortField]);

  // View User Details
  const handleOpenDetails = async (u: AdminUser) => {
    setLoadingDetails(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_details', userId: u.id }),
      });
      if (res.ok) {
        const json = await res.json();
        setSelectedUserDetails(json);
      }
    } catch (err) {
      console.error('Failed to load user details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Upgrade Plan
  const handleConfirmUpgrade = async () => {
    if (!upgradeUser) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upgrade_plan',
          userId: upgradeUser.id,
          plan: selectedPlanUpgrade,
        }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === upgradeUser.id ? { ...u, plan: selectedPlanUpgrade } : u))
        );
        showToast(`User ${upgradeUser.email} upgraded to ${selectedPlanUpgrade.toUpperCase()}`);
        setUpgradeUser(null);
      }
    } catch (err) {
      console.error('Upgrade failed:', err);
    }
  };

  // Downgrade to Free
  const handleConfirmDowngrade = async () => {
    if (!downgradeUser) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'downgrade_free', userId: downgradeUser.id }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === downgradeUser.id ? { ...u, plan: 'free' } : u))
        );
        showToast(`User ${downgradeUser.email} reverted to Free tier.`);
        setDowngradeUser(null);
      }
    } catch (err) {
      console.error('Downgrade failed:', err);
    }
  };

  // Reset Daily Count
  const handleResetDaily = async (u: AdminUser) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset_daily', userId: u.id }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((item) => (item.id === u.id ? { ...item, verification_count_today: 0 } : item))
        );
        showToast(`Daily quota reset for ${u.email}.`);
      }
    } catch (err) {
      console.error('Daily reset failed:', err);
    }
  };

  // Ban / Unban
  const handleToggleBan = async (u: AdminUser) => {
    const action = u.banned ? 'unban_user' : 'ban_user';
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId: u.id }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((item) => (item.id === u.id ? { ...item, banned: !u.banned } : item))
        );
        showToast(`User ${u.email} is now ${!u.banned ? 'BANNED' : 'UNBANNED'}.`);
        setBanUserConfirm(null);
      }
    } catch (err) {
      console.error('Ban action failed:', err);
    }
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Citizen &amp; Enterprise Accounts
        </h1>
        <p className="text-xs sm:text-sm text-text-main/70 mt-1">
          Monitor user quotas, view cryptographic audit histories, modify subscription tiers, and control access permissions
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-surface-darker/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-main/40" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
          />
        </div>

        {/* Plan Filter & Sorting */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-main/60 font-semibold">Plan:</span>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-surface-darker bg-surface/60 text-xs font-bold text-text-main focus:outline-none"
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-main/60 font-semibold">Sort:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-surface-darker bg-surface/60 text-xs font-bold text-text-main focus:outline-none"
            >
              <option value="joined">Joined Date</option>
              <option value="verifications">Verifications Count</option>
              <option value="last_active">Last Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface/50 border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Email Address</th>
                <th className="py-3 px-3">Plan Tier</th>
                <th className="py-3 px-3">Joined Date</th>
                <th className="py-3 px-3">Verifications</th>
                <th className="py-3 px-3">Today / Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-darker/50 font-medium">
              {users.map((u) => (
                <tr key={u.id} className={cn('hover:bg-surface/40 transition-colors', u.banned && 'bg-error-light/30')}>
                  <td className="py-3.5 px-3 font-bold text-text-main whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{u.name}</span>
                      {u.role === 'admin' && (
                        <span className="px-1.5 py-0.5 rounded bg-primary text-white text-[9px] font-black uppercase">
                          Admin
                        </span>
                      )}
                      {u.banned && (
                        <span className="px-1.5 py-0.5 rounded bg-error text-white text-[9px] font-black uppercase">
                          Banned
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-text-main/70 whitespace-nowrap">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border',
                        u.plan === 'business'
                          ? 'bg-primary-light text-primary border-primary/20'
                          : u.plan === 'pro'
                          ? 'bg-success-light text-success border-success/20'
                          : 'bg-surface text-text-main/70 border-surface-darker'
                      )}
                    >
                      {u.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-text-main/60 whitespace-nowrap">
                    {new Date(u.joined).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-text-main whitespace-nowrap">
                    {u.verifications.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="text-text-main font-bold">{u.verification_count_today} today</span>
                  </td>
                  <td className="py-3.5 px-3 text-right whitespace-nowrap space-x-1">
                    {/* View Details */}
                    <button
                      type="button"
                      onClick={() => handleOpenDetails(u)}
                      className="px-2 py-1 rounded-lg border border-surface-darker hover:bg-surface text-text-main font-semibold text-[11px]"
                    >
                      Audit Log
                    </button>

                    {/* Upgrade */}
                    <button
                      type="button"
                      onClick={() => {
                        setUpgradeUser(u);
                        setSelectedPlanUpgrade(u.plan === 'free' ? 'pro' : 'business');
                      }}
                      className="px-2 py-1 rounded-lg border border-primary/30 text-primary hover:bg-primary-light font-semibold text-[11px]"
                    >
                      Upgrade
                    </button>

                    {/* Downgrade (if not free) */}
                    {u.plan !== 'free' && (
                      <button
                        type="button"
                        onClick={() => setDowngradeUser(u)}
                        className="px-2 py-1 rounded-lg border border-surface-darker text-text-main/60 hover:bg-surface font-semibold text-[11px]"
                        title="Downgrade to Free"
                      >
                        Free
                      </button>
                    )}

                    {/* Reset Daily */}
                    <button
                      type="button"
                      onClick={() => handleResetDaily(u)}
                      className="p-1 rounded-lg border border-surface-darker hover:bg-surface text-text-main/70"
                      title="Reset Daily Quota to 0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    {/* Ban / Unban */}
                    <button
                      type="button"
                      onClick={() => setBanUserConfirm(u)}
                      className={cn(
                        'p-1 rounded-lg border transition-colors',
                        u.banned
                          ? 'border-success/30 text-success hover:bg-success-light'
                          : 'border-error/30 text-error hover:bg-error-light'
                      )}
                      title={u.banned ? 'Unban User' : 'Ban User'}
                    >
                      {u.banned ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLIDE-OUT PANEL: USER DETAILS */}
      {selectedUserDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-surface-darker">
              <div>
                <h3 className="text-lg font-black text-text-main">
                  {selectedUserDetails.user.name}
                </h3>
                <p className="text-xs text-text-main/60">{selectedUserDetails.user.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserDetails(null)}
                className="p-1.5 rounded-lg text-text-main/50 hover:bg-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Meta Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-surface rounded-2xl border border-surface-darker">
                <span className="text-text-main/50 font-semibold block text-[10px] uppercase">Plan Tier</span>
                <span className="font-bold text-primary text-sm capitalize">
                  {selectedUserDetails.user.plan}
                </span>
              </div>
              <div className="p-3 bg-surface rounded-2xl border border-surface-darker">
                <span className="text-text-main/50 font-semibold block text-[10px] uppercase">Lifetime Audits</span>
                <span className="font-bold text-text-main text-sm">
                  {selectedUserDetails.user.verifications}
                </span>
              </div>
            </div>

            {/* Verifications History */}
            <div>
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <FileCheck2 className="w-4 h-4 text-primary" />
                <span>Recent Verifications</span>
              </h4>
              <div className="space-y-2">
                {selectedUserDetails.verifications.map((v) => (
                  <div
                    key={v.id}
                    className="p-3 bg-surface/50 border border-surface-darker rounded-xl text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-text-main">{v.doc_type}</div>
                      <div className="text-[10px] text-text-main/50">
                        {new Date(v.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-success-light text-success font-bold text-[10px]">
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment History */}
            <div>
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Payment Invoices</span>
              </h4>
              <div className="space-y-2">
                {selectedUserDetails.payments.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-surface/50 border border-surface-darker rounded-xl text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-text-main uppercase">{p.plan} Subscription</div>
                      <div className="text-[10px] text-text-main/50">Amount: ₹{p.amount}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-success-light text-success font-bold text-[10px] uppercase">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* API Keys (if business) */}
            {selectedUserDetails.user.plan === 'business' && (
              <div>
                <h4 className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <KeyRound className="w-4 h-4 text-primary" />
                  <span>Developer API Credentials</span>
                </h4>
                <div className="space-y-2">
                  {selectedUserDetails.api_keys.map((k, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-surface/50 border border-surface-darker rounded-xl text-xs"
                    >
                      <div className="font-bold text-text-main">{k.name}</div>
                      <div className="font-mono text-[11px] text-text-main/70 mt-0.5">{k.key}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: UPGRADE PLAN */}
      {upgradeUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-text-main">
              Upgrade Subscription for {upgradeUser.name}
            </h3>
            <p className="text-xs text-text-main/70">
              Select the new plan tier to allocate to <strong>{upgradeUser.email}</strong>.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedPlanUpgrade('pro')}
                className={cn(
                  'p-3 rounded-xl border text-left',
                  selectedPlanUpgrade === 'pro'
                    ? 'border-primary bg-primary-light/40 ring-2 ring-primary/20'
                    : 'border-surface-darker bg-surface/50'
                )}
              >
                <div className="text-xs font-bold text-text-main">Pro Unlimited</div>
                <div className="text-sm font-black text-primary">₹{proPrice} / mo</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlanUpgrade('business')}
                className={cn(
                  'p-3 rounded-xl border text-left',
                  selectedPlanUpgrade === 'business'
                    ? 'border-primary bg-primary-light/40 ring-2 ring-primary/20'
                    : 'border-surface-darker bg-surface/50'
                )}
              >
                <div className="text-xs font-bold text-text-main">Business Enterprise</div>
                <div className="text-sm font-black text-primary">₹{businessPrice.toLocaleString('en-IN')} / mo</div>
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setUpgradeUser(null)}
                className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmUpgrade}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DOWNGRADE CONFIRM */}
      {downgradeUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-text-main">Revert to Free Tier</h3>
            <p className="text-xs text-text-main/70">
              Are you sure you want to downgrade <strong>{downgradeUser.email}</strong> to Free? They will lose batch verification and developer API key access.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDowngradeUser(null)}
                className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDowngrade}
                className="px-4 py-2 rounded-xl bg-text-main text-white text-xs font-bold hover:bg-black"
              >
                Downgrade to Free
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BAN / UNBAN CONFIRM */}
      {banUserConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-error-light text-error">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-text-main">
                  {banUserConfirm.banned ? 'Unban Account' : 'Ban Citizen Account'}
                </h3>
                <p className="text-xs text-text-main/60">{banUserConfirm.email}</p>
              </div>
            </div>

            <p className="text-xs text-text-main/70">
              {banUserConfirm.banned
                ? 'Unbanning this user will restore their ability to authenticate and verify digital certificates.'
                : 'Banning this user will immediately terminate all active sessions, invalidate API tokens, and block further PDF verification requests.'}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBanUserConfirm(null)}
                className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleToggleBan(banUserConfirm)}
                className={cn(
                  'px-4 py-2 rounded-xl text-white text-xs font-bold',
                  banUserConfirm.banned ? 'bg-success hover:bg-emerald-700' : 'bg-error hover:bg-red-700'
                )}
              >
                {banUserConfirm.banned ? 'Confirm Unban' : 'Confirm Ban'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
