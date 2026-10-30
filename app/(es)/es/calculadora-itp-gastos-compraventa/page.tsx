import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainItpEngine } from '@/components/international/SpainItpEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Home, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora ITP y Gastos Compraventa 2026 : 17 CC.AA. | Kagazo',
  description:
    'Calcula los gastos de notaría, registro de la propiedad e impuestos (ITP o IVA y AJD) al comprar vivienda en España en 2026. Tabla oficial de tipos de las 17 comunidades autónomas.',
  keywords: [
    'calculadora itp espana 2026',
    'gastos compraventa vivienda segunda mano',
    'tabla itp por comunidades autonomas 2026',
    'cuanto cuesta notario y registro comprar piso',
    'iva obra nueva ajd calcular',
    'valor de referencia catastro itp comprobacion',
    'bonificacion itp menores 35 anos vivienda habitual',
    'modelo 600 plazo presentacion transmisiones patrimoniales',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
      'es': `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
      'x-default': `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
    },
  },
  openGraph: {
    title: 'Calculadora ITP y Gastos Compraventa 2026 : 17 CC.AA.',
    description:
      'Calcula al detalle todos los impuestos autonómicos (ITP / IVA) y aranceles notariales y registrales al comprar casa en España.',
    url: `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainItpPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Gastos e Impuestos Compraventa Inmobiliaria España 2026',
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
          'Simulador tributario oficial del Impuesto sobre Transmisiones Patrimoniales (ITP), IVA, AJD y aranceles notariales y registrales en las 17 comunidades autónomas.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Impuestos y Costes de Adquisición Inmobiliaria',
        category: 'RealEstateTaxCalculation',
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
            name: 'Gastos e ITP Compraventa',
            item: `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
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
          <span className="text-slate-900 font-bold">Gastos e ITP Compraventa</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ley del ITP y AJD • Aranceles Oficiales RD 1426/1989 y RD 1427/1989</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora ITP y Gastos de Compraventa de Vivienda 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula los costes totales adicionales al precio de escrituración al comprar un inmueble en España: Impuesto de Transmisiones Patrimoniales (ITP) o IVA con Actos Jurídicos Documentados (AJD), aranceles de notaría, registro de la propiedad y gastos de gestoría por comunidad autónoma.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cuánto dinero se añade en gastos al comprar casa?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Al comprar una vivienda en España debes calcular entre un <strong>8% y un 12% adicional sobre el precio escriturado</strong>. En un piso de <strong>200.000 € de segunda mano</strong>, el ITP supone entre <strong>12.000 € (6% en Madrid)</strong> y <strong>20.000 € (10% en Cataluña o C. Valenciana)</strong>. A ello se suman unos <strong>800 € de notario</strong>, <strong>450 € de registro de la propiedad</strong> y <strong>350 € de gestoría</strong>, totalizando entre 13.600 € y 21.600 € de gastos.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainItpEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla Comparativa de ITP General por Comunidades Autónomas (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Simulación de impuestos y gastos de escrituración para una vivienda usada de 200.000 € escriturada.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Comunidad Autónoma</th>
                  <th className="py-3.5 px-4 font-bold">Tipo General ITP</th>
                  <th className="py-3.5 px-4 font-bold">ITP en 200.000 €</th>
                  <th className="py-3.5 px-4 font-bold">Notaría y Registro</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Coste Total Gastos</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Total Necesario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50 bg-emerald-50/30">
                  <td className="py-3 px-4 font-bold font-sans">País Vasco</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">4,0 % (Vivienda habitual)</td>
                  <td className="py-3 px-4 text-slate-900">8.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.250 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">9.250 € (4,6%)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">209.250 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Comunidad de Madrid</td>
                  <td className="py-3 px-4 font-bold text-blue-700">6,0 %</td>
                  <td className="py-3 px-4 text-slate-900">12.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.250 €</td>
                  <td className="py-3 px-4 font-bold text-blue-700">13.250 € (6,6%)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">213.250 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Andalucía</td>
                  <td className="py-3 px-4 text-slate-800">7,0 %</td>
                  <td className="py-3 px-4 text-slate-900">14.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.250 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">15.250 € (7,6%)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">215.250 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Castilla y León / Galicia</td>
                  <td className="py-3 px-4 text-slate-800">8,0 %</td>
                  <td className="py-3 px-4 text-slate-900">16.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.250 €</td>
                  <td className="py-3 px-4 font-bold text-orange-600">17.250 € (8,6%)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">217.250 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">Cataluña / C. Valenciana / Baleares</td>
                  <td className="py-3 px-4 font-bold text-red-700">10,0 %</td>
                  <td className="py-3 px-4 text-slate-900">20.000 €</td>
                  <td className="py-3 px-4 text-slate-600">1.250 €</td>
                  <td className="py-3 px-4 font-bold text-red-700">21.250 € (10,6%)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">221.250 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: La mayoría de comunidades aplican tipos reducidos (entre el 3% y el 5%) para jóvenes menores de 35 o 36 años, compradores con discapacidad o adquisición de viviendas de protección pública.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Diferencia Fiscal: Vivienda de Segunda Mano vs Obra Nueva
            </h2>
            <p>
              El régimen fiscal de la compra de una casa en España varía radicalmente en función de si se adquiere de segunda mano a un particular o si se trata de una vivienda nueva comprada directamente al promotor inmobiliario:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Home className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. Vivienda Usada (Segunda Mano) : ITP</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Tributa por el <strong>Impuesto sobre Transmisiones Patrimoniales Onerosas (ITP)</strong>. Es un tributo cedido íntegramente a las comunidades autónomas:
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                  <li><strong>Tipos generales:</strong> Oscilan entre el 4% (País Vasco) y el 10% (Cataluña, Galicia en tramos altos, Cantabria, Valencia).</li>
                  <li><strong>Plazo y liquidación:</strong> Se abona a la hacienda autonómica mediante el <strong>Modelo 600 en el plazo de 30 días hábiles</strong> desde la firma de la escritura ante notario.</li>
                  <li><strong>Exención de AJD:</strong> La compra por ITP está exenta del impuesto de Actos Jurídicos Documentados por incompatibilidad de tributos.</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Landmark className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. Vivienda Nueva (Obra Nueva) : IVA + AJD</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Tributa conjuntamente por dos impuestos estatales y autonómicos:
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                  <li><strong>IVA del 10%:</strong> Tipo reducido estatal general para viviendas nuevas (se reduce al 4% en el caso de Viviendas de Protección Oficial de régimen especial o promoción pública). Se abona directamente al promotor en factura.</li>
                  <li><strong>AJD (Actos Jurídicos Documentados):</strong> Cuota gradual autonómica por la documentación notarial, que oscila entre el <strong>0,5% y el 1,5%</strong> según la comunidad donde radique el inmueble.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Aranceles Notariales y Registrales: ¿Por qué están fijados por ley?
            </h2>
            <p>
              Tanto los notarios como los registradores de la propiedad son funcionarios públicos y aplican tarifas arancelarias <strong>estrictamente reguladas por el Gobierno de España</strong> (Real Decreto 1426/1989 y Real Decreto 1427/1989). Ningún notario puede cobrarte más de lo que marca la ley por una escritura pública de compraventa.
            </p>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Baremos Arancelarios Oficiales:</p>
              <p>• <strong>Escritura de Notaría:</strong> Escala regresiva sobre el valor escriturado. Para un inmueble de 200.000 €, el arancel notarial base ronda los 650 € - 850 € (más IVA y coste de folios timbrados).</p>
              <p>• <strong>Inscripción en el Registro de la Propiedad:</strong> Arancel por la inscripción registral de la titularidad del inmueble. Para 200.000 € ronda los 400 € - 550 €.</p>
              <p>• <strong>Gestoría:</strong> A diferencia del notario y registrador, la gestoría no tiene arancel regulado; sus tarifas son de libre mercado (habitualmente entre 300 € y 500 €).</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
            <p className="font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              Cuidado con el Valor de Referencia del Catastro:
            </p>
            <p>
              Desde la Ley 11/2021 de medidas contra el fraude fiscal, la base imponible del ITP ya no es el precio pactado entre comprador y vendedor, sino <strong>el mayor entre el precio escriturado y el Valor de Referencia oficial fijado por la Dirección General del Catastro</strong>. Si compras un piso por 180.000 € pero su valor de referencia catastral es de 210.000 €, deberás liquidar el ITP sobre los 210.000 €; de lo contrario, Hacienda te enviará una liquidación complementaria con recargo e intereses.
            </p>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre Impuestos y Gastos de Compraventa
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales fundadas en la legislación tributaria y los aranceles vigentes en España.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué bonificaciones de ITP existen para menores de 35 años?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La mayoría de comunidades autónomas aplican tipos de ITP muy reducidos para incentivar la compra de primera vivienda por jóvenes (generalmente menores de 35 o 36 años). Por ejemplo, en <strong>Andalucía el ITP baja al 3,5%</strong> (para inmuebles de hasta 150.000 €); en <strong>Madrid al 4,8%</strong> (o deducciones en cuota); en <strong>Galicia al 3%</strong> y en la <strong>Comunidad Valenciana al 6%</strong> (para rentas anuales inferiores a los límites fijados por la normativa autonómica).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Quién paga los gastos de notaría y registro según el Código Civil?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El artículo 1455 del Código Civil establece que los gastos de otorgamiento de la escritura matriz corresponden al vendedor y los de la primera copia al comprador. Sin embargo, en el 98% de las operaciones inmobiliarias en España se pacta expresamente en el contrato de arras que <strong>todos los gastos de notaría, registro e ITP corren íntegramente por cuenta del comprador</strong>, asumiendo el vendedor únicamente el pago de la plusvalía municipal (IIVTNU).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué plazo tengo para pagar el ITP tras firmar ante notario?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El plazo legal es de exactamente <strong>30 días hábiles</strong> contados a partir del día siguiente a la fecha de firma de la escritura de compraventa. Presentar el Modelo 600 fuera de plazo acarrea recargos tributarios que van desde el 1% más un 1% adicional por cada mes de retraso si se abona voluntariamente sin requerimiento previo.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo recurrir el Valor de Referencia si el piso necesita reforma integral?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. Para recurrir el Valor de Referencia del Catastro, el procedimiento legal exige primero autoliquidar el ITP por el valor de referencia catastral y, de forma inmediata, solicitar la <strong>rectificación de la autoliquidación y la devolución de ingresos indebidos</strong> ante la consejería de hacienda autonómica, aportando como prueba pericial un informe de tasación homologado o dictamen técnico con fotografías que acredite el estado de ruina, obsolescencia o reforma integral del piso.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué pasa con la plusvalía municipal? ¿Quién debe pagarla?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La plusvalía municipal (IIVTNU) es un impuesto local que grava el incremento de valor del suelo y <strong>corresponde legalmente pagarla al vendedor</strong> de la vivienda. Cualquier pacto que obligue al comprador a pagar la plusvalía se considera nulo ante la Administración tributaria local, que siempre exigirá la deuda al sujeto pasivo legal (el vendedor).
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
              Completa tu simulación inmobiliaria con nuestras calculadoras financieras verificadas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/calculadora-hipoteca-euribor"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Financiación</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora de Hipotecas
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula la cuota mensual de tu hipoteca y el cuadro de amortización francés a 25 o 30 años.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular cuota</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-plusvalia-municipal"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Vendedor</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Plusvalía Municipal
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el tributo local del ayuntamiento mediante el método real u objetivo.
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
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Inversores</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Rentabilidad Alquiler
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Incorpora el coste total de ITP y notaría para calcular el yield neto real de tu inmueble.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular yield</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/actualizador-alquiler-ipc"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Arrendamientos</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Actualizador Alquiler IPC
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula la actualización legal de la renta de alquiler conforme a la Ley de Vivienda.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Actualizar renta</span>
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
              <strong>Real Decreto Legislativo 1/1993, de 24 de septiembre:</strong> Texto refundido de la Ley del Impuesto sobre Transmisiones Patrimoniales y Actos Jurídicos Documentados (BOE núm. 251/1993).
            </li>
            <li>
              <strong>Real Decreto 1426/1989 y Real Decreto 1427/1989:</strong> Aranceles de los Notarios y de los Registradores de la Propiedad en España.
            </li>
            <li>
              <strong>Ley 11/2021, de 9 de julio:</strong> Medidas de prevención y lucha contra el fraude fiscal (implantación del Valor de Referencia del Catastro Inmobiliario).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
