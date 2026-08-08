const CACHE = "oceanlearn-v1";
const SHELL = ["/", "/manifest.webmanifest", "/assets/logo.jpg", "/assets/splash.jpg", "/assets/turtle.jpg", "/assets/lessons.jpg", "/assets/quiz.jpg", "/assets/games.jpg", "/assets/rewards.jpg", "/assets/progress.jpg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response; }).catch(() => caches.match(event.request).then(hit => hit || caches.match("/"))));
});
