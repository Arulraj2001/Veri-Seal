import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainFotoCarnetEngine } from '@/components/international/SpainFotoCarnetEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Foto Carnet DNI y Pasaporte 32x26mm Gratis | Plantilla 10x15',
  description:
    'Crea gratis tu foto carnet para el DNI y pasaporte español (32x26 mm a 300 DPI). Descarga la plantilla lista para imprimir en papel fotográfico 10x15 cm.',
  keywords: [
    'foto carnet medidas dni espana 32x26',
    'crear foto carnet online gratis',
    'plantilla fotos dni 10x15 imprimir',
    'medidas foto pasaporte policia nacional',
    'hacer foto carnet con el movil espana',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
    languages: {
      'es-ES': `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
      'es': `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
      'x-default': `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
    },
  },
  openGraph: {
    title: 'Foto Carnet DNI y Pasaporte 32x26mm Gratis | Plantilla 10x15',
    description:
      'Crea y descarga gratis tu foto carnet oficial para renovar el DNI y pasaporte español según la Policía Nacional.',
    url: `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainFotoCarnetPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Creador de Foto Carnet DNI y Pasaporte España 32x26mm',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Herramienta en línea para recortar y generar plantillas imprimibles de fotografías oficiales de tamaño carnet (32 x 26 mm) según los estándares de la Dirección General de la Policía.',
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Foto Carnet DNI y Pasaporte</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Medida Oficial 32 × 26 mm de la Dirección General de la Policía</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Creador de Fotos Carnet para DNI y Pasaporte
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Convierte cualquier foto hecha con tu móvil en una fotografía tamaño carnet oficial.
            Descarga una plantilla de 8 fotos lista para imprimir en tamaño estándar de 10×15 cm por unos pocos céntimos.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Estándar Policía Nacional:</strong> 32 mm de alto por 26 mm de ancho, proporción de rostro 70-80% y fondo blanco uniforme a 300 DPI.
            </span>
          </div>
          <a
            href="https://www.dnielectronico.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Requisitos DNI Electrónico</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Medidas Exactas de la Foto del DNI en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            La fotografía oficial para el DNI y pasaporte español debe medir exactamente 32 mm de alto por 26 mm de ancho,
            estar impresa en papel fotográfico de alta calidad con fondo blanco liso, tomada de frente y sin gafas oscuras ni reflejos.
          </p>
        </div>

        <SpainFotoCarnetEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes que validar el número de tu DNI, NIE o CIF?</h3>
            <p className="text-xs text-slate-400">
              Comprueba el dígito de control matemático con el algoritmo oficial Módulo 23 de la Policía.
            </p>
          </div>
          <Link
            href="/es/validador-dni-nie-cif"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Validador DNI / NIE / CIF</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
