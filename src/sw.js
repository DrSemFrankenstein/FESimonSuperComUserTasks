// service-worker.js

// This will be the cache name for your static assets
const CACHE_NAME = "my-pwa-cache-v1";

// List of files to cache immediately after the service worker is installed
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  // Add other assets like CSS, JS, images, etc.
];

// Install event: cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Fetch event: serve assets from cache, falling back to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Push event: handle incoming push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    // Add other notification options like icon, image, etc. if desired
  };
  event.waitUntil(self.registration.showNotification("Your App Name", options));
});

self.addEventListener("message", (event) => {
  if (event.data.type && event.data.type === "displayNotification") {
    self.registration.showNotification(
      "People Finder Notification.",
      event.data.options
    );
  }
});

// Activate event: clear old caches
// Update event: if there's a new service worker, activate it immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Deleting cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  // Makes the updated service worker take control immediately
  return self.clients.claim();
});
