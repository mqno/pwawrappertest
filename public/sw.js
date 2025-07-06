const CACHE_NAME = "simple-pwa-v2";
const STATIC_CACHE = "static-v2";
const DYNAMIC_CACHE = "dynamic-v2";

const urlsToCache = [
  "/",
  "/manifest.json",
  "/next.svg",
  "/vercel.svg",
  "/globe.svg",
  "/file.svg",
  "/window.svg",
];

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/next.svg",
  "/vercel.svg",
  "/globe.svg",
  "/file.svg",
  "/window.svg",
];

// Cache size limits
const STATIC_CACHE_SIZE = 50;
const DYNAMIC_CACHE_SIZE = 100;

// Install event - cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("Opened static cache");
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Fetch event - enhanced caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same-origin requests
    event.respondWith(handleSameOriginRequest(request));
  } else {
    // Cross-origin requests (like API calls)
    event.respondWith(handleCrossOriginRequest(request));
  }
});

// Handle same-origin requests with cache-first strategy
async function handleSameOriginRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch from network
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());

      // Limit cache size
      await limitCacheSize(DYNAMIC_CACHE, DYNAMIC_CACHE_SIZE);
    }

    return networkResponse;
  } catch (error) {
    // If network fails, return offline fallback
    console.log("Network failed, serving offline fallback");
    return getOfflineFallback(request);
  }
}

// Handle cross-origin requests with network-first strategy
async function handleCrossOriginRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());

      // Limit cache size
      await limitCacheSize(DYNAMIC_CACHE, DYNAMIC_CACHE_SIZE);
    }

    return networkResponse;
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If no cache, return offline fallback
    return getOfflineFallback(request);
  }
}

// Get offline fallback response
async function getOfflineFallback(request) {
  const url = new URL(request.url);

  // For HTML requests, return offline page
  if (request.headers.get("accept")?.includes("text/html")) {
    const offlineResponse = await caches.match("/");
    if (offlineResponse) {
      return offlineResponse;
    }
  }

  // For other requests, return a simple offline response
  return new Response(JSON.stringify({ error: "You are offline" }), {
    status: 503,
    statusText: "Service Unavailable",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Limit cache size by removing oldest entries
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    // Remove oldest items (first in the list)
    const itemsToDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(itemsToDelete.map((key) => cache.delete(key)));
  }
}

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old cache versions
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Claim all clients to ensure the new service worker takes control immediately
        return self.clients.claim();
      })
  );
});

// Handle app updates and notifications
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "SEND_NOTIFICATION") {
    const { title, body, icon } = event.data.payload;
    const options = {
      body: body,
      icon: icon || "/next.svg",
      badge: "/next.svg",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: "explore",
          title: "View",
          icon: "/next.svg",
        },
        {
          action: "close",
          title: "Close",
          icon: "/next.svg",
        },
      ],
    };

    event.waitUntil(self.registration.showNotification(title, options));
  }
});

// Push notification event
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "You have a new notification!",
    icon: "/next.svg",
    badge: "/next.svg",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View",
        icon: "/next.svg",
      },
      {
        action: "close",
        title: "Close",
        icon: "/next.svg",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification("Simple PWA", options));
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});
