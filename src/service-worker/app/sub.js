navigator.serviceWorker.register("../sw.js");
navigator.serviceWorker.ready.then((sw) => {
  let w = new Worker("../worker.js", { type: "module" });
  console.log("w:", w);
  w.onmessage = function () {
    console.log("work message ");
  };
});
window.onmessage = function (evt) {
  console.log("evt:", evt.data);
};

new Worker("mona.js");
