export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("rulesServer init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("rulesServer process");

      res.end(
        "^***/api/plugins/console-plugin-appforge/** http://127.0.0.1:9002/$2"
      );
    }
  );
};
