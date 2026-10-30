import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainIbanEngine } from '@/components/international/SpainIbanEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Validador IBAN España Gratis | Comprobar Banco y Cuenta',
  description:
    'Valida gratis cualquier número de cuenta e IBAN español (código ES de 24 caracteres). Identifica el banco (Santander, BBVA, CaixaBank) y dígitos de control.',
  keywords: [
    'validador iban espana online',
    'comprobar numero de cuenta corriente banco',
    'saber banco por iban espana 4 digitos',
    'verificar digitos de control cuenta bancaria',
    'validador sepa iban gratis',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/validador-iban-espana`,
    languages: {
      'es-ES': `${SITE_URL}/es/validador-iban-espana`,
      'es': `${SITE_URL}/es/validador-iban-espana`,
      'x-default': `${SITE_URL}/es/validador-iban-espana`,
    },
  },
  openGraph: {
    title: 'Validador IBAN España Gratis | Comprobar Banco y Cuenta',
    description:
      'Valida números de cuenta bancaria e IBAN de España con identificación de entidad y dígitos de control.',
    url: `${SITE_URL}/es/validador-iban-espana`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainIbanPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Validador de IBAN y Cuentas Bancarias de España',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Comprobador matemático de códigos IBAN españoles según el estándar ISO 13616 y el algoritmo Módulo 97-10 con resolución de registros de entidades bancarias del Banco de España.',
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
          <span className="text-slate-900 font-bold">Validador IBAN España</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Estándar Internacional ISO 13616 & Módulo 97-10</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Validador de IBAN y Entidad Bancaria en España
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Comprueba al instante si un IBAN español es correcto antes de emitir una factura, realizar una transferencia SEPA
            o domiciliar un recibo. Identifica automáticamente el banco emisor.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Algoritmo Oficial Bancario:</strong> Verificación matemática del dígito de control y cruce de códigos de 4 dígitos del registro oficial del Banco de España.
            </span>
          </div>
          <a
            href="https://www.bde.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Registro de Entidades BDE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Comprobación de Cuentas Bancarias en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            El IBAN español contiene 24 dígitos estructurados por el código de país ES, dos dígitos de control,
            el código de cuatro cifras del banco (p. ej. 0049 Santander, 2100 CaixaBank, 0182 BBVA), la sucursal y la cuenta corriente.
          </p>
        </div>

        <SpainIbanEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes que emitir una factura legal a tu cliente con este IBAN?</h3>
            <p className="text-xs text-slate-400">
              Genera tu factura oficial en formato PDF conforme al Reglamento de facturación español.
            </p>
          </div>
          <Link
            href="/es/generador-factura-pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Generador Facturas PDF</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
