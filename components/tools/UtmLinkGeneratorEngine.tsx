'use client';

import * as React from 'react';
import {
  Link2,
  Copy,
  Check,
  QrCode,
  Download,
  ExternalLink,
  Sparkles,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import QRCode from 'qrcode';

export function UtmLinkGeneratorEngine() {
  const [baseUrl, setBaseUrl] = React.useState<string>('https://example.com/landing-page');
  const [source, setSource] = React.useState<string>('google');
  const [medium, setMedium] = React.useState<string>('cpc');
  const [campaign, setCampaign] = React.useState<string>('summer_promo');
  const [term, setTerm] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('banner_top');
  const [forceLowercase, setForceLowercase] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>('');

  // Sanitize parameter helper
  const cleanParam = (val: string) => {
    let res = val.trim();
    if (forceLowercase) res = res.toLowerCase();
    return res.replace(/\s+/g, '_');
  };

  // Build full UTM Link
  const fullUtmUrl = React.useMemo(() => {
    let base = baseUrl.trim();
    if (!base) return '';
    if (!base.startsWith('http://') && !base.startsWith('https://')) {
      base = `https://${base}`;
    }

    try {
      const parsed = new URL(base);
      if (source) parsed.searchParams.set('utm_source', cleanParam(source));
      if (medium) parsed.searchParams.set('utm_medium', cleanParam(medium));
      if (campaign) parsed.searchParams.set('utm_campaign', cleanParam(campaign));
      if (term) parsed.searchParams.set('utm_term', cleanParam(term));
      if (content) parsed.searchParams.set('utm_content', cleanParam(content));
      return parsed.toString();
    } catch {
      return base;
    }
  }, [baseUrl, source, medium, campaign, term, content, forceLowercase]);

  // Generate QR Code for the link
  React.useEffect(() => {
    if (!fullUtmUrl) {
      setQrCodeDataUrl('');
      return;
    }
    QRCode.toDataURL(fullUtmUrl, {
      width: 400,
      margin: 2,
      color: { dark: '#E6570B', light: '#FFFFFF' },
    })
      .then((u) => setQrCodeDataUrl(u))
      .catch((err) => console.error(err));
  }, [fullUtmUrl]);

  const copyUrl = async () => {
    if (!fullUtmUrl) return;
    try {
      await navigator.clipboard.writeText(fullUtmUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQr = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = `utm-qr-${cleanParam(campaign) || 'campaign'}.png`;
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
              <Link2 className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-text-main">
                GA4 Campaign URL Builder Parameters
              </h3>
            </div>

            {/* Base URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main flex items-center justify-between">
                <span>Target Website URL *</span>
                <span className="text-[11px] text-text-main/50">Required</span>
              </label>
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://yourwebsite.com/product"
                className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm font-mono rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>

            {/* Source & Medium */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main">
                  Campaign Source (utm_source) *
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. google, newsletter, facebook"
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main">
                  Campaign Medium (utm_medium) *
                </label>
                <input
                  type="text"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="e.g. cpc, email, banner, social"
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>
            </div>

            {/* Campaign Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main">
                Campaign Name (utm_campaign) *
              </label>
              <input
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="e.g. festive_sale, product_launch"
                className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            {/* Term & Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main">
                  Campaign Term (utm_term)
                </label>
                <input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="e.g. keywords (optional)"
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main">
                  Campaign Content (utm_content)
                </label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="e.g. cta_button_blue (A/B testing)"
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-3 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-surface-darker">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-text-main">
                <input
                  type="checkbox"
                  checked={forceLowercase}
                  onChange={(e) => setForceLowercase(e.target.checked)}
                  className="rounded accent-primary"
                />
                <span>Auto-convert parameters to lowercase &amp; replace spaces with underscores</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output & QR Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Tagged Campaign URL
              </span>
              <span className="text-[10px] bg-primary-light text-primary font-bold px-2 py-0.5 rounded">
                GA4 Ready
              </span>
            </div>

            {/* Output Box */}
            <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <span className="text-[10px] font-mono uppercase text-text-main/50">Full Trackable URL:</span>
              <p className="text-xs font-mono font-bold text-text-main break-all leading-relaxed select-all">
                {fullUtmUrl}
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={copyUrl}
                className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Tagged URL'}
              </button>

              <a
                href={fullUtmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-2xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                Test Link in Browser <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* QR Code */}
            {qrCodeDataUrl && (
              <div className="pt-3 border-t border-surface-darker text-center space-y-2">
                <span className="text-xs font-bold text-text-main">Campaign QR Code (Print / Billboards)</span>
                <div className="w-36 h-36 mx-auto p-1.5 bg-white rounded-xl border border-surface-darker shadow-2xs flex items-center justify-center">
                  <img src={qrCodeDataUrl} alt="Campaign QR Code" className="w-full h-full object-contain" />
                </div>
                <button
                  type="button"
                  onClick={downloadQr}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <Download className="w-3.5 h-3.5" /> Download QR (PNG)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
