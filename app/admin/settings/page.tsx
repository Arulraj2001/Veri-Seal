'use client';

import * as React from 'react';
import {
  Settings,
  CreditCard,
  Globe,
  Sliders,
  Bell,
  Gauge,
  Save,
  RotateCcw,
  CheckCircle2,
  Check,
  Clock,
  Sparkles,
  Megaphone,
  Eye,
  Layout,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const [savingCard, setSavingCard] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const json = await res.json();
        setSettings(json.settings || {});
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadSettings();
  }, []);

  const handleSaveCard = async (cardName: string, cardValues: Record<string, any>) => {
    setSavingCard(cardName);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card: cardName,
          values: cardValues,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setSettings((prev) => ({
          ...prev,
          ...cardValues,
          [`${cardName}_updated_at`]: json.updated_at,
        }));
        showToast(`Saved ${cardName.replace('_', ' ')} settings successfully.`);
      } else {
        const errJson = await res.json().catch(() => ({}));
        showToast(`Failed: ${errJson.error || res.statusText || 'Unable to save settings'}`);
      }
    } catch (e) {
      console.error('Failed to save settings card:', e);
      showToast('Network error while saving settings.');
    } finally {
      setSavingCard(null);
    }
  };

  const handleResetCounter = async () => {
    if (!confirm('Are you sure you want to reset the public verification counter to 0?')) return;
    await handleSaveCard('counter', { verification_counter: '0' });
  };

  const formatTimestamp = (ts?: string) => {
    if (!ts) return 'Recently';
    return new Date(ts).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
        <p className="text-xs font-semibold text-text-main/60 mt-3">Loading system configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-text-main text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          System Settings &amp; Site Controls
        </h1>
        <p className="text-xs sm:text-sm text-text-main/70 mt-1">
          Configure payment switches, feature toggles, AdSense scripts, and live counters saved directly into Supabase site_settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* CARD 1: PAYMENT SETTINGS */}
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-darker">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary-light text-primary">
                <CreditCard className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base font-black text-text-main">Card 1 — Payment Settings</h2>
                <span className="text-[11px] text-text-main/50">
                  Last updated: {formatTimestamp(settings.payment_updated_at)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={savingCard === 'payment'}
              onClick={() =>
                handleSaveCard('payment', {
                  payment_enabled: settings.payment_enabled,
                  upi_id: settings.upi_id,
                  upi_qr_url: settings.upi_qr_url,
                  pro_price: settings.pro_price,
                  business_price: settings.business_price,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingCard === 'payment' ? 'Saving...' : 'Save Card'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Payment system toggle */}
            <div className="sm:col-span-2 flex items-center justify-between p-3.5 bg-surface/40 rounded-2xl border border-surface-darker">
              <div>
                <div className="font-bold text-text-main">Payment System Master Toggle</div>
                <div className="text-[11px] text-text-main/60">
                  When OFF, unlimited free access is granted to all citizens without payment walls.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.payment_enabled === 'true'}
                onChange={(e) =>
                  setSettings({ ...settings, payment_enabled: e.target.checked ? 'true' : 'false' })
                }
                className="w-5 h-5 rounded text-primary focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-text-main mb-1">Official UPI ID</label>
              <input
                type="text"
                value={settings.upi_id || ''}
                onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-text-main mb-1">UPI QR Code Image URL</label>
              <input
                type="text"
                value={settings.upi_qr_url || ''}
                onChange={(e) => setSettings({ ...settings, upi_qr_url: e.target.value.trim() })}
                placeholder="https://your-domain.com/path/to/qr.png"
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main text-xs font-mono"
              />
              {settings.upi_qr_url && (
                <div className="mt-2.5 flex items-center gap-3 p-2.5 bg-surface/40 rounded-xl border border-surface-darker">
                  <img
                    src={settings.upi_qr_url}
                    alt="QR Preview"
                    className="w-14 h-14 object-contain bg-white rounded-lg border border-surface-darker p-1 shadow-2xs shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="text-[11px] text-text-main/70 min-w-0">
                    <span className="font-bold text-success flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      QR Preview Loaded
                    </span>
                    <a
                      href={settings.upi_qr_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold block truncate mt-0.5"
                    >
                      Open full image in new tab &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block font-bold text-text-main mb-1">Pro Plan Price (₹ / Month)</label>
              <input
                type="number"
                value={settings.pro_price || '199'}
                onChange={(e) => setSettings({ ...settings, pro_price: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-text-main mb-1">Business Plan Price (₹ / Month)</label>
              <input
                type="number"
                value={settings.business_price || '2499'}
                onChange={(e) => setSettings({ ...settings, business_price: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main font-bold"
              />
            </div>
          </div>
        </div>

        {/* CARD 2: SITE SETTINGS */}
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-darker">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary-light text-primary">
                <Globe className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base font-black text-text-main">Card 2 — Site Settings</h2>
                <span className="text-[11px] text-text-main/50">
                  Last updated: {formatTimestamp(settings.site_updated_at)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={savingCard === 'site'}
              onClick={() =>
                handleSaveCard('site', {
                  site_name: settings.site_name,
                  site_tagline: settings.site_tagline,
                  contact_email: settings.contact_email,
                  whatsapp_number: settings.whatsapp_number,
                  maintenance_mode: settings.maintenance_mode,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingCard === 'site' ? 'Saving...' : 'Save Card'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-text-main mb-1">Site Brand Name</label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-text-main mb-1">Site Tagline</label>
              <input
                type="text"
                value={settings.site_tagline || ''}
                onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main"
              />
            </div>

            <div>
              <label className="block font-bold text-text-main mb-1">Official Contact Email</label>
              <input
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main"
              />
            </div>

            <div>
              <label className="block font-bold text-text-main mb-1">Support WhatsApp (with Country Code)</label>
              <input
                type="text"
                value={settings.whatsapp_number || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main"
              />
            </div>

            <div className="sm:col-span-2 flex items-center justify-between p-3.5 bg-surface/40 rounded-2xl border border-surface-darker">
              <div>
                <div className="font-bold text-text-main">Maintenance Mode</div>
                <div className="text-[11px] text-text-main/60">
                  Temporarily display scheduled maintenance message to non-admin visitors.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenance_mode === 'true'}
                onChange={(e) =>
                  setSettings({ ...settings, maintenance_mode: e.target.checked ? 'true' : 'false' })
                }
                className="w-5 h-5 rounded text-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* CARD 3: FEATURE TOGGLES */}
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-darker">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary-light text-primary">
                <Sliders className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base font-black text-text-main">Card 3 — Feature Toggles</h2>
                <span className="text-[11px] text-text-main/50">
                  Last updated: {formatTimestamp(settings.features_updated_at)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={savingCard === 'features'}
              onClick={() =>
                handleSaveCard('features', {
                  adsense_enabled: settings.adsense_enabled,
                  adsense_publisher_id: settings.adsense_publisher_id,
                  language_tamil_enabled: settings.language_tamil_enabled,
                  api_access_enabled: settings.api_access_enabled,
                  free_daily_limit: settings.free_daily_limit,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingCard === 'features' ? 'Saving...' : 'Save Card'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* AdSense */}
            <div className="flex items-center justify-between p-3.5 bg-surface/40 rounded-2xl border border-surface-darker">
              <div>
                <div className="font-bold text-text-main">Google AdSense Enabled</div>
                <div className="text-[11px] text-text-main/60">
                  Inject official ad banners on non-paid user verification screens.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.adsense_enabled === 'true'}
                onChange={(e) =>
                  setSettings({ ...settings, adsense_enabled: e.target.checked ? 'true' : 'false' })
                }
                className="w-5 h-5 rounded text-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-text-main mb-1">AdSense Publisher ID</label>
              <input
                type="text"
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                value={settings.adsense_publisher_id || ''}
                onChange={(e) => setSettings({ ...settings, adsense_publisher_id: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main font-mono"
              />
            </div>

            {/* Tamil Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-surface/40 rounded-2xl border border-surface-darker">
              <div>
                <div className="font-bold text-text-main">Tamil Language Switcher (தமிழ்)</div>
                <div className="text-[11px] text-text-main/60">
                  Enable regional bilingual language toggle across header and verification reports.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.language_tamil_enabled === 'true'}
                onChange={(e) =>
                  setSettings({ ...settings, language_tamil_enabled: e.target.checked ? 'true' : 'false' })
                }
                className="w-5 h-5 rounded text-primary"
              />
            </div>

            {/* Free Daily Limit */}
            <div className="p-3.5 bg-surface/40 rounded-2xl border border-surface-darker">
              <label className="block font-bold text-text-main mb-1">
                Guest / Free Daily Verification Limit
              </label>
              <p className="text-[11px] text-text-main/60 mb-2">
                Number of documents a free guest user can verify before prompt (active only when Payment Switch is ON).
              </p>
              <input
                type="number"
                value={settings.free_daily_limit || '3'}
                onChange={(e) => setSettings({ ...settings, free_daily_limit: e.target.value })}
                className="w-32 px-3 py-1.5 bg-white border border-surface-darker rounded-xl text-xs font-bold text-text-main"
              />
            </div>
          </div>
        </div>

        {/* CARD 4: NOTIFICATION SETTINGS */}
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-darker">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary-light text-primary">
                <Bell className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base font-black text-text-main">Card 4 — Notification Settings</h2>
                <span className="text-[11px] text-text-main/50">
                  Last updated: {formatTimestamp(settings.notifications_updated_at)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={savingCard === 'notifications'}
              onClick={() =>
                handleSaveCard('notifications', {
                  admin_notification_email: settings.admin_notification_email,
                  notify_new_payment: settings.notify_new_payment,
                  notify_new_signup: settings.notify_new_signup,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingCard === 'notifications' ? 'Saving...' : 'Save Card'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-text-main mb-1">
                Admin Notification Target Email
              </label>
              <input
                type="email"
                value={settings.admin_notification_email || ''}
                onChange={(e) => setSettings({ ...settings, admin_notification_email: e.target.value })}
                className="w-full px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-text-main"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-surface/40 rounded-2xl border border-surface-darker">
              <div>
                <div className="font-bold text-text-main">Email on New UPI Payment Request</div>
                <div className="text-[11px] text-text-main/60">
                  Instantly ping admin inbox when a citizen submits an unverified transaction reference.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notify_new_payment === 'true'}
                onChange={(e) =>
                  setSettings({ ...settings, notify_new_payment: e.target.checked ? 'true' : 'false' })
                }
                className="w-5 h-5 rounded text-primary"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-surface/40 rounded-2xl border border-surface-darker">
              <div>
                <div className="font-bold text-text-main">Email on New User Registration</div>
                <div className="text-[11px] text-text-main/60">
                  Notify admin whenever a new citizen authenticates via magic link or Google.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notify_new_signup === 'true'}
                onChange={(e) =>
                  setSettings({ ...settings, notify_new_signup: e.target.checked ? 'true' : 'false' })
                }
                className="w-5 h-5 rounded text-primary"
              />
            </div>
          </div>
        </div>

        {/* CARD 5: VERIFICATION COUNTER */}
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-darker">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary-light text-primary">
                <Gauge className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base font-black text-text-main">Card 5 — Verification Counter</h2>
                <span className="text-[11px] text-text-main/50">
                  Last updated: {formatTimestamp(settings.counter_updated_at)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={savingCard === 'counter'}
              onClick={() =>
                handleSaveCard('counter', {
                  verification_counter: settings.verification_counter,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingCard === 'counter' ? 'Saving...' : 'Save Count'}</span>
            </button>
          </div>

          <div className="p-4 bg-surface/40 rounded-2xl border border-surface-darker flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Current Verification Counter Value
              </label>
              <p className="text-[11px] text-text-main/60">
                This public metric is displayed prominently on the homepage social proof badge.
              </p>
              <input
                type="number"
                value={settings.verification_counter || '421847'}
                onChange={(e) => setSettings({ ...settings, verification_counter: e.target.value })}
                className="mt-2 px-3.5 py-2 bg-white border border-surface-darker rounded-xl text-lg font-black text-primary w-48"
              />
            </div>

            <button
              type="button"
              onClick={handleResetCounter}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-error/40 text-error hover:bg-error-light text-xs font-bold transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Counter to 0</span>
            </button>
          </div>
        </div>

        {/* CARD 6: MONETIZATION & ADS MANAGEMENT */}
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <Megaphone className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-text-main">Card 6 — Monetization &amp; Ads Control Center</h2>
                  <span
                    className={cn(
                      'text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider',
                      settings.ads_enabled === 'true'
                        ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                        : 'bg-surface text-text-main/50 border border-surface-darker'
                    )}
                  >
                    {settings.ads_enabled === 'true' ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <span className="text-[11px] text-text-main/50">
                  Last updated: {formatTimestamp(settings.ads_updated_at)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={savingCard === 'ads'}
              onClick={() =>
                handleSaveCard('ads', {
                  ads_enabled: settings.ads_enabled ?? 'true',
                  ads_provider: settings.ads_provider || 'custom_sponsor',
                  adsense_publisher_id: settings.adsense_publisher_id || '',
                  ad_slot_sidebar: settings.ad_slot_sidebar ?? 'true',
                  ad_slot_post_download: settings.ad_slot_post_download ?? 'true',
                  ad_slot_in_content: settings.ad_slot_in_content ?? 'true',
                  ad_slot_mobile: settings.ad_slot_mobile ?? 'true',
                  sponsor_title: settings.sponsor_title || 'Ostrune — Web Development, SEO & Speed Growth Agency',
                  sponsor_desc:
                    settings.sponsor_desc ||
                    'We build sub-second websites, custom web apps, and run SEO & Meta Ads with 100/100 Core Web Vitals for ambitious businesses worldwide. Free site audit with 12h reply guarantee.',
                  sponsor_image_url: settings.sponsor_image_url || '',
                  sponsor_cta_text: settings.sponsor_cta_text || 'Book Free Strategy Call',
                  sponsor_cta_url: settings.sponsor_cta_url || 'https://ostrune.netlify.app/',
                  sponsor_badge: settings.sponsor_badge || 'Ostrune Agency',
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm disabled:opacity-50 self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingCard === 'ads' ? 'Saving...' : 'Save Ads Settings'}</span>
            </button>
          </div>

          <div className="space-y-5 text-xs">
            {/* Global Master Kill Switch */}
            <div className="p-4 rounded-2xl bg-surface/50 border border-surface-darker flex items-center justify-between gap-4">
              <div>
                <div className="font-extrabold text-sm text-text-main flex items-center gap-2">
                  <span>Global Ads Master Switch</span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Master Kill-Switch
                  </span>
                </div>
                <p className="text-[11px] text-text-main/70 mt-0.5">
                  When toggled OFF, all ad containers and external third-party scripts are completely stripped across the entire platform.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={settings.ads_enabled === 'true'}
                  onChange={(e) =>
                    setSettings({ ...settings, ads_enabled: e.target.checked ? 'true' : 'false' })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-darker peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-darker after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Provider Selector */}
            <div className="space-y-2">
              <label className="block font-bold text-text-main">
                Advertising Network Provider
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'custom_sponsor',
                    title: 'Direct Sponsor / In-House',
                    desc: 'Display custom internal sponsor banners (Ostrune, Mock Tests)',
                  },
                  {
                    id: 'adsense',
                    title: 'Google AdSense',
                    desc: 'Load official Google responsive ad units via publisher ID',
                  },
                  {
                    id: 'auto',
                    title: 'Auto-Fallback Mode',
                    desc: 'Serve AdSense first; fallback to Direct Sponsor if blocked',
                  },
                ].map((prov) => {
                  const isSelected = (settings.ads_provider || 'custom_sponsor') === prov.id;
                  return (
                    <button
                      key={prov.id}
                      type="button"
                      onClick={() => setSettings({ ...settings, ads_provider: prov.id })}
                      className={cn(
                        'text-left p-3.5 rounded-2xl border transition-all',
                        isSelected
                          ? 'bg-primary-light/50 border-primary shadow-2xs text-text-main'
                          : 'bg-surface/30 border-surface-darker hover:bg-surface/70 text-text-main/80'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-text-main">{prov.title}</span>
                        <span
                          className={cn(
                            'w-3.5 h-3.5 rounded-full border flex items-center justify-center',
                            isSelected ? 'border-primary bg-primary' : 'border-surface-darker bg-white'
                          )}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-main/60 mt-1 leading-snug">{prov.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Google AdSense Publisher ID Input */}
            {(settings.ads_provider === 'adsense' || settings.ads_provider === 'auto') && (
              <div className="p-4 rounded-2xl bg-surface/30 border border-surface-darker space-y-2">
                <label className="block font-bold text-text-main">
                  Google AdSense Publisher ID (`ca-pub-XXXXXXXXXXXX`)
                </label>
                <input
                  type="text"
                  placeholder="ca-pub-1234567890123456"
                  value={settings.adsense_publisher_id || ''}
                  onChange={(e) => setSettings({ ...settings, adsense_publisher_id: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-surface-darker rounded-xl text-text-main font-mono text-xs"
                />
                <p className="text-[11px] text-text-main/60">
                  Must begin with <code className="text-primary font-bold">ca-pub-</code>. Injected asynchronously into high-viewability containers.
                </p>
              </div>
            )}

            {/* Granular Slot Toggles */}
            <div className="space-y-2">
              <label className="block font-bold text-text-main">
                Granular Slot Placement Controls
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'ad_slot_sidebar',
                    title: 'Slot A: Right Sticky Sidebar (300x250 / 300x600)',
                    desc: 'Continuous peripheral visibility during compression workflow. 78%+ viewability.',
                  },
                  {
                    key: 'ad_slot_post_download',
                    title: 'Slot B: Post-Download Native Sponsor Box',
                    desc: 'Shown ONLY after successful download when candidate is in high-relief state.',
                  },
                  {
                    key: 'ad_slot_in_content',
                    title: 'Slot C: In-Content Native Card',
                    desc: 'Clean editorial sponsor card placed between Recruitment Table and FAQs.',
                  },
                  {
                    key: 'ad_slot_mobile',
                    title: 'Slot D: Mobile In-Feed Unit',
                    desc: 'Streamlined mobile card below the main tool. No sticky bottom blocking.',
                  },
                ].map((slot) => {
                  const isChecked = settings[slot.key] !== 'false';
                  return (
                    <div
                      key={slot.key}
                      className="p-3.5 rounded-2xl bg-surface/40 border border-surface-darker flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="font-extrabold text-xs text-text-main">{slot.title}</div>
                        <p className="text-[11px] text-text-main/60 mt-0.5 leading-snug">{slot.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          setSettings({ ...settings, [slot.key]: e.target.checked ? 'true' : 'false' })
                        }
                        className="w-4 h-4 rounded text-primary mt-0.5"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Sponsor Builder & Live Preview */}
            <div className="p-4 rounded-2xl bg-surface/30 border border-surface-darker space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-text-main text-xs flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    Direct Sponsor &amp; Fallback Banner Builder
                  </h3>
                  <p className="text-[11px] text-text-main/60">
                    Configures the in-house banner served when AdSense is disabled, empty, or ad-blocked.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-text-main mb-1">Headline</label>
                  <input
                    type="text"
                    value={settings.sponsor_title || 'Ostrune — Web Development, SEO & Speed Growth Agency'}
                    onChange={(e) => setSettings({ ...settings, sponsor_title: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-surface-darker rounded-xl text-text-main text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-text-main mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={settings.sponsor_badge || 'Ostrune Agency'}
                    onChange={(e) => setSettings({ ...settings, sponsor_badge: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-surface-darker rounded-xl text-text-main text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-text-main mb-1">Description</label>
                  <input
                    type="text"
                    value={
                      settings.sponsor_desc ||
                      'We build sub-second websites, custom web apps, and run SEO & Meta Ads with 100/100 Core Web Vitals for ambitious businesses worldwide. Free site audit with 12h reply guarantee.'
                    }
                    onChange={(e) => setSettings({ ...settings, sponsor_desc: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-surface-darker rounded-xl text-text-main text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-text-main mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={settings.sponsor_cta_text || 'Book Free Strategy Call'}
                    onChange={(e) => setSettings({ ...settings, sponsor_cta_text: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-surface-darker rounded-xl text-text-main text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-text-main mb-1">Destination URL</label>
                  <input
                    type="text"
                    value={settings.sponsor_cta_url || 'https://ostrune.netlify.app/'}
                    onChange={(e) => setSettings({ ...settings, sponsor_cta_url: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-surface-darker rounded-xl text-text-main text-xs"
                  />
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-main/50 block mb-2">
                  Live Public Preview (As Rendered to Citizens)
                </span>
                <div className="p-4 rounded-2xl bg-white border border-surface-darker shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20">
                        {settings.sponsor_badge || 'Ostrune Agency'}
                      </span>
                      <span className="text-[10px] text-text-main/40 uppercase tracking-widest font-semibold">
                        Agency Partner
                      </span>
                    </div>
                    <div className="font-extrabold text-sm text-text-main">
                      {settings.sponsor_title || 'Ostrune — Web Development, SEO & Speed Growth Agency'}
                    </div>
                    <p className="text-[11px] text-text-main/70 max-w-xl">
                      {settings.sponsor_desc ||
                        'We build sub-second websites, custom web apps, and run SEO & Meta Ads with 100/100 Core Web Vitals for ambitious businesses worldwide. Free site audit with 12h reply guarantee.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold text-xs shadow-xs hover:bg-primary-hover shrink-0 self-start sm:self-auto"
                  >
                    {settings.sponsor_cta_text || 'Book Free Strategy Call'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
