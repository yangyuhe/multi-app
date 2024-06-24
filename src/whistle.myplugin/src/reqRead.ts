export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("reqRead init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("reqRead process");
      debugger;
      req.pipe(res);
    }
  );
};
