import * as React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import { fetchPublicSettings } from '@/lib/api';
import {
  ShieldCheck,
  Check,
  Zap,
  Star,
  ArrowRight,
  Receipt,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';

export default async function MyPlanPage() {
  const session = await auth();
  const settings = await fetchPublicSettings();
  const paymentEnabled = settings.payment_enabled;
  const userPlan = (session?.user as { plan?: string })?.plan || 'free';

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          My Plan &amp; Access Tier
        </h1>
        <p className="text-xs sm:text-sm text-text-main/70 mt-1">
          Review your subscription tier, verification quotas, and available enterprise features
        </p>
      </div>

      {/* Case 1: Payment Toggle is OFF -> Show "Free unlimited access" card only */}
      {!paymentEnabled ? (
        <div className="bg-white border-2 border-primary/20 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-surface-darker">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-text-main">
                    Free Unlimited Citizen Access
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-success-light text-success text-[11px] font-bold">
                    Active
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-text-main/60 mt-0.5">
                  Public Service Tier sponsored for Indian citizens under Digital India initiatives
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-3xl font-black text-text-main">₹0</div>
              <div className="text-xs font-semibold text-text-main/50">Completely Free Forever</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface/60">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-text-main">Unlimited PDF Verifications</div>
                <div className="text-[11px] text-text-main/60 mt-0.5">
                  Verify unlimited e-Aadhaar, e-PAN, caste, income, and state revenue certificates with no rate limits.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface/60">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-text-main">Zero Document Storage</div>
                <div className="text-[11px] text-text-main/60 mt-0.5">
                  PDF files are verified purely in RAM and never written to disk or third-party servers.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface/60">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-text-main">Authentic CCA India Root Trust</div>
                <div className="text-[11px] text-text-main/60 mt-0.5">
                  Full cryptographic trust chain validation against Controller of Certifying Authorities (CCA).
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface/60">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-text-main">LTV Stamping &amp; Download</div>
                <div className="text-[11px] text-text-main/60 mt-0.5">
                  Download green tick stamped PDFs with embedded Long-Term Validation (LTV) dictionaries.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-primary-light/40 border border-primary/20">
            <div className="flex items-center gap-2 text-xs text-text-main font-medium">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <span>
                All commercial and paid upgrades are currently deactivated by administrator policy.
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shrink-0"
            >
              <span>Verify PDF Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* Case 2: Payment Toggle is ON -> Show Plan Comparison + Upgrade Option */
        <div className="space-y-6">
          {/* Current Active Plan Banner */}
          <div className="bg-white border border-surface-darker/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-text-main/50 uppercase tracking-wider">
                Current Plan
              </div>
              <div className="text-2xl font-black text-text-main capitalize mt-1 flex items-center gap-2">
                <span>{userPlan} Tier</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-success-light text-success font-bold">
                  Active
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/payment"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-surface-darker bg-white hover:bg-surface text-xs font-bold text-text-main transition-colors shadow-sm"
              >
                <Receipt className="w-4 h-4 text-primary" />
                <span>Payment History</span>
              </Link>
            </div>
          </div>

          {/* Pricing Tier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="bg-white border border-surface-darker rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-surface-darker flex items-center justify-center text-text-main font-bold text-sm mb-4">
                  01
                </div>
                <h3 className="text-lg font-black text-text-main">Free Citizen</h3>
                <p className="text-xs text-text-main/60 mt-1">For occasional citizen document checks</p>

                <div className="my-5">
                  <span className="text-3xl font-black text-text-main">₹0</span>
                  <span className="text-xs text-text-main/50 font-medium ml-1">/ forever</span>
                </div>

                <ul className="space-y-2.5 text-xs text-text-main/80">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>3 Verifications per day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>Indian CCA Trust Chain audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>LTV PDF green tick download</span>
                  </li>
                  <li className="flex items-center gap-2 text-text-main/40">
                    <span className="w-4 h-4 text-center font-bold">✕</span>
                    <span>No priority server processing</span>
                  </li>
                  <li className="flex items-center gap-2 text-text-main/40">
                    <span className="w-4 h-4 text-center font-bold">✕</span>
                    <span>No developer API keys</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-surface-darker">
                {userPlan === 'free' ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-surface text-text-main/50 text-xs font-bold cursor-default"
                  >
                    Current Active Plan
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl border border-surface-darker text-text-main/50 text-xs font-semibold"
                  >
                    Downgrade
                  </button>
                )}
              </div>
            </div>

            {/* Pro Tier (Popular) */}
            <div className="bg-white border-2 border-primary rounded-3xl p-6 shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 fill-white" />
                <span>Most Popular</span>
              </div>

              <div>
                <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-sm mb-4">
                  02
                </div>
                <h3 className="text-lg font-black text-text-main">Pro Unlimited</h3>
                <p className="text-xs text-text-main/60 mt-1">For advocates, chartered accountants &amp; CSC centers</p>

                <div className="my-5">
                  <span className="text-3xl font-black text-text-main">₹199</span>
                  <span className="text-xs text-text-main/50 font-medium ml-1">/ month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-text-main/80">
                  <li className="flex items-center gap-2 font-bold text-text-main">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Unlimited PDF Verifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Dedicated RAM execution queue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Batch verification (up to 20 files)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Full CSV audit log export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Official certificate verification report</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-surface-darker">
                {userPlan === 'pro' ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-primary-light text-primary text-xs font-bold cursor-default"
                  >
                    Current Active Plan
                  </button>
                ) : (
                  <Link
                    href="/dashboard/payment?plan=pro"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-sm"
                  >
                    <span>Upgrade to Pro</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Business Tier */}
            <div className="bg-white border border-surface-darker rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-surface-darker flex items-center justify-center text-text-main font-bold text-sm mb-4">
                  03
                </div>
                <h3 className="text-lg font-black text-text-main">Business Enterprise</h3>
                <p className="text-xs text-text-main/60 mt-1">For fintechs, banks, universities &amp; verification portals</p>

                <div className="my-5">
                  <span className="text-3xl font-black text-text-main">₹2,499</span>
                  <span className="text-xs text-text-main/50 font-medium ml-1">/ month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-text-main/80">
                  <li className="flex items-center gap-2 font-bold text-text-main">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>REST API Access (500 req/day)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>Real-time webhook callbacks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>Custom certificate authority sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>99.9% uptime SLA guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>Dedicated technical integration support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-surface-darker">
                {userPlan === 'business' ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-primary-light text-primary text-xs font-bold cursor-default"
                  >
                    Current Active Plan
                  </button>
                ) : (
                  <Link
                    href="/dashboard/payment?plan=business"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all"
                  >
                    <span>Upgrade to Business</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
