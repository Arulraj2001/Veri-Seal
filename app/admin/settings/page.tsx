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
      </div>
    </div>
  );
}
