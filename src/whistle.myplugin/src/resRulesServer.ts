export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("resRulesServer init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("resRulesServer process");
      res.end();
    }
  );
};
