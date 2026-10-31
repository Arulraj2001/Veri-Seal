import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Puntos Infonavit 2026 (Modelo T1000) | Kagazo México',
  description:
    'Evalúa tus 1,080 puntos mínimos para precalificación de crédito de vivienda conforme al modelo algorítmico T1000: edad, salario, bimestres continuos, saldo de subcuenta y solvencia patronal.',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-puntos-infonavit-t1000',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-puntos-infonavit-t1000',
      'es': 'https://kagazo.in/mx/calculadora-puntos-infonavit-t1000',
      'x-default': 'https://kagazo.in/mx/calculadora-puntos-infonavit-t1000',
    },
  },
  openGraph: {
    title: 'Calculadora de Puntos Infonavit 2026 (Modelo T1000) | Kagazo México',
    description:
      'Evalúa tus 1,080 puntos mínimos para precalificación de crédito de vivienda conforme al modelo algorítmico T1000: edad, salario, bimestres continuos, saldo de subcuenta y solvencia patronal.',
    url: 'https://kagazo.in/mx/calculadora-puntos-infonavit-t1000',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Puntos Infonavit 2026 (Modelo T1000)',
    description:
      'Evalúa tus 1,080 puntos mínimos para precalificación de crédito de vivienda conforme al modelo algorítmico T1000: edad, salario, bimestres continuos, saldo de subcuenta y solvencia patronal.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
