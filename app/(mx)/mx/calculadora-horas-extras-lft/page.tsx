import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Horas Extras LFT México 2026 (Dobles y Triples) | Kagazo México',
  description:
    'Calcula el pago de tiempo extraordinario según el tipo de jornada (diurna, mixta o nocturna), la regla de las 9 primeras horas al 100% (dobles), excedentes al 200% (triples) y el tope de exención de ISR.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-horas-extras-lft',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-horas-extras-lft',
      'es': 'https://kagazo.in/mx/calculadora-horas-extras-lft',
      'x-default': 'https://kagazo.in/mx/calculadora-horas-extras-lft',
    },
  },
  openGraph: {
    title: 'Calculadora de Horas Extras LFT México 2026 (Dobles y Triples) | Kagazo México',
    description:
      'Calcula el pago de tiempo extraordinario según el tipo de jornada (diurna, mixta o nocturna), la regla de las 9 primeras horas al 100% (dobles), excedentes al 200% (triples) y el tope de exención de ISR.',
    url: 'https://kagazo.in/mx/calculadora-horas-extras-lft',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Horas Extras LFT México 2026 (Dobles y Triples)',
    description:
      'Calcula el pago de tiempo extraordinario según el tipo de jornada (diurna, mixta o nocturna), la regla de las 9 primeras horas al 100% (dobles), excedentes al 200% (triples) y el tope de exención de ISR.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
