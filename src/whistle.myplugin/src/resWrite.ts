export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("resWrite init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("resWrite process");
      req.pipe(res);
    }
  );
};
