// console.log("worker globalthis:", globalThis);
// addEventListener("message", (evt) => {
//   console.log("worker:", evt);
// });
// onmessage = (evt) => {
//   console.log("worker:", evt);
// };

postMessage("bug");

console.log("this is worker");
const broadcast = new BroadcastChannel("count-channel");
broadcast.onmessage = (event) => {
  console.log("worker msg:", event.data);
};
import "/util.js";
