'use client';

import * as React from 'react';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Sparkles,
  Wifi,
  Globe,
  FileText,
  CreditCard,
  User,
  Mail,
  Phone,
  Layers,
  Upload,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import QRCode from 'qrcode';

type QrType = 'url' | 'wifi' | 'upi' | 'vcard' | 'text' | 'email' | 'phone';

export function QrCodeGeneratorEngine() {
  const [qrType, setQrType] = React.useState<QrType>('url');

  // Payload states
  const [url, setUrl] = React.useState<string>('https://kagazo.in');
  const [wifiSsid, setWifiSsid] = React.useState<string>('MyHomeWiFi');
  const [wifiPass, setWifiPass] = React.useState<string>('SecurePassword123');
  const [wifiSecurity, setWifiSecurity] = React.useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = React.useState<boolean>(false);

  const [upiVpa, setUpiVpa] = React.useState<string>('merchant@upi');
  const [upiName, setUpiName] = React.useState<string>('Store Merchant');
  const [upiAmount, setUpiAmount] = React.useState<string>('500');

  const [vcardName, setVcardName] = React.useState<string>('John Doe');
  const [vcardPhone, setVcardPhone] = React.useState<string>('+1 555-0199');
  const [vcardEmail, setVcardEmail] = React.useState<string>('john@example.com');
  const [vcardOrg, setVcardOrg] = React.useState<string>('Acme Corp');

  const [plainText, setPlainText] = React.useState<string>('Welcome to Kagazo tools suite!');
  const [emailTo, setEmailTo] = React.useState<string>('contact@kagazo.in');
  const [emailSubject, setEmailSubject] = React.useState<string>('Inquiry');
  const [phoneNum, setPhoneNum] = React.useState<string>('+919876543210');

  // Styling states
  const [fgColor, setFgColor] = React.useState<string>('#111827');
  const [bgColor, setBgColor] = React.useState<string>('#FFFFFF');
  const [isTransparentBg, setIsTransparentBg] = React.useState<boolean>(false);
  const [errorLevel, setErrorLevel] = React.useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [centerLogo, setCenterLogo] = React.useState<'none' | 'whatsapp' | 'upi' | 'wifi' | 'custom'>('none');
  const [customLogoUrl, setCustomLogoUrl] = React.useState<string | null>(null);

  // Result state
  const [qrPngUrl, setQrPngUrl] = React.useState<string>('');
  const [copied, setCopied] = React.useState<boolean>(false);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Compute Raw String Payload
  const rawPayload = React.useMemo(() => {
    switch (qrType) {
      case 'url':
        return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
      case 'wifi':
        return `WIFI:T:${wifiSecurity};S:${wifiSsid};P:${wifiPass};H:${wifiHidden ? 'true' : 'false'};;`;
      case 'upi':
        const amParam = upiAmount ? `&am=${upiAmount}` : '';
        return `upi://pay?pa=${upiVpa}&pn=${encodeURIComponent(upiName)}${amParam}&cu=INR`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nORG:${vcardOrg}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
      case 'phone':
        return `tel:${phoneNum}`;
      case 'text':
      default:
        return plainText;
    }
  }, [
    qrType,
    url,
    wifiSsid,
    wifiPass,
    wifiSecurity,
    wifiHidden,
    upiVpa,
    upiName,
    upiAmount,
    vcardName,
    vcardOrg,
    vcardPhone,
    vcardEmail,
    emailTo,
    emailSubject,
    phoneNum,
    plainText,
  ]);

  // Render QR Code onto canvas with center logo support
  const renderQrCode = React.useCallback(async () => {
    if (!rawPayload) return;
    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      const actualBg = isTransparentBg ? '#00000000' : bgColor;

      await QRCode.toCanvas(canvas, rawPayload, {
        width: 600,
        margin: 2,
        errorCorrectionLevel: centerLogo !== 'none' ? 'H' : errorLevel,
        color: {
          dark: fgColor,
          light: actualBg,
        },
      });

      const ctx = canvas.getContext('2d');
      if (ctx && centerLogo !== 'none') {
        const drawBadge = (iconSrc: string) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const logoSize = 110;
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (canvas.height - logoSize) / 2;

            // Draw white background circle / rounded box behind logo
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, (logoSize / 2) + 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = fgColor;
            ctx.stroke();

            // Draw logo image
            ctx.drawImage(img, logoX + 8, logoY + 8, logoSize - 16, logoSize - 16);
            setQrPngUrl(canvas.toDataURL('image/png'));
          };
          img.src = iconSrc;
        };

        if (centerLogo === 'custom' && customLogoUrl) {
          drawBadge(customLogoUrl);
          return;
        } else if (centerLogo === 'whatsapp') {
          // WhatsApp SVG Data URI
          drawBadge(
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2325D366"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814h.005c3.179 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.773-5.766zm9.969 5.828c0 5.523-4.477 10-10 10-1.745 0-3.385-.45-4.819-1.238l-7.181 1.884 1.917-7.009c-.838-1.472-1.317-3.176-1.317-4.991 0-5.523 4.477-10 10-10 5.523 0 10 4.477 10 10z"/></svg>'
          );
          return;
        } else if (centerLogo === 'wifi') {
          drawBadge(
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230284C7"><path d="M12 18c.83 0 1.5-.67 1.5-1.5S12.83 15 12 15s-1.5.67-1.5 1.5S11.17 18 12 18zm0-5c2.21 0 4.17.9 5.59 2.34l1.42-1.42C17.22 12.13 14.77 11 12 11s-5.22 1.13-7.01 2.92l1.42 1.42C7.83 13.9 9.79 13 12 13zm0-4c3.31 0 6.27 1.34 8.41 3.51l1.42-1.42C19.34 8.6 15.89 7 12 7s-7.34 1.6-9.83 4.09l1.42 1.42C5.73 10.34 8.69 9 12 9zm0-4C16.42 1 20.44 2.8 23.24 5.71l-1.42 1.42C19.34 4.54 15.89 3 12 3S4.66 4.54 2.18 7.13L.76 5.71C3.56 2.8 7.58 1 12 1z"/></svg>'
          );
          return;
        } else if (centerLogo === 'upi') {
          drawBadge(
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23E6570B"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/></svg>'
          );
          return;
        }
      }

      setQrPngUrl(canvas.toDataURL('image/png'));
    } catch (err) {
      console.error(err);
    }
  }, [rawPayload, fgColor, bgColor, isTransparentBg, errorLevel, centerLogo, customLogoUrl]);

  React.useEffect(() => {
    renderQrCode();
  }, [renderQrCode]);

  const downloadPng = () => {
    if (!qrPngUrl) return;
    const a = document.createElement('a');
    a.href = qrPngUrl;
    a.download = `qrcode-${qrType}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyQrImage = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleCustomLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const u = URL.createObjectURL(e.target.files[0]);
      setCustomLogoUrl(u);
      setCenterLogo('custom');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Type Selection & Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-7 space-y-6">
            {/* Payload Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main">Choose QR Code Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'url', label: 'Website URL', icon: Globe },
                  { id: 'wifi', label: 'Wi-Fi Connect', icon: Wifi },
                  { id: 'upi', label: 'UPI Payment', icon: CreditCard },
                  { id: 'vcard', label: 'vCard Contact', icon: User },
                  { id: 'text', label: 'Plain Text', icon: FileText },
                  { id: 'email', label: 'Email', icon: Mail },
                  { id: 'phone', label: 'Phone Call', icon: Phone },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = qrType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQrType(item.id as QrType)}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-sm'
                          : 'border-surface-darker bg-surface text-text-main hover:border-primary/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Inputs per Type */}
            <div className="space-y-4 pt-2 border-t border-surface-darker">
              {qrType === 'url' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-main">Target Website URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm font-mono rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                  />
                </div>
              )}

              {qrType === 'wifi' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Network Name (SSID)</label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      placeholder="e.g. Cafe_Guest_WiFi"
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Password</label>
                    <input
                      type="text"
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      placeholder="Wi-Fi Password"
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm font-mono rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="font-bold text-text-main">Security Mode:</label>
                    <select
                      value={wifiSecurity}
                      onChange={(e) => setWifiSecurity(e.target.value as any)}
                      className="bg-surface border border-surface-darker text-text-main font-semibold text-xs rounded-lg px-2.5 py-1.5"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password (Open)</option>
                    </select>
                  </div>
                </div>
              )}

              {qrType === 'upi' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Payee UPI ID (VPA)</label>
                    <input
                      type="text"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      placeholder="e.g. mobile@okhdfcbank"
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm font-mono rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-text-main">Payee Name</label>
                      <input
                        type="text"
                        value={upiName}
                        onChange={(e) => setUpiName(e.target.value)}
                        placeholder="Business / Name"
                        className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-text-main">Fixed Amount (₹ Optional)</label>
                      <input
                        type="number"
                        value={upiAmount}
                        onChange={(e) => setUpiAmount(e.target.value)}
                        placeholder="e.g. 500"
                        className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {qrType === 'vcard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Full Name</label>
                    <input
                      type="text"
                      value={vcardName}
                      onChange={(e) => setVcardName(e.target.value)}
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-2.5"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Phone Number</label>
                    <input
                      type="tel"
                      value={vcardPhone}
                      onChange={(e) => setVcardPhone(e.target.value)}
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-2.5"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Email</label>
                    <input
                      type="email"
                      value={vcardEmail}
                      onChange={(e) => setVcardEmail(e.target.value)}
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-2.5"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Organization / Company</label>
                    <input
                      type="text"
                      value={vcardOrg}
                      onChange={(e) => setVcardOrg(e.target.value)}
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-2.5"
                    />
                  </div>
                </div>
              )}

              {qrType === 'text' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-main">Plain Text Content</label>
                  <textarea
                    rows={3}
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3 focus:outline-none resize-none"
                  />
                </div>
              )}

              {qrType === 'email' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Recipient Email</label>
                    <input
                      type="email"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-main">Pre-filled Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3"
                    />
                  </div>
                </div>
              )}

              {qrType === 'phone' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-main">Phone Number (with Country Code)</label>
                  <input
                    type="tel"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs font-mono rounded-xl p-3"
                  />
                </div>
              )}
            </div>

            {/* Customization & Colors */}
            <div className="space-y-4 pt-4 border-t border-surface-darker">
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-primary" /> Visual Styling &amp; Center Logo
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-text-main">QR Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-surface-darker"
                    />
                    <span className="font-mono text-[11px] text-text-main/70">{fgColor}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-text-main">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      disabled={isTransparentBg}
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-surface-darker disabled:opacity-40"
                    />
                    <label className="flex items-center gap-1 text-[11px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isTransparentBg}
                        onChange={(e) => setIsTransparentBg(e.target.checked)}
                        className="rounded accent-primary"
                      />
                      <span>Transparent</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-text-main">Center Icon Badge</label>
                  <select
                    value={centerLogo}
                    onChange={(e) => setCenterLogo(e.target.value as any)}
                    className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-2 font-semibold"
                  >
                    <option value="none">None (Standard)</option>
                    <option value="whatsapp">WhatsApp Logo</option>
                    <option value="wifi">Wi-Fi Logo</option>
                    <option value="upi">UPI Rupee Logo</option>
                    <option value="custom">Upload Custom Logo...</option>
                  </select>
                </div>
              </div>

              {centerLogo === 'custom' && (
                <div className="p-3 bg-surface rounded-xl border border-surface-darker flex items-center justify-between text-xs">
                  <span>Upload company logo icon (PNG/SVG):</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 bg-white border border-surface-darker rounded-lg font-bold hover:border-primary"
                  >
                    Browse Logo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCustomLogo}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right QR Preview & Export Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 text-center space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Live High-Res Preview
              </span>
              <span className="text-[10px] bg-primary-light text-primary font-bold px-2 py-0.5 rounded">
                Level {errorLevel} (30% ECC)
              </span>
            </div>

            {/* Hidden Canvas for High-DPI Output */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Visual Preview Box */}
            <div className="w-64 h-64 mx-auto p-4 rounded-3xl bg-neutral-50 border border-surface-darker shadow-inner flex items-center justify-center relative overflow-hidden">
              {qrPngUrl ? (
                <img
                  src={qrPngUrl}
                  alt="Generated QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-xs text-text-main/50">Generating vector QR code...</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={downloadPng}
                className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" /> Download 300 DPI PNG
              </button>

              <button
                type="button"
                onClick={copyQrImage}
                className="w-full py-2.5 rounded-2xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-text-main/60" />}
                {copied ? 'Copied to Clipboard!' : 'Copy QR Image'}
              </button>
            </div>

            <p className="text-[11px] text-text-main/60 pt-1">
              ✓ 100% Client-Side In-Memory Generation • Safe for sensitive Wi-Fi passwords &amp; contact cards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
