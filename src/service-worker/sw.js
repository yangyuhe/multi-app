const broadcast = new BroadcastChannel("count-channel");
addEventListener("fetch", async (evt) => {
  console.log(evt);
  console.log("拦截：", evt.request.url);
  const client = await globalThis.clients.get(evt.clientId);
  if (client.type === "worker") {
    broadcast.postMessage("hello");
    // client.postMessage("hello");
  }
});

broadcast.onmessage = (event) => {
  console.log(event.data);
};
