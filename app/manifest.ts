import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VeriSeal',
    short_name: 'VeriSeal',
    description: 'Verify Indian govt PDF signatures',
    start_url: '/',
    display: 'standalone',
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
