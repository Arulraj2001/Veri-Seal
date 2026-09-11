export interface AffiliateDeal {
  id: string;
  category: 'tyres' | 'battery' | 'insurance' | 'service' | 'ev-charger' | 'accessories';
  title: string;
  partnerName: string;
  badge: string;
  description: string;
  ctaText: string;
  targetUrl: string;
  discountOrDeal?: string;
}

export const AFFILIATE_DEALS: Record<string, AffiliateDeal[]> = {
  tyres: [
    {
      id: 'apollo-amazer-deal',
      category: 'tyres',
      title: 'Apollo Amazer 4G Life / Alnac 4G',
      partnerName: 'TyrePlex India',
      badge: 'Long Tread Life (1,00,000 km)',
      description: 'High silica tread compound optimized for Indian potholes and wet braking. Includes doorstep fitting.',
      ctaText: 'Check Price & Fitment',
      targetUrl: 'https://www.tyreplex.com',
      discountOrDeal: 'Free Valve + Alignment on 4-Tyre Set',
    },
    {
      id: 'mrf-zvxo-deal',
      category: 'tyres',
      title: 'MRF ZVTS / ZLX All-Weather',
      partnerName: 'Amazon India Automotive',
      badge: 'Best-Seller',
      description: 'Heavy duty reinforced sidewalls. Direct replacement for Maruti, Hyundai, Tata & Honda hatchbacks and sedans.',
      ctaText: 'View on Amazon',
      targetUrl: 'https://www.amazon.in',
      discountOrDeal: 'Up to 25% Off with Bank Discount',
    },
    {
      id: 'ceat-securadrive-deal',
      category: 'tyres',
      title: 'CEAT SecuraDrive / FuelSmarrt',
      partnerName: 'CEAT Official Shoppe',
      badge: 'Low Rolling Resistance',
      description: 'Engineered for +5% fuel economy and quiet cabin acoustics. 5-year standard warranty.',
      ctaText: 'Find Nearby CEAT Shoppe',
      targetUrl: 'https://www.ceat.com',
      discountOrDeal: 'Unconditional Warranty Included',
    },
  ],
  battery: [
    {
      id: 'amaron-flo-deal',
      category: 'battery',
      title: 'Amaron Hi-Life Flo / Pro DIN Slabs',
      partnerName: 'BatteryWale / Amazon',
      badge: '66-Month Warranty',
      description: 'SilvenX alloy technology withstands extreme engine bay heat without electrolyte loss. Zero maintenance.',
      ctaText: 'Get Scrap Rebate Quote',
      targetUrl: 'https://www.amazon.in',
      discountOrDeal: '₹800 Scrap Exchange Discount',
    },
    {
      id: 'exide-mileage-deal',
      category: 'battery',
      title: 'Exide Mileage ISS / Matrix Series',
      partnerName: 'Exide Care India',
      badge: 'Quick Delivery (2 Hours)',
      description: 'High cranking CCA design specifically built for idle start-stop (ISS) and high-traffic commutes.',
      ctaText: 'Order Home Replacement',
      targetUrl: 'https://www.exidecare.com',
      discountOrDeal: 'Free Doorstep Delivery & Installation',
    },
  ],
  insurance: [
    {
      id: 'zero-dep-renewal',
      category: 'insurance',
      title: 'Zero Depreciation Motor Insurance Renewal',
      partnerName: 'PolicyBazaar / Acko',
      badge: 'Save up to 60%',
      description: 'Compare 15+ insurers instantly. Includes bumper-to-bumper 100% parts cover, engine protection & 24x7 RSA.',
      ctaText: 'Compare Live Premiums',
      targetUrl: 'https://www.policybazaar.com',
      discountOrDeal: 'Save up to ₹8,000 on Showroom Quotes',
    },
  ],
  'ev-charger': [
    {
      id: 'tata-power-ez-home',
      category: 'ev-charger',
      title: '7.4kW Type-2 AC Fast Wallbox Charger',
      partnerName: 'Tata Power EZ Charge / Amazon',
      badge: 'OCPP 1.6 Certified',
      description: 'Charges Nexon.ev / Tiago EV / ZS EV from 10% to 100% in 5.5 hours. Smart app scheduling & RFID lock.',
      ctaText: 'Check Wallbox Sizing',
      targetUrl: 'https://www.amazon.in',
      discountOrDeal: 'Includes MCB & Earth Leakage Kit',
    },
  ],
};

export function getAffiliatesByCategory(category: string): AffiliateDeal[] {
  return AFFILIATE_DEALS[category] || [];
}
