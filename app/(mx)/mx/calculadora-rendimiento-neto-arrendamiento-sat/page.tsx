import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Rendimiento Neto de Arrendamiento y Deducción Ciega 2026 | Kagazo México',
  description:
    'Compara la deducción opcional ciega del 35% frente a gastos comprobados y depreciación del 5%, calcula el ISR definitivo del SAT y determina el Cap Rate neto real de tu inmueble.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-rendimiento-neto-arrendamiento-sat',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-rendimiento-neto-arrendamiento-sat',
      'es': 'https://kagazo.in/mx/calculadora-rendimiento-neto-arrendamiento-sat',
      'x-default': 'https://kagazo.in/mx/calculadora-rendimiento-neto-arrendamiento-sat',
    },
  },
  openGraph: {
    title: 'Calculadora de Rendimiento Neto de Arrendamiento y Deducción Ciega 2026 | Kagazo México',
    description:
      'Compara la deducción opcional ciega del 35% frente a gastos comprobados y depreciación del 5%, calcula el ISR definitivo del SAT y determina el Cap Rate neto real de tu inmueble.',
    url: 'https://kagazo.in/mx/calculadora-rendimiento-neto-arrendamiento-sat',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Rendimiento Neto de Arrendamiento y Deducción Ciega 2026',
    description:
      'Compara la deducción opcional ciega del 35% frente a gastos comprobados y depreciación del 5%, calcula el ISR definitivo del SAT y determina el Cap Rate neto real de tu inmueble.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
