const CACHE_VERSION = "bilanforme-v6";
const APP_FILES = ["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(APP_FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => { if (e.request.method !== "GET") return; e.respondWith(caches.match(e.request).then(c => { if (c) return c; return fetch(e.request).then(r => { if (r.ok && new URL(e.request.url).origin === self.location.origin) { const cp = r.clone(); caches.open(CACHE_VERSION).then(ca => ca.put(e.request, cp)); } return r; }).catch(() => c); })); });
