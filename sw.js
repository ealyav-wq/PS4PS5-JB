const CACHE_NAME = 'elya-host-v1';

const urlsToCache = [
  './',
  './index.html',
  './sw.js',
  './goldhen.bin',
  './copych/index.html',
  './binloader/index.html',
  './505/index.html',
  './672/index.html',
  './702/index.html',
  './755/index.html',
  './900L/index.html',
  './G900/index.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
