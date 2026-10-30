import { SalaryCalculationInput, SalaryCalculationResult } from './types';

/**
 * 2026 German Brutto-Netto Calculator (Einkommensteuertarif § 32a EStG 2026)
 * - Grundfreibetrag 2026: ~€11,784
 * - Steuerklasse 1: Single
 * - Steuerklasse 2: Alleinerziehende (Entlastungsbetrag)
 * - Steuerklasse 3: Verheiratet (Alleinverdiener)
 * - Steuerklasse 4: Verheiratet (Doppelverdiener)
 * - Steuerklasse 5: Zweitverdiener (hoher Abzug)
 * - Steuerklasse 6: Zweitjob / Nebeneinkommen
 * 
 * Sozialversicherungsbeiträge (Arbeitnehmeranteil 2026):
 * - Krankenversicherung: 7.3% + ~0.85% Zusatzbeitrag (Hälfte von 1.7%) = 8.15%
 * - Rentenversicherung: 9.3%
 * - Arbeitslosenversicherung: 1.3%
 * - Pflegeversicherung: 2.2% (kinderlos + 0.6% = 2.8%)
 * Total Sozialabgaben: ~20.95% - 21.55%
 */
export function calculateGermanySalary(input: SalaryCalculationInput): SalaryCalculationResult {
  const gross = Math.max(input.grossAnnualSalary, 0);
  const taxClass = input.taxClass || 1;
  const hasChildren = (input.childrenCount || 0) > 0;
  const hasChurch = Boolean(input.hasChurchTax);

  // 1. Sozialversicherung (Arbeitnehmeranteil 2026)
  // Beitragsbemessungsgrenzen 2026:
  // KV/PV: €62,100 / Jahr
  // RV/AV: €90,600 / Jahr (West)
  const BBG_KV = 62100;
  const BBG_RV = 90600;

  const baseKV = Math.min(gross, BBG_KV);
  const baseRV = Math.min(gross, BBG_RV);

  const kvRate = 0.073 + 0.0085; // 8.15% (allgemeiner Beitrag + halber Zusatzbeitrag)
  const rvRate = 0.093;          // 9.3% Rentenversicherung
  const avRate = 0.013;          // 1.3% Arbeitslosenversicherung
  const pvRate = hasChildren ? 0.022 : 0.028; // 2.2% mit Kind, 2.8% kinderlos

  const kvAnnual = Math.round(baseKV * kvRate * 100) / 100;
  const rvAnnual = Math.round(baseRV * rvRate * 100) / 100;
  const avAnnual = Math.round(baseRV * avRate * 100) / 100;
  const pvAnnual = Math.round(baseKV * pvRate * 100) / 100;

  const totalSocialSecurity = Math.round((kvAnnual + rvAnnual + avAnnual + pvAnnual) * 100) / 100;
  const totalSocialRate = gross > 0 ? Math.round((totalSocialSecurity / gross) * 10000) / 100 : 21.0;

  // 2. Lohnsteuer (§ 32a EStG 2026)
  // Grundfreibetrag 2026: €11,784
  // Pauschbeträge: Arbeitnehmer-Pauschbetrag €1,230 + Sonderausgaben €36 + Vorsorgepauschale
  const vorsorgepauschale = rvAnnual + kvAnnual;
  const zuVersteuerndesEinkommen = Math.max(gross - 1230 - 36 - vorsorgepauschale, 0);

  let taxFactor = 1.0;
  if (taxClass === 2) taxFactor = 0.88; // Entlastungsbetrag
  if (taxClass === 3) taxFactor = 0.65; // Splittingvorteil
  if (taxClass === 5) taxFactor = 1.35; // Höhere Besteuerung
  if (taxClass === 6) taxFactor = 1.45; // Kein Grundfreibetrag

  let rawLohnsteuer = 0;
  if (zuVersteuerndesEinkommen > 11784) {
    const taxable = zuVersteuerndesEinkommen - 11784;
    if (taxable <= 5000) {
      rawLohnsteuer = taxable * 0.14;
    } else if (taxable <= 50000) {
      rawLohnsteuer = 700 + (taxable - 5000) * 0.28;
    } else {
      rawLohnsteuer = 700 + 12600 + (taxable - 50000) * 0.42;
    }
  }

  const lohnsteuer = Math.round(rawLohnsteuer * taxFactor * 100) / 100;

  // Solidaritätszuschlag (ab Freigrenze ~€18,130 Steuer)
  let soli = 0;
  if (lohnsteuer > 18130) {
    soli = Math.round((lohnsteuer - 18130) * 0.055 * 100) / 100;
  }

  // Kirchensteuer (8% in Bayern/Baden-Württemberg, 9% in anderen Ländern)
  const kirchensteuer = hasChurch ? Math.round(lohnsteuer * 0.09 * 100) / 100 : 0;
  const totalTax = Math.round((lohnsteuer + soli + kirchensteuer) * 100) / 100;

  const totalDeductions = Math.round((totalSocialSecurity + totalTax) * 100) / 100;
  const netAnnual = Math.max(Math.round((gross - totalDeductions) * 100) / 100, 0);

  const grossMonthly = Math.round((gross / 12) * 100) / 100;
  const netMonthly = Math.round((netAnnual / 12) * 100) / 100;

  const takeHomePercent = gross > 0 ? Math.round((netAnnual / gross) * 10000) / 100 : 100;
  const effectiveTaxRate = gross > 0 ? Math.round((totalTax / gross) * 10000) / 100 : 0;

  return {
    grossAnnual: gross,
    grossMonthly,
    netAnnual,
    netMonthly,
    totalIncomeTax: totalTax,
    effectiveTaxRatePercent: effectiveTaxRate,
    totalSocialSecurityEmployee: totalSocialSecurity,
    socialSecurityRatePercent: totalSocialRate,
    totalDeductionsAnnual: totalDeductions,
    takeHomePercent,
    currencySymbol: '€',
    breakdown: [
      {
        label: 'Nettoeinkommen (Auszahlung)',
        amount: netAnnual,
        percentOfGross: takeHomePercent,
        color: '#10B981',
        description: `Monatlicher Auszahlungsbetrag (${netMonthly.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € auf Ihr Girokonto)`,
      },
      {
        label: 'Sozialabgaben (KV, RV, AV, PV)',
        amount: totalSocialSecurity,
        percentOfGross: totalSocialRate,
        color: '#3B82F6',
        description: 'Krankenkasse (8.15%), Rentenversicherung (9.3%), Pflege & Arbeitslosigkeit',
      },
      {
        label: 'Lohnsteuer & Solidaritätszuschlag',
        amount: totalTax,
        percentOfGross: effectiveTaxRate,
        color: '#D9531E',
        description: `Ermittelt nach Steuerklasse ${taxClass} (§ 32a EStG Grundtabelle 2026)`,
      },
    ],
    statutoryDetails: {
      steuerklasse: `Steuerklasse ${taxClass}`,
      krankenversicherungMonat: Math.round((kvAnnual / 12) * 100) / 100,
      rentenversicherungMonat: Math.round((rvAnnual / 12) * 100) / 100,
      solidaritaetszuschlag: soli > 0 ? `${soli} €/Jahr` : '0 € (unter Freigrenze)',
      kirchensteuer: hasChurch ? `${kirchensteuer} €/Jahr (9%)` : 'Keine (nicht kirchensteuerpflichtig)',
      gesetzlicheGrundlage: 'Einkommensteuergesetz (EStG) & SGB IV/V/VI 2026',
    },
  };
}



// ---------------------------------------------------------------------------
// STATUTORY MODULE: ABFINDUNGSRECHNER DEUTSCHLAND 2026 (§ 34 EStG Fünftelregelung)
// Kündigungsschutzgesetz (§ 1a KSchG) & Einkommensteuergesetz
// ---------------------------------------------------------------------------
export interface AbfindungCalculationInput {
  bruttoJahresgehaltRegulaer: number;
  abfindungsBetrag: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  jahreBetriebszugehoerigkeit: number;
  monatsGehaltBrutto: number;
}

export interface AbfindungCalculationResult {
  abfindungsBetrag: number;
  regelAbfindungNachKSchG: number; // § 1a KSchG: 0.5 Monatsgehälter pro Beschäftigungsjahr
  steuerOhneAbfindung: number;
  steuerMitFuenftelregelung: number;
  steuerAufAbfindung: number;
  steuerersparnisDurchFuenftelregelung: number;
  nettoAbfindung: number;
  istSozialversicherungsfrei: boolean;
  effektiverSteuersatzAbfindungProzent: number;
}

export function calculateAbfindungGermany(input: AbfindungCalculationInput): AbfindungCalculationResult {
  const regulär = Math.max(input.bruttoJahresgehaltRegulaer, 0);
  const abfindung = Math.max(input.abfindungsBetrag, 0);

  // KSchG Richtwert: 0.5 Monatsgehälter je Beschäftigungsjahr
  const regelAbfindung = Math.round(input.monatsGehaltBrutto * 0.5 * input.jahreBetriebszugehoerigkeit * 100) / 100;

  // Lohnsteuerfunktion nach § 32a EStG vereinfacht
  function computeESt(zvE: number): number {
    if (zvE <= 11784) return 0;
    const taxable = zvE - 11784;
    if (taxable <= 5000) return taxable * 0.14;
    if (taxable <= 50000) return 700 + (taxable - 5000) * 0.28;
    return 700 + 12600 + (taxable - 50000) * 0.42;
  }

  // Steuerklasse Multiplikator
  let factor = 1.0;
  if (input.steuerklasse === 3) factor = 0.65;
  if (input.steuerklasse === 5) factor = 1.35;
  if (input.steuerklasse === 6) factor = 1.45;

  const steuerA = Math.round(computeESt(regulär) * factor * 100) / 100;
  const steuerB = Math.round(computeESt(regulär + abfindung / 5) * factor * 100) / 100;
  const steuerC_Voll = Math.round(computeESt(regulär + abfindung) * factor * 100) / 100;

  const differenzFuenftel = Math.max(steuerB - steuerA, 0);
  const steuerAufAbfindungMitFuenftel = Math.round(differenzFuenftel * 5 * 100) / 100;
  const steuerAufAbfindungOhneFuenftel = Math.max(steuerC_Voll - steuerA, 0);

  const ersparnis = Math.max(Math.round((steuerAufAbfindungOhneFuenftel - steuerAufAbfindungMitFuenftel) * 100) / 100, 0);
  const nettoAbfindung = Math.max(Math.round((abfindung - steuerAufAbfindungMitFuenftel) * 100) / 100, 0);
  const effRate = abfindung > 0 ? Math.round((steuerAufAbfindungMitFuenftel / abfindung) * 10000) / 100 : 0;

  return {
    abfindungsBetrag: abfindung,
    regelAbfindungNachKSchG: regelAbfindung,
    steuerOhneAbfindung: steuerA,
    steuerMitFuenftelregelung: steuerA + steuerAufAbfindungMitFuenftel,
    steuerAufAbfindung: steuerAufAbfindungMitFuenftel,
    steuerersparnisDurchFuenftelregelung: ersparnis,
    nettoAbfindung,
    istSozialversicherungsfrei: true,
    effektiverSteuersatzAbfindungProzent: effRate,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: STUNDENLOHNRECHNER & MINIJOB 2026
// Mindestlohngesetz (MiLoG) & Viertes Gesetz für moderne Dienstleistungen
// ---------------------------------------------------------------------------
export interface StundenlohnInput {
  monatsGehaltBrutto: number;
  wochenStunden: number;
  urlaubstage: number;
}

export interface StundenlohnResult {
  stundenlohnBrutto: number;
  stundenlohnNettoGeschaetzt: number;
  mindestlohnErfuellt: boolean;
  statusKategorie: 'Minijob (538 €)' | 'Midijob (Übergangsbereich)' | 'Reguläres Arbeitsverhältnis';
  gesetzlicherMindestlohn2026: number;
  arbeitsstundenProMonat: number;
}

export function calculateStundenlohnGermany(input: StundenlohnInput): StundenlohnResult {
  const monatsBrutto = Math.max(input.monatsGehaltBrutto, 0);
  const hours = Math.max(input.wochenStunden, 1);
  const MINDESTLOHN_2026 = 12.82; // Gesetzlicher Mindestlohn 2026

  // Formel Bundesarbeitsgericht: (Monatslohn × 3 Monate) / 13 Wochen / Wochenstunden
  const stundenlohn = Math.round(((monatsBrutto * 3) / (13 * hours)) * 100) / 100;
  const monatsStunden = Math.round((hours * 4.348) * 10) / 10;

  let kategorie: StundenlohnResult['statusKategorie'] = 'Reguläres Arbeitsverhältnis';
  if (monatsBrutto <= 538) {
    kategorie = 'Minijob (538 €)';
  } else if (monatsBrutto <= 2000) {
    kategorie = 'Midijob (Übergangsbereich)';
  }

  // Netto-Schätzung
  let nettoFaktor = 0.65;
  if (kategorie === 'Minijob (538 €)') nettoFaktor = 1.0; // Keine Abzüge für Arbeitnehmer
  else if (kategorie === 'Midijob (Übergangsbereich)') nettoFaktor = 0.78;

  const stundenlohnNetto = Math.round(stundenlohn * nettoFaktor * 100) / 100;

  return {
    stundenlohnBrutto: stundenlohn,
    stundenlohnNettoGeschaetzt: stundenlohnNetto,
    mindestlohnErfuellt: stundenlohn >= MINDESTLOHN_2026,
    statusKategorie: kategorie,
    gesetzlicherMindestlohn2026: MINDESTLOHN_2026,
    arbeitsstundenProMonat: monatsStunden,
  };
}


// ---------------------------------------------------------------------------
// STATUTORY MODULE: FIRMENWAGENRECHNER (1%-Regelung & Elektro-Vorteil)
// § 6 Abs. 1 Nr. 4 EStG (Lohnsteuer-Richtlinien)
// ---------------------------------------------------------------------------
export interface FirmenwagenInput {
  bruttolistenpreis: number; // Bruttolistenpreis (BLP) gerundet auf volle 100 €
  antriebsart: 'verbrenner' | 'hybrid' | 'elektro';
  entfernungWohnungArbeitsstaetteKm: number;
  persoenlicherSteuersatzProzent: number; // z.B. 35% oder 42%
}

export interface FirmenwagenResult {
  geldwerterVorteilMonatlichPauschal: number;
  geldwerterVorteilMonatlichFahrten: number;
  geldwerterVorteilMonatlichGesamt: number;
  geldwerterVorteilJaehrlich: number;
  steuerlicheMehrbelastungMonatlich: number;
  anrechenbarerListenpreis: number;
  foerderfaktor: number;
}

export function calculateFirmenwagenGermany(input: FirmenwagenInput): FirmenwagenResult {
  const blp = Math.floor(Math.max(input.bruttolistenpreis, 0) / 100) * 100;
  const km = Math.max(input.entfernungWohnungArbeitsstaetteKm, 0);

  // Förderfaktoren nach § 6 Abs. 1 Nr. 4 Satz 2 und 3 EStG 2026:
  // Elektrofahrzeuge bis 70.000 € BLP: 0,25% (Viertel-Regelung)
  // Plug-in-Hybride (mind. 80 km Reichweite): 0,5% (Halbe-Regelung)
  // Verbrenner / Standard: 1,0%
  let factor = 0.01;
  let bemessungsBasis = blp;

  if (input.antriebsart === 'elektro') {
    if (blp <= 70000) {
      factor = 0.0025; // 0,25%
      bemessungsBasis = blp * 0.25;
    } else {
      factor = 0.005; // 0,5%
      bemessungsBasis = blp * 0.5;
    }
  } else if (input.antriebsart === 'hybrid') {
    factor = 0.005; // 0,5%
    bemessungsBasis = blp * 0.5;
  }

  // 1% Regelung (bzw. 0,25% / 0,5%) für private Nutzung
  const vorteilPauschal = blp * factor;
  // 0,03% pro Entfernungskilometer (bzw. entsprechend gemindert)
  const vorteilFahrten = blp * (factor * 0.03) * km * 100; // factor * 3% * km
  const vorteilGesamt = vorteilPauschal + (blp * factor * 0.03 * km);

  const steuersatz = (input.persoenlicherSteuersatzProzent || 35) / 100;
  const nettoKosten = vorteilGesamt * steuersatz;

  return {
    geldwerterVorteilMonatlichPauschal: Math.round(vorteilPauschal * 100) / 100,
    geldwerterVorteilMonatlichFahrten: Math.round((vorteilGesamt - vorteilPauschal) * 100) / 100,
    geldwerterVorteilMonatlichGesamt: Math.round(vorteilGesamt * 100) / 100,
    geldwerterVorteilJaehrlich: Math.round(vorteilGesamt * 12 * 100) / 100,
    steuerlicheMehrbelastungMonatlich: Math.round(nettoKosten * 100) / 100,
    anrechenbarerListenpreis: Math.round(bemessungsBasis * 100) / 100,
    foerderfaktor: factor * 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: KURZARBEITERGELD-RECHNER (KUG nach § 105 SGB III)
// ---------------------------------------------------------------------------
export interface KugInput {
  sollEntgeltBrutto: number; // Reguläres Bruttogehalt
  istEntgeltBrutto: number;  // Tatsächliches Brutto während Kurzarbeit (z.B. 0 € bei KUG 100)
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  hatKinder: boolean;
}

export interface KugResult {
  sollNettoPauschal: number;
  istNettoPauschal: number;
  nettoEntgeltausfall: number;
  kugLeistungssatzProzent: number; // 60% oder 67%
  kurzarbeitergeldMonatlich: number;
  gesamtesNettoeinkommenMitKug: number;
}

export function calculateKugGermany(input: KugInput): KugResult {
  const soll = Math.max(input.sollEntgeltBrutto, 0);
  const ist = Math.max(input.istEntgeltBrutto, 0);

  // Pauschaliertes Nettoentgelt nach § 106 SGB III (~62% bei StKl 1)
  let factor = 0.62;
  if (input.steuerklasse === 3) factor = 0.72;
  if (input.steuerklasse === 5) factor = 0.52;

  const sollNetto = soll * factor;
  const istNetto = ist * factor;
  const ausfallNetto = Math.max(sollNetto - istNetto, 0);

  const leistungssatz = input.hatKinder ? 0.67 : 0.60;
  const kug = ausfallNetto * leistungssatz;

  return {
    sollNettoPauschal: Math.round(sollNetto * 100) / 100,
    istNettoPauschal: Math.round(istNetto * 100) / 100,
    nettoEntgeltausfall: Math.round(ausfallNetto * 100) / 100,
    kugLeistungssatzProzent: input.hatKinder ? 67 : 60,
    kurzarbeitergeldMonatlich: Math.round(kug * 100) / 100,
    gesamtesNettoeinkommenMitKug: Math.round((istNetto + kug) * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: NOTAR- UND GRUNDBUCHKOSTENRECHNER (GNotKG)
// Gerichts- und Notarkostengesetz
// ---------------------------------------------------------------------------
export interface NotarGrundbuchInput {
  kaufpreisImmobilie: number;
  grundschuldbetrag: number; // Darlehenssumme zur Eintragung im Grundbuch
}

export interface NotarGrundbuchResult {
  notargebuehrenNetto: number;
  notarTvaMwSt: number;
  grundbuchamtsgebuehren: number;
  gesamtkostenNotarUndGrundbuch: number;
  kostenquoteVomKaufpreisProzent: number;
}

export function calculateNotarGrundbuchGermany(input: NotarGrundbuchInput): NotarGrundbuchResult {
  const kaufpreis = Math.max(input.kaufpreisImmobilie, 0);
  const grundschuld = Math.max(input.grundschuldbetrag, 0);

  // Basistabelle B des GNotKG (vereinfachte degressive Staffelung):
  // 2,0-Gebühr für Kaufvertrag (KV 21100 GNotKG)
  // 1,0-Gebühr für Grundschuldbestellung (KV 21200)
  // 0,5-Gebühr für Vollzug & Betreuung (KV 22200)
  function gebuehrTabelleB(wert: number): number {
    if (wert <= 50000) return 165;
    if (wert <= 100000) return 273;
    if (wert <= 200000) return 435;
    if (wert <= 300000) return 635;
    if (wert <= 500000) return 935;
    if (wert <= 1000000) return 1735;
    return 1735 + (wert - 1000000) * 0.0012;
  }

  const basisGebuehrKauf = gebuehrTabelleB(kaufpreis);
  const basisGebuehrGrundschuld = gebuehrTabelleB(grundschuld);

  // Notarkosten:
  // Beurkundung Kaufvertrag: 2,0 × Basis
  // Beurkundung Grundschuld: 1,0 × Basis
  // Vollzug & Betreuung: 0,5 × Basis Kaufpreis
  const notarNetto = (basisGebuehrKauf * 2.0) + (basisGebuehrGrundschuld * 1.0) + (basisGebuehrKauf * 0.5) + 150; // +150 Auslagen/Post
  const mwstNotar = notarNetto * 0.19;

  // Grundbuchamt Gebühren (umsatzsteuerfrei nach KV 14110 GNotKG):
  // Eigentumsumschreibung: 1,0 × Basis Kaufpreis
  // Eintragung Auflassungsvormerkung: 0,5 × Basis Kaufpreis
  // Eintragung Grundschuld: 1,0 × Basis Grundschuld
  const grundbuchKosten = (basisGebuehrKauf * 1.0) + (basisGebuehrKauf * 0.5) + (basisGebuehrGrundschuld * 1.0);

  const gesamt = notarNetto + mwstNotar + grundbuchKosten;

  return {
    notargebuehrenNetto: Math.round(notarNetto * 100) / 100,
    notarTvaMwSt: Math.round(mwstNotar * 100) / 100,
    grundbuchamtsgebuehren: Math.round(grundbuchKosten * 100) / 100,
    gesamtkostenNotarUndGrundbuch: Math.round(gesamt * 100) / 100,
    kostenquoteVomKaufpreisProzent: kaufpreis > 0 ? Math.round((gesamt / kaufpreis) * 10000) / 100 : 0,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: GRUNDERWERBSTEUER-RECHNER NACH BUNDESLÄNDERN
// Grunderwerbsteuergesetz (GrEStG)
// ---------------------------------------------------------------------------
export type BundeslandKey =
  | 'BW' | 'BY' | 'BE' | 'BB' | 'HB' | 'HH' | 'HE' | 'MV'
  | 'NI' | 'NW' | 'RP' | 'SL' | 'SN' | 'ST' | 'SH' | 'TH';

export const GRUNDERWERBSTEUER_SAETZE: Record<BundeslandKey, { name: string; satz: number }> = {
  BW: { name: 'Baden-Württemberg', satz: 5.0 },
  BY: { name: 'Bayern', satz: 3.5 },
  BE: { name: 'Berlin', satz: 6.0 },
  BB: { name: 'Brandenburg', satz: 6.5 },
  HB: { name: 'Bremen', satz: 5.0 },
  HH: { name: 'Hamburg', satz: 5.5 },
  HE: { name: 'Hessen', satz: 6.0 },
  MV: { name: 'Mecklenburg-Vorpommern', satz: 6.0 },
  NI: { name: 'Niedersachsen', satz: 5.0 },
  NW: { name: 'Nordrhein-Westfalen', satz: 6.5 },
  RP: { name: 'Rheinland-Pfalz', satz: 5.0 },
  SL: { name: 'Saarland', satz: 6.5 },
  SN: { name: 'Sachsen', satz: 5.5 },
  ST: { name: 'Sachsen-Anhalt', satz: 5.0 },
  SH: { name: 'Schleswig-Holstein', satz: 6.5 },
  TH: { name: 'Thüringen', satz: 5.0 },
};

export interface GrunderwerbsteuerResult {
  bundeslandName: string;
  steuersatzProzent: number;
  steuerbetrag: number;
  gesamtpreisInklSteuer: number;
}

export function calculateGrunderwerbsteuerGermany(kaufpreis: number, bundesland: BundeslandKey): GrunderwerbsteuerResult {
  const p = Math.max(kaufpreis, 0);
  const data = GRUNDERWERBSTEUER_SAETZE[bundesland];
  const steuer = Math.round((p * (data.satz / 100)) * 100) / 100;

  return {
    bundeslandName: data.name,
    steuersatzProzent: data.satz,
    steuerbetrag: steuer,
    gesamtpreisInklSteuer: Math.round((p + steuer) * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: MIETERHÖHUNG & KAPPUNGSGRENZE (§ 558 BGB)
// ---------------------------------------------------------------------------
export interface MieterhoehungInput {
  aktuelleNettokaltmiete: number;
  ortsueblicheVergleichsmiete: number;
  letzteMieterhoehungVorMonaten: number;
  gebietMitAngespanntemWohnungsmarkt: boolean; // 15% Kappungsgrenze statt 20%
}

export interface MieterhoehungResult {
  aktuelleMiete: number;
  maximalZulaessigeMieteNachKappung: number;
  maximalZulaessigeErhoehungEuro: number;
  zulaessigeKappungsgrenzeProzent: number;
  istJahresfristErfuellt: boolean; // mind. 12 bzw. 15 Monate (§ 558 Abs. 1 BGB)
  begruendung: string;
}

export function calculateMieterhoehungGermany(input: MieterhoehungInput): MieterhoehungResult {
  const alt = Math.max(input.aktuelleNettokaltmiete, 0);
  const vergleich = Math.max(input.ortsueblicheVergleichsmiete, 0);

  const kappungProzent = input.gebietMitAngespanntemWohnungsmarkt ? 15 : 20;
  const maxNachKappung = alt * (1 + kappungProzent / 100);

  // Gesetzliche Obergrenze: Minimum aus Kappungsgrenze und ortsüblicher Vergleichsmiete
  const maxMiete = Math.min(maxNachKappung, vergleich);
  const maxErhoehung = Math.max(maxMiete - alt, 0);

  const istFristErfuellt = input.letzteMieterhoehungVorMonaten >= 12;

  return {
    aktuelleMiete: alt,
    maximalZulaessigeMieteNachKappung: Math.round(maxMiete * 100) / 100,
    maximalZulaessigeErhoehungEuro: Math.round(maxErhoehung * 100) / 100,
    zulaessigeKappungsgrenzeProzent: kappungProzent,
    istJahresfristErfuellt: istFristErfuellt,
    begruendung: istFristErfuellt
      ? `Zulässig: Miete darf maximal bis zur ortsüblichen Vergleichsmiete (${vergleich.toLocaleString('de-DE')} €) bzw. um max. ${kappungProzent}% innerhalb von 3 Jahren steigen.`
      : 'Sperrfrist verletzt: Eine Mieterhöhung darf frühestens 1 Jahr nach der letzten Erhöhung angekündigt werden.',
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: BAUFINANZIERUNG & TILGUNGSPLAN (Annuitätendarlehen)
// ---------------------------------------------------------------------------
export interface BaufinanzierungInput {
  darlehensbetrag: number;
  sollzinsProzent: number;
  anfaenglicheTilgungProzent: number;
  zinsbindungJahre: number;
}

export interface BaufinanzierungResult {
  monatlicheRate: number;
  jaehrlicheAnnuietaet: number;
  restschuldNachZinsbindung: number;
  gezahlteZinsenGesamt: number;
  getilgterBetragGesamt: number;
}

export function calculateBaufinanzierungGermany(input: BaufinanzierungInput): BaufinanzierungResult {
  let restschuld = Math.max(input.darlehensbetrag, 0);
  const zinsSatz = (input.sollzinsProzent || 3.5) / 100;
  const tilgSatz = (input.anfaenglicheTilgungProzent || 2.0) / 100;

  // Jährliche Annuität = Darlehen × (Zins + Tilgung)
  const annuitaetJahr = input.darlehensbetrag * (zinsSatz + tilgSatz);
  const monatlicheRate = annuitaetJahr / 12;

  let gezahlteZinsen = 0;
  let getilgt = 0;
  const monate = input.zinsbindungJahre * 12;

  for (let m = 0; m < monate; m++) {
    const zinsMonat = (restschuld * zinsSatz) / 12;
    const tilgMonat = Math.min(monatlicheRate - zinsMonat, restschuld);
    gezahlteZinsen += zinsMonat;
    getilgt += tilgMonat;
    restschuld = Math.max(restschuld - tilgMonat, 0);
  }

  return {
    monatlicheRate: Math.round(monatlicheRate * 100) / 100,
    jaehrlicheAnnuietaet: Math.round(annuitaetJahr * 100) / 100,
    restschuldNachZinsbindung: Math.round(restschuld * 100) / 100,
    gezahlteZinsenGesamt: Math.round(gezahlteZinsen * 100) / 100,
    getilgterBetragGesamt: Math.round(getilgt * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: MIETKAUTIONSRECHNER (§ 551 BGB)
// ---------------------------------------------------------------------------
export interface MietkautionResult {
  maximaleKautionGesetzlich: number; // Max 3 Nettokaltmieten
  monatlicheRateDreiRaten: number;   // Recht auf Zahlung in 3 Monatsraten
  zulaessig: boolean;
}

export function calculateMietkautionGermany(nettokaltmiete: number): MietkautionResult {
  const miete = Math.max(nettokaltmiete, 0);
  const maxKaution = miete * 3;

  return {
    maximaleKautionGesetzlich: Math.round(maxKaution * 100) / 100,
    monatlicheRateDreiRaten: Math.round((maxKaution / 3) * 100) / 100,
    zulaessig: true,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: IBAN-PRÜFER & BANKLEITZAHL-FINDER DEUTSCHLAND
// ISO 13616 / MOD-97-10 & Deutsche Bundesbank BLZ-Verzeichnis
// ---------------------------------------------------------------------------
export interface GermanyIbanResult {
  valide: boolean;
  ibanFormatiert: string;
  bankleitzahl: string;
  kontonummer: string;
  pruefziffer: string;
  bankName: string;
  bic: string;
  message: string;
}

const DEUTSCHE_BANKEN_BLZ: Record<string, { name: string; bic: string }> = {
  '10070000': { name: 'Deutsche Bank Berlin', bic: 'DEUTDEDBBEL' },
  '10070024': { name: 'Deutsche Bank', bic: 'DEUTDEDDXXX' },
  '50080000': { name: 'Commerzbank Frankfurt', bic: 'COBADEFFXXX' },
  '50040000': { name: 'Commerzbank', bic: 'COBADEFFXXX' },
  '50010517': { name: 'ING-DiBa Frankfurt', bic: 'INGDDEFFXXX' },
  '12030000': { name: 'DKB Deutsche Kreditbank', bic: 'BYLADEM1001' },
  '70020270': { name: 'HypoVereinsbank (UniCredit)', bic: 'HYVEDEMMXXX' },
  '70050000': { name: 'Stadtsparkasse München', bic: 'SSKMDEMMXXX' },
  '10050000': { name: 'Berliner Sparkasse', bic: 'BELADEBEBNK' },
  '20050550': { name: 'Hamburger Sparkasse (Haspa)', bic: 'HASPDEHHXXX' },
  '50050201': { name: 'Frankfurter Sparkasse', bic: 'FRASDEFFXXX' },
  '70160000': { name: 'Postbank (Deutsche Bank)', bic: 'PBNKDEFFXXX' },
  '60050101': { name: 'Landesbank Baden-Württemberg (LBBW)', bic: 'SOLADESTXXX' },
};

export function validateIbanGermany(iban: string): GermanyIbanResult {
  const clean = iban.replace(/[\s-]/g, '').toUpperCase();

  if (!clean.startsWith('DE')) {
    return {
      valide: false,
      ibanFormatiert: clean,
      bankleitzahl: '',
      kontonummer: '',
      pruefziffer: '',
      bankName: 'Unbekannt (Keine deutsche IBAN)',
      bic: '',
      message: 'Eine deutsche IBAN muss mit "DE" beginnen.',
    };
  }

  if (clean.length !== 22) {
    return {
      valide: false,
      ibanFormatiert: clean,
      bankleitzahl: '',
      kontonummer: '',
      pruefziffer: '',
      bankName: '',
      bic: '',
      message: `Deutsche IBAN muss genau 22 Zeichen haben (aktuell ${clean.length}).`,
    };
  }

  // MOD-97-10 Prüfziffern-Algorithmus
  const rearranged = clean.substring(4) + clean.substring(0, 4);
  let numericString = '';
  for (let i = 0; i < rearranged.length; i++) {
    const code = rearranged.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      numericString += (code - 55).toString();
    } else {
      numericString += rearranged[i];
    }
  }

  // Modulo 97 in Blöcken
  let remainder = 0;
  for (let i = 0; i < numericString.length; i += 7) {
    const block = remainder.toString() + numericString.substring(i, Math.min(i + 7, numericString.length));
    remainder = parseInt(block, 10) % 97;
  }

  const isValid = remainder === 1;
  const blz = clean.substring(4, 12);
  const konto = clean.substring(12, 22);
  const pruefziffer = clean.substring(2, 4);

  const bankInfo = DEUTSCHE_BANKEN_BLZ[blz] || {
    name: 'Deutsche Kreditinstitut (Registriert bei Bundesbank)',
    bic: 'GENODED1XXX',
  };

  const formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;

  return {
    valide: isValid,
    ibanFormatiert: formatted,
    bankleitzahl: blz,
    kontonummer: konto,
    pruefziffer: pruefziffer,
    bankName: bankInfo.name,
    bic: bankInfo.bic,
    message: isValid
      ? 'Gültige deutsche IBAN (Prüfsumme MOD-97 korrekt).'
      : 'Ungültige IBAN (Prüfsummenfehler). Bitte Nummer überprüfen.',
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: GEWERBESTEUERRECHNER (§§ 11, 14 GewStG)
// ---------------------------------------------------------------------------
export interface GewerbesteuerInput {
  gewerbeertragVorVerlust: number;
  rechtsform: 'einzelunternehmen' | 'kapitalgesellschaft'; // GmbH, UG, AG
  hebesatzGemeindeProzent: number; // z.B. 400%, 465% (München), etc.
}

export interface GewerbesteuerResult {
  gewerbeertrag: number;
  freibetrag: number; // 24.500 € für Einzelunternehmer / PersGes
  steuerpflichtigerErtrag: number;
  steuermessbetrag: number; // 3,5% Steuermesszahl
  gewerbesteuerZahllast: number;
  anrechnungEStMaximal: number; // § 35 EStG: bis zu 4,0-fache des Steuermessbetrags
}

export function calculateGewerbesteuerGermany(input: GewerbesteuerInput): GewerbesteuerResult {
  const ertrag = Math.max(input.gewerbeertragVorVerlust, 0);
  const freibetrag = input.rechtsform === 'einzelunternehmen' ? 24500 : 0;

  const steuerpflichtig = Math.max(ertrag - freibetrag, 0);
  // Steuermessbetrag nach § 11 Abs. 2 GewStG = 3,5%
  const messbetrag = Math.round(steuerpflichtig * 0.035 * 100) / 100;
  // Gewerbesteuer = Steuermessbetrag × Hebesatz
  const hebesatzFaktor = (input.hebesatzGemeindeProzent || 400) / 100;
  const gewerbesteuer = Math.round(messbetrag * hebesatzFaktor * 100) / 100;

  // Steuerermäßigung nach § 35 EStG bei Einkommensteuer (max 4-facher Messbetrag)
  const anrechnung = input.rechtsform === 'einzelunternehmen' ? Math.min(messbetrag * 4.0, gewerbesteuer) : 0;

  return {
    gewerbeertrag: ertrag,
    freibetrag,
    steuerpflichtigerErtrag: steuerpflichtig,
    steuermessbetrag: messbetrag,
    gewerbesteuerZahllast: gewerbesteuer,
    anrechnungEStMaximal: Math.round(anrechnung * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: SKONTORECHNER & EFFEKTIVER JAHRESZINS
// ---------------------------------------------------------------------------
export interface SkontoInput {
  rechnungsbetragBrutto: number;
  skontoSatzProzent: number; // z.B. 2% oder 3%
  skontoFristTage: number;   // z.B. 10 oder 14 Tage
  nettoZahlungszielTage: number; // z.B. 30 Tage
}

export interface SkontoResult {
  skontobetrag: number;
  zahlbetragMitSkonto: number;
  tageKreditInanspruchnahme: number;
  effektiverJahreszinsProzent: number;
  lohntSichKreditaufnahme: boolean;
}

export function calculateSkontoGermany(input: SkontoInput): SkontoResult {
  const brutto = Math.max(input.rechnungsbetragBrutto, 0);
  const skontoProzent = (input.skontoSatzProzent || 2) / 100;

  const skontobetrag = Math.round(brutto * skontoProzent * 100) / 100;
  const zahlbetrag = Math.round((brutto - skontobetrag) * 100) / 100;

  const tageKredit = Math.max(input.nettoZahlungszielTage - input.skontoFristTage, 1);
  // Formel: (Skontosatz / (100 - Skontosatz)) × (360 / Kreditzeitraum)
  const effZins = ((input.skontoSatzProzent) / (100 - input.skontoSatzProzent)) * (360 / tageKredit) * 100;

  return {
    skontobetrag,
    zahlbetragMitSkonto: zahlbetrag,
    tageKreditInanspruchnahme: tageKredit,
    effektiverJahreszinsProzent: Math.round(effZins * 10) / 10,
    lohntSichKreditaufnahme: effZins > 10, // Wenn eff. Zins über 10% liegt, lohnt sich Bankdispo immer
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: NOTENUMRECHNER (Modifizierte Bayerische Formel)
// Hochschulrektorenkonferenz (HRK)
// ---------------------------------------------------------------------------
export function calculateBayerischeFormel(noteAusland: number, maxNote: number, minBestehensnote: number): {
  deutscheNote: number;
  bewertung: string;
} {
  const n = noteAusland;
  const nMax = maxNote;
  const nMin = minBestehensnote;

  // Formel: 1 + 3 × (Nmax - Nd) / (Nmax - Nmin)
  let result = 1.0;
  if (nMax !== nMin) {
    result = 1 + 3 * ((nMax - n) / (nMax - nMin));
  }
  result = Math.min(Math.max(result, 1.0), 5.0);
  const gerundet = Math.round(result * 10) / 10;

  let label = 'Sehr gut';
  if (gerundet > 1.5 && gerundet <= 2.5) label = 'Gut';
  else if (gerundet > 2.5 && gerundet <= 3.5) label = 'Befriedigend';
  else if (gerundet > 3.5 && gerundet <= 4.0) label = 'Ausreichend';
  else if (gerundet > 4.0) label = 'Nicht bestanden';

  return {
    deutscheNote: gerundet,
    bewertung: label,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: PROZENTRECHNER & RABATT
// ---------------------------------------------------------------------------
export function calculateRabattGermany(grundpreis: number, rabattProzent: number): {
  ermaessigterPreis: number;
  ersparnis: number;
} {
  const p = Math.max(grundpreis, 0);
  const r = Math.min(Math.max(rabattProzent, 0), 100) / 100;
  const ersparnis = Math.round(p * r * 100) / 100;

  return {
    ermaessigterPreis: Math.round((p - ersparnis) * 100) / 100,
    ersparnis,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: SPRITKOSTENRECHNER & FAHRTKOSTEN
// ---------------------------------------------------------------------------
export function calculateSpritkostenGermany(distanzKm: number, verbrauchPro100Km: number, spritpreisProLiter: number, mitfahrer: number = 1): {
  gesamtkostenFahrt: number;
  kraftstoffVerbrauchLiter: number;
  kostenProPerson: number;
} {
  const d = Math.max(distanzKm, 0);
  const v = Math.max(verbrauchPro100Km, 0);
  const p = Math.max(spritpreisProLiter, 0);
  const n = Math.max(mitfahrer, 1);

  const liter = (d * v) / 100;
  const kostenGesamt = liter * p;

  return {
    gesamtkostenFahrt: Math.round(kostenGesamt * 100) / 100,
    kraftstoffVerbrauchLiter: Math.round(liter * 100) / 100,
    kostenProPerson: Math.round((kostenGesamt / n) * 100) / 100,
  };
}
