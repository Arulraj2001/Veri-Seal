'use client';

import * as React from 'react';
import { Share2, Check, Copy, MessageCircle, Send } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export interface ExamSocialShareBarProps {
  toolName?: string;
  examName?: string;
  shareUrl?: string;
  className?: string;
}

export function ExamSocialShareBar({
  toolName = 'Government Exam Document Resizer',
  examName = 'Government Exams (UPSC / SSC / TNPSC / IBPS)',
  shareUrl,
  className = '',
}: ExamSocialShareBarProps) {
  const [copied, setCopied] = React.useState(false);

  const activeUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  const shareText = `Hey! I just prepared my ${examName} photo (with name & date stamp), signature (10–20KB), and certificates in seconds on Kagazo. 100% client-side private in browser RAM without server upload! Resize yours here:`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${activeUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText} ${activeUrl}`
  )}`;

  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(
    activeUrl
  )}&text=${encodeURIComponent(
    `🔥 Super useful for exam aspirants: Free 1-Click ${toolName} for ${examName}. Zero cloud upload!`
  )}`;

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-primary/5 to-cyan-500/10 border border-emerald-500/20 shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs sm:text-sm font-bold text-text-main">
              Help Fellow Aspirants in Your Study Groups!
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-text-main/70">
            Share this free, privacy-first tool directly to your WhatsApp &amp; Telegram exam preparation channels.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* WhatsApp Share Button */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-sm transition-all active:scale-95"
            title="Share with Study Groups on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Telegram Share Button */}
          <a
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#229ED9] hover:bg-[#1f8fc4] text-white font-bold text-xs shadow-sm transition-all active:scale-95"
            title="Share to Telegram Channels"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Telegram</span>
          </a>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-surface-darker text-text-main font-semibold text-xs hover:bg-surface transition-all active:scale-95"
            title="Copy share message with link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-text-main/70" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
