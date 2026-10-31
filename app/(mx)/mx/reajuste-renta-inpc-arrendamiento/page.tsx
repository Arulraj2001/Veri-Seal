import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Reajuste de Renta por Inflación INPC México 2026 | Kagazo México',
  description:
    'Actualiza el canon de arrendamiento conforme al Índice Nacional de Precios al Consumidor (INEGI), verifica los topes de ley civil y genera la carta de notificación formal lista para firmar.',
  alternates: {
    canonical: 'https://kagazo.in/mx/reajuste-renta-inpc-arrendamiento',
    languages: {
      'es-MX': 'https://kagazo.in/mx/reajuste-renta-inpc-arrendamiento',
      'es': 'https://kagazo.in/mx/reajuste-renta-inpc-arrendamiento',
      'x-default': 'https://kagazo.in/mx/reajuste-renta-inpc-arrendamiento',
    },
  },
  openGraph: {
    title: 'Calculadora de Reajuste de Renta por Inflación INPC México 2026 | Kagazo México',
    description:
      'Actualiza el canon de arrendamiento conforme al Índice Nacional de Precios al Consumidor (INEGI), verifica los topes de ley civil y genera la carta de notificación formal lista para firmar.',
    url: 'https://kagazo.in/mx/reajuste-renta-inpc-arrendamiento',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Reajuste de Renta por Inflación INPC México 2026',
    description:
      'Actualiza el canon de arrendamiento conforme al Índice Nacional de Precios al Consumidor (INEGI), verifica los topes de ley civil y genera la carta de notificación formal lista para firmar.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
