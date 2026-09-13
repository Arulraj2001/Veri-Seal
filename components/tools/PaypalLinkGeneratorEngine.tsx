'use client';

import * as React from 'react';
import {
  CreditCard,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Download,
  Sparkles,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import QRCode from 'qrcode';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'SGD', symbol: 'SG$', name: 'Singapore Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export function PaypalLinkGeneratorEngine() {
  const [username, setUsername] = React.useState<string>('mybusiness');
  const [amount, setAmount] = React.useState<string>('25');
  const [currency, setCurrency] = React.useState<string>('USD');
  const [isFlexible, setIsFlexible] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [qrDataUrl, setQrDataUrl] = React.useState<string>('');

  // Clean username
  const cleanUser = username.trim().replace(/^@/, '').replace(/[^a-zA-Z0-9._-]/g, '');

  // Generated Link
  const paypalUrl = React.useMemo(() => {
    if (!cleanUser) return '';
    if (isFlexible || !amount || parseFloat(amount) <= 0) {
      return `https://paypal.me/${cleanUser}`;
    }
    return `https://paypal.me/${cleanUser}/${amount}${currency}`;
  }, [cleanUser, amount, currency, isFlexible]);

  // Generate QR Code
  React.useEffect(() => {
    if (!paypalUrl) {
      setQrDataUrl('');
      return;
    }
    QRCode.toDataURL(paypalUrl, {
      width: 400,
      margin: 2,
      color: { dark: '#003087', light: '#FFFFFF' }, // PayPal Blue
    })
      .then((u) => setQrDataUrl(u))
      .catch((err) => console.error(err));
  }, [paypalUrl]);

  const copyUrl = async () => {
    if (!paypalUrl) return;
    try {
      await navigator.clipboard.writeText(paypalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `paypal-qr-${cleanUser}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-surface-darker">
              <CreditCard className="w-5 h-5 text-[#003087]" />
              <h3 className="text-base font-bold text-text-main">
                Configure PayPal.me Payment Link
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main flex items-center justify-between">
                <span>PayPal Username or Handle *</span>
                <span className="text-[11px] text-text-main/50">paypal.me/yourname</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-bold text-text-main/50">
                  paypal.me/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourhandle"
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm font-mono font-bold rounded-2xl pl-24 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                />
              </div>
            </div>

            {/* Payment Amount Type Toggle */}
            <div className="flex items-center gap-4 text-xs font-bold pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="amtType"
                  checked={!isFlexible}
                  onChange={() => setIsFlexible(false)}
                  className="accent-primary"
                />
                <span>Fixed Amount Payment</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="amtType"
                  checked={isFlexible}
                  onChange={() => setIsFlexible(true)}
                  className="accent-primary"
                />
                <span>Flexible Amount / Donation / Tip</span>
              </label>
            </div>

            {!isFlexible && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-main">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="25.00"
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm font-mono font-bold rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-main">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs font-bold rounded-xl p-3 focus:outline-none"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol}) - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Output & QR Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                PayPal Payment Link
              </span>
              <span className="text-[10px] bg-blue-50 text-[#003087] font-bold px-2 py-0.5 rounded">
                1-Click Pay
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <span className="text-[10px] font-mono uppercase text-text-main/50">Link:</span>
              <p className="text-xs font-mono font-bold text-text-main break-all leading-relaxed select-all">
                {paypalUrl || 'Enter username above'}
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={copyUrl}
                disabled={!paypalUrl}
                className="w-full py-3 rounded-2xl bg-[#0070BA] hover:bg-[#003087] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied Payment Link!' : 'Copy PayPal Link'}
              </button>

              {paypalUrl && (
                <a
                  href={paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  Test Payment Page <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              )}
            </div>

            {/* QR Code */}
            {qrDataUrl && (
              <div className="pt-3 border-t border-surface-darker text-center space-y-2">
                <span className="text-xs font-bold text-text-main">Checkout Counter QR Code</span>
                <div className="w-36 h-36 mx-auto p-1.5 bg-white rounded-xl border border-surface-darker shadow-2xs flex items-center justify-center">
                  <img src={qrDataUrl} alt="PayPal QR Code" className="w-full h-full object-contain" />
                </div>
                <button
                  type="button"
                  onClick={downloadQr}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#003087] hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <Download className="w-3.5 h-3.5" /> Download QR Code (PNG)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
