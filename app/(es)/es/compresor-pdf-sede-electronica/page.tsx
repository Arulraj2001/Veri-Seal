import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainPdfCompressorEngine } from '@/components/international/SpainPdfCompressorEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Lock, FileDown, UploadCloud } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Compresor PDF Sede Electrónica Gratis (<2MB / <4MB / <10MB) | Kagazo',
  description:
    'Comprime gratis tus archivos PDF para subirlos a la Sede Electrónica, Seguridad Social, AEAT o DGT sin errores de tamaño. Tabla oficial de límites de peso por organismo y privacidad 100% en tu navegador.',
  keywords: [
    'comprimir pdf sede electronica 2mb espana',
    'reducir tamano pdf hacienda dgt seguridad social',
    'comprimir pdf online gratis sin registro sin marcas',
    'bajar peso pdf menos de 4mb registro electronico',
    'limite peso archivos pdf sede administracion publica',
    'optimizar pdf autofirma cl@ve justicia lexnet',
    'comprimir pdf privacidad local navegador rgpd',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/compresor-pdf-sede-electronica`,
    languages: {
      'es-ES': `${SITE_URL}/es/compresor-pdf-sede-electronica`,
      'es': `${SITE_URL}/es/compresor-pdf-sede-electronica`,
      'x-default': `${SITE_URL}/es/compresor-pdf-sede-electronica`,
    },
  },
  openGraph: {
    title: 'Compresor PDF Sede Electrónica Gratis (<2MB / <4MB / <10MB)',
    description:
      'Reduce el peso de tus archivos PDF para trámites en la administración pública española sin perder nitidez y con procesamiento 100% local en tu dispositivo.',
    url: `${SITE_URL}/es/compresor-pdf-sede-electronica`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainPdfCompressorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Compresor de PDF para la Sede Electrónica España',
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
          'Herramienta gratuita para comprimir documentos PDF y ajustarlos a los límites máximos permitidos en los registros telemáticos de la Administración Pública española sin enviar datos a servidores.',
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
            name: 'Compresor PDF Sede Electrónica',
            item: `${SITE_URL}/es/compresor-pdf-sede-electronica`,
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
          <span className="text-slate-900 font-bold">Compresor PDF Sede Electrónica</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ajustado a los Límites de los Registros Públicos Telemáticos (Ley 39/2015)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Compresor de PDF para Sede Electrónica (&lt;2MB / &lt;4MB / &lt;10MB)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Reduce el peso de tus documentos PDF para que los registros de la Seguridad Social, la Agencia Tributaria (AEAT), la DGT o las universidades los acepten sin dar el molesto error de "archivo demasiado grande". Compresión 100% en la memoria de tu navegador sin subir tus archivos privados a ningún servidor externo.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cuál es el tamaño máximo de archivo PDF permitido en las sedes electrónicas?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            En España, los registros telemáticos fijan topes muy estrictos: la <strong>DGT permite hasta 2 MB</strong>, la <strong>Seguridad Social hasta 4 MB por fichero</strong>, la <strong>Agencia Tributaria (AEAT) entre 5 MB y 10 MB</strong>, y el <strong>Registro Electrónico Común (Red SARA) hasta 10 MB</strong>. Comprimir el documento optimizando las imágenes internas y eliminando metadatos permite reducir su peso más de un 70% sin perder nitidez de texto.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainPdfCompressorEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Límites de Tamaño en Registros Oficiales de España (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Límites técnicos fijados por los principales organismos y plataformas telemáticas de la Administración General del Estado.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Organismo / Sede Electrónica</th>
                  <th className="py-3.5 px-4 font-bold">Límite por Archivo</th>
                  <th className="py-3.5 px-4 font-bold">Límite Total Envío</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Nivel Recomendado</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Formatos Admitidos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">DGT (Dirección General de Tráfico)</td>
                  <td className="py-3 px-4 font-bold text-red-600">2 MB</td>
                  <td className="py-3 px-4">6 MB</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Compresión Media / Alta</td>
                  <td className="py-3 px-4 font-sans text-slate-600">PDF, JPG</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">Seguridad Social (Import@ss / INSS)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">4 MB</td>
                  <td className="py-3 px-4">10 MB</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Compresión Media (&lt; 4 MB)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">PDF exclusivamente</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Agencia Tributaria (AEAT)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">5 MB – 10 MB</td>
                  <td className="py-3 px-4">15 MB</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Compresión Ligera</td>
                  <td className="py-3 px-4 font-sans text-slate-600">PDF, XML, ZIP</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Registro Electrónico General (Red SARA)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">10 MB</td>
                  <td className="py-3 px-4">15 MB</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Compresión Media</td>
                  <td className="py-3 px-4 font-sans text-slate-600">PDF / A estándar</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Ministerio de Justicia (LexNET)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">15 MB</td>
                  <td className="py-3 px-4">30 MB</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Compresión Media</td>
                  <td className="py-3 px-4 font-sans text-slate-600">PDF firmado PAdES</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Universidades Públicas y Oposiciones</td>
                  <td className="py-3 px-4 font-bold text-red-600">2 MB – 5 MB</td>
                  <td className="py-3 px-4">10 MB</td>
                  <td className="py-3 px-4 font-bold text-orange-600">Compresión Media / Alta</td>
                  <td className="py-3 px-4 font-sans text-slate-600">PDF exclusivamente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¿Por qué las Sedes Electrónicas Rechazan tus Archivos PDF?
            </h2>
            <p>
              La <strong>Ley 39/2015 del Procedimiento Administrativo Común</strong> impuso la obligatoriedad de la vía electrónica para empresas, autónomos y muchos trámites de ciudadanos particulares. Sin embargo, los servidores de la Administración General del Estado mantienen cuotas de subida limitadas para evitar la saturación de sus centros de datos y pasarelas de registro telemático.
            </p>
            <p>
              El motivo principal por el que un documento de pocas páginas puede llegar a pesar 10 MB o 20 MB es la digitalización defectuosa: escanear un certificado médico o una escritura con un escáner doméstico a 600 DPI a todo color incrusta imágenes sin comprimir con millones de píxeles redundantes. Nuestro motor optimiza las resoluciones gráficas a los <strong>150 - 200 DPI estándar de lectura</strong> y purga los metadatos innecesarios sin que los textos pierdan nitidez legible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3>Privacidad Absoluta para Documentos Sensibles</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Al realizar trámites ante la Seguridad Social, Hacienda o Juzgados, los documentos PDF contienen información altamente confidencial (nóminas con datos salariales, historiales médicos, DNI o datos bancarios).
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                Nuestra tecnología ejecuta la compresión de forma 100% local en la memoria RAM de tu dispositivo. Tus documentos nunca se transmiten por internet ni se almacenan en servidores externos, cumpliendo con la máxima protección del RGPD.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <h3>Regla de Oro con Documentos con Firma Digital</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Si necesitas presentar un documento firmado electrónicamente con certificado digital (mediante AutoFirma, Cl@ve Firma o Adobe Reader), <strong>debes comprimir el archivo PDF antes de firmarlo</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprimir un PDF que ya ha sido firmado altera la firma criptográfica (el hash del archivo cambia), lo que provocará que la sede electrónica lo rechace con un error de <em>"Firma electrónica inválida o documento alterado"</em>.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre la Compresión de PDF para Trámites Públicos
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios técnicos oficiales para presentaciones telemáticas ante la administración española.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿La compresión hace que el texto pierda nitidez o no se pueda leer?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No. Los textos digitales con fuentes incrustadas se conservan como vectores puros y no sufren ninguna degradación. La reducción de tamaño se consigue optimizando la compresión de las imágenes escaneadas de fondo, reduciendo la resolución de 600 DPI a 150 DPI (que resulta perfectamente nítida y legible tanto en pantalla como al imprimir) y eliminando historiales de edición internos del archivo.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué hago si la sede sigue rechazando mi PDF por tamaño?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Si un documento de muchas páginas sigue superando el límite tras la compresión media, puedes seleccionar el nivel de <strong>compresión alta</strong>. Si aun así excede la cuota de la sede (por ejemplo, en la DGT con límite de 2 MB), el procedimiento legalmente admitido es dividir el documento en varias partes (por ejemplo, "Escritura_Parte1.pdf" y "Escritura_Parte2.pdf") e indicar en el formulario que se adjunta fraccionado.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Es compatible con el estándar PDF/A exigido por algunos juzgados?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sí. El estándar <strong>PDF/A (ISO 19005)</strong> es un formato de archivo electrónico para preservación a largo plazo que exige que todas las fuentes estén incrustadas y no contenga enlaces dinámicos ni código ejecutable. Nuestra compresión respeta la estructura interna del estándar y permite conservar la compatibilidad exigida por LexNET y las sedes judiciales.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo comprimir un PDF protegido con contraseña?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Por motivos de seguridad criptográfica, los PDFs protegidos mediante contraseña de apertura deben ser desbloqueados previamente antes de ser optimizados. Además, ten en cuenta que prácticamente todas las sedes electrónicas públicas rechazan de forma automática los documentos que contengan contraseñas, ya que los sistemas automáticos de registro no pueden indexar ni archivar su contenido.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Hay límite en el número de archivos que puedo comprimir al día?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Ninguno. Al ejecutarse directamente en tu propio navegador web sin consumir recursos de servidores externos, la herramienta es completamente ilimitada, gratuita y sin marcas de agua.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas de Trámites, Facturación e Identidad
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Prepara todos tus documentos para tramitaciones telemáticas sin errores.
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
                  Emite facturas legales ligeras en formato PDF listas para subir a la administración.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Crear factura</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/validador-dni-nie-cif"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Validación NIF</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Validador DNI / CIF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba el dígito de control matemático antes de rellenar instancias telemáticas.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Validar documento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-dias-habiles"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Plazos Oficiales</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Días Hábiles
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula con precisión las fechas límite de presentación de recursos y alegaciones.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular plazo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/foto-carnet-dni-pasaporte"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Identificación</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Foto Carnet DNI y Pasaporte
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Prepara tus fotos con las medidas reglamentarias de 32x26 mm de la Policía Nacional.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Crear fotos</span>
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
              <strong>Ley 39/2015, de 1 de octubre:</strong> Del Procedimiento Administrativo Común de las Administraciones Públicas (artículos 14 y 16: derecho y obligación de relacionarse electrónicamente y registros).
            </li>
            <li>
              <strong>Real Decreto 4/2010, de 8 de enero:</strong> Por el que se regula el Esquema Nacional de Interoperabilidad en el ámbito de la Administración Electrónica (ENI).
            </li>
            <li>
              <strong>Punto de Acceso General Electrónico (PAG):</strong> Normas técnicas de presentación de documentos y límites de tamaño en el Registro Electrónico Común (REC).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
