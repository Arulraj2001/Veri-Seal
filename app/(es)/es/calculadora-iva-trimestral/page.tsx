import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainIvaTrimestralEngine } from '@/components/international/SpainIvaTrimestralEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Calendar, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora IVA Trimestral Modelo 303 (2026) : A Pagar o Compensar | Kagazo',
  description:
    'Calcula gratis el resultado de tu declaración trimestral de IVA (Modelo 303) en España en 2026. Resta el IVA soportado en gastos del repercutido en ventas al 21%, 10% y 4%. Calendario oficial de plazos AEAT.',
  keywords: [
    'calculadora iva trimestral espana 2026',
    'calcular modelo 303 iva autonomos pymes',
    'iva soportado repercutido calcular hacienda',
    'resultado ingresar compensar devolver iva modelo 303',
    'calendario plazos presentacion modelo 303 2026',
    'gastos deducibles iva soportado facturas autonomos',
    'devolucion iva cuarto trimestre enero aeat',
    'casillas modelo 303 autoliquidacion iva',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-iva-trimestral`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-iva-trimestral`,
      'es': `${SITE_URL}/es/calculadora-iva-trimestral`,
      'x-default': `${SITE_URL}/es/calculadora-iva-trimestral`,
    },
  },
  openGraph: {
    title: 'Calculadora IVA Trimestral Modelo 303 (2026) : A Pagar o Compensar',
    description:
      'Simulador oficial de autoliquidación trimestral de IVA en España para autónomos y sociedades (Modelo 303 de la Agencia Tributaria).',
    url: `${SITE_URL}/es/calculadora-iva-trimestral`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainIvaTrimestralPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de IVA Trimestral Modelo 303 España',
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
          'Simulador fiscal oficial de autoliquidación del Impuesto sobre el Valor Añadido (Ley 37/1992 del IVA) para profesionales y pymes en España.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Autoliquidación de IVA Trimestral',
        category: 'ValueAddedTaxCalculation',
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
            name: 'IVA Trimestral (Modelo 303)',
            item: `${SITE_URL}/es/calculadora-iva-trimestral`,
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
          <span className="text-slate-900 font-bold">IVA Trimestral (Modelo 303)</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ley 37/1992 del Impuesto sobre el Valor Añadido • Modelo Oficial 303 AEAT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de IVA Trimestral 2026 (Modelo 303) : A Pagar o Compensar
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula con precisión el resultado de tu declaración trimestral de IVA ante la Agencia Tributaria. Desglosa las bases imponibles de tus facturas emitidas y compras deducibles por tipos de IVA (21%, 10% y 4%) y descubre de inmediato si tu liquidación resulta a ingresar en Hacienda o a compensar para el siguiente trimestre.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se calcula el resultado del Modelo 303 de IVA?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            El resultado del Modelo 303 resulta de restar del <strong>IVA devengado/repercutido</strong> (el cobrado en tus facturas emitidas a clientes) el <strong>IVA deducible/soportado</strong> (el pagado a proveedores en gastos necesarios para tu negocio). Si el saldo es <strong>positivo</strong>, debes abonar la diferencia a la AEAT entre el día 1 y 20 del mes siguiente al trimestre. Si es <strong>negativo</strong>, ese saldo a tu favor se compensa automáticamente en los trimestres posteriores.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainIvaTrimestralEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Calendario Oficial de Plazos de Presentación del Modelo 303 (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Fechas límite improrrogables fijadas por la Agencia Estatal de Administración Tributaria (AEAT).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Trimestre Fiscal</th>
                  <th className="py-3.5 px-4 font-bold">Periodo Facturado</th>
                  <th className="py-3.5 px-4 font-bold">Plazo de Presentación General</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Límite Domiciliación Bancaria</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">¿Permite Devolución en Cuenta?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">1T (Primer Trimestre)</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">Enero – Marzo</td>
                  <td className="py-3 px-4 font-bold">Del 1 al 20 de abril de 2026</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Hasta el 15 de abril</td>
                  <td className="py-3 px-4 font-sans text-slate-500">No (Solo a compensar)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">2T (Segundo Trimestre)</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">Abril – Junio</td>
                  <td className="py-3 px-4 font-bold">Del 1 al 20 de julio de 2026</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Hasta el 15 de julio</td>
                  <td className="py-3 px-4 font-sans text-slate-500">No (Solo a compensar)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">3T (Tercer Trimestre)</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">Julio – Septiembre</td>
                  <td className="py-3 px-4 font-bold">Del 1 al 20 de octubre de 2026</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Hasta el 15 de octubre</td>
                  <td className="py-3 px-4 font-sans text-slate-500">No (Solo a compensar)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-emerald-50/30">
                  <td className="py-3 px-4 font-bold font-sans text-emerald-950">4T (Cuarto Trimestre + Resumen 390)</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">Octubre – Diciembre</td>
                  <td className="py-3 px-4 font-bold text-emerald-800">Del 1 al 30 de enero de 2027</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Hasta el 25 de enero</td>
                  <td className="py-3 px-4 font-sans text-emerald-700 font-bold">Sí (Se puede pedir devolución)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: Si el día 20 coincide con sábado, domingo o festivo nacional, el plazo límite se traslada al primer día hábil inmediatamente posterior.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cómo Funciona el IVA: Tu Papel como Recaudador Tributario
            </h2>
            <p>
              El Impuesto sobre el Valor Añadido es un tributo indirecto sobre el consumo que recae en el cliente final. Los autónomos y empresas no son los pagadores del IVA, sino <strong>meros intermediarios o recaudadores</strong> que custodian ese dinero temporalmente para ingresarlo periódicamente en el Tesoro Público:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Landmark className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. IVA Repercutido (Tus Ventas)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Es el IVA que cobras a tus clientes por los productos vendidos o servicios prestados. Se calcula aplicando el porcentaje correspondiente sobre la base imponible:
                </p>
                <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                  <li><strong>21% (Tipo General):</strong> Servicios profesionales, informática, consultoría, hostelería y la mayoría de bienes.</li>
                  <li><strong>10% (Tipo Reducido):</strong> Transporte de viajeros, hostelería, viviendas de obra nueva, reformas y productos alimenticios básicos.</li>
                  <li><strong>4% (Tipo Superreducido):</strong> Pan, leche, huevos, medicamentos, libros y prensa.</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. IVA Soportado (Tus Compras Deducibles)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Es el IVA que abonas en las facturas de tus proveedores. Para que la Agencia Tributaria admita la deducción de ese IVA en el Modelo 303 (art. 95 LIVA), deben cumplirse tres condiciones:
                </p>
                <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                  <li>Estar directa y exclusivamente afecto a la actividad empresarial o profesional.</li>
                  <li>Disponer de <strong>factura completa con NIF de tu negocio</strong> (un ticket simplificado no da derecho a deducir el IVA).</li>
                  <li>Estar contabilizado y registrado en el Libro Registro de Facturas Recibidas.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¿Compensar o Solicitar Devolución del Saldo de IVA?
            </h2>
            <p>
              Cuando en un trimestre tus gastos e inversiones superan a tus ventas (por ejemplo, si has comprado maquinaria o equipos informáticos caros), el resultado de la casilla 71 del Modelo 303 resulta <strong>negativo</strong>:
            </p>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Opciones ante un Resultado Negativo:</p>
              <p>• <strong>Compensar (Casilla 72):</strong> Opción obligatoria en los trimestres 1T, 2T y 3T. Ese saldo a tu favor se guarda en tu ficha tributaria y se resta automáticamente de las liquidaciones de los trimestres siguientes en un plazo de hasta 4 años.</p>
              <p>• <strong>Devolución (Casilla 73):</strong> Solo se puede solicitar el ingreso de ese dinero en tu cuenta bancaria en la liquidación del <strong>4º trimestre (en enero)</strong>. Hacienda dispone de 6 meses desde el fin del plazo para ordenar la transferencia sin devengar intereses de demora.</p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre el IVA Trimestral (Modelo 303)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios oficiales fundados en la Ley 37/1992 y el Reglamento del IVA de la Agencia Tributaria.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué ocurre si no he facturado nada en el trimestre? ¿Debo presentar el modelo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí, obligatoriamente. Mientras estés dado de alta en el Censo de Empresarios y Profesionales (Modelo 036 o 037), estás legalmente obligado a presentar el Modelo 303 cada trimestre aunque no hayas emitido ni una sola factura. En ese caso, se presenta marcando la casilla de <strong>"Sin actividad"</strong>. No presentarlo conlleva una sanción fija de Hacienda de 200 euros por omisión de declaraciones censales.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo deducirme el IVA de la gasolina del coche?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El artículo 95 de la Ley del IVA contempla una <strong>presunción legal de afectación del 50%</strong> para turismos de uso mixto profesional y personal. Salvo que tu actividad sea el transporte de mercancías, taxi, autoescuela o representación comercial exclusiva (donde se deduce el 100%), la Agencia Tributaria te permite deducir exactamente el <strong>50% del IVA</strong> de la gasolina, reparaciones y peajes, siempre que dispongas de facturas completas.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué es el Régimen Especial del Criterio de Caja?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Es una modalidad optativa que permite a los autónomos y pymes <strong>retrasar el pago del IVA repercutido hasta el momento en que efectivamente cobran la factura</strong> de sus clientes, en lugar de abonarlo en la fecha de emisión. Sin embargo, también aplaza la deducción del IVA soportado en gastos hasta el momento en que se abonan al proveedor, y exige una gestión contable detallada.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué recargo aplica Hacienda si presento el Modelo 303 fuera de plazo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Si presentas el Modelo 303 con retraso de forma voluntaria antes de que Hacienda te envíe un requerimiento, se aplican los <strong>recargos por extemporaneidad del artículo 27 de la LGT</strong>: un 1% de recargo sobre la cuota a pagar más un 1% adicional por cada mes completo de retraso (si se abona en los 12 meses siguientes sin intereses de demora). Si Hacienda te requiere formalmente, se abre un procedimiento sancionador con multas del 50% al 150% de la cantidad adeudada.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué relación hay entre el Modelo 303 trimestral y el Modelo 390 anual?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El <strong>Modelo 390</strong> es la declaración informativa de resumen anual del IVA que se presenta obligatoriamente en enero junto al cuarto trimestre. En él no se paga ni se devuelve dinero; simplemente se desglosan y resumen todas las operaciones y bases imponibles declaradas a lo largo de los cuatro trimestres previos, debiendo cuadrar al céntimo con la suma de los cuatro Modelos 303.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas Fiscales y de Facturación Relacionadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Mantén el control absoluto de tus impuestos y obligaciones trimestrales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/generador-factura-pdf"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Facturas</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Generador Factura PDF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Emite facturas legales con desglose de IVA (21%, 10%, 4%) para tus clientes.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Crear factura</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-irpf-autonomos"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Modelo 130</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora IRPF Autónomos
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el pago fraccionado del 20% de IRPF que se presenta junto con el Modelo 303.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular Modelo 130</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/validador-iban-espana"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Domiciliación</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Validador IBAN España
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Verifica tu cuenta bancaria para domiciliar el pago del IVA antes del día 15 del mes.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Verificar cuenta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/validador-dni-nie-cif"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Censo Fiscal</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Validador DNI / CIF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba el NIF de tus proveedores para deducir válidamente el IVA de sus facturas.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Validar NIF</span>
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
              <strong>Ley 37/1992, de 28 de diciembre:</strong> Del Impuesto sobre el Valor Añadido (BOE núm. 312/1992), artículos 75 (devengo), 92 a 114 (derecho a la deducción) y 167 (liquidación).
            </li>
            <li>
              <strong>Orden EHA/3786/2008, de 29 de diciembre:</strong> Por la que se aprueban el Modelo 303 de autoliquidación del IVA y las condiciones de presentación telemática.
            </li>
            <li>
              <strong>Agencia Estatal de Administración Tributaria (AEAT):</strong> Instrucciones generales para la cumplimentación del Modelo 303 de Autoliquidación del IVA.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
