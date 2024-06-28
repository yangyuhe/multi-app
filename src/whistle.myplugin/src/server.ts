import zlib from "zlib";

export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("server init");
  // handle http request
  server.on(
    "request",
    (req: Whistle.PluginServerRequest, res: Whistle.PluginServerResponse) => {
      console.log("server process");

      if (req.fullUrl.includes("https://checkin.cestc.cn/lanXinInit")) {
        console.log("______________");
        const client = req.request((svrRes) => {
          // 由于内容长度可能有变，删除长度自动改成 chunked
          // let body = null;

          // svrRes.on("data", (data) => {
          //   body = body ? Buffer.concat([body, data]) : data;
          // });

          const gunzipped = zlib.createGunzip();
          let body = [];
          gunzipped.on("data", (chunk) => {
            body.push(chunk.toString()); // 处理解压后的分块数据
          });

          gunzipped.on("end", () => {
            console.log("解压完成。");
            svrRes.headers["content-encoding"] = "identify";
            console.log(svrRes.headers);
            res.writeHead(svrRes.statusCode, svrRes.headers);
            res.end(body.join(""));
          });
          svrRes.pipe(gunzipped);

          gunzipped.on("error", (err) => {
            console.error("解压错误:", err);
          });

          // svrRes.on("end", () => {
          //   if (body) {
          //     res.end(body);
          //   } else {
          //     res.end();
          //   }
          // });
        });
        req.pipe(client);
      } else {
        req.passThrough();
      }
    }
  );

  // handle websocket request
  server.on(
    "upgrade",
    (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
      console.log("server upgrade");
      // do something
      req.passThrough();
    }
  );

  // handle tunnel request
  server.on(
    "connect",
    (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
      console.log("server connect");
      // do something
      req.passThrough();
    }
  );
};
