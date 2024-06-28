import Router from "koa-router";
import fs from "fs";
import path from "path";

// For help see https://github.com/ZijianHe/koa-router#api-reference
export default (router: Router) => {
  console.log("koa router set");
  router.get("/cgi-bin/console-config", (ctx) => {
    const consoleFile = path.resolve(
      __dirname,
      "../../public/consoleConfig.json"
    );
    const content = fs.readFileSync(consoleFile);
    ctx.set("Content-Type", "application/json");
    ctx.body = content;
  });
};
