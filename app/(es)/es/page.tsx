import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  FileCheck2,
  Sliders,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calculator,
  Percent,
  Home,
  FileText,
  Camera,
  Coins,
  Scale,
  Fuel,
  Calendar,
  Type,
  Tag,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Herramientas Oficiales España 2026 | Calculadoras y Trámites',
  description:
    'Suite de 20 herramientas de cálculo oficiales para España: IRPF 2026, sueldo neto, jubilación, finiquito, hipoteca Euríbor, ITP, foto DNI y facturas en PDF.',
  alternates: {
    canonical: `${SITE_URL}/es`,
  },
};

export default function SpanishHubPage() {
  const categories = [
    {
      id: 'laboral',
      title: '1. Laboral, Nóminas y Fiscalidad',
      description: 'Cálculos conforme a la Ley del IRPF, cuotas de autónomos RETA 2026 y Estatuto de los Trabajadores.',
      icon: Briefcase,
      tools: [
        {
          title: 'Calculadora de Sueldo Neto 2026',
          desc: 'Simula tu salario neto en 12 o 14 pagas con retención de IRPF autonómica y Seguridad Social.',
          href: '/es/calculadora-sueldo-neto',
          badge: 'Top 100k+',
        },
        {
          title: 'Calculadora IRPF y Cuota Autónomos',
          desc: 'Tramos por ingresos reales (Real Decreto-ley 13/2022), tarifa plana y liquidación Modelo 130.',
          href: '/es/calculadora-irpf-autonomos',
          badge: 'Autónomos RETA',
        },
        {
          title: 'Calculadora de Finiquito y Despido',
          desc: 'Indemnización de 33 días (improcedente), 20 días (objetivo) y liquidación de vacaciones no disfrutadas.',
          href: '/es/calculadora-finiquito-despido',
          badge: 'Laboral',
        },
        {
          title: 'Calculadora de Jubilación y Pensión',
          desc: 'Edad legal de jubilación 2026, base reguladora (últimos 25 años) y pensión bruta en 14 pagas.',
          href: '/es/calculadora-jubilacion-pension',
          badge: 'Seguridad Social',
        },
        {
          title: 'Calculador de Horas Extras y Recargos',
          desc: 'Precio legal de la hora ordinaria, recargo mínimo del 75% diurno, 100% festivo y tope de 80 horas.',
          href: '/es/calculador-horas-extras',
          badge: 'Art. 35 ET',
        },
      ],
    },
    {
      id: 'inmobiliario',
      title: '2. Inmobiliario, Alquiler e Hipotecas',
      description: 'Simuladores hipotecarios con Euríbor, gastos de compraventa e índices de la Ley de Vivienda.',
      icon: Building2,
      tools: [
        {
          title: 'Calculadora de Hipotecas y Euríbor',
          desc: 'Cuota mensual fija o variable (Euríbor + diferencial) por sistema de amortización francés.',
          href: '/es/calculadora-hipoteca-euribor',
          badge: 'Alta demanda',
        },
        {
          title: 'Gastos e ITP Compraventa Vivienda',
          desc: 'Impuesto de Transmisiones Patrimoniales (4% a 10% por CC.AA.), aranceles de notaría y registro.',
          href: '/es/calculadora-itp-gastos-compraventa',
          badge: '17 Autonomías',
        },
        {
          title: 'Calculadora Plusvalía Municipal (IIVTNU)',
          desc: 'Doble comparativa legal: Método Objetivo vs Plusvalía Real. Exención por venta a pérdidas.',
          href: '/es/calculadora-plusvalia-municipal',
          badge: 'RD-ley 26/2021',
        },
        {
          title: 'Actualizador de Alquiler con IPC / IRA',
          desc: 'Aplica el tope legal de actualización del 3% fijado por la Ley de Vivienda sobre tu renta mensual.',
          href: '/es/actualizador-alquiler-ipc',
          badge: 'Ley de Vivienda',
        },
        {
          title: 'Simulador Rentabilidad Neta Alquiler',
          desc: 'Rendimiento bruto y neto (ROE) tras restar IBI, comunidad, seguros y reducción del 50% en IRPF.',
          href: '/es/simulador-rentabilidad-alquiler',
          badge: 'Inversores',
        },
      ],
    },
    {
      id: 'tramites',
      title: '3. Trámites Oficiales y Documentación',
      description: 'Validaciones algorítmicas oficiales, generación de facturas y formatos para la Administración.',
      icon: FileCheck2,
      tools: [
        {
          title: 'Validador de DNI, NIE y CIF',
          desc: 'Comprobación matemática instantánea del dígito de control según el algoritmo Módulo 23.',
          href: '/es/validador-dni-nie-cif',
          badge: 'Policía Nacional',
        },
        {
          title: 'Generador de Facturas Gratis en PDF',
          desc: 'Emite facturas legales conforme al RD 1619/2012 y Ley Crea y Crece con IVA e IRPF desglosado.',
          href: '/es/generador-factura-pdf',
          badge: 'Factura Electrónica',
        },
        {
          title: 'Foto Carnet DNI y Pasaporte (32x26mm)',
          desc: 'Encuadra cualquier fotografía y descarga la plantilla de 8 fotos lista para imprimir en 10×15 cm.',
          href: '/es/foto-carnet-dni-pasaporte',
          badge: 'Estándar 300 DPI',
        },
        {
          title: 'Validador de IBAN y Banco Emisor',
          desc: 'Verifica los 24 caracteres del IBAN (MOD-97-10) e identifica el banco (Santander, BBVA, CaixaBank).',
          href: '/es/validador-iban-espana',
          badge: 'Banco de España',
        },
        {
          title: 'Compresor PDF Sede Electrónica (<2MB)',
          desc: 'Reduce el peso de tus documentos PDF para que los registros telemáticos no los rechacen.',
          href: '/es/compresor-pdf-sede-electronica',
          badge: 'DGT / AEAT / SS',
        },
      ],
    },
    {
      id: 'utilidades',
      title: '4. Utilidades Prácticas y Conversión',
      description: 'Herramientas cotidianas de cálculo rápido ejecutadas 100% en la memoria de tu navegador.',
      icon: Sliders,
      tools: [
        {
          title: 'Calculadora de IVA Trimestral (Mod. 303)',
          desc: 'Resta el IVA soportado en gastos del IVA devengado en ventas (21%, 10%, 4%) para saber qué pagas.',
          href: '/es/calculadora-iva-trimestral',
          badge: 'Modelo 303',
        },
        {
          title: 'Calculadora Gasolina y Coste Trayecto',
          desc: 'Calcula litros consumidos y divide el gasto exacto de combustible y peajes por pasajero.',
          href: '/es/calculadora-precio-gasolina-viaje',
          badge: 'Compartir coche',
        },
        {
          title: 'Calculadora de Días Hábiles vs Naturales',
          desc: 'Cómputo de plazos según el Art. 30 de la Ley 39/2015 excluyendo fines de semana y festivos.',
          href: '/es/calculadora-dias-habiles',
          badge: 'Ley 39/2015',
        },
        {
          title: 'Contador de Palabras y Caracteres',
          desc: 'Conteo en tiempo real con o sin espacios, párrafos y tiempo estimado de lectura en minutos.',
          href: '/es/contador-palabras-caracteres',
          badge: 'En vivo',
        },
        {
          title: 'Calculadora de Descuentos y Rebajas',
          desc: 'Descubre el precio final rebajado y el dinero que te ahorras en cualquier promoción comercial.',
          href: '/es/calculadora-descuentos-rebajas',
          badge: 'Rebajas',
        },
      ],
    },
  ];

  const allTools = categories.flatMap((c) => c.tools);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Portal Oficial de Herramientas y Calculadoras en España 2026',
        url: `${SITE_URL}/es`,
        description:
          '20 herramientas y calculadoras estatutarias oficiales para España 2026: Sueldo neto, IRPF autónomos, Despido e indemnización, Hipoteca Euríbor e ITP compraventa.',
        inLanguage: 'es-ES',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Kagazo',
          url: SITE_URL,
        },
      },
      {
        '@type': 'ItemList',
        name: 'Calculadoras y Herramientas España',
        numberOfItems: allTools.length,
        itemListElement: allTools.map((t, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: t.title,
          url: `${SITE_URL}${t.href}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-bold text-orange-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>20 Herramientas Oficiales Actualizadas a la Normativa 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Portal Oficial de Herramientas y Calculadoras en España
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Calculadoras legales, tributarias, laborales e hipotecarias gratuitas con ejecución directa en la memoria
            de tu navegador. Sin registros, sin suscripciones y sin enviar tus datos privados a servidores externos.
          </p>
        </div>

        {/* 4 Categorized Sections */}
        <div className="space-y-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <section key={cat.id} className="space-y-6 pt-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-900 font-black text-xl sm:text-2xl tracking-tight">
                      <Icon className="w-6 h-6 text-orange-600" />
                      <h2>{cat.title}</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500">{cat.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.tools.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="group p-6 rounded-3xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-md hover:border-orange-300 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200/60 font-mono">
                            {t.badge}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {t.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-orange-600">
                        <span>Abrir herramienta</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 shadow-2xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block text-sm">Privacidad 100% en tu navegador</span>
              <span>Todos los cálculos salariales, catastrales y bancarios se realizan en tu dispositivo. Cumplimiento total del RGPD.</span>
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-400 shrink-0">
            BOE &middot; Agencia Tributaria &middot; Seguridad Social 2026
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
