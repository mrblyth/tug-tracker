// A unique name for our cache
const CACHE_NAME = 'tug-tracker-cache-v1';

// The list of files we want to cache
const URLS_TO_CACHE = [
  '/', // The root of our app
  'index.html', // The main HTML file
  'manifest.json', // The app manifest
  'icons/icon-192x192.png', // App icons
  'icons/icon-512x512.png',
  'https://cdn.tailwindcss.com', // Tailwind CSS
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' // Google Font
];

// Install event: This is called when the service worker is first installed.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all our essential files to the cache
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch event: This is called every time the app requests a resource (like a file or data).
self.addEventListener('fetch', event => {
  event.respondWith(
    // Try to find a match in the cache first
    caches.match(event.request)
      .then(response => {
        // If a match is found in the cache, return it.
        // Otherwise, fetch it from the network.
        return response || fetch(event.request);
      })
  );
});