'use client';

import * as React from 'react';
import {
  Sparkles,
  QrCode,
  Copy,
  Check,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Lock,
  X,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchPublicSettings } from '@/lib/api';

interface UpiPaymentFlowModalProps {
  isOpen: boolean;
  onClose?: () => void;
  canDismiss?: boolean;
  initialPlan?: 'pro' | 'business';
  userEmail?: string;
  userName?: string;
}

export function UpiPaymentFlowModal({
  isOpen,
  onClose,
  canDismiss = false,
  initialPlan = 'pro',
  userEmail = '',
  userName = '',
}: UpiPaymentFlowModalProps) {
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [selectedPlan, setSelectedPlan] = React.useState<'pro' | 'business'>(initialPlan);

  // Settings
  const [upiId, setUpiId] = React.useState<string>('veriseal.pay@icici');
  const [upiQrUrl, setUpiQrUrl] = React.useState<string>('');
  const [qrError, setQrError] = React.useState<boolean>(false);
  const [proPrice, setProPrice] = React.useState<number>(199);
  const [bizPrice, setBizPrice] = React.useState<number>(2499);
  const [copiedUpi, setCopiedUpi] = React.useState<boolean>(false);

  // Form state
  const [fullName, setFullName] = React.useState<string>(userName || '');
  const [email, setEmail] = React.useState<string>(userEmail || '');
  const [upiTxnId, setUpiTxnId] = React.useState<string>('');
  const [screenshotFile, setScreenshotFile] = React.useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = React.useState<string | null>(null);

  // Status
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Load prices & UPI info from /api/settings
  const loadSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const s = await res.json();
        if (s.upi_id) setUpiId(s.upi_id);
        if (s.upi_qr_url) setUpiQrUrl(s.upi_qr_url);
        if (s.pro_price) setProPrice(Number(s.pro_price));
        if (s.business_price) setBizPrice(Number(s.business_price));
      }
    } catch (e) {
      console.debug('Using fallback payment settings:', e);
    }
  };

  React.useEffect(() => {
    loadSettings();
  }, [isOpen]);

  React.useEffect(() => {
    if (userName && !fullName) setFullName(userName);
    if (userEmail && !email) setEmail(userEmail);
  }, [userName, userEmail, fullName, email]);

  if (!isOpen) return null;

  const currentAmount = selectedPlan === 'business' ? bizPrice : proPrice;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
      setErrorMessage('Please upload a valid JPG or PNG image screenshot.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Screenshot exceeds maximum 5MB size limit.');
      return;
    }

    setErrorMessage(null);
    setScreenshotFile(file);
    setScreenshotPreview(URL.createObjectURL(file));
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 12-digit transaction ID validation
    const cleanTxn = upiTxnId.trim();
    const txnRegex = /^\d{12}$/;
    if (!txnRegex.test(cleanTxn)) {
      setErrorMessage('UPI Transaction ID / UTR must be exactly 12 numeric digits.');
      return;
    }

    if (!screenshotFile) {
      setErrorMessage('Please attach a screenshot of your successful UPI payment.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload screenshot
      const uploadFormData = new FormData();
      uploadFormData.append('file', screenshotFile);
      uploadFormData.append('txn_id', cleanTxn);

      const uploadRes = await fetch('/api/upload-screenshot', {
        method: 'POST',
        body: uploadFormData,
      });

      const uploadJson = await uploadRes.json();
      const uploadedScreenshotUrl = uploadJson.url || 'https://veriseal.in/proofs/default.png';

      // 2. Insert to payment_requests table
      const paymentRes = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          amount: currentAmount,
          upi_txn_id: cleanTxn,
          name: fullName.trim(),
          email: email.trim(),
          screenshot_url: uploadedScreenshotUrl,
        }),
      });

      if (!paymentRes.ok) {
        throw new Error('Failed to record payment request.');
      }

      // 3. Trigger user confirmation (3a) and admin alert (3d) emails
      try {
        await fetch('/api/email/payment-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName.trim(),
            email: email.trim(),
            plan: selectedPlan,
            amount: currentAmount,
            txn_id: cleanTxn,
            screenshot_url: uploadedScreenshotUrl,
          }),
        });
      } catch (emailErr) {
        console.warn('Email dispatch warning:', emailErr);
      }

      // Success screen
      setStep(4);
    } catch (err) {
      console.error('Payment submission failed:', err);
      setErrorMessage('Network error submitting payment proof. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-surface-darker rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in my-8">
        {/* Optional close button if allowed */}
        {canDismiss && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-xl text-text-main/50 hover:bg-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* STEP 1: UPGRADE MODAL */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Limit Reached</span>
              </span>
              <h2 className="text-2xl font-black text-text-main tracking-tight">
                Upgrade to Continue Verifying
              </h2>
              <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                You have reached your 3 free daily verifications. Choose a subscription to unlock unlimited instant validations.
              </p>
            </div>

            {/* Plan selection cards */}
            <div className="space-y-3">
              {/* Pro Plan Card */}
              <button
                type="button"
                onClick={() => setSelectedPlan('pro')}
                className={cn(
                  'w-full p-4 rounded-2xl border text-left transition-all relative flex items-start justify-between',
                  selectedPlan === 'pro'
                    ? 'border-primary bg-primary-light/30 ring-2 ring-primary/20 shadow-xs'
                    : 'border-surface-darker hover:border-text-main/20 bg-surface/30'
                )}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-text-main">Pro Unlimited</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-black uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                  <p className="text-xs text-text-main/60 mt-0.5">
                    For advocates, CAs, CSC centers &amp; daily document checkers.
                  </p>
                  <ul className="mt-2 text-[11px] text-text-main/80 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-primary" />
                      <span>Unlimited PDF verifications</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-primary" />
                      <span>LTV green-tick stamping &amp; download</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-primary" />
                      <span>Batch verification (up to 20 files)</span>
                    </li>
                  </ul>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-black text-primary">₹{proPrice}</div>
                  <div className="text-[10px] text-text-main/50 font-semibold">/ month</div>
                </div>
              </button>

              {/* Business Plan Card */}
              <button
                type="button"
                onClick={() => setSelectedPlan('business')}
                className={cn(
                  'w-full p-4 rounded-2xl border text-left transition-all relative flex items-start justify-between',
                  selectedPlan === 'business'
                    ? 'border-primary bg-primary-light/30 ring-2 ring-primary/20 shadow-xs'
                    : 'border-surface-darker hover:border-text-main/20 bg-surface/30'
                )}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-text-main">Business Enterprise</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-darker text-text-main text-[9px] font-black uppercase tracking-wider">
                      API Access
                    </span>
                  </div>
                  <p className="text-xs text-text-main/60 mt-0.5">
                    For fintechs, portals &amp; verification platforms.
                  </p>
                  <ul className="mt-2 text-[11px] text-text-main/80 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-primary" />
                      <span>Developer REST API (500 calls/day)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-primary" />
                      <span>Dedicated in-memory execution queue</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-primary" />
                      <span>Webhook signature callbacks</span>
                    </li>
                  </ul>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-black text-text-main">₹{bizPrice}</div>
                  <div className="text-[10px] text-text-main/50 font-semibold">/ month</div>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span>Continue with {selectedPlan.toUpperCase()} Plan (₹{currentAmount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT INSTRUCTIONS MODAL */}
        {step === 2 && (
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-main/60 hover:text-text-main"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Plans</span>
            </button>

            <div className="text-center">
              <h2 className="text-xl font-black text-text-main">Scan &amp; Pay via UPI</h2>
              <p className="text-xs text-text-main/60 mt-0.5">
                Amount to pay: <strong className="text-primary font-black text-base">₹{currentAmount}</strong> for {selectedPlan.toUpperCase()} Plan
              </p>
            </div>

            {/* UPI QR Display */}
            <div className="p-5 bg-surface/60 border border-surface-darker rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-44 h-44 bg-white border-2 border-surface-darker rounded-2xl flex items-center justify-center p-2 shadow-xs relative overflow-hidden">
                {upiQrUrl && !qrError ? (
                  <img
                    src={upiQrUrl}
                    alt="Official UPI QR Code"
                    onError={() => setQrError(true)}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                      `upi://pay?pa=${upiId}&pn=VeriSeal&am=${currentAmount}&cu=INR`
                    )}`}
                    alt="Generated Scannable UPI QR Code"
                    className="w-full h-full object-contain rounded-xl"
                  />
                )}
              </div>

              {upiQrUrl && !qrError && (
                <a
                  href={upiQrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-primary hover:underline font-semibold mt-2 inline-flex items-center gap-1"
                >
                  <span>View Full Size QR</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {/* Direct UPI app launch link */}
              <a
                href={`upi://pay?pa=${upiId}&pn=VeriSeal&am=${currentAmount}&cu=INR`}
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-light text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-colors border border-primary/20 shadow-2xs"
              >
                <span>Pay via UPI App (GPay / PhonePe)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* UPI ID with copy button */}
              <div className="mt-4 w-full">
                <div className="text-[11px] font-bold text-text-main/60 mb-1">Official Treasury UPI ID:</div>
                <div className="flex items-center justify-between bg-white border border-surface-darker rounded-xl px-3 py-2 text-xs font-mono font-bold text-text-main">
                  <span>{upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="text-primary hover:text-primary-hover p-1"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 5 Instructions */}
            <div className="p-4 bg-surface/30 rounded-2xl border border-surface-darker text-xs text-text-main/80 space-y-1.5 font-medium">
              <div className="font-bold text-text-main text-[11px] uppercase mb-1">Payment Instructions:</div>
              <p>1. Open any UPI app (GPay, PhonePe, Paytm, BHIM).</p>
              <p>2. Scan the QR code above or enter the official UPI ID.</p>
              <p>3. Pay exact amount: <strong>₹{currentAmount}</strong>.</p>
              <p>4. Take a screenshot of the payment confirmation screen.</p>
              <p>5. Click &quot;I Have Paid&quot; below to submit your receipt.</p>
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full py-3.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span>I Have Paid &rarr; Submit Confirmation</span>
            </button>
          </div>
        )}

        {/* STEP 3: SCREENSHOT SUBMIT FORM */}
        {step === 3 && (
          <form onSubmit={handleSubmitProof} className="space-y-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-main/60 hover:text-text-main mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to UPI Details</span>
            </button>

            <div>
              <h2 className="text-xl font-black text-text-main">Submit Payment Proof</h2>
              <p className="text-xs text-text-main/60 mt-0.5">
                We review UTR references and activate accounts within 24 hours
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-error-light border border-error/20 text-error rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Citizen / Advocate Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="citizen@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            {/* UPI Txn ID (12 digits) */}
            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                UPI Reference Number (12-Digit UTR) <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={12}
                placeholder="e.g. 428901238910"
                value={upiTxnId}
                onChange={(e) => setUpiTxnId(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main font-mono font-bold focus:outline-none focus:border-primary"
              />
              <p className="text-[10px] text-text-main/50 mt-1">
                Must be exactly 12 digits found in your Google Pay, PhonePe, or Paytm receipt.
              </p>
            </div>

            {/* Screenshot upload */}
            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Payment Screenshot (Max 5MB, JPG/PNG) <span className="text-error">*</span>
              </label>
              <div className="border-2 border-dashed border-surface-darker rounded-2xl p-4 text-center hover:border-primary/40 transition-colors bg-surface/20">
                {screenshotPreview ? (
                  <div className="space-y-2">
                    <img
                      src={screenshotPreview}
                      alt="Screenshot preview"
                      className="max-h-32 mx-auto rounded-lg object-contain border border-surface-darker"
                    />
                    <div className="text-[11px] text-text-main font-semibold">
                      {screenshotFile?.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setScreenshotFile(null);
                        setScreenshotPreview(null);
                      }}
                      className="text-xs text-error hover:underline"
                    >
                      Remove and choose another
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <Upload className="w-6 h-6 mx-auto text-primary mb-1.5" />
                    <span className="text-xs font-bold text-text-main block">
                      Click to upload payment screenshot
                    </span>
                    <span className="text-[11px] text-text-main/50">JPG, PNG up to 5MB</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleScreenshotChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Hidden fields */}
            <input type="hidden" name="plan" value={selectedPlan} />
            <input type="hidden" name="amount" value={currentAmount} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting Verification...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Payment Verification (₹{currentAmount})</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 4: SUCCESS SCREEN */}
        {step === 4 && (
          <div className="text-center py-6 space-y-4">
            <div className="h-16 w-16 bg-success-light text-success rounded-3xl flex items-center justify-center mx-auto border border-success/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-black text-text-main tracking-tight">
              Request Submitted!
            </h2>

            <p className="text-xs sm:text-sm text-text-main/70 max-w-sm mx-auto leading-relaxed">
              We review payment submissions within <strong>24 hours</strong>. You will receive an email confirmation once your account is active.
            </p>

            <div className="p-4 bg-surface/50 rounded-2xl border border-surface-darker text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-text-main/60">Selected Plan:</span>
                <strong className="capitalize">{selectedPlan}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-text-main/60">Amount:</span>
                <strong>₹{currentAmount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-text-main/60">Transaction ID:</span>
                <strong className="font-mono">{upiTxnId}</strong>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/dashboard/payment"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
              >
                <span>Check Status in Dashboard &rarr;</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
