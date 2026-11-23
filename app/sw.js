// Offline helper for the Recipe Box app.
// Always tries the internet first (so updates show up right away) and falls back
// to the last copy it saw when there's no connection. Only touches the app's own files.
const CACHE = 'recipe-box';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request, {ignoreSearch: true}))
  );
});
