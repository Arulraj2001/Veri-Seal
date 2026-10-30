import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DniValidatorEngine } from '@/components/international/DniValidatorEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Validador de DNI, NIE y CIF Online Gratis | Algoritmo Módulo 23',
  description:
    'Comprueba si un DNI, NIE o CIF es válido al instante. Algoritmo oficial de comprobación del dígito de control de la Policía Nacional y Agencia Tributaria en España.',
  keywords: [
    'validador dni',
    'comprobar nie online',
    'calcular letra dni espana',
    'validar cif empresa',
    'algoritmo modulo 23 dni',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/validador-dni-nie-cif`,
    languages: HREFLANG_REGISTRY.id_validator.locales,
  },
  openGraph: {
    title: 'Validador de DNI, NIE y CIF Online Gratis | Algoritmo Módulo 23',
    description:
      'Comprueba al instante la validez de cualquier DNI, NIE o CIF español mediante el algoritmo matemático oficial.',
    url: `${SITE_URL}/es/validador-dni-nie-cif`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function DniValidatorPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Validador DNI / NIE / CIF</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Algoritmo Oficial Módulo 23 Ministerio del Interior</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Validador de DNI, NIE y CIF en España
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Verifica matemáticamente la letra o dígito de control de documentos de identidad españoles y CIFs mercantiles. Comprobación 100% en memoria en tu navegador.
          </p>
        </div>

        {/* The Live Engine */}
        <DniValidatorEngine />

        {/* Educational Content / E-E-A-T */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            ¿Cómo funciona el cálculo de la letra del DNI?
          </h2>
          <p>
            El Documento Nacional de Identidad (DNI) consta de 8 dígitos numéricos seguidos de una letra de control. Dicha letra no es aleatoria: se obtiene dividiendo el número de 8 cifras entre <strong>23</strong> y tomando el resto de dicha división entera (operación matemática conocida como <em>módulo 23</em>).
          </p>
          <p>
            A cada resto del 0 al 22 le corresponde una letra de la secuencia oficial:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-center text-xs font-bold text-slate-800 break-all">
            T R W A G M Y F P D X B N J Z S Q V H L C K E
          </div>
          <p>
            En el caso de los NIEs para residentes extranjeros, las letras iniciales <strong>X</strong>, <strong>Y</strong> y <strong>Z</strong> se sustituyen numéricamente por <strong>0</strong>, <strong>1</strong> y <strong>2</strong> respectivamente antes de aplicar la misma regla matemática.
          </p>
        </div>
      </div>
    </div>
  );
}

