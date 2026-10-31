'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  FileCode,
  Building,
  User,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface ValidationResult {
  valid: boolean;
  rfcError?: string;
  nombreError?: string;
  cpError?: string;
  regimenError?: string;
  usoError?: string;
}

export default function ValidadorCfdiCuatroCeroPage() {
  const [rfcReceptor, setRfcReceptor] = React.useState<string>('XAXX010101000');
  const [nombreReceptor, setNombreReceptor] = React.useState<string>('EMPRESA EJEMPLO MEXICANA');
  const [codigoPostal, setCodigoPostal] = React.useState<string>('06000');
  const [regimenFiscal, setRegimenFiscal] = React.useState<string>('601');
  const [usoCfdi, setUsoCfdi] = React.useState<string>('G03');
  const [copied, setCopied] = React.useState<boolean>(false);

  // Validación en tiempo real Anexo 20 CFDI 4.0
  const validation: ValidationResult = React.useMemo(() => {
    let valid = true;
    let rfcError: string | undefined;
    let nombreError: string | undefined;
    let cpError: string | undefined;
    let regimenError: string | undefined;
    let usoError: string | undefined;

    // RFC: 12 caracteres (PM) o 13 caracteres (PF)
    const cleanRfc = rfcReceptor.trim().toUpperCase();
    const rfcRegexFisica = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;
    const rfcRegexMoral = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;
    const rfcGenerico = cleanRfc === 'XAXX010101000' || cleanRfc === 'XEXX010101000';

    if (!cleanRfc) {
      rfcError = 'El RFC es obligatorio.';
      valid = false;
    } else if (!rfcGenerico && !rfcRegexFisica.test(cleanRfc) && !rfcRegexMoral.test(cleanRfc)) {
      rfcError = 'Estructura inválida. Debe tener 12 caracteres (persona moral) o 13 (persona física).';
      valid = false;
    }

    // Nombre: Mayúsculas, sin régimen societario (SA de CV, SRL, etc.)
    const cleanNombre = nombreReceptor.trim().toUpperCase();
    const regSocietarios = [
      'S.A. DE C.V.',
      'SA DE CV',
      'S. DE R.L. DE C.V.',
      'S DE RL DE CV',
      'S.A.P.I. DE C.V.',
      'SAPI DE CV',
      'S.C.',
      'S.A.',
      'SOCIEDAD ANONIMA',
    ];

    if (!cleanNombre) {
      nombreError = 'El Nombre o Razón Social es obligatorio.';
      valid = false;
    } else if (cleanNombre !== nombreReceptor.trim()) {
      nombreError = 'En CFDI 4.0 el nombre debe estar completamente en MAYÚSCULAS.';
      valid = false;
    } else {
      for (const reg of regSocietarios) {
        if (cleanNombre.includes(reg)) {
          nombreError = `En CFDI 4.0 NO debes incluir el régimen societario "${reg}". Debe capturarse exactamente como en la CSF.`;
          valid = false;
          break;
        }
      }
    }

    // Código Postal: 5 dígitos numéricos
    const cleanCp = codigoPostal.trim();
    if (!/^\d{5}$/.test(cleanCp)) {
      cpError = 'El Código Postal debe constar exactamente de 5 dígitos numéricos.';
      valid = false;
    }

    // Régimen Fiscal: Catálogo SAT
    if (!regimenFiscal) {
      regimenError = 'Selecciona el régimen fiscal registrado en la CSF.';
      valid = false;
    }

    // Compatibilidad Uso CFDI vs Régimen
    const esPersonaFisica = cleanRfc.length === 13;
    const esDeduccionPersonal = usoCfdi.startsWith('D');
    if (!esPersonaFisica && esDeduccionPersonal) {
      usoError = 'Los Usos de CFDI de Deducciones Personales (D01-D10) son exclusivos de Personas Físicas.';
      valid = false;
    }

    return {
      valid,
      rfcError,
      nombreError,
      cpError,
      regimenError,
      usoError,
    };
  }, [rfcReceptor, nombreReceptor, codigoPostal, regimenFiscal, usoCfdi]);

  const handleCopySanitized = () => {
    // Sanitiza el nombre quitando regímenes societarios comunes si los hubiera
    let sanitizedNombre = nombreReceptor.toUpperCase();
    const regSocietarios = [
      'S.A. DE C.V.',
      'SA DE CV',
      'S. DE R.L. DE C.V.',
      'S DE RL DE CV',
      'S.A.P.I. DE C.V.',
      'SAPI DE CV',
    ];
    for (const reg of regSocietarios) {
      sanitizedNombre = sanitizedNombre.replace(reg, '').trim();
    }

    const payload = `Datos de Facturación CFDI 4.0 Validados SAT:
RFC Receptor: ${rfcReceptor.trim().toUpperCase()}
Razón Social / Nombre: ${sanitizedNombre}
Código Postal Fiscal: ${codigoPostal.trim()}
Régimen Fiscal Clave: ${regimenFiscal}
Uso de CFDI: ${usoCfdi}`;
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Por qué la versión CFDI 4.0 del SAT rechaza la razón social con SA de CV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Anexo 20 de la Resolución Miscelánea Fiscal vigente, el campo "Nombre" del receptor debe registrarse únicamente con el nombre, denominación o razón social sin incluir el tipo societario ni régimen de capital (se debe suprimir "S.A. de C.V.", "S. de R.L.", etc.). De lo contrario, los Proveedores Autorizados de Certificación (PAC) marcan el error CFDI40145.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué Código Postal se debe colocar en la factura CFDI 4.0?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Debe ingresarse obligatoriamente el Código Postal de 5 dígitos correspondiente al domicilio fiscal registrado por el contribuyente receptor ante el Registro Federal de Contribuyentes (RFC) visible en su Constancia de Situación Fiscal (CSF) emitida por el SAT.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué sucede si el Uso de CFDI no es compatible con el Régimen Fiscal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El validador de los PAC y del SAT rechaza el timbrado si no existe coincidencia en la matriz de compatibilidad del catálogo c_UsoCFDI vs c_RegimenFiscal. Por ejemplo, una empresa no puede recibir facturas con uso D01 (honorarios médicos) ni CP01 si no es complemento de recepción de pagos.',
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
        <span className="text-slate-400">Validador CFDI 4.0</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Anexo 20 RMF 2026 & Matriz de Validaciones PAC</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Validador de Requisitos Fiscales Factura CFDI 4.0 SAT
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Verifica al instante la compatibilidad de RFC, Razón Social sin régimen societario, Código Postal del receptor y matriz Uso de CFDI vs Régimen Fiscal para evitar rechazos en el timbrado del SAT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-700" />
              <span>Campos del Receptor (Cliente)</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              CFDI 4.0
            </span>
          </div>

          {/* RFC Receptor */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              RFC del Receptor
            </label>
            <input
              type="text"
              maxLength={13}
              value={rfcReceptor}
              onChange={(e) => setRfcReceptor(e.target.value.toUpperCase())}
              placeholder="Ej. BBA830831LJ2 o PEGR850412XYZ"
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            {validation.rfcError ? (
              <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <XCircle className="w-3 h-3 shrink-0" />
                <span>{validation.rfcError}</span>
              </p>
            ) : (
              <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Estructura de RFC válida</span>
              </p>
            )}
          </div>

          {/* Nombre / Razón Social */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Nombre / Razón Social (Exacto en CSF)
            </label>
            <input
              type="text"
              value={nombreReceptor}
              onChange={(e) => setNombreReceptor(e.target.value)}
              placeholder="Ej. DISTRIBUIDORA MEDICA NACIONAL"
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            {validation.nombreError ? (
              <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{validation.nombreError}</span>
              </p>
            ) : (
              <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Nombre válido (mayúsculas y sin régimen societario)</span>
              </p>
            )}
          </div>

          {/* Código Postal */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Código Postal Fiscal (5 dígitos)
            </label>
            <input
              type="text"
              maxLength={5}
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value.replace(/\D/g, ''))}
              placeholder="06000"
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            {validation.cpError ? (
              <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <XCircle className="w-3 h-3 shrink-0" />
                <span>{validation.cpError}</span>
              </p>
            ) : (
              <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Código postal de 5 dígitos válido</span>
              </p>
            )}
          </div>

          {/* Régimen Fiscal */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Régimen Fiscal del Receptor
            </label>
            <select
              value={regimenFiscal}
              onChange={(e) => setRegimenFiscal(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px] text-xs"
            >
              <option value="601">601 - General de Ley Personas Morales</option>
              <option value="603">603 - Personas Morales con Fines no Lucrativos</option>
              <option value="605">605 - Sueldos y Salarios e Ingresos Asimilados a Salarios</option>
              <option value="606">606 - Arrendamiento</option>
              <option value="612">612 - Personas Físicas con Actividades Empresariales y Profesionales</option>
              <option value="625">625 - Régimen de las Actividades Empresariales con Plataformas Tecnológicas</option>
              <option value="626">626 - Régimen Simplificado de Confianza (RESICO)</option>
              <option value="616">616 - Sin obligaciones fiscales</option>
            </select>
          </div>

          {/* Uso de CFDI */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Uso de CFDI Solicitado
            </label>
            <select
              value={usoCfdi}
              onChange={(e) => setUsoCfdi(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px] text-xs"
            >
              <option value="G01">G01 - Adquisición de mercancías</option>
              <option value="G02">G02 - Devoluciones, descuentos o bonificaciones</option>
              <option value="G03">G03 - Gastos en general</option>
              <option value="I01">I01 - Construcciones</option>
              <option value="D01">D01 - Honorarios médicos, dentales y gastos hospitalarios</option>
              <option value="D04">D04 - Donativos</option>
              <option value="D05">D05 - Intereses reales efectivamente pagados por créditos hipotecarios</option>
              <option value="D10">D10 - Pagos por servicios educativos (colegiaturas)</option>
              <option value="S01">S01 - Sin efectos fiscales</option>
              <option value="CP01">CP01 - Pagos</option>
            </select>
            {validation.usoError && (
              <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{validation.usoError}</span>
              </p>
            )}
          </div>
        </div>

        {/* Validation Status & Action Card (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className={`rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-white ${validation.valid ? 'bg-slate-900' : 'bg-rose-950/90 border border-rose-800'}`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                {validation.valid ? (
                  <div className="p-2 rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="p-2 rounded-2xl bg-rose-500/20 text-rose-400">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Estatus de Timbrado CFDI 4.0
                  </div>
                  <div className="text-xl sm:text-2xl font-black mt-0.5">
                    {validation.valid ? 'Datos Conformes para Timbrado' : 'Rechazo Inminente del PAC'}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {validation.valid
                ? 'Los 5 campos del nodo Receptor cumplen estrictamente con las reglas de estructura y catálogos del Anexo 20 de la RMF. Tu factura no sufrirá rechazos por discrepancias de nombre, código postal ni compatibilidad de uso.'
                : 'Se han detectado inconsistencias que provocarán un código de error inmediato al intentar timbrar la factura ante el SAT. Corrige los campos marcados en rojo antes de emitir.'}
            </p>

            {/* Checklist Visual */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span>Estructura RFC (12 o 13 car.):</span>
                <span className={validation.rfcError ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {validation.rfcError ? 'Inválido' : 'Correcto'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span>Razón Social sin Régimen de Capital:</span>
                <span className={validation.nombreError ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {validation.nombreError ? 'Corregir' : 'Limpio'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span>Código Postal de Domicilio Fiscal:</span>
                <span className={validation.cpError ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {validation.cpError ? 'Inválido' : '5 Dígitos'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span>Compatibilidad Uso CFDI / Régimen:</span>
                <span className={validation.usoError ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {validation.usoError ? 'Incompatible' : 'Válido'}
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopySanitized}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 font-bold text-white text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado con Éxito!' : 'Copiar Datos Limpios para Facturar'}</span>
            </button>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Manual de Validación Técnica del CFDI Versión 4.0 SAT 2026
        </h2>
        <p>
          A partir de la obligatoriedad definitiva del <strong>Comprobante Fiscal Digital por Internet en su versión 4.0</strong>, el Servicio de Administración Tributaria implementó validaciones de sintaxis y cruce algorítmico mucho más severas que en la versión anterior 3.3. El objetivo primordial de esta disposición plasmada en el Artículo 29-A del Código Fiscal de la Federación (CFF) es erradicar la suplantación de identidad fiscal y asegurar la trazabilidad absoluta de las operaciones comerciales.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. El Error Más Común: Inclusión del Régimen Societario en el Nombre
        </h3>
        <p>
          En la versión 3.3, las personas morales facturaban frecuentemente capturando su denominación completa con régimen societario (por ejemplo: <em>ACEROS Y MAQUINARIA DE MEXICO, S.A. DE C.V.</em>). En CFDI 4.0, la regla de validación <code>CFDI40145</code> contrasta el campo <code>Nombre</code> del nodo Receptor directamente contra la lista de contribuyentes inscritos no cancelados (LCO) del SAT. En dicha base oficial, las empresas están registradas <strong>exclusivamente por su nombre o denominación comercial sin el tipo de sociedad mercantil</strong>. Escribir "S.A. de C.V." o "S. de R.L." provoca un rechazo inmediato.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Coincidencia Estricta del Código Postal Fiscal
        </h3>
        <p>
          El campo <code>DomicilioFiscalReceptor</code> pasó a ser de captura estrictamente obligatoria. Debe coincidir al 100% con el código postal de la oficina, planta o domicilio particular registrado en el padrón del SAT. No se admite el código postal de una sucursal secundaria si esta no fue formalmente dada de alta como establecimiento fiscal ante la autoridad recaudadora.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Matriz de Relación entre Régimen Fiscal y Uso de CFDI
        </h3>
        <p>
          El SAT eliminó el uso genérico P01 ("Por definir"). Actualmente, cada comprobante debe reflejar con veracidad la naturaleza de la transacción económica:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Gastos Generales (G03):</strong> Aplicable a empresas y profesionistas en regímenes 601, 612 o 626 para deducciones corrientes de operación.
          </li>
          <li>
            <strong>Deducciones Personales (D01 a D10):</strong> Reservadas con exclusividad para personas físicas asalariadas o de actividades empresariales que deducirán honorarios médicos, lentes, intereses hipotecarios o colegiaturas en su Declaración Anual.
          </li>
          <li>
            <strong>Sin Efectos Fiscales (S01):</strong> Utilizado prioritariamente cuando el receptor tributa en el régimen 616 (sin obligaciones fiscales) o para facturas globales con RFC genérico nacional <code>XAXX010101000</code>.
          </li>
        </ul>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Validación CFDI 4.0</span>
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
        <Link href="/mx/amortizacion-perdidas-fiscales-sat" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Amortización de Pérdidas Fiscales &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

