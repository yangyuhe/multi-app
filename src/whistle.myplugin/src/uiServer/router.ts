import Router from "koa-router";
import fs from "fs";
import path from "path";

const consoleFilePath = path.resolve(
  __dirname,
  "../../public/consoleConfig.json"
);

const ruleFilePath = path.resolve(__dirname, "../../rules.txt");

export default (router: Router) => {
  router.get("/cgi-bin/console-config", (ctx) => {
    const content = fs.readFileSync(consoleFilePath);
    ctx.set("Content-Type", "application/json");
    ctx.body = content;
  });

  router.post("/cgi-bin/console-config", (ctx) => {
    try {
      const consoleConfig = ctx.request.body as ConsoleConfig;
      fs.writeFileSync(consoleFilePath, JSON.stringify(consoleConfig, null, 2));
      ctx.body = {
        code: 0,
        message: "保存成功",
      };
      //写入rules.txt
      let rules = [];

      consoleConfig.forEach((item) => {
        item.plugin.forEach((plugin) => {
          if (item.domain === "*") {
            rules.push(
              `# ${plugin.name}`,
              `^**/console/api/plugins/${plugin.name}/*** ${plugin.url}/$2`,
              `^**/console/static/umd/public/static/umd/react@17.0.1.production.min.js $1/console/static/umd/public/static/umd/react@17.0.1.development.js`,
              `^**/console/static/umd/public/static/umd/react-router-dom@5.2.0.min.js $1/console/static/umd/public/static/umd/react-router-dom@5.2.0.min.js`,
              `^**/console/static/umd/public/static/umd/react-dom@17.0.1.production.min.js $1/console/static/umd/public/static/umd/react-dom@17.0.1.production.min.js`,
              "\n"
            );
          } else {
            rules.push(
              `# ${plugin.name}`,
              `^${item.domain}/console/api/plugins/${plugin.name}/*** ${plugin.url}/$1`,
              `^${item.domain}/console/static/umd/public/static/umd/react@17.0.1.production.min.js ${item.domain}/console/static/umd/public/static/umd/react@17.0.1.development.js`,
              `^${item.domain}/console/static/umd/public/static/umd/react-router-dom@5.2.0.min.js ${item.domain}/console/static/umd/public/static/umd/react-router-dom@5.2.0.min.js`,
              `^${item.domain}/console/static/umd/public/static/umd/react-dom@17.0.1.production.min.js ${item.domain}/console/static/umd/public/static/umd/react-dom@17.0.1.production.min.js`,
              "\n"
            );
          }
        });
      });

      fs.writeFileSync(ruleFilePath, rules.join("\n"));
    } catch (err) {
      console.error(err?.message);
      ctx.body = {
        code: 1,
        message: "保存出错" + err?.message,
      };
    }
  });
};
