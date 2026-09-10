'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import {
  User,
  Mail,
  Languages,
  ShieldAlert,
  Save,
  CheckCircle2,
  Trash2,
  Lock,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [language, setLanguage] = React.useState<'en' | 'ta'>('en');
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  // Sync state with session
  React.useEffect(() => {
    if (session?.user) {
      setName(session.user.name || 'Citizen User');
      setEmail(session.user.email || 'citizen@veriseal.in');
    }
  }, [session]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        if (update) {
          await update({ name: name.trim() });
        }
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch('/api/user', {
        method: 'DELETE',
      });
      if (res.ok) {
        signOut({ callbackUrl: '/' });
      }
    } catch (err) {
      console.error('Failed to delete account:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-text-main/70 mt-1">
          Manage your personal verification identity, notification preferences, and account security
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-success-light border border-success/20 text-success text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile details updated successfully.</span>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-text-main mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary" />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary focus:bg-white transition-colors"
          />
        </div>

        {/* Email Address (Non-editable) */}
        <div>
          <label className="block text-xs font-bold text-text-main mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-text-main/60" />
              <span>Email Address</span>
            </span>
            <span className="text-[10px] text-text-main/50 font-medium flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Non-editable (Primary Auth ID)</span>
            </span>
          </label>
          <input
            type="email"
            disabled
            value={email}
            className="w-full px-3.5 py-2.5 text-xs bg-surface/80 border border-surface-darker rounded-xl text-text-main/60 cursor-not-allowed font-medium"
          />
        </div>

        {/* Language Preference */}
        <div>
          <label className="block text-xs font-bold text-text-main mb-2 flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-primary" />
            <span>Language Preference / மொழி விருப்பம்</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`p-3 rounded-xl border text-left transition-all ${
                language === 'en'
                  ? 'border-primary bg-primary-light/30 ring-2 ring-primary/20'
                  : 'border-surface-darker bg-surface/30 hover:border-text-main/20'
              }`}
            >
              <div className="text-xs font-bold text-text-main">English (Default)</div>
              <div className="text-[11px] text-text-main/60 mt-0.5">Indian Government Standard</div>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('ta')}
              className={`p-3 rounded-xl border text-left transition-all ${
                language === 'ta'
                  ? 'border-primary bg-primary-light/30 ring-2 ring-primary/20'
                  : 'border-surface-darker bg-surface/30 hover:border-text-main/20'
              }`}
            >
              <div className="text-xs font-bold text-text-main">தமிழ் (Tamil)</div>
              <div className="text-[11px] text-text-main/60 mt-0.5">தமிழ்நாடு மின் ஆளுமை தளம்</div>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover disabled:opacity-50 transition-all shadow-sm shadow-primary/20"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>

      {/* Danger Zone: Delete Account */}
      <div className="bg-white border border-error/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-error-light text-error">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-text-main">Danger Zone: Delete Account</h3>
            <p className="text-xs text-text-main/60">
              Permanently erase your user profile, verification history, and stored API credentials.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-error/40 text-error hover:bg-error-light text-xs font-bold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete VeriSeal Account</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-surface-darker rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-error-light text-error flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 className="text-base font-black text-text-main">
              Confirm Account Deletion
            </h3>

            <p className="text-xs text-text-main/70">
              Are you sure you want to permanently delete your account? This action cannot be undone. All your past cryptographic audit histories will be irrevocably purged.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl border border-surface-darker text-xs font-bold text-text-main hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl bg-error text-white text-xs font-bold hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Everything'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
