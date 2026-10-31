import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Sueldo Neto México 2026 | Kagazo México',
  description:
    'Convierte tu sueldo bruto a neto mensual o quincenal con el desglose exacto de retención de ISR conforme a las tablas oficiales del SAT 2026, cuotas obreras del IMSS y subsidio para el empleo.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-sueldo-neto-imss-isr',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-sueldo-neto-imss-isr',
      'es': 'https://kagazo.in/mx/calculadora-sueldo-neto-imss-isr',
      'x-default': 'https://kagazo.in/mx/calculadora-sueldo-neto-imss-isr',
    },
  },
  openGraph: {
    title: 'Calculadora de Sueldo Neto México 2026 | Kagazo México',
    description:
      'Convierte tu sueldo bruto a neto mensual o quincenal con el desglose exacto de retención de ISR conforme a las tablas oficiales del SAT 2026, cuotas obreras del IMSS y subsidio para el empleo.',
    url: 'https://kagazo.in/mx/calculadora-sueldo-neto-imss-isr',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Sueldo Neto México 2026',
    description:
      'Convierte tu sueldo bruto a neto mensual o quincenal con el desglose exacto de retención de ISR conforme a las tablas oficiales del SAT 2026, cuotas obreras del IMSS y subsidio para el empleo.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
