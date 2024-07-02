import zlib from "zlib";
import http from "http";

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
      if (
        matchedConsoleConfig.length > 0 &&
        url.pathname === "/console/api/plugins/plugin-manifests.json"
      ) {
        const client = req.request((svrRes) => {
          let body = [];
          svrRes.on("data", (chunk) => {
            body.push(chunk.toString());
          });

          svrRes.on("end", async () => {
            const oldData = JSON.parse(body.join(""));

            let promises = [];
            for (let item of matchedConsoleConfig) {
              for (let plugin of item.plugin) {
                let p = new Promise((res, rej) => {
                  const req = http.request(
                    plugin.url + "/plugin-manifests.json",
                    (res) => {
                      let content = "";
                      res.on("data", (chunk) => {
                        content += chunk.toString();
                      });
                      res.on("end", () => {
                        const index = oldData.findIndex(
                          (i) => i.name === plugin.name
                        );
                        oldData.splice(index, 1, JSON.parse(content));
                      });
                    }
                  );
                  req.end();
                });
                promises.push(p);
              }
            }
            await Promise.all(promises);

            res.end(JSON.stringify(oldData));
          });
        });
        req.pipe(client);
      } else if (
        matchedConsoleConfig.length > 0 &&
        url.hostname.endsWith("cecloud.com") &&
        req.headers["accept"]?.includes("text/html")
      ) {
        const client = req.request((svrRes) => {
          let body = [];
          svrRes.on("data", (chunk) => {
            body.push(chunk.toString());
          });

          svrRes.on("end", async () => {
            let html = body.join("");
            const regRes = html.match(/"consolePlugins":\[([^\]]*)\]/);
            if (regRes) {
              console.log(regRes);
              const plugins = regRes[1].split(",");
              const newAddPlugins = [];
              for (let domain of matchedConsoleConfig) {
                for (let plugin of domain.plugin) {
                  const pluginName = '"' + plugin.name + '"';
                  if (!plugins.includes(pluginName))
                    newAddPlugins.push(pluginName);
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
