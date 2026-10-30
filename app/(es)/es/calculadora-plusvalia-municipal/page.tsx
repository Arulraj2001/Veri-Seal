import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainPlusvaliaEngine } from '@/components/international/SpainPlusvaliaEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Home, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora Plusvalía Municipal 2026 : Método Real y Objetivo | Kagazo',
  description:
    'Calcula la plusvalía municipal (IIVTNU) en España en 2026 según el Real Decreto-ley 26/2021. Compara el método objetivo y el real, coeficientes por años y exención por pérdidas.',
  keywords: [
    'calculadora plusvalia municipal 2026',
    'calcular iivtnu metodo objetivo real',
    'tabla coeficientes plusvalia municipal 2026 boe',
    'simulador plusvalia ayuntamiento madrid barcelona valencia',
    'exencion plusvalia municipal venta con perdidas',
    'quien paga la plusvalia en compraventa y herencia',
    'plazo pago plusvalia municipal 30 dias habiles',
    'reclamar devolucion plusvalia municipal tribunal constitucional',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-plusvalia-municipal`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-plusvalia-municipal`,
      'es': `${SITE_URL}/es/calculadora-plusvalia-municipal`,
      'x-default': `${SITE_URL}/es/calculadora-plusvalia-municipal`,
    },
  },
  openGraph: {
    title: 'Calculadora Plusvalía Municipal 2026 : Método Real y Objetivo',
    description:
      'Calcula al instante la plusvalía municipal de tu ayuntamiento comparando el método real y objetivo para pagar el menor importe legal.',
    url: `${SITE_URL}/es/calculadora-plusvalia-municipal`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainPlusvaliaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Plusvalía Municipal IIVTNU España 2026',
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
          'Simulador oficial del Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana con doble comparativa objetiva y real conforme al Real Decreto-ley 26/2021.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo del Impuesto sobre el Incremento del Suelo Urbano',
        category: 'MunicipalTaxCalculation',
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
            name: 'Plusvalía Municipal',
            item: `${SITE_URL}/es/calculadora-plusvalia-municipal`,
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
          <span className="text-slate-900 font-bold">Plusvalía Municipal</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Real Decreto-ley 26/2021 • Sentencia Tribunal Constitucional 182/2021</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Plusvalía Municipal (IIVTNU) 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula cuánto debes pagar a tu ayuntamiento al vender, donar o heredar una vivienda en España. Compara de forma automática los dos sistemas legales vigentes (Método Objetivo vs Plusvalía Real) y liquida por la cuota menor, o comprueba si estás exento por venta a pérdidas.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se calcula la plusvalía municipal tras la reforma?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Tras el RDL 26/2021, el contribuyente puede elegir entre dos métodos: el <strong>Método Objetivo</strong> (multiplica el valor catastral del suelo por un coeficiente según años de tenencia) o la <strong>Plusvalía Real</strong> (grava la ganancia neta patrimonial real proporcional al valor del suelo). Se tributa por la <strong>fórmula que resulte más barata</strong>. Si el inmueble se vende con pérdidas patrimoniales demostradas, <strong>la cuota es exactamente 0 €</strong>.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainPlusvaliaEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Coeficientes Máximos de la Plusvalía Municipal (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Coeficientes oficiales aprobados en los Presupuestos Generales del Estado aplicables sobre el valor catastral del suelo.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Años Transcurridos</th>
                  <th className="py-3.5 px-4 font-bold">Coeficiente Máximo Legal</th>
                  <th className="py-3.5 px-4 font-bold">Base Imponible (Suelo 50.000 €)</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Cuota Máx. Estimada (Tipo 30%)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600">Comportamiento Típico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Menos de 1 año (Especulación)</td>
                  <td className="py-3 px-4 text-slate-800">0,15</td>
                  <td className="py-3 px-4 text-slate-900">7.500 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">2.250 €</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">Sujeto a gravamen desde 2021</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">3 años</td>
                  <td className="py-3 px-4 text-slate-800">0,16</td>
                  <td className="py-3 px-4 text-slate-900">8.000 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">2.400 €</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">Operaciones a corto plazo</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">5 años (Media habitual)</td>
                  <td className="py-3 px-4 text-slate-800">0,17</td>
                  <td className="py-3 px-4 text-slate-900">8.500 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">2.550 €</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">Periodo frecuente de rotación</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">10 años</td>
                  <td className="py-3 px-4 text-slate-800">0,08</td>
                  <td className="py-3 px-4 text-slate-900">4.000 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">1.200 €</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">Tramo muy favorable en objetivo</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">15 años</td>
                  <td className="py-3 px-4 text-slate-800">0,10</td>
                  <td className="py-3 px-4 text-slate-900">5.000 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">1.500 €</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">Propiedades familiares</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">20 años o más (Tope)</td>
                  <td className="py-3 px-4 text-slate-800">0,45</td>
                  <td className="py-3 px-4 text-slate-900">22.500 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">6.750 €</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">Tope máximo temporal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: Los ayuntamientos tienen potestad para fijar coeficientes inferiores a estos máximos estatales y pueden establecer tipos impositivos de hasta el 30% como máximo legal.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Los Dos Métodos Oficiales de Cálculo del IIVTNU
            </h2>
            <p>
              Tras la histórica sentencia 182/2021 del Tribunal Constitucional que declaró nulo el sistema anterior por cobrar impuestos incluso cuando no había existido ganancia económica, el Gobierno aprobó el <strong>Real Decreto-ley 26/2021</strong>. Desde entonces, el contribuyente tiene el derecho legal inalienable de optar por el método más económico:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Calculator className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. El Método Objetivo</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Calcula la base imponible multiplicando el <strong>valor catastral del suelo</strong> (que figura en el recibo del IBI del inmueble) por el coeficiente legal que corresponda al número exacto de años enteros transcurridos entre la adquisición y la transmisión.
                </p>
                <p className="text-xs text-slate-500">
                  Suele ser la opción más ventajosa cuando la vivienda se ha revalorizado intensamente en el mercado y la ganancia patrimonial real obtenida es muy elevada.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. El Método de Plusvalía Real</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Calcula la ganancia económica real restando del precio de venta escriturado el precio de compra original acreditado. A esa plusvalía se le aplica el porcentaje que representa el valor catastral del suelo sobre el valor catastral total del inmueble.
                </p>
                <p className="text-xs text-slate-500">
                  Suele ser enormemente beneficioso cuando el inmueble se ha vendido con una plusvalía muy reducida o en periodos de estancamiento de precios.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Exención Total por Venta con Pérdidas
            </h2>
            <p>
              Si el precio de transmisión fijado en la escritura de venta o donación es <strong>igual o inferior al precio al que compraste el inmueble</strong> (computando gastos notariales e impuestos abonados en la adquisición), la ley reconoce formalmente que <strong>no existe hecho imponible</strong>:
            </p>
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                Cómo Declarar la No Sujeción por Pérdidas:
              </p>
              <p>
                Estar exento no te exime de presentar la autoliquidación ante el ayuntamiento. Debes presentar el impreso tributario formal en plazo (30 días hábiles) marcando la casilla de <strong>"No Sujeción por inexistencia de incremento de valor"</strong> y adjuntando una copia simple de la escritura notarial de compra original y de la escritura de venta donde se demuestre la ausencia de ganancia económica.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre la Plusvalía Municipal (IIVTNU)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales fundamentadas en la Ley de Haciendas Locales y la jurisprudencia constitucional.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Quién está obligado a pagar la plusvalía municipal?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Depende de la naturaleza de la transmisión:
                <br />• <strong>En una compraventa onerosa:</strong> El obligado legal al pago es <strong>el vendedor</strong> (quien transmite y obtiene la ganancia).
                <br />• <strong>En una herencia o donación gratuita:</strong> El obligado legal al pago es <strong>el adquirente</strong> (el heredero o el donatario que recibe el inmueble).
                <br />• <strong>Excepción con vendedores no residentes:</strong> Si el vendedor reside fiscalmente en el extranjero, el comprador queda constituido como sustituto del contribuyente y debe retener el impuesto.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué plazo legal existe para liquidar el impuesto ante el ayuntamiento?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En transmisiones entre vivos (compraventas o donaciones), el plazo es de <strong>30 días hábiles</strong> a contar desde el día siguiente a la firma de la escritura notarial. En caso de herencia o fallecimiento del propietario (mortis causa), el plazo legal es de <strong>6 meses</strong>, prorrogable a un año si se solicita expresamente por escrito antes del quinto mes.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Dónde puedo encontrar el valor catastral del suelo de mi casa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El valor catastral del suelo aparece desglosado en el <strong>recibo anual del Impuesto sobre Bienes Inmuebles (IBI)</strong> que emite el ayuntamiento. También puedes consultarlo introduciendo la Referencia Catastral del inmueble en la Sede Electrónica del Catastro o en el certificado del valor catastral de tu municipio.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Se tributa si la propiedad se vende en menos de un año desde la compra?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. A diferencia de la normativa anterior a 2021 donde las operaciones a menos de un año no estaban sujetas, la reforma del RDL 26/2021 introdujo un coeficiente específico de <strong>0,15 para operaciones generadas en menos de 12 meses</strong>, con el fin de desincentivar la especulación inmobiliaria rápida de compra y reventa inmediata.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo deducirme las obras de reforma al calcular la plusvalía real?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La doctrina de los tribunales económico-administrativos permite computar los <strong>gastos inherentes a la adquisición y transmisión</strong> (impuestos como ITP, notaría, registro y honorarios de agencia inmobiliaria) para determinar si hubo pérdida o beneficio real. No obstante, las mejoras u obras de reforma solo son aceptadas si tienen la consideración técnica de inversiones que amplían la capacidad o vida útil del inmueble con facturas reglamentarias.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas Inmobiliarias y Fiscales Relacionadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Gestiona todos los tributos vinculados a tus propiedades inmobiliarias.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/calculadora-itp-gastos-compraventa"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Comprador</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora ITP y Gastos
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el Impuesto de Transmisiones Patrimoniales autonómico y aranceles notariales.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular ITP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-hipoteca-euribor"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Hipotecas</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora de Hipotecas
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Simula la amortización y cuota mensual si necesitas financiar tu nueva vivienda.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular hipoteca</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/actualizador-alquiler-ipc"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Arrendadores</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Actualizador Alquiler IPC
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el incremento de renta permitido por la Ley de Vivienda en contratos vigentes.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Actualizar alquiler</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/simulador-rentabilidad-alquiler"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Inversores</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Rentabilidad Alquiler
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el rendimiento bruto y neto descontando impuestos y gastos de mantenimiento.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver rentabilidad</span>
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
              <strong>Real Decreto-ley 26/2021, de 8 de noviembre:</strong> Adaptación del texto refundido de la Ley Reguladora de las Haciendas Locales a la jurisprudencia del Tribunal Constitucional respecto al IIVTNU (BOE núm. 268/2021).
            </li>
            <li>
              <strong>Sentencia del Tribunal Constitucional 182/2021, de 26 de octubre:</strong> Declaración de inconstitucionalidad y nulidad del anterior método objetivo obligatorio de determinación de la base imponible.
            </li>
            <li>
              <strong>Real Decreto Legislativo 2/2004, de 5 de marzo:</strong> Texto refundido de la Ley Reguladora de las Haciendas Locales (artículos 104 a 110: regulación del IIVTNU).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
