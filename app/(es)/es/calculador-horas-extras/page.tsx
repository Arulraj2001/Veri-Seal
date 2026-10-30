import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainHorasExtrasEngine } from '@/components/international/SpainHorasExtrasEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Clock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculador de Horas Extras 2026 : Precio, Recargo y Límite Legal | Kagazo',
  description:
    'Calcula cuánto te deben pagar por tus horas extras en España en 2026 según el Estatuto de los Trabajadores. Recargos diurnos (+75%), nocturnos y festivos (+100%), cotizaciones y tope de 80 horas.',
  keywords: [
    'calculador horas extras espana 2026',
    'precio hora extra convenio estatuto trabajadores',
    'calcular horas extraordinarias nocturnas festivas',
    'limite 80 horas extras anuales inspeccion trabajo',
    'recargo horas extras 75 por ciento nomina',
    'compensacion horas extras descanso retribuido',
    'cotizacion seguridad social horas extras',
    'horas complementarias tiempo parcial vs extras',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculador-horas-extras`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculador-horas-extras`,
      'es': `${SITE_URL}/es/calculador-horas-extras`,
      'x-default': `${SITE_URL}/es/calculador-horas-extras`,
    },
  },
  openGraph: {
    title: 'Calculador de Horas Extras 2026 : Precio, Recargo y Límite Legal',
    description:
      'Calcula al céntimo el valor de tus horas extraordinarias diurnas, festivas y nocturnas según tu salario bruto y jornada anual de convenio.',
    url: `${SITE_URL}/es/calculador-horas-extras`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainHorasExtrasPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculador de Horas Extras España 2026',
        applicationCategory: 'BusinessApplication',
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
          'Herramienta oficial de cálculo de horas extraordinarias diurnas, festivas y nocturnas según el Estatuto de los Trabajadores y los convenios colectivos.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Retribución por Horas Extraordinarias',
        category: 'OvertimeCompensationCalculation',
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
            name: 'Calculador de Horas Extras',
            item: `${SITE_URL}/es/calculador-horas-extras`,
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
          <span className="text-slate-900 font-bold">Calculador de Horas Extras</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Artículo 35 del Estatuto de los Trabajadores • RDL 2/2015</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculador de Horas Extras 2026 : Precio, Recargos y Límite Anual
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula con precisión lo que la empresa debe pagarte por cada hora extraordinaria trabajada. Conoce el valor de tu hora ordinaria según tu jornada de convenio, el recargo mínimo legal para horas diurnas (+75%), festivas y nocturnas (+100%), y el control del límite legal de 80 horas al año.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cuánto se cobra por una hora extra en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Por ley (art. 35 Estatuto de los Trabajadores), la hora extra <strong>nunca puede pagarse por debajo de la hora ordinaria</strong>. Para un sueldo de <strong>24.000 € brutos</strong> (jornada de 1.760 horas/año), la hora ordinaria vale <strong>13,64 €/h</strong>. Con un recargo ordinario habitual del <strong>75%</strong> se cobra a <strong>23,86 €/h</strong>, y en domingo o noche (+100%) a <strong>27,27 €/h</strong>. El límite máximo legal es de <strong>80 horas al año</strong>.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainHorasExtrasEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Precios Orientativos por Hora Extra según Salario Bruto
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Cálculo basado en la jornada media anual en España de 1.760 horas (40 horas semanales ordinarias).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Salario Bruto Anual</th>
                  <th className="py-3.5 px-4 font-bold">Hora Ordinaria</th>
                  <th className="py-3.5 px-4 font-bold">Hora Extra (+50% Convenio)</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Hora Extra Diurna (+75% Legal)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Hora Nocturna / Festiva (+100%)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600">80 Horas Máximas / Año</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">18.000 € (SMI Aprox.)</td>
                  <td className="py-3 px-4 text-slate-600">10,23 €/h</td>
                  <td className="py-3 px-4 text-slate-600">15,34 €/h</td>
                  <td className="py-3 px-4 font-bold text-orange-600">17,90 €/h</td>
                  <td className="py-3 px-4 font-bold text-slate-900">20,45 €/h</td>
                  <td className="py-3 px-4 text-slate-700">1.432 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">24.000 €</td>
                  <td className="py-3 px-4 text-slate-600">13,64 €/h</td>
                  <td className="py-3 px-4 text-slate-600">20,45 €/h</td>
                  <td className="py-3 px-4 font-bold text-orange-600">23,86 €/h</td>
                  <td className="py-3 px-4 font-bold text-slate-900">27,27 €/h</td>
                  <td className="py-3 px-4 text-slate-700">1.909 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">30.000 € (Media Nacional)</td>
                  <td className="py-3 px-4 text-slate-600">17,05 €/h</td>
                  <td className="py-3 px-4 text-slate-600">25,57 €/h</td>
                  <td className="py-3 px-4 font-bold text-orange-600">29,83 €/h</td>
                  <td className="py-3 px-4 font-bold text-slate-900">34,09 €/h</td>
                  <td className="py-3 px-4 text-slate-700">2.386 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">36.000 €</td>
                  <td className="py-3 px-4 text-slate-600">20,45 €/h</td>
                  <td className="py-3 px-4 text-slate-600">30,68 €/h</td>
                  <td className="py-3 px-4 font-bold text-orange-600">35,80 €/h</td>
                  <td className="py-3 px-4 font-bold text-slate-900">40,91 €/h</td>
                  <td className="py-3 px-4 text-slate-700">2.864 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">45.000 €</td>
                  <td className="py-3 px-4 text-slate-600">25,57 €/h</td>
                  <td className="py-3 px-4 text-slate-600">38,35 €/h</td>
                  <td className="py-3 px-4 font-bold text-orange-600">44,74 €/h</td>
                  <td className="py-3 px-4 font-bold text-slate-900">51,14 €/h</td>
                  <td className="py-3 px-4 text-slate-700">3.579 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: Los importes reales exactos prevalecen según lo estipulado en el convenio colectivo sectorial o de empresa de aplicación.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Marco Legal de las Horas Extraordinarias en España
            </h2>
            <p>
              El <strong>artículo 35 del Estatuto de los Trabajadores</strong> define las horas extraordinarias como aquellas horas de trabajo efectivo que se realizan sobre la duración máxima de la jornada ordinaria fijada por ley o por convenio colectivo. Su realización tiene carácter estrictamente <strong>voluntario</strong> para el trabajador, a menos que hayan sido pactadas expresamente en convenio o contrato individual, o se trate de horas motivadas por <strong>fuerza mayor</strong> (siniestros o daños extraordinarios y urgentes).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Clock className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>El Límite Absoluto de 80 Horas Anuales</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ningún trabajador a jornada completa en España puede realizar legalmente más de <strong>80 horas extraordinarias al año</strong>. Este tope estatutario tiene dos excepciones cruciales:
                </p>
                <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                  <li><strong>Horas por fuerza mayor:</strong> No computan para el límite de las 80 horas.</li>
                  <li><strong>Horas compensadas con descanso:</strong> Si la empresa compensa las horas extraordinarias con tiempo de descanso retribuido equivalente dentro de los <strong>4 meses siguientes</strong> a su realización, esas horas <strong>no computan</strong> para el cómputo de las 80 anuales.</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>Registro de Jornada Obligatorio y Sanciones</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Conforme al <strong>Real Decreto-ley 8/2019</strong>, todas las empresas sin excepción están obligadas a registrar diariamente el horario exacto de entrada y salida de cada empleado. El falseamiento, no registro o incumplimiento del límite de horas extras constituye una infracción grave sancionada por la Inspección de Trabajo con multas de hasta <strong>7.500 € por empresa</strong>.
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  La empresa debe entregar al trabajador y a los representantes sindicales un resumen mensual de las horas extras realizadas.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¿Cómo cotizan y tributan las Horas Extras en tu Nómina?
            </h2>
            <p>
              Las horas extraordinarias tienen un tratamiento fiscal y laboral específico en el recibo de nómina:
            </p>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Retenciones y Cotización en Nómina:</p>
              <p>• <strong>Cotización a la Seguridad Social:</strong> Las horas extras habituales cotizan un <strong>4,70% a cargo del trabajador</strong> (23,60% a cargo de la empresa). Las horas por fuerza mayor cotizan un tipo reducido del <strong>2,00% trabajador</strong> (12% empresa).</p>
              <p>• <strong>Retención de IRPF:</strong> El importe cobrado por horas extras se suma a los rendimientos íntegros del trabajo y se le aplica el porcentaje de retención habitual de tu nómina.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
            <p className="font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              Prohibición de Horas Extras en Contratos a Tiempo Parcial:
            </p>
            <p>
              El artículo 12.4.c del Estatuto de los Trabajadores prohíbe de forma tajante que los trabajadores con contrato a <strong>tiempo parcial</strong> realicen horas extraordinarias (salvo las de fuerza mayor). Para incrementar la jornada en tiempo parcial únicamente pueden pactarse <strong>horas complementarias</strong>, que se retribuyen como horas ordinarias normales y requieren preaviso legal de 3 días.
            </p>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre Horas Extras y Convenios Colectivos
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales fundamentadas en la legislación laboral y la doctrina judicial del Tribunal Supremo.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo negarme a hacer horas extras si mi jefe me lo pide?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. La regla general es que la realización de horas extraordinarias es <strong>totalmente voluntaria</strong>. Solo son obligatorias si están pactadas en el convenio colectivo de tu sector o expresamente en tu contrato de trabajo, o cuando se requieran con urgencia para prevenir o reparar siniestros u otros daños extraordinarios de fuerza mayor.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué ocurre si el convenio no dice si se cobran o se descansan?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El Estatuto de los Trabajadores (art. 35.1) establece que, a falta de pacto individual o cláusula en el convenio colectivo, se entiende que las horas extraordinarias <strong>deberán ser compensadas mediante descanso retribuido</strong> dentro de los 4 meses siguientes a su realización (por ejemplo, librando días u horas equivalentes remuneradas).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿A partir de qué hora se considera hora extra nocturna?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Según el artículo 36 del Estatuto de los Trabajadores, se considera trabajo nocturno el realizado entre las <strong>22:00 horas de la noche y las 06:00 horas de la mañana</strong>. Si una hora extra se realiza dentro de esa franja horaria, acumula el recargo por hora extraordinaria más el complemento de nocturnidad fijado por convenio (habitualmente un recargo conjunto de hasta el 100%).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuánto tiempo tengo para reclamar horas extras no pagadas?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El plazo legal de prescripción para reclamar deudas salariales a la empresa es de <strong>exactamente un año (12 meses)</strong> desde el momento en que debieron ser abonadas en nómina (art. 59 del Estatuto de los Trabajadores). Pasado ese plazo, el derecho a cobrar esas cantidades prescribe.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué pruebas sirven ante un juez si la empresa no registra mis horas?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Los tribunales de lo social admiten como pruebas válidas: correos electrónicos y mensajes de WhatsApp enviados o recibidos fuera de jornada, registros de conexión a servidores de la empresa o VPN, geolocalización de vehículos de empresa, grabaciones de cámaras de seguridad y declaraciones de testigos (compañeros de trabajo o clientes).
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas Laborales y de Gestión Salarial
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Controla tus derechos laborales, salario neto y liquidaciones contractuales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/calculadora-sueldo-neto"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Nómina Mensual</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Simula tu nómina limpia al mes incorporando el cobro de tus horas extraordinarias.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular nómina</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-finiquito-despido"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Finiquito</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora de Finiquito
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba cómo liquidar horas extras pendientes en caso de finalización de contrato.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular finiquito</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-dias-habiles"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Calendario Laboral</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Días Hábiles
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula festivos y días laborables para computar tus horas trabajadas en festivos.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver calendario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/generador-factura-pdf"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Servicios Extra</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Generador Factura PDF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Factura trabajos extraordinarios o colaboraciones profesionales como autónomo.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Crear factura</span>
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
              <strong>Real Decreto Legislativo 2/2015, de 23 de octubre:</strong> Estatuto de los Trabajadores, artículo 35 (Horas extraordinarias) y artículo 36 (Trabajo nocturno y turnos).
            </li>
            <li>
              <strong>Real Decreto-ley 8/2019, de 8 de marzo:</strong> Medidas urgentes de protección social y de lucha contra la precariedad laboral en la jornada de trabajo (obligatoriedad del registro diario).
            </li>
            <li>
              <strong>Ley sobre Infracciones y Sanciones en el Orden Social (LISOS):</strong> Real Decreto Legislativo 5/2000, artículos 6 y 7 sobre sanciones en materia de jornada y horas extraordinarias.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
