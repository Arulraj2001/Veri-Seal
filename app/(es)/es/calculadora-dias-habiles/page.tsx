import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainDiasHabilesEngine } from '@/components/international/SpainDiasHabilesEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Calendar, Scale, Clock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora Días Hábiles España 2026 : Plazos Ley 39/2015 | Kagazo',
  description:
    'Calcula fechas límite en días hábiles administrativos y judiciales en España según la Ley 39/2015. Excluye sábados, domingos y festivos oficiales. Tabla de plazos para Hacienda, SMAC, multas DGT y recursos.',
  keywords: [
    'calculadora dias habiles espana 2026',
    'calcular plazo administrativo ley 39 2015 boe',
    'computo dias habiles sabados domingos festivos',
    'fecha limite contestar notificacion hacienda recurso',
    'plazo 20 dias habiles despido smac papeleta',
    'diferencia entre dias habiles y dias naturales',
    'dies a quo dia siguiente notificacion sede electronica',
    'plazos de fecha a fecha meses y anos lpacap',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-dias-habiles`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-dias-habiles`,
      'es': `${SITE_URL}/es/calculadora-dias-habiles`,
      'x-default': `${SITE_URL}/es/calculadora-dias-habiles`,
    },
  },
  openGraph: {
    title: 'Calculadora Días Hábiles España 2026 : Plazos Ley 39/2015',
    description:
      'Calcula la fecha exacta de vencimiento de cualquier plazo administrativo en España excluyendo fines de semana y festivos oficiales.',
    url: `${SITE_URL}/es/calculadora-dias-habiles`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainDiasHabilesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Días Hábiles y Plazos Administrativos España',
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
          'Calculador jurídico de plazos en días hábiles y naturales según las reglas de cómputo del artículo 30 de la Ley 39/2015 del Procedimiento Administrativo Común.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cómputo de Plazos Legales y Administrativos',
        category: 'LegalDeadlinesCalculation',
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
            name: 'Utilidades y Trámites',
            item: `${SITE_URL}/es#tramites-identidad`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Calculadora Días Hábiles',
            item: `${SITE_URL}/es/calculadora-dias-habiles`,
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
            Utilidades y Trámites
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculadora Días Hábiles</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Artículo 30 de la Ley 39/2015 (LPACAP) • Exclusión de Sábados y Festivos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Días Hábiles y Plazos Legales en España (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Determina con absoluta precisión jurídica la fecha exacta de vencimiento para responder a requerimientos de Hacienda, la Seguridad Social, alegaciones de tráfico ante la DGT, recursos de reposición o demandas ante el juzgado y el SMAC.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo se cuentan los días hábiles en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Según el artículo 30 de la Ley 39/2015, los días hábiles se computan <strong>excluyendo del cómputo los sábados, los domingos y los días declarados festivos</strong>. El plazo empieza a contar obligatoriamente a partir del <strong>día siguiente al de la notificación</strong> (el día en que se recibe la carta o notificación telemática no cuenta). Si el último día del plazo es inhábil, <strong>se prorroga automáticamente al primer día hábil siguiente</strong>.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainDiasHabilesEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Plazos Legales y Administrativos más Frecuentes en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterio de cómputo reglamentario para los principales trámites ante organismos públicos y tribunales.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Trámite / Procedimiento</th>
                  <th className="py-3.5 px-4 font-bold">Organismo Competente</th>
                  <th className="py-3.5 px-4 font-bold">Plazo Legal</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Tipo de Días</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Regla de Inicio (Dies a Quo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">Papeleta Conciliación Despido (SMAC)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Servicio Mediación / Juzgado Social</td>
                  <td className="py-3 px-4 font-bold text-red-600">20 días</td>
                  <td className="py-3 px-4 font-bold text-orange-600 font-sans">Hábiles (Excl. fines semana)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Día siguiente a efectos de despido</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Alegaciones a Requerimiento de Hacienda</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Agencia Tributaria (AEAT)</td>
                  <td className="py-3 px-4 font-bold">10 días</td>
                  <td className="py-3 px-4 font-bold text-orange-600 font-sans">Hábiles</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Día siguiente a la notificación</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Recurso de Reposición Tributario</td>
                  <td className="py-3 px-4 font-sans text-slate-600">AEAT / Ayuntamientos</td>
                  <td className="py-3 px-4 font-bold">1 mes</td>
                  <td className="py-3 px-4 font-sans text-slate-900">De fecha a fecha</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Día siguiente a la notificación</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Pago Voluntario Multa DGT (-50%)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Dirección General de Tráfico</td>
                  <td className="py-3 px-4 font-bold text-blue-600">20 días</td>
                  <td className="py-3 px-4 font-bold text-red-700 font-sans">Naturales (Cuenta todo)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Día siguiente a la notificación</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Liquidación ITP Compraventa (Modelo 600)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Hacienda Autonómica</td>
                  <td className="py-3 px-4 font-bold">30 días</td>
                  <td className="py-3 px-4 font-bold text-orange-600 font-sans">Hábiles</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Día siguiente a firma ante notario</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Liquidación Plusvalía Municipal (IIVTNU)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Ayuntamiento correspondiente</td>
                  <td className="py-3 px-4 font-bold">30 días</td>
                  <td className="py-3 px-4 font-bold text-orange-600 font-sans">Hábiles</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Día siguiente a firma de escritura</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Atención: Las multas de tráfico son una de las pocas excepciones legales donde la ley de seguridad vial fija expresamente días naturales.
          </p>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Las Cuatro Reglas de Oro del Cómputo de Plazos en la Ley 39/2015
            </h2>
            <p>
              El cómputo de plazos en el derecho administrativo español es una materia de orden público rigurosa donde un solo día de error puede provocar la inadmisión por extemporaneidad de un recurso o la firmeza de una sanción económica:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Clock className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>1. Los Sábados son Inhábiles</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Con la entrada en vigor de la Ley 39/2015 en octubre de 2016, <strong>los sábados pasaron a ser legalmente inhábiles</strong> en todos los procedimientos administrativos, unificando el cómputo con el de los tribunales de justicia (Ley Orgánica del Poder Judicial). Ni sábados, ni domingos, ni festivos nacionales, autonómicos o locales se cuentan al calcular un plazo fijado en días hábiles.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>2. Regla de Fecha a Fecha en Meses</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Si el plazo está fijado en meses o años (artículo 30.4 LPACAP), no se cuentan los días uno a uno: <strong>se computa de fecha a fecha</strong>. Si una notificación se recibe el 18 de mayo y el plazo es de 1 mes para interponer recurso, el plazo vence exactamente el 18 de junio. Si en el mes de vencimiento no hubiera día equivalente (ej. notificación el 31 de marzo con 1 mes que vence en abril, que tiene 30 días), el plazo expira el último día del mes (30 de abril).
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Scale className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>3. Prórroga por Vencimiento en Inhábil</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Si el día final de vencimiento del plazo (el <em>dies ad quem</em>) coincide con un sábado, domingo o día festivo, <strong>el plazo se entenderá prorrogado automáticamente al primer día hábil siguiente</strong>. Por ejemplo, si un plazo de 1 mes vence en domingo 15, el interesado puede presentar su escrito legalmente hasta las 23:59 horas del lunes 16.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <h3>4. Regla de la Doble Inhabilidad Local</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  El artículo 30.6 de la Ley 39/2015 resuelve el conflicto geográfico de festivos: si un día fuese festivo en el municipio de residencia del ciudadano e inhábil en la sede del ministerio u órgano administrativo que tramita el expediente (o viceversa), <strong>se considerará día inhábil en todo caso</strong> a efectos de cómputo del plazo para el interesado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre el Cómputo de Días Hábiles en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios del Tribunal Supremo y de la Ley 39/2015 del Procedimiento Administrativo Común.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿A qué hora vence exactamente un plazo presentado por la Sede Electrónica?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Los registros electrónicos funcionan ininterrumpidamente las 24 horas del día. Si el plazo vence un día determinado, el escrito puede presentarse válidamente a través de la sede electrónica del organismo hasta las <strong>23:59:59 horas de ese último día hábil</strong>, tomándose como prueba oficial la fecha y hora acreditada por el sello de tiempo del resguardo de entrada emitido por el sistema telemático.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué ocurre si la ley no especifica si los días son hábiles o naturales?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El artículo 30.2 de la Ley 39/2015 establece una presunción legal categórica: <em>"Siempre que por Ley o en el Derecho de la Unión Europea no se exprese otro cómputo, se entiende que los plazos se señalan en días hábiles"</em>. Por consiguiente, ante el silencio normativo, siempre se presume que los días son hábiles y no naturales.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo afecta el mes de agosto en los plazos judiciales y administrativos?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En el ámbito <strong>judicial</strong> (Tribunales de Justicia), todo el mes de agosto es inhábil por imperativo de la Ley Orgánica del Poder Judicial (salvo para actuaciones urgentes de guardia penal o materia de despidos laborales en lo social). Por el contrario, en vía <strong>administrativa general</strong> (Hacienda, Seguridad Social, Ayuntamientos, Ministerios), <strong>el mes de agosto es plenamente hábil</strong> y los plazos administrativos corren con total normalidad.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿El día en que recojo la notificación por correo o en la sede cuenta como día 1?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No, nunca. El artículo 30.3 de la Ley 39/2015 fija con absoluta claridad que los plazos expresados en días se cuentan a partir del <strong>día siguiente a aquel en que tenga lugar la notificación</strong>. Si firmas la recogida de una carta certificada un martes, el día 1 de tu plazo será el miércoles siguiente.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué pasa si la sede electrónica sufre una caída técnica el último día del plazo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El artículo 32.4 de la LPACAP prevé expresamente que cuando una incidencia técnica no imputable al interesado imposibilite el funcionamiento ordinario del registro electrónico, la Administración está obligada a publicar una incidencia oficial y <strong>conceder una prórroga no inferior a los días que haya durado la avería</strong>.
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
              Prepara tus trámites legales y recursos administrativos en plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/compresor-pdf-sede-electronica"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Sedes Online</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Compresor PDF Sede Electrónica
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Reduce tus escritos de recurso a menos de 2 MB o 5 MB para adjuntarlos sin error.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Comprimir PDF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-finiquito-despido"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Demanda Laboral</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora de Finiquito
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula tu indemnización y vigila el plazo de 20 días hábiles para impugnar el despido.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular despido</span>
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
                  Ajusta la extensión de tus escritos de alegaciones a los límites de caracteres de las sedes.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Contar texto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-itp-gastos-compraventa"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Plazo 30 Días</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Gastos e ITP Compraventa
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Controla la fecha límite para presentar el Modelo 600 tras la firma de tu vivienda.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular ITP</span>
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
              <strong>Ley 39/2015, de 1 de octubre:</strong> Del Procedimiento Administrativo Común de las Administraciones Públicas (artículos 30 y 31: cómputo de plazos y funcionamiento de registros).
            </li>
            <li>
              <strong>Ley Orgánica 6/1985, de 1 de julio:</strong> Del Poder Judicial (artículos 182 a 185: días y horas hábiles en los juzgados y tribunales de justicia).
            </li>
            <li>
              <strong>Secretaría de Estado de Función Pública:</strong> Resolución anual por la que se establece el calendario de días inhábiles en el ámbito de la Administración General del Estado.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
