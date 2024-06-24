export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("tunnelRulesServer init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("tunnelRulesServer process");
      res.end();
    }
  );
};
