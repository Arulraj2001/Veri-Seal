import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kagazo — Indian Government PDF Digital Signature Verification',
    short_name: 'Kagazo',
    description:
      'Instantly verify digital signatures on e-Aadhaar, community certificate, nativity certificate, PAN card, and DigiLocker PDFs free.',
    start_url: '/',
    display: 'standalone',
    lang: 'en-IN',
    categories: ['utilities', 'productivity', 'government'],
    background_color: '#FBFAF9',
    theme_color: '#E6570B',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
