export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      debugger;
      req.pipe(res);
    }
  );
};
