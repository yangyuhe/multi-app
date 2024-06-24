export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("resStatsServer init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("resStatsServer process");
      // do something
    }
  );
};
