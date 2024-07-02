export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("rulesServer init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      const consoleConfig: ConsoleConfig = require("../public/consoleConfig.json");
      //写入rules.txt
      let rules = [];

      consoleConfig.forEach((item) => {
        item.plugin.forEach((plugin) => {
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
    }
  );
};
