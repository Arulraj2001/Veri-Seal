import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainAutonomoEngine } from '@/components/international/SpainAutonomoEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora IRPF Autónomos 2026 | Cuota y Neto Real España',
  description:
    'Calcula tus ingresos netos reales como autónomo en España en 2026. Simulación de cuota de cotización por tramos de ingresos reales, IRPF y Modelo 130.',
  keywords: [
    'calculadora irpf autonomos',
    'cuota autonomos 2026 tramos',
    'calcular sueldo autonomo neto',
    'modelo 130 irpf trimestral autonomos',
    'tarifa plana autonomos 2026',
    'gastos deducibles autonomo calcular',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-irpf-autonomos`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-irpf-autonomos`,
      'es': `${SITE_URL}/es/calculadora-irpf-autonomos`,
      'x-default': `${SITE_URL}/es/calculadora-irpf-autonomos`,
    },
  },
  openGraph: {
    title: 'Calculadora IRPF Autónomos 2026 | Cuota y Neto Real España',
    description:
      'Calcula tus ingresos limpios como autónomo en España: cuotas de la Seguridad Social según tus rendimientos reales y pagos a cuenta del IRPF.',
    url: `${SITE_URL}/es/calculadora-irpf-autonomos`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainAutonomoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora IRPF y Cuotas Autónomos España 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Simulador de cuota de autónomos por rendimientos reales y liquidación de IRPF trimestral (Modelo 130) según la reforma del Real Decreto-ley 13/2022.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cómo se calcula el sueldo neto real de un autónomo en España?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Para obtener tu ingreso limpio como autónomo, debes restar de tu facturación total sin IVA: los gastos deducibles de la actividad, la deducción del 7% por gastos de difícil justificación, la cuota mensual a la Seguridad Social según tus rendimientos reales y la retención o pago fraccionado del IRPF (Modelo 130, 20%).',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuánto paga de cuota un autónomo con el nuevo sistema de tramos en 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'El sistema de cotización por ingresos reales comprende 15 tramos. Quienes tengan rendimientos netos inferiores a 670 € al mes pagan la cuota mínima de 225 €/mes, mientras que rendimientos superiores a 6.000 €/mes alcanzan una cuota máxima de 530 €/mes. Los nuevos autónomos pueden acogerse a la Tarifa Plana reducida de 86 €/mes durante los primeros 12 meses.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué son los gastos de difícil justificación?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En el régimen de estimación directa simplificada, la Agencia Tributaria permite aplicar una deducción automática adicional del 7% sobre el rendimiento neto previo, con un límite máximo anual fijado en 2.000 euros.',
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
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculadora IRPF Autónomos</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Régimen de Estimación Directa Simplificada 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora IRPF y Cuota Autónomos 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Descubre con precisión cuánto dinero te queda limpio en el banco tras deducir tus gastos,
            la cuota mensual de la Seguridad Social por rendimientos reales y tus pagos a cuenta del IRPF.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Resumen Operativo para Autónomos (2026)
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            El ingreso neto mensual de un autónomo resulta de descontar de las ventas sin IVA los gastos afectos,
            la cuota progresiva de cotización (entre 225 € y 530 €/mes según rendimientos) y la retención del 20%
            del rendimiento neto en el Modelo 130 de Hacienda.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainAutonomoEngine />

        {/* Regulatory Breakdown Table */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Tramos de Cuota de Autónomos 2026 (Seguridad Social)
            </h2>
            <p className="text-sm text-slate-600">
              Conforme al Real Decreto-ley 13/2022, la cotización se ajusta a tus rendimientos netos reales mensuales computables.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Tramo de Rendimiento Neto Mensual</th>
                  <th className="py-3 px-4 font-mono">Base Mínima</th>
                  <th className="py-3 px-4 font-mono">Cuota Mensual 2026</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Menor o igual a 670 €/mes</td>
                  <td className="py-3 px-4">753,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">225 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">De 670 € a 900 €/mes</td>
                  <td className="py-3 px-4">803,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">240 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">De 900 € a 1.166 €/mes</td>
                  <td className="py-3 px-4">870,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">260 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">De 1.166 € a 1.300 €/mes</td>
                  <td className="py-3 px-4">973,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">291 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">De 1.300 € a 1.700 €/mes (Base Media)</td>
                  <td className="py-3 px-4">983,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">294 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">De 1.700 € a 1.850 €/mes</td>
                  <td className="py-3 px-4">1.053,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">315 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">De 1.850 € a 2.030 €/mes</td>
                  <td className="py-3 px-4">1.087,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">325 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">De 2.030 € a 2.330 €/mes</td>
                  <td className="py-3 px-4">1.237,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">370 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">De 2.330 € a 2.760 €/mes</td>
                  <td className="py-3 px-4">1.338,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">400 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Superior a 6.000 €/mes (Tope Máximo)</td>
                  <td className="py-3 px-4">1.773,00 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">530 € / mes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Editorial Guidance & Statutory Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>¿Qué gastos puedes deducirte en el IRPF?</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Para que la Agencia Tributaria admita un gasto deducible en estimación directa, debe cumplir tres premisas:
              estar directamente vinculado a tu actividad profesional, disponer de factura completa a tu nombre con NIF
              y estar registrado en tu libro de gastos e ingresos.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
              <li>Cuotas a la Seguridad Social (RETA).</li>
              <li>Consumos y suministros si trabajas desde casa (30% sobre el porcentaje de m² afectos).</li>
              <li>Servicios profesionales (gestoría, abogados, asesoría contable).</li>
              <li>Software, hosting, telefonía e internet empresarial.</li>
            </ul>
          </div>

          <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <span>Diferencia entre Modelo 130 y la Declaración de la Renta</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              El Modelo 130 es un pago a cuenta trimestral que anticipas a Hacienda (20% del beneficio acumulado del año).
              Al presentar la Declaración Anual de la Renta (Modelo 100), se calcula tu IRPF definitivo según los tramos
              estatales y autonómicos: si pagaste de más te devuelven la diferencia, y si pagaste de menos abonarás el saldo.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Preguntas Frecuentes de Autónomos en España
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-base">
                ¿Puedo aplicar la Tarifa Plana de 86 €/mes en 2026?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sí, si te das de alta por primera vez en el Régimen Especial de Trabajadores Autónomos (RETA) o no has estado de alta
                en los dos años anteriores (tres en caso de haber disfrutado de bonificaciones previas), tienes derecho a la cuota reducida
                durante los primeros doce meses de actividad.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-base">
                ¿Cuándo debo retener el 7% o el 15% de IRPF en mis facturas?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Si emites facturas a empresas o a otros autónomos en España, debes retener IRPF. Durante el año de alta y los dos
                siguientes puedes aplicar el tipo reducido del 7% comunicándolo por escrito a tu cliente. A partir del cuarto año,
                la retención general obligatoria es del 15%. A particulares nunca se les retiene IRPF.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes también trabajadores o nómina propia?</h3>
            <p className="text-xs text-slate-400">
              Calcula el sueldo neto y retenciones de IRPF exactas para empleados según su comunidad autónoma.
            </p>
          </div>
          <Link
            href="/es/calculadora-sueldo-neto"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculadora de Sueldo Neto</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

