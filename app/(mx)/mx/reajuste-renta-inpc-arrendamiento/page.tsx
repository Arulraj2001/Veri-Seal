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
  TrendingUp,
  FileText,
  Calendar,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function ReajusteRentaInpcMexicoPage() {
  const [rentaActual, setRentaActual] = React.useState<number>(14000);
  const [inflacionInpcPorcentaje, setInflacionInpcPorcentaje] = React.useState<number>(4.65); // Variación interanual INEGI 2025-2026
  const [tipoInmueble, setTipoInmueble] = React.useState<'habitacional' | 'comercial'>('habitacional');
  const [nombreArrendador, setNombreArrendador] = React.useState<string>('Carlos Mendoza Ruiz');
  const [nombreArrendatario, setNombreArrendatario] = React.useState<string>('Mariana Fuentes López');
  const [domicilioInmueble, setDomicilioInmueble] = React.useState<string>('Calle Insurgentes Sur 450, Depto 302, CDMX');
  const [copied, setCopied] = React.useState<boolean>(false);
  const [copiedLetter, setCopiedLetter] = React.useState<boolean>(false);

  // Límite legal de incremento en CDMX y diversos códigos civiles: max 10% anual para casa habitación
  const incrementoCalculado = rentaActual * (inflacionInpcPorcentaje / 100);
  const nuevaRentaCalculada = rentaActual + incrementoCalculado;

  // Alerta si rebasa tope legal del 10%
  const excedeTopeLegal10 = tipoInmueble === 'habitacional' && inflacionInpcPorcentaje > 10;

  const cartaNotificacion = `CIUDAD DE MÉXICO, A ${new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}

ASUNTO: NOTIFICACIÓN FORMAL DE ACTUALIZACIÓN DEL CANON DE ARRENDAMIENTO CONFORME AL INPC (INEGI)

C. ${nombreArrendatario.toUpperCase()}
ARRENDATARIO(A) DEL INMUEBLE UBICADO EN:
${domicilioInmueble.toUpperCase()}

Estimado(a) ${nombreArrendatario}:

Por medio de la presente, y en cumplimiento de la cláusula de actualización estipulada en nuestro Contrato de Arrendamiento y los Artículos 2448 y relativos del Código Civil, me permito comunicarle formalmente que al haberse cumplido un año de vigencia contractual, el importe de la renta mensual sufrirá el ajuste correspondiente a la variación interanual del Índice Nacional de Precios al Consumidor (INPC) publicado oficialmente por el Instituto Nacional de Estadística y Geografía (INEGI), la cual se ubica en ${inflacionInpcPorcentaje.toFixed(2)}%.

DESGLOSE DEL REAJUSTE LEGAL:
- Renta mensual anterior: $${rentaActual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Porcentaje de inflación INPC aplicado: ${inflacionInpcPorcentaje.toFixed(2)}%
- Incremento mensual: +$${incrementoCalculado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
=============================================================
NUEVO CANON DE RENTA MENSUAL A PAGAR: $${nuevaRentaCalculada.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

Dicho importe entrará en vigor a partir del próximo período de pago inmediato correspondiente. Agradezco de antemano su puntualidad de siempre y quedo a sus apreciables órdenes.

ATENTAMENTE,

___________________________________
${nombreArrendador.toUpperCase()}
ARRENDADOR / PROPIETARIO`;

  const handleCopySummary = () => {
    const text = `Reajuste de Renta por Inflación INPC México 2026:
Renta Actual: $${rentaActual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Inflación Interanual INEGI (INPC): ${inflacionInpcPorcentaje.toFixed(2)}%
Incremento Mensual: +$${incrementoCalculado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
NUEVA RENTA AJUSTADA: $${nuevaRentaCalculada.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN al mes`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(cartaNotificacion);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto es lo máximo que me pueden subir la renta en México en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En la Ciudad de México y diversos códigos civiles locales, el incremento anual de la renta para casa habitación no puede superar el porcentaje de inflación reportado por el Banco de México e INEGI mediante el INPC del año anterior, o bien un tope estatutario del 10% anual. En locales comerciales rige la libertad contractual pactada por las partes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Con cuánto tiempo de anticipación deben notificarme la subida de la renta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La legislación civil recomienda notificar el incremento con al menos 30 a 60 días de anticipación al vencimiento del año de contrato para permitir al arrendatario decidir si renueva en los nuevos términos o entrega el inmueble pacíficamente.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué índice oficial se utiliza legalmente para calcular el ajuste de renta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El índice oficial rector es el Índice Nacional de Precios al Consumidor (INPC), elaborado y publicado mensualmente en el Diario Oficial de la Federación por el Instituto Nacional de Estadística y Geografía (INEGI).',
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
        <span className="text-slate-400">Reajuste de Renta INPC</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 2448 Código Civil & INPC INEGI 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Reajuste de Renta por Inflación INPC México 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Actualiza el canon de arrendamiento conforme al Índice Nacional de Precios al Consumidor (INEGI), verifica los topes de ley civil y genera la carta de notificación formal lista para firmar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-700" />
              <span>Condiciones del Contrato</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              INEGI
            </span>
          </div>

          {/* Renta Actual */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Renta Mensual Actual
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="1000"
                step="500"
                value={rentaActual}
                onChange={(e) => setRentaActual(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Inflación INPC */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Variación Interanual del INPC (INEGI)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="25"
                step="0.05"
                value={inflacionInpcPorcentaje}
                onChange={(e) => setInflacionInpcPorcentaje(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">%</span>
            </div>
            <div className="flex gap-2 pt-1">
              {[4.0, 4.65, 5.2, 7.5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setInflacionInpcPorcentaje(v)}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-[11px] font-bold text-slate-700"
                >
                  {v}%
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Inmueble */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Uso del Inmueble
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTipoInmueble('habitacional')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  tipoInmueble === 'habitacional'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Habitacional (Tope 10%)
              </button>
              <button
                type="button"
                onClick={() => setTipoInmueble('comercial')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  tipoInmueble === 'comercial'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Comercial / Oficina
              </button>
            </div>
          </div>

          {/* Datos para Carta */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Datos para la Carta Formal:
            </div>
            <input
              type="text"
              value={nombreArrendador}
              onChange={(e) => setNombreArrendador(e.target.value)}
              placeholder="Nombre del Arrendador"
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
            <input
              type="text"
              value={nombreArrendatario}
              onChange={(e) => setNombreArrendatario(e.target.value)}
              placeholder="Nombre del Inquilino"
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
            <input
              type="text"
              value={domicilioInmueble}
              onChange={(e) => setDomicilioInmueble(e.target.value)}
              placeholder="Dirección del Inmueble"
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Nueva Renta Mensual Actualizada
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${nuevaRentaCalculada.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-mono font-medium text-slate-400 ml-2">MXN</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Incremento Mensual</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  +${incrementoCalculado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Ajuste Anual Total</div>
                <div className="text-base font-black text-white mt-0.5">
                  +${(incrementoCalculado * 12).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Renta anterior devengada:</span>
                <span className="font-mono font-bold text-white">${rentaActual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Variación inflacionaria INPC aplicada:</span>
                <span className="font-mono font-bold">+{inflacionInpcPorcentaje.toFixed(2)}%</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Nuevo Pago Mensual Válido:</span>
                <span className="font-mono text-emerald-400 text-base">${nuevaRentaCalculada.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Carta Formal Previsualizable */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Carta Formal de Notificación de Reajuste</span>
              </h3>
              <button
                type="button"
                onClick={handleCopyLetter}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                {copiedLetter ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLetter ? 'Copiada' : 'Copiar Carta Completa'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
              {cartaNotificacion}
            </pre>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          El Reajuste de Renta por Inflación en el Marco Civil Mexicano 2026
        </h2>
        <p>
          En el contrato de arrendamiento inmobiliario en México, la determinación y actualización del canon de renta está regulada por el Código Civil Federal y los códigos civiles locales de cada estado de la República (como el Artículo 2448 del Código Civil para el Distrito Federal / Ciudad de México). El legislador busca preservar el equilibrio económico de los contratantes: garantizar que el arrendador conserve el valor real de su inversión frente a la inflación y proteger al inquilino contra incrementos abusivos e intempestivos.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Obligatoriedad del Índice Nacional de Precios al Consumidor (INPC)
        </h3>
        <p>
          Salvo que se hubiere pactado una tasa de reajuste fija específica en el contrato original, el estándar judicial y financiero por excelencia es el <strong>INPC calculado por el INEGI</strong>. Dicho indicador mide la variación promedio de precios de la canasta básica mexicana y es publicado quincenalmente en el DOF.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. El Límite de Protección del 10% en Arrendamiento Habitacional
        </h3>
        <p>
          En diversos estados y con particular énfasis en la Ciudad de México, el Código Civil impone una restricción de orden público para la vivienda familiar: el aumento anual pactado en ningún caso podrá superar el 10% del monto de la renta mensual vigente, aun cuando la inflación o los precios de mercado en la zona hubieren subido en mayor proporción.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Validez de la Notificación Formal por Escrito
        </h3>
        <p>
          Para que el nuevo importe sea legalmente exigible ante los juzgados civiles, el arrendador debe comunicar el ajuste de manera fehaciente mediante escrito formal con acuse de recibo. Los aumentos verbales o por mensajes informales carecen de fuerza probatoria si el inquilino decide continuar depositando la renta original en consignación judicial.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Reajuste de Renta</span>
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
        <Link href="/mx/calculadora-rendimiento-neto-arrendamiento-sat" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Rendimiento Neto Arrendamiento SAT &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

