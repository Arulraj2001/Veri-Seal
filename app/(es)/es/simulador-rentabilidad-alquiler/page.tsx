import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainRentabilidadEngine } from '@/components/international/SpainRentabilidadEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Home, Landmark, TrendingUp } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simulador Rentabilidad Alquiler 2026 : Cálculo Bruto y Neto | Kagazo',
  description:
    'Calcula la rentabilidad bruta y neta real de tu inversión en vivienda de alquiler en España. Descuenta IBI, comunidad, seguros, tasa de vacancia e impuestos con la reducción del 50% en IRPF.',
  keywords: [
    'simulador rentabilidad alquiler espana 2026',
    'calcular rentabilidad neta piso alquiler',
    'formula rentabilidad bruta vivienda yield',
    'gastos deducibles irpf alquiler vivienda habitual',
    'reduccion 50 por ciento irpf alquiler ley vivienda',
    'amortizacion 3 por ciento inmueble hacienda',
    'cash on cash return roe inversion inmobiliaria',
    'seguro de impago alquiler gasto deducible',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
    languages: {
      'es-ES': `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
      'es': `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
      'x-default': `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
    },
  },
  openGraph: {
    title: 'Simulador Rentabilidad Alquiler 2026 : Cálculo Bruto y Neto',
    description:
      'Calcula al detalle la rentabilidad real de tu inversión inmobiliaria en España tras descontar gastos operativos e IRPF.',
    url: `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainRentabilidadPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Simulador de Rentabilidad de Alquiler Inmobiliario España 2026',
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
          'Herramienta de análisis financiero para calcular el rendimiento bruto y neto de activos inmobiliarios destinados al arrendamiento conforme al IRPF y Ley de Vivienda.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Rentabilidad y Yield Inmobiliario',
        category: 'RealEstateInvestmentCalculation',
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
            name: 'Rentabilidad de Alquiler',
            item: `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
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
          <span className="text-slate-900 font-bold">Rentabilidad de Alquiler</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fiscalidad IRPF (Artículo 23.2 LIRPF) & Ley 12/2023 de Vivienda</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simulador de Rentabilidad de Alquiler 2026 : Yield Bruto y Neto
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula la rentabilidad real de comprar una vivienda para alquilar en España. Suma los costes de adquisición con impuestos (ITP o IVA), notaría y reformas; deduce los gastos operativos recurrentes (IBI, comunidad, seguros y vacancia) y calcula tu beneficio neto final tras la reducción fiscal del IRPF.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se calcula la rentabilidad neta de un piso en alquiler?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Para una vivienda comprada por <strong>180.000 € (con 20.000 € de gastos e ITP: inversión total 200.000 €)</strong> alquilada a <strong>900 €/mes (10.800 € brutos/año)</strong>, la <strong>rentabilidad bruta es del 5,40%</strong>. Al restar gastos anuales (450 € IBI, 600 € comunidad, 250 € seguro, 500 € mantenimiento y 1 mes de vacancia), el beneficio operativo es de 8.100 €, arrojando una <strong>rentabilidad neta real del 4,05%</strong> antes de impuestos.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainRentabilidadEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla Comparativa de Rentabilidad según Renta y Precio de Compra
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Proyección de rentabilidades medias incorporando un 10% de costes de adquisición (ITP + Notaría) y gastos operativos del 20% sobre ingresos.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Inversión Total (con Gastos)</th>
                  <th className="py-3.5 px-4 font-bold">Renta Mensual Estimada</th>
                  <th className="py-3.5 px-4 font-bold">Ingreso Bruto Anual</th>
                  <th className="py-3.5 px-4 font-bold">Yield Bruto</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Yield Neto Real</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Neto Anual en Banco</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">130.000 €</td>
                  <td className="py-3 px-4 text-slate-600">650 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">7.800 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">6,00 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">4,65 %</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">6.045 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">175.000 €</td>
                  <td className="py-3 px-4 text-slate-600">800 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">9.600 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">5,48 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">4,25 %</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">7.440 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">220.000 € (Media Ciudades)</td>
                  <td className="py-3 px-4 text-slate-600">950 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">11.400 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">5,18 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">4,01 %</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">8.835 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">280.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.200 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">14.400 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">5,14 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">3,98 %</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">11.160 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">350.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.450 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">17.400 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">4,97 %</td>
                  <td className="py-3 px-4 font-bold text-orange-600">3,85 %</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">13.485 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: El rendimiento neto en banco no contempla el pago de cuotas hipotecarias (que depende del apalancamiento elegido por el inversor) ni la retención del IRPF personal.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Diferencia entre Rentabilidad Bruta, Neta y ROE Inmobiliario
            </h2>
            <p>
              Evaluar una inversión inmobiliaria con rigor profesional exige no dejarse engañar por la rentabilidad bruta que anuncian los portales inmobiliarios:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <TrendingUp className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. Rentabilidad Bruta</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Es el cociente básico entre los ingresos anuales íntegros por alquiler y el precio facial de compra. No tiene en cuenta los impuestos de escrituración ni los costes operativos recurrentes.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. Rentabilidad Neta Real</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Descuenta todos los gastos fijos (IBI, cuotas de comunidad ordinarias, seguros, derramas habituales, mantenimiento y 1 mes de vacancia) y divide entre el <strong>desembolso real total</strong> (precio + ITP/IVA + notaría + reformas).
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Landmark className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>3. ROE (Apalancamiento)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  El <em>Cash-on-Cash Return</em> mide el retorno exclusivamente sobre el capital propio aportado de tu bolsillo (la entrada del 20% y los gastos), financiando el 80% restante con hipoteca bancaria para maximizar la rentabilidad de tus ahorros.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Fiscalidad en el IRPF: Reducción del 50% y Gastos Deducibles
            </h2>
            <p>
              Los ingresos del alquiler tributan en el IRPF como <strong>Rendimientos del Capital Inmobiliario</strong>. La legislación española (Ley 35/2006) otorga un tratamiento fiscal muy ventajoso a los propietarios de vivienda habitual:
            </p>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Gastos Deducibles en la Renta:</p>
              <p>• <strong>Intereses bancarios:</strong> Intereses satisfechos de la hipoteca destinada a la compra.</p>
              <p>• <strong>Tributos y tasas locales:</strong> Recibo anual del IBI y tasa municipal de basuras.</p>
              <p>• <strong>Gastos de comunidad y seguros:</strong> Cuotas de comunidad y pólizas de hogar e impago de alquiler.</p>
              <p>• <strong>Amortización del inmueble:</strong> El 3% del mayor valor entre el valor catastral de la construcción o el coste de compra de la construcción (excluyendo el suelo).</p>
              <p className="text-slate-600 font-sans text-xs pt-1">
                Sobre el rendimiento neto positivo resultante se aplica la <strong>reducción del 50%</strong> (art. 23.2 LIRPF), por lo que solo se tributa en IRPF por la mitad de la ganancia real neta obtenida.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre Inversión y Rentabilidad de Alquiler
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios financieros y tributarios oficiales para propietarios e inversores en España.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué rentabilidad neta se considera atractiva en el mercado inmobiliario español?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En las grandes urbes como Madrid o Barcelona, una rentabilidad neta real de entre el <strong>3,5% y el 4,5%</strong> se considera excelente debido a la altísima liquidez y la fuerte revalorización del suelo a largo plazo. En ciudades medianas, capitales secundarias o áreas periféricas, los inversores suelen exigir rentabilidades netas de entre el <strong>5,5% y el 7,5%</strong> para compensar un mayor riesgo de vacancia o menor apreciación del inmueble.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo funciona la deducción por amortización del 3% en Hacienda?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La amortización es uno de los mayores escudos fiscales del inversor inmobiliario. Hacienda permite restar cada año en la declaración de la renta el <strong>3% del valor de la construcción</strong> (calculado sobre el coste de compra o el valor catastral, el que sea mayor). Si la construcción de un piso costó 150.000 €, puedes deducirte 4.500 € al año en concepto de deterioro fiscal, reduciendo drásticamente la factura de IRPF.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Compensa contratar un seguro de impago de alquiler?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Totalmente. El seguro de impago de alquiler suele costar entre el <strong>3% y el 4,5% de la renta anual</strong> (unos 350 € - 500 €/año). Garantiza el cobro de hasta 12 meses de impago, cubre los costes de abogados y procuradores en caso de desahucio y cubre hasta 3.000 € por daños por vandalismo. Además, su prima es <strong>100% deducible en el IRPF</strong> del propietario.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Se aplica la reducción del 50% al alquiler vacacional o por habitaciones?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No. El artículo 23.2 de la LIRPF reserva expresamente la reducción fiscal del 50% para los arrendamientos destinados a <strong>vivienda habitual y permanente</strong> del inquilino (regulados por la LAU). Los alquileres turísticos, vacacionales, por temporadas cortas de estudiantes o por habitaciones independientes no tienen derecho a esta bonificación y tributan al 100% por su rendimiento neto.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué porcentaje de vacancia es prudente estimar en el plan de inversión?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Lo recomendado por los analistas financieros inmobiliarios es provisionar siempre <strong>1 mes de vacancia cada 18 o 24 meses</strong> (aproximadamente un 5% a 8% de los ingresos anuales). Este colchón cubre el tiempo necesario para pintar, reparar y seleccionar a un nuevo inquilino solvente entre la salida del anterior y la nueva firma.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas Inmobiliarias y Financieras Relacionadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Optimiza tu estrategia patrimonial con nuestras herramientas oficiales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/actualizador-alquiler-ipc"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Rentas</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Actualizador Alquiler IPC
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula la actualización anual con el tope legal del 3% según la Ley de Vivienda.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Actualizar alquiler</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-hipoteca-euribor"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Apalancamiento</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora de Hipotecas
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Simula la cuota hipotecaria mensual para calcular tu Cash-flow neto cada mes.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular cuota</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-itp-gastos-compraventa"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Inversión Inicial</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Gastos e ITP Compraventa
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el ITP autonómico y aranceles notariales para conocer el coste total del activo.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular ITP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-plusvalia-municipal"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Estrategia de Salida</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Plusvalía Municipal
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el tributo local al vender el inmueble tras varios años de explotación.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular plusvalía</span>
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
              <strong>Ley 35/2006, de 28 de noviembre:</strong> Del Impuesto sobre la Renta de las Personas Físicas (artículo 23: Determinación del rendimiento neto del capital inmobiliario y reducciones).
            </li>
            <li>
              <strong>Ley 12/2023, de 24 de mayo:</strong> Por el derecho a la vivienda (modificaciones en incentivos fiscales y deducciones del IRPF para arrendamientos de vivienda habitual).
            </li>
            <li>
              <strong>Ley 29/1994:</strong> De Arrendamientos Urbanos (derechos y obligaciones en contratos de arrendamiento).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
