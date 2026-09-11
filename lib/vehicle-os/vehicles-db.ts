import { VehiclePreset } from './types';

export const VEHICLE_PRESETS: VehiclePreset[] = [
  // --- CARS: POPULAR HATCHBACKS & ENTRY SEDANS ---
  {
    id: 'maruti-swift-petrol',
    name: 'Maruti Suzuki Swift (ZXi 1.2L DualJet)',
    brand: 'Maruti Suzuki',
    category: 'car',
    fuelType: 'petrol',
    onRoadPrice: 940000,
    expectedMileage: 19.5, // ARAI is 24.8, real-world ~19.5
    annualInsurance: 24000,
    periodicServiceCost: 6500,
    tyreReplacementCost: 18000, // set of 4 185/65 R15
    batteryReplacementCost: 4800, // 35Ah Amaron/Exide
    standardTankOrBatterySize: 37,
    typicalDepreciation5Yr: 48,
  },
  {
    id: 'maruti-baleno-petrol',
    name: 'Maruti Suzuki Baleno (Zeta 1.2L)',
    brand: 'Maruti Suzuki',
    category: 'car',
    fuelType: 'petrol',
    onRoadPrice: 1020000,
    expectedMileage: 18.5,
    annualInsurance: 26000,
    periodicServiceCost: 7200,
    tyreReplacementCost: 21000, // 195/55 R16
    batteryReplacementCost: 4800,
    standardTankOrBatterySize: 37,
    typicalDepreciation5Yr: 46,
  },
  {
    id: 'maruti-wagonr-cng',
    name: 'Maruti Suzuki WagonR 1.0L CNG (LXi)',
    brand: 'Maruti Suzuki',
    category: 'car',
    fuelType: 'cng',
    onRoadPrice: 750000,
    expectedMileage: 28.0, // km/kg
    annualInsurance: 19000,
    periodicServiceCost: 6200,
    tyreReplacementCost: 14000,
    batteryReplacementCost: 4500,
    standardTankOrBatterySize: 10, // 60L water capacity = ~10kg CNG
    typicalDepreciation5Yr: 42,
  },
  {
    id: 'hyundai-i20-petrol',
    name: 'Hyundai i20 (Asta 1.2L IVT)',
    brand: 'Hyundai',
    category: 'car',
    fuelType: 'petrol',
    onRoadPrice: 1180000,
    expectedMileage: 15.2,
    annualInsurance: 31000,
    periodicServiceCost: 8800,
    tyreReplacementCost: 22000,
    batteryReplacementCost: 5200,
    standardTankOrBatterySize: 37,
    typicalDepreciation5Yr: 52,
  },
  {
    id: 'tata-tiago-ev',
    name: 'Tata Tiago EV (XT Long Range 24kWh)',
    brand: 'Tata Motors',
    category: 'ev-car',
    fuelType: 'electric',
    onRoadPrice: 1060000,
    expectedMileage: 8.5, // km per kWh (real world ~200km range on 24kWh)
    annualInsurance: 27000,
    periodicServiceCost: 3800, // no engine oil/filters
    tyreReplacementCost: 17000,
    batteryReplacementCost: 4500, // auxiliary 12V battery
    standardTankOrBatterySize: 24, // kWh
    typicalDepreciation5Yr: 55,
  },

  // --- COMPACT SUVS & CROSSOVERS ---
  {
    id: 'tata-punch-petrol',
    name: 'Tata Punch (Accomplished 1.2L)',
    brand: 'Tata Motors',
    category: 'car',
    fuelType: 'petrol',
    onRoadPrice: 920000,
    expectedMileage: 15.8,
    annualInsurance: 23500,
    periodicServiceCost: 7000,
    tyreReplacementCost: 19000,
    batteryReplacementCost: 4800,
    standardTankOrBatterySize: 37,
    typicalDepreciation5Yr: 45,
  },
  {
    id: 'tata-nexon-petrol',
    name: 'Tata Nexon (Creative 1.2L Turbo)',
    brand: 'Tata Motors',
    category: 'car',
    fuelType: 'petrol',
    onRoadPrice: 1320000,
    expectedMileage: 14.5,
    annualInsurance: 34000,
    periodicServiceCost: 9500,
    tyreReplacementCost: 28000, // 215/60 R16
    batteryReplacementCost: 5600,
    standardTankOrBatterySize: 44,
    typicalDepreciation5Yr: 47,
  },
  {
    id: 'tata-nexon-ev',
    name: 'Tata Nexon.ev (Empowered 40.5kWh Long Range)',
    brand: 'Tata Motors',
    category: 'ev-car',
    fuelType: 'electric',
    onRoadPrice: 1790000,
    expectedMileage: 7.2, // km/kWh (real world ~290km on 40.5kWh)
    annualInsurance: 42000,
    periodicServiceCost: 4500,
    tyreReplacementCost: 32000, // EV-rated high-torque tyres
    batteryReplacementCost: 5500, // 12V aux
    standardTankOrBatterySize: 40.5,
    typicalDepreciation5Yr: 54,
  },
  {
    id: 'maruti-brezza-petrol',
    name: 'Maruti Suzuki Brezza (ZXi 1.5L Smart Hybrid)',
    brand: 'Maruti Suzuki',
    category: 'car',
    fuelType: 'petrol',
    onRoadPrice: 1340000,
    expectedMileage: 16.5,
    annualInsurance: 33000,
    periodicServiceCost: 7800,
    tyreReplacementCost: 28000,
    batteryReplacementCost: 5500,
    standardTankOrBatterySize: 48,
    typicalDepreciation5Yr: 44,
  },
  {
    id: 'hyundai-creta-petrol',
    name: 'Hyundai Creta (SX 1.5L MPi)',
    brand: 'Hyundai',
    category: 'car',
    fuelType: 'petrol',
    onRoadPrice: 1720000,
    expectedMileage: 13.8,
    annualInsurance: 42000,
    periodicServiceCost: 10500,
    tyreReplacementCost: 34000, // 215/60 R17
    batteryReplacementCost: 6200, // 45-50Ah
    standardTankOrBatterySize: 50,
    typicalDepreciation5Yr: 44,
  },
  {
    id: 'hyundai-creta-diesel',
    name: 'Hyundai Creta (SX(O) 1.5L CRDi Diesel)',
    brand: 'Hyundai',
    category: 'car',
    fuelType: 'diesel',
    onRoadPrice: 1980000,
    expectedMileage: 18.2,
    annualInsurance: 48000,
    periodicServiceCost: 12500, // DPF & fuel filter
    tyreReplacementCost: 34000,
    batteryReplacementCost: 7200, // 65Ah heavy cranking
    standardTankOrBatterySize: 50,
    typicalDepreciation5Yr: 45,
  },
  {
    id: 'mahindra-scorpio-n-diesel',
    name: 'Mahindra Scorpio-N (Z8 2.2L mHawk Diesel)',
    brand: 'Mahindra',
    category: 'car',
    fuelType: 'diesel',
    onRoadPrice: 2280000,
    expectedMileage: 13.2,
    annualInsurance: 58000,
    periodicServiceCost: 14500,
    tyreReplacementCost: 46000, // 255/65 R17
    batteryReplacementCost: 8500, // 75Ah DIN
    standardTankOrBatterySize: 57,
    typicalDepreciation5Yr: 42,
  },
  {
    id: 'mahindra-thar-petrol',
    name: 'Mahindra Thar (LX 4WD 2.0L mStallion Turbo)',
    brand: 'Mahindra',
    category: 'car',
    fuelType: 'petrol',
    onRoadPrice: 1850000,
    expectedMileage: 9.5, // Real world city
    annualInsurance: 46000,
    periodicServiceCost: 12000,
    tyreReplacementCost: 52000, // All-Terrain 255/65 R18
    batteryReplacementCost: 7500,
    standardTankOrBatterySize: 57,
    typicalDepreciation5Yr: 38, // High enthusiast resale
  },
  {
    id: 'toyota-hyryder-hybrid',
    name: 'Toyota Urban Cruiser Hyryder (Strong Hybrid G)',
    brand: 'Toyota',
    category: 'car',
    fuelType: 'hybrid',
    onRoadPrice: 2150000,
    expectedMileage: 23.5, // e-CVT strong hybrid
    annualInsurance: 52000,
    periodicServiceCost: 8500,
    tyreReplacementCost: 32000,
    batteryReplacementCost: 6500,
    standardTankOrBatterySize: 45,
    typicalDepreciation5Yr: 40, // Toyota legendary resale
  },

  // --- 2-WHEELERS: COMMUTER MOTORCYCLES ---
  {
    id: 'hero-splendor-plus',
    name: 'Hero Splendor Plus (XTEC 100cc)',
    brand: 'Hero MotoCorp',
    category: 'bike',
    fuelType: 'petrol',
    onRoadPrice: 94000,
    expectedMileage: 65.0,
    annualInsurance: 3200,
    periodicServiceCost: 1200,
    tyreReplacementCost: 3400, // pair of tyres
    batteryReplacementCost: 1400, // 4Ah
    standardTankOrBatterySize: 9.8,
    typicalDepreciation5Yr: 45,
  },
  {
    id: 'honda-shine-125',
    name: 'Honda Shine 125 (Disc Drum)',
    brand: 'Honda',
    category: 'bike',
    fuelType: 'petrol',
    onRoadPrice: 105000,
    expectedMileage: 58.0,
    annualInsurance: 3500,
    periodicServiceCost: 1400,
    tyreReplacementCost: 3800,
    batteryReplacementCost: 1600,
    standardTankOrBatterySize: 10.5,
    typicalDepreciation5Yr: 44,
  },
  {
    id: 'bajaj-pulsar-150',
    name: 'Bajaj Pulsar 150 (Twin Disc)',
    brand: 'Bajaj',
    category: 'bike',
    fuelType: 'petrol',
    onRoadPrice: 138000,
    expectedMileage: 46.0,
    annualInsurance: 4200,
    periodicServiceCost: 1800,
    tyreReplacementCost: 4800,
    batteryReplacementCost: 1900,
    standardTankOrBatterySize: 15,
    typicalDepreciation5Yr: 48,
  },
  {
    id: 're-classic-350',
    name: 'Royal Enfield Classic 350 (Dark Stealth)',
    brand: 'Royal Enfield',
    category: 'bike',
    fuelType: 'petrol',
    onRoadPrice: 255000,
    expectedMileage: 32.0,
    annualInsurance: 7500,
    periodicServiceCost: 3500,
    tyreReplacementCost: 7500,
    batteryReplacementCost: 3200, // 12V 14Ah
    standardTankOrBatterySize: 13,
    typicalDepreciation5Yr: 35, // High cult resale
  },

  // --- 2-WHEELERS: SCOOTERS (ICE VS EV) ---
  {
    id: 'honda-activa-6g',
    name: 'Honda Activa 6G (DLX 110cc)',
    brand: 'Honda',
    category: 'scooter',
    fuelType: 'petrol',
    onRoadPrice: 98000,
    expectedMileage: 48.0,
    annualInsurance: 3400,
    periodicServiceCost: 1400,
    tyreReplacementCost: 3200, // pair 90/90-12
    batteryReplacementCost: 1500,
    standardTankOrBatterySize: 5.3,
    typicalDepreciation5Yr: 42,
  },
  {
    id: 'tvs-jupiter-110',
    name: 'TVS Jupiter (SmartXonnect 110cc)',
    brand: 'TVS',
    category: 'scooter',
    fuelType: 'petrol',
    onRoadPrice: 102000,
    expectedMileage: 49.0,
    annualInsurance: 3400,
    periodicServiceCost: 1350,
    tyreReplacementCost: 3200,
    batteryReplacementCost: 1500,
    standardTankOrBatterySize: 5.8,
    typicalDepreciation5Yr: 45,
  },
  {
    id: 'ather-450x-gen3',
    name: 'Ather 450X (3.7kWh Pro Pack)',
    brand: 'Ather Energy',
    category: 'ev-2w',
    fuelType: 'electric',
    onRoadPrice: 162000,
    expectedMileage: 28.0, // km per kWh (real-world ~105km on 3.7kWh)
    annualInsurance: 4800,
    periodicServiceCost: 800, // belt inspection & brake pads
    tyreReplacementCost: 4200,
    batteryReplacementCost: 1200, // 12V sub-battery
    standardTankOrBatterySize: 3.7, // kWh
    typicalDepreciation5Yr: 52,
  },
  {
    id: 'ola-s1-pro-gen2',
    name: 'Ola S1 Pro Gen-2 (4.0kWh)',
    brand: 'Ola Electric',
    category: 'ev-2w',
    fuelType: 'electric',
    onRoadPrice: 148000,
    expectedMileage: 32.0, // km/kWh (real-world ~130km on 4kWh)
    annualInsurance: 4500,
    periodicServiceCost: 900,
    tyreReplacementCost: 4000,
    batteryReplacementCost: 1200,
    standardTankOrBatterySize: 4.0,
    typicalDepreciation5Yr: 58,
  },
];

export function getVehicleById(id: string): VehiclePreset | undefined {
  return VEHICLE_PRESETS.find((v) => v.id === id);
}

export function getVehiclesByCategory(category: string): VehiclePreset[] {
  if (category === 'all') return VEHICLE_PRESETS;
  return VEHICLE_PRESETS.filter((v) => v.category === category);
}
