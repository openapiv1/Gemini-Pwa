// Service worker zapewniający możliwość instalacji PWA, ale działający tylko online.

const CACHE_NAME = 'gemini-pwa-cache-v1';

self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalacja...');
  // Pomijamy cachowanie, aplikacja będzie wymagać połączenia z internetem.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Aktywacja...');
  // Usuwamy stare pamięci podręczne, jeśli istnieją, aby uniknąć konfliktów.
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Usuwanie starej pamięci podręcznej', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Strategia "tylko sieć" (network-only).
  // Nie używamy cache, każde żądanie idzie do sieci.
  // To zapewnia, że aplikacja jest zawsze aktualna, ale wymaga połączenia z internetem.
  event.respondWith(fetch(event.request));
});
