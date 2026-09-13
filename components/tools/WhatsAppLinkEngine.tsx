'use client';

import * as React from 'react';
import {
  MessageCircle,
  Copy,
  Check,
  QrCode,
  Download,
  ExternalLink,
  Phone,
  Sparkles,
  Code2,
  ShieldCheck,
  CheckCheck,
  Send,
  Smartphone,
} from 'lucide-react';
import QRCode from 'qrcode';

interface CountryCode {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

const POPULAR_COUNTRIES: CountryCode[] = [
  { name: 'India', code: 'IN', dialCode: '91', flag: '🇮🇳' },
  { name: 'United States / Canada', code: 'US', dialCode: '1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dialCode: '44', flag: '🇬🇧' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '971', flag: '🇦🇪' },
  { name: 'Australia', code: 'AU', dialCode: '61', flag: '🇦🇺' },
  { name: 'Singapore', code: 'SG', dialCode: '65', flag: '🇸🇬' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '966', flag: '🇸🇦' },
  { name: 'Germany', code: 'DE', dialCode: '49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dialCode: '33', flag: '🇫🇷' },
  { name: 'Malaysia', code: 'MY', dialCode: '60', flag: '🇲🇾' },
  { name: 'South Africa', code: 'ZA', dialCode: '27', flag: '🇿🇦' },
  { name: 'Brazil', code: 'BR', dialCode: '55', flag: '🇧🇷' },
];

export function WhatsAppLinkEngine() {
  const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>(POPULAR_COUNTRIES[0]);
  const [phone, setPhone] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>(
    'Hello! I am inquiring about your services listed on your website.'
  );
  const [copiedLink, setCopiedLink] = React.useState<boolean>(false);
  const [copiedHtml, setCopiedHtml] = React.useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>('');

  // Sanitize phone number (strip spaces, hyphens, brackets, leading + or 0)
  const cleanPhone = React.useMemo(() => {
    let raw = phone.replace(/\D/g, '');
    if (raw.startsWith('0')) raw = raw.replace(/^0+/, '');
    return raw;
  }, [phone]);

  const fullInternationalNumber = React.useMemo(() => {
    if (!cleanPhone) return '';
    return `${selectedCountry.dialCode}${cleanPhone}`;
  }, [selectedCountry.dialCode, cleanPhone]);

  // Generated WhatsApp Link
  const generatedLink = React.useMemo(() => {
    if (!fullInternationalNumber) return '';
    const encoded = encodeURIComponent(message.trim());
    return encoded
      ? `https://wa.me/${fullInternationalNumber}?text=${encoded}`
      : `https://wa.me/${fullInternationalNumber}`;
  }, [fullInternationalNumber, message]);

  // Generate QR Code when link changes
  React.useEffect(() => {
    if (!generatedLink) {
      setQrCodeDataUrl('');
      return;
    }

    QRCode.toDataURL(generatedLink, {
      width: 400,
      margin: 2,
      color: {
        dark: '#128C7E', // WhatsApp Green
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('QR generation failed:', err));
  }, [generatedLink]);

  const copyLink = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch (err) {
      console.error(err);
    }
  };

  const copyHtml = async () => {
    const snippet = `<a href="${generatedLink}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#ffffff;padding:12px 24px;border-radius:24px;text-decoration:none;font-family:sans-serif;font-weight:bold;font-size:14px;box-shadow:0 4px 12px rgba(37,211,102,0.3);">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814h.005c3.179 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.773-5.766zm9.969 5.828c0 5.523-4.477 10-10 10-1.745 0-3.385-.45-4.819-1.238l-7.181 1.884 1.917-7.009c-.838-1.472-1.317-3.176-1.317-4.991 0-5.523 4.477-10 10-10 5.523 0 10 4.477 10 10z"/></svg>
  Chat on WhatsApp
</a>`;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2200);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQrPng = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = `whatsapp-qr-${fullInternationalNumber || 'chat'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Builder Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-surface-darker">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-text-main">
                Configure WhatsApp Chat Link
              </h3>
            </div>

            {/* Country & Phone Number */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main flex items-center justify-between">
                <span>Country &amp; Phone Number (Without 0 or +)</span>
                <span className="text-[11px] font-mono text-emerald-600 font-bold">
                  +{selectedCountry.dialCode}
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <div className="sm:col-span-5">
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const c = POPULAR_COUNTRIES.find((item) => item.code === e.target.value);
                      if (c) setSelectedCountry(c);
                    }}
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs font-semibold rounded-2xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name} (+{c.dialCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-7 relative">
                  <div className="absolute left-3.5 top-3.5 text-xs font-bold text-text-main/50 pointer-events-none">
                    +{selectedCountry.dialCode}
                  </div>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm font-mono font-bold rounded-2xl pl-14 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Pre-filled Message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-text-main">
                <span>Pre-filled Welcome Message</span>
                <span className="font-mono text-[11px] text-text-main/50">
                  {message.length} chars
                </span>
              </div>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type the message your customers will send when opening WhatsApp..."
                className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-none leading-relaxed"
              />
            </div>

            {/* Action Buttons & Link Output */}
            {generatedLink && (
              <div className="space-y-4 pt-2 border-t border-surface-darker">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-main">Generated WhatsApp Direct Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs font-mono rounded-xl px-3 py-2.5 focus:outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={copyLink}
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 shrink-0"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedLink ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <Send className="w-4 h-4" /> Open Chat in WhatsApp <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <button
                    type="button"
                    onClick={copyHtml}
                    className="px-4 py-2.5 rounded-2xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-primary" />
                    {copiedHtml ? 'HTML Copied!' : 'Copy HTML Button'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Phone Mockup & QR Code */}
        <div className="lg:col-span-5 space-y-6">
          {/* Realistic WhatsApp Chat Bubble Simulator */}
          <div className="rounded-3xl border-4 border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden max-w-sm mx-auto">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] text-white p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100/20 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-white/20">
                {selectedCountry.flag}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate">
                  {fullInternationalNumber ? `+${fullInternationalNumber}` : 'Your WhatsApp Business'}
                </p>
                <p className="text-[10px] text-emerald-200">online</p>
              </div>
            </div>

            {/* Chat Body with WhatsApp Pattern */}
            <div className="bg-[#E5DDD5] dark:bg-[#0B141A] p-4 min-h-[220px] flex flex-col justify-end space-y-3 relative">
              <div className="bg-white/80 dark:bg-white/10 text-[10px] text-neutral-600 dark:text-neutral-300 font-bold text-center py-1 px-3 rounded-full mx-auto shadow-2xs">
                TODAY
              </div>

              {/* User Outgoing Chat Bubble */}
              <div className="bg-[#E7FFDB] dark:bg-[#005C4B] text-neutral-900 dark:text-neutral-100 rounded-2xl rounded-tr-none p-3 max-w-[85%] ml-auto shadow-sm space-y-1 relative text-xs">
                <p className="leading-relaxed whitespace-pre-wrap break-words">
                  {message || 'Hello! I would like to get in touch.'}
                </p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-neutral-500 dark:text-neutral-300">
                  <span>{currentTime}</span>
                  <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Chat Input Bar */}
            <div className="bg-neutral-100 dark:bg-neutral-800 p-2.5 flex items-center gap-2">
              <div className="flex-1 bg-white dark:bg-neutral-700 rounded-full px-3.5 py-1.5 text-xs text-neutral-400">
                Message...
              </div>
              <div className="w-8 h-8 rounded-full bg-[#128C7E] text-white flex items-center justify-center">
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* QR Code Card */}
          {qrCodeDataUrl && (
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-text-main">
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp QR Code</span>
              </div>
              <p className="text-[11px] text-text-main/60">
                Print on shop counters, flyers, or business cards for instant contact.
              </p>

              <div className="w-48 h-48 mx-auto p-2 bg-white rounded-2xl border-2 border-emerald-500/30 shadow-sm flex items-center justify-center">
                <img src={qrCodeDataUrl} alt="WhatsApp QR Code" className="w-full h-full object-contain" />
              </div>

              <button
                type="button"
                onClick={downloadQrPng}
                className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold flex items-center justify-center gap-1.5 mx-auto transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                Download High-Res QR Code (PNG)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
