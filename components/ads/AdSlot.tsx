'use client';

import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AdSlotType = 'sidebar' | 'post_download' | 'in_content' | 'mobile';

export interface AdSlotProps {
  slot: AdSlotType;
  className?: string;
  customTitle?: string;
  customDesc?: string;
  customCtaText?: string;
  customCtaUrl?: string;
  context?: 'exam' | 'cyber_cafe' | 'legal' | 'general';
}

interface PublicAdsConfig {
  ads_enabled: boolean;
  ads_provider: 'adsense' | 'custom_sponsor' | 'auto';
  adsense_publisher_id: string;
  ad_slot_sidebar: boolean;
  ad_slot_post_download: boolean;
  ad_slot_in_content: boolean;
  ad_slot_mobile: boolean;
  sponsor_title: string;
  sponsor_desc: string;
  sponsor_cta_text: string;
  sponsor_cta_url: string;
  sponsor_badge: string;
}

export const DEFAULT_OSTRUNE_CONFIG = {
  title: 'Ostrune — Web Development, SEO & Speed Growth Agency',
  desc: 'We build sub-second websites, custom web apps, and run SEO & Meta Ads with 100/100 Core Web Vitals for ambitious businesses worldwide. Free site audit with 12h reply guarantee.',
  cta_text: 'Book Free Strategy Call',
  cta_url: 'https://ostrune.netlify.app/',
  badge: 'Ostrune Agency',
};

const DEFAULT_CONFIG: PublicAdsConfig = {
  ads_enabled: true,
  ads_provider: 'custom_sponsor',
  adsense_publisher_id: '',
  ad_slot_sidebar: true,
  ad_slot_post_download: true,
  ad_slot_in_content: true,
  ad_slot_mobile: true,
  sponsor_title: DEFAULT_OSTRUNE_CONFIG.title,
  sponsor_desc: DEFAULT_OSTRUNE_CONFIG.desc,
  sponsor_cta_text: DEFAULT_OSTRUNE_CONFIG.cta_text,
  sponsor_cta_url: DEFAULT_OSTRUNE_CONFIG.cta_url,
  sponsor_badge: DEFAULT_OSTRUNE_CONFIG.badge,
};

export function AdSlot({
  slot,
  className,
  customTitle,
  customDesc,
  customCtaText,
  customCtaUrl,
}: AdSlotProps) {
  const [config, setConfig] = React.useState<PublicAdsConfig>(DEFAULT_CONFIG);
  const [loaded, setLoaded] = React.useState(false);
  const [adBlocked, setAdBlocked] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    fetch('/api/settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setConfig({
          ads_enabled: data.ads_enabled !== false,
          ads_provider: data.ads_provider || 'custom_sponsor',
          adsense_publisher_id: data.adsense_publisher_id || '',
          ad_slot_sidebar: data.ad_slot_sidebar !== false,
          ad_slot_post_download: data.ad_slot_post_download !== false,
          ad_slot_in_content: data.ad_slot_in_content !== false,
          ad_slot_mobile: data.ad_slot_mobile !== false,
          sponsor_title: data.sponsor_title || DEFAULT_OSTRUNE_CONFIG.title,
          sponsor_desc: data.sponsor_desc || DEFAULT_OSTRUNE_CONFIG.desc,
          sponsor_cta_text: data.sponsor_cta_text || DEFAULT_OSTRUNE_CONFIG.cta_text,
          sponsor_cta_url: data.sponsor_cta_url || DEFAULT_OSTRUNE_CONFIG.cta_url,
          sponsor_badge: data.sponsor_badge || DEFAULT_OSTRUNE_CONFIG.badge,
        });
        setLoaded(true);
      })
      .catch(() => {
        if (isMounted) setLoaded(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Check global kill switch
  if (loaded && !config.ads_enabled) {
    return null;
  }

  // Check specific slot switch
  if (loaded) {
    if (slot === 'sidebar' && !config.ad_slot_sidebar) return null;
    if (slot === 'post_download' && !config.ad_slot_post_download) return null;
    if (slot === 'in_content' && !config.ad_slot_in_content) return null;
    if (slot === 'mobile' && !config.ad_slot_mobile) return null;
  }

  const isAdSense =
    (config.ads_provider === 'adsense' || config.ads_provider === 'auto') &&
    config.adsense_publisher_id &&
    !adBlocked;

  // Resolve dynamic sponsor text from admin settings, custom props, or Ostrune default
  const activeTitle = customTitle || config.sponsor_title || DEFAULT_OSTRUNE_CONFIG.title;
  const activeDesc = customDesc || config.sponsor_desc || DEFAULT_OSTRUNE_CONFIG.desc;
  const activeCtaText = customCtaText || config.sponsor_cta_text || DEFAULT_OSTRUNE_CONFIG.cta_text;
  const activeCtaUrl = customCtaUrl || config.sponsor_cta_url || DEFAULT_OSTRUNE_CONFIG.cta_url;
  const activeBadge = config.sponsor_badge || DEFAULT_OSTRUNE_CONFIG.badge;

  // Custom Direct Sponsor UI
  if (!isAdSense || adBlocked) {
    if (slot === 'sidebar') {
      return (
        <div
          className={cn(
            'p-5 rounded-3xl bg-white border border-surface-darker shadow-card space-y-3 relative overflow-hidden transition-all hover:border-primary/40',
            className
          )}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-main/50">
            <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20">
              {activeBadge}
            </span>
            <span className="text-text-main/40 font-semibold tracking-widest">Sponsored</span>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-extrabold text-sm text-text-main leading-snug">
              {activeTitle}
            </h4>
            <p className="text-xs text-text-main/70 leading-relaxed">
              {activeDesc}
            </p>
          </div>

          <a
            href={activeCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-surface border border-surface-darker hover:border-primary/40 hover:bg-primary-light/40 text-xs font-bold text-text-main hover:text-primary transition-all shadow-2xs group"
          >
            <span>{activeCtaText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-primary" />
          </a>
        </div>
      );
    }

    if (slot === 'post_download') {
      return (
        <aside
          aria-label="Recommended Partner Announcement"
          className={cn(
            'p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-primary/5 via-white to-surface border border-primary/30 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all',
            className
          )}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {activeBadge}
              </span>
              <span className="text-[10px] text-text-main/40 uppercase tracking-widest font-semibold">
                Verified Partner
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-text-main">
              {activeTitle}
            </h3>
            <p className="text-xs sm:text-sm text-text-main/70 max-w-xl leading-relaxed">
              {activeDesc}
            </p>
          </div>

          <a
            href={activeCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer self-stretch sm:self-auto justify-center"
          >
            <span>{activeCtaText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </aside>
      );
    }

    // Default 'in_content' or 'mobile'
    return (
      <div
        className={cn(
          'p-5 sm:p-6 rounded-3xl bg-white border border-surface-darker shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all',
          className
        )}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20">
              {activeBadge}
            </span>
            <span className="text-[10px] text-text-main/40 uppercase tracking-widest font-semibold">
              Advertisement
            </span>
          </div>
          <h4 className="font-extrabold text-sm sm:text-base text-text-main">
            {activeTitle}
          </h4>
          <p className="text-xs text-text-main/70 max-w-lg leading-relaxed">
            {activeDesc}
          </p>
        </div>

        <a
          href={activeCtaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface border border-surface-darker hover:border-primary/40 text-xs font-bold text-text-main hover:text-primary transition-all shrink-0"
        >
          <span>{activeCtaText}</span>
          <ExternalLink className="w-3.5 h-3.5 text-primary" />
        </a>
      </div>
    );
  }

  // Google AdSense Unit Container with strict CLS protection
  return (
    <div
      className={cn(
        'rounded-3xl border border-surface-darker bg-surface/30 p-3 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden',
        className
      )}
    >
      <div className="text-[9px] uppercase tracking-widest text-text-main/40 font-semibold mb-2 self-start px-2">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '200px' }}
        data-ad-client={config.adsense_publisher_id}
        data-ad-slot={
          slot === 'sidebar'
            ? '1234567890'
            : slot === 'post_download'
            ? '2345678901'
            : '3456789012'
        }
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
