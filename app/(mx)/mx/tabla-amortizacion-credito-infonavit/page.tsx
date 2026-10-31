import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Tabla de Amortización Crédito Infonavit en Pesos 2026 | Kagazo México',
  description:
    'Simula tus pagos mensuales fijos en Pesos, la amortización real del capital, la tasa de interés asignada según tu nivel salarial y el abono patronal del 5% directo a deuda.',
  alternates: {
    canonical: 'https://kagazo.in/mx/tabla-amortizacion-credito-infonavit',
    languages: {
      'es-MX': 'https://kagazo.in/mx/tabla-amortizacion-credito-infonavit',
      'es': 'https://kagazo.in/mx/tabla-amortizacion-credito-infonavit',
      'x-default': 'https://kagazo.in/mx/tabla-amortizacion-credito-infonavit',
    },
  },
  openGraph: {
    title: 'Tabla de Amortización Crédito Infonavit en Pesos 2026 | Kagazo México',
    description:
      'Simula tus pagos mensuales fijos en Pesos, la amortización real del capital, la tasa de interés asignada según tu nivel salarial y el abono patronal del 5% directo a deuda.',
    url: 'https://kagazo.in/mx/tabla-amortizacion-credito-infonavit',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tabla de Amortización Crédito Infonavit en Pesos 2026',
    description:
      'Simula tus pagos mensuales fijos en Pesos, la amortización real del capital, la tasa de interés asignada según tu nivel salarial y el abono patronal del 5% directo a deuda.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
