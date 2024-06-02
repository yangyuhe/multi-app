self.addEventListener("message", async (evt) => {
  console.log(evt);
  const clientId = evt.source.id;

  if (!clientId || !self.clients) {
    return;
  }

  const client = await self.clients.get(clientId);

  if (!client) {
    return;
  }

  const allClients = await self.clients.matchAll({
    type: "window",
  });
});

const version = "v19";
self.addEventListener("install", (evt) => {
  console.log(version + " installed");
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log(version + " activated");
  evt.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", async (evt) => {
  console.log(version + " fetched " + evt.request.url);
  // evt.respondWith(fetch(evt.request));
});

console.log(version + " init " + new Date().toLocaleString());
