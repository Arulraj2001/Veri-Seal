import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Amortización de Pérdidas Fiscales SAT México 2026 | Kagazo México',
  description:
    'Actualiza tus pérdidas fiscales de ejercicios anteriores mediante los factores de inflación INPC del INEGI y simula su amortización contra la utilidad fiscal con cálculo del ahorro en ISR corporativo (30%).',
  alternates: {
    canonical: 'https://kagazo.in/mx/amortizacion-perdidas-fiscales-sat',
    languages: {
      'es-MX': 'https://kagazo.in/mx/amortizacion-perdidas-fiscales-sat',
      'es': 'https://kagazo.in/mx/amortizacion-perdidas-fiscales-sat',
      'x-default': 'https://kagazo.in/mx/amortizacion-perdidas-fiscales-sat',
    },
  },
  openGraph: {
    title: 'Calculadora de Amortización de Pérdidas Fiscales SAT México 2026 | Kagazo México',
    description:
      'Actualiza tus pérdidas fiscales de ejercicios anteriores mediante los factores de inflación INPC del INEGI y simula su amortización contra la utilidad fiscal con cálculo del ahorro en ISR corporativo (30%).',
    url: 'https://kagazo.in/mx/amortizacion-perdidas-fiscales-sat',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Amortización de Pérdidas Fiscales SAT México 2026',
    description:
      'Actualiza tus pérdidas fiscales de ejercicios anteriores mediante los factores de inflación INPC del INEGI y simula su amortización contra la utilidad fiscal con cálculo del ahorro en ISR corporativo (30%).',
  },
};

export default function Page() {
  return <ClientEngine />;
}
