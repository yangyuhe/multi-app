export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
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

      if (matchedConsoleConfig.length > 0) {
        //写入rules.txt
        let rules = [];

        matchedConsoleConfig.forEach((item) => {
          item.plugin.forEach((plugin) => {
            let url = new URL(plugin.url);
            rules.push(`^wss://**:${url.port}/ws wss://${url.host}/ws`);
            if (item.domain === "*") {
              rules.push(
                `# ${plugin.name}`,
                `^***/console/api/plugins/${plugin.name}/*** ${plugin.url}/$2`,
                `^***/console/static/umd/public/static/umd/react@17.0.1.production.min.js $1/console/static/umd/public/static/umd/react@17.0.1.development.js`,
                `^***/console/static/umd/public/static/umd/react-router-dom@5.2.0.min.js $1/console/static/umd/public/static/umd/react-router-dom@5.2.0.js`,
                `^***/console/static/umd/public/static/umd/react-dom@17.0.1.production.min.js $1/console/static/umd/public/static/umd/react-dom@17.0.1.development.js`,
                `^***/console/locales/resource.json?lng=zh&ns=plugin__${plugin.name}.json http://${plugin.url}:${url.port}/locales/zh/plugin__${plugin.name}.json`,
                `^***/console/locales/resource.json?lng=en&ns=plugin__${plugin.name}.json http://${plugin.url}:${url.port}/locales/en/plugin__${plugin.name}.json`,
                "\n"
              );
            } else {
              rules.push(
                `# ${plugin.name}`,
                `^${item.domain}/**/console/api/plugins/${plugin.name}/*** ${plugin.url}/$2`,
                `^${item.domain}/**/console/static/umd/public/static/umd/react@17.0.1.production.min.js ${item.domain}/console/static/umd/public/static/umd/react@17.0.1.development.js`,
                `^${item.domain}/**/console/static/umd/public/static/umd/react-router-dom@5.2.0.min.js ${item.domain}/console/static/umd/public/static/umd/react-router-dom@5.2.0.js`,
                `^${item.domain}/**/console/static/umd/public/static/umd/react-dom@17.0.1.production.min.js ${item.domain}/console/static/umd/public/static/umd/react-dom@17.0.1.development.js`,
                `^${item.domain}/**/console/locales/resource.json?lng=zh&ns=plugin__${plugin.name}.json http://${plugin.url}:${url.port}/locales/zh/plugin__${plugin.name}.json`,
                `^${item.domain}/**/console/locales/resource.json?lng=en&ns=plugin__${plugin.name}.json http://${plugin.url}:${url.port}/locales/en/plugin__${plugin.name}.json`,
                "\n"
              );
            }
          });
        });

        res.end(rules.join("\n"));
      } else {
        res.end();
      }
    }
  );
};
