export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      let url = new URL(req.fullUrl);
      const consoleConfig: ConsoleConfig = require("../public/consoleConfig.json");
      const matchedConsoleConfig = consoleConfig.filter(
        (i) => i.domain === "*" || i.domain === url.hostname
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
                `^**/console/api/plugins/${plugin.name}/*** ${plugin.url}/$2`,
                `^**/console/static/umd/public/static/umd/react@17.0.1.production.min.js $1/console/static/umd/public/static/umd/react@17.0.1.development.js`,
                `^**/console/static/umd/public/static/umd/react-router-dom@5.2.0.min.js $1/console/static/umd/public/static/umd/react-router-dom@5.2.0.js`,
                `^**/console/static/umd/public/static/umd/react-dom@17.0.1.production.min.js $1/console/static/umd/public/static/umd/react-dom@17.0.1.development.js`,
                "\n"
              );
            } else {
              rules.push(
                `# ${plugin.name}`,
                `^${item.domain}/console/api/plugins/${plugin.name}/*** ${plugin.url}/$1`,
                `^${item.domain}/console/static/umd/public/static/umd/react@17.0.1.production.min.js ${item.domain}/console/static/umd/public/static/umd/react@17.0.1.development.js`,
                `^${item.domain}/console/static/umd/public/static/umd/react-router-dom@5.2.0.min.js ${item.domain}/console/static/umd/public/static/umd/react-router-dom@5.2.0.js`,
                `^${item.domain}/console/static/umd/public/static/umd/react-dom@17.0.1.production.min.js ${item.domain}/console/static/umd/public/static/umd/react-dom@17.0.1.development.js`,
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
