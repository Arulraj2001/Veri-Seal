'use client';

import * as React from 'react';
import {
  Mail,
  Copy,
  Check,
  Code2,
  ExternalLink,
  Send,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export function MailtoLinkGeneratorEngine() {
  const [emailTo, setEmailTo] = React.useState<string>('support@example.com');
  const [cc, setCc] = React.useState<string>('');
  const [bcc, setBcc] = React.useState<string>('');
  const [subject, setSubject] = React.useState<string>('Service Inquiry & Quotation Request');
  const [body, setBody] = React.useState<string>(
    'Hello Team,\n\nI would like to receive more information about your product catalog and pricing packages.\n\nBest regards,\n[Your Name]'
  );
  const [buttonText, setButtonText] = React.useState<string>('Send Us an Email');
  const [copiedLink, setCopiedLink] = React.useState<boolean>(false);
  const [copiedHtml, setCopiedHtml] = React.useState<boolean>(false);

  // Generate mailto link
  const mailtoUri = React.useMemo(() => {
    const params: string[] = [];
    if (cc.trim()) params.push(`cc=${encodeURIComponent(cc.trim())}`);
    if (bcc.trim()) params.push(`bcc=${encodeURIComponent(bcc.trim())}`);
    if (subject.trim()) params.push(`subject=${encodeURIComponent(subject.trim())}`);
    if (body.trim()) params.push(`body=${encodeURIComponent(body.trim())}`);

    const q = params.length > 0 ? `?${params.join('&')}` : '';
    return `mailto:${emailTo.trim()}${q}`;
  }, [emailTo, cc, bcc, subject, body]);

  const htmlSnippet = `<a href="${mailtoUri}" style="display:inline-block;background:#003366;color:#ffffff;padding:12px 24px;border-radius:12px;text-decoration:none;font-family:sans-serif;font-weight:bold;font-size:14px;">${buttonText || 'Contact Us via Email'}</a>`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(mailtoUri);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(htmlSnippet);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-surface-darker">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-text-main">
                Configure Mailto Deep Link
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main">Recipient Email (To) *</label>
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="contact@company.com"
                className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm font-mono rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main">CC (Carbon Copy)</label>
                <input
                  type="text"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="manager@company.com"
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs font-mono rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-main">BCC (Blind Carbon Copy)</label>
                <input
                  type="text"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="archive@company.com"
                  className="w-full bg-surface border border-surface-darker text-text-main text-xs font-mono rounded-xl p-3 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main">Email Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject of the email"
                className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main">Pre-filled Email Body</label>
              <textarea
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter pre-filled message..."
                className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-1.5 pt-2 border-t border-surface-darker">
              <label className="text-xs font-bold text-text-main">HTML Button Label</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="e.g. Email Us Today"
                className="w-full bg-surface border border-surface-darker text-text-main text-xs rounded-xl p-2.5 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Generated Mailto Link
              </span>
              <span className="text-[10px] bg-primary-light text-primary font-bold px-2 py-0.5 rounded">
                RFC 6068 Ready
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <span className="text-[10px] font-mono uppercase text-text-main/50">Mailto URL:</span>
              <p className="text-xs font-mono font-bold text-text-main break-all leading-relaxed select-all">
                {mailtoUri}
              </p>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={copyLink}
                  className="py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedLink ? 'Copied Link!' : 'Copy Mailto URL'}
                </button>

                <a
                  href={mailtoUri}
                  className="py-3 rounded-2xl bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <Send className="w-4 h-4" /> Test Open Mail
                </a>
              </div>

              <button
                type="button"
                onClick={copyHtml}
                className="w-full py-2.5 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Code2 className="w-4 h-4 text-primary" />
                {copiedHtml ? 'HTML Copied to Clipboard!' : 'Copy HTML <a> Code'}
              </button>
            </div>

            {/* HTML Code Preview */}
            <div className="p-3.5 rounded-2xl bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto">
              <code>{htmlSnippet}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
