import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainFiniquitoEngine } from '@/components/international/SpainFiniquitoEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Finiquito y Despido 2026 : Indemnización y Liquidación | Kagazo',
  description:
    'Calcula gratis tu indemnización por despido y finiquito en España según el Estatuto de los Trabajadores. Despido improcedente (33 días), objetivo (20 días), vacaciones y salario diario.',
  keywords: [
    'calculadora finiquito despido 2026',
    'calcular indemnizacion despido improcedente 33 dias',
    'despido objetivo 20 dias calculo finiquito',
    'salario diario indemnizacion despido estatuto trabajadores',
    'calculo vacaciones no disfrutadas finiquito',
    'tributacion indemnizacion despido irpf 180000',
    'derecho a paro baja voluntaria o despido',
    'contrato anterior 2012 indemnizacion 45 dias',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-finiquito-despido`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-finiquito-despido`,
      'es': `${SITE_URL}/es/calculadora-finiquito-despido`,
      'x-default': `${SITE_URL}/es/calculadora-finiquito-despido`,
    },
  },
  openGraph: {
    title: 'Calculadora de Finiquito y Despido 2026 : Indemnización y Liquidación',
    description:
      'Simulador oficial de indemnización por despido y liquidación de finiquito en España: 20 días, 33 días, vacaciones pendientes y pagas devengadas.',
    url: `${SITE_URL}/es/calculadora-finiquito-despido`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainFiniquitoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Finiquito y Despido España 2026',
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
          'Simulador legal de indemnización por despido según los artículos 53 y 56 del Estatuto de los Trabajadores y liquidación de saldo y finiquito.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Indemnización Laboral y Finiquito',
        category: 'SeverancePayCalculation',
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
            name: 'Calculadora de Finiquito y Despido',
            item: `${SITE_URL}/es/calculadora-finiquito-despido`,
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
          <span className="text-slate-900 font-bold">Calculadora de Finiquito y Despido</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Estatuto de los Trabajadores (Real Decreto Legislativo 2/2015)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Finiquito e Indemnización por Despido 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula al céntimo el dinero exacto que debe abonarte la empresa al terminar tu relación laboral: indemnización legal (despido improcedente de 33 días u objetivo de 20 días), días de salario del mes en curso, parte proporcional de pagas extraordinarias y vacaciones pendientes.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se calcula la indemnización por despido en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            La indemnización resulta de multiplicar el <strong>salario diario bruto</strong> (salario anual con pagas extras entre 365 días) por los <strong>días reconocidos por año trabajado</strong> (prorrateando meses completos). Para un despido <strong>objetivo son 20 días por año</strong> (máximo 12 mensualidades); para un despido <strong>improcedente son 33 días por año</strong> (máximo 24 mensualidades). A esto se suma el finiquito de vacaciones y pagas devengadas.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainFiniquitoEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Indemnizaciones según Antigüedad y Salario
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Cálculo de la indemnización legal obligatoria exenta de IRPF para contratos posteriores al 12 de febrero de 2012.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Salario Bruto Anual</th>
                  <th className="py-3.5 px-4 font-bold">Salario Diario</th>
                  <th className="py-3.5 px-4 font-bold">Antigüedad</th>
                  <th className="py-3.5 px-4 font-bold text-slate-800">Despido Objetivo (20 días/año)</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Despido Improcedente (33 días/año)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600">Tope Legal Aplicable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">24.000 €</td>
                  <td className="py-3 px-4 text-slate-600">65,75 € / día</td>
                  <td className="py-3 px-4 font-sans">1 año</td>
                  <td className="py-3 px-4 text-slate-900">1.315 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">2.170 €</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Sin tope</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">24.000 €</td>
                  <td className="py-3 px-4 text-slate-600">65,75 € / día</td>
                  <td className="py-3 px-4 font-sans">3 años</td>
                  <td className="py-3 px-4 text-slate-900">3.945 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">6.509 €</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Sin tope</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">24.000 €</td>
                  <td className="py-3 px-4 text-slate-600">65,75 € / día</td>
                  <td className="py-3 px-4 font-sans">5 años</td>
                  <td className="py-3 px-4 text-slate-900">6.575 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">10.849 €</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Sin tope</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">30.000 € (Media España)</td>
                  <td className="py-3 px-4 text-slate-600">82,19 € / día</td>
                  <td className="py-3 px-4 font-sans">5 años</td>
                  <td className="py-3 px-4 text-slate-900">8.219 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">13.561 €</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Sin tope</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">36.000 €</td>
                  <td className="py-3 px-4 text-slate-600">98,63 € / día</td>
                  <td className="py-3 px-4 font-sans">8 años</td>
                  <td className="py-3 px-4 text-slate-900">15.781 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">26.038 €</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Sin tope</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">36.000 €</td>
                  <td className="py-3 px-4 text-slate-600">98,63 € / día</td>
                  <td className="py-3 px-4 font-sans">15 años</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">29.589 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">48.822 €</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">Tope 24 m (72.000 €)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">45.000 €</td>
                  <td className="py-3 px-4 text-slate-600">123,29 € / día</td>
                  <td className="py-3 px-4 font-sans">20 años</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">45.000 € (Tope 12m)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">81.372 €</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">Tope 24 m (90.000 €)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Diferencia Fundamental entre Finiquito e Indemnización por Despido
            </h2>
            <p>
              En el ámbito del derecho laboral español existe una confusión habitual entre dos conceptos que componen el cese de una relación contractual: el <strong>documento de liquidación, saldo y finiquito</strong> y la <strong>indemnización por extinción del contrato</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <FileText className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. El Finiquito (Obligatorio en todo cese)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Es la liquidación contable de las cantidades devengadas por el trabajador que aún no ha cobrado al momento de extinguirse el contrato. Se abona <strong>siempre</strong>, incluso en despidos disciplinarios o bajas voluntarias:
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                  <li><strong>Días del mes trabajados:</strong> Salario de los días transcurridos hasta la fecha efectiva de baja.</li>
                  <li><strong>Pagas extraordinarias pendientes:</strong> Parte proporcional de la paga de verano o Navidad si no están prorrateadas mensualmente.</li>
                  <li><strong>Vacaciones no disfrutadas:</strong> Días generados en el año natural (mínimo 2,5 días naturales por mes trabajado) pendientes de disfrute. Cotizan a la Seguridad Social y tributan IRPF.</li>
                  <li><strong>Horas extras y bonus:</strong> Cantidades variables devengadas pendientes de liquidación.</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. La Indemnización Legal por Despido</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Es la compensación económica legal fijada por el Estatuto de los Trabajadores para resarcir al empleado por la pérdida involuntaria de su puesto de trabajo:
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                  <li><strong>Despido Objetivo (Art. 52 y 53 ET):</strong> 20 días de salario por año de servicio, prorrateándose por meses los períodos inferiores a un año y con un máximo de 12 mensualidades.</li>
                  <li><strong>Despido Improcedente (Art. 56 ET):</strong> 33 días de salario por año trabajado con un tope de 24 mensualidades (para contratos firmados tras el 12 de febrero de 2012).</li>
                  <li><strong>Fin de contrato de duración determinada:</strong> 12 días por cada año trabajado.</li>
                  <li><strong>Exención fiscal:</strong> Totalmente exenta de IRPF hasta un límite de 180.000 € siempre que no supere la cuantía legal obligatoria.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Paso a Paso : Cómo calcular el Salario Diario Regulador
            </h2>
            <p>
              La jurisprudencia del Tribunal Supremo establece que el cálculo de la indemnización debe realizarse tomando el <strong>salario bruto anual íntegro</strong> que percibe el trabajador en el momento del despido:
            </p>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Cálculo del Salario Diario Oficial:</p>
              <p>Salario Anual = (Salario Base 12 meses + Complementos Salariales + Pagas Extras + Promedio Variables últimos 12 meses)</p>
              <p>Salario Diario = Salario Bruto Anual / 365 días (366 en años bisiestos)</p>
              <p className="text-slate-600 font-sans text-xs pt-1">
                Ejemplo: Con 30.000 € brutos al año, tu salario diario es de 30.000 / 365 = <strong>82,19 €/día</strong>. Con 4 años y 6 meses trabajados (54 meses), los años computables son 54 / 12 = 4,5 años. En despido improcedente: 4,5 × 33 días × 82,19 € = <strong>12.205,22 € de indemnización</strong>.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
            <p className="font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              Consejos Clave al Firmar la Carta de Despido y Finiquito:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Firma siempre "No Conforme" junto a la fecha real:</strong> Si no estás seguro de que las cantidades sean exactas o si consideras que el despido es improcedente, escribir de tu puño y letra <em>"No conforme"</em> y la fecha del día en todas las copias no te impide cobrar el finiquito y te reserva el derecho de demandar ante el SMAC en el plazo de <strong>20 días hábiles</strong>.</li>
              <li><strong>Exige la presencia de un representante legal de los trabajadores:</strong> Tienes derecho por ley a que un delegado sindical o miembro del comité de empresa asista a la firma del finiquito.</li>
            </ul>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre Finiquito e Indemnizaciones Laborales
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios jurídicos fundamentados en el Estatuto de los Trabajadores y la jurisprudencia del Tribunal Supremo.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué ocurre con los contratos firmados antes del 12 de febrero de 2012?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Se aplica la <strong>disposición transitoria quinta de la Ley 3/2012</strong>: el cálculo es mixto. Por el periodo trabajado antes del 12/02/2012 se computan <strong>45 días por año</strong> con un tope de 42 mensualidades. Por el periodo posterior al 12/02/2012 se computan <strong>33 días por año</strong>. La indemnización total no puede exceder de 720 días de salario (24 mensualidades), salvo que la cuantía devengada antes de 2012 ya superase ese importe, en cuyo caso se mantiene el tope adquirido hasta un máximo absoluto de 42 mensualidades.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Tengo derecho a cobrar la prestación por desempleo (paro) si me despiden?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. Todo despido ejecutado por la empresa (ya sea objetivo, improcedente o incluso disciplinario) sitúa legalmente al trabajador en <strong>situación legal de desempleo</strong>, lo que permite solicitar el paro ante el SEPE si se han cotizado al menos 360 días en los últimos seis años. Por el contrario, la <strong>baja voluntaria (dimisión)</strong> no da derecho a paro en ningún caso.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuánto plazo tengo para impugnar o demandar por un despido?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El plazo legal de caducidad es extraordinariamente breve: exactamente <strong>20 días hábiles</strong> (excluyendo sábados, domingos y festivos) desde la fecha con efectos del despido. Dentro de ese plazo se debe presentar obligatoriamente la papeleta de conciliación ante el SMAC (Servicio de Mediación, Arbitraje y Conciliación) de tu comunidad autónoma para interrumpir el plazo.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Tributa la indemnización por despido en el IRPF?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La indemnización legal obligatoria prevista en el Estatuto de los Trabajadores está <strong>exenta de IRPF hasta un límite de 180.000 euros</strong> (artículo 7.e de la Ley del IRPF). Solo tributará el exceso que supere los 180.000 € o cualquier indemnización pactada voluntariamente con la empresa por encima de los límites legales (por ejemplo, si te pagan 45 días sin mediar conciliación administrativa o judicial).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué pasa si la empresa no cumple los 15 días de preaviso en despido objetivo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En el despido objetivo la empresa debe otorgar un preaviso mínimo por escrito de <strong>15 días naturales</strong>. Si no lo concede o decide rescindir la relación de manera inmediata, está obligada legalmente a abonar en el finiquito el salario correspondiente a los días de preaviso omitidos (un día de salario por cada día no preavisado).
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
              Analiza tus derechos laborales, salario neto y plazos administrativos oficiales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/calculadora-sueldo-neto"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Nómina</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula tu salario limpio al mes en 12 o 14 pagas para valorar nuevas ofertas de empleo.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular nómina</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-dias-habiles"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Plazos Legales</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Días Hábiles
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula con exactitud los 20 días hábiles para presentar la papeleta de conciliación SMAC.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular plazo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculador-horas-extras"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Horas Extra</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculador Horas Extras
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba el valor y recargo de las horas extraordinarias pendientes de liquidar en tu finiquito.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular horas</span>
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
                  Calculadora Jubilación
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba cómo afecta el cese laboral y los periodos de desempleo a tu base reguladora de pensión.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver pensión</span>
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
              <strong>Real Decreto Legislativo 2/2015, de 23 de octubre:</strong> Texto refundido de la Ley del Estatuto de los Trabajadores (BOE núm. 255/2015), artículos 49 a 56.
            </li>
            <li>
              <strong>Ley 36/2011, de 10 de octubre:</strong> Ley Reguladora de la Jurisdicción Social (plazos de demanda y papeleta de conciliación SMAC).
            </li>
            <li>
              <strong>Ley 35/2006 del IRPF:</strong> Artículo 7.e sobre la exención tributaria de las indemnizaciones por despido hasta 180.000 €.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
