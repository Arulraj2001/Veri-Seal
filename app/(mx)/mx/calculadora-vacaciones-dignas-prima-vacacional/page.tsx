import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Vacaciones Dignas y Prima Vacacional 2026 | Kagazo México',
  description:
    'Conoce los días exactos de descanso legal obligatorio conforme al Artículo 76 de la LFT (desde 12 días), la prima vacacional del 25% y la exención fiscal del SAT de 15 UMAs.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-vacaciones-dignas-prima-vacacional',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-vacaciones-dignas-prima-vacacional',
      'es': 'https://kagazo.in/mx/calculadora-vacaciones-dignas-prima-vacacional',
      'x-default': 'https://kagazo.in/mx/calculadora-vacaciones-dignas-prima-vacacional',
    },
  },
  openGraph: {
    title: 'Calculadora de Vacaciones Dignas y Prima Vacacional 2026 | Kagazo México',
    description:
      'Conoce los días exactos de descanso legal obligatorio conforme al Artículo 76 de la LFT (desde 12 días), la prima vacacional del 25% y la exención fiscal del SAT de 15 UMAs.',
    url: 'https://kagazo.in/mx/calculadora-vacaciones-dignas-prima-vacacional',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Vacaciones Dignas y Prima Vacacional 2026',
    description:
      'Conoce los días exactos de descanso legal obligatorio conforme al Artículo 76 de la LFT (desde 12 días), la prima vacacional del 25% y la exención fiscal del SAT de 15 UMAs.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
