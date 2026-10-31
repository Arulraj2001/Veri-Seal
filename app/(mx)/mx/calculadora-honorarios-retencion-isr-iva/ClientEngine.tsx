'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Receipt,
  FileText,
  DollarSign,
  Building,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function CalculadoraHonorariosMexicoPage() {
  const [modoCalculo, setModoCalculo] = React.useState<'a_partir_bruto' | 'a_partir_neto'>('a_partir_bruto');
  const [montoEntrada, setMontoEntrada] = React.useState<number>(15000);
  const [retencionIsrPorcentaje, setRetencionIsrPorcentaje] = React.useState<number>(10); // 10% Art. 106 LISR o 1.25% RESICO
  const [retencionIvaPorcentaje, setRetencionIvaPorcentaje] = React.useState<number>(10.6667); // 2/3 partes de 16% (Art. 1-A LIVA)
  const [copied, setCopied] = React.useState<boolean>(false);

  // Cálculos de honorarios
  let honorarioSubtotal = 0;
  let ivaTrasladado = 0;
  let retencionIsr = 0;
  let retencionIva = 0;
  let netoPagar = 0;

  if (modoCalculo === 'a_partir_bruto') {
    honorarioSubtotal = montoEntrada;
    ivaTrasladado = honorarioSubtotal * 0.16;
    retencionIsr = honorarioSubtotal * (retencionIsrPorcentaje / 100);
    retencionIva = honorarioSubtotal * (retencionIvaPorcentaje / 100);
    netoPagar = honorarioSubtotal + ivaTrasladado - retencionIsr - retencionIva;
  } else {
    // Cálculo inverso (Gross-up): Neto = Subtotal * (1 + 0.16 - retIsr - retIva)
    const factorNeto = 1 + 0.16 - (retencionIsrPorcentaje / 100) - (retencionIvaPorcentaje / 100);
    honorarioSubtotal = factorNeto > 0 ? montoEntrada / factorNeto : 0;
    ivaTrasladado = honorarioSubtotal * 0.16;
    retencionIsr = honorarioSubtotal * (retencionIsrPorcentaje / 100);
    retencionIva = honorarioSubtotal * (retencionIvaPorcentaje / 100);
    netoPagar = montoEntrada;
  }

  const handleCopy = () => {
    const text = `Desglose Oficial Recibo de Honorarios México 2026 (Art. 106 LISR & Art. 1-A LIVA):
Subtotal Honorarios Brutos: $${honorarioSubtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
+ IVA Trasladado (16%): $${ivaTrasladado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Retención ISR (${retencionIsrPorcentaje}% Art. 106 LISR): $${retencionIsr.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Retención IVA (${retencionIvaPorcentaje.toFixed(4)}% Art. 1-A LIVA 2/3 partes): $${retencionIva.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
==================================================
IMPORTE NETO A DEPOSITAR AL PROFESIONISTA: $${netoPagar.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
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
        name: '¿Por qué las personas morales retienen el 10% de ISR en honorarios?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Artículo 106 último párrafo de la Ley del ISR establece que cuando los contribuyentes profesionistas presten servicios a personas morales, estas deberán retener, como pago provisional, el monto que resulte de aplicar la tasa del 10% sobre el monto de los pagos que les efectúen, sin deducción alguna.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto es la retención de dos terceras partes del IVA en honorarios?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Artículo 1-A fracción II inciso a) de la Ley del IVA y el Artículo 3 del Reglamento de la LIVA, la retención es de dos terceras partes del impuesto que se traslade. Como la tasa del IVA es del 16%, las dos terceras partes equivalen exactamente al 10.6667% sobre el subtotal del honorario.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo calcular el subtotal si acordé un monto neto en mano con el cliente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Se debe realizar un cálculo inverso o gross-up dividiendo el monto neto acordado entre el factor neto 0.953333 (1 + 0.16 IVA - 0.10 retención ISR - 0.106667 retención IVA). Por ejemplo, para cobrar $10,000 netos, debes facturar un subtotal de $10,489.51 MXN.',
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
        <span className="text-slate-900 font-semibold">Fiscal & SAT</span>
        <span>/</span>
        <span className="text-slate-400">Retención de Honorarios</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 106 LISR & Art. 1-A LIVA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Honorarios y Retenciones ISR / IVA México 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calcula el desglose fiscal para recibos de honorarios y facturas CFDI 4.0 emitidas a personas morales con retención del 10% de ISR y 2/3 partes del IVA (10.6667%), o calcula en sentido inverso (Gross-up).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-700" />
              <span>Tipo de Cálculo</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              CFDI 4.0
            </span>
          </div>

          {/* Toggle Modo */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setModoCalculo('a_partir_bruto')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                modoCalculo === 'a_partir_bruto'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              A partir de Bruto
            </button>
            <button
              type="button"
              onClick={() => setModoCalculo('a_partir_neto')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                modoCalculo === 'a_partir_neto'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              A partir de Neto (Gross-up)
            </button>
          </div>

          {/* Monto de Entrada */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              {modoCalculo === 'a_partir_bruto' ? 'Honorarios Subtotal Bruto' : 'Importe Neto Deseado en Mano'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="500"
                step="500"
                value={montoEntrada}
                onChange={(e) => setMontoEntrada(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Tipo de Régimen / Retención ISR */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Régimen Fiscal del Emisor
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRetencionIsrPorcentaje(10)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  retencionIsrPorcentaje === 10
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Actividad Prof. (10% ISR)
              </button>
              <button
                type="button"
                onClick={() => setRetencionIsrPorcentaje(1.25)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  retencionIsrPorcentaje === 1.25
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                RESICO (1.25% ISR)
              </button>
            </div>
          </div>

          {/* Nota Legal */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-700" />
              <span>Regla de Retención de IVA:</span>
            </div>
            <p className="leading-relaxed">
              La persona moral retiene <strong>2/3 partes del IVA trasladado</strong> (10.6667% del subtotal). El profesionista cobra 1/3 parte restante (5.3333%).
            </p>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Importe Neto a Cobrar por Transferencia
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${netoPagar.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Subtotal a Facturar (CFDI)</div>
                <div className="text-base font-black text-white mt-0.5">
                  ${honorarioSubtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Retenciones Totales</div>
                <div className="text-base font-black text-rose-300 mt-0.5">
                  -${(retencionIsr + retencionIva).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Factura / CFDI Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal Honorarios:</span>
                <span className="font-mono font-bold text-white">${honorarioSubtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>(+) IVA Trasladado (16.00%):</span>
                <span className="font-mono font-bold text-white">+${ivaTrasladado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>(-) Retención de ISR ({retencionIsrPorcentaje}% Art. 106 LISR):</span>
                <span className="font-mono font-bold">-${retencionIsr.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>(-) Retención de IVA (10.6667% 2/3 partes Art. 1-A LIVA):</span>
                <span className="font-mono font-bold">-${retencionIva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Total Líquido Recibido en Cuenta:</span>
                <span className="font-mono text-emerald-400 text-base">${netoPagar.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Plantilla Copiable para Facturar */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>Campos Clave para timbrado en SAT CFDI 4.0</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              En tu sistema de facturación o portal del SAT debes capturar: Subtotal = <strong>${honorarioSubtotal.toFixed(2)}</strong>, Impuesto Trasladado IVA 0.160000 = <strong>${ivaTrasladado.toFixed(2)}</strong>, Retención ISR tasa {(retencionIsrPorcentaje / 100).toFixed(6)} = <strong>${retencionIsr.toFixed(2)}</strong>, Retención IVA factor 0.106667 = <strong>${retencionIva.toFixed(2)}</strong>.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Mecanismo Estatutario de Retenciones a Profesionistas en México 2026
        </h2>
        <p>
          En el régimen tributario mexicano, la figura de la <strong>retención en la fuente</strong> constituye un pilar estratégico de fiscalización. Cuando una persona física con actividades profesionales independientes (abogados, contadores, médicos, diseñadores, asesores) emite un Comprobante Fiscal Digital por Internet (CFDI) a favor de una persona moral (empresa legalmente constituida), la ley impone a la empresa la responsabilidad solidaria de detraer una fracción del importe antes de realizar la liquidación.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Retención del Impuesto sobre la Renta (Art. 106 LISR)
        </h3>
        <p>
          El Artículo 106 de la LISR estipula con absoluta claridad que las personas morales que hagan pagos por servicios profesionales a personas físicas deberán retener, como pago provisional a cuenta del impuesto anual, el monto que resulte de aplicar la <strong>tasa del 10%</strong> sobre los honorarios sin deducción alguna. La empresa entrega al profesionista una constancia de retención mediante el propio CFDI timbrado, permitiéndole acreditar dicho impuesto retenido contra sus pagos provisionales mensuales y en su declaración anual definitiva.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Retención de las Dos Terceras Partes del IVA (Art. 1-A LIVA)
        </h3>
        <p>
          En materia de Impuesto al Valor Agregado, el Artículo 1-A fracción II inciso a) de la Ley del IVA señala que están obligadas a retener el gravamen las personas morales que reciban servicios personales independientes. Para determinar el porcentaje exacto, el Artículo 3 del Reglamento de la Ley del IVA aclara que la retención se efectuará por las <strong>dos terceras partes del impuesto que se traslade</strong>:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1 text-slate-800">
          <div>Tasa General de IVA Trasladado = 16.0000%</div>
          <div>Retención a favor del SAT (2/3 partes) = 16% × (2 ÷ 3) = 10.6667% sobre subtotal</div>
          <div>IVA Remanente cobrado por el profesionista (1/3 parte) = 16% × (1 ÷ 3) = 5.3333%</div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. El Fenómeno del Gross-Up o Cálculo Inverso
        </h3>
        <p>
          En la práctica comercial habitual, muchos profesionistas pactan con sus clientes corporativos honorarios en términos netos líquidos (ejemplo: "deseo percibir $20,000 pesos libres de polvo y paja en mi cuenta bancaria"). Sin embargo, emitir la factura por $20,000 brutos provocaría que tras descontar las retenciones del 10% de ISR y el 10.6667% de IVA, el profesionista únicamente reciba $19,066.67 pesos. Mediante la fórmula matemática del gross-up, se divide el monto neto entre <strong>0.953333</strong> para emitir el CFDI por el importe bruto exacto necesario.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Retenciones de Honorarios</span>
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
        <Link href="/mx/calculadora-deducciones-personales-declaracion-anual" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Deducciones Personales Anuales LISR &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

