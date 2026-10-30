'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Globe2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calculator,
  Home,
  FileText,
  Building2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountrySuite {
  code: string;
  name: string;
  flag: string;
  hubHref: string;
  badge: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  hoverBorder: string;
  description: string;
  pillars: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    featured: { name: string; href: string; tag?: string }[];
  }[];
}

const SUITES: CountrySuite[] = [
  {
    code: 'es',
    name: 'España',
    flag: '🇪🇸',
    hubHref: '/es',
    badge: 'BOE & Agencia Tributaria 2026',
    accentBg: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    accentText: 'text-orange-600',
    accentBorder: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-500/60',
    description:
      'Suite completa de cálculo laboral, fiscal, hipotecario y trámites según el Estatuto de los Trabajadores, Ley Vivienda e IRPF 2026.',
    pillars: [
      {
        name: 'Laboral & Nóminas',
        icon: Calculator,
        featured: [
          { name: 'Calculadora Sueldo Neto 2026', href: '/es/calculadora-sueldo-neto', tag: 'Top' },
          { name: 'Calculadora IRPF Autónomos & RETA', href: '/es/calculadora-irpf-autonomos' },
          { name: 'Finiquito e Indemnización Despido', href: '/es/calculadora-finiquito-despido' },
        ],
      },
      {
        name: 'Hipotecas & Vivienda',
        icon: Home,
        featured: [
          { name: 'Calculadora Hipoteca y Euríbor', href: '/es/calculadora-hipoteca-euribor', tag: 'Popular' },
          { name: 'ITP & Gastos Compraventa (17 CC.AA.)', href: '/es/calculadora-itp-gastos-compraventa' },
          { name: 'Plusvalía Municipal (IIVTNU)', href: '/es/calculadora-plusvalia-municipal' },
        ],
      },
      {
        name: 'Trámites & Sede',
        icon: FileText,
        featured: [
          { name: 'Validador DNI, NIE y CIF Oficial', href: '/es/validador-dni-nie-cif' },
          { name: 'Generador Factura PDF VeriFactu', href: '/es/generador-factura-pdf', tag: 'Gratis' },
          { name: 'Foto Carnet DNI 32×26 mm', href: '/es/foto-carnet-dni-pasaporte' },
        ],
      },
    ],
  },
  {
    code: 'de',
    name: 'Deutschland',
    flag: '🇩🇪',
    hubHref: '/de',
    badge: 'EStG, BGB & GNotKG 2026',
    accentBg: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    accentText: 'text-amber-600',
    accentBorder: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/60',
    description:
      'Rechtssichere Werkzeuge nach deutschem Steuer- und Arbeitsrecht: Brutto-Netto, Abfindung § 34 EStG, Firmenwagen 1% und GNotKG.',
    pillars: [
      {
        name: 'Gehalt & Steuern',
        icon: Calculator,
        featured: [
          { name: 'Brutto-Netto-Rechner 2026', href: '/de/brutto-netto-rechner', tag: 'Top' },
          { name: 'Abfindungsrechner § 34 EStG', href: '/de/abfindungsrechner' },
          { name: 'Firmenwagenrechner (1%-Regel)', href: '/de/firmenwagenrechner' },
        ],
      },
      {
        name: 'Immobilien & Recht',
        icon: Home,
        featured: [
          { name: 'Notarkosten GNotKG Rechner', href: '/de/notar-und-grundbuchkostenrechner', tag: 'Beliebt' },
          { name: 'Grunderwerbsteuer nach Bundesland', href: '/de/grunderwerbsteuer-rechner' },
          { name: 'Kappungsgrenze & Mieterhöhung', href: '/de/mieterhoehung-kappungsgrenze-rechner' },
        ],
      },
      {
        name: 'Behörden & Gewerbe',
        icon: FileText,
        featured: [
          { name: 'Kleinunternehmer Rechnung § 19', href: '/de/kleinunternehmer-rechnung', tag: 'PDF' },
          { name: 'Biometrisches Passfoto 35×45 mm', href: '/de/passfoto-generator-biometrisch' },
          { name: 'Bayerische Notenformel KMK', href: '/de/notenumrechner-bayerische-formel' },
        ],
      },
    ],
  },
  {
    code: 'fr',
    name: 'France',
    flag: '🇫🇷',
    hubHref: '/fr',
    badge: 'URSSAF & Code du Travail 2026',
    accentBg: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    accentText: 'text-blue-600',
    accentBorder: 'border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/60',
    description:
      'Simulateurs officiels conformes aux barèmes URSSAF et DGFiP : conversion brut en net, rupture conventionnelle, frais de notaire et PTZ.',
    pillars: [
      {
        name: 'Travail & Salaires',
        icon: Calculator,
        featured: [
          { name: 'Calculateur Salaire Brut en Net', href: '/fr/calculateur-salaire-net-brut', tag: 'Top' },
          { name: 'Rupture Conventionnelle (L1237-13)', href: '/fr/calculateur-indemnite-rupture' },
          { name: 'Cotisations URSSAF Micro 2026', href: '/fr/simulateur-charges-urssaf' },
        ],
      },
      {
        name: 'Immobilier & Crédit',
        icon: Home,
        featured: [
          { name: 'Frais de Notaire Décret 2020-179', href: '/fr/calculateur-frais-de-notaire', tag: 'Populaire' },
          { name: 'Prêt Immobilier HCSF 35%', href: '/fr/simulateur-pret-immobilier-mensualite' },
          { name: 'Simulateur Prêt à Taux Zéro PTZ', href: '/fr/simulateur-pret-taux-zero-ptz' },
        ],
      },
      {
        name: 'Entreprise & Démarches',
        icon: FileText,
        featured: [
          { name: 'Coût Embauche Employeur Superbrut', href: '/fr/simulateur-cout-embauche-employeur', tag: 'Pro' },
          { name: 'Photo d’Identité ANTS Biométrique', href: '/fr/photo-identite-passeport-ants' },
          { name: 'Facture Auto-Entrepreneur PDF', href: '/fr/facture-auto-entrepreneur' },
        ],
      },
    ],
  },
  {
    code: 'it',
    name: 'Italia',
    flag: '🇮🇹',
    hubHref: '/it',
    badge: 'TUIR, D.Lgs. 216/2023 & INPS',
    accentBg: 'bg-sky-500/10 text-sky-700 border-sky-500/20',
    accentText: 'text-sky-600',
    accentBorder: 'border-sky-500/30',
    hoverBorder: 'hover:border-sky-500/60',
    description:
      'Suite ufficiale di calcolo giuslavoristico, fiscale e catastale secondo la Riforma IRPEF 2026, Codice Civile (TFR) e Agenzia delle Entrate.',
    pillars: [
      {
        name: 'Fisco & Lavoro',
        icon: Calculator,
        featured: [
          { name: 'Calcolo Stipendio Netto 2026', href: '/it/calcolo-stipendio-netto', tag: 'Top' },
          { name: 'Calcolo TFR Fine Rapporto', href: '/it/calcolo-tfr-fine-rapporto' },
          { name: 'Fattura Regime Forfettario', href: '/it/fattura-regime-forfettario', tag: '5%/15%' },
        ],
      },
      {
        name: 'Casa & Immobili',
        icon: Home,
        featured: [
          { name: 'Calcolo IMU e Modello F24', href: '/it/calcolo-imu-f24', tag: 'F24' },
          { name: 'Imposte Acquisto Prima Casa', href: '/it/calcolo-imposte-acquisto-casa' },
          { name: 'Adeguamento Affitto ISTAT FOI', href: '/it/adeguamento-affitto-istat' },
        ],
      },
      {
        name: 'Previdenza & Trámites',
        icon: FileText,
        featured: [
          { name: 'Ravvedimento Operoso F24', href: '/it/calcolo-ravvedimento-operoso', tag: 'Fiscale' },
          { name: 'Foto Tessera CIE 35×45 mm', href: '/it/foto-tessera-cie-passaporto' },
          { name: 'Calcolo Bollo Auto & Superbollo', href: '/it/calcolo-bollo-auto-regione' },
        ],
      },
    ],
  },
  {
    code: 'br',
    name: 'Brasil',
    flag: '🇧🇷',
    hubHref: '/br',
    badge: 'CLT & Receita Federal 2026',
    accentBg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    accentText: 'text-emerald-600',
    accentBorder: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/60',
    description:
      'Suite completa de cálculos trabalhistas CLT, tributários Simples Nacional e MEI, imobiliários e geradores de documentos para o Brasil.',
    pillars: [
      {
        name: 'Trabalhista & Salários',
        icon: Calculator,
        featured: [
          { name: 'Calculadora Salário Líquido CLT 2026', href: '/br/calculadora-salario-liquido-clt', tag: 'Top' },
          { name: 'Calculadora de Rescisão de Contrato CLT', href: '/br/calculadora-rescisao-clt', tag: 'Art. 477' },
          { name: 'Cálculo de Férias e Abono Pecuniário', href: '/br/calculo-ferias-clt' },
        ],
      },
      {
        name: 'Tributos & MEI',
        icon: Building2,
        featured: [
          { name: 'Calculadora DAS MEI 2026 Atualizada', href: '/br/calculadora-das-mei', tag: 'MEI' },
          { name: 'Simulador Alíquota Simples Nacional', href: '/br/calculadora-simples-nacional' },
          { name: 'Simulador Carnê-Leão e IRPF Autônomo', href: '/br/calculadora-carne-leao' },
        ],
      },
      {
        name: 'Imóveis & Crédito',
        icon: Home,
        featured: [
          { name: 'Financiamento SAC vs Tabela Price', href: '/br/simulador-financiamento-sac-price', tag: 'Popular' },
          { name: 'Custos ITBI e Escritura de Cartório', href: '/br/calculadora-itbi-escritura' },
          { name: 'Reajuste de Aluguel IPCA e IGP-M', href: '/br/reajuste-aluguel-ipca-igpm' },
        ],
      },
      {
        name: 'Documentos & Cidadania',
        icon: FileText,
        featured: [
          { name: 'Validador e Gerador de CPF e CNPJ', href: '/br/validador-gerador-cpf-cnpj', tag: 'Módulo 11' },
          { name: 'Criador Foto 3×4 Documentos & CNH', href: '/br/foto-3x4-documentos-passaporte' },
          { name: 'Compressor PDF para o PJe (< 3 MB)', href: '/br/compressor-pdf-pje-tribunais' },
        ],
      },
    ],
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    hubHref: '/uk',
    badge: 'HMRC & Finance Act 2026/27',
    accentBg: 'bg-indigo-900/10 text-indigo-900 border-indigo-900/20',
    accentText: 'text-indigo-900',
    accentBorder: 'border-indigo-900/30',
    hoverBorder: 'hover:border-indigo-900/60',
    description:
      'Official statutory calculator suite for PAYE salary take-home, Stamp Duty (SDLT), Section 24 landlord relief, and statutory redundancy.',
    pillars: [
      {
        name: 'HMRC & Payroll',
        icon: Calculator,
        featured: [
          { name: 'Take-Home Pay Salary Calculator 2026/27', href: '/uk/take-home-pay-salary-calculator', tag: 'Top' },
          { name: 'Stamp Duty (SDLT) Land Tax Calculator', href: '/uk/stamp-duty-sdlt-calculator', tag: 'SDLT' },
          { name: 'Statutory Redundancy Pay Calculator', href: '/uk/redundancy-pay-statutory-calculator' },
        ],
      },
      {
        name: 'Corporate & Self-Assessment',
        icon: Building2,
        featured: [
          { name: 'Self-Assessment Payment on Account (s.59A)', href: '/uk/self-assessment-payment-on-account-calculator', tag: 'HMRC' },
          { name: 'Corporation Tax & Marginal Relief (19-25%)', href: '/uk/corporation-tax-marginal-relief-calculator' },
          { name: 'Dividend Tax & Allowance Calculator', href: '/uk/dividend-tax-calculator' },
        ],
      },
      {
        name: 'Property & Landlord',
        icon: Home,
        featured: [
          { name: 'Section 24 Landlord Mortgage Relief', href: '/uk/section-24-landlord-mortgage-relief-calculator', tag: 'Sec 24' },
          { name: 'UK Rental Yield & Cap Rate Estimator', href: '/uk/rental-yield-cap-rate-calculator-uk' },
          { name: 'Leasehold Extension & Marriage Value', href: '/uk/ground-rent-leasehold-extension-calculator' },
        ],
      },
      {
        name: 'Compliance & Verification',
        icon: FileText,
        featured: [
          { name: 'HM Passport Photo Biometric Tool (35×45mm)', href: '/uk/uk-passport-photo-checker-generator', tag: '35×45' },
          { name: 'Sort Code & Account Modulus 11 Checker', href: '/uk/hmrc-modulus-11-sort-code-account-validator' },
          { name: 'Companies House PDF Filing Compressor', href: '/uk/pdf-compressor-companies-house' },
        ],
      },
    ],
  },
];

export function InternationalSuitesShowcase() {
  const [selectedSuite, setSelectedSuite] = React.useState<string>('all');

  const filteredSuites = selectedSuite === 'all'
    ? SUITES
    : SUITES.filter((s) => s.code === selectedSuite);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Ambient Radial Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-blue-500/5 via-orange-500/5 to-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wide shadow-xs">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span>Kagazo International Portals</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-emerald-400 font-mono">120 Statutory Tools</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Sovereign Micro-Tools Across 6 Nations
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Explore 120 newly built statutory calculators calibrated to official 2026 legal frameworks in Spain, Germany, France, Italy, Brazil, and the United Kingdom. 100% in-browser client execution with zero data storage.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedSuite('all')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border',
                selectedSuite === 'all'
                  ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              )}
            >
              All Global Suites (120 Tools)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSuite('es')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5',
                selectedSuite === 'es'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              )}
            >
              <span>🇪🇸</span>
              <span>España (20)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSuite('de')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5',
                selectedSuite === 'de'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              )}
            >
              <span>🇩🇪</span>
              <span>Deutschland (20)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSuite('fr')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5',
                selectedSuite === 'fr'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              )}
            >
              <span>🇫🇷</span>
              <span>France (20)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSuite('it')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5',
                selectedSuite === 'it'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              )}
            >
              <span>🇮🇹</span>
              <span>Italia (20)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSuite('br')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5',
                selectedSuite === 'br'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              )}
            >
              <span>🇧🇷</span>
              <span>Brasil (20)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSuite('uk')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5',
                selectedSuite === 'uk'
                  ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              )}
            >
              <span>🇬🇧</span>
              <span>UK (20)</span>
            </button>
          </div>
        </div>

        {/* Country Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredSuites.map((suite) => (
            <div
              key={suite.code}
              className={cn(
                'rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1',
                suite.hoverBorder
              )}
            >
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{suite.flag}</span>
                    <div>
                      <h3 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                        <span>{suite.name}</span>
                        <span className="text-xs font-mono font-bold text-slate-400">20 Tools</span>
                      </h3>
                      <div className="text-[11px] font-bold text-slate-500 font-mono">
                        {suite.badge}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={suite.hubHref}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                    title={`Open ${suite.name} Hub`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {suite.description}
                </p>
              </div>

              {/* Pillars & Featured Tools */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                {suite.pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.name} className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-800">
                        <Icon className={cn('w-3.5 h-3.5', suite.accentText)} />
                        <span>{pillar.name}</span>
                      </div>
                      <div className="space-y-1 pl-1">
                        {pillar.featured.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform truncate max-w-[220px]">
                              {tool.name}
                            </span>
                            {tool.tag ? (
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                                {tool.tag}
                              </span>
                            ) : (
                              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-slate-950 transition-colors shrink-0" />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href={suite.hubHref}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <span>Explore All 20 {suite.name} Tools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global Compliance & Privacy Banner */}
        <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-black tracking-tight flex items-center gap-2">
                <span>100% In-Browser Computation & Privacy Guarantee</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 rounded-md">
                  GDPR / DSGVO Compliant
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                Whether computing French net salaries, German severance pay under § 34 EStG, or Spanish mortgage Euríbor amortization, zero financial or personal data ever leaves your browser.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/tools"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-colors"
            >
              India Exam Suite (57+)
            </Link>
            <Link
              href="/verify"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-colors shadow-xs"
            >
              Verify Gov Signatures
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

