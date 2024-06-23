export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("this is statsServer");
      console.dir(req);
      debugger;
      req.pipe(res);
    }
  );
};
