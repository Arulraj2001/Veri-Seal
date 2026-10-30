import * as React from 'react';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export default function BrazilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 antialiased font-sans">
      <InternationalHeader country="br" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="br" />
    </div>
  );
}

