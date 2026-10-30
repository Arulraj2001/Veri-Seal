import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainDescuentosEngine } from '@/components/international/SpainDescuentosEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Tag, Percent, ShoppingBag } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Descuentos y Rebajas 2026 : Cuánto Ahorras | Kagazo',
  description:
    'Calcula gratis el precio final de cualquier producto con descuento y porcentaje adicional de rebaja en España. Descuentos dobles en cascada, ahorro en euros y normativa de precios de referencia de Consumo.',
  keywords: [
    'calculadora de descuentos y rebajas online espana',
    'calcular tanto por ciento de descuento precio final',
    'descuentos dobles acumulables rebajas en cascada',
    'cuanto me ahorro con el 20 30 50 por ciento de rebaja',
    'ley comercio minorista precio mas bajo 30 dias',
    'calcular descuento black friday rebajas verano enero',
    'formula matematica porcentaje descuento',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-descuentos-rebajas`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-descuentos-rebajas`,
      'es': `${SITE_URL}/es/calculadora-descuentos-rebajas`,
      'x-default': `${SITE_URL}/es/calculadora-descuentos-rebajas`,
    },
  },
  openGraph: {
    title: 'Calculadora de Descuentos y Rebajas 2026 : Cuánto Ahorras',
    description:
      'Calcula el precio final tras aplicar descuentos y conoce el ahorro exacto en euros al instante según la normativa española.',
    url: `${SITE_URL}/es/calculadora-descuentos-rebajas`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainDescuentosPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Descuentos y Rebajas Comerciales España',
        applicationCategory: 'ShoppingApplication',
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
          'Herramienta de cálculo comercial de descuentos individuales y acumulados para compras y promociones de temporada.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Rebajas y Descuentos Comerciales',
        category: 'DiscountCalculation',
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
            name: 'Utilidades y Consumo',
            item: `${SITE_URL}/es#utilidades-consumo`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Calculadora de Descuentos',
            item: `${SITE_URL}/es/calculadora-descuentos-rebajas`,
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
          <Link href="/es#utilidades-consumo" className="hover:text-slate-900 transition-colors">
            Utilidades y Consumo
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculadora de Descuentos</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ley 7/1996 de Comercio Minorista & Directiva Ómnibus (RDL 24/2021)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Descuentos y Rebajas : Cuánto Ahorras en Euros
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula al instante cuánto vas a pagar en caja tras aplicar cualquier porcentaje de rebaja (10%, 20%, 30%, 50%, 70%) y comprueba el ahorro exacto en euros. Soporta descuentos adicionales acumulables en cascada y garantiza el cumplimiento de la normativa de precios de referencia.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se calcula un descuento y una rebaja acumulada?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Para calcular el precio con descuento se multiplica el precio original por el porcentaje de descuento y se divide entre 100 para obtener el ahorro. Para un artículo de <strong>80 € con un 30% de descuento</strong>, el ahorro es de <strong>24 €</strong>, pagándose <strong>56 €</strong>. En descuentos dobles (ej. 50% + 20% adicional), el segundo porcentaje se aplica sobre el precio ya rebajado (50 € - 20% = 40 € finales, lo que equivale a un <strong>60% de descuento real</strong>, no al 70%).
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainDescuentosEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Precios Rebajados según Porcentaje de Descuento
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Cálculo inmediato de precio final a pagar y ahorro generado para importes habituales de compra.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Precio Original</th>
                  <th className="py-3.5 px-4 font-bold">Rebaja del 15%</th>
                  <th className="py-3.5 px-4 font-bold">Rebaja del 25%</th>
                  <th className="py-3.5 px-4 font-bold">Rebaja del 40%</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Mitad de Precio (50%)</th>
                  <th className="py-3.5 px-4 font-bold text-emerald-700">Doble Descuento (30% + 10%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">30,00 €</td>
                  <td className="py-3 px-4 text-slate-600">25,50 € (-4,50 €)</td>
                  <td className="py-3 px-4 text-slate-600">22,50 € (-7,50 €)</td>
                  <td className="py-3 px-4 text-slate-600">18,00 € (-12,00 €)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">15,00 € (-15,00 €)</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">18,90 € (-11,10 €)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">50,00 €</td>
                  <td className="py-3 px-4 text-slate-600">42,50 € (-7,50 €)</td>
                  <td className="py-3 px-4 text-slate-600">37,50 € (-12,50 €)</td>
                  <td className="py-3 px-4 text-slate-600">30,00 € (-20,00 €)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">25,00 € (-25,00 €)</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">31,50 € (-18,50 €)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">80,00 € (Moda Media)</td>
                  <td className="py-3 px-4 text-slate-600">68,00 € (-12,00 €)</td>
                  <td className="py-3 px-4 text-slate-600">60,00 € (-20,00 €)</td>
                  <td className="py-3 px-4 text-slate-600">48,00 € (-32,00 €)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">40,00 € (-40,00 €)</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">50,40 € (-29,60 €)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">120,00 €</td>
                  <td className="py-3 px-4 text-slate-600">102,00 € (-18,00 €)</td>
                  <td className="py-3 px-4 text-slate-600">90,00 € (-30,00 €)</td>
                  <td className="py-3 px-4 text-slate-600">72,00 € (-48,00 €)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">60,00 € (-60,00 €)</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">75,60 € (-44,40 €)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">200,00 €</td>
                  <td className="py-3 px-4 text-slate-600">170,00 € (-30,00 €)</td>
                  <td className="py-3 px-4 text-slate-600">150,00 € (-50,00 €)</td>
                  <td className="py-3 px-4 text-slate-600">120,00 € (-80,00 €)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">100,00 € (-100,00 €)</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">126,00 € (-74,00 €)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              La Regla del Precio Anterior en la Normativa de Consumo Española
            </h2>
            <p>
              Con la transposición de la Directiva Ómnibus europea a través del <strong>Real Decreto-ley 24/2021</strong>, que reformó la Ley de Consumidores y Usuarios y la Ley de Ordenación del Comercio Minorista, se blindaron los derechos del consumidor frente a promociones engañosas:
            </p>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                La Obligación Legal de los 30 Días Previos:
              </p>
              <p>
                En cualquier oferta comercial donde se anuncie una reducción de precio (como en las rebajas de enero, julio o Black Friday), <strong>el comerciante está obligado por ley a mostrar el precio anterior más bajo que hubiese sido aplicado a ese producto durante al menos los 30 días anteriores</strong>.
              </p>
              <p>
                Esta prohibición impide la práctica fraudulenta de subir artificialmente los precios los días previos para simular un descuento que en realidad no existe.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <ShoppingBag className="w-5 h-5 text-orange-600 shrink-0" />
                <h3>Garantía Legal Obligatoria de 3 Años</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprar un producto con descuento o en periodo de rebajas <strong>no merma en ningún caso los derechos de garantía legal</strong>. Todo producto nuevo adquirido en España dispone de una garantía obligatoria de <strong>3 años</strong> por ley. Si el producto presenta una tara o defecto de fábrica, el comerciante está obligado a repararlo, sustituirlo o devolver el dinero íntegro.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3>Derecho de Desistimiento en Compras Online (14 Días)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                En compras realizadas por internet (comercio electrónico), el consumidor tiene derecho a devolver el producto sin alegar ningún motivo durante los <strong>14 días naturales siguientes a la recepción</strong> del paquete en su domicilio, teniendo el vendedor la obligación de reembolsar el importe íntegro abonado incluyendo los gastos de envío ordinarios.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre Descuentos, Rebajas y Derechos del Consumidor
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales fundadas en la legislación del Ministerio de Derechos Sociales y Consumo.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Una tienda física está obligada a devolver el dinero si el producto no me gusta?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En las tiendas físicas tradicionales, la ley solo obliga a devolver el dinero si el producto presenta un defecto o falta de conformidad. Si el producto está en perfecto estado y simplemente no te gusta o te equivocaste de talla, la tienda no está obligada por ley a devolver el dinero salvo que en su política comercial lo prometa expresamente (pudiendo ofrecer en su lugar un vale de tienda o cambio de talla).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Pueden cobrar un recargo por pagar con tarjeta durante las rebajas?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Está <strong>estrictamente prohibido por la normativa europea y española</strong> cobrar cualquier tipo de comisión o recargo adicional por pagar con tarjeta bancaria de crédito o débito, tanto en periodos de rebajas como en temporada ordinaria. Si el comercio acepta pagos con tarjeta, debe aplicarse exactamente el mismo precio que en efectivo.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Los productos en rebajas pueden ser saldos o restos defectuosos?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No. La Ley de Comercio Minorista distingue claramente entre <strong>rebajas</strong> (productos de la temporada habitual que se venden a precio reducido sin taras) y <strong>saldos</strong> (artículos deteriorados, defectuosos o descatalogados). Vender un producto defectuoso bajo el reclamo de rebaja ordinaria constituye una infracción comercial grave.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué significa la promoción de 3x2 o la segunda unidad al 50%?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En una promoción de <strong>3x2</strong> (llevas 3 y pagas 2), el descuento real efectivo sobre la compra total es del <strong>33,33%</strong>. En la promoción de la <strong>segunda unidad al 50%</strong> (llevas dos unidades de igual precio y a la segunda se le aplica la mitad), el descuento real global sobre el importe de ambos productos es de exactamente el <strong>25%</strong>.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo puedo reclamar si una tienda no respeta el precio etiquetado en rebajas?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Si un producto tiene marcado en la etiqueta o en la estantería un precio rebajado y en caja pretenden cobrarte un importe superior, la ley te ampara y <strong>tienes derecho a exigir que te cobren el precio más bajo marcado</strong>. Si se niegan, solicita inmediatamente la Hoja Oficial de Reclamaciones de la comunidad autónoma o acude a la Oficina Municipal de Información al Consumidor (OMIC).
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas de Consumo, Movilidad y Finanzas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Controla tus presupuestos de gasto diario y deducciones fiscales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/calculadora-precio-gasolina-viaje"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Movilidad</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Coste Gasolina y Viaje
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el consumo de carburante y divide los gastos de carretera entre pasajeros.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular viaje</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/contador-palabras-caracteres"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Redacción</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Contador de Palabras
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Analiza caracteres, párrafos y tiempo de lectura en textos y publicaciones en vivo.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Contar texto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-iva-trimestral"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Impuestos</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora IVA Trimestral
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula la liquidación del Modelo 303 restando el IVA de tus gastos deducibles.
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
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Nómina</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba tu sueldo limpio al mes para planificar tu capacidad de ahorro y compras.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver sueldo</span>
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
              <strong>Ley 7/1996, de 15 de enero:</strong> De Ordenación del Comercio Minorista (artículos 18 a 26: regulación de rebajas, promociones y saldos).
            </li>
            <li>
              <strong>Real Decreto-ley 24/2021, de 2 de noviembre:</strong> Transposición de la Directiva Ómnibus (UE) 2019/2161 sobre protección de los consumidores y precios anteriores en reducciones de precio.
            </li>
            <li>
              <strong>Real Decreto Legislativo 1/2007:</strong> Texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios (garantía de 3 años y derecho de desistimiento de 14 días).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
