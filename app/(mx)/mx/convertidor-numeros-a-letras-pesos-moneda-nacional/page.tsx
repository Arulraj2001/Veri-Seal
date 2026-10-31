import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Convertidor de Números a Letras Pesos M.N. México 2026 | Kagazo México',
  description:
    'Convierte cualquier cifra monetaria al formato bancario y notarial oficial mexicano con especificación obligatoria de centavos sobre cien y sufijo M.N. para pagarés, cheques y contratos.',
  alternates: {
    canonical: 'https://kagazo.in/mx/convertidor-numeros-a-letras-pesos-moneda-nacional',
    languages: {
      'es-MX': 'https://kagazo.in/mx/convertidor-numeros-a-letras-pesos-moneda-nacional',
      'es': 'https://kagazo.in/mx/convertidor-numeros-a-letras-pesos-moneda-nacional',
      'x-default': 'https://kagazo.in/mx/convertidor-numeros-a-letras-pesos-moneda-nacional',
    },
  },
  openGraph: {
    title: 'Convertidor de Números a Letras Pesos M.N. México 2026 | Kagazo México',
    description:
      'Convierte cualquier cifra monetaria al formato bancario y notarial oficial mexicano con especificación obligatoria de centavos sobre cien y sufijo M.N. para pagarés, cheques y contratos.',
    url: 'https://kagazo.in/mx/convertidor-numeros-a-letras-pesos-moneda-nacional',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convertidor de Números a Letras Pesos M.N. México 2026',
    description:
      'Convierte cualquier cifra monetaria al formato bancario y notarial oficial mexicano con especificación obligatoria de centavos sobre cien y sufijo M.N. para pagarés, cheques y contratos.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
