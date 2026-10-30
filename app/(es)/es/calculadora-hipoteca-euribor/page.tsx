import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainHipotecaEngine } from '@/components/international/SpainHipotecaEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Home, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Hipotecas 2026 : Cuota Fija, Variable y Euríbor | Kagazo',
  description:
    'Calcula la cuota mensual de tu hipoteca en España en 2026 a tipo fijo, variable o mixto. Tabla de amortización francesa, coste total de intereses y gastos según Ley 5/2019.',
  keywords: [
    'calculadora hipoteca espana 2026',
    'simulador hipoteca euribor banco de espana',
    'calcular cuota hipoteca tipo fijo 25 y 30 anos',
    'cuanto pago de hipoteca por 200000 euros',
    'tabla amortizacion francesa hipoteca',
    'gastos hipoteca ley 5 2019 quien los paga',
    'capacidad de endeudamiento hipoteca 35 por ciento',
    'comision por amortizacion anticipada hipoteca',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-hipoteca-euribor`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-hipoteca-euribor`,
      'es': `${SITE_URL}/es/calculadora-hipoteca-euribor`,
      'x-default': `${SITE_URL}/es/calculadora-hipoteca-euribor`,
    },
  },
  openGraph: {
    title: 'Calculadora de Hipotecas 2026 : Cuota Fija, Variable y Euríbor',
    description:
      'Simula tu cuota hipotecaria mensual y el coste total de intereses con el Euríbor actual y el sistema de amortización francés.',
    url: `${SITE_URL}/es/calculadora-hipoteca-euribor`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainHipotecaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Hipotecas España 2026',
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
          'Simulador de cuota hipotecaria y cuadro de amortización francés conforme a la Ley 5/2019 de crédito inmobiliario y supervisión del Banco de España.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Simulación de Préstamo Hipotecario',
        category: 'MortgageLoanCalculation',
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
            name: 'Inmobiliario e Hipotecario',
            item: `${SITE_URL}/es#inmobiliario-vivienda`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Calculadora de Hipotecas',
            item: `${SITE_URL}/es/calculadora-hipoteca-euribor`,
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
          <Link href="/es#inmobiliario-vivienda" className="hover:text-slate-900 transition-colors">
            Inmobiliario e Hipotecario
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculadora de Hipotecas</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ley 5/2019 de Contratos de Crédito Inmobiliario • Banco de España</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Hipotecas 2026 : Cuota Mensual y Euríbor
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula la cuota mensual de tu préstamo hipotecario a tipo fijo, variable o mixto. Desglose completo de intereses acumulados, amortización de capital francés y comprobación del límite de endeudamiento recomendado por el Banco de España.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cuánto se paga de cuota por una hipoteca en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Para una hipoteca media de <strong>150.000 € a 25 años al 3,00% de interés</strong> (sistema de amortización francés), la cuota mensual fija es de <strong>711,32 € al mes</strong>. A lo largo del préstamo se devolverán 150.000 € de capital y <strong>63.397 € en intereses</strong>, sumando un coste total de 213.397 €. A 30 años, la cuota desciende a <strong>632,41 €/mes</strong>, pero los intereses se incrementan hasta 77.666 €.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainHipotecaEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla Comparativa de Cuotas Hipotecarias según Importe y Plazo
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Cálculo con tipo de interés medio de mercado del 3,00% nominal anual mediante sistema de amortización constante francés.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Importe Hipoteca</th>
                  <th className="py-3.5 px-4 font-bold">Cuota 20 Años</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Cuota 25 Años</th>
                  <th className="py-3.5 px-4 font-bold">Cuota 30 Años</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Intereses Totales (25 Años)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600">Ingresos Mínimos Sugeridos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">100.000 €</td>
                  <td className="py-3 px-4 text-slate-600">554,60 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">474,21 €</td>
                  <td className="py-3 px-4 text-slate-600">421,60 €</td>
                  <td className="py-3 px-4 text-slate-900">42.263 €</td>
                  <td className="py-3 px-4 text-slate-700 font-sans">1.350 € netos/mes</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">150.000 € (Media Nacional)</td>
                  <td className="py-3 px-4 text-slate-600">831,90 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">711,32 €</td>
                  <td className="py-3 px-4 text-slate-600">632,41 €</td>
                  <td className="py-3 px-4 text-slate-900">63.397 €</td>
                  <td className="py-3 px-4 text-slate-700 font-sans">2.030 € netos/mes</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">200.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.109,20 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">948,42 €</td>
                  <td className="py-3 px-4 text-slate-600">843,21 €</td>
                  <td className="py-3 px-4 text-slate-900">84.527 €</td>
                  <td className="py-3 px-4 text-slate-700 font-sans">2.710 € netos/mes</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">250.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.386,50 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">1.185,53 €</td>
                  <td className="py-3 px-4 text-slate-600">1.054,01 €</td>
                  <td className="py-3 px-4 text-slate-900">105.658 €</td>
                  <td className="py-3 px-4 text-slate-700 font-sans">3.390 € netos/mes</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">300.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.663,80 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">1.422,63 €</td>
                  <td className="py-3 px-4 text-slate-600">1.264,81 €</td>
                  <td className="py-3 px-4 text-slate-900">126.790 €</td>
                  <td className="py-3 px-4 text-slate-700 font-sans">4.060 € netos/mes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: Los ingresos mínimos sugeridos se calculan respetando la recomendación del Banco de España de no destinar más del 35% de los ingresos netos familiares al pago de deudas bancarias.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cómo Funciona el Sistema de Amortización Francés en España
            </h2>
            <p>
              Prácticamente el 99% de los préstamos hipotecarios concedidos por los bancos en España utilizan el <strong>sistema de amortización francés</strong>. Su rasgo característico es que mantiene una cuota mensual constante (mientras el tipo de interés no varíe), pero con una composición interna que cambia mes a mes:
            </p>
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1">
              <p className="font-bold text-slate-900 font-sans">Estructura de la Cuota Francesa:</p>
              <p>Cuota Mensual = Cuota de Interés (Capital Pendiente × Interés Mensual) + Cuota de Amortización (Capital Devuelto)</p>
              <p className="text-slate-600 font-sans text-xs pt-1">
                En los primeros años del préstamo, la mayor parte de la cuota se destina a pagar intereses y muy poco a amortizar deuda. A medida que avanza el tiempo, la deuda disminuye, el pago de intereses baja exponencialmente y el capital amortizado se dispara.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Landmark className="w-5 h-5 text-orange-600 shrink-0" />
                <h3>Gastos de Hipoteca según la Ley 5/2019</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Desde la entrada en vigor de la Ley de Crédito Inmobiliario, el reparto legal de los gastos de formalización de la hipoteca es obligatorio y taxativo:
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                <li><strong>El Banco Paga:</strong> Notaría de la escritura de préstamo, Registro de la Propiedad, Gestoría y el Impuesto de Actos Jurídicos Documentados (IAJD).</li>
                <li><strong>El Comprador Paga:</strong> La tasación oficial homologada por el Banco de España (entre 250 € y 500 €) y las copias notariales de la escritura que solicite voluntariamente.</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Home className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3>Ahorro Previo Necesario (Regla del 20% + 10%)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Por prudencia bancaria, las entidades financieras españolas solo prestan como máximo el <strong>80% del valor de tasación o de compraventa</strong> (el menor de los dos) para primera vivienda (y el 70% para segunda residencia).
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                Por tanto, para comprar un piso de 200.000 € necesitas tener ahorrado un 20% de entrada (40.000 €) más aproximadamente un 10% adicional para impuestos (ITP o IVA), notario y registro (20.000 €), sumando un colchón previo de 60.000 €.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tipo Fijo, Variable o Mixto: ¿Cuál Elegir en 2026?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Hipoteca Fija</h4>
                <p className="text-xs text-slate-600">
                  La cuota mensual nunca cambia durante toda la vida del préstamo (25 o 30 años). Ofrece máxima tranquilidad frente a subidas de tipos a cambio de un coste inicial ligeramente más alto.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Hipoteca Variable</h4>
                <p className="text-xs text-slate-600">
                  La cuota se revisa semestral o anualmente sumando el Euríbor a 12 meses más un diferencial bancario fijo (ej. Euríbor + 0,65%). Ideal si los tipos de interés descienden.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Hipoteca Mixta</h4>
                <p className="text-xs text-slate-600">
                  Combina un tramo a tipo fijo muy competitivo durante los primeros 5 o 10 años, pasando posteriormente a tipo variable con Euríbor durante el resto del préstamo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre Hipotecas y Euríbor en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales y criterios de transparencia del Banco de España y la Ley 5/2019.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué es la FEIN y por qué es tan importante antes de firmar?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La <strong>FEIN (Ficha Europea de Información Normalizada)</strong> es la oferta vinculante que el banco está legalmente obligado a entregarte con todas las condiciones financieras del préstamo. Tiene una validez mínima obligatoria de <strong>10 días naturales</strong> (14 días en Cataluña) durante los cuales el banco no puede modificar las condiciones ni cobrar comisiones, garantizando tu derecho a consultar a un notario de forma gratuita.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuál es la comisión máxima por amortizar hipoteca antes de tiempo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La Ley 5/2019 fija límites máximos inquebrantables por reembolso anticipado: en <strong>hipotecas variables</strong>, el banco solo puede cobrar el 0,25% durante los primeros 3 años o el 0,15% durante los primeros 5 años (después 0%). En <strong>hipotecas fijas</strong>, el límite legal es del 2,00% durante los 10 primeros años y del 1,50% el resto del periodo.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo subrogar mi hipoteca a otro banco para conseguir mejor tipo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. La subrogación hipotecaria de acreedor te permite cambiar tu hipoteca a otro banco que ofrezca un tipo de interés más bajo o pasar de tipo variable a tipo fijo. Tu banco actual tiene derecho a enervar la oferta en un plazo de 15 días igualando las condiciones; si no lo hace, el cambio se formaliza ante notario con costes arancelarios muy reducidos.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué seguros me puede exigir el banco para concederme la hipoteca?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Por ley, el banco únicamente puede exigir la contratación obligatoria de un <strong>seguro contra daños e incendios</strong> del inmueble hipotecado. Las ventas combinadas (seguro de vida, plan de pensiones, alarma) solo pueden ofrecerse como bonificaciones voluntarias para rebajar el tipo de interés, y el banco está obligado a aceptar pólizas alternativas de cualquier otra compañía sin empeorar las condiciones si ofrecen la misma cobertura.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo calcula el banco mi ratio de endeudamiento?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El ratio de endeudamiento (DTI) se calcula sumando la futura cuota de la hipoteca a cualquier otro préstamo bancario en vigor (coche, préstamos personales, tarjetas de crédito) y dividiéndolo entre los ingresos netos mensuales demostrables de los titulares. Para ser aprobada por riesgos, la ratio total no debe sobrepasar el <strong>35% - 40%</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas Inmobiliarias y de Vivienda Relacionadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Planifica tu operación inmobiliaria con todas las garantías legales y fiscales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/calculadora-itp-gastos-compraventa"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Impuestos</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora ITP y Gastos
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el Impuesto de Transmisiones Patrimoniales según tu comunidad autónoma y gastos de notaría.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular gastos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-plusvalia-municipal"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Tributos Locales</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Plusvalía Municipal
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba el IIVTNU en caso de venta, donación o herencia de inmuebles urbanos.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular plusvalía</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/simulador-rentabilidad-alquiler"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Inversión</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Rentabilidad de Alquiler
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el yield bruto y neto si compras una vivienda para ponerla en alquiler.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular rentabilidad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-sueldo-neto"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Capacidad de Pago</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba tus ingresos netos mensuales para calcular tu límite de endeudamiento bancario.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver sueldo limpio</span>
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
              <strong>Ley 5/2019, de 15 de marzo:</strong> Reguladora de los contratos de crédito inmobiliario (BOE núm. 65/2019), reparto de gastos y transparencia bancaria.
            </li>
            <li>
              <strong>Circular 5/2012 del Banco de España:</strong> Normas de transparencia de los servicios bancarios y responsabilidad en la concesión de préstamos.
            </li>
            <li>
              <strong>Portal del Cliente Bancario (Banco de España):</strong> Criterios oficiales para la evaluación de la solvencia y tipos de referencia oficiales (Euríbor).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
