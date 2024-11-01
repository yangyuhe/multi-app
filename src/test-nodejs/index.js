const http = require("http");
function sleep() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 1000);
  });
}
const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Encoding", "none");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.on("close", () => {
    console.log("res close");
  });
  req.on("close", () => {
    console.log("req close");
  });
  res.on("end", () => {
    console.log("res end");
  });
  req.on("end", () => {
    console.log("req end");
  });
  res.on("drain", () => {
    console.log("res drain");
  });

  for (let i = 0; i < 5000; i++) {
    await sleep();
    const notDrain = res.write("hello".repeat(1000), (err) => {
      if (err) {
        console.log("err");
        res.end();
        return;
      }
      console.log("ok", new Date());
    });
    res.write("\n\n");
    console.log("notDrain:", notDrain);
  }
  // res.end();
});
server.on("connection", () => {
  console.log("连接了");
});
server.listen(9003);
