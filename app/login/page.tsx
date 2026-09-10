'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await signIn('credentials', {
        email: email.trim(),
        redirect: false,
      });

      if (res?.error) {
        setError('Failed to sign in. Please check your email and try again.');
      } else {
        setMessage('Sign-in successful! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1200);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-background bg-dot-grid px-4">
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
              Veri<span className="text-primary">Seal</span>
            </span>
          </Link>

          <h1 className="text-2xl font-extrabold text-text-main tracking-tight">
            Sign In to VeriSeal
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 mt-1">
            Access your verification history, API keys, and dashboard.
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
          <div className="mb-6 p-4 rounded-xl bg-error-light border border-error/30 text-xs font-semibold text-error-dark">
            {error}
          </div>
        )}

        {/* Email Magic Link Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full bg-surface/50 border border-surface-darker focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pl-10"
              />
              <Mail className="w-4 h-4 text-text-main/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full font-bold shadow-md"
          >
            {isLoading ? 'Processing...' : 'Continue with Email'}
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
          By signing in, you agree to VeriSeal&apos;s Terms of Service and Privacy Policy. Files uploaded are processed strictly in-memory.
        </p>
      </div>
    </div>
  );
}
