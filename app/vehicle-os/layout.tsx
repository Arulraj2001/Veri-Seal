import * as React from 'react';
import { VehicleSubNav } from '@/components/vehicle-os/VehicleSubNav';

export const metadata = {
  title: 'Vehicle Decision & Ownership Intelligence — Kagazo',
  description:
    'The cheapest and smartest way to own and operate your vehicle in India. Realistic 5-year cost calculator, service quote fairness checker, invoice analyzer, tyre & battery decision tools, and dynamic vehicle comparisons.',
};

export default function VehicleOsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient automotive amber background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Global Vehicle OS Horizontal Sub-Navigation Ribbon */}
        <VehicleSubNav />

        {/* Dynamic Tool Child Content */}
        {children}
      </div>
    </div>
  );
}
