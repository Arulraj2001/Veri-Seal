'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  CreditCard,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Check,
  X,
  UserCheck,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentRequest {
  id: string;
  name: string;
  email: string;
  plan: 'pro' | 'business';
  amount: number;
  upi_txn_id: string;
  screenshot_url: string;
  submitted: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_note?: string;
  expiry_date?: string;
}

export default function AdminPaymentsPage() {
  const [paymentEnabled, setPaymentEnabled] = React.useState<boolean>(false);
  const [toggleState, setToggleState] = React.useState<boolean>(false);
  const [isSavingToggle, setIsSavingToggle] = React.useState<boolean>(false);
  const [toggleSaveMsg, setToggleSaveMsg] = React.useState<string | null>(null);

  const [payments, setPayments] = React.useState<PaymentRequest[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [filter, setFilter] = React.useState<string>('all');
  const [search, setSearch] = React.useState<string>('');

  // Modals state
  const [viewScreenshotUrl, setViewScreenshotUrl] = React.useState<string | null>(null);
  const [approveItem, setApproveItem] = React.useState<PaymentRequest | null>(null);
  const [approveExpiry, setApproveExpiry] = React.useState<string>('2027-12-31');
  const [rejectItem, setRejectItem] = React.useState<PaymentRequest | null>(null);
  const [rejectReason, setRejectReason] = React.useState<string>('');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Manual Upgrade Form State
  const [manualEmail, setManualEmail] = React.useState<string>('');
  const [manualPlan, setManualPlan] = React.useState<'pro' | 'business'>('pro');
  const [manualExpiry, setManualExpiry] = React.useState<string>('2027-12-31');
  const [proPrice, setProPrice] = React.useState<number>(199);
  const [businessPrice, setBusinessPrice] = React.useState<number>(2499);
  const [isManualUpgrading, setIsManualUpgrading] = React.useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load payments & settings
  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/payments');
      if (res.ok) {
        const json = await res.json();
        setPaymentEnabled(json.payment_enabled);
        setToggleState(json.payment_enabled);
        setPayments(json.payments || []);
      }
      try {
        const sRes = await fetch('/api/settings');
        if (sRes.ok) {
          const sJson = await sRes.json();
          if (sJson.pro_price) setProPrice(Number(sJson.pro_price));
          if (sJson.business_price) setBusinessPrice(Number(sJson.business_price));
        }
      } catch (e) {
        console.debug('Failed to load settings in admin payments:', e);
      }
    } catch (err) {
      console.error('Failed to load payments:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  // Save Master Toggle
  const handleSaveToggle = async () => {
    setIsSavingToggle(true);
    setToggleSaveMsg(null);
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_payment_system',
          enabled: toggleState,
        }),
      });

      if (res.ok) {
        setPaymentEnabled(toggleState);
        setToggleSaveMsg('Payment system status updated site-wide.');
        showToast(`Master payment system set to ${toggleState ? 'ON' : 'OFF'}`);
        setTimeout(() => setToggleSaveMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to toggle payment system:', err);
    } finally {
      setIsSavingToggle(false);
    }
  };

  // Approve Payment
  const handleConfirmApprove = async () => {
    if (!approveItem) return;
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          id: approveItem.id,
          expiry_date: approveExpiry,
        }),
      });

      if (res.ok) {
        setPayments((prev) =>
          prev.map((p) =>
            p.id === approveItem.id ? { ...p, status: 'approved', expiry_date: approveExpiry } : p
          )
        );
        showToast(`Payment ${approveItem.id} approved. Confirmation email dispatched.`);
        setApproveItem(null);
      }
    } catch (err) {
      console.error('Approve failed:', err);
    }
  };

  // Reject Payment
  const handleConfirmReject = async () => {
    if (!rejectItem) return;
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          id: rejectItem.id,
          reason: rejectReason || 'Transaction reference number not found in bank ledger.',
        }),
      });

      if (res.ok) {
        setPayments((prev) =>
          prev.map((p) =>
            p.id === rejectItem.id
              ? { ...p, status: 'rejected', admin_note: rejectReason }
              : p
          )
        );
        showToast(`Payment ${rejectItem.id} rejected. Rejection reason notified.`);
        setRejectItem(null);
        setRejectReason('');
      }
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  // Manual Upgrade
  const handleManualUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEmail) return;
    setIsManualUpgrading(true);

    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'manual_upgrade',
          email: manualEmail,
          plan: manualPlan,
          expiry_date: manualExpiry,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setPayments((prev) => [json.payment, ...prev]);
        showToast(`User ${manualEmail} granted ${manualPlan.toUpperCase()} tier!`);
        setManualEmail('');
      }
    } catch (err) {
      console.error('Manual upgrade failed:', err);
    } finally {
      setIsManualUpgrading(false);
    }
  };

  // Filtered Payments
  const filteredPayments = payments.filter((p) => {
    const matchFilter = filter === 'all' || p.status === filter;
    const matchSearch =
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.upi_txn_id.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-text-main text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 border border-white/20 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Payment Processing &amp; Subscriptions
        </h1>
        <p className="text-xs sm:text-sm text-text-main/70 mt-1">
          Control site-wide payment gate toggles, approve manual UPI receipts, and assign enterprise grants
        </p>
      </div>

      {/* MASTER TOGGLE CARD */}
      <div className="bg-white border-2 border-surface-darker/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-primary-light text-primary">
                <CreditCard className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-black text-text-main">Payment System Master Switch</h2>
            </div>
            <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed mt-1">
              When <strong>OFF</strong>, all pricing is hidden site-wide and all users get unlimited access.
              When <strong>ON</strong>, free tier limits apply and UPI payment flow is shown.
            </p>

            <div className="mt-3 text-xs font-bold flex items-center gap-2">
              <span
                className={cn(
                  'inline-block w-2.5 h-2.5 rounded-full',
                  toggleState ? 'bg-primary animate-pulse' : 'bg-success'
                )}
              />
              <span className={toggleState ? 'text-primary font-black' : 'text-success font-black'}>
                {toggleState
                  ? 'Currently ON — Free tier limits apply & UPI flows active'
                  : 'Currently OFF — All users have unlimited free access'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Big Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={toggleState}
              onClick={() => setToggleState(!toggleState)}
              className={cn(
                'w-16 h-9 rounded-full transition-colors relative p-1 focus:outline-none focus:ring-2 focus:ring-primary/20',
                toggleState ? 'bg-primary' : 'bg-surface-darker'
              )}
            >
              <div
                className={cn(
                  'w-7 h-7 bg-white rounded-full shadow-md transition-transform transform',
                  toggleState ? 'translate-x-7' : 'translate-x-0'
                )}
              />
            </button>

            {/* Save Button */}
            <button
              type="button"
              disabled={isSavingToggle}
              onClick={handleSaveToggle}
              className="px-5 py-2.5 rounded-xl bg-text-main text-white hover:bg-black text-xs font-bold transition-all shadow-sm disabled:opacity-50"
            >
              {isSavingToggle ? 'Saving...' : 'Save Switch'}
            </button>
          </div>
        </div>

        {toggleSaveMsg && (
          <div className="mt-4 p-3 rounded-xl bg-success-light text-success text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toggleSaveMsg}</span>
          </div>
        )}
      </div>

      {/* PAYMENT REQUESTS TABLE SECTION */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h2 className="text-base font-black text-text-main">Incoming UPI Payment Requests</h2>
            <p className="text-xs text-text-main/60 mt-0.5">
              Review submitted UTR reference numbers and approve customer subscription access
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-main/40" />
              <input
                type="text"
                placeholder="Search email or txn ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-surface/60 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-1 bg-surface p-1 rounded-xl border border-surface-darker text-[11px]">
              {['all', 'pending', 'approved', 'rejected'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg capitalize font-bold transition-colors',
                    filter === f ? 'bg-white text-primary shadow-xs' : 'text-text-main/60 hover:text-text-main'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface/50 border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">#ID</th>
                <th className="py-3 px-3">Citizen Name</th>
                <th className="py-3 px-3">Email</th>
                <th className="py-3 px-3">Plan</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">UPI Txn ID</th>
                <th className="py-3 px-3">Submitted</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-darker/50 font-medium">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-text-main/40 text-xs">
                    No payment requests matching current filter.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((row) => (
                  <tr key={row.id} className="hover:bg-surface/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] font-bold text-text-main">
                      {row.id}
                    </td>
                    <td className="py-3 px-3 text-text-main font-semibold whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="py-3 px-3 text-text-main/70 whitespace-nowrap">
                      {row.email}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-surface border border-surface-darker text-[10px] font-bold uppercase text-text-main">
                        {row.plan}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-black text-text-main whitespace-nowrap">
                      ₹{row.amount}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-text-main/80 whitespace-nowrap">
                      {row.upi_txn_id}
                    </td>
                    <td className="py-3 px-3 text-text-main/60 whitespace-nowrap text-[11px]">
                      {new Date(row.submitted).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {row.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning-light text-warning text-[10px] font-bold uppercase">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                      {row.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success-light text-success text-[10px] font-bold uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Approved</span>
                        </span>
                      )}
                      {row.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-light text-error text-[10px] font-bold uppercase">
                          <XCircle className="w-3 h-3" />
                          <span>Rejected</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap space-x-1">
                      {/* View Screenshot */}
                      <button
                        type="button"
                        onClick={() => setViewScreenshotUrl(row.screenshot_url)}
                        className="p-1.5 rounded-lg border border-surface-darker hover:bg-surface text-text-main/70"
                        title="View Screenshot Proof"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Approve */}
                      {row.status !== 'approved' && (
                        <button
                          type="button"
                          onClick={() => setApproveItem(row)}
                          className="p-1.5 rounded-lg border border-success/30 bg-success-light text-success hover:bg-success hover:text-white transition-colors"
                          title="Approve Subscription"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Reject */}
                      {row.status !== 'rejected' && (
                        <button
                          type="button"
                          onClick={() => setRejectItem(row)}
                          className="p-1.5 rounded-lg border border-error/30 bg-error-light text-error hover:bg-error hover:text-white transition-colors"
                          title="Reject Request"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MANUAL UPGRADE CARD BELOW TABLE */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-xl bg-primary-light text-primary">
            <UserCheck className="w-5 h-5" />
          </span>
          <h2 className="text-base font-black text-text-main">Administrative Manual Upgrade</h2>
        </div>
        <p className="text-xs text-text-main/70 mb-5">
          Manually grant free Pro or Business access to testing partners, government advocates, or academic reviewers.
        </p>

        <form onSubmit={handleManualUpgrade} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-text-main uppercase mb-1">
              User Email Address
            </label>
            <input
              type="email"
              required
              placeholder="partner@institution.gov.in"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-text-main uppercase mb-1">
              Assign Plan Tier
            </label>
            <select
              value={manualPlan}
              onChange={(e) => setManualPlan(e.target.value as 'pro' | 'business')}
              className="w-full px-3 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main font-semibold focus:outline-none focus:border-primary"
            >
              <option value="pro">Pro Unlimited (₹{proPrice})</option>
              <option value="business">Business Enterprise (₹{businessPrice.toLocaleString('en-IN')})</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-text-main uppercase mb-1">
              Plan Expiration Date
            </label>
            <input
              type="date"
              required
              value={manualExpiry}
              onChange={(e) => setManualExpiry(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
            />
          </div>

          <div className="sm:col-span-4 pt-2">
            <button
              type="submit"
              disabled={isManualUpgrading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isManualUpgrading ? 'Upgrading...' : 'Upgrade User Immediately'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* MODAL 1: VIEW SCREENSHOT */}
      {viewScreenshotUrl && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-text-main">Payment Receipt Proof</h3>
              <button
                type="button"
                onClick={() => setViewScreenshotUrl(null)}
                className="p-1 rounded-lg text-text-main/50 hover:bg-surface"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-surface-darker rounded-2xl overflow-hidden bg-surface flex items-center justify-center p-2 min-h-[260px] relative">
              <img
                src={viewScreenshotUrl}
                alt="Payment proof screenshot"
                className="max-h-80 w-auto rounded-xl object-contain shadow-xs"
              />
            </div>

            <button
              type="button"
              onClick={() => setViewScreenshotUrl(null)}
              className="w-full py-2.5 rounded-xl bg-surface border border-surface-darker text-xs font-bold text-text-main hover:bg-surface-darker"
            >
              Close Viewer
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: APPROVE CONFIRMATION */}
      {approveItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-success-light text-success">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-text-main">Approve Subscription</h3>
                <p className="text-xs text-text-main/60">{approveItem.email}</p>
              </div>
            </div>

            <p className="text-xs text-text-main/80">
              Confirming this request will activate the <strong>{approveItem.plan.toUpperCase()}</strong> subscription for this user and automatically dispatch an activation notification email via Resend API.
            </p>

            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Set Plan Expiry Date
              </label>
              <input
                type="date"
                value={approveExpiry}
                onChange={(e) => setApproveExpiry(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-surface-darker rounded-xl text-text-main"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setApproveItem(null)}
                className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApprove}
                className="px-4 py-2 rounded-xl bg-success text-white text-xs font-bold hover:bg-emerald-700"
              >
                Confirm &amp; Dispatch Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: REJECT CONFIRMATION */}
      {rejectItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-error-light text-error">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-text-main">Reject Payment Request</h3>
                <p className="text-xs text-text-main/60">{rejectItem.email}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Reason for Rejection (Visible to User)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. UTR reference number not found in bank ledger statement."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-error"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectItem(null)}
                className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-error text-white text-xs font-bold hover:bg-red-700"
              >
                Reject &amp; Send Reason
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
