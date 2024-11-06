addEventListener("message", (evt) => {
  console.log("worker:", evt);
});
onmessage = (evt) => {
  console.log("worker:", evt);
};

postMessage("bug");
setTimeout(() => {
  import("/util.js").then((res) => {
    res.add();
  });
}, 1000);

const broadcast = new BroadcastChannel("count-channel");
broadcast.onmessage = (event) => {
  console.log("worker msg:", event.data);
};
