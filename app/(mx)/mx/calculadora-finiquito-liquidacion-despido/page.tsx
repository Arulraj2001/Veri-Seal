import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Finiquito y Liquidación por Despido LFT 2026 | Kagazo México',
  description:
    'Calcula con precisión legal la indemnización constitucional de 3 meses, 20 días por año, prima de antigüedad y partes proporcionales de aguinaldo y vacaciones conforme a la Ley Federal del Trabajo reformada.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-finiquito-liquidacion-despido',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-finiquito-liquidacion-despido',
      'es': 'https://kagazo.in/mx/calculadora-finiquito-liquidacion-despido',
      'x-default': 'https://kagazo.in/mx/calculadora-finiquito-liquidacion-despido',
    },
  },
  openGraph: {
    title: 'Calculadora de Finiquito y Liquidación por Despido LFT 2026 | Kagazo México',
    description:
      'Calcula con precisión legal la indemnización constitucional de 3 meses, 20 días por año, prima de antigüedad y partes proporcionales de aguinaldo y vacaciones conforme a la Ley Federal del Trabajo reformada.',
    url: 'https://kagazo.in/mx/calculadora-finiquito-liquidacion-despido',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Finiquito y Liquidación por Despido LFT 2026',
    description:
      'Calcula con precisión legal la indemnización constitucional de 3 meses, 20 días por año, prima de antigüedad y partes proporcionales de aguinaldo y vacaciones conforme a la Ley Federal del Trabajo reformada.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
