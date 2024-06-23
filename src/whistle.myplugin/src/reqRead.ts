export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("this is reqread");
      debugger;
      req.pipe(res);
    }
  );
};
