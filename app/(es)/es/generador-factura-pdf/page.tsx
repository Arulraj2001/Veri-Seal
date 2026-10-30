import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainInvoiceEngine } from '@/components/international/SpainInvoiceEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Download, Printer } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Generador de Facturas Gratis en PDF 2026 : Autónomos y Pymes | Kagazo',
  description:
    'Crea y descarga gratis tus facturas profesionales en PDF para España. Conforme al RD 1619/2012 y Ley Crea y Crece con cálculo automático de IVA (21%, 10%, 4%) y retención de IRPF (15% o 7%).',
  keywords: [
    'generador facturas gratis pdf 2026',
    'crear factura autonomo online descargar pdf',
    'plantilla factura irpf 15 y 7 por ciento',
    'modelo factura profesional agencia tributaria',
    'hacer factura sin registro sin marca de agua',
    'datos obligatorios factura rd 1619 2012',
    'factura intracomunitaria iva roi vies',
    'factura rectificativa como emitir hacienda',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/generador-factura-pdf`,
    languages: HREFLANG_REGISTRY.invoice_generator.locales,
  },
  openGraph: {
    title: 'Generador de Facturas Gratis en PDF 2026 : Autónomos y Pymes',
    description:
      'Emite y descarga facturas oficiales en PDF para autónomos y empresas en España con cálculo automático de IVA e IRPF y descarga instantánea.',
    url: `${SITE_URL}/es/generador-factura-pdf`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainInvoicePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Generador de Facturas Gratis en PDF para España',
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
          'Herramienta gratuita para emitir facturas en formato PDF válidas ante la Agencia Tributaria en España con desglose de IVA (21%, 10%, 4%) y retención de IRPF.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Facturación Profesional para Autónomos y Sociedades',
        category: 'InvoicingService',
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
            name: 'Trámites e Identidad',
            item: `${SITE_URL}/es#tramites-identidad`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Generador de Facturas PDF',
            item: `${SITE_URL}/es/generador-factura-pdf`,
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
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium print:hidden">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/es#tramites-identidad" className="hover:text-slate-900 transition-colors">
            Trámites e Identidad
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Generador de Facturas PDF</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reglamento de Facturación RD 1619/2012 & Ley Crea y Crece 18/2022</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Generador de Facturas Gratis en PDF para España (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Emite facturas comerciales y profesionales con validez jurídica ante la Agencia Tributaria. Desglose automático de IVA (21%, 10%, 4%), retención de IRPF (15% o 7%), series correlativas y descarga directa en PDF vectorial sin marcas de agua ni registro previo.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2 print:hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Qué datos obligatorios debe tener una factura legal en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Conforme al Real Decreto 1619/2012, toda factura válida debe incorporar: <strong>número y serie correlativa</strong>, <strong>fecha de emisión</strong>, <strong>datos fiscales completos (nombre/razón social, NIF/CIF y domicilio)</strong> del emisor y del receptor, descripción de conceptos, <strong>base imponible</strong>, <strong>tipo de IVA aplicado</strong> y, si el emisor es autónomo profesional facturando a empresas o autónomos, la <strong>retención de IRPF del 15% o 7%</strong>.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainInvoiceEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 print:hidden">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla Comparativa de Liquidación según Tipo de Cliente y Retención
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Desglose fiscal exacto para servicios profesionales habituales con IVA general al 21%.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Base Imponible</th>
                  <th className="py-3.5 px-4 font-bold">IVA Repercutido (21%)</th>
                  <th className="py-3.5 px-4 font-bold">Perfil del Cliente</th>
                  <th className="py-3.5 px-4 font-bold">Retención IRPF</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Total a Cobrar en Factura</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600">Ingreso Líquido en Banco</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">500,00 €</td>
                  <td className="py-3 px-4 text-slate-600">+105,00 €</td>
                  <td className="py-3 px-4 font-sans text-slate-700">Empresa (Autónomo General)</td>
                  <td className="py-3 px-4 font-bold text-red-600">-75,00 € (-15%)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">530,00 €</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">530,00 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">1.000,00 €</td>
                  <td className="py-3 px-4 text-slate-600">+210,00 €</td>
                  <td className="py-3 px-4 font-sans text-slate-700">Empresa (Nuevo Autónomo)</td>
                  <td className="py-3 px-4 font-bold text-red-600">-70,00 € (-7%)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">1.140,00 €</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">1.140,00 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">1.500,00 € (Media Servicios)</td>
                  <td className="py-3 px-4 text-slate-600">+315,00 €</td>
                  <td className="py-3 px-4 font-sans text-slate-700">Empresa Española (15% IRPF)</td>
                  <td className="py-3 px-4 font-bold text-red-600">-225,00 € (-15%)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">1.590,00 €</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">1.590,00 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">1.500,00 €</td>
                  <td className="py-3 px-4 text-slate-600">+315,00 €</td>
                  <td className="py-3 px-4 font-sans text-slate-700">Particular (B2C)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">0 € (Sin retención)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">1.815,00 €</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">1.815,00 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">2.500,00 €</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">0 € (Inversión Sujeto Pasivo)</td>
                  <td className="py-3 px-4 font-sans text-slate-700">Empresa Unión Europea (ROI/VIES)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">0 € (Sin retención)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">2.500,00 €</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">2.500,00 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: Las retenciones practicadas por tus clientes españoles son pagos a cuenta de tu IRPF que la empresa pagadora ingresa a tu nombre en Hacienda mediante el Modelo 111 trimestral.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base print:hidden">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Requisitos Legales Indispensables de una Factura en España
            </h2>
            <p>
              El <strong>Real Decreto 1619/2012</strong> regula minuciosamente la expedición de facturas. Emitir un documento sin los requisitos formales tipificados acarrea la no deducibilidad del gasto para el cliente y posibles sanciones tributarias de la Agencia Estatal de Administración Tributaria (AEAT):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <FileText className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. Identificación y Numeración</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong>Número y Serie:</strong> Numeración correlativa continua en orden cronológico ascendente. Pueden abrirse series independientes para establecimientos distintos, tipos de operaciones o facturas rectificativas.</li>
                  <li><strong>Fecha de Expedición y Devengo:</strong> Debe constar la fecha en que se expide y la fecha en que se realizaron las operaciones si difiere de la de emisión.</li>
                  <li><strong>NIF y Domicilio:</strong> Nombre completo, razón social, NIF o CIF y domicilio fiscal tanto del expedidor como del destinatario.</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Calculator className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. Desglose Tributario Exacto</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong>Descripción de Operaciones:</strong> Identificación clara de los servicios prestados o mercancías suministradas, precio unitario sin impuestos y descuentos aplicados.</li>
                  <li><strong>Tipos de IVA:</strong> Base imponible desglosada por cada tipo impositivo aplicable (21% general, 10% reducido o 4% superreducido).</li>
                  <li><strong>Retención de IRPF:</strong> En actividades profesionales (epígrafe Sección 2 IAE), deducción expresa del 15% (o 7% reducido) calculada sobre la base imponible.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¿Cómo Corregir una Factura Errónea? La Factura Rectificativa
            </h2>
            <p>
              En la legislación tributaria española está terminantemente <strong>prohibido borrar, destruir o sobrescribir una factura ya emitida</strong>. Si cometes un error en el importe, en el NIF del cliente o si se produce una devolución de mercancía, el único procedimiento legalmente admitido es la emisión de una <strong>Factura Rectificativa</strong>:
            </p>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Reglas de la Factura Rectificativa:</p>
              <p>• Debe contar con una <strong>serie de numeración especial e independiente</strong> (ejemplo: R-2026-001).</p>
              <p>• Debe hacer constar expresamente el <strong>número y fecha de la factura original que se rectifica</strong> y el motivo concreto de la modificación.</p>
              <p>• Puede emitirse por la diferencia positiva/negativa o sustituir íntegramente a la factura anterior indicando los nuevos importes definitivos.</p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 print:hidden">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre Facturación Oficial en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios de la Agencia Tributaria fundados en el Reglamento de Facturación y la Ley del IVA.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo aplicar el 7% de IRPF si me di de alta como autónomo este año?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. Los autónomos que inicien el ejercicio de actividades profesionales tienen derecho a aplicar el <strong>tipo reducido de retención del 7%</strong> durante el año natural en que inician su actividad y en los dos ejercicios fiscales siguientes, siempre que no hayan estado dados de alta en actividades profesionales en los doce meses anteriores. Debes entregar a tu cliente una comunicación firmada informando de que cumples los requisitos legales.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Debo incluir retención de IRPF si facturo a un cliente particular?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No. Está terminantemente prohibido incluir retención de IRPF en facturas emitidas a particulares (consumidores finales), ya que un particular no presenta declaraciones de retenciones a cuenta (Modelo 111) ante la Agencia Tributaria. A los particulares solo se les cobra la Base Imponible más el IVA correspondiente.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo se factura a un cliente de la Unión Europea sin IVA?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Para emitir facturas exentas de IVA a empresas o autónomos de la UE (entregas intracomunitarias de bienes o prestaciones intracomunitarias de servicios), tanto tú como tu cliente debéis estar dados de alta en el <strong>Registro de Operadores Intracomunitarios (ROI)</strong> y contar con un NIF-IVA validado en el sistema <strong>VIES</strong>. En la factura debe constar la mención legal: <em>"Operación no sujeta / exenta de IVA por inversión del sujeto pasivo según Directiva 2006/112/CE"</em>.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuánto tiempo estoy legalmente obligado a conservar las facturas?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                A efectos tributarios (Ley General Tributaria), el plazo legal de prescripción para la comprobación de impuestos es de <strong>4 años</strong> desde la finalización del plazo reglamentario para presentar la declaración. No obstante, a efectos mercantiles (Código de Comercio, artículo 30), los empresarios están obligados a conservar los libros contables, correspondencia y facturas durante un mínimo de <strong>6 años</strong>.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué plazo tengo para expedir y enviar la factura a mi cliente?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Si el destinatario es un particular, la factura debe expedirse en el mismo momento en que se realiza la operación. Si el destinatario es un empresario o profesional, la factura debe emitirse <strong>antes del día 16 del mes siguiente</strong> a aquel en que se haya producido el devengo del impuesto, y remitirse en el plazo de un mes desde su fecha de emisión.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 print:hidden">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas de Facturación, Impuestos e Identidad
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Controla tu gestión fiscal y operativa con nuestras calculadoras profesionales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  Liquida el saldo de tus facturas emitidas restando el IVA soportado deducible.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular IVA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/validador-dni-nie-cif"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">NIF / CIF</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Validador DNI / CIF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Verifica que los datos fiscales de tus clientes son matemáticamente correctos.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Validar documento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-irpf-autonomos"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Rendimientos</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Autónomos
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula tu cuota a la Seguridad Social y tu liquidación del Modelo 130 de IRPF.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular cuota</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/validador-iban-espana"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Cobros SEPA</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Validador IBAN España
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Asegura el código IBAN de tu cuenta bancaria para incluirlo en tus facturas.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Verificar cuenta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* E-E-A-T Official Regulatory Gazette Citation */}
        <footer className="text-xs text-slate-500 border-t border-slate-200 pt-6 space-y-2 print:hidden">
          <p className="flex items-center gap-1.5 font-medium text-slate-600">
            <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
            <span>Marco Legal Oficial y Fuentes Estatutarias:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1 text-[11px] sm:text-xs">
            <li>
              <strong>Real Decreto 1619/2012, de 30 de noviembre:</strong> Por el que se aprueba el Reglamento por el que se regulan las obligaciones de facturación (BOE núm. 289/2012).
            </li>
            <li>
              <strong>Ley 37/1992, de 28 de diciembre:</strong> Del Impuesto sobre el Valor Añadido (artículos 164 y siguientes sobre obligaciones formales de los sujetos pasivos).
            </li>
            <li>
              <strong>Ley 18/2022, de 28 de septiembre:</strong> De creación y crecimiento de empresas (Ley Crea y Crece: implantación de la factura electrónica B2B).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
