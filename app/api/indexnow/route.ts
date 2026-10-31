import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const INDEXNOW_KEY = 'kagazo2026indexnow';
const SITE_URL = 'https://kagazo.in';

const STATIC_URLS = [
  // Core pages
  '/',
  '/about',
  '/how-it-works',
  '/contact',
  '/privacy',
  '/blog',
  '/tools',
  '/tools/specifications',

  // SEO landing pages (Government Document Verifiers)
  '/verify-aadhaar-pdf',
  '/verify-community-certificate-tamil-nadu',
  '/verify-nativity-certificate-tamil-nadu',
  '/verify-income-certificate',
  '/verify-pan-card-pdf',
  '/verify-digilocker-pdf',
  '/verify-epfo-uan-card',
  '/verify-itr-acknowledgement',
  '/verify-birth-certificate',
  '/verify-death-certificate',
  '/verify-first-graduate-certificate',
  '/verify-legal-heir-certificate',
  '/verify-form-16',
  '/verify-driving-licence-pdf',
  '/verify-vehicle-rc-pdf',
  '/verify-obc-certificate',
  '/verify-meeseva-caste-certificate',
  '/verify-nadakacheri-certificate',
  '/verify-up-edistrict-certificate',
  '/verify-aaple-sarkar-certificate',
  '/verify-kerala-edistrict-certificate',
  '/verify-bihar-rtps-certificate',
  '/verify-wb-edistrict-certificate',
  '/verify-widow-certificate',
  '/verify-solvency-certificate',
  '/verify-deserted-woman-certificate',
  '/verify-intercaste-marriage-certificate',

  // Tools — PDF
  '/tools/pdf-compressor',
  '/tools/compress-pdf-to-100kb',
  '/tools/compress-pdf-to-200kb',
  '/tools/compress-pdf-to-300kb',
  '/tools/compress-pdf-to-500kb',
  '/tools/tnpsc-pdf-compressor',
  '/tools/upsc-pdf-compressor',
  '/tools/ssc-pdf-compressor',
  '/tools/government-exam-pdf-compressor',
  '/tools/tn-marksheet-compressor',
  '/tools/compress-image-to-20kb',
  '/tools/compress-image-to-50kb',
  '/tools/compress-for-whatsapp',
  '/tools/image-to-pdf-200kb',
  '/tools/image-to-pdf-300kb',
  '/tools/pdf-to-image',
  '/tools/unlock-pdf',
  '/tools/merge-marksheets-pdf',
  '/tools/self-attest-pdf',
  '/tools/driving-license-card-merger',

  // Tools — Aadhaar & KYC
  '/tools/mask-aadhaar',
  '/tools/aadhaar-front-back-pdf',
  '/tools/aadhaar-pan-kyc-merge',
  '/tools/pvc-id-card-maker',
  '/tools/a4-multi-card-sheet',

  // Tools — Photo & Signature
  '/tools/tnpsc-photo-signature-resizer',
  '/tools/tnpsc-combo-pack',
  '/tools/upsc-photo-signature-resizer',
  '/tools/upsc-combo-pack',
  '/tools/ssc-photo-signature-resizer',
  '/tools/ssc-combo-pack',
  '/tools/neet-photo-signature-resizer',
  '/tools/ibps-photo-signature-resizer',
  '/tools/ibps-combo-pack',
  '/tools/rrb-photo-signature-resizer',
  '/tools/gate-photo-signature-resizer',
  '/tools/passport-photo-sheet-maker',
  '/tools/stamp-size-photo-maker',
  '/tools/photo-date-name-stamper',
  '/tools/photo-signature-joiner',
  '/tools/batch-photo-resizer',
  '/tools/biometric-face-aligner',
  '/tools/clean-document-scanner',
  '/tools/signature-cleaner-extractor',
  '/tools/thumb-impression-resizer',
  '/tools/handwritten-declaration-scanner',
  '/tools/formal-attire-changer',
  '/tools/college-admission-photo-maker',
  '/tools/ai-video-automation',

  // Tools — TN & Indic Specific
  '/ta',
  '/ta/tools',
  '/ta/tools/tnpsc-combo-pack',
  '/ta/tools/compress-pdf-to-200kb',
  '/ta/tools/compress-image-to-20kb',
  '/ta/tools/compress-image-to-50kb',
  '/ta/tools/tnpsc-photo-signature-resizer',
  '/ta/tools/mask-aadhaar',
  '/tools/tn-esevai-certificate-prep',
  '/tools/tnpsc-otr-compliance-kit',
  '/tools/tnea-cutoff-calculator',
  '/tools/pstm-certificate-generator',

  // Tools — Document Generators
  '/tools/affidavit-generator',
  '/tools/salary-slip-generator',
  '/tools/free-ats-resume-builder',

  // Tools — Financial & Verification
  '/tools/income-tax-calculator-2025-26',
  '/tools/gst-number-verifier',
  '/tools/ifsc-code-finder',

  // Blog posts currently live
  '/blog/fix-yellow-question-mark-aadhaar-pdf',
  '/blog/verify-tamil-nadu-community-nativity-certificate',
  '/blog/verify-pan-card-form-16-digital-signature',
  '/blog/verify-digilocker-digital-signature-driving-license-rc',
  '/blog/verify-community-certificate-tamil-nadu',
  '/blog/tnpsc-otr-document-requirements-2026',
  '/blog/what-is-cca-india-digital-signature',
  '/blog/digilocker-pdf-signature-not-verified-fix',
  '/blog/gstin-verification-online-free',
  '/blog/community-certificate-signature-not-verified-free-fix-how-to-2026-tamil',
  '/blog/tnpsc-otr-photo-size-requirements-2026',
  '/blog/tnpsc-otr-photo-size-requirements-2026-tamil',
  '/blog/tnpsc-otr-photo-size-requirements-2026-hindi',
  '/blog/how-to-fix-tnpsc-otr-photo-signature-upload-rejection',
  '/blog/how-to-print-8-passport-photos-on-4x6-sheet-epson-canon',
  '/blog/upsc-cse-photo-signature-guidelines-name-date-stamp-2026',
  '/blog/ibps-photo-signature-thumb-declaration-size-guidelines-2026',
  '/blog/ssc-live-photo-signature-upload-guidelines-cgl-chsl-2026',
  '/blog/tnpsc-community-nativity-pstm-certificate-pdf-compression-guide',
  '/blog/tnesevai-csc-kiosk-revenue-certificate-pdf-compression-guide',
  '/blog/section-65b-electronic-evidence-digital-signatures-court-validity',
  '/blog/masked-aadhaar-vs-regular-aadhaar-rbi-hotel-kyc-guide-2026',
  '/blog/salary-slip-calculation-format-fy-2025-26-new-tax-regime-guide',
  '/blog/indian-marriage-biodata-format-guide-traditional-modern-kundli',

  // --- International Sovereign Suites (160 Tools + 8 Hubs) ---
  // Spain (ES)
  '/es',
  '/es/calculadora-sueldo-neto',
  '/es/calculadora-irpf-autonomos',
  '/es/calculadora-finiquito-despido',
  '/es/generador-factura-pdf',
  '/es/validador-dni-nie-cif',
  '/es/calculadora-jubilacion-pension',
  '/es/calculador-horas-extras',
  '/es/calculadora-hipoteca-euribor',
  '/es/calculadora-itp-gastos-compraventa',
  '/es/calculadora-plusvalia-municipal',
  '/es/actualizador-alquiler-ipc',
  '/es/simulador-rentabilidad-alquiler',
  '/es/foto-carnet-dni-pasaporte',
  '/es/validador-iban-espana',
  '/es/compresor-pdf-sede-electronica',
  '/es/calculadora-iva-trimestral',
  '/es/calculadora-precio-gasolina-viaje',
  '/es/calculadora-dias-habiles',
  '/es/contador-palabras-caracteres',
  '/es/calculadora-descuentos-rebajas',

  // Germany (DE)
  '/de',
  '/de/brutto-netto-rechner',
  '/de/abfindungsrechner',
  '/de/kleinunternehmer-rechnung',
  '/de/der-die-das-finder',
  '/de/stundenlohnrechner',
  '/de/firmenwagenrechner',
  '/de/kurzarbeitergeld-rechner',
  '/de/notar-und-grundbuchkostenrechner',
  '/de/grunderwerbsteuer-rechner',
  '/de/mieterhoehung-kappungsgrenze-rechner',
  '/de/baufinanzierung-tilgungsrechner',
  '/de/mietkautionsrechner',
  '/de/passfoto-generator-biometrisch',
  '/de/iban-pruefer-bic-finder',
  '/de/pdf-kompressor-online-antraege',
  '/de/gewerbesteuerrechner',
  '/de/skontorechner',
  '/de/notenumrechner-bayerische-formel',
  '/de/rabatt-prozent-rechner',
  '/de/spritkostenrechner-fahrtkosten',

  // France (FR)
  '/fr',
  '/fr/calculateur-salaire-net-brut',
  '/fr/simulateur-charges-urssaf',
  '/fr/calculateur-indemnite-rupture',
  '/fr/calculateur-indemnite-fin-cdd',
  '/fr/calculateur-heures-supplementaires',
  '/fr/simulateur-cout-embauche-employeur',
  '/fr/calculateur-frais-de-notaire',
  '/fr/simulateur-pret-immobilier-mensualite',
  '/fr/simulateur-plus-value-immobiliere',
  '/fr/calculateur-rendement-locatif',
  '/fr/simulateur-pret-taux-zero-ptz',
  '/fr/validateur-siren-siret',
  '/fr/facture-auto-entrepreneur',
  '/fr/photo-identite-passeport-ants',
  '/fr/compresseur-pdf-france-travail',
  '/fr/calculateur-tva-francaise',
  '/fr/simulateur-frais-kilometriques',
  '/fr/calculateur-remise-solde',
  '/fr/calculateur-duree-travail-heures-decimales',
  '/fr/convertisseur-chiffre-en-lettre',

  // Italy (IT)
  '/it',
  '/it/calcolo-stipendio-netto-irpef',
  '/it/calcolo-tfr-dimissioni-licenziamento',
  '/it/calcolo-partita-iva-forfettario',
  '/it/calcolo-naspi-inps',
  '/it/calcolo-busta-paga-lordo-netto',
  '/it/calcolo-mutuo-euribor-irs',
  '/it/calcolo-imposta-registro-prima-casa',
  '/it/calcolo-plusvalenza-immobiliare',
  '/it/adeguamento-affitto-istat',
  '/it/calcolo-rendimento-cedolare-secca',
  '/it/calcolatore-codice-fiscale-omocodia',
  '/it/controllo-partita-iva-modulo-10',
  '/it/foto-tessera-carta-identita-passaporto',
  '/it/verifica-iban-italiano-cin-abi-cab',
  '/it/compressore-pdf-agenzia-entrate',
  '/it/calcolo-fattura-elettronica-rivalsa-inps',
  '/it/calcolo-bollo-auto-regione',
  '/it/calcolo-giorni-lavorativi-festivita-italiane',
  '/it/calcolo-ravvedimento-operoso-f24',
  '/it/calcolo-assegno-unico-inps',

  // Brazil (BR)
  '/br',
  '/br/calculadora-salario-liquido-clt',
  '/br/calculadora-rescisao-clt',
  '/br/calculadora-decimo-terceiro',
  '/br/calculo-ferias-clt',
  '/br/calculo-horas-extras-dsr',
  '/br/calculadora-simples-nacional',
  '/br/calculadora-das-mei',
  '/br/calculadora-carne-leao',
  '/br/retencao-impostos-nota-fiscal',
  '/br/calculadora-dissidio-salarial',
  '/br/simulador-financiamento-sac-price',
  '/br/calculadora-itbi-escritura',
  '/br/reajuste-aluguel-ipca-igpm',
  '/br/calculadora-rendimento-aluguel-liquido',
  '/br/amortizacao-financiamento-fgts',
  '/br/validador-gerador-cpf-cnpj',
  '/br/foto-3x4-documentos-passaporte',
  '/br/compressor-pdf-pje-tribunais',
  '/br/calculadora-prazos-processuais-cpc',
  '/br/valor-por-extenso-recibo',

  // United Kingdom (UK)
  '/uk',
  '/uk/take-home-pay-salary-calculator',
  '/uk/self-assessment-payment-on-account-calculator',
  '/uk/redundancy-pay-statutory-calculator',
  '/uk/statutory-maternity-pay-smp-calculator',
  '/uk/vat-calculator-uk-reverse-charge',
  '/uk/stamp-duty-sdlt-calculator',
  '/uk/section-24-landlord-mortgage-relief-calculator',
  '/uk/rental-yield-cap-rate-calculator-uk',
  '/uk/mortgage-affordability-stress-test-calculator',
  '/uk/ground-rent-leasehold-extension-calculator',
  '/uk/corporation-tax-marginal-relief-calculator',
  '/uk/dividend-tax-calculator',
  '/uk/capital-gains-tax-residential-shares-calculator',
  '/uk/inheritance-tax-nrb-rnrb-calculator',
  '/uk/cis-deduction-calculator',
  '/uk/uk-passport-photo-checker-generator',
  '/uk/hmrc-modulus-11-sort-code-account-validator',
  '/uk/vat-number-validator-uk-gb',
  '/uk/pdf-compressor-companies-house',
  '/uk/right-to-work-share-code-expiry-calculator',

  // Mexico (MX)
  '/mx',
  '/mx/calculadora-sueldo-neto-imss-isr',
  '/mx/calculadora-finiquito-liquidacion-despido',
  '/mx/calculadora-aguinaldo-ley-federal-trabajo',
  '/mx/calculadora-vacaciones-dignas-prima-vacacional',
  '/mx/calculadora-horas-extras-lft',
  '/mx/calculadora-resico-personas-fisicas',
  '/mx/calculadora-honorarios-retencion-isr-iva',
  '/mx/calculadora-deducciones-personales-declaracion-anual',
  '/mx/validador-emisor-cfdi-4-0-sat',
  '/mx/amortizacion-perdidas-fiscales-sat',
  '/mx/calculadora-puntos-infonavit-t1000',
  '/mx/tabla-amortizacion-credito-infonavit',
  '/mx/calculadora-gastos-notariales-isai-escrituracion',
  '/mx/reajuste-renta-inpc-arrendamiento',
  '/mx/calculadora-rendimiento-neto-arrendamiento-sat',
  '/mx/validador-generador-curp-oficial',
  '/mx/validador-rfc-sat-homoclave',
  '/mx/foto-infantil-pasaporte-mexicano-sre',
  '/mx/compresor-pdf-buzon-tributario-sat',
  '/mx/convertidor-numeros-a-letras-pesos-moneda-nacional',

  // Australia (AU)
  '/au',
  '/au/payg-withholding-salary-calculator',
  '/au/superannuation-guarantee-calculator',
  '/au/goods-and-services-tax-gst-calculator',
  '/au/capital-gains-tax-cgt-discount-calculator',
  '/au/hecs-help-repayment-calculator',
  '/au/redundancy-pay-fair-work-calculator',
  '/au/annual-leave-loading-calculator',
  '/au/unfair-dismissal-high-income-threshold-checker',
  '/au/fbt-car-fringe-benefit-calculator',
  '/au/contractor-vs-employee-sham-contracting-checker',
  '/au/stamp-duty-conveyancing-calculator',
  '/au/land-tax-state-revenue-calculator',
  '/au/rental-yield-negative-gearing-calculator',
  '/au/capital-works-div-43-depreciation-calculator',
  '/au/first-home-super-saver-fhss-calculator',
  '/au/australian-passport-photo-checker-generator',
  '/au/abn-lookup-modulus-89-validator',
  '/au/tfn-tax-file-number-validator',
  '/au/pdf-compressor-asic-ato',
  '/au/number-to-words-aud-cents-converter',
];

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://yandex.com/indexnow',
  'https://search.seznam.cz/indexnow',
];

async function submitToIndexNow(urls: string[]) {
  const payload = {
    host: 'kagazo.in',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.map((u) => (u.startsWith('http') ? u : `${SITE_URL}${u}`)),
  };

  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(async (endpoint) => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return { endpoint, status: res.status };
    })
  );

  const successful = results.find(
    (r) => r.status === 'fulfilled' && (r.value.status === 200 || r.value.status === 202)
  );

  if (successful && successful.status === 'fulfilled') {
    return successful.value.status;
  }

  const firstFulfilled = results.find((r) => r.status === 'fulfilled');
  return firstFulfilled && firstFulfilled.status === 'fulfilled'
    ? firstFulfilled.value.status
    : 500;
}

// POST — submit specific URLs
// Called automatically after new blog post published
export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'urls array required' }, { status: 400 });
    }

    const status = await submitToIndexNow(urls);

    return NextResponse.json({
      success: true,
      status,
      submitted: urls.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}

// GET — submit ALL site URLs
// Called by cron job every Monday
// Or manually by admin
export async function GET() {
  try {
    // Start with static URLs
    const allUrls = [...STATIC_URLS];

    // Add dynamic blog posts from Supabase
    try {
      let blogPosts: { slug: string }[] | null = null;
      // First try status column as in spec, then fallback to published boolean if schema differs
      const { data: byStatus } = await supabaseAdmin
        .from('blog_posts')
        .select('slug')
        .eq('status', 'published');

      if (byStatus && byStatus.length > 0) {
        blogPosts = byStatus;
      } else {
        const { data: byPublished } = await supabaseAdmin
          .from('blog_posts')
          .select('slug')
          .eq('published', true);
        if (byPublished) {
          blogPosts = byPublished;
        }
      }

      if (blogPosts) {
        for (const post of blogPosts) {
          const blogUrl = `/blog/${post.slug}`;
          if (!allUrls.includes(blogUrl)) {
            allUrls.push(blogUrl);
          }
        }
      }
    } catch {
      // Supabase failed — continue with static list
    }

    // Remove duplicates
    const uniqueUrls = Array.from(new Set(allUrls));

    // Submit in batches of 100
    const batches: string[][] = [];
    for (let i = 0; i < uniqueUrls.length; i += 100) {
      batches.push(uniqueUrls.slice(i, i + 100));
    }

    const results = [];
    for (const batch of batches) {
      const status = await submitToIndexNow(batch);
      results.push({
        count: batch.length,
        status,
      });
    }

    return NextResponse.json({
      success: true,
      total_urls: uniqueUrls.length,
      batches: results.length,
      results,
    });
  } catch (error) {
    return NextResponse.json({ error: 'IndexNow failed' }, { status: 500 });
  }
}
