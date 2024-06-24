export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("reqWrite init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("reqWrite process");
      req.pipe(res);
    }
  );
};
