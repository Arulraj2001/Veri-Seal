import { IndianStateId, StateTariffConfig } from './types';

export const INDIAN_STATE_TARIFFS: Record<IndianStateId, StateTariffConfig> = {
  all_india: {
    id: 'all_india',
    stateName: 'All-India Average',
    discomName: 'National Blended Benchmark',
    fixedMonthlyChargePerKw: 75,
    slabs: [
      { minUnits: 0, maxUnits: 100, ratePerUnit: 4.5 },
      { minUnits: 101, maxUnits: 300, ratePerUnit: 6.8 },
      { minUnits: 301, maxUnits: 500, ratePerUnit: 8.5 },
      { minUnits: 501, maxUnits: null, ratePerUnit: 10.5 },
    ],
    notes: 'Representative all-India tier slab for general household planning.',
  },
  tamil_nadu: {
    id: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    discomName: 'TANGEDCO (Tariff IA)',
    fixedMonthlyChargePerKw: 50,
    freeUnitsAllowance: 100, // First 100 units 100% free by TN Government
    slabs: [
      { minUnits: 0, maxUnits: 100, ratePerUnit: 0.0 }, // Free
      { minUnits: 101, maxUnits: 200, ratePerUnit: 2.25 },
      { minUnits: 201, maxUnits: 400, ratePerUnit: 4.5 },
      { minUnits: 401, maxUnits: 500, ratePerUnit: 6.0 },
      { minUnits: 501, maxUnits: 600, ratePerUnit: 8.0 },
      { minUnits: 601, maxUnits: 800, ratePerUnit: 9.0 },
      { minUnits: 801, maxUnits: 1000, ratePerUnit: 10.0 },
      { minUnits: 1001, maxUnits: null, ratePerUnit: 11.0 },
    ],
    notes: 'Includes first 100 units state subsidy. Steep progressive slabs above 500 units.',
  },
  maharashtra: {
    id: 'maharashtra',
    stateName: 'Maharashtra (Mumbai / Pune)',
    discomName: 'MSEDCL / Adani / Tata Power',
    fixedMonthlyChargePerKw: 115,
    slabs: [
      { minUnits: 0, maxUnits: 100, ratePerUnit: 4.71 },
      { minUnits: 101, maxUnits: 300, ratePerUnit: 10.29 },
      { minUnits: 301, maxUnits: 500, ratePerUnit: 14.55 },
      { minUnits: 501, maxUnits: null, ratePerUnit: 16.64 },
    ],
    notes: 'Highest residential tariffs in India. Huge monetary savings from solar & BLDC fans.',
  },
  delhi: {
    id: 'delhi',
    stateName: 'Delhi (NCR)',
    discomName: 'BSES Rajdhani / Yamuna / TPDDL',
    fixedMonthlyChargePerKw: 60,
    freeUnitsAllowance: 200, // Zero bill if <= 200 units
    slabs: [
      { minUnits: 0, maxUnits: 200, ratePerUnit: 3.0 }, // 100% subsidized if within 200 units
      { minUnits: 201, maxUnits: 400, ratePerUnit: 4.5 }, // 50% subsidy window
      { minUnits: 401, maxUnits: 800, ratePerUnit: 6.5 },
      { minUnits: 801, maxUnits: 1200, ratePerUnit: 7.0 },
      { minUnits: 1201, maxUnits: null, ratePerUnit: 8.0 },
    ],
    notes: 'Exceeding 200 units immediately triggers the slab structure.',
  },
  karnataka: {
    id: 'karnataka',
    stateName: 'Karnataka (Bangalore)',
    discomName: 'BESCOM / HESCOM (Gruha Jyothi)',
    fixedMonthlyChargePerKw: 90,
    slabs: [
      { minUnits: 0, maxUnits: 100, ratePerUnit: 4.75 },
      { minUnits: 101, maxUnits: null, ratePerUnit: 7.0 },
    ],
    notes: 'Simplified flat two-tier structure with ₹90/kW fixed monthly connection demand.',
  },
  uttar_pradesh: {
    id: 'uttar_pradesh',
    stateName: 'Uttar Pradesh (Noida / Lucknow)',
    discomName: 'UPPCL (Urban Domestic LMV-1)',
    fixedMonthlyChargePerKw: 110,
    slabs: [
      { minUnits: 0, maxUnits: 150, ratePerUnit: 5.5 },
      { minUnits: 151, maxUnits: 300, ratePerUnit: 6.0 },
      { minUnits: 301, maxUnits: 500, ratePerUnit: 6.5 },
      { minUnits: 501, maxUnits: null, ratePerUnit: 7.0 },
    ],
    notes: 'Standard 4-tier domestic grid. Peak summer air conditioner usage causes high fixed load penalty.',
  },
  gujarat: {
    id: 'gujarat',
    stateName: 'Gujarat (Ahmedabad / Surat)',
    discomName: 'UGVCL / DGVCL / Torrent Power',
    fixedMonthlyChargePerKw: 70,
    slabs: [
      { minUnits: 0, maxUnits: 100, ratePerUnit: 3.2 },
      { minUnits: 101, maxUnits: 250, ratePerUnit: 3.9 },
      { minUnits: 251, maxUnits: null, ratePerUnit: 5.1 },
    ],
    notes: 'Most active rooftop solar state. Highly favorable solar net-metering credits.',
  },
  west_bengal: {
    id: 'west_bengal',
    stateName: 'West Bengal (Kolkata)',
    discomName: 'CESC / WBSEDCL',
    fixedMonthlyChargePerKw: 80,
    slabs: [
      { minUnits: 0, maxUnits: 102, ratePerUnit: 5.44 },
      { minUnits: 103, maxUnits: 180, ratePerUnit: 6.05 },
      { minUnits: 181, maxUnits: 300, ratePerUnit: 6.79 },
      { minUnits: 301, maxUnits: null, ratePerUnit: 7.65 },
    ],
    notes: 'Quarterly cycle in some areas. Slabs scaled to monthly equivalent.',
  },
  kerala: {
    id: 'kerala',
    stateName: 'Kerala',
    discomName: 'KSEB Domestic',
    fixedMonthlyChargePerKw: 65,
    slabs: [
      { minUnits: 0, maxUnits: 50, ratePerUnit: 3.15 },
      { minUnits: 51, maxUnits: 100, ratePerUnit: 3.7 },
      { minUnits: 101, maxUnits: 150, ratePerUnit: 4.8 },
      { minUnits: 151, maxUnits: 200, ratePerUnit: 6.4 },
      { minUnits: 201, maxUnits: 250, ratePerUnit: 7.6 },
      { minUnits: 251, maxUnits: null, ratePerUnit: 8.5 },
    ],
    notes: 'Telescopic slabs up to 250 units, non-telescopic above 250 units.',
  },
  telangana: {
    id: 'telangana',
    stateName: 'Telangana (Hyderabad)',
    discomName: 'TSSPDCL / TSNPDCL',
    fixedMonthlyChargePerKw: 70,
    slabs: [
      { minUnits: 0, maxUnits: 100, ratePerUnit: 3.4 },
      { minUnits: 101, maxUnits: 200, ratePerUnit: 4.8 },
      { minUnits: 201, maxUnits: null, ratePerUnit: 7.7 },
    ],
    notes: 'Includes Gruha Jyothi welfare allowance up to 200 units for registered consumers.',
  },
};

export const ALL_INDIAN_STATES: { id: IndianStateId; name: string }[] = Object.values(
  INDIAN_STATE_TARIFFS
).map((s) => ({ id: s.id, name: s.stateName }));

/**
 * Calculates electricity bill according to official state DISCOM telescopic slabs.
 */
export function calculateStateBill(
  units: number,
  stateId: IndianStateId = 'all_india',
  sanctionedLoadKw: number = 3
): {
  energyCharges: number;
  fixedCharges: number;
  totalBill: number;
  effectiveRatePerUnit: number;
  slabDetails: { slabRange: string; unitsInSlab: number; rate: number; cost: number }[];
} {
  const config = INDIAN_STATE_TARIFFS[stateId] || INDIAN_STATE_TARIFFS.all_india;
  const fixedCharges = Math.round(config.fixedMonthlyChargePerKw * sanctionedLoadKw);

  // Check special zero-bill rules (e.g. Delhi <= 200 units, TN <= 100 units)
  if (stateId === 'delhi' && units <= 200) {
    return {
      energyCharges: 0,
      fixedCharges: 0, // Delhi subsidizes fixed charges under 200 units
      totalBill: 0,
      effectiveRatePerUnit: 0,
      slabDetails: [{ slabRange: '0 - 200 Units (Delhi Govt 100% Subsidy)', unitsInSlab: units, rate: 0, cost: 0 }],
    };
  }

  let remainingUnits = units;
  let energyCharges = 0;
  const slabDetails: { slabRange: string; unitsInSlab: number; rate: number; cost: number }[] = [];

  for (const slab of config.slabs) {
    if (remainingUnits <= 0) break;

    const slabCapacity = slab.maxUnits ? slab.maxUnits - slab.minUnits + (slab.minUnits === 0 ? 0 : 1) : remainingUnits;
    const unitsBilledInSlab = Math.min(remainingUnits, slabCapacity);

    // Apply free units if Tamil Nadu
    let effectiveRate = slab.ratePerUnit;
    if (stateId === 'tamil_nadu' && slab.minUnits === 0 && slab.maxUnits === 100) {
      effectiveRate = 0;
    }

    const cost = unitsBilledInSlab * effectiveRate;
    energyCharges += cost;

    slabDetails.push({
      slabRange: slab.maxUnits ? `${slab.minUnits}–${slab.maxUnits} units` : `> ${slab.minUnits} units`,
      unitsInSlab: unitsBilledInSlab,
      rate: effectiveRate,
      cost: Math.round(cost),
    });

    remainingUnits -= unitsBilledInSlab;
  }

  const totalBill = Math.round(energyCharges + fixedCharges);
  const effectiveRatePerUnit = units > 0 ? Number((totalBill / units).toFixed(2)) : 0;

  return {
    energyCharges: Math.round(energyCharges),
    fixedCharges,
    totalBill,
    effectiveRatePerUnit,
    slabDetails,
  };
}
