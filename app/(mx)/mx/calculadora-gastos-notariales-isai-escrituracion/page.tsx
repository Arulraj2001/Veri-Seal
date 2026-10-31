import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Gastos Notariales e ISAI México 2026 | Kagazo México',
  description:
    'Calcula el costo total para escriturar una casa o departamento en México: Impuesto de Traslado de Dominio (ISAI) por estado, derechos de registro RPP, honorarios notariales y descuentos de Jornada Notarial.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-gastos-notariales-isai-escrituracion',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-gastos-notariales-isai-escrituracion',
      'es': 'https://kagazo.in/mx/calculadora-gastos-notariales-isai-escrituracion',
      'x-default': 'https://kagazo.in/mx/calculadora-gastos-notariales-isai-escrituracion',
    },
  },
  openGraph: {
    title: 'Calculadora de Gastos Notariales e ISAI México 2026 | Kagazo México',
    description:
      'Calcula el costo total para escriturar una casa o departamento en México: Impuesto de Traslado de Dominio (ISAI) por estado, derechos de registro RPP, honorarios notariales y descuentos de Jornada Notarial.',
    url: 'https://kagazo.in/mx/calculadora-gastos-notariales-isai-escrituracion',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Gastos Notariales e ISAI México 2026',
    description:
      'Calcula el costo total para escriturar una casa o departamento en México: Impuesto de Traslado de Dominio (ISAI) por estado, derechos de registro RPP, honorarios notariales y descuentos de Jornada Notarial.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
