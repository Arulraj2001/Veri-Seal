import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Validador Oficial de RFC con Homoclave SAT México 2026 | Kagazo México',
  description:
    'Verifica la estructura, sintaxis, fecha de constitución o nacimiento y dígito verificador del Registro Federal de Contribuyentes (12 caracteres morales o 13 físicos).',
  alternates: {
    canonical: 'https://kagazo.in/mx/validador-rfc-sat-homoclave',
    languages: {
      'es-MX': 'https://kagazo.in/mx/validador-rfc-sat-homoclave',
      'es': 'https://kagazo.in/mx/validador-rfc-sat-homoclave',
      'x-default': 'https://kagazo.in/mx/validador-rfc-sat-homoclave',
    },
  },
  openGraph: {
    title: 'Validador Oficial de RFC con Homoclave SAT México 2026 | Kagazo México',
    description:
      'Verifica la estructura, sintaxis, fecha de constitución o nacimiento y dígito verificador del Registro Federal de Contribuyentes (12 caracteres morales o 13 físicos).',
    url: 'https://kagazo.in/mx/validador-rfc-sat-homoclave',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Validador Oficial de RFC con Homoclave SAT México 2026',
    description:
      'Verifica la estructura, sintaxis, fecha de constitución o nacimiento y dígito verificador del Registro Federal de Contribuyentes (12 caracteres morales o 13 físicos).',
  },
};

export default function Page() {
  return <ClientEngine />;
}
