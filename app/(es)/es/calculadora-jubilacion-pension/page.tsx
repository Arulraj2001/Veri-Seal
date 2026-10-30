import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainJubilacionEngine } from '@/components/international/SpainJubilacionEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Award } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Jubilación 2026 : Pensión de la Seguridad Social | Kagazo',
  description:
    'Calcula gratis tu pensión de jubilación en España en 2026. Simula tu base reguladora de 25 años, porcentaje según años cotizados y edad legal ordinaria en 14 pagas.',
  keywords: [
    'calculadora jubilacion 2026 espana',
    'calcular pension jubilacion seguridad social',
    'cuanto cobro de jubilacion con 30 anos cotizados',
    'edad legal jubilacion 2026 requisitos',
    'base reguladora pension 25 anos divisor 350',
    'simulador pension minima y maxima 2026',
    'coeficientes reductores jubilacion anticipada',
    'integracion de lagunas cotizacion seguridad social',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-jubilacion-pension`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-jubilacion-pension`,
      'es': `${SITE_URL}/es/calculadora-jubilacion-pension`,
      'x-default': `${SITE_URL}/es/calculadora-jubilacion-pension`,
    },
  },
  openGraph: {
    title: 'Calculadora de Jubilación 2026 : Pensión de la Seguridad Social',
    description:
      'Calcula tu pensión pública de jubilación en 14 pagas según las bases de cotización acumuladas y la escala oficial de 2026.',
    url: `${SITE_URL}/es/calculadora-jubilacion-pension`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainJubilacionPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Pensión de Jubilación España 2026',
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
          'Simulador actuarial oficial de la pensión contributiva de jubilación de la Seguridad Social española según las bases de cotización y los coeficientes de 2026.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Pensión Contributiva de Jubilación',
        category: 'PensionCalculation',
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
            name: 'Calculadora de Jubilación',
            item: `${SITE_URL}/es/calculadora-jubilacion-pension`,
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
          <span className="text-slate-900 font-bold">Calculadora de Jubilación</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reforma de Pensiones Ley 21/2021 y RDL 2/2023 • Seguridad Social</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Pensión de Jubilación 2026 : ¿Cuánto Cobrarás al Mes?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula con precisión tu futura pensión pública contributiva de jubilación en 14 pagas al año. Simula tu base reguladora de los últimos 25 años de cotización, comprueba tu edad legal de retiro en 2026 y descubre el porcentaje que te corresponde por tus años trabajados.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se calcula la pensión de jubilación en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            En 2026, la pensión mensual resulta de promediar las <strong>bases de cotización de los últimos 25 años (300 meses divididos entre 350)</strong> para obtener la Base Reguladora. Quien acredite <strong>15 años cotizados percibe el 50%</strong> de dicha base, incrementándose progresivamente hasta alcanzar el <strong>100% con 36 años y 6 meses</strong> cotizados. La edad ordinaria en 2026 es de <strong>65 años</strong> (con 38 años y 3 meses cotizados) o de <strong>66 años y 8 meses</strong> si se ha cotizado menos.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainJubilacionEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Pensión Bruta Mensual según Base Reguladora y Años Cotizados
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Valores calculados en 14 pagas anuales según los porcentajes oficiales de la Seguridad Social para 2026.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Base Reguladora Promedio</th>
                  <th className="py-3.5 px-4 font-bold">15 Años (50%)</th>
                  <th className="py-3.5 px-4 font-bold">20 Años (62,38%)</th>
                  <th className="py-3.5 px-4 font-bold">25 Años (74,78%)</th>
                  <th className="py-3.5 px-4 font-bold">30 Años (86,18%)</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">36,5+ Años (100% Pensión)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">1.500 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">750,00 €</td>
                  <td className="py-3 px-4 text-slate-600">935,70 €</td>
                  <td className="py-3 px-4 text-slate-600">1.121,70 €</td>
                  <td className="py-3 px-4 text-slate-600">1.292,70 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">1.500,00 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">2.000 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">1.000,00 €</td>
                  <td className="py-3 px-4 text-slate-600">1.247,60 €</td>
                  <td className="py-3 px-4 text-slate-600">1.495,60 €</td>
                  <td className="py-3 px-4 text-slate-600">1.723,60 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">2.000,00 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">2.500 € / mes (Media España)</td>
                  <td className="py-3 px-4 text-slate-600">1.250,00 €</td>
                  <td className="py-3 px-4 text-slate-600">1.559,50 €</td>
                  <td className="py-3 px-4 text-slate-600">1.869,50 €</td>
                  <td className="py-3 px-4 text-slate-600">2.154,50 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">2.500,00 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">3.000 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">1.500,00 €</td>
                  <td className="py-3 px-4 text-slate-600">1.871,40 €</td>
                  <td className="py-3 px-4 text-slate-600">2.243,40 €</td>
                  <td className="py-3 px-4 text-slate-600">2.585,40 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">3.000,00 € / mes</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">3.500 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">1.750,00 €</td>
                  <td className="py-3 px-4 text-slate-600">2.183,30 €</td>
                  <td className="py-3 px-4 text-slate-600">2.617,30 €</td>
                  <td className="py-3 px-4 text-slate-600">3.016,30 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">3.175,04 € (Tope Máx)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: La pensión pública máxima contributiva fijada por la Ley de Presupuestos Generales del Estado no puede ser superada independientemente de que la base reguladora resulte superior.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Los Tres Pilares del Cálculo de la Jubilación en España
            </h2>
            <p>
              El sistema de pensiones español es un régimen de reparto y solidaridad intergeneracional. Determinar la cuantía mensual exacta que percibirá un trabajador al jubilarse requiere analizar minuciosamente tres parámetros estatutarios regulados en la Ley General de la Seguridad Social:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <FileText className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. Base Reguladora</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  En 2026, la base reguladora es el cociente que resulta de dividir por <strong>350</strong> las bases de cotización acreditadas durante los <strong>300 meses</strong> inmediatamente anteriores al mes previo al hecho causante (25 años completos).
                </p>
                <p className="text-xs text-slate-500">
                  Las bases de los últimos 24 meses se computan por su valor nominal; todas las anteriores se actualizan según la evolución del IPC real.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Award className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>2. Porcentaje por Años</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Para acceder a una pensión contributiva se exige un mínimo de <strong>15 años cotizados</strong>, otorgando el <strong>50%</strong> de la base reguladora.
                </p>
                <p className="text-xs text-slate-500">
                  A partir del año 16, cada mes adicional suma coeficientes progresivos (+0,21% mensual en los primeros 49 meses y +0,19% en los restantes) hasta alcanzar el 100% con 36 años y 6 meses.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>3. Edad Ordinaria</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  En 2026 conviven dos edades de retiro:
                </p>
                <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                  <li><strong>65 años cumplidos:</strong> si acreditas al menos 38 años y 3 meses de cotización.</li>
                  <li><strong>66 años y 8 meses:</strong> si tienes menos tiempo cotizado acumulado.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Integración de Lagunas: ¿Qué ocurre con los meses sin cotizar?
            </h2>
            <p>
              Si a lo largo de tu trayectoria laboral existen meses en los que no cotizaste por desempleo no subsidiado o excedencias, el Régimen General de la Seguridad Social aplica el mecanismo de <strong>integración de lagunas</strong> (artículo 209 de la LGSS):
            </p>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Regla General de Integración de Lagunas:</p>
              <p>• Primeras 48 mensualidades sin cotización: se integran con el 100% de la base mínima de cotización vigente.</p>
              <p>• Mensualidades restantes a partir de la 49: se integran con el 50% de la base mínima de cotización.</p>
              <p className="text-slate-600 font-sans text-xs pt-1">
                Importante: En el Régimen Especial de Trabajadores Autónomos (RETA) la ley no contempla la integración de lagunas; los meses no cotizados computan como base cero (0 €).
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
            <p className="font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              Penalizaciones por Jubilación Anticipada Voluntaria:
            </p>
            <p>
              Desde la reforma de la Ley 21/2021, acceder a la jubilación antes de la edad legal ordinaria (máximo 24 meses antes en modalidad voluntaria) conlleva la aplicación de <strong>coeficientes reductores mensuales</strong> sobre la cuantía de la pensión. Estos coeficientes oscilan entre un <strong>2,81% y un 21%</strong> en función de los meses anticipados y de la carrera total de cotización acumulada.
            </p>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre la Jubilación en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios oficiales basados en la Ley General de la Seguridad Social y las tablas de actualización 2026.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuántos años necesito cotizar como mínimo para cobrar una pensión contributiva?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El período mínimo de cotización es de <strong>15 años (5.475 días)</strong>. Además, la ley exige que al menos <strong>2 de esos 15 años</strong> estén comprendidos dentro de los 15 años inmediatamente anteriores al momento de jubilarse (requisito de carencia específica). Con 15 años se cobra el 50% de la base reguladora.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿En cuántas pagas se cobra la pensión de jubilación?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La pensión contributiva de jubilación se abona en <strong>14 pagas al año</strong>: doce mensualidades ordinarias (una por cada mes) más dos pagas extraordinarias devengadas en los meses de <strong>junio</strong> (paga extra de verano) y <strong>noviembre</strong> (paga extra de Navidad).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué es el nuevo modelo dual de cálculo que entrará en vigor a partir de 2027?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El Real Decreto-ley 2/2023 aprobó un sistema transitorio dual: a partir de 2027 y de forma progresiva, la Seguridad Social calculará de oficio la pensión comparando dos métodos: los últimos 25 años de cotización o los <strong>últimos 29 años descartando de oficio los dos peores años</strong> (computando los mejores 27 años). El sistema aplicará automáticamente al trabajador la cuantía que resulte más beneficiosa.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Tributa la pensión de jubilación en el IRPF?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. Las pensiones públicas de jubilación tienen la consideración fiscal de <strong>rendimientos del trabajo</strong> a efectos del IRPF. La Seguridad Social practica la retención correspondiente cada mes según los tramos del impuesto sobre la renta y las circunstancias familiares del pensionista.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué bonificación existe si decido retrasar mi jubilación (jubilación demorada)?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Por cada año completo de trabajo cotizado más allá de la edad legal ordinaria de retiro, el trabajador puede elegir entre un <strong>incremento porcentual adicional del 4%</strong> de por vida sobre su pensión mensual, o un <strong>pago único a tanto alzado</strong> que oscila entre 5.000 € y 12.000 € por año de demora según su base de cotización, o una combinación mixta de ambos incentivos.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas de Planificación Financiera y Laboral
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Analiza tu patrimonio futuro, sueldo neto actual y cotizaciones profesionales con nuestros simuladores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/calculadora-sueldo-neto"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Nómina Activa</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba tu base de cotización actual en nómina y lo que descuenta la Seguridad Social.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular nómina</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-irpf-autonomos"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Autónomos</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora IRPF Autónomos
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Descubre cómo influyen las cuotas por rendimientos reales en tu futura jubilación del RETA.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver cuotas RETA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-finiquito-despido"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Extinción Laboral</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora de Finiquito
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Simula la indemnización por despido y liquidación en caso de salida anticipada de la empresa.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular despido</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/simulador-rentabilidad-alquiler"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Ahorro e Inversión</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Rentabilidad Alquiler
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Planifica ingresos pasivos complementarios a tu pensión pública de jubilación.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular rentas</span>
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
              <strong>Real Decreto Legislativo 8/2015, de 30 de octubre:</strong> Texto refundido de la Ley General de la Seguridad Social (artículos 204 a 215: Régimen general de pensión de jubilación).
            </li>
            <li>
              <strong>Ley 21/2021, de 28 de diciembre:</strong> Garantía del poder adquisitivo de las pensiones y revalorización según IPC real (BOE núm. 312/2021).
            </li>
            <li>
              <strong>Real Decreto-ley 2/2023, de 16 de marzo:</strong> Medidas urgentes para la ampliación de derechos de los pensionistas y reducción de la brecha de género.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
