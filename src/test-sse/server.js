const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(async (req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    let index = await fs.promises.readFile(
      path.resolve(__dirname, "index.html"),
      { encoding: "utf8" }
    );
    res.write(index);
    res.end();
    return;
  }
  console.log("last-event-id:", req.headers["last-event-id"]);
  if (req.url === "/eventsource") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Keep-Alive", "timeout=5");
    // 创建一个流，用于发送SSE事件

    // 发送一个SSE事件
    res.write(`data: Hello, World!\r\nid:01\r\nretry: 5000\r\nevent:what\n\n`);

    let counter = 0;
    // 模拟实时数据更新
    let timmer = setInterval(() => {
      if (counter > 500) {
        clearTimeout(timmer);
        // res.end()
        return;
      }
      const success = res.write(
        `data: This is an update at ${Date.now()}\n\n`,
        (err) => {
          if (err) {
            console.log("发送失败", new Date(), err);
          } else {
            console.log("发送成功", new Date());
          }
        }
      );
      counter++;
    }, 1000);

    // 确保流在结束时发送适当的响应
    res.on("close", () => {
      console.log("Connection closed.");
    });
    res.on("error", (err) => {
      console.error("Stream error:", err);
    });
    req.on("close", (evt) => {
      res.end("but");
      console.log("我关闭了", evt);
    });

    return;
  }
  res.statusCode = 404;
  res.end();
});

server.listen("7001");
