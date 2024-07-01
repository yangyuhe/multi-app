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

      //处理
      let url = new URL(req.fullUrl);
      const consoleConfig: ConsoleConfig = require("../public/consoleConfig.json");
      const matchedConsoleConfig = consoleConfig.filter(
        (i) => i.domain === "*" || i.domain === url.hostname
      );
      if (url.pathname === "/console/api/plugins/plugin-manifests.json") {
        const client = req.request((svrRes) => {
          const gunzipped = zlib.createGunzip();
          let body = [];
          gunzipped.on("data", (chunk) => {
            body.push(chunk.toString());
          });

          gunzipped.on("end", async () => {
            console.log("解压完成。");
            svrRes.headers["content-encoding"] = "identify";
            console.log(svrRes.headers);
            res.writeHead(svrRes.statusCode, svrRes.headers);
            const oldData = JSON.parse(body.join(""));

            for (let item of matchedConsoleConfig) {
              for (let plugin of item.plugin) {
                const res = await fetch(plugin.url);
                const body = await res.body;
                const index = oldData.findIndex((i) => i.name === plugin.name);
                oldData.splice(index, 1, JSON.parse(body));
              }
            }

            res.end(JSON.stringify(oldData));
          });
          svrRes.pipe(gunzipped);

          gunzipped.on("error", (err) => {
            console.error("解压错误:", err);
          });
        });
        req.pipe(client);
      } else if (
        url.hostname.endsWith("cecloud.com") &&
        req.headers["accept"]?.includes("text/html")
      ) {
        if (matchedConsoleConfig.length > 0) {
          const client = req.request((svrRes) => {
            let body = [];
            svrRes.on("data", (chunk) => {
              body.push(chunk.toString());
            });

            svrRes.on("end", async () => {
              let html = body.join("");
              const regRes = html.match(/"consolePlugins":\[([^\]]*)\]/);
              if (regRes) {
                const plugins = regRes[1].split(",");
                const newAddPlugins = [];
                for (let domain of matchedConsoleConfig) {
                  for (let plugin of domain.plugin) {
                    if (!plugins.includes(plugin.name))
                      newAddPlugins.push(plugin.name);
                  }
                }
                if (newAddPlugins.length > 0) {
                  html = html
                    .split(regRes[1])
                    .join(plugins.concat(newAddPlugins).join(","));
                }
              }
              res.end(html);
            });
          });
          req.pipe(client);
        }
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
