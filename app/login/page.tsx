'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const isAdminEmail =
    email.trim().toLowerCase() === 'admin@Kagazo.in' ||
    email.trim().toLowerCase().startsWith('admin@') ||
    email.trim().toLowerCase().includes('admin');

  React.useEffect(() => {
    const urlError = searchParams.get('error');
    if (urlError) {
      if (urlError === 'OAuthSignin' || urlError === 'OAuthCallback' || urlError === 'Configuration') {
        setError('Google OAuth requires valid GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET credentials in .env.local.');
      } else if (urlError === 'AccessDenied') {
        setError('Sign-in access was denied by Google.');
      } else if (urlError === 'admin_required') {
        setError('Admin access required. Please sign in with admin@Kagazo.in and your password.');
      } else {
        setError(`Authentication notice: ${urlError}`);
      }
    }
  }, [searchParams]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (isAdminEmail && !password.trim()) {
      setError('Password is required for the prebuilt admin account.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await signIn('credentials', {
        email: email.trim(),
        password: password,
        redirect: false,
      });

      if (res?.error) {
        if (isAdminEmail) {
          setError(
            'Incorrect admin password. Please enter the password you set for admin@Kagazo.in in Supabase Auth.'
          );
        } else {
          setError('Failed to sign in. Please verify your credentials and try again.');
        }
      } else {
        setMessage(
          isAdminEmail
            ? 'Admin verified successfully! Redirecting to Admin Control Panel...'
            : 'Sign-in successful! Redirecting to dashboard...'
        );
        setTimeout(() => {
          if (isAdminEmail) {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
          router.refresh();
        }, 1000);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError(null);
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl border border-surface-darker shadow-card p-8 sm:p-10 relative overflow-hidden">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="h-11 w-11 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <svg
              className="w-6 h-6 text-primary fill-primary/15 stroke-primary"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <span className="text-2xl font-black text-text-main">
            Kaga<span className="text-primary">zo</span>
          </span>
        </Link>

        <h1 className="text-2xl font-extrabold text-text-main tracking-tight">
          Sign In to Kagazo
        </h1>
        <p className="text-xs sm:text-sm text-text-main/70 mt-1">
          Access your verification history, API keys, or administrative panel.
        </p>
      </div>

      {/* Feedback Messages */}
      {message && (
        <div className="mb-6 p-4 rounded-xl bg-success-light border border-success/30 flex items-center gap-2 text-xs font-semibold text-success-dark">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-error-light border border-error/30 flex items-start gap-2 text-xs font-semibold text-error-dark">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Email & Password Form */}
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="admin@Kagazo.in or name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full bg-surface/50 border border-surface-darker focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pl-10"
            />
            <Mail className="w-4 h-4 text-text-main/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider">
              Password{' '}
              {isAdminEmail ? (
                <span className="text-primary font-black normal-case">(Required for Admin)</span>
              ) : (
                <span className="text-text-main/50 font-normal normal-case">(optional for citizen demo)</span>
              )}
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={isAdminEmail ? 'Enter Supabase admin password' : 'Enter password (if registered)'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full bg-surface/50 border border-surface-darker focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pl-10 pr-10 font-mono"
            />
            <Lock className="w-4 h-4 text-text-main/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-main/40 hover:text-text-main focus:outline-none"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {isAdminEmail && (
            <p className="text-[11px] text-primary/80 mt-1.5 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Verified against Supabase Auth for admin@Kagazo.in</span>
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="w-full font-bold shadow-md"
        >
          {isLoading ? 'Authenticating...' : isAdminEmail ? 'Sign In as Administrator' : 'Sign In'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-darker/60" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-text-main/50 font-semibold">
            Or sign in with
          </span>
        </div>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-surface-darker hover:border-text-main/40 bg-white text-sm font-bold text-text-main transition-colors shadow-2xs hover:bg-surface/40"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
          />
        </svg>
        <span>Sign in with Google</span>
      </button>

      {/* Terms footnote */}
      <p className="mt-8 text-center text-[11px] text-text-main/60 leading-relaxed">
        By signing in, you agree to Kagazo&apos;s Terms of Service and Privacy Policy. Files uploaded are processed strictly in-memory.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-background bg-dot-grid px-4">
      <React.Suspense
        fallback={
          <div className="max-w-md w-full bg-white rounded-3xl border border-surface-darker shadow-card p-10 text-center text-sm font-semibold text-text-main/60">
            Loading sign in options...
          </div>
        }
      >
        <LoginFormContent />
      </React.Suspense>
    </div>
  );
}
