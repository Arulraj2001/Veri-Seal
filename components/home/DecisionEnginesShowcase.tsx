'use client';

import * as React from 'react';
import Link from 'next/link';
import { Home, Car, TrendingUp, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const DECISION_ENGINES = [
  {
    id: 'home-cost',
    slug: '/home-cost',
    title: 'Home Construction Cost OS',
    badge: 'Civic Intelligence',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300',
    icon: Home,
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    headline: 'Build Smarter. Stop Contractor Overcharging.',
    description:
      'Engineered for Indian homeowners. Accurately calculate built-up area construction costs, cement bags, TMT steel tonnage, river vs M-sand volume, and labor rates tailored to your city.',
    highlights: ['Cement, Steel & Sand Estimator', 'Standard, Premium & Luxury Specs', 'Detailed PDF Cost Breakdown'],
    actionText: 'Launch Home Cost Calculator',
    accentBorder: 'hover:border-emerald-500/50',
  },
  {
    id: 'vehicle-os',
    slug: '/vehicle-os',
    title: 'Vehicle Decision OS',
    badge: 'TCO & EV Planner',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300',
    icon: Car,
    iconBg: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    headline: 'EV vs Petrol vs Hybrid: True 5-Year Ownership Cost',
    description:
      'Cut through dealership marketing hype. Factor in daily commute, real-world mileage, fuel inflation, EMI interest, insurance, battery replacement cycles, and resale depreciation.',
    highlights: ['5-Year Total Cost of Ownership', 'EV Break-Even Kilometer Timeline', 'Real-world Fuel vs Electric Savings'],
    actionText: 'Calculate Vehicle Economics',
    accentBorder: 'hover:border-amber-500/50',
  },
  {
    id: 'business-os',
    slug: '/business-os',
    title: 'Business Profit & Margin OS',
    badge: 'Enterprise Financials',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300',
    icon: TrendingUp,
    iconBg: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
    headline: 'Real Margins, Working Capital & Break-Even Analysis',
    description:
      'Designed for MSMEs, cyber cafes, and digital shops. Model gross margins after GST, operational overheads, CAC, staff payroll, and daily break-even sales requirements with clarity.',
    highlights: ['Post-GST Net Margin Modeler', 'Cash Runway & Burn Calculator', 'Unit Economics & CAC/LTV Ratio'],
    actionText: 'Plan Business Profit Margins',
    accentBorder: 'hover:border-indigo-500/50',
  },
];

export function DecisionEnginesShowcase() {
  return (
    <section id="decision-engines" className="py-20 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Civic &amp; Financial Intelligence</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main mt-4 tracking-tight leading-tight">
            Flagship Citizen Decision Engines
          </h2>
          <p className="text-sm sm:text-base text-text-main/70 mt-3 leading-relaxed">
            High-stakes financial decisions in India deserve transparent, unbiased data. Calculate exact home construction costs, vehicle ownership math, and enterprise margins with zero bias.
          </p>
        </div>

        {/* 3 Engines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DECISION_ENGINES.map((engine) => {
            const Icon = engine.icon;
            return (
              <div
                key={engine.id}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-surface-darker/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all ${engine.accentBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${engine.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${engine.badgeColor}`}>
                      {engine.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-text-main dark:text-white tracking-tight leading-snug group-hover:text-primary transition-colors">
                    {engine.title}
                  </h3>

                  <p className="text-xs font-bold text-primary mt-1">
                    {engine.headline}
                  </p>

                  <p className="text-xs sm:text-sm text-text-main/70 dark:text-slate-400 mt-3 leading-relaxed">
                    {engine.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-surface-darker/60 dark:border-slate-800 space-y-2.5">
                    {engine.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-semibold text-text-main/85 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={engine.slug}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-surface hover:bg-primary hover:text-white dark:bg-slate-800 dark:hover:bg-primary text-text-main dark:text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
                  >
                    <span>{engine.actionText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
