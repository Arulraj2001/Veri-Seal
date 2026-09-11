const CACHE_NAME = 'veriseal-v2';
const STATIC_ASSETS = [
  '/favicon.ico',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
];

const isLocalhost =
  self.location.hostname === 'localhost' ||
  self.location.hostname === '127.0.0.1' ||
  self.location.hostname.includes('.local');

// In local development, self-unregister and clear all caches immediately
if (isLocalhost) {
  self.registration.unregister().then(() => {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  });
}

self.addEventListener('install', (event) => {
  if (isLocalhost) {
    self.skipWaiting();
    return;
  }
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME || isLocalhost).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // If in localhost or non-GET or Next.js internal/API, NEVER intercept
  if (
    isLocalhost ||
    event.request.method !== 'GET' ||
    event.request.url.includes('/api/') ||
    event.request.url.includes('/admin') ||
    event.request.url.includes('/_next/') ||
    event.request.mode === 'navigate'
  ) {
    return;
  }

  // Only serve static icons/manifest from cache, with network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          return new Response('', { status: 408, statusText: 'Request Timeout' });
        })
      );
    })
  );
});

