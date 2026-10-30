import * as React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export const metadata: Metadata = {
  title: 'Herramientas y Calculadoras Oficiales España 2026 | Kagazo',
  description:
    'Suite completa de calculadoras laborales, fiscales, hipotecarias y de trámites en España: IRPF 2026, sueldo neto, finiquito, hipoteca Euríbor, ITP, foto DNI y facturas PDF.',
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      'es-ES': `${SITE_URL}/es`,
      'es': `${SITE_URL}/es`,
      'x-default': `${SITE_URL}/es`,
    },
  },
  openGraph: {
    title: 'Herramientas y Calculadoras Oficiales España 2026 | Kagazo',
    description:
      'Calculadoras oficiales de nómina, IRPF, hipotecas y utilidades administrativas para trabajadores, autónomos y ciudadanos en España.',
    url: `${SITE_URL}/es`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpanishHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-orange-500/20 selection:text-orange-950 font-sans">
      <InternationalHeader country="es" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="es" />
    </div>
  );
}
