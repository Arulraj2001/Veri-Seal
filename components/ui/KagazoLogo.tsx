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
      {/* Saffron-Orange Sovereign Shield (Concept 1) */}
      <path
        d="M50 6L13.7 17.7V47.6C13.7 69 28 85 50 94C72 85 86.3 69 86.3 47.6V17.7Z"
        fill="#E6570B"
      />

      {/* Dynamic Verification Checkmark Slicing Through Shield */}
      <polygon
        points="73.9,13.8 67.6,12.3 38.6,53.0 30.7,42.7 24.7,46.3 38.3,66.5"
        fill="white"
      />

      {/* K-Chevron Dynamic Wing Completing The K */}
      <polygon
        points="76.4,30.3 69.0,30.3 54.6,51.5 64.8,66.8 73.0,66.6 62.5,51.2"
        fill="white"
      />
    </svg>
  );
}

export default KagazoLogo;

