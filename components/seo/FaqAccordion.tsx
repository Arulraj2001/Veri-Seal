'use client';

import * as React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqList: FaqItem[];
  docType: string;
}

export function FaqAccordion({ faqList, docType }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  if (!faqList || faqList.length === 0) return null;

  return (
    <div className="space-y-4">
      {faqList.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-surface-darker rounded-2xl bg-white overflow-hidden transition-all"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-text-main hover:text-primary transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-3">
                <span className="p-1 rounded-lg bg-primary-light text-primary mt-0.5 shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </span>
                <span>{item.q}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-text-main/50 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 text-sm sm:text-base text-text-main/80 leading-relaxed border-t border-surface-darker/60 bg-surface/30">
                <p className="pl-7">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
