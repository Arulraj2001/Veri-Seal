import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Calculadora de Honorarios y Retenciones ISR / IVA México 2026 | Kagazo México',
  description:
    'Calcula el desglose fiscal para recibos de honorarios y facturas CFDI 4.0 emitidas a personas morales con retención del 10% de ISR y 2/3 partes del IVA (10.6667%), o calcula en sentido inverso (Gross-up).',
  alternates: {
    canonical: 'https://kagazo.in/mx/calculadora-honorarios-retencion-isr-iva',
    languages: {
      'es-MX': 'https://kagazo.in/mx/calculadora-honorarios-retencion-isr-iva',
      'es': 'https://kagazo.in/mx/calculadora-honorarios-retencion-isr-iva',
      'x-default': 'https://kagazo.in/mx/calculadora-honorarios-retencion-isr-iva',
    },
  },
  openGraph: {
    title: 'Calculadora de Honorarios y Retenciones ISR / IVA México 2026 | Kagazo México',
    description:
      'Calcula el desglose fiscal para recibos de honorarios y facturas CFDI 4.0 emitidas a personas morales con retención del 10% de ISR y 2/3 partes del IVA (10.6667%), o calcula en sentido inverso (Gross-up).',
    url: 'https://kagazo.in/mx/calculadora-honorarios-retencion-isr-iva',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Honorarios y Retenciones ISR / IVA México 2026',
    description:
      'Calcula el desglose fiscal para recibos de honorarios y facturas CFDI 4.0 emitidas a personas morales con retención del 10% de ISR y 2/3 partes del IVA (10.6667%), o calcula en sentido inverso (Gross-up).',
  },
};

export default function Page() {
  return <ClientEngine />;
}
