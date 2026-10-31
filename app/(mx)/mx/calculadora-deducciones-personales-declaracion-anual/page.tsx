import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Deducciones Personales y Devolución SAT 2026 | Kagazo México',
  description:
    'Verifica tu tope global de deducciones (el menor entre 15% de ingresos o 5 UMAs anuales), calcula deducciones médicas, hipotecarias y colegiaturas, y estima tu saldo a favor de ISR.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-deducciones-personales-declaracion-anual',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-deducciones-personales-declaracion-anual',
      'es': 'https://kagazo.in/mx/calculadora-deducciones-personales-declaracion-anual',
      'x-default': 'https://kagazo.in/mx/calculadora-deducciones-personales-declaracion-anual',
    },
  },
  openGraph: {
    title: 'Calculadora de Deducciones Personales y Devolución SAT 2026 | Kagazo México',
    description:
      'Verifica tu tope global de deducciones (el menor entre 15% de ingresos o 5 UMAs anuales), calcula deducciones médicas, hipotecarias y colegiaturas, y estima tu saldo a favor de ISR.',
    url: 'https://kagazo.in/mx/calculadora-deducciones-personales-declaracion-anual',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Deducciones Personales y Devolución SAT 2026',
    description:
      'Verifica tu tope global de deducciones (el menor entre 15% de ingresos o 5 UMAs anuales), calcula deducciones médicas, hipotecarias y colegiaturas, y estima tu saldo a favor de ISR.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
