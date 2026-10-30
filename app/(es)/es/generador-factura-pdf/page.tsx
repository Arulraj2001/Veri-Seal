import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainInvoiceEngine } from '@/components/international/SpainInvoiceEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Generador de Facturas Gratis PDF España | Autónomos y Pymes',
  description:
    'Crea y descarga gratis tus facturas profesionales en PDF para España. Cumple el RD 1619/2012 y la Ley Crea y Crece con desglose de IVA e IRPF.',
  keywords: [
    'generador facturas gratis pdf',
    'crear factura autonomo online',
    'plantilla factura irpf iva',
    'modelo factura profesional espana',
    'factura electronica formato pdf',
    'hacer factura sin registro gratis',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/generador-factura-pdf`,
    languages: HREFLANG_REGISTRY.invoice_generator.locales,
  },
  openGraph: {
    title: 'Generador de Facturas Gratis PDF España | Autónomos y Pymes',
    description:
      'Crea y descarga facturas oficiales en PDF para autónomos y empresas en España con cálculo automático de IVA e IRPF.',
    url: `${SITE_URL}/es/generador-factura-pdf`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainInvoicePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Generador de Facturas Gratis en PDF para España',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Herramienta gratuita para emitir facturas en formato PDF válidas ante la Agencia Tributaria en España con desglose de IVA (21%, 10%, 4%) y retención de IRPF.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué datos obligatorios debe contener una factura en España?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Según el Real Decreto 1619/2012, una factura legal debe incluir: número y serie correlativa, fecha de expedición, nombre y apellidos o razón social del emisor y receptor, NIF o CIF de ambas partes, domicilio fiscal, descripción detallada de las operaciones, tipo impositivo de IVA y cuota tributaria, y retención de IRPF si procede.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuándo es obligatorio aplicar retención de IRPF en la factura?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La retención de IRPF es obligatoria cuando un profesional autónomo emite una factura por servicios profesionales a una empresa o a otro autónomo con residencia fiscal en España. El tipo general es del 15%, o del 7% reducido para nuevos autónomos durante el año de inicio y los dos siguientes.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium print:hidden">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Generador de Facturas PDF</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Reglamento de Facturación RD 1619/2012</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Generador de Facturas Gratis en PDF
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Emite facturas legales de forma instantánea sin necesidad de registro ni marcas de agua.
            Cálculo automático de IVA (21%, 10%, 4%) y retención de IRPF para autónomos y pymes en España.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5 print:hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Requisitos de una Factura Válida en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Una factura oficial válida ante la Agencia Tributaria española debe incorporar serie y número correlativo,
            NIF y domicilio de emisor y cliente, fecha de devengo, base imponible, desglose del tipo de IVA aplicable
            y retención de IRPF si se factura a empresas.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainInvoiceEngine />

        {/* Legal Checklist Section */}
        <div className="space-y-6 pt-6 border-t border-slate-200 print:hidden">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Campos Obligatorios de Facturación según la Agencia Tributaria
            </h2>
            <p className="text-sm text-slate-600">
              Verifica que tus facturas comerciales contengan todos los requisitos exigidos por el Ministerio de Hacienda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">1. Numeración Correlativa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Toda factura debe llevar un número único y continuo dentro de una misma serie cronológica anual (por ejemplo, 2026-001). No pueden existir saltos ni huecos injustificados en la numeración.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">2. NIF / CIF Verificado</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Es imprescindible incluir el NIF, CIF o NIE tanto del emisor como del destinatario. Si el cliente es intracomunitario en la UE, debe constar el NIF-IVA dado de alta en el censo VIES.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">3. Desglose Fiscal Exacto</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Debes separar nítidamente la base imponible del tipo de IVA repercutido (21%, 10% o 4%) y, si eres autónomo profesional, aplicar el 15% o el 7% de retención de IRPF deducido del total.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes dudas sobre la validez del NIF o CIF de tu cliente?</h3>
            <p className="text-xs text-slate-400">
              Verifica el dígito de control de cualquier DNI, NIE o CIF español con nuestro comprobador algorítmico Módulo 23.
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

