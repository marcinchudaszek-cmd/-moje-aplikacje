// Service worker for the web version only (the APK never registers it, see src/main.tsx).
// The page is one HTML file: network first so updates show up at once, cached copy when offline.
const CACHE = "promptly-v1";
const SHELL = ["./", "icon.png", "icon-512.png", "manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  // AI calls and other sites go straight to the network.
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) { const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(request, copy)); }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("./")))
  );
});
