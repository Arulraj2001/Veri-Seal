import { IndianMarketplaceId } from './types';

export interface PlatformDetails {
  id: IndianMarketplaceId;
  name: string;
  tagline: string;
  badge: string;
  referralFeePercent: number;
  closingFeeFixed: number;
  paymentGatewayPercent: number;
  gstOnFeesPercent: number;
  rtoPolicyNote: string;
  affiliateTip: string;
}

export const INDIAN_MARKETPLACES: Record<IndianMarketplaceId, PlatformDetails> = {
  amazon_easy_ship: {
    id: 'amazon_easy_ship',
    name: 'Amazon India (Easy Ship)',
    tagline: 'Standard national marketplace model with referral & closing fees',
    badge: 'ESTABLISHED SCALE',
    referralFeePercent: 10.5, // average apparel, home, personal care
    closingFeeFixed: 20, // average slab ₹500–₹1000
    paymentGatewayPercent: 0, // bundled into referral fee
    gstOnFeesPercent: 18,
    rtoPolicyNote: 'Buyer returns deduct forward & return pick-up weight handling fees.',
    affiliateTip: 'Ship with optimized 490g packaging to stay under the 500g courier slab.',
  },
  flipkart: {
    id: 'flipkart',
    name: 'Flipkart Seller Hub',
    tagline: 'Tier-2/3 penetration with collection fees and category commissions',
    badge: 'HIGH VOLUME',
    referralFeePercent: 11.0,
    closingFeeFixed: 18,
    paymentGatewayPercent: 2.0, // collection fee
    gstOnFeesPercent: 18,
    rtoPolicyNote: 'Return charges apply on customer reject & return to origin.',
    affiliateTip: 'Enroll in Flipkart Assured (F-Assured) only after verifying packaging margins.',
  },
  meesho: {
    id: 'meesho',
    name: 'Meesho 0% Commission',
    tagline: 'Zero marketplace cut, but seller pays strict logistics & return penalties',
    badge: 'ZERO COMMISSIONS',
    referralFeePercent: 0.0, // Meesho unique value proposition
    closingFeeFixed: 0,
    paymentGatewayPercent: 0,
    gstOnFeesPercent: 18,
    rtoPolicyNote: 'Crucial: Wrong/defective return penalties can wipe out entire product margins.',
    affiliateTip: 'Price ₹30–₹50 higher than base cost to build an internal buffer for 22% RTO return rate.',
  },
  shopify_direct: {
    id: 'shopify_direct',
    name: 'Shopify / D2C Website',
    tagline: 'Your own store with Razorpay/Cashfree & Shiprocket courier',
    badge: 'HIGHEST PROFIT',
    referralFeePercent: 0.0,
    closingFeeFixed: 0,
    paymentGatewayPercent: 2.36, // 2% MDR + 18% GST = 2.36%
    gstOnFeesPercent: 18,
    rtoPolicyNote: 'Full control over COD verification via WhatsApp OTP before dispatch.',
    affiliateTip: 'Prepay-only discounts (5% off on UPI) convert high-risk COD orders to zero-RTO prepaid.',
  },
  whatsapp_direct: {
    id: 'whatsapp_direct',
    name: 'Instagram / WhatsApp Direct',
    tagline: 'Chat commerce via direct UPI payment & local/national parcel courier',
    badge: 'ZERO FEES',
    referralFeePercent: 0.0,
    closingFeeFixed: 0,
    paymentGatewayPercent: 0.0, // Direct UPI to bank account = 0% MDR
    gstOnFeesPercent: 0,
    rtoPolicyNote: '100% prepaid payments eliminate customer refusal at doorstep.',
    affiliateTip: 'Use a digital quote generator with payment QR code to close orders 3x faster.',
  },
};
