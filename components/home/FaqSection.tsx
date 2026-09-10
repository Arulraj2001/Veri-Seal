'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { FAQ } from '@/lib/constants';

export function FaqSection() {
  return (
    <section id="faq-section" className="py-20 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-text-main/70 mt-3">
            Everything you need to know about Indian government digital signatures and PKI certificates.
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
          Still have questions regarding your specific certificate or signature?{' '}
          <a
            href="mailto:support@veriseal.in"
            className="text-primary font-bold hover:underline"
          >
            Contact our technical team
          </a>
        </div>
      </div>
    </section>
  );
}
