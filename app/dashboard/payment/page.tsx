'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Receipt,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  QrCode,
  Copy,
  Check,
  Upload,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { fetchPublicSettings } from '@/lib/api';

interface PaymentRecord {
  id: string;
  plan: string;
  amount: number;
  upi_txn_id: string;
  screenshot_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_note?: string;
  created_at: string;
  updated_at?: string;
}

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams?.get('plan') || 'pro';

  const [paymentEnabled, setPaymentEnabled] = React.useState<boolean>(true);
  const [loadingSettings, setLoadingSettings] = React.useState<boolean>(true);
  const [payments, setPayments] = React.useState<PaymentRecord[]>([]);
  const [copiedUpi, setCopiedUpi] = React.useState<boolean>(false);

  // Form State
  const [selectedPlan, setSelectedPlan] = React.useState<string>(initialPlan);
  const [upiTxnId, setUpiTxnId] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string>('');

  const [upiId, setUpiId] = React.useState<string>('veriseal.pay@icici');
  const [proPrice, setProPrice] = React.useState<number>(199);
  const [businessPrice, setBusinessPrice] = React.useState<number>(2499);

  // Load public settings & existing payment requests
  React.useEffect(() => {
    async function init() {
      try {
        const s = await fetchPublicSettings();
        setPaymentEnabled(s.payment_enabled);
        if (s.pro_price) setProPrice(Number(s.pro_price));
        if (s.business_price) setBusinessPrice(Number(s.business_price));
        if (s.upi_id) setUpiId(s.upi_id);
      } catch (e) {
        console.debug('Failed to load settings in payment page:', e);
      } finally {
        setLoadingSettings(false);
      }

      try {
        const res = await fetch('/api/payments');
        if (res.ok) {
          const json = await res.json();
          if (json.payments) {
            setPayments(json.payments);
          }
        }
      } catch (e) {
        console.debug('Failed to load payments:', e);
      }
    }
    init();
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const getAmountForPlan = (plan: string) => {
    if (plan === 'business') return businessPrice;
    return proPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiTxnId.trim() || upiTxnId.trim().length < 8) {
      setSubmitError('Please enter a valid 12-digit UPI reference / UTR number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          amount: getAmountForPlan(selectedPlan),
          upi_txn_id: upiTxnId.trim(),
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitSuccess(true);
        setPayments((prev) => [json.payment, ...prev]);
        setUpiTxnId('');
      } else {
        setSubmitError(json.error || 'Failed to submit payment request. Please try again.');
      }
    } catch (err) {
      setSubmitError('Network error connecting to payment gateway.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Payment &amp; Subscription Status
        </h1>
        <p className="text-xs sm:text-sm text-text-main/70 mt-1">
          Review past UPI transactions, subscription activation approvals, or submit a new payment proof
        </p>
      </div>

      {/* Info Notice when in Public Mode */}
      {!loadingSettings && !paymentEnabled && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong>Public Service Tier Active:</strong> Standard digital signature verification is currently free for all Indian citizens. Direct UPI submissions below are processed manually by accounts administration within 24 hours.
            </div>
          </div>
        </div>
      )}

      {/* Grid: Submit Payment & UPI Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: UPI Payment Instructions (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-primary-light text-primary">
                <QrCode className="w-5 h-5" />
              </span>
              <h2 className="text-base font-black text-text-main">Scan &amp; Pay via UPI</h2>
            </div>

            <p className="text-xs text-text-main/70 mb-4">
              Pay securely via Google Pay, PhonePe, Paytm, or any BHIM-UPI application directly to VeriSeal Official Treasury.
            </p>

            {/* UPI QR Mock Display */}
            <div className="bg-surface/60 border border-surface-darker rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-36 h-36 bg-white border-2 border-text-main/10 rounded-xl flex items-center justify-center p-2 shadow-inner">
                {/* SVG QR Visual */}
                <svg
                  className="w-full h-full text-text-main"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="3" height="3" />
                  <rect x="18" y="18" width="3" height="3" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                  <line x1="17" y1="7" x2="17.01" y2="7" />
                  <line x1="7" y1="17" x2="7.01" y2="17" />
                </svg>
              </div>

              <div className="mt-4 w-full">
                <div className="text-[11px] font-semibold text-text-main/50 mb-1">Official UPI ID:</div>
                <div className="flex items-center justify-between bg-white border border-surface-darker rounded-xl px-3 py-2 text-xs font-mono font-bold text-text-main">
                  <span>{upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="text-primary hover:text-primary-hover transition-colors p-1"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-surface-darker text-[11px] text-text-main/60 space-y-1">
            <p>1. Open your UPI app and transfer the plan amount.</p>
            <p>2. Note the 12-digit UTR / UPI Transaction Reference.</p>
            <p>3. Submit the form on the right for automatic admin verification.</p>
          </div>
        </div>

        {/* Right: Submit Payment Reference Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
          <h2 className="text-base font-black text-text-main mb-1">Submit Payment Details</h2>
          <p className="text-xs text-text-main/70 mb-5">
            After completing your transfer, submit your UPI Transaction ID below for manual verification.
          </p>

          {submitSuccess && (
            <div className="mb-5 p-4 rounded-2xl bg-success-light border border-success/20 text-success text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>Payment proof submitted successfully!</strong>
                <p className="text-[11px] mt-0.5 text-success/90">
                  Our verification desk will validate the transaction and upgrade your account within 24 hours.
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="mb-5 p-4 rounded-2xl bg-error-light border border-error/20 text-error text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Plan Selector */}
            <div>
              <label className="block text-xs font-bold text-text-main mb-1.5">
                Select Subscription Plan
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('pro')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlan === 'pro'
                      ? 'border-primary bg-primary-light/30 ring-2 ring-primary/20'
                      : 'border-surface-darker bg-surface/30 hover:border-text-main/20'
                  }`}
                >
                  <div className="text-xs font-bold text-text-main">Pro Unlimited</div>
                  <div className="text-sm font-black text-primary mt-0.5">₹{proPrice} / mo</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('business')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlan === 'business'
                      ? 'border-primary bg-primary-light/30 ring-2 ring-primary/20'
                      : 'border-surface-darker bg-surface/30 hover:border-text-main/20'
                  }`}
                >
                  <div className="text-xs font-bold text-text-main">Business Enterprise</div>
                  <div className="text-sm font-black text-primary mt-0.5">₹{businessPrice.toLocaleString('en-IN')} / mo</div>
                </button>
              </div>
            </div>

            {/* UPI Transaction ID Input */}
            <div>
              <label className="block text-xs font-bold text-text-main mb-1.5">
                UPI Reference Number (UTR / 12-digit Txn ID)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 428901238910"
                value={upiTxnId}
                onChange={(e) => setUpiTxnId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main font-mono focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
              <p className="text-[11px] text-text-main/50 mt-1">
                Found in your banking app or UPI transaction receipt details.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover disabled:opacity-50 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting Transaction...</span>
              ) : (
                <>
                  <Receipt className="w-4 h-4" />
                  <span>Submit Payment Verification</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Payment Requests Table */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
        <div className="pb-4 border-b border-surface-darker">
          <h2 className="text-base font-black text-text-main">Your Payment History</h2>
          <p className="text-xs text-text-main/60 mt-0.5">
            Status of all submitted UPI transaction verifications
          </p>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Plan</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">UPI Txn ID</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Admin Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-darker/50 font-medium">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-text-main/50 text-xs">
                    No payment requests submitted yet.
                  </td>
                </tr>
              ) : (
                payments.map((p) => {
                  const dateStr = new Date(p.created_at).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={p.id} className="hover:bg-surface/40 transition-colors">
                      <td className="py-3.5 px-3 text-text-main/70 whitespace-nowrap">{dateStr}</td>
                      <td className="py-3.5 px-3 font-bold text-text-main capitalize whitespace-nowrap">
                        {p.plan}
                      </td>
                      <td className="py-3.5 px-3 font-black text-text-main whitespace-nowrap">
                        ₹{p.amount}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-text-main/80 whitespace-nowrap">
                        {p.upi_txn_id}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {p.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warning-light text-warning font-bold text-[11px]">
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </span>
                        )}
                        {p.status === 'approved' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success-light text-success font-bold text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approved</span>
                          </span>
                        )}
                        {p.status === 'rejected' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-light text-error font-bold text-[11px]">
                            <XCircle className="w-3 h-3" />
                            <span>Rejected</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-xs">
                        {p.status === 'pending' && (
                          <span className="text-warning font-medium">We will review within 24 hours</span>
                        )}
                        {p.status === 'approved' && (
                          <span className="text-success font-medium">
                            Active since {dateStr}
                          </span>
                        )}
                        {p.status === 'rejected' && (
                          <span className="text-error font-semibold">
                            {p.admin_note || 'UTR mismatch with ICICI statement'}
                          </span>
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
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <React.Suspense
      fallback={
        <div className="max-w-5xl space-y-6">
          <div className="h-10 w-64 bg-surface-darker/40 rounded-xl animate-pulse" />
          <div className="h-64 w-full bg-surface-darker/20 rounded-3xl animate-pulse" />
        </div>
      }
    >
      <PaymentStatusContent />
    </React.Suspense>
  );
}

