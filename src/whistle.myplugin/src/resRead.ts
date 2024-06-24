export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("resRead init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("resRead process");
      req.pipe(res);
    }
  );
};
