import * as React from 'react';
import Link from 'next/link';
import { KagazoLogo } from '@/components/ui/KagazoLogo';
import { ShieldCheck, ArrowRight, ExternalLink, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CountryCode } from './InternationalHeader';

interface FooterCategory {
  title: string;
  links: { label: string; href: string }[];
}

interface CountryFooterConfig {
  code: CountryCode;
  countryName: string;
  flag: string;
  heroText: string;
  subText: string;
  disclaimerTitle: string;
  disclaimer: string;
  accentClass: string;
  accentText: string;
  accentBorder: string;
  categories: FooterCategory[];
}

const FOOTER_CONFIGS: Record<CountryCode, CountryFooterConfig> = {
  es: {
    code: 'es',
    countryName: 'España',
    flag: '🇪🇸',
    heroText: 'Herramientas Oficiales Estatutarias para España 2026',
    subText: 'Suite integral de cálculo laboral, fiscal, hipotecario y administrativo de precisión según la normativa del BOE, Ley de Arrendamientos Urbanos, Estatuto de los Trabajadores y Agencia Tributaria.',
    disclaimerTitle: 'Privacidad y Rigor Jurídico:',
    disclaimer: 'Cálculos conformes con el Código de Comercio, Ley 35/2006 del IRPF, Real Decreto-ley 13/2022 y tablas oficiales de cotización a la Seguridad Social 2026. Procesamiento 100% en tu navegador: ningún dato se envía a servidores.',
    accentClass: 'orange',
    accentText: 'text-orange-600',
    accentBorder: 'border-orange-500/30',
    categories: [
      {
        title: 'Laboral y Salarios',
        links: [
          { label: 'Calculadora Sueldo Neto 2026', href: '/es/calculadora-sueldo-neto' },
          { label: 'Calculadora IRPF Autónomos', href: '/es/calculadora-irpf-autonomos' },
          { label: 'Calculadora Finiquito y Despido', href: '/es/calculadora-finiquito-despido' },
          { label: 'Calculadora de Jubilación y Pensión', href: '/es/calculadora-jubilacion-pension' },
          { label: 'Calculador Horas Extras y Recargos', href: '/es/calculador-horas-extras' },
        ],
      },
      {
        title: 'Vivienda e Hipotecas',
        links: [
          { label: 'Calculadora Hipoteca y Euríbor', href: '/es/calculadora-hipoteca-euribor' },
          { label: 'Gastos e ITP Compraventa Vivienda', href: '/es/calculadora-itp-gastos-compraventa' },
          { label: 'Calculadora Plusvalía Municipal (IIVTNU)', href: '/es/calculadora-plusvalia-municipal' },
          { label: 'Actualizador Alquiler con IPC / IRA', href: '/es/actualizador-alquiler-ipc' },
          { label: 'Simulador Rentabilidad Alquiler Neta', href: '/es/simulador-rentabilidad-alquiler' },
        ],
      },
      {
        title: 'Trámites y Documentos',
        links: [
          { label: 'Validador DNI, NIE y CIF', href: '/es/validador-dni-nie-cif' },
          { label: 'Generador Facturas PDF Gratis', href: '/es/generador-factura-pdf' },
          { label: 'Foto Carnet DNI y Pasaporte (32x26mm)', href: '/es/foto-carnet-dni-pasaporte' },
          { label: 'Validador IBAN y Entidad Bancaria', href: '/es/validador-iban-espana' },
          { label: 'Compresor PDF Sede Electrónica (<2MB)', href: '/es/compresor-pdf-sede-electronica' },
        ],
      },
      {
        title: 'Fiscal y Utilidades',
        links: [
          { label: 'Calculadora IVA Trimestral (Mod. 303)', href: '/es/calculadora-iva-trimestral' },
          { label: 'Calculadora Gasolina y Coste Trayecto', href: '/es/calculadora-precio-gasolina-viaje' },
          { label: 'Calculadora Días Hábiles vs Naturales', href: '/es/calculadora-dias-habiles' },
          { label: 'Contador de Palabras y Caracteres', href: '/es/contador-palabras-caracteres' },
          { label: 'Calculadora de Descuentos y Rebajas', href: '/es/calculadora-descuentos-rebajas' },
        ],
      },
    ],
  },
  de: {
    code: 'de',
    countryName: 'Deutschland',
    flag: '🇩🇪',
    heroText: 'Offizielle Gesetzliche Rechner für Deutschland 2026',
    subText: 'Rechtssichere Werkzeuge nach deutschem Steuer-, Arbeits- und Mietrecht: EStG, BGB, GNotKG, GewStG und KMK-Vorgaben für Bürger, Arbeitnehmer und Unternehmen.',
    disclaimerTitle: 'Datenschutz & Gesetzliche Genauigkeit:',
    disclaimer: 'Berechnungen entsprechen § 32a EStG, § 11 GewStG, § 19 UStG sowie dem BGB und GNotKG 2026. 100% Client-Side-Verarbeitung: Ihre Finanzdaten bleiben vertraulich in Ihrem Browser.',
    accentClass: 'amber',
    accentText: 'text-amber-500',
    accentBorder: 'border-amber-500/30',
    categories: [
      {
        title: 'Gehalt & Steuern',
        links: [
          { label: 'Brutto-Netto-Rechner 2026', href: '/de/brutto-netto-rechner' },
          { label: 'Abfindungsrechner § 34 EStG', href: '/de/abfindungsrechner' },
          { label: 'Stundenlohnrechner', href: '/de/stundenlohnrechner' },
          { label: 'Firmenwagenrechner (1%-Regelung)', href: '/de/firmenwagenrechner' },
          { label: 'Kurzarbeitergeld-Rechner (KUG)', href: '/de/kurzarbeitergeld-rechner' },
        ],
      },
      {
        title: 'Immobilien & Miete',
        links: [
          { label: 'Notarkosten GNotKG Rechner', href: '/de/notar-und-grundbuchkostenrechner' },
          { label: 'Grunderwerbsteuer nach Bundesland', href: '/de/grunderwerbsteuer-rechner' },
          { label: 'Kappungsgrenze & Mieterhöhung § 558', href: '/de/mieterhoehung-kappungsgrenze-rechner' },
          { label: 'Baufinanzierung & Tilgungsrechner', href: '/de/baufinanzierung-tilgungsrechner' },
          { label: 'Mietkautionsrechner (3 Monatsmieten)', href: '/de/mietkautionsrechner' },
        ],
      },
      {
        title: 'Behörden & Anträge',
        links: [
          { label: 'Kleinunternehmer Rechnung § 19 UStG', href: '/de/kleinunternehmer-rechnung' },
          { label: 'Der Die Das Finder (Artikel)', href: '/de/der-die-das-finder' },
          { label: 'Biometrisches Passfoto 35x45 mm', href: '/de/passfoto-generator-biometrisch' },
          { label: 'IBAN & BIC Prüfer', href: '/de/iban-pruefer-bic-finder' },
          { label: 'PDF Kompressor für Behörden (< 2MB)', href: '/de/pdf-kompressor-online-antraege' },
        ],
      },
      {
        title: 'Gewerbe & Alltag',
        links: [
          { label: 'Gewerbesteuerrechner nach Hebesatz', href: '/de/gewerbesteuerrechner' },
          { label: 'Skontorechner & Jahreszins', href: '/de/skontorechner' },
          { label: 'Bayerische Notenformel KMK', href: '/de/notenumrechner-bayerische-formel' },
          { label: 'Rabattrechner nach PAngV', href: '/de/rabatt-prozent-rechner' },
          { label: 'Spritkosten & Pendlerpauschale', href: '/de/spritkostenrechner-fahrtkosten' },
        ],
      },
    ],
  },
  fr: {
    code: 'fr',
    countryName: 'France',
    flag: '🇫🇷',
    heroText: 'Simulateurs et Outils Statutaires Officiels France 2026',
    subText: 'Suite complète de calculateurs conformes aux barèmes officiels URSSAF, Code du travail, Code Général des Impôts et critères HCSF pour salariés, indépendants et emprunteurs.',
    disclaimerTitle: 'Confidentialité & Exactitude Juridique :',
    disclaimer: 'Calculs certifiés conformes au Code du travail (Art. L. 1237-13, R. 1234-2, L. 1243-8), CGI (Art. 150 VC, 293 B) et barème kilométrique DGFiP 2026. Exécution 100% locale dans votre navigateur, aucune donnée personnelle stockée.',
    accentClass: 'blue',
    accentText: 'text-blue-500',
    accentBorder: 'border-blue-500/30',
    categories: [
      {
        title: 'Travail & Salaires',
        links: [
          { label: 'Calculateur Salaire Brut en Net 2026', href: '/fr/calculateur-salaire-net-brut' },
          { label: 'Indemnité Rupture Conventionnelle', href: '/fr/calculateur-indemnite-rupture' },
          { label: 'Cotisations URSSAF Auto-Entrepreneur', href: '/fr/simulateur-charges-urssaf' },
          { label: 'Calculateur Heures Supplémentaires', href: '/fr/calculateur-heures-supplementaires' },
          { label: 'Prime Fin de CDD & Précarité (10%)', href: '/fr/calculateur-indemnite-fin-cdd' },
        ],
      },
      {
        title: 'Entreprise & Coûts RH',
        links: [
          { label: 'Coût Embauche Employeur Superbrut', href: '/fr/simulateur-cout-embauche-employeur' },
          { label: 'Heures Minutes en Décimales Paie', href: '/fr/calculateur-duree-travail-heures-decimales' },
          { label: 'Facture Auto-Entrepreneur PDF', href: '/fr/facture-auto-entrepreneur' },
          { label: 'Validateur SIREN & SIRET (Luhn)', href: '/fr/validateur-siren-siret' },
          { label: 'Calculateur TVA 20%, 10% & 5,5%', href: '/fr/calculateur-tva-francaise' },
        ],
      },
      {
        title: 'Immobilier & Crédit',
        links: [
          { label: 'Frais de Notaire Décret 2020-179', href: '/fr/calculateur-frais-de-notaire' },
          { label: 'Prêt Immobilier & Mensualité HCSF 35%', href: '/fr/simulateur-pret-immobilier-mensualite' },
          { label: 'Simulateur Prêt à Taux Zéro PTZ 2026', href: '/fr/simulateur-pret-taux-zero-ptz' },
          { label: 'Plus-Value Immobilière Particuliers', href: '/fr/simulateur-plus-value-immobiliere' },
          { label: 'Rendement Locatif Brut & Net Fiscal', href: '/fr/calculateur-rendement-locatif' },
        ],
      },
      {
        title: 'Démarches & Quotidien',
        links: [
          { label: 'Photo d’Identité ANTS Biométrique 35x45', href: '/fr/photo-identite-passeport-ants' },
          { label: 'Compresseur PDF France Travail (< 2 Mo)', href: '/fr/compresseur-pdf-france-travail' },
          { label: 'Chiffres en Lettres Chèque Bancaire', href: '/fr/convertisseur-chiffre-en-lettre' },
          { label: 'Barème Frais Kilométriques DGFiP', href: '/fr/simulateur-frais-kilometriques' },
          { label: 'Calculateur Soldes & Remises en Cascade', href: '/fr/calculateur-remise-solde' },
        ],
      },
    ],
  },
  it: {
    code: 'it',
    countryName: 'Italia',
    flag: '🇮🇹',
    heroText: 'Calcolatori e Utilità Statutarie Ufficiali Italia 2026',
    subText: 'Suite integrata di calcolo fiscale, giuslavoristico, previdenziale e amministrativo conforme al D.Lgs. 216/2023, TUIR, Codice Civile e circolari dell\'Agenzia delle Entrate e dell\'INPS.',
    disclaimerTitle: 'Privacy & Rigore Giuridico:',
    disclaimer: 'Calcoli conformi al D.Lgs. 216/2023 (Riforma IRPEF), Art. 2120 c.c. (TFR), D.P.R. 917/1986 (TUIR) e Legge 190/2014 (Regime Forfettario). Elaborazione 100% locale nel tuo browser: nessun dato fiscale viene memorizzato o trasmesso a server.',
    accentClass: 'sky',
    accentText: 'text-sky-400',
    accentBorder: 'border-sky-500/30',
    categories: [
      {
        title: 'Fisco & Lavoro',
        links: [
          { label: 'Calcolo Stipendio Netto 2026', href: '/it/calcolo-stipendio-netto' },
          { label: 'Calcolo TFR Fine Rapporto', href: '/it/calcolo-tfr-fine-rapporto' },
          { label: 'Fattura Regime Forfettario 2026', href: '/it/fattura-regime-forfettario' },
          { label: 'Calcolo Pensione Quota 103', href: '/it/calcolo-pensione-anticipata' },
          { label: 'Calcolo Straordinari CCNL', href: '/it/calcolo-straordinari-lavoro' },
        ],
      },
      {
        title: 'Casa & Immobili',
        links: [
          { label: 'Calcolo IMU e Modello F24', href: '/it/calcolo-imu-f24' },
          { label: 'Imposte Acquisto Prima Casa', href: '/it/calcolo-imposte-acquisto-casa' },
          { label: 'Adeguamento Affitto ISTAT FOI', href: '/it/adeguamento-affitto-istat' },
          { label: 'Rendimento & Cedolare Secca', href: '/it/calcolo-rendimento-locativo-cedolare' },
          { label: 'Plusvalenza Cessione Immobile', href: '/it/calcolo-plusvalenza-immobiliare' },
        ],
      },
      {
        title: 'Previdenza & Finanza',
        links: [
          { label: 'Ravvedimento Operoso F24', href: '/it/calcolo-ravvedimento-operoso' },
          { label: 'Verifica Partita IVA & CF', href: '/it/verifica-partita-iva-codice-fiscale' },
          { label: 'Interessi Legali e di Mora', href: '/it/calcolo-interessi-legali-mora' },
          { label: 'Calcolo Giorni Lavorativi', href: '/it/calcolo-giorni-lavorativi' },
          { label: 'Calcolo Assegno Unico INPS', href: '/it/calcolo-assegno-unico-inps' },
        ],
      },
      {
        title: 'Trámites & Documenti',
        links: [
          { label: 'Foto Tessera CIE 35x45 mm', href: '/it/foto-tessera-cie-passaporto' },
          { label: 'Compressore PDF PA (< 2 MB)', href: '/it/compressore-pdf-pubblica-amministrazione' },
          { label: 'Validatore IBAN Bancario Italia', href: '/it/validatore-iban-bancario-italia' },
          { label: 'Calcolo Bollo Auto & Superbollo', href: '/it/calcolo-bollo-auto-regione' },
          { label: 'Convertitore Numeri in Lettere', href: '/it/convertitore-numeri-in-lettere' },
        ],
      },
    ],
  },
  br: {
    code: 'br',
    countryName: 'Brasil',
    flag: '🇧🇷',
    heroText: 'Ferramentas Oficiais Estatutárias para o Brasil 2026',
    subText: 'Suite integral de cálculo trabalhista CLT, tributário Receita Federal / Simples Nacional, imobiliário e certidões jurídicas conforme a legislação federal vigente.',
    disclaimerTitle: 'Privacidade e Rigor Jurídico:',
    disclaimer: 'Cálculos em estrita conformidade com a CLT (Decreto-Lei 5.452/1943), Lei 12.506/2011, Lei Complementar 123/2006 (Simples Nacional) e Instruções Normativas da Receita Federal do Brasil. Processamento 100% no seu navegador: nenhum dado financeiro ou pessoal é enviado para servidores externos.',
    accentClass: 'emerald',
    accentText: 'text-emerald-500',
    accentBorder: 'border-emerald-500/30',
    categories: [
      {
        title: 'Trabalhista & Salários CLT',
        links: [
          { label: 'Calculadora Salário Líquido CLT 2026', href: '/br/calculadora-salario-liquido-clt' },
          { label: 'Calculadora de Rescisão de Contrato CLT', href: '/br/calculadora-rescisao-clt' },
          { label: 'Cálculo de Férias CLT e Abono Pecuniário', href: '/br/calculo-ferias-clt' },
          { label: 'Calculadora Décimo Terceiro Salário', href: '/br/calculadora-decimo-terceiro' },
          { label: 'Cálculo Horas Extras e DSR (Súmula 172)', href: '/br/calculo-horas-extras-dsr' },
        ],
      },
      {
        title: 'Tributário, MEI & Empresas',
        links: [
          { label: 'Calculadora DAS MEI 2026 Atualizada', href: '/br/calculadora-das-mei' },
          { label: 'Simulador Carnê-Leão e IRPF Autônomo', href: '/br/calculadora-carne-leao' },
          { label: 'Simulador Alíquota Simples Nacional', href: '/br/calculadora-simples-nacional' },
          { label: 'Retenção de Impostos Nota Fiscal PJ', href: '/br/retencao-impostos-nota-fiscal' },
          { label: 'Calculadora Dissídio e Reajuste Salarial', href: '/br/calculadora-dissidio-salarial' },
        ],
      },
      {
        title: 'Imobiliário & Financiamento',
        links: [
          { label: 'Simulador Financiamento SAC vs Price', href: '/br/simulador-financiamento-sac-price' },
          { label: 'Calculadora ITBI e Custos de Cartório', href: '/br/calculadora-itbi-escritura' },
          { label: 'Reajuste Aluguel por IPCA e IGP-M', href: '/br/reajuste-aluguel-ipca-igpm' },
          { label: 'Amortização de Financiamento com FGTS', href: '/br/amortizacao-financiamento-fgts' },
          { label: 'Calculadora Rendimento Locativo Líquido', href: '/br/calculadora-rendimento-aluguel-liquido' },
        ],
      },
      {
        title: 'Documentos, Cidadania & PJe',
        links: [
          { label: 'Validador e Gerador de CPF e CNPJ', href: '/br/validador-gerador-cpf-cnpj' },
          { label: 'Criador Foto 3x4 Documentos & CNH', href: '/br/foto-3x4-documentos-passaporte' },
          { label: 'Compressor PDF para PJe (< 3 MB)', href: '/br/compressor-pdf-pje-tribunais' },
          { label: 'Calculadora Prazos Processuais Dias Úteis', href: '/br/calculadora-prazos-processuais-cpc' },
          { label: 'Valor por Extenso para Recibos e Cheques', href: '/br/valor-por-extenso-recibo' },
        ],
      },
    ],
  },
  uk: {
    code: 'uk',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    heroText: 'Official UK Statutory Calculators & Compliance Tools 2026/27',
    subText: 'Comprehensive HMRC, Stamp Duty (SDLT), employment rights, corporation tax, and property compliance suite in accordance with UK statutory acts.',
    disclaimerTitle: 'Privacy & Statutory Rigour:',
    disclaimer: 'Calculations strictly aligned with HMRC 2026/27 tax thresholds, Finance Act 2003 (SDLT), Employment Rights Act 1996, and Companies House guidelines. 100% client-side in-browser execution with zero personal or financial data retention.',
    accentClass: 'indigo',
    accentText: 'text-indigo-400',
    accentBorder: 'border-indigo-500/30',
    categories: [
      {
        title: 'HMRC, Tax & Payroll',
        links: [
          { label: 'Take-Home Pay Salary Calculator 2026/27', href: '/uk/take-home-pay-salary-calculator' },
          { label: 'Stamp Duty Land Tax (SDLT) Calculator', href: '/uk/stamp-duty-sdlt-calculator' },
          { label: 'Statutory Redundancy Pay Calculator', href: '/uk/redundancy-pay-statutory-calculator' },
          { label: 'UK VAT & Domestic Reverse Charge', href: '/uk/vat-calculator-uk-reverse-charge' },
          { label: 'Statutory Maternity Pay (SMP) Calculator', href: '/uk/statutory-maternity-pay-smp-calculator' },
        ],
      },
      {
        title: 'Corporate & Self-Assessment',
        links: [
          { label: 'Self-Assessment Payment on Account (s.59A)', href: '/uk/self-assessment-payment-on-account-calculator' },
          { label: 'Dividend Tax & Allowance Calculator', href: '/uk/dividend-tax-calculator' },
          { label: 'Corporation Tax Marginal Relief (19-25%)', href: '/uk/corporation-tax-marginal-relief-calculator' },
          { label: 'Capital Gains Tax (Property & Shares)', href: '/uk/capital-gains-tax-residential-shares-calculator' },
          { label: 'CIS Tax Deduction Calculator (20/30%)', href: '/uk/cis-deduction-calculator' },
        ],
      },
      {
        title: 'Property & Landlord',
        links: [
          { label: 'Section 24 Landlord Mortgage Relief', href: '/uk/section-24-landlord-mortgage-relief-calculator' },
          { label: 'UK Rental Yield & Net Cap Rate', href: '/uk/rental-yield-cap-rate-calculator-uk' },
          { label: 'Mortgage Affordability PRA Stress Test', href: '/uk/mortgage-affordability-stress-test-calculator' },
          { label: 'Leasehold Extension & Marriage Value', href: '/uk/ground-rent-leasehold-extension-calculator' },
          { label: 'Inheritance Tax (NRB & RNRB) Estimator', href: '/uk/inheritance-tax-nrb-rnrb-calculator' },
        ],
      },
      {
        title: 'Compliance & Verification',
        links: [
          { label: 'HM Passport Photo Biometric Tool (35×45mm)', href: '/uk/uk-passport-photo-checker-generator' },
          { label: 'Sort Code & Account Modulus 11 Checker', href: '/uk/hmrc-modulus-11-sort-code-account-validator' },
          { label: 'UK VAT Number Modulo 97 Validator', href: '/uk/vat-number-validator-uk-gb' },
          { label: 'Companies House PDF Filing Compressor', href: '/uk/pdf-compressor-companies-house' },
          { label: 'Right to Work Share Code Checker', href: '/uk/right-to-work-share-code-expiry-calculator' },
        ],
      },
    ],
  },
  mx: {
    code: 'mx',
    countryName: 'México',
    flag: '🇲🇽',
    heroText: 'Herramientas Oficiales Estatutarias para México 2026',
    subText: 'Suite integral de cálculo laboral LFT, tributario SAT, habitacional Infonavit y validadores de identidad oficial mexicana conforme a la legislación vigente y Miscelánea Fiscal.',
    disclaimerTitle: 'Privacidad y Rigor Jurídico Mexicano:',
    disclaimer: 'Cálculos conformes con la Ley Federal del Trabajo (LFT), Ley del Impuesto sobre la Renta (LISR), Código Fiscal de la Federación (CFF) y Resoluciones del H. Consejo de Administración del Infonavit 2026. Procesamiento 100% en tu navegador: ningún dato sensible se transmite a servidores.',
    accentClass: 'emerald',
    accentText: 'text-emerald-500',
    accentBorder: 'border-emerald-700/30',
    categories: [
      {
        title: 'Laboral & Nómina LFT',
        links: [
          { label: 'Sueldo Neto IMSS e ISR 2026', href: '/mx/calculadora-sueldo-neto-imss-isr' },
          { label: 'Finiquito y Liquidación Despido', href: '/mx/calculadora-finiquito-liquidacion-despido' },
          { label: 'Calculadora de Aguinaldo Legal LFT', href: '/mx/calculadora-aguinaldo-ley-federal-trabajo' },
          { label: 'Vacaciones Dignas & Prima Vacacional', href: '/mx/calculadora-vacaciones-dignas-prima-vacacional' },
          { label: 'Calculadora Horas Extras LFT', href: '/mx/calculadora-horas-extras-lft' },
        ],
      },
      {
        title: 'Fiscal & SAT',
        links: [
          { label: 'Calculadora RESICO Personas Físicas', href: '/mx/calculadora-resico-personas-fisicas' },
          { label: 'Retención ISR e IVA Honorarios', href: '/mx/calculadora-honorarios-retencion-isr-iva' },
          { label: 'Deducciones Personales Anuales', href: '/mx/calculadora-deducciones-personales-declaracion-anual' },
          { label: 'Validador Factura CFDI 4.0 SAT', href: '/mx/validador-emisor-cfdi-4-0-sat' },
          { label: 'Amortización de Pérdidas Fiscales', href: '/mx/amortizacion-perdidas-fiscales-sat' },
        ],
      },
      {
        title: 'Crédito & Infonavit',
        links: [
          { label: 'Calculadora Puntos Infonavit T1000', href: '/mx/calculadora-puntos-infonavit-t1000' },
          { label: 'Tabla Amortización Infonavit Pesos/UMA', href: '/mx/tabla-amortizacion-credito-infonavit' },
          { label: 'Gastos Notariales e ISAI Escrituras', href: '/mx/calculadora-gastos-notariales-isai-escrituracion' },
          { label: 'Reajuste Renta Inflación INPC', href: '/mx/reajuste-renta-inpc-arrendamiento' },
          { label: 'Rendimiento Neto Arrendamiento SAT', href: '/mx/calculadora-rendimiento-neto-arrendamiento-sat' },
        ],
      },
      {
        title: 'Trámites & Identidad',
        links: [
          { label: 'Validador y Generador CURP Oficial', href: '/mx/validador-generador-curp-oficial' },
          { label: 'Validador RFC SAT con Homoclave', href: '/mx/validador-rfc-sat-homoclave' },
          { label: 'Foto Infantil y Pasaporte Mexicano SRE', href: '/mx/foto-infantil-pasaporte-mexicano-sre' },
          { label: 'Compresor PDF Buzón Tributario SAT', href: '/mx/compresor-pdf-buzon-tributario-sat' },
          { label: 'Convertidor Números a Letras Pesos M.N.', href: '/mx/convertidor-numeros-a-letras-pesos-moneda-nacional' },
        ],
      },
    ],
  },
};

export function InternationalFooter({ country }: { country: CountryCode }) {
  const config = FOOTER_CONFIGS[country];

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 border border-white/20 text-white shadow-xs">
              <KagazoLogo className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white tracking-tight">Kagazo</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/15 text-white font-mono">
                  {config.flag} {config.countryName}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{config.heroText}</p>
            </div>
          </div>

          {/* Cross-Country Switcher Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Suites:</span>
            </span>
            <Link
              href="/es"
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5',
                country === 'es'
                  ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              )}
            >
              <span>🇪🇸</span>
              <span>España (20)</span>
            </Link>
            <Link
              href="/de"
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5',
                country === 'de'
                  ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              )}
            >
              <span>🇩🇪</span>
              <span>Deutschland (20)</span>
            </Link>
            <Link
              href="/fr"
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5',
                country === 'fr'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              )}
            >
              <span>🇫🇷</span>
              <span>France (20)</span>
            </Link>
            <Link
              href="/it"
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5',
                country === 'it'
                  ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              )}
            >
              <span>🇮🇹</span>
              <span>Italia (20)</span>
            </Link>
            <Link
              href="/br"
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5',
                country === 'br'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              )}
            >
              <span>🇧🇷</span>
              <span>Brasil (20)</span>
            </Link>
            <Link
              href="/uk"
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5',
                country === 'uk'
                  ? 'bg-indigo-900 text-white border-indigo-700 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              )}
            >
              <span>🇬🇧</span>
              <span>UK (20)</span>
            </Link>
            <Link
              href="/mx"
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5',
                country === 'mx'
                  ? 'bg-emerald-700 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              )}
            >
              <span>🇲🇽</span>
              <span>México (20)</span>
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-all text-xs font-bold"
            >
              <span>🌐 Global</span>
            </Link>
          </div>
        </div>

        {/* 4 Pillars Links Grid with Rich High-Contrast Typography */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {config.categories.map((cat, idx) => (
            <div key={cat.title} className="space-y-3">
              <h3 className="font-black text-white uppercase tracking-wider text-xs font-mono flex items-center gap-2">
                <span className={cn('text-xs font-bold', config.accentText)}>0{idx + 1}.</span>
                <span>{cat.title}</span>
              </h3>
              <ul className="space-y-2 text-xs font-medium">
                {cat.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors block py-0.5 hover:translate-x-0.5 transform duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust & E-E-A-T Compliance Guarantee Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">{config.disclaimerTitle}</strong>{' '}
              {config.disclaimer}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-300 shrink-0">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-900">
          <div>
            &copy; {new Date().getFullYear()} Kagazo &middot; {config.heroText}.
          </div>
          <div>
            100% In-Browser Computation &middot; Zero Data Retention
          </div>
        </div>
      </div>
    </footer>
  );
}
