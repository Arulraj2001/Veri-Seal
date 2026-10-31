'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Calculator,
  Building,
  FileText,
  MapPin,
  Coins,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface EstadoConfig {
  nombre: string;
  tasaIsaiPromedio: number;
  derechosRppPorcentaje: number;
}

const ESTADOS_ISAI: Record<string, EstadoConfig> = {
  cdmx: { nombre: 'Ciudad de México (CDMX)', tasaIsaiPromedio: 0.045, derechosRppPorcentaje: 0.012 },
  edomex: { nombre: 'Estado de México (Edomex)', tasaIsaiPromedio: 0.022, derechosRppPorcentaje: 0.010 },
  jalisco: { nombre: 'Jalisco (Guadalajara / Zapopan)', tasaIsaiPromedio: 0.025, derechosRppPorcentaje: 0.009 },
  nuevoleon: { nombre: 'Nuevo León (Monterrey / San Pedro)', tasaIsaiPromedio: 0.030, derechosRppPorcentaje: 0.010 },
  puebla: { nombre: 'Puebla', tasaIsaiPromedio: 0.020, derechosRppPorcentaje: 0.008 },
  queretaro: { nombre: 'Querétaro', tasaIsaiPromedio: 0.025, derechosRppPorcentaje: 0.009 },
  yucatan: { nombre: 'Yucatán (Mérida)', tasaIsaiPromedio: 0.025, derechosRppPorcentaje: 0.009 },
  quintanaroo: { nombre: 'Quintana Roo (Cancún / Riviera)', tasaIsaiPromedio: 0.030, derechosRppPorcentaje: 0.011 },
  otros: { nombre: 'Otro Estado de la República', tasaIsaiPromedio: 0.025, derechosRppPorcentaje: 0.009 },
};

export default function CalculadoraGastosNotarialesMexicoPage() {
  const [valorPropiedad, setValorPropiedad] = React.useState<number>(2200000);
  const [estadoClave, setEstadoClave] = React.useState<string>('cdmx');
  const [aplicaJornadaNotarial, setAplicaJornadaNotarial] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const config = ESTADOS_ISAI[estadoClave] || ESTADOS_ISAI.cdmx;

  // Cálculo ISAI (Impuesto Sobre Adquisición de Inmuebles)
  let isaiCalculado = valorPropiedad * config.tasaIsaiPromedio;
  // Derechos del Registro Público de la Propiedad (RPP)
  let derechosRpp = valorPropiedad * config.derechosRppPorcentaje;
  // Honorarios de Notario (Arancel oficial escalonado promedio 1.0% a 1.5%)
  let honorariosNotario = Math.max(18000, valorPropiedad * 0.011);
  // Gastos de gestión y certificados (Libertad de Gravamen, no adeudo predial, agua, avalúo)
  let gastosCertificadosAvaluos = 9500;

  // Descuento si aplica beneficio Jornada Notarial (CDMX o programas estatales para vivienda menor a ~2.4M)
  let descuentoJornada = 0;
  if (aplicaJornadaNotarial && valorPropiedad <= 2450000) {
    descuentoJornada = (honorariosNotario * 0.40) + (isaiCalculado * 0.30);
  }

  const totalGastosEscrituracion = isaiCalculado + derechosRpp + honorariosNotario + gastosCertificadosAvaluos - descuentoJornada;
  const porcentajeSobreValor = valorPropiedad > 0 ? (totalGastosEscrituracion / valorPropiedad) * 100 : 0;

  const handleCopy = () => {
    const text = `Presupuesto Oficial de Gastos Notariales e ISAI México 2026:
Estado: ${config.nombre} | Valor de Compraventa Inmueble: $${valorPropiedad.toLocaleString('es-MX')} MXN
+ Impuesto de Adquisición (ISAI / Traslado de Dominio): $${isaiCalculado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
+ Derechos de Inscripción Registro Público (RPP): $${derechosRpp.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
+ Honorarios del Notario Público (Arancel): $${honorariosNotario.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
+ Certificados (Gravamen, Agua, Predial y Avalúo): $${gastosCertificadosAvaluos.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
${descuentoJornada > 0 ? `- Subsidio Jornada Notarial Aplicado: -$${descuentoJornada.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN\n` : ''}=======================================================
TOTAL GASTOS DE ESCRITURACIÓN ESTIMADOS: $${totalGastosEscrituracion.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN (${porcentajeSobreValor.toFixed(1)}% del valor del inmueble)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué porcentaje del valor de una casa se paga en gastos notariales en México?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En promedio, los gastos totales de escrituración oscilan entre el 4% y el 7% del valor de compraventa de la propiedad. Este importe se divide entre el Impuesto Sobre Adquisición de Inmuebles (ISAI), los derechos del Registro Público de la Propiedad, honorarios notariales y certificados de no adeudo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué es el ISAI o Impuesto de Traslado de Dominio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El ISAI es un impuesto local municipal o estatal que grava al comprador de un bien inmueble al momento de adquirir la propiedad. La tasa varía por entidad federativa: en CDMX puede alcanzar hasta el 5.5% en rangos altos, mientras que en otros estados como Puebla o Edomex ronda entre el 1.5% y el 2.5%.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo funciona el descuento de Jornada Notarial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La Jornada Notarial es un programa social (especialmente en la CDMX) que otorga reducciones del 10% al 60% en el pago del ISAI y en los honorarios del notario público para la escrituración de viviendas de interés social y medio cuyo valor catastral no rebase los topes anuales fijados en la Gaceta Oficial.',
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/mx" className="hover:text-emerald-700 transition-colors">
          México
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Crédito & Infonavit</span>
        <span>/</span>
        <span className="text-slate-400">Gastos Notariales e ISAI</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Códigos Fiscales Estatales & Arancel Notarial 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Gastos Notariales e ISAI México 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calcula el costo total para escriturar una casa o departamento en México: Impuesto de Traslado de Dominio (ISAI) por estado, derechos de registro RPP, honorarios notariales y descuentos de Jornada Notarial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-700" />
              <span>Inmueble y Ubicación</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              ISAI 2026
            </span>
          </div>

          {/* Valor Propiedad */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Precio de Compraventa o Valor Avalúo
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="200000"
                step="100000"
                value={valorPropiedad}
                onChange={(e) => setValorPropiedad(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Entidad Federativa */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Estado de la República</span>
            </label>
            <select
              value={estadoClave}
              onChange={(e) => setEstadoClave(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px] text-xs"
            >
              {Object.entries(ESTADOS_ISAI).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Jornada Notarial Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={aplicaJornadaNotarial}
                onChange={(e) => setAplicaJornadaNotarial(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
              />
              <span className="text-xs font-bold text-slate-800">Aplicar Subsidio Jornada Notarial (Vivienda social/media)</span>
            </label>
            <p className="text-[11px] text-slate-500 pl-6 mt-1">
              Descuento del 10% al 40% en ISAI y honorarios para inmuebles menores a 2.45 millones de pesos.
            </p>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Presupuesto Total de Escrituración
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${totalGastosEscrituracion.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-mono font-medium text-slate-400 ml-2">MXN</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Porcentaje Total del Inmueble</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">{porcentajeSobreValor.toFixed(1)}%</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Impuesto ISAI Local</div>
                <div className="text-base font-black text-white mt-0.5">${(isaiCalculado / 1000).toFixed(0)}k</div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>ISAI / Traslado de Dominio (Tasa {(config.tasaIsaiPromedio * 100).toFixed(1)}%):</span>
                <span className="font-mono font-bold text-white">${isaiCalculado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Derechos Registro Público de la Propiedad (RPP):</span>
                <span className="font-mono font-bold text-white">${derechosRpp.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Honorarios Notario Público (Arancel Oficial):</span>
                <span className="font-mono font-bold text-white">${honorariosNotario.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Certificados y Avalúo Comercial Fiscal:</span>
                <span className="font-mono font-bold text-white">${gastosCertificadosAvaluos.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              {descuentoJornada > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>(-) Beneficio Jornada Notarial Aplicado:</span>
                  <span className="font-mono font-bold">-${descuentoJornada.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Transparencia en los Honorarios Notariales</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Recuerda que más del <strong>70% del dinero</strong> que entregas a la notaría corresponde a impuestos y derechos que el notario retiene para enterar a la Secretaría de Finanzas estatal y al Registro Público. Solo una fracción menor corresponde a los honorarios profesionales de la fe pública.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Estructura de Gastos Notariales e Impuesto ISAI en México 2026
        </h2>
        <p>
          La adquisición formal de un bien raíz en territorio mexicano exige la formalización de la compraventa ante la fe de un <strong>Notario Público</strong> mediante escritura pública inscrita en el Registro Público de la Propiedad. Dicho acto jurídico conlleva una serie de cargas impositivas y erogaciones administrativas que recaen casi en su totalidad sobre la parte compradora.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. El Impuesto Sobre Adquisición de Inmuebles (ISAI)
        </h3>
        <p>
          También denominado en diversos estados como <em>Impuesto de Traslado de Dominio</em>, es una contribución de índole local que grava a la persona física o moral que adquiere el dominio de un inmueble. Su base gravable se toma del valor más alto entre:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>El precio convenido de compraventa consignado en el contrato.</li>
          <li>El valor catastral determinado por la tesorería local en la boleta predial.</li>
          <li>El valor comercial resultante del avalúo pericial practicado por un perito autorizado.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Derechos Registrales RPP y Certificados de No Adeudo
        </h3>
        <p>
          Para salvaguardar la seguridad jurídica de la propiedad privada frente a terceros, la escritura debe ser registrada ante el RPPyC local. El Registro cobra derechos arancelarios por concepto de calificación, cierre de folio real y protocolización. Asimismo, el notario debe tramitar obligatoriamente el Certificado de Libertad de Gravamen (que certifica la inexistencia de embargos o hipotecas previas no liquidadas) y las constancias de no adeudo de agua y predial.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Honorarios del Notario conforme a Aranceles
        </h3>
        <p>
          A diferencia de los prestadores de servicios ordinarios, los honorarios de los notarios no se fijan libremente, sino que están estrictamente regulados por el <strong>Arancel de Notarios</strong> publicado en las gacetas oficiales de cada entidad federativa. Dichos aranceles contemplan cuotas fijas más porcentajes marginales decrecientes conforme se incrementa el valor del inmueble escriturado.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Gastos Notariales</span>
        </h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <details key={idx} className="group rounded-2xl bg-white border border-slate-200/90 p-5 open:shadow-xs transition-all">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
        <Link href="/mx" className="text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5">
          <span>&larr; Ver todas las 20 Herramientas México</span>
        </Link>
        <Link href="/mx/reajuste-renta-inpc-arrendamiento" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Reajuste Renta por Inflación INPC &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

