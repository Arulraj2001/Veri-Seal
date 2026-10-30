import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainAutonomoEngine } from '@/components/international/SpainAutonomoEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora IRPF Autónomos 2026 : Cuota RETA y Sueldo Neto Real | Kagazo',
  description:
    'Calcula tus ingresos netos reales como autónomo en España en 2026. Simulación de cuota RETA por tramos de ingresos reales, Modelo 130 (20%), gastos deducibles y sueldo limpio.',
  keywords: [
    'calculadora irpf autonomos 2026',
    'cuota autonomos 2026 tramos reales',
    'calcular sueldo autonomo neto mensual',
    'modelo 130 irpf trimestral autonomos',
    'gastos deducibles autonomo hacienda',
    'tarifa plana autonomos 2026 86 euros',
    'regularizacion cuota seguridad social autonomos',
    'retencion 7 o 15 por ciento facturas autonomo',
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
    title: 'Calculadora IRPF Autónomos 2026 : Cuota RETA y Sueldo Neto Real',
    description:
      'Calcula exactamente cuánto dinero limpio te queda en el banco cada mes como autónomo tras restar gastos, cuota de la Seguridad Social e IRPF.',
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
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        provider: {
          '@type': 'Organization',
          name: 'Kagazo España',
          url: SITE_URL,
        },
        description:
          'Simulador oficial de cuota de autónomos por rendimientos reales y liquidación de IRPF trimestral (Modelo 130) según el Real Decreto-ley 13/2022.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Rendimiento Neto y Liquidación Fiscal de Autónomos',
        category: 'SelfEmployedTaxCalculation',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo España',
          url: SITE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${SITE_URL}/es`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Laboral y Fiscal',
            item: `${SITE_URL}/es#laboral-fiscal`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Calculadora IRPF Autónomos',
            item: `${SITE_URL}/es/calculadora-irpf-autonomos`,
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
          <Link href="/es#laboral-fiscal" className="hover:text-slate-900 transition-colors">
            Laboral y Fiscal
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculadora IRPF Autónomos</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sistema de Cotización por Ingresos Reales 2026 • RETA y Modelo 130</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora IRPF Autónomos 2026 : Cuota RETA y Salario Neto Real
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula con precisión tus rendimientos netos reales mensuales y anuales en España. Conoce tu tramo oficial de cotización a la Seguridad Social (RETA), la deducción por gastos de difícil justificación (7%) y la retención o pago a cuenta del IRPF (Modelo 130).
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cuánto le queda limpio a un autónomo en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Para una facturación media de <strong>3.000 € al mes sin IVA</strong> con <strong>500 € de gastos deducibles</strong>, el autónomo abona una cuota de Seguridad Social de aproximadamente <strong>370 €/mes</strong> (tramo de rendimiento neto entre 2.030 € y 2.330 €) y anticipa un <strong>20% de IRPF trimestral (Modelo 130)</strong> de unos 390 €/mes. El sueldo neto disponible en cuenta es de <strong>1.740 € limpios al mes</strong>.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainAutonomoEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Rendimiento Neto Real y Cuotas RETA 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Proyección de beneficio limpio según volumen de facturación mensual media (asumiendo un 15% de gastos operativos deducibles).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Facturación Mensual (sin IVA)</th>
                  <th className="py-3.5 px-4 font-bold">Gastos Estimados (15%)</th>
                  <th className="py-3.5 px-4 font-bold">Cuota RETA 2026</th>
                  <th className="py-3.5 px-4 font-bold">IRPF Modelo 130 (20%)</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Neto Mensual Limpio</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Neto Anual Limpio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">1.200 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">180 €</td>
                  <td className="py-3 px-4 text-slate-600">260 € (Tramo 3)</td>
                  <td className="py-3 px-4 text-slate-600">152 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">608 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">7.296 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">2.000 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">300 €</td>
                  <td className="py-3 px-4 text-slate-600">294 € (Tramo 5)</td>
                  <td className="py-3 px-4 text-slate-600">281 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.125 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">13.500 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">3.000 € / mes (Típico)</td>
                  <td className="py-3 px-4 text-slate-600">450 €</td>
                  <td className="py-3 px-4 text-slate-600">370 € (Tramo 8)</td>
                  <td className="py-3 px-4 text-slate-600">436 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.744 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">20.928 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">4.500 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">675 €</td>
                  <td className="py-3 px-4 text-slate-600">420 € (Tramo 11)</td>
                  <td className="py-3 px-4 text-slate-600">681 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">2.724 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">32.688 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">6.000 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">900 €</td>
                  <td className="py-3 px-4 text-slate-600">490 € (Tramo 13)</td>
                  <td className="py-3 px-4 text-slate-600">922 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">3.688 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">44.256 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">8.000 € / mes (Tope Máx)</td>
                  <td className="py-3 px-4 text-slate-600">1.200 €</td>
                  <td className="py-3 px-4 text-slate-600">530 € (Tramo 15)</td>
                  <td className="py-3 px-4 text-slate-600">1.254 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">5.016 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">60.192 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: Los cálculos aplican la deducción general del 7% por gastos de difícil justificación (tope 2.000 € anuales) prevista en el artículo 30.2 del IRPF para estimación directa simplificada.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cómo funciona el sistema de cotización por ingresos reales en 2026
            </h2>
            <p>
              Desde la entrada en vigor definitiva de la reforma del Real Decreto-ley 13/2022, los trabajadores autónomos en España ya no eligen libremente su base de cotización entre un mínimo y un máximo arbitrario. En 2026, la cuota a la Seguridad Social está directamente vinculada al <strong>rendimiento neto computable</strong> obtenido durante el año natural.
            </p>
            <p>
              El cálculo oficial del rendimiento neto mensual para encuadrarse en la tabla de 15 tramos de la Seguridad Social sigue una fórmula matemática rigurosa supervisada por la Agencia Estatal de Administración Tributaria (AEAT) y la Tesorería General de la Seguridad Social (TGSS):
            </p>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1">
              <p className="font-bold text-slate-900 font-sans">Fórmula Legal del Rendimiento Neto Mensual RETA:</p>
              <p>Rendimiento Previo = Ingresos Íntegros Computables - Gastos Deducibles de Explotación</p>
              <p>Rendimiento Neto Fiscal = Rendimiento Previo - 7% (Gastos Difícil Justificación, máx. 2.000 €/año)</p>
              <p>Rendimiento Computable Mensual = (Rendimiento Neto Anual + Cuotas Seguridad Social Pagadas en el año) / 12</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3>Gastos Fiscalmente Deducibles sin Riesgo</h3>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li><strong>Suministros del hogar:</strong> Si trabajas desde casa, puedes deducirte el 30% del porcentaje de metros cuadrados de la vivienda afectos a la actividad (art. 30.2.5.ª LIRPF).</li>
                <li><strong>Dietas y manutención:</strong> Hasta 26,67 € diarios en España (48,08 € en el extranjero) sin pernocta, abonados mediante tarjeta o medio electrónico en establecimientos de hostelería.</li>
                <li><strong>Seguro médico privado:</strong> Cuotas satisfechas para el propio autónomo, su cónyuge e hijos menores de 25 años, con un límite de 500 € por persona (1.500 € en personas con discapacidad).</li>
                <li><strong>Servicios profesionales y software:</strong> Asesoría contable, herramientas digitales, hosting, telefonía móvil con factura detallada y cuotas colegiales obligatorias.</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <AlertCircle className="w-5 h-5 text-orange-600 shrink-0" />
                <h3>La Regularización Anual de la Seguridad Social</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Al concluir cada ejercicio fiscal y tras la presentación de la Declaración de la Renta, la TGSS cruza datos automáticamente con la AEAT. Si tus rendimientos reales fueron inferiores a los previstos en tus pagos mensuales, la Seguridad Social te devolverá el exceso de oficio antes del 31 de mayo. Si tus ingresos fueron superiores, recibirás una liquidación complementaria para abonar la diferencia sin recargo en un plazo de dos meses.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                Puedes modificar tu base provisional de cotización hasta 6 veces al año a través del portal Import@ss para ajustar tu cuota a la evolución real de tu negocio.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Modelo 130 vs Retención en Factura: ¿Cuándo estás obligado a presentarlo?
            </h2>
            <p>
              El <strong>Modelo 130</strong> es la autoliquidación trimestral del pago fraccionado del IRPF. En él se abona el <strong>20% del rendimiento neto acumulado</strong> desde el 1 de enero hasta el final del trimestre en cuestión, deduciendo los pagos fraccionados anteriores y las retenciones que te hayan practicado los clientes.
            </p>
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                Regla del 70% de Retención en Factura:
              </p>
              <p>
                Si más del <strong>70% de tus ingresos procedentes de actividades profesionales</strong> durante el año anterior estuvieron sujetos a retención en factura por parte de empresas o autónomos españoles (retención general del 15% o reducida del 7%), <strong>no tienes obligación de presentar el Modelo 130</strong>. En ese caso, todo tu IRPF se ajustará directamente en la campaña de la Renta anual.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre el IRPF y Cuotas de Autónomos en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales y fundamentadas en la Ley del IRPF (Ley 35/2006) y la normativa de la Seguridad Social 2026.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Sigue existiendo la Tarifa Plana para nuevos autónomos en 2026?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. Los autónomos que causen alta inicial o no hayan estado de alta en los dos años inmediatamente anteriores (tres años si aplicaron bonificaciones antes) tienen derecho a una cuota reducida de <strong>86 € al mes</strong> durante los primeros 12 meses naturales de actividad. Puede prorrogarse otros 12 meses si los rendimientos netos anuales no superan el Salario Mínimo Interprofesional (SMI).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuándo debo aplicar el 7% o el 15% de retención en mis facturas?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Solo deben incluir retención los autónomos dados de alta en actividades profesionales (Sección 2 del IAE) cuando facturan a empresas o a otros autónomos domiciliados en España. El tipo general es del <strong>15%</strong>. No obstante, los nuevos autónomos pueden aplicar el <strong>tipo reducido del 7%</strong> durante el año natural en que inician su actividad y en los dos ejercicios siguientes, comunicándolo previamente por escrito al cliente pagador. Si emites una factura a un particular, nunca lleva retención de IRPF.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo se deducen los gastos de vehículo particular o comercial?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En el <strong>IRPF</strong>, la Agencia Tributaria solo admite la deducción del combustible y mantenimiento del coche si está afecto al 100% en exclusiva a la actividad profesional (agentes comerciales, transportistas, autoescuelas). Si se utiliza para fines mixtos personales y laborales, el IRPF no permite deducir nada. Por el contrario, en el <strong>IVA</strong> la ley presume una afectación mínima del 50%, permitiendo deducir la mitad del IVA soportado en gasolina, revisiones y compra.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué son los gastos de difícil justificación y qué límite tienen?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En la modalidad de estimación directa simplificada del IRPF, la ley contempla un porcentaje automático de deducción complementaria en concepto de provisiones y gastos de difícil justificación. Se aplica un <strong>7% sobre el rendimiento neto previo</strong> (ingresos menos gastos ordinarios justificados), con un <strong>techo máximo legal de 2.000 euros anuales</strong>.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo afecta la cuota de autónomo a la jubilación y pensión futura?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Tu futura pensión pública de jubilación se calcula con la media de las bases de cotización de los últimos 25 años (300 meses). Cotizar por la base mínima del tramo reduce la cuota mensual hoy, pero también reduce directamente la cuantía de tu pensión de jubilación, incapacidad temporal o prestación por cese de actividad.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas Fiscales y Laborales Relacionadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Gestiona todas tus obligaciones tributarias y laborales con nuestras herramientas oficiales verificadas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/generador-factura-pdf"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Facturación</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Generador Factura PDF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Crea facturas profesionales con retención de IRPF (7% o 15%) e IVA desglosado conformes al RD 1619/2012.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Crear factura</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-iva-trimestral"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Modelo 303</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora IVA Trimestral
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el saldo exacto de tu IVA repercutido y soportado para liquidar a Hacienda cada trimestre.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular IVA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-sueldo-neto"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Asalariados</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Compara lo que ingresa un trabajador por cuenta ajena frente a tus ingresos netos como autónomo.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver comparativa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-jubilacion-pension"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Seguridad Social</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora de Jubilación
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Simula la pensión que te quedará como autónomo según tus bases de cotización acumuladas.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Simular pensión</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* E-E-A-T Official Regulatory Gazette Citation */}
        <footer className="text-xs text-slate-500 border-t border-slate-200 pt-6 space-y-2">
          <p className="flex items-center gap-1.5 font-medium text-slate-600">
            <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
            <span>Marco Legal Oficial y Fuentes Estatutarias:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1 text-[11px] sm:text-xs">
            <li>
              <strong>Real Decreto-ley 13/2022:</strong> Sistema de cotización para trabajadores por cuenta propia o autónomos y mejora de la protección por cese de actividad (BOE núm. 179/2022).
            </li>
            <li>
              <strong>Ley 35/2006, de 28 de noviembre:</strong> Ley del Impuesto sobre la Renta de las Personas Físicas (LIRPF), artículos 28 a 32 (Rendimientos de actividades económicas).
            </li>
            <li>
              <strong>Orden HFP/1359/2023:</strong> Modelos de declaración del IRPF y régimen de estimación directa simplificada (Agencia Estatal de Administración Tributaria).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
