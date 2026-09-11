'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { FAQ } from '@/lib/constants';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function FaqSection() {
  const { t, language } = useLanguage();

  return (
    <section id="faq-section" className="py-20 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            {t.faq.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-4 tracking-tight">
            {t.faq.heading}
          </h2>
          <p className="text-base sm:text-lg text-text-main/70 mt-3">
            {t.faq.subheading}
          </p>
        </div>

        {/* Accordion Component */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-darker shadow-soft">
          <Accordion defaultValue="faq-0">
            {FAQ.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Help footer */}
        <div className="mt-10 text-center text-xs text-text-main/60">
          {t.faq.contactNote}{' '}
          <Link
            href="/contact"
            className="text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>{t.faq.contactLink}</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
