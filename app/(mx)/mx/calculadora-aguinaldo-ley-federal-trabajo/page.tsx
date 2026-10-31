import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Aguinaldo Legal LFT 2026 | Kagazo México',
  description:
    'Calcula tu aguinaldo neto y proporcional conforme al Artículo 87 de la Ley Federal del Trabajo, con el desglose exacto de los 30 días de UMA exentos de ISR ante el SAT.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-aguinaldo-ley-federal-trabajo',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-aguinaldo-ley-federal-trabajo',
      'es': 'https://kagazo.in/mx/calculadora-aguinaldo-ley-federal-trabajo',
      'x-default': 'https://kagazo.in/mx/calculadora-aguinaldo-ley-federal-trabajo',
    },
  },
  openGraph: {
    title: 'Calculadora de Aguinaldo Legal LFT 2026 | Kagazo México',
    description:
      'Calcula tu aguinaldo neto y proporcional conforme al Artículo 87 de la Ley Federal del Trabajo, con el desglose exacto de los 30 días de UMA exentos de ISR ante el SAT.',
    url: 'https://kagazo.in/mx/calculadora-aguinaldo-ley-federal-trabajo',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Aguinaldo Legal LFT 2026',
    description:
      'Calcula tu aguinaldo neto y proporcional conforme al Artículo 87 de la Ley Federal del Trabajo, con el desglose exacto de los 30 días de UMA exentos de ISR ante el SAT.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
