import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Generador de Foto Infantil y Pasaporte Mexicano SRE 2026 | Kagazo México',
  description:
    'Crea tus fotografías oficiales en tamaño Pasaporte SRE (3.5 × 4.5 cm) o Infantil SEP (2.5 × 3.0 cm) y genera una plantilla imprimible de 4×6 pulgadas (10×15 cm) lista para recortar. 100% en tu navegador con privacidad total.',
  alternates: {
    canonical: 'https://kagazo.in/mx/foto-infantil-pasaporte-mexicano-sre',
    languages: {
      'es-MX': 'https://kagazo.in/mx/foto-infantil-pasaporte-mexicano-sre',
      'es': 'https://kagazo.in/mx/foto-infantil-pasaporte-mexicano-sre',
      'x-default': 'https://kagazo.in/mx/foto-infantil-pasaporte-mexicano-sre',
    },
  },
  openGraph: {
    title: 'Generador de Foto Infantil y Pasaporte Mexicano SRE 2026 | Kagazo México',
    description:
      'Crea tus fotografías oficiales en tamaño Pasaporte SRE (3.5 × 4.5 cm) o Infantil SEP (2.5 × 3.0 cm) y genera una plantilla imprimible de 4×6 pulgadas (10×15 cm) lista para recortar. 100% en tu navegador con privacidad total.',
    url: 'https://kagazo.in/mx/foto-infantil-pasaporte-mexicano-sre',
    siteName: 'Kagazo México',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Foto Infantil y Pasaporte Mexicano SRE 2026',
    description:
      'Crea tus fotografías oficiales en tamaño Pasaporte SRE (3.5 × 4.5 cm) o Infantil SEP (2.5 × 3.0 cm) y genera una plantilla imprimible de 4×6 pulgadas (10×15 cm) lista para recortar. 100% en tu navegador con privacidad total.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
