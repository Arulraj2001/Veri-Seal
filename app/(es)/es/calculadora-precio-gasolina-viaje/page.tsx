import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainGasolinaEngine } from '@/components/international/SpainGasolinaEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Car, Users, Fuel } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Gasolina y Coste de Viaje 2026 : Dividir Gastos | Kagazo',
  description:
    'Calcula gratis cuánto cuesta la gasolina de tu viaje en coche en España. Desglosa consumo a los 100 km, peajes y divide el coste exacto entre los pasajeros. Tabla de rutas oficiales y dietas de kilometraje (0,26 €/km).',
  keywords: [
    'calculadora gasolina viaje coche espana 2026',
    'calcular coste trayecto compartir coche blablacar',
    'gasto combustible por kilometro calcular',
    'dividir gastos viaje gasolina peajes pasajeros',
    'precio kilometraje empresa 0.26 euros hacienda',
    'cuanto cuesta ir de madrid a barcelona en coche',
    'consumo litros a los 100 km gasolina diesel',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
      'es': `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
      'x-default': `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
    },
  },
  openGraph: {
    title: 'Calculadora de Gasolina y Coste de Viaje 2026 : Dividir Gastos',
    description:
      'Calcula el gasto total de combustible y peajes en carretera y divide el importe por pasajero de forma justa y equitativa.',
    url: `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainGasolinaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Gasolina y Coste de Viaje en Coche',
        applicationCategory: 'TravelApplication',
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
          'Calculadora de gasto en carburante y peajes por trayecto kilométrico para reparto equitativo de gastos de viaje y cálculo de dietas de kilometraje oficial.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Costes de Movilidad y Kilometraje',
        category: 'TravelExpenseCalculation',
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
            name: 'Coste Gasolina y Viaje',
            item: `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
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
          <span className="text-slate-900 font-bold">Coste Gasolina y Viaje</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reparto Equitativo de Gastos & Kilometraje Oficial Hacienda (Orden HFP/792/2023)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Gasolina y Coste de Viaje en Coche (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula los litros exactos de carburante que consumirá tu vehículo y el gasto total en euros según los kilómetros del trayecto. Añade peajes y divide el coste de forma justa entre todos los ocupantes del coche o calcula tu compensación de kilometraje profesional a 0,26 €/km.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo calcular el gasto de gasolina de un viaje?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Para un trayecto de <strong>600 km</strong> (ej. Madrid a Barcelona) en un coche con un consumo medio de <strong>6,5 litros a los 100 km</strong> con carburante a <strong>1,65 €/litro</strong>, el consumo total es de <strong>39 litros</strong>, con un coste en gasolina de <strong>64,35 €</strong>. Al viajar 4 personas en el vehículo, el importe equitativo a pagar es de <strong>16,09 € por pasajero</strong> (más la parte proporcional de peajes si los hubiera).
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainGasolinaEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Rutas Habituales en España y Coste Estimado de Viaje
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Cálculo con un consumo mixto estándar de 6,5 L/100 km y precio medio de referencia de 1,65 €/litro.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Ruta Principal</th>
                  <th className="py-3.5 px-4 font-bold">Distancia (km)</th>
                  <th className="py-3.5 px-4 font-bold">Litros Consumidos</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Coste Combustible Total</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900">Coste por Persona (2 Ocupantes)</th>
                  <th className="py-3.5 px-4 font-bold text-emerald-700">Coste por Persona (4 Ocupantes)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold font-sans">Madrid – Barcelona</td>
                  <td className="py-3 px-4">620 km</td>
                  <td className="py-3 px-4 text-slate-600">40,30 L</td>
                  <td className="py-3 px-4 font-bold text-orange-600">66,50 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">33,25 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">16,62 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Madrid – Valencia</td>
                  <td className="py-3 px-4">360 km</td>
                  <td className="py-3 px-4 text-slate-600">23,40 L</td>
                  <td className="py-3 px-4 font-bold text-orange-600">38,61 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">19,30 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">9,65 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Madrid – Sevilla</td>
                  <td className="py-3 px-4">535 km</td>
                  <td className="py-3 px-4 text-slate-600">34,78 L</td>
                  <td className="py-3 px-4 font-bold text-orange-600">57,38 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">28,69 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">14,35 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Barcelona – Valencia</td>
                  <td className="py-3 px-4">350 km</td>
                  <td className="py-3 px-4 text-slate-600">22,75 L</td>
                  <td className="py-3 px-4 font-bold text-orange-600">37,54 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">18,77 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">9,38 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Madrid – Bilbao</td>
                  <td className="py-3 px-4">400 km</td>
                  <td className="py-3 px-4 text-slate-600">26,00 L</td>
                  <td className="py-3 px-4 font-bold text-orange-600">42,90 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">21,45 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">10,73 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold font-sans">Madrid – La Coruña</td>
                  <td className="py-3 px-4">590 km</td>
                  <td className="py-3 px-4 text-slate-600">38,35 L</td>
                  <td className="py-3 px-4 font-bold text-orange-600">63,28 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">31,64 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">15,82 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dietas Oficiales de Kilometraje: El Límite de 0,26 €/km en el IRPF
            </h2>
            <p>
              Cuando un trabajador o autónomo utiliza su vehículo particular para realizar desplazamientos por motivos laborales encomendados por la empresa, la indemnización que percibe por los kilómetros recorridos goza de una exención tributaria especial:
            </p>
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <p className="font-bold text-slate-900 font-sans">Normativa del Ministerio de Hacienda (Orden HFP/792/2023):</p>
              <p>• La cuantía exenta de tributar en el IRPF y de cotizar a la Seguridad Social es de <strong>0,26 € por kilómetro recorrido</strong>.</p>
              <p>• Además del kilometraje exento, la empresa puede abonar y compensar íntegramente los gastos de <strong>peajes de autopista y aparcamiento</strong> con justificante o ticket reglamentario sin tributar.</p>
              <p className="text-slate-600 font-sans text-xs pt-1">
                Los 0,26 €/km no solo retribuyen el combustible gastado, sino que están calculados para absorber el desgaste de neumáticos, seguro obligatorio, depreciación del coche y revisiones mecánicas periódicas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Fuel className="w-5 h-5 text-orange-600 shrink-0" />
                <h3>Consejos de Conducción Eficiente (Ahorro del 20%)</h3>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li><strong>Velocidad constante:</strong> Circular a 120 km/h en autovía en lugar de 140 km/h reduce el gasto de carburante hasta un 25% sin apenas variar el tiempo de llegada.</li>
                <li><strong>Presión de neumáticos:</strong> Rodar con 0,5 bares menos de presión incrementa el consumo entre un 2% y un 4% y acelera el desgaste de las ruedas.</li>
                <li><strong>Uso inteligente del aire acondicionado:</strong> A más de 80 km/h en carretera es mucho más eficiente llevar el climatizador encendido que circular con las ventanillas bajadas, que aumentan drásticamente la resistencia aerodinámica.</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Users className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3>Reglas Clave para Compartir Coche sin Lucro</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                En la legislación de transportes de España, compartir coche entre particulares (como en BlaBlaCar o viajes con amigos) es totalmente legal siempre que <strong>no exista ánimo de lucro comercial</strong>. La aportación de los pasajeros solo puede cubrir los costes directos del trayecto (combustible y peajes compartidos a partes iguales). Cobrar una cantidad superior al coste real convertiría la actividad en transporte público ilegal de viajeros sujeto a severas sanciones administrativas.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre el Consumo de Combustible y Viajes en Coche
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criterios prácticos para el cálculo de consumo real y dietas laborales en España.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Por qué el coche gasta más en un viaje real que lo homologado en la ficha técnica?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El consumo homologado por los fabricantes según el ciclo WLTP se mide en condiciones de laboratorio ideales. En un viaje real intervienen factores que incrementan el gasto entre un 10% y un 25%: el peso de los pasajeros y el equipaje en el maletero, la orografía montañosa, el viento en contra, el uso continuado de la climatización y mantener una velocidad de 120 km/h sostenida en autopista.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué justificantes exige Hacienda a la empresa para no tributar el kilometraje?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Para que la compensación de 0,26 €/km no se considere retribución en especie sujeta a retención de IRPF, la empresa debe conservar una <strong>hoja de liquidación de gastos</strong> firmada donde conste: la fecha exacta del desplazamiento, el motivo profesional de la visita (visita a cliente, reunión, obra), el lugar de origen y destino, y los kilómetros recorridos acreditados.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿El conductor debe pagar también su parte al dividir los gastos del viaje?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                En el uso compartido social de vehículos, la costumbre habitual y justa es dividir el total de gasolina y peajes entre <strong>todos los ocupantes incluyendo al conductor</strong>. En viajes largos, muchos grupos acuerdan que el conductor pague una proporción menor para compensar el desgaste de su propio coche y el esfuerzo de la conducción.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Dónde puedo consultar el precio actualizado de la gasolina en mi ruta?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El Ministerio para la Transición Ecológica y el Reto Demográfico (MITECO) mantiene actualizado en tiempo real el <strong>Geoportal de Gasolineras</strong> oficial del Estado, donde todas las estaciones de servicio de España están obligadas a comunicar sus precios diarios de gasolina 95, diésel y GLP.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Cómo afecta llevar una baca o cofre portaequipajes en el techo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Instalar un cofre o portaequipajes en el techo rompe el coeficiente aerodinámico del vehículo, provocando un aumento del consumo de combustible de entre un <strong>15% y un 35% en autovía</strong> a 120 km/h. Se aconseja retirarlo inmediatamente una vez concluido el viaje.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas de Movilidad, Consumo y Finanzas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Planifica tus presupuestos de desplazamiento y deducciones fiscales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/calculadora-dias-habiles"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Calendario</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Días Hábiles
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula puentes, festivos autonómicos y días laborables para tus escapadas por carretera.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver festivos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-descuentos-rebajas"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Ahorro</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Descuentos
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Aplica descuentos porcentuales en carburante y promociones en compras de viaje.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular rebaja</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-sueldo-neto"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Presupuesto</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Calcula tus ingresos limpios mensuales para presupuestar tus vacaciones y viajes.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver nómina</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-iva-trimestral"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Deducciones</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora IVA Trimestral
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Deduce el 50% del IVA de la gasolina en tu liquidación trimestral de autónomo.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular IVA</span>
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
              <strong>Orden HFP/792/2023, de 12 de julio:</strong> Por la que se revisa la cuantía de la indemnización por uso de vehículo particular en el IRPF (elevación a 0,26 € por kilómetro recorrido).
            </li>
            <li>
              <strong>Dirección General de Tráfico (DGT):</strong> Guía de conducción eficiente y consumo de carburante en autovías y autopistas.
            </li>
            <li>
              <strong>Ministerio para la Transición Ecológica y el Reto Demográfico (MITECO):</strong> Geoportal oficial de precios de hidrocarburos en estaciones de servicio españolas.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
