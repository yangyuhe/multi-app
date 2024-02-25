self.addEventListener("message", async evt => {
    console.log(evt)
    const clientId = evt.source.id

    if (!clientId || !self.clients) {
        return
    }

    const client = await self.clients.get(clientId)

    if (!client) {
        return
    }

    const allClients = await self.clients.matchAll({
        type: 'window',
    })
})
self.addEventListener("install", evt => {
    self.skipWaiting();
})