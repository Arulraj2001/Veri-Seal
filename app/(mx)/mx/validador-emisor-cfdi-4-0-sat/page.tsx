import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Validador de Requisitos Fiscales Factura CFDI 4.0 SAT | Kagazo México',
  description:
    'Verifica al instante la compatibilidad de RFC, Razón Social sin régimen societario, Código Postal del receptor y matriz Uso de CFDI vs Régimen Fiscal para evitar rechazos en el timbrado del SAT.',
  alternates: {
    canonical: 'https://kagazo.in/mx/validador-emisor-cfdi-4-0-sat',
    languages: {
      'es-MX': 'https://kagazo.in/mx/validador-emisor-cfdi-4-0-sat',
      'es': 'https://kagazo.in/mx/validador-emisor-cfdi-4-0-sat',
      'x-default': 'https://kagazo.in/mx/validador-emisor-cfdi-4-0-sat',
    },
  },
  openGraph: {
    title: 'Validador de Requisitos Fiscales Factura CFDI 4.0 SAT | Kagazo México',
    description:
      'Verifica al instante la compatibilidad de RFC, Razón Social sin régimen societario, Código Postal del receptor y matriz Uso de CFDI vs Régimen Fiscal para evitar rechazos en el timbrado del SAT.',
    url: 'https://kagazo.in/mx/validador-emisor-cfdi-4-0-sat',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Validador de Requisitos Fiscales Factura CFDI 4.0 SAT',
    description:
      'Verifica al instante la compatibilidad de RFC, Razón Social sin régimen societario, Código Postal del receptor y matriz Uso de CFDI vs Régimen Fiscal para evitar rechazos en el timbrado del SAT.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
