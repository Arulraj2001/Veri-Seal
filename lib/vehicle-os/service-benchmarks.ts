import { ServiceBenchmarkItem } from './types';

export const SERVICE_BENCHMARKS: ServiceBenchmarkItem[] = [
  // Engine & Consumables
  {
    id: 'engine-oil-synthetic',
    name: 'Fully Synthetic Engine Oil (3.5L - 4.5L)',
    category: 'engine',
    minFairPrice: 2800,
    maxFairPrice: 4200,
    typicalPrice: 3400,
    isMandatory: true,
    adviceWhenHigh: 'OEM dealerships often bill branded synthetic oil at ₹1,200/L. Standard Mobil1, Shell Helix Ultra, or Castrol Edge retails at ₹850-₹950/L.',
  },
  {
    id: 'engine-oil-mineral',
    name: 'Mineral / Semi-Synthetic Engine Oil',
    category: 'engine',
    minFairPrice: 1400,
    maxFairPrice: 2200,
    typicalPrice: 1800,
    isMandatory: true,
    adviceWhenHigh: 'If your owner manual allows mineral 15W40 or 10W40, avoid letting dealerships upsell you expensive synthetic oil without your express request.',
  },
  {
    id: 'oil-filter',
    name: 'Engine Oil Filter Cartridge',
    category: 'filters',
    minFairPrice: 180,
    maxFairPrice: 550,
    typicalPrice: 350,
    isMandatory: true,
    adviceWhenHigh: 'Must be replaced with every oil change. Prices above ₹600 are typically inflated unless it is a luxury CBU European vehicle.',
  },
  {
    id: 'engine-air-filter',
    name: 'Engine Air Intake Filter',
    category: 'filters',
    minFairPrice: 350,
    maxFairPrice: 850,
    typicalPrice: 500,
    isMandatory: true,
    adviceWhenHigh: 'Inspect before replacement. If clean or lightly dusty, compressed air blow cleaning suffices at 10,000 km intervals; replace at 20,000 km.',
  },
  {
    id: 'cabin-ac-filter',
    name: 'Cabin AC Pollen / Carbon Filter',
    category: 'filters',
    minFairPrice: 350,
    maxFairPrice: 900,
    typicalPrice: 600,
    isMandatory: false,
    adviceWhenHigh: 'Dealerships frequently charge ₹1,200+ for standard paper filters. Carbon filters can be replaced DIY in 2 minutes for under ₹500.',
  },

  // Brakes & Safety
  {
    id: 'brake-pads-front',
    name: 'Front Brake Pads Set (Ceramic / Semi-Metallic)',
    category: 'brakes',
    minFairPrice: 1800,
    maxFairPrice: 3800,
    typicalPrice: 2600,
    isMandatory: true,
    adviceWhenHigh: 'Brake pads only need replacement if pad thickness is under 3mm. Ask the service advisor to show physical pad caliper depth before agreeing.',
  },
  {
    id: 'brake-shoes-rear',
    name: 'Rear Brake Shoes / Pads Set',
    category: 'brakes',
    minFairPrice: 1200,
    maxFairPrice: 2800,
    typicalPrice: 1900,
    isMandatory: true,
    adviceWhenHigh: 'Rear drum shoes generally last 60,000+ km in Indian conditions due to 70:30 front brake bias.',
  },
  {
    id: 'brake-fluid-flush',
    name: 'Brake Fluid Bleed & Flush (DOT 3 / DOT 4)',
    category: 'fluids',
    minFairPrice: 400,
    maxFairPrice: 900,
    typicalPrice: 650,
    isMandatory: true,
    adviceWhenHigh: 'Due every 2 years or 30,000 km for moisture absorption prevention. Labour should be under ₹400.',
  },
  {
    id: 'brake-rotor-skimming',
    name: 'Brake Rotor / Disc Lathe Turning (Skimming)',
    category: 'brakes',
    minFairPrice: 600,
    maxFairPrice: 1200,
    typicalPrice: 900,
    isMandatory: false,
    adviceWhenHigh: 'Only required if steering vibrates during high-speed braking. Routine skimming removes disc material prematurely.',
  },

  // Fluids & Cooling
  {
    id: 'coolant-flush',
    name: 'Radiator Coolant Replacement (Pre-mixed 4L)',
    category: 'fluids',
    minFairPrice: 600,
    maxFairPrice: 1400,
    typicalPrice: 950,
    isMandatory: true,
    adviceWhenHigh: 'Long-life OEM coolants (OAT) typically last 4-5 years. Do not replace annually unless contaminated or low concentration.',
  },
  {
    id: 'gear-transmission-oil',
    name: 'Manual Transmission Fluid / Gearbox Oil (2L - 3L)',
    category: 'fluids',
    minFairPrice: 900,
    maxFairPrice: 2200,
    typicalPrice: 1400,
    isMandatory: true,
    adviceWhenHigh: 'Typically scheduled every 40,000 km or 4 years. Automatic / DCT / CVT fluids are higher (₹3,500-₹7,000).',
  },

  // Periodic Maintenance Routine
  {
    id: 'spark-plugs',
    name: 'Spark Plugs (Set of 3 or 4 - Nickel / Copper)',
    category: 'engine',
    minFairPrice: 450,
    maxFairPrice: 1200,
    typicalPrice: 750,
    isMandatory: true,
    adviceWhenHigh: 'Standard nickel plugs last 20,000-30,000 km. Iridium or Platinum plugs cost ₹2,500-₹4,000 but last 80,000-100,000 km.',
  },
  {
    id: 'wheel-alignment-balancing',
    name: 'Computerized 4-Wheel Alignment & Balancing (with Weights)',
    category: 'suspension',
    minFairPrice: 700,
    maxFairPrice: 1400,
    typicalPrice: 950,
    isMandatory: false,
    adviceWhenHigh: 'Dedicated tyre shops (Apollo, MRF, Bridgestone stores) typically charge ₹600-₹800 with better laser calibration than dealership workshops.',
  },

  // Standard Labour Benchmarks
  {
    id: 'periodic-paid-service-labour',
    name: 'General Periodic Service Labour (Hatchback/Sedan/CSUV)',
    category: 'labour',
    minFairPrice: 1500,
    maxFairPrice: 3200,
    typicalPrice: 2200,
    isMandatory: true,
    adviceWhenHigh: 'OEM flat-rate manuals define this as 2.0 to 2.5 hours. Ensure they do not charge extra labour for oil filter or air filter which is part of PMS.',
  },
  {
    id: 'brake-cleaning-labour',
    name: '4-Wheel Brake Caliper Cleaning & Pin Greasing Labour',
    category: 'labour',
    minFairPrice: 400,
    maxFairPrice: 900,
    typicalPrice: 650,
    isMandatory: false,
    adviceWhenHigh: 'Should be bundled into major PMS. If billed separately above ₹1,000, request a concession.',
  },

  // UNNECESSARY DEALERSHIP UPSELLS (Consumer Protection Red Flags)
  {
    id: 'engine-flush',
    name: 'Engine Oil Flush Chemical Treatment',
    category: 'unnecessary',
    minFairPrice: 0,
    maxFairPrice: 0,
    typicalPrice: 950,
    isMandatory: false,
    adviceWhenHigh: 'UNNECESSARY ADD-ON: Harsh solvent chemicals can dislodge sludge that clogs oil pick-up strainer mesh. Not recommended in vehicle user manuals.',
    commonUpsellAlert: 'Ask service center to remove: "Please remove Engine Flush as it is not mandated by the manufacturer manual."',
  },
  {
    id: 'ac-disinfection-sanitization',
    name: 'AC Vent Foam Disinfection / Ozonizer Treatment',
    category: 'unnecessary',
    minFairPrice: 0,
    maxFairPrice: 350,
    typicalPrice: 1400,
    isMandatory: false,
    adviceWhenHigh: 'HIGH DEALER MARGIN: Dealerships spray a ₹100 aerosol can into the vents and bill ₹1,200 to ₹1,800. Only cabin filter replacement is needed.',
    commonUpsellAlert: 'Ask service center to remove: "Please cancel the AC Disinfection package; only replace the cabin filter if dusty."',
  },
  {
    id: 'engine-decarbonization',
    name: 'Engine Decarbonization (HHO or Chemical Decarb)',
    category: 'unnecessary',
    minFairPrice: 0,
    maxFairPrice: 0,
    typicalPrice: 2400,
    isMandatory: false,
    adviceWhenHigh: 'HIGHLY QUESTIONABLE: Modern electronic fuel-injected engines running on low-sulphur BS6 fuel do not need decarbonizing below 1,00,000 km.',
    commonUpsellAlert: 'Refuse this job completely. Modern fuel additives in premium petrol perform equal injector cleaning.',
  },
  {
    id: 'silencer-coating',
    name: 'Exhaust Silencer Heat & Anti-Rust Coating',
    category: 'unnecessary',
    minFairPrice: 0,
    maxFairPrice: 500,
    typicalPrice: 1800,
    isMandatory: false,
    adviceWhenHigh: 'Modern exhaust pipes are constructed from 409-grade stainless steel that resists internal corrosion. Zinc spray burns off in 500 km.',
    commonUpsellAlert: 'Decline quote: "My exhaust is stainless steel; silencer coating is unnecessary."',
  },
  {
    id: 'injector-cleaning-ultrasonic',
    name: 'Ultrasonic Fuel Injector Cleaning Treatment',
    category: 'unnecessary',
    minFairPrice: 0,
    maxFairPrice: 600,
    typicalPrice: 1600,
    isMandatory: false,
    adviceWhenHigh: 'Unless you are experiencing engine misfires, rough idling, or a Check Engine light, routine injector cleaning is an unnecessary upsell.',
    commonUpsellAlert: 'Decline unless a specific OBD scan fault code points to injector blockage.',
  },
  {
    id: 'windshield-treatment-rain-repellent',
    name: 'Windshield Anti-Glare / Rain Repellent Coating',
    category: 'unnecessary',
    minFairPrice: 0,
    maxFairPrice: 200,
    typicalPrice: 1100,
    isMandatory: false,
    adviceWhenHigh: 'Dealerships apply standard wax or hydrophobic spray. You can buy a Turtle Wax or WaveX bottle on Amazon for ₹300 for 10 applications.',
    commonUpsellAlert: 'Remove from job card. Clean your wiper blades with vinegar or water instead.',
  },
];

export function findBenchmarkMatch(itemName: string): ServiceBenchmarkItem | undefined {
  const clean = itemName.toLowerCase().trim();
  
  // Keyword matches
  if (clean.includes('flush') || clean.includes('engine flush')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'engine-flush');
  }
  if (clean.includes('disinfect') || clean.includes('sanitiz') || clean.includes('ac vent') || clean.includes('ozone')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'ac-disinfection-sanitization');
  }
  if (clean.includes('decarb') || clean.includes('carbon clean')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'engine-decarbonization');
  }
  if (clean.includes('silencer') || clean.includes('exhaust coat')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'silencer-coating');
  }
  if (clean.includes('injector clean') || clean.includes('ultrasonic')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'injector-cleaning-ultrasonic');
  }
  if (clean.includes('windshield') || clean.includes('rain repel') || clean.includes('glass treat')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'windshield-treatment-rain-repellent');
  }
  if (clean.includes('synthetic') || (clean.includes('engine oil') && (clean.includes('synth') || clean.includes('0w') || clean.includes('5w')))) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'engine-oil-synthetic');
  }
  if (clean.includes('engine oil') || clean.includes('motor oil')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'engine-oil-synthetic');
  }
  if (clean.includes('oil filter')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'oil-filter');
  }
  if (clean.includes('air filter') || clean.includes('element air')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'engine-air-filter');
  }
  if (clean.includes('cabin') || clean.includes('pollen') || clean.includes('ac filter')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'cabin-ac-filter');
  }
  if (clean.includes('front brake') || clean.includes('pad set front') || clean.includes('brake pad')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'brake-pads-front');
  }
  if (clean.includes('rear brake') || clean.includes('shoe set') || clean.includes('rear shoe')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'brake-shoes-rear');
  }
  if (clean.includes('brake fluid') || clean.includes('dot 4') || clean.includes('dot 3')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'brake-fluid-flush');
  }
  if (clean.includes('rotor') || clean.includes('skimming') || clean.includes('disc lathe') || clean.includes('disc turn')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'brake-rotor-skimming');
  }
  if (clean.includes('coolant') || clean.includes('antifreeze') || clean.includes('radiator fluid')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'coolant-flush');
  }
  if (clean.includes('gear oil') || clean.includes('transmission') || clean.includes('gearbox')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'gear-transmission-oil');
  }
  if (clean.includes('spark plug') || clean.includes('plug spark')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'spark-plugs');
  }
  if (clean.includes('alignment') || clean.includes('balancing') || clean.includes('wheel align')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'wheel-alignment-balancing');
  }
  if (clean.includes('caliper') || clean.includes('brake clean') || clean.includes('pin grease')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'brake-cleaning-labour');
  }
  if (clean.includes('labour') || clean.includes('labor') || clean.includes('pms') || clean.includes('service charge')) {
    return SERVICE_BENCHMARKS.find((b) => b.id === 'periodic-paid-service-labour');
  }

  return undefined;
}
