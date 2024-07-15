import http from "http";
import { log } from "./log";

export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  // handle http request
  server.on(
    "request",
    (req: Whistle.PluginServerRequest, res: Whistle.PluginServerResponse) => {
      //处理
      let url = new URL(req.fullUrl);
      const consoleConfig: ConsoleConfig = require("../public/consoleConfig.json");
      const matchedConsoleConfig = consoleConfig
        .map((i) => ({
          ...i,
          plugin: i.plugin.filter((p) => p.enable === "on"),
        }))
        .filter(
          (i) =>
            (i.domain === "*" || i.domain === url.hostname) &&
            i.plugin.length > 0
        );

      if (matchedConsoleConfig.length > 0)
        log(
          `匹配插件${matchedConsoleConfig
            .map((i) => i.plugin.map((i) => i.name))
            .flat()
            .join(",")}`
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
                let p = new Promise<void>((resolve, reject) => {
                  const req = http.request(
                    plugin.url + "/plugin-manifest.json",
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
                        log(`代理plugin-manifests.json成功`);
                        resolve();
                      });
                      res.on("error", (err) => {
                        log(plugin.name + " " + err?.toString());
                      });
                    }
                  );
                  req.on("error", (err) => {
                    log(plugin.name + " " + err?.toString());
                    resolve();
                  });
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
              let plugins = regRes[1].split(",");
              const newAddPlugins = [];

              for (let domain of matchedConsoleConfig) {
                const disabledPlugins = domain.disabledPlugins
                  .split(",")
                  .map((item) => `"${item.trim()}"`);

                plugins = plugins.filter(
                  (item) => !disabledPlugins.includes(item)
                );

                for (let plugin of domain.plugin) {
                  const pluginName = '"' + plugin.name + '"';

                  if (!plugins.includes(pluginName))
                    newAddPlugins.push(pluginName);
                }
              }
              html = html
                .split(regRes[1])
                .join(plugins.concat(newAddPlugins).join(","));
            }
            res.writeHead(svrRes.statusCode, svrRes.headers);
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
