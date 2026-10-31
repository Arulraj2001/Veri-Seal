import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Validador Oficial de CURP México 2026 (Algoritmo RENAPO) | Kagazo México',
  description:
    'Verifica la autenticidad matemática de cualquier Clave Única de Registro de Población (18 caracteres) con validación de dígito verificador, fecha de nacimiento, entidad de registro y homoclave.',
  alternates: {
    canonical: 'https://kagazo.in/mx/validador-generador-curp-oficial',
    languages: {
      'es-MX': 'https://kagazo.in/mx/validador-generador-curp-oficial',
      'es': 'https://kagazo.in/mx/validador-generador-curp-oficial',
      'x-default': 'https://kagazo.in/mx/validador-generador-curp-oficial',
    },
  },
  openGraph: {
    title: 'Validador Oficial de CURP México 2026 (Algoritmo RENAPO) | Kagazo México',
    description:
      'Verifica la autenticidad matemática de cualquier Clave Única de Registro de Población (18 caracteres) con validación de dígito verificador, fecha de nacimiento, entidad de registro y homoclave.',
    url: 'https://kagazo.in/mx/validador-generador-curp-oficial',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Validador Oficial de CURP México 2026 (Algoritmo RENAPO)',
    description:
      'Verifica la autenticidad matemática de cualquier Clave Única de Registro de Población (18 caracteres) con validación de dígito verificador, fecha de nacimiento, entidad de registro y homoclave.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
