import net from "node:net";
import http from "node:http";
import { Stream, Transform } from "node:stream";
import { Gzip } from "node:zlib";
import { TransformStream } from "node:stream/web";
let a: Stream = new Gzip();

// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("okay");
});
proxy.on("connect", (req, clientSocket, head) => {
  // Connect to an origin server
  console.log(req.url);
  const { port, hostname } = new URL(`http://${req.url}`);
  const tempReq = req;
  const serverSocket = net.connect(+port || 80, hostname, () => {
    clientSocket.write(
      "HTTP/1.1 200 Connection Established\r\n" +
        "Proxy-agent: Node.js-Proxy\r\n" +
        "\r\n"
    );
    clientSocket.on("error", (err) => {
      console.log(err);
    });
    const transform = new Transform({
      transform(chunk, controller) {
        controller.enqueue(chunk);
      },
    });
    serverSocket.write(head);
    serverSocket.pipe(transform.writable).pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// Now that proxy is running
proxy.listen(9003, "127.0.0.1", () => {
  console.log("listen at " + 9003);
  // Make a request to a tunneling proxy
  // const options = {
  //   port: 1337,
  //   host: "127.0.0.1",
  //   method: "CONNECT",
  //   path: "www.google.com:80",
  // };
  // const req = http.request(options);
  // req.end();
  // req.on("connect", (res, socket, head) => {
  //   console.log("got connected!");
  //   // Make a request over an HTTP tunnel
  //   socket.write(
  //     "GET / HTTP/1.1\r\n" +
  //       "Host: www.google.com:80\r\n" +
  //       "Connection: close\r\n" +
  //       "\r\n"
  //   );
  //   socket.on("data", (chunk) => {
  //     console.log(chunk.toString());
  //   });
  //   socket.on("end", () => {
  //     proxy.close();
  //   });
  // });
});
