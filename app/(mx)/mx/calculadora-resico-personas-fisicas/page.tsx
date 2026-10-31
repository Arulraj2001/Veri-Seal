import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora RESICO Personas Físicas México 2026 (SAT) | Kagazo México',
  description:
    'Calcula tu pago mensual de ISR en el Régimen Simplificado de Confianza con tasas desde el 1.0% hasta el 2.5%, retención del 1.25% de personas morales y comparativa de ahorro fiscal.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-resico-personas-fisicas',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-resico-personas-fisicas',
      'es': 'https://kagazo.in/mx/calculadora-resico-personas-fisicas',
      'x-default': 'https://kagazo.in/mx/calculadora-resico-personas-fisicas',
    },
  },
  openGraph: {
    title: 'Calculadora RESICO Personas Físicas México 2026 (SAT) | Kagazo México',
    description:
      'Calcula tu pago mensual de ISR en el Régimen Simplificado de Confianza con tasas desde el 1.0% hasta el 2.5%, retención del 1.25% de personas morales y comparativa de ahorro fiscal.',
    url: 'https://kagazo.in/mx/calculadora-resico-personas-fisicas',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora RESICO Personas Físicas México 2026 (SAT)',
    description:
      'Calcula tu pago mensual de ISR en el Régimen Simplificado de Confianza con tasas desde el 1.0% hasta el 2.5%, retención del 1.25% de personas morales y comparativa de ahorro fiscal.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
