import * as React from 'react';

interface KagazoLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export function KagazoLogo({ className = 'w-6 h-6', size, ...props }: KagazoLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      {...props}
    >
      {/* Saffron-Orange Sovereign Shield */}
      <path
        d="M50 8C38 14 24 17 15 19V52C15 74 30 89 50 94C70 89 85 74 85 52V19C76 17 62 14 50 8Z"
        fill="#E6570B"
      />

      {/* K Vertical Stem */}
      <rect x="44.5" y="26" width="7" height="41" rx="0.5" fill="white" />

      {/* Dynamic Verification Checkmark Swoosh */}
      <path
        d="M20.5 52L33.5 67L63 32C55 41 44 51 33.5 59L26 50L20.5 52Z"
        fill="white"
      />

      {/* Upper Arm of K */}
      <polygon points="51.5,41 68,26 77,26 51.5,50" fill="white" />

      {/* Lower Leg of K */}
      <polygon points="51.5,43 76,67 66,67 51.5,53" fill="white" />
    </svg>
  );
}

export default KagazoLogo;
