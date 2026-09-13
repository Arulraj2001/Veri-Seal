/**
 * Official International Passport and Visa Photo Specifications Database
 * Compliant with ICAO Document 9303 (Part 3: Specifications for Machine Readable Visas & Biometric Passports)
 * and National Issuing Authorities (US Dept of State, HM Passport Office, IRCC Canada, Schengen Visa Code).
 */

export interface PassportPhotoSpec {
  id: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  docType: 'Passport' | 'Visa' | 'PR / Green Card' | 'Citizenship / OCI';
  title: string;
  widthMm: number;
  heightMm: number;
  widthInch: number;
  heightInch: number;
  widthPx300Dpi: number;
  heightPx300Dpi: number;
  aspectRatio: number; // width / height
  minWidthPx: number;
  minHeightPx: number;
  maxWidthPx?: number;
  maxHeightPx?: number;
  minFileKb: number;
  maxFileKb: number;
  dpi: number;
  backgroundColor: string;
  bgHex: string;
  headHeightMmMin: number;
  headHeightMmMax: number;
  headHeightPercentMin: number; // % of total height
  headHeightPercentMax: number;
  eyeLevelPercentMin: number; // % from bottom of photo
  eyeLevelPercentMax: number;
  authorityName: string;
  authorityPortal: string;
  guidelines: string[];
}

export const PASSPORT_SPECS: Record<string, PassportPhotoSpec> = {
  'us-passport': {
    id: 'us-passport',
    country: 'United States',
    countryCode: 'US',
    flagEmoji: '🇺🇸',
    docType: 'Passport',
    title: 'US Passport & Visa Photo (2×2 inch)',
    widthMm: 50.8,
    heightMm: 50.8,
    widthInch: 2.0,
    heightInch: 2.0,
    widthPx300Dpi: 600,
    heightPx300Dpi: 600,
    aspectRatio: 1.0,
    minWidthPx: 600,
    minHeightPx: 600,
    maxWidthPx: 1200,
    maxHeightPx: 1200,
    minFileKb: 10,
    maxFileKb: 240,
    dpi: 300,
    backgroundColor: 'Pure White or Off-White',
    bgHex: '#FFFFFF',
    headHeightMmMin: 25.4, // 1 inch
    headHeightMmMax: 35.0, // 1 3/8 inches
    headHeightPercentMin: 50,
    headHeightPercentMax: 69,
    eyeLevelPercentMin: 56,
    eyeLevelPercentMax: 69,
    authorityName: 'U.S. Department of State (Bureau of Consular Affairs)',
    authorityPortal: 'travel.state.gov',
    guidelines: [
      '2×2 inches (51×51 mm) square format @ 300 DPI.',
      'Head height must be between 1 inch and 1 3/8 inches (50% to 69% of image height).',
      'Eye height must be between 1 1/8 inches and 1 3/8 inches from bottom of photo.',
      'Eyeglasses are STRICTLY prohibited (effective since Nov 1, 2016).',
      'Neutral facial expression with both eyes open and mouth closed.',
      'Plain white or off-white background with zero shadows on face or wall.',
      'JPEG format, strictly under 240 KB for online DS-160 / DS-260 visa forms.',
    ],
  },

  'uk-passport': {
    id: 'uk-passport',
    country: 'United Kingdom',
    countryCode: 'GB',
    flagEmoji: '🇬🇧',
    docType: 'Passport',
    title: 'UK Passport Photo (35×45 mm)',
    widthMm: 35,
    heightMm: 45,
    widthInch: 1.38,
    heightInch: 1.77,
    widthPx300Dpi: 413,
    heightPx300Dpi: 531,
    aspectRatio: 35 / 45,
    minWidthPx: 600,
    minHeightPx: 750,
    maxWidthPx: 1200,
    maxHeightPx: 1600,
    minFileKb: 50,
    maxFileKb: 10000,
    dpi: 300,
    backgroundColor: 'Plain Light Grey or Cream',
    bgHex: '#F1F5F9',
    headHeightMmMin: 29,
    headHeightMmMax: 34,
    headHeightPercentMin: 64,
    headHeightPercentMax: 75,
    eyeLevelPercentMin: 50,
    eyeLevelPercentMax: 65,
    authorityName: 'HM Passport Office (Her Majesty’s Passport Office)',
    authorityPortal: 'gov.uk/photos-for-passports',
    guidelines: [
      '35mm wide by 45mm high (standard British biometric ratio).',
      'Head measurement from crown (top of head) to chin must be between 29mm and 34mm.',
      'Background must be plain light grey or cream (NOT pure white, NOT patterned).',
      'No smiling, frowning, or tilted head; eyes looking directly at camera.',
      'Digital code submission requires minimum 600×750 pixels.',
      'No reflections or glare on glasses; tinted glasses not permitted.',
    ],
  },

  'schengen-visa': {
    id: 'schengen-visa',
    country: 'Schengen Area (EU)',
    countryCode: 'EU',
    flagEmoji: '🇪🇺',
    docType: 'Visa',
    title: 'Schengen European Visa Photo (35×45 mm)',
    widthMm: 35,
    heightMm: 45,
    widthInch: 1.38,
    heightInch: 1.77,
    widthPx300Dpi: 413,
    heightPx300Dpi: 531,
    aspectRatio: 35 / 45,
    minWidthPx: 413,
    minHeightPx: 531,
    maxWidthPx: 1200,
    maxHeightPx: 1600,
    minFileKb: 30,
    maxFileKb: 300,
    dpi: 300,
    backgroundColor: 'Light Grey or Plain White',
    bgHex: '#F8FAFC',
    headHeightMmMin: 32,
    headHeightMmMax: 36,
    headHeightPercentMin: 70,
    headHeightPercentMax: 80,
    eyeLevelPercentMin: 50,
    eyeLevelPercentMax: 62,
    authorityName: 'European Commission (ICAO 9303 / Schengen Visa Code)',
    authorityPortal: 'ec.europa.eu/home-affairs',
    guidelines: [
      '35×45 mm format compliant with ICAO 9303 standards for all 29 Schengen states.',
      'Face must take up 70% to 80% of total picture height (32mm to 36mm from chin to crown).',
      'Close-up of head and top of shoulders so that the face covers 70–80% of photo.',
      'Light grey or white background with uniform lighting (no flash reflection).',
      'Sharp focus with high contrast, natural skin tones, no digital retouching.',
      'Both edges of face must be clearly visible (hair pushed behind ears).',
    ],
  },

  'canada-passport': {
    id: 'canada-passport',
    country: 'Canada',
    countryCode: 'CA',
    flagEmoji: '🇨🇦',
    docType: 'Passport',
    title: 'Canadian Passport & Visa Photo (50×70 mm)',
    widthMm: 50,
    heightMm: 70,
    widthInch: 1.97,
    heightInch: 2.76,
    widthPx300Dpi: 591,
    heightPx300Dpi: 827,
    aspectRatio: 50 / 70,
    minWidthPx: 420,
    minHeightPx: 540,
    maxWidthPx: 1200,
    maxHeightPx: 1680,
    minFileKb: 60,
    maxFileKb: 4000,
    dpi: 300,
    backgroundColor: 'Plain White or Light-Coloured',
    bgHex: '#FFFFFF',
    headHeightMmMin: 31,
    headHeightMmMax: 36,
    headHeightPercentMin: 44,
    headHeightPercentMax: 51,
    eyeLevelPercentMin: 48,
    eyeLevelPercentMax: 60,
    authorityName: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    authorityPortal: 'canada.ca/passport-photos',
    guidelines: [
      '50 mm wide by 70 mm high (2 inches wide by 2 3/4 inches high).',
      'Length of face from chin to crown of head must be between 31 mm and 36 mm.',
      'White or light-coloured plain background with no shadows.',
      'Neutral facial expression, closed mouth, looking straight into lens.',
      'Commercial photographers stamp and date required on back of one physical photo.',
      'Digital uploads must be sharp, in focus, without compression artifacts.',
    ],
  },

  'india-passport': {
    id: 'india-passport',
    country: 'India',
    countryCode: 'IN',
    flagEmoji: '🇮🇳',
    docType: 'Passport',
    title: 'Indian Passport Photo (35×45 mm / 51×51 mm)',
    widthMm: 35,
    heightMm: 45,
    widthInch: 1.38,
    heightInch: 1.77,
    widthPx300Dpi: 413,
    heightPx300Dpi: 531,
    aspectRatio: 35 / 45,
    minWidthPx: 413,
    minHeightPx: 531,
    maxWidthPx: 1000,
    maxHeightPx: 1300,
    minFileKb: 20,
    maxFileKb: 300,
    dpi: 300,
    backgroundColor: 'Plain White Background',
    bgHex: '#FFFFFF',
    headHeightMmMin: 25,
    headHeightMmMax: 35,
    headHeightPercentMin: 60,
    headHeightPercentMax: 70,
    eyeLevelPercentMin: 50,
    eyeLevelPercentMax: 65,
    authorityName: 'Ministry of External Affairs (Passport Seva Kendra)',
    authorityPortal: 'passportindia.gov.in',
    guidelines: [
      '35×45 mm for domestic Passport Seva Kendra / Indian missions abroad.',
      'Square 51×51 mm (2×2 inch) for OCI (Overseas Citizen of India) cards & Visa.',
      'Plain white background with no borders or flash reflections on cheeks.',
      'Face should occupy roughly 60%–70% of frame.',
      'Dark clothing recommended to contrast cleanly against white background.',
      'Frontal view with both ears visible and neutral expression.',
    ],
  },

  'australia-passport': {
    id: 'australia-passport',
    country: 'Australia',
    countryCode: 'AU',
    flagEmoji: '🇦🇺',
    docType: 'Passport',
    title: 'Australian Passport Photo (35×45 mm)',
    widthMm: 35,
    heightMm: 45,
    widthInch: 1.38,
    heightInch: 1.77,
    widthPx300Dpi: 413,
    heightPx300Dpi: 531,
    aspectRatio: 35 / 45,
    minWidthPx: 413,
    minHeightPx: 531,
    maxWidthPx: 1200,
    maxHeightPx: 1600,
    minFileKb: 50,
    maxFileKb: 5000,
    dpi: 300,
    backgroundColor: 'Plain White or Light Grey',
    bgHex: '#F8FAFC',
    headHeightMmMin: 32,
    headHeightMmMax: 36,
    headHeightPercentMin: 71,
    headHeightPercentMax: 80,
    eyeLevelPercentMin: 52,
    eyeLevelPercentMax: 63,
    authorityName: 'Australian Passport Office (DFAT)',
    authorityPortal: 'passports.gov.au',
    guidelines: [
      '35mm to 40mm wide by 45mm to 50mm high.',
      'Size of head from chin to crown must be strictly between 32mm and 36mm.',
      'Plain white or light grey background that provides contrast to your face.',
      'Uniform lighting without shadows or reflections on the face or background.',
      'Eyeglasses must NOT be worn in Australian passport photos under any circumstance.',
    ],
  },

  'singapore-passport': {
    id: 'singapore-passport',
    country: 'Singapore',
    countryCode: 'SG',
    flagEmoji: '🇸🇬',
    docType: 'Passport',
    title: 'Singapore Passport & NRIC Photo (35×45 mm)',
    widthMm: 35,
    heightMm: 45,
    widthInch: 1.38,
    heightInch: 1.77,
    widthPx300Dpi: 400,
    heightPx300Dpi: 514,
    aspectRatio: 35 / 45,
    minWidthPx: 400,
    minHeightPx: 514,
    maxWidthPx: 800,
    maxHeightPx: 1028,
    minFileKb: 10,
    maxFileKb: 2000,
    dpi: 300,
    backgroundColor: 'Matt Plain White Background',
    bgHex: '#FFFFFF',
    headHeightMmMin: 25,
    headHeightMmMax: 35,
    headHeightPercentMin: 60,
    headHeightPercentMax: 70,
    eyeLevelPercentMin: 50,
    eyeLevelPercentMax: 65,
    authorityName: 'Immigration & Checkpoints Authority (ICA Singapore)',
    authorityPortal: 'ica.gov.sg',
    guidelines: [
      '35mm wide by 45mm high, taken within the last 3 months.',
      'Sharp and clear, 400×514 pixels minimum @ 300 DPI.',
      'Taken against a plain white background with matt finish (no shadows).',
      'Shoulders and hair must not blend into the background (wear dark attire).',
      'Full face clearly visible with both eyes open, looking straight at camera.',
    ],
  },
};

export const ALL_PASSPORT_SPECS = Object.values(PASSPORT_SPECS);

export function getPassportSpec(id: string): PassportPhotoSpec | undefined {
  return PASSPORT_SPECS[id];
}
