import * as React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export const metadata: Metadata = {
  title: 'Calculadoras y Trámites Oficiales México 2026 | Sueldo Neto LFT, SAT y Infonavit',
  description:
    'Suite legal y fiscal oficial para México 2026: Calculadora de Sueldo Neto IMSS/ISR, Finiquito y Liquidación Art. 50 LFT, Aguinaldo Legal, RESICO SAT, Puntos Infonavit T1000 y Validador CURP/RFC.',
  alternates: {
    languages: {
      'es-MX': `${SITE_URL}/mx`,
      'es': `${SITE_URL}/mx`,
      'x-default': `${SITE_URL}/mx`,
    },
  },
  openGraph: {
    title: 'Calculadoras y Trámites Oficiales México 2026 | Kagazo',
    description:
      'Herramientas legales de alta precisión jurídica conforme a la Ley Federal del Trabajo, tablas de ISR del SAT y modelos de crédito Infonavit. 100% en tu navegador con privacidad total.',
    url: `${SITE_URL}/mx`,
    locale: 'es_MX',
    siteName: 'Kagazo México',
    type: 'website',
  },
};

export default function MexicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 antialiased font-sans">
      <InternationalHeader country="mx" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="mx" />
    </div>
  );
}
