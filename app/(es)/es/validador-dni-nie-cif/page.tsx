import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DniValidatorEngine } from '@/components/international/DniValidatorEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, UserCheck, Lock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Validador de DNI, NIE y CIF Online : Algoritmo Módulo 23 | Kagazo',
  description:
    'Comprueba si un DNI, NIE o CIF es válido al instante. Algoritmo oficial de comprobación del dígito de control de la Policía Nacional y la Agencia Tributaria en España. 100% privado en navegador.',
  keywords: [
    'validador dni espana online',
    'comprobar letra nie extranjeros',
    'calcular letra dni algoritmo modulo 23',
    'validar cif empresa sociedad limitada',
    'tabla letras dni modulo 23 policia nacional',
    'diferencia entre nif nie cif espana',
    'comprobacion digito control cif hacienda',
    'letras excluidas dni i o u',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/validador-dni-nie-cif`,
    languages: HREFLANG_REGISTRY.id_validator.locales,
  },
  openGraph: {
    title: 'Validador de DNI, NIE y CIF Online : Algoritmo Módulo 23',
    description:
      'Comprueba al instante la validez de cualquier DNI, NIE o CIF español mediante el algoritmo matemático oficial en tu navegador.',
    url: `${SITE_URL}/es/validador-dni-nie-cif`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function DniValidatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Validador de DNI, NIE y CIF España',
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
          'Herramienta criptográfica de validación del dígito de control de documentos de identidad españoles (DNI, NIE) y códigos de identificación fiscal (CIF).',
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
            name: 'Validador DNI / NIE / CIF',
            item: `${SITE_URL}/es/validador-dni-nie-cif`,
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
          <span className="text-slate-900 font-bold">Validador DNI / NIE / CIF</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Algoritmo Oficial Módulo 23 Ministerio del Interior & Agencia Tributaria</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Validador de DNI, NIE y CIF en España : Comprobación Inmediata
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Verifica matemáticamente la letra y dígito de control de cualquier Documento Nacional de Identidad (DNI), Número de Identidad de Extranjero (NIE) o Código de Identificación Fiscal (CIF). Ejecución 100% privada en la memoria de tu navegador sin enviar datos a servidores.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se calcula la letra del DNI en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            La letra del DNI se calcula mediante la operación matemática <strong>Módulo 23</strong>: se divide el número de 8 cifras entre 23 y se toma el resto entero resultante (número entre 0 y 22). Dicho resto se busca en la secuencia oficial de 23 letras: <strong>TRWAGMYFPDXBNJZSQVHLCKE</strong>. En los NIEs, la letra inicial <strong>X, Y o Z</strong> se reemplaza por <strong>0, 1 o 2</strong> antes de calcular la división.
          </p>
        </div>

        {/* The Live Engine */}
        <DniValidatorEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla Oficial de Equivalencias del Algoritmo Módulo 23
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Correspondencia obligatoria entre el resto de la división entre 23 y la letra de control asignada por la Dirección General de la Policía.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3 px-3 font-bold text-center">Resto</th>
                  <th className="py-3 px-3 font-bold text-center text-orange-700">Letra</th>
                  <th className="py-3 px-3 font-bold text-center">Resto</th>
                  <th className="py-3 px-3 font-bold text-center text-orange-700">Letra</th>
                  <th className="py-3 px-3 font-bold text-center">Resto</th>
                  <th className="py-3 px-3 font-bold text-center text-orange-700">Letra</th>
                  <th className="py-3 px-3 font-bold text-center">Resto</th>
                  <th className="py-3 px-3 font-bold text-center text-orange-700">Letra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-center">0</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">T</td>
                  <td className="py-2.5 px-3 text-center">6</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">Y</td>
                  <td className="py-2.5 px-3 text-center">12</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">N</td>
                  <td className="py-2.5 px-3 text-center">18</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">H</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-center">1</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">R</td>
                  <td className="py-2.5 px-3 text-center">7</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">F</td>
                  <td className="py-2.5 px-3 text-center">13</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">J</td>
                  <td className="py-2.5 px-3 text-center">19</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">L</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-center">2</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">W</td>
                  <td className="py-2.5 px-3 text-center">8</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">P</td>
                  <td className="py-2.5 px-3 text-center">14</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">Z</td>
                  <td className="py-2.5 px-3 text-center">20</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">C</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-center">3</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">A</td>
                  <td className="py-2.5 px-3 text-center">9</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">D</td>
                  <td className="py-2.5 px-3 text-center">15</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">S</td>
                  <td className="py-2.5 px-3 text-center">21</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">K</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-center">4</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">G</td>
                  <td className="py-2.5 px-3 text-center">10</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">X</td>
                  <td className="py-2.5 px-3 text-center">16</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">Q</td>
                  <td className="py-2.5 px-3 text-center">22</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">E</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-center">5</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">M</td>
                  <td className="py-2.5 px-3 text-center">11</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">B</td>
                  <td className="py-2.5 px-3 text-center">17</td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-600 text-sm">V</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">-</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: Se excluyen intencionadamente las letras I, O y U para evitar confusiones tipográficas con los números 1, 0 y la letra V en la lectura óptica de pasaportes y DNIe. La letra Ñ también queda excluida.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Estructura Legal: DNI, NIE y CIF en el Ordenamiento Español
            </h2>
            <p>
              En España, los documentos identificativos de personas físicas y jurídicas responden a especificaciones técnicas reguladas por el Ministerio del Interior y el Ministerio de Hacienda:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <UserCheck className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. DNI (Ciudadanos Españoles)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Formado por 8 dígitos numéricos y una letra de control final. A efectos tributarios, el Número de Identificación Fiscal (NIF) de los ciudadanos de nacionalidad española coincide exactamente con su número de DNI seguido de dicha letra.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. NIE (Residentes Extranjeros)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Asignado a ciudadanos extranjeros con residencia legal o intereses económicos en España. Consta de una letra inicial (X, Y o Z), seguida de 7 dígitos numéricos y una letra de control calculada con Módulo 23 sustituyendo X=0, Y=1 y Z=2.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <FileText className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>3. CIF (Sociedades y Entidades)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Identificador fiscal de personas jurídicas (RD 1065/2007). Inicia con una letra que define la forma jurídica (ej. <strong>B</strong> para Sociedades Limitadas, <strong>A</strong> para Sociedades Anónimas), 7 dígitos y un carácter de control que puede ser número o letra.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tabla de Letras de CIF según Forma Jurídica
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Letra</th>
                    <th className="py-2.5 px-3">Tipo de Sociedad / Entidad</th>
                    <th className="py-2.5 px-3 font-mono">Dígito de Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                  <tr>
                    <td className="py-2 px-3 font-bold text-orange-600">A</td>
                    <td className="py-2 px-3 font-sans">Sociedades Anónimas (S.A.)</td>
                    <td className="py-2 px-3">Numérico (0-9)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-orange-600">B</td>
                    <td className="py-2 px-3 font-sans">Sociedades de Responsabilidad Limitada (S.L.)</td>
                    <td className="py-2 px-3">Numérico (0-9)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-orange-600">C</td>
                    <td className="py-2 px-3 font-sans">Sociedades Colectivas</td>
                    <td className="py-2 px-3">Numérico (0-9)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-orange-600">E</td>
                    <td className="py-2 px-3 font-sans">Comunidades de Bienes</td>
                    <td className="py-2 px-3">Numérico (0-9)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-orange-600">F</td>
                    <td className="py-2 px-3 font-sans">Sociedades Cooperativas</td>
                    <td className="py-2 px-3">Numérico (0-9)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-orange-600">G</td>
                    <td className="py-2 px-3 font-sans">Asociaciones y Fundaciones</td>
                    <td className="py-2 px-3">Numérico (0-9)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-orange-600">H</td>
                    <td className="py-2 px-3 font-sans">Comunidades de Propietarios en Régimen de Propiedad Horizontal</td>
                    <td className="py-2 px-3">Numérico (0-9)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-orange-600">N, P, Q, S, W</td>
                    <td className="py-2 px-3 font-sans">Entidades no residentes, corporaciones locales y administraciones</td>
                    <td className="py-2 px-3">Alfabético (A-J)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed space-y-2">
            <p className="font-bold flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
              Garantía de Privacidad Total (Sin Conexión con Servidores):
            </p>
            <p>
              A diferencia de otras herramientas en línea, nuestro validador procesa el algoritmo exclusivamente en la memoria local de tu dispositivo (lado del cliente). Ningún número de DNI, NIE o CIF introducido viaja por internet ni se almacena en base de datos alguna, garantizando un cumplimiento estricto del Reglamento General de Protección de Datos (RGPD).
            </p>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre la Validación de DNI, NIE y CIF
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales fundadas en la normativa de la Dirección General de la Policía y la Agencia Tributaria.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Un DNI matemáticamente válido garantiza que la persona existe en el censo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No. El algoritmo Módulo 23 verifica exclusivamente la <strong>integridad matemática del documento</strong> (que la letra coincide con la serie numérica para detectar errores tipográficos al teclear). Solo los cuerpos de seguridad del Estado (Policía Nacional, Guardia Civil) y los organismos con autorización expresa tienen acceso a la base de datos censal de identidad para cotejar nombres y apellidos reales.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Por qué en los NIEs se usan las letras X, Y y Z?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Históricamente, todos los NIEs en España comenzaban por la letra <strong>X</strong>. Cuando la numeración correlativa de 7 dígitos asignados a la letra X se agotó (al superar los 9.999.999 expedientes de extranjeros), el Ministerio del Interior aprobó mediante la <strong>Orden INT/2058/2008</strong> habilitar la letra <strong>Y</strong> (sustituida por 1 en el algoritmo). En el futuro, cuando la serie Y se agote, se asignará la letra <strong>Z</strong> (sustituida por 2).
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Sigue existiendo formalmente el término "CIF" en la legislación?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Técnicamente, el término "CIF" fue formalmente derogado por el <strong>Real Decreto 1065/2007</strong>, que unificó todos los códigos bajo la denominación común de <strong>NIF (Número de Identificación Fiscal)</strong> para personas físicas y jurídicas. No obstante, en el lenguaje cotidiano, bancario y mercantil en España se sigue utilizando comúnmente la palabra CIF para aludir al NIF de empresas y sociedades.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo puedo saber el CIF de una empresa española legalmente?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El CIF de una empresa es información pública registral obligatoria. Puedes consultarlo en el aviso legal o política de privacidad de la página web oficial de la empresa, en cualquiera de sus facturas emitidas, en el Registro Mercantil o a través del censo telemático del Registro Central de la Agencia Tributaria.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué debo hacer si he introducido mal la letra de mi DNI en la Sede Electrónica?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Las sedes electrónicas oficiales de la Administración General del Estado (AEAT, Seguridad Social, DGT, Ministerios) rechazan automáticamente cualquier formulario si la letra no concuerda matemáticamente con los números. Si la rechaza, comprueba si has omitido los ceros iniciales en DNI antiguos (que deben rellenarse con ceros a la izquierda hasta sumar 8 dígitos).
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
              Gestiona tus documentos oficiales y trámites administrativos con total seguridad.
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
                  Emite facturas profesionales legales con DNI/CIF validados conforme al RD 1619/2012.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Crear factura</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/foto-carnet-dni-pasaporte"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Fotografía</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Foto Carnet DNI y Pasaporte
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Ajusta tus fotos a las medidas oficiales de la Policía Nacional (32x26 mm) listas para imprimir.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Crear fotos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/validador-iban-espana"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Banca SEPA</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Validador IBAN España
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba el dígito de control de cuentas bancarias y encuentra el código BIC/SWIFT.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Validar cuenta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/compresor-pdf-sede-electronica"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Trámites Online</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Compresor PDF Sede Electrónica
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Reduce el tamaño de tus documentos a menos de 2 MB o 5 MB para adjuntar sin error.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Comprimir PDF</span>
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
              <strong>Real Decreto 1553/2005, de 23 de diciembre:</strong> Por el que se regula la expedición del Documento Nacional de Identidad y sus certificados de firma electrónica (BOE núm. 307/2005).
            </li>
            <li>
              <strong>Orden INT/2058/2008, de 14 de julio:</strong> Por la que se modifica la regulación del Número de Identidad de Extranjero (asignación de las letras X, Y y Z).
            </li>
            <li>
              <strong>Real Decreto 1065/2007, de 27 de julio:</strong> Reglamento general de las actuaciones y los procedimientos de gestión e inspección tributaria (regulación del NIF y composición de caracteres).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
