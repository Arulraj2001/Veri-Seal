import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Compresor de PDF para Buzón Tributario del SAT México 2026 | Kagazo México',
  description:
    'Comprime tus expedientes contables, estados de cuenta y aclaraciones para cumplir con el límite estricto de 4 MB del Buzón Tributario del SAT e IMSS. Ejecución 100% en tu navegador con privacidad total.',
  alternates: {
    canonical: 'https://kagazo.in/mx/compresor-pdf-buzon-tributario-sat',
    languages: {
      'es-MX': 'https://kagazo.in/mx/compresor-pdf-buzon-tributario-sat',
      'es': 'https://kagazo.in/mx/compresor-pdf-buzon-tributario-sat',
      'x-default': 'https://kagazo.in/mx/compresor-pdf-buzon-tributario-sat',
    },
  },
  openGraph: {
    title: 'Compresor de PDF para Buzón Tributario del SAT México 2026 | Kagazo México',
    description:
      'Comprime tus expedientes contables, estados de cuenta y aclaraciones para cumplir con el límite estricto de 4 MB del Buzón Tributario del SAT e IMSS. Ejecución 100% en tu navegador con privacidad total.',
    url: 'https://kagazo.in/mx/compresor-pdf-buzon-tributario-sat',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compresor de PDF para Buzón Tributario del SAT México 2026',
    description:
      'Comprime tus expedientes contables, estados de cuenta y aclaraciones para cumplir con el límite estricto de 4 MB del Buzón Tributario del SAT e IMSS. Ejecución 100% en tu navegador con privacidad total.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
