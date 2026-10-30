import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, CheckCircle2, FileCheck, ArrowRight, ShieldCheck, Sparkles, Receipt, FileText, UserCheck } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Herramientas y Calculadoras Laborales Online Gratis | Kagazo España',
  description:
    'Colección de calculadoras y herramientas laborales gratuitas para trabajadores y autónomos en España: sueldo neto, IRPF 2026, finiquito, factura PDF y DNI/NIE.',
  alternates: {
    canonical: `${SITE_URL}/es`,
  },
};

export default function SpanishHubPage() {
  const tools = [
    {
      title: 'Calculadora de Sueldo Neto 2026',
      desc: 'Calcula exactamente cuánto vas a cobrar al mes limpio según tu salario bruto anual, retención del IRPF por comunidad autónoma y cotizaciones a la Seguridad Social (12 o 14 pagas).',
      href: '/es/calculadora-sueldo-neto',
      tag: 'Más popular',
      highlight: true,
    },
    {
      title: 'Calculadora IRPF y Cuota Autónomos',
      desc: 'Simula tus ingresos limpios, la cuota mensual a la Seguridad Social por rendimientos reales (15 tramos 2026) y el pago fraccionado trimestral del Modelo 130.',
      href: '/es/calculadora-irpf-autonomos',
      tag: 'Autónomos RETA',
      highlight: true,
    },
    {
      title: 'Calculadora de Finiquito y Despido',
      desc: 'Calcula el finiquito y la indemnización legal por despido improcedente (33 días), objetivo (20 días) o fin de contrato temporal según el Estatuto de los Trabajadores.',
      href: '/es/calculadora-finiquito-despido',
      tag: 'Laboral',
      highlight: false,
    },
    {
      title: 'Generador de Facturas Gratis PDF',
      desc: 'Crea y descarga al instante facturas comerciales en formato PDF con desglose de IVA (21%, 10%, 4%) y retención de IRPF para autónomos y pymes.',
      href: '/es/generador-factura-pdf',
      tag: 'Factura Electrónica',
      highlight: false,
    },
    {
      title: 'Validador de DNI, NIE y CIF',
      desc: 'Comprobación matemática instantánea del dígito de control de documentos de identidad españoles según el algoritmo Módulo 23 de la Policía Nacional y Agencia Tributaria.',
      href: '/es/validador-dni-nie-cif',
      tag: 'Algoritmo oficial',
      highlight: false,
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-bold text-orange-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Actualizado a la normativa tributaria y laboral 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Herramientas de Precisión Laboral y Fiscal en España
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Calculadoras y utilidades gratuitas con cálculo exacto en memoria del navegador. Sin registros, sin suscripciones y sin enviar tus datos a servidores externos.
          </p>
        </div>

        {/* Minimalist Editorial Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`group p-6 sm:p-7 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                t.highlight
                  ? 'bg-white border-orange-200 shadow-sm hover:shadow-md hover:border-orange-400'
                  : 'bg-white border-slate-200 shadow-2xs hover:shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                    {t.tag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {t.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-orange-600">
                <span>Acceder a la herramienta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Privacidad 100% en tu navegador</span>
              <span>Los salarios y cifras introducidas jamás se almacenan ni se transmiten. Cumplimiento total RGPD.</span>
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-400 shrink-0">
            Normativa Agencia Tributaria &middot; 2026
          </div>
        </div>
      </div>
    </div>
  );
}
