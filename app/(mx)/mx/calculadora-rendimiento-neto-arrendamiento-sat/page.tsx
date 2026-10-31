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
  Percent,
  Coins,
  TrendingUp,
  Scale,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function RendimientoArrendamientoMexicoPage() {
  const [valorInmueble, setValorInmueble] = React.useState<number>(3000000);
  const [rentaMensual, setRentaMensual] = React.useState<number>(18000);
  const [predialAnual, setPredialAnual] = React.useState<number>(6500);
  const [gastosMantenimientoAnuales, setGastosMantenimientoAnuales] = React.useState<number>(12000);
  const [rentaAPersonaMoral, setRentaAPersonaMoral] = React.useState<boolean>(false);
  const [esComercialConIva, setEsComercialConIva] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Renta anual bruta
  const rentaAnualBruta = rentaMensual * 12;

  // 1. DEDUCCIÓN CIEGA (Art. 115 LISR: 35% de ingresos + Predial)
  const deduccionCiega35 = rentaAnualBruta * 0.35;
  const totalDeduccionCiega = deduccionCiega35 + predialAnual;
  const baseGravableCiega = Math.max(0, rentaAnualBruta - totalDeduccionCiega);

  // 2. DEDUCCIÓN COMPROBADA (Gastos reales + Predial + Depreciación 5% construcción ~70% del valor total)
  const valorConstruccion = valorInmueble * 0.70;
  const depreciacionFiscalCincoPorciento = valorConstruccion * 0.05;
  const totalDeduccionComprobada = gastosMantenimientoAnuales + predialAnual + depreciacionFiscalCincoPorciento;
  const baseGravableComprobada = Math.max(0, rentaAnualBruta - totalDeduccionComprobada);

  // Elección del régimen más ventajoso (menor base gravable)
  const metodoOptimo = baseGravableCiega <= baseGravableComprobada ? 'ciega' : 'comprobada';
  const mejorBaseGravable = Math.min(baseGravableCiega, baseGravableComprobada);

  // ISR Anual Estimado (Tasa progresiva promedio ~17% - 25%)
  const tasaIsrEstimada = rentaAnualBruta > 400000 ? 0.2352 : 0.1792;
  const isrAnualEstimado = mejorBaseGravable * tasaIsrEstimada;

  // Retención 10% si renta a persona moral (Art. 116 LISR)
  const retencionIsrMoral = rentaAPersonaMoral ? rentaAnualBruta * 0.10 : 0;
  const isrNetoAPagar = Math.max(0, isrAnualEstimado - retencionIsrMoral);

  // Flujo de caja neto anual y Cap Rate (Tasa de Rentabilidad Neta)
  const gastosOperativosAnuales = predialAnual + gastosMantenimientoAnuales;
  const ingresoNetoEfectivoAnual = rentaAnualBruta - gastosOperativosAnuales - isrAnualEstimado;
  const capRateNeto = valorInmueble > 0 ? (ingresoNetoEfectivoAnual / valorInmueble) * 100 : 0;
  const capRateBruto = valorInmueble > 0 ? (rentaAnualBruta / valorInmueble) * 100 : 0;

  const handleCopy = () => {
    const text = `Simulación de Rendimiento Neto Arrendamiento SAT México 2026 (Art. 115 LISR):
Valor del Inmueble: $${valorInmueble.toLocaleString('es-MX')} MXN | Renta Mensual: $${rentaMensual.toLocaleString('es-MX')} MXN
Renta Bruta Anual: $${rentaAnualBruta.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

--- COMPARATIVA FISCAL ART. 115 LISR ---
Opción 1: Deducción Ciega (35% + Predial): Base Gravable de $${baseGravableCiega.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Opción 2: Gastos Comprobados (Gastos + Depreciación 5%): Base Gravable de $${baseGravableComprobada.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Estrategia Fiscal Más Conveniente: ${metodoOptimo === 'ciega' ? 'DEDUCCIÓN CIEGA (35%)' : 'DEDUCCIÓN COMPROBADA'}

ISR Anual Estimado: $${isrAnualEstimado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Ingreso Neto Líquido Anual: $${ingresoNetoEfectivoAnual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Cap Rate Bruto: ${capRateBruto.toFixed(2)}% anual | CAP RATE NETO REAL: ${capRateNeto.toFixed(2)}% anual`;
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
        name: '¿Qué es la deducción ciega del 35% en rentas ante el SAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Artículo 115 de la Ley del ISR otorga a los propietarios que rentan inmuebles la opción de deducir el 35% directo sobre el importe de las rentas cobradas, sin necesidad de presentar comprobantes de gastos de mantenimiento, más el monto del impuesto predial pagado en el año.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuándo conviene la deducción comprobada con depreciación del 5%?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conviene cuando el inmueble tuvo remodelaciones sustanciales o cuando la depreciación fiscal anual del 5% de la construcción más los intereses hipotecarios reales y gastos de mantenimiento superan el 35% de los ingresos de renta.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Las rentas de casa habitación pagan IVA en México?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. El arrendamiento de inmuebles destinados exclusivamente a casa habitación está exento de IVA conforme al Artículo 20 fracción II de la Ley del IVA. El IVA del 16% solo se causa si el inmueble se renta amueblado, o si se destina a locales comerciales, bodegas u oficinas.',
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
        <span className="text-slate-400">Rendimiento Arrendamiento</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 115 LISR & Deducción Ciega 35%</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Rendimiento Neto de Arrendamiento y Deducción Ciega 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Compara la deducción opcional ciega del 35% frente a gastos comprobados y depreciación del 5%, calcula el ISR definitivo del SAT y determina el Cap Rate neto real de tu inmueble.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-700" />
              <span>Valores del Inmueble</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Art. 115
            </span>
          </div>

          {/* Valor Propiedad */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Valor Comercial del Inmueble
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="500000"
                step="250000"
                value={valorInmueble}
                onChange={(e) => setValorInmueble(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Renta Mensual */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Renta Mensual Cobrada
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="2000"
                step="1000"
                value={rentaMensual}
                onChange={(e) => setRentaMensual(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
            <p className="text-[11px] text-slate-500">Ingreso bruto anual: ${rentaAnualBruta.toLocaleString('es-MX')} MXN.</p>
          </div>

          {/* Predial y Mantenimiento */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Predial Anual
              </label>
              <input
                type="number"
                min="0"
                value={predialAnual}
                onChange={(e) => setPredialAnual(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Mantenimiento Anual
              </label>
              <input
                type="number"
                min="0"
                value={gastosMantenimientoAnuales}
                onChange={(e) => setGastosMantenimientoAnuales(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
            </div>
          </div>

          {/* Opciones Fiscales */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rentaAPersonaMoral}
                onChange={(e) => setRentaAPersonaMoral(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
              />
              <span className="text-xs font-bold text-slate-800">El inquilino es Persona Moral (Retención 10%)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={esComercialConIva}
                onChange={(e) => setEsComercialConIva(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
              />
              <span className="text-xs font-bold text-slate-800">Inmueble Comercial o Amueblado (Graba IVA 16%)</span>
            </label>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Cap Rate Neto Real Anual
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1 flex items-baseline gap-2">
                  <span>{capRateNeto.toFixed(2)}%</span>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    (Bruto: {capRateBruto.toFixed(2)}%)
                  </span>
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
                <div className="text-[11px] text-slate-400 font-medium">Ingreso Neto en Mano Anual</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  ${ingresoNetoEfectivoAnual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">ISR Anual Estimado SAT</div>
                <div className="text-base font-black text-rose-300 mt-0.5">
                  ${isrAnualEstimado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Comparativa de Opciones */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Comparativa de Deducción Art. 115 LISR:
              </div>
              <div className={`flex justify-between p-2 rounded-xl border ${metodoOptimo === 'ciega' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                <span>Opción 1: Deducción Ciega (35% + Predial):</span>
                <span className="font-mono font-bold">Base: ${baseGravableCiega.toLocaleString('es-MX', { minimumFractionDigits: 2 })} {metodoOptimo === 'ciega' && '(Recomendada)'}</span>
              </div>
              <div className={`flex justify-between p-2 rounded-xl border ${metodoOptimo === 'comprobada' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                <span>Opción 2: Deducción Comprobada + Deprec. 5%:</span>
                <span className="font-mono font-bold">Base: ${baseGravableComprobada.toLocaleString('es-MX', { minimumFractionDigits: 2 })} {metodoOptimo === 'comprobada' && '(Recomendada)'}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Diagnóstico de Optimización Fiscal</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Para este nivel de rentas y gastos, te conviene aplicar la modalidad de <strong>{metodoOptimo === 'ciega' ? 'Deducción Ciega del 35%' : 'Deducción Comprobada con Depreciación del 5%'}</strong>, reduciendo tu base gravable sujeta a ISR a <strong>${mejorBaseGravable.toLocaleString('es-MX', { minimumFractionDigits: 2 })} pesos</strong>.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          El Régimen Fiscal de Arrendamiento Inmobiliario en México (Art. 115 LISR)
        </h2>
        <p>
          Las personas físicas que obtengan ingresos por otorgar el uso o goce temporal de bienes inmuebles (arrendamiento de casas habitación, departamentos, oficinas, locales comerciales o naves industriales) están sujetas al régimen cedular del Capítulo III del Título IV de la Ley del ISR. La ley confiere un beneficio singular que permite tributar sin la carga administrativa de recabar comprobantes de gastos.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. La Deducción Ciega u Opcional del 35%
        </h3>
        <p>
          El segundo párrafo del Artículo 115 prevé que los contribuyentes podrán optar por deducir el <strong>35% de los ingresos totales obtenidos</strong>, en sustitución de las deducciones a que tienen derecho. Además de este 35% directo, la ley autoriza deducir el importe de las contribuciones locales pagadas sobre la propiedad, principalmente el <strong>Impuesto Predial</strong> y las mejoras de obras públicas.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. La Deducción Comprobada y la Depreciación de Construcciones
        </h3>
        <p>
          Como alternativa a la deducción ciega, el arrendador puede optar por deducir los gastos reales comprobados con factura CFDI:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Impuesto predial del año.</li>
          <li>Gastos de mantenimiento y conservación que no impliquen adición o mejora al inmueble.</li>
          <li>Intereses reales devengados por préstamos hipotecarios invertidos en la compra o remodelación del inmueble.</li>
          <li>
            <strong>Deducción de Inversiones (Depreciación):</strong> Deducción anual del <strong>5%</strong> del valor de las construcciones fijas (no del terreno), o bien el 10% si se trata de activos muebles indispensables.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Retención del 10% de ISR por Personas Morales (Art. 116 LISR)
        </h3>
        <p>
          En los casos en que el inquilino sea una Persona Moral (empresa), esta se encuentra obligada a retener el 10% sobre el monto de las rentas brutas pagadas como pago provisional acreditable a cuenta del ISR anual del arrendador.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Rendimiento de Arrendamiento</span>
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
        <Link href="/mx/validador-generador-curp-oficial" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Validador y Generador CURP &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

