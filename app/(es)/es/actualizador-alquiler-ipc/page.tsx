import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainAlquilerIpcEngine } from '@/components/international/SpainAlquilerIpcEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Home, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Actualizador de Alquiler IPC 2026 : Tope 3% Ley de Vivienda | Kagazo',
  description:
    'Calcula la subida legal de tu alquiler en España en 2026 según el tope legal del 3% de la Ley de Vivienda y el IPC. Tabla de incrementos, requisitos de notificación y modelo de carta.',
  keywords: [
    'actualizador alquiler ipc 2026',
    'calcular subida alquiler ley vivienda tope 3 por ciento',
    'cuanto puede subir el alquiler el casero 2026',
    'simulador incremento renta arrendamiento lau',
    'notificacion subida alquiler burofax 30 dias',
    'zona tensionada tope alquiler gran tenedor',
    'actualizacion retroactiva alquiler prohibida',
    'indice alquiler ine sustituto ipc',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/actualizador-alquiler-ipc`,
    languages: {
      'es-ES': `${SITE_URL}/es/actualizador-alquiler-ipc`,
      'es': `${SITE_URL}/es/actualizador-alquiler-ipc`,
      'x-default': `${SITE_URL}/es/actualizador-alquiler-ipc`,
    },
  },
  openGraph: {
    title: 'Actualizador de Alquiler IPC 2026 : Tope 3% Ley de Vivienda',
    description:
      'Calcula la actualización anual de la renta de alquiler conforme a la Ley de Vivienda y el tope legal vigente.',
    url: `${SITE_URL}/es/actualizador-alquiler-ipc`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainAlquilerIpcPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Actualizador de Alquiler e IPC España 2026',
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
          'Simulador de actualización de rentas de arrendamiento conforme al artículo 18 de la LAU y el límite del 3% fijado en la Ley 12/2023 por el Derecho a la Vivienda.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Actualización de Renta de Arrendamiento',
        category: 'RentIndexationCalculation',
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
            name: 'Actualizador de Alquiler',
            item: `${SITE_URL}/es/actualizador-alquiler-ipc`,
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
          <span className="text-slate-900 font-bold">Actualizador de Alquiler</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ley 12/2023 por el Derecho a la Vivienda • Artículo 18 LAU</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Actualizador de Alquiler IPC 2026 : Tope Legal del 3% y Nueva Renta
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula con total rigor jurídico cuánto puede subir legalmente la renta mensual de un alquiler en España. Conoce el límite legal máximo del 3% establecido por la Ley de Vivienda, los plazos de preaviso de 30 días obligatorios y los requisitos formales de la notificación.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cuánto puede subir legalmente un alquiler en 2026?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Por imperativo de la Ley de Vivienda (Ley 12/2023), la subida anual del alquiler de vivienda habitual está <strong>topada legalmente en un máximo del 3%</strong>, independientemente de que el IPC sea mayor. Para una renta de <strong>900 € al mes</strong>, el incremento máximo permitido es de <strong>27 €/mes</strong> (quedando la nueva renta en 927 €/mes o 324 € más al año). El casero debe notificarlo por escrito con <strong>30 días de antelación</strong>; si no avisa en plazo, no puede aplicar la subida con carácter retroactivo.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainAlquilerIpcEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Subidas Máximas de Alquiler con el Tope del 3% (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Impacto económico mensual y anual según la renta actual de tu contrato de arrendamiento.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Renta Actual Mensual</th>
                  <th className="py-3.5 px-4 font-bold">Subida Moderada (2,0%)</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Subida Tope Legal (3,0%)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Nueva Renta Mensual (Tope 3%)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600">Coste Adicional Anual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">650 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">+13,00 €/mes</td>
                  <td className="py-3 px-4 font-bold text-orange-600">+19,50 €/mes</td>
                  <td className="py-3 px-4 font-bold text-slate-900">669,50 € / mes</td>
                  <td className="py-3 px-4 text-slate-700">234,00 € / año</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">800 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">+16,00 €/mes</td>
                  <td className="py-3 px-4 font-bold text-orange-600">+24,00 €/mes</td>
                  <td className="py-3 px-4 font-bold text-slate-900">824,00 € / mes</td>
                  <td className="py-3 px-4 text-slate-700">288,00 € / año</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">950 € / mes (Media España)</td>
                  <td className="py-3 px-4 text-slate-600">+19,00 €/mes</td>
                  <td className="py-3 px-4 font-bold text-orange-600">+28,50 €/mes</td>
                  <td className="py-3 px-4 font-bold text-slate-900">978,50 € / mes</td>
                  <td className="py-3 px-4 text-slate-700">342,00 € / año</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">1.200 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">+24,00 €/mes</td>
                  <td className="py-3 px-4 font-bold text-orange-600">+36,00 €/mes</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.236,00 € / mes</td>
                  <td className="py-3 px-4 text-slate-700">432,00 € / año</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">1.500 € / mes</td>
                  <td className="py-3 px-4 text-slate-600">+30,00 €/mes</td>
                  <td className="py-3 px-4 font-bold text-orange-600">+45,00 €/mes</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.545,00 € / mes</td>
                  <td className="py-3 px-4 text-slate-700">540,00 € / año</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Nota: Si el contrato de alquiler no contiene una cláusula expresa que prevea la actualización anual de la renta, el casero no puede aplicar ningún incremento en virtud del artículo 18.1 de la LAU.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reglas Obligatorias para Actualizar la Renta según la LAU
            </h2>
            <p>
              El régimen de arrendamientos urbanos en España es imperativo y protege los derechos de los inquilinos. Ningún propietario puede aplicar una subida unilateral sin cumplir tres requisitos legales infranqueables:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <FileText className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. Cláusula Contractual</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  El artículo 18.1 de la LAU es taxativo: <strong>a falta de pacto expreso, no se aplicará revisión de rentas</strong>. Si tu contrato firmado no menciona explícitamente que la renta se actualizará, la cantidad permanece congelada durante los 5 años obligatorios de prórroga legal.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. Periodicidad Anual</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  La renta únicamente puede ser revisada <strong>una vez cada doce meses</strong>, en la fecha en que se cumpla cada año de vigencia del contrato de arrendamiento. Están terminantemente prohibidas las revisiones semestrales o trimestrales en vivienda habitual.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Landmark className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>3. Notificación Previa (30 Días)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  El arrendador debe comunicar la subida por escrito (burofax, carta certificada o correo acordado) expresando el porcentaje aplicado. La notificación debe recibirse con <strong>al menos un mes de antelación</strong> al cobro del recibo correspondiente.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Prohibición de Subidas Retroactivas: ¿Qué dice la jurisprudencia?
            </h2>
            <p>
              Uno de los conflictos más habituales ocurre cuando el arrendador olvida notificar la subida al cumplirse el año de contrato y, varios meses después, exige al inquilino que le abone de golpe los atrasos de los meses anteriores.
            </p>
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                La Subida Solo es Exigible a Futuro:
              </p>
              <p>
                La ley y la doctrina de las Audiencias Provinciales son unánimes: <strong>la actualización de la renta nunca tiene efectos retroactivos</strong>. Si el contrato vencía en enero y el casero notifica la subida en mayo, solo podrá cobrar la nueva renta a partir de la mensualidad de junio. Todos los meses transcurridos sin notificación previa se consolidan al precio antiguo y el propietario pierde irremediablemente el derecho a reclamar los atrasos.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre la Subida del Alquiler en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales fundadas en la Ley de Arrendamientos Urbanos y la Ley de Vivienda 12/2023.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué diferencia hay entre pequeño propietario y gran tenedor ante la subida?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Si el arrendador es un <strong>pequeño tenedor</strong> (menos de 5 viviendas en zona de mercado tensionado o menos de 10 en total), el incremento de la renta será el que resulte del nuevo pacto entre las partes. Sin embargo, a falta de pacto, la variación nunca puede superar el tope legal del <strong>3%</strong>. Si el arrendador es un <strong>gran tenedor</strong>, la subida máxima es obligatoriamente el 3% por ley, sin que quepa pacto en contrario.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué validez tiene un mensaje de WhatsApp para notificar la subida?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El artículo 18.2 de la LAU exige que la notificación conste "por escrito". Si bien los tribunales han admitido WhatsApp o correos electrónicos cuando ese canal estaba estipulado expresamente en el contrato y el inquilino responde confirmando su recepción, el medio más seguro jurídicamente para el casero es el <strong>burofax con acuse de recibo y certificación de texto</strong> o carta certificada.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puede el casero subir el alquiler más del 3% si ha hecho reformas en el piso?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Solo una vez transcurridos los primeros <strong>5 años de contrato obligatorio</strong> (o 7 años si el arrendador es empresa), el casero puede elevar la renta por obras de mejora (artículo 19 LAU), aplicando un porcentaje sobre el capital invertido (descontando subvenciones públicas) con un tope del 20% de incremento de la renta mensual. Durante los primeros 5 años de contrato, las obras de mejora no dan derecho a subir la renta.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué ocurre si el IPC publicado por el INE es negativo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Si el contrato de alquiler estipula que la renta se actualiza conforme a la variación general del IPC y este experimenta una tasa negativa (deflación), <strong>la renta debe bajar</strong> en esa misma proporción en beneficio del inquilino, salvo que el contrato contenga una cláusula que fije que "en caso de IPC negativo la renta no se modificará".
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cuántos años de alquiler obligatorio tengo garantizados por ley?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El artículo 9 de la LAU otorga al inquilino el derecho a prorrogar el contrato anualmente hasta un mínimo de <strong>5 años si el casero es persona física</strong> (o <strong>7 años si es persona jurídica</strong>), con independencia de que el contrato inicial se haya firmado por solo 1 año. Llegado el quinto año, si ninguna parte avisa con antelación, el contrato se prorroga tácitamente por otros 3 años adicionales.
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
              Analiza los rendimientos de tu vivienda y tributos inmobiliarios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  Calcula el yield neto y el impacto de los gastos de comunidad e IBI en el retorno de tu piso.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular rentabilidad</span>
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
                  Comprueba si te compensa seguir alquilando o comprar vivienda propia calculando la cuota.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular hipoteca</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-itp-gastos-compraventa"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Compraventa</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Gastos e ITP Compraventa
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Conoce los impuestos autonómicos al comprar tu primera vivienda en España.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular ITP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-sueldo-neto"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Economía Doméstica</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula qué porcentaje de tu nómina limpia mensual destinas al pago de tu alquiler.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver nómina</span>
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
              <strong>Ley 12/2023, de 24 de mayo:</strong> Por el derecho a la vivienda (BOE núm. 124/2023), límites a la actualización de rentas y régimen de contención de precios.
            </li>
            <li>
              <strong>Ley 29/1994, de 24 de noviembre:</strong> De Arrendamientos Urbanos (LAU), artículo 18 (Actualización de la renta) y artículo 9 (Plazo mínimo).
            </li>
            <li>
              <strong>Instituto Nacional de Estadística (INE):</strong> Índice de Precios de Consumo (IPC) y nuevo Índice de Referencia para la Actualización Anual de los Contratos de Arrendamiento de Vivienda.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
