'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionContextType {
  openItem: string | null;
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export function Accordion({
  children,
  className,
  defaultValue = null,
}: {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string | null;
}) {
  const [openItem, setOpenItem] = React.useState<string | null>(defaultValue);

  const toggleItem = (value: string) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className={cn('divide-y divide-surface-darker/60', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('py-2 first:pt-0 last:pb-0', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ itemValue?: string }>, {
            itemValue: value,
          });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({
  children,
  className,
  itemValue,
}: {
  children: React.ReactNode;
  className?: string;
  itemValue?: string;
}) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx || !itemValue) return null;

  const isOpen = ctx.openItem === itemValue;

  return (
    <button
      type="button"
      onClick={() => ctx.toggleItem(itemValue)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium text-text-main transition-all hover:text-primary focus:outline-none group',
        className
      )}
      aria-expanded={isOpen}
    >
      <span className="text-base sm:text-lg font-semibold pr-4 leading-snug group-hover:text-primary transition-colors">
        {children}
      </span>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface transition-transform duration-300 group-hover:bg-primary-light',
          isOpen && 'rotate-180 bg-primary-light text-primary'
        )}
      >
        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
      </div>
    </button>
  );
}

export function AccordionContent({
  children,
  className,
  itemValue,
}: {
  children: React.ReactNode;
  className?: string;
  itemValue?: string;
}) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx || !itemValue) return null;

  const isOpen = ctx.openItem === itemValue;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={cn('pb-5 text-sm sm:text-base text-text-main/80 leading-relaxed', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
