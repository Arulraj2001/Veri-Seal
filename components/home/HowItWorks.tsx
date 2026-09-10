'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, ShieldCheck, Download, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS } from '@/lib/constants';

export function HowItWorks() {
  const stepIcons = [UploadCloud, ShieldCheck, Download];

  return (
    <section id="how-it-works" className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-4 tracking-tight">
            How VeriSeal Works
          </h2>
          <p className="text-base sm:text-lg text-text-main/70 mt-3">
            Instant PKI verification compliant with the IT Act 2000. Zero software installation required.
          </p>
        </div>

        {/* 3 Steps: Horizontal on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] -translate-y-8 h-0.5 border-t-2 border-dashed border-primary/30 -z-0" />

          {HOW_IT_WORKS.map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.18, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left bg-white rounded-3xl p-8 border border-surface-darker/70 shadow-soft hover:shadow-card hover:border-primary/30 transition-all group"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary-light border border-primary/25 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-3xl font-black text-surface-darker group-hover:text-primary/30 transition-colors font-mono">
                    0{step.step}
                  </span>
                </div>

                <span className="text-xs font-bold text-primary tracking-wide mb-2 uppercase">
                  {step.badge}
                </span>

                <h3 className="text-xl font-bold text-text-main mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-text-main/75 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick CTA banner below steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 p-6 rounded-2xl bg-surface border border-surface-darker flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div>
            <h4 className="font-bold text-text-main">
              Ready to fix the yellow question mark on your PDF?
            </h4>
            <p className="text-xs text-text-main/60 mt-0.5">
              Takes less than 3 seconds. Free and completely private.
            </p>
          </div>

          <a href="#upload-zone" className="shrink-0">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
              <span>Go to Verification Tool</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
