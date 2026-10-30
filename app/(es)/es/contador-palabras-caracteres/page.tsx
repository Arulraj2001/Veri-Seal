import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainWordCounterEngine } from '@/components/international/SpainWordCounterEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Type, Clock, Lock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contador de Palabras y Caracteres Gratis en Español | En Vivo | Kagazo',
  description:
    'Cuenta gratis palabras, caracteres con y sin espacios, párrafos y tiempo estimado de lectura de cualquier texto en español en tiempo real. Tabla oficial de límites para SEO, redes sociales, TFG y oposiciones.',
  keywords: [
    'contador de palabras y caracteres online gratis',
    'contar letras y espacios en un texto espanol',
    'contador palabras redaccion tfg tesis oposiciones',
    'calcular tiempo de lectura palabras por minuto',
    'limite caracteres twitter meta descripcion seo google',
    'analizador longitud texto privacidad local',
    'contar caracteres sin espacios traduccion editorial',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/contador-palabras-caracteres`,
    languages: {
      'es-ES': `${SITE_URL}/es/contador-palabras-caracteres`,
      'es': `${SITE_URL}/es/contador-palabras-caracteres`,
      'x-default': `${SITE_URL}/es/contador-palabras-caracteres`,
    },
  },
  openGraph: {
    title: 'Contador de Palabras y Caracteres Gratis en Español | En Vivo',
    description:
      'Cuenta palabras, caracteres y tiempo de lectura en tiempo real con estadísticas detalladas y privacidad 100% en tu navegador.',
    url: `${SITE_URL}/es/contador-palabras-caracteres`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainWordCounterPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Contador de Palabras y Caracteres Online en Español',
        applicationCategory: 'UtilitiesApplication',
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
          'Herramienta gratuita para análisis tipográfico y cuantitativo de textos en idioma español con cálculo instantáneo de palabras, caracteres y párrafos en memoria local.',
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
            name: 'Utilidades y Redacción',
            item: `${SITE_URL}/es#utilidades-consumo`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Contador de Palabras',
            item: `${SITE_URL}/es/contador-palabras-caracteres`,
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
            Utilidades y Redacción
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Contador de Palabras</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Análisis Tipográfico en Vivo • Privacidad Local en Navegador</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Contador de Palabras y Caracteres Online en Español
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Analiza la extensión exacta de tus textos, ensayos académicos, trabajos de fin de grado (TFG), oposiciones, recursos administrativos o publicaciones en redes sociales. Conteo instantáneo de palabras, caracteres con y sin espacios, párrafos y tiempo estimado de lectura en voz alta y silenciosa.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se calcula el tiempo de lectura de un texto?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            El tiempo de lectura silenciosa estándar para un adulto en español se calcula dividiendo el número total de palabras entre <strong>200 a 250 palabras por minuto (ppm)</strong>. Para lectura en voz alta, exposiciones orales o discursos públicos, la velocidad media desciende a <strong>130 - 150 palabras por minuto</strong>. Un texto habitual de 1.000 palabras requiere aproximadamente 4 minutos y 30 segundos de lectura atenta.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainWordCounterEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Límites de Caracteres y Palabras en Plataformas Oficiales y Digitales
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Límites técnicos recomendados y máximos tolerados en motores de búsqueda, trámites y redes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Plataforma / Formato</th>
                  <th className="py-3.5 px-4 font-bold">Límite Recomendado</th>
                  <th className="py-3.5 px-4 font-bold">Límite Máximo Técnico</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Tiempo de Lectura</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600">Finalidad Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">Título SEO Google (Meta Title)</td>
                  <td className="py-3 px-4 font-bold text-orange-700">50 – 60 caracteres</td>
                  <td className="py-3 px-4">600 píxeles (~65 car.)</td>
                  <td className="py-3 px-4 text-slate-600">2 segundos</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Evitar truncamiento en Google</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Meta Descripción SEO Google</td>
                  <td className="py-3 px-4 font-bold text-orange-700">145 – 155 caracteres</td>
                  <td className="py-3 px-4">960 píxeles (~160 car.)</td>
                  <td className="py-3 px-4 text-slate-600">5 segundos</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Snippet de resultados orgánicos</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Publicación en X (Twitter)</td>
                  <td className="py-3 px-4">240 – 260 caracteres</td>
                  <td className="py-3 px-4 font-bold text-slate-900">280 caracteres</td>
                  <td className="py-3 px-4 text-slate-600">10 segundos</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Microblogging estándar</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Resumen TFG / Tesis Doctoral (Abstract)</td>
                  <td className="py-3 px-4">250 – 300 palabras</td>
                  <td className="py-3 px-4">500 palabras</td>
                  <td className="py-3 px-4 text-slate-600">1 a 2 minutos</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Normativa académica universitaria</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Campo Alegaciones Sede Electrónica</td>
                  <td className="py-3 px-4">1.500 – 2.500 caracteres</td>
                  <td className="py-3 px-4 font-bold text-red-600">4.000 caracteres</td>
                  <td className="py-3 px-4 text-slate-600">2 a 3 minutos</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Instancias telemáticas públicas</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Artículo de Blog Profesional / Guía</td>
                  <td className="py-3 px-4">1.200 – 2.000 palabras</td>
                  <td className="py-3 px-4">Sin límite</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">6 a 9 minutos</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Posicionamiento en buscadores</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Caracteres con Espacios vs Sin Espacios: ¿Cuál Debes Mirar?
            </h2>
            <p>
              Una duda muy habitual entre escritores, traductores y opositores radica en distinguir los dos métodos de cómputo de caracteres que ofrece el procesador tipográfico:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Type className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. Caracteres con Espacios (Longitud Bruta)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cuenta absolutamente cada pulsación del teclado: letras, números, símbolos de puntuación y la barra espaciadora. Es el indicador que aplican los <strong>formularios de las sedes electrónicas de la administración pública</strong>, las redes sociales (X, LinkedIn) y las herramientas de maquetación editorial física.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. Caracteres sin Espacios (Densidad Neta)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ignora los espacios en blanco y los saltos de línea, computando exclusivamente los caracteres alfanuméricos y signos ortográficos con tinta. Es el estándar aplicado en el <strong>sector de la traducción jurada y comercial</strong> para presupuestar matrices de trabajo y en convocatorias de concursos literarios.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Seguridad para Textos Confidenciales y Ensayos Privados
            </h2>
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                Procesamiento 100% en Cliente (Lado del Navegador):
              </p>
              <p>
                Al pegar un texto en nuestro contador (ya sea un borrador de un libro, un recurso administrativo con datos personales, un contrato privado o un examen de oposición), el algoritmo se procesa en la memoria volátil de tu navegador. <strong>Ninguna palabra se envía a través de internet ni se guarda en ningún registro ni base de datos</strong>, garantizando confidencialidad absoluta y cumplimiento estricto del RGPD.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre el Conteo de Palabras y Caracteres
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios lingüísticos y normas de la Real Academia Española (RAE).
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Las palabras compuestas con guion cuentan como una o dos palabras?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Según el criterio estándar de procesamiento de lenguaje natural y de la RAE, los términos unidos por guion (como <em>teórico-práctico</em> o <em>físico-químico</em>) se computan habitualmente como <strong>dos palabras independientes</strong> al estar compuestas por dos lexemas distintos, aunque en el conteo de caracteres computan como una sola cadena continua con el guion incluido.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Los números y cifras cuentan como palabras en el analizador?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. Cualquier secuencia de caracteres numéricos aislada por espacios (por ejemplo, "2026" o "150.000") se contabiliza como una palabra en los algoritmos de análisis textual, exactamente igual que en Microsoft Word o Google Docs.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuántas palabras suele tener una página DIN A4 estándar?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En un folio DIN A4 mecanografiado con tipografía estándar (Arial o Times New Roman de 12 puntos) e interlineado de 1,5 líneas, caben aproximadamente <strong>entre 400 y 500 palabras</strong> (unas 2.500 a 3.000 caracteres con espacios). A interlineado simple caben entre 700 y 800 palabras.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo calcula el motor los párrafos del texto?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El contador identifica un párrafo cada vez que detecta un salto de línea (tecla Enter) que contenga texto válido. Los saltos de línea consecutivos o líneas vacías no se contabilizan como párrafos adicionales para evitar inflar artificialmente las estadísticas métricas.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Afectan los emojis al conteo de caracteres en redes sociales?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí, de forma muy significativa. En codificación Unicode (UTF-16), la inmensa mayoría de emojis ocupan <strong>2 caracteres de código</strong> (pares subrogados), y algunos emojis complejos (como banderas nacionales o tonos de piel combinados) pueden consumir hasta 4 o 7 caracteres técnicos, restando más espacio del aparente en plataformas con límites estrictos como X o las descripciones SEO.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas de Productividad, Consumo y Trámites
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Optimiza tus documentos y presupuestos con nuestras herramientas oficiales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/compresor-pdf-sede-electronica"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Documentos</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Compresor PDF Sedes
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Reduce el peso de tus textos e informes en PDF para adjuntarlos sin error en la administración.
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
                  Calcula las fechas límite para presentar tus alegaciones o recursos administrativos.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular plazo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-descuentos-rebajas"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Consumo</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Descuentos
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula el precio rebajado y el ahorro exacto en compras comerciales.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular descuento</span>
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
                  Emite facturas oficiales con IVA e IRPF desglosados conformes al RD 1619/2012.
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
            <span>Marco Lingüístico Oficial y Fuentes Técnicas:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1 text-[11px] sm:text-xs">
            <li>
              <strong>Real Academia Española (RAE) y ASALE:</strong> Ortografía de la lengua española (normas sobre signos de puntuación, división silábica y palabras compuestas).
            </li>
            <li>
              <strong>Instituto Cervantes:</strong> Guías de estilo para la redacción y traducción de textos profesionales en español.
            </li>
            <li>
              <strong>Estándar Internacional Unicode (UTF-8 / UTF-16):</strong> Especificaciones técnicas de representación gráfica de caracteres alfanuméricos y emojis.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
