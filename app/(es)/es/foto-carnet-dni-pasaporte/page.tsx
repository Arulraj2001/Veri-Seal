import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainFotoCarnetEngine } from '@/components/international/SpainFotoCarnetEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Camera, Printer, Lock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Foto Carnet DNI y Pasaporte 32x26mm Gratis : Plantilla 10x15 | Kagazo',
  description:
    'Crea gratis tu foto carnet para el DNI y pasaporte español (32x26 mm a 300 DPI). Descarga la plantilla de 8 fotos lista para imprimir en papel fotográfico 10x15 cm conforme a la Policía Nacional.',
  keywords: [
    'foto carnet medidas dni espana 32x26',
    'crear foto carnet online gratis movil',
    'plantilla fotos dni 10x15 imprimir papel fotografico',
    'medidas foto pasaporte policia nacional 32x26 mm',
    'requisitos foto carnet fondo blanco policia',
    'hacer foto dni en casa con el movil',
    'imprimir fotos carnet barato 10x15',
    'renovacion dni requisitos fotografia 2026',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
    languages: {
      'es-ES': `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
      'es': `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
      'x-default': `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
    },
  },
  openGraph: {
    title: 'Foto Carnet DNI y Pasaporte 32x26mm Gratis : Plantilla 10x15',
    description:
      'Crea y descarga gratis tu foto carnet oficial para renovar el DNI y pasaporte español según los estándares de la Policía Nacional.',
    url: `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainFotoCarnetPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Creador de Foto Carnet DNI y Pasaporte España 32x26mm',
        applicationCategory: 'MultimediaApplication',
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
          'Herramienta en línea gratuita para recortar y generar plantillas imprimibles de fotografías oficiales de tamaño carnet (32 x 26 mm) según los estándares de la Dirección General de la Policía.',
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
            name: 'Foto Carnet DNI y Pasaporte',
            item: `${SITE_URL}/es/foto-carnet-dni-pasaporte`,
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
          <Link href="/es#tramites-identidad" className="hover:text-slate-900 transition-colors">
            Trámites e Identidad
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Foto Carnet DNI y Pasaporte</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Medida Oficial 32 × 26 mm de la Dirección General de la Policía</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Foto Carnet DNI y Pasaporte 32x26 mm : Plantilla Imprimible Gratis
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Convierte cualquier foto hecha con tu teléfono móvil en una fotografía tamaño carnet oficial válida para renovar el DNIe 4.0, pasaporte o carnet de conducir en España. Descarga una plantilla de 8 fotos a 300 DPI lista para imprimir en papel 10×15 cm por menos de 0,30 euros.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cuáles son las medidas oficiales de la foto del DNI en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            La fotografía oficial exigida por el Ministerio del Interior debe medir exactamente <strong>32 milímetros de alto por 26 milímetros de ancho (378 × 307 píxeles a 300 DPI)</strong>. Debe estar tomada de frente, con <strong>fondo blanco uniforme liso</strong>, rostro despejado (el óvalo facial debe ocupar el 70%-80% de la altura), cabeza descubierta y sin gafas de cristales oscuros ni reflejos.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainFotoCarnetEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Especificaciones Técnicas Oficiales de Fotografía en España (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Parámetros biométricos y dimensiones estandarizadas por la Dirección General de la Policía (DGP).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Documento Oficial</th>
                  <th className="py-3.5 px-4 font-bold">Tamaño Físico (mm)</th>
                  <th className="py-3.5 px-4 font-bold">Resolución Óptima (300 DPI)</th>
                  <th className="py-3.5 px-4 font-bold">Proporción del Rostro</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Fondo Exigido</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Plantilla Estándar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">DNIe 4.0 (España)</td>
                  <td className="py-3 px-4 font-bold text-orange-700">32 × 26 mm</td>
                  <td className="py-3 px-4">378 × 307 px</td>
                  <td className="py-3 px-4 text-slate-600">70% – 80% (20 a 25 mm)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">Blanco liso puro</td>
                  <td className="py-3 px-4 font-bold text-slate-900">8 fotos en 10×15 cm</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Pasaporte Español</td>
                  <td className="py-3 px-4 font-bold text-orange-700">32 × 26 mm</td>
                  <td className="py-3 px-4">378 × 307 px</td>
                  <td className="py-3 px-4 text-slate-600">70% – 80%</td>
                  <td className="py-3 px-4 font-bold text-slate-900">Blanco liso puro</td>
                  <td className="py-3 px-4 font-bold text-slate-900">8 fotos en 10×15 cm</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Permiso Conducir DGT</td>
                  <td className="py-3 px-4">32 × 26 mm</td>
                  <td className="py-3 px-4">378 × 307 px</td>
                  <td className="py-3 px-4 text-slate-600">70% – 80%</td>
                  <td className="py-3 px-4 font-bold text-slate-900">Blanco liso puro</td>
                  <td className="py-3 px-4 font-bold text-slate-900">8 fotos en 10×15 cm</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Tarjeta NIE Extranjeros (TIE)</td>
                  <td className="py-3 px-4">32 × 26 mm</td>
                  <td className="py-3 px-4">378 × 307 px</td>
                  <td className="py-3 px-4 text-slate-600">70% – 80%</td>
                  <td className="py-3 px-4 font-bold text-slate-900">Blanco liso puro</td>
                  <td className="py-3 px-4 font-bold text-slate-900">8 fotos en 10×15 cm</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Estándar Europeo OACI (Francia/Alemania)</td>
                  <td className="py-3 px-4 text-slate-600">35 × 45 mm</td>
                  <td className="py-3 px-4">413 × 531 px</td>
                  <td className="py-3 px-4 text-slate-600">70% – 80%</td>
                  <td className="py-3 px-4 text-slate-600">Gris claro o azul suave</td>
                  <td className="py-3 px-4 font-bold text-slate-900">6 fotos en 10×15 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: En España rige el tamaño tradicional de 32x26 mm para trámites nacionales, a diferencia del formato estándar europeo OACI (35x45 mm).
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Requisitos Biométricos Ineludibles según la Policía Nacional
            </h2>
            <p>
              El <strong>Real Decreto 1553/2005</strong> que regula la expedición del DNI establece que la fotografía debe ser una muestra fiel y actual del rostro del titular. Para evitar que el funcionario de la comisaría rechace tu foto, debes cumplir estas pautas oficiales:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Camera className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>Postura, Iluminación y Expresión</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                  <li><strong>Totalmente de frente:</strong> La cámara debe situarse a la altura de los ojos. No se admiten fotos con la cabeza ladeada o inclinada.</li>
                  <li><strong>Expresión neutra:</strong> Boca cerrada, sin sonreír ni fruncir el ceño, con los ojos abiertos mirando directamente al objetivo.</li>
                  <li><strong>Sin sombras:</strong> La iluminación debe ser uniforme a ambos lados del rostro para que no se proyecten sombras oscuras en el cuello ni en el fondo blanco.</li>
                  <li><strong>Fondo blanco liso:</strong> El fondo debe ser obligatoriamente blanco, plano y sin texturas, muebles ni objetos visibles detrás.</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>Gafas, Pelo y Prendas de Cabeza</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                  <li><strong>Uso de gafas de vista:</strong> Están permitidas siempre que los cristales sean perfectamente transparentes, no tengan reflejos del flash y la montura no tape ninguna parte de los ojos o cejas. Prohibidas las gafas de sol o fotosensibles.</li>
                  <li><strong>Cabello despejado:</strong> El flequillo no debe cubrir las cejas ni los ojos. Las orejas no es obligatorio que se vean, pero el contorno oval del rostro sí debe quedar nítidamente visible.</li>
                  <li><strong>Prendas religiosas (hiyab, etc.):</strong> Admitidas exclusivamente si dejan al descubierto desde el nacimiento del pelo hasta la barbilla y de sien a sien.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cómo Hacer la Foto con el Móvil e Imprimirla por Menos de 0,30 €
            </h2>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Instrucciones de Ahorro Paso a Paso:</p>
              <p>1. Colócate a 1,5 metros de una pared blanca con luz natural de frente (nunca a contraluz).</p>
              <p>2. Pide a otra persona que te haga la foto a la altura de los ojos con la cámara trasera (evita la cámara frontal selfie para no deformar el rostro).</p>
              <p>3. Sube la foto a nuestro motor: ajusta el recorte al recuadro oficial de 32×26 mm y pulsa en "Descargar Plantilla 10×15 cm".</p>
              <p>4. Guarda la imagen en tu móvil o en un pendrive USB y acude a cualquier tienda de fotografía, papelería o máquina rápida de supermercado. Pide una copia fotográfica estándar de 10×15 cm (4×6") en papel brillo. Te costará entre 0,20 € y 0,30 € y obtendrás 8 fotos de calidad profesional.</p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre las Fotos para el DNI y Pasaporte
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales fundadas en los requisitos del Ministerio del Interior y la Dirección General de la Policía.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo llevar una foto en papel normal impreso con mi impresora doméstica?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No. La Policía Nacional exige que la fotografía esté impresa en <strong>papel fotográfico de alta calidad</strong> con emulsión química profesional. Las impresiones caseras en papel folio de oficina o en impresoras de inyección con grano visible o tinta que se corra son sistemáticamente rechazadas en comisaría.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué antigüedad máxima puede tener la foto que llevo al DNI?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                La fotografía debe ser <strong>reciente</strong>, tomada preferiblemente en los últimos seis meses previos a la cita. Si tu apariencia física actual (corte de pelo drástico, barba, pérdida o aumento de peso notable) difiere de la foto presentada, el funcionario puede exigir una nueva toma fotográfica.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuántas fotos necesito llevar el día de la cita de renovación?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Para renovar el <strong>DNI se exige 1 única fotografía</strong> tamaño carnet. Si vas a renovar conjuntamente el <strong>Pasaporte</strong> y tu DNI está en vigor con menos de 2 años desde la última emisión, no se necesita foto adicional para el pasaporte; en caso contrario, deberás llevar 2 fotografías idénticas.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Es obligatorio recortar las fotos de la plantilla antes de ir a comisaría?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No es estrictamente necesario. Las comisarías de policía disponen de troqueladoras oficiales de palanca que cortan la foto exactamente a 32x26 mm con bordes limpios. No obstante, si prefieres llevarla ya cortada, utiliza una regla metálica y un cúter afilado para evitar bordes dentados.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo usar piercings o pendientes en la foto del DNI?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Los pendientes pequeños o discretos en las orejas están totalmente permitidos. Respecto a los piercings faciales (nariz, ceja, labio), se toleran siempre que sean discretos y no oculten rasgos faciales distintivos ni generen destellos o sombras sobre los ojos, la nariz o la boca.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas de Identidad y Trámites Oficiales
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Prepara toda tu documentación administrativa antes de acudir a tu cita.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/validador-dni-nie-cif"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Identidad</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Validador DNI / NIE / CIF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba el algoritmo Módulo 23 de tu documento de identidad español.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Validar DNI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/compresor-pdf-sede-electronica"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Sedes Online</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Compresor PDF Sedes
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Reduce el peso de tus certificados o partidas de nacimiento para adjuntarlos sin error.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Comprimir PDF</span>
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
                  Calcula los plazos administrativos para presentar alegaciones o recursos ante la Policía.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular plazo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

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
                  Crea facturas comerciales oficiales en formato PDF con desglose de impuestos.
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
              <strong>Real Decreto 1553/2005, de 23 de diciembre:</strong> Por el que se regula la expedición del Documento Nacional de Identidad y sus certificados de firma electrónica (BOE núm. 307/2005), artículo 11.
            </li>
            <li>
              <strong>Real Decreto 896/2003, de 11 de julio:</strong> Por el que se regula la expedición del Pasaporte ordinario y se determinan sus características (BOE núm. 166/2003).
            </li>
            <li>
              <strong>Dirección General de la Policía (Policía Nacional):</strong> Criterios técnicos de aceptación fotográfica del DNI electrónico 4.0.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
