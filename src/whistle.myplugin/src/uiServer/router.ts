import Router from "koa-router";
import fs from "fs";
import path from "path";

const consoleFilePath = path.resolve(
  __dirname,
  "../../public/consoleConfig.json"
);
const logFilePath = path.resolve(__dirname, "../log.txt");

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
      delete require.cache[require.resolve(consoleFilePath)];
      ctx.body = {
        code: 0,
        message: "保存成功",
      };
    } catch (err) {
      console.error(err?.message);
      ctx.body = {
        code: 1,
        message: "保存出错" + err?.message,
      };
    }
  });

  router.get("/cgi-bin/console-log", (ctx) => {
    try {
      const content = fs.readFileSync(logFilePath);
      ctx.set("Content-Type", "text/plain");
      ctx.body = content;
    } catch (err) {
      ctx.body = "";
    }
  });

  router.delete("/cgi-bin/console-log", (ctx) => {
    try {
      fs.writeFileSync(logFilePath, "");
      ctx.body = {
        code: 0,
        message: "操作成功",
      };
    } catch (err) {
      ctx.body = {
        code: 1,
        message: err?.message,
      };
    }
  });
};
