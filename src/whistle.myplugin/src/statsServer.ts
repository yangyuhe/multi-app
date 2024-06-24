export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("statsServer init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("statsServer process");
      debugger;
      req.pipe(res);
    }
  );
};
