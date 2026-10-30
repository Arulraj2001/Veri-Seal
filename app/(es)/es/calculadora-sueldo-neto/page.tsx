import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainSalaryEngine } from '@/components/international/SpainSalaryEngine';
import { IRPF_BRACKETS_ESTATAL_2026 } from '@/lib/international/spain-tax';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Sueldo Neto 2026 España | Cuánto Cobras Limpio',
  description:
    'Calcula tu sueldo neto mensual y anual en España en 2026 con 12 o 14 pagas. Simulación exacta del IRPF por comunidad autónoma y cotizaciones a la Seguridad Social.',
  keywords: [
    'calculadora sueldo neto españa',
    'calcular sueldo neto 2026',
    'irpf tramos 2026 nomina',
    'sueldo neto 14 pagas',
    'cuanto cobro limpio de 30000 euros',
    'retencion irpf nomina comunidad madrid',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-sueldo-neto`,
    languages: HREFLANG_REGISTRY.salary_calculator.locales,
  },
  openGraph: {
    title: 'Calculadora de Sueldo Neto 2026 España | Cuánto Cobras Limpio',
    description:
      'Calcula tu sueldo neto mensual y anual en España con 12 o 14 pagas. Simulación de IRPF y Seguridad Social.',
    url: `${SITE_URL}/es/calculadora-sueldo-neto`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainSalaryPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Sueldo Neto España 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Simulador de nómina y cálculo de sueldo neto en España con retenciones de IRPF autonómicas y cotizaciones a la Seguridad Social 2026.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cómo se calcula el sueldo neto a partir del bruto en España?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'El sueldo neto se calcula restando del salario bruto anual dos conceptos obligatorios: la retención a cuenta del IRPF (impuesto progresivo que oscila entre el 9,5% y el 47% según tus ingresos y comunidad) y las cotizaciones a la Seguridad Social a cargo del trabajador (6,49% en contratos indefinidos para contingencias comunes, desempleo, formación y MEI).',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué diferencia hay entre cobrar en 12 o 14 pagas?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'El sueldo neto anual que percibes es exactamente el mismo en ambos casos. En un contrato de 12 pagas, las dos pagas extraordinarias (verano y Navidad) se encuentran prorrateadas mensualmente. En 14 pagas, recibes 12 mensualidades ordinarias más 2 nóminas extra íntegras en junio y diciembre.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculadora de Sueldo Neto</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Tablas Oficiales IRPF y Cotizaciones 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Sueldo Neto en España (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula exactamente tu salario neto mensual y anual limpio de retenciones. Simulación precisa para 12 y 14 pagas adaptada a las 17 comunidades autónomas.
          </p>
        </div>

        {/* ZONE 1: THE INTERACTIVE PRECISION CALCULATION ENGINE */}
        <SpainSalaryEngine />

        {/* ZONE 2: GEO ANSWER CAPSULE (AI Overviews & Snippets - 45 Words Rule) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Respuesta Directa Oficial: ¿Cuánto te retiene Hacienda en 2026?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            En 2026, si cobras <strong>30.000 € brutos al año</strong> en España con contrato indefinido, tu salario neto mensual es de aproximadamente <strong>1.947 € limpios (en 12 pagas)</strong> o <strong>1.669 € (en 14 pagas)</strong>. Hacienda te retiene cerca del 15,6 % de IRPF y la Seguridad Social descuenta un 6,49 % fijo.
          </p>
        </div>

        {/* ZONE 3: OFFICIAL STATUTORY IRPF REFERENCE TABLES (E-E-A-T Content) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tramos del IRPF 2026 (Escala General Estatal)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              El Impuesto sobre la Renta de las Personas Físicas (IRPF) es un tributo progresivo que se divide al 50% entre el tramo estatal y el tramo autonómico.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/70">
                  <th className="py-3 px-4 font-bold">Tramo Base Liquidable</th>
                  <th className="py-3 px-4 font-bold">Tipo Estatal</th>
                  <th className="py-3 px-4 font-bold">Tipo Autonómico Medio</th>
                  <th className="py-3 px-4 font-bold">Tipo Total Marginal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr>
                  <td className="py-3 px-4">De 0 € a 12.450 €</td>
                  <td className="py-3 px-4">9,50 %</td>
                  <td className="py-3 px-4">9,50 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">19,00 %</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">De 12.450 € a 20.200 €</td>
                  <td className="py-3 px-4">12,00 %</td>
                  <td className="py-3 px-4">12,00 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">24,00 %</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">De 20.200 € a 35.200 €</td>
                  <td className="py-3 px-4">15,00 %</td>
                  <td className="py-3 px-4">15,00 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">30,00 %</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">De 35.200 € a 60.000 €</td>
                  <td className="py-3 px-4">18,50 %</td>
                  <td className="py-3 px-4">18,50 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">37,00 %</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">De 60.000 € a 300.000 €</td>
                  <td className="py-3 px-4">22,50 %</td>
                  <td className="py-3 px-4">22,50 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">45,00 %</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Más de 300.000 €</td>
                  <td className="py-3 px-4">24,50 %</td>
                  <td className="py-3 px-4">22,50 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">47,00 %</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Fuente oficial: Ley 35/2006, de 28 de noviembre, del Impuesto sobre la Renta de las Personas Físicas (Boletín Oficial del Estado).
            </span>
          </div>
        </div>

        {/* ZONE 4: FAQs for User Trust and AdSense Evaluation */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Preguntas Frecuentes sobre la Nómina y el Salario Neto
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900">
                ¿Por qué mi empresa me retiene más porcentaje de IRPF que a mi compañero?
              </h3>
              <p className="leading-relaxed">
                El porcentaje de retención del IRPF no depende únicamente de tu sueldo bruto. Factores como tener hijos a cargo, personas mayores bajo tu tutela, grado de discapacidad o el tipo de contrato (indefinido vs temporal) modifican directamente tu mínimo personal y familiar exento, haciendo que la retención baje o suba.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900">
                ¿Qué es el Mecanismo de Equidad Intergeneracional (MEI)?
              </h3>
              <p className="leading-relaxed">
                El MEI es una cotización finalista introducida por la reforma de las pensiones destinada a rellenar el Fondo de Reserva de la Seguridad Social. En 2026, el porcentaje aplicable a los trabajadores por cuenta ajena asciende al 0,14% sobre su base de cotización.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

